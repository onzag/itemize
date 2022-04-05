[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/PaymentProvider](../modules/server_services_base_PaymentProvider.md) / default

# Class: default<T\>

[server/services/base/PaymentProvider](../modules/server_services_base_PaymentProvider.md).default

Represents the base payment provider and every payment provider
to be implemented should extend this one to ensure compatibility
with whatever code is generated

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`ServiceProvider`](server_services.ServiceProvider.md)<`T`\>

  ↳ **`default`**

  ↳↳ [`ManualPaymentService`](server_services_manual_payment.ManualPaymentService.md)

  ↳↳ [`StripeService`](server_services_stripe.StripeService.md)

## Table of contents

### Constructors

- [constructor](server_services_base_PaymentProvider.default.md#constructor)

### Properties

- [appConfig](server_services_base_PaymentProvider.default.md#appconfig)
- [appSensitiveConfig](server_services_base_PaymentProvider.default.md#appsensitiveconfig)
- [config](server_services_base_PaymentProvider.default.md#config)
- [globalCustomServices](server_services_base_PaymentProvider.default.md#globalcustomservices)
- [globalDatabaseConnection](server_services_base_PaymentProvider.default.md#globaldatabaseconnection)
- [globalInstance](server_services_base_PaymentProvider.default.md#globalinstance)
- [globalMailProvider](server_services_base_PaymentProvider.default.md#globalmailprovider)
- [globalPhoneProvider](server_services_base_PaymentProvider.default.md#globalphoneprovider)
- [globalRawDB](server_services_base_PaymentProvider.default.md#globalrawdb)
- [globalRedis](server_services_base_PaymentProvider.default.md#globalredis)
- [globalRedisPub](server_services_base_PaymentProvider.default.md#globalredispub)
- [globalRedisSub](server_services_base_PaymentProvider.default.md#globalredissub)
- [globalRoot](server_services_base_PaymentProvider.default.md#globalroot)
- [hiddenMetadataProcessing](server_services_base_PaymentProvider.default.md#hiddenmetadataprocessing)
- [instanceName](server_services_base_PaymentProvider.default.md#instancename)
- [listeners](server_services_base_PaymentProvider.default.md#listeners)
- [localAppData](server_services_base_PaymentProvider.default.md#localappdata)
- [localInstance](server_services_base_PaymentProvider.default.md#localinstance)
- [registry](server_services_base_PaymentProvider.default.md#registry)

### Methods

- [activateSubscription](server_services_base_PaymentProvider.default.md#activatesubscription)
- [addEventListener](server_services_base_PaymentProvider.default.md#addeventlistener)
- [cancelSubscription](server_services_base_PaymentProvider.default.md#cancelsubscription)
- [changePaymentStatus](server_services_base_PaymentProvider.default.md#changepaymentstatus)
- [custom](server_services_base_PaymentProvider.default.md#custom)
- [execute](server_services_base_PaymentProvider.default.md#execute)
- [executeRefund](server_services_base_PaymentProvider.default.md#executerefund)
- [expressRouter](server_services_base_PaymentProvider.default.md#expressrouter)
- [getHiddenMetadataInBetweenProcessing](server_services_base_PaymentProvider.default.md#gethiddenmetadatainbetweenprocessing)
- [getHiddenMetadataInBetweenProcessingJSON](server_services_base_PaymentProvider.default.md#gethiddenmetadatainbetweenprocessingjson)
- [getInstanceName](server_services_base_PaymentProvider.default.md#getinstancename)
- [getRouter](server_services_base_PaymentProvider.default.md#getrouter)
- [getRunCycleTime](server_services_base_PaymentProvider.default.md#getruncycletime)
- [getTriggerRegistry](server_services_base_PaymentProvider.default.md#gettriggerregistry)
- [getUUIDFor](server_services_base_PaymentProvider.default.md#getuuidfor)
- [initialize](server_services_base_PaymentProvider.default.md#initialize)
- [isInstanceGlobal](server_services_base_PaymentProvider.default.md#isinstanceglobal)
- [isInstanceLocal](server_services_base_PaymentProvider.default.md#isinstancelocal)
- [logDebug](server_services_base_PaymentProvider.default.md#logdebug)
- [logError](server_services_base_PaymentProvider.default.md#logerror)
- [logInfo](server_services_base_PaymentProvider.default.md#loginfo)
- [processSettingOfHiddenMetadataAt](server_services_base_PaymentProvider.default.md#processsettingofhiddenmetadataat)
- [removeEventListener](server_services_base_PaymentProvider.default.md#removeeventlistener)
- [retrievePaymentObject](server_services_base_PaymentProvider.default.md#retrievepaymentobject)
- [run](server_services_base_PaymentProvider.default.md#run)
- [setHiddenMetadataAt](server_services_base_PaymentProvider.default.md#sethiddenmetadataat)
- [setHiddenMetadataAtWithoutProcessing](server_services_base_PaymentProvider.default.md#sethiddenmetadataatwithoutprocessing)
- [setHiddenMetadataAtWithoutProcessingJSON](server_services_base_PaymentProvider.default.md#sethiddenmetadataatwithoutprocessingjson)
- [setInstanceName](server_services_base_PaymentProvider.default.md#setinstancename)
- [setupGlobalResources](server_services_base_PaymentProvider.default.md#setupglobalresources)
- [setupLocalResources](server_services_base_PaymentProvider.default.md#setuplocalresources)
- [triggerEvent](server_services_base_PaymentProvider.default.md#triggerevent)
- [unwrapUUIDFor](server_services_base_PaymentProvider.default.md#unwrapuuidfor)
- [expressRouter](server_services_base_PaymentProvider.default.md#expressrouter)
- [getRouter](server_services_base_PaymentProvider.default.md#getrouter)
- [getTriggerRegistry](server_services_base_PaymentProvider.default.md#gettriggerregistry)
- [getType](server_services_base_PaymentProvider.default.md#gettype)
- [logDebug](server_services_base_PaymentProvider.default.md#logdebug)
- [logError](server_services_base_PaymentProvider.default.md#logerror)
- [logInfo](server_services_base_PaymentProvider.default.md#loginfo)

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

### hiddenMetadataProcessing

• `Private` **hiddenMetadataProcessing**: `Object` = `{}`

Represents a current state for the processing of the hidden
metadata, the hidden metadata can be of use for the payment
events in order to change whatever data is stored in it

#### Index signature

▪ [uuid: `string`]: `string`

#### Defined in

[server/services/base/PaymentProvider.ts:271](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L271)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[instanceName](server_services.ServiceProvider.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/f2f29986/server/services/index.ts#L54)

___

### listeners

• `Private` **listeners**: `PaymentListeners`

Represents the list of listeners that were
appended to the provider

#### Defined in

[server/services/base/PaymentProvider.ts:255](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L255)

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

## Methods

### activateSubscription

▸ **activateSubscription**(`uuidOrLocation`, `extras?`): `Promise`<`void`\>

Basically the same as changePaymentStatus but
changes it to status active

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuidOrLocation` | `string` \| [`IPaymentUniqueLocation`](../interfaces/server_services_base_PaymentProvider.IPaymentUniqueLocation.md) |
| `extras` | `Object` |
| `extras.knownValue?` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `extras.metadata?` | `string` |

#### Returns

`Promise`<`void`\>

a void promise

#### Defined in

[server/services/base/PaymentProvider.ts:559](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L559)

___

### addEventListener

▸ **addEventListener**(`ev`, `listener`): `void`

Adds an event listener to execute when a payment event has occurred

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ev` | [`PaymentEvent`](../enums/server_services_base_PaymentProvider.PaymentEvent.md) | the event to bind to |
| `listener` | [`PaymentEventListener`](../modules/server_services_base_PaymentProvider.md#paymenteventlistener) | the given listener |

#### Returns

`void`

#### Defined in

[server/services/base/PaymentProvider.ts:696](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L696)

___

### cancelSubscription

▸ **cancelSubscription**(`uuidOrLocation`, `extras?`): `Promise`<`void`\>

Basically the same as changePaymentStatus but
changes it to status inactive

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuidOrLocation` | `string` \| [`IPaymentUniqueLocation`](../interfaces/server_services_base_PaymentProvider.IPaymentUniqueLocation.md) |
| `extras` | `Object` |
| `extras.knownValue?` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `extras.metadata?` | `string` |

#### Returns

`Promise`<`void`\>

a void promise

#### Defined in

[server/services/base/PaymentProvider.ts:538](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L538)

___

### changePaymentStatus

▸ **changePaymentStatus**(`status`, `uuidOrLocation`, `extras?`): `Promise`<`void`\>

Allows to pick and find a payment object in the database and change its status
from one to another, the change is realtime and affects the client side
as well as whatever listeners are around

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `status` | [`PaymentStatusType`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.PaymentStatusType.md) | the new status to assign to the payment |
| `uuidOrLocation` | `string` \| [`IPaymentUniqueLocation`](../interfaces/server_services_base_PaymentProvider.IPaymentUniqueLocation.md) | the uuid of the payment or the unwrapped unique location |
| `extras` | `Object` | - |
| `extras.knownValue?` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | if the value of the row is already known provide it, it will help speed up |
| `extras.metadata?` | `string` | change the metadata during this event |
| `extras.rometadata?` | `string` | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/services/base/PaymentProvider.ts:631](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L631)

___

### custom

▸ **custom**(`fn`, `arg`): `void`

A simple function for custom functionality

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | `string` | the function to execute |
| `arg` | `any` | the argument to pass at it |

#### Returns

`void`

#### Defined in

[server/services/base/PaymentProvider.ts:745](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L745)

___

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

### executeRefund

▸ **executeRefund**(`invoicePaymentUUID`, `refundPaymentUUID`, `extras?`): `void`

When defining a payment you should specify how to issue a refund based on this event
this allows the developer to issue a refund based on an invoice payment and a refund
payment

**`override`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `invoicePaymentUUID` | `string` | required the invoice payment that needs to be reverted into a refund |
| `refundPaymentUUID` | `string` | an optional (null allowed) refund payment type that represents the reversal of the action |
| `extras` | `Object` | extra information to aid into the refund process |
| `extras.knownInvoicePaymentRowValue?` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | if you know the row value of the invoice add it here |
| `extras.knownRefundPaymentRowValue?` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | if you know the row value of the refund add it here |

#### Returns

`void`

#### Defined in

[server/services/base/PaymentProvider.ts:727](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L727)

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

### getHiddenMetadataInBetweenProcessing

▸ `Private` **getHiddenMetadataInBetweenProcessing**(`uuid`): `string`

Provides the hidden metadata in between the processing of it
for a given uuid

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uuid` | `string` | the uuid to get the hidden metadata for |

#### Returns

`string`

a string that represents the hidden metadata

#### Defined in

[server/services/base/PaymentProvider.ts:324](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L324)

___

### getHiddenMetadataInBetweenProcessingJSON

▸ `Private` **getHiddenMetadataInBetweenProcessingJSON**(`uuid`, `attr?`): `any`

Provides the hidden metadata in between the processing of it
for a given uuid and it parses it into JSON

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uuid` | `string` | the uuid to get the hidden metadata for |
| `attr?` | `string` | an optional attribute to only get for |

#### Returns

`any`

a string that represents the hidden metadata

#### Defined in

[server/services/base/PaymentProvider.ts:335](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L335)

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

### getUUIDFor

▸ **getUUIDFor**(`info`): `string`

Provides an uuid for a given payment event
this uuid is related to the space that this payment is taking in
the row of the database and it's unique for that payment object

#### Parameters

| Name | Type |
| :------ | :------ |
| `info` | [`IPaymentProviderPaymentExtraInfo`](../interfaces/server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md) \| [`IPaymentUniqueLocation`](../interfaces/server_services_base_PaymentProvider.IPaymentUniqueLocation.md) |

#### Returns

`string`

#### Defined in

[server/services/base/PaymentProvider.ts:410](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L410)

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

### processSettingOfHiddenMetadataAt

▸ `Private` **processSettingOfHiddenMetadataAt**(`uuid`, `originalValueToCompareAgainst?`): `Promise`<`string`\>

Processes the hidden metadata into the database and returns the stored value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uuid` | `string` | the uuid to process the hidden metadata for |
| `originalValueToCompareAgainst?` | `string` | the original value to compare against if equal it will not attempt any changes |

#### Returns

`Promise`<`string`\>

the stored value

#### Defined in

[server/services/base/PaymentProvider.ts:355](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L355)

___

### removeEventListener

▸ **removeEventListener**(`ev`, `listener`): `void`

removes an event listener to execute when a payment event has occurred

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ev` | [`PaymentEvent`](../enums/server_services_base_PaymentProvider.PaymentEvent.md) | the event to unbind for |
| `listener` | [`PaymentEventListener`](../modules/server_services_base_PaymentProvider.md#paymenteventlistener) | the given listener |

#### Returns

`void`

#### Defined in

[server/services/base/PaymentProvider.ts:706](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L706)

___

### retrievePaymentObject

▸ **retrievePaymentObject**(`uuidOrLocation`, `knownValue?`): `Promise`<{ `hiddenMetadata`: `string` ; `include`: [`default`](base_Root_Module_ItemDefinition_Include.default.md) ; `item`: [`default`](base_Root_Module_ItemDefinition.default.md) = itemDef; `location`: [`IPaymentUniqueLocation`](../interfaces/server_services_base_PaymentProvider.IPaymentUniqueLocation.md) ; `property`: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) = propDef; `rowValue`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) = value; `value`: [`IPropertyDefinitionSupportedPaymentType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md) = currentValue }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `uuidOrLocation` | `string` \| [`IPaymentUniqueLocation`](../interfaces/server_services_base_PaymentProvider.IPaymentUniqueLocation.md) |
| `knownValue?` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

`Promise`<{ `hiddenMetadata`: `string` ; `include`: [`default`](base_Root_Module_ItemDefinition_Include.default.md) ; `item`: [`default`](base_Root_Module_ItemDefinition.default.md) = itemDef; `location`: [`IPaymentUniqueLocation`](../interfaces/server_services_base_PaymentProvider.IPaymentUniqueLocation.md) ; `property`: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md) = propDef; `rowValue`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) = value; `value`: [`IPropertyDefinitionSupportedPaymentType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md) = currentValue }\>

#### Defined in

[server/services/base/PaymentProvider.ts:573](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L573)

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

### setHiddenMetadataAt

▸ **setHiddenMetadataAt**(`uuid`, `hiddenMetadata`): `Promise`<`string`\>

Sets the hidden metadata at a given payment uuid

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uuid` | `string` | the uuid to store the hidden metadata at |
| `hiddenMetadata` | `string` | the new hidden metadata value |

#### Returns

`Promise`<`string`\>

the hidden metadata value that was stored

#### Defined in

[server/services/base/PaymentProvider.ts:399](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L399)

___

### setHiddenMetadataAtWithoutProcessing

▸ `Private` **setHiddenMetadataAtWithoutProcessing**(`uuid`, `hiddenMetadata`): `void`

Sets the hidden metadata without processing it into the database
and storing it as a value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uuid` | `string` | the uuid to set the hidden metadata for |
| `hiddenMetadata` | `string` | the hidden metadata itself |

#### Returns

`void`

#### Defined in

[server/services/base/PaymentProvider.ts:281](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L281)

___

### setHiddenMetadataAtWithoutProcessingJSON

▸ `Private` **setHiddenMetadataAtWithoutProcessingJSON**(`uuid`, `valueOrAttr`, `value?`): `void`

Sets the hidden metadata without processing it into the database
but it uses a JSON mechanism instead

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uuid` | `string` | the uuid to set the hidden metadata for |
| `valueOrAttr` | `any` | the value or the attribute to se tthe thing for |
| `value?` | `any` | the value itself, if not present then the previous will be considered the whole value |

#### Returns

`void`

#### Defined in

[server/services/base/PaymentProvider.ts:293](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L293)

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

### triggerEvent

▸ **triggerEvent**(`ev`, `payment`, `hiddenMetadata`, `info`): `Promise`<`string`\>

This function is intended to be used by the itemize server itself
in order to internally trigger the events when it finds payment
information changing

You are not supposed to use this function yourself, as it's used
internally when things happen

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ev` | [`PaymentEvent`](../enums/server_services_base_PaymentProvider.PaymentEvent.md) | the event type to trigger |
| `payment` | [`IPropertyDefinitionSupportedPaymentType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_payment.IPropertyDefinitionSupportedPaymentType.md) | the payment object in question |
| `hiddenMetadata` | `string` | the hidden metadata of the element |
| `info` | [`IPaymentProviderPaymentExtraInfo`](../interfaces/server_services_base_PaymentProvider.IPaymentProviderPaymentExtraInfo.md) | the extra information for the event |

#### Returns

`Promise`<`string`\>

the end value of the hidden metadata row as stored

#### Defined in

[server/services/base/PaymentProvider.ts:497](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L497)

___

### unwrapUUIDFor

▸ **unwrapUUIDFor**(`uuid`): [`IPaymentUniqueLocation`](../interfaces/server_services_base_PaymentProvider.IPaymentUniqueLocation.md)

For a given uuid it will find the table, row id, location, etc...
where the uuid payment is referenced

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `uuid` | `string` | the uuid to unwrap |

#### Returns

[`IPaymentUniqueLocation`](../interfaces/server_services_base_PaymentProvider.IPaymentUniqueLocation.md)

the payment object location

#### Defined in

[server/services/base/PaymentProvider.ts:441](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L441)

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

Provides the type of the service provider, for the payment
provider this is a local type as it runs locally in every
cluster

#### Returns

[`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

LOCAL

#### Overrides

[ServiceProvider](server_services.ServiceProvider.md).[getType](server_services.ServiceProvider.md#gettype)

#### Defined in

[server/services/base/PaymentProvider.ts:247](https://github.com/onzag/itemize/blob/f2f29986/server/services/base/PaymentProvider.ts#L247)

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
