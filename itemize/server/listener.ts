import { Socket } from "socket.io";
import { IAppDataType } from ".";
import { ISQLTableRowValue } from "../base/Root/sql";

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
  private appData: IAppDataType;
  constructor(appData: IAppDataType) {
    this.appData = appData;
    this.pubSubTriggerListeners = this.pubSubTriggerListeners.bind(this);

    this.appData.redisSub.on("message", this.pubSubTriggerListeners);
  }
  public setUUID(
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
    modulePath: string,
    itemDefinitionPath: string,
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

    const mergedIndexIdentifier = modulePath + "." + itemDefinitionPath + "." + id;
    if (!this.listeners[socket.id].listens[mergedIndexIdentifier]) {
      this.appData.redisSub.subscribe(mergedIndexIdentifier);
      this.listeners[socket.id].listens[mergedIndexIdentifier] = true;
      this.listeners[socket.id].amount++;
    }
  }
  public async requestFeedback(
    socket: Socket,
    modulePath: string,
    itemDefinitionPath: string,
    id: number,
  ) {
    try {
      const mod = this.appData.root.getModuleFor(modulePath.split("/"));
      const itemDefinition = mod.getItemDefinitionFor(itemDefinitionPath.split("/"));
      const queriedResult: ISQLTableRowValue = this.appData.cache.requestCache(
        itemDefinition.getQualifiedPathName(), mod.getQualifiedPathName(), id,
      );
      if (queriedResult) {
        socket.emit("changed", modulePath, itemDefinitionPath, id, "edited_at_feedback", queriedResult.edited_at);
      } else {
        socket.emit("changed", modulePath, itemDefinitionPath, id, "deleted", null);
      }
    } catch (err) {
      console.log(err);
      // not empty happy now
    }
  }
  public removeListener(
    socket: Socket,
    modulePath: string,
    itemDefinitionPath: string,
    id: number,
  ) {
    const mergedIndexIdentifier = modulePath + "." + itemDefinitionPath + "." + id;
    if (this.listeners[socket.id].listens[mergedIndexIdentifier]) {
      this.appData.redisSub.unsubscribe(mergedIndexIdentifier);
      delete this.listeners[socket.id].listens[mergedIndexIdentifier];
      this.listeners[socket.id].amount--;
    }
  }
  public triggerListeners(
    modulePath: string,
    itemDefinitionPath: string,
    id: number,
    listenerUUID: string,
    deleted: boolean,
  ) {
    console.log("requested trigger on", modulePath, itemDefinitionPath, id, listenerUUID, deleted);
    const mergedIndexIdentifier = modulePath + "." + itemDefinitionPath + "." + id;
    this.appData.redisPub.publish(mergedIndexIdentifier, JSON.stringify({
      modulePath,
      itemDefinitionPath,
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
          parsedContent.modulePath,
          parsedContent.itemDefinitionPath,
          parsedContent.id,
          parsedContent.deleted ? "deleted" : "modified",
          null,
        );
      }
    });
  }
  public removeSocket(socket: Socket) {
    delete this.listeners[socket.id];
  }
}
