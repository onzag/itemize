"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const TextField_1 = __importDefault(require("@material-ui/core/TextField"));
const core_1 = require("@material-ui/core");
const deep_equal_1 = __importDefault(require("deep-equal"));
const util_1 = require("../../../../util");
const convert_units_1 = __importDefault(require("convert-units"));
const constants_1 = require("../../../../constants");
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
    return BaseType.INTEGER;
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
class PropertyEntryNumeric extends react_1.default.Component {
    constructor(props) {
        super(props);
        const prefersImperial = props.country.code === "US";
        const unitValue = props.state.value;
        // we calculate the unit on whether it prefers imperial
        // or not
        this.state = {
            unit: props.property.getType() === "unit" ? (unitValue !== null ? unitValue.unit : (prefersImperial ?
                props.property.getSpecialProperty("imperialUnit") :
                props.property.getSpecialProperty("unit"))) : null,
            unitDialogOpen: false,
        };
        // binding all the functions
        this.onChange = this.onChange.bind(this);
        this.toggleUnitDialog = this.toggleUnitDialog.bind(this);
        this.changeUnit = this.changeUnit.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    componentDidMount() {
        const prefill = this.props.property.getSpecialProperty("initialPrefill");
        if (typeof prefill !== "undefined" &&
            prefill !== null &&
            this.props.state.value === null) {
            // Fake event
            this.onChange({
                target: {
                    value: prefill,
                },
            });
        }
        if (this.props.autoFocus && this.inputRef) {
            this.inputRef.focus();
        }
    }
    toggleUnitDialog() {
        this.setState({
            unitDialogOpen: !this.state.unitDialogOpen,
        });
    }
    changeUnit(newUnit) {
        this.setState({
            unit: newUnit,
            unitDialogOpen: false,
        });
        const currentValueAsUnit = this.props.state.value;
        if (this.props.state.value &&
            currentValueAsUnit !== null &&
            newUnit !== currentValueAsUnit.unit) {
            this.props.onChange({
                unit: newUnit,
                value: currentValueAsUnit.value,
                normalizedValue: convert_units_1.default(currentValueAsUnit.value)
                    .from(newUnit).to(this.props.property.getSpecialProperty("unit")),
                normalizedUnit: this.props.property.getSpecialProperty("unit"),
            }, this.props.state.internalValue);
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.state.internalValue) {
            // let's update currencies if they change because of a locale change
            if (prevProps.currency !== this.props.currency && this.props.property.getType() === "currency") {
                // let's get the value
                const value = this.props.state.value;
                // if we have a value
                if (value !== null) {
                    // update it for the new currency
                    this.props.onChange({
                        value: value.value,
                        currency: this.props.currency.code,
                    }, 
                    // We do this replacement just in case anyway
                    // we know it only makes sense if the locale changed too
                    // from a language that uses different separators
                    // but it doesn't hurt if it's the same
                    this.props.state.internalValue.replace(prevProps.i18n[prevProps.language].number_decimal_separator, this.props.i18n[this.props.language].number_decimal_separator));
                }
                // a decimal separator update in case
            }
            else if (prevProps.i18n[prevProps.language].number_decimal_separator !==
                this.props.i18n[this.props.language].number_decimal_separator) {
                // if the value is not null
                if (this.props.state.value !== null) {
                    this.props.onChange(this.props.state.value, this.props.state.internalValue.replace(prevProps.i18n[prevProps.language].number_decimal_separator, this.props.i18n[this.props.language].number_decimal_separator));
                }
            }
        }
        const nextValueAsUnit = this.props.state.value;
        if (this.props.property.getType() === "unit" &&
            nextValueAsUnit !== null &&
            nextValueAsUnit.unit !== this.state.unit) {
            this.setState({
                unit: nextValueAsUnit.unit,
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // This is optimized to only update for the thing it uses
        return nextProps.property !== this.props.property ||
            !deep_equal_1.default(this.props.state, nextProps.state) ||
            !!this.props.poked !== !!nextProps.poked ||
            !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
            nextProps.language !== this.props.language ||
            nextProps.i18n !== this.props.i18n ||
            nextProps.currency !== this.props.currency ||
            nextState.unit !== this.state.unit ||
            nextState.unitDialogOpen !== this.state.unitDialogOpen ||
            nextProps.icon !== this.props.icon;
    }
    onKeyDown(e) {
        // All fancy keycodes that don't represent a character are longer than 1
        // with this we allow all of the to pass
        if (e.key.length !== 1) {
            return;
        }
        // we don't want spaces
        if (e.key === " ") {
            e.preventDefault();
        }
    }
    onChange(e) {
        const textualValue = e.target.value;
        if (textualValue === "") {
            this.props.onChange(null, textualValue);
            return;
        }
        // let's get the type and the base type
        const type = this.props.property.getType();
        const baseType = getBaseType(type);
        // like if we have a float
        let numericValue;
        let normalizedTextualValueAsString;
        if (baseType === BaseType.FLOAT) {
            // get the separator escaped
            const escapedNumberSeparator = util_1.escapeStringRegexp(this.props.i18n[this.props.language].number_decimal_separator);
            // and replace it for the standard separator
            normalizedTextualValueAsString = textualValue.replace(new RegExp(escapedNumberSeparator, "g"), ".");
            // we set the numeric value from the normalized by parsing it
            // NaN is a possibility
            numericValue = parseFloat(normalizedTextualValueAsString);
            // if we have an integer of course the normalized value is the same
        }
        else if (baseType === BaseType.INTEGER) {
            // we just set the numeric value
            // NaN is a possibility
            numericValue = parseInt(textualValue, 10);
            normalizedTextualValueAsString = textualValue;
        }
        if (isNaN(numericValue) ||
            // buggy typescript definition which doesn't expect strings
            // need to cast to any
            isNaN(normalizedTextualValueAsString)) {
            // we send a nan so it gives invalid number
            this.props.onChange(NaN, textualValue);
            return;
        }
        else if (baseType === BaseType.INTEGER) {
            this.props.onChange(numericValue, textualValue);
            return;
        }
        // set the textual value, yes again, in all chances it will be the same
        // but let's say the user pressed "." instead of "," then we need to
        // properly format inormalizedNumericValueAsStringt
        const newTextualValue = formatValueAsString(type, this.props.i18n[this.props.language].number_decimal_separator, textualValue);
        // Number line overflow protection
        // the problem is that too many decimals cause it to round
        // so let's only send 1 max of the maximum number of decimals
        // if there are decimals
        let actualNumericValue = numericValue;
        const baseValue = normalizedTextualValueAsString.split(".")[0];
        const decimalValue = normalizedTextualValueAsString.split(".")[1] || "";
        const decimalCount = decimalValue.length;
        // For some cases like in currency this value is null so set it up to max decimal count
        // as a fallback
        const maxDecimalCount = this.props.property.getMaxDecimalCount() || constants_1.MAX_DECIMAL_COUNT;
        // if we have too many decimals from the string count
        if (maxDecimalCount < decimalCount) {
            // cut the line as an overflow protection, we need to set the last as 9
            actualNumericValue = parseFloat(baseValue + "." + decimalValue.substr(0, maxDecimalCount) + "9");
        }
        // if the type is a currency
        if (type === "currency") {
            // do the onchange with the currency code
            this.props.onChange({
                value: actualNumericValue,
                currency: this.props.currency.code,
            }, newTextualValue);
        }
        else if (type === "unit") {
            this.props.onChange({
                value: actualNumericValue,
                unit: this.state.unit,
                normalizedValue: convert_units_1.default(actualNumericValue)
                    .from(this.state.unit).to(this.props.property.getSpecialProperty("unit")),
                normalizedUnit: this.props.property.getSpecialProperty("unit"),
            }, newTextualValue);
        }
        else {
            // do the on change
            this.props.onChange(actualNumericValue, newTextualValue);
        }
    }
    render() {
        // as you can see it takes some textFieldProps,
        // these are given by the autocomplete parent basically
        // if it has one, it might not be the case
        // get the basic data
        const i18nData = this.props.property.getI18nDataFor(this.props.language);
        const i18nLabel = i18nData && i18nData.label;
        const i18nDescription = i18nData && i18nData.description;
        const i18nPlaceholder = i18nData && i18nData.placeholder;
        // get the invalid reason if any
        const invalidReason = this.props.state.invalidReason;
        let i18nInvalidReason = null;
        if ((this.props.poked || this.props.state.userSet) &&
            invalidReason && i18nData &&
            i18nData.error && i18nData.error[invalidReason]) {
            i18nInvalidReason = i18nData.error[invalidReason];
        }
        // set the input mode, this is for mobile,
        // basically according to our input we need
        // different keys
        let inputMode = "numeric";
        const type = this.props.property.getType();
        const baseType = getBaseType(type);
        if (baseType === BaseType.FLOAT) {
            inputMode = "decimal";
        }
        // these are the inputProps of the small input
        const inputProps = {
            inputMode: inputMode,
            autoComplete: this.props.property.getHTMLAutocomplete(),
        };
        // these are applied to the Input element
        const appliedInputProps = {
            inputRef: (node) => {
                this.inputRef = node;
            },
        };
        if (type === "currency") {
            // depending if the format is N$ or $N we set it end or
            // start
            const currencyFormat = this.props.i18n[this.props.language].currency_format;
            if (currencyFormat === "N$") {
                appliedInputProps.endAdornment = (<core_1.InputAdornment position="end">
            <strong>{this.props.currency.symbol}</strong>
          </core_1.InputAdornment>);
            }
            else {
                appliedInputProps.startAdornment = (<core_1.InputAdornment position="start">
            <strong>{this.props.currency.symbol}</strong>
          </core_1.InputAdornment>);
            }
            // for units
        }
        else if (type === "unit") {
            appliedInputProps.endAdornment = (<core_1.InputAdornment position="end">
          <core_1.IconButton onClick={this.toggleUnitDialog} classes={{ root: this.props.classes.textButton }}>
            <strong>{formatUnit(this.state.unit)}</strong>
          </core_1.IconButton>
        </core_1.InputAdornment>);
            // otherwise we might just have an icon
        }
        else if (this.props.icon) {
            // set it at the end
            appliedInputProps.endAdornment = (<core_1.InputAdornment position="end">
          <core_1.Icon classes={{ root: this.props.classes.icon }}>
            {this.props.icon}
          </core_1.Icon>
        </core_1.InputAdornment>);
        }
        // get the currently being displayed value
        const currentValue = this.props.state.internalValue !== null ?
            this.props.state.internalValue :
            formatValueAsString(this.props.property.getType(), this.props.i18n[this.props.language].number_decimal_separator, this.props.state.value);
        // return the complex overengineered component in all its glory
        return (<div className={this.props.classes.container}>
        {i18nDescription ?
            <div className={this.props.classes.description}>
            {i18nDescription}
          </div> : null}
        <TextField_1.default fullWidth={true} type="text" className={this.props.classes.entry} label={i18nLabel} placeholder={i18nPlaceholder} value={currentValue} onChange={this.onChange} onKeyDown={this.onKeyDown} InputProps={{
            classes: {
                root: this.props.classes.fieldInput,
                focused: "focused",
            },
            disabled: this.props.state.enforced,
            ...appliedInputProps,
        }} InputLabelProps={{
            classes: {
                root: this.props.classes.label,
                focused: "focused",
            },
        }} inputProps={inputProps} disabled={this.props.state.enforced} variant="filled"/>
        <div className={this.props.classes.errorMessage}>
          {i18nInvalidReason}
        </div>
        {type === "unit" ? <SelectUnitDialogResponsive open={this.state.unitDialogOpen} title={this.props.i18n[this.props.language].unit_dialog_title} others={this.props.i18n[this.props.language].unit_dialog_others} othersMetric={this.props.i18n[this.props.language].unit_dialog_metric} othersImperial={this.props.i18n[this.props.language].unit_dialog_imperial} onClose={this.toggleUnitDialog} onReplaceUnit={this.changeUnit} selectedUnit={this.state.unit} unitType={this.props.property.getSubtype()} preferred={this.props.property.getSpecialProperty("unit")} prefersImperial={this.props.country.code === "US"} preferredImperial={this.props.property.getSpecialProperty("imperialUnit")} lockUnitsToPrimaries={!!this.props.property.getSpecialProperty("lockUnitsToPrimaries")} dialogClassName={this.props.classes.unitDialog} subheaderClassName={this.props.classes.unitDialogSubheader}/> : null}
      </div>);
    }
}
exports.default = PropertyEntryNumeric;
function formatUnit(unit) {
    if (unit === "l") {
        return <span>L</span>;
    }
    else if (unit === "ml" || unit === "cl" || unit === "dl" || unit === "kl") {
        return <span>{unit[0]}L</span>;
    }
    else if (unit === "C" || unit === "K" || unit === "F" || unit === "R") {
        return <span>&deg;{unit}</span>;
    }
    return (<span>
      {unit.split(/(\d+)/).filter((m) => !!m).map((m, i) => isNaN(m) ?
        <span key={i}>{m}</span> : <sup key={i}>{m}</sup>)}
    </span>);
}
function SelectUnitDialog(props) {
    const primaryUnit = props.prefersImperial ? props.preferredImperial : props.preferred;
    const secondaryUnit = props.prefersImperial ? props.preferred : props.preferredImperial;
    return (<core_1.Dialog classes={{
        paper: props.dialogClassName,
    }} open={props.open} onClose={props.onClose} aria-labelledby="unit-dialog-title" fullScreen={props.fullScreen}>
      <core_1.DialogTitle id="unit-dialog-title">{props.title}</core_1.DialogTitle>
      <div>
        <core_1.List>
          <core_1.ListItem selected={primaryUnit === props.selectedUnit} button={true} onClick={props.onReplaceUnit.bind(null, primaryUnit)}>
            <core_1.ListItemText primary={formatUnit(primaryUnit)}/>
          </core_1.ListItem>
          <core_1.ListItem selected={secondaryUnit === props.selectedUnit} button={true} onClick={props.onReplaceUnit.bind(null, secondaryUnit)}>
            <core_1.ListItemText primary={formatUnit(secondaryUnit)}/>
          </core_1.ListItem>
        </core_1.List>
        {!props.lockUnitsToPrimaries ? <react_1.default.Fragment>
          <core_1.Divider />
          <core_1.List subheader={<core_1.ListSubheader classes={{ root: props.subheaderClassName }}>
              {props.others}
            </core_1.ListSubheader>}>
            {convert_units_1.default()
        .list(props.unitType)
        .filter((unit) => props.prefersImperial ? unit.system === "imperial" : unit.system === "metric")
        .filter((unit) => unit.abbr !== primaryUnit && unit.abbr !== secondaryUnit)
        .map((unit) => (<core_1.ListItem selected={unit.abbr === props.selectedUnit} button={true} onClick={props.onReplaceUnit.bind(null, unit.abbr)} key={unit.abbr}>
                <core_1.ListItemText primary={formatUnit(unit.abbr)}/>
              </core_1.ListItem>))}
          </core_1.List>
          <core_1.Divider />
          <core_1.List subheader={<core_1.ListSubheader classes={{ root: props.subheaderClassName }}>
              {props.prefersImperial ? props.othersMetric : props.othersImperial}
            </core_1.ListSubheader>}>
            {convert_units_1.default()
        .list(props.unitType)
        .filter((unit) => props.prefersImperial ? unit.system === "metric" : unit.system === "imperial")
        .filter((unit) => unit.abbr !== primaryUnit && unit.abbr !== secondaryUnit)
        .map((unit) => (<core_1.ListItem selected={unit.abbr === props.selectedUnit} button={true} onClick={props.onReplaceUnit.bind(null, unit.abbr)} key={unit.abbr}>
                <core_1.ListItemText primary={formatUnit(unit.abbr)}/>
              </core_1.ListItem>))}
          </core_1.List>
        </react_1.default.Fragment> : null}
      </div>
    </core_1.Dialog>);
}
const SelectUnitDialogResponsive = core_1.withMobileDialog()(SelectUnitDialog);
