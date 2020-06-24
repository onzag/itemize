"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const app_1 = require("../internal/app");
const ItemDefinition_1 = require("../../base/Root/Module/ItemDefinition");
const token_provider_1 = require("../internal/providers/token-provider");
const constants_1 = require("../../constants");
const gql_util_1 = require("../../gql-util");
const deep_equal_1 = __importDefault(require("deep-equal"));
const module_1 = require("./module");
const search_mode_1 = require("../../base/Root/Module/ItemDefinition/PropertyDefinition/search-mode");
const cache_1 = __importDefault(require("../internal/workers/cache"));
const uuid_1 = __importDefault(require("uuid"));
const gql_client_util_1 = require("../internal/gql-client-util");
const search_interfaces_1 = require("../../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces");
const config_provider_1 = require("../internal/providers/config-provider");
// THIS IS THE MOST IMPORTANT FILE OF WHOLE ITEMIZE
// HERE IS WHERE THE MAGIC HAPPENS
// TODO this file is too complex, we need to simplify, specially policies they are killing this file
function getPropertyListForSearchMode(properties, standardCounterpart) {
    let result = [];
    properties.forEach((propertyId) => {
        const standardProperty = standardCounterpart.getPropertyDefinitionFor(propertyId, true);
        result = result.concat(search_mode_1.getConversionIds(standardProperty.rawData));
    });
    return result;
}
function getPropertyForSetter(setter, itemDefinition) {
    let actualId = setter.id;
    if (setter.searchVariant) {
        actualId = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes[setter.searchVariant.toUpperCase()] + setter.id;
    }
    if (setter.policyName && setter.policyType) {
        return itemDefinition.getPropertyDefinitionForPolicy(setter.policyType, setter.policyName, actualId);
    }
    return itemDefinition.getPropertyDefinitionFor(actualId, true);
}
// This is the context that will serve it
exports.ItemDefinitionContext = react_1.default.createContext(null);
exports.SearchItemDefinitionValueContext = react_1.default.createContext(null);
/**
 * Here it is, the mighty
 */
class ActualItemDefinitionProvider extends react_1.default.Component {
    constructor(props) {
        super(props);
        // this variable is useful is async tasks like loadValue are still executing after
        // this component has unmounted, which is a memory leak
        this.isUnmounted = false;
        this.lastLoadingForId = null;
        this.lastLoadingForVersion = null;
        // the list of submit block promises
        this.submitBlockPromises = [];
        // Just binding all the functions to ensure their context is defined
        this.onPropertyChange = this.onPropertyChange.bind(this);
        this.onPropertyRestore = this.onPropertyRestore.bind(this);
        this.onPropertyChangeOrRestoreFinal = this.onPropertyChangeOrRestoreFinal.bind(this);
        this.onIncludeSetExclusionState = this.onIncludeSetExclusionState.bind(this);
        this.loadValue = this.loadValue.bind(this);
        this.delete = this.delete.bind(this);
        this.changeListener = this.changeListener.bind(this);
        this.reloadListener = this.reloadListener.bind(this);
        this.submit = this.submit.bind(this);
        this.dismissLoadError = this.dismissLoadError.bind(this);
        this.dismissSubmitError = this.dismissSubmitError.bind(this);
        this.dismissDeleteError = this.dismissSubmitError.bind(this);
        this.onPropertyEnforce = this.onPropertyEnforce.bind(this);
        this.onPropertyClearEnforce = this.onPropertyClearEnforce.bind(this);
        this.dismissSubmitted = this.dismissSubmitted.bind(this);
        this.dismissDeleted = this.dismissDeleted.bind(this);
        this.canEdit = this.canEdit.bind(this);
        this.canCreate = this.canCreate.bind(this);
        this.canDelete = this.canDelete.bind(this);
        this.clean = this.clean.bind(this);
        this.poke = this.poke.bind(this);
        this.unpoke = this.unpoke.bind(this);
        this.search = this.search.bind(this);
        this.dismissSearchError = this.dismissSearchError.bind(this);
        this.dismissSearchResults = this.dismissSearchResults.bind(this);
        this.onSearchReload = this.onSearchReload.bind(this);
        this.injectSubmitBlockPromise = this.injectSubmitBlockPromise.bind(this);
        this.installSetters = this.installSetters.bind(this);
        this.removeSetters = this.removeSetters.bind(this);
        // we get the initial state
        this.state = this.setupInitialState();
        // and if we have a cache, which runs behind a worker
        // won't run in server mode so it's safe
        if (cache_1.default.isSupported) {
            // let's set it up
            // as you can see this function might run several times per instance
            // but that's okay, all next runs get ignored
            cache_1.default.instance.setupVersion(window.BUILD_NUMBER);
        }
    }
    // sometimes when doing some updates when you change the item
    // definition to another item definition (strange but ok)
    // the state between the item and the expected state will
    // not match, so we need to make it be the state of the
    // item definition itself, so we make a check using the qualified name
    static getDerivedStateFromProps(props, state) {
        // it is effective to do it here, so we use the state qualified name and the
        // idef qualified name to check, also the id in question matters to
        // normally we don't want to recalculate states in every render because
        // that is hugely inefficient, it would make the code simpler, but no
        // this needs to run fast, as it's already pretty resource intensive
        if (props.itemDefinitionQualifiedName !== state.itemDefinitionState.itemDefQualifiedName ||
            (props.forId || null) !== (state.itemDefinitionState.forId || null)) {
            // note how we pass the optimization flags
            return {
                state: props.itemDefinitionInstance.getStateNoExternalChecking(props.forId || null, props.forVersion || null, !props.disableExternalChecks, props.itemDefinitionInstance.isInSearchMode() ?
                    getPropertyListForSearchMode(props.properties || [], props.itemDefinitionInstance.getStandardCounterpart()) : props.properties || [], props.includes || [], !props.includePolicies),
            };
        }
        return null;
    }
    setupInitialState() {
        // the value might already be available in memory, this is either because it was loaded
        // by another instance or because of SSR during the initial render
        const memoryLoaded = !!(this.props.forId && this.props.itemDefinitionInstance.hasAppliedValueTo(this.props.forId, this.props.forVersion || null));
        let memoryLoadedAndValid = false;
        if (memoryLoaded) {
            const appliedGQLValue = this.props.itemDefinitionInstance.getGQLAppliedValue(this.props.forId, this.props.forVersion || null);
            // this is the same as for loadValue we are tyring to predict
            const { requestFields } = gql_client_util_1.getFieldsAndArgs({
                includeArgs: false,
                includeFields: true,
                uniteFieldsWithAppliedValue: true,
                includes: this.props.includes || [],
                properties: this.props.properties || [],
                appliedOwner: this.props.assumeOwnership ? this.props.tokenData.id : null,
                userId: this.props.tokenData.id,
                userRole: this.props.tokenData.role,
                itemDefinitionInstance: this.props.itemDefinitionInstance,
                forId: this.props.forId,
                forVersion: this.props.forVersion,
            });
            // this will work even for null values, and null requestFields
            memoryLoadedAndValid = (appliedGQLValue &&
                gql_util_1.requestFieldsAreContained(requestFields, appliedGQLValue.requestFields));
        }
        // so the initial setup
        return {
            // same we get the initial state, without checking it externally and passing
            // all the optimization flags
            itemDefinitionState: this.props.itemDefinitionInstance.getStateNoExternalChecking(this.props.forId || null, this.props.forVersion || null, !this.props.disableExternalChecks, this.props.itemDefinitionInstance.isInSearchMode() ?
                getPropertyListForSearchMode(this.props.properties || [], this.props.itemDefinitionInstance.getStandardCounterpart()) : this.props.properties || [], this.props.includes || [], !this.props.includePolicies),
            // and we pass all this state
            isBlocked: false,
            isBlockedButDataIsAccessible: false,
            notFound: false,
            loadError: null,
            // loading will be true if we are setting up with an id
            // as after mount it will attempt to load such id, in order
            // to avoid pointless refresh we set it up as true from
            // the beggining
            loading: memoryLoadedAndValid ? false : (this.props.avoidLoading ? false : !!this.props.forId),
            loaded: memoryLoadedAndValid,
            submitError: null,
            submitting: false,
            submitted: false,
            deleteError: null,
            deleting: false,
            deleted: false,
            searchError: null,
            searching: false,
            searchResults: null,
            searchRecords: null,
            searchLimit: null,
            searchOffset: null,
            searchCount: null,
            searchId: null,
            searchOwner: null,
            searchParent: null,
            searchShouldCache: false,
            searchFields: null,
            searchRequestedIncludes: [],
            searchRequestedProperties: [],
            pokedElements: {
                properties: [],
                includes: [],
                policies: [],
            },
            canEdit: this.canEdit(),
            canDelete: this.canDelete(),
            canCreate: this.canCreate(),
        };
    }
    injectSubmitBlockPromise(p) {
        this.submitBlockPromises.push(p);
    }
    markForDestruction() {
        if (this.props.forId) {
            const qualifiedName = this.props.itemDefinitionInstance.getQualifiedPathName();
            const forId = this.props.forId;
            const forVersion = this.props.forVersion || null;
            window[constants_1.MEMCACHED_DESTRUCTION_MARKERS_LOCATION] =
                window[constants_1.MEMCACHED_DESTRUCTION_MARKERS_LOCATION] ||
                    JSON.parse(localStorage.getItem(constants_1.DESTRUCTION_MARKERS_LOCATION) || "{}");
            let changed = false;
            if (!window[constants_1.MEMCACHED_DESTRUCTION_MARKERS_LOCATION][qualifiedName]) {
                window[constants_1.MEMCACHED_DESTRUCTION_MARKERS_LOCATION][qualifiedName] = [[forId, forVersion]];
                changed = true;
            }
            else {
                if (!window[constants_1.MEMCACHED_DESTRUCTION_MARKERS_LOCATION][qualifiedName]
                    .find((m) => m[0] === forId && m[1] === forVersion)) {
                    changed = true;
                    window[constants_1.MEMCACHED_DESTRUCTION_MARKERS_LOCATION][qualifiedName].push([forId, forVersion]);
                }
            }
            if (changed) {
                localStorage.setItem(constants_1.DESTRUCTION_MARKERS_LOCATION, JSON.stringify(window[constants_1.MEMCACHED_DESTRUCTION_MARKERS_LOCATION]));
            }
        }
    }
    installSetters(props = this.props) {
        if (props.setters) {
            props.setters.forEach((setter) => {
                const property = getPropertyForSetter(setter, props.itemDefinitionInstance);
                this.onPropertyEnforce(property, setter.value, props.forId, props.forVersion, true);
            });
        }
    }
    removeSetters(props = this.props) {
        if (props.setters) {
            props.setters.forEach((setter) => {
                const property = getPropertyForSetter(setter, props.itemDefinitionInstance);
                this.onPropertyClearEnforce(property, props.forId, props.forVersion, true);
            });
        }
    }
    // so now we have mounted, what do we do at the start
    componentDidMount() {
        // first we setup the listeners, this includes the on change listener that would make
        // the entire app respond to actions, otherwise the fields might as well be disabled
        this.setupListeners();
        this.installSetters();
        // now we retrieve the externally checked value
        if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
            this.setStateToCurrentValueWithExternalChecking(null);
        }
        if (this.props.automaticSearch) {
            this.search(this.props.automaticSearch);
        }
        if (this.props.markForDestructionOnLogout) {
            this.markForDestruction();
        }
        // and we attempt to load the current value
        if (!this.props.avoidLoading) {
            this.loadValue();
        }
    }
    // setup the listeners is simple
    setupListeners() {
        /// first the change listener that checks for every change event that happens with the state
        this.props.itemDefinitionInstance.addListener("change", this.props.forId || null, this.props.forVersion || null, this.changeListener);
        // second are the remote listeners, only when there's an id defined
        if (this.props.forId && !this.props.static) {
            // one is the reload, this gets called when the value of the field has differed from the one that
            // we have gotten (or have cached) this listener is very important for that reason, otherwise our app
            // will get frozen in the past
            this.props.itemDefinitionInstance.addListener("reload", this.props.forId, this.props.forVersion || null, this.reloadListener);
            // note how we used the item definition instance and that's because those events are piped from
            // within this remote listener, the remote listener pipes the events from the websocket
            // and triggers them in within the item definition instance; that's because the server just says what it does
            // it says "this has been deleted" or "this element has changed" or "the last time this element was changed was"
            // so the remote listener job is to check how does it compare to what we have in our application state
            // do the dates match?... do we even have a value for it?... etc... adding remote listeners is heavy
            // as it will send data either via HTTP or websockets
            this.props.remoteListener.addItemDefinitionListenerFor(this, this.props.itemDefinitionInstance.getQualifiedPathName(), this.props.forId, this.props.forVersion || null);
        }
    }
    unSetupListeners() {
        this.removePossibleSearchListeners();
        // here we just remove the listeners that we have setup
        this.props.itemDefinitionInstance.removeListener("change", this.props.forId || null, this.props.forVersion || null, this.changeListener);
        if (this.props.forId && !this.props.static) {
            // remove all the remote listeners
            this.props.itemDefinitionInstance.removeListener("reload", this.props.forId, this.props.forVersion || null, this.reloadListener);
            this.props.remoteListener.removeItemDefinitionListenerFor(this, this.props.itemDefinitionInstance.getQualifiedPathName(), this.props.forId, this.props.forVersion || null);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // so first things first, we want to keep it efficient
        // so let's check if first we updated into something
        // that invalidates the state, refer to the static
        // getDerivedStateFromProps to see how the new state
        // is retrieved
        const updatedIntoSomethingThatInvalidatesTheState = this.props.itemDefinitionInstance !== nextProps.itemDefinitionInstance;
        // we only care about things that affect render, the state
        // all of it if it differs does, the optimization flags
        // children, locale data, and ownership assumption
        return updatedIntoSomethingThatInvalidatesTheState ||
            !deep_equal_1.default(this.state, nextState) ||
            (nextProps.forId || null) !== (this.props.forId || null) ||
            !!nextProps.assumeOwnership !== !!this.props.assumeOwnership ||
            nextProps.children !== this.props.children ||
            nextProps.localeData !== this.props.localeData ||
            nextProps.tokenData.id !== this.props.tokenData.id ||
            nextProps.tokenData.role !== this.props.tokenData.role ||
            nextProps.remoteListener !== this.props.remoteListener ||
            !deep_equal_1.default(nextProps.properties || [], this.props.properties || []) ||
            !deep_equal_1.default(nextProps.includes || [], this.props.includes || []) ||
            !!nextProps.static !== !!this.props.static ||
            !!nextProps.includePolicies !== !!this.props.includePolicies ||
            !deep_equal_1.default(nextProps.automaticSearch, this.props.automaticSearch) ||
            !deep_equal_1.default(nextProps.setters, this.props.setters) ||
            !deep_equal_1.default(nextProps.injectedParentContext, this.props.injectedParentContext);
    }
    async componentDidUpdate(prevProps, prevState) {
        // whether the item definition was updated
        // and changed
        const itemDefinitionWasUpdated = this.props.itemDefinitionInstance !== prevProps.itemDefinitionInstance;
        const uniqueIDChanged = (prevProps.forId || null) !== (this.props.forId || null) ||
            (prevProps.forVersion || null) !== (this.props.forVersion || null);
        const didSomethingThatInvalidatedSetters = !deep_equal_1.default(this.props.setters, prevProps.setters) ||
            uniqueIDChanged ||
            itemDefinitionWasUpdated;
        // if the mark for destruction has changed in a meaningful way
        // we recheck it
        if (this.props.markForDestructionOnLogout &&
            (itemDefinitionWasUpdated ||
                uniqueIDChanged)) {
            this.markForDestruction();
        }
        if (didSomethingThatInvalidatedSetters) {
            this.removeSetters(prevProps);
            this.installSetters();
        }
        // now if the id changed, the optimization flags changed, or the item definition
        // itself changed
        if (itemDefinitionWasUpdated ||
            uniqueIDChanged ||
            didSomethingThatInvalidatedSetters ||
            !deep_equal_1.default(prevProps.properties || [], this.props.properties || []) ||
            !deep_equal_1.default(prevProps.includes || [], this.props.includes || []) ||
            !!prevProps.static !== !!this.props.static ||
            !!prevProps.includePolicies !== !!this.props.includePolicies) {
            // now we have to check on whether the current state is static
            // or not
            const isStatic = this.props.static;
            // compared to the previous
            const wasStatic = prevProps.static;
            // if it's now static and it was not static before, we got to remove
            // the remote listeners, note that listeners are only added with an id
            // so we check for that as well
            let alreadyRemovedRemoteListeners = false;
            let alreadyAddedRemoteListeners = false;
            if (isStatic && !wasStatic && prevProps.forId) {
                // we mark the flag as true
                alreadyRemovedRemoteListeners = true;
                // and remove the listeners
                prevProps.itemDefinitionInstance.removeListener("reload", prevProps.forId, prevProps.forVersion, this.reloadListener);
                prevProps.remoteListener.removeItemDefinitionListenerFor(this, prevProps.itemDefinitionInstance.getQualifiedPathName(), prevProps.forId, prevProps.forVersion || null);
            }
            else if (!isStatic && wasStatic && this.props.forId) {
                alreadyAddedRemoteListeners = true;
                this.props.itemDefinitionInstance.addListener("reload", this.props.forId, this.props.forVersion, this.reloadListener);
                this.props.remoteListener.addItemDefinitionListenerFor(this, this.props.itemDefinitionInstance.getQualifiedPathName(), this.props.forId, this.props.forVersion || null);
            }
            // if this was an item definition or id update
            if (itemDefinitionWasUpdated ||
                uniqueIDChanged) {
                // we need to remove the old listeners
                prevProps.itemDefinitionInstance.removeListener("change", prevProps.forId || null, prevProps.forVersion || null, this.changeListener);
                // we only remove this listeners if we haven't done it before for other reasons
                if (prevProps.forId && !wasStatic && !alreadyRemovedRemoteListeners) {
                    prevProps.itemDefinitionInstance.removeListener("reload", prevProps.forId, prevProps.forVersion || null, this.reloadListener);
                    prevProps.remoteListener.removeItemDefinitionListenerFor(this, prevProps.itemDefinitionInstance.getQualifiedPathName(), prevProps.forId, prevProps.forVersion || null);
                }
                // add the new listeners
                this.props.itemDefinitionInstance.addListener("change", this.props.forId || null, this.props.forVersion || null, this.changeListener);
                if (this.props.forId && !isStatic && !alreadyAddedRemoteListeners) {
                    this.props.itemDefinitionInstance.addListener("reload", this.props.forId, this.props.forVersion || null, this.reloadListener);
                    this.props.remoteListener.addItemDefinitionListenerFor(this, this.props.itemDefinitionInstance.getQualifiedPathName(), this.props.forId, this.props.forVersion || null);
                }
            }
            // we set the value given we have changed the forId with the new optimization flags
            if (!this.isUnmounted) {
                this.setState({
                    itemDefinitionState: this.props.itemDefinitionInstance.getStateNoExternalChecking(this.props.forId || null, this.props.forVersion || null, !this.props.disableExternalChecks, this.props.itemDefinitionInstance.isInSearchMode() ?
                        getPropertyListForSearchMode(this.props.properties || [], this.props.itemDefinitionInstance.getStandardCounterpart()) : this.props.properties || [], this.props.includes || [], !this.props.includePolicies),
                });
            }
            // and run the external check
            if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
                this.setStateToCurrentValueWithExternalChecking(null);
            }
        }
        // if the id has changed or the item defintion was changed
        // or the role, which affects how things are fetch or the ownership
        // assumption, we need to reload the values if it's so necessary
        if ((prevProps.forId || null) !== (this.props.forId || null) ||
            (prevProps.forVersion || null) !== (this.props.forVersion || null) ||
            prevProps.tokenData.id !== this.props.tokenData.id ||
            prevProps.tokenData.role !== this.props.tokenData.role ||
            prevProps.assumeOwnership !== this.props.assumeOwnership ||
            itemDefinitionWasUpdated) {
            if (!this.props.avoidLoading) {
                await this.loadValue();
            }
            // the rules on whether you can create, edit or delete change
            // depending on these variables, so we recalculate them
            if (!this.isUnmounted) {
                this.setState({
                    canEdit: this.canEdit(),
                    canDelete: this.canDelete(),
                    canCreate: this.canCreate(),
                });
            }
        }
        if (!deep_equal_1.default(this.props.automaticSearch, prevProps.automaticSearch) ||
            // these two would cause search results to be dismissed because
            // the fact the token is a key part of the search itself so we would
            // dismiss the search in such a case as the token is different
            // that or the automatic search would be reexecuted
            itemDefinitionWasUpdated ||
            didSomethingThatInvalidatedSetters ||
            prevProps.tokenData.token !== this.props.tokenData.token) {
            // we might have a listener in an old item definition
            // so we need to get rid of it
            if (itemDefinitionWasUpdated) {
                this.removePossibleSearchListeners(prevProps, prevState);
            }
            if (this.props.automaticSearch) {
                this.search(this.props.automaticSearch);
            }
            else {
                this.dismissSearchResults();
            }
        }
    }
    reloadListener() {
        console.log("reload requested for", this.props.itemDefinitionInstance.getQualifiedPathName(), this.props.forId);
        // well this is very simple the app requested a reload
        // because it says that whatever we have in memory is not valid
        // whether it is in the cache or not, so we call it as so, and deny the cache
        // passing true
        if (!this.props.avoidLoading) {
            this.loadValue(true);
        }
    }
    changeListener() {
        if (this.isUnmounted) {
            return;
        }
        // we basically just upgrade the state
        this.setState({
            itemDefinitionState: this.props.itemDefinitionInstance.getStateNoExternalChecking(this.props.forId || null, this.props.forVersion || null, !this.props.disableExternalChecks, this.props.itemDefinitionInstance.isInSearchMode() ?
                getPropertyListForSearchMode(this.props.properties || [], this.props.itemDefinitionInstance.getStandardCounterpart()) : this.props.properties || [], this.props.includes || [], !this.props.includePolicies),
            // we do this because eg. the search relies on triggering the change listener
            // no notify that things aren't loading anymore
            loading: false,
            // also search might do this, and it's true anyway
            notFound: 
            // an id is required for this to be true
            this.props.forId ? !this.props.itemDefinitionInstance.hasAppliedValueTo(this.props.forId || null, this.props.forVersion || null) : false,
        });
    }
    async loadValue(denyCache) {
        const forId = this.props.forId;
        const forVersion = this.props.forVersion || null;
        this.lastLoadingForId = forId;
        this.lastLoadingForVersion = forVersion;
        // we don't use loading here because there's one big issue
        // elements are assumed into the loading state by the constructor
        // if they have an id
        if (!forId) {
            if ((this.state.loading || this.state.loaded || this.state.loadError) && !this.isUnmounted) {
                this.setState({
                    loadError: null,
                    loaded: false,
                    isBlocked: false,
                    isBlockedButDataIsAccessible: false,
                    notFound: false,
                    loading: false,
                });
            }
            return null;
        }
        // We get the request fields that we are going to use
        // in order to load the value, we use the optimizers
        // so as to request only what is necessary for it to be populated
        // there is however one thing, different optimizers might have been
        // used accross the application, and two components with different
        // optimizations might have been used at the same time for the
        // same id
        const { requestFields } = gql_client_util_1.getFieldsAndArgs({
            includeArgs: false,
            includeFields: true,
            uniteFieldsWithAppliedValue: true,
            includes: this.props.includes || [],
            properties: this.props.properties || [],
            appliedOwner: this.props.assumeOwnership ? this.props.tokenData.id : null,
            userId: this.props.tokenData.id,
            userRole: this.props.tokenData.role,
            itemDefinitionInstance: this.props.itemDefinitionInstance,
            forId: forId,
            forVersion: forVersion,
        });
        if (!denyCache) {
            // Prevent loading at all if value currently available and memoryCached
            const appliedGQLValue = this.props.itemDefinitionInstance.getGQLAppliedValue(forId, forVersion);
            if (appliedGQLValue &&
                gql_util_1.requestFieldsAreContained(requestFields, appliedGQLValue.requestFields)) {
                const completedValue = this.loadValueCompleted({
                    value: appliedGQLValue.rawValue,
                    error: null,
                    forId,
                    forVersion,
                });
                if (this.props.static !== "TOTAL") {
                    this.props.remoteListener.requestFeedbackFor({
                        itemDefinition: this.props.itemDefinitionInstance.getQualifiedPathName(),
                        id: forId,
                        version: forVersion || null,
                    });
                }
                // in some situations the value can be in memory but not yet permanently cached
                // (eg. when there is a search context)
                // and another item without a search context attempts to load the value this will
                // make it so that when we are exiting the search context it caches
                if (cache_1.default.isSupported &&
                    this.props.longTermCaching) {
                    const qualifiedName = this.props.itemDefinitionInstance.getQualifiedPathName();
                    if (appliedGQLValue.rawValue) {
                        cache_1.default.instance.mergeCachedValue(constants_1.PREFIX_GET + qualifiedName, forId, forVersion || null, appliedGQLValue.rawValue, appliedGQLValue.requestFields);
                    }
                    else {
                        cache_1.default.instance.setCachedValueAsNullAndUpdateSearches(forId, forVersion || null, qualifiedName, constants_1.PREFIX_GET + qualifiedName, constants_1.PREFIX_SEARCH + this.props.itemDefinitionInstance.getParentModule().getSearchModule().getQualifiedPathName(), constants_1.PREFIX_SEARCH + this.props.itemDefinitionInstance.getSearchModeCounterpart().getQualifiedPathName());
                    }
                }
                return completedValue;
            }
        }
        // the loading state is launched here, however
        // the loading is removed by the listener not by
        // this same function, to be efficient, we could remove
        // it via this function but doing it in the listener
        // who listens for change is better, items are clearly
        // not loading if the listener has detected a change in them
        // you might wonder why in the loader and not in the waiter
        // well it's because the waiter might only executes for the active
        // instance
        if (!this.state.loading && !this.isUnmounted) {
            this.setState({
                loading: true,
                loaded: false,
            });
        }
        else if (!this.isUnmounted) {
            this.setState({
                loaded: false,
            });
        }
        // the reason why we use deny cache here is simple
        // the search context is a form of a memory cache, it might be loading
        // still when for some reason it was asked to reload, I can think of a extreme case
        // when the client loads from memory, a reload is requested, but the search conxtext hasn't
        // released yet the value
        if (!denyCache &&
            this.props.searchContext &&
            this.props.searchContext.currentlySearching.find((s) => s.id === forId &&
                s.version === forVersion &&
                s.type === this.props.itemDefinitionInstance.getQualifiedPathName()) &&
            gql_util_1.requestFieldsAreContained(requestFields, this.props.searchContext.searchFields)) {
            return null;
        }
        const tokenDataId = this.props.tokenData.id;
        const tokenDataRole = this.props.tokenData.role;
        const containsExternallyCheckedProperty = this.props.containsExternallyCheckedProperty;
        const qualifiedPathName = this.props.itemDefinitionInstance.getQualifiedPathName();
        // remember that this waiter only runs on the first instance
        // that managed to get the memo, it waits for all the other instances
        // and then runs this query
        const { error, value, cached, getQueryFields, } = await gql_client_util_1.runGetQueryFor({
            args: {},
            fields: requestFields,
            returnMemoryCachedValues: false,
            returnWorkerCachedValues: !denyCache,
            itemDefinition: this.props.itemDefinitionInstance,
            id: forId,
            version: forVersion,
            token: this.props.tokenData.token,
            language: this.props.localeData.language,
            cacheStore: this.props.longTermCaching,
        });
        if (!error) {
            // we apply the value, whatever we have gotten this will affect all the instances
            // that use the same value, note that value can be null
            this.props.itemDefinitionInstance.applyValue(forId, forVersion, value, false, tokenDataId, tokenDataRole, getQueryFields, true);
            // and then we trigger the change listener for all the instances
            this.props.itemDefinitionInstance.triggerListeners("change", forId, forVersion);
            // and if we have an externally checked property we do the external check
            // we need to ensure that our current item definition instance hasn't changed
            // its for id and for version while we were loading
            if (containsExternallyCheckedProperty &&
                !this.props.disableExternalChecks &&
                forId === this.lastLoadingForId &&
                forVersion === this.lastLoadingForVersion) {
                this.setStateToCurrentValueWithExternalChecking(null);
            }
        }
        // if the item has been cached, as in returned from the indexed db database
        // rather than the server, we don't know if it's actually the current value
        // so we request feedback from the listener, the listener will kick a reload
        // event if it finds a mismatch which will cause this function to run again (see above)
        // but the denyCache flag will be active, ensuring the value will be requested
        // from the server
        if (cached && this.props.static !== "TOTAL") {
            this.props.remoteListener.requestFeedbackFor({
                itemDefinition: qualifiedPathName,
                id: forId,
                version: forVersion,
            });
        }
        return this.loadValueCompleted({
            value,
            error,
            forId,
            forVersion,
        });
    }
    loadValueCompleted(value) {
        // basically if it's unmounted, or what we were updating for does not match
        // what we are supposed to be updating for, this basically means load value got called once
        // again before the previous value managed to load, this can happen, when switching forId and/or
        // for version very rapidly
        const shouldNotUpdateState = this.isUnmounted ||
            value.forId !== this.lastLoadingForId ||
            value.forVersion !== this.lastLoadingForVersion;
        // return immediately
        if (shouldNotUpdateState) {
            return {
                value: value.value,
                error: value.error,
            };
        }
        // so once everything has been completed this function actually runs per instance
        if (value.error) {
            // if we got an error we basically have no value
            this.setState({
                // set the load error and all the logical states, we are not loading
                // anymore
                loadError: value.error,
                loaded: false,
                isBlocked: false,
                isBlockedButDataIsAccessible: false,
                notFound: false,
                loading: false,
            });
            // otherwise if there's no value, it means the item is not found
        }
        else if (!value.value) {
            // we mark it as so, it is not found
            this.setState({
                loadError: null,
                notFound: true,
                isBlocked: false,
                isBlockedButDataIsAccessible: false,
                loading: false,
                loaded: true,
            });
        }
        else if (value.value) {
            // otherwise if we have a value, we check all these options
            this.setState({
                loadError: null,
                notFound: false,
                isBlocked: !!value.value.blocked_at,
                isBlockedButDataIsAccessible: value.value.blocked_at ? !!value.value.DATA : false,
                loading: false,
                loaded: true,
            });
        }
        // now we return
        return {
            value: value.value,
            error: value.error,
        };
    }
    async setStateToCurrentValueWithExternalChecking(currentUpdateId) {
        // so when we want to externally check we first run the external check
        // using the normal get state function which runs async
        const newItemDefinitionState = await this.props.itemDefinitionInstance.getState(this.props.forId || null, this.props.forVersion || null, this.props.itemDefinitionInstance.isInSearchMode() ?
            getPropertyListForSearchMode(this.props.properties || [], this.props.itemDefinitionInstance.getStandardCounterpart()) : this.props.properties || [], this.props.includes || [], !this.props.includePolicies);
        // if the current update id is null (as in always update) or the last update id
        // that was requested is the same as the current (this is important in order)
        // to avoid situations where two external checks have been requested for some
        // reason only the last should be applied
        if (currentUpdateId === null || this.lastUpdateId === currentUpdateId) {
            // we set the state to the new state
            if (!this.isUnmounted) {
                this.setState({
                    itemDefinitionState: newItemDefinitionState,
                });
            }
            // and trigger change listeners, all but our listener
            // we still need to trigger all other listeners
            this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId || null, this.props.forVersion || null, this.changeListener);
        }
    }
    onPropertyChangeOrRestoreFinal() {
        // trigger the listeners for change so everything updates nicely
        this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId || null, this.props.forVersion || null);
        if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
            // so we build an id for this change, for that we simply use
            // the date
            const currentUpdateId = (new Date()).getTime();
            // this change was identified by this id
            this.lastUpdateId = currentUpdateId;
            // we clear any previous timeout to check external properties
            clearTimeout(this.updateTimeout);
            // and now we build a new timeout to check external properties, which such id
            // if in 600ms the user stops doing anything, the externally checked property
            // will triger and an external check will launch
            this.updateTimeout = setTimeout(this.setStateToCurrentValueWithExternalChecking.bind(this, currentUpdateId), 600);
        }
        if (this.props.automaticSearch) {
            this.search(this.props.automaticSearch);
        }
    }
    onPropertyRestore(property) {
        if (this.state.loading) {
            return;
        }
        property.restoreValueFor(this.props.forId || null, this.props.forVersion || null);
        this.onPropertyChangeOrRestoreFinal();
    }
    onPropertyChange(property, value, internalValue) {
        if (this.state.loading) {
            // we will deny any change that happens
            // if the item is loading, as everything
            // will be removed anyway
            return;
        }
        // we simply set the current value in the property
        property.setCurrentValue(this.props.forId || null, this.props.forVersion || null, value, internalValue);
        this.onPropertyChangeOrRestoreFinal();
    }
    onPropertyEnforce(property, value, givenForId, givenForVersion, internal) {
        // this function is basically run by the setter
        // since they might be out of sync that's why the id is passed
        // the setter enforces values
        property.setSuperEnforced(givenForId || null, givenForVersion || null, value);
        this.props.itemDefinitionInstance.triggerListeners("change", givenForId || null, givenForVersion || null, internal ? null : this.changeListener);
        if (!internal && this.props.automaticSearch) {
            this.search(this.props.automaticSearch);
        }
    }
    onPropertyClearEnforce(property, givenForId, givenForVersion, internal) {
        // same but removes the enforcement
        property.clearSuperEnforced(givenForId || null, givenForVersion || null);
        this.props.itemDefinitionInstance.triggerListeners("change", givenForId || null, givenForVersion || null, internal ? null : this.changeListener);
    }
    componentWillUnmount() {
        this.isUnmounted = true;
        this.unSetupListeners();
        // when unmounting we check our optimization flags to see
        // if we are expecting to clean up the memory cache
        if (this.props.cleanOnDismount) {
            if (typeof this.props.cleanOnDismount === "boolean") {
                this.props.itemDefinitionInstance.cleanValueFor(this.props.forId || null, this.props.forVersion || null);
                // this will affect other instances that didn't dismount
                this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId || null, this.props.forVersion || null);
            }
            else {
                this.clean(this.props.cleanOnDismount, "success", false);
            }
        }
    }
    onIncludeSetExclusionState(include, state) {
        // just sets the exclusion state
        include.setExclusionState(this.props.forId || null, this.props.forVersion || null, state);
        this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId || null, this.props.forVersion || null);
        // note how externally checked properties might be affected for this
        if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
            const currentUpdateId = (new Date()).getTime();
            this.lastUpdateId = currentUpdateId;
            clearTimeout(this.updateTimeout);
            this.updateTimeout = setTimeout(this.setStateToCurrentValueWithExternalChecking.bind(this, currentUpdateId), 600);
        }
    }
    checkItemDefinitionStateValidity(options) {
        // let's make this variable to check on whether things are invalid or not
        // first we check every property, that is included and allowed we use some
        // and return whether it's invalid
        const allIncludedPropertiesValid = options.properties.every((pId) => {
            // first lets try to get the state for the current state if any
            let p = this.state.itemDefinitionState.properties.find((p) => p.propertyId === pId);
            // in some situations, say when we try to manually submit a property this property might not be avaliable
            // in the state but yet still exist within the item definition itself
            if (!p) {
                p = this.props.itemDefinitionInstance.getPropertyDefinitionFor(pId, true)
                    .getStateNoExternalChecking(this.props.forId || null, this.props.forVersion || null, true);
            }
            // now we check if we have the option to only include those that differ
            // from the applied value
            if (options.onlyIncludeIfDiffersFromAppliedValue) {
                // we get the current applied value, if any
                const currentAppliedValue = this.props.itemDefinitionInstance.getGQLAppliedValue(this.props.forId || null, this.props.forVersion || null);
                // if there is an applied value for that property
                if (currentAppliedValue && typeof currentAppliedValue.flattenedValue[p.propertyId] !== "undefined") {
                    // let's check if it's differ from what we have in the state
                    const doesNotDifferFromAppliedValue = deep_equal_1.default(currentAppliedValue.flattenedValue[p.propertyId], p.value);
                    // if it does not differ, then it's false as it won't be included
                    if (doesNotDifferFromAppliedValue) {
                        return true;
                    }
                    else {
                        // otherwise it really depends
                        return p.valid;
                    }
                }
                else {
                    // otherwise if there's no applied value we consider
                    // the applied value to be null
                    const doesNotDifferFromAppliedValue = p.value === null;
                    if (doesNotDifferFromAppliedValue) {
                        return true;
                    }
                    else {
                        return p.valid;
                    }
                }
            }
            return p.valid;
        });
        if (!allIncludedPropertiesValid) {
            return false;
        }
        const allIncludedIncludesAreValid = !options.includes ? true : options.includes.every((iId) => {
            const i = this.state.itemDefinitionState.includes.find((i) => i.includeId === iId);
            // and now we get the sinking property ids
            const include = this.props.itemDefinitionInstance.getIncludeFor(i.includeId);
            const sinkingPropertyIds = include.getSinkingPropertiesIds();
            // and we extract the state only if it's a sinking property
            return i.itemDefinitionState.properties.every((p) => {
                if (!sinkingPropertyIds.includes(p.propertyId)) {
                    return true;
                }
                // now we check if we have the option to only include those that differ
                // from the applied value
                if (options.onlyIncludeIfDiffersFromAppliedValue) {
                    // we get the current applied value, if any
                    const currentAppliedValue = this.props.itemDefinitionInstance.getGQLAppliedValue(this.props.forId || null, this.props.forVersion || null);
                    // if there is an applied value for that property
                    if (currentAppliedValue && currentAppliedValue.flattenedValue[include.getQualifiedIdentifier()]) {
                        const includeAppliedValue = currentAppliedValue.flattenedValue[include.getQualifiedIdentifier()];
                        if (typeof includeAppliedValue[p.propertyId] !== "undefined") {
                            // let's check if it's differ from what we have in the state
                            const doesNotDifferFromAppliedValue = deep_equal_1.default(includeAppliedValue[p.propertyId], p.value);
                            // so if it does differ from applied value
                            if (!doesNotDifferFromAppliedValue) {
                                return true;
                            }
                        }
                    }
                }
                return p.valid;
            });
        });
        if (!allIncludedIncludesAreValid) {
            return false;
        }
        if (!options.policies) {
            return true;
        }
        return options.policies.every((pKeys) => {
            const [policyType, policyName, propertyId] = pKeys;
            const propertyInPolicy = this.state.itemDefinitionState.policies[policyType][policyName]
                .find((p) => p.propertyId === propertyId);
            return propertyInPolicy.valid;
        });
    }
    giveEmulatedInvalidError(stateApplied, withId, withSearchResults) {
        const emulatedError = {
            message: "Submit refused due to invalid information in form fields",
            code: constants_1.ENDPOINT_ERRORS.INVALID_DATA_SUBMIT_REFUSED,
        };
        if (!this.isUnmounted) {
            this.setState({
                [stateApplied]: emulatedError,
            });
        }
        if (withId) {
            return {
                id: null,
                error: emulatedError,
            };
        }
        else if (withSearchResults) {
            return {
                results: null,
                records: null,
                limit: null,
                offset: null,
                count: null,
                error: emulatedError,
            };
        }
        else {
            return {
                value: null,
                error: emulatedError,
            };
        }
    }
    async delete(options = {}) {
        if (this.state.deleting || this.props.forId === null) {
            return null;
        }
        const isValid = this.checkItemDefinitionStateValidity({
            properties: [],
            ...options,
        });
        if (!isValid) {
            // if it's not poked already, let's poke it
            if (!this.isUnmounted) {
                this.setState({
                    pokedElements: {
                        properties: [],
                        includes: [],
                        policies: options.policies || [],
                    },
                });
            }
            this.clean(options, "fail");
            return this.giveEmulatedInvalidError("deleteError", false, false);
        }
        if (options.beforeDelete && !options.beforeDelete()) {
            return null;
        }
        const { argumentsForQuery, } = gql_client_util_1.getFieldsAndArgs({
            includeArgs: false,
            includeFields: true,
            uniteFieldsWithAppliedValue: true,
            includesForArgs: [],
            propertiesForArgs: [],
            policiesForArgs: options.policies || [],
            appliedOwner: this.props.assumeOwnership ? this.props.tokenData.id : null,
            userId: this.props.tokenData.id,
            userRole: this.props.tokenData.role,
            itemDefinitionInstance: this.props.itemDefinitionInstance,
            forId: this.props.forId,
            forVersion: this.props.forVersion || null,
        });
        if (!this.isUnmounted) {
            this.setState({
                deleting: true,
            });
        }
        const { error, } = await gql_client_util_1.runDeleteQueryFor({
            args: argumentsForQuery,
            itemDefinition: this.props.itemDefinitionInstance,
            id: this.props.forId,
            version: this.props.forVersion || null,
            token: this.props.tokenData.token,
            language: this.props.localeData.language,
            listenerUUID: this.props.remoteListener.getUUID(),
            cacheStore: this.props.longTermCaching,
        });
        if (error) {
            if (!this.isUnmounted) {
                this.setState({
                    deleteError: error,
                    deleting: false,
                    deleted: false,
                    pokedElements: {
                        properties: [],
                        includes: [],
                        policies: options.policies || [],
                    },
                });
            }
            this.clean(options, "success");
        }
        else {
            this.props.itemDefinitionInstance.cleanValueFor(this.props.forId, this.props.forVersion || null);
            if (!this.isUnmounted) {
                this.setState({
                    deleteError: null,
                    deleting: false,
                    deleted: true,
                    notFound: true,
                    pokedElements: {
                        properties: [],
                        includes: [],
                        policies: (options.policies || []),
                    },
                });
            }
            this.clean(options, "fail");
            this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId, this.props.forVersion || null);
        }
        return {
            error,
        };
    }
    clean(options, state, avoidTriggeringUpdate) {
        if (!this.isUnmounted) {
            if (options.unpokeAfterAny ||
                options.unpokeAfterFailure && state === "fail" ||
                options.unpokeAfterSuccess && state === "success") {
                this.setState({
                    pokedElements: {
                        properties: [],
                        includes: [],
                        policies: [],
                    }
                });
            }
        }
        let needsUpdate = false;
        // CLEANING PROPERTIES
        const cleanupPropertyFn = (ptc) => {
            this.props.itemDefinitionInstance
                .getPropertyDefinitionFor(ptc, true).cleanValueFor(this.props.forId, this.props.forVersion || null);
        };
        if (options.propertiesToCleanOnSuccess && state === "success") {
            options.propertiesToCleanOnSuccess.forEach(cleanupPropertyFn);
            needsUpdate = true;
        }
        if (options.propertiesToCleanOnAny) {
            options.propertiesToCleanOnAny.forEach(cleanupPropertyFn);
            needsUpdate = true;
        }
        if (options.propertiesToCleanOnFailure && state === "fail") {
            options.propertiesToCleanOnFailure.forEach(cleanupPropertyFn);
            needsUpdate = true;
        }
        // RESTORING PROPERTIES
        const restorePropertyFn = (ptr) => {
            this.props.itemDefinitionInstance
                .getPropertyDefinitionFor(ptr, true).restoreValueFor(this.props.forId, this.props.forVersion || null);
        };
        if (options.propertiesToRestoreOnSuccess && state === "success") {
            options.propertiesToRestoreOnSuccess.forEach(restorePropertyFn);
            needsUpdate = true;
        }
        if (options.propertiesToRestoreOnAny) {
            options.propertiesToRestoreOnAny.forEach(restorePropertyFn);
            needsUpdate = true;
        }
        if (options.propertiesToRestoreOnFailure && state === "fail") {
            options.propertiesToRestoreOnFailure.forEach(restorePropertyFn);
            needsUpdate = true;
        }
        // CLEANING INCLUDES
        const cleanupIncludeFn = (itc) => {
            this.props.itemDefinitionInstance.getIncludeFor(itc).cleanValueFor(this.props.forId, this.props.forVersion || null);
        };
        if (options.includesToCleanOnSuccess && state === "success") {
            options.includesToCleanOnSuccess.forEach(cleanupIncludeFn);
            needsUpdate = true;
        }
        if (options.includesToCleanOnAny) {
            options.includesToCleanOnAny.forEach(cleanupIncludeFn);
            needsUpdate = true;
        }
        if (options.includesToCleanOnFailure && state === "fail") {
            options.includesToCleanOnFailure.forEach(cleanupPropertyFn);
            needsUpdate = true;
        }
        // RESTORING INCLUDES
        const restoreIncludeFn = (itr) => {
            this.props.itemDefinitionInstance
                .getIncludeFor(itr).restoreValueFor(this.props.forId, this.props.forVersion || null);
        };
        if (options.includesToRestoreOnSuccess && state === "success") {
            options.includesToRestoreOnSuccess.forEach(restoreIncludeFn);
            needsUpdate = true;
        }
        if (options.includesToRestoreOnAny) {
            options.includesToRestoreOnAny.forEach(restoreIncludeFn);
            needsUpdate = true;
        }
        if (options.includesToRestoreOnFailure && state === "fail") {
            options.includesToRestoreOnFailure.forEach(restoreIncludeFn);
            needsUpdate = true;
        }
        // CLEANING POLICIES, POLICIES CAN'T BE RESTORED
        const cleanupPolicyFn = (policyArray) => {
            this.props.itemDefinitionInstance
                .getPropertyDefinitionForPolicy(...policyArray).cleanValueFor(this.props.forId, this.props.forVersion || null);
        };
        if (options.policiesToCleanOnSuccess && state === "success") {
            options.policiesToCleanOnSuccess.forEach(cleanupPolicyFn);
            needsUpdate = true;
        }
        if (options.policiesToCleanOnAny) {
            options.policiesToCleanOnAny.forEach(cleanupPolicyFn);
            needsUpdate = true;
        }
        if (options.policiesToCleanOnFailure && state === "fail") {
            options.policiesToCleanOnFailure.forEach(cleanupPolicyFn);
            needsUpdate = true;
        }
        // NOw we check if we need an update in the listeners and if we are allowed to trigger it
        if (needsUpdate && !avoidTriggeringUpdate) {
            this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId, this.props.forVersion || null);
        }
    }
    async submit(options) {
        // if we are already submitting, we reject the action
        // also while loading as we cannot know if it's a edit or add action
        if (this.state.submitting || this.state.loading) {
            return null;
        }
        const isValid = this.checkItemDefinitionStateValidity(options);
        const pokedElements = {
            properties: options.properties,
            includes: options.includes || [],
            policies: options.policies || [],
        };
        // if it's invalid let's return the emulated error
        if (!isValid) {
            if (!this.isUnmounted) {
                this.setState({
                    pokedElements,
                });
            }
            this.clean(options, "fail");
            // if it's not poked already, let's poke it
            return this.giveEmulatedInvalidError("submitError", true, false);
        }
        if (this.submitBlockPromises.length) {
            if (!this.isUnmounted) {
                this.setState({
                    submitting: true,
                });
            }
            await Promise.all(this.submitBlockPromises);
            this.submitBlockPromises = [];
        }
        // now we are going to build our query
        // also we make a check later on for the policies
        // if necessary
        const { requestFields, argumentsForQuery, } = gql_client_util_1.getFieldsAndArgs({
            includeArgs: true,
            includeFields: true,
            uniteFieldsWithAppliedValue: true,
            differingPropertiesOnlyForArgs: options.differingOnly,
            differingIncludesOnlyForArgs: options.differingOnly,
            includes: this.props.includes || [],
            properties: this.props.properties || [],
            includesForArgs: options.includes || [],
            propertiesForArgs: options.properties,
            policiesForArgs: options.policies || [],
            appliedOwner: this.props.assumeOwnership ? this.props.tokenData.id : null,
            userId: this.props.tokenData.id,
            userRole: this.props.tokenData.role,
            itemDefinitionInstance: this.props.itemDefinitionInstance,
            forId: this.props.forId,
            forVersion: this.props.forVersion || null,
        });
        // now checking the option for the before submit function, if it returns
        // false we cancel the submit request, we don't check policies yet
        if (options.beforeSubmit && !options.beforeSubmit()) {
            return null;
        }
        // now it's when we are actually submitting
        if (!this.isUnmounted) {
            this.setState({
                submitting: true,
            });
        }
        let value;
        let error;
        let getQueryFields;
        if (this.props.forId && this.state.loaded && !this.state.notFound) {
            const totalValues = await gql_client_util_1.runEditQueryFor({
                args: argumentsForQuery,
                fields: requestFields,
                itemDefinition: this.props.itemDefinitionInstance,
                token: this.props.tokenData.token,
                language: this.props.localeData.language,
                id: this.props.forId,
                version: this.props.forVersion,
                listenerUUID: this.props.remoteListener.getUUID(),
                cacheStore: this.props.longTermCaching,
            });
            value = totalValues.value;
            error = totalValues.error;
            getQueryFields = totalValues.getQueryFields;
        }
        else {
            let containerId;
            Object.keys(this.props.config.containersRegionMappers).forEach((mapper) => {
                if (mapper.split(";").includes(this.props.localeData.country)) {
                    containerId = this.props.config.containersRegionMappers[mapper];
                }
            });
            if (!containerId) {
                containerId = this.props.config.containersRegionMappers["*"];
            }
            const totalValues = await gql_client_util_1.runAddQueryFor({
                args: argumentsForQuery,
                fields: requestFields,
                itemDefinition: this.props.itemDefinitionInstance,
                token: this.props.tokenData.token,
                language: this.props.localeData.language,
                listenerUUID: this.props.remoteListener.getUUID(),
                cacheStore: this.props.longTermCaching,
                forId: this.props.forId || null,
                forVersion: this.props.forVersion || null,
                containerId,
            });
            value = totalValues.value;
            error = totalValues.error;
            getQueryFields = totalValues.getQueryFields;
        }
        let recievedId = null;
        let receivedVersion = null;
        if (error) {
            if (!this.isUnmounted) {
                this.setState({
                    submitError: error,
                    submitting: false,
                    submitted: false,
                    pokedElements,
                });
            }
            this.clean(options, "fail");
        }
        else if (value) {
            if (!this.isUnmounted) {
                this.setState({
                    submitError: null,
                    submitting: false,
                    submitted: true,
                    pokedElements,
                });
            }
            recievedId = value.id;
            receivedVersion = value.version || null;
            this.props.itemDefinitionInstance.applyValue(recievedId, receivedVersion, value, false, this.props.tokenData.id, this.props.tokenData.role, getQueryFields, true);
            this.clean(options, "success", true);
            this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId, this.props.forVersion || null);
        }
        // happens during an error or whatnot
        return {
            id: recievedId,
            error,
        };
    }
    async search(options) {
        if (this.state.searching) {
            return null;
        }
        // we need the standard counterpart given we are in search mode right now, 
        const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();
        // first we calculate the properties that are to be submitted, by using the standard counterpart
        // a search action is only to be executed if the item definition (either a real item definition or
        // one representing a module) is actually in search mode, otherwise this would crash
        const propertiesForArgs = getPropertyListForSearchMode(options.searchByProperties, standardCounterpart);
        // now we use this function to check that everything is valid
        const isValid = this.checkItemDefinitionStateValidity({
            properties: propertiesForArgs,
            includes: options.searchByIncludes || [],
        });
        // if it's invalid let's return the emulated error
        const pokedElements = {
            properties: propertiesForArgs,
            includes: options.searchByIncludes || [],
            policies: [],
        };
        if (!isValid) {
            if (!this.isUnmounted) {
                this.setState({
                    pokedElements,
                });
            }
            this.clean(options, "fail");
            return this.giveEmulatedInvalidError("searchError", false, true);
        }
        if (options.cachePolicy !== "none" &&
            typeof options.cachePolicy !== "undefined" &&
            options.cachePolicy !== null &&
            options.traditional) {
            throw new Error("A cache policy cannot be set with a traditional search");
        }
        // now we check the cache policy by owner
        if (options.cachePolicy === "by-owner" && !options.createdBy) {
            throw new Error("A by owner cache policy requires createdBy option to be set");
        }
        // and the cache policy by parenting
        let searchParent = null;
        if (options.cachePolicy === "by-parent" && !options.parentedBy) {
            throw new Error("A by owner cache policy requires parentedBy option to be set");
        }
        else if (options.parentedBy) {
            // because the parenting rule goes by a path, eg.... module/module  and then idef/idef
            // we need to loop and find it by the path in order to find both
            const moduleInQuestion = this.props.itemDefinitionInstance.getParentModule()
                .getParentRoot().getModuleFor(options.parentedBy.module.split("/"));
            const itemDefinitionInQuestion = moduleInQuestion.getItemDefinitionFor(options.parentedBy.itemDefinition.split("/"));
            // and that way we calculate the search parent
            searchParent = [
                itemDefinitionInQuestion.getQualifiedPathName(),
                options.parentedBy.id,
                options.parentedBy.version || null,
            ];
        }
        if (options.cachePolicy === "by-owner") {
            if (options.createdBy !== this.state.searchOwner) {
                // this search listener is bad because the search
                // owner has changed, and the previously registered listener
                // if any does not match the owner, remember the search owner is the created by
                // value, and we are now redoing the search, and we might have a search listener
                // registered already for this search if that is the case
                this.removePossibleSearchListeners();
            }
        }
        else if (options.cachePolicy === "by-parent") {
            // we basically do the exact same here, same logic
            if (!deep_equal_1.default(searchParent, this.state.searchParent)) {
                // this search listener is bad because the search
                // parent has changed, and the previously registered listener
                // if any does not match the owner
                this.removePossibleSearchListeners();
            }
        }
        else {
            // otherwise we are removing here because we have no cache policy
            // and hence no reason to have search listeners at all to listen to changes
            this.removePossibleSearchListeners();
        }
        // we save the last options used for our last search
        this.lastOptionsUsedForSearch = options;
        // and then set the state to searching
        if (!this.isUnmounted) {
            this.setState({
                searching: true,
            });
        }
        // the args of the item definition depend on the search mode, hence we use
        // our current item definition instance to get the arguments we want to load
        // in order to perform the search based on the search mode
        const { argumentsForQuery, } = gql_client_util_1.getFieldsAndArgs({
            includeArgs: true,
            includeFields: false,
            propertiesForArgs,
            includesForArgs: options.searchByIncludes || [],
            appliedOwner: options.createdBy,
            userId: this.props.tokenData.id,
            userRole: this.props.tokenData.role,
            itemDefinitionInstance: this.props.itemDefinitionInstance,
            forId: this.props.forId,
            forVersion: this.props.forVersion || null,
        });
        // the fields nevertheless are another story as it uses the standard logic
        const searchFieldsAndArgs = gql_client_util_1.getFieldsAndArgs({
            includeArgs: false,
            includeFields: true,
            properties: options.requestedProperties,
            includes: options.requestedIncludes || [],
            appliedOwner: options.createdBy,
            userId: this.props.tokenData.id,
            userRole: this.props.tokenData.role,
            itemDefinitionInstance: standardCounterpart,
            forId: null,
            forVersion: null,
        });
        // while these search fields are of virtually no use for standard searchs
        // these are used when doing a traditional search and when doing a search
        // in a cache policy mode
        const requestedSearchFields = searchFieldsAndArgs.requestFields;
        let parentedBy = null;
        if (options.parentedBy) {
            const root = this.props.itemDefinitionInstance.getParentModule().getParentRoot();
            const parentIdef = root.getModuleFor(options.parentedBy.module.split("/"))
                .getItemDefinitionFor(options.parentedBy.itemDefinition.split("/"));
            parentedBy = {
                itemDefinition: parentIdef,
                id: options.parentedBy.id,
                version: options.parentedBy.version || null,
            };
        }
        const { results, records, count, limit, offset, error, } = await gql_client_util_1.runSearchQueryFor({
            args: argumentsForQuery,
            fields: requestedSearchFields,
            itemDefinition: this.props.itemDefinitionInstance,
            cachePolicy: options.cachePolicy || "none",
            createdBy: options.createdBy || null,
            orderBy: options.orderBy || {
                created_at: {
                    priority: 0,
                    nulls: "last",
                    direction: "desc",
                }
            },
            traditional: !!options.traditional,
            token: this.props.tokenData.token,
            language: this.props.localeData.language,
            limit: options.limit,
            offset: options.offset,
            parentedBy,
        }, this.props.remoteListener, this.onSearchReload);
        if (error) {
            if (!this.isUnmounted) {
                this.setState({
                    searchError: error,
                    searching: false,
                    searchResults: results,
                    searchRecords: records,
                    searchCount: count,
                    searchLimit: limit,
                    searchOffset: offset,
                    searchId: uuid_1.default.v4(),
                    searchOwner: options.createdBy || null,
                    searchParent,
                    searchShouldCache: !!options.cachePolicy,
                    searchFields: requestedSearchFields,
                    searchRequestedProperties: options.requestedProperties,
                    searchRequestedIncludes: options.requestedIncludes || [],
                    pokedElements,
                });
            }
            this.clean(options, "fail");
        }
        else {
            if (!this.isUnmounted) {
                this.setState({
                    searchError: null,
                    searching: false,
                    searchResults: results,
                    searchRecords: records,
                    searchCount: count,
                    searchLimit: limit,
                    searchOffset: offset,
                    searchId: uuid_1.default.v4(),
                    searchOwner: options.createdBy || null,
                    searchParent,
                    searchShouldCache: !!options.cachePolicy,
                    searchFields: requestedSearchFields,
                    searchRequestedProperties: options.requestedProperties,
                    searchRequestedIncludes: options.requestedIncludes || [],
                    pokedElements,
                });
            }
            this.clean(options, "success");
        }
        return {
            results,
            records,
            count,
            limit,
            offset,
            error: null,
        };
    }
    dismissLoadError() {
        if (this.isUnmounted) {
            return;
        }
        this.setState({
            loadError: null,
        });
    }
    dismissDeleteError() {
        if (this.isUnmounted) {
            return;
        }
        this.setState({
            deleteError: null,
        });
    }
    dismissSubmitError() {
        if (this.isUnmounted) {
            return;
        }
        this.setState({
            submitError: null,
        });
    }
    dismissSubmitted() {
        if (this.isUnmounted) {
            return;
        }
        this.setState({
            submitted: null,
        });
    }
    dismissDeleted() {
        if (this.isUnmounted) {
            return;
        }
        this.setState({
            deleted: false,
        });
    }
    dismissSearchError() {
        if (this.isUnmounted) {
            return;
        }
        this.setState({
            searchError: null,
        });
    }
    onSearchReload() {
        this.search(this.lastOptionsUsedForSearch);
    }
    removePossibleSearchListeners(props = this.props, state = this.state) {
        if (props.itemDefinitionInstance.isInSearchMode()) {
            const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();
            const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
                standardCounterpart.getParentModule().getQualifiedPathName() :
                standardCounterpart.getQualifiedPathName());
            if (state.searchOwner) {
                props.remoteListener.removeOwnedSearchListenerFor(this.onSearchReload, standardCounterpartQualifiedName, state.searchOwner);
            }
            if (state.searchParent) {
                props.remoteListener.removeParentedSearchListenerFor(this.onSearchReload, standardCounterpartQualifiedName, state.searchParent[0], state.searchParent[1], state.searchParent[2]);
            }
        }
    }
    dismissSearchResults() {
        this.removePossibleSearchListeners();
        if (!this.isUnmounted) {
            this.setState({
                searchId: null,
                searchFields: null,
                searchOwner: null,
                searchShouldCache: false,
                searchRequestedIncludes: [],
                searchRequestedProperties: [],
                searchResults: [],
            });
        }
    }
    canDelete() {
        if (this.props.forId === null) {
            return false;
        }
        return this.props.itemDefinitionInstance.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.DELETE, this.props.tokenData.role, this.props.tokenData.id, this.props.assumeOwnership ?
            (this.props.tokenData.id || constants_1.UNSPECIFIED_OWNER) :
            this.props.itemDefinitionInstance.getAppliedValueOwnerIfAny(this.props.forId, this.props.forVersion || null), {}, false);
    }
    canCreate() {
        if (this.props.forId !== null) {
            return false;
        }
        return this.props.itemDefinitionInstance.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.CREATE, this.props.tokenData.role, this.props.tokenData.id, this.props.tokenData.id || constants_1.UNSPECIFIED_OWNER, {}, false);
    }
    canEdit() {
        if (this.props.forId === null) {
            return false;
        }
        return this.props.itemDefinitionInstance.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.EDIT, this.props.tokenData.role, this.props.tokenData.id, this.props.assumeOwnership ?
            (this.props.tokenData.id || constants_1.UNSPECIFIED_OWNER) :
            this.props.itemDefinitionInstance.getAppliedValueOwnerIfAny(this.props.forId, this.props.forVersion || null), {}, false);
    }
    poke(elements) {
        if (this.isUnmounted) {
            return;
        }
        this.setState({
            pokedElements: elements,
        });
    }
    unpoke() {
        if (this.isUnmounted) {
            return;
        }
        this.setState({
            pokedElements: {
                properties: [],
                includes: [],
                policies: [],
            },
        });
    }
    render() {
        return (react_1.default.createElement(exports.ItemDefinitionContext.Provider, { value: {
                idef: this.props.itemDefinitionInstance,
                state: this.state.itemDefinitionState,
                onPropertyChange: this.onPropertyChange,
                onPropertyRestore: this.onPropertyRestore,
                onIncludeSetExclusionState: this.onIncludeSetExclusionState,
                onPropertyEnforce: this.onPropertyEnforce,
                onPropertyClearEnforce: this.onPropertyClearEnforce,
                notFound: this.state.notFound,
                blocked: this.state.isBlocked,
                blockedButDataAccessible: this.state.isBlockedButDataIsAccessible,
                loadError: this.state.loadError,
                loading: this.state.loading,
                loaded: this.state.loaded,
                submitError: this.state.submitError,
                submitting: this.state.submitting,
                submitted: this.state.submitted,
                deleteError: this.state.deleteError,
                deleting: this.state.deleting,
                deleted: this.state.deleted,
                searchError: this.state.searchError,
                searching: this.state.searching,
                searchRecords: this.state.searchRecords,
                searchResults: this.state.searchResults,
                searchLimit: this.state.searchLimit,
                searchCount: this.state.searchCount,
                searchOffset: this.state.searchOffset,
                searchId: this.state.searchId,
                searchOwner: this.state.searchOwner,
                searchShouldCache: this.state.searchShouldCache,
                searchFields: this.state.searchFields,
                searchRequestedProperties: this.state.searchRequestedProperties,
                searchRequestedIncludes: this.state.searchRequestedIncludes,
                pokedElements: this.state.pokedElements,
                submit: this.submit,
                reload: this.loadValue,
                delete: this.delete,
                clean: this.clean,
                search: this.search,
                forId: this.props.forId || null,
                forVersion: this.props.forVersion || null,
                dismissLoadError: this.dismissLoadError,
                dismissSubmitError: this.dismissSubmitError,
                dismissSubmitted: this.dismissSubmitted,
                dismissDeleteError: this.dismissDeleteError,
                dismissDeleted: this.dismissDeleted,
                dismissSearchError: this.dismissSearchError,
                dismissSearchResults: this.dismissSearchResults,
                poke: this.poke,
                unpoke: this.unpoke,
                canCreate: this.state.canCreate,
                canDelete: this.state.canDelete,
                canEdit: this.state.canEdit,
                remoteListener: this.props.remoteListener,
                injectSubmitBlockPromise: this.injectSubmitBlockPromise,
                injectedParentContext: this.props.injectedParentContext,
            } }, this.props.children));
    }
}
exports.ActualItemDefinitionProvider = ActualItemDefinitionProvider;
function ItemDefinitionProvider(props) {
    return (react_1.default.createElement(config_provider_1.ConfigContext.Consumer, null, (config) => (react_1.default.createElement(app_1.LocaleContext.Consumer, null, (localeData) => (react_1.default.createElement(token_provider_1.TokenContext.Consumer, null, (tokenData) => (react_1.default.createElement(module_1.ModuleContext.Consumer, null, (data) => (react_1.default.createElement(exports.SearchItemDefinitionValueContext.Consumer, null, (searchContext) => {
        if (!data) {
            throw new Error("The ItemDefinitionProvider must be inside a ModuleProvider context");
        }
        let valueFor;
        if (props.itemDefinition) {
            if (typeof props.itemDefinition === "string") {
                valueFor =
                    data.mod.getParentRoot().registry[props.itemDefinition] ||
                        data.mod.getItemDefinitionFor(props.itemDefinition.split("/"));
            }
            else {
                valueFor = props.itemDefinition;
            }
        }
        else {
            valueFor = data.mod.getPropExtensionItemDefinition();
        }
        if (props.searchCounterpart) {
            valueFor = valueFor.getSearchModeCounterpart();
        }
        const actualProps = {
            localeData,
            tokenData,
            itemDefinitionInstance: valueFor,
            itemDefinitionQualifiedName: valueFor.getQualifiedPathName(),
            containsExternallyCheckedProperty: valueFor.containsAnExternallyCheckedProperty(),
            remoteListener: data.remoteListener,
            searchContext: searchContext,
            config: config,
            ...props,
        };
        if (props.injectParentContext) {
            return (react_1.default.createElement(exports.ItemDefinitionContext.Consumer, null, (value) => (react_1.default.createElement(ActualItemDefinitionProvider, Object.assign({}, actualProps, { injectedParentContext: value })))));
        }
        return (react_1.default.createElement(ActualItemDefinitionProvider, Object.assign({}, actualProps, { injectedParentContext: null })));
    }))))))))));
}
exports.ItemDefinitionProvider = ItemDefinitionProvider;
class ActualNoStateItemDefinitionProvider extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.itemDefinitionQualifiedName !== this.props.itemDefinitionQualifiedName ||
            nextProps.children !== this.props.children;
    }
    render() {
        return (react_1.default.createElement(exports.ItemDefinitionContext.Provider, { value: {
                idef: this.props.itemDefinitionInstance,
            } }, this.props.children));
    }
}
function NoStateItemDefinitionProvider(props) {
    return (react_1.default.createElement(module_1.ModuleContext.Consumer, null, (data) => {
        if (!data) {
            throw new Error("The ItemDefinitionProvider must be inside a ModuleProvider context");
        }
        let valueFor;
        if (props.itemDefinition) {
            valueFor =
                data.mod.getParentRoot().registry[props.itemDefinition] ||
                    data.mod.getItemDefinitionFor(props.itemDefinition.split("/"));
        }
        else {
            valueFor = data.mod.getPropExtensionItemDefinition();
        }
        return (react_1.default.createElement(ActualNoStateItemDefinitionProvider, Object.assign({ itemDefinitionInstance: valueFor, itemDefinitionQualifiedName: valueFor.getQualifiedPathName() }, props)));
    }));
}
exports.NoStateItemDefinitionProvider = NoStateItemDefinitionProvider;
function ParentItemDefinitionContextProvider(props) {
    return (react_1.default.createElement(exports.ItemDefinitionContext.Consumer, null, (value) => (react_1.default.createElement(exports.ItemDefinitionContext.Provider, { value: value.injectedParentContext }, props.children))));
}
exports.ParentItemDefinitionContextProvider = ParentItemDefinitionContextProvider;