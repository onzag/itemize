import React from "react";
import Include, { IIncludeState } from "../../base/Root/Module/ItemDefinition/Include";
import { ItemContext } from "./item";
import equals from "deep-equal";

export interface IIncludeContext {
  include: Include;
  state: IIncludeState;
}

export const IncludeContext = React.createContext<IIncludeContext>(null);

interface IIncludeProviderProps {
  children: any;
  item: string;
}

interface IActualIncludeProviderProps {
  children: any;
  state: IIncludeState;
  include: Include;
}

// tslint:disable-next-line: max-classes-per-file
class ActualIncludeProvider extends React.Component<IActualIncludeProviderProps, {}> {
  public shouldComponentUpdate(nextProps: IActualIncludeProviderProps) {
    return nextProps.include !== this.props.include ||
      nextProps.children !== this.props.children ||
      !equals(this.props.state, nextProps.state);
  }
  public render() {
    return (
      <IncludeContext.Provider
        value={{
          include: this.props.include,
          state: this.props.state,
        }}
      >
        {this.props.children}
      </IncludeContext.Provider>
    );
  }
}

export function IncludeProvider(props: IIncludeProviderProps) {
  return (
    <ItemContext.Consumer>
      {
        (itemContextualValue) => {
          const includeState = itemContextualValue.state.includes.find((i) => i.includeId === props.item);
          const includeObject = itemContextualValue.idef.getIncludeFor(props.item);
          return (
            <ActualIncludeProvider include={includeObject} state={includeState}>
              {props.children}
            </ActualIncludeProvider>
          );
        }
      }
    </ItemContext.Consumer>
  );
}
