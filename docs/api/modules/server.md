[@onzag/itemize](../README.md) / [Modules](../modules.md) / server

# Module: server

This is the root server file and does the initialization
of the server side of things

## Table of contents

### Namespaces

- [app](server.app.md)

### Interfaces

- [IAppDataType](../interfaces/server.IAppDataType.md)
- [ISEOConfig](../interfaces/server.ISEOConfig.md)
- [ISSRConfig](../interfaces/server.ISSRConfig.md)
- [IServerCustomizationDataType](../interfaces/server.IServerCustomizationDataType.md)
- [IServerDataType](../interfaces/server.IServerDataType.md)
- [IServiceCustomizationType](../interfaces/server.IServiceCustomizationType.md)
- [IStorageProviders](../interfaces/server.IStorageProviders.md)

### Functions

- [app](server.md#app)
- [getStorageProviders](server.md#getstorageproviders)
- [initializeServer](server.md#initializeserver)

## Functions

### app

▸ **app**(`req`, `res`): `any`

Express instance itself is a request handler, which could be invoked without
third argument.

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `IncomingMessage` \| `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `res` | `ServerResponse` \| `Response`\<`any`, `Record`\<`string`, `any`\>, `number`\> |

#### Returns

`any`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:1061

▸ **app**(`req`, `res`, `next`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`\<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`\<`string`, `any`\>\> |
| `res` | `Response`\<`any`, `Record`\<`string`, `any`\>, `number`\> |
| `next` | `NextFunction` |

#### Returns

`void`

#### Defined in

node_modules/@types/express-serve-static-core/index.d.ts:60

___

### getStorageProviders

▸ **getStorageProviders**(`config`, `sensitiveConfig`, `dbConfig`, `redisConfig`, `storageServiceProviders`, `registry`): `Promise`\<\{ `classesUsed`: [`IServiceProviderClassType`](../interfaces/server_services.IServiceProviderClassType.md)\<`any`\>[] ; `cloudClients`: [`IStorageProvidersObject`](../interfaces/server_services_base_StorageProvider.IStorageProvidersObject.md) ; `instancesUsed`: [`default`](../classes/server_services_base_StorageProvider.default.md)\<`any`\>[]  }\>

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

`Promise`\<\{ `classesUsed`: [`IServiceProviderClassType`](../interfaces/server_services.IServiceProviderClassType.md)\<`any`\>[] ; `cloudClients`: [`IStorageProvidersObject`](../interfaces/server_services_base_StorageProvider.IStorageProvidersObject.md) ; `instancesUsed`: [`default`](../classes/server_services_base_StorageProvider.default.md)\<`any`\>[]  }\>

#### Defined in

[server/index.ts:281](https://github.com/onzag/itemize/blob/73e0c39e/server/index.ts#L281)

___

### initializeServer

▸ **initializeServer**(`ssrConfig`, `seoConfig`, `custom?`): `Promise`\<`void`\>

Initializes the itemize server with its custom configuration

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ssrConfig` | [`ISSRConfig`](../interfaces/server.ISSRConfig.md) | the server side rendering rules |
| `seoConfig` | [`ISEOConfig`](../interfaces/server.ISEOConfig.md) | - |
| `custom` | [`IServerCustomizationDataType`](../interfaces/server.IServerCustomizationDataType.md) | the customization details |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/index.ts:384](https://github.com/onzag/itemize/blob/73e0c39e/server/index.ts#L384)
