package mod

import (
	"context"
	"errors"
	"fmt"
	"os"
	"testing"
	"time"

	"github.com/matryer/is"
	"github.com/rs/zerolog/log"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"

	"github.com/domino14/liwords/pkg/apiserver"
	"github.com/domino14/liwords/pkg/config"
	"github.com/domino14/liwords/pkg/entity"
	"github.com/domino14/liwords/pkg/stores/common"
	"github.com/domino14/liwords/pkg/stores/user"
	pkguser "github.com/domino14/liwords/pkg/user"
	ms "github.com/domino14/liwords/rpc/api/proto/mod_service"
	macondoconfig "github.com/domino14/macondo/config"
)

var DefaultConfig = macondoconfig.Config{
	LexiconPath:               os.Getenv("LEXICON_PATH"),
	LetterDistributionPath:    os.Getenv("LETTER_DISTRIBUTION_PATH"),
	DefaultLexicon:            "CSW21",
	DefaultLetterDistribution: "English",
}

func recreateDB() {
	// Create a database.
	err := common.RecreateTestDB()
	if err != nil {
		panic(err)
	}

	ustore := userStore()

	for _, u := range []*entity.User{
		{Username: "Spammer", Email: os.Getenv("TEST_EMAIL_USERNAME") + "+spammer@woogles.io", UUID: "Spammer"},
		{Username: "Sandbagger", Email: "sandbagger@gmail.com", UUID: "Sandbagger"},
		{Username: "Cheater", Email: os.Getenv("TEST_EMAIL_USERNAME") + "@woogles.io", UUID: "Cheater"},
		{Username: "Hacker", Email: "hacker@woogles.io", UUID: "Hacker"},
		{Username: "Deleter", Email: "deleter@woogles.io", UUID: "Deleter"},
		{Username: "Moderator", Email: "admin@woogles.io", UUID: "Moderator", IsMod: true},
	} {
		err = ustore.New(context.Background(), u)
		if err != nil {
			log.Fatal().Err(err).Msg("error")
		}
	}
	ustore.(*user.DBStore).Disconnect()
}

func userStore() pkguser.Store {
	pool, err := common.OpenTestingDB()
	if err != nil {
		panic(err)
	}
	ustore, err := user.NewDBStore(pool)
	if err != nil {
		log.Fatal().Err(err).Msg("error")
	}
	return ustore
}

func chatStore() pkguser.ChatStore {
	// Return a dummy chatStore since it is
	// not used in these tests
	var cstore pkguser.ChatStore = nil
	return cstore
}

func TestModMain(t *testing.T) {
	is := is.New(t)
	session := &entity.Session{
		ID:       "abcdef",
		Username: "Moderator",
		UserUUID: "Moderator",
		Expiry:   time.Now().Add(time.Second * 100)}
	ctx := context.Background()
	ctx = apiserver.PlaceInContext(ctx, session)
	recreateDB()
	us := userStore()
	cs := chatStore()

	defer func() {
		us.(*user.DBStore).Disconnect()
	}()

	var muteDuration int32 = 2

	muteAction := &ms.ModAction{UserId: "Spammer", Type: ms.ModActionType_MUTE, Duration: muteDuration}
	// Negative value for duration should not matter for transient actions
	resetAction := &ms.ModAction{UserId: "Sandbagger", Type: ms.ModActionType_RESET_STATS_AND_RATINGS, Duration: -10}
	suspendAction := &ms.ModAction{UserId: "Cheater", Type: ms.ModActionType_SUSPEND_ACCOUNT, Duration: 100}

	// Remove an action that does not exist
	err := RemoveActions(ctx, us, []*ms.ModAction{muteAction})
	errString := fmt.Sprintf("user does not have current action %s", muteAction.Type.String())
	is.True(err.Error() == errString)

	// Apply Actions
	err = ApplyActions(ctx, us, cs, []*ms.ModAction{muteAction, resetAction, suspendAction})
	is.NoErr(err)

	permaban, err := ActionExists(ctx, us, "Spammer", false, []ms.ModActionType{muteAction.Type})
	is.True(!permaban)
	is.True(err != nil)
	permaban, err = ActionExists(ctx, us, "Sandbagger", false, []ms.ModActionType{resetAction.Type})
	is.True(!permaban)
	is.NoErr(err)
	permaban, err = ActionExists(ctx, us, "Cheater", false, []ms.ModActionType{suspendAction.Type})
	is.True(!permaban)
	is.True(err != nil)

	// Check Actions
	actualSpammerActions, err := GetActions(ctx, us, "Spammer")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualSpammerActions, makeActionMap([]*ms.ModAction{muteAction})))
	is.True(actualSpammerActions[muteAction.Type.String()].EndTime != nil)
	is.True(actualSpammerActions[muteAction.Type.String()].StartTime != nil)

	actualSpammerHistory, err := GetActionHistory(ctx, us, "Spammer")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualSpammerHistory, []*ms.ModAction{}))

	actualSandbaggerActions, err := GetActions(ctx, us, "Sandbagger")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualSandbaggerActions, makeActionMap([]*ms.ModAction{})))

	actualSandbaggerHistory, err := GetActionHistory(ctx, us, "Sandbagger")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualSandbaggerHistory, []*ms.ModAction{resetAction}))
	is.True(actualSandbaggerHistory[0] != nil)
	is.True(actualSandbaggerHistory[0].EndTime != nil)
	is.True(actualSandbaggerHistory[0].StartTime != nil)
	is.True(actualSandbaggerHistory[0].RemoverUserId == "")
	is.NoErr(equalTimes(actualSandbaggerHistory[0].EndTime, actualSandbaggerHistory[0].StartTime))
	is.NoErr(equalTimes(actualSandbaggerHistory[0].EndTime, actualSandbaggerHistory[0].RemovedTime))
	is.NoErr(equalTimes(actualSandbaggerHistory[0].StartTime, actualSandbaggerHistory[0].EndTime))

	actualCheaterActions, err := GetActions(ctx, us, "Cheater")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualCheaterActions, makeActionMap([]*ms.ModAction{suspendAction})))
	is.True(actualCheaterActions[suspendAction.Type.String()].EndTime != nil)
	is.True(actualCheaterActions[suspendAction.Type.String()].StartTime != nil)

	actualCheaterHistory, err := GetActionHistory(ctx, us, "Cheater")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualCheaterHistory, []*ms.ModAction{}))

	longerSuspendAction := &ms.ModAction{UserId: "Cheater", Type: ms.ModActionType_SUSPEND_ACCOUNT, Duration: 200}

	// Overwrite some actions
	err = ApplyActions(ctx, us, cs, []*ms.ModAction{longerSuspendAction})
	is.NoErr(err)

	actualCheaterActions, err = GetActions(ctx, us, "Cheater")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualCheaterActions, makeActionMap([]*ms.ModAction{longerSuspendAction})))
	is.True(actualCheaterActions[suspendAction.Type.String()].EndTime != nil)
	is.True(actualCheaterActions[suspendAction.Type.String()].StartTime != nil)
	is.True(actualCheaterActions[suspendAction.Type.String()].Duration == 200)

	actualCheaterHistory, err = GetActionHistory(ctx, us, "Cheater")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualCheaterHistory, []*ms.ModAction{suspendAction}))
	is.True(actualCheaterHistory[0].RemoverUserId == "Moderator")

	// Recheck Spammer actions
	permaban, err = ActionExists(ctx, us, "Spammer", false, []ms.ModActionType{muteAction.Type})
	is.True(!permaban)
	is.True(err != nil)

	actualSpammerActions, err = GetActions(ctx, us, "Spammer")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualSpammerActions, makeActionMap([]*ms.ModAction{muteAction})))
	is.True(actualSpammerActions[muteAction.Type.String()].EndTime != nil)
	is.True(actualSpammerActions[muteAction.Type.String()].StartTime != nil)

	actualSpammerHistory, err = GetActionHistory(ctx, us, "Spammer")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualSpammerHistory, []*ms.ModAction{}))

	// Wait
	time.Sleep(time.Duration(muteDuration+1) * time.Second)

	// Recheck Spammer actions
	permaban, err = ActionExists(ctx, us, "Spammer", false, []ms.ModActionType{muteAction.Type})
	is.True(!permaban)
	is.NoErr(err)
	actualSpammerActions, err = GetActions(ctx, us, "Spammer")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualSpammerActions, makeActionMap([]*ms.ModAction{})))

	actualSpammerHistory, err = GetActionHistory(ctx, us, "Spammer")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualSpammerHistory, []*ms.ModAction{muteAction}))
	is.True(actualSpammerHistory[0].EndTime != nil)
	is.True(actualSpammerHistory[0].StartTime != nil)
	is.True(actualSpammerHistory[0].RemoverUserId == "")

	// Test negative durations
	invalidSuspendAction := &ms.ModAction{UserId: "Cheater", Type: ms.ModActionType_SUSPEND_ACCOUNT, Duration: -100}

	err = ApplyActions(ctx, us, cs, []*ms.ModAction{invalidSuspendAction})
	is.True(err.Error() == "nontransient moderator action has a negative duration: -100")

	// Apply a permanent action

	permanentSuspendAction := &ms.ModAction{UserId: "Sandbagger", Type: ms.ModActionType_SUSPEND_ACCOUNT, Duration: 0}

	err = ApplyActions(ctx, us, cs, []*ms.ModAction{permanentSuspendAction})
	is.NoErr(err)

	permaban, err = ActionExists(ctx, us, "Sandbagger", false, []ms.ModActionType{permanentSuspendAction.Type})
	is.True(permaban)
	is.True(err.Error() == "This account has been deactivated. If you think this is an error, contact conduct@woogles.io.")
	permaban, err = ActionExists(ctx, us, "Sandbagger", true, []ms.ModActionType{permanentSuspendAction.Type})
	is.True(permaban)
	is.True(err.Error() == "Whoops, something went wrong! Please log out and try logging in again.")

	actualSandbaggerActions, err = GetActions(ctx, us, "Sandbagger")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualSandbaggerActions, makeActionMap([]*ms.ModAction{permanentSuspendAction})))
	is.True(actualSandbaggerActions[permanentSuspendAction.Type.String()].EndTime == nil)
	is.True(actualSandbaggerActions[permanentSuspendAction.Type.String()].StartTime != nil)

	actualSandbaggerHistory, err = GetActionHistory(ctx, us, "Sandbagger")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualSandbaggerHistory, []*ms.ModAction{resetAction}))

	// Remove an action
	err = RemoveActions(ctx, us, []*ms.ModAction{permanentSuspendAction})
	is.NoErr(err)

	permaban, err = ActionExists(ctx, us, "Sandbagger", false, []ms.ModActionType{permanentSuspendAction.Type})
	is.True(!permaban)
	is.NoErr(err)

	actualSandbaggerActions, err = GetActions(ctx, us, "Sandbagger")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualSandbaggerActions, makeActionMap([]*ms.ModAction{})))

	actualSandbaggerHistory, err = GetActionHistory(ctx, us, "Sandbagger")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualSandbaggerHistory, []*ms.ModAction{resetAction, permanentSuspendAction}))
	is.True(actualSandbaggerHistory[1].RemoverUserId == "Moderator")
	is.True(actualSandbaggerHistory[1].RemovedTime != nil)
	is.True(actualSandbaggerHistory[1].StartTime != nil)
	is.True(actualSandbaggerHistory[1].EndTime == nil)

	// Apply one than one action and confirm that the longer action is being applied

	now := time.Now()
	futureDate := now.Add(time.Duration(60 * 60 * time.Second))
	longerDuration := int32(time.Until(futureDate).Seconds()) + 1
	shorterDuration := longerDuration - (60 * 5)

	longerHackerAction := &ms.ModAction{UserId: "Hacker", Type: ms.ModActionType_SUSPEND_RATED_GAMES, Duration: longerDuration}
	hackerAction := &ms.ModAction{UserId: "Hacker", Type: ms.ModActionType_SUSPEND_GAMES, Duration: shorterDuration}

	err = ApplyActions(ctx, us, cs, []*ms.ModAction{hackerAction, longerHackerAction})
	is.NoErr(err)

	_, err = ActionExists(ctx, us, "Hacker", false, []ms.ModActionType{hackerAction.Type, longerHackerAction.Type})
	year, month, day := futureDate.UTC().Date()
	errString = fmt.Sprintf("You are suspended from playing rated games until %v %v, %v.", month, day, year)
	is.True(err.Error() == errString)

	// Apply a permanent action and confirm that the permanent action is being applied

	permanentHackerAction := &ms.ModAction{UserId: "Hacker", Type: ms.ModActionType_SUSPEND_ACCOUNT, Duration: 0}

	err = ApplyActions(ctx, us, cs, []*ms.ModAction{permanentHackerAction})
	is.NoErr(err)

	_, err = ActionExists(ctx, us, "Hacker", false, []ms.ModActionType{hackerAction.Type, longerHackerAction.Type, permanentHackerAction.Type})
	is.True(err.Error() == "Whoops, something went wrong! Please log out and try logging in again.")

	// Apply a delete action and ensure that the profile is deleted and the account is suspended
	deleteAbout := "plz delet this"
	err = us.SetPersonalInfo(ctx, "Deleter", "email", "firstname", "lastname", "2000-01-01", "USA", deleteAbout)
	is.NoErr(err)

	deleterUser, err := us.GetByUUID(ctx, "Deleter")
	is.NoErr(err)
	is.True(deleteAbout == deleterUser.Profile.About)

	deleteAction := &ms.ModAction{UserId: "Deleter", Type: ms.ModActionType_DELETE_ACCOUNT, Duration: 9}
	err = ApplyActions(ctx, us, cs, []*ms.ModAction{deleteAction})
	is.NoErr(err)

	permaban, err = ActionExists(ctx, us, "Deleter", false, []ms.ModActionType{ms.ModActionType_SUSPEND_ACCOUNT})
	is.True(permaban)
	is.True(err.Error() == "This account has been deactivated. If you think this is an error, contact conduct@woogles.io.")
	deleterUser, err = us.GetByUUID(ctx, "Deleter")
	is.NoErr(err)
	is.True(deleterUser.Profile.About == "")
}

// TestModDB is identical to the test above, except it uses the DB methods
// to confirm the actual results.
// This can be deleted once the migration is complete
func TestModDB(t *testing.T) {
	is := is.New(t)
	session := &entity.Session{
		ID:       "abcdef",
		Username: "Moderator",
		UserUUID: "Moderator",
		Expiry:   time.Now().Add(time.Second * 100)}
	ctx := context.Background()
	ctx = apiserver.PlaceInContext(ctx, session)
	recreateDB()
	us := userStore()
	cs := chatStore()

	defer func() {
		us.(*user.DBStore).Disconnect()
	}()

	var muteDuration int32 = 2

	muteAction := &ms.ModAction{UserId: "Spammer", ApplierUserId: "Moderator", Type: ms.ModActionType_MUTE, Duration: muteDuration}
	// Negative value for duration should not matter for transient actions
	resetAction := &ms.ModAction{UserId: "Sandbagger", ApplierUserId: "Moderator", Type: ms.ModActionType_RESET_STATS_AND_RATINGS, Duration: -10}
	suspendAction := &ms.ModAction{UserId: "Cheater", ApplierUserId: "Moderator", Type: ms.ModActionType_SUSPEND_ACCOUNT, Duration: 100}

	// Remove an action that does not exist
	err := RemoveActions(ctx, us, []*ms.ModAction{muteAction})
	errString := fmt.Sprintf("user does not have current action %s", muteAction.Type.String())
	is.True(err.Error() == errString)

	// Apply Actions
	err = ApplyActions(ctx, us, cs, []*ms.ModAction{muteAction, resetAction, suspendAction})
	is.NoErr(err)

	permaban, err := ActionExistsDB(ctx, us, "Spammer", false, []ms.ModActionType{muteAction.Type})
	is.True(!permaban)
	is.True(err != nil)
	permaban, err = ActionExistsDB(ctx, us, "Sandbagger", false, []ms.ModActionType{resetAction.Type})
	is.True(!permaban)
	is.NoErr(err)
	permaban, err = ActionExistsDB(ctx, us, "Cheater", false, []ms.ModActionType{suspendAction.Type})
	is.True(!permaban)
	is.True(err != nil)

	// Check Actions
	actualSpammerActions, err := us.GetActionsDB(ctx, "Spammer")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualSpammerActions, makeActionMap([]*ms.ModAction{muteAction})))
	is.True(actualSpammerActions[muteAction.Type.String()].EndTime != nil)
	is.True(actualSpammerActions[muteAction.Type.String()].StartTime != nil)

	actualSpammerHistory, err := us.GetActionHistoryDB(ctx, "Spammer")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualSpammerHistory, []*ms.ModAction{}))

	actualSandbaggerActions, err := us.GetActionsDB(ctx, "Sandbagger")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualSandbaggerActions, makeActionMap([]*ms.ModAction{})))

	actualSandbaggerHistory, err := us.GetActionHistoryDB(ctx, "Sandbagger")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualSandbaggerHistory, []*ms.ModAction{resetAction}))
	is.True(actualSandbaggerHistory[0] != nil)
	is.True(actualSandbaggerHistory[0].EndTime != nil)
	is.True(actualSandbaggerHistory[0].StartTime != nil)
	is.True(actualSandbaggerHistory[0].RemoverUserId == "")
	is.NoErr(equalTimes(actualSandbaggerHistory[0].EndTime, actualSandbaggerHistory[0].StartTime))
	// This constraint is dropped for the DB actions. It is a convention
	// to set the removed time to the end time for transient actions, but it is not necessary.
	// is.NoErr(equalTimes(actualSandbaggerHistory[0].EndTime, actualSandbaggerHistory[0].RemovedTime))

	actualCheaterActions, err := us.GetActionsDB(ctx, "Cheater")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualCheaterActions, makeActionMap([]*ms.ModAction{suspendAction})))
	is.True(actualCheaterActions[suspendAction.Type.String()].EndTime != nil)
	is.True(actualCheaterActions[suspendAction.Type.String()].StartTime != nil)

	actualCheaterHistory, err := us.GetActionHistoryDB(ctx, "Cheater")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualCheaterHistory, []*ms.ModAction{}))

	longerSuspendAction := &ms.ModAction{UserId: "Cheater", Type: ms.ModActionType_SUSPEND_ACCOUNT, Duration: 200}

	// Overwrite some actions
	err = ApplyActions(ctx, us, cs, []*ms.ModAction{longerSuspendAction})
	is.NoErr(err)

	actualCheaterActions, err = us.GetActionsDB(ctx, "Cheater")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualCheaterActions, makeActionMap([]*ms.ModAction{longerSuspendAction})))
	is.True(actualCheaterActions[suspendAction.Type.String()].EndTime != nil)
	is.True(actualCheaterActions[suspendAction.Type.String()].StartTime != nil)
	is.True(actualCheaterActions[suspendAction.Type.String()].Duration == 200)

	actualCheaterHistory, err = us.GetActionHistoryDB(ctx, "Cheater")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualCheaterHistory, []*ms.ModAction{suspendAction}))
	is.True(actualCheaterHistory[0].RemoverUserId == "Moderator")

	// Recheck Spammer actions
	permaban, err = ActionExistsDB(ctx, us, "Spammer", false, []ms.ModActionType{muteAction.Type})
	is.True(!permaban)
	is.True(err != nil)

	actualSpammerActions, err = us.GetActionsDB(ctx, "Spammer")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualSpammerActions, makeActionMap([]*ms.ModAction{muteAction})))
	is.True(actualSpammerActions[muteAction.Type.String()].EndTime != nil)
	is.True(actualSpammerActions[muteAction.Type.String()].StartTime != nil)

	actualSpammerHistory, err = us.GetActionHistoryDB(ctx, "Spammer")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualSpammerHistory, []*ms.ModAction{}))

	// Wait
	time.Sleep(time.Duration(muteDuration+1) * time.Second)

	// Recheck Spammer actions
	permaban, err = ActionExistsDB(ctx, us, "Spammer", false, []ms.ModActionType{muteAction.Type})
	is.True(!permaban)
	is.NoErr(err)
	actualSpammerActions, err = us.GetActionsDB(ctx, "Spammer")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualSpammerActions, makeActionMap([]*ms.ModAction{})))

	actualSpammerHistory, err = us.GetActionHistoryDB(ctx, "Spammer")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualSpammerHistory, []*ms.ModAction{muteAction}))
	is.True(actualSpammerHistory[0].EndTime != nil)
	is.True(actualSpammerHistory[0].StartTime != nil)
	is.True(actualSpammerHistory[0].RemoverUserId == "")

	// Test negative durations
	invalidSuspendAction := &ms.ModAction{UserId: "Cheater", Type: ms.ModActionType_SUSPEND_ACCOUNT, Duration: -100}

	err = ApplyActions(ctx, us, cs, []*ms.ModAction{invalidSuspendAction})
	is.True(err.Error() == "nontransient moderator action has a negative duration: -100")

	// Apply a permanent action

	permanentSuspendAction := &ms.ModAction{UserId: "Sandbagger", Type: ms.ModActionType_SUSPEND_ACCOUNT, Duration: 0}

	err = ApplyActions(ctx, us, cs, []*ms.ModAction{permanentSuspendAction})
	is.NoErr(err)

	permaban, err = ActionExistsDB(ctx, us, "Sandbagger", false, []ms.ModActionType{permanentSuspendAction.Type})
	is.True(permaban)
	is.True(err.Error() == "This account has been deactivated. If you think this is an error, contact conduct@woogles.io.")
	permaban, err = ActionExistsDB(ctx, us, "Sandbagger", true, []ms.ModActionType{permanentSuspendAction.Type})
	is.True(permaban)
	is.True(err.Error() == "Whoops, something went wrong! Please log out and try logging in again.")

	actualSandbaggerActions, err = us.GetActionsDB(ctx, "Sandbagger")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualSandbaggerActions, makeActionMap([]*ms.ModAction{permanentSuspendAction})))
	is.True(actualSandbaggerActions[permanentSuspendAction.Type.String()].EndTime == nil)
	is.True(actualSandbaggerActions[permanentSuspendAction.Type.String()].StartTime != nil)

	actualSandbaggerHistory, err = us.GetActionHistoryDB(ctx, "Sandbagger")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualSandbaggerHistory, []*ms.ModAction{resetAction}))

	// Remove an action
	err = RemoveActions(ctx, us, []*ms.ModAction{permanentSuspendAction})
	is.NoErr(err)
	permaban, err = ActionExistsDB(ctx, us, "Sandbagger", false, []ms.ModActionType{permanentSuspendAction.Type})
	is.True(!permaban)
	is.NoErr(err)

	actualSandbaggerActions, err = us.GetActionsDB(ctx, "Sandbagger")
	is.NoErr(err)
	is.NoErr(equalActionMaps(actualSandbaggerActions, makeActionMap([]*ms.ModAction{})))

	actualSandbaggerHistory, err = us.GetActionHistoryDB(ctx, "Sandbagger")
	is.NoErr(err)
	is.NoErr(equalActionHistories(actualSandbaggerHistory, []*ms.ModAction{resetAction, permanentSuspendAction}))
	is.True(actualSandbaggerHistory[1].RemoverUserId == "Moderator")
	is.True(actualSandbaggerHistory[1].RemovedTime != nil)
	is.True(actualSandbaggerHistory[1].StartTime != nil)
	is.True(actualSandbaggerHistory[1].EndTime == nil)

	// Apply one than one action and confirm that the longer action is being applied

	now := time.Now()
	futureDate := now.Add(time.Duration(60 * 60 * time.Second))
	longerDuration := int32(time.Until(futureDate).Seconds()) + 1
	shorterDuration := longerDuration - (60 * 5)

	longerHackerAction := &ms.ModAction{UserId: "Hacker", Type: ms.ModActionType_SUSPEND_RATED_GAMES, Duration: longerDuration}
	hackerAction := &ms.ModAction{UserId: "Hacker", Type: ms.ModActionType_SUSPEND_GAMES, Duration: shorterDuration}

	err = ApplyActions(ctx, us, cs, []*ms.ModAction{hackerAction, longerHackerAction})
	is.NoErr(err)

	_, err = ActionExistsDB(ctx, us, "Hacker", false, []ms.ModActionType{hackerAction.Type, longerHackerAction.Type})
	year, month, day := futureDate.UTC().Date()
	errString = fmt.Sprintf("You are suspended from playing rated games until %v %v, %v.", month, day, year)
	is.True(err.Error() == errString)

	// Apply a permanent action and confirm that the permanent action is being applied

	permanentHackerAction := &ms.ModAction{UserId: "Hacker", Type: ms.ModActionType_SUSPEND_ACCOUNT, Duration: 0}

	err = ApplyActions(ctx, us, cs, []*ms.ModAction{permanentHackerAction})
	is.NoErr(err)

	_, err = ActionExistsDB(ctx, us, "Hacker", false, []ms.ModActionType{hackerAction.Type, longerHackerAction.Type, permanentHackerAction.Type})
	is.True(err.Error() == "Whoops, something went wrong! Please log out and try logging in again.")

	// Apply a delete action and ensure that the profile is deleted and the account is suspended
	deleteAbout := "plz delet this"
	err = us.SetPersonalInfo(ctx, "Deleter", "email", "firstname", "lastname", "2000-01-01", "USA", deleteAbout)
	is.NoErr(err)

	deleterUser, err := us.GetByUUID(ctx, "Deleter")
	is.NoErr(err)
	is.True(deleteAbout == deleterUser.Profile.About)

	deleteAction := &ms.ModAction{UserId: "Deleter", Type: ms.ModActionType_DELETE_ACCOUNT, Duration: 9}
	err = ApplyActions(ctx, us, cs, []*ms.ModAction{deleteAction})
	is.NoErr(err)

	permaban, err = ActionExistsDB(ctx, us, "Deleter", false, []ms.ModActionType{ms.ModActionType_SUSPEND_ACCOUNT})
	is.True(permaban)
	is.True(err.Error() == "This account has been deactivated. If you think this is an error, contact conduct@woogles.io.")
	deleterUser, err = us.GetByUUID(ctx, "Deleter")
	is.NoErr(err)
	is.True(deleterUser.Profile.About == "")
}

func TestNotifications(t *testing.T) {
	is := is.New(t)
	session := &entity.Session{
		ID:       "abcdef",
		Username: "Moderator",
		UserUUID: "Moderator",
		Expiry:   time.Now().Add(time.Second * 100)}
	ctx := context.Background()
	ctx = apiserver.PlaceInContext(ctx, session)
	ctx = context.WithValue(ctx, config.CtxKeyword,
		&config.Config{MailgunKey: os.Getenv("TEST_MAILGUN_KEY"), DiscordToken: os.Getenv("TEST_DISCORD_TOKEN")})

	recreateDB()
	us := userStore()
	cs := chatStore()

	permanentAction := &ms.ModAction{UserId: "Spammer", Type: ms.ModActionType_MUTE, Duration: 0}
	suspendAction := &ms.ModAction{UserId: "Cheater", Type: ms.ModActionType_SUSPEND_ACCOUNT, Duration: 100, EmailType: ms.EmailType_CHEATING}
	deleteAction := &ms.ModAction{UserId: "Cheater", Type: ms.ModActionType_DELETE_ACCOUNT}
	removeAction := &ms.ModAction{UserId: "Spammer", Type: ms.ModActionType_MUTE, Duration: 40}
	closeAction := &ms.ModAction{UserId: "Moderator", Type: ms.ModActionType_DELETE_ACCOUNT}

	// Apply Actions
	err := ApplyActions(ctx, us, cs, []*ms.ModAction{permanentAction})
	is.NoErr(err)
	err = ApplyActions(ctx, us, cs, []*ms.ModAction{suspendAction})
	is.NoErr(err)
	err = ApplyActions(ctx, us, cs, []*ms.ModAction{deleteAction})
	is.NoErr(err)
	err = ApplyActions(ctx, us, cs, []*ms.ModAction{removeAction})
	is.NoErr(err)
	err = ApplyActions(ctx, us, cs, []*ms.ModAction{closeAction})
	is.NoErr(err)
	us.(*user.DBStore).Disconnect()
}

func equalActionHistories(ah1 []*ms.ModAction, ah2 []*ms.ModAction) error {
	if len(ah1) != len(ah2) {
		return errors.New("history lengths are not the same")
	}
	for i := 0; i < len(ah1); i++ {
		a1 := ah1[i]
		a2 := ah2[i]
		if !equalActions(a1, a2) {
			return fmt.Errorf("actions are not equal:\n  a1.UserId: %s a1.Type: %s, a1.Duration: %d\n"+
				"  a1.UserId: %s a1.Type: %s, a1.Duration: %d\n", a1.UserId, a1.Type, a1.Duration,
				a2.UserId, a2.Type, a2.Duration)
		}
	}
	return nil
}

func equalActionMaps(am1 map[string]*ms.ModAction, am2 map[string]*ms.ModAction) error {
	for key := range ms.ModActionType_value {
		a1 := am1[key]
		a2 := am2[key]
		if a1 == nil && a2 == nil {
			continue
		}
		if a1 == nil || a2 == nil {
			return fmt.Errorf("exactly one actions is nil: %s", key)
		}
		if !equalActions(a1, a2) {
			return fmt.Errorf("actions are not equal:\n  a1.UserId: %s a1.Type: %s, a1.Duration: %d\n"+
				"  a1.UserId: %s a1.Type: %s, a1.Duration: %d\n", a1.UserId, a1.Type, a1.Duration,
				a2.UserId, a2.Type, a2.Duration)
		}
	}
	return nil
}

func equalActions(a1 *ms.ModAction, a2 *ms.ModAction) bool {
	return a1.UserId == a2.UserId &&
		a1.Type == a2.Type &&
		a1.Duration == a2.Duration
}

func equalTimes(t1 *timestamppb.Timestamp, t2 *timestamppb.Timestamp) error {
	gt1 := t1.AsTime()
	gt2 := t2.AsTime()
	if !gt1.Equal(gt2) {
		return fmt.Errorf("times are not equal:\n%v\n%v", gt1, gt2)
	}
	return nil
}

func makeActionMap(actions []*ms.ModAction) map[string]*ms.ModAction {
	actionMap := make(map[string]*ms.ModAction)
	for _, action := range actions {
		actionMap[action.Type.String()] = action
	}
	return actionMap
}
