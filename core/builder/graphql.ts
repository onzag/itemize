import { IRootRawJSONDataType } from "../base/Root";
import PropertyDefinition, {
  PropertyDefinitionSearchInterfacesType,
  IPropertyDefinitionRawJSONDataType,
  IPropertyDefinitionSupportedType,
} from "../base/ItemDefinition/PropertyDefinition";
import { RESERVED_PROPERTIES } from "../constants";
import { IModuleRawJSONDataType } from "../base/Module";
import { IItemDefinitionRawJSONDataType } from "../base/ItemDefinition";

const BASE_TEMPLATE = `"""
The base template that every item inherits
"""
interface __Base {
${Object.keys(RESERVED_PROPERTIES)
  .map((rpk) => `  ${rpk}: ${RESERVED_PROPERTIES[rpk]}`)
  .join(",\n")}
}

${Object.keys(PropertyDefinition.supportedTypesStandard)
  .map((pdk) => {
    const pdv: IPropertyDefinitionSupportedType =
      PropertyDefinition.supportedTypesStandard[pdk];
    if (pdv.gqlDef) {
      return `
"""
Definition for the property type for ${pdk}
"""
type ${pdv.gql} {
${Object.keys(pdv.gqlDef)
  .map((gqldefk) => `  ${gqldefk}: ${pdv.gqlDef[gqldefk]}`)
  .join(",\n")}
}`;
    }
    return null;
  })
  .filter((p) => p)
  .join("\n\n")}
`;

function stringToCamelCase(str: string, lowerInstead?: boolean) {
  return (lowerInstead ? str[0].toLowerCase() : str[0].toUpperCase()) +
    str.substr(1).replace(/(\-\w)/g, (m) => m[1].toUpperCase());
}

function buildPropertiesToGraphQL(
  properties: IPropertyDefinitionRawJSONDataType[],
  sep: string,
  searchMode?: boolean,
) {
  const result: string[] = [];
  properties.forEach((property) => {
    const pdv: IPropertyDefinitionSupportedType =
      PropertyDefinition.supportedTypesStandard[property.type];
    if ((property.disableRetrieval && !searchMode) ||
      (property.searchLevel === "disabled" && searchMode)) {
      return;
    }

    if (!searchMode) {
      const nullableSymbol = property.nullable ? "" : "!";
      const rawPropertyName = stringToCamelCase(property.id, true);
      result.push(
        `${rawPropertyName}: ${pdv.gql}${nullableSymbol}`,
      );
      return;
    }

    const givenPropertyName = stringToCamelCase(property.id);
    if (pdv.searchInterface ===
      PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE ||
      pdv.searchInterface ===
      PropertyDefinitionSearchInterfacesType.EXACT) {
      result.push(`exact${givenPropertyName}: ${pdv.gql}`);
    }
    if (pdv.searchInterface ===
      PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE) {
      result.push(`from${givenPropertyName}: ${pdv.gql}`);
      result.push(`to${givenPropertyName}: ${pdv.gql}`);
    }
    if (pdv.searchInterface ===
      PropertyDefinitionSearchInterfacesType.FTS) {
      result.push(`search${givenPropertyName}: ${pdv.gql}`);
    }
    if (pdv.searchInterface ===
      PropertyDefinitionSearchInterfacesType.LOCATION_DISTANCE) {
      result.push(`given${givenPropertyName}: ${pdv.gql}`);
      result.push(`radius${givenPropertyName}: Number`);
    }
  });

  return result.join(sep);
}

// TODO need to add item data in the item definition
// both in query and search sink in properties

function buildGraphQLSchemaItemDefinition(
  parentModule: IModuleRawJSONDataType,
  prefix: string,
  itemDef: IItemDefinitionRawJSONDataType,
): string {
  const itemDefNameInSchema = stringToCamelCase(itemDef.name);
  const resultItemDefinition = `"""
Implementation for the item definition for '${itemDef.name}' in module '${parentModule.name}'
"""
type ${prefix}${itemDefNameInSchema} implements ${stringToCamelCase(parentModule.name)}Base {
  ${buildPropertiesToGraphQL(itemDef.properties || [], ",\n  ")}
}
`;
  return resultItemDefinition + "\n" + (itemDef.childDefinitions || []).map((cd) => {
    return buildGraphQLSchemaItemDefinition(
      parentModule,
      prefix + "_" + itemDefNameInSchema + "_",
      cd,
    );
}).join("\n");
}

function buildGraphQLSchemaModule(mod: IModuleRawJSONDataType): string {
  const moduleNameInSchema = stringToCamelCase(mod.name);
  const resultMod = `"""
Implementation for module level querying using property extensions for '${mod.name}'
"""
interface ${moduleNameInSchema}Base implements __Base {
  ${buildPropertiesToGraphQL(mod.propExtensions || [], ",\n  ")}
}
`;
  return resultMod + "\n" + (mod.children || []).map((c) => {
    if (c.type === "module") {
      return buildGraphQLSchemaModule(c);
    }
    return buildGraphQLSchemaItemDefinition(mod, moduleNameInSchema + "_", c);
  }).join("\n");
}

function buildGraphQLSchemaRoot(root: IRootRawJSONDataType) {
  return (root.children || []).map(buildGraphQLSchemaModule).join("\n");
}

function buildGraphQLSchemaQueriesItemDefinition(
  parentModule: IModuleRawJSONDataType,
  prefix: string,
  schemaPrefix: string,
  itemDef: IItemDefinitionRawJSONDataType,
): string {
  const itemDefNameInQuery = stringToCamelCase(itemDef.name, true);
  const itemDefNameInSchema = stringToCamelCase(itemDef.name);
  const resultItemDefinitionSingle = `  ${prefix}${itemDefNameInQuery}(
    token: String,
    id: ID!
  ): ${schemaPrefix}${stringToCamelCase(itemDef.name)}!`;
  const resultItemDefinitionMultiple = `  search_${prefix}${itemDefNameInQuery} (
    token: String,
    firstResult: Int!,
    limit: Int!${
      itemDef.properties && itemDef.properties.length ?
      ",\n    " + buildPropertiesToGraphQL(itemDef.properties, ",\n    ", true) :
      ""
    }
  ): [${schemaPrefix}${stringToCamelCase(itemDef.name)}!]!,`;

  return resultItemDefinitionSingle + "\n" +
    resultItemDefinitionMultiple + "\n" + (itemDef.childDefinitions || []).map((cd) => {
      return buildGraphQLSchemaQueriesItemDefinition(
        parentModule,
        prefix + "_" + itemDefNameInQuery + "_",
        schemaPrefix + "_" + itemDefNameInSchema + "_",
        cd,
      );
    });
}

function buildGraphQLSchemaQueriesModule(mod: IModuleRawJSONDataType): string {
  const moduleNameInQuery = stringToCamelCase(mod.name, true);
  const moduleNameInSchema = stringToCamelCase(mod.name);
  const resultMod = `  ${moduleNameInQuery}(
    token: String,
    firstResult: Int!,
    limit: Int!${
      mod.propExtensions && mod.propExtensions.length ?
      ",\n    " + buildPropertiesToGraphQL(mod.propExtensions, ",\n    ", true) :
      ""
    }
  ): [${stringToCamelCase(mod.name)}Base!]!,`;
  return resultMod + "\n" + (mod.children || []).map((c) => {
    if (c.type === "module") {
      return buildGraphQLSchemaQueriesModule(c);
    }
    return buildGraphQLSchemaQueriesItemDefinition(
      mod,
      moduleNameInQuery + "_",
      moduleNameInSchema + "_",
      c,
    );
  }).join("\n");
}

function buildGraphQLSchemaQueriesRoot(root: IRootRawJSONDataType) {
  return `"""
Queries
"""
type Query {
${root.children.map(buildGraphQLSchemaQueriesModule)}
}
`;
}

export function buildGraphQLSchema(root: IRootRawJSONDataType) {
  return `${BASE_TEMPLATE}${buildGraphQLSchemaRoot(root)}${buildGraphQLSchemaQueriesRoot(root)}`;
}
