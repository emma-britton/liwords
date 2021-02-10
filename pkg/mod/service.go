package mod

import (
	"context"

	"github.com/rs/zerolog/log"
	"github.com/twitchtv/twirp"

	"github.com/domino14/liwords/pkg/apiserver"
	"github.com/domino14/liwords/pkg/entity"
	"github.com/domino14/liwords/pkg/user"

	pb "github.com/domino14/liwords/rpc/api/proto/mod_service"
)

type ModService struct {
	userStore user.Store
}

var AdminRequiredMap = map[pb.ModActionType]bool{
	pb.ModActionType_MUTE:                    false,
	pb.ModActionType_SUSPEND_ACCOUNT:         true,
	pb.ModActionType_SUSPEND_RATED_GAMES:     true,
	pb.ModActionType_SUSPEND_GAMES:           true,
	pb.ModActionType_RESET_RATINGS:           true,
	pb.ModActionType_RESET_STATS:             true,
	pb.ModActionType_RESET_STATS_AND_RATINGS: true,
}

func (ms *ModService) GetActions(ctx context.Context, req *pb.GetActionsRequest) (*pb.ModActionsMap, error) {
	user, err := sessionUser(ctx, ms)
	if err != nil {
		return nil, err
	}
	if !user.IsAdmin {
		return nil, twirp.NewError(twirp.Unauthenticated, "this user is not an authorized to perform this action")
	}
	actions, err := GetActions(ctx, ms.userStore, req.UserId)
	if err != nil {
		return nil, twirp.NewError(twirp.InvalidArgument, err.Error())
	}
	return &pb.ModActionsMap{Actions: actions}, nil
}

func (ms *ModService) GetActionHistory(ctx context.Context, req *pb.GetActionsRequest) (*pb.ModActionsList, error) {
	user, err := sessionUser(ctx, ms)
	if err != nil {
		return nil, err
	}
	if !user.IsAdmin {
		return nil, twirp.NewError(twirp.Unauthenticated, "this user is not an authorized to perform this action")
	}
	history, err := GetActionHistory(ctx, ms.userStore, req.UserId)
	if err != nil {
		return nil, twirp.NewError(twirp.InvalidArgument, err.Error())
	}
	return &pb.ModActionsList{Actions: history}, nil
}

func (ms *ModService) RemoveActions(ctx context.Context, req *pb.ModActionsList) (*pb.ModActionResponse, error) {
	err := authenticateMod(ctx, ms, req)
	if err != nil {
		return nil, err
	}
	err = RemoveActions(ctx, ms.userStore, req.Actions)
	if err != nil {
		return nil, twirp.NewError(twirp.InvalidArgument, err.Error())
	}
	return &pb.ModActionResponse{}, nil
}

func (ms *ModService) ApplyActions(ctx context.Context, req *pb.ModActionsList) (*pb.ModActionResponse, error) {
	err := authenticateMod(ctx, ms, req)
	if err != nil {
		return nil, err
	}
	err = ApplyActions(ctx, ms.userStore, req.Actions)
	if err != nil {
		return nil, twirp.NewError(twirp.InvalidArgument, err.Error())
	}
	return &pb.ModActionResponse{}, nil
}

func sessionUser(ctx context.Context, ms *ModService) (*entity.User, error) {
	sess, err := apiserver.GetSession(ctx)
	if err != nil {
		return nil, err
	}

	user, err := ms.userStore.Get(ctx, sess.Username)
	if err != nil {
		log.Err(err).Msg("getting-user")
		return nil, twirp.InternalErrorWith(err)
	}
	return user, nil
}

func authenticateMod(ctx context.Context, ms *ModService, req *pb.ModActionsList) error {
	user, err := sessionUser(ctx, ms)
	if err != nil {
		return err
	}

	isAdminRequired := false
	for _, action := range req.Actions {
		if AdminRequiredMap[action.Type] {
			isAdminRequired = true
			break
		}
	}

	if !user.IsAdmin && (isAdminRequired || !user.IsMod) {
		return twirp.NewError(twirp.Unauthenticated, "this user is not an authorized to perform this action")
	}
	return nil
}
