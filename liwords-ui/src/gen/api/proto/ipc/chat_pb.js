// @generated by protoc-gen-es v1.0.0
// @generated from file ipc/chat.proto (package ipc, syntax proto3)
/* eslint-disable */
// @ts-nocheck

// Package ipc describes all the messages used for inter-process
// communication between the different microservices in liwords
// (so far, just the API and the socket server).
// Many of these messages end up being transmitted to the front-end.

import { proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message ipc.ChatMessage
 */
export const ChatMessage = proto3.makeMessageType(
  "ipc.ChatMessage",
  () => [
    { no: 1, name: "username", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "channel", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "timestamp", kind: "scalar", T: 3 /* ScalarType.INT64 */ },
    { no: 5, name: "user_id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 6, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 7, name: "country_code", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 8, name: "avatar_url", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

/**
 * @generated from message ipc.ChatMessages
 */
export const ChatMessages = proto3.makeMessageType(
  "ipc.ChatMessages",
  () => [
    { no: 1, name: "messages", kind: "message", T: ChatMessage, repeated: true },
  ],
);

/**
 * @generated from message ipc.ChatMessageDeleted
 */
export const ChatMessageDeleted = proto3.makeMessageType(
  "ipc.ChatMessageDeleted",
  () => [
    { no: 1, name: "channel", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "id", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

