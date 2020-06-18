import React from "react";
import { IActionCleanOptions, IPokeElementsType } from "../../providers/item-definition";
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
export default function PokeActioner(props: IPokeActionerProps): JSX.Element;
export {};
