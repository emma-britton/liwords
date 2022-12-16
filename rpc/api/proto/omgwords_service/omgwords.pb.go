// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.26.0
// 	protoc        (unknown)
// source: omgwords_service/omgwords.proto

package omgwords_service

import (
	ipc "github.com/domino14/liwords/rpc/api/proto/ipc"
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

// GameEventResponse doesn't need to have any extra data. The GameEvent API
// will still use sockets to broadcast game information.
type GameEventResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *GameEventResponse) Reset() {
	*x = GameEventResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_omgwords_service_omgwords_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GameEventResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GameEventResponse) ProtoMessage() {}

func (x *GameEventResponse) ProtoReflect() protoreflect.Message {
	mi := &file_omgwords_service_omgwords_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GameEventResponse.ProtoReflect.Descriptor instead.
func (*GameEventResponse) Descriptor() ([]byte, []int) {
	return file_omgwords_service_omgwords_proto_rawDescGZIP(), []int{0}
}

type TimePenaltyEvent struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	PointsLost int32 `protobuf:"varint,1,opt,name=points_lost,json=pointsLost,proto3" json:"points_lost,omitempty"`
}

func (x *TimePenaltyEvent) Reset() {
	*x = TimePenaltyEvent{}
	if protoimpl.UnsafeEnabled {
		mi := &file_omgwords_service_omgwords_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *TimePenaltyEvent) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*TimePenaltyEvent) ProtoMessage() {}

func (x *TimePenaltyEvent) ProtoReflect() protoreflect.Message {
	mi := &file_omgwords_service_omgwords_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use TimePenaltyEvent.ProtoReflect.Descriptor instead.
func (*TimePenaltyEvent) Descriptor() ([]byte, []int) {
	return file_omgwords_service_omgwords_proto_rawDescGZIP(), []int{1}
}

func (x *TimePenaltyEvent) GetPointsLost() int32 {
	if x != nil {
		return x.PointsLost
	}
	return 0
}

type ChallengeBonusPointsEvent struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	PointsGained int32 `protobuf:"varint,1,opt,name=points_gained,json=pointsGained,proto3" json:"points_gained,omitempty"`
}

func (x *ChallengeBonusPointsEvent) Reset() {
	*x = ChallengeBonusPointsEvent{}
	if protoimpl.UnsafeEnabled {
		mi := &file_omgwords_service_omgwords_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ChallengeBonusPointsEvent) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ChallengeBonusPointsEvent) ProtoMessage() {}

func (x *ChallengeBonusPointsEvent) ProtoReflect() protoreflect.Message {
	mi := &file_omgwords_service_omgwords_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ChallengeBonusPointsEvent.ProtoReflect.Descriptor instead.
func (*ChallengeBonusPointsEvent) Descriptor() ([]byte, []int) {
	return file_omgwords_service_omgwords_proto_rawDescGZIP(), []int{2}
}

func (x *ChallengeBonusPointsEvent) GetPointsGained() int32 {
	if x != nil {
		return x.PointsGained
	}
	return 0
}

type CreateBroadcastGameRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	PlayersInfo   []*CreateBroadcastGameRequest_PlayerInfo `protobuf:"bytes,1,rep,name=playersInfo,proto3" json:"playersInfo,omitempty"`
	Lexicon       string                                   `protobuf:"bytes,2,opt,name=lexicon,proto3" json:"lexicon,omitempty"`
	Rules         *ipc.GameRules                           `protobuf:"bytes,3,opt,name=rules,proto3" json:"rules,omitempty"`
	ChallengeRule ipc.ChallengeRule                        `protobuf:"varint,4,opt,name=challenge_rule,json=challengeRule,proto3,enum=ipc.ChallengeRule" json:"challenge_rule,omitempty"`
	// public will make this game public upon creation - i.e., findable
	// within the interface. Otherwise, a game ID is required.
	Public bool `protobuf:"varint,5,opt,name=public,proto3" json:"public,omitempty"`
}

func (x *CreateBroadcastGameRequest) Reset() {
	*x = CreateBroadcastGameRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_omgwords_service_omgwords_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CreateBroadcastGameRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateBroadcastGameRequest) ProtoMessage() {}

func (x *CreateBroadcastGameRequest) ProtoReflect() protoreflect.Message {
	mi := &file_omgwords_service_omgwords_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateBroadcastGameRequest.ProtoReflect.Descriptor instead.
func (*CreateBroadcastGameRequest) Descriptor() ([]byte, []int) {
	return file_omgwords_service_omgwords_proto_rawDescGZIP(), []int{3}
}

func (x *CreateBroadcastGameRequest) GetPlayersInfo() []*CreateBroadcastGameRequest_PlayerInfo {
	if x != nil {
		return x.PlayersInfo
	}
	return nil
}

func (x *CreateBroadcastGameRequest) GetLexicon() string {
	if x != nil {
		return x.Lexicon
	}
	return ""
}

func (x *CreateBroadcastGameRequest) GetRules() *ipc.GameRules {
	if x != nil {
		return x.Rules
	}
	return nil
}

func (x *CreateBroadcastGameRequest) GetChallengeRule() ipc.ChallengeRule {
	if x != nil {
		return x.ChallengeRule
	}
	return ipc.ChallengeRule_ChallengeRule_VOID
}

func (x *CreateBroadcastGameRequest) GetPublic() bool {
	if x != nil {
		return x.Public
	}
	return false
}

type CreateBroadcastGameResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	GameId string `protobuf:"bytes,1,opt,name=game_id,json=gameId,proto3" json:"game_id,omitempty"`
}

func (x *CreateBroadcastGameResponse) Reset() {
	*x = CreateBroadcastGameResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_omgwords_service_omgwords_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CreateBroadcastGameResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateBroadcastGameResponse) ProtoMessage() {}

func (x *CreateBroadcastGameResponse) ProtoReflect() protoreflect.Message {
	mi := &file_omgwords_service_omgwords_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateBroadcastGameResponse.ProtoReflect.Descriptor instead.
func (*CreateBroadcastGameResponse) Descriptor() ([]byte, []int) {
	return file_omgwords_service_omgwords_proto_rawDescGZIP(), []int{4}
}

func (x *CreateBroadcastGameResponse) GetGameId() string {
	if x != nil {
		return x.GameId
	}
	return ""
}

type BroadcastGamePrivacy struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Public bool `protobuf:"varint,1,opt,name=public,proto3" json:"public,omitempty"`
}

func (x *BroadcastGamePrivacy) Reset() {
	*x = BroadcastGamePrivacy{}
	if protoimpl.UnsafeEnabled {
		mi := &file_omgwords_service_omgwords_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *BroadcastGamePrivacy) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*BroadcastGamePrivacy) ProtoMessage() {}

func (x *BroadcastGamePrivacy) ProtoReflect() protoreflect.Message {
	mi := &file_omgwords_service_omgwords_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use BroadcastGamePrivacy.ProtoReflect.Descriptor instead.
func (*BroadcastGamePrivacy) Descriptor() ([]byte, []int) {
	return file_omgwords_service_omgwords_proto_rawDescGZIP(), []int{5}
}

func (x *BroadcastGamePrivacy) GetPublic() bool {
	if x != nil {
		return x.Public
	}
	return false
}

type GetGamesForEditorRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	UserId     string `protobuf:"bytes,1,opt,name=user_id,json=userId,proto3" json:"user_id,omitempty"`
	Limit      int32  `protobuf:"varint,2,opt,name=limit,proto3" json:"limit,omitempty"`
	Offset     int32  `protobuf:"varint,3,opt,name=offset,proto3" json:"offset,omitempty"`
	Unfinished bool   `protobuf:"varint,4,opt,name=unfinished,proto3" json:"unfinished,omitempty"`
}

func (x *GetGamesForEditorRequest) Reset() {
	*x = GetGamesForEditorRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_omgwords_service_omgwords_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetGamesForEditorRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetGamesForEditorRequest) ProtoMessage() {}

func (x *GetGamesForEditorRequest) ProtoReflect() protoreflect.Message {
	mi := &file_omgwords_service_omgwords_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetGamesForEditorRequest.ProtoReflect.Descriptor instead.
func (*GetGamesForEditorRequest) Descriptor() ([]byte, []int) {
	return file_omgwords_service_omgwords_proto_rawDescGZIP(), []int{6}
}

func (x *GetGamesForEditorRequest) GetUserId() string {
	if x != nil {
		return x.UserId
	}
	return ""
}

func (x *GetGamesForEditorRequest) GetLimit() int32 {
	if x != nil {
		return x.Limit
	}
	return 0
}

func (x *GetGamesForEditorRequest) GetOffset() int32 {
	if x != nil {
		return x.Offset
	}
	return 0
}

func (x *GetGamesForEditorRequest) GetUnfinished() bool {
	if x != nil {
		return x.Unfinished
	}
	return false
}

type BroadcastGamesResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Games []*BroadcastGamesResponse_BroadcastGame `protobuf:"bytes,1,rep,name=games,proto3" json:"games,omitempty"`
}

func (x *BroadcastGamesResponse) Reset() {
	*x = BroadcastGamesResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_omgwords_service_omgwords_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *BroadcastGamesResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*BroadcastGamesResponse) ProtoMessage() {}

func (x *BroadcastGamesResponse) ProtoReflect() protoreflect.Message {
	mi := &file_omgwords_service_omgwords_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use BroadcastGamesResponse.ProtoReflect.Descriptor instead.
func (*BroadcastGamesResponse) Descriptor() ([]byte, []int) {
	return file_omgwords_service_omgwords_proto_rawDescGZIP(), []int{7}
}

func (x *BroadcastGamesResponse) GetGames() []*BroadcastGamesResponse_BroadcastGame {
	if x != nil {
		return x.Games
	}
	return nil
}

// PlayerInfo for broadcast games do not need to be tied to a Woogles
// UUID. These games are meant for sandbox/annotation/broadcast of
// a typically IRL game.
type CreateBroadcastGameRequest_PlayerInfo struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Nickname string `protobuf:"bytes,1,opt,name=nickname,proto3" json:"nickname,omitempty"`
	RealName string `protobuf:"bytes,2,opt,name=real_name,json=realName,proto3" json:"real_name,omitempty"`
}

func (x *CreateBroadcastGameRequest_PlayerInfo) Reset() {
	*x = CreateBroadcastGameRequest_PlayerInfo{}
	if protoimpl.UnsafeEnabled {
		mi := &file_omgwords_service_omgwords_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *CreateBroadcastGameRequest_PlayerInfo) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*CreateBroadcastGameRequest_PlayerInfo) ProtoMessage() {}

func (x *CreateBroadcastGameRequest_PlayerInfo) ProtoReflect() protoreflect.Message {
	mi := &file_omgwords_service_omgwords_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use CreateBroadcastGameRequest_PlayerInfo.ProtoReflect.Descriptor instead.
func (*CreateBroadcastGameRequest_PlayerInfo) Descriptor() ([]byte, []int) {
	return file_omgwords_service_omgwords_proto_rawDescGZIP(), []int{3, 0}
}

func (x *CreateBroadcastGameRequest_PlayerInfo) GetNickname() string {
	if x != nil {
		return x.Nickname
	}
	return ""
}

func (x *CreateBroadcastGameRequest_PlayerInfo) GetRealName() string {
	if x != nil {
		return x.RealName
	}
	return ""
}

type BroadcastGamesResponse_BroadcastGame struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	GameId    string `protobuf:"bytes,1,opt,name=game_id,json=gameId,proto3" json:"game_id,omitempty"`
	CreatorId string `protobuf:"bytes,2,opt,name=creator_id,json=creatorId,proto3" json:"creator_id,omitempty"`
	Private   bool   `protobuf:"varint,3,opt,name=private,proto3" json:"private,omitempty"`
	Finished  bool   `protobuf:"varint,4,opt,name=finished,proto3" json:"finished,omitempty"`
}

func (x *BroadcastGamesResponse_BroadcastGame) Reset() {
	*x = BroadcastGamesResponse_BroadcastGame{}
	if protoimpl.UnsafeEnabled {
		mi := &file_omgwords_service_omgwords_proto_msgTypes[9]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *BroadcastGamesResponse_BroadcastGame) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*BroadcastGamesResponse_BroadcastGame) ProtoMessage() {}

func (x *BroadcastGamesResponse_BroadcastGame) ProtoReflect() protoreflect.Message {
	mi := &file_omgwords_service_omgwords_proto_msgTypes[9]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use BroadcastGamesResponse_BroadcastGame.ProtoReflect.Descriptor instead.
func (*BroadcastGamesResponse_BroadcastGame) Descriptor() ([]byte, []int) {
	return file_omgwords_service_omgwords_proto_rawDescGZIP(), []int{7, 0}
}

func (x *BroadcastGamesResponse_BroadcastGame) GetGameId() string {
	if x != nil {
		return x.GameId
	}
	return ""
}

func (x *BroadcastGamesResponse_BroadcastGame) GetCreatorId() string {
	if x != nil {
		return x.CreatorId
	}
	return ""
}

func (x *BroadcastGamesResponse_BroadcastGame) GetPrivate() bool {
	if x != nil {
		return x.Private
	}
	return false
}

func (x *BroadcastGamesResponse_BroadcastGame) GetFinished() bool {
	if x != nil {
		return x.Finished
	}
	return false
}

var File_omgwords_service_omgwords_proto protoreflect.FileDescriptor

var file_omgwords_service_omgwords_proto_rawDesc = []byte{
	0x0a, 0x1f, 0x6f, 0x6d, 0x67, 0x77, 0x6f, 0x72, 0x64, 0x73, 0x5f, 0x73, 0x65, 0x72, 0x76, 0x69,
	0x63, 0x65, 0x2f, 0x6f, 0x6d, 0x67, 0x77, 0x6f, 0x72, 0x64, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x12, 0x0c, 0x67, 0x61, 0x6d, 0x65, 0x5f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x1a,
	0x12, 0x69, 0x70, 0x63, 0x2f, 0x6f, 0x6d, 0x67, 0x77, 0x6f, 0x72, 0x64, 0x73, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x22, 0x13, 0x0a, 0x11, 0x47, 0x61, 0x6d, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x33, 0x0a, 0x10, 0x54, 0x69, 0x6d, 0x65,
	0x50, 0x65, 0x6e, 0x61, 0x6c, 0x74, 0x79, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x12, 0x1f, 0x0a, 0x0b,
	0x70, 0x6f, 0x69, 0x6e, 0x74, 0x73, 0x5f, 0x6c, 0x6f, 0x73, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x05, 0x52, 0x0a, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x73, 0x4c, 0x6f, 0x73, 0x74, 0x22, 0x40, 0x0a,
	0x19, 0x43, 0x68, 0x61, 0x6c, 0x6c, 0x65, 0x6e, 0x67, 0x65, 0x42, 0x6f, 0x6e, 0x75, 0x73, 0x50,
	0x6f, 0x69, 0x6e, 0x74, 0x73, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x12, 0x23, 0x0a, 0x0d, 0x70, 0x6f,
	0x69, 0x6e, 0x74, 0x73, 0x5f, 0x67, 0x61, 0x69, 0x6e, 0x65, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x05, 0x52, 0x0c, 0x70, 0x6f, 0x69, 0x6e, 0x74, 0x73, 0x47, 0x61, 0x69, 0x6e, 0x65, 0x64, 0x22,
	0xcd, 0x02, 0x0a, 0x1a, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x42, 0x72, 0x6f, 0x61, 0x64, 0x63,
	0x61, 0x73, 0x74, 0x47, 0x61, 0x6d, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x55,
	0x0a, 0x0b, 0x70, 0x6c, 0x61, 0x79, 0x65, 0x72, 0x73, 0x49, 0x6e, 0x66, 0x6f, 0x18, 0x01, 0x20,
	0x03, 0x28, 0x0b, 0x32, 0x33, 0x2e, 0x67, 0x61, 0x6d, 0x65, 0x5f, 0x73, 0x65, 0x72, 0x76, 0x69,
	0x63, 0x65, 0x2e, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x42, 0x72, 0x6f, 0x61, 0x64, 0x63, 0x61,
	0x73, 0x74, 0x47, 0x61, 0x6d, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x2e, 0x50, 0x6c,
	0x61, 0x79, 0x65, 0x72, 0x49, 0x6e, 0x66, 0x6f, 0x52, 0x0b, 0x70, 0x6c, 0x61, 0x79, 0x65, 0x72,
	0x73, 0x49, 0x6e, 0x66, 0x6f, 0x12, 0x18, 0x0a, 0x07, 0x6c, 0x65, 0x78, 0x69, 0x63, 0x6f, 0x6e,
	0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x07, 0x6c, 0x65, 0x78, 0x69, 0x63, 0x6f, 0x6e, 0x12,
	0x24, 0x0a, 0x05, 0x72, 0x75, 0x6c, 0x65, 0x73, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x0e,
	0x2e, 0x69, 0x70, 0x63, 0x2e, 0x47, 0x61, 0x6d, 0x65, 0x52, 0x75, 0x6c, 0x65, 0x73, 0x52, 0x05,
	0x72, 0x75, 0x6c, 0x65, 0x73, 0x12, 0x39, 0x0a, 0x0e, 0x63, 0x68, 0x61, 0x6c, 0x6c, 0x65, 0x6e,
	0x67, 0x65, 0x5f, 0x72, 0x75, 0x6c, 0x65, 0x18, 0x04, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x12, 0x2e,
	0x69, 0x70, 0x63, 0x2e, 0x43, 0x68, 0x61, 0x6c, 0x6c, 0x65, 0x6e, 0x67, 0x65, 0x52, 0x75, 0x6c,
	0x65, 0x52, 0x0d, 0x63, 0x68, 0x61, 0x6c, 0x6c, 0x65, 0x6e, 0x67, 0x65, 0x52, 0x75, 0x6c, 0x65,
	0x12, 0x16, 0x0a, 0x06, 0x70, 0x75, 0x62, 0x6c, 0x69, 0x63, 0x18, 0x05, 0x20, 0x01, 0x28, 0x08,
	0x52, 0x06, 0x70, 0x75, 0x62, 0x6c, 0x69, 0x63, 0x1a, 0x45, 0x0a, 0x0a, 0x50, 0x6c, 0x61, 0x79,
	0x65, 0x72, 0x49, 0x6e, 0x66, 0x6f, 0x12, 0x1a, 0x0a, 0x08, 0x6e, 0x69, 0x63, 0x6b, 0x6e, 0x61,
	0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x6e, 0x69, 0x63, 0x6b, 0x6e, 0x61,
	0x6d, 0x65, 0x12, 0x1b, 0x0a, 0x09, 0x72, 0x65, 0x61, 0x6c, 0x5f, 0x6e, 0x61, 0x6d, 0x65, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x72, 0x65, 0x61, 0x6c, 0x4e, 0x61, 0x6d, 0x65, 0x22,
	0x36, 0x0a, 0x1b, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x42, 0x72, 0x6f, 0x61, 0x64, 0x63, 0x61,
	0x73, 0x74, 0x47, 0x61, 0x6d, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x17,
	0x0a, 0x07, 0x67, 0x61, 0x6d, 0x65, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x06, 0x67, 0x61, 0x6d, 0x65, 0x49, 0x64, 0x22, 0x2e, 0x0a, 0x14, 0x42, 0x72, 0x6f, 0x61, 0x64,
	0x63, 0x61, 0x73, 0x74, 0x47, 0x61, 0x6d, 0x65, 0x50, 0x72, 0x69, 0x76, 0x61, 0x63, 0x79, 0x12,
	0x16, 0x0a, 0x06, 0x70, 0x75, 0x62, 0x6c, 0x69, 0x63, 0x18, 0x01, 0x20, 0x01, 0x28, 0x08, 0x52,
	0x06, 0x70, 0x75, 0x62, 0x6c, 0x69, 0x63, 0x22, 0x81, 0x01, 0x0a, 0x18, 0x47, 0x65, 0x74, 0x47,
	0x61, 0x6d, 0x65, 0x73, 0x46, 0x6f, 0x72, 0x45, 0x64, 0x69, 0x74, 0x6f, 0x72, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x12, 0x17, 0x0a, 0x07, 0x75, 0x73, 0x65, 0x72, 0x5f, 0x69, 0x64, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06, 0x75, 0x73, 0x65, 0x72, 0x49, 0x64, 0x12, 0x14, 0x0a,
	0x05, 0x6c, 0x69, 0x6d, 0x69, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x05, 0x52, 0x05, 0x6c, 0x69,
	0x6d, 0x69, 0x74, 0x12, 0x16, 0x0a, 0x06, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x18, 0x03, 0x20,
	0x01, 0x28, 0x05, 0x52, 0x06, 0x6f, 0x66, 0x66, 0x73, 0x65, 0x74, 0x12, 0x1e, 0x0a, 0x0a, 0x75,
	0x6e, 0x66, 0x69, 0x6e, 0x69, 0x73, 0x68, 0x65, 0x64, 0x18, 0x04, 0x20, 0x01, 0x28, 0x08, 0x52,
	0x0a, 0x75, 0x6e, 0x66, 0x69, 0x6e, 0x69, 0x73, 0x68, 0x65, 0x64, 0x22, 0xe1, 0x01, 0x0a, 0x16,
	0x42, 0x72, 0x6f, 0x61, 0x64, 0x63, 0x61, 0x73, 0x74, 0x47, 0x61, 0x6d, 0x65, 0x73, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x48, 0x0a, 0x05, 0x67, 0x61, 0x6d, 0x65, 0x73, 0x18,
	0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x32, 0x2e, 0x67, 0x61, 0x6d, 0x65, 0x5f, 0x73, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x2e, 0x42, 0x72, 0x6f, 0x61, 0x64, 0x63, 0x61, 0x73, 0x74, 0x47, 0x61,
	0x6d, 0x65, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x2e, 0x42, 0x72, 0x6f, 0x61,
	0x64, 0x63, 0x61, 0x73, 0x74, 0x47, 0x61, 0x6d, 0x65, 0x52, 0x05, 0x67, 0x61, 0x6d, 0x65, 0x73,
	0x1a, 0x7d, 0x0a, 0x0d, 0x42, 0x72, 0x6f, 0x61, 0x64, 0x63, 0x61, 0x73, 0x74, 0x47, 0x61, 0x6d,
	0x65, 0x12, 0x17, 0x0a, 0x07, 0x67, 0x61, 0x6d, 0x65, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x06, 0x67, 0x61, 0x6d, 0x65, 0x49, 0x64, 0x12, 0x1d, 0x0a, 0x0a, 0x63, 0x72,
	0x65, 0x61, 0x74, 0x6f, 0x72, 0x5f, 0x69, 0x64, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x09,
	0x63, 0x72, 0x65, 0x61, 0x74, 0x6f, 0x72, 0x49, 0x64, 0x12, 0x18, 0x0a, 0x07, 0x70, 0x72, 0x69,
	0x76, 0x61, 0x74, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x08, 0x52, 0x07, 0x70, 0x72, 0x69, 0x76,
	0x61, 0x74, 0x65, 0x12, 0x1a, 0x0a, 0x08, 0x66, 0x69, 0x6e, 0x69, 0x73, 0x68, 0x65, 0x64, 0x18,
	0x04, 0x20, 0x01, 0x28, 0x08, 0x52, 0x08, 0x66, 0x69, 0x6e, 0x69, 0x73, 0x68, 0x65, 0x64, 0x32,
	0xcb, 0x04, 0x0a, 0x10, 0x47, 0x61, 0x6d, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x53, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x12, 0x6a, 0x0a, 0x13, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x42, 0x72,
	0x6f, 0x61, 0x64, 0x63, 0x61, 0x73, 0x74, 0x47, 0x61, 0x6d, 0x65, 0x12, 0x28, 0x2e, 0x67, 0x61,
	0x6d, 0x65, 0x5f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e, 0x43, 0x72, 0x65, 0x61, 0x74,
	0x65, 0x42, 0x72, 0x6f, 0x61, 0x64, 0x63, 0x61, 0x73, 0x74, 0x47, 0x61, 0x6d, 0x65, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x29, 0x2e, 0x67, 0x61, 0x6d, 0x65, 0x5f, 0x73, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x2e, 0x43, 0x72, 0x65, 0x61, 0x74, 0x65, 0x42, 0x72, 0x6f, 0x61, 0x64,
	0x63, 0x61, 0x73, 0x74, 0x47, 0x61, 0x6d, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65,
	0x12, 0x4a, 0x0a, 0x0d, 0x53, 0x65, 0x6e, 0x64, 0x47, 0x61, 0x6d, 0x65, 0x45, 0x76, 0x65, 0x6e,
	0x74, 0x12, 0x18, 0x2e, 0x69, 0x70, 0x63, 0x2e, 0x43, 0x6c, 0x69, 0x65, 0x6e, 0x74, 0x47, 0x61,
	0x6d, 0x65, 0x70, 0x6c, 0x61, 0x79, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x1a, 0x1f, 0x2e, 0x67, 0x61,
	0x6d, 0x65, 0x5f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e, 0x47, 0x61, 0x6d, 0x65, 0x45,
	0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x57, 0x0a, 0x14,
	0x53, 0x65, 0x6e, 0x64, 0x54, 0x69, 0x6d, 0x65, 0x50, 0x65, 0x6e, 0x61, 0x6c, 0x74, 0x79, 0x45,
	0x76, 0x65, 0x6e, 0x74, 0x12, 0x1e, 0x2e, 0x67, 0x61, 0x6d, 0x65, 0x5f, 0x73, 0x65, 0x72, 0x76,
	0x69, 0x63, 0x65, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x50, 0x65, 0x6e, 0x61, 0x6c, 0x74, 0x79, 0x45,
	0x76, 0x65, 0x6e, 0x74, 0x1a, 0x1f, 0x2e, 0x67, 0x61, 0x6d, 0x65, 0x5f, 0x73, 0x65, 0x72, 0x76,
	0x69, 0x63, 0x65, 0x2e, 0x47, 0x61, 0x6d, 0x65, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x63, 0x0a, 0x17, 0x53, 0x65, 0x6e, 0x64, 0x43, 0x68, 0x61,
	0x6c, 0x6c, 0x65, 0x6e, 0x67, 0x65, 0x42, 0x6f, 0x6e, 0x75, 0x73, 0x45, 0x76, 0x65, 0x6e, 0x74,
	0x12, 0x27, 0x2e, 0x67, 0x61, 0x6d, 0x65, 0x5f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e,
	0x43, 0x68, 0x61, 0x6c, 0x6c, 0x65, 0x6e, 0x67, 0x65, 0x42, 0x6f, 0x6e, 0x75, 0x73, 0x50, 0x6f,
	0x69, 0x6e, 0x74, 0x73, 0x45, 0x76, 0x65, 0x6e, 0x74, 0x1a, 0x1f, 0x2e, 0x67, 0x61, 0x6d, 0x65,
	0x5f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e, 0x47, 0x61, 0x6d, 0x65, 0x45, 0x76, 0x65,
	0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x5e, 0x0a, 0x17, 0x53, 0x65,
	0x74, 0x42, 0x72, 0x6f, 0x61, 0x64, 0x63, 0x61, 0x73, 0x74, 0x47, 0x61, 0x6d, 0x65, 0x50, 0x72,
	0x69, 0x76, 0x61, 0x63, 0x79, 0x12, 0x22, 0x2e, 0x67, 0x61, 0x6d, 0x65, 0x5f, 0x73, 0x65, 0x72,
	0x76, 0x69, 0x63, 0x65, 0x2e, 0x42, 0x72, 0x6f, 0x61, 0x64, 0x63, 0x61, 0x73, 0x74, 0x47, 0x61,
	0x6d, 0x65, 0x50, 0x72, 0x69, 0x76, 0x61, 0x63, 0x79, 0x1a, 0x1f, 0x2e, 0x67, 0x61, 0x6d, 0x65,
	0x5f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e, 0x47, 0x61, 0x6d, 0x65, 0x45, 0x76, 0x65,
	0x6e, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x61, 0x0a, 0x11, 0x47, 0x65,
	0x74, 0x47, 0x61, 0x6d, 0x65, 0x73, 0x46, 0x6f, 0x72, 0x45, 0x64, 0x69, 0x74, 0x6f, 0x72, 0x12,
	0x26, 0x2e, 0x67, 0x61, 0x6d, 0x65, 0x5f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e, 0x47,
	0x65, 0x74, 0x47, 0x61, 0x6d, 0x65, 0x73, 0x46, 0x6f, 0x72, 0x45, 0x64, 0x69, 0x74, 0x6f, 0x72,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x24, 0x2e, 0x67, 0x61, 0x6d, 0x65, 0x5f, 0x73,
	0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x2e, 0x42, 0x72, 0x6f, 0x61, 0x64, 0x63, 0x61, 0x73, 0x74,
	0x47, 0x61, 0x6d, 0x65, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x42, 0x3c, 0x5a,
	0x3a, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x64, 0x6f, 0x6d, 0x69,
	0x6e, 0x6f, 0x31, 0x34, 0x2f, 0x6c, 0x69, 0x77, 0x6f, 0x72, 0x64, 0x73, 0x2f, 0x72, 0x70, 0x63,
	0x2f, 0x61, 0x70, 0x69, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x6f, 0x6d, 0x67, 0x77, 0x6f,
	0x72, 0x64, 0x73, 0x5f, 0x73, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x62, 0x06, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x33,
}

var (
	file_omgwords_service_omgwords_proto_rawDescOnce sync.Once
	file_omgwords_service_omgwords_proto_rawDescData = file_omgwords_service_omgwords_proto_rawDesc
)

func file_omgwords_service_omgwords_proto_rawDescGZIP() []byte {
	file_omgwords_service_omgwords_proto_rawDescOnce.Do(func() {
		file_omgwords_service_omgwords_proto_rawDescData = protoimpl.X.CompressGZIP(file_omgwords_service_omgwords_proto_rawDescData)
	})
	return file_omgwords_service_omgwords_proto_rawDescData
}

var file_omgwords_service_omgwords_proto_msgTypes = make([]protoimpl.MessageInfo, 10)
var file_omgwords_service_omgwords_proto_goTypes = []interface{}{
	(*GameEventResponse)(nil),                     // 0: game_service.GameEventResponse
	(*TimePenaltyEvent)(nil),                      // 1: game_service.TimePenaltyEvent
	(*ChallengeBonusPointsEvent)(nil),             // 2: game_service.ChallengeBonusPointsEvent
	(*CreateBroadcastGameRequest)(nil),            // 3: game_service.CreateBroadcastGameRequest
	(*CreateBroadcastGameResponse)(nil),           // 4: game_service.CreateBroadcastGameResponse
	(*BroadcastGamePrivacy)(nil),                  // 5: game_service.BroadcastGamePrivacy
	(*GetGamesForEditorRequest)(nil),              // 6: game_service.GetGamesForEditorRequest
	(*BroadcastGamesResponse)(nil),                // 7: game_service.BroadcastGamesResponse
	(*CreateBroadcastGameRequest_PlayerInfo)(nil), // 8: game_service.CreateBroadcastGameRequest.PlayerInfo
	(*BroadcastGamesResponse_BroadcastGame)(nil),  // 9: game_service.BroadcastGamesResponse.BroadcastGame
	(*ipc.GameRules)(nil),                         // 10: ipc.GameRules
	(ipc.ChallengeRule)(0),                        // 11: ipc.ChallengeRule
	(*ipc.ClientGameplayEvent)(nil),               // 12: ipc.ClientGameplayEvent
}
var file_omgwords_service_omgwords_proto_depIdxs = []int32{
	8,  // 0: game_service.CreateBroadcastGameRequest.playersInfo:type_name -> game_service.CreateBroadcastGameRequest.PlayerInfo
	10, // 1: game_service.CreateBroadcastGameRequest.rules:type_name -> ipc.GameRules
	11, // 2: game_service.CreateBroadcastGameRequest.challenge_rule:type_name -> ipc.ChallengeRule
	9,  // 3: game_service.BroadcastGamesResponse.games:type_name -> game_service.BroadcastGamesResponse.BroadcastGame
	3,  // 4: game_service.GameEventService.CreateBroadcastGame:input_type -> game_service.CreateBroadcastGameRequest
	12, // 5: game_service.GameEventService.SendGameEvent:input_type -> ipc.ClientGameplayEvent
	1,  // 6: game_service.GameEventService.SendTimePenaltyEvent:input_type -> game_service.TimePenaltyEvent
	2,  // 7: game_service.GameEventService.SendChallengeBonusEvent:input_type -> game_service.ChallengeBonusPointsEvent
	5,  // 8: game_service.GameEventService.SetBroadcastGamePrivacy:input_type -> game_service.BroadcastGamePrivacy
	6,  // 9: game_service.GameEventService.GetGamesForEditor:input_type -> game_service.GetGamesForEditorRequest
	4,  // 10: game_service.GameEventService.CreateBroadcastGame:output_type -> game_service.CreateBroadcastGameResponse
	0,  // 11: game_service.GameEventService.SendGameEvent:output_type -> game_service.GameEventResponse
	0,  // 12: game_service.GameEventService.SendTimePenaltyEvent:output_type -> game_service.GameEventResponse
	0,  // 13: game_service.GameEventService.SendChallengeBonusEvent:output_type -> game_service.GameEventResponse
	0,  // 14: game_service.GameEventService.SetBroadcastGamePrivacy:output_type -> game_service.GameEventResponse
	7,  // 15: game_service.GameEventService.GetGamesForEditor:output_type -> game_service.BroadcastGamesResponse
	10, // [10:16] is the sub-list for method output_type
	4,  // [4:10] is the sub-list for method input_type
	4,  // [4:4] is the sub-list for extension type_name
	4,  // [4:4] is the sub-list for extension extendee
	0,  // [0:4] is the sub-list for field type_name
}

func init() { file_omgwords_service_omgwords_proto_init() }
func file_omgwords_service_omgwords_proto_init() {
	if File_omgwords_service_omgwords_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_omgwords_service_omgwords_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GameEventResponse); i {
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
		file_omgwords_service_omgwords_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*TimePenaltyEvent); i {
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
		file_omgwords_service_omgwords_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ChallengeBonusPointsEvent); i {
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
		file_omgwords_service_omgwords_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CreateBroadcastGameRequest); i {
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
		file_omgwords_service_omgwords_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CreateBroadcastGameResponse); i {
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
		file_omgwords_service_omgwords_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*BroadcastGamePrivacy); i {
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
		file_omgwords_service_omgwords_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetGamesForEditorRequest); i {
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
		file_omgwords_service_omgwords_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*BroadcastGamesResponse); i {
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
		file_omgwords_service_omgwords_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*CreateBroadcastGameRequest_PlayerInfo); i {
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
		file_omgwords_service_omgwords_proto_msgTypes[9].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*BroadcastGamesResponse_BroadcastGame); i {
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
			RawDescriptor: file_omgwords_service_omgwords_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   10,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_omgwords_service_omgwords_proto_goTypes,
		DependencyIndexes: file_omgwords_service_omgwords_proto_depIdxs,
		MessageInfos:      file_omgwords_service_omgwords_proto_msgTypes,
	}.Build()
	File_omgwords_service_omgwords_proto = out.File
	file_omgwords_service_omgwords_proto_rawDesc = nil
	file_omgwords_service_omgwords_proto_goTypes = nil
	file_omgwords_service_omgwords_proto_depIdxs = nil
}
