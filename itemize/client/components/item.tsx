import React from "react";
import Item, { ItemExclusionState } from "../../base/Root/Module/ItemDefinition/Item";
import { ItemDefinitionContext, ItemContext } from "../app/providers";
import ItemExclusionSwitch from "./base/ItemExclusionSwitch";
import ItemCalloutWarning from "./base/ItemCalloutWarning";

interface IExclusionSwitchProps {
  onChange?: (item: Item, newExclusionState: ItemExclusionState) => void;
}

export function ExclusionSwitch(props: IExclusionSwitchProps) {
  return (
    <ItemDefinitionContext.Consumer>
      {
        (itemDefinitionContextualValue) => (
          <ItemContext.Consumer>
            {
              (itemContextualValue) => {
                if (!itemContextualValue) {
                  throw new Error("The ExclusionSwitch must be in an Item context");
                }

                const onChange = (newExclusionState: ItemExclusionState) => {
                  if (props.onChange) {
                    props.onChange(itemContextualValue.item, newExclusionState);
                  }
                  itemDefinitionContextualValue.onItemSetExclusionState(itemContextualValue.item, newExclusionState);
                };

                return (
                  <ItemExclusionSwitch
                    item={itemContextualValue.item}
                    state={itemContextualValue.state}
                    onChange={onChange}
                    forId={itemDefinitionContextualValue.forId}
                  />
                );
              }
            }
          </ItemContext.Consumer>
        )
      }
    </ItemDefinitionContext.Consumer>
  );
}

export function CalloutWarning() {
  return (
    <ItemContext.Consumer>
      {
        (itemContextualValue) => {
          if (!itemContextualValue) {
            throw new Error("The CalloutWarning must be in an Item context");
          }

          return (
            <ItemCalloutWarning
              item={itemContextualValue.item}
              state={itemContextualValue.state}
            />
          );
        }
      }
    </ItemContext.Consumer>
  );
}
