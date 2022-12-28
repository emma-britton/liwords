// ipc is used for inter-process communication between the different
// services.
// This package will define many types that the different services should use,
// and should be roughly split up into different files by function.

// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.26.0
// 	protoc        (unknown)
// source: ipc/ipc.proto

package ipc

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// In order to make socket messages as small and simple as possible,
// we should include the message type with the socket message.
// Whenever we add a new client <-> server socket message type,
// add it to this list.
type MessageType int32

const (
	MessageType_SEEK_REQUEST                                 MessageType = 0
	MessageType_MATCH_REQUEST                                MessageType = 1
	MessageType_SOUGHT_GAME_PROCESS_EVENT                    MessageType = 2
	MessageType_CLIENT_GAMEPLAY_EVENT                        MessageType = 3
	MessageType_SERVER_GAMEPLAY_EVENT                        MessageType = 4 // deprecate soon
	MessageType_GAME_ENDED_EVENT                             MessageType = 5
	MessageType_GAME_HISTORY_REFRESHER                       MessageType = 6
	MessageType_ERROR_MESSAGE                                MessageType = 7
	MessageType_NEW_GAME_EVENT                               MessageType = 8
	MessageType_SERVER_CHALLENGE_RESULT_EVENT                MessageType = 9
	MessageType_SEEK_REQUESTS                                MessageType = 10
	MessageType_ONGOING_GAME_EVENT                           MessageType = 12
	MessageType_TIMED_OUT                                    MessageType = 13
	MessageType_ONGOING_GAMES                                MessageType = 14
	MessageType_READY_FOR_TOURNAMENT_GAME                    MessageType = 15
	MessageType_TOURNAMENT_ROUND_STARTED                     MessageType = 16
	MessageType_GAME_DELETION                                MessageType = 17
	MessageType_MATCH_REQUESTS                               MessageType = 18
	MessageType_DECLINE_SEEK_REQUEST                         MessageType = 19
	MessageType_CHAT_MESSAGE                                 MessageType = 20
	MessageType_CHAT_MESSAGE_DELETED                         MessageType = 21
	MessageType_USER_PRESENCE                                MessageType = 22
	MessageType_USER_PRESENCES                               MessageType = 23
	MessageType_SERVER_MESSAGE                               MessageType = 24
	MessageType_READY_FOR_GAME                               MessageType = 25
	MessageType_LAG_MEASUREMENT                              MessageType = 26
	MessageType_TOURNAMENT_GAME_ENDED_EVENT                  MessageType = 27
	MessageType_TOURNAMENT_MESSAGE                           MessageType = 28 // used for TournamentDataResponse (metadata)
	MessageType_REMATCH_STARTED                              MessageType = 29
	MessageType_TOURNAMENT_DIVISION_MESSAGE                  MessageType = 30
	MessageType_TOURNAMENT_DIVISION_DELETED_MESSAGE          MessageType = 31
	MessageType_TOURNAMENT_FULL_DIVISIONS_MESSAGE            MessageType = 32
	MessageType_TOURNAMENT_DIVISION_ROUND_CONTROLS_MESSAGE   MessageType = 34
	MessageType_TOURNAMENT_DIVISION_PAIRINGS_MESSAGE         MessageType = 35
	MessageType_TOURNAMENT_DIVISION_CONTROLS_MESSAGE         MessageType = 36
	MessageType_TOURNAMENT_DIVISION_PLAYER_CHANGE_MESSAGE    MessageType = 37
	MessageType_TOURNAMENT_FINISHED_MESSAGE                  MessageType = 38
	MessageType_TOURNAMENT_DIVISION_PAIRINGS_DELETED_MESSAGE MessageType = 39
	MessageType_PRESENCE_ENTRY                               MessageType = 40
	MessageType_ACTIVE_GAME_ENTRY                            MessageType = 41
	MessageType_GAME_META_EVENT                              MessageType = 42
	MessageType_PROFILE_UPDATE_EVENT                         MessageType = 43
	// Add more events here. The total number of events should fit in a byte.
	// We should definitely not be using anywhere close to 255 events, and
	// in order to enforce that I'll be forcing the event type header to just be
	// a byte long.
	MessageType_OMGWORDS_GAMEPLAY_EVENT MessageType = 44
	MessageType_OMGWORDS_GAMEDOCUMENT   MessageType = 45
)

// Enum value maps for MessageType.
var (
	MessageType_name = map[int32]string{
		0:  "SEEK_REQUEST",
		1:  "MATCH_REQUEST",
		2:  "SOUGHT_GAME_PROCESS_EVENT",
		3:  "CLIENT_GAMEPLAY_EVENT",
		4:  "SERVER_GAMEPLAY_EVENT",
		5:  "GAME_ENDED_EVENT",
		6:  "GAME_HISTORY_REFRESHER",
		7:  "ERROR_MESSAGE",
		8:  "NEW_GAME_EVENT",
		9:  "SERVER_CHALLENGE_RESULT_EVENT",
		10: "SEEK_REQUESTS",
		12: "ONGOING_GAME_EVENT",
		13: "TIMED_OUT",
		14: "ONGOING_GAMES",
		15: "READY_FOR_TOURNAMENT_GAME",
		16: "TOURNAMENT_ROUND_STARTED",
		17: "GAME_DELETION",
		18: "MATCH_REQUESTS",
		19: "DECLINE_SEEK_REQUEST",
		20: "CHAT_MESSAGE",
		21: "CHAT_MESSAGE_DELETED",
		22: "USER_PRESENCE",
		23: "USER_PRESENCES",
		24: "SERVER_MESSAGE",
		25: "READY_FOR_GAME",
		26: "LAG_MEASUREMENT",
		27: "TOURNAMENT_GAME_ENDED_EVENT",
		28: "TOURNAMENT_MESSAGE",
		29: "REMATCH_STARTED",
		30: "TOURNAMENT_DIVISION_MESSAGE",
		31: "TOURNAMENT_DIVISION_DELETED_MESSAGE",
		32: "TOURNAMENT_FULL_DIVISIONS_MESSAGE",
		34: "TOURNAMENT_DIVISION_ROUND_CONTROLS_MESSAGE",
		35: "TOURNAMENT_DIVISION_PAIRINGS_MESSAGE",
		36: "TOURNAMENT_DIVISION_CONTROLS_MESSAGE",
		37: "TOURNAMENT_DIVISION_PLAYER_CHANGE_MESSAGE",
		38: "TOURNAMENT_FINISHED_MESSAGE",
		39: "TOURNAMENT_DIVISION_PAIRINGS_DELETED_MESSAGE",
		40: "PRESENCE_ENTRY",
		41: "ACTIVE_GAME_ENTRY",
		42: "GAME_META_EVENT",
		43: "PROFILE_UPDATE_EVENT",
		44: "OMGWORDS_GAMEPLAY_EVENT",
		45: "OMGWORDS_GAMEDOCUMENT",
	}
	MessageType_value = map[string]int32{
		"SEEK_REQUEST":                                 0,
		"MATCH_REQUEST":                                1,
		"SOUGHT_GAME_PROCESS_EVENT":                    2,
		"CLIENT_GAMEPLAY_EVENT":                        3,
		"SERVER_GAMEPLAY_EVENT":                        4,
		"GAME_ENDED_EVENT":                             5,
		"GAME_HISTORY_REFRESHER":                       6,
		"ERROR_MESSAGE":                                7,
		"NEW_GAME_EVENT":                               8,
		"SERVER_CHALLENGE_RESULT_EVENT":                9,
		"SEEK_REQUESTS":                                10,
		"ONGOING_GAME_EVENT":                           12,
		"TIMED_OUT":                                    13,
		"ONGOING_GAMES":                                14,
		"READY_FOR_TOURNAMENT_GAME":                    15,
		"TOURNAMENT_ROUND_STARTED":                     16,
		"GAME_DELETION":                                17,
		"MATCH_REQUESTS":                               18,
		"DECLINE_SEEK_REQUEST":                         19,
		"CHAT_MESSAGE":                                 20,
		"CHAT_MESSAGE_DELETED":                         21,
		"USER_PRESENCE":                                22,
		"USER_PRESENCES":                               23,
		"SERVER_MESSAGE":                               24,
		"READY_FOR_GAME":                               25,
		"LAG_MEASUREMENT":                              26,
		"TOURNAMENT_GAME_ENDED_EVENT":                  27,
		"TOURNAMENT_MESSAGE":                           28,
		"REMATCH_STARTED":                              29,
		"TOURNAMENT_DIVISION_MESSAGE":                  30,
		"TOURNAMENT_DIVISION_DELETED_MESSAGE":          31,
		"TOURNAMENT_FULL_DIVISIONS_MESSAGE":            32,
		"TOURNAMENT_DIVISION_ROUND_CONTROLS_MESSAGE":   34,
		"TOURNAMENT_DIVISION_PAIRINGS_MESSAGE":         35,
		"TOURNAMENT_DIVISION_CONTROLS_MESSAGE":         36,
		"TOURNAMENT_DIVISION_PLAYER_CHANGE_MESSAGE":    37,
		"TOURNAMENT_FINISHED_MESSAGE":                  38,
		"TOURNAMENT_DIVISION_PAIRINGS_DELETED_MESSAGE": 39,
		"PRESENCE_ENTRY":                               40,
		"ACTIVE_GAME_ENTRY":                            41,
		"GAME_META_EVENT":                              42,
		"PROFILE_UPDATE_EVENT":                         43,
		"OMGWORDS_GAMEPLAY_EVENT":                      44,
		"OMGWORDS_GAMEDOCUMENT":                        45,
	}
)

func (x MessageType) Enum() *MessageType {
	p := new(MessageType)
	*p = x
	return p
}

func (x MessageType) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (MessageType) Descriptor() protoreflect.EnumDescriptor {
	return file_ipc_ipc_proto_enumTypes[0].Descriptor()
}

func (MessageType) Type() protoreflect.EnumType {
	return &file_ipc_ipc_proto_enumTypes[0]
}

func (x MessageType) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use MessageType.Descriptor instead.
func (MessageType) EnumDescriptor() ([]byte, []int) {
	return file_ipc_ipc_proto_rawDescGZIP(), []int{0}
}

type RegisterRealmRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Path   string `protobuf:"bytes,1,opt,name=path,proto3" json:"path,omitempty"`
	UserId string `protobuf:"bytes,2,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
}

func (x *RegisterRealmRequest) Reset() {
	*x = RegisterRealmRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipc_ipc_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RegisterRealmRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RegisterRealmRequest) ProtoMessage() {}

func (x *RegisterRealmRequest) ProtoReflect() protoreflect.Message {
	mi := &file_ipc_ipc_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RegisterRealmRequest.ProtoReflect.Descriptor instead.
func (*RegisterRealmRequest) Descriptor() ([]byte, []int) {
	return file_ipc_ipc_proto_rawDescGZIP(), []int{0}
}

func (x *RegisterRealmRequest) GetPath() string {
	if x != nil {
		return x.Path
	}
	return ""
}

func (x *RegisterRealmRequest) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

type RegisterRealmResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// realm should be made obsolete. RegisterRealmResponse should always
	// return a list of realms.
	Realms []string `protobuf:"bytes,2,rep,name=realms,proto3" json:"realms,omitempty"`
}

func (x *RegisterRealmResponse) Reset() {
	*x = RegisterRealmResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipc_ipc_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RegisterRealmResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RegisterRealmResponse) ProtoMessage() {}

func (x *RegisterRealmResponse) ProtoReflect() protoreflect.Message {
	mi := &file_ipc_ipc_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RegisterRealmResponse.ProtoReflect.Descriptor instead.
func (*RegisterRealmResponse) Descriptor() ([]byte, []int) {
	return file_ipc_ipc_proto_rawDescGZIP(), []int{1}
}

func (x *RegisterRealmResponse) GetRealms() []string {
	if x != nil {
		return x.Realms
	}
	return nil
}

// InitRealmInfo is a request for the API server to send back information
// about that realm back to the user. For example, for the lobby realm,
// we would like lists of active games, chats, etc; for game realms, we would
// like the game history.
type InitRealmInfo struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	UserId string   `protobuf:"bytes,2,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	Realms []string `protobuf:"bytes,3,rep,name=realms,proto3" json:"realms,omitempty"`
}

func (x *InitRealmInfo) Reset() {
	*x = InitRealmInfo{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipc_ipc_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *InitRealmInfo) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*InitRealmInfo) ProtoMessage() {}

func (x *InitRealmInfo) ProtoReflect() protoreflect.Message {
	mi := &file_ipc_ipc_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use InitRealmInfo.ProtoReflect.Descriptor instead.
func (*InitRealmInfo) Descriptor() ([]byte, []int) {
	return file_ipc_ipc_proto_rawDescGZIP(), []int{2}
}

func (x *InitRealmInfo) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

func (x *InitRealmInfo) GetRealms() []string {
	if x != nil {
		return x.Realms
	}
	return nil
}

type LagMeasurement struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	LagMs int32 `protobuf:"varint,1,opt,name=lag_ms,json=lagMs,proto3" json:"lag_ms,omitempty"`
}

func (x *LagMeasurement) Reset() {
	*x = LagMeasurement{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipc_ipc_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *LagMeasurement) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*LagMeasurement) ProtoMessage() {}

func (x *LagMeasurement) ProtoReflect() protoreflect.Message {
	mi := &file_ipc_ipc_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use LagMeasurement.ProtoReflect.Descriptor instead.
func (*LagMeasurement) Descriptor() ([]byte, []int) {
	return file_ipc_ipc_proto_rawDescGZIP(), []int{3}
}

func (x *LagMeasurement) GetLagMs() int32 {
	if x != nil {
		return x.LagMs
	}
	return 0
}

type Pong struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Ips string `protobuf:"bytes,1,opt,name=ips,proto3" json:"ips,omitempty"`
}

func (x *Pong) Reset() {
	*x = Pong{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipc_ipc_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Pong) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Pong) ProtoMessage() {}

func (x *Pong) ProtoReflect() protoreflect.Message {
	mi := &file_ipc_ipc_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Pong.ProtoReflect.Descriptor instead.
func (*Pong) Descriptor() ([]byte, []int) {
	return file_ipc_ipc_proto_rawDescGZIP(), []int{4}
}

func (x *Pong) GetIps() string {
	if x != nil {
		return x.Ips
	}
	return ""
}

type ServerMessage struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Message string `protobuf:"bytes,1,opt,name=message,proto3" json:"message,omitempty"`
}

func (x *ServerMessage) Reset() {
	*x = ServerMessage{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipc_ipc_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ServerMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ServerMessage) ProtoMessage() {}

func (x *ServerMessage) ProtoReflect() protoreflect.Message {
	mi := &file_ipc_ipc_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ServerMessage.ProtoReflect.Descriptor instead.
func (*ServerMessage) Descriptor() ([]byte, []int) {
	return file_ipc_ipc_proto_rawDescGZIP(), []int{5}
}

func (x *ServerMessage) GetMessage() string {
	if x != nil {
		return x.Message
	}
	return ""
}

// When we go to a new path in our SPA, we send a JoinPath. When we leave the
// path, we send an Unjoin realm. d
type JoinPath struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Path string `protobuf:"bytes,1,opt,name=path,proto3" json:"path,omitempty"`
}

func (x *JoinPath) Reset() {
	*x = JoinPath{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipc_ipc_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *JoinPath) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*JoinPath) ProtoMessage() {}

func (x *JoinPath) ProtoReflect() protoreflect.Message {
	mi := &file_ipc_ipc_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use JoinPath.ProtoReflect.Descriptor instead.
func (*JoinPath) Descriptor() ([]byte, []int) {
	return file_ipc_ipc_proto_rawDescGZIP(), []int{6}
}

func (x *JoinPath) GetPath() string {
	if x != nil {
		return x.Path
	}
	return ""
}

type UnjoinRealm struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *UnjoinRealm) Reset() {
	*x = UnjoinRealm{}
	if protoimpl.UnsafeEnabled {
		mi := &file_ipc_ipc_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *UnjoinRealm) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*UnjoinRealm) ProtoMessage() {}

func (x *UnjoinRealm) ProtoReflect() protoreflect.Message {
	mi := &file_ipc_ipc_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use UnjoinRealm.ProtoReflect.Descriptor instead.
func (*UnjoinRealm) Descriptor() ([]byte, []int) {
	return file_ipc_ipc_proto_rawDescGZIP(), []int{7}
}

var File_ipc_ipc_proto protoreflect.FileDescriptor

var file_ipc_ipc_proto_rawDesc = []byte{
	0x0a, 0x0d, 0x69, 0x70, 0x63, 0x2f, 0x69, 0x70, 0x63, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12,
	0x03, 0x69, 0x70, 0x63, 0x22, 0x43, 0x0a, 0x14, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72,
	0x52, 0x65, 0x61, 0x6c, 0x6d, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x12, 0x0a, 0x04,
	0x70, 0x61, 0x74, 0x68, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x70, 0x61, 0x74, 0x68,
	0x12, 0x17, 0x0a, 0x07, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x69, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x06, 0x75, 0x73, 0x65, 0x72, 0x49, 0x64, 0x22, 0x2f, 0x0a, 0x15, 0x52, 0x65, 0x67,
	0x69, 0x73, 0x74, 0x65, 0x72, 0x52, 0x65, 0x61, 0x6c, 0x6d, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e,
	0x73, 0x65, 0x12, 0x16, 0x0a, 0x06, 0x72, 0x65, 0x61, 0x6c, 0x6d, 0x73, 0x18, 0x02, 0x20, 0x03,
	0x28, 0x09, 0x52, 0x06, 0x72, 0x65, 0x61, 0x6c, 0x6d, 0x73, 0x22, 0x40, 0x0a, 0x0d, 0x49, 0x6e,
	0x69, 0x74, 0x52, 0x65, 0x61, 0x6c, 0x6d, 0x49, 0x6e, 0x66, 0x6f, 0x12, 0x17, 0x0a, 0x07, 0x75,
	0x73, 0x65, 0x72, 0x5f, 0x69, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x75, 0x73,
	0x65, 0x72, 0x49, 0x64, 0x12, 0x16, 0x0a, 0x06, 0x72, 0x65, 0x61, 0x6c, 0x6d, 0x73, 0x18, 0x03,
	0x20, 0x03, 0x28, 0x09, 0x52, 0x06, 0x72, 0x65, 0x61, 0x6c, 0x6d, 0x73, 0x22, 0x27, 0x0a, 0x0e,
	0x4c, 0x61, 0x67, 0x4d, 0x65, 0x61, 0x73, 0x75, 0x72, 0x65, 0x6d, 0x65, 0x6e, 0x74, 0x12, 0x15,
	0x0a, 0x06, 0x6c, 0x61, 0x67, 0x5f, 0x6d, 0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x05, 0x52, 0x05,
	0x6c, 0x61, 0x67, 0x4d, 0x73, 0x22, 0x18, 0x0a, 0x04, 0x50, 0x6f, 0x6e, 0x67, 0x12, 0x10, 0x0a,
	0x03, 0x69, 0x70, 0x73, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x69, 0x70, 0x73, 0x22,
	0x29, 0x0a, 0x0d, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65,
	0x12, 0x18, 0x0a, 0x07, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x07, 0x6d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x22, 0x1e, 0x0a, 0x08, 0x4a, 0x6f,
	0x69, 0x6e, 0x50, 0x61, 0x74, 0x68, 0x12, 0x12, 0x0a, 0x04, 0x70, 0x61, 0x74, 0x68, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x70, 0x61, 0x74, 0x68, 0x22, 0x0d, 0x0a, 0x0b, 0x55, 0x6e,
	0x6a, 0x6f, 0x69, 0x6e, 0x52, 0x65, 0x61, 0x6c, 0x6d, 0x2a, 0xb5, 0x09, 0x0a, 0x0b, 0x4d, 0x65,
	0x73, 0x73, 0x61, 0x67, 0x65, 0x54, 0x79, 0x70, 0x65, 0x12, 0x10, 0x0a, 0x0c, 0x53, 0x45, 0x45,
	0x4b, 0x5f, 0x52, 0x45, 0x51, 0x55, 0x45, 0x53, 0x54, 0x10, 0x00, 0x12, 0x11, 0x0a, 0x0d, 0x4d,
	0x41, 0x54, 0x43, 0x48, 0x5f, 0x52, 0x45, 0x51, 0x55, 0x45, 0x53, 0x54, 0x10, 0x01, 0x12, 0x1d,
	0x0a, 0x19, 0x53, 0x4f, 0x55, 0x47, 0x48, 0x54, 0x5f, 0x47, 0x41, 0x4d, 0x45, 0x5f, 0x50, 0x52,
	0x4f, 0x43, 0x45, 0x53, 0x53, 0x5f, 0x45, 0x56, 0x45, 0x4e, 0x54, 0x10, 0x02, 0x12, 0x19, 0x0a,
	0x15, 0x43, 0x4c, 0x49, 0x45, 0x4e, 0x54, 0x5f, 0x47, 0x41, 0x4d, 0x45, 0x50, 0x4c, 0x41, 0x59,
	0x5f, 0x45, 0x56, 0x45, 0x4e, 0x54, 0x10, 0x03, 0x12, 0x19, 0x0a, 0x15, 0x53, 0x45, 0x52, 0x56,
	0x45, 0x52, 0x5f, 0x47, 0x41, 0x4d, 0x45, 0x50, 0x4c, 0x41, 0x59, 0x5f, 0x45, 0x56, 0x45, 0x4e,
	0x54, 0x10, 0x04, 0x12, 0x14, 0x0a, 0x10, 0x47, 0x41, 0x4d, 0x45, 0x5f, 0x45, 0x4e, 0x44, 0x45,
	0x44, 0x5f, 0x45, 0x56, 0x45, 0x4e, 0x54, 0x10, 0x05, 0x12, 0x1a, 0x0a, 0x16, 0x47, 0x41, 0x4d,
	0x45, 0x5f, 0x48, 0x49, 0x53, 0x54, 0x4f, 0x52, 0x59, 0x5f, 0x52, 0x45, 0x46, 0x52, 0x45, 0x53,
	0x48, 0x45, 0x52, 0x10, 0x06, 0x12, 0x11, 0x0a, 0x0d, 0x45, 0x52, 0x52, 0x4f, 0x52, 0x5f, 0x4d,
	0x45, 0x53, 0x53, 0x41, 0x47, 0x45, 0x10, 0x07, 0x12, 0x12, 0x0a, 0x0e, 0x4e, 0x45, 0x57, 0x5f,
	0x47, 0x41, 0x4d, 0x45, 0x5f, 0x45, 0x56, 0x45, 0x4e, 0x54, 0x10, 0x08, 0x12, 0x21, 0x0a, 0x1d,
	0x53, 0x45, 0x52, 0x56, 0x45, 0x52, 0x5f, 0x43, 0x48, 0x41, 0x4c, 0x4c, 0x45, 0x4e, 0x47, 0x45,
	0x5f, 0x52, 0x45, 0x53, 0x55, 0x4c, 0x54, 0x5f, 0x45, 0x56, 0x45, 0x4e, 0x54, 0x10, 0x09, 0x12,
	0x11, 0x0a, 0x0d, 0x53, 0x45, 0x45, 0x4b, 0x5f, 0x52, 0x45, 0x51, 0x55, 0x45, 0x53, 0x54, 0x53,
	0x10, 0x0a, 0x12, 0x16, 0x0a, 0x12, 0x4f, 0x4e, 0x47, 0x4f, 0x49, 0x4e, 0x47, 0x5f, 0x47, 0x41,
	0x4d, 0x45, 0x5f, 0x45, 0x56, 0x45, 0x4e, 0x54, 0x10, 0x0c, 0x12, 0x0d, 0x0a, 0x09, 0x54, 0x49,
	0x4d, 0x45, 0x44, 0x5f, 0x4f, 0x55, 0x54, 0x10, 0x0d, 0x12, 0x11, 0x0a, 0x0d, 0x4f, 0x4e, 0x47,
	0x4f, 0x49, 0x4e, 0x47, 0x5f, 0x47, 0x41, 0x4d, 0x45, 0x53, 0x10, 0x0e, 0x12, 0x1d, 0x0a, 0x19,
	0x52, 0x45, 0x41, 0x44, 0x59, 0x5f, 0x46, 0x4f, 0x52, 0x5f, 0x54, 0x4f, 0x55, 0x52, 0x4e, 0x41,
	0x4d, 0x45, 0x4e, 0x54, 0x5f, 0x47, 0x41, 0x4d, 0x45, 0x10, 0x0f, 0x12, 0x1c, 0x0a, 0x18, 0x54,
	0x4f, 0x55, 0x52, 0x4e, 0x41, 0x4d, 0x45, 0x4e, 0x54, 0x5f, 0x52, 0x4f, 0x55, 0x4e, 0x44, 0x5f,
	0x53, 0x54, 0x41, 0x52, 0x54, 0x45, 0x44, 0x10, 0x10, 0x12, 0x11, 0x0a, 0x0d, 0x47, 0x41, 0x4d,
	0x45, 0x5f, 0x44, 0x45, 0x4c, 0x45, 0x54, 0x49, 0x4f, 0x4e, 0x10, 0x11, 0x12, 0x12, 0x0a, 0x0e,
	0x4d, 0x41, 0x54, 0x43, 0x48, 0x5f, 0x52, 0x45, 0x51, 0x55, 0x45, 0x53, 0x54, 0x53, 0x10, 0x12,
	0x12, 0x18, 0x0a, 0x14, 0x44, 0x45, 0x43, 0x4c, 0x49, 0x4e, 0x45, 0x5f, 0x53, 0x45, 0x45, 0x4b,
	0x5f, 0x52, 0x45, 0x51, 0x55, 0x45, 0x53, 0x54, 0x10, 0x13, 0x12, 0x10, 0x0a, 0x0c, 0x43, 0x48,
	0x41, 0x54, 0x5f, 0x4d, 0x45, 0x53, 0x53, 0x41, 0x47, 0x45, 0x10, 0x14, 0x12, 0x18, 0x0a, 0x14,
	0x43, 0x48, 0x41, 0x54, 0x5f, 0x4d, 0x45, 0x53, 0x53, 0x41, 0x47, 0x45, 0x5f, 0x44, 0x45, 0x4c,
	0x45, 0x54, 0x45, 0x44, 0x10, 0x15, 0x12, 0x11, 0x0a, 0x0d, 0x55, 0x53, 0x45, 0x52, 0x5f, 0x50,
	0x52, 0x45, 0x53, 0x45, 0x4e, 0x43, 0x45, 0x10, 0x16, 0x12, 0x12, 0x0a, 0x0e, 0x55, 0x53, 0x45,
	0x52, 0x5f, 0x50, 0x52, 0x45, 0x53, 0x45, 0x4e, 0x43, 0x45, 0x53, 0x10, 0x17, 0x12, 0x12, 0x0a,
	0x0e, 0x53, 0x45, 0x52, 0x56, 0x45, 0x52, 0x5f, 0x4d, 0x45, 0x53, 0x53, 0x41, 0x47, 0x45, 0x10,
	0x18, 0x12, 0x12, 0x0a, 0x0e, 0x52, 0x45, 0x41, 0x44, 0x59, 0x5f, 0x46, 0x4f, 0x52, 0x5f, 0x47,
	0x41, 0x4d, 0x45, 0x10, 0x19, 0x12, 0x13, 0x0a, 0x0f, 0x4c, 0x41, 0x47, 0x5f, 0x4d, 0x45, 0x41,
	0x53, 0x55, 0x52, 0x45, 0x4d, 0x45, 0x4e, 0x54, 0x10, 0x1a, 0x12, 0x1f, 0x0a, 0x1b, 0x54, 0x4f,
	0x55, 0x52, 0x4e, 0x41, 0x4d, 0x45, 0x4e, 0x54, 0x5f, 0x47, 0x41, 0x4d, 0x45, 0x5f, 0x45, 0x4e,
	0x44, 0x45, 0x44, 0x5f, 0x45, 0x56, 0x45, 0x4e, 0x54, 0x10, 0x1b, 0x12, 0x16, 0x0a, 0x12, 0x54,
	0x4f, 0x55, 0x52, 0x4e, 0x41, 0x4d, 0x45, 0x4e, 0x54, 0x5f, 0x4d, 0x45, 0x53, 0x53, 0x41, 0x47,
	0x45, 0x10, 0x1c, 0x12, 0x13, 0x0a, 0x0f, 0x52, 0x45, 0x4d, 0x41, 0x54, 0x43, 0x48, 0x5f, 0x53,
	0x54, 0x41, 0x52, 0x54, 0x45, 0x44, 0x10, 0x1d, 0x12, 0x1f, 0x0a, 0x1b, 0x54, 0x4f, 0x55, 0x52,
	0x4e, 0x41, 0x4d, 0x45, 0x4e, 0x54, 0x5f, 0x44, 0x49, 0x56, 0x49, 0x53, 0x49, 0x4f, 0x4e, 0x5f,
	0x4d, 0x45, 0x53, 0x53, 0x41, 0x47, 0x45, 0x10, 0x1e, 0x12, 0x27, 0x0a, 0x23, 0x54, 0x4f, 0x55,
	0x52, 0x4e, 0x41, 0x4d, 0x45, 0x4e, 0x54, 0x5f, 0x44, 0x49, 0x56, 0x49, 0x53, 0x49, 0x4f, 0x4e,
	0x5f, 0x44, 0x45, 0x4c, 0x45, 0x54, 0x45, 0x44, 0x5f, 0x4d, 0x45, 0x53, 0x53, 0x41, 0x47, 0x45,
	0x10, 0x1f, 0x12, 0x25, 0x0a, 0x21, 0x54, 0x4f, 0x55, 0x52, 0x4e, 0x41, 0x4d, 0x45, 0x4e, 0x54,
	0x5f, 0x46, 0x55, 0x4c, 0x4c, 0x5f, 0x44, 0x49, 0x56, 0x49, 0x53, 0x49, 0x4f, 0x4e, 0x53, 0x5f,
	0x4d, 0x45, 0x53, 0x53, 0x41, 0x47, 0x45, 0x10, 0x20, 0x12, 0x2e, 0x0a, 0x2a, 0x54, 0x4f, 0x55,
	0x52, 0x4e, 0x41, 0x4d, 0x45, 0x4e, 0x54, 0x5f, 0x44, 0x49, 0x56, 0x49, 0x53, 0x49, 0x4f, 0x4e,
	0x5f, 0x52, 0x4f, 0x55, 0x4e, 0x44, 0x5f, 0x43, 0x4f, 0x4e, 0x54, 0x52, 0x4f, 0x4c, 0x53, 0x5f,
	0x4d, 0x45, 0x53, 0x53, 0x41, 0x47, 0x45, 0x10, 0x22, 0x12, 0x28, 0x0a, 0x24, 0x54, 0x4f, 0x55,
	0x52, 0x4e, 0x41, 0x4d, 0x45, 0x4e, 0x54, 0x5f, 0x44, 0x49, 0x56, 0x49, 0x53, 0x49, 0x4f, 0x4e,
	0x5f, 0x50, 0x41, 0x49, 0x52, 0x49, 0x4e, 0x47, 0x53, 0x5f, 0x4d, 0x45, 0x53, 0x53, 0x41, 0x47,
	0x45, 0x10, 0x23, 0x12, 0x28, 0x0a, 0x24, 0x54, 0x4f, 0x55, 0x52, 0x4e, 0x41, 0x4d, 0x45, 0x4e,
	0x54, 0x5f, 0x44, 0x49, 0x56, 0x49, 0x53, 0x49, 0x4f, 0x4e, 0x5f, 0x43, 0x4f, 0x4e, 0x54, 0x52,
	0x4f, 0x4c, 0x53, 0x5f, 0x4d, 0x45, 0x53, 0x53, 0x41, 0x47, 0x45, 0x10, 0x24, 0x12, 0x2d, 0x0a,
	0x29, 0x54, 0x4f, 0x55, 0x52, 0x4e, 0x41, 0x4d, 0x45, 0x4e, 0x54, 0x5f, 0x44, 0x49, 0x56, 0x49,
	0x53, 0x49, 0x4f, 0x4e, 0x5f, 0x50, 0x4c, 0x41, 0x59, 0x45, 0x52, 0x5f, 0x43, 0x48, 0x41, 0x4e,
	0x47, 0x45, 0x5f, 0x4d, 0x45, 0x53, 0x53, 0x41, 0x47, 0x45, 0x10, 0x25, 0x12, 0x1f, 0x0a, 0x1b,
	0x54, 0x4f, 0x55, 0x52, 0x4e, 0x41, 0x4d, 0x45, 0x4e, 0x54, 0x5f, 0x46, 0x49, 0x4e, 0x49, 0x53,
	0x48, 0x45, 0x44, 0x5f, 0x4d, 0x45, 0x53, 0x53, 0x41, 0x47, 0x45, 0x10, 0x26, 0x12, 0x30, 0x0a,
	0x2c, 0x54, 0x4f, 0x55, 0x52, 0x4e, 0x41, 0x4d, 0x45, 0x4e, 0x54, 0x5f, 0x44, 0x49, 0x56, 0x49,
	0x53, 0x49, 0x4f, 0x4e, 0x5f, 0x50, 0x41, 0x49, 0x52, 0x49, 0x4e, 0x47, 0x53, 0x5f, 0x44, 0x45,
	0x4c, 0x45, 0x54, 0x45, 0x44, 0x5f, 0x4d, 0x45, 0x53, 0x53, 0x41, 0x47, 0x45, 0x10, 0x27, 0x12,
	0x12, 0x0a, 0x0e, 0x50, 0x52, 0x45, 0x53, 0x45, 0x4e, 0x43, 0x45, 0x5f, 0x45, 0x4e, 0x54, 0x52,
	0x59, 0x10, 0x28, 0x12, 0x15, 0x0a, 0x11, 0x41, 0x43, 0x54, 0x49, 0x56, 0x45, 0x5f, 0x47, 0x41,
	0x4d, 0x45, 0x5f, 0x45, 0x4e, 0x54, 0x52, 0x59, 0x10, 0x29, 0x12, 0x13, 0x0a, 0x0f, 0x47, 0x41,
	0x4d, 0x45, 0x5f, 0x4d, 0x45, 0x54, 0x41, 0x5f, 0x45, 0x56, 0x45, 0x4e, 0x54, 0x10, 0x2a, 0x12,
	0x18, 0x0a, 0x14, 0x50, 0x52, 0x4f, 0x46, 0x49, 0x4c, 0x45, 0x5f, 0x55, 0x50, 0x44, 0x41, 0x54,
	0x45, 0x5f, 0x45, 0x56, 0x45, 0x4e, 0x54, 0x10, 0x2b, 0x12, 0x1b, 0x0a, 0x17, 0x4f, 0x4d, 0x47,
	0x57, 0x4f, 0x52, 0x44, 0x53, 0x5f, 0x47, 0x41, 0x4d, 0x45, 0x50, 0x4c, 0x41, 0x59, 0x5f, 0x45,
	0x56, 0x45, 0x4e, 0x54, 0x10, 0x2c, 0x12, 0x19, 0x0a, 0x15, 0x4f, 0x4d, 0x47, 0x57, 0x4f, 0x52,
	0x44, 0x53, 0x5f, 0x47, 0x41, 0x4d, 0x45, 0x44, 0x4f, 0x43, 0x55, 0x4d, 0x45, 0x4e, 0x54, 0x10,
	0x2d, 0x42, 0x2f, 0x5a, 0x2d, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f,
	0x64, 0x6f, 0x6d, 0x69, 0x6e, 0x6f, 0x31, 0x34, 0x2f, 0x6c, 0x69, 0x77, 0x6f, 0x72, 0x64, 0x73,
	0x2f, 0x72, 0x70, 0x63, 0x2f, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x69,
	0x70, 0x63, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_ipc_ipc_proto_rawDescOnce sync.Once
	file_ipc_ipc_proto_rawDescData = file_ipc_ipc_proto_rawDesc
)

func file_ipc_ipc_proto_rawDescGZIP() []byte {
	file_ipc_ipc_proto_rawDescOnce.Do(func() {
		file_ipc_ipc_proto_rawDescData = protoimpl.X.CompressGZIP(file_ipc_ipc_proto_rawDescData)
	})
	return file_ipc_ipc_proto_rawDescData
}

var file_ipc_ipc_proto_enumTypes = make([]protoimpl.EnumInfo, 1)
var file_ipc_ipc_proto_msgTypes = make([]protoimpl.MessageInfo, 8)
var file_ipc_ipc_proto_goTypes = []interface{}{
	(MessageType)(0),              // 0: ipc.MessageType
	(*RegisterRealmRequest)(nil),  // 1: ipc.RegisterRealmRequest
	(*RegisterRealmResponse)(nil), // 2: ipc.RegisterRealmResponse
	(*InitRealmInfo)(nil),         // 3: ipc.InitRealmInfo
	(*LagMeasurement)(nil),        // 4: ipc.LagMeasurement
	(*Pong)(nil),                  // 5: ipc.Pong
	(*ServerMessage)(nil),         // 6: ipc.ServerMessage
	(*JoinPath)(nil),              // 7: ipc.JoinPath
	(*UnjoinRealm)(nil),           // 8: ipc.UnjoinRealm
}
var file_ipc_ipc_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_ipc_ipc_proto_init() }
func file_ipc_ipc_proto_init() {
	if File_ipc_ipc_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_ipc_ipc_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RegisterRealmRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ipc_ipc_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RegisterRealmResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ipc_ipc_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*InitRealmInfo); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ipc_ipc_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*LagMeasurement); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ipc_ipc_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Pong); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ipc_ipc_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ServerMessage); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ipc_ipc_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*JoinPath); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_ipc_ipc_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*UnjoinRealm); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_ipc_ipc_proto_rawDesc,
			NumEnums:      1,
			NumMessages:   8,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_ipc_ipc_proto_goTypes,
		DependencyIndexes: file_ipc_ipc_proto_depIdxs,
		EnumInfos:         file_ipc_ipc_proto_enumTypes,
		MessageInfos:      file_ipc_ipc_proto_msgTypes,
	}.Build()
	File_ipc_ipc_proto = out.File
	file_ipc_ipc_proto_rawDesc = nil
	file_ipc_ipc_proto_goTypes = nil
	file_ipc_ipc_proto_depIdxs = nil
}
