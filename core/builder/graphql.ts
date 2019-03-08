import { IRootRawJSONDataType } from "../base/Root";
import PropertyDefinition, {
  PropertyDefinitionSearchInterfacesType,
  IPropertyDefinitionRawJSONDataType,
  IPropertyDefinitionSupportedType,
} from "../base/ItemDefinition/PropertyDefinition";
import {
  RESERVED_BASE_PROPERTIES,
  RESERVED_SEARCH_PROPERTIES,
  RESERVED_GETTER_PROPERTIES
} from "../constants";
import { IModuleRawJSONDataType } from "../base/Module";
import { IItemDefinitionRawJSONDataType } from "../base/ItemDefinition";
import "source-map-support/register";

import {
  GraphQLSchema,
  GraphQLSchemaConfig,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLID,
  GraphQLNonNull,
  GraphQLScalarType,
  GraphQLNullableType,
  printSchema,
  GraphQLList,
  GraphQLInputObjectType,
} from "graphql";

const translationTypes = {
  String: GraphQLString,
  Int: GraphQLInt,
  Float: GraphQLFloat,
  Boolean: GraphQLBoolean,
  ID: GraphQLID,
};
const fancyTranslationTypes = {};

function strToGraphQLType(str: string, isRequired?: boolean, isInput?: boolean): {
  type: GraphQLScalarType | GraphQLNonNull<GraphQLNullableType>,
} {
  let actualStr = str;
  const internalIsRequired = isRequired || str.endsWith("!");
  if (str.endsWith("!")) {
    actualStr = str.substr(0, str.length - 1);
  }
  let type = translationTypes[actualStr];
  if (!type) {
    type = fancyTranslationTypes[actualStr];
    if (type && isInput) {
      type = type.input;
    } else if (!type && !isInput) {
      type = type.output;
    }
  }
  if (!type) {
    throw new Error("Invalid graphql type " + actualStr);
  }
  if (internalIsRequired) {
    return {
      type: new GraphQLNonNull(type),
    };
  }
  return {
    type,
  };
}

function objToGraphQLFields(obj: {[key: string]: string}) {
  const objCopy = {};
  Object.keys(obj).forEach((key) => {
    objCopy[key] = strToGraphQLType(obj[key]);
  });

  return objCopy;
}

const GQLBaseFields = objToGraphQLFields(RESERVED_BASE_PROPERTIES);
const GQLSearchFields = objToGraphQLFields(RESERVED_SEARCH_PROPERTIES);
const GQLGetterFields = objToGraphQLFields(RESERVED_GETTER_PROPERTIES);
Object.keys(PropertyDefinition.supportedTypesStandard).forEach((pdk) => {
  const pdv: IPropertyDefinitionSupportedType =
    PropertyDefinition.supportedTypesStandard[pdk];
  if (pdv.gqlDef) {
    fancyTranslationTypes[pdv.gql] = {
      output: new GraphQLObjectType({
        name: pdv.gql + "_Out",
        fields: objToGraphQLFields(pdv.gqlDef),
      }),
      input: new GraphQLInputObjectType({
        name: pdv.gql + "_In",
        fields: objToGraphQLFields(pdv.gqlDef),
      }),
    };
  }
});

function stringToCamelCase(str: string, lowerInstead?: boolean) {
  return (lowerInstead ? str[0].toLowerCase() : str[0].toUpperCase()) +
    str.substr(1).replace(/(\-\w)/g, (m) => m[1].toUpperCase());
}

function buildPropertiesToGraphQL(
  properties: IPropertyDefinitionRawJSONDataType[],
  searchMode?: boolean,
  isInput?: boolean,
): any {
  const result = {};
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
      result[rawPropertyName] = strToGraphQLType(
        pdv.gql, !property.nullable, isInput,
      );
      return;
    }

    const givenPropertyName = stringToCamelCase(property.id);
    const valueOverall = strToGraphQLType(
      pdv.gql, false, isInput,
    );
    if (pdv.searchInterface ===
      PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE ||
      pdv.searchInterface ===
      PropertyDefinitionSearchInterfacesType.EXACT) {
      result[`exact${givenPropertyName}`] = valueOverall;
    }
    if (pdv.searchInterface ===
      PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE) {
      result[`from${givenPropertyName}`] = valueOverall;
      result[`to${givenPropertyName}`] = valueOverall;
    }
    if (pdv.searchInterface ===
      PropertyDefinitionSearchInterfacesType.FTS) {
      result[`search${givenPropertyName}`] = valueOverall;
    }
    if (pdv.searchInterface ===
      PropertyDefinitionSearchInterfacesType.LOCATION_DISTANCE) {
      result[`given${givenPropertyName}`] = valueOverall;
      result[`radius${givenPropertyName}`] = valueOverall;
    }
  });

  return result;
}

// TODO need to add item data in the item definition
// both in query and search sink in properties
// TODO mutations

function buildGraphQLSchemaQueriesItemDefinition(
  moduleInterface: GraphQLInterfaceType,
  queryPrefix: string,
  schemaPrefix: string,
  itemDef: IItemDefinitionRawJSONDataType,
): any {
  const itemDefNameInQuery = queryPrefix + stringToCamelCase(itemDef.name, true);
  const itemDefNameInSchema = schemaPrefix + stringToCamelCase(itemDef.name);

  const itemDefinitionType = new GraphQLObjectType({
    name: itemDefNameInSchema,
    interfaces: [
      moduleInterface,
    ],
    fields: {
      ...buildPropertiesToGraphQL(itemDef.properties || []),
    },
  });

  const singleItemDefQuery = {
    name: itemDefNameInQuery,
    type: itemDefinitionType,
    args: GQLGetterFields,
  };
  const multipleItemDefQuery = {
    name: "search_" + itemDefNameInQuery,
    type: new GraphQLList(itemDefinitionType),
    args: {
      ...GQLSearchFields,
      ...buildPropertiesToGraphQL(itemDef.properties || [], true, true),
    },
  };

  let finalObj = {};
  finalObj[itemDefNameInQuery] = singleItemDefQuery;
  finalObj["search_" + itemDefNameInQuery] = multipleItemDefQuery;
  (itemDef.childDefinitions || []).map((cd) => {
    finalObj = {...finalObj, ...buildGraphQLSchemaQueriesItemDefinition(
      moduleInterface,
      itemDefNameInQuery + "_",
      itemDefNameInSchema + "_",
      cd,
    )};
  });
  return finalObj;
}

/**
 * Build the queries for the module
 * @param mod a module from the root or another module
 */
function buildGraphQLSchemaQueriesModule(mod: IModuleRawJSONDataType): any {
  const moduleNameInQuery = stringToCamelCase(mod.name, true);
  const moduleNameInSchema = stringToCamelCase(mod.name);

  const moduleBaseInterface = new GraphQLInterfaceType({
    name: moduleNameInSchema,
    fields: {
      ...GQLBaseFields,
      ...buildPropertiesToGraphQL(mod.propExtensions || []),
    },
  });

  const moduleQuery = {
    name: moduleNameInQuery,
    type: new GraphQLList(moduleBaseInterface),
    args: {
      ...GQLSearchFields,
      ...buildPropertiesToGraphQL(mod.propExtensions || [], true, true),
    },
  };

  let finalObj = {};
  finalObj[moduleNameInQuery] = moduleQuery;
  (mod.children || []).map((c) => {
    if (c.type === "module") {
      finalObj = {...finalObj, ...buildGraphQLSchemaQueriesModule(c)};
    } else {
      finalObj = {...finalObj, ...buildGraphQLSchemaQueriesItemDefinition(
        moduleBaseInterface,
        moduleNameInQuery + "_",
        moduleNameInSchema + "_",
        c,
      )};
    }
  });
  return finalObj;
}

/**
 * Builds the queries from the root
 * @param root the root of the itemize definition
 */
function buildGraphQLSchemaQueriesRoot(root: IRootRawJSONDataType): any {
  let finalObj = {};
  root.children.forEach((mod) => {
    finalObj = {...finalObj, ...buildGraphQLSchemaQueriesModule(mod)};
  });
  return finalObj;
}

/**
 * Takes an itemize root and generates a graphql definition
 * from it
 * @param root The root of the json definition
 */
export function buildGraphQLSchema(root: IRootRawJSONDataType) {
  const rootQueries = buildGraphQLSchemaQueriesRoot(root);
  const config: GraphQLSchemaConfig = {
    query: new GraphQLObjectType({
      name: "Query",
      fields: rootQueries,
    }),
  };
  const result = new GraphQLSchema(config);
  return printSchema(result);
}
