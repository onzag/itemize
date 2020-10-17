"use strict";
/**
 * The location handler
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IViewportZoomEnumType = void 0;
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const util_1 = require("../../../../util");
const PropertyViewLocation_1 = require("../PropertyView/PropertyViewLocation");
/**
 * The viewpoer zoom sizes, implement as you wish, but these zooms
 * are considered and should be handled by your implementation
 */
var IViewportZoomEnumType;
(function (IViewportZoomEnumType) {
    /**
     * Should mean the most zoomed out, show an country
     */
    IViewportZoomEnumType["SMALL"] = "SMALL";
    /**
     * A default zoom status
     */
    IViewportZoomEnumType["MEDIUM"] = "MEDIUM";
    /**
     * Zoomed in the most, show an address
     */
    IViewportZoomEnumType["LARGE"] = "LARGE";
})(IViewportZoomEnumType = exports.IViewportZoomEnumType || (exports.IViewportZoomEnumType = {}));
/**
 * The property entry location class
 */
class PropertyEntryLocation extends react_1.default.Component {
    constructor(props) {
        super(props);
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
        const oldValue = prevProps.state.value;
        const newValue = this.props.state.value;
        // so we check our new value and check if they are not equal
        if (newValue && !deep_equal_1.default(newValue, oldValue)) {
            // and now let's see if we are centered to our old value, as in we are locked to it
            let isCenteredToOldValue = false;
            // that depends on if we have an old value at all
            if (oldValue) {
                // we do this cheap check that allows for wiggle room
                const oldCenter = [oldValue.lat, oldValue.lng];
                isCenteredToOldValue = PropertyViewLocation_1.isCenterBasicallyEquals(this.state.viewport.center, oldCenter);
            }
            // and then if we are centered to it or if we didn't have an old value we
            // are going to fly to it
            if (isCenteredToOldValue || !oldValue) {
                // we try to keep the zoom
                this.setState({
                    viewport: {
                        center: [newValue.lat, newValue.lng],
                        zoom: !oldValue ? IViewportZoomEnumType.LARGE : this.state.viewport.zoom,
                    },
                });
            }
            // this allows realtime centered tracking, say we have a location marker that is centered
            // to our location not only the value will update but we will keep track of it, so we are basically
            // following the element
        }
    }
    /**
     * Hijacking the on restore function
     */
    onRestoreHijacked() {
        // because we need to clear the search results
        this.clearSearchResults();
        // before running the actual restoration
        this.props.onRestore();
    }
    onViewportChange(viewport) {
        this.setState({
            viewport,
        });
    }
    /**
     * Actuall what triggers
     * @param searchQuery the search query we are using
     * @param updateIdentifier the identifier of this, to ensure
     * that if two changes happened at once, only the last one wil trigger
     */
    async onSearchQueryChangeActual(searchQuery, updateIdentifier) {
        // so we get these for reference
        const countryLatitude = this.props.country.latitude;
        const countryLongitude = this.props.country.longitude;
        // and our separator
        const sep = this.props.i18n[this.props.language].word_separator;
        // now the final results based on this
        let finalResults;
        try {
            finalResults = await fetch(`/rest/util/location-autocomplete?lat=${countryLatitude}&lng=${countryLongitude}` +
                `&q=${encodeURIComponent(searchQuery)}&sep=${encodeURIComponent(sep)}&lang=${this.props.language}`).then((r) => r.json());
        }
        catch (err) {
            finalResults = [];
        }
        // and if our update identifier matches
        if (updateIdentifier === this.autocompleteTakingPlace) {
            // we store these to avoid retriggering the same suggestion
            this.lastSuggestionsValue = finalResults;
            this.lastSuggestionsValueQ = searchQuery;
            // we set such suggestions
            this.setState({
                suggestions: finalResults,
            });
        }
    }
    /**
     * Triggers when the search query changes, this is the literal
     * function that is fed to the renderer
     * @param searchQuery the search query the renderer gives
     * @param dontAutoloadSuggestions and whether we should not autoload suggestions
     */
    onSearchQueryChange(searchQuery, dontAutoloadSuggestions) {
        // same value, do nothing
        if (this.props.state.internalValue === searchQuery ||
            this.props.state.value && this.props.state.value.txt === searchQuery) {
            return;
        }
        // clear search result because we have changed it
        this.clearSearchResults();
        // clear a current value because now it doesn't match and
        // we are doing a new search
        this.props.onChange(null, searchQuery);
        // and we do this depending
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
    /**
     * Fed to the renderer to change by suggestion
     * @param suggestion the suggestion we are using
     * @param mantainViewport whether to mantain the viewport
     */
    onChangeBySuggestion(suggestion, mantainViewport) {
        // we just call the manual pick function, given
        // the suggestion is a complete value it won't request
        // geocode
        this.onManualPick(suggestion, mantainViewport);
    }
    /**
     * Fed to the renderer in order to run a search
     * @param mantainViewport whether to mantain the viewport
     */
    async onSearch(mantainViewport) {
        // but what are we searching for, we get the value
        // for it, what is it in our text field?
        const valueToSearch = this.props.state.internalValue ||
            (this.props.state.value && this.props.state.value.txt);
        // clear suggestions, we don't need them
        this.clearSuggestions();
        // and we clear the current value
        this.props.onChange(null, valueToSearch);
        // if we have nothing to search for
        if (!valueToSearch) {
            // we don't run a search we clear it instead
            this.clearSearchResults();
            // nothing happens
            return null;
            // if we are searching the entire same thing, aka
            // smashing search on the same value
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
    /**
     * Fed to the renderer to change by search result
     * @param searchResult the search result in question
     * @param mantainViewport whether to mantain the viewport
     */
    onChangeBySearchResult(searchResult, mantainViewport) {
        // swap the location for the search result
        // to another one of the answers
        if (!this.state.searchResults) {
            return;
        }
        // get the index for it
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
    /**
     * run the geocode for incomplete values
     * @param value
     */
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
            propertyId: this.props.property.getId(),
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
