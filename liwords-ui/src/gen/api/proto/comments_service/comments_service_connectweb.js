// @generated by protoc-gen-connect-web v0.8.5
// @generated from file comments_service/comments_service.proto (package comments_service, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { AddCommentRequest, AddCommentResponse, DeleteCommentRequest, DeleteCommentResponse, EditCommentRequest, EditCommentResponse, GetCommentsAllGamesRequest, GetCommentsRequest, GetCommentsResponse } from "./comments_service_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service comments_service.GameCommentService
 */
export const GameCommentService = {
  typeName: "comments_service.GameCommentService",
  methods: {
    /**
     * @generated from rpc comments_service.GameCommentService.AddGameComment
     */
    addGameComment: {
      name: "AddGameComment",
      I: AddCommentRequest,
      O: AddCommentResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc comments_service.GameCommentService.GetGameComments
     */
    getGameComments: {
      name: "GetGameComments",
      I: GetCommentsRequest,
      O: GetCommentsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc comments_service.GameCommentService.EditGameComment
     */
    editGameComment: {
      name: "EditGameComment",
      I: EditCommentRequest,
      O: EditCommentResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc comments_service.GameCommentService.DeleteGameComment
     */
    deleteGameComment: {
      name: "DeleteGameComment",
      I: DeleteCommentRequest,
      O: DeleteCommentResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc comments_service.GameCommentService.GetCommentsForAllGames
     */
    getCommentsForAllGames: {
      name: "GetCommentsForAllGames",
      I: GetCommentsAllGamesRequest,
      O: GetCommentsResponse,
      kind: MethodKind.Unary,
    },
  }
};

