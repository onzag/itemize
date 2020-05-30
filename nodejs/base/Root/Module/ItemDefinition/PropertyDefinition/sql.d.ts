/**
 * Contains SQL helper functions to be used within the property definition in order
 * to be able to perform searches of them in the database
 *
 * @packageDocumentation
 */
import { PropertyDefinitionSupportedType } from "./types";
import PropertyDefinition from "../PropertyDefinition";
import { ISQLTableRowValue, ISQLTableDefinitionType, ISQLStreamComposedTableRowValue, ISQLTableIndexType } from "../../../sql";
import Knex from "knex";
import ItemDefinition from "..";
import Include from "../Include";
import { IGQLArgs, IGQLValue } from "../../../../../gql-querier";
import pkgcloud from "pkgcloud";
/**
 * Provides the sql function that defines the schema that is used to build
 * the partial table definition
 * @param type the postgresql type
 * @param ext a extension to require for this type
 * @returns a function that returns the partial table definition object with the given type
 */
export declare function getStandardSQLFnFor(type: string, ext?: string, indexCalculator?: (subtype: string, sqlPrefix: string, id: string) => ISQLTableIndexType): (sqlPrefix: string, id: string, property: PropertyDefinition) => ISQLTableDefinitionType;
/**
 * The standard sql in function that specifies how a property inputs its value
 * into a table
 * @param value the value of the property
 * @param sqlPrefix the sql prefix, eg. for Includes
 * @param id the id of the property
 * @returns the partial row value
 */
export declare function stardardSQLInFn(value: PropertyDefinitionSupportedType, sqlPrefix: string, id: string): ISQLTableRowValue;
/**
 * The standard sql in function that inputs its value but
 * uses JSON stringify as a serialization tool
 * @param value the value of the property
 * @param sqlPrefix the sql prefix, eg. for Includes
 * @param id the id of the property
 * @returns the partial row value
 */
export declare function stardardSQLInWithJSONStringifyFn(value: PropertyDefinitionSupportedType, sqlPrefix: string, id: string): ISQLTableRowValue;
/**
 * The standard sql out function that defines
 * how a value for a property is extracted from a given
 * row
 * @param row the entire row value
 * @param sqlPrefix the sql prefix eg. for Includes
 * @param id the property id
 * @returns the property value out
 */
export declare function standardSQLOutFn(row: ISQLTableRowValue, sqlPrefix: string, id: string): PropertyDefinitionSupportedType;
/**
 * The standard sql out function that deserializes values
 * as they are expected to be stored serialized
 * @param row the entire row value
 * @param sqlPrefix the sql prefix eg. for Includes
 * @param id the property id
 */
export declare function standardSQLOutWithJSONParseFn(row: ISQLTableRowValue, sqlPrefix: string, id: string): PropertyDefinitionSupportedType;
/**
 * The standard function that build queries for the property
 * @param args the partial args (if within an include, these are the args within the include)
 * @param sqlPrefix the sql prefix
 * @param id the id of the property
 * @param knexBuilder the query that is being stiched together
 */
export declare function standardSQLSearchFnExactAndRange(args: IGQLArgs, sqlPrefix: string, id: string, knexBuilder: Knex.QueryBuilder): void;
/**
 * The standard function that perfoms equality checks within the database
 * @param value the value of the property
 * @param sqlPrefix the sql prefix used
 * @param id the id of the property
 * @param isCaseInsensitive whether the check is done in a case insensitive way
 * @param knex knex itself
 * @param columnName an optional column name to name this equality check as
 * @returns a knex valid search or select query object
 */
export declare function standardSQLEqualFn(value: PropertyDefinitionSupportedType, sqlPrefix: string, id: string, isCaseInsensitive: boolean, knex: Knex, columnName?: string): Knex.Raw<any> | {
    [x: string]: PropertyDefinitionSupportedType;
};
export declare function standardSQLBtreeIndexable(sqlPrefix: string, id: string): string[];
/**
 * Provides the table bit that is necessary to include this property and
 * this property alone, that is a table bit
 * @param propertyDefinition the property definition in question
 * @param prefix a prefix to prefix the table row names, this is
 * used to prefix item specific properties that are sinked in from
 * the parent in the item
 * @returns the partial sql table definition for the property
 */
export declare function getSQLTableDefinitionForProperty(propertyDefinition: PropertyDefinition, prefix?: string): ISQLTableDefinitionType;
/**
 * Takes row data information that is in the SQL form and converts
 * it into a graphql form, only for this specific property
 * @param propertyDefinition the property definition in question
 * @param row the row that we want to extract information from
 * @param prefix the prefix, if the information happens to be prefixed
 * @returns the graphql value for the property
 */
export declare function convertSQLValueToGQLValueForProperty(propertyDefinition: PropertyDefinition, row: ISQLTableRowValue, prefix?: string): IGQLValue;
/**
 * Converts a graphql value into a sql value, that is graphql data into row
 * data to be immediately added to the database as it is
 * @param itemDefinition the item definition in question
 * @param include an include if exist where the property resides
 * @param propertyDefinition the property definition in question
 * @param data the graphql data
 * @param knex the knex instance
 * @param dictionary the dictionary to use in full text search mode
 * @param prefix the prefix, if we need the SQL values to be prefixed, usually
 * used within items, because item properties need to be prefixed
 * @returns a promise with the partial sql row value to be inputted, note
 * that this is a promise because data streams need to be processed
 */
export declare function convertGQLValueToSQLValueForProperty(itemDefinition: ItemDefinition, include: Include, propertyDefinition: PropertyDefinition, data: IGQLArgs, oldData: IGQLValue, knex: Knex, uploadsContainer: pkgcloud.storage.Container, dictionary: string, prefix: string): ISQLStreamComposedTableRowValue;
/**
 * Builds a sql search query from a given property definition, the data
 * coming from the search module, a sql prefix to use, and the knex builder
 * @param propertyDefinition the property definition in question
 * @param args the args coming from the search module in such format
 * @param sqlPrefix a sql prefix to append say if we refer to an item
 * @param knexBuilder the knex building instance
 */
export declare function buildSQLQueryForProperty(propertyDefinition: PropertyDefinition, args: IGQLArgs, sqlPrefix: string, knexBuilder: Knex.QueryBuilder, dictionary: string): void;
export declare function buildSQLStrSearchQueryForProperty(propertyDefinition: PropertyDefinition, args: IGQLArgs, search: string, sqlPrefix: string, knexBuilder: Knex.QueryBuilder, dictionary: string): void;
