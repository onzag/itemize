/**
 * Contains the poke actioner class that allows to interact with poked elements,
 * poked elements by are meant display errors and their actual status, as
 * "they have been poked by the user" in some way or form
 *
 * @packageDocumentation
 */
import React from "react";
import { IActionCleanOptions, IPokeElementsType } from "../../providers/item";
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
 * This actioner allows for conditional poking and realizing the state
 * of the elements that are expected to be poked in order to build
 * logic upon them
 *
 * @param props the poke actioner props
 * @returns a react node
 */
export default function PokeActioner(props: IPokeActionerProps): JSX.Element;
export {};
