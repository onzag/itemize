/**
 * Contains the search loader with an already paginated component
 * 
 * @module
 */

import { PagedSearchLoader, IPagedSearchLoaderArg } from "../../components/search/PagedSearchLoader";
import { TotalPagedSearchLoader } from "../../components/search/TotalPagedSearchLoader";
import React from "react";
import Snackbar from "./snackbar";
import Pagination from '@mui/material/Pagination';


/**
 * The paginated search loader props
 */
interface ISearchLoaderWithPaginationProps {
  /**
   * Whether to use a local state
   */
  localState?: boolean;
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
   * whether to use the total paged search loader
   */
  total?: boolean;
  /**
   * Whether to disable the external checks for the item definition
   * results provider props
   */
  disableExternalChecks?: boolean;
  /**
   * The static state for the children item definition, TOTAL for
   * basically not even asking for feedback (useful when the search was traditional)
   * or NO_LISTENING for just not getting updates but asking for feedback
   * 
   * by default searches do not listen and use total as they act like static
   * results
   * 
   * Note that if the search was done using a listen policy the item will update anyway
   * this is why total is the better option
   */
  static?: "TOTAL" | "NO_LISTENING";
  /**
   * When the total has gone out of bounds
   */
  onTotalOutOfBounds?: (newLimit: number, newOffset: number) => void;
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
 * @param props the search loader props
 */
export function SearchLoaderWithPagination(props: ISearchLoaderWithPaginationProps) {
  if (props.total && !props.onTotalOutOfBounds) {
    throw new Error("The search loader uses total but has no callback for when it is out of bounds in onTotalOutOfBounds is missing");
  }
  const ElementToUse = props.total ? TotalPagedSearchLoader : PagedSearchLoader;
  return (
    <ElementToUse
      pageSize={props.pageSize}
      cleanOnDismount={props.cleanOnDismount}
      localState={props.localState}
      onOutOfBounds={props.onTotalOutOfBounds}
      static={props.static}
      disableExternalChecks={props.disableExternalChecks}
    >
      {(arg) => {
        const handlePageChange = (e: React.ChangeEvent, value: number) => {
          arg.goToPage(value - 1);
        }
        const pagination = (
          arg.pageCount === 0 ?
            null :
            <Pagination count={arg.pageCount} color="primary" page={arg.currentPage + 1} onChange={handlePageChange} />
        );

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
    </ElementToUse>
  )
}
