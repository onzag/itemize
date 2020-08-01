/**
 * Provides the remote listener that uses the remote protocol in order
 * to communicate with the server for changes as well as to register
 * listeners
 * 
 * @packageDocumentation
 */

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
import { throws } from "assert";

/**
 * The remote listener class creates a websocket connection (as well as it falling back to polling)
 * for usage with the application to listen for changes to item definitions, request feedback as well
 * as to keep things up to date and reactive
 */
export class RemoteListener {
  /**
   * The socket io client
   */
  private socket: SocketIOClient.Socket;
  /**
   * The root we are using
   */
  private root: Root;

  /**
   * A registry of listeners of which are
   * listening for changes
   */
  private listeners: {
    /**
     * The qualified path name with id is the item definition qualified pathname plus the id and
     * the version, we only need one listener at a time
     */
    [qualifiedPathNameWithId: string]: {
      /**
       * The request this represents
       */
      request: IRegisterRequest;
      /**
       * The item definition instances that are attached to this
       * they are used to keep track of who is listening for changes
       * so that once the list is empty the listener can be removed
       * and unregistered
       */
      parentInstances: any[];
    },
  };

  /**
   * Registry of listeners that are listening
   * for changes to an owned search cache
   */
  private ownedSearchListeners: {
    /**
     * Similar with the qualified path name of either a item definition
     * or a module with the owner id attached to it as an identifier
     */
    [qualifiedPathNameWithOwnerId: string]: {
      /**
       * The request that is used for this
       */
      request: IOwnedSearchRegisterRequest;
      /**
       * The last known record date a record was created (this is the last
       * created_at of the last record of an owned search)
       */
      lastKnownRecordDate: string;
      /**
       * Similarly the callbacks that are called when the search updates
       * unlike the instances part, these are direct callbacks that act
       * as direct listeners
       */
      callbacks: any[];
    },
  };

  /**
   * Registry of listeners that are listening for
   * changes to a parent based search that updates
   */
  private parentedSearchListeners: {
    /**
     * Similar to the owned one but contains all the
     * parenting information of what we are listening to
     */
    [qualifiedPathNameWithParenting: string]: {
      /**
       * The request this id refers to
       */
      request: IParentedSearchRegisterRequest;
      /**
       * last known record date for the given answer
       */
      lastKnownRecordDate: string;
      /**
       * The callbacks as well
       */
      callbacks: any[];
    },
  };

  /**
   * Many instances might request feedback for the
   * same thing at once, so we delay these feedbacks
   * a little bit
   */
  private delayedFeedbacks: IFeedbackRequest[] = [];
  /**
   * Listeners for connection change status, offline/online
   */
  private connectionListeners: Array<() => void> = [];
  /**
   * Listeners for the app updated changes, when a buildnumber
   * event is received
   */
  private appUpdatedListeners: Array<() => void> = [];
  /**
   * The last recieved build number, starts by being the current
   * buildnumber
   */
  private lastRecievedBuildNumber: string;
  /**
   * An uuid to randomly identify this listener
   */
  private uuid: string = uuid.v4();
  private offline: boolean = true;
  private hasSetToken: boolean = false;
  private token: string = null;
  private isReady: boolean = false;
  private logout: () => void;
  private setupTime: number;

  private currencyFactorsHandler: () => void;

  constructor(root: Root) {
    this.onConnect = this.onConnect.bind(this);
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

    this.setupTime = (new Date()).getTime();

    this.socket = io(`${location.protocol}//${location.host}`);
    this.socket.on("connect", this.onConnect);
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
    // token might be null so we use this flag
    this.hasSetToken = true;
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
      if (!this.listeners[qualifiedIdentifier].parentInstances.includes(parentInstance)) {
        this.listeners[qualifiedIdentifier].parentInstances.push(parentInstance);
      }
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
      await this.onIdentificationDone();
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
      await this.onIdentificationDone();
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
      await this.onIdentificationDone();

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
      await this.onIdentificationDone();
    
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
      await this.onIdentificationDone();

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
      if (!this.ownedSearchListeners[qualifiedIdentifier].callbacks.includes(callback)) {
        this.ownedSearchListeners[qualifiedIdentifier].callbacks.push(callback);
      }
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
      if (!this.parentedSearchListeners[qualifiedIdentifier].callbacks.includes(callback)) {
        this.parentedSearchListeners[qualifiedIdentifier].callbacks.push(callback);
      }
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
        await this.onIdentificationDone();
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
    if (this.socket.connected) {
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
  private async onConnect() {
    this.offline = false;

    // we attach any detached requests, all of them are
    // by doing it here we ensure that any subsequent add won't
    // trigger twice due to the following wait
    // the reason you can consider everything to be unattached
    // is that the attachment can only occur during connection active
    // so if there was no connection active while the adding was triggered
    // it was added to the registry but not attached to it
    // this is why we call the attached detached as soon as possible
    // in oder to avoid any adding to happen after our identify request
    this.attachDetacchedRequests();

    // so we attempt to reidentify as soon as we are connected
    if (this.hasSetToken && !this.isReady) {
      this.socket.emit(
        IDENTIFY_REQUEST,
        {
          uuid: this.uuid,
          token: this.token,
        },
      );
  
      // now we await for identification to be sucesful
      await this.onIdentificationDone();
    }

    // if we happened to die during the event then we return
    if (this.offline) {
      return;
    }

    // if we survived that then we are ready
    this.isReady = true;
    this.connectionListeners.forEach((l) => l());
  }
  private attachDetacchedRequests() {
    // so we get the current time and calculate the difference
    // from when this remote listener was initially setup
    // to now
    const curentTime = (new Date()).getTime();
    const diffTime = curentTime - this.setupTime;
    // we will only last for feedback if there's a difference larger
    // than 3 seconds
    const requiresFeedback = diffTime > 3000;
    // this will ensure that when the socket connects fast, we don't need
    // to ask for feedback to what is our fresh data, but when the socket takes a while
    // maybe it was offline all along and then connects, then our data might be stale
    // subsequent reconnects will always require feedback despite how short they are

    // in the past this used to be a reconnnect action, it will only ask for feedback for a reconnect
    // however the initial connect might be some kind of reconnect if it never really managed to
    // connect, so this method should be better; while it's possible to ask always for feedback
    // as it wouldn't hurt and remove this logic, this might most likely cause useless network usage
    // however this also means that if something updates in that 3 second window, the client won't receive
    // any updates of this, but this is something we can live with

    // now we reconnect the listeners again
    Object.keys(this.listeners).forEach((listenerKey) => {
      this.attachItemDefinitionListenerFor(this.listeners[listenerKey].request);
      if (requiresFeedback) {
        this.requestFeedbackFor(this.listeners[listenerKey].request, true);
      }
    });

    // add the owned search listeners again
    Object.keys(this.ownedSearchListeners).forEach((listenerKey) => {
      this.attachOwnedSearchListenerFor(this.ownedSearchListeners[listenerKey].request);

      if (requiresFeedback) {
        const lastKnownRecordDate = this.ownedSearchListeners[listenerKey].lastKnownRecordDate;
        this.requestOwnedSearchFeedbackFor({
          ...this.ownedSearchListeners[listenerKey].request,
          knownLastRecordDate: lastKnownRecordDate,
        });
      }
    });

    // and the parented search listeners as well
    Object.keys(this.parentedSearchListeners).forEach((listenerKey) => {
      this.attachParentedSearchListenerFor(this.parentedSearchListeners[listenerKey].request);

      if (requiresFeedback) {
        const lastKnownRecordDate = this.parentedSearchListeners[listenerKey].lastKnownRecordDate;
        this.requestParentedSearchFeedbackFor({
          ...this.parentedSearchListeners[listenerKey].request,
          knownLastRecordDate: lastKnownRecordDate,
        });
      }
    });

    if (requiresFeedback) {
      // and we check for the currency factors now
      this.triggerCurrencyFactorsHandler();
    }
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
