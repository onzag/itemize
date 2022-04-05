[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/mailgun](../modules/server_services_mailgun.md) / MailgunService

# Class: MailgunService

[server/services/mailgun](../modules/server_services_mailgun.md).MailgunService

## Hierarchy

- [`default`](server_services_base_MailProvider.default.md)<`Mailgun.ConstructorParams`\>

  ↳ **`MailgunService`**

## Table of contents

### Constructors

- [constructor](server_services_mailgun.MailgunService.md#constructor)

### Properties

- [appConfig](server_services_mailgun.MailgunService.md#appconfig)
- [appSensitiveConfig](server_services_mailgun.MailgunService.md#appsensitiveconfig)
- [cantReceiveEmail](server_services_mailgun.MailgunService.md#cantreceiveemail)
- [config](server_services_mailgun.MailgunService.md#config)
- [globalCustomServices](server_services_mailgun.MailgunService.md#globalcustomservices)
- [globalDatabaseConnection](server_services_mailgun.MailgunService.md#globaldatabaseconnection)
- [globalInstance](server_services_mailgun.MailgunService.md#globalinstance)
- [globalMailProvider](server_services_mailgun.MailgunService.md#globalmailprovider)
- [globalPhoneProvider](server_services_mailgun.MailgunService.md#globalphoneprovider)
- [globalRawDB](server_services_mailgun.MailgunService.md#globalrawdb)
- [globalRedis](server_services_mailgun.MailgunService.md#globalredis)
- [globalRedisPub](server_services_mailgun.MailgunService.md#globalredispub)
- [globalRedisSub](server_services_mailgun.MailgunService.md#globalredissub)
- [globalRoot](server_services_mailgun.MailgunService.md#globalroot)
- [instanceName](server_services_mailgun.MailgunService.md#instancename)
- [localAppData](server_services_mailgun.MailgunService.md#localappdata)
- [localInstance](server_services_mailgun.MailgunService.md#localinstance)
- [mailgun](server_services_mailgun.MailgunService.md#mailgun)
- [registry](server_services_mailgun.MailgunService.md#registry)

### Methods

- [checkForNewMail](server_services_mailgun.MailgunService.md#checkfornewmail)
- [execute](server_services_mailgun.MailgunService.md#execute)
- [expressRouter](server_services_mailgun.MailgunService.md#expressrouter)
- [getInstanceName](server_services_mailgun.MailgunService.md#getinstancename)
- [getRouter](server_services_mailgun.MailgunService.md#getrouter)
- [getRunCycleTime](server_services_mailgun.MailgunService.md#getruncycletime)
- [getTriggerRegistry](server_services_mailgun.MailgunService.md#gettriggerregistry)
- [initialize](server_services_mailgun.MailgunService.md#initialize)
- [isInstanceGlobal](server_services_mailgun.MailgunService.md#isinstanceglobal)
- [isInstanceLocal](server_services_mailgun.MailgunService.md#isinstancelocal)
- [logDebug](server_services_mailgun.MailgunService.md#logdebug)
- [logError](server_services_mailgun.MailgunService.md#logerror)
- [logInfo](server_services_mailgun.MailgunService.md#loginfo)
- [onEmailRecieved](server_services_mailgun.MailgunService.md#onemailrecieved)
- [run](server_services_mailgun.MailgunService.md#run)
- [sendEmail](server_services_mailgun.MailgunService.md#sendemail)
- [sendTemplateEmail](server_services_mailgun.MailgunService.md#sendtemplateemail)
- [sendUnverifiedTemplateEmail](server_services_mailgun.MailgunService.md#sendunverifiedtemplateemail)
- [setInstanceName](server_services_mailgun.MailgunService.md#setinstancename)
- [setupGlobalResources](server_services_mailgun.MailgunService.md#setupglobalresources)
- [setupLocalResources](server_services_mailgun.MailgunService.md#setuplocalresources)
- [expressRouter](server_services_mailgun.MailgunService.md#expressrouter)
- [getRouter](server_services_mailgun.MailgunService.md#getrouter)
- [getTriggerRegistry](server_services_mailgun.MailgunService.md#gettriggerregistry)
- [getType](server_services_mailgun.MailgunService.md#gettype)
- [logDebug](server_services_mailgun.MailgunService.md#logdebug)
- [logError](server_services_mailgun.MailgunService.md#logerror)
- [logInfo](server_services_mailgun.MailgunService.md#loginfo)

## Constructors

### constructor

• **new MailgunService**(`config`, `registry`, `appConfig`, `appSensitiveConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `ConstructorParams` |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `appConfig` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `appSensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |

#### Inherited from

[default](server_services_base_MailProvider.default.md).[constructor](server_services_base_MailProvider.default.md#constructor)

#### Defined in

[server/services/index.ts:58](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L58)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[appConfig](server_services_base_MailProvider.default.md#appconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L37)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[appSensitiveConfig](server_services_base_MailProvider.default.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L38)

___

### cantReceiveEmail

• `Private` **cantReceiveEmail**: `boolean` = `false`

#### Defined in

[server/services/mailgun.ts:8](https://github.com/onzag/itemize/blob/f2f29986/server/services/mailgun.ts#L8)

___

### config

• **config**: `ConstructorParams`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[config](server_services_base_MailProvider.default.md#config)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L35)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)<`any`\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalCustomServices](server_services_base_MailProvider.default.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: `DatabaseConnection`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalDatabaseConnection](server_services_base_MailProvider.default.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalInstance](server_services_base_MailProvider.default.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)<`any`\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalMailProvider](server_services_base_MailProvider.default.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)<`any`\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalPhoneProvider](server_services_base_MailProvider.default.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalRawDB](server_services_base_MailProvider.default.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalRedis](server_services_base_MailProvider.default.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalRedisPub](server_services_base_MailProvider.default.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalRedisSub](server_services_base_MailProvider.default.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalRoot](server_services_base_MailProvider.default.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L45)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[instanceName](server_services_base_MailProvider.default.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[localAppData](server_services_base_MailProvider.default.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[localInstance](server_services_base_MailProvider.default.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L56)

___

### mailgun

• `Private` **mailgun**: `Mailgun`

#### Defined in

[server/services/mailgun.ts:7](https://github.com/onzag/itemize/blob/f2f29986/server/services/mailgun.ts#L7)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[registry](server_services_base_MailProvider.default.md#registry)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L36)

## Methods

### checkForNewMail

▸ **checkForNewMail**(): `void`

#### Returns

`void`

#### Defined in

[server/services/mailgun.ts:142](https://github.com/onzag/itemize/blob/f2f29986/server/services/mailgun.ts#L142)

___

### execute

▸ **execute**(): `void`

Performs the execution of the service, basically
it will do the run function and then re-run as specified

#### Returns

`void`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[execute](server_services_base_MailProvider.default.md#execute)

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

[default](server_services_base_MailProvider.default.md).[expressRouter](server_services_base_MailProvider.default.md#expressrouter)

#### Defined in

[server/services/index.ts:110](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L110)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getInstanceName](server_services_base_MailProvider.default.md#getinstancename)

#### Defined in

[server/services/index.ts:74](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L74)

___

### getRouter

▸ **getRouter**(): `Promise`<`Router`\>

Provides a router endpoint, the router endpoint
will exist directly under the rest services
this enables to create webhooks and other subservices
that are attached to this service

If the service provider if executed on a global environment
the endpoint does not get created, this means that in the global
manager this won't be executed, or anything that is meant
for the global manager

The router gets attached to /rest/service

#### Returns

`Promise`<`Router`\>

#### Overrides

[default](server_services_base_MailProvider.default.md).[getRouter](server_services_base_MailProvider.default.md#getrouter)

#### Defined in

[server/services/mailgun.ts:149](https://github.com/onzag/itemize/blob/f2f29986/server/services/mailgun.ts#L149)

___

### getRunCycleTime

▸ **getRunCycleTime**(): `number`

Determines whether the run function
should run over again

#### Returns

`number`

#### Overrides

[default](server_services_base_MailProvider.default.md).[getRunCycleTime](server_services_base_MailProvider.default.md#getruncycletime)

#### Defined in

[server/services/mailgun.ts:116](https://github.com/onzag/itemize/blob/f2f29986/server/services/mailgun.ts#L116)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

**`override`**

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getTriggerRegistry](server_services_base_MailProvider.default.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:278](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L278)

___

### initialize

▸ **initialize**(): `Promise`<`void`\>

This function is executed during
the initialization of the service

If your service is a global service you will
have access to the global resources while
this function executes

#### Returns

`Promise`<`void`\>

#### Overrides

[default](server_services_base_MailProvider.default.md).[initialize](server_services_base_MailProvider.default.md#initialize)

#### Defined in

[server/services/mailgun.ts:14](https://github.com/onzag/itemize/blob/f2f29986/server/services/mailgun.ts#L14)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[isInstanceGlobal](server_services_base_MailProvider.default.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:78](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L78)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[isInstanceLocal](server_services_base_MailProvider.default.md#isinstancelocal)

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

[default](server_services_base_MailProvider.default.md).[logDebug](server_services_base_MailProvider.default.md#logdebug)

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

[default](server_services_base_MailProvider.default.md).[logError](server_services_base_MailProvider.default.md#logerror)

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

[default](server_services_base_MailProvider.default.md).[logInfo](server_services_base_MailProvider.default.md#loginfo)

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

#### Inherited from

[default](server_services_base_MailProvider.default.md).[onEmailRecieved](server_services_base_MailProvider.default.md#onemailrecieved)

#### Defined in

[server/services/base/MailProvider.ts:591](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/MailProvider.ts#L591)

___

### run

▸ **run**(): `void`

Executes some code

#### Returns

`void`

#### Overrides

[default](server_services_base_MailProvider.default.md).[run](server_services_base_MailProvider.default.md#run)

#### Defined in

[server/services/mailgun.ts:136](https://github.com/onzag/itemize/blob/f2f29986/server/services/mailgun.ts#L136)

___

### sendEmail

▸ **sendEmail**(`data`): `Promise`<`void`\>

This function is executed when the service
needs to send an email

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ISendEmailData`](../interfaces/server_services_base_MailProvider.ISendEmailData.md) |

#### Returns

`Promise`<`void`\>

#### Overrides

[default](server_services_base_MailProvider.default.md).[sendEmail](server_services_base_MailProvider.default.md#sendemail)

#### Defined in

[server/services/mailgun.ts:59](https://github.com/onzag/itemize/blob/f2f29986/server/services/mailgun.ts#L59)

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

#### Inherited from

[default](server_services_base_MailProvider.default.md).[sendTemplateEmail](server_services_base_MailProvider.default.md#sendtemplateemail)

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

#### Inherited from

[default](server_services_base_MailProvider.default.md).[sendUnverifiedTemplateEmail](server_services_base_MailProvider.default.md#sendunverifiedtemplateemail)

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

[default](server_services_base_MailProvider.default.md).[setInstanceName](server_services_base_MailProvider.default.md#setinstancename)

#### Defined in

[server/services/index.ts:70](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L70)

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

[default](server_services_base_MailProvider.default.md).[setupGlobalResources](server_services_base_MailProvider.default.md#setupglobalresources)

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

[default](server_services_base_MailProvider.default.md).[setupLocalResources](server_services_base_MailProvider.default.md#setuplocalresources)

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

[default](server_services_base_MailProvider.default.md).[expressRouter](server_services_base_MailProvider.default.md#expressrouter)

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

[default](server_services_base_MailProvider.default.md).[getRouter](server_services_base_MailProvider.default.md#getrouter)

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

[default](server_services_base_MailProvider.default.md).[getTriggerRegistry](server_services_base_MailProvider.default.md#gettriggerregistry)

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

[default](server_services_base_MailProvider.default.md).[getType](server_services_base_MailProvider.default.md#gettype)

#### Defined in

[server/services/mailgun.ts:10](https://github.com/onzag/itemize/blob/f2f29986/server/services/mailgun.ts#L10)

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

[default](server_services_base_MailProvider.default.md).[logDebug](server_services_base_MailProvider.default.md#logdebug)

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

[default](server_services_base_MailProvider.default.md).[logError](server_services_base_MailProvider.default.md#logerror)

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

[default](server_services_base_MailProvider.default.md).[logInfo](server_services_base_MailProvider.default.md#loginfo)

#### Defined in

[server/services/index.ts:98](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L98)
