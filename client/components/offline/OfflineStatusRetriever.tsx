/**
 * Allows to create conditional rendering for when the app is offline
 *
 * @module
 */

import React from "react";
import { DataContext } from "../../internal/providers/appdata-provider";
import { RemoteListener } from "../../internal/app/remote-listener";

/**
 * The props basically takes a children that tells if connected or not
 */
interface IOfflineStatusRetrieverProps {
  children: (offline: boolean) => React.ReactNode;
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
  constructor(props: IActualOfflineStatusRetrieverProps) {
    super(props);

    // so we initially get the state from the remote listener
    // note how we check for the remote listener itself, as it can be undefined
    // if we happen to be on the server side
    this.state = {
      offline: false,
      canAcceptConclusion: false,
    };

    // and then add the a on connection status change
    this.onConnectionStatusChange = this.onConnectionStatusChange.bind(this);
  }
  public shouldComponentUpdate(
    nextProps: IActualOfflineStatusRetrieverProps, nextState: IActualOfflineStatusRetrieverState,
  ) {
    // only if the children and the conclusion changes, of both the offline state and whether
    // we can accept such conclusion, we accept it
    return nextProps.children !== this.props.children ||
      (nextState.offline && nextState.canAcceptConclusion) !== (this.state.offline && this.state.canAcceptConclusion);
  }
  /**
   * when the mount event happens
   */
  public componentDidMount() {
    // now we set the actual offline state
    this.setState({
      offline: this.props.remoteListener.isOffline(),
    });
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
        this.setState({
          canAcceptConclusion: true,
        });
      }, 1000);
    }
    // and add the listener to listen for changes
    this.props.remoteListener.addConnectStatusListener(this.onConnectionStatusChange);
  }
  public componentWillUnmount() {
    // remove the listener
    this.props.remoteListener.removeConnectStatusListener(this.onConnectionStatusChange);
  }
  public onConnectionStatusChange() {
    this.setState({
      offline: this.props.remoteListener.isOffline(),
    });
  }
  public render() {
    return this.props.children(this.state.offline && this.state.canAcceptConclusion);
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
      {(data) => (<ActualOfflineStatusRetriever {...props} remoteListener={data.remoteListener}/>)}
    </DataContext.Consumer>
  );
}
