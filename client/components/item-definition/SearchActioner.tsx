import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import {
  ItemDefinitionContext,
  IActionResponseWithSearchResults,
  IItemDefinitionContextType,
  IActionCleanOptions,
  IActionSearchOptions,
} from "../../providers/item-definition";
import equals from "deep-equal";
import { IGQLSearchMatch } from "../../../gql-querier";

export interface ISearchActionerInfoArgType {
  searchError: EndpointErrorType;
  dismissSearchResults: () => void;
  dismissSearchError: () => void;
  searching: boolean;
  searchResults: IGQLSearchMatch[];
  search: (options?: IActionSearchOptions) => Promise<IActionResponseWithSearchResults>;
  clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
}

interface ISearchActionerProps {
  children: (arg: ISearchActionerInfoArgType) => any;
}

interface IActualSearchActionerProps extends ISearchActionerProps {
  itemDefinitionContext: IItemDefinitionContextType;
}

class ActualSearchActioner extends React.Component<IActualSearchActionerProps, {}> {
  public shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
      nextProps.itemDefinitionContext.searchError !== this.props.itemDefinitionContext.searchError ||
      nextProps.itemDefinitionContext.searching !== this.props.itemDefinitionContext.searching ||
      !equals(nextProps.itemDefinitionContext.searchResults, this.props.itemDefinitionContext.searchResults);
  }
  public render() {
    return this.props.children({
      searchError: this.props.itemDefinitionContext.searchError,
      searching: this.props.itemDefinitionContext.searching,
      searchResults: this.props.itemDefinitionContext.searchResults,
      search: this.props.itemDefinitionContext.search,
      clean: this.props.itemDefinitionContext.clean,
      dismissSearchResults: this.props.itemDefinitionContext.dismissSearchResults,
      dismissSearchError: this.props.itemDefinitionContext.dismissSearchError,
    });
  }
}

export default function SearchActioner(props: ISearchActionerProps) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => (
        <ActualSearchActioner {...props} itemDefinitionContext={itemDefinitionContext}/>
      )
    }</ItemDefinitionContext.Consumer>
  );
}