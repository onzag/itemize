"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const app_1 = require("../../app");
const imported_resources_1 = require("../../../../imported-resources");
const renderer_1 = require("../../../providers/renderer");
const PropertyViewSimple_1 = require("./PropertyViewSimple");
const PropertyViewText_1 = __importDefault(require("./PropertyViewText"));
const PropertyViewFile_1 = __importDefault(require("./PropertyViewFile"));
const config_provider_1 = require("../../providers/config-provider");
const PropertyViewBoolean_1 = require("./PropertyViewBoolean");
const PropertyViewDateTime_1 = require("./PropertyViewDateTime");
const PropertyViewLocation_1 = require("./PropertyViewLocation");
;
const handlerRegistry = {
    string: {
        renderer: "PropertyViewSimple",
        handler: PropertyViewSimple_1.PropertyViewSimple,
    },
    integer: {
        renderer: "PropertyViewSimple",
        handler: PropertyViewSimple_1.PropertyViewSimple,
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
    },
    currency: null,
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
    files: null,
};
function RawBasePropertyView(props) {
    // Build the context and render sending the right props
    return (react_1.default.createElement(renderer_1.RendererContext.Consumer, null, (renderers) => react_1.default.createElement(app_1.LocaleContext.Consumer, null, (locale) => {
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
            }, language: locale.language, i18n: locale.i18n, rtl: locale.rtl, currency: imported_resources_1.currencies[locale.currency], country: imported_resources_1.countries[locale.country], renderer: renderer, rendererArgs: props.rendererArgs || {} }));
    })));
}
exports.RawBasePropertyView = RawBasePropertyView;
function PropertyView(props) {
    if (props.state.hidden) {
        return null;
    }
    // First get the handler by the type
    const registryEntry = handlerRegistry[props.property.getType()];
    const Element = registryEntry.handler;
    // Build the context and render sending the right props
    return (react_1.default.createElement(renderer_1.RendererContext.Consumer, null, (renderers) => react_1.default.createElement(app_1.LocaleContext.Consumer, null, (locale) => {
        const renderer = props.renderer || renderers[registryEntry.renderer];
        if (registryEntry.includeConfig) {
            return react_1.default.createElement(config_provider_1.ConfigContext.Consumer, null, (config) => (react_1.default.createElement(Element, Object.assign({}, props, { language: locale.language, i18n: locale.i18n, rtl: locale.rtl, currency: imported_resources_1.currencies[locale.currency], country: imported_resources_1.countries[locale.country], renderer: renderer, rendererArgs: props.rendererArgs || {}, config: config }))));
        }
        return (react_1.default.createElement(Element, Object.assign({}, props, { language: locale.language, i18n: locale.i18n, rtl: locale.rtl, currency: imported_resources_1.currencies[locale.currency], country: imported_resources_1.countries[locale.country], renderer: renderer, rendererArgs: props.rendererArgs || {} })));
    })));
}
exports.default = PropertyView;
