// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.16.0

package models

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgtype"
)

type AnnotatedGameMetadatum struct {
	GameUuid         string
	CreatorUuid      string
	PrivateBroadcast bool
	Done             bool
}

type Blocking struct {
	UserID    sql.NullInt32
	BlockerID sql.NullInt32
}

type DbSession struct {
	Uuid      string
	ExpiresAt sql.NullTime
	Data      pgtype.JSONB
}

type Following struct {
	UserID     sql.NullInt32
	FollowerID sql.NullInt32
}

type Game struct {
	ID             int32
	CreatedAt      sql.NullTime
	UpdatedAt      sql.NullTime
	DeletedAt      sql.NullTime
	Uuid           sql.NullString
	Player0ID      sql.NullInt32
	Player1ID      sql.NullInt32
	Timers         pgtype.JSONB
	Started        sql.NullBool
	GameEndReason  sql.NullInt32
	WinnerIdx      sql.NullInt32
	LoserIdx       sql.NullInt32
	Request        []byte
	History        []byte
	Stats          pgtype.JSONB
	Quickdata      pgtype.JSONB
	TournamentData pgtype.JSONB
	TournamentID   sql.NullString
	ReadyFlag      sql.NullInt64
	MetaEvents     pgtype.JSONB
	Type           sql.NullInt32
}

type GameComment struct {
	ID          uuid.UUID
	GameID      int64
	AuthorID    int32
	EventNumber int32
	CreatedAt   time.Time
	EditedAt    time.Time
	Comment     string
}

type GameDocument struct {
	GameID   string
	Document pgtype.JSONB
}

type Liststat struct {
	GameID    sql.NullString
	PlayerID  sql.NullString
	Timestamp sql.NullInt64
	StatType  sql.NullInt32
	Item      pgtype.JSONB
}

type Notoriousgame struct {
	GameID    sql.NullString
	PlayerID  sql.NullString
	Type      sql.NullInt32
	Timestamp sql.NullInt64
}

type Profile struct {
	ID          int32
	CreatedAt   sql.NullTime
	UpdatedAt   sql.NullTime
	DeletedAt   sql.NullTime
	UserID      sql.NullInt32
	FirstName   sql.NullString
	LastName    sql.NullString
	CountryCode sql.NullString
	Title       sql.NullString
	About       sql.NullString
	Ratings     pgtype.JSONB
	Stats       pgtype.JSONB
	AvatarUrl   sql.NullString
	BirthDate   sql.NullString
}

type Puzzle struct {
	ID           int64
	Uuid         string
	GameID       int64
	TurnNumber   int32
	Answer       pgtype.JSONB
	AuthorID     sql.NullInt32
	Lexicon      sql.NullString
	BeforeText   sql.NullString
	AfterText    sql.NullString
	Rating       pgtype.JSONB
	GenerationID int64
	BucketIndex  int32
	CreatedAt    time.Time
}

type PuzzleAttempt struct {
	PuzzleID        int64
	UserID          int64
	Correct         sql.NullBool
	Attempts        int32
	NewUserRating   pgtype.JSONB
	NewPuzzleRating pgtype.JSONB
	CreatedAt       time.Time
	UpdatedAt       time.Time
}

type PuzzleGenerationLog struct {
	ID          int64
	Request     pgtype.JSONB
	Fulfilled   sql.NullBool
	ErrorStatus sql.NullString
	CreatedAt   time.Time
	CompletedAt sql.NullTime
}

type PuzzleTag struct {
	PuzzleID int64
	TagID    int64
}

type PuzzleTagTitle struct {
	ID       int64
	TagTitle string
}

type PuzzleVote struct {
	PuzzleID  int64
	UserID    int64
	Vote      sql.NullInt32
	CreatedAt time.Time
}

type Registrant struct {
	UserID       sql.NullString
	TournamentID sql.NullString
	DivisionID   sql.NullString
}

type Soughtgame struct {
	CreatedAt           sql.NullTime
	Uuid                sql.NullString
	Seeker              sql.NullString
	Type                sql.NullString
	ConnID              sql.NullString
	Receiver            sql.NullString
	Request             pgtype.JSONB
	ReceiverIsPermanent sql.NullBool
	SeekerConnID        sql.NullString
	ReceiverConnID      sql.NullString
}

type Tournament struct {
	ID                int64
	CreatedAt         sql.NullTime
	UpdatedAt         sql.NullTime
	DeletedAt         sql.NullTime
	Uuid              sql.NullString
	Name              sql.NullString
	Description       sql.NullString
	Directors         pgtype.JSONB
	ExecutiveDirector sql.NullString
	IsStarted         sql.NullBool
	Divisions         pgtype.JSONB
	Type              sql.NullString
	Parent            sql.NullString
	Slug              sql.NullString
	DefaultSettings   pgtype.JSONB
	AliasOf           sql.NullString
	IsFinished        sql.NullBool
	ExtraMeta         pgtype.JSONB
}

type User struct {
	ID          int32
	CreatedAt   sql.NullTime
	UpdatedAt   sql.NullTime
	DeletedAt   sql.NullTime
	Uuid        sql.NullString
	Username    sql.NullString
	Email       sql.NullString
	Password    sql.NullString
	InternalBot sql.NullBool
	IsAdmin     sql.NullBool
	ApiKey      sql.NullString
	IsDirector  sql.NullBool
	IsMod       sql.NullBool
	Actions     pgtype.JSONB
	Notoriety   sql.NullInt32
}
