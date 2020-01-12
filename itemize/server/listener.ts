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

interface IListenerList {
  [socketId: string]: {
    socket: Socket;
    listens: {
      [mergedIndexIdentifier: string]: boolean;
    };
    ownedListens: {
      [mergedIndexIdentifier: string]: boolean;
    };
    amount: number;
    uuid: string;
  };
}

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

    this.pubSubTriggerListeners = this.pubSubTriggerListeners.bind(this);

    this.redisSub.on("message", this.pubSubTriggerListeners);

    const io = ioMain(server);
    io.on("connection", (socket) => {
      this.addSocket(socket);
      socket.on("register", (qualifiedPathName: string, id: number) => {
        this.addListener(socket, qualifiedPathName, id);
      });
      socket.on("owned-search-register", (qualifiedPathName: string, token: string, createdBy: number) => {
        this.addOwnedSearchListener(socket, qualifiedPathName, token, createdBy);
      });
      socket.on("identify", (uuid: string) => {
        this.identify(socket, uuid);
      });
      socket.on("feedback", (qualifiedPathName: string, id: number) => {
        this.requestFeedback(socket, qualifiedPathName, id);
      });
      socket.on("owned-search-feedback", (
        qualifiedPathName: string,
        token: string,
        createdBy: number,
        lastKnownRecord: number,
      ) => {
        this.requestOwnedSearchFeedback(socket, qualifiedPathName, token, createdBy, lastKnownRecord);
      });
      socket.on("unregister", (qualifiedPathName: string, id: number) => {
        this.removeListener(socket, qualifiedPathName, id);
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
      "buildnumber",
      this.buildnumber,
    );
  }
  public identify(
    socket: Socket,
    uuid: string,
  ) {
    if (!this.listeners[socket.id]) {
      this.listeners[socket.id] = {
        socket,
        listens: {},
        ownedListens: {},
        uuid,
        amount: 0,
      };
    } else {
      this.listeners[socket.id].uuid = uuid;
    }
  }
  public addListener(
    socket: Socket,
    qualifiedPathName: string,
    id: number,
  ) {
    if (!this.listeners[socket.id]) {
      this.listeners[socket.id] = {
        socket,
        listens: {},
        ownedListens: {},
        uuid: null,
        amount: 0,
      };
    }

    // do not allow more than 500 concurrent listeners
    if (this.listeners[socket.id].amount > 500) {
      return;
    }

    const mergedIndexIdentifier = qualifiedPathName + "." + id;
    if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
      this.redisSub.subscribe(mergedIndexIdentifier);
      this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
      this.listeners[socket.id].amount++;
    }
  }
  public addOwnedSearchListener(
    socket: Socket,
    qualifiedPathName: string,
    token: string,
    createdBy: number,
  ) {
    // TODO check token allows this user to search within here otherwise giving
    // he will be able to see any new records added

    if (!this.listeners[socket.id]) {
      this.listeners[socket.id] = {
        socket,
        listens: {},
        ownedListens: {},
        uuid: null,
        amount: 0,
      };
    }

    // do not allow more than 500 concurrent listeners
    if (this.listeners[socket.id].amount > 500) {
      return;
    }

    const mergedIndexIdentifier = "OWNED_SEARCH." + qualifiedPathName + "." + createdBy;
    if (!this.listeners[socket.id].ownedListens[mergedIndexIdentifier]) {
      this.redisSub.subscribe(mergedIndexIdentifier);
      this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
      this.listeners[socket.id].amount++;
    }
  }
  public async requestOwnedSearchFeedback(
    socket: Socket,
    qualifiedPathName: string,
    token: string,
    createdBy: number,
    lastKnownRecord: number,
  ) {
    try {
      const itemDefinitionOrModule = Root.Registry[qualifiedPathName];
      if (!itemDefinitionOrModule) {
        return;
      }

      let mod: Module;
      let requiredType: string = null;
      if (itemDefinitionOrModule instanceof ItemDefinition) {
        mod = itemDefinitionOrModule.getParentModule();
        requiredType = qualifiedPathName;
      } else {
        mod = itemDefinitionOrModule;
      }

      // TODO check token allows this user to search within here otherwise giving
      // 0 as the lastKnownRecord will run the search, check the search.ts to see
      // how it is done

      const query = this.knex.select(["id", "type"]).from(mod.getQualifiedPathName());
      if (requiredType) {
        query.where("type", requiredType);
      }

      query.andWhere("created_by", createdBy);
      query.andWhere("id", ">", lastKnownRecord);

      const newRecords: ISQLTableRowValue[] = await query;

      if (newRecords.length) {
        socket.emit(
          "owned-search-added-records",
          qualifiedPathName,
          createdBy,
          newRecords,
          Math.max.apply(null, newRecords.map((r) => r.id)),
        );
      }
    } catch (err) {
      console.log(err);
      // not empty happy now
    }
  }
  public async requestFeedback(
    socket: Socket,
    qualifiedPathName: string,
    id: number,
  ) {
    try {
      const itemDefinition: ItemDefinition = Root.Registry[qualifiedPathName] as ItemDefinition;
      if (!itemDefinition) {
        return;
      }
      const mod = itemDefinition.getParentModule();
      const queriedResult: ISQLTableRowValue = await this.cache.requestCache(
        itemDefinition.getQualifiedPathName(), mod.getQualifiedPathName(), id,
      );
      if (queriedResult) {
        socket.emit(
          "changed",
          qualifiedPathName,
          id,
          "last_modified",
          queriedResult.last_modified,
        );
      } else {
        socket.emit("changed", qualifiedPathName, id, "not_found", null);
      }
    } catch (err) {
      console.log(err);
      // not empty happy now
    }
  }
  public removeListener(
    socket: Socket,
    qualifiedPathName: string,
    id: number,
  ) {
    const mergedIndexIdentifier = qualifiedPathName + "." + id;
    if (this.listeners[socket.id].listens[mergedIndexIdentifier]) {
      delete this.listeners[socket.id].listens[mergedIndexIdentifier];
      this.listeners[socket.id].amount--;
      const noSocketsListeningLeft = Object.keys(this.listeners).every((socketId) => {
        return !this.listeners[socketId].listens[mergedIndexIdentifier];
      });
      if (!noSocketsListeningLeft) {
        this.redisSub.unsubscribe(mergedIndexIdentifier);
      }
    }
  }
  public removeOwnedSearchListener(
    socket: Socket,
    qualifiedPathName: string,
    createdBy: number,
  ) {
    const mergedIndexIdentifier = "OWNED_SEARCH." + qualifiedPathName + "." + createdBy;
    if (this.listeners[socket.id].ownedListens[mergedIndexIdentifier]) {
      delete this.listeners[socket.id].ownedListens[mergedIndexIdentifier];
      this.listeners[socket.id].amount--;
      const noSocketsListeningLeft = Object.keys(this.listeners).every((socketId) => {
        return !this.listeners[socketId].ownedListens[mergedIndexIdentifier];
      });
      if (!noSocketsListeningLeft) {
        this.redisSub.unsubscribe(mergedIndexIdentifier);
      }
    }
  }
  public triggerListeners(
    qualifiedPathName: string,
    id: number,
    listenerUUID: string,
    deleted: boolean,
  ) {
    console.log("requested trigger on", qualifiedPathName, id, listenerUUID, deleted);
    const mergedIndexIdentifier = qualifiedPathName + "." + id;
    this.redisPub.publish(mergedIndexIdentifier, JSON.stringify({
      qualifiedPathName,
      id,
      listenerUUID,
      deleted,
      mergedIndexIdentifier,
      eventType: "changed",
    }));
  }
  public triggerOwnedSearchListeners(
    qualifiedPathName: string,
    createdBy: number,
    id: number,
    type: string,
    listenerUUID: string,
  ) {
    console.log("requested owned search trigger on", qualifiedPathName, createdBy, id, type, listenerUUID);
    const mergedIndexIdentifier = "OWNED_SEARCH." + qualifiedPathName + "." + id;
    this.redisPub.publish(mergedIndexIdentifier, JSON.stringify({
      qualifiedPathName,
      id,
      type,
      createdBy,
      listenerUUID,
      mergedIndexIdentifier,
      eventType: "owned-search-added-records",
    }));
  }
  public pubSubTriggerListeners(
    channel: string,
    message: string,
  ) {
    const parsedContent = JSON.parse(message);
    console.log(parsedContent);
    Object.keys(this.listeners).forEach((socketKey) => {
      if (parsedContent.eventType === "changed") {
        const whatListening = this.listeners[socketKey].listens;
        if (whatListening[parsedContent.mergedIndexIdentifier] &&
          this.listeners[socketKey].uuid !== parsedContent.listenerUUID) {
          console.log("emitting to someone");
          this.listeners[socketKey].socket.emit(
            "changed",
            parsedContent.qualifiedPathName,
            parsedContent.id,
            parsedContent.deleted ? "not_found" : "modified",
            null,
          );
        }
      } else if (parsedContent.eventType === "owned-search-added-records") {
        const whatListening = this.listeners[socketKey].ownedListens;
        if (whatListening[parsedContent.mergedIndexIdentifier] &&
          this.listeners[socketKey].uuid !== parsedContent.listenerUUID) {
          console.log("emitting to someone");
          this.listeners[socketKey].socket.emit(
            "owned-search-added-records",
            parsedContent.qualifiedPathName,
            parsedContent.createdBy,
            [
              {
                id: parsedContent.id,
                type: parsedContent.type,
              },
            ],
            parsedContent.id,
          );
        }
      }
    });
  }
  public removeSocket(socket: Socket) {
    delete this.listeners[socket.id];
  }
}
