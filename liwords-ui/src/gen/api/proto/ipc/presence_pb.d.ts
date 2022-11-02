// @generated by protoc-gen-es v0.2.1
// @generated from file api/proto/ipc/presence.proto (package ipc, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import type {BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage} from "@bufbuild/protobuf";
import {Message, proto3} from "@bufbuild/protobuf";

/**
 * @generated from message ipc.UserPresence
 */
export declare class UserPresence extends Message<UserPresence> {
  /**
   * @generated from field: string username = 1;
   */
  username: string;

  /**
   * @generated from field: string user_id = 2;
   */
  userId: string;

  /**
   * @generated from field: string channel = 3;
   */
  channel: string;

  /**
   * @generated from field: bool is_anonymous = 4;
   */
  isAnonymous: boolean;

  /**
   * @generated from field: bool deleting = 5;
   */
  deleting: boolean;

  constructor(data?: PartialMessage<UserPresence>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.UserPresence";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UserPresence;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UserPresence;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UserPresence;

  static equals(a: UserPresence | PlainMessage<UserPresence> | undefined, b: UserPresence | PlainMessage<UserPresence> | undefined): boolean;
}

/**
 * @generated from message ipc.UserPresences
 */
export declare class UserPresences extends Message<UserPresences> {
  /**
   * @generated from field: repeated ipc.UserPresence presences = 1;
   */
  presences: UserPresence[];

  constructor(data?: PartialMessage<UserPresences>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.UserPresences";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UserPresences;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UserPresences;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UserPresences;

  static equals(a: UserPresences | PlainMessage<UserPresences> | undefined, b: UserPresences | PlainMessage<UserPresences> | undefined): boolean;
}

/**
 * Only authenticated connections.
 *
 * @generated from message ipc.PresenceEntry
 */
export declare class PresenceEntry extends Message<PresenceEntry> {
  /**
   * @generated from field: string username = 1;
   */
  username: string;

  /**
   * @generated from field: string user_id = 2;
   */
  userId: string;

  /**
   * @generated from field: repeated string channel = 3;
   */
  channel: string[];

  constructor(data?: PartialMessage<PresenceEntry>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "ipc.PresenceEntry";
  static readonly fields: FieldList;

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): PresenceEntry;

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): PresenceEntry;

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): PresenceEntry;

  static equals(a: PresenceEntry | PlainMessage<PresenceEntry> | undefined, b: PresenceEntry | PlainMessage<PresenceEntry> | undefined): boolean;
}

