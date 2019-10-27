import ItemDefinition, {
  IItemDefinitionRawJSONDataType,
} from "./ItemDefinition";
import PropertyDefinition, {
  IPropertyDefinitionRawJSONDataType,
} from "./ItemDefinition/PropertyDefinition";
import { buildSearchMode } from "./searchModeBuilder";

export type OnStateChangeListenerType = () => any;

export interface IModuleRawJSONDataType {
  // Builder data
  type: "module";

  // Avaialble for the builder, data gets stripped
  location?: string;
  pointers?: any;
  raw?: string;
  propExtLocation?: string;
  propExtRaw?: string;
  propExtPointers?: any;

  // Available after a build
  name: string;
  i18nData: {
    [locale: string]: {
      name: string;
      searchFormTitle: string;
      ftsSearchFieldLabel: string,
      ftsSearchFieldPlaceholder: string;
    },
  };

  // module data
  children: Array<IModuleRawJSONDataType | IItemDefinitionRawJSONDataType>;
  propExtensions?: IPropertyDefinitionRawJSONDataType[];
}

export default class Module {
  /**
   * Schema only available in development
   */
  public static schema: any;

  /**
   * Builds the search mode of a raw module
   * this gives a module that is the search module
   * of the given module
   * @param rawData the raw data of the module in json
   */
  public static buildSearchMode(
    rawData: IModuleRawJSONDataType,
  ): IModuleRawJSONDataType {
    return buildSearchMode(rawData);
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
  /**
   * The property definitions that the module itself
   * has, and every item defintion in itself hence
   * inherits
   */
  private propExtensions: PropertyDefinition[];

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

    // if we are not denying this
    if (!disableSearchModeRetrieval) {
      // We build the search module, using the static function
      // with our current raw data, null as parent module because search
      // modules are detached from their parents, and we disable
      // the generation of a search module of this same module
      this.searchModeModule = new Module(Module.buildSearchMode(this.rawData), null, true);
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
        return;
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
          finalDefinition.getItemDefinitionFor(currentName, true);
        currentName = nNameConsumable.shift();
      } while (currentName);
    }

    return finalDefinition;
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
    return this.rawData.children
      .filter((c) => c.type === "module")
      .map((m: IModuleRawJSONDataType) => (new Module(m, this)));
  }

  /**
   * Gets a specific module given its name
   * @param name the name of the module
   */
  public getChildModule(name: string) {
    const resultRawData: IModuleRawJSONDataType = this.rawData.children
      .filter((c) => c.type === "module")
      .find((m) => m.name === name) as IModuleRawJSONDataType;
    if (!resultRawData) {
      throw new Error("invalid module " + name);
    }

    return new Module(
      resultRawData,
      this,
    );
  }

  public getSearchModule(): Module {
    return this.searchModeModule;
  }

  /**
   * Just gives the parent module
   */
  public getParentModule() {
    return this.parentModule;
  }

  /**
   * Tells whether it has a parent module
   */
  public hasParentModule() {
    return !!this.parentModule;
  }

  /**
   * Adds a listener to the structure of this module instances
   * modules instances have states, as they can be modified
   * its current property values
   * @param listener the listener that wishes to be added
   */
  public addOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    // We get the properties from the prop extensions
    this.propExtensions.forEach((pe) => {
      pe.addOnStateChangeEventListener(listener);
    });

    // also to the item definitions
    this.childItemDefinitions.forEach((cd) => {
      cd.addOnStateChangeEventListener(listener);
    });
  }

  /**
   * Removes a listener the same way it adds it
   * @param listener the listener to be removed
   */
  public removeOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    this.propExtensions.forEach((pe) => {
      pe.removeOnStateChangeEventListener(listener);
    });

    this.childItemDefinitions.forEach((cd) => {
      cd.removeOnStateChangeEventListener(listener);
    });
  }

  /**
   * Provides the full qualified path name that is used for absolute reference of the whole
   * module, this is unique
   */
  public getQualifiedPathName(): string {
    if (this.parentModule) {
      return this.parentModule.getQualifiedPathName() + "__MOD_" + this.getName();
    }
    return "MOD_" + this.getName();
  }
}

if (process.env.NODE_ENV !== "production") {
  // Unprocessed modules have the properties for type and includes
  // properties name and i18nData get added later
  Module.schema = {
    type: "object",
    properties: {
      type: {
        const: "module",
      },
      includes: {
        type: "array",
        items: {
          type: "string",
        },
        minItems: 1,
      },
    },
    required: ["type"],
  };
}
