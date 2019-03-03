import ItemDefinition, {
  IItemDefinitionRawJSONDataType,
} from "./ItemDefinition";
import {
  IPropertyDefinitionRawJSONDataType,
} from "./ItemDefinition/PropertyDefinition";

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
  i18nName: {
    [locale: string]: string;
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
  private childModules: Module[];
  private childItemDefinitions: ItemDefinition[];
  private onStateChange: () => any;

  /**
   * Builds a module from raw json data
   * @param rawJSON the raw json data
   * @param onStateChange an function for on state change
   */
  constructor(rawJSON: IModuleRawJSONDataType, onStateChange: () => any) {
    this.rawData = rawJSON;
    this.childModules = [];
    this.childItemDefinitions = [];
    this.onStateChange = onStateChange;

    rawJSON.children.forEach((c) => {
      if (c.type === "module") {
        this.childModules.push(new Module(c, onStateChange));
      } else if (c.type === "item") {
        const newChildren = {...c, properties: (
            rawJSON.propExtensions || []
          ).map((e) =>
            ({...e, isExtension: true} as IPropertyDefinitionRawJSONDataType))
          .concat(c.properties || []),
        };
        this.childItemDefinitions.push(
          new ItemDefinition(
            newChildren,
            this,
            null,
            onStateChange,
          ),
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
    do {
      finalDefinition =
        finalDefinition.getItemDefinitionFor(currentName, true);
      currentName = nNameConsumable.shift();
    } while (currentName);

    return finalDefinition;
  }

  /**
   * Provides a detached instance of an item definition
   * this method is useful since it needs no initialization and
   * the detached instance shares nothing with the actual instance
   * so they keep different states
   * @throws an error if the path leads to a dead end
   * @param name the full path of the instance
   */
  public getDetachedItemDefinitionInstanceFor(name: string[]): ItemDefinition {
    return new ItemDefinition(
      this.getItemDefinitionRawFor(name),
      this,
      null,
      this.onStateChange,
    );
  }

  /**
   * Provides all live child item definitions
   */
  public getAllChildItemDefinitions() {
    return this.childItemDefinitions;
  }

  /**
   * Provides all live child modules
   */
  public getAllChildModules() {
    return this.childModules;
  }

  /**
   * Gives the name of this module
   */
  public getName() {
    return this.rawData.name;
  }

  /**
   * Provides the item definition item name
   * @param  locale the locale in iso form
   * @returns a string or null (if locale not valid)
   */
  public getI18nNameFor(locale: string) {
    return this.rawData.i18nName[locale] || null;
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
