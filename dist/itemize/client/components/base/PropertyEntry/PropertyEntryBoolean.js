"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const util_1 = require("../../../../util");
const deep_equal_1 = __importDefault(require("deep-equal"));
function PropertyEntryBooleanAsSwitch(props) {
    // let's the get basic data for the entry
    const i18nData = props.property.getI18nDataFor(props.language);
    const i18nLabel = i18nData && i18nData.label;
    const i18nDescription = i18nData && i18nData.description;
    const iconComponent = props.icon ? (<core_1.Icon classes={{ root: props.classes.icon }}>{props.icon}</core_1.Icon>) : null;
    // so now we build the initial container,
    // add the description accordingly
    // and build the field using form control
    // that's basically the only way to do so
    // because material ui really gets complicated
    // for no reason at all
    return (<div className={props.classes.container}>
      {i18nDescription ? <div className={props.classes.description}>
        {i18nDescription}
      </div> : null}
      <core_1.FormControl className={props.classes.entry}>
        <core_1.FormControlLabel aria-label={i18nLabel} classes={{
        label: props.classes.label,
    }} control={<core_1.Switch checked={props.state.value || false} onChange={props.onChange.bind(null, !props.state.value, null)} disabled={props.state.enforced}/>} label={i18nLabel}/>
        {iconComponent}
      </core_1.FormControl>
    </div>);
}
/**
 * Handles the onchange event of the property entry as radio
 * as it is required that it passes a boolean or null
 * @param props the properties of the field
 * @param e the browser event
 */
function handleOnChange(props, e) {
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
function PropertyEntryBooleanAsRadio(props) {
    // Let's get the basic data
    const i18nData = props.property.getI18nDataFor(props.language);
    const i18nLabel = i18nData && i18nData.label;
    const i18nDescription = i18nData && i18nData.description;
    const icon = props.icon;
    const iconComponent = icon ? (<core_1.Icon classes={{ root: props.classes.icon }}>{icon}</core_1.Icon>) : null;
    // so the values are composed into, true, false and null
    // because the value must be a string, we set it as a string
    // then we use yes, no or unspecified as the definitions
    const values = [{
            value: "true",
            label: util_1.capitalize(props.i18n[props.language].yes),
        }, {
            value: "false",
            label: util_1.capitalize(props.i18n[props.language].no),
        }, {
            value: "null",
            label: util_1.capitalize(props.i18n[props.language].unspecified),
        }];
    // this is the class that every radio select
    // contains, because it contains a label we use
    // a label class
    const fclClasses = {
        label: props.classes.label,
    };
    // now we create the class, just as before
    // we use a fieldset as the component
    // and we use the classname of the entry
    // get the form label and build the radio group
    return (<div className={props.classes.container}>
      <core_1.FormControl component={"fieldset"} className={props.classes.entry}>
        <core_1.FormLabel aria-label={i18nLabel} component={"legend"} classes={{
        root: props.classes.label + " " + props.classes.labelSingleLine,
        focused: "focused",
    }}>
          {i18nLabel}{iconComponent}
        </core_1.FormLabel>
        {i18nDescription ? <div className={props.classes.description}>
          {i18nDescription}
        </div> : null}
        <core_1.RadioGroup value={JSON.stringify(props.state.value)} onChange={handleOnChange.bind(this, props)}>
          {values.map((v) => <core_1.FormControlLabel key={v.value} classes={fclClasses} value={v.value} control={<core_1.Radio />} label={v.label} disabled={props.state.enforced}/>)}
        </core_1.RadioGroup>
      </core_1.FormControl>
    </div>);
}
class PropertyEntryBoolean extends react_1.default.Component {
    shouldComponentUpdate(nextProps) {
        return this.props.property !== nextProps.property ||
            !deep_equal_1.default(this.props.state, nextProps.state) ||
            !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
            !!this.props.poked !== !!nextProps.poked ||
            nextProps.language !== this.props.language ||
            nextProps.i18n !== this.props.i18n;
    }
    render() {
        // Booleans come in two types, one is the switch and the other
        // is a radio, the switch works for basic true/false booleans
        // whereas the radio works for true/false/null booleans
        if (!this.props.property.isNullable()) {
            return PropertyEntryBooleanAsSwitch(this.props);
        }
        return PropertyEntryBooleanAsRadio(this.props);
    }
}
exports.default = PropertyEntryBoolean;
