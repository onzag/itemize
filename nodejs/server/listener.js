"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const ItemDefinition_1 = __importDefault(require("../base/Root/Module/ItemDefinition"));
const remote_protocol_1 = require("../base/remote-protocol");
const version_null_value_1 = require("./version-null-value");
// TODO refactor all these methods to be proper objects, this is a mess of arguments
// do the same in the remote listener in the client side
class Listener {
    constructor(buildnumber, redisSub, redisPub, root, cache, knex, server) {
        this.listeners = {};
        this.redisSub = redisSub;
        this.redisPub = redisPub;
        this.buildnumber = buildnumber;
        this.root = root;
        this.cache = cache;
        this.knex = knex;
        this.pubSubTriggerListeners = this.pubSubTriggerListeners.bind(this);
        this.redisSub.on("message", this.pubSubTriggerListeners);
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
            this.listeners[socket.id] = {
                socket,
                listens: {},
                uuid: request.uuid,
                token: request.token,
                amount: 0,
            };
        }
        else {
            this.listeners[socket.id].uuid = request.uuid;
            this.listeners[socket.id].token = request.token;
        }
        socket.emit(remote_protocol_1.IDENTIFIED_EVENT);
    }
    register(socket, request) {
        // TODO check if token allows to listen before adding
        if (!this.listeners[socket.id]) {
            return;
        }
        // do not allow more than 500 concurrent listeners
        if (this.listeners[socket.id].amount > 500) {
            return;
        }
        const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
        if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
            console.log("subscribing to", mergedIndexIdentifier);
            this.redisSub.subscribe(mergedIndexIdentifier);
            this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
            this.listeners[socket.id].amount++;
        }
    }
    ownedSearchRegister(socket, request) {
        // TODO check token allows this user to search within here otherwise giving
        // he will be able to see any new records added
        if (!this.listeners[socket.id]) {
            return;
        }
        // do not allow more than 500 concurrent listeners
        if (this.listeners[socket.id].amount > 500) {
            return;
        }
        const mergedIndexIdentifier = "OWNED_SEARCH." + request.qualifiedPathName + "." + request.createdBy;
        if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
            console.log("subscribing to", mergedIndexIdentifier);
            this.redisSub.subscribe(mergedIndexIdentifier);
            this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
            this.listeners[socket.id].amount++;
        }
    }
    parentedSearchRegister(socket, request) {
        // TODO check token allows this user to search within here otherwise giving
        // he will be able to see any new records added
        if (!this.listeners[socket.id]) {
            return;
        }
        // do not allow more than 500 concurrent listeners
        if (this.listeners[socket.id].amount > 500) {
            return;
        }
        const mergedIndexIdentifier = "PARENTED_SEARCH." + request.qualifiedPathName + "." +
            request.parentType + "." + request.parentId + "." + (request.parentVersion || "");
        if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
            console.log("subscribing to", mergedIndexIdentifier);
            this.redisSub.subscribe(mergedIndexIdentifier);
            this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
            this.listeners[socket.id].amount++;
        }
    }
    async ownedSearchFeedback(socket, request) {
        try {
            const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
            if (!itemDefinitionOrModule) {
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
            if (request.knownLastRecord) {
                query.andWhere("created_at", ">", request.knownLastRecord.created_at);
            }
            query.orderBy("created_at", "desc");
            const newRecords = (await query).map(version_null_value_1.convertVersionsIntoNullsWhenNecessary);
            if (newRecords.length) {
                const event = {
                    createdBy: request.createdBy,
                    qualifiedPathName: request.qualifiedPathName,
                    newIds: newRecords,
                    // this contains all the data and the new record has the right form
                    newLastRecord: newRecords[0],
                };
                socket.emit(remote_protocol_1.OWNED_SEARCH_RECORDS_ADDED_EVENT, event);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async parentedSearchFeedback(socket, request) {
        try {
            const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
            if (!itemDefinitionOrModule) {
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
            if (request.knownLastRecord) {
                query.andWhere("created_at", ">", request.knownLastRecord.created_at);
            }
            query.orderBy("created_at", "desc");
            const newRecords = (await query).map(version_null_value_1.convertVersionsIntoNullsWhenNecessary);
            if (newRecords.length) {
                const event = {
                    parentId: request.parentId,
                    parentVersion: request.parentVersion,
                    parentType: request.parentType,
                    qualifiedPathName: request.qualifiedPathName,
                    newIds: newRecords,
                    newLastRecord: newRecords[0],
                };
                socket.emit(remote_protocol_1.PARENTED_SEARCH_RECORDS_ADDED_EVENT, event);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async feedback(socket, request) {
        // TODO check token allows for feedback
        try {
            const itemDefinition = this.root.registry[request.itemDefinition];
            if (!itemDefinition || !(itemDefinition instanceof ItemDefinition_1.default)) {
                return;
            }
            const mod = itemDefinition.getParentModule();
            const queriedResult = await this.cache.requestCache(itemDefinition.getQualifiedPathName(), mod.getQualifiedPathName(), request.id, request.version);
            if (queriedResult) {
                const event = {
                    itemDefinition: request.itemDefinition,
                    id: request.id,
                    version: request.version,
                    type: "last_modified",
                    lastModified: queriedResult.last_modified,
                };
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
                socket.emit(remote_protocol_1.CHANGED_FEEEDBACK_EVENT, event);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    removeListener(socket, mergedIndexIdentifier) {
        if (this.listeners[socket.id].listens[mergedIndexIdentifier]) {
            delete this.listeners[socket.id].listens[mergedIndexIdentifier];
            this.listeners[socket.id].amount--;
            const noSocketsListeningLeft = Object.keys(this.listeners).every((socketId) => {
                return !this.listeners[socketId].listens[mergedIndexIdentifier];
            });
            if (noSocketsListeningLeft) {
                console.log("unsubscribing to", mergedIndexIdentifier);
                this.redisSub.unsubscribe(mergedIndexIdentifier);
            }
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
    triggerListeners(event, listenerUUID) {
        const mergedIndexIdentifier = event.itemDefinition + "." + event.id + "." + (event.version || "");
        console.log("publishing to", mergedIndexIdentifier);
        this.redisPub.publish(mergedIndexIdentifier, JSON.stringify({
            event,
            listenerUUID,
            mergedIndexIdentifier,
            eventType: remote_protocol_1.CHANGED_FEEEDBACK_EVENT,
        }));
    }
    triggerOwnedSearchListeners(event, listenerUUID) {
        const mergedIndexIdentifier = "OWNED_SEARCH." + event.qualifiedPathName + "." + event.createdBy;
        console.log("publishing to", mergedIndexIdentifier);
        this.redisPub.publish(mergedIndexIdentifier, JSON.stringify({
            event,
            listenerUUID,
            mergedIndexIdentifier,
            eventType: remote_protocol_1.OWNED_SEARCH_RECORDS_ADDED_EVENT,
        }));
    }
    triggerParentedSearchListeners(event, listenerUUID) {
        const mergedIndexIdentifier = "PARENTED_SEARCH." + event.qualifiedPathName + "." + event.parentType +
            "." + event.parentId + "." + (event.parentVersion || "");
        console.log("publishing to", mergedIndexIdentifier);
        this.redisPub.publish(mergedIndexIdentifier, JSON.stringify({
            event,
            listenerUUID,
            mergedIndexIdentifier,
            eventType: remote_protocol_1.PARENTED_SEARCH_RECORDS_ADDED_EVENT,
        }));
    }
    pubSubTriggerListeners(channel, message) {
        const parsedContent = JSON.parse(message);
        console.log(parsedContent);
        Object.keys(this.listeners).forEach((socketKey) => {
            const whatListening = this.listeners[socketKey].listens;
            if (whatListening[parsedContent.mergedIndexIdentifier] &&
                this.listeners[socketKey].uuid !== parsedContent.listenerUUID) {
                console.log("emitting to someone");
                this.listeners[socketKey].socket.emit(parsedContent.eventType, parsedContent.event);
            }
        });
    }
    removeSocket(socket) {
        if (!this.listeners[socket.id]) {
            return;
        }
        Object.keys(this.listeners[socket.id].listens).forEach((listensMergedIdentifier) => {
            const noSocketsListeningLeft = Object.keys(this.listeners).every((socketId) => {
                if (socketId === socket.id) {
                    return true;
                }
                return !this.listeners[socketId].listens[listensMergedIdentifier];
            });
            if (noSocketsListeningLeft) {
                console.log("unsubscribing to", listensMergedIdentifier);
                this.redisSub.unsubscribe(listensMergedIdentifier);
            }
        });
        delete this.listeners[socket.id];
    }
}
exports.Listener = Listener;
