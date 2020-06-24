"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const util_1 = require("../../../../util");
var IViewportZoomEnumType;
(function (IViewportZoomEnumType) {
    IViewportZoomEnumType["SMALL"] = "SMALL";
    IViewportZoomEnumType["MEDIUM"] = "MEDIUM";
    IViewportZoomEnumType["LARGE"] = "LARGE";
})(IViewportZoomEnumType = exports.IViewportZoomEnumType || (exports.IViewportZoomEnumType = {}));
class PropertyEntryLocation extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.preventViewportDidUpdateChange = false;
        const value = this.props.state.value;
        const center = value ? [value.lat, value.lng] : [props.country.latitude, props.country.longitude];
        const zoom = value ? IViewportZoomEnumType.LARGE : IViewportZoomEnumType.SMALL;
        // set the initial state
        this.state = {
            suggestions: [],
            viewport: {
                center,
                zoom,
            },
            searchResults: null,
            searchCurrentlyMarkedValue: null,
        };
        this.onViewportChange = this.onViewportChange.bind(this);
        this.onSearchQueryChangeActual = this.onSearchQueryChangeActual.bind(this);
        this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
        this.onChangeBySuggestion = this.onChangeBySuggestion.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onChangeBySearchResult = this.onChangeBySearchResult.bind(this);
        this.onManualPick = this.onManualPick.bind(this);
        this.clearSuggestions = this.clearSuggestions.bind(this);
        this.clearSearchResults = this.clearSearchResults.bind(this);
        this.geocode = this.geocode.bind(this);
        this.onRestoreHijacked = this.onRestoreHijacked.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        // This is optimized to only update for the thing it uses
        return nextProps.property !== this.props.property ||
            !deep_equal_1.default(this.state, nextState) ||
            !deep_equal_1.default(this.props.state, nextProps.state) ||
            !!this.props.poked !== !!nextProps.poked ||
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
    componentDidUpdate(prevProps) {
        if (!this.preventViewportDidUpdateChange) {
            const value = this.props.state.value;
            if (value) {
                const oldValue = prevProps.state.value;
                if (!deep_equal_1.default(value, oldValue)) {
                    this.setState({
                        viewport: {
                            center: [value.lat, value.lng],
                            zoom: IViewportZoomEnumType.LARGE,
                        },
                    });
                }
            }
        }
    }
    onRestoreHijacked() {
        this.clearSearchResults();
        this.props.onRestore();
    }
    onViewportChange(viewport) {
        this.preventViewportDidUpdateChange = true;
        this.setState({
            viewport,
        });
    }
    async onSearchQueryChangeActual(searchQuery, updateIdentifier) {
        const countryLatitude = this.props.country.latitude;
        const countryLongitude = this.props.country.longitude;
        const sep = this.props.i18n[this.props.language].word_separator;
        let finalResults;
        try {
            finalResults = await fetch(`/rest/util/location-autocomplete?lat=${countryLatitude}&lng=${countryLongitude}` +
                `&q=${encodeURIComponent(searchQuery)}&sep=${encodeURIComponent(sep)}&lang=${this.props.language}`).then((r) => r.json());
        }
        catch (err) {
            finalResults = [];
        }
        if (updateIdentifier === this.autocompleteTakingPlace) {
            this.lastSuggestionsValue = finalResults;
            this.lastSuggestionsValueQ = searchQuery;
            this.setState({
                suggestions: finalResults,
            });
        }
    }
    onSearchQueryChange(searchQuery, dontAutoloadSuggestions) {
        if (this.props.state.internalValue === searchQuery ||
            this.props.state.value && this.props.state.value.txt === searchQuery) {
            return;
        }
        this.clearSearchResults();
        this.props.onChange(null, searchQuery);
        if (dontAutoloadSuggestions) {
            return;
        }
        else if (!searchQuery.trim()) {
            this.clearSuggestions();
            return;
        }
        // we put some delay here, for 300ms wait until the user
        // stops typing for actually doing the search, we don't need
        // to search every damn keystroke
        clearTimeout(this.delaySuggestionFetch);
        // so this is the update identifier for this update
        const updateIdentifier = (new Date()).getTime();
        // store it there
        this.autocompleteTakingPlace = updateIdentifier;
        // also if we get the same thing, as before, just
        // set the state as the same value as before, this happens, very often
        // when the element loses and regains focus
        if (this.lastSuggestionsValueQ === searchQuery) {
            this.setState({
                suggestions: this.lastSuggestionsValue,
            });
        }
        else {
            this.delaySuggestionFetch =
                setTimeout(this.onSearchQueryChangeActual.bind(this, searchQuery, updateIdentifier), 300);
        }
    }
    onChangeBySuggestion(suggestion, mantainViewport) {
        this.onManualPick(suggestion, mantainViewport);
    }
    async onSearch(mantainViewport) {
        const valueToSearch = this.props.state.internalValue ||
            (this.props.state.value && this.props.state.value.txt);
        this.clearSuggestions();
        this.props.onChange(null, valueToSearch);
        if (!valueToSearch) {
            return null;
        }
        else if (this.lastSearchValueQ === valueToSearch) {
            this.setState({
                searchResults: this.lastSearchValue,
                searchCurrentlyMarkedValue: 0,
            });
            return this.lastSearchValue;
        }
        // basically making a search request, we use the
        // internal value for this, as well as the country
        // latitude and longitude of the locale data
        const countryLatitude = this.props.country.latitude;
        const countryLongitude = this.props.country.longitude;
        const sep = this.props.i18n[this.props.language].word_separator;
        // so this is the update identifier for this update
        const thisUpdateIdentifier = (new Date()).getTime();
        // store it there
        this.searchTakingPlace = thisUpdateIdentifier;
        // make the async request to the here API
        let finalResults = [];
        try {
            finalResults = await fetch(`/rest/util/location-search?lat=${countryLatitude}&lng=${countryLongitude}` +
                `&q=${encodeURIComponent(valueToSearch)}&sep=${encodeURIComponent(sep)}&lang=${this.props.language}`).then((r) => r.json());
        }
        catch (err) {
            finalResults = [];
        }
        // due to the async nature some crazy stacking might have happened
        // let's check that only the last one can set the state
        if (thisUpdateIdentifier === this.searchTakingPlace) {
            // store the last searched then
            this.lastSearchValue = finalResults;
            this.lastSearchValueQ = valueToSearch;
            // if we don't bad luck, null everything
            if (!finalResults || !finalResults.length) {
                this.props.onChange(null, valueToSearch);
                this.setState({
                    searchResults: [],
                    searchCurrentlyMarkedValue: null,
                });
            }
            else {
                // otherwise set as the suggestion
                // the first one
                this.props.onChange(finalResults[0], valueToSearch);
                if (!mantainViewport) {
                    this.setState({
                        viewport: {
                            center: [finalResults[0].lat, finalResults[0].lng],
                            zoom: IViewportZoomEnumType.LARGE,
                        },
                        searchResults: finalResults,
                        searchCurrentlyMarkedValue: 0,
                    });
                }
                else {
                    this.setState({
                        searchResults: finalResults,
                        searchCurrentlyMarkedValue: 0,
                    });
                }
            }
        }
        return finalResults;
    }
    onChangeBySearchResult(searchResult, mantainViewport) {
        // swap the location for the search result
        // to another one of the answers
        if (!this.state.searchResults) {
            return;
        }
        const index = this.state.searchResults.findIndex((sr) => sr.lng === searchResult.lng && sr.lat === searchResult.lat);
        if (index === -1) {
            return;
        }
        // call onchange and set the viewport
        this.props.onChange(searchResult, this.props.state.internalValue);
        if (!mantainViewport) {
            this.setState({
                viewport: {
                    center: [searchResult.lat, searchResult.lng],
                    zoom: IViewportZoomEnumType.LARGE,
                },
                searchCurrentlyMarkedValue: index,
            });
        }
        else {
            this.setState({
                searchCurrentlyMarkedValue: index,
            });
        }
    }
    clearSearchResults() {
        this.setState({
            searchResults: null,
            searchCurrentlyMarkedValue: null,
        });
    }
    clearSuggestions() {
        this.setState({
            suggestions: [],
        });
    }
    async geocode(value) {
        let updatedResult;
        // so this is the update identifier for this update
        const updateIdentifier = (new Date()).getTime();
        // store it there
        this.geocodeTakingPlace = updateIdentifier;
        try {
            const sep = this.props.i18n[this.props.language].word_separator;
            updatedResult = await fetch(`/rest/util/location-geocode?lat=${value.lat}&lng=${value.lng}` +
                `&q=${encodeURIComponent(value.txt)}&sep=${encodeURIComponent(sep)}&lang=${this.props.language}`).then((r) => r.json());
        }
        catch (err) {
        }
        if (updatedResult && this.geocodeTakingPlace === updateIdentifier) {
            this.props.onChange(updatedResult, updatedResult.txt);
        }
    }
    onManualPick(value, mantainViewport) {
        const croppedValue = {
            txt: value.txt,
            atxt: value.atxt,
            lat: Number(value.lat.toFixed(6)),
            lng: Number(value.lng.toFixed(6)),
            id: value.id,
        };
        // set a place directly from a value
        if (croppedValue.atxt === null || croppedValue.id === null) {
            this.props.onChange({
                ...croppedValue,
                // geocode should replace these soon, put them there like this
                // to avoid it being an invalid value
                id: croppedValue.id || "???" + (new Date()).getTime(),
                atxt: croppedValue.atxt || "???",
            }, croppedValue.txt);
            this.geocode(croppedValue);
        }
        else {
            this.props.onChange(croppedValue, croppedValue.txt);
        }
        if (!mantainViewport) {
            // center the viewport there
            this.setState({
                viewport: {
                    center: [croppedValue.lat, croppedValue.lng],
                    zoom: IViewportZoomEnumType.LARGE,
                },
                searchResults: null,
                searchCurrentlyMarkedValue: null,
            });
        }
        else {
            this.setState({
                searchResults: null,
                searchCurrentlyMarkedValue: null,
            });
        }
    }
    render() {
        // getting the basic data
        const i18nData = this.props.property.getI18nDataFor(this.props.language);
        const i18nLabel = this.props.altLabel || (i18nData && i18nData.label);
        const i18nDescription = this.props.hideDescription ? null : (this.props.altDescription || (i18nData && i18nData.description));
        const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);
        const noResultsLabel = util_1.capitalize(this.props.i18n[this.props.language].no_results);
        let resultOutOfLabel = null;
        if (this.state.searchResults !== null && this.state.searchResults.length) {
            resultOutOfLabel = util_1.localeReplacer(util_1.capitalize(this.props.i18n[this.props.language].result_out_of), this.state.searchCurrentlyMarkedValue + 1, this.state.searchResults.length);
        }
        // get the invalid reason if any
        const invalidReason = this.props.state.invalidReason;
        const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
            (this.props.poked || this.props.state.userSet) && invalidReason;
        let i18nInvalidReason = null;
        if (isCurrentlyShownAsInvalid && i18nData &&
            i18nData.error && i18nData.error[invalidReason]) {
            i18nInvalidReason = i18nData.error[invalidReason];
        }
        const currentValue = this.props.state.value;
        const searchQuery = this.props.state.internalValue || (currentValue && currentValue.txt) || "";
        const activeSearchResults = this.state.searchResults;
        const nextSearchResult = (activeSearchResults &&
            this.state.searchCurrentlyMarkedValue !== null &&
            activeSearchResults[this.state.searchCurrentlyMarkedValue + 1]) || null;
        const prevSearchResult = (activeSearchResults &&
            this.state.searchCurrentlyMarkedValue !== null &&
            activeSearchResults[this.state.searchCurrentlyMarkedValue - 1]) || null;
        ;
        const nextSearchResultCircular = nextSearchResult ||
            (activeSearchResults && activeSearchResults[0]) ||
            null;
        const prevSearchResultCircular = prevSearchResult ||
            (activeSearchResults && activeSearchResults[activeSearchResults.length - 1]) ||
            null;
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            label: i18nLabel,
            noResultsLabel,
            resultOutOfLabel,
            placeholder: i18nPlaceholder,
            description: i18nDescription,
            icon: this.props.icon,
            currentAppliedValue: this.props.state.stateAppliedValue,
            currentValue,
            currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
            currentInvalidReason: i18nInvalidReason,
            currentInternalValue: this.props.state.internalValue,
            disabled: this.props.state.enforced,
            autoFocus: this.props.autoFocus || false,
            onChange: this.props.onChange,
            onRestore: this.onRestoreHijacked,
            canRestore: !this.props.property.getPropertyDefinitionDescription().localEqual({
                itemDefinition: this.props.itemDefinition,
                a: this.props.state.stateAppliedValue,
                b: this.props.state.value,
                id: this.props.property.getId(),
                include: null,
                prefix: "",
                property: this.props.property,
            }),
            onChangeBySearchResult: this.onChangeBySearchResult,
            onChangeBySuggestion: this.onChangeBySuggestion,
            onManualPick: this.onManualPick,
            onSearchQueryChange: this.onSearchQueryChange,
            onSearch: this.onSearch,
            onViewportChange: this.onViewportChange,
            clearSuggestions: this.clearSuggestions,
            clearSearchResults: this.clearSearchResults,
            viewport: this.state.viewport,
            searchSuggestions: this.state.suggestions,
            searchQuery,
            activeSearchResults,
            nextSearchResult,
            nextSearchResultCircular,
            prevSearchResult,
            prevSearchResultCircular,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.default = PropertyEntryLocation;