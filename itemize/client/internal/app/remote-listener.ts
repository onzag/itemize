import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import io from "socket.io-client";
import Root from "../../../base/Root";
import uuid from "uuid";
import CacheWorkerInstance from "../workers/cache";
import { PREFIX_GET, PREFIX_SEARCH } from "../../../constants";
import { ISearchResult } from "../../../gql-querier";

// TODO refactor the remote listener and the listener to use one single argument
// in order to pass data rather than this clusterfuck of many arguments

export class RemoteListener {
  private socket: SocketIOClient.Socket;
  private root: Root;
  private listeners: {
    [qualifiedPathNameWithId: string]: {
      id: number,
      itemDefinition: ItemDefinition;
      parentInstances: any[],
      token: string,
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
  private parentedSearchListeners: {
    [qualifiedPathNameWithOwnerId: string]: {
      token: string;
      parentId: number,
      parentType: string,
      itemDefinition: ItemDefinition;
      callbacks: any[];
      lastRecord: number;
    },
  };
  private delayedFeedbacks: Array<{
    itemDefinition: ItemDefinition;
    forId: number;
    token: string;
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
    this.onRecordsAddedToOwnedSearch = this.onRecordsAddedToOwnedSearch.bind(this);
    this.onRecordsAddedToParentedSearch = this.onRecordsAddedToParentedSearch.bind(this);

    this.root = root;
    this.listeners = {};
    this.ownedSearchListeners = {};
    this.parentedSearchListeners = {};
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
    this.socket.on("owned-search-added-records", this.onRecordsAddedToOwnedSearch);
    this.socket.on("parented-search-added-records", this.onRecordsAddedToParentedSearch);
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
  public addItemDefinitionListenerFor(
    parentInstance: any,
    itemDefinition: ItemDefinition,
    forId: number,
    token: string,
  ) {
    const qualifiedIdentifier = itemDefinition.getQualifiedPathName() + "." + forId;
    if (this.listeners[qualifiedIdentifier]) {
      this.listeners[qualifiedIdentifier].parentInstances.push(parentInstance);
      return;
    }

    this.listeners[qualifiedIdentifier] = {
      id: forId,
      itemDefinition,
      parentInstances: [parentInstance],
      token,
    };

    this.attachItemDefinitionListenerFor(itemDefinition, forId, token);
  }
  public attachItemDefinitionListenerFor(itemDefinition: ItemDefinition, forId: number, token: string) {
    const qualifiedPathName = itemDefinition.getQualifiedPathName();

    if (this.socket.connected) {
      console.log("registering", qualifiedPathName, forId);
      this.socket.emit(
        "register",
        qualifiedPathName,
        forId,
        token,
      );
    }
  }
  public attachOwnedSearchListenerFor(
    itemDefinition: ItemDefinition,
    createdBy: number,
    token: string,
  ) {
    const qualifiedNameToRegister = (itemDefinition.isExtensionsInstance() ?
      itemDefinition.getParentModule().getQualifiedPathName() :
      itemDefinition.getQualifiedPathName());

    if (this.socket.connected) {
      console.log("owned-search registering", qualifiedNameToRegister, token, createdBy);
      this.socket.emit(
        "owned-search-register",
        qualifiedNameToRegister,
        createdBy,
        token,
      );
    }
  }
  public attachParentedSearchListenerFor(
    itemDefinition: ItemDefinition,
    parentType: string,
    parentId: number,
    token: string,
  ) {
    const qualifiedNameToRegister = (itemDefinition.isExtensionsInstance() ?
      itemDefinition.getParentModule().getQualifiedPathName() :
      itemDefinition.getQualifiedPathName());

    if (this.socket.connected) {
      console.log("parented-search registering", qualifiedNameToRegister, token, parentType, parentId);
      this.socket.emit(
        "parented-search-register",
        qualifiedNameToRegister,
        parentType,
        parentId,
        token,
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
    if (this.socket.connected) {
      this.socket.emit(
        "owned-search-feedback",
        qualifiedNameToRegister,
        createdBy,
        lastRecord,
        token,
      );
    }
  }
  public requestParentedSearchFeedbackFor(
    itemDefinition: ItemDefinition,
    token: string,
    parentType: string,
    parentId: number,
    lastRecord: number,
  ) {
    const qualifiedNameToRegister = (itemDefinition.isExtensionsInstance() ?
      itemDefinition.getParentModule().getQualifiedPathName() :
      itemDefinition.getQualifiedPathName());
    if (this.socket.connected) {
      this.socket.emit(
        "owned-search-feedback",
        qualifiedNameToRegister,
        parentType,
        parentId,
        lastRecord,
        token,
      );
    }
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

    this.attachOwnedSearchListenerFor(itemDefinition, createdBy, token);
  }
  public addParentedSearchListenerFor(
    itemDefinition: ItemDefinition,
    token: string,
    parentType: string,
    parentId: number,
    lastRecord: number,
    callback: () => any,
  ) {
    const qualifiedNameToRegister = (itemDefinition.isExtensionsInstance() ?
      itemDefinition.getParentModule().getQualifiedPathName() :
      itemDefinition.getQualifiedPathName());
    const qualifiedIdentifier = qualifiedNameToRegister + "." + parentType + "." + parentId;
    if (this.parentedSearchListeners[qualifiedIdentifier]) {
      this.parentedSearchListeners[qualifiedIdentifier].callbacks.push(callback);
      return;
    }

    this.parentedSearchListeners[qualifiedIdentifier] = {
      token,
      parentType,
      parentId,
      itemDefinition,
      callbacks: [callback],
      lastRecord,
    };

    this.attachParentedSearchListenerFor(itemDefinition, parentType, parentId, token);
  }
  public requestFeedbackFor(itemDefinition: ItemDefinition, forId: number, token: string, immediate?: boolean) {
    if (immediate) {
      if (this.socket.connected) {
        this.socket.emit(
          "feedback",
          itemDefinition.getQualifiedPathName(),
          forId,
          token,
        );
      }
    } else if (
      this.delayedFeedbacks.every((df) => df.itemDefinition !== itemDefinition || df.forId !== forId)
    ) {
      this.delayedFeedbacks.push({
        forId,
        itemDefinition,
        token,
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
        if (this.socket.connected) {
          this.socket.emit(
            "unregister",
            qualifiedPathName,
            forId,
          );
        }
      } else {
        this.listeners[qualifiedID] = newListenerValue;
      }
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
        if (this.socket.connected) {
          this.socket.emit(
            "owned-search-unregister",
            qualifiedNameToRegister,
            createdBy,
          );
        }
      } else {
        this.ownedSearchListeners[qualifiedIdentifier] = newListenerValue;
      }
    }
  }
  public removeParentedSearchListenerFor(
    callback: () => any,
    itemDefinition: ItemDefinition,
    parentType: string,
    parentId: number,
  ) {
    const qualifiedNameToRegister = (itemDefinition.isExtensionsInstance() ?
      itemDefinition.getParentModule().getQualifiedPathName() :
      itemDefinition.getQualifiedPathName());
    const qualifiedIdentifier = qualifiedNameToRegister + "." + parentType + "." + parentId;
    const listenerValue = this.ownedSearchListeners[qualifiedIdentifier];
    if (listenerValue) {
      const newListenerValue = {
        ...listenerValue,
        callbacks: listenerValue.callbacks.filter((i) => i !== callback),
      };
      if (newListenerValue.callbacks.length === 0) {
        delete this.ownedSearchListeners[qualifiedIdentifier];
        if (this.socket.connected) {
          this.socket.emit(
            "parented-search-unregister",
            qualifiedNameToRegister,
            parentType,
            parentId,
          );
        }
      } else {
        this.ownedSearchListeners[qualifiedIdentifier] = newListenerValue;
      }
    }
  }
  private onPossibleChangeListened(
    qualifiedPathName: string,
    id: number,
    type: "modified" | "not_found" | "last_modified",
    lastModifiedFeedback: string,
  ) {
    console.log("feedback recieved with", qualifiedPathName, id, type, lastModifiedFeedback);

    const itemDefinition: ItemDefinition = this.root.registry[qualifiedPathName] as ItemDefinition;
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
          CacheWorkerInstance.instance.setCachedValueAsNullAndUpdateSearches(
            id,
            itemDefinition.getQualifiedPathName(),
            PREFIX_GET + itemDefinition.getQualifiedPathName(),
            PREFIX_SEARCH + itemDefinition.getParentModule().getSearchModule().getQualifiedPathName(),
            PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName(),
          );
        }
        itemDefinition.triggerListeners("change", id);
      }
    } else if (type === "modified" || type === "last_modified") {
      itemDefinition.triggerListeners("reload", id);
    } else if (type === "not_found") {
      itemDefinition.cleanValueFor(id);
      if (CacheWorkerInstance.isSupported) {
        CacheWorkerInstance.instance.setCachedValueAsNullAndUpdateSearches(
          id,
          itemDefinition.getQualifiedPathName(),
          PREFIX_GET + itemDefinition.getQualifiedPathName(),
          PREFIX_SEARCH + itemDefinition.getParentModule().getSearchModule().getQualifiedPathName(),
          PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName(),
        );
      }
      itemDefinition.triggerListeners("change", id);
    }
  }
  private consumeDelayedFeedbacks(forAnSpecificId?: number) {
    // the reason we use delayed feedbacks is for efficiency, while we don't
    // use this for owned searches, but sometimes a same feedback would be requested twice
    this.delayedFeedbacks = this.delayedFeedbacks.filter((df) => {
      if (!forAnSpecificId || forAnSpecificId === df.forId) {
        if (this.socket.connected) {
          this.socket.emit(
            "feedback",
            df.itemDefinition.getQualifiedPathName(),
            df.forId,
            df.token,
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
      const token = this.listeners[listenerKey].token;
      this.attachItemDefinitionListenerFor(itemDefinition, forId, token);
      if (this.isReconnect) {
        this.requestFeedbackFor(itemDefinition, forId, token, true);
      }
    });

    Object.keys(this.ownedSearchListeners).forEach((listenerKey) => {
      const itemDefinition = this.ownedSearchListeners[listenerKey].itemDefinition;
      const token = this.ownedSearchListeners[listenerKey].token;
      const createdBy = this.ownedSearchListeners[listenerKey].createdBy;
      this.attachOwnedSearchListenerFor(itemDefinition, createdBy, token);
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
    console.log("found records added to owned search", qualifiedPathName, createdBy, newIds, newLastRecord);
    const ownedListener = this.ownedSearchListeners[qualifiedPathName + "." + createdBy];
    if (ownedListener) {
      ownedListener.lastRecord = newLastRecord;
      if (CacheWorkerInstance.isSupported) {
        await CacheWorkerInstance.instance.addRecordsToCachedSearch(
          PREFIX_SEARCH + ownedListener.itemDefinition.getSearchModeCounterpart().getQualifiedPathName(),
          createdBy,
          null,
          null,
          newIds,
          newLastRecord,
          "by-owner",
        );
      }
      ownedListener.callbacks.forEach((c) => c());
    }
  }
  private async onRecordsAddedToParentedSearch(
    qualifiedPathName: string,
    parentType: string,
    parentId: number,
    newIds: ISearchResult[],
    newLastRecord: number,
  ) {
    console.log("found records added to parented search",
      qualifiedPathName, parentType, parentId, newIds, newLastRecord);
    const parentedListener = this.parentedSearchListeners[qualifiedPathName + "." + parentType + "." + parentId];
    if (parentedListener) {
      parentedListener.lastRecord = newLastRecord;
      if (CacheWorkerInstance.isSupported) {
        await CacheWorkerInstance.instance.addRecordsToCachedSearch(
          PREFIX_SEARCH + parentedListener.itemDefinition.getSearchModeCounterpart().getQualifiedPathName(),
          null,
          parentType,
          parentId,
          newIds,
          newLastRecord,
          "by-parent",
        );
      }
      parentedListener.callbacks.forEach((c) => c());
    }
  }
  private onDisconnect() {
    this.offline = true;
    this.connectionListeners.forEach((l) => l());
  }
}
