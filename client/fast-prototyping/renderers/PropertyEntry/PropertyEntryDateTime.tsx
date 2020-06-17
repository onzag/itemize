import React, { useState, useEffect } from "react";
import {
  DatePicker,
  KeyboardDatePicker,
  DateTimePicker,
  KeyboardDateTimePicker,
  TimePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import { Icon, ThemeProvider, Typography } from "@material-ui/core";
import { getLocalizedDateFormat, getLocalizedTimeFormat, getLocalizedDateTimeFormat } from "../../../../util";
import { createStyles, WithStyles, withStyles } from "@material-ui/styles";
import { IPropertyEntryThemeType, STANDARD_THEME } from "./styles";
import { IPropertyEntryDateTimeRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryDateTime";
import { Alert } from "@material-ui/lab";
import RestoreIcon from '@material-ui/icons/Restore';
import ClearIcon from '@material-ui/icons/Clear';

function shouldShowInvalid(props: IPropertyEntryDateTimeRendererProps) {
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
  iconButton: {
    color: theme.iconColor,
  },
  label: (props: IPropertyEntryDateTimeRendererProps) => ({
    "color": shouldShowInvalid(props) ? theme.labelInvalidColor : theme.labelColor,
    "&.focused": {
      color: shouldShowInvalid(props) ? theme.labelInvalidFocusedColor : theme.labelFocusedColor,
    },
  }),
  fieldInput: (props: IPropertyEntryDateTimeRendererProps) => {
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
});

interface IPropertyEntryDateTimeRendererWithStylesProps extends IPropertyEntryDateTimeRendererProps, WithStyles<typeof style> {
}

const ActualPropertyEntryDateTimeRendererWithStyles = withStyles(style)((props: IPropertyEntryDateTimeRendererWithStylesProps) => {
  // we want this to be a double pass because we can't do SSR on this component
  // because we are dependant on the phone or pad property that can only be calculated on the client side
  // so we render null initially
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    // TODO autofocus
  }, []);

  if (!isReady) {
    return null;
  }

  // setting up the component
  let component = null;
  if (props.type === "date") {
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
  } else if (props.type === "datetime") {
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
  } else if (props.type === "time") {
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
})

export default function PropertyEntryDateTimeRenderer(props: IPropertyEntryDateTimeRendererProps) {
  let appliedTheme: IPropertyEntryThemeType = STANDARD_THEME;
  if (props.args["theme"]) {
    appliedTheme = {
      ...STANDARD_THEME,
      ...props.args["theme"],
    };
  }
  return (
    <ThemeProvider theme={appliedTheme}>
      <ActualPropertyEntryDateTimeRendererWithStyles {...props} />
    </ThemeProvider>
  )
}