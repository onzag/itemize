"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCustomTokenQueries = void 0;
const graphql_token_object_1 = __importDefault(require("./graphql-token-object"));
const errors_1 = require("../../base/errors");
const token_1 = require("../token");
const constants_1 = require("../../constants");
function buildCustomTokenQueries(appData, customTokens) {
    const result = {};
    Object.keys(customTokens).forEach((key) => {
        result[key] = {
            type: graphql_token_object_1.default,
            args: customTokens[key].args,
            resolve: async (source, args, context, info) => {
                const value = await customTokens[key].resolve(appData, {
                    source,
                    args,
                    context,
                    info,
                });
                if (value.error) {
                    throw new errors_1.EndpointError({
                        message: value.error,
                        code: constants_1.ENDPOINT_ERRORS.INVALID_CREDENTIALS,
                    });
                }
                const options = {};
                if (value.expiresIn) {
                    options.expiresIn = value.expiresIn;
                }
                const dataToSign = {
                    role: value.withRole,
                    id: value.onBehalfOf || null,
                    custom: true,
                };
                if (value.customData) {
                    dataToSign.customData = value.customData;
                }
                if (value.onBehalfOf) {
                    dataToSign.isRealUser = true;
                    const sqlResult = await appData.cache.requestValue("MOD_users__IDEF_user", value.onBehalfOf, null);
                    dataToSign.sessionId = sqlResult.sessionId;
                }
                const token = await token_1.jwtSign(dataToSign, appData.sensitiveConfig.jwtKey, options);
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
exports.buildCustomTokenQueries = buildCustomTokenQueries;
