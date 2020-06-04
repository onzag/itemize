import { IAppDataType } from "../../";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType } from "../../../base/Root/gql";
export declare function addItemDefinition(appData: IAppDataType, resolverArgs: IGraphQLIdefResolverArgs, resolverItemDefinition: ItemDefinition): Promise<{
    DATA: import("../../../gql-querier").IGQLValue;
}>;
export declare function addItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType;
