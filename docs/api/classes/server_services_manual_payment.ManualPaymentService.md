[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/manual-payment](../modules/server_services_manual_payment.md) / ManualPaymentService

# Class: ManualPaymentService

[server/services/manual-payment](../modules/server_services_manual_payment.md).ManualPaymentService

The Manual payment service does not much but log the payment events that are
occuring, it does not modify payments, and it is what should be used when
there is no payment service to layer against

This is basically what you use for cash only services

## Hierarchy

- [`default`](server_services_base_PaymentProvider.default.md)<``null``\>

  ↳ **`ManualPaymentService`**

## Table of contents

### Constructors

- [constructor](server_services_manual_payment.ManualPaymentService.md#constructor)

### Properties

- [appConfig](server_services_manual_payment.ManualPaymentService.md#appconfig)
- [appDbConfig](server_services_manual_payment.ManualPaymentService.md#appdbconfig)
- [appRedisConfig](server_services_manual_payment.ManualPaymentService.md#appredisconfig)
- [appSensitiveConfig](server_services_manual_payment.ManualPaymentService.md#appsensitiveconfig)
- [config](server_services_manual_payment.ManualPaymentService.md#config)
- [globalCustomServices](server_services_manual_payment.ManualPaymentService.md#globalcustomservices)
- [globalDatabaseConnection](server_services_manual_payment.ManualPaymentService.md#globaldatabaseconnection)
- [globalInstance](server_services_manual_payment.ManualPaymentService.md#globalinstance)
- [globalMailProvider](server_services_manual_payment.ManualPaymentService.md#globalmailprovider)
- [globalPhoneProvider](server_services_manual_payment.ManualPaymentService.md#globalphoneprovider)
- [globalRawDB](server_services_manual_payment.ManualPaymentService.md#globalrawdb)
- [globalRedis](server_services_manual_payment.ManualPaymentService.md#globalredis)
- [globalRedisPub](server_services_manual_payment.ManualPaymentService.md#globalredispub)
- [globalRedisSub](server_services_manual_payment.ManualPaymentService.md#globalredissub)
- [globalRoot](server_services_manual_payment.ManualPaymentService.md#globalroot)
- [instanceName](server_services_manual_payment.ManualPaymentService.md#instancename)
- [localAppData](server_services_manual_payment.ManualPaymentService.md#localappdata)
- [localInstance](server_services_manual_payment.ManualPaymentService.md#localinstance)
- [registry](server_services_manual_payment.ManualPaymentService.md#registry)

### Methods

- [activateSubscription](server_services_manual_payment.ManualPaymentService.md#activatesubscription)
- [addEventListener](server_services_manual_payment.ManualPaymentService.md#addeventlistener)
- [cancelSubscription](server_services_manual_payment.ManualPaymentService.md#cancelsubscription)
- [changePaymentStatus](server_services_manual_payment.ManualPaymentService.md#changepaymentstatus)
- [custom](server_services_manual_payment.ManualPaymentService.md#custom)
- [execute](server_services_manual_payment.ManualPaymentService.md#execute)
- [executeRefund](server_services_manual_payment.ManualPaymentService.md#executerefund)
- [expressRouter](server_services_manual_payment.ManualPaymentService.md#expressrouter)
- [getInstanceName](server_services_manual_payment.ManualPaymentService.md#getinstancename)
- [getRouter](server_services_manual_payment.ManualPaymentService.md#getrouter)
- [getRunCycleTime](server_services_manual_payment.ManualPaymentService.md#getruncycletime)
- [getTriggerRegistry](server_services_manual_payment.ManualPaymentService.md#gettriggerregistry)
- [getUUIDFor](server_services_manual_payment.ManualPaymentService.md#getuuidfor)
- [initialize](server_services_manual_payment.ManualPaymentService.md#initialize)
- [isInstanceGlobal](server_services_manual_payment.ManualPaymentService.md#isinstanceglobal)
- [isInstanceLocal](server_services_manual_payment.ManualPaymentService.md#isinstancelocal)
- [logDebug](server_services_manual_payment.ManualPaymentService.md#logdebug)
- [logError](server_services_manual_payment.ManualPaymentService.md#logerror)
- [logInfo](server_services_manual_payment.ManualPaymentService.md#loginfo)
- [onPayment](server_services_manual_payment.ManualPaymentService.md#onpayment)
- [removeEventListener](server_services_manual_payment.ManualPaymentService.md#removeeventlistener)
- [retrievePaymentObject](server_services_manual_payment.ManualPaymentService.md#retrievepaymentobject)
- [run](server_services_manual_payment.ManualPaymentService.md#run)
- [setHiddenMetadataAt](server_services_manual_payment.ManualPaymentService.md#sethiddenmetadataat)
- [setInstanceName](server_services_manual_payment.ManualPaymentService.md#setinstancename)
- [setupGlobalResources](server_services_manual_payment.ManualPaymentService.md#setupglobalresources)
- [setupLocalResources](server_services_manual_payment.ManualPaymentService.md#setuplocalresources)
- [triggerEvent](server_services_manual_payment.ManualPaymentService.md#triggerevent)
- [unwrapUUIDFor](server_services_manual_payment.ManualPaymentService.md#unwrapuuidfor)
- [expressRouter](server_services_manual_payment.ManualPaymentService.md#expressrouter)
- [getRouter](server_services_manual_payment.ManualPaymentService.md#getrouter)
- [getTriggerRegistry](server_services_manual_payment.ManualPaymentService.md#gettriggerregistry)
- [getType](server_services_manual_payment.ManualPaymentService.md#gettype)
- [logDebug](server_services_manual_payment.ManualPaymentService.md#logdebug)
- [logError](server_services_manual_payment.ManualPaymentService.md#logerror)
- [logInfo](server_services_manual_payment.ManualPaymentService.md#loginfo)

## Constructors

### constructor

• **new ManualPaymentService**(`config`, `registry`, `configs`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | ``null`` |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `configs` | `Object` |
| `configs.config` | [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md) |
| `configs.dbConfig` | [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md) |
| `configs.redisConfig` | [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md) |
| `configs.sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[constructor](server_services_base_PaymentProvider.default.md#constructor)

#### Defined in

[server/services/index.ts:58](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L58)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[appConfig](server_services_base_PaymentProvider.default.md#appconfig)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L35)

___

### appDbConfig

• **appDbConfig**: [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[appDbConfig](server_services_base_PaymentProvider.default.md#appdbconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L37)

___

### appRedisConfig

• **appRedisConfig**: [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[appRedisConfig](server_services_base_PaymentProvider.default.md#appredisconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L38)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[appSensitiveConfig](server_services_base_PaymentProvider.default.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L36)

___

### config

• **config**: ``null``

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[config](server_services_base_PaymentProvider.default.md#config)

#### Defined in

[server/services/index.ts:33](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L33)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)<`any`\>

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[globalCustomServices](server_services_base_PaymentProvider.default.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[globalDatabaseConnection](server_services_base_PaymentProvider.default.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[globalInstance](server_services_base_PaymentProvider.default.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)<`any`\>

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[globalMailProvider](server_services_base_PaymentProvider.default.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)<`any`\>

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[globalPhoneProvider](server_services_base_PaymentProvider.default.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[globalRawDB](server_services_base_PaymentProvider.default.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[globalRedis](server_services_base_PaymentProvider.default.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[globalRedisPub](server_services_base_PaymentProvider.default.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[globalRedisSub](server_services_base_PaymentProvider.default.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[globalRoot](server_services_base_PaymentProvider.default.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L45)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[instanceName](server_services_base_PaymentProvider.default.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[localAppData](server_services_base_PaymentProvider.default.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[localInstance](server_services_base_PaymentProvider.default.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L56)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[registry](server_services_base_PaymentProvider.default.md#registry)

#### Defined in

[server/services/index.ts:34](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L34)

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

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[activateSubscription](server_services_base_PaymentProvider.default.md#activatesubscription)

#### Defined in

[server/services/base/PaymentProvider.ts:559](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L559)

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

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[addEventListener](server_services_base_PaymentProvider.default.md#addeventlistener)

#### Defined in

[server/services/base/PaymentProvider.ts:697](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L697)

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

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[cancelSubscription](server_services_base_PaymentProvider.default.md#cancelsubscription)

#### Defined in

[server/services/base/PaymentProvider.ts:538](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L538)

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

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[changePaymentStatus](server_services_base_PaymentProvider.default.md#changepaymentstatus)

#### Defined in

[server/services/base/PaymentProvider.ts:632](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L632)

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

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[custom](server_services_base_PaymentProvider.default.md#custom)

#### Defined in

[server/services/base/PaymentProvider.ts:746](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L746)

___

### execute

▸ **execute**(): `void`

Performs the execution of the service, basically
it will do the run function and then re-run as specified

#### Returns

`void`

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[execute](server_services_base_PaymentProvider.default.md#execute)

#### Defined in

[server/services/index.ts:170](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L170)

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

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[executeRefund](server_services_base_PaymentProvider.default.md#executerefund)

#### Defined in

[server/services/base/PaymentProvider.ts:728](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L728)

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

[default](server_services_base_PaymentProvider.default.md).[expressRouter](server_services_base_PaymentProvider.default.md#expressrouter)

#### Defined in

[server/services/index.ts:116](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L116)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[getInstanceName](server_services_base_PaymentProvider.default.md#getinstancename)

#### Defined in

[server/services/index.ts:80](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L80)

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

[default](server_services_base_PaymentProvider.default.md).[getRouter](server_services_base_PaymentProvider.default.md#getrouter)

#### Defined in

[server/services/index.ts:266](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L266)

___

### getRunCycleTime

▸ **getRunCycleTime**(): `number`

Determines whether the run function
should run over again

**`override`**

#### Returns

`number`

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[getRunCycleTime](server_services_base_PaymentProvider.default.md#getruncycletime)

#### Defined in

[server/services/index.ts:239](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L239)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

**`override`**

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md) \| `Promise`<[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)\>

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[getTriggerRegistry](server_services_base_PaymentProvider.default.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:293](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L293)

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

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[getUUIDFor](server_services_base_PaymentProvider.default.md#getuuidfor)

#### Defined in

[server/services/base/PaymentProvider.ts:410](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L410)

___

### initialize

▸ **initialize**(): `void`

This function is executed during
the initialization of the service

If your service is a global service you will
have access to the global resources while
this function executes

#### Returns

`void`

#### Overrides

[default](server_services_base_PaymentProvider.default.md).[initialize](server_services_base_PaymentProvider.default.md#initialize)

#### Defined in

[server/services/manual-payment.ts:19](https://github.com/onzag/itemize/blob/a24376ed/server/services/manual-payment.ts#L19)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[isInstanceGlobal](server_services_base_PaymentProvider.default.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:84](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L84)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[isInstanceLocal](server_services_base_PaymentProvider.default.md#isinstancelocal)

#### Defined in

[server/services/index.ts:88](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L88)

___

### logDebug

▸ **logDebug**<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[logDebug](server_services_base_PaymentProvider.default.md#logdebug)

#### Defined in

[server/services/index.ts:96](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L96)

___

### logError

▸ **logError**<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingErrorStructure`](../interfaces/server_logger.IItemizeLoggingErrorStructure.md)<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[logError](server_services_base_PaymentProvider.default.md#logerror)

#### Defined in

[server/services/index.ts:100](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L100)

___

### logInfo

▸ **logInfo**<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[logInfo](server_services_base_PaymentProvider.default.md#loginfo)

#### Defined in

[server/services/index.ts:92](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L92)

___

### onPayment

▸ **onPayment**(`evObj`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `evObj` | [`IPaymentEventObject`](../interfaces/server_services_base_PaymentProvider.IPaymentEventObject.md) |

#### Returns

`void`

#### Defined in

[server/services/manual-payment.ts:32](https://github.com/onzag/itemize/blob/a24376ed/server/services/manual-payment.ts#L32)

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

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[removeEventListener](server_services_base_PaymentProvider.default.md#removeeventlistener)

#### Defined in

[server/services/base/PaymentProvider.ts:707](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L707)

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

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[retrievePaymentObject](server_services_base_PaymentProvider.default.md#retrievepaymentobject)

#### Defined in

[server/services/base/PaymentProvider.ts:573](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L573)

___

### run

▸ **run**(): `void` \| `Promise`<`void`\>

Executes some code

**`override`**

#### Returns

`void` \| `Promise`<`void`\>

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[run](server_services_base_PaymentProvider.default.md#run)

#### Defined in

[server/services/index.ts:247](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L247)

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

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[setHiddenMetadataAt](server_services_base_PaymentProvider.default.md#sethiddenmetadataat)

#### Defined in

[server/services/base/PaymentProvider.ts:399](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L399)

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

[default](server_services_base_PaymentProvider.default.md).[setInstanceName](server_services_base_PaymentProvider.default.md#setinstancename)

#### Defined in

[server/services/index.ts:76](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L76)

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

[default](server_services_base_PaymentProvider.default.md).[setupGlobalResources](server_services_base_PaymentProvider.default.md#setupglobalresources)

#### Defined in

[server/services/index.ts:124](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L124)

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

[default](server_services_base_PaymentProvider.default.md).[setupLocalResources](server_services_base_PaymentProvider.default.md#setuplocalresources)

#### Defined in

[server/services/index.ts:148](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L148)

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

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[triggerEvent](server_services_base_PaymentProvider.default.md#triggerevent)

#### Defined in

[server/services/base/PaymentProvider.ts:497](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L497)

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

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[unwrapUUIDFor](server_services_base_PaymentProvider.default.md#unwrapuuidfor)

#### Defined in

[server/services/base/PaymentProvider.ts:441](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L441)

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

[default](server_services_base_PaymentProvider.default.md).[expressRouter](server_services_base_PaymentProvider.default.md#expressrouter)

#### Defined in

[server/services/index.ts:120](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L120)

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

[default](server_services_base_PaymentProvider.default.md).[getRouter](server_services_base_PaymentProvider.default.md#getrouter)

#### Defined in

[server/services/index.ts:283](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L283)

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

[default](server_services_base_PaymentProvider.default.md).[getTriggerRegistry](server_services_base_PaymentProvider.default.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:305](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L305)

___

### getType

▸ `Static` **getType**(): [`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

Provides the type of the service provider, for the payment
provider this is a local type as it runs locally in every
cluster

#### Returns

[`ServiceProviderType`](../enums/server_services.ServiceProviderType.md)

LOCAL

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[getType](server_services_base_PaymentProvider.default.md#gettype)

#### Defined in

[server/services/base/PaymentProvider.ts:247](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/PaymentProvider.ts#L247)

___

### logDebug

▸ `Static` **logDebug**<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[logDebug](server_services_base_PaymentProvider.default.md#logdebug)

#### Defined in

[server/services/index.ts:108](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L108)

___

### logError

▸ `Static` **logError**<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingErrorStructure`](../interfaces/server_logger.IItemizeLoggingErrorStructure.md)<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[logError](server_services_base_PaymentProvider.default.md#logerror)

#### Defined in

[server/services/index.ts:112](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L112)

___

### logInfo

▸ `Static` **logInfo**<`T`\>(`data`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`IItemizeLoggingStructure`](../interfaces/server_logger.IItemizeLoggingStructure.md)<`T`\> |

#### Returns

`void`

#### Inherited from

[default](server_services_base_PaymentProvider.default.md).[logInfo](server_services_base_PaymentProvider.default.md#loginfo)

#### Defined in

[server/services/index.ts:104](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L104)
