"use strict";
/**
 * Provides the read functionality to read language content in the
 * item definition, module, or even the root context
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const locale_provider_1 = require("../../internal/providers/locale-provider");
const item_1 = require("../../providers/item");
const util_1 = require("../../../util");
const include_1 = require("../../providers/include");
const module_1 = require("../../providers/module");
const util_2 = require("../../../util");
/**
 * For a given object target, it will loop until it gets a match for the given key
 * @param target the object targe
 * @param keySplitted the splitted key to dive in
 */
function loopForKeyAtTarget(target, keySplitted) {
    let result = typeof target === "undefined" ? null : target;
    keySplitted.forEach((key) => {
        if (result === null ||
            typeof result === "string") {
            result = null;
            return;
        }
        result = typeof result[key] === "undefined" ? null : result[key];
    });
    return result;
}
/**
 * This function is a helper that represents what is used internally by
 * the i18n reader, given what it needs
 *
 * @param localeContext it needs the locale context to get the current language and the root locale data
 * @param mod it needs the module in its context or null
 * @param idef it needs the item definition in its context or null
 * @param include the include in its context or null
 * @param props the current props
 */
function i18nReadInternal(localeContext, mod, idef, include, props) {
    const idSplitted = props.id.split(".");
    // so first we go in order of priority of what we want to read
    let i18nValue = null;
    // first by the inlcude context
    if (include) {
        // if we have a name we use the include context using the name i18n function
        // as the name can be inherited from the item definition if not specified
        if (props.propertyId) {
            const property = include.getSinkingPropertyFor(props.propertyId);
            i18nValue = loopForKeyAtTarget(property.getI18nDataFor(localeContext.language), idSplitted);
        }
        else if (props.id === "name") {
            i18nValue = include.getI18nNameFor(localeContext.language) || null;
        }
        else {
            // othewise we just extract the i18n data for the include and call it with the id,
            // normally there are only specific labels here at this level in the include context
            i18nValue = loopForKeyAtTarget(include.getI18nDataFor(localeContext.language), idSplitted);
        }
    }
    // so if the include thing failed and we have an item definition context
    if (idef && i18nValue === null) {
        if (props.propertyId) {
            const property = idef.getPropertyDefinitionFor(props.propertyId, true);
            i18nValue = loopForKeyAtTarget(property.getI18nDataFor(localeContext.language), idSplitted);
        }
        else {
            // so we get the i18n item definition data
            const i18nIdefData = idef.getI18nDataFor(localeContext.language);
            // if we are specifying a policy like if we are in a policy context
            if (props.policyType && props.policyName) {
                // we go for the policy value and the policy name value
                i18nValue = loopForKeyAtTarget(i18nIdefData, ["policies", props.policyType, props.policyName].concat(idSplitted));
            }
            else {
                const customValue = loopForKeyAtTarget(i18nIdefData, ["custom"].concat(idSplitted));
                // otherwise without policy we check if we have custom data in the item definition
                // and this custom properties fit the data
                if (customValue) {
                    i18nValue = customValue;
                }
                else {
                    // otherwise we give an standard property
                    i18nValue = loopForKeyAtTarget(i18nIdefData, idSplitted);
                }
            }
        }
    }
    // now in modules
    if (mod && i18nValue === null) {
        if (props.propertyId) {
            const property = mod.getPropExtensionFor(props.propertyId);
            i18nValue = loopForKeyAtTarget(property.getI18nDataFor(localeContext.language), idSplitted);
        }
        else {
            // modules act similar to item definitions they also support custom properties
            const i18nModData = mod.getI18nDataFor(localeContext.language);
            const customValue = loopForKeyAtTarget(i18nModData, ["custom"].concat(idSplitted));
            if (customValue) {
                i18nValue = customValue;
            }
            else {
                i18nValue = loopForKeyAtTarget(i18nModData, idSplitted);
            }
        }
    }
    // now we search in the generic locale file, there are no custom, even though
    // they are all required
    if (i18nValue === null) {
        // for that we extract it
        i18nValue = loopForKeyAtTarget(localeContext.i18n, [localeContext.language].concat(idSplitted));
    }
    // if we still find nothing in all these contexts
    if (i18nValue === null) {
        // we want to throw an error
        let errMessage = "Unknown key in context: " + props.id;
        // let's make the error more specific
        if (idef) {
            // specify the context
            errMessage += "; in item definition context for " +
                idef.getName();
            // add the policies if any
            if (props.policyType && props.policyName) {
                errMessage += "; in policy " + props.policyType + " " + props.policyName;
            }
            // and the include is if so deemed required
            if (include) {
                errMessage += "; in item context for " +
                    include.getId();
            }
            // and the include is if so deemed required
            if (props.propertyId) {
                errMessage += "; for property id " +
                    props.propertyId;
            }
        }
        // throw the error
        throw new Error(errMessage);
    }
    if (props.capitalize) {
        i18nValue = util_2.capitalize(i18nValue);
    }
    // if we are passing arguments to replace the {0} {1} etc... numbers
    if (props.args) {
        // we have two options, these are for basic types, which is faster and returns a string
        if (props.args.every((a) => typeof a === "string" || typeof a === "number")) {
            // the standard locale replacer
            i18nValue = util_1.localeReplacer(i18nValue, ...props.args);
        }
        else {
            // otherwise we use the locale replacer to array which creates react fragments
            // and returns an array of react nodes, this all depends on the args that the user
            // is passing
            i18nValue = util_1.localeReplacerToArray(i18nValue, ...props.args).map((output, index) => {
                if (typeof output === "string") {
                    return (react_1.default.createElement("span", { key: index, style: { whiteSpace: "pre-wrap" } }, output));
                }
                return (react_1.default.createElement(react_1.default.Fragment, { key: index }, output));
            });
        }
    }
    // now we want to get the final node that we are returning, the react node
    let finalContent = i18nValue;
    if (props.html) {
        const Element = props.htmlWrappingTag || "div";
        finalContent = (react_1.default.createElement(Element, { dangerouslySetInnerHTML: { __html: i18nValue } }));
    }
    // if we haven't specified a children function
    // we just return the entire content
    if (!props.children) {
        return finalContent;
    }
    // otherwise we return the children wrapped function
    return props.children(finalContent);
}
/**
 * The optimizer class just pipes to the internal
 */
class I18nReadInternalOptimized extends react_1.default.PureComponent {
    render() {
        return i18nReadInternal(this.props.localeContext, this.props.mod, this.props.idef, this.props.include, this.props);
    }
    ;
}
exports.I18nReadInternalOptimized = I18nReadInternalOptimized;
/**
 * Allows to read localized properties from the properties
 * file as they are available in the current context
 *
 * @param props the props
 * @returns a react node
 */
function I18nRead(props) {
    return (react_1.default.createElement(locale_provider_1.LocaleContext.Consumer, null, (localeContext) => (react_1.default.createElement(module_1.ModuleContext.Consumer, null, (moduleContextualValue) => (react_1.default.createElement(item_1.ItemContext.Consumer, null, (itemContextualValue) => (react_1.default.createElement(include_1.IncludeContext.Consumer, null, (includeContext) => (react_1.default.createElement(I18nReadInternalOptimized, Object.assign({}, props, { localeContext: localeContext, mod: moduleContextualValue && moduleContextualValue.mod, idef: itemContextualValue && itemContextualValue.idef, include: includeContext && includeContext.include })))))))))));
}
exports.default = I18nRead;
