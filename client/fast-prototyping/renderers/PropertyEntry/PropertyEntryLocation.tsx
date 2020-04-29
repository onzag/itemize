import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  MenuItem,
  Paper,
  InputAdornment,
  IconButton,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { createStyles, WithStyles, withStyles } from "@material-ui/styles";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { Map, TileLayer, Marker } from "react-leaflet";
import L, { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../../internal/theme/leaflet.scss";
import { IPropertyDefinitionSupportedLocationType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import { IPropertyEntryThemeType, STANDARD_THEME } from "./styles";
import { IPropertyEntryLocationRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryLocation";
import SearchIcon from "@material-ui/icons/Search";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz"
import { Alert } from "@material-ui/lab";
import { capitalize } from "../../../../util";

// https://github.com/PaulLeCam/react-leaflet/issues/453
// bug in leaflet
delete (L.Icon as any).Default.prototype._getIconUrl;
(L.Icon as any).Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const ZOOMS = {
  "LARGE": 16,
  "MEDIUM": 14,
  "SMALL": 4,
};

function shouldShowInvalid(props: IPropertyEntryLocationRendererProps) {
  return !props.currentValid || (props.activeSearchResults && props.activeSearchResults.length === 0);
}
export const style = (theme: IPropertyEntryThemeType) => createStyles({
  entry: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    width: theme.containerWidth,
  },
  description: {
    width: "100%",
  },
  errorMessage: {
    color: theme.invalidColor,
    height: theme.errorMessageContainerSize,
    fontSize: theme.errorMessageFontSize,
  },
  icon: (props: IPropertyEntryLocationRendererProps) => ({
    color: shouldShowInvalid(props) ? theme.invalidColor : theme.iconColor,
    marginRight: "0.5rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  }),
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
    "color": shouldShowInvalid(props) ? theme.labelInvalidColor : theme.labelColor,
    "&.focused": {
      color: shouldShowInvalid(props) ? theme.labelInvalidFocusedColor : theme.labelFocusedColor,
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
          borderBottomColor: theme.fieldBorderInvalidColor,
        },
        // the color that pops up when the field is in focus
        "&::after": {
          borderBottomColor: theme.fieldBorderInvalidColorFocused,
        },
        // during the hover event
        "&:hover::before": {
          borderBottomColor: props.disabled ? theme.fieldBorderColor : theme.fieldBorderInvalidColorFocused,
        },
      };
    }
    return {
      "width": "100%",
      "&::before": {
        borderBottomColor: theme.fieldBorderColor,
      },
      "&::after": {
        borderBottomColor: theme.fieldBorderColorFocused,
      },
      "&:hover::before": {
        borderBottomColor: theme.fieldBorderColorFocused,
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
    top: `calc(100% - ${theme.errorMessageContainerSize})`,
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
    fontSize: theme.autosuggestMenuItemFontSize,
    lineHeight: theme.autosuggestMenuItemFontSize,
  },
  autosuggestMenuItemSubText: {
    fontSize: theme.autosuggestMenuItemSubFontSize,
    lineHeight: theme.autosuggestMenuItemSubFontSize,
  },
  locationAlternativeTextHeader: {
    height: theme.locationAlternativeTextHeaderHeight,
    fontSize: theme.locationAlternativeTextHeaderFontSize,
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

class ActualPropertyEntryLocationRendererWithStylesClass extends React.Component<IPropertyEntryLocationRendererWithStylesProps> {
  private inputRef: HTMLInputElement;

  constructor(props: IPropertyEntryLocationRendererWithStylesProps) {
    super(props);

    this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderAutosuggestContainer = this.renderAutosuggestContainer.bind(this);
    this.renderAutosuggestSuggestion = this.renderAutosuggestSuggestion.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.setLocationManually = this.setLocationManually.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  public componentDidMount() {
    if (this.props.autoFocus && this.inputRef) {
      this.inputRef.focus();
    }
  }
  public setLocationManually(e: LeafletMouseEvent) {
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
  public onSearchQueryChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    this.props.onSearchQueryChange(e.target.value, true);
  }
  public onSuggestionsFetchRequested({value}) {
    this.props.onSearchQueryChange(value);
  }
  public renderBody(textFieldProps?: any) {
    const viewport = {
      center: this.props.viewport.center,
      zoom: ZOOMS[this.props.viewport.zoom] || this.props.viewport.zoom,
    };
    let appliedTextFieldProps: any = {
      className: this.props.classes.entry,
    };
    let icon: React.ReactNode;
    let fn: () => void = null;
    if (this.props.activeSearchResults) {
      if (this.props.nextSearchResultCircular) {
        fn = this.props.onChangeBySearchResult.bind(null, this.props.nextSearchResultCircular, false);
        icon = <SwapHorizIcon />;
      } else {
        icon = <SearchIcon />;
      }
    } else {
      fn = this.props.onSearch.bind(null, false);
      icon = <SearchIcon />;
    }
    let appliedInputProps: any = {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            disabled={this.props.disabled}
            classes={{root: this.props.classes.iconButton}}
            onClick={fn}
          >
            {icon}
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
            this.props.icon ? <span className={this.props.classes.icon}>{this.props.icon}</span> : null
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
          <Map
            viewport={viewport}
            onViewportChange={this.props.onViewportChange}
            onClick={this.setLocationManually}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {this.props.currentValue ? <Marker position={[
              this.props.currentValue.lat, this.props.currentValue.lng,
            ]}/>: null}
            {!this.props.disabled && this.props.activeSearchResults ? this.props.activeSearchResults
              .filter((result) => this.props.currentValue.id !== result.id)
              .map((result) => (
                <Marker
                  opacity={0.5}
                  key={result.id}
                  position={[result.lat, result.lng]}
                  onClick={this.props.onChangeBySearchResult.bind(this, result, true)}
                />
            )) : null}
          </Map>
        </div>
        <TextField
          fullWidth={true}
          type="search"
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
        onClick={this.props.onChangeBySuggestion.bind(this, suggestion, false)}
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
        }}
      />
    );
  }
}

const ActualPropertyEntryLocationRendererWithStyles = withStyles(style)(ActualPropertyEntryLocationRendererWithStylesClass);

export default function PropertyEntryLocationRenderer(props: IPropertyEntryLocationRendererProps) {
  let appliedTheme: IPropertyEntryThemeType = STANDARD_THEME;
  if (props.args["theme"]) {
    appliedTheme = {
      ...STANDARD_THEME,
      ...props.args["theme"],
    };
  }
  return (
    <ThemeProvider theme={appliedTheme}>
      <ActualPropertyEntryLocationRendererWithStyles {...props} />
    </ThemeProvider>
  )
}