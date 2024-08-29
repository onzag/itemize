/**
 * This utility provides the remote listener in two ways
 * as a hook and as a component
 * 
 * @module
 */

import { RemoteListener } from "../../internal/app/remote-listener";
import { DataContext } from "../../internal/providers/appdata-provider";
import { useContext } from "react";

/**
 * Provides the remote listener as a hook
 * @returns the remote listener
 */
export function useRemoteListener() {
  const dataCtx = useContext(DataContext);
  return dataCtx.remoteListener;
}

/**
 * Provides the remote listener as a component
 * @param props the props for the element
 * @returns 
 */
export default function RemoteListenerRetriever(props: {children: (remoteListener: RemoteListener) => React.ReactNode}) {
  const rL = useRemoteListener();

  return props.children(rL) as any;
}