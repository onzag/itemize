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
  ERROR_EVENT,
  IErrorEvent,
  KICKED_EVENT,
  CURRENCY_FACTORS_UPDATED_EVENT,
} from "../../../base/remote-protocol";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";

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
      lastKnownRecordDate: string;
      callbacks: any[];
    },
  };
  private parentedSearchListeners: {
    [qualifiedPathNameWithOwnerId: string]: {
      request: IParentedSearchRegisterRequest;
      callbacks: any[];
      lastKnownRecordDate: string;
    },
  };
  private delayedFeedbacks: IFeedbackRequest[] = [];
  private connectionListeners: Array<() => void> = [];
  private appUpdatedListeners: Array<() => void> = [];
  private lastRecievedBuildNumber: string;
  private uuid: string = uuid.v4();
  private isReconnect: boolean = false;
  private offline: boolean = false;
  // private initialConsideredDisconnectedIfNoAnswerTimeout: NodeJS.Timeout;
  private token: string = null;
  private isReady: boolean = false;
  private logout: () => void;

  private currencyFactorsHandler: () => void;

  constructor(root: Root) {
    this.reattachListeners = this.reattachListeners.bind(this);
    this.onChangeListened = this.onChangeListened.bind(this);
    this.onBuildnumberListened = this.onBuildnumberListened.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    this.onRecordsAddedToOwnedSearch = this.onRecordsAddedToOwnedSearch.bind(this);
    this.onRecordsAddedToParentedSearch = this.onRecordsAddedToParentedSearch.bind(this);
    this.onKicked = this.onKicked.bind(this);
    this.setCurrencyFactorsHandler = this.setCurrencyFactorsHandler.bind(this);
    this.triggerCurrencyFactorsHandler = this.triggerCurrencyFactorsHandler.bind(this);

    this.root = root;
    this.listeners = {};
    this.ownedSearchListeners = {};
    this.parentedSearchListeners = {};
    this.connectionListeners = [];
    this.appUpdatedListeners = [];
    this.lastRecievedBuildNumber = (window as any).BUILD_NUMBER;

    // Triggers on slow connections too easily causing reloads
    // this.initialConsideredDisconnectedIfNoAnswerTimeout = setTimeout(() => {
    //   this.offline = true;
    //   this.isReconnect = true;
    //   this.connectionListeners.forEach((l) => l());
    // }, 1000);

    this.socket = io(`${location.protocol}//${location.host}`);
    this.socket.on("connect", this.reattachListeners);
    this.socket.on("disconnect", this.onDisconnect);
    this.socket.on(KICKED_EVENT, this.onKicked);
    this.socket.on(CHANGED_FEEEDBACK_EVENT, this.onChangeListened);
    this.socket.on(BUILDNUMBER_EVENT, this.onBuildnumberListened);
    this.socket.on(OWNED_SEARCH_RECORDS_ADDED_EVENT, this.onRecordsAddedToOwnedSearch);
    this.socket.on(PARENTED_SEARCH_RECORDS_ADDED_EVENT, this.onRecordsAddedToParentedSearch);
    this.socket.on(ERROR_EVENT, this.onError);
    this.socket.on(CURRENCY_FACTORS_UPDATED_EVENT, this.triggerCurrencyFactorsHandler);
  }
  public triggerCurrencyFactorsHandler() {
    this.currencyFactorsHandler();
  }
  public setCurrencyFactorsHandler(handler: () => void) {
    this.currencyFactorsHandler = handler;
  }
  public setLogoutHandler(logout: () => void) {
    this.logout = logout;
  }
  public onKicked() {
    // it would indeed be very weird if logout wasn't ready
    // but we still check
    this.logout && this.logout();
  }
  public onError(event: IErrorEvent) {
    console.error(
      event.message,
    );
    if (console.table) {
      console.table(event.request);
    } else {
      console.error(event.request);
    }
  }
  public async setToken(token: string) {
    this.token = token;
    if (this.socket.connected) {
      this.socket.emit(
        IDENTIFY_REQUEST,
        {
          uuid: this.uuid,
          token: this.token,
        },
      );
      await this.onIdentificationDone();
      this.isReady = true;
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
  public async attachItemDefinitionListenerFor(request: IRegisterRequest) {
    if (this.socket.connected) {
      if (!this.isReady) {
        await this.onIdentificationDone();
      }
      // check if still connected after a possible await
      if (this.socket.connected) {
        this.socket.emit(
          REGISTER_REQUEST,
          request,
        );
      }
    }
  }
  public async attachOwnedSearchListenerFor(request: IOwnedSearchRegisterRequest) {
    if (this.socket.connected) {
      if (!this.isReady) {
        await this.onIdentificationDone();
      }
      // check if still connected after a possible await
      if (this.socket.connected) {
        this.socket.emit(
          OWNED_SEARCH_REGISTER_REQUEST,
          request,
        );
      }
    }
  }
  public async attachParentedSearchListenerFor(request: IParentedSearchRegisterRequest) {
    if (this.socket.connected) {
      if (!this.isReady) {
        await this.onIdentificationDone();
      }

      // check if still connected after a possible await
      if (this.socket.connected) {
        this.socket.emit(
          PARENTED_SEARCH_REGISTER_REQUEST,
          request,
        );
      }
    }
  }
  public async requestOwnedSearchFeedbackFor(request: IOwnedSearchFeedbackRequest) {
    if (this.socket.connected) {
      if (!this.isReady) {
        await this.onIdentificationDone();
      }
    
      // check if still connected after a possible await
      if (this.socket.connected) {
        this.socket.emit(
          OWNED_SEARCH_FEEDBACK_REQUEST,
          request,
        );
      }
    }
  }
  public async requestParentedSearchFeedbackFor(request: IParentedSearchFeedbackRequest) {
    if (this.socket.connected) {
      if (!this.isReady) {
        await this.onIdentificationDone();
      }

      // check if still connected after a possible await
      if (this.socket.connected) {
        this.socket.emit(
          PARENTED_SEARCH_FEEDBACK_REQUEST,
          request,
        );
      }
    }
  }
  public addOwnedSearchListenerFor(
    itemDefinitionOrModuleQualifiedPathName: string,
    createdBy: number,
    lastKnownRecordDate: string,
    callback: () => any,
  ) {
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
      lastKnownRecordDate,
    };

    this.attachOwnedSearchListenerFor(request);
  }
  public addParentedSearchListenerFor(
    itemDefinitionOrModuleQualifiedPathName: string,
    parentType: string,
    parentId: number,
    parentVersion: string,
    lastKnownRecordDate: string,
    callback: () => any,
  ) {
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
      lastKnownRecordDate,
    };

    this.attachParentedSearchListenerFor(request);
  }
  public async requestFeedbackFor(
    request: IFeedbackRequest,
    immediate?: boolean,
  ) {
    if (immediate) {
      if (this.socket.connected) {
        if (!this.isReady) {
          await this.onIdentificationDone();
        }
        if (this.socket.connected) {
          this.socket.emit(
            FEEDBACK_REQUEST,
            request,
          );
        }
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
  private async consumeDelayedFeedbacks(anSpecificRequest?: IFeedbackRequest) {
    // we wait if not ready
    if (this.socket.connected && !this.isReady) {
      await this.onIdentificationDone();
    }

    // the reason we use delayed feedbacks is for efficiency, while we don't
    // use this for owned searches, but sometimes a same feedback would be requested twice
    this.delayedFeedbacks = this.delayedFeedbacks.filter((df) => {
      if (
        !anSpecificRequest ||
        (anSpecificRequest.id === df.id && anSpecificRequest.itemDefinition === df.itemDefinition)
      ) {
        // and yet we recheck, as we need to be connected even as we emit
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
    if (this.isReady) {
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
    // clearTimeout(this.initialConsideredDisconnectedIfNoAnswerTimeout);

    // this prevents the request from triggering on the initial connection
    // as setToken is expected to be called in order to set things to be ready
    // this is more for reconnection purposes
    if (!this.isReconnect) {
      // the next time this hits it will be a reconnect, such are the subsequent times
      this.isReconnect = true;
      return;
    }

    // so we attempt to reidentify as soon as we are connected
    this.socket.emit(
      IDENTIFY_REQUEST,
      {
        uuid: this.uuid,
        token: this.token,
      },
    );

    // now we await for identification to be sucesful
    await this.onIdentificationDone();

    // if we happened to die during the event then we return
    if (this.offline) {
      return;
    }

    // if we survived that then we are ready
    this.isReady = true;

    // now we reconnect the listeners again
    Object.keys(this.listeners).forEach((listenerKey) => {
      this.attachItemDefinitionListenerFor(this.listeners[listenerKey].request);
      this.requestFeedbackFor(this.listeners[listenerKey].request, true);
    });

    Object.keys(this.ownedSearchListeners).forEach((listenerKey) => {
      this.attachOwnedSearchListenerFor(this.ownedSearchListeners[listenerKey].request);

      const lastKnownRecordDate = this.ownedSearchListeners[listenerKey].lastKnownRecordDate;
      this.requestOwnedSearchFeedbackFor({
        ...this.ownedSearchListeners[listenerKey].request,
        knownLastRecordDate: lastKnownRecordDate,
      });
    });

    Object.keys(this.parentedSearchListeners).forEach((listenerKey) => {
      this.attachParentedSearchListenerFor(this.parentedSearchListeners[listenerKey].request);

      const lastKnownRecordDate = this.parentedSearchListeners[listenerKey].lastKnownRecordDate;
      this.requestParentedSearchFeedbackFor({
        ...this.parentedSearchListeners[listenerKey].request,
        knownLastRecordDate: lastKnownRecordDate,
      });
    });

    this.connectionListeners.forEach((l) => l());

    this.triggerCurrencyFactorsHandler();
    this.isReconnect = true;
  }
  private async onRecordsAddedToOwnedSearch(
    event: IOwnedSearchRecordsAddedEvent,
  ) {
    const ownedListener = this.ownedSearchListeners[event.qualifiedPathName + "." + event.createdBy];
    if (ownedListener) {
      ownedListener.lastKnownRecordDate = event.newLastRecordDate;
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
          event.newRecords,
          event.newLastRecordDate,
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
      parentedListener.lastKnownRecordDate = event.newLastRecordDate;
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
          event.newRecords,
          event.newLastRecordDate,
          "by-parent",
        );
      }
      parentedListener.callbacks.forEach((c) => c());
    }
  }
  private onDisconnect() {
    this.offline = true;
    this.isReady = false;
    this.connectionListeners.forEach((l) => l());
  }
}
