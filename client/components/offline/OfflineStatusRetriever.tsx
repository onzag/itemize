import React from "react";
import { DataContext } from "../../internal/app";
import { RemoteListener } from "../../internal/app/remote-listener";

interface IOfflineStatusRetrieverProps {
  children: (offline: boolean) => any;
}

interface IActualOfflineStatusRetrieverProps extends IOfflineStatusRetrieverProps {
  remoteListener: RemoteListener;
}

interface IActualOfflineStatusRetrieverState {
  offline: boolean;
}

class ActualOfflineStatusRetriever extends
  React.Component<IActualOfflineStatusRetrieverProps, IActualOfflineStatusRetrieverState> {
  constructor(props: IActualOfflineStatusRetrieverProps) {
    super(props);

    this.state = {
      offline: this.props.remoteListener.isOffline(),
    };

    this.onConnectionStatusChange = this.onConnectionStatusChange.bind(this);
  }
  public shouldComponentUpdate(
    nextProps: IActualOfflineStatusRetrieverProps, nextState: IActualOfflineStatusRetrieverState,
  ) {
    return nextProps.children !== this.props.children ||
      nextState.offline !== this.state.offline;
  }
  public componentDidMount() {
    this.props.remoteListener.addConnectStatusListener(this.onConnectionStatusChange);
  }
  public componentWillUnmount() {
    this.props.remoteListener.removeConnectStatusListener(this.onConnectionStatusChange);
  }
  public onConnectionStatusChange() {
    this.setState({
      offline: this.props.remoteListener.isOffline(),
    });
  }
  public render() {
    return this.props.children(this.state.offline);
  }
}

export default function OfflineStatusRetriever(props: IOfflineStatusRetrieverProps) {
  return (
    <DataContext.Consumer>
      {(data) => (<ActualOfflineStatusRetriever {...props} remoteListener={data.remoteListener}/>)}
    </DataContext.Consumer>
  );
}
