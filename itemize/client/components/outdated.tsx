import React from "react";
import { DataContext } from "../internal/app";
import { RemoteListener } from "../internal/app/remote-listener";

interface IAppIsOutdatedCheckerProps {
  children: (isOutdated: boolean) => any;
}

interface IActualAppIsOutdatedCheckerProps extends IAppIsOutdatedCheckerProps {
  remoteListener: RemoteListener;
}

interface IActualAppIsOutdatedCheckerState {
  isOutdated: boolean;
}

class ActualAppIsOutdatedChecker extends
  React.Component<IActualAppIsOutdatedCheckerProps, IActualAppIsOutdatedCheckerState> {
  constructor(props: IActualAppIsOutdatedCheckerProps) {
    super(props);

    this.state = {
      isOutdated: false,
    };

    this.onAppIsOutdated = this.onAppIsOutdated.bind(this);
  }
  public shouldComponentUpdate(
    nextProps: IActualAppIsOutdatedCheckerProps, nextState: IActualAppIsOutdatedCheckerState,
  ) {
    return nextProps.children !== this.props.children ||
      nextState.isOutdated !== this.state.isOutdated;
  }
  public componentDidMount() {
    this.props.remoteListener.addConnectStatusListener(this.onAppIsOutdated);
  }
  public componentWillUnmount() {
    this.props.remoteListener.removeConnectStatusListener(this.onAppIsOutdated);
  }
  public onAppIsOutdated() {
    this.setState({
      isOutdated: this.props.remoteListener.isAppUpdated(),
    });
  }
  public render() {
    return this.props.children(this.state.isOutdated);
  }
}

export function AppIsOutdatedChecker(props: IAppIsOutdatedCheckerProps) {
  return (
    <DataContext.Consumer>
      {(data) => (<ActualAppIsOutdatedChecker {...props} remoteListener={data.remoteListener}/>)}
    </DataContext.Consumer>
  );
}
