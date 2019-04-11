import { IRootRawJSONDataType } from "../base/Root";
import PropertyDefinition, {
  PropertyDefinitionSearchInterfacesType,
  IPropertyDefinitionRawJSONDataType,
  IPropertyDefinitionSupportedType,
} from "../base/ItemDefinition/PropertyDefinition";
import {
  RESERVED_BASE_PROPERTIES,
  RESERVED_SEARCH_PROPERTIES,
  RESERVED_GETTER_PROPERTIES,
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

// Let's define some basic translation types
// these are for use on some cheap types
const translationTypes = {
  String: GraphQLString,
  Int: GraphQLInt,
  Float: GraphQLFloat,
  Boolean: GraphQLBoolean,
  ID: GraphQLID,
};
// These are the fancy types, the ones we
// create later for types
const fancyTranslationTypes = {};

// We get the reserved properties that are used in graphql
const GQLBaseFields = objToGraphQLFields(RESERVED_BASE_PROPERTIES);
const GQLSearchFields = objToGraphQLFields(RESERVED_SEARCH_PROPERTIES);
const GQLGetterFields = objToGraphQLFields(RESERVED_GETTER_PROPERTIES);

// We need to build the types for each supported type
// we start by looping within them
Object.keys(PropertyDefinition.supportedTypesStandard).forEach((pdk) => {

  // getting the property definition supported type from the properties
  // definition list
  const pdv: IPropertyDefinitionSupportedType =
    PropertyDefinition.supportedTypesStandard[pdk];

  // if it has a special definition we need to create both the in
  // and the out, remember that these might be taken as input
  if (pdv.gqlDef) {
    // so we add it to the fancy list
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

/**
 * Converts a string to a graphql type
 * @param str the string in question
 * @param isRequired whether is required or not, this is an override
 * @param isInput whether is supposed to be for an input type
 * @returns a graphql scalar type
 */
function strToGraphQLType(str: string, isRequired?: boolean, isInput?: boolean): {
  type: GraphQLScalarType | GraphQLNonNull<GraphQLNullableType>,
} {
  // the actual string to use
  let actualStr = str;
  // we check whether is required or not by checking whether it ends with
  // or if it's being forced to be required
  const internalIsRequired = isRequired || str.endsWith("!");
  if (str.endsWith("!")) {
    // remove the ! if it was in there
    actualStr = str.substr(0, str.length - 1);
  }

  let type;
  if (actualStr.endsWith("]") && actualStr.startsWith("[")) {
    type = new GraphQLList(
      strToGraphQLType(actualStr.substr(1, str.length - 2), false, isInput).type,
    );
  } else {
    // let's get the type
    type = translationTypes[actualStr];
    if (!type) {
      // if we dont find anything it could be because it's a fancy type
      type = fancyTranslationTypes[actualStr];
      if (type && isInput) {
        type = type.input;
      } else if (type && !isInput) {
        type = type.output;
      }
    }
  }
  // Otherwise let's throw an error
  if (!type) {
    throw new Error("Invalid graphql type " + actualStr);
  }

  // if it's defined as to be required, we return it as so
  if (internalIsRequired) {
    return {
      type: new GraphQLNonNull(type),
    };
  }

  // otherwise return it raw
  return {
    type,
  };
}

/**
 * Converts an object of key value simple types to a grahql type object
 * for example
 *
 * {
 *   name: "String!",
 *   value: "Int!"
 * }
 *
 * to
 *
 * {
 *   name: {
 *     type: ...
 *   },
 *   value: {
 *     type: ...
 *   }
 * }
 *
 * where the values of the types are graphql scalars or grapqhl not nulls
 *
 * @param obj the object in question
 * @returns an object of types
 */
function objToGraphQLFields(obj: {[key: string]: string}) {
  const objCopy = {};
  Object.keys(obj).forEach((key) => {
    objCopy[key] = strToGraphQLType(obj[key]);
  });

  return objCopy;
}

/**
 * Converts a property definition raw data to the graphql definition
 * @param properties the properties in question
 * @param searchMode whether it is in search mode, to fullfill arguments
 * @param isInput to use input values (usually true when in search mode)
 */
function buildPropertiesToGraphQL(
  properties: IPropertyDefinitionRawJSONDataType[],
  searchMode?: boolean,
  isInput?: boolean,
): any {
  // So we make up the result
  const result = {};

  // Start looping on the properties to see
  // what we get
  properties.forEach((property) => {
    // we then get the definition for the property type
    const pdv: IPropertyDefinitionSupportedType =
      PropertyDefinition.supportedTypesStandard[property.type];

    // if the property itself has disabled the retrieval
    // and it's in search mode or if the search level
    // is disabled and it's in search mode
    // then return
    if ((property.disableRetrieval && !searchMode) ||
      (property.searchLevel === "disabled" && searchMode)) {
      return;
    }

    // if we are not in search mode
    if (!searchMode) {
      // and add it to the result by converting the graphql type
      result[property.id] = strToGraphQLType(
        pdv.gql, !property.nullable, isInput,
      );
      return;
    }
    // let's get the value that it is supposed to use in the type
    const valueOverall = strToGraphQLType(
      pdv.gql, false, isInput,
    );

    // So for a exact and range interface or just exact
    if (pdv.searchInterface ===
      PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE ||
      pdv.searchInterface ===
      PropertyDefinitionSearchInterfacesType.EXACT) {
      // add the exact
      result[`exact__${property.id}`] = valueOverall;
    }

    // For the range interface
    if (pdv.searchInterface ===
      PropertyDefinitionSearchInterfacesType.EXACT_AND_RANGE) {
      // add the range
      result[`from__${property.id}`] = valueOverall;
      result[`to__${property.id}`] = valueOverall;
    }

    // For the FTS interface
    if (pdv.searchInterface ===
      PropertyDefinitionSearchInterfacesType.FTS) {
      // add the search
      result[`search__${property.id}`] = valueOverall;
    }

    // And for location, which is special
    if (pdv.searchInterface ===
      PropertyDefinitionSearchInterfacesType.LOCATION_DISTANCE) {
      // add it too
      result[`location__${property.id}`] = valueOverall;
      result[`radius__${property.id}`] = strToGraphQLType("Int");
    }
  });

  return result;
}

// TODO need to add item data in the item definition
// both in query and search sink in properties
// TODO mutations

function buildGraphQLSchemaQueriesItemDefinition(
  moduleInterface: GraphQLInterfaceType,
  prefix: string,
  itemDef: IItemDefinitionRawJSONDataType,
): any {
  const itemDefNamePrefixed = prefix + itemDef.name;

  const itemDefinitionType = new GraphQLObjectType({
    name: itemDefNamePrefixed,
    interfaces: [
      moduleInterface,
    ],
    fields: {
      ...buildPropertiesToGraphQL(itemDef.properties || []),
    },
  });

  const singleItemDefQuery = {
    name: itemDefNamePrefixed,
    type: itemDefinitionType,
    args: GQLGetterFields,
  };
  const multipleItemDefQuery = {
    name: "search__" + itemDefNamePrefixed,
    type: new GraphQLList(itemDefinitionType),
    args: {
      ...GQLSearchFields,
      ...buildPropertiesToGraphQL(itemDef.properties || [], true, true),
    },
  };

  let finalObj = {};
  finalObj[itemDefNamePrefixed] = singleItemDefQuery;
  finalObj["search__" + itemDefNamePrefixed] = multipleItemDefQuery;
  (itemDef.childDefinitions || []).map((cd) => {
    finalObj = {...finalObj, ...buildGraphQLSchemaQueriesItemDefinition(
      moduleInterface,
      itemDefNamePrefixed + "__IDEF_",
      cd,
    )};
  });
  return finalObj;
}

/**
 * Build the queries for the module
 * @param mod a module from the root or another module
 */
function buildGraphQLSchemaQueriesModule(
  prefix: string,
  mod: IModuleRawJSONDataType,
): any {
  // Let's get the module name prefixed
  const moduleNamePrefixed = prefix + mod.name;

  // Every base interface for a module extends its children
  // so we create an interface with the base fields
  // and the prop extensions, the base fields are the ones
  // that are in every graphql query, like createdAt and whatnot
  const moduleBaseInterface = new GraphQLInterfaceType({
    name: moduleNamePrefixed,
    fields: {
      ...GQLBaseFields,
      ...buildPropertiesToGraphQL(mod.propExtensions || []),
    },
  });

  // we get the module query as it is supposed to be searched
  // a module level search returns a list and only uses the prop
  // extensions for search, we use true, true for search mode and input mode
  const moduleQuery = {
    name: moduleNamePrefixed,
    type: new GraphQLList(moduleBaseInterface),
    args: {
      ...GQLSearchFields,
      ...buildPropertiesToGraphQL(mod.propExtensions || [], true, true),
    },
  };

  // We build the final object using the queries that
  // are to be used, and looping to every children by addign a prefix
  let finalObj = {};
  finalObj[moduleNamePrefixed] = moduleQuery;

  // We loop into every children of the module
  (mod.children || []).map((c) => {
    // if it's another module
    if (c.type === "module") {
      // we build yet another module, and prefix it to this module
      finalObj = {...finalObj, ...buildGraphQLSchemaQueriesModule(
        moduleNamePrefixed + "__MOD_",
        c,
      )};
    } else {
      // we build a item giving it the interface
      finalObj = {...finalObj, ...buildGraphQLSchemaQueriesItemDefinition(
        moduleBaseInterface,
        moduleNamePrefixed + "__IDEF_",
        c,
      )};
    }
  });
  // we return the final object that contains all the queries
  return finalObj;
}

/**
 * Builds the queries from the root
 * @param root the root of the itemize definition
 */
function buildGraphQLSchemaQueriesRoot(root: IRootRawJSONDataType): any {
  let finalObj = {};
  root.children.forEach((mod) => {
    finalObj = {...finalObj, ...buildGraphQLSchemaQueriesModule("MOD_", mod)};
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
