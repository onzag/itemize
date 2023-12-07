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

• **dumpConfigSchema**: `Object`

A json validating schema for the dump configuration

#### Type declaration

| Name | Type |
| :------ | :------ |
| `properties` | `Object` |
| `properties.load` | `Object` |
| `properties.load.properties` | `Object` |
| `properties.load.properties.previousContainerIdMapper` | `Object` |
| `properties.load.properties.previousContainerIdMapper.additionalProperties` | `Object` |
| `properties.load.properties.previousContainerIdMapper.additionalProperties.items` | `Object` |
| `properties.load.properties.previousContainerIdMapper.additionalProperties.items.type` | `string` |
| `properties.load.properties.previousContainerIdMapper.additionalProperties.type` | `string` |
| `properties.load.properties.previousContainerIdMapper.type` | `string` |
| `properties.load.properties.primaryContainerId` | `Object` |
| `properties.load.properties.primaryContainerId.type` | `string` |
| `properties.load.properties.versionMapper` | `Object` |
| `properties.load.properties.versionMapper.additionalProperties` | `Object` |
| `properties.load.properties.versionMapper.additionalProperties.items` | `Object` |
| `properties.load.properties.versionMapper.additionalProperties.items.type` | `string` |
| `properties.load.properties.versionMapper.additionalProperties.type` | `string` |
| `properties.load.properties.versionMapper.type` | `string` |
| `properties.load.required` | `string`[] |
| `properties.load.type` | `string` |
| `properties.save` | `Object` |
| `properties.save.anyOf` | ({ `additionalProperties`: `undefined` ; `type`: `string` = "boolean" } \| { `additionalProperties`: { `anyOf`: ({ `additionalProperties`: `undefined` ; `enum`: `undefined` ; `items`: `undefined` ; `maxItems`: `undefined` = 2; `minItems`: `undefined` = 2; `type`: `string` = "boolean" } \| { `additionalProperties`: `undefined` ; `enum`: `string`[] ; `items`: `undefined` ; `maxItems`: `undefined` = 2; `minItems`: `undefined` = 2; `type`: `undefined` = "array" } \| { `additionalProperties`: `undefined` ; `enum`: `undefined` ; `items`: { `anyOf`: `undefined` ; `type`: `string` = "number" } ; `maxItems`: `undefined` = 2; `minItems`: `undefined` = 2; `type`: `string` = "array" } \| { `additionalProperties`: `undefined` ; `enum`: `undefined` ; `items`: { `anyOf`: { `type`: `string` = "string" }[] ; `type`: `undefined` = "array" } ; `maxItems`: `number` = 2; `minItems`: `number` = 2; `type`: `string` = "array" } \| { `additionalProperties`: { `anyOf`: ({ `enum`: `undefined` ; `items`: `undefined` ; `maxItems`: `undefined` = 2; `minItems`: `undefined` = 2; `type`: `string` = "boolean" } \| { `enum`: `string`[] ; `items`: `undefined` ; `maxItems`: `undefined` = 2; `minItems`: `undefined` = 2; `type`: `undefined` = "array" } \| { `enum`: `undefined` ; `items`: { `anyOf`: `undefined` ; `type`: `string` = "number" } ; `maxItems`: `undefined` = 2; `minItems`: `undefined` = 2; `type`: `string` = "array" } \| { `enum`: `undefined` ; `items`: { `anyOf`: { `type`: `string` = "string" }[] ; `type`: `undefined` = "array" } ; `maxItems`: `number` = 2; `minItems`: `number` = 2; `type`: `string` = "array" })[]  } ; `enum`: `undefined` ; `items`: `undefined` ; `maxItems`: `undefined` = 2; `minItems`: `undefined` = 2; `type`: `string` = "object" })[]  } ; `type`: `string` = "object" })[] |
| `type` | `string` |

#### Defined in

[config.ts:451](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L451)

___

### rawConfigSchema

• **rawConfigSchema**: `Object`

A json validating schema for the standard configuration

#### Type declaration

| Name | Type |
| :------ | :------ |
| `additionalProperties` | `boolean` |
| `properties` | `Object` |
| `properties.appName` | `Object` |
| `properties.appName.type` | `string` |
| `properties.cacheableExtHostnames` | `Object` |
| `properties.cacheableExtHostnames.items` | `Object` |
| `properties.cacheableExtHostnames.items.type` | `string` |
| `properties.cacheableExtHostnames.type` | `string` |
| `properties.cachedExtUrls` | `Object` |
| `properties.cachedExtUrls.items` | `Object` |
| `properties.cachedExtUrls.items.type` | `string` |
| `properties.cachedExtUrls.type` | `string` |
| `properties.cachedResources` | `Object` |
| `properties.cachedResources.items` | `Object` |
| `properties.cachedResources.items.type` | `string` |
| `properties.cachedResources.type` | `string` |
| `properties.containersHostnamePrefixes` | `Object` |
| `properties.containersHostnamePrefixes.additionalProperties` | `Object` |
| `properties.containersHostnamePrefixes.additionalProperties.type` | `string` |
| `properties.containersHostnamePrefixes.type` | `string` |
| `properties.containersRegionMappers` | `Object` |
| `properties.containersRegionMappers.additionalProperties` | `Object` |
| `properties.containersRegionMappers.additionalProperties.type` | `string` |
| `properties.containersRegionMappers.minProperties` | `number` |
| `properties.containersRegionMappers.type` | `string` |
| `properties.custom` | `Object` |
| `properties.custom.additionalProperties` | `Object` |
| `properties.custom.type` | `string` |
| `properties.developmentHostname` | `Object` |
| `properties.developmentHostname.type` | `string` |
| `properties.entry` | `Object` |
| `properties.entry.type` | `string` |
| `properties.fallbackCountryCode` | `Object` |
| `properties.fallbackCountryCode.type` | `string` |
| `properties.fallbackCurrency` | `Object` |
| `properties.fallbackCurrency.type` | `string` |
| `properties.fallbackLanguage` | `Object` |
| `properties.fallbackLanguage.type` | `string` |
| `properties.fontName` | `Object` |
| `properties.fontName.type` | `string` |
| `properties.fontUrl` | `Object` |
| `properties.fontUrl.type` | `string` |
| `properties.mailDomain` | `Object` |
| `properties.mailDomain.type` | `string`[] |
| `properties.mailStorage` | `Object` |
| `properties.mailStorage.type` | `string`[] |
| `properties.manifest` | `Object` |
| `properties.manifest.additionalProperties` | `boolean` |
| `properties.manifest.properties` | `Object` |
| `properties.manifest.properties.backgroundColor` | `Object` |
| `properties.manifest.properties.backgroundColor.type` | `string` |
| `properties.manifest.properties.display` | `Object` |
| `properties.manifest.properties.display.enum` | `string`[] |
| `properties.manifest.properties.display.type` | `string` |
| `properties.manifest.properties.macSafariMaskIconThemeColor` | `Object` |
| `properties.manifest.properties.macSafariMaskIconThemeColor.type` | `string` |
| `properties.manifest.properties.msTileColor` | `Object` |
| `properties.manifest.properties.msTileColor.type` | `string` |
| `properties.manifest.properties.orientation` | `Object` |
| `properties.manifest.properties.orientation.enum` | `string`[] |
| `properties.manifest.properties.orientation.type` | `string` |
| `properties.manifest.properties.themeColor` | `Object` |
| `properties.manifest.properties.themeColor.type` | `string` |
| `properties.manifest.required` | `string`[] |
| `properties.manifest.type` | `string` |
| `properties.productionHostname` | `Object` |
| `properties.productionHostname.type` | `string` |
| `properties.roles` | `Object` |
| `properties.roles.items` | `Object` |
| `properties.roles.items.type` | `string` |
| `properties.roles.type` | `string` |
| `properties.rtlLanguages` | `Object` |
| `properties.rtlLanguages.items` | `Object` |
| `properties.rtlLanguages.items.type` | `string` |
| `properties.rtlLanguages.type` | `string` |
| `properties.shared` | `Object` |
| `properties.shared.additionalProperties` | `Object` |
| `properties.shared.type` | `string` |
| `properties.supportedLanguages` | `Object` |
| `properties.supportedLanguages.items` | `Object` |
| `properties.supportedLanguages.items.type` | `string` |
| `properties.supportedLanguages.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[config.ts:564](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L564)

___

### rawDBConfigSchema

• **rawDBConfigSchema**: `Object`

A json validating schema for the database configuration

#### Type declaration

| Name | Type |
| :------ | :------ |
| `additionalProperties` | `boolean` |
| `properties` | `Object` |
| `properties.database` | `Object` |
| `properties.database.type` | `string` |
| `properties.dictionaries` | `Object` |
| `properties.dictionaries.additionalProperties` | `Object` |
| `properties.dictionaries.additionalProperties.type` | `string` |
| `properties.dictionaries.type` | `string` |
| `properties.elastic` | `Object` |
| `properties.elastic.additionalProperties` | `Object` |
| `properties.elastic.type` | `string`[] |
| `properties.elasticLangAnalyzers` | `Object` |
| `properties.elasticLangAnalyzers.additionalProperties` | `Object` |
| `properties.elasticLangAnalyzers.additionalProperties.type` | `string` |
| `properties.elasticLangAnalyzers.type` | `string`[] |
| `properties.host` | `Object` |
| `properties.host.type` | `string` |
| `properties.password` | `Object` |
| `properties.password.type` | `string` |
| `properties.port` | `Object` |
| `properties.port.type` | `string` |
| `properties.user` | `Object` |
| `properties.user.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[config.ts:720](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L720)

___

### rawRedisConfigSchema

• **rawRedisConfigSchema**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `additionalProperties` | `boolean` |
| `properties` | `Object` |
| `properties.cache` | `Object` |
| `properties.cache.additionalProperties` | `boolean` |
| `properties.cache.properties` | `Object` |
| `properties.cache.properties.db` | `Object` |
| `properties.cache.properties.db.anyOf` | { `type`: `string` = "number" }[] |
| `properties.cache.properties.host` | `Object` |
| `properties.cache.properties.host.type` | `string` |
| `properties.cache.properties.password` | `Object` |
| `properties.cache.properties.password.anyOf` | { `type`: `string` = "string" }[] |
| `properties.cache.properties.path` | `Object` |
| `properties.cache.properties.path.anyOf` | { `type`: `string` = "string" }[] |
| `properties.cache.properties.port` | `Object` |
| `properties.cache.properties.port.type` | `string` |
| `properties.cache.required` | `string`[] |
| `properties.cache.type` | `string` |
| `properties.global` | `Object` |
| `properties.global.additionalProperties` | `boolean` |
| `properties.global.properties` | `Object` |
| `properties.global.properties.db` | `Object` |
| `properties.global.properties.db.anyOf` | { `type`: `string` = "number" }[] |
| `properties.global.properties.host` | `Object` |
| `properties.global.properties.host.type` | `string` |
| `properties.global.properties.password` | `Object` |
| `properties.global.properties.password.anyOf` | { `type`: `string` = "string" }[] |
| `properties.global.properties.path` | `Object` |
| `properties.global.properties.path.anyOf` | { `type`: `string` = "string" }[] |
| `properties.global.properties.port` | `Object` |
| `properties.global.properties.port.type` | `string` |
| `properties.global.required` | `string`[] |
| `properties.global.type` | `string` |
| `properties.pubSub` | `Object` |
| `properties.pubSub.additionalProperties` | `boolean` |
| `properties.pubSub.properties` | `Object` |
| `properties.pubSub.properties.db` | `Object` |
| `properties.pubSub.properties.db.anyOf` | { `type`: `string` = "number" }[] |
| `properties.pubSub.properties.host` | `Object` |
| `properties.pubSub.properties.host.type` | `string` |
| `properties.pubSub.properties.password` | `Object` |
| `properties.pubSub.properties.password.anyOf` | { `type`: `string` = "string" }[] |
| `properties.pubSub.properties.path` | `Object` |
| `properties.pubSub.properties.path.anyOf` | { `type`: `string` = "string" }[] |
| `properties.pubSub.properties.port` | `Object` |
| `properties.pubSub.properties.port.type` | `string` |
| `properties.pubSub.required` | `string`[] |
| `properties.pubSub.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[config.ts:821](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L821)

___

### rawRedisConfigSchemaPart

• **rawRedisConfigSchemaPart**: `Object`

A json validating schema for the redis config

#### Type declaration

| Name | Type |
| :------ | :------ |
| `additionalProperties` | `boolean` |
| `properties` | `Object` |
| `properties.db` | `Object` |
| `properties.db.anyOf` | { `type`: `string` = "number" }[] |
| `properties.host` | `Object` |
| `properties.host.type` | `string` |
| `properties.password` | `Object` |
| `properties.password.anyOf` | { `type`: `string` = "string" }[] |
| `properties.path` | `Object` |
| `properties.path.anyOf` | { `type`: `string` = "string" }[] |
| `properties.port` | `Object` |
| `properties.port.type` | `string` |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[config.ts:771](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L771)

___

### rawSensitiveConfigSchema

• **rawSensitiveConfigSchema**: `Object`

A JSON validating schema for the sensitive configuration

#### Type declaration

| Name | Type |
| :------ | :------ |
| `additionalProperties` | `boolean` |
| `properties` | `Object` |
| `properties.containers` | `Object` |
| `properties.containers.additionalProperties` | `Object` |
| `properties.containers.additionalProperties.properties` | `Object` |
| `properties.containers.additionalProperties.properties.config` | `Object` |
| `properties.containers.additionalProperties.properties.config.additionalProperties` | `Object` |
| `properties.containers.additionalProperties.properties.config.type` | `string` |
| `properties.containers.additionalProperties.properties.type` | `Object` |
| `properties.containers.additionalProperties.properties.type.type` | `string` |
| `properties.containers.additionalProperties.required` | `string`[] |
| `properties.containers.additionalProperties.type` | `string` |
| `properties.containers.type` | `string`[] |
| `properties.currencyFactors` | `Object` |
| `properties.currencyFactors.additionalProperties` | `Object` |
| `properties.currencyFactors.type` | `string`[] |
| `properties.custom` | `Object` |
| `properties.custom.additionalProperties` | `Object` |
| `properties.custom.type` | `string` |
| `properties.defaultContainerID` | `Object` |
| `properties.defaultContainerID.type` | `string` |
| `properties.devKey` | `Object` |
| `properties.devKey.type` | `string` |
| `properties.localContainer` | `Object` |
| `properties.localContainer.type` | `string` |
| `properties.locationSearch` | `Object` |
| `properties.locationSearch.additionalProperties` | `Object` |
| `properties.locationSearch.type` | `string`[] |
| `properties.logging` | `Object` |
| `properties.logging.additionalProperties` | `Object` |
| `properties.logging.type` | `string`[] |
| `properties.mail` | `Object` |
| `properties.mail.additionalProperties` | `Object` |
| `properties.mail.type` | `string`[] |
| `properties.payment` | `Object` |
| `properties.payment.additionalProperties` | `Object` |
| `properties.payment.type` | `string`[] |
| `properties.phone` | `Object` |
| `properties.phone.additionalProperties` | `Object` |
| `properties.phone.type` | `string`[] |
| `properties.shared` | `Object` |
| `properties.shared.additionalProperties` | `Object` |
| `properties.shared.type` | `string` |
| `properties.userLocalization` | `Object` |
| `properties.userLocalization.additionalProperties` | `Object` |
| `properties.userLocalization.type` | `string`[] |
| `properties.ussd` | `Object` |
| `properties.ussd.additionalProperties` | `Object` |
| `properties.ussd.type` | `string`[] |
| `required` | `string`[] |
| `type` | `string` |

#### Defined in

[config.ts:361](https://github.com/onzag/itemize/blob/a24376ed/config.ts#L361)
