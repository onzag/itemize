"use strict";
/**
 * Contains general utility functions to be used within the itemize app
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const jsdom_1 = require("jsdom");
const dompurify_1 = __importDefault(require("dompurify"));
const constants_1 = require("./constants");
const ItemDefinition_1 = require("./base/Root/Module/ItemDefinition");
const deep_equal_1 = __importDefault(require("deep-equal"));
/**
 * capitalizes a string
 * @param str the string to capitalize
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalize = capitalize;
/**
 * @ignore
 */
const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
/**
 * Escapes a string into a regex
 * @param str the string to escape
 * @returns a string that is regex ready
 */
function escapeStringRegexp(str) {
    return str.replace(matchOperatorsRe, "\\$&");
}
exports.escapeStringRegexp = escapeStringRegexp;
/**
 * @ignore
 */
const mimeExtensions = {
    "audio/aac": "aac",
    "application/x-abiword": "abw",
    "application/x-freearc": "arc",
    "video/x-msvideo": "avi",
    "application/vnd.amazon.ebook": "azw",
    "application/octet-stream": "bin",
    "image/bmp": "bmp",
    "application/x-bzip": "bz",
    "application/x-bzip2": "bz2",
    "application/x-csh": "csh",
    "text/css": "css",
    "text/csv": "csv",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
    "application/vnd.ms-fontobject": "eot",
    "application/epub+zip": "epub",
    "image/gif": "gif",
    "text/html": "html",
    "image/vnd.microsoft.icon": "ico",
    "text/calendar": "ics",
    "application/java-archive": "jar",
    "image/jpeg": "jpg",
    "text/javascript": "js",
    "application/json": "json",
    "application/ld+json": "jsonld",
    "audio/midi audio/x-midi": "mid",
    "audio/mpeg": "mp3",
    "video/mpeg": "mpeg",
    "application/vnd.apple.installer+xml": "mpkg",
    "application/vnd.oasis.opendocument.presentation": "odp",
    "application/vnd.oasis.opendocument.spreadsheet": "ods",
    "application/vnd.oasis.opendocument.text": "odt",
    "audio/ogg": "oga",
    "video/ogg": "ogv",
    "application/ogg": "ogx",
    "font/otf": "otf",
    "image/png": "png",
    "application/pdf": "pdf",
    "application/vnd.ms-powerpoint": "ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx",
    "application/x-rar-compressed": "rar",
    "application/rtf": "rtf",
    "application/x-sh": "sh",
    "image/svg+xml": "svg",
    "application/x-shockwave-flash": "swf",
    "application/x-tar": "tar",
    "image/tiff": "tiff",
    "font/ttf": "ttf",
    "text/plain": "txt",
    "application/vnd.visio": "vsd",
    "audio/wav": "wav",
    "audio/webm": "weba",
    "video/webm": "webm",
    "image/webp": "webp",
    "font/woff": "woff",
    "font/woff2": "woff2",
    "application/xhtml+xml": "xhtml",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
    "application/xml if not readable from casual users (RFC 3023, section 3)": "xml",
    "application/vnd.mozilla.xul+xml": "xul",
    "application/zip": "zip",
    "video/3gpp": "3gp",
    "video/3gpp2": "3g2",
    "application/x-7z-compressed": "7z",
};
/**
 * Converts a mime type to an extension using a known extension list
 * @param str the string that represents the mime type
 * @returns an extension or txt if it doesn't know
 */
function mimeTypeToExtension(str) {
    return mimeExtensions[str] || str.split("/")[1] || "txt";
}
exports.mimeTypeToExtension = mimeTypeToExtension;
/**
 * Replaces a string to another for locale usage
 * eg. `"hello {0} world {1}"` with `["foo", "bar"]` become
 * `"hello foo world bar"`
 * @param str the string
 * @param args the args to pass
 * @returns a string
 */
function localeReplacer(str, ...args) {
    return str.replace(/\{(\d+)\}/g, (match, indexMatch) => (args[indexMatch] || "?"));
}
exports.localeReplacer = localeReplacer;
/**
 * Replaces a string to an array of whatever it was sent
 * for locale usage
 * eg. `"hello {0} world {1}"` with `[<span>foo</span>, <span>bar</span>]` become
 * `["hello ",<span>foo</span>," world ",<span>bar</span>]`
 * @param str the string
 * @param args the args to pass
 * @returns a an array
 */
function localeReplacerToArray(str, ...args) {
    const splitted = str.split(/\{(\d+)\}/g);
    const result = [];
    splitted.forEach((splitResult, index) => {
        if (!splitResult) {
            return;
        }
        if (index % 2 === 1) {
            if (typeof args[splitResult] !== "undefined") {
                result.push(args[splitResult]);
            }
            else {
                result.push("?");
            }
        }
        else {
            result.push(splitResult);
        }
    });
    return result;
}
exports.localeReplacerToArray = localeReplacerToArray;
/**
 * gets the actual format given a string format
 * this is basically only used to avoid inconsistencies
 * regarding input to create a mask, and it only happens with
 * time basically, but here we can override masks
 * @param value the format string
 * @returns the normalized form
 */
function getNormalizedDateTimeFormat(value) {
    // Since we cannot have a mask that uses only one H
    // we need to return it with two, same for the second
    // we canot have a one or two digits situation
    if (value === "H:mm") {
        return "HH:mm";
    }
    else if (value === "h:mm A") {
        return "hh:mm A";
    }
    // any other value is tipically allowed
    return value;
}
exports.getNormalizedDateTimeFormat = getNormalizedDateTimeFormat;
/**
 * TODO looks wrong check what is wrong
 */
function getLocalizedTimeFormat(normalize) {
    const LT = moment_1.default.localeData()._longDateFormat.LT;
    if (!normalize) {
        return LT;
    }
    return LT;
}
exports.getLocalizedTimeFormat = getLocalizedTimeFormat;
/**
 * TODO looks wrong check what is wrong
 */
function getLocalizedDateFormat(normalize) {
    const L = moment_1.default.localeData()._longDateFormat.L;
    if (!normalize) {
        return L;
    }
    return getNormalizedDateTimeFormat(L);
}
exports.getLocalizedDateFormat = getLocalizedDateFormat;
/**
 * TODO looks wrong check what is wrong
 */
function getLocalizedDateTimeFormat(normalize) {
    return getLocalizedDateFormat(normalize) + " " + getLocalizedTimeFormat(normalize);
}
exports.getLocalizedDateTimeFormat = getLocalizedDateTimeFormat;
/**
 * Provides the fields and args for an item definition in order
 * to create a query
 * @param options.includeArgs whether to include the args at all
 * @param options.includeFields whether to include fields at all
 * @param options.onlyIncludeProperties what properties to include in fields
 * @param options.onlyIncludeIncludes what includes to include in the fields
 * @param options.onlyIncludePropertiesForArgs what properties to include in args
 * @param options.onlyIncludeIncludesForArgs what includes to include in args
 * @param options.onlyIncludeArgsIfDiffersFromAppliedValue only includes something in args if it differs from the
 * applied value
 * @param appliedOwner the owner that owns this item
 * @param userRole the role of the user
 * @param userId the id of the user
 * @param itemDefinitionInstance the item definition
 * @param forId the slot id if any
 * @param forVersion the version if any
 */
function getFieldsAndArgs(options) {
    // so the requested fields, at base, it's just nothing
    const requestFields = {
        DATA: {},
    };
    // and these would be the arguments for the graphql query
    const argumentsForQuery = {};
    // now we go for the standard fields, and we add all of them
    constants_1.STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((p) => {
        requestFields.DATA[p] = {};
    });
    // we add the external ones as well
    constants_1.EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((p) => {
        requestFields[p] = {};
    });
    const moderationRoles = options.itemDefinitionInstance.getRolesWithModerationAccess();
    const canReadModerationFields = moderationRoles.includes(constants_1.ANYONE_METAROLE) ||
        (moderationRoles.includes(constants_1.ANYONE_LOGGED_METAROLE) && options.userRole !== constants_1.GUEST_METAROLE) ||
        moderationRoles.includes(options.userRole);
    // and if our role allows it, we add the moderation fields
    if (canReadModerationFields) {
        constants_1.MODERATION_FIELDS.forEach((mf) => {
            requestFields.DATA[mf] = {};
        });
    }
    // we get the applied owner of this item, basically what we have loaded
    // for this user created_by or id if the item is marked as if its id
    // is the owner, in the case of null, the applied owner is -1
    const appliedOwner = options.appliedOwner || options.itemDefinitionInstance.getAppliedValueOwnerIfAny(options.forId || null, options.forVersion || null);
    // Now we get all the property definitions and extensions for the item
    // you might wonder why we check role access one by one and not the total
    // well, we literally don't care, the developer is reponsible to deny this
    // to get here, we are just building a query, not preventing a submit
    options.itemDefinitionInstance.getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
        // now how we tell if it should be included in fields, well first
        // are we including fields at all? well if yes, then are we specifying
        // specific properties that should be included or are we taking all
        // if taking all it depends on the rules, and the role access
        const shouldBeIncludedInFields = options.includeFields ? (options.onlyIncludeProperties ?
            options.onlyIncludeProperties.includes(pd.getId()) :
            (!pd.isRetrievalDisabled() && pd.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, options.userRole, options.userId, appliedOwner, false))) : false;
        // so if all that messy conditional passes
        if (shouldBeIncludedInFields) {
            // we add it to the fields we want to add
            // because it's a property it goes in data
            requestFields.DATA[pd.getId()] = pd.getRequestFields();
        }
        // now for the arguments, same rule
        // are we including arguments at all?
        // are we specifying which specific arguments?
        // otherwise use the role access for it
        const shouldBeIncludedInArgs = options.includeArgs ? (options.onlyIncludePropertiesForArgs ?
            options.onlyIncludePropertiesForArgs.includes(pd.getId()) :
            pd.checkRoleAccessFor(!options.forId ? ItemDefinition_1.ItemDefinitionIOActions.CREATE : ItemDefinition_1.ItemDefinitionIOActions.EDIT, options.userRole, options.userId, appliedOwner, false)) : false;
        // now we check if we have the option to only include those that differ
        // from the applied value
        if (shouldBeIncludedInArgs && options && options.onlyIncludeArgsIfDiffersFromAppliedValue) {
            // we get the current applied value, if any
            const currentAppliedValue = options.itemDefinitionInstance.getGQLAppliedValue(options.forId || null, options.forVersion || null);
            // if there is an applied value for that property
            if (currentAppliedValue && typeof currentAppliedValue.flattenedValue[pd.getId()] !== "undefined") {
                const currentValue = pd.getCurrentValue(options.forId || null, options.forVersion || null);
                // let's check if it's differ from what we have in the state
                const doesNotDifferFromAppliedValue = deep_equal_1.default(currentAppliedValue.flattenedValue[pd.getId()], currentValue);
                // if it does not differ, then it is added note how we only add
                // if there is an applied value
                if (!doesNotDifferFromAppliedValue) {
                    argumentsForQuery[pd.getId()] = currentValue;
                }
            }
            else {
                // otherwise if there is no applied value, we consider the applied value
                // to be null
                const currentValue = pd.getCurrentValue(options.forId || null, options.forVersion || null);
                const doesNotDifferFromAppliedValue = currentValue === null;
                if (!doesNotDifferFromAppliedValue) {
                    argumentsForQuery[pd.getId()] = currentValue;
                }
            }
        }
        else if (shouldBeIncludedInArgs) {
            argumentsForQuery[pd.getId()] = pd.getCurrentValue(options.forId || null, options.forVersion || null);
        }
    });
    // now we go for the items
    options.itemDefinitionInstance.getAllIncludes().forEach((include) => {
        // and now we get the qualified identifier that grapqhl expects
        const qualifiedId = include.getQualifiedIdentifier();
        if (options.includeFields) {
            // items are always expected to have a value
            requestFields.DATA[include.getQualifiedExclusionStateIdentifier()] = {};
            requestFields.DATA[qualifiedId] = {};
        }
        if (options.includeArgs) {
            // we set the exclusion state we expect, it might be a ternary as well
            // like in search mode
            argumentsForQuery[include.getQualifiedExclusionStateIdentifier()] = include.getExclusionState(options.forId || null, options.forVersion || null);
            // we add it to the data, and we add it to the arguments
            argumentsForQuery[qualifiedId] = {};
        }
        // now the conditional for whether we need to have that item properties in the arg
        const includeShouldBeIncludedInArgs = options.includeArgs ? (options.onlyIncludeIncludesForArgs ?
            options.onlyIncludeIncludesForArgs.includes(include.getId()) :
            true) : false;
        // and for the fields
        const includeShouldBeIncludedInFields = options.includeFields ? (options.onlyIncludeIncludes ?
            options.onlyIncludeIncludes.includes(include.getId()) :
            true) : false;
        if (!includeShouldBeIncludedInArgs && !includeShouldBeIncludedInFields) {
            // if we don't we can just skip
            return;
        }
        // otherwise we need the sinking properties
        // as only the sinking properties manage
        include.getSinkingProperties().forEach((sp) => {
            // we always check for role access and whether we can retrieve it or not
            if (includeShouldBeIncludedInFields &&
                !sp.isRetrievalDisabled() &&
                sp.checkRoleAccessFor(ItemDefinition_1.ItemDefinitionIOActions.READ, options.userRole, options.userId, appliedOwner, false)) {
                requestFields.DATA[qualifiedId][include.getPrefixedQualifiedIdentifier() + sp.getId()] = sp.getRequestFields();
            }
            const hasRoleAccessToIncludeProperty = sp.checkRoleAccessFor(!options.forId ? ItemDefinition_1.ItemDefinitionIOActions.CREATE : ItemDefinition_1.ItemDefinitionIOActions.EDIT, options.userRole, options.userId, appliedOwner, false);
            if (includeShouldBeIncludedInArgs && hasRoleAccessToIncludeProperty &&
                options && options.onlyIncludeArgsIfDiffersFromAppliedValue) {
                // we get the current applied value, if any
                const currentAppliedValue = options.itemDefinitionInstance.getGQLAppliedValue(options.forId || null, options.forVersion || null);
                // if there is an applied value for that property
                if (currentAppliedValue && currentAppliedValue.flattenedValue[include.getQualifiedIdentifier()]) {
                    const includeAppliedValue = currentAppliedValue.flattenedValue[include.getQualifiedIdentifier()];
                    const currentValue = sp.getCurrentValue(options.forId || null, options.forVersion || null);
                    if (typeof includeAppliedValue[sp.getId()] !== "undefined") {
                        // let's check if it's differ from what we have in the state
                        const doesNotDifferFromAppliedValue = deep_equal_1.default(includeAppliedValue[sp.getId()], currentValue);
                        // so we only add if it differs note how we are only adding it
                        // if there is an applied value
                        if (!doesNotDifferFromAppliedValue) {
                            argumentsForQuery[qualifiedId][sp.getId()] = currentValue;
                        }
                    }
                }
            }
            else if (includeShouldBeIncludedInArgs && hasRoleAccessToIncludeProperty) {
                argumentsForQuery[qualifiedId][sp.getId()] = sp.getCurrentValue(options.forId || null, options.forVersion || null);
            }
        });
        if (Object.keys(requestFields.DATA[qualifiedId]).length === 0) {
            delete requestFields.DATA[qualifiedId];
        }
        if (Object.keys(argumentsForQuery[qualifiedId]).length === 0) {
            delete argumentsForQuery[qualifiedId];
        }
    });
    return { requestFields, argumentsForQuery };
}
exports.getFieldsAndArgs = getFieldsAndArgs;
exports.DOMWindow = jsdom_1.JSDOM ? (new jsdom_1.JSDOM("")).window : window;
exports.DOMPurify = dompurify_1.default(exports.DOMWindow);
