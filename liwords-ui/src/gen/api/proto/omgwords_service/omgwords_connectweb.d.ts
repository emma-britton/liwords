// @generated by protoc-gen-connect-web v0.3.1
// @generated from file omgwords_service/omgwords.proto (package game_service, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {AnnotatedGameEvent, BroadcastGamePrivacy, BroadcastGamesResponse, ChallengeBonusPointsEvent, CreateBroadcastGameRequest, CreateBroadcastGameResponse, DeleteBroadcastGameRequest, DeleteBroadcastGameResponse, GameEventResponse, GetGameDocumentRequest, GetGamesForEditorRequest, GetMyUnfinishedGamesRequest, TimePenaltyEvent} from "./omgwords_pb.js";
import {MethodKind} from "@bufbuild/protobuf";
import {GameDocument} from "../ipc/omgwords_pb.js";

/**
 * GameEventService will handle our game event API. We can connect bots to
 * this API, or use it for sandbox mode, or for live annotations, etc.
 *
 * @generated from service game_service.GameEventService
 */
export declare const GameEventService: {
  readonly typeName: "game_service.GameEventService",
  readonly methods: {
    /**
     * CreateBroadcastGame will create a game for Woogles broadcast
     *
     * @generated from rpc game_service.GameEventService.CreateBroadcastGame
     */
    readonly createBroadcastGame: {
      readonly name: "CreateBroadcastGame",
      readonly I: typeof CreateBroadcastGameRequest,
      readonly O: typeof CreateBroadcastGameResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc game_service.GameEventService.DeleteBroadcastGame
     */
    readonly deleteBroadcastGame: {
      readonly name: "DeleteBroadcastGame",
      readonly I: typeof DeleteBroadcastGameRequest,
      readonly O: typeof DeleteBroadcastGameResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc game_service.GameEventService.SendGameEvent
     */
    readonly sendGameEvent: {
      readonly name: "SendGameEvent",
      readonly I: typeof AnnotatedGameEvent,
      readonly O: typeof GameEventResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * SendTimePenaltyEvent sends a time penalty event. It should be the
     * last event right before a game ends.
     *
     * @generated from rpc game_service.GameEventService.SendTimePenaltyEvent
     */
    readonly sendTimePenaltyEvent: {
      readonly name: "SendTimePenaltyEvent",
      readonly I: typeof TimePenaltyEvent,
      readonly O: typeof GameEventResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * SendChallengeBonusEvent sends a bonus points event. When challenging
     * a play that is good, depending on the challenge rule a certain number
     * of points may be added to the play. Since broadcast games can reflect
     * real-life games, the number of points can be variable (for example,
     * 15 points for 5-pt challenge if 3 plays are challenged)
     *
     * @generated from rpc game_service.GameEventService.SendChallengeBonusEvent
     */
    readonly sendChallengeBonusEvent: {
      readonly name: "SendChallengeBonusEvent",
      readonly I: typeof ChallengeBonusPointsEvent,
      readonly O: typeof GameEventResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc game_service.GameEventService.SetBroadcastGamePrivacy
     */
    readonly setBroadcastGamePrivacy: {
      readonly name: "SetBroadcastGamePrivacy",
      readonly I: typeof BroadcastGamePrivacy,
      readonly O: typeof GameEventResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc game_service.GameEventService.GetGamesForEditor
     */
    readonly getGamesForEditor: {
      readonly name: "GetGamesForEditor",
      readonly I: typeof GetGamesForEditorRequest,
      readonly O: typeof BroadcastGamesResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc game_service.GameEventService.GetMyUnfinishedGames
     */
    readonly getMyUnfinishedGames: {
      readonly name: "GetMyUnfinishedGames",
      readonly I: typeof GetMyUnfinishedGamesRequest,
      readonly O: typeof BroadcastGamesResponse,
      readonly kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc game_service.GameEventService.GetGameDocument
     */
    readonly getGameDocument: {
      readonly name: "GetGameDocument",
      readonly I: typeof GetGameDocumentRequest,
      readonly O: typeof GameDocument,
      readonly kind: MethodKind.Unary,
    },
  }
};

