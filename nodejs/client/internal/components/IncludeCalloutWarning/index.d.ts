import React from "react";
import Include, { IIncludeState } from "../../../../base/Root/Module/ItemDefinition/Include";
import { IRendererProps } from "../../renderer";
interface IIncludeCalloutWarningProps {
    include: Include;
    state: IIncludeState;
    renderer?: React.ComponentType<IIncludeCalloutWarningRendererProps>;
    rendererArgs?: object;
}
export interface IIncludeCalloutWarningRendererProps extends IRendererProps {
    warning: string;
    active: boolean;
}
export default function IncludeCalloutWarning(props: IIncludeCalloutWarningProps): JSX.Element;
export {};
