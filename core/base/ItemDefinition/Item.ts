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
import ItemDefinition from '.';
import PropertiesValueMappingDefiniton,
  { PropertiesValueMappingDefinitonRawJSONDataType } from
  './PropertiesValueMappingDefiniton';
import ConditionalRuleSet, { ConditionalRuleSetRawJSONDataType } from
  './ConditionalRuleSet';
export type ItemGateType = "or" | "and" | "xor";

export interface ItemGroupHandle {
  items: Array<ItemGroupHandle>,
  gate: ItemGateType
};

//this is what our raw json looks like
export interface ItemRawJSONDataType {
  id?: string,
  name?: string,
  i18nName?: {
    [locale: string]: string
  },
  items?: Array<ItemRawJSONDataType>,
  enforcedProperties?: PropertiesValueMappingDefinitonRawJSONDataType,
  predefinedProperties?: PropertiesValueMappingDefinitonRawJSONDataType,
  excludedIf?: ConditionalRuleSetRawJSONDataType,
  mightExclude?: boolean,
  mightExcludeIf?: ConditionalRuleSetRawJSONDataType,
  defaultExcluded?: boolean,
  defaultExcludedIf?: ConditionalRuleSetRawJSONDataType,
  rare?: boolean,
  sinkIn?: Array<string>,
  gate?: ItemGateType
}

//And here we do the class definition
export default class Item {
  //The basics
  private rawData: ItemRawJSONDataType;
  public parentItemDefinition:ItemDefinition;

  //attribute to know if this item is actually an item group
  private isGroup: boolean;

  //the data that comes from the raw json is to be processed here
  private itemDefinition?: ItemDefinition;
  private excludedIf?: ConditionalRuleSet;
  private mightExcludeIf?: ConditionalRuleSet;
  private defaultExcludedIf?: ConditionalRuleSet;

  //solo item specific attributes
  private enforcedProperties?: PropertiesValueMappingDefiniton;
  private predefinedProperties?: PropertiesValueMappingDefiniton;

  //Group item specific attributes
  private items?: Array<Item>;

  //representing the state of the class
  private onStateChange:()=>any;
  private state_isExcluded:boolean;
  private state_isExcludedModified:boolean;
  private state_isPhantomExcluded:boolean;

  /**
   * The constructor for an Item
   * @param rawJSON                the raw data as JSON
   * @param parentItemDefinition   the item definition that this node is
   *                               located, its root; for the example above that
   *                               would be the vehicle item definition
   * @param onStateChange          A function that runs when the state
   *                               of the current item changes
   */
  constructor(
    rawJSON: ItemRawJSONDataType,
    parentItemDefinition: ItemDefinition,
    onStateChange: ()=>any){

    this.rawData = rawJSON;

    //check whether it is a group
    this.isGroup = !!rawJSON.items;

    //put the items and the gate in place
    this.items = rawJSON.items && rawJSON.items.map(rawJSONItem=>
      (new Item(rawJSONItem, parentItemDefinition, onStateChange)));

    //the enforced properties list
    this.enforcedProperties = rawJSON.enforcedProperties &&
      new PropertiesValueMappingDefiniton(rawJSON.enforcedProperties,
        parentItemDefinition, this.itemDefinition);

    //the predefined properties list
    this.predefinedProperties = rawJSON.predefinedProperties &&
      new PropertiesValueMappingDefiniton(rawJSON.predefinedProperties,
        parentItemDefinition, this.itemDefinition);

    //lets get an instance for the item definition for this
    //item, this is because we need to set properties for this specific
    //item and we don't want to be polluting the main item definition
    //we modify the properties to set predefined and enforced properties
    this.itemDefinition = rawJSON.name && parentItemDefinition
      .getItemDefinitionFor(rawJSON.name).getNewInstance((p)=>{
        if (this.enforcedProperties &&
          this.enforcedProperties.hasPropertyValue(p.id)){
          return {
            ...p,
            enforcedValue: this.enforcedProperties.getPropertyValue(p.id)
          }
        } else if (this.predefinedProperties &&
          this.predefinedProperties.hasPropertyValue(p.id)){
          return {
            ...p,
            default: this.predefinedProperties.getPropertyValue(p.id)
          }
        }

        return p;
      });

    //If this is going to be excluded
    this.excludedIf = rawJSON.excludedIf &&
      new ConditionalRuleSet(rawJSON.excludedIf, parentItemDefinition);

    this.mightExcludeIf = rawJSON.mightExcludeIf &&
      new ConditionalRuleSet(rawJSON.mightExcludeIf, parentItemDefinition);

    this.defaultExcludedIf = rawJSON.defaultExcludedIf &&
      new ConditionalRuleSet(
        rawJSON.defaultExcludedIf,
        parentItemDefinition
      );

    //parent item definition
    this.parentItemDefinition = parentItemDefinition;

    //STATE MANAGEMENT
    this.onStateChange = onStateChange;

    //The initial state is unknown
    //due to the defaults
    //this will never be visible as null because only
    //modified states are the only ones that will show
    this.state_isExcluded = null;

    //initially the state hasn't been modified
    this.state_isExcludedModified = false;

    this.state_isPhantomExcluded = false;
  }

  /**
   * Tells whether the current item is excluded
   * @return a boolean whether it's excluded or not
   */
  isCurrentlyExcluded():boolean {
    //let's check if it's excluded by force
    let isExcludedByForce = this.excludedIf && this.excludedIf.evaluate();

    if (isExcludedByForce){
      return true;
    }

    //if it can be excluded
    let canBeExcluded = this.rawData.mightExclude || (this.mightExcludeIf &&
      this.mightExcludeIf.evaluate());
    if (canBeExcluded){
      //if it hasn't been modified we return the default state
      if (!this.state_isExcludedModified){
        //depending on the condition
        let isDefaultExcluded = this.rawData.defaultExcluded ||
          (this.defaultExcludedIf && this.defaultExcludedIf.evaluate()) ||
          false;
        //by default the excluded would be false
        return isDefaultExcluded;
      }
      return this.state_isExcluded;
    } else {
      return false;
    }
  }

  /**
   * The phantom exclusion is an attribute to force an exclude
   * attribute without having actual logical exclusion, this is
   * for missing items, let's say you are selling a computer
   * which for some weird reason has no processor, you'd use
   * phantom excludes, phantom excludes are for use with
   * callout excludes, basically meaning your item doesn't quite
   * meet the criteria but it is close enough
   *
   * use these smartly and don't use it if canExclusionBeToggled
   * is true because it doesn't make sense then
   *
   * @return a boolean
   */
  isCurrentlyPhantomExcluded():boolean {
    return this.state_isPhantomExcluded;
  }

  /**
   * Tells whether the exclusion state can be toggled externally
   * This is for when an item might be included
   * like how a car might have a spare wheel or not usually the
   * case is true but it might be false as well
   * @return a boolean that tells whether if it can be toggled
   */
  canExclusionBeSet():boolean {
    //if it's excluded by force the default is false, you cannot toggle
    //anything excluded by force
    let isExcludedByForce = this.excludedIf && this.excludedIf.evaluate();
    if (isExcludedByForce){
      return false;
    }

    //otherwise it depends to what might exclude provides
    return this.rawData.mightExclude || (this.mightExcludeIf &&
      this.mightExcludeIf.evaluate()) || false;
  }

  /**
   * Toggles the exclusion state and triggers an on state change
   * event, note that exclusion must be able to be toggled otherwise
   * it'd throw an error
   */
  setExclusionState(value:boolean, phantom: boolean):void {
    if (!phantom && !this.canExclusionBeSet()){
      throw new Error("Exclusion cannot be set");
    } else if (phantom && this.canExclusionBeSet()){
      throw new Error("Using phantom excludes when exclusion can be set");
    }

    if (phantom){
      //change the forced excluded state, this does not
      //affect the real exclusion state
      this.state_isPhantomExcluded = value
    } else {
      //change the exclusion state
      this.state_isExcluded = value;
      this.state_isExcludedModified = true;
    }
    //trigger an state change
    this.onStateChange();
  }

  /**
   * finds item definition that are not group from an item
   * instance
   * @param  name the name of the item
   * @return      an array of items that are not group
   */
  findSingleItemInstancesForName(name: string):Array<Item> {
    if (!this.isGroup){
      return this.itemDefinition.getName() === name ? [this] : [];
    }

    return [].concat.apply(this.items.map(i=>
      i.findSingleItemInstancesForName(name)));
  }

  /**
   * Just returns whether is a rare element or not
   * used for ordering
   */
  isRare():boolean {
    return this.rawData.rare;
  }

  /**
   * Checks whether there are sinking properties
   */
  hasSinkingProperties(){
    if (this.isGroup){
      throw new Error("Item is a group hence has no sinking properties");
    }
    return !!(this.rawData.sinkIn && this.rawData.sinkIn.length);
  }

  /**
   * Gives the list of sinking properties, these are modifiable
   * and come from the instance itself
   * @return an array of property definitions you can set up
   */
  getSinkingPropertiesList(){
    if (this.isGroup){
      throw new Error("Item is a group hence has no sinking properties");
    }
    return (this.rawData.sinkIn || [])
      .map(propertyName=>this.itemDefinition
        .getPropertyDefinitionFor(propertyName));
  }

  /**
   * Tells whether this item is a group of items
   * @return a boolean
   */
  isItemGroup():boolean {
    return this.isGroup;
  }

  /**
   * Provides the current gate
   * @return the gate, or, and or xor
   */
  getGate():ItemGateType {
    return this.rawData.gate;
  }

  /**
   * Tells if an item (whether a group or not)
   * might currently contain another item, it doesn't
   * say it for sure because items might be excluded currently
   * but it allows to narrow a search
   *
   * @param  name the name of the item definition
   * @return      a boolean for whether yes or no
   */
  mightCurrentlyContain(name: string):boolean {
    if (!this.isGroup){
      return this.itemDefinition.getName() === name;
    }
    return this.items.some(i=>i.mightCurrentlyContain(name));
  }

  /**
   * Gets the definition name
   * @return a string with the name
   */
  getDefinitionName():string {
    if (this.isGroup){
      throw new Error("Groups have no item definitions");
    }
    return this.itemDefinition.getName();
  }

  /**
   * Returns a list with the usable items with the respective gate
   * or otherwise would return a single item, ands are merged, groups
   * are gone, null is for when no candidate was available
   * @return the list, single item or null
   */
  getCurrentUsableItems(): ItemGroupHandle | Item {
    if (this.isCurrentlyExcluded() && !this.canExclusionBeSet()){
      return null;
    } else if (!this.isGroup){
      return this;
    }
    let usableItems = this.items
      .map(i=>i.getCurrentUsableItems())
      .filter(usableItems=>usableItems);

    if (usableItems.length === 0){
      return null;
    } else if (usableItems.length === 1){
      return usableItems[0]
    }
    return <ItemGroupHandle>{
      items: usableItems,
      gate: this.getGate()
    };
  }

  /**
   * Gives the i18 name that was specified
   * or otherwise gives the item definition i18 name
   * @param  locale the locale iso form
   * @return        a string or null (if locale not valid)
   */
  getI18nNameFor(locale: string){
    if (this.rawData.i18nName){
      return this.rawData.i18nName[locale] || null;
    }

    return this.itemDefinition.getI18nNameFor(locale);
  }

  //These are here but only truly available in non production
  static schema:any;
}

if (process.env.NODE_ENV !== "production") {

  let gates = ["and", "or", "xor"];
  //The schema for the item
  Item.schema = {
    type: "object",
    properties: {
      id: {
        type: "string"
      },
      name: {
        type: "string"
      },
      i18nName: {
        type: "object",
        additionalProperties: {
          type: "string"
        }
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
      },
      gate: {
        type: "string",
        enum: gates
      },
      items: {}
    },
    dependencies: {
      items: ["gate", "id"],
      gate: ["items"]
    },
    additionalProperties: false
  };
}
