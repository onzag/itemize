/**
 * Contains logic for the implementation of a button that pokes elements once pressed, it's built
 * on top of the poke actioner
 *
 * @packageDocumentation
 */
import React from "react";
import { IPokeElementsType } from "../../providers/item";
/**
 * The actioner arg, basically passes what is supposed
 * to be the click handler for this button
 */
interface IPokeButtonActionerArg {
    onAction: () => void;
}
/**
 * The props for the poke button actioner
 */
interface IPokeButtonActionerProps {
    /**
     * Triggers if no property from the elements to poke
     * is invalid, it means it's successful
     */
    onSuccess: () => void;
    /**
     * Triggers if some property from the elements to poke
     * is invalid, means it failed
     */
    onFail?: () => void;
    /**
     * Triggers after called a poke event
     */
    onPoke?: () => void;
    /**
     * Basically removes all poked fields on success
     */
    unpokeOnSuccess: boolean;
    /**
     * What is it we are working with
     */
    elementsToPoke: IPokeElementsType;
    /**
     * Passes the actioner to the children
     */
    children: (arg: IPokeButtonActionerArg) => React.ReactNode;
}
/**
 * The poke button actioner allows to create a button that contains poke logic
 * this is very useful for creating some form of wizard or dialog that needs
 * valid data filled
 *
 * @param props the props
 * @returns a react node
 */
export default function PokeButtonActioner(props: IPokeButtonActionerProps): JSX.Element;
export {};
