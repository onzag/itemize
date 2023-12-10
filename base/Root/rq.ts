/**
 * This file contains the root level RQ functions to be used in order to
 * build all the root level resolvers and all the containing modules, this file
 * exists out of consideration but contains mostly types and the combination
 * of functions
 *
 * @module
 */

import type { IRQArgs, IRQRequestFields, IRQValue } from "../../rq-querier";
import Root from ".";
import Module from "./Module";
import ItemDefinition from "./Module/ItemDefinition";
import { getRQSchemaForModule } from "./Module/rq";

export interface RQRootSchema {
  query: {
    [id: string]: RQQuery;
  };
  mutation: {
    [id: string]: RQQuery;
  };
}

interface RQBase {
  array?: boolean;
  type: "string" | "boolean" | "object" | "binary" | "integer" | "number" | "integer-positive" | "any";
  values?: any[];
  required?: boolean;
  description?: string;
  recordsObj?: boolean;
}

export interface RQArg extends RQBase {
  properties?: {
    [id: string]: RQArg;
  };
}

export interface RQField extends RQBase {
  array?: boolean;
  type: "string" | "boolean" | "object" | "binary" | "integer" | "number" | "integer-positive" | "any";
  values?: any[];
  required?: boolean;
  stdFields?: {
    [id: string]: RQField;
  };
  ownFields?: {
    [id: string]: RQField;
  };
  description?: string;
}

export interface RQQuery {
  args: {
    [id: string]: RQArg;
  };
  stdFields: {
    [id: string]: RQField;
  };
  ownFields: {
    [id: string]: RQField;
  };
  resolve?: FQGenericResolverType;
}

/**
 * This is how we path the resolver args to the function
 * rather than passing four args
 */
export interface IRQResolverArgs {
  args: any;//IRQArgs;
  fields: any;//IRQRequestFields;
}

export type FQGenericResolverType = (
  resolverArgs: IRQResolverArgs,
) => Promise<IRQValue>;

/**
 * This is how a item definition resolver is supposed to
 * be defined
 */
export type FRQIdefResolverType = (
  itemDefinition: ItemDefinition,
  resolverArgs: IRQResolverArgs,
) => Promise<IRQValue>;

/**
 * This is how a module resolver is supposed to be defined
 */
export type FRQModResolverType = (
  module: Module,
  resolverArgs: IRQResolverArgs,
) => Promise<IRQValue>;

/**
 * This is all the base resolvers we are expecting out off itemize
 */
export interface IRQResolversType {
  getItemDefinition: FRQIdefResolverType;
  getItemDefinitionList: FRQIdefResolverType;
  searchItemDefinition: FRQIdefResolverType;
  searchItemDefinitionTraditional: FRQIdefResolverType;
  searchModule: FRQModResolverType;
  searchModuleTraditional: FRQModResolverType;
  getModuleList: FRQModResolverType;
  addItemDefinition: FRQIdefResolverType;
  editItemDefinition: FRQIdefResolverType;
  deleteItemDefinition: FRQIdefResolverType;
}

/**
 * Retrieves the whole structure of the current loaded instance
 * of the schema into a valid RQ schema
 * @param root the Root of he schema
 * @param resolvers the resolvers
 * @returns a RQ schema with all the resolvers applied
 */
export function getRQSchemaForRoot(
  root: Root,
  resolvers?: IRQResolversType,
): RQRootSchema {
  // the mutation fields for the mutation query
  let mutation = {};
  // the query fields for the query
  let query = {};

  // now we get all the modules stored on root
  root.getAllModules().forEach((mod) => {
    const schema = getRQSchemaForModule(mod, resolvers);
    Object.assign(query, schema.query);
    Object.assign(mutation, schema.mutation);
  });

  // now we return the shchema
  return {
    query,
    mutation,
  };
}

export function rqFieldsToRqArgs(field: RQField): RQArg {
  if (field.type !== "object") {
    return field;
  }

  const copy: RQArg = {properties: {}, ...field};
  if ((copy as RQField).stdFields) {
    Object.assign(copy.properties, (copy as RQField).stdFields);
    delete (copy as RQField).stdFields;
  }
  if ((copy as RQField).ownFields) {
    Object.assign(copy.properties, (copy as RQField).ownFields);
    delete (copy as RQField).ownFields;
  }

  Object.keys(copy.properties).forEach((p) => {
    copy.properties[p] = rqFieldsToRqArgs(copy.properties[p]);
  });
  return copy;
}

export function rqArgsToRqFieldsStdOnly(arg: RQArg): RQField {
  if (arg.type !== "object") {
    return arg;
  }

  const copy: RQField = {stdFields: arg.properties, ...arg};
  delete (copy as any).properties;

  Object.keys(copy.stdFields).forEach((p) => {
    copy.stdFields[p] = rqArgsToRqFieldsStdOnly(copy.stdFields[p]);
  });

  return copy;
}