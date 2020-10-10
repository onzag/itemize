/**
 * This file contains the search actioner which is capable of triggering searches
 * in the item definition context
 *
 * @packageDocumentation
 */
import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import { IActionResponseWithSearchResults, IActionCleanOptions, IActionSearchOptions } from "../../providers/item";
import { IGQLSearchRecord } from "../../../gql-querier";
/**
 * This is what the search actioner callback receives as argument
 * in order to execute
 */
export interface ISearchActionerInfoArgType {
    /**
     * An error that occured during the last search (whole context)
     */
    searchError: EndpointErrorType;
    /**
     * Dissmiss the search results
     */
    dismissSearchResults: () => void;
    /**
     * Dismiss the search error
     */
    dismissSearchError: () => void;
    /**
     * Currently searching (this is true for the whole context)
     */
    searching: boolean;
    /**
     * Search records (whole context)
     */
    searchRecords: IGQLSearchRecord[];
    /**
     * search frunction from the context
     */
    search: (options?: IActionSearchOptions) => Promise<IActionResponseWithSearchResults>;
    /**
     * clean function from the context
     */
    clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
}
/**
 * The search actioner props just takes a children
 */
interface ISearchActionerProps {
    children: (arg: ISearchActionerInfoArgType) => React.ReactNode;
}
/**
 * The search actioner allows to run contextual searches in the current item definition
 * please ensure that such context is in search mode as failure to do so will result
 * in an error once a search is attempted
 * @param props the props
 * @returns a react element
 */
export default function SearchActioner(props: ISearchActionerProps): JSX.Element;
export {};
