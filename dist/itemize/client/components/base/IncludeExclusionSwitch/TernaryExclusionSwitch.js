"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const util_1 = require("../../../../util");
const Include_1 = require("../../../../base/Root/Module/ItemDefinition/Include");
function handleOnChange(props, e) {
    return props.onChange(e.target.value);
}
function TernaryExclusionSwitch(props) {
    // let's the get basic data for the entry
    const i18nData = props.include.getI18nDataFor(props.locale.language);
    const i18nLabel = i18nData && i18nData.exclusion_ternary_selector_label;
    const values = [{
            value: Include_1.IncludeExclusionState.EXCLUDED,
            label: i18nData && util_1.capitalize(i18nData.any_label),
        }, {
            value: Include_1.IncludeExclusionState.INCLUDED,
            label: i18nData && util_1.capitalize(i18nData.included_label),
        }, {
            value: Include_1.IncludeExclusionState.ANY,
            label: i18nData && util_1.capitalize(i18nData.excluded_label),
        }];
    const fclClasses = {
        label: props.classes.switchLabel,
    };
    return (<div className={props.classes.switchContainer}>
      <core_1.FormControl component={"fieldset"} className={props.classes.switchFormControl}>
        <core_1.FormLabel aria-label={i18nLabel} component={"legend"} classes={{
        root: props.classes.switchLabel + " " + props.classes.switchLabelSingleLine,
        focused: "focused",
    }}>
          {i18nLabel}
        </core_1.FormLabel>
        <core_1.RadioGroup value={props.state.exclusionState} onChange={handleOnChange.bind(this, props)}>
          {values.map((v) => <core_1.FormControlLabel key={v.value} classes={fclClasses} value={v.value} control={<core_1.Radio />} label={v.label}/>)}
        </core_1.RadioGroup>
      </core_1.FormControl>
    </div>);
}
exports.default = TernaryExclusionSwitch;
