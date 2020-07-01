import React, { useState, useEffect } from "react";
import {
  DatePicker,
  KeyboardDatePicker,
  DateTimePicker,
  KeyboardDateTimePicker,
  TimePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { Alert, Typography, createStyles, WithStyles, withStyles, TextField } from "../../mui-core";
import { getLocalizedDateFormat, getLocalizedTimeFormat, getLocalizedDateTimeFormat } from "../../../../util";
import { IPropertyEntryDateTimeRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryDateTime";

function shouldShowInvalid(props: IPropertyEntryDateTimeRendererProps) {
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
  iconButton: {
    color: "#424242",
  },
  label: (props: IPropertyEntryDateTimeRendererProps) => ({
    "color": shouldShowInvalid(props) ? "#f44336" : "rgb(66, 66, 66)",
    "&.focused": {
      color: shouldShowInvalid(props) ? "#f44336" : "#3f51b5",
    },
  }),
  fieldInput: (props: IPropertyEntryDateTimeRendererProps) => {
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
});

interface IPropertyEntryDateTimeRendererWithStylesProps extends IPropertyEntryDateTimeRendererProps, WithStyles<typeof style> {
}

const PropertyEntryDateTimeRenderer = withStyles(style)((props: IPropertyEntryDateTimeRendererWithStylesProps) => {
  // we want this to be a double pass because we can't do SSR on this component
  // because we are dependant on the phone or pad property that can only be calculated on the client side
  // so we render null initially
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    // TODO autofocus
  }, []);

  // setting up the component
  let component = null;
  if (isReady && props.type === "date") {
    // let's extract the locale format from moment for a long date
    const L = getLocalizedDateFormat();
    const basicProps = {
      autoOk: true,
      cancelLabel: props.i18nCancel,
      okLabel: props.i18nOk,
      label: props.label,
      placeholder: props.placeholder,
      inputVariant: "filled" as "filled",
      format: L,
      className: props.classes.entry,
      fullWidth: true,
      value: props.momentValue,
      onChange: props.onChangeByMoment,
      error: false,
      helperText: null as string,
      disabled: props.disabled,
      InputProps: {
        classes: {
          root: props.classes.fieldInput,
          focused: "focused",
        },
      },
      InputLabelProps: {
        classes: {
          root: props.classes.label,
          focused: "focused",
        },
      },
    };

    if (!(window as any).PHONE_OR_PAD) {
      component = (
        <KeyboardDatePicker
          KeyboardButtonProps={{
            classes: {
              root: props.classes.iconButton,
            },
          }}
          {...basicProps}
        />
      );
    } else {
      component = (
        <DatePicker {...basicProps} />
      );
    }
  } else if (isReady && props.type === "datetime") {
    // let's use the long format with the time format
    const LLT = getLocalizedDateTimeFormat();
    const basicProps = {
      autoOk: true,
      ampm: LLT.includes("A"),
      cancelLabel: props.i18nCancel,
      okLabel: props.i18nOk,
      label: props.label,
      placeholder: props.placeholder,
      inputVariant: "filled" as "filled",
      format: LLT,
      className: props.classes.entry,
      fullWidth: true,
      value: props.momentValue,
      onChange: props.onChangeByMoment,
      error: false,
      helperText: null as string,
      disabled: props.disabled,
      InputProps: {
        classes: {
          root: props.classes.fieldInput,
          focused: "focused",
        },
      },
      InputLabelProps: {
        classes: {
          root: props.classes.label,
          focused: "focused",
        },
      },
    };

    if (!(window as any).PHONE_OR_PAD) {
      component = (
        <KeyboardDateTimePicker
          KeyboardButtonProps={{
            classes: {
              root: props.classes.iconButton,
            },
          }}
          {...basicProps}
        />
      );
    } else {
      component = (
        <DateTimePicker {...basicProps} />
      );
    }
  } else if (isReady && props.type === "time") {
    // and the time only
    const LT = getLocalizedTimeFormat();
    const basicProps = {
      autoOk: true,
      ampm: LT.includes("A"),
      cancelLabel: props.i18nCancel,
      okLabel: props.i18nOk,
      label: props.label,
      placeholder: props.placeholder,
      inputVariant: "filled" as "filled",
      format: LT,
      className: props.classes.entry,
      fullWidth: true,
      value: props.momentValue,
      onChange: props.onChangeByMoment,
      error: false,
      helperText: null as string,
      disabled: props.disabled,
      InputProps: {
        classes: {
          root: props.classes.fieldInput,
          focused: "focused",
        },
      },
      InputLabelProps: {
        classes: {
          root: props.classes.label,
          focused: "focused",
        },
      },
    };

    if (!(window as any).PHONE_OR_PAD) {
      component = (
        <KeyboardTimePicker
          KeyboardButtonProps={{
            classes: {
              root: props.classes.iconButton,
            },
          }}
          {...basicProps}
        />
      );
    } else {
      component = (
        <TimePicker {...basicProps} />
      );
    }
  } else {
    // it's not ready let's make a textfield instead this
    // is some form of pretty placeholder
    component = (
      <TextField
        disabled={props.disabled}
        InputProps={{
          classes: {
            root: props.classes.fieldInput,
            focused: "focused",
          },
        }}
        InputLabelProps={{
          classes: {
            root: props.classes.label,
            focused: "focused",
          },
        }}
        fullWidth={true}
        label={props.label}
        placeholder={props.placeholder}
        variant="filled"
        className={props.classes.entry}
      />
    )
  }

  const descriptionAsAlert = props.args["descriptionAsAlert"];
  // return it
  return (
    <div className={props.classes.container}>
      {
        props.description && descriptionAsAlert ?
          <Alert severity="info" className={props.classes.description}>
            {props.description}
          </Alert> :
          null
      }
      {
        props.description && !descriptionAsAlert ?
          <Typography variant="caption" className={props.classes.description}>
            {props.description}
          </Typography> :
          null
      }
      {component}
      <div className={props.classes.errorMessage}>
        {props.currentInvalidReason}
      </div>
    </div>
  );
});

export default PropertyEntryDateTimeRenderer;