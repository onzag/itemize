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
    private offline;
    private hasSetToken;
    private token;
    private isReady;
    private logout;
    private setupTime;
    private currencyFactorsHandler;
    constructor(root: Root);
    triggerCurrencyFactorsHandler(): void;
    setCurrencyFactorsHandler(handler: () => void): void;
    setLogoutHandler(logout: () => void): void;
    onKicked(): void;
    onError(event: IErrorEvent): void;
    setToken(token: string): Promise<void>;
    onBuildnumberListened(build: IBuildNumberEvent): void;
    getUUID(): string;
    isOffline(): boolean;
    addAppUpdatedListener(listener: () => void): void;
    removeAppUpdatedListener(listener: () => void): void;
    isAppUpdated(): boolean;
    addConnectStatusListener(listener: () => void): void;
    removeConnectStatusListener(listener: () => void): void;
    addItemDefinitionListenerFor(parentInstance: any, itemDefinitionQualifiedPathName: string, forId: number, forVersion: string): void;
    attachItemDefinitionListenerFor(request: IRegisterRequest): Promise<void>;
    attachOwnedSearchListenerFor(request: IOwnedSearchRegisterRequest): Promise<void>;
    attachParentedSearchListenerFor(request: IParentedSearchRegisterRequest): Promise<void>;
    requestOwnedSearchFeedbackFor(request: IOwnedSearchFeedbackRequest): Promise<void>;
    requestParentedSearchFeedbackFor(request: IParentedSearchFeedbackRequest): Promise<void>;
    addOwnedSearchListenerFor(itemDefinitionOrModuleQualifiedPathName: string, createdBy: number, lastKnownRecordDate: string, callback: () => any): void;
    addParentedSearchListenerFor(itemDefinitionOrModuleQualifiedPathName: string, parentType: string, parentId: number, parentVersion: string, lastKnownRecordDate: string, callback: () => any): void;
    requestFeedbackFor(request: IFeedbackRequest, immediate?: boolean): Promise<void>;
    removeItemDefinitionListenerFor(parentInstance: any, itemDefinitionQualifiedPathName: string, forId: number, forVersion: string): void;
    removeOwnedSearchListenerFor(callback: () => any, itemDefinitionOrModuleQualifiedPathName: string, createdBy: number): void;
    removeParentedSearchListenerFor(callback: () => any, itemDefinitionOrModuleQualifiedPathName: string, parentType: string, parentId: number, parentVersion: string): void;
    private onChangeListened;
    private consumeDelayedFeedbacks;
    private onIdentificationDone;
    private onConnect;
    private attachDetacchedRequests;
    private onRecordsAddedToOwnedSearch;
    private onRecordsAddedToParentedSearch;
    private onDisconnect;
}
