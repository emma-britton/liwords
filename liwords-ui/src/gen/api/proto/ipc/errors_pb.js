// source: api/proto/ipc/errors.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() { return this || window || global || self || Function('return this')(); }).call(null);

goog.exportSymbol('proto.ipc.ErrorMessage', null, global);
goog.exportSymbol('proto.ipc.WooglesError', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.ipc.ErrorMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ipc.ErrorMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ipc.ErrorMessage.displayName = 'proto.ipc.ErrorMessage';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ipc.ErrorMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.ipc.ErrorMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ipc.ErrorMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ipc.ErrorMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
    message: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.ipc.ErrorMessage}
 */
proto.ipc.ErrorMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ipc.ErrorMessage;
  return proto.ipc.ErrorMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ipc.ErrorMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ipc.ErrorMessage}
 */
proto.ipc.ErrorMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setMessage(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.ipc.ErrorMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ipc.ErrorMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ipc.ErrorMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ipc.ErrorMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMessage();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string message = 1;
 * @return {string}
 */
proto.ipc.ErrorMessage.prototype.getMessage = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ipc.ErrorMessage} returns this
 */
proto.ipc.ErrorMessage.prototype.setMessage = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * @enum {number}
 */
proto.ipc.WooglesError = {
  DEFAULT: 0,
  TOURNAMENT_NEGATIVE_MAX_BYE_PLACEMENT: 1001,
  TOURNAMENT_NEGATIVE_MIN_PLACEMENT: 1002,
  TOURNAMENT_NEGATIVE_GIBSON_SPREAD: 1003,
  TOURNAMENT_EMPTY_ROUND_CONTROLS: 1004,
  TOURNAMENT_SET_ROUND_CONTROLS_AFTER_START: 1005,
  TOURNAMENT_ELIMINATION_PAIRINGS_MIX: 1006,
  TOURNAMENT_DISCONTINUOUS_INITIAL_FONTES: 1007,
  TOURNAMENT_INVALID_INITIAL_FONTES_ROUNDS: 1008,
  TOURNAMENT_INVALID_ELIMINATION_PLAYERS: 1009,
  TOURNAMENT_ROUND_NUMBER_OUT_OF_RANGE: 1010,
  TOURNAMENT_NONEXISTENT_PLAYER: 1011,
  TOURNAMENT_NONAMENDMENT_PAST_RESULT: 1012,
  TOURNAMENT_FUTURE_NONBYE_RESULT: 1013,
  TOURNAMENT_NIL_PLAYER_PAIRING: 1014,
  TOURNAMENT_NONOPPONENTS: 1015,
  TOURNAMENT_MIXED_VOID_AND_NONVOID_RESULTS: 1016,
  TOURNAMENT_NONEXISTENT_PAIRING: 1017,
  TOURNAMENT_UNINITIALIZED_GAMES: 1018,
  TOURNAMENT_TIEBREAK_INVALID_GAME_INDEX: 1019,
  TOURNAMENT_GAME_INDEX_OUT_OF_RANGE: 1020,
  TOURNAMENT_RESULT_ALREADY_SUBMITTED: 1021,
  TOURNAMENT_NONEXISTENT_RESULT_AMENDMENT: 1022,
  TOURNAMENT_GIBSON_CAN_CATCH: 1023,
  TOURNAMENT_CANNOT_ASSIGN_BYE: 1024,
  TOURNAMENT_INTERNAL_BYE_ASSIGNMENT: 1025,
  TOURNAMENT_INCORRECT_PAIRINGS_LENGTH: 1026,
  TOURNAMENT_PAIRINGS_ASSIGNED_BYE: 1027,
  TOURNAMENT_SUSPENDED_PLAYER_UNREMOVED: 1028,
  TOURNAMENT_PAIRING_INDEX_OUT_OF_RANGE: 1029,
  TOURNAMENT_SUSPENDED_PLAYER_PAIRED: 1030,
  TOURNAMENT_PLAYER_NOT_PAIRED: 1031,
  TOURNAMENT_PLAYER_ALREADY_EXISTS: 1032,
  TOURNAMENT_ADD_PLAYERS_LAST_ROUND: 1033,
  TOURNAMENT_PLAYER_INDEX_OUT_OF_RANGE: 1034,
  TOURNAMENT_PLAYER_ALREADY_REMOVED: 1035,
  TOURNAMENT_REMOVAL_CREATES_EMPTY_DIVISION: 1036,
  TOURNAMENT_NEGATIVE_GIBSON_ROUND: 1037,
  TOURNAMENT_ROUND_NOT_COMPLETE: 1038,
  TOURNAMENT_FINISHED: 1039,
  TOURNAMENT_NOT_STARTABLE: 1040,
  TOURNAMENT_ROUND_NOT_READY: 1041,
  TOURNAMENT_SET_GAME_ROUND_NUMBER: 1042,
  TOURNAMENT_ALREADY_READY: 1043,
  TOURNAMENT_SET_READY_MULTIPLE_IDS: 1044,
  TOURNAMENT_SET_READY_PLAYER_NOT_FOUND: 1045,
  TOURNAMENT_NO_LOSER: 1046,
  TOURNAMENT_NO_WINNER: 1047,
  TOURNAMENT_UNPAIRED_PLAYER: 1048,
  TOURNAMENT_INVALID_PAIRING: 1049,
  TOURNAMENT_INVALID_SWISS: 1050,
  TOURNAMENT_ZERO_GAMES_PER_ROUND: 1051,
  TOURNAMENT_EMPTY_NAME: 1052,
  TOURNAMENT_NOT_STARTED: 1053,
  TOURNAMENT_NONEXISTENT_DIVISION: 1054,
  TOURNAMENT_NIL_DIVISION_MANAGER: 1055,
  TOURNAMENT_SET_NON_FUTURE_ROUND_CONTROLS: 1056,
  TOURNAMENT_ADD_DIVISION_AFTER_START: 1057,
  TOURNAMENT_INVALID_DIVISION_NAME: 1058,
  TOURNAMENT_DIVISION_ALREADY_EXISTS: 1059,
  TOURNAMENT_DIVISION_REMOVAL_AFTER_START: 1060,
  TOURNAMENT_DIVISION_REMOVAL_EXISTING_PLAYERS: 1061,
  TOURNAMENT_PLAYER_ID_CONSTRUCTION: 1062,
  TOURNAMENT_EXECUTIVE_DIRECTOR_EXISTS: 1063,
  TOURNAMENT_DIRECTOR_EXISTS: 1064,
  TOURNAMENT_NO_DIVISIONS: 1065,
  TOURNAMENT_GAME_CONTROLS_NOT_SET: 1066,
  TOURNAMENT_INCORRECT_START_ROUND: 1067,
  TOURNAMENT_PAIR_NON_FUTURE_ROUND: 1068,
  TOURNAMENT_DELETE_NON_FUTURE_ROUND: 1069,
  TOURNAMENT_DIVISION_NOT_FINISHED: 1070,
  TOURNAMENT_NOT_EXACTLY_ONE_EXECUTIVE_DIRECTOR: 1071,
  TOURNAMENT_EXECUTIVE_DIRECTOR_REMOVAL: 1072,
  TOURNAMENT_INVALID_FUTURE_RESULT: 1073,
  PUZZLE_VOTE_INVALID: 1074,
  PUZZLE_GET_RANDOM_PUZZLE_ID_NOT_FOUND: 1075,
  PUZZLE_GET_RANDOM_PUZZLE_NOT_FOUND: 1076,
  PUZZLE_GET_PUZZLE_UUID_NOT_FOUND: 1077,
  PUZZLE_GET_PREVIOUS_PUZZLE_NO_ATTEMPTS: 1078,
  PUZZLE_GET_PREVIOUS_PUZZLE_ATTEMPT_NOT_FOUND: 1079,
  PUZZLE_GET_ANSWER_PUZZLE_UUID_NOT_FOUND: 1080,
  PUZZLE_SUBMIT_ANSWER_PUZZLE_ID_NOT_FOUND: 1081,
  PUZZLE_SUBMIT_ANSWER_SET_CORRECT: 1082,
  PUZZLE_SUBMIT_ANSWER_SET_ATTEMPTS: 1083,
  PUZZLE_SET_PUZZLE_VOTE_ID_NOT_FOUND: 1084,
  PUZZLE_SUBMIT_ANSWER_PUZZLE_ATTEMPT_NOT_FOUND: 1085,
  PUZZLE_GET_PUZZLE_UPDATE_ATTEMPT: 1086,
  PUZZLE_GET_ANSWER_NOT_YET_RATED: 1087,
  USER_UPDATE_NOT_FOUND: 1088
};

goog.object.extend(exports, proto.ipc);
