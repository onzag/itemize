/**
 * Provides the remote listener that uses the remote protocol in order
 * to communicate with the server for changes as well as to register
 * listeners
 *
 * @packageDocumentation
 */
import Root from "../../../base/Root";
import { IRegisterRequest, IOwnedSearchRegisterRequest, IParentedSearchRegisterRequest, IFeedbackRequest, IBuildNumberEvent, IOwnedSearchFeedbackRequest, IParentedSearchFeedbackRequest, IErrorEvent } from "../../../base/remote-protocol";
/**
 * The remote listener class creates a websocket connection (as well as it falling back to polling)
 * for usage with the application to listen for changes to item definitions, request feedback as well
 * as to keep things up to date and reactive
 */
export declare class RemoteListener {
    /**
     * The socket io client
     */
    private socket;
    /**
     * The root we are using
     */
    private root;
    /**
     * A registry of listeners of which are
     * listening for changes
     */
    private listeners;
    /**
     * Registry of listeners that are listening
     * for changes to an owned search cache
     */
    private ownedSearchListeners;
    /**
     * Registry of listeners that are listening for
     * changes to a parent based search that updates
     */
    private parentedSearchListeners;
    /**
     * Many instances might request feedback for the
     * same thing at once, so we delay these feedbacks
     * a little bit
     */
    private delayedFeedbacks;
    /**
     * Listeners for connection change status, offline/online
     */
    private connectionListeners;
    /**
     * Listeners for the app updated changes, when a buildnumber
     * event is received
     */
    private appUpdatedListeners;
    /**
     * The last recieved build number, starts by being the current
     * buildnumber
     */
    private lastRecievedBuildNumber;
    /**
     * An uuid to randomly identify this listener
     */
    private uuid;
    /**
     * Whether it's currently offline
     */
    private offline;
    /**
     * whether the identifying token has been set
     */
    private hasSetToken;
    /**
     * The token that has been set
     */
    private token;
    /**
     * Whether it's ready to attach events
     */
    private isReady;
    /**
     * The function to trigger on logout
     * this comes from the current active token provider
     */
    private logout;
    /**
     * The time when this instance was instantiated
     */
    private setupTime;
    /**
     * Triggered when the currency factors should be rechecked, the application
     * sets this function
     */
    private currencyFactorsHandler;
    /**
     * Instantiates a new remote listener
     * @param root the root we are using for it
     */
    constructor(root: Root);
    /**
     * Triggers the currency factor hanlder
     * this function is expected to recheck the currency factors
     * as they might have changed
     */
    triggerCurrencyFactorsHandler(): void;
    /**
     * Sets the currency factor handling function, this should be
     * done immediately after initialization
     * @param handler the handler itself
     */
    setCurrencyFactorsHandler(handler: () => void): void;
    /**
     * Sets the logout handler, the logout is triggered
     * if the user has been kicked by a logout all event
     * @param logout the logout handler
     */
    setLogoutHandler(logout: () => void): void;
    /**
     * Called when the token changes an allows for
     * identification as well as re-identification
     *
     * Makes the app ready
     *
     * @param token the new token to use
     */
    setToken(token: string): Promise<void>;
    /**
     * Provides the remote listener uuid
     */
    getUUID(): string;
    /**
     * Specifies whether the remote listener is offline
     * which also defines whether the app itself is offline
     */
    isOffline(): boolean;
    /**
     * Adds a listener for when the app updates (aka buildnumber mismatch)
     * @param listener the listener to add
     */
    addAppUpdatedListener(listener: () => void): void;
    /**
     * Removes a listener for when the app updates (aka buildnumber mismatch)
     * @param listener the listener to remove
     */
    removeAppUpdatedListener(listener: () => void): void;
    /**
     * Checks whether the app is uppdated compared to what we are running right now
     */
    isAppUpdated(): boolean;
    /**
     * Adds a listener for when the app online status changes
     * @param listener the listener to add
     */
    addConnectStatusListener(listener: () => void): void;
    /**
     * Removes a listener for when the app online status changes
     * @param listener the listener to remove
     */
    removeConnectStatusListener(listener: () => void): void;
    /**
     * Triggers when the current user has been kicked
     * by a logout all event
     */
    onKicked(): void;
    /**
     * Triggers when the listener recieves
     * a remote error event
     * @param event the error event
     */
    onError(event: IErrorEvent): void;
    /**
     * Triggers when receiving the buildnumber event that specifies
     * the buildnumber that the server is running in; this event
     * triggers just on connection, as well as on update
     * @param event the buildnumber event
     */
    onBuildnumberListened(event: IBuildNumberEvent): void;
    /**
     * Adds an item definition listener for when the item definition value changes
     * so that a reload can be called
     * @param parentInstance the parent instance (this will be the item-definition provider that uses it)
     * @param itemDefinitionQualifiedPathName the qualifie path name of the item definition
     * @param forId for which id
     * @param forVersion for which version (null allowed)
     */
    addItemDefinitionListenerFor(parentInstance: any, itemDefinitionQualifiedPathName: string, forId: number, forVersion: string): void;
    /**
     * If online will attach an item definition listener for a given
     * item definition using a register request
     * @param request the request to register for
     */
    attachItemDefinitionListenerFor(request: IRegisterRequest): Promise<void>;
    /**
     * Remove an item definition listener for a given parent instance
     * @param parentInstance the parent instance
     * @param itemDefinitionQualifiedPathName the item definition pathname to stop listening for
     * @param forId the id
     * @param forVersion the version (or null)
     */
    removeItemDefinitionListenerFor(parentInstance: any, itemDefinitionQualifiedPathName: string, forId: number, forVersion: string): void;
    /**
     * request feedback for an item definitition to check if the value
     * hasn't somehow changed since it was last checked
     * @param request the feedback request
     * @param immediate whether to fullfill it immediately
     */
    requestFeedbackFor(request: IFeedbackRequest, immediate?: boolean): Promise<void>;
    /**
     * Consumes the delayed feedbacks that might exist
     */
    private consumeDelayedFeedbacks;
    /**
     * Adds a listener for an owned search
     * @param itemDefinitionOrModuleQualifiedPathName the item definition or module we are listening for search changes
     * @param createdBy the creator that triggers this
     * @param lastKnownRecordDate the last known record added date
     * @param callback a callback to trigger when the listener matches
     */
    addOwnedSearchListenerFor(itemDefinitionOrModuleQualifiedPathName: string, createdBy: number, lastKnownRecordDate: string, callback: () => any): void;
    /**
     * Attaches if possible the owned search listener for a cached by owner search type
     * @param request the request to use
     */
    attachOwnedSearchListenerFor(request: IOwnedSearchRegisterRequest): Promise<void>;
    /**
     * Removes an owned search listener
     * @param callback the callback that we are removing for
     * @param itemDefinitionOrModuleQualifiedPathName the item definition or module path name
     * @param createdBy the created by user namespace
     */
    removeOwnedSearchListenerFor(callback: () => any, itemDefinitionOrModuleQualifiedPathName: string, createdBy: number): void;
    /**
     * Requests feedback for an owned search, if possible
     * @param request the feedback request
     */
    requestOwnedSearchFeedbackFor(request: IOwnedSearchFeedbackRequest): Promise<void>;
    /**
     * Adds a parented search listener for a cached search via parenting
     * @param itemDefinitionOrModuleQualifiedPathName the item definition or module that it refers to
     * @param parentType the parent type (aka it's item definition qualified name)
     * @param parentId the parent id
     * @param parentVersion the parent version (or null)
     * @param lastKnownRecordDate the last known record date this listener knows of its stored values
     * @param callback the callback to trigger for
     */
    addParentedSearchListenerFor(itemDefinitionOrModuleQualifiedPathName: string, parentType: string, parentId: number, parentVersion: string, lastKnownRecordDate: string, callback: () => any): void;
    /**
     * Attaches the parented seach listener if possible
     * as in the app is online
     * @param request the request to attach
     */
    attachParentedSearchListenerFor(request: IParentedSearchRegisterRequest): Promise<void>;
    /**
     * Removes a parented search feedback listener and its given callback
     * that is related to
     * @param callback the callback function
     * @param itemDefinitionOrModuleQualifiedPathName the item definition or module it's related to
     * @param parentType parent type (item definition qualified name) information
     * @param parentId parent id
     * @param parentVersion parent version (or null)
     */
    removeParentedSearchListenerFor(callback: () => any, itemDefinitionOrModuleQualifiedPathName: string, parentType: string, parentId: number, parentVersion: string): void;
    /**
     * Requests feedback for a parented seach, if possible
     * @param request the request to trigger
     */
    requestParentedSearchFeedbackFor(request: IParentedSearchFeedbackRequest): Promise<void>;
    /**
     * Triggers on a changed or a feedback event
     * @param event the event itself
     */
    private onChangeListened;
    /**
     * Triggers once the server indicates that values have been added to a search
     * result that is cached by owner
     * @param event the owned search event
     */
    private onRecordsAddedToOwnedSearch;
    /**
     * Triggers once the server indicates that values have been added to a search
     * result that is cached by parent
     * @param event the parent search records added event
     */
    private onRecordsAddedToParentedSearch;
    /**
     * returns a promise (or immediately) for when the identification
     * process to identify with the websocket is done
     * @returns void or a void promise for when it's done
     */
    private onIdentificationDone;
    /**
     * Triggers once the websocket connects
     */
    private onConnect;
    /**
     * Reattachs the detached requests
     */
    private attachDetacchedRequests;
    /**
     * Triggers when losing connection
     */
    private onDisconnect;
}
