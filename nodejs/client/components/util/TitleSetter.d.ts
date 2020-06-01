import React from "react";
import TitleReader from "./TitleReader";
interface ITitleSetterProps {
    children: string;
}
export default class TitleSetter extends React.Component<ITitleSetterProps, {}> {
    static changedListeners: Map<TitleReader, () => void>;
    private originalTitle;
    constructor(props: ITitleSetterProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: ITitleSetterProps): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
export {};
