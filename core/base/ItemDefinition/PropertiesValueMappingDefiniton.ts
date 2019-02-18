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
import { PropertyDefinitionSupportedType } from './PropertyDefinition';
import { CheckUpError } from '../Error';

//import ajv checker conditionally
let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv();
}

//Represents the way that properties are stored
//Check the schema down to see how this relates
//at PropertiesValueMappingDefiniton.schema
export interface PropertiesValueMappingDefinitonType {
  [propertyName: string]: PropertyDefinitionSupportedType
}

//this represets the raw stored json data, in this case
//it is exactly the same as the PropertiesValueMappingDefinitonType
export type PropertiesValueMappingDefinitonRawJSONDataType =
  PropertiesValueMappingDefinitonType;

//Class is defined here
export default class PropertiesValueMappingDefiniton {
  private properties:PropertiesValueMappingDefinitonType;
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

    //run a check if we are not in production
    //very useful for development
    if (process.env.NODE_ENV !== "production") {
      PropertiesValueMappingDefiniton.check(rawJSON,
        parentItemDefinition, referredItemDefinition);
    }
    this.properties = rawJSON;
    this.parentItemDefinition = parentItemDefinition;
    this.referredItemDefinition = referredItemDefinition;
  }

  getPropertyMap(): Array<{
    propertyName: string,
    value: PropertyDefinitionSupportedType
  }>{
    return Object.keys(this.properties).map(key=>{
      return {propertyName: key, value: this.properties[key]}
    });
  }

  //These are here but only truly available in non production
  static schema:any;
  static schema_validate:any;
  static check:any;
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
    type: "object",
    additionalProperties: {
      //despite of being able to use any of the property
      //definition values we only allow for string numbers
      //and booleans
      type: ["boolean", "string", "number", "null"]
    },
    minProperties: 1
  };

  //the validation function created by ajv
  PropertiesValueMappingDefiniton.schema_validate =
    ajv.compile(PropertiesValueMappingDefiniton.schema);

  //the checker, takes the same arguments as the constructor
  PropertiesValueMappingDefiniton.check = function(
    rawJSON: PropertiesValueMappingDefinitonRawJSONDataType,
    parentItemDefinition: ItemDefinition,
    referredItemDefinition: ItemDefinition
  ){

    //we check the schema for validity
    let valid = PropertiesValueMappingDefiniton.schema_validate(rawJSON);

    //if not valid throw the errors
    if (!valid) {
      throw new CheckUpError(
        "Schema Check Failed",
        parentItemDefinition.location,
        PropertiesValueMappingDefiniton.schema_validate.errors,
        rawJSON
      );
    };

    //We need to loop over the properties that were given
    let propertyList = Object.keys(rawJSON);
    let propertyName;
    for (propertyName of propertyList){

      //get the value for them
      let propertyValue = rawJSON[propertyName];

      //and lets check that they actually have such properties
      if (!referredItemDefinition.hasPropertyDefinitionFor(propertyName)){
        let obj:any = {};
        obj[propertyName] = propertyValue;
        throw new CheckUpError(
          "Property not available in referred itemDefinition",
          parentItemDefinition.location,
          propertyName,
          obj,
          rawJSON
        );
      };

      //And check whether the value is even valid
      if (!referredItemDefinition.getPropertyDefinitionFor(propertyName)
        .isValidValue(propertyValue)){
        let obj:any = {};
        obj[propertyName] = propertyValue;
        throw new CheckUpError(
          "Property value is invalid in referred itemDefinition",
          parentItemDefinition.location,
          propertyValue,
          obj,
          rawJSON
        );
      };
    }
  }
}
