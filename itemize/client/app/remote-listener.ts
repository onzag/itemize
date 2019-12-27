import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import io from "socket.io-client";
import Root from "../../base/Root";
import uuid from "uuid";

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
  private uuid: string = uuid.v4();
  private isReconnect: boolean = false;
  constructor(root: Root) {
    this.reattachListeners = this.reattachListeners.bind(this);
    this.onPossibleChangeListened = this.onPossibleChangeListened.bind(this);

    this.root = root;
    this.listeners = {};

    this.socket = io(`${location.protocol}//${location.host}`);
    this.socket.on("connect", this.reattachListeners);
    this.socket.on("changed", this.onPossibleChangeListened);
  }
  public getUUID() {
    return this.uuid;
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
        itemDefinition.triggerListeners("not_found", id);
      }
    } else if (type === "modified" || type === "last_modified") {
      itemDefinition.triggerListeners("reload", id);
    } else if (type === "not_found") {
      itemDefinition.triggerListeners("not_found", id);
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

    this.consumeDelayedFeedbacks();

    this.isReconnect = true;
    console.log("reattach listenrs asked");
  }
}
