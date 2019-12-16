import { IItemExclusionSwitchProps } from ".";
import { FormControlLabel, FormLabel, FormControl, RadioGroup, Radio } from "@material-ui/core";
import { capitalize } from "../../../../../util";
import { ItemExclusionState } from "../../../../../base/Root/Module/ItemDefinition/Item";

function handleOnChange(
  props: IItemExclusionSwitchProps,
  e: React.ChangeEvent<HTMLInputElement>,
) {
  return props.onChange(e.target.value as ItemExclusionState);
}

export default function TernaryExclusionSwitch(props: IItemExclusionSwitchProps) {
  // let's the get basic data for the entry
  const i18nData = props.item.getI18nDataFor(props.locale.language);
  const i18nLabel = i18nData && i18nData.exclusion_ternary_selector_label;

  const values = [{
    value: ItemExclusionState.EXCLUDED,
    label: i18nData && capitalize(i18nData.any_label),
  }, {
    value: ItemExclusionState.INCLUDED,
    label: i18nData && capitalize(i18nData.included_label),
  }, {
    value: ItemExclusionState.ANY,
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
          value={props.state.stateExclusion}
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
