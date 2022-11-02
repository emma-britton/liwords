// @generated by protoc-gen-es v0.2.1
// @generated from file api/proto/ipc/errors.proto (package ipc, syntax proto3)
/* eslint-disable */
/* @ts-nocheck */

import {proto3} from "@bufbuild/protobuf";

/**
 * @generated from enum ipc.WooglesError
 */
export const WooglesError = proto3.makeEnum(
  "ipc.WooglesError",
  [
    {no: 0, name: "DEFAULT"},
    {no: 1001, name: "TOURNAMENT_NEGATIVE_MAX_BYE_PLACEMENT"},
    {no: 1002, name: "TOURNAMENT_NEGATIVE_MIN_PLACEMENT"},
    {no: 1003, name: "TOURNAMENT_NEGATIVE_GIBSON_SPREAD"},
    {no: 1004, name: "TOURNAMENT_EMPTY_ROUND_CONTROLS"},
    {no: 1005, name: "TOURNAMENT_SET_ROUND_CONTROLS_AFTER_START"},
    {no: 1006, name: "TOURNAMENT_ELIMINATION_PAIRINGS_MIX"},
    {no: 1007, name: "TOURNAMENT_DISCONTINUOUS_INITIAL_FONTES"},
    {no: 1008, name: "TOURNAMENT_INVALID_INITIAL_FONTES_ROUNDS"},
    {no: 1009, name: "TOURNAMENT_INVALID_ELIMINATION_PLAYERS"},
    {no: 1010, name: "TOURNAMENT_ROUND_NUMBER_OUT_OF_RANGE"},
    {no: 1011, name: "TOURNAMENT_NONEXISTENT_PLAYER"},
    {no: 1012, name: "TOURNAMENT_NONAMENDMENT_PAST_RESULT"},
    {no: 1013, name: "TOURNAMENT_FUTURE_NONBYE_RESULT"},
    {no: 1014, name: "TOURNAMENT_NIL_PLAYER_PAIRING"},
    {no: 1015, name: "TOURNAMENT_NONOPPONENTS"},
    {no: 1016, name: "TOURNAMENT_MIXED_VOID_AND_NONVOID_RESULTS"},
    {no: 1017, name: "TOURNAMENT_NONEXISTENT_PAIRING"},
    {no: 1018, name: "TOURNAMENT_UNINITIALIZED_GAMES"},
    {no: 1019, name: "TOURNAMENT_TIEBREAK_INVALID_GAME_INDEX"},
    {no: 1020, name: "TOURNAMENT_GAME_INDEX_OUT_OF_RANGE"},
    {no: 1021, name: "TOURNAMENT_RESULT_ALREADY_SUBMITTED"},
    {no: 1022, name: "TOURNAMENT_NONEXISTENT_RESULT_AMENDMENT"},
    {no: 1023, name: "TOURNAMENT_GIBSON_CAN_CATCH"},
    {no: 1024, name: "TOURNAMENT_CANNOT_ASSIGN_BYE"},
    {no: 1025, name: "TOURNAMENT_INTERNAL_BYE_ASSIGNMENT"},
    {no: 1026, name: "TOURNAMENT_INCORRECT_PAIRINGS_LENGTH"},
    {no: 1027, name: "TOURNAMENT_PAIRINGS_ASSIGNED_BYE"},
    {no: 1028, name: "TOURNAMENT_SUSPENDED_PLAYER_UNREMOVED"},
    {no: 1029, name: "TOURNAMENT_PAIRING_INDEX_OUT_OF_RANGE"},
    {no: 1030, name: "TOURNAMENT_SUSPENDED_PLAYER_PAIRED"},
    {no: 1031, name: "TOURNAMENT_PLAYER_NOT_PAIRED"},
    {no: 1032, name: "TOURNAMENT_PLAYER_ALREADY_EXISTS"},
    {no: 1033, name: "TOURNAMENT_ADD_PLAYERS_LAST_ROUND"},
    {no: 1034, name: "TOURNAMENT_PLAYER_INDEX_OUT_OF_RANGE"},
    {no: 1035, name: "TOURNAMENT_PLAYER_ALREADY_REMOVED"},
    {no: 1036, name: "TOURNAMENT_REMOVAL_CREATES_EMPTY_DIVISION"},
    {no: 1037, name: "TOURNAMENT_NEGATIVE_GIBSON_ROUND"},
    {no: 1038, name: "TOURNAMENT_ROUND_NOT_COMPLETE"},
    {no: 1039, name: "TOURNAMENT_FINISHED"},
    {no: 1040, name: "TOURNAMENT_NOT_STARTABLE"},
    {no: 1041, name: "TOURNAMENT_ROUND_NOT_READY"},
    {no: 1042, name: "TOURNAMENT_SET_GAME_ROUND_NUMBER"},
    {no: 1043, name: "TOURNAMENT_ALREADY_READY"},
    {no: 1044, name: "TOURNAMENT_SET_READY_MULTIPLE_IDS"},
    {no: 1045, name: "TOURNAMENT_SET_READY_PLAYER_NOT_FOUND"},
    {no: 1046, name: "TOURNAMENT_NO_LOSER"},
    {no: 1047, name: "TOURNAMENT_NO_WINNER"},
    {no: 1048, name: "TOURNAMENT_UNPAIRED_PLAYER"},
    {no: 1049, name: "TOURNAMENT_INVALID_PAIRING"},
    {no: 1050, name: "TOURNAMENT_INVALID_SWISS"},
    {no: 1051, name: "TOURNAMENT_ZERO_GAMES_PER_ROUND"},
    {no: 1052, name: "TOURNAMENT_EMPTY_NAME"},
    {no: 1053, name: "TOURNAMENT_NOT_STARTED"},
    {no: 1054, name: "TOURNAMENT_NONEXISTENT_DIVISION"},
    {no: 1055, name: "TOURNAMENT_NIL_DIVISION_MANAGER"},
    {no: 1056, name: "TOURNAMENT_SET_NON_FUTURE_ROUND_CONTROLS"},
    {no: 1057, name: "TOURNAMENT_ADD_DIVISION_AFTER_START"},
    {no: 1058, name: "TOURNAMENT_INVALID_DIVISION_NAME"},
    {no: 1059, name: "TOURNAMENT_DIVISION_ALREADY_EXISTS"},
    {no: 1060, name: "TOURNAMENT_DIVISION_REMOVAL_AFTER_START"},
    {no: 1061, name: "TOURNAMENT_DIVISION_REMOVAL_EXISTING_PLAYERS"},
    {no: 1062, name: "TOURNAMENT_PLAYER_ID_CONSTRUCTION"},
    {no: 1063, name: "TOURNAMENT_EXECUTIVE_DIRECTOR_EXISTS"},
    {no: 1064, name: "TOURNAMENT_DIRECTOR_EXISTS"},
    {no: 1065, name: "TOURNAMENT_NO_DIVISIONS"},
    {no: 1066, name: "TOURNAMENT_GAME_CONTROLS_NOT_SET"},
    {no: 1067, name: "TOURNAMENT_INCORRECT_START_ROUND"},
    {no: 1068, name: "TOURNAMENT_PAIR_NON_FUTURE_ROUND"},
    {no: 1069, name: "TOURNAMENT_DELETE_NON_FUTURE_ROUND"},
    {no: 1070, name: "TOURNAMENT_DIVISION_NOT_FINISHED"},
    {no: 1071, name: "TOURNAMENT_NOT_EXACTLY_ONE_EXECUTIVE_DIRECTOR"},
    {no: 1072, name: "TOURNAMENT_EXECUTIVE_DIRECTOR_REMOVAL"},
    {no: 1073, name: "TOURNAMENT_INVALID_FUTURE_RESULT"},
    {no: 1074, name: "PUZZLE_VOTE_INVALID"},
    {no: 1075, name: "PUZZLE_GET_RANDOM_PUZZLE_ID_NOT_FOUND"},
    {no: 1076, name: "PUZZLE_GET_RANDOM_PUZZLE_NOT_FOUND"},
    {no: 1077, name: "PUZZLE_GET_PUZZLE_UUID_NOT_FOUND"},
    {no: 1078, name: "PUZZLE_GET_PREVIOUS_PUZZLE_NO_ATTEMPTS"},
    {no: 1079, name: "PUZZLE_GET_PREVIOUS_PUZZLE_ATTEMPT_NOT_FOUND"},
    {no: 1080, name: "PUZZLE_GET_ANSWER_PUZZLE_UUID_NOT_FOUND"},
    {no: 1081, name: "PUZZLE_SUBMIT_ANSWER_PUZZLE_ID_NOT_FOUND"},
    {no: 1082, name: "PUZZLE_SUBMIT_ANSWER_SET_CORRECT"},
    {no: 1083, name: "PUZZLE_SUBMIT_ANSWER_SET_ATTEMPTS"},
    {no: 1084, name: "PUZZLE_SET_PUZZLE_VOTE_ID_NOT_FOUND"},
    {no: 1085, name: "PUZZLE_SUBMIT_ANSWER_PUZZLE_ATTEMPT_NOT_FOUND"},
    {no: 1086, name: "PUZZLE_GET_PUZZLE_UPDATE_ATTEMPT"},
    {no: 1087, name: "PUZZLE_GET_ANSWER_NOT_YET_RATED"},
    {no: 1088, name: "USER_UPDATE_NOT_FOUND"},
  ],
);

/**
 * @generated from message ipc.ErrorMessage
 */
export const ErrorMessage = proto3.makeMessageType(
  "ipc.ErrorMessage",
  () => [
    { no: 1, name: "message", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ],
);

