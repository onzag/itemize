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

import fs from "fs";
import path from "path";
import colors from "colors/safe";
const fsAsync = fs.promises;

function typeGenerator(ide) {

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
  return prefix + "Mod" + mod.getName().split(/-|_/g).filter((v) => v).map((v) => v[0].toUpperCase() + v.substring(1));
}

function itemTypeNameGetterBase(item: ItemDefinition) {
  return modTypeNameGetterBase(item.getParentModule()) +
    "Idef" + item.getName().split(/-|_/g).filter((v) => v).map((v) => v[0].toUpperCase() + v.substring(1));
}

function itemTypeNameGetterBaseOnly(item: ItemDefinition) {
  return modTypeNameGetterBase(item.getParentModule()) +
    "IdefOnly" + item.getName().split(/-|_/g).filter((v) => v).map((v) => v[0].toUpperCase() + v.substring(1));
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

    rsRqSS += "\t" + rqToTypescriptDefinition(true, mod, p, rsDef, null, 1)  + (p === "DATA" ? "\n" : ";\n");
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