/**
 * Provides an item definition loader component that allows for functionality
 * regarding notFound, blocked, data accessible, loading, loaded, etc... with
 * conditional rendering
 * 
 * @packageDocumentation
 */

import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import {
  ItemContext,
  IBasicActionResponse,
  IItemContextType,
} from "../../providers/item";

/**
 * The arg that is passed to the children, which allows
 * for the conditional rendering
 */
export interface IItemLoaderInfoArgType {
  /**
   * Whether it is ready and loaded
   */
  loaded: boolean;
  /**
   * Whether is currently loading, from memory, cache, etc...
   */
  loading: boolean;
  /**
   * Whether it is not found, as in the item definition did not exist
   */
  notFound: boolean;
  /**
   * Whether the item is blocked
   */
  blocked: boolean;
  /**
   * Whether you have moderation access to the item despite it being blocked
   */
  hasBlockedAccess: boolean;
  /**
   * An error that occured during loading, not found does not count for this
   * as null is a valid value, this is more for forbidden, no network, and whatnot
   */
  error: EndpointErrorType;
  /**
   * A function that allows to try to reload the element
   */
  reload: () => Promise<IBasicActionResponse>;
}

/**
 * The item definition loader itself props
 */
interface IItemLoaderProps {
  children: (arg: IItemLoaderInfoArgType) => React.ReactNode;
}

/**
 * The actual item definition loader props which allows for optimization and contains
 * the item definition context
 */
interface IActualItemLoaderProps extends IItemLoaderProps {
  itemContext: IItemContextType;
}

/**
 * Class that actually does the item definition loader conditional logic and optimizes
 */
class ActualItemLoader extends React.Component<IActualItemLoaderProps> {
  public shouldComponentUpdate(nextProps: IActualItemLoaderProps) {
    // so we only render if any of our logical rendering attributes differ
    return nextProps.itemContext.loadError !== this.props.itemContext.loadError ||
      nextProps.children !== this.props.children ||
      nextProps.itemContext.blocked !== this.props.itemContext.blocked ||
      nextProps.itemContext.blockedButDataAccessible !==
        this.props.itemContext.blockedButDataAccessible ||
      nextProps.itemContext.notFound !== this.props.itemContext.notFound ||
      nextProps.itemContext.loading !== this.props.itemContext.loading ||
      nextProps.itemContext.loaded !== this.props.itemContext.loaded;
  }
  public render() {
    return this.props.children(
      {
        loaded: this.props.itemContext.loaded,
        loading: this.props.itemContext.loading,
        notFound: this.props.itemContext.notFound,
        blocked: this.props.itemContext.blocked,
        hasBlockedAccess: this.props.itemContext.blockedButDataAccessible,
        error: this.props.itemContext.loadError,
        reload: this.props.itemContext.reload,
      },
    );
  }
}

/**
 * The item definition loader component allows for conditional rendering depending on the
 * fact on the state of the item definition value itself, allows for many types of
 * rendering conditions depending on the loading state, should use mostly if a forId
 * is specified as that requires loading
 */
export default function ItemLoader(props: IItemLoaderProps) {
  return (
    <ItemContext.Consumer>{
      (itemContext) => (
        <ActualItemLoader {...props} itemContext={itemContext}/>
      )
    }</ItemContext.Consumer>
  );
}
