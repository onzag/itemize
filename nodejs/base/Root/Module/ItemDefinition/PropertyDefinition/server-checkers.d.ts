/**
 * This file contains the functionality that is required to perform checks
 * in the server side, they are done against the database rather than
 * using fetch requests that ultimately end up running these functions
 *
 * @packageDocumentation
 */
import { PropertyDefinitionSupportedType } from "./types";
import PropertyDefinition from "../PropertyDefinition";
import Knex from "knex";
import Autocomplete from "../../../../Autocomplete";
/**
 * The server side index checker checks for unique indexes within properties
 * @param knex the Knex instance
 * @param property the property in question
 * @param value the value of that property as requested to check
 * @param id the slot id
 * @param version the slot version
 * @returns a boolean on whether the unique index is valid
 */
export declare function serverSideIndexChecker(knex: Knex, property: PropertyDefinition, value: PropertyDefinitionSupportedType, id: number, version: string): Promise<boolean>;
/**
 * Checks for an autocomplete value as it coming from the given autocomplete
 * @param autocompletes the list of autocompletes from memory
 * @param property the property in question
 * @param value the value to check
 * @param id the slot id, if any
 * @param version the slot version, if any
 * @returns a boolean on whether the autocomplete is valid or not
 */
export declare function serverSideAutocompleteChecker(autocompletes: Autocomplete[], property: PropertyDefinition, value: PropertyDefinitionSupportedType, id: number, version: string): boolean;
