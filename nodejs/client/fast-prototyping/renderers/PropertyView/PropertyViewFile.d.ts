import React from "react";
import { IPropertyViewFileRendererProps } from "../../../internal/components/PropertyView/PropertyViewFile";
interface IPropertyViewFileRendererState {
    loaded: boolean;
}
export default class PropertyViewFileRenderer extends React.Component<IPropertyViewFileRendererProps, IPropertyViewFileRendererState> {
    private isScrollEventAttached;
    private refImg;
    private io;
    constructor(props: IPropertyViewFileRendererProps);
    attachScrollEvent(): void;
    removeScrollEvent(): void;
    checkWhetherInViewOldSchool(): void;
    setupIntersectionObserver(): void;
    removeIntersectionObserver(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IPropertyViewFileRendererProps): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
