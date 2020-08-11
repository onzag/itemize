/**
 * Contains the classes for the loading of searches via pages in order to create
 * a pagination in search mode
 *
 * @packageDocumentation
 */
import React from "react";
import { ISearchLoaderArg } from "./SearchLoader";
/**
 * The paged search loader argument contains info that is rather similar
 * to the generic loader, but simpler
 */
export interface IPagedSearchLoaderArg extends ISearchLoaderArg {
    /**
     * Such as the current page which is the same, note that it's 0 indexed
     */
    currentPage: number;
    /**
     * A function to go to previous page
     */
    goToNextPage: () => void;
    /**
     * A function to go to next
     */
    goToPrevPage: () => void;
    /**
     * And another to go to a specific page number
     */
    goToPage: (n: number) => void;
}
/**
 * The props a paged loader takes are rather simple
 */
interface IPagedSearchLoaderProps {
    /**
     * The page size
     */
    pageSize: number;
    /**
     * And a children that will use the arg for conditional rendering of the pagination element
     */
    children: (arg: IPagedSearchLoaderArg) => React.ReactNode;
}
/**
 * The page search loader component allows for creating pagination UI elements rather
 * simply, it extends the standard search loader for this, it uses the navigation in order
 * to store its page number so that searches are kept consistent
 */
export declare class PagedSearchLoader extends React.Component<IPagedSearchLoaderProps> {
    constructor(props: IPagedSearchLoaderProps);
    goToNextPage(currentPage: number, hasNextPage: boolean, setState: (qs: {
        p: string;
        r: string;
    }) => void): void;
    goToPrevPage(currentPage: number, hasPrevPage: boolean, setState: (qs: {
        p: string;
        r: string;
    }) => void): void;
    goToPage(setState: (qs: {
        p: string;
        r: string;
    }) => void, page: number): void;
    shouldComponentUpdate(nextProps: IPagedSearchLoaderProps): boolean;
    onSearchDataChange(actualP: number, setState: (qs: {
        p: string;
        r: string;
    }) => void, searchId: string, wasRestored: boolean): number;
    render(): JSX.Element;
}
export {};
