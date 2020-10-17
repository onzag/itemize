"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
const socket_io_1 = __importDefault(require("socket.io"));
const ItemDefinition_1 = __importStar(require("../base/Root/Module/ItemDefinition"));
const remote_protocol_1 = require("../base/remote-protocol");
const version_null_value_1 = require("./version-null-value");
const _1 = require(".");
const constants_1 = require("../constants");
const ajv_1 = __importDefault(require("ajv"));
const token_1 = require("./token");
// Used to optimize, it is found out that passing unecessary logs to the transport
// can slow the logger down even if it won't display
const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");
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
const CLUSTER_MANAGER_RESET = "CLUSTER_MANAGER_RESET";
class Listener {
    constructor(buildnumber, redisGlobalSub, redisGlobalPub, redisLocalSub, redisLocalPub, root, cache, knex, server, sensitiveConfig) {
        this.listeners = {};
        this.listensSS = {};
        this.redisGlobalSub = redisGlobalSub;
        this.redisGlobalPub = redisGlobalPub;
        this.redisLocalSub = redisLocalSub;
        this.redisLocalPub = redisLocalPub;
        this.buildnumber = buildnumber;
        this.root = root;
        this.cache = cache;
        this.knex = knex;
        this.sensitiveConfig = sensitiveConfig;
        this.cache.setListener(this);
        this.globalRedisListener = this.globalRedisListener.bind(this);
        this.localRedisListener = this.localRedisListener.bind(this);
        this.redisGlobalSub.on("message", this.globalRedisListener);
        this.redisGlobalSub.subscribe(constants_1.SERVER_DATA_IDENTIFIER);
        this.redisLocalSub.on("message", this.localRedisListener);
        if (INSTANCE_MODE === "ABSOLUTE" || INSTANCE_MODE === "CLUSTER_MANAGER") {
            this.redisLocalSub.subscribe(CLUSTER_MANAGER_REGISTER_SS);
        }
        else {
            this.redisLocalSub.subscribe(CLUSTER_MANAGER_RESET);
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
        const redisEvent = {
            type: constants_1.SERVER_USER_KICK_IDENTIFIER,
            serverInstanceGroupId: INSTANCE_GROUP_ID,
            data: {
                userId,
            },
            source: "global",
        };
        this.redisGlobalPub.publish(constants_1.SERVER_USER_KICK_IDENTIFIER, JSON.stringify(redisEvent));
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
            CAN_LOG_DEBUG && _1.logger.debug("Listener.identify: can't indentify due to invalid request", {
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
                const sqlResult = await this.cache.requestValue("MOD_users__IDEF_user", result.id, null);
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
            CAN_LOG_DEBUG && _1.logger.debug("Listener.identify: socket " + socket.id + " failed to identify due to " + invalidReason);
            this.emitError(socket, "failed to identify due to " + invalidReason, request);
            // yes kick the socket, why was it using an invalid token to start with, that's fishy
            this.kick(socket);
        }
        else {
            if (!this.listeners[socket.id]) {
                CAN_LOG_DEBUG && _1.logger.debug("Listener.identify: socket " + socket.id + " provides initial identification");
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
                CAN_LOG_DEBUG && _1.logger.debug("Listener.identify: socket " + socket.id + " updates identification criteria");
                this.listeners[socket.id].uuid = request.uuid;
                this.listeners[socket.id].token = request.token;
                this.listeners[socket.id].user = result;
            }
            socket.emit(remote_protocol_1.IDENTIFIED_EVENT);
        }
    }
    registerSS(request) {
        const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
        CAN_LOG_DEBUG && _1.logger.debug("Listener.registerSS: Server instance requested subscribe to " + mergedIndexIdentifier);
        if (this.listensSS[mergedIndexIdentifier]) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.registerSS: already subscribed, ignoring");
            return;
        }
        if (INSTANCE_MODE !== "CLUSTER_MANAGER" && INSTANCE_MODE !== "ABSOLUTE") {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.registerSS: instance is not cluster manager nor absolute piping request to cluster manager");
            const redisEvent = {
                type: CLUSTER_MANAGER_REGISTER_SS,
                request,
                serverInstanceGroupId: INSTANCE_GROUP_ID,
                source: "local",
            };
            this.redisLocalPub.publish(CLUSTER_MANAGER_REGISTER_SS, JSON.stringify(redisEvent));
        }
        else if (INSTANCE_MODE === "CLUSTER_MANAGER" || INSTANCE_MODE === "ABSOLUTE") {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.registerSS: performing subscription as cluster manager");
            this.redisGlobalSub.subscribe(mergedIndexIdentifier);
            this.listensSS[mergedIndexIdentifier] = true;
        }
        else {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.registerSS: invalid instance attempting a server side registration " + INSTANCE_MODE);
        }
    }
    async register(socket, request) {
        const listenerData = this.listeners[socket.id];
        if (!listenerData) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.register: can't register listener to an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkRegisterRequest(request);
        if (!valid) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.register: can't register listener due to invalid request", {
                errors: checkRegisterRequest.errors,
            });
            this.emitError(socket, "invalid request", request);
            return;
        }
        // do not allow more than MAX_REMOTE_LISTENERS_PER_SOCKET concurrent listeners
        if (listenerData.amount > constants_1.MAX_REMOTE_LISTENERS_PER_SOCKET) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.register: socket " + socket.id + " has exceeded the amount of listeners it can attach");
            this.emitError(socket, "exceeded socket max listeners per socket", request);
            return;
        }
        const itemDefinition = this.root.registry[request.itemDefinition];
        if (!itemDefinition || !(itemDefinition instanceof ItemDefinition_1.default)) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.register: could not find " + request.itemDefinition);
            this.emitError(socket, "could not find item definition", request);
            return;
        }
        const value = await this.cache.requestValue(itemDefinition, request.id, request.version);
        const creator = value ? (itemDefinition.isOwnerObjectId() ? value.id : value.created_by) : constants_1.UNSPECIFIED_OWNER;
        const hasAccess = itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, listenerData.user.role, listenerData.user.id, creator, {}, false);
        if (!hasAccess) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.register: socket " + socket.id + " with user " + listenerData.user.id +
                " with role " + listenerData.user.role + " cannot listen to " + itemDefinition);
            this.emitError(socket, "user has not access", request);
            return;
        }
        const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
        if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.register: Subscribing socket " + socket.id + " to " + mergedIndexIdentifier);
            this.redisGlobalSub.subscribe(mergedIndexIdentifier);
            this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
            this.listeners[socket.id].amount++;
        }
    }
    ownedSearchRegister(socket, request) {
        const listenerData = this.listeners[socket.id];
        if (!listenerData) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.ownedSearchRegister: can't register listener to an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkOwnedSearchRegisterRequest(request);
        if (!valid) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.ownedSearchRegister: can't register listener due to invalid request", {
                errors: checkOwnedSearchRegisterRequest.errors,
            });
            this.emitError(socket, "invalid request", request);
            return;
        }
        // do not allow more than MAX_REMOTE_LISTENERS_PER_SOCKET concurrent listeners
        if (listenerData.amount > constants_1.MAX_REMOTE_LISTENERS_PER_SOCKET) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.ownedSearchRegister: socket " + socket.id + " has exceeded the amount of listeners it can attach");
            this.emitError(socket, "exceeded socket max listeners per socket", request);
            return;
        }
        const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
        let hasAccess;
        if (!itemDefinitionOrModule) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.ownedSearchRegister: could not find item definition or module for " + request.qualifiedPathName);
            this.emitError(socket, "could not find item definition or module", request);
            return;
        }
        else {
            hasAccess = itemDefinitionOrModule.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, listenerData.user.role, listenerData.user.id, constants_1.UNSPECIFIED_OWNER, {}, false);
        }
        if (!hasAccess) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.ownedSearchRegister: socket " + socket.id + " with user " + listenerData.user.id +
                " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName);
            this.emitError(socket, "user has not access", request);
            return;
        }
        const mergedIndexIdentifier = "OWNED_SEARCH." + request.qualifiedPathName + "." + request.createdBy;
        if (!listenerData.listens[mergedIndexIdentifier]) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.ownedSearchRegister: Subscribing socket " + socket.id + " to " + mergedIndexIdentifier);
            this.redisGlobalSub.subscribe(mergedIndexIdentifier);
            listenerData.listens[mergedIndexIdentifier] = true;
            listenerData.amount++;
        }
    }
    parentedSearchRegister(socket, request) {
        const listenerData = this.listeners[socket.id];
        if (!listenerData) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.parentedSearchRegister: can't register listener to an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkParentedSearchRegisterRequest(request);
        if (!valid) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.parentedSearchRegister: can't register listener due to invalid request", {
                errors: checkParentedSearchRegisterRequest.errors,
            });
            this.emitError(socket, "invalid request", request);
            return;
        }
        // do not allow more than MAX_REMOTE_LISTENERS_PER_SOCKET concurrent listeners
        if (this.listeners[socket.id].amount > constants_1.MAX_REMOTE_LISTENERS_PER_SOCKET) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.parentedSearchRegister: socket " + socket.id + " has exceeded the amount of listeners it can attach");
            this.emitError(socket, "exceeded socket max listeners per socket", request);
            return;
        }
        const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
        let hasAccess;
        if (!itemDefinitionOrModule) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.parentedSearchRegister: could not find item definition or module for " + request.qualifiedPathName);
            this.emitError(socket, "could not find item definition or module", request);
            return;
        }
        else {
            hasAccess = itemDefinitionOrModule.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, listenerData.user.role, listenerData.user.id, constants_1.UNSPECIFIED_OWNER, {}, false);
        }
        if (!hasAccess) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.parentedSearchRegister: socket " + socket.id + " with user " + listenerData.user.id +
                " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName);
            this.emitError(socket, "user has not access", request);
            return;
        }
        const mergedIndexIdentifier = "PARENTED_SEARCH." + request.qualifiedPathName + "." +
            request.parentType + "." + request.parentId + "." + (request.parentVersion || "");
        if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.parentedSearchRegister: Subscribing socket " + socket.id + " to " + mergedIndexIdentifier);
            this.redisGlobalSub.subscribe(mergedIndexIdentifier);
            this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
            this.listeners[socket.id].amount++;
        }
    }
    async ownedSearchFeedback(socket, request) {
        const listenerData = this.listeners[socket.id];
        if (!listenerData) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.ownedSearchFeedback: can't give feedback to an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkOwnedSearchFeedbackRequest(request);
        if (!valid) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.ownedSearchFeedback: can't give feedback due to invalid request", {
                errors: checkOwnedSearchFeedbackRequest.errors,
            });
            this.emitError(socket, "invalid request", request);
            return;
        }
        try {
            const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
            if (!itemDefinitionOrModule) {
                CAN_LOG_DEBUG && _1.logger.debug("Listener.ownedSearchFeedback: could not find " + request.qualifiedPathName);
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
            const hasAccess = itemDefinitionOrModule.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, listenerData.user.role, listenerData.user.id, request.createdBy, {}, false);
            if (!hasAccess) {
                CAN_LOG_DEBUG && _1.logger.debug("Listener.ownedSearchFeedback: socket " + socket.id + " with user " + listenerData.user.id +
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
                CAN_LOG_DEBUG && _1.logger.debug("Listener.ownedSearchFeedback: triggering " + remote_protocol_1.OWNED_SEARCH_RECORDS_ADDED_EVENT, event);
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
            CAN_LOG_DEBUG && _1.logger.debug("Listener.parentedSearchFeedback: can't give feedback to an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkParentedSearchFeedbackRequest(request);
        if (!valid) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.parentedSearchFeedback: can't register listener due to invalid request", {
                errors: checkParentedSearchFeedbackRequest.errors,
            });
            this.emitError(socket, "invalid request", request);
            return;
        }
        try {
            const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
            if (!itemDefinitionOrModule) {
                CAN_LOG_DEBUG && _1.logger.debug("Listener.parentedSearchFeedback: could not find " + request.qualifiedPathName);
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
                CAN_LOG_DEBUG && _1.logger.debug("Listener.parentedSearchFeedback: socket " + socket.id + " with user " + listenerData.user.id +
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
                CAN_LOG_DEBUG && _1.logger.debug("Listener.parentedSearchFeedback: emmitting " + remote_protocol_1.PARENTED_SEARCH_RECORDS_ADDED_EVENT, event);
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
            CAN_LOG_DEBUG && _1.logger.debug("Listener.feedback: can't give feedback to an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkFeedbackRequest(request);
        if (!valid) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.feedback: can't register listener due to invalid request", {
                errors: checkFeedbackRequest.errors,
            });
            this.emitError(socket, "invalid request", request);
            return;
        }
        const itemDefinition = this.root.registry[request.itemDefinition];
        if (!itemDefinition || !(itemDefinition instanceof ItemDefinition_1.default)) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.register: could not find " + request.itemDefinition);
            this.emitError(socket, "could not find item definition", request);
            return;
        }
        const value = await this.cache.requestValue(itemDefinition, request.id, request.version);
        const creator = value ? (itemDefinition.isOwnerObjectId() ? value.id : value.created_by) : constants_1.UNSPECIFIED_OWNER;
        const hasAccess = itemDefinition.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, listenerData.user.role, listenerData.user.id, creator, {}, false);
        if (!hasAccess) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.register: socket " + socket.id + " with user " + listenerData.user.id +
                " with role " + listenerData.user.role + " cannot listen to " + itemDefinition);
            this.emitError(socket, "user has not access", request);
            return;
        }
        try {
            const itemDefinition = this.root.registry[request.itemDefinition];
            if (!itemDefinition || !(itemDefinition instanceof ItemDefinition_1.default)) {
                CAN_LOG_DEBUG && _1.logger.debug("Listener.feedback: could not find " + request.itemDefinition);
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
                CAN_LOG_DEBUG && _1.logger.debug("Listener.feedback: emitting " + remote_protocol_1.CHANGED_FEEEDBACK_EVENT, event);
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
                CAN_LOG_DEBUG && _1.logger.debug("Listener.feedback: emitting " + remote_protocol_1.CHANGED_FEEEDBACK_EVENT, event);
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
            CAN_LOG_DEBUG && _1.logger.debug("Listener.removeListenerFinal: founds no sockets left for " + mergedIndexIdentifier + " plugging off redis");
            this.redisGlobalSub.unsubscribe(mergedIndexIdentifier);
        }
    }
    removeListener(socket, mergedIndexIdentifier) {
        const listenerData = this.listeners[socket.id];
        if (listenerData && listenerData.listens[mergedIndexIdentifier]) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.removeListener: unsubscribing socket " + socket.id + " from " + mergedIndexIdentifier);
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
            CAN_LOG_DEBUG && _1.logger.debug("Listener.unregister: can't unregister an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkUnregisterRequest(request);
        if (!valid) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.unregister: can't unregister due to invalid request", {
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
            CAN_LOG_DEBUG && _1.logger.debug("Listener.ownedSearchUnregister: can't owned search unregister an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkOwnedSearchUnregisterRequest(request);
        if (!valid) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.ownedSearchUnregister: can't unregister due to invalid request", {
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
            CAN_LOG_DEBUG && _1.logger.debug("Listener.parentedSearchUnregister: can't parent search unregister an unidentified socket " + socket.id);
            this.emitError(socket, "socket is unidentified", request);
            return;
        }
        const valid = checkParentedSearchUnregisterRequest(request);
        if (!valid) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.parentedSearchUnregister: can't unregister due to invalid request", {
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
            source: "global",
            mergedIndexIdentifier,
            type: remote_protocol_1.CHANGED_FEEEDBACK_EVENT,
            data,
        };
        // due to data we avoid logging this, data can be fairly large
        CAN_LOG_DEBUG && _1.logger.debug("Listener.triggerChangedListeners: triggering redis changed event for", {
            event: redisEvent.event,
            listenerUUID,
            serverInstanceGroupId: INSTANCE_GROUP_ID,
        });
        this.redisGlobalPub.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    }
    triggerOwnedSearchListeners(event, listenerUUID) {
        const mergedIndexIdentifier = "OWNED_SEARCH." + event.qualifiedPathName + "." + event.createdBy;
        const redisEvent = {
            type: remote_protocol_1.OWNED_SEARCH_RECORDS_ADDED_EVENT,
            event,
            listenerUUID,
            mergedIndexIdentifier,
            serverInstanceGroupId: INSTANCE_GROUP_ID,
            source: "global",
        };
        CAN_LOG_DEBUG && _1.logger.debug("Listener.triggerOwnedSearchListeners: triggering redis event", redisEvent);
        this.redisGlobalPub.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    }
    triggerParentedSearchListeners(event, listenerUUID) {
        const mergedIndexIdentifier = "PARENTED_SEARCH." + event.qualifiedPathName + "." + event.parentType +
            "." + event.parentId + "." + (event.parentVersion || "");
        const redisEvent = {
            event,
            listenerUUID,
            mergedIndexIdentifier,
            type: remote_protocol_1.PARENTED_SEARCH_RECORDS_ADDED_EVENT,
            serverInstanceGroupId: INSTANCE_GROUP_ID,
            source: "global",
        };
        CAN_LOG_DEBUG && _1.logger.debug("Listener.triggerParentedSearchListeners: triggering redis event", redisEvent);
        this.redisGlobalPub.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    }
    async globalRedisListener(channel, message) {
        const redisEvent = JSON.parse(message);
        CAN_LOG_DEBUG && _1.logger.debug("Listener.globalRedisListener: received redis event", redisEvent);
        if (redisEvent.source !== "global") {
            // this happens when we use the same redis database for both global and local
            CAN_LOG_DEBUG && _1.logger.debug("Listener.globalRedisListener: redis event source is not global, ignoring");
            return;
        }
        if (redisEvent.type === constants_1.SERVER_DATA_IDENTIFIER) {
            this.cache.onServerDataChangeInformed(redisEvent.data);
            this.io.emit(remote_protocol_1.CURRENCY_FACTORS_UPDATED_EVENT);
            return;
        }
        if (redisEvent.type === constants_1.SERVER_USER_KICK_IDENTIFIER) {
            const serverInstanceGroupId = redisEvent.serverInstanceGroupId;
            if (serverInstanceGroupId === INSTANCE_GROUP_ID) {
                CAN_LOG_DEBUG && _1.logger.debug("Listener.globalRedisListener: our own instance group id " + INSTANCE_GROUP_ID + " was the emitter, ignoring event");
            }
            else if (redisEvent.data && redisEvent.data.userId === "number") {
                this.onReceiveKickEvent(redisEvent.data.userId);
            }
            return;
        }
        // only the cluster manager and absolute happens to recieve these
        // as these are the remote listening functions
        if (redisEvent.mergedIndexIdentifier && this.listensSS[redisEvent.mergedIndexIdentifier]) {
            CAN_LOG_DEBUG && _1.logger.debug("Listener.globalRedisListener: our own server is expecting it");
            const serverInstanceGroupId = redisEvent.serverInstanceGroupId;
            if (serverInstanceGroupId === INSTANCE_GROUP_ID) {
                // when we were the originators, our local cache is expected
                // to have been updated, as such, we literally don't care
                CAN_LOG_DEBUG && _1.logger.debug("Listener.globalRedisListener: our own instance group id " + INSTANCE_GROUP_ID + " was the emitter, ignoring event");
            }
            else {
                const event = redisEvent.event;
                if (typeof redisEvent.data === "undefined") {
                    this.cache.onChangeInformedNoData(event.itemDefinition, event.id, event.version || null);
                }
                else {
                    this.cache.onChangeInformed(event.itemDefinition, event.id, event.version || null, redisEvent.data);
                }
            }
        }
        // the cluster manager might be doing its job, and resetting the data
        // of the instance however, since the cluster manager should be extremely
        // fast network latency should be enough for the cluster manager to complete
        // before this, technically the cluster manager is not required for itemize
        // to work but it would leave the instance into a frozen state, where nothing
        // can update because caches are not taken care of, once the cache restarts an
        // emergency is launched
        if (redisEvent.mergedIndexIdentifier) {
            // we give 100 milliseconds for the cluster manager to have updated
            // these values, this is very generous, but that's alright
            // redis shouldn't even take more than 10ms to update these
            // and cluster manager should be close
            setTimeout(() => {
                Object.keys(this.listeners).forEach((socketKey) => {
                    const whatListening = this.listeners[socketKey].listens;
                    if (whatListening[redisEvent.mergedIndexIdentifier]) {
                        if (this.listeners[socketKey].uuid === redisEvent.listenerUUID) {
                            CAN_LOG_DEBUG && _1.logger.debug("Listener.globalRedisListener: socket " + socketKey + " is listening, but was also the initial emitter, ignoring");
                        }
                        else {
                            CAN_LOG_DEBUG && _1.logger.debug("Listener.globalRedisListener: socket " + socketKey + " was expecting it, emitting");
                            this.listeners[socketKey].socket.emit(redisEvent.type, redisEvent.event);
                        }
                    }
                });
            }, 100);
        }
    }
    localRedisListener(channel, message) {
        const redisEvent = JSON.parse(message);
        CAN_LOG_DEBUG && _1.logger.debug("Listener.localRedisListener: recieved redis event", redisEvent);
        if (redisEvent.source !== "local") {
            // this happens when we use the same redis database for both global and local
            CAN_LOG_DEBUG && _1.logger.debug("Listener.localRedisListener: redis event source is not local, ignoring");
            return;
        }
        if (redisEvent.type === CLUSTER_MANAGER_REGISTER_SS) {
            // we are the cluster manager, and we handle these registrations
            this.registerSS(redisEvent.request);
        }
        else if (redisEvent.type === CLUSTER_MANAGER_RESET) {
            // we are an extended instance and we have been informed that the cluster manager has
            // reset
            this.onClusterManagerResetInformed();
        }
    }
    removeSocket(socket) {
        const listenerData = this.listeners[socket.id];
        if (!listenerData) {
            return;
        }
        CAN_LOG_DEBUG && _1.logger.debug("Listener.removeSocket: removing socket " + socket.id);
        Object.keys(listenerData.listens).forEach((listensMergedIdentifier) => {
            const noSocketsListeningLeft = !this.listensSS[listensMergedIdentifier] &&
                Object.keys(this.listeners).every((socketId) => {
                    if (socketId === socket.id) {
                        return true;
                    }
                    return !this.listeners[socketId].listens[listensMergedIdentifier];
                });
            if (noSocketsListeningLeft) {
                CAN_LOG_DEBUG && _1.logger.debug("Listener.removeSocket: redis unsubscribing off " + listensMergedIdentifier);
                this.redisGlobalSub.unsubscribe(listensMergedIdentifier);
            }
        });
        delete this.listeners[socket.id];
    }
    onClusterManagerResetInformed() {
        // the redis database has been wiped if this happened here
        // as such now we might have issues with sync, as the users might
        // have not received changes, as such, we will check every listener
        // and force the users to reqeust for feedback by making a last modified
        // event
        CAN_LOG_DEBUG && _1.logger.debug("Listener.onClusterManagerResetInformed [SERIOUS]: received cluster manager reset event, " +
            "this means the cluster manager died out and restarted, now all the clients must be reconnected");
        // a cluster manager reset should not happen at all when starting the server
        // as the cluster manager should start before the extended instances, and such
        // none would be listening for this event
        Object.keys(this.listeners).forEach((lKey) => {
            const socket = this.listeners[lKey].socket;
            this.removeSocket(socket);
            // force the user to reconnect, when they reconnect they will
            // ask for feedback, this is a cheap solution, but the cluster manager
            // shouldn't have died to start with
            socket.disconnect();
        });
    }
    informClusterManagerReset() {
        CAN_LOG_DEBUG && _1.logger.debug("Listener.informClusterManagerReset: informing a reset of the cluster manager");
        const redisEvent = {
            type: CLUSTER_MANAGER_RESET,
            serverInstanceGroupId: INSTANCE_GROUP_ID,
            source: "local",
        };
        this.redisLocalPub.publish(CLUSTER_MANAGER_RESET, JSON.stringify(redisEvent));
    }
}
exports.Listener = Listener;
