/**
 * Contains functions to perform gql queries as well
 * as the product interfaces for these queries
 * @module
 */

import { Stream } from "stream";
import FormDataNode from "form-data";
// TODO remove to go back to just using plain http and https
import fetchNode from "node-fetch";
import { EndpointErrorType } from "./base/errors";
import { ENDPOINT_ERRORS, MAX_FILES_PER_REQUEST } from "./constants";
import equals from "deep-equal";
import { requestFieldsAreContained } from "./rq-util";
import type { ReadStream } from "fs";
import type { RQField, RQQuery, RQRootSchema } from "./base/Root/rq";

/**
 * Search results as they are provided
 * by the search function, they are based
 * on the SEARCH_RECORD in the graphql types
 * that graphql returns
 */
export interface IRQSearchRecord {
  /**
   * The type of the search record, basically a qualified name
   */
  type: string;
  /**
   * The id for the pg id
   */
  id: string;
  /**
   * The version for the pg version
   */
  version: string;
  /**
   * Whent he record was created
   */
  last_modified: string;
}

/**
 * The records container represents what the server retruns
 * when it returns a bunch of records
 */
export interface IRQSearchRecordsContainer {
  records: IRQSearchRecord[];
  last_modified: string;
  count: number;
  limit: number;
  offset: number;
  earliest_created_at: string;
  oldest_created_at: string;
  metadata: string;
}

/**
 * The search container represents the results for the case
 * of traditional searches rather than records based search
 */
export interface IRQSearchResultsContainer {
  results: IRQValue[];
  count: number;
  limit: number;
  offset: number;
  last_modified: string;
  highlights: string;
  metadata: string;
}

/**
 * This is how a graphql file is meant
 * to be and send
 */
export interface IRQFile {
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
   * A source, either a File, Blob or a read stream
   */
  src?: File | Blob | ReadStream | Promise<{ createReadStream: () => ReadStream }>;
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
export interface IRQRequestFields {
  [key: string]: IRQRequestFields;
}

/**
 * Single arg, can take many shapes
 */
type RQArg = boolean | string | number | null | GQLRaw | GQLEnum | GQLVar | IRQFile | IRQSearchRecord | IRQArgs;

/**
 * The args field
 */
export interface IRQArgs {
  [key: string]: RQArg | RQArg[];
}

/**
 * A grapqhl single value
 */
type RQValue = boolean | string | number | null | IRQSearchRecord | IRQValue;

/**
 * A graphql many value
 */
export interface IRQValue {
  [key: string]: RQValue | RQValue[];
}

/**
 * A graphql endpoint output
 */
export interface IRQEndpointValue {
  data: {
    [key: string]: IRQValue,
  };
  errors?: Array<{
    error: EndpointErrorType,
    // might be null, global errors
    path?: string[];
  }>;
}

type IRQQueryListenerType = (response: IRQEndpointValue) => void;

export type ProgresserFn = (arg: IXMLHttpRequestProgressInfo) => void;

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
  private unprocessedQueries: IGQLQueryObj[];
  /**
   * The type of this query
   */
  private type: "query" | "mutation";
  /**
   * Files that have been found that are unprocessed
   */
  private foundUnprocessedArgFiles: IRQFile[];
  /**
   * list of listeners
   */
  private listeners: IRQQueryListenerType[] = [];
  /**
   * list of progress listeners
   */
  private progressers: ProgresserFn[] = [];

  /**
   * The current known reply for the query
   */
  public reply: IRQEndpointValue = null;

  /**
   * The rq schema used
   */
  private rqSchema: RQRootSchema;

  /**
   * Build a graphql query
   * @param type query or mutation
   * @param queries the queries that we want to execute
   */
  constructor(
    type: "query" | "mutation",
    queries: IGQLQueryObj[],
    rqSchema: RQRootSchema,
  ) {
    this.type = type;
    this.foundUnprocessedArgFiles = [];
    this.rqSchema = rqSchema;

    this.findFilesAndProcessArgs = this.findFilesAndProcessArgs.bind(this);
    this.isNameMergableWith = this.isNameMergableWith.bind(this);

    // we take all the queries and try to extract the args
    this.unprocessedQueries = queries;
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
    let totalFilesSize = 0;
    const collapsingFiles = this.foundUnprocessedArgFiles.some((uf) => {
      // we have cheated and calculated half of the files size here
      totalFilesSize += uf.size;
      return !!query.foundUnprocessedArgFiles.find((suf) => suf.id === uf.id);
    });

    if (collapsingFiles) {
      return false;
    }

    // query is too big check, now we add the other query
    // files size
    query.foundUnprocessedArgFiles.forEach((f) => {
      totalFilesSize += f.size;
    });
    if (totalFilesSize > MAX_FILES_PER_REQUEST) {
      return false;
    }

    // we deny queries with aliases, we can't merge with them for sure
    return !query.processedQueries.some((q) => q.alias);
  }

  public isContainedWithin(query: GQLQuery) {
    if (query.type !== this.type || query.type !== "query") {
      return false;
    }

    return this.processedQueries.every((q) => {
      const matchingCounterpart = query.processedQueries.find((q2) => {
        const isNameEqual = q2.name === q.name && q.alias === q2.alias;
        if (!isNameEqual) {
          return false;
        }

        const areArgsEqual = equals(q.args, q2.args);
        if (!areArgsEqual) {
          return false;
        }

        return requestFieldsAreContained(q.fields, q2.fields);
      });

      return matchingCounterpart;
    });
  }

  private isNameMergableWith(ourValue: IGQLQueryObj, theirValue: IGQLQueryObj) {
    if (!equals(ourValue.args, theirValue.args, { strict: true })) {
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
    return query.processedQueries.map((q, index) => {
      const unprocessedCounterpart = query.getQueryByIndex(index, true);
      // now we try to find the query with the same name as ours
      const matchingQueries = this.processedQueries.map((sq, index) => ({
        processedQuery: sq,
        index,
      })).filter((v) => v.processedQuery.name === q.name);

      // if we don't find one, we are good to go
      if (matchingQueries.length === 0) {
        // just add it there
        this.processedQueries.push(q);
        this.unprocessedQueries.push(unprocessedCounterpart);
        return [q.name, q.name];
      } else {
        let mergeId: [string, string] = null;
        // otherwise let's check if we can merge with some of them
        const itMerged = matchingQueries.some((matchingQuery) => {
          const isNameMergable = this.isNameMergableWith(matchingQuery.processedQuery, q);

          if (isNameMergable) {
            if (requestFieldsAreContained(matchingQuery.processedQuery.fields, q.fields)) {
              this.processedQueries[matchingQuery.index].fields = q.fields;
              this.unprocessedQueries[matchingQuery.index].fields = unprocessedCounterpart.fields;
            }

            mergeId = [matchingQuery.processedQuery.alias || matchingQuery.processedQuery.name, q.name];
            return true;
          }

          return false;
        });

        // so we couldn't find anything to merge
        if (!itMerged) {
          // So we create a new entire entry for this
          const queryClone = { ...q };
          const usedAliases = this.processedQueries.map(q => q.alias);
          let numberToSuffix: number = 2;
          let newAlias = queryClone.name + "_" + numberToSuffix;
          while (usedAliases.includes(newAlias)) {
            numberToSuffix++;
            newAlias = queryClone.name + "_" + numberToSuffix;
          }
          queryClone.alias = newAlias;

          const unProcessedQueryClone = {
            ...unprocessedCounterpart,
            alias: queryClone.alias,
          };

          this.processedQueries.push(queryClone);
          this.unprocessedQueries.push(unProcessedQueryClone);
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
  public informReply(reply: IRQEndpointValue) {
    this.listeners.forEach((l) => l(reply));
    this.reply = reply;
  }

  public informProgress(arg: IXMLHttpRequestProgressInfo) {
    this.progressers.forEach((p) => p(arg));
  }

  public addProgresserListener(prog: (arg: IXMLHttpRequestProgressInfo) => void) {
    this.progressers.push(prog);
  }

  public getQueries(unprocessed?: boolean) {
    return unprocessed ? this.unprocessedQueries : this.processedQueries;
  }

  /**
   * Provides a processed query given an index
   * @param index 
   * @returns 
   */
  public getQueryByIndex(index: number, unprocessed?: boolean) {
    return unprocessed ? this.unprocessedQueries[index] : this.processedQueries[index];
  }

  /**
   * add a listener for when a reply is informed
   */
  public addEventListenerOnReplyInformed(listener: IRQQueryListenerType) {
    this.listeners.push(listener);
  }

  /**
   * Unlike providing a standard query object this provides
   * a version of the query the server side would recieve once it is
   * parsed, rather than a client side version
   * @param index 
   * @returns 
   */
  public getServerSideQueryByIndex(index: number): IGQLQueryObj {
    const newQuery = {
      ...this.getQueryByIndex(index, true),
    }
    if (newQuery.args) {
      newQuery.args = buildArgsServerSide(newQuery.args);
    }
    return newQuery;
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

  public getRQOperations() {
    return buildRQThing(this.rqSchema, ...this.processedQueries);
  }

  public getType() {
    return this.type;
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
  public getAttachments(): IRQFile[] {
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
  private findFilesAndProcessArgs(arg: IRQArgs): any {
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
      (typeof Blob !== "undefined" && arg.src instanceof Blob) ||
      (Stream && arg.src instanceof Stream.Readable)
    ) {
      // let's build the unprocessed file
      const detectedUnprocessedFile: IRQFile = {
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
      newResult[argKey] = this.findFilesAndProcessArgs(arg[argKey] as IRQArgs);
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
  args?: IRQArgs;
  /**
   * And the fields
   */
  fields?: IRQRequestFields;
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

type RqFieldList = Array<string | RqFieldList>;

// TODO add the schema info to be able to compress this
function buildRQFields(
  schema: RQQuery | RQField,
  fields: IRQRequestFields,
  keyd?: string,
) {
  const rs: RqFieldList = [];

  if (keyd) {
    rs.push(keyd);
  }

  const fieldsKeys = Object.keys(fields);

  const stdKeys = (schema && schema.stdFields && Object.keys(schema.stdFields)) || [];
  const containsAllStd = stdKeys.length && stdKeys.every((stdFieldKey) => {
    return fieldsKeys.includes(stdFieldKey);
  });

  if (containsAllStd) {
    rs.push("&STD");
  }

  fieldsKeys.forEach((fKey) => {
    const isStd = stdKeys.includes(fKey);
    const subFields = Object.keys(fields[fKey]);

    // no subfields just a basic field of a singular value
    if (subFields.length === 0) {
      // if all standard fields are contained and we are the standard too
      if (containsAllStd && isStd) {
        // we don't need to be included
        // note that it may be included for specifications
        // in case of extended fields
        return;
      }

      // add the key to the list
      rs.push(fKey);
    } else {
      const subSchema = schema ?
        (
          (schema.ownFields && schema.ownFields[fKey]) ||
          (schema.stdFields && schema.stdFields[fKey])
        ) : null;

      if (schema && !subSchema) {
        console.warn("Could not find RQ fields definition for field " + fKey);
      }

      const definition = buildRQFields(subSchema, fields[fKey], fKey);

      // is a std that contains all the STD therefore it's done for
      if (
        definition[1] === "&STD" &&
        definition.length === 2
      ) {
        if (
          containsAllStd &&
          isStd
        ) {
          // it contains all the standard fields and this is a standard field
          // that is loading all its own standard fields, therefore it can be skipped
          // as that it's assumed
          return;
        } else {
          // we are not in a standard field that contains all standard fields
          // but we ourselves have only standard fields to load here
          // that's the default, so we leave string alone without expanded form
          rs.push(fKey);
          return;
        }
      }

      // otherwise we must be specific, and specify what are all the fields we
      // are trying to load
      rs.push(definition);
    }
  });

  return rs;
}

/**
 * Build all the fields from the request field list
 * for the graphql query string
 * @param fields the fields to convert
 * @returns a string with the {...} part of the request fields
 */
function buildFields(fields: IRQRequestFields) {
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
 * Builds the arguments of a grapqhl as the server would receive it
 * @param args the arguments to build
 * @returns the serialized args
 */
function buildArgsServerSide(
  args: any,
): any {
  // if it's not an object or if it's null
  if (typeof args !== "object" || args === null) {
    // return it as it is
    return args;
  }

  // if we have a variable
  if (args instanceof GQLVar) {
    // cannot handle vars
    // should've used unprocessed
    return null;
  } else if (args instanceof GQLEnum || args instanceof GQLRaw) {
    // for enums and raw
    return args.value;
  } else if (Array.isArray(args)) {
    // if an array, we just wrap it around array brackets and join the results
    return args.map(buildArgsServerSide);
  }

  // otherwise we just return the args
  const newArgs = {};
  Object.keys(args).forEach((k) => {
    newArgs[k] = buildArgsServerSide(args[k]);
  });
  return newArgs;
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
  args: IRQArgs,
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
    return argKey + ":" + buildArgs(args[argKey] as IRQArgs, "{", "}");
  }).join(",") + keyCloseType;
}

function buildRQArgs(
  args: IRQArgs,
): any {
  // if it's not an object or if it's null
  if (typeof args !== "object" || args === null) {
    // return it as it is
    return args;
  }

  // if we have a variable
  if (args instanceof GQLVar) {
    // return it in the variable form
    return {
      __TYPE__: "VAR",
      value: args.value,
    };
  } else if (args instanceof GQLEnum || args instanceof GQLRaw) {
    return args.value;
  } else if (Array.isArray(args)) {
    return args.map((v: any) => buildRQArgs(v));
  }

  const rs: any = {};
  Object.keys(args).forEach((key) => {
    rs[key] = buildRQArgs(args[key] as any);
  });

  return rs;
}

/**
 * build a single graphql query string with its main args and its sub queries
 * @param type the type, either mutation or query
 * @param mainArgs the main arguments that this is wrapped around
 * @param queries the queries to run
 */
function buildGqlThing(type: "mutation" | "query", mainArgs: IRQArgs, ...queries: IGQLQueryObj[]) {
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

function buildRQThing(rqSchema: RQRootSchema, ...queries: IGQLQueryObj[]) {
  const qs: any = {};
  const tokens: {[key: string]: number} = {};

  queries.forEach((query) => {
    const targetInQuestion = rqSchema ? (rqSchema.mutation[query.name] || rqSchema.query[query.name]) : null;

    if (rqSchema && !targetInQuestion) {
      console.warn("Could not find a matching query in the schema for " + query.name);
    }

    const qObj: any = {
      n: query.name,
    };
    if (query.fields) {
      qObj.f = buildRQFields(targetInQuestion, query.fields);
    }
    if (query.args) {
      qObj.args = buildRQArgs(query.args);
      if (qObj.args.token) {
        if (!tokens[qObj.args.token]) {
          tokens[qObj.args.token] = 0;
        }
        tokens[qObj.args.token]++;
      }
    }
    qs[query.alias || query.name] = qObj;
  });

  const allTokens = Object.keys(tokens);
  let mostUsedToken: string = null;
  if (allTokens.length) {
    mostUsedToken = allTokens.reduce((tokenA, tokenB) => {
      if (tokens[tokenA] > tokens[tokenB]) {
        return tokenA;
      }
      return tokenB;
    });
  }
  if (mostUsedToken) {
    Object.keys(qs).forEach((requestKey) => {
      if (qs[requestKey].args && qs[requestKey].args.token === mostUsedToken) {
        delete qs[requestKey].args.token;
      }
    });
  }
  return [qs, mostUsedToken ? {token: mostUsedToken} : null];
}

/**
 * Builds a graphql query
 * @param queries the queries to run
 * @returns a grapqhl query class instance
 */
export function buildGqlQuery(rqSchema: RQRootSchema, ...queries: IGQLQueryObj[]) {
  return new GQLQuery("query", queries, rqSchema);
}

/**
 * Builds a graphql mutation
 * @param mutations the mutations to run
 * @returns a grapqhl query class instance
 */
export function buildGqlMutation(rqSchema: RQRootSchema, ...mutations: IGQLQueryObj[]) {
  return new GQLQuery("mutation", mutations, rqSchema);
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const QUERIES_IN_WAITING: GQLQuery[] = [];
const QUERIES_IN_NETWORK: GQLQuery[] = [];

export interface IXMLHttpRequestProgressInfo {
  total: number;
  loaded: number;
}

export async function oldXMLHttpRequest(
  host: string,
  body: FormData,
  query: GQLQuery,
  headers?: any,
): Promise<any> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("POST", host + "/graphql");
    request.setRequestHeader('Cache-Control', 'no-cache');
    if (headers) {
      Object.keys(headers).forEach((k) => {
        request.setRequestHeader(k, headers[k]);
      });
    }

    const rejectFn = (ev: any) => {
      reject(new Error(ev.type));
    };

    request.addEventListener("error", rejectFn);
    request.addEventListener("timeout", rejectFn);
    request.addEventListener("abort", rejectFn);
    request.addEventListener("load", (ev) => {
      try {
        const value = JSON.parse(request.responseText);
        resolve(value);
      } catch (e) {
        reject(e);
      }
    });

    request.upload.addEventListener("progress", (ev) => {
      const total = ev.total;
      const loaded = ev.loaded;

      query.informProgress({ total, loaded });
    });

    request.send(body);
  });
}

/**
 * Executes a graphql query
 * @param query the query to run
 * @param options.host a host, required when running in NodeJS
 * @param options.merge whether to merge graphql queries in one, adds delay to the queries, might be unwanted
 * @param options.mergeMS how many ms of delay to add, default 70
 * @param options.progresser to track progress
 * @returns a promise for a graphql endpoint value
 */
export async function gqlQuery(query: GQLQuery, options?: {
  host?: string;
  merge?: boolean;
  mergeMS?: number;
  progresser?: (arg: IXMLHttpRequestProgressInfo) => void;
}): Promise<IRQEndpointValue> {
  const host = (options && options.host) || "";
  const merge = options && options.merge;

  // if we are in browser context and we have no host
  if (typeof fetch === "undefined" && !host) {
    throw new Error("You must provide a host when using graphql querier outside of the browser, eg: http://mysite.com");
  }

  // check in network
  const queryThatSatifies = QUERIES_IN_NETWORK.find((q) => {
    return query.isContainedWithin(q);
  });

  if (queryThatSatifies) {
    // it has already a known reply
    // there's a grace time where it remains in the network
    // queue for a little window of time
    if (queryThatSatifies.reply) {
      return queryThatSatifies.reply;
    }

    if (options && options.progresser) {
      queryThatSatifies.addProgresserListener(options.progresser);
    }

    return new Promise((resolve) => {
      queryThatSatifies.addEventListenerOnReplyInformed((response) => {
        resolve(response);
      });
    });
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

      if (options && options.progresser) {
        queryThatCanMergeWith.addProgresserListener(options.progresser);
      }

      // and now we are concerned in how to receive the answer
      // from that same query as a reply for this one
      return new Promise((resolve) => {
        // we use the listener as the resolve
        queryThatCanMergeWith.addEventListenerOnReplyInformed((response) => {
          // once we get the response we need to remap
          const newResponse: IRQEndpointValue = {
            data: {},
          };
          remapper.forEach((rs) => {
            const alias = rs[0];
            const origName = rs[1];

            newResponse.data[origName] = response.data && response.data[alias];

            if (response.errors) {
              response.errors.forEach((e) => {
                if (!e.path || e.path[0] === alias) {
                  const newError = { ...e };
                  if (newError.path) {
                    newError.path = [origName];
                  }
                  if (!newResponse.errors) {
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

  QUERIES_IN_NETWORK.push(query);

  // building the form data
  const formData = typeof FormData !== "undefined" ? new FormData() : new FormDataNode();

  // TODO enable the compressed form and phase out graphql slowly
  // for doing that we must disable all custom graphql endpoints, in favour of simple rest
  // that includes token related
  // everything graphql must be gone

  // if (true) {
  // append this stuff to the form data
  formData.append("operations", JSON.stringify(query.getOperations()));
  formData.append("map", JSON.stringify(query.getMap()));
  // } else {
  //   formData.append(this.getType(), JSON.stringify(query.getOperations()));
  // }

  const formDataRq = typeof FormData !== "undefined" ? new FormData() : new FormDataNode();
  const [rqOperations, rqHeaders] = query.getRQOperations();
  formDataRq.append("rq", process.env.NODE_ENV === "development" ? JSON.stringify(rqOperations, null, 2) : JSON.stringify(rqOperations));

  // now let's get all the attachents and append them to the form data
  query.getAttachments().forEach((attachment) => {
    formData.append(attachment.id, attachment.src as File);
    formDataRq.append(attachment.id, attachment.src as File);
  });

  // rq test, it will fail
  await fetch(host + "/rq", {
    method: "POST",
    cache: "no-cache",
    body: formDataRq as any,
  } as any);

  // the fetch we need to use
  const fetchMethod = typeof XMLHttpRequest !== "undefined" ? "xhr" : "fetch";

  if (options && options.progresser) {
    query.addProgresserListener(options.progresser);
  }

  let reply: IRQEndpointValue;
  // now we try
  try {
    if (fetchMethod === "fetch") {
      const value = await fetchNode(host + "/graphql", {
        method: "POST",
        cache: "no-cache",
        body: formData as any,
      } as any);
      reply = await value.json();
    } else {
      reply = await oldXMLHttpRequest(host, formData as any, query);
    }
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

  // small window of time to delete the query in the network
  // to allow delayed requests
  //setTimeout(() => {
  const index = QUERIES_IN_NETWORK.findIndex((q) => q === query);
  if (index !== -1) {
    QUERIES_IN_NETWORK.splice(index, 1);
  }
  // }, 70);

  // return the reply
  return reply;
}
