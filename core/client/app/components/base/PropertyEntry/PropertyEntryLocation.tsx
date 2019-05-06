import React from "react";
import { IPropertyEntryProps, getClassName } from ".";
import {
  IPropertyDefinitionSupportedLocationType,
} from "../../../../../base/ItemDefinition/PropertyDefinition";
import TextField from "@material-ui/core/TextField";
import {
  MenuItem,
  Paper,
  InputAdornment,
  Icon,
  IconButton,
} from "@material-ui/core";
import Autosuggest from "react-autosuggest";
import equals from "deep-equal";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "../../../../theme/leaflet.scss";

// https://github.com/PaulLeCam/react-leaflet/issues/453
// bug in leaflet
delete (L.Icon as any).Default.prototype._getIconUrl;
(L.Icon as any).Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

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

// the viewport for the map
interface IViewport {
  center: [number, number];
  zoom: number;
}

// location state, sadly it needs a lot in the state
// department
interface IPropertyEntryLocationState {
  suggestions: IHereResult[];
  viewport: IViewport;
  searchResults: IHereResult[];
  searchQuery: string;
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
  extends React.Component<IPropertyEntryProps, IPropertyEntryLocationState> {

  // stores a time identifier of the latest update executed
  private updateTakingPlace: number;
  // does the same but for search
  private searchTakingPlace: number;
  // the delay for the fetching, if you are typing fast,
  // we don't want to call every time
  private delaySuggestionFetch: NodeJS.Timeout;
  // the last suggestions value
  private lastSuggestionsValue: IHereResult[];
  // the query used then
  private lastSuggestionsValueQ: string;
  // the same but for search
  private lastSearchValue: IHereResult[];
  private lastSearchValueQ: string;

  constructor(props: IPropertyEntryProps) {
    super(props);

    // set the initial state
    this.state = {
      suggestions: [],
      viewport: {
        center: [props.country.latitude, props.country.longitude],
        zoom: 4,
      },
      searchResults: [],
      searchQuery: null,
      searchCurrentlyMarkedValue: null,
    };

    this.onChange = this.onChange.bind(this);
    this.setPlaceFrom = this.setPlaceFrom.bind(this);
    this.renderBasicTextField = this.renderBasicTextField.bind(this);
    this.onSearchMarkerClick = this.onSearchMarkerClick.bind(this);
    this.renderAutosuggestSuggestion = this.renderAutosuggestSuggestion.bind(this);
    this.renderAutosuggestContainer = this.renderAutosuggestContainer.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsFetchActuallyRequested = this.onSuggestionsFetchActuallyRequested.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.clearSuggestions = this.clearSuggestions.bind(this);
    this.search = this.search.bind(this);
    this.swapLocation = this.swapLocation.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryProps,
    nextState: IPropertyEntryLocationState,
  ) {
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.state, nextState) ||
      !equals(this.props.value, nextProps.value) ||
      !!this.props.poked !== !!nextProps.poked ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.country !== this.props.country;
  }

  public onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    autosuggestOverride: Autosuggest.ChangeEvent,
  ) {
    // basically we always have the autosuggest override here
    // we just match it against the suggestions if we can
    const suggestionFound = this.state.suggestions.find((s) => {
      return s.title === autosuggestOverride.newValue;
    });

    // and set the value to onchange
    this.props.onChange(
      suggestionFound ?
        processSuggestion(this.props.i18n.word_separator, suggestionFound) :
        null,
      autosuggestOverride.newValue,
    );

    // if we found something, set the viewport there,
    // remove the search query, results, and marked value
    // of the search
    if (suggestionFound) {
      this.setState({
        viewport: {
          center: suggestionFound.position,
          zoom: 16,
        },
        searchResults: [],
        searchQuery: null,
        searchCurrentlyMarkedValue: null,
      });
    } else {
      // otherwise still remove search data
      this.setState({
        searchResults: [],
        searchQuery: null,
        searchCurrentlyMarkedValue: null,
      });
    }
  }

  public setPlaceFrom(
    suggestion: IHereResult,
  ) {
    // set a place directly from a suggestion
    this.props.onChange(
      processSuggestion(this.props.i18n.word_separator, suggestion),
      suggestion.title,
    );
    // center the viewport there
    this.setState({
      viewport: {
        center: suggestion.position,
        zoom: 14,
      },
    });
  }

  public async search() {
    if (!this.props.value.internalValue) {
      return;
    }
    // basically making a search request, we use the
    // internal value for this, as well as the country
    // latitude and longitude of the locale data
    const value = this.props.value.internalValue;
    const countryLatitude = this.props.country.latitude;
    const countryLongitude = this.props.country.longitude;
    const url = "https://places.cit.api.here.com/places/v1/discover/search";
    const appId = (window as any).HERE_APP_ID;
    const appCode = (window as any).HERE_APP_CODE;

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
    const results: IHereResult[] = this.lastSearchValueQ === value ? this.lastSearchValue : (await fetch(
      `${url}?at=${countryLatitude},${countryLongitude}&q=${value}&app_id=${appId}&app_code=${appCode}`,
      options,
    ).then((r) => r.json())).results.items.filter((r: IHereResult, index: number, arr: IHereResult[]) => {
      return arr.findIndex((r2: IHereResult) => equals(r2.position, r.position)) === index;
    });

    // due to the async nature some crazy stacking might have happened
    // let's check that only the last one can set the state
    if (thisUpdateIdentifier === this.searchTakingPlace) {

      // store the last searched then
      this.lastSearchValue = results;
      this.lastSearchValueQ = value;

      // check whether we found any results
      const foundSomething = results.length !== 0;

      // if we don't bad luck, null everything
      if (!foundSomething) {
        this.props.onChange(null, value);
      } else {
        // otherwise set as the suggestion
        // the first one
        this.props.onChange(
          processSuggestion(
            this.props.i18n.word_separator,
            results[0],
            value,
          ),
          value,
        );
      }

      // and again set the viewport and answer to the first result
      if (foundSomething) {
        this.setState({
          viewport: {
            center: results[0].position,
            zoom: 16,
          },
          searchResults: results,
          searchQuery: value,
          searchCurrentlyMarkedValue: 0,
        });
      } else {
        // otherwise if not found anything, still set the results
        // but set no marked value
        this.setState({
          searchResults: results,
          searchQuery: value,
          searchCurrentlyMarkedValue: null,
        });
      }
    }
  }

  public swapLocation() {
    // swap the location for the search result
    // to another one of the answers

    if (!this.state.searchResults.length) {
      return;
    }

    // let's find the index of the current and add one
    let newSearchCurrentlyMarkedValue = this.state.searchCurrentlyMarkedValue + 1;
    let newEndpointData: IHereResult = this.state.searchResults[newSearchCurrentlyMarkedValue];

    // we might be out of bounds, loop around in that case to the first one again
    if (!newEndpointData) {
      newSearchCurrentlyMarkedValue = 0;
      newEndpointData = this.state.searchResults[0];
    }

    // call onchange and set the viewport
    this.props.onChange(
      processSuggestion(
        this.props.i18n.word_separator,
        newEndpointData,
        this.props.value.internalValue,
      ),
      this.props.value.internalValue,
    );
    this.setState({
      viewport: {
        center: newEndpointData.position,
        zoom: 16,
      },
      searchCurrentlyMarkedValue: newSearchCurrentlyMarkedValue,
    });
  }

  public onKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    // basically we want to trigger swap or search on enter
    if (e.key === "Enter") {
      const swapAroundLocationsEnabled =
        this.state.searchQuery === this.props.value.internalValue &&
        this.state.searchResults.length > 1;

      if (swapAroundLocationsEnabled) {
        this.swapLocation();
      } else {
        this.search();
      }
    }
  }

  public renderBasicTextField(textFieldProps?: any) {
    // get the basic data
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const className = getClassName(this.props, "location", this.props.poked);
    const i18nLabel = i18nData && i18nData.label;
    const i18nDescription = i18nData && i18nData.description;
    const i18nPlaceholder = i18nData && i18nData.placeholder;

    // the invalid reason
    const invalidReason = this.props.value.invalidReason;
    let i18nInvalidReason = null;
    if (
      (this.props.poked || this.props.value.userSet) &&
      invalidReason && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
        i18nInvalidReason = i18nData.error[invalidReason];
    }

    // swapping around is only enabled if we got search results
    // and we haven't changed our search query to what we searched
    // then
    const enableSwapAroundLocations =
      this.state.searchQuery === this.props.value.internalValue &&
      this.state.searchResults.length > 1;

    // We do something similar to the field
    let appliedTextFieldProps: any = {};
    let appliedInputProps: any = {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            disabled={this.props.value.enforced}
            classes={{root: "property-entry-location-button"}}
            onClick={enableSwapAroundLocations ? this.swapLocation : this.search}
          >
            <Icon>
              {enableSwapAroundLocations ? "swap_horiz" : "search"}
            </Icon>
          </IconButton>
        </InputAdornment>
      ),
    };
    if (textFieldProps) {
      const { inputRef = () => {return; } , ref, ...other } = textFieldProps;
      appliedTextFieldProps = other;
      appliedInputProps = {
        ...appliedInputProps,
        inputRef: (node: HTMLInputElement) => {
          ref(node);
          inputRef(node);
        },
      };

      if (appliedTextFieldProps.className) {
        appliedTextFieldProps.className += " " + className;
      }
    }

    // get the current value, the txt is the value as it is input
    const currentValue = textFieldProps &&  textFieldProps.value ? textFieldProps.value : (
      this.props.value.internalValue !== null ?
      this.props.value.internalValue :
      (this.props.value.value ? (this.props.value.value as IPropertyDefinitionSupportedLocationType).txt : "")
    );

    // the location to mark is the currently set value
    const currentLocationToMark = this.props.value.value && [
      (this.props.value.value as IPropertyDefinitionSupportedLocationType).lat,
      (this.props.value.value as IPropertyDefinitionSupportedLocationType).lng,
    ];

    // the txt
    const currentLocationDataTxt = this.props.value.value &&
      (this.props.value.value as IPropertyDefinitionSupportedLocationType).txt;

    // and the alternative txt data
    const currentLocationDataATxt = this.props.value.value &&
      (this.props.value.value as IPropertyDefinitionSupportedLocationType).atxt;

    return (
      <div className="property-entry-container">
        {i18nDescription ? <div className="property-entry-description">
          <Icon>keyboard_arrow_down</Icon>{i18nDescription}</div> : null}
        <div className="property-entry-location-atxt">
          {currentLocationDataATxt}
        </div>
        <div className="property-entry-location-map-container">
          <Map
            viewport={this.state.viewport}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {currentLocationToMark ? <Marker position={currentLocationToMark}>
              <Popup>{currentLocationDataTxt}{currentLocationDataATxt ? <br/> : null}{currentLocationDataATxt}</Popup>
            </Marker> : null}
            {!this.props.value.enforced ? this.state.searchResults
              .filter((result) => !equals(currentLocationToMark, result.position))
              .map((result) => (
                <Marker
                  opacity={0.5}
                  key={result.id}
                  position={result.position}
                  onClick={this.onSearchMarkerClick.bind(this, result)}
                />
            )) : null}
          </Map>
        </div>
        <TextField
          fullWidth={true}
          type="search"
          onKeyPress={this.onKeyPress}
          className={className}
          label={i18nLabel}
          onChange={this.onChange}
          placeholder={i18nPlaceholder}
          value={currentValue}
          InputProps={{
            classes: {
              root: "property-entry-input",
              focused: "focused",
            },
            disabled: this.props.value.enforced,
            ...appliedInputProps,
          }}
          InputLabelProps={{
            classes: {
              root: "property-entry-label",
              focused: "focused",
            },
          }}
          disabled={this.props.value.enforced}
          variant="filled"
          {...appliedTextFieldProps}
        />
        <div className="property-entry-error">
          {i18nInvalidReason}
        </div>
      </div>
    );
  }

  public renderAutosuggestContainer(
    options: Autosuggest.RenderSuggestionsContainerParams,
  ) {
    // same renders the autosuggest container
    return (
      <Paper
        {...options.containerProps}
        square={true}
      >
        {options.children}
      </Paper>
    );
  }

  public renderAutosuggestSuggestion(
    suggestion: IHereResult,
    params: Autosuggest.RenderSuggestionParams,
  ) {
    // here returns some nice html for showing
    // highlighs already so there's no need for them
    // however we need to replace the <br> that come to commas
    // because we don't want <br>
    return (
      <MenuItem
        className="property-entry-location-autocomplete-suggestion-menu-item"
        selected={params.isHighlighted}
        component="div"
        onClick={this.setPlaceFrom.bind(this, suggestion)}
      >
        <div className="property-entry-location-autocomplete-suggestion-data">
          <div
            className="property-entry-location-autocomplete-suggestion-txt"
            dangerouslySetInnerHTML={{__html: suggestion.highlightedTitle}}
          />
          <div className="property-entry-location-autocomplete-suggestion-atxt">
            {
              suggestion.vicinity ?
              suggestion.vicinity.replace(/\<br\/\>/g, this.props.i18n.word_separator + " ") :
              null
            }
          </div>
        </div>
      </MenuItem>
    );
  }

  public getSuggestionValue(
    suggestion: IHereResult,
  ) {
    // just return the title
    return suggestion.title;
  }

  public async onSuggestionsFetchActuallyRequested(value: string) {
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

    const data = await fetch(
      `${url}?at=${countryLatitude},${countryLongitude}&q=${value}&app_id=${appId}&app_code=${appCode}&size=6`,
      options,
    ).then((r) => r.json());

    data.results = data.results.filter((s: IHereResult) => s.position);

    if (thisUpdateIdentifier === this.updateTakingPlace) {
      this.lastSuggestionsValue = data.results;
      this.lastSuggestionsValueQ = value;
      this.setState({
        suggestions: data.results,
      });
    }
  }

  public async onSuggestionsFetchRequested({value}) {
    // we put some delay here, for 300ms wait until the user
    // stops typing for actually doing the search, we don't need
    // to search every damn keystroke
    clearTimeout(this.delaySuggestionFetch);

    // also if we get the same thing, as before, just
    // set the state as the same value as before, this happens, very often
    // when the element loses and regains focus
    if (this.lastSuggestionsValueQ === value) {
      this.setState({
        suggestions: this.lastSuggestionsValue,
      });
    } else {
      this.delaySuggestionFetch =
        setTimeout(this.onSuggestionsFetchActuallyRequested.bind(this, value), 300);
    }
  }

  public onSearchMarkerClick(result: IHereResult) {
    // markers are setup to searches, we need to find the search index nevertheless that
    // marker was about
    const resultSearchIndex = this.state.searchResults.findIndex((r) => r.id === result.id);

    // set the change
    this.props.onChange(
      processSuggestion(this.props.i18n.word_separator, result, this.props.value.internalValue),
      this.props.value.internalValue,
    );
    // set the viewport, and update the index of the marked value
    this.setState({
      viewport: {
        center: result.position,
        zoom: 14,
      },
      searchCurrentlyMarkedValue: resultSearchIndex,
    });
  }

  public clearSuggestions() {
    this.setState({
      suggestions: [],
    });
  }

  public render() {
    // render the thing
    const currentValue = this.props.value.internalValue !== null ?
      this.props.value.internalValue :
      (this.props.value.value ? (this.props.value.value as IPropertyDefinitionSupportedLocationType).txt : "");
    return (
      <Autosuggest
        renderInputComponent={this.renderBasicTextField}
        renderSuggestionsContainer={this.renderAutosuggestContainer}
        renderSuggestion={this.renderAutosuggestSuggestion}
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.clearSuggestions}
        suggestions={this.state.suggestions}
        theme={{
          container:
            "property-entry-location-autocomplete-container",
          containerOpen:
            "property-entry-location-autocomplete-container--open",
          input:
            "property-entry-location-autocomplete-input",
          inputOpen:
            "property-entry-location-autocomplete-input--open",
          inputFocused:
            "focused",
          suggestionsContainer:
            "property-entry-location-autocomplete-suggestions-container",
          suggestionsContainerOpen:
            "property-entry-location-autocomplete-suggestions-container--open",
          suggestionsList:
            "property-entry-location-autocomplete-suggestions-list",
          suggestion:
            "property-entry-location-autocomplete-suggestion",
          suggestionFirst:
            "property-entry-location-autocomplete-suggestion--first",
          suggestionHighlighted:
            "property-entry-location-autocomplete-suggestion--highlighted",
          sectionContainer:
            "property-entry-location-autocomplete-section-container",
          sectionContainerFirst:
            "property-entry-location-autocomplete-section-container--first",
          sectionTitle:
            "property-entry-location-autocomplete-section-title",
        }}
        inputProps={{
          value: currentValue,
          onChange: this.onChange,
          className: "property-entry-location-autocomplete",
        }}
      />
    );
  }
}
