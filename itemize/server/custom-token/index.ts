import { IAppDataType, ICustomTokensType } from "..";
import { IGQLQueryFieldsDefinitionType } from "../../base/Root/gql";
import TOKEN_OBJECT from "./graphql-token-object";
import { EndpointError } from "../../base/errors";
import { jwtSign } from "../token";

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
            code: "INVALID_CREDENTIALS",
          });
        }

        const options: any = {};
        if (value.expiresIn) {
          options.expiresIn = value.expiresIn;
        }

        const token = await jwtSign({
          role: value.withRole,
          id: value.onBehalfOf || null,
        }, appData.config.jwtKey, options);

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
