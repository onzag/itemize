/**
 * Contains the component that checks if the app is blocked from update
 *
 * @module
 */

import React from "react";
import { DataContext } from "../../internal/providers/appdata-provider";

/**
 * The props simply contain a children that passes
 * a boolean
 */
interface IAppIsBlockedFromUpdateProps {
  children: (isBlocked: boolean) => React.ReactNode;
}

/**
 * The props here actually specify on whether the component is blocked
 */
interface IActualAppIsBlockedFromUpdateProps extends IAppIsBlockedFromUpdateProps {
  isBlocked: boolean;
}

/**
 * This is the actual class that specify if it's blocked
 */
class ActualAppIsBlockedFromUpdate extends React.PureComponent<IActualAppIsBlockedFromUpdateProps> {
  public render() {
    return this.props.children(this.props.isBlocked);
  }
}

/**
 * Specifies if the app is blocked from update, this happens in the following scenario
 * User has opened 2 tabs, and one tab informs that there's a new version of the app the user then interacts and updates the app
 * when this app reloads it comes with its fresh new version with a new buildnumber, and as such, the initialization
 * will find out this mismatch and as such will attempt to clear up the old database with the old information as it might
 * not really be valid anymore, but an issue arises with that, that the second tab is opened with a worker that has hold
 * of that previous database that is attempted to be deleted
 * 
 * As such the App is blocked from update, while this sounds like a rare case, it happens more often than is
 * imagined as users really like to open many tabs
 * 
 * @param props the props
 * @returns a react component
 */
export function AppIsBlockedFromUpdate(props: IAppIsBlockedFromUpdateProps) {
  return (
    <DataContext.Consumer>
      {(data) => (<ActualAppIsBlockedFromUpdate {...props} isBlocked={data.updateIsBlocked}/>)}
    </DataContext.Consumer>
  );
}
