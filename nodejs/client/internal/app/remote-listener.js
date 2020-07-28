"use strict";
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
class RemoteListener {
    constructor(root) {
        this.delayedFeedbacks = [];
        this.connectionListeners = [];
        this.appUpdatedListeners = [];
        this.uuid = uuid_1.default.v4();
        this.isReconnect = false;
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
            this.listeners[qualifiedIdentifier].parentInstances.push(parentInstance);
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
            if (!this.isReady) {
                await this.onIdentificationDone();
            }
            // check if still connected after a possible await
            if (this.socket.connected) {
                this.socket.emit(remote_protocol_1.REGISTER_REQUEST, request);
            }
        }
    }
    async attachOwnedSearchListenerFor(request) {
        if (this.socket.connected) {
            if (!this.isReady) {
                await this.onIdentificationDone();
            }
            // check if still connected after a possible await
            if (this.socket.connected) {
                this.socket.emit(remote_protocol_1.OWNED_SEARCH_REGISTER_REQUEST, request);
            }
        }
    }
    async attachParentedSearchListenerFor(request) {
        if (this.socket.connected) {
            if (!this.isReady) {
                await this.onIdentificationDone();
            }
            // check if still connected after a possible await
            if (this.socket.connected) {
                this.socket.emit(remote_protocol_1.PARENTED_SEARCH_REGISTER_REQUEST, request);
            }
        }
    }
    async requestOwnedSearchFeedbackFor(request) {
        if (this.socket.connected) {
            if (!this.isReady) {
                await this.onIdentificationDone();
            }
            // check if still connected after a possible await
            if (this.socket.connected) {
                this.socket.emit(remote_protocol_1.OWNED_SEARCH_FEEDBACK_REQUEST, request);
            }
        }
    }
    async requestParentedSearchFeedbackFor(request) {
        if (this.socket.connected) {
            if (!this.isReady) {
                await this.onIdentificationDone();
            }
            // check if still connected after a possible await
            if (this.socket.connected) {
                this.socket.emit(remote_protocol_1.PARENTED_SEARCH_FEEDBACK_REQUEST, request);
            }
        }
    }
    addOwnedSearchListenerFor(itemDefinitionOrModuleQualifiedPathName, createdBy, lastKnownRecordDate, callback) {
        const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." + createdBy;
        if (this.ownedSearchListeners[qualifiedIdentifier]) {
            this.ownedSearchListeners[qualifiedIdentifier].callbacks.push(callback);
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
            this.parentedSearchListeners[qualifiedIdentifier].callbacks.push(callback);
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
                if (!this.isReady) {
                    await this.onIdentificationDone();
                }
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
        if (this.socket.connected && !this.isReady) {
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
        // this prevents the request from triggering on the initial connection
        // as setToken is expected to be called in order to set things to be ready
        // this is more for reconnection purposes
        if (this.isReconnect) {
            this.onReconnect();
        }
        this.connectionListeners.forEach((l) => l());
        // next timethis runs will be considered reconnect
        this.isReconnect = true;
    }
    onReconnect() {
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
        this.triggerCurrencyFactorsHandler();
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
