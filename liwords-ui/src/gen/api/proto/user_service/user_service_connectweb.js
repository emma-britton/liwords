// @generated by protoc-gen-connect-web v0.3.1
// @generated from file api/proto/user_service/user_service.proto (package user_service, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {ActiveChatChannels, AddBlockRequest, AddFollowRequest, BriefProfilesRequest, BriefProfilesResponse, ChangePasswordRequest, ChangePasswordResponse, GetActiveChatChannelsRequest, GetBlocksRequest, GetBlocksResponse, GetChatsRequest, GetFollowsRequest, GetFollowsResponse, GetFullBlocksRequest, GetFullBlocksResponse, GetModListRequest, GetModListResponse, GetSignedCookieRequest, InstallSignedCookieResponse, LoginResponse, LogoutResponse, NotifyAccountClosureRequest, NotifyAccountClosureResponse, OKResponse, PersonalInfoRequest, PersonalInfoResponse, ProfileRequest, ProfileResponse, RatingsRequest, RatingsResponse, RegistrationResponse, RemoveAvatarRequest, RemoveAvatarResponse, RemoveBlockRequest, RemoveFollowRequest, ResetPasswordRequestStep1, ResetPasswordRequestStep2, ResetPasswordResponse, SignedCookieResponse, SocketTokenRequest, SocketTokenResponse, StatsRequest, StatsResponse, UpdateAvatarRequest, UpdateAvatarResponse, UpdatePersonalInfoRequest, UpdatePersonalInfoResponse, UserLoginRequest, UserLogoutRequest, UsernameSearchRequest, UsernameSearchResponse, UserRegistrationRequest} from "./user_service_pb.js";
import {MethodKind} from "@bufbuild/protobuf";
import {ChatMessages} from "../ipc/chat_pb.js";

/**
 * @generated from service user_service.AuthenticationService
 */
export const AuthenticationService = {
  typeName: "user_service.AuthenticationService",
  methods: {
    /**
     * @generated from rpc user_service.AuthenticationService.Login
     */
    login: {
      name: "Login",
      I: UserLoginRequest,
      O: LoginResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.AuthenticationService.Logout
     */
    logout: {
      name: "Logout",
      I: UserLogoutRequest,
      O: LogoutResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.AuthenticationService.GetSocketToken
     */
    getSocketToken: {
      name: "GetSocketToken",
      I: SocketTokenRequest,
      O: SocketTokenResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.AuthenticationService.ResetPasswordStep1
     */
    resetPasswordStep1: {
      name: "ResetPasswordStep1",
      I: ResetPasswordRequestStep1,
      O: ResetPasswordResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.AuthenticationService.ResetPasswordStep2
     */
    resetPasswordStep2: {
      name: "ResetPasswordStep2",
      I: ResetPasswordRequestStep2,
      O: ResetPasswordResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.AuthenticationService.ChangePassword
     */
    changePassword: {
      name: "ChangePassword",
      I: ChangePasswordRequest,
      O: ChangePasswordResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.AuthenticationService.NotifyAccountClosure
     */
    notifyAccountClosure: {
      name: "NotifyAccountClosure",
      I: NotifyAccountClosureRequest,
      O: NotifyAccountClosureResponse,
      kind: MethodKind.Unary,
    },
    /**
     * These two temporary endpoints for migrating everyone to naked domain:
     *
     * @generated from rpc user_service.AuthenticationService.GetSignedCookie
     */
    getSignedCookie: {
      name: "GetSignedCookie",
      I: GetSignedCookieRequest,
      O: SignedCookieResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.AuthenticationService.InstallSignedCookie
     */
    installSignedCookie: {
      name: "InstallSignedCookie",
      I: SignedCookieResponse,
      O: InstallSignedCookieResponse,
      kind: MethodKind.Unary,
    },
  }
};

/**
 * @generated from service user_service.RegistrationService
 */
export const RegistrationService = {
  typeName: "user_service.RegistrationService",
  methods: {
    /**
     * @generated from rpc user_service.RegistrationService.Register
     */
    register: {
      name: "Register",
      I: UserRegistrationRequest,
      O: RegistrationResponse,
      kind: MethodKind.Unary,
    },
  }
};

/**
 * @generated from service user_service.ProfileService
 */
export const ProfileService = {
  typeName: "user_service.ProfileService",
  methods: {
    /**
     * @generated from rpc user_service.ProfileService.GetRatings
     */
    getRatings: {
      name: "GetRatings",
      I: RatingsRequest,
      O: RatingsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.ProfileService.GetStats
     */
    getStats: {
      name: "GetStats",
      I: StatsRequest,
      O: StatsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.ProfileService.GetProfile
     */
    getProfile: {
      name: "GetProfile",
      I: ProfileRequest,
      O: ProfileResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.ProfileService.GetPersonalInfo
     */
    getPersonalInfo: {
      name: "GetPersonalInfo",
      I: PersonalInfoRequest,
      O: PersonalInfoResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.ProfileService.UpdatePersonalInfo
     */
    updatePersonalInfo: {
      name: "UpdatePersonalInfo",
      I: UpdatePersonalInfoRequest,
      O: UpdatePersonalInfoResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.ProfileService.UpdateAvatar
     */
    updateAvatar: {
      name: "UpdateAvatar",
      I: UpdateAvatarRequest,
      O: UpdateAvatarResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.ProfileService.RemoveAvatar
     */
    removeAvatar: {
      name: "RemoveAvatar",
      I: RemoveAvatarRequest,
      O: RemoveAvatarResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.ProfileService.GetBriefProfiles
     */
    getBriefProfiles: {
      name: "GetBriefProfiles",
      I: BriefProfilesRequest,
      O: BriefProfilesResponse,
      kind: MethodKind.Unary,
    },
  }
};

/**
 * @generated from service user_service.AutocompleteService
 */
export const AutocompleteService = {
  typeName: "user_service.AutocompleteService",
  methods: {
    /**
     * @generated from rpc user_service.AutocompleteService.GetCompletion
     */
    getCompletion: {
      name: "GetCompletion",
      I: UsernameSearchRequest,
      O: UsernameSearchResponse,
      kind: MethodKind.Unary,
    },
  }
};

/**
 * Yeah I know
 *
 * @generated from service user_service.SocializeService
 */
export const SocializeService = {
  typeName: "user_service.SocializeService",
  methods: {
    /**
     * @generated from rpc user_service.SocializeService.AddFollow
     */
    addFollow: {
      name: "AddFollow",
      I: AddFollowRequest,
      O: OKResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.SocializeService.RemoveFollow
     */
    removeFollow: {
      name: "RemoveFollow",
      I: RemoveFollowRequest,
      O: OKResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.SocializeService.GetFollows
     */
    getFollows: {
      name: "GetFollows",
      I: GetFollowsRequest,
      O: GetFollowsResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.SocializeService.AddBlock
     */
    addBlock: {
      name: "AddBlock",
      I: AddBlockRequest,
      O: OKResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.SocializeService.RemoveBlock
     */
    removeBlock: {
      name: "RemoveBlock",
      I: RemoveBlockRequest,
      O: OKResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.SocializeService.GetBlocks
     */
    getBlocks: {
      name: "GetBlocks",
      I: GetBlocksRequest,
      O: GetBlocksResponse,
      kind: MethodKind.Unary,
    },
    /**
     * GetFullBlocks gets players who blocked us AND players we've blocked
     * together.
     *
     * @generated from rpc user_service.SocializeService.GetFullBlocks
     */
    getFullBlocks: {
      name: "GetFullBlocks",
      I: GetFullBlocksRequest,
      O: GetFullBlocksResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.SocializeService.GetActiveChatChannels
     */
    getActiveChatChannels: {
      name: "GetActiveChatChannels",
      I: GetActiveChatChannelsRequest,
      O: ActiveChatChannels,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.SocializeService.GetChatsForChannel
     */
    getChatsForChannel: {
      name: "GetChatsForChannel",
      I: GetChatsRequest,
      O: ChatMessages,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc user_service.SocializeService.GetModList
     */
    getModList: {
      name: "GetModList",
      I: GetModListRequest,
      O: GetModListResponse,
      kind: MethodKind.Unary,
    },
  }
};

