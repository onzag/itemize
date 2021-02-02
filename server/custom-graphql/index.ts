/**
 * This file provides the utility that builds custom graphql endpoints
 * @packageDocumentation
 */

import { IAppDataType } from "..";
import { IGQLQueryFieldsDefinitionType, IGQLFieldsDefinitionType } from "../../base/Root/gql";
import TOKEN_OBJECT from "./graphql-token-object";
import { EndpointError } from "../../base/errors";
import { jwtSign } from "../token";
import { ENDPOINT_ERRORS, GUEST_METAROLE } from "../../constants";
import { IServerSideTokenDataType } from "../../server/resolvers/basic";

/**
 * The referred token structure specifies information for
 * building a custom token for usage with third party clients
 * eg. sensors or robots
 * 
 * A token can be made with a different role even if it's made in
 * behalf of someone else
 */
export interface IReferredTokenStructure {
  /**
   * Specifies an user id that the token should be built for
   */
  onBehalfOf?: string;
  /**
   * Specifies the role that the token should have, if you don't specify
   * a role and don't have anyone on whom it's made in behalf of, then it'll
   * stick to being a guest
   */
  withRole?: string;
  /**
   * Specifies an expiration date
   */
  expiresIn?: string;
  /**
   * Specifies custom data to pass alongside that token
   * custom data is passed to the item definition triggers
   * so you can perform custom functionality based on it
   * this data should be serializable
   */
  customData?: any;
  /**
   * Will throw an error when this is provided and not provide any token
   */
  error?: string;
}

/**
 * Specifies the definition for a custom token graphql query
 * These queries can be different from the graphql standard
 * as they do not provide the json that they claim to give
 * but rather it's processed again
 */
export interface ICustomTokenGQLQueryDefinition {
  /**
   * This is the resolve function on how to resolve this graphql query
   */
  resolve: (
    /**
     * This is the app data that allows access to both the cache, root and database connection
     * as well as to any service
     */
    appData: IAppDataType,
    /**
     * These are the grapqhl args
     */
    args: {
      source: any;
      args: any;
      context: any;
      info: any;
    }
  ) => IReferredTokenStructure | Promise<IReferredTokenStructure>;

  /**
   * These are the args that the graphql query needs to take
   */
  args?: IGQLFieldsDefinitionType;
}

/**
 * This is the customs tokens query, basically
 * we specify all the extended graphql queries that
 * we want to add
 * 
 * A customs token endpoint always returns a token object type
 */
export interface ICustomTokensType {
  /**
   * The name of the query with the definition
   */
  [name: string]: ICustomTokenGQLQueryDefinition;
}

/**
 * This function contains a customs tokens type into a real
 * graphql definition
 * @param appData the application data
 * @param customTokens the customs token definition
 */
export function buildCustomTokenQueries(
  appData: IAppDataType,
  customTokens: ICustomTokensType,
): IGQLQueryFieldsDefinitionType {
  // so we need to make up the result
  const result: IGQLQueryFieldsDefinitionType = {};
  // and now we take every custom tokens query
  Object.keys(customTokens).forEach((key) => {
    // and add it to the key, we are returning a token object
    result[key] = {
      type: TOKEN_OBJECT,
      // the args that we have specified
      args: customTokens[key].args,
      // now we build the resolve
      resolve: async (source: any, args: any, context: any, info: any) => {
        // call the resolve function specified
        const value = await customTokens[key].resolve(appData, {
          source,
          args,
          context,
          info,
        });

        // if we are giving an error throw an error
        if (value.error) {
          throw new EndpointError({
            message: value.error,
            code: ENDPOINT_ERRORS.INVALID_CREDENTIALS,
          });
        }

        // now add the options
        const options: any = {};
        if (value.expiresIn) {
          options.expiresIn = value.expiresIn;
        }

        const dataToSign: IServerSideTokenDataType = {
          role: value.withRole || GUEST_METAROLE,
          id: value.onBehalfOf || null,
          custom: true,
        };

        if (value.customData) {
          dataToSign.customData = value.customData;
        }

        // so if we are asked in behalf of somebody
        if (value.onBehalfOf) {
          // claim it to be a real user
          dataToSign.isRealUser = true;

          const sqlResult = await appData.cache.requestValue(
            "MOD_users__IDEF_user", value.onBehalfOf, null,
          );

          // we add the sesion id
          dataToSign.sessionId = sqlResult.sessionId;

          // the role is overriden if it was a guest
          if (dataToSign.role === GUEST_METAROLE) {
            dataToSign.role = sqlResult.role;
          }
        }

        // now we can provide and sign the token
        const token = await jwtSign(dataToSign, appData.sensitiveConfig.jwtKey, options);

        // returning it
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
