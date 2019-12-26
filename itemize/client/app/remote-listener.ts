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
  constructor(root: Root) {
    this.reattachListeners = this.reattachListeners.bind(this);
    this.onPossibleChangeListened = this.onPossibleChangeListened.bind(this);

    this.root = root;
    this.listeners = {};

    this.socket = io(`${location.protocol}//${location.host}`);
    this.socket.on("connect", this.reattachListeners);
    this.socket.on("changed", this.onPossibleChangeListened);
  }
  public addListenerFor(itemDefinition: ItemDefinition, forId: number) {
    this.listeners[itemDefinition.getQualifiedPathName() + "." + forId] = {
      id: forId,
      itemDefinition,
    };

    if (this.socket.connected) {
      this.socket.emit(
        "register",
        itemDefinition.getParentModule().getPath().join("/"),
        itemDefinition.getPath().join("/"),
        forId,
      );
    }
  }
  public requestFeedbackFor(itemDefinition: ItemDefinition, forId: number) {
    if (this.socket.connected) {
      this.socket.emit(
        "feedback",
        itemDefinition.getParentModule().getPath().join("/"),
        itemDefinition.getPath().join("/"),
        forId,
      );
    }
  }
  public removeListenerFor(itemDefinition: ItemDefinition, forId: number) {
    delete this.listeners[itemDefinition.getQualifiedPathName() + "." + forId];

    if (this.socket.connected) {
      this.socket.emit(
        "unregister",
        itemDefinition.getParentModule().getPath().join("/"),
        itemDefinition.getPath().join("/"),
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
    const itemDefinition =
      this.root.getModuleFor(modulePath.split("/")).getItemDefinitionFor(itemDefinitionPath.split("/"));
    const appliedGQLValue = itemDefinition.getGQLAppliedValue(id);
    if (appliedGQLValue) {
      if (uuid && appliedGQLValue.actionUUID !== uuid) {
        itemDefinition.triggerListeners("reload", id);
      // TODO check edited_at are same format
      } else if (editedAt !== appliedGQLValue.flattenedValue.edited_at) {
        itemDefinition.triggerListeners("reload", id);
      } else if (deleted) {
        itemDefinition.triggerListeners("deleted", id);
      }
    }
  }
  private reattachListeners() {
    // TODO automatic reconnect, ask for feedback when listeners reattached
    console.log("reattach listenrs asked");
  }
}
