"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const I18nReadError_1 = __importStar(require("./I18nReadError"));
const I18nRead_1 = __importStar(require("./I18nRead"));
const app_1 = require("../../internal/app");
const module_1 = require("../../providers/module");
const item_definition_1 = require("../../providers/item-definition");
const include_1 = require("../../providers/include");
function i18nReadManyInternal(localeContext, dataContext, moduleContextualValue, itemDefinitionContextualValue, includeContext, props) {
    const args = props.data.map((toProvideProps) => {
        if (toProvideProps.error) {
            return I18nReadError_1.i18nReadErrorInternal(localeContext, dataContext, toProvideProps);
        }
        else {
            return I18nRead_1.i18nReadInternal(localeContext, moduleContextualValue, itemDefinitionContextualValue, includeContext, toProvideProps);
        }
    });
    return props.children(...args);
}
exports.i18nReadManyInternal = i18nReadManyInternal;
function I18nReadMany(props) {
    if (props.data.length === 0) {
        return props.children();
    }
    else if (props.data.length === 1) {
        const toProvide = props.data[0];
        if (toProvide.error) {
            react_1.default.createElement(I18nReadError_1.default, Object.assign({}, toProvide), props.children);
        }
        return (react_1.default.createElement(I18nRead_1.default, Object.assign({}, toProvide), props.children));
    }
    const hasError = props.data.find((e) => e.error);
    if (!hasError) {
        return (react_1.default.createElement(app_1.LocaleContext.Consumer, null, (localeContext) => (react_1.default.createElement(module_1.ModuleContext.Consumer, null, (moduleContextualValue) => (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContextualValue) => (react_1.default.createElement(include_1.IncludeContext.Consumer, null, (includeContext) => {
            return i18nReadManyInternal(localeContext, null, moduleContextualValue, itemDefinitionContextualValue, includeContext, props);
        }))))))));
    }
    else {
        return (react_1.default.createElement(app_1.LocaleContext.Consumer, null, (localeContext) => (react_1.default.createElement(app_1.DataContext.Consumer, null, (dataContext) => (react_1.default.createElement(module_1.ModuleContext.Consumer, null, (moduleContextualValue) => (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContextualValue) => (react_1.default.createElement(include_1.IncludeContext.Consumer, null, (includeContext) => {
            return i18nReadManyInternal(localeContext, dataContext, moduleContextualValue, itemDefinitionContextualValue, includeContext, props);
        }))))))))));
    }
}
exports.default = I18nReadMany;
