/// <reference types="node" />
import { Socket } from "socket.io";
import { RedisClient } from "redis";
import { Cache } from "./cache";
import { Server } from "http";
import Root from "../base/Root";
import Knex from "knex";
import { IRegisterRequest, IOwnedSearchRegisterRequest, IParentedSearchRegisterRequest, IIdentifyRequest, IFeedbackRequest, IParentedSearchFeedbackRequest, IOwnedSearchFeedbackRequest, IUnregisterRequest, IOwnedSearchUnregisterRequest, IParentedSearchUnregisterRequest, IOwnedSearchRecordsAddedEvent, IParentedSearchRecordsAddedEvent, IChangedFeedbackEvent } from "../base/remote-protocol";
export declare class Listener {
    private listeners;
    private redisSub;
    private redisPub;
    private buildnumber;
    private root;
    private knex;
    private cache;
    constructor(buildnumber: string, redisSub: RedisClient, redisPub: RedisClient, root: Root, cache: Cache, knex: Knex, server: Server);
    addSocket(socket: Socket): void;
    identify(socket: Socket, request: IIdentifyRequest): void;
    register(socket: Socket, request: IRegisterRequest): void;
    ownedSearchRegister(socket: Socket, request: IOwnedSearchRegisterRequest): void;
    parentedSearchRegister(socket: Socket, request: IParentedSearchRegisterRequest): void;
    ownedSearchFeedback(socket: Socket, request: IOwnedSearchFeedbackRequest): Promise<void>;
    parentedSearchFeedback(socket: Socket, request: IParentedSearchFeedbackRequest): Promise<void>;
    feedback(socket: Socket, request: IFeedbackRequest): Promise<void>;
    removeListener(socket: Socket, mergedIndexIdentifier: string): void;
    unregister(socket: Socket, request: IUnregisterRequest): void;
    ownedSearchUnregister(socket: Socket, request: IOwnedSearchUnregisterRequest): void;
    parentedSearchUnregister(socket: Socket, request: IParentedSearchUnregisterRequest): void;
    triggerListeners(event: IChangedFeedbackEvent, listenerUUID: string): void;
    triggerOwnedSearchListeners(event: IOwnedSearchRecordsAddedEvent, listenerUUID: string): void;
    triggerParentedSearchListeners(event: IParentedSearchRecordsAddedEvent, listenerUUID: string): void;
    pubSubTriggerListeners(channel: string, message: string): void;
    removeSocket(socket: Socket): void;
}