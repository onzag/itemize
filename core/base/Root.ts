import Module, { IModuleRawJSONDataType } from "./Module";
import { GraphQLSchema, GraphQLObjectType, GraphQLOutputType } from "graphql";
import ItemDefinition from "./ItemDefinition";
import { any } from "bluebird";

export interface IRootRawJSONDataType {
  type: "root";

  // Avaialble for the builder
  location?: string;
  pointers?: any;
  raw?: string;

  // Set after the build
  children: IModuleRawJSONDataType[];
}

// The interface for locale i18n data
// contains keys and strings that are the values
// tslint:disable-next-line: interface-name
export interface Ii18NType {
  [key: string]: string;
}

// This is the build data that comes raw from the
// server, as it is raw, in the file
export interface IRawJSONBuildDataType {
  root: IRootRawJSONDataType;
  i18n: Ii18NType;
}

interface IGraphQLIdefResolverArgs {
  source: any;
  args: any;
  context: any;
  info: any;
}

export type FGraphQLIdefResolverType = (
  resolverArgs: IGraphQLIdefResolverArgs,
  itemDefinition: ItemDefinition,
) => any;

export interface IGraphQLResolversType {
  getItemDefinition: FGraphQLIdefResolverType;
  addItemDefinition: FGraphQLIdefResolverType;
}

export interface ISQLColumnDefinitionType {
  type: string;
  notNull?: boolean;
}

export interface ISQLTableDefinitionType {
  [rowName: string]: ISQLColumnDefinitionType;
}

export interface ISQLSchemaDefinitionType {
  [tableName: string]: ISQLTableDefinitionType;
}

export interface IGQLSingleQueryFieldDefinitionType {
  type: GraphQLOutputType;
  args: IGQLFieldsDefinitionType;
  resolve: any;
}
export interface IGQLSingleFieldDefinitionType {
  type: GraphQLOutputType;
}
export interface IGQLQueryFieldsDefinitionType {
  [fieldName: string]: IGQLSingleQueryFieldDefinitionType;
}
export interface IGQLFieldsDefinitionType {
  [fieldName: string]: IGQLSingleFieldDefinitionType;
}
export interface ISQLTableRowValue {
  [columnName: string]: any;
}
export interface IGQLValue {
  [key: string]: any;
}

export default class Root {
  /**
   * Schema only available in development
   */
  public static schema: any;

  public rawData: IRootRawJSONDataType;

  /**
   * Builds a root from raw data
   * @param rawJSON the raw json data
   */
  constructor(rawJSON: IRootRawJSONDataType) {
    // If its not production run the checks
    this.rawData = rawJSON;
  }

  /**
   * list all module names it contains
   */
  public listModuleNames() {
    return this.rawData.children.map((m) => m.name);
  }

  /**
   * Provides all the modules it contains
   * should follow
   */
  public getAllModules() {
    return this.rawData.children.map((m) => (new Module(m, null)));
  }

  /**
   * Provides the whole schema that is necessary to populate
   * in order for all the items contained within this root
   * to function in the database
   */
  public getSQLTablesSchema(): ISQLSchemaDefinitionType {
    let resultSchema = {};
    this.getAllModules().forEach((cModule) => {
      // add together the schemas of all the modules
      resultSchema = {...resultSchema, ...cModule.getSQLTablesSchema()};
    });
    // return that
    return resultSchema;
  }

  /**
   * Gets a specific module given its name
   * @param name the name of the module
   */
  public getModule(name: string) {
    const resultRawData: IModuleRawJSONDataType = this.rawData.children
      .find((m) => m.name === name);
    if (!resultRawData) {
      throw new Error("invalid module " + name);
    }

    return new Module(
      resultRawData,
      null,
    );
  }

  /**
   * Retrieves the whole structure of the current loaded instance
   * of the schema into a valid graphql schema
   * @param resolvers the resolvers that will resolve the GET, SEARCH, ADD, EDIT and REMOVE requests
   */
  public getGQLSchema(resolvers?: IGraphQLResolversType): GraphQLSchema {
    // the mutation fields for the mutation query
    let mutationFields = {};
    // the query fields for the query
    let queryFields = {};

    // now we get all the modules stored on root
    this.getAllModules().forEach((mod) => {
      // and per module we extend the query and mutation fields
      queryFields = {
        ...queryFields,
        ...mod.getGQLQueryFields(resolvers),
      };
      mutationFields = {
        ...mutationFields,
        ...mod.getGQLMutationFields(resolvers),
      };
    });

    // now we create those queries who happen to be object types
    const query = new GraphQLObjectType({
      name: "ROOT_QUERY",
      fields: queryFields,
    });

    // same for mutation they are object types
    const mutation = new GraphQLObjectType({
      name: "ROOT_MUTATIONS",
      fields: mutationFields,
    });

    // now we return the shchema
    return new GraphQLSchema({
      query,
      mutation,
    });
  }
}

if (process.env.NODE_ENV !== "production") {
  // The root schema object when unprocessed contains
  // the type, includes, with the modules list, language, and the i18n path
  // for the default i18n data to include, all but the type gets stripped
  Root.schema = {
    type: "object",
    properties: {
      type: {
        const: "root",
      },
      includes: {
        type: "array",
        items: {
          type: "string",
        },
        minItems: 1,
      },
      lang: {
        type: "array",
        items: {
          type: "string",
        },
      },
      i18n: {
        type: "string",
      },
    },
    additionalProperties: false,
    required: ["type", "i18n"],
  };
}
