export interface IConfigRawJSONDataType {
    entry: string;
    appName: string;
    port: number;
    supportedLanguages: string[];
    rtlLanguages: string[];
    dictionaries: {
        [key: string]: string;
    };
    roles: string[];
    manifest: {
        macSafariMaskIconThemeColor: string;
        msTileColor: string;
        themeColor: string;
        backgroundColor: string;
        orientation: "portrait" | "landscape";
        display: "fullscreen" | "standalone" | "minimal-ui" | "browser";
    };
    fontUrl: string;
    fallbackCountryCode: string;
    fallbackLanguage: string;
    fallbackCurrency: string;
    developmentHostname: string;
    stagingHostname: string;
    productionHostname: string;
    uploadsHostnamePrefix: string;
}
export interface ISensitiveConfigRawJSONDataType {
    ipStackAccessKey: string;
    hereAppID: string;
    hereAppCode: string;
    openStackUsername: string;
    openStackPassword: string;
    openStackRegion: string;
    openStackDomainName: string;
    openStackAuthUrl: string;
    openStackUploadsContainerName: string;
    mailgunAPIKey: string;
    mailgunDomain: string;
    mailgunTargetDomain: string;
    jwtKey: string;
    devKey: string;
}
export interface IDBConfigRawJSONDataType {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}
export interface IRedisConfigRawJSONDataType {
    host?: string;
    port?: number;
    path?: string;
    db?: number;
    password?: string;
}
export declare const rawSensitiveConfigSchema: {
    type: string;
    properties: {
        ipStackAccessKey: {
            anyOf: {
                type: string;
            }[];
        };
        hereAppID: {
            anyOf: {
                type: string;
            }[];
        };
        hereAppCode: {
            anyOf: {
                type: string;
            }[];
        };
        mailgunAPIKey: {
            anyOf: {
                type: string;
            }[];
        };
        mailgunDomain: {
            anyOf: {
                type: string;
            }[];
        };
        mailgunTargetDomain: {
            anyOf: {
                type: string;
            }[];
        };
        jwtKey: {
            type: string;
        };
        devKey: {
            type: string;
        };
        openStackUsername: {
            type: string;
        };
        openStackPassword: {
            type: string;
        };
        openStackRegion: {
            type: string;
        };
        openStackDomainName: {
            type: string;
        };
        openStackUploadsContainerName: {
            type: string;
        };
        openStackAuthUrl: {
            type: string;
        };
    };
    additionalProperties: boolean;
    required: string[];
};
export declare const rawConfigSchema: {
    type: string;
    properties: {
        entry: {
            type: string;
        };
        appName: {
            type: string;
        };
        port: {
            type: string;
        };
        supportedLanguages: {
            type: string;
            items: {
                type: string;
            };
        };
        rtlLanguages: {
            type: string;
            items: {
                type: string;
            };
        };
        dictionaries: {
            type: string;
            additionalProperties: {
                type: string;
            };
        };
        roles: {
            type: string;
            items: {
                type: string;
            };
        };
        fontUrl: {
            type: string;
        };
        manifest: {
            type: string;
            properties: {
                macSafariMaskIconThemeColor: {
                    type: string;
                };
                msTileColor: {
                    type: string;
                };
                themeColor: {
                    type: string;
                };
                backgroundColor: {
                    type: string;
                };
                orientation: {
                    enum: string[];
                    type: string;
                };
                display: {
                    enum: string[];
                    type: string;
                };
            };
            additionalProperties: boolean;
            required: string[];
        };
        fallbackCountryCode: {
            type: string;
        };
        fallbackLanguage: {
            type: string;
        };
        fallbackCurrency: {
            type: string;
        };
        developmentHostname: {
            type: string;
        };
        stagingHostname: {
            type: string;
        };
        productionHostname: {
            type: string;
        };
        uploadsHostnamePrefix: {
            type: string;
        };
    };
    additionalProperties: boolean;
    required: string[];
};
export declare const rawDBConfigSchema: {
    type: string;
    properties: {
        host: {
            type: string;
        };
        port: {
            type: string;
        };
        user: {
            type: string;
        };
        database: {
            type: string;
        };
        password: {
            type: string;
        };
    };
    additionalProperties: boolean;
    required: string[];
};
export declare const rawRedisConfigSchema: {
    type: string;
    properties: {
        host: {
            type: string;
        };
        port: {
            type: string;
        };
        path: {
            anyOf: {
                type: string;
            }[];
        };
        db: {
            anyOf: {
                type: string;
            }[];
        };
        password: {
            anyOf: {
                type: string;
            }[];
        };
    };
    additionalProperties: boolean;
    required: string[];
};
