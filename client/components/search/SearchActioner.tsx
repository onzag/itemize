/**
 * This file contains the search actioner which is capable of triggering searches
 * in the item definition context
 *
 * @packageDocumentation
 */

import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import {
  ItemContext,
  IActionResponseWithSearchResults,
  IItemContextType,
  IActionCleanOptions,
  IActionSearchOptions,
} from "../../providers/item";
import equals from "deep-equal";
import { IGQLSearchRecord } from "../../../gql-querier";

/**
 * This is what the search actioner callback receives as argument
 * in order to execute
 */
export interface ISearchActionerInfoArgType {
  /**
   * An error that occured during the last search (whole context)
   */
  searchError: EndpointErrorType;
  /**
   * Dissmiss the search results
   */
  dismissSearchResults: () => void;
  /**
   * Dismiss the search error
   */
  dismissSearchError: () => void;
  /**
   * Currently searching (this is true for the whole context)
   */
  searching: boolean;
  /**
   * Search records (whole context)
   */
  searchRecords: IGQLSearchRecord[];
  /**
   * search frunction from the context
   */
  search: (options?: IActionSearchOptions) => Promise<IActionResponseWithSearchResults>;
  /**
   * clean function from the context
   */
  clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
}

/**
 * The search actioner props just takes a children
 */
interface ISearchActionerProps {
  children: (arg: ISearchActionerInfoArgType) => React.ReactNode;
}

/**
 * the actual needs a bit more information about the context its in
 */
interface IActualSearchActionerProps extends ISearchActionerProps {
  itemContext: IItemContextType;
}

/**
 * The actual class that does the search heavy lifting
 */
class ActualSearchActioner extends React.Component<IActualSearchActionerProps, {}> {
  public shouldComponentUpdate(nextProps: IActualSearchActionerProps) {
    // so we only update if we have different, searchError, searching status, or our searchRecords are
    // inherently different
    return nextProps.children !== this.props.children ||
      nextProps.itemContext.searchError !== this.props.itemContext.searchError ||
      nextProps.itemContext.searching !== this.props.itemContext.searching ||
      !equals(nextProps.itemContext.searchRecords, this.props.itemContext.searchRecords);
  }
  public render() {
    // and we pass it as the actioner
    return this.props.children({
      searchError: this.props.itemContext.searchError,
      searching: this.props.itemContext.searching,
      searchRecords: this.props.itemContext.searchRecords,
      search: this.props.itemContext.search,
      clean: this.props.itemContext.clean,
      dismissSearchResults: this.props.itemContext.dismissSearchResults,
      dismissSearchError: this.props.itemContext.dismissSearchError,
    });
  }
}

/**
 * The search actioner allows to run contextual searches in the current item definition
 * please ensure that such context is in search mode as failure to do so will result
 * in an error once a search is attempted
 * @param props the props
 * @returns a react element
 */
export default function SearchActioner(props: ISearchActionerProps) {
  return (
    <ItemContext.Consumer>{
      (itemContext) => (
        <ActualSearchActioner {...props} itemContext={itemContext}/>
      )
    }</ItemContext.Consumer>
  );
}