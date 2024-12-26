import { RQField } from "../base/Root/rq";
import { IRootRawJSONDataType } from "../base/Root";
import Root from "../base/Root";
import Module from "../base/Root/Module";
import { getRQDefinitionForModule } from "../base/Root/Module/rq";
import { getSQLTableDefinitionForModule } from "../base/Root/Module/sql";
import { ISQLColumnDefinitionType } from "../base/Root/sql";
import ItemDefinition from "../base/Root/Module/ItemDefinition";
import { getRQDefinitionForItemDefinition } from "../base/Root/Module/ItemDefinition/rq";
import { getSQLTableDefinitionForItemDefinition } from "../base/Root/Module/ItemDefinition/sql";
import { PropertyDefinitionSearchInterfacesPrefixes } from "../base/Root/Module/ItemDefinition/PropertyDefinition/search-interfaces";

import fs from "fs";
import path from "path";
import colors from "colors/safe";

const fsAsync = fs.promises;

const allTypes = {
  "boolean": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/boolean",
    type: "PropertyDefinitionSupportedBooleanType",
  },
  "integer": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/integer",
    type: "PropertyDefinitionSupportedIntegerType",
  },
  "number": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/number",
    type: "PropertyDefinitionSupportedNumberType",
  },
  "currency": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/currency",
    type: "IPropertyDefinitionSupportedCurrencyType",
  },
  "unit": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/unit",
    type: "IPropertyDefinitionSupportedUnitType",
  },
  "string": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/string",
    type: "PropertyDefinitionSupportedStringType",
  },
  "password": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/password",
    type: "PropertyDefinitionSupportedPasswordType",
  },
  "text": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/text",
    type: "IPropertyDefinitionSupportedTextType",
  },
  "year": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/year",
    type: "PropertyDefinitionSupportedYearType",
  },
  "date": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/date",
    type: "PropertyDefinitionSupportedDateType",
  },
  "datetime": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/datetime",
    type: "PropertyDefinitionSupportedDateTimeType",
  },
  "time": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/time",
    type: "PropertyDefinitionSupportedTimeType",
  },
  "location": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/location",
    type: "IPropertyDefinitionSupportedLocationType",
  },
  "file": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/file",
    type: "PropertyDefinitionSupportedFileType",
  },
  "files": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/files",
    type: "PropertyDefinitionSupportedFilesType",
  },
  "payment": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/payment",
    type: "IPropertyDefinitionSupportedPaymentType",
  },
  "taglist": {
    location: "@onzag/itemize/base/Root/Module/ItemDefinition/PropertyDefinition/types/taglist",
    type: "PropertyDefinitionSupportedTagListType",
  },
}

function rqToTypescriptDefinition(
  flat: boolean,
  itemOrMod: ItemDefinition | Module,
  id: string,
  val: RQField,
  parentModTypeName: string,
  tabsPlus: number = 0,
) {
  let finalTypeDef = (val.description ? (
    "/**" + val.description + "*/\n" + "\t".repeat(tabsPlus)
  ) : "") + id + (val.required ? "" : "?") + ": ";

  if (
    val.values &&
    (
      val.type === "string" ||
      val.type === "boolean" ||
      val.type === "integer" ||
      val.type === "integer-positive" ||
      val.type === "number"
    )
  ) {
    finalTypeDef += "(" + val.values.map((v) => JSON.stringify(v)).join(" | ") + ")";
  } else if (id === "type" && tabsPlus === 1) {
    if (itemOrMod instanceof Module) {
      finalTypeDef += "(" + itemOrMod.getAllChildDefinitionsRecursive().map((v) => JSON.stringify(v.getQualifiedPathName())).join(" | ") + ")";
    } else {
      finalTypeDef += JSON.stringify(itemOrMod.getQualifiedPathName());
    }
  } else if (val.type === "object" && (val.stdFields || val.ownFields)) {
    if (id === "DATA" && flat) {
      finalTypeDef = "";
      const properties = {
        ...val.stdFields,
        ...val.ownFields,
      };
      Object.keys(properties).forEach((p, i) => {
        finalTypeDef += (i === 0 ? "" : "\t".repeat(tabsPlus)) + rqToTypescriptDefinition(false, itemOrMod, p, properties[p], parentModTypeName, tabsPlus) + ";\n";
      });
    } else {
      if (id === "DATA" && parentModTypeName) {
        finalTypeDef += parentModTypeName + "[\"DATA\"] & "
      }
      finalTypeDef += "{\n";
      const properties = {
        ...val.stdFields,
        ...val.ownFields,
      };
      Object.keys(properties).forEach((p) => {
        finalTypeDef += "\t".repeat(tabsPlus + 1) + rqToTypescriptDefinition(false, itemOrMod, p, properties[p], parentModTypeName, tabsPlus + 1) + ";\n";
      });
      finalTypeDef += "\t".repeat(tabsPlus) + "}";
    }
  } else {
    switch (val.type) {
      case "any":
      case "boolean":
      case "string":
        finalTypeDef += val.type;
        break;
      case "binary":
        break;
      case "integer":
      case "integer-positive":
      case "number":
        finalTypeDef += "number";
        break;
      default:
        finalTypeDef += "any";
        break;
    }
  }

  return finalTypeDef + (val.array ? "[]" : "");
}

function sqlToTypescriptDefinition(itemOrMod: ItemDefinition | Module,
  id: string, val: ISQLColumnDefinitionType, knownRQForm: RQField, tabsPlus: number = 0) {
  let finalTypeDef = (knownRQForm && knownRQForm.description ? (
    "/**" + knownRQForm.description + "*/\n" + "\t".repeat(tabsPlus)
  ) : "") + id + (knownRQForm ? (knownRQForm.required ? "" : "?") : (val && val.notNull ? "" : "?")) + ": ";

  if (
    knownRQForm &&
    knownRQForm.values &&
    (
      knownRQForm.type === "string" ||
      knownRQForm.type === "boolean" ||
      knownRQForm.type === "integer" ||
      knownRQForm.type === "integer-positive" ||
      knownRQForm.type === "number"
    )
  ) {
    finalTypeDef += "(" + knownRQForm.values.map((v) => JSON.stringify(v)).join(" | ") + ")";
  } else if (id === "type") {
    if (itemOrMod instanceof Module) {
      finalTypeDef += "(" + itemOrMod.getAllChildDefinitionsRecursive().map((v) => JSON.stringify(v.getQualifiedPathName())).join(" | ") + ")";
    } else {
      finalTypeDef += JSON.stringify(itemOrMod.getQualifiedPathName());
    }
  } else {
    switch (val.type.toUpperCase().split("[")[0].split("(")[0]) {
      case "TEXT":
      case "BIT":
      case "BIT VARYING":
      case "CHARACTER":
      case "CHARACTER VARYING":
      case "CIDR":
      case "DATE":
      case "INET":
      case "MACADDR":
      case "MACADDR8":
      case "TEXT":
      case "TIMESTAMP":
      case "TIMESTAMPTZ":
      case "TIME":
      case "TIMETZ":
      case "TSVECTOR":
      case "TSQUERY":
      case "ID":
        finalTypeDef += "string";
        break;
      case "BIGINT":
      case "INT":
      case "INTEGER":
      case "BIGSERIAL":
      case "SERIAL":
      case "SMALLINT":
      case "REAL":
      case "NUMERIC":
      case "DOUBLE PRECISION":
      case "DECIMAL":
      case "DOUBLE":
      case "FLOAT8":
      case "FLOAT4":
      case "INT4":
      case "INT8":
      case "SERIAL4":
      case "SERIAL8":
      case "INT2":
      case "SERIAL2":
        finalTypeDef += "number";
        break;
      case "BOOL":
      case "BOOLEAN":
        finalTypeDef += "boolean";
        break;
      default:
        finalTypeDef += "any";
        break;
    }
  }

  return finalTypeDef + (val.type.endsWith("[]") ? "[]" : "");
}

function modTypeNameGetterBase(mod: Module) {
  let prefix = "";
  if (mod.getParentModule()) {
    prefix = modTypeNameGetterBase(mod.getParentModule());
  }
  return prefix + "Mod" + mod.getName().split(/-|_/g).filter((v) => v).map((v) => v[0].toUpperCase() + v.substring(1)).join("_");
}

function itemTypeNameGetterBase(item: ItemDefinition) {
  return modTypeNameGetterBase(item.getParentModule()) +
    "Idef" + item.getName().split(/-|_/g).filter((v) => v).map((v) => v[0].toUpperCase() + v.substring(1)).join("_");
}

function itemTypeNameGetterBaseOnly(item: ItemDefinition) {
  return modTypeNameGetterBase(item.getParentModule()) +
    "IdefOnly" + item.getName().split(/-|_/g).filter((v) => v).map((v) => v[0].toUpperCase() + v.substring(1)).join("_");
}

function modTypeNameGetterRqSS(mod: Module) {
  return modTypeNameGetterBase(mod) + "FlatRqType";
}

function modTypeNameGetterRqCS(mod: Module) {
  return modTypeNameGetterBase(mod) + "ClientSideRqType";
}

function modTypeNameGetterSQL(mod: Module) {
  return modTypeNameGetterBase(mod) + "SQLType";
}

function modTypeNameGetterUseBase(mod: Module) {
  return "use" + modTypeNameGetterBase(mod) + "ItemProvider";
}

function modTypeNameGetterUseSearch(mod: Module) {
  return "use" + modTypeNameGetterBase(mod) + "SearchItemProvider";
}

function modTypeNameGetterIPSearch(mod: Module) {
  return modTypeNameGetterBase(mod) + "SearchItemProvider";
}

function itemTypeNameGetterRqSS(item: ItemDefinition) {
  return itemTypeNameGetterBase(item) + "FlatRqType";
}

function itemTypeNameGetterRqCS(item: ItemDefinition) {
  return itemTypeNameGetterBase(item) + "ClientSideRqType";
}

function itemTypeNameGetterSQL(item: ItemDefinition) {
  return itemTypeNameGetterBase(item) + "SQLType";
}

function itemTypeNameGetterOnlySQL(item: ItemDefinition) {
  return itemTypeNameGetterBaseOnly(item) + "SQLType";
}

function itemTypeNameGetterUseBase(item: ItemDefinition) {
  return "use" + itemTypeNameGetterBase(item) + "ItemProvider";
}

function itemTypeNameGetterIPBase(item: ItemDefinition) {
  return itemTypeNameGetterBase(item) + "ItemProvider";
}

function itemTypeNameGetterUseSearch(item: ItemDefinition) {
  return "use" + itemTypeNameGetterBase(item) + "SearchItemProvider";
}

function itemTypeNameGetterIPSearch(item: ItemDefinition) {
  return itemTypeNameGetterBase(item) + "SearchItemProvider";
}

function itemTypeBuilder(item: ItemDefinition, mod: Module) {
  const modTypeNameRqSS = modTypeNameGetterRqSS(mod);
  const modTypeNameRqCS = modTypeNameGetterRqCS(mod);
  const modTypeNameSQL = modTypeNameGetterSQL(mod);

  const typeNameRqSS = itemTypeNameGetterRqSS(item);
  const typeNameRqCS = itemTypeNameGetterRqCS(item);
  const typeNameSQL = itemTypeNameGetterSQL(item);
  const typeNameOnlySQL = itemTypeNameGetterOnlySQL(item);

  let rsRqSS = "interface " + typeNameRqSS + " extends " + modTypeNameRqSS + " {\n";
  let rsRqCS = "interface " + typeNameRqCS + " extends " + modTypeNameRqCS + " {\n";
  let rsSQL = "interface " + typeNameOnlySQL + " {\n";
  let rsSQLFull = "interface " + typeNameSQL + " extends " + modTypeNameSQL + ", " + typeNameOnlySQL + " {};"

  const rqItemElement = getRQDefinitionForItemDefinition(item, {
    retrievalMode: true,
    excludeBase: true,
    optionalForm: false,
    includePolicy: [],
    onlyTextFilters: false,
    excludeExtensions: true,
  });

  const sqlItem = getSQLTableDefinitionForItemDefinition(item);

  const rqItem = {
    ...rqItemElement.stdFields,
    ...rqItemElement.ownFields,
  };

  Object.keys(rqItem).forEach((p) => {
    const rsDef = rqItem[p];

    rsRqSS += "\t" + rqToTypescriptDefinition(true, item, p, rsDef, modTypeNameRqSS, 1) + (p === "DATA" ? "" : ";\n");
    rsRqCS += "\t" + rqToTypescriptDefinition(false, item, p, rsDef, modTypeNameRqCS, 1) + ";\n";
  });

  Object.keys(sqlItem).forEach((p) => {
    const rsDef = sqlItem[p];

    rsSQL += "\t" + sqlToTypescriptDefinition(item, p, rsDef, rqItem[p], 1) + ";\n";
  });

  rsRqSS += "}\n\n";
  rsRqCS += "}\n\n";
  rsSQL += "}\n\n";
  rsSQLFull += "\n\n";

  let itemData = "";

  item.getChildDefinitions().forEach((c) => {
    itemData += itemTypeBuilder(c, mod);
  });

  return rsRqSS + rsRqCS + rsSQL + rsSQLFull + itemData;
}

function buildItemProviderFor(
  idef: ItemDefinition,
  sc: boolean,
  modPath: string,
  idefPath: string,
  nonHook: boolean,
): {
  idef: string,
  types: string,
} {
  const allPropertiesLocation = "allProperties" + itemTypeNameGetterBase(idef);
  const propertiesTypeName = "IPropertiesMemo" + itemTypeNameGetterBase(idef);
  const itemProviderType = "ItemProviderFor" + itemTypeNameGetterBase(idef);

  const plainProperties = "typeof propertiesBase" + itemTypeNameGetterBase(idef) + "[number]";

  let flatType: string = null;
  let rawType: string = null;
  if (idef.isInSearchMode()) {
    const standardCounterpart = idef.getStandardCounterpart();
    if (standardCounterpart.isExtensionsInstance()) {
      rawType = modTypeNameGetterRqCS(standardCounterpart.getParentModule());
      flatType = modTypeNameGetterRqSS(standardCounterpart.getParentModule());
    } else {
      rawType = itemTypeNameGetterRqCS(standardCounterpart);
      flatType = itemTypeNameGetterRqSS(standardCounterpart);
    }
  } else {
    if (idef.isExtensionsInstance()) {
      rawType = modTypeNameGetterRqCS(idef.getParentModule());
      flatType = modTypeNameGetterRqSS(idef.getParentModule());
    } else {
      rawType = itemTypeNameGetterRqCS(idef);
      flatType = itemTypeNameGetterRqSS(idef);
    }
  }

  if (nonHook) {
    if (idefPath === null) {
      return {idef: (
        `
  return (<ModuleProvider module=${JSON.stringify(modPath)}><ItemProvider searchCounterpart={${JSON.stringify(sc)}} {...props}/></ModuleProvider>);
`
      ), types: null};
    }
    return {idef: (
      `
  return (<ItemProvider itemDefinition=${JSON.stringify(idefPath)} searchCounterpart={${JSON.stringify(sc)}} {...props}/>);
`
    ), types: null};
  }

  const providerType = idef.isInSearchMode() ? 
  "IItemProviderHookElementSearchOnly<" + plainProperties + "," + rawType + "," + flatType + ">" :
  "IItemProviderHookElementNonSearchOnly<" + plainProperties + ">";

  return {idef: (
    `
  const provider = useItemProvider<string, unknown, unknown>({
    ...options,
    itemDefinition: ${JSON.stringify(idefPath)},
    module: ${JSON.stringify(modPath)},
    searchCounterpart: ${JSON.stringify(sc)},
  });

  const properties = usePropertiesMemoFor<${propertiesTypeName}>(${allPropertiesLocation}, provider);

  return ({
    ...(provider as ${providerType}),
    properties,
  }) as ${itemProviderType};
`
  ), types: `export interface ${itemProviderType} extends ${providerType} {properties: ${propertiesTypeName}};`};
}

function defineAllFor(idef: ItemDefinition, onlyBaseAndNothingElse?: boolean) {
  const propDefs = idef.getAllPropertyDefinitionsAndExtensions();
  const properties = propDefs.map((v) => v.getId());
  const nameIdef = itemTypeNameGetterBase(idef);

const forSetting = `
type PropertiesForSetting${nameIdef} = {
${propDefs.map((v) => {
    const hasVariant = Object.keys(PropertyDefinitionSearchInterfacesPrefixes)
    .find((prefix) => v.getId().startsWith(PropertyDefinitionSearchInterfacesPrefixes[prefix]));
    if (hasVariant) {
      const variantName = hasVariant;
      const propertyId = v.getId().replace(PropertyDefinitionSearchInterfacesPrefixes[variantName], "");
      const variantNameInType = variantName.toLowerCase().replace("_", "-");

      return v.getId() + ": {id: \"" + propertyId + "\", value: " + allTypes[v.getType()].type + ", variant: \"" + variantNameInType + "\"}";
    }
    return v.getId() + ": {id: \"" + v.getId() + "\", value: " + allTypes[v.getType()].type + ", variant: never}";
  }).filter((v) => !!v).join(";\n")}
};
`

  if (onlyBaseAndNothingElse) {
    return `
const propertiesBase${nameIdef} = ${JSON.stringify(properties)} as const;
${forSetting}
`;
  }

  const result = `
const propertiesBase${nameIdef} = ${JSON.stringify(properties)} as const;
const allProperties${nameIdef} = (EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES as unknown as string[])
  .concat(propertiesBase${nameIdef} as unknown as string[]);
interface IPropertiesMemo${nameIdef} extends IPropertiesMemoBase {
${propDefs.map((v) => {
    if (v.getId() === "created_by") {
      return null;
    }
    return v.getId() + ": IPropertiesMemoProperty<" + allTypes[v.getType()].type + ">";
  }).filter((v) => !!v).join(";\n")}
};
${forSetting}
`;

  if (idef.isSearchable() && !idef.isInSearchMode()) {
    return result + defineAllFor(idef.getSearchModeCounterpart());
  }

  return result;
}

function itemSchemaJsBuilder(idef: ItemDefinition, mod: Module): string {
  const propertiesDefinition = defineAllFor(idef);
  const nameIdef = itemTypeNameGetterBase(idef);
  const nameIdefSearchMode = itemTypeNameGetterBase(idef.getSearchModeCounterpart());
  let hookDefault = "export function " + itemTypeNameGetterUseBase(idef) + "(options: ICustomItemProviderOptions<typeof propertiesBase" +
    nameIdef + "[number], PropertiesForSetting" + nameIdef + "> = {}) {\n";
  let ipDefault = "export function " + itemTypeNameGetterIPBase(idef) + "(props: ICustomItemProviderProps<typeof propertiesBase" +
  nameIdef + "[number], PropertiesForSetting" + nameIdef + "> = {}) {\n";

  const defaultBuilt = buildItemProviderFor(idef, false, mod.getQualifiedPathName(), idef.getQualifiedPathName(), true);
  const hookDefaultBuilt = buildItemProviderFor(idef, false, mod.getQualifiedPathName(), idef.getQualifiedPathName(), false);

  ipDefault += defaultBuilt.idef;
  hookDefault = hookDefaultBuilt.types + "\n" + hookDefault;
  hookDefault += hookDefaultBuilt.idef;

  let hookSearch = "";
  let ipSearch = "";
  if (idef.isSearchable()) {
    ipSearch = "export function " + itemTypeNameGetterIPSearch(idef) + "(props: ICustomItemProviderSearchProps<typeof propertiesBase" +
    nameIdef + "[number], PropertiesForSetting" + nameIdefSearchMode + "> = {}) {\n";
    hookSearch = "export function " + itemTypeNameGetterUseSearch(idef) + "(options: ICustomItemProviderSearchOptions<typeof propertiesBase" +
    nameIdef + "[number], PropertiesForSetting" + nameIdefSearchMode + "> = {}) {\n";
  
    const searchBuilt = buildItemProviderFor(idef.getSearchModeCounterpart(), true, mod.getQualifiedPathName(), idef.getQualifiedPathName(), true);
    const hookSearchBuilt = buildItemProviderFor(idef.getSearchModeCounterpart(), true, mod.getQualifiedPathName(), idef.getQualifiedPathName(), false);
    hookSearch += hookSearchBuilt.idef;
    hookSearch = hookSearchBuilt.types + "\n" + hookSearch;
    ipSearch += searchBuilt.idef;
    hookSearch += "};\n";
    ipSearch += "};\n";
  }
  
  hookDefault += "};\n";
  ipDefault += "};\n";

  let itemData = "";

  idef.getChildDefinitions().forEach((c) => {
    itemData += itemSchemaJsBuilder(c, mod);
  });

  return propertiesDefinition + hookDefault + ipDefault + (idef.isSearchable() ? hookSearch + ipSearch : "") + itemData;
}

function moduleSchemaJsBuilder(mod: Module): string {

  let propertiesDefinition: string = "";
  let hookSearch: string = "";
  let ipSearch: string = "";

  if (mod.isSearchable()) {
    const nameIdef = itemTypeNameGetterBase(mod.getPropExtensionItemDefinition());
    const nameIdefSearchMode = itemTypeNameGetterBase(mod.getPropExtensionItemDefinition().getSearchModeCounterpart());;
    propertiesDefinition = defineAllFor(mod.getPropExtensionItemDefinition(), true) + defineAllFor(mod.getPropExtensionItemDefinition().getSearchModeCounterpart());
    hookSearch = "export function " + modTypeNameGetterUseSearch(mod) + "(options: ICustomItemProviderSearchOptions<typeof propertiesBase" + nameIdef +
      "[number], PropertiesForSetting" + nameIdef  + "> = {}) {\n";
    ipSearch = "export function " + modTypeNameGetterIPSearch(mod) + "(props: ICustomItemProviderSearchProps<typeof propertiesBase" + nameIdef +
      "[number], PropertiesForSetting" + nameIdefSearchMode  + "> = {}) {\n";

    const hookSearchBuilt = buildItemProviderFor(mod.getPropExtensionItemDefinition().getSearchModeCounterpart(), true, mod.getQualifiedPathName(), null, false);
    const searchBuilt = buildItemProviderFor(mod.getPropExtensionItemDefinition().getSearchModeCounterpart(), true, mod.getQualifiedPathName(), null, true);
    hookSearch += hookSearchBuilt.idef;
    hookSearch = hookSearchBuilt.types + "\n" + hookSearch;
    ipSearch += searchBuilt.idef;
    hookSearch += "};\n"
    ipSearch += "};\n"
  }

  let itemData = "";

  mod.getAllChildItemDefinitions().forEach((c) => {
    itemData += itemSchemaJsBuilder(c, mod);
  });

  let childModData = "";

  mod.getAllModules().forEach((m) => {
    childModData += moduleSchemaJsBuilder(m);
  });

  return propertiesDefinition + hookSearch + ipSearch + itemData + childModData;
}

function moduleTypeBuilder(mod: Module): string {
  const typeNameRqSS = modTypeNameGetterRqSS(mod);
  const typeNameRqCS = modTypeNameGetterRqCS(mod);
  const typeNameSQL = modTypeNameGetterSQL(mod);

  let rsRqSS = "interface " + typeNameRqSS + " {\n";
  let rsRqCS = "interface " + typeNameRqCS + " {\n";
  let rsSQL = "interface " + typeNameSQL + " {\n";

  const rqModuleElement = getRQDefinitionForModule(mod, {
    retrievalMode: true,
    excludeBase: false,
    optionalForm: false,
    onlyTextFilters: false,
  });

  const rqModule = {
    ...rqModuleElement.stdFields,
    ...rqModuleElement.ownFields,
  };

  const sqlModule = getSQLTableDefinitionForModule(mod);

  Object.keys(rqModule).forEach((p) => {
    const rsDef = rqModule[p];

    rsRqSS += "\t" + rqToTypescriptDefinition(true, mod, p, rsDef, null, 1) + (p === "DATA" ? "\n" : ";\n");
    rsRqCS += "\t" + rqToTypescriptDefinition(false, mod, p, rsDef, null, 1) + ";\n";
  });

  Object.keys(sqlModule).forEach((p) => {
    const rsDef = sqlModule[p];

    rsSQL += "\t" + sqlToTypescriptDefinition(mod, p, rsDef, rqModule[p], 1) + ";\n";
  });

  rsRqSS += "}\n\n";
  rsRqCS += "}\n\n";
  rsSQL += "}\n\n";

  let itemData = "";

  mod.getAllChildItemDefinitions().forEach((c) => {
    itemData += itemTypeBuilder(c, mod);
  });

  let childModData = "";

  mod.getAllModules().forEach((m) => {
    childModData += moduleTypeBuilder(m);
  });

  return rsRqSS + rsRqCS + rsSQL + itemData + childModData;
}

export async function rootTypesBuilder(data: IRootRawJSONDataType) {
  const processedRoot: Root = new Root(data);

  let fileData = "";
  processedRoot.getAllModules().forEach((m) => {
    fileData += moduleTypeBuilder(m);
  });

  await ensureTypes();

  const outputFile = path.join("types", "itmz-build.d.ts");
  console.log("emiting " + colors.green(outputFile));

  await fsAsync.writeFile(outputFile, fileData);

  await ensureSrcFolder();

  let schemaData = "import { useItemProvider, ICustomItemProviderOptions, ICustomItemProviderSearchOptions, IItemProviderHookElementSearchOnly, "
    + "ICustomItemProviderSearchProps, ICustomItemProviderProps, IItemProviderHookElementNonSearchOnly, "
    + "usePropertiesMemoFor, IPropertiesMemoBase, IPropertiesMemoProperty } from \"@onzag/itemize/client/providers/item/hook\";\n";
  schemaData += "import React, { useMemo } from \"react\";\n";
  Object.keys(allTypes).forEach((type) => {
    const info = allTypes[type];
    schemaData += "import type {" + info.type + "} from \"" + info.location + "\";\n";
  });
  schemaData += "import { ItemProvider } from \"@onzag/itemize/client/providers/item\";\n";
  schemaData += "import { ModuleProvider } from \"@onzag/itemize/client/providers/module\";\n";
  schemaData += "import { EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES, STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES } from \"@onzag/itemize/constants\";\n\n"
  processedRoot.getAllModules().forEach((m) => {
    schemaData += moduleSchemaJsBuilder(m);
  });

  const outputFile2 = path.join("src", "schema.tsx");
  console.log("emiting " + colors.green(outputFile2));

  await fsAsync.writeFile(outputFile2, schemaData);
}


async function ensureTypes() {
  try {
    // Check if the directory exists
    await fsAsync.stat("types");
  } catch (error) {
    // If it doesn't exist, create it
    if (error.code === 'ENOENT') {
      await fsAsync.mkdir("types");
    } else {
      // Other error occurred, handle it appropriately
      throw error;
    }
  }
}

async function ensureSrcFolder() {
  try {
    // Check if the directory exists
    await fsAsync.stat("src");
  } catch (error) {
    // If it doesn't exist, create it
    if (error.code === 'ENOENT') {
      await fsAsync.mkdir("src");
    } else {
      // Other error occurred, handle it appropriately
      throw error;
    }
  }
}