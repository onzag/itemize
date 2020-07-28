/**
 * Contains the class that allows to generate conditional rendering
 * on whether the user is logged in or not
 * 
 * @packageDocumentation
 */

import React from "react";
import { TokenContext } from "../../internal/providers/token-provider";

/**
 * The available logged types
 */
type logStatusType = "LOGGED_IN" | "LOGGED_OUT" | "LOGGING_IN";

/**
 * The callback that might be expected as children
 */
type IfLogStatusCallback = (status: logStatusType) => React.ReactNode;

/**
 * The props for the log status
 */
interface IIfLogStatusProps {
  /**
   * A conditional status, if provided the element children
   * will only render if the status matches the one provided
   */
  status?: logStatusType;
  /**
   * A react node as children to a function, if passed a function
   * the actual log status is going to be passed
   */
  children: React.ReactNode | IfLogStatusCallback;
}

/**
 * The actual if log status class props
 */
interface IActualIfLogStatusProps extends IIfLogStatusProps {
  isLoggingIn: boolean;
  isLoggedIn: boolean;
}

/**
 * The actual log status class, note how it is
 * a pure component for increased performance
 */
class ActualIfLogStatus extends React.PureComponent<IActualIfLogStatusProps, {}> {
  public render() {
    // so first using the logic we get the current status
    const logStatus: logStatusType = this.props.isLoggedIn ? "LOGGED_IN" : (
      this.props.isLoggingIn ? "LOGGING_IN" : "LOGGED_OUT"
    );

    // and now whether it should render
    const shouldRender = !this.props.status || (this.props.status === logStatus);

    // if it shouldn't render
    if (!shouldRender) {
      // we give null
      return null;
    } else if (typeof this.props.children === "function") {
      // for function we pass the log status
      return (this.props.children as IfLogStatusCallback)(logStatus) || null;
    } else {
      // otherwise we just render the children
      return this.props.children || null;
    }
  }
}

/**
 * The IfLogStatus component allows for conditional rendering of the
 * logged in status of the current user in the application context
 * @param props the log status props
 * @returns a react node
 */
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
