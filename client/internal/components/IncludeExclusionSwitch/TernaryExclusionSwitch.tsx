import React from "react";
import { IIncludeExclusionSwitchProps } from ".";
import { FormControlLabel, FormLabel, FormControl, RadioGroup, Radio } from "@material-ui/core";
import { capitalize } from "../../../util";
import { IncludeExclusionState } from "../../../base/Root/Module/ItemDefinition/Include";

function handleOnChange(
  props: IIncludeExclusionSwitchProps,
  e: React.ChangeEvent<HTMLInputElement>,
) {
  return props.onChange(e.target.value as IncludeExclusionState);
}

export default function TernaryExclusionSwitch(props: IIncludeExclusionSwitchProps) {
  // let's the get basic data for the entry
  const i18nData = props.include.getI18nDataFor(props.locale.language);
  const i18nLabel = i18nData && i18nData.exclusion_ternary_selector_label;

  const values = [{
    value: IncludeExclusionState.EXCLUDED,
    label: i18nData && capitalize(i18nData.any_label),
  }, {
    value: IncludeExclusionState.INCLUDED,
    label: i18nData && capitalize(i18nData.included_label),
  }, {
    value: IncludeExclusionState.ANY,
    label: i18nData && capitalize(i18nData.excluded_label),
  }];

  const fclClasses = {
    label: props.classes.switchLabel,
  };

  return (
    <div className={props.classes.switchContainer}>
      <FormControl
        component={"fieldset" as any}
        className={props.classes.switchFormControl}
      >
        <FormLabel
          aria-label={i18nLabel}
          component={"legend" as any}
          classes={{
            root: props.classes.switchLabel + " " + props.classes.switchLabelSingleLine,
            focused: "focused",
          }}
        >
          {i18nLabel}
        </FormLabel>
        <RadioGroup
          value={props.state.exclusionState}
          onChange={handleOnChange.bind(this, props)}
        >
          {values.map((v) => <FormControlLabel
            key={v.value}
            classes={fclClasses}
            value={v.value}
            control={<Radio/>}
            label={v.label}
          />)}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
