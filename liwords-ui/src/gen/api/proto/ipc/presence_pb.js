// @generated by protoc-gen-es v1.2.0
// @generated from file ipc/presence.proto (package ipc, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message ipc.UserPresence
 */
export const UserPresence = proto3.makeMessageType(
  "ipc.UserPresence",
  () => [
    { no: 1, name: "username", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "channel", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "is_anonymous", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
    { no: 5, name: "deleting", kind: "scalar", T: 8 /* ScalarType.BOOL */ },
  ],
);

/**
 * @generated from message ipc.UserPresences
 */
export const UserPresences = proto3.makeMessageType(
  "ipc.UserPresences",
  () => [
    { no: 1, name: "presences", kind: "message", T: UserPresence, repeated: true },
  ],
);

/**
 * Only authenticated connections.
 *
 * @generated from message ipc.PresenceEntry
 */
export const PresenceEntry = proto3.makeMessageType(
  "ipc.PresenceEntry",
  () => [
    { no: 1, name: "username", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "channel", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ],
);

