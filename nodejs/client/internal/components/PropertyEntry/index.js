"use strict";
/**
 * Contains the property entry main component that defines how properties
 * are to be managed within itemize for entry
 * @packageDocumentation
 */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const PropertyEntryBoolean_1 = __importDefault(require("./PropertyEntryBoolean"));
const PropertyEntryText_1 = __importDefault(require("./PropertyEntryText"));
const PropertyEntryDateTime_1 = __importDefault(require("./PropertyEntryDateTime"));
const PropertyEntryLocation_1 = __importDefault(require("./PropertyEntryLocation"));
const PropertyEntryReference_1 = __importDefault(require("./PropertyEntryReference"));
const PropertyEntrySelect_1 = __importDefault(require("./PropertyEntrySelect"));
const PropertyEntryField_1 = __importDefault(require("./PropertyEntryField"));
const PropertyEntryFile_1 = __importDefault(require("./PropertyEntryFile"));
const locale_provider_1 = require("../../providers/locale-provider");
const imported_resources_1 = require("../../../../imported-resources");
const renderer_1 = require("../../../providers/renderer");
const config_provider_1 = require("../../providers/config-provider");
const token_provider_1 = require("../../providers/token-provider");
const ssr_provider_1 = require("../../providers/ssr-provider");
;
/**
 * This represents our standard select subhandler used for
 * selecting when there are specific valid values, a bit of an
 * exception since it works with numbers, text and string
 */
const selectHandler = {
    renderer: "PropertyEntrySelect",
    handler: PropertyEntrySelect_1.default,
};
/**
 * Now we can build or handler registry based on what we have
 * The type registry contains a list of handlers for a given type
 */
const handlerRegistry = {
    string: {
        // The standard field handles string, as it's just a texfield
        renderer: "PropertyEntryField",
        handler: PropertyEntryField_1.default,
    },
    integer: {
        // The standard field also handles integers, as it's written in the same form
        renderer: "PropertyEntryField",
        handler: PropertyEntryField_1.default,
        subhandler: {
            // for the subtype reference we use another whole
            // different handler
            reference: {
                renderer: "PropertyEntryReference",
                handler: PropertyEntryReference_1.default,
                // references need the token and SSR in order
                // to fetch values and assign itself
                // values
                includeTokenDataAndSSR: true,
            },
        },
    },
    number: {
        // The standard field handles numbers as well, as it's just a texfield
        renderer: "PropertyEntryField",
        handler: PropertyEntryField_1.default,
    },
    boolean: {
        // Booleans are expected to be different UI wise, so we use
        // a different renderer
        renderer: "PropertyEntryBoolean",
        handler: PropertyEntryBoolean_1.default,
    },
    text: {
        // Text, both plain and html will use a different subhandler as
        // they are expected to be multiline content; even if one
        // does not qualify as rich text
        renderer: "PropertyEntryText",
        handler: PropertyEntryText_1.default,
        // however if no plain nor html has been specified
        defaultSubhandler: {
            // we use our standard field
            renderer: "PropertyEntryField",
            handler: PropertyEntryField_1.default,
        },
        includeConfig: true,
    },
    currency: {
        // Currency also uses the field renderer as it's
        // basically a glorified number
        renderer: "PropertyEntryField",
        handler: PropertyEntryField_1.default,
    },
    unit: {
        // Same for unit which is also basically a glorified number
        renderer: "PropertyEntryField",
        handler: PropertyEntryField_1.default,
    },
    password: {
        // Password is the same, field
        renderer: "PropertyEntryField",
        handler: PropertyEntryField_1.default,
    },
    year: {
        // Year is just an integer
        renderer: "PropertyEntryField",
        handler: PropertyEntryField_1.default,
    },
    datetime: {
        // Now date, datetime and date have their own
        // renderer as we can have some form of
        // date pickers for them
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
        // location is drastically different as well
        renderer: "PropertyEntryLocation",
        handler: PropertyEntryLocation_1.default,
    },
    file: {
        // and file uses its own renderer as well
        renderer: "PropertyEntryFile",
        handler: PropertyEntryFile_1.default,
        includeConfig: true,
    },
    // TODO
    files: null,
};
/**
 * This function provides a fake country if somehow
 * the code set for the country is invalid, this might happen
 * either because there's a bug in itemize, or because a country
 * was removed from itemize yet the value is stored, this prevents
 * the application from crashing and allows the user to select a new
 * country, this should never happen
 *
 * @param code the country code
 */
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
/**
 * This function provides a fake currency if somehow
 * the code set for the currency is invalid, this might happen
 * either because there's a bug in itemize, or because a currency
 * was removed from itemize yet the value is stored, this prevents
 * the application from crashing and allows the user to select a new
 * currency, this should never happen
 *
 * @param code the currency code
 */
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
/**
 * This represents the main handler, it's used in base.tsx after reading
 * and calculating the properties it needs from the different contexts
 *
 * Being an internal function this should never really be called by the developer
 * they should instead use Entry, which uses the base.tsx file in order to automatically
 * provide most of the properties required
 *
 * @param props
 */
function PropertyEntry(props) {
    if (props.prefillWith) {
        react_1.useEffect(() => {
            props.onChange(props.prefillWith, null);
        }, []);
    }
    // hidden properties simply do not show, we short circuit here
    if (props.state.hidden) {
        return null;
    }
    // now we need the type and subtype of the property itself
    const type = props.property.getType();
    const subtype = props.property.getSubtype();
    // First get the handler by the type
    // so our exception handler, for select, when we have specific valid values
    let registryEntry = props.property.hasSpecificValidValues() ?
        selectHandler :
        handlerRegistry[type];
    // so now we check for subtype handling, if we got no subtype
    // at all, we check if we have a default subhandler
    if (subtype === null && registryEntry.defaultSubhandler) {
        registryEntry = registryEntry.defaultSubhandler;
    }
    else if (subtype && registryEntry.subhandler && registryEntry.subhandler[subtype]) {
        // also check for a specific subtype handler
        registryEntry = registryEntry.subhandler[subtype];
    }
    // now we can get the element that represents the handler
    // we will be working with
    const HandlerElement = registryEntry.handler;
    // Build the context and render sending the right props
    return (react_1.default.createElement(renderer_1.RendererContext.Consumer, null, (renderers) => react_1.default.createElement(locale_provider_1.LocaleContext.Consumer, null, (locale) => {
        // we will always need the renderer and locale context to get this data, first the renderer
        // that we will be using, it could be a fast prototyping one or whatever
        // the developer is using, note how the passed renderer holds priority
        const renderer = props.renderer || renderers[registryEntry.renderer];
        // now we define the props that our handler will be
        // requiring in order to create this environemnt
        // to pass to the renderers
        const nProps = {
            // first all the main handler props go in
            ...props,
            // now these come from our contexts
            language: locale.language,
            i18n: locale.i18n,
            rtl: locale.rtl,
            currency: imported_resources_1.currencies[locale.currency] || defaultCurrencyBugCacher(locale.currency),
            country: imported_resources_1.countries[locale.country] || defaultCountryBugCatcher(locale.country),
            // our new renderer
            renderer,
            // and its args
            rendererArgs: props.rendererArgs || {},
        };
        // so now we should check for the contexts that we need
        if (registryEntry.includeConfig && registryEntry.includeTokenDataAndSSR) {
            // first and foremost the static contexts, then the dynamic
            return (react_1.default.createElement(config_provider_1.ConfigContext.Consumer, null, (config) => (react_1.default.createElement(ssr_provider_1.SSRContext.Consumer, null, (ssr) => (react_1.default.createElement(token_provider_1.TokenContext.Consumer, null, (tokenData) => (react_1.default.createElement(HandlerElement, Object.assign({}, nProps, { tokenData: tokenData, ssr: ssr, config: config })))))))));
        }
        else if (registryEntry.includeConfig) {
            // same here
            return (react_1.default.createElement(config_provider_1.ConfigContext.Consumer, null, (config) => (react_1.default.createElement(HandlerElement, Object.assign({}, nProps, { config: config })))));
        }
        else if (registryEntry.includeTokenDataAndSSR) {
            // and here
            return (react_1.default.createElement(ssr_provider_1.SSRContext.Consumer, null, (ssr) => (react_1.default.createElement(token_provider_1.TokenContext.Consumer, null, (tokenData) => (react_1.default.createElement(HandlerElement, Object.assign({}, nProps, { tokenData: tokenData, ssr: ssr })))))));
        }
        // if we don't need to read anything else from any other context
        // we can do this
        return (react_1.default.createElement(HandlerElement, Object.assign({}, nProps)));
    })));
}
exports.default = PropertyEntry;
