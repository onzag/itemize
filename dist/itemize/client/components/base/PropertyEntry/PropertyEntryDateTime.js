"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const pickers_1 = require("@material-ui/pickers");
const moment_1 = __importDefault(require("moment"));
const core_1 = require("@material-ui/core");
const deep_equal_1 = __importDefault(require("deep-equal"));
const constants_1 = require("../../../../constants");
const util_1 = require("../../../../util");
/**
 * Provides the current value of the date given the
 * internal value and the actual json value
 * @param internalValue the internal value, a moment object
 * @param actualValue the actual value, a json string
 */
function getValue(internalValue, actualValue, type) {
    // internal value has priority, that's why it's there
    if (internalValue) {
        return internalValue;
    }
    else if (actualValue) {
        let dbFormat = constants_1.DATETIME_FORMAT;
        if (type === "date") {
            dbFormat = constants_1.DATE_FORMAT;
        }
        else if (type === "time") {
            dbFormat = constants_1.TIME_FORMAT;
        }
        return moment_1.default(actualValue, dbFormat).utc();
    }
    return null;
}
class PropertyEntryDateTime extends react_1.default.Component {
    constructor(props) {
        super(props);
        // The reason we need to keep a date synced in the state is because
        // the datepickers work with objects and they don't play nice each time
        // a new object is created during a change event, we need to create it
        // this way then
        this.state = {
            value: getValue(props.state.internalValue, props.state.value, props.property.getType()),
        };
        this.handleOnChange = this.handleOnChange.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        // This is optimized to only update for the thing it uses
        return nextProps.property !== this.props.property ||
            !deep_equal_1.default(this.state, nextState) ||
            !deep_equal_1.default(this.props.state, nextProps.state) ||
            !!this.props.poked !== !!nextProps.poked ||
            !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
            nextProps.language !== this.props.language ||
            nextProps.i18n !== this.props.i18n;
    }
    componentDidUpdate(prevProps) {
        // if the value is null we update accordingly
        if (this.props.state.value === null) {
            if (this.state.value !== null) {
                this.setState({
                    value: null,
                });
            }
            return;
        }
        // otherwise we only update on a valid date and if it's not the same
        // as the one we currently have, this is why it's nice to have a state
        // imagine recieving an invalid date and setting it as the current value
        // it would override everything, certainly there might be other solutions
        // but this one is the simplest by far
        const type = this.props.property.getType();
        let dbFormat = constants_1.DATETIME_FORMAT;
        if (type === "date") {
            dbFormat = constants_1.DATE_FORMAT;
        }
        else if (type === "time") {
            dbFormat = constants_1.TIME_FORMAT;
        }
        const valueParsed = moment_1.default(this.props.state.value, dbFormat);
        if (valueParsed.isValid() && !valueParsed.isSame(this.state.value)) {
            this.setState({
                value: valueParsed,
            });
        }
    }
    handleOnChange(date) {
        // just set the state
        this.setState({
            value: date,
        });
        // do the onchange calls
        if (date === null) {
            return this.props.onChange(null, null);
        }
        if (!date.isValid()) {
            return this.props.onChange("Invalid Date", date);
        }
        const type = this.props.property.getType();
        let format = constants_1.DATETIME_FORMAT;
        if (type === "date") {
            format = constants_1.DATE_FORMAT;
        }
        else if (type === "time") {
            format = constants_1.TIME_FORMAT;
        }
        this.props.onChange(date.format(format), date);
    }
    render() {
        // get the basic data for datetime
        const i18nData = this.props.property.getI18nDataFor(this.props.language);
        const i18nLabel = i18nData && i18nData.label;
        const i18nDescription = i18nData && i18nData.description;
        const i18nPlaceholder = i18nData && i18nData.placeholder;
        // invalid reason getting it up
        const invalidReason = this.props.state.invalidReason;
        let i18nInvalidReason = null;
        if ((this.props.poked || this.props.state.userSet) &&
            invalidReason && i18nData &&
            i18nData.error && i18nData.error[invalidReason]) {
            i18nInvalidReason = i18nData.error[invalidReason];
        }
        // setting up the component
        let component = null;
        const type = this.props.property.getType();
        if (type === "date") {
            // let's extract the locale format from moment for a long date
            const L = util_1.getLocalizedDateFormat(true);
            const basicProps = {
                autoOk: true,
                cancelLabel: this.props.i18n[this.props.language].cancel,
                okLabel: this.props.i18n[this.props.language].ok,
                label: i18nLabel,
                placeholder: i18nPlaceholder,
                inputVariant: "filled",
                format: L,
                className: this.props.classes.entry,
                fullWidth: true,
                value: this.state.value,
                onChange: this.handleOnChange,
                error: false,
                helperText: null,
                disabled: this.props.state.enforced,
                InputProps: {
                    classes: {
                        root: this.props.classes.fieldInput,
                        focused: "focused",
                    },
                },
                InputLabelProps: {
                    classes: {
                        root: this.props.classes.label,
                        focused: "focused",
                    },
                },
            };
            if (!window.PHONE_OR_PAD) {
                component = (<pickers_1.KeyboardDatePicker KeyboardButtonProps={{
                    classes: {
                        root: this.props.classes.iconButton,
                    },
                }} {...basicProps}/>);
            }
            else {
                component = (<pickers_1.DatePicker {...basicProps}/>);
            }
        }
        else if (type === "datetime") {
            // let's use the long format with the time format
            const LLT = util_1.getLocalizedDateTimeFormat(true);
            const basicProps = {
                autoOk: true,
                ampm: LLT.includes("A"),
                cancelLabel: this.props.i18n[this.props.language].cancel,
                okLabel: this.props.i18n[this.props.language].ok,
                label: i18nLabel,
                placeholder: i18nPlaceholder,
                inputVariant: "filled",
                format: LLT,
                className: this.props.classes.entry,
                fullWidth: true,
                value: this.state.value,
                onChange: this.handleOnChange,
                error: false,
                helperText: null,
                disabled: this.props.state.enforced,
                InputProps: {
                    classes: {
                        root: this.props.classes.fieldInput,
                        focused: "focused",
                    },
                },
                InputLabelProps: {
                    classes: {
                        root: this.props.classes.label,
                        focused: "focused",
                    },
                },
            };
            if (!window.PHONE_OR_PAD) {
                component = (<pickers_1.KeyboardDateTimePicker KeyboardButtonProps={{
                    classes: {
                        root: this.props.classes.iconButton,
                    },
                }} {...basicProps}/>);
            }
            else {
                component = (<pickers_1.DateTimePicker {...basicProps}/>);
            }
        }
        else if (type === "time") {
            // and the time only
            const LT = util_1.getLocalizedTimeFormat(true);
            const basicProps = {
                autoOk: true,
                ampm: LT.includes("A"),
                cancelLabel: this.props.i18n[this.props.language].cancel,
                okLabel: this.props.i18n[this.props.language].ok,
                label: i18nLabel,
                placeholder: i18nPlaceholder,
                inputVariant: "filled",
                format: LT,
                className: this.props.classes.entry,
                fullWidth: true,
                value: this.state.value,
                onChange: this.handleOnChange,
                error: false,
                helperText: null,
                disabled: this.props.state.enforced,
                InputProps: {
                    classes: {
                        root: this.props.classes.fieldInput,
                        focused: "focused",
                    },
                },
                InputLabelProps: {
                    classes: {
                        root: this.props.classes.label,
                        focused: "focused",
                    },
                },
            };
            if (!window.PHONE_OR_PAD) {
                component = (<pickers_1.KeyboardTimePicker KeyboardButtonProps={{
                    classes: {
                        root: this.props.classes.iconButton,
                    },
                }} {...basicProps}/>);
            }
            else {
                component = (<pickers_1.TimePicker {...basicProps}/>);
            }
        }
        // return it
        return (<div className={this.props.classes.container}>
        {i18nDescription ? <div className={this.props.classes.description}>
          <core_1.Icon>keyboard_arrow_down</core_1.Icon>{i18nDescription}</div> : null}
        {component}
        <div className={this.props.classes.errorMessage}>
          {i18nInvalidReason}
        </div>
      </div>);
    }
}
exports.default = PropertyEntryDateTime;
