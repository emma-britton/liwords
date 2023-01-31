// @generated by protoc-gen-es v1.0.0
// @generated from file puzzle_service/puzzle_service.proto (package puzzle_service, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3, Timestamp } from "@bufbuild/protobuf";
import { GameEvent, GameHistory, PuzzleGenerationRequest } from "../macondo/macondo_pb.js";
import { ClientGameplayEvent } from "../ipc/omgwords_pb.js";

/**
 * @generated from enum puzzle_service.PuzzleQueryResult
 */
export const PuzzleQueryResult = proto3.makeEnum(
  "puzzle_service.PuzzleQueryResult",
  [
    {no: 0, name: "UNSEEN"},
    {no: 1, name: "UNRATED"},
    {no: 2, name: "UNFINISHED"},
    {no: 3, name: "EXHAUSTED"},
    {no: 4, name: "RANDOM"},
    {no: 5, name: "START"},
  ],
);

/**
 * @generated from enum puzzle_service.PuzzleStatus
 */
export const PuzzleStatus = proto3.makeEnum(
  "puzzle_service.PuzzleStatus",
  [
    {no: 0, name: "UNANSWERED"},
    {no: 1, name: "CORRECT"},
    {no: 2, name: "INCORRECT"},
  ],
);

/**
 * @generated from message puzzle_service.StartPuzzleIdRequest
 */
export const StartPuzzleIdRequest = proto3.makeMessageType(
  "puzzle_service.StartPuzzleIdRequest",
  () => [
    { no: 1, name: "lexicon", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message puzzle_service.StartPuzzleIdResponse
 */
export const StartPuzzleIdResponse = proto3.makeMessageType(
  "puzzle_service.StartPuzzleIdResponse",
  () => [
    { no: 1, name: "puzzle_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "query_result", kind: "enum", T: proto3.getEnumType(PuzzleQueryResult) },
  ],
);

/**
 * @generated from message puzzle_service.NextPuzzleIdRequest
 */
export const NextPuzzleIdRequest = proto3.makeMessageType(
  "puzzle_service.NextPuzzleIdRequest",
  () => [
    { no: 1, name: "lexicon", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message puzzle_service.NextPuzzleIdResponse
 */
export const NextPuzzleIdResponse = proto3.makeMessageType(
  "puzzle_service.NextPuzzleIdResponse",
  () => [
    { no: 1, name: "puzzle_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "query_result", kind: "enum", T: proto3.getEnumType(PuzzleQueryResult) },
  ],
);

/**
 * @generated from message puzzle_service.NextClosestRatingPuzzleIdRequest
 */
export const NextClosestRatingPuzzleIdRequest = proto3.makeMessageType(
  "puzzle_service.NextClosestRatingPuzzleIdRequest",
  () => [
    { no: 1, name: "lexicon", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message puzzle_service.NextClosestRatingPuzzleIdResponse
 */
export const NextClosestRatingPuzzleIdResponse = proto3.makeMessageType(
  "puzzle_service.NextClosestRatingPuzzleIdResponse",
  () => [
    { no: 1, name: "puzzle_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "query_result", kind: "enum", T: proto3.getEnumType(PuzzleQueryResult) },
  ],
);

/**
 * @generated from message puzzle_service.PuzzleRequest
 */
export const PuzzleRequest = proto3.makeMessageType(
  "puzzle_service.PuzzleRequest",
  () => [
    { no: 1, name: "puzzle_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message puzzle_service.AnswerResponse
 */
export const AnswerResponse = proto3.makeMessageType(
  "puzzle_service.AnswerResponse",
  () => [
    { no: 1, name: "correct_answer", kind: "message", T: GameEvent },
    { no: 2, name: "status", kind: "enum", T: proto3.getEnumType(PuzzleStatus) },
    { no: 3, name: "attempts", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 4, name: "game_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "turn_number", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "after_text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "new_user_rating", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 8, name: "new_puzzle_rating", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 9, name: "first_attempt_time", kind: "message", T: Timestamp },
    { no: 10, name: "last_attempt_time", kind: "message", T: Timestamp },
  ],
);

/**
 * @generated from message puzzle_service.PuzzleResponse
 */
export const PuzzleResponse = proto3.makeMessageType(
  "puzzle_service.PuzzleResponse",
  () => [
    { no: 1, name: "history", kind: "message", T: GameHistory },
    { no: 2, name: "before_text", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "answer", kind: "message", T: AnswerResponse },
  ],
);

/**
 * @generated from message puzzle_service.SubmissionRequest
 */
export const SubmissionRequest = proto3.makeMessageType(
  "puzzle_service.SubmissionRequest",
  () => [
    { no: 1, name: "puzzle_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "answer", kind: "message", T: ClientGameplayEvent },
    { no: 3, name: "show_solution", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * @generated from message puzzle_service.SubmissionResponse
 */
export const SubmissionResponse = proto3.makeMessageType(
  "puzzle_service.SubmissionResponse",
  () => [
    { no: 1, name: "user_is_correct", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "answer", kind: "message", T: AnswerResponse },
  ],
);

/**
 * @generated from message puzzle_service.PreviousPuzzleRequest
 */
export const PreviousPuzzleRequest = proto3.makeMessageType(
  "puzzle_service.PreviousPuzzleRequest",
  () => [
    { no: 1, name: "puzzle_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message puzzle_service.PreviousPuzzleResponse
 */
export const PreviousPuzzleResponse = proto3.makeMessageType(
  "puzzle_service.PreviousPuzzleResponse",
  () => [
    { no: 1, name: "puzzle_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message puzzle_service.PuzzleVoteRequest
 */
export const PuzzleVoteRequest = proto3.makeMessageType(
  "puzzle_service.PuzzleVoteRequest",
  () => [
    { no: 1, name: "puzzle_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "vote", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

/**
 * @generated from message puzzle_service.PuzzleVoteResponse
 */
export const PuzzleVoteResponse = proto3.makeMessageType(
  "puzzle_service.PuzzleVoteResponse",
  [],
);

/**
 * @generated from message puzzle_service.PuzzleGenerationJobRequest
 */
export const PuzzleGenerationJobRequest = proto3.makeMessageType(
  "puzzle_service.PuzzleGenerationJobRequest",
  () => [
    { no: 1, name: "bot_vs_bot", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 2, name: "lexicon", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "letter_distribution", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "sql_offset", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 5, name: "game_consideration_limit", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 6, name: "game_creation_limit", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 7, name: "request", kind: "message", T: PuzzleGenerationRequest },
    { no: 8, name: "start_date", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 9, name: "equity_loss_total_limit", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 10, name: "avoid_bot_games", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 11, name: "days_per_chunk", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ],
);

/**
 * @generated from message puzzle_service.APIPuzzleGenerationJobResponse
 */
export const APIPuzzleGenerationJobResponse = proto3.makeMessageType(
  "puzzle_service.APIPuzzleGenerationJobResponse",
  () => [
    { no: 1, name: "started", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * @generated from message puzzle_service.APIPuzzleGenerationJobRequest
 */
export const APIPuzzleGenerationJobRequest = proto3.makeMessageType(
  "puzzle_service.APIPuzzleGenerationJobRequest",
  () => [
    { no: 1, name: "request", kind: "message", T: PuzzleGenerationJobRequest },
    { no: 2, name: "secret_key", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message puzzle_service.PuzzleJobLogsRequest
 */
export const PuzzleJobLogsRequest = proto3.makeMessageType(
  "puzzle_service.PuzzleJobLogsRequest",
  () => [
    { no: 1, name: "offset", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
    { no: 2, name: "limit", kind: "scalar", T: 5 /* ScalarType.INT32 */ },
  ],
);

/**
 * @generated from message puzzle_service.PuzzleJobLog
 */
export const PuzzleJobLog = proto3.makeMessageType(
  "puzzle_service.PuzzleJobLog",
  () => [
    { no: 1, name: "id", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 2, name: "request", kind: "message", T: PuzzleGenerationJobRequest },
    { no: 3, name: "fulfilled", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 4, name: "error_status", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 5, name: "created_at", kind: "message", T: Timestamp },
    { no: 6, name: "completed_at", kind: "message", T: Timestamp },
  ],
);

/**
 * @generated from message puzzle_service.PuzzleJobLogsResponse
 */
export const PuzzleJobLogsResponse = proto3.makeMessageType(
  "puzzle_service.PuzzleJobLogsResponse",
  () => [
    { no: 1, name: "logs", kind: "message", T: PuzzleJobLog, repeated: true },
  ],
);

