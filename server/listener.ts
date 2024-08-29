import { ISQLTableRowValue } from "../base/Root/sql";
import { Cache } from "./cache";
import { Server } from "http";
import Root from "../base/Root";
import { Socket, Server as IOServer } from "socket.io";
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
  CHANGED_FEEDBACK_EVENT,
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
  OwnedParentedSearchRegisterRequestSchema,
  OwnedParentedSearchFeedbackRequestSchema,
  OwnedParentedSearchUnregisterRequestSchema,
  OWNED_PARENTED_SEARCH_REGISTER_REQUEST,
  IOwnedParentedSearchRegisterRequest,
  OWNED_PARENTED_SEARCH_FEEDBACK_REQUEST,
  IOwnedParentedSearchUnregisterRequest,
  IOwnedParentedSearchFeedbackRequest,
  IOwnedParentedSearchRecordsEvent,
  OWNED_PARENTED_SEARCH_RECORDS_EVENT,
  OWNED_PARENTED_SEARCH_UNREGISTER_REQUEST,
  generateBasicMergedIndexIdentifier,
  generateOwnedSearchMergedIndexIdentifier,
  generateParentedSearchMergedIndexIdentifier,
  generateOwnedParentedSearchMergedIndexIdentifier,
  PropertySearchRegisterRequestSchema,
  PropertySearchFeedbackRequestSchema,
  PropertySearchUnregisterRequestSchema,
  PROPERTY_SEARCH_REGISTER_REQUEST,
  IPropertySearchRegisterRequest,
  IPropertySearchFeedbackRequest,
  PROPERTY_SEARCH_FEEDBACK_REQUEST,
  PROPERTY_SEARCH_UNREGISTER_REQUEST,
  IPropertySearchUnregisterRequest,
  generatePropertySearchMergedIndexIdentifier,
  IPropertySearchRecordsEvent,
  PROPERTY_SEARCH_RECORDS_EVENT,
  RQ_REQUEST,
  IWSRQRequest,
  IWSRQResponse,
  RQ_RESPONSE,
} from "../base/remote-protocol";
import { IRQSearchRecord, IRQValue } from "../rq-querier";
import { convertVersionsIntoNullsWhenNecessary } from "./version-null-value";
import { logger } from "./logger";
import {
  SERVER_DATA_IDENTIFIER, SERVER_USER_KICK_IDENTIFIER,
  UNSPECIFIED_OWNER, MAX_REMOTE_LISTENERS_PER_SOCKET, GUEST_METAROLE, DELETED_REGISTRY_IDENTIFIER, TRACKERS_REGISTRY_IDENTIFIER, JWT_KEY, CONNECTOR_SQL_COLUMN_ID_FK_NAME, CONNECTOR_SQL_COLUMN_VERSION_FK_NAME,
  ENDPOINT_ERRORS
} from "../constants";
import Ajv from "ajv";
import { jwtVerify } from "./token";
import { IConfigRawJSONDataType, ISensitiveConfigRawJSONDataType } from "../config";
import { IServerSideTokenDataType } from "./resolvers/basic";
import { ItemizeRedisClient } from "./redis";
import { findLastRecordDate } from "./resolvers/actions/search";
import { CustomRoleGranterEnvironment, CustomRoleManager, ICustomRoleType } from "./resolvers/roles";
import { convertSQLValueToRQValueForItemDefinition } from "../base/Root/Module/ItemDefinition/sql";
import { ItemizeRawDB } from "./raw-db";
import { CAN_LOG_DEBUG, CLUSTER_ID, INSTANCE_MODE, TRUST_ALL_INBOUND_CONNECTIONS } from "./environment";
import { RegistryService } from "./services/registry";
import { NanoSecondComposedDate } from "../nanodate";
import type { RQRootSchema } from "../base/Root/rq";
import { EndpointError, EndpointErrorType } from "../base/errors";
import { processArgs, processFields } from "./rq";

const ajv = new Ajv();

const checkRegisterRequest =
  ajv.compile(RegisterRequestSchema);

const checkOwnedSearchRegisterRequest =
  ajv.compile(OwnedSearchRegisterRequestSchema);

const checkPropertySearchRegisterRequest =
  ajv.compile(PropertySearchRegisterRequestSchema);

const checkParentedSearchRegisterRequest =
  ajv.compile(ParentedSearchRegisterRequestSchema);

const checkOwnedParentedSearchRegisterRequest =
  ajv.compile(OwnedParentedSearchRegisterRequestSchema);

const checkIdentifyRequest =
  ajv.compile(IdentifyRequestSchema);

const checkFeedbackRequest =
  ajv.compile(FeedbackRequestSchema);

const checkOwnedSearchFeedbackRequest =
  ajv.compile(OwnedSearchFeedbackRequestSchema);

const checkPropertySearchFeedbackRequest =
  ajv.compile(PropertySearchFeedbackRequestSchema);

const checkParentedSearchFeedbackRequest =
  ajv.compile(ParentedSearchFeedbackRequestSchema);

const checkOwnedParentedSearchFeedbackRequest =
  ajv.compile(OwnedParentedSearchFeedbackRequestSchema);

const checkUnregisterRequest =
  ajv.compile(UnregisterRequestSchema);

const checkOwnedSearchUnregisterRequest =
  ajv.compile(OwnedSearchUnregisterRequestSchema);

const checkPropertySearchUnregisterRequest =
  ajv.compile(PropertySearchUnregisterRequestSchema);

const checkParentedSearchUnregisterRequest =
  ajv.compile(ParentedSearchUnregisterRequestSchema);

const checkOwnedParentedSearchUnregisterRequest =
  ajv.compile(OwnedParentedSearchUnregisterRequestSchema);

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

const CLUSTER_MANAGER_REGISTER_SS = "CLUSTER_MANAGER_REGISTER_SS";
const CLUSTER_MANAGER_RESET = "CLUSTER_MANAGER_RESET";

/**
 * @ignore
 */
const customEventListenerRegex = /^\$[a-zA-Z-]+$/;

export interface ICustomListenerInfo {
  /**
   * may be missing if user is unidentified
   */
  userData: IServerSideTokenDataType;
  /**
   * the socket
   */
  socket: Socket;
  /**
   * listener context
   */
  listener: Listener;
}

export type CustomListenerDisconnectHandler = (info: ICustomListenerInfo) => void;

/**
 * If a custom event returns a value this will be the value used
 * for acking the client about receiving such custom event
 * 
 * If the promise crashes you may want to return an endpoint error type
 * or otherwise it will be casted into internal server error
 */
export type CustomListenerEventHandler = (
  /**
   * data for the event
   */
  eventData: any,
  info: ICustomListenerInfo,
) => Promise<void | object>;

export class Listener {
  private io: IOServer;

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
  private config: IConfigRawJSONDataType;
  private sensitiveConfig: ISensitiveConfigRawJSONDataType;
  private registry: RegistryService;
  private server: Server;
  private customRoles: ICustomRoleType[];

  private awaitingBasicEvent: { [key: string]: IChangedFeedbackEvent } = {};
  private awaitingOwnedSearchEvents: { [key: string]: IOwnedSearchRecordsEvent } = {};
  private awaitingOwnedParentedSearchEvents: { [key: string]: IOwnedParentedSearchRecordsEvent } = {};
  private awaitingParentedSearchEvents: { [key: string]: IParentedSearchRecordsEvent } = {};
  private awaitingPropertySearchEvents: { [key: string]: IPropertySearchRecordsEvent } = {};

  private awaitingBasicFeedbacks: { [sockedId: string]: IFeedbackRequest[] } = {};
  private awaitingOwnedSearchFeedbacks: { [sockedId: string]: IOwnedSearchFeedbackRequest[] } = {};
  private awaitingOwnedParentedSearchFeedbacks: { [sockedId: string]: IOwnedParentedSearchFeedbackRequest[] } = {};
  private awaitingParentedSearchFeedbacks: { [sockedId: string]: IParentedSearchFeedbackRequest[] } = {};
  private awaitingPropertySearchFeedbacks: { [sockedId: string]: IPropertySearchFeedbackRequest[] } = {};

  private customEvents: { [eventId: string]: CustomListenerEventHandler } = {};
  private customDisconnectEvents: CustomListenerDisconnectHandler[] = [];

  private rqSchemaWResolvers: RQRootSchema = null;

  constructor(
    buildnumber: string,
    redisGlobalSub: ItemizeRedisClient,
    redisGlobalPub: ItemizeRedisClient,
    redisLocalSub: ItemizeRedisClient,
    redisLocalPub: ItemizeRedisClient,
    registry: RegistryService,
    root: Root,
    cache: Cache,
    rawDB: ItemizeRawDB,
    server: Server,
    customRoles: ICustomRoleType[],
    config: IConfigRawJSONDataType,
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
    this.config = config;
    this.sensitiveConfig = sensitiveConfig;
    this.customRoles = customRoles;
    this.registry = registry;
    this.server = server;

    this.die = this.die.bind(this);
    this.revive = this.revive.bind(this);

    this.globalRedisListener = this.globalRedisListener.bind(this);
    this.localRedisListener = this.localRedisListener.bind(this);

    this.handleCustomEvent = this.handleCustomEvent.bind(this);
    this.handleRQRequest = this.handleRQRequest.bind(this);
  }
  public setRQSchemaWithResolvers(rqSchemaWResolvers: RQRootSchema) {
    this.rqSchemaWResolvers = rqSchemaWResolvers;
  }
  public init() {
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

    this.cache.setListener(this);
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

    this.io = new IOServer(this.server, {
      cors: (req, callback) => {
        const originOfRequest = req.headers["origin"];
        const isOriginLocalhost = originOfRequest === "http://localhost" || originOfRequest === "https://localhost";

        let originAllowed: string;

        // request does not come from locahost and we aren't trusting
        if (!isOriginLocalhost && !TRUST_ALL_INBOUND_CONNECTIONS) {
          // we will allow it depending of which
          if (originOfRequest === ("https://" + this.config.developmentHostname)) {
            originAllowed = this.config.developmentHostname;
          } else {
            originAllowed = this.config.productionHostname;
          }
        } else {
          // otherwise request is coming from localhost or we are trusting of all
          // if trusting of all
          if (TRUST_ALL_INBOUND_CONNECTIONS) {
            // trusting all
            originAllowed = "*";
          } else {
            // otherwise we just allow it
            originAllowed = originOfRequest;
          }
        }

        callback(null, {
          origin: originAllowed,
          methods: ["GET", "POST"],
        });
      }
    });
    this.io.on("connection", (socket) => {
      this.addSocket(socket);
      socket.on(REGISTER_REQUEST, (request: IRegisterRequest) => {
        this.register(socket, request);
      });
      socket.on(OWNED_SEARCH_REGISTER_REQUEST, (request: IOwnedSearchRegisterRequest) => {
        this.ownedSearchRegister(socket, request);
      });
      socket.on(PROPERTY_SEARCH_REGISTER_REQUEST, (request: IPropertySearchRegisterRequest) => {
        this.propertySearchRegister(socket, request);
      });
      socket.on(PARENTED_SEARCH_REGISTER_REQUEST, (request: IParentedSearchRegisterRequest) => {
        this.parentedSearchRegister(socket, request);
      });
      socket.on(OWNED_PARENTED_SEARCH_REGISTER_REQUEST, (request: IOwnedParentedSearchRegisterRequest) => {
        this.ownedParentedSearchRegister(socket, request);
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
      socket.on(PROPERTY_SEARCH_FEEDBACK_REQUEST, (request: IPropertySearchFeedbackRequest) => {
        this.propertySearchFeedback(socket, request);
      });
      socket.on(PARENTED_SEARCH_FEEDBACK_REQUEST, (request: IParentedSearchFeedbackRequest) => {
        this.parentedSearchFeedback(socket, request);
      });
      socket.on(OWNED_PARENTED_SEARCH_FEEDBACK_REQUEST, (request: IOwnedParentedSearchFeedbackRequest) => {
        this.ownedParentedSearchFeedback(socket, request);
      });
      socket.on(UNREGISTER_REQUEST, (request: IUnregisterRequest) => {
        this.unregister(socket, request);
      });
      socket.on(OWNED_SEARCH_UNREGISTER_REQUEST, (request: IOwnedSearchUnregisterRequest) => {
        this.ownedSearchUnregister(socket, request);
      });
      socket.on(PROPERTY_SEARCH_UNREGISTER_REQUEST, (request: IPropertySearchUnregisterRequest) => {
        this.propertySearchUnregister(socket, request);
      });
      socket.on(PARENTED_SEARCH_UNREGISTER_REQUEST, (request: IParentedSearchUnregisterRequest) => {
        this.parentedSearchUnregister(socket, request);
      });
      socket.on(OWNED_PARENTED_SEARCH_UNREGISTER_REQUEST, (request: IOwnedParentedSearchUnregisterRequest) => {
        this.ownedParentedSearchUnregister(socket, request);
      });
      socket.on(RQ_REQUEST, (request: IWSRQRequest) => {
        this.handleRQRequest(socket, request);
      });
      Object.keys(this.customEvents).forEach((k) => {
        socket.on(k, (data: any, callback: any) => {
          this.handleCustomEvent(k, socket, data, callback);
        });
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
      serverInstanceGroupId: CLUSTER_ID,
      data: {
        userId,
      },
      source: "global",
      mergedIndexIdentifier: null,
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
        {
          className: "Listener",
          methodName: "identify",
          message: "Can't indentify due to invalid request",
          data: {
            errors: checkIdentifyRequest.errors,
          }
        },
      );
      this.emitError(socket, "can't identify user due to invalid request", request);
      return;
    }

    let invalid = false;
    let invalidReason: string;
    let result: IServerSideTokenDataType;
    if (request.token) {
      try {
        result = await jwtVerify<IServerSideTokenDataType>(request.token, await this.registry.getJWTSecretFor(JWT_KEY));
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
            {
              className: "Listener",
              methodName: "identify",
              serious: true,
              message: "socket " + socket.id + " failed to identify because of the cache failed",
              err,
            },
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
        {
          className: "Listener",
          methodName: "identify",
          message: "socket " + socket.id + " failed to identify due to " + invalidReason,
        }
      );
      this.emitError(socket, "failed to identify due to " + invalidReason, request);

      // yes kick the socket, why was it using an invalid token to start with, that's fishy
      this.kick(socket);
    } else {
      if (!this.listeners[socket.id]) {
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Listener",
            methodName: "identify",
            message: "socket " + socket.id + " provides initial identification"
          },
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
          {
            className: "Listener",
            methodName: "identify",
            message: "socket " + socket.id + " updates identification criteria",
          },
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
    const mergedIndexIdentifier = generateBasicMergedIndexIdentifier(
      request.itemDefinition,
      request.id,
      request.version,
    );
    CAN_LOG_DEBUG && logger.debug(
      {
        className: "Listener",
        methodName: "registerSS",
        message: "Server instance requested subscribe to " + mergedIndexIdentifier,
      },
    );

    if (this.listensSS[mergedIndexIdentifier]) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "registerSS",
          message: "Already subscribed, ignoring",
        },
      );
      return;
    }

    if (INSTANCE_MODE !== "CLUSTER_MANAGER" && INSTANCE_MODE !== "ABSOLUTE") {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "registerSS",
          message: "Instance is not cluster manager nor absolute piping request to cluster manager",
        },
      );
      const redisEvent: IRedisEvent = {
        type: CLUSTER_MANAGER_REGISTER_SS,
        request,
        serverInstanceGroupId: CLUSTER_ID,
        source: "local",
        mergedIndexIdentifier: null,
      }
      this.redisLocalPub.redisClient.publish(CLUSTER_MANAGER_REGISTER_SS, JSON.stringify(redisEvent));
    } else if (INSTANCE_MODE === "CLUSTER_MANAGER" || INSTANCE_MODE === "ABSOLUTE") {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "registerSS",
          message: "Performing subscription as cluster manager",
        },
      );
      this.redisGlobalSub.redisClient.subscribe(mergedIndexIdentifier);
      this.listensSS[mergedIndexIdentifier] = true;
    } else {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "registerSS",
          message: "Invalid instance attempting a server side registration " + INSTANCE_MODE,
        },
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
        {
          className: "Listener",
          methodName: "register",
          message: "Can't register listener to an unidentified socket " + socket.id,
        },
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkRegisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "register",
          message: "Can't register listener due to invalid request",
          data: {
            errors: checkRegisterRequest.errors
          }
        },
      );
      this.emitError(socket, "invalid request", request);
      return;
    }

    // do not allow more than MAX_REMOTE_LISTENERS_PER_SOCKET concurrent listeners
    if (listenerData.amount > MAX_REMOTE_LISTENERS_PER_SOCKET) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "register",
          message: "Socket " + socket.id + " has exceeded the amount of listeners it can attach",
        },
      );
      this.emitError(socket, "exceeded socket max listeners per socket", request);
      return;
    }

    const itemDefinition: ItemDefinition = this.root.registry[request.itemDefinition] as ItemDefinition;
    if (!itemDefinition || !(itemDefinition instanceof ItemDefinition)) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "register",
          message: "Could not find " + request.itemDefinition,
        },
      );
      this.emitError(socket, "could not find item definition", request);
      return;
    }
    let value: ISQLTableRowValue;
    try {
      value = await this.cache.requestValue(itemDefinition, request.id, request.version);
    } catch (err) {
      logger.error(
        {
          className: "Listener",
          methodName: "identify",
          message: "Socket " + socket.id + " could not register due to cache failure",
          serious: true,
          err,
        },
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
        user: listenerData.user,
        module: itemDefinition.getParentModule(),
        root: this.root,
        value: value ? convertSQLValueToRQValueForItemDefinition(
          this.cache.getServerData(),
          null,
          itemDefinition,
          value,
        ) : value,
        id: request.id,
        version: request.version || null,
        environment: CustomRoleGranterEnvironment.RETRIEVING,
        requestArgs: {},
        owner: value ? (itemDefinition.isOwnerObjectId() ? value.id : value.created_by) : null,
        parent: value && value.parent_id ? {
          id: value.parent_id,
          type: value.parent_type,
          version: value.parent_version || null,
        } : null,
        customId: null,
        environmentParent: null,
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
          {
            className: "Listener",
            methodName: "register",
            message: "socket " + socket.id + " with user " + listenerData.user.id +
              " with role " + listenerData.user.role + " cannot listen to " + itemDefinition,
          },
        );
        this.emitError(socket, "user has not access", request);
        return;
      }
    } catch (err) {
      logger.error(
        {
          className: "Listener",
          methodName: "register",
          message: "Failed to register",
          err,
        },
      );
      this.emitError(socket, "Internal Server Error", request);
      return;
    }

    const mergedIndexIdentifier = generateBasicMergedIndexIdentifier(
      request.itemDefinition,
      request.id,
      request.version,
    );

    // socket disconnected during process
    if (!this.listeners[socket.id]) {
      return;
    } else if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "register",
          message: "Subscribing socket " + socket.id + " to " + mergedIndexIdentifier,
        },
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
        {
          className: "Listener",
          methodName: "ownedSearchRegister",
          message: "Can't register listener to an unidentified socket " + socket.id,
        },
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkOwnedSearchRegisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedSearchRegister",
          message: "Can't register listener due to invalid request",
          data: {
            errors: checkOwnedSearchRegisterRequest.errors,
          }
        },
      );
      this.emitError(socket, "invalid request", request);
      return;
    }

    // do not allow more than MAX_REMOTE_LISTENERS_PER_SOCKET concurrent listeners
    if (listenerData.amount > MAX_REMOTE_LISTENERS_PER_SOCKET) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedSearchRegister",
          message: "Socket " + socket.id + " has exceeded the amount of listeners it can attach",
        },
      );
      this.emitError(socket, "exceeded socket max listeners per socket", request);
      return;
    }

    const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
    let hasAccess: boolean;
    if (!itemDefinitionOrModule) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedSearchRegister",
          message: "Could not find item definition or module for " + request.qualifiedPathName,
        },
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
          user: listenerData.user,
          module: itemDefinitionOrModule instanceof Module ? itemDefinitionOrModule : itemDefinitionOrModule.getParentModule(),
          root: this.root,
          value: null,
          id: null,
          version: null,
          environment: CustomRoleGranterEnvironment.SEARCHING_RECORDS,
          requestArgs: {},
          owner: request.createdBy || UNSPECIFIED_OWNER,
          parent: null,
          customId: null,
          environmentParent: null,
        }
      );
      try {
        hasAccess = await itemDefinitionOrModule.checkRoleAccessFor(
          ItemDefinitionIOActions.READ,
          listenerData.user.role,
          listenerData.user.id,
          request.createdBy || UNSPECIFIED_OWNER,
          {},
          rolesManager,
          false,
        );
      } catch (err) {
        logger.error(
          {
            className: "Listener",
            methodName: "ownedSearchRegister",
            message: "Failed to register",
            err,
          },
        );
        this.emitError(socket, "Internal Server Error", request);
        return;
      }
    }
    if (!hasAccess) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedSearchRegister",
          message: "Socket " + socket.id + " with user " + listenerData.user.id +
            " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName,
        },
      );
      this.emitError(socket, "user has not access", request);
      return;
    }

    const mergedIndexIdentifier = generateOwnedSearchMergedIndexIdentifier(
      request.qualifiedPathName,
      request.createdBy,
    );

    // socket disconnected during process
    if (!this.listeners[socket.id]) {
      return;
    } else if (!listenerData.listens[mergedIndexIdentifier]) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedSearchRegister",
          message: "Subscribing socket " + socket.id + " to " + mergedIndexIdentifier,
        },
      );
      this.redisGlobalSub.redisClient.subscribe(mergedIndexIdentifier);
      listenerData.listens[mergedIndexIdentifier] = true;
      listenerData.amount++;
    }
  }
  public async propertySearchRegister(
    socket: Socket,
    request: IPropertySearchRegisterRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchRegister",
          message: "Can't register listener to an unidentified socket " + socket.id,
        },
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkPropertySearchRegisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchRegister",
          message: "Can't register listener due to invalid request",
          data: {
            errors: checkPropertySearchRegisterRequest.errors,
          }
        },
      );
      this.emitError(socket, "invalid request", request);
      return;
    }

    if (!request.propertyValue) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchRegister",
          message: "Can't register listener due to invalid request",
        },
      );
      this.emitError(socket, "invalid request (missing property value)", request);
      return;
    }

    // do not allow more than MAX_REMOTE_LISTENERS_PER_SOCKET concurrent listeners
    if (listenerData.amount > MAX_REMOTE_LISTENERS_PER_SOCKET) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchRegister",
          message: "Socket " + socket.id + " has exceeded the amount of listeners it can attach",
        },
      );
      this.emitError(socket, "exceeded socket max listeners per socket", request);
      return;
    }

    const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
    let hasAccess: boolean;
    if (!itemDefinitionOrModule) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchRegister",
          message: "Could not find item definition or module for " + request.qualifiedPathName,
        },
      );
      this.emitError(socket, "could not find item definition or module", request);
      return;
    } else {
      const hasProperty = itemDefinitionOrModule instanceof ItemDefinition ?
        itemDefinitionOrModule.hasPropertyDefinitionFor(request.propertyId, true) :
        itemDefinitionOrModule.hasPropExtensionFor(request.propertyId);
      if (!hasProperty) {
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Listener",
            methodName: "propertySearchRegister",
            message: "Could not find property in item definition or module for " + request.propertyId,
          },
        );
        this.emitError(socket, "could not property", request);
        return;
      }
      const propDef = itemDefinitionOrModule instanceof ItemDefinition ?
        itemDefinitionOrModule.getPropertyDefinitionFor(request.propertyId, true) :
        itemDefinitionOrModule.getPropExtensionFor(request.propertyId);

      if (!propDef.isTracked()) {
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Listener",
            methodName: "propertySearchRegister",
            message: "Property " + request.propertyId + " is not a string tracked type",
          },
        );
        this.emitError(socket, "property is not of the tracked type", request);
        return;
      }

      const rolesManager = new CustomRoleManager(
        this.customRoles,
        {
          cache: this.cache,
          databaseConnection: this.rawDB.databaseConnection,
          rawDB: this.rawDB,
          item: itemDefinitionOrModule instanceof ItemDefinition ? itemDefinitionOrModule : null,
          tokenData: listenerData.user,
          user: listenerData.user,
          module: itemDefinitionOrModule instanceof Module ? itemDefinitionOrModule : itemDefinitionOrModule.getParentModule(),
          root: this.root,
          value: null,
          id: null,
          version: null,
          environment: CustomRoleGranterEnvironment.SEARCHING_RECORDS,
          requestArgs: {
            ["SEARCH_" + request.propertyId]: request.propertyValue,
          },
          owner: UNSPECIFIED_OWNER,
          parent: null,
          customId: null,
          environmentParent: null,
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
          {
            className: "Listener",
            methodName: "propertySearchRegister",
            message: "Failed to register",
            err,
          },
        );
        this.emitError(socket, "Internal Server Error", request);
        return;
      }
    }
    if (!hasAccess) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchRegister",
          message: "Socket " + socket.id + " with user " + listenerData.user.id +
            " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName,
        },
      );
      this.emitError(socket, "user has not access", request);
      return;
    }

    const mergedIndexIdentifier = generatePropertySearchMergedIndexIdentifier(
      request.qualifiedPathName,
      request.propertyId,
      request.propertyValue,
    );

    if (!listenerData.listens[mergedIndexIdentifier]) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchRegister",
          message: "Subscribing socket " + socket.id + " to " + mergedIndexIdentifier,
        },
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
        {
          className: "Listener",
          methodName: "parentedSearchRegister",
          message: "Can't register listener to an unidentified socket " + socket.id,
        },
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkParentedSearchRegisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "parentedSearchRegister",
          message: "Can't register listener due to invalid request",
          data: {
            errors: checkParentedSearchRegisterRequest.errors
          },
        },
      );
      this.emitError(socket, "invalid request", request);
      return;
    }

    // do not allow more than MAX_REMOTE_LISTENERS_PER_SOCKET concurrent listeners
    if (this.listeners[socket.id].amount > MAX_REMOTE_LISTENERS_PER_SOCKET) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "parentedSearchRegister",
          message: "Socket " + socket.id + " has exceeded the amount of listeners it can attach",
        },
      );
      this.emitError(socket, "exceeded socket max listeners per socket", request);
      return;
    }

    const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
    let hasAccess: boolean;
    if (!itemDefinitionOrModule) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "parentedSearchRegister",
          message: "Could not find item definition or module for " + request.qualifiedPathName,
        },
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
          user: listenerData.user,
          module: itemDefinitionOrModule instanceof Module ? itemDefinitionOrModule : itemDefinitionOrModule.getParentModule(),
          root: this.root,
          value: null,
          id: null,
          version: null,
          environment: CustomRoleGranterEnvironment.SEARCHING_RECORDS,
          requestArgs: {},
          owner: null,
          parent: {
            id: request.parentId,
            type: request.parentType,
            version: request.parentVersion,
          },
          customId: null,
          environmentParent: null,
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
          {
            className: "Listener",
            methodName: "parentedSearchRegister",
            message: "Failed to register",
            err,
          },
        );
        this.emitError(socket, "Internal Server Error", request);
        return;
      }
    }
    if (!hasAccess) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "parentedSearchRegister",
          message: "Socket " + socket.id + " with user " + listenerData.user.id +
            " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName,
        },
      );
      this.emitError(socket, "user has not access", request);
      return;
    }

    const mergedIndexIdentifier = generateParentedSearchMergedIndexIdentifier(
      request.qualifiedPathName,
      request.parentType,
      request.parentId,
      request.parentVersion,
    );
    // socket disconnected during process
    if (!this.listeners[socket.id]) {
      return;
    } else if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "parentedSearchRegister",
          message: "Subscribing socket " + socket.id + " to " + mergedIndexIdentifier,
        },
      );
      this.redisGlobalSub.redisClient.subscribe(mergedIndexIdentifier);
      this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
      this.listeners[socket.id].amount++;
    }
  }
  public async ownedParentedSearchRegister(
    socket: Socket,
    request: IOwnedParentedSearchRegisterRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedParentedSearchRegister",
          message: "Can't register listener to an unidentified socket " + socket.id,
        },
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkOwnedParentedSearchRegisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "parentedSearchRegister",
          message: "Can't register listener due to invalid request",
          data: {
            errors: checkOwnedParentedSearchRegisterRequest.errors,
          },
        },
      );
      this.emitError(socket, "invalid request", request);
      return;
    }

    // do not allow more than MAX_REMOTE_LISTENERS_PER_SOCKET concurrent listeners
    if (this.listeners[socket.id].amount > MAX_REMOTE_LISTENERS_PER_SOCKET) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedParentedSearchRegister",
          message: "Socket " + socket.id + " has exceeded the amount of listeners it can attach",
        },
      );
      this.emitError(socket, "exceeded socket max listeners per socket", request);
      return;
    }

    const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
    let hasAccess: boolean;
    if (!itemDefinitionOrModule) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "parentedSearchRegister",
          message: "Could not find item definition or module for " + request.qualifiedPathName,
        },
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
          user: listenerData.user,
          module: itemDefinitionOrModule instanceof Module ? itemDefinitionOrModule : itemDefinitionOrModule.getParentModule(),
          root: this.root,
          value: null,
          id: null,
          version: null,
          environment: CustomRoleGranterEnvironment.SEARCHING_RECORDS,
          owner: request.createdBy || UNSPECIFIED_OWNER,
          requestArgs: {},
          parent: {
            id: request.parentId,
            type: request.parentType,
            version: request.parentVersion,
          },
          customId: null,
          environmentParent: null,
        }
      );
      try {
        hasAccess = await itemDefinitionOrModule.checkRoleAccessFor(
          ItemDefinitionIOActions.READ,
          listenerData.user.role,
          listenerData.user.id,
          request.createdBy || UNSPECIFIED_OWNER,
          {},
          rolesManager,
          false,
        );
      } catch (err) {
        logger.error(
          {
            className: "Listener",
            methodName: "parentedSearchRegister",
            message: "Failed to register",
            err,
          },
        );
        this.emitError(socket, "Internal Server Error", request);
        return;
      }
    }
    if (!hasAccess) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedParentedSearchRegister",
          message: "Socket " + socket.id + " with user " + listenerData.user.id +
            " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName,
        },
      );
      this.emitError(socket, "user has not access", request);
      return;
    }

    const mergedIndexIdentifier = generateOwnedParentedSearchMergedIndexIdentifier(
      request.qualifiedPathName,
      request.createdBy,
      request.parentType, request.parentId,
      request.parentVersion,
    );
    // socket disconnected during process
    if (!this.listeners[socket.id]) {
      return;
    } else if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedParentedSearchRegister",
          message: "Subscribing socket " + socket.id + " to " + mergedIndexIdentifier,
        },
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
        {
          className: "Listener",
          methodName: "ownedSearchFeedback",
          message: "Can't give feedback to an unidentified socket " + socket.id,
        },
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkOwnedSearchFeedbackRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedSearchFeedback",
          message: "Can't give feedback due to invalid request",
          data: {
            errors: checkOwnedSearchFeedbackRequest.errors,
          },
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }

    const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
    if (!itemDefinitionOrModule) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedSearchFeedback",
          message: "Could not find " + request.qualifiedPathName,
        },
      );
      this.emitError(socket, "could not find item definition or module", request);
      return;
    }

    if (
      this.awaitingOwnedSearchFeedbacks &&
      this.awaitingOwnedSearchFeedbacks[socket.id] &&
      this.awaitingOwnedSearchFeedbacks[socket.id].find((r) =>
        r.createdBy === request.createdBy &&
        r.qualifiedPathName === request.qualifiedPathName &&
        r.lastModified === request.lastModified
      )
    ) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedSearchFeedback",
          message: "Already being handled for " + socket.id,
          data: {
            request,
          }
        },
      );
      this.emitError(
        socket,
        "The following feedback request will not be answered since a similar one is already being handled; " +
        "this is not an error but it suggest your app is asking for the same feedback many times which " +
        "suggests it's being inefficient (eg. a component mounts/dismounts over and over or two components at the same time)",
        request,
      );
      return;
    }

    if (!this.awaitingOwnedSearchFeedbacks[socket.id]) {
      this.awaitingOwnedSearchFeedbacks[socket.id] = [];
    }

    this.awaitingOwnedSearchFeedbacks[socket.id].push(request);

    const removeAwaiting = () => {
      if (!this.awaitingOwnedSearchFeedbacks[socket.id]) {
        return;
      }
      const currentIndex = this.awaitingOwnedSearchFeedbacks[socket.id].indexOf(request);
      if (currentIndex !== -1) {
        this.awaitingOwnedSearchFeedbacks[socket.id].splice(currentIndex, 1);
      }
    }

    try {
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
          user: listenerData.user,
          module: itemDefinitionOrModule instanceof Module ? itemDefinitionOrModule : itemDefinitionOrModule.getParentModule(),
          root: this.root,
          value: null,
          id: null,
          version: null,
          environment: CustomRoleGranterEnvironment.SEARCHING_RECORDS,
          requestArgs: {},
          owner: request.createdBy || UNSPECIFIED_OWNER,
          parent: null,
          customId: null,
          environmentParent: null,
        }
      );
      try {
        const hasAccess = await itemDefinitionOrModule.checkRoleAccessFor(
          ItemDefinitionIOActions.READ,
          listenerData.user.role,
          listenerData.user.id,
          request.createdBy || UNSPECIFIED_OWNER,
          {},
          rolesManager,
          false,
        )
        if (!hasAccess) {
          CAN_LOG_DEBUG && logger.debug(
            {
              className: "Listener",
              methodName: "ownedSearchFeedback",
              message: "Socket " + socket.id + " with user " + listenerData.user.id +
                " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName,
            },
          );
          removeAwaiting();
          this.emitError(socket, "user has not access", request);
          return;
        }
      } catch (err) {
        logger.error(
          {
            className: "Listener",
            methodName: "ownedSearchFeedback",
            message: "Failed to provide feedback",
            err,
          },
        );
        removeAwaiting();
        this.emitError(socket, "Internal Server Error", request);
        return;
      }

      const createdAndModifiedRecordsSQL: ISQLTableRowValue[] = (await this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version", "type", "last_modified", ` + (
          request.lastModified ?
            `"created_at" > ? AS "WAS_CREATED"` :
            `TRUE AS "WAS_CREATED"`
        ) + ` FROM ${JSON.stringify(mod.getQualifiedPathName())} WHERE ` + (
          requiredType ?
            `"type" = ? AND ` :
            ""
        ) + (
          request.lastModified ?
            `"last_modified" > ? AND ` :
            ""
        ) + `"created_by" = ?`,
        [
          request.lastModified || null,
          requiredType || null,
          request.lastModified || null,
          request.createdBy,
        ].filter((v) => v !== null),
        true,
      )).map(convertVersionsIntoNullsWhenNecessary);

      const deletedQuery = this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version", "type", "transaction_time" FROM ${JSON.stringify(DELETED_REGISTRY_IDENTIFIER)} ` +
        `WHERE "module" = ? AND "created_by" = ?` +
        (
          request.lastModified ?
            ` AND "transaction_time" > ?` :
            ""
        ) +
        (
          requiredType ?
            ` AND "type" = ?` :
            ""
        ),
        [
          mod.getQualifiedPathName(),
          request.createdBy,
          request.lastModified || null,
          requiredType || null,
        ].filter((v) => v !== null),
        true,
      );

      const deletedRecords: IRQSearchRecord[] = (await deletedQuery)
        .map(convertVersionsIntoNullsWhenNecessary).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.transaction_time,
          }
        ));

      const totalDiffRecordCount = createdAndModifiedRecordsSQL.length + deletedRecords.length;

      if (totalDiffRecordCount) {
        const createdRecords: IRQSearchRecord[] = createdAndModifiedRecordsSQL.filter((r) => r.WAS_CREATED).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));
        const modifiedRecords: IRQSearchRecord[] = createdAndModifiedRecordsSQL.filter((r) => !r.WAS_CREATED).map((r) => (
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
          newRecords: [],
          lostRecords: [],
          createdRecords,
          deletedRecords,
          modifiedRecords,
          newLastModified: findLastRecordDate("max", "last_modified", createdRecords, deletedRecords, modifiedRecords),
        };
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Listener",
            methodName: "ownedSearchFeedback",
            message: "Triggering " + OWNED_SEARCH_RECORDS_EVENT,
            data: {
              event,
            }
          },
        );
        removeAwaiting();
        socket.emit(
          OWNED_SEARCH_RECORDS_EVENT,
          event,
        );
      } else {
        removeAwaiting();
      }
    } catch (err) {
      logger.error(
        {
          className: "Listener",
          methodName: "ownedSearchFeedback",
          message: "Failed to provide feedback",
          err,
        },
      );
      removeAwaiting();
      this.emitError(socket, "Internal Server Error", request);
      return;
    }
  }
  public async propertySearchFeedback(
    socket: Socket,
    request: IPropertySearchFeedbackRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchFeedback",
          message: "Can't give feedback to an unidentified socket " + socket.id,
        },
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkPropertySearchFeedbackRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchFeedback",
          message: "Can't give feedback due to invalid request",
          data: {
            errors: checkPropertySearchFeedbackRequest.errors,
          },
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }

    if (!request.propertyValue) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchFeedback",
          message: "Can't register listener due to invalid request",
        },
      );
      this.emitError(socket, "invalid request (missing property value)", request);
      return;
    }

    const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
    if (!itemDefinitionOrModule) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchFeedback",
          message: "Could not find " + request.qualifiedPathName,
        },
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

    const hasProperty = itemDefinitionOrModule instanceof ItemDefinition ?
      itemDefinitionOrModule.hasPropertyDefinitionFor(request.propertyId, true) :
      itemDefinitionOrModule.hasPropExtensionFor(request.propertyId);
    if (!hasProperty) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchFeedback",
          message: "Could not find property in item definition or module for " + request.propertyId,
        },
      );
      this.emitError(socket, "could not property", request);
      return;
    }
    const propDef = itemDefinitionOrModule instanceof ItemDefinition ?
      itemDefinitionOrModule.getPropertyDefinitionFor(request.propertyId, true) :
      itemDefinitionOrModule.getPropExtensionFor(request.propertyId);

    if (!propDef.isTracked()) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchFeedback",
          message: "Property " + request.propertyId + " is not a string tracked type",
        },
      );
      this.emitError(socket, "property is not of the tracked type", request);
      return;
    }

    if (
      this.awaitingPropertySearchFeedbacks &&
      this.awaitingPropertySearchFeedbacks[socket.id] &&
      this.awaitingPropertySearchFeedbacks[socket.id].find((r) =>
        r.propertyId === request.propertyId &&
        r.propertyValue === request.propertyValue &&
        r.qualifiedPathName === request.qualifiedPathName &&
        r.lastModified === request.lastModified
      )
    ) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchFeedback",
          message: "Already being handled for " + socket.id,
          data: {
            request,
          }
        },
      );
      this.emitError(
        socket,
        "The following feedback request will not be answered since a similar one is already being handled; " +
        "this is not an error but it suggest your app is asking for the same feedback many times which " +
        "suggests it's being inefficient (eg. a component mounts/dismounts over and over or two components at the same time)",
        request,
      );
      return;
    }

    if (!this.awaitingPropertySearchFeedbacks[socket.id]) {
      this.awaitingPropertySearchFeedbacks[socket.id] = [];
    }

    this.awaitingPropertySearchFeedbacks[socket.id].push(request);

    const removeAwaiting = () => {
      if (!this.awaitingPropertySearchFeedbacks[socket.id]) {
        return;
      }
      const currentIndex = this.awaitingPropertySearchFeedbacks[socket.id].indexOf(request);
      if (currentIndex !== -1) {
        this.awaitingPropertySearchFeedbacks[socket.id].splice(currentIndex, 1);
      }
    }

    try {
      const rolesManager = new CustomRoleManager(
        this.customRoles,
        {
          cache: this.cache,
          databaseConnection: this.rawDB.databaseConnection,
          rawDB: this.rawDB,
          item: itemDefinitionOrModule instanceof ItemDefinition ? itemDefinitionOrModule : null,
          tokenData: listenerData.user,
          user: listenerData.user,
          module: itemDefinitionOrModule instanceof Module ? itemDefinitionOrModule : itemDefinitionOrModule.getParentModule(),
          root: this.root,
          value: null,
          id: null,
          version: null,
          environment: CustomRoleGranterEnvironment.SEARCHING_RECORDS,
          requestArgs: {
            ["SEARCH_" + request.propertyId]: request.propertyValue,
          },
          owner: UNSPECIFIED_OWNER,
          parent: null,
          customId: null,
          environmentParent: null,
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
            {
              className: "Listener",
              methodName: "propertySearchFeedback",
              message: "Socket " + socket.id + " with user " + listenerData.user.id +
                " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName,
            },
          );
          removeAwaiting();
          this.emitError(socket, "user has not access", request);
          return;
        }
      } catch (err) {
        logger.error(
          {
            className: "Listener",
            methodName: "propertySearchFeedback",
            message: "Failed to provide feedback",
            err,
          },
        );
        removeAwaiting();
        this.emitError(socket, "Internal Server Error", request);
        return;
      }

      const propertyIsInIdef = itemDefinitionOrModule instanceof ItemDefinition && itemDefinitionOrModule.hasPropertyDefinitionFor(request.propertyId, false);
      const idefJoinExtra = propertyIsInIdef ? ` JOIN ${JSON.stringify(itemDefinitionOrModule.getQualifiedPathName())} ON ` +
        `${JSON.stringify(CONNECTOR_SQL_COLUMN_ID_FK_NAME)} = "id" AND ${JSON.stringify(CONNECTOR_SQL_COLUMN_VERSION_FK_NAME)} = "version"` : "";
      const createdAndModifiedRecordsSQL: ISQLTableRowValue[] = (await this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version", "type", "last_modified", ` + (
          request.lastModified ?
            `"created_at" > ? AS "WAS_CREATED"` :
            `TRUE AS "WAS_CREATED"`
        ) + ` FROM ${JSON.stringify(mod.getQualifiedPathName())}${idefJoinExtra} WHERE ` + (
          requiredType ?
            `"type" = ? AND ` :
            ""
        ) + (
          request.lastModified ?
            `"last_modified" > ? AND ` :
            ""
        ) + `${JSON.stringify(request.propertyId)} = ?`,
        [
          request.lastModified || null,
          requiredType || null,
          request.lastModified || null,
          request.propertyValue,
        ].filter((v) => v !== null),
        true,
      )).map(convertVersionsIntoNullsWhenNecessary);

      const deletedQuery = this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version", "type", "transaction_time" FROM ${JSON.stringify(DELETED_REGISTRY_IDENTIFIER)} ` +
        `WHERE "module" = ? AND "trackers" ->> ? = ?` +
        (
          request.lastModified ?
            ` AND "transaction_time" > ?` :
            ""
        ) +
        (
          requiredType ?
            ` AND "type" = ?` :
            ""
        ),
        [
          mod.getQualifiedPathName(),
          request.propertyId,
          request.propertyValue,
          request.lastModified || null,
          requiredType || null,
        ].filter((v) => v !== null),
        true,
      );

      const deletedRecords: IRQSearchRecord[] = (await deletedQuery)
        .map(convertVersionsIntoNullsWhenNecessary).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.transaction_time,
          }
        ));

      const gainedOrLostRecordsQuery = this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version", "type", "transaction_time", "status" FROM ${JSON.stringify(TRACKERS_REGISTRY_IDENTIFIER)} ` +
        `WHERE "property" = ? AND "value" = ?` +
        (
          request.lastModified ?
            ` AND "transaction_time" > ?` :
            ""
        ) +
        (
          requiredType ?
            ` AND "type" = ?` :
            ""
        ),
        [
          request.propertyId,
          request.propertyValue,
          request.lastModified || null,
          requiredType || null,
        ].filter((v) => v !== null),
        true,
      );

      const gainedOrLostRecordsSQL = (await gainedOrLostRecordsQuery).map(convertVersionsIntoNullsWhenNecessary);

      const totalDiffRecordCount = createdAndModifiedRecordsSQL.length + deletedRecords.length + gainedOrLostRecordsSQL.length;

      if (totalDiffRecordCount) {
        const createdRecords: IRQSearchRecord[] = createdAndModifiedRecordsSQL.filter((r) => r.WAS_CREATED).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));
        const modifiedRecords: IRQSearchRecord[] = createdAndModifiedRecordsSQL.filter((r) => !r.WAS_CREATED).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));
        const newRecords: IRQSearchRecord[] = gainedOrLostRecordsSQL.filter((r) => r.status).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));
        const lostRecords: IRQSearchRecord[] = gainedOrLostRecordsSQL.filter((r) => !r.status).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));

        const event: IPropertySearchRecordsEvent = {
          propertyId: request.propertyId,
          propertyValue: request.propertyValue,
          qualifiedPathName: request.qualifiedPathName,
          newRecords,
          lostRecords,
          createdRecords,
          deletedRecords,
          modifiedRecords,
          newLastModified: findLastRecordDate("max", "last_modified", createdRecords, deletedRecords, modifiedRecords),
        };
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Listener",
            methodName: "propertySearchFeedback",
            message: "Triggering " + PROPERTY_SEARCH_RECORDS_EVENT,
            data: {
              event,
            }
          },
        );
        removeAwaiting();
        socket.emit(
          PROPERTY_SEARCH_RECORDS_EVENT,
          event,
        );
      } else {
        removeAwaiting();
      }
    } catch (err) {
      logger.error(
        {
          className: "Listener",
          methodName: "propertySearchFeedback",
          message: "Failed to provide feedback",
          err,
        },
      );
      removeAwaiting();
      this.emitError(socket, "Internal Server Error", request);
      return;
    }
  }
  public async parentedSearchFeedback(
    socket: Socket,
    request: IParentedSearchFeedbackRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "parentedSearchFeedback",
          message: "Can't give feedback to an unidentified socket " + socket.id,
        },
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkParentedSearchFeedbackRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "parentedSearchFeedback",
          message: "Can't register listener due to invalid request",
          data: {
            errors: checkParentedSearchFeedbackRequest.errors,
          },
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }

    const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
    if (!itemDefinitionOrModule) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "parentedSearchFeedback",
          message: "Could not find " + request.qualifiedPathName,
        },
      );
      this.emitError(socket, "could not find item definition or module", request);
      return;
    }

    if (
      this.awaitingParentedSearchFeedbacks &&
      this.awaitingParentedSearchFeedbacks[socket.id] &&
      this.awaitingParentedSearchFeedbacks[socket.id].find((r) =>
        r.parentId === request.parentId &&
        r.parentType === request.parentType &&
        r.parentVersion === request.parentVersion &&
        r.qualifiedPathName === request.qualifiedPathName &&
        r.lastModified === request.lastModified
      )
    ) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "parentedSearchFeedback",
          message: "Already being handled for " + socket.id,
          data: {
            request,
          }
        },
      );
      this.emitError(
        socket,
        "The following feedback request will not be answered since a similar one is already being handled; " +
        "this is not an error but it suggest your app is asking for the same feedback many times which " +
        "suggests it's being inefficient (eg. a component mounts/dismounts over and over or two components at the same time)",
        request,
      );
      return;
    }

    if (!this.awaitingParentedSearchFeedbacks[socket.id]) {
      this.awaitingParentedSearchFeedbacks[socket.id] = [];
    }

    this.awaitingParentedSearchFeedbacks[socket.id].push(request);

    const removeAwaiting = () => {
      if (!this.awaitingParentedSearchFeedbacks[socket.id]) {
        return;
      }
      const currentIndex = this.awaitingParentedSearchFeedbacks[socket.id].indexOf(request);
      if (currentIndex !== -1) {
        this.awaitingParentedSearchFeedbacks[socket.id].splice(currentIndex, 1);
      }
    }

    try {
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
          user: listenerData.user,
          module: itemDefinitionOrModule instanceof Module ? itemDefinitionOrModule : itemDefinitionOrModule.getParentModule(),
          root: this.root,
          value: null,
          id: null,
          version: null,
          environment: CustomRoleGranterEnvironment.SEARCHING_RECORDS,
          requestArgs: {},
          owner: null,
          parent: {
            id: request.parentId,
            type: request.parentType,
            version: request.parentVersion,
          },
          customId: null,
          environmentParent: null,
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
            {
              className: "Listener",
              methodName: "parentedSearchFeedback",
              message: "Socket " + socket.id + " with user " + listenerData.user.id +
                " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName,
            },
          );
          removeAwaiting();
          this.emitError(socket, "user has not access", request);
          return;
        }
      } catch (err) {
        logger.error(
          {
            className: "Listener",
            methodName: "parentedSearchFeedback",
            message: "Failed to provide feedback",
            err,
          },
        );
        removeAwaiting();
        this.emitError(socket, "Internal Server Error", request);
        return;
      }

      const createdAndModifiedRecordsSQL: ISQLTableRowValue[] = (await this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version", "type", "last_modified", ` + (
          request.lastModified ?
            `"created_at" > ? AS "WAS_CREATED"` :
            `TRUE AS "WAS_CREATED"`
        ) + ` FROM ${JSON.stringify(mod.getQualifiedPathName())} WHERE ` + (
          requiredType ?
            `"type" = ? AND ` :
            ""
        ) + (
          request.lastModified ?
            `"last_modified" > ? AND ` :
            ""
        ) + `"parent_id" = ? AND "parent_version" = ? AND "parent_type" = ?`,
        [
          request.lastModified || null,
          requiredType || null,
          request.lastModified || null,
          request.parentId,
          request.parentVersion || "",
          request.parentType,
        ].filter((v) => v !== null),
        true,
      )).map(convertVersionsIntoNullsWhenNecessary);

      const parentingId = request.parentType + "." + request.parentId + "." + (request.parentVersion || "");

      const deletedQuery = this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version", "type", "transaction_time" FROM ${JSON.stringify(DELETED_REGISTRY_IDENTIFIER)} ` +
        `WHERE "module" = ? AND "parenting_id" = ?` +
        (
          request.lastModified ?
            ` AND "transaction_time" > ?` :
            ""
        ) +
        (
          requiredType ?
            ` AND "type" = ?` :
            ""
        ),
        [
          mod.getQualifiedPathName(),
          parentingId,
          request.lastModified || null,
          requiredType || null,
        ].filter((v) => v !== null),
        true,
      );

      const deletedRecords: IRQSearchRecord[] = (await deletedQuery)
        .map(convertVersionsIntoNullsWhenNecessary).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.transaction_time,
          }
        ));

      const gainedOrLostRecordsQuery = this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version", "type", "transaction_time", "status" FROM ${JSON.stringify(TRACKERS_REGISTRY_IDENTIFIER)} ` +
        `WHERE "property" = ? AND "value" = ?` +
        (
          request.lastModified ?
            ` AND "transaction_time" > ?` :
            ""
        ) +
        (
          requiredType ?
            ` AND "type" = ?` :
            ""
        ),
        [
          "PARENT",
          parentingId,
          request.lastModified || null,
          requiredType || null,
        ].filter((v) => v !== null),
        true,
      );

      const gainedOrLostRecordsSQL = (await gainedOrLostRecordsQuery).map(convertVersionsIntoNullsWhenNecessary);

      const totalDiffRecordCount = createdAndModifiedRecordsSQL.length + deletedRecords.length + gainedOrLostRecordsSQL.length;

      if (totalDiffRecordCount) {
        const createdRecords: IRQSearchRecord[] = createdAndModifiedRecordsSQL.filter((r) => r.WAS_CREATED).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));
        const modifiedRecords: IRQSearchRecord[] = createdAndModifiedRecordsSQL.filter((r) => !r.WAS_CREATED).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));
        const newRecords: IRQSearchRecord[] = gainedOrLostRecordsSQL.filter((r) => r.status).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));
        const lostRecords: IRQSearchRecord[] = gainedOrLostRecordsSQL.filter((r) => !r.status).map((r) => (
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
          lostRecords,
          createdRecords,
          modifiedRecords,
          deletedRecords,
          newLastModified: findLastRecordDate("max", "last_modified", createdRecords, modifiedRecords, deletedRecords),
        };
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Listener",
            methodName: "parentedSearchFeedback",
            message: "Emmitting " + PARENTED_SEARCH_RECORDS_EVENT,
            data: {
              event,
            },
          },
        );
        removeAwaiting();
        socket.emit(
          PARENTED_SEARCH_RECORDS_EVENT,
          event,
        );
      } else {
        removeAwaiting();
      }
    } catch (err) {
      logger.error(
        {
          className: "Listener",
          methodName: "parentedSearchFeedback",
          message: "Failed to provide feedback",
          err,
        },
      );
      removeAwaiting();
      this.emitError(socket, "Internal Server Error", request);
      return;
    }
  }
  public async ownedParentedSearchFeedback(
    socket: Socket,
    request: IOwnedParentedSearchFeedbackRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedParentedSearchFeedback",
          message: "Can't give feedback to an unidentified socket " + socket.id,
        },
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkOwnedParentedSearchFeedbackRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "parentedSearchFeedback",
          message: "Can't register listener due to invalid request",
          data: {
            errors: checkParentedSearchFeedbackRequest.errors,
          },
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }

    const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
    if (!itemDefinitionOrModule) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedParentedSearchFeedback",
          message: "Could not find " + request.qualifiedPathName,
        },
      );
      this.emitError(socket, "could not find item definition or module", request);
      return;
    }

    if (
      this.awaitingOwnedParentedSearchFeedbacks &&
      this.awaitingOwnedParentedSearchFeedbacks[socket.id] &&
      this.awaitingOwnedParentedSearchFeedbacks[socket.id].find((r) =>
        r.createdBy === request.createdBy &&
        r.parentId === request.parentId &&
        r.parentType === request.parentType &&
        r.parentVersion === request.parentVersion &&
        r.qualifiedPathName === request.qualifiedPathName &&
        r.lastModified === request.lastModified
      )
    ) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedParentedSearchFeedback",
          message: "Already being handled for " + socket.id,
          data: {
            request,
          }
        },
      );
      this.emitError(
        socket,
        "The following feedback request will not be answered since a similar one is already being handled; " +
        "this is not an error but it suggest your app is asking for the same feedback many times which " +
        "suggests it's being inefficient (eg. a component mounts/dismounts over and over or two components at the same time)",
        request,
      );
      return;
    }

    if (!this.awaitingOwnedParentedSearchFeedbacks[socket.id]) {
      this.awaitingOwnedParentedSearchFeedbacks[socket.id] = [];
    }

    this.awaitingOwnedParentedSearchFeedbacks[socket.id].push(request);

    const removeAwaiting = () => {
      if (!this.awaitingOwnedParentedSearchFeedbacks[socket.id]) {
        return;
      }
      const currentIndex = this.awaitingOwnedParentedSearchFeedbacks[socket.id].indexOf(request);
      if (currentIndex !== -1) {
        this.awaitingOwnedParentedSearchFeedbacks[socket.id].splice(currentIndex, 1);
      }
    }

    try {
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
          user: listenerData.user,
          module: itemDefinitionOrModule instanceof Module ? itemDefinitionOrModule : itemDefinitionOrModule.getParentModule(),
          root: this.root,
          value: null,
          id: null,
          version: null,
          environment: CustomRoleGranterEnvironment.SEARCHING_RECORDS,
          owner: request.createdBy || UNSPECIFIED_OWNER,
          requestArgs: {},
          parent: {
            id: request.parentId,
            type: request.parentType,
            version: request.parentVersion,
          },
          customId: null,
          environmentParent: null,
        }
      );

      try {
        const hasAccess = await itemDefinitionOrModule.checkRoleAccessFor(
          ItemDefinitionIOActions.READ,
          listenerData.user.role,
          listenerData.user.id,
          request.createdBy || UNSPECIFIED_OWNER,
          {},
          rolesManager,
          false,
        )
        if (!hasAccess) {
          CAN_LOG_DEBUG && logger.debug(
            {
              className: "Listener",
              methodName: "ownedParentedSearchFeedback",
              message: "Socket " + socket.id + " with user " + listenerData.user.id +
                " with role " + listenerData.user.role + " cannot listen to " + request.qualifiedPathName,
            },
          );
          removeAwaiting();
          this.emitError(socket, "user has not access", request);
          return;
        }
      } catch (err) {
        logger.error(
          {
            className: "Listener",
            methodName: "ownedParentedSearchFeedback",
            message: "Failed to provide feedback",
            err,
          },
        );
        removeAwaiting();
        this.emitError(socket, "Internal Server Error", request);
        return;
      }

      const createdAndModifiedRecordsSQL: ISQLTableRowValue[] = (await this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version", "type", "last_modified", ` + (
          request.lastModified ?
            `"created_at" > ? AS "WAS_CREATED"` :
            `TRUE AS "WAS_CREATED"`
        ) + ` FROM ${JSON.stringify(mod.getQualifiedPathName())} WHERE ` + (
          requiredType ?
            `"type" = ? AND ` :
            ""
        ) + (
          request.lastModified ?
            `"last_modified" > ? AND ` :
            ""
        ) + `"parent_id" = ? AND "parent_version" = ? AND "parent_type" = ? AND "created_by" = ?`,
        [
          request.lastModified || null,
          requiredType || null,
          request.lastModified || null,
          request.parentId,
          request.parentVersion || "",
          request.parentType,
          request.createdBy,
        ].filter((v) => v !== null),
        true,
      )).map(convertVersionsIntoNullsWhenNecessary);

      const parentingId = request.parentType + "." + request.parentId + "." + (request.parentVersion || "");

      const deletedQuery = this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version", "type", "transaction_time" FROM ${JSON.stringify(DELETED_REGISTRY_IDENTIFIER)} ` +
        `WHERE "module" = ? AND "created_by" = ? AND "parenting_id" = ?` +
        (
          request.lastModified ?
            ` AND "transaction_time" > ?` :
            ""
        ) +
        (
          requiredType ?
            ` AND "type" = ?` :
            ""
        ),
        [
          mod.getQualifiedPathName(),
          request.createdBy,
          parentingId,
          request.lastModified || null,
          requiredType || null,
        ].filter((v) => v !== null),
        true,
      );

      const deletedRecords: IRQSearchRecord[] = (await deletedQuery)
        .map(convertVersionsIntoNullsWhenNecessary).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.transaction_time,
          }
        ));

      const gainedOrLostRecordsQuery = this.rawDB.databaseConnection.queryRows(
        `SELECT "id", "version", "type", "transaction_time", "status" FROM ${JSON.stringify(TRACKERS_REGISTRY_IDENTIFIER)} ` +
        `WHERE "property" = ? AND "value" = ?` +
        (
          request.lastModified ?
            ` AND "transaction_time" > ?` :
            ""
        ) +
        (
          requiredType ?
            ` AND "type" = ?` :
            ""
        ),
        [
          "OWNER+PARENT",
          request.createdBy + "+" + parentingId,
          request.lastModified || null,
          requiredType || null,
        ].filter((v) => v !== null),
        true,
      );

      const gainedOrLostRecordsSQL = (await gainedOrLostRecordsQuery).map(convertVersionsIntoNullsWhenNecessary);

      const totalDiffRecordCount = createdAndModifiedRecordsSQL.length + deletedRecords.length + gainedOrLostRecordsSQL.length;

      if (totalDiffRecordCount) {
        const createdRecords: IRQSearchRecord[] = createdAndModifiedRecordsSQL.filter((r) => r.WAS_CREATED).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));
        const modifiedRecords: IRQSearchRecord[] = createdAndModifiedRecordsSQL.filter((r) => !r.WAS_CREATED).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));
        const newRecords: IRQSearchRecord[] = gainedOrLostRecordsSQL.filter((r) => r.status).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));
        const lostRecords: IRQSearchRecord[] = gainedOrLostRecordsSQL.filter((r) => !r.status).map((r) => (
          {
            id: r.id,
            version: r.version,
            type: r.type,
            last_modified: r.last_modified,
          }
        ));

        const event: IOwnedParentedSearchRecordsEvent = {
          createdBy: request.createdBy || UNSPECIFIED_OWNER,
          parentId: request.parentId,
          parentVersion: request.parentVersion || null,
          parentType: request.parentType,
          qualifiedPathName: request.qualifiedPathName,
          newRecords,
          lostRecords,
          createdRecords,
          modifiedRecords,
          deletedRecords,
          newLastModified: findLastRecordDate("max", "last_modified", createdRecords, modifiedRecords, deletedRecords),
        };

        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Listener",
            methodName: "ownedParentedSearchFeedback",
            message: "Emmitting " + OWNED_PARENTED_SEARCH_RECORDS_EVENT,
            data: {
              event,
            },
          },
        );
        removeAwaiting();
        socket.emit(
          OWNED_PARENTED_SEARCH_RECORDS_EVENT,
          event,
        );
      } else {
        removeAwaiting();
      }
    } catch (err) {
      logger.error(
        {
          className: "Listener",
          methodName: "ownedParentedSearchFeedback",
          message: "Failed to provide feedback",
          err,
        },
      );
      removeAwaiting();
      this.emitError(socket, "Internal Server Error", request);
      return;
    }
  }
  public async feedback(
    socket: Socket,
    request: IFeedbackRequest,
  ) {
    const listenerData = this.listeners[socket.id];

    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "feedback",
          message: "Can't give feedback to an unidentified socket " + socket.id,
        },
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkFeedbackRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "feedback",
          message: "Can't register listener due to invalid request",
          data: {
            errors: checkFeedbackRequest.errors,
          },
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }

    const itemDefinition: ItemDefinition = this.root.registry[request.itemDefinition] as ItemDefinition;
    if (!itemDefinition || !(itemDefinition instanceof ItemDefinition)) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "register",
          message: "Could not find " + request.itemDefinition,
        },
      );
      this.emitError(socket, "could not find item definition", request);
      return;
    }

    if (
      this.awaitingBasicFeedbacks &&
      this.awaitingBasicFeedbacks[socket.id] &&
      this.awaitingBasicFeedbacks[socket.id].find((r) =>
        r.id === request.id &&
        r.itemDefinition === request.itemDefinition &&
        r.version === request.version
      )
    ) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "feedback",
          message: "Already being handled for " + socket.id,
          data: {
            request,
          }
        },
      );
      this.emitError(
        socket,
        "The following feedback request will not be answered since a similar one is already being handled; " +
        "this is not an error but it suggest your app is asking for the same feedback many times which " +
        "suggests it's being inefficient (eg. a component mounts/dismounts over and over or two components at the same time)",
        request,
      );
      return;
    }

    if (!this.awaitingBasicFeedbacks[socket.id]) {
      this.awaitingBasicFeedbacks[socket.id] = [];
    }

    this.awaitingBasicFeedbacks[socket.id].push(request);

    const removeAwaiting = () => {
      if (!this.awaitingBasicFeedbacks[socket.id]) {
        return;
      }
      const currentIndex = this.awaitingBasicFeedbacks[socket.id].indexOf(request);
      if (currentIndex !== -1) {
        this.awaitingBasicFeedbacks[socket.id].splice(currentIndex, 1);
      }
    }

    let value: ISQLTableRowValue;
    try {
      value = await this.cache.requestValue(itemDefinition, request.id, request.version);
    } catch (err) {
      logger.error(
        {
          className: "Listener",
          methodName: "identify",
          message: "Socket " + socket.id + " could not retrieve feedback due to cache failure",
          serious: true,
          err,
        }
      );
      this.emitError(socket, "Cache failure", request);
      removeAwaiting();
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
        user: listenerData.user,
        module: itemDefinition.getParentModule(),
        root: this.root,
        value: value ? convertSQLValueToRQValueForItemDefinition(
          this.cache.getServerData(),
          null,
          itemDefinition,
          value,
        ) : value,
        id: request.id,
        version: request.version,
        environment: CustomRoleGranterEnvironment.RETRIEVING,
        owner: value ? (itemDefinition.isOwnerObjectId() ? value.id : value.created_by) : null,
        requestArgs: {},
        parent: value && value.parent_id ? {
          id: value.parent_id,
          type: value.parent_type,
          version: value.parent_version || null,
        } : null,
        customId: null,
        environmentParent: null,
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
          {
            className: "Listener",
            methodName: "register",
            message: "Socket " + socket.id + " with user " + listenerData.user.id +
              " with role " + listenerData.user.role + " cannot listen to " + itemDefinition,
          },
        );
        removeAwaiting();
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
          {
            className: "Listener",
            methodName: "feedback",
            message: "Emitting " + CHANGED_FEEDBACK_EVENT,
            data: {
              event,
            },
          },
        );
        removeAwaiting();
        socket.emit(
          CHANGED_FEEDBACK_EVENT,
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
          {
            className: "Listener",
            methodName: "feedback",
            message: "Emitting " + CHANGED_FEEDBACK_EVENT,
            data: {
              event,
            },
          },
        );
        removeAwaiting();
        socket.emit(
          CHANGED_FEEDBACK_EVENT,
          event,
        );
      }
    } catch (err) {
      logger.error(
        {
          className: "Listener",
          methodName: "feedback",
          message: "Failed to provide feedback",
          err,
        },
      );
      this.emitError(socket, "Internal Server Error", request);
      removeAwaiting();
      return;
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
        {
          className: "Listener",
          methodName: "removeListenerFinal",
          message: "Founds no sockets left for " + mergedIndexIdentifier + " plugging off redis",
        },
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
        {
          className: "Listener",
          methodName: "removeListener",
          message: "Unsubscribing socket " + socket.id + " from " + mergedIndexIdentifier,
        },
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
    const mergedIndexIdentifier = generateBasicMergedIndexIdentifier(
      request.itemDefinition,
      request.id,
      request.version,
    );
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
        {
          className: "Listener",
          methodName: "unregister",
          message: "Can't unregister an unidentified socket " + socket.id,
        },
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkUnregisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "unregister",
          message: "Can't unregister due to invalid request",
          data: {
            errors: checkUnregisterRequest.errors,
          },
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }
    const mergedIndexIdentifier = generateBasicMergedIndexIdentifier(
      request.itemDefinition,
      request.id,
      request.version,
    );
    this.removeListener(socket, mergedIndexIdentifier);
  }
  public ownedSearchUnregister(
    socket: Socket,
    request: IOwnedSearchUnregisterRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedSearchUnregister",
          message: "Can't owned search unregister an unidentified socket " + socket.id,
        },
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkOwnedSearchUnregisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedSearchUnregister",
          message: "Can't unregister due to invalid request",
          data: {
            errors: checkOwnedSearchUnregisterRequest.errors,
          },
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }
    const mergedIndexIdentifier = generateOwnedSearchMergedIndexIdentifier(
      request.qualifiedPathName,
      request.createdBy,
    );
    this.removeListener(socket, mergedIndexIdentifier);
  }
  public propertySearchUnregister(
    socket: Socket,
    request: IPropertySearchUnregisterRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchUnregister",
          message: "Can't property search unregister an unidentified socket " + socket.id,
        },
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkPropertySearchUnregisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "propertySearchUnregister",
          message: "Can't unregister due to invalid request",
          data: {
            errors: checkPropertySearchUnregisterRequest.errors,
          },
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }
    const mergedIndexIdentifier = generatePropertySearchMergedIndexIdentifier(
      request.qualifiedPathName,
      request.propertyId,
      request.propertyValue,
    );
    this.removeListener(socket, mergedIndexIdentifier);
  }
  public parentedSearchUnregister(
    socket: Socket,
    request: IParentedSearchUnregisterRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "parentedSearchUnregister",
          message: "Can't parent search unregister an unidentified socket " + socket.id,
        },
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkParentedSearchUnregisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "parentedSearchUnregister",
          message: "Can't unregister due to invalid request",
          data: {
            errors: checkParentedSearchUnregisterRequest.errors,
          },
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }
    const mergedIndexIdentifier = generateParentedSearchMergedIndexIdentifier(
      request.qualifiedPathName,
      request.parentType,
      request.parentId,
      request.parentVersion,
    );
    this.removeListener(socket, mergedIndexIdentifier);
  }
  public ownedParentedSearchUnregister(
    socket: Socket,
    request: IOwnedParentedSearchUnregisterRequest,
  ) {
    const listenerData = this.listeners[socket.id];
    if (!listenerData) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedParentedSearchUnregister",
          message: "Can't parent search unregister an unidentified socket " + socket.id,
        },
      );
      this.emitError(socket, "socket is unidentified", request);
      return;
    }

    const valid = checkOwnedParentedSearchUnregisterRequest(request);
    if (!valid) {
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "ownedParentedSearchUnregister",
          message: "Can't unregister due to invalid request",
          data: {
            errors: checkOwnedParentedSearchUnregisterRequest.errors,
          },
        }
      );
      this.emitError(socket, "invalid request", request);
      return;
    }
    const mergedIndexIdentifier = generateOwnedParentedSearchMergedIndexIdentifier(
      request.qualifiedPathName,
      request.createdBy,
      request.parentType,
      request.parentId,
      request.parentVersion,
    );
    this.removeListener(socket, mergedIndexIdentifier);
  }
  public triggerChangedListeners(
    event: IChangedFeedbackEvent,
    data: ISQLTableRowValue,
    listenerUUID: string,
    options: {
      noInstanceGroupId?: boolean,
    } = {}
  ) {
    const mergedIndexIdentifier = event.itemDefinition + "." + event.id + "." + (event.version || "");

    if (this.awaitingBasicEvent[mergedIndexIdentifier]) {
      // patch it and go
      const currentLastModified = new NanoSecondComposedDate(this.awaitingBasicEvent[mergedIndexIdentifier].lastModified);
      const newLastModified = new NanoSecondComposedDate(event.lastModified);

      if (newLastModified.greaterThan(currentLastModified)) {
        this.awaitingBasicEvent[mergedIndexIdentifier] = event;
      }

      return;
    }

    // alright we are waiting
    this.awaitingBasicEvent[mergedIndexIdentifier] = event;

    setTimeout(() => {
      const redisEvent: IRedisEvent = {
        event: this.awaitingBasicEvent[mergedIndexIdentifier],
        listenerUUID,
        serverInstanceGroupId: options.noInstanceGroupId ? null : CLUSTER_ID,
        source: "global",
        mergedIndexIdentifier,
        type: CHANGED_FEEDBACK_EVENT,
        data,
      };

      delete this.awaitingBasicEvent[mergedIndexIdentifier];

      // due to data we avoid logging this, data can be fairly large
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "triggerChangedListeners",
          message: "Triggering redis changed event for",
          data: {
            event: redisEvent.event,
            listenerUUID,
            serverInstanceGroupId: CLUSTER_ID,
          },
        },
      );

      this.redisGlobalPub.redisClient.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    }, 250);
  }
  public triggerOwnedSearchListeners(
    event: IOwnedSearchRecordsEvent,
    listenerUUID: string,
    options: {
      noInstanceGroupId?: boolean,
    } = {}
  ) {
    const mergedIndexIdentifier = generateOwnedSearchMergedIndexIdentifier(
      event.qualifiedPathName,
      event.createdBy,
    );

    if (this.awaitingOwnedSearchEvents[mergedIndexIdentifier]) {
      this.patchAwaitingSearchEvent(this.awaitingOwnedSearchEvents[mergedIndexIdentifier], event);
      return;
    }

    this.awaitingOwnedSearchEvents[mergedIndexIdentifier] = event;

    setTimeout(() => {
      const redisEvent: IRedisEvent = {
        type: OWNED_SEARCH_RECORDS_EVENT,
        event: this.awaitingOwnedSearchEvents[mergedIndexIdentifier],
        listenerUUID,
        mergedIndexIdentifier,
        serverInstanceGroupId: options.noInstanceGroupId ? null : CLUSTER_ID,
        source: "global",
      };

      delete this.awaitingOwnedSearchEvents[mergedIndexIdentifier];

      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "triggerOwnedSearchListeners",
          message: "Triggering redis event",
          data: {
            event: redisEvent,
          }
        },
      );

      this.redisGlobalPub.redisClient.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    }, 250);
  }
  public triggerPropertySearchListeners(
    event: IPropertySearchRecordsEvent,
    listenerUUID: string,
    options: {
      noInstanceGroupId?: boolean,
    } = {}
  ) {
    const mergedIndexIdentifier = generatePropertySearchMergedIndexIdentifier(
      event.qualifiedPathName,
      event.propertyId,
      event.propertyValue,
    );

    if (this.awaitingPropertySearchEvents[mergedIndexIdentifier]) {
      this.patchAwaitingSearchEvent(this.awaitingPropertySearchEvents[mergedIndexIdentifier], event);
      return;
    }

    this.awaitingPropertySearchEvents[mergedIndexIdentifier] = event;

    setTimeout(() => {
      const redisEvent: IRedisEvent = {
        type: PROPERTY_SEARCH_RECORDS_EVENT,
        event: this.awaitingPropertySearchEvents[mergedIndexIdentifier],
        listenerUUID,
        mergedIndexIdentifier,
        serverInstanceGroupId: options.noInstanceGroupId ? null : CLUSTER_ID,
        source: "global",
      };

      delete this.awaitingPropertySearchEvents[mergedIndexIdentifier];

      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "triggerPropertySearchListeners",
          message: "Triggering redis event",
          data: {
            event: redisEvent,
          }
        },
      );
      this.redisGlobalPub.redisClient.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    }, 250);
  }
  public triggerParentedSearchListeners(
    event: IParentedSearchRecordsEvent,
    listenerUUID: string,
    options: {
      noInstanceGroupId?: boolean,
    } = {}
  ) {
    const mergedIndexIdentifier = generateParentedSearchMergedIndexIdentifier(
      event.qualifiedPathName,
      event.parentType,
      event.parentId,
      event.parentVersion,
    );

    if (this.awaitingParentedSearchEvents[mergedIndexIdentifier]) {
      this.patchAwaitingSearchEvent(this.awaitingParentedSearchEvents[mergedIndexIdentifier], event);
      return;
    }

    this.awaitingParentedSearchEvents[mergedIndexIdentifier] = event;

    setTimeout(() => {
      const redisEvent: IRedisEvent = {
        event: this.awaitingParentedSearchEvents[mergedIndexIdentifier],
        listenerUUID,
        mergedIndexIdentifier,
        type: PARENTED_SEARCH_RECORDS_EVENT,
        serverInstanceGroupId: options.noInstanceGroupId ? null : CLUSTER_ID,
        source: "global",
      }

      delete this.awaitingParentedSearchEvents[mergedIndexIdentifier];

      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "triggerParentedSearchListeners",
          message: "Triggering redis event",
          data: {
            event: redisEvent,
          },
        },
      );
      this.redisGlobalPub.redisClient.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    }, 250);
  }
  public triggerOwnedParentedSearchListeners(
    event: IOwnedParentedSearchRecordsEvent,
    listenerUUID: string,
    options: {
      noInstanceGroupId?: boolean,
    } = {}
  ) {
    const mergedIndexIdentifier = generateOwnedParentedSearchMergedIndexIdentifier(
      event.qualifiedPathName,
      event.createdBy,
      event.parentType,
      event.parentId,
      event.parentVersion,
    );

    if (this.awaitingOwnedParentedSearchEvents[mergedIndexIdentifier]) {
      this.patchAwaitingSearchEvent(this.awaitingOwnedParentedSearchEvents[mergedIndexIdentifier], event);
      return;
    }

    this.awaitingOwnedParentedSearchEvents[mergedIndexIdentifier] = event;

    setTimeout(() => {
      const redisEvent: IRedisEvent = {
        event: this.awaitingOwnedParentedSearchEvents[mergedIndexIdentifier],
        listenerUUID,
        mergedIndexIdentifier,
        type: OWNED_PARENTED_SEARCH_RECORDS_EVENT,
        serverInstanceGroupId: options.noInstanceGroupId ? null : CLUSTER_ID,
        source: "global",
      }

      delete this.awaitingOwnedParentedSearchEvents[mergedIndexIdentifier];

      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "triggerOwnedParentedSearchListeners",
          message: "Triggering redis event",
          data: {
            event: redisEvent,
          },
        },
      );
      this.redisGlobalPub.redisClient.publish(mergedIndexIdentifier, JSON.stringify(redisEvent));
    }, 250);
  }
  private patchAwaitingSearchEvent(
    src: IOwnedParentedSearchRecordsEvent | IParentedSearchRecordsEvent | IOwnedSearchRecordsEvent | IPropertySearchRecordsEvent,
    patch: IOwnedParentedSearchRecordsEvent | IParentedSearchRecordsEvent | IOwnedSearchRecordsEvent | IPropertySearchRecordsEvent,
  ) {
    // we are going to check and compare all the records
    const recordsLocList = ["createdRecords", "deletedRecords", "lostRecords", "modifiedRecords", "newRecords"];
    recordsLocList.forEach((location: string) => {
      patch[location].forEach((rPatch: IRQSearchRecord) => {
        let shouldAdd = true;

        recordsLocList.forEach((location2: string) => {
          const existantValue: IRQSearchRecord = src[location2]
            .find((r2: IRQSearchRecord) => r2.id === rPatch.id && r2.version === rPatch.version && rPatch.type === r2.type);

          if (existantValue) {
            const nanodatesrc = new NanoSecondComposedDate(existantValue.last_modified);
            const nanodatepatch = new NanoSecondComposedDate(rPatch.last_modified);

            if (nanodatepatch.lessThan(nanodatesrc)) {
              // we do not add since we consider this patch of a record
              // outdated compared to what is already in the event
              shouldAdd = false;
            } else {
              // we patch and we need to remove the current record
              // that is older than our patch
              src[location2] = src[location2]
                .filter((r2: IRQSearchRecord) => !(r2.id === rPatch.id && r2.version === rPatch.version && rPatch.type === r2.type));
            }
          }
        });

        if (shouldAdd) {
          src[location].push(rPatch);
        }
      });
    });

    // we only change the date if such is greater than the one in the source
    // we are attempting to patch
    const nanodatesrc = new NanoSecondComposedDate(src.newLastModified);
    const nanodatepatch = new NanoSecondComposedDate(patch.newLastModified);
    if (nanodatesrc.lessThan(nanodatepatch)) {
      src.newLastModified = patch.newLastModified;
    }
  }
  public async globalRedisListener(
    channel: string,
    message: string,
  ) {
    const redisEvent: IRedisEvent = JSON.parse(message);
    CAN_LOG_DEBUG && logger.debug(
      {
        className: "Listener",
        methodName: "globalRedisListener",
        message: "Received redis event " + channel,
        data: {
          event: redisEvent,
        },
      },
    );

    if (redisEvent.source !== "global") {
      // this happens when we use the same redis database for both global and local
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "globalRedisListener",
          message: "Redis event source is not global; ignoring",
        },
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
      if (serverInstanceGroupId === CLUSTER_ID) {
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Listener",
            methodName: "globalRedisListener",
            message: "Our own instance group id " + CLUSTER_ID + " was the emitter of " + channel + "; ignoring event",
          },
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
        {
          className: "Listener",
          methodName: "globalRedisListener",
          message: "Our own server is expecting " + channel,
        },
      );

      const serverInstanceGroupId = redisEvent.serverInstanceGroupId;
      if (serverInstanceGroupId === CLUSTER_ID) {
        // when we were the originators, our local cache is expected
        // to have been updated, as such, we literally don't care
        CAN_LOG_DEBUG && logger.debug(
          {
            className: "Listener",
            methodName: "globalRedisListener",
            message: "Our own instance group id " + CLUSTER_ID + " was the emitter of " + channel + "; ignoring event",
          },
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
                {
                  className: "Listener",
                  methodName: "globalRedisListener",
                  message: "Socket " + socketKey + " is listening; but was also the initial emitter of " + channel + "; ignoring",
                },
              );
            } else {
              CAN_LOG_DEBUG && logger.debug(
                {
                  className: "Listener",
                  methodName: "globalRedisListener",
                  message: "Socket " + socketKey + " was expecting " + channel + "; emitting",
                },
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
      {
        className: "Listener",
        methodName: "localRedisListener",
        message: "Recieved redis event",
        data: {
          event: redisEvent,
        },
      },
    );

    if (redisEvent.source !== "local") {
      // this happens when we use the same redis database for both global and local
      CAN_LOG_DEBUG && logger.debug(
        {
          className: "Listener",
          methodName: "localRedisListener",
          message: "Redis event source is not local; ignoring",
        },
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

    this.customDisconnectEvents.forEach((l) => l({ userData: listenerData.user, socket, listener: this }));

    CAN_LOG_DEBUG && logger.debug(
      {
        className: "Listener",
        methodName: "removeSocket",
        message: "Removing socket " + socket.id,
      },
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
          {
            className: "Listener",
            methodName: "removeSocket",
            message: "Redis unsubscribing off " + listensMergedIdentifier,
          },
        );
        this.redisGlobalSub.redisClient.unsubscribe(listensMergedIdentifier);
      }
    });
    delete this.listeners[socket.id];
    delete this.awaitingBasicFeedbacks[socket.id];
    delete this.awaitingOwnedParentedSearchEvents[socket.id];
    delete this.awaitingParentedSearchEvents[socket.id];
    delete this.awaitingOwnedSearchEvents[socket.id];
    delete this.awaitingPropertySearchEvents[socket.id];
  }
  public onClusterManagerResetInformed() {
    // the redis database has been wiped if this happened here
    // as such now we might have issues with sync, as the users might
    // have not received changes, as such, we will check every listener
    // and force the users to reqeust for feedback by making a last modified
    // event

    CAN_LOG_DEBUG && logger.debug(
      {
        className: "Listener",
        methodName: "onClusterManagerResetInformed",
        message: "Received cluster manager reset event; " +
          "this means the cluster manager died out and restarted; now all the clients must be reconnected",
      },
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
      {
        className: "Listener",
        methodName: "informClusterManagerReset",
        message: "Informing a reset of the cluster manager",
      },
    );
    const redisEvent: IRedisEvent = {
      type: CLUSTER_MANAGER_RESET,
      serverInstanceGroupId: CLUSTER_ID,
      source: "local",
      mergedIndexIdentifier: null,
    }
    this.redisLocalPub.redisClient.publish(CLUSTER_MANAGER_RESET, JSON.stringify(redisEvent));
  }

  /**
   * This function handles a custom event internally
   * as it's received from the client provided that it's accepted
   * @param event the event to be recieved
   * @param socket the socket that sent it
   * @param data the data that it sent
   * @param callback the ack callback function, all custom events are acked
   * @returns 
   */
  private async handleCustomEvent(
    event: string,
    socket: Socket,
    data: any,
    callback: (rs: any) => void,
  ) {
    // get the listener
    const listener = this.customEvents[event];
    if (!listener) {
      // what?
      return;
    }
    // get the user data
    const userData = (this.listeners[socket.id]?.user || null);
    // call the listener
    try {
      const rs = await listener(data, { userData, socket, listener: this });
      // all dandy
      callback({
        error: null,
        data: rs || null,
      });
    } catch (err) {
      // now an error
      if (err instanceof EndpointError) {
        // standard error let's respond
        callback({
          error: err.data,
          data: null,
        });
      } else {
        // deadly unexpected error
        logger.error({
          message: "Failed to handle custom event " + event,
          className: "Listener",
          methodName: "handleCustomEvent",
          data: {
            data,
            event,
          },
          err: err,
          serious: true,
        });
        // respond with internal server error
        callback({
          error: {
            code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
            message: "Couldn't handle event while listening"
          },
          data: null,
        });
      }
    }
  }

  public sendWithCustomEvent(
    event: string,
    socket: Socket,
    data: any,
  ) {
    if (!customEventListenerRegex.test(event)) {
      throw new Error("Invalid custom event id " + JSON.stringify(event));
    }

    socket.emit(event, data);
    return;
  }

  /**
   * Adds a custom event listener to the listening pipeline
   * the event id must start with $ sign and fit the criteria a-zA-Z- to be valid
   * 
   * the event listener gets added once and only once, it is
   * not allowed to stack
   * 
   * @param event 
   * @param handler 
   */
  public registerCustomEventListener(
    event: string,
    handler: CustomListenerEventHandler,
  ) {
    if (!customEventListenerRegex.test(event)) {
      throw new Error("Invalid custom event id " + JSON.stringify(event));
    } else if (this.customEvents[event]) {
      throw new Error("Custom event " + JSON.stringify(event) + " has already been registered");
    }

    this.customEvents[event] = handler;

    Object.keys(this.listeners).forEach((sId) => {
      const socket = this.listeners[sId].socket;
      socket.on(event, this.handleCustomEvent.bind(this, event, socket))
    });
  }

  /**
   * Adds a handler for a disconnect event
   * 
   * @param handler 
   */
  public addCustomDisconnectEventListener(handler: CustomListenerDisconnectHandler) {
    this.customDisconnectEvents.push(handler);
  }

  public async handleRQRequest(
    socket: Socket,
    request: IWSRQRequest,
  ) {
    const token = this.listeners[socket.id]?.token || null;

    if (!this.rqSchemaWResolvers) {
      const response: IWSRQResponse = {
        uuid: request.uuid,
        response: {
          errors: [
            {
              error: {
                code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
                message: "This server was exposed to the client but it cannot handle rq over websockets",
              },
              source: request.target,
            }
          ],
          data: null,
        }
      }
      socket.emit(RQ_RESPONSE, response);
      return;
    }

    const name = request.request.n || request.target;

    const schemaRegion =
      this.rqSchemaWResolvers.query[name] ||
      this.rqSchemaWResolvers.mutation[name];

    if (!schemaRegion) {
      const response: IWSRQResponse = {
        uuid: request.uuid,
        response: {
          errors: [
            {
              error: {
                code: ENDPOINT_ERRORS.UNSPECIFIED,
                message: "Invalid request query location at " + request.target,
              },
              source: request.target,
            }
          ],
          data: null,
        }
      }
      socket.emit(RQ_RESPONSE, response);
      return;
    }

    try {
      // our already processed arguments
      const args = request.request.args;
      // add the token if it uses it
      if (typeof args.token === "undefined") {
        args.token = token;
      }
      // we have no capacity to handle files
      // not over websockets
      // if files present this will burst into an error
      processArgs(null, schemaRegion.args, args, "");
      const fields = processFields(
        schemaRegion.stdFields,
        schemaRegion.ownFields,
        request.request.f,
      );

      // it must exist because it has been checked
      const value: IRQValue = await schemaRegion.resolve({
        args,
        fields,
      });
      const response: IWSRQResponse = {
        uuid: request.uuid,
        response: {
          data: {
            [request.target]: value,
          },
        }
      }
      socket.emit(RQ_RESPONSE, response);
      return;
    } catch (err) {
      if (err instanceof EndpointError) {
        const response: IWSRQResponse = {
          uuid: request.uuid,
          response: {
            errors: [
              {
                error: err.data,
                source: request.target,
              }
            ],
            data: null,
          }
        }
        socket.emit(RQ_RESPONSE, response);
        return;
      } else {
        // log error
        const err: EndpointErrorType = {
          message: "Internal Server Error while processing " + request.target,
          code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
        };
        const response: IWSRQResponse = {
          uuid: request.uuid,
          response: {
            errors: [
              {
                error: err,
                source: request.target,
              }
            ],
            data: null,
          }
        }
        socket.emit(RQ_RESPONSE, response);
        return;
      }
    }
  }
}