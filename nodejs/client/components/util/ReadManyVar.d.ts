import React from "react";
interface IReadManyVarProps {
    ids: string[];
    children: (value: any[]) => React.ReactNode;
}
export default class ReadManyVar extends React.PureComponent<IReadManyVarProps> {
    private isUnmounted;
    constructor(props: IReadManyVarProps);
    onTickled(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IReadManyVarProps): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
export {};
