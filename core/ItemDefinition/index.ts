let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv({schemaId: 'id'});
}

export default class ItemDefinition {
  constructor(){

  }
  
  hasItemDefinitionFor(name: string):boolean{
    return false;
  }
  hasProperty(name: string){
    return false;
  }
  getPropertyValue(name: string):string | boolean | number {
    return null;
  }
  getItemInstances(name: string):Array<any> {
    return [];
  }
}
