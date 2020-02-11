"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawSensitiveConfigSchema = {
    type: "object",
    properties: {
        ipStackAccessKey: {
            type: "string",
        },
        hereAppID: {
            type: "string",
        },
        hereAppCode: {
            type: "string",
        },
        jwtKey: {
            type: "string",
        },
    },
    additionalProperties: false,
    required: [
        "ipStackAccessKey",
        "hereAppID",
        "hereAppCode",
        "jwtKey",
    ],
};
exports.rawConfigSchema = {
    type: "object",
    properties: {
        entry: {
            type: "string",
        },
        appName: {
            type: "string",
        },
        port: {
            type: "number",
        },
        supportedLanguages: {
            type: "array",
            items: {
                type: "string",
            },
        },
        rtlLanguages: {
            type: "array",
            items: {
                type: "string",
            },
        },
        dictionaries: {
            type: "object",
            additionalProperties: {
                type: "string",
            },
        },
        roles: {
            type: "array",
            items: {
                type: "string",
            },
        },
        manifest: {
            type: "object",
            properties: {
                macSafariMaskIconThemeColor: {
                    type: "string",
                },
                msTileColor: {
                    type: "string",
                },
                themeColor: {
                    type: "string",
                },
                backgroundColor: {
                    type: "string",
                },
            },
        },
        fallbackCountryCode: {
            type: "string",
        },
        fallbackLanguage: {
            type: "string",
        },
        fallbackCurrency: {
            type: "string",
        },
        developmentHostname: {
            type: "string",
        },
        stagingHostname: {
            type: "string",
        },
        productionHostname: {
            type: "string",
        },
    },
    additionalProperties: false,
    required: [
        "entry",
        "appName",
        "port",
        "supportedLanguages",
        "rtlLanguages",
        "dictionaries",
        "roles",
        "manifest",
        "fallbackCountryCode",
        "fallbackLanguage",
        "fallbackCurrency",
        "developmentHostname",
        "stagingHostname",
        "productionHostname",
    ],
};
exports.rawDBConfigSchema = {
    type: "object",
    properties: {
        host: {
            type: "string",
        },
        port: {
            type: "number",
        },
        user: {
            type: "string",
        },
        database: {
            type: "string",
        },
        password: {
            type: "string",
        },
    },
    additionalProperties: false,
    required: [
        "host",
        "port",
        "user",
        "database",
        "password",
    ],
};
exports.rawRedisConfigSchema = {
    type: "object",
    properties: {
        host: {
            type: "string",
        },
        port: {
            type: "number",
        },
        path: {
            type: "string",
        },
        db: {
            type: "number",
        },
        password: {
            type: "string",
        },
    },
    additionalProperties: false,
};
