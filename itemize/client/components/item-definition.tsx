import React from "react";
import { GraphQLEndpointErrorType } from "../../base/errors";
import { ItemDefinitionContext } from "../app/providers";

interface IItemDefinitionLoader {
  errorComponent?: React.ComponentType<{error: GraphQLEndpointErrorType}>;
  notFoundComponent?: React.ComponentType<any>;
  blockedComponent?: React.ComponentType<{hasBlockedAccess: boolean}>;
  children: any;
}

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

// TODO submit for a country
// tslint:disable-next-line: no-empty
export function SubmitButton() {
}
