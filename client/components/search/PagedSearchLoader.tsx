/**
 * Contains the classes for the loading of searches via pages in order to create
 * a pagination in search mode
 *
 * @module
 */

import React from "react";
import SearchLoader, { ISearchLoaderArg } from "./SearchLoader";
import LocationStateReader from "../navigation/LocationStateReader";

/**
 * The paged search loader argument contains info that is rather similar
 * to the generic loader, but simpler
 */
export interface IPagedSearchLoaderArg extends ISearchLoaderArg {
  /**
   * Such as the current page which is the same, note that it's 0 indexed
   */
  currentPage: number;
  /**
   * A function to go to previous page
   */
  goToNextPage: () => void;
  /**
   * A function to go to next
   */
  goToPrevPage: () => void;
  /**
   * And another to go to a specific page number
   */
  goToPage: (n: number) => void;
}

/**
 * The props a paged loader takes are rather simple
 */
interface IPagedSearchLoaderProps {
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
   * The location of the page identifier in the querystring
   * by default it is p
   */
  queryStringPageLocation?: string;
}

interface IPagedSearchLoaderState {
  [pLoc: string]: string;
  r: string;
}

/**
 * The page search loader component allows for creating pagination UI elements rather
 * simply, it extends the standard search loader for this, it uses the navigation in order
 * to store its page number so that searches are kept consistent
 */
export class PagedSearchLoader extends React.Component<IPagedSearchLoaderProps, IPagedSearchLoaderState> {
  constructor(props: IPagedSearchLoaderProps) {
    super(props);

    this.goToNextPage = this.goToNextPage.bind(this);
    this.goToPrevPage = this.goToPrevPage.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.onSearchDataChange = this.onSearchDataChange.bind(this);

    this.state = {
      p: "1",
      r: "t",
    }
  }
  public goToNextPage(currentPage: number, hasNextPage: boolean, setState: (qs: { [pLoc: string]: string, r: string }) => void, pLoc: string) {
    if (hasNextPage) {
      // current page is 0 indexed whereas the qs parameter is 1 indexed for user understanding
      setState({
        [pLoc]: (currentPage + 2).toString(),
        r: "t",
      });
    }
  }
  public goToPrevPage(currentPage: number, hasPrevPage: boolean, setState: (qs: { [pLoc: string]: string, r: string }) => void, pLoc: string) {
    if (hasPrevPage) {
      // current page is 0 indexed whereas the qs parameter is 1 indexed for user understanding
      setState({
        [pLoc]: currentPage.toString(),
        r: "t",
      });
    }
  }
  public goToPage(setState: (qs: { [pLoc: string]: string, r: string }) => void, pLoc: string, page: number) {
    setState({
      [pLoc]: (page + 1).toString(),
      r: "t",
    });
  }
  public shouldComponentUpdate(nextProps: IPagedSearchLoaderProps) {
    return nextProps.pageSize !== this.props.pageSize ||
      nextProps.children !== this.props.children;
  }
  public onSearchDataChange(actualP: number, setState: (qs: { [pLoc: string]: string, r: string }) => void, pLoc: string, searchId: string, wasRestored: boolean) {
    if (!wasRestored) {
      if (actualP !== 0) {
        // this is rFlagged
        setState({
          [pLoc]: "1",
          r: "t",
        });
      }
      // load the first page, always despite what current page might be
      return 0;
    }

    // load whatever if it was a restoration event
    return null;
  }
  public renderPagedLoader(state: IPagedSearchLoaderState, setState: (qs: { [pLoc: string]: string, r: string }) => void, pLoc: string) {
    let actualP = parseInt(state[pLoc], 10) || 1;
    actualP--;
    return (
      <SearchLoader
        pageSize={this.props.pageSize}
        currentPage={actualP}
        cleanOnDismount={this.props.cleanOnDismount}
        onSearchDataChange={this.onSearchDataChange.bind(null, actualP, setState, pLoc)}
        static={this.props.static}
        enableExternalChecks={this.props.enableExternalChecks}
      >
        {(arg) => {
          return this.props.children({
            ...arg,
            currentPage: actualP,
            goToNextPage: this.goToNextPage.bind(this, actualP, arg.hasNextPage, setState, pLoc),
            goToPrevPage: this.goToPrevPage.bind(this, actualP, arg.hasPrevPage, setState, pLoc),
            goToPage: this.goToPage.bind(this, setState, pLoc),
          });
        }}
      </SearchLoader>
    );
  }
  public render() {
    if (this.props.localState) {
      return this.renderPagedLoader(this.state, this.setState.bind(this), "p");
    }
    return (
      <LocationStateReader defaultState={{ [this.props.queryStringPageLocation || "p"]: "1", r: "f" }} stateIsInQueryString={true}>
        {(state, setState) => {
          return this.renderPagedLoader(state, setState, this.props.queryStringPageLocation || "p");
        }}
      </LocationStateReader>
    );
  }
}
