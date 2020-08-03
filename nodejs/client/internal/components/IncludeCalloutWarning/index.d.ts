/**
 * This is the include callout warning handler that handles how the include callout warning
 * is supposed to be shown
 * @packageDocumentation
 */
import React from "react";
import Include, { IIncludeState } from "../../../../base/Root/Module/ItemDefinition/Include";
import { IRendererProps } from "../../renderer";
/**
 * The include callout warning handler props that will generate
 * a handler in order to make it up for the include callout
 * warning
 */
interface IIncludeCalloutWarningHandlerProps {
    /**
     * The include in question
     */
    include: Include;
    /**
     * The state of the include
     */
    state: IIncludeState;
    /**
     * The renderer to use rather than the default
     */
    renderer?: React.ComponentType<IIncludeCalloutWarningRendererProps>;
    /**
     * the renderer args to use
     */
    rendererArgs?: object;
}
export interface IIncludeCalloutWarningRendererProps extends IRendererProps {
    warning: string;
    active: boolean;
}
export default function IncludeCalloutWarning(props: IIncludeCalloutWarningHandlerProps): JSX.Element;
export {};
