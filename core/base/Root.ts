import Module, { IModuleRawJSONDataType } from "./Module";
import { IItemDefinitionRawJSONDataType } from "./ItemDefinition";

export interface IRootRawJSONDataType {
  type: "root";
  // Avaialble for the builder
  location?: string;
  pointers?: any;
  raw?: string;

  children: IModuleRawJSONDataType[];
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
