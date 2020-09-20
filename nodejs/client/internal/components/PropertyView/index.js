"use strict";
/**
 * Contains the property view main handler that handles all
 * the property view variants and setups the renderers
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawBasePropertyView = void 0;
const react_1 = __importDefault(require("react"));
const locale_provider_1 = require("../../providers/locale-provider");
const imported_resources_1 = require("../../../../imported-resources");
const renderer_1 = require("../../../providers/renderer");
const PropertyViewSimple_1 = require("./PropertyViewSimple");
const PropertyViewText_1 = __importDefault(require("./PropertyViewText"));
const PropertyViewFile_1 = __importDefault(require("./PropertyViewFile"));
const config_provider_1 = require("../../providers/config-provider");
const PropertyViewBoolean_1 = require("./PropertyViewBoolean");
const PropertyViewDateTime_1 = require("./PropertyViewDateTime");
const PropertyViewLocation_1 = require("./PropertyViewLocation");
const PropertyViewCurrency_1 = require("./PropertyViewCurrency");
const PropertyViewReference_1 = __importDefault(require("./PropertyViewReference"));
const ssr_provider_1 = require("../../../../client/internal/providers/ssr-provider");
const token_provider_1 = require("../../../../client/internal/providers/token-provider");
;
/**
 * The handler registry
 */
const handlerRegistry = {
    string: {
        renderer: "PropertyViewSimple",
        handler: PropertyViewSimple_1.PropertyViewSimple,
    },
    integer: {
        renderer: "PropertyViewSimple",
        handler: PropertyViewSimple_1.PropertyViewSimple,
        subhandler: {
            reference: {
                renderer: "PropertyViewSimple",
                handler: PropertyViewReference_1.default,
                includeTokenDataAndSSR: true,
            }
        }
    },
    number: {
        renderer: "PropertyViewSimple",
        handler: PropertyViewSimple_1.PropertyViewSimple,
    },
    boolean: {
        renderer: "PropertyViewBoolean",
        handler: PropertyViewBoolean_1.PropertyViewBoolean,
    },
    text: {
        renderer: "PropertyViewText",
        handler: PropertyViewText_1.default,
        includeConfig: true,
        defaultSubhandler: {
            renderer: "PropertyViewSimple",
            handler: PropertyViewSimple_1.PropertyViewSimple,
        }
    },
    currency: {
        renderer: "PropertyViewCurrency",
        handler: PropertyViewCurrency_1.PropertyViewCurrency,
    },
    // TODO
    unit: null,
    password: {
        renderer: "PropertyViewSimple",
        handler: PropertyViewSimple_1.PropertyViewSimple,
    },
    year: {
        renderer: "PropertyViewSimple",
        handler: PropertyViewSimple_1.PropertyViewSimple,
    },
    datetime: {
        renderer: "PropertyViewDateTime",
        handler: PropertyViewDateTime_1.PropertyViewDateTime,
    },
    date: {
        renderer: "PropertyViewDateTime",
        handler: PropertyViewDateTime_1.PropertyViewDateTime,
    },
    time: {
        renderer: "PropertyViewDateTime",
        handler: PropertyViewDateTime_1.PropertyViewDateTime,
    },
    location: {
        renderer: "PropertyViewLocation",
        handler: PropertyViewLocation_1.PropertyViewLocation,
    },
    file: {
        renderer: "PropertyViewFile",
        handler: PropertyViewFile_1.default,
        includeConfig: true,
    },
    // TODO
    files: null,
};
/**
 * A raw property view that uses the simple view
 * by default in order to build a view for a raw property, raw properties
 * such as created_at edited_at type and so on, which do not have entries
 * nor property definitions
 *
 * @param props the props
 * @returns areact element
 */
function RawBasePropertyView(props) {
    // Build the context and render sending the right props
    return (react_1.default.createElement(renderer_1.RendererContext.Consumer, null, (renderers) => react_1.default.createElement(locale_provider_1.LocaleContext.Consumer, null, (locale) => {
        const renderer = props.renderer || renderers.PropertyViewSimple;
        return (react_1.default.createElement(PropertyViewSimple_1.PropertyViewSimple, { itemDefinition: null, property: null, include: null, forId: null, forVersion: null, containerId: null, state: {
                userSet: false,
                default: null,
                enforced: false,
                hidden: false,
                valid: true,
                value: props.value,
                stateValue: props.value,
                stateAppliedValue: props.value,
                stateValueModified: false,
                stateValueHasBeenManuallySet: false,
                invalidReason: null,
                internalValue: null,
                propertyId: null,
            }, currencyFactors: null, language: locale.language, i18n: locale.i18n, rtl: locale.rtl, currency: imported_resources_1.currencies[locale.currency], country: imported_resources_1.countries[locale.country], renderer: renderer, rendererArgs: props.rendererArgs || {}, cacheFiles: false }));
    })));
}
exports.RawBasePropertyView = RawBasePropertyView;
function PropertyView(props) {
    if (props.state.hidden) {
        return null;
    }
    const type = props.property.getType();
    const subtype = props.property.getSubtype();
    // First get the handler by the type
    let registryEntry = handlerRegistry[type];
    if (subtype === null && registryEntry.defaultSubhandler) {
        registryEntry = registryEntry.defaultSubhandler;
    }
    else if (subtype && registryEntry.subhandler && registryEntry.subhandler[subtype]) {
        registryEntry = registryEntry.subhandler[subtype];
    }
    // First get the handler by the type
    const Element = registryEntry.handler;
    // Build the context and render sending the right props
    return (react_1.default.createElement(renderer_1.RendererContext.Consumer, null, (renderers) => react_1.default.createElement(locale_provider_1.LocaleContext.Consumer, null, (locale) => {
        const renderer = props.renderer || renderers[registryEntry.renderer];
        const nProps = {
            ...props,
            language: locale.language,
            i18n: locale.i18n,
            rtl: locale.rtl,
            currency: imported_resources_1.currencies[locale.currency],
            currencyFactors: locale.currencyFactors,
            country: imported_resources_1.countries[locale.country],
            renderer,
            rendererArgs: props.rendererArgs || {},
        };
        if (registryEntry.includeConfig && registryEntry.includeTokenDataAndSSR) {
            return (react_1.default.createElement(config_provider_1.ConfigContext.Consumer, null, (config) => (react_1.default.createElement(ssr_provider_1.SSRContext.Consumer, null, (ssr) => (react_1.default.createElement(token_provider_1.TokenContext.Consumer, null, (tokenData) => (react_1.default.createElement(Element, Object.assign({}, nProps, { tokenData: tokenData, ssr: ssr, config: config })))))))));
        }
        else if (registryEntry.includeConfig) {
            return (react_1.default.createElement(config_provider_1.ConfigContext.Consumer, null, (config) => (react_1.default.createElement(Element, Object.assign({}, nProps, { config: config })))));
        }
        else if (registryEntry.includeTokenDataAndSSR) {
            return (react_1.default.createElement(ssr_provider_1.SSRContext.Consumer, null, (ssr) => (react_1.default.createElement(token_provider_1.TokenContext.Consumer, null, (tokenData) => (react_1.default.createElement(Element, Object.assign({}, nProps, { tokenData: tokenData, ssr: ssr })))))));
        }
        return (react_1.default.createElement(Element, Object.assign({}, nProps)));
    })));
}
exports.default = PropertyView;
