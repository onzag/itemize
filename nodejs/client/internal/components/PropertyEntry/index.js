"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const PropertyEntryBoolean_1 = __importDefault(require("./PropertyEntryBoolean"));
const PropertyEntryText_1 = __importDefault(require("./PropertyEntryText"));
const PropertyEntryDateTime_1 = __importDefault(require("./PropertyEntryDateTime"));
const PropertyEntryLocation_1 = __importDefault(require("./PropertyEntryLocation"));
// import PropertyEntryFiles from "./PropertyEntryFiles";
// import PropertyEntryNumeric from "./PropertyEntryNumeric";
const PropertyEntrySelect_1 = __importDefault(require("./PropertyEntrySelect"));
const PropertyEntryField_1 = __importDefault(require("./PropertyEntryField"));
const PropertyEntryFile_1 = __importDefault(require("./PropertyEntryFile"));
const app_1 = require("../../app");
const imported_resources_1 = require("../../../../imported-resources");
const renderer_1 = require("../../../providers/renderer");
const config_provider_1 = require("../../providers/config-provider");
;
const selectHandler = {
    renderer: "PropertyEntrySelect",
    handler: PropertyEntrySelect_1.default,
};
/**
 * The type registry contains a list of handlers for a given type
 */
const handlerRegistry = {
    string: {
        renderer: "PropertyEntryField",
        handler: PropertyEntryField_1.default,
    },
    integer: {
        renderer: "PropertyEntryField",
        handler: PropertyEntryField_1.default,
    },
    number: {
        renderer: "PropertyEntryField",
        handler: PropertyEntryField_1.default,
    },
    boolean: {
        renderer: "PropertyEntryBoolean",
        handler: PropertyEntryBoolean_1.default,
    },
    text: {
        renderer: "PropertyEntryText",
        handler: PropertyEntryText_1.default,
        defaultSubhandler: {
            renderer: "PropertyEntryField",
            handler: PropertyEntryField_1.default,
        },
        includeConfig: true,
    },
    currency: {
        renderer: "PropertyEntryField",
        handler: PropertyEntryField_1.default,
    },
    unit: {
        renderer: "PropertyEntryField",
        handler: PropertyEntryField_1.default,
    },
    password: {
        renderer: "PropertyEntryField",
        handler: PropertyEntryField_1.default,
    },
    year: {
        renderer: "PropertyEntryField",
        handler: PropertyEntryField_1.default,
    },
    datetime: {
        renderer: "PropertyEntryDateTime",
        handler: PropertyEntryDateTime_1.default,
    },
    date: {
        renderer: "PropertyEntryDateTime",
        handler: PropertyEntryDateTime_1.default,
    },
    time: {
        renderer: "PropertyEntryDateTime",
        handler: PropertyEntryDateTime_1.default,
    },
    location: {
        renderer: "PropertyEntryLocation",
        handler: PropertyEntryLocation_1.default,
    },
    file: {
        renderer: "PropertyEntryFile",
        handler: PropertyEntryFile_1.default,
        includeConfig: true,
    },
    files: null,
};
function defaultCountryBugCatcher(code) {
    console.error("Attempted to load invalid country", code);
    return {
        name: "?",
        native: "?",
        code,
        phone: "?",
        continent: "?",
        capital: "?",
        languages: [],
        emoji: "?",
        emojiU: "?",
        currency: "USD",
        longitude: 0,
        latitude: 0,
    };
}
;
function defaultCurrencyBugCacher(code) {
    console.error("Attempted to load invalid currency", code);
    return {
        code,
        name: "?",
        symbol: "?",
        rounding: 0,
        decimals: 2,
    };
}
function PropertyEntry(props) {
    if (props.state.hidden) {
        return null;
    }
    const type = props.property.getType();
    const subtype = props.property.getSubtype();
    // First get the handler by the type
    let registryEntry = props.property.hasSpecificValidValues() ?
        selectHandler :
        handlerRegistry[type];
    if (subtype === null && registryEntry.defaultSubhandler) {
        registryEntry = registryEntry.defaultSubhandler;
    }
    else if (subtype && registryEntry.subhandler && registryEntry.subhandler[subtype]) {
        registryEntry = registryEntry.subhandler[subtype];
    }
    const Element = registryEntry.handler;
    // Build the context and render sending the right props
    return (react_1.default.createElement(renderer_1.RendererContext.Consumer, null, (renderers) => react_1.default.createElement(app_1.LocaleContext.Consumer, null, (locale) => {
        const renderer = props.renderer || renderers[registryEntry.renderer];
        if (registryEntry.includeConfig) {
            return (react_1.default.createElement(config_provider_1.ConfigContext.Consumer, null, (config) => (react_1.default.createElement(Element, Object.assign({}, props, { language: locale.language, i18n: locale.i18n, rtl: locale.rtl, currency: imported_resources_1.currencies[locale.currency] || defaultCurrencyBugCacher(locale.currency), country: imported_resources_1.countries[locale.country] || defaultCountryBugCatcher(locale.country), renderer: renderer, rendererArgs: props.rendererArgs || {}, config: config })))));
        }
        return (react_1.default.createElement(Element, Object.assign({}, props, { language: locale.language, i18n: locale.i18n, rtl: locale.rtl, currency: imported_resources_1.currencies[locale.currency] || defaultCurrencyBugCacher(locale.currency), country: imported_resources_1.countries[locale.country] || defaultCountryBugCatcher(locale.country), renderer: renderer, rendererArgs: props.rendererArgs || {} })));
    })));
}
exports.default = PropertyEntry;
