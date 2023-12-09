/**
 * The root object represents the point of entry of the application tree where
 * itemize is contained, this is what contains the modules and item definitons
 * there is only one single root per tree
 * 
 * Usually you do not access or instantiate the root by default or your application
 * but you might access it in the server side, for example via appData
 *
 * @module
 */

import type { IResourceCollectionResult } from "../../server/ssr/collect";
import type { IAppDataType } from "../../server";
import Module, { IModuleRawJSONDataType } from "./Module";
import ItemDefinition from "./Module/ItemDefinition";
import type { IRQRequestFields } from "../../rq-querier";
import type { PropertyDefinitionSupportedType } from "./Module/ItemDefinition/PropertyDefinition/types";
import { RQRootSchema, getRQSchemaForRoot } from "./rq";

/**
 * The standard i18n information for usage
 * and any custom keys that are added here as extensions
 * from the i18n file
 */
export interface Ii18NType {
  [langLocale: string]: any;
}

/**
 * The interface for locale data for translation contains
 * a locale, for which there is i18n data, eg, en, es, de, etc...
 * this interface just has basic data for all the available locales
 * usually only containing the name
 */
export interface ILangLocalesType {
  [locale: string]: {
    name: string;
    rtl: boolean;
  };
}

/**
 * The property request limiter limits the properties that can be retrieved
 * and how
 */
export interface IPropertyRequestLimiter {
  id: string;
  values?: Array<PropertyDefinitionSupportedType>;
}

/**
 * The request limiters that are set in the module
 * to limit the requests and the form of these requests
 * the reason these limiters are in the module is because
 * they are also used for optimization and matenience operations
 */
export interface ISearchLimitersType {
  condition: "AND" | "OR";
  since?: number;
  createdBy?: boolean;
  parenting?: boolean;
  properties?: IPropertyRequestLimiter[];
}

export interface ICustomRoleManagerRoleStatus {
  granted: boolean;
  errorMessage: string;
  errorCode: string;
}

/**
 * This is what a custom role manager should look like
 * for custom role management
 */
export interface ICustomRoleManager {
  checkRoleAccessFor: (roles: string[]) => Promise<ICustomRoleManagerRoleStatus>;
}

type RequestManagerFn = (itemDefinition: ItemDefinition, id: string, version: string, requestFields: IRQRequestFields) => Promise<void>;
type RequestManagerSearchFn = (itemDefinition: ItemDefinition, id: string, version: string, args: any) => Promise<void>;
type RequestManagerResourceFn = (finalPath: string, customResolver?: (appData: IAppDataType, finalPath: string) => IResourceCollectionResult | Promise<IResourceCollectionResult>) => Promise<string>;

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

/**
 * Provides a interface to store stateful actions
 * inside the root itself
 */
interface IRootState {
  [key: string]: any;
}

/**
 * This is the root entry that represents an instance for the root
 * of the itemize schema structure
 */
export default class Root {

  /**
   * Provides a raw module for the given raw json root, this function
   * is used during the build process when the root is not quite parsed
   * so it uses raw processing and it's a static function
   * 
   * @param root the raw json root
   * @param name the path of the module
   * @returns a raw module or null
   * @internal
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
   * @internal
   */
  public rawData: IRootRawJSONDataType;

  /**
   * A registry for fast access of Modules and Item definitions
   * uses the qualified name of those
   * 
   * A common use for the registry is in order to provide quick access for the
   * item definitions or modules, using the qualified name or a path
   * 
   * ```typescript
   * const myElement = appData.root.registry["elements/element"] as ItemDefinition;
   * const myElementModule = appData.root.registry["elements"] as Module;
   * ```
   * 
   * Using the qualified name (or type) also allows to access the same values
   * 
   * ```typescript
   * const myElement = appData.root.registry["MOD_elements__IDEF_element"] as ItemDefinition;
   * const myElementModule = appData.root.registry["MOD_elements"] as Module;
   * ```
   * 
   * The registry is a quick utility that can be used to access these values
   */
  public registry: {
    [qualifiedNameOrPath: string]: Module | ItemDefinition,
  } = {};

  /**
   * The child modules
   * @internal
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
   * allows the root to request for data, this is what is used
   * by the getDerivedServerSideStateFromProps functionality
   * @internal
   */
  private requestManager: RequestManagerFn = null;

  /**
   * This is used for SSR and lives in the root
   * allows the root to request for data, this is what is used
   * by the getDerivedServerSideStateFromProps functionality
   * @internal
   */
  private requestManagerSearch: RequestManagerSearchFn = null;

  /**
   * This is used for SSR and lives in the root
   * allows the root to request for resources, this is what is used
   * by the getDerivedServerSideStateFromProps functionality
   * @internal
   */
  private requestManagerResource: RequestManagerResourceFn = null;

  /**
   * Used by the server side to set server flags to flag
   * other parts of the schema how to operate, mainly
   * conditional rule set about what it should evaluate
   * @internal
   */
  private serverFlags: string[] = null;

  /**
   * Root rq schema
   */
  private rqSchema: RQRootSchema;

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
   * this is used internally during SSR rendering in order to restore
   * the root to a clean pristine state
   * @internal
   */
  public cleanState() {
    this.rootState = {};
    this.serverFlags = null;
    this.childModules && this.childModules.forEach((cm) => cm.cleanState());
  }

  /**
   * Stores a key in the root state this is used internally by SSR
   * in order to store the values for the components to be rendered
   * during the SSR functionality, keys such as title, ogTitle etc...
   * 
   * @param key the key to store
   * @param value the value to store
   * @internal
   */
  public setStateKey(key: string, value: any) {
    this.rootState[key] = value;
  }

  /**
   * Returns a given set state key that was previously set with the
   * setStateKey function
   * @param key the key to provide
   * @returns the previously stored value or null
   * @internal
   */
  public getStateKey(key: string): any {
    return this.rootState[key] || null;
  }

  /**
   * Sets the request manager that is used to resolve search requests
   * during the SSR renders to resolve values for the item
   * definitions in id and version
   * @param manager the manager in question
   * @internal
   */
   public setRequestManagerSearch(manager: RequestManagerSearchFn) {
    this.requestManagerSearch = manager;
  }

  /**
   * Sets the request manager that is used to resolve requests
   * during the SSR renders to resolve values for the item
   * definitions in id and version
   * @param manager the manager in question
   * @internal
   */
  public setRequestManager(manager: RequestManagerFn) {
    this.requestManager = manager;
  }

  /**
   * Sets the request manager that is used to resolve resources
   * during the SSR renders
   * @param manager the manager in question
   * @internal
   */
   public setRequestManagerResource(manager: RequestManagerResourceFn) {
    this.requestManagerResource = manager;
  }

  /**
   * Calls the request manager to request it for a given value
   * to be stored and be applied the state inside our
   * root
   * @param itemDefinition the item definition we need a value for
   * @param args the search arguments
   * @internal
   */
  public async callRequestManagerSearch(itemDefinition: ItemDefinition, id: string, version: string, args: any) {
    await this.requestManagerSearch(itemDefinition, id, version, args);
  }

  /**
   * Calls the request manager to request it for a given value
   * to be stored and be applied the state inside our
   * root
   * @param itemDefinition the item definition we need a value for
   * @param id the id
   * @param version the version
   * @internal
   */
  public async callRequestManager(itemDefinition: ItemDefinition, id: string, version: string, requestFields: IRQRequestFields) {
    await this.requestManager(itemDefinition, id, version, requestFields);
  }

  /**
   * Calls the request manager to request for a given resource
   * @param finalPath
   * @param customResolver
   * @internal
   */
   public async callRequestManagerResource(finalPath: string, customResolver?: (appData: IAppDataType, finalPath: string) => IResourceCollectionResult | Promise<IResourceCollectionResult>): Promise<string> {
    return await this.requestManagerResource(finalPath, customResolver);
  }

  /**
   * list all module names it contains
   * 
   * ```typescript
   * const allModules = appData.root.listModuleNames();
   * const firstModule = appData.root.getModuleFor([allModules[0]]);
   * ```
   * 
   * This is not a very useful method itself but it's there
   * 
   * @returns an array of string with the module names
   */
  public listModuleNames() {
    return this.rawData.children.map((m) => m.name);
  }

  /**
   * Provides all the modules that this root directly contains
   * similar to listModuleNames but it provides live modules
   * this is a preferrable method
   * 
   * ```typescript
   * const allModules = appData.root.getAllModules();
   * allModules.forEach((m) => {
   *   // here you have modules
   *   console.log(m.getName());
   * });
   * ```
   * 
   * @returns an array of Module
   */
  public getAllModules() {
    return this.childModules;
  }

  /**
   * Gets a specific module given its name path, the name path
   * is basically the same as its module/submodule etc... form
   * this function will only return modules and will go as deep
   * in the tree as necessary in order to retrieve modules in it
   * 
   * If you need modules you should use the {@link registry} instead
   * this method is mainly used internally because it is more strict
   * 
   * For example lets say we have a schema that contains a module named
   * cars with a submodule named trucks, which contains several items of specific
   * trucks.
   * 
   * ```typescript
   * const carsModule = appData.root.getModuleFor(["cars"]);
   * const trucksSubmodule = appData.root.getModuleFor(["cars", "trucks"]);
   * 
   * const carModuleFromRegistry = appData.registry("cars") as Module;
   * const trucksSubmoduleFromRegistry = appData.registry("cars/trucks") as Module;
   * ```
   * 
   * It is not possible to access item definitions from this function, only modules unlike
   * the registry
   * 
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
   * Merges the i18n data with another root, basically when we change
   * the language of our root in real time during our app execution and
   * our root does not contain the language data for the given language
   * but we want to ensure that the state is kept and not replace our root
   * or destroy the other root, so we just merge the i18n data that we
   * are trying to fetch as that's the only important bit
   *
   * @param root the other root in raw form
   * @internal
   */
  public mergeWithI18n(root: IRootRawJSONDataType) {
    this.rawData.i18nData = {
      ...this.rawData.i18nData,
      ...root.i18nData,
    };
    this.childModules.forEach((mod) => {
      const mergeModuleRaw = Root.getModuleRawFor(root, [mod.getName()]);
      if (mergeModuleRaw) {
        mod.mergeWithI18n(mergeModuleRaw, root.i18nData);
      }
    });
  }

  /**
   * Provides the whole i18n data object this method is used internally
   * by many retrievers of language data in the client side but can be used
   * in the server side to access the locale information to do arbitrary functionality
   * an example can be for instance to render a template where our template information
   * is in the root
   * 
   * ```typescript
   * const i18nData = appData.root.getI18nData();
   * const i18nDataForTheUserLanguage = i18nData[userLanguage];
   * const templateData = await appData.cache.requestValue("cms/fragment", "FANCY_EMAIL", userLanguage);
   * const renderedResult = renderTemplate(templateData.content, {
   *   user_name: userName,
   *   ok_text: i18nDataForTheUserLanguage.ok,
   *   cancel_text: i18nDataForTheUserLanguage.cancel,
   * });
   * ```
   * 
   * These ok and cancel args we are passing come from the `.properties` object, both the
   * main and the root, these usuall reside at `schema/main-i18n.properties` and `root.properties`
   * 
   * @returns the whole i18n data object
   */
  public getI18nData() {
    return this.rawData.i18nData;
  }

  /**
   * Provides the root locale data for a given specific
   * locale, this is similar to {@link getI18nData} in usability and
   * what it does
   * 
   * ```typescript
   * const i18nDataForTheUserLanguage = appData.root.getI18nDataFor(userLanguage);
   * const templateData = await appData.cache.requestValue("cms/fragment", "FANCY_EMAIL", userLanguage);
   * const renderedResult = renderTemplate(templateData.content, {
   *   user_name: userName,
   *   ok_text: i18nDataForTheUserLanguage.ok,
   *   cancel_text: i18nDataForTheUserLanguage.cancel,
   * });
   * ```
   * 
   * These ok and cancel args we are passing come from the `.properties` object, both the
   * main and the root, these usuall reside at `schema/main-i18n.properties` and `root.properties`
   * 
   * @param locale the locale in iso form
   * @returns an object or null (if locale does not exist)
   */
  public getI18nDataFor(locale: string) {
    return this.rawData.i18nData[locale] || null;
  }

  /**
   * Sets the server flags, these flags such as CREATE,
   * CREATE_ONLY, EDIT, EDIT_ONLY, SEARCH and SEARCH_ONLY
   * are used during conditions on the server side in order
   * to evaluate situations specifically on the server side
   * during a specific action
   *
   * @param flags the flags to set
   * @internal
   */
  public setServerFlags(flags: string[]) {
    this.serverFlags = flags;
  }

  /**
   * Retrieves the server flags, these flags such as CREATE,
   * CREATE_ONLY, EDIT, EDIT_ONLY, SEARCH and SEARCH_ONLY
   * are used during conditions on the server side in order
   * to evaluate situations specifically on the server side
   * during a specific action
   * 
   * @returns an array of string that represents the server flags
   */
  public getServerFlags(): string[] {
    return this.serverFlags;
  }

  public getRQSchema(): RQRootSchema {
    if (this.rqSchema) {
      return this.rqSchema;
    }

    this.rqSchema = getRQSchemaForRoot(this, null);
    return this.rqSchema;
  }
}
