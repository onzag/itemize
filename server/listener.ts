import { Socket } from "socket.io";
import { ISQLTableRowValue } from "../base/Root/sql";
import { RedisClient } from "redis";
import { Cache } from "./cache";
import { Server } from "http";
import Root from "../base/Root";
import ioMain from "socket.io";
import ItemDefinition, { ItemDefinitionIOActions } from "../base/Root/Module/ItemDefinition";
import Knex from "knex";
import Module from "../base/Root/Module";
import {
  CURRENCY_FACTORS_UPDATED_EVENT,
  REGISTER_REQUEST,
  IRegisterRequest,
  OWNED_SEARCH_REGISTER_REQUEST,
  IOwnedSearchRegisterRequest,
  PARENTED_SEARCH_REGISTER_REQUEST,
  IParentedSearchRegisterRequest,
  IDENTIFY_REQUEST,
  IIdentifyRequest,
  FEEDBACK_REQUEST,
  OWNED_SEARCH_FEEDBACK_REQUEST,
  PARENTED_SEARCH_FEEDBACK_REQUEST,
  UNREGISTER_REQUEST,
  OWNED_SEARCH_UNREGISTER_REQUEST,
  PARENTED_SEARCH_UNREGISTER_REQUEST,
  IFeedbackRequest,
  IParentedSearchFeedbackRequest,
  IOwnedSearchFeedbackRequest,
  IUnregisterRequest,
  IOwnedSearchUnregisterRequest,
  IParentedSearchUnregisterRequest,
  BUILDNUMBER_EVENT,
  OWNED_SEARCH_RECORDS_ADDED_EVENT,
  IOwnedSearchRecordsAddedEvent,
  IParentedSearchRecordsAddedEvent,
  PARENTED_SEARCH_RECORDS_ADDED_EVENT,
  CHANGED_FEEEDBACK_EVENT,
  IChangedFeedbackEvent,
  IDENTIFIED_EVENT,
  RegisterRequestSchema,
  OwnedSearchRegisterRequestSchema,
  ParentedSearchRegisterRequestSchema,
  IdentifyRequestSchema,
  FeedbackRequestSchema,
  OwnedSearchFeedbackRequestSchema,
  ParentedSearchFeedbackRequestSchema,
  UnregisterRequestSchema,
  OwnedSearchUnregisterRequestSchema,
  ParentedSearchUnregisterRequestSchema,
  ERROR_EVENT,
  IErrorEvent,
  KICKED_EVENT,
} from "../base/remote-protocol";
import { IGQLSearchRecord } from "../gql-querier";
import { convertVersionsIntoNullsWhenNecessary } from "./version-null-value";
import { logger } from ".";
import { SERVER_DATA_IDENTIFIER, SERVER_USER_KICK_IDENTIFIER,
  UNSPECIFIED_OWNER, MAX_REMOTE_LISTENERS_PER_SOCKET, GUEST_METAROLE, CURRENCY_FACTORS_IDENTIFIER } from "../constants";
import Ajv from "ajv";
import { jwtVerify } from "./token";
import { ISensitiveConfigRawJSONDataType } from "../config";
import { IServerSideTokenDataType } from "./resolvers/basic";

// Used to optimize, it is found out that passing unecessary logs to the transport
// can slow the logger down even if it won't display
const LOG_LEVEL = process.env.LOG_LEVEL;
const CAN_LOG_DEBUG = LOG_LEVEL === "debug" || LOG_LEVEL === "silly" || (!LOG_LEVEL && process.env.NODE_ENV !== "production");

const ajv = new Ajv();

const checkRegisterRequest =
  ajv.compile(RegisterRequestSchema);

const checkOwnedSearchRegisterRequest =
  ajv.compile(OwnedSearchRegisterRequestSchema);

const checkParentedSearchRegisterRequest =
  ajv.compile(ParentedSearchRegisterRequestSchema);

const checkIdentifyRequest =
  ajv.compile(IdentifyRequestSchema);

const checkFeedbackRequest =
  ajv.compile(FeedbackRequestSchema);

const checkOwnedSearchFeedbackRequest =
  ajv.compile(OwnedSearchFeedbackRequestSchema);

const checkParentedSearchFeedbackRequest =
  ajv.compile(ParentedSearchFeedbackRequestSchema);

const checkUnregisterRequest =
  ajv.compile(UnregisterRequestSchema);

const checkOwnedSearchUnregisterRequest =
  ajv.compile(OwnedSearchUnregisterRequestSchema);

const checkParentedSearchUnregisterRequest =
  ajv.compile(ParentedSearchUnregisterRequestSchema);

interface IListenerList {
  [socketId: string]: {
    socket: Socket;
    listens: {
      [mergedIndexIdentifier: string]: boolean;
    };
    amount: number;
    uuid: string;
    token: string;
    user: IServerSideTokenDataType;
  };
}

interface IServerListensList {
  [mergedIndexIdentifier: string]: boolean;
}

const INSTANCE_MODE = process.env.INSTANCE_MODE || "ABSOLUTE";
const INSTANCE_GROUP_ID = process.env.INSTANCE_GROUP_ID || "UNIDENTIFIED";

const CLUSTER_MANAGER_REGISTER_SS = "CLUSTER_MANAGER_REGISTER_SS";

export class Listener {
  private io: ioMain.Server;

  private listeners: IListenerList = {};
  private listensSS: IServerListensList = {};

  private redisSub: RedisClient;
  private redisPub: RedisClient;
  private redisLocalSub: RedisClient;
  private redisLocalPub: RedisClient;
  private buildnumber: string;
  private root: Root;
  private knex: Knex;
  private cache: Cache;
  private sensitiveConfig: ISensitiveConfigRawJSONDataType;

  constructor(
    buildnumber: string,
    redisSub: RedisClient,
    redisPub: RedisClient,
    redisLocalSub: RedisClient,
    redisLocalPub: RedisClient,
    root: Root,
    cache: Cache,
    knex: Knex,
    server: Server,
    sensitiveConfig: ISensitiveConfigRawJSONDataType,
  ) {
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
    this.redisSub.subscribe(SERVER_DATA_IDENTIFIER);
    if (INSTANCE_MODE === "ABSOLUTE" || INSTANCE_MODE === "CLUSTER_MANAGER") {
      this.redisLocalSub.on("message", this.pubSubLocalTriggerListeners);
      this.redisLocalSub.subscribe(CLUSTER_MANAGER_REGISTER_SS);
    }

    if (server === null) {
      return;
    }

    this.io = ioMain(server);
    this.io.on("connection", (socket) => {
      this.addSocket(socket);
      socket.on(REGISTER_REQUEST, (request: IRegisterRequest) => {
        this.register(socket, request);
      });
      socket.on(OWNED_SEARCH_REGISTER_REQUEST, (request: IOwnedSearchRegisterRequest) => {
        this.ownedSearchRegister(socket, request);
      });
      socket.on(PARENTED_SEARCH_REGISTER_REQUEST, (request: IParentedSearchRegisterRequest) => {
        this.parentedSearchRegister(socket, request);
      });
      socket.on(IDENTIFY_REQUEST, (request: IIdentifyRequest) => {
        this.identify(socket, request);
      });
      socket.on(FEEDBACK_REQUEST, (request: IFeedbackRequest) => {
        this.feedback(socket, request);
      });
      socket.on(OWNED_SEARCH_FEEDBACK_REQUEST, (request: IOwnedSearchFeedbackRequest) => {
        this.ownedSearchFeedback(socket, request);
      });
      socket.on(PARENTED_SEARCH_FEEDBACK_REQUEST, (request: IParentedSearchFeedbackRequest) => {
        this.parentedSearchFeedback(socket, request);
      });
      socket.on(UNREGISTER_REQUEST, (request: IUnregisterRequest) => {
        this.unregister(socket, request);
      });
      socket.on(OWNED_SEARCH_UNREGISTER_REQUEST, (request: IOwnedSearchUnregisterRequest) => {
        this.ownedSearchUnregister(socket, request);
      });
      socket.on(PARENTED_SEARCH_UNREGISTER_REQUEST, (request: IParentedSearchUnregisterRequest) => {
        this.parentedSearchUnregister(socket, request);
      });
      socket.on("disconnect", () => {
        this.removeSocket(socket);
      });
    });
  }
  public addSocket(
    socket: Socket,
  ) {
    socket.emit(
      BUILDNUMBER_EVENT,
      {
        buildnumber: this.buildnumber,
      },
    );
  }
  public emitError(
    socket: Socket,
    message: string,
    request: any,
  ) {
    const error: IErrorEvent = {
      message,
      request,
    }
    socket.emit(
      ERROR_EVENT,
      error,
    );
  }
  public sendKickEvent(
    userId: number,
  ) {
    this.onReceiveKickEvent(userId);
    this.redisPub.publish(SERVER_USER_KICK_IDENTIFIER, JSON.stringify({
      userId,
      serverInstanceGroupId: INSTANCE_GROUP_ID,
    }));
  }
  public onReceiveKickEvent(
    userId: number,
  ) {
    Object.keys(this.listeners).forEach((socketKey) => {
      const socket = this.listeners[socketKey].socket;
      const user = this.listeners[socketKey].user;
      if (user.id === userId) {
        this.kick(socket);
      }
    });
  }
  public kick(
    socket: Socket,
  ) {
    this.removeSocket(socket);
    socket.emit(
      KICKED_EVENT,
    );

    // Force to reidentify and reattach everything
    setTimeout(() => {
      if (socket.connected) {
        socket.disconnect();
      }
    }, 300);
  }
  public async identify(
    socket: Socket,
    request: IIdentifyRequest,
  ) {
    const valid = checkIdentifyRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.identify: can't indentify due to invalid request",
        {
          errors: checkIdentifyRequest.errors,
        }
      );
      this.emitError(socket, "can't identify user due to invalid request", request);
      return;
    }

    let invalid = false;
    let invalidReason: string;
    let result: IServerSideTokenDataType;
    if (request.token) {
      try {
        result = await jwtVerify<IServerSideTokenDataType>(request.token, this.sensitiveConfig.jwtKey);
        invalid = (
          typeof result.id !== "number" ||
          typeof result.role !== "string" ||
          typeof result.sessionId !== "number"
        );
      } catch (err) {
        invalid = true;
        invalidReason = "invalid token";
      }

      if (!invalid) {
        const sqlResult = await this.cache.requestValue(
          ["MOD_users__IDEF_user", "MOD_users"], result.id, null,
        );

        if (!sqlResult) {
          invalid = true;
          invalidReason = "user deleted";
        } else if (sqlResult.blocked_at) {
          invalid = true;
          invalidReason = "user blocked";
        } else if ((sqlResult.session_id || 0) !== result.sessionId) {
          invalid = true;
          invalidReason = "session id mismatch";
        } else if (sqlResult.role !== result.role) {
          invalid = true;
          invalidReason = "role mismatch";
        }
      }
    } else {
      result = {
        id: null,
        role: GUEST_METAROLE,
        sessionId: null,
      };
    }

    if (invalid) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.identify: socket " + socket.id + " failed to identify due to " + invalidReason,
      );
      this.emitError(socket, "failed to identify due to " + invalidReason, request);

      // yes kick the socket, why was it using an invalid token to start with, that's fishy
      this.kick(socket);
    } else {
      if (!this.listeners[socket.id]) {
        CAN_LOG_DEBUG && logger.debug(
          "Listener.identify: socket " + socket.id + " provides initial identification",
        );
        this.listeners[socket.id] = {
          socket,
          listens: {},
          uuid: request.uuid,
          token: request.token,
          amount: 0,
          user: result,
        };
      } else {
        CAN_LOG_DEBUG && logger.debug(
          "Listener.identify: socket " + socket.id + " updates identification criteria",
        );
        this.listeners[socket.id].uuid = request.uuid;
        this.listeners[socket.id].token = request.token;
        this.listeners[socket.id].user = result;
      }

      socket.emit(
        IDENTIFIED_EVENT,
      );
    }
  }
  public registerSS(
    request: IRegisterRequest,
  ) {
    const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
    CAN_LOG_DEBUG && logger.debug(
      "Listener.registerSS: Server instance requested subscribe to " + mergedIndexIdentifier,
    );

    if (INSTANCE_MODE !== "CLUSTER_MANAGER" && INSTANCE_MODE !== "ABSOLUTE") {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.registerSS: instance is not cluster manager nor absolute piping request to cluster manager",
      );
      this.redisLocalPub.publish(CLUSTER_MANAGER_REGISTER_SS, JSON.stringify(request));
    } else if (INSTANCE_MODE === "CLUSTER_MANAGER" || INSTANCE_MODE === "ABSOLUTE") {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.registerSS: performing subscription as cluster manager",
      );
      this.redisSub.subscribe(mergedIndexIdentifier);
      this.listensSS[mergedIndexIdentifier] = true;
    } else {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.registerSS: invalid instance attempting a server side registration " + INSTANCE_MODE,
      );
    }
  }
  public async register(
    socket: Socket,
    request: IRegisterRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.register: can't register listener to an unidentified socket " + socket.id,
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkRegisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.register: can't register listener due to invalid request",
        {
          errors: checkRegisterRequest.errors,
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }

    // do not allow more than MAX_REMOTE_LISTENERS_PER_SOCKET concurrent listeners
    if (listenerData.amount > MAX_REMOTE_LISTENERS_PER_SOCKET) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.register: socket " + socket.id + " has exceeded the amount of listeners it can attach",
      );
      this.emitError(socket, "exceeded socket max listeners per socket", request);
      return;
    }

    const itemDefinition: ItemDefinition = this.root.registry[request.itemDefinition] as ItemDefinition;
    if (!itemDefinition || !(itemDefinition instanceof ItemDefinition)) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.register: could not find " + request.itemDefinition,
      );
      this.emitError(socket, "could not find item definition", request);
      return;
    }
    const value = await this.cache.requestValue(itemDefinition, request.id, request.version);
    const creator = value ? (itemDefinition.isOwnerObjectId() ? value.id : value.created_by) : UNSPECIFIED_OWNER;
    const hasAccess = itemDefinition.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      listenerData.user.role,
      listenerData.user.id,
      creator,
      {},
      false,
    );
    if (!hasAccess) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.register: socket " + socket.id + " with user " + listenerData.user.id +
        " with role " + listenerData.user.role + " cannot listen to " + itemDefinition,
      );
      this.emitError(socket, "user has not access", request);
      return;
    }

    const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
    if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.register: Subscribing socket " + socket.id + " to " + mergedIndexIdentifier,
      );
      this.redisSub.subscribe(mergedIndexIdentifier);
      this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
      this.listeners[socket.id].amount++;
    }
  }
  public ownedSearchRegister(
    socket: Socket,
    request: IOwnedSearchRegisterRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.ownedSearchRegister: can't register listener to an unidentified socket " + socket.id,
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkOwnedSearchRegisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.ownedSearchRegister: can't register listener due to invalid request",
        {
          errors: checkOwnedSearchRegisterRequest.errors,
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }

    // do not allow more than MAX_REMOTE_LISTENERS_PER_SOCKET concurrent listeners
    if (listenerData.amount > MAX_REMOTE_LISTENERS_PER_SOCKET) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.ownedSearchRegister: socket " + socket.id + " has exceeded the amount of listeners it can attach",
      );
      this.emitError(socket, "exceeded socket max listeners per socket", request);
      return;
    }

    const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
    let hasAccess: boolean;
    if (!itemDefinitionOrModule) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.ownedSearchRegister: could not find item definition or module for " + request.qualifiedPathName,
      );
      this.emitError(socket, "could not find item definition or module", request);
      return;
    } else {
      hasAccess = itemDefinitionOrModule.checkRoleAccessFor(
        ItemDefinitionIOActions.READ,
        listenerData.user.role,
        listenerData.user.id,
        UNSPECIFIED_OWNER,
        {},
        false,
      )
    }
    if (!hasAccess) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.ownedSearchRegister: socket " + socket.id + " with user " + listenerData.user.id +
        " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName,
      );
      this.emitError(socket, "user has not access", request);
      return;
    }

    const mergedIndexIdentifier = "OWNED_SEARCH." + request.qualifiedPathName + "." + request.createdBy;
    if (!listenerData.listens[mergedIndexIdentifier]) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.ownedSearchRegister: Subscribing socket " + socket.id + " to " + mergedIndexIdentifier,
      );
      this.redisSub.subscribe(mergedIndexIdentifier);
      listenerData.listens[mergedIndexIdentifier] = true;
      listenerData.amount++;
    }
  }
  public parentedSearchRegister(
    socket: Socket,
    request: IParentedSearchRegisterRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.parentedSearchRegister: can't register listener to an unidentified socket " + socket.id,
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkParentedSearchRegisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.parentedSearchRegister: can't register listener due to invalid request",
        {
          errors: checkParentedSearchRegisterRequest.errors,
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }

    // do not allow more than MAX_REMOTE_LISTENERS_PER_SOCKET concurrent listeners
    if (this.listeners[socket.id].amount > MAX_REMOTE_LISTENERS_PER_SOCKET) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.parentedSearchRegister: socket " + socket.id + " has exceeded the amount of listeners it can attach",
      );
      this.emitError(socket, "exceeded socket max listeners per socket", request);
      return;
    }

    const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
    let hasAccess: boolean;
    if (!itemDefinitionOrModule) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.parentedSearchRegister: could not find item definition or module for " + request.qualifiedPathName,
      );
      this.emitError(socket, "could not find item definition or module", request);
      return;
    } else {
      hasAccess = itemDefinitionOrModule.checkRoleAccessFor(
        ItemDefinitionIOActions.READ,
        listenerData.user.role,
        listenerData.user.id,
        UNSPECIFIED_OWNER,
        {},
        false,
      )
    }
    if (!hasAccess) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.parentedSearchRegister: socket " + socket.id + " with user " + listenerData.user.id +
        " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName,
      );
      this.emitError(socket, "user has not access", request);
      return;
    }

    const mergedIndexIdentifier = "PARENTED_SEARCH." + request.qualifiedPathName + "." +
      request.parentType + "." + request.parentId + "." + (request.parentVersion || "");
    if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.parentedSearchRegister: Subscribing socket " + socket.id + " to " + mergedIndexIdentifier,
      );
      this.redisSub.subscribe(mergedIndexIdentifier);
      this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
      this.listeners[socket.id].amount++;
    }
  }
  public async ownedSearchFeedback(
    socket: Socket,
    request: IOwnedSearchFeedbackRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.ownedSearchFeedback: can't give feedback to an unidentified socket " + socket.id,
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkOwnedSearchFeedbackRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.ownedSearchFeedback: can't give feedback due to invalid request",
        {
          errors: checkOwnedSearchFeedbackRequest.errors,
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }
    try {
      const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
      if (!itemDefinitionOrModule) {
        CAN_LOG_DEBUG && logger.debug(
          "Listener.ownedSearchFeedback: could not find " + request.qualifiedPathName,
        );
        this.emitError(socket, "could not find item definition or module", request);
        return;
      }

      let mod: Module;
      let requiredType: string = null;
      if (itemDefinitionOrModule instanceof ItemDefinition) {
        mod = itemDefinitionOrModule.getParentModule();
        requiredType = request.qualifiedPathName;
      } else {
        mod = itemDefinitionOrModule;
      }

      const hasAccess = itemDefinitionOrModule.checkRoleAccessFor(
        ItemDefinitionIOActions.READ,
        listenerData.user.role,
        listenerData.user.id,
        request.createdBy,
        {},
        false,
      )
      if (!hasAccess) {
        CAN_LOG_DEBUG && logger.debug(
          "Listener.ownedSearchFeedback: socket " + socket.id + " with user " + listenerData.user.id +
          " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName,
        );
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

      const newRecords: ISQLTableRowValue[] = (await query).map(convertVersionsIntoNullsWhenNecessary);

      if (newRecords.length) {
        const event: IOwnedSearchRecordsAddedEvent = {
          createdBy: request.createdBy,
          qualifiedPathName: request.qualifiedPathName,
          newRecords: newRecords as IGQLSearchRecord[],
          // this contains all the data and the new record has the right form
          newLastRecordDate: (newRecords[0] as IGQLSearchRecord).created_at,
        };
        CAN_LOG_DEBUG && logger.debug(
          "Listener.ownedSearchFeedback: triggering " + OWNED_SEARCH_RECORDS_ADDED_EVENT,
          event,
        );
        socket.emit(
          OWNED_SEARCH_RECORDS_ADDED_EVENT,
          event,
        );
      }
    } catch (err) {
      logger.error(
        "Listener.ownedSearchFeedback: failed to provide feedback",
        {
          errMessage: err.message,
          errStack: err.stack,
        }
      );
    }
  }
  public async parentedSearchFeedback(
    socket: Socket,
    request: IParentedSearchFeedbackRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.parentedSearchFeedback: can't give feedback to an unidentified socket " + socket.id,
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }
    
    const valid = checkParentedSearchFeedbackRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.parentedSearchFeedback: can't register listener due to invalid request",
        {
          errors: checkParentedSearchFeedbackRequest.errors,
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }
    try {
      const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
      if (!itemDefinitionOrModule) {
        CAN_LOG_DEBUG && logger.debug(
          "Listener.parentedSearchFeedback: could not find " + request.qualifiedPathName,
        );
        this.emitError(socket, "could not find item definition or module", request);
        return;
      }

      let mod: Module;
      let requiredType: string = null;
      if (itemDefinitionOrModule instanceof ItemDefinition) {
        mod = itemDefinitionOrModule.getParentModule();
        requiredType = request.qualifiedPathName;
      } else {
        mod = itemDefinitionOrModule;
      }

      const hasAccess = itemDefinitionOrModule.checkRoleAccessFor(
        ItemDefinitionIOActions.READ,
        listenerData.user.role,
        listenerData.user.id,
        UNSPECIFIED_OWNER,
        {},
        false,
      )
      if (!hasAccess) {
        CAN_LOG_DEBUG && logger.debug(
          "Listener.parentedSearchFeedback: socket " + socket.id + " with user " + listenerData.user.id +
          " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName,
        );
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

      const newRecords: ISQLTableRowValue[] = (await query).map(convertVersionsIntoNullsWhenNecessary);

      if (newRecords.length) {
        const event: IParentedSearchRecordsAddedEvent = {
          parentId: request.parentId,
          parentVersion: request.parentVersion,
          parentType: request.parentType,
          qualifiedPathName: request.qualifiedPathName,
          newRecords: newRecords as IGQLSearchRecord[],
          newLastRecordDate: (newRecords[0] as IGQLSearchRecord).created_at,
        };
        CAN_LOG_DEBUG && logger.debug(
          "Listener.parentedSearchFeedback: emmitting " + PARENTED_SEARCH_RECORDS_ADDED_EVENT,
          event,
        );
        socket.emit(
          PARENTED_SEARCH_RECORDS_ADDED_EVENT,
          event,
        );
      }
    } catch (err) {
      logger.error(
        "Listener.parentedSearchFeedback: failed to provide feedback",
        {
          errMessage: err.message,
          errStack: err.stack,
        }
      );
    }
  }
  public async feedback(
    socket: Socket,
    request: IFeedbackRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.feedback: can't give feedback to an unidentified socket " + socket.id,
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkFeedbackRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.feedback: can't register listener due to invalid request",
        {
          errors: checkFeedbackRequest.errors,
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }

    const itemDefinition: ItemDefinition = this.root.registry[request.itemDefinition] as ItemDefinition;
    if (!itemDefinition || !(itemDefinition instanceof ItemDefinition)) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.register: could not find " + request.itemDefinition,
      );
      this.emitError(socket, "could not find item definition", request);
      return;
    }

    const value = await this.cache.requestValue(itemDefinition, request.id, request.version);
    const creator = value ? (itemDefinition.isOwnerObjectId() ? value.id : value.created_by) : UNSPECIFIED_OWNER;
    const hasAccess = itemDefinition.checkRoleAccessFor(
      ItemDefinitionIOActions.READ,
      listenerData.user.role,
      listenerData.user.id,
      creator,
      {},
      false,
    );
    if (!hasAccess) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.register: socket " + socket.id + " with user " + listenerData.user.id +
        " with role " + listenerData.user.role + " cannot listen to " + itemDefinition,
      );
      this.emitError(socket, "user has not access", request);
      return;
    }

    try {
      const itemDefinition: ItemDefinition = this.root.registry[request.itemDefinition] as ItemDefinition;
      if (!itemDefinition || !(itemDefinition instanceof ItemDefinition)) {
        CAN_LOG_DEBUG && logger.debug(
          "Listener.feedback: could not find " + request.itemDefinition,
        );
        this.emitError(socket, "could not find item definition", request);
        return;
      }
      const queriedResult: ISQLTableRowValue = await this.cache.requestValue(
        itemDefinition, request.id, request.version,
      );
      if (queriedResult) {
        const event: IChangedFeedbackEvent = {
          itemDefinition: request.itemDefinition,
          id: request.id,
          version: request.version,
          type: "last_modified",
          lastModified: queriedResult.last_modified,
        };
        CAN_LOG_DEBUG && logger.debug(
          "Listener.feedback: emitting " + CHANGED_FEEEDBACK_EVENT,
          event,
        );
        socket.emit(
          CHANGED_FEEEDBACK_EVENT,
          event,
        );
      } else {
        const event: IChangedFeedbackEvent = {
          itemDefinition: request.itemDefinition,
          id: request.id,
          version: request.version,
          type: "not_found",
          lastModified: null,
        };
        CAN_LOG_DEBUG && logger.debug(
          "Listener.feedback: emitting " + CHANGED_FEEEDBACK_EVENT,
          event,
        );
        socket.emit(
          CHANGED_FEEEDBACK_EVENT,
          event,
        );
      }
    } catch (err) {
      logger.error(
        "Listener.feedback: failed to provide feedback",
        {
          errMessage: err.message,
          errStack: err.stack,
        }
      );
    }
  }
  public removeListenerFinal(
    mergedIndexIdentifier: string,
  ) {
    const noSocketsListeningLeft = !this.listensSS[mergedIndexIdentifier] && Object.keys(this.listeners).every((socketId) => {
      return !this.listeners[socketId].listens[mergedIndexIdentifier];
    });
    if (noSocketsListeningLeft) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.removeListenerFinal: founds no sockets left for " + mergedIndexIdentifier + " plugging off redis",
      );
      this.redisSub.unsubscribe(mergedIndexIdentifier);
    }
  }
  public removeListener(
    socket: Socket,
    mergedIndexIdentifier: string,
  ) {
    const listenerData = this.listeners[socket.id];
    if (listenerData && listenerData.listens[mergedIndexIdentifier]) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.removeListener: unsubscribing socket " + socket.id + " from " + mergedIndexIdentifier,
      );
      delete listenerData.listens[mergedIndexIdentifier];
      listenerData.amount--;
      this.removeListenerFinal(mergedIndexIdentifier);
    }
  }

  /**
   * This method only reasonable gets called by the CLUSTER_MANAGER or in absolute mode
   * @param request 
   */
  public unregisterSS(
    request: IUnregisterRequest,
  ) {
    const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
    if (this.listensSS[mergedIndexIdentifier]) {
      delete this.listensSS[mergedIndexIdentifier];
      this.removeListenerFinal(mergedIndexIdentifier);
    }
  }
  public unregister(
    socket: Socket,
    request: IUnregisterRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.unregister: can't unregister an unidentified socket " + socket.id,
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkUnregisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.unregister: can't unregister due to invalid request",
        {
          errors: checkUnregisterRequest.errors,
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }
    const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
    this.removeListener(socket, mergedIndexIdentifier);
  }
  public ownedSearchUnregister(
    socket: Socket,
    request: IOwnedSearchUnregisterRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.ownedSearchUnregister: can't owned search unregister an unidentified socket " + socket.id,
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkOwnedSearchUnregisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.ownedSearchUnregister: can't unregister due to invalid request",
        {
          errors: checkOwnedSearchUnregisterRequest.errors,
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }
    const mergedIndexIdentifier = "OWNED_SEARCH." + request.qualifiedPathName + "." + request.createdBy;
    this.removeListener(socket, mergedIndexIdentifier);
  }
  public parentedSearchUnregister(
    socket: Socket,
    request: IParentedSearchUnregisterRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.parentedSearchUnregister: can't parent search unregister an unidentified socket " + socket.id,
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkParentedSearchUnregisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.parentedSearchUnregister: can't unregister due to invalid request",
        {
          errors: checkParentedSearchUnregisterRequest.errors,
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }
    const mergedIndexIdentifier = "PARENTED_SEARCH." + request.qualifiedPathName + "." + request.parentType +
      "." + request.parentId + "." + (request.parentVersion || "");
    this.removeListener(socket, mergedIndexIdentifier);
  }
  public triggerChangedListeners(
    event: IChangedFeedbackEvent,
    data: ISQLTableRowValue,
    listenerUUID: string,
  ) {
    const mergedIndexIdentifier = event.itemDefinition + "." + event.id + "." + (event.version || "");
    const redisEvent = {
      event,
      listenerUUID,
      serverInstanceGroupId: INSTANCE_GROUP_ID,
      mergedIndexIdentifier,
      eventType: CHANGED_FEEEDBACK_EVENT,
      data,
    };
    CAN_LOG_DEBUG && logger.debug(
      "Listener.triggerChangedListeners: triggering redis event",
      redisEvent,
    );
    this.redisPub.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
  }
  public triggerOwnedSearchListeners(
    event: IOwnedSearchRecordsAddedEvent,
    listenerUUID: string,
  ) {
    const mergedIndexIdentifier = "OWNED_SEARCH." + event.qualifiedPathName + "." + event.createdBy;
    const redisEvent = {
      event,
      listenerUUID,
      mergedIndexIdentifier,
      eventType: OWNED_SEARCH_RECORDS_ADDED_EVENT,
    };
    CAN_LOG_DEBUG && logger.debug(
      "Listener.triggerOwnedSearchListeners: triggering redis event",
      redisEvent,
    );
    this.redisPub.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
  }
  public triggerParentedSearchListeners(
    event: IParentedSearchRecordsAddedEvent,
    listenerUUID: string,
  ) {
    const mergedIndexIdentifier = "PARENTED_SEARCH." + event.qualifiedPathName + "." + event.parentType +
      "." + event.parentId + "." + (event.parentVersion || "");
    const redisEvent = {
      event,
      listenerUUID,
      mergedIndexIdentifier,
      eventType: PARENTED_SEARCH_RECORDS_ADDED_EVENT,
    }
    CAN_LOG_DEBUG && logger.debug(
      "Listener.triggerParentedSearchListeners: triggering redis event",
      redisEvent,
    );
    this.redisPub.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
  }
  public pubSubTriggerListeners(
    channel: string,
    message: string,
  ) {
    const parsedContent = JSON.parse(message);
    CAN_LOG_DEBUG && logger.debug(
      "Listener.pubSubTriggerListeners: received redis event",
      parsedContent,
    );

    if (channel === SERVER_DATA_IDENTIFIER) {
      this.cache.onServerDataChangeInformed(parsedContent);
      this.io.emit(
        CURRENCY_FACTORS_UPDATED_EVENT,
      );
      return;
    }

    if (channel === SERVER_USER_KICK_IDENTIFIER) {
      const serverInstanceGroupId = parsedContent.serverInstanceGroupId;
      if (serverInstanceGroupId === INSTANCE_GROUP_ID) {
        CAN_LOG_DEBUG && logger.debug(
          "Listener.pubSubTriggerListeners: our own instance group id " + INSTANCE_GROUP_ID + " was the emitter, ignoring event",
        );
      } else if (typeof parsedContent.userId === "number") {
        this.onReceiveKickEvent(parsedContent.userId);
      }
      return;
    }

    // only the cluster manager and absolute happens to recieve these
    if (this.listensSS[parsedContent.mergedIndexIdentifier]) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.pubSubTriggerListeners: our own server is expecting it",
      );

      const serverInstanceGroupId = parsedContent.serverInstanceGroupId;
      if (serverInstanceGroupId === INSTANCE_GROUP_ID) {
        CAN_LOG_DEBUG && logger.debug(
          "Listener.pubSubTriggerListeners: our own instance group id " + INSTANCE_GROUP_ID + " was the emitter, ignoring event",
        );
      } else {
        const event: IChangedFeedbackEvent = parsedContent.event;
        if (typeof parsedContent.data === "undefined") {
          this.cache.onChangeInformedNoData(event.itemDefinition, event.id, event.version || null);
        } else {
          this.cache.onChangeInformed(event.itemDefinition, event.id, event.version || null, parsedContent.data);
        }
      }
    }

    Object.keys(this.listeners).forEach((socketKey) => {
      const whatListening = this.listeners[socketKey].listens;
      if (whatListening[parsedContent.mergedIndexIdentifier] &&
        this.listeners[socketKey].uuid !== parsedContent.listenerUUID) {
        CAN_LOG_DEBUG && logger.debug(
          "Listener.pubSubTriggerListeners: socket " + socketKey + " was expecting it, emitting",
        );
        this.listeners[socketKey].socket.emit(
          parsedContent.eventType,
          parsedContent.event,
        );
      }
    });
  }
  public pubSubLocalTriggerListeners(
    channel: string,
    message: string,
  ) {
    const parsedContent: IRegisterRequest = JSON.parse(message);
    CAN_LOG_DEBUG && logger.debug(
      "Listener.pubSubLocalTriggerListeners: cluster manager recieved register event",
      parsedContent,
    );

    this.registerSS(parsedContent);
  }
  public removeSocket(socket: Socket) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      return;
    }

    CAN_LOG_DEBUG && logger.debug(
      "Listener.removeSocket: removing socket " + socket.id,
    );

    Object.keys(listenerData.listens).forEach((listensMergedIdentifier) => {
      const noSocketsListeningLeft = !this.listensSS[listensMergedIdentifier] &&
        Object.keys(this.listeners).every((socketId) => {
          if (socketId === socket.id) {
            return true;
          }
          return !this.listeners[socketId].listens[listensMergedIdentifier];
        });
      if (noSocketsListeningLeft) {
        CAN_LOG_DEBUG && logger.debug(
          "Listener.removeSocket: redis unsubscribing off " + listensMergedIdentifier,
        );
        this.redisSub.unsubscribe(listensMergedIdentifier);
      }
    });
    delete this.listeners[socket.id];
  }
}
