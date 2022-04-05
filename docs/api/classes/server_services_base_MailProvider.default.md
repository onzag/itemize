[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/MailProvider](../modules/server_services_base_MailProvider.md) / default

# Class: default<T\>

[server/services/base/MailProvider](../modules/server_services_base_MailProvider.md).default

The MailProvider class is a service that provides mailing
functionality to the itemize server side app

The MailProvider class is a special class, and does not support
global mode, even if specified

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`ServiceProvider`](server_services.ServiceProvider.md)<`T`\>

  ↳ **`default`**

  ↳↳ [`FakeMailService`](server_services_fake_mail.FakeMailService.md)

  ↳↳ [`MailgunService`](server_services_mailgun.MailgunService.md)

## Table of contents

### Constructors

- [constructor](server_services_base_MailProvider.default.md#constructor)

### Properties

- [appConfig](server_services_base_MailProvider.default.md#appconfig)
- [appSensitiveConfig](server_services_base_MailProvider.default.md#appsensitiveconfig)
- [config](server_services_base_MailProvider.default.md#config)
- [globalCustomServices](server_services_base_MailProvider.default.md#globalcustomservices)
- [globalDatabaseConnection](server_services_base_MailProvider.default.md#globaldatabaseconnection)
- [globalInstance](server_services_base_MailProvider.default.md#globalinstance)
- [globalMailProvider](server_services_base_MailProvider.default.md#globalmailprovider)
- [globalPhoneProvider](server_services_base_MailProvider.default.md#globalphoneprovider)
- [globalRawDB](server_services_base_MailProvider.default.md#globalrawdb)
- [globalRedis](server_services_base_MailProvider.default.md#globalredis)
- [globalRedisPub](server_services_base_MailProvider.default.md#globalredispub)
- [globalRedisSub](server_services_base_MailProvider.default.md#globalredissub)
- [globalRoot](server_services_base_MailProvider.default.md#globalroot)
- [instanceName](server_services_base_MailProvider.default.md#instancename)
- [localAppData](server_services_base_MailProvider.default.md#localappdata)
- [localInstance](server_services_base_MailProvider.default.md#localinstance)
- [registry](server_services_base_MailProvider.default.md#registry)
- [storageIdef](server_services_base_MailProvider.default.md#storageidef)

### Methods

- [execute](server_services_base_MailProvider.default.md#execute)
- [expressRouter](server_services_base_MailProvider.default.md#expressrouter)
- [getInstanceName](server_services_base_MailProvider.default.md#getinstancename)
- [getRouter](server_services_base_MailProvider.default.md#getrouter)
- [getRunCycleTime](server_services_base_MailProvider.default.md#getruncycletime)
- [getTriggerRegistry](server_services_base_MailProvider.default.md#gettriggerregistry)
- [initialize](server_services_base_MailProvider.default.md#initialize)
- [isInstanceGlobal](server_services_base_MailProvider.default.md#isinstanceglobal)
- [isInstanceLocal](server_services_base_MailProvider.default.md#isinstancelocal)
- [logDebug](server_services_base_MailProvider.default.md#logdebug)
- [logError](server_services_base_MailProvider.default.md#logerror)
- [logInfo](server_services_base_MailProvider.default.md#loginfo)
- [onEmailRecieved](server_services_base_MailProvider.default.md#onemailrecieved)
- [run](server_services_base_MailProvider.default.md#run)
- [sendEmail](server_services_base_MailProvider.default.md#sendemail)
- [sendTemplateEmail](server_services_base_MailProvider.default.md#sendtemplateemail)
- [sendUnverifiedTemplateEmail](server_services_base_MailProvider.default.md#sendunverifiedtemplateemail)
- [setInstanceName](server_services_base_MailProvider.default.md#setinstancename)
- [setMessageStorageItemDefinition](server_services_base_MailProvider.default.md#setmessagestorageitemdefinition)
- [setupGlobalResources](server_services_base_MailProvider.default.md#setupglobalresources)
- [setupLocalResources](server_services_base_MailProvider.default.md#setuplocalresources)
- [expressRouter](server_services_base_MailProvider.default.md#expressrouter)
- [getRouter](server_services_base_MailProvider.default.md#getrouter)
- [getTriggerRegistry](server_services_base_MailProvider.default.md#gettriggerregistry)
- [getType](server_services_base_MailProvider.default.md#gettype)
- [logDebug](server_services_base_MailProvider.default.md#logdebug)
- [logError](server_services_base_MailProvider.default.md#logerror)
- [logInfo](server_services_base_MailProvider.default.md#loginfo)

## Constructors

### constructor

• **new default**<`T`\>(`config`, `registry`, `appConfig`, `appSensitiveConfig`)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `T` |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `appConfig` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `appSensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[constructor](server_services.ServiceProvider.md#constructor)

#### Defined in

[server/services/index.ts:58](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L58)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appConfig](server_services.ServiceProvider.md#appconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L37)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appSensitiveConfig](server_services.ServiceProvider.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L38)

___

### config

• **config**: `T`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[config](server_services.ServiceProvider.md#config)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L35)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalCustomServices](server_services.ServiceProvider.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: `DatabaseConnection`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalDatabaseConnection](server_services.ServiceProvider.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalInstance](server_services.ServiceProvider.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalMailProvider](server_services.ServiceProvider.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalPhoneProvider](server_services.ServiceProvider.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRawDB](server_services.ServiceProvider.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedis](server_services.ServiceProvider.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedisPub](server_services.ServiceProvider.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedisSub](server_services.ServiceProvider.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRoot](server_services.ServiceProvider.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L45)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[instanceName](server_services.ServiceProvider.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[localAppData](server_services.ServiceProvider.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[localInstance](server_services.ServiceProvider.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L56)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[registry](server_services.ServiceProvider.md#registry)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L36)

___

### storageIdef

• `Private` **storageIdef**: [`default`](base_Root_Module_ItemDefinition.default.md)

the storage item definition

#### Defined in

[server/services/base/MailProvider.ts:107](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/MailProvider.ts#L107)

## Methods

### execute

▸ **execute**(): `void`

Performs the execution of the service, basically
it will do the run function and then re-run as specified

#### Returns

`void`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[execute](server_services.ServiceProvider.md#execute)

#### Defined in

[server/services/index.ts:164](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L164)

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

[ServiceProvider](server_services.ServiceProvider.md).[expressRouter](server_services.ServiceProvider.md#expressrouter)

#### Defined in

[server/services/index.ts:110](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L110)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[getInstanceName](server_services.ServiceProvider.md#getinstancename)

#### Defined in

[server/services/index.ts:74](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L74)

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

[ServiceProvider](server_services.ServiceProvider.md).[getRouter](server_services.ServiceProvider.md#getrouter)

#### Defined in

[server/services/index.ts:251](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L251)

___

### getRunCycleTime

▸ **getRunCycleTime**(): `number`

Determines whether the run function
should run over again

**`override`**

#### Returns

`number`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[getRunCycleTime](server_services.ServiceProvider.md#getruncycletime)

#### Defined in

[server/services/index.ts:224](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L224)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

**`override`**

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[getTriggerRegistry](server_services.ServiceProvider.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:278](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L278)

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

[ServiceProvider](server_services.ServiceProvider.md).[initialize](server_services.ServiceProvider.md#initialize)

#### Defined in

[server/services/index.ts:215](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L215)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[isInstanceGlobal](server_services.ServiceProvider.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:78](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L78)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[isInstanceLocal](server_services.ServiceProvider.md#isinstancelocal)

#### Defined in

[server/services/index.ts:82](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L82)

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

[ServiceProvider](server_services.ServiceProvider.md).[logDebug](server_services.ServiceProvider.md#logdebug)

#### Defined in

[server/services/index.ts:90](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L90)

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

[ServiceProvider](server_services.ServiceProvider.md).[logError](server_services.ServiceProvider.md#logerror)

#### Defined in

[server/services/index.ts:94](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L94)

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

[ServiceProvider](server_services.ServiceProvider.md).[logInfo](server_services.ServiceProvider.md#loginfo)

#### Defined in

[server/services/index.ts:86](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L86)

___

### onEmailRecieved

▸ **onEmailRecieved**(`data`): `void`

This method should get called once an email has been received
the service provider that extended the raw mail provider should
be able to trigger this function when specified, this function will
handle the mail configuration then and perform unsubscription tasks

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`IReceiveEmailData`](../interfaces/server_services_base_MailProvider.IReceiveEmailData.md) | the email data received, make sure to fill this information properly |

#### Returns

`void`

#### Defined in

[server/services/base/MailProvider.ts:591](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/MailProvider.ts#L591)

___

### run

▸ **run**(): `void` \| `Promise`<`void`\>

Executes some code

**`override`**

#### Returns

`void` \| `Promise`<`void`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[run](server_services.ServiceProvider.md#run)

#### Defined in

[server/services/index.ts:232](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L232)

___

### sendEmail

▸ **sendEmail**(`data`): `Promise`<`void`\>

This function is executed when the service
needs to send an email

**`override`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ISendEmailData`](../interfaces/server_services_base_MailProvider.ISendEmailData.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/services/base/MailProvider.ts:609](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/MailProvider.ts#L609)

___

### sendTemplateEmail

▸ **sendTemplateEmail**(`arg`): `Promise`<`void`\>

Sends a template based email to a given user
this way to send things will create unsubscribe urls
and ensure users that have opted out do not receive
such messages, so this is the best way to send emails

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | the unverified args |
| `arg.args` | `any` | the template args |
| `arg.canUnsubscribe` | `boolean` | whether the user is able to unsubscribe from this email requires the subscribeProperty value to be defined in order to work |
| `arg.confirmationProperties?` | `string`[] | - |
| `arg.emailProperty?` | `string` | the email property to use to send emails, normally users only have a single email property so this isn't necessary but they might have some alternative email property to use as target email |
| `arg.fromEmailHandle` | `string` | this is the email handle side before the @domain.com |
| `arg.fromUsername` | `string` | - |
| `arg.id` | `string` | the id for the given item we need to pull |
| `arg.ignoreUnsubscribe` | `boolean` | whether we should ignore the subscription values for the given user so they will receive the email anyway regardless of their subscription status this should never really be true |
| `arg.itemDefinition` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) | either a string that represents an item definition that can be pulled from the registry or an item definition itself that represents the item definition to be used for templating |
| `arg.personalize?` | `string`[] | if specified it will make each template personalized, it will add the email to the template args, and any other property that is specified on this list to the args, using personalization when sending to multiple users can hurt your mail speed as every user will receive a different email that needs to be built, personalize will also add a unsubscribe_url to the args, you might pass an empty array if you just want that |
| `arg.property` | `string` \| [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property that the value is extracted for and should be a text type |
| `arg.subject` | `string` | the subject of the message |
| `arg.subscribeProperty` | `string` | - |
| `arg.to` | `string` \| [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) \| (`string` \| [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md))[] | this is a special list of values to send to the users that we want to send to, they can be specified as the list of ids, aka user identifiers of the given users, but grapqhl values or sql values are allowed as well and they improve speed up, remember to pass whole results with all the properties you are using or otherwise it might misbehave |
| `arg.version?` | `string` | an optional version value to use, this version is expected to be a locale version, as such unversioned values will be used as fallback if the version is not found |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/services/base/MailProvider.ts:332](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/MailProvider.ts#L332)

___

### sendUnverifiedTemplateEmail

▸ **sendUnverifiedTemplateEmail**(`arg`): `Promise`<`void`\>

Sends a template based email to a given user and it
will not filter any of these users

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | the unverified args |
| `arg.args` | `any` | the template args |
| `arg.fromEmailHandle` | `string` | this is the email handle side before the @domain.com |
| `arg.fromUsername` | `string` | - |
| `arg.id` | `string` | the id for the given item we need to pull |
| `arg.itemDefinition` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) | either a string that represents an item definition that can be pulled from the registry or an item definition itself that represents the item definition to be used for templating |
| `arg.property` | `string` \| [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property that the value is extracted for and should be a text type |
| `arg.subject` | `string` | the subject of the message |
| `arg.to` | `string` \| `string`[] | the list of emails to send to |
| `arg.unsubscribeMailto?` | `string` | an optional mailto: protocol unsubscription mechanism to be added to the headers |
| `arg.unsubscribeURLs?` | `Object` | urls per email to perform unsubscription |
| `arg.version?` | `string` | an optional version value to use, this version is expected to be a locale version, as such unversioned values will be used as fallback if the version is not found |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/services/base/MailProvider.ts:144](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/MailProvider.ts#L144)

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

[ServiceProvider](server_services.ServiceProvider.md).[setInstanceName](server_services.ServiceProvider.md#setinstancename)

#### Defined in

[server/services/index.ts:70](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L70)

___

### setMessageStorageItemDefinition

▸ `Private` **setMessageStorageItemDefinition**(`idef`): `void`

Sets the item definition that is in charge of the storage of the
messages, the item definition should have this shape
- subject, type string
- sender, type TODO
the creator will be the target of the message who holds the current username
for the given email

TODO

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idef` | [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition to use for storage |

#### Returns

`void`

#### Defined in

[server/services/base/MailProvider.ts:121](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/MailProvider.ts#L121)

___

### setupGlobalResources

▸ **setupGlobalResources**(`globalDatabaseConnection`, `globalClient`, `globalPub`, `globalSub`, `globalMailProvider`, `globalPhoneProvider`, `globalCustomServices`, `root`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `globalDatabaseConnection` | `DatabaseConnection` |
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

[ServiceProvider](server_services.ServiceProvider.md).[setupGlobalResources](server_services.ServiceProvider.md#setupglobalresources)

#### Defined in

[server/services/index.ts:118](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L118)

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

[ServiceProvider](server_services.ServiceProvider.md).[setupLocalResources](server_services.ServiceProvider.md#setuplocalresources)

#### Defined in

[server/services/index.ts:142](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L142)

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

[ServiceProvider](server_services.ServiceProvider.md).[expressRouter](server_services.ServiceProvider.md#expressrouter)

#### Defined in

[server/services/index.ts:114](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L114)

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

[ServiceProvider](server_services.ServiceProvider.md).[getRouter](server_services.ServiceProvider.md#getrouter)

#### Defined in

[server/services/index.ts:268](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L268)

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

[ServiceProvider](server_services.ServiceProvider.md).[getTriggerRegistry](server_services.ServiceProvider.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:290](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L290)

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

[ServiceProvider](server_services.ServiceProvider.md).[getType](server_services.ServiceProvider.md#gettype)

#### Defined in

[server/services/base/MailProvider.ts:100](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/MailProvider.ts#L100)

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

[ServiceProvider](server_services.ServiceProvider.md).[logDebug](server_services.ServiceProvider.md#logdebug)

#### Defined in

[server/services/index.ts:102](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L102)

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

[ServiceProvider](server_services.ServiceProvider.md).[logError](server_services.ServiceProvider.md#logerror)

#### Defined in

[server/services/index.ts:106](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L106)

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

[ServiceProvider](server_services.ServiceProvider.md).[logInfo](server_services.ServiceProvider.md#loginfo)

#### Defined in

[server/services/index.ts:98](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L98)
