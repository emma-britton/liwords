// @generated by protoc-gen-es v0.2.1
// @generated from file macondo/api/proto/macondo/macondo.proto (package macondo, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from enum macondo.PlayState
 */
export declare enum PlayState {
  /**
   * @generated from enum value: PLAYING = 0;
   */
  PLAYING = 0,

  /**
   * @generated from enum value: WAITING_FOR_FINAL_PASS = 1;
   */
  WAITING_FOR_FINAL_PASS = 1,

  /**
   * @generated from enum value: GAME_OVER = 2;
   */
  GAME_OVER = 2,
}

/**
 * @generated from enum macondo.ChallengeRule
 */
export declare enum ChallengeRule {
  /**
   * @generated from enum value: VOID = 0;
   */
  VOID = 0,

  /**
   * @generated from enum value: SINGLE = 1;
   */
  SINGLE = 1,

  /**
   * @generated from enum value: DOUBLE = 2;
   */
  DOUBLE = 2,

  /**
   * @generated from enum value: FIVE_POINT = 3;
   */
  FIVE_POINT = 3,

  /**
   * @generated from enum value: TEN_POINT = 4;
   */
  TEN_POINT = 4,

  /**
   * @generated from enum value: TRIPLE = 5;
   */
  TRIPLE = 5,
}

/**
 * @generated from enum macondo.PuzzleTag
 */
export declare enum PuzzleTag {
  /**
   * @generated from enum value: EQUITY = 0;
   */
  EQUITY = 0,

  /**
   * @generated from enum value: BINGO = 1;
   */
  BINGO = 1,

  /**
   * @generated from enum value: ONLY_BINGO = 2;
   */
  ONLY_BINGO = 2,

  /**
   * @generated from enum value: BLANK_BINGO = 3;
   */
  BLANK_BINGO = 3,

  /**
   * @generated from enum value: NON_BINGO = 4;
   */
  NON_BINGO = 4,

  /**
   * @generated from enum value: POWER_TILE = 5;
   */
  POWER_TILE = 5,

  /**
   * @generated from enum value: BINGO_NINE_OR_ABOVE = 6;
   */
  BINGO_NINE_OR_ABOVE = 6,

  /**
   * @generated from enum value: CEL_ONLY = 7;
   */
  CEL_ONLY = 7,
}

/**
 * GameHistory encodes a whole history of a game, and it should also encode
 * the initial board and tile configuration, etc. It can be considered
 * to be an instantiation of a GCG file.
 *
 * @generated from message macondo.GameHistory
 */
export declare class GameHistory extends Message<GameHistory> {
  /**
   * @generated from field: repeated macondo.GameEvent events = 1;
   */
  events: GameEvent[];

  /**
   * players are in order of who went first.
   *
   * @generated from field: repeated macondo.PlayerInfo players = 2;
   */
  players: PlayerInfo[];

  /**
   * @generated from field: int32 version = 3;
   */
  version: number;

  /**
   * @generated from field: string original_gcg = 4;
   */
  originalGcg: string;

  /**
   * @generated from field: string lexicon = 5;
   */
  lexicon: string;

  /**
   * @generated from field: string id_auth = 6;
   */
  idAuth: string;

  /**
   * @generated from field: string uid = 7;
   */
  uid: string;

  /**
   * @generated from field: string title = 8;
   */
  title: string;

  /**
   * @generated from field: string description = 9;
   */
  description: string;

  /**
   * last_known_racks should only be set in an incomplete / in-progress game.
   * if set, player racks should be set to these values.
   *
   * @generated from field: repeated string last_known_racks = 10;
   */
  lastKnownRacks: string[];

  /**
   * Add letter distribution (basically game name), board config, and more
   * in the future.
   *
   * @generated from field: bool second_went_first = 11 [deprecated = true];
   * @deprecated
   */
  secondWentFirst: boolean;

  /**
   * @generated from field: macondo.ChallengeRule challenge_rule = 12;
   */
  challengeRule: ChallengeRule;

  /**
   * @generated from field: macondo.PlayState play_state = 13;
   */
  playState: PlayState;

  /**
   * Final scores of the game; the order is in the order of the listed players!
   *
   * @generated from field: repeated int32 final_scores = 14;
   */
  finalScores: number[];

  /**
   * The variant is the game variant used. If blank, should
   * default to "classic".
   *
   * @generated from field: string variant = 15;
   */
  variant: string;

  /**
   * The index of the player who won. It's not always the person with the
   * highest score, because there can be timeouts, etc. If it's a tie,
   * it will be a -1.
   *
   * @generated from field: int32 winner = 16;
   */
  winner: number;

  /**
   * The board layout is just the name for the layout of the board.
   * It should have a sensible default, if blank.
   *
   * @generated from field: string board_layout = 17;
   */
  boardLayout: string;

  /**
   * The letter distribution is the name of the distribution of tiles used for
   * this game. If blank, should default to "english".
   *
   * @generated from field: string letter_distribution = 18;
   */
  letterDistribution: string;

  /**
   * If provided, the starting CGP is a crossword-game position string.
   *
   * @generated from field: string starting_cgp = 19;
   */
  startingCgp: string;

  constructor(data?: PartialMessage<GameHistory>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "macondo.GameHistory";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GameHistory;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GameHistory;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GameHistory;

  static equals(a: GameHistory | PlainMessage<GameHistory> | undefined, b: GameHistory | PlainMessage<GameHistory> | undefined): boolean;
}

/**
 * This should be merged into Move.
 *
 * @generated from message macondo.GameEvent
 */
export declare class GameEvent extends Message<GameEvent> {
  /**
   * @generated from field: string nickname = 1 [deprecated = true];
   * @deprecated
   */
  nickname: string;

  /**
   * @generated from field: string note = 2;
   */
  note: string;

  /**
   * @generated from field: string rack = 3;
   */
  rack: string;

  /**
   * @generated from field: macondo.GameEvent.Type type = 4;
   */
  type: GameEvent_Type;

  /**
   * @generated from field: int32 cumulative = 5;
   */
  cumulative: number;

  /**
   * @generated from field: int32 row = 6;
   */
  row: number;

  /**
   * @generated from field: int32 column = 7;
   */
  column: number;

  /**
   * @generated from field: macondo.GameEvent.Direction direction = 8;
   */
  direction: GameEvent_Direction;

  /**
   * @generated from field: string position = 9;
   */
  position: string;

  /**
   * @generated from field: string played_tiles = 10;
   */
  playedTiles: string;

  /**
   * An event will not have all of these; it depends on the type of the event.
   *
   * @generated from field: string exchanged = 11;
   */
  exchanged: string;

  /**
   * @generated from field: int32 score = 12;
   */
  score: number;

  /**
   * @generated from field: int32 bonus = 13;
   */
  bonus: number;

  /**
   * @generated from field: int32 end_rack_points = 14;
   */
  endRackPoints: number;

  /**
   * @generated from field: int32 lost_score = 15;
   */
  lostScore: number;

  /**
   * @generated from field: bool is_bingo = 16;
   */
  isBingo: boolean;

  /**
   * words_formed is a list of all words made by this play, in user-visible
   * pretty form. The first word is the "main" word, anything after it are
   * cross-words.
   *
   * @generated from field: repeated string words_formed = 17;
   */
  wordsFormed: string[];

  /**
   * @generated from field: int32 millis_remaining = 18;
   */
  millisRemaining: number;

  /**
   * The player who played this move is encoded in player_index. This should
   * be the index in GameHistory.players.
   *
   * @generated from field: uint32 player_index = 19;
   */
  playerIndex: number;

  constructor(data?: PartialMessage<GameEvent>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "macondo.GameEvent";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): GameEvent;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): GameEvent;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): GameEvent;

  static equals(a: GameEvent | PlainMessage<GameEvent> | undefined, b: GameEvent | PlainMessage<GameEvent> | undefined): boolean;
}

/**
 * @generated from enum macondo.GameEvent.Type
 */
export declare enum GameEvent_Type {
  /**
   * @generated from enum value: TILE_PLACEMENT_MOVE = 0;
   */
  TILE_PLACEMENT_MOVE = 0,

  /**
   * @generated from enum value: PHONY_TILES_RETURNED = 1;
   */
  PHONY_TILES_RETURNED = 1,

  /**
   * @generated from enum value: PASS = 2;
   */
  PASS = 2,

  /**
   * @generated from enum value: CHALLENGE_BONUS = 3;
   */
  CHALLENGE_BONUS = 3,

  /**
   * @generated from enum value: EXCHANGE = 4;
   */
  EXCHANGE = 4,

  /**
   * @generated from enum value: END_RACK_PTS = 5;
   */
  END_RACK_PTS = 5,

  /**
   * @generated from enum value: TIME_PENALTY = 6;
   */
  TIME_PENALTY = 6,

  /**
   * Only for international rules (or after 6 zeroes)
   *
   * @generated from enum value: END_RACK_PENALTY = 7;
   */
  END_RACK_PENALTY = 7,

  /**
   * Lose a turn for challenging a word incorrectly (only for double
   * challenge)
   *
   * @generated from enum value: UNSUCCESSFUL_CHALLENGE_TURN_LOSS = 8;
   */
  UNSUCCESSFUL_CHALLENGE_TURN_LOSS = 8,

  /**
   * Issue a challenge
   *
   * @generated from enum value: CHALLENGE = 9;
   */
  CHALLENGE = 9,
}

/**
 * @generated from enum macondo.GameEvent.Direction
 */
export declare enum GameEvent_Direction {
  /**
   * @generated from enum value: HORIZONTAL = 0;
   */
  HORIZONTAL = 0,

  /**
   * @generated from enum value: VERTICAL = 1;
   */
  VERTICAL = 1,
}

/**
 * @generated from message macondo.PlayerInfo
 */
export declare class PlayerInfo extends Message<PlayerInfo> {
  /**
   * @generated from field: string nickname = 1;
   */
  nickname: string;

  /**
   * @generated from field: string real_name = 2;
   */
  realName: string;

  /**
   * user_id is an internal, unchangeable user ID, whereas the other two user
   * identifiers might possibly be mutable.
   *
   * @generated from field: string user_id = 3;
   */
  userId: string;

  constructor(data?: PartialMessage<PlayerInfo>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "macondo.PlayerInfo";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PlayerInfo;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PlayerInfo;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PlayerInfo;

  static equals(a: PlayerInfo | PlainMessage<PlayerInfo> | undefined, b: PlayerInfo | PlainMessage<PlayerInfo> | undefined): boolean;
}

/**
 * @generated from message macondo.BotRequest
 */
export declare class BotRequest extends Message<BotRequest> {
  /**
   * @generated from field: macondo.GameHistory game_history = 1;
   */
  gameHistory?: GameHistory;

  /**
   * @generated from field: macondo.EvaluationRequest evaluation_request = 2;
   */
  evaluationRequest?: EvaluationRequest;

  /**
   * @generated from field: macondo.BotRequest.BotCode bot_type = 3;
   */
  botType: BotRequest_BotCode;

  constructor(data?: PartialMessage<BotRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "macondo.BotRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BotRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BotRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BotRequest;

  static equals(a: BotRequest | PlainMessage<BotRequest> | undefined, b: BotRequest | PlainMessage<BotRequest> | undefined): boolean;
}

/**
 * @generated from enum macondo.BotRequest.BotCode
 */
export declare enum BotRequest_BotCode {
  /**
   * @generated from enum value: HASTY_BOT = 0;
   */
  HASTY_BOT = 0,

  /**
   * @generated from enum value: LEVEL1_CEL_BOT = 1;
   */
  LEVEL1_CEL_BOT = 1,

  /**
   * @generated from enum value: LEVEL2_CEL_BOT = 2;
   */
  LEVEL2_CEL_BOT = 2,

  /**
   * @generated from enum value: LEVEL3_CEL_BOT = 3;
   */
  LEVEL3_CEL_BOT = 3,

  /**
   * @generated from enum value: LEVEL4_CEL_BOT = 4;
   */
  LEVEL4_CEL_BOT = 4,

  /**
   * @generated from enum value: LEVEL1_PROBABILISTIC = 5;
   */
  LEVEL1_PROBABILISTIC = 5,

  /**
   * @generated from enum value: LEVEL2_PROBABILISTIC = 6;
   */
  LEVEL2_PROBABILISTIC = 6,

  /**
   * @generated from enum value: LEVEL3_PROBABILISTIC = 7;
   */
  LEVEL3_PROBABILISTIC = 7,

  /**
   * @generated from enum value: LEVEL4_PROBABILISTIC = 8;
   */
  LEVEL4_PROBABILISTIC = 8,

  /**
   * @generated from enum value: LEVEL5_PROBABILISTIC = 9;
   */
  LEVEL5_PROBABILISTIC = 9,

  /**
   * harder bots here? inference? ml, etc.
   *
   * @generated from enum value: SIMMING_BOT = 10;
   */
  SIMMING_BOT = 10,
}

/**
 * @generated from message macondo.EvaluationRequest
 */
export declare class EvaluationRequest extends Message<EvaluationRequest> {
  /**
   * Evaluate for this user
   *
   * Later: evaluation type (static/sim/etc)
   *
   * @generated from field: string user = 1;
   */
  user: string;

  constructor(data?: PartialMessage<EvaluationRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "macondo.EvaluationRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): EvaluationRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): EvaluationRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): EvaluationRequest;

  static equals(a: EvaluationRequest | PlainMessage<EvaluationRequest> | undefined, b: EvaluationRequest | PlainMessage<EvaluationRequest> | undefined): boolean;
}

/**
 * @generated from message macondo.Evaluation
 */
export declare class Evaluation extends Message<Evaluation> {
  /**
   * @generated from field: repeated macondo.SingleEvaluation play_eval = 1;
   */
  playEval: SingleEvaluation[];

  constructor(data?: PartialMessage<Evaluation>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "macondo.Evaluation";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Evaluation;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Evaluation;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Evaluation;

  static equals(a: Evaluation | PlainMessage<Evaluation> | undefined, b: Evaluation | PlainMessage<Evaluation> | undefined): boolean;
}

/**
 * @generated from message macondo.SingleEvaluation
 */
export declare class SingleEvaluation extends Message<SingleEvaluation> {
  /**
   * @generated from field: double equity_loss = 1;
   */
  equityLoss: number;

  /**
   * @generated from field: double win_pct_loss = 2;
   */
  winPctLoss: number;

  /**
   * @generated from field: bool missed_bingo = 3;
   */
  missedBingo: boolean;

  /**
   * @generated from field: bool possible_star_play = 4;
   */
  possibleStarPlay: boolean;

  /**
   * @generated from field: bool missed_star_play = 5;
   */
  missedStarPlay: boolean;

  /**
   * @generated from field: bool top_is_bingo = 6;
   */
  topIsBingo: boolean;

  constructor(data?: PartialMessage<SingleEvaluation>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "macondo.SingleEvaluation";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SingleEvaluation;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SingleEvaluation;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SingleEvaluation;

  static equals(a: SingleEvaluation | PlainMessage<SingleEvaluation> | undefined, b: SingleEvaluation | PlainMessage<SingleEvaluation> | undefined): boolean;
}

/**
 * @generated from message macondo.BotResponse
 */
export declare class BotResponse extends Message<BotResponse> {
  /**
   * @generated from oneof macondo.BotResponse.response
   */
  response: {
    /**
     * @generated from field: macondo.GameEvent move = 1;
     */
    value: GameEvent;
    case: "move";
  } | {
    /**
     * @generated from field: string error = 2;
     */
    value: string;
    case: "error";
  } | { case: undefined; value?: undefined };

  /**
   * @generated from field: macondo.Evaluation eval = 3;
   */
  eval?: Evaluation;

  constructor(data?: PartialMessage<BotResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "macondo.BotResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BotResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BotResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BotResponse;

  static equals(a: BotResponse | PlainMessage<BotResponse> | undefined, b: BotResponse | PlainMessage<BotResponse> | undefined): boolean;
}

/**
 * @generated from message macondo.PuzzleCreationResponse
 */
export declare class PuzzleCreationResponse extends Message<PuzzleCreationResponse> {
  /**
   * @generated from field: string game_id = 1;
   */
  gameId: string;

  /**
   * @generated from field: int32 turn_number = 2;
   */
  turnNumber: number;

  /**
   * @generated from field: macondo.GameEvent answer = 3;
   */
  answer?: GameEvent;

  /**
   * @generated from field: repeated macondo.PuzzleTag tags = 4;
   */
  tags: PuzzleTag[];

  /**
   * @generated from field: int32 bucket_index = 5;
   */
  bucketIndex: number;

  constructor(data?: PartialMessage<PuzzleCreationResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "macondo.PuzzleCreationResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PuzzleCreationResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PuzzleCreationResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PuzzleCreationResponse;

  static equals(a: PuzzleCreationResponse | PlainMessage<PuzzleCreationResponse> | undefined, b: PuzzleCreationResponse | PlainMessage<PuzzleCreationResponse> | undefined): boolean;
}

/**
 * @generated from message macondo.PuzzleBucket
 */
export declare class PuzzleBucket extends Message<PuzzleBucket> {
  /**
   * @generated from field: int32 index = 1;
   */
  index: number;

  /**
   * @generated from field: int32 size = 2;
   */
  size: number;

  /**
   * @generated from field: repeated macondo.PuzzleTag includes = 3;
   */
  includes: PuzzleTag[];

  /**
   * @generated from field: repeated macondo.PuzzleTag excludes = 4;
   */
  excludes: PuzzleTag[];

  constructor(data?: PartialMessage<PuzzleBucket>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "macondo.PuzzleBucket";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PuzzleBucket;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PuzzleBucket;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PuzzleBucket;

  static equals(a: PuzzleBucket | PlainMessage<PuzzleBucket> | undefined, b: PuzzleBucket | PlainMessage<PuzzleBucket> | undefined): boolean;
}

/**
 * @generated from message macondo.PuzzleGenerationRequest
 */
export declare class PuzzleGenerationRequest extends Message<PuzzleGenerationRequest> {
  /**
   * @generated from field: repeated macondo.PuzzleBucket buckets = 1;
   */
  buckets: PuzzleBucket[];

  constructor(data?: PartialMessage<PuzzleGenerationRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "macondo.PuzzleGenerationRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PuzzleGenerationRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PuzzleGenerationRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PuzzleGenerationRequest;

  static equals(a: PuzzleGenerationRequest | PlainMessage<PuzzleGenerationRequest> | undefined, b: PuzzleGenerationRequest | PlainMessage<PuzzleGenerationRequest> | undefined): boolean;
}

