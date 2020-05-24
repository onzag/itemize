"use strict";
/**
 * Contains the string type description
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const sql_1 = require("../sql");
const local_sql_1 = require("../local-sql");
const PropertyDefinition_1 = require("../../PropertyDefinition");
const constants_1 = require("../../../../../../constants");
const search_interfaces_1 = require("../search-interfaces");
const local_search_1 = require("../local-search");
const imported_resources_1 = require("../../../../../../imported-resources");
/**
 * The email regex that is used to validate emails
 */
const EMAIL_REGEX = new RegExp("(?:[a-z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+\\/=?^_`{|}~-]" +
    "+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09" +
    "\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9" +
    "-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]" +
    "|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53" +
    "-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])");
/**
 * Represents characters that are not allowed in identifier types, while this seems a bit arbitrary
 * remember that we try to keep it so that many languages are allowed, this is so usernames in
 * many languages are achievable, D'L things like that and so on, but we want to avoid characters
 * that can be used to build other stuff, and can make for confusing user identifiers
 */
const SPECIAL_CHARACTERS = [" ", "!", "¡", "?", "¿", "@", "#", "$", "£", "%", "/", "\\", "*", "\""];
/**
 * The behaviour of strings is described by this type
 */
const typeValue = {
    gql: graphql_1.GraphQLString,
    // a string is a string
    json: "string",
    sql: sql_1.getStandardSQLFnFor && sql_1.getStandardSQLFnFor("text", null, (subtype, sqlPrefix, id) => {
        if (subtype) {
            return {
                type: "btree",
                id: constants_1.SQL_CONSTRAINT_PREFIX + sqlPrefix + id,
                level: 0,
            };
        }
        return null;
    }),
    sqlIn: sql_1.stardardSQLInFn,
    sqlOut: sql_1.standardSQLOutFn,
    sqlSearch: sql_1.standardSQLSearchFnExactAndRange,
    sqlEqual: sql_1.standardSQLEqualFn,
    sqlLocalEqual: local_sql_1.standardSQLLocalEqualFn,
    sqlMantenience: null,
    localSearch: local_search_1.standardLocalSearchExactAndRange,
    localEqual: local_sql_1.standardLocalEqual,
    nullableDefault: "",
    supportedSubtypes: ["email", "identifier", "locale", "comprehensive-locale", "language", "country", "currency"],
    // validates just the length
    validate: (s, subtype) => {
        if (typeof s !== "string") {
            return PropertyDefinition_1.PropertyInvalidReason.INVALID_VALUE;
        }
        else if (s.length > constants_1.MAX_STRING_LENGTH) {
            return PropertyDefinition_1.PropertyInvalidReason.TOO_LARGE;
        }
        if (subtype === "email" && !EMAIL_REGEX.test(s)) {
            return PropertyDefinition_1.PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
        }
        if (subtype === "identifier") {
            const containsOneOfThose = SPECIAL_CHARACTERS.some((c) => s.indexOf(c) !== -1);
            if (containsOneOfThose) {
                return PropertyDefinition_1.PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
            }
        }
        const isComprehensiveLocale = subtype === "comprehensive-locale";
        if (subtype === "locale" || (isComprehensiveLocale && s.indexOf("-") !== -1)) {
            const splitted = s.split("-");
            const language = splitted[0];
            const country = splitted[1];
            if (!imported_resources_1.countries[country]) {
                return PropertyDefinition_1.PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
                // sadly we can't check whether the language is on the actual supported language list
            }
            else if (language.length !== 2 || language.toLowerCase() !== language) {
                return PropertyDefinition_1.PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
            }
            return null;
        }
        else if (subtype === "language" || (isComprehensiveLocale && s.toLowerCase() === s)) {
            // sadly we can't check whether the language is on the actual supported language list
            if (s.length !== 2 || s.toLowerCase() !== s) {
                return PropertyDefinition_1.PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
            }
            return null;
        }
        else if (subtype === "country" || (isComprehensiveLocale && s.toUpperCase() === s)) {
            if (!imported_resources_1.countries[s]) {
                return PropertyDefinition_1.PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
            }
            return null;
        }
        else if (subtype === "currency") {
            if (!imported_resources_1.currencies[s]) {
                return PropertyDefinition_1.PropertyInvalidReason.INVALID_SUBTYPE_VALUE;
            }
            return null;
        }
        return null;
    },
    // it is searchable by an exact value, use text for organic things
    searchable: true,
    searchInterface: search_interfaces_1.PropertyDefinitionSearchInterfacesType.EXACT,
    allowsMinMaxLengthDefined: true,
    // i18n attributes required
    i18n: {
        base: constants_1.CLASSIC_BASE_I18N,
        optional: constants_1.CLASSIC_OPTIONAL_I18N,
        searchBase: constants_1.CLASSIC_SEARCH_BASE_I18N,
        searchOptional: constants_1.CLASSIC_SEARCH_OPTIONAL_I18N,
        tooLargeErrorInclude: [null, "email", "identifier"],
        invalidSubtypeErrorInclude: true,
    },
};
exports.default = typeValue;
