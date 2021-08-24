import React from "react";
import Module from "../../base/Root/Module";
import { DataContext } from "../internal/providers/appdata-provider";
import Root from "../../base/Root";
import { RemoteListener } from "../internal/app/remote-listener";
import uuid from "uuid";

export interface IModuleContextType {
  mod: Module;
  remoteListener: RemoteListener;
}

export const ModuleContext = React.createContext<IModuleContextType>(null);

interface IModuleProviderProps {
  children: any;
  module: string;
}

interface IActualModuleProviderProps {
  children: any;
  root: Root;
  mod: string;
  remoteListener: RemoteListener;
}

class ActualModuleProvider extends React.Component<IActualModuleProviderProps, {}> {
  private internalUUID: string;
  public componentDidMount() {
    if (
      window.TESTING &&
      process.env.NODE_ENV === "development"
    ) {
      this.internalUUID = uuid.v4();
      this.mountOrUpdateModuleForTesting();
    }
  }
  public mountOrUpdateModuleForTesting() {
    if (process.env.NODE_ENV === "development") {
      const current = window.TESTING.mountedModules.find(m => m.instanceUUID === this.internalUUID);
      const id = this.props.root.getModuleFor(this.props.mod.split("/")).getQualifiedPathName();
      if (current) {
        current.module = id;
        current.updateTime = (new Date()).toISOString();
      } else {
        window.TESTING.mountedModules.push({
          instanceUUID: this.internalUUID,
          module: id,
          mountTime: (new Date()).toISOString(),
          updateTime: null,
          unmountTime: null,
        });
      }
    }
  }
  public shouldComponentUpdate(nextProps: IActualModuleProviderProps) {
    if (
      process.env.NODE_ENV === "development" &&
      window.TESTING &&
      this.props.mod !== nextProps.mod
    ) {
      this.mountOrUpdateModuleForTesting();
    }
    return this.props.mod !== nextProps.mod ||
      this.props.children !== nextProps.children ||
      this.props.root !== nextProps.root ||
      this.props.remoteListener !== nextProps.remoteListener;
  }
  public componentWillUnmount() {
    if (window.TESTING && process.env.NODE_ENV === "development") {
      const mountedModule =
        window.TESTING.mountedModules.find(m => m.instanceUUID === this.internalUUID);
      if (mountedModule) {
        mountedModule.unmountTime = (new Date()).toISOString();
      }
    }
  }
  public render() {
    return (
      <ModuleContext.Provider
        value={{
          mod: this.props.root.getModuleFor(this.props.mod.split("/")),
          remoteListener: this.props.remoteListener,
        }}
      >
        {this.props.children}
      </ModuleContext.Provider>
    );
  }
}

export function ModuleProvider(props: IModuleProviderProps) {
  return (
    <DataContext.Consumer>
      {
        (data) => {
          return (
            <ActualModuleProvider
              root={data.value}
              mod={props.module}
              remoteListener={data.remoteListener}
            >
              {props.children}
            </ActualModuleProvider>
          );
        }
      }
    </DataContext.Consumer>
  );
}
