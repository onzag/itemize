/**
 * Contains the entry for the location type
 * 
 * @module
 */

import "../../../internal/theme/leaflet.scss";

import React from "react";
import { IPropertyDefinitionSupportedLocationType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import { IPropertyEntryLocationRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryLocation";
import { capitalize } from "../../../../util";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import IconButton from "@mui/material/IconButton";
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import RestoreIcon from "@mui/icons-material/Restore";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";

// we import the react-leaflet types, however note
// how we are not using them at all, this is because
// we are not using these as they don't support SSR at all
// and we need to do a dynamic import
import { Map, TileLayer, Marker } from "react-leaflet";

// we only use these types to define these C prefixed types
let CMap: typeof Map;
let CTileLayer: typeof TileLayer;
let CMarker: typeof Marker;
// and l is for leaflet
let L: any;

// so this needs to run in everything but the server side
// so basically we run this like this
if (typeof document !== "undefined") {
  // this is where we do the dynamic imports
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

// these are the standard zooms supported
export const ZOOMS = {
  "LARGE": 16,
  "MEDIUM": 14,
  "SMALL": 4,
};

/**
 * A simple helper function that says when it should show invalid
 * @param props the renderer props
 * @returns a boolean on whether is invalid
 */
function shouldShowInvalid(props: IPropertyEntryLocationRendererProps) {
  return !props.currentValid || (props.activeSearchResults && props.activeSearchResults.length === 0);
}

/**
 * The styles for the location entry
 */
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

/**
 * The props with location entry renderer
 */
interface IPropertyEntryLocationRendererWithStylesProps extends IPropertyEntryLocationRendererProps, WithStyles<typeof style> {

}

/**
 * The state for the location entry renderer
 */
interface IPropertyEntryLocationRendererState {
  /**
   * Whether the map is ready, by default this is false, specially
   * since this doesn't work in SSR
   */
  readyToMap: boolean;
}

/**
 * The actual property entry location renderer
 */
class ActualPropertyEntryLocationRendererWithStylesClass extends
  React.Component<IPropertyEntryLocationRendererWithStylesProps, IPropertyEntryLocationRendererState> {

  /**
   * The input ref for the location
   */
  private inputRef: HTMLInputElement;
  /**
   * a boolean to prevent a search query change, this is because
   * the way react autosuggest works that will trigger a change event
   * at the same time one suggestion is clicked
   */
  private preventNextSearchQueryChange: boolean = false;

  /**
   * The contructor for the location entry renderer
   * @param props the props
   */
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
    // when we have mounte we set the reay to map flag to true
    this.setState({
      readyToMap: true,
    });
    if (this.props.autoFocus && this.inputRef) {
      this.inputRef.focus();
    }
  }

  // public setLocationManually(e: LeafletMouseEvent) {
  /**
   * Trigger the location manually on a click event to the map
   * itself
   * @param e a LeafletMouseEvent
   */
  public setLocationManually(e: any) {
    // we call the manual pick function with the LeafletMouseEvent
    // functionality, note that we have to use the any because Leaflet
    // can't be loaded in the SSR
    this.props.onManualPick({
      lat: e.latlng.lat,
      lng: e.latlng.lng,
      txt: this.props.searchQuery,
      atxt: null,
      id: null,
    }, true);
    // we just passed true to mantain viewport, this means that the viewport
    // won't change
  }

  /**
   * Triggers on the keypress in the search field
   * @param e a keyboard event
   */
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

  /**
   * Triggers when we have clicked a suggestion
   * @param suggestion the suggestion we have clicked
   */
  public onChangeBySuggestion(suggestion: IPropertyDefinitionSupportedLocationType) {
    // react autosuggest triggers a search query change when the value is set by selection
    // however we don't want this to happen, both of them get triggered at the same time
    // so this causes a bug
    if (suggestion.txt !== this.props.searchQuery) {
      this.preventNextSearchQueryChange = true;
    }
    // we do not mantain the viewport, we want to flyby there
    this.props.onChangeBySuggestion(suggestion, false);
  }

  /**
   * Triggers when the search query itself changes
   * and not a suggestion is selected
   * @param e the change event
   */
  public onSearchQueryChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    // so if we have prevented this change
    if (this.preventNextSearchQueryChange) {
      // we set the flag to false, and return
      this.preventNextSearchQueryChange = false;
      return;
    }

    // we call the search query change, and we ask not to load
    // suggestions for this one
    this.props.onSearchQueryChange(e.target.value, true);
  }

  /**
   * react autosuggest manually decides when it needs to load suggestions
   * @param arg the value it wants to load
   */
  public onSuggestionsFetchRequested(arg: { value: string }) {
    // and this is where we use search query change that loads suggestions
    this.props.onSearchQueryChange(arg.value);
  }

  /**
   * Renders the suggestion body
   * @param textFieldProps the text field props given by react autosuggest
   */
  public renderBody(textFieldProps?: any) {
    // the viewport zoom can be either an arbitrary number or MEDIUM, SMALL, and LARGE which
    // should be translated to an arbitrary number for you and the library you support
    // for the purposes of leaflet and react-leaflet we have these translations or otherwise
    // we will use the viewport number itself, as we manually set it
    const viewport = ZOOMS[this.props.viewport.zoom] ? {
      center: this.props.viewport.center,
      zoom: ZOOMS[this.props.viewport.zoom],
    } : this.props.viewport;

    // these are the applied text props for
    // the class names
    let appliedTextFieldProps: any = {
      className: this.props.classes.entry,
    };
    // the icon we will use for the seach, yes we use two
    // one for the initial search and another for swapping
    let iconSearch: React.ReactNode;
    let onClickFn: () => void = null;

    // so if we have active search results, these are automatically
    // given by the handler
    if (this.props.activeSearchResults) {
      // and if we have a next search result, the next search result
      // circular represents the next element of the array or the first if it's the last
      // aka it's circular
      if (this.props.nextSearchResultCircular) {
        // then the function for click changes via the search result to the next search result
        // circular, and the false means that it should indeed change the viewport
        onClickFn = this.props.onChangeBySearchResult.bind(null, this.props.nextSearchResultCircular, false);
        // and the icon is the swap icon
        iconSearch = <SwapHorizIcon />;
        // it would be possible to have a next, prev button as there is prevSearchResultCircular as well
      } else {
        // otherwise if we just have one search result, then the icon is the same
        // but the click does nothing
        iconSearch = <SearchIcon />;
      }
    } else {
      // otherwise if there's no active search the button
      // will trigger a search, it will also mantain the viewport
      onClickFn = this.props.onSearch.bind(null, false);
      iconSearch = <SearchIcon />;
    }

    // now we can build these props
    let appliedInputProps: any = {
      endAdornment: !this.props.args.disableMapAndSearch ? (
        <InputAdornment position="end">
          <IconButton
            tabIndex={-1}
            disabled={this.props.disabled}
            classes={{ root: this.props.classes.iconButton }}
            onClick={onClickFn}
            size="large">
            {iconSearch}
          </IconButton>
        </InputAdornment>
      ) : null,
    };

    // and add the text field props from the autosuggest
    if (textFieldProps) {
      const { inputRef = () => { return; }, ref, ...other } = textFieldProps;
      appliedTextFieldProps = other;
      appliedInputProps = {
        ...appliedInputProps,
        inputRef: (node: HTMLInputElement) => {
          ref(node);
          inputRef(node);
        },
      };
    }

    // this is the icon for restore or clear if required
    // or otherwise use the provided icon as the user
    // asked
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

    // and now we can build the map
    // if we are ready to map, using the C prefixed
    // maps that are only available in the client side
    // the onViewportChange handler function is fairly compatible
    // with react-leaftlet
    const map = this.state.readyToMap && !this.props.args.disableMapAndSearch ? (
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

    // the description as alert arg possibility
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
        {!this.props.args.disableMapAndSearch ?
          <div className={this.props.classes.locationAlternativeTextHeader}>
            {
              icon ? <IconButton
                tabIndex={-1}
                className={this.props.classes.icon}
                onClick={this.props.canRestore ? this.props.onRestore : null}
                size="large">{icon}</IconButton> : null
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
          </div> : null
        }
        {
          !this.props.args.disableMapAndSearch ?
            <div className={this.props.classes.locationMapContainer}>
              {map}
            </div> :
            null
        }
        <TextField
          fullWidth={true}
          type="text"
          onKeyPress={this.onKeyPress}
          className={this.props.classes.entry}
          label={this.props.label}
          onChange={this.onSearchQueryChange}
          onBlur={this.props.enableUserSetErrors}
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

  /**
   * For a given suggestion gives the value that is supposed to assign to the
   * text field
   * @param suggestion the suggestion
   * @returns basically the title of the suggestion
   */
  public getSuggestionValue(
    suggestion: IPropertyDefinitionSupportedLocationType,
  ) {
    // just return the title
    return suggestion.txt;
  }

  /**
   * Specifies how the container of the autosuggest component is to be rendered
   * @param options the autosuggest options
   * @returns a react element
   */
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

  /**
   * Specifies how a single suggestion inside the autosuggest container
   * is supposed to be rendered
   * @param suggestion the suggestion to be renderer
   * @param params the autosuggest suggestion params
   */
  public renderAutosuggestSuggestion(
    suggestion: IPropertyDefinitionSupportedLocationType,
    params: Autosuggest.RenderSuggestionParams,
  ) {
    // we use this to highlight
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

  /**
   * The actual render function
   */
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

/**
 * The property entry location renderer, which renders a map that allows to select a location
 * 
 * Supported args:
 * 
 * - descriptionAsAlert: displays the description if exists as alert rather than the standard
 */
const PropertyEntryLocationRenderer = withStyles(style)(ActualPropertyEntryLocationRendererWithStylesClass);
export default PropertyEntryLocationRenderer;
