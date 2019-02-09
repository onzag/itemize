import ItemDefinition from '../ItemDefinition';

let ajv;
if (process.env.NODE_ENV !== "production") {
  const Ajv = require('ajv');
  ajv = new Ajv({schemaId: 'id'});
}

//USEFUL TYPES
export interface PropertiesValueMappingDefinitonType {
  [propertyName: string]: boolean | string | number
}

//DATA TYPES
export type PropertiesValueMappingDefinitonDataType = PropertiesValueMappingDefinitonType;

export default class PropertiesValueMappingDefiniton {
  private properties:PropertiesValueMappingDefinitonType;
  public referredItemDefinition:ItemDefinition;
  public parentItemDefinition:ItemDefinition;
  public parent:any;
  constructor(data: PropertiesValueMappingDefinitonDataType, parent: any, parentItemDefinition: ItemDefinition, referredItemDefinition: ItemDefinition, runChecks?: boolean){
    if (process.env.NODE_ENV !== "production") {
      runChecks && PropertiesValueMappingDefiniton.check(data, parent, parentItemDefinition, referredItemDefinition);
    }
    this.properties = data;
    this.parent = parent;
    this.parentItemDefinition = parentItemDefinition;
    this.referredItemDefinition = referredItemDefinition;
  }
  static schema:any;
  static schema_validate:any;
  static check:any;
}

if (process.env.NODE_ENV !== "production") {
  PropertiesValueMappingDefiniton.schema = {
    type: "object",
    additionalProperties: {
      type: ["boolean", "string", "number"]
    },
    minProperties: 1
  };
  PropertiesValueMappingDefiniton.schema_validate = ajv.compile(PropertiesValueMappingDefiniton.schema);
  PropertiesValueMappingDefiniton.check = function (properties: PropertiesValueMappingDefinitonDataType, parent: any,
    parentItemDefinition: ItemDefinition, referredItemDefinition: ItemDefinition){
    let valid = PropertiesValueMappingDefiniton.schema_validate(properties);
    if (!valid) {
      console.log(PropertiesValueMappingDefiniton.schema_validate.errors);
      throw new Error();
    };

    let propertyList = Object.keys(properties);
    let propertyName;
    for (propertyName of propertyList){
      let propertyValue = properties[propertyName];

      if (!referredItemDefinition.hasProperty(propertyName)){
        console.error("Invalid property definition property not available in referred itemDefinition", properties, "in property named", propertyName, "valued", propertyValue);
        return;
      };
    }
  }
}
