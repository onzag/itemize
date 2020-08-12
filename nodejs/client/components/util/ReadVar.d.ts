import React from "react";
interface IReadVarProps {
    id: string;
    children: (value: any) => React.ReactNode;
}
export default class ReadVar extends React.PureComponent<IReadVarProps> {
    private isUnmounted;
    constructor(props: IReadVarProps);
    onTickled(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IReadVarProps): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
export {};
