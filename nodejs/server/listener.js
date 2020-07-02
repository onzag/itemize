"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = __importDefault(require("socket.io"));
const ItemDefinition_1 = __importStar(require("../base/Root/Module/ItemDefinition"));
const remote_protocol_1 = require("../base/remote-protocol");
const version_null_value_1 = require("./version-null-value");
const _1 = require(".");
const constants_1 = require("../constants");
const ajv_1 = __importDefault(require("ajv"));
const token_1 = require("./token");
const ajv = new ajv_1.default();
const checkRegisterRequest = ajv.compile(remote_protocol_1.RegisterRequestSchema);
const checkOwnedSearchRegisterRequest = ajv.compile(remote_protocol_1.OwnedSearchRegisterRequestSchema);
const checkParentedSearchRegisterRequest = ajv.compile(remote_protocol_1.ParentedSearchRegisterRequestSchema);
const checkIdentifyRequest = ajv.compile(remote_protocol_1.IdentifyRequestSchema);
const checkFeedbackRequest = ajv.compile(remote_protocol_1.FeedbackRequestSchema);
const checkOwnedSearchFeedbackRequest = ajv.compile(remote_protocol_1.OwnedSearchFeedbackRequestSchema);
const checkParentedSearchFeedbackRequest = ajv.compile(remote_protocol_1.ParentedSearchFeedbackRequestSchema);
const checkUnregisterRequest = ajv.compile(remote_protocol_1.UnregisterRequestSchema);
const checkOwnedSearchUnregisterRequest = ajv.compile(remote_protocol_1.OwnedSearchUnregisterRequestSchema);
const checkParentedSearchUnregisterRequest = ajv.compile(remote_protocol_1.ParentedSearchUnregisterRequestSchema);
const INSTANCE_MODE = process.env.INSTANCE_MODE || "ABSOLUTE";
const INSTANCE_GROUP_ID = process.env.INSTANCE_GROUP_ID || "UNIDENTIFIED";
const CLUSTER_MANAGER_REGISTER_SS = "CLUSTER_MANAGER_REGISTER_SS";
class Listener {
    constructor(buildnumber, redisSub, redisPub, redisLocalSub, redisLocalPub, root, cache, knex, server, sensitiveConfig) {
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
        this.sensitiveConfig = sensitiveConfig;
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
        this.io = socket_io_1.default(server);
        this.io.on("connection", (socket) => {
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
    emitError(socket, message, request) {
        const error = {
            message,
            request,
        };
        socket.emit(remote_protocol_1.ERROR_EVENT, error);
    }
    sendKickEvent(userId) {
        this.onReceiveKickEvent(userId);
        this.redisPub.publish(constants_1.SERVER_USER_KICK_IDENTIFIER, JSON.stringify({
            userId,
            serverInstanceGroupId: INSTANCE_GROUP_ID,
        }));
    }
    onReceiveKickEvent(userId) {
        Object.keys(this.listeners).forEach((socketKey) => {
            const socket = this.listeners[socketKey].socket;
            const user = this.listeners[socketKey].user;
            if (user.id === userId) {
                this.kick(socket);
            }
        });
    }
    kick(socket) {
        this.removeSocket(socket);
        socket.emit(remote_protocol_1.KICKED_EVENT);
        // Force to reidentify and reattach everything
        setTimeout(() => {
            if (socket.connected) {
                socket.disconnect();
            }
        }, 300);
    }
    async identify(socket, request) {
        const valid = checkIdentifyRequest(request);
        if (!valid) {
            _1.logger.debug("Listener.identify: can't indentify due to invalid request", {
                errors: checkIdentifyRequest.errors,
            });
            this.emitError(socket, "can't identify user due to invalid request", request);
            return;
        }
        let invalid = false;
        let invalidReason;
        let result;
        if (request.token) {
            try {
                result = await token_1.jwtVerify(request.token, this.sensitiveConfig.jwtKey);
                invalid = (typeof result.id !== "number" ||
                    typeof result.role !== "string" ||
                    typeof result.sessionId !== "number");
            }
            catch (err) {
                invalid = true;
                invalidReason = "invalid token";
            }
            if (!invalid) {
                const sqlResult = await this.cache.requestValue(["MOD_users__IDEF_user", "MOD_users"], result.id, null);
                if (!sqlResult) {
                    invalid = true;
                    invalidReason = "user deleted";
                }
                else if (sqlResult.blocked_at) {
                    invalid = true;
                    invalidReason = "user blocked";
                }
                else if ((sqlResult.session_id || 0) !== result.sessionId) {
                    invalid = true;
                    invalidReason = "session id mismatch";
                }
                else if (sqlResult.role !== result.role) {
                    invalid = true;
                    invalidReason = "role mismatch";
                }
            }
        }
        else {
            result = {
                id: null,
                role: constants_1.GUEST_METAROLE,
                sessionId: null,
            };
        }
        if (invalid) {
            _1.logger.debug("Listener.identify: socket " + socket.id + " failed to identify due to " + invalidReason);
            this.emitError(socket, "failed to identify due to " + invalidReason, request);
            // yes kick the socket, why was it using an invalid token to start with, that's fishy
            this.kick(socket);
        }
        else {
            if (!this.listeners[socket.id]) {
                _1.logger.debug("Listener.identify: socket " + socket.id + " provides initial identification");
                this.listeners[socket.id] = {
                    socket,
                    listens: {},
                    uuid: request.uuid,
                    token: request.token,
                    amount: 0,
                    user: result,
                };
            }
            else {
                _1.logger.debug("Listener.identify: socket " + socket.id + " updates identification criteria");
                this.listeners[socket.id].uuid = request.uuid;
                this.listeners[socket.id].token = request.token;
                this.listeners[socket.id].user = result;
            }
            socket.emit(remote_protocol_1.IDENTIFIED_EVENT);
        }
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
    async register(socket, request) {
        const listenerData = this.listeners[socket.id];
        if (!listenerData) {
            _1.logger.debug("Listener.register: can't register listener to an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkRegisterRequest(request);
        if (!valid) {
            _1.logger.debug("Listener.register: can't register listener due to invalid request", {
                errors: checkRegisterRequest.errors,
            });
            this.emitError(socket, "invalid request", request);
            return;
        }
        // do not allow more than MAX_REMOTE_LISTENERS_PER_SOCKET concurrent listeners
        if (listenerData.amount > constants_1.MAX_REMOTE_LISTENERS_PER_SOCKET) {
            _1.logger.debug("Listener.register: socket " + socket.id + " has exceeded the amount of listeners it can attach");
            this.emitError(socket, "exceeded socket max listeners per socket", request);
            return;
        }
        const itemDefinition = this.root.registry[request.itemDefinition];
        if (!itemDefinition || !(itemDefinition instanceof ItemDefinition_1.default)) {
            _1.logger.debug("Listener.register: could not find " + request.itemDefinition);
            this.emitError(socket, "could not find item definition", request);
            return;
        }
        const value = await this.cache.requestValue(itemDefinition, request.id, request.version);
        const creator = value ? (itemDefinition.isOwnerObjectId() ? value.id : value.created_by) : constants_1.UNSPECIFIED_OWNER;
        const hasAccess = itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, listenerData.user.role, listenerData.user.id, creator, {}, false);
        if (!hasAccess) {
            _1.logger.debug("Listener.register: socket " + socket.id + " with user " + listenerData.user.id +
                " with role " + listenerData.user.role + " cannot listen to " + itemDefinition);
            this.emitError(socket, "user has not access", request);
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
        const listenerData = this.listeners[socket.id];
        if (!listenerData) {
            _1.logger.debug("Listener.ownedSearchRegister: can't register listener to an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkOwnedSearchRegisterRequest(request);
        if (!valid) {
            _1.logger.debug("Listener.ownedSearchRegister: can't register listener due to invalid request", {
                errors: checkOwnedSearchRegisterRequest.errors,
            });
            this.emitError(socket, "invalid request", request);
            return;
        }
        // do not allow more than MAX_REMOTE_LISTENERS_PER_SOCKET concurrent listeners
        if (listenerData.amount > constants_1.MAX_REMOTE_LISTENERS_PER_SOCKET) {
            _1.logger.debug("Listener.ownedSearchRegister: socket " + socket.id + " has exceeded the amount of listeners it can attach");
            this.emitError(socket, "exceeded socket max listeners per socket", request);
            return;
        }
        const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
        let hasAccess;
        if (!itemDefinitionOrModule) {
            _1.logger.debug("Listener.ownedSearchRegister: could not find item definition or module for " + request.qualifiedPathName);
            this.emitError(socket, "could not find item definition or module", request);
            return;
        }
        else {
            hasAccess = itemDefinitionOrModule.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, listenerData.user.role, listenerData.user.id, constants_1.UNSPECIFIED_OWNER, {}, false);
        }
        if (!hasAccess) {
            _1.logger.debug("Listener.ownedSearchRegister: socket " + socket.id + " with user " + listenerData.user.id +
                " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName);
            this.emitError(socket, "user has not access", request);
            return;
        }
        const mergedIndexIdentifier = "OWNED_SEARCH." + request.qualifiedPathName + "." + request.createdBy;
        if (!listenerData.listens[mergedIndexIdentifier]) {
            _1.logger.debug("Listener.ownedSearchRegister: Subscribing socket " + socket.id + " to " + mergedIndexIdentifier);
            this.redisSub.subscribe(mergedIndexIdentifier);
            listenerData.listens[mergedIndexIdentifier] = true;
            listenerData.amount++;
        }
    }
    parentedSearchRegister(socket, request) {
        const listenerData = this.listeners[socket.id];
        if (!listenerData) {
            _1.logger.debug("Listener.parentedSearchRegister: can't register listener to an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkParentedSearchRegisterRequest(request);
        if (!valid) {
            _1.logger.debug("Listener.parentedSearchRegister: can't register listener due to invalid request", {
                errors: checkParentedSearchRegisterRequest.errors,
            });
            this.emitError(socket, "invalid request", request);
            return;
        }
        // do not allow more than MAX_REMOTE_LISTENERS_PER_SOCKET concurrent listeners
        if (this.listeners[socket.id].amount > constants_1.MAX_REMOTE_LISTENERS_PER_SOCKET) {
            _1.logger.debug("Listener.parentedSearchRegister: socket " + socket.id + " has exceeded the amount of listeners it can attach");
            this.emitError(socket, "exceeded socket max listeners per socket", request);
            return;
        }
        const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
        let hasAccess;
        if (!itemDefinitionOrModule) {
            _1.logger.debug("Listener.parentedSearchRegister: could not find item definition or module for " + request.qualifiedPathName);
            this.emitError(socket, "could not find item definition or module", request);
            return;
        }
        else {
            hasAccess = itemDefinitionOrModule.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, listenerData.user.role, listenerData.user.id, constants_1.UNSPECIFIED_OWNER, {}, false);
        }
        if (!hasAccess) {
            _1.logger.debug("Listener.parentedSearchRegister: socket " + socket.id + " with user " + listenerData.user.id +
                " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName);
            this.emitError(socket, "user has not access", request);
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
        const listenerData = this.listeners[socket.id];
        if (!listenerData) {
            _1.logger.debug("Listener.ownedSearchFeedback: can't give feedback to an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkOwnedSearchFeedbackRequest(request);
        if (!valid) {
            _1.logger.debug("Listener.ownedSearchFeedback: can't give feedback due to invalid request", {
                errors: checkOwnedSearchFeedbackRequest.errors,
            });
            this.emitError(socket, "invalid request", request);
            return;
        }
        try {
            const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
            if (!itemDefinitionOrModule) {
                _1.logger.debug("Listener.ownedSearchFeedback: could not find " + request.qualifiedPathName);
                this.emitError(socket, "could not find item definition or module", request);
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
            const hasAccess = itemDefinitionOrModule.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, listenerData.user.role, listenerData.user.id, constants_1.UNSPECIFIED_OWNER, {}, false);
            if (!hasAccess) {
                _1.logger.debug("Listener.ownedSearchFeedback: socket " + socket.id + " with user " + listenerData.user.id +
                    " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName);
                this.emitError(socket, "user has not access", request);
                return;
            }
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
        const listenerData = this.listeners[socket.id];
        if (!listenerData) {
            _1.logger.debug("Listener.parentedSearchFeedback: can't give feedback to an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkParentedSearchFeedbackRequest(request);
        if (!valid) {
            _1.logger.debug("Listener.parentedSearchFeedback: can't register listener due to invalid request", {
                errors: checkParentedSearchFeedbackRequest.errors,
            });
            this.emitError(socket, "invalid request", request);
            return;
        }
        try {
            const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
            if (!itemDefinitionOrModule) {
                _1.logger.debug("Listener.parentedSearchFeedback: could not find " + request.qualifiedPathName);
                this.emitError(socket, "could not find item definition or module", request);
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
            const hasAccess = itemDefinitionOrModule.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, listenerData.user.role, listenerData.user.id, constants_1.UNSPECIFIED_OWNER, {}, false);
            if (!hasAccess) {
                _1.logger.debug("Listener.parentedSearchFeedback: socket " + socket.id + " with user " + listenerData.user.id +
                    " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName);
                this.emitError(socket, "user has not access", request);
                return;
            }
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
        const listenerData = this.listeners[socket.id];
        if (!listenerData) {
            _1.logger.debug("Listener.feedback: can't give feedback to an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkFeedbackRequest(request);
        if (!valid) {
            _1.logger.debug("Listener.feedback: can't register listener due to invalid request", {
                errors: checkFeedbackRequest.errors,
            });
            this.emitError(socket, "invalid request", request);
            return;
        }
        const itemDefinition = this.root.registry[request.itemDefinition];
        if (!itemDefinition || !(itemDefinition instanceof ItemDefinition_1.default)) {
            _1.logger.debug("Listener.register: could not find " + request.itemDefinition);
            this.emitError(socket, "could not find item definition", request);
            return;
        }
        const value = await this.cache.requestValue(itemDefinition, request.id, request.version);
        const creator = value ? (itemDefinition.isOwnerObjectId() ? value.id : value.created_by) : constants_1.UNSPECIFIED_OWNER;
        const hasAccess = itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, listenerData.user.role, listenerData.user.id, creator, {}, false);
        if (!hasAccess) {
            _1.logger.debug("Listener.register: socket " + socket.id + " with user " + listenerData.user.id +
                " with role " + listenerData.user.role + " cannot listen to " + itemDefinition);
            this.emitError(socket, "user has not access", request);
            return;
        }
        try {
            const itemDefinition = this.root.registry[request.itemDefinition];
            if (!itemDefinition || !(itemDefinition instanceof ItemDefinition_1.default)) {
                _1.logger.debug("Listener.feedback: could not find " + request.itemDefinition);
                this.emitError(socket, "could not find item definition", request);
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
        const listenerData = this.listeners[socket.id];
        if (listenerData && listenerData.listens[mergedIndexIdentifier]) {
            _1.logger.debug("Listener.removeListener: unsubscribing socket " + socket.id + " from " + mergedIndexIdentifier);
            delete listenerData.listens[mergedIndexIdentifier];
            listenerData.amount--;
            this.removeListenerFinal(mergedIndexIdentifier);
        }
    }
    /**
     * This method only reasonable gets called by the CLUSTER_MANAGER or in absolute mode
     * @param request
     */
    unregisterSS(request) {
        const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
        if (this.listensSS[mergedIndexIdentifier]) {
            delete this.listensSS[mergedIndexIdentifier];
            this.removeListenerFinal(mergedIndexIdentifier);
        }
    }
    unregister(socket, request) {
        const listenerData = this.listeners[socket.id];
        if (!listenerData) {
            _1.logger.debug("Listener.unregister: can't unregister an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkUnregisterRequest(request);
        if (!valid) {
            _1.logger.debug("Listener.unregister: can't unregister due to invalid request", {
                errors: checkUnregisterRequest.errors,
            });
            this.emitError(socket, "invalid request", request);
            return;
        }
        const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
        this.removeListener(socket, mergedIndexIdentifier);
    }
    ownedSearchUnregister(socket, request) {
        const listenerData = this.listeners[socket.id];
        if (!listenerData) {
            _1.logger.debug("Listener.ownedSearchUnregister: can't owned search unregister an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkOwnedSearchUnregisterRequest(request);
        if (!valid) {
            _1.logger.debug("Listener.ownedSearchUnregister: can't unregister due to invalid request", {
                errors: checkOwnedSearchUnregisterRequest.errors,
            });
            this.emitError(socket, "invalid request", request);
            return;
        }
        const mergedIndexIdentifier = "OWNED_SEARCH." + request.qualifiedPathName + "." + request.createdBy;
        this.removeListener(socket, mergedIndexIdentifier);
    }
    parentedSearchUnregister(socket, request) {
        const listenerData = this.listeners[socket.id];
        if (!listenerData) {
            _1.logger.debug("Listener.parentedSearchUnregister: can't parent search unregister an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkParentedSearchUnregisterRequest(request);
        if (!valid) {
            _1.logger.debug("Listener.parentedSearchUnregister: can't unregister due to invalid request", {
                errors: checkParentedSearchUnregisterRequest.errors,
            });
            this.emitError(socket, "invalid request", request);
            return;
        }
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
            this.io.emit(remote_protocol_1.CURRENCY_FACTORS_UPDATED_EVENT);
            return;
        }
        if (channel === constants_1.SERVER_USER_KICK_IDENTIFIER) {
            const serverInstanceGroupId = parsedContent.serverInstanceGroupId;
            if (serverInstanceGroupId === INSTANCE_GROUP_ID) {
                _1.logger.debug("Listener.pubSubTriggerListeners: our own instance group id " + INSTANCE_GROUP_ID + " was the emitter, ignoring event");
            }
            else if (typeof parsedContent.userId === "number") {
                this.onReceiveKickEvent(parsedContent.userId);
            }
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
        const listenerData = this.listeners[socket.id];
        if (!listenerData) {
            return;
        }
        _1.logger.debug("Listener.removeSocket: removing socket " + socket.id);
        Object.keys(listenerData.listens).forEach((listensMergedIdentifier) => {
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
