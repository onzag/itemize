import PokeActioner from "./PokeActioner";
import React from "react";
import { IPokeElementsType } from "../../providers/item-definition";
import equals from "deep-equal";

interface IPokeButtonActionerArg {
  onAction: () => void;
}

interface IPokeButtonActionerProps {
  onSuccess: () => void;
  onFail?: () => void;
  onPoke?: () => void;
  unpokeOnSuccess: boolean;
  elementsToPoke: IPokeElementsType;
  children: (arg: IPokeButtonActionerArg) => React.ReactNode;
}

export default function PokeButtonActioner(props: IPokeButtonActionerProps) {
  return (
    <PokeActioner elementsToPoke={props.elementsToPoke}>
      {(arg) => {
        const isInvalid = arg.hasInvalidToPokeInclude || arg.hasInvalidToPokePolicy || arg.hasInvalidToPokeProperty;
        const onAction = () => {
          if (isInvalid && !equals(props.elementsToPoke, arg.pokedElements)) {
            arg.poke(props.elementsToPoke);
            props.onPoke && props.onPoke();
            props.onFail && props.onFail();
            return;
          } else if (isInvalid) {
            props.onFail && props.onFail();
            return;
          }
          if (props.unpokeOnSuccess) {
            arg.clean({
              unpokeAfterAny: true,
            }, "success");
          }

          props.onSuccess();
        };

        return props.children({onAction});
      }}
    </PokeActioner>
  )
}