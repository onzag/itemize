import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import {
  ItemDefinitionContext,
  IBasicActionResponse,
  IItemDefinitionContextType,
} from "../../providers/item-definition";

export interface IItemDefinitionLoaderInfoArgType {
  loading: boolean;
  notFound: boolean;
  blocked: boolean;
  hasBlockedAccess: boolean;
  error: EndpointErrorType;
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
export default function ItemDefinitionLoader(props: IItemDefinitionLoader) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => (
        <ActualItemDefinitionLoader {...props} itemDefinitionContext={itemDefinitionContext}/>
      )
    }</ItemDefinitionContext.Consumer>
  );
}
