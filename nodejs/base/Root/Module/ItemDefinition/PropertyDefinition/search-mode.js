"use strict";
/**
 * Builds the search mode of a property definition that is used within
 * the search module for used within searches, basically this is an alternative
 * item definition and alternative property that is used during searches
 *
 * @packageDocumentation
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildSearchModePropertyDefinitions = exports.getConversionIds = void 0;
const _1 = __importStar(require("."));
const search_interfaces_1 = require("./search-interfaces");
const search_mode_1 = require("../ConditionalRuleSet/search-mode");
/**
 * Provides all the ids that a property would be referred to in search mode
 * @param rawData the raw property
 * @returns an array of string for the ids in search mode for the property
 */
function getConversionIds(rawData) {
    // we need the description
    const propertyDefinitionDescription = _1.default.supportedTypesStandard[rawData.type];
    if (!propertyDefinitionDescription.searchable ||
        (typeof rawData.searchable !== "undefined" &&
            !rawData.searchable)) {
        // return empty array if it's not searchable or search level is disabled
        return [];
    }
    // we get the ids, check out how `buildSearchModePropertyDefinitions` does
    // this literally reflects that
    let ids = [rawData.id];
    if (propertyDefinitionDescription.searchInterface ===
        search_interfaces_1.PropertyDefinitionSearchInterfacesType.EXACT) {
        ids = [search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + rawData.id];
    }
    else if (propertyDefinitionDescription.searchInterface ===
        search_interfaces_1.PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE) {
        if (rawData.disableRangedSearch || (rawData.type === "integer" && rawData.subtype === "reference")) {
            ids = [search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + rawData.id];
        }
        else {
            ids = [
                search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.FROM + rawData.id,
                search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.TO + rawData.id,
            ];
        }
    }
    else if (propertyDefinitionDescription.searchInterface ===
        search_interfaces_1.PropertyDefinitionSearchInterfacesType.TEXT) {
        ids = [search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.SEARCH + rawData.id];
    }
    else if (propertyDefinitionDescription.searchInterface ===
        search_interfaces_1.PropertyDefinitionSearchInterfacesType.LOCATION_RADIUS) {
        ids = [
            search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.LOCATION + rawData.id,
            search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.RADIUS + rawData.id,
        ];
    }
    return ids;
}
exports.getConversionIds = getConversionIds;
/**
 * Builds a property definition to its search mode
 * @param rawData the raw property definition source
 * @param otherKnownProperties the object with the other known properties that this one can see
 * @returns an array of property definitions
 */
function buildSearchModePropertyDefinitions(rawData, otherKnownProperties) {
    // so we need the description from the standard
    const propertyDefinitionDescription = _1.default.supportedTypesStandard[rawData.type];
    // if it's not searchable by definition, or the search level is set to disabled, we return an empty array
    if (!propertyDefinitionDescription.searchable ||
        (typeof rawData.searchable !== "undefined" &&
            !rawData.searchable)) {
        return [];
    }
    // we create the new property definition via copy
    const newPropDef = { ...rawData };
    newPropDef.nullable = true;
    // Disable search level for any of its children
    // Just because this is the search level it doesn't make
    // sense to go deeper
    newPropDef.searchable = false;
    if (newPropDef.type === "text") {
        newPropDef.type = "string";
    }
    if (typeof newPropDef.searchDefault !== "undefined") {
        newPropDef.default = newPropDef.searchDefault;
    }
    // the default if condition, we need to process
    if (newPropDef.searchDefaultIf || newPropDef.defaultIf) {
        // so since it has values and conditions (and the value is raw)
        newPropDef.defaultIf = (newPropDef.searchDefaultIf || newPropDef.defaultIf).map((di) => {
            return {
                value: di.value,
                if: search_mode_1.buildSearchModeConditionalRuleSet(di.if, otherKnownProperties),
            };
        }).filter((di) => di.if);
        // if we end up with nothing, we delete it, some conditions might be dead ends
        // for example if a property is not searchable and the condition uses that property
        // it completely kills the condition
        if (!newPropDef.defaultIf.length) {
            delete newPropDef.defaultIf;
        }
    }
    // we do that too with enforced values, same process
    if (newPropDef.enforcedValues) {
        newPropDef.enforcedValues = newPropDef.enforcedValues.map((ev) => {
            return {
                value: ev.value,
                if: search_mode_1.buildSearchModeConditionalRuleSet(ev.if, otherKnownProperties),
            };
        }).filter((ev) => ev.if);
        if (!newPropDef.enforcedValues.length) {
            delete newPropDef.enforcedValues;
        }
    }
    if (typeof newPropDef.searchHidden !== "undefined") {
        newPropDef.hidden = newPropDef.searchHidden;
    }
    // also with hidden if, kinda, since it's a single condition
    if (newPropDef.searchHiddenIf || newPropDef.hiddenIf) {
        newPropDef.hiddenIf = search_mode_1.buildSearchModeConditionalRuleSet(newPropDef.searchHiddenIf || newPropDef.hiddenIf, otherKnownProperties);
        if (!newPropDef.hiddenIf) {
            delete newPropDef.hiddenIf;
        }
    }
    // invalid if gets the same treatment
    if (newPropDef.searchInvalidIf || newPropDef.invalidIf) {
        newPropDef.invalidIf = (newPropDef.searchInvalidIf || newPropDef.invalidIf).map((ii) => {
            return {
                error: ii.error,
                if: search_mode_1.buildSearchModeConditionalRuleSet(ii.if, otherKnownProperties),
            };
        }).filter((ii) => ii.if);
        if (!newPropDef.invalidIf.length) {
            delete newPropDef.invalidIf;
        }
    }
    // Ok so now we have our main property processed, but that's not enough
    // we need to work out a secondary property if it's necessary, we create it
    // and set it to null to start with
    let newPropDef2 = null;
    // so if our search interface is exact, then we actually don't need 2
    if (propertyDefinitionDescription.searchInterface ===
        search_interfaces_1.PropertyDefinitionSearchInterfacesType.EXACT) {
        // we set the original id to EXACT
        newPropDef.id = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + newPropDef.id;
        // and extract and displace the i18ndata from the search (everything in search becomes main)
        if (newPropDef.i18nData) {
            newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
        }
        // Now here if we have exact and range
    }
    else if (propertyDefinitionDescription.searchInterface ===
        search_interfaces_1.PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE) {
        // with disable ranged search we basically do the same as exact on top
        if (rawData.disableRangedSearch || (rawData.type === "integer" && rawData.subtype === "reference")) {
            newPropDef.id = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.EXACT + newPropDef.id;
            if (newPropDef.i18nData) {
                newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
            }
            // Otherwise we need the secondary, for the range
        }
        else {
            // we make a copy of the original
            newPropDef2 = { ...newPropDef };
            // delete its default, as only the original gets a default
            delete newPropDef2.default;
            delete newPropDef2.defaultIf;
            // set the ids, as FROM and TO
            newPropDef.id = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.FROM + newPropDef.id;
            newPropDef2.id = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.TO + newPropDef2.id;
            // set the comparison method as datetime if its one of those kinds
            const method = rawData.type === "date" || rawData.type === "datetime" || rawData.type === "time" ?
                "datetime" : null;
            // and set the attribute to value if we have currency type
            const attribute = rawData.type === "currency" ? "value" : null;
            // the condition goes if the FROM is greater than the TO
            const newPropDefInvalidIfRule = {
                property: "&this",
                comparator: "greater-than",
                value: {
                    property: newPropDef2.id,
                },
            };
            // we use the method if we got one
            if (method) {
                newPropDefInvalidIfRule.method = method;
            }
            // and we set the attribute if we got one, note it goes for both
            // the property itself and the value result, as they are both of the same type
            if (attribute) {
                newPropDefInvalidIfRule.attribute = attribute;
                newPropDefInvalidIfRule.valueAttribute = attribute;
            }
            // we need some invalid conditions we are adding to the invalid if set
            newPropDef.invalidIf = newPropDef.invalidIf || [];
            newPropDef.invalidIf.push({
                error: _1.PropertyInvalidReason.FROM_LARGER_THAN_TO,
                if: newPropDefInvalidIfRule,
            });
            // now we do the same but in reverse, this time for the second
            newPropDef2.invalidIf = newPropDef2.invalidIf || [];
            const newPropDef2InvalidIfRule = {
                property: "&this",
                comparator: "less-than",
                value: {
                    property: newPropDef.id,
                },
            };
            if (method) {
                newPropDef2InvalidIfRule.method = method;
            }
            if (attribute) {
                newPropDef2InvalidIfRule.attribute = attribute;
                newPropDef2InvalidIfRule.valueAttribute = attribute;
            }
            newPropDef2.invalidIf.push({
                error: _1.PropertyInvalidReason.TO_SMALLER_THAN_FROM,
                if: newPropDef2InvalidIfRule,
            });
            // now we displace the i18ndata from the search.range.from
            if (newPropDef.i18nData) {
                newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search", "range", "from"]);
            }
            // and the search.range.to
            if (newPropDef2.i18nData) {
                newPropDef2.i18nData = displaceI18NData(newPropDef2.i18nData, ["search", "range", "to"]);
            }
        }
        // Full text search is similar to the exact mode, except it uses SEARCH as the handle
    }
    else if (propertyDefinitionDescription.searchInterface ===
        search_interfaces_1.PropertyDefinitionSearchInterfacesType.TEXT) {
        newPropDef.id = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.SEARCH + newPropDef.id;
        if (newPropDef.i18nData) {
            newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
        }
        // location radius is fancy
    }
    else if (propertyDefinitionDescription.searchInterface ===
        search_interfaces_1.PropertyDefinitionSearchInterfacesType.LOCATION_RADIUS) {
        // our second property definition is totally brand new
        // and it's an unit, of subtype lenght, id RADIUS handle,
        // the minimum is 1, without decimals, and we set the special
        // properties to set how it would behave, notice how it supports
        // imperials, it initially prefills to 100, so 100km or 100mi
        // it ignores conversion as it's the prefill,
        // it locks units only to mi and km, so you cannot choose some
        // other lenght types
        newPropDef2 = {
            type: "unit",
            subtype: "length",
            id: search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.RADIUS + newPropDef.id,
            min: 1,
            maxDecimalCount: 2,
            max: (newPropDef.specialProperties && newPropDef.specialProperties["maxSearchRadius"]) || 1000,
            specialProperties: {
                unit: (newPropDef.specialProperties && newPropDef.specialProperties["searchRadiusUnit"]) || "km",
                imperialUnit: (newPropDef.specialProperties && newPropDef.specialProperties["searchRadiusImperialUnit"]) || "mi",
                lockUnitsToPrimaries: true,
                initialPrefill: (newPropDef.specialProperties && newPropDef.specialProperties["searchRadiusInitialPrefill"]) || 100,
            },
            nullable: true,
            invalidIf: [
                {
                    error: _1.PropertyInvalidReason.MUST_BE_SPECIFIED,
                    if: {
                        property: "&this",
                        comparator: "equals",
                        value: {
                            exactValue: null,
                        },
                        gate: "and",
                        condition: {
                            property: search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.LOCATION + newPropDef.id,
                            comparator: "not-equal",
                            value: {
                                exactValue: null,
                            },
                        },
                    },
                }
            ],
            i18nData: displaceI18NData(newPropDef.i18nData, ["search", "radius"], (i18nData) => {
                return {
                    error: {
                        MUST_BE_SPECIFIED: i18nData.error && i18nData.error.RADIUS_MUST_BE_SPECIFIED,
                        TOO_LARGE: i18nData.error && i18nData.error.RADIUS_TOO_LARGE,
                        TOO_SMALL: i18nData.error && i18nData.error.RADIUS_TOO_SMALL,
                        TOO_MANY_DECIMALS: i18nData.error && i18nData.error.RADIUS_TOO_MANY_DECIMALS,
                        INVALID_VALUE: i18nData.error && i18nData.error.RADIUS_INVALID_VALUE,
                    },
                };
            }),
        };
        if (newPropDef.hidden) {
            newPropDef2.hidden = true;
        }
        if (newPropDef.hiddenIf) {
            newPropDef2.hiddenIf = newPropDef.hiddenIf;
        }
        // decorate the default property
        newPropDef.id = search_interfaces_1.PropertyDefinitionSearchInterfacesPrefixes.LOCATION + newPropDef.id;
        if (newPropDef.i18nData) {
            newPropDef.i18nData = displaceI18NData(newPropDef.i18nData, ["search"]);
        }
    }
    // we return both if we have both
    if (newPropDef2) {
        return [newPropDef, newPropDef2];
    }
    // or only one
    return [newPropDef];
}
exports.buildSearchModePropertyDefinitions = buildSearchModePropertyDefinitions;
/**
 * An utility to displace data from the i18n object, any
 * @param i18n the i18n object
 * @param path the path we want to displace data from
 * @returns the new i18n object with data overwritten
 */
function displaceI18NData(i18n, path, callback) {
    // make a copy
    const newI18n = { ...i18n };
    // for each language we are supporting there
    Object.keys(newI18n).forEach((language) => {
        // we make a copy
        newI18n[language] = { ...newI18n[language] };
        // now we loop inside the path
        let itemInQuestion = newI18n[language];
        path.forEach((pbit) => {
            itemInQuestion = itemInQuestion[pbit];
        });
        if (callback) {
            Object.assign(newI18n[language], callback(newI18n[language] || {}));
        }
        // we everything from the loop result
        // note how we check whether it exists, the reason for this is that prop extensions
        // which always build its search mode form might not have this data during the building process
        // in which case it is left as undefined
        if (itemInQuestion) {
            Object.keys(itemInQuestion).forEach((key) => {
                newI18n[language][key] = itemInQuestion[key];
            });
        }
    });
    // return that
    return newI18n;
}
