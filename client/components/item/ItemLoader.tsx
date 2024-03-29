/**
 * Provides an item definition loader component that allows for functionality
 * regarding notFound, blocked, data accessible, loading, loaded, etc... with
 * conditional rendering
 * 
 * @module
 */

import React, { useContext, useMemo } from "react";
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
   * 
   * Note that using this value for UI purposes may backfire
   * as loaded will turn into false whenever it attempts to load again (eg to synchronize)
   * it's better to check `holdsRemoteState` for that as that will be only false
   * if there is no useful data to display
   */
  loaded: boolean;
  /**
   * Whether it holds a remote state, whether up to date or not
   * this is the preferrable choice over "loading" when preparing
   * the UI if the value is required, as loading will be true even
   * as it is synchronizing whereas holdsRemoteState will only be false
   * if there is no useful information to populate with (even if it's outdated)
   */
  holdsRemoteState: boolean;
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
  /**
   * Allows to download the current state of the item, including
   * its files and download them
   */
  downloadState: (specificProperties?: string[], specificIncludes?: { [id: string]: string[] }) => Promise<Blob>;
  /**
   * Allows to download the current state of the item, including
   * its files and download them
   */
  downloadStateAt: (id: string, version?: string, specificProperties?: string[], specificIncludes?: { [id: string]: string[] }) => Promise<Blob>;
  /**
   * Allows to load the state from a file that has previously
   * been downloaded and packaged
   */
  loadStateFromFile: (f: Blob | File, specificProperties?: string[], specificIncludes?: { [id: string]: string[] }) => Promise<void>;
  /**
   * Allows to load the state from a file that has previously
   * been downloaded and packaged
   * This function loads it at a specific id and version slot
   */
  loadStateFromFileAt: (
    f: Blob | File,
    id: string,
    version: string,
    specificProperties?: string[],
    specificIncludes?: { [id: string]: string[] },
  ) => Promise<void>;
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
        holdsRemoteState: this.props.itemContext.holdsRemoteState,
        reload: this.props.itemContext.reload,
        downloadState: this.props.itemContext.downloadState,
        downloadStateAt: this.props.itemContext.downloadStateAt,
        loadStateFromFile: this.props.itemContext.loadStateFromFile,
        loadStateFromFileAt: this.props.itemContext.loadStateFromFileAt,
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
        <ActualItemLoader {...props} itemContext={itemContext} />
      )
    }</ItemContext.Consumer>
  );
}

export function useItemLoader(): IItemLoaderInfoArgType {
  const itemContext = useContext(ItemContext);

  return useMemo(() => ({
    loaded: itemContext.loaded,
    loading: itemContext.loading,
    notFound: itemContext.notFound,
    blocked: itemContext.blocked,
    hasBlockedAccess: itemContext.blockedButDataAccessible,
    holdsRemoteState: itemContext.holdsRemoteState,
    error: itemContext.loadError,
    reload: itemContext.reload,
    downloadState: itemContext.downloadState,
    downloadStateAt: itemContext.downloadStateAt,
    loadStateFromFile: itemContext.loadStateFromFile,
    loadStateFromFileAt: itemContext.loadStateFromFileAt,
  }), [
    itemContext.loaded,
    itemContext.loading,
    itemContext.notFound,
    itemContext.blocked,
    itemContext.blockedButDataAccessible,
    itemContext.loadError,
    itemContext.holdsRemoteState,
    itemContext.reload,
    itemContext.downloadState,
    itemContext.downloadStateAt,
    itemContext.loadStateFromFile,
    itemContext.loadStateFromFileAt,
  ]);
}