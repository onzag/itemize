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
    return this.rawData.children.map((m) => (new Module(m)));
  }

  /**
   * Gets a specific module given its name
   * @param name the full path name of the module
   */
  public getModule(name: string[]) {
    if (name.length === 0) {
      throw new Error("invalid module with no path");
    }

    const nameConsumable = [...name];
    let currentModule: IModuleRawJSONDataType = null;
    let currentModuleName = nameConsumable.pop();
    while (currentModuleName) {
      currentModule = ((currentModule || this.rawData) as any).children
        .filter((c: IModuleRawJSONDataType | IItemDefinitionRawJSONDataType) =>
          c.type === "module")
        .find((m: IModuleRawJSONDataType) => m.name === currentModuleName) as
        IModuleRawJSONDataType;

      if (!currentModule) {
        throw new Error("invalid module " + name.join("/"));
      }

      currentModuleName = nameConsumable.pop();
    }

    return new Module(
      currentModule,
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
    },
    additionalProperties: false,
    required: ["type"],
  };
}
