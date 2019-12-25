import ItemDefinition, {
  IItemDefinitionRawJSONDataType, ItemDefinitionIOActions,
} from "./ItemDefinition";
import PropertyDefinition, {
  IPropertyDefinitionRawJSONDataType,
} from "./ItemDefinition/PropertyDefinition";
import {
  MODULE_PREFIX,
  PREFIXED_CONCAT,
  ANYONE_METAROLE,
  SELF_METAROLE,
} from "../../../constants";
import { GraphQLInterfaceType, GraphQLObjectType } from "graphql";
import { buildSearchModeModule } from "./search-mode";

export interface IRawJsonI18NSpecificLocaleDataType {
  name: string;
  fts_search_field_label: string;
  fts_search_field_placeholder: string;
  custom?: {
    [key: string]: string;
  };
  // policies is however not used in module
  // since policies cannot really be added to modules
  policies?: {
    delete?: {
      [policyName: string]: {
        label: string,
        failed: string,
      },
    },
    edit?: {
      [policyName: string]: {
        label: string,
        failed: string,
      },
    },
  };
}

export interface IRawJSONI18NDataType {
  [locale: string]: IRawJsonI18NSpecificLocaleDataType;
}

export type ListenerType = () => any;

export interface IModuleRawJSONDataType {
  // Builder data
  type: "module";

  // Avaialble for the builder, data gets stripped
  location?: string;
  i18nDataLocation?: string;
  pointers?: any;
  raw?: string;
  propExtLocation?: string;
  propExtRaw?: string;
  propExtPointers?: any;

  // Available after a build
  name: string;
  i18nData: IRawJSONI18NDataType;

  readRoleAccess?: string[];

  // module data
  children: Array<IModuleRawJSONDataType | IItemDefinitionRawJSONDataType>;
  propExtensions?: IPropertyDefinitionRawJSONDataType[];
}

export default class Module {
  /**
   * Builds the search mode of a raw module
   * this gives a module that is the search module
   * of the given module
   * @param rawData the raw data of the module in json
   */
  public static buildSearchMode(
    rawData: IModuleRawJSONDataType,
  ): IModuleRawJSONDataType {
    return buildSearchModeModule(rawData);
  }

  public static getPropExtensionRawFor(parentModuleRaw: IModuleRawJSONDataType, id: string) {
    const propertyDefinition = parentModuleRaw.propExtensions.find((p) => p.id === id);
    return propertyDefinition;
  }

  /**
   * Provides a full item definition in raw form
   * given raw data of a module and a full path for
   * a name
   * @param parentModuleRaw the raw json module data
   * @param name the name of the item definition as a path
   */
  public static getItemDefinitionRawFor(
    parentModuleRaw: IModuleRawJSONDataType,
    name: string[],
  ): IItemDefinitionRawJSONDataType {
    // Search for child items
    // remember children can be of type module or item
    // so we got to check
    let finalDefinition = parentModuleRaw.children
      .find((d) => d.type === "item" && d.name === name[0]) as
      IItemDefinitionRawJSONDataType;

    // if we don't find such definition, return null
    if (!finalDefinition) {
      return null;
    }

    // Make a copy of the name
    const nNameConsumable = [...name];
    nNameConsumable.shift();
    // Get the current name to work on
    let currentName = nNameConsumable.shift();
    if (currentName) {
      do {
        finalDefinition =
          finalDefinition.childDefinitions.find((d) => d.name === currentName);
        // if we find a death end
        if (!finalDefinition) {
          return null;
        }
        currentName = nNameConsumable.shift();
      } while (currentName);
    }

    return finalDefinition;
  }

  // Standard properties of the class instance, statics aside
  /**
   * The raw data of the module
   */
  public rawData: IModuleRawJSONDataType;

  // graphql helper
  // tslint:disable-next-line: variable-name
  public _gqlObj: GraphQLInterfaceType;
  // tslint:disable-next-line: variable-name
  public _gqlQueryObj: GraphQLObjectType;

  /**
   * The parent module, if any of this module instance
   * as an instance
   */
  private parentModule: Module;
  /**
   * The search mode of this module, it is generated
   * automatically based on the data using the build search mode
   * functionality
   */
  private searchModeModule: Module;

  /**
   * The children item definitions, as instances
   */
  private childItemDefinitions: ItemDefinition[];
  private childModules: Module[];
  private childPropExtensionItemDefinition: ItemDefinition;
  /**
   * The property definitions that the module itself
   * has, and every item defintion in itself hence
   * inherits
   */
  private propExtensions: PropertyDefinition[];

  private listeners: {
    [id: number]: ListenerType[],
  };

  /**
   * Builds a module from raw json data
   * @param rawJSON the raw json data of the module
   * @param parentModule the parent module of the module, can be null
   * @param disableSearchModeRetrieval makes the search module be null and it's not calculated
   * this is for use because search modules are generated automatically on every instance
   * this would create an infite loop if this option wasn't available
   */
  constructor(
    rawJSON: IModuleRawJSONDataType,
    parentModule: Module,
    disableSearchModeRetrieval?: boolean,
  ) {
    // Setting the raw variables
    this.rawData = rawJSON;
    // the parent module might be null
    this.parentModule = parentModule;
    // Setting this as empty just starting
    this.childItemDefinitions = [];
    this.childModules = [];

    // if we are not denying this
    if (!disableSearchModeRetrieval) {
      // We build the search module, using the static function
      // with our current raw data, null as parent module because search
      // modules are detached from their parents, and we disable
      // the generation of a search module of this same module
      this.searchModeModule = new Module(Module.buildSearchMode(this.rawData), this, true);
    }

    // if we have prop extensions in the raw data we were provided
    if (this.rawData.propExtensions) {
      // we need to populate the prop extensions
      this.propExtensions = this.rawData.propExtensions.map((propExtensionRawJSONData) => {
        // the prop extension constructor is fed the raw json data
        // the current module as the parent module instance
        // no item definition as parent definition instance
        // and true as being an extension
        return new PropertyDefinition(
          propExtensionRawJSONData,
          this,
          null,
          true,
        );
      });
    } else {
      // Otherwise if we have no prop extensions, we populate it as empty
      this.propExtensions = [];
    }

    // now we loop over the children
    this.rawData.children.forEach((childRawJSONData) => {
      // modules are not processed
      if (childRawJSONData.type === "module") {
        const newModule = new Module(
          childRawJSONData,
          this,
        );
        this.childModules.push(
          newModule,
        );
      } else if (childRawJSONData.type === "item") {
        // The item is fed to the item definition constructor
        // the parent module is going to be this
        // and null is the parent item definition of the module itself
        const newItemDefinition = new ItemDefinition(
          childRawJSONData,
          this,
          null,
        );

        // We add this new definition to the list
        this.childItemDefinitions.push(
          newItemDefinition,
        );
      } else {
        // Throw an error in case of invalid type
        throw new Error("Cannot handle type " + (childRawJSONData as any).type);
      }
    });

    this.childPropExtensionItemDefinition = new ItemDefinition({
      type: "item",
      name: this.rawData.name,
      i18nData: this.rawData.i18nData,
      readRoleAccess: this.rawData.readRoleAccess,
    }, this, null);
    this.childPropExtensionItemDefinition.setAsExtensionsInstance();

    this.listeners = [];
  }

  /**
   * checks whether a module has an item definition for
   * an specific children given its full path
   * @param name the name path of the definition
   */
  public hasItemDefinitionFor(name: string[]): boolean {
    // Try to find the first path
    const finalDefinition = this.rawData.children
      .find((d) => d.type === "item" && d.name === name[0]) as
        IItemDefinitionRawJSONDataType;

    // if we don't find it, it's not there
    if (!finalDefinition) {
      return false;
    }

    // Make a copy
    const nNameConsumable = [...name];
    nNameConsumable.shift();

    // Get the current name to work on
    let currentName = nNameConsumable.shift();
    if (currentName) {
      // loop within
      do {
        finalDefinition.childDefinitions.find((d) => d.name === currentName);
        // if we get to a death end
        if (!finalDefinition) {
          return false;
        }
        currentName = nNameConsumable.shift();
      } while (currentName);
    }

    return true;
  }

  /**
   * Gives you raw data for an item definition given its full
   * path
   * @throws an error if this item definition does not exist
   * @param name the full path of the item definition
   */
  public getItemDefinitionRawFor(name: string[]): IItemDefinitionRawJSONDataType {
    // Use this helper function
    const definition = Module.getItemDefinitionRawFor(
      this.rawData,
      name,
    );
    // Throw the error if not found
    if (!definition) {
      throw new Error("Searching for item definition " +
        name.join("/") + " failed");
    }
    return definition;
  }

  /**
   * Gets a live item definition given a specific path
   * the path has to be full
   * @throws an error if the path finds a dead end
   * @param name the path name for the item definition
   */
  public getItemDefinitionFor(name: string[]): ItemDefinition {
    // Search within the child definitions
    let finalDefinition = this.childItemDefinitions
      .find((d) => d.getName() === name[0]) as ItemDefinition;

    if (!finalDefinition) {
      throw new Error("Searching for item definition " +
        name.join("/") + " failed");
    }

    // consume and loop like usual
    const nNameConsumable = [...name];
    nNameConsumable.shift();

    // Get the current name to work on
    let currentName = nNameConsumable.shift();
    if (currentName) {
      do {
        finalDefinition =
          finalDefinition.getDirectlyAvailableItemDefinitionInContextFor(currentName, true);
        currentName = nNameConsumable.shift();
      } while (currentName);
    }

    return finalDefinition;
  }

  public getPropExtensionItemDefinition() {
    return this.childPropExtensionItemDefinition;
  }

  /**
   * Gets a specific module given its name
   * @param name the name of the module
   */
  public getModuleFor(name: string[]): Module {
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
   * Checks whether a property extension exists in this module
   * @param id the property definition id
   */
  public hasPropExtensionFor(id: string) {
    // we use the rawdata to quickly check
    return (this.rawData.propExtensions || [])
      .some((p) => p.id === id);
  }

  /**
   * Provides a prop extension from the module
   * @throws error if the property does not exist
   * @param id the property definition id
   */
  public getPropExtensionFor(id: string) {
    const propertyDefinition = this.propExtensions.find((p) => p.getId() === id);
    if (!propertyDefinition) {
      throw new Error("Requested invalid prop extension " + id);
    }
    return propertyDefinition;
  }

  /**
   * Provides all the prop extensions
   */
  public getAllPropExtensions() {
    return this.propExtensions;
  }

  /**
   * Provides all live child item definitions
   */
  public getAllChildItemDefinitions() {
    return this.childItemDefinitions;
  }

  /**
   * Gives the name of this module
   */
  public getName() {
    return this.rawData.name;
  }

  /**
   * Provides the module locale data
   * @param  locale the locale in iso form
   * @returns an object or null (if locale not valid)
   */
  public getI18nDataFor(locale: string) {
    return this.rawData.i18nData[locale] || null;
  }

  /**
   * list all module names it contains
   */
  public listModuleNames() {
    return this.rawData.children.filter((c) => c.type === "module").map((m) => m.name);
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
  public getChildModule(name: string) {
    const resultModule = this.childModules.find((m) => m.getName() === name);
    if (!resultModule) {
      throw new Error("invalid module " + name);
    }

    return resultModule;
  }

  public getStandardModule(): Module {
    if (this.searchModeModule) {
      throw new Error("No standard module for " + this.getName());
    }

    return this.parentModule;
  }

  public getSearchModule(): Module {
    if (!this.searchModeModule) {
      throw new Error("No search module for " + this.getName());
    }
    return this.searchModeModule;
  }

  public isInSearchMode(): boolean {
    return !this.searchModeModule;
  }

  /**
   * Just gives the parent module
   */
  public getParentModule() {
    return this.parentModule;
  }

  public getPath(): string[] {
    const parentPath = this.parentModule ? this.parentModule.getPath() : [];
    return parentPath.concat(this.getName());
  }

  /**
   * Tells whether it has a parent module
   */
  public hasParentModule() {
    return !!this.parentModule;
  }

  public addListener(id: number, listener: ListenerType) {
    this.listeners[id] = this.listeners[id] || [];
    this.listeners[id].push(listener);
  }

  public removeListener(id: number, listener: ListenerType) {
    if (!this.listeners[id]) {
      return;
    }
    const index = this.listeners[id].indexOf(listener);
    if (index !== -1) {
      this.listeners[id].splice(index, 1);
    }
  }

  public triggerListeners(id: number, but?: ListenerType) {
    if (!this.listeners[id]) {
      return;
    }
    this.listeners[id].filter((l) => l !== but).forEach((l) => l());
  }

  /**
   * Provides the full qualified path name that is used for absolute reference of the whole
   * module, this is unique
   */
  public getQualifiedPathName(): string {
    if (this.parentModule) {
      return PREFIXED_CONCAT(this.parentModule.getQualifiedPathName(), MODULE_PREFIX + this.getName());
    }
    return MODULE_PREFIX + this.getName();
  }

  /**
   * Provides the absolute path of this current module
   * in its string array of names
   */
  public getAbsolutePath(): string[] {
    if (this.parentModule) {
      return this.parentModule
        .getAbsolutePath()
        .concat([
          this.getName(),
        ]);
    }
    return [this.getName()];
  }

  public getRolesWithAccessTo(action: ItemDefinitionIOActions) {
    if (action === ItemDefinitionIOActions.READ) {
      return this.rawData.readRoleAccess || [ANYONE_METAROLE];
    }
    return [];
  }

  public checkRoleAccessFor(
    action: ItemDefinitionIOActions,
    role: string,
    userId: number,
    ownerUserId: number,
    requestedFields: any,
    throwError: boolean,
  ) {
    const rolesWithAccess = this.getRolesWithAccessTo(action);
    const modLevelAccess = rolesWithAccess.includes(ANYONE_METAROLE) || (
      rolesWithAccess.includes(SELF_METAROLE) && userId === ownerUserId
    ) || rolesWithAccess.includes(role);

    if (!modLevelAccess) {
      if (throwError) {
        throw new Error(`Forbidden, user ${userId} with role ${role} has no ${action} access to resource ${this.getName()}` +
        ` with only roles ${rolesWithAccess.join(", ")} can be granted access`);
      }
      return false;
    }

    return Object.keys(requestedFields).every((requestedField) => {
      const propDef = this.getPropExtensionFor(requestedField);
      return propDef.checkRoleAccessFor(action, role, userId, ownerUserId, throwError);
    });
  }

  public mergeWithI18n(
    mod: IModuleRawJSONDataType,
  ) {
    this.rawData.i18nData = {
      ...this.rawData.i18nData,
      ...mod.i18nData,
    };

    this.childModules.forEach((cMod) => {
      const nameOfMergeModule = cMod.getName();
      const mergeModuleRaw: IModuleRawJSONDataType = mod.children &&
        mod.children.find((m) => m.type === "module" && m.name === nameOfMergeModule) as IModuleRawJSONDataType;
      if (mergeModuleRaw) {
        cMod.mergeWithI18n(mergeModuleRaw);
      }
    });

    this.childItemDefinitions.forEach((cIdef) => {
      const mergeIdefRaw = Module.getItemDefinitionRawFor(mod, [cIdef.getName()]);
      if (mergeIdefRaw) {
        cIdef.mergeWithI18n(mod, mergeIdefRaw);
      }
    });

    this.propExtensions.forEach((pExt) => {
      const mergePropertyRaw = Module.getPropExtensionRawFor(mod, pExt.getId());
      if (mergePropertyRaw) {
        pExt.mergeWithI18n(mergePropertyRaw);
      }
    });

    if (this.searchModeModule) {
      const searchModeRaw = Module.buildSearchMode(mod);
      this.searchModeModule.mergeWithI18n(searchModeRaw);
    }
  }
}
