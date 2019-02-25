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
  CLASSIC_DISTANCE_i18N,
  MIN_SUPPORTED_REAL,
  MAX_SUPPORTED_YEAR,
  MIN_SUPPORTED_YEAR,
  MAX_CURRENCY_DECIMAL_COUNT} from '../../constants';

//All the supported property types
export type PropertyDefinitionSupportedTypes =
  "boolean" |         //A simple boolean, comparable, and stored as a boolean
  "integer" |         //A simple number, comparable, and stored as a number
  "number" |          //A simple number, comparable, and stored as a number
  "currency" |        //Currency, comparable and stored as an object
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

  //represents an item that would mark for null
  //by default it is null itself
  nullableDefault?: any,
  rangeDefaultSearch?: boolean,

  //this is a validation function that checks whether the value
  //is valid,
  validate?: (value: PropertyDefinitionSupportedType)=>any,
  //max valid, for numbers
  max?: number,
  //min valid for numbers
  min?: number,
  //max length for text and string and whatnot
  maxLength?: number,
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
    //a boolean type can be written as a boolean
    json: "boolean",
    //it is searchable by default
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT,
    //the i18n attributes
    i18n: {
      base: REDUCED_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N
    }
  },
  integer: {
    //an integer is represented as a number
    json: "number",
    //it gotta be validated to check it's a number
    validate: (n:PropertyDefinitionSupportedIntegerType)=>
      !isNaN(NaN) && parseInt(<any>n) === n &&
      n <= MAX_SUPPORTED_INTEGER && n >= MIN_SUPPORTED_INTEGER,
    //max and min
    max: MAX_SUPPORTED_INTEGER,
    min: -MIN_SUPPORTED_INTEGER,
    //it is searchable by exact and range value
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    //i18n attributes
    i18n: {
      base: CLASSIC_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N,
      range: CLASSIC_RANGED_i18N,
      rangeOptional: CLASSIC_RANGED_OPTIONAL_i18N
    }
  },
  number: {
    //a number is just a number can be integer or decimal
    json: "number",
    //the validator
    validate: (n:PropertyDefinitionSupportedNumberType)=>{
      if (isNaN(n)){
        return false;
      }

      if (n > MAX_SUPPORTED_REAL || n < MIN_SUPPORTED_REAL){
        return false;
      }

      let splittedDecimals = n.toString().split(".");
      if (!splittedDecimals[1] ||
          splittedDecimals[1].length <= MAX_DECIMAL_COUNT){
          return true;
        }

      return false;
    },
    //max and min
    max: MAX_SUPPORTED_REAL,
    min: MIN_SUPPORTED_REAL,
    maxDecimalCount: MAX_DECIMAL_COUNT,
    //it is searchable
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    //i18n attributes required
    i18n: {
      base: CLASSIC_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N,
      range: CLASSIC_RANGED_i18N,
      rangeOptional: CLASSIC_RANGED_OPTIONAL_i18N
    }
  },
  currency: {
    //locations just contain this basic data
    validate: (l:PropertyDefinitionSupportedCurrencyType)=>{
      if (typeof l.value !== "number" &&
        typeof l.currency !== "string") {
        return false;
      }

      if (isNaN(l.value)){
        return false;
      }

      if (l.value <= MAX_SUPPORTED_REAL && l.value >= MIN_SUPPORTED_REAL){
        return false;
      }

      let splittedDecimals = l.value.toString().split(".");
      if (!splittedDecimals[1] ||
          splittedDecimals[1].length <= MAX_CURRENCY_DECIMAL_COUNT){
          return true;
        }

      return false;
    },
    rangeDefaultSearch: true,
    //Similar to real
    max: MAX_SUPPORTED_REAL,
    min: MIN_SUPPORTED_REAL,
    maxDecimalCount: MAX_CURRENCY_DECIMAL_COUNT,
    //it is searchable
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    //i18n attributes required
    i18n: {
      base: CLASSIC_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N,
      range: CLASSIC_RANGED_i18N,
      rangeOptional: CLASSIC_RANGED_OPTIONAL_i18N
    }
  },
  string: {
    //a string is a string
    json: "string",
    nullableDefault: "",
    //validates just the length
    validate: (s:PropertyDefinitionSupportedStringType)=>s.length <= 255,
    maxLength: MAX_STRING_LENGTH,
    //it is searchable by an exact value, use text for organic things
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT,
    //i18n attributes required
    i18n: {
      base: CLASSIC_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N
    }
  },
  text: {
    nullableDefault: "",
    //validates the text, texts don't support json value
    validate: (s:PropertyDefinitionSupportedTextType)=>{
      return typeof s.html === "string" &&
        typeof s.raw === "string" && s.html.length < MAX_TEXT_LENGTH
        && s.raw.length <= s.html.length;
    },
    //the max length for the html
    maxLength: MAX_TEXT_LENGTH,
    //whether it is searchable or not
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.FTS,
    //i18n attributes
    i18n: {
      base: CLASSIC_BASE_i18N,
      optional: CLASSIC_OPTIONAL_i18N,
      searchBase: CLASSIC_SEARCH_BASE_i18N,
      searchOptional: CLASSIC_SEARCH_OPTIONAL_i18N
    }
  },
  year: {
    //years can be set as a number
    json: "number",
    //validates
    validate: (n:number)=>!isNaN(NaN) && parseInt(<any>n) === n &&
      n <= MAX_SUPPORTED_YEAR && n >= MIN_SUPPORTED_YEAR,
    //max and min
    max: MAX_SUPPORTED_YEAR,
    min: MIN_SUPPORTED_YEAR,
    //searchable attributes and supports range
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE,
    //i18n data
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
    //locations just contain this basic data
    validate: (l:PropertyDefinitionSupportedLocationType)=>{
      return typeof l.lng === "string" &&
        typeof l.lat === "string" &&
        typeof l.txt === "string"
    },
    //they are searchable
    searchable: true,
    searchInterface: PropertyDefinitionSearchInterfacesType.LOCATION_DISTANCE,
    //i18n with the distance attributes
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
export type PropertyDefinitionSupportedCurrencyType = {
  value: number,
  currency: string
}
export type PropertyDefinitionSupportedStringType = string;
export type PropertyDefinitionSupportedTextType = {
  html: string,
  raw: string
}
//TODO
export type PropertyDefinitionSupportedDateType = null;
export type PropertyDefinitionSupportedDateTimeType = null;
export type PropertyDefinitionSupportedLocationType = {
  lng: string,
  lat: string,
  txt: string
}
//TODO
export type PropertyDefinitionSupportedImagesType = null;
export type PropertyDefinitionSupportedFilesType = null;

export type PropertyDefinitionSupportedType =
  PropertyDefinitionSupportedBooleanType |
  PropertyDefinitionSupportedIntegerType |
  PropertyDefinitionSupportedNumberType |
  PropertyDefinitionSupportedCurrencyType |
  PropertyDefinitionSupportedStringType |
  PropertyDefinitionSupportedTextType |
  PropertyDefinitionSupportedDateType |
  PropertyDefinitionSupportedDateTimeType |
  PropertyDefinitionSupportedLocationType |
  PropertyDefinitionSupportedImagesType |
  PropertyDefinitionSupportedFilesType

export interface PropertyDefinitionRawJSONRuleDataType {
  value: PropertyDefinitionSupportedType,
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
  //the locale data, we don't know what it is
  //the structure is defined in the constants
  i18nData?: {
    [locale: string]: any
  },
  rare?: boolean,
  //the type of the property
  type: PropertyDefinitionSupportedTypes,
  min?: number,
  max?: number,
  minLength?: number,
  maxLength?: number,
  maxDecimalCount?: number,

  //values for the property set
  values?: Array<PropertyDefinitionSupportedType>,
  //whether it can be null or not
  nullable?: boolean,
  //Makes the value be null if hidden
  nullIfHidden?: boolean,
  //hidden does not show at all
  hidden?: boolean,
  //autocomplete is an endpoint of some sort that requests
  //data for autocomplete
  autocomplete?: string,
  //uses a property attribute
  autocompleteSetFromProperty?: Array<string>,
  //whether it's enforced or not
  autocompleteIsEnforced?: boolean,
  //whether the autocomplete supports prefills
  autocompleteSupportsPrefills?: boolean,
  //default value
  default?: PropertyDefinitionSupportedType,
  defaultIf?: Array<PropertyDefinitionRawJSONRuleDataType>,
  //enforced values
  enforcedValues?: Array<PropertyDefinitionRawJSONRuleDataType>,
  enforcedValue?: PropertyDefinitionSupportedType;
  //hidden if conditional
  hiddenIf?: ConditionalRuleSetRawJSONDataType,
  //search level
  searchLevel?: PropertyDefinitionSearchLevelsType,
  //disable ranged search
  disableRangedSearch?: boolean,

  //This one is added for the sake of data of origin
  isExtension?: boolean
}

export interface PropertyDefinitionRuleDataType {
  value: PropertyDefinitionSupportedType,
  if: ConditionalRuleSet
}

export interface PropertyValueGetterType {
  userSet: boolean,
  default: boolean,
  enforced: boolean,
  valid: boolean,
  value: PropertyDefinitionSupportedType
}

//The class itself
export default class PropertyDefinition {
  public rawData: PropertyDefinitionRawJSONDataType;
  private defaultIf?: Array<PropertyDefinitionRuleDataType>;
  private enforcedValues?: Array<PropertyDefinitionRuleDataType>;
  private hiddenIf?: ConditionalRuleSet;

  private superEnforcedValue?: PropertyDefinitionSupportedType
    | PropertyDefinition;
  private superDefaultedValue?: PropertyDefinitionSupportedType
    | PropertyDefinition;

  //representing the state of the class
  private onStateChange:()=>any;
  private state_value:PropertyDefinitionSupportedType;
  private state_valueModified:boolean;

  /**
   * Builds a property definition
   * @param rawJSON              the raw json structure
   * @param parentItemDefinition [description]
   * @param onStateChange        [description]
   */
  constructor(
    rawJSON: PropertyDefinitionRawJSONDataType,
    parentItemDefinition: ItemDefinition,
    onStateChange: ()=>any
  ){
    //set the default value
    this.defaultIf = rawJSON.defaultIf && rawJSON.defaultIf.map(dif=>({
      value: dif.value,
      if: new ConditionalRuleSet(dif.if, parentItemDefinition)
    }));

    //set the enforced values from the conditional rule set
    this.enforcedValues = rawJSON.enforcedValues &&
      rawJSON.enforcedValues.map(ev=>({
        value: ev.value,
        if: new ConditionalRuleSet(ev.if, parentItemDefinition)
      }));

    //set the hidden if rule
    this.hiddenIf = rawJSON.hiddenIf &&
      new ConditionalRuleSet(rawJSON.hiddenIf, parentItemDefinition);

    //STATE MANAGEMENT
    this.onStateChange = onStateChange;
    //initial value for all namespaces is null
    this.state_value = null;
    this.state_valueModified = false;
  }

  /**
   * checks if it's currently hidden (not phantom)
   * @return a boolean
   */
  isCurrentlyHidden():boolean{
    return this.rawData.hidden ||
      (this.hiddenIf && this.hiddenIf.evaluate()) || false;
  }

  /**
   * gives the id of this property defintion
   * @return the id
   */
  getId(){
    return this.rawData.id;
  }

  /**
   * provides the current useful value for the property defintion
   * @return a bunch of information about the current value
   */
  getCurrentValue():PropertyValueGetterType {
    //make if hidden if null if hidden is set to true
    if (this.rawData.nullIfHidden && this.isCurrentlyHidden()){
      return {
        userSet: false,
        enforced: true,
        default: false,
        valid: true,
        value: null
      };
    }

    //if there's an enforced value
    if (typeof this.superEnforcedValue !== "undefined" ||
        this.enforcedValues ||
        typeof this.rawData.enforcedValue !== "undefined") {
      //let's check if one matches the current situation
      //we first pick the superEnforcedValue or otherwise the enforcedValue
      //or otherwise the first enforcedValue that evaluates to true
      let enforcedValue = typeof this.superEnforcedValue !== "undefined" ?
        //superenforced might be a property definition so we got to
        //extract the value in such case
        (this.superEnforcedValue instanceof PropertyDefinition ?
          this.superEnforcedValue.getCurrentValue().value :
          this.superEnforcedValue) :

        //otherwise in other cases we check the enforced value
        //which has priority
        (typeof this.rawData.enforcedValue !== "undefined" ?
          this.rawData.enforcedValue :
          //otherwise we go to for evaluating the enforced values
          //or give undefined if nothing is found
          (this.enforcedValues.find(ev=>{
            return ev.if.evaluate();
          }) || {value: undefined}).value);

      //if we get one
      if (typeof enforcedValue !== "undefined"){
        //we return the value that was set to be
        return {
          userSet: false,
          enforced: true,
          default: false,
          valid: this.isValidValue(enforcedValue.value),
          value: enforcedValue.value
        };
      }
    }

    //if the value hasn't been modified we are to return the defaults
    if (!this.state_valueModified){
      //lets find the default value, first the super default
      //and we of course extract it in case of property definition
      //or otherwise use the default, which might be undefined
      let defaultValue = typeof this.superDefaultedValue !== "undefined" ?
        (this.superDefaultedValue instanceof PropertyDefinition ?
          this.superDefaultedValue.getCurrentValue().value :
          this.superDefaultedValue) : this.rawData.default;

      //Also by condition
      if (this.defaultIf && typeof defaultValue === "undefined"){
        //find a rule that passes
        let rulePasses = this.defaultIf.find(difRule=>difRule.if.evaluate());
        if (rulePasses){
          //and set the default value to such
          defaultValue = rulePasses.value;
        }
      }

      //return the default value or null if nothing found
      //the maximum default is null, even if the item is not
      //nullable in which case the item would be considered invalid
      return {
        userSet: false,
        enforced: false,
        default: true,
        valid: this.isValidValue(defaultValue || null),
        value: defaultValue || null
      };
    }

    return {
      userSet: true,
      enforced: false,
      default: false,
      valid: this.isValidValue(this.state_value),
      value: this.state_value
    };
  }

  setSuperEnforced(value: PropertyDefinitionSupportedType | PropertyDefinition){
    this.superEnforcedValue = value;
  }

  setSuperDefault(value: PropertyDefinitionSupportedType | PropertyDefinition){
    this.superDefaultedValue = value;
  }

  /**
   * Sets the current value for the item, null is a valid value
   * Specially if the item is nullable
   *
   * The resulting value set might not be the same, if the item
   * has a default null value, that is, if the value is set to that
   * value it will be converted to null
   *
   * @param  newValue the new value
   */
  setCurrentValue(newValue: PropertyDefinitionSupportedType):void {
    //let's get the definition
    let definition = PropertyDefinition
      .supportedTypesStandard[this.rawData.type];
    //find whether there is a nullable value and if it matches
    let newActualValue = definition.nullableDefault === newValue ?
      null : newValue;

    //we run some very basic validations, if this is a number and you put in
    //a string then something is clearly wrong
    //other kinds of invalid values are ok
    if (definition.json && typeof newActualValue !== definition.json){
      throw new Error("Invalid value " + JSON.stringify(newActualValue));
    }
    if (definition.validate && !definition.validate(newActualValue)){
      throw new Error("Invalid value " + JSON.stringify(newActualValue));
    }

    //if the value differs we set it for the new
    //note that the value is set and never check
    if (newActualValue !== this.state_value){
      this.state_value = newActualValue;
      this.state_valueModified = true;
      this.onStateChange();
    }
  }

  /**
   * Externally checks a valid value for this input using all
   * its guns
   * @param  value the new value to set
   * @return       a boolean
   */
  isValidValue(value: PropertyDefinitionSupportedType):boolean {
    return PropertyDefinition.isValidValue(
      this.rawData,
      value,
      true
    );
  }

  static isValidValue(
    propertyDefinitionRaw: PropertyDefinitionRawJSONDataType,
    value: PropertyDefinitionSupportedType,
    checkAgainstValues: boolean
  ):boolean {
    if (propertyDefinitionRaw.nullable && value === null){
      return true;
    }
    if (propertyDefinitionRaw.values &&
      checkAgainstValues &&
      !propertyDefinitionRaw.values.includes(value)){
      return false;
    }
    //we get the definition and run basic checks
    let definition = PropertyDefinition
      .supportedTypesStandard[propertyDefinitionRaw.type];
    if (definition.json && typeof value !== definition.json){
      return false;
    }
    if (definition.validate && !definition.validate(value)){
      return false
    }

    if (typeof propertyDefinitionRaw.min !== "undefined" &&
      ((<PropertyDefinitionSupportedCurrencyType>value).value ||
        value) < propertyDefinitionRaw.min){
      return false;
    } else if (typeof propertyDefinitionRaw.max !== "undefined" &&
      ((<PropertyDefinitionSupportedCurrencyType>value).value ||
        value) > propertyDefinitionRaw.max){
      return false;
    } else if (typeof propertyDefinitionRaw.maxLength !== "undefined" &&
      (<string>value).length > propertyDefinitionRaw.maxLength){
      return false;
    } else if (typeof propertyDefinitionRaw.minLength !== "undefined" &&
      (<string>value).length < propertyDefinitionRaw.minLength){
      return false;
    } else if (typeof propertyDefinitionRaw.maxDecimalCount !== "number"){
      let splittedDecimals =
        ((<PropertyDefinitionSupportedCurrencyType>value).value || value)
        .toString().split(".");
      if (splittedDecimals[1] &&
        splittedDecimals[1].length > propertyDefinitionRaw.maxDecimalCount){
        return false;
      }
    }

    return true;
  }

  /**
   * Tells if the property is an extension
   * from the propext list, they usually have priority
   * @return a boolean
   */
  checkIfIsExtension():boolean {
    return !!this.rawData.isExtension;
  }

  /**
   * Returns the locale data definition, or null
   * @param  locale the locale
   * @return
   */
  getI18nDataFor(locale: string):any {
    if (!this.rawData.i18nData){
      return null;
    }
    return this.rawData.i18nData[locale] || null;
  }

  //These are here but only truly available in non production
  static schema:any;
  static supportedTypesStandard = PROPERTY_DEFINITION_SUPPORTED_TYPES_STANDARD;
}

//We set the value of those if non in production
//These are very useful debugging utilities
if (process.env.NODE_ENV !== "production") {

  let valueOneOf = [
    {
      type: "string"
    },
    {
      type: "boolean"
    },
    {
      type: "number"
    }
  ]

  let searchLevels = ["always", "moderate", "rare", "disabled"];

  //The schema for the definition
  //{
  //  "amount": 4,
  //  "type": "car"
  //},
  //properties can be any string
  //the values must be boolean string or number
  //we should have at least one
  PropertyDefinition.schema = {
    $id: "PropertyDefinition2",
    type: "object",
    properties: {
      id: {
        type: "string",
        pattern: "^[a-zA-Z0-9-]+$"
      },
      i18nData: {
        type: "object"
      },
      type:  {
        type: "string"
      },
      rare: {
        type: "boolean"
      },
      min: {
        type: "number"
      },
      max: {
        type: "number"
      },
      maxLength: {
        type: "number",
        minimum: 0
      },
      minLength: {
        type: "number",
        minimum: 0
      },
      maxDecimalCount: {
        type: "number",
        minimum: 0
      },
      values: {
        type: "array",
        items: {
          oneOf: valueOneOf
        }
      },
      nullable: {
        type: "boolean"
      },
      autocomplete: {
        type: "string"
      },
      autocompleteSetFromProperty: {
        type: "array",
        items: {
          type: "string"
        }
      },
      autocompleteIsEnforced: {
        type: "boolean"
      },
      autocompleteSupportsPrefills: {
        type: "boolean"
      },
      default: {
        oneOf: valueOneOf
      },
      defaultIf: {
        type: "array",
        items: {
          type: "object",
          properties: {
            if: {
              $ref: ConditionalRuleSet.schema.$id
            },
            value: {
              oneOf: valueOneOf
            }
          },
          additionalProperties: false,
          required: ["value", "if"]
        },
        minItems: 1
      },
      enforcedValues: {
        type: "array",
        items: {
          type: "object",
          properties: {
            if: {
              $ref: ConditionalRuleSet.schema.$id
            },
            value: {
              oneOf: valueOneOf
            }
          },
          additionalProperties: false,
          required: ["value", "if"]
        },
        minItems: 1
      },
      nullIfHidden: {
        type: "boolean"
      },
      enforcedValue: {
        oneOf: valueOneOf
      },
      hidden: {
        type: "boolean"
      },
      hiddenIf: {
        $ref: ConditionalRuleSet.schema.$id
      },
      searchLevel: {
        type: "string",
        enum: searchLevels
      },
      disableRangedSearch: {
        type: "boolean"
      },
      isExtension: {
        type: "boolean"
      }
    },
    additionalProperties: false,
    definitions: {
      ConditionalRuleSet: ConditionalRuleSet.schema
    },
    required: ["id", "type"]
  };
}
