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
/**
 * The props that are passed to the outdated checker
 * basically a children with a boolean in it
 */
interface IAppIsOutdatedCheckerProps {
    children: (isOutdated: boolean) => React.ReactNode;
}
/**
 * The app is outated checker provides information on an outdated application that requires
 * a reload (refresh) for it to be updated
 * @param props the props for outated checking
 * @returns a react component
 */
export default function AppIsOutdatedChecker(props: IAppIsOutdatedCheckerProps): JSX.Element;
export {};
