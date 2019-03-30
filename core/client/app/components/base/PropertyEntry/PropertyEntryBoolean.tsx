import React from "react";
import { IPropertyEntryProps, getClassName } from ".";
import { FormControlLabel, Switch, Icon } from "@material-ui/core";

export default function PropertyEntryBoolean(props: IPropertyEntryProps) {
  const i18nData = props.property.getI18nDataFor(props.locale);
  const className = getClassName(props, "switch", props.poked);
  const i18nLabel = i18nData && i18nData.label;
  const icon = props.property.getIcon();
  const iconComponent = icon ? (
    <Icon classes={{root: "property-entry--icon"}}>{icon}</Icon>
  ) : null;

  return (
    <div className="property-entry--container">
      <div className={className}>
        <FormControlLabel
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
      </div>
    </div>
  );
}
