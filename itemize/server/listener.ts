import { Socket } from "socket.io";
import { ISQLTableRowValue } from "../base/Root/sql";
import { RedisClient } from "redis";
import { Cache } from "./cache";
import { Server } from "http";
import Root from "../base/Root";
import ioMain from "socket.io";
import ItemDefinition from "../base/Root/Module/ItemDefinition";

interface IListenerList {
  [socketId: string]: {
    socket: Socket;
    listens: {
      [mergedIndexIdentifier: string]: boolean;
    }
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
  private cache: Cache;
  constructor(
    buildnumber: string,
    redisSub: RedisClient,
    redisPub: RedisClient,
    root: Root,
    cache: Cache,
    server: Server,
  ) {
    this.redisSub = redisSub;
    this.redisPub = redisPub;
    this.buildnumber = buildnumber;
    this.root = root;
    this.cache = cache;

    this.pubSubTriggerListeners = this.pubSubTriggerListeners.bind(this);

    this.redisSub.on("message", this.pubSubTriggerListeners);

    const io = ioMain(server);
    io.on("connection", (socket) => {
      this.addSocket(socket);
      socket.on("register", (qualifiedPathName: string, id: number) => {
        this.addListener(socket, qualifiedPathName, id);
      });
      socket.on("identify", (uuid: string) => {
        this.identify(socket, uuid);
      });
      socket.on("feedback", (qualifiedPathName: string, id: number) => {
        this.requestFeedback(socket, qualifiedPathName, id);
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
      this.redisSub.unsubscribe(mergedIndexIdentifier);
      delete this.listeners[socket.id].listens[mergedIndexIdentifier];
      this.listeners[socket.id].amount--;
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
          "changed",
          parsedContent.qualifiedPathName,
          parsedContent.id,
          parsedContent.deleted ? "not_found" : "modified",
          null,
        );
      }
    });
  }
  public removeSocket(socket: Socket) {
    delete this.listeners[socket.id];
  }
}
