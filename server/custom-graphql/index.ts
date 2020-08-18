import { IAppDataType } from "..";
import { IGQLQueryFieldsDefinitionType, IGQLFieldsDefinitionType } from "../../base/Root/gql";
import TOKEN_OBJECT from "./graphql-token-object";
import { EndpointError } from "../../base/errors";
import { jwtSign } from "../token";
import { ENDPOINT_ERRORS } from "../../constants";
import { IServerSideTokenDataType } from "../../server/resolvers/basic";

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
  }) => IReferredTokenStructure | Promise<IReferredTokenStructure>;
  args?: IGQLFieldsDefinitionType;
}

export interface ICustomTokensType {
  [name: string]: ICustomTokenGQLQueryDefinition;
}

export function buildCustomTokenQueries(
  appData: IAppDataType,
  customTokens: ICustomTokensType,
): IGQLQueryFieldsDefinitionType {
  const result: IGQLQueryFieldsDefinitionType = {};
  Object.keys(customTokens).forEach((key) => {
    result[key] = {
      type: TOKEN_OBJECT,
      args: customTokens[key].args,
      resolve: async (source: any, args: any, context: any, info: any) => {
        const value = await customTokens[key].resolve(appData, {
          source,
          args,
          context,
          info,
        });

        if (value.error) {
          throw new EndpointError({
            message: value.error,
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        }

        const options: any = {};
        if (value.expiresIn) {
          options.expiresIn = value.expiresIn;
        }

        const dataToSign: IServerSideTokenDataType = {
          role: value.withRole,
          id: value.onBehalfOf || null,
          custom: true,
        };

        if (value.customData) {
          dataToSign.customData = value.customData;
        }

        if (value.onBehalfOf) {
          dataToSign.isRealUser = true;

          const sqlResult = await appData.cache.requestValue(
            ["MOD_users__IDEF_user", "MOD_users"], value.onBehalfOf, null,
          );

          dataToSign.sessionId = sqlResult.sessionId;
        }

        const token = await jwtSign(dataToSign, appData.sensitiveConfig.jwtKey, options);

        return {
          token,
          id: value.onBehalfOf || null,
          role: value.withRole,
        };
      },
    };
  });
  return result;
}
