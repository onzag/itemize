/**
 * Contains the search loader with an already paginated component
 * 
 * @module
 */

import { PagedSearchLoader, IPagedSearchLoaderArg } from "../../components/search/PagedSearchLoader";
import { TotalPagedSearchLoader } from "../../components/search/TotalPagedSearchLoader";
import React, { useCallback } from "react";
import Pagination from '@mui/material/Pagination';
import { PaginationItem } from "@mui/material";
import { AltBadgeReactioner } from "./alt-badge-reactioner";


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
   * When the total has gone out of bounds
   */
  onTotalOutOfBounds?: (newLimit: number, newOffset: number) => void;
  /**
   * The children that recieves the arguments
   */
  children: (arg: IPagedSearchLoaderArg, pagination: React.ReactNode, noResults: boolean) => React.ReactNode;

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
  if (props.total && !props.onTotalOutOfBounds) {
    throw new Error("The search loader uses total but has no callback for when it is out of bounds in onTotalOutOfBounds is missing");
  }
  const ElementToUse = props.total ? TotalPagedSearchLoader : PagedSearchLoader;

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
    <ElementToUse
      pageSize={props.pageSize}
      cleanOnDismount={props.cleanOnDismount}
      localState={props.localState}
      onOutOfBounds={props.onTotalOutOfBounds}
      static={props.static}
      enableExternalChecks={props.enableExternalChecks}
      queryStringPageLocation={props.queryStringPageLocation}
      startInSearchingState={props.startInSearchingState}
    >
      {(arg) => {
        const handlePageChange = (e: React.ChangeEvent, value: number) => {
          arg.goToPage(value - 1);
        }
        const pagination = (
          arg.pageCount === 0 ?
            null :
            <Pagination
              count={arg.pageCount}
              color="primary"
              page={arg.currentPage + 1}
              onChange={handlePageChange}
              variant={props.paginationVariant}
              renderItem={renderItemFn}/>
        );

        return (
          props.children(arg, pagination, !!(arg.searchId && arg.pageCount === 0))
        );
      }}
    </ElementToUse>
  )
}
