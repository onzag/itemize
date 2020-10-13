/**
 * Represents the stanard redis and sensitive config information an schemas
 * @packageDocumentation
 */
/**
 * The manifest configuration for building up the PWA manifest
 * and also a part of the standard config
 */
export interface IConfigManifestType {
    /**
     * The safari mask icon color
     */
    macSafariMaskIconThemeColor: string;
    /**
     * The microsoft tile color used in metro ui
     */
    msTileColor: string;
    /**
     * generic theme color (android/chome/FF)
     */
    themeColor: string;
    /**
     * generic background color (android/chrome/FF)
     */
    backgroundColor: string;
    /**
     * The orientation of the app
     */
    orientation: "portrait" | "landscape";
    /**
     * The display for the app
     */
    display: "fullscreen" | "standalone" | "minimal-ui" | "browser";
}
/**
 * The standard basic configuration structure
 */
export interface IConfigRawJSONDataType {
    /**
     * The schema entry, usually schema/root
     */
    entry: string;
    /**
     * The application name
     */
    appName: string;
    /**
     * The supported languages as an array of string
     */
    supportedLanguages: string[];
    /**
     * Of the supported languages, which ones are right to left
     */
    rtlLanguages: string[];
    /**
     * The dictionaries assigned to the given supported languages
     * you might specify only unregionalized versions, eg instead of en-GB en-US only en for english
     */
    dictionaries: {
        [key: string]: string;
    };
    /**
     * The supported user roles
     * ADMIN is an expected role for this
     */
    roles: string[];
    /**
     * The web manifest configuration
     */
    manifest: IConfigManifestType;
    /**
     * The font url to use
     */
    fontUrl: string;
    /**
     * The font name to use
     */
    fontName: string;
    /**
     * The cacheable external hostnames, add hostnames here eg. fonts.googleapis.com to tell the service worker
     * that these hostnames should be cached
     */
    cacheableExtHostnames: string[];
    /**
     * The country code the app fallbacks to if some error happens
     * also the default for development
     */
    fallbackCountryCode: string;
    /**
     * The language the app fallbacks to if some error happens
     * also the default for development
     */
    fallbackLanguage: string;
    /**
     * The currency the app fallbacks to if some error happens
     * also the default for development
     */
    fallbackCurrency: string;
    /**
     * The hostname used in development mode, used to avoid SEO hijaking
     */
    developmentHostname: string;
    /**
     * The hostname used in production mode, used to avoid SEO hijacking
     */
    productionHostname: string;
    /**
     * Uploads info, maps countries to containers id
     * "*" asterisk represents a special match that will match all the non-matching
     * the value should be container id
     */
    containersRegionMappers: {
        [countries: string]: string;
    };
    /**
     * the hostname prefixes for a given container id, as where the information is stored
     * must not contain http or https protocol
     * eg. myopenstackprovider.com/mycontainer/AUTH_123/ or whatever custom domain you have got
     */
    containersHostnamePrefixes: {
        [containerId: string]: string;
    };
    /**
     * Special custom configuration
     */
    custom?: {
        [customKey: string]: any;
    };
}
/**
 * The sensitive openstack container information
 */
export interface ISensitiveConfigOpenstackContainerType {
    username: string;
    password: string;
    region: string;
    domainId: string;
    domainName: string;
    authUrl: string;
    containerName: string;
}
/**
 * Specification to dump specific item definitions
 */
export interface IDumpSpecificIdefInfoType {
    /**
     * The item definition path inside the module
     * if it's a boolean dump all of the items
     * if it's an array with number, or number string, dump the specific id, id,version combo
     */
    [idefPath: string]: boolean | Array<number | [number, string]>;
}
/**
 * Specification to dump specific modules
 */
export interface IDumpSpecificModInfoType {
    /**
     * The module path as module/submodule
     * if it's a boolean dump all
     * if it's an array with number, or number string, dump the specific id, version combo
     * otherwise dump only specific item definition types
     */
    [modPath: string]: boolean | Array<number | [number, string]> | IDumpSpecificIdefInfoType;
}
/**
 * A structure that specifies how files are to be dumped
 * and then reloaded
 */
export interface IDumpConfigRawJSONDataType {
    /**
     * Specifies the dump process
     * If it's a boolean, dump all, otherwse
     * we only dump specific modules
     */
    save: boolean | IDumpSpecificModInfoType;
    /**
     * Specifies how the dump is to be loaded
     */
    load: {
        /**
         * Map previous containers that have been dumped to new
         * containers, the previous container id mapper has priority over
         * the version mapper, it will try to get one
         * from the list in order of priority
         */
        previousContainerIdMapper?: {
            [containerId: string]: string[];
        };
        /**
         * Specifies a container based on a version, it will try to get one
         * from the list in order of priority
         */
        versionMapper?: {
            [version: string]: string[];
        };
        /**
         * If none of the version mappers nor the previous container id mappers match
         * and the previous container id is not found in the current configuration
         * this container will be used instead
         */
        primaryContainerId: string;
    };
}
/**
 * The sensitive information
 */
export interface ISensitiveConfigRawJSONDataType {
    /**
     * An ip stack access key
     * can be null, fallback regionalization will always be used
     */
    ipStackAccessKey: string;
    /**
     * whether ipstack is https enabled
     * by default it's not, on the free plans
     */
    ipStackHttpsEnabled: boolean;
    /**
     * the currency layer access key,
     * can be null, currency type won't work
     */
    currencyLayerAccessKey: string;
    /**
     * whether currency layer is https enabled
     * by default it's not, on the free plans
     */
    currencyLayerHttpsEnabled: boolean;
    /**
     * The here maps api key, can be null, address search won't work
     */
    hereApiKey: string;
    /**
     * The openstack containers, they should match the previously given
     * containers id
     */
    openstackContainers: {
        [containerId: string]: ISensitiveConfigOpenstackContainerType;
    };
    /**
     * A local container (if any)
     */
    localContainer: string;
    /**
     * The default container id used when required, eg. creating an admin
     */
    defaultContainerID: string;
    /**
     * The seo container id used when storing sitemaps
     */
    seoContainerID: string;
    /**
     * mailgun api key, can be null
     */
    mailgunAPIKey: string;
    /**
     * mailgun domain, can be null
     * it is the domain you are using to send emails
     */
    mailgunDomain: string;
    /**
     * the mailgun api host, usually differs can be
     * api.mailgun.net or api.eu.mailgun.net
     */
    mailgunAPIHost: string;
    /**
     * The target domain, basically the same as your development/production
     * hostname, if null, will default to production
     */
    mailgunTargetDomain: string;
    /**
     * a json web token key to use, itemize uses JWT and as such it can be trusted
     * to call other external APIs
     */
    jwtKey: string;
    /**
     * A development key, allows to use development files in its full form on the production
     * interface
     */
    devKey: string;
    /**
     * Custom information added to the sensitive config
     */
    custom?: {
        [customKey: string]: any;
    };
}
/**
 * The database config
 */
export interface IDBConfigRawJSONDataType {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}
/**
 * A redis single connection configuration
 */
export interface ISingleRedisConfigRawJSONDataType {
    host?: string;
    port?: number;
    path?: string;
    db?: number;
    password?: string;
}
/**
 * Redis configuration
 * All instances can literally be the same instance
 */
export interface IRedisConfigRawJSONDataType {
    /**
     * The global cache, used to store server data
     * that is shared within instances
     */
    global: ISingleRedisConfigRawJSONDataType;
    /**
     * The pubsub cache, also some form of global cache
     * but used to inform changes of data to instances
     */
    pubSub: ISingleRedisConfigRawJSONDataType;
    /**
     * local cache, should be physically close to the cluster
     * or run alongside it
     */
    cache: ISingleRedisConfigRawJSONDataType;
}
/**
 * A JSON validating schema for the sensitive configuration
 */
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
        };
        defaultContainerID: {
            type: string;
        };
        seoContainerID: {
            type: string;
        };
        custom: {
            type: string;
            additionalProperties: {};
        };
    };
    additionalProperties: boolean;
    required: string[];
};
/**
 * A json validating schema for the dump configuration
 */
export declare const dumpConfigSchema: {
    type: string;
    properties: {
        save: {
            anyOf: ({
                type: string;
                additionalProperties?: undefined;
            } | {
                type: string;
                additionalProperties: {
                    anyOf: ({
                        type: string;
                        items?: undefined;
                        maxItems?: undefined;
                        minItems?: undefined;
                        additionalProperties?: undefined;
                    } | {
                        type: string;
                        items: {
                            type: string;
                            anyOf?: undefined;
                        };
                        maxItems?: undefined;
                        minItems?: undefined;
                        additionalProperties?: undefined;
                    } | {
                        type: string;
                        maxItems: number;
                        minItems: number;
                        items: {
                            anyOf: {
                                type: string;
                            }[];
                            type?: undefined;
                        };
                        additionalProperties?: undefined;
                    } | {
                        type: string;
                        additionalProperties: {
                            anyOf: ({
                                type: string;
                                items?: undefined;
                                maxItems?: undefined;
                                minItems?: undefined;
                            } | {
                                type: string;
                                items: {
                                    type: string;
                                    anyOf?: undefined;
                                };
                                maxItems?: undefined;
                                minItems?: undefined;
                            } | {
                                type: string;
                                maxItems: number;
                                minItems: number;
                                items: {
                                    anyOf: {
                                        type: string;
                                    }[];
                                    type?: undefined;
                                };
                            })[];
                        };
                        items?: undefined;
                        maxItems?: undefined;
                        minItems?: undefined;
                    })[];
                };
            })[];
        };
        load: {
            type: string;
            properties: {
                previousContainerIdMapper: {
                    type: string;
                    additionalProperties: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                };
                versionMapper: {
                    type: string;
                    additionalProperties: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                };
                primaryContainerId: {
                    type: string;
                };
            };
            required: string[];
        };
    };
};
/**
 * A json validating schema for the standard configuration
 */
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
        cacheableExtHostnames: {
            type: string;
            items: {
                type: string;
            };
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
        };
        custom: {
            type: string;
            additionalProperties: {};
        };
    };
    additionalProperties: boolean;
    required: string[];
};
/**
 * A json validating schema for the database configuration
 */
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
/***
 * A json validating schema for the redis config
 */
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
