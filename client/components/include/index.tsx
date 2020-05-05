import React from "react";
import Include, { IncludeExclusionState } from "../../base/Root/Module/ItemDefinition/Include";
import { ItemDefinitionContext } from "../providers/item-definition";
import IncludeExclusionSwitch from "../base/IncludeExclusionSwitch";
import IncludeCalloutWarning from "../base/IncludeCalloutWarning";
import { IncludeContext } from "../../providers/include";

interface IExclusionSwitchProps {
  onChange?: (include: Include, newExclusionState: IncludeExclusionState) => void;
}

export function ExclusionSwitch(props: IExclusionSwitchProps) {
  return (
    <ItemDefinitionContext.Consumer>
      {
        (itemDefinitionContextualValue) => (
          <IncludeContext.Consumer>
            {
              (includeContextualValue) => {
                if (!includeContextualValue) {
                  throw new Error("The ExclusionSwitch must be in an Include context");
                }

                const onChange = (newExclusionState: IncludeExclusionState) => {
                  if (props.onChange) {
                    props.onChange(includeContextualValue.include, newExclusionState);
                  }
                  itemDefinitionContextualValue.onIncludeSetExclusionState(
                    includeContextualValue.include, newExclusionState,
                  );
                };

                return (
                  <IncludeExclusionSwitch
                    include={includeContextualValue.include}
                    state={includeContextualValue.state}
                    onChange={onChange}
                    forId={itemDefinitionContextualValue.forId}
                    forVersion={itemDefinitionContextualValue.forVersion}
                  />
                );
              }
            }
          </IncludeContext.Consumer>
        )
      }
    </ItemDefinitionContext.Consumer>
  );
}

export function CalloutWarning() {
  return (
    <IncludeContext.Consumer>
      {
        (includeContextualValue) => {
          if (!includeContextualValue) {
            throw new Error("The CalloutWarning must be in an Include context");
          }

          return (
            <IncludeCalloutWarning
              include={includeContextualValue.include}
              state={includeContextualValue.state}
            />
          );
        }
      }
    </IncludeContext.Consumer>
  );
}
