import React from "react";
import { IPropertyEntryProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";
import { IPropertyDefinitionSupportedLocationType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";

export enum IViewportZoomEnumType {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

// the viewport for the map
interface IViewport {
  center: [number, number];
  zoom: IViewportZoomEnumType | number;
}

export interface IPropertyEntryLocationRendererProps extends IPropertyEntryRendererProps<IPropertyDefinitionSupportedLocationType> {
  onViewportChange: (viewport: IViewport) => void;
  onSearchQueryChange: (
    searchQuery: string,
    dontAutoloadSuggestions?: boolean,
    mantainViewport?: boolean,
  ) => void;
  onSearch: (
    mantainViewport?: boolean,
  ) => Promise<IPropertyDefinitionSupportedLocationType[]>;
  onChangeBySearchResult: (
    searchResult: IPropertyDefinitionSupportedLocationType,
    mantainViewport?: boolean,
  ) => void;
  onChangeBySuggestion: (
    searchSuggestion: IPropertyDefinitionSupportedLocationType,
    mantainViewport?: boolean,
  ) => void;
  clearSuggestions: () => void;
  onManualPick: (
    value: IPropertyDefinitionSupportedLocationType,
    mantainViewport?: boolean,
  ) => void;

  viewport: IViewport;
  searchSuggestions: IPropertyDefinitionSupportedLocationType[];
  activeSearchResults: IPropertyDefinitionSupportedLocationType[];
  nextSearchResult: IPropertyDefinitionSupportedLocationType;
  prevSearchResult: IPropertyDefinitionSupportedLocationType;
  searchQuery: string;
}

// the interface that roughly represents a result from the
// here we go API, check the API at
// https://places.demo.api.here.com/places/v1/autosuggest
interface IHereResult {
  title: string;
  highlightedTitle: string;
  vicinity?: string;
  highlightedVicinity?: string;
  position: [number, number];
  category: string;
  categoryTitle: string;
  bbox?: [number, number, number, number];
  href?: string;
  type: string;
  resultType: string;
  id: string;
  distance: number;
}

// location state, sadly it needs a lot in the state
// department
interface IPropertyEntryLocationState {
  suggestions: IPropertyDefinitionSupportedLocationType[];
  viewport: IViewport;
  searchResults: IPropertyDefinitionSupportedLocationType[];
  searchCurrentlyMarkedValue: number;
}

// converts a suggestion to our lovely location type
function processSuggestion(wordSeparator: string, suggestion: IHereResult, overwriteTxt?: string) {
  return {
    lat: suggestion.position[0],
    lng: suggestion.position[1],
    txt: overwriteTxt || suggestion.title,
    atxt: suggestion.vicinity ? suggestion.vicinity.replace(/\<br\/\>/g, wordSeparator + " ") : null,
  };
}

export default class PropertyEntryLocation
  extends React.Component<
    IPropertyEntryProps<IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps>,
    IPropertyEntryLocationState
  > {

  // stores a time identifier of the latest update executed
  private updateTakingPlace: number;
  // does the same but for search
  private searchTakingPlace: number;
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

  constructor(props: IPropertyEntryProps<IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps>) {
    super(props);

    // set the initial state
    this.state = {
      suggestions: [],
      viewport: {
        center: [props.country.latitude, props.country.longitude],
        zoom: IViewportZoomEnumType.SMALL,
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
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryProps<IPropertyDefinitionSupportedLocationType, IPropertyEntryLocationRendererProps>,
    nextState: IPropertyEntryLocationState,
  ) {
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.state, nextState) ||
      !equals(this.props.state, nextProps.state) ||
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
      !equals(this.props.rendererArgs, nextProps.rendererArgs);
  }

  public onViewportChange(
    viewport: IViewport,
  ) {
    this.setState({
      viewport,
    });
  }

  public async onSearchQueryChangeActual(
    searchQuery: string,
    mantainViewport?: boolean,
  ) {
    const countryLatitude = this.props.country.latitude;
    const countryLongitude = this.props.country.longitude;
    const url = "https://places.cit.api.here.com/places/v1/autosuggest";
    const appId = (window as any).HERE_APP_ID;
    const appCode = (window as any).HERE_APP_CODE;

    const options = {
      method: "GET",
      headers: new Headers({
        "Accept-Language": `${this.props.language}, en-US;q=0.9, en;q=0.9, es-419;q=0.8, es;q=0.7`,
      }),
    };

    const thisUpdateIdentifier = (new Date()).getTime();
    this.updateTakingPlace = thisUpdateIdentifier;

    let finalResults: IPropertyDefinitionSupportedLocationType[];
    try {
      const data = await fetch(
        `${url}?at=${countryLatitude},${countryLongitude}&q=${searchQuery}&app_id=${appId}&app_code=${appCode}&size=6`,
        options,
      ).then((r) => r.json());

      data.results = data.results.filter((s: IHereResult) => s.position);
      finalResults = data.results.map((r: IHereResult) => processSuggestion(
        this.props.i18n[this.props.language].word_separator,
        r,
      ));

      if (thisUpdateIdentifier === this.updateTakingPlace) {
        this.lastSuggestionsValue = finalResults;
        this.lastSuggestionsValueQ = searchQuery;
        this.setState({
          suggestions: data.results,
        });
      }
    } catch (err) {
      finalResults = [];
    }

    // basically we always have the autosuggest override here
    // we just match it against the suggestions if we can
    const suggestionFound = this.state.suggestions.find((s) => {
      return s.txt.toLowerCase() === searchQuery.toLowerCase();
    });

    if (suggestionFound) {
      this.onChangeBySuggestion(
        suggestionFound,
        mantainViewport,
      );
    } else {
      // and set the value to onchange
      this.props.onChange(
        suggestionFound || null,
        searchQuery,
      );
    }
  }

  public onSearchQueryChange(
    searchQuery: string,
    dontAutoloadSuggestions?: boolean,
    mantainViewport?: boolean,
  ) {
    if (this.props.state.internalValue === searchQuery) {
      return;
    }

    this.props.onChange(
      null,
      searchQuery,
    );

    if (dontAutoloadSuggestions) {
      return;
    }

    // we put some delay here, for 300ms wait until the user
    // stops typing for actually doing the search, we don't need
    // to search every damn keystroke
    clearTimeout(this.delaySuggestionFetch);

    // also if we get the same thing, as before, just
    // set the state as the same value as before, this happens, very often
    // when the element loses and regains focus
    if (this.lastSuggestionsValueQ === searchQuery) {
      this.setState({
        suggestions: this.lastSuggestionsValue,
      });
    } else {
      this.delaySuggestionFetch =
        setTimeout(this.onSearchQueryChangeActual.bind(this, searchQuery, mantainViewport), 300);
    }
  }

  public onChangeBySuggestion(
    suggestion: IPropertyDefinitionSupportedLocationType,
    mantainViewport?: boolean,
  ) {
    this.onManualPick(suggestion, mantainViewport);
  }

  public async onSearch(
    mantainViewport?: boolean,
  ) {
    if (!this.props.state.internalValue) {
      return null;
    } else if (this.lastSearchValueQ === this.props.state.internalValue) {
      this.setState({
        searchResults: this.lastSearchValue,
        searchCurrentlyMarkedValue: 0,
      });
      return this.lastSearchValue;
    }
    // basically making a search request, we use the
    // internal value for this, as well as the country
    // latitude and longitude of the locale data
    const value = this.props.state.internalValue;
    const countryLatitude = this.props.country.latitude;
    const countryLongitude = this.props.country.longitude;
    const url = "https://places.cit.api.here.com/places/v1/discover/search";
    const appId = (window as any).HERE_APP_ID;
    const appCode = (window as any).HERE_APP_CODE;

    if (!appId || !appCode) {
      console.warn("Here Maps has not been configured and as such search is unavailable");
      return;
    }

    // we use the language as the main expected result
    const options = {
      method: "GET",
      headers: new Headers({
        "Accept-Language": `${this.props.language}, en-US;q=0.9, en;q=0.9, es-419;q=0.8, es;q=0.7`,
      }),
    };

    // so this is the update identifier for this update
    const thisUpdateIdentifier = (new Date()).getTime();
    // store it there
    this.searchTakingPlace = thisUpdateIdentifier;

    // make the async request to the here API
    let finalResults: IPropertyDefinitionSupportedLocationType[] = null;
    try {
      const results: IHereResult[] = this.lastSearchValueQ === value ? this.lastSearchValue : (await fetch(
        `${url}?at=${countryLatitude},${countryLongitude}&q=${value}&app_id=${appId}&app_code=${appCode}`,
        options,
      ).then((r) => r.json())).results.items.filter((r: IHereResult, index: number, arr: IHereResult[]) => {
        return arr.findIndex((r2: IHereResult) => equals(r2.position, r.position)) === index;
      });

      if (results && results.length !== 0) {
        finalResults = results.map((r) => processSuggestion(
          this.props.i18n[this.props.language].word_separator,
          r,
          value,
        ));
      }
    } catch (err) {
    }
    

    // due to the async nature some crazy stacking might have happened
    // let's check that only the last one can set the state
    if (thisUpdateIdentifier === this.searchTakingPlace) {
      // store the last searched then
      this.lastSearchValue = finalResults;
      this.lastSearchValueQ = value;

      // if we don't bad luck, null everything
      if (!finalResults) {
        this.props.onChange(null, value);

        this.setState({
          searchResults: null,
          searchCurrentlyMarkedValue: null,
        });
      } else {
        // otherwise set as the suggestion
        // the first one
        this.props.onChange(
          finalResults[0],
          value,
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

  public onChangeBySearchResult(
    searchResult: IPropertyDefinitionSupportedLocationType,
    mantainViewport?: boolean,
  ) {
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

  public clearSuggestions() {
    this.setState({
      suggestions: [],
    });
  }

  public onManualPick(
    value: IPropertyDefinitionSupportedLocationType,
    mantainViewport?: boolean,
  ) {
    // set a place directly from a value
    this.props.onChange(
      value,
      value.txt,
    );
    if (!mantainViewport) {
      // center the viewport there
      this.setState({
        viewport: {
          center: [value.lat, value.lng],
          zoom: IViewportZoomEnumType.MEDIUM,
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
    const i18nLabel = this.props.altLabel || (i18nData && i18nData.label);
    const i18nDescription = this.props.hideDescription ? null : (this.props.altDescription || (i18nData && i18nData.description));
    const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);

    // get the invalid reason if any
    const invalidReason = this.props.state.invalidReason;
    const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
      (this.props.poked || this.props.state.userSet) && invalidReason;
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
        this.state.searchCurrentlyMarkedValue &&
        activeSearchResults[this.state.searchCurrentlyMarkedValue + 1]
      ) || null;
    const prevSearchResult: IPropertyDefinitionSupportedLocationType = (
      activeSearchResults &&
      this.state.searchCurrentlyMarkedValue &&
      activeSearchResults[this.state.searchCurrentlyMarkedValue - 1]
    ) || null;;

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryLocationRendererProps = {
      args: this.props.rendererArgs,
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      icon: this.props.icon,

      currentValue,
      currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: i18nInvalidReason,
      currentInternalValue: this.props.state.internalValue,

      disabled: this.props.state.enforced,
      autoFocus: this.props.autoFocus || false,
      onChange: this.props.onChange,

      onChangeBySearchResult: this.onChangeBySearchResult,
      onChangeBySuggestion: this.onChangeBySuggestion,
      onManualPick: this.onManualPick,
      onSearchQueryChange: this.onSearchQueryChange,
      onSearch: this.onSearch,
      onViewportChange: this.onViewportChange,
      clearSuggestions: this.clearSuggestions,

      viewport: this.state.viewport,
      searchSuggestions: this.state.suggestions,
      searchQuery,
      activeSearchResults,
      nextSearchResult,
      prevSearchResult,
    };

    return <RendererElement {...rendererArgs} />;
  }
}
