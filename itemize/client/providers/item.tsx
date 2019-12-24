import React from "react";
import Item, { IItemState } from "../../base/Root/Module/ItemDefinition/Item";
import { ItemDefinitionContext } from "./item-definition";
import equals from "deep-equal";

export interface IItemContext {
  item: Item;
  state: IItemState;
}

export const ItemContext = React.createContext<IItemContext>(null);

interface IItemProviderProps {
  children: any;
  item: string;
}

interface IActualItemProviderProps {
  children: any;
  state: IItemState;
  item: Item;
}

// tslint:disable-next-line: max-classes-per-file
class ActualItemProvider extends React.Component<IActualItemProviderProps, {}> {
  public shouldComponentUpdate(nextProps: IActualItemProviderProps) {
    return nextProps.item !== this.props.item ||
      nextProps.children !== this.props.children ||
      !equals(this.props.state, nextProps.state);
  }
  public render() {
    return (
      <ItemContext.Provider
        value={{
          item: this.props.item,
          state: this.props.state,
        }}
      >
        {this.props.children}
      </ItemContext.Provider>
    );
  }
}

export function ItemProvider(props: IItemProviderProps) {
  return (
    <ItemDefinitionContext.Consumer>
      {
        (itemDefinitionContextualValue) => {
          const itemState = itemDefinitionContextualValue.state.items.find((i) => i.itemId === props.item);
          const itemObject = itemDefinitionContextualValue.idef.getItemFor(props.item);
          return (
            <ActualItemProvider item={itemObject} state={itemState}>
              {props.children}
            </ActualItemProvider>
          );
        }
      }
    </ItemDefinitionContext.Consumer>
  );
}
