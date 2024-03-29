import React from "react";
import Module from "../../base/Root/Module";
import { DataContext } from "../internal/providers/appdata-provider";
import Root from "../../base/Root";
import { RemoteListener } from "../internal/app/remote-listener";
import uuid from "uuid";
import { ItemContext } from "./item";

export interface IModuleContextType {
  mod: Module;
  remoteListener: RemoteListener;
}

export const ModuleContext = React.createContext<IModuleContextType>(null);

interface IModuleProviderProps {
  children: any;
  module: string | Module;
  doNotRestoreItemContext?: boolean;
}

interface IActualModuleProviderProps {
  children: any;
  root: Root;
  mod: string | Module;
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
      const id = typeof this.props.mod === "string" ?
        this.props.root.registry[this.props.mod].getQualifiedPathName() :
        this.props.mod.getQualifiedPathName();
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
    const mod = typeof this.props.mod === "string" ? this.props.root.registry[this.props.mod] as Module : this.props.mod;
    if (!(mod instanceof Module)) {
      throw new Error("Could not find module " + this.props.mod);
    }
    return (
      <ModuleContext.Provider
        value={{
          mod: mod,
          remoteListener: this.props.remoteListener,
        }}
      >
        {this.props.children}
      </ModuleContext.Provider>
    );
  }
}

export function ModuleProvider(props: IModuleProviderProps) {
  const provider = (
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

  if (props.doNotRestoreItemContext) {
    return provider;
  }
  return (
    <ItemContext.Provider value={null}>
      {provider}
    </ItemContext.Provider>
  );
}
