// @generated by protoc-gen-connect-web v0.7.0
// @generated from file game_service/game_service.proto (package game_service, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { GameDocumentRequest, GameDocumentResponse, GameHistoryRequest, GameHistoryResponse, GameInfoRequest, GCGRequest, GCGResponse, RecentGamesRequest, RematchStreakRequest, StreakInfoResponse } from "./game_service_pb.js";
import { GameInfoResponse, GameInfoResponses } from "../ipc/omgwords_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service game_service.GameMetadataService
 */
export const GameMetadataService = {
  typeName: "game_service.GameMetadataService",
  methods: {
    /**
     * @generated from rpc game_service.GameMetadataService.GetMetadata
     */
    getMetadata: {
      name: "GetMetadata",
      I: GameInfoRequest,
      O: GameInfoResponse,
      kind: MethodKind.Unary,
    },
    /**
     * GetGCG gets a GCG string for the given game ID.
     *
     * @generated from rpc game_service.GameMetadataService.GetGCG
     */
    getGCG: {
      name: "GetGCG",
      I: GCGRequest,
      O: GCGResponse,
      kind: MethodKind.Unary,
    },
    /**
     * GetGameHistory gets a GameHistory for the given game ID. GameHistory
     * is our internal representation of a game's state.
     *
     * @generated from rpc game_service.GameMetadataService.GetGameHistory
     */
    getGameHistory: {
      name: "GetGameHistory",
      I: GameHistoryRequest,
      O: GameHistoryResponse,
      kind: MethodKind.Unary,
    },
    /**
     * GetRecentGames gets recent games for a user.
     *
     * @generated from rpc game_service.GameMetadataService.GetRecentGames
     */
    getRecentGames: {
      name: "GetRecentGames",
      I: RecentGamesRequest,
      O: GameInfoResponses,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc game_service.GameMetadataService.GetRematchStreak
     */
    getRematchStreak: {
      name: "GetRematchStreak",
      I: RematchStreakRequest,
      O: StreakInfoResponse,
      kind: MethodKind.Unary,
    },
    /**
     * GetGameDocument gets a Game Document. This will eventually obsolete
     * GetGameHistory. Does not work with annotated games for now.
     *
     * @generated from rpc game_service.GameMetadataService.GetGameDocument
     */
    getGameDocument: {
      name: "GetGameDocument",
      I: GameDocumentRequest,
      O: GameDocumentResponse,
      kind: MethodKind.Unary,
    },
  }
};

