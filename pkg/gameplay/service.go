package gameplay

import (
	"context"

	"github.com/rs/zerolog/log"
	"github.com/twitchtv/twirp"

	"github.com/domino14/macondo/gcgio"
	macondopb "github.com/domino14/macondo/gen/api/proto/macondo"

	"github.com/domino14/liwords/pkg/apiserver"
	"github.com/domino14/liwords/pkg/config"
	entityutils "github.com/domino14/liwords/pkg/entity/utilities"
	"github.com/domino14/liwords/pkg/mod"
	"github.com/domino14/liwords/pkg/omgwords/stores"
	"github.com/domino14/liwords/pkg/user"
	"github.com/domino14/liwords/pkg/utilities"
	pb "github.com/domino14/liwords/rpc/api/proto/game_service"
	ipc "github.com/domino14/liwords/rpc/api/proto/ipc"
)

// GameService is a Twirp service that contains functions relevant to a game's
// metadata, stats, etc. All real-time functionality is handled in
// gameplay/game.go and related files.
type GameService struct {
	userStore user.Store
	gameStore GameStore
	cfg       *config.Config
	// New stores. These will replace the game store eventually.
	gameDocumentStore *stores.GameDocumentStore
}

// NewGameService creates a Twirp GameService
func NewGameService(u user.Store, gs GameStore, gds *stores.GameDocumentStore,
	cfg *config.Config) *GameService {
	return &GameService{u, gs, cfg, gds}
}

// GetMetadata gets metadata for the given game.
func (gs *GameService) GetMetadata(ctx context.Context, req *pb.GameInfoRequest) (*ipc.GameInfoResponse, error) {
	gir, err := gs.gameStore.GetMetadata(ctx, req.GameId)
	if err != nil {
		return nil, err
	}
	// Censors the response in-place
	if gir.Type == ipc.GameType_NATIVE {
		censorGameInfoResponse(ctx, gs.userStore, gir)
	}
	return gir, nil
}

// GetRematchStreak gets quickdata for the given rematch streak.
func (gs *GameService) GetRematchStreak(ctx context.Context, req *pb.RematchStreakRequest) (*pb.StreakInfoResponse, error) {
	resp, err := gs.gameStore.GetRematchStreak(ctx, req.OriginalRequestId)
	if err != nil {
		return nil, twirp.InternalErrorWith(err)
	}
	// Censors the response in-place
	censorStreakInfoResponse(ctx, gs.userStore, resp)
	return resp, nil
}

//	GetRecentGames gets quickdata for the numGames most recent games of the player
//
// offset by offset.
func (gs *GameService) GetRecentGames(ctx context.Context, req *pb.RecentGamesRequest) (*ipc.GameInfoResponses, error) {
	resp, err := gs.gameStore.GetRecentGames(ctx, req.Username, int(req.NumGames), int(req.Offset))
	if err != nil {
		return nil, twirp.NewError(twirp.InvalidArgument, err.Error())
	}
	user, err := gs.userStore.Get(ctx, req.Username)
	if err != nil {
		return nil, twirp.NewError(twirp.InvalidArgument, err.Error())
	}
	if mod.IsCensorable(ctx, gs.userStore, user.UUID) {
		// This view requires authentication.
		sess, err := apiserver.GetSession(ctx)
		if err != nil {
			return nil, err
		}

		viewer, err := gs.userStore.Get(ctx, sess.Username)
		if err != nil {
			log.Err(err).Msg("getting-user")
			return nil, twirp.InternalErrorWith(err)
		}
		if !viewer.IsMod && !viewer.IsAdmin {
			return &ipc.GameInfoResponses{}, nil
		}
	}
	// Censors the responses in-place
	censorGameInfoResponses(ctx, gs.userStore, resp)
	return resp, nil
}

// GetGCG downloads a GCG for a full native game, or a partial GCG
// for an annotated game.
func (gs *GameService) GetGCG(ctx context.Context, req *pb.GCGRequest) (*pb.GCGResponse, error) {
	hist, err := gs.gameStore.GetHistory(ctx, req.GameId)
	if err != nil {
		return nil, twirp.NewError(twirp.InvalidArgument, err.Error())
	}
	anno := false
	if hist.Version == 0 {
		// A shortcut for a blank history. Look in the game document store.
		gdoc, err := gs.gameDocumentStore.GetDocument(ctx, req.GameId, false)
		if err != nil {
			return nil, err
		}
		hist, err = entityutils.ToGameHistory(gdoc.GameDocument, gs.cfg)
		if err != nil {
			return nil, err
		}
		anno = true
	}

	hist = mod.CensorHistory(ctx, gs.userStore, hist)
	if hist.PlayState != macondopb.PlayState_GAME_OVER && !anno {
		return nil, twirp.NewError(twirp.InvalidArgument, "please wait until the game is over to download GCG")
	}
	gcg, err := gcgio.GameHistoryToGCG(hist, true)
	if err != nil {
		return nil, twirp.NewError(twirp.InvalidArgument, err.Error())
	}
	return &pb.GCGResponse{Gcg: gcg}, nil
}

func (gs *GameService) GetGameHistory(ctx context.Context, req *pb.GameHistoryRequest) (*pb.GameHistoryResponse, error) {
	hist, err := gs.gameStore.GetHistory(ctx, req.GameId)
	if err != nil {
		return nil, twirp.NewError(twirp.InvalidArgument, err.Error())
	}
	hist = mod.CensorHistory(ctx, gs.userStore, hist)
	if hist.PlayState != macondopb.PlayState_GAME_OVER {
		return nil, twirp.NewError(twirp.InvalidArgument, "please wait until the game is over to download GCG")
	}
	return &pb.GameHistoryResponse{History: hist}, nil
}

// XXX: GetGameDocument should be moved to omgwords service eventually, once
// we get rid of GameHistory and game entities etc.
func (gs *GameService) GetGameDocument(ctx context.Context, req *pb.GameDocumentRequest) (*pb.GameDocumentResponse, error) {
	g, err := gs.gameStore.Get(ctx, req.GameId)
	if err != nil {
		return nil, twirp.NewError(twirp.InvalidArgument, err.Error())
	}
	if g.History().PlayState != macondopb.PlayState_GAME_OVER {
		return nil, twirp.NewError(twirp.InvalidArgument, "please wait until the game is over to download GCG")
	}
	gdoc, err := entityutils.ToGameDocument(g, gs.cfg)
	if err != nil {
		return nil, twirp.NewError(twirp.Internal, err.Error())
	}
	return &pb.GameDocumentResponse{Document: gdoc}, nil
}

func censorPlayer(gir *ipc.GameInfoResponse, playerIndex int, censoredUsername string) {
	gir.Players[playerIndex].UserId = censoredUsername
	gir.Players[playerIndex].FullName = censoredUsername
	gir.Players[playerIndex].Nickname = censoredUsername
	gir.Players[playerIndex].CountryCode = ""
	gir.Players[playerIndex].Title = ""
	gir.Players[playerIndex].Rating = ""
}

func censorGameInfoResponse(ctx context.Context, us user.Store, gir *ipc.GameInfoResponse) {
	playerCensored := false
	if mod.IsCensorable(ctx, us, gir.Players[0].UserId) {
		censorPlayer(gir, 0, utilities.CensoredUsername)
		playerCensored = true
	}
	if mod.IsCensorable(ctx, us, gir.Players[1].UserId) {
		censoredUsername := utilities.CensoredUsername
		if playerCensored {
			censoredUsername = utilities.AnotherCensoredUsername
		}
		censorPlayer(gir, 1, censoredUsername)
	}
}

func censorStreakInfoResponse(ctx context.Context, us user.Store, sir *pb.StreakInfoResponse) {
	// This assumes up to two players
	playerCensored := false
	for _, pi := range sir.PlayersInfo {
		if mod.IsCensorable(ctx, us, pi.Uuid) {
			pi.Nickname = utilities.CensoredUsername
			pi.Uuid = utilities.CensoredUsername
			if playerCensored {
				pi.Nickname = utilities.AnotherCensoredUsername
				pi.Uuid = utilities.AnotherCensoredUsername
			}
			playerCensored = true
		}
	}
}

func censorGameInfoResponses(ctx context.Context, us user.Store, girs *ipc.GameInfoResponses) {
	knownUsers := make(map[string]bool)

	for _, gir := range girs.GameInfo {
		playerOne := gir.Players[0].UserId
		playerTwo := gir.Players[1].UserId

		_, known := knownUsers[playerOne]
		if !known {
			knownUsers[playerOne] = mod.IsCensorable(ctx, us, playerOne)
		}
		if knownUsers[playerOne] {
			censorPlayer(gir, 0, utilities.CensoredUsername)
		}

		_, known = knownUsers[playerTwo]
		if !known {
			knownUsers[playerTwo] = mod.IsCensorable(ctx, us, playerTwo)
		}
		if knownUsers[playerTwo] {
			censoredUsername := utilities.CensoredUsername
			if knownUsers[playerOne] {
				censoredUsername = utilities.AnotherCensoredUsername
			}
			censorPlayer(gir, 1, censoredUsername)
		}
	}
}
