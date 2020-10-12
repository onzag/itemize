/**
 * Contains functions to perform gql queries as well
 * as the product interfaces for these queries
 * @packageDocumentation
 */

import { Stream } from "stream";
import FormDataNode from "form-data";
import fetchNode from "node-fetch";
import { EndpointErrorType } from "./base/errors";
import { ENDPOINT_ERRORS } from "./constants";
import equals from "deep-equal";
import { requestFieldsAreContained } from "./gql-util";

/**
 * Search results as they are provided
 * by the search function, they are based
 * on the SEARCH_RECORD in the graphql types
 * that graphql returns
 */
export interface IGQLSearchRecord {
  /**
   * The type of the search record, basically a qualified name
   */
  type: string;
  /**
   * The id for the pg id
   */
  id: number;
  /**
   * The version for the pg version
   */
  version: string;
  /**
   * Whent he record was created
   */
  created_at: string;
}

/**
 * The records container represents what the server retruns
 * when it returns a bunch of records
 */
export interface IGQLSearchRecordsContainer {
  records: IGQLSearchRecord[],
  last_record_date: string,
  count: number,
  limit: number,
  offset: number,
}

/**
 * The search container represents the results for the case
 * of traditional searches rather than records based search
 */
export interface IGQLSearchResultsContainer {
  results: IGQLValue[],
  count: number,
  limit: number,
  offset: number,
  last_record_date: string,
}

/**
 * This is how a graphql file is meant
 * to be and send
 */
export interface IGQLFile {
  /**
   * the name of the file
   */
  name: string;
  /**
   * The mime type
   */
  type: string;
  /**
   * an unique id
   */
  id: string;
  /**
   * the url where it is stored
   */
  url: string;
  /**
   * The size of the file in bytes
   */
  size: number;
  /**
   * optional metadata, might be null, usually constains width and
   * height, set by the client, is limited to 128 characters
   * 
   * encoding is WxH;name,name,name as many names as there are special
   * dimensions, large, small and medium do not count
   */
  metadata: string,
  /**
   * A source, either a File or a read stream
   */
  src?: File | Promise<any>;
}

/**
 * Request fields for graphql in the form
 * ```
 * {
 *   field: {},
 *   other: {
 *     field: {}
 *   }
 * }
 * ```
 */
export interface IGQLRequestFields {
  [key: string]: IGQLRequestFields;
}

/**
 * Single arg, can take many shapes
 */
type GQLArg = boolean | string | number | null | GQLRaw | GQLEnum | GQLVar | IGQLFile | IGQLSearchRecord | IGQLArgs;

/**
 * The args field
 */
export interface IGQLArgs {
  [key: string]: GQLArg | GQLArg[];
}

/**
 * A grapqhl single value
 */
type GQLValue = boolean | string | number | null | IGQLSearchRecord | IGQLValue;

/**
 * A graphql many value
 */
export interface IGQLValue {
  [key: string]: GQLValue | GQLValue[];
}

/**
 * A graphql endpoint output
 */
export interface IGQLEndpointValue {
  data: {
    [key: string]: IGQLValue,
  };
  errors?: Array<{
    extensions: EndpointErrorType,
    // might be null, global errors
    path?: string[];
  }>;
}

type IGQLQueryListenerType = (response: IGQLEndpointValue) => void;

/**
 * Graphql helper class in order to build proper form data
 * queries and mutations to the grapqhl api refer to
 * https://github.com/jaydenseric/graphql-multipart-request-spec
 */
export class GQLQuery {
  /**
   * All the processed queries from the query list
   */
  private processedQueries: IGQLQueryObj[];
  /**
   * The type of this query
   */
  private type: "query" | "mutation";
  /**
   * Files that have been found that are unprocessed
   */
  private foundUnprocessedArgFiles: IGQLFile[];
  /**
   * list of listeners
   */
  private listeners: IGQLQueryListenerType[] = [];

  /**
   * Build a graphql query
   * @param type query or mutation
   * @param queries the queries that we want to execute
   */
  constructor(
    type: "query" | "mutation",
    queries: IGQLQueryObj[],
  ) {
    this.type = type;
    this.foundUnprocessedArgFiles = [];

    this.findFilesAndProcessArgs = this.findFilesAndProcessArgs.bind(this);
    this.isNameMergableWith = this.isNameMergableWith.bind(this);

    // we take all the queries and try to extract the args
    this.processedQueries = queries.map((query) => {
      if (query.args) {
        return {
          ...query,
          args: this.findFilesAndProcessArgs(query.args),
        };
      }
      return query;
    });
  }

  /**
   * Check whether it's mergable
   */
  public isMergableWith(query: GQLQuery) {
    if (query.type !== this.type) {
      return false;
    }

    // check for file collision
    const collapsingFiles = this.foundUnprocessedArgFiles.some((uf) => {
      return !!query.foundUnprocessedArgFiles.find((suf) => suf.id === uf.id);
    });

    if (collapsingFiles) {
      return false;
    }

    // we deny queries with aliases, we can't merge with them for sure
    return !query.processedQueries.some((q) => q.alias);
  }

  private isNameMergableWith(ourValue: IGQLQueryObj, theirValue: IGQLQueryObj) {
    if (!equals(ourValue.args, theirValue.args)) {
      return false;
    }

    if (
      requestFieldsAreContained(ourValue.fields, theirValue.fields) ||
      requestFieldsAreContained(theirValue.fields, ourValue.fields)
    ) {
      return true;
    }

    return false;
  }

  /**
   * Merge with it
   * @param query the query to merge with
   * @returns a list of aliases to remap the results from to the given name
   */
  public mergeWith(query: GQLQuery): [string, string][] {
    this.foundUnprocessedArgFiles = this.foundUnprocessedArgFiles.concat(query.foundUnprocessedArgFiles);

    // first we find all the processed queries we have gotten that we are meant to merge
    return query.processedQueries.map((q) => {
      // now we try to find the query with the same name as ours
      const matchingQueries = this.processedQueries.map((sq, index) => ({
        processedQuery: sq,
        index,
      })).filter((v) => v.processedQuery.name === q.name);

      // if we don't find one, we are good to go
      if (matchingQueries.length === 0) {
        // just add it there
        this.processedQueries.push(q);
        return [q.name, q.name];
      } else {
        let mergeId: [string, string] = null;
        // otherwise let's check if we can merge with some of them
        const itMerged = matchingQueries.some((matchingQuery) => {
          const isNameMergable = this.isNameMergableWith(matchingQuery.processedQuery, q);

          if (isNameMergable) {
            if (requestFieldsAreContained(matchingQuery.processedQuery.fields, q.fields)) {
              this.processedQueries[matchingQuery.index].fields = q.fields;
            }

            mergeId = [matchingQuery.processedQuery.alias || matchingQuery.processedQuery.name, q.name];
            return true;
          }

          return false;
        });

        // so we couldn't find anything to merge
        if (!itMerged) {
          // So we create a new entire entry for this
          const queryClone = {...q};
          const usedAliases = this.processedQueries.map(q => q.alias);
          let id: number = 2;
          let newAlias = queryClone.name + "_" + id;
          while (usedAliases.includes(newAlias)) {
            id++;
            newAlias = queryClone.name + "_" + id;
          }
          queryClone.alias = newAlias;

          this.processedQueries.push(queryClone);
          return [newAlias, q.name];
        } else {
          return mergeId;
        }
      }
    });
  }

  /**
   * inform a reply to the query in case this has event listeners to that
   */
  public informReply(reply: IGQLEndpointValue) {
    this.listeners.forEach((l) => l(reply));
  }

  /**
   * add a listener for when a reply is informed
   */
  public addEventListenerOnReplyInformed(listener: IGQLQueryListenerType) {
    this.listeners.push(listener);
  }

  /**
   * Provides the operations part of the formdata field in json form
   * @returns the formdata for the operations
   */
  public getOperations() {
    return {
      query: buildGqlThing(this.type, this.getMainQueryArguments(), ...this.processedQueries),
      variables: this.getVariables(),
    };
  }

  /**
   * Provides the map of the variables to files and/or streams that exists in the
   * file form that will map the variables to the form data
   */
  public getMap() {
    const map: { [id: string]: [string] } = {};
    this.getAttachments().forEach((foundFile) => {
      map[foundFile.id] = ["variables." + foundFile.id];
    });
    return map;
  }

  /**
   * Provides all the attached files
   */
  public getAttachments(): IGQLFile[] {
    return this.foundUnprocessedArgFiles;
  }

  /**
   * Provides all the variables that are in use for the graphql formdata
   * spec that will map to the operations
   */
  private getVariables() {
    const newVariables = {};
    this.foundUnprocessedArgFiles.forEach((foundFile) => {
      newVariables[foundFile.id] = null;
    });
    return newVariables;
  }
  /**
   * Provides the arguments that will be passed to the main query as in
   * how the main query is expected to recieve those arguments
   */
  private getMainQueryArguments() {
    const args = {};
    this.foundUnprocessedArgFiles.forEach((foundFile) => {
      args["$" + foundFile.id] = new GQLRaw("Upload!");
    });
    return args;
  }

  /**
   * Finds files in the graphql query and processes
   * all the files as they are required in order to retrieve
   * their streams and file content
   * @param arg the argument in question
   * @returns new processed args
   */
  private findFilesAndProcessArgs(arg: IGQLArgs): any {
    // if we have any of this
    if (!arg || arg === null || typeof arg !== "object") {
      // return it as it is
      return arg;
    }

    // now we need to check whether we are in NodeJS or
    // in the browser, the browser uses the File, and NodeJS
    // uses a read stream
    // we are checking for a src which means it's a file
    if (
      (typeof File !== "undefined" && arg.src instanceof File) ||
      (Stream && arg.src instanceof Stream.Readable)
    ) {
      // let's build the unprocessed file
      const detectedUnprocessedFile: IGQLFile = {
        name: arg.name as string,
        id: arg.id as string,
        type: arg.type as string,
        url: arg.url as string,
        size: arg.size as number,
        src: arg.src as any,
        metadata: arg.metadata as any,
      };
      // and add it to our list
      this.foundUnprocessedArgFiles.push(detectedUnprocessedFile);
      // now let's replace the source now with a variable that will
      // refer to the stream
      return {
        ...arg,
        src: new GQLVar(detectedUnprocessedFile.id),
      };
    }

    // if we have a enum or a var, return it
    if (arg instanceof GQLEnum || arg instanceof GQLVar) {
      return arg;
    }

    // this happens when the query is serialized
    // we reconvert it back, this happens when
    // using the workers
    if (arg.__type__ === "GQLEnum") {
      return new GQLEnum(arg.value as string);
    }

    // again deserialize
    if (arg.__type__ === "GQLVar") {
      return new GQLVar(arg.value as string);
    }

    // deserialize
    if (arg.__type__ === "GQLRaw") {
      return new GQLRaw(arg.value as string);
    }

    // now we check for arrays
    if (Array.isArray(arg)) {
      // and we basically map it
      return arg.map(this.findFilesAndProcessArgs);
    }

    // otherwise it's an object and we check every key
    const newResult = {};
    Object.keys(arg).forEach((argKey) => {
      // to process it
      newResult[argKey] = this.findFilesAndProcessArgs(arg[argKey] as IGQLArgs);
    });

    // and return that
    return newResult;
  }
}

/**
 * This is what a query object is expected to look like
 */
export interface IGQLQueryObj {
  /**
   * The grapqhl query name
   */
  name: string;
  /**
   * The graphql alias
   */
  alias?: string;
  /**
   * The arguments to use
   */
  args?: IGQLArgs;
  /**
   * And the fields
   */
  fields?: IGQLRequestFields;
}

/**
 * The __type__ allows for serialization of args
 * this might happen during RPC events it is reconstructed
 * in the class above
 */
export class GQLRaw {
  public value: string;
  // tslint:disable-next-line: variable-name
  public __type__: string = "GQLRaw";
  constructor(value: string) {
    this.value = value;
  }
  public toJSON() {
    return {
      __type__: this.__type__,
      value: this.value,
    };
  }
}

/**
 * A graphql enum
 */
export class GQLEnum extends GQLRaw {
  // tslint:disable-next-line: variable-name
  public __type__: string = "GQLEnum";
}

/**
 * A grapqhl variable
 */
export class GQLVar extends GQLRaw {
  // tslint:disable-next-line: variable-name
  public __type__: string = "GQLVar";
}

/**
 * Build all the fields from the request field list
 * for the graphql query string
 * @param fields the fields to convert
 * @returns a string with the {...} part of the request fields
 */
function buildFields(fields: IGQLRequestFields) {
  // we start with the open bracket
  let fieldsStr = "{";
  // we check every field
  Object.keys(fields).forEach((fieldKey) => {
    // and add it
    fieldsStr += fieldKey;
    // if this is a subfield object
    if (Object.keys(fields[fieldKey]).length) {
      // we recurse in it
      fieldsStr += buildFields(fields[fieldKey]);
    }
    // add a comma
    fieldsStr += ",";
  });
  // close the bracket
  fieldsStr += "}";
  return fieldsStr;
}

/**
 * Builds the arguments of a grapqhl request to its string
 * serialized form
 * @param args the arguments to build
 * @param keyOpenType what key to open with
 * @param keyCloseType what key to close with
 * @returns the serialized args
 */
function buildArgs(
  args: IGQLArgs,
  keyOpenType: string,
  keyCloseType: string,
): string {
  // if it's not an object or if it's null
  if (typeof args !== "object" || args === null) {
    // return it as it is
    return JSON.stringify(args);
  }

  // if we have a variable
  if (args instanceof GQLVar) {
    // return it in the variable form
    return "$" + args.value;
  } else if (args instanceof GQLEnum || args instanceof GQLRaw) {
    // for enums and raw
    return args.value;
  } else if (Array.isArray(args)) {
    // if an array, we just wrap it around array brackets and join the results
    return "[" + args.map((arg) => buildArgs(arg, "{", "}")).join(",") + "]";
  }

  // otherwise we just make the object with the keys we were requested
  return keyOpenType + Object.keys(args).map((argKey) => {
    return argKey + ":" + buildArgs(args[argKey] as IGQLArgs, "{", "}");
  }).join(",") + keyCloseType;
}

/**
 * build a single graphql query string with its main args and its sub queries
 * @param type the type, either mutation or query
 * @param mainArgs the main arguments that this is wrapped around
 * @param queries the queries to run
 */
function buildGqlThing(type: "mutation" | "query", mainArgs: IGQLArgs, ...queries: IGQLQueryObj[]) {
  // so we add the type
  let queryStr = type;
  // if we have args we build those args eg. mutation(arg1: Upload!, arg2: Upload!)
  if (Object.keys(mainArgs).length) {
    queryStr += buildArgs(mainArgs, "(", ")");
  }
  // now we go for the things we are running
  queryStr += "{";
  // and we go for those queries
  queries.forEach((q) => {
    // add the alias if any
    if (q.alias) {
      queryStr += q.alias + ":";
    }
    // add the specific query
    queryStr += q.name;
    // if we have args we add them eg.
    // mutation(arg1: Upload!, arg2: Upload!){something(file: $arg1)
    if (q.args && Object.keys(q.args).length) {
      queryStr += buildArgs(q.args, "(", ")");
    }
    // and if we have fields we add them too
    if (q.fields && Object.keys(q.fields).length) {
      queryStr += buildFields(q.fields) + ",";
    } else {
      // otherwise we end there
      queryStr += ",";
    }
    // expect something like mutation(arg1: Upload!, arg2: Upload!){something(file: $arg1){request{fields}};}
  });
  // close it all
  queryStr += "}";
  // return it
  return queryStr;
}

/**
 * Builds a graphql query
 * @param queries the queries to run
 * @returns a grapqhl query class instance
 */
export function buildGqlQuery(...queries: IGQLQueryObj[]) {
  return new GQLQuery("query", queries);
}

/**
 * Builds a graphql mutation
 * @param mutations the mutations to run
 * @returns a grapqhl query class instance
 */
export function buildGqlMutation(...mutations: IGQLQueryObj[]) {
  return new GQLQuery("mutation", mutations);
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const QUERIES_IN_WAITING: GQLQuery[] = [];

/**
 * Executes a graphql query
 * @param query the query to run
 * @param options.host a host, required when running in NodeJS
 * @param options.merge whether to merge graphql queries in one, adds delay to the queries, might be unwanted
 * @param options.mergeMS how many ms of delay to add, default 70
 * @returns a promise for a graphql endpoint value
 */
export async function gqlQuery(query: GQLQuery, options?: {
  host?: string;
  merge?: boolean;
  mergeMS?: number;
}): Promise<IGQLEndpointValue> {
  const host = (options && options.host) || "";
  const merge = options && options.merge;

  // if we are in browser context and we have no host
  if (typeof fetch === "undefined" && !host) {
    throw new Error("You must provide a host when using graphql querier outside of the browser, eg: http://mysite.com");
  }

  // if we are allowed to merge and not concerned with full speed but rather full optimal
  if (merge) {
    // let's check all the queries that are in the same situation
    const queryThatCanMergeWith = QUERIES_IN_WAITING.find((q) => {
      return q.isMergableWith(query);
    });

    // if we find one, cool, let's merge with it
    if (queryThatCanMergeWith) {
      // we do so
      const remapper = queryThatCanMergeWith.mergeWith(query);
      // and now we are concerned in how to receive the answer
      // from that same query as a reply for this one
      return new Promise((resolve) => {
        // we use the listener as the resolve
        queryThatCanMergeWith.addEventListenerOnReplyInformed((response) => {
          // once we get the response we need to remap
          const newResponse: IGQLEndpointValue = {
            data: {},
          };
          remapper.forEach((rs) => {
            const alias = rs[0];
            const origName = rs[1];

            newResponse.data[origName] = response.data[alias];

            if (response.errors) {
              response.errors.forEach((e) => {
                if (!e.path || e.path[0] === alias) {
                  const newError = {...e};
                  if (newError.path) {
                    newError.path = [origName];
                  }
                  if (newResponse.errors) {
                    newResponse.errors = [];
                  }
                  newResponse.errors.push(newError);
                }
              });
            }

            resolve(newResponse);
          });
        });
      });
      // we do not execute, we have ended
    } else {
      // otherwise we are first, we add this query to the query list
      // so it can be edited in need
      QUERIES_IN_WAITING.push(query);
      // wait a couple of milliseconds
      await wait((options && options.mergeMS) || 70);
      // and then take us away from the waiting list, we are about to execute
      const index = QUERIES_IN_WAITING.findIndex((q) => q === query);
      if (index !== -1) {
        QUERIES_IN_WAITING.splice(index, 1);
      }
    }
  }

  // building the form data
  const formData = typeof FormData !== "undefined" ? new FormData() : new FormDataNode();
  // append this stuff to the form data
  formData.append("operations", JSON.stringify(query.getOperations()));
  formData.append("map", JSON.stringify(query.getMap()));
  // now let's get all the attachents and append them to the form data
  query.getAttachments().forEach((attachment) => {
    formData.append(attachment.id, attachment.src as File);
  });

  // the fetch we need to use
  const fetchToUse = typeof fetch !== "undefined" ? fetch : fetchNode;

  let reply: IGQLEndpointValue;
  // now we try
  try {
    const value = await fetchToUse(host + "/graphql", {
      method: "POST",
      cache: "no-cache",
      body: formData as any,
    });
    reply = await value.json();
  } catch (err) {
    reply = {
      data: null,
      errors: [
        {
          extensions: {
            message: "Failed to connect to the server",
            code: ENDPOINT_ERRORS.CANT_CONNECT,
          },
        },
      ],
    };
  }

  query.informReply(reply);
  return reply;
}
