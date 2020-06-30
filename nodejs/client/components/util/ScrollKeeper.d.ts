import React from "react";
interface IScrollKeeperProps {
    id: string;
    mantainPosition?: boolean;
    children?: React.ReactNode;
}
export default class ScrollKeeper extends React.PureComponent<IScrollKeeperProps> {
    constructor(props: IScrollKeeperProps);
    recalculateScroll(): void;
    onScroll(): void;
    addEventListenerForScroll(): void;
    removeEventListenerForScroll(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: IScrollKeeperProps): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
export {};
