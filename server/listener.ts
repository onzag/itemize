import { Socket } from "socket.io";
import { ISQLTableRowValue } from "../base/Root/sql";
import { Cache } from "./cache";
import { Server } from "http";
import Root, { ICustomRoleManager } from "../base/Root";
import ioMain from "socket.io";
import ItemDefinition, { ItemDefinitionIOActions } from "../base/Root/Module/ItemDefinition";
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
  OWNED_SEARCH_RECORDS_EVENT,
  IOwnedSearchRecordsEvent,
  IParentedSearchRecordsEvent,
  PARENTED_SEARCH_RECORDS_EVENT,
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
  IRedisEvent,
} from "../base/remote-protocol";
import { IGQLSearchRecord } from "../gql-querier";
import { convertVersionsIntoNullsWhenNecessary } from "./version-null-value";
import { logger } from ".";
import {
  SERVER_DATA_IDENTIFIER, SERVER_USER_KICK_IDENTIFIER,
  UNSPECIFIED_OWNER, MAX_REMOTE_LISTENERS_PER_SOCKET, GUEST_METAROLE, CURRENCY_FACTORS_IDENTIFIER, DELETED_REGISTRY_IDENTIFIER
} from "../constants";
import Ajv from "ajv";
import { jwtVerify } from "./token";
import { ISensitiveConfigRawJSONDataType } from "../config";
import { IServerSideTokenDataType } from "./resolvers/basic";
import { ItemizeRedisClient } from "./redis";
import { findLastRecordLastModifiedDate } from "./resolvers/actions/search";
import { CustomRoleGranterEnvironment, CustomRoleManager, ICustomRoleType } from "./resolvers/roles";
import { convertSQLValueToGQLValueForItemDefinition } from "../base/Root/Module/ItemDefinition/sql";
import { ItemizeRawDB } from "./raw-db";

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
const CLUSTER_MANAGER_RESET = "CLUSTER_MANAGER_RESET";

export class Listener {
  private io: ioMain.Server;

  private listeners: IListenerList = {};
  private listensSS: IServerListensList = {};

  private redisGlobalSub: ItemizeRedisClient;
  private redisGlobalPub: ItemizeRedisClient;
  private redisLocalSub: ItemizeRedisClient;
  private redisLocalPub: ItemizeRedisClient;
  private buildnumber: string;
  private root: Root;
  private rawDB: ItemizeRawDB;
  private cache: Cache;
  private sensitiveConfig: ISensitiveConfigRawJSONDataType;
  private server: Server;
  private customRoles: ICustomRoleType[];

  constructor(
    buildnumber: string,
    redisGlobalSub: ItemizeRedisClient,
    redisGlobalPub: ItemizeRedisClient,
    redisLocalSub: ItemizeRedisClient,
    redisLocalPub: ItemizeRedisClient,
    root: Root,
    cache: Cache,
    rawDB: ItemizeRawDB,
    server: Server,
    customRoles: ICustomRoleType[],
    sensitiveConfig: ISensitiveConfigRawJSONDataType,
  ) {
    this.redisGlobalSub = redisGlobalSub;
    this.redisGlobalPub = redisGlobalPub;
    this.redisLocalSub = redisLocalSub;
    this.redisLocalPub = redisLocalPub;
    this.buildnumber = buildnumber;
    this.root = root;
    this.cache = cache;
    this.rawDB = rawDB;
    this.sensitiveConfig = sensitiveConfig;
    this.customRoles = customRoles;

    this.cache.setListener(this);

    this.die = this.die.bind(this);
    this.revive = this.revive.bind(this);

    this.globalRedisListener = this.globalRedisListener.bind(this);
    this.localRedisListener = this.localRedisListener.bind(this);

    this.redisGlobalSub.redisClient.on("message", this.globalRedisListener);
    this.redisGlobalSub.redisClient.subscribe(SERVER_DATA_IDENTIFIER);
    this.redisGlobalSub.redisClient.on("error", this.die);
    this.redisGlobalSub.redisClient.on("connect", this.revive);

    this.redisLocalSub.redisClient.on("message", this.localRedisListener);
    this.redisLocalSub.redisClient.on("error", this.die);
    this.redisLocalSub.redisClient.on("connect", this.revive);

    if (INSTANCE_MODE === "ABSOLUTE" || INSTANCE_MODE === "CLUSTER_MANAGER") {
      this.redisLocalSub.redisClient.subscribe(CLUSTER_MANAGER_REGISTER_SS);
    } else {
      this.redisLocalSub.redisClient.subscribe(CLUSTER_MANAGER_RESET);
    }

    this.server = server;
    this.setupSocketIO();
  }
  public die() {

  }
  public async revive() {
    this.listeners = {};
    this.listensSS = {};

    // kick all the clients force them to reconnect
    this.onClusterManagerResetInformed();

    // we cannot ensure that the main cache
    // hasn't gone stale because the events mechanism
    // has broke off, this is a very drastic method
    // but should work nonetheless
    if (INSTANCE_MODE === "CLUSTER_MANAGER") {
      await this.cache.wipe();
      this.informClusterManagerReset();
    }
  }
  public setupSocketIO() {
    if (this.server === null) {
      return;
    }

    this.io = ioMain(this.server);
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
    userId: string,
  ) {
    this.onReceiveKickEvent(userId);
    const redisEvent: IRedisEvent = {
      type: SERVER_USER_KICK_IDENTIFIER,
      serverInstanceGroupId: INSTANCE_GROUP_ID,
      data: {
        userId,
      },
      source: "global",
    };
    this.redisGlobalPub.redisClient.publish(SERVER_USER_KICK_IDENTIFIER, JSON.stringify(redisEvent));
  }
  public onReceiveKickEvent(
    userId: string,
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
  ) {
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
          typeof result.id !== "string" ||
          typeof result.role !== "string" ||
          typeof result.sessionId !== "number"
        );
        invalidReason = "invalid token shape";
      } catch (err) {
        invalid = true;
        invalidReason = "invalid token";
      }

      if (!invalid) {
        let sqlResult: ISQLTableRowValue;
        try {
          sqlResult = await this.cache.requestValue(
            "MOD_users__IDEF_user", result.id, null,
          );
        } catch (err) {
          logger.error(
            "Listener.identify [SERIOUS]: socket " + socket.id + " failed to identify because of the cache failed",
            {
              errMessage: err.message,
              errStack: err.stack,
            }
          );
          return;
        }

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

    if (this.listensSS[mergedIndexIdentifier]) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.registerSS: already subscribed, ignoring",
      );
      return;
    }

    if (INSTANCE_MODE !== "CLUSTER_MANAGER" && INSTANCE_MODE !== "ABSOLUTE") {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.registerSS: instance is not cluster manager nor absolute piping request to cluster manager",
      );
      const redisEvent: IRedisEvent = {
        type: CLUSTER_MANAGER_REGISTER_SS,
        request,
        serverInstanceGroupId: INSTANCE_GROUP_ID,
        source: "local",
      }
      this.redisLocalPub.redisClient.publish(CLUSTER_MANAGER_REGISTER_SS, JSON.stringify(redisEvent));
    } else if (INSTANCE_MODE === "CLUSTER_MANAGER" || INSTANCE_MODE === "ABSOLUTE") {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.registerSS: performing subscription as cluster manager",
      );
      this.redisGlobalSub.redisClient.subscribe(mergedIndexIdentifier);
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
    let value: ISQLTableRowValue;
    try {
      value = await this.cache.requestValue(itemDefinition, request.id, request.version);
    } catch (err) {
      logger.error(
        "Listener.identify [SERIOUS]: socket " + socket.id + " could not register due to cache failure",
        {
          errMessage: err.message,
          errStack: err.stack,
        }
      );
      return;
    }
    const creator = value ? (itemDefinition.isOwnerObjectId() ? value.id : value.created_by) : UNSPECIFIED_OWNER;

    const rolesManager = new CustomRoleManager(
      this.customRoles,
      {
        cache: this.cache,
        databaseConnection: this.rawDB.databaseConnection,
        rawDB: this.rawDB,
        item: itemDefinition,
        tokenData: listenerData.user,
        module: itemDefinition.getParentModule(),
        root: this.root,
        value: value ? convertSQLValueToGQLValueForItemDefinition(
          this.cache.getServerData(),
          itemDefinition,
          value,
        ) : value,
        environment: CustomRoleGranterEnvironment.RETRIEVING,
        owner: value ? (itemDefinition.isOwnerObjectId() ? value.id : value.created_by) : null,
        parent: value && value.parent_id ? {
          id: value.parent_id,
          type: value.parent_type,
          version: value.parent_version || null,
        } : null,
      }
    );

    try {
      const hasAccess = await itemDefinition.checkRoleAccessFor(
        ItemDefinitionIOActions.READ,
        listenerData.user.role,
        listenerData.user.id,
        creator,
        {},
        rolesManager,
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
    } catch (err) {
      logger.error(
        "Listener.register: failed to register",
        {
          errMessage: err.message,
          errStack: err.stack,
        }
      );
      return;
    }

    const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
    if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.register: Subscribing socket " + socket.id + " to " + mergedIndexIdentifier,
      );
      this.redisGlobalSub.redisClient.subscribe(mergedIndexIdentifier);
      this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
      this.listeners[socket.id].amount++;
    }
  }
  public async ownedSearchRegister(
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
      const rolesManager = new CustomRoleManager(
        this.customRoles,
        {
          cache: this.cache,
          databaseConnection: this.rawDB.databaseConnection,
          rawDB: this.rawDB,
          item: itemDefinitionOrModule instanceof ItemDefinition ? itemDefinitionOrModule : null,
          tokenData: listenerData.user,
          module: itemDefinitionOrModule instanceof Module ? itemDefinitionOrModule : itemDefinitionOrModule.getParentModule(),
          root: this.root,
          value: null,
          environment: CustomRoleGranterEnvironment.SEARCHING,
          owner: request.createdBy,
          parent: null,
        }
      );
      try {
        hasAccess = await itemDefinitionOrModule.checkRoleAccessFor(
          ItemDefinitionIOActions.READ,
          listenerData.user.role,
          listenerData.user.id,
          UNSPECIFIED_OWNER,
          {},
          rolesManager,
          false,
        );
      } catch (err) {
        logger.error(
          "Listener.ownedSearchRegister: failed to register",
          {
            errMessage: err.message,
            errStack: err.stack,
          }
        );
        return;
      }
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
      this.redisGlobalSub.redisClient.subscribe(mergedIndexIdentifier);
      listenerData.listens[mergedIndexIdentifier] = true;
      listenerData.amount++;
    }
  }
  public async parentedSearchRegister(
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
      const rolesManager = new CustomRoleManager(
        this.customRoles,
        {
          cache: this.cache,
          databaseConnection: this.rawDB.databaseConnection,
          rawDB: this.rawDB,
          item: itemDefinitionOrModule instanceof ItemDefinition ? itemDefinitionOrModule : null,
          tokenData: listenerData.user,
          module: itemDefinitionOrModule instanceof Module ? itemDefinitionOrModule : itemDefinitionOrModule.getParentModule(),
          root: this.root,
          value: null,
          environment: CustomRoleGranterEnvironment.SEARCHING,
          owner: null,
          parent: {
            id: request.parentId,
            type: request.parentType,
            version: request.parentVersion,
          },
        }
      );
      try {
        hasAccess = await itemDefinitionOrModule.checkRoleAccessFor(
          ItemDefinitionIOActions.READ,
          listenerData.user.role,
          listenerData.user.id,
          UNSPECIFIED_OWNER,
          {},
          rolesManager,
          false,
        );
      } catch (err) {
        logger.error(
          "Listener.parentedSearchRegister: failed to register",
          {
            errMessage: err.message,
            errStack: err.stack,
          }
        );
        return;
      }
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
      this.redisGlobalSub.redisClient.subscribe(mergedIndexIdentifier);
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

      const rolesManager = new CustomRoleManager(
        this.customRoles,
        {
          cache: this.cache,
          databaseConnection: this.rawDB.databaseConnection,
          rawDB: this.rawDB,
          item: itemDefinitionOrModule instanceof ItemDefinition ? itemDefinitionOrModule : null,
          tokenData: listenerData.user,
          module: itemDefinitionOrModule instanceof Module ? itemDefinitionOrModule : itemDefinitionOrModule.getParentModule(),
          root: this.root,
          value: null,
          environment: CustomRoleGranterEnvironment.SEARCHING,
          owner: request.createdBy,
          parent: null,
        }
      );
      try {
        const hasAccess = await itemDefinitionOrModule.checkRoleAccessFor(
          ItemDefinitionIOActions.READ,
          listenerData.user.role,
          listenerData.user.id,
          request.createdBy,
          {},
          rolesManager,
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
      } catch (err) {
        logger.error(
          "Listener.ownedSearchFeedback: failed to provide feedback",
          {
            errMessage: err.message,
            errStack: err.stack,
          }
        );
        return;
      }

      const newAndModifiedRecordsSQL: ISQLTableRowValue[] = (await this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version", "type", "last_modified", ` + (
          request.lastModified ?
            `"created_at" > $1 AS "WAS_CREATED"` :
            `TRUE AS "WAS_CREATED"`
        ) + ` FROM ${JSON.stringify(mod.getQualifiedPathName())} WHERE ` + (
          requiredType ?
            `"type" = $2 AND ` :
            ""
        ) + (
          request.lastModified ?
            `"last_modified" > $3 AND ` :
            ""
        ) + `"created_by" = $4`,
        [
          request.lastModified || null,
          requiredType || null,
          request.lastModified || null,
          request.createdBy,
        ],
      )).map(convertVersionsIntoNullsWhenNecessary);

      const deletedQuery = this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version", "type", "transaction_time" FROM ${JSON.stringify(DELETED_REGISTRY_IDENTIFIER)} ` +
        `WHERE "module" = $1 AND "created_by" = $2 AND "transaction_time" > $3` +
        (
          requiredType ?
            ` AND "type" = $4` :
            ""
        ),
        [
          mod.getQualifiedPathName(),
          request.createdBy,
          request.lastModified,
          requiredType,
        ]
      );

      const lostRecords: IGQLSearchRecord[] = (await deletedQuery)
        .map(convertVersionsIntoNullsWhenNecessary).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.transaction_time,
          }
        ));

      const totalDiffRecordCount = newAndModifiedRecordsSQL.length + lostRecords.length;

      if (totalDiffRecordCount) {
        const newRecords: IGQLSearchRecord[] = newAndModifiedRecordsSQL.filter((r) => r.WAS_CREATED).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));
        const modifiedRecords: IGQLSearchRecord[] = newAndModifiedRecordsSQL.filter((r) => !r.WAS_CREATED).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));

        const event: IOwnedSearchRecordsEvent = {
          createdBy: request.createdBy,
          qualifiedPathName: request.qualifiedPathName,
          newRecords,
          lostRecords,
          modifiedRecords,
          newLastModified: findLastRecordLastModifiedDate(newRecords, lostRecords, modifiedRecords),
        };
        CAN_LOG_DEBUG && logger.debug(
          "Listener.ownedSearchFeedback: triggering " + OWNED_SEARCH_RECORDS_EVENT,
          event,
        );
        socket.emit(
          OWNED_SEARCH_RECORDS_EVENT,
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

      const rolesManager = new CustomRoleManager(
        this.customRoles,
        {
          cache: this.cache,
          databaseConnection: this.rawDB.databaseConnection,
          rawDB: this.rawDB,
          item: itemDefinitionOrModule instanceof ItemDefinition ? itemDefinitionOrModule : null,
          tokenData: listenerData.user,
          module: itemDefinitionOrModule instanceof Module ? itemDefinitionOrModule : itemDefinitionOrModule.getParentModule(),
          root: this.root,
          value: null,
          environment: CustomRoleGranterEnvironment.SEARCHING,
          owner: null,
          parent: {
            id: request.parentId,
            type: request.parentType,
            version: request.parentVersion,
          },
        }
      );

      try {
        const hasAccess = await itemDefinitionOrModule.checkRoleAccessFor(
          ItemDefinitionIOActions.READ,
          listenerData.user.role,
          listenerData.user.id,
          UNSPECIFIED_OWNER,
          {},
          rolesManager,
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
      } catch (err) {
        logger.error(
          "Listener.parentedSearchFeedback: failed to provide feedback",
          {
            errMessage: err.message,
            errStack: err.stack,
          }
        );
        return;
      }

      const newAndModifiedRecordsSQL: ISQLTableRowValue[] = (await this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version", "type", "last_modified", ` + (
          request.lastModified ?
            `"created_at" > $1 AS "WAS_CREATED"` :
            `TRUE AS "WAS_CREATED"`
        ) + ` FROM ${JSON.stringify(mod.getQualifiedPathName())} WHERE ` + (
          requiredType ?
            `"type" = $2 AND ` :
            ""
        ) + (
          request.lastModified ?
            `"last_modified" > $3 AND ` :
            ""
        ) + `"parent_id" = $4 AND "parent_version" = $5 AND "parent_type" = $6`,
        [
          request.lastModified || null,
          requiredType || null,
          request.lastModified || null,
          request.parentId,
          request.parentVersion || "",
          request.parentType,
        ],
      )).map(convertVersionsIntoNullsWhenNecessary);

      const parentingId = request.parentType + "." + request.parentId + "." + (request.parentVersion || "");

      const deletedQuery = this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version", "type", "transaction_time" FROM ${JSON.stringify(DELETED_REGISTRY_IDENTIFIER)} ` +
        `WHERE "module" = $1 AND "parenting_id" = $2 AND "transaction_time" > $3` +
        (
          requiredType ?
            ` AND "type" = $4` :
            ""
        ),
        [
          mod.getQualifiedPathName(),
          parentingId,
          request.lastModified,
          requiredType,
        ]
      );

      const lostRecords: IGQLSearchRecord[] = (await deletedQuery)
        .map(convertVersionsIntoNullsWhenNecessary).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.transaction_time,
          }
        ));

      const totalDiffRecordCount = newAndModifiedRecordsSQL.length + lostRecords.length;

      if (totalDiffRecordCount) {
        const newRecords: IGQLSearchRecord[] = newAndModifiedRecordsSQL.filter((r) => r.WAS_CREATED).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));
        const modifiedRecords: IGQLSearchRecord[] = newAndModifiedRecordsSQL.filter((r) => !r.WAS_CREATED).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));

        const event: IParentedSearchRecordsEvent = {
          parentId: request.parentId,
          parentVersion: request.parentVersion || null,
          parentType: request.parentType,
          qualifiedPathName: request.qualifiedPathName,
          newRecords,
          modifiedRecords,
          lostRecords,
          newLastModified: findLastRecordLastModifiedDate(newRecords, modifiedRecords, lostRecords),
        };
        CAN_LOG_DEBUG && logger.debug(
          "Listener.parentedSearchFeedback: emmitting " + PARENTED_SEARCH_RECORDS_EVENT,
          event,
        );
        socket.emit(
          PARENTED_SEARCH_RECORDS_EVENT,
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

    let value: ISQLTableRowValue;
    try {
      value = await this.cache.requestValue(itemDefinition, request.id, request.version);
    } catch (err) {
      logger.error(
        "Listener.identify [SERIOUS]: socket " + socket.id + " could not retrieve feedback due to cache failure",
        {
          errMessage: err.message,
          errStack: err.stack,
        }
      );
      return;
    }
    const creator = value ? (itemDefinition.isOwnerObjectId() ? value.id : value.created_by) : UNSPECIFIED_OWNER;

    const rolesManager = new CustomRoleManager(
      this.customRoles,
      {
        cache: this.cache,
        databaseConnection: this.rawDB.databaseConnection,
        rawDB: this.rawDB,
        item: itemDefinition,
        tokenData: listenerData.user,
        module: itemDefinition.getParentModule(),
        root: this.root,
        value: value ? convertSQLValueToGQLValueForItemDefinition(
          this.cache.getServerData(),
          itemDefinition,
          value,
        ) : value,
        environment: CustomRoleGranterEnvironment.RETRIEVING,
        owner: value ? (itemDefinition.isOwnerObjectId() ? value.id : value.created_by) : null,
        parent: value && value.parent_id ? {
          id: value.parent_id,
          type: value.parent_type,
          version: value.parent_version || null,
        } : null,
      }
    );

    try {
      const hasAccess = await itemDefinition.checkRoleAccessFor(
        ItemDefinitionIOActions.READ,
        listenerData.user.role,
        listenerData.user.id,
        creator,
        {},
        rolesManager,
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

      if (value) {
        const event: IChangedFeedbackEvent = {
          itemDefinition: request.itemDefinition,
          id: request.id,
          version: request.version,
          type: "last_modified",
          lastModified: value.last_modified,
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
      this.redisGlobalSub.redisClient.unsubscribe(mergedIndexIdentifier);
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
    const redisEvent: IRedisEvent = {
      event,
      listenerUUID,
      serverInstanceGroupId: INSTANCE_GROUP_ID,
      source: "global",
      mergedIndexIdentifier,
      type: CHANGED_FEEEDBACK_EVENT,
      data,
    };

    // due to data we avoid logging this, data can be fairly large
    CAN_LOG_DEBUG && logger.debug(
      "Listener.triggerChangedListeners: triggering redis changed event for",
      {
        event: redisEvent.event,
        listenerUUID,
        serverInstanceGroupId: INSTANCE_GROUP_ID,
      },
    );

    this.redisGlobalPub.redisClient.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
  }
  public triggerOwnedSearchListeners(
    event: IOwnedSearchRecordsEvent,
    listenerUUID: string,
  ) {
    const mergedIndexIdentifier = "OWNED_SEARCH." + event.qualifiedPathName + "." + event.createdBy;
    const redisEvent: IRedisEvent = {
      type: OWNED_SEARCH_RECORDS_EVENT,
      event,
      listenerUUID,
      mergedIndexIdentifier,
      serverInstanceGroupId: INSTANCE_GROUP_ID,
      source: "global",
    };
    CAN_LOG_DEBUG && logger.debug(
      "Listener.triggerOwnedSearchListeners: triggering redis event",
      redisEvent,
    );
    this.redisGlobalPub.redisClient.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
  }
  public triggerParentedSearchListeners(
    event: IParentedSearchRecordsEvent,
    listenerUUID: string,
  ) {
    const mergedIndexIdentifier = "PARENTED_SEARCH." + event.qualifiedPathName + "." + event.parentType +
      "." + event.parentId + "." + (event.parentVersion || "");
    const redisEvent: IRedisEvent = {
      event,
      listenerUUID,
      mergedIndexIdentifier,
      type: PARENTED_SEARCH_RECORDS_EVENT,
      serverInstanceGroupId: INSTANCE_GROUP_ID,
      source: "global",
    }
    CAN_LOG_DEBUG && logger.debug(
      "Listener.triggerParentedSearchListeners: triggering redis event",
      redisEvent,
    );
    this.redisGlobalPub.redisClient.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
  }
  public async globalRedisListener(
    channel: string,
    message: string,
  ) {
    const redisEvent: IRedisEvent = JSON.parse(message);
    CAN_LOG_DEBUG && logger.debug(
      "Listener.globalRedisListener: received redis event",
      redisEvent,
    );

    if (redisEvent.source !== "global") {
      // this happens when we use the same redis database for both global and local
      CAN_LOG_DEBUG && logger.debug(
        "Listener.globalRedisListener: redis event source is not global, ignoring",
      );
      return;
    }

    if (redisEvent.type === SERVER_DATA_IDENTIFIER) {
      this.cache.onServerDataChangeInformed(redisEvent.data);
      this.io.emit(
        CURRENCY_FACTORS_UPDATED_EVENT,
      );
      return;
    }

    if (redisEvent.type === SERVER_USER_KICK_IDENTIFIER) {
      const serverInstanceGroupId = redisEvent.serverInstanceGroupId;
      if (serverInstanceGroupId === INSTANCE_GROUP_ID) {
        CAN_LOG_DEBUG && logger.debug(
          "Listener.globalRedisListener: our own instance group id " + INSTANCE_GROUP_ID + " was the emitter, ignoring event",
        );
      } else if (redisEvent.data && redisEvent.data.userId === "number") {
        this.onReceiveKickEvent(redisEvent.data.userId);
      }
      return;
    }

    // only the cluster manager and absolute happens to recieve these
    // as these are the remote listening functions
    if (redisEvent.mergedIndexIdentifier && this.listensSS[redisEvent.mergedIndexIdentifier]) {
      CAN_LOG_DEBUG && logger.debug(
        "Listener.globalRedisListener: our own server is expecting it",
      );

      const serverInstanceGroupId = redisEvent.serverInstanceGroupId;
      if (serverInstanceGroupId === INSTANCE_GROUP_ID) {
        // when we were the originators, our local cache is expected
        // to have been updated, as such, we literally don't care
        CAN_LOG_DEBUG && logger.debug(
          "Listener.globalRedisListener: our own instance group id " + INSTANCE_GROUP_ID + " was the emitter, ignoring event",
        );
      } else {
        const event: IChangedFeedbackEvent = redisEvent.event;
        if (typeof redisEvent.data === "undefined") {
          this.cache.onChangeInformedNoData(event.itemDefinition, event.id, event.version || null);
        } else {
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
          if (
            whatListening[redisEvent.mergedIndexIdentifier]
          ) {
            if (this.listeners[socketKey].uuid === redisEvent.listenerUUID) {
              CAN_LOG_DEBUG && logger.debug(
                "Listener.globalRedisListener: socket " + socketKey + " is listening, but was also the initial emitter, ignoring",
              );
            } else {
              CAN_LOG_DEBUG && logger.debug(
                "Listener.globalRedisListener: socket " + socketKey + " was expecting it, emitting",
              );
              this.listeners[socketKey].socket.emit(
                redisEvent.type,
                redisEvent.event,
              );
            }
          }
        });
      }, 100);
    }
  }
  public localRedisListener(
    channel: string,
    message: string,
  ) {
    const redisEvent: IRedisEvent = JSON.parse(message);
    CAN_LOG_DEBUG && logger.debug(
      "Listener.localRedisListener: recieved redis event",
      redisEvent,
    );

    if (redisEvent.source !== "local") {
      // this happens when we use the same redis database for both global and local
      CAN_LOG_DEBUG && logger.debug(
        "Listener.localRedisListener: redis event source is not local, ignoring",
      );
      return;
    }

    if (redisEvent.type === CLUSTER_MANAGER_REGISTER_SS) {
      // we are the cluster manager, and we handle these registrations
      this.registerSS(redisEvent.request);
    } else if (redisEvent.type === CLUSTER_MANAGER_RESET) {
      // we are an extended instance and we have been informed that the cluster manager has
      // reset
      this.onClusterManagerResetInformed();
    }
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
        this.redisGlobalSub.redisClient.unsubscribe(listensMergedIdentifier);
      }
    });
    delete this.listeners[socket.id];
  }
  public onClusterManagerResetInformed() {
    // the redis database has been wiped if this happened here
    // as such now we might have issues with sync, as the users might
    // have not received changes, as such, we will check every listener
    // and force the users to reqeust for feedback by making a last modified
    // event

    CAN_LOG_DEBUG && logger.debug(
      "Listener.onClusterManagerResetInformed [SERIOUS]: received cluster manager reset event, " +
      "this means the cluster manager died out and restarted, now all the clients must be reconnected",
    );

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
  public informClusterManagerReset() {
    CAN_LOG_DEBUG && logger.debug(
      "Listener.informClusterManagerReset: informing a reset of the cluster manager",
    );
    const redisEvent: IRedisEvent = {
      type: CLUSTER_MANAGER_RESET,
      serverInstanceGroupId: INSTANCE_GROUP_ID,
      source: "local",
    }
    this.redisLocalPub.redisClient.publish(CLUSTER_MANAGER_RESET, JSON.stringify(redisEvent));
  }
}
