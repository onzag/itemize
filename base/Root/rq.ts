/**
 * This file contains the root level RQ functions to be used in order to
 * build all the root level resolvers and all the containing modules, this file
 * exists out of consideration but contains mostly types and the combination
 * of functions
 *
 * @module
 */

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
  /**
   * Signals the precense of a DATA layer that contains both
   * std fields and own fields
   * 
   * if not present then it's null
   */
  extFields?: {
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
  /**
   * Signals the precense of a DATA layer that contains both
   * std fields and own fields
   * 
   * if not present then it's null
   */
  extFields?: {
    [id: string]: RQField;
  };
  ownFields: {
    [id: string]: RQField;
  };
  resolve: FRQIdefResolverType | FRQModResolverType;
}

/**
 * This is how we path the resolver args to the function
 * rather than passing four args
 */
export interface IRQIdefResolverArgs {
  args: any;
  fields: any;
}

/**
 * This is how a item definition resolver is supposed to
 * be defined
 */
export type FRQIdefResolverType = (
  resolverArgs: IRQIdefResolverArgs,
  itemDefinition: ItemDefinition,
) => any;

/**
 * This is how a module resolver is supposed to be defined
 */
export type FRQModResolverType = (
  resolverArgs: IRQIdefResolverArgs,
  module: Module,
) => any;

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
