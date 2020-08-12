import React from "react";
interface ISetVarProps {
    id: string;
    value: any;
}
export default class SetVar extends React.Component<ISetVarProps> {
    static VAR_REGISTRY: {
        [key: string]: any;
    };
    static VAR_LISTENER_REGISTRY: {
        [key: string]: Array<() => void>;
    };
    static addListener(id: string, listener: () => void): void;
    static removeListener(id: string, listener: () => void): void;
    tickle(id: string): void;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: ISetVarProps): boolean;
    componentWillUnmount(): void;
    render(): any;
}
export {};
