/**
 * This file contains the functionality that is required to perform checks
 * in the server side, they are done against the database rather than
 * using fetch requests that ultimately end up running these functions
 *
 * @packageDocumentation
 */
import { PropertyDefinitionSupportedType } from "./types";
import PropertyDefinition from "../PropertyDefinition";
import ItemDefinition from "..";
import Include from "../Include";
import { IAppDataType } from "../../../../../server";
/**
 * The server side index checker checks for unique indexes within properties
 * @param knex the Knex instance
 * @param property the property in question
 * @param value the value of that property as requested to check
 * @param id the slot id
 * @param version the slot version
 * @returns a boolean on whether the unique index is valid
 */
export declare function serverSideIndexChecker(appData: IAppDataType, itemDefinition: ItemDefinition, include: Include, property: PropertyDefinition, value: PropertyDefinitionSupportedType, id: number, version: string): Promise<boolean>;
