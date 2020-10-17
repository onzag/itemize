/**
 * The description setter allows to set the description of the application
 * this setter only has effect server side
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The title setter props, takes a string children
 */
interface IDescriptionSetterProps {
    children: string;
    type?: "og" | "meta" | "both";
}
/**
 * This setter only has an effect server side and client side it effectively returns null
 * and does nothing, this setter is useful for SSR
 */
export default class DescriptionSetter extends React.Component<IDescriptionSetterProps, {}> {
    render(): JSX.Element;
}
export {};
