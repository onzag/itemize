import io from "socket.io-client";
import Root from "../../../base/Root";
import uuid from "uuid";
import CacheWorkerInstance from "../workers/cache";
import { PREFIX_GET, PREFIX_SEARCH } from "../../../constants";
import {
  IRegisterRequest,
  IOwnedSearchRegisterRequest,
  IParentedSearchRegisterRequest,
  IFeedbackRequest,
  CHANGED_FEEEDBACK_EVENT,
  BUILDNUMBER_EVENT,
  OWNED_SEARCH_RECORDS_ADDED_EVENT,
  PARENTED_SEARCH_RECORDS_ADDED_EVENT,
  IBuildNumberEvent,
  REGISTER_REQUEST,
  OWNED_SEARCH_REGISTER_REQUEST,
  PARENTED_SEARCH_REGISTER_REQUEST,
  IOwnedSearchFeedbackRequest,
  OWNED_SEARCH_FEEDBACK_REQUEST,
  IParentedSearchFeedbackRequest,
  PARENTED_SEARCH_FEEDBACK_REQUEST,
  UNREGISTER_REQUEST,
  IUnregisterRequest,
  FEEDBACK_REQUEST,
  IOwnedSearchUnregisterRequest,
  OWNED_SEARCH_UNREGISTER_REQUEST,
  PARENTED_SEARCH_UNREGISTER_REQUEST,
  IParentedSearchUnregisterRequest,
  IChangedFeedbackEvent,
  IDENTIFY_REQUEST,
  IOwnedSearchRecordsAddedEvent,
  IParentedSearchRecordsAddedEvent,
  IDENTIFIED_EVENT,
} from "../../../base/remote-protocol";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import { IGQLSearchResult } from "../../../gql-querier";

export class RemoteListener {
  private socket: SocketIOClient.Socket;
  private root: Root;
  private listeners: {
    [qualifiedPathNameWithId: string]: {
      request: IRegisterRequest;
      parentInstances: any[];
    },
  };
  private ownedSearchListeners: {
    [qualifiedPathNameWithOwnerId: string]: {
      request: IOwnedSearchRegisterRequest;
      lastKnownRecord: IGQLSearchResult;
      callbacks: any[];
    },
  };
  private parentedSearchListeners: {
    [qualifiedPathNameWithOwnerId: string]: {
      request: IParentedSearchRegisterRequest;
      callbacks: any[];
      lastKnownRecord: IGQLSearchResult;
    },
  };
  private delayedFeedbacks: IFeedbackRequest[] = [];
  private connectionListeners: Array<() => void> = [];
  private appUpdatedListeners: Array<() => void> = [];
  private lastRecievedBuildNumber: string;
  private uuid: string = uuid.v4();
  private isReconnect: boolean = false;
  private offline: boolean = false;
  private initialConsideredDisconnectedIfNoAnswerTimeout: NodeJS.Timeout;
  private token: string = null;
  private isReady: boolean = false;

  constructor(root: Root) {
    this.reattachListeners = this.reattachListeners.bind(this);
    this.onChangeListened = this.onChangeListened.bind(this);
    this.onBuildnumberListened = this.onBuildnumberListened.bind(this);
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
    this.socket.on("disconnect", this.onDisconnect);
    this.socket.on(CHANGED_FEEEDBACK_EVENT, this.onChangeListened);
    this.socket.on(BUILDNUMBER_EVENT, this.onBuildnumberListened);
    this.socket.on(OWNED_SEARCH_RECORDS_ADDED_EVENT, this.onRecordsAddedToOwnedSearch);
    this.socket.on(PARENTED_SEARCH_RECORDS_ADDED_EVENT, this.onRecordsAddedToParentedSearch);
  }
  public setToken(token: string) {
    this.token = token;
    this.isReady = true;
    if (this.socket.connected) {
      this.socket.emit(
        IDENTIFY_REQUEST,
        {
          uuid: this.uuid,
          token: this.token,
        },
      );
    }
  }
  public onBuildnumberListened(build: IBuildNumberEvent) {
    this.lastRecievedBuildNumber = build.buildnumber;
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
    itemDefinitionQualifiedPathName: string,
    forId: number,
    forVersion: string,
  ) {
    if (!this.isReady) {
      throw new Error("Remote listener is not ready");
    }
    const qualifiedIdentifier = itemDefinitionQualifiedPathName + "." + forId + "." + (forVersion || "");
    if (this.listeners[qualifiedIdentifier]) {
      this.listeners[qualifiedIdentifier].parentInstances.push(parentInstance);
      return;
    }

    const request: IRegisterRequest = {
      itemDefinition: itemDefinitionQualifiedPathName,
      id: forId,
      version: forVersion,
    };
    this.listeners[qualifiedIdentifier] = {
      request,
      parentInstances: [parentInstance],
    };

    this.attachItemDefinitionListenerFor(request);
  }
  public attachItemDefinitionListenerFor(request: IRegisterRequest) {
    if (!this.isReady) {
      throw new Error("Remote listener is not ready");
    }
    if (this.socket.connected) {
      this.socket.emit(
        REGISTER_REQUEST,
        request,
      );
    }
  }
  public attachOwnedSearchListenerFor(request: IOwnedSearchRegisterRequest) {
    if (!this.isReady) {
      throw new Error("Remote listener is not ready");
    }
    if (this.socket.connected) {
      this.socket.emit(
        OWNED_SEARCH_REGISTER_REQUEST,
        request,
      );
    }
  }
  public attachParentedSearchListenerFor(request: IParentedSearchRegisterRequest) {
    if (!this.isReady) {
      throw new Error("Remote listener is not ready");
    }
    if (this.socket.connected) {
      this.socket.emit(
        PARENTED_SEARCH_REGISTER_REQUEST,
        request,
      );
    }
  }
  public requestOwnedSearchFeedbackFor(request: IOwnedSearchFeedbackRequest) {
    if (!this.isReady) {
      throw new Error("Remote listener is not ready");
    }
    if (this.socket.connected) {
      this.socket.emit(
        OWNED_SEARCH_FEEDBACK_REQUEST,
        request,
      );
    }
  }
  public requestParentedSearchFeedbackFor(request: IParentedSearchFeedbackRequest) {
    if (!this.isReady) {
      throw new Error("Remote listener is not ready");
    }
    if (this.socket.connected) {
      this.socket.emit(
        PARENTED_SEARCH_FEEDBACK_REQUEST,
        request,
      );
    }
  }
  public addOwnedSearchListenerFor(
    itemDefinitionOrModuleQualifiedPathName: string,
    createdBy: number,
    lastKnownRecord: IGQLSearchResult,
    callback: () => any,
  ) {
    if (!this.isReady) {
      throw new Error("Remote listener is not ready");
    }

    const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." + createdBy;
    if (this.ownedSearchListeners[qualifiedIdentifier]) {
      this.ownedSearchListeners[qualifiedIdentifier].callbacks.push(callback);
      return;
    }

    const request: IOwnedSearchRegisterRequest = {
      qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
      createdBy,
    };
    this.ownedSearchListeners[qualifiedIdentifier] = {
      request,
      callbacks: [callback],
      lastKnownRecord,
    };

    this.attachOwnedSearchListenerFor(request);
  }
  public addParentedSearchListenerFor(
    itemDefinitionOrModuleQualifiedPathName: string,
    parentType: string,
    parentId: number,
    parentVersion: string,
    lastKnownRecord: IGQLSearchResult,
    callback: () => any,
  ) {
    if (!this.isReady) {
      throw new Error("Remote listener is not ready");
    }

    const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." +
      parentType + "." + parentId + "." + (parentVersion || "");
    if (this.parentedSearchListeners[qualifiedIdentifier]) {
      this.parentedSearchListeners[qualifiedIdentifier].callbacks.push(callback);
      return;
    }

    const request: IParentedSearchRegisterRequest = {
      qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
      parentType,
      parentId,
      parentVersion,
    };
    this.parentedSearchListeners[qualifiedIdentifier] = {
      request,
      callbacks: [callback],
      lastKnownRecord,
    };

    this.attachParentedSearchListenerFor(request);
  }
  public requestFeedbackFor(
    request: IFeedbackRequest,
    immediate?: boolean,
  ) {
    if (!this.isReady) {
      throw new Error("Remote listener is not ready");
    }

    if (immediate) {
      if (this.socket.connected) {
        this.socket.emit(
          FEEDBACK_REQUEST,
          request,
        );
      }
    } else if (
      this.delayedFeedbacks.every((df) => df.itemDefinition !== request.itemDefinition || df.id !== request.id)
    ) {
      this.delayedFeedbacks.push(request);

      setTimeout(this.consumeDelayedFeedbacks.bind(this, request), 70);
    }
  }
  public removeItemDefinitionListenerFor(
    parentInstance: any,
    itemDefinitionQualifiedPathName: string,
    forId: number,
    forVersion: string,
  ) {
    const qualifiedID = itemDefinitionQualifiedPathName + "." + forId + "." + (forVersion || "");
    const listenerValue = this.listeners[qualifiedID];
    if (listenerValue) {
      const newListenerValue = {
        ...listenerValue,
        parentInstances: listenerValue.parentInstances.filter((i) => i !== parentInstance),
      };
      if (newListenerValue.parentInstances.length === 0) {
        delete this.listeners[qualifiedID];
        if (this.socket.connected) {
          const request: IUnregisterRequest = {
            id: forId,
            version: forVersion,
            itemDefinition: itemDefinitionQualifiedPathName,
          };
          this.socket.emit(
            UNREGISTER_REQUEST,
            request,
          );
        }
      } else {
        this.listeners[qualifiedID] = newListenerValue;
      }
    }
  }
  public removeOwnedSearchListenerFor(
    callback: () => any,
    itemDefinitionOrModuleQualifiedPathName: string,
    createdBy: number,
  ) {
    const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." + createdBy;
    const listenerValue = this.ownedSearchListeners[qualifiedIdentifier];
    if (listenerValue) {
      const newListenerValue = {
        ...listenerValue,
        callbacks: listenerValue.callbacks.filter((i) => i !== callback),
      };
      if (newListenerValue.callbacks.length === 0) {
        delete this.ownedSearchListeners[qualifiedIdentifier];
        if (this.socket.connected) {
          const request: IOwnedSearchUnregisterRequest = {
            qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
            createdBy,
          };
          this.socket.emit(
            OWNED_SEARCH_UNREGISTER_REQUEST,
            request,
          );
        }
      } else {
        this.ownedSearchListeners[qualifiedIdentifier] = newListenerValue;
      }
    }
  }
  public removeParentedSearchListenerFor(
    callback: () => any,
    itemDefinitionOrModuleQualifiedPathName: string,
    parentType: string,
    parentId: number,
    parentVersion: string,
  ) {
    const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName +
      "." + parentType + "." + parentId + "." + (parentVersion || "");
    const listenerValue = this.ownedSearchListeners[qualifiedIdentifier];
    if (listenerValue) {
      const newListenerValue = {
        ...listenerValue,
        callbacks: listenerValue.callbacks.filter((i) => i !== callback),
      };
      if (newListenerValue.callbacks.length === 0) {
        delete this.ownedSearchListeners[qualifiedIdentifier];
        if (this.socket.connected) {
          const request: IParentedSearchUnregisterRequest = {
            qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
            parentId,
            parentType,
            parentVersion,
          };
          this.socket.emit(
            PARENTED_SEARCH_UNREGISTER_REQUEST,
            request,
          );
        }
      } else {
        this.ownedSearchListeners[qualifiedIdentifier] = newListenerValue;
      }
    }
  }
  private onChangeListened(
    event: IChangedFeedbackEvent,
  ) {
    const itemDefinition: ItemDefinition = this.root.registry[event.itemDefinition] as ItemDefinition;
    const appliedGQLValue = itemDefinition.getGQLAppliedValue(event.id, event.version);
    if (appliedGQLValue) {
      if (
        event.type === "modified" || event.type === "created" ||
        (
          event.type === "last_modified" &&
          event.lastModified !== appliedGQLValue.flattenedValue.last_modified
        )
      ) {
        itemDefinition.triggerListeners("reload", event.id, event.version);
      } else if (event.type === "not_found") {
        itemDefinition.cleanValueFor(event.id, event.version);
        if (CacheWorkerInstance.isSupported) {
          CacheWorkerInstance.instance.setCachedValueAsNullAndUpdateSearches(
            event.id,
            event.version,
            itemDefinition.getQualifiedPathName(),
            PREFIX_GET + itemDefinition.getQualifiedPathName(),
            PREFIX_SEARCH + itemDefinition.getParentModule().getSearchModule().getQualifiedPathName(),
            PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName(),
          );
        }
        itemDefinition.triggerListeners("change", event.id, event.version);
      }
    } else if (event.type === "modified" || event.type === "created" || event.type === "last_modified") {
      itemDefinition.triggerListeners("reload", event.id, event.version);
    } else if (event.type === "not_found") {
      itemDefinition.cleanValueFor(event.id, event.version);
      if (CacheWorkerInstance.isSupported) {
        CacheWorkerInstance.instance.setCachedValueAsNullAndUpdateSearches(
          event.id,
          event.version,
          itemDefinition.getQualifiedPathName(),
          PREFIX_GET + itemDefinition.getQualifiedPathName(),
          PREFIX_SEARCH + itemDefinition.getParentModule().getSearchModule().getQualifiedPathName(),
          PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName(),
        );
      }
      itemDefinition.triggerListeners("change", event.id, event.version);
    }
  }
  private consumeDelayedFeedbacks(anSpecificRequest?: IFeedbackRequest) {
    // the reason we use delayed feedbacks is for efficiency, while we don't
    // use this for owned searches, but sometimes a same feedback would be requested twice
    this.delayedFeedbacks = this.delayedFeedbacks.filter((df) => {
      if (
        !anSpecificRequest ||
        (anSpecificRequest.id === df.id && anSpecificRequest.itemDefinition === df.itemDefinition)
      ) {
        if (this.socket.connected) {
          this.socket.emit(
            FEEDBACK_REQUEST,
            df,
          );
        }

        return false;
      }

      return true;
    });
  }
  private onIdentificationDone() {
    if (this.offline) {
      return;
    }
    return new Promise((resolve) => {
      const doneListener = () => {
        this.socket.off(IDENTIFIED_EVENT, doneListener);
        this.socket.off("disconnect", doneListener);
        resolve();
      };
      this.socket.on("disconnect", doneListener);
      this.socket.on(IDENTIFIED_EVENT, doneListener);
    });
  }
  private async reattachListeners() {
    this.offline = false;
    clearTimeout(this.initialConsideredDisconnectedIfNoAnswerTimeout);

    if (!this.isReady) {
      return;
    }

    this.socket.emit(
      IDENTIFY_REQUEST,
      {
        uuid: this.uuid,
        token: this.token,
      },
    );

    await this.onIdentificationDone();
    if (this.offline) {
      return;
    }

    Object.keys(this.listeners).forEach((listenerKey) => {
      this.attachItemDefinitionListenerFor(this.listeners[listenerKey].request);
      if (this.isReconnect) {
        this.requestFeedbackFor(this.listeners[listenerKey].request, true);
      }
    });

    Object.keys(this.ownedSearchListeners).forEach((listenerKey) => {
      this.attachOwnedSearchListenerFor(this.ownedSearchListeners[listenerKey].request);
      if (this.isReconnect) {
        const lastKnownRecord = this.ownedSearchListeners[listenerKey].lastKnownRecord;
        this.requestOwnedSearchFeedbackFor({
          ...this.ownedSearchListeners[listenerKey].request,
          knownLastRecord: lastKnownRecord,
        });
      }
    });

    Object.keys(this.parentedSearchListeners).forEach((listenerKey) => {
      this.attachParentedSearchListenerFor(this.parentedSearchListeners[listenerKey].request);
      if (this.isReconnect) {
        const lastKnownRecord = this.parentedSearchListeners[listenerKey].lastKnownRecord;
        this.requestParentedSearchFeedbackFor({
          ...this.parentedSearchListeners[listenerKey].request,
          knownLastRecord: lastKnownRecord,
        });
      }
    });

    if (this.isReconnect) {
      this.connectionListeners.forEach((l) => l());
    }

    this.isReconnect = true;
  }
  private async onRecordsAddedToOwnedSearch(
    event: IOwnedSearchRecordsAddedEvent,
  ) {
    const ownedListener = this.ownedSearchListeners[event.qualifiedPathName + "." + event.createdBy];
    if (ownedListener) {
      ownedListener.lastKnownRecord = event.newLastRecord;
      if (CacheWorkerInstance.isSupported) {
        const itemDefinitionOrModule = this.root.registry[event.qualifiedPathName];
        let itemDefinition: ItemDefinition;
        if (itemDefinitionOrModule instanceof ItemDefinition) {
          itemDefinition = itemDefinitionOrModule;
        } else {
          itemDefinition = itemDefinitionOrModule.getPropExtensionItemDefinition();
        }
        await CacheWorkerInstance.instance.addRecordsToCachedSearch(
          PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName(),
          event.createdBy,
          null,
          null,
          null,
          event.newIds,
          event.newLastRecord,
          "by-owner",
        );
      }
      ownedListener.callbacks.forEach((c) => c());
    }
  }
  private async onRecordsAddedToParentedSearch(
    event: IParentedSearchRecordsAddedEvent,
  ) {
    const parentedListener = this.parentedSearchListeners[
      event.qualifiedPathName + "." + event.parentType + "." +
      event.parentId + "." + (event.parentVersion || "")
    ];
    if (parentedListener) {
      parentedListener.lastKnownRecord = event.newLastRecord;
      if (CacheWorkerInstance.isSupported) {
        const itemDefinitionOrModule = this.root.registry[event.qualifiedPathName];
        let itemDefinition: ItemDefinition;
        if (itemDefinitionOrModule instanceof ItemDefinition) {
          itemDefinition = itemDefinitionOrModule;
        } else {
          itemDefinition = itemDefinitionOrModule.getPropExtensionItemDefinition();
        }
        await CacheWorkerInstance.instance.addRecordsToCachedSearch(
          PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName(),
          null,
          event.parentType,
          event.parentId,
          event.parentVersion,
          event.newIds,
          event.newLastRecord,
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
