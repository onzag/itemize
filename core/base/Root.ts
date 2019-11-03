import Module, { IModuleRawJSONDataType } from "./Module";
import { GraphQLSchema, GraphQLObjectType } from "graphql";
import ItemDefinition from "./ItemDefinition";

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

export type FGraphQLIdefGetResolverType = (
  resolverArgs: {
    source: any,
    args: any,
    context: any,
    info: any,
  },
  itemDefinition: ItemDefinition,
) => any;

export interface IGraphQLResolversType {
  getItemDefinition: FGraphQLIdefGetResolverType;
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

  public getSQLTableSchemas() {
    let resultSchema = {};
    this.getAllModules().forEach((cModule) => {
      // first with child modules
      resultSchema = {...resultSchema, ...cModule.getSQLTableSchemas()};
    });
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

  public getGQLSchema(resolvers?: IGraphQLResolversType, instanceId?: string) {
    let mutationFields = {};
    let queryFields = {};
    const givenInstanceId = instanceId ? instanceId : (new Date()).getTime().toString();

    this.getAllModules().forEach((mod) => {
      queryFields = {
        ...queryFields,
        ...mod.getGQLQueryFields(givenInstanceId, resolvers),
      };
      mutationFields = {
        ...mutationFields,
        ...mod.getGQLMutationFields(givenInstanceId, resolvers),
      };
    });

    const query = new GraphQLObjectType({
      name: "ROOT_QUERY",
      fields: queryFields,
    });

    const mutation = new GraphQLObjectType({
      name: "ROOT_MUTATIONS",
      fields: mutationFields,
    });

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
