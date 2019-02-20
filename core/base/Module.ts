import ItemDefinition, { ItemDefinitionRawJSONDataType } from
  "./ItemDefinition";
import { PropertyDefinitionRawJSONDataType } from
  "./ItemDefinition/PropertyDefinition";

export interface ModuleRawJSONDataType {
  //Builder data
  type: "module",
  location: string,
  name: string,
  i18nName: {
    [locale: string]: string
  },

  //module data
  children: Array<ModuleRawJSONDataType | ItemDefinitionRawJSONDataType>,
  propExtensions?: Array<PropertyDefinitionRawJSONDataType>
}

export default class Module {
  private rawData: ModuleRawJSONDataType;
  private childModules: Array<Module>;
  private childItemDefinitions: Array<ItemDefinition>
  private onStateChange:()=>any;

  constructor(rawJSON: ModuleRawJSONDataType, onStateChange: ()=>any){
    this.rawData = rawJSON;
    this.childModules = [];
    this.childItemDefinitions = [];
    this.onStateChange = onStateChange;

    rawJSON.children.forEach(c=>{
      if (c.type === "module"){
        this.childModules.push(new Module(c, onStateChange));
      } else if (c.type === "item"){
        let newChildren = {...c, properties: (
            rawJSON.propExtensions || []
          ).map(e=>
            (<PropertyDefinitionRawJSONDataType>{...e, isExtension: true}))
          .concat(c.properties || [])
        };
        this.childItemDefinitions.push(
          new ItemDefinition(
            newChildren,
            this,
            null,
            onStateChange
          )
        );
      } else {
        throw new Error("Cannot handle type " + (c as any).type);
      }
    });
  }

  hasItemDefinitionFor(name: Array<string>):boolean {
    let finalDefinition = <ItemDefinitionRawJSONDataType>this.rawData.children
      .find(d=>d.type === "item" && d.name === name[0]);

    if (!finalDefinition){
      return false;
    }

    let nNameConsumable = [...name];
    nNameConsumable.shift();
    let currentName:string;
    do {
      currentName = nNameConsumable.shift();
      finalDefinition.childDefinitions.find(d=>d.name === currentName);
      if (!finalDefinition){
        return false;
      }
    } while (currentName);

    return true;
  }

  getItemDefinitionRawFor(name: Array<string>):ItemDefinitionRawJSONDataType {
    let finalDefinition = <ItemDefinitionRawJSONDataType>this.rawData.children
      .find(d=>d.type === "item" && d.name === name[0]);

    if (!finalDefinition){
      throw new Error("Searching for item definition " +
        name.join("/") + " failed");
    }

    let nNameConsumable = [...name];
    nNameConsumable.shift();
    let currentName:string;
    do {
      currentName = nNameConsumable.shift();
      finalDefinition =
        finalDefinition.childDefinitions.find(d=>d.name === currentName);
      if (!finalDefinition){
        throw new Error("Searching for item definition " +
          name.join("/") + " failed");
      }
    } while (currentName);

    return finalDefinition;
  }

  getItemDefinitionFor(name: Array<string>):ItemDefinition {
    let finalDefinition = <ItemDefinition>this.childItemDefinitions
      .find(d=>d.getName() === name[0]);

    if (!finalDefinition){
      throw new Error("Searching for item definition " +
        name.join("/") + " failed");
    }

    let nNameConsumable = [...name];
    nNameConsumable.shift();
    let currentName:string;
    do {
      currentName = nNameConsumable.shift();
      finalDefinition =
        finalDefinition.getItemDefinitionFor(currentName, true);
    } while (currentName);

    return finalDefinition;
  }

  getDetachedItemDefinitionInstanceFor(name: Array<string>):ItemDefinition {
    //TODO remove this, this is for hacking the imports
    return {
      getNewInstance: ()=>(this.getDetachedItemDefinitionInstanceFor([]))
    } as any;

    return new ItemDefinition(
      this.getItemDefinitionRawFor(name),
      this,
      null,
      this.onStateChange
    );
  }

  getAllChildItemDefinitions(){
    return this.childItemDefinitions;
  }

  getAllChildModules(){
    return this.childModules;
  }

  getName(){
    return this.rawData.name
  }

  /**
   * Provides the item definition item name
   * @param  locale the locale in iso form
   * @return        a string or null (if locale not valid)
   */
  getI18nNameFor(locale: string){
    return this.rawData.i18nName[locale] || null;
  }

  static schema:any;
}

if (process.env.NODE_ENV !== "production") {
  Module.schema = {
    type: "object",
    properties: {
      type: {
        const: "module"
      },
      location: {
        type: "string"
      },
      name: {
        type: "string"
      },
      i18nName: {
        type: "object",
        additionalProperties: {
          type: "string"
        }
      },
      children: {
        type: "array",
        items: {},
        minItems: 1
      },
      propExtensions: {
        type: "array",
        items: {},
        minItems: 1
      }
    },
    required: ["type", "location", "name", "i18nName"]
  }
}
