"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const app_1 = require("../../internal/app");
const util_1 = require("../../../util");
const isDevelopment = process.env.NODE_ENV === "development";
function i18nReadErrorInternal(localeData, data, props) {
    const freeError = props.error;
    if (!freeError.modulePath) {
        let errorMessage = localeData.i18n[localeData.language].error[props.error.code];
        if (props.capitalize) {
            errorMessage = util_1.capitalize(errorMessage);
        }
        return props.children ? props.children(errorMessage) : errorMessage;
    }
    let mod;
    try {
        mod = data.value.getModuleFor(freeError.modulePath);
    }
    catch {
        console.warn("Invalid error module in", freeError);
        return null;
    }
    let itemDef;
    if (freeError.includeIdItemDefPath) {
        try {
            itemDef = mod.getItemDefinitionFor(freeError.includeIdItemDefPath);
        }
        catch {
            console.warn("failed to display error due to includeIdItemDefPath", freeError);
            return null;
        }
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
    if (freeError.propertyId) {
        let propertyDef;
        if (itemDef) {
            try {
                propertyDef = itemDef.getPropertyDefinitionFor(freeError.propertyId, true);
            }
            catch {
                console.warn("failed to display error due to propertyId", freeError);
                return null;
            }
        }
        else {
            try {
                propertyDef = mod.getPropExtensionFor(freeError.propertyId);
            }
            catch {
                console.warn("failed to display error due to propertyId not extension", freeError);
                return null;
            }
        }
        const i18nData = propertyDef.getI18nDataFor(localeData.language);
        let i18nErrorValue = i18nData && i18nData.error && i18nData.error[freeError.pcode];
        if (!i18nErrorValue) {
            // pcode might be null, this can happen by a programming error
            console.warn("failed to display error due to pcode or language", freeError);
            return null;
        }
        if (props.capitalize) {
            i18nErrorValue = util_1.capitalize(i18nErrorValue);
        }
        return props.children ? props.children(i18nErrorValue) : i18nErrorValue;
    }
    else if (freeError.policyType) {
        const i18nData = itemDef.getI18nDataFor(localeData.language);
        let i18nErrorValue = i18nData &&
            i18nData.policies &&
            i18nData.policies[freeError.policyType] &&
            i18nData.policies[freeError.policyType][freeError.policyName] &&
            i18nData.policies[freeError.policyType][freeError.policyName].fail;
        if (!i18nErrorValue) {
            console.warn("failed to display error due to code or language", freeError);
            return null;
        }
        if (props.capitalize) {
            i18nErrorValue = util_1.capitalize(i18nErrorValue);
        }
        return props.children ? props.children(i18nErrorValue) : i18nErrorValue;
    }
}
exports.i18nReadErrorInternal = i18nReadErrorInternal;
function I18nReadError(props) {
    if (props.error === null) {
        return null;
    }
    return (react_1.default.createElement(app_1.LocaleContext.Consumer, null, (localeData) => {
        const freeError = props.error;
        if (isDevelopment && freeError.message) {
            console.warn(freeError.message);
        }
        // cheap way to know if this is a basic error code
        // without having to check for all types of error code
        if (!freeError.modulePath) {
            let errorMessage = localeData.i18n[localeData.language].error[props.error.code];
            if (props.capitalize) {
                errorMessage = util_1.capitalize(errorMessage);
            }
            return props.children ? props.children(errorMessage) : errorMessage;
        }
        return (react_1.default.createElement(app_1.DataContext.Consumer, null, (data) => {
            return i18nReadErrorInternal(localeData, data, props);
        }));
    }));
}
exports.default = I18nReadError;
