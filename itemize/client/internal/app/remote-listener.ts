import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import io from "socket.io-client";
import Root from "../../../base/Root";
import uuid from "uuid";
import CacheWorkerInstance from "../workers/cache";
import { PREFIX_GET } from "../../../constants";

export class RemoteListener {
  private socket: SocketIOClient.Socket;
  private root: Root;
  private listeners: {
    [qualifiedPathNameWithId: string]: {
      id: number,
      itemDefinition: ItemDefinition;
      parentInstances: any[],
    },
  };
  private ownedSearchListeners: {
    [qualifiedPathNameWithOwnerId: string]: {
      token: string;
      createdBy: number,
      searchModeItemDefinition: ItemDefinition;
      parentInstances: any[];
      lastRecord: number;
    },
  };
  private delayedFeedbacks: Array<{
    itemDefinition: ItemDefinition;
    forId: number;
  }> = [];
  private connectionListeners: Array<() => void> = [];
  private appUpdatedListeners: Array<() => void> = [];
  private lastRecievedBuildNumber: string;
  private uuid: string = uuid.v4();
  private isReconnect: boolean = false;
  private offline: boolean = false;
  private initialConsideredDisconnectedIfNoAnswerTimeout: NodeJS.Timeout;
  constructor(root: Root) {
    this.reattachListeners = this.reattachListeners.bind(this);
    this.onPossibleChangeListened = this.onPossibleChangeListened.bind(this);
    this.onPossibleAppUpdateListened = this.onPossibleAppUpdateListened.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);

    this.root = root;
    this.listeners = {};
    this.ownedSearchListeners = {};
    this.connectionListeners = [];
    this.appUpdatedListeners = [];
    this.lastRecievedBuildNumber = (window as any).BUILD_NUMBER;

    this.initialConsideredDisconnectedIfNoAnswerTimeout = setTimeout(() => {
      this.offline = true;
      this.isReconnect = true;
      this.connectionListeners.forEach((l) => l());
    }, 1000);

    this.socket = io(`${location.protocol}//${location.host}`);
    this.socket.on("connect", this.reattachListeners);
    this.socket.on("changed", this.onPossibleChangeListened);
    this.socket.on("buildnumber", this.onPossibleAppUpdateListened);
    this.socket.on("disconnect", this.onDisconnect);
  }
  public onPossibleAppUpdateListened(buildNumber: string) {
    this.lastRecievedBuildNumber = buildNumber;
    if (this.isAppUpdated()) {
      // this will trigger the service worker to realize the app has
      // updated if any service worker is active
      try {
        fetch("/rest/buildnumber?current=" + (window as any).BUILD_NUMBER);
      } catch (err) {
        // if it fails the service worker should be able to
        // handle it stills by reloading twice
      }
      // trigger the listeners
      this.appUpdatedListeners.forEach((l) => l());
    }
  }
  public getUUID() {
    return this.uuid;
  }
  public isOffline() {
    return this.offline;
  }
  public addAppUpdatedListener(listener: () => void) {
    this.appUpdatedListeners.push(listener);
  }
  public removeAppUpdatedListener(listener: () => void) {
    const index = this.appUpdatedListeners.indexOf(listener);
    if (index !== -1) {
      this.appUpdatedListeners.splice(index, 1);
    }
  }
  public isAppUpdated() {
    return this.lastRecievedBuildNumber !== (window as any).BUILD_NUMBER;
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
  public addItemDefinitionListenerFor(parentInstance: any, itemDefinition: ItemDefinition, forId: number) {
    const qualifiedIdentifier = itemDefinition.getQualifiedPathName() + "." + forId;
    if (this.listeners[qualifiedIdentifier]) {
      this.listeners[qualifiedIdentifier].parentInstances.push(parentInstance);
      return;
    }

    this.listeners[qualifiedIdentifier] = {
      id: forId,
      itemDefinition,
      parentInstances: [parentInstance],
    };

    this.attachItemDefinitionListenerFor(itemDefinition, forId);
  }
  public attachItemDefinitionListenerFor(itemDefinition: ItemDefinition, forId: number) {
    const qualifiedPathName = itemDefinition.getQualifiedPathName();

    if (this.socket.connected) {
      console.log("registering", qualifiedPathName, forId);
      this.socket.emit(
        "register",
        qualifiedPathName,
        forId,
      );
    }
  }
  public attachOwnedSearchItemDefinitionListenerFor(
    searchModeItemDefinition: ItemDefinition,
    token: string,
    createdBy: number,
  ) {
    const standardCounterpart = searchModeItemDefinition.getStandardCounterpart();
    const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
      standardCounterpart.getParentModule().getQualifiedPathName() :
      standardCounterpart.getQualifiedPathName());

    if (this.socket.connected) {
      console.log("owned-search registering", standardCounterpartQualifiedName, token, createdBy);
      this.socket.emit(
        "owned-search-register",
        standardCounterpartQualifiedName,
        token,
        createdBy,
      );
    }
  }
  public requestOwnedSearchFeedbackFor(
    searchModeItemDefinition: ItemDefinition,
    token: string,
    createdBy: number,
    lastRecord: number,
  ) {
    const standardCounterpart = searchModeItemDefinition.getStandardCounterpart();
    const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
      standardCounterpart.getParentModule().getQualifiedPathName() :
      standardCounterpart.getQualifiedPathName());
    this.socket.emit(
      "owned-search-feedback",
      standardCounterpartQualifiedName,
      token,
      createdBy,
      lastRecord,
    );
  }
  public addOwnedSearchItemDefinitionListenerFor(
    searchModeItemDefinition: ItemDefinition,
    token: string,
    createdBy: number,
    lastRecord: number,
    parentInstance: any,
  ) {
    const qualifiedIdentifier = searchModeItemDefinition.getQualifiedPathName() + "." + createdBy;
    if (this.ownedSearchListeners[qualifiedIdentifier]) {
      this.ownedSearchListeners[qualifiedIdentifier].parentInstances.push(parentInstance);
      return;
    }

    this.ownedSearchListeners[qualifiedIdentifier] = {
      token,
      createdBy,
      searchModeItemDefinition,
      parentInstances: [parentInstance],
      lastRecord,
    };

    this.attachOwnedSearchItemDefinitionListenerFor(searchModeItemDefinition, token, createdBy);
  }
  public requestFeedbackFor(itemDefinition: ItemDefinition, forId: number, immediate?: boolean) {
    if (immediate) {
      if (this.socket.connected) {
        this.socket.emit(
          "feedback",
          itemDefinition.getQualifiedPathName(),
          forId,
        );
      }
    } else if (
      this.delayedFeedbacks.every((df) => df.itemDefinition !== itemDefinition || df.forId !== forId)
    ) {
      this.delayedFeedbacks.push({
        forId,
        itemDefinition,
      });

      setTimeout(this.consumeDelayedFeedbacks.bind(this, forId), 70);
    }
  }
  public removeItemDefinitionListenerFor(parentInstance: any, itemDefinition: ItemDefinition, forId: number) {
    const qualifiedPathName = itemDefinition.getQualifiedPathName();
    const qualifiedID = qualifiedPathName + "." + forId;
    const listenerValue = this.listeners[qualifiedID];
    if (listenerValue) {
      const newListenerValue = {
        ...listenerValue,
        parentInstances: listenerValue.parentInstances.filter((i) => i !== parentInstance),
      };
      if (newListenerValue.parentInstances.length === 0) {
        delete this.listeners[qualifiedID];
      } else {
        this.listeners[qualifiedID] = newListenerValue;
      }
    }

    if (this.socket.connected) {
      this.socket.emit(
        "unregister",
        qualifiedPathName,
        forId,
      );
    }
  }
  private onPossibleChangeListened(
    qualifiedPathName: string,
    id: number,
    type: "modified" | "not_found" | "last_modified",
    lastModifiedFeedback: string,
  ) {
    console.log("feedback recieved with", qualifiedPathName, id, type, lastModifiedFeedback);

    const itemDefinition: ItemDefinition = Root.Registry[qualifiedPathName] as ItemDefinition;
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
        if (this.socket.connected) {
          this.socket.emit(
            "feedback",
            df.itemDefinition.getQualifiedPathName(),
            df.forId,
          );
        }

        return false;
      }

      return true;
    });
  }
  private reattachListeners() {
    this.offline = false;
    clearTimeout(this.initialConsideredDisconnectedIfNoAnswerTimeout);

    this.socket.emit(
      "identify",
      this.uuid,
    );

    Object.keys(this.listeners).forEach((listenerKey) => {
      const itemDefinition = this.listeners[listenerKey].itemDefinition;
      const forId = this.listeners[listenerKey].id;
      this.attachItemDefinitionListenerFor(itemDefinition, forId);
      if (this.isReconnect) {
        this.requestFeedbackFor(itemDefinition, forId, true);
      }
    });

    Object.keys(this.ownedSearchListeners).forEach((listenerKey) => {
      const searchModeItemDefinition = this.ownedSearchListeners[listenerKey].searchModeItemDefinition;
      const token = this.ownedSearchListeners[listenerKey].token;
      const createdBy = this.ownedSearchListeners[listenerKey].createdBy;
      this.attachOwnedSearchItemDefinitionListenerFor(searchModeItemDefinition, token, createdBy);
      if (this.isReconnect) {
        const lastRecord = this.ownedSearchListeners[listenerKey].lastRecord;
        this.requestOwnedSearchFeedbackFor(searchModeItemDefinition, token, createdBy, lastRecord);
      }
    });

    if (this.isReconnect) {
      this.connectionListeners.forEach((l) => l());
    }

    this.isReconnect = true;
    console.log("reattach listenrs asked");
  }
  private onDisconnect() {
    this.offline = true;
    this.connectionListeners.forEach((l) => l());
  }
}
