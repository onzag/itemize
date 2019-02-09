let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv({schemaId: 'id'});
}

export default class ItemDefinition {
  constructor(data){

  }
  hasItemDefinitionFor(name: string){

  }
  hasProperty(name: string){

  }
  getPropertyValue(name: string):string | boolean | number {
    return null;
  }
  getItemInstances(name: string):Array<any> {
    return [];
  }
}
