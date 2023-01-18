package stores

import (
	"bytes"
	"context"
	"errors"
	"io"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/smithy-go"
	"github.com/go-redsync/redsync/v4"
	"github.com/go-redsync/redsync/v4/redis/redigo"
	"github.com/golang/protobuf/proto"
	"github.com/gomodule/redigo/redis"
	"github.com/rs/zerolog/log"
	"google.golang.org/protobuf/encoding/protojson"

	"github.com/domino14/liwords/rpc/api/proto/ipc"
)

var ErrDoesNotExist = errors.New("does not exist")

var GameDocBucket = os.Getenv("GAMEDOC_UPLOAD_BUCKET")

const MaxExpirationSeconds = 5 * 24 * 60 * 60 // 5 days
const RedisExpirationSeconds = 15 * 60        // 15 minutes
const RedisDocPrefix = "gdoc:"
const RedisMutexPrefix = "gdocmutex:"

// MaybeLockedDocument wraps a game document but also contains a value. If the
// value is not blank then the document is locked.
type MaybeLockedDocument struct {
	*ipc.GameDocument
	LockValue string
}

type GameDocumentStore struct {
	redisPool *redis.Pool
	s3Client  *s3.Client
	redsync   *redsync.Redsync
}

func NewGameDocumentStore(r *redis.Pool, s *s3.Client) (*GameDocumentStore, error) {
	pool := redigo.NewPool(r)
	rs := redsync.New(pool)
	return &GameDocumentStore{redisPool: r, s3Client: s, redsync: rs}, nil
}

// GetDocument gets a game document from the store. It tries Redis first,
// then S3 if not found in Redis.
// The lock parameter is ignored if this item is not in Redis.
// If it is in Redis, and lock is true, the document is locked. The SetDocument
// function will try to unlock it.
// If it locked, we return the lock value for future usage.
func (gs *GameDocumentStore) GetDocument(ctx context.Context, uuid string, lock bool) (*MaybeLockedDocument, error) {
	var mutexName string
	var mutex *redsync.Mutex

	conn := gs.redisPool.Get()
	defer conn.Close()

	res, err := redis.Int(conn.Do("EXISTS", RedisDocPrefix+uuid))
	if err != nil {
		return nil, err
	}
	if res == 0 {
		// Does not exist in Redis. Try S3.
		doc, err := gs.getFromS3(ctx, uuid)
		if err != nil {
			var ae smithy.APIError
			if errors.As(err, &ae) {
				if ae.ErrorCode() == "NoSuchKey" {
					return nil, ErrDoesNotExist
				}
			}
			return nil, err
		}
		return &MaybeLockedDocument{GameDocument: doc}, nil
	}

	if lock {
		mutexName = RedisMutexPrefix + uuid
		mutex = gs.redsync.NewMutex(mutexName)
		if err := mutex.Lock(); err != nil {
			log.Err(err).Msg("lock failed")
			return nil, err
		}
		log.Debug().Str("name", mutex.Name()).Str("val", mutex.Value()).Msg("locked mutx")
	}
	log.Debug().Msg("getting document")
	bts, err := redis.Bytes(conn.Do("GET", RedisDocPrefix+uuid))
	if err != nil {
		if lock {
			mutex.Unlock()
		}
		return nil, err
	}
	gdoc := &ipc.GameDocument{}
	err = proto.Unmarshal(bts, gdoc)
	if err != nil {
		if lock {
			mutex.Unlock()
		}
		return nil, err
	}
	log.Debug().Msg("returning document")

	// Don't unlock the mutex when we leave. We will unlock it after the
	// SetDocument operation. (Or it will expire if there is no such operation)
	var mv string
	if lock {
		mv = mutex.Value()
	}
	return &MaybeLockedDocument{GameDocument: gdoc, LockValue: mv}, nil
}

func (gs *GameDocumentStore) UnlockDocument(ctx context.Context, doc *MaybeLockedDocument) error {
	if doc.LockValue == "" {
		// wasn't locked
		log.Debug().Str("gid", doc.Uid).Msg("not-locked")
		return nil
	}
	conn := gs.redisPool.Get()
	defer conn.Close()

	mutex := gs.redsync.NewMutex(RedisMutexPrefix+doc.Uid,
		redsync.WithValue(doc.LockValue))

	if ok, err := mutex.Unlock(); !ok || err != nil {
		// The unlock failed. Maybe it wasn't locked?
		log.Err(err).Str("mutexname", mutex.Name()).Str("val", mutex.Value()).Msg("redsync-unlock-failed")
	}
	return nil
}

func (gs *GameDocumentStore) DeleteDocument(ctx context.Context, uuid string) error {
	conn := gs.redisPool.Get()
	defer conn.Close()
	delkeys, err := redis.Int(conn.Do("DEL", RedisDocPrefix+uuid))
	if err != nil {
		return err
	}
	if delkeys != 1 {
		return errors.New("wrong number of keys deleted")
	}
	return nil
}

func (gs *GameDocumentStore) getFromS3(ctx context.Context, uuid string) (*ipc.GameDocument, error) {
	result, err := gs.s3Client.GetObject(ctx, &s3.GetObjectInput{
		Bucket: aws.String(GameDocBucket),
		Key:    aws.String(uuid),
	})
	if err != nil {
		return nil, err
	}
	defer result.Body.Close()
	body, err := io.ReadAll(result.Body)
	if err != nil {
		return nil, err
	}
	gdoc := &ipc.GameDocument{}
	uo := protojson.UnmarshalOptions{
		DiscardUnknown: true,
	}

	err = uo.Unmarshal(body, gdoc)
	if err != nil {
		return nil, err
	}
	return gdoc, nil
}

// SetDocument should be called to set the initial document in redis.
func (gs *GameDocumentStore) SetDocument(ctx context.Context, gdoc *ipc.GameDocument) error {
	bts, err := proto.Marshal(gdoc)
	if err != nil {
		return err
	}
	gid := gdoc.Uid
	conn := gs.redisPool.Get()
	defer conn.Close()

	r, err := redis.String(conn.Do("SET", RedisDocPrefix+gid, bts, "EX", MaxExpirationSeconds))
	if err != nil {
		return err
	}
	if r != "OK" {
		return errors.New("wrong return for SET: " + r)
	}
	return nil
}

// UpdateDocument makes an atomic update to document in the Redis store.
// If the game is done, though, it will write it to S3 and expire it from the Redis
// store.
func (gs *GameDocumentStore) UpdateDocument(ctx context.Context, doc *MaybeLockedDocument) error {
	saveToS3 := doc.PlayState == ipc.PlayState_GAME_OVER

	bts, err := proto.Marshal(doc.GameDocument)
	if err != nil {
		return err
	}
	gid := doc.Uid
	conn := gs.redisPool.Get()
	defer conn.Close()

	unlockMutex := func() {
		if doc.LockValue == "" {
			return
		}
		mutex := gs.redsync.NewMutex(RedisMutexPrefix+gid,
			redsync.WithValue(doc.LockValue))
		if ok, err := mutex.Unlock(); !ok || err != nil {
			// The unlock failed. Maybe it wasn't locked?
			log.Err(err).Str("mutexname", mutex.Name()).Str("val", mutex.Value()).Msg("redsync-unlock-failed")
		}
	}

	r, err := redis.String(conn.Do("SET", RedisDocPrefix+gid, bts, "EX", MaxExpirationSeconds))
	if err != nil {
		unlockMutex()
		return err
	}
	if r != "OK" {
		unlockMutex()
		return errors.New("wrong return for SET: " + r)
	}
	unlockMutex()

	if saveToS3 {
		err = gs.saveToS3(ctx, doc.GameDocument)
		if err == nil {
			// If we saved the game permanently, now we can expire the game from Redis
			// relatively soon.
			r, err := redis.Int(conn.Do("EXPIRE", RedisDocPrefix+gid, RedisExpirationSeconds))
			if err != nil {
				log.Err(err).Str("gid", doc.Uid).Msg("error expiring")
			}
			if r != 1 {
				log.Err(errors.New("unexpected expire return")).Str("gid", doc.Uid).Msg("saving-doc")
			}
			return nil
		} else {
			// XXX Log to Discord or somewhere that this game failed to be permanently
			// backed up!
		}
		return err
	}
	return nil
}

func (gs *GameDocumentStore) saveToS3(ctx context.Context, gdoc *ipc.GameDocument) error {
	// save as protojson

	data, err := protojson.Marshal(gdoc)
	if err != nil {
		return err
	}

	uploader := manager.NewUploader(gs.s3Client)

	_, err = uploader.Upload(ctx, &s3.PutObjectInput{
		Bucket:      aws.String(GameDocBucket),
		Key:         aws.String(gdoc.Uid),
		Body:        bytes.NewReader(data),
		ContentType: aws.String("application/json"),
	})

	return err
}
