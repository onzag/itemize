import React from "react";
import {
  WithStyles,
  withStyles,
  createStyles,
  InputAdornment,
  IconButton,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
  withMobileDialog,
  ClearIcon,
  RestoreIcon,
  IconVisibility,
  IconVisibilityOff,
  Alert,
} from "../../mui-core/index";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { IPropertyEntryFieldRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryField";
import { type } from "os";

function shouldShowInvalid(props: IPropertyEntryFieldRendererProps) {
  return !props.currentValid;
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
  standardAddornment: (props: IPropertyEntryFieldRendererProps) => ({
    color: shouldShowInvalid(props) ? "#f44336" : "#424242",
    marginRight: "-10px",
  }),
  iconButtonPassword: {
    "backgroundColor": "#2196f3",
    "color": "#fff",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
  },
  iconButton: {
    color: "#424242",
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
  label: (props: IPropertyEntryFieldRendererProps) => ({
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
  fieldInput: (props: IPropertyEntryFieldRendererProps) => {
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
  unitDialog: {
    minWidth: "400px",
  },
  unitDialogSubheader: {
    backgroundColor: "white",
    borderBottom: "solid 1px #eee",
  },
  autosuggestContainer: {
    position: "relative",
    display: "block",
    width: "100%",
  },
  // autosuggestContainerOpen: {

  // },
  // autosuggestInput: {

  // },
  // autosuggestInputOpen: {

  // },
  // autosuggestSuggestionsContainer: {
  //   position: "absolute" as "absolute",
  //   display: "block",
  //   width: "100%",
  //   top: "calc(100% - 1.3rem)",
  //   zIndex: 1000,
  // },
  // autosuggestSuggestionsContainerOpen: {

  // },
  // autosuggestSuggestionsList: {

  // },
  // autosuggestSuggestion: {

  // },
  // autosuggestFirstSuggestion: {

  // },
  // autosuggestSuggestionHighlighted: {

  // },
  // autosuggestSectionContainer: {

  // },
  // autosuggestFirstSectionContainer: {

  // },
  // autosuggestSectionTitle: {

  // },
  // autosuggestMenuItem: {
  //   height: "auto",
  //   paddingTop: 4,
  //   paddingBottom: 8,
  // },
  // autosuggestMenuItemMainText: {
  //   fontSize: theme.autosuggestMenuItemFontSize,
  //   lineHeight: theme.autosuggestMenuItemFontSize,
  // },
  // autosuggestMenuItemSubText: {
  //   fontSize: theme.autosuggestMenuItemSubFontSize,
  //   lineHeight: theme.autosuggestMenuItemSubFontSize,
  // },
});


interface IPropertyEntryFieldRendererWithStylesProps extends IPropertyEntryFieldRendererProps, WithStyles<typeof style> {
}

interface IPropertyEntryFieldRendererState {
  visible: boolean;
  unitDialogOpen: boolean;
}

interface ISelectUnitDialogProps extends IPropertyEntryFieldRendererWithStylesProps {
  open: boolean;
  onClose: () => void;
  fullScreen: boolean;
}

function SelectUnitDialog(props: ISelectUnitDialogProps) {
  const closeAndChangeUnit = (unit: string) => {
    props.onClose();
    props.onChangeUnit(unit);
  }
  return (
    <Dialog
      classes={{
        paper: "props.dialogClassName",
      }}
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="unit-dialog-title"
      fullScreen={props.fullScreen}
    >
      <DialogTitle id="unit-dialog-title">{props.unitI18n.title}</DialogTitle>
      <div>
        <List>
          <ListItem
            selected={props.unitPrimary === props.unit}
            button={true}
            onClick={closeAndChangeUnit.bind(null, props.unitPrimary)}
          >
            <ListItemText primary={props.unitToNode(props.unitPrimary)}/>
          </ListItem>
          <ListItem
            selected={props.unitPrimaryImperial === props.unit}
            button={true}
            onClick={closeAndChangeUnit.bind(null, props.unitPrimaryImperial)}
          >
            <ListItemText primary={props.unitToNode(props.unitPrimaryImperial)}/>
          </ListItem>
        </List>
        {!props.unitIsLockedToPrimaries ? <>
          <Divider/>
          <List
            subheader={<ListSubheader
              classes={{root: "props.subheaderClassName"}}
            >
              {props.unitI18n.others}
            </ListSubheader>}
          >
            {(props.unitPrefersImperial ? props.unitImperialOptions : props.unitOptions).map((unit) => (
              <ListItem
                selected={unit === props.unit}
                button={true}
                onClick={closeAndChangeUnit.bind(null, unit)}
                key={unit}
              >
                <ListItemText primary={props.unitToNode(unit)}/>
              </ListItem>
            ))}
          </List>
          <Divider/>
          <List
            subheader={<ListSubheader classes={{root: "props.subheaderClassName"}}>
              {props.unitPrefersImperial ? props.unitI18n.metric : props.unitI18n.imperial}
            </ListSubheader>}
          >
            {(props.unitPrefersImperial ? props.unitOptions : props.unitImperialOptions).map((unit) => (
              <ListItem
                selected={unit === props.unit}
                button={true}
                onClick={closeAndChangeUnit.bind(null, unit)}
                key={unit}
              >
                <ListItemText primary={props.unitToNode(unit)}/>
              </ListItem>
            ))}
          </List>
        </> : null}
      </div>
    </Dialog>
  );
}

const SelectUnitDialogResponsive = withMobileDialog<ISelectUnitDialogProps>()(SelectUnitDialog);

class ActualPropertyEntryFieldRenderer
  extends React.Component<IPropertyEntryFieldRendererWithStylesProps, IPropertyEntryFieldRendererState> {

  private inputRef: HTMLInputElement;
  private inputRefSelectionStart: number;

  constructor(props: IPropertyEntryFieldRendererWithStylesProps) {
    super(props);

    this.state = {
      visible: props.type !== "password",
      unitDialogOpen: false,
    }

    this.toggleVisible = this.toggleVisible.bind(this);
    this.catchToggleMouseDownEvent = this.catchToggleMouseDownEvent.bind(this);
    this.onChangeByHTMLEvent = this.onChangeByHTMLEvent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.renderBasicTextField = this.renderBasicTextField.bind(this);
    this.closeUnitDialog = this.closeUnitDialog.bind(this);
    this.openUnitDialog = this.openUnitDialog.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    // this.renderAutosuggestContainer = this.renderAutosuggestContainer.bind(this);
    // this.renderAutosuggestField = this.renderAutosuggestField.bind(this);
    // this.renderAutosuggestSuggestion = this.renderAutosuggestSuggestion.bind(this);
    // this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    // this.getSuggestionValue = this.getSuggestionValue.bind(this);
  }

  public componentDidMount() {
    if (this.props.autoFocus && this.inputRef) {
      this.inputRef.focus();
    }
  }

  public toggleVisible(e: React.MouseEvent) {
    e.preventDefault();
    this.setState({
      visible: !this.state.visible,
    });

    if (this.inputRef) {
      // we focus
      this.inputRef.focus();

      // BUG in latest chrome causes the input caret location
      // to be lost so we need to gain the location again
      // now we check we can set the caret
      // This is unecessary in FF and other browsers
      if (
        typeof this.inputRefSelectionStart !== "undefined" &&
        typeof this.inputRef.setSelectionRange !== "undefined"
      ) { 
        // We need to do it in a timeout of 0 because chrome reports
        // the wrong caret location and will refuse to update otherwise
        // adding this as a side effect say as a callback of setState
        // does not work, only this works...
        setTimeout(() => {
          this.inputRef.setSelectionRange(
            this.inputRefSelectionStart,
            this.inputRefSelectionStart,
          );
        }, 0);
      }
    }
  }

  public catchToggleMouseDownEvent(e: React.MouseEvent) {
    e.preventDefault();

    // BUG in latest chrome causes the input caret location to be lost
    // the so we save the location of the caret
    if (this.inputRef && typeof this.inputRef.selectionStart !== "undefined") {
      this.inputRefSelectionStart = this.inputRef.selectionStart;
    }
  }

  public render() {
    // if (this.props.autocompleteMode) {
    //   return this.renderAutosuggestField();
    // }

    return this.renderBasicTextField();
  }

  public onChangeByHTMLEvent(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    this.onChange(e);
  }

  public onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    autosuggestOverride?: Autosuggest.ChangeEvent,
  ) {
    // the change has two values, a textual value, and a
    // numeric value, texual value is always set but
    // numeric value is only set for numbers
    let value: string = null;
    let internalValue: string = null;

    // the autosuggest override has priority
    if (autosuggestOverride) {
      value = autosuggestOverride.newValue;
      internalValue = value;
    } else {
      value = e.target.value.toString();
      internalValue = value;
    }

    if (this.props.isNumericType) {
      this.props.onChangeByNumber(value);
      return;
    }

    this.props.onChange(value, internalValue);
  }

  public openUnitDialog() {
    this.setState({
      unitDialogOpen: true,
    });
  }

  public closeUnitDialog() {
    this.setState({
      unitDialogOpen: false,
    });
  }

  public onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (this.props.args.onEnter && e.keyCode === 13) {
      this.props.args.onEnter();      
    }
  }

  public renderBasicTextField(textFieldProps?: any) {
    // set the input mode, this is for mobile,
    // basically according to our input we need
    // different keys
    let inputMode = "text";
    if (this.props.subtype === "email") {
      inputMode = "email";
    }

    // these are the inputProps of the small input
    const inputProps = {
      inputMode,
      autoComplete: this.props.htmlAutocomplete,
    };

    // these are the TextField props that are applied
    let appliedTextFieldProps: any = {};
    // these are applied to the Input element
    let appliedInputProps: any = {
      inputRef: (node: HTMLInputElement) => {
        this.inputRef = node;
      },
    };

    // if there are textFieldProps
    if (textFieldProps) {
      // we need to extract the ref setting
      const { inputRef = () => {return; } , ref, ...other } = textFieldProps;
      // set all the other properties as applied to the TextField
      appliedTextFieldProps = other;

      // and we need to setup the ref setting and rescue our function
      // so that we can have the ref too for the Input
      appliedInputProps = {
        inputRef: (node: HTMLInputElement) => {
          ref(node);
          inputRef(node);

          this.inputRef = node;
        },
      };

      // if we have a className, it will inevitably override our class name
      // but we need ours too, so let's merge it in the TextField
      if (appliedTextFieldProps.className) {
        appliedTextFieldProps.className += " " + this.props.classes.entry;
      }

      // if there are small inputProps, they will override our inputProps,
      // of the input mode and autocomplete html, so we need to merge them
      if (appliedTextFieldProps.inputProps) {
        appliedTextFieldProps.inputProps = {
          ...inputProps,
          ...appliedTextFieldProps.inputProps,
        };
      }
    }

    // if the type is a password
    if (this.props.type === "password") {
      // set the end addornment for the show and hide button
      appliedInputProps.endAdornment = (
        <InputAdornment
          position="end"
          className={this.props.classes.standardAddornment}
        >
          <IconButton
            tabIndex={-1}
            classes={{root: this.props.classes.iconButton}}
            onClick={this.toggleVisible}
            onMouseDown={this.catchToggleMouseDownEvent}
          >
            {this.state.visible ? <IconVisibility/> : <IconVisibilityOff/>}
          </IconButton>
        </InputAdornment>
      );
    } else if (this.props.type === "currency") {
      if (this.props.currencyFormat === "$N") {
        appliedInputProps.startAdornent = (
          <InputAdornment
            position="start"
            className={this.props.classes.standardAddornment}
          >
            <IconButton
              tabIndex={-1}
              classes={{root: this.props.classes.iconButton}}
              onMouseDown={this.catchToggleMouseDownEvent}
            >
              {this.props.currency.symbol}
            </IconButton>
          </InputAdornment>
        );
      } else {
        appliedInputProps.endAdornment = (
          <InputAdornment
            position="end"
            className={this.props.classes.standardAddornment}
          >
            <IconButton
              tabIndex={-1}
              classes={{root: this.props.classes.iconButton}}
              onMouseDown={this.catchToggleMouseDownEvent}
            >
              {this.props.currency.symbol}
            </IconButton>
          </InputAdornment>
        );
      }
    } else if (this.props.type === "unit") {
      appliedInputProps.endAdornment = (
        <InputAdornment
          position="end"
          className={this.props.classes.standardAddornment}
        >
          <IconButton
            tabIndex={-1}
            classes={{ root: this.props.classes.iconButton }}
            onMouseDown={this.catchToggleMouseDownEvent}
            onClick={this.openUnitDialog}
          >
            {this.props.unitToNode(this.props.unit)}
          </IconButton>
        </InputAdornment>
      );
    } else if (this.props.canRestore) {
      let icon: React.ReactNode;
      if (this.props.currentAppliedValue) {
        icon = <RestoreIcon/>
      } else {
        icon = <ClearIcon />
      }
      appliedInputProps.endAdornment = (
        <InputAdornment
          position="end"
          className={this.props.classes.standardAddornment}
        >
          <IconButton
            tabIndex={-1}
            classes={{root: this.props.classes.iconButton}}
            onClick={this.props.onRestore}
            onMouseDown={this.catchToggleMouseDownEvent}
          >
            {icon}
          </IconButton>
        </InputAdornment>
      );
    } else if (this.props.icon) {
      // set it at the end
      appliedInputProps.endAdornment = (
        <InputAdornment position="end" className={this.props.classes.standardAddornment}>
          <IconButton
            tabIndex={-1}
            classes={{root: this.props.classes.iconButton}}
          >
            {this.props.icon}
          </IconButton>
        </InputAdornment>
      );
    }

    const unitDialog = this.props.type === "unit" ? (
      <SelectUnitDialogResponsive
        {...this.props}
        open={this.state.unitDialogOpen}
        onClose={this.closeUnitDialog}
      />
    ) : null;

    const descriptionAsAlert = this.props.args["descriptionAsAlert"];
    // return the complex overengineered component in all its glory
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
        <TextField
          fullWidth={true}
          type={this.state.visible ? "text" : "password"}
          className={this.props.classes.entry}
          label={this.props.label}
          placeholder={this.props.placeholder}
          value={
            this.props.currentInternalStrOnlyValue ||
            this.props.currentStrOnlyValue ||
            ""
          }
          onChange={this.onChangeByHTMLEvent}
          onKeyDown={this.onKeyDown}
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
          inputProps={inputProps}
          disabled={this.props.disabled}
          variant="filled"
          {...appliedTextFieldProps}
        />
        <div className={this.props.classes.errorMessage}>
          {this.props.currentInvalidReason}
        </div>

        {unitDialog}
      </div>
    );
  }

  // public renderAutosuggestContainer(
  //   options: Autosuggest.RenderSuggestionsContainerParams,
  // ) {
  //   // returns the autosuggest container that contains the stuff
  //   // handled by react autossugest
  //   return (
  //     <Paper
  //       {...options.containerProps}
  //       square={true}
  //     >
  //       {options.children}
  //     </Paper>
  //   );
  // }

  // public renderAutosuggestSuggestion(
  //   suggestion: IAutocompleteOutputType,
  //   params: Autosuggest.RenderSuggestionParams,
  // ) {
  //   // returns a specific suggestion

  //   // we match the value according to whether is localized or not
  //   // because we support numbers and stuff we need to know what value
  //   // we are matching against, a localized or non localized one
  //   const valueToMatch: string = this.props.autocompleteIsLocalized ?
  //     suggestion.i18n :
  //     suggestion.value;
  //   const matches = match(valueToMatch, params.query);
  //   const parts = parse(valueToMatch, matches);

  //   return (
  //     <MenuItem
  //       className={this.props.classes.autocompleteMenuItem}
  //       selected={params.isHighlighted}
  //       component="div"
  //     >
  //       <div className={this.props.classes.autocompleteMenuItemMainText}>
  //         {
  //           parts.map((part, index) =>
  //             part.highlight ? (
  //               <span key={index} style={{ fontWeight: 500 }}>
  //                 {part.text}
  //               </span>
  //             ) : (
  //               <strong key={index} style={{ fontWeight: 300 }}>
  //                 {part.text}
  //               </strong>
  //             ),
  //           )
  //         }
  //       </div>
  //     </MenuItem>
  //   );
  // }

  // public getSuggestionValue(
  //   suggestion: IAutocompleteOutputType,
  // ) {
  //   // just return the suggestion value as it will want to
  //   // be set in the input, we localize it if deemed necessary
  //   return this.props.autocompleteIsLocalized ?
  //     suggestion.i18n :
  //     suggestion.value;
  // }

  // public onSuggestionsFetchRequested({ value }) {
  //   this.props.onRequestToFetchSuggestions(value);
  // }

  // public renderAutosuggestField() {
  //   return (
  //     <Autosuggest
  //       renderInputComponent={this.renderBasicTextField}
  //       renderSuggestionsContainer={this.renderAutosuggestContainer}
  //       renderSuggestion={this.renderAutosuggestSuggestion}
  //       getSuggestionValue={this.getSuggestionValue}
  //       onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
  //       onSuggestionsClearRequested={this.props.onRequestToClearSuggestions}
  //       suggestions={this.props.autocompleteSuggestions}
  //       theme={{
  //         container: this.props.classes.autocompleteContainer,
  //         containerOpen: this.props.classes.autocompleteContainerOpen,
  //         input: this.props.classes.autocompleteInput,
  //         inputOpen: this.props.classes.autocompleteInputOpen,
  //         inputFocused: "focused",
  //         suggestionsContainer: this.props.classes.autocompleteSuggestionsContainer,
  //         suggestionsContainerOpen: this.props.classes.autocompleteSuggestionsContainerOpen,
  //         suggestionsList: this.props.classes.autocompleteSuggestionsList,
  //         suggestion: this.props.classes.autocompleteSuggestion,
  //         suggestionFirst: this.props.classes.autocompleteFirstSuggestion,
  //         suggestionHighlighted: this.props.classes.autocompleteSuggestionHighlighted,
  //         sectionContainer: this.props.classes.autocompleteSectionContainer,
  //         sectionContainerFirst: this.props.classes.autocompleteFirstSectionContainer,
  //         sectionTitle: this.props.classes.autocompleteSectionTitle,
  //       }}
  //       inputProps={{
  //         value: this.props.currentInternalValue || this.props.currentValue || "",
  //         onChange: this.onChange,
  //         disabled: this.props.disabled,
  //       }}
  //     />
  //   );
  // }
}

const PropertyEntryFieldRenderer = withStyles(style)(ActualPropertyEntryFieldRenderer);
export default PropertyEntryFieldRenderer;