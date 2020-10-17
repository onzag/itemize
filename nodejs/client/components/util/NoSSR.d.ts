/**
 * Allows to disable SSR to a given section of code, only takes into effect
 * if the server detects SSR is being used otherwise will render normally
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The no ssr props
 */
interface INoSSRProps {
    children: React.ReactNode;
}
/**
 * This SSR disabler is clever, if you are in a non-ssr context it will render
 * immediately, however if you are in a SSR enabled context then it will use a double
 * pass, this will ensure things are in sync
 * @param props the props
 */
export default function NoSSR(props: INoSSRProps): JSX.Element;
export {};
