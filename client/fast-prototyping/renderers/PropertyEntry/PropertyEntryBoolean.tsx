import { IPropertyEntryBooleanRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryBoolean";
import { createStyles, WithStyles, withStyles } from "@material-ui/styles";
import { IPropertyEntryThemeType, STANDARD_THEME } from "./styles";
import React from "react";
import { Alert } from "@material-ui/lab";
import { ThemeProvider, FormControl, FormControlLabel, Switch, Typography, Radio, RadioGroup, FormLabel, IconButton } from "@material-ui/core";
import { capitalize } from "../../../components/localization";
import RestoreIcon from '@material-ui/icons/Restore';
import ClearIcon from '@material-ui/icons/Clear';

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
    paddingBottom: theme.errorMessageContainerSize,
  },
  description: {
    width: "100%",
  },
  icon: {
    color: theme.iconColor,
  },
  label: {
    "color": theme.labelColor,
    "width": "100%",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "&.focused": {
      color: theme.labelFocusedColor,
    },
  },
  labelSingleLine: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

interface IPropertyEntryBooleanRendererWithStylesProps extends IPropertyEntryBooleanRendererProps, WithStyles<typeof style> {
}

function handleOnChange(
  props: IPropertyEntryBooleanRendererWithStylesProps,
  e: React.ChangeEvent<HTMLInputElement>,
) {
  // we extract the value from the browser event
  const value = e.target.value;
  // if the value is null as a string
  if (value === "null") {
    // we trigger the change to null
    return props.onChange(null, null);
  }
  // if the value comes as it's true or false, we pass it as so
  // note how we don't use internal values for booleans
  return props.onChange(value === "true", null);
}

const ActualPropertyEntryBooleanRendererWithStyles = withStyles(style)((props: IPropertyEntryBooleanRendererWithStylesProps) => {
  const descriptionAsAlert = props.args["descriptionAsAlert"];

  let icon: React.ReactNode;
  if (props.canRestore) {
    if (props.currentAppliedValue !== null) {
      icon = <RestoreIcon />
    } else {
      icon = <ClearIcon />
    }
  } else if (props.icon) {
    icon = props.icon;
  }

  let internalContent: React.ReactNode = null;
  if (props.isTernary) {
    const values = [{
      value: "true",
      label: capitalize(props.trueLabel),
    }, {
      value: "false",
      label: capitalize(props.falseLabel),
    }, {
      value: "null",
      label: capitalize(props.nullLabel),
    }];
    internalContent = (
      <FormControl
        component={"fieldset" as any}
        className={props.classes.entry}
      >
        <FormLabel
          aria-label={props.label}
          component={"legend" as any}
          classes={{
            root: props.classes.label + " " + props.classes.labelSingleLine,
            focused: "focused",
          }}
        >
          {props.label}{icon ? <IconButton className={props.classes.icon} onClick={props.canRestore ? props.onRestore : null}>{icon}</IconButton> : null}
        </FormLabel>
        <RadioGroup
          value={JSON.stringify(props.currentValue)}
          onChange={handleOnChange.bind(this, props)}
        >
          {values.map((v) => <FormControlLabel
            key={v.value}
            classes={{
              label: props.classes.label
            }}
            value={v.value}
            control={<Radio/>}
            label={v.label}
            disabled={props.disabled}
          />)}
        </RadioGroup>
      </FormControl>
    )
  } else {
    internalContent = (
      <FormControl className={props.classes.entry}>
        <FormControlLabel
          aria-label={props.label}
          classes={{
            label: props.classes.label,
          }}
          control={
            <Switch
              checked={props.currentValue}
              onChange={props.onChange.bind(null, !props.currentValue, null)}
              disabled={props.disabled}
            />
          }
          label={props.label}
        />
        {icon ? <IconButton className={props.classes.icon} onClick={props.canRestore ? props.onRestore : null}>{icon}</IconButton> : null}
      </FormControl>
    )
  }
  return (
    <div className={props.classes.container}>
      {props.description && descriptionAsAlert ? <Alert severity="info" className={props.classes.description}>
        {props.description}
      </Alert> : null}
      {internalContent}
      {props.description && !descriptionAsAlert ? <Typography variant="caption" className={props.classes.description}>
        {props.description}
      </Typography> : null}
    </div>
  );
});

// TODO the ternary entry

export default function PropertyEntryFieldRenderer(props: IPropertyEntryBooleanRendererProps) {
  let appliedTheme: IPropertyEntryThemeType = STANDARD_THEME;
  if (props.args["theme"]) {
    appliedTheme = {
      ...STANDARD_THEME,
      ...props.args["theme"],
    };
  }
  return (
    <ThemeProvider theme={appliedTheme}>
      <ActualPropertyEntryBooleanRendererWithStyles {...props} />
    </ThemeProvider>
  )
}