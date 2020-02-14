import { IAppDataType } from "../../";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import { IGraphQLIdefResolverArgs, FGraphQLIdefResolverType } from "../../../base/Root/gql";
export declare function deleteItemDefinition(appData: IAppDataType, resolverArgs: IGraphQLIdefResolverArgs, itemDefinition: ItemDefinition): Promise<any>;
export declare function deleteItemDefinitionFn(appData: IAppDataType): FGraphQLIdefResolverType;
