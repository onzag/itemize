import ConditionalRuleSet from "./ConditionalRuleSet";
import Item, { IItemRawJSONDataType, IItemValue, ItemExclusionState } from "./Item";
import PropertyDefinition,
  { IPropertyDefinitionRawJSONDataType, IPropertyDefinitionValue } from "./PropertyDefinition";
import Module, { IModuleRawJSONDataType, OnStateChangeListenerType } from "../Module";
import PropertiesValueMappingDefiniton from "./PropertiesValueMappingDefiniton";
import { PREFIXED_CONCAT, ITEM_DEFINITION_PREFIX } from "../../constants";

export interface IItemDefinitionRawJSONDataType {
  // Builder data
  type: "item";

  // Avaialble for the builder
  location?: string;
  pointers?: any;
  raw?: string;

  // Avilable after a build
  name: string;
  i18nData: {
    [locale: string]: {
      name: string;
      createFormTitle: string;
      searchFormTitle: string;
      editFormTitle: string;
      ftsSearchFieldLabel: string;
      ftsSearchFieldPlaceholder: string;
    },
  };

  // original data
  includes?: IItemRawJSONDataType[];
  properties?: IPropertyDefinitionRawJSONDataType[];

  // roperty gets added during procesing and merging
  // replacing imports, gotta be there even if empty
  importedChildDefinitions?: string[][];
  childDefinitions?: IItemDefinitionRawJSONDataType[];
}

export interface IItemDefinitionValue {
  moduleName: string;
  itemDefPath: string[];
  itemDefName: string;
  items: IItemValue[];
  properties: IPropertyDefinitionValue[];
}

/**
 * This is the max expression, the item definition class
 * which basically compounds all how this is defined
 */
export default class ItemDefinition {
  /**
   * Schema only available in development
   */
  public static schema: any;

  /**
   * A raw helper function that gets a child or imported
   * raw item definition for an item, it's static, so it works
   * with raw json data, it throws no error
   * @param itemDefinitionRaw the json for the item definition
   * @param parentModuleRaw the parent module that contains
   * this same item definition raw
   * @param name the name of the expected child item
   * @param avoidImports whether to avoid imported items from the module
   */
  public static getItemDefinitionRawFor(
    itemDefinitionRaw: IItemDefinitionRawJSONDataType,
    parentModuleRaw: IModuleRawJSONDataType,
    name: string,
    avoidImports?: boolean,
  ): IItemDefinitionRawJSONDataType {
    // Find the definition in the raw form
    let definition = itemDefinitionRaw.childDefinitions
      .find((d) => d.name === name);

    // if we don't get it let's check the imports if we are allowed
    if (!definition && !avoidImports) {
      // we take the location and we match it like this
      // /path/example/itemDefinition would be considered imported
      // as well as itemDefinition would be matched to
      // /path/example/itemDefinition
      const importedDefinitionLoc = itemDefinitionRaw.importedChildDefinitions
        .find((d) => d.join("/") === name || d[d.length - 1] === name);

      // if we got it
      if (importedDefinitionLoc) {
        // le'ts get the name and the imported path
        const importedDefinitionName = importedDefinitionLoc.join("/");
        const importedPath = itemDefinitionRaw.importedChildDefinitions
          .find((d) => d.join("/") === importedDefinitionName);

        // There is an equal static function in the parent module for
        // handling this too
        if (importedPath) {
          definition = Module.getItemDefinitionRawFor(
            parentModuleRaw,
            importedPath,
          );
        }
      }
    }

    return definition || null;
  }

  /**
   * A raw helper function that takes raw json data and returns
   * a property definition if it finds it based on its id
   * it also checks prop extensions
   * @param itemDefinitionRaw the raw item definition to be searched
   * @param parentModuleRaw the raw module
   * @param id the id of the property
   * @param includeExtensions whether to include the extensions
   */
  public static getPropertyDefinitionRawFor(
    itemDefinitionRaw: IItemDefinitionRawJSONDataType,
    parentModuleRaw: IModuleRawJSONDataType,
    id: string,
    includeExtensions: boolean,
  ): IPropertyDefinitionRawJSONDataType {
    // We try to find the item definition locally
    let definition = itemDefinitionRaw.properties &&
      itemDefinitionRaw.properties.find((p) => p.id === id);

    // Otherwise we might check the prop extensions in the parent module
    // To see if it's there
    if (!definition && includeExtensions && parentModuleRaw.propExtensions) {
      definition = parentModuleRaw.propExtensions.find((p) => p.id === id);
    }

    // We return the definition or null on its defect
    return definition || null;
  }

  public rawData: IItemDefinitionRawJSONDataType;
  private itemInstances: Item[];
  private childDefinitions: ItemDefinition[];
  private importedChildDefinitions: Array<{
    fullName: string,
    definition: ItemDefinition,
  }>;
  private propertyDefinitions: PropertyDefinition[];
  private parentModule: Module;
  private parentItemDefinition: ItemDefinition;

  constructor(
    rawJSON: IItemDefinitionRawJSONDataType,
    parentModule: Module,
    parentItemDefinition: ItemDefinition,
  ) {
    this.rawData = rawJSON;
    this.parentModule = parentModule;
    this.parentItemDefinition = parentItemDefinition;

    // assigning the item definitions that are child by
    // instantiating them
    this.childDefinitions = rawJSON.childDefinitions ? rawJSON.childDefinitions
      .map((d) => (new ItemDefinition(d, this.parentModule,
        this))) : [];

    // Assigning the imported child definitions by
    // instantiating a detached child definition from the
    // parent module
    this.importedChildDefinitions =
      rawJSON.importedChildDefinitions ?
      rawJSON.importedChildDefinitions.map(
        (d) => ({
          fullName: d.join("/"),
          definition: this.parentModule.getItemDefinitionFor(d).getNewInstance(),
        })) : [];

    // assigning the property definition by using the
    // properties and instantiating those as well
    this.propertyDefinitions = rawJSON.properties ? rawJSON.properties
      .map((i) => (new PropertyDefinition(i, parentModule,
        this, false))) : [];

    // assigning the item instances by using the includes
    // and instantiating those
    this.itemInstances = rawJSON.includes ? rawJSON.includes
      .map((i) => (new Item(i, parentModule, this))) : [];
  }

  /**
   * provides the raw name of the item definition
   */
  public getName(): string {
    return this.rawData.name;
  }

  public getPath(): string[] {
    const parentPath = this.parentItemDefinition ? this.parentItemDefinition.getPath() : [];
    return parentPath.concat(this.getName());
  }

  public getModuleName(): string {
    return this.parentModule.getName();
  }

  /**
   * Tells whether an item definition has a child item definition for it
   * @param name the name of the item definition
   * @param avoidImports whether to avoid the imported detached definitions
   */
  public hasItemDefinitionFor(
    name: string,
    avoidImports?: boolean,
  ): boolean {
    // For this we use the raw data, we check if one
    // matches the name
    let status = this.rawData.childDefinitions.some((d) => d.name === name);

    // if we don't find it let's try searching in imports
    if (!status && !avoidImports) {
      // we take the location and we match it like this
      // /path/example/itemDefinition would be considered imported
      // as well as itemDefinition would be matched to
      // /path/example/itemDefinition
      const importedDefinitionLoc = this.rawData.importedChildDefinitions
        .find((d) => d.join("/") === name || d[d.length - 1] === name);
      // if we find an imported location that matches
      if (importedDefinitionLoc) {
        // we ask the module the same thing
        status =
          this.parentModule.hasItemDefinitionFor(importedDefinitionLoc);
      }
    }
    // return that status
    return status;
  }

  /**
   * Gets a live item definition for the current item definition
   * either as a children or a detached instance that came from
   * another item definition as an import
   * @throws an error if the item definition does not exist
   * @param name the name of the item definition
   * @param avoidImports whether to avoid imported items
   */
  public getItemDefinitionFor(
    name: string,
    avoidImports?: boolean,
  ): ItemDefinition {
    // We basically do the same as hasItemDefinition but we use
    // the live instances
    let definition = this.childDefinitions
      .find((d) => d.getName() === name);

    // if we don't have that definition
    if (!definition && !avoidImports) {

      // Do the same as before and do the matching
      const importedDefinitionLoc = this.rawData.importedChildDefinitions
        .find((d) => d.join("/") === name || d[d.length - 1] === name);

      // now we check we got something
      if (importedDefinitionLoc) {
        // And now let's use the full names for what we had
        // already requested to the parent
        const importedDefinitionName = importedDefinitionLoc.join("/");
        const found = this.importedChildDefinitions
          .find((d) => d.fullName === importedDefinitionName);

        // if we find it, we assign it
        if (found) {
          definition = found.definition;
        }
      }
    }

    // We throw an error in requested a non existant definition
    if (!definition) {
      throw new Error("Requested invalid definition " + name);
    }

    // return it
    return definition;
  }

  public getItemFor(id: string) {
    return this.itemInstances.find((ii) => ii.getId() === id);
  }

  /**
   * Provides a raw json item definition that it has a children
   * @param name the name of the item definition
   * @throws an error if the item definition does not exist
   * @returns a raw item definition
   */
  public getItemDefinitionRawFor(
    name: string,
    avoidImports?: boolean,
  ) {
    // We basically pipe the data to the static
    const definition = ItemDefinition.getItemDefinitionRawFor(
      this.rawData,
      this.parentModule.rawData,
      name,
      avoidImports,
    );
    //
    if (!definition) {
      throw new Error("Searching for item definition " +
        name + " failed");
    }
    return definition;
  }

  /**
   * Provides all the property definitions without
   * including the extensions
   */
  public getAllPropertyDefinitions() {
    return this.propertyDefinitions;
  }

  public getAllItems() {
    return this.itemInstances;
  }

  /**
   * Checks whether an item definition has a property definition
   * @param id the property definition id
   * @param includeExtensions whether to include extensions or not
   */
  public hasPropertyDefinitionFor(id: string, includeExtensions: boolean) {
    // we use the rawdata to quickly check
    let found = (this.rawData.properties || [])
      .some((p) => p.id === id);
    if (!found && includeExtensions) {
      found = this.parentModule.hasPropExtensionFor(id);
    }
    return found;
  }

  /**
   * Provides a live property definition for an item definition
   * this property definition can trigger state changes
   * @throws error if the property does not exist
   * @param id the property definition id
   * @param includeExtensions whether to include extensions or not
   */
  public getPropertyDefinitionFor(
    id: string,
    includeExtensions: boolean,
  ): PropertyDefinition {
    let definition = this.propertyDefinitions.find((p) => p.getId() === id);
    if (!definition && includeExtensions) {
      definition = this.parentModule.getPropExtensionFor(id);
    }
    if (!definition) {
      throw new Error("Requested invalid property " + id);
    }
    return definition;
  }

  /**
   * Tells whether the current item definition has items itself
   * which are active and match the specific name
   * that means the item is not excluded and the item is
   * matches the name
   * @param name the name of the item
   */
  public hasAtLeastOneActiveInstanceOf(name: string): boolean {
    // we need a list of possible candidates
    // the might currently contain checks if an item
    // contains the item with the given name
    // otherwise it's not worth to check for activity
    const possibleCandidates = this.itemInstances
      .filter((i) => i.getName() === name);

    // if there are no possible candidates return false
    if (!possibleCandidates.length) {
      return false;
    }

    return possibleCandidates.some((c) => c.getExclusionState() !== ItemExclusionState.EXCLUDED);
  }

  public hasAnActiveInstanceOfId(id: string): boolean {
    const candidate = this.itemInstances
      .find((i) => i.getId() === id);

    if (!candidate) {
      return false;
    }

    return candidate.getExclusionState() !== ItemExclusionState.EXCLUDED;
  }

  /**
   * Just gives the parent module
   */
  public getParentModule() {
    return this.parentModule;
  }

  /**
   * Tells whether it has a parent item definition
   */
  public hasParentItemDefinition() {
    return !!this.parentItemDefinition;
  }

  /**
   * Provides the parent item definition
   * @throws an error if nothing available
   */
  public getParentItemDefinition() {
    if (!this.parentItemDefinition) {
      throw new
        Error("Attempted to get parent definition while missing");
    }
    return this.parentItemDefinition;
  }

  /**
   * Provides the live child definitions
   * without imports
   */
  public getChildDefinitions() {
    return this.childDefinitions;
  }

  /**
   * Provides the live imported child definitions
   * without imports
   */
  public getImportedChildDefinitions() {
    return this.importedChildDefinitions.map((icd) => icd.definition);
  }

  /**
   * Uses the raw data to instantiate a new instance of
   * the item definition, uses the same on state change
   * function for state changes so it remains linked to the
   * module
   */
  public getNewInstance() {
    return new ItemDefinition(this.rawData, this.parentModule,
      this.parentItemDefinition);
  }

  /**
   * Provides the item definition item locale data
   * @param  locale the locale in iso form
   * @returns an object or null (if locale not valid)
   */
  public getI18nDataFor(locale: string) {
    return this.rawData.i18nData[locale] || null;
  }

  public addOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    this.childDefinitions.forEach((cd) => {
      cd.addOnStateChangeEventListener(listener);
    });

    this.importedChildDefinitions.forEach((icd) => {
      icd.definition.addOnStateChangeEventListener(listener);
    });

    this.itemInstances.forEach((ii) => {
      ii.addOnStateChangeEventListener(listener);
    });

    this.propertyDefinitions.forEach((pd) => {
      pd.addOnStateChangeEventListener(listener);
    });
  }

  public removeOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    this.childDefinitions.forEach((cd) => {
      cd.removeOnStateChangeEventListener(listener);
    });

    this.importedChildDefinitions.forEach((icd) => {
      icd.definition.removeOnStateChangeEventListener(listener);
    });

    this.itemInstances.forEach((ii) => {
      ii.removeOnStateChangeEventListener(listener);
    });

    this.propertyDefinitions.forEach((pd) => {
      pd.removeOnStateChangeEventListener(listener);
    });
  }

  /**
   * TODO provides the structure of the current item
   * as it is currently, the reason this is more efficient
   * is because getting the value of each item definition
   * wastes resources, so using this function is more
   * efficient than calling the functions
   * @param onlyIncludeProperties only includes these specific
   * properties, note property definitions are not fetched in
   * this case
   */
  public getCurrentValue(
    onlyIncludeProperties?: string[],
    excludeItems?: boolean,
  ): IItemDefinitionValue {
    const properties = onlyIncludeProperties ?
      onlyIncludeProperties.map((p) => this.getPropertyDefinitionFor(p, false).getCurrentValue()) :
      this.getParentModule().getAllPropExtensions().concat(
        this.getAllPropertyDefinitions(),
      ).map((pd) => {
        return pd.getCurrentValue();
      });

    return {
      moduleName: this.getModuleName(),
      itemDefPath: this.getPath(),
      itemDefName: this.getName(),
      items: excludeItems ? [] : this.itemInstances.map((ii) => ii.getCurrentValue()),
      properties,
    };
  }

  public applyValue(value: IItemDefinitionValue) {
    if (value.itemDefPath.join("/") !== this.getPath().join("/")) {
      throw new Error("Attempted to apply unmatching values");
    }

    value.items.forEach((itemValue) => {
      this.getItemFor(itemValue.itemId).applyValue(itemValue);
    });

    value.properties.forEach((propertyValue) => {
      this.getPropertyDefinitionFor(propertyValue.propertyId, true).applyValue(propertyValue);
    });
  }

  public toJSON() {
    return this.rawData;
  }

  public getQualifiedPathName(): string {
    if (this.parentItemDefinition) {
      return PREFIXED_CONCAT(this.parentItemDefinition.getQualifiedPathName(), ITEM_DEFINITION_PREFIX + this.getName());
    }
    return PREFIXED_CONCAT(this.parentModule.getQualifiedPathName(), ITEM_DEFINITION_PREFIX + this.getName());
  }
}

// Setup the schema for files
if (process.env.NODE_ENV !== "production") {
  ItemDefinition.schema = {
    $id: "ItemDefinition",
    type: "object",
    properties: {
      type: {
        const: "item",
      },
      includes: {
        type: "array",
        items: {
          $ref: Item.schema.$id,
        },
      },
      properties: {
        type: "array",
        items: {
          $ref: PropertyDefinition.schema.$id,
        },
      },
      imports: {
        type: "array",
        items: {
          type: "string",
        },
        minItems: 1,
        additionalItems: false,
      },
      readRoleAccess: {
        type: "array",
        items: {
          type: "string",
        },
      },
      createRoleAccess: {
        type: "array",
        items: {
          type: "string",
        },
      },
      deleteRoleAccess: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    definitions: {
      PropertyDefinition: PropertyDefinition.schema,
      Item: Item.schema,
      PropertiesValueMappingDefiniton: PropertiesValueMappingDefiniton.schema,
      ConditionalRuleSet: ConditionalRuleSet.schema,
    },
    required: ["type"],
    additionalProperties: false,
  };
}
