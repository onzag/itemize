/**
 * Provides the remote listener that uses the remote protocol in order
 * to communicate with the server for changes as well as to register
 * listeners
 * 
 * @module
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
  CHANGED_FEEDBACK_EVENT,
  BUILDNUMBER_EVENT,
  OWNED_SEARCH_RECORDS_EVENT,
  PARENTED_SEARCH_RECORDS_EVENT,
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
  IOwnedSearchRecordsEvent,
  IParentedSearchRecordsEvent,
  IDENTIFIED_EVENT,
  ERROR_EVENT,
  IErrorEvent,
  KICKED_EVENT,
  CURRENCY_FACTORS_UPDATED_EVENT,
  IOwnedParentedSearchRegisterRequest,
  OWNED_PARENTED_SEARCH_REGISTER_REQUEST,
  IOwnedParentedSearchUnregisterRequest,
  OWNED_PARENTED_SEARCH_UNREGISTER_REQUEST,
  IOwnedParentedSearchFeedbackRequest,
  OWNED_PARENTED_SEARCH_FEEDBACK_REQUEST,
  OWNED_PARENTED_SEARCH_RECORDS_EVENT,
  IOwnedParentedSearchRecordsEvent,
  IPropertySearchRecordsEvent,
  IPropertySearchRegisterRequest,
  PROPERTY_SEARCH_REGISTER_REQUEST,
  IPropertySearchUnregisterRequest,
  PROPERTY_SEARCH_UNREGISTER_REQUEST,
  IPropertySearchFeedbackRequest,
  PROPERTY_SEARCH_FEEDBACK_REQUEST,
  PROPERTY_SEARCH_RECORDS_EVENT,
} from "../../../base/remote-protocol";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import type { IGQLSearchRecord } from "../../../gql-querier";

const SLOW_POLLING_MIN_TIME = 60 * 1000;
const SLOW_POLLING_TIME_BETWEEN_REQUESTS = 5 * 1000;

async function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

/**
 * This is what the remote listener expects of an argument taken
 * by the callback
 */
export interface IRemoteListenerRecordsCallbackArg {
  newRecords: IGQLSearchRecord[];
  modifiedRecords: IGQLSearchRecord[];
  lostRecords: IGQLSearchRecord[];
  createdRecords: IGQLSearchRecord[];
  deletedRecords: IGQLSearchRecord[];
}

type RemoteListenerRecordsCallback = (arg: IRemoteListenerRecordsCallbackArg) => void;

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
   * Time when a last feedback was requested
   */
  private slowPoolingTimer: any;

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
      /**
       * using the slow pooling method
       */
      pooling: boolean;
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
       * The last known record date a record was updated (this is the last
       * created_at of the last record of an owned search)
       */
      lastModified: string;
      /**
       * Similarly the callbacks that are called when the search updates
       * unlike the instances part, these are direct callbacks that act
       * as direct listeners
       */
      callbacks: RemoteListenerRecordsCallback[];
      /**
       * Whether to use the long term caching
       */
      useCacheWorker: boolean[];
      /**
       * using the slow pooling method
       */
      pooling: boolean;
    },
  };

  /**
   * Registry of listeners that are listening
   * for changes to an property based search cache
   */
  private propertySearchListeners: {
    /**
     * Similar with the qualified path name of either a item definition
     * or a module with the owner id attached to it as an identifier
     */
    [qualifiedPathNameWithPropertyInfo: string]: {
      /**
       * The request that is used for this
       */
      request: IPropertySearchRegisterRequest;
      /**
       * The last known record date a record was updated (this is the last
       * created_at of the last record of an owned search)
       */
      lastModified: string;
      /**
       * Similarly the callbacks that are called when the search updates
       * unlike the instances part, these are direct callbacks that act
       * as direct listeners
       */
      callbacks: RemoteListenerRecordsCallback[];
      /**
       * Whether to use the long term caching
       */
      useCacheWorker: boolean[];
      /**
       * using the slow pooling method
       */
      pooling: boolean;
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
      lastModified: string;
      /**
       * The callbacks as well
       */
      callbacks: RemoteListenerRecordsCallback[];
      /**
       * Whether to use the long term caching
       */
      useCacheWorker: boolean[];
      /**
       * using the slow pooling method
       */
      pooling: boolean;
    },
  };

  /**
   * Registry of listeners that are listening for
   * changes to a owned+parent based search that updates
   */
  private ownedParentedSearchListeners: {
    /**
     * Similar to the owned one but contains all the
     * parenting information of what we are listening to
     */
    [qualifiedPathNameWithParenting: string]: {
      /**
       * The request this id refers to
       */
      request: IOwnedParentedSearchRegisterRequest;
      /**
       * last known record date for the given answer
       */
      lastModified: string;
      /**
       * The callbacks as well
       */
      callbacks: RemoteListenerRecordsCallback[];
      /**
       * Whether to use the long term caching
       */
      useCacheWorker: boolean[];
      /**
       * using the slow pooling method
       */
      pooling: boolean;
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
  /**
   * Whether it's currently offline
   */
  private offline: boolean = true;
  /**
   * whether the identifying token has been set
   */
  private hasSetToken: boolean = false;
  /**
   * The token that has been set
   */
  private token: string = null;
  /**
   * Whether it's ready to attach events
   */
  private isReady: boolean = false;
  /**
   * The function to trigger on logout
   * this comes from the current active token provider
   */
  private logout: () => void;
  /**
   * The time when this instance was instantiated
   */
  private setupTime: number;
  /**
   * Triggered when the currency factors should be rechecked, the application
   * sets this function
   */
  private currencyFactorsHandler: () => void;
  /**
   * Counts how many listeners have been registered
   */
  private listenerCount: number = 0;

  /**
   * Instantiates a new remote listener
   * @param root the root we are using for it
   */
  constructor(root: Root) {
    this.onConnect = this.onConnect.bind(this);
    this.onChangeListened = this.onChangeListened.bind(this);
    this.onBuildnumberListened = this.onBuildnumberListened.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    this.onOwnedSearchRecordsEvent = this.onOwnedSearchRecordsEvent.bind(this);
    this.onParentedSearchRecordsEvent = this.onParentedSearchRecordsEvent.bind(this);
    this.onPropertySearchRecordsEvent = this.onPropertySearchRecordsEvent.bind(this);
    this.onOwnedParentedSearchRecordsEvent = this.onOwnedParentedSearchRecordsEvent.bind(this);
    this.onKicked = this.onKicked.bind(this);
    this.setCurrencyFactorsHandler = this.setCurrencyFactorsHandler.bind(this);
    this.triggerCurrencyFactorsHandler = this.triggerCurrencyFactorsHandler.bind(this);
    this.consumeDelayedFeedbacks = this.consumeDelayedFeedbacks.bind(this);
    this.onError = this.onError.bind(this);
    this.pushTestingInfo = this.pushTestingInfo.bind(this);
    this.executeSlowPollingFeedbacks = this.executeSlowPollingFeedbacks.bind(this);

    this.root = root;
    this.listeners = {};
    this.ownedSearchListeners = {};
    this.parentedSearchListeners = {};
    this.ownedParentedSearchListeners = {};
    this.propertySearchListeners = {};
    this.connectionListeners = [];
    this.appUpdatedListeners = [];
    this.lastRecievedBuildNumber = window.BUILD_NUMBER;
    this.setupTime = (new Date()).getTime();

    // setup the io to the client
    this.socket = io(`${location.protocol}//${location.host}`, {
      // Disable long polling should result in better performance for the load balancer
      transports: ["websocket"],
    });
    this.socket.on("connect", this.onConnect);
    this.socket.on("disconnect", this.onDisconnect);
    this.socket.on(KICKED_EVENT, this.onKicked);
    this.socket.on(CHANGED_FEEDBACK_EVENT, this.onChangeListened);
    this.socket.on(BUILDNUMBER_EVENT, this.onBuildnumberListened);
    this.socket.on(OWNED_SEARCH_RECORDS_EVENT, this.onOwnedSearchRecordsEvent);
    this.socket.on(PARENTED_SEARCH_RECORDS_EVENT, this.onParentedSearchRecordsEvent);
    this.socket.on(PROPERTY_SEARCH_RECORDS_EVENT, this.onPropertySearchRecordsEvent);
    this.socket.on(OWNED_PARENTED_SEARCH_RECORDS_EVENT, this.onOwnedParentedSearchRecordsEvent);
    this.socket.on(ERROR_EVENT, this.onError);
    this.socket.on(CURRENCY_FACTORS_UPDATED_EVENT, this.triggerCurrencyFactorsHandler);
  }

  /**
   * Triggers the currency factor hanlder
   * this function is expected to recheck the currency factors
   * as they might have changed
   */
  public triggerCurrencyFactorsHandler() {
    this.currencyFactorsHandler();
  }

  /**
   * Sets the currency factor handling function, this should be
   * done immediately after initialization
   * @param handler the handler itself
   */
  public setCurrencyFactorsHandler(handler: () => void) {
    this.currencyFactorsHandler = handler;
  }

  /**
   * Sets the logout handler, the logout is triggered
   * if the user has been kicked by a logout all event
   * @param logout the logout handler
   */
  public setLogoutHandler(logout: () => void) {
    this.logout = logout;
  }

  /**
   * When testing is enable it pushes test information
   * to the given slot in the socket data
   * @param slot the slot to use
   * @param data the data we are inserting
   */
  public pushTestingInfo(
    slot: string,
    data: any,
  ) {
    if (process.env.NODE_ENV === "development") {
      if (window.TESTING) {
        const dataWithTime = {
          ...data,
          time: (new Date()).toISOString(),
        };
        window.TESTING.socket[slot].push(dataWithTime);
      }
    }
  }

  /**
   * Called when the token changes an allows for
   * identification as well as re-identification
   * 
   * Makes the app ready
   * 
   * @param token the new token to use
   */
  public async setToken(token: string) {
    // token might be null so we use this flag
    this.hasSetToken = true;
    this.token = token;
    if (this.socket.connected) {
      const request = {
        uuid: this.uuid,
        token: this.token,
      };
      this.pushTestingInfo(
        "identifyRequests",
        request,
      );
      this.socket.emit(
        IDENTIFY_REQUEST,
        request,
      );
      await this.onIdentificationDone();
      this.isReady = true;
    }
  }

  /**
   * Provides the remote listener uuid
   */
  public getUUID() {
    return this.uuid;
  }

  /**
   * Specifies whether the remote listener is offline
   * which also defines whether the app itself is offline
   */
  public isOffline() {
    return this.offline;
  }

  /**
   * Adds a listener for when the app updates (aka buildnumber mismatch)
   * @param listener the listener to add
   */
  public addAppUpdatedListener(listener: () => void) {
    this.appUpdatedListeners.push(listener);
  }

  /**
   * Removes a listener for when the app updates (aka buildnumber mismatch)
   * @param listener the listener to remove
   */
  public removeAppUpdatedListener(listener: () => void) {
    const index = this.appUpdatedListeners.indexOf(listener);
    if (index !== -1) {
      this.appUpdatedListeners.splice(index, 1);
    }
  }

  /**
   * Checks whether the app is uppdated compared to what we are running right now
   */
  public isAppUpdated() {
    return this.lastRecievedBuildNumber !== window.BUILD_NUMBER;
  }

  /**
   * Adds a listener for when the app online status changes
   * @param listener the listener to add
   */
  public addConnectStatusListener(listener: () => void) {
    this.connectionListeners.push(listener);
  }

  /**
   * Removes a listener for when the app online status changes
   * @param listener the listener to remove
   */
  public removeConnectStatusListener(listener: () => void) {
    const index = this.connectionListeners.indexOf(listener);
    if (index !== -1) {
      this.connectionListeners.splice(index, 1);
    }
  }

  /**
   * Triggers when the current user has been kicked
   * by a logout all event
   */
  public onKicked() {
    // it would indeed be very weird if logout wasn't ready
    // but we still check
    this.logout && this.logout();
  }

  /**
   * Triggers when the listener recieves
   * a remote error event
   * @param event the error event
   */
  public onError(event: IErrorEvent) {
    this.pushTestingInfo(
      "errors",
      event,
    );

    console.error(
      event.message,
    );

    // we log the request that caused
    // the error
    if (console.table) {
      console.table(event.request);
    } else {
      console.error(event.request);
    }
  }

  /**
   * Triggers when receiving the buildnumber event that specifies
   * the buildnumber that the server is running in; this event
   * triggers just on connection, as well as on update
   * @param event the buildnumber event
   */
  public onBuildnumberListened(event: IBuildNumberEvent) {
    this.lastRecievedBuildNumber = event.buildnumber;
    if (this.isAppUpdated()) {
      // this will trigger the service worker to realize the app has
      // updated if any service worker is active
      try {
        fetch("/rest/buildnumber?current=" + window.BUILD_NUMBER);
      } catch (err) {
        // if it fails the service worker should be able to
        // handle it stills by reloading twice
      }
      // trigger the listeners
      // Javascript is totally stupid and so it will crash because the event of calling the callback will modify the array
      // and you would think that the forEach will manage to loop but the loop crashes because apparently it works
      // just like a for loop where you grab the index (and then what's the point of foreach) when the event is called because
      // Javascript is like that so I must make a copy of the array because JavaScript
      this.appUpdatedListeners.slice().forEach((l) => l());
    }
  }

  /**
   * Adds an item definition listener for when the item definition value changes
   * so that a reload can be called
   * @param parentInstance the parent instance (this will be the item-definition provider that uses it)
   * @param itemDefinitionQualifiedPathName the qualifie path name of the item definition
   * @param forId for which id
   * @param forVersion for which version (null allowed)
   * @param pooling uses slow pooling to keep for updates
   */
  public addItemDefinitionListenerFor(
    parentInstance: any,
    itemDefinitionQualifiedPathName: string,
    forId: string,
    forVersion: string,
    pooling: boolean,
  ) {
    // first we build this qualified identifier that will act as key
    const qualifiedIdentifier = itemDefinitionQualifiedPathName + "." + forId + "." + (forVersion || "");

    // now we check if we already have a listener for that
    if (this.listeners[qualifiedIdentifier]) {
      const index = this.listeners[qualifiedIdentifier].parentInstances.indexOf(parentInstance);
      // if we do, then we got to check that we are not re-adding this instance
      if (index === -1) {
        // and we add it, just to keep track
        this.listeners[qualifiedIdentifier].parentInstances.push(parentInstance);
        if (this.listeners[qualifiedIdentifier].pooling && !pooling) {
          this.listeners[qualifiedIdentifier].pooling = false;
          this.attachItemDefinitionListenerFor(this.listeners[qualifiedIdentifier].request);
        }
      }
      return;
    }

    this.listenerCount++;

    // now the request
    const request: IRegisterRequest = {
      itemDefinition: itemDefinitionQualifiedPathName,
      id: forId,
      version: forVersion,
    };
    // and the listener that is added for it
    this.listeners[qualifiedIdentifier] = {
      request,
      parentInstances: [parentInstance],
      pooling,
    };

    // and then the event is attached if possible (aka online)
    if (!pooling) {
      this.attachItemDefinitionListenerFor(request);
    }
  }

  /**
   * If online will attach an item definition listener for a given
   * item definition using a register request
   * @param request the request to register for
   */
  public async attachItemDefinitionListenerFor(request: IRegisterRequest) {
    if (this.socket.connected) {
      await this.onIdentificationDone();
      // check if still connected after a possible await
      if (this.socket.connected) {
        this.pushTestingInfo(
          "registerRequests",
          request,
        );
        this.socket.emit(
          REGISTER_REQUEST,
          request,
        );
      }
    }
  }

  /**
   * Remove an item definition listener for a given parent instance
   * @param parentInstance the parent instance
   * @param itemDefinitionQualifiedPathName the item definition pathname to stop listening for
   * @param forId the id
   * @param forVersion the version (or null)
   */
  public removeItemDefinitionListenerFor(
    parentInstance: any,
    itemDefinitionQualifiedPathName: string,
    forId: string,
    forVersion: string,
  ) {
    // so we build the same identifier
    const qualifiedID = itemDefinitionQualifiedPathName + "." + forId + "." + (forVersion || "");
    // and we check if we have a listener for it
    const listenerValue = this.listeners[qualifiedID];

    // if we do
    if (listenerValue) {
      // we build a new listener with the parent instance removed for the list
      const newListenerValue = {
        ...listenerValue,
        parentInstances: listenerValue.parentInstances.filter((i) => i !== parentInstance),
      };

      // if we have no parent instances left
      if (newListenerValue.parentInstances.length === 0) {
        // delete the listener
        delete this.listeners[qualifiedID];
        this.listenerCount--;
        // and if we are connected
        if (this.socket.connected && !newListenerValue.pooling) {
          // we can launch the unregister request
          const request: IUnregisterRequest = {
            id: forId,
            version: forVersion,
            itemDefinition: itemDefinitionQualifiedPathName,
          };
          this.pushTestingInfo(
            "unregisterRequests",
            request,
          );
          this.socket.emit(
            UNREGISTER_REQUEST,
            request,
          );
        }

        // ohterwise
      } else {
        // we assign the new listener value
        this.listeners[qualifiedID] = newListenerValue;
      }
    }
  }

  /**
   * request feedback for an item definitition to check if the value
   * hasn't somehow changed since it was last checked
   * @param request the feedback request
   * @param immediate whether to fullfill it immediately
   */
  public async requestFeedbackFor(
    request: IFeedbackRequest,
    immediate?: boolean,
  ) {
    // if we have an immediate request
    if (immediate) {
      // we check if we are connected
      if (this.socket.connected) {
        // check our identification
        await this.onIdentificationDone();
        // check if connected again
        if (this.socket.connected) {
          // and then emit it
          this.pushTestingInfo(
            "feedbackRequests",
            request,
          );
          this.socket.emit(
            FEEDBACK_REQUEST,
            request,
          );
        }
      }

      // otherwise we will add to the delayed feedback list
    } else if (
      !this.delayedFeedbacks.some(
        (df) => df.itemDefinition === request.itemDefinition && df.id === request.id && df.version === request.version
      )
    ) {
      this.delayedFeedbacks.push(request);
      setTimeout(this.consumeDelayedFeedbacks, 70);
    }
  }

  /**
   * Consumes the delayed feedbacks that might exist
   */
  private async consumeDelayedFeedbacks() {
    // avoid if there are no delayed feedbacks
    // there might not be any since the timeout can
    // be added a couple of times
    if (!this.delayedFeedbacks.length) {
      return;
    }

    // we wait if not ready
    if (this.socket.connected) {
      await this.onIdentificationDone();

      if (this.socket.connected) {
        // the reason we use delayed feedbacks is for efficiency, while we don't
        // use this for owned searches, but sometimes a same feedback would be requested twice
        this.delayedFeedbacks.forEach((df) => {
          this.pushTestingInfo(
            "feedbackRequests",
            df,
          );
          this.socket.emit(
            FEEDBACK_REQUEST,
            df,
          );
        });
      }
    }

    this.delayedFeedbacks = [];
  }

  public addPropertySearchListenerFor(
    itemDefinitionOrModuleQualifiedPathName: string,
    propertyId: string,
    propertyValue: string,
    lastModified: string,
    callback: RemoteListenerRecordsCallback,
    useCacheWorker: boolean,
    pooling: boolean,
  ) {
    // so we build our qualified identifier as well
    const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." + propertyId + "." + propertyValue;
    // if we have any in our owned search listener list
    if (this.propertySearchListeners[qualifiedIdentifier]) {
      const index = this.propertySearchListeners[qualifiedIdentifier].callbacks.indexOf(callback)
      // and if this callback is not included yet
      // this can actually hit here very often since every time that a search gets called
      // in gql and it has a cache policy, it will attempt to add a listener
      // and the same listener might have already been added before
      if (index === -1) {
        // so we push the callback
        this.propertySearchListeners[qualifiedIdentifier].callbacks.push(callback);
        this.propertySearchListeners[qualifiedIdentifier].useCacheWorker.push(useCacheWorker);
      } else {
        this.propertySearchListeners[qualifiedIdentifier].useCacheWorker[index] = useCacheWorker;
      }

      if (this.propertySearchListeners[qualifiedIdentifier].pooling && !pooling) {
        this.propertySearchListeners[qualifiedIdentifier].pooling = false;
        this.attachPropertySearchListener(this.propertySearchListeners[qualifiedIdentifier].request);
      }
      return;
    }

    this.listenerCount++;

    // we now build the request
    const request: IPropertySearchRegisterRequest = {
      qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
      propertyId,
      propertyValue,
    };
    this.propertySearchListeners[qualifiedIdentifier] = {
      request,
      callbacks: [callback],
      lastModified,
      useCacheWorker: [useCacheWorker],
      pooling,
    };

    // and attach the owner listener if possible
    if (!pooling) {
      this.attachPropertySearchListener(request);
    }
  }

  /**
   * Adds a listener for an owned search
   * @param itemDefinitionOrModuleQualifiedPathName the item definition or module we are listening for search changes
   * @param createdBy the creator that triggers this
   * @param lastModified the last known record added date
   * @param callback a callback to trigger when the listener matches
   */
  public addOwnedSearchListenerFor(
    itemDefinitionOrModuleQualifiedPathName: string,
    createdBy: string,
    lastModified: string,
    callback: RemoteListenerRecordsCallback,
    useCacheWorker: boolean,
    pooling: boolean,
  ) {
    // so we build our qualified identifier as well
    const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." + createdBy;
    // if we have any in our owned search listener list
    if (this.ownedSearchListeners[qualifiedIdentifier]) {
      const index = this.ownedSearchListeners[qualifiedIdentifier].callbacks.indexOf(callback)
      // and if this callback is not included yet
      // this can actually hit here very often since every time that a search gets called
      // in gql and it has a cache policy, it will attempt to add a listener
      // and the same listener might have already been added before
      if (index === -1) {
        // so we push the callback
        this.ownedSearchListeners[qualifiedIdentifier].callbacks.push(callback);
        this.ownedSearchListeners[qualifiedIdentifier].useCacheWorker.push(useCacheWorker);
      } else {
        this.ownedSearchListeners[qualifiedIdentifier].useCacheWorker[index] = useCacheWorker;
      }

      if (this.ownedSearchListeners[qualifiedIdentifier].pooling && !pooling) {
        this.ownedSearchListeners[qualifiedIdentifier].pooling = false;
        this.attachOwnedSearchListenerFor(this.ownedSearchListeners[qualifiedIdentifier].request);
      }
      return;
    }

    this.listenerCount++;

    // we now build the request
    const request: IOwnedSearchRegisterRequest = {
      qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
      createdBy,
    };
    this.ownedSearchListeners[qualifiedIdentifier] = {
      request,
      callbacks: [callback],
      lastModified,
      useCacheWorker: [useCacheWorker],
      pooling,
    };

    // and attach the owner listener if possible
    if (!pooling) {
      this.attachOwnedSearchListenerFor(request);
    }
  }

  /**
   * Attaches if possible the owned search listener for a cached by owner search type
   * @param request the request to use
   */
  public async attachOwnedSearchListenerFor(request: IOwnedSearchRegisterRequest) {
    if (this.socket.connected) {
      await this.onIdentificationDone();
      // check if still connected after a possible await
      if (this.socket.connected) {
        this.pushTestingInfo(
          "ownedSearchRegisterRequests",
          request,
        );
        this.socket.emit(
          OWNED_SEARCH_REGISTER_REQUEST,
          request,
        );
      }
    }
  }

  public async attachPropertySearchListener(request: IPropertySearchRegisterRequest) {
    if (this.socket.connected) {
      await this.onIdentificationDone();
      // check if still connected after a possible await
      if (this.socket.connected) {
        this.pushTestingInfo(
          "propertySearchRegisterRequests",
          request,
        );
        this.socket.emit(
          PROPERTY_SEARCH_REGISTER_REQUEST,
          request,
        );
      }
    }
  }

  /**
   * Removes an owned search listener
   * @param callback the callback that we are removing for
   * @param itemDefinitionOrModuleQualifiedPathName the item definition or module path name
   * @param createdBy the created by user namespace
   */
  public removeOwnedSearchListenerFor(
    callback: RemoteListenerRecordsCallback,
    itemDefinitionOrModuleQualifiedPathName: string,
    createdBy: string,
  ) {
    // first we build the qualified identifier
    const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." + createdBy;
    // and then check what we got for the listener value
    const listenerValue = this.ownedSearchListeners[qualifiedIdentifier];
    // if we have one
    if (listenerValue) {
      const index = listenerValue.callbacks.findIndex((i) => i === callback);

      if (index === -1) {
        return;
      }

      // we remove such callback from the list
      listenerValue.callbacks.splice(index, 1);
      listenerValue.useCacheWorker.splice(index, 1);

      // if we got no callbacks remaining
      if (listenerValue.callbacks.length === 0) {
        // then we can delete the listener
        delete this.ownedSearchListeners[qualifiedIdentifier];
        this.listenerCount--;
        // and if we are connected
        if (this.socket.connected && !listenerValue.pooling) {
          // we can perform the unregister request
          const request: IOwnedSearchUnregisterRequest = {
            qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
            createdBy,
          };
          this.pushTestingInfo(
            "ownedSearchUnregisterRequests",
            request,
          );
          this.socket.emit(
            OWNED_SEARCH_UNREGISTER_REQUEST,
            request,
          );
        }
      }
    }
  }

  /**
   * Removes an property search listener
   * @param callback the callback that we are removing for
   * @param itemDefinitionOrModuleQualifiedPathName the item definition or module path name
   * @param propertyId the property namespace
   * @param propertyValue the property value namespace
   */
  public removePropertySearchListenerFor(
    callback: RemoteListenerRecordsCallback,
    itemDefinitionOrModuleQualifiedPathName: string,
    propertyId: string,
    propertyValue: string,
  ) {
    // first we build the qualified identifier
    const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." + propertyId + "." + propertyValue;
    // and then check what we got for the listener value
    const listenerValue = this.propertySearchListeners[qualifiedIdentifier];
    // if we have one
    if (listenerValue) {
      const index = listenerValue.callbacks.findIndex((i) => i === callback);

      if (index === -1) {
        return;
      }

      // we remove such callback from the list
      listenerValue.callbacks.splice(index, 1);
      listenerValue.useCacheWorker.splice(index, 1);

      // if we got no callbacks remaining
      if (listenerValue.callbacks.length === 0) {
        // then we can delete the listener
        delete this.propertySearchListeners[qualifiedIdentifier];
        this.listenerCount--;
        // and if we are connected
        if (this.socket.connected && !listenerValue.pooling) {
          // we can perform the unregister request
          const request: IPropertySearchUnregisterRequest = {
            qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
            propertyId,
            propertyValue,
          };
          this.pushTestingInfo(
            "propertySearchUnregisterRequests",
            request,
          );
          this.socket.emit(
            PROPERTY_SEARCH_UNREGISTER_REQUEST,
            request,
          );
        }
      }
    }
  }

  /**
   * Requests feedback for an owned search, if possible
   * @param request the feedback request
   */
  public async requestOwnedSearchFeedbackFor(request: IOwnedSearchFeedbackRequest) {
    if (this.socket.connected) {
      await this.onIdentificationDone();

      // check if still connected after a possible await
      if (this.socket.connected) {
        this.pushTestingInfo(
          "ownedSearchFeedbackRequests",
          request,
        );
        this.socket.emit(
          OWNED_SEARCH_FEEDBACK_REQUEST,
          request,
        );
      }
    }
  }

  /**
   * Requests feedback for an property based search, if possible
   * @param request the feedback request
   */
  public async requestPropertySearchFeedbackFor(request: IPropertySearchFeedbackRequest) {
    if (this.socket.connected) {
      await this.onIdentificationDone();

      // check if still connected after a possible await
      if (this.socket.connected) {
        this.pushTestingInfo(
          "propertySearchFeedbackRequests",
          request,
        );
        this.socket.emit(
          PROPERTY_SEARCH_FEEDBACK_REQUEST,
          request,
        );
      }
    }
  }

  /**
   * Adds a parented search listener for a cached search via parenting
   * @param itemDefinitionOrModuleQualifiedPathName the item definition or module that it refers to
   * @param parentType the parent type (aka it's item definition qualified name)
   * @param parentId the parent id
   * @param parentVersion the parent version (or null)
   * @param lastModified the last known record date this listener knows of its stored values
   * @param callback the callback to trigger for
   */
  public addParentedSearchListenerFor(
    itemDefinitionOrModuleQualifiedPathName: string,
    parentType: string,
    parentId: string,
    parentVersion: string,
    lastModified: string,
    callback: RemoteListenerRecordsCallback,
    useCacheWorker: boolean,
    pooling: boolean,
  ) {
    // so we build the id for the parent type
    const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." +
      parentType + "." + parentId + "." + (parentVersion || "");

    // and we check if we already have some listener registered for it
    if (this.parentedSearchListeners[qualifiedIdentifier]) {
      const index = this.parentedSearchListeners[qualifiedIdentifier].callbacks.indexOf(callback)
      // if we did, now we need to check if our callback hasn't been added yet,
      // same reason as before, since every time the search is executed it will
      // attempt to add the callback
      if (index === -1) {
        // and if it's not there we add it
        this.parentedSearchListeners[qualifiedIdentifier].callbacks.push(callback);
        this.parentedSearchListeners[qualifiedIdentifier].useCacheWorker.push(useCacheWorker);
      } else {
        this.parentedSearchListeners[qualifiedIdentifier].useCacheWorker[index] = useCacheWorker;
      }

      if (this.parentedSearchListeners[qualifiedIdentifier].pooling && !pooling) {
        this.parentedSearchListeners[qualifiedIdentifier].pooling = false;
        this.attachParentedSearchListenerFor(this.parentedSearchListeners[qualifiedIdentifier].request);
      }
      return;
    }

    this.listenerCount++;

    // we build the request for it
    const request: IParentedSearchRegisterRequest = {
      qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
      parentType,
      parentId,
      parentVersion,
    };
    this.parentedSearchListeners[qualifiedIdentifier] = {
      request,
      callbacks: [callback],
      lastModified,
      useCacheWorker: [useCacheWorker],
      pooling,
    };

    // and attempt to attach it
    if (!pooling) {
      this.attachParentedSearchListenerFor(request);
    }
  }

  /**
   * Adds a parented and owned search listener for a cached search via parenting
   * @param itemDefinitionOrModuleQualifiedPathName the item definition or module that it refers to
   * @param createdBy the creator
   * @param parentType the parent type (aka it's item definition qualified name)
   * @param parentId the parent id
   * @param parentVersion the parent version (or null)
   * @param lastModified the last known record date this listener knows of its stored values
   * @param callback the callback to trigger for
   */
  public addOwnedParentedSearchListenerFor(
    itemDefinitionOrModuleQualifiedPathName: string,
    createdBy: string,
    parentType: string,
    parentId: string,
    parentVersion: string,
    lastModified: string,
    callback: RemoteListenerRecordsCallback,
    useCacheWorker: boolean,
    pooling: boolean,
  ) {
    // so we build the id for the parent type
    const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." + createdBy + "." +
      parentType + "." + parentId + "." + (parentVersion || "");

    // and we check if we already have some listener registered for it
    if (this.ownedParentedSearchListeners[qualifiedIdentifier]) {
      const index = this.ownedParentedSearchListeners[qualifiedIdentifier].callbacks.indexOf(callback)
      // if we did, now we need to check if our callback hasn't been added yet,
      // same reason as before, since every time the search is executed it will
      // attempt to add the callback
      if (index === -1) {
        // and if it's not there we add it
        this.ownedParentedSearchListeners[qualifiedIdentifier].callbacks.push(callback);
        this.ownedParentedSearchListeners[qualifiedIdentifier].useCacheWorker.push(useCacheWorker);
      } else {
        this.ownedParentedSearchListeners[qualifiedIdentifier].useCacheWorker[index] = useCacheWorker;
      }

      if (this.ownedParentedSearchListeners[qualifiedIdentifier].pooling && !pooling) {
        this.ownedParentedSearchListeners[qualifiedIdentifier].pooling = false;
        this.attachOwnedParentedSearchListenerFor(this.ownedParentedSearchListeners[qualifiedIdentifier].request);
      }
      return;
    }

    this.listenerCount++;

    // we build the request for it
    const request: IOwnedParentedSearchRegisterRequest = {
      qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
      parentType,
      parentId,
      parentVersion,
      createdBy,
    };
    this.ownedParentedSearchListeners[qualifiedIdentifier] = {
      request,
      callbacks: [callback],
      lastModified,
      useCacheWorker: [useCacheWorker],
      pooling,
    };

    // and attempt to attach it
    if (!pooling) {
      this.attachOwnedParentedSearchListenerFor(request);
    }
  }

  /**
   * Attaches the parented seach listener if possible
   * as in the app is online
   * @param request the request to attach
   */
  public async attachParentedSearchListenerFor(request: IParentedSearchRegisterRequest) {
    if (this.socket.connected) {
      await this.onIdentificationDone();

      // check if still connected after a possible await
      if (this.socket.connected) {
        this.pushTestingInfo(
          "parentedSearchRegisterRequests",
          request,
        );
        this.socket.emit(
          PARENTED_SEARCH_REGISTER_REQUEST,
          request,
        );
      }
    }
  }

  /**
   * Attaches the parented seach listener if possible
   * as in the app is online
   * @param request the request to attach
   */
  public async attachOwnedParentedSearchListenerFor(request: IParentedSearchRegisterRequest) {
    if (this.socket.connected) {
      await this.onIdentificationDone();

      // check if still connected after a possible await
      if (this.socket.connected) {
        this.pushTestingInfo(
          "ownedParentedSearchRegisterRequests",
          request,
        );
        this.socket.emit(
          OWNED_PARENTED_SEARCH_REGISTER_REQUEST,
          request,
        );
      }
    }
  }

  /**
   * Removes a parented search feedback listener and its given callback
   * that is related to
   * @param callback the callback function
   * @param itemDefinitionOrModuleQualifiedPathName the item definition or module it's related to
   * @param parentType parent type (item definition qualified name) information
   * @param parentId parent id
   * @param parentVersion parent version (or null)
   */
  public removeParentedSearchListenerFor(
    callback: RemoteListenerRecordsCallback,
    itemDefinitionOrModuleQualifiedPathName: string,
    parentType: string,
    parentId: string,
    parentVersion: string,
  ) {
    // first we get the identifier
    const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName +
      "." + parentType + "." + parentId + "." + (parentVersion || "");
    // an the listener value
    const listenerValue = this.parentedSearchListeners[qualifiedIdentifier];
    // we ensure we have one already
    if (listenerValue) {
      const index = listenerValue.callbacks.findIndex((i) => i === callback);

      if (index === -1) {
        return;
      }

      // we remove such callback from the list
      listenerValue.callbacks.splice(index, 1);
      listenerValue.useCacheWorker.splice(index, 1);

      // if then we got no callbacks left
      if (listenerValue.callbacks.length === 0) {
        // we can delete the listener
        delete this.parentedSearchListeners[qualifiedIdentifier];
        this.listenerCount--;
        // and if we are connected
        if (this.socket.connected && !listenerValue.pooling) {
          // we can unregister the listener
          const request: IParentedSearchUnregisterRequest = {
            qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
            parentId,
            parentType,
            parentVersion,
          };
          this.pushTestingInfo(
            "parentedSearchUnregisterRequests",
            request,
          );
          this.socket.emit(
            PARENTED_SEARCH_UNREGISTER_REQUEST,
            request,
          );
        }
      }
    }
  }

  /**
   * Removes an owned parented search feedback listener and its given callback
   * that is related to
   * @param callback the callback function
   * @param itemDefinitionOrModuleQualifiedPathName the item definition or module it's related to
   * @param createdBy the creator
   * @param parentType parent type (item definition qualified name) information
   * @param parentId parent id
   * @param parentVersion parent version (or null)
   */
  public removeOwnedParentedSearchListenerFor(
    callback: RemoteListenerRecordsCallback,
    itemDefinitionOrModuleQualifiedPathName: string,
    createdBy: string,
    parentType: string,
    parentId: string,
    parentVersion: string,
  ) {
    // first we get the identifier
    const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." + createdBy +
      "." + parentType + "." + parentId + "." + (parentVersion || "");
    // an the listener value
    const listenerValue = this.ownedParentedSearchListeners[qualifiedIdentifier];
    // we ensure we have one already
    if (listenerValue) {
      const index = listenerValue.callbacks.findIndex((i) => i === callback);

      if (index === -1) {
        return;
      }

      // we remove such callback from the list
      listenerValue.callbacks.splice(index, 1);
      listenerValue.useCacheWorker.splice(index, 1);

      // if then we got no callbacks left
      if (listenerValue.callbacks.length === 0) {
        // we can delete the listener
        delete this.ownedParentedSearchListeners[qualifiedIdentifier];
        this.listenerCount--;
        // and if we are connected
        if (this.socket.connected && !listenerValue.pooling) {
          // we can unregister the listener
          const request: IOwnedParentedSearchUnregisterRequest = {
            qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
            createdBy,
            parentId,
            parentType,
            parentVersion,
          };
          this.pushTestingInfo(
            "ownedParentedSearchUnregisterRequests",
            request,
          );
          this.socket.emit(
            OWNED_PARENTED_SEARCH_UNREGISTER_REQUEST,
            request,
          );
        }
      }
    }
  }

  /**
   * Requests feedback for a parented seach, if possible
   * @param request the request to trigger
   */
  public async requestParentedSearchFeedbackFor(request: IParentedSearchFeedbackRequest) {
    if (this.socket.connected) {
      await this.onIdentificationDone();

      // check if still connected after a possible await
      if (this.socket.connected) {
        this.pushTestingInfo(
          "parentedSearchFeebackRequests",
          request,
        );
        this.socket.emit(
          PARENTED_SEARCH_FEEDBACK_REQUEST,
          request,
        );
      }
    }
  }

  /**
   * Requests feedback for a parented seach, if possible
   * @param request the request to trigger
   */
  public async requestOwnedParentedSearchFeedbackFor(request: IOwnedParentedSearchFeedbackRequest) {
    if (this.socket.connected) {
      await this.onIdentificationDone();

      // check if still connected after a possible await
      if (this.socket.connected) {
        this.pushTestingInfo(
          "ownedParentedSearchFeebackRequests",
          request,
        );
        this.socket.emit(
          OWNED_PARENTED_SEARCH_FEEDBACK_REQUEST,
          request,
        );
      }
    }
  }

  /**
   * Triggers on a changed or a feedback event
   * @param event the event itself
   */
  private onChangeListened(
    event: IChangedFeedbackEvent,
  ) {
    this.pushTestingInfo(
      "changedFeedbackEvents",
      event,
    );

    // first we need to see what item definition we matched
    const itemDefinition: ItemDefinition = this.root.registry[event.itemDefinition] as ItemDefinition;
    // and let's get the applied value for it we currently have
    const appliedGQLValue = itemDefinition.getGQLAppliedValue(event.id, event.version);

    // so if we have one
    if (appliedGQLValue) {

      // so if the event is a modified type
      // or a created type or it's a feedback that gives
      // a last modified that doesn't match our applied value
      if (
        event.type === "modified" || event.type === "created" ||
        (
          event.type === "last_modified" &&
          (
            // our applied value is null, basically we have save and stored
            // the item as not found
            !appliedGQLValue.flattenedValue ||
            // our last modified event differs, means it's newer
            event.lastModified !== appliedGQLValue.flattenedValue.last_modified
          )
        )
      ) {
        // we request a reload
        itemDefinition.triggerListeners("reload", event.id, event.version);

        // otherwise it was deleted and we are currently not aware that this is the
        // situation
      } else if (event.type === "not_found" && appliedGQLValue.rawValue !== null) {
        // we clean the value
        // itemDefinition.cleanValueFor(event.id, event.version);
        itemDefinition.applyValue(
          event.id,
          event.version,
          null,
          false,
          null,
          false,
        );

        // and if we got a cache worker
        // since we are deleting we ignore the cache worker policy
        if (CacheWorkerInstance.isSupported) {
          // we do the delete
          CacheWorkerInstance.instance.setCachedValue(
            PREFIX_GET + itemDefinition.getQualifiedPathName(),
            event.id,
            event.version,
            null,
            null,
          );
        }

        // and trigger the change for it
        itemDefinition.triggerListeners("change", event.id, event.version);
      }

      // otherwise if we don't have one an it's either the modified event
      // for that the thing has been modified, it has been created, or last modified, basically
      // anything but not found
    } else if (event.type === "modified" || event.type === "created" || event.type === "last_modified") {
      // we ask fora reload for any possible stray item definition provider around
      itemDefinition.triggerListeners("reload", event.id, event.version);

      // and now for not found
    } else if (event.type === "not_found") {
      // we wnat to clean the value
      itemDefinition.cleanValueFor(event.id, event.version);

      // and if we got a cache worker
      // since we are deleting we ignore the cache worker policy
      if (CacheWorkerInstance.isSupported) {
        // we are going to do this to upate such it gets deleted
        // if it exists there
        CacheWorkerInstance.instance.setCachedValue(
          PREFIX_GET + itemDefinition.getQualifiedPathName(),
          event.id,
          event.version,
          null,
          null,
        );
      }

      // and now we trigger the change event, no need for reload, since it's null
      // ths might mean something got deleted
      itemDefinition.triggerListeners("change", event.id, event.version);
    }
  }

  /**
   * Triggers once the server indicates that values have been added to a search
   * result that is cached by owner
   * @param event the owned search event
   */
  public async onOwnedSearchRecordsEvent(
    event: IOwnedSearchRecordsEvent,
  ) {
    this.pushTestingInfo(
      "ownedSearchRecordsEvent",
      event,
    );

    // so first we want to get our owned listener for it
    const ownedListener = this.ownedSearchListeners[event.qualifiedPathName + "." + event.createdBy];

    // we still ensure that it exists, even when it should
    if (ownedListener) {
      // so we updated the lastKnownRecordDate
      ownedListener.lastModified = event.newLastModified;

      // and if our cache worker is supported
      if (CacheWorkerInstance.isSupported && ownedListener.useCacheWorker.some((w) => w)) {
        // we are going to request it to add the new records that our event
        // comes loaded with the new records that were added to it
        await CacheWorkerInstance.instance.updateRecordsOnCachedSearch(
          PREFIX_SEARCH + event.qualifiedPathName,
          event.createdBy,
          null,
          null,
          null,
          null,
          null,
          event.newRecords,
          event.createdRecords,
          event.modifiedRecords,
          event.lostRecords,
          event.deletedRecords,
          event.newLastModified,
          "by-owner"
        );
      }

      // now we trigger the callbacks that should re-perform the cached
      // search, and since all records should have been added, the new search
      // should show the new results
      // Javascript is totally stupid and so it will crash because the event of calling the callback will modify the array
      // and you would think that the forEach will manage to loop but the loop crashes because apparently it works
      // just like a for loop where you grab the index (and then what's the point of foreach) when the event is called because
      // Javascript is like that so I must make a copy of the array because JavaScript
      ownedListener.callbacks.slice().forEach((c) => c({
        newRecords: event.newRecords,
        lostRecords: event.lostRecords,
        modifiedRecords: event.modifiedRecords,
        deletedRecords: event.deletedRecords,
        createdRecords: event.createdRecords,
      }));
    }
  }

  /**
   * Triggers once the server indicates that values have been added to a search
   * result that is cached by parent
   * @param event the parent search records added event
   */
  public async onParentedSearchRecordsEvent(
    event: IParentedSearchRecordsEvent,
  ) {
    this.pushTestingInfo(
      "parentedSearchRecordsEvent",
      event,
    );

    // build the listener id
    const parentedListener = this.parentedSearchListeners[
      event.qualifiedPathName + "." + event.parentType + "." +
      event.parentId + "." + (event.parentVersion || "")
    ];

    // and we still check it if exists
    if (parentedListener) {
      // do the same as in the owned version
      parentedListener.lastModified = event.newLastModified;

      // and equally we try to add these records
      if (CacheWorkerInstance.isSupported && parentedListener.useCacheWorker.some((w) => w)) {
        await CacheWorkerInstance.instance.updateRecordsOnCachedSearch(
          PREFIX_SEARCH + event.qualifiedPathName,
          null,
          event.parentType,
          event.parentId,
          event.parentVersion,
          null,
          null,
          event.newRecords,
          event.createdRecords,
          event.modifiedRecords,
          event.lostRecords,
          event.deletedRecords,
          event.newLastModified,
          "by-parent",
        );
      }

      // now we trigger the callbacks that should re-perform the cached
      // search, and since all records should have been added, the new search
      // should show the new results
      // Javascript is totally stupid and so it will crash because the event of calling the callback will modify the array
      // and you would think that the forEach will manage to loop but the loop crashes because apparently it works
      // just like a for loop where you grab the index (and then what's the point of foreach) when the event is called because
      // Javascript is like that so I must make a copy of the array because JavaScript
      parentedListener.callbacks.slice().forEach((c) =>
        c({
          newRecords: event.newRecords,
          lostRecords: event.lostRecords,
          modifiedRecords: event.modifiedRecords,
          deletedRecords: event.deletedRecords,
          createdRecords: event.createdRecords,
        })
      );
    }
  }

  public async onPropertySearchRecordsEvent(
    event: IPropertySearchRecordsEvent,
  ) {
    this.pushTestingInfo(
      "propertySearchRecordsEvent",
      event,
    );

    // build the listener id
    const propertyListener = this.propertySearchListeners[
      event.qualifiedPathName + "." + event.propertyId + "." + event.propertyValue
    ];

    // and we still check it if exists
    if (propertyListener) {
      // do the same as in the owned version
      propertyListener.lastModified = event.newLastModified;

      // and equally we try to add these records
      if (CacheWorkerInstance.isSupported && propertyListener.useCacheWorker.some((w) => w)) {
        await CacheWorkerInstance.instance.updateRecordsOnCachedSearch(
          PREFIX_SEARCH + event.qualifiedPathName,
          null,
          null,
          null,
          null,
          event.propertyId,
          event.propertyValue,
          event.newRecords,
          event.createdRecords,
          event.modifiedRecords,
          event.lostRecords,
          event.deletedRecords,
          event.newLastModified,
          "by-property",
        );
      }

      // now we trigger the callbacks that should re-perform the cached
      // search, and since all records should have been added, the new search
      // should show the new results
      // Javascript is totally stupid and so it will crash because the event of calling the callback will modify the array
      // and you would think that the forEach will manage to loop but the loop crashes because apparently it works
      // just like a for loop where you grab the index (and then what's the point of foreach) when the event is called because
      // Javascript is like that so I must make a copy of the array because JavaScript
      propertyListener.callbacks.slice().forEach((c) => c({
        newRecords: event.newRecords,
        lostRecords: event.lostRecords,
        modifiedRecords: event.modifiedRecords,
        deletedRecords: event.deletedRecords,
        createdRecords: event.createdRecords,
      }));
    }
  }

  /**
   * Triggers once the server indicates that values have been added to a search
   * result that is cached by parent
   * @param event the parent search records added event
   */
  public async onOwnedParentedSearchRecordsEvent(
    event: IOwnedParentedSearchRecordsEvent,
  ) {
    this.pushTestingInfo(
      "ownedParentedSearchRecordsEvent",
      event,
    );

    // build the listener id
    const ownedParentedListener = this.ownedParentedSearchListeners[
      event.qualifiedPathName + "." + event.createdBy + "." + event.parentType + "." +
      event.parentId + "." + (event.parentVersion || "")
    ];

    // and we still check it if exists
    if (ownedParentedListener) {
      // do the same as in the owned version
      ownedParentedListener.lastModified = event.newLastModified;

      // and equally we try to add these records
      if (CacheWorkerInstance.isSupported && ownedParentedListener.useCacheWorker.some((w) => w)) {
        await CacheWorkerInstance.instance.updateRecordsOnCachedSearch(
          PREFIX_SEARCH + event.qualifiedPathName,
          event.createdBy,
          event.parentType,
          event.parentId,
          event.parentVersion,
          null,
          null,
          event.newRecords,
          event.createdRecords,
          event.modifiedRecords,
          event.lostRecords,
          event.deletedRecords,
          event.newLastModified,
          "by-owner-and-parent",
        );
      }

      // now we trigger the callbacks that should re-perform the cached
      // search, and since all records should have been added, the new search
      // should show the new results
      // Javascript is totally stupid and so it will crash because the event of calling the callback will modify the array
      // and you would think that the forEach will manage to loop but the loop crashes because apparently it works
      // just like a for loop where you grab the index (and then what's the point of foreach) when the event is called because
      // Javascript is like that so I must make a copy of the array because JavaScript
      ownedParentedListener.callbacks.slice().forEach((c) => c({
        newRecords: event.newRecords,
        lostRecords: event.lostRecords,
        modifiedRecords: event.modifiedRecords,
        deletedRecords: event.deletedRecords,
        createdRecords: event.createdRecords,
      }));
    }
  }

  /**
   * returns a promise (or immediately) for when the identification
   * process to identify with the websocket is done
   * @returns void or a void promise for when it's done
   */
  private onIdentificationDone(): Promise<void> {
    if (this.offline) {
      return;
    }
    if (this.isReady) {
      return;
    }
    return new Promise((resolve) => {
      const doneListener = () => {
        this.pushTestingInfo(
          "identifiedEvents",
          {},
        );
        this.socket.off(IDENTIFIED_EVENT, doneListener);
        this.socket.off("disconnect", doneListenerDisconnect);
        resolve();
      };
      const doneListenerDisconnect = () => {
        this.offline = true;
        this.isReady = false;
        this.socket.off(IDENTIFIED_EVENT, doneListener);
        this.socket.off("disconnect", doneListenerDisconnect);
        resolve();
      }
      this.socket.on("disconnect", doneListenerDisconnect);
      this.socket.on(IDENTIFIED_EVENT, doneListener);
    });
  }

  /**
   * Triggers once the websocket connects
   */
  private async onConnect() {
    this.offline = false;

    this.slowPoolingTimer = setTimeout(this.executeSlowPollingFeedbacks, SLOW_POLLING_MIN_TIME);

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
      const request = {
        uuid: this.uuid,
        token: this.token,
      };
      this.pushTestingInfo(
        "identifyRequests",
        request,
      )
      this.socket.emit(
        IDENTIFY_REQUEST,
        request,
      );

      // now we await for identification to be sucesful
      await this.onIdentificationDone();

      // if we happened to die during the event then we return
      if (this.offline) {
        return;
      }

      // if we survived that then we are ready
      this.isReady = true;
    }

    // Javascript is totally stupid and so it will crash because the event of calling the callback will modify the array
    // and you would think that the forEach will manage to loop but the loop crashes because apparently it works
    // just like a for loop where you grab the index (and then what's the point of foreach) when the event is called because
    // Javascript is like that so I must make a copy of the array because JavaScript
    this.connectionListeners.slice().forEach((l) => l());
  }

  private async executeSlowPollingFeedbacks() {
    if (this.socket.connected) {
      const started = (new Date().getTime());
      for (let listenerKey of Object.keys(this.listeners)) {
        if (this.listeners[listenerKey].pooling) {
          this.requestFeedbackFor(this.listeners[listenerKey].request, true);
          await wait(SLOW_POLLING_TIME_BETWEEN_REQUESTS);

          if (!this.socket.connected) {
            return;
          }
        }
      }

      for (let listenerKey of Object.keys(this.ownedSearchListeners)) {
        if (this.ownedSearchListeners[listenerKey].pooling) {
          const lastModified = this.ownedSearchListeners[listenerKey].lastModified;
          this.requestOwnedSearchFeedbackFor({
            ...this.ownedSearchListeners[listenerKey].request,
            lastModified: lastModified,
          });
          await wait(SLOW_POLLING_TIME_BETWEEN_REQUESTS);

          if (!this.socket.connected) {
            return;
          }
        }
      }

      for (let listenerKey of Object.keys(this.parentedSearchListeners)) {
        if (this.parentedSearchListeners[listenerKey].pooling) {
          const lastModified = this.parentedSearchListeners[listenerKey].lastModified;
          this.requestParentedSearchFeedbackFor({
            ...this.parentedSearchListeners[listenerKey].request,
            lastModified: lastModified,
          });
          await wait(SLOW_POLLING_TIME_BETWEEN_REQUESTS);

          if (!this.socket.connected) {
            return;
          }
        }
      }

      for (let listenerKey of Object.keys(this.ownedParentedSearchListeners)) {
        if (this.ownedParentedSearchListeners[listenerKey].pooling) {
          const lastModified = this.ownedParentedSearchListeners[listenerKey].lastModified;
          this.requestOwnedParentedSearchFeedbackFor({
            ...this.ownedParentedSearchListeners[listenerKey].request,
            lastModified: lastModified,
          });
          await wait(SLOW_POLLING_TIME_BETWEEN_REQUESTS);

          if (!this.socket.connected) {
            return;
          }
        }
      }

      for (let listenerKey of Object.keys(this.propertySearchListeners)) {
        if (this.propertySearchListeners[listenerKey].pooling) {
          const lastModified = this.propertySearchListeners[listenerKey].lastModified;
          this.requestPropertySearchFeedbackFor({
            ...this.propertySearchListeners[listenerKey].request,
            lastModified: lastModified,
          });
          await wait(SLOW_POLLING_TIME_BETWEEN_REQUESTS);

          if (!this.socket.connected) {
            return;
          }
        }
      }

      // the difference for when we started and now
      const diff = (new Date().getTime()) - started;
      // we took too long we start over again
      if (diff >= SLOW_POLLING_MIN_TIME) {
        this.executeSlowPollingFeedbacks();
      } else {
        // we were quite fast, we wait for the next min time
        const timeLeft = SLOW_POLLING_MIN_TIME - diff;
        // this will get killed if it's disconnected and reset
        this.slowPoolingTimer = setTimeout(this.executeSlowPollingFeedbacks, timeLeft);
      }
    }
  }

  /**
   * Reattachs the detached requests
   */
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
      if (!this.listeners[listenerKey].pooling) {
        this.attachItemDefinitionListenerFor(this.listeners[listenerKey].request);
      }
      if (requiresFeedback) {
        this.requestFeedbackFor(this.listeners[listenerKey].request, true);
      }
    });

    // add the owned search listeners again
    Object.keys(this.ownedSearchListeners).forEach((listenerKey) => {
      if (!this.ownedSearchListeners[listenerKey].pooling) {
        this.attachOwnedSearchListenerFor(this.ownedSearchListeners[listenerKey].request);
      }

      if (requiresFeedback) {
        const lastModified = this.ownedSearchListeners[listenerKey].lastModified;
        this.requestOwnedSearchFeedbackFor({
          ...this.ownedSearchListeners[listenerKey].request,
          lastModified: lastModified,
        });
      }
    });

    // and the parented search listeners as well
    Object.keys(this.parentedSearchListeners).forEach((listenerKey) => {
      if (!this.parentedSearchListeners[listenerKey].pooling) {
        this.attachParentedSearchListenerFor(this.parentedSearchListeners[listenerKey].request);
      }

      if (requiresFeedback) {
        const lastModified = this.parentedSearchListeners[listenerKey].lastModified;
        this.requestParentedSearchFeedbackFor({
          ...this.parentedSearchListeners[listenerKey].request,
          lastModified: lastModified,
        });
      }
    });

    // and the parented search listeners as well
    Object.keys(this.ownedParentedSearchListeners).forEach((listenerKey) => {
      if (!this.ownedParentedSearchListeners[listenerKey].pooling) {
        this.attachOwnedParentedSearchListenerFor(this.ownedParentedSearchListeners[listenerKey].request);
      }

      if (requiresFeedback) {
        const lastModified = this.ownedParentedSearchListeners[listenerKey].lastModified;
        this.requestOwnedParentedSearchFeedbackFor({
          ...this.ownedParentedSearchListeners[listenerKey].request,
          lastModified: lastModified,
        });
      }
    });

    // and the parented search listeners as well
    Object.keys(this.propertySearchListeners).forEach((listenerKey) => {
      if (!this.propertySearchListeners[listenerKey].pooling) {
        this.attachPropertySearchListener(this.propertySearchListeners[listenerKey].request);
      }

      if (requiresFeedback) {
        const lastModified = this.propertySearchListeners[listenerKey].lastModified;
        this.requestPropertySearchFeedbackFor({
          ...this.propertySearchListeners[listenerKey].request,
          lastModified: lastModified,
        });
      }
    });

    if (requiresFeedback) {
      // and we check for the currency factors now
      this.triggerCurrencyFactorsHandler();
    }
  }

  /**
   * Triggers when losing connection
   */
  private onDisconnect() {
    this.offline = true;
    this.isReady = false;
    clearTimeout(this.slowPoolingTimer);

    // Javascript is totally stupid and so it will crash because the event of calling the callback will modify the array
    // and you would think that the forEach will manage to loop but the loop crashes because apparently it works
    // just like a for loop where you grab the index (and then what's the point of foreach) when the event is called because
    // Javascript is like that so I must make a copy of the array because JavaScript
    this.connectionListeners.slice().forEach((l) => l());
  }
}
