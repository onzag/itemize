/**
 * Allows to create conditional rendering for when the app is offline
 *
 * @module
 */

import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DataContext } from "../../internal/providers/appdata-provider";
import { RemoteListener } from "../../internal/app/remote-listener";

type OfflineStatusCb = (offline: boolean) => React.ReactNode;

interface IOfflineStatusRetrieverOptions {
   /**
   * By default the retreives starts in an online state and then falls into an offline state
   * if determined, this will do the reverse and asume it's initially offline and go into offline
   * if necessary
   */
   assumeOfflineFirst?: boolean;
   /**
    * Will use the remote listener to retrieve immediate values and do not assume anything
    * nor leave grace times, NOTE that this mode will break SSR and should only be used in
    * the client side
    */
   immediate_breaksSSR?: boolean;
}

/**
 * The props basically takes a children that tells if connected or not
 */
interface IOfflineStatusRetrieverProps extends IOfflineStatusRetrieverOptions {
  children?: React.ReactNode | OfflineStatusCb;
  onRestoredConnection?: () => void;
  onLostConnection?: () => void;
}

/**
 * The actual props which includes the remote listener
 */
interface IActualOfflineStatusRetrieverProps extends IOfflineStatusRetrieverProps {
  remoteListener: RemoteListener;
}

/**
 * And the state
 */
interface IActualOfflineStatusRetrieverState {
  offline: boolean;
  canAcceptConclusion: boolean;
}

const TIME_WHEN_SRC_LOADED = (new Date()).getTime();

/**
 * The class, which actualy uses a standard component
 * and shouldComponentUpdate
 */
class ActualOfflineStatusRetriever extends
  React.Component<IActualOfflineStatusRetrieverProps, IActualOfflineStatusRetrieverState> {
  private isUnmounted: boolean = false;
  constructor(props: IActualOfflineStatusRetrieverProps) {
    super(props);

    // so we initially get the state from the remote listener
    // note how we check for the remote listener itself, as it can be undefined
    // if we happen to be on the server side
    this.state = {
      offline: props.immediate_breaksSSR ? props.remoteListener.isOffline() : (props.assumeOfflineFirst ? true : false),
      canAcceptConclusion: !!props.immediate_breaksSSR || false,
    };

    // and then add the a on connection status change
    this.onConnectionStatusChange = this.onConnectionStatusChange.bind(this);
  }
  public shouldComponentUpdate(
    nextProps: IActualOfflineStatusRetrieverProps, nextState: IActualOfflineStatusRetrieverState,
  ) {
    const isOffline = this.state.canAcceptConclusion ? this.state.offline : (this.props.assumeOfflineFirst ? true : false);
    const willBeOffline = nextState.canAcceptConclusion ? nextState.offline : (nextProps.assumeOfflineFirst ? true : false);

    if (isOffline !== willBeOffline) {
      if (willBeOffline) {
        nextProps.onLostConnection && nextProps.onLostConnection();
      } else {
        nextProps.onRestoredConnection && nextProps.onRestoredConnection();
      }
    }

    // only if the children and the conclusion changes, of both the offline state and whether
    // we can accept such conclusion, we accept it
    return nextProps.children !== this.props.children ||
      isOffline !== willBeOffline;
  }
  /**
   * when the mount event happens
   */
  public componentDidMount() {
    // now we set the actual offline state
    this.setState({
      offline: this.props.remoteListener.isOffline(),
    });

    if (!this.props.immediate_breaksSSR) {
      // if the time it has passed has been more than 3 seconds this is a component
      // that has been loaded later and the websocket must have had time to setup
      // so we can accept this conclusion
      if (TIME_WHEN_SRC_LOADED - (new Date()).getTime() >= 3000) {
        this.setState({
          canAcceptConclusion: true,
        });
      } else {
        // we first take some time and wait 1 second, for the user
        // to be connected, since the remote listener is offline until
        // it is connected, and we don't want offline status retriever to show
        // when the app is online, we wait 1 second to show
        setTimeout(() => {
          if (!this.isUnmounted) {
            this.setState({
              canAcceptConclusion: true,
            });
          }
        }, 1000);
      }
    }

    // and add the listener to listen for changes
    this.props.remoteListener.addConnectStatusListener(this.onConnectionStatusChange);
  }
  public componentWillUnmount() {
    this.isUnmounted = true;
    // remove the listener
    this.props.remoteListener.removeConnectStatusListener(this.onConnectionStatusChange);
  }
  public onConnectionStatusChange() {
    this.setState({
      offline: this.props.remoteListener.isOffline(),
    });
  }
  public render() {
    if (typeof this.props.children === "function") {
      return this.props.children(this.state.canAcceptConclusion ? this.state.offline : (this.props.assumeOfflineFirst ? true : false));
    }

    return this.props.children || null;
  }
}

/**
 * Allows to check for the offline status of the application, there's a time of grace
 * as it assumes the application is online
 * @param props the props
 * @returns a react component
 */
export default function OfflineStatusRetriever(props: IOfflineStatusRetrieverProps) {
  return (
    <DataContext.Consumer>
      {(data) => (<ActualOfflineStatusRetriever {...props} remoteListener={data.remoteListener} />)}
    </DataContext.Consumer>
  );
}

/**
 * Hook version of the offline status retriever
 * @param options 
 * @returns 
 */
export function useOfflineStatusRetriever(options: IOfflineStatusRetrieverProps) {
  const dataContext = useContext(DataContext);
  const [isOffline, setIsOffline] = useState(options.immediate_breaksSSR ? dataContext.remoteListener.isOffline() : (options.assumeOfflineFirst ? true : false));
  const [canAcceptConclusion, setCanAcceptConclusion] = useState(!!options.immediate_breaksSSR || false);

  const isUnmounted = useRef(false);

  const onConnectionStatusChange = useCallback(() => {
    setIsOffline(dataContext.remoteListener.isOffline());
  }, []);

  useEffect(() => {
    // now we set the actual offline state
    setIsOffline(dataContext.remoteListener.isOffline());

    if (!options.immediate_breaksSSR) {
      // if the time it has passed has been more than 3 seconds this is a component
      // that has been loaded later and the websocket must have had time to setup
      // so we can accept this conclusion
      if (TIME_WHEN_SRC_LOADED - (new Date()).getTime() >= 3000) {
        setCanAcceptConclusion(true);
      } else {
        // we first take some time and wait 1 second, for the user
        // to be connected, since the remote listener is offline until
        // it is connected, and we don't want offline status retriever to show
        // when the app is online, we wait 1 second to show
        setTimeout(() => {
          if (!isUnmounted.current) {
            setCanAcceptConclusion(true);
          }
        }, 1000);
      }
    }

    // and add the listener to listen for changes
    dataContext.remoteListener.addConnectStatusListener(onConnectionStatusChange);

    return () => {
      isUnmounted.current = true;
      dataContext.remoteListener.removeConnectStatusListener(onConnectionStatusChange);
    }
  }, []);

  return canAcceptConclusion ? isOffline : (options.assumeOfflineFirst ? true : false);
}