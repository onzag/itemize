export interface IConfigRawJSONDataType {
  entry: string;
  appName: string;
  supportedLanguages: string[];
  rtlLanguages: string[];
  dictionaries: {
    [key: string]: string,
  };
  roles: string[];
  manifest: {
    macSafariMaskIconThemeColor: string;
    msTileColor: string;
    themeColor: string;
    backgroundColor: string;
    orientation: "portrait" | "landscape",
    display: "fullscreen" | "standalone" | "minimal-ui" | "browser",
  };
  fontUrl: string;
  fontName: string;

  // FALLBACK REGIONALIZATION
  fallbackCountryCode: string;
  fallbackLanguage: string;
  fallbackCurrency: string;

  // Generic info
  developmentHostname: string;
  stagingHostname: string;
  productionHostname: string;
  
  // Uploads info
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
  hereAppID: string;
  hereAppCode: string;
  openstackContainers: {
    [containerId: string]: ISensitiveConfigOpenstackContainerType,
  };
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

export const rawSensitiveConfigSchema = {
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
    }
  },
  additionalProperties: false,
  required: [
    "ipStackAccessKey",
    "hereAppID",
    "hereAppCode",
    "mailgunAPIKey",
    "mailgunDomain",
    "mailgunTargetDomain",
    "jwtKey",
    "devKey",
  ],
};

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
    dictionaries: {
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
    stagingHostname: {
      type: "string",
    },
    productionHostname: {
      type: "string",
    },
    containersRegionMappers: {
      type: "object",
      additionalProperties: {
        type: "string",
      },
      minProperties: 1,
    },
    containersHostnamePrefixes: {
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
    "stagingHostname",
    "productionHostname",
    "containersRegionMappers",
    "containersHostnamePrefixes",
  ],
};

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