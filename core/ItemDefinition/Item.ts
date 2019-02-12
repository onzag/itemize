/**
 * This class provides the utilities for the description of an item
 * it's one of the most important classes that defines how an item is added
 * based on an existant item defintion
 *
 * An item is described mainly by its name and such name must be a valid
 * import for the item definition that its parent holds, for example
 * lets say we have an item definition for Car which has wheels in it
 *
 * {
 *  "name": "wheels",
 *  "enforcedProperties": {
 *    "mainAmount": 4
 *  },
 *  "predefinedProperties": {
 *    "spares": 1
 *  },
 *  "excludedIf": {
 *    "property": "hover-car",
 *    "comparator": "equals",
 *    "value": true
 *  },
 *  "sinkIn": [
 *    "material"
 *  ]
 * },
 *
 * This is a simple example where
 */

//lets do the import, item definition depends on conditional rule set
//and property value mapping
import ItemDefinition from '../ItemDefinition';
import PropertiesValueMappingDefiniton,
  { PropertiesValueMappingDefinitonRawJSONDataType } from
  './PropertiesValueMappingDefiniton';
import ConditionalRuleSet, { ConditionalRuleSetRawJSONDataType } from
  './ConditionalRuleSet';

//the ajv compiler, conditionally imported
let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv({schemaId: 'id'});
}

//this is what our raw json looks like
export interface ItemRawJSONDataType {
  name: string,
  enforcedProperties?: PropertiesValueMappingDefinitonRawJSONDataType,
  predefinedProperties?: PropertiesValueMappingDefinitonRawJSONDataType,
  excludedIf: ConditionalRuleSetRawJSONDataType,
  mightExclude?: boolean,
  mightExcludeIf?: ConditionalRuleSetRawJSONDataType,
  defaultExcluded?: boolean,
  defaultExcludedIf?: ConditionalRuleSetRawJSONDataType,
  rare?: boolean,
  sinkIn?: Array<string>
}

//And here we do the class definition
export default class Item {
  //The basics
  public parentItemDefinition:ItemDefinition;
  public parent:any;

  //the data that comes from the raw json is to be processed here
  private itemDefinition: ItemDefinition;
  private enforcedProperties: PropertiesValueMappingDefiniton;
  private predefinedProperties: PropertiesValueMappingDefiniton;
  private excludedIf: ConditionalRuleSet;
  private mightExclude: boolean;
  private mightExcludeIf: ConditionalRuleSet;
  private defaultExcluded: boolean;
  private defaultExcludedIf: ConditionalRuleSet;
  private rare: boolean;
  private sinkIn: Array<string>;

  //This class needs initialization, for efficiency purposes
  //it makes no sense to initialize the conditions of the class
  //for its state when not everything is loaded
  private initialized:boolean;

  //representing the state of the class
  private onStateChange:()=>any;
  private state_isExcluded:boolean;
  private state_hasBeenModified:boolean;

  /**
   * The constructor for an Item
   * @param rawJSON                the raw data as JSON
   * @param parent                 the parent of this node, usually an Item
   * @param parentItemDefinition   the item definition that this node is
   *                               located, its root; for the example above that
   *                               would be the vehicle item definition
   * @param onStateChange          A function that runs when the state
   *                               of the current item changes
   */
  constructor(
    rawJSON: ItemRawJSONDataType,
    parent: any,
    parentItemDefinition: ItemDefinition,
    onStateChange: ()=>any){

    //If its not production run the checks
    if (process.env.NODE_ENV !== "production") {
      Item.check(rawJSON, parent, parentItemDefinition);
    }

    //lets get an instance for the item definition for this
    //item, this is because we need to set properties for this specific
    //item and we don't want to be polluting the main item definition
    this.itemDefinition = parentItemDefinition
      .getItemDefinitionFor(rawJSON.name).getNewInstance();

    //we add an event listener to the parent to recalculate
    //the exclusion state whenever the parent state changes
    parentItemDefinition
      .addOnStateChangeListener(this.recalculateExclusionState);

    //the enforced properties list
    this.enforcedProperties = rawJSON.enforcedProperties &&
      new PropertiesValueMappingDefiniton(rawJSON.enforcedProperties, this,
        parentItemDefinition, this.itemDefinition);

    //the predefined properties list
    this.predefinedProperties = rawJSON.predefinedProperties &&
      new PropertiesValueMappingDefiniton(rawJSON.predefinedProperties, this,
        parentItemDefinition, this.itemDefinition);

    //If this is going to be excluded
    this.excludedIf = rawJSON.excludedIf &&
      new ConditionalRuleSet(rawJSON.excludedIf, this, parentItemDefinition);

    //if this might be excluded
    this.mightExclude = rawJSON.mightExclude;

    this.mightExcludeIf = rawJSON.mightExcludeIf &&
      new ConditionalRuleSet(rawJSON.mightExcludeIf, this, parentItemDefinition);

    //Default exclusion rules
    this.defaultExcluded = rawJSON.defaultExcluded;

    this.defaultExcludedIf = rawJSON.defaultExcludedIf &&
      new ConditionalRuleSet(rawJSON.defaultExcludedIf, this,
        parentItemDefinition);

    //whether this is rare
    this.rare = rawJSON.rare;

    //parent node and item definition
    this.parent = parent;
    this.parentItemDefinition = parentItemDefinition;

    //state
    this.onStateChange = onStateChange;
    this.state_hasBeenModified = false;
    this.initialized = false;
  }

  /**
   * Initializes an instance, must be run before anything
   * the reason there is a initialize function is because this class
   * might be instantiated before all the parent tree is ready, and it
   * needs for all the properties to be ready in order to be of use
   */
  initialize():void {
    //initialization function
    if (this.initialized){
      throw new Error("Item has already been initialized");
    }

    //we need to set the state lets check whether is excluded by force
    //that is if excludedIf returns true
    let isExcludedByForce = this.excludedIf && this.excludedIf.evaluate();

    //lets check whether it can be excluded (toggled by the user)
    let canBeExcluded = this.mightExclude || (this.mightExcludeIf &&
      this.mightExcludeIf.evaluate());

    //and lets check if by default is excluded
    let isDefaultExcluded = this.defaultExcluded ||
      (this.defaultExcludedIf && this.defaultExcludedIf.evaluate());

    //so now we check what the initial state is going to be
    //the primary is if it's excluded by force, if not then it'd
    //be whether it is default excluded (only if it can be excluded)
    //otherwise is false
    this.state_isExcluded = isExcludedByForce ||
      (canBeExcluded && isDefaultExcluded) || false;

    //lets setup the enforced and predefined properties in the item
    //definition that we have instantiated before
    this.enforcedProperties.getPropertyMap()
      .concat(this.predefinedProperties.getPropertyMap()).forEach(mapSet=>{
      this.itemDefinition
        .getPropertyDefinitionFor(mapSet.propertyName)
        .setCurrentValue(mapSet.value);
    });

    //set the flag as initialized
    this.initialized = true;
  }

  /**
   * Recalcuates whether it's excluded or not
   */
  recalculateExclusionState():void {
    if (!this.initialized){
      throw new Error("Item has not been initialized");
    }

    //let's check if it's excluded by force
    let isExcludedByForce = this.excludedIf && this.excludedIf.evaluate();

    //if it can be excluded
    let canBeExcluded = this.mightExclude || (this.mightExcludeIf &&
      this.mightExcludeIf.evaluate());

    //and if by default is excluded
    let isDefaultExcluded = this.defaultExcluded ||
      (this.defaultExcludedIf && this.defaultExcludedIf.evaluate());

    //if it's excluded by force and is not excluded
    if (isExcludedByForce && !this.state_isExcluded){
      //set it to excluded and trigger a state change
      this.state_isExcluded = true;
      this.onStateChange();
      return;
    } else if (!canBeExcluded && this.state_isExcluded){
      //also if it cannot be excluded set it to false
      this.state_isExcluded = false;
      this.onStateChange();
      return;
    }

    //if it hasn't been modified set it to the default
    //the reason for this is that state can be recalculated all the time
    //for every little reason some of which might not be the user
    if (!this.state_hasBeenModified){
      this.state_isExcluded = isDefaultExcluded || false;
    }
  }

  /**
   * Tells whether the current item is excluded, must have been
   * Initialized
   * @return a boolean whether it's excluded or not
   */
  isCurrentlyExcluded():boolean {
    if (!this.initialized){
      throw new Error("Item has not been initialized");
    }

    return this.state_isExcluded;
  }

  /**
   * Tells whether the exclusion state can be toggled externally
   * This is for when an item might be included
   * like how a car might have a spare wheel or not usually the
   * case is true but it might be false as well
   * @return a boolean that tells whether if it can be toggled
   */
  canExclusionBeToggled():boolean {
    if (!this.initialized){
      throw new Error("Item has not been initialized");
    }

    //if it's excluded by force the default is false, you cannot toggle
    //anything excluded by force
    let isExcludedByForce = this.excludedIf && this.excludedIf.evaluate();
    if (isExcludedByForce){
      return false;
    }

    //otherwise it depends to what might exclude provides
    return this.mightExclude || (this.mightExcludeIf &&
      this.mightExcludeIf.evaluate()) || false;
  }

  /**
   * Toggles the exclusion state and triggers an on state change
   * event, note that exclusion must be able to be toggled otherwise
   * it'd throw an error
   */
  toggleExclusionState():void {
    if (!this.initialized){
      throw new Error("Item has not been initialized");
    } else if (!this.canExclusionBeToggled()){
      throw new Error("Exclusion cannot be toggled");
    }

    //basically set it up as it has been externally modified
    this.state_hasBeenModified = true;
    //change the exclusion state
    this.state_isExcluded = !this.state_isExcluded;
    //trigger an state change
    this.onStateChange();
  }

  /**
   * Just returns whether is a rare element or not
   * used for ordering
   */
  isRare():boolean {
    return this.rare;
  }

  /**
   * Checks whether there are sinking properties
   */
  hasSinkingProperties(){
    return !!this.sinkIn.length;
  }

  /**
   * Gives the list of sinking properties, these are modifiable
   * and come from the instance itself
   * @return an array of property definitions you can set up
   */
  getSinkingPropertiesList(){
    return (this.sinkIn || [])
      .map(propertyName=>this.itemDefinition
        .getPropertyDefinitionFor(propertyName));
  }

  //These are here but only truly available in non production
  static schema:any;
  static schema_validate:any;
  static check:any;
}

if (process.env.NODE_ENV !== "production") {

  //The schema for the item
  Item.schema = {
    type: "object",
    properties: {
      name: {
        type: "string"
      },
      enforcedProperties: {},
      predefinedProperties: {},
      excludedIf: {},
      mightExclude: {
        type: "boolean"
      },
      mightExcludeIf: {},
      defaultExcluded: {
        type: "boolean"
      },
      defaultExcludedIf: {},
      rare: {
        type: "boolean"
      },
      sinkIn: {
        type: "array",
        items: {
          type: "string"
        }
      }
    },
    required: ["name"],
    additionalProperties: false
  };

  //the validation function created by ajv
  Item.schema_validate =
    ajv.compile(PropertiesValueMappingDefiniton.schema);

  //the checker, takes the same arguments as the constructor
  Item.check = function(
    rawJSON: ItemRawJSONDataType,
    parent: any,
    parentItemDefinition: ItemDefinition,
    onStateChange: ()=>any){

    //we check the schema for validity
    let valid = Item.schema_validate(rawJSON);

    //if not valid throw the errors
    if (!valid) {
      console.error(Item.schema_validate.errors);
      throw new Error("Check Failed");
    };

    //check whether the item definition exists for this item
    //it must exist to be an item
    if (!parentItemDefinition.hasItemDefinitionFor(rawJSON.name)){
      console.error("Missing item definition for",
        rawJSON, "for", rawJSON.name);
      throw new Error("Check Failed");
    }

    //get all the predefined properties or an empty array
    let predefinedPropertiesKeys = rawJSON.predefinedProperties ?
      Object.keys(rawJSON.predefinedProperties) : [];

    //The same for the enforced
    let enforcedPropertiesKeys = rawJSON.enforcedProperties ?
      Object.keys(rawJSON.enforcedProperties) : [];

    //we don't need to check whether this properties exist in
    //the item definition because PropertiesValueMappingDefiniton does that

    //see if there are shared between both arrays
    let sharedItems = predefinedPropertiesKeys
      .filter(value => -1 !== enforcedPropertiesKeys.indexOf(value));

    //predefined properties and enforced properties must not be shared
    //for the simple reason that enforced properties are set in stone
    if (sharedItems.length){
      console.error("predefined and enforced properties collision at",
        rawJSON, "for", sharedItems);
      throw new Error("Check Failed");
    }

    //Now we check again this time against the sinkIn properties
    let sharedItems2 = (rawJSON.sinkIn || [])
      .filter(value => -1 !== enforcedPropertiesKeys.indexOf(value));

    //equally there might not be a collision here, enforced properties
    //need not to sink in
    if (sharedItems2.length){
      console.error("sink in properties and enforced properties collision at",
        rawJSON, "for", sharedItems2);
      throw new Error("Check Failed");
    }

    //Now we check whether this properties exist for sinkin
    //unlike predefinedProperties and enforcedProperties nothing checks
    //sinkIn properties
    if (rawJSON.sinkIn){
      let itemDefinition = parentItemDefinition
        .getItemDefinitionFor(rawJSON.name);

      let propertyToSinkIn;
      for (propertyToSinkIn of rawJSON.sinkIn){
        if (!itemDefinition.hasPropertyDefinitionFor(propertyToSinkIn)){
          console.error("Missing property in item definition for",
            rawJSON, "to sink in", propertyToSinkIn);
          throw new Error("Check Failed");
        }
      }
    }

    //Check Conflicting defaultExcluded and defaultExcludedIf
    if (typeof rawJSON.defaultExcluded !== "undefined" &&
      typeof rawJSON.defaultExcludedIf !== "undefined"){
      console.error("Conflicting properties in",
        rawJSON, "for defaultExcluded and defaultExcludedIf");
      throw new Error("Check Failed");
    }

    //also Conflicting mightExclude and mightExcludeIf
    if (typeof rawJSON.mightExclude !== "undefined" &&
      typeof rawJSON.mightExcludeIf !== "undefined"){
      console.error("Conflicting properties in",
        rawJSON, "for mightExclude and mightExcludeIf");
      throw new Error("Check Failed");
    }
  }
}
