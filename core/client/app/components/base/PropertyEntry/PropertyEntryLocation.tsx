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

interface IViewport {
  center: [number, number];
  zoom: number;
}

interface IPropertyEntryLocationState {
  suggestions: IHereResult[];
  viewport: IViewport;
  searchResults: IHereResult[];
  searchQuery: string;
  searchCurrentlyMarkedValue: number;
}

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

  private updateTakingPlace: number;
  private searchTakingPlace: number;
  private delaySuggestionFetch: NodeJS.Timeout;
  private lastSuggestionsValue: IHereResult[];
  private lastSuggestionsValueQ: string;
  private lastSearchValue: IHereResult[];
  private lastSearchValueQ: string;

  constructor(props: IPropertyEntryProps) {
    super(props);

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

  public onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    autosuggestOverride: Autosuggest.ChangeEvent,
  ) {
    const suggestionFound = this.state.suggestions.find((s) => {
      return s.title === autosuggestOverride.newValue;
    });

    this.props.onChange(
      suggestionFound ?
        processSuggestion(this.props.i18n.word_separator, suggestionFound) :
        null,
      autosuggestOverride.newValue,
    );
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
    this.props.onChange(
      processSuggestion(this.props.i18n.word_separator, suggestion),
      suggestion.title,
    );
    this.setState({
      viewport: {
        center: suggestion.position,
        zoom: 14,
      },
    });
  }

  public async search() {
    const value = this.props.value.internalValue;
    const countryLatitude = this.props.country.latitude;
    const countryLongitude = this.props.country.longitude;
    const url = "https://places.cit.api.here.com/places/v1/discover/search";
    const appId = (window as any).HERE_APP_ID;
    const appCode = (window as any).HERE_APP_CODE;

    const options = {
      method: "GET",
      headers: new Headers({
        "Accept-Language": `${this.props.language}, en-US;q=0.9, en;q=0.9, es-419;q=0.8, es;q=0.7`,
      }),
    };

    const thisUpdateIdentifier = (new Date()).getTime();
    this.searchTakingPlace = thisUpdateIdentifier;

    const results: IHereResult[] = this.lastSearchValueQ === value ? this.lastSearchValue : (await fetch(
      `${url}?at=${countryLatitude},${countryLongitude}&q=${value}&app_id=${appId}&app_code=${appCode}`,
      options,
    ).then((r) => r.json())).results.items.filter((r: IHereResult, index: number, arr: IHereResult[]) => {
      return arr.findIndex((r2: IHereResult) => equals(r2.position, r.position)) === index;
    });

    if (thisUpdateIdentifier === this.searchTakingPlace) {
      this.lastSearchValue = results;
      this.lastSearchValueQ = value;

      const foundSomething = results.length !== 0;

      if (!foundSomething) {
        this.props.onChange(null, value);
      } else {
        this.props.onChange(
          processSuggestion(
            this.props.i18n.word_separator,
            results[0],
            value,
          ),
          value,
        );
      }

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
        this.setState({
          searchResults: results,
          searchQuery: value,
          searchCurrentlyMarkedValue: null,
        });
      }
    }
  }

  public swapLocation() {
    if (!this.state.searchResults.length) {
      return;
    }

    let newSearchCurrentlyMarkedValue = this.state.searchCurrentlyMarkedValue + 1;
    let newEndpointData: IHereResult = this.state.searchResults[newSearchCurrentlyMarkedValue];

    if (!newEndpointData) {
      newSearchCurrentlyMarkedValue = 0;
      newEndpointData = this.state.searchResults[0];
    }

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
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const className = getClassName(this.props, "location", this.props.poked);
    const i18nLabel = i18nData && i18nData.label;
    const i18nPlaceholder = i18nData && i18nData.placeholder;

    const invalidReason = this.props.value.invalidReason;
    let i18nInvalidReason = null;
    if (
      (this.props.poked || this.props.value.userSet) &&
      invalidReason && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
        i18nInvalidReason = i18nData.error[invalidReason];
    }

    const enableSwapAroundLocations =
      this.state.searchQuery === this.props.value.internalValue &&
      this.state.searchResults.length > 1;

    let appliedTextFieldProps: any = {};
    let appliedInputProps: any = {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            classes={{root: "property-entry--location--button"}}
            onClick={enableSwapAroundLocations ? this.swapLocation : this.search}
          >
            <Icon classes={{root: "property-entry--icon"}}>
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

    const currentValue = textFieldProps &&  textFieldProps.value ? textFieldProps.value : (
      this.props.value.internalValue !== null ?
      this.props.value.internalValue :
      (this.props.value.value ? (this.props.value.value as IPropertyDefinitionSupportedLocationType).txt : "")
    );

    const currentLocationToMark = this.props.value.value && [
      (this.props.value.value as IPropertyDefinitionSupportedLocationType).lat,
      (this.props.value.value as IPropertyDefinitionSupportedLocationType).lng,
    ];

    const currentLocationDataTxt = this.props.value.value &&
      (this.props.value.value as IPropertyDefinitionSupportedLocationType).txt;

    const currentLocationDataATxt = this.props.value.value &&
      (this.props.value.value as IPropertyDefinitionSupportedLocationType).atxt;

    return (
      <div className="property-entry--container">
        <div className="property-entry--location--map-container">
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
            {this.state.searchResults
              .filter((result) => !equals(currentLocationToMark, result.position))
              .map((result) => (
                <Marker
                  opacity={0.5}
                  key={result.id}
                  position={result.position}
                  onClick={this.onSearchMarkerClick.bind(this, result)}
                />
            ))}
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
              root: "property-entry--input",
              focused: "focused",
            },
            ...appliedInputProps,
          }}
          InputLabelProps={{
            classes: {
              root: "property-entry--label",
              focused: "focused",
            },
          }}
          disabled={this.props.value.enforced}
          variant="filled"
          {...appliedTextFieldProps}
        />
        <div className="property-entry--error">
          {i18nInvalidReason}
        </div>
      </div>
    );
  }

  public renderAutosuggestContainer(
    options: Autosuggest.RenderSuggestionsContainerParams,
  ) {
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
    return (
      <MenuItem
        className="property-entry--location--autocomplete-suggestion-menu-item"
        selected={params.isHighlighted}
        component="div"
        onClick={this.setPlaceFrom.bind(this, suggestion)}
      >
        <div className="property-entry--location--autocomplete-suggestion-data">
          <div
            className="property-entry--location--autocomplete-suggestion-txt"
            dangerouslySetInnerHTML={{__html: suggestion.highlightedTitle}}
          />
          <div className="property-entry--location--autocomplete-suggestion-atxt">
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
    clearTimeout(this.delaySuggestionFetch);

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
    const resultSearchIndex = this.state.searchResults.findIndex((r) => r.id === result.id);

    this.props.onChange(
      processSuggestion(this.props.i18n.word_separator, result, this.props.value.internalValue),
      this.props.value.internalValue,
    );
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
            "property-entry--location--autocomplete-container",
          containerOpen:
            "property-entry--location--autocomplete-container--open",
          input:
            "property-entry--location--autocomplete-input",
          inputOpen:
            "property-entry--location--autocomplete-input--open",
          inputFocused:
            "focused",
          suggestionsContainer:
            "property-entry--location--autocomplete-suggestions-container",
          suggestionsContainerOpen:
            "property-entry--location--autocomplete-suggestions-container--open",
          suggestionsList:
            "property-entry--location--autocomplete-suggestions-list",
          suggestion:
            "property-entry--location--autocomplete-suggestion",
          suggestionFirst:
            "property-entry--location--autocomplete-first-suggestion",
          suggestionHighlighted:
            "property-entry--location--autocomplete-highlighted-suggestion",
          sectionContainer:
            "property-entry--location--autocomplete-section-container",
          sectionContainerFirst:
            "property-entry--location--autocomplete-first-section-container",
          sectionTitle:
            "property-entry--location--autocomplete-section-title",
        }}
        inputProps={{
          value: currentValue,
          onChange: this.onChange,
          className: "property-entry--location--autocomplete",
        }}
      />
    );
  }
}
