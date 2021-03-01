[](../README.md) / [Exports](../modules.md) / [server/services](../modules/server_services.md) / IServiceProviderClassType

# Interface: IServiceProviderClassType<T\>

[server/services](../modules/server_services.md).IServiceProviderClassType

## Type parameters

Name |
:------ |
`T` |

## Table of contents

### Constructors

- [constructor](server_services.iserviceproviderclasstype.md#constructor)

### Properties

- [getRouter](server_services.iserviceproviderclasstype.md#getrouter)
- [getTriggerRegistry](server_services.iserviceproviderclasstype.md#gettriggerregistry)
- [getType](server_services.iserviceproviderclasstype.md#gettype)

## Constructors

### constructor

\+ **new IServiceProviderClassType**(`config`: T, `registry`: [*RegistryService*](../classes/server_services_registry.registryservice.md), `appConfig`: [*IConfigRawJSONDataType*](config.iconfigrawjsondatatype.md), `appSensitiveConfig`: [*ISensitiveConfigRawJSONDataType*](config.isensitiveconfigrawjsondatatype.md)): [*ServiceProvider*](../classes/server_services.serviceprovider.md)<T\>

#### Parameters:

Name | Type |
:------ | :------ |
`config` | T |
`registry` | [*RegistryService*](../classes/server_services_registry.registryservice.md) |
`appConfig` | [*IConfigRawJSONDataType*](config.iconfigrawjsondatatype.md) |
`appSensitiveConfig` | [*ISensitiveConfigRawJSONDataType*](config.isensitiveconfigrawjsondatatype.md) |

**Returns:** [*ServiceProvider*](../classes/server_services.serviceprovider.md)<T\>

Defined in: [server/services/index.ts:286](https://github.com/onzag/itemize/blob/28218320/server/services/index.ts#L286)

## Properties

### getRouter

• **getRouter**: (`appData`: [*IAppDataType*](server.iappdatatype.md)) => *Router* \| *Promise*<Router\>

#### Type declaration:

▸ (`appData`: [*IAppDataType*](server.iappdatatype.md)): *Router* \| *Promise*<Router\>

#### Parameters:

Name | Type |
:------ | :------ |
`appData` | [*IAppDataType*](server.iappdatatype.md) |

**Returns:** *Router* \| *Promise*<Router\>

Defined in: [server/services/index.ts:293](https://github.com/onzag/itemize/blob/28218320/server/services/index.ts#L293)

Defined in: [server/services/index.ts:293](https://github.com/onzag/itemize/blob/28218320/server/services/index.ts#L293)

___

### getTriggerRegistry

• **getTriggerRegistry**: () => [*ITriggerRegistry*](server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](server_resolvers_triggers.itriggerregistry.md)\>

#### Type declaration:

▸ (): [*ITriggerRegistry*](server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](server_resolvers_triggers.itriggerregistry.md)\>

**Returns:** [*ITriggerRegistry*](server_resolvers_triggers.itriggerregistry.md) \| *Promise*<[*ITriggerRegistry*](server_resolvers_triggers.itriggerregistry.md)\>

Defined in: [server/services/index.ts:294](https://github.com/onzag/itemize/blob/28218320/server/services/index.ts#L294)

Defined in: [server/services/index.ts:294](https://github.com/onzag/itemize/blob/28218320/server/services/index.ts#L294)

___

### getType

• **getType**: () => [*ServiceProviderType*](../enums/server_services.serviceprovidertype.md)

#### Type declaration:

▸ (): [*ServiceProviderType*](../enums/server_services.serviceprovidertype.md)

**Returns:** [*ServiceProviderType*](../enums/server_services.serviceprovidertype.md)

Defined in: [server/services/index.ts:295](https://github.com/onzag/itemize/blob/28218320/server/services/index.ts#L295)

Defined in: [server/services/index.ts:295](https://github.com/onzag/itemize/blob/28218320/server/services/index.ts#L295)
