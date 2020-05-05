import React from "react";
import { DataContext } from "../../internal/app";

interface IAppIsBlockedFromUpdateProps {
  children: (isBlocked: boolean) => React.ReactNode;
}

interface IActualAppIsBlockedFromUpdateProps extends IAppIsBlockedFromUpdateProps {
  isBlocked: boolean;
}

class ActualAppIsBlockedFromUpdate extends React.PureComponent<IActualAppIsBlockedFromUpdateProps> {
  public render() {
    return this.props.children(this.props.isBlocked);
  }
}

export function AppIsBlockedFromUpdate(props: IAppIsBlockedFromUpdateProps) {
  return (
    <DataContext.Consumer>
      {(data) => (<ActualAppIsBlockedFromUpdate {...props} isBlocked={data.updateIsBlocked}/>)}
    </DataContext.Consumer>
  );
}