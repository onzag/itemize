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
import IconButton from "@mui/material/IconButton";
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import RestoreIcon from "@mui/icons-material/Restore";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import { css as emotionCss } from "@emotion/css";
import { css } from "@mui/material/styles";
import { ConfigContext } from "../../../internal/providers/config-provider";

// we import the react-leaflet types, however note
// how we are not using them at all, this is because
// we are not using these as they don't support SSR at all
// and we need to do a dynamic import
import { Map, TileLayer, Marker } from "react-leaflet";
import Box from "@mui/material/Box";
import { RestoreIconButton } from "./general";

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
export const style = {
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
    position: "absolute",
    right: "16px",
  },
  iconButton: {
    "backgroundColor": "#2196f3",
    "color": "#fff",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
  },
  iconButtonOriginal: {
    color: "#424242",
  },
  label: (isInvalid: boolean) => ({
    "color": isInvalid ? "#f44336" : "rgb(66, 66, 66)",
    "&.focused": {
      color: isInvalid ? "#f44336" : "#3f51b5",
    },
  }),
  labelSingleLine: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
    // material ui v5 messy engine decides to override my styles
    paddingTop: "8px !important",
    paddingBottom: "16px !important",
  },
  autosuggestMenuItemMainText: {
    fontSize: "1rem",
    lineHeight: "1rem",
  },
  autosuggestMenuItemSubText: {
    fontSize: "0.9rem",
    lineHeight: "0.9rem",
  },
  locationAlternativeTextHeader: {
    height: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    borderTop: "solid 1px #ccc",
    borderLeft: "solid 1px #ccc",
    borderRight: "solid 1px #ccc",
    borderRadius: "4px 4px 0 0",
    padding: "0 16px",
    fontSize: "0.9rem",
  },
  locationPlaceholder: {
    opacity: 0.5,
    fontWeight: 300,
  },
  locationMapBase: {
    marginBottom: "24px",
    display: "flex",
    flexDirection: "row",
  },
  locationMapContainer: {
    flex: "1 1 50%",
  },
  locationMapMenuContainer: {
    flex: "1 1 50%",
    border: "solid 1px #ccc",
    padding: "1rem",
    overflowY: "auto",
    overflowX: "hidden",
    height: "200px",
    backgroundColor: "white",
  },
  locationMapMenuContainerDropdownMode: {
    width: "50%",
    position: "absolute",
    height: "auto",
    zIndex: 1000,
  },
  locationMapCard: {
    padding: "0.5rem 1rem",
    marginBottom: "1rem",
    width: "100%",
    border: "solid 1px #ccc",
    borderRadius: "4px",
    cursor: "pointer",

    "&:hover": {
      border: "solid 1px rgba(0, 0, 0, 0.87)",
    },

    "&:focus, &:active": {
      backgroundColor: "rgba(0,0,0,0.03)",
    },
  },
  locationMapCardSelected: {
    cursor: "default",
    color: "#fff",
    backgroundColor: "#005CE6",
    border: "solid 1px #005CE6",

    "&:hover": {
      border: "solid 1px #005CE6",
    },

    "&:focus, &:active": {
      backgroundColor: "#005CE6",
    },
  },
  locationMapCardTitle: {
    fontSize: "1rem",
  },
  locationMapCardSubTitle: {
    fontSize: "0.9rem",
    fontWeight: 300,
  },
  resultListLabel: {
    fontWeight: 300,
    padding: "0 1rem 1rem 1rem",
  },
  smallAddornment: (isInvalid: boolean) => ({
    color: isInvalid ? "#f44336" : "#424242",
  }),
};

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
class PropertyEntryLocationRenderer extends
  React.Component<IPropertyEntryLocationRendererProps, IPropertyEntryLocationRendererState> {

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

  private cmapRef = React.createRef<any>();

  /**
   * The contructor for the location entry renderer
   * @param props the props
   */
  constructor(props: IPropertyEntryLocationRendererProps) {
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

  public componentDidUpdate(prevProps: Readonly<IPropertyEntryLocationRendererProps>): void {
    if (
      this.cmapRef.current &&
      (
        prevProps.activeSearchResults && !this.props.activeSearchResults ||
        this.props.activeSearchResults && !prevProps.activeSearchResults
      )
    ) {
      // force map remount due to buggy ui
      this.setState({
        readyToMap: false,
      }, () => {
        this.setState({
          readyToMap: true,
        });
      })
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
    let idToUse = (this.props.args.InputProps && this.props.args.InputProps.id) || this.props.uniqueId;

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
      sx: style.entry,
    };

    // so if we have active search results, these are automatically
    // given by the handler
    if (this.props.activeSearchResults) {
      // and if we have a next search result, the next search result
      // circular represents the next element of the array or the first if it's the last
      // aka it's circular
      if (this.props.nextSearchResultCircular) {
        // then the function for click changes via the search result to the next search result
        // circular, and the false means that it should indeed change the viewport
        // onClickFn = this.props.onChangeBySearchResult.bind(null, this.props.nextSearchResultCircular, false);
        // and the icon is the swap icon
        // iconSearch = <SwapHorizIcon />;
        // it would be possible to have a next, prev button as there is prevSearchResultCircular as well
      }
    }

    const searchButtonWrapper = this.props.args.searchButtonWrapper || ((n: any) => n);

    // now we can build these props
    let appliedInputProps: any = {
      endAdornment: !this.props.args.disableMapAndSearch && !this.props.currentValue && this.props.searchQuery ? (
        <InputAdornment position="end">
          {searchButtonWrapper(<IconButton
            disabled={this.props.disabled}
            sx={style.iconButton}
            onClick={this.props.onSearch.bind(null, false)}
            size="large"
          >
            <SearchIcon />
          </IconButton>)}
        </InputAdornment>
      ) : null,
      inputProps: {
        "aria-describedby": this.props.description ? idToUse + "_desc" : null,
      },
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
    } else if (this.props.args.icon) {
      icon = this.props.args.icon;
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
        ref={this.cmapRef}
      >
        <ConfigContext.Consumer>
          {(config) => {
            let attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
            let url = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";

            if (config.shared) {
              if (config.shared.leafletAttribution) {
                attribution = config.shared.leafletAttribution;
              }

              if (config.shared.leafletUrl) {
                url = config.shared.leafletUrl;
              }
            }

            return (
              <CTileLayer
                attribution={attribution}
                url={url}
              />
            );
          }}
        </ConfigContext.Consumer>
        {this.props.currentValue ? <CMarker position={[
          this.props.currentValue.lat, this.props.currentValue.lng,
        ]} /> : null}
        {!this.props.disabled && this.props.activeSearchResults ? this.props.activeSearchResults
          .filter((result) => !this.props.currentValue || (this.props.currentValue.id !== result.id))
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

    const isInvalid = shouldShowInvalid(this.props);

    if (isInvalid) {
      appliedInputProps.inputProps["aria-invalid"] = true;

      if (!this.props.args.hideError) {
        appliedInputProps.inputProps["aria-errormessage"] = idToUse + "_error";
      }
    }

    const fieldMap = (
      <>
        {!this.props.args.disableMapAndSearch ?
          <Box sx={style.locationAlternativeTextHeader}>
            {
              icon ? <RestoreIconButton
                sx={style.icon}
                onClick={this.props.canRestore ? this.props.onRestore : null}
              >{icon}</RestoreIconButton> : null
            }
            {
              this.props.currentValue && this.props.currentValue.atxt ||
              (
                <Box component="span" sx={style.locationPlaceholder}>
                  {capitalize(this.props.placeholder)}
                </Box>
              )
            }
          </Box> : null
        }
        {
          !this.props.args.disableMapAndSearch ?
            <Box sx={style.locationMapBase}>
              {this.props.activeSearchResults && this.props.args.searchDropdownMode ? (
                <Box sx={style.locationMapMenuContainer} />
              ) : null}
              {this.props.activeSearchResults ? <Box
                sx={
                  this.props.args.searchDropdownMode ?
                    [style.locationMapMenuContainer, style.locationMapMenuContainerDropdownMode] :
                    style.locationMapMenuContainer
                }
                role="listbox"
                aria-labelledby={idToUse + "_listboxlabel"}
              >
                <Box sx={style.resultListLabel} id={idToUse + "_listboxlabel"}>
                  {this.props.resultLabel}
                </Box>
                {this.props.activeSearchResults.map((r) => {
                  const card = (
                    <Box
                      key={r.id}
                      sx={
                        r.id === (this.props.currentValue && this.props.currentValue.id) ?
                          [style.locationMapCard, style.locationMapCardSelected] :
                          style.locationMapCard
                      }
                      role="button"
                      aria-describedby={r.id + "_desc"}
                      aria-labelledby={r.id + "_label"}
                      tabIndex={0}
                      onClick={this.props.onChangeBySearchResult.bind(null, r, false)}
                    >
                      <Box sx={style.locationMapCardTitle} id={r.id + "_label"}>
                        {r.txt}
                      </Box>
                      <Box sx={style.locationMapCardSubTitle} id={r.id + "_desc"}>
                        {r.atxt}
                      </Box>
                    </Box>
                  );

                  if (this.props.args.searchCardWrapper) {
                    return (
                      <React.Fragment key={r.id}>
                        {this.props.args.searchCardWrapper(r, card)}
                      </React.Fragment>
                    );
                  }

                  return card;
                })}
              </Box> : null}
              <Box sx={style.locationMapContainer}>
                {map}
              </Box>
            </Box> :
            null
        }
      </>
    );


    if (this.props.args.startIcon) {
      appliedInputProps.startAdornment = (
        <InputAdornment position="start" sx={style.smallAddornment(isInvalid)}>
          <RestoreIconButton
            sx={style.iconButtonOriginal}
          >
            {this.props.args.startIcon}
          </RestoreIconButton>
        </InputAdornment>
      );
    }

    const fieldComponent = (
      <TextField
        fullWidth={true}
        type="text"
        onKeyPress={this.onKeyPress}
        sx={style.entry}
        label={this.props.label}
        onChange={this.onSearchQueryChange}
        onBlur={this.props.enableUserSetErrors}
        placeholder={this.props.placeholder}
        value={this.props.searchQuery}
        error={isInvalid}
        InputProps={{
          fullWidth: true,
          classes: {
            focused: "focused",
          },
          disabled: this.props.disabled,
          ...appliedInputProps,
          ...this.props.args.InputProps,
        }}
        InputLabelProps={{
          sx: style.label(isInvalid),
          classes: {
            focused: "focused",
          },
        }}
        disabled={this.props.disabled}
        variant={this.props.args.fieldVariant || "filled"}
        {...appliedTextFieldProps}
      />
    );

    // the description as alert arg possibility
    const descriptionAsAlert = this.props.args["descriptionAsAlert"];

    let descriptionObject: React.ReactNode = null;
    if (this.props.description) {
      descriptionObject = descriptionAsAlert ? (
        <Alert severity="info" sx={style.description} role="note" id={idToUse + "_desc"}>
          {this.props.description}
        </Alert>
      ) : (
        <Typography variant="caption" sx={style.description} id={idToUse + "_desc"}>
          {this.props.description}
        </Typography>
      );
    }

    const error = (
      this.props.args.hideError ? null : <Box sx={style.errorMessage} id={idToUse + "_error"}>
        {this.props.currentInvalidReason}
      </Box>
    );

    let inner: React.ReactNode;
    if (this.props.args.useCustomFieldRender) {
      inner = this.props.args.useCustomFieldRender(descriptionObject, fieldMap, fieldComponent, error, this.props.disabled);
    } else {
      inner = (
        <>
          {descriptionObject}
          {fieldMap}
          {fieldComponent}
          {error}
        </>
      )
    }

    return (
      <Box sx={style.container}>
        {inner}
      </Box>
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
        sx={style.autosuggestMenuItem}
        selected={params.isHighlighted}
        component="div"
        onClick={this.onChangeBySuggestion.bind(this, suggestion)}
      >
        <div>
          <Box sx={style.autosuggestMenuItemMainText}>
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
          </Box>
          <Box sx={style.autosuggestMenuItemSubText}>
            {suggestion.atxt}
          </Box>
        </div>
      </MenuItem>
    );
  }

  /**
   * The actual render function
   */
  public render() {
    const baseTheme = {
      container: css(style.autosuggestContainer as any),
      containerOpen: css(style.autosuggestContainerOpen),
      input: css(style.autosuggestInput),
      inputOpen: css(style.autosuggestInputOpen),
      inputFocused: "focused",
      suggestionsContainer: css(style.autosuggestSuggestionsContainer),
      suggestionsContainerOpen: css(style.autosuggestSuggestionsContainerOpen),
      suggestionsList: css(style.autosuggestSuggestionsList),
      suggestion: css(style.autosuggestSuggestion),
      suggestionFirst: css(style.autosuggestFirstSuggestion),
      suggestionHighlighted: css(style.autosuggestSuggestionHighlighted),
      sectionContainer: css(style.autosuggestSectionContainer),
      sectionContainerFirst: css(style.autosuggestFirstSectionContainer),
      sectionTitle: css(style.autosuggestSectionTitle),
    };

    const rsTheme: any = {};
    Object.keys(baseTheme).forEach((k) => {
      rsTheme[k] = emotionCss(baseTheme[k].styles)
    });

    return (
      <Autosuggest
        renderInputComponent={this.renderBody}
        renderSuggestionsContainer={this.renderAutosuggestContainer}
        renderSuggestion={this.renderAutosuggestSuggestion}
        getSuggestionValue={this.getSuggestionValue}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.props.clearSuggestions}
        suggestions={this.props.activeSearchResults ? [] : this.props.searchSuggestions}
        theme={rsTheme}
        inputProps={{
          value: this.props.searchQuery,
          onChange: this.onSearchQueryChange,
          autoComplete: "new-address",
          type: "text",
          ...this.props.args.inputProps,
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
export default PropertyEntryLocationRenderer;
