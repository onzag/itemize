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
}
interface ActualSlowLoadingElementState {
    isReady: boolean;
    readyForId: string;
}
interface ActualSlowLoadingElementProps extends SlowLoadingElementProps {
    ssrDisabled: boolean;
}
export declare class ActualSlowLoadingElement extends React.Component<ActualSlowLoadingElementProps, ActualSlowLoadingElementState> {
    private unmounted;
    static getDerivedStateFromProps(props: SlowLoadingElementProps, state: ActualSlowLoadingElementState): Partial<ActualSlowLoadingElementState>;
    constructor(props: ActualSlowLoadingElementProps);
    makeReady(): void;
    shouldComponentUpdate(nextProps: SlowLoadingElementProps, nextState: ActualSlowLoadingElementState): boolean;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    render(): {};
}
export declare function SlowLoadingElement(props: SlowLoadingElementProps): JSX.Element;
export {};
