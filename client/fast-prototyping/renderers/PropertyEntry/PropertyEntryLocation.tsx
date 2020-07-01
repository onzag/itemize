import "../../../internal/theme/leaflet.scss";

import React from "react";
import {
  MenuItem,
  Paper,
  InputAdornment,
  IconButton,
  Typography,
  createStyles,
  WithStyles,
  withStyles,
  Alert,
  RestoreIcon,
  ClearIcon,
  SearchIcon,
  SwapHorizIcon,
  TextField,
} from "../../mui-core";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

import { Map, TileLayer, Marker } from "react-leaflet";
let CMap: typeof Map;
let CTileLayer: typeof TileLayer;
let CMarker: typeof Marker;
let L: any;
if (typeof document !== "undefined") {
  const LL = require("react-leaflet");
  CMap = LL.Map;
  CTileLayer = LL.TileLayer;
  CMarker = LL.Marker;
  L = require("leaflet");

  // https://github.com/PaulLeCam/react-leaflet/issues/453
  // bug in leaflet
  delete (L.Icon as any).Default.prototype._getIconUrl;
  (L.Icon as any).Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });
}
// import L, { LeafletMouseEvent } from "leaflet";

import { IPropertyDefinitionSupportedLocationType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import { IPropertyEntryLocationRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryLocation";
import { capitalize } from "../../../../util";

export const ZOOMS = {
  "LARGE": 16,
  "MEDIUM": 14,
  "SMALL": 4,
};

function shouldShowInvalid(props: IPropertyEntryLocationRendererProps) {
  return !props.currentValid || (props.activeSearchResults && props.activeSearchResults.length === 0);
}
export const style = createStyles({
  entry: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    width: "100%",
  },
  description: {
    width: "100%",
  },
  errorMessage: {
    color: "#f44336",
    height: "1.3rem",
    fontSize: "0.85rem",
  },
  icon: {
    color: "#424242",
    marginRight: "0.5rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    "backgroundColor": "#2196f3",
    "color": "#fff",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
  },
  textButton: {
    border: "solid 1px rgba(0,0,0,0.1)",
    display: "flex",
    minWidth: "50px",
    height: "50px",
    padding: "0 10px",
    margin: "0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
  },
  label: (props: IPropertyEntryLocationRendererProps) => ({
    "color": shouldShowInvalid(props) ? "#f44336" : "rgb(66, 66, 66)",
    "&.focused": {
      color: shouldShowInvalid(props) ? "#f44336" : "#3f51b5",
    },
  }),
  labelSingleLine: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldInput: (props: IPropertyEntryLocationRendererProps) => {
    if (shouldShowInvalid(props)) {
      return {
        "width": "100%",
        // this is the colur when the field is out of focus
        "&::before": {
          borderBottomColor: "#e57373",
        },
        // the color that pops up when the field is in focus
        "&::after": {
          borderBottomColor: "#f44336",
        },
        // during the hover event
        "&:hover::before": {
          borderBottomColor: props.disabled ? "rgba(0,0,0,0.42)" : "#f44336",
        },
      };
    }
    return {
      "width": "100%",
      "&::before": {
        borderBottomColor: "rgba(0,0,0,0.42)",
      },
      "&::after": {
        borderBottomColor: "#3f51b5",
      },
      "&:hover::before": {
        borderBottomColor: "#3f51b5",
      },
    };
  },
  autosuggestContainer: {
    position: "relative",
    display: "block",
    width: "100%",
  },
  autosuggestContainerOpen: {

  },
  autosuggestInput: {

  },
  autosuggestInputOpen: {

  },
  autosuggestSuggestionsContainer: {
    position: "absolute" as "absolute",
    display: "block",
    width: "100%",
    top: `calc(100% - 1.3rem)`,
    zIndex: 1000,
  },
  autosuggestSuggestionsContainerOpen: {

  },
  autosuggestSuggestionsList: {

  },
  autosuggestSuggestion: {

  },
  autosuggestFirstSuggestion: {

  },
  autosuggestSuggestionHighlighted: {

  },
  autosuggestSectionContainer: {

  },
  autosuggestFirstSectionContainer: {

  },
  autosuggestSectionTitle: {

  },
  autosuggestMenuItem: {
    height: "auto",
    paddingTop: 4,
    paddingBottom: 8,
  },
  autosuggestMenuItemMainText: {
    fontSize: "1rem",
    lineHeight: "1rem",
  },
  autosuggestMenuItemSubText: {
    fontSize: "0.75rem",
    lineHeight: "0.75rem",
  },
  locationAlternativeTextHeader: {
    height: "3rem",
    fontSize: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTop: "solid 1px #ccc",
  },
  locationPlaceholder: {
    opacity: 0.5,
    fontWeight: 300,
  },
  locationMapContainer: {

  },
  resultListLabel: {
    fontWeight: 300,
    borderLeft: "solid 1px #ccc",
    paddingLeft: "0.5rem",
    marginLeft: "0.5rem",
  },
});

interface IPropertyEntryLocationRendererWithStylesProps extends IPropertyEntryLocationRendererProps, WithStyles<typeof style> {

}

interface IPropertyEntryLocationRendererState {
  readyToMap: boolean;
}

class ActualPropertyEntryLocationRendererWithStylesClass extends React.Component<IPropertyEntryLocationRendererWithStylesProps, IPropertyEntryLocationRendererState> {
  private inputRef: HTMLInputElement;
  private preventNextSearchQueryChange: boolean = false;

  constructor(props: IPropertyEntryLocationRendererWithStylesProps) {
    super(props);

    this.state = {
      readyToMap: false,
    }

    this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderAutosuggestContainer = this.renderAutosuggestContainer.bind(this);
    this.renderAutosuggestSuggestion = this.renderAutosuggestSuggestion.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.setLocationManually = this.setLocationManually.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onChangeBySuggestion = this.onChangeBySuggestion.bind(this);
  }
  public componentDidMount() {
    this.setState({
      readyToMap: true,
    });
    if (this.props.autoFocus && this.inputRef) {
      this.inputRef.focus();
    }
  }
  // public setLocationManually(e: LeafletMouseEvent) {
  public setLocationManually(e: any) {
    this.props.onManualPick({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      txt: this.props.searchQuery,
      atxt: null,
      id: null,
    }, true);
  }
  public onKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    // basically we want to trigger swap or search on enter
    if (e.key === "Enter") {
      if (this.props.activeSearchResults) {
        if (this.props.nextSearchResultCircular) {
          this.props.onChangeBySearchResult(this.props.nextSearchResultCircular);
        }
      } else {
        this.props.onSearch();
      }
    }
  }
  public onChangeBySuggestion(suggestion: IPropertyDefinitionSupportedLocationType) {
    // react autosuggest triggers a search query change when the value is set by selection
    // however we don't want this to happen, both of them get triggered at the same time
    // so this causes a bug
    if (suggestion.txt !== this.props.searchQuery) {
      this.preventNextSearchQueryChange = true;
    }
    this.props.onChangeBySuggestion(suggestion, false);
  }
  public onSearchQueryChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (this.preventNextSearchQueryChange) {
      this.preventNextSearchQueryChange = false;
      return;
    }
    this.props.onSearchQueryChange(e.target.value, true);
  }
  public onSuggestionsFetchRequested(arg: {value: string}) {
    this.props.onSearchQueryChange(arg.value);
  }
  public renderBody(textFieldProps?: any) {
    const viewport = ZOOMS[this.props.viewport.zoom] ? {
      center: this.props.viewport.center,
      zoom: ZOOMS[this.props.viewport.zoom],
    } : this.props.viewport;

    let appliedTextFieldProps: any = {
      className: this.props.classes.entry,
    };
    let iconSearch: React.ReactNode;
    let fn: () => void = null;
    if (this.props.activeSearchResults) {
      if (this.props.nextSearchResultCircular) {
        fn = this.props.onChangeBySearchResult.bind(null, this.props.nextSearchResultCircular, false);
        iconSearch = <SwapHorizIcon />;
      } else {
        iconSearch = <SearchIcon />;
      }
    } else {
      fn = this.props.onSearch.bind(null, false);
      iconSearch = <SearchIcon />;
    }
    let appliedInputProps: any = {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            tabIndex={-1}
            disabled={this.props.disabled}
            classes={{root: this.props.classes.iconButton}}
            onClick={fn}
          >
            {iconSearch}
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
    }

    let icon: React.ReactNode;
    if (this.props.canRestore) {
      if (this.props.currentAppliedValue) {
        icon = <RestoreIcon />
      } else {
        icon = <ClearIcon />
      }
    } else if (this.props.icon) {
      icon = this.props.icon;
    }

    const map = this.state.readyToMap ? (
      <CMap
        viewport={viewport}
        onViewportChanged={this.props.onViewportChange}
        onClick={this.setLocationManually}
      >
        <CTileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {this.props.currentValue ? <CMarker position={[
          this.props.currentValue.lat, this.props.currentValue.lng,
        ]} /> : null}
        {!this.props.disabled && this.props.activeSearchResults ? this.props.activeSearchResults
          .filter((result) => this.props.currentValue.id !== result.id)
          .map((result) => (
            <CMarker
              opacity={0.5}
              key={result.id}
              position={[result.lat, result.lng]}
              onClick={this.props.onChangeBySearchResult.bind(this, result, true)}
            />
          )) : null}
      </CMap>
    ) : null;

    const descriptionAsAlert = this.props.args["descriptionAsAlert"];
    return (
      <div className={this.props.classes.container}>
        {
          this.props.description && descriptionAsAlert ?
          <Alert severity="info" className={this.props.classes.description}>
            {this.props.description}
          </Alert> :
          null
        }
        {
          this.props.description && !descriptionAsAlert ?
          <Typography variant="caption" className={this.props.classes.description}>
            {this.props.description}
          </Typography> :
          null
        }
        <div className={this.props.classes.locationAlternativeTextHeader}>
          {
            icon ? <IconButton
              tabIndex={-1}
              className={this.props.classes.icon}
              onClick={this.props.canRestore ? this.props.onRestore : null}>{icon}</IconButton> : null
          }
          {
            this.props.currentValue && this.props.currentValue.atxt ||
            (
              <span className={this.props.classes.locationPlaceholder}>
                {capitalize(this.props.placeholder)}
              </span>
            )
          }
          {
            this.props.resultOutOfLabel ?
            <i className={this.props.classes.resultListLabel}>{this.props.resultOutOfLabel}</i> :
            null
          }
        </div>
        <div className={this.props.classes.locationMapContainer}>
          {map}
        </div>
        <TextField
          fullWidth={true}
          type="text"
          onKeyPress={this.onKeyPress}
          className={this.props.classes.entry}
          label={this.props.label}
          onChange={this.onSearchQueryChange}
          placeholder={this.props.placeholder}
          value={this.props.searchQuery}
          InputProps={{
            classes: {
              root: this.props.classes.fieldInput,
              focused: "focused",
            },
            disabled: this.props.disabled,
            ...appliedInputProps,
          }}
          InputLabelProps={{
            classes: {
              root: this.props.classes.label,
              focused: "focused",
            },
          }}
          disabled={this.props.disabled}
          variant="filled"
          {...appliedTextFieldProps}
        />
        <div className={this.props.classes.errorMessage}>
          {this.props.currentInvalidReason}
          {
            !this.props.currentInvalidReason && this.props.activeSearchResults && this.props.activeSearchResults.length === 0 ?
            this.props.noResultsLabel :
            null
          }
        </div>
      </div>
    );
  }
  public getSuggestionValue(
    suggestion: IPropertyDefinitionSupportedLocationType,
  ) {
    // just return the title
    return suggestion.txt;
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
    suggestion: IPropertyDefinitionSupportedLocationType,
    params: Autosuggest.RenderSuggestionParams,
  ) {
    const matches = match(suggestion.txt, params.query);
    const parts = parse(suggestion.txt, matches);

    return (
      <MenuItem
        className={this.props.classes.autosuggestMenuItem}
        selected={params.isHighlighted}
        component="div"
        onClick={this.onChangeBySuggestion.bind(this, suggestion)}
      >
        <div>
          <div className={this.props.classes.autosuggestMenuItemMainText}>
            {parts.map((part, index) =>
              part.highlight ? (
                <span key={index} style={{ fontWeight: 500 }}>
                  {part.text}
                </span>
              ) : (
                <strong key={index} style={{ fontWeight: 300 }}>
                  {part.text}
                </strong>
              ),
            )}
          </div>
          <div className={this.props.classes.autosuggestMenuItemSubText}>
            {suggestion.atxt}
          </div>
        </div>
      </MenuItem>
    );
  }
  public render() {
    return (
      <Autosuggest
        renderInputComponent={this.renderBody}
        renderSuggestionsContainer={this.renderAutosuggestContainer}
        renderSuggestion={this.renderAutosuggestSuggestion}
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.props.clearSuggestions}
        suggestions={this.props.searchSuggestions}
        theme={{
          container: this.props.classes.autosuggestContainer,
          containerOpen: this.props.classes.autosuggestContainerOpen,
          input: this.props.classes.autosuggestInput,
          inputOpen: this.props.classes.autosuggestInputOpen,
          inputFocused: "focused",
          suggestionsContainer: this.props.classes.autosuggestSuggestionsContainer,
          suggestionsContainerOpen: this.props.classes.autosuggestSuggestionsContainerOpen,
          suggestionsList: this.props.classes.autosuggestSuggestionsList,
          suggestion: this.props.classes.autosuggestSuggestion,
          suggestionFirst: this.props.classes.autosuggestFirstSuggestion,
          suggestionHighlighted: this.props.classes.autosuggestSuggestionHighlighted,
          sectionContainer: this.props.classes.autosuggestSectionContainer,
          sectionContainerFirst: this.props.classes.autosuggestFirstSectionContainer,
          sectionTitle: this.props.classes.autosuggestSectionTitle,
        }}
        inputProps={{
          value: this.props.searchQuery,
          onChange: this.onSearchQueryChange,
          autoComplete: "new-address",
          type: "text",
        }}
      />
    );
  }
}

const PropertyEntryLocationRenderer = withStyles(style)(ActualPropertyEntryLocationRendererWithStylesClass);
export default PropertyEntryLocationRenderer;