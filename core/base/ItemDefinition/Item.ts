// lets do the import, item definition depends on conditional rule set
// and property value mapping
import ItemDefinition, { IItemDefinitionValue } from ".";
import PropertiesValueMappingDefiniton,
  {
    IPropertiesValueMappingDefinitonRawJSONDataType,
  } from "./PropertiesValueMappingDefiniton";
import ConditionalRuleSet, {
  IConditionalRuleSetRawJSONDataType,
} from "./ConditionalRuleSet";
import Module, { OnStateChangeListenerType } from "../Module";

export interface IItemValue {
  isExcluded: boolean;
  isMissing: boolean;
  canExclusionBeSet: boolean;
  item: Item;
  itemDefinition: ItemDefinition;
  itemDefinitionValue: IItemDefinitionValue;
}

// this is what our raw json looks like
export interface IItemRawJSONDataType {
  id: string;
  name: string;
  i18nName?: {
    [locale: string]: string,
  };
  enforcedProperties?: IPropertiesValueMappingDefinitonRawJSONDataType;
  predefinedProperties?: IPropertiesValueMappingDefinitonRawJSONDataType;
  excludedIf?: IConditionalRuleSetRawJSONDataType;
  mightExclude?: boolean;
  mightExcludeIf?: IConditionalRuleSetRawJSONDataType;
  defaultExcluded?: boolean;
  defaultExcludedIf?: IConditionalRuleSetRawJSONDataType;
  sinkIn?: string[];
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

  // the data that comes from the raw json is to be processed here
  private itemDefinition?: ItemDefinition;
  private excludedIf?: ConditionalRuleSet;
  private mightExcludeIf?: ConditionalRuleSet;
  private defaultExcludedIf?: ConditionalRuleSet;

  // solo item specific attributes
  private enforcedProperties?: PropertiesValueMappingDefiniton;
  private predefinedProperties?: PropertiesValueMappingDefiniton;

  // representing the state of the class
  private onStateChangeListeners: OnStateChangeListenerType[];
  private stateIsExcluded: boolean;
  private stateIsExcludedModified: boolean;
  private stateIsMissing: boolean;

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
        parentModule, parentItemDefinition, null, this);

    // If it might be excluded
    this.mightExcludeIf = rawJSON.mightExcludeIf &&
      new ConditionalRuleSet(rawJSON.mightExcludeIf,
        parentModule, parentItemDefinition, null, this);

    // if it's default excluded
    this.defaultExcludedIf = rawJSON.defaultExcludedIf &&
      new ConditionalRuleSet(
        rawJSON.defaultExcludedIf,
        parentModule,
        parentItemDefinition,
        null,
        this,
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
    // missing is non default
    this.stateIsMissing = false;
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
   * @returns a boolean
   */
  public isCurrentlyMissing(): boolean {
    return this.stateIsMissing;
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

  public setExclusionState(value: boolean) {
    this.stateIsExcluded = value;
    this.stateIsExcludedModified = true;

    // trigger an state change
    this.onStateChangeListeners.forEach((l) => l());
  }

  public setMissingState(value: boolean) {
    this.stateIsMissing = value;

    // trigger an state change
    this.onStateChangeListeners.forEach((l) => l());
  }

  public getName() {
    return this.rawData.name;
  }

  public getId() {
    return this.rawData.id;
  }

  public getCurrentValue(): IItemValue {
    return {
      isExcluded: this.isCurrentlyExcluded(),
      isMissing: this.isCurrentlyMissing(),
      canExclusionBeSet: this.canExclusionBeSet(),
      item: this,
      itemDefinition: this.itemDefinition,
      itemDefinitionValue: this.itemDefinition.getCurrentValue(this.rawData.sinkIn || [], true),
    };
  }

  /**
   * Gives the i18 name that was specified
   * or otherwise gives the item definition i18 name
   * @param  locale the locale iso form
   * @returns a string or null (if locale not valid)
   */
  public getI18nNameFor(locale: string) {
    if (this.rawData.i18nName && this.rawData.i18nName[locale]) {
      return this.rawData.i18nName[locale] || null;
    }

    const parentItemDefinitionI18nData = this.itemDefinition.getI18nDataFor(locale);
    return parentItemDefinitionI18nData && parentItemDefinitionI18nData.name;
  }

  public addOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    this.onStateChangeListeners.push(listener);
  }

  public removeOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    const index = this.onStateChangeListeners.indexOf(listener);
    if (index !== -1) {
      this.onStateChangeListeners.splice(index, 1);
    }
  }

  public toJSON() {
    return this.rawData;
  }
}

if (process.env.NODE_ENV !== "production") {
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
      sinkIn: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    definitions: {
      PropertiesValueMappingDefiniton: PropertiesValueMappingDefiniton.schema,
      ConditionalRuleSet: ConditionalRuleSet.schema,
    },
    required: ["id", "name"],
    additionalProperties: false,
  };
}
