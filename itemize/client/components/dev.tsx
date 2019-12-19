import React from "react";
import { ItemDefinitionContext } from "../app/providers";
import { IItemDefinitionStateType } from "../../base/Root/Module/ItemDefinition";

export function StatsForNerds(props: {
  propertyIds?: string[],
}) {
  return (
    <ItemDefinitionContext.Consumer>
      {
        (itemDefinitionContextualValue) => {
          const valueToStringify: IItemDefinitionStateType = {
            ...itemDefinitionContextualValue.state,
            properties: itemDefinitionContextualValue.state.properties
              .filter((p) => !props.propertyIds || props.propertyIds.includes(p.propertyId))
              .map((propertyValue) => {
              let propertyValueToStringify = {...propertyValue};
              // a small hack due to internal values being too long
              if (
                propertyValueToStringify.internalValue !== null &&
                typeof propertyValueToStringify.internalValue !== "string"
              ) {
                propertyValueToStringify = {...propertyValueToStringify, internalValue: "[TOO BIG TO DISPLAY]"};
              }

              return propertyValueToStringify;
            }),
          };

          return <code>{JSON.stringify(valueToStringify, null, 2)}</code>;
        }
      }
    </ItemDefinitionContext.Consumer>
  );
}
