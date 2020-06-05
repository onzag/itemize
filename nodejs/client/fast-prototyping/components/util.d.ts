import React from "react";
import { WithStyles } from "@material-ui/core";
import "./util.scss";
interface DelayDisplayProps {
    duration: number;
}
interface DelayDisplayState {
    shown: boolean;
}
export declare class DelayDisplay extends React.PureComponent<DelayDisplayProps, DelayDisplayState> {
    private timer;
    constructor(props: DelayDisplayProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): {};
}
declare const progressingElementStyle: any;
interface IProgressingElementProps extends WithStyles<typeof progressingElementStyle> {
    isProgressing: boolean;
    progressSize?: number;
    children: React.ReactNode;
    delayDuration?: number;
    fullWidth?: boolean;
    className?: string;
}
export declare const ProgressingElement: React.ComponentType<Pick<IProgressingElementProps, "children" | "className" | "fullWidth" | "isProgressing" | "progressSize" | "delayDuration"> & import("@material-ui/core").StyledComponentProps<string>>;
interface SlowLoadingElementProps {
    children: React.ReactNode;
    id: string;
    inline?: boolean;
    onMount?: () => void;
}
interface SlowLoadingElementState {
    isReady: boolean;
    readyForId: string;
}
export declare class SlowLoadingElement extends React.Component<SlowLoadingElementProps, SlowLoadingElementState> {
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
