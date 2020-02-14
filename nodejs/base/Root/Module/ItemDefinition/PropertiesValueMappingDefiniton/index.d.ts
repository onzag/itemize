/**
 * This file contains the value mapper that specifies how things such as
 * predefinedProperties and enforcedProperties do behave
 *
 * related files schema.ts and checkers.ts
 *
 * @packageDocumentation
 */
import { PropertyDefinitionSupportedType } from "../PropertyDefinition/types";
import PropertyDefinition, { PropertyDefinitionValueType } from "../PropertyDefinition";
import ItemDefinition from "..";
/**
 * Represents the way that properties are stored
 * Check the schema down to see how this relates
 * at PropertiesValueMappingDefiniton.schema
 */
export interface IPropertiesValueMappingDefinitonRawJSONDataType {
    [propertyName: string]: PropertyDefinitionValueType;
}
/**
 * This class provides the utility for the properties that
 * are set to a specific item, for example let's say there's
 * an item named Vehicle, which can have a property for it
 * being type "car", "motorbike, or "moped"; such vehicle has
 * a wheelset, and this wheelset has properties of its own
 *
 * {
 *   "definition": "wheelset",
 *   "enforcedProperties" : {
 *     "amount": {
 *       "exactValue": 4
 *     },
 *     "type": {
 *       "exactValue": "car"
 *     },
 *   },
 * },
 *
 * represents a list of properties for an specific item named
 * wheelset, this is a PropertiesValueMappingDefiniton
 */
export default class PropertiesValueMappingDefiniton {
    rawData: IPropertiesValueMappingDefinitonRawJSONDataType;
    referredItemDefinition: ItemDefinition;
    parentItemDefinition: ItemDefinition;
    /**
     * Contructor for the class
     * @param rawJSON the raw data as JSON
     * @param parentItemDefinition the item definition that this node is
     * located, its root; for the example above that
     * would be the vehicle item definition
     * @param referredItemDefinition the item definition that these properties are
     * attempted to be set against, for the example above that would be the
     * wheelset item definition
     */
    constructor(rawJSON: IPropertiesValueMappingDefinitonRawJSONDataType, parentItemDefinition: ItemDefinition, referredItemDefinition: ItemDefinition);
    /**
     * Gives a property map in the form id and value for properties
     * @returns the property map with property values
     */
    getPropertyMap(): Array<{
        id: string;
        value: PropertyDefinitionSupportedType | PropertyDefinition;
    }>;
    /**
     * Checks whether it contains a property value for a
     * specific property id
     * @param key the property id
     * @returns a boolean on whether it has such a property value
     */
    hasPropertyValue(key: string): boolean;
    /**
     * Retrieves a property value for a given property id
     * @param key the property id
     * @returns either a peroperty supported value or a property
     * definition itself for referred properties
     */
    getPropertyValue(key: string): PropertyDefinitionSupportedType | PropertyDefinition;
}
