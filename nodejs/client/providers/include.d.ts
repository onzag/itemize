import React from "react";
import Include, { IIncludeState } from "../../base/Root/Module/ItemDefinition/Include";
export interface IIncludeContext {
    include: Include;
    state: IIncludeState;
}
export declare const IncludeContext: React.Context<IIncludeContext>;
interface IIncludeProviderProps {
    children: any;
    item: string;
}
export declare function IncludeProvider(props: IIncludeProviderProps): JSX.Element;
export {};
