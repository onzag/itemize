import { PagedSearchLoader, IPagedSearchLoaderArg } from "../../components/search/PagedSearchLoader";
import React from "react";
import { Pagination } from "../mui-core";
import Snackbar from "./snackbar";

interface ISearchLoaderWithPaginationProps {
  pageSize: number;
  children: (arg: IPagedSearchLoaderArg, pagination: React.ReactNode) => React.ReactNode;
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
        return (
          <>
            {props.children(arg, pagination)}
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