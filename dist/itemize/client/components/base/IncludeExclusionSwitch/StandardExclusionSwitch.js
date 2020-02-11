"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const Include_1 = require("../../../../base/Root/Module/ItemDefinition/Include");
function StandardExclusionSwitch(props) {
    // let's the get basic data for the entry
    const i18nData = props.include.getI18nDataFor(props.locale.language);
    const i18nLabel = i18nData && i18nData.exclusion_selector_label;
    return (<div className={props.classes.switchContainer}>
      <core_1.FormControl className={props.classes.switchFormControl}>
        <core_1.FormControlLabel aria-label={i18nLabel} classes={{
        label: props.classes.switchLabel,
    }} control={<core_1.Switch checked={props.state.exclusionState === Include_1.IncludeExclusionState.INCLUDED} onChange={props.onChange.bind(null, (props.state.exclusionState === Include_1.IncludeExclusionState.INCLUDED ?
        Include_1.IncludeExclusionState.EXCLUDED :
        Include_1.IncludeExclusionState.INCLUDED))}/>} label={i18nLabel}/>
      </core_1.FormControl>
    </div>);
}
exports.default = StandardExclusionSwitch;
