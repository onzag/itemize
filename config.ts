/**
 * Represents the stanard redis and sensitive config information an schemas
 * @module
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
  orientation: "portrait" | "landscape",
  /**
   * The display for the app
   */
  display: "fullscreen" | "standalone" | "minimal-ui" | "browser",
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
   * For resources that are to be cached in the service worker
   * in addition of the standard ones
   */
  cachedResources: string[];
  /**
   * For resources that are to be cached in the service worker
   * that are external
   */
  cachedExtUrls: string[];
  /**
   * The font name to use
   */
  fontName: string;
  /**
   * The cacheable external hostnames, add hostnames here eg. fonts.googleapis.com to tell the service worker
   * that these hostnames should be cached
   */
  cacheableExtHostnames: string[];

  // FALLBACK REGIONALIZATION
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

  // Generic info
  /**
   * The hostname used in development mode, used to avoid SEO hijaking
   */
  developmentHostname: string;
  /**
   * The hostname used in production mode, used to avoid SEO hijacking
   */
  productionHostname: string;

  /**
   * The mail domain that is used when sending emails from
   */
  mailDomain: string;
  /**
   * The mail storage item definition path
   * it must pass some criteria in order to be valid
   * as emails get added there
   */
  mailStorage: string;
  /**
   * The default cluster to use when no cluster name is known at a file
   */
  defaultCluster: string;
  /**
   * All the given clusters that are available
   */
  allClusters: Array<string>;
  /**
   * Special custom configuration
   */
  custom?: {
    [customKey: string]: any;
  }
  /**
   * Shared custom information that is added to the standard config and sensitive config
   * but kept into the sensitive or standard file (eg. client side api keys)
   */
  shared?: {
    [customKey: string]: any;
  }
}

/**
 * Specification to dump specific item definitions
 */
export interface IDumpSpecificIdefInfoType {
  /**
   * The item definition path inside the module
   * if it's a boolean dump all of the items
   * if it's an array with string, or string string, dump the specific id, id,version combo
   */
  [idefPath: string]: boolean | "all" | "only-unversioned" | Array<string | [string, string]>
}

/**
 * Specification to dump specific modules
 */
export interface IDumpSpecificModInfoType {
  /**
   * The module path as module/submodule
   * if it's a boolean dump all
   * if it's an array with string, or string string, dump the specific id, version combo
   * otherwise dump only specific item definition types
   */
  [modPath: string]: boolean | "all" | "only-unversioned" | Array<string | [string, string]> | IDumpSpecificIdefInfoType;
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
  save: boolean | IDumpSpecificModInfoType,

  /**
   * Specifies how the dump is to be loaded
   */
  load: {
    /**
     * Map previous clusters that have been dumped to new
     * cluster, the previous cluster mapper has priority over
     * the version mapper, it will try to get one
     * from the list in order of priority
     */
    clusterIdToClusterId?: {
      [clusterId: string]: string[];
    },
    /**
     * Specifies a cluster based on a version, it will try to get one
     * from the list in order of priority
     */
    versionToClusterId?: {
      [version: string]: string[];
    },
    /**
     * If none of the version mappers nor the previous cluster match
     * and the previous cluster is not found in the current configuration
     * this cluster will be used instead
     */
    primaryClusterId: string;

    /**
     * Every row in itemize is created by a given creator
     * if the environment user ids don't match use this map to force to
     * the dump into a specific user with a name
     */
    userIdToUserWithName?: {
      [createdBy: string]: string;
    }

    /**
     * If a value is not found in the userIdToUserId map this one will be used instead
     * if not specified the original value will be kept
     */
    forceUserIdToUserWithName?: string;
  },
}

/**
 * The sensitive information
 */
export interface ISensitiveConfigRawJSONDataType {
  /**
   * Used for localization services to localize users
   */
  userLocalization: any;
  /**
   * the currency layer access key,
   * can be null, currency type won't work
   */
  currencyFactors: any;
  /**
   * The mapping search api key, can be null, address search won't work
   */
  locationSearch: any;
  /**
   * The payment configuration
   */
  payment: any;
  /**
   * The mail service information, api key what not
   */
  mail: any;
  /**
   * The phone service information, api key what not
   */
  phone: any;
  /**
   * For ussd usage
   */
  ussd: any;
  /**
   * The logging service information
   */
  logging: any;
  /**
   * A development key, allows to use development files in its full form on the production
   * interface
   */
  devKey: string;
  /**
   * An administration key, used for peforming some administrative actions in addition
   * of the admin account being required
   */
  adminKey: string;
  /**
   * Custom information added to the sensitive config
   */
  custom?: {
    [customKey: string]: any;
  };
  /**
   * Shared custom information that is added to the standard config and sensitive config
   * but kept into the sensitive or standard file (eg. client side api keys)
   */
  shared?: {
    [customKey: string]: any;
  };

  clusters: {
    [clusterId: string]: {
      sshuser: string;
      sshport?: number;
      hostname: string;
      services: string | Array<string>;
    }
  }
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
  /**
   * The dictionaries assigned to the given supported languages
   * you might specify only unregionalized versions, eg instead of en-GB en-US only en for english
   */
  dictionaries: {
    [key: string]: string,
  };

  // elasticsearch compound
  // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/basic-config.html
  elastic: any;
  elasticLogs: any;
  elasticAnalytics: any;
  elasticLangAnalyzers: {
    [key: string]: string,
  },
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
export const rawSensitiveConfigSchema = {
  type: "object",
  properties: {
    userLocalization: {
      type: ["object", "null"],
      additionalProperties: {},
    },
    currencyFactors: {
      type: ["object", "null"],
      additionalProperties: {},
    },
    locationSearch: {
      type: ["object", "null"],
      additionalProperties: {},
    },
    payment: {
      type: ["object", "null"],
      additionalProperties: {},
    },
    mail: {
      type: ["object", "null"],
      additionalProperties: {},
    },
    phone: {
      type: ["object", "null"],
      additionalProperties: {},
    },
    ussd: {
      type: ["object", "null"],
      additionalProperties: {},
    },
    logging: {
      type: ["object", "null"],
      additionalProperties: {},
    },
    devKey: {
      type: "string",
    },
    adminKey: {
      type: "string",
    },
    custom: {
      type: "object",
      additionalProperties: {}
    },
    shared: {
      type: "object",
      additionalProperties: {}
    },
    clusters: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          hostname: {
            type: "string",
          },
          sshuser: {
            type: "string",
          },
          sshport: {
            type: "integer",
          },
          services: {
            type: ["string", "array"],
            enum: ["full", "cluster", "global"],
            items: {
              type: "string",
            }
          },
        },
        required: [
          "sshuser",
          "services",
          "hostname",
        ],
        additionalProperties: {},
      },
      minItems: 1,
    },
  },
  additionalProperties: false,
  required: [
    "userLocalization",
    "currencyFactors",
    "locationSearch",
    "payment",
    "mail",
    "phone",
    "ussd",
    "logging",
    "devKey",
    "adminKey",
    "clusters",
  ],
};

/**
 * A json validating schema for the dump configuration
 */
export const dumpConfigSchema = {
  type: "object",
  properties: {
    save: {
      anyOf: [
        {
          type: "boolean",
        },
        {
          type: "object",
          additionalProperties: {
            anyOf: [
              {
                type: "boolean",
              },
              {
                enum: ["all", "only-unversioned"],
              },
              {
                type: "array",
                items: {
                  type: "number",
                },
              },
              {
                type: "array",
                maxItems: 2,
                minItems: 2,
                items: {
                  anyOf: [
                    {
                      type: "string",
                    },
                    {
                      type: "number",
                    },
                  ]
                },
              },
              {
                type: "object",
                additionalProperties: {
                  anyOf: [
                    {
                      type: "boolean",
                    },
                    {
                      enum: ["all", "only-unversioned"],
                    },
                    {
                      type: "array",
                      items: {
                        type: "number",
                      },
                    },
                    {
                      type: "array",
                      maxItems: 2,
                      minItems: 2,
                      items: {
                        anyOf: [
                          {
                            type: "string",
                          },
                          {
                            type: "number",
                          },
                        ]
                      },
                    },
                  ]
                }
              }
            ]
          }
        }
      ],
    },
    load: {
      type: "object",
      properties: {
        clusterIdToClusterId: {
          type: "object",
          additionalProperties: {
            type: "array",
            items: {
              type: "string",
            },
            minItems: 1,
          }
        },
        versionToClusterId: {
          type: "object",
          additionalProperties: {
            type: "array",
            items: {
              type: "string",
            },
            minItems: 1,
          }
        },
        primaryClusterId: {
          type: "string",
        },
        userIdToUserWithName: {
          type: "object",
          additionalProperties: {
            type: "array",
            items: {
              type: "string",
            },
            minItems: 1,
          }
        },
        forceUserIdToUserWithName: {
          type: "array",
          items: {
            type: "string",
          },
          minItems: 1,
        }
      },
      required: [
        "primaryClusterId",
      ],
    }
  },
}

/**
 * A json validating schema for the standard configuration
 */
export const rawConfigSchema = {
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
    roles: {
      type: "array",
      items: {
        type: "string",
      },
    },
    fontUrl: {
      type: "string",
    },
    cacheableExtHostnames: {
      type: "array",
      items: {
        type: "string",
      },
    },
    cachedExtUrls: {
      type: "array",
      items: {
        type: "string",
      },
    },
    cachedResources: {
      type: "array",
      items: {
        type: "string",
      },
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
    mailDomain: {
      type: ["string", "null"],
    },
    mailStorage: {
      type: ["string", "null"],
    },
    defaultCluster: {
      type: "string",
    },
    allClusters: {
      type: "array",
      items: {
        type: "string",
      },
      minItems: 1,
    },
    custom: {
      type: "object",
      additionalProperties: {}
    },
    shared: {
      type: "object",
      additionalProperties: {}
    },
  },
  additionalProperties: false,
  required: [
    "entry",
    "appName",
    "supportedLanguages",
    "rtlLanguages",
    "roles",
    "fontUrl",
    "cachedResources",
    "cacheableExtHostnames",
    "cachedExtUrls",
    "fontName",
    "manifest",
    "fallbackCountryCode",
    "fallbackLanguage",
    "fallbackCurrency",
    "developmentHostname",
    "productionHostname",
    "mailDomain",
    "mailStorage",
    "allClusters",
    "defaultCluster",
  ],
};

/**
 * A json validating schema for the database configuration
 */
export const rawDBConfigSchema = {
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
    dictionaries: {
      type: "object",
      additionalProperties: {
        type: "string",
      },
    },
    elastic: {
      type: ["object", "null"],
      additionalProperties: {},
    },
    elasticLogs: {
      type: "object",
      additionalProperties: {},
    },
    elasticAnalytics: {
      type: "object",
      additionalProperties: {},
    },
    elasticLangAnalyzers: {
      type: ["object", "null"],
      additionalProperties: {
        type: "string",
      },
    },
  },
  additionalProperties: false,
  required: [
    "host",
    "port",
    "user",
    "database",
    "password",
    "dictionaries",
    "elastic",
    "elasticLangAnalyzers",
  ],
};

/***
 * A json validating schema for the redis config
 */
export const rawRedisConfigSchemaPart = {
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

export const rawRedisConfigSchema = {
  type: "object",
  properties: {
    global: rawRedisConfigSchemaPart,
    cache: rawRedisConfigSchemaPart,
    pubSub: rawRedisConfigSchemaPart,
  },
  additionalProperties: false,
  required: [
    "global",
    "cache",
    "pubSub",
  ],
}
