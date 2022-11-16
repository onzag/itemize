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
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

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
  iconButton: {
    color: "#424242",
  },
  label: (invalid: boolean) => ({
    "color": invalid ? "#f44336" : "rgb(66, 66, 66)",
    "&.focused": {
      color: invalid ? "#f44336" : "#3f51b5",
    },
  }),
};

function renderInput(origProps: TextFieldProps) {
  return (props: TextFieldProps) => {
    const onBlur = (e: React.FocusEvent) => {
      origProps.onBlur(e as any);
      props.onBlur && props.onBlur(e as any);
    }

    // merge input props, original takes priority
    let inputProps = origProps.inputProps;
    if (props.inputProps) {
      if (inputProps) {
        inputProps = {
          ...props.inputProps,
          ...origProps.inputProps,
        }
      } else {
        inputProps = props.inputProps;
      }
    }

    return <TextField {...props} {...origProps} onBlur={onBlur} inputProps={inputProps} />
  }
}

// buggy typescript must cast as any because it is buggy
const StyledDatePicker = styled(DatePicker)(style.entry as any);
const StyledDateTimePicker = styled(DateTimePicker)(style.entry as any);
const StyledTimePicker = styled(TimePicker)(style.entry as any);

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
function PropertyEntryDateTimeRenderer(props: IPropertyEntryDateTimeRendererProps) {
  // setting up the component
  let component = null;
  const invalid = shouldShowInvalid(props);

  const appliedInputProps: any = {
    fullWidth: true,
    onBlur: props.enableUserSetErrors,
    inputProps: {
      "aria-describedby": props.description ? props.uniqueId + "_desc" : null,
    },
  };

  if (invalid) {
    appliedInputProps["aria-invalid"] = true;

    if (!props.args.hideError) {
      appliedInputProps.inputProps["aria-errormessage"] = props.uniqueId + "_error";
    }
  }

  if (props.type === "date") {
    component = (
      <StyledDatePicker
        cancelText={props.i18nCancel}
        okText={props.i18nOk}
        label={props.label}
        inputFormat={props.dateTimeFormat}
        value={props.momentValue}
        onChange={props.onChangeByMoment}
        InputProps={{
          fullWidth: true,
          error: invalid,
          classes: {
            focused: "focused",
          },
        }}
        renderInput={renderInput(appliedInputProps)}
        disabled={props.disabled}
        shouldDisableDate={props.args.shouldDisableDate}
        disablePast={props.args.disablePast}
        disableFuture={props.args.disableFuture}
      />
    );
  } else if (props.type === "datetime") {
    const isAMPM = props.dateTimeFormat.includes("A");
    component = (
      <StyledDateTimePicker
        ampm={isAMPM}
        ampmInClock={isAMPM}
        cancelText={props.i18nCancel}
        okText={props.i18nOk}
        label={props.label}
        inputFormat={props.dateTimeFormat}
        value={props.momentValue}
        onChange={props.onChangeByMoment}
        InputProps={{
          fullWidth: true,
          error: invalid,
          classes: {
            focused: "focused",
          },
        }}
        renderInput={renderInput(appliedInputProps)}
        disabled={props.disabled}
        shouldDisableDate={props.args.shouldDisableDate}
        disablePast={props.args.disablePast}
        disableFuture={props.args.disableFuture}
      />
    );
  } else {
    const isAMPM = props.dateTimeFormat.includes("A")
    component = (
      <StyledTimePicker
        ampm={isAMPM}
        ampmInClock={isAMPM}
        cancelText={props.i18nCancel}
        okText={props.i18nOk}
        label={props.label}
        inputFormat={props.dateTimeFormat}
        value={props.momentValue}
        onChange={props.onChangeByMoment}
        InputProps={{
          fullWidth: true,
          error: invalid,
          classes: {
            focused: "focused",
          },
        }}
        renderInput={renderInput(appliedInputProps)}
        disabled={props.disabled}
      />
    );
  }

  const descriptionAsAlert = props.args["descriptionAsAlert"];

  let descriptionObject: React.ReactNode = null;
  if (props.description) {
    descriptionObject = descriptionAsAlert ? (
      <Alert severity="info" sx={style.description} role="note" id={props.uniqueId + "_desc"}>
        {props.description}
      </Alert>
    ) : (
      <Typography variant="caption" sx={style.description} id={props.uniqueId + "_desc"}>
        {props.description}
      </Typography>
    );
  }

  const error = (
    props.args.hideError ? null : <Box sx={style.errorMessage} id={props.uniqueId + "_error"}>
      {props.currentInvalidReason}
    </Box>
  );

  let inner: React.ReactNode;
  if (props.args.useCustomFieldRender) {
    inner = props.args.useCustomFieldRender(descriptionObject, null, component, error, props.disabled);
  } else {
    inner = (
      <>
        {descriptionObject}
        {component}
        {error}
      </>
    )
  }

  // return it
  return (
    <Box sx={style.container}>
      {inner}
    </Box>
  );
};

export default PropertyEntryDateTimeRenderer;