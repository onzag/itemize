import React from "react";
import { IPokeElementsType } from "../../providers/item-definition";
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
export default function PokeButtonActioner(props: IPokeButtonActionerProps): JSX.Element;
export {};
