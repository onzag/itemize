/**
 * The root object represents the point of entry of the application tree where
 * itemize is contained, this is what contains the modules and item definitons
 * there is only one single root per tree
 *
 * @packageDocumentation
 */

import Module, { IModuleRawJSONDataType } from "./Module";
import ItemDefinition from "./Module/ItemDefinition";

/**
 * This is the raw processed form of the root
 */
export interface IRootRawJSONDataType {
  /**
   * The type is always root
   */
  type: "root";

  /**
   * Exists during the building process and represents the file location
   * it is stripped after processing
   */
  location?: string;
  /**
   * Also exists during the building process only and it's the pointers
   * that are used for tracebacks
   */
  pointers?: any;
  /**
   * The raw content of the file itself, as a plain string, it's stripped
   * after processing
   */
  raw?: string;

  /**
   * All the modules contained within the root it is added after
   * the build
   */
  children: IModuleRawJSONDataType[];
}

// TODO make it belong to the root, it is very strange to have language
// that comes with the root, it specified by the root, but doesn't belong to it
/**
 * The standard i18n information for usage
 * and any custom keys that are added here as extensions
 * from the i18n file, this file doesn't belong per say to the root
 */
// tslint:disable-next-line: interface-name
export interface Ii18NType {
  [langLocale: string]: {
    [key: string]: string;
  };
}

/**
 * This is the build data that comes raw from the
 * server, as it is raw, in the file
 */
export interface IRawJSONBuildDataType {
  root: IRootRawJSONDataType;
  i18n: Ii18NType;
}

/**
 * This is the root entry leaf
 */
export default class Root {
  /**
   * Provides a raw module for the given raw json root
   * @param root the raw json root
   * @param name the path of the module
   * @returns a raw module or null
   */
  public static getModuleRawFor(
    root: IRootRawJSONDataType,
    name: string[],
  ): IModuleRawJSONDataType {
    // Search for child items
    // remember children can be of type module or item definition
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

  /**
   * The raw data this root was generated from
   */
  public rawData: IRootRawJSONDataType;
  /**
   * A registry for fast access of Modules and Item definitions
   * uses the qualified name of those
   */
  public registry: {
    [qualifiedName: string]: Module | ItemDefinition,
  } = {};
  /**
   * The child modules
   */
  private childModules: Module[];

  /**
   * Builds a root from raw data
   * @param rawJSON the raw json data
   */
  constructor(rawJSON: IRootRawJSONDataType) {
    // If its not production run the checks
    this.rawData = rawJSON;

    this.childModules = rawJSON.children.map((c) => new Module(c, this, null));

    // run the init
    this.childModules.forEach((cm) => {
      cm.init();
    });
  }

  /**
   * list all module names it contains
   * @returns an array of string with the module names
   */
  public listModuleNames() {
    return this.rawData.children.map((m) => m.name);
  }

  /**
   * Provides all the modules it contains
   * should follow
   * @returns an array of Module
   */
  public getAllModules() {
    return this.childModules;
  }

  /**
   * Gets a specific module given its name
   * @param name the path of the module
   * @returns an specific module
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

  /**
   * Merges the i18n data with another root, since roots
   * do not contain i18n datas it just merges the entire tree
   * @param root the other root
   */
  public mergeWithI18n(root: IRootRawJSONDataType) {
    this.childModules.forEach((mod) => {
      const mergeModuleRaw = Root.getModuleRawFor(root, [mod.getName()]);
      if (mergeModuleRaw) {
        mod.mergeWithI18n(mergeModuleRaw);
      }
    });
  }
}
