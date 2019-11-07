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
import PropertyDefinition from "./PropertyDefinition";
import { PREFIX_BUILD, ITEM_PREFIX, EXCLUSION_STATE_SUFFIX, PREFIXED_CONCAT, SUFFIX_BUILD } from "../../constants";
import { GraphQLString, GraphQLNonNull, GraphQLInputObjectType, GraphQLObjectType } from "graphql";
import { ISQLTableDefinitionType, IGQLFieldsDefinitionType, ISQLTableRowValue, IGQLValue } from "../Root";

export enum ItemExclusionState {
  EXCLUDED = "EXCLUDED",
  INCLUDED = "INCLUDED",
  ANY = "ANY",
}

export interface IItemValue {
  exclusionState: ItemExclusionState;
  canExclusionBeSet: boolean;
  itemId: string;
  itemName: string;
  itemDefinitionValue: IItemDefinitionValue;
  stateExclusion: ItemExclusionState;
  stateExclusionModified: boolean;
}

// this is what our raw json looks like
export interface IItemRawJSONDataType {
  id: string;
  name: string;
  i18nData?: {
    [locale: string]: {
      name?: string;
      exclusionSelectorLabel?: string;   // label for the selector to toggle exclusion in normal mode
      exclusionTernarySelectorLabel?: string;
      calloutExcludedLabel?: string;     // label in the title for when the item is callout excluded
      excludedLabel?: string;            // describe when the item is excluded, for descriptions and the ternary mode
      includedLabel?: string;            // describe when the item is included, used only for ternary mode
      anyLabel?: string;                 // describe the inbetween, used only for ternary mode
    },
  };
  enforcedProperties?: IPropertiesValueMappingDefinitonRawJSONDataType;
  predefinedProperties?: IPropertiesValueMappingDefinitonRawJSONDataType;
  excludedIf?: IConditionalRuleSetRawJSONDataType;
  canUserExclude?: boolean;
  canUserExcludeIf?: IConditionalRuleSetRawJSONDataType;
  defaultExcluded?: boolean;
  defaultExcludedIf?: IConditionalRuleSetRawJSONDataType;
  ternaryExclusionState?: boolean;
  // Exclusions are called out at UI level, basically the item is considered incomplete
  exclusionIsCallout?: boolean;
  disableSearch?: boolean;
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
  private canUserExcludeIf?: ConditionalRuleSet;
  private defaultExcludedIf?: ConditionalRuleSet;

  // solo item specific attributes
  private enforcedProperties?: PropertiesValueMappingDefiniton;
  private predefinedProperties?: PropertiesValueMappingDefiniton;

  // representing the state of the class
  private onStateChangeListeners: OnStateChangeListenerType[];
  private stateExclusion: ItemExclusionState;
  private stateExclusionModified: boolean;

  // graphql helper
  private gqlInObj: any;
  private gqlOutObj: any;

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
    this.canUserExcludeIf = rawJSON.canUserExcludeIf &&
      new ConditionalRuleSet(rawJSON.canUserExcludeIf,
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
    this.stateExclusion = ItemExclusionState.ANY;
    // initially the state hasn't been modified
    this.stateExclusionModified = false;
  }

  /**
   * Provides the ids of the sinking properties
   */
  public getSinkingPropertiesIds(): string[] {
    return this.rawData.sinkIn || [];
  }

  /**
   * Provides all the sinking properties as property definition
   * instances
   */
  public getSinkingProperties(): PropertyDefinition[] {
    return this.getSinkingPropertiesIds()
      .map((propertyId) => this.itemDefinition.getPropertyDefinitionFor(propertyId, false));
  }

  /**
   * Provides the table bit that is necessary to store item data
   * for this item when included from the parent definition
   */
  public getSQLTableDefinition(): ISQLTableDefinitionType {
    // the exclusion state needs to be stored in the table bit
    // so we basically need to get a prefix for this item definition
    // this is usually ITEM_ the item prefix, and the id of the item
    // eg ITEM_wheel, we build a prefix as ITEM_wheel_
    const prefix = PREFIX_BUILD(ITEM_PREFIX + this.getId());

    // the result table schema contains the table definition of all
    // the columns, the first column we add is the exclusion state
    // because the exclusion state uses a suffix it is defined as
    // ITEM_wheel_ + _EXCLUSION_STATE
    let resultTableSchema: ISQLTableDefinitionType = {
      [prefix + EXCLUSION_STATE_SUFFIX]: {
        type: "string",
        notNull: true,
      },
    };
    // we need all the sinking properties and those are the
    // ones added to the table
    this.getSinkingProperties().forEach((sinkingProperty) => {
      resultTableSchema = {
        ...resultTableSchema,
        ...sinkingProperty.getSQLTableDefinition(prefix),
      };
    });

    // we return the resulting schema
    return resultTableSchema;
  }

  /**
   * Provides the graphql definition that will be required to store
   * this item bit
   * @param propertiesAsInput if it's in input mode to get
   * graphql input fields instead
   */
  public getGQLFieldsDefinition(propertiesAsInput?: boolean): IGQLFieldsDefinitionType {
    // the exclusion state needs to be stored in the schema bit
    let itemFields = {};
    // we need all the sinking properties and those are the
    // ones added to the schema bit
    this.getSinkingProperties().forEach((sinkingProperty) => {
      itemFields = {
        ...itemFields,
        ...sinkingProperty.getGQLFieldsDefinition(propertiesAsInput),
      };
    });

    // if we are in the input mode
    // we need to check out the element we have created
    // for the fields both for input and output, as the object
    // itself is just an input type because an item can be whole
    // null
    if (
      (propertiesAsInput && !this.gqlInObj) ||
      (!propertiesAsInput && !this.gqlOutObj)
    ) {
      // we need to create it depending on the rule
      // whether output or input, we create a GQL name
      // just for this functionality that doesn't collide
      // and is specific for this item instance
      const itemGQLName = PREFIXED_CONCAT(
        this.itemDefinition.getQualifiedPathName(),
        ITEM_PREFIX + this.getId(),
      );

      // and depending if it's in or out
      if (propertiesAsInput) {
        this.gqlInObj = new GraphQLInputObjectType({
          name: itemGQLName + "_In",
          fields: itemFields,
        });
      } else {
        this.gqlOutObj = new GraphQLObjectType({
          name: itemGQLName + "_Out",
          fields: itemFields,
        });
      }
    }

    // now we add the exclusion state, and the graphql object, depending to
    // what we have
    return {
      [PREFIX_BUILD(ITEM_PREFIX + this.getId()) + EXCLUSION_STATE_SUFFIX]: {
        type: GraphQLNonNull(GraphQLString),
      },
      [ITEM_PREFIX + this.getId()]: {
        type: propertiesAsInput ? this.gqlInObj : this.gqlOutObj,
      },
    };
  }

  /**
   * Given a SQL row it converts the value of the data contained
   * within that row into the valid graphql value for that data
   * @param row the row sql data
   */
  public convertSQLValueToGQLValue(row: ISQLTableRowValue): IGQLValue {
    // first we create a prefix, the prefix is basically ITEM_wheel_
    // this prefix is added as you remember for every item extra property as
    // wheel as the item itself
    const prefix = PREFIX_BUILD(ITEM_PREFIX + this.getId());

    // now this is the result, of the graphql parent field because this is
    // an object that contains an object, the item sinking properties
    // are contained within that prefix, for example if the sql is
    // ITEM_wheel__EXCLUSION_STATE, ITEM_wheel_bolt, ITEM_wheel_rubber
    // the output should be
    // ITEM_wheel__EXCLUSION_STATE: ..., ITEM_wheel: {bolt: ... rubber: ...}
    // this gqlParentResult represents what is in ITEM_wheel
    let gqlParentResult: IGQLValue = {};

    // for that we need all the sinking properties
    this.getSinkingProperties().forEach((sinkingProperty) => {
      // and we add them for the row data, notice how we add the prefix
      // telling the property definition that its properties are prefixed in
      // the sql data with ITEM_wheel_
      gqlParentResult = {
        ...gqlParentResult,
        ...sinkingProperty.convertSQLValueToGQLValue(row, prefix),
      };
    });

    // now we return both info, the exclusion state, and the item data
    // prefixed as necessary
    return {
      [prefix + EXCLUSION_STATE_SUFFIX]: row[prefix + EXCLUSION_STATE_SUFFIX],
      [ITEM_PREFIX + this.getId()]: gqlParentResult,
    };
  }

  /**
   * Converts a GraphQL value into a SQL row data, it takes apart a complex
   * graphql value and converts it into a serializable sql form
   * @param data the graphql data value
   * @param raw a raw function that is used for creating raw sql statments, eg. knex.raw
   */
  public convertGQLValueToSQLValue(data: IGQLValue, raw: (value: any) => any): ISQLTableRowValue {
    // so again we get the prefix as in ITEM_wheel_
    const prefix = PREFIX_BUILD(ITEM_PREFIX + this.getId());
    // the exclusion state in the graphql information should be included in
    // the root data as ITEM_wheel__EXCLUSION_STATE so we extract it
    const exclusionStateAccordingToGQL = data[prefix + EXCLUSION_STATE_SUFFIX];

    // we add that data to the sql result
    let sqlResult: ISQLTableRowValue = {
      [prefix + EXCLUSION_STATE_SUFFIX]: exclusionStateAccordingToGQL,
    };

    // now the information that is specific about the sql value is only
    // necessary if the state is not excluded, excluded means it should be
    // null, even if the info is there, it will be ignored
    if (exclusionStateAccordingToGQL !== ItemExclusionState.EXCLUDED) {
      // so we get the sinking properties
      this.getSinkingProperties().forEach((sinkingProperty) => {
        // and start adding them, in this case, instead of giving
        // the root data, we are passing the specific item data, remember
        // it will be stored in a place like ITEM_wheel where all the properties
        // are an object within there, we pass that, as all the info should be
        // there, the prefix then represents the fact, we want all the added properties
        // to be prefixed with what we are giving, in this case ITEM_wheel_
        sqlResult = {
          ...sqlResult,
          ...sinkingProperty.convertGQLValueToSQLValue(data[ITEM_PREFIX + this.getId()], raw, prefix),
        };
      });
    }

    // we return that
    return sqlResult;
  }

  /**
   * Tells whether the current item is excluded
   * @return a boolean whether it's excluded or not
   */
  public getExclusionState(): ItemExclusionState {
    // let's check if it's excluded by force
    const isExcludedByForce = this.excludedIf && this.excludedIf.evaluate();

    if (isExcludedByForce) {
      return ItemExclusionState.EXCLUDED;
    }

    // if it can be excluded
    const canBeExcludedByUser = this.rawData.canUserExclude || (this.canUserExcludeIf &&
      this.canUserExcludeIf.evaluate());
    if (canBeExcludedByUser) {
      // if it hasn't been modified we return the default state
      if (!this.stateExclusionModified) {
        // depending on the condition
        const isDefaultExcluded = this.rawData.defaultExcluded ||
          (this.defaultExcludedIf && this.defaultExcludedIf.evaluate()) ||
          false;
        // by default the excluded would be false
        if (isDefaultExcluded) {
          return ItemExclusionState.EXCLUDED;
        } else if (this.rawData.ternaryExclusionState) {
          return ItemExclusionState.ANY;
        }
        return ItemExclusionState.INCLUDED;
      }

      if (
        !this.rawData.ternaryExclusionState &&
        this.stateExclusion === ItemExclusionState.ANY
      ) {
        return ItemExclusionState.INCLUDED;
      }
      return this.stateExclusion;
    } else if (this.rawData.ternaryExclusionState) {
      return ItemExclusionState.ANY;
    }
    return ItemExclusionState.INCLUDED;
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
    return this.rawData.canUserExclude || (this.canUserExcludeIf &&
      this.canUserExcludeIf.evaluate()) || false;
  }

  /**
   * Checks whether the exclusion state is a ternary type,
   * this basically only exists in search item definition items
   * because it's used during the search mode
   */
  public isExclusionTernary(): boolean {
    return this.rawData.ternaryExclusionState || false;
  }

  /**
   * Checks whether excluding this item (while possible) will cause
   * a callout, that is, a clear display that the item definition
   * instance is missing it, this is for key items, eg. car, wheels missing.
   */
  public isExclusionCallout(): boolean {
    return this.rawData.exclusionIsCallout || false;
  }

  /**
   * Sets the exclusion state to a new value
   * @param value the value for the exclusion state
   */
  public setExclusionState(value: ItemExclusionState) {
    this.stateExclusion = value;
    this.stateExclusionModified = true;

    // trigger an state change
    this.onStateChangeListeners.forEach((l) => l());
  }

  /**
   * Provides the name for this item, the name represents
   * the item definition children this item is attached to
   */
  public getName() {
    return this.rawData.name;
  }

  /**
   * Provides the unique id of this item definition
   * the unique id is, well, unique for this item
   */
  public getId() {
    return this.rawData.id;
  }

  /**
   * Provides the current value of this item
   */
  public getCurrentValue(): IItemValue {
    const exclusionState = this.getExclusionState();
    return {
      exclusionState,
      canExclusionBeSet: this.canExclusionBeSet(),
      itemId: this.getId(),
      itemName: this.getName(),
      itemDefinitionValue: exclusionState === ItemExclusionState.EXCLUDED ? null :
        this.itemDefinition.getCurrentValue(this.rawData.sinkIn || [], true),
      stateExclusion: this.stateExclusion,
      stateExclusionModified: this.stateExclusionModified,
    };
  }

  /**
   * Appliesa value to this item definition
   * the value can be invalid and it will be checked
   * and a proper error be returned when you try to retrieve it
   * hopefully this means validation as well as in
   * it cannot be cheated
   * @param value the value of the item
   */
  public applyValue(value: IItemValue) {
    this.stateExclusion = value.stateExclusion;
    this.stateExclusionModified = value.stateExclusionModified;

    if (value.itemDefinitionValue) {
      this.itemDefinition.applyValue(value.itemDefinitionValue);
    }
  }

  /**
   * Gives the i18 name that was specified
   * or otherwise gives the item definition i18 name
   * @param  locale the locale iso form
   * @returns a string or null (if locale not valid)
   */
  public getI18nNameFor(locale: string) {
    if (this.rawData.i18nData &&
      this.rawData.i18nData[locale] &&
      this.rawData.i18nData[locale].name) {
      return this.rawData.i18nData[locale].name;
    }

    const parentItemDefinitionI18nData = this.itemDefinition.getI18nDataFor(locale);
    return (parentItemDefinitionI18nData && parentItemDefinitionI18nData.name) || null;
  }

  /**
   * Provides the item definition item locale data
   * @param  locale the locale in iso form
   * @returns an object or null (if locale not valid)
   */
  public getI18nDataFor(locale: string) {
    return this.rawData.i18nData[locale] || null;
  }

  /**
   * Adds an on state change listener to this specific item for when its item
   * data changes, basically only its exclusion state
   * @param listener the listener to add
   */
  public addOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    this.onStateChangeListeners.push(listener);
  }

  /**
   * Removes the state change listener of this item
   * @param listener the listener to remove
   */
  public removeOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    const index = this.onStateChangeListeners.indexOf(listener);
    if (index !== -1) {
      this.onStateChangeListeners.splice(index, 1);
    }
  }

  /**
   * Basically returns the raw data of this item
   */
  public toJSON() {
    return this.rawData;
  }

  /**
   * Provides the item definition where this item is contained
   */
  public getItemDefinition() {
    return this.itemDefinition;
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
      canUserExclude: {
        type: "boolean",
      },
      canUserExcludeIf: {
        $ref: ConditionalRuleSet.schema.$id,
      },
      defaultExcluded: {
        type: "boolean",
      },
      defaultExcludedIf: {
        $ref: ConditionalRuleSet.schema.$id,
      },
      ternaryExclusionState: {
        type: "boolean",
      },
      exclusionIsCallout: {
        type: "boolean",
      },
      sinkIn: {
        type: "array",
        items: {
          type: "string",
        },
      },
      disableSearch: {
        type: "boolean",
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
