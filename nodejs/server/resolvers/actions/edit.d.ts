import { IAppDataType } from "../../";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType } from "../../../base/Root/gql";
export declare function editItemDefinition(appData: IAppDataType, resolverArgs: IGraphQLIdefResolverArgs, itemDefinition: ItemDefinition): Promise<{
    DATA: import("../../../gql-querier").IGQLValue;
}>;
export declare function editItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType;
