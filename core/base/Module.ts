import ItemDefinition, {
  IItemDefinitionRawJSONDataType,
} from "./ItemDefinition";
import PropertyDefinition, {
  IPropertyDefinitionRawJSONDataType,
} from "./ItemDefinition/PropertyDefinition";
import { buildSearchMode } from "./searchModeBuilder";
import {
  MODULE_PREFIX,
  PREFIXED_CONCAT,
  RESERVED_BASE_PROPERTIES,
  PREFIX_SEARCH,
  RESERVED_SEARCH_PROPERTIES,
  RESERVED_BASE_PROPERTIES_SQL,
} from "../constants";
import { GraphQLInterfaceType, GraphQLList } from "graphql";
import {
  IGraphQLResolversType,
  ISQLSchemaDefinitionType,
  IGQLFieldsDefinitionType,
  IGQLQueryFieldsDefinitionType,
  IGQLValue,
  ISQLTableDefinitionType,
  ISQLTableRowValue,
} from "./Root";

export type OnStateChangeListenerType = () => any;

export interface IModuleRawJSONDataType {
  // Builder data
  type: "module";

  // Avaialble for the builder, data gets stripped
  location?: string;
  pointers?: any;
  raw?: string;
  propExtLocation?: string;
  propExtRaw?: string;
  propExtPointers?: any;

  // Available after a build
  name: string;
  i18nData: {
    [locale: string]: {
      name: string;
      searchFormTitle: string;
      ftsSearchFieldLabel: string,
      ftsSearchFieldPlaceholder: string;
    },
  };

  // module data
  children: Array<IModuleRawJSONDataType | IItemDefinitionRawJSONDataType>;
  propExtensions?: IPropertyDefinitionRawJSONDataType[];
}

export default class Module {
  /**
   * Schema only available in development
   */
  public static schema: any;

  /**
   * Builds the search mode of a raw module
   * this gives a module that is the search module
   * of the given module
   * @param rawData the raw data of the module in json
   */
  public static buildSearchMode(
    rawData: IModuleRawJSONDataType,
  ): IModuleRawJSONDataType {
    return buildSearchMode(rawData);
  }

  /**
   * Provides a full item definition in raw form
   * given raw data of a module and a full path for
   * a name
   * @param parentModuleRaw the raw json module data
   * @param name the name of the item definition as a path
   */
  public static getItemDefinitionRawFor(
    parentModuleRaw: IModuleRawJSONDataType,
    name: string[],
  ): IItemDefinitionRawJSONDataType {
    // Search for child items
    // remember children can be of type module or item
    // so we got to check
    let finalDefinition = parentModuleRaw.children
      .find((d) => d.type === "item" && d.name === name[0]) as
      IItemDefinitionRawJSONDataType;

    // if we don't find such definition, return null
    if (!finalDefinition) {
      return null;
    }

    // Make a copy of the name
    const nNameConsumable = [...name];
    nNameConsumable.shift();
    // Get the current name to work on
    let currentName = nNameConsumable.shift();
    if (currentName) {
      do {
        finalDefinition =
          finalDefinition.childDefinitions.find((d) => d.name === currentName);
        // if we find a death end
        if (!finalDefinition) {
          return null;
        }
        currentName = nNameConsumable.shift();
      } while (currentName);
    }

    return finalDefinition;
  }

  // Standard properties of the class instance, statics aside
  /**
   * The raw data of the module
   */
  public rawData: IModuleRawJSONDataType;
  /**
   * The parent module, if any of this module instance
   * as an instance
   */
  private parentModule: Module;
  /**
   * The search mode of this module, it is generated
   * automatically based on the data using the build search mode
   * functionality
   */
  private searchModeModule: Module;

  /**
   * The children item definitions, as instances
   */
  private childItemDefinitions: ItemDefinition[];
  /**
   * The property definitions that the module itself
   * has, and every item defintion in itself hence
   * inherits
   */
  private propExtensions: PropertyDefinition[];

  private gqlObj: GraphQLInterfaceType;

  /**
   * Builds a module from raw json data
   * @param rawJSON the raw json data of the module
   * @param parentModule the parent module of the module, can be null
   * @param disableSearchModeRetrieval makes the search module be null and it's not calculated
   * this is for use because search modules are generated automatically on every instance
   * this would create an infite loop if this option wasn't available
   */
  constructor(
    rawJSON: IModuleRawJSONDataType,
    parentModule: Module,
    disableSearchModeRetrieval?: boolean,
  ) {
    // Setting the raw variables
    this.rawData = rawJSON;
    // the parent module might be null
    this.parentModule = parentModule;
    // Setting this as empty just starting
    this.childItemDefinitions = [];

    // if we are not denying this
    if (!disableSearchModeRetrieval) {
      // We build the search module, using the static function
      // with our current raw data, null as parent module because search
      // modules are detached from their parents, and we disable
      // the generation of a search module of this same module
      this.searchModeModule = new Module(Module.buildSearchMode(this.rawData), null, true);
    }

    // if we have prop extensions in the raw data we were provided
    if (this.rawData.propExtensions) {
      // we need to populate the prop extensions
      this.propExtensions = this.rawData.propExtensions.map((propExtensionRawJSONData) => {
        // the prop extension constructor is fed the raw json data
        // the current module as the parent module instance
        // no item definition as parent definition instance
        // and true as being an extension
        return new PropertyDefinition(
          propExtensionRawJSONData,
          this,
          null,
          true,
        );
      });
    } else {
      // Otherwise if we have no prop extensions, we populate it as empty
      this.propExtensions = [];
    }

    // now we loop over the children
    this.rawData.children.forEach((childRawJSONData) => {
      // modules are not processed
      if (childRawJSONData.type === "module") {
        return;
      } else if (childRawJSONData.type === "item") {
        // The item is fed to the item definition constructor
        // the parent module is going to be this
        // and null is the parent item definition of the module itself
        const newItemDefinition = new ItemDefinition(
          childRawJSONData,
          this,
          null,
        );

        // We add this new definition to the list
        this.childItemDefinitions.push(
          newItemDefinition,
        );
      } else {
        // Throw an error in case of invalid type
        throw new Error("Cannot handle type " + (childRawJSONData as any).type);
      }
    });
  }

  /**
   * checks whether a module has an item definition for
   * an specific children given its full path
   * @param name the name path of the definition
   */
  public hasItemDefinitionFor(name: string[]): boolean {
    // Try to find the first path
    const finalDefinition = this.rawData.children
      .find((d) => d.type === "item" && d.name === name[0]) as
        IItemDefinitionRawJSONDataType;

    // if we don't find it, it's not there
    if (!finalDefinition) {
      return false;
    }

    // Make a copy
    const nNameConsumable = [...name];
    nNameConsumable.shift();

    // Get the current name to work on
    let currentName = nNameConsumable.shift();
    if (currentName) {
      // loop within
      do {
        finalDefinition.childDefinitions.find((d) => d.name === currentName);
        // if we get to a death end
        if (!finalDefinition) {
          return false;
        }
        currentName = nNameConsumable.shift();
      } while (currentName);
    }

    return true;
  }

  /**
   * Gives you raw data for an item definition given its full
   * path
   * @throws an error if this item definition does not exist
   * @param name the full path of the item definition
   */
  public getItemDefinitionRawFor(name: string[]): IItemDefinitionRawJSONDataType {
    // Use this helper function
    const definition = Module.getItemDefinitionRawFor(
      this.rawData,
      name,
    );
    // Throw the error if not found
    if (!definition) {
      throw new Error("Searching for item definition " +
        name.join("/") + " failed");
    }
    return definition;
  }

  /**
   * Gets a live item definition given a specific path
   * the path has to be full
   * @throws an error if the path finds a dead end
   * @param name the path name for the item definition
   */
  public getItemDefinitionFor(name: string[]): ItemDefinition {
    // Search within the child definitions
    let finalDefinition = this.childItemDefinitions
      .find((d) => d.getName() === name[0]) as ItemDefinition;

    if (!finalDefinition) {
      throw new Error("Searching for item definition " +
        name.join("/") + " failed");
    }

    // consume and loop like usual
    const nNameConsumable = [...name];
    nNameConsumable.shift();

    // Get the current name to work on
    let currentName = nNameConsumable.shift();
    if (currentName) {
      do {
        finalDefinition =
          finalDefinition.getItemDefinitionFor(currentName, true);
        currentName = nNameConsumable.shift();
      } while (currentName);
    }

    return finalDefinition;
  }

  /**
   * Checks whether a property extension exists in this module
   * @param id the property definition id
   */
  public hasPropExtensionFor(id: string) {
    // we use the rawdata to quickly check
    return (this.rawData.propExtensions || [])
      .some((p) => p.id === id);
  }

  /**
   * Provides a prop extension from the module
   * @throws error if the property does not exist
   * @param id the property definition id
   */
  public getPropExtensionFor(id: string) {
    const propertyDefinition = this.propExtensions.find((p) => p.getId() === id);
    if (!propertyDefinition) {
      throw new Error("Requested invalid prop extension " + id);
    }
    return propertyDefinition;
  }

  /**
   * Provides all the prop extensions
   */
  public getAllPropExtensions() {
    return this.propExtensions;
  }

  /**
   * Provides all live child item definitions
   */
  public getAllChildItemDefinitions() {
    return this.childItemDefinitions;
  }

  /**
   * Provides all live child item definitions,
   * recursively
   */
  public getAllChildItemDefinitionsRecursive() {
    let itemDefinitions = this.getAllChildItemDefinitions();
    itemDefinitions.forEach((idef) => {
      itemDefinitions = itemDefinitions.concat(idef.getChildDefinitionsRecursive());
    });
    return itemDefinitions;
  }

  /**
   * Gives the name of this module
   */
  public getName() {
    return this.rawData.name;
  }

  /**
   * Provides the module locale data
   * @param  locale the locale in iso form
   * @returns an object or null (if locale not valid)
   */
  public getI18nDataFor(locale: string) {
    return this.rawData.i18nData[locale] || null;
  }

  /**
   * list all module names it contains
   */
  public listModuleNames() {
    return this.rawData.children.filter((c) => c.type === "module").map((m) => m.name);
  }

  /**
   * Provides all the modules it contains
   * should follow
   */
  public getAllModules() {
    return this.rawData.children
      .filter((c) => c.type === "module")
      .map((m: IModuleRawJSONDataType) => (new Module(m, this)));
  }

  /**
   * Gets a specific module given its name
   * @param name the name of the module
   */
  public getChildModule(name: string) {
    const resultRawData: IModuleRawJSONDataType = this.rawData.children
      .filter((c) => c.type === "module")
      .find((m) => m.name === name) as IModuleRawJSONDataType;
    if (!resultRawData) {
      throw new Error("invalid module " + name);
    }

    return new Module(
      resultRawData,
      this,
    );
  }

  public getSearchModule(): Module {
    return this.searchModeModule;
  }

  public isInSearchMode(): boolean {
    return !this.searchModeModule;
  }

  /**
   * Just gives the parent module
   */
  public getParentModule() {
    return this.parentModule;
  }

  /**
   * Tells whether it has a parent module
   */
  public hasParentModule() {
    return !!this.parentModule;
  }

  /**
   * Adds a listener to the structure of this module instances
   * modules instances have states, as they can be modified
   * its current property values
   * @param listener the listener that wishes to be added
   */
  public addOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    // We get the properties from the prop extensions
    this.propExtensions.forEach((pe) => {
      pe.addOnStateChangeEventListener(listener);
    });

    // also to the item definitions
    this.childItemDefinitions.forEach((cd) => {
      cd.addOnStateChangeEventListener(listener);
    });
  }

  /**
   * Removes a listener the same way it adds it
   * @param listener the listener to be removed
   */
  public removeOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    this.propExtensions.forEach((pe) => {
      pe.removeOnStateChangeEventListener(listener);
    });

    this.childItemDefinitions.forEach((cd) => {
      cd.removeOnStateChangeEventListener(listener);
    });
  }

  /**
   * Provides the full qualified path name that is used for absolute reference of the whole
   * module, this is unique
   */
  public getQualifiedPathName(): string {
    if (this.parentModule) {
      return PREFIXED_CONCAT(this.parentModule.getQualifiedPathName(), MODULE_PREFIX + this.getName());
    }
    return MODULE_PREFIX + this.getName();
  }

  /**
   * Provides the absolute path of this current module
   * in its string array of names
   */
  public getAbsolutePath(): string[] {
    if (this.parentModule) {
      return this.parentModule
        .getAbsolutePath()
        .concat([
          this.getName(),
        ]);
    }
    return [this.getName()];
  }

  /**
   * Provides the table that is necesary to include this module and all
   * its children child definitions into it
   */
  public getSQLTableDefinition(): ISQLTableDefinitionType {
    // add all the standard fields
    let resultTableSchema: ISQLTableDefinitionType = {...RESERVED_BASE_PROPERTIES_SQL};

    // now we loop thru every property (they will all become columns)
    this.getAllPropExtensions().forEach((pd) => {
      resultTableSchema = {
        ...resultTableSchema,
        ...pd.getSQLTableDefinition(),
      };
    });

    return resultTableSchema;
  }

  /**
   * Provides the SQL table schemas that are contained
   * within this module, you expect one schema per item definition
   * it contains
   */
  public getSQLTablesSchema(): ISQLSchemaDefinitionType {
    // this is where it will be contained
    let resultSchema = {
      [this.getQualifiedPathName()]: this.getSQLTableDefinition(),
    };
    this.getAllModules().forEach((cModule) => {
      // first with child modules
      resultSchema = {...resultSchema, ...cModule.getSQLTablesSchema()};
    });
    // then with child item definitions
    this.getAllChildItemDefinitions().forEach((cIdef) => {
      resultSchema = {...resultSchema, ...cIdef.getSQLTablesSchema()};
    });
    return resultSchema;
  }

  /**
   * Provides the fields definition for the module itself, and for all
   * items inside the module which extend these fields, modules by default
   * contain called base properties, which every element has
   * @param excludeBase exclude the base properties and only include prop extensions
   * @param propertiesAsInput if the properties must be in input mode
   */
  public getGQLFieldsDefinition(excludeBase?: boolean, propertiesAsInput?: boolean): IGQLFieldsDefinitionType {
    // first create the base considering on whether we exclude or include
    // the base properties
    let resultFieldsSchema: IGQLFieldsDefinitionType = excludeBase ? {} : {
      ...RESERVED_BASE_PROPERTIES,
    };
    // now we get all prop extensions of this module
    this.getAllPropExtensions().forEach((propExtension) => {
      // and basically get the fields for that property
      resultFieldsSchema = {
        ...resultFieldsSchema,
        ...propExtension.getGQLFieldsDefinition(propertiesAsInput),
      };
    });
    // return that
    return resultFieldsSchema;
  }

  /**
   * Provides the type (for modules an interface)
   * that represents this module data
   */
  public getGQLType(): GraphQLInterfaceType {
    // if we don't have already created the module for this
    // instance, we actually reuse, and this is important
    // if we are using this same item in the same schema
    // when calling via the parent
    if (!this.gqlObj) {
      // we create that object with the data
      this.gqlObj = new GraphQLInterfaceType({
        name: this.getQualifiedPathName(),
        fields: this.getGQLFieldsDefinition(),
      });
    }
    // we return it
    return this.gqlObj;
  }

  /**
   * Provides the query fields in order to create the query
   * for a given module, the only query fields you have access to
   * for modules are search, modules do not support id searches
   * because they only represent items, but would allow you to perform
   * a whole level search into all the items it contains
   * @param resolvers the resolvers that will be used to resolve the query,
   * these are the generic resolvers that are consumed
   */
  public getGQLQueryFields(resolvers?: IGraphQLResolversType): IGQLQueryFieldsDefinitionType {
    // This module might be a search module, and search modules are well, not what we use
    // to retrieve fields, they are to define arguments
    if (this.isInSearchMode()) {
      throw new Error("Modules in search mode has no graphql queries");
    }

    // now we setup the fields for the query
    let fields: IGQLQueryFieldsDefinitionType = {
      [PREFIX_SEARCH + this.getQualifiedPathName()]: {
        type: GraphQLList(this.getGQLType()),
        args: {
          ...RESERVED_SEARCH_PROPERTIES,
          // as you can realize the arguments exclude the base and make it into input mode
          // that means no RESERVED_BASE_PROPERTIES
          ...this.getSearchModule().getGQLFieldsDefinition(true, true),
        },
        resolve: (source: any, args: any, context: any, info: any) => {
          if (resolvers) {
            return resolvers.searchModule({
              source,
              args,
              context,
              info,
            }, this);
          }
        },
      },
    };

    // now we get all child definitions and add the query
    // fields for each of them
    this.getAllChildItemDefinitions().forEach((cIdef) => {
      fields = {
        ...fields,
        ...cIdef.getGQLQueryFields(resolvers),
      };
    });
    return fields;
  }

  /**
   * Because modules have no mutations, it provides all the mutation
   * fields of the item definitions the module contains
   * @param resolvers the resolvers that will be used to resolve the query,
   * these are the generic resolvers that are consumed
   */
  public getGQLMutationFields(resolvers?: IGraphQLResolversType): IGQLQueryFieldsDefinitionType {
    if (this.isInSearchMode()) {
      throw new Error("Modules in search mode has no graphql mutations");
    }

    // we make the fields, it's empty starting with because
    // the module has no mutations
    let fields: IGQLQueryFieldsDefinitionType = {};
    // now we add the mutations of each one of the children
    this.getAllChildItemDefinitions().forEach((cIdef) => {
      fields = {
        ...fields,
        ...cIdef.getGQLMutationFields(resolvers),
      };
    });
    return fields;
  }

  /**
   * Converts a graphql value, with all its items and everything it
   * has into a SQL row data value for this specific module
   * @param data the graphql data
   * @param raw a raw function that is used for creating raw sql statments, eg. knex.raw
   */
  public convertGQLValueToSQLValue(data: IGQLValue, raw: (value: any) => any): ISQLTableRowValue {
    // first we create the row value
    let result: ISQLTableRowValue = {};

    // now we get all the property extensions
    this.getAllPropExtensions().forEach((pd) => {
      result = {...result, ...pd.convertGQLValueToSQLValue(data, raw)};
    });

    return result;
  }

  /**
   * Converts a SQL value directly coming from the database as it is
   * to a graphql value for this specific module, this
   * only includes prop extensions and standard properties
   * and excludes everything else
   * @param row the row value, with all the columns it has; the row
   * can be overblown with other field data, this will extract only the
   * data required for this module
   * @param graphqlFields contains the only properties that are required
   * in the request provided by grapql fields,
   * eg {id: {}, name: {}}
   */
  public convertSQLValueToGQLValue(row: ISQLTableRowValue, graphqlFields: any): IGQLValue {
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
    this.getParentModule().getAllPropExtensions().filter(
      (property) => graphqlFields[property.getId()],
    ).forEach((pd) => {
      result = {...result, ...pd.convertSQLValueToGQLValue(row)};
    });

    return result;
  }

  /**
   * Builds a sql query specific for this module to search
   * within itself in the database
   * @param data the data for the query from graphql
   * @param knexBuilder the knex builder
   */
  public buildSQLQueryFrom(data: IGQLValue, knexBuilder: any) {
    this.getAllPropExtensions().forEach((pd) => {
      if (!pd.isSearchable()) {
        return;
      }

      pd.buildSQLQueryFrom(data, "", knexBuilder);
    });
  }
}

if (process.env.NODE_ENV !== "production") {
  // Unprocessed modules have the properties for type and includes
  // properties name and i18nData get added later
  Module.schema = {
    type: "object",
    properties: {
      type: {
        const: "module",
      },
      includes: {
        type: "array",
        items: {
          type: "string",
        },
        minItems: 1,
      },
      readRoleAccess: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["type"],
  };
}
