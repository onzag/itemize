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
        jwtKey: {
            type: "string",
        },
        devKey: {
            type: "string",
        },
    },
    additionalProperties: false,
    required: [
        "ipStackAccessKey",
        "hereAppID",
        "hereAppCode",
        "mailgunAPIKey",
        "mailgunDomain",
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
        fontUrl: {
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
        "fontUrl",
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
