"use strict";
/**
 * Provides the functionality to display errors that are given
 * either by the backend, emulated or local errors; regardless
 * of context
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.I18nReadErrorInternalOptimized = void 0;
const react_1 = __importDefault(require("react"));
const locale_provider_1 = require("../../internal/providers/locale-provider");
const appdata_provider_1 = require("../../internal/providers/appdata-provider");
const util_1 = require("../../../util");
// We use this in order to log the messages of the errors we are attempting to display
// this is good because internal error messages can be different from localized error messages
// a lot is just UNSPECIFIED codes
const isDevelopment = process.env.NODE_ENV === "development";
/**
 * Does the actual logic to find out the proper
 * error message for the given function
 * @param localeContext the locale context data
 * @param data the data from the data context
 * @param props standard props
 */
function i18nReadErrorInternal(localeContext, root, props) {
    // because there are so many times of errors and typescript
    // is going to cause me a heart attack, I liberated the error
    // and the error is now FREE
    const freeError = props.error;
    // now we check if it has a module path, if it doesn't it's not an error
    // in an module, item, include, etc... context, it's an average error
    if (!freeError.modulePath) {
        // so we get the error message directly from the locale context
        let errorMessage = localeContext.i18n[localeContext.language].error[props.error.code];
        if (props.capitalize) {
            errorMessage = util_1.capitalize(errorMessage);
        }
        return props.children ? props.children(errorMessage) : errorMessage;
    }
    // so we get the module in this case
    let mod;
    try {
        mod = root.getModuleFor(freeError.modulePath);
    }
    catch {
        console.warn("Invalid error module in", freeError);
        return null;
    }
    // also get the item definition in this case
    let itemDef;
    // so we get the item definition for the include if it's for
    // an include, or otherwise we get it from the item definition
    // that is specified itself
    // in this case if includeIdItemDefPath this means that the error
    // is of the INVALID_INCLUDE type, an this includeIdItemDefPath is
    // the item definition of the include, this error would also have
    // a itemDefPath in it that contains such include, however for the usage
    // of display we use the includeIdItemDefPath when an invalid include is there
    // it's because of an invalid property and will (should have a pcode) in such
    // a case it's also INVALID_PROPERTY
    if (freeError.includeIdItemDefPath) {
        try {
            itemDef = mod.getItemDefinitionFor(freeError.includeIdItemDefPath);
        }
        catch {
            console.warn("failed to display error due to includeIdItemDefPath", freeError);
            return null;
        }
        // otherwise if we have this itemDefPath we would use that one instead
    }
    else if (freeError.itemDefPath) {
        try {
            itemDef = mod.getItemDefinitionFor(freeError.itemDefPath);
        }
        catch {
            console.warn("failed to display error due to includeIdItemDefPath", freeError);
            return null;
        }
    }
    // there might not be idef at all, this might be for a prop extension in which case
    // there simply isn't one
    // so now we have the error for a property or a policy so we check
    if (freeError.propertyId) {
        // so we need to get the property
        let propertyDef;
        // if we have an item definition that we get that property from
        if (itemDef) {
            // we try to get it
            try {
                propertyDef = itemDef.getPropertyDefinitionFor(freeError.propertyId, true);
            }
            catch {
                console.warn("failed to display error due to propertyId", freeError);
                return null;
            }
        }
        else {
            // otherwise it must be a prop extension
            try {
                propertyDef = mod.getPropExtensionFor(freeError.propertyId);
            }
            catch {
                console.warn("failed to display error due to propertyId not extension", freeError);
                return null;
            }
        }
        // now we get the i18n data for that property
        const i18nData = propertyDef.getI18nDataFor(localeContext.language);
        // and use our pcode
        let i18nErrorValue = i18nData && i18nData.error && i18nData.error[freeError.pcode];
        if (!i18nErrorValue) {
            // pcode might be null, this can happen by a programming error, as a pcode
            // could not be calculated in the server side because the input was somehow
            // mangled (this means the client sent something weird)
            console.warn("failed to display error due to pcode or language", freeError);
            return null;
        }
        // if we are to capitalize
        if (props.capitalize) {
            // we do so
            i18nErrorValue = util_1.capitalize(i18nErrorValue);
        }
        // and return accordingly
        return props.children ? props.children(i18nErrorValue) : i18nErrorValue;
        // now for the case of polices
    }
    else if (freeError.policyType) {
        // we just get the info from the itemDef
        const i18nData = itemDef.getI18nDataFor(localeContext.language);
        // and get the value from the policy information
        let i18nErrorValue = i18nData &&
            i18nData.policies &&
            i18nData.policies[freeError.policyType] &&
            i18nData.policies[freeError.policyType][freeError.policyName] &&
            i18nData.policies[freeError.policyType][freeError.policyName].fail;
        // if we find nothing we warn of an error
        if (!i18nErrorValue) {
            console.warn("failed to display error due to code or language", freeError);
            return null;
        }
        // capitalize and display
        if (props.capitalize) {
            i18nErrorValue = util_1.capitalize(i18nErrorValue);
        }
        return props.children ? props.children(i18nErrorValue) : i18nErrorValue;
    }
}
/**
 * The optimizer class just pipes to the internal
 */
class I18nReadErrorInternalOptimized extends react_1.default.PureComponent {
    render() {
        return i18nReadErrorInternal(this.props.localeContext, this.props.root, this.props);
    }
    ;
}
exports.I18nReadErrorInternalOptimized = I18nReadErrorInternalOptimized;
function I18nReadError(props) {
    if (props.error === null) {
        return null;
    }
    return (react_1.default.createElement(locale_provider_1.LocaleContext.Consumer, null, (localeData) => {
        // this is where we display the error
        const freeError = props.error;
        if (isDevelopment && freeError.message) {
            console.warn(freeError.message);
        }
        // cheap way to know if this is a basic error code
        // so that the data context is unecessary
        if (!freeError.modulePath) {
            return (react_1.default.createElement(I18nReadErrorInternalOptimized, Object.assign({}, props, { root: null, localeContext: localeData })));
        }
        return (react_1.default.createElement(appdata_provider_1.DataContext.Consumer, null, (data) => (react_1.default.createElement(I18nReadErrorInternalOptimized, Object.assign({}, props, { root: data.value, localeContext: localeData })))));
    }));
}
exports.default = I18nReadError;
