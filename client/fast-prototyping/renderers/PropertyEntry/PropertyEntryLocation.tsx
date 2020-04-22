import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  MenuItem,
  Paper,
  InputAdornment,
  Icon,
  IconButton,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { createStyles, WithStyles, withStyles } from "@material-ui/styles";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import equals from "deep-equal";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../../internal/theme/leaflet.scss";
import { IPropertyDefinitionSupportedLocationType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/location";
import { IPropertyEntryThemeType, STANDARD_THEME } from "./styles";
import { IPropertyEntryLocationRendererProps, IViewportZoomEnumType } from "../../../internal/components/PropertyEntry/PropertyEntryLocation";
import { IPropertyEntryProps } from "../../../internal/components/PropertyEntry";
import SearchIcon from "@material-ui/icons/Search";
import { Alert } from "@material-ui/lab";

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
  return !props.currentValid;
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
  autocompleteContainer: {
    position: "relative",
    display: "block",
    width: "100%",
  },
  autocompleteContainerOpen: {

  },
  autocompleteInput: {

  },
  autocompleteInputOpen: {

  },
  autocompleteSuggestionsContainer: {
    position: "absolute" as "absolute",
    display: "block",
    width: "100%",
    top: `calc(100% - ${theme.errorMessageContainerSize})`,
    zIndex: 1000,
  },
  autocompleteSuggestionsContainerOpen: {

  },
  autocompleteSuggestionsList: {

  },
  autocompleteSuggestion: {

  },
  autocompleteFirstSuggestion: {

  },
  autocompleteSuggestionHighlighted: {

  },
  autocompleteSectionContainer: {

  },
  autocompleteFirstSectionContainer: {

  },
  autocompleteSectionTitle: {

  },
  autocompleteMenuItem: {
    height: "auto",
    paddingTop: 4,
    paddingBottom: 8,
  },
  autocompleteMenuItemMainText: {
    fontSize: theme.autocompleteMenuItemFontSize,
    lineHeight: theme.autocompleteMenuItemFontSize,
  },
  autocompleteMenuItemSubText: {
    fontSize: theme.autocompleteMenuItemSubFontSize,
    lineHeight: theme.autocompleteMenuItemSubFontSize,
  },
  locationAlternativeTextHeader: {
    height: theme.locationAlternativeTextHeaderHeight,
    fontSize: theme.locationAlternativeTextHeaderFontSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  locationMapContainer: {

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
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  public componentDidMount() {
    if (this.props.autoFocus && this.inputRef) {
      this.inputRef.focus();
    }
  }
  public onKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    // basically we want to trigger swap or search on enter
    if (e.key === "Enter") {
      if (this.props.nextSearchResult) {
        this.props.onChangeBySearchResult(this.props.nextSearchResult);
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
    let appliedInputProps: any = {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            disabled={this.props.disabled}
            classes={{root: this.props.classes.iconButton}}
            onClick={this.props.onSearch.bind(null, false)}
          >
            <SearchIcon />
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
          {this.props.currentValue && this.props.currentValue.atxt}
        </div>
        <div className={this.props.classes.locationMapContainer}>
          <Map
            viewport={viewport}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            {this.props.currentValue ? <Marker position={[
              this.props.currentValue.lat, this.props.currentValue.lng,
            ]}>
              <Popup>{this.props.currentValue.txt}{this.props.currentValue.atxt ? <br/> : null}{this.props.currentValue.atxt}</Popup>
            </Marker> : null}
            {!this.props.disabled && this.props.activeSearchResults ? this.props.activeSearchResults
              .filter((result) => !equals(this.props.currentValue, result))
              .map((result) => (
                <Marker
                  opacity={0.5}
                  key={result.lat.toString() + result.lng.toString()}
                  position={[result.lat, result.lng]}
                  onClick={this.props.onChangeBySearchResult.bind(this, result)}
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
        className={this.props.classes.autocompleteMenuItem}
        selected={params.isHighlighted}
        component="div"
        onClick={this.props.onChangeBySuggestion.bind(this, suggestion, false)}
        onMouseOver={this.props.onChangeBySuggestion.bind(this, suggestion, false)}
      >
        <div>
          <div className={this.props.classes.autocompleteMenuItemMainText}>
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
          <div className={this.props.classes.autocompleteMenuItemSubText}>
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
          container: this.props.classes.autocompleteContainer,
          containerOpen: this.props.classes.autocompleteContainerOpen,
          input: this.props.classes.autocompleteInput,
          inputOpen: this.props.classes.autocompleteInputOpen,
          inputFocused: "focused",
          suggestionsContainer: this.props.classes.autocompleteSuggestionsContainer,
          suggestionsContainerOpen: this.props.classes.autocompleteSuggestionsContainerOpen,
          suggestionsList: this.props.classes.autocompleteSuggestionsList,
          suggestion: this.props.classes.autocompleteSuggestion,
          suggestionFirst: this.props.classes.autocompleteFirstSuggestion,
          suggestionHighlighted: this.props.classes.autocompleteSuggestionHighlighted,
          sectionContainer: this.props.classes.autocompleteSectionContainer,
          sectionContainerFirst: this.props.classes.autocompleteFirstSectionContainer,
          sectionTitle: this.props.classes.autocompleteSectionTitle,
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