/**
 * Contains the poke actioner class that allows to interact with poked elements,
 * poked elements by are meant display errors and their actual status, as
 * "they have been poked by the user" in some way or form
 * 
 * @module 
 */

import React from "react";
import {
  ItemContext,
  IItemContextType,
  IActionCleanOptions,
  IPokeElementsType,
} from "../../providers/item";
import equals from "deep-equal";
import { IPropertyDefinitionState } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";

/**
 * The poke actioner information that is passed to the children
 */
export interface IPokeActionerInfoArgType {
  /**
   * Whether one of the properties in the elements to poke
   * is currently invalid
   */
  hasInvalidToPokeProperty: boolean;
  /**
   * Whether one of the includes in the elements to poke
   * is currently invalid
   */
  hasInvalidToPokeInclude: boolean;
  /**
   * Whether one of the policies in the elements to poke
   * is currently invalid
   */
  hasInvalidToPokePolicy: boolean;
  /**
   * All poked elements currently in the item
   * definition
   */
  pokedElements: IPokeElementsType;
  /**
   * The elements to be poked, this is basically the same as
   * the property
   */
  elementsToPoke: IPokeElementsType;
  /**
   * Unpokeseverything
   */
  unpoke: () => void;
  /**
   * Pokes the elements to poke
   */
  pokeElementsToPoke: () => void;
  /**
   * Standard poke functionality
   */
  poke: (elements: IPokeElementsType) => void;
  /**
   * Runs the clean function from the item definition provider
   */
  clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
}

/**
 * The properties for the poke actioner
 */
interface IPokeActionerProps {
  /**
   * The elements that are meant to be poked
   */
  elementsToPoke: IPokeElementsType;
  /**
   * The children argument that uses the actioner
   */
  children: (arg: IPokeActionerInfoArgType) => React.ReactNode;
}

/**
 * The actual props for the actual actioner
 */
interface IActualPokeActionerProps extends IPokeActionerProps {
  itemContext: IItemContextType;
}

/**
 * Used for optimization and to avoid useless re-renders
 */
interface IOptimizerPokeActionerProps {
  children: (arg: IPokeActionerInfoArgType) => React.ReactNode;
  hasInvalidToPokeProperty: boolean;
  hasInvalidToPokeInclude: boolean;
  hasInvalidToPokePolicy: boolean;
  pokedElements: IPokeElementsType;
  elementsToPoke: IPokeElementsType;
  unpoke: () => void;
  poke: (elements: IPokeElementsType) => void;
  clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
}

/**
 * Basically uses a should component update to prevent
 * the function to running with the same argument value
 */
class OptimizerPokeActioner extends React.Component<IOptimizerPokeActionerProps> {
  public shouldComponentUpdate(nextProps: IOptimizerPokeActionerProps) {
    return this.props.children !== nextProps.children ||
      this.props.poke !== nextProps.poke ||
      this.props.clean !== nextProps.clean ||
      this.props.unpoke !== nextProps.unpoke ||
      this.props.hasInvalidToPokeInclude !== nextProps.hasInvalidToPokeInclude ||
      this.props.hasInvalidToPokePolicy !== nextProps.hasInvalidToPokePolicy ||
      this.props.hasInvalidToPokeProperty !== nextProps.hasInvalidToPokeProperty ||
      !equals(this.props.pokedElements, nextProps.pokedElements, { strict: true }) ||
      !equals(this.props.elementsToPoke, nextProps.elementsToPoke, { strict: true });
  }
  public render() {
    return this.props.children({
      hasInvalidToPokeProperty: this.props.hasInvalidToPokeProperty,
      hasInvalidToPokeInclude: this.props.hasInvalidToPokeInclude,
      hasInvalidToPokePolicy: this.props.hasInvalidToPokePolicy,
      pokedElements: this.props.pokedElements,
      elementsToPoke: this.props.elementsToPoke,
      unpoke: this.props.unpoke,
      pokeElementsToPoke: this.props.poke.bind(null, this.props.elementsToPoke),
      poke: this.props.poke,
      clean: this.props.clean,
    });
  }
}

/**
 * This class contains the actual logic for the poke actioner
 */
class ActualPokeActioner extends React.Component<IActualPokeActionerProps> {
  public shouldComponentUpdate(nextProps: IActualPokeActionerProps) {
    // it only updates when these changes, as all the other information is virtually unecessary
    return nextProps.children !== this.props.children ||
      !equals(nextProps.itemContext.pokedElements, this.props.itemContext.pokedElements, { strict: true }) ||
      !equals(nextProps.itemContext.state, this.props.itemContext.state, { strict: true })
  }
  public render() {
    // first we check all the properties from the elements to poke
    const hasInvalidToPokeProperty = this.props.elementsToPoke.properties.some((pId) => {
      // try to find the state
      const propertyState = this.props.itemContext.state.properties.find(pstate => pstate.propertyId === pId);
      if (!propertyState) {
        return false;
      }
      // and see if we have an invalid reason
      return propertyState.invalidReason;
    });

    // we do the same with includes
    const hasInvalidToPokeInclude =Object.keys(this.props.elementsToPoke.includes).some((iId) => {
      if (!this.props.itemContext.state.includes) {
        return false;
      }
      const includeState = this.props.itemContext.state.includes.find((istate) => istate.includeId === iId);
      if (!includeState) {
        return false;
      }
      return includeState.itemState.properties.some((pstate) => pstate.invalidReason);
    });

    // as well as policies
    const hasInvalidToPokePolicy =this.props.elementsToPoke.policies.some((ppath) => {
      const policyTypeSpace = this.props.itemContext.state.policies[ppath[0]];
      if (!policyTypeSpace) {
        return false;
      }
      const policyState = policyTypeSpace[ppath[1]] as IPropertyDefinitionState<any>[];
      if (!policyState || !policyState.length) {
        return false;
      }
      return policyState.some((pstate) => pstate.invalidReason);
    });

    // and we return that to the optimizer
    return (
      <OptimizerPokeActioner
        children={this.props.children}
        hasInvalidToPokeInclude={hasInvalidToPokeInclude}
        hasInvalidToPokeProperty={hasInvalidToPokeProperty}
        hasInvalidToPokePolicy={hasInvalidToPokePolicy}
        pokedElements={this.props.itemContext.pokedElements}
        elementsToPoke={this.props.elementsToPoke}
        unpoke={this.props.itemContext.unpoke}
        poke={this.props.itemContext.poke}
        clean={this.props.itemContext.clean}
      />
    );
  }
}

/**
 * This actioner allows for conditional poking and realizing the state
 * of the elements that are expected to be poked in order to build
 * logic upon them
 *
 * @param props the poke actioner props
 * @returns a react node
 */
export default function PokeActioner(props: IPokeActionerProps) {
  return (
    <ItemContext.Consumer>{
      (itemContext) => (
        <ActualPokeActioner {...props} itemContext={itemContext}/>
      )
    }</ItemContext.Consumer>
  );
}