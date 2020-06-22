import React from "react";
import {
  ItemDefinitionContext,
} from "../../providers/item-definition";
import { IncludeExclusionState } from "../../../base/Root/Module/ItemDefinition/Include";

interface IDifferingIncludeInfo {
  id: string;
  exclusionStateDiffers: boolean;
  differingProperties: string[];
}

interface IDifferingIncludesRetrieverProps {
  mainIncludes: string[];
  children: (differingIncludes: IDifferingIncludeInfo[]) => React.ReactNode;
}

export default function DifferingIncludesRetriever(props: IDifferingIncludesRetrieverProps) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => {
        const finalProperties = props.mainIncludes.map((mainInclude: string) => {
          const includeData = itemDefinitionContext.state.includes.find(i => i.includeId === mainInclude);
          if (!includeData) {
            return null;
          }
          const exclusionStateDiffers = includeData.stateExclusion !== includeData.stateExclusionApplied;
          const include = itemDefinitionContext.idef.getIncludeFor(mainInclude);
          const allSinkingProperties = include.getSinkingPropertiesIds();
          if (
            exclusionStateDiffers &&
            (
              includeData.stateExclusion === IncludeExclusionState.EXCLUDED ||
              includeData.stateExclusionApplied === IncludeExclusionState.EXCLUDED
            )
          ) {
            return {
              id: mainInclude,
              exclusionStateDiffers: true,
              differingProperties: allSinkingProperties,
            }
          } else if (
            includeData.stateExclusion === IncludeExclusionState.EXCLUDED &&
            !exclusionStateDiffers
          ) {
            return null;
          }

          const itemDefinition = include.getItemDefinition();
          const differingProperties = allSinkingProperties.filter((mainProperty: string) => {
            const propertyData = includeData.itemDefinitionState.properties.find(p => p.propertyId === mainProperty);
            if (!propertyData) {
              return false;
            }
            const property = include.getSinkingPropertyFor(mainProperty);
            return !itemDefinition.getPropertyDefinitionFor(mainProperty, true).getPropertyDefinitionDescription().localEqual({
              itemDefinition,
              include,
              property,
              id: property.getId(),
              prefix: include.getPrefixedQualifiedIdentifier(),
              a: propertyData.stateAppliedValue,
              b: propertyData.value,
            });
          });

          if (!exclusionStateDiffers && differingProperties.length === 0) {
            return null;
          }

          return {
            id: mainInclude,
            exclusionStateDiffers,
            differingProperties,
          }
        }).filter(v => !!v);
        return props.children(finalProperties);
      }
    }</ItemDefinitionContext.Consumer>
  )
}