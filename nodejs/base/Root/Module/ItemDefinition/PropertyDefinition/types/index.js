"use strict";
/**
 * Contains all the supported types within the standard specification of itemize
 * some mild checkers just in case as well as the types that are used within
 * typescript, this file acts as a registry of sorts
 *
 * @packageDocumentation
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boolean_1 = __importDefault(require("./boolean"));
const number_1 = __importDefault(require("./number"));
const string_1 = __importDefault(require("./string"));
const integer_1 = __importDefault(require("./integer"));
const currency_1 = __importDefault(require("./currency"));
const unit_1 = __importDefault(require("./unit"));
const password_1 = __importDefault(require("./password"));
const text_1 = __importDefault(require("./text"));
const date_1 = __importDefault(require("./date"));
const datetime_1 = __importDefault(require("./datetime"));
const time_1 = __importDefault(require("./time"));
const location_1 = __importDefault(require("./location"));
const files_1 = __importDefault(require("./files"));
const year_1 = __importDefault(require("./year"));
const search_interfaces_1 = require("../search-interfaces");
/**
 * The standard definition and registry of all types in itemize
 */
const supportedTypesStandard = {
    boolean: boolean_1.default,
    integer: integer_1.default,
    number: number_1.default,
    currency: currency_1.default,
    unit: unit_1.default,
    string: string_1.default,
    password: password_1.default,
    text: text_1.default,
    year: year_1.default,
    date: date_1.default,
    time: time_1.default,
    datetime: datetime_1.default,
    location: location_1.default,
    files: files_1.default,
};
// Checking that the property descriptions are right
Object.keys(supportedTypesStandard).forEach((propDefKey) => {
    // we loop over each one of them
    const propDef = supportedTypesStandard[propDefKey];
    // if it's not searchable, but we provide requests for search i18n data
    if (!propDef.searchable &&
        (propDef.i18n.searchBase || propDef.i18n.searchOptional ||
            propDef.i18n.searchRange || propDef.i18n.searchRangeOptional)) {
        throw new Error("Invalid propdef with search data for non-searchable > " +
            propDefKey);
        // if it's searchable, but we provide no requests for search i18n data
    }
    else if (propDef.searchable) {
        if (!propDef.i18n.searchBase || !propDef.i18n.searchOptional) {
            throw new Error("Invalid propdef lacking search data while searchable > " +
                propDefKey);
        }
        else if (propDef.searchInterface ===
            search_interfaces_1.PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE &&
            (!propDef.i18n.searchRange || !propDef.i18n.searchRangeOptional)) {
            throw new Error("Invalid propdef lacking ranged search " +
                "data while ranged searchable > " + propDefKey);
        }
    }
});
exports.default = supportedTypesStandard;
