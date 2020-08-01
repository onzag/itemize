"use strict";
/**
 * Allows to read many errors and standard information at the same time (parallel)
 * in an efficient way
 *
 * @packageDocumentation
 */
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
const locale_provider_1 = require("../../internal/providers/locale-provider");
const appdata_provider_1 = require("../../internal/providers/appdata-provider");
const module_1 = require("../../providers/module");
const item_definition_1 = require("../../providers/item-definition");
const include_1 = require("../../providers/include");
/**
 * The internal read many functionality, somewhat less refined
 * than the previous because this one doesn't need an optimizer
 * on itself
 *
 * @param localeContext the locale context (always available)
 * @param dataContext data context for root data app access (available for errors)
 * @param moduleContextualValue module context (avaiable for standard display if exists)
 * @param itemDefinitionContextualValue item definition context (avaiable for standard display if exists)
 * @param includeContext include context (avaiable for standard display if exists)
 * @param props the actual read many props
 */
function i18nReadManyInternal(localeContext, dataContext, moduleContextualValue, itemDefinitionContextualValue, includeContext, props) {
    // so we build the args based on the component required, note how
    // we use the internal optimized instead
    const args = props.data.map((toProvideProps) => {
        const toProvidePropsAsErrorProps = toProvideProps;
        const toProvidePropsAsStdProps = toProvideProps;
        if (toProvidePropsAsErrorProps.error) {
            return (react_1.default.createElement(I18nReadError_1.I18nReadErrorInternalOptimized, Object.assign({ localeContext: localeContext, root: dataContext.value }, toProvidePropsAsErrorProps)));
        }
        else {
            return (react_1.default.createElement(I18nRead_1.I18nReadInternalOptimized, Object.assign({ localeContext: localeContext, mod: moduleContextualValue && moduleContextualValue.mod, idef: itemDefinitionContextualValue && itemDefinitionContextualValue.idef, include: includeContext && includeContext.include }, toProvidePropsAsStdProps)));
        }
    });
    // and pass that to the children
    return props.children(...args);
}
exports.i18nReadManyInternal = i18nReadManyInternal;
/**
 * The read many component which allows to read many i18n data at once
 * @param props the props
 * @returns a react node, it is marked as any because typescript gets buggy
 * when such a function returns a react node
 */
function I18nReadMany(props) {
    // if we got nothing
    if (props.data.length === 0) {
        // just return the children with no args
        return props.children();
    }
    else if (props.data.length === 1) {
        // if we have one
        const toProvide = props.data[0];
        // that is basically the same as this
        if (toProvide.error) {
            react_1.default.createElement(I18nReadError_1.default, Object.assign({}, toProvide), props.children);
        }
        return (react_1.default.createElement(I18nRead_1.default, Object.assign({}, toProvide), props.children));
    }
    // otherwise let's first check if there's an error
    const hasError = props.data.find((e) => e.error);
    // and if everything is an error
    const isOnlyErrors = props.data.every((e) => e.error);
    // if it's only errors we don't need the item definition, include, module context
    if (isOnlyErrors) {
        return (react_1.default.createElement(locale_provider_1.LocaleContext.Consumer, null, (localeContext) => (react_1.default.createElement(appdata_provider_1.DataContext.Consumer, null, (dataContext) => {
            return i18nReadManyInternal(localeContext, dataContext, null, null, null, props);
        }))));
    }
    else if (!hasError) {
        // if it doesn't have an error we don't need the data context
        return (react_1.default.createElement(locale_provider_1.LocaleContext.Consumer, null, (localeContext) => (react_1.default.createElement(module_1.ModuleContext.Consumer, null, (moduleContextualValue) => (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContextualValue) => (react_1.default.createElement(include_1.IncludeContext.Consumer, null, (includeContext) => {
            return i18nReadManyInternal(localeContext, null, moduleContextualValue, itemDefinitionContextualValue, includeContext, props);
        }))))))));
    }
    else {
        // otherwise we need everything
        return (react_1.default.createElement(locale_provider_1.LocaleContext.Consumer, null, (localeContext) => (react_1.default.createElement(appdata_provider_1.DataContext.Consumer, null, (dataContext) => (react_1.default.createElement(module_1.ModuleContext.Consumer, null, (moduleContextualValue) => (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContextualValue) => (react_1.default.createElement(include_1.IncludeContext.Consumer, null, (includeContext) => {
            return i18nReadManyInternal(localeContext, dataContext, moduleContextualValue, itemDefinitionContextualValue, includeContext, props);
        }))))))))));
    }
}
exports.default = I18nReadMany;
