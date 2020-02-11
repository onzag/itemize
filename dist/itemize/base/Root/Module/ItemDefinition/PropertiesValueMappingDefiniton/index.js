"use strict";
/**
 * This file contains the value mapper that specifies how things such as
 * predefinedProperties and enforcedProperties do behave
 *
 * related files schema.ts and checkers.ts
 *
 * @packageDocumentation
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
class PropertiesValueMappingDefiniton {
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
    constructor(rawJSON, parentItemDefinition, referredItemDefinition) {
        this.rawData = rawJSON;
        this.parentItemDefinition = parentItemDefinition;
        this.referredItemDefinition = referredItemDefinition;
    }
    /**
     * Gives a property map in the form id and value for properties
     * @returns the property map with property values
     */
    getPropertyMap() {
        return Object.keys(this.rawData).map((key) => {
            return {
                id: key,
                value: this.getPropertyValue(key),
            };
        });
    }
    /**
     * Checks whether it contains a property value for a
     * specific property id
     * @param key the property id
     * @returns a boolean on whether it has such a property value
     */
    hasPropertyValue(key) {
        // null is a valid value so we check for undefined
        return typeof this.rawData[key] !== "undefined";
    }
    /**
     * Retrieves a property value for a given property id
     * @param key the property id
     * @returns either a peroperty supported value or a property
     * definition itself for referred properties
     */
    getPropertyValue(key) {
        const value = this.rawData[key];
        const property = value.property;
        if (property) {
            return this.parentItemDefinition.getPropertyDefinitionFor(property, false);
        }
        return value.exactValue;
    }
}
exports.default = PropertiesValueMappingDefiniton;
