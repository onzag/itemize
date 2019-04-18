import React from "react";
import { IPropertyEntryProps, getClassName } from ".";
import { FormControlLabel, Switch, Icon, FormLabel, FormControl, RadioGroup, Radio } from "@material-ui/core";
import { capitalize } from "../../../../../util";
import equals from "deep-equal";

export function PropertyEntryBooleanAsSwitchBase(props: {
  className?: string;
  onChange: () => void;
  checked: boolean;
  disabled?: boolean;
  label: string;
  description?: string;
  iconComponent?: any;
}) {
  return (
    <div className="property-entry-container">
      {props.description ? <div className="property-entry-description">{props.description}</div> : null}
      <FormControl className={props.className ? props.className : "property-entry property-entry--switch"}>
        <FormControlLabel
          aria-label={props.label}
          classes={{
            label: "property-entry-label",
          }}
          control={
            <Switch
              checked={props.checked}
              onChange={props.onChange}
              disabled={props.disabled}
              classes={{
                root: "property-entry-input",
              }}
            />
          }
          label={props.label}
        />
        {props.iconComponent}
      </FormControl>
    </div>
  );
}

function sendValueOnly(fn: (value: string) => void, e: React.ChangeEvent<HTMLInputElement>) {
  fn(e.target.value);
}

export function PropertyEntryBooleanAsRadioBase(props: {
  className?: string;
  onChange: (newValue: string) => void;
  value: string;
  values: Array<{
    value: string,
    label: string,
  }>;
  disabled?: boolean;
  label: string;
  description?: string;
  iconComponent?: any;
}) {
  // The class for every label component
  const fclClasses = {
    label: "property-entry-label",
  };

  return (
    <div className="property-entry-container">
      <FormControl
        component={"fieldset" as any}
        className={props.className ? props.className : "property-entry property-entry--radio"}
      >
        <FormLabel
          aria-label={props.label}
          component={"legend" as any}
          classes={{
            root: "property-entry-label",
            focused: "focused",
          }}
        >
          {props.label}{props.iconComponent}
        </FormLabel>
        {props.description ? <div className="property-entry-description">{props.description}</div> : null}
        <RadioGroup
          value={props.value}
          onChange={sendValueOnly.bind(this, props.onChange)}
        >
          {props.values.map((v) => <FormControlLabel
            key={v.value}
            classes={fclClasses}
            value={v.value}
            control={<Radio/>}
            label={v.label}
            disabled={props.disabled}
          />)}
        </RadioGroup>
      </FormControl>
    </div>
  );
}

function PropertyEntryBooleanAsSwitch(props: IPropertyEntryProps) {
  // let's the get basic data for the entry
  const i18nData = props.property.getI18nDataFor(props.language);
  const className = getClassName(props, "switch", props.poked);
  const i18nLabel = i18nData && i18nData.label;
  const i18nDescription = i18nData && i18nData.description;
  const icon = props.property.getIcon();
  const iconComponent = icon ? (
    <Icon classes={{root: "property-entry-icon"}}>{icon}</Icon>
  ) : null;

  return (
    <PropertyEntryBooleanAsSwitchBase
      className={className}
      checked={props.value.value as boolean || false}
      onChange={props.onChange.bind(null, !props.value.value, null)}
      disabled={props.value.enforced}
      label={i18nLabel}
      description={i18nDescription}
      iconComponent={iconComponent}
    />
  );
}

function handleOnChange(
  props: IPropertyEntryProps,
  value: string,
) {
  if (value === "null") {
    return props.onChange(null, null);
  }
  return props.onChange(value === "true", null);
}

function PropertyEntryBooleanAsRadio(props: IPropertyEntryProps) {
  // Let's get the basic data
  const i18nData = props.property.getI18nDataFor(props.language);
  const className = getClassName(props, "radio", props.poked);
  const i18nLabel = i18nData && i18nData.label;
  const i18nDescription = i18nData && i18nData.description;
  const icon = props.property.getIcon();
  const iconComponent = icon ? (
    <Icon classes={{root: "property-entry-icon"}}>{icon}</Icon>
  ) : null;

  return (
    <PropertyEntryBooleanAsRadioBase
      className={className}
      disabled={props.value.enforced}
      label={i18nLabel}
      description={i18nDescription}
      iconComponent={iconComponent}
      values={[{
        value: "true",
        label: capitalize(props.i18n.yes),
      }, {
        value: "false",
        label: capitalize(props.i18n.no),
      }, {
        value: "null",
        label: capitalize(props.i18n.unspecified),
      }]}
      onChange={handleOnChange.bind(this, props)}
      value={JSON.stringify(props.value.value)}
    />
  );
}

export default class PropertyEntryBoolean extends React.Component<IPropertyEntryProps, {}> {
  public shouldComponentUpdate(nextProps: IPropertyEntryProps) {
    return this.props.property !== nextProps.property ||
      !equals(this.props.value, nextProps.value) ||
      !!this.props.poked !== !!nextProps.poked ||
      nextProps.language !== this.props.language ||
      nextProps.i18n !== this.props.i18n;
  }
  public render() {
    // Booleans come in two types, one is the switch and the other
    // is a radio, the switch works for basic true/false booleans
    // whereas the radio works for true/false/null booleans
    if (!this.props.property.isNullable()) {
      return PropertyEntryBooleanAsSwitch(this.props);
    }
    return PropertyEntryBooleanAsRadio(this.props);
  }
}
