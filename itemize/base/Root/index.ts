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
  public static getModuleRawFor(
    root: IRootRawJSONDataType,
    name: string[],
  ): IModuleRawJSONDataType {
    // Search for child items
    // remember children can be of type module or item
    // so we got to check
    let finalModule: IModuleRawJSONDataType = root.children
      .find((d) => d.name === name[0]);

    // if we don't find such definition, return null
    if (!finalModule) {
      return null;
    }

    // Make a copy of the name
    const nNameConsumable = [...name];
    nNameConsumable.shift();
    // Get the current name to work on
    let currentName = nNameConsumable.shift();
    if (currentName) {
      do {
        finalModule =
          finalModule.children.find((d) => d.name === currentName && d.type === "module") as IModuleRawJSONDataType;
        // if we find a death end
        if (!finalModule) {
          return null;
        }
        currentName = nNameConsumable.shift();
      } while (currentName);
    }

    return finalModule;
  }

  public rawData: IRootRawJSONDataType;

  private childModules: Module[];

  /**
   * Builds a root from raw data
   * @param rawJSON the raw json data
   */
  constructor(rawJSON: IRootRawJSONDataType) {
    // If its not production run the checks
    this.rawData = rawJSON;

    this.childModules = rawJSON.children.map((c) => new Module(c, null));
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
    return this.childModules;
  }

  /**
   * Gets a specific module given its name
   * @param name the name of the module
   */
  public getModuleFor(name: string[]) {
    // Search within the child definitions
    const resultModule = this.childModules
      .find((m) => m.getName() === name[0]);

    if (!resultModule) {
      throw new Error("Searching for module " +
        name.join("/") + " failed");
    }

    // consume and loop like usual
    const nNameConsumable = [...name];
    nNameConsumable.shift();

    if (nNameConsumable.length === 0) {
      return resultModule;
    } else {
      return resultModule.getModuleFor(nNameConsumable);
    }
  }

  public mergeWithI18n(root: IRootRawJSONDataType) {
    this.childModules.forEach((mod) => {
      const mergeModuleRaw = Root.getModuleRawFor(root, [mod.getName()]);
      if (mergeModuleRaw) {
        mod.mergeWithI18n(mergeModuleRaw);
      }
    });
  }
}
