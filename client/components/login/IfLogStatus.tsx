import React from "react";
import { TokenContext } from "../../internal/providers/token-provider";

type logStatusType = "LOGGED_IN" | "LOGGED_OUT" | "LOGGING_IN";
type IfLogStatusCallback = (status: logStatusType) => React.ReactNode;
interface IIfLogStatusProps {
  status?: logStatusType;
  children: React.ReactNode | IfLogStatusCallback;
}

interface IActualIfLogStatusProps extends IIfLogStatusProps {
  isLoggingIn: boolean;
  isLoggedIn: boolean;
}

// tslint:disable-next-line: max-classes-per-file
class ActualIfLogStatus extends React.PureComponent<IActualIfLogStatusProps, {}> {
  public render() {
    const logStatus: logStatusType = this.props.isLoggedIn ? "LOGGED_IN" : (
      this.props.isLoggingIn ? "LOGGING_IN" : "LOGGED_OUT"
    );
    const shouldRender = !this.props.status || (this.props.status === logStatus);
    if (!shouldRender) {
      return null;
    } else if (typeof this.props.children === "function") {
      return (this.props.children as IfLogStatusCallback)(logStatus) || null;
    } else {
      return this.props.children || null;
    }
  }
}

export function IfLogStatus(props: IIfLogStatusProps) {
  return (
    <TokenContext.Consumer>
      {
        (value) => {
          return <ActualIfLogStatus {...props} isLoggedIn={!!value.token} isLoggingIn={value.isLoggingIn} />;
        }
      }
    </TokenContext.Consumer>
  );
}
