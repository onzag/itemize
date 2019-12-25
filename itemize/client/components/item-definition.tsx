import React from "react";
import { GraphQLEndpointErrorType } from "../../base/errors";
import { ItemDefinitionContext, IBasicActionResponse, IActionResponseWithId, IActionResponseWithManyIds } from "../providers/item-definition";

interface IItemDefinitionLoader {
  errorComponent?: React.ComponentType<{error: GraphQLEndpointErrorType, reload: () => Promise<IBasicActionResponse>}>;
  notFoundComponent?: React.ComponentType<any>;
  blockedComponent?: React.ComponentType<{hasBlockedAccess: boolean}>;
  children: any;
}

// TODO optimize
/**
 * This safe element assumes success and will render success unless proven
 * otherwise, there's no loading, it will use whatever it has stored meanwhile
 */
export function ItemDefinitionLoader(props: IItemDefinitionLoader) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => {
        if (
          itemDefinitionContext.loadError
        ) {
          const ErrorComponent = props.errorComponent;
          if (!ErrorComponent) {
            return null;
          }
          return <ErrorComponent
            error={itemDefinitionContext.loadError}
            reload={itemDefinitionContext.reload}
            children={props.children}
          />;
        } else if (
          itemDefinitionContext.blocked
        ) {
          const BlockedComponent = props.blockedComponent;
          if (!BlockedComponent) {
            return null;
          }
          return <BlockedComponent
            hasBlockedAccess={itemDefinitionContext.blockedButDataAccessible}
            children={props.children}
          />;
        } else if (
          itemDefinitionContext.notFound
        ) {
          const NotFoundComponent = props.notFoundComponent;
          if (!NotFoundComponent) {
            return null;
          }
          return <NotFoundComponent
            children={props.children}
          />;
        }
        return props.children;
      }
    }</ItemDefinitionContext.Consumer>
  );
}

interface ISubmitActionerProps {
  children: (arg: {
    submitError: GraphQLEndpointErrorType;
    dismissError: () => void;
    dismissSubmitted: () => void;
    submitting: boolean;
    submitted: boolean;
    submit: () => Promise<IActionResponseWithId>;
  }) => any;
}

// TODO optimize
export function SubmitActioner(props: ISubmitActionerProps) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => (
        props.children({
          submitError: itemDefinitionContext.submitError,
          submitting: itemDefinitionContext.submitting,
          submitted: itemDefinitionContext.submitted,
          submit: itemDefinitionContext.submit,
          dismissError: itemDefinitionContext.dismissSubmitError,
          dismissSubmitted: itemDefinitionContext.dismissSubmitted,
        })
      )
    }</ItemDefinitionContext.Consumer>
  );
}

interface ISearchActionerProps {
  children: (arg: {
    searchError: GraphQLEndpointErrorType;
    dismissSearchResults: () => void;
    dismissSearchError: () => void;
    searching: boolean;
    searchResults: number[];
    search: () => Promise<IActionResponseWithManyIds>;
  }) => any;
}

// TODO optimize
export function SearchActioner(props: ISearchActionerProps) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => (
        props.children({
          searchError: itemDefinitionContext.searchError,
          searching: itemDefinitionContext.searching,
          searchResults: itemDefinitionContext.searchResuls,
          search: itemDefinitionContext.search,
          dismissSearchResults: itemDefinitionContext.dismissSearchResults,
          dismissSearchError: itemDefinitionContext.dismissSearchError,
        })
      )
    }</ItemDefinitionContext.Consumer>
  );
}
