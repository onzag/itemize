import React from "react";
import {
  ItemDefinitionContext,
  IItemDefinitionContextType,
  IActionCleanOptions,
  IPokeElementsType,
} from "../../providers/item-definition";
import equals from "deep-equal";
import { IPropertyDefinitionState } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";

export interface IPokeActionerInfoArgType {
  hasInvalidToPokeProperty: boolean;
  hasInvalidToPokeInclude: boolean;
  hasInvalidToPokePolicy: boolean;
  pokedElements: IPokeElementsType;
  elementsToPoke: IPokeElementsType;
  unpoke: () => void;
  pokeElementsToPoke: () => void;
  poke: (elements: IPokeElementsType) => void;
  clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
}

interface IPokeActionerProps {
  elementsToPoke: IPokeElementsType;
  children: (arg: IPokeActionerInfoArgType) => React.ReactNode;
}

interface IActualPokeActionerProps extends IPokeActionerProps {
  itemDefinitionContext: IItemDefinitionContextType;
}

class ActualPokeActioner extends React.Component<IActualPokeActionerProps, {}> {
  public shouldComponentUpdate(nextProps: IActualPokeActionerProps) {
    return nextProps.children !== this.props.children ||
      !equals(nextProps.itemDefinitionContext.pokedElements, this.props.itemDefinitionContext.pokedElements) ||
      !equals(nextProps.itemDefinitionContext.state, this.props.itemDefinitionContext.state)
  }
  public render() {
    const hasInvalidToPokeProperty = this.props.elementsToPoke.properties.some((pId) => {
      const propertyState = this.props.itemDefinitionContext.state.properties.find(pstate => pstate.propertyId === pId);
      if (!propertyState) {
        return false;
      }
      return propertyState.invalidReason;
    });
    const hasInvalidToPokeInclude =this.props.elementsToPoke.includes.some((iId) => {
      if (!this.props.itemDefinitionContext.state.includes) {
        return false;
      }
      const includeState = this.props.itemDefinitionContext.state.includes.find((istate) => istate.includeId === iId);
      if (!includeState) {
        return false;
      }
      return includeState.itemDefinitionState.properties.some((pstate) => pstate.invalidReason);
    });
    const hasInvalidToPokePolicy =this.props.elementsToPoke.policies.some((ppath) => {
      const policyTypeSpace = this.props.itemDefinitionContext.state.policies[ppath[0]];
      if (!policyTypeSpace) {
        return false;
      }
      const policyState = policyTypeSpace[ppath[1]] as IPropertyDefinitionState[];
      if (!policyState || !policyState.length) {
        return false;
      }
      return policyState.some((pstate) => pstate.invalidReason);
    });
    return this.props.children({
      hasInvalidToPokeProperty,
      hasInvalidToPokeInclude,
      hasInvalidToPokePolicy,
      pokedElements: this.props.itemDefinitionContext.pokedElements,
      elementsToPoke: this.props.elementsToPoke,
      unpoke: this.props.itemDefinitionContext.unpoke,
      pokeElementsToPoke: this.props.itemDefinitionContext.poke.bind(null, this.props.elementsToPoke),
      poke: this.props.itemDefinitionContext.poke,
      clean: this.props.itemDefinitionContext.clean,
    });
  }
}

export default function PokeActioner(props: IPokeActionerProps) {
  return (
    <ItemDefinitionContext.Consumer>{
      (itemDefinitionContext) => (
        <ActualPokeActioner {...props} itemDefinitionContext={itemDefinitionContext}/>
      )
    }</ItemDefinitionContext.Consumer>
  );
}