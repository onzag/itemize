/**
 * Allows the application to know when it's outdated as a new version
 * with a different buildnumber has been launched, this usually means
 * the client loses connection and then reconnects realizing
 * the backend and the frontend don't match anymore and an updated
 * needs to be installed
 * 
 * many things happen during an update, cleaning of the service workers cache,
 * and refreshing the app
 *
 * @packageDocumentation
 */

import React from "react";
import { DataContext } from "../../internal/app";
import { RemoteListener } from "../../internal/app/remote-listener";

/**
 * The props that are passed to the outdated checker
 * basically a children with a boolean in it
 */
interface IAppIsOutdatedCheckerProps {
  children: (isOutdated: boolean) => React.ReactNode;
}

/**
 * The props that extend with the remote listener that is necessary to get information
 * about whether an app is outdated
 */
interface IActualAppIsOutdatedCheckerProps extends IAppIsOutdatedCheckerProps {
  remoteListener: RemoteListener;
}

/**
 * The outdated state
 */
interface IActualAppIsOutdatedCheckerState {
  isOutdated: boolean;
}

/**
 * The actual class that really performs the logic
 * for outdated checking
 */
class ActualAppIsOutdatedChecker extends
  React.Component<IActualAppIsOutdatedCheckerProps, IActualAppIsOutdatedCheckerState> {
  constructor(props: IActualAppIsOutdatedCheckerProps) {
    super(props);

    // due to SSR we cant use the remote listener here but we wait for it in mount
    // however clearly if the server is rendering this, it's not going to be
    // outdated
    this.state = {
      isOutdated: false,
    };

    this.onAppUpdated = this.onAppUpdated.bind(this);
  }
  public shouldComponentUpdate(
    nextProps: IActualAppIsOutdatedCheckerProps, nextState: IActualAppIsOutdatedCheckerState,
  ) {
    return nextProps.children !== this.props.children ||
      nextState.isOutdated !== this.state.isOutdated;
  }
  public componentDidMount() {
    this.setState({
      isOutdated: this.props.remoteListener.isAppUpdated(),
    });
    this.props.remoteListener.addAppUpdatedListener(this.onAppUpdated);
  }
  public componentWillUnmount() {
    this.props.remoteListener.removeAppUpdatedListener(this.onAppUpdated);
  }
  public onAppUpdated() {
    this.setState({
      isOutdated: this.props.remoteListener.isAppUpdated(),
    });
  }
  public render() {
    return this.props.children(this.state.isOutdated);
  }
}

/**
 * The app is outated checker provides information on an outdated application that requires
 * a reload (refresh) for it to be updated
 * @param props the props for outated checking
 * @returns a react component
 */
export default function AppIsOutdatedChecker(props: IAppIsOutdatedCheckerProps) {
  return (
    <DataContext.Consumer>
      {(data) => (<ActualAppIsOutdatedChecker {...props} remoteListener={data.remoteListener}/>)}
    </DataContext.Consumer>
  );
}
