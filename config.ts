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

  // FALLBACK REGIONALIZATION
  fallbackCountryCode: string;
  fallbackLanguage: string;
  fallbackCurrency: string;
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
  url?: string;
}

export const rawSensitiveConfigSchema = {
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
      type: "string",
    },
    url: {
      type: "string",
    },
  },
  additionalProperties: false,
};
