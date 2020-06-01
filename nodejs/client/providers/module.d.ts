import React from "react";
import Module from "../../base/Root/Module";
import { RemoteListener } from "../internal/app/remote-listener";
export interface IModuleContextType {
    mod: Module;
    remoteListener: RemoteListener;
}
export declare const ModuleContext: React.Context<IModuleContextType>;
interface IModuleProviderProps {
    children: any;
    module: string;
}
export declare function ModuleProvider(props: IModuleProviderProps): JSX.Element;
export {};
