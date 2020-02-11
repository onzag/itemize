"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const uuid_1 = __importDefault(require("uuid"));
const deep_equal_1 = __importDefault(require("deep-equal"));
// these are the base types we support
// basically everything we have is either a float
// a integer or a string
var BaseType;
(function (BaseType) {
    BaseType[BaseType["FLOAT"] = 0] = "FLOAT";
    BaseType[BaseType["INTEGER"] = 1] = "INTEGER";
    BaseType[BaseType["STRING"] = 2] = "STRING";
})(BaseType || (BaseType = {}));
/**
 * getting the base type for what we support
 * @param type the type as a string
 */
function getBaseType(type) {
    if (type === "number" || type === "currency" || type === "unit") {
        return BaseType.FLOAT;
    }
    else if (type === "integer" || type === "year") {
        return BaseType.INTEGER;
    }
    return BaseType.STRING;
}
/**
 * Returns a boolean on whether the base type is numeric
 * @param baseType the base type in question
 */
function isNumeric(baseType) {
    return baseType === BaseType.FLOAT || baseType === BaseType.INTEGER;
}
/**
 * formats a numeric value as a string using the localized
 * number separator
 * @param type the type we are converting
 * @param numberSeparator the localized number separator
 * @param value the value in question
 */
function formatValueAsString(type, numberSeparator, value) {
    const actualValue = value === null || typeof value === "undefined" ? value : (typeof value.value !== "undefined" ? value.value : value);
    if (actualValue === null) {
        return "";
    }
    if (getBaseType(type) === BaseType.FLOAT) {
        return actualValue.toString().replace(/\./g, numberSeparator);
    }
    return actualValue.toString();
}
class PropertyEntrySelect extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.uuid = "uuid-" + uuid_1.default.v4();
        this.onChange = this.onChange.bind(this);
    }
    shouldComponentUpdate(nextProps) {
        // This is optimized to only update for the thing it uses
        return nextProps.property !== this.props.property ||
            !deep_equal_1.default(this.props.state, nextProps.state) ||
            !!this.props.poked !== !!nextProps.poked ||
            !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
            nextProps.language !== this.props.language ||
            nextProps.i18n !== this.props.i18n ||
            nextProps.icon !== this.props.icon;
    }
    onChange(e) {
        // let's get the type and the base type
        const type = this.props.property.getType();
        const baseType = getBaseType(type);
        const textualValue = e.target.value;
        // for numbers
        if (isNumeric(baseType)) {
            this.props.onChange(parseFloat(textualValue), textualValue);
        }
        else {
            // for simple text do the onchange as it is
            this.props.onChange(textualValue || null, textualValue);
        }
    }
    render() {
        // get the basic data
        const i18nData = this.props.property.getI18nDataFor(this.props.language);
        const i18nLabel = i18nData && i18nData.label;
        const i18nPlaceholder = i18nData && i18nData.placeholder;
        const nullValueLabel = this.props.property.isNullable() ?
            i18nData && i18nData.null_value : null;
        // get the invalid reason
        const invalidReason = this.props.state.invalidReason;
        let i18nInvalidReason = null;
        if ((this.props.poked || this.props.state.userSet) &&
            invalidReason && i18nData &&
            i18nData.error && i18nData.error[invalidReason]) {
            i18nInvalidReason = i18nData.error[invalidReason];
        }
        // build the icon
        const icon = this.props.icon;
        const addornment = icon ? (<core_1.InputAdornment position="end">
        <core_1.Icon classes={{ root: this.props.classes.icon }}>{icon}</core_1.Icon>
      </core_1.InputAdornment>) : null;
        // get the current value that is on display
        const currentValue = this.props.state.value !== null ?
            this.props.state.value :
            formatValueAsString(this.props.property.getType(), this.props.i18n[this.props.language].number_decimal_separator, this.props.state.value);
        // and just return this
        return (<div className={this.props.classes.container}>
        <core_1.FormControl variant="filled" className={this.props.classes.entry}>
          <core_1.InputLabel htmlFor={this.uuid} classes={{
            root: this.props.classes.label,
            focused: "focused",
        }} shrink={nullValueLabel ? true : undefined}>
            {i18nLabel}
          </core_1.InputLabel>
          <core_1.Select value={currentValue} onChange={this.onChange} displayEmpty={true} disabled={this.props.state.enforced} variant="filled" classes={{
            icon: addornment ? this.props.classes.selectFieldIconWhenAddornmentIsActive : null,
        }} input={<core_1.FilledInput id={this.uuid} placeholder={i18nPlaceholder} endAdornment={addornment} classes={{
            root: this.props.classes.fieldInput,
            focused: "focused",
        }}/>}>
            <core_1.MenuItem selected={false} role="none" disabled={true}>
              <em>{i18nPlaceholder}</em>
            </core_1.MenuItem>
            <core_1.Divider />
            {nullValueLabel ? <core_1.MenuItem value="">
              <em>{nullValueLabel}</em>
            </core_1.MenuItem> : null}
            {
        // render the valid values that we display and choose
        this.props.property.getSpecificValidValues().map((vv) => {
            // the i18n value from the i18n data
            const i18nIdentifier = vv.toString();
            const valueName = i18nData && i18nData.values[i18nIdentifier];
            return <core_1.MenuItem key={vv.toString()} value={vv}>{valueName}</core_1.MenuItem>;
        })}
          </core_1.Select>
        </core_1.FormControl>
        <div className={this.props.classes.errorMessage}>
          {i18nInvalidReason}
        </div>
      </div>);
    }
}
exports.default = PropertyEntrySelect;
