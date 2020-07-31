/**
 * Contains fast prototyping utilities for fast developing
 *
 * @packageDocumentation
 */
import React from "react";
import { WithStyles } from "../mui-core";
import "./util.scss";
/**
 * The progressing element sytle for the progressing element
 */
declare const progressingElementStyle: any;
/**
 * Progressing element props
 */
interface IProgressingElementProps extends WithStyles<typeof progressingElementStyle> {
    /**
     * Whether it is currently progressing
     */
    isProgressing: boolean;
    /**
     * The size of the progressing circle (optional) default 24
     */
    progressCircleSize?: number;
    /**
     * The children to add into it
     */
    children: React.ReactNode;
    /**
     * The delay duration to show this progress happening, the default is 300
     */
    delayDuration?: number;
    /**
     * Whether to use full 100% width
     */
    fullWidth?: boolean;
    /**
     * The class name of the progress wrapper
     */
    className?: string;
}
/**
 * Shows a loading circle on top of a component to show that such is loading
 * @param props the loading props
 * @returns a react component
 */
export declare const ProgressingElement: React.ComponentType<Pick<IProgressingElementProps, "children" | "className" | "fullWidth" | "isProgressing" | "progressCircleSize" | "delayDuration"> & import("@material-ui/styles").StyledComponentProps<string>>;
/**
 * The slow loading element props
 */
interface SlowLoadingElementProps {
    /**
     * The children that are slow loading
     */
    children: React.ReactNode;
    /**
     * An id
     */
    id: string;
    /**
     * Wheter the display is inline
     */
    inline?: boolean;
    /**
     * triggers once the item has mounted
     */
    onMount?: () => void;
}
/**
 * The slow loading state
 */
interface SlowLoadingElementState {
    /**
     * Whether it is ready
     */
    isReady: boolean;
    /**
     * ready for which id
     */
    readyForId: string;
}
/**
 * Some elements can be fairly heavy and slow loading, this component will detach the execution of some of these components
 * so that they don't have to slow down the execution of other code, doesn't play nice with SSR
 */
export declare class SlowLoadingElement extends React.Component<SlowLoadingElementProps, SlowLoadingElementState> {
    /**
     * Becomes true once unmounted, avoid setState on
     * unmounted components if the element really takes a while
     * to load
     */
    private unmounted;
    static getDerivedStateFromProps(props: SlowLoadingElementProps, state: SlowLoadingElementState): Partial<SlowLoadingElementState>;
    constructor(props: SlowLoadingElementProps);
    makeReady(): void;
    shouldComponentUpdate(nextProps: SlowLoadingElementProps, nextState: SlowLoadingElementState): boolean;
    componentDidMount(): void;
    componentDidUpdate(prevProps: SlowLoadingElementProps, prevState: SlowLoadingElementState): void;
    componentWillUnmount(): void;
    render(): {};
}
export {};
