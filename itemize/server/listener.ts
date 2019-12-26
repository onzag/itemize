import { Socket } from "socket.io";
import { IAppDataType } from ".";

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
      const result = await this.appData.knex.first("edited_at").from(mod.getQualifiedPathName()).where({
        id,
      });
      if (result) {
        socket.emit("changed", modulePath, itemDefinitionPath, id, "edited_at_feedback", result.edited_at);
      } else if (!result) {
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
    Object.keys(this.listeners).forEach((socketKey) => {
      const whatListening = this.listeners[socketKey].listens;
      if (whatListening[mergedIndexIdentifier] && this.listeners[socketKey].uuid !== listenerUUID) {
        console.log("emitting to someone");
        this.listeners[socketKey].socket.emit(
          "changed",
          modulePath,
          itemDefinitionPath,
          id,
          deleted ? "deleted" : "modified",
          null,
        );
      }
    });
  }
  public removeSocket(socket: Socket) {
    delete this.listeners[socket.id];
  }
}
