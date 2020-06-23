"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const deep_equal_1 = __importDefault(require("deep-equal"));
class PropertyEntryBoolean extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.onRestoreHijacked = this.onRestoreHijacked.bind(this);
    }
    onRestoreHijacked() {
        if (this.props.state.stateAppliedValue !== null) {
            this.props.onRestore();
        }
        else {
            this.props.onChange(false, null);
        }
    }
    shouldComponentUpdate(nextProps) {
        return nextProps.property !== this.props.property ||
            !deep_equal_1.default(this.props.state, nextProps.state) ||
            !!this.props.poked !== !!nextProps.poked ||
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
    render() {
        const i18nData = this.props.property.getI18nDataFor(this.props.language);
        const i18nLabel = this.props.altLabel || (i18nData && i18nData.label);
        const i18nDescription = this.props.hideDescription ? null : (this.props.altDescription || (i18nData && i18nData.description));
        const i18nPlaceholder = this.props.altPlaceholder || (i18nData && i18nData.placeholder);
        const invalidReason = this.props.state.invalidReason;
        const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
            (this.props.poked || this.props.state.userSet) && invalidReason;
        let i18nInvalidReason = null;
        if (isCurrentlyShownAsInvalid && i18nData &&
            i18nData.error && i18nData.error[invalidReason]) {
            i18nInvalidReason = i18nData.error[invalidReason];
        }
        const i18nTrue = i18nData.true_label;
        const i18nFalse = i18nData.false_label;
        const i18nNull = i18nData.null_label;
        const isTernary = this.props.property.isNullable() && !this.props.property.isCoercedIntoDefaultWhenNull();
        const trueLabel = i18nTrue || this.props.i18n[this.props.language].yes;
        const falseLabel = i18nFalse || this.props.i18n[this.props.language].no;
        const nullLabel = i18nNull || this.props.i18n[this.props.language].unspecified;
        if (this.props.state.value === null && !isTernary) {
            console.warn("Warning!... you should set a default value to a non ternary boolean field, got null");
        }
        const RendererElement = this.props.renderer;
        const rendererArgs = {
            args: this.props.rendererArgs,
            rtl: this.props.rtl,
            label: i18nLabel,
            placeholder: i18nPlaceholder,
            description: i18nDescription,
            icon: this.props.icon,
            isTernary,
            trueLabel,
            falseLabel,
            nullLabel,
            currentAppliedValue: this.props.state.stateAppliedValue,
            currentValue: isTernary ? this.props.state.value : (this.props.state.value || false),
            currentValid: !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
            currentInvalidReason: i18nInvalidReason,
            currentInternalValue: this.props.state.internalValue,
            canRestore: (this.props.state.value || false) !== (this.props.state.stateAppliedValue || false),
            disabled: this.props.state.enforced,
            autoFocus: this.props.autoFocus || false,
            onChange: this.props.onChange,
            onRestore: this.onRestoreHijacked,
        };
        return react_1.default.createElement(RendererElement, Object.assign({}, rendererArgs));
    }
}
exports.default = PropertyEntryBoolean;
