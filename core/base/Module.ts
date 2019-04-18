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
      nameAlt?: string;
      searchFormTitleAlt?: string;
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
    let finalDefinition = parentModuleRaw.children
      .find((d) => d.type === "item" && d.name === name[0]) as
      IItemDefinitionRawJSONDataType;

    if (!finalDefinition) {
      return null;
    }

    // Make a copy
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

  public rawData: IModuleRawJSONDataType;
  private parentModule: Module;
  private searchModeModule: Module;

  private childItemDefinitions: ItemDefinition[];
  private propExtensions: PropertyDefinition[];

  /**
   * Builds a module from raw json data
   * @param rawJSON the raw json data
   */
  constructor(
    rawJSON: IModuleRawJSONDataType,
    parentModule: Module,
    disableSearchModeRetrieval?: boolean,
  ) {
    this.rawData = rawJSON;
    this.parentModule = parentModule;
    this.childItemDefinitions = [];

    if (!disableSearchModeRetrieval) {
      this.searchModeModule = new Module(Module.buildSearchMode(this.rawData), null, true);
    }

    if (rawJSON.propExtensions) {
      this.propExtensions = rawJSON.propExtensions.map((pe) => {
        return new PropertyDefinition(
          pe,
          this,
          null,
          true,
        );
      });
    } else {
      this.propExtensions = [];
    }

    rawJSON.children.forEach((c) => {
      if (c.type === "module") {
        return;
      } else if (c.type === "item") {
        const newItemDefinition = new ItemDefinition(
          c,
          this,
          null,
        );

        this.childItemDefinitions.push(
          newItemDefinition,
        );
      } else {
        throw new Error("Cannot handle type " + (c as any).type);
      }
    });
  }

  /**
   * checks whether a module has an item definition for
   * an specific children given its full path
   * @param name the name path of the definition
   */
  public hasItemDefinitionFor(name: string[]): boolean {
    const finalDefinition = this.rawData.children
      .find((d) => d.type === "item" && d.name === name[0]) as
        IItemDefinitionRawJSONDataType;

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

  public addOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    this.propExtensions.forEach((pe) => {
      pe.addOnStateChangeEventListener(listener);
    });

    this.childItemDefinitions.forEach((cd) => {
      cd.addOnStateChangeEventListener(listener);
    });
  }

  public removeOnStateChangeEventListener(listener: OnStateChangeListenerType) {
    this.propExtensions.forEach((pe) => {
      pe.removeOnStateChangeEventListener(listener);
    });

    this.childItemDefinitions.forEach((cd) => {
      cd.removeOnStateChangeEventListener(listener);
    });
  }
}

if (process.env.NODE_ENV !== "production") {
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
