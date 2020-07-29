/**
 * The title setter allows to set the title of the application dinamically
 * despite of where we are in the app
 *
 * @packageDocumentation
 */
import React from "react";
import { ActualTitleReader } from "./TitleReader";
/**
 * The title setter props, takes a string children
 */
interface ITitleSetterProps {
    children: string;
}
/**
 * The title setter allows to set the title of the application dinamically
 * despite of where we are in the app
 *
 * Do not have two title setters at once as this would cause an error
 */
export default class TitleSetter extends React.Component<ITitleSetterProps, {}> {
    /**
     * Stores title readers to inform them of changes
     */
    static changedListeners: Map<ActualTitleReader, () => void>;
    /**
     * the original title before this was mounted
     */
    private originalTitle;
    constructor(props: ITitleSetterProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: ITitleSetterProps): void;
    componentWillUnmount(): void;
    render(): React.ReactNode;
}
export {};
