/**
 * This class provides the utility for the properties that
 * are set to a specific item, for example let's say there's
 * an item named Vehicle, which can have a property for it
 * being type "car", "motorbike, or "moped"; such vehicle has
 * a wheelset, and this wheelset has properties of its own
 *
 * {
 *   "name": "wheelset",
 *   "enforcedProperties" : {
 *     "amount": 4,
 *     "type": "car"
 *   },
 *   "excludedIf": {
 *     "property": "type",
 *     "comparator": "not-equal",
 *     "value": "car"
 *   }
 * },
 *
 * The part defined as
 *
 * "enforcedProperties" : {
 *   "amount": 4,
 *   "type": "car"
 * },
 *
 * represents a list of properties for an specific item named
 * wheelset, this is a PropertiesValueMappingDefiniton
 */

import ItemDefinition from '.';
import PropertyDefinition, { PropertyDefinitionSupportedType } from './PropertyDefinition';

export interface PropertiesValueMappingReferredPropertyValue {
  property: string
}

//Represents the way that properties are stored
//Check the schema down to see how this relates
//at PropertiesValueMappingDefiniton.schema
export interface PropertiesValueMappingDefinitonRawJSONDataType {
  [propertyName: string]: PropertyDefinitionSupportedType |
    PropertiesValueMappingReferredPropertyValue
}

//Class is defined here
export default class PropertiesValueMappingDefiniton {
  public rawData:PropertiesValueMappingDefinitonRawJSONDataType;
  public referredItemDefinition:ItemDefinition;
  public parentItemDefinition:ItemDefinition;

  /**
   * Contructor for the class
   * @param rawJSON                the raw data as JSON
   * @param parentItemDefinition   the item definition that this node is
   *                               located, its root; for the example above that
   *                               would be the vehicle item definition
   * @param referredItemDefinition the item definition that these properties are
   *                               attempted to be set against, for the example
   *                               above that would be the wheelset item
   *                               definition
   */
  constructor(
    rawJSON: PropertiesValueMappingDefinitonRawJSONDataType,
    parentItemDefinition: ItemDefinition,
    referredItemDefinition: ItemDefinition){

    this.rawData = rawJSON;
    this.parentItemDefinition = parentItemDefinition;
    this.referredItemDefinition = referredItemDefinition;
  }

  getPropertyMap(): Array<{
    id: string,
    value: PropertyDefinitionSupportedType | PropertyDefinition
  }>{
    return Object.keys(this.rawData).map(key=>{
      return {
        id: key,
        value: this.getPropertyValue(key)
      }
    });
  }

  hasPropertyValue(key: string){
    return typeof this.rawData[key] !== "undefined";
  }

  getPropertyValue(key: string):
    PropertyDefinitionSupportedType | PropertyDefinition {
    let value = this.rawData[key];
    let property =
      (<PropertiesValueMappingReferredPropertyValue>value).property;
    if (property){
      return this.parentItemDefinition.getPropertyDefinitionFor(property);
    }
    return <PropertyDefinitionSupportedType>value;
  }

  //These are here but only truly available in non production
  static schema:any;
}

//We set the value of those if non in production
//These are very useful debugging utilities
if (process.env.NODE_ENV !== "production") {

  //The schema for the definition
  //{
  //  "amount": 4,
  //  "type": "car"
  //},
  //properties can be any string
  //the values must be boolean string or number
  //we should have at least one
  PropertiesValueMappingDefiniton.schema = {
    $id: "PropertiesValueMappingDefiniton",
    type: "object",
    additionalProperties: {
      oneOf: [
          {
            //despite of being able to use any of the property
            //definition values we basically only allow for string numbers
            //and booleans
            type: ["boolean", "string", "number", "null"]
          },
          {
              type: "object",
              properties: {
                property: {
                  type: "string",
                  pattern: "^[a-zA-Z0-9-]+$"
                }
              },
              required: ["property"]
          }
      ]

    },
    minProperties: 1
  };
}
