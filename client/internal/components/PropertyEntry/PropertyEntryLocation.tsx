/**
 * The location handler
 * @module
 */

import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";
import { IPropertyDefinitionSupportedLocationType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import { capitalize, localeReplacer } from "../../../../util";
import { isCenterBasicallyEquals } from "../PropertyView/PropertyViewLocation";
import { deepRendererArgsComparer } from "../general-fn";

/**
 * The viewpoer zoom sizes, implement as you wish, but these zooms
 * are considered and should be handled by your implementation
 */
export enum IViewportZoomEnumType {
  /**
   * Should mean the most zoomed out, show an country
   */
  SMALL = "SMALL",
  /**
   * A default zoom status
   */
  MEDIUM = "MEDIUM",
  /**
   * Zoomed in the most, show an address
   */
  LARGE = "LARGE",
}

/**
 * This is your viewport object, it contains a center
 * and a zoom; this viewport object is meant to work
 * nicely with leaflet but it's not limited to it, however
 * it won't work out of the box as you still need the conversions
 * for the zooms
 */
export interface IViewport {
  /**
   * The center in the lat, lng form
   */
  center: [number, number];
  /**
   * The zoom, either one of our default types or as you manually
   * change an user defined custom number
   */
  zoom: IViewportZoomEnumType | number;
}

/**
 * The location renderer props, just like other special renderers do not use the onChange raw function, as the functionality
 * is too complex for it and this handler will handle internal states for you
 */
export interface IPropertyEntryLocationRendererProps extends IPropertyEntryRendererProps<IPropertyDefinitionSupportedLocationType> {
  /**
   * Trigger when the viewport changes, so a new viewport is provided
   */
  onViewportChange: (viewport: IViewport) => void;

  /**
   * Trigger when the search query changes
   * @param searchQuery the search query that is specified
   * @param dontAutoloadSuggestions avoid automatically loading suggestions
   * for this change, if your implementation has an specific time when to load
   * suggestions, call this function again with false for this value then
   */
  onSearchQueryChange: (
    searchQuery: string,
    dontAutoloadSuggestions?: boolean,
  ) => void;

  /**
   * Trigger when the search button or the sorts is pressed
   * search will use the search query but will perform a deep search instead
   * suggestions are not the same as search results
   * @param mantainViewport by default the search will move the viewport
   * to the first search result, with mantainViewport the viewport won't move
   * @returns a promise with the results
   */
  onSearch: (
    mantainViewport?: boolean,
  ) => Promise<IPropertyDefinitionSupportedLocationType[]>;

  /**
   * Picks a search result and assigns it as the current value
   * @param searchResult the search result to use
   * @param mantainViewport by default choosing a search result will move
   * the viewport to that search location, by passing this as true
   * you will prevent that
   */
  onChangeBySearchResult: (
    searchResult: IPropertyDefinitionSupportedLocationType,
    mantainViewport?: boolean,
  ) => void;

  /**
   * Picks a suggestion and assigns it as the current value, choosing
   * a suggestion is similar from a search result, so do not mix them
   * up; if a search result is beng used, use the search change function
   * as that will update the list of search results and marked locations
   * @param searchSuggestion the search suggestion
   * @param mantainViewport by default choosing a suggestion will move
   * the viewport to that search location, by passing this as true
   * you will prevent that
   */
  onChangeBySuggestion: (
    searchSuggestion: IPropertyDefinitionSupportedLocationType,
    mantainViewport?: boolean,
  ) => void;

  /**
   * Clear all the suggestions
   */
  clearSuggestions: () => void;

  /**
   * Clear all the suggestions
   */
  clearSearchResults: () => void;

  /**
   * Manually choose a value, this function is rather special
   * on the mechanism that it uses, given that it will try to autocomplete
   * incomplete picks
   * @param value the value of that we want to manually pick
   * @param value.id an id that we are manually picking for, this is an uuid
   * if you don't pass an id, it will request a geocode in order to get an id
   * pass null to request a geocode
   * @param value.txt the standard text form we are picking for, you should
   * always pass a value for it
   * @param value.atxt an alternative (not specified by the user) value, if you
   * don't specify one, pass null to it to request a geocode
   * @param value.lng the longitude, required
   * @param value.lat the latitude, required
   * @param mantainViewport by default doing a manual pick will fly to that
   * location, pass true to this to prevent that
   */
  onManualPick: (
    value: IPropertyDefinitionSupportedLocationType,
    mantainViewport?: boolean,
  ) => void;

  /**
   * A label to show when the search yielded no results
   */
  noResultsLabel: string;
  /**
   * The current localized lable of the current result, will
   * say something like, "result 1 out of 29"; in the user's language
   */
  resultOutOfLabel: string;
  /**
   * The current localized label for the total amount of results
   */
  resultLabel: string;

  /**
   * The current viewport
   */
  viewport: IViewport;
  /**
   * The current search suggestions, an array and always an array
   */
  searchSuggestions: IPropertyDefinitionSupportedLocationType[];
  /**
   * The current active search results, an array, but if a search
   * is not taking place, the value is null
   */
  activeSearchResults: IPropertyDefinitionSupportedLocationType[];
  /**
   * The next search result from the active search result list,
   * null if no next
   */
  nextSearchResult: IPropertyDefinitionSupportedLocationType;
  /**
   * The next search result, but circular, aka, it will
   * loop back to the first one; null if search results is empty
   */
  nextSearchResultCircular: IPropertyDefinitionSupportedLocationType;
  /**
   * The next search result from the active search result list,
   * null if no prev
   */
  prevSearchResult: IPropertyDefinitionSupportedLocationType;
  /**
   * The prev search result, but circular, aka, it will
   * loop back to the first one; null if search results is empty
   */
  prevSearchResultCircular: IPropertyDefinitionSupportedLocationType;
  /**
   * The search query we are searching or suggesting for, and/or
   * what is currently visible, use this as the value for your
   * field, ignore currentValue
   */
  searchQuery: string;
}

/**
 * The location state
 */
interface IPropertyEntryLocationState {
  /**
   * Represent the current suggestions we have
   */
  suggestions: IPropertyDefinitionSupportedLocationType[];
  /**
   * The current viewport for the map
   */
  viewport: IViewport;
  /**
   * Current search results, or null, if no current search
   */
  searchResults: IPropertyDefinitionSupportedLocationType[];
  /**
   * And the index of the current search result if we have chosen one from it
   */
  searchCurrentlyMarkedValue: number;
  showUserSetErrors: boolean;
}

/**
 * The property entry location class
 */
export default class PropertyEntryLocation
  extends React.Component<
    IPropertyEntryHandlerProps<IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps>,
    IPropertyEntryLocationState
  > {

  // does the same but for search
  private searchTakingPlace: number;
  private autocompleteTakingPlace: number;
  private geocodeTakingPlace: number;
  // the delay for the fetching, if you are typing fast,
  // we don't want to call every time
  private delaySuggestionFetch: NodeJS.Timeout;
  // the last suggestions value
  private lastSuggestionsValue: IPropertyDefinitionSupportedLocationType[];
  // the query used then
  private lastSuggestionsValueQ: string;
  // the same but for search
  private lastSearchValue: IPropertyDefinitionSupportedLocationType[];
  private lastSearchValueQ: string;

  constructor(props: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps>) {
    super(props);

    const value: IPropertyDefinitionSupportedLocationType = this.props.state.value as IPropertyDefinitionSupportedLocationType;

    const center: [number, number] =  value ? [value.lat, value.lng] : [props.country.latitude, props.country.longitude];
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
      showUserSetErrors: false,
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
    this.enableUserSetErrors = this.enableUserSetErrors.bind(this);
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps>,
    nextState: IPropertyEntryLocationState,
  ) {
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.state, nextState, { strict: true }) ||
      !equals(this.props.state, nextProps.state, { strict: true }) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
      this.props.altDescription !== nextProps.altDescription ||
      this.props.altPlaceholder !== nextProps.altPlaceholder ||
      this.props.altLabel !== nextProps.altLabel ||
      this.props.hideLabel !== nextProps.hideLabel ||
      !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
      nextProps.language !== this.props.language ||
      nextProps.languageOverride !== this.props.languageOverride ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.renderer !== this.props.renderer ||
      !deepRendererArgsComparer(this.props.rendererArgs, nextProps.rendererArgs);
  }

  public enableUserSetErrors() {
    this.setState({
      showUserSetErrors: true,
    });
  }

  public componentDidUpdate(prevProps: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps>) {
    const oldValue = prevProps.state.value as IPropertyDefinitionSupportedLocationType;
    const newValue = this.props.state.value as IPropertyDefinitionSupportedLocationType;

    // so we check our new value and check if they are not equal
    if (newValue && !equals(newValue, oldValue, { strict: true })) {
      // and now let's see if we are centered to our old value, as in we are locked to it
      let isCenteredToOldValue = false;

      // that depends on if we have an old value at all
      if (oldValue) {
        // we do this cheap check that allows for wiggle room
        const oldCenter = [oldValue.lat, oldValue.lng] as [number, number];
        isCenteredToOldValue = isCenterBasicallyEquals(this.state.viewport.center, oldCenter);
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
  public onRestoreHijacked() {
    // because we need to clear the search results
    this.clearSearchResults();
    // before running the actual restoration
    this.props.onRestore();
  }

  public onViewportChange(
    viewport: IViewport,
  ) {
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
  public async onSearchQueryChangeActual(
    searchQuery: string,
    updateIdentifier: number,
  ) {
    // so we get these for reference
    const countryLatitude = this.props.country.latitude;
    const countryLongitude = this.props.country.longitude;

    // and our separator
    const sep = this.props.i18n[this.props.language].word_separator;

    // now the final results based on this
    let finalResults: IPropertyDefinitionSupportedLocationType[];
    try {
      const response = await fetch(
        `/rest/util/location-autocomplete?lat=${countryLatitude}&lng=${countryLongitude}` + 
        `&q=${encodeURIComponent(searchQuery)}&sep=${encodeURIComponent(sep)}&lang=${this.props.language}`,
      );
      if (response.status !== 200) {
        finalResults = [];
      } else {
        finalResults = await response.json();
      }
    } catch (err) {
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
  public onSearchQueryChange(
    searchQuery: string,
    dontAutoloadSuggestions?: boolean,
  ) {
    // same value, do nothing
    if (
      this.props.state.internalValue === searchQuery ||
      this.props.state.value && (this.props.state.value as IPropertyDefinitionSupportedLocationType).txt === searchQuery
    ) {
      return;
    }

    // clear search result because we have changed it
    this.clearSearchResults();

    // clear a current value because now it doesn't match and
    // we are doing a new search
    this.props.onChange(
      null,
      searchQuery,
    );

    // and we do this depending
    if (dontAutoloadSuggestions) {
      return;
    } else if (!searchQuery.trim()) {
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
    } else {
      this.delaySuggestionFetch =
        setTimeout(this.onSearchQueryChangeActual.bind(this, searchQuery, updateIdentifier), 300);
    }
  }

  /**
   * Fed to the renderer to change by suggestion
   * @param suggestion the suggestion we are using
   * @param mantainViewport whether to mantain the viewport
   */
  public onChangeBySuggestion(
    suggestion: IPropertyDefinitionSupportedLocationType,
    mantainViewport?: boolean,
  ) {
    // we just call the manual pick function, given
    // the suggestion is a complete value it won't request
    // geocode
    this.onManualPick(suggestion, mantainViewport);
  }

  /**
   * Fed to the renderer in order to run a search
   * @param mantainViewport whether to mantain the viewport
   */
  public async onSearch(
    mantainViewport?: boolean,
  ) {
    // but what are we searching for, we get the value
    // for it, what is it in our text field?
    const valueToSearch = 
      this.props.state.internalValue ||
      (this.props.state.value && (this.props.state.value as IPropertyDefinitionSupportedLocationType).txt);

    // clear suggestions, we don't need them
    this.clearSuggestions();

    // and we clear the current value
    this.props.onChange(
      null,
      valueToSearch,
    );

    // if we have nothing to search for
    if (!valueToSearch) {
      // we don't run a search we clear it instead
      this.clearSearchResults();
      // nothing happens
      return null;

    // if we are searching the entire same thing, aka
    // smashing search on the same value
    } else if (this.lastSearchValueQ === valueToSearch) {
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
    let finalResults: IPropertyDefinitionSupportedLocationType[] = [];
    try {
      const response = await fetch(
        `/rest/util/location-search?lat=${countryLatitude}&lng=${countryLongitude}` + 
        `&q=${encodeURIComponent(valueToSearch)}&sep=${encodeURIComponent(sep)}&lang=${this.props.language}`,
      );
      if (response.status === 200) {
        finalResults = await response.json();
      }
    } catch (err) {
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
      } else {
        // otherwise set as the suggestion
        // the first one
        this.props.onChange(
          finalResults[0],
          valueToSearch,
        );

        if (!mantainViewport) {
          this.setState({
            viewport: {
              center: [finalResults[0].lat, finalResults[0].lng],
              zoom: IViewportZoomEnumType.LARGE,
            },
            searchResults: finalResults,
            searchCurrentlyMarkedValue: 0,
          });
        } else {
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
  public onChangeBySearchResult(
    searchResult: IPropertyDefinitionSupportedLocationType,
    mantainViewport?: boolean,
  ) {
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
    this.props.onChange(
      searchResult,
      this.props.state.internalValue,
    );

    if (!mantainViewport) {
      this.setState({
        viewport: {
          center: [searchResult.lat, searchResult.lng],
          zoom: IViewportZoomEnumType.LARGE,
        },
        searchCurrentlyMarkedValue: index,
      });
    } else {
      this.setState({
        searchCurrentlyMarkedValue: index,
      });
    }
  }

  public clearSearchResults() {
    this.setState({
      searchResults: null,
      searchCurrentlyMarkedValue: null,
    });
  }

  public clearSuggestions() {
    this.setState({
      suggestions: [],
    });
  }

  /**
   * run the geocode for incomplete values
   * @param value 
   */
  public async geocode(value: IPropertyDefinitionSupportedLocationType) {
    let updatedResult: IPropertyDefinitionSupportedLocationType;
    // so this is the update identifier for this update
    const updateIdentifier = (new Date()).getTime();
    // store it there
    this.geocodeTakingPlace = updateIdentifier;
    try {
      const sep = this.props.i18n[this.props.language].word_separator;
      const response = await fetch(
        `/rest/util/location-geocode?lat=${value.lat}&lng=${value.lng}` + 
        `&q=${encodeURIComponent(value.txt)}&sep=${encodeURIComponent(sep)}&lang=${this.props.language}`,
      );
      if (response.status === 200) {
        updatedResult = await response.json();
      }
    } catch (err) {
    }

    if (updatedResult && this.geocodeTakingPlace === updateIdentifier) {
      this.props.onChange(
        updatedResult,
        updatedResult.txt,
      );
    }
  }

  public onManualPick(
    value: IPropertyDefinitionSupportedLocationType,
    mantainViewport?: boolean,
  ) {
    const croppedValue = {
      txt: value.txt,
      atxt: value.atxt,
      lat: Number(value.lat.toFixed(6)),
      lng: Number(value.lng.toFixed(6)),
      id: value.id,
    };
    // set a place directly from a value
    if (croppedValue.atxt === null || croppedValue.id === null) {
      this.props.onChange(
        {
          ...croppedValue,
          // geocode should replace these soon, put them there like this
          // to avoid it being an invalid value
          id: croppedValue.id || "???" + (new Date()).getTime(),
          atxt: croppedValue.atxt || "???",
        },
        croppedValue.txt,
      );
      this.geocode(croppedValue);
    } else {
      this.props.onChange(
        croppedValue,
        croppedValue.txt,
      );
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
    } else {
      this.setState({
        searchResults: null,
        searchCurrentlyMarkedValue: null,
      });
    }
  }

  public render() {
    // getting the basic data
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = this.props.hideLabel ? null : (typeof this.props.altLabel !== "undefined" ? this.props.altLabel : (i18nData && i18nData.label));
    const i18nDescription = this.props.hideDescription ? null : (typeof this.props.altDescription !== "undefined" ? this.props.altDescription : (i18nData && i18nData.description));
    const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);

    const noResultsLabel = capitalize(this.props.i18n[this.props.language].no_results);
    let resultOutOfLabel: string = null;
    if (this.state.searchResults !== null && this.state.searchResults.length) {
      resultOutOfLabel = localeReplacer(
        capitalize(this.props.i18n[this.props.language].result_out_of),
        this.state.searchCurrentlyMarkedValue + 1,
        this.state.searchResults.length,
      );
    } 

    let resultLabel: string = null;
    if (this.state.searchResults !== null && this.state.searchResults.length) {
      resultLabel = localeReplacer(
        capitalize(this.props.i18n[this.props.language][this.state.searchResults.length === 1 ? "results_singular" : "results"]),
        this.state.searchResults.length,
      );
    } 

    // get the invalid reason if any
    const invalidReason = this.props.state.invalidReason;
    const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
      (this.props.poked || (this.state.showUserSetErrors && this.props.state.userSet)) && invalidReason;
    let i18nInvalidReason = null;
    if (
      isCurrentlyShownAsInvalid && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    }

    const currentValue: IPropertyDefinitionSupportedLocationType = this.props.state.value as IPropertyDefinitionSupportedLocationType;
    const searchQuery = this.props.state.internalValue || (currentValue && currentValue.txt) || "";

    const activeSearchResults = this.state.searchResults;
    const nextSearchResult: IPropertyDefinitionSupportedLocationType =
      (
        activeSearchResults &&
        this.state.searchCurrentlyMarkedValue !== null &&
        activeSearchResults[this.state.searchCurrentlyMarkedValue + 1]
      ) || null;
    const prevSearchResult: IPropertyDefinitionSupportedLocationType = (
      activeSearchResults &&
      this.state.searchCurrentlyMarkedValue !== null &&
      activeSearchResults[this.state.searchCurrentlyMarkedValue - 1]
    ) || null;;
    const nextSearchResultCircular =
      nextSearchResult ||
      (activeSearchResults && activeSearchResults[0] ) ||
      null;
    const prevSearchResultCircular =
      prevSearchResult ||
      (activeSearchResults && activeSearchResults[activeSearchResults.length - 1] ) ||
      null;

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryLocationRendererProps = {
      propertyId: this.props.property.getId(),
      uniqueId: this.props.property.getUniqueIdentifier(this.props.forId, this.props.forVersion),

      args: this.props.rendererArgs || {},
      rtl: this.props.rtl,
      label: i18nLabel,
      noResultsLabel,
      resultOutOfLabel,
      resultLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      language: this.props.language,
      languageOverride: this.props.languageOverride,

      currentAppliedValue: this.props.state.stateAppliedValue as IPropertyDefinitionSupportedLocationType,
      currentValue,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,

      disabled:
        typeof this.props.disabled !== "undefined" && this.props.disabled !== null ?
        this.props.disabled :
        this.props.state.enforced,
      autoFocus: this.props.autoFocus || false,
      onChange: this.props.onChange,
      onRestore: this.onRestoreHijacked,
      canRestore: !this.props.property.getPropertyDefinitionDescription().localEqual(
        {
          itemDefinition: this.props.itemDefinition, 
          a: this.props.state.stateAppliedValue,
          b: this.props.state.value,
          id: this.props.property.getId(),
          include: null,
          prefix: "",
          property: this.props.property,
        }
      ),

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

      enableUserSetErrors: this.enableUserSetErrors,
    };

    return <RendererElement {...rendererArgs} />;
  }
}
