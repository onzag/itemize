import { IRootRawJSONDataType } from "../base/Root";
import CheckUpError from "./Error";
import Traceback from "./Traceback";
import { IModuleRawJSONDataType } from "../base/Module";
import PropertyDefinition from "../base/ItemDefinition/PropertyDefinition";
import ItemDefinition from "../base/ItemDefinition";
import {
  IPropertyDefinitionRawJSONDataType,
} from "../base/ItemDefinition/PropertyDefinition";
import {
  IItemDefinitionRawJSONDataType,
} from "../base/ItemDefinition";
import {
  PropertyDefinitionSupportedType,
} from "../base/ItemDefinition/PropertyDefinition";
import {
  IPropertiesValueMappingReferredPropertyValue,
} from "../base/ItemDefinition/PropertiesValueMappingDefiniton";
import {
  IPropertiesValueMappingDefinitonRawJSONDataType,
} from "../base/ItemDefinition/PropertiesValueMappingDefiniton";
import { IItemRawJSONDataType } from "../base/ItemDefinition/Item";
import {
  IConditionalRuleSetRawJSONDataPropertyType,
} from "../base/ItemDefinition/ConditionalRuleSet";
import {
  IConditionalRuleSetRawJSONDataComponentType,
} from "../base/ItemDefinition/ConditionalRuleSet";
import {
  IConditionalRuleSetRawJSONDataType,
} from "../base/ItemDefinition/ConditionalRuleSet";
import {
  RESERVED_BASE_PROPERTIES,
  RESERVED_SEARCH_PROPERTIES,
  RESERVED_GETTER_PROPERTIES,
} from "../constants";
import "source-map-support/register";

export function checkConditionalRuleSet(
  rawData: IConditionalRuleSetRawJSONDataType,
  parentItemDefinition: IItemDefinitionRawJSONDataType,
  parentModule: IModuleRawJSONDataType,
  traceback: Traceback,
) {
  // Let's try to search for the item definition for that given component
  // should be there at least to be valid, even if item instances are never
  // created
  const component =
    (rawData as IConditionalRuleSetRawJSONDataComponentType).component;
  if (component &&
    !ItemDefinition.getItemDefinitionRawFor(
      parentItemDefinition,
      parentModule,
      component,
    )) {
    throw new CheckUpError(
      "Conditional rule set item definition not available",
      traceback.newTraceToBit("component"),
    );
  }

  // Let's check the property
  const rawDataAsProperty =
    (rawData as IConditionalRuleSetRawJSONDataPropertyType);
  if (rawDataAsProperty.property) {
    const propDef = ItemDefinition.getPropertyDefinitionRawFor(
      parentItemDefinition,
      parentModule,
      rawDataAsProperty.property,
      true,
    );
    if (!propDef) {
      throw new CheckUpError(
        "Conditional rule set property not available",
        traceback.newTraceToBit("property"),
      );
    } else if (!PropertyDefinition.isValidValue(
      propDef,
      rawDataAsProperty.value,
      true,
    )) {
      throw new CheckUpError(
        "Conditional rule set value invalid",
        traceback.newTraceToBit("value"),
      );
    }
  }
}

export function checkItemDefinition(
  rawData: IItemDefinitionRawJSONDataType,
  parentModule: IModuleRawJSONDataType,
  traceback: Traceback,
) {
  const actualTraceback = traceback.newTraceToLocation(rawData.location);
  actualTraceback.setupPointers(rawData.pointers, rawData.raw);

  if (rawData.name.startsWith("_")) {
    throw new CheckUpError(
      "Definition name '" + rawData.name +
        "' starts with underscore, and that's invalid",
      actualTraceback.newTraceToBit("name"),
    );
  }

  if (rawData.childDefinitions) {
    rawData
    .childDefinitions.forEach((cd) =>
      checkItemDefinition(cd, parentModule, actualTraceback));
  }

  if (rawData.includes) {
    const idPool: string[] = [];
    rawData.includes.forEach((itm, index) =>
      checkItem(itm, rawData, parentModule, idPool,
        actualTraceback.newTraceToBit("includes").newTraceToBit(index)));
  }

  if (rawData.properties) {
    rawData.properties
      .forEach((p, index) =>
        checkPropertyDefinition(p, rawData, parentModule,
         actualTraceback.newTraceToBit("properties").newTraceToBit(index)));
  }
}

export function checkItem(
  rawData: IItemRawJSONDataType,
  parentItemDefinition: IItemDefinitionRawJSONDataType,
  parentModule: IModuleRawJSONDataType,
  idPool: string[],
  traceback: Traceback,
) {
  if (idPool.includes(rawData.id)) {
    throw new CheckUpError(
      "Duplicate id in the same item definition",
      traceback.newTraceToBit("id"),
    );
  }
  idPool.push(rawData.id);

  const isGroup = !!rawData.items;

  // check whether the item definition exists for this item
  // it must exist to be an item
  if (!isGroup && !ItemDefinition.getItemDefinitionRawFor(
    parentItemDefinition, parentModule, rawData.name)) {
    throw new CheckUpError(
      "Missing item definition",
      traceback.newTraceToBit("name"),
    );
  }

  if (isGroup) {
    rawData.items.forEach((itm, index) =>
      checkItem(itm, parentItemDefinition, parentModule, idPool,
        traceback.newTraceToBit("items").newTraceToBit(index)));
  }

  if (isGroup && rawData.predefinedProperties) {
    throw new CheckUpError(
      "Cannot set predefinedProperties and be a group",
      traceback.newTraceToBit("predefinedProperties"),
    );
  }

  if (isGroup && rawData.enforcedProperties) {
    throw new CheckUpError(
      "Cannot set enforcedProperties and be a group",
      traceback.newTraceToBit("enforcedProperties"),
    );
  }

  if (isGroup && rawData.sinkIn) {
    throw new CheckUpError(
      "Cannot set sinkIn and be a group",
      traceback.newTraceToBit("sinkIn"),
    );
  }

  // get all the predefined properties or an empty array
  const predefinedPropertiesKeys = rawData.predefinedProperties ?
    Object.keys(rawData.predefinedProperties) : [];

  // The same for the enforced
  const enforcedPropertiesKeys = rawData.enforcedProperties ?
    Object.keys(rawData.enforcedProperties) : [];

  // we don't need to check whether this properties exist in
  // the item definition because PropertiesValueMappingDefiniton does that

  // see if there are shared between both arrays
  const sharedItems = predefinedPropertiesKeys
    .filter((value) => -1 !== enforcedPropertiesKeys.indexOf(value));

  // predefined properties and enforced properties must not be shared
  // for the simple reason that enforced properties are set in stone
  if (sharedItems.length) {
    throw new CheckUpError(
      "predefined and enforced properties collision on " +
        sharedItems.join(","),
      traceback,
    );
  }

  // Now we check again this time against the sinkIn properties
  const sharedItems2 = (rawData.sinkIn || [])
    .filter((value) => -1 !== enforcedPropertiesKeys.indexOf(value));

  // equally there might not be a collision here, enforced properties
  // need not to sink in
  if (sharedItems2.length) {
    throw new CheckUpError(
      "sink in properties and enforced properties collision on " +
        sharedItems2.join(","),
      traceback,
    );
  }

  const referredItemDefinitionRaw = ItemDefinition.getItemDefinitionRawFor(
    parentItemDefinition, parentModule, rawData.name);

  // Now we check whether this properties exist for sinkin
  if (rawData.sinkIn) {
    rawData.sinkIn.forEach((propertyToSinkIn, index) => {
      // when sinking in properties that are not part of the
      // element itself (extended) are not valid
      if (!ItemDefinition
        .getPropertyDefinitionRawFor(
          referredItemDefinitionRaw,
          parentModule,
          propertyToSinkIn,
          false,
        )
      ) {
        throw new CheckUpError(
          "Missing property in item definition",
          traceback.newTraceToBit("sinkIn").newTraceToBit(index),
        );
      }
    });
  }

  // enforced and predefined properties aren't check here they are check
  // on the value mapper
  ["enforcedProperties", "predefinedProperties"].forEach((p) => {
    if (rawData[p]) {
      checkPropertiesValueMappingDefiniton(
        rawData[p],
        parentItemDefinition,
        referredItemDefinitionRaw,
        parentModule,
        traceback.newTraceToBit(p),
      );
    }
  });

  // Check Conflicting defaultExcluded and defaultExcludedIf
  if (typeof rawData.defaultExcluded !== "undefined" &&
    typeof rawData.defaultExcludedIf !== "undefined") {
    throw new CheckUpError(
      "Conflicting properties defaultExcluded and defaultExcludedIf",
      traceback,
    );
  } else if (rawData.defaultExcludedIf) {
    checkConditionalRuleSet(
      rawData.defaultExcludedIf,
      parentItemDefinition,
      parentModule,
      traceback.newTraceToBit("defaultExcludedIf"),
    );
  }

  // also Conflicting mightExclude and mightExcludeIf
  if (typeof rawData.mightExclude !== "undefined" &&
    typeof rawData.mightExcludeIf !== "undefined") {
    throw new CheckUpError(
      "Conflicting properties mightExclude and mightExcludeIf",
      traceback,
    );
  } else if (rawData.mightExcludeIf) {
    checkConditionalRuleSet(
      rawData.mightExcludeIf,
      parentItemDefinition,
      parentModule,
      traceback.newTraceToBit("mightExcludeIf"),
    );
  }

  if (rawData.excludedIf) {
    checkConditionalRuleSet(
      rawData.excludedIf,
      parentItemDefinition,
      parentModule,
      traceback.newTraceToBit("excludedIf"),
    );
  }
}

export function checkPropertiesValueMappingDefiniton(
  rawData: IPropertiesValueMappingDefinitonRawJSONDataType,
  parentItemDefinition: IItemDefinitionRawJSONDataType,
  referredItemDefinition: IItemDefinitionRawJSONDataType,
  parentModule: IModuleRawJSONDataType,
  traceback: Traceback,
) {
  // We need to loop over the properties that were given
  const propertyList = Object.keys(rawData);
  let propertyIdOfTheReferredItem;
  for (propertyIdOfTheReferredItem of propertyList) {

    // get the value for them
    const propertyValueAppliedToTheReferred =
      rawData[propertyIdOfTheReferredItem];

    // and lets check that they actually have such properties
    // the same way value mapper setters are not allowed
    // to set the values of the extended properties
    // they only exist within item definitions
    // and set item properties
    const propertyDefinitionOfTheReferredItem =
      ItemDefinition.getPropertyDefinitionRawFor(
        referredItemDefinition,
        parentModule,
        propertyIdOfTheReferredItem,
        false,
      );
    if (!propertyDefinitionOfTheReferredItem) {
      throw new CheckUpError(
        `Property '${propertyIdOfTheReferredItem}' not available` +
        ` in referred '${referredItemDefinition.name}'`,
        traceback.newTraceToBit(propertyIdOfTheReferredItem),
      );
    }

    const referredPropertyAsValueApplied =
      (propertyValueAppliedToTheReferred as
        IPropertiesValueMappingReferredPropertyValue);
    // we must ensure it's not a referred property to do the check
    if (!referredPropertyAsValueApplied.property) {
      // And check whether the value is even valid
      if (!PropertyDefinition.isValidValue(propertyDefinitionOfTheReferredItem,
        propertyValueAppliedToTheReferred as PropertyDefinitionSupportedType, true)) {
        throw new CheckUpError(
          `Property value for '${propertyIdOfTheReferredItem}' is invalid` +
          ` for referred '${referredItemDefinition.name}'`,
          traceback.newTraceToBit(propertyIdOfTheReferredItem),
        );
      }
    } else {
      // let's get the referred definition this property is about
      // this one is allowed to access the prop extensions
      // as to set a value it is allowed to use the prop extension
      // as a value
      const propertyAsValueDefinition =
        ItemDefinition.getPropertyDefinitionRawFor(parentItemDefinition,
          parentModule, referredPropertyAsValueApplied.property, true);

      // if we don't get any throw an error
      if (!propertyAsValueDefinition) {
        throw new CheckUpError(
          `Unavailable referred property` +
          ` '${referredPropertyAsValueApplied.property}'` +
          ` in '${parentItemDefinition.name}'`,
          traceback.newTraceToBit(propertyIdOfTheReferredItem)
            .newTraceToBit("property"),
        );
      }

      // If the types don't match throw an error
      if (propertyAsValueDefinition.type !==
        propertyDefinitionOfTheReferredItem.type) {
        throw new CheckUpError(
          `Referred property '${referredPropertyAsValueApplied.property}' in ` +
          ` '${parentItemDefinition.name}' does not match with ` +
          ` '${referredItemDefinition.name}' property` +
          ` '${propertyIdOfTheReferredItem}' the first is` +
          ` '${propertyAsValueDefinition.type}' and the second` +
          ` '${propertyDefinitionOfTheReferredItem.type}'`,
          traceback.newTraceToBit(propertyIdOfTheReferredItem)
            .newTraceToBit("property"),
        );
      }
    }
  }
}

export function checkPropertyDefinition(
  rawData: IPropertyDefinitionRawJSONDataType,
  parentItemDefinition: IItemDefinitionRawJSONDataType,
  parentModule: IModuleRawJSONDataType,
  traceback: Traceback,
) {
  if (Object.keys(RESERVED_BASE_PROPERTIES).includes(rawData.id) ||
    Object.keys(RESERVED_SEARCH_PROPERTIES).includes(rawData.id) ||
    Object.keys(RESERVED_GETTER_PROPERTIES).includes(rawData.id)) {
    throw new CheckUpError(
      "Property '" + rawData.id + "' is reserved",
      traceback.newTraceToBit("id"),
    );
  }

  const canDisableSearch = PropertyDefinition
    .supportedTypesStandard[rawData.type].searchable;
  if (rawData.disableRangedSearch && !canDisableSearch) {
    throw new CheckUpError(
      "Type '" + rawData.type + "' does not support disableRangedSearch " +
      "as it cannot be searched",
      traceback.newTraceToBit("disableRangedSearch"),
    );
  } else if (rawData.searchLevel === "disabled" && !canDisableSearch) {
    throw new CheckUpError(
      "Type '" + rawData.type + "' does not support searchLevel as disabled " +
      "as it cannot be searched",
      traceback.newTraceToBit("searchLevel"),
    );
  } else if (rawData.searchLevel === "disabled" && rawData.disableRangedSearch) {
    throw new CheckUpError(
      "Type '" + rawData.type + "' cannot disable ranged search if search is disabled",
      traceback.newTraceToBit("disableRangedSearch"),
    );
  }

  if (rawData.type !== "integer" && rawData.type !== "number" &&
    rawData.type !== "currency" && typeof rawData.min !== "undefined") {
    throw new CheckUpError(
      "Cannot set a min value if type not integer or number",
      traceback.newTraceToBit("min"),
    );
  } else if (rawData.type !== "integer" && rawData.type !== "number" &&
    rawData.type !== "currency" && typeof rawData.max !== "undefined") {
    throw new CheckUpError(
      "Cannot set a max value if type not integer or number",
      traceback.newTraceToBit("max"),
    );
  } else if (rawData.type !== "number" && rawData.type !== "currency" &&
    typeof rawData.maxDecimalCount !== "undefined") {
    throw new CheckUpError(
      "Cannot set a maxDecimalCount value if type not number",
      traceback.newTraceToBit("maxDecimalCount"),
    );
  } else if (rawData.type !== "string" && rawData.type !== "text" &&
    typeof rawData.minLength !== "undefined") {
    throw new CheckUpError(
      "Cannot set a minLength value if type not text or string",
      traceback.newTraceToBit("minLength"),
    );
  } else if (rawData.type !== "string" && rawData.type !== "text" &&
    typeof rawData.maxLength !== "undefined") {
    throw new CheckUpError(
      "Cannot set a maxLength value if type not text or string",
      traceback.newTraceToBit("maxLength"),
    );
  }

  // lets check that all the ones in values are valid
  if (rawData.values) {
    const valuesTraceback = traceback.newTraceToBit("values");
    rawData.values.forEach((value, index) => {
      if (!PropertyDefinition.isValidValue(
        rawData,
        value,
        false,
      )) {
        throw new CheckUpError(
          "Invalid value for item",
          valuesTraceback.newTraceToBit(index),
        );
      }
    });
  }

  // Let's check whether the default value is valid too
  if (rawData.default) {
    if (!PropertyDefinition.isValidValue(
      rawData,
      rawData.default,
      true,
    )) {
      throw new CheckUpError(
        "Invalid type for default",
        traceback.newTraceToBit("default"),
      );
    }
  }

  // Let's check whether the autocomplete properties are there
  if (rawData.autocompleteSetFromProperty) {
    const autocompleteSetFromPropertyTraceback =
      traceback.newTraceToBit("autocompleteSetFromProperty");

    rawData.autocompleteSetFromProperty.forEach((propertyId, index) => {
      // Also for property definitions prop extensions are valid
      // to access in this autocomplete sets
      if (!ItemDefinition.getPropertyDefinitionRawFor(
        parentItemDefinition,
        parentModule,
        propertyId,
        true,
      )) {
        throw new CheckUpError(
          "Invalid autocomplete property to funnel",
          autocompleteSetFromPropertyTraceback.newTraceToBit(index),
        );
      }
    });
  }

  // And the default if values are valid
  if (rawData.defaultIf) {
    const defaultIfTraceback = traceback.newTraceToBit("defaultIf");
    rawData.defaultIf.forEach((rule, index) => {

      checkConditionalRuleSet(
        rule.if,
        parentItemDefinition,
        parentModule,
        defaultIfTraceback.newTraceToBit(index).newTraceToBit("if"),
      );

      if (!PropertyDefinition.isValidValue(
        rawData,
        rule.value,
        true,
      )) {
        throw new CheckUpError(
          "Invalid value for default if definition",
          defaultIfTraceback.newTraceToBit(index).newTraceToBit("value"),
        );
      }
    });
  }

  if (rawData.enforcedValue) {
    if (!PropertyDefinition.isValidValue(
      rawData,
      rawData.enforcedValue,
      true,
    )) {
      throw new CheckUpError(
        "Invalid value for enforced value definition",
        traceback.newTraceToBit("enforcedValue"),
      );
    }
  }

  if (rawData.enforcedValues) {
    const enforcedValuesTraceback = traceback.newTraceToBit("enforcedValues");
    rawData.enforcedValues.forEach((ev, index) => {
      checkConditionalRuleSet(
        ev.if,
        parentItemDefinition,
        parentModule,
        enforcedValuesTraceback.newTraceToBit(index).newTraceToBit("if"),
      );

      if (!PropertyDefinition.isValidValue(
        rawData,
        ev.value,
        true,
      )) {
        throw new CheckUpError(
          "Invalid type for enforcedValues enforced value",
          enforcedValuesTraceback.newTraceToBit(index).newTraceToBit("value"),
        );
      }
    });
  }

  if (rawData.hiddenIf) {
    checkConditionalRuleSet(
      rawData.hiddenIf,
      parentItemDefinition,
      parentModule,
      traceback.newTraceToBit("hiddenIf"),
    );
  }
}

export function checkModule(
  rawData: IModuleRawJSONDataType,
  traceback: Traceback,
) {
  const actualTraceback = traceback.newTraceToLocation(rawData.location);
  actualTraceback.setupPointers(rawData.pointers, rawData.raw);

  if (rawData.name.startsWith("_")) {
    throw new CheckUpError(
      "Module name '" + rawData.name + "' starts with underscore, and that's invalid",
      actualTraceback.newTraceToBit("name"),
    );
  }

  if (rawData.propExtensions) {
    const propExtTraceback = actualTraceback
      .newTraceToLocation(rawData.propExtLocation);
    propExtTraceback.setupPointers(rawData.propExtPointers, rawData.propExtRaw);

    rawData.propExtensions.forEach((propDef, index) => {
      const specificPropExtTraceback =
        propExtTraceback.newTraceToBit(index);

      // let's create a pseudo item that acts as the module holder
      // this will allow for checking that only matches the prop extensions
      // say if they have conditionals and whatnot, the pseudo location
      // is good for checking
      checkPropertyDefinition(
        propDef,
        {
         type: "item",
         name: rawData.name,
         location: rawData.location.replace(".json", ".propext.json"),
         i18nName: {},
         properties: [],
        },
        rawData,
        specificPropExtTraceback,
      );
   });
  }

  if (rawData.children) {
    rawData.children.forEach((moduleOrItemDef) => {
      if (moduleOrItemDef.type === "module") {
        checkModule(moduleOrItemDef, actualTraceback);
      } else {
        checkItemDefinition(moduleOrItemDef, rawData, actualTraceback);
      }
    });
  }
}

export function checkRoot(
  rawData: IRootRawJSONDataType,
) {
  const traceback = new Traceback(rawData.location);
  traceback.setupPointers(rawData.pointers, rawData.raw);

  if (rawData.children) {
    rawData.children.forEach((mod, index) => {
      checkModule(
        mod,
        traceback.newTraceToBit("includes").newTraceToBit(index),
      );
    });
  }
}
