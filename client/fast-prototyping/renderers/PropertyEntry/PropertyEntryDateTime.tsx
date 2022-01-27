/**
 * The property entry date time for fast prototyping
 * 
 * @module
 */

import React, { useState, useEffect } from "react";

import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TimePicker from '@mui/lab/TimePicker';
import { IPropertyEntryDateTimeRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryDateTime";
import { WithStyles } from '@mui/styles';
import createStyles from '@mui/styles/createStyles';
import withStyles from '@mui/styles/withStyles';
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import TextField, { TextFieldProps } from "@mui/material/TextField";

// TODOCHECKMUIUPGRADE

/**
 * A simple helper function that says when it should show invalid
 * @param props the renderer props
 * @returns a boolean on whether is invalid
 */
function shouldShowInvalid(props: IPropertyEntryDateTimeRendererProps) {
  return !props.currentValid;
}

/**
 * The styles for the date time entry
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

/**
 * The props for the ate time renderer
 */
interface IPropertyEntryDateTimeRendererWithStylesProps extends IPropertyEntryDateTimeRendererProps, WithStyles<typeof style> {
}

function renderInput(origProps: TextFieldProps) {
  return (props: TextFieldProps) => {
    const onBlur = (e: React.FocusEvent) => {
      origProps.onBlur(e as any);
      props.onBlur && props.onBlur(e as any);
    }

    return <TextField {...props} {...origProps} onBlur={onBlur} />
  }
}

/**
 * The date time renderer, it uses material ui in order to create very nice pickers for the user
 * these pickers are smart and will make a difference on whether it's a mobile or a computer,
 * it supports the following renderer args
 * 
 * - descriptionAsAlert: shows the description as an alert rather than the default
 * 
 * @param props the entry props
 * @returns a react element
 */
const PropertyEntryDateTimeRenderer = withStyles(style)((props: IPropertyEntryDateTimeRendererWithStylesProps) => {
  // setting up the component
  let component = null;
  if (props.type === "date") {
    // let's extract the locale format from moment for a long date
    // const basicProps = {
    //   autoOk: true,
    //   cancelLabel: props.i18nCancel,
    //   okLabel: props.i18nOk,
    //   label: props.label,
    //   placeholder: props.placeholder,
    //   format: props.dateTimeFormat,
    //   className: props.classes.entry,
    //   fullWidth: true,
    //   value: props.momentValue,
    //   onChange: props.onChangeByMoment,
    //   onBlur: props.enableUserSetErrors,
    //   error: false,
    //   helperText: null as string,
    //   disabled: props.disabled,

    //   renderInput: renderInput({
    //     fullWidth: true,

    //   }),

    //   InputLabelProps={
    //     classes: {
    //       root: props.classes.label,
    //       focused: "focused",
    //     },
    //   },

    //   shouldDisableDate: props.args.shouldDisableDate,
    //   about: props.args.about,
    //   disablePast: props.args.disablePast,
    //   disableFuture: props.args.disableFuture,
    // };

    component = (
      <DatePicker
        cancelText={props.i18nCancel}
        okText={props.i18nOk}
        label={props.label}
        inputFormat={props.dateTimeFormat}
        className={props.classes.entry}
        value={props.momentValue}
        onChange={props.onChangeByMoment}
        InputProps={{
          classes: {
            root: props.classes.fieldInput,
            focused: "focused",
          },
        }}
        renderInput={renderInput({
          fullWidth: true,
          onBlur: props.enableUserSetErrors,
        })}
        disabled={props.disabled}
        shouldDisableDate={props.args.shouldDisableDate}
        disablePast={props.args.disablePast}
        disableFuture={props.args.disableFuture}
      />
    );
  } else if (props.type === "datetime") {
    // let's use the long format with the time format
    // const basicProps = {
    //   autoOk: true,
    //   ampm: props.dateTimeFormat.includes("A"),
    //   cancelLabel: props.i18nCancel,
    //   okLabel: props.i18nOk,
    //   label: props.label,
    //   placeholder: props.placeholder,
    //   inputVariant: "filled" as "filled",
    //   format: props.dateTimeFormat,
    //   className: props.classes.entry,
    //   fullWidth: true,
    //   value: props.momentValue,
    //   onChange: props.onChangeByMoment,
    //   onBlur: props.enableUserSetErrors,
    //   error: false,
    //   helperText: null as string,
    //   disabled: props.disabled,
    //   InputProps: {
    //     classes: {
    //       root: props.classes.fieldInput,
    //       focused: "focused",
    //     },
    //   },
    //   InputLabelProps: {
    //     classes: {
    //       root: props.classes.label,
    //       focused: "focused",
    //     },
    //   },
    //   renderInput,
    // };


    const isAMPM = props.dateTimeFormat.includes("A");
    component = (
      <DateTimePicker
        ampm={isAMPM}
        ampmInClock={isAMPM}
        cancelText={props.i18nCancel}
        okText={props.i18nOk}
        label={props.label}
        inputFormat={props.dateTimeFormat}
        className={props.classes.entry}
        value={props.momentValue}
        onChange={props.onChangeByMoment}
        InputProps={{
          classes: {
            root: props.classes.fieldInput,
            focused: "focused",
          },
        }}
        renderInput={renderInput({
          fullWidth: true,
          onBlur: props.enableUserSetErrors,
        })}
        disabled={props.disabled}
        shouldDisableDate={props.args.shouldDisableDate}
        disablePast={props.args.disablePast}
        disableFuture={props.args.disableFuture}
      />
    );
  } else {
    // and the time only
    // const basicProps = {
    //   autoOk: true,
    //   ampm: props.dateTimeFormat.includes("A"),
    //   cancelLabel: props.i18nCancel,
    //   okLabel: props.i18nOk,
    //   label: props.label,
    //   placeholder: props.placeholder,
    //   inputVariant: "filled" as "filled",
    //   format: props.dateTimeFormat,
    //   className: props.classes.entry,
    //   fullWidth: true,
    //   value: props.momentValue,
    //   onChange: props.onChangeByMoment,
    //   onBlur: props.enableUserSetErrors,
    //   error: false,
    //   helperText: null as string,
    //   disabled: props.disabled,
    //   InputProps: {
    //     classes: {
    //       root: props.classes.fieldInput,
    //       focused: "focused",
    //     },
    //   },
    //   InputLabelProps: {
    //     classes: {
    //       root: props.classes.label,
    //       focused: "focused",
    //     },
    //   },
    // };

    const isAMPM = props.dateTimeFormat.includes("A")
    component = (
      <TimePicker
        ampm={isAMPM}
        ampmInClock={isAMPM}
        cancelText={props.i18nCancel}
        okText={props.i18nOk}
        label={props.label}
        inputFormat={props.dateTimeFormat}
        className={props.classes.entry}
        value={props.momentValue}
        onChange={props.onChangeByMoment}
        InputProps={{
          classes: {
            root: props.classes.fieldInput,
            focused: "focused",
          },
        }}
        renderInput={renderInput({
          fullWidth: true,
          onBlur: props.enableUserSetErrors,
        })}
        disabled={props.disabled}
      />
    );
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