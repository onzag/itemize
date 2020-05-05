import React from "react";
import {
  ItemDefinitionContext,
} from "../../providers/item-definition";

interface IDifferingPropertiesRetrieverProps {
  mainProperties: string[];
  children: (differingProperties: string[]) => React.ReactNode;
}

export default function DifferingPropertiesRetriever(props: IDifferingPropertiesRetrieverProps) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => {
        const finalProperties = props.mainProperties.filter((mainProperty: string) => {
          const propertyData = itemDefinitionContext.state.properties.find(p => p.propertyId === mainProperty);
          if (!propertyData) {
            return false;
          }
          return !itemDefinitionContext.idef.getPropertyDefinitionFor(mainProperty, true).getPropertyDefinitionDescription().localEqual(
            propertyData.stateAppliedValue,
            propertyData.value,
          );
        });
        return props.children(finalProperties);
      }
    }</ItemDefinitionContext.Consumer>
  )
}