import ConditionalRuleSet from "./ConditionalRuleSet";
import Item, { IItemRawJSONDataType, IItemValue, ItemExclusionState } from "./Item";
import PropertyDefinition,
  { IPropertyDefinitionRawJSONDataType, IPropertyDefinitionValue } from "./PropertyDefinition";
import Module, { IModuleRawJSONDataType, OnStateChangeListenerType } from "../Module";
import PropertiesValueMappingDefiniton from "./PropertiesValueMappingDefiniton";
import {
  PREFIXED_CONCAT,
  ITEM_DEFINITION_PREFIX,
  RESERVED_BASE_PROPERTIES_SQL,
  PREFIX_GET,
  PREFIX_SEARCH,
  PREFIX_ADD,
  PREFIX_EDIT,
  PREFIX_DELETE,
  RESERVED_GETTER_PROPERTIES,
  RESERVED_ADD_PROPERTIES,
  RESERVED_SEARCH_PROPERTIES,
  RESERVED_BASE_PROPERTIES,
} from "../../constants";
import { GraphQLObjectType, GraphQLList, GraphQLOutputType } from "graphql";
import {
  IGraphQLResolversType,
  ISQLTableDefinitionType,
  ISQLSchemaDefinitionType,
  IGQLFieldsDefinitionType,
  IGQLQueryFieldsDefinitionType,
  ISQLTableRowValue,
  IGQLValue,
} from "../Root";

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

  // Functions for graphql
  private gqlObj: GraphQLOutputType;

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

  /**
   * Checks whether it has an active instance of an item
   * given its item id (not its name)
   * @param id the id of the item
   */
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

  /**
   * Adds a listener to the structure of this item definition, all
   * its property, item, and imported definitions once they change
   * @param listener the listener that wishes to be added
   */
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

  /**
   * Removes a listener to the structure of this item definition, all
   * its property, item, and imported definitions once they change
   * @param listener the listener that wishes to be removed
   */
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
   * provides the structure of the current item
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

  /**
   * Applies an item definition value the state of this
   * instance
   * @param value the value, be careful, it will choke if invalid
   */
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

  /**
   * Provides the item definition that represent the search mode of this
   * same item definition
   */
  public getSearchModeCounterpart(): ItemDefinition {
    return this.parentModule.getSearchModule().getItemDefinitionFor(
      this.getModulePath(),
    );
  }

  /**
   * Tells whether this item is the search mode item of another
   * item
   */
  public isInSearchMode(): boolean {
    return this.parentModule.isInSearchMode();
  }

  /**
   * Provides the table that is necesary to include this item definition as a whole
   * that is, this represents a whole table, that is necessary for this item to
   * be saved when populated, it basically adds up all the table bits
   * from all the properties and all the items
   */
  public getSQLTableDefinition(): ISQLTableDefinitionType {
    // add all the standard fields
    let resultTableSchema: ISQLTableDefinitionType = {...RESERVED_BASE_PROPERTIES_SQL};

    // now we loop thru every property (they will all become columns)
    this.getAllPropertyDefinitions().forEach((pd) => {
      resultTableSchema = {...resultTableSchema, ...pd.getSQLTableDefinition()};
    });

    // now we loop over the child items
    this.getAllItems().forEach((i) => {
      resultTableSchema = {...resultTableSchema, ...i.getSQLTableDefinition()};
    });

    return resultTableSchema;
  }

  /**
   * Provides all the schema of all the items, self and its children
   * that are included within this item definition and all the table names
   * that should be used using the qualified name
   */
  public getSQLTablesSchema(): ISQLSchemaDefinitionType {
    // we add self
    let result = {
      [this.getQualifiedPathName()]: this.getSQLTableDefinition(),
    };
    // loop over the children and add each one of them and whatever they have
    this.getChildDefinitions().forEach((cIdef) => {
      result = {...result, ...cIdef.getSQLTablesSchema()};
    });
    // return that
    return result;
  }

  /**
   * Provides all the graphql fields that this item definition contains as well as its
   * items, but only of this specific item definition and does not include its children
   * @param propertiesAsInput if the properties should be in input form
   */
  public getGQLFieldsDefinition(propertiesAsInput?: boolean): IGQLFieldsDefinitionType {
    // the fields result in graphql field form
    let fieldsResult: IGQLFieldsDefinitionType = {};

    // We get all the properties that this item definition contains
    this.getAllPropertyDefinitions().forEach((pd) => {
      // and we add them progressively
      fieldsResult = {
        ...fieldsResult,
        ...pd.getGQLFieldsDefinition(propertiesAsInput),
      };
    });

    // We do the same with the items
    this.getAllItems().forEach((i) => {
      fieldsResult = {
        ...fieldsResult,
        ...i.getGQLFieldsDefinition(propertiesAsInput),
      };
    });

    // return that
    return fieldsResult;
  }

  /**
   * Provides the graphql type for the given item definition which
   * extends the interface of its parent module already
   */
  public getGQLType(): GraphQLOutputType {
    // we check if we have an object cached already
    if (!this.gqlObj) {
      // we get the item definition fields, for this element alone
      const itemSelfFields = this.getGQLFieldsDefinition();
      const fields: IGQLFieldsDefinitionType = {
        // Graphql Inheritance has to be explicitly set
        // we include also the base definitions
        ...this.parentModule.getGQLFieldsDefinition(),
        ...itemSelfFields,
      };
      // we set the object value
      this.gqlObj = new GraphQLObjectType({
        name: this.getQualifiedPathName(),
        fields,
        interfaces: [this.parentModule.getGQLType()],
      });
    }

    // return that
    return this.gqlObj;
  }

  /**
   * Provides all the query fields for the given item definition, including all
   * the children item definitions that are included within this item definition
   * @param resolvers the resolvers object that will be used to populate the resolvers
   * of the query fields
   */
  public getGQLQueryFields(resolvers?: IGraphQLResolversType): IGQLQueryFieldsDefinitionType {
    // of course you don't have a graphql query in search mode
    if (this.isInSearchMode()) {
      throw new Error("Modules in search mode has no graphql queries");
    }

    // but we need that specific search mode counterpart to populate the arguments
    // for our query
    const searchModeCounterpart = this.getSearchModeCounterpart();

    // now we add the queries
    let fields: IGQLQueryFieldsDefinitionType = {
      // basic get query to get an item given an id
      [PREFIX_GET + this.getQualifiedPathName()]: {
        type: this.getGQLType(),
        args: {
          ...RESERVED_GETTER_PROPERTIES,
        },
        // we just pipe the arguments out of the resolver
        resolve: (source: any, args: any, context: any, info: any) => {
          if (resolvers) {
            return resolvers.getItemDefinition({
              source,
              args,
              context,
              info,
            }, this);
          }
        },
      },
      // now this is the search query
      [PREFIX_SEARCH + this.getQualifiedPathName()]: {
        type: GraphQLList(this.getGQLType()),
        args: {
          ...RESERVED_SEARCH_PROPERTIES,
          ...searchModeCounterpart.getParentModule().getGQLFieldsDefinition(true, true),
          ...searchModeCounterpart.getGQLFieldsDefinition(true),
        },
        resolve: (source: any, args: any, context: any, info: any) => {
          if (resolvers) {
            return resolvers.searchItemDefinition({
              source,
              args,
              context,
              info,
            }, this);
          }
        },
      },
    };

    // add the child definitions to the queries by adding theirs
    this.getChildDefinitions().forEach((cIdef) => {
      fields = {
        ...fields,
        ...cIdef.getGQLQueryFields(),
      };
    });

    return fields;
  }

  /**
   * Provides all the fields for the mutations that are required to take
   * place in order to ADD, EDIT and DELETE item definition values
   * @param resolvers the resolvers for the graphql mutations to populate
   */
  public getGQLMutationFields(resolvers?: IGraphQLResolversType): IGQLQueryFieldsDefinitionType {
    // same as before not available in search mode
    if (this.isInSearchMode()) {
      throw new Error("Modules in search mode has no graphql mutations");
    }

    // now we populate the fields as we need to
    let fields: IGQLQueryFieldsDefinitionType = {
      // the add function works to create a new item definition
      // instance for this specific item definition, so we
      // mix the add properties fields, the parent module fields,
      // excluding the base, and as input, because it's args,
      // and then we get our own fields
      [PREFIX_ADD + this.getQualifiedPathName()]: {
        type: this.getGQLType(),
        args: {
          ...RESERVED_ADD_PROPERTIES,
          ...this.parentModule.getGQLFieldsDefinition(true, true),
          ...this.getGQLFieldsDefinition(true),
        },
        resolve: (source: any, args: any, context: any, info: any) => {
          if (resolvers) {
            return resolvers.addItemDefinition({
              source,
              args,
              context,
              info,
            }, this);
          }
        },
      },
      // The edition uses the standard getter properties to fetch
      // an item definition instance given its id and then
      // uses the same idea of adding in order to modify the data
      // that is in there
      [PREFIX_EDIT + this.getQualifiedPathName()]: {
        type: this.getGQLType(),
        args: {
          ...RESERVED_GETTER_PROPERTIES,
          ...this.parentModule.getGQLFieldsDefinition(true, true),
          ...this.getGQLFieldsDefinition(true),
        },
        resolve: (source: any, args: any, context: any, info: any) => {
          if (resolvers) {
            return resolvers.editItemDefinition({
              source,
              args,
              context,
              info,
            }, this);
          }
        },
      },
      // The delete uses the standard getter properties to fetch
      // the item definition instance, and basically deletes it
      // instead of retrieving anything, well, it retrieves
      // the deleted element itself
      [PREFIX_DELETE + this.getQualifiedPathName()]: {
        type: this.getGQLType(),
        args: RESERVED_GETTER_PROPERTIES,
        resolve: (source: any, args: any, context: any, info: any) => {
          if (resolvers) {
            return resolvers.deleteItemDefinition({
              source,
              args,
              context,
              info,
            }, this);
          }
        },
      },
    };

    // we repeat this process for all the item child definitions
    // that are added in here
    this.getChildDefinitions().forEach((cIdef) => {
      fields = {
        ...fields,
        ...cIdef.getGQLMutationFields(),
      };
    });

    // return that
    return fields;
  }

  /**
   * Converts a SQL value directly coming from the database as it is
   * to a graphql value for this specific item definition
   * @param row the row value, with all the columns it has; the row
   * can be overblown with other field data, this will extract only the
   * data required for this item definition
   */
  public convertSQLValueToGQLValue(row: ISQLTableRowValue): IGQLValue {
    // first we create the graphql result
    let result: IGQLValue = {};

    // now we take all the base properties that we have
    // in the graphql model
    Object.keys(RESERVED_BASE_PROPERTIES).forEach((basePropertyKey) => {
      result[basePropertyKey] = row[basePropertyKey] || null;
    });

    // we also take all the property definitions we have
    // in this item definitions, and convert them one by one
    // with the row data, this basically also gives graphql value
    // in the key:value format
    this.getAllPropertyDefinitions().forEach((pd) => {
      result = {...result, ...pd.convertSQLValueToGQLValue(row)};
    });

    // now we do the same for the items
    this.getAllItems().forEach((item) => {
      result = {...result, ...item.convertSQLValueToGQLValue(row)};
    });

    return result;
  }

  /**
   * Converts a graphql value, with all its items and everything it
   * has into a SQL row data value for this specific item definition
   * @param data the graphql data
   * @param raw a raw function that is used for creating raw sql statments, eg. knex.raw
   */
  public convertGQLValueToSQLValue(data: IGQLValue, raw: (value: any) => any): ISQLTableRowValue {
    // first we create the row value
    let result: ISQLTableRowValue = {};

    // now we get all the property definitions and do the same
    // that we did in the SQLtoGQL but in reverse
    this.getAllPropertyDefinitions().forEach((pd) => {
      result = {...result, ...pd.convertGQLValueToSQLValue(data, raw)};
    });
    // also with the items
    this.getAllItems().forEach((item) => {
      result = {...result, ...item.convertGQLValueToSQLValue(data, raw)};
    });

    return result;
  }

  public getSQLQueryFor(data: IGQLValue) {
    console.log(data);
    // TODO
  }

  /**
   * Basically returns the raw data itself
   * doesn't do much
   */
  public toJSON() {
    return this.rawData;
  }

  /**
   * Provides the path from the module
   * base, that is not absolute but a relative
   * path from the parent module
   */
  public getModulePath(): string[] {
    if (this.parentItemDefinition) {
      return this.parentItemDefinition
        .getModulePath()
        .concat([
          this.getName(),
        ]);
    }
    return [this.getName()];
  }

  /**
   * Provides the absolute path all the way
   * from the root
   */
  public getAbsolutePath(): string[] {
    if (this.parentItemDefinition) {
      return this.parentItemDefinition
        .getAbsolutePath()
        .concat([
          this.getName(),
        ]);
    }
    return this.parentModule
      .getAbsolutePath()
      .concat([
        this.getName(),
      ]);
  }

  /**
   * Provides the qualified path name
   * of this item definition, which is unique for
   * this root instance
   */
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
