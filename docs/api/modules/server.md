[](../README.md) / [Exports](../modules.md) / server

# Module: server

This is the root server file and does the initialization
of the server side of things

## Table of contents

### Interfaces

- [IAppDataType](../interfaces/server.iappdatatype.md)
- [ISEOConfig](../interfaces/server.iseoconfig.md)
- [ISSRConfig](../interfaces/server.issrconfig.md)
- [IServerCustomizationDataType](../interfaces/server.iservercustomizationdatatype.md)
- [IServerDataType](../interfaces/server.iserverdatatype.md)
- [IServiceCustomizationType](../interfaces/server.iservicecustomizationtype.md)
- [IStorageProviders](../interfaces/server.istorageproviders.md)

### Variables

- [app](server.md#app)
- [logger](server.md#logger)

### Functions

- [getStorageProviders](server.md#getstorageproviders)
- [initializeServer](server.md#initializeserver)

## Variables

### app

• `Const` **app**: *Express*

Defined in: [server/index.ts:118](https://github.com/onzag/itemize/blob/55e63f2c/server/index.ts#L118)

___

### logger

• `Const` **logger**: winston.Logger

Defined in: [server/index.ts:78](https://github.com/onzag/itemize/blob/55e63f2c/server/index.ts#L78)

## Functions

### getStorageProviders

▸ **getStorageProviders**(`config`: [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md), `sensitiveConfig`: [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md), `storageServiceProviders`: [*IStorageProviders*](../interfaces/server.istorageproviders.md), `registry`: [*RegistryService*](../classes/server_services_registry.registryservice.md)): *Promise*<{ `classesUsed`: [*IServiceProviderClassType*](../interfaces/server_services.iserviceproviderclasstype.md)<any\>[] ; `cloudClients`: [*IStorageProvidersObject*](../interfaces/server_services_base_storageprovider.istorageprovidersobject.md) ; `instancesUsed`: [*default*](../classes/server_services_base_storageprovider.default.md)<any\>[]  }\>

#### Parameters:

Name | Type |
:------ | :------ |
`config` | [*IConfigRawJSONDataType*](../interfaces/config.iconfigrawjsondatatype.md) |
`sensitiveConfig` | [*ISensitiveConfigRawJSONDataType*](../interfaces/config.isensitiveconfigrawjsondatatype.md) |
`storageServiceProviders` | [*IStorageProviders*](../interfaces/server.istorageproviders.md) |
`registry` | [*RegistryService*](../classes/server_services_registry.registryservice.md) |

**Returns:** *Promise*<{ `classesUsed`: [*IServiceProviderClassType*](../interfaces/server_services.iserviceproviderclasstype.md)<any\>[] ; `cloudClients`: [*IStorageProvidersObject*](../interfaces/server_services_base_storageprovider.istorageprovidersobject.md) ; `instancesUsed`: [*default*](../classes/server_services_base_storageprovider.default.md)<any\>[]  }\>

Defined in: [server/index.ts:204](https://github.com/onzag/itemize/blob/55e63f2c/server/index.ts#L204)

___

### initializeServer

▸ **initializeServer**(`ssrConfig`: [*ISSRConfig*](../interfaces/server.issrconfig.md), `seoConfig`: [*ISEOConfig*](../interfaces/server.iseoconfig.md), `custom?`: [*IServerCustomizationDataType*](../interfaces/server.iservercustomizationdatatype.md)): *Promise*<void\>

Initializes the itemize server with its custom configuration

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`ssrConfig` | [*ISSRConfig*](../interfaces/server.issrconfig.md) | the server side rendering rules   |
`seoConfig` | [*ISEOConfig*](../interfaces/server.iseoconfig.md) | - |
`custom` | [*IServerCustomizationDataType*](../interfaces/server.iservercustomizationdatatype.md) | the customization details   |

**Returns:** *Promise*<void\>

Defined in: [server/index.ts:294](https://github.com/onzag/itemize/blob/55e63f2c/server/index.ts#L294)
