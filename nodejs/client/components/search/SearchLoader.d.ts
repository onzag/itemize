/**
 * Provides the functionality to load search results that have been obtained via the
 * item definition context and reside in such context but haven't been loaded
 *
 * @packageDocumentation
 */
/// <reference types="react" />
import { IItemDefinitionProviderProps } from "../../providers/item-definition";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import { IGQLSearchRecord } from "../../../gql-querier";
import { EndpointErrorType } from "../../../base/errors";
/**
 * The property for the provider but with the key and no children
 */
interface IItemDefinitionProviderPropsWithKey extends Pick<IItemDefinitionProviderProps, Exclude<keyof IItemDefinitionProviderProps, 'children'>> {
    key: string;
}
/**
 * Basically a normal graphql search record but with information on
 * how to populate it, aka its own item definition and the provider props
 */
interface IGQLSearchRecordWithPopulateData extends IGQLSearchRecord {
    providerProps: IItemDefinitionProviderPropsWithKey;
    itemDefinition: ItemDefinition;
}
/**
 * This is what the search loader recieves as argument
 * in its children prop
 */
export interface ISearchLoaderArg {
    /**
     * The search id is an unique identifier for this
     * search and this search only
     */
    searchId: string;
    /**
     * the search records are records that allow to be requested
     * as well as organized, partial information of a search result
     */
    searchRecords: IGQLSearchRecordWithPopulateData[];
    /**
     * The page count given the number of total pages, despite
     * this not being a pagination based mechanism, still
     * the search results are loaded in chunks or pages; note that
     * the page count is only has to do with the accessible count of matches
     */
    pageCount: number;
    /**
     * The total count, the number of items that matched this search
     * in the server side
     */
    totalCount: number;
    /**
     * The accessible count, the number of records we can actually access
     * and retrieve as search results; this is due to technical limitations
     * and security policies, anyway no person really goes further than page 4
     * better them to refine the search
     */
    accessibleCount: number;
    /**
     * whether there's a next page from the current selected
     */
    hasNextPage: boolean;
    /**
     * Whether there's a previous page from the current selected
     */
    hasPrevPage: boolean;
    /**
     * An error that occured during the get list execution to fetch
     * the search results of a given page
     */
    error: EndpointErrorType;
    /**
     * dismiss the errors
     */
    dismissError: () => void;
    /**
     * refresh the page, while itemize content is fully dynamic, it's still possible, eg.
     * say you got an error, you can ask for a refresh
     */
    refreshPage: () => void;
}
/**
 * The loader props themselves
 */
export interface ISearchLoaderProps {
    /**
     * The page size, be careful on not making the page size too
     * large as this can be forbidden, depends on max search results
     * at once
     */
    pageSize: number;
    /**
     * The current page we are in
     */
    currentPage: number;
    /**
     * The children function which specifies how to retrieve these results
     */
    children: (arg: ISearchLoaderArg) => any;
    /**
     * whether to include the policies in the resulting
     * item definition loader props
     */
    includePolicies?: boolean;
    /**
     * Whether the resulting search results should clean on dismount
     */
    cleanOnDismount?: boolean;
    /**
     * Whether to disable the external checks for the item definition
     * results provider props
     */
    disableExternalChecks?: boolean;
    /**
     * The static state for the children item definition, TOTAL for
     * basically not even asking for feedback (useful when the search was traditional)
     * or NO_LISTENING for just not getting updates but asking for feedback
     */
    static?: "TOTAL" | "NO_LISTENING";
    /**
     * Triggers when the search data changes, as in a new search id
     *
     * Your page might be in page 6 and then the user requests new data
     * which means you should go back to page 0, this allows to do just that
     * by returning a number you can ask for a different page than the one
     * specified by currentPage, remember to update the prop currentPage
     * after this fact, so avoid weirdness
     */
    onSearchDataChange?: (searchId: string, wasRestored: boolean) => number | void;
}
/**
 * The search loader allows to load search results
 * @param props the loader props
 * @returns a react component
 */
export default function SearchLoader(props: ISearchLoaderProps): JSX.Element;
export {};
