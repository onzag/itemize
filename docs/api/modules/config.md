[@onzag/itemize](../README.md) / [Modules](../modules.md) / config

# Module: config

Represents the stanard redis and sensitive config information an schemas

## Table of contents

### Interfaces

- [IConfigManifestType](../interfaces/config.IConfigManifestType.md)
- [IConfigRawJSONDataType](../interfaces/config.IConfigRawJSONDataType.md)
- [IDBConfigRawJSONDataType](../interfaces/config.IDBConfigRawJSONDataType.md)
- [IDumpConfigRawJSONDataType](../interfaces/config.IDumpConfigRawJSONDataType.md)
- [IDumpSpecificIdefInfoType](../interfaces/config.IDumpSpecificIdefInfoType.md)
- [IDumpSpecificModInfoType](../interfaces/config.IDumpSpecificModInfoType.md)
- [IRedisConfigRawJSONDataType](../interfaces/config.IRedisConfigRawJSONDataType.md)
- [ISensitiveConfigRawJSONDataType](../interfaces/config.ISensitiveConfigRawJSONDataType.md)
- [ISingleRedisConfigRawJSONDataType](../interfaces/config.ISingleRedisConfigRawJSONDataType.md)

### Variables

- [dumpConfigSchema](config.md#dumpconfigschema)
- [rawConfigSchema](config.md#rawconfigschema)
- [rawDBConfigSchema](config.md#rawdbconfigschema)
- [rawRedisConfigSchema](config.md#rawredisconfigschema)
- [rawRedisConfigSchemaPart](config.md#rawredisconfigschemapart)
- [rawSensitiveConfigSchema](config.md#rawsensitiveconfigschema)

## Variables

### dumpConfigSchema

• `Const` **dumpConfigSchema**: `Object`

A json validating schema for the dump configuration

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | \{ `load`: \{ `properties`: \{ `previousContainerIdMapper`: \{ `additionalProperties`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `type`: `string` = "object" } ; `primaryContainerId`: \{ `type`: `string` = "string" } ; `versionMapper`: \{ `additionalProperties`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `type`: `string` = "object" }  } ; `required`: `string`[] ; `type`: `string` = "object" } ; `save`: \{ `anyOf`: (\{ `additionalProperties?`: `undefined` ; `type`: `string` = "boolean" } \| \{ `additionalProperties`: \{ `anyOf`: (\{ `additionalProperties?`: `undefined` ; `enum?`: `undefined` ; `items?`: `undefined` ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type`: `string` = "boolean" } \| \{ `additionalProperties?`: `undefined` ; `enum`: `string`[] ; `items?`: `undefined` ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type?`: `undefined` = "object" } \| \{ `additionalProperties?`: `undefined` ; `enum?`: `undefined` ; `items`: \{ `anyOf?`: `undefined` ; `type`: `string` = "number" } ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type`: `string` = "array" } \| \{ `additionalProperties?`: `undefined` ; `enum?`: `undefined` ; `items`: \{ `anyOf`: \{ `type`: `string` = "string" }[] ; `type?`: `undefined` = "object" } ; `maxItems`: `number` = 2; `minItems`: `number` = 2; `type`: `string` = "array" } \| \{ `additionalProperties`: \{ `anyOf`: (\{ `enum?`: `undefined` ; `items?`: `undefined` ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type`: `string` = "boolean" } \| \{ `enum`: `string`[] ; `items?`: `undefined` ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type?`: `undefined` = "object" } \| \{ `enum?`: `undefined` ; `items`: \{ `anyOf?`: `undefined` ; `type`: `string` = "number" } ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type`: `string` = "array" } \| \{ `enum?`: `undefined` ; `items`: \{ `anyOf`: \{ `type`: `string` = "string" }[] ; `type?`: `undefined` = "object" } ; `maxItems`: `number` = 2; `minItems`: `number` = 2; `type`: `string` = "array" })[]  } ; `enum?`: `undefined` ; `items?`: `undefined` ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type`: `string` = "object" })[]  } ; `type`: `string` = "object" })[]  }  } |
| `properties.load` | \{ `properties`: \{ `previousContainerIdMapper`: \{ `additionalProperties`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `type`: `string` = "object" } ; `primaryContainerId`: \{ `type`: `string` = "string" } ; `versionMapper`: \{ `additionalProperties`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `type`: `string` = "object" }  } ; `required`: `string`[] ; `type`: `string` = "object" } |
| `properties.load.properties` | \{ `previousContainerIdMapper`: \{ `additionalProperties`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `type`: `string` = "object" } ; `primaryContainerId`: \{ `type`: `string` = "string" } ; `versionMapper`: \{ `additionalProperties`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `type`: `string` = "object" }  } |
| `properties.load.properties.previousContainerIdMapper` | \{ `additionalProperties`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `type`: `string` = "object" } |
| `properties.load.properties.previousContainerIdMapper.additionalProperties` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.load.properties.previousContainerIdMapper.additionalProperties.items` | \{ `type`: `string` = "string" } |
| `properties.load.properties.previousContainerIdMapper.additionalProperties.items.type` | `string` |
| `properties.load.properties.previousContainerIdMapper.additionalProperties.type` | `string` |
| `properties.load.properties.previousContainerIdMapper.type` | `string` |
| `properties.load.properties.primaryContainerId` | \{ `type`: `string` = "string" } |
| `properties.load.properties.primaryContainerId.type` | `string` |
| `properties.load.properties.versionMapper` | \{ `additionalProperties`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `type`: `string` = "object" } |
| `properties.load.properties.versionMapper.additionalProperties` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.load.properties.versionMapper.additionalProperties.items` | \{ `type`: `string` = "string" } |
| `properties.load.properties.versionMapper.additionalProperties.items.type` | `string` |
| `properties.load.properties.versionMapper.additionalProperties.type` | `string` |
| `properties.load.properties.versionMapper.type` | `string` |
| `properties.load.required` | `string`[] |
| `properties.load.type` | `string` |
| `properties.save` | \{ `anyOf`: (\{ `additionalProperties?`: `undefined` ; `type`: `string` = "boolean" } \| \{ `additionalProperties`: \{ `anyOf`: (\{ `additionalProperties?`: `undefined` ; `enum?`: `undefined` ; `items?`: `undefined` ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type`: `string` = "boolean" } \| \{ `additionalProperties?`: `undefined` ; `enum`: `string`[] ; `items?`: `undefined` ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type?`: `undefined` = "object" } \| \{ `additionalProperties?`: `undefined` ; `enum?`: `undefined` ; `items`: \{ `anyOf?`: `undefined` ; `type`: `string` = "number" } ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type`: `string` = "array" } \| \{ `additionalProperties?`: `undefined` ; `enum?`: `undefined` ; `items`: \{ `anyOf`: \{ `type`: `string` = "string" }[] ; `type?`: `undefined` = "object" } ; `maxItems`: `number` = 2; `minItems`: `number` = 2; `type`: `string` = "array" } \| \{ `additionalProperties`: \{ `anyOf`: (\{ `enum?`: `undefined` ; `items?`: `undefined` ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type`: `string` = "boolean" } \| \{ `enum`: `string`[] ; `items?`: `undefined` ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type?`: `undefined` = "object" } \| \{ `enum?`: `undefined` ; `items`: \{ `anyOf?`: `undefined` ; `type`: `string` = "number" } ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type`: `string` = "array" } \| \{ `enum?`: `undefined` ; `items`: \{ `anyOf`: \{ `type`: `string` = "string" }[] ; `type?`: `undefined` = "object" } ; `maxItems`: `number` = 2; `minItems`: `number` = 2; `type`: `string` = "array" })[]  } ; `enum?`: `undefined` ; `items?`: `undefined` ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type`: `string` = "object" })[]  } ; `type`: `string` = "object" })[]  } |
| `properties.save.anyOf` | (\{ `additionalProperties?`: `undefined` ; `type`: `string` = "boolean" } \| \{ `additionalProperties`: \{ `anyOf`: (\{ `additionalProperties?`: `undefined` ; `enum?`: `undefined` ; `items?`: `undefined` ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type`: `string` = "boolean" } \| \{ `additionalProperties?`: `undefined` ; `enum`: `string`[] ; `items?`: `undefined` ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type?`: `undefined` = "object" } \| \{ `additionalProperties?`: `undefined` ; `enum?`: `undefined` ; `items`: \{ `anyOf?`: `undefined` ; `type`: `string` = "number" } ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type`: `string` = "array" } \| \{ `additionalProperties?`: `undefined` ; `enum?`: `undefined` ; `items`: \{ `anyOf`: \{ `type`: `string` = "string" }[] ; `type?`: `undefined` = "object" } ; `maxItems`: `number` = 2; `minItems`: `number` = 2; `type`: `string` = "array" } \| \{ `additionalProperties`: \{ `anyOf`: (\{ `enum?`: `undefined` ; `items?`: `undefined` ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type`: `string` = "boolean" } \| \{ `enum`: `string`[] ; `items?`: `undefined` ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type?`: `undefined` = "object" } \| \{ `enum?`: `undefined` ; `items`: \{ `anyOf?`: `undefined` ; `type`: `string` = "number" } ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type`: `string` = "array" } \| \{ `enum?`: `undefined` ; `items`: \{ `anyOf`: \{ `type`: `string` = "string" }[] ; `type?`: `undefined` = "object" } ; `maxItems`: `number` = 2; `minItems`: `number` = 2; `type`: `string` = "array" })[]  } ; `enum?`: `undefined` ; `items?`: `undefined` ; `maxItems?`: `undefined` = 2; `minItems?`: `undefined` = 2; `type`: `string` = "object" })[]  } ; `type`: `string` = "object" })[] |
| `type` | `string` |

#### Defined in

[config.ts:451](https://github.com/onzag/itemize/blob/59702dd5/config.ts#L451)

___

### rawConfigSchema

• `Const` **rawConfigSchema**: `Object`

A json validating schema for the standard configuration

#### Type declaration

| Name | Type |
| :------ | :------ |
| `additionalProperties` | `boolean` |
| `properties` | \{ `appName`: \{ `type`: `string` = "string" } ; `cacheableExtHostnames`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `cachedExtUrls`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `cachedResources`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `containersHostnamePrefixes`: \{ `additionalProperties`: \{ `type`: `string` = "string" } ; `type`: `string` = "object" } ; `containersRegionMappers`: \{ `additionalProperties`: \{ `type`: `string` = "string" } ; `minProperties`: `number` = 1; `type`: `string` = "object" } ; `custom`: \{ `additionalProperties`: {} = \{}; `type`: `string` = "object" } ; `developmentHostname`: \{ `type`: `string` = "string" } ; `entry`: \{ `type`: `string` = "string" } ; `fallbackCountryCode`: \{ `type`: `string` = "string" } ; `fallbackCurrency`: \{ `type`: `string` = "string" } ; `fallbackLanguage`: \{ `type`: `string` = "string" } ; `fontName`: \{ `type`: `string` = "string" } ; `fontUrl`: \{ `type`: `string` = "string" } ; `mailDomain`: \{ `type`: `string`[]  } ; `mailStorage`: \{ `type`: `string`[]  } ; `manifest`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `backgroundColor`: \{ `type`: `string` = "string" } ; `display`: \{ `enum`: `string`[] ; `type`: `string` = "string" } ; `macSafariMaskIconThemeColor`: \{ `type`: `string` = "string" } ; `msTileColor`: \{ `type`: `string` = "string" } ; `orientation`: \{ `enum`: `string`[] ; `type`: `string` = "string" } ; `themeColor`: \{ `type`: `string` = "string" }  } ; `required`: `string`[] ; `type`: `string` = "object" } ; `productionHostname`: \{ `type`: `string` = "string" } ; `roles`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `rtlLanguages`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } ; `shared`: \{ `additionalProperties`: {} = \{}; `type`: `string` = "object" } ; `supportedLanguages`: \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" }  } |
| `properties.appName` | \{ `type`: `string` = "string" } |
| `properties.appName.type` | `string` |
| `properties.cacheableExtHostnames` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.cacheableExtHostnames.items` | \{ `type`: `string` = "string" } |
| `properties.cacheableExtHostnames.items.type` | `string` |
| `properties.cacheableExtHostnames.type` | `string` |
| `properties.cachedExtUrls` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.cachedExtUrls.items` | \{ `type`: `string` = "string" } |
| `properties.cachedExtUrls.items.type` | `string` |
| `properties.cachedExtUrls.type` | `string` |
| `properties.cachedResources` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.cachedResources.items` | \{ `type`: `string` = "string" } |
| `properties.cachedResources.items.type` | `string` |
| `properties.cachedResources.type` | `string` |
| `properties.containersHostnamePrefixes` | \{ `additionalProperties`: \{ `type`: `string` = "string" } ; `type`: `string` = "object" } |
| `properties.containersHostnamePrefixes.additionalProperties` | \{ `type`: `string` = "string" } |
| `properties.containersHostnamePrefixes.additionalProperties.type` | `string` |
| `properties.containersHostnamePrefixes.type` | `string` |
| `properties.containersRegionMappers` | \{ `additionalProperties`: \{ `type`: `string` = "string" } ; `minProperties`: `number` = 1; `type`: `string` = "object" } |
| `properties.containersRegionMappers.additionalProperties` | \{ `type`: `string` = "string" } |
| `properties.containersRegionMappers.additionalProperties.type` | `string` |
| `properties.containersRegionMappers.minProperties` | `number` |
| `properties.containersRegionMappers.type` | `string` |
| `properties.custom` | \{ `additionalProperties`: {} = \{}; `type`: `string` = "object" } |
| `properties.custom.additionalProperties` | {} |
| `properties.custom.type` | `string` |
| `properties.developmentHostname` | \{ `type`: `string` = "string" } |
| `properties.developmentHostname.type` | `string` |
| `properties.entry` | \{ `type`: `string` = "string" } |
| `properties.entry.type` | `string` |
| `properties.fallbackCountryCode` | \{ `type`: `string` = "string" } |
| `properties.fallbackCountryCode.type` | `string` |
| `properties.fallbackCurrency` | \{ `type`: `string` = "string" } |
| `properties.fallbackCurrency.type` | `string` |
| `properties.fallbackLanguage` | \{ `type`: `string` = "string" } |
| `properties.fallbackLanguage.type` | `string` |
| `properties.fontName` | \{ `type`: `string` = "string" } |
| `properties.fontName.type` | `string` |
| `properties.fontUrl` | \{ `type`: `string` = "string" } |
| `properties.fontUrl.type` | `string` |
| `properties.mailDomain` | \{ `type`: `string`[]  } |
| `properties.mailDomain.type` | `string`[] |
| `properties.mailStorage` | \{ `type`: `string`[]  } |
| `properties.mailStorage.type` | `string`[] |
| `properties.manifest` | \{ `additionalProperties`: `boolean` = false; `properties`: \{ `backgroundColor`: \{ `type`: `string` = "string" } ; `display`: \{ `enum`: `string`[] ; `type`: `string` = "string" } ; `macSafariMaskIconThemeColor`: \{ `type`: `string` = "string" } ; `msTileColor`: \{ `type`: `string` = "string" } ; `orientation`: \{ `enum`: `string`[] ; `type`: `string` = "string" } ; `themeColor`: \{ `type`: `string` = "string" }  } ; `required`: `string`[] ; `type`: `string` = "object" } |
| `properties.manifest.additionalProperties` | `boolean` |
| `properties.manifest.properties` | \{ `backgroundColor`: \{ `type`: `string` = "string" } ; `display`: \{ `enum`: `string`[] ; `type`: `string` = "string" } ; `macSafariMaskIconThemeColor`: \{ `type`: `string` = "string" } ; `msTileColor`: \{ `type`: `string` = "string" } ; `orientation`: \{ `enum`: `string`[] ; `type`: `string` = "string" } ; `themeColor`: \{ `type`: `string` = "string" }  } |
| `properties.manifest.properties.backgroundColor` | \{ `type`: `string` = "string" } |
| `properties.manifest.properties.backgroundColor.type` | `string` |
| `properties.manifest.properties.display` | \{ `enum`: `string`[] ; `type`: `string` = "string" } |
| `properties.manifest.properties.display.enum` | `string`[] |
| `properties.manifest.properties.display.type` | `string` |
| `properties.manifest.properties.macSafariMaskIconThemeColor` | \{ `type`: `string` = "string" } |
| `properties.manifest.properties.macSafariMaskIconThemeColor.type` | `string` |
| `properties.manifest.properties.msTileColor` | \{ `type`: `string` = "string" } |
| `properties.manifest.properties.msTileColor.type` | `string` |
| `properties.manifest.properties.orientation` | \{ `enum`: `string`[] ; `type`: `string` = "string" } |
| `properties.manifest.properties.orientation.enum` | `string`[] |
| `properties.manifest.properties.orientation.type` | `string` |
| `properties.manifest.properties.themeColor` | \{ `type`: `string` = "string" } |
| `properties.manifest.properties.themeColor.type` | `string` |
| `properties.manifest.required` | `string`[] |
| `properties.manifest.type` | `string` |
| `properties.productionHostname` | \{ `type`: `string` = "string" } |
| `properties.productionHostname.type` | `string` |
| `properties.roles` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.roles.items` | \{ `type`: `string` = "string" } |
| `properties.roles.items.type` | `string` |
| `properties.roles.type` | `string` |
| `properties.rtlLanguages` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.rtlLanguages.items` | \{ `type`: `string` = "string" } |
| `properties.rtlLanguages.items.type` | `string` |
| `properties.rtlLanguages.type` | `string` |
| `properties.shared` | \{ `additionalProperties`: {} = \{}; `type`: `string` = "object" } |
| `properties.shared.additionalProperties` | {} |
| `properties.shared.type` | `string` |
| `properties.supportedLanguages` | \{ `items`: \{ `type`: `string` = "string" } ; `type`: `string` = "array" } |
| `properties.supportedLanguages.items` | \{ `type`: `string` = "string" } |
| `properties.supportedLanguages.items.type` | `string` |
| `properties.supportedLanguages.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[config.ts:564](https://github.com/onzag/itemize/blob/59702dd5/config.ts#L564)

___

### rawDBConfigSchema

• `Const` **rawDBConfigSchema**: `Object`

A json validating schema for the database configuration

#### Type declaration

| Name | Type |
| :------ | :------ |
| `additionalProperties` | `boolean` |
| `properties` | \{ `database`: \{ `type`: `string` = "string" } ; `dictionaries`: \{ `additionalProperties`: \{ `type`: `string` = "string" } ; `type`: `string` = "object" } ; `elastic`: \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } ; `elasticLangAnalyzers`: \{ `additionalProperties`: \{ `type`: `string` = "string" } ; `type`: `string`[]  } ; `host`: \{ `type`: `string` = "string" } ; `password`: \{ `type`: `string` = "string" } ; `port`: \{ `type`: `string` = "number" } ; `user`: \{ `type`: `string` = "string" }  } |
| `properties.database` | \{ `type`: `string` = "string" } |
| `properties.database.type` | `string` |
| `properties.dictionaries` | \{ `additionalProperties`: \{ `type`: `string` = "string" } ; `type`: `string` = "object" } |
| `properties.dictionaries.additionalProperties` | \{ `type`: `string` = "string" } |
| `properties.dictionaries.additionalProperties.type` | `string` |
| `properties.dictionaries.type` | `string` |
| `properties.elastic` | \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } |
| `properties.elastic.additionalProperties` | {} |
| `properties.elastic.type` | `string`[] |
| `properties.elasticLangAnalyzers` | \{ `additionalProperties`: \{ `type`: `string` = "string" } ; `type`: `string`[]  } |
| `properties.elasticLangAnalyzers.additionalProperties` | \{ `type`: `string` = "string" } |
| `properties.elasticLangAnalyzers.additionalProperties.type` | `string` |
| `properties.elasticLangAnalyzers.type` | `string`[] |
| `properties.host` | \{ `type`: `string` = "string" } |
| `properties.host.type` | `string` |
| `properties.password` | \{ `type`: `string` = "string" } |
| `properties.password.type` | `string` |
| `properties.port` | \{ `type`: `string` = "number" } |
| `properties.port.type` | `string` |
| `properties.user` | \{ `type`: `string` = "string" } |
| `properties.user.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[config.ts:720](https://github.com/onzag/itemize/blob/59702dd5/config.ts#L720)

___

### rawRedisConfigSchema

• `Const` **rawRedisConfigSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `additionalProperties` | `boolean` |
| `properties` | \{ `cache`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `db`: \{ `anyOf`: \{ `type`: `string` = "number" }[]  } ; `host`: \{ `type`: `string` = "string" } ; `password`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `path`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `port`: \{ `type`: `string` = "number" }  } ; `required`: `string`[] ; `type`: `string` = "object" } = rawRedisConfigSchemaPart; `global`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `db`: \{ `anyOf`: \{ `type`: `string` = "number" }[]  } ; `host`: \{ `type`: `string` = "string" } ; `password`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `path`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `port`: \{ `type`: `string` = "number" }  } ; `required`: `string`[] ; `type`: `string` = "object" } = rawRedisConfigSchemaPart; `pubSub`: \{ `additionalProperties`: `boolean` = false; `properties`: \{ `db`: \{ `anyOf`: \{ `type`: `string` = "number" }[]  } ; `host`: \{ `type`: `string` = "string" } ; `password`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `path`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `port`: \{ `type`: `string` = "number" }  } ; `required`: `string`[] ; `type`: `string` = "object" } = rawRedisConfigSchemaPart } |
| `properties.cache` | \{ `additionalProperties`: `boolean` = false; `properties`: \{ `db`: \{ `anyOf`: \{ `type`: `string` = "number" }[]  } ; `host`: \{ `type`: `string` = "string" } ; `password`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `path`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `port`: \{ `type`: `string` = "number" }  } ; `required`: `string`[] ; `type`: `string` = "object" } |
| `properties.cache.additionalProperties` | `boolean` |
| `properties.cache.properties` | \{ `db`: \{ `anyOf`: \{ `type`: `string` = "number" }[]  } ; `host`: \{ `type`: `string` = "string" } ; `password`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `path`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `port`: \{ `type`: `string` = "number" }  } |
| `properties.cache.properties.db` | \{ `anyOf`: \{ `type`: `string` = "number" }[]  } |
| `properties.cache.properties.db.anyOf` | \{ `type`: `string` = "number" }[] |
| `properties.cache.properties.host` | \{ `type`: `string` = "string" } |
| `properties.cache.properties.host.type` | `string` |
| `properties.cache.properties.password` | \{ `anyOf`: \{ `type`: `string` = "string" }[]  } |
| `properties.cache.properties.password.anyOf` | \{ `type`: `string` = "string" }[] |
| `properties.cache.properties.path` | \{ `anyOf`: \{ `type`: `string` = "string" }[]  } |
| `properties.cache.properties.path.anyOf` | \{ `type`: `string` = "string" }[] |
| `properties.cache.properties.port` | \{ `type`: `string` = "number" } |
| `properties.cache.properties.port.type` | `string` |
| `properties.cache.required` | `string`[] |
| `properties.cache.type` | `string` |
| `properties.global` | \{ `additionalProperties`: `boolean` = false; `properties`: \{ `db`: \{ `anyOf`: \{ `type`: `string` = "number" }[]  } ; `host`: \{ `type`: `string` = "string" } ; `password`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `path`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `port`: \{ `type`: `string` = "number" }  } ; `required`: `string`[] ; `type`: `string` = "object" } |
| `properties.global.additionalProperties` | `boolean` |
| `properties.global.properties` | \{ `db`: \{ `anyOf`: \{ `type`: `string` = "number" }[]  } ; `host`: \{ `type`: `string` = "string" } ; `password`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `path`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `port`: \{ `type`: `string` = "number" }  } |
| `properties.global.properties.db` | \{ `anyOf`: \{ `type`: `string` = "number" }[]  } |
| `properties.global.properties.db.anyOf` | \{ `type`: `string` = "number" }[] |
| `properties.global.properties.host` | \{ `type`: `string` = "string" } |
| `properties.global.properties.host.type` | `string` |
| `properties.global.properties.password` | \{ `anyOf`: \{ `type`: `string` = "string" }[]  } |
| `properties.global.properties.password.anyOf` | \{ `type`: `string` = "string" }[] |
| `properties.global.properties.path` | \{ `anyOf`: \{ `type`: `string` = "string" }[]  } |
| `properties.global.properties.path.anyOf` | \{ `type`: `string` = "string" }[] |
| `properties.global.properties.port` | \{ `type`: `string` = "number" } |
| `properties.global.properties.port.type` | `string` |
| `properties.global.required` | `string`[] |
| `properties.global.type` | `string` |
| `properties.pubSub` | \{ `additionalProperties`: `boolean` = false; `properties`: \{ `db`: \{ `anyOf`: \{ `type`: `string` = "number" }[]  } ; `host`: \{ `type`: `string` = "string" } ; `password`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `path`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `port`: \{ `type`: `string` = "number" }  } ; `required`: `string`[] ; `type`: `string` = "object" } |
| `properties.pubSub.additionalProperties` | `boolean` |
| `properties.pubSub.properties` | \{ `db`: \{ `anyOf`: \{ `type`: `string` = "number" }[]  } ; `host`: \{ `type`: `string` = "string" } ; `password`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `path`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `port`: \{ `type`: `string` = "number" }  } |
| `properties.pubSub.properties.db` | \{ `anyOf`: \{ `type`: `string` = "number" }[]  } |
| `properties.pubSub.properties.db.anyOf` | \{ `type`: `string` = "number" }[] |
| `properties.pubSub.properties.host` | \{ `type`: `string` = "string" } |
| `properties.pubSub.properties.host.type` | `string` |
| `properties.pubSub.properties.password` | \{ `anyOf`: \{ `type`: `string` = "string" }[]  } |
| `properties.pubSub.properties.password.anyOf` | \{ `type`: `string` = "string" }[] |
| `properties.pubSub.properties.path` | \{ `anyOf`: \{ `type`: `string` = "string" }[]  } |
| `properties.pubSub.properties.path.anyOf` | \{ `type`: `string` = "string" }[] |
| `properties.pubSub.properties.port` | \{ `type`: `string` = "number" } |
| `properties.pubSub.properties.port.type` | `string` |
| `properties.pubSub.required` | `string`[] |
| `properties.pubSub.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[config.ts:821](https://github.com/onzag/itemize/blob/59702dd5/config.ts#L821)

___

### rawRedisConfigSchemaPart

• `Const` **rawRedisConfigSchemaPart**: `Object`

A json validating schema for the redis config

#### Type declaration

| Name | Type |
| :------ | :------ |
| `additionalProperties` | `boolean` |
| `properties` | \{ `db`: \{ `anyOf`: \{ `type`: `string` = "number" }[]  } ; `host`: \{ `type`: `string` = "string" } ; `password`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `path`: \{ `anyOf`: \{ `type`: `string` = "string" }[]  } ; `port`: \{ `type`: `string` = "number" }  } |
| `properties.db` | \{ `anyOf`: \{ `type`: `string` = "number" }[]  } |
| `properties.db.anyOf` | \{ `type`: `string` = "number" }[] |
| `properties.host` | \{ `type`: `string` = "string" } |
| `properties.host.type` | `string` |
| `properties.password` | \{ `anyOf`: \{ `type`: `string` = "string" }[]  } |
| `properties.password.anyOf` | \{ `type`: `string` = "string" }[] |
| `properties.path` | \{ `anyOf`: \{ `type`: `string` = "string" }[]  } |
| `properties.path.anyOf` | \{ `type`: `string` = "string" }[] |
| `properties.port` | \{ `type`: `string` = "number" } |
| `properties.port.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[config.ts:771](https://github.com/onzag/itemize/blob/59702dd5/config.ts#L771)

___

### rawSensitiveConfigSchema

• `Const` **rawSensitiveConfigSchema**: `Object`

A JSON validating schema for the sensitive configuration

#### Type declaration

| Name | Type |
| :------ | :------ |
| `additionalProperties` | `boolean` |
| `properties` | \{ `containers`: \{ `additionalProperties`: \{ `properties`: \{ `config`: \{ `additionalProperties`: {} = \{}; `type`: `string` = "object" } ; `type`: \{ `type`: `string` = "string" }  } ; `required`: `string`[] ; `type`: `string` = "object" } ; `type`: `string`[]  } ; `currencyFactors`: \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } ; `custom`: \{ `additionalProperties`: {} = \{}; `type`: `string` = "object" } ; `defaultContainerID`: \{ `type`: `string` = "string" } ; `devKey`: \{ `type`: `string` = "string" } ; `localContainer`: \{ `type`: `string` = "string" } ; `locationSearch`: \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } ; `logging`: \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } ; `mail`: \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } ; `payment`: \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } ; `phone`: \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } ; `shared`: \{ `additionalProperties`: {} = \{}; `type`: `string` = "object" } ; `userLocalization`: \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } ; `ussd`: \{ `additionalProperties`: {} = \{}; `type`: `string`[]  }  } |
| `properties.containers` | \{ `additionalProperties`: \{ `properties`: \{ `config`: \{ `additionalProperties`: {} = \{}; `type`: `string` = "object" } ; `type`: \{ `type`: `string` = "string" }  } ; `required`: `string`[] ; `type`: `string` = "object" } ; `type`: `string`[]  } |
| `properties.containers.additionalProperties` | \{ `properties`: \{ `config`: \{ `additionalProperties`: {} = \{}; `type`: `string` = "object" } ; `type`: \{ `type`: `string` = "string" }  } ; `required`: `string`[] ; `type`: `string` = "object" } |
| `properties.containers.additionalProperties.properties` | \{ `config`: \{ `additionalProperties`: {} = \{}; `type`: `string` = "object" } ; `type`: \{ `type`: `string` = "string" }  } |
| `properties.containers.additionalProperties.properties.config` | \{ `additionalProperties`: {} = \{}; `type`: `string` = "object" } |
| `properties.containers.additionalProperties.properties.config.additionalProperties` | {} |
| `properties.containers.additionalProperties.properties.config.type` | `string` |
| `properties.containers.additionalProperties.properties.type` | \{ `type`: `string` = "string" } |
| `properties.containers.additionalProperties.properties.type.type` | `string` |
| `properties.containers.additionalProperties.required` | `string`[] |
| `properties.containers.additionalProperties.type` | `string` |
| `properties.containers.type` | `string`[] |
| `properties.currencyFactors` | \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } |
| `properties.currencyFactors.additionalProperties` | {} |
| `properties.currencyFactors.type` | `string`[] |
| `properties.custom` | \{ `additionalProperties`: {} = \{}; `type`: `string` = "object" } |
| `properties.custom.additionalProperties` | {} |
| `properties.custom.type` | `string` |
| `properties.defaultContainerID` | \{ `type`: `string` = "string" } |
| `properties.defaultContainerID.type` | `string` |
| `properties.devKey` | \{ `type`: `string` = "string" } |
| `properties.devKey.type` | `string` |
| `properties.localContainer` | \{ `type`: `string` = "string" } |
| `properties.localContainer.type` | `string` |
| `properties.locationSearch` | \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } |
| `properties.locationSearch.additionalProperties` | {} |
| `properties.locationSearch.type` | `string`[] |
| `properties.logging` | \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } |
| `properties.logging.additionalProperties` | {} |
| `properties.logging.type` | `string`[] |
| `properties.mail` | \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } |
| `properties.mail.additionalProperties` | {} |
| `properties.mail.type` | `string`[] |
| `properties.payment` | \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } |
| `properties.payment.additionalProperties` | {} |
| `properties.payment.type` | `string`[] |
| `properties.phone` | \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } |
| `properties.phone.additionalProperties` | {} |
| `properties.phone.type` | `string`[] |
| `properties.shared` | \{ `additionalProperties`: {} = \{}; `type`: `string` = "object" } |
| `properties.shared.additionalProperties` | {} |
| `properties.shared.type` | `string` |
| `properties.userLocalization` | \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } |
| `properties.userLocalization.additionalProperties` | {} |
| `properties.userLocalization.type` | `string`[] |
| `properties.ussd` | \{ `additionalProperties`: {} = \{}; `type`: `string`[]  } |
| `properties.ussd.additionalProperties` | {} |
| `properties.ussd.type` | `string`[] |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[config.ts:361](https://github.com/onzag/itemize/blob/59702dd5/config.ts#L361)
