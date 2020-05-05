import React from "react";
import { DataContext } from "../../internal/app";
import { RemoteListener } from "../../internal/app/remote-listener";

interface IAppIsOutdatedCheckerProps {
  children: (isOutdated: boolean) => React.ReactNode;
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

    this.onAppUpdated = this.onAppUpdated.bind(this);
  }
  public shouldComponentUpdate(
    nextProps: IActualAppIsOutdatedCheckerProps, nextState: IActualAppIsOutdatedCheckerState,
  ) {
    return nextProps.children !== this.props.children ||
      nextState.isOutdated !== this.state.isOutdated;
  }
  public componentDidMount() {
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

export default function AppIsOutdatedChecker(props: IAppIsOutdatedCheckerProps) {
  return (
    <DataContext.Consumer>
      {(data) => (<ActualAppIsOutdatedChecker {...props} remoteListener={data.remoteListener}/>)}
    </DataContext.Consumer>
  );
}