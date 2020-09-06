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
    /**
     * Instantiates a new remote listener
     * @param root the root we are using for it
     */
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
        /**
         * Whether it's currently offline
         */
        this.offline = true;
        /**
         * whether the identifying token has been set
         */
        this.hasSetToken = false;
        /**
         * The token that has been set
         */
        this.token = null;
        /**
         * Whether it's ready to attach events
         */
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
        this.consumeDelayedFeedbacks = this.consumeDelayedFeedbacks.bind(this);
        this.root = root;
        this.listeners = {};
        this.ownedSearchListeners = {};
        this.parentedSearchListeners = {};
        this.connectionListeners = [];
        this.appUpdatedListeners = [];
        this.lastRecievedBuildNumber = window.BUILD_NUMBER;
        this.setupTime = (new Date()).getTime();
        // setup the io to the client
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
    /**
     * Triggers the currency factor hanlder
     * this function is expected to recheck the currency factors
     * as they might have changed
     */
    triggerCurrencyFactorsHandler() {
        this.currencyFactorsHandler();
    }
    /**
     * Sets the currency factor handling function, this should be
     * done immediately after initialization
     * @param handler the handler itself
     */
    setCurrencyFactorsHandler(handler) {
        this.currencyFactorsHandler = handler;
    }
    /**
     * Sets the logout handler, the logout is triggered
     * if the user has been kicked by a logout all event
     * @param logout the logout handler
     */
    setLogoutHandler(logout) {
        this.logout = logout;
    }
    /**
     * Called when the token changes an allows for
     * identification as well as re-identification
     *
     * Makes the app ready
     *
     * @param token the new token to use
     */
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
    /**
     * Provides the remote listener uuid
     */
    getUUID() {
        return this.uuid;
    }
    /**
     * Specifies whether the remote listener is offline
     * which also defines whether the app itself is offline
     */
    isOffline() {
        return this.offline;
    }
    /**
     * Adds a listener for when the app updates (aka buildnumber mismatch)
     * @param listener the listener to add
     */
    addAppUpdatedListener(listener) {
        this.appUpdatedListeners.push(listener);
    }
    /**
     * Removes a listener for when the app updates (aka buildnumber mismatch)
     * @param listener the listener to remove
     */
    removeAppUpdatedListener(listener) {
        const index = this.appUpdatedListeners.indexOf(listener);
        if (index !== -1) {
            this.appUpdatedListeners.splice(index, 1);
        }
    }
    /**
     * Checks whether the app is uppdated compared to what we are running right now
     */
    isAppUpdated() {
        return this.lastRecievedBuildNumber !== window.BUILD_NUMBER;
    }
    /**
     * Adds a listener for when the app online status changes
     * @param listener the listener to add
     */
    addConnectStatusListener(listener) {
        this.connectionListeners.push(listener);
    }
    /**
     * Removes a listener for when the app online status changes
     * @param listener the listener to remove
     */
    removeConnectStatusListener(listener) {
        const index = this.connectionListeners.indexOf(listener);
        if (index !== -1) {
            this.connectionListeners.splice(index, 1);
        }
    }
    /**
     * Triggers when the current user has been kicked
     * by a logout all event
     */
    onKicked() {
        // it would indeed be very weird if logout wasn't ready
        // but we still check
        this.logout && this.logout();
    }
    /**
     * Triggers when the listener recieves
     * a remote error event
     * @param event the error event
     */
    onError(event) {
        console.error(event.message);
        // we log the request that caused
        // the error
        if (console.table) {
            console.table(event.request);
        }
        else {
            console.error(event.request);
        }
    }
    /**
     * Triggers when receiving the buildnumber event that specifies
     * the buildnumber that the server is running in; this event
     * triggers just on connection, as well as on update
     * @param event the buildnumber event
     */
    onBuildnumberListened(event) {
        this.lastRecievedBuildNumber = event.buildnumber;
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
    /**
     * Adds an item definition listener for when the item definition value changes
     * so that a reload can be called
     * @param parentInstance the parent instance (this will be the item-definition provider that uses it)
     * @param itemDefinitionQualifiedPathName the qualifie path name of the item definition
     * @param forId for which id
     * @param forVersion for which version (null allowed)
     */
    addItemDefinitionListenerFor(parentInstance, itemDefinitionQualifiedPathName, forId, forVersion) {
        // first we build this qualified identifier that will act as key
        const qualifiedIdentifier = itemDefinitionQualifiedPathName + "." + forId + "." + (forVersion || "");
        // now we check if we already have a listener for that
        if (this.listeners[qualifiedIdentifier]) {
            // if we do, then we got to check that we are not re-adding this instance
            if (!this.listeners[qualifiedIdentifier].parentInstances.includes(parentInstance)) {
                // and we add it, just to keep track
                this.listeners[qualifiedIdentifier].parentInstances.push(parentInstance);
            }
            return;
        }
        // now the request
        const request = {
            itemDefinition: itemDefinitionQualifiedPathName,
            id: forId,
            version: forVersion,
        };
        // and the listener that is added for it
        this.listeners[qualifiedIdentifier] = {
            request,
            parentInstances: [parentInstance],
        };
        // and then the event is attached if possible (aka online)
        this.attachItemDefinitionListenerFor(request);
    }
    /**
     * If online will attach an item definition listener for a given
     * item definition using a register request
     * @param request the request to register for
     */
    async attachItemDefinitionListenerFor(request) {
        if (this.socket.connected) {
            await this.onIdentificationDone();
            // check if still connected after a possible await
            if (this.socket.connected) {
                this.socket.emit(remote_protocol_1.REGISTER_REQUEST, request);
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
    removeItemDefinitionListenerFor(parentInstance, itemDefinitionQualifiedPathName, forId, forVersion) {
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
                // and if we are connected
                if (this.socket.connected) {
                    // we can launch the unregister request
                    const request = {
                        id: forId,
                        version: forVersion,
                        itemDefinition: itemDefinitionQualifiedPathName,
                    };
                    this.socket.emit(remote_protocol_1.UNREGISTER_REQUEST, request);
                }
                // ohterwise
            }
            else {
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
    async requestFeedbackFor(request, immediate) {
        // if we have an immediate request
        if (immediate) {
            // we check if we are connected
            if (this.socket.connected) {
                // check our identification
                await this.onIdentificationDone();
                // check if connected again
                if (this.socket.connected) {
                    // and then emit it
                    this.socket.emit(remote_protocol_1.FEEDBACK_REQUEST, request);
                }
            }
            // otherwise we will add to the delayed feedback list
        }
        else if (this.delayedFeedbacks.every((df) => df.itemDefinition !== request.itemDefinition || df.id !== request.id)) {
            this.delayedFeedbacks.push(request);
            setTimeout(this.consumeDelayedFeedbacks, 70);
        }
    }
    /**
     * Consumes the delayed feedbacks that might exist
     */
    async consumeDelayedFeedbacks() {
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
                    this.socket.emit(remote_protocol_1.FEEDBACK_REQUEST, df);
                });
            }
        }
        this.delayedFeedbacks = [];
    }
    /**
     * Adds a listener for an owned search
     * @param itemDefinitionOrModuleQualifiedPathName the item definition or module we are listening for search changes
     * @param createdBy the creator that triggers this
     * @param lastKnownRecordDate the last known record added date
     * @param callback a callback to trigger when the listener matches
     */
    addOwnedSearchListenerFor(itemDefinitionOrModuleQualifiedPathName, createdBy, lastKnownRecordDate, callback) {
        // so we build our qualified identifier as well
        const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." + createdBy;
        // if we have any in our owned search listener list
        if (this.ownedSearchListeners[qualifiedIdentifier]) {
            // and if this callback is not included yet
            // this can actually hit here very often since every time that a search gets called
            // in gql and it has a cache policy, it will attempt to add a listener
            // and the same listener might have already been added before
            if (!this.ownedSearchListeners[qualifiedIdentifier].callbacks.includes(callback)) {
                // so we push the callback
                this.ownedSearchListeners[qualifiedIdentifier].callbacks.push(callback);
            }
            return;
        }
        // we now build the request
        const request = {
            qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
            createdBy,
        };
        this.ownedSearchListeners[qualifiedIdentifier] = {
            request,
            callbacks: [callback],
            lastKnownRecordDate,
        };
        // and attach the owner listener if possible
        this.attachOwnedSearchListenerFor(request);
    }
    /**
     * Attaches if possible the owned search listener for a cached by owner search type
     * @param request the request to use
     */
    async attachOwnedSearchListenerFor(request) {
        if (this.socket.connected) {
            await this.onIdentificationDone();
            // check if still connected after a possible await
            if (this.socket.connected) {
                this.socket.emit(remote_protocol_1.OWNED_SEARCH_REGISTER_REQUEST, request);
            }
        }
    }
    /**
     * Removes an owned search listener
     * @param callback the callback that we are removing for
     * @param itemDefinitionOrModuleQualifiedPathName the item definition or module path name
     * @param createdBy the created by user namespace
     */
    removeOwnedSearchListenerFor(callback, itemDefinitionOrModuleQualifiedPathName, createdBy) {
        // first we build the qualified identifier
        const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." + createdBy;
        // and then check what we got for the listener value
        const listenerValue = this.ownedSearchListeners[qualifiedIdentifier];
        // if we have one
        if (listenerValue) {
            // we remove such callback from the list
            const newListenerValue = {
                ...listenerValue,
                callbacks: listenerValue.callbacks.filter((i) => i !== callback),
            };
            // if we got no callbacks remaining
            if (newListenerValue.callbacks.length === 0) {
                // then we can delete the listener
                delete this.ownedSearchListeners[qualifiedIdentifier];
                // and if we are connected
                if (this.socket.connected) {
                    // we can perform the unregister request
                    const request = {
                        qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
                        createdBy,
                    };
                    this.socket.emit(remote_protocol_1.OWNED_SEARCH_UNREGISTER_REQUEST, request);
                }
                // otherwise
            }
            else {
                // just upate the value
                this.ownedSearchListeners[qualifiedIdentifier] = newListenerValue;
            }
        }
    }
    /**
     * Requests feedback for an owned search, if possible
     * @param request the feedback request
     */
    async requestOwnedSearchFeedbackFor(request) {
        if (this.socket.connected) {
            await this.onIdentificationDone();
            // check if still connected after a possible await
            if (this.socket.connected) {
                this.socket.emit(remote_protocol_1.OWNED_SEARCH_FEEDBACK_REQUEST, request);
            }
        }
    }
    /**
     * Adds a parented search listener for a cached search via parenting
     * @param itemDefinitionOrModuleQualifiedPathName the item definition or module that it refers to
     * @param parentType the parent type (aka it's item definition qualified name)
     * @param parentId the parent id
     * @param parentVersion the parent version (or null)
     * @param lastKnownRecordDate the last known record date this listener knows of its stored values
     * @param callback the callback to trigger for
     */
    addParentedSearchListenerFor(itemDefinitionOrModuleQualifiedPathName, parentType, parentId, parentVersion, lastKnownRecordDate, callback) {
        // so we build the id for the parent type
        const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName + "." +
            parentType + "." + parentId + "." + (parentVersion || "");
        // and we check if we already have some listener registered for it
        if (this.parentedSearchListeners[qualifiedIdentifier]) {
            // if we did, now we need to check if our callback hasn't been added yet,
            // same reason as before, since every time the search is executed it will
            // attempt to add the callback
            if (!this.parentedSearchListeners[qualifiedIdentifier].callbacks.includes(callback)) {
                // and if it's not there we add it
                this.parentedSearchListeners[qualifiedIdentifier].callbacks.push(callback);
            }
            return;
        }
        // we build the request for it
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
        // and attempt to attach it
        this.attachParentedSearchListenerFor(request);
    }
    /**
     * Attaches the parented seach listener if possible
     * as in the app is online
     * @param request the request to attach
     */
    async attachParentedSearchListenerFor(request) {
        if (this.socket.connected) {
            await this.onIdentificationDone();
            // check if still connected after a possible await
            if (this.socket.connected) {
                this.socket.emit(remote_protocol_1.PARENTED_SEARCH_REGISTER_REQUEST, request);
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
    removeParentedSearchListenerFor(callback, itemDefinitionOrModuleQualifiedPathName, parentType, parentId, parentVersion) {
        // first we get the identifier
        const qualifiedIdentifier = itemDefinitionOrModuleQualifiedPathName +
            "." + parentType + "." + parentId + "." + (parentVersion || "");
        // an the listener value
        const listenerValue = this.ownedSearchListeners[qualifiedIdentifier];
        // we ensure we have one already
        if (listenerValue) {
            // and then we remove the callback from it for a new value
            const newListenerValue = {
                ...listenerValue,
                callbacks: listenerValue.callbacks.filter((i) => i !== callback),
            };
            // if then we got no callbacks left
            if (newListenerValue.callbacks.length === 0) {
                // we can delete the listener
                delete this.ownedSearchListeners[qualifiedIdentifier];
                // and if we are connected
                if (this.socket.connected) {
                    // we can unregister the listener
                    const request = {
                        qualifiedPathName: itemDefinitionOrModuleQualifiedPathName,
                        parentId,
                        parentType,
                        parentVersion,
                    };
                    this.socket.emit(remote_protocol_1.PARENTED_SEARCH_UNREGISTER_REQUEST, request);
                }
                // otherwise if there are callbacks left
            }
            else {
                // we just update the value with the new callbacks
                this.ownedSearchListeners[qualifiedIdentifier] = newListenerValue;
            }
        }
    }
    /**
     * Requests feedback for a parented seach, if possible
     * @param request the request to trigger
     */
    async requestParentedSearchFeedbackFor(request) {
        if (this.socket.connected) {
            await this.onIdentificationDone();
            // check if still connected after a possible await
            if (this.socket.connected) {
                this.socket.emit(remote_protocol_1.PARENTED_SEARCH_FEEDBACK_REQUEST, request);
            }
        }
    }
    /**
     * Triggers on a changed or a feedback event
     * @param event the event itself
     */
    onChangeListened(event) {
        // first we need to see what item definition we matched
        const itemDefinition = this.root.registry[event.itemDefinition];
        // and let's get the applied value for it we currently have
        const appliedGQLValue = itemDefinition.getGQLAppliedValue(event.id, event.version);
        // so if we have one
        if (appliedGQLValue) {
            // so if the event is a modified type
            // or a created type or it's a feedback that gives
            // a last modified that doesn't match our applied value
            if (event.type === "modified" || event.type === "created" ||
                (event.type === "last_modified" &&
                    (
                    // our applied value is null, basically we have save and stored
                    // the item as not found
                    !appliedGQLValue.flattenedValue ||
                        // our last modified event differs, means it's newer
                        event.lastModified !== appliedGQLValue.flattenedValue.last_modified))) {
                // we request a reload
                itemDefinition.triggerListeners("reload", event.id, event.version);
                // otherwise it was deleted
            }
            else if (event.type === "not_found") {
                // we clean the value
                itemDefinition.cleanValueFor(event.id, event.version);
                // and if we got a cache worker
                if (cache_1.default.isSupported) {
                    // we do the delete
                    cache_1.default.instance.setCachedValueAsNullAndUpdateSearches(event.id, event.version, itemDefinition.getQualifiedPathName(), constants_1.PREFIX_GET + itemDefinition.getQualifiedPathName(), constants_1.PREFIX_SEARCH + itemDefinition.getParentModule().getSearchModule().getQualifiedPathName(), constants_1.PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName());
                }
                // and trigger the change for it
                itemDefinition.triggerListeners("change", event.id, event.version);
            }
            // otherwise if we don't have one an it's either the modified event
            // for that the thing has been modified, it has been created, or last modified, basically
            // anything but not found
        }
        else if (event.type === "modified" || event.type === "created" || event.type === "last_modified") {
            // we ask fora reload for any possible stray item definition provider around
            itemDefinition.triggerListeners("reload", event.id, event.version);
            // and now for not found
        }
        else if (event.type === "not_found") {
            // we wnat to clean the value
            itemDefinition.cleanValueFor(event.id, event.version);
            // and if we got a cache worker
            if (cache_1.default.isSupported) {
                // we are going to do this to upate such it gets deleted
                // if it exists there
                cache_1.default.instance.setCachedValueAsNullAndUpdateSearches(event.id, event.version, itemDefinition.getQualifiedPathName(), constants_1.PREFIX_GET + itemDefinition.getQualifiedPathName(), constants_1.PREFIX_SEARCH + itemDefinition.getParentModule().getSearchModule().getQualifiedPathName(), constants_1.PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName());
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
    async onRecordsAddedToOwnedSearch(event) {
        // so first we want to get our owned listener for it
        const ownedListener = this.ownedSearchListeners[event.qualifiedPathName + "." + event.createdBy];
        // we still ensure that it exists, even when it should
        if (ownedListener) {
            // so we updated the lastKnownRecordDate
            ownedListener.lastKnownRecordDate = event.newLastRecordDate;
            // and if our cache worker is supported
            if (cache_1.default.isSupported) {
                const itemDefinitionOrModule = this.root.registry[event.qualifiedPathName];
                let itemDefinition;
                if (itemDefinitionOrModule instanceof ItemDefinition_1.default) {
                    itemDefinition = itemDefinitionOrModule;
                }
                else {
                    itemDefinition = itemDefinitionOrModule.getPropExtensionItemDefinition();
                }
                // we are going to request it to add the new records that our event
                // comes loaded with the new records that were added to it
                await cache_1.default.instance.addRecordsToCachedSearch(constants_1.PREFIX_SEARCH + itemDefinition.getSearchModeCounterpart().getQualifiedPathName(), event.createdBy, null, null, null, event.newRecords, event.newLastRecordDate, "by-owner");
            }
            // now we trigger the callbacks that should re-perform the cached
            // search, and since all records should have been added, the new search
            // should show the new results
            ownedListener.callbacks.forEach((c) => c());
        }
    }
    /**
     * Triggers once the server indicates that values have been added to a search
     * result that is cached by parent
     * @param event the parent search records added event
     */
    async onRecordsAddedToParentedSearch(event) {
        // build the listener id
        const parentedListener = this.parentedSearchListeners[event.qualifiedPathName + "." + event.parentType + "." +
            event.parentId + "." + (event.parentVersion || "")];
        // and we still check it if exists
        if (parentedListener) {
            // do the same as in the owned version
            parentedListener.lastKnownRecordDate = event.newLastRecordDate;
            // and equally we try to add these records
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
            // now we trigger the callbacks that should re-perform the cached
            // search, and since all records should have been added, the new search
            // should show the new results
            parentedListener.callbacks.forEach((c) => c());
        }
    }
    /**
     * returns a promise (or immediately) for when the identification
     * process to identify with the websocket is done
     * @returns void or a void promise for when it's done
     */
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
                this.socket.off("disconnect", doneListenerDisconnect);
                resolve();
            };
            const doneListenerDisconnect = () => {
                this.offline = true;
                this.isReady = false;
                this.socket.off(remote_protocol_1.IDENTIFIED_EVENT, doneListener);
                this.socket.off("disconnect", doneListenerDisconnect);
                resolve();
            };
            this.socket.on("disconnect", doneListenerDisconnect);
            this.socket.on(remote_protocol_1.IDENTIFIED_EVENT, doneListener);
        });
    }
    /**
     * Triggers once the websocket connects
     */
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
    /**
     * Reattachs the detached requests
     */
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
    /**
     * Triggers when losing connection
     */
    onDisconnect() {
        this.offline = true;
        this.isReady = false;
        this.connectionListeners.forEach((l) => l());
    }
}
exports.RemoteListener = RemoteListener;
