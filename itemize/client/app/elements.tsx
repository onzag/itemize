import PropertyEntry from "./components/base/PropertyEntry";
import { ItemDefinitionContext } from "./providers";
import { IPropertyDefinitionValue } from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import React from "react";
import { IItemDefinitionValue } from "../../base/Root/Module/ItemDefinition";

interface IPropertyProps {
  id: string;
  item?: string;
}

export function Entry(props: IPropertyProps) {
  return (
    <ItemDefinitionContext.Consumer>
      {
        (itemDefinitionContextualValue) => {
          let propertyValue: IPropertyDefinitionValue = null;
          if (props.item) {
            const itemValue = itemDefinitionContextualValue.value.items.find((i) => i.itemName === props.item);
            if (itemValue.itemDefinitionValue) {
              propertyValue = itemValue.itemDefinitionValue.properties.find((p) => p.propertyId === props.id);
            }
          } else {
            propertyValue = itemDefinitionContextualValue.value.properties.find((p) => p.propertyId === props.id);
          }

          const property = itemDefinitionContextualValue.idef.getPropertyDefinitionFor(props.id, true);
          return (
            <PropertyEntry
              property={property}
              value={propertyValue}
              onChange={itemDefinitionContextualValue.onPropertyChange.bind(null, property)}
            />
          );
        }
      }
    </ItemDefinitionContext.Consumer>
  );
}

export function StatsForNerds() {
  return (
    <ItemDefinitionContext.Consumer>
      {
        (itemDefinitionContextualValue) => {
          const valueToStringify: IItemDefinitionValue = {
            ...itemDefinitionContextualValue.value,
            properties: itemDefinitionContextualValue.value.properties.map((propertyValue) => {
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