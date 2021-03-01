/**
 * Contains the search loader with an already paginated component
 * 
 * @module
 */

import { PagedSearchLoader, IPagedSearchLoaderArg } from "../../components/search/PagedSearchLoader";
import React from "react";
import { Pagination } from "../mui-core";
import Snackbar from "./snackbar";


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
   * Whether to clean on dismount for the search results that have been loaded
   */
  cleanOnDismount?: boolean;
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
export function SearchLoaderWithPagination(props: ISearchLoaderWithPaginationProps) {
  return (
    <PagedSearchLoader pageSize={props.pageSize} cleanOnDismount={props.cleanOnDismount}>
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
              id={props.id}
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
