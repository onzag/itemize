/**
 * Contains the search loader with an already paginated component
 * 
 * @module
 */

import React, { useCallback } from "react";
import Pagination from '@mui/material/Pagination';
import { PaginationItem } from "@mui/material";
import { AltBadgeReactioner } from "./alt-badge-reactioner";
import SearchLoader, { ISearchLoaderArg } from "../../components/search/SearchLoader";
import { IPaginatorInternalObject } from "../../components/search/Pagination";


/**
 * The paginated search loader props
 */
export interface ISearchLoaderWithPaginationProps {
  /**
   * An unique id to track this loader
   */
  id: string;
  /**
   * Whether to clean on dismount for the search results that have been loaded
   */
  cleanOnDismount?: boolean;
  /**
   * whether to use the total paged search loader
   */
  total?: boolean;
  /**
   * A paginator object to handle pagination
   */
  paginator: IPaginatorInternalObject;
  /**
   * Whether to disable the external checks for the item definition
   * results provider props
   */
  enableExternalChecks?: boolean;
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
   * The children that recieves the arguments
   */
  children: (arg: ISearchLoaderArg, pagination: React.ReactNode, noResults: boolean) => React.ReactNode;

  paginationVariant?: "text" | "outlined";

  /**
   * Specifies the query string parameter to use in the query string to keep the page number
   * by default it is p
   */
  queryStringPageLocation?: string;

  /**
   * make accessible with the alt badge reactioner
   */
  accessible?: boolean;
  /**
   * Searching will be set to true until at least
   * a first search is retrieved
   * 
   * mainly used for SSR purposes so that searching always
   * starts at true
   */
  startInSearchingState?: boolean;

  accessiblePriority?: number;
  accessibleUseInFlow?: boolean;
  accessibleStartReactionKey?: string;
  accessiblePageReactionKey?: string;
  accessibleEndReactionKey?: string;
}

function defaultRenderItem(x: any) {
  return (
    <PaginationItem
      {...x}
    />
  )
}

/**
 * Has a search loader section and provides its own pagination component that is to be displayed with
 * already handlers to update the navigation page, it uses the LocationStateReader in order to keep its
 * page so it means that it builds history in it
 * 
 * @param props the search loader props
 */
export function SearchLoaderWithPagination(props: ISearchLoaderWithPaginationProps) {
  const renderItemFn = useCallback((x: any) => {
    if (!props.accessible) {
      return defaultRenderItem(x);
    }
    return (
      <AltBadgeReactioner
        reactionKey={
          x.type === "page" || x.type === "start-ellipsis" || x.type === "end-ellipsis" ? (
            props.accessiblePageReactionKey || "p"
          ) : (
            x.type === "first" || x.type === "previous" ? (
              props.accessibleStartReactionKey || "f"
            ) : (
              props.accessibleEndReactionKey || "l"
            )
          )}
        action="click"
        selector="button"
        priority={props.accessiblePriority}
        disabled={x.disabled}
        useInFlow={props.accessibleUseInFlow}
      >
        {defaultRenderItem(x)}
      </AltBadgeReactioner>
    )
  }, [
    props.accessible,
    props.accessiblePageReactionKey,
    props.accessiblePageReactionKey,
    props.accessibleStartReactionKey,
    props.accessiblePriority,
    props.accessibleEndReactionKey,
    props.accessibleUseInFlow,
  ]);

  return (
    <SearchLoader
      // in the search loader pages are zero indexed
      currentPage={props.paginator.page - 1}
      pageSize={props.paginator.pageSize}
      cleanOnDismount={props.cleanOnDismount}
      static={props.static}
      enableExternalChecks={props.enableExternalChecks}
      startInSearchingState={props.startInSearchingState}
    >
      {(arg) => {
        const handlePageChange = (e: React.ChangeEvent, value: number) => {
          props.paginator.goToPage(value + 1);
        }

        const pageCount = props.total ? arg.pageCountTotal : arg.pageCount;
        const currentPage = props.total ? props.paginator.pageTotal : props.paginator.page;

        const pagination = (
          pageCount === 0 ?
            null :
            <Pagination
              count={pageCount}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
              variant={props.paginationVariant}
              renderItem={renderItemFn}/>
        );

        return (
          props.children(arg, pagination, !!(arg.searchId && pageCount === 0))
        );
      }}
    </SearchLoader>
  )
}
