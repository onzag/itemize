/**
 * Contains logic for the implementation of a button that pokes elements once pressed, it's built
 * on top of the poke actioner
 *
 * @module
 */

import PokeActioner from "./PokeActioner";
import React from "react";
import { IPokeElementsType } from "../../providers/item";
import equals from "deep-equal";

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
export default function PokeButtonActioner(props: IPokeButtonActionerProps) {
  // for that we need the poke actioner
  return (
    <PokeActioner elementsToPoke={props.elementsToPoke}>
      {(arg) => {
        // now we need to check if anything is invalid
        const isInvalid = arg.hasInvalidToPokeInclude || arg.hasInvalidToPokePolicy || arg.hasInvalidToPokeProperty;
        // and with that we update the action
        const onAction = () => {
          // so as you can see if it's invalid and our poked elements are
          // not what we are expected to poke, as in, it might be unpoked
          // and our poke actioner hasn't kicked in
          if (isInvalid && !equals(props.elementsToPoke, arg.pokedElements, { strict: true })) {
            // we run the poke function
            arg.poke(props.elementsToPoke);
            // call on poke
            props.onPoke && props.onPoke();
            // call on fail as it's indeed invalid
            props.onFail && props.onFail();
            return;
          } else if (isInvalid) {
            // otherwise if it's just invalid and we already are poked
            // we just call on fail
            props.onFail && props.onFail();
            return;
          }

          // this line is now for success only

          // if we are suppossed to unpoke after success, we do it
          if (props.unpokeOnSuccess) {
            arg.clean({
              unpokeAfterAny: true,
            }, "success");
          }

          // call the on success function
          props.onSuccess();
        };

        // return the actioner
        return props.children({onAction});
      }}
    </PokeActioner>
  )
}