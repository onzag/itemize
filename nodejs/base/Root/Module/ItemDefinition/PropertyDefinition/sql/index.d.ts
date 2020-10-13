/**
 * Contains SQL helper functions to be used within the property definition in order
 * to be able to perform searches of them in the database
 *
 * @packageDocumentation
 */
import { PropertyDefinitionSupportedType, ISQLArgInfo, ISQLInInfo, ISQLOutInfo, ISQLSearchInfo, ISQLEqualInfo, ISQLBtreeIndexableInfo, ISQLOrderByInfo } from "../types";
import PropertyDefinition from "../../PropertyDefinition";
import { ISQLTableRowValue, ISQLTableDefinitionType, ISQLStreamComposedTableRowValue, ISQLTableIndexType } from "../../../../sql";
import Knex from "knex";
import ItemDefinition from "../..";
import Include from "../../Include";
import { IGQLArgs, IGQLValue } from "../../../../../../gql-querier";
import Module from "../../..";
import { CloudClient } from "../../../../../../server/cloud";
/**
 * Provides the sql function that defines the schema that is used to build
 * the partial table definition
 * @param type the postgresql type
 * @param ext a extension to require for this type
 * @param indexCalculator an function to decide how to build an index for this type
 * @returns a function that returns the partial table definition object with the given type
 */
export declare function getStandardSQLFnFor(type: string, ext?: string, indexCalculator?: (subtype: string, sqlPrefix: string, id: string) => ISQLTableIndexType): (arg: ISQLArgInfo) => ISQLTableDefinitionType;
/**
 * the standard order by functionality
 * @param arg the orer by info arg
 * @returns an array of string with the order by
 */
export declare function standardSQLOrderBy(arg: ISQLOrderByInfo): [string, string, string];
/**
 * The standard sql in function that specifies how a property inputs its value
 * into a table
 * @param arg the in arg
 * @returns the partial row value
 */
export declare function stardardSQLInFn(arg: ISQLInInfo): ISQLTableRowValue;
/**
 * The standard sql in function that inputs its value but
 * uses JSON stringify as a serialization tool
 * @param arg the in arg
 * @returns the partial row value
 */
export declare function stardardSQLInWithJSONStringifyFn(arg: ISQLInInfo): ISQLTableRowValue;
/**
 * The standard sql out function that defines
 * how a value for a property is extracted from a given
 * row
 * @param arg the out arg info
 * @returns the property value out
 */
export declare function standardSQLOutFn(arg: ISQLOutInfo): PropertyDefinitionSupportedType;
/**
 * The standard sql out function that deserializes values
 * as they are expected to be stored serialized
 * @param arg the sql out info arg
 * @returns the supported type json parsed
 */
export declare function standardSQLOutWithJSONParseFn(arg: ISQLOutInfo): PropertyDefinitionSupportedType;
/**
 * The standard function that build queries for the property
 * @param arg the search info arg
 * @returns a boolean on whether it was searched by it
 */
export declare function standardSQLSearchFnExactAndRange(arg: ISQLSearchInfo): boolean;
/**
 * The standard function that perfoms equality checks within the database
 * @param arg the equal info arg
 * @returns a knex valid search or select query object
 */
export declare function standardSQLEqualFn(arg: ISQLEqualInfo): Knex.Raw<any> | {
    [x: string]: PropertyDefinitionSupportedType;
};
/**
 * The standard btree indexable column builder
 * @param arg the sql btree indexable arg
 * @returns an array of the columns to index
 */
export declare function standardSQLBtreeIndexable(arg: ISQLBtreeIndexableInfo): string[];
/**
 * Provides the table bit that is necessary to include this property and
 * this property alone, that is a table bit
 * @param knex the knex instance
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @returns the partial sql table definition for the property
 */
export declare function getSQLTableDefinitionForProperty(knex: Knex, itemDefinition: ItemDefinition, include: Include, propertyDefinition: PropertyDefinition): ISQLTableDefinitionType;
/**
 * Takes row data information that is in the SQL form and converts
 * it into a graphql form, only for this specific property
 * @param knex the knex instance
 * @param serverData the server data
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param row the row that we want to extract information from
 * @returns the graphql value for the property
 */
export declare function convertSQLValueToGQLValueForProperty(knex: Knex, serverData: any, itemDefinition: ItemDefinition, include: Include, propertyDefinition: PropertyDefinition, row: ISQLTableRowValue): IGQLValue;
/**
 * Converts a graphql value into a sql value, that is graphql data into row
 * data to be immediately added to the database as it is
 * @param knex the knex instance
 * @param serverData the server data
 * @param mod the module
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param data the graphql data
 * @param oldData the old graphql data
 * @param uploadsContainer the uploads container that is to be used (to manage files)
 * @param uploadsPrefix the uploads prefix of such container
 * @param dictionary the dictionary to use in full text search mode
 * @returns a composed value with a partial row value and the consume streams functionality
 * included in it
 */
export declare function convertGQLValueToSQLValueForProperty(knex: Knex, serverData: any, mod: Module, itemDefinition: ItemDefinition, include: Include, propertyDefinition: PropertyDefinition, data: IGQLArgs, oldData: IGQLValue, uploadsClient: CloudClient, domain: string, dictionary: string): ISQLStreamComposedTableRowValue;
/**
 * Builds a sql search query from a given property definition, the data
 * coming from the search module, a sql prefix to use, and the knex builder
 * @param knex the knex instance
 * @param serverData the server data
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param args the args coming from the search module in such format
 * @param knexBuilder the knex building instance
 * @param dictionary the dictionary that is being used
 * @param isOrderedByIt whether there will be a subsequent order by request
 */
export declare function buildSQLQueryForProperty(knex: Knex, serverData: any, itemDefinition: ItemDefinition, include: Include, propertyDefinition: PropertyDefinition, args: IGQLArgs, knexBuilder: Knex.QueryBuilder, dictionary: string, isOrderedByIt: boolean): boolean | [string, any[]];
/**
 * Builds a sql str FTS search query from a given property definition, the data
 * coming from the search module, a sql prefix to use, and the knex builder
 * @param knex the knex instance
 * @param serverData the server data
 * @param itemDefinition the item definition that contains the property
 * @param include the include within the item definition, or null
 * @param propertyDefinition the property definition in question
 * @param args the args coming from the search module in such format
 * @param search the search string that is being used
 * @param knexBuilder the knex building instance
 * @param dictionary the dictionary that is being used
 * @param isOrderedByIt whether there will be a subsequent order by request
 */
export declare function buildSQLStrSearchQueryForProperty(knex: Knex, serverData: any, itemDefinition: ItemDefinition, include: Include, propertyDefinition: PropertyDefinition, args: IGQLArgs, search: string, knexBuilder: Knex.QueryBuilder, dictionary: string, isOrderedByIt: boolean): boolean | [string, any[]];
/**
 * Builds an order by query for a given property
 * @param knex the knex instance
 * @param serverData the server data that is being used
 * @param itemDefinition the item definition in question
 * @param include the include (or null)
 * @param propertyDefinition the property in question
 * @param knexBuilder the knex builder that is currently building the query
 * @param direction the direction to be accounted for
 * @param nulls the nulls (first or last)
 * @param wasIncludedInSearch whether this property was included in search
 * @param wasIncludedInStrSearch whether this property was included in the str FTS search
 */
export declare function buildSQLOrderByForProperty(knex: Knex, serverData: any, itemDefinition: ItemDefinition, include: Include, propertyDefinition: PropertyDefinition, knexBuilder: Knex.QueryBuilder, direction: "asc" | "desc", nulls: "first" | "last", wasIncludedInSearch: boolean, wasIncludedInStrSearch: boolean): void;
/**
 * Builds the order by functionality for the internal properties, such as
 * created_at, edited_at, etc...
 * @param knex the knex instance
 * @param itemDefinition the item definition
 * @param which basically the column name
 * @param knexBuilder the knex builder
 * @param direction the direction of the order by rule
 * @param nulls whether nulls are first or last
 */
export declare function buildSQLOrderByForInternalRequiredProperty(knex: Knex, itemDefinition: ItemDefinition, which: string, knexBuilder: Knex.QueryBuilder, direction: "asc" | "desc", nulls: "first" | "last"): void;
