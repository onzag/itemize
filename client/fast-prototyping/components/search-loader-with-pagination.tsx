import { PagedSearchLoader, IPagedSearchLoaderArg } from "../../components/search/PagedSearchLoader";
import React from "react";
import { Pagination } from "../mui-core";
import Snackbar from "./snackbar";

interface ISearchLoaderWithPaginationProps {
  pageSize: number;
  children: (arg: IPagedSearchLoaderArg, pagination: React.ReactNode, noResults: boolean) => React.ReactNode;
}

export function SearchLoaderWithPagination(props: ISearchLoaderWithPaginationProps) {
  return (
    <PagedSearchLoader pageSize={props.pageSize}>
      {(arg) => {
        const handlePageChange = (e: React.ChangeEvent, value: number) => {
          arg.goToPage(value - 1);
        }
        const pagination = (
          arg.pageCount === 0 ?
          null :
          <Pagination count={arg.pageCount} color="primary" page={arg.currentPage + 1} onChange={handlePageChange}/>
        );
        // TODO add the search results to say when there's an acutal search and say when there are no results
        return (
          <>
            {props.children(arg, pagination, !!(arg.searchId && arg.pageCount === 0))}
            <Snackbar
              i18nDisplay={arg.error}
              open={!!arg.error}
              onClose={arg.dismissError}
              severity="error"
            />
          </>
        );
      }}
    </PagedSearchLoader>
  )
}