import React from "react";
import { IIncludeCalloutWarningRendererProps } from "../components/IncludeCalloutWarning";

export interface IRendererContext {
  IncludeCalloutWarning?: (props: IIncludeCalloutWarningRendererProps) => any,
}

export const RendererContext = React.createContext<IRendererContext>(null);

interface IRendererProviderProps extends IRendererContext {
  children: any,
}

export default function RendererProvider(props: IRendererProviderProps) {
  return <RendererContext.Consumer>
    {
      (value) => {
        const newProviderValue: IRendererContext = {...value};
        Object.keys(props).forEach((key) => {
          if (key === "children") {
            return;
          }
          newProviderValue[key] = props[key];
        });
        return <RendererContext.Provider value={newProviderValue}>{props.children}</RendererContext.Provider>
      }
    }
  </RendererContext.Consumer>
}