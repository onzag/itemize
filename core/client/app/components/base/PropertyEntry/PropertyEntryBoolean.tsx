import React from "react";
import { IPropertyEntryProps, getClassName } from ".";
import { FormControlLabel, Switch, Icon, FormLabel, FormControl, RadioGroup, Radio } from "@material-ui/core";
import { capitalize } from "../../../../../util";

function PropertyEntryBooleanAsSwitch(props: IPropertyEntryProps) {
  const i18nData = props.property.getI18nDataFor(props.language);
  const className = getClassName(props, "switch", props.poked);
  const i18nLabel = i18nData && i18nData.label;
  const icon = props.property.getIcon();
  const iconComponent = icon ? (
    <Icon classes={{root: "property-entry--icon"}}>{icon}</Icon>
  ) : null;

  return (
    <div className="property-entry--container">
      <FormControl className={className}>
        <FormControlLabel
          aria-label={i18nLabel}
          classes={{
            label: "property-entry--label",
          }}
          control={
            <Switch
              checked={props.value.value as boolean || false}
              onChange={props.onChange.bind(null, !props.value.value, null)}
              classes={{
                root: "property-entry--input",
              }}
            />
          }
          label={i18nLabel}
        />
        {iconComponent}
      </FormControl>
    </div>
  );
}

function handleOnChange(
  props: IPropertyEntryProps,
  e: React.ChangeEvent<HTMLInputElement>,
) {
  if (e.target.value === "null") {
    return props.onChange(null, null);
  }
  return props.onChange(e.target.value === "true", null);
}

function PropertyEntryBooleanAsRadio(props: IPropertyEntryProps) {
  const i18nData = props.property.getI18nDataFor(props.language);
  const className = getClassName(props, "radio", props.poked);
  const i18nLabel = i18nData && i18nData.label;
  const icon = props.property.getIcon();
  const iconComponent = icon ? (
    <Icon classes={{root: "property-entry--icon"}}>{icon}</Icon>
  ) : null;
  const fclClasses = {
    label: "property-entry--label",
  };

  return (
    <div className="property-entry--container">
      <FormControl component={"fieldset" as any} className={className}>
        <FormLabel
          aria-label={i18nLabel}
          component={"legend" as any}
          classes={{
            root: "property-entry--label",
            focused: "focused",
          }}
        >
          {i18nLabel}{iconComponent}
        </FormLabel>
        <RadioGroup
          value={JSON.stringify(props.value.value)}
          onChange={handleOnChange.bind(this, props)}
        >
          <FormControlLabel
            classes={fclClasses}
            value="true"
            control={<Radio/>}
            label={capitalize(props.i18n.yes)}
          />
          <FormControlLabel
            classes={fclClasses}
            value="false"
            control={<Radio/>}
            label={capitalize(props.i18n.no)}
          />
          <FormControlLabel
            classes={fclClasses}
            value="null"
            control={<Radio/>}
            label={capitalize(props.i18n.unspecified)}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default function PropertyEntryBoolean(props: IPropertyEntryProps) {
  if (!props.property.isNullable()) {
    return PropertyEntryBooleanAsSwitch(props);
  }
  return PropertyEntryBooleanAsRadio(props);
}
