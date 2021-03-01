/**
 * Contains the differing properties retriever class
 * 
 * @module
 */

import React from "react";
import equals from "deep-equal";
import {
  ItemContext,
} from "../../providers/item";

/**
 * The props for the differing properties retriever element
 */
interface IDifferingPropertiesRetrieverProps {
  /**
   * The main properties to check for differences
   */
  mainProperties: string[];
  /**
   * A list of differing properties
   */
  children: (differingProperties: string[]) => React.ReactNode;
}

/**
 * The interface for a class for optimization of the differing properties retriever
 */
interface IOptimizerDifferingPropertiesRetrieverProps {
  /**
   * The calculated properties
   */
  finalProperties: string[];
  /**
   * A list of differing properties
   */
  children: (differingProperties: string[]) => React.ReactNode;
}

/**
 * Basically only allows a rerender of the children if the different properties do in fact differ
 */
class OptimizerDifferingPropertiesRetriever extends React.Component<IOptimizerDifferingPropertiesRetrieverProps> {
  public shouldComponentUpdate(nextProps: IOptimizerDifferingPropertiesRetrieverProps) {
    // basically we only update when the final properties or the children function differ
    return nextProps.children !== this.props.children ||
      !equals(nextProps.finalProperties, this.props.finalProperties);
  }
  public render() {
    return this.props.children(this.props.finalProperties);
  }
}

/**
 * The differing properties retriever element which provides the properties
 * ids that differ from their applied value
 * @param props the react props
 * @returns a react node
 */
export default function DifferingPropertiesRetriever(props: IDifferingPropertiesRetrieverProps) {
  // first we need the item definition context
  return (
    <ItemContext.Consumer>{
      (itemContext) => {
        const finalProperties = props.mainProperties.filter((mainProperty: string) => {
          const propertyData = itemContext.state.properties.find(p => p.propertyId === mainProperty);
          if (!propertyData) {
            return false;
          }
          const property = itemContext.idef.getPropertyDefinitionFor(mainProperty, true);
          return !itemContext.idef.getPropertyDefinitionFor(mainProperty, true).getPropertyDefinitionDescription().localEqual({
            itemDefinition: itemContext.idef,
            include: null,
            property,
            id: property.getId(),
            prefix: "",
            a: propertyData.stateAppliedValue,
            b: propertyData.value,
          });
        });
        return (
          <OptimizerDifferingPropertiesRetriever finalProperties={finalProperties} children={props.children}/>
        );
      }
    }</ItemContext.Consumer>
  )
}