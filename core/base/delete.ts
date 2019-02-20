//And the function that does the actual checking
ConditionalRuleSet.check = function(
  rawJSON: ConditionalRuleSetRawJSONDataType,
  parentItemDefinition: ItemDefinition){

  //Let's validate the raw json
  let valid = ConditionalRuleSet.schema_validate(rawJSON);
  if (!valid) {
    throw new CheckUpError(
      "Schema Check Failed",
      parentItemDefinition.location,
      ConditionalRuleSet.schema_validate.errors,
      rawJSON
    );
  };

  //Let's try to search for the item definition for that given component
  //should be there at least to be valid, even if item instances are never
  //created
  let component =
    (<ConditionalRuleSetRawJSONDataComponentType>rawJSON).component;
  if (component &&
    !parentItemDefinition.hasItemDefinitionFor(component)){
    throw new CheckUpError(
      "Conditional rule set item definition not avaibale",
      parentItemDefinition.location,
      {component},
      rawJSON
    );
  }

  //Let's try to find the property that is specified and check
  //whether the value type is valid
  let property =
    (<ConditionalRuleSetRawJSONDataPropertyType>rawJSON).property;
  let value =
    (<ConditionalRuleSetRawJSONDataPropertyType>rawJSON).value;

  if (property &&
    !parentItemDefinition.hasPropertyDefinitionFor(property)){
    let obj:any = {};
    obj[property] = value;
    throw new CheckUpError(
      "Conditional rule set property invalid at",
      parentItemDefinition.location,
      obj,
      rawJSON
    );
  }
}

ItemDefinition.check = function(
  rawJSON: ItemDefinitionRawJSONDataType
){
  //we check the schema for validity
  let valid = ItemDefinition.schema_validate(rawJSON);

  //if not valid throw the errors
  if (!valid) {
    throw new CheckUpError(
      "Schema Check Failed",
      rawJSON.location,
      ItemDefinition.schema_validate.errors,
      rawJSON
    );
  };
}

//the checker, takes the same arguments as the constructor
Item.check = function(
  rawJSON: ItemRawJSONDataType,
  parentItemDefinition: ItemDefinition,
){

  //we check the schema for validity
  let valid = Item.schema_validate(rawJSON);

  //if not valid throw the errors
  if (!valid) {
    throw new CheckUpError(
      "Schema Check Failed",
      parentItemDefinition.location,
      Item.schema_validate.errors,
      rawJSON
    );
  };

  let isGroup = !!rawJSON.items;

  //check whether the item definition exists for this item
  //it must exist to be an item
  if (!isGroup && !parentItemDefinition.hasItemDefinitionFor(rawJSON.name)){
    throw new CheckUpError(
      "Missing item definition",
      parentItemDefinition.location,
      rawJSON.name,
      {name: rawJSON.name},
      rawJSON
    );
  }

  if (isGroup && rawJSON.predefinedProperties){
    throw new CheckUpError(
      "Cannot set predefinedProperties and be a group",
      parentItemDefinition.location,
      {predefinedProperties: rawJSON.predefinedProperties},
      rawJSON
    );
  }

  if (isGroup && rawJSON.enforcedProperties){
    throw new CheckUpError(
      "Cannot set enforcedProperties and be a group",
      parentItemDefinition.location,
      {enforcedProperties: rawJSON.enforcedProperties},
      rawJSON
    );
  }

  if (isGroup && rawJSON.sinkIn){
    throw new CheckUpError(
      "Cannot set sinkIn and be a group",
      parentItemDefinition.location,
      {sinkIn: rawJSON.sinkIn},
      rawJSON
    );
  }

  //get all the predefined properties or an empty array
  let predefinedPropertiesKeys = rawJSON.predefinedProperties ?
    Object.keys(rawJSON.predefinedProperties) : [];

  //The same for the enforced
  let enforcedPropertiesKeys = rawJSON.enforcedProperties ?
    Object.keys(rawJSON.enforcedProperties) : [];

  //we don't need to check whether this properties exist in
  //the item definition because PropertiesValueMappingDefiniton does that

  //see if there are shared between both arrays
  let sharedItems = predefinedPropertiesKeys
    .filter(value => -1 !== enforcedPropertiesKeys.indexOf(value));

  //predefined properties and enforced properties must not be shared
  //for the simple reason that enforced properties are set in stone
  if (sharedItems.length){
    throw new CheckUpError(
      "predefined and enforced properties collision",
      parentItemDefinition.location,
      sharedItems,
      rawJSON
    );
  }

  //Now we check again this time against the sinkIn properties
  let sharedItems2 = (rawJSON.sinkIn || [])
    .filter(value => -1 !== enforcedPropertiesKeys.indexOf(value));

  //equally there might not be a collision here, enforced properties
  //need not to sink in
  if (sharedItems2.length){
    throw new CheckUpError(
      "sink in properties and enforced properties collision",
      parentItemDefinition.location,
      sharedItems2,
      rawJSON
    );
  }

  //Now we check whether this properties exist for sinkin
  //unlike predefinedProperties and enforcedProperties nothing checks
  //sinkIn properties
  if (rawJSON.sinkIn){
    let itemDefinitionRaw = parentItemDefinition
      .getItemDefinitionRawFor(rawJSON.name);

    let propertyToSinkIn:string;
    for (propertyToSinkIn of rawJSON.sinkIn){
      if (!itemDefinitionRaw.properties ||
        !itemDefinitionRaw.properties.some(p=>p.id === propertyToSinkIn)){
        throw new CheckUpError(
          "Missing property in item definition",
          parentItemDefinition.location,
          propertyToSinkIn,
          rawJSON.sinkIn,
          {sinkIn: rawJSON.sinkIn},
          rawJSON
        );
      }
    }
  }

  //Check Conflicting defaultExcluded and defaultExcludedIf
  if (typeof rawJSON.defaultExcluded !== "undefined" &&
    typeof rawJSON.defaultExcludedIf !== "undefined"){
    throw new CheckUpError(
      "Conflicting properties defaultExcluded and defaultExcludedIf",
      parentItemDefinition.location,
      rawJSON
    );
  }

  //also Conflicting mightExclude and mightExcludeIf
  if (typeof rawJSON.mightExclude !== "undefined" &&
    typeof rawJSON.mightExcludeIf !== "undefined"){
    throw new CheckUpError(
      "Conflicting properties mightExclude and mightExcludeIf",
      parentItemDefinition.location,
      rawJSON
    );
  }
}

//the checker, takes the same arguments as the constructor
PropertiesValueMappingDefiniton.check = function(
  rawJSON: PropertiesValueMappingDefinitonRawJSONDataType,
  parentItemDefinition: ItemDefinition,
  referredItemDefinition: ItemDefinition
){

  //we check the schema for validity
  let valid = PropertiesValueMappingDefiniton.schema_validate(rawJSON);

  //if not valid throw the errors
  if (!valid) {
    throw new CheckUpError(
      "Schema Check Failed",
      parentItemDefinition.location,
      PropertiesValueMappingDefiniton.schema_validate.errors,
      rawJSON
    );
  };

  //We need to loop over the properties that were given
  let propertyList = Object.keys(rawJSON);
  let propertyName;
  for (propertyName of propertyList){

    //get the value for them
    let propertyValue = rawJSON[propertyName];

    //and lets check that they actually have such properties
    if (!referredItemDefinition.hasPropertyDefinitionFor(propertyName)){
      let obj:any = {};
      obj[propertyName] = propertyValue;
      throw new CheckUpError(
        "Property not available in referred itemDefinition",
        parentItemDefinition.location,
        propertyName,
        obj,
        rawJSON
      );
    };

    //And check whether the value is even valid
    if (!referredItemDefinition.getPropertyDefinitionFor(propertyName)
      .isValidValue(propertyValue)){
      let obj:any = {};
      obj[propertyName] = propertyValue;
      throw new CheckUpError(
        "Property value is invalid in referred itemDefinition",
        parentItemDefinition.location,
        propertyValue,
        obj,
        rawJSON
      );
    };
  }
}

let staticIsValidValue = function(
  type: PropertyDefinitionSupportedTypes,
  nullable: boolean,
  values: Array<PropertyDefinitionSupportedType>,
  value: PropertyDefinitionSupportedType
):boolean {
  if (nullable && value === null){
    return true;
  }
  if (values && !values.includes(value)){
    return false;
  }
  //we get the definition and run basic checks
  let definition = PropertyDefinition.supportedTypesStandard[type];
  if (definition.json && typeof value !== definition.json){
    return false;
  }
  if (definition.validate && !definition.validate(value)){
    return false
  }
  return true;
}

//the checker, takes the same arguments as the constructor
PropertyDefinition.check = function(
  rawJSON: PropertyDefinitionRawJSONDataType,
  parentItemDefinition: ItemDefinition
){

  //we check the schema for validity
  let valid = PropertyDefinition.schema_validate(rawJSON);

  //if not valid throw the errors
  if (!valid) {
    throw new CheckUpError(
      "Schema Check Failed",
      parentItemDefinition.location,
      PropertyDefinition.schema_validate.errors,
      rawJSON
    );
  };

  //lets check that all the ones in values are valid
  if (rawJSON.values){
    let value;
    for (value of rawJSON.values){
      if (!staticIsValidValue(
        rawJSON.type,
        rawJSON.nullable,
        rawJSON.values,
        value
      )){
        throw new CheckUpError(
          "Invalid value for item",
          parentItemDefinition.location,
          value,
          {values: rawJSON.values},
          rawJSON
        );
      };
    }
  }

  //Let's check whether the default value is valid too
  if (rawJSON.default){
    if (!staticIsValidValue(
      rawJSON.type,
      rawJSON.nullable,
      rawJSON.values,
      rawJSON.default
    )){
      throw new CheckUpError(
        "Invalid type for default",
        parentItemDefinition.location,
        {default: rawJSON.default},
        rawJSON
      );
    };
  }

  //And the default if values are valid
  if (rawJSON.defaultIf){
    let rule:PropertyDefinitionRawJSONRuleDataType;
    for (rule of rawJSON.defaultIf){
      if (!staticIsValidValue(
        rawJSON.type,
        rawJSON.nullable,
        rawJSON.values,
        rule.value
      )){
        throw new CheckUpError(
          "Invalid type for default if definition",
          parentItemDefinition.location,
          rule,
          rawJSON.defaultIf,
          rawJSON
        );
      };
    }
  }

  if (rawJSON.type !== "integer" && rawJSON.type !== "number" &&
    rawJSON.type !== "currency" && typeof rawJSON.min !== "undefined"){
    throw new CheckUpError(
      "Cannot set a min value if type not integer or number",
      parentItemDefinition.location,
      {min: rawJSON.min},
      rawJSON
    );
  } else if (rawJSON.type !== "integer" && rawJSON.type !== "number" &&
    rawJSON.type !== "currency" && typeof rawJSON.max !== "undefined"){
    throw new CheckUpError(
      "Cannot set a max value if type not integer or number",
      parentItemDefinition.location,
      {max: rawJSON.max},
      rawJSON
    );
  } else if (rawJSON.type !== "number" && rawJSON.type !== "currency" &&
    typeof rawJSON.maxDecimalCount !== "undefined"){
    throw new CheckUpError(
      "Cannot set a maxDecimalCount value if type not number",
      parentItemDefinition.location,
      {maxDecimalCount: rawJSON.maxDecimalCount},
      rawJSON
    );
  } else if (rawJSON.type !== "string" && rawJSON.type !== "text" &&
    typeof rawJSON.minLength !== "undefined"){
    throw new CheckUpError(
      "Cannot set a minLength value if type not text or string",
      parentItemDefinition.location,
      {minLength: rawJSON.minLength},
      rawJSON
    );
  } else if (rawJSON.type !== "string" && rawJSON.type !== "text" &&
    typeof rawJSON.maxLength !== "undefined"){
    throw new CheckUpError(
      "Cannot set a maxLength value if type not text or string",
      parentItemDefinition.location,
      {maxLength: rawJSON.maxLength},
      rawJSON
    );
  }
}


Module.check = function(
  rawJSON: ModuleRawJSONDataType
){
  //we check the schema for validity
  let valid = Module.schema_validate(rawJSON);

  //if not valid throw the errors
  if (!valid) {
    throw new CheckUpError(
      "Schema Check Failed",
      rawJSON.location,
      Module.schema_validate.errors,
      rawJSON
    );
  };
}

Root.check = function(
  rawJSON: RootRawJSONDataType
){
  //we check the schema for validity
  let valid = Root.schema_validate(rawJSON);

  //if not valid throw the errors
  if (!valid) {
    throw new CheckUpError(
      "Schema Check Failed",
      rawJSON.location,
      Root.schema_validate.errors,
      rawJSON
    );
  };
}
