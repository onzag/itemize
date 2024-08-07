/**
 * Contains all the RQ functions that are used and generated for and within
 * the module, refer to this file for the RQ generation side of things
 *
 * @module
 */

import {
  RESERVED_BASE_PROPERTIES_RQ,
  PREFIX_SEARCH,
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  PREFIX_GET_LIST,
  ENDPOINT_ERRORS,
  PREFIX_TRADITIONAL_SEARCH,
  ORDERBY_RULE_RQ,
  RESERVED_MODULE_SEARCH_PROPERTIES_RQ,
  SEARCH_RECORDS_CONTAINER_RQ,
  RESERVED_GETTER_LIST_PROPERTIES_RQ,
} from "../../../constants";
import Module from ".";
// import { getRQSchemaForItem } from "./ItemDefinition/rq";
// import { getRQDefinitionForProperty } from "./ItemDefinition/PropertyDefinition/rq";
import { IRQResolverArgs, IRQResolversType, RQArg, RQField, RQQuery, RQRootSchema, rqFieldsToRqArgs } from "../rq";
import { EndpointError } from "../../errors";
import { getRQSchemaForItemDefinition } from "./ItemDefinition/rq";
import { getRQDefinitionForProperty } from "./ItemDefinition/PropertyDefinition/rq";

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
export function getRQDefinitionForModule(
  mod: Module,
  options: {
    retrievalMode: boolean;
    excludeBase: boolean;
    optionalForm: boolean;
    onlyTextFilters: boolean;
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
  mod.getAllPropExtensions().forEach((propExtension) => {
    if (options.retrievalMode && propExtension.isRetrievalDisabled()) {
      return;
    }

    if (options.onlyTextFilters && (propExtension.getType() !== "string" || propExtension.getSubtype() !== "search")) {
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
    Object.assign(stdFields.DATA.ownFields, getRQDefinitionForProperty(propExtension, {
      optionalForm: options.optionalForm,
      prefix: "",
      retrievalMode: options.retrievalMode,
    }));
  });

  // return that
  return {
    type: "object",
    stdFields,
  };
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
export function getRQSchemaForModule(
  mod: Module,
  resolvers?: IRQResolversType,
): RQRootSchema {
  // This module might be a search module, and search modules are well, not what we use
  // to retrieve fields, they are to define arguments
  if (mod.isInSearchMode()) {
    throw new Error("Modules in search mode has no RQ queries");
  }

  // the mutation fields for the mutation query
  let mutation: { [id: string]: RQQuery } = {};
  // the query fields for the query
  let query: { [id: string]: RQQuery } = {};

  if (mod.isSearchable()) {
    const rqFiledModule = getRQDefinitionForModule(mod, {
      retrievalMode: true,
      excludeBase: false,
      onlyTextFilters: false,
      optionalForm: false,
    });

    const orderByRuleArg: RQArg = {
      type: "object",
      properties: {
        created_at: ORDERBY_RULE_RQ,
        edited_at: ORDERBY_RULE_RQ,
      }
    };
    mod.getAllPropExtensions().forEach((p) => {
      const description = p.getPropertyDefinitionDescription();
      if (!description.sqlOrderBy) {
        return;
      }

      orderByRuleArg.properties[p.getId()] = ORDERBY_RULE_RQ;
    });

    const rqFiledModule2 = getRQDefinitionForModule(mod.getSearchModule(), {
      retrievalMode: false,
      excludeBase: true,
      optionalForm: true,
      onlyTextFilters: false,
    });
    delete rqFiledModule2.stdFields;
    const rqFiledModule2AsArg = rqFieldsToRqArgs(rqFiledModule2);

    const searchArgs: { [id: string]: RQArg } = {
      // as you can realize the arguments exclude the base and make it into input mode
      // that means no RESERVED_BASE_PROPERTIES_RQ
      ...rqFiledModule2AsArg.properties,
      ...RESERVED_MODULE_SEARCH_PROPERTIES_RQ(orderByRuleArg),
    };

    const resultsField: RQField = {
      ...rqFiledModule,
      array: true,
      required: true,
    };

    query[PREFIX_SEARCH + mod.getQualifiedPathName()] = {
      stdFields: SEARCH_RECORDS_CONTAINER_RQ.stdFields,
      ownFields: {},
      args: searchArgs,
    };

    const traditionalStdFields = { ...SEARCH_RECORDS_CONTAINER_RQ.stdFields };
    delete traditionalStdFields.records;
    delete traditionalStdFields.earliest_created_at;
    delete traditionalStdFields.oldest_created_at;
    traditionalStdFields.highlights ={
      type: "any",
    };
    traditionalStdFields.results = resultsField;

    query[PREFIX_TRADITIONAL_SEARCH + mod.getQualifiedPathName()] = {
      args: searchArgs,
      stdFields: traditionalStdFields,
      ownFields: {},
    };

    query[PREFIX_GET_LIST + mod.getQualifiedPathName()] = {
      args: RESERVED_GETTER_LIST_PROPERTIES_RQ,
      stdFields: {
        results: resultsField,
        highlights: {
          type: "any",
        },
      },
      ownFields: {},
    }

    if (resolvers) {
      query[PREFIX_TRADITIONAL_SEARCH + mod.getQualifiedPathName()].resolve =
        resolveGenericFunction.bind(null, "searchModuleTraditional", mod, resolvers);
      query[PREFIX_GET_LIST + mod.getQualifiedPathName()].resolve =
        resolveGenericFunction.bind(null, "getModuleList", mod, resolvers);
      query[PREFIX_SEARCH + mod.getQualifiedPathName()].resolve =
        resolveGenericFunction.bind(null, "searchModule", mod, resolvers);
    }
  }

  // now we get all child definitions and add the query
  // fields for each of them
  mod.getAllChildItemDefinitions().forEach((cIdef) => {
    const schema = getRQSchemaForItemDefinition(cIdef, resolvers);
    Object.assign(query, schema.query);
    Object.assign(mutation, schema.mutation);
  });

  mod.getAllModules().forEach((cMod) => {
    const schema = getRQSchemaForModule(cMod, resolvers);
    Object.assign(query, schema.query);
    Object.assign(mutation, schema.mutation);
  });

  return {
    query,
    mutation,
  };
}

/**
 * A generic function that is used for the resolver in the
 * RQ endpoint in order to specify which resolve to
 * be used and catch errors, this is what the client
 * actually recieves, all processing should be done here
 * this however only affects the generic processing of these
 * basic resolvers and not the custom ones
 * @param resolveToUse which resolve to use
 * @param itemDefinition the item definition in question
 * @param resolvers the resolvers object
 * @param source parameter source obtained from RQ
 * @param args obtained from RQ as well
 * @param context same
 * @param info also
 * @returns a promise that returns whatever the resolvers return
 */
async function resolveGenericFunction(
  resolveToUse: string,
  mod: Module,
  resolvers: IRQResolversType,
  args: IRQResolverArgs,
): Promise<any> {
  let value = null;
  if (resolvers) {
    try {
      value = await resolvers[resolveToUse](mod, args);
    } catch (err) {
      if (err instanceof EndpointError) {
        throw err;
      }
      
      resolvers.logError(err, resolveToUse, mod);

      throw new EndpointError({
        message: "Internal Server Error",
        code: ENDPOINT_ERRORS.INTERNAL_SERVER_ERROR,
      });
    }
  }
  return value;
}