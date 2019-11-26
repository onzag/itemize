import Module, { IModuleRawJSONDataType } from "./Module";

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
