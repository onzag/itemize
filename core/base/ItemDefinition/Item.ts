// lets do the import, item definition depends on conditional rule set
// and property value mapping
import ItemDefinition from ".";
import PropertiesValueMappingDefiniton,
  {
    IPropertiesValueMappingDefinitonRawJSONDataType,
  } from "./PropertiesValueMappingDefiniton";
import ConditionalRuleSet, {
  IConditionalRuleSetRawJSONDataType,
} from "./ConditionalRuleSet";
import Module, { OnStateChangeListenerType } from "../Module";

export type ItemGateType = "or" | "and" | "xor";

export interface IItemGroupHandle {
  items: IItemGroupHandle[];
  gate: ItemGateType;
}

// this is what our raw json looks like
export interface IItemRawJSONDataType {
  id: string;
  name?: string;
  i18nName?: {
    [locale: string]: string,
  };
  items?: IItemRawJSONDataType[];
  enforcedProperties?: IPropertiesValueMappingDefinitonRawJSONDataType;
  predefinedProperties?: IPropertiesValueMappingDefinitonRawJSONDataType;
  excludedIf?: IConditionalRuleSetRawJSONDataType;
  mightExclude?: boolean;
  mightExcludeIf?: IConditionalRuleSetRawJSONDataType;
  defaultExcluded?: boolean;
  defaultExcludedIf?: IConditionalRuleSetRawJSONDataType;
  rare?: boolean;
  sinkIn?: string[];
  gate?: ItemGateType;
}

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
 * An item might also be a group of items with a gate
 */
export default class Item {
  /**
   * Schema only available in development
   */
  public static schema: any;

  // The basics
  public rawData: IItemRawJSONDataType;
  public parentItemDefinition: ItemDefinition;
  public parentModule: Module;

  // attribute to know if this item is actually an item group
  private isGroup: boolean;

  // the data that comes from the raw json is to be processed here
  private itemDefinition?: ItemDefinition;
  private excludedIf?: ConditionalRuleSet;
  private mightExcludeIf?: ConditionalRuleSet;
  private defaultExcludedIf?: ConditionalRuleSet;

  // solo item specific attributes
  private enforcedProperties?: PropertiesValueMappingDefiniton;
  private predefinedProperties?: PropertiesValueMappingDefiniton;

  // Group item specific attributes
  private items?: Item[];

  // representing the state of the class
  private onStateChangeListeners: OnStateChangeListenerType[];
  private stateIsExcluded: boolean;
  private stateIsExcludedModified: boolean;
  private stateIsPhantomExcluded: boolean;

  /**
   * The constructor for an Item
   * @param rawJSON the raw data as JSON
   * @param parentModule the parent module
   * @param parentItemDefinition   the item definition that this node is
   * located, its root; for the example above that
   * would be the vehicle item definition
   */
  constructor(
    rawJSON: IItemRawJSONDataType,
    parentModule: Module,
    parentItemDefinition: ItemDefinition,
  ) {

    this.rawData = rawJSON;

    // check whether it is a group
    this.isGroup = !!rawJSON.items;

    // put the items and the gate in place
    this.items = rawJSON.items && rawJSON.items.map((rawJSONItem) =>
      (new Item(rawJSONItem, parentModule, parentItemDefinition)));

    // the enforced properties list
    this.enforcedProperties = rawJSON.enforcedProperties &&
      new PropertiesValueMappingDefiniton(rawJSON.enforcedProperties,
        parentItemDefinition, this.itemDefinition);

    // the predefined properties list
    this.predefinedProperties = rawJSON.predefinedProperties &&
      new PropertiesValueMappingDefiniton(rawJSON.predefinedProperties,
        parentItemDefinition, this.itemDefinition);

    // lets get an instance for the item definition for this
    // item, if there's one, and let's detach it
    this.itemDefinition = rawJSON.name && parentItemDefinition
      .getItemDefinitionFor(rawJSON.name).getNewInstance();
    // set the enforced and predefined properties overwrites
    // if needed to
    if (this.enforcedProperties) {
      this.enforcedProperties.getPropertyMap().forEach((p) => {
        this.itemDefinition.getPropertyDefinitionFor(p.id, true)
          .setSuperEnforced(p.value);
      });
    }
    if (this.predefinedProperties) {
      this.predefinedProperties.getPropertyMap().forEach((p) => {
        this.itemDefinition.getPropertyDefinitionFor(p.id, true)
          .setSuperDefault(p.value);
      });
    }

    // If this is going to be excluded
    this.excludedIf = rawJSON.excludedIf &&
      new ConditionalRuleSet(rawJSON.excludedIf,
        parentModule, parentItemDefinition);

    // If it might be excluded
    this.mightExcludeIf = rawJSON.mightExcludeIf &&
      new ConditionalRuleSet(rawJSON.mightExcludeIf,
        parentModule, parentItemDefinition);

    // if it's default excluded
    this.defaultExcludedIf = rawJSON.defaultExcludedIf &&
      new ConditionalRuleSet(
        rawJSON.defaultExcludedIf,
        parentModule,
        parentItemDefinition,
      );

    // parent item definition
    this.parentItemDefinition = parentItemDefinition;
    this.parentModule = parentModule;

    // State management
    this.onStateChangeListeners = [];
    // The initial state is unknown
    // due to the defaults
    // this will never be visible as null because only
    // modified states are the only ones that will show
    this.stateIsExcluded = null;
    // initially the state hasn't been modified
    this.stateIsExcludedModified = false;
    // phanthom excluded are non default
    this.stateIsPhantomExcluded = false;
  }

  /**
   * Tells whether the current item is excluded
   * @return a boolean whether it's excluded or not
   */
  public isCurrentlyExcluded(): boolean {
    // let's check if it's excluded by force
    const isExcludedByForce = this.excludedIf && this.excludedIf.evaluate();

    if (isExcludedByForce) {
      return true;
    }

    // if it can be excluded
    const canBeExcluded = this.rawData.mightExclude || (this.mightExcludeIf &&
      this.mightExcludeIf.evaluate());
    if (canBeExcluded) {
      // if it hasn't been modified we return the default state
      if (!this.stateIsExcludedModified) {
        // depending on the condition
        const isDefaultExcluded = this.rawData.defaultExcluded ||
          (this.defaultExcludedIf && this.defaultExcludedIf.evaluate()) ||
          false;
        // by default the excluded would be false
        return isDefaultExcluded;
      }
      return this.stateIsExcluded;
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
   * @returns a boolean
   */
  public isCurrentlyPhantomExcluded(): boolean {
    return this.stateIsPhantomExcluded;
  }

  /**
   * Tells whether the exclusion state can be toggled externally
   * This is for when an item might be included
   * like how a car might have a spare wheel or not usually the
   * case is true but it might be false as well
   * @returns a boolean that tells whether if it can be toggled
   */
  public canExclusionBeSet(): boolean {
    // if it's excluded by force the default is false, you cannot toggle
    // anything excluded by force
    const isExcludedByForce = this.excludedIf && this.excludedIf.evaluate();
    if (isExcludedByForce) {
      return false;
    }

    // otherwise it depends to what might exclude provides
    return this.rawData.mightExclude || (this.mightExcludeIf &&
      this.mightExcludeIf.evaluate()) || false;
  }

  /**
   * Toggles the exclusion state and triggers an on state change
   * event, note that exclusion must be able to be toggled otherwise
   * it'd throw an error
   * @throws an error if exclusion cannot be set or if you try
   * phanthom when exclusion can be set
   */
  public setExclusionState(value: boolean, phantom: boolean) {
    if (!phantom && !this.canExclusionBeSet()) {
      throw new Error("Exclusion cannot be set");
    } else if (phantom && this.canExclusionBeSet()) {
      throw new Error("Using phantom excludes when exclusion can be set");
    }

    if (phantom) {
      // change the forced excluded state, this does not
      // affect the real exclusion state
      this.stateIsPhantomExcluded = value;
    } else {
      // change the exclusion state
      this.stateIsExcluded = value;
      this.stateIsExcludedModified = true;
    }
    // trigger an state change
    this.onStateChangeListeners.forEach((l) => l());
  }

  /**
   * It basically flattens and filters the whole item
   * for single item definitions (non group)
   * @param  name the name of the item
   * @returns an array of items that are not group
   */
  public findSingleItemInstancesForName(name: string): Item[] {
    if (!this.isGroup) {
      return this.itemDefinition.getName() === name ? [this] : [];
    }

    // Concats all the results
    return [].concat.apply(this.items.map((i) =>
      i.findSingleItemInstancesForName(name)));
  }

  /**
   * Just returns whether is a rare element or not
   * used for ordering
   */
  public isRare(): boolean {
    return this.rawData.rare;
  }

  /**
   * Checks whether there are sinking properties
   * @throws an error if it's a group
   */
  public hasSinkingProperties() {
    if (this.isGroup) {
      throw new Error("Item is a group hence has no sinking properties");
    }
    return !!(this.rawData.sinkIn && this.rawData.sinkIn.length);
  }

  /**
   * Gives the list of sinking properties, these are modifiable
   * and come from the instance itself
   * @throws an error if it's a group
   * @returns an array of property definitions you can set up
   */
  public getSinkingPropertiesList() {
    if (this.isGroup) {
      throw new Error("Item is a group hence has no sinking properties");
    }
    return (this.rawData.sinkIn || [])
      .map((propertyName) => this.itemDefinition
        .getPropertyDefinitionFor(propertyName, false));
  }

  /**
   * Tells whether this item is a group of items
   * @returns a boolean
   */
  public isItemGroup(): boolean {
    return this.isGroup;
  }

  /**
   * Provides the current gate
   * @returns the gate, or, and or xor
   */
  public getGate(): ItemGateType {
    return this.rawData.gate;
  }

  /**
   * Tells if an item (whether a group or not)
   * might currently contain another item, it doesn't
   * say it for sure because items might be excluded currently
   * but it allows to narrow a search
   *
   * @param  name the name of the item definition
   * @returns a boolean for whether yes or no
   */
  public containsItem(name: string): boolean {
    if (!this.isGroup) {
      return this.itemDefinition.getName() === name;
    }
    return this.items.some((i) => i.containsItem(name));
  }

  /**
   * Gets the definition name
   * @throws an error
   * @returns a string with the name
   */
  public getDefinitionName(): string {
    if (this.isGroup) {
      throw new Error("Groups have no item definitions");
    }
    return this.itemDefinition.getName();
  }

  /**
   * Returns a list with the usable items with the respective gate
   * or otherwise would return a single item, ands are merged, groups
   * are gone, null is for when no candidate was available
   * @returns the list, single item or null
   */
  public getCurrentUsableItems(): IItemGroupHandle | Item {
    // if it's currently excluded and exclusion cannot be set
    if (this.isCurrentlyExcluded() && !this.canExclusionBeSet()) {
      // return null because it's effectively a void
      return null;
    } else if (!this.isGroup) {
      // if it's not group then return itself
      return this;
    }

    // otherwise lets get the usable items
    // within this group
    const usableItems = this.items
      .map((i) => i.getCurrentUsableItems())
      // We filter to remove nulls
      .filter((usableItemsOfChild) => usableItemsOfChild);

    // if we get nothing from this group
    if (usableItems.length === 0) {
      // it's again effectively a void
      return null;
    // if we get one
    } else if (usableItems.length === 1) {
      // Then we return that item as one
      return usableItems[0];
    }

    // Otherwise we return the usable items with the gate
    return {
      items: usableItems,
      gate: this.getGate(),
    } as IItemGroupHandle;
  }

  /**
   * Gives the i18 name that was specified
   * or otherwise gives the item definition i18 name
   * @param  locale the locale iso form
   * @returns a string or null (if locale not valid)
   */
  public getI18nNameFor(locale: string) {
    if (this.rawData.i18nName) {
      return this.rawData.i18nName[locale] || null;
    }

    const parentItemDefinitionI18nData = this.itemDefinition.getI18nDataFor(locale);
    return parentItemDefinitionI18nData && parentItemDefinitionI18nData.name;
  }

  public addOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    this.onStateChangeListeners.push(listener);

    if (this.items) {
      this.items.forEach((i) => i.addOnStateChangeEventListener(listener));
    }
  }

  public removeOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    const index = this.onStateChangeListeners.indexOf(listener);
    if (index !== -1) {
      this.onStateChangeListeners.splice(index, 1);
    }

    if (this.items) {
      this.items.forEach((i) => i.removeOnStateChangeEventListener(listener));
    }
  }
}

if (process.env.NODE_ENV !== "production") {

  const gates = ["and", "or", "xor"];
  // The schema for the item
  Item.schema = {
    $id: "Item",
    type: "object",
    properties: {
      id: {
        type: "string",
        pattern: "^[a-z_]+$",
      },
      name: {
        type: "string",
        pattern: "^[a-z_]+$",
      },
      enforcedProperties: {
        $ref: PropertiesValueMappingDefiniton.schema.$id,
      },
      predefinedProperties: {
        $ref: PropertiesValueMappingDefiniton.schema.$id,
      },
      excludedIf: {
        $ref: ConditionalRuleSet.schema.$id,
      },
      mightExclude: {
        type: "boolean",
      },
      mightExcludeIf: {
        $ref: ConditionalRuleSet.schema.$id,
      },
      defaultExcluded: {
        type: "boolean",
      },
      defaultExcludedIf: {
        $ref: ConditionalRuleSet.schema.$id,
      },
      rare: {
        type: "boolean",
      },
      sinkIn: {
        type: "array",
        items: {
          type: "string",
        },
      },
      gate: {
        type: "string",
        enum: gates,
      },
      items: {
        type: "array",
        items: {
          $ref: "Item",
        },
      },
    },
    definitions: {
      PropertiesValueMappingDefiniton: PropertiesValueMappingDefiniton.schema,
      ConditionalRuleSet: ConditionalRuleSet.schema,
    },
    dependencies: {
      items: ["gate"],
      gate: ["items"],
    },
    required: ["id"],
    additionalProperties: false,
  };
}
