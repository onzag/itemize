import { IAppDataType } from "../../../server";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType, FGraphQLModResolverType } from "../../../base/Root/gql";
import Module from "../../../base/Root/Module";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import { IGQLSearchMatch } from "../../../gql-querier";
export declare function searchModule(appData: IAppDataType, resolverArgs: IGraphQLIdefResolverArgs, mod: Module): Promise<{
    records: IGQLSearchMatch[];
    last_record: IGQLSearchMatch;
}>;
export declare function searchItemDefinition(appData: IAppDataType, resolverArgs: IGraphQLIdefResolverArgs, itemDefinition: ItemDefinition): Promise<{
    records: IGQLSearchMatch[];
    last_record: IGQLSearchMatch;
}>;
export declare function searchItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType;
export declare function searchModuleFn(appData: IAppDataType): FGraphQLModResolverType;
