// @generated by protoc-gen-es v0.2.1
// @generated from file api/proto/ipc/tournament.proto (package ipc, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage, Timestamp} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";
import type {GameEndReason, GameRequest} from "./omgwords_pb.js";

/**
 * @generated from enum ipc.TournamentGameResult
 */
export declare enum TournamentGameResult {
  /**
   * NO_RESULT: the game is not over
   *
   * @generated from enum value: NO_RESULT = 0;
   */
  NO_RESULT = 0,

  /**
   * @generated from enum value: WIN = 1;
   */
  WIN = 1,

  /**
   * @generated from enum value: LOSS = 2;
   */
  LOSS = 2,

  /**
   * @generated from enum value: DRAW = 3;
   */
  DRAW = 3,

  /**
   * @generated from enum value: BYE = 4;
   */
  BYE = 4,

  /**
   * @generated from enum value: FORFEIT_WIN = 5;
   */
  FORFEIT_WIN = 5,

  /**
   * @generated from enum value: FORFEIT_LOSS = 6;
   */
  FORFEIT_LOSS = 6,

  /**
   * ELIMINATED: player is eliminated in a bracket tournament
   *
   * @generated from enum value: ELIMINATED = 7;
   */
  ELIMINATED = 7,

  /**
   * VOID: player never played this round and should neither be assigned
   * a win nor a loss. Useful for club-type games.
   *
   * @generated from enum value: VOID = 8;
   */
  VOID = 8,
}

/**
 * @generated from enum ipc.PairingMethod
 */
export declare enum PairingMethod {
  /**
   * @generated from enum value: RANDOM = 0;
   */
  RANDOM = 0,

  /**
   * @generated from enum value: ROUND_ROBIN = 1;
   */
  ROUND_ROBIN = 1,

  /**
   * @generated from enum value: KING_OF_THE_HILL = 2;
   */
  KING_OF_THE_HILL = 2,

  /**
   * @generated from enum value: ELIMINATION = 3;
   */
  ELIMINATION = 3,

  /**
   * @generated from enum value: FACTOR = 4;
   */
  FACTOR = 4,

  /**
   * @generated from enum value: INITIAL_FONTES = 5;
   */
  INITIAL_FONTES = 5,

  /**
   * @generated from enum value: SWISS = 6;
   */
  SWISS = 6,

  /**
   * @generated from enum value: QUICKPAIR = 7;
   */
  QUICKPAIR = 7,

  /**
   * @generated from enum value: MANUAL = 8;
   */
  MANUAL = 8,

  /**
   * @generated from enum value: TEAM_ROUND_ROBIN = 9;
   */
  TEAM_ROUND_ROBIN = 9,
}

/**
 * @generated from enum ipc.FirstMethod
 */
export declare enum FirstMethod {
  /**
   * @generated from enum value: MANUAL_FIRST = 0;
   */
  MANUAL_FIRST = 0,

  /**
   * @generated from enum value: RANDOM_FIRST = 1;
   */
  RANDOM_FIRST = 1,

  /**
   * @generated from enum value: AUTOMATIC_FIRST = 2;
   */
  AUTOMATIC_FIRST = 2,
}

/**
 * New tournaments will use full tournament
 * messages (specifically, TournamentDivisionDataResponse et al).
 * This event is also used in the tournament_service's RecentGamesResponse,
 * which can be used to fetch information for the last games played in
 * a tournament.
 *
 * @generated from message ipc.TournamentGameEndedEvent
 */
export declare class TournamentGameEndedEvent extends Message<TournamentGameEndedEvent> {
  /**
   * @generated from field: string game_id = 1;
   */
  gameId: string;

  /**
   * @generated from field: repeated ipc.TournamentGameEndedEvent.Player players = 2;
   */
  players: TournamentGameEndedEvent_Player[];

  /**
   * @generated from field: ipc.GameEndReason end_reason = 3;
   */
  endReason: GameEndReason;

  /**
   * Time that the game ended
   *
   * @generated from field: int64 time = 4;
   */
  time: bigint;

  /**
   * @generated from field: int32 round = 5;
   */
  round: number;

  /**
   * @generated from field: string division = 6;
   */
  division: string;

  /**
   * @generated from field: int32 game_index = 7;
   */
  gameIndex: number;

  constructor(data?: PartialMessage<TournamentGameEndedEvent>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.TournamentGameEndedEvent";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TournamentGameEndedEvent;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TournamentGameEndedEvent;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TournamentGameEndedEvent;

  static equals(a: TournamentGameEndedEvent | PlainMessage<TournamentGameEndedEvent> | undefined, b: TournamentGameEndedEvent | PlainMessage<TournamentGameEndedEvent> | undefined): boolean;
}

/**
 * @generated from message ipc.TournamentGameEndedEvent.Player
 */
export declare class TournamentGameEndedEvent_Player extends Message<TournamentGameEndedEvent_Player> {
  /**
   * @generated from field: string username = 1;
   */
  username: string;

  /**
   * @generated from field: int32 score = 2;
   */
  score: number;

  /**
   * @generated from field: ipc.TournamentGameResult result = 3;
   */
  result: TournamentGameResult;

  constructor(data?: PartialMessage<TournamentGameEndedEvent_Player>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.TournamentGameEndedEvent.Player";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TournamentGameEndedEvent_Player;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TournamentGameEndedEvent_Player;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TournamentGameEndedEvent_Player;

  static equals(a: TournamentGameEndedEvent_Player | PlainMessage<TournamentGameEndedEvent_Player> | undefined, b: TournamentGameEndedEvent_Player | PlainMessage<TournamentGameEndedEvent_Player> | undefined): boolean;
}

/**
 * This message makes the "Status Bar" show up and also tells the players
 * that the backend is now accepting "ready" messages for this round.
 *
 * @generated from message ipc.TournamentRoundStarted
 */
export declare class TournamentRoundStarted extends Message<TournamentRoundStarted> {
  /**
   * @generated from field: string tournament_id = 1;
   */
  tournamentId: string;

  /**
   * @generated from field: string division = 2;
   */
  division: string;

  /**
   * @generated from field: int32 round = 3;
   */
  round: number;

  /**
   * for matchplay type rounds etc.
   *
   * @generated from field: int32 game_index = 4;
   */
  gameIndex: number;

  /**
   * @generated from field: google.protobuf.Timestamp deadline = 5;
   */
  deadline?: Timestamp;

  constructor(data?: PartialMessage<TournamentRoundStarted>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.TournamentRoundStarted";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TournamentRoundStarted;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TournamentRoundStarted;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TournamentRoundStarted;

  static equals(a: TournamentRoundStarted | PlainMessage<TournamentRoundStarted> | undefined, b: TournamentRoundStarted | PlainMessage<TournamentRoundStarted> | undefined): boolean;
}

/**
 * This can be sent from the user to the tournament or vice-versa.
 *
 * @generated from message ipc.ReadyForTournamentGame
 */
export declare class ReadyForTournamentGame extends Message<ReadyForTournamentGame> {
  /**
   * @generated from field: string tournament_id = 1;
   */
  tournamentId: string;

  /**
   * @generated from field: string division = 2;
   */
  division: string;

  /**
   * @generated from field: int32 round = 3;
   */
  round: number;

  /**
   * @generated from field: string player_id = 4;
   */
  playerId: string;

  /**
   * within a matchplay type tournament where several
   *
   * @generated from field: int32 game_index = 5;
   */
  gameIndex: number;

  /**
   * games share a round.
   *
   * if true, this is a NOT-ready message.
   *
   * @generated from field: bool unready = 6;
   */
  unready: boolean;

  constructor(data?: PartialMessage<ReadyForTournamentGame>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.ReadyForTournamentGame";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReadyForTournamentGame;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReadyForTournamentGame;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReadyForTournamentGame;

  static equals(a: ReadyForTournamentGame | PlainMessage<ReadyForTournamentGame> | undefined, b: ReadyForTournamentGame | PlainMessage<ReadyForTournamentGame> | undefined): boolean;
}

/**
 * @generated from message ipc.TournamentPerson
 */
export declare class TournamentPerson extends Message<TournamentPerson> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: int32 rating = 2;
   */
  rating: number;

  /**
   * @generated from field: bool suspended = 3;
   */
  suspended: boolean;

  constructor(data?: PartialMessage<TournamentPerson>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.TournamentPerson";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TournamentPerson;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TournamentPerson;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TournamentPerson;

  static equals(a: TournamentPerson | PlainMessage<TournamentPerson> | undefined, b: TournamentPerson | PlainMessage<TournamentPerson> | undefined): boolean;
}

/**
 * @generated from message ipc.TournamentPersons
 */
export declare class TournamentPersons extends Message<TournamentPersons> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string division = 2;
   */
  division: string;

  /**
   * @generated from field: repeated ipc.TournamentPerson persons = 3;
   */
  persons: TournamentPerson[];

  constructor(data?: PartialMessage<TournamentPersons>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.TournamentPersons";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TournamentPersons;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TournamentPersons;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TournamentPersons;

  static equals(a: TournamentPersons | PlainMessage<TournamentPersons> | undefined, b: TournamentPersons | PlainMessage<TournamentPersons> | undefined): boolean;
}

/**
 * @generated from message ipc.RoundControl
 */
export declare class RoundControl extends Message<RoundControl> {
  /**
   * @generated from field: ipc.PairingMethod pairing_method = 1;
   */
  pairingMethod: PairingMethod;

  /**
   * @generated from field: ipc.FirstMethod first_method = 2;
   */
  firstMethod: FirstMethod;

  /**
   * @generated from field: int32 games_per_round = 3;
   */
  gamesPerRound: number;

  /**
   * @generated from field: int32 round = 4;
   */
  round: number;

  /**
   * @generated from field: int32 factor = 5;
   */
  factor: number;

  /**
   * @generated from field: int32 initial_fontes = 6;
   */
  initialFontes: number;

  /**
   * @generated from field: int32 max_repeats = 7;
   */
  maxRepeats: number;

  /**
   * @generated from field: bool allow_over_max_repeats = 8;
   */
  allowOverMaxRepeats: boolean;

  /**
   * @generated from field: int32 repeat_relative_weight = 9;
   */
  repeatRelativeWeight: number;

  /**
   * @generated from field: int32 win_difference_relative_weight = 10;
   */
  winDifferenceRelativeWeight: number;

  constructor(data?: PartialMessage<RoundControl>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.RoundControl";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RoundControl;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RoundControl;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RoundControl;

  static equals(a: RoundControl | PlainMessage<RoundControl> | undefined, b: RoundControl | PlainMessage<RoundControl> | undefined): boolean;
}

/**
 * @generated from message ipc.DivisionControls
 */
export declare class DivisionControls extends Message<DivisionControls> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string division = 2;
   */
  division: string;

  /**
   * @generated from field: ipc.GameRequest game_request = 3;
   */
  gameRequest?: GameRequest;

  /**
   * @generated from field: ipc.TournamentGameResult suspended_result = 4;
   */
  suspendedResult: TournamentGameResult;

  /**
   * @generated from field: int32 suspended_spread = 5;
   */
  suspendedSpread: number;

  /**
   * @generated from field: bool auto_start = 6;
   */
  autoStart: boolean;

  /**
   * @generated from field: int32 spread_cap = 7;
   */
  spreadCap: number;

  /**
   * @generated from field: bool gibsonize = 8;
   */
  gibsonize: boolean;

  /**
   * @generated from field: int32 gibson_spread = 9;
   */
  gibsonSpread: number;

  /**
   * @generated from field: int32 minimum_placement = 10;
   */
  minimumPlacement: number;

  /**
   * @generated from field: int32 maximum_bye_placement = 11;
   */
  maximumByePlacement: number;

  constructor(data?: PartialMessage<DivisionControls>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.DivisionControls";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DivisionControls;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DivisionControls;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DivisionControls;

  static equals(a: DivisionControls | PlainMessage<DivisionControls> | undefined, b: DivisionControls | PlainMessage<DivisionControls> | undefined): boolean;
}

/**
 * @generated from message ipc.TournamentGame
 */
export declare class TournamentGame extends Message<TournamentGame> {
  /**
   * @generated from field: repeated int32 scores = 1;
   */
  scores: number[];

  /**
   * @generated from field: repeated ipc.TournamentGameResult results = 2;
   */
  results: TournamentGameResult[];

  /**
   * @generated from field: ipc.GameEndReason game_end_reason = 3;
   */
  gameEndReason: GameEndReason;

  /**
   * @generated from field: string id = 4;
   */
  id: string;

  constructor(data?: PartialMessage<TournamentGame>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.TournamentGame";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TournamentGame;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TournamentGame;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TournamentGame;

  static equals(a: TournamentGame | PlainMessage<TournamentGame> | undefined, b: TournamentGame | PlainMessage<TournamentGame> | undefined): boolean;
}

/**
 * @generated from message ipc.Pairing
 */
export declare class Pairing extends Message<Pairing> {
  /**
   * @generated from field: repeated int32 players = 1;
   */
  players: number[];

  /**
   * @generated from field: int32 round = 2;
   */
  round: number;

  /**
   * can be a list, for elimination tourneys
   *
   * @generated from field: repeated ipc.TournamentGame games = 3;
   */
  games: TournamentGame[];

  /**
   * @generated from field: repeated ipc.TournamentGameResult outcomes = 4;
   */
  outcomes: TournamentGameResult[];

  /**
   * @generated from field: repeated string ready_states = 5;
   */
  readyStates: string[];

  constructor(data?: PartialMessage<Pairing>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.Pairing";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Pairing;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Pairing;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Pairing;

  static equals(a: Pairing | PlainMessage<Pairing> | undefined, b: Pairing | PlainMessage<Pairing> | undefined): boolean;
}

/**
 * @generated from message ipc.PlayerStanding
 */
export declare class PlayerStanding extends Message<PlayerStanding> {
  /**
   * @generated from field: string player_id = 1;
   */
  playerId: string;

  /**
   * @generated from field: int32 wins = 2;
   */
  wins: number;

  /**
   * @generated from field: int32 losses = 3;
   */
  losses: number;

  /**
   * @generated from field: int32 draws = 4;
   */
  draws: number;

  /**
   * @generated from field: int32 spread = 5;
   */
  spread: number;

  /**
   * @generated from field: bool gibsonized = 6;
   */
  gibsonized: boolean;

  constructor(data?: PartialMessage<PlayerStanding>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.PlayerStanding";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PlayerStanding;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PlayerStanding;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PlayerStanding;

  static equals(a: PlayerStanding | PlainMessage<PlayerStanding> | undefined, b: PlayerStanding | PlainMessage<PlayerStanding> | undefined): boolean;
}

/**
 * @generated from message ipc.RoundStandings
 */
export declare class RoundStandings extends Message<RoundStandings> {
  /**
   * @generated from field: repeated ipc.PlayerStanding standings = 1;
   */
  standings: PlayerStanding[];

  constructor(data?: PartialMessage<RoundStandings>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.RoundStandings";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RoundStandings;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RoundStandings;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RoundStandings;

  static equals(a: RoundStandings | PlainMessage<RoundStandings> | undefined, b: RoundStandings | PlainMessage<RoundStandings> | undefined): boolean;
}

/**
 * @generated from message ipc.DivisionPairingsResponse
 */
export declare class DivisionPairingsResponse extends Message<DivisionPairingsResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string division = 2;
   */
  division: string;

  /**
   * @generated from field: repeated ipc.Pairing division_pairings = 3;
   */
  divisionPairings: Pairing[];

  /**
   * @generated from field: map<int32, ipc.RoundStandings> division_standings = 4;
   */
  divisionStandings: { [key: number]: RoundStandings };

  constructor(data?: PartialMessage<DivisionPairingsResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.DivisionPairingsResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DivisionPairingsResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DivisionPairingsResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DivisionPairingsResponse;

  static equals(a: DivisionPairingsResponse | PlainMessage<DivisionPairingsResponse> | undefined, b: DivisionPairingsResponse | PlainMessage<DivisionPairingsResponse> | undefined): boolean;
}

/**
 * @generated from message ipc.DivisionPairingsDeletedResponse
 */
export declare class DivisionPairingsDeletedResponse extends Message<DivisionPairingsDeletedResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string division = 2;
   */
  division: string;

  /**
   * @generated from field: int32 round = 3;
   */
  round: number;

  constructor(data?: PartialMessage<DivisionPairingsDeletedResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.DivisionPairingsDeletedResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DivisionPairingsDeletedResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DivisionPairingsDeletedResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DivisionPairingsDeletedResponse;

  static equals(a: DivisionPairingsDeletedResponse | PlainMessage<DivisionPairingsDeletedResponse> | undefined, b: DivisionPairingsDeletedResponse | PlainMessage<DivisionPairingsDeletedResponse> | undefined): boolean;
}

/**
 * @generated from message ipc.PlayersAddedOrRemovedResponse
 */
export declare class PlayersAddedOrRemovedResponse extends Message<PlayersAddedOrRemovedResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string division = 2;
   */
  division: string;

  /**
   * @generated from field: ipc.TournamentPersons players = 3;
   */
  players?: TournamentPersons;

  /**
   * @generated from field: repeated ipc.Pairing division_pairings = 4;
   */
  divisionPairings: Pairing[];

  /**
   * @generated from field: map<int32, ipc.RoundStandings> division_standings = 5;
   */
  divisionStandings: { [key: number]: RoundStandings };

  constructor(data?: PartialMessage<PlayersAddedOrRemovedResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.PlayersAddedOrRemovedResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PlayersAddedOrRemovedResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PlayersAddedOrRemovedResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PlayersAddedOrRemovedResponse;

  static equals(a: PlayersAddedOrRemovedResponse | PlainMessage<PlayersAddedOrRemovedResponse> | undefined, b: PlayersAddedOrRemovedResponse | PlainMessage<PlayersAddedOrRemovedResponse> | undefined): boolean;
}

/**
 * @generated from message ipc.DivisionRoundControls
 */
export declare class DivisionRoundControls extends Message<DivisionRoundControls> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string division = 2;
   */
  division: string;

  /**
   * @generated from field: repeated ipc.RoundControl round_controls = 3;
   */
  roundControls: RoundControl[];

  /**
   * @generated from field: repeated ipc.Pairing division_pairings = 4;
   */
  divisionPairings: Pairing[];

  /**
   * @generated from field: map<int32, ipc.RoundStandings> division_standings = 5;
   */
  divisionStandings: { [key: number]: RoundStandings };

  constructor(data?: PartialMessage<DivisionRoundControls>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.DivisionRoundControls";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DivisionRoundControls;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DivisionRoundControls;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DivisionRoundControls;

  static equals(a: DivisionRoundControls | PlainMessage<DivisionRoundControls> | undefined, b: DivisionRoundControls | PlainMessage<DivisionRoundControls> | undefined): boolean;
}

/**
 * @generated from message ipc.DivisionControlsResponse
 */
export declare class DivisionControlsResponse extends Message<DivisionControlsResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string division = 2;
   */
  division: string;

  /**
   * @generated from field: ipc.DivisionControls division_controls = 3;
   */
  divisionControls?: DivisionControls;

  /**
   * @generated from field: map<int32, ipc.RoundStandings> division_standings = 4;
   */
  divisionStandings: { [key: number]: RoundStandings };

  constructor(data?: PartialMessage<DivisionControlsResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.DivisionControlsResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DivisionControlsResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DivisionControlsResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DivisionControlsResponse;

  static equals(a: DivisionControlsResponse | PlainMessage<DivisionControlsResponse> | undefined, b: DivisionControlsResponse | PlainMessage<DivisionControlsResponse> | undefined): boolean;
}

/**
 * @generated from message ipc.TournamentDivisionDataResponse
 */
export declare class TournamentDivisionDataResponse extends Message<TournamentDivisionDataResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string division = 2;
   */
  division: string;

  /**
   * @generated from field: ipc.TournamentPersons players = 3;
   */
  players?: TournamentPersons;

  /**
   * @generated from field: map<int32, ipc.RoundStandings> standings = 4;
   */
  standings: { [key: number]: RoundStandings };

  /**
   * @generated from field: map<string, ipc.Pairing> pairing_map = 5;
   */
  pairingMap: { [key: string]: Pairing };

  /**
   * @generated from field: ipc.DivisionControls controls = 6;
   */
  controls?: DivisionControls;

  /**
   * @generated from field: repeated ipc.RoundControl round_controls = 7;
   */
  roundControls: RoundControl[];

  /**
   * @generated from field: int32 current_round = 8;
   */
  currentRound: number;

  constructor(data?: PartialMessage<TournamentDivisionDataResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.TournamentDivisionDataResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TournamentDivisionDataResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TournamentDivisionDataResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TournamentDivisionDataResponse;

  static equals(a: TournamentDivisionDataResponse | PlainMessage<TournamentDivisionDataResponse> | undefined, b: TournamentDivisionDataResponse | PlainMessage<TournamentDivisionDataResponse> | undefined): boolean;
}

/**
 * @generated from message ipc.FullTournamentDivisions
 */
export declare class FullTournamentDivisions extends Message<FullTournamentDivisions> {
  /**
   * @generated from field: map<string, ipc.TournamentDivisionDataResponse> divisions = 1;
   */
  divisions: { [key: string]: TournamentDivisionDataResponse };

  /**
   * @generated from field: bool started = 2;
   */
  started: boolean;

  constructor(data?: PartialMessage<FullTournamentDivisions>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.FullTournamentDivisions";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): FullTournamentDivisions;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): FullTournamentDivisions;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): FullTournamentDivisions;

  static equals(a: FullTournamentDivisions | PlainMessage<FullTournamentDivisions> | undefined, b: FullTournamentDivisions | PlainMessage<FullTournamentDivisions> | undefined): boolean;
}

/**
 * @generated from message ipc.TournamentFinishedResponse
 */
export declare class TournamentFinishedResponse extends Message<TournamentFinishedResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  constructor(data?: PartialMessage<TournamentFinishedResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.TournamentFinishedResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TournamentFinishedResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TournamentFinishedResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TournamentFinishedResponse;

  static equals(a: TournamentFinishedResponse | PlainMessage<TournamentFinishedResponse> | undefined, b: TournamentFinishedResponse | PlainMessage<TournamentFinishedResponse> | undefined): boolean;
}

/**
 * @generated from message ipc.TournamentDataResponse
 */
export declare class TournamentDataResponse extends Message<TournamentDataResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string name = 2;
   */
  name: string;

  /**
   * @generated from field: string description = 3;
   */
  description: string;

  /**
   * @generated from field: string executive_director = 4;
   */
  executiveDirector: string;

  /**
   * @generated from field: ipc.TournamentPersons directors = 5;
   */
  directors?: TournamentPersons;

  /**
   * @generated from field: bool is_started = 6;
   */
  isStarted: boolean;

  /**
   * @generated from field: google.protobuf.Timestamp start_time = 7;
   */
  startTime?: Timestamp;

  constructor(data?: PartialMessage<TournamentDataResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.TournamentDataResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TournamentDataResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TournamentDataResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TournamentDataResponse;

  static equals(a: TournamentDataResponse | PlainMessage<TournamentDataResponse> | undefined, b: TournamentDataResponse | PlainMessage<TournamentDataResponse> | undefined): boolean;
}

/**
 * @generated from message ipc.TournamentDivisionDeletedResponse
 */
export declare class TournamentDivisionDeletedResponse extends Message<TournamentDivisionDeletedResponse> {
  /**
   * @generated from field: string id = 1;
   */
  id: string;

  /**
   * @generated from field: string division = 2;
   */
  division: string;

  constructor(data?: PartialMessage<TournamentDivisionDeletedResponse>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.TournamentDivisionDeletedResponse";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): TournamentDivisionDeletedResponse;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): TournamentDivisionDeletedResponse;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): TournamentDivisionDeletedResponse;

  static equals(a: TournamentDivisionDeletedResponse | PlainMessage<TournamentDivisionDeletedResponse> | undefined, b: TournamentDivisionDeletedResponse | PlainMessage<TournamentDivisionDeletedResponse> | undefined): boolean;
}

