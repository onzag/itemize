import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import io from "socket.io-client";
import Root from "../../base/Root";

// TODO automatic reconnect
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
  private isReconnect: boolean = false;
  private actionsInProgess: string[] = [];
  constructor(root: Root) {
    this.reattachListeners = this.reattachListeners.bind(this);
    this.onPossibleChangeListened = this.onPossibleChangeListened.bind(this);

    this.root = root;
    this.listeners = {};

    this.socket = io(`${location.protocol}//${location.host}`);
    this.socket.on("connect", this.reattachListeners);
    this.socket.on("changed", this.onPossibleChangeListened);
  }
  public addActionInProgress(uuid: string) {
    this.actionsInProgess.push(uuid);
  }
  public removeActionInProgress(uuid: string) {
    // removals are delayed
    // simple reason, it simplifies checks and the websocket might take some
    // time, if the websocket manages to come after 3 seconds, that still
    // is no issue, but it will be a wasted event on delete
    setTimeout(() => {
      this.actionsInProgess = this.actionsInProgess.filter((u) => u !== uuid);
    }, 3000);
  }
  public addListenerFor(itemDefinition: ItemDefinition, forId: number) {
    this.listeners[itemDefinition.getQualifiedPathName() + "." + forId] = {
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
    editedAt: string,
    uuid: string,
    deleted: boolean,
  ) {
    console.log("feedback recieved with", modulePath, itemDefinitionPath, id, editedAt, uuid, deleted);
    if (this.actionsInProgess.includes(uuid)) {
      return;
    }

    const itemDefinition =
      this.root.getModuleFor(modulePath.split("/")).getItemDefinitionFor(itemDefinitionPath.split("/"));
    const appliedGQLValue = itemDefinition.getGQLAppliedValue(id);
    if (appliedGQLValue) {
      if (uuid && appliedGQLValue.actionUUID !== uuid) {
        console.log("triggering due to uuid");
        itemDefinition.triggerListeners("reload", id);
      // TODO check edited_at are same format
      } else if (editedAt !== appliedGQLValue.flattenedValue.edited_at) {
        console.log("triggering due to date");
        itemDefinition.triggerListeners("reload", id);
      } else if (deleted) {
        itemDefinition.triggerListeners("deleted", id);
      }
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
    // TODO automatic reconnect, ask for feedback when listeners reattached
    console.log("reattach listenrs asked");
  }
}
