"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const app_1 = require("../internal/app");
const item_definition_1 = require("../providers/item-definition");
const util_1 = require("../../util");
const imported_resources_1 = require("../../imported-resources");
const include_1 = require("../providers/include");
const module_1 = require("../providers/module");
function I18nRead(props) {
    return (<app_1.LocaleContext.Consumer>
      {(localeContext) => (<module_1.ModuleContext.Consumer>
            {(moduleContextualValue) => (<item_definition_1.ItemDefinitionContext.Consumer>
                  {(itemDefinitionContextualValue) => (<include_1.IncludeContext.Consumer>
                        {(includeContext) => {
        let i18nValue = null;
        if (itemDefinitionContextualValue) {
            if (includeContext) {
                if (props.id === "name") {
                    i18nValue = includeContext.include.getI18nNameFor(localeContext.language) || null;
                }
                else {
                    const includeI18nData = includeContext.include.getI18nDataFor(localeContext.language);
                    i18nValue = includeI18nData ? includeI18nData[props.id] || null : null;
                }
            }
            else {
                const i18nIdefData = itemDefinitionContextualValue.idef.getI18nDataFor(localeContext.language);
                if (props.policyType && props.policyName) {
                    const i18nPolicyTypeValue = i18nIdefData ? (i18nIdefData.policies && i18nIdefData.policies[props.policyType])
                        || null : null;
                    const i18nPolicyNameValue = i18nPolicyTypeValue ? i18nPolicyTypeValue[props.policyName] || null : null;
                    i18nValue = i18nPolicyNameValue ? i18nPolicyNameValue[props.id] || null : null;
                }
                else {
                    if (i18nIdefData && i18nIdefData.custom && i18nIdefData.custom[props.id]) {
                        i18nValue = i18nIdefData.custom[props.id];
                    }
                    else {
                        i18nValue = i18nIdefData ? i18nIdefData[props.id] || null : null;
                    }
                }
            }
        }
        if (moduleContextualValue && i18nValue === null) {
            const i18nModData = moduleContextualValue.mod.getI18nDataFor(localeContext.language);
            if (i18nModData && i18nModData.custom && i18nModData.custom[props.id]) {
                i18nValue = i18nModData.custom[props.id];
            }
            else {
                i18nValue = i18nModData ? i18nModData[props.id] || null : null;
            }
        }
        if (i18nValue === null) {
            i18nValue = (localeContext.i18n[localeContext.language] &&
                localeContext.i18n[localeContext.language][props.id]) || null;
        }
        if (i18nValue === null) {
            let errMessage = "Unknown key in context: " + props.id;
            if (itemDefinitionContextualValue) {
                errMessage += "; in item definition context for " +
                    itemDefinitionContextualValue.idef.getName();
                if (props.policyType && props.policyName) {
                    errMessage += "; in policy " + props.policyType + " " + props.policyName;
                }
                if (includeContext) {
                    errMessage += "; in item context for " +
                        includeContext.include.getId();
                }
            }
            throw new Error(errMessage);
        }
        if (props.args) {
            if (props.args.every((a) => typeof a === "string")) {
                i18nValue = util_1.localeReplacer(i18nValue, ...props.args);
            }
            else {
                i18nValue = util_1.localeReplacerToArray(i18nValue, ...props.args).map((output, index) => (<react_1.default.Fragment key={index}>
                                    {output}
                                  </react_1.default.Fragment>));
            }
        }
        let finalNode = i18nValue;
        if (props.html && finalNode !== null) {
            const Element = props.htmlWrappingTag || "div";
            finalNode = (<Element dangerouslySetInnerHTML={{ __html: i18nValue }}/>);
        }
        if (!props.children) {
            return finalNode;
        }
        return props.children(finalNode);
    }}
                      </include_1.IncludeContext.Consumer>)}
                </item_definition_1.ItemDefinitionContext.Consumer>)}
          </module_1.ModuleContext.Consumer>)}
    </app_1.LocaleContext.Consumer>);
}
exports.I18nRead = I18nRead;
const isDevelopment = process.env.NODE_ENV === "development";
function I18nReadError(props) {
    if (props.error === null) {
        return null;
    }
    return (<app_1.LocaleContext.Consumer>
      {(localeData) => {
        const freeError = props.error;
        if (isDevelopment) {
            console.warn(freeError.message);
        }
        // cheap way to know if this is a basic error code
        // without having to check for all types of error code
        if (!freeError.modulePath) {
            const errorMessage = localeData.i18n[localeData.language].error[props.error.code];
            return errorMessage;
        }
        return (<app_1.DataContext.Consumer>
              {(data) => {
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
                const i18nErrorValue = i18nData && i18nData.error && i18nData.error[freeError.pcode];
                if (!i18nErrorValue) {
                    // pcode might be null, this can happen by a programming error
                    console.warn("failed to display error due to pcode or language", freeError);
                    return null;
                }
                return i18nErrorValue;
            }
            else if (freeError.policyType) {
                const i18nData = itemDef.getI18nDataFor(localeData.language);
                const i18nErrorValue = i18nData &&
                    i18nData.policies &&
                    i18nData.policies[freeError.policyType] &&
                    i18nData.policies[freeError.policyType][freeError.policyName] &&
                    i18nData.policies[freeError.policyType][freeError.policyName].fail;
                if (!i18nErrorValue) {
                    console.warn("failed to display error due to code or language", freeError);
                    return null;
                }
                return i18nErrorValue;
            }
        }}
            </app_1.DataContext.Consumer>);
    }}
    </app_1.LocaleContext.Consumer>);
}
exports.I18nReadError = I18nReadError;
function AppLanguageRetriever(props) {
    return (<app_1.LocaleContext.Consumer>
      {(localeContext) => {
        const currentLanguage = {
            code: localeContext.language,
            name: localeContext.langLocales[localeContext.language].name,
        };
        const availableLanguages = [];
        Object.keys(localeContext.langLocales).forEach((code) => {
            availableLanguages.push({
                code,
                name: localeContext.langLocales[code].name,
            });
        });
        return props.children({
            currentLanguage,
            availableLanguages,
            changeLanguageTo: localeContext.updating ? () => null : localeContext.changeLanguageTo,
        });
    }}
    </app_1.LocaleContext.Consumer>);
}
exports.AppLanguageRetriever = AppLanguageRetriever;
function AppCurrencyRetriever(props) {
    return (<app_1.LocaleContext.Consumer>
      {(localeContext) => {
        return props.children({
            currentCurrency: imported_resources_1.currencies[localeContext.currency.toUpperCase()],
            availableCurrencies: imported_resources_1.arrCurrencies,
            changeCurrencyTo: localeContext.updating ? () => null : localeContext.changeCurrencyTo,
        });
    }}
    </app_1.LocaleContext.Consumer>);
}
exports.AppCurrencyRetriever = AppCurrencyRetriever;
function AppCountryRetriever(props) {
    return (<app_1.LocaleContext.Consumer>
      {(localeContext) => {
        return props.children({
            currentCountry: imported_resources_1.countries[localeContext.country.toUpperCase()],
            availableCountries: imported_resources_1.arrCountries,
            changeCountryTo: localeContext.updating ? () => null : localeContext.changeCountryTo,
        });
    }}
    </app_1.LocaleContext.Consumer>);
}
exports.AppCountryRetriever = AppCountryRetriever;
