/// <reference types="node" />
import { Socket } from "socket.io";
import { ISQLTableRowValue } from "../base/Root/sql";
import { RedisClient } from "redis";
import { Cache } from "./cache";
import { Server } from "http";
import Root from "../base/Root";
import Knex from "knex";
import { IRegisterRequest, IOwnedSearchRegisterRequest, IParentedSearchRegisterRequest, IIdentifyRequest, IFeedbackRequest, IParentedSearchFeedbackRequest, IOwnedSearchFeedbackRequest, IUnregisterRequest, IOwnedSearchUnregisterRequest, IParentedSearchUnregisterRequest, IOwnedSearchRecordsAddedEvent, IParentedSearchRecordsAddedEvent, IChangedFeedbackEvent } from "../base/remote-protocol";
import { ISensitiveConfigRawJSONDataType } from "../config";
export declare class Listener {
    private io;
    private listeners;
    private listensSS;
    private redisGlobalSub;
    private redisGlobalPub;
    private redisLocalSub;
    private redisLocalPub;
    private buildnumber;
    private root;
    private knex;
    private cache;
    private sensitiveConfig;
    constructor(buildnumber: string, redisGlobalSub: RedisClient, redisGlobalPub: RedisClient, redisLocalSub: RedisClient, redisLocalPub: RedisClient, root: Root, cache: Cache, knex: Knex, server: Server, sensitiveConfig: ISensitiveConfigRawJSONDataType);
    addSocket(socket: Socket): void;
    emitError(socket: Socket, message: string, request: any): void;
    sendKickEvent(userId: number): void;
    onReceiveKickEvent(userId: number): void;
    kick(socket: Socket): void;
    identify(socket: Socket, request: IIdentifyRequest): Promise<void>;
    registerSS(request: IRegisterRequest): void;
    register(socket: Socket, request: IRegisterRequest): Promise<void>;
    ownedSearchRegister(socket: Socket, request: IOwnedSearchRegisterRequest): void;
    parentedSearchRegister(socket: Socket, request: IParentedSearchRegisterRequest): void;
    ownedSearchFeedback(socket: Socket, request: IOwnedSearchFeedbackRequest): Promise<void>;
    parentedSearchFeedback(socket: Socket, request: IParentedSearchFeedbackRequest): Promise<void>;
    feedback(socket: Socket, request: IFeedbackRequest): Promise<void>;
    removeListenerFinal(mergedIndexIdentifier: string): void;
    removeListener(socket: Socket, mergedIndexIdentifier: string): void;
    /**
     * This method only reasonable gets called by the CLUSTER_MANAGER or in absolute mode
     * @param request
     */
    unregisterSS(request: IUnregisterRequest): void;
    unregister(socket: Socket, request: IUnregisterRequest): void;
    ownedSearchUnregister(socket: Socket, request: IOwnedSearchUnregisterRequest): void;
    parentedSearchUnregister(socket: Socket, request: IParentedSearchUnregisterRequest): void;
    triggerChangedListeners(event: IChangedFeedbackEvent, data: ISQLTableRowValue, listenerUUID: string): void;
    triggerOwnedSearchListeners(event: IOwnedSearchRecordsAddedEvent, listenerUUID: string): void;
    triggerParentedSearchListeners(event: IParentedSearchRecordsAddedEvent, listenerUUID: string): void;
    globalRedisListener(channel: string, message: string): Promise<void>;
    localRedisListener(channel: string, message: string): void;
    removeSocket(socket: Socket): void;
    onClusterManagerResetInformed(): void;
    informClusterManagerReset(): void;
}
