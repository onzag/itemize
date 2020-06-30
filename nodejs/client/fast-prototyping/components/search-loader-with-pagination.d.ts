import { IPagedSearchLoaderArg } from "../../components/search/PagedSearchLoader";
import React from "react";
interface ISearchLoaderWithPaginationProps {
    pageSize: number;
    children: (arg: IPagedSearchLoaderArg, pagination: React.ReactNode) => React.ReactNode;
}
export declare function SearchLoaderWithPagination(props: ISearchLoaderWithPaginationProps): JSX.Element;
export {};
