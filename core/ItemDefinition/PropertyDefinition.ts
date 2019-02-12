import ItemDefinition from '.';
import { ConditionalRuleSetRawJSONDataType } from './ConditionalRuleSet';

//import ajv checker conditionally
let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv({schemaId: 'id'});
}

export type PropertyDefinitionSupportedTypes =
  "boolean" |         //A simple boolean, comparable, and stored as a boolean
  "number" |          //A simple number, comparable, and stored as a number
  "string" |          //A simple string, comparable, and stored as a string
  "text" |            //Represented as an object, non comparable,
                      //stored as text and object and it should be able to do
                      //full text search, it's an object due to image support
                      //images are stored separatedly which includes where in
                      //the text location they are.
  "year" |            //Represented as a number, comparable, stored as number
  "date" |            //Represented as a number, comparable, stored as a date
  "datetime" |        //Represented as a number, comparable, stored as a date
  "location" |        //Represented as an object, non comparable, stored
                      //as two values
  "images" |          //Represented as a list of local urls, non comparable,
                      //stored as a list of urls, a main image is allowed
  "files"             //Represented as a list of local urls, non comparable,
                      //stored as a list of urls

export interface PropertyDefinitionRawJSONRuleDataType {
  value: boolean | string | number,
  if: ConditionalRuleSetRawJSONDataType
}

export interface PropertyDefinitionRawJSONDataType {
  id: string,
  type: PropertyDefinitionSupportedTypes,
  values?: Array<boolean | string | number>,
  nullable?: boolean,
  hidden?: boolean,
  autocomplete?: string,
  autocompleteSetFromProperty?: string,
  default?: boolean | string | number,
  defaultIf?: Array<PropertyDefinitionRawJSONRuleDataType>,
  enforcedValues?: Array<PropertyDefinitionRawJSONRuleDataType>
}
