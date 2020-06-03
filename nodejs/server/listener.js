"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const ItemDefinition_1 = __importDefault(require("../base/Root/Module/ItemDefinition"));
const remote_protocol_1 = require("../base/remote-protocol");
const version_null_value_1 = require("./version-null-value");
const _1 = require(".");
const constants_1 = require("../constants");
const INSTANCE_MODE = process.env.INSTANCE_MODE || "ABSOLUTE";
const INSTANCE_GROUP_ID = process.env.INSTANCE_GROUP_ID || "UNIDENTIFIED";
const CLUSTER_MANAGER_REGISTER_SS = "CLUSTER_MANAGER_REGISTER_SS";
class Listener {
    constructor(buildnumber, redisSub, redisPub, redisLocalSub, redisLocalPub, root, cache, knex, server) {
        this.listeners = {};
        this.listensSS = {};
        this.redisSub = redisSub;
        this.redisPub = redisPub;
        this.redisLocalSub = redisLocalSub;
        this.redisLocalPub = redisLocalPub;
        this.buildnumber = buildnumber;
        this.root = root;
        this.cache = cache;
        this.knex = knex;
        this.cache.setListener(this);
        this.pubSubTriggerListeners = this.pubSubTriggerListeners.bind(this);
        this.pubSubLocalTriggerListeners = this.pubSubLocalTriggerListeners.bind(this);
        this.redisSub.on("message", this.pubSubTriggerListeners);
        this.redisSub.subscribe(constants_1.SERVER_DATA_IDENTIFIER);
        if (INSTANCE_MODE === "ABSOLUTE" || INSTANCE_MODE === "CLUSTER_MANAGER") {
            this.redisLocalSub.on("message", this.pubSubLocalTriggerListeners);
            this.redisLocalSub.subscribe(CLUSTER_MANAGER_REGISTER_SS);
        }
        if (server === null) {
            return;
        }
        // TODO we should validte the forms of every request, right now requests are not
        // validated
        const io = socket_io_1.default(server);
        io.on("connection", (socket) => {
            this.addSocket(socket);
            socket.on(remote_protocol_1.REGISTER_REQUEST, (request) => {
                this.register(socket, request);
            });
            socket.on(remote_protocol_1.OWNED_SEARCH_REGISTER_REQUEST, (request) => {
                this.ownedSearchRegister(socket, request);
            });
            socket.on(remote_protocol_1.PARENTED_SEARCH_REGISTER_REQUEST, (request) => {
                this.parentedSearchRegister(socket, request);
            });
            socket.on(remote_protocol_1.IDENTIFY_REQUEST, (request) => {
                this.identify(socket, request);
            });
            socket.on(remote_protocol_1.FEEDBACK_REQUEST, (request) => {
                this.feedback(socket, request);
            });
            socket.on(remote_protocol_1.OWNED_SEARCH_FEEDBACK_REQUEST, (request) => {
                this.ownedSearchFeedback(socket, request);
            });
            socket.on(remote_protocol_1.PARENTED_SEARCH_FEEDBACK_REQUEST, (request) => {
                this.parentedSearchFeedback(socket, request);
            });
            socket.on(remote_protocol_1.UNREGISTER_REQUEST, (request) => {
                this.unregister(socket, request);
            });
            socket.on(remote_protocol_1.OWNED_SEARCH_UNREGISTER_REQUEST, (request) => {
                this.ownedSearchUnregister(socket, request);
            });
            socket.on(remote_protocol_1.PARENTED_SEARCH_UNREGISTER_REQUEST, (request) => {
                this.parentedSearchUnregister(socket, request);
            });
            socket.on("disconnect", () => {
                this.removeSocket(socket);
            });
        });
    }
    addSocket(socket) {
        socket.emit(remote_protocol_1.BUILDNUMBER_EVENT, {
            buildnumber: this.buildnumber,
        });
    }
    identify(socket, request) {
        if (!this.listeners[socket.id]) {
            _1.logger.debug("Listener.identify: socket " + socket.id + " provides initial identification");
            this.listeners[socket.id] = {
                socket,
                listens: {},
                uuid: request.uuid,
                token: request.token,
                amount: 0,
            };
        }
        else {
            _1.logger.debug("Listener.identify: socket " + socket.id + " updates identification criteria");
            this.listeners[socket.id].uuid = request.uuid;
            this.listeners[socket.id].token = request.token;
        }
        socket.emit(remote_protocol_1.IDENTIFIED_EVENT);
    }
    registerSS(request) {
        const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
        _1.logger.debug("Listener.registerSS: Server instance requested subscribe to " + mergedIndexIdentifier);
        if (INSTANCE_MODE !== "CLUSTER_MANAGER" && INSTANCE_MODE !== "ABSOLUTE") {
            _1.logger.debug("Listener.registerSS: instance is not cluster manager nor absolute piping request to cluster manager");
            this.redisLocalPub.publish(CLUSTER_MANAGER_REGISTER_SS, JSON.stringify(request));
        }
        else if (INSTANCE_MODE === "CLUSTER_MANAGER" || INSTANCE_MODE === "ABSOLUTE") {
            _1.logger.debug("Listener.registerSS: performing subscription as cluster manager");
            this.redisSub.subscribe(mergedIndexIdentifier);
            this.listensSS[mergedIndexIdentifier] = true;
        }
        else {
            _1.logger.debug("Listener.registerSS: invalid instance attempting a server side registration " + INSTANCE_MODE);
        }
    }
    register(socket, request) {
        // TODO check if token allows to listen before adding
        if (!this.listeners[socket.id]) {
            _1.logger.debug("Listener.register: can't register listener to an unidentified socket " + socket.id);
            return;
        }
        // do not allow more than 500 concurrent listeners
        if (this.listeners[socket.id].amount > 500) {
            _1.logger.debug("Listener.register: socket " + socket.id + " has exceeded the amount of listeners it can attach");
            return;
        }
        const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
        if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
            _1.logger.debug("Listener.register: Subscribing socket " + socket.id + " to " + mergedIndexIdentifier);
            this.redisSub.subscribe(mergedIndexIdentifier);
            this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
            this.listeners[socket.id].amount++;
        }
    }
    ownedSearchRegister(socket, request) {
        // TODO check token allows this user to search within here otherwise giving
        // he will be able to see any new records added
        if (!this.listeners[socket.id]) {
            _1.logger.debug("Listener.ownedSearchRegister: can't register listener to an unidentified socket " + socket.id);
            return;
        }
        // do not allow more than 500 concurrent listeners
        if (this.listeners[socket.id].amount > 500) {
            _1.logger.debug("Listener.ownedSearchRegister: socket " + socket.id + " has exceeded the amount of listeners it can attach");
            return;
        }
        const mergedIndexIdentifier = "OWNED_SEARCH." + request.qualifiedPathName + "." + request.createdBy;
        if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
            _1.logger.debug("Listener.ownedSearchRegister: Subscribing socket " + socket.id + " to " + mergedIndexIdentifier);
            this.redisSub.subscribe(mergedIndexIdentifier);
            this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
            this.listeners[socket.id].amount++;
        }
    }
    parentedSearchRegister(socket, request) {
        // TODO check token allows this user to search within here otherwise giving
        // he will be able to see any new records added
        if (!this.listeners[socket.id]) {
            _1.logger.debug("Listener.parentedSearchRegister: can't register listener to an unidentified socket " + socket.id);
            return;
        }
        // do not allow more than 500 concurrent listeners
        if (this.listeners[socket.id].amount > 500) {
            _1.logger.debug("Listener.parentedSearchRegister: socket " + socket.id + " has exceeded the amount of listeners it can attach");
            return;
        }
        const mergedIndexIdentifier = "PARENTED_SEARCH." + request.qualifiedPathName + "." +
            request.parentType + "." + request.parentId + "." + (request.parentVersion || "");
        if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
            _1.logger.debug("Listener.parentedSearchRegister: Subscribing socket " + socket.id + " to " + mergedIndexIdentifier);
            this.redisSub.subscribe(mergedIndexIdentifier);
            this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
            this.listeners[socket.id].amount++;
        }
    }
    async ownedSearchFeedback(socket, request) {
        try {
            const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
            if (!itemDefinitionOrModule) {
                _1.logger.debug("Listener.ownedSearchFeedback: could not find " + request.qualifiedPathName);
                return;
            }
            let mod;
            let requiredType = null;
            if (itemDefinitionOrModule instanceof ItemDefinition_1.default) {
                mod = itemDefinitionOrModule.getParentModule();
                requiredType = request.qualifiedPathName;
            }
            else {
                mod = itemDefinitionOrModule;
            }
            // TODO check token allows this user to search within here otherwise giving
            // 0 as the lastKnownRecord will run the search, check the search.ts to see
            // how it is done
            const query = this.knex.select(["id", "version", "type", "created_at"]).from(mod.getQualifiedPathName());
            if (requiredType) {
                query.where("type", requiredType);
            }
            query.andWhere("created_by", request.createdBy);
            // the know last record might be null in case of empty searches
            if (request.knownLastRecordDate) {
                query.andWhere("created_at", ">", request.knownLastRecordDate);
            }
            query.orderBy("created_at", "desc");
            const newRecords = (await query).map(version_null_value_1.convertVersionsIntoNullsWhenNecessary);
            if (newRecords.length) {
                const event = {
                    createdBy: request.createdBy,
                    qualifiedPathName: request.qualifiedPathName,
                    newRecords: newRecords,
                    // this contains all the data and the new record has the right form
                    newLastRecordDate: newRecords[0].created_at,
                };
                _1.logger.debug("Listener.ownedSearchFeedback: triggering " + remote_protocol_1.OWNED_SEARCH_RECORDS_ADDED_EVENT, event);
                socket.emit(remote_protocol_1.OWNED_SEARCH_RECORDS_ADDED_EVENT, event);
            }
        }
        catch (err) {
            _1.logger.error("Listener.ownedSearchFeedback: failed to provide feedback", {
                errMessage: err.message,
                errStack: err.stack,
            });
        }
    }
    async parentedSearchFeedback(socket, request) {
        try {
            const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
            if (!itemDefinitionOrModule) {
                _1.logger.debug("Listener.parentedSearchFeedback: could not find " + request.qualifiedPathName);
                return;
            }
            let mod;
            let requiredType = null;
            if (itemDefinitionOrModule instanceof ItemDefinition_1.default) {
                mod = itemDefinitionOrModule.getParentModule();
                requiredType = request.qualifiedPathName;
            }
            else {
                mod = itemDefinitionOrModule;
            }
            // TODO check token allows this user to search within here otherwise giving
            // 0 as the lastKnownRecord will run the search, check the search.ts to see
            // how it is done
            const query = this.knex.select(["id", "version", "type", "created_at"]).from(mod.getQualifiedPathName());
            if (requiredType) {
                query.where("type", requiredType);
            }
            query.andWhere("parent_id", request.parentId);
            query.andWhere("parent_version", request.parentVersion || null);
            query.andWhere("parent_type", request.parentType);
            // the know last record might be null in case of empty searches
            if (request.knownLastRecordDate) {
                query.andWhere("created_at", ">", request.knownLastRecordDate);
            }
            query.orderBy("created_at", "desc");
            const newRecords = (await query).map(version_null_value_1.convertVersionsIntoNullsWhenNecessary);
            if (newRecords.length) {
                const event = {
                    parentId: request.parentId,
                    parentVersion: request.parentVersion,
                    parentType: request.parentType,
                    qualifiedPathName: request.qualifiedPathName,
                    newRecords: newRecords,
                    newLastRecordDate: newRecords[0].created_at,
                };
                _1.logger.debug("Listener.parentedSearchFeedback: emmitting " + remote_protocol_1.PARENTED_SEARCH_RECORDS_ADDED_EVENT, event);
                socket.emit(remote_protocol_1.PARENTED_SEARCH_RECORDS_ADDED_EVENT, event);
            }
        }
        catch (err) {
            _1.logger.error("Listener.parentedSearchFeedback: failed to provide feedback", {
                errMessage: err.message,
                errStack: err.stack,
            });
        }
    }
    async feedback(socket, request) {
        // TODO check token allows for feedback
        try {
            const itemDefinition = this.root.registry[request.itemDefinition];
            if (!itemDefinition || !(itemDefinition instanceof ItemDefinition_1.default)) {
                _1.logger.debug("Listener.feedback: could not find " + request.itemDefinition);
                return;
            }
            const queriedResult = await this.cache.requestValue(itemDefinition, request.id, request.version);
            if (queriedResult) {
                const event = {
                    itemDefinition: request.itemDefinition,
                    id: request.id,
                    version: request.version,
                    type: "last_modified",
                    lastModified: queriedResult.last_modified,
                };
                _1.logger.debug("Listener.feedback: emitting " + remote_protocol_1.CHANGED_FEEEDBACK_EVENT, event);
                socket.emit(remote_protocol_1.CHANGED_FEEEDBACK_EVENT, event);
            }
            else {
                const event = {
                    itemDefinition: request.itemDefinition,
                    id: request.id,
                    version: request.version,
                    type: "not_found",
                    lastModified: null,
                };
                _1.logger.debug("Listener.feedback: emitting " + remote_protocol_1.CHANGED_FEEEDBACK_EVENT, event);
                socket.emit(remote_protocol_1.CHANGED_FEEEDBACK_EVENT, event);
            }
        }
        catch (err) {
            _1.logger.error("Listener.feedback: failed to provide feedback", {
                errMessage: err.message,
                errStack: err.stack,
            });
        }
    }
    removeListenerFinal(mergedIndexIdentifier) {
        const noSocketsListeningLeft = !this.listensSS[mergedIndexIdentifier] && Object.keys(this.listeners).every((socketId) => {
            return !this.listeners[socketId].listens[mergedIndexIdentifier];
        });
        if (noSocketsListeningLeft) {
            _1.logger.debug("Listener.removeListenerFinal: founds no sockets left for " + mergedIndexIdentifier + " plugging off redis");
            this.redisSub.unsubscribe(mergedIndexIdentifier);
        }
    }
    removeListener(socket, mergedIndexIdentifier) {
        if (this.listeners[socket.id].listens[mergedIndexIdentifier]) {
            _1.logger.debug("Listener.removeListener: unsubscribing socket " + socket.id + " from " + mergedIndexIdentifier);
            delete this.listeners[socket.id].listens[mergedIndexIdentifier];
            this.listeners[socket.id].amount--;
            this.removeListenerFinal(mergedIndexIdentifier);
        }
    }
    unregisterSS(request) {
        const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
        if (this.listensSS[mergedIndexIdentifier]) {
            delete this.listensSS[mergedIndexIdentifier];
            this.removeListenerFinal(mergedIndexIdentifier);
        }
    }
    unregister(socket, request) {
        const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
        this.removeListener(socket, mergedIndexIdentifier);
    }
    ownedSearchUnregister(socket, request) {
        const mergedIndexIdentifier = "OWNED_SEARCH." + request.qualifiedPathName + "." + request.createdBy;
        this.removeListener(socket, mergedIndexIdentifier);
    }
    parentedSearchUnregister(socket, request) {
        const mergedIndexIdentifier = "PARENTED_SEARCH." + request.qualifiedPathName + "." + request.parentType +
            "." + request.parentId + "." + (request.parentVersion || "");
        this.removeListener(socket, mergedIndexIdentifier);
    }
    triggerChangedListeners(event, data, listenerUUID) {
        const mergedIndexIdentifier = event.itemDefinition + "." + event.id + "." + (event.version || "");
        const redisEvent = {
            event,
            listenerUUID,
            serverInstanceGroupId: INSTANCE_GROUP_ID,
            mergedIndexIdentifier,
            eventType: remote_protocol_1.CHANGED_FEEEDBACK_EVENT,
            data,
        };
        _1.logger.debug("Listener.triggerChangedListeners: triggering redis event", redisEvent);
        this.redisPub.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    }
    triggerOwnedSearchListeners(event, listenerUUID) {
        const mergedIndexIdentifier = "OWNED_SEARCH." + event.qualifiedPathName + "." + event.createdBy;
        const redisEvent = {
            event,
            listenerUUID,
            mergedIndexIdentifier,
            eventType: remote_protocol_1.OWNED_SEARCH_RECORDS_ADDED_EVENT,
        };
        _1.logger.debug("Listener.triggerOwnedSearchListeners: triggering redis event", redisEvent);
        this.redisPub.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    }
    triggerParentedSearchListeners(event, listenerUUID) {
        const mergedIndexIdentifier = "PARENTED_SEARCH." + event.qualifiedPathName + "." + event.parentType +
            "." + event.parentId + "." + (event.parentVersion || "");
        const redisEvent = {
            event,
            listenerUUID,
            mergedIndexIdentifier,
            eventType: remote_protocol_1.PARENTED_SEARCH_RECORDS_ADDED_EVENT,
        };
        _1.logger.debug("Listener.triggerParentedSearchListeners: triggering redis event", redisEvent);
        this.redisPub.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    }
    pubSubTriggerListeners(channel, message) {
        const parsedContent = JSON.parse(message);
        _1.logger.debug("Listener.pubSubTriggerListeners: received redis event", parsedContent);
        if (channel === constants_1.SERVER_DATA_IDENTIFIER) {
            this.cache.onServerDataChangeInformed(parsedContent);
            return;
        }
        // only the cluster manager and absolute happens to recieve these
        if (this.listensSS[parsedContent.mergedIndexIdentifier]) {
            _1.logger.debug("Listener.pubSubTriggerListeners: our own server is expecting it");
            const serverInstanceGroupId = parsedContent.serverInstanceGroupId;
            if (serverInstanceGroupId === INSTANCE_GROUP_ID) {
                _1.logger.debug("Listener.pubSubTriggerListeners: our own instance group id " + INSTANCE_GROUP_ID + " was the emitter, ignoring event");
            }
            else {
                const event = parsedContent.event;
                if (typeof parsedContent.data === "undefined") {
                    this.cache.onChangeInformedNoData(event.itemDefinition, event.id, event.version || null);
                }
                else {
                    this.cache.onChangeInformed(event.itemDefinition, event.id, event.version || null, parsedContent.data);
                }
            }
        }
        Object.keys(this.listeners).forEach((socketKey) => {
            const whatListening = this.listeners[socketKey].listens;
            if (whatListening[parsedContent.mergedIndexIdentifier] &&
                this.listeners[socketKey].uuid !== parsedContent.listenerUUID) {
                _1.logger.debug("Listener.pubSubTriggerListeners: socket " + socketKey + " was expecting it, emitting");
                this.listeners[socketKey].socket.emit(parsedContent.eventType, parsedContent.event);
            }
        });
    }
    pubSubLocalTriggerListeners(channel, message) {
        const parsedContent = JSON.parse(message);
        _1.logger.debug("Listener.pubSubLocalTriggerListeners: cluster manager recieved register event", parsedContent);
        this.registerSS(parsedContent);
    }
    removeSocket(socket) {
        if (!this.listeners[socket.id]) {
            return;
        }
        _1.logger.debug("Listener.removeSocket: removing socket " + socket.id);
        Object.keys(this.listeners[socket.id].listens).forEach((listensMergedIdentifier) => {
            const noSocketsListeningLeft = !this.listensSS[listensMergedIdentifier] &&
                Object.keys(this.listeners).every((socketId) => {
                    if (socketId === socket.id) {
                        return true;
                    }
                    return !this.listeners[socketId].listens[listensMergedIdentifier];
                });
            if (noSocketsListeningLeft) {
                _1.logger.debug("Listener.removeSocket: redis unsubscribing off " + listensMergedIdentifier);
                this.redisSub.unsubscribe(listensMergedIdentifier);
            }
        });
        delete this.listeners[socket.id];
    }
}
exports.Listener = Listener;
