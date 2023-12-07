[@onzag/itemize](../README.md) / [Modules](../modules.md) / server

# Module: server

This is the root server file and does the initialization
of the server side of things

## Table of contents

### Interfaces

- [IAppDataType](../interfaces/server.IAppDataType.md)
- [ISEOConfig](../interfaces/server.ISEOConfig.md)
- [ISSRConfig](../interfaces/server.ISSRConfig.md)
- [IServerCustomizationDataType](../interfaces/server.IServerCustomizationDataType.md)
- [IServerDataType](../interfaces/server.IServerDataType.md)
- [IServiceCustomizationType](../interfaces/server.IServiceCustomizationType.md)
- [IStorageProviders](../interfaces/server.IStorageProviders.md)

### Variables

- [app](server.md#app)

### Functions

- [getStorageProviders](server.md#getstorageproviders)
- [initializeServer](server.md#initializeserver)

## Variables

### app

• **app**: `Express`

#### Defined in

[server/index.ts:147](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L147)

## Functions

### getStorageProviders

▸ **getStorageProviders**(`config`, `sensitiveConfig`, `dbConfig`, `redisConfig`, `storageServiceProviders`, `registry`): `Promise`<{ `classesUsed`: [`IServiceProviderClassType`](../interfaces/server_services.IServiceProviderClassType.md)<`any`\>[] ; `cloudClients`: [`IStorageProvidersObject`](../interfaces/server_services_base_StorageProvider.IStorageProvidersObject.md) ; `instancesUsed`: [`default`](../classes/server_services_base_StorageProvider.default.md)<`any`\>[]  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |
| `dbConfig` | [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md) |
| `redisConfig` | [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md) |
| `storageServiceProviders` | [`IStorageProviders`](../interfaces/server.IStorageProviders.md) |
| `registry` | [`RegistryService`](../classes/server_services_registry.RegistryService.md) |

#### Returns

`Promise`<{ `classesUsed`: [`IServiceProviderClassType`](../interfaces/server_services.IServiceProviderClassType.md)<`any`\>[] ; `cloudClients`: [`IStorageProvidersObject`](../interfaces/server_services_base_StorageProvider.IStorageProvidersObject.md) ; `instancesUsed`: [`default`](../classes/server_services_base_StorageProvider.default.md)<`any`\>[]  }\>

#### Defined in

[server/index.ts:286](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L286)

___

### initializeServer

▸ **initializeServer**(`ssrConfig`, `seoConfig`, `custom?`): `Promise`<`void`\>

Initializes the itemize server with its custom configuration

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ssrConfig` | [`ISSRConfig`](../interfaces/server.ISSRConfig.md) | the server side rendering rules |
| `seoConfig` | [`ISEOConfig`](../interfaces/server.ISEOConfig.md) | - |
| `custom` | [`IServerCustomizationDataType`](../interfaces/server.IServerCustomizationDataType.md) | the customization details |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/index.ts:393](https://github.com/onzag/itemize/blob/a24376ed/server/index.ts#L393)
