/**
 * The property entry boolean fast prototyping renderer uses material ui to render
 * an entry for a boolean value
 * 
 * @module
 */

import { IPropertyEntryBooleanRendererProps } from "../../../internal/components/PropertyEntry/PropertyEntryBoolean";
import React from "react";
import { capitalize } from "../../../components/localization";
import IconButton from "@mui/material/IconButton";
import Alert from '@mui/material/Alert';
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import RestoreIcon from "@mui/icons-material/Restore";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { RestoreIconButton } from "./general";

/**
 * The styles of the renderer
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
};

/**
 * triggers once the boolean has changed
 * @param props the renderer props
 * @param e the event itself
 */
function handleOnChange(
  props: IPropertyEntryBooleanRendererProps,
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
function PropertyEntryBooleanRenderer(props: IPropertyEntryBooleanRendererProps) {
  const descriptionAsAlert = props.args["descriptionAsAlert"];

  let icon: React.ReactNode = null;
  if (props.canRestore && !props.args.disableRestore) {
    if (props.currentAppliedValue !== null) {
      icon = <RestoreIcon />
    }
  } else if (props.args.icon) {
    icon = props.args.icon;
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
        sx={style.entry}
      >
        {props.label ? <FormLabel
          aria-label={props.label}
          component={"legend" as any}
          sx={[style.label, style.labelSingleLine]}
          classes={{
            focused: "focused",
          }}
        >
          {props.label}{icon ? <RestoreIconButton
            sx={style.icon}
            onClick={props.canRestore && !props.args.disableRestore && props.currentAppliedValue ? props.onRestore : null}
          >{icon}</RestoreIconButton> : null}
        </FormLabel> : null}
        <RadioGroup
          value={JSON.stringify(props.currentValue)}
          onChange={handleOnChange.bind(this, props)}
        >
          {values.map((v) => <FormControlLabel
            key={v.value}
            componentsProps={{
              typography: {
                sx: style.label,
              }
            }}
            value={v.value}
            control={<Radio />}
            label={v.label}
            disabled={props.disabled}
          />)}
        </RadioGroup>
      </FormControl>
    )
  } else {
    internalContent = (
      <FormControl sx={style.entry}>
        <FormControlLabel
          aria-label={props.label}
          aria-describedby={props.description ? props.uniqueId + "_desc" : null}
          componentsProps={{
            typography: {
              sx: style.label,
            }
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
        {icon ? <RestoreIconButton
          sx={style.icon}
          onClick={props.canRestore && !props.args.disableRestore ? props.onRestore : null}
        >{icon}</RestoreIconButton> : null}
      </FormControl>
    )
  }

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

  let inner: React.ReactNode;
  if (props.args.useCustomFieldRender) {
    inner = props.args.useCustomFieldRender(descriptionObject, null, internalContent, null, props.disabled);
  } else {
    inner = (
      <>
        {descriptionObject}
        {internalContent}
      </>
    )
  }

  return (
    <Box sx={style.container}>
      {inner}
    </Box>
  );
};

export default PropertyEntryBooleanRenderer;
