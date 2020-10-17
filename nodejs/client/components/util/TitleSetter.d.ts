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
    type?: "document" | "og" | "both";
}
/**
 * The title setter allows to set the title of the application dinamically
 * despite of where we are in the app
 *
 * Do not have two title setters at once as this would cause an error
 */
export declare class ActualTitleSetter extends React.Component<ITitleSetterProps, {}> {
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
/**
 * The title setter allows to set the title of the application dinamically
 *
 * If set in the og mode it will not do anything and it does not update the og
 * dinamically, only the document or both mode does it; the og mode is for server
 * use only
 */
export default class TitleSetter extends React.Component<ITitleSetterProps, {}> {
    constructor(props: ITitleSetterProps);
    render(): JSX.Element;
}
export {};
