export interface IConfigManifestType {
    macSafariMaskIconThemeColor: string;
    msTileColor: string;
    themeColor: string;
    backgroundColor: string;
    orientation: "portrait" | "landscape";
    display: "fullscreen" | "standalone" | "minimal-ui" | "browser";
}
export interface IConfigRawJSONDataType {
    entry: string;
    appName: string;
    supportedLanguages: string[];
    rtlLanguages: string[];
    dictionaries: {
        [key: string]: string;
    };
    roles: string[];
    manifest: IConfigManifestType;
    fontUrl: string;
    fontName: string;
    fallbackCountryCode: string;
    fallbackLanguage: string;
    fallbackCurrency: string;
    developmentHostname: string;
    productionHostname: string;
    containersRegionMappers: {
        [countries: string]: string;
    };
    containersHostnamePrefixes: {
        [containerId: string]: string;
    };
}
export interface ISensitiveConfigOpenstackContainerType {
    username: string;
    password: string;
    region: string;
    domainId: string;
    domainName: string;
    authUrl: string;
    containerName: string;
}
export interface ISensitiveConfigRawJSONDataType {
    ipStackAccessKey: string;
    ipStackHttpsEnabled: boolean;
    currencyLayerAccessKey: string;
    currencyLayerHttpsEnabled: boolean;
    hereApiKey: string;
    openstackContainers: {
        [containerId: string]: ISensitiveConfigOpenstackContainerType;
    };
    defaultContainerID: string;
    mailgunAPIKey: string;
    mailgunDomain: string;
    mailgunAPIHost: string;
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
export interface ISingleRedisConfigRawJSONDataType {
    host?: string;
    port?: number;
    path?: string;
    db?: number;
    password?: string;
}
export interface IRedisConfigRawJSONDataType {
    global: ISingleRedisConfigRawJSONDataType;
    cache: ISingleRedisConfigRawJSONDataType;
    pubSub: ISingleRedisConfigRawJSONDataType;
}
export declare const rawSensitiveConfigSchema: {
    type: string;
    properties: {
        ipStackAccessKey: {
            anyOf: {
                type: string;
            }[];
        };
        ipStackHttpsEnabled: {
            type: string;
        };
        currencyLayerAccessKey: {
            anyOf: {
                type: string;
            }[];
        };
        currencyLayerHttpsEnabled: {
            type: string;
        };
        hereApiKey: {
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
        mailgunAPIHost: {
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
        openstackContainers: {
            type: string;
            additionalProperties: {
                type: string;
                properties: {
                    username: {
                        type: string;
                    };
                    password: {
                        type: string;
                    };
                    region: {
                        type: string;
                    };
                    domainId: {
                        type: string;
                    };
                    domainName: {
                        type: string;
                    };
                    containerName: {
                        type: string;
                    };
                    authUrl: {
                        type: string;
                    };
                };
                required: string[];
            };
            minProperties: number;
        };
        defaultContainerID: {
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
        fontName: {
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
        productionHostname: {
            type: string;
        };
        containersRegionMappers: {
            type: string;
            additionalProperties: {
                type: string;
            };
            minProperties: number;
        };
        containersHostnamePrefixes: {
            type: string;
            additionalProperties: {
                type: string;
            };
            minProperties: number;
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
export declare const rawRedisConfigSchemaPart: {
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
export declare const rawRedisConfigSchema: {
    type: string;
    properties: {
        global: {
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
        cache: {
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
        pubSub: {
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
    };
    additionalProperties: boolean;
    required: string[];
};
