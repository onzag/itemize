/**
 * The total paged search loader is capable of loading every single
 * record in a search by respecting limit and offset from the search, the search
 * will pull results in batches and these results will be loaded
 * 
 * this is mainly designed to be used with a traditional search with listeners
 * enabled, it's more akin an average search in a common framework
 * 
 * You are still recommended to pull more records than you can handle in one page
 * for example with a limit of 50 yet paginating 10, that way 50 records are always ready
 * in the search
 *
 * @module
 */

import React from "react";
import SearchLoader from "./SearchLoader";
import LocationStateReader from "../navigation/LocationStateReader";
import { ItemContext } from "../../providers/item";
import type { IPagedSearchLoaderArg } from "./PagedSearchLoader";

/**
 * The props a paged loader takes are rather simple
 */
interface ITotalPagedSearchLoaderProps {
  /**
   * Does not use query string to store a global state but rather
   * a local state
   */
  localState?: boolean;
  /**
   * The page size
   */
  pageSize: number;
  /**
   * Whether to clean the search results on dismount
   */
  cleanOnDismount?: boolean;
  /**
   * And a children that will use the arg for conditional rendering of the pagination element
   */
  children: (arg: IPagedSearchLoaderArg) => React.ReactNode;
  /**
   * Called when out of bounds
   */
  onOutOfBounds: (newLimit: number, newOffset: number) => void;
  /**
   * Whether to disable the external checks for the item definition
   * results provider props
   */
  disableExternalChecks?: boolean;
  /**
   * Prevents the loading of the search results use this
   * if you have no data to load and just want the records
   * off a search
   */
  avoidLoadingSearchResults?: boolean;
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
}

interface ITotalPagedSearchLoaderState {
  p: string;
  r: string;
}

interface IActualTotalPagedSearchLoaderProps extends ITotalPagedSearchLoaderProps {
  limit: number;
  offset: number;
  count: number;
  state: ITotalPagedSearchLoaderState;
  setState: (s: Partial<ITotalPagedSearchLoaderState>) => void;
}

/**
 * The page search loader component allows for creating pagination UI elements rather
 * simply, it extends the standard search loader for this, it uses the navigation in order
 * to store its page number so that searches are kept consistent
 */
class ActualTotalPagedSearchLoader extends React.PureComponent<IActualTotalPagedSearchLoaderProps> {
  private isOutOfBounds: boolean = false;
  constructor(props: IActualTotalPagedSearchLoaderProps) {
    super(props);

    this.goToNextPage = this.goToNextPage.bind(this);
    this.goToPrevPage = this.goToPrevPage.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.onSearchDataChange = this.onSearchDataChange.bind(this);
  }
  public goToNextPage(currentPage: number, hasNextPage: boolean, hasNextTotal: boolean) {
    if (hasNextPage || hasNextTotal) {
      if (!hasNextPage && this.props.limit !== null) {
        this.isOutOfBounds = true;
        this.props.onOutOfBounds(this.props.limit + this.props.offset, this.props.offset);
      }

      // current page is 0 indexed whereas the qs parameter is 1 indexed for user understanding
      this.props.setState({
        p: (currentPage + 2).toString(),
        r: "t",
      });
    }
  }
  public goToPrevPage(currentPage: number, hasPrevPage: boolean, hasPrevTotal: boolean) {
    if (hasPrevPage || hasPrevTotal) {
      if (!hasPrevPage && this.props.limit !== null) {
        this.isOutOfBounds = true;
        this.props.onOutOfBounds(this.props.limit - this.props.offset, this.props.offset);
      }

      // current page is 0 indexed whereas the qs parameter is 1 indexed for user understanding
      this.props.setState({
        p: currentPage.toString(),
        r: "t",
      });
    }
  }
  public goToPage(page: number) {
    if (this.props.limit !== null) {
      let actualAccessiblePageIndex = page;
      const pagesBeforeThis = (this.props.offset || 0) / this.props.pageSize;
      actualAccessiblePageIndex -= pagesBeforeThis;

      const chunkSizeInPages = this.props.limit / this.props.pageSize;

      // out of bounds
      if (actualAccessiblePageIndex < 0 || actualAccessiblePageIndex > (chunkSizeInPages - 1)) {
        // let's calculate which batch it it supposed to be at
        const expectedOffset = Math.floor((page * this.props.pageSize) / this.props.limit) * this.props.limit;

        // out of bounds from the total
        if (expectedOffset < 0 || expectedOffset > this.props.count) {
          return;
        } else {
          this.isOutOfBounds = true;
          this.props.onOutOfBounds(this.props.limit, expectedOffset);
        }
      }
    }

    // page is a 0 indexed number, and we expect that so in order to set the right state
    this.props.setState({
      p: (page + 1).toString(),
      r: "t",
    });
  }
  public onSearchDataChange(actualP: number, searchId: string, wasRestored: boolean) {
    // previous was out of bounds and the data changes to reflect
    // new state
    if (this.isOutOfBounds) {
      this.isOutOfBounds = false;
      // keep it wherever it is now
      return null;
    }
    if (!wasRestored) {
      if (actualP !== 0) {
        // this is rFlagged
        this.props.setState({
          p: "1",
          r: "t",
        });
      }
      // load the first page, always despite what current page might be
      return 0;
    }

    // load whatever if it was a restoration event
    return null;
  }
  public componentDidUpdate(prevProps: Readonly<IActualTotalPagedSearchLoaderProps>): void {
    // when going back or moving around sometimes we get out of bounds
    if (!this.isOutOfBounds && this.props.limit !== null) {
      let actualP = parseInt(this.props.state.p, 10) || 1;
      actualP--;
      const currentPage = actualP;
      const pagesBeforeThis = this.props.offset / this.props.pageSize;
      const chunkSizeInPages = this.props.limit / this.props.pageSize;
      actualP -= pagesBeforeThis;
      const isOutOfBounds = (actualP < 0 || actualP > (chunkSizeInPages - 1));
      if (isOutOfBounds) {
        const expectedOffset = Math.floor((currentPage * this.props.pageSize) / this.props.limit) * this.props.limit;
        this.isOutOfBounds = true;
        this.props.onOutOfBounds(this.props.limit, expectedOffset);
      }
    }
  }
  public render() {
    let actualP = parseInt(this.props.state.p, 10) || 1;
    actualP--;

    const currentPage = actualP;

    const chunkSizeInPages = (this.props.limit || 0) / this.props.pageSize;

    if (!Number.isInteger(chunkSizeInPages)) {
      throw new Error(
        "Cannot process, the limit is set to " +
        this.props.limit +
        " but the page size is " +
        this.props.pageSize +
        " this results in an uneven number of pages"
      );
    }

    if (this.props.offset) {
      const totalChunks = (this.props.limit || 0) / (this.props.offset / 0);

      if (!Number.isInteger(totalChunks)) {
        throw new Error(
          "Cannot process, the limit is set to " +
          this.props.limit +
          " but the offset is " +
          this.props.offset +
          " this results in an uneven number of chunks"
        );
      }
    }

    const pagesBeforeThis = (this.props.offset || 0) / this.props.pageSize;

    if (!Number.isInteger(pagesBeforeThis)) {
      throw new Error(
        "Cannot process, the offset is set to " +
        this.props.offset +
        " but the page size is " +
        this.props.pageSize +
        " this results in an uneven number of pages"
      );
    }

    actualP -= pagesBeforeThis;

    const totalPages = Math.ceil((this.props.count || 0) / this.props.pageSize);
    const hasPrevPageTotal = currentPage > 0;
    const hasNextPageTotal = currentPage < (totalPages - 1);

    return (
      <SearchLoader
        pageSize={this.props.pageSize}
        currentPage={actualP}
        cleanOnDismount={this.props.cleanOnDismount}
        onSearchDataChange={this.onSearchDataChange.bind(null, actualP)}
        static={this.props.static}
        disableExternalChecks={this.props.disableExternalChecks}
      >
        {(arg) => {
          return this.props.children({
            ...arg,
            hasPrevPage: hasPrevPageTotal,
            hasNextPage: hasNextPageTotal,
            pageCount: totalPages,
            currentPage,
            goToNextPage: this.goToNextPage.bind(this, actualP, arg.hasNextPage, hasNextPageTotal),
            goToPrevPage: this.goToPrevPage.bind(this, actualP, arg.hasPrevPage, hasPrevPageTotal),
            goToPage: this.goToPage,
          });
        }}
      </SearchLoader>
    );
  }
}

/**
 * The page search loader component allows for creating pagination UI elements rather
 * simply, it extends the standard search loader for this, it uses the navigation in order
 * to store its page number so that searches are kept consistent
 */
export class TotalPagedSearchLoader extends React.PureComponent<ITotalPagedSearchLoaderProps, ITotalPagedSearchLoaderState> {
  constructor(props: ITotalPagedSearchLoaderProps) {
    super(props);
    this.state = {
      p: "1",
      r: "t",
    }
  }
  public renderPagedLoader(limit: number, offset: number, count: number, state: ITotalPagedSearchLoaderState, setState: (qs: Partial<ITotalPagedSearchLoaderState>) => void) {
    return (
      <ActualTotalPagedSearchLoader
        {...this.props}
        limit={limit}
        offset={offset}
        count={count}
        state={state}
        setState={setState}
      />
    );
  }
  public render() {
    return (
      <ItemContext.Consumer>{
        (itemContext) => {
          if (this.props.localState) {
            return this.renderPagedLoader(
              itemContext.searchLimit,
              itemContext.searchOffset,
              itemContext.searchCount,
              this.state,
              this.setState as any,
            );
          }
          return (
            <LocationStateReader defaultState={{ p: "1", r: "f" }} stateIsInQueryString={true}>
              {(state, setState) => {
                return this.renderPagedLoader(
                  itemContext.searchLimit,
                  itemContext.searchOffset,
                  itemContext.searchCount,
                  state,
                  setState,
                );
              }}
            </LocationStateReader>
          );
        }
      }</ItemContext.Consumer>
    );
  }
}
