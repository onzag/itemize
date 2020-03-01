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

// TODO refactor all these methods to be proper objects, this is a mess of arguments
// do the same in the remote listener in the client side

export class Listener {
  private listeners: IListenerList = {};
  private redisSub: RedisClient;
  private redisPub: RedisClient;
  private buildnumber: string;
  private root: Root;
  private knex: Knex;
  private cache: Cache;
  constructor(
    buildnumber: string,
    redisSub: RedisClient,
    redisPub: RedisClient,
    root: Root,
    cache: Cache,
    knex: Knex,
    server: Server,
  ) {
    this.redisSub = redisSub;
    this.redisPub = redisPub;
    this.buildnumber = buildnumber;
    this.root = root;
    this.cache = cache;
    this.knex = knex;

    this.cache.setListener(this);

    this.pubSubTriggerListeners = this.pubSubTriggerListeners.bind(this);

    this.redisSub.on("message", this.pubSubTriggerListeners);

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
      this.listeners[socket.id] = {
        socket,
        listens: {},
        uuid: request.uuid,
        token: request.token,
        amount: 0,
      };
    } else {
      this.listeners[socket.id].uuid = request.uuid;
      this.listeners[socket.id].token = request.token;
    }

    socket.emit(
      IDENTIFIED_EVENT,
    );
  }
  public register(
    socket: Socket,
    request: IRegisterRequest,
  ) {
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
  public ownedSearchRegister(
    socket: Socket,
    request: IOwnedSearchRegisterRequest,
  ) {
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
  public parentedSearchRegister(
    socket: Socket,
    request: IParentedSearchRegisterRequest,
  ) {
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
  public async ownedSearchFeedback(
    socket: Socket,
    request: IOwnedSearchFeedbackRequest,
  ) {
    try {
      const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
      if (!itemDefinitionOrModule) {
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
        socket.emit(
          OWNED_SEARCH_RECORDS_ADDED_EVENT,
          event,
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
  public async parentedSearchFeedback(
    socket: Socket,
    request: IParentedSearchFeedbackRequest,
  ) {
    try {
      const itemDefinitionOrModule = this.root.registry[request.qualifiedPathName];
      if (!itemDefinitionOrModule) {
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
        socket.emit(
          PARENTED_SEARCH_RECORDS_ADDED_EVENT,
          event,
        );
      }
    } catch (err) {
      console.log(err);
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
        socket.emit(
          CHANGED_FEEEDBACK_EVENT,
          event,
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
  public removeListener(
    socket: Socket,
    mergedIndexIdentifier: string,
  ) {
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
  public triggerListeners(
    event: IChangedFeedbackEvent,
    listenerUUID: string,
  ) {
    const mergedIndexIdentifier = event.itemDefinition + "." + event.id + "." + (event.version || "");
    console.log("publishing to", mergedIndexIdentifier);
    this.redisPub.publish(mergedIndexIdentifier, JSON.stringify({
      event,
      listenerUUID,
      mergedIndexIdentifier,
      eventType: CHANGED_FEEEDBACK_EVENT,
    }));
  }
  public triggerOwnedSearchListeners(
    event: IOwnedSearchRecordsAddedEvent,
    listenerUUID: string,
  ) {
    const mergedIndexIdentifier = "OWNED_SEARCH." + event.qualifiedPathName + "." + event.createdBy;
    console.log("publishing to", mergedIndexIdentifier);
    this.redisPub.publish(mergedIndexIdentifier, JSON.stringify({
      event,
      listenerUUID,
      mergedIndexIdentifier,
      eventType: OWNED_SEARCH_RECORDS_ADDED_EVENT,
    }));
  }
  public triggerParentedSearchListeners(
    event: IParentedSearchRecordsAddedEvent,
    listenerUUID: string,
  ) {
    const mergedIndexIdentifier = "PARENTED_SEARCH." + event.qualifiedPathName + "." + event.parentType +
      "." + event.parentId + "." + (event.parentVersion || "");
    console.log("publishing to", mergedIndexIdentifier);
    this.redisPub.publish(mergedIndexIdentifier, JSON.stringify({
      event,
      listenerUUID,
      mergedIndexIdentifier,
      eventType: PARENTED_SEARCH_RECORDS_ADDED_EVENT,
    }));
  }
  public pubSubTriggerListeners(
    channel: string,
    message: string,
  ) {
    const parsedContent = JSON.parse(message);
    console.log(parsedContent);
    Object.keys(this.listeners).forEach((socketKey) => {
      const whatListening = this.listeners[socketKey].listens;
      if (whatListening[parsedContent.mergedIndexIdentifier] &&
        this.listeners[socketKey].uuid !== parsedContent.listenerUUID) {
        console.log("emitting to someone");
        this.listeners[socketKey].socket.emit(
          parsedContent.eventType,
          parsedContent.event,
        );
      }
    });
  }
  public removeSocket(socket: Socket) {
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
