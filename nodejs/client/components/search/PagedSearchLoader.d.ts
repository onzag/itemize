import React from "react";
import { ISearchLoaderArg } from "./SearchLoader";
interface IPagedSearchLoaderArg extends ISearchLoaderArg {
    currentPage: number;
    goToNextPage: () => void;
    goToPrevPage: () => void;
    goToPage: (n: number) => void;
}
interface IPagedSearchLoaderProps {
    pageSize: number;
    children: (arg: IPagedSearchLoaderArg) => any;
}
interface IPagedSearchLoaderState {
    currentPage: number;
}
export declare class PagedSearchLoader extends React.Component<IPagedSearchLoaderProps, IPagedSearchLoaderState> {
    constructor(props: IPagedSearchLoaderProps);
    goToNextPage(hasNextPage: boolean): void;
    goToPrevPage(hasPrevPage: boolean): void;
    goToPage(n: number): void;
    shouldComponentUpdate(nextProps: IPagedSearchLoaderProps, nextState: IPagedSearchLoaderState): boolean;
    render(): JSX.Element;
}
export {};
