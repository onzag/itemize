import ItemDefinition from '.';
import ConditionalRuleSet,
  { ConditionalRuleSetRawJSONDataType } from './ConditionalRuleSet';
import { MIN_SUPPORTED_INTEGER, MAX_SUPPORTED_INTEGER,
  MAX_SUPPORTED_REAL, MAX_DECIMAL_COUNT,
  MAX_STRING_LENGTH,
  MAX_TEXT_LENGTH,
  REDUCED_BASE_i18N,
  CLASSIC_OPTIONAL_i18N,
  CLASSIC_BASE_i18N,
  CLASSIC_RANGED_i18N,
  CLASSIC_RANGED_OPTIONAL_i18N,
  CLASSIC_SEARCH_BASE_i18N,
  CLASSIC_SEARCH_OPTIONAL_i18N,
  CLASSIC_DISTANCE_i18N} from '../../constants';

//import ajv checker conditionally
let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv({schemaId: 'id'});
}

//All the supported property types
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

export enum PropertyDefinitionSearchInterfacesType {
  //uses an instance of the same property type input
  EXACT,
  //uses an instance of the same property type input, or two for a range
  //provides either an exact value or a range
  EXACT_AND_RANGE,
  //full text search, uses a simple raw string as search
  FTS,
  //uses location and range for searching
  LOCATION_DISTANCE
}

//So this is how properties are defined to give an overview on
//how they are supposed to be managed
export type PropertyDefinitionSupportedTypesStandardType =
Record<PropertyDefinitionSupportedTypes, {
  //json represents how the element is represented in json form
  //objects are not allowed only boolean numbers and strings are
  //these are used for types that are allowed to be used by
  //enforcedProperties and predefinedProperties, it is optional
  //as types that are not settable do not have a json form
  json?: "boolean" | "number" | "string",

  //this is a validation function that checks whether the value
  //is valid,
  validate?: (value: PropertyDefinitionSupportedType)=>any,
  //max valid, for numbers
  max?: number,
  //min valid for numbers
  min?: number,
  //max length for text and string and whatnot
  maxLenght?: number,
  //max decimal count
  maxDecimalCount?: number,
  //whether it is searchable or not
  searchable: boolean,
  //the search interface used
  searchInterface?: PropertyDefinitionSearchInterfacesType,
  //i18n supported and expected attributes
  //they won't be requested at all for hidden and not searchable items
  //if the item has a range it should be specified too
  //these will be used for checking more than anything
  i18n: {
    base: Array<string>,
    optional: Array<string>,
    //range attributes are not requested if disableRangedSearch is true
    //nor if the searchInterface is not EXACT_AND_RANGE
    range?: Array<string>,
    rangeOptional?: Array<string>
    //location type for search interface specific attributes
    //not used if the searchInterface is not LOCATION_DISTANCE
    distance?: Array<string>,
    //these are only for FTS
    searchBase?: Array<string>,
    searchOptional?: Array<string>
  }
}>

export const PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD
  :PropertyDefinitionSupportedTypesStandardType = {
  boolean: {
    json: "boolean",
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT,
    i18n: {
      base: REDUCED_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N
    }
  },
  integer: {
    json: "number",
    validate: (n:PropertyDefinitionSupportedIntegerType)=>
      !isNaN(NaN) && parseInt(<any>n) === n &&
      n <= MAX_SUPPORTED_INTEGER && n >= -MIN_SUPPORTED_INTEGER,
    max: MAX_SUPPORTED_INTEGER,
    min: -MIN_SUPPORTED_INTEGER,
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    i18n: {
      base: CLASSIC_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N,
      range: CLASSIC_RANGED_i18N,
      rangeOptional: CLASSIC_RANGED_OPTIONAL_i18N
    }
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
    max: MAX_SUPPORTED_REAL,
    maxDecimalCount: MAX_DECIMAL_COUNT,
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    i18n: {
      base: CLASSIC_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N,
      range: CLASSIC_RANGED_i18N,
      rangeOptional: CLASSIC_RANGED_OPTIONAL_i18N
    }
  },
  string: {
    json: "string",
    validate: (s:PropertyDefinitionSupportedStringType)=>s.length <= 255,
    maxLenght: MAX_STRING_LENGTH,
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT,
    i18n: {
      base: CLASSIC_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N
    }
  },
  text: {
    validate: (s:PropertyDefinitionSupportedTextType)=>{
      return typeof s.html === "string" &&
        typeof s.raw === "string" && s.html.length < MAX_TEXT_LENGTH
        && s.raw.length <= s.html.length;
    },
    maxLenght: MAX_TEXT_LENGTH,
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.FTS,
    i18n: {
      base: CLASSIC_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N,
      range: CLASSIC_RANGED_i18N,
      rangeOptional: CLASSIC_RANGED_OPTIONAL_i18N
    }
  },
  year: {
    json: "number",
    validate: (n:number)=>!isNaN(NaN) && parseInt(<any>n) === n &&
      n <= 3000 && n >= 0,
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    i18n: {
      base: CLASSIC_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N,
      range: CLASSIC_RANGED_i18N,
      rangeOptional: CLASSIC_RANGED_OPTIONAL_i18N
    }
  },
  //TODO
  date: {
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    i18n: {
      base: CLASSIC_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N,
      range: CLASSIC_RANGED_i18N,
      rangeOptional: CLASSIC_RANGED_OPTIONAL_i18N
    }
  },
  datetime: {
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    i18n: {
      base: CLASSIC_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N,
      range: CLASSIC_RANGED_i18N,
      rangeOptional: CLASSIC_RANGED_OPTIONAL_i18N
    }
  },
  location: {
    validate: (l:PropertyDefinitionSupportedLocationType)=>{
      return typeof l.lng === "string" &&
        typeof l.lat === "string" &&
        typeof l.txt === "string"
    },
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.LOCATION_DISTANCE,
    i18n: {
      base: REDUCED_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N,
      distance: CLASSIC_DISTANCE_i18N
    }
  },
  //TODO
  images: {
    searchable: false,
    i18n: {
      base: REDUCED_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N
    }
  },
  files: {
    searchable: false,
    i18n: {
      base: REDUCED_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N
    }
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
//TODO
export type PropertyDefinitionSupportedDateType = any;
export type PropertyDefinitionSupportedDateTimeType = any;
export type PropertyDefinitionSupportedLocationType = {
  lng: string,
  lat: string,
  txt: string
}
//TODO
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

export type PropertyDefinitionSearchLevelsType =
  //Will always display a search field, but it might be skipped
  //this is the default
  "always" |
  //Will display a smaller search field and make it clearly optional
  "moderate" |
  //Will actually make it so that you need to press a button to see
  //all search options
  "rare" |
  //Does not display any search field at all
  "disabled"

export interface PropertyDefinitionRawJSONDataType {
  //the property identifier
  id: string,
  //the type of the property
  type: PropertyDefinitionSupportedTypes,
  values?: Array<boolean | string | number>,
  nullable?: boolean,
  hidden?: boolean,
  autocomplete?: string,
  autocompleteSetFromProperty?: string,
  default?: boolean | string | number,
  defaultIf?: Array<PropertyDefinitionRawJSONRuleDataType>,
  enforcedValues?: Array<PropertyDefinitionRawJSONRuleDataType>,
  hiddenIf?: ConditionalRuleSetRawJSONDataType,
  searchLevel?: PropertyDefinitionSearchLevelsType,
  disableRangedSearch?: boolean,

  //This one is added for the sake of data of origin
  isExtension?: boolean
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
  private isExtension?: boolean;
  private default?: boolean | string | number;
  private defaultIf?: Array<PropertyDefinitionRuleDataType>;
  private enforcedValues?: Array<PropertyDefinitionRuleDataType>;
  private hiddenIf?: ConditionalRuleSet;
  private isRangedSearchDisabled?: boolean;
  private searchLevel: PropertyDefinitionSearchLevelsType

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
      PropertyDefinition.check(rawJSON, parentItemDefinition, onStateChange);
    }

    this.id = rawJSON.id;
    this.type = rawJSON.type;
    this.values = rawJSON.values;
    this.nullable = rawJSON.nullable;
    this.hidden = rawJSON.hidden;
    this.autocomplete = rawJSON.autocomplete;
    this.autocompleteSetFromProperty = rawJSON.autocompleteSetFromProperty;
    this.default = rawJSON.default;
    this.isExtension = rawJSON.isExtension;
    this.isRangedSearchDisabled = rawJSON.disableRangedSearch;
    this.searchLevel = rawJSON.searchLevel || "always";

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
    if (definition.json && typeof newValue !== definition.json){
      return false;
    }
    if (definition.validate && !definition.validate(newValue)){
      return false
    }
    return true;
  }

  checkIfIsExtension():boolean {
    return !!this.isExtension;
  }

  //These are here but only truly available in non production
  static schema:any;
  static schema_validate:any;
  static check:any;
  static supportedTypesStandard = PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD;
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
  PropertyDefinition.schema = {
    type: "object",
    additionalProperties: {
      type: ["boolean", "string", "number", "null"]
    },
    minProperties: 1
  };

  //the validation function created by ajv
  PropertyDefinition.schema_validate =
    ajv.compile(PropertyDefinition.schema);

  //the checker, takes the same arguments as the constructor
  PropertyDefinition.check = function(
    rawJSON: PropertyDefinitionRawJSONDataType,
    parentItemDefinition: ItemDefinition,
    onStateChange: ()=>any
  ){

    //we check the schema for validity
    let valid = PropertiesValueMappingDefiniton.schema_validate(rawJSON);

    //if not valid throw the errors
    if (!valid) {
      console.error(PropertiesValueMappingDefiniton.schema_validate.errors);
      throw new Error("Check Failed");
    };

    //We need to loop over the properties that were given
    let propertyList = Object.keys(rawJSON);
    let propertyName;
    for (propertyName of propertyList){

      //get the value for them
      let propertyValue = rawJSON[propertyName];

      //and lets check that they actually have such properties
      if (!referredItemDefinition.hasPropertyDefinitionFor(propertyName)){
        console.error("Property not available in referred itemDefinition",
          rawJSON, "in property named", propertyName, "valued",
          propertyValue);
        throw new Error("Check Failed");
      };

      //And check whether the value is even valid
      if (!referredItemDefinition.getPropertyDefinitionFor(propertyName)
        .isValidValue(propertyValue)){
        console.error("Property value is invalid in referred itemDefinition",
          rawJSON, "in property named", propertyName, "valued",
          propertyValue);
        throw new Error("Check Failed");
      };
    }
  }
}
