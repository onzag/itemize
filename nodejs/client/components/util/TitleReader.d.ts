import React from "react";
interface ActualTitleReaderProps {
    ssrTitle: string;
}
export declare class ActualTitleReader extends React.Component<ActualTitleReaderProps, {}> {
    private hasRenderedInitial;
    constructor(props: ActualTitleReaderProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): string;
}
export default function TitleReader(): JSX.Element;
export {};
