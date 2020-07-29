/**
 * Allows for fine control of the scroll position using
 * react, as it keeps it based on the same id
 *
 * it's a memory leaky implementation but should do just fine
 *
 * @packageDocumentation
 */
import React from "react";
/**
 * The properties of the scroll keeper
 */
interface IScrollKeeperProps {
    /**
     * The id to use, different ids mean different scroll positions
     */
    id: string;
    /**
     * whether to mantain an older stored position, changing using the scroll
     * keeper will just keep the scroll to 0 on top on a different id
     */
    mantainPosition?: boolean;
    /**
     * the children to render
     */
    children?: React.ReactNode;
}
/**
 * The scroll keeper allows to keep the scroll on position 0 or on a stored
 * position
 */
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
