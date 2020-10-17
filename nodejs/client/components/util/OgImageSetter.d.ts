/**
 * The description setter allows to set the description of the application
 * this setter only has effect server side
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The og image setter props, takes a string children
 */
interface IOgImageSetterProps {
    children: string;
    defaultURL?: string;
}
/**
 * This setter only has an effect server side and client side it effectively returns null
 * and does nothing, this setter is useful for SSR
 */
export default class OgImageSetter extends React.Component<IOgImageSetterProps, {}> {
    render(): JSX.Element;
}
export {};
