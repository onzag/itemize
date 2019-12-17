import React from "react";
import { IItemExclusionSwitchProps } from ".";
import { FormControlLabel, Switch, FormControl } from "@material-ui/core";
import { ItemExclusionState } from "../../../../../base/Root/Module/ItemDefinition/Item";

export default function StandardExclusionSwitch(props: IItemExclusionSwitchProps) {
  // let's the get basic data for the entry
  const i18nData = props.item.getI18nDataFor(props.locale.language);
  const i18nLabel = i18nData && i18nData.exclusion_selector_label;

  return (
    <div className={props.classes.switchContainer}>
      <FormControl className={props.classes.switchFormControl}>
        <FormControlLabel
          aria-label={i18nLabel}
          classes={{
            label: props.classes.switchLabel,
          }}
          control={
            <Switch
              checked={props.state.exclusionState === ItemExclusionState.INCLUDED}
              onChange={
                props.onChange.bind(
                  null,
                  (props.state.exclusionState === ItemExclusionState.INCLUDED ?
                    ItemExclusionState.EXCLUDED :
                    ItemExclusionState.INCLUDED),
                )
              }
            />
          }
          label={i18nLabel}
        />
      </FormControl>
    </div>
  );
}
