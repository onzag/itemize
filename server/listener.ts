import { Socket } from "socket.io";
import { ISQLTableRowValue } from "../base/Root/sql";
import { RedisClient } from "redis";
import { Cache } from "./cache";
import { Server } from "http";
import Root from "../base/Root";
import ioMain from "socket.io";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import Knex from "knex";
import Module from "../base/Root/Module";
import {
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
} from "../base/remote-protocol";
import { IGQLSearchResult } from "../gql-querier";
import { convertVersionsIntoNullsWhenNecessary } from "./version-null-value";
import { logger } from ".";

interface IListenerList {
  [socketId: string]: {
    socket: Socket;
    listens: {
      [mergedIndexIdentifier: string]: boolean;
    };
    amount: number;
    uuid: string;
    token: string;
  };
}

interface IServerListensList {
  [mergedIndexIdentifier: string]: boolean;
}

// TODO refactor all these methods to be proper objects, this is a mess of arguments
// do the same in the remote listener in the client side

const INSTANCE_MODE = process.env.INSTANCE_MODE || "MANAGER";
const INSTANCE_GROUP_ID = process.env.INSTANCE_GROUP_ID || "UNIDENTIFIED";

const MANAGER_REGISTER_SS = "MANAGER_REGISTER_SS";

export class Listener {
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
  ) {
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
    if (INSTANCE_MODE === "MANAGER" || INSTANCE_MODE === "MANAGER_EXCLUSIVE") {
      this.redisLocalSub.on("message", this.pubSubLocalTriggerListeners);
      this.redisLocalSub.subscribe(MANAGER_REGISTER_SS);
    }

    if (server === null) {
      return;
    }

    // TODO we should validte the forms of every request, right now requests are not
    // validated

    const io = ioMain(server);
    io.on("connection", (socket) => {
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
  public identify(
    socket: Socket,
    request: IIdentifyRequest,
  ) {
    if (!this.listeners[socket.id]) {
      logger.debug(
        "Listener.identify: socket " + socket.id + " provides initial identification",
      );
      this.listeners[socket.id] = {
        socket,
        listens: {},
        uuid: request.uuid,
        token: request.token,
        amount: 0,
      };
    } else {
      logger.debug(
        "Listener.identify: socket " + socket.id + " updates identification criteria",
      );
      this.listeners[socket.id].uuid = request.uuid;
      this.listeners[socket.id].token = request.token;
    }

    socket.emit(
      IDENTIFIED_EVENT,
    );
  }
  public registerSS(
    request: IRegisterRequest,
  ) {
    const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
    logger.debug(
      "Listener.registerSS: Server instance requested subscribe to " + mergedIndexIdentifier,
    );

    if (INSTANCE_MODE !== "MANAGER") {
      logger.debug(
        "Listener.registerSS: instance is not manager piping request to manager",
      );
      this.redisLocalPub.publish(MANAGER_REGISTER_SS, JSON.stringify(request));
    } else {
      logger.debug(
        "Listener.registerSS: performing subscription as manager",
      );
      this.redisSub.subscribe(mergedIndexIdentifier);
      this.listensSS[mergedIndexIdentifier] = true;
    }
  }
  public register(
    socket: Socket,
    request: IRegisterRequest,
  ) {
    // TODO check if token allows to listen before adding

    if (!this.listeners[socket.id]) {
      logger.debug(
        "Listener.register: can't register listener to an unidentified socket " + socket.id,
      );
      return;
    }

    // do not allow more than 500 concurrent listeners
    if (this.listeners[socket.id].amount > 500) {
      logger.debug(
        "Listener.register: socket " + socket.id + " has exceeded the amount of listeners it can attach",
      );
      return;
    }

    const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
    if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
      logger.debug(
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
    // TODO check token allows this user to search within here otherwise giving
    // he will be able to see any new records added

    if (!this.listeners[socket.id]) {
      logger.debug(
        "Listener.ownedSearchRegister: can't register listener to an unidentified socket " + socket.id,
      );
      return;
    }

    // do not allow more than 500 concurrent listeners
    if (this.listeners[socket.id].amount > 500) {
      logger.debug(
        "Listener.ownedSearchRegister: socket " + socket.id + " has exceeded the amount of listeners it can attach",
      );
      return;
    }

    const mergedIndexIdentifier = "OWNED_SEARCH." + request.qualifiedPathName + "." + request.createdBy;
    if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
      logger.debug(
        "Listener.ownedSearchRegister: Subscribing socket " + socket.id + " to " + mergedIndexIdentifier,
      );
      this.redisSub.subscribe(mergedIndexIdentifier);
      this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
      this.listeners[socket.id].amount++;
    }
  }
  public parentedSearchRegister(
    socket: Socket,
    request: IParentedSearchRegisterRequest,
  ) {
    // TODO check token allows this user to search within here otherwise giving
    // he will be able to see any new records added

    if (!this.listeners[socket.id]) {
      logger.debug(
        "Listener.parentedSearchRegister: can't register listener to an unidentified socket " + socket.id,
      );
      return;
    }

    // do not allow more than 500 concurrent listeners
    if (this.listeners[socket.id].amount > 500) {
      logger.debug(
        "Listener.parentedSearchRegister: socket " + socket.id + " has exceeded the amount of listeners it can attach",
      );
      return;
    }

    const mergedIndexIdentifier = "PARENTED_SEARCH." + request.qualifiedPathName + "." +
      request.parentType + "." + request.parentId + "." + (request.parentVersion || "");
    if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
      logger.debug(
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
    try {
      const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
      if (!itemDefinitionOrModule) {
        logger.debug(
          "Listener.ownedSearchFeedback: could not find " + request.qualifiedPathName,
        );
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

      const newRecords: ISQLTableRowValue[] = (await query).map(convertVersionsIntoNullsWhenNecessary);

      if (newRecords.length) {
        const event: IOwnedSearchRecordsAddedEvent = {
          createdBy: request.createdBy,
          qualifiedPathName: request.qualifiedPathName,
          newIds: newRecords as IGQLSearchResult[],
          // this contains all the data and the new record has the right form
          newLastRecord: newRecords[0] as any,
        };
        logger.debug(
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
    try {
      const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
      if (!itemDefinitionOrModule) {
        logger.debug(
          "Listener.parentedSearchFeedback: could not find " + request.qualifiedPathName,
        );
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

      const newRecords: ISQLTableRowValue[] = (await query).map(convertVersionsIntoNullsWhenNecessary);

      if (newRecords.length) {
        const event: IParentedSearchRecordsAddedEvent = {
          parentId: request.parentId,
          parentVersion: request.parentVersion,
          parentType: request.parentType,
          qualifiedPathName: request.qualifiedPathName,
          newIds: newRecords as IGQLSearchResult[],
          newLastRecord: newRecords[0] as any,
        };
        logger.debug(
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
    // TODO check token allows for feedback

    try {
      const itemDefinition: ItemDefinition = this.root.registry[request.itemDefinition] as ItemDefinition;
      if (!itemDefinition || !(itemDefinition instanceof ItemDefinition)) {
        logger.debug(
          "Listener.feedback: could not find " + request.itemDefinition,
        );
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
        logger.debug(
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
        logger.debug(
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
      logger.debug(
        "Listener.removeListenerFinal: founds no sockets left for " + mergedIndexIdentifier + " plugging off redis",
      );
      this.redisSub.unsubscribe(mergedIndexIdentifier);
    }
  }
  public removeListener(
    socket: Socket,
    mergedIndexIdentifier: string,
  ) {
    if (this.listeners[socket.id].listens[mergedIndexIdentifier]) {
      logger.debug(
        "Listener.removeListener: unsubscribing socket " + socket.id + " from " + mergedIndexIdentifier,
      );
      delete this.listeners[socket.id].listens[mergedIndexIdentifier];
      this.listeners[socket.id].amount--;
      this.removeListenerFinal(mergedIndexIdentifier);
    }
  }
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
    const mergedIndexIdentifier = request.itemDefinition + "." + request.id + "." + (request.version || "");
    this.removeListener(socket, mergedIndexIdentifier);
  }
  public ownedSearchUnregister(
    socket: Socket,
    request: IOwnedSearchUnregisterRequest,
  ) {
    const mergedIndexIdentifier = "OWNED_SEARCH." + request.qualifiedPathName + "." + request.createdBy;
    this.removeListener(socket, mergedIndexIdentifier);
  }
  public parentedSearchUnregister(
    socket: Socket,
    request: IParentedSearchUnregisterRequest,
  ) {
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
    logger.debug(
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
    logger.debug(
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
    logger.debug(
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
    logger.debug(
      "Listener.pubSubTriggerListeners: received redis event",
      parsedContent,
    );

    // only the manager happens to recieve these
    if (this.listensSS[parsedContent.mergedIndexIdentifier]) {
      logger.debug(
        "Listener.pubSubTriggerListeners: our own server is expecting it",
      );

      const serverInstanceGroupId = parsedContent.serverInstanceGroupId;
      if (serverInstanceGroupId === INSTANCE_GROUP_ID) {
        logger.debug(
          "Listener.pubSubTriggerListeners: our own instance group id " + INSTANCE_GROUP_ID + " was the emitter, ignoring event",
        );
      } else {
        const event: IChangedFeedbackEvent = parsedContent.event;
        this.cache.onChangeInformed(event.itemDefinition, event.id, event.version || null, parsedContent.data);
      }
    }

    Object.keys(this.listeners).forEach((socketKey) => {
      const whatListening = this.listeners[socketKey].listens;
      if (whatListening[parsedContent.mergedIndexIdentifier] &&
        this.listeners[socketKey].uuid !== parsedContent.listenerUUID) {
        logger.debug(
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
    logger.debug(
      "Listener.pubSubLocalTriggerListeners: manager recieved register event",
      parsedContent,
    );

    this.registerSS(parsedContent);
  }
  public removeSocket(socket: Socket) {
    if (!this.listeners[socket.id]) {
      return;
    }

    logger.debug(
      "Listener.removeSocket: removing socket " + socket.id,
    );

    Object.keys(this.listeners[socket.id].listens).forEach((listensMergedIdentifier) => {
      const noSocketsListeningLeft = !this.listensSS[listensMergedIdentifier] &&
        Object.keys(this.listeners).every((socketId) => {
          if (socketId === socket.id) {
            return true;
          }
          return !this.listeners[socketId].listens[listensMergedIdentifier];
        });
      if (noSocketsListeningLeft) {
        logger.debug(
          "Listener.removeSocket: redis unsubscribing off " + listensMergedIdentifier,
        );
        this.redisSub.unsubscribe(listensMergedIdentifier);
      }
    });
    delete this.listeners[socket.id];
  }
}
