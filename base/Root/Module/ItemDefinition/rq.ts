/**
 * This file contains all the graphql functions that need to be used to request
 * and process an item definition, from the definition to how it must be queried
 *
 * @module
 */

import {
  PREFIX_SEARCH,
  PREFIX_ADD,
  PREFIX_EDIT,
  PREFIX_DELETE,
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  PREFIX_GET_LIST,
  POLICY_PREFIXES,
  PREFIX_BUILD,
  ENDPOINT_ERRORS,
  PREFIX_TRADITIONAL_SEARCH,
  RESERVED_BASE_PROPERTIES_RQ,
  ORDERBY_RULE_RQ,
  RESERVED_IDEF_SEARCH_PROPERTIES_RQ,
  SEARCH_RECORDS_CONTAINER_RQ,
  RESERVED_GETTER_LIST_PROPERTIES_RQ,
  PREFIX_GET,
  RESERVED_GETTER_PROPERTIES_RQ,
  RESERVED_CHANGE_PROPERTIES_RQ,
  RESERVED_ADD_PROPERTIES_RQ,
} from "../../../../constants";
import ItemDefinition from ".";
import { EndpointError } from "../../../errors";
import { IRQResolverArgs, IRQResolversType, RQArg, RQField, RQQuery, RQRootSchema, rqFieldsToRqArgs } from "../../../Root/rq";
import { getRQDefinitionForProperty } from "./PropertyDefinition/rq";
import { getRQDefinitionForInclude } from "./Include/rq";

export function getRQDefinitionForItemDefinition(
  itemDefinition: ItemDefinition,
  options: {
    retrievalMode: boolean;
    excludeBase: boolean;
    optionalForm: boolean;
    onlyTextFilters: boolean;
    includePolicy: string | string[];
  },
): RQField {
  const stdFields: { [id: string]: RQField } = {};

  if (!options.excludeBase) {
    Object.keys(RESERVED_BASE_PROPERTIES_RQ).forEach((property) => {
      if (EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.includes(property)) {
        stdFields[property] = RESERVED_BASE_PROPERTIES_RQ[property];
      } else {
        if (!stdFields.DATA) {
          stdFields.DATA = {
            type: "object",
            stdFields: {},
            ownFields: {},
          }
        }
        stdFields.DATA.stdFields[property] = RESERVED_BASE_PROPERTIES_RQ[property];
      }
    });
  }

  // now we get all prop extensions of this module
  itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((propDef) => {
    if (options.retrievalMode && propDef.isRetrievalDisabled()) {
      return;
    }

    if (options.onlyTextFilters && (propDef.getType() !== "string" || propDef.getSubtype() !== "search")) {
      return;
    }

    if (!stdFields.DATA) {
      stdFields.DATA = {
        type: "object",
        stdFields: {},
        ownFields: {},
      }
    }

    // and basically get the fields for that property
    Object.assign(stdFields.DATA.ownFields, getRQDefinitionForProperty(propDef, {
      optionalForm: options.optionalForm,
      prefix: "",
      retrievalMode: options.retrievalMode,
    }));
  });

  // We do the same with the includes
  if (!options.onlyTextFilters) {
    itemDefinition.getAllIncludes().forEach((i) => {
      const includeFields = getRQDefinitionForInclude(i, {
        optionalForm: options.optionalForm,
        retrievalMode: options.retrievalMode,
      });
      if (includeFields) {
        if (!stdFields.DATA) {
          stdFields.DATA = {
            type: "object",
            stdFields: {},
            ownFields: {},
          }
        }
        Object.assign(stdFields.DATA.ownFields, includeFields);
      }
    });
  }

  if (Array.isArray(options.includePolicy)) {
    options.includePolicy.forEach((policyToInclude) => {
      const policyField: RQField = getRQDefinitionForItemDefinitionPolicies(itemDefinition, {
        policy: policyToInclude,
      });

      if (policyField.stdFields) {
        Object.assign(stdFields, policyField.stdFields);
      }
    });
  } else if (options.includePolicy) {
    const policyField: RQField = getRQDefinitionForItemDefinitionPolicies(itemDefinition, {
      policy: options.includePolicy,
    });

    if (policyField.stdFields) {
      Object.assign(stdFields, policyField.stdFields);
    }
  }

  // return that
  return {
    type: "object",
    stdFields,
  };
}

/**
 * Provides the fields that are required to include policy data for property
 * definitions
 * @param itemDefinition the item definition in question
 * @param options.policy the policy type that should be included, eg "edit", "delete", "read" and "parent"
 * @param options.propertiesAsInput if the properties should be in input form
 * @returns a partial graphql fields definition that only contains the policies
 */
export function getRQDefinitionForItemDefinitionPolicies(
  idef: ItemDefinition,
  options: {
    policy: string,
  },
): RQField {
  // building the fields result
  const fieldsResult: RQField = {
    type: "object",
    ownFields: {},
  };
  // get all the policy names for it
  idef.getPolicyNamesFor(options.policy).forEach((policyName) => {
    // get all the properties for that policy
    idef.getPropertiesForPolicy(options.policy, policyName).forEach((pd) => {
      // and add them
      Object.assign(
        fieldsResult.ownFields,
        getRQDefinitionForProperty(pd, {
          optionalForm: true,
          prefix: PREFIX_BUILD(POLICY_PREFIXES[options.policy] + policyName),
          retrievalMode: false,
        }),
      );
    });
  });
  return fieldsResult;
}

/**
 * Provides the fields definition for the module itself, and for all
 * items inside the module which extend these fields, modules by default
 * contain called base properties, which every element has
 * @param mod the module in question
 * @param options.retrievalMode whether it is in retrieval mode
 * @param options.excludeBase whether to exclude the base properties, like created_at, etc..
 * @param options.propertiesAsInput if the properties should be in input form
 * @param options.optionalForm makes all the parameters optional, that is nullable
 * @returns all the fields definition for the module
 */
export function getRQSchemaForItemDefinition(
  idef: ItemDefinition,
  resolvers?: IRQResolversType,
): RQRootSchema {
  // This module might be a search module, and search modules are well, not what we use
  // to retrieve fields, they are to define arguments
  if (idef.isInSearchMode()) {
    throw new Error("Modules in search mode has no RQ queries");
  }

  const rqFiledIdef = getRQDefinitionForItemDefinition(idef, {
    retrievalMode: true,
    excludeBase: false,
    onlyTextFilters: false,
    optionalForm: false,
    includePolicy: null,
  });

  const argsToAdd = rqFieldsToRqArgs(getRQDefinitionForItemDefinition(idef, {
    retrievalMode: false,
    excludeBase: true,
    optionalForm: false,
    includePolicy: "parent",
    onlyTextFilters: false,
  }));

  const argsToEdit = rqFieldsToRqArgs(getRQDefinitionForItemDefinition(idef, {
    retrievalMode: false,
    excludeBase: true,
    optionalForm: true,
    includePolicy: ["edit", "read"],
    onlyTextFilters: false,
  }));

  const argsToDelete = rqFieldsToRqArgs(getRQDefinitionForItemDefinitionPolicies(idef, {
    policy: "delete",
  }));

  const argsToRead = rqFieldsToRqArgs(getRQDefinitionForItemDefinitionPolicies(idef, {
    policy: "read",
  }));

  // the mutation fields for the mutation query
  let mutation: { [id: string]: RQQuery } = {
    // the add function works to create a new item definition
    // instance for this specific item definition, so we
    // mix the add properties fields, the parent module fields,
    // excluding the base, and as input, because it's args,
    // and then we get our own fields
    [PREFIX_ADD + idef.getQualifiedPathName()]: {
      args: {
        ...RESERVED_ADD_PROPERTIES_RQ,
        ...argsToAdd.properties,
      },
      ownFields: rqFiledIdef.ownFields,
      stdFields: rqFiledIdef.stdFields,
    },
    // The edition uses the standard getter properties to fetch
    // an item definition instance given its id, version and then
    // uses the same idea of adding in order to modify the data
    // that is in there
    [PREFIX_EDIT + idef.getQualifiedPathName()]: {
      args: {
        ...RESERVED_CHANGE_PROPERTIES_RQ,
        ...argsToEdit.properties,
      },
      ownFields: rqFiledIdef.ownFields,
      stdFields: rqFiledIdef.stdFields,
    },
    // The delete uses the standard getter properties to fetch
    // the item definition instance, and basically deletes it
    // instead of retrieving anything, well, it retrieves
    // the deleted element itself
    [PREFIX_DELETE + idef.getQualifiedPathName()]: {
      args: {
        ...RESERVED_CHANGE_PROPERTIES_RQ,
        ...argsToDelete.properties,
      },
      ownFields: rqFiledIdef.ownFields,
      stdFields: rqFiledIdef.stdFields,
    },
  };
  // the query fields for the query
  let query: { [id: string]: RQQuery } = {
    // basic get query to get an item given an id and optional version
    [PREFIX_GET + idef.getQualifiedPathName()]: {
      args: {
        ...RESERVED_GETTER_PROPERTIES_RQ,
        ...argsToRead.properties,
      },
      ownFields: rqFiledIdef.ownFields,
      stdFields: rqFiledIdef.stdFields,
    },
  };

  if (resolvers) {
    mutation[PREFIX_ADD + idef.getQualifiedPathName()].resolve =
      resolveGenericFunction.bind(null, "addItemDefinition", idef, resolvers);
    mutation[PREFIX_EDIT + idef.getQualifiedPathName()].resolve =
      resolveGenericFunction.bind(null, "editItemDefinition", idef, resolvers);
    mutation[PREFIX_DELETE + idef.getQualifiedPathName()].resolve =
      resolveGenericFunction.bind(null, "deleteItemDefinition", idef, resolvers);
    query[PREFIX_GET + idef.getQualifiedPathName()].resolve =
      resolveGenericFunction.bind(null, "getItemDefinition", idef, resolvers);
  }

  if (idef.isSearchable()) {
    const orderByRuleArg: RQArg = {
      type: "object",
      properties: {
        created_at: ORDERBY_RULE_RQ,
        edited_at: ORDERBY_RULE_RQ,
      }
    };

    idef.getAllPropertyDefinitionsAndExtensions().forEach((p) => {
      const description = p.getPropertyDefinitionDescription();
      if (!description.sqlOrderBy) {
        return;
      }

      orderByRuleArg.properties[p.getId()] = ORDERBY_RULE_RQ;
    });

    const rqFiledIdef2 = getRQDefinitionForItemDefinition(idef.getSearchModeCounterpart(), {
      retrievalMode: false,
      excludeBase: true,
      optionalForm: true,
      onlyTextFilters: false,
      includePolicy: null,
    });
    delete rqFiledIdef2.stdFields;
    const rqFiledModule2AsArg = rqFieldsToRqArgs(rqFiledIdef2);

    const searchArgs: { [id: string]: RQArg } = {
      // as you can realize the arguments exclude the base and make it into input mode
      // that means no RESERVED_BASE_PROPERTIES_RQ
      ...rqFiledModule2AsArg.properties,
      ...RESERVED_IDEF_SEARCH_PROPERTIES_RQ(orderByRuleArg),
    };

    const resultsField: RQField = {
      ...rqFiledIdef,
      array: true,
      required: true,
    };

    query[PREFIX_SEARCH + idef.getQualifiedPathName()] = {
      stdFields: SEARCH_RECORDS_CONTAINER_RQ.stdFields,
      ownFields: {},
      args: searchArgs,
    };

    const traditionalStdFields = { ...SEARCH_RECORDS_CONTAINER_RQ.stdFields };
    delete traditionalStdFields.records;
    delete traditionalStdFields.earliest_created_at;
    delete traditionalStdFields.oldest_created_at;
    traditionalStdFields.highlights ={
      type: "string",
    };
    traditionalStdFields.results = resultsField;

    query[PREFIX_TRADITIONAL_SEARCH + idef.getQualifiedPathName()] = {
      args: searchArgs,
      stdFields: traditionalStdFields,
      ownFields: {},
    };
    query[PREFIX_GET_LIST + idef.getQualifiedPathName()] = {
      args: RESERVED_GETTER_LIST_PROPERTIES_RQ,
      stdFields: {
        results: resultsField,
        highlights: {
          type: "string",
        }
      },
      ownFields: {},
    }

    if (resolvers) {
      query[PREFIX_SEARCH + idef.getQualifiedPathName()].resolve =
        resolveGenericFunction.bind(null, "searchItemDefinition", idef, resolvers);
      query[PREFIX_TRADITIONAL_SEARCH + idef.getQualifiedPathName()].resolve =
        resolveGenericFunction.bind(null, "searchItemDefinitionTraditional", idef, resolvers);
      query[PREFIX_GET_LIST + idef.getQualifiedPathName()].resolve =
        resolveGenericFunction.bind(null, "getItemDefinitionList", idef, resolvers);
    }
  }

  return {
    query,
    mutation,
  };
}

/**
 * A generic function that is used for the resolver in the
 * graphql endpoint in order to specify which resolve to
 * be used and catch errors, this is what the client
 * actually recieves, all processing should be done here
 * this however only affects the generic processing of these
 * basic resolvers and not the custom ones
 * @param resolveToUse which resolve to use
 * @param itemDefinition the item definition in question
 * @param resolvers the resolvers object
 * @param source parameter source obtained from graphql
 * @param args obtained from graphql as well
 * @param context same
 * @param info also
 * @returns a promise that returns whatever the resolvers return
 */
async function resolveGenericFunction(
  resolveToUse: string,
  itemDefinition: ItemDefinition,
  resolvers: IRQResolversType,
  args: IRQResolverArgs,
): Promise<any> {
  // so firstly the value is null
  let value = null;
  // if we have a resolvers
  if (resolvers) {
    // we try to get the value, resolvers
    // are expected to be async functions
    try {
      value = await resolvers[resolveToUse](itemDefinition, args);
    } catch (err) {
      // if we catch an error, we check
      // if it's an expected error the user should see
      if (err instanceof EndpointError) {
        throw err;
      }
      // otherwise this is an internal server error
      // the user shouldn't receive that
      throw new EndpointError({
        message: "Internal Server Error",
        code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
      });
    }
  }
  // return the value we got
  return value;
}