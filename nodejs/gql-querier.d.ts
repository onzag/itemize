import { EndpointErrorType } from "./base/errors";
/**
 * Search results as they are provided
 * by the search function, they are based
 * on the SEARCH_RECORD in the graphql types
 * that graphql returns
 */
export interface IGQLSearchRecord {
    type: string;
    id: number;
    version: string;
    created_at: string;
}
export interface IGQLSearchRecordsContainer {
    records: IGQLSearchRecord[];
    last_record_date: string;
    count: number;
    limit: number;
    offset: number;
}
export interface IGQLSearchResultsContainer {
    results: IGQLValue[];
    count: number;
    limit: number;
    offset: number;
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
declare type GQLArg = boolean | string | number | null | GQLRaw | GQLEnum | GQLVar | IGQLFile | IGQLSearchRecord | IGQLArgs;
/**
 * The args field
 */
export interface IGQLArgs {
    [key: string]: GQLArg | GQLArg[];
}
/**
 * A grapqhl single value
 */
declare type GQLValue = boolean | string | number | null | IGQLSearchRecord | IGQLValue;
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
        [key: string]: IGQLValue;
    };
    errors?: Array<{
        extensions: EndpointErrorType;
    }>;
}
/**
 * Graphql helper class in order to build proper form data
 * queries and mutations to the grapqhl api refer to
 * https://github.com/jaydenseric/graphql-multipart-request-spec
 */
export declare class GQLQuery {
    /**
     * All the processed queries from the query list
     */
    private processedQueries;
    /**
     * The type of this query
     */
    private type;
    /**
     * Files that have been found that are unprocessed
     */
    private foundUnprocessedArgFiles;
    /**
     * Build a graphql query
     * @param type query or mutation
     * @param queries the queries that we want to execute
     */
    constructor(type: "query" | "mutation", queries: IGQLQueryObj[]);
    /**
     * Provides the operations part of the formdata field in json form
     * @returns the formdata for the operations
     */
    getOperations(): {
        query: string;
        variables: {};
    };
    /**
     * Provides the map of the variables to files and/or streams that exists in the
     * file form that will map the variables to the form data
     */
    getMap(): {
        [id: string]: [string];
    };
    /**
     * Provides all the attached files
     */
    getAttachments(): IGQLFile[];
    /**
     * Provides all the variables that are in use for the graphql formdata
     * spec that will map to the operations
     */
    private getVariables;
    /**
     * Provides the arguments that will be passed to the main query as in
     * how the main query is expected to recieve those arguments
     */
    private getMainQueryArguments;
    /**
     * Finds files in the graphql query and processes
     * all the files as they are required in order to retrieve
     * their streams and file content
     * @param arg the argument in question
     * @returns new processed args
     */
    private findFilesAndProcessArgs;
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
export declare class GQLRaw {
    value: string;
    __type__: string;
    constructor(value: string);
    toJSON(): {
        __type__: string;
        value: string;
    };
}
/**
 * A graphql enum
 */
export declare class GQLEnum extends GQLRaw {
    __type__: string;
}
/**
 * A grapqhl variable
 */
export declare class GQLVar extends GQLRaw {
    __type__: string;
}
/**
 * Builds a graphql query
 * @param queries the queries to run
 * @returns a grapqhl query class instance
 */
export declare function buildGqlQuery(...queries: IGQLQueryObj[]): GQLQuery;
/**
 * Builds a graphql mutation
 * @param mutations the mutations to run
 * @returns a grapqhl query class instance
 */
export declare function buildGqlMutation(...mutations: IGQLQueryObj[]): GQLQuery;
/**
 * Executes a graphql query
 * @param query the query to run
 * @param host a host, required when running in NodeJS
 * @returns a promise for a graphql endpoint value
 */
export declare function gqlQuery(query: GQLQuery, host?: string): Promise<IGQLEndpointValue>;
export {};
