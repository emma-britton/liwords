// @generated by protoc-gen-connect-web v0.6.0
// @generated from file mod_service/mod_service.proto (package mod_service, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { GetActionsRequest, GetNotorietyReportRequest, ModActionResponse, ModActionsList, ModActionsMap, NotorietyReport, ResetNotorietyRequest, ResetNotorietyResponse } from "./mod_service_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service mod_service.ModService
 */
export const ModService = {
  typeName: "mod_service.ModService",
  methods: {
    /**
     * @generated from rpc mod_service.ModService.ApplyActions
     */
    applyActions: {
      name: "ApplyActions",
      I: ModActionsList,
      O: ModActionResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc mod_service.ModService.RemoveActions
     */
    removeActions: {
      name: "RemoveActions",
      I: ModActionsList,
      O: ModActionResponse,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc mod_service.ModService.GetActions
     */
    getActions: {
      name: "GetActions",
      I: GetActionsRequest,
      O: ModActionsMap,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc mod_service.ModService.GetActionHistory
     */
    getActionHistory: {
      name: "GetActionHistory",
      I: GetActionsRequest,
      O: ModActionsList,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc mod_service.ModService.GetNotorietyReport
     */
    getNotorietyReport: {
      name: "GetNotorietyReport",
      I: GetNotorietyReportRequest,
      O: NotorietyReport,
      kind: MethodKind.Unary,
    },
    /**
     * @generated from rpc mod_service.ModService.ResetNotoriety
     */
    resetNotoriety: {
      name: "ResetNotoriety",
      I: ResetNotorietyRequest,
      O: ResetNotorietyResponse,
      kind: MethodKind.Unary,
    },
  }
};

