export interface IConfigRawJSONDataType {
  entry: string;
  appName: string;
  port: number;
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
  };
  fontUrl: string;

  // FALLBACK REGIONALIZATION
  fallbackCountryCode: string;
  fallbackLanguage: string;
  fallbackCurrency: string;

  // Generic info
  developmentHostname: string;
  stagingHostname: string;
  productionHostname: string;
}

export interface ISensitiveConfigRawJSONDataType {
  ipStackAccessKey: string;
  hereAppID: string;
  hereAppCode: string;
  jwtKey: string;
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
      ]
    },
    hereAppID: {
      anyOf: [
        {
          "type": "string",
        },
        {
          "type": "null"
        }
      ]
    },
    hereAppCode: {
      anyOf: [
        {
          "type": "string",
        },
        {
          "type": "null"
        }
      ]
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

export const rawConfigSchema = {
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

export const rawRedisConfigSchema = {
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
