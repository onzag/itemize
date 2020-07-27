/**
 * Contains the DifferingIncludesRetriever class
 *
 * @packageDocumentation
 */

import React from "react";
import {
  ItemDefinitionContext,
} from "../../providers/item-definition";
import { IncludeExclusionState } from "../../../base/Root/Module/ItemDefinition/Include";
import equals from "deep-equal";

/**
 * The differing include info is the argument that is
 * passed to specify each include that has differed, where
 */
interface IDifferingIncludeInfo {
  /**
   * this is the id of the include
   */
  id: string;
  /**
   * Whether the exclusion state differs
   */
  exclusionStateDiffers: boolean;
  /**
   * Which properties differ
   */
  differingProperties: string[];
}

/**
 * the props for the differing includes retriever
 */
interface IDifferingIncludesRetrieverProps {
  /**
   * The includes to use to compare
   */
  mainIncludes: string[];
  /**
   * The solution
   */
  children: (differingIncludes: IDifferingIncludeInfo[]) => React.ReactNode;
}

/**
 * The interface for a class for optimization of the differing properties retriever
 */
interface IOptimizerDifferingIncludesRetrieverProps {
  /**
   * The calculated differing includes
   */
  differingIncludes: IDifferingIncludeInfo[];
  /**
   * The solution
   */
  children: (differingIncludes: IDifferingIncludeInfo[]) => React.ReactNode;
}

/**
 * Basically only allows a rerender of the children if the different properties do in fact differ
 */
class OptimizerDifferingIncludesRetriever extends React.Component<IOptimizerDifferingIncludesRetrieverProps> {
  public shouldComponentUpdate(nextProps: IOptimizerDifferingIncludesRetrieverProps) {
    // basically we only update when the final properties or the children function differ
    return nextProps.children !== this.props.children ||
      !equals(nextProps.differingIncludes, this.props.differingIncludes);
  }
  public render() {
    return this.props.children(this.props.differingIncludes);
  }
}

/**
 * The class for differing includes which provides includes that differ from their applied value
 * @param props the differing includes props
 * @returns a react component
 */
export default function DifferingIncludesRetriever(props: IDifferingIncludesRetrieverProps) {
  // for that we need to use the item definition context
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => {
        // so now we get the final includes, we loop
        const finalIncludes = props.mainIncludes.map((mainInclude: string) => {
          // now we try to get the state from it
          const includeData = itemDefinitionContext.state.includes.find(i => i.includeId === mainInclude);
          // if there's no such state, we don't know, return null
          if (!includeData) {
            return null;
          }
          // let's check the exclusion state vs the applied
          const exclusionStateDiffers = includeData.stateExclusion !== includeData.stateExclusionApplied;
          // let's get the include and all the sinking properties
          const include = itemDefinitionContext.idef.getIncludeFor(mainInclude);
          const allSinkingProperties = include.getSinkingPropertiesIds();

          // now if the exclusion state is different to the applied and it went either from
          // EXCLUDED to INCLUDED or vice-versa, as well as EXCLUDED to ANY and vice-versa, then
          // it's all the properties that do differ, because they used to be excluded, or included
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

          // otherwise if we are excluded right now, and the applied is excluded
          // it doesn't differ, the properties values are irrelevant, they are all
          // excluded
          } else if (
            includeData.stateExclusion === IncludeExclusionState.EXCLUDED &&
            !exclusionStateDiffers
          ) {
            return null;
          }

          // now we get the item definition for this include
          const itemDefinition = include.getItemDefinition();
          // to try to get the differing properties
          const differingProperties = allSinkingProperties.filter((mainProperty: string) => {
            // first we get the property state from the state itself
            const propertyData = includeData.itemDefinitionState.properties.find(p => p.propertyId === mainProperty);
            // if we have none, return false from the filter, as we can't tell
            if (!propertyData) {
              return false;
            }
            // otherwise let's get the sinking property
            const property = include.getSinkingPropertyFor(mainProperty);
            // and let's use the local equal functionality to check if it has changed
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

          // if it doesn't differ from the exclusion state, and we found no differing properties
          // we can say it doesn't make it to the list
          if (!exclusionStateDiffers && differingProperties.length === 0) {
            return null;
          }

          // otherwise we return the relevant information
          return {
            id: mainInclude,
            exclusionStateDiffers,
            differingProperties,
          }
        }).filter(v => !!v);

        return (
          <OptimizerDifferingIncludesRetriever children={props.children} differingIncludes={finalIncludes}/>
        );
      }
    }</ItemDefinitionContext.Consumer>
  )
}