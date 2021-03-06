/**
 * The property entry boolean fast prototyping renderer uses material ui to render
 * an entry for a boolean value
 * 
 * @module
 */

import { IPropertyEntryBooleanRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryBoolean";
import React from "react";
import { Alert, FormControl, FormControlLabel, Switch,
  Typography, Radio, RadioGroup, FormLabel, IconButton,
  createStyles, WithStyles, withStyles, RestoreIcon } from "../../mui-core";
import { capitalize } from "../../../components/localization";

/**
 * The styles of the renderer
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
    paddingBottom: "1.3rem",
  },
  description: {
    width: "100%",
  },
  icon: {
    color: "#424242",
  },
  label: {
    "color": "rgb(66, 66, 66)",
    "width": "100%",
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "space-between",
    "&.focused": {
      color: "#3f51b5",
    },
  },
  labelSingleLine: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

/**
 * The renderer props, based on the properties it will take
 */
interface IPropertyEntryBooleanRendererWithStylesProps extends IPropertyEntryBooleanRendererProps, WithStyles<typeof style> {
}

/**
 * triggers once the boolean has changed
 * @param props the renderer props
 * @param e the event itself
 */
function handleOnChange(
  props: IPropertyEntryBooleanRendererWithStylesProps,
  e: React.ChangeEvent<HTMLInputElement>,
) {
  props.enableUserSetErrors();

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

/**
 * This is the fast prototyping boolean renderer and uses material ui in order to render a slick
 * boolean entry for it, supports the following args
 * 
 * - descriptionAsAlert: displays the description as an alert rather than its normal form
 * 
 * @param props the entry boolean props
 * @returns a react element
 */
const PropertyEntryBooleanRenderer = withStyles(style)((props: IPropertyEntryBooleanRendererWithStylesProps) => {
  const descriptionAsAlert = props.args["descriptionAsAlert"];

  let icon: React.ReactNode = null;
  if (props.canRestore) {
    if (props.currentAppliedValue !== null) {
      icon = <RestoreIcon />
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
          {props.label}{icon ? <IconButton
            tabIndex={-1}
            className={props.classes.icon}
            onClick={props.canRestore && props.currentAppliedValue ? props.onRestore : null}
          >{icon}</IconButton> : null}
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

export default PropertyEntryBooleanRenderer;
