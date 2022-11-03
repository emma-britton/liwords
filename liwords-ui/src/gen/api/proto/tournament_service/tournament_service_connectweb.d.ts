// @generated by protoc-gen-connect-web v0.3.1
// @generated from file api/proto/tournament_service/tournament_service.proto (package tournament_service, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {CheckinRequest, ClubSessionResponse, ClubSessionsResponse, ExportTournamentRequest, ExportTournamentResponse, FinishTournamentRequest, GetTournamentMetadataRequest, GetTournamentRequest, NewClubSessionRequest, NewTournamentRequest, NewTournamentResponse, PairRoundRequest, RecentClubSessionsRequest, RecentGamesRequest, RecentGamesResponse, SetTournamentMetadataRequest, SingleRoundControlsRequest, TournamentDivisionRequest, TournamentMetadataResponse, TournamentPairingsRequest, TournamentResponse, TournamentResultOverrideRequest, TournamentStartRoundCountdownRequest, UncheckInRequest, UnstartTournamentRequest} from "./tournament_service_pb.js";
import {MethodKind} from "@bufbuild/protobuf";
import {DivisionControls, DivisionRoundControls, FullTournamentDivisions, TournamentPersons} from "../ipc/tournament_pb.js";

/**
 * @generated from service tournament_service.TournamentService
 */
export declare const TournamentService: {
  readonly typeName: "tournament_service.TournamentService",
  readonly methods: {
    /**
     * @generated from rpc tournament_service.TournamentService.NewTournament
     */
    readonly newTournament: {
      readonly name: "NewTournament",
      readonly I: typeof NewTournamentRequest,
      readonly O: typeof NewTournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.GetTournamentMetadata
     */
    readonly getTournamentMetadata: {
      readonly name: "GetTournamentMetadata",
      readonly I: typeof GetTournamentMetadataRequest,
      readonly O: typeof TournamentMetadataResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.GetTournament
     */
    readonly getTournament: {
      readonly name: "GetTournament",
      readonly I: typeof GetTournamentRequest,
      readonly O: typeof FullTournamentDivisions,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.FinishTournament
     */
    readonly finishTournament: {
      readonly name: "FinishTournament",
      readonly I: typeof FinishTournamentRequest,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.SetTournamentMetadata
     */
    readonly setTournamentMetadata: {
      readonly name: "SetTournamentMetadata",
      readonly I: typeof SetTournamentMetadataRequest,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.PairRound
     */
    readonly pairRound: {
      readonly name: "PairRound",
      readonly I: typeof PairRoundRequest,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.SetSingleRoundControls
     */
    readonly setSingleRoundControls: {
      readonly name: "SetSingleRoundControls",
      readonly I: typeof SingleRoundControlsRequest,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.SetRoundControls
     */
    readonly setRoundControls: {
      readonly name: "SetRoundControls",
      readonly I: typeof DivisionRoundControls,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.SetDivisionControls
     */
    readonly setDivisionControls: {
      readonly name: "SetDivisionControls",
      readonly I: typeof DivisionControls,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * Input to AddDirectors should be director usernames.
     *
     * @generated from rpc tournament_service.TournamentService.AddDirectors
     */
    readonly addDirectors: {
      readonly name: "AddDirectors",
      readonly I: typeof TournamentPersons,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * Input to RemoveDirectors should be director usernames.
     *
     * @generated from rpc tournament_service.TournamentService.RemoveDirectors
     */
    readonly removeDirectors: {
      readonly name: "RemoveDirectors",
      readonly I: typeof TournamentPersons,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.AddDivision
     */
    readonly addDivision: {
      readonly name: "AddDivision",
      readonly I: typeof TournamentDivisionRequest,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.RemoveDivision
     */
    readonly removeDivision: {
      readonly name: "RemoveDivision",
      readonly I: typeof TournamentDivisionRequest,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * Input to AddPlayers should be player usernames
     *
     * @generated from rpc tournament_service.TournamentService.AddPlayers
     */
    readonly addPlayers: {
      readonly name: "AddPlayers",
      readonly I: typeof TournamentPersons,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * Input to RemovePlayers should be player usernames
     *
     * @generated from rpc tournament_service.TournamentService.RemovePlayers
     */
    readonly removePlayers: {
      readonly name: "RemovePlayers",
      readonly I: typeof TournamentPersons,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.SetPairing
     */
    readonly setPairing: {
      readonly name: "SetPairing",
      readonly I: typeof TournamentPairingsRequest,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.SetResult
     */
    readonly setResult: {
      readonly name: "SetResult",
      readonly I: typeof TournamentResultOverrideRequest,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.StartRoundCountdown
     */
    readonly startRoundCountdown: {
      readonly name: "StartRoundCountdown",
      readonly I: typeof TournamentStartRoundCountdownRequest,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.RecentGames
     */
    readonly recentGames: {
      readonly name: "RecentGames",
      readonly I: typeof RecentGamesRequest,
      readonly O: typeof RecentGamesResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.CreateClubSession
     */
    readonly createClubSession: {
      readonly name: "CreateClubSession",
      readonly I: typeof NewClubSessionRequest,
      readonly O: typeof ClubSessionResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.GetRecentClubSessions
     */
    readonly getRecentClubSessions: {
      readonly name: "GetRecentClubSessions",
      readonly I: typeof RecentClubSessionsRequest,
      readonly O: typeof ClubSessionsResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.UnstartTournament
     */
    readonly unstartTournament: {
      readonly name: "UnstartTournament",
      readonly I: typeof UnstartTournamentRequest,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * Uncheck everyone in. Use this some time before the beginning of a session.
     *
     * @generated from rpc tournament_service.TournamentService.UncheckIn
     */
    readonly uncheckIn: {
      readonly name: "UncheckIn",
      readonly I: typeof UncheckInRequest,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * CheckIn allows players to check themselves in.
     *
     * @generated from rpc tournament_service.TournamentService.CheckIn
     */
    readonly checkIn: {
      readonly name: "CheckIn",
      readonly I: typeof CheckinRequest,
      readonly O: typeof TournamentResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc tournament_service.TournamentService.ExportTournament
     */
    readonly exportTournament: {
      readonly name: "ExportTournament",
      readonly I: typeof ExportTournamentRequest,
      readonly O: typeof ExportTournamentResponse,
      readonly kind: MethodKind.Unary,
    },
  }
};

