package mod

import (
	"context"
	"fmt"
	"github.com/golang/protobuf/ptypes"
	"time"

	"github.com/domino14/liwords/pkg/entity"
	"github.com/domino14/liwords/pkg/user"
	ms "github.com/domino14/liwords/rpc/api/proto/mod_service"
)

var ModActionDispatching = map[string]func(context.Context, user.Store, *ms.ModAction) error{

	/*	All types are listed here for clearness
	    Types that are commented are not transient
	    actions but are applied over a duration of time
	    ms.ModActionType_MUTE,
		ms.ModActionType_SUSPEND_ACCOUNT,
		ms.ModActionType_SUSPEND_RATED_GAMES,
		ms.ModActionType_SUSPEND_GAMES,*/
	ms.ModActionType_RESET_RATINGS.String():           resetRatings,
	ms.ModActionType_RESET_STATS.String():             resetStats,
	ms.ModActionType_RESET_STATS_AND_RATINGS.String(): resetStatsAndRatings,
}

func GetActions(ctx context.Context, us user.Store, uuid string) (map[string]*ms.ModAction, error) {
	user, err := us.GetByUUID(ctx, uuid)
	if err != nil {
		return nil, err
	}

	// updateActions will initialize user.Actions.Current
	// so the return will not result in a nil pointer error
	err = updateActions(ctx, us, uuid)
	if err != nil {
		return nil, err
	}

	return user.Actions.Current, nil
}

func GetActionHistory(ctx context.Context, us user.Store, uuid string) ([]*ms.ModAction, error) {
	user, err := us.GetByUUID(ctx, uuid)
	if err != nil {
		return nil, err
	}

	// updateActions will initialize user.Actions.History
	// so the return will not result in a nil pointer error
	err = updateActions(ctx, us, uuid)
	if err != nil {
		return nil, err
	}

	return user.Actions.History, nil
}

func ApplyActions(ctx context.Context, us user.Store, actions []*ms.ModAction) error {
	for _, action := range actions {
		err := applyAction(ctx, us, action)
		if err != nil {
			return err
		}
	}
	return nil
}

func RemoveActions(ctx context.Context, us user.Store, actions []*ms.ModAction) error {
	for _, action := range actions {
		err := removeAction(ctx, us, action)
		if err != nil {
			return err
		}
	}
	return nil
}

func updateActions(ctx context.Context, us user.Store, uuid string) error {
	user, err := us.GetByUUID(ctx, uuid)
	if err != nil {
		return err
	}

	instantiateActions(user)

	now := time.Now()
	for _, action := range user.Actions.Current {
		// This conversion will throw an error if action.EndTime
		// is nil. This means that the action is permanent
		// and should never be removed by this function.
		convertedEndTime, err := ptypes.Timestamp(action.EndTime)
		if err == nil && now.After(convertedEndTime) {
			removeCurrentAction(user, action.Type)
		}
	}

	return us.Set(ctx, user)
}

func removeAction(ctx context.Context, us user.Store, action *ms.ModAction) error {
	user, err := us.GetByUUID(ctx, action.UserId)
	if err != nil {
		return err
	}

	err = removeCurrentAction(user, action.Type)
	if err != nil {
		return err
	}

	return us.Set(ctx, user)
}

func applyAction(ctx context.Context, us user.Store, action *ms.ModAction) error {
	user, err := us.GetByUUID(ctx, action.UserId)
	if err != nil {
		return err
	}
	action.StartTime = ptypes.TimestampNow()
	modActionFunc, ok := ModActionDispatching[action.Type.String()]
	if ok { // This ModAction is transient
		err := modActionFunc(ctx, us, action)
		if err != nil {
			return err
		}
		action.Duration = 0
		action.EndTime = action.StartTime
		err = addActionToHistory(user, action)
		if err != nil {
			return err
		}
	} else {
		if action.Duration < 0 {
			return fmt.Errorf("nontransient moderator action has a negative duration: %d", action.Duration)
		}
		// A Duration of 0 seconds for nontransient
		// actions is considered a permanent action
		if action.Duration == 0 {
			action.EndTime = nil
		} else {
			err = setEndTime(action)
			if err != nil {
				return err
			}
		}

		err = setCurrentAction(user, action)
		if err != nil {
			return err
		}
	}

	return us.Set(ctx, user)
}

func setEndTime(action *ms.ModAction) error {
	golangStartTime, err := ptypes.Timestamp(action.StartTime)
	if err != nil {
		return err
	}
	durationInSeconds, err := time.ParseDuration(fmt.Sprintf("%ds", action.Duration))
	if err != nil {
		return err
	}
	golangEndTime := golangStartTime.Add(durationInSeconds)
	protoEndTime, err := ptypes.TimestampProto(golangEndTime)
	if err != nil {
		return err
	}
	action.EndTime = protoEndTime
	return nil
}

func addActionToHistory(user *entity.User, action *ms.ModAction) error {
	instantiateActions(user)
	user.Actions.History = append(user.Actions.History, action)
	return nil
}

func setCurrentAction(user *entity.User, action *ms.ModAction) error {
	instantiateActions(user)
	user.Actions.Current[action.Type.String()] = action
	return nil
}

func removeCurrentAction(user *entity.User, actionType ms.ModActionType) error {
	instantiateActions(user)
	existingCurrentAction, ok := user.Actions.Current[actionType.String()]
	if !ok {
		return fmt.Errorf("user does not have current action %s", actionType.String())
	}
	addActionToHistory(user, existingCurrentAction)
	user.Actions.Current[actionType.String()] = nil
	return nil
}

func resetRatings(ctx context.Context, us user.Store, action *ms.ModAction) error {
	return us.ResetRatings(ctx, action.UserId)
}

func resetStats(ctx context.Context, us user.Store, action *ms.ModAction) error {
	return us.ResetStats(ctx, action.UserId)
}

func resetStatsAndRatings(ctx context.Context, us user.Store, action *ms.ModAction) error {
	err := us.ResetStats(ctx, action.UserId)
	if err != nil {
		return nil
	}
	return us.ResetRatings(ctx, action.UserId)
}

func instantiateActions(u *entity.User) {
	if u.Actions == nil {
		u.Actions = &entity.Actions{}
	}
	instantiateActionsCurrent(u)
	instantiateActionsHistory(u)
}

func instantiateActionsCurrent(u *entity.User) {
	if u.Actions.Current == nil {
		u.Actions.Current = make(map[string]*ms.ModAction)
	}
}

func instantiateActionsHistory(u *entity.User) {
	if u.Actions.History == nil {
		u.Actions.History = []*ms.ModAction{}
	}
}
