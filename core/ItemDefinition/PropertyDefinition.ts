import ItemDefinition from '.';
import ConditionalRuleSet,
  { ConditionalRuleSetRawJSONDataType } from './ConditionalRuleSet';

//import ajv checker conditionally
let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv({schemaId: 'id'});
}

export type PropertyDefinitionSupportedTypes =
  "boolean" |         //A simple boolean, comparable, and stored as a boolean
  "integer" |         //A simple number, comparable, and stored as a number
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

export type PropertyDefinitionSupportedTypesStandardType =
Record<PropertyDefinitionSupportedTypes, {
  json?: "boolean" | "number" | "string",
  validate?: (value: PropertyDefinitionSupportedType)=>any,
  storedAs?: string,
  indexed?: boolean,
  indexType?: "classic" | "FTS" | "location",
  HTMLInjectionCheck?: boolean,
  max?: number,
  min?: number,
  maxLenght?: number,
  whole?: number,
  decimals?: number
}>

export const PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD
  :PropertyDefinitionSupportedTypesStandardType = {
  boolean: {
    json: "boolean",
    storedAs: "BOOLEAN",
    indexed: true,
    indexType: "classic"
  },
  integer: {
    json: "number",
    validate: (n:PropertyDefinitionSupportedIntegerType)=>
      !isNaN(NaN) && parseInt(<any>n) === n &&
      n <= 2147483647 && n >= -2147483647,
    storedAs: "INTEGER",
    indexed: true,
    indexType: "classic",
    max: 2147483647,
    min: -2147483647
  },
  number: {
    json: "number",
    validate: (n:PropertyDefinitionSupportedNumberType)=>{
      if (isNaN(n)){
        return false;
      }

      let strValue = n.toString();
      if (strValue.indexOf('e') !== -1){
        return false;
      }
      let splittedDecimals = n.toString().split(".");
      if (splittedDecimals[0].length < 131072 &&
        (!splittedDecimals[1] || splittedDecimals[1].length < 131072)){
          return true;
        }

      return false;
    },
    storedAs: "NUMERIC",
    indexed: true,
    indexType: "classic",
    whole: 131072,
    decimals: 131072,
  },
  string: {
    json: "string",
    validate: (s:PropertyDefinitionSupportedStringType)=>s.length <= 255,
    storedAs: "TEXT",
    indexed: true,
    indexType: "classic",
    maxLenght: 255
  },
  text: {
    storedAs: "TEXT",
    validate: (s:PropertyDefinitionSupportedTextType)=>{
      return typeof s.html === "string" &&
        typeof s.raw === "string"
    },
    indexed: true,
    indexType: "FTS",
    HTMLInjectionCheck: true
  },
  year: {
    json: "number",
    validate: (n:number)=>!isNaN(NaN) && parseInt(<any>n) === n &&
      n <= 3000 && n >= 0,
    storedAs: "SMALLINT",
    indexed: true,
    indexType: "classic"
  },
  date: {

  },
  datetime: {

  },
  location: {
    validate: (l:PropertyDefinitionSupportedLocationType)=>{
      return typeof l.lng === "string" &&
        typeof l.lat === "string" &&
        typeof l.txt === "string"
    },
    storedAs: "location",
    indexed: true,
    indexType: "location"
  },
  images: {

  },
  files: {

  },
}

export type PropertyDefinitionSupportedBooleanType = boolean;
export type PropertyDefinitionSupportedIntegerType = number;
export type PropertyDefinitionSupportedNumberType = number;
export type PropertyDefinitionSupportedStringType = string;
export type PropertyDefinitionSupportedTextType = {
  html: string,
  raw: string
}
export type PropertyDefinitionSupportedDateType = any;
export type PropertyDefinitionSupportedDateTimeType = any;
export type PropertyDefinitionSupportedLocationType = {
  lng: string,
  lat: string,
  txt: string
}
export type PropertyDefinitionSupportedImagesType = any;
export type PropertyDefinitionSupportedFilesType = any;

export type PropertyDefinitionSupportedType =
  PropertyDefinitionSupportedBooleanType |
  PropertyDefinitionSupportedIntegerType |
  PropertyDefinitionSupportedNumberType |
  PropertyDefinitionSupportedStringType |
  PropertyDefinitionSupportedTextType |
  PropertyDefinitionSupportedDateType |
  PropertyDefinitionSupportedDateTimeType |
  PropertyDefinitionSupportedLocationType |
  PropertyDefinitionSupportedImagesType |
  PropertyDefinitionSupportedFilesType

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
  enforcedValues?: Array<PropertyDefinitionRawJSONRuleDataType>,
  hiddenIf?: ConditionalRuleSetRawJSONDataType
}

export interface PropertyDefinitionRuleDataType {
  value: boolean | string | number,
  if: ConditionalRuleSet
}


export default class PropertyDefinition {
  private id: string;
  private type: PropertyDefinitionSupportedTypes;
  private values?: Array<boolean | string | number>;
  private nullable?: boolean;
  private hidden?: boolean;
  private autocomplete?: string;
  private autocompleteSetFromProperty?: string;
  private default?: boolean | string | number;
  private defaultIf?: Array<PropertyDefinitionRuleDataType>;
  private enforcedValues?: Array<PropertyDefinitionRuleDataType>;
  private hiddenIf?: ConditionalRuleSet;

  //representing the state of the class
  private onStateChange:()=>any;
  private state_value:PropertyDefinitionSupportedType;

  constructor(
    rawJSON: PropertyDefinitionRawJSONDataType,
    parent: any,
    parentItemDefinition: ItemDefinition,
    onStateChange: ()=>any
  ){
    //If its not production run the checks
    if (process.env.NODE_ENV !== "production") {
      PropertyDefinition.check(rawJSON, parent,
        parentItemDefinition, onStateChange);
    }

    this.id = rawJSON.id;
    this.type = rawJSON.type;
    this.values = rawJSON.values;
    this.nullable = rawJSON.nullable;
    this.hidden = rawJSON.hidden;
    this.autocomplete = rawJSON.autocomplete;
    this.autocompleteSetFromProperty = rawJSON.autocompleteSetFromProperty;
    this.default = rawJSON.default;

    this.defaultIf = rawJSON.defaultIf && rawJSON.defaultIf.map(dif=>({
      value: dif.value,
      if: new ConditionalRuleSet(dif.if, this, parentItemDefinition)
    }));

    this.enforcedValues = rawJSON.enforcedValues &&
      rawJSON.enforcedValues.map(ev=>({
        value: ev.value,
        if: new ConditionalRuleSet(ev.if, this, parentItemDefinition)
      }));

    this.hiddenIf = rawJSON.hiddenIf &&
      new ConditionalRuleSet(rawJSON.hiddenIf, this, parentItemDefinition);

    //STATE MANAGEMENT
    this.onStateChange = onStateChange;
    this.state_value = typeof rawJSON.default !== "undefined" ?
      rawJSON.default : null;

    if (rawJSON.defaultIf){
      let rulePasses = this.defaultIf.find(difRule=>difRule.if.evaluate());
      if (rulePasses){
        this.state_value = rulePasses.value;
      }
    }
  }

  isCurrentlyHidden():boolean{
    return this.hidden || (this.hiddenIf && this.hiddenIf.evaluate()) || false;
  }

  getId(){
    return this.id;
  }

  getCurrentValue():PropertyDefinitionSupportedType {
    if (this.enforcedValues) {
      let enforcedValue = this.enforcedValues.find(ev=>{
        return ev.if.evaluate();
      });
      if (enforcedValue){
        return enforcedValue.value;
      }
    }

    return this.state_value;
  }

  setCurrentValue(newValue: PropertyDefinitionSupportedType){
    if (!this.isValidValue(newValue)){
      throw new Error("Invalid value " + JSON.stringify(newValue));
    }
    if (newValue !== this.state_value){
      this.state_value = newValue;
      this.onStateChange();
    }
  }

  isValidValue(newValue: PropertyDefinitionSupportedType):boolean {
    let definition = PropertyDefinition.supportedTypesStandard[this.type];
    if (definition.json && typeof newValue !== definition){
      return false;
    }
    if (definition.validate && !definition.validate(newValue)){
      return false
    }
    return true;
  }

  //These are here but only truly available in non production
  static schema:any;
  static schema_validate:any;
  static check:any;
  static supportedTypesStandard = PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD;
}
