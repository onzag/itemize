"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const moment_1 = __importDefault(require("moment"));
const deep_equal_1 = __importDefault(require("deep-equal"));
const constants_1 = require("../../../../constants");
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
            !!this.props.rtl !== !!nextProps.rtl ||
            !!this.props.forceInvalid !== !!nextProps.forceInvalid ||
            this.props.altDescription !== nextProps.altDescription ||
            this.props.altPlaceholder !== nextProps.altPlaceholder ||
            this.props.altLabel !== nextProps.altLabel ||
            !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
            nextProps.language !== this.props.language ||
            nextProps.i18n !== this.props.i18n ||
            nextProps.icon !== this.props.icon ||
            nextProps.renderer !== this.props.renderer ||
            !deep_equal_1.default(this.props.rendererArgs, nextProps.rendererArgs);
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
        const i18nData = this.props.property.getI18nDataFor(this.props.language);
        const i18nLabel = this.props.altLabel || (i18nData && i18nData.label);
        const i18nDescription = this.props.hideDescription ? null : (this.props.altDescription || (i18nData && i18nData.description));
        const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);
        // get the invalid reason if any
        const invalidReason = this.props.state.invalidReason;
        const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
            (this.props.poked || this.props.state.userSet) && invalidReason;
        let i18nInvalidReason = null;
        if (isCurrentlyShownAsInvalid && i18nData &&
            i18nData.error && i18nData.error[invalidReason]) {
            i18nInvalidReason = i18nData.error[invalidReason];
        }
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            label: i18nLabel,
            placeholder: i18nPlaceholder,
            description: i18nDescription,
            icon: this.props.icon,
            currentAppliedValue: this.props.state.stateAppliedValue,
            currentValue: this.props.state.value,
            currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
            currentInvalidReason: i18nInvalidReason,
            currentInternalValue: this.props.state.internalValue,
            canRestore: this.props.state.value !== this.props.state.stateAppliedValue,
            momentValue: this.state.value,
            type: this.props.property.getType(),
            disabled: this.props.state.enforced,
            autoFocus: this.props.autoFocus || false,
            i18nCancel: this.props.i18n[this.props.language].cancel,
            i18nOk: this.props.i18n[this.props.language].ok,
            onChange: this.props.onChange,
            onChangeByMoment: this.handleOnChange,
            onRestore: this.props.onRestore,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.default = PropertyEntryDateTime;
