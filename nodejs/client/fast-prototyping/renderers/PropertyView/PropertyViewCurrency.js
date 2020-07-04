"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function PropertyViewCurrencyRenderer(props) {
    const rootClassName = props.args.className || null;
    const valueClassName = props.args.valueClassName || null;
    const symbolClassName = props.args.symbolClassName || null;
    const originalClassName = props.args.originalClassName || null;
    const originalValueClassName = props.args.originalValueClassName || null;
    const originalSymbolClassName = props.args.originalSymbolClassName || null;
    if (props.currentValue === null && props.args.NullComponent) {
        const NullComponent = props.args.NullComponent;
        const nullArgs = props.args.nullComponentArgs;
        return (react_1.default.createElement("span", { className: rootClassName },
            react_1.default.createElement(NullComponent, Object.assign({}, nullArgs))));
    }
    else if (props.currentValue === null) {
        return (react_1.default.createElement("span", { className: rootClassName }));
    }
    const mainCurrency = props.convertedCurrency || props.originalCurrency;
    const mainStrValue = props.convertedStrValue || props.originalStrValue;
    if (props.format === "$N") {
        return (react_1.default.createElement("span", { className: rootClassName },
            react_1.default.createElement("span", { className: symbolClassName }, mainCurrency.symbol),
            react_1.default.createElement("span", { className: valueClassName }, mainStrValue),
            !props.args.hideOriginalIfConverted && props.convertedCurrency ? react_1.default.createElement("span", { className: originalClassName },
                react_1.default.createElement("span", { className: originalSymbolClassName }, props.originalCurrency.symbol),
                react_1.default.createElement("span", { className: originalValueClassName }, props.originalStrValue)) : null));
    }
    return (react_1.default.createElement("span", { className: rootClassName },
        react_1.default.createElement("span", { className: valueClassName }, mainStrValue),
        react_1.default.createElement("span", { className: symbolClassName }, mainCurrency.symbol),
        !props.args.hideOriginalIfConverted && props.convertedCurrency ? react_1.default.createElement("span", { className: originalClassName },
            react_1.default.createElement("span", { className: originalValueClassName }, props.originalStrValue),
            react_1.default.createElement("span", { className: originalSymbolClassName }, props.originalCurrency.symbol)) : null));
}
exports.default = PropertyViewCurrencyRenderer;
