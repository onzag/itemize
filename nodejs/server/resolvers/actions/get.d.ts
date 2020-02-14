import { IAppDataType } from "../../";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType, FGraphQLModResolverType } from "../../../base/Root/gql";
import Module from "../../../base/Root/Module";
export declare function getItemDefinition(appData: IAppDataType, resolverArgs: IGraphQLIdefResolverArgs, itemDefinition: ItemDefinition): Promise<any>;
export declare function getItemDefinitionList(appData: IAppDataType, resolverArgs: IGraphQLIdefResolverArgs, itemDefinition: ItemDefinition): Promise<{
    results: any[];
}>;
export declare function getModuleList(appData: IAppDataType, resolverArgs: IGraphQLIdefResolverArgs, mod: Module): Promise<{
    results: any[];
}>;
export declare function getItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType;
export declare function getItemDefinitionListFn(appData: IAppDataType): FGraphQLIdefResolverType;
export declare function getModuleListFn(appData: IAppDataType): FGraphQLModResolverType;
