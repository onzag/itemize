import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import io from "socket.io-client";
import Root from "../../base/Root";
import uuid from "uuid";
import CacheWorkerInstance from "../workers/cache";
import { PREFIX_GET } from "../../constants";

export class RemoteListener {
  private socket: SocketIOClient.Socket;
  private root: Root;
  private listeners: {
    [qualifiedPathNameWithId: string]: {
      id: number,
      itemDefinition: ItemDefinition;
    },
  };
  private delayedFeedbacks: Array<{
    itemDefinition: ItemDefinition;
    forId: number;
  }> = [];
  private connectionListeners: Array<() => void> = [];
  private uuid: string = uuid.v4();
  private isReconnect: boolean = false;
  private offline: boolean = false;
  constructor(root: Root) {
    this.reattachListeners = this.reattachListeners.bind(this);
    this.onPossibleChangeListened = this.onPossibleChangeListened.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);

    this.root = root;
    this.listeners = {};

    this.socket = io(`${location.protocol}//${location.host}`);
    this.socket.on("connect", this.reattachListeners);
    this.socket.on("changed", this.onPossibleChangeListened);
    this.socket.on("disconnect", this.onDisconnect);
  }
  public getUUID() {
    return this.uuid;
  }
  public isOffline() {
    return this.offline;
  }
  public addConnectStatusListener(listener: () => void) {
    this.connectionListeners.push(listener);
  }
  public removeConnectStatusListener(listener: () => void) {
    const index = this.connectionListeners.indexOf(listener);
    if (index !== -1) {
      this.connectionListeners.splice(index, 1);
    }
  }
  public addListenerFor(itemDefinition: ItemDefinition, forId: number) {
    const qualifiedIdentifier = itemDefinition.getQualifiedPathName() + "." + forId;
    if (this.listeners[qualifiedIdentifier]) {
      return;
    }

    this.listeners[qualifiedIdentifier] = {
      id: forId,
      itemDefinition,
    };

    const modulePath = itemDefinition.getParentModule().getPath().join("/");
    const idefPath = itemDefinition.getPath().join("/");

    if (this.socket.connected) {
      this.socket.emit(
        "register",
        modulePath,
        idefPath,
        forId,
      );
    }
  }
  public requestFeedbackFor(itemDefinition: ItemDefinition, forId: number) {
    if (
      this.delayedFeedbacks.every((df) => df.itemDefinition !== itemDefinition && df.forId !== forId)
    ) {
      this.delayedFeedbacks.push({
        forId,
        itemDefinition,
      });

      setTimeout(this.consumeDelayedFeedbacks.bind(this, forId), 70);
    }
  }
  public removeListenerFor(itemDefinition: ItemDefinition, forId: number) {
    delete this.listeners[itemDefinition.getQualifiedPathName() + "." + forId];

    const modulePath = itemDefinition.getParentModule().getPath().join("/");
    const idefPath = itemDefinition.getPath().join("/");

    if (this.socket.connected) {
      this.socket.emit(
        "unregister",
        modulePath,
        idefPath,
        forId,
      );
    }
  }
  private onPossibleChangeListened(
    modulePath: string,
    itemDefinitionPath: string,
    id: number,
    type: "modified" | "not_found" | "last_modified",
    lastModifiedFeedback: string,
  ) {
    console.log("feedback recieved with", modulePath, itemDefinitionPath, id, type, lastModifiedFeedback);

    const itemDefinition =
      this.root.getModuleFor(modulePath.split("/")).getItemDefinitionFor(itemDefinitionPath.split("/"));
    const appliedGQLValue = itemDefinition.getGQLAppliedValue(id);
    if (appliedGQLValue) {
      if (
        type === "modified" ||
        (
          type === "last_modified" &&
          lastModifiedFeedback !== appliedGQLValue.flattenedValue.last_modified
        )
      ) {
        itemDefinition.triggerListeners("reload", id);
      } else if (type === "not_found") {
        itemDefinition.cleanValueFor(id);
        if (CacheWorkerInstance.isSupported) {
          CacheWorkerInstance.instance.setCachedValue(
            PREFIX_GET + itemDefinition.getQualifiedPathName(), id, null, null,
          );
        }
        itemDefinition.triggerListeners("change", id);
      }
    } else if (type === "modified" || type === "last_modified") {
      itemDefinition.triggerListeners("reload", id);
    } else if (type === "not_found") {
      itemDefinition.cleanValueFor(id);
      if (CacheWorkerInstance.isSupported) {
        CacheWorkerInstance.instance.setCachedValue(
          PREFIX_GET + itemDefinition.getQualifiedPathName(), id, null, null,
        );
      }
      itemDefinition.triggerListeners("change", id);
    }
  }
  private consumeDelayedFeedbacks(forAnSpecificId?: number) {
    this.delayedFeedbacks = this.delayedFeedbacks.filter((df) => {
      if (!forAnSpecificId || forAnSpecificId === df.forId) {
        const modulePath = df.itemDefinition.getParentModule().getPath().join("/");
        const idefPath = df.itemDefinition.getPath().join("/");

        this.socket.emit(
          "feedback",
          modulePath,
          idefPath,
          df.forId,
        );

        return false;
      }

      return true;
    });
  }
  private reattachListeners() {
    this.socket.emit(
      "identify",
      this.uuid,
    );

    Object.keys(this.listeners).forEach((listenerKey) => {
      const itemDefinition = this.listeners[listenerKey].itemDefinition;
      const forId = this.listeners[listenerKey].id;
      this.addListenerFor(itemDefinition, forId);
      if (
        this.isReconnect &&
        this.delayedFeedbacks.every((df) => df.itemDefinition !== itemDefinition && df.forId !== forId)
      ) {
        this.requestFeedbackFor(itemDefinition, forId);
      }
    });

    if (this.isReconnect) {
      this.connectionListeners.forEach((l) => l());
    }

    this.consumeDelayedFeedbacks();

    this.isReconnect = true;
    this.offline = false;
    console.log("reattach listenrs asked");
  }
  private onDisconnect() {
    this.connectionListeners.forEach((l) => l());
    this.offline = true;
  }
}
