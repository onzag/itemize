[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/twilio](../modules/server_services_twilio.md) / TwilioService

# Class: TwilioService

[server/services/twilio](../modules/server_services_twilio.md).TwilioService

## Hierarchy

- [`default`](server_services_base_PhoneProvider.default.md)<``null``\>

  ↳ **`TwilioService`**

## Table of contents

### Constructors

- [constructor](server_services_twilio.TwilioService.md#constructor)

### Properties

- [appConfig](server_services_twilio.TwilioService.md#appconfig)
- [appSensitiveConfig](server_services_twilio.TwilioService.md#appsensitiveconfig)
- [config](server_services_twilio.TwilioService.md#config)
- [globalCustomServices](server_services_twilio.TwilioService.md#globalcustomservices)
- [globalDatabaseConnection](server_services_twilio.TwilioService.md#globaldatabaseconnection)
- [globalInstance](server_services_twilio.TwilioService.md#globalinstance)
- [globalMailProvider](server_services_twilio.TwilioService.md#globalmailprovider)
- [globalPhoneProvider](server_services_twilio.TwilioService.md#globalphoneprovider)
- [globalRawDB](server_services_twilio.TwilioService.md#globalrawdb)
- [globalRedis](server_services_twilio.TwilioService.md#globalredis)
- [globalRedisPub](server_services_twilio.TwilioService.md#globalredispub)
- [globalRedisSub](server_services_twilio.TwilioService.md#globalredissub)
- [globalRoot](server_services_twilio.TwilioService.md#globalroot)
- [instanceName](server_services_twilio.TwilioService.md#instancename)
- [localAppData](server_services_twilio.TwilioService.md#localappdata)
- [localInstance](server_services_twilio.TwilioService.md#localinstance)
- [registry](server_services_twilio.TwilioService.md#registry)

### Methods

- [execute](server_services_twilio.TwilioService.md#execute)
- [expressRouter](server_services_twilio.TwilioService.md#expressrouter)
- [getInstanceName](server_services_twilio.TwilioService.md#getinstancename)
- [getRouter](server_services_twilio.TwilioService.md#getrouter)
- [getRunCycleTime](server_services_twilio.TwilioService.md#getruncycletime)
- [getTriggerRegistry](server_services_twilio.TwilioService.md#gettriggerregistry)
- [initialize](server_services_twilio.TwilioService.md#initialize)
- [isInstanceGlobal](server_services_twilio.TwilioService.md#isinstanceglobal)
- [isInstanceLocal](server_services_twilio.TwilioService.md#isinstancelocal)
- [logDebug](server_services_twilio.TwilioService.md#logdebug)
- [logError](server_services_twilio.TwilioService.md#logerror)
- [logInfo](server_services_twilio.TwilioService.md#loginfo)
- [run](server_services_twilio.TwilioService.md#run)
- [sendSMS](server_services_twilio.TwilioService.md#sendsms)
- [sendTemplateSMS](server_services_twilio.TwilioService.md#sendtemplatesms)
- [sendUnverifiedTemplateSMS](server_services_twilio.TwilioService.md#sendunverifiedtemplatesms)
- [setInstanceName](server_services_twilio.TwilioService.md#setinstancename)
- [setupGlobalResources](server_services_twilio.TwilioService.md#setupglobalresources)
- [setupLocalResources](server_services_twilio.TwilioService.md#setuplocalresources)
- [expressRouter](server_services_twilio.TwilioService.md#expressrouter)
- [getRouter](server_services_twilio.TwilioService.md#getrouter)
- [getTriggerRegistry](server_services_twilio.TwilioService.md#gettriggerregistry)
- [getType](server_services_twilio.TwilioService.md#gettype)
- [logDebug](server_services_twilio.TwilioService.md#logdebug)
- [logError](server_services_twilio.TwilioService.md#logerror)
- [logInfo](server_services_twilio.TwilioService.md#loginfo)

## Constructors

### constructor

• **new TwilioService**(`config`, `registry`, `appConfig`, `appSensitiveConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | ``null`` |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `appConfig` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `appSensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[constructor](server_services_base_PhoneProvider.default.md#constructor)

#### Defined in

[server/services/index.ts:58](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L58)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[appConfig](server_services_base_PhoneProvider.default.md#appconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L37)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[appSensitiveConfig](server_services_base_PhoneProvider.default.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L38)

___

### config

• **config**: ``null``

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[config](server_services_base_PhoneProvider.default.md#config)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L35)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)<`any`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalCustomServices](server_services_base_PhoneProvider.default.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalDatabaseConnection](server_services_base_PhoneProvider.default.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalInstance](server_services_base_PhoneProvider.default.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)<`any`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalMailProvider](server_services_base_PhoneProvider.default.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)<`any`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalPhoneProvider](server_services_base_PhoneProvider.default.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalRawDB](server_services_base_PhoneProvider.default.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalRedis](server_services_base_PhoneProvider.default.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalRedisPub](server_services_base_PhoneProvider.default.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalRedisSub](server_services_base_PhoneProvider.default.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalRoot](server_services_base_PhoneProvider.default.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L45)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[instanceName](server_services_base_PhoneProvider.default.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[localAppData](server_services_base_PhoneProvider.default.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[localInstance](server_services_base_PhoneProvider.default.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L56)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[registry](server_services_base_PhoneProvider.default.md#registry)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L36)

## Methods

### execute

▸ **execute**(): `void`

Performs the execution of the service, basically
it will do the run function and then re-run as specified

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[execute](server_services_base_PhoneProvider.default.md#execute)

#### Defined in

[server/services/index.ts:164](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L164)

___

### expressRouter

▸ **expressRouter**(`options?`): `Router`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `RouterOptions` |

#### Returns

`Router`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[expressRouter](server_services_base_PhoneProvider.default.md#expressrouter)

#### Defined in

[server/services/index.ts:110](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L110)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[getInstanceName](server_services_base_PhoneProvider.default.md#getinstancename)

#### Defined in

[server/services/index.ts:74](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L74)

___

### getRouter

▸ **getRouter**(`appData`): `Router` \| `Promise`<`Router`\>

Provides a router endpoint, the router endpoint
will exist directly under the rest services
this enables to create webhooks and other subservices
that are attached to this service

If the service provider if executed on a global environment
the endpoint does not get created, this means that in the global
manager this won't be executed, or anything that is meant
for the global manager

The router gets attached to /rest/service

**`override`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

`Router` \| `Promise`<`Router`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[getRouter](server_services_base_PhoneProvider.default.md#getrouter)

#### Defined in

[server/services/index.ts:251](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L251)

___

### getRunCycleTime

▸ **getRunCycleTime**(): `number`

Determines whether the run function
should run over again

**`override`**

#### Returns

`number`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[getRunCycleTime](server_services_base_PhoneProvider.default.md#getruncycletime)

#### Defined in

[server/services/index.ts:224](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L224)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

**`override`**

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[getTriggerRegistry](server_services_base_PhoneProvider.default.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:278](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L278)

___

### initialize

▸ **initialize**(): `void` \| `Promise`<`void`\>

This function is executed during
the initialization of the service

If your service is a global service you will
have access to the global resources while
this function executes

**`override`**

#### Returns

`void` \| `Promise`<`void`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[initialize](server_services_base_PhoneProvider.default.md#initialize)

#### Defined in

[server/services/index.ts:215](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L215)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[isInstanceGlobal](server_services_base_PhoneProvider.default.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:78](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L78)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[isInstanceLocal](server_services_base_PhoneProvider.default.md#isinstancelocal)

#### Defined in

[server/services/index.ts:82](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L82)

___

### logDebug

▸ **logDebug**(`str`, `extra?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `extra?` | `any` |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[logDebug](server_services_base_PhoneProvider.default.md#logdebug)

#### Defined in

[server/services/index.ts:90](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L90)

___

### logError

▸ **logError**(`str`, `extra?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `extra?` | `any` |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[logError](server_services_base_PhoneProvider.default.md#logerror)

#### Defined in

[server/services/index.ts:94](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L94)

___

### logInfo

▸ **logInfo**(`str`, `extra?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `extra?` | `any` |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[logInfo](server_services_base_PhoneProvider.default.md#loginfo)

#### Defined in

[server/services/index.ts:86](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L86)

___

### run

▸ **run**(): `void` \| `Promise`<`void`\>

Executes some code

**`override`**

#### Returns

`void` \| `Promise`<`void`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[run](server_services_base_PhoneProvider.default.md#run)

#### Defined in

[server/services/index.ts:232](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L232)

___

### sendSMS

▸ **sendSMS**(`data`): `Promise`<`void`\>

This function is executed when the service
needs to send an email

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ISendSMSData`](../interfaces/server_services_base_PhoneProvider.ISendSMSData.md) |

#### Returns

`Promise`<`void`\>

#### Overrides

[default](server_services_base_PhoneProvider.default.md).[sendSMS](server_services_base_PhoneProvider.default.md#sendsms)

#### Defined in

[server/services/twilio.ts:8](https://github.com/onzag/itemize/blob/5c2808d3/server/services/twilio.ts#L8)

___

### sendTemplateSMS

▸ **sendTemplateSMS**(`arg`): `Promise`<`void`\>

Sends a template based SMS to a given user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | the args |
| `arg.args` | `any` | the template args |
| `arg.confirmationProperties?` | `string`[] | - |
| `arg.id` | `string` | the id for the given item we need to pull |
| `arg.ignoreUnsubscribe` | `boolean` | whether we should ignore the subscription values for the given user so they will receive the email anyway regardless of their subscription status this should never really be true |
| `arg.itemDefinition` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) | either a string that represents an item definition that can be pulled from the registry or an item definition itself that represents the item definition to be used for templating |
| `arg.personalize?` | `string`[] | if specified it will make each template personalized, it will add the phone to the template args, and any other property that is specified on this list to the args, using personalization when sending to multiple users can hurt your mail speed as every user will receive a different email that needs to be built |
| `arg.phoneProperty?` | `string` | the email property to use to send emails, normally users only have a single email property so this isn't necessary but they might have some alternative email property to use as target email |
| `arg.property` | `string` \| [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property that the value is extracted for and should be a text type |
| `arg.subscribeProperty` | `string` | - |
| `arg.to` | `string` \| [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) \| (`string` \| [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md))[] | this is a special list of values to send to the users that we want to send to, they can be specified as the list of ids, aka user identifiers of the given users, but grapqhl values or sql values are allowed as well and they improve speed up, remember to pass whole results with all the properties you are using or otherwise it might misbehave |
| `arg.version?` | `string` | an optional version value to use, this version is expected to be a locale version, as such unversioned values will be used as fallback if the version is not found |

#### Returns

`Promise`<`void`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[sendTemplateSMS](server_services_base_PhoneProvider.default.md#sendtemplatesms)

#### Defined in

[server/services/base/PhoneProvider.ts:215](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/PhoneProvider.ts#L215)

___

### sendUnverifiedTemplateSMS

▸ **sendUnverifiedTemplateSMS**(`arg`): `Promise`<`void`\>

Sends a template based email to a given user and it
will not filter any of these users

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | the unverified args |
| `arg.args` | `any` | the template args |
| `arg.id` | `string` | the id for the given item we need to pull |
| `arg.itemDefinition` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) | either a string that represents an item definition that can be pulled from the registry or an item definition itself that represents the item definition to be used for templating |
| `arg.property` | `string` \| [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property that the value is extracted for and should be a text type |
| `arg.to` | `string` \| `string`[] | the list of numbers to send to |
| `arg.version?` | `string` | an optional version value to use, this version is expected to be a locale version, as such unversioned values will be used as fallback if the version is not found |

#### Returns

`Promise`<`void`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[sendUnverifiedTemplateSMS](server_services_base_PhoneProvider.default.md#sendunverifiedtemplatesms)

#### Defined in

[server/services/base/PhoneProvider.ts:58](https://github.com/onzag/itemize/blob/5c2808d3/server/services/base/PhoneProvider.ts#L58)

___

### setInstanceName

▸ **setInstanceName**(`n`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `string` |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[setInstanceName](server_services_base_PhoneProvider.default.md#setinstancename)

#### Defined in

[server/services/index.ts:70](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L70)

___

### setupGlobalResources

▸ **setupGlobalResources**(`globalDatabaseConnection`, `globalClient`, `globalPub`, `globalSub`, `globalMailProvider`, `globalPhoneProvider`, `globalCustomServices`, `root`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `globalDatabaseConnection` | [`DatabaseConnection`](database.DatabaseConnection.md) |
| `globalClient` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `globalPub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `globalSub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `globalMailProvider` | [`default`](server_services_base_MailProvider.default.md)<`any`\> |
| `globalPhoneProvider` | [`default`](server_services_base_PhoneProvider.default.md)<`any`\> |
| `globalCustomServices` | `Object` |
| `root` | [`default`](base_Root.default.md) |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[setupGlobalResources](server_services_base_PhoneProvider.default.md#setupglobalresources)

#### Defined in

[server/services/index.ts:118](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L118)

___

### setupLocalResources

▸ **setupLocalResources**(`appData`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[setupLocalResources](server_services_base_PhoneProvider.default.md#setuplocalresources)

#### Defined in

[server/services/index.ts:142](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L142)

___

### expressRouter

▸ `Static` **expressRouter**(`options?`): `Router`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `RouterOptions` |

#### Returns

`Router`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[expressRouter](server_services_base_PhoneProvider.default.md#expressrouter)

#### Defined in

[server/services/index.ts:114](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L114)

___

### getRouter

▸ `Static` **getRouter**(`appData`): `Router` \| `Promise`<`Router`\>

Provides a router endpoint, but this method
is static, which means it only gets added once

If the service provider if executed on a global environment
the endpoint does not get created, this means that in the global
manager this won't be executed, or anything that is meant
for the global manager

the router gets attached to /rest/service

**`override`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

`Router` \| `Promise`<`Router`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[getRouter](server_services_base_PhoneProvider.default.md#getrouter)

#### Defined in

[server/services/index.ts:268](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L268)

___

### getTriggerRegistry

▸ `Static` **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

This gets attached if a class is used rather than per instance

**`override`**

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[getTriggerRegistry](server_services_base_PhoneProvider.default.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:290](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L290)

___

### getType

▸ `Static` **getType**(): [`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

Specifies whether the current service is a global service
if true global services will only execute initialize and a router
will not be extracted from them

it will instead have access to the global resources

#### Returns

[`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

#### Overrides

[default](server_services_base_PhoneProvider.default.md).[getType](server_services_base_PhoneProvider.default.md#gettype)

#### Defined in

[server/services/twilio.ts:5](https://github.com/onzag/itemize/blob/5c2808d3/server/services/twilio.ts#L5)

___

### logDebug

▸ `Static` **logDebug**(`str`, `extra?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `extra?` | `any` |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[logDebug](server_services_base_PhoneProvider.default.md#logdebug)

#### Defined in

[server/services/index.ts:102](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L102)

___

### logError

▸ `Static` **logError**(`str`, `extra?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `extra?` | `any` |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[logError](server_services_base_PhoneProvider.default.md#logerror)

#### Defined in

[server/services/index.ts:106](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L106)

___

### logInfo

▸ `Static` **logInfo**(`str`, `extra?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |
| `extra?` | `any` |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[logInfo](server_services_base_PhoneProvider.default.md#loginfo)

#### Defined in

[server/services/index.ts:98](https://github.com/onzag/itemize/blob/5c2808d3/server/services/index.ts#L98)
