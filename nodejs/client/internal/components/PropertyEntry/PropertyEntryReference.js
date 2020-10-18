"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const gql_client_util_1 = require("../../../../client/internal/gql-client-util");
const search_mode_1 = require("../../../../base/Root/Module/ItemDefinition/PropertyDefinition/search-mode");
;
const SSR_GRACE_TIME = 10000;
const LOAD_TIME = (new Date()).getTime();
class PropertyEntryReference extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.isUnmounted = false;
        this.state = {
            currentOptions: [],
            currentOptionsVersion: null,
            currentSearchError: null,
            currentFindError: null,
        };
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.loadAllPossibleValues = this.loadAllPossibleValues.bind(this);
        this.refilterPossibleValues = this.refilterPossibleValues.bind(this);
        this.refilter = this.refilter.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.search = this.search.bind(this);
        this.findCurrentStrValue = this.findCurrentStrValue.bind(this);
        this.dismissSearchError = this.dismissSearchError.bind(this);
        this.dismissFindError = this.dismissFindError.bind(this);
        this.changeListener = this.changeListener.bind(this);
    }
    changeListener(id, version) {
        // we check that the change occured in our own version
        if (this.lastSearchId &&
            (id || null) === (this.props.forId || null) &&
            (version || null) === (this.props.forVersion || null)) {
            this.search(this.lastSearchArgumentLoadAll, this.lastSearchArgumentLimit, this.lastSearchArgumentPreventIds, this.lastSearchArgumentPreventEqualityWithProperties);
        }
    }
    componentDidMount() {
        this.addListeners();
        if (this.props.state.value &&
            !this.props.state.internalValue &&
            !this.props.state.enforced) {
            const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage");
            this.findCurrentStrValue(this.props.state.value, filterByLanguage ? this.props.language : null);
        }
    }
    componentWillUnmount() {
        this.isUnmounted = true;
        this.removeListeners();
        if (this.lastCachedSearchPreventedProperties) {
            this.removePreventEqualityWithPropertiesListener(this.lastCachedSearchPreventedProperties);
        }
    }
    toggleListener(props = this.props, fn) {
        const propertySet = props.property.getSpecialProperty("referencedFilteringPropertySet") || {};
        // first we need the standard form not of our target item definition
        // but rather the one we are currently working within, hence the difference
        let stdSelfIdef = this.props.itemDefinition;
        // if we are in search mode
        if (this.props.itemDefinition.isInSearchMode()) {
            // the standard counterpart needs to be fetched
            stdSelfIdef = this.props.itemDefinition.getStandardCounterpart();
        }
        // now we loop into our property set
        Object.keys(propertySet).forEach((pId) => {
            // now the value we will use will depend on the type of condition we have here
            const valueToUse = propertySet[pId];
            // if it's an exact value we just paste it in the arg
            if (typeof valueToUse.exactValue === "undefined") {
                const referredProperty = valueToUse.property;
                let actualReferredProperty = stdSelfIdef.getPropertyDefinitionFor(referredProperty, true);
                if (this.props.itemDefinition.isInSearchMode()) {
                    actualReferredProperty = this.props.itemDefinition.getPropertyDefinitionFor(search_mode_1.getConversionIds(actualReferredProperty.rawData)[0], true);
                }
                actualReferredProperty[fn](this.changeListener);
            }
        });
    }
    addPreventEqualityWithPropertiesListener(properties) {
        properties.forEach((p) => {
            p.addChangeListener(this.refilter);
        });
    }
    removePreventEqualityWithPropertiesListener(properties) {
        properties.forEach((p) => {
            p.removeChangeListener(this.refilter);
        });
    }
    addListeners(props = this.props) {
        this.toggleListener(props, "addChangeListener");
    }
    removeListeners(props = this.props) {
        this.toggleListener(props, "removeChangeListener");
    }
    async search(loadAll, limit, preventIds, preventEqualityWithProperties) {
        const searchId = (new Date()).getTime();
        this.lastSearchId = searchId;
        this.lastSearchArgumentLoadAll = loadAll;
        this.lastSearchArgumentLimit = limit;
        this.lastSearchArgumentPreventIds = preventIds;
        this.lastSearchArgumentPreventEqualityWithProperties = preventEqualityWithProperties;
        const strToSearchForValue = this.props.state.internalValue || "";
        const [idef, dProp, sProp] = this.getSpecialData();
        const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage");
        const fields = {
            id: {},
            DATA: {
                [dProp.getId()]: dProp.getPropertyDefinitionDescription().gqlFields || {},
            }
        };
        const propertySet = this.props.property.getSpecialProperty("referencedFilteringPropertySet") || {};
        if (this.props.referenceFilteringSet) {
            Object.keys(this.props.referenceFilteringSet).forEach((key) => {
                propertySet[key] = {
                    exactValue: this.props.referenceFilteringSet[key],
                };
            });
        }
        const args = {};
        // first we need the standard form not of our target item definition
        // but rather the one we are currently working within, hence the difference
        let stdSelfIdef = this.props.itemDefinition;
        // if we are in search mode
        if (this.props.itemDefinition.isInSearchMode()) {
            // the standard counterpart needs to be fetched
            stdSelfIdef = this.props.itemDefinition.getStandardCounterpart();
        }
        // now we loop into our property set
        Object.keys(propertySet).forEach((pId) => {
            // we try to get the property for the given id from the target
            // item definition as that is what we are setting in the search
            const property = idef.hasPropertyDefinitionFor(pId, true) && idef.getPropertyDefinitionFor(pId, true);
            // now we need the applicable id we will be using for search
            let applicableId;
            if (property) {
                // we need then the conversion id for that specific target
                const conversionIds = search_mode_1.getConversionIds(property.rawData);
                // now the applicatble id that we will use to search, this is in the target
                // eg. EXACT_username or SEARCH_username
                applicableId = conversionIds[0];
            }
            else {
                applicableId = pId;
            }
            // now the value we will use will depend on the type of condition we have here
            const valueToUse = propertySet[pId];
            // if it's an exact value we just paste it in the arg
            if (typeof valueToUse.exactValue !== "undefined") {
                args[applicableId] = valueToUse.exactValue;
            }
            else {
                // otherwise it's a property in our source were we are working in, and our same slot
                // works similarly to media property in those regards
                const referredProperty = valueToUse.property;
                // however we don't know if we are in search mode in our source here were this property belongs
                // so now we need to find what are we setting, while for the target it is always in the standard
                // mode for us we don't know
                let actualPropertyId = referredProperty;
                let actualReferredProperty = stdSelfIdef.getPropertyDefinitionFor(actualPropertyId, true);
                // so we check if we are in search mode
                if (this.props.itemDefinition.isInSearchMode()) {
                    // and use a conversion id in such case to exact the current value in the state
                    actualPropertyId = search_mode_1.getConversionIds(actualReferredProperty.rawData)[0];
                    actualReferredProperty = this.props.itemDefinition.getPropertyDefinitionFor(actualPropertyId, true);
                }
                // notice how we use the same slot we are currently in
                args[applicableId] = actualReferredProperty.getCurrentValue(this.props.forId, this.props.forVersion || null);
            }
        });
        if (!loadAll) {
            // now we do this and use the search prop we are searching for and get the conversion
            // id for the search mode and just paste the string there
            args[search_mode_1.getConversionIds(sProp.rawData)[0]] = strToSearchForValue;
        }
        const onlyCreatedBySelf = this.props.property.getSpecialProperty("referencedFilterByCreatedBySelf");
        // now we can run the search using the traditional mode
        const result = await gql_client_util_1.runSearchQueryFor({
            args,
            fields,
            orderBy: {},
            createdBy: onlyCreatedBySelf ? this.props.tokenData.id : null,
            parentedBy: null,
            cachePolicy: "none",
            token: this.props.tokenData.token,
            itemDefinition: idef.getSearchModeCounterpart(),
            traditional: true,
            offset: 0,
            limit: !loadAll ? 6 : (limit || 50),
            language: this.props.language,
            versionFilter: filterByLanguage ? this.props.language : null,
            waitAndMerge: true,
        }, null);
        // these nulls which represent the listener are only truly used for the
        // cached searches, we don't use that here
        if (result.error) {
            if (!this.isUnmounted && this.lastSearchId === searchId) {
                this.setState({
                    currentSearchError: result.error,
                });
            }
            return;
        }
        // the reason we use the last rather than from the argument is that
        // we might have gotten a refilter we were doing the search
        const actualPreventIds = (this.lastSearchArgumentPreventIds || []).filter((id) => id !== null);
        if (this.lastSearchArgumentPreventEqualityWithProperties) {
            this.lastSearchArgumentPreventEqualityWithProperties.forEach((p) => {
                const prop = stdSelfIdef.getPropertyDefinitionFor(p, true);
                const value = prop.getCurrentValue(this.props.forId, this.props.forVersion || null);
                if (typeof value === "number") {
                    actualPreventIds.push(value);
                }
                else if (value !== null) {
                    console.warn("Attempted to perform a reference property equality with a property of type " +
                        typeof value +
                        " whose id is " +
                        p);
                }
            });
        }
        // we get the options and sort alphabetically
        const options = result.results.map((r) => ({
            text: (r && r.DATA && r.DATA[dProp.getId()]).toString(),
            id: (r && r.id),
        })).sort((a, b) => {
            if (a.text < b.text) {
                return -1;
            }
            if (a.text > b.text) {
                return 1;
            }
            return 0;
        });
        if (this.lastSearchId === searchId) {
            this.lastCachedSearch = options;
            this.lastCachedSearchPreventedIds = this.lastSearchArgumentPreventIds;
            if (!deep_equal_1.default(this.lastCachedSearchPreventedPropertiesIds, this.lastSearchArgumentPreventEqualityWithProperties)) {
                this.lastCachedSearchPreventedProperties &&
                    this.removePreventEqualityWithPropertiesListener(this.lastCachedSearchPreventedProperties);
                this.lastCachedSearchPreventedProperties = (this.lastSearchArgumentPreventEqualityWithProperties || []).map((p) => stdSelfIdef.getPropertyDefinitionFor(p, true));
                this.lastCachedSearchPreventedPropertiesIds = this.lastSearchArgumentPreventEqualityWithProperties;
                this.addPreventEqualityWithPropertiesListener(this.lastCachedSearchPreventedProperties);
            }
        }
        // this can happen if the search is cancelled before the user has finished typing
        // resulting in an unset value that might be in the searchbox at the end
        if (this.props.state.value === null || isNaN(this.props.state.value)) {
            const foundInList = options.find((o) => o.text === (this.props.state.internalValue || ""));
            if (foundInList) {
                this.props.onChange(foundInList.id, (this.props.state.internalValue || ""));
            }
        }
        if (!this.isUnmounted && this.lastSearchId === searchId) {
            this.setState({
                currentSearchError: null,
                currentOptions: !actualPreventIds.length ? options : options.filter((v) => !actualPreventIds.includes(v.id)),
                currentOptionsVersion: filterByLanguage ? this.props.language : null,
            });
        }
    }
    getSpecialData() {
        const modPath = this.props.property.getSpecialProperty("referencedModule");
        if (!modPath) {
            throw new Error("For usage with references you must specify a referencedModule special property for " + this.props.property.getId());
        }
        const idefPath = this.props.property.getSpecialProperty("referencedItemDefinition");
        if (!idefPath) {
            throw new Error("For usage with references you must specify a referencedItemDefinition special property for " + this.props.property.getId());
        }
        const searchProp = this.props.property.getSpecialProperty("referencedSearchProperty");
        if (!searchProp) {
            throw new Error("For usage with references you must specify a referencedSearchProperty special property for " + this.props.property.getId());
        }
        const displayProp = this.props.property.getSpecialProperty("referencedDisplayProperty");
        if (!displayProp) {
            throw new Error("For usage with references you must specify a referencedDisplayProperty special property for " + this.props.property.getId());
        }
        const root = this.props.property.getParentModule().getParentRoot();
        const mod = root.getModuleFor(modPath.split("/"));
        const idef = mod.getItemDefinitionFor(idefPath.split("/"));
        const dProp = idef.getPropertyDefinitionFor(displayProp, true);
        const sProp = idef.getPropertyDefinitionFor(searchProp, true);
        return [idef, dProp, sProp];
    }
    async beforeSSRRender() {
        const id = this.props.state.value;
        if (!id) {
            return null;
        }
        const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage");
        const version = filterByLanguage ? this.props.language : null;
        // we get our special data
        try {
            const [idef, dProp] = this.getSpecialData();
            const root = idef.getParentModule().getParentRoot();
            await root.callRequestManager(idef, id, version);
            this.ssrServerOnlyValue = dProp.getCurrentValue(id, version).toString();
        }
        catch {
            // ignore the error and move on
        }
    }
    getSSRFoundValue(forId, forVersion) {
        if (!forId || !this.props.ssr) {
            return null;
        }
        // Only accept ssr based results when we have loaded this fast
        const currentTime = (new Date()).getTime();
        if (currentTime - LOAD_TIME > SSR_GRACE_TIME) {
            return null;
        }
        const [idef, dProp] = this.getSpecialData();
        const match = this.props.ssr.queries.find((v) => v.idef === idef.getQualifiedPathName() && v.id === forId && v.version === forVersion);
        if (!match) {
            return null;
        }
        const pMatch = match.value && match.value.DATA && match.value.DATA[dProp.getId()];
        if (!pMatch) {
            return null;
        }
        return pMatch.toString();
    }
    async findCurrentStrValue(forId, forVersion) {
        if (this.currentlyFindingValueFor &&
            this.currentlyFindingValueFor[0] === forId &&
            this.currentlyFindingValueFor[1] === forVersion) {
            return;
        }
        const ssrValue = this.getSSRFoundValue(forId, forVersion);
        if (ssrValue) {
            this.props.onChange(forId, ssrValue);
            return;
        }
        const valueInSearchResults = this.state.currentOptionsVersion === forVersion &&
            this.state.currentOptions.find((r) => r.id === forId);
        if (valueInSearchResults) {
            this.props.onChange(forId, valueInSearchResults.text);
            return;
        }
        this.currentlyFindingValueFor = [forId, forVersion];
        const [idef, dProp] = this.getSpecialData();
        const fields = {
            DATA: {
                [dProp.getId()]: dProp.getPropertyDefinitionDescription().gqlFields || {},
            }
        };
        const result = await gql_client_util_1.runGetQueryFor({
            args: {},
            fields,
            returnMemoryCachedValues: false,
            returnWorkerCachedValues: false,
            returnWorkerCachedValuesIfNoInternet: true,
            language: this.props.language,
            id: forId,
            version: null,
            cacheStore: false,
            token: this.props.tokenData.token,
            itemDefinition: idef,
        });
        if (result.error) {
            if (!this.isUnmounted) {
                this.setState({
                    currentFindError: result.error,
                });
            }
            return;
        }
        this.setState({
            currentFindError: null,
        });
        const pMatch = result.value && result.value.DATA && result.value.DATA[dProp.getId()];
        if (!pMatch) {
            return;
        }
        this.props.onChange(forId, pMatch.toString());
    }
    loadAllPossibleValues(limit, preventIds, preventEqualityWithProperties) {
        this.search(true, limit, preventIds, preventEqualityWithProperties);
    }
    refilter(id, version) {
        // we check that the change occured in our own version
        if ((id || null) === (this.props.forId || null) && (version || null) === (this.props.forVersion || null)) {
            this.refilterPossibleValues(this.lastCachedSearchPreventedIds, this.lastCachedSearchPreventedPropertiesIds);
        }
    }
    refilterPossibleValues(preventIds, preventEqualityWithProperties) {
        this.lastSearchArgumentPreventIds = preventIds;
        this.lastSearchArgumentPreventEqualityWithProperties = preventEqualityWithProperties;
        if (!this.lastCachedSearch) {
            return;
        }
        // first we need the standard form not of our target item definition
        // but rather the one we are currently working within, hence the difference
        let stdSelfIdef = this.props.itemDefinition;
        // if we are in search mode
        if (this.props.itemDefinition.isInSearchMode()) {
            // the standard counterpart needs to be fetched
            stdSelfIdef = this.props.itemDefinition.getStandardCounterpart();
        }
        const actualPreventIds = (preventIds || []).filter((id) => id !== null);
        if (preventEqualityWithProperties) {
            preventEqualityWithProperties.forEach((p) => {
                const prop = stdSelfIdef.getPropertyDefinitionFor(p, true);
                const value = prop.getCurrentValue(this.props.forId, this.props.forVersion || null);
                if (typeof value === "number") {
                    actualPreventIds.push(value);
                }
                else if (value !== null) {
                    console.warn("Attempted to perform a reference property equality with a property of type " +
                        typeof value +
                        " whose id is " +
                        p);
                }
            });
        }
        this.lastCachedSearchPreventedIds = preventIds;
        if (!deep_equal_1.default(this.lastCachedSearchPreventedPropertiesIds, preventEqualityWithProperties)) {
            this.lastCachedSearchPreventedProperties &&
                this.removePreventEqualityWithPropertiesListener(this.lastCachedSearchPreventedProperties);
            this.lastCachedSearchPreventedProperties = (preventEqualityWithProperties || []).map((p) => stdSelfIdef.getPropertyDefinitionFor(p, true));
            this.addPreventEqualityWithPropertiesListener(this.lastCachedSearchPreventedProperties);
            this.lastCachedSearchPreventedPropertiesIds = preventEqualityWithProperties;
        }
        if (actualPreventIds.length) {
            const newCurrentOptions = this.lastCachedSearch.filter((v) => {
                return !actualPreventIds.includes(v.id);
            });
            if (!deep_equal_1.default(this.state.currentOptions, newCurrentOptions)) {
                this.setState({
                    currentOptions: newCurrentOptions,
                });
            }
        }
    }
    onChangeSearch(str, preventIds, preventEqualityWithProperties) {
        let value = str.trim().length ? NaN : null;
        let foundInList = this.state.currentOptions.find((o) => o.text === str);
        if (!foundInList && this.lastCachedSearch) {
            foundInList = this.lastCachedSearch.find((o) => o.text === str);
        }
        if (foundInList) {
            value = foundInList.id;
        }
        this.props.onChange(value, str);
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.search(false, null, preventIds, preventEqualityWithProperties);
        }, 600);
    }
    onSelect(option) {
        this.props.onChange(option.id, option.text);
    }
    onCancel() {
        this.setState({
            currentOptions: [],
            currentOptionsVersion: null,
            currentSearchError: null,
        });
        this.lastCachedSearchPreventedIds = null;
        if (this.lastCachedSearchPreventedProperties) {
            this.removePreventEqualityWithPropertiesListener(this.lastCachedSearchPreventedProperties);
        }
        this.lastCachedSearchPreventedProperties = null;
        this.lastCachedSearchPreventedPropertiesIds = null;
    }
    dismissSearchError() {
        this.setState({
            currentSearchError: null,
        });
    }
    dismissFindError() {
        this.setState({
            currentFindError: null,
        });
    }
    componentDidUpdate(prevProps) {
        const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage");
        if (this.props.state.value &&
            !this.props.state.internalValue &&
            !this.props.state.enforced) {
            this.findCurrentStrValue(this.props.state.value, filterByLanguage ? this.props.language : null);
        }
        else if (filterByLanguage &&
            this.props.state.value &&
            prevProps.language !== this.props.language) {
            this.findCurrentStrValue(this.props.state.value, this.props.language);
        }
        if (this.props.property.getId() !== prevProps.property.getId()) {
            this.removeListeners(prevProps);
            this.addListeners();
        }
        if (prevProps.language !== this.props.language) {
            this.onCancel();
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // This is optimized to only update for the thing it uses
        return nextProps.property !== this.props.property ||
            !deep_equal_1.default(this.state, nextState) ||
            !deep_equal_1.default(this.props.state, nextProps.state) ||
            !!this.props.poked !== !!nextProps.poked ||
            !!this.props.rtl !== !!nextProps.rtl ||
            !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
            this.props.altDescription !== nextProps.altDescription ||
            this.props.altPlaceholder !== nextProps.altPlaceholder ||
            this.props.altLabel !== nextProps.altLabel ||
            !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
            nextProps.language !== this.props.language ||
            nextProps.i18n !== this.props.i18n ||
            nextProps.icon !== this.props.icon ||
            nextProps.renderer !== this.props.renderer ||
            !deep_equal_1.default(this.props.rendererArgs, nextProps.rendererArgs);
    }
    render() {
        const i18nData = this.props.property.getI18nDataFor(this.props.language);
        const i18nLabel = this.props.altLabel || (i18nData && i18nData.label);
        const i18nDescription = this.props.hideDescription ? null : (this.props.altDescription || (i18nData && i18nData.description));
        const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);
        // get the invalid reason if any
        const invalidReason = this.props.state.invalidReason;
        const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
            (this.props.poked || this.props.state.userSet) && invalidReason;
        let i18nInvalidReason = null;
        if (isCurrentlyShownAsInvalid && i18nData &&
            i18nData.error && i18nData.error[invalidReason]) {
            i18nInvalidReason = i18nData.error[invalidReason];
        }
        const i18nUnspecified = this.props.i18n[this.props.language].unspecified;
        const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage");
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            propertyId: this.props.property.getId(),
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            label: i18nLabel,
            placeholder: i18nPlaceholder,
            description: i18nDescription,
            icon: this.props.icon,
            isNullable: this.props.property.isNullable(),
            i18nUnspecified,
            currentAppliedValue: this.props.state.stateAppliedValue,
            currentValue: this.props.state.value,
            currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
            currentInvalidReason: i18nInvalidReason,
            currentInternalValue: this.props.state.internalValue,
            currentTextualValue: this.props.state.internalValue || this.getSSRFoundValue(this.props.state.value, filterByLanguage ? this.props.language : null) || this.ssrServerOnlyValue || "",
            currentValueIsFullfilled: !!this.props.state.value,
            currentOptions: this.state.currentOptions,
            currentSearchError: this.state.currentSearchError,
            currentFindError: this.state.currentFindError,
            canRestore: this.props.state.value !== this.props.state.stateAppliedValue,
            onChangeSearch: this.onChangeSearch,
            loadAllPossibleValues: this.loadAllPossibleValues,
            refilterPossibleValues: this.refilterPossibleValues,
            onSelect: this.onSelect,
            onCancel: this.onCancel,
            dismissSearchError: this.dismissSearchError,
            dismissFindError: this.dismissFindError,
            disabled: this.props.state.enforced,
            autoFocus: this.props.autoFocus || false,
            onChange: this.props.onChange,
            onRestore: this.props.onRestore,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.default = PropertyEntryReference;
