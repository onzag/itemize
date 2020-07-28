/**
 * Allows to create conditional rendering for when the app is offline
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The props basically takes a children that tells if connected or not
 */
interface IOfflineStatusRetrieverProps {
    children: (offline: boolean) => React.ReactNode;
}
/**
 * Allows to check for the offline status of the application, there's a time of grace
 * as it assumes the application is online
 * @param props the props
 * @returns a react component
 */
export default function OfflineStatusRetriever(props: IOfflineStatusRetrieverProps): JSX.Element;
export {};
