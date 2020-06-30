import React from "react";
import { ISearchLoaderArg } from "./SearchLoader";
export interface IPagedSearchLoaderArg extends ISearchLoaderArg {
    currentPage: number;
    goToNextPage: () => void;
    goToPrevPage: () => void;
    goToPage: (n: number) => void;
}
interface IPagedSearchLoaderProps {
    pageSize: number;
    children: (arg: IPagedSearchLoaderArg) => any;
}
export declare class PagedSearchLoader extends React.Component<IPagedSearchLoaderProps> {
    constructor(props: IPagedSearchLoaderProps);
    goToNextPage(currentPage: number, hasNextPage: boolean, setState: (qs: {
        p: any;
    }) => void): void;
    goToPrevPage(currentPage: number, hasPrevPage: boolean, setState: (qs: {
        p: any;
    }) => void): void;
    goToPage(setState: (qs: {
        p: any;
    }) => void, page: number): void;
    shouldComponentUpdate(nextProps: IPagedSearchLoaderProps): boolean;
    onSearchDataChange(setState: (qs: {
        p: any;
    }) => void): number;
    render(): JSX.Element;
}
export {};
