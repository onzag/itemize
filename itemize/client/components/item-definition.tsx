import React from "react";
import { GraphQLEndpointErrorType } from "../../base/errors";
import {
  ItemDefinitionContext,
  IBasicActionResponse,
  IActionResponseWithId,
  IActionResponseWithSearchResults,
  IItemDefinitionContextType,
  ISearchResult,
  IActionSubmitOptions,
  IActionSearchOptions,
} from "../providers/item-definition";
import equals from "deep-equal";

export interface IItemDefinitionLoaderInfoArgType {
  loading: boolean;
  notFound: boolean;
  blocked: boolean;
  hasBlockedAccess: boolean;
  error: GraphQLEndpointErrorType;
  reload: () => Promise<IBasicActionResponse>;
}

interface IItemDefinitionLoader {
  children: (arg: IItemDefinitionLoaderInfoArgType) => any;
}

interface IActualItemDefinitionLoader extends IItemDefinitionLoader {
  itemDefinitionContext: IItemDefinitionContextType;
}

class ActualItemDefinitionLoader extends React.Component<IActualItemDefinitionLoader, {}> {
  public shouldComponentUpdate(nextProps: IActualItemDefinitionLoader) {
    return nextProps.itemDefinitionContext.loadError !== this.props.itemDefinitionContext.loadError ||
      nextProps.children !== this.props.children ||
      nextProps.itemDefinitionContext.blocked !== this.props.itemDefinitionContext.blocked ||
      nextProps.itemDefinitionContext.blockedButDataAccessible !==
        this.props.itemDefinitionContext.blockedButDataAccessible ||
      nextProps.itemDefinitionContext.notFound !== this.props.itemDefinitionContext.notFound ||
      nextProps.itemDefinitionContext.loading !== this.props.itemDefinitionContext.loading;
  }
  public render() {
    return this.props.children(
      {
        loading: this.props.itemDefinitionContext.loading,
        notFound: this.props.itemDefinitionContext.notFound,
        blocked: this.props.itemDefinitionContext.blocked,
        hasBlockedAccess: this.props.itemDefinitionContext.blockedButDataAccessible,
        error: this.props.itemDefinitionContext.loadError,
        reload: this.props.itemDefinitionContext.reload,
      },
    );
  }
}
/**
 * This safe element assumes success and will render success unless proven
 * otherwise, there's no loading, it will use whatever it has stored meanwhile
 */
export function ItemDefinitionLoader(props: IItemDefinitionLoader) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => (
        <ActualItemDefinitionLoader {...props} itemDefinitionContext={itemDefinitionContext}/>
      )
    }</ItemDefinitionContext.Consumer>
  );
}

export interface ISubmitActionerInfoArgType {
  submitError: GraphQLEndpointErrorType;
  dismissError: () => void;
  dismissSubmitted: () => void;
  submitting: boolean;
  submitted: boolean;
  submit: (options?: IActionSubmitOptions) => Promise<IActionResponseWithId>;
}

interface ISubmitActionerProps {
  children: (arg: ISubmitActionerInfoArgType) => any;
}

interface IActualSubmitActionerProps extends ISubmitActionerProps {
  itemDefinitionContext: IItemDefinitionContextType;
}

class ActualSubmitActioner extends React.Component<IActualSubmitActionerProps, {}> {
  public shouldComponentUpdate(nextProps) {
    return nextProps.children !== this.props.children ||
      nextProps.itemDefinitionContext.submitError !== this.props.itemDefinitionContext.submitError ||
      nextProps.itemDefinitionContext.submitting !== this.props.itemDefinitionContext.submitting ||
      nextProps.itemDefinitionContext.submitted !== this.props.itemDefinitionContext.submitted;
  }
  public render() {
    return this.props.children({
      submitError: this.props.itemDefinitionContext.submitError,
      submitting: this.props.itemDefinitionContext.submitting,
      submitted: this.props.itemDefinitionContext.submitted,
      submit: this.props.itemDefinitionContext.submit,
      dismissError: this.props.itemDefinitionContext.dismissSubmitError,
      dismissSubmitted: this.props.itemDefinitionContext.dismissSubmitted,
    });
  }
}

export function SubmitActioner(props: ISubmitActionerProps) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => (
        <ActualSubmitActioner {...props} itemDefinitionContext={itemDefinitionContext}/>
      )
    }</ItemDefinitionContext.Consumer>
  );
}

export interface ISearchActionerInfoArgType {
  searchError: GraphQLEndpointErrorType;
  dismissSearchResults: () => void;
  dismissSearchError: () => void;
  searching: boolean;
  searchResults: ISearchResult[];
  search: (options?: IActionSearchOptions) => Promise<IActionResponseWithSearchResults>;
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
      dismissSearchResults: this.props.itemDefinitionContext.dismissSearchResults,
      dismissSearchError: this.props.itemDefinitionContext.dismissSearchError,
    });
  }
}

export function SearchActioner(props: ISearchActionerProps) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => (
        <ActualSearchActioner {...props} itemDefinitionContext={itemDefinitionContext}/>
      )
    }</ItemDefinitionContext.Consumer>
  );
}
