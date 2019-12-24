import React from "react";
import Module from "../../base/Root/Module";
import { DataContext } from "../app";
import Root from "../../base/Root";

export interface IModuleContextType {
  mod: Module;
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
}

class ActualModuleProvider extends React.Component<IActualModuleProviderProps, {}> {
  public shouldComponentUpdate(nextProps: IActualModuleProviderProps) {
    return this.props.mod !== nextProps.mod ||
      this.props.children !== nextProps.children ||
      this.props.root !== nextProps.root;
  }
  public render() {
    return (
      <ModuleContext.Provider
        value={{
          mod: this.props.root.getModuleFor(this.props.mod.split("/")),
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
            >
              {props.children}
            </ActualModuleProvider>
          );
        }
      }
    </DataContext.Consumer>
  );
}
