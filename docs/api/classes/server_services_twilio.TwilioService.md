[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/twilio](../modules/server_services_twilio.md) / TwilioService

# Class: TwilioService

[server/services/twilio](../modules/server_services_twilio.md).TwilioService

The PhoneProvider class is a service that provides SMS
functionality to the itemize server side app

The PhoneProvider class is a special class, and does not support
global mode, even if specified

## Hierarchy

- [`default`](server_services_base_PhoneProvider.default.md)\<`ITWilioConfig`\>

  ↳ **`TwilioService`**

## Table of contents

### Constructors

- [constructor](server_services_twilio.TwilioService.md#constructor)

### Properties

- [appConfig](server_services_twilio.TwilioService.md#appconfig)
- [appDbConfig](server_services_twilio.TwilioService.md#appdbconfig)
- [appRedisConfig](server_services_twilio.TwilioService.md#appredisconfig)
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
- [sendSMSToSingleTarget](server_services_twilio.TwilioService.md#sendsmstosingletarget)
- [sendSMSToTargets](server_services_twilio.TwilioService.md#sendsmstotargets)
- [sendTemplateSMS](server_services_twilio.TwilioService.md#sendtemplatesms)
- [sendUnverifiedTemplateSMS](server_services_twilio.TwilioService.md#sendunverifiedtemplatesms)
- [setInstanceName](server_services_twilio.TwilioService.md#setinstancename)
- [setupGlobalResources](server_services_twilio.TwilioService.md#setupglobalresources)
- [setupLocalResources](server_services_twilio.TwilioService.md#setuplocalresources)
- [expressRouter](server_services_twilio.TwilioService.md#expressrouter-1)
- [getRouter](server_services_twilio.TwilioService.md#getrouter-1)
- [getTriggerRegistry](server_services_twilio.TwilioService.md#gettriggerregistry-1)
- [getType](server_services_twilio.TwilioService.md#gettype)
- [logDebug](server_services_twilio.TwilioService.md#logdebug-1)
- [logError](server_services_twilio.TwilioService.md#logerror-1)
- [logInfo](server_services_twilio.TwilioService.md#loginfo-1)

## Constructors

### constructor

• **new TwilioService**(`c`, `registry`, `configs`): [`TwilioService`](server_services_twilio.TwilioService.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | `ITWilioConfig` |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `configs` | `any` |

#### Returns

[`TwilioService`](server_services_twilio.TwilioService.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[constructor](server_services_base_PhoneProvider.default.md#constructor)

#### Defined in

[server/services/base/PhoneProvider.ts:46](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/PhoneProvider.ts#L46)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[appConfig](server_services_base_PhoneProvider.default.md#appconfig)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L35)

___

### appDbConfig

• **appDbConfig**: [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[appDbConfig](server_services_base_PhoneProvider.default.md#appdbconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L37)

___

### appRedisConfig

• **appRedisConfig**: [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[appRedisConfig](server_services_base_PhoneProvider.default.md#appredisconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L38)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[appSensitiveConfig](server_services_base_PhoneProvider.default.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L36)

___

### config

• **config**: `ITWilioConfig`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[config](server_services_base_PhoneProvider.default.md#config)

#### Defined in

[server/services/index.ts:33](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L33)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)\<`any`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalCustomServices](server_services_base_PhoneProvider.default.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalDatabaseConnection](server_services_base_PhoneProvider.default.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalInstance](server_services_base_PhoneProvider.default.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)\<`any`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalMailProvider](server_services_base_PhoneProvider.default.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)\<`any`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalPhoneProvider](server_services_base_PhoneProvider.default.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalRawDB](server_services_base_PhoneProvider.default.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalRedis](server_services_base_PhoneProvider.default.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalRedisPub](server_services_base_PhoneProvider.default.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalRedisSub](server_services_base_PhoneProvider.default.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[globalRoot](server_services_base_PhoneProvider.default.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L45)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[instanceName](server_services_base_PhoneProvider.default.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[localAppData](server_services_base_PhoneProvider.default.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[localInstance](server_services_base_PhoneProvider.default.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L56)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[registry](server_services_base_PhoneProvider.default.md#registry)

#### Defined in

[server/services/index.ts:34](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L34)

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

[server/services/index.ts:170](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L170)

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

[server/services/index.ts:116](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L116)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[getInstanceName](server_services_base_PhoneProvider.default.md#getinstancename)

#### Defined in

[server/services/index.ts:80](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L80)

___

### getRouter

▸ **getRouter**(`appData`): `Router` \| `Promise`\<`Router`\>

Provides a router endpoint, the router endpoint
will exist directly under the rest services
this enables to create webhooks and other subservices
that are attached to this service

If the service provider if executed on a global environment
the endpoint does not get created, this means that in the global
manager this won't be executed, or anything that is meant
for the global manager

The router gets attached to /rest/service

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

`Router` \| `Promise`\<`Router`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[getRouter](server_services_base_PhoneProvider.default.md#getrouter)

#### Defined in

[server/services/index.ts:266](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L266)

___

### getRunCycleTime

▸ **getRunCycleTime**(): `number`

Determines whether the run function
should run over again

#### Returns

`number`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[getRunCycleTime](server_services_base_PhoneProvider.default.md#getruncycletime)

#### Defined in

[server/services/index.ts:239](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L239)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`\<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`\<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[getTriggerRegistry](server_services_base_PhoneProvider.default.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:293](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L293)

___

### initialize

▸ **initialize**(): `void` \| `Promise`\<`void`\>

This function is executed during
the initialization of the service

If your service is a global service you will
have access to the global resources while
this function executes

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[initialize](server_services_base_PhoneProvider.default.md#initialize)

#### Defined in

[server/services/index.ts:230](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L230)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[isInstanceGlobal](server_services_base_PhoneProvider.default.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:84](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L84)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[isInstanceLocal](server_services_base_PhoneProvider.default.md#isinstancelocal)

#### Defined in

[server/services/index.ts:88](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L88)

___

### logDebug

▸ **logDebug**\<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)\<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[logDebug](server_services_base_PhoneProvider.default.md#logdebug)

#### Defined in

[server/services/index.ts:96](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L96)

___

### logError

▸ **logError**\<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingErrorStructure`](../interfaces/server_logger.IItemizeLoggingErrorStructure.md)\<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[logError](server_services_base_PhoneProvider.default.md#logerror)

#### Defined in

[server/services/index.ts:100](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L100)

___

### logInfo

▸ **logInfo**\<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)\<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[logInfo](server_services_base_PhoneProvider.default.md#loginfo)

#### Defined in

[server/services/index.ts:92](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L92)

___

### run

▸ **run**(): `void` \| `Promise`\<`void`\>

Executes some code

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[run](server_services_base_PhoneProvider.default.md#run)

#### Defined in

[server/services/index.ts:247](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L247)

___

### sendSMS

▸ **sendSMS**(`data`): `Promise`\<`void`\>

This function is executed when the service
needs to send an email

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ISendSMSData`](../interfaces/server_services_base_PhoneProvider.ISendSMSData.md) |

#### Returns

`Promise`\<`void`\>

#### Overrides

[default](server_services_base_PhoneProvider.default.md).[sendSMS](server_services_base_PhoneProvider.default.md#sendsms)

#### Defined in

[server/services/twilio.ts:21](https://github.com/onzag/itemize/blob/73e0c39e/server/services/twilio.ts#L21)

___

### sendSMSToSingleTarget

▸ **sendSMSToSingleTarget**(`from`, `to`, `text`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `string` |
| `to` | `string` |
| `text` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/services/twilio.ts:98](https://github.com/onzag/itemize/blob/73e0c39e/server/services/twilio.ts#L98)

___

### sendSMSToTargets

▸ **sendSMSToTargets**(`fromMatchFor`, `to`, `text`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fromMatchFor` | `string` |
| `to` | `string`[] |
| `text` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/services/twilio.ts:63](https://github.com/onzag/itemize/blob/73e0c39e/server/services/twilio.ts#L63)

___

### sendTemplateSMS

▸ **sendTemplateSMS**(`arg`): `Promise`\<`void`\>

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
| `arg.to` | `string` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) \| [`IRQValue`](../interfaces/rq_querier.IRQValue.md) \| (`string` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) \| [`IRQValue`](../interfaces/rq_querier.IRQValue.md))[] | this is a special list of values to send to the users that we want to send to, they can be specified as the list of ids, aka user identifiers of the given users, but rq values or sql values are allowed as well and they improve speed up, remember to pass whole results with all the properties you are using or otherwise it might misbehave |
| `arg.version?` | `string` | an optional version value to use, this version is expected to be a locale version, as such unversioned values will be used as fallback if the version is not found |

#### Returns

`Promise`\<`void`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[sendTemplateSMS](server_services_base_PhoneProvider.default.md#sendtemplatesms)

#### Defined in

[server/services/base/PhoneProvider.ts:242](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/PhoneProvider.ts#L242)

___

### sendUnverifiedTemplateSMS

▸ **sendUnverifiedTemplateSMS**(`arg`): `Promise`\<`void`\>

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

`Promise`\<`void`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[sendUnverifiedTemplateSMS](server_services_base_PhoneProvider.default.md#sendunverifiedtemplatesms)

#### Defined in

[server/services/base/PhoneProvider.ts:73](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/PhoneProvider.ts#L73)

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

[server/services/index.ts:76](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L76)

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
| `globalMailProvider` | [`default`](server_services_base_MailProvider.default.md)\<`any`\> |
| `globalPhoneProvider` | [`default`](server_services_base_PhoneProvider.default.md)\<`any`\> |
| `globalCustomServices` | `Object` |
| `root` | [`default`](base_Root.default.md) |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[setupGlobalResources](server_services_base_PhoneProvider.default.md#setupglobalresources)

#### Defined in

[server/services/index.ts:124](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L124)

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

[server/services/index.ts:148](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L148)

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

[default](server_services_base_PhoneProvider.default.md).[expressRouter](server_services_base_PhoneProvider.default.md#expressrouter-1)

#### Defined in

[server/services/index.ts:120](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L120)

___

### getRouter

▸ **getRouter**(`appData`): `Router` \| `Promise`\<`Router`\>

Provides a router endpoint, but this method
is static, which means it only gets added once

If the service provider if executed on a global environment
the endpoint does not get created, this means that in the global
manager this won't be executed, or anything that is meant
for the global manager

the router gets attached to /rest/service

#### Parameters

| Name | Type |
| :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

`Router` \| `Promise`\<`Router`\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[getRouter](server_services_base_PhoneProvider.default.md#getrouter-1)

#### Defined in

[server/services/index.ts:283](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L283)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`\<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

This gets attached if a class is used rather than per instance

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`\<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[getTriggerRegistry](server_services_base_PhoneProvider.default.md#gettriggerregistry-1)

#### Defined in

[server/services/index.ts:305](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L305)

___

### getType

▸ **getType**(): [`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

Specifies whether the current service is a global service
if true global services will only execute initialize and a router
will not be extracted from them

it will instead have access to the global resources

#### Returns

[`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

#### Overrides

[default](server_services_base_PhoneProvider.default.md).[getType](server_services_base_PhoneProvider.default.md#gettype)

#### Defined in

[server/services/twilio.ts:14](https://github.com/onzag/itemize/blob/73e0c39e/server/services/twilio.ts#L14)

___

### logDebug

▸ **logDebug**\<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)\<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[logDebug](server_services_base_PhoneProvider.default.md#logdebug-1)

#### Defined in

[server/services/index.ts:108](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L108)

___

### logError

▸ **logError**\<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingErrorStructure`](../interfaces/server_logger.IItemizeLoggingErrorStructure.md)\<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[logError](server_services_base_PhoneProvider.default.md#logerror-1)

#### Defined in

[server/services/index.ts:112](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L112)

___

### logInfo

▸ **logInfo**\<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)\<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PhoneProvider.default.md).[logInfo](server_services_base_PhoneProvider.default.md#loginfo-1)

#### Defined in

[server/services/index.ts:104](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L104)
