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
 * The standard i18n information for usage
 * and any custom keys that are added here as extensions
 * from the i18n file
 */
// tslint:disable-next-line: interface-name
export interface Ii18NType {
  [langLocale: string]: any;
}

// The interface for locale data for translation contains
// a locale, for which there is i18n data, eg, en, es, de, etc...
// this interface just has basic data for all the available locales
// usually only containing the name
export interface ILangLocalesType {
  [locale: string]: {
    name: string;
    rtl: boolean;
  };
}

/**
 * The request limiters that are set in the module
 * to limit the requests and the form of these requests
 * the reason these limiters are in the module is because
 * they are also used for optimization and matenience operations
 */
export interface IRequestLimitersType {
  condition: "AND" | "OR",
  since?: number,
  createdBy?: boolean,
  parenting?: boolean,
  custom?: string[],
}

type RequestManagerFn = (itemDefinition: ItemDefinition, id: string, version: string) => Promise<void>;

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
   * The i18n information that comes from the properties file
   */
  i18nData: Ii18NType;

  /**
   * All the modules contained within the root it is added after
   * the build
   */
  children: IModuleRawJSONDataType[];
}

interface IRootState {
  [key: string]: any;
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
  ): IModuleRawJSONDataType {;

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
   * A registry for fast access of Modules an Item definitions by
   * path
   */
  public pathRegistry: {
    [path: string]: Module | ItemDefinition;
  } = {};
  /**
   * The child modules
   */
  private childModules: Module[];

  /**
   * A root state, normally used in
   * the server side to store information
   * in the root about execution
   */
  private rootState: IRootState = {};

  /**
   * This is used for SSR and lives in the root
   * allows the root to request for data
   */
  private requestManager: RequestManagerFn = null;

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
   * Cleans the state of the root as well as all its children
   */
  public cleanState() {
    this.rootState = {};
    this.childModules && this.childModules.forEach((cm) => cm.cleanState());
  }

  /**
   * Stores a key in the root state
   * @param key the key to store
   * @param value the value to store
   */
  public setStateKey(key: string, value: any) {
    this.rootState[key] = value;
  }

  public setRequestManager(manager: RequestManagerFn) {
    this.requestManager = manager;
  }

  public async callRequestManager(itemDefinition: ItemDefinition, id: string, version: string) {
    await this.requestManager(itemDefinition, id, version);
  }

  /**
   * Returns a given set state key
   * @param key 
   */
  public getStateKey(key: string): any {
    return this.rootState[key] || null;
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
   * Merges the i18n data with another root
   * @param root the other root
   */
  public mergeWithI18n(root: IRootRawJSONDataType) {
    this.rawData.i18nData = {
      ...this.rawData.i18nData,
      ...root.i18nData,
    };
    this.childModules.forEach((mod) => {
      const mergeModuleRaw = Root.getModuleRawFor(root, [mod.getName()]);
      if (mergeModuleRaw) {
        mod.mergeWithI18n(mergeModuleRaw);
      }
    });
  }

  /**
   * Provides the whole i18n data object
   * @returns the whole i18n data object
   */
  public getI18nData() {
    return this.rawData.i18nData;
  }

  /**
   * Provides the module locale data
   * @param  locale the locale in iso form
   * @returns an object or null (if locale not valid)
   */
  public getI18nDataFor(locale: string) {
    return this.rawData.i18nData[locale] || null;
  }
}
