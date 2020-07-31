/**
 * Contains the search loader with an already paginated component
 *
 * @packageDocumentation
 */
import { IPagedSearchLoaderArg } from "../../components/search/PagedSearchLoader";
import React from "react";
/**
 * The paginated search loader props
 */
interface ISearchLoaderWithPaginationProps {
    /**
     * An unique id to track this loader
     */
    id: string;
    /**
     * The page size utilized in the search loader
     */
    pageSize: number;
    /**
     * The children that recieves the arguments
     */
    children: (arg: IPagedSearchLoaderArg, pagination: React.ReactNode, noResults: boolean) => React.ReactNode;
}
/**
 * Has a search loader section and provides its own pagination component that is to be displayed with
 * already handlers to update the navigation page, it uses the LocationStateReader in order to keep its
 * page so it means that it builds history in it
 *
 * TODO support searchId to keep navigation in sync
 *
 * @param props the search loader props
 */
export declare function SearchLoaderWithPagination(props: ISearchLoaderWithPaginationProps): JSX.Element;
export {};
