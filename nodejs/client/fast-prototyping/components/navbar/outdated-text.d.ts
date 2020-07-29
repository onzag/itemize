/**
 * The outdated text similarly to the outdated dialog will pop up if the app is outdated
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The props are simple it just takes a click event
 * normally this will pop the outdated dialog or otherwise reload
 */
interface OutdatedTextProps {
    onClick: (e: React.MouseEvent) => void;
}
/**
 * Displays an outdated text in the navbar when the app is outdated
 * @param props the props for the outated text
 * @returns a react element
 */
export declare function OutdatedText(props: OutdatedTextProps): JSX.Element;
export {};
