import React from "react";
import Module from "../../base/Root/Module";
import { DataContext } from "../app";
import Root from "../../base/Root";
import { RemoteListener } from "../app/remote-listener";

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
  public shouldComponentUpdate(nextProps: IActualModuleProviderProps) {
    return this.props.mod !== nextProps.mod ||
      this.props.children !== nextProps.children ||
      this.props.root !== nextProps.root ||
      this.props.remoteListener !== nextProps.remoteListener;
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
