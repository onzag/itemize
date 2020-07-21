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
class PropertyEntryReference extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentOptions: [],
            currentSearchError: null,
            currentFindError: null,
        };
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.search = this.search.bind(this);
        this.findCurrentStrValue = this.findCurrentStrValue.bind(this);
        this.dismissSearchError = this.dismissSearchError.bind(this);
        this.dismissFindError = this.dismissFindError.bind(this);
    }
    componentDidMount() {
        if (this.props.state.value &&
            !this.props.state.internalValue &&
            !this.props.state.enforced) {
            const filterByLanguage = this.props.property.getSpecialProperty("referencedFilterByLanguage");
            this.findCurrentStrValue(this.props.state.value, filterByLanguage ? this.props.language : null);
        }
    }
    async search() {
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
            const property = idef.getPropertyDefinitionFor(pId, true);
            // we need then the conversion id for that specific target
            const conversionIds = search_mode_1.getConversionIds(property.rawData);
            // now the applicatble id that we will use to search, this is in the target
            // eg. EXACT_username or SEARCH_username
            const applicableId = conversionIds[0];
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
                let actualReferredProperty;
                // so we check if we are in search mode
                if (this.props.itemDefinition.isInSearchMode()) {
                    // and use a conversion id in such case to exact the current value in the state
                    actualPropertyId = search_mode_1.getConversionIds(actualReferredProperty.rawData)[0];
                    actualReferredProperty = this.props.itemDefinition.getPropertyDefinitionFor(actualPropertyId, true);
                }
                else {
                    // or not
                    actualReferredProperty = stdSelfIdef.getPropertyDefinitionFor(actualPropertyId, true);
                }
                // notice how we use the same slot we are currently in
                args[applicableId] = actualReferredProperty.getCurrentValue(this.props.forId, this.props.forVersion || null);
            }
        });
        // now we do this and use the search prop we are searching for and get the conversion
        // id for the search mode and just paste the string there
        args[search_mode_1.getConversionIds(sProp.rawData)[0]] = strToSearchForValue;
        // now we can run the search using the traditional mode
        const result = await gql_client_util_1.runSearchQueryFor({
            args,
            fields,
            orderBy: {},
            createdBy: null,
            parentedBy: null,
            cachePolicy: "none",
            token: this.props.token,
            itemDefinition: idef.getSearchModeCounterpart(),
            traditional: true,
            offset: 0,
            limit: 6,
            language: this.props.language,
            versionFilter: filterByLanguage ? this.props.language : null,
        }, null, null);
        // these nulls which represent the listener are only truly used for the
        // cached searches, we don't use that here
        if (result.error) {
            this.setState({
                currentSearchError: result.error,
            });
            return;
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
        this.lastCachedSearch = options;
        // this can happen if the search is cancelled before the user has finished typing
        // resulting in an unset value that might be in the searchbox at the end
        if (this.props.state.value === null || isNaN(this.props.state.value)) {
            const foundInList = options.find((o) => o.text === (this.props.state.internalValue || ""));
            if (foundInList) {
                this.props.onChange(foundInList.id, (this.props.state.internalValue || ""));
            }
        }
        this.setState({
            currentSearchError: null,
            currentOptions: options,
        });
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
    getSSRFoundValue(forId, forVersion) {
        if (!forId || !this.props.ssr) {
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
            token: this.props.token,
            itemDefinition: idef,
        });
        if (result.error) {
            this.setState({
                currentFindError: result.error,
            });
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
    onChangeSearch(str) {
        let value = str.trim().length ? null : NaN;
        let foundInList = this.state.currentOptions.find((o) => o.text === str);
        if (!foundInList && this.lastCachedSearch) {
            foundInList = this.lastCachedSearch.find((o) => o.text === str);
        }
        if (foundInList) {
            value = foundInList.id;
        }
        this.props.onChange(value, str);
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(this.search, 600);
    }
    onSelect(option) {
        this.props.onChange(option.id, option.text);
    }
    onCancel() {
        this.setState({
            currentOptions: [],
            currentSearchError: null,
        });
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
            currentAppliedValue: this.props.state.stateAppliedValue,
            currentValue: this.props.state.value,
            currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
            currentInvalidReason: i18nInvalidReason,
            currentInternalValue: this.props.state.internalValue,
            currentStrValue: this.props.state.internalValue || this.getSSRFoundValue(this.props.state.value, filterByLanguage ? this.props.language : null) || "",
            currentValueIsFullfilled: !!this.props.state.value,
            currentOptions: this.state.currentOptions,
            currentSearchError: this.state.currentSearchError,
            currentFindError: this.state.currentFindError,
            canRestore: this.props.state.value !== this.props.state.stateAppliedValue,
            onChangeSearch: this.onChangeSearch,
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
