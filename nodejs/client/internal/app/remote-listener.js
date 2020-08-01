"use strict";
/**
 * Provides the remote listener that uses the remote protocol in order
 * to communicate with the server for changes as well as to register
 * listeners
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const uuid_1 = __importDefault(require("uuid"));
const cache_1 = __importDefault(require("../workers/cache"));
const constants_1 = require("../../../constants");
const remote_protocol_1 = require("../../../base/remote-protocol");
const ItemDefinition_1 = __importDefault(require("../../../base/Root/Module/ItemDefinition"));
/**
 * The remote listener class creates a websocket connection (as well as it falling back to polling)
 * for usage with the application to listen for changes to item definitions, request feedback as well
 * as to keep things up to date and reactive
 */
class RemoteListener {
    constructor(root) {
        /**
         * Many instances might request feedback for the
         * same thing at once, so we delay these feedbacks
         * a little bit
         */
        this.delayedFeedbacks = [];
        /**
         * Listeners for connection change status, offline/online
         */
        this.connectionListeners = [];
        /**
         * Listeners for the app updated changes, when a buildnumber
         * event is received
         */
        this.appUpdatedListeners = [];
        /**
         * An uuid to randomly identify this listener
         */
        this.uuid = uuid_1.default.v4();
        this.offline = true;
        this.hasSetToken = false;
        this.token = null;
        this.isReady = false;
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
        this.lastRecievedBuildNumber = window.BUILD_NUMBER;
        this.setupTime = (new Date()).getTime();
        this.socket = socket_io_client_1.default(`${location.protocol}//${location.host}`);
        this.socket.on("connect", this.onConnect);
        this.socket.on("disconnect", this.onDisconnect);
        this.socket.on(remote_protocol_1.KICKED_EVENT, this.onKicked);
        this.socket.on(remote_protocol_1.CHANGED_FEEEDBACK_EVENT, this.onChangeListened);
        this.socket.on(remote_protocol_1.BUILDNUMBER_EVENT, this.onBuildnumberListened);
        this.socket.on(remote_protocol_1.OWNED_SEARCH_RECORDS_ADDED_EVENT, this.onRecordsAddedToOwnedSearch);
        this.socket.on(remote_protocol_1.PARENTED_SEARCH_RECORDS_ADDED_EVENT, this.onRecordsAddedToParentedSearch);
        this.socket.on(remote_protocol_1.ERROR_EVENT, this.onError);
        this.socket.on(remote_protocol_1.CURRENCY_FACTORS_UPDATED_EVENT, this.triggerCurrencyFactorsHandler);
    }
    triggerCurrencyFactorsHandler() {
        this.currencyFactorsHandler();
    }
    setCurrencyFactorsHandler(handler) {
        this.currencyFactorsHandler = handler;
    }
    setLogoutHandler(logout) {
        this.logout = logout;
    }
    onKicked() {
        // it would indeed be very weird if logout wasn't ready
        // but we still check
        this.logout && this.logout();
    }
    onError(event) {
        console.error(event.message);
        if (console.table) {
            console.table(event.request);
        }
        else {
            console.error(event.request);
        }
    }
    async setToken(token) {
        // token might be null so we use this flag
        this.hasSetToken = true;
        this.token = token;
        if (this.socket.connected) {
            this.socket.emit(remote_protocol_1.IDENTIFY_REQUEST, {
                uuid: this.uuid,
                token: this.token,
            });
            await this.onIdentificationDone();
            this.isReady = true;
        }
    }
    onBuildnumberListened(build) {
        this.lastRecievedBuildNumber = build.buildnumber;
        if (this.isAppUpdated()) {
            // this will trigger the service worker to realize the app has
            // updated if any service worker is active
            try {
                fetch("/rest/buildnumber?current=" + window.BUILD_NUMBER);
            }
            catch (err) {
                // if it fails the service worker should be able to
                // handle it stills by reloading twice
            }
            // trigger the listeners
            this.appUpdatedListeners.forEach((l) => l());
        }
    }
    getUUID() {
        return this.uuid;
    }
    isOffline() {
        return this.offline;
    }
    addAppUpdatedListener(listener) {
        this.appUpdatedListeners.push(listener);
    }
    removeAppUpdatedListener(listener) {
        const index = this.appUpdatedListeners.indexOf(listener);
        if (index !== -1) {
            this.appUpdatedListeners.splice(index, 1);
        }
    }
    isAppUpdated() {
        return this.lastRecievedBuildNumber !== window.BUILD_NUMBER;
    }
    addConnectStatusListener(listener) {
        this.connectionListeners.push(listener);
    }
    removeConnectStatusListener(listener) {
        const index = this.connectionListeners.indexOf(listener);
        if (index !== -1) {
            this.connectionListeners.splice(index, 1);
        }
    }
    addItemDefinitionListenerFor(parentInstance, itemDefinitionQualifiedPathName, forId, forVersion) {
        const qualifiedIdentifier = itemDefinitionQualifiedPathName + "." + forId + "." + (forVersion || "");
        if (this.listeners[qualifiedIdentifier]) {
            if (!this.listeners[qualifiedIdentifier].parentInstances.includes(parentInstance)) {
                this.listeners[qualifiedIdentifier].parentInstances.push(parentInstance);
            }
            return;
        }
        const request = {
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
    async attachItemDefinitionListenerFor(request) {
        if (this.socket.connected) {
            await this.onIdentificationDone();
            // check if still connected after a possible await
            if (this.socket.connected) {
                this.socket.emit(remote_protocol_1.REGISTER_REQUEST, request);
            }
        }
    }
    async attachOwnedSearchListenerFor(request) {
        if (this.socket.connected) {
            await this.onIdentificationDone();
            // check if still connected after a possible await
            if (this.socket.connected) {
                this.socket.emit(remote_protocol_1.OWNED_SEARCH_REGISTER_REQUEST, request);
            }
        }
    }
    async attachParentedSearchListenerFor(request) {
        if (this.socket.connected) {
            await this.onIdentificationDone();
            // check if still connected after a possible await
            if (this.socket.connected) {
                this.socket.emit(remote_protocol_1.PARENTED_SEARCH_REGISTER_REQUEST, request);
            }
        }
    }
    async requestOwnedSearchFeedbackFor(request) {
        if (this.socket.connected) {
            await this.onIdentificationDone();
            // check if still connected after a possible await
            if (this.socket.connected) {
                this.socket.emit(remote_protocol_1.OWNED_SEARCH_FEEDBACK_REQUEST, request);
            }
        }
    }
    async requestParentedSearchFeedbackFor(request) {
        if (this.socket.connected) {
            await this.onIdentificationDone();
            // check if still connected after a possible await
            if (this.socket.connected) {
                this.socket.emit(remote_protocol_1.PARENTED_SEARCH_FEEDBACK_REQUEST, request);
            }
        }
    }
    addOwnedSearchListenerFor(itemDefinitionOrModuleQualifiedPathName, createdBy, lastKnownRecordDate, callback) {
        const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." + createdBy;
        if (this.ownedSearchListeners[qualifiedIdentifier]) {
            if (!this.ownedSearchListeners[qualifiedIdentifier].callbacks.includes(callback)) {
                this.ownedSearchListeners[qualifiedIdentifier].callbacks.push(callback);
            }
            return;
        }
        const request = {
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
    addParentedSearchListenerFor(itemDefinitionOrModuleQualifiedPathName, parentType, parentId, parentVersion, lastKnownRecordDate, callback) {
        const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." +
            parentType + "." + parentId + "." + (parentVersion || "");
        if (this.parentedSearchListeners[qualifiedIdentifier]) {
            if (!this.parentedSearchListeners[qualifiedIdentifier].callbacks.includes(callback)) {
                this.parentedSearchListeners[qualifiedIdentifier].callbacks.push(callback);
            }
            return;
        }
        const request = {
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
    async requestFeedbackFor(request, immediate) {
        if (immediate) {
            if (this.socket.connected) {
                await this.onIdentificationDone();
                if (this.socket.connected) {
                    this.socket.emit(remote_protocol_1.FEEDBACK_REQUEST, request);
                }
            }
        }
        else if (this.delayedFeedbacks.every((df) => df.itemDefinition !== request.itemDefinition || df.id !== request.id)) {
            this.delayedFeedbacks.push(request);
            setTimeout(this.consumeDelayedFeedbacks.bind(this, request), 70);
        }
    }
    removeItemDefinitionListenerFor(parentInstance, itemDefinitionQualifiedPathName, forId, forVersion) {
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
                    const request = {
                        id: forId,
                        version: forVersion,
                        itemDefinition: itemDefinitionQualifiedPathName,
                    };
                    this.socket.emit(remote_protocol_1.UNREGISTER_REQUEST, request);
                }
            }
            else {
                this.listeners[qualifiedID] = newListenerValue;
            }
        }
    }
    removeOwnedSearchListenerFor(callback, itemDefinitionOrModuleQualifiedPathName, createdBy) {
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
                    const request = {
                        qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
                        createdBy,
                    };
                    this.socket.emit(remote_protocol_1.OWNED_SEARCH_UNREGISTER_REQUEST, request);
                }
            }
            else {
                this.ownedSearchListeners[qualifiedIdentifier] = newListenerValue;
            }
        }
    }
    removeParentedSearchListenerFor(callback, itemDefinitionOrModuleQualifiedPathName, parentType, parentId, parentVersion) {
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
                    const request = {
                        qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
                        parentId,
                        parentType,
                        parentVersion,
                    };
                    this.socket.emit(remote_protocol_1.PARENTED_SEARCH_UNREGISTER_REQUEST, request);
                }
            }
            else {
                this.ownedSearchListeners[qualifiedIdentifier] = newListenerValue;
            }
        }
    }
    onChangeListened(event) {
        const itemDefinition = this.root.registry[event.itemDefinition];
        const appliedGQLValue = itemDefinition.getGQLAppliedValue(event.id, event.version);
        if (appliedGQLValue) {
            if (event.type === "modified" || event.type === "created" ||
                (event.type === "last_modified" &&
                    event.lastModified !== appliedGQLValue.flattenedValue.last_modified)) {
                itemDefinition.triggerListeners("reload", event.id, event.version);
            }
            else if (event.type === "not_found") {
                itemDefinition.cleanValueFor(event.id, event.version);
                if (cache_1.default.isSupported) {
                    cache_1.default.instance.setCachedValueAsNullAndUpdateSearches(event.id, event.version, itemDefinition.getQualifiedPathName(), constants_1.PREFIX_GET + itemDefinition.getQualifiedPathName(), constants_1.PREFIX_SEARCH + itemDefinition.getParentModule().getSearchModule().getQualifiedPathName(), constants_1.PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName());
                }
                itemDefinition.triggerListeners("change", event.id, event.version);
            }
        }
        else if (event.type === "modified" || event.type === "created" || event.type === "last_modified") {
            itemDefinition.triggerListeners("reload", event.id, event.version);
        }
        else if (event.type === "not_found") {
            itemDefinition.cleanValueFor(event.id, event.version);
            if (cache_1.default.isSupported) {
                cache_1.default.instance.setCachedValueAsNullAndUpdateSearches(event.id, event.version, itemDefinition.getQualifiedPathName(), constants_1.PREFIX_GET + itemDefinition.getQualifiedPathName(), constants_1.PREFIX_SEARCH + itemDefinition.getParentModule().getSearchModule().getQualifiedPathName(), constants_1.PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName());
            }
            itemDefinition.triggerListeners("change", event.id, event.version);
        }
    }
    async consumeDelayedFeedbacks(anSpecificRequest) {
        // we wait if not ready
        if (this.socket.connected) {
            await this.onIdentificationDone();
        }
        // the reason we use delayed feedbacks is for efficiency, while we don't
        // use this for owned searches, but sometimes a same feedback would be requested twice
        this.delayedFeedbacks = this.delayedFeedbacks.filter((df) => {
            if (!anSpecificRequest ||
                (anSpecificRequest.id === df.id && anSpecificRequest.itemDefinition === df.itemDefinition)) {
                // and yet we recheck, as we need to be connected even as we emit
                if (this.socket.connected) {
                    this.socket.emit(remote_protocol_1.FEEDBACK_REQUEST, df);
                }
                return false;
            }
            return true;
        });
    }
    onIdentificationDone() {
        if (this.offline) {
            return;
        }
        if (this.isReady) {
            return;
        }
        return new Promise((resolve) => {
            const doneListener = () => {
                this.socket.off(remote_protocol_1.IDENTIFIED_EVENT, doneListener);
                this.socket.off("disconnect", doneListener);
                resolve();
            };
            this.socket.on("disconnect", doneListener);
            this.socket.on(remote_protocol_1.IDENTIFIED_EVENT, doneListener);
        });
    }
    async onConnect() {
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
            this.socket.emit(remote_protocol_1.IDENTIFY_REQUEST, {
                uuid: this.uuid,
                token: this.token,
            });
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
    attachDetacchedRequests() {
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
    async onRecordsAddedToOwnedSearch(event) {
        const ownedListener = this.ownedSearchListeners[event.qualifiedPathName + "." + event.createdBy];
        if (ownedListener) {
            ownedListener.lastKnownRecordDate = event.newLastRecordDate;
            if (cache_1.default.isSupported) {
                const itemDefinitionOrModule = this.root.registry[event.qualifiedPathName];
                let itemDefinition;
                if (itemDefinitionOrModule instanceof ItemDefinition_1.default) {
                    itemDefinition = itemDefinitionOrModule;
                }
                else {
                    itemDefinition = itemDefinitionOrModule.getPropExtensionItemDefinition();
                }
                await cache_1.default.instance.addRecordsToCachedSearch(constants_1.PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName(), event.createdBy, null, null, null, event.newRecords, event.newLastRecordDate, "by-owner");
            }
            ownedListener.callbacks.forEach((c) => c());
        }
    }
    async onRecordsAddedToParentedSearch(event) {
        const parentedListener = this.parentedSearchListeners[event.qualifiedPathName + "." + event.parentType + "." +
            event.parentId + "." + (event.parentVersion || "")];
        if (parentedListener) {
            parentedListener.lastKnownRecordDate = event.newLastRecordDate;
            if (cache_1.default.isSupported) {
                const itemDefinitionOrModule = this.root.registry[event.qualifiedPathName];
                let itemDefinition;
                if (itemDefinitionOrModule instanceof ItemDefinition_1.default) {
                    itemDefinition = itemDefinitionOrModule;
                }
                else {
                    itemDefinition = itemDefinitionOrModule.getPropExtensionItemDefinition();
                }
                await cache_1.default.instance.addRecordsToCachedSearch(constants_1.PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName(), null, event.parentType, event.parentId, event.parentVersion, event.newRecords, event.newLastRecordDate, "by-parent");
            }
            parentedListener.callbacks.forEach((c) => c());
        }
    }
    onDisconnect() {
        this.offline = true;
        this.isReady = false;
        this.connectionListeners.forEach((l) => l());
    }
}
exports.RemoteListener = RemoteListener;
