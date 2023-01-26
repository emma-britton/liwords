// Definitions for OMGWord seek functionality.

// @generated by protoc-gen-es v1.0.0
// @generated from file ipc/omgseeks.proto (package ipc, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import type { GameRequest } from "./omgwords_pb.js";

/**
 * @generated from enum ipc.SeekState
 */
export declare enum SeekState {
  /**
   * @generated from enum value: ABSENT = 0;
   */
  ABSENT = 0,

  /**
   * @generated from enum value: PRESENT = 1;
   */
  PRESENT = 1,

  /**
   * @generated from enum value: READY = 2;
   */
  READY = 2,
}

/**
 * A MatchUser requests or receives a match via a seek or a match request.
 *
 * @generated from message ipc.MatchUser
 */
export declare class MatchUser extends Message<MatchUser> {
  /**
   * user_id is the database, or anonymous, ID of the user.
   *
   * @generated from field: string user_id = 1;
   */
  userId: string;

  /**
   * relevant_rating is the rating of the user, for the relevant seek mode.
   *
   * @generated from field: string relevant_rating = 2;
   */
  relevantRating: string;

  /**
   * if is_anonymous, backend won't bother to look up the user in the DB.
   *
   * @generated from field: bool is_anonymous = 3;
   */
  isAnonymous: boolean;

  /**
   * display_name is the display username of the user (could be real name too)
   *
   * @generated from field: string display_name = 4;
   */
  displayName: string;

  constructor(data?: PartialMessage<MatchUser>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.MatchUser";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MatchUser;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MatchUser;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MatchUser;

  static equals(a: MatchUser | PlainMessage<MatchUser> | undefined, b: MatchUser | PlainMessage<MatchUser> | undefined): boolean;
}

/**
 * @generated from message ipc.SeekRequest
 */
export declare class SeekRequest extends Message<SeekRequest> {
  /**
   * @generated from field: ipc.GameRequest game_request = 1;
   */
  gameRequest?: GameRequest;

  /**
   * @generated from field: ipc.MatchUser user = 2;
   */
  user?: MatchUser;

  /**
   * @generated from field: int32 minimum_rating_range = 3;
   */
  minimumRatingRange: number;

  /**
   * @generated from field: int32 maximum_rating_range = 4;
   */
  maximumRatingRange: number;

  /**
   * connection_id is the websocket ID via which this game was requested.
   *
   * @generated from field: string seeker_connection_id = 5;
   */
  seekerConnectionId: string;

  /**
   * @generated from field: ipc.MatchUser receiving_user = 6;
   */
  receivingUser?: MatchUser;

  /**
   * @generated from field: ipc.SeekState user_state = 7;
   */
  userState: SeekState;

  /**
   * @generated from field: ipc.SeekState receiver_state = 8;
   */
  receiverState: SeekState;

  /**
   * @generated from field: string receiver_connection_id = 9;
   */
  receiverConnectionId: string;

  /**
   * @generated from field: repeated string booted_receivers = 10;
   */
  bootedReceivers: string[];

  /**
   * rematch_for is the game ID that this Match Request is a rematch for (empty
   * if it isn't a rematch)
   *
   * @generated from field: string rematch_for = 11;
   */
  rematchFor: string;

  /**
   * If this match request is part of a tournament, it is treated in a special
   * way. We are moving towards server-only matching during tournaments,
   * so the following will only be used in "clubhouse mode" / more free-form
   * clubs.
   *
   * @generated from field: string tournament_id = 12;
   */
  tournamentId: string;

  /**
   * @generated from field: bool receiver_is_permanent = 13;
   */
  receiverIsPermanent: boolean;

  /**
   * @generated from field: string rating_key = 14;
   */
  ratingKey: string;

  constructor(data?: PartialMessage<SeekRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.SeekRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SeekRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SeekRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SeekRequest;

  static equals(a: SeekRequest | PlainMessage<SeekRequest> | undefined, b: SeekRequest | PlainMessage<SeekRequest> | undefined): boolean;
}

/**
 * A SoughtGameProcessEvent gets sent when a match request (or seek request)
 * get accepted (from client to server), or canceled -- when sent from server to
 * client.
 *
 * @generated from message ipc.SoughtGameProcessEvent
 */
export declare class SoughtGameProcessEvent extends Message<SoughtGameProcessEvent> {
  /**
   * @generated from field: string request_id = 1;
   */
  requestId: string;

  constructor(data?: PartialMessage<SoughtGameProcessEvent>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.SoughtGameProcessEvent";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SoughtGameProcessEvent;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SoughtGameProcessEvent;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SoughtGameProcessEvent;

  static equals(a: SoughtGameProcessEvent | PlainMessage<SoughtGameProcessEvent> | undefined, b: SoughtGameProcessEvent | PlainMessage<SoughtGameProcessEvent> | undefined): boolean;
}

/**
 * SeekRequests sends all open seek requests.
 *
 * @generated from message ipc.SeekRequests
 */
export declare class SeekRequests extends Message<SeekRequests> {
  /**
   * @generated from field: repeated ipc.SeekRequest requests = 1;
   */
  requests: SeekRequest[];

  constructor(data?: PartialMessage<SeekRequests>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.SeekRequests";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SeekRequests;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SeekRequests;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SeekRequests;

  static equals(a: SeekRequests | PlainMessage<SeekRequests> | undefined, b: SeekRequests | PlainMessage<SeekRequests> | undefined): boolean;
}

/**
 * When a Receiver declines a Seeker:
 *
 * @generated from message ipc.DeclineSeekRequest
 */
export declare class DeclineSeekRequest extends Message<DeclineSeekRequest> {
  /**
   * @generated from field: string request_id = 1;
   */
  requestId: string;

  constructor(data?: PartialMessage<DeclineSeekRequest>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.DeclineSeekRequest";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): DeclineSeekRequest;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): DeclineSeekRequest;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): DeclineSeekRequest;

  static equals(a: DeclineSeekRequest | PlainMessage<DeclineSeekRequest> | undefined, b: DeclineSeekRequest | PlainMessage<DeclineSeekRequest> | undefined): boolean;
}

