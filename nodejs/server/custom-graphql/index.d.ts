import { IAppDataType } from "..";
import { IGQLQueryFieldsDefinitionType, IGQLFieldsDefinitionType } from "../../base/Root/gql";
export interface IReferredTokenStructure {
    onBehalfOf?: number;
    withRole: string;
    expiresIn?: string;
    customData?: any;
    error?: string;
}
export interface ICustomTokenGQLQueryDefinition {
    resolve: (appData: IAppDataType, args: {
        source: any;
        args: any;
        context: any;
        info: any;
    }) => IReferredTokenStructure | Promise<IReferredTokenStructure>;
    args?: IGQLFieldsDefinitionType;
}
export interface ICustomTokensType {
    [name: string]: ICustomTokenGQLQueryDefinition;
}
export declare function buildCustomTokenQueries(appData: IAppDataType, customTokens: ICustomTokensType): IGQLQueryFieldsDefinitionType;
