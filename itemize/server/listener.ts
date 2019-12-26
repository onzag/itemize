import { Socket } from "socket.io";
import { IAppDataType } from ".";

interface IListenerList {
  [socketId: string]: {
    socket: Socket;
    listens: {
      [mergedIndexIdentifier: string]: boolean;
    }
    amount: number;
  };
}

export class Listener {
  private listeners: IListenerList = {};
  private appData: IAppDataType;
  constructor(appData: IAppDataType) {
    this.appData = appData;
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
        socket.emit("changed", modulePath, itemDefinitionPath, id, result.edited_at, null, false);
      } else if (!result) {
        socket.emit("changed", modulePath, itemDefinitionPath, id, null, null, true);
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
    changeUUID: string,
    deleted: boolean,
  ) {
    const mergedIndexIdentifier = modulePath + "." + itemDefinitionPath + "." + id;
    Object.keys(this.listeners).forEach((socketKey) => {
      const whatListening = this.listeners[socketKey].listens;
      if (whatListening[mergedIndexIdentifier]) {
        this.listeners[socketKey].socket.emit("changed", modulePath, itemDefinitionPath, id, null, changeUUID, deleted);
      }
    });
  }
  public removeSocket(socket: Socket) {
    delete this.listeners[socket.id];
  }
}
