/**
 * The entry for field based (text/number) types
 * @module
 */

import React from "react";
import { IPropertyEntryFieldRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryField";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import RestoreIcon from "@mui/icons-material/Restore";
import ClearIcon from "@mui/icons-material/Clear";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextField from "@mui/material/TextField";
import IconVisibility from "@mui/icons-material/Visibility";
import IconVisibilityOff from "@mui/icons-material/VisibilityOff";
import { CountryPicker } from "../../components/country-picker";
import type { ICountryType } from "../../../../imported-resources";
import PropertyEntrySelectRenderer from "./PropertyEntrySelect";
import Box from "@mui/material/Box";
import { RestoreIconButton } from "./general";

/**
 * A simple helper function that says when it should show invalid
 * @param props the renderer props
 * @returns a boolean on whether is invalid
 */
function shouldShowInvalid(props: IPropertyEntryFieldRendererProps) {
  return !props.currentValid;
}

/**
 * The styles for the field
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
  standardAddornment: (isInvalid: boolean) => ({
    color: isInvalid ? "#f44336" : "#424242",
    marginRight: "-10px",
  }),
  smallAddornment: (isInvalid: boolean) => ({
    color: isInvalid ? "#f44336" : "#424242",
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
  iconButtonSmall: {
    color: "#424242",
    width: "32px",
    height: "32px",
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
  fieldInput: (isInvalid: boolean, disabled: boolean) => {
    if (isInvalid) {
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
          borderBottomColor: disabled ? "rgba(0,0,0,0.42)" : "#f44336",
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
  fieldForPhone: {
    width: "100%",
    display: "flex",
  }
};

/**
 * The state for the entry renderer
 */
interface IPropertyEntryFieldRendererState {
  /**
   * For passwords, whether it's visible
   */
  visible: boolean;
  /**
   * For units and currencies whether the dialog
   * to change the current is open
   */
  dialogOpen: boolean;
  /*
   * the default country code
   */
  defaultCountryCode: string;
}

/**
 * The props for the select unit dialog when the field represents a unit
 * numeric value
 */
interface ISelectUnitDialogProps extends IPropertyEntryFieldRendererProps {
  /**
   * Whether the dialog is open
   */
  open: boolean;
  /**
   * triggers when closes
   */
  onClose: () => void;
  /**
   * Whether it's full screen
   */
  fullScreen?: boolean;
}

/**
 * A dialog that allows to select an unit
 * @param props the props for the select unit dialog
 * @returns a react element
 */
function SelectUnitDialog(props: ISelectUnitDialogProps) {
  // closes the dialog
  const closeAndChangeUnit = (unit: string) => {
    props.onClose();
    props.onChangeUnit(unit);
  }
  return (
    <Dialog
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
            <ListItemText primary={props.unitToNode(props.unitPrimary)} />
          </ListItem>
          <ListItem
            selected={props.unitPrimaryImperial === props.unit}
            button={true}
            onClick={closeAndChangeUnit.bind(null, props.unitPrimaryImperial)}
          >
            <ListItemText primary={props.unitToNode(props.unitPrimaryImperial)} />
          </ListItem>
        </List>
        {!props.unitIsLockedToPrimaries ? <>
          <Divider />
          <List
            subheader={<ListSubheader
              classes={{ root: "props.subheaderClassName" }}
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
                <ListItemText primary={props.unitToNode(unit)} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List
            subheader={<ListSubheader classes={{ root: "props.subheaderClassName" }}>
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
                <ListItemText primary={props.unitToNode(unit)} />
              </ListItem>
            ))}
          </List>
        </> : null}
      </div>
    </Dialog>
  );
}

/**
 * The select unit dialog, but responsive
 */
const SelectUnitDialogResponsive = function (props: ISelectCurrencyDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return <SelectUnitDialog {...props} fullScreen={fullScreen} />;
}

/**
 * The select currency dialog props
 */
interface ISelectCurrencyDialogProps extends IPropertyEntryFieldRendererProps {
  /**
   * Whether such a dialog is open
   */
  open: boolean;
  /**
   * Triggers when it closes
   */
  onClose: () => void;
  /**
   * Whether the dialog is in fullscreen mode
   */
  fullScreen?: boolean;
}

/**
 * Allows the user to select the current currency
 * @param props the dialog props
 * @returns a react element
 */
function SelectCurrencyDialog(props: ISelectCurrencyDialogProps) {
  const closeAndChangeCurrency = (code: string) => {
    props.onClose();
    props.onChangeCurrency(code);
  }
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="currency-dialog-title"
      fullScreen={props.fullScreen}
    >
      <DialogTitle id="currency-dialog-title">{props.currencyI18n.title}</DialogTitle>
      <div>
        <List>
          {props.currencyAvailable.map((currency) => (
            <ListItem
              selected={currency.code === props.currency.code}
              button={true}
              onClick={closeAndChangeCurrency.bind(null, currency.code)}
              key={currency.code}
            >
              <ListItemText primary={currency.symbol + " - " + currency.code} />
            </ListItem>
          ))}
        </List>
      </div>
    </Dialog>
  );
}

/**
 * The select currency dialog, but responsive
 */
const SelectCurrencyDialogResponsive = function (props: ISelectCurrencyDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return <SelectCurrencyDialog {...props} fullScreen={fullScreen} />;
}

/**
 * The actual entry field renderer, as a class, because it's fairly complicated, this renderer handles basic
 * types that are displayed as a single line text, this includes some numeric types, and even some complex types
 * such as unit and currency, this is because unlike other types their primary use is just writting something
 */
class PropertyEntryFieldRenderer
  extends React.Component<IPropertyEntryFieldRendererProps, IPropertyEntryFieldRendererState> {

  private inputRef: HTMLInputElement;
  private inputRefSelectionStart: number;

  constructor(props: IPropertyEntryFieldRendererProps) {
    super(props);

    this.state = {
      visible: props.type !== "password",
      dialogOpen: false,
      defaultCountryCode: props.defaultCountry && props.defaultCountry.code,
    }

    this.toggleVisible = this.toggleVisible.bind(this);
    this.catchToggleMouseDownEvent = this.catchToggleMouseDownEvent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onPhoneCountryChange = this.onPhoneCountryChange.bind(this);
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

  public onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    // the change has two values, a textual value, and a
    // numeric value, texual value is always set but
    // numeric value is only set for numbers
    let value: string = e.target.value.toString();

    if (this.props.subtype === "phone" && value !== "" && value.indexOf("+") !== 0) {
      const currentCountryUsed = this.props.currentValue ?
        this.props.countriesAvailable.find((c) => this.props.currentValue.toString().indexOf("+" + c.phone) === 0) :
        this.props.countriesAvailable.find((c) => c.code === this.state.defaultCountryCode);

      if (value.indexOf("0") === 0) {
        value = value.replace("0", "+" + currentCountryUsed.phone);
      } else {
        value = "+" + currentCountryUsed.phone + value;
      }
    }

    this.props.onChangeByTextualValue(value);
  }

  public openDialog() {
    this.setState({
      dialogOpen: true,
    });
  }

  public closeDialog() {
    this.setState({
      dialogOpen: false,
    });
  }

  public onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (this.props.args.onEnter && e.keyCode === 13) {
      this.props.args.onEnter();
    }
  }

  public onPhoneCountryChange(newCountryCode: string) {
    const phoneCodeOfNewCountry = "+" + this.props.countriesAvailable.find((c) => c.code === newCountryCode).phone;
    const phoneCodeOfOldCountry = "+" + (this.props.currentValue ?
      this.props.countriesAvailable.find((c) => this.props.currentValue.toString().indexOf("+" + c.phone) === 0).phone :
      this.props.countriesAvailable.find((c) => c.code === this.state.defaultCountryCode).phone);

    const currentValue = this.props.currentValue;
    if (currentValue) {
      const newValue = currentValue.toString().replace(phoneCodeOfOldCountry, phoneCodeOfNewCountry);
      this.props.onChangeByTextualValue(newValue);
    }

    this.setState({
      defaultCountryCode: newCountryCode,
    });
  }

  public render() {
    if (this.props.subtype === "country" || this.props.subtype === "language" || this.props.subtype === "currency") {
      return (
        <PropertyEntrySelectRenderer
          args={this.props.args}
          autoFocus={this.props.autoFocus}
          canRestore={this.props.canRestore}
          currentAppliedValue={this.props.currentAppliedValue as any}
          currentI18nValue={this.props.currentTextualValue}
          currentValid={this.props.currentValid}
          currentValue={this.props.currentValue as any}
          disabled={this.props.disabled}
          enableUserSetErrors={this.props.enableUserSetErrors}
          isList={false}
          isNullable={false}
          isNumeric={false}
          nullValue={{
            i18nValue: "",
            value: null,
          }}
          onChange={this.props.onChange as any}
          onRestore={this.props.onRestore}
          propertyId={this.props.propertyId}
          rtl={this.props.rtl}
          values={this.props.subtype === "country" ? this.props.countriesAvailable.map((c) => ({
            i18nValue: c.native,
            value: c.code,
          })) : (this.props.subtype === "language" ? this.props.languagesAvailable.map((l) => ({
            i18nValue: l.native,
            value: l.code,
          })) : this.props.currencyAvailable.map((l) => ({
            i18nValue: l.name + "(" + l.symbol + ")",
            value: l.code,
          })))}
          currentInternalValue={this.props.currentInternalValue}
          currentInvalidReason={this.props.currentInvalidReason}
          description={this.props.description}
          icon={this.props.icon}
          label={this.props.label}
          placeholder={this.props.placeholder}
        />
      )
    }

    // set the input mode, this is for mobile,
    // basically according to our input we need
    // different keys
    let inputMode = "text";
    if (this.props.subtype === "email") {
      inputMode = "email";
    }
    if (this.props.subtype === "phone") {
      inputMode = "phone";
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

    const isInvalid = shouldShowInvalid(this.props);

    // if the type is a password
    if (this.props.type === "password") {
      // set the end addornment for the show and hide button
      appliedInputProps.endAdornment = (
        <InputAdornment
          position="end"
          sx={style.standardAddornment(isInvalid)}
        >
          <IconButton
            tabIndex={-1}
            sx={style.iconButton}
            onClick={this.toggleVisible}
            onMouseDown={this.catchToggleMouseDownEvent}
            size="large">
            {this.state.visible ? <IconVisibility /> : <IconVisibilityOff />}
          </IconButton>
        </InputAdornment>
      );
    } else if (this.props.type === "currency") {
      if (this.props.currencyFormat === "$N") {
        appliedInputProps.startAdornment = (
          <InputAdornment
            position="start"
            sx={style.smallAddornment(isInvalid)}
          >
            <IconButton
              tabIndex={-1}
              sx={style.iconButtonSmall}
              onMouseDown={this.catchToggleMouseDownEvent}
              onClick={this.openDialog}
              size="large">
              {this.props.currency.symbol}
            </IconButton>
          </InputAdornment>
        );
      } else {
        appliedInputProps.endAdornment = (
          <InputAdornment
            position="end"
            sx={style.standardAddornment(isInvalid)}
          >
            <IconButton
              tabIndex={-1}
              sx={style.iconButton}
              onMouseDown={this.catchToggleMouseDownEvent}
              onClick={this.openDialog}
              size="large">
              {this.props.currency.symbol}
            </IconButton>
          </InputAdornment>
        );
      }
    } else if (this.props.type === "unit") {
      appliedInputProps.endAdornment = (
        <InputAdornment
          position="end"
          sx={style.standardAddornment(isInvalid)}
        >
          <IconButton
            tabIndex={-1}
            sx={style.iconButton}
            onMouseDown={this.catchToggleMouseDownEvent}
            onClick={this.openDialog}
            size="large">
            {this.props.unitToNode(this.props.unit)}
          </IconButton>
        </InputAdornment>
      );
    } else if (this.props.canRestore) {
      let icon: React.ReactNode;
      if (this.props.currentAppliedValue) {
        icon = <RestoreIcon />
      } else {
        icon = <ClearIcon />
      }
      appliedInputProps.endAdornment = (
        <InputAdornment
          position="end"
          sx={style.standardAddornment(isInvalid)}
        >
          <IconButton
            tabIndex={-1}
            sx={style.iconButton}
            onClick={this.props.onRestore}
            onMouseDown={this.catchToggleMouseDownEvent}
            size="large">
            {icon}
          </IconButton>
        </InputAdornment>
      );
    } else if (this.props.icon) {
      // set it at the end
      appliedInputProps.endAdornment = (
        <InputAdornment position="end" sx={style.standardAddornment(isInvalid)}>
          <RestoreIconButton
            sx={style.iconButton}
          >
            {this.props.icon}
          </RestoreIconButton>
        </InputAdornment>
      );
    }

    const unitDialog = this.props.type === "unit" ? (
      <SelectUnitDialogResponsive
        {...this.props}
        open={this.state.dialogOpen}
        onClose={this.closeDialog}
      />
    ) : null;

    const currencyDialog = this.props.type === "currency" ? (
      <SelectCurrencyDialogResponsive
        {...this.props}
        open={this.state.dialogOpen}
        onClose={this.closeDialog}
      />
    ) : null;

    let valueToUse = this.props.currentTextualValue;
    let currentCountryUsed: ICountryType = null;
    if (this.props.subtype === "phone") {
      currentCountryUsed = this.props.currentValue ?
        this.props.countriesAvailable.find((c) => this.props.currentValue.toString().indexOf("+" + c.phone) === 0) :
        this.props.countriesAvailable.find((c) => c.code === this.state.defaultCountryCode);

      if (!currentCountryUsed) {
        currentCountryUsed = this.props.countriesAvailable.find((c) => c.code === this.state.defaultCountryCode);
      }

      if (valueToUse) {
        valueToUse = valueToUse.replace("+" + currentCountryUsed.phone, "0");
      }
    }

    const textField = (
      <TextField
        fullWidth={true}
        type={this.state.visible ? "text" : "password"}
        sx={style.entry}
        label={this.props.label}
        placeholder={this.props.placeholder}
        value={valueToUse}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        onBlur={this.props.enableUserSetErrors}
        InputProps={{
          sx: style.fieldInput(isInvalid, this.props.disabled),
          classes: {
            focused: "focused",
          },
          disabled: this.props.disabled,
          ...appliedInputProps,
          ...this.props.args.inputProps,
        }}
        InputLabelProps={{
          sx: style.label(isInvalid),
          classes: {
            focused: "focused",
          },
        }}
        inputProps={inputProps}
        disabled={this.props.disabled}
        variant={this.props.args.fieldVariant || "filled"}
        {...appliedTextFieldProps}
      />
    );

    let fieldComponent = textField;
    if (this.props.subtype === "phone") {
      fieldComponent = (
        <Box sx={style.fieldForPhone}>
          <CountryPicker
            currentCode={currentCountryUsed.code}
            handleCountryChange={this.onPhoneCountryChange}
            usePhoneCode={true}
          />
          {textField}
        </Box>
      )
    }

    const descriptionAsAlert = this.props.args["descriptionAsAlert"];
    // return the complex overengineered component in all its glory
    return (
      <Box sx={style.container}>
        {
          this.props.description && descriptionAsAlert ?
            <Alert severity="info" sx={style.description} role="note">
              {this.props.description}
            </Alert> :
            null
        }
        {
          this.props.description && !descriptionAsAlert ?
            <Typography variant="caption" sx={style.description}>
              {this.props.description}
            </Typography> :
            null
        }
        {fieldComponent}
        {this.props.args.hideError ? null : <Box sx={style.errorMessage}>
          {this.props.currentInvalidReason}
        </Box>}

        {unitDialog}
        {currencyDialog}
      </Box>
    );
  }
}

/**
 * The entry field renderer, as a class, because it's fairly complicated, this renderer handles basic
 * types that are displayed as a single line text, this includes some numeric types, and even some complex types
 * such as unit and currency, this is because unlike other types their primary use is just writting something
 * 
 * Supported args
 * - descriptionAsAlert: the description as alert rather than the standard
 * - onEnter: A function that triggers when the enter key is pressed
 */
export default PropertyEntryFieldRenderer;
