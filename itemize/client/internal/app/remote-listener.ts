import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import io from "socket.io-client";
import Root from "../../../base/Root";
import uuid from "uuid";
import CacheWorkerInstance from "../workers/cache";
import { PREFIX_GET, PREFIX_SEARCH, PREFIX_GET_LIST } from "../../../constants";
import { ISearchResult } from "../../../gql-querier";

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
      itemDefinition: ItemDefinition;
      callbacks: any[];
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
  public attachOwnedSearchListenerFor(
    itemDefinition: ItemDefinition,
    token: string,
    createdBy: number,
  ) {
    const qualifiedNameToRegister = (itemDefinition.isExtensionsInstance() ?
      itemDefinition.getParentModule().getQualifiedPathName() :
      itemDefinition.getQualifiedPathName());

    if (this.socket.connected) {
      console.log("owned-search registering", qualifiedNameToRegister, token, createdBy);
      this.socket.emit(
        "owned-search-register",
        qualifiedNameToRegister,
        token,
        createdBy,
      );
    }
  }
  public requestOwnedSearchFeedbackFor(
    itemDefinition: ItemDefinition,
    token: string,
    createdBy: number,
    lastRecord: number,
  ) {
    const qualifiedNameToRegister = (itemDefinition.isExtensionsInstance() ?
      itemDefinition.getParentModule().getQualifiedPathName() :
      itemDefinition.getQualifiedPathName());
    this.socket.emit(
      "owned-search-feedback",
      qualifiedNameToRegister,
      token,
      createdBy,
      lastRecord,
    );
  }
  public addOwnedSearchListenerFor(
    itemDefinition: ItemDefinition,
    token: string,
    createdBy: number,
    lastRecord: number,
    callback: () => any,
  ) {
    const qualifiedNameToRegister = (itemDefinition.isExtensionsInstance() ?
      itemDefinition.getParentModule().getQualifiedPathName() :
      itemDefinition.getQualifiedPathName());
    const qualifiedIdentifier = qualifiedNameToRegister + "." + createdBy;
    if (this.ownedSearchListeners[qualifiedIdentifier]) {
      this.ownedSearchListeners[qualifiedIdentifier].callbacks.push(callback);
      return;
    }

    this.ownedSearchListeners[qualifiedIdentifier] = {
      token,
      createdBy,
      itemDefinition,
      callbacks: [callback],
      lastRecord,
    };

    this.attachOwnedSearchListenerFor(itemDefinition, token, createdBy);
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
  public removeOwnedSearchListenerFor(
    callback: () => any,
    itemDefinition: ItemDefinition,
    createdBy: number,
  ) {
    const qualifiedNameToRegister = (itemDefinition.isExtensionsInstance() ?
      itemDefinition.getParentModule().getQualifiedPathName() :
      itemDefinition.getQualifiedPathName());
    const qualifiedIdentifier = qualifiedNameToRegister + "." + createdBy;
    const listenerValue = this.ownedSearchListeners[qualifiedIdentifier];
    if (listenerValue) {
      const newListenerValue = {
        ...listenerValue,
        callbacks: listenerValue.callbacks.filter((i) => i !== callback),
      };
      if (newListenerValue.callbacks.length === 0) {
        delete this.ownedSearchListeners[qualifiedIdentifier];
      } else {
        this.ownedSearchListeners[qualifiedIdentifier] = newListenerValue;
      }
    }

    if (this.socket.connected) {
      this.socket.emit(
        "owned-search-unregister",
        qualifiedNameToRegister,
        createdBy,
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
      const itemDefinition = this.ownedSearchListeners[listenerKey].itemDefinition;
      const token = this.ownedSearchListeners[listenerKey].token;
      const createdBy = this.ownedSearchListeners[listenerKey].createdBy;
      this.attachOwnedSearchListenerFor(itemDefinition, token, createdBy);
      if (this.isReconnect) {
        const lastRecord = this.ownedSearchListeners[listenerKey].lastRecord;
        this.requestOwnedSearchFeedbackFor(itemDefinition, token, createdBy, lastRecord);
      }
    });

    if (this.isReconnect) {
      this.connectionListeners.forEach((l) => l());
    }

    this.isReconnect = true;
    console.log("reattach listenrs asked");
  }
  private async onRecordsAddedToOwnedSearch(
    qualifiedPathName: string,
    createdBy: number,
    newIds: ISearchResult[],
    newLastRecord: number,
  ) {
    const ownedListener = this.ownedSearchListeners[qualifiedPathName + "." + createdBy];
    if (ownedListener) {
      ownedListener.lastRecord = newLastRecord;
      if (CacheWorkerInstance.isSupported) {
        await CacheWorkerInstance.instance.addRecordsToCachedSearch(
          PREFIX_SEARCH + qualifiedPathName,
          createdBy.toString(),
          newIds,
          newLastRecord,
          "by-owner",
        );
      }
      ownedListener.callbacks.forEach((c) => c());
    }
  }
  private onDisconnect() {
    this.offline = true;
    this.connectionListeners.forEach((l) => l());
  }
}
