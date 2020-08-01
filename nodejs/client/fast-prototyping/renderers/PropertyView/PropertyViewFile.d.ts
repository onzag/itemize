/**
 * Contains the property view file renderer
 *
 * @packageDocumentation
 */
import React from "react";
import { IPropertyViewFileRendererProps } from "../../../internal/components/PropertyView/PropertyViewFile";
/**
 * The state for the file
 */
interface IPropertyViewFileRendererState {
    /**
     * Basically when the image is loaded
     */
    loaded: boolean;
}
/**
 * The property view file renderer will show a file, and if it's an image
 * it will show as an image with all lazyloading and all
 *
 * supported args:
 * - NullComponent: a react component to use rather than the default if the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - imageClassName: the image class name for the img tag when an image is available
 * - imageSizes: the image sizes for the sizes attribute for the image, default 70vw
 * - lazyLoad: whether to use lazyloading for images alone
 */
export default class PropertyViewFileRenderer extends React.Component<IPropertyViewFileRendererProps, IPropertyViewFileRendererState> {
    /**
     * whether the scroll event is actually attached
     */
    private isScrollEventAttached;
    /**
     * The image reference
     */
    private refImg;
    /**
     * Intersection observer to see when the element pops into view, if necessary
     */
    private io;
    /**
     * Builds the renderer
     * @param props the handler passed props
     */
    constructor(props: IPropertyViewFileRendererProps);
    /**
     * Attach the scroll event, only necessary for traditional
     * lazyloading
     */
    attachScrollEvent(): void;
    /**
     * Removes the attached scroll event for lazyloading
     */
    removeScrollEvent(): void;
    /**
     * Old school way to check if an element is in view
     */
    checkWhetherInViewOldSchool(): void;
    /**
     * Intersection observer way to check if the image is in view
     */
    setupIntersectionObserver(): void;
    /**
     * Remove the intersection observer if it exist
     * it might have never been triggered
     */
    removeIntersectionObserver(): void;
    /**
     * Now when the element mounts
     */
    componentDidMount(): void;
    componentDidUpdate(prevProps: IPropertyViewFileRendererProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
