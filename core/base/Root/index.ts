import Module, { IModuleRawJSONDataType } from "./Module";
import { GraphQLOutputType } from "graphql";
import ItemDefinition from "./Module/ItemDefinition";

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
