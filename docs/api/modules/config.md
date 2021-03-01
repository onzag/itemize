[](../README.md) / [Exports](../modules.md) / config

# Module: config

Represents the stanard redis and sensitive config information an schemas

## Table of contents

### Interfaces

- [IConfigManifestType](../interfaces/config.iconfigmanifesttype.md)
- [IConfigRawJSONDataType](../interfaces/config.iconfigrawjsondatatype.md)
- [IDBConfigRawJSONDataType](../interfaces/config.idbconfigrawjsondatatype.md)
- [IDumpConfigRawJSONDataType](../interfaces/config.idumpconfigrawjsondatatype.md)
- [IDumpSpecificIdefInfoType](../interfaces/config.idumpspecificidefinfotype.md)
- [IDumpSpecificModInfoType](../interfaces/config.idumpspecificmodinfotype.md)
- [IRedisConfigRawJSONDataType](../interfaces/config.iredisconfigrawjsondatatype.md)
- [ISensitiveConfigRawJSONDataType](../interfaces/config.isensitiveconfigrawjsondatatype.md)
- [ISingleRedisConfigRawJSONDataType](../interfaces/config.isingleredisconfigrawjsondatatype.md)

### Variables

- [dumpConfigSchema](config.md#dumpconfigschema)
- [rawConfigSchema](config.md#rawconfigschema)
- [rawDBConfigSchema](config.md#rawdbconfigschema)
- [rawRedisConfigSchema](config.md#rawredisconfigschema)
- [rawRedisConfigSchemaPart](config.md#rawredisconfigschemapart)
- [rawSensitiveConfigSchema](config.md#rawsensitiveconfigschema)

## Variables

### dumpConfigSchema

• `Const` **dumpConfigSchema**: *object*

A json validating schema for the dump configuration

#### Type declaration:

Name | Type |
:------ | :------ |
`properties` | *object* |
`properties.load` | *object* |
`properties.load.properties` | *object* |
`properties.load.properties.previousContainerIdMapper` | *object* |
`properties.load.properties.previousContainerIdMapper.additionalProperties` | *object* |
`properties.load.properties.previousContainerIdMapper.additionalProperties.items` | *object* |
`properties.load.properties.previousContainerIdMapper.additionalProperties.items.type` | *string* |
`properties.load.properties.previousContainerIdMapper.additionalProperties.type` | *string* |
`properties.load.properties.previousContainerIdMapper.type` | *string* |
`properties.load.properties.primaryContainerId` | *object* |
`properties.load.properties.primaryContainerId.type` | *string* |
`properties.load.properties.versionMapper` | *object* |
`properties.load.properties.versionMapper.additionalProperties` | *object* |
`properties.load.properties.versionMapper.additionalProperties.items` | *object* |
`properties.load.properties.versionMapper.additionalProperties.items.type` | *string* |
`properties.load.properties.versionMapper.additionalProperties.type` | *string* |
`properties.load.properties.versionMapper.type` | *string* |
`properties.load.required` | *string*[] |
`properties.load.type` | *string* |
`properties.save` | *object* |
`properties.save.anyOf` | ({ `additionalProperties`: *undefined* ; `type`: *string* = "boolean" } \| { `additionalProperties`: { `anyOf`: ({ `additionalProperties`: *undefined* ; `items`: *undefined* ; `maxItems`: *undefined* = 2; `minItems`: *undefined* = 2; `type`: *string* = "boolean" } \| { `additionalProperties`: *undefined* ; `items`: { `anyOf`: *undefined* ; `type`: *string* = "number" } ; `maxItems`: *undefined* = 2; `minItems`: *undefined* = 2; `type`: *string* = "array" } \| { `additionalProperties`: *undefined* ; `items`: { `anyOf`: { `type`: *string* = "string" }[] ; `type`: *undefined* = "number" } ; `maxItems`: *number* = 2; `minItems`: *number* = 2; `type`: *string* = "array" } \| { `additionalProperties`: { `anyOf`: ({ `items`: *undefined* ; `maxItems`: *undefined* = 2; `minItems`: *undefined* = 2; `type`: *string* = "boolean" } \| { `items`: { `anyOf`: *undefined* ; `type`: *string* = "number" } ; `maxItems`: *undefined* = 2; `minItems`: *undefined* = 2; `type`: *string* = "array" } \| { `items`: { `anyOf`: { `type`: *string* = "string" }[] ; `type`: *undefined* = "number" } ; `maxItems`: *number* = 2; `minItems`: *number* = 2; `type`: *string* = "array" })[]  } ; `items`: *undefined* ; `maxItems`: *undefined* = 2; `minItems`: *undefined* = 2; `type`: *string* = "object" })[]  } ; `type`: *string* = "object" })[] |
`type` | *string* |

Defined in: [config.ts:414](https://github.com/onzag/itemize/blob/3efa2a4a/config.ts#L414)

___

### rawConfigSchema

• `Const` **rawConfigSchema**: *object*

A json validating schema for the standard configuration

#### Type declaration:

Name | Type |
:------ | :------ |
`additionalProperties` | *boolean* |
`properties` | *object* |
`properties.appName` | *object* |
`properties.appName.type` | *string* |
`properties.cacheableExtHostnames` | *object* |
`properties.cacheableExtHostnames.items` | *object* |
`properties.cacheableExtHostnames.items.type` | *string* |
`properties.cacheableExtHostnames.type` | *string* |
`properties.containersHostnamePrefixes` | *object* |
`properties.containersHostnamePrefixes.additionalProperties` | *object* |
`properties.containersHostnamePrefixes.additionalProperties.type` | *string* |
`properties.containersHostnamePrefixes.type` | *string* |
`properties.containersRegionMappers` | *object* |
`properties.containersRegionMappers.additionalProperties` | *object* |
`properties.containersRegionMappers.additionalProperties.type` | *string* |
`properties.containersRegionMappers.minProperties` | *number* |
`properties.containersRegionMappers.type` | *string* |
`properties.custom` | *object* |
`properties.custom.additionalProperties` | *object* |
`properties.custom.type` | *string* |
`properties.developmentHostname` | *object* |
`properties.developmentHostname.type` | *string* |
`properties.dictionaries` | *object* |
`properties.dictionaries.additionalProperties` | *object* |
`properties.dictionaries.additionalProperties.type` | *string* |
`properties.dictionaries.type` | *string* |
`properties.entry` | *object* |
`properties.entry.type` | *string* |
`properties.fallbackCountryCode` | *object* |
`properties.fallbackCountryCode.type` | *string* |
`properties.fallbackCurrency` | *object* |
`properties.fallbackCurrency.type` | *string* |
`properties.fallbackLanguage` | *object* |
`properties.fallbackLanguage.type` | *string* |
`properties.fontName` | *object* |
`properties.fontName.type` | *string* |
`properties.fontUrl` | *object* |
`properties.fontUrl.type` | *string* |
`properties.manifest` | *object* |
`properties.manifest.additionalProperties` | *boolean* |
`properties.manifest.properties` | *object* |
`properties.manifest.properties.backgroundColor` | *object* |
`properties.manifest.properties.backgroundColor.type` | *string* |
`properties.manifest.properties.display` | *object* |
`properties.manifest.properties.display.enum` | *string*[] |
`properties.manifest.properties.display.type` | *string* |
`properties.manifest.properties.macSafariMaskIconThemeColor` | *object* |
`properties.manifest.properties.macSafariMaskIconThemeColor.type` | *string* |
`properties.manifest.properties.msTileColor` | *object* |
`properties.manifest.properties.msTileColor.type` | *string* |
`properties.manifest.properties.orientation` | *object* |
`properties.manifest.properties.orientation.enum` | *string*[] |
`properties.manifest.properties.orientation.type` | *string* |
`properties.manifest.properties.themeColor` | *object* |
`properties.manifest.properties.themeColor.type` | *string* |
`properties.manifest.required` | *string*[] |
`properties.manifest.type` | *string* |
`properties.productionHostname` | *object* |
`properties.productionHostname.type` | *string* |
`properties.roles` | *object* |
`properties.roles.items` | *object* |
`properties.roles.items.type` | *string* |
`properties.roles.type` | *string* |
`properties.rtlLanguages` | *object* |
`properties.rtlLanguages.items` | *object* |
`properties.rtlLanguages.items.type` | *string* |
`properties.rtlLanguages.type` | *string* |
`properties.supportedLanguages` | *object* |
`properties.supportedLanguages.items` | *object* |
`properties.supportedLanguages.items.type` | *string* |
`properties.supportedLanguages.type` | *string* |
`required` | *string*[] |
`type` | *string* |

Defined in: [config.ts:521](https://github.com/onzag/itemize/blob/3efa2a4a/config.ts#L521)

___

### rawDBConfigSchema

• `Const` **rawDBConfigSchema**: *object*

A json validating schema for the database configuration

#### Type declaration:

Name | Type |
:------ | :------ |
`additionalProperties` | *boolean* |
`properties` | *object* |
`properties.database` | *object* |
`properties.database.type` | *string* |
`properties.host` | *object* |
`properties.host.type` | *string* |
`properties.password` | *object* |
`properties.password.type` | *string* |
`properties.port` | *object* |
`properties.port.type` | *string* |
`properties.user` | *object* |
`properties.user.type` | *string* |
`required` | *string*[] |
`type` | *string* |

Defined in: [config.ts:658](https://github.com/onzag/itemize/blob/3efa2a4a/config.ts#L658)

___

### rawRedisConfigSchema

• `Const` **rawRedisConfigSchema**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`additionalProperties` | *boolean* |
`properties` | *object* |
`properties.cache` | *object* |
`properties.cache.additionalProperties` | *boolean* |
`properties.cache.properties` | *object* |
`properties.cache.properties.db` | *object* |
`properties.cache.properties.db.anyOf` | { `type`: *string* = "number" }[] |
`properties.cache.properties.host` | *object* |
`properties.cache.properties.host.type` | *string* |
`properties.cache.properties.password` | *object* |
`properties.cache.properties.password.anyOf` | { `type`: *string* = "string" }[] |
`properties.cache.properties.path` | *object* |
`properties.cache.properties.path.anyOf` | { `type`: *string* = "string" }[] |
`properties.cache.properties.port` | *object* |
`properties.cache.properties.port.type` | *string* |
`properties.cache.required` | *string*[] |
`properties.cache.type` | *string* |
`properties.global` | *object* |
`properties.global.additionalProperties` | *boolean* |
`properties.global.properties` | *object* |
`properties.global.properties.db` | *object* |
`properties.global.properties.db.anyOf` | { `type`: *string* = "number" }[] |
`properties.global.properties.host` | *object* |
`properties.global.properties.host.type` | *string* |
`properties.global.properties.password` | *object* |
`properties.global.properties.password.anyOf` | { `type`: *string* = "string" }[] |
`properties.global.properties.path` | *object* |
`properties.global.properties.path.anyOf` | { `type`: *string* = "string" }[] |
`properties.global.properties.port` | *object* |
`properties.global.properties.port.type` | *string* |
`properties.global.required` | *string*[] |
`properties.global.type` | *string* |
`properties.pubSub` | *object* |
`properties.pubSub.additionalProperties` | *boolean* |
`properties.pubSub.properties` | *object* |
`properties.pubSub.properties.db` | *object* |
`properties.pubSub.properties.db.anyOf` | { `type`: *string* = "number" }[] |
`properties.pubSub.properties.host` | *object* |
`properties.pubSub.properties.host.type` | *string* |
`properties.pubSub.properties.password` | *object* |
`properties.pubSub.properties.password.anyOf` | { `type`: *string* = "string" }[] |
`properties.pubSub.properties.path` | *object* |
`properties.pubSub.properties.path.anyOf` | { `type`: *string* = "string" }[] |
`properties.pubSub.properties.port` | *object* |
`properties.pubSub.properties.port.type` | *string* |
`properties.pubSub.required` | *string*[] |
`properties.pubSub.type` | *string* |
`required` | *string*[] |
`type` | *string* |

Defined in: [config.ts:740](https://github.com/onzag/itemize/blob/3efa2a4a/config.ts#L740)

___

### rawRedisConfigSchemaPart

• `Const` **rawRedisConfigSchemaPart**: *object*

A json validating schema for the redis config

#### Type declaration:

Name | Type |
:------ | :------ |
`additionalProperties` | *boolean* |
`properties` | *object* |
`properties.db` | *object* |
`properties.db.anyOf` | { `type`: *string* = "number" }[] |
`properties.host` | *object* |
`properties.host.type` | *string* |
`properties.password` | *object* |
`properties.password.anyOf` | { `type`: *string* = "string" }[] |
`properties.path` | *object* |
`properties.path.anyOf` | { `type`: *string* = "string" }[] |
`properties.port` | *object* |
`properties.port.type` | *string* |
`required` | *string*[] |
`type` | *string* |

Defined in: [config.ts:690](https://github.com/onzag/itemize/blob/3efa2a4a/config.ts#L690)

___

### rawSensitiveConfigSchema

• `Const` **rawSensitiveConfigSchema**: *object*

A JSON validating schema for the sensitive configuration

#### Type declaration:

Name | Type |
:------ | :------ |
`additionalProperties` | *boolean* |
`properties` | *object* |
`properties.containers` | *object* |
`properties.containers.additionalProperties` | *object* |
`properties.containers.additionalProperties.properties` | *object* |
`properties.containers.additionalProperties.properties.config` | *object* |
`properties.containers.additionalProperties.properties.config.additionalProperties` | *object* |
`properties.containers.additionalProperties.properties.config.type` | *string* |
`properties.containers.additionalProperties.properties.type` | *object* |
`properties.containers.additionalProperties.properties.type.type` | *string* |
`properties.containers.additionalProperties.required` | *string*[] |
`properties.containers.additionalProperties.type` | *string* |
`properties.containers.type` | *string*[] |
`properties.currencyFactors` | *object* |
`properties.currencyFactors.additionalProperties` | *object* |
`properties.currencyFactors.type` | *string*[] |
`properties.custom` | *object* |
`properties.custom.additionalProperties` | *object* |
`properties.custom.type` | *string* |
`properties.defaultContainerID` | *object* |
`properties.defaultContainerID.type` | *string* |
`properties.devKey` | *object* |
`properties.devKey.type` | *string* |
`properties.jwtKey` | *object* |
`properties.jwtKey.type` | *string* |
`properties.localContainer` | *object* |
`properties.localContainer.type` | *string* |
`properties.locationSearch` | *object* |
`properties.locationSearch.additionalProperties` | *object* |
`properties.locationSearch.type` | *string*[] |
`properties.mail` | *object* |
`properties.mail.additionalProperties` | *object* |
`properties.mail.type` | *string*[] |
`properties.mailDomain` | *object* |
`properties.mailDomain.type` | *string*[] |
`properties.mailStorage` | *object* |
`properties.mailStorage.type` | *string*[] |
`properties.secondaryJwtKey` | *object* |
`properties.secondaryJwtKey.type` | *string* |
`properties.seoContainerID` | *object* |
`properties.seoContainerID.type` | *string* |
`properties.userLocalization` | *object* |
`properties.userLocalization.additionalProperties` | *object* |
`properties.userLocalization.type` | *string*[] |
`required` | *string*[] |
`type` | *string* |

Defined in: [config.ts:328](https://github.com/onzag/itemize/blob/3efa2a4a/config.ts#L328)
