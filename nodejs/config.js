"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawSensitiveConfigSchema = {
    type: "object",
    properties: {
        ipStackAccessKey: {
            anyOf: [
                {
                    "type": "string",
                },
                {
                    "type": "null"
                }
            ],
        },
        ipStackHttpsEnabled: {
            type: "boolean",
        },
        currencyLayerAccessKey: {
            anyOf: [
                {
                    "type": "string",
                },
                {
                    "type": "null"
                }
            ],
        },
        currencyLayerHttpsEnabled: {
            type: "boolean",
        },
        hereAppID: {
            anyOf: [
                {
                    "type": "string",
                },
                {
                    "type": "null"
                }
            ],
        },
        hereAppCode: {
            anyOf: [
                {
                    "type": "string",
                },
                {
                    "type": "null"
                }
            ],
        },
        mailgunAPIKey: {
            anyOf: [
                {
                    "type": "string",
                },
                {
                    "type": "null"
                }
            ],
        },
        mailgunDomain: {
            anyOf: [
                {
                    "type": "string",
                },
                {
                    "type": "null"
                }
            ],
        },
        mailgunAPIHost: {
            anyOf: [
                {
                    "type": "string",
                },
                {
                    "type": "null"
                }
            ],
        },
        mailgunTargetDomain: {
            anyOf: [
                {
                    "type": "string",
                },
                {
                    "type": "null"
                }
            ],
        },
        jwtKey: {
            type: "string",
        },
        devKey: {
            type: "string",
        },
        openstackContainers: {
            type: "object",
            additionalProperties: {
                type: "object",
                properties: {
                    username: {
                        type: "string",
                    },
                    password: {
                        type: "string",
                    },
                    region: {
                        type: "string",
                    },
                    domainId: {
                        type: "string",
                    },
                    domainName: {
                        type: "string",
                    },
                    containerName: {
                        type: "string",
                    },
                    authUrl: {
                        type: "string",
                    },
                },
                required: [
                    "username",
                    "password",
                    "region",
                    "domainId",
                    "domainName",
                    "containerName",
                    "authUrl",
                ],
            },
            minProperties: 1,
        },
        defaultContainerID: {
            type: "string",
        },
    },
    additionalProperties: false,
    required: [
        "ipStackAccessKey",
        "ipStackHttpsEnabled",
        "currencyLayerAccessKey",
        "currencyLayerHttpsEnabled",
        "defaultContainerID",
        "hereAppID",
        "hereAppCode",
        "mailgunAPIKey",
        "mailgunDomain",
        "mailgunTargetDomain",
        "jwtKey",
        "devKey",
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
        fontUrl: {
            type: "string",
        },
        fontName: {
            type: "string",
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
                orientation: {
                    enum: ["portrait", "landscape"],
                    type: "string",
                },
                display: {
                    enum: ["fullscreen", "standalone", "minimal-ui", "browser"],
                    type: "string",
                }
            },
            additionalProperties: false,
            required: [
                "macSafariMaskIconThemeColor",
                "msTileColor",
                "themeColor",
                "backgroundColor",
                "orientation",
                "display",
            ],
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
        productionHostname: {
            type: "string",
        },
        containersRegionMappers: {
            type: "object",
            additionalProperties: {
                type: "string",
            },
            minProperties: 1,
        },
        containersHostnamePrefixes: {
            type: "object",
            additionalProperties: {
                type: "string",
            },
            minProperties: 1,
        },
    },
    additionalProperties: false,
    required: [
        "entry",
        "appName",
        "supportedLanguages",
        "rtlLanguages",
        "dictionaries",
        "roles",
        "fontUrl",
        "fontName",
        "manifest",
        "fallbackCountryCode",
        "fallbackLanguage",
        "fallbackCurrency",
        "developmentHostname",
        "productionHostname",
        "containersRegionMappers",
        "containersHostnamePrefixes",
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
exports.rawRedisConfigSchemaPart = {
    type: "object",
    properties: {
        host: {
            type: "string",
        },
        port: {
            type: "number",
        },
        path: {
            anyOf: [
                {
                    "type": "string",
                },
                {
                    "type": "null"
                }
            ]
        },
        db: {
            anyOf: [
                {
                    "type": "number",
                },
                {
                    "type": "null"
                }
            ]
        },
        password: {
            anyOf: [
                {
                    "type": "string",
                },
                {
                    "type": "null"
                }
            ]
        },
    },
    additionalProperties: false,
    required: [
        "host",
        "port",
        "path",
        "db",
        "password",
    ],
};
exports.rawRedisConfigSchema = {
    type: "object",
    properties: {
        global: exports.rawRedisConfigSchemaPart,
        cache: exports.rawRedisConfigSchemaPart,
        pubSub: exports.rawRedisConfigSchemaPart,
    },
    additionalProperties: false,
    required: [
        "global",
        "cache",
        "pubSub",
    ],
};
