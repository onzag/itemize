let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv({schemaId: 'id'});
}

export interface ItemDefinitionPreImportedStructure {

}

export default class ItemDefinition {
  constructor(){

  }

  addOnStateChangeListener(listener: ()=>any):void {

  }

  getName():string {
    return ""
  }

  hasItemDefinitionFor(name: string):boolean{
    return false;
  }
  getItemDefinitionFor(name: string):any{
    return null;
  }
  hasPropertyDefinitionFor(name: string){
    return false;
  }
  getPropertyDefinitionFor(name: string):any{
    return null;
  }
  getItemInstances(name: string):Array<any> {
    return [];
  }
  getNewInstance(){
    return this;
  }
  geti18nFor(id: string):string {
    return ""
  }

  static import(
    location: string | ItemDefinitionPreImportedStructure,
    language?: string){

  }
}
