[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/listener](../modules/server_listener.md) / Listener

# Class: Listener

[server/listener](../modules/server_listener.md).Listener

## Table of contents

### Constructors

- [constructor](server_listener.Listener.md#constructor)

### Properties

- [awaitingBasicEvent](server_listener.Listener.md#awaitingbasicevent)
- [awaitingBasicFeedbacks](server_listener.Listener.md#awaitingbasicfeedbacks)
- [awaitingOwnedParentedSearchEvents](server_listener.Listener.md#awaitingownedparentedsearchevents)
- [awaitingOwnedParentedSearchFeedbacks](server_listener.Listener.md#awaitingownedparentedsearchfeedbacks)
- [awaitingOwnedSearchEvents](server_listener.Listener.md#awaitingownedsearchevents)
- [awaitingOwnedSearchFeedbacks](server_listener.Listener.md#awaitingownedsearchfeedbacks)
- [awaitingParentedSearchEvents](server_listener.Listener.md#awaitingparentedsearchevents)
- [awaitingParentedSearchFeedbacks](server_listener.Listener.md#awaitingparentedsearchfeedbacks)
- [awaitingPropertySearchEvents](server_listener.Listener.md#awaitingpropertysearchevents)
- [awaitingPropertySearchFeedbacks](server_listener.Listener.md#awaitingpropertysearchfeedbacks)
- [buildnumber](server_listener.Listener.md#buildnumber)
- [cache](server_listener.Listener.md#cache)
- [customRoles](server_listener.Listener.md#customroles)
- [io](server_listener.Listener.md#io)
- [listeners](server_listener.Listener.md#listeners)
- [listensSS](server_listener.Listener.md#listensss)
- [rawDB](server_listener.Listener.md#rawdb)
- [redisGlobalPub](server_listener.Listener.md#redisglobalpub)
- [redisGlobalSub](server_listener.Listener.md#redisglobalsub)
- [redisLocalPub](server_listener.Listener.md#redislocalpub)
- [redisLocalSub](server_listener.Listener.md#redislocalsub)
- [registry](server_listener.Listener.md#registry)
- [root](server_listener.Listener.md#root)
- [sensitiveConfig](server_listener.Listener.md#sensitiveconfig)
- [server](server_listener.Listener.md#server)

### Methods

- [addSocket](server_listener.Listener.md#addsocket)
- [die](server_listener.Listener.md#die)
- [emitError](server_listener.Listener.md#emiterror)
- [feedback](server_listener.Listener.md#feedback)
- [globalRedisListener](server_listener.Listener.md#globalredislistener)
- [identify](server_listener.Listener.md#identify)
- [informClusterManagerReset](server_listener.Listener.md#informclustermanagerreset)
- [init](server_listener.Listener.md#init)
- [kick](server_listener.Listener.md#kick)
- [localRedisListener](server_listener.Listener.md#localredislistener)
- [onClusterManagerResetInformed](server_listener.Listener.md#onclustermanagerresetinformed)
- [onReceiveKickEvent](server_listener.Listener.md#onreceivekickevent)
- [ownedParentedSearchFeedback](server_listener.Listener.md#ownedparentedsearchfeedback)
- [ownedParentedSearchRegister](server_listener.Listener.md#ownedparentedsearchregister)
- [ownedParentedSearchUnregister](server_listener.Listener.md#ownedparentedsearchunregister)
- [ownedSearchFeedback](server_listener.Listener.md#ownedsearchfeedback)
- [ownedSearchRegister](server_listener.Listener.md#ownedsearchregister)
- [ownedSearchUnregister](server_listener.Listener.md#ownedsearchunregister)
- [parentedSearchFeedback](server_listener.Listener.md#parentedsearchfeedback)
- [parentedSearchRegister](server_listener.Listener.md#parentedsearchregister)
- [parentedSearchUnregister](server_listener.Listener.md#parentedsearchunregister)
- [patchAwaitingSearchEvent](server_listener.Listener.md#patchawaitingsearchevent)
- [propertySearchFeedback](server_listener.Listener.md#propertysearchfeedback)
- [propertySearchRegister](server_listener.Listener.md#propertysearchregister)
- [propertySearchUnregister](server_listener.Listener.md#propertysearchunregister)
- [register](server_listener.Listener.md#register)
- [registerSS](server_listener.Listener.md#registerss)
- [removeListener](server_listener.Listener.md#removelistener)
- [removeListenerFinal](server_listener.Listener.md#removelistenerfinal)
- [removeSocket](server_listener.Listener.md#removesocket)
- [revive](server_listener.Listener.md#revive)
- [sendKickEvent](server_listener.Listener.md#sendkickevent)
- [setupSocketIO](server_listener.Listener.md#setupsocketio)
- [triggerChangedListeners](server_listener.Listener.md#triggerchangedlisteners)
- [triggerOwnedParentedSearchListeners](server_listener.Listener.md#triggerownedparentedsearchlisteners)
- [triggerOwnedSearchListeners](server_listener.Listener.md#triggerownedsearchlisteners)
- [triggerParentedSearchListeners](server_listener.Listener.md#triggerparentedsearchlisteners)
- [triggerPropertySearchListeners](server_listener.Listener.md#triggerpropertysearchlisteners)
- [unregister](server_listener.Listener.md#unregister)
- [unregisterSS](server_listener.Listener.md#unregisterss)

## Constructors

### constructor

• **new Listener**(`buildnumber`, `redisGlobalSub`, `redisGlobalPub`, `redisLocalSub`, `redisLocalPub`, `registry`, `root`, `cache`, `rawDB`, `server`, `customRoles`, `sensitiveConfig`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `buildnumber` | `string` |
| `redisGlobalSub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `redisGlobalPub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `redisLocalSub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `redisLocalPub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `root` | [`default`](base_Root.default.md) |
| `cache` | [`Cache`](server_cache.Cache.md) |
| `rawDB` | [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md) |
| `server` | `Server` |
| `customRoles` | [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md)[] |
| `sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) |

#### Defined in

[server/listener.ts:203](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L203)

## Properties

### awaitingBasicEvent

• `Private` **awaitingBasicEvent**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: [`IChangedFeedbackEvent`](../interfaces/base_remote_protocol.IChangedFeedbackEvent.md)

#### Defined in

[server/listener.ts:190](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L190)

___

### awaitingBasicFeedbacks

• `Private` **awaitingBasicFeedbacks**: `Object` = `{}`

#### Index signature

▪ [sockedId: `string`]: [`IFeedbackRequest`](../interfaces/base_remote_protocol.IFeedbackRequest.md)[]

#### Defined in

[server/listener.ts:196](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L196)

___

### awaitingOwnedParentedSearchEvents

• `Private` **awaitingOwnedParentedSearchEvents**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: [`IOwnedParentedSearchRecordsEvent`](../interfaces/base_remote_protocol.IOwnedParentedSearchRecordsEvent.md)

#### Defined in

[server/listener.ts:192](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L192)

___

### awaitingOwnedParentedSearchFeedbacks

• `Private` **awaitingOwnedParentedSearchFeedbacks**: `Object` = `{}`

#### Index signature

▪ [sockedId: `string`]: [`IOwnedParentedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IOwnedParentedSearchFeedbackRequest.md)[]

#### Defined in

[server/listener.ts:198](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L198)

___

### awaitingOwnedSearchEvents

• `Private` **awaitingOwnedSearchEvents**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: [`IOwnedSearchRecordsEvent`](../interfaces/base_remote_protocol.IOwnedSearchRecordsEvent.md)

#### Defined in

[server/listener.ts:191](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L191)

___

### awaitingOwnedSearchFeedbacks

• `Private` **awaitingOwnedSearchFeedbacks**: `Object` = `{}`

#### Index signature

▪ [sockedId: `string`]: [`IOwnedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IOwnedSearchFeedbackRequest.md)[]

#### Defined in

[server/listener.ts:197](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L197)

___

### awaitingParentedSearchEvents

• `Private` **awaitingParentedSearchEvents**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: [`IParentedSearchRecordsEvent`](../interfaces/base_remote_protocol.IParentedSearchRecordsEvent.md)

#### Defined in

[server/listener.ts:193](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L193)

___

### awaitingParentedSearchFeedbacks

• `Private` **awaitingParentedSearchFeedbacks**: `Object` = `{}`

#### Index signature

▪ [sockedId: `string`]: [`IParentedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IParentedSearchFeedbackRequest.md)[]

#### Defined in

[server/listener.ts:199](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L199)

___

### awaitingPropertySearchEvents

• `Private` **awaitingPropertySearchEvents**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: [`IPropertySearchRecordsEvent`](../interfaces/base_remote_protocol.IPropertySearchRecordsEvent.md)

#### Defined in

[server/listener.ts:194](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L194)

___

### awaitingPropertySearchFeedbacks

• `Private` **awaitingPropertySearchFeedbacks**: `Object` = `{}`

#### Index signature

▪ [sockedId: `string`]: [`IPropertySearchFeedbackRequest`](../interfaces/base_remote_protocol.IPropertySearchFeedbackRequest.md)[]

#### Defined in

[server/listener.ts:200](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L200)

___

### buildnumber

• `Private` **buildnumber**: `string`

#### Defined in

[server/listener.ts:181](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L181)

___

### cache

• `Private` **cache**: [`Cache`](server_cache.Cache.md)

#### Defined in

[server/listener.ts:184](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L184)

___

### customRoles

• `Private` **customRoles**: [`ICustomRoleType`](../interfaces/server_resolvers_roles.ICustomRoleType.md)[]

#### Defined in

[server/listener.ts:188](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L188)

___

### io

• `Private` **io**: `Server`

#### Defined in

[server/listener.ts:172](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L172)

___

### listeners

• `Private` **listeners**: `IListenerList` = `{}`

#### Defined in

[server/listener.ts:174](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L174)

___

### listensSS

• `Private` **listensSS**: `IServerListensList` = `{}`

#### Defined in

[server/listener.ts:175](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L175)

___

### rawDB

• `Private` **rawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Defined in

[server/listener.ts:183](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L183)

___

### redisGlobalPub

• `Private` **redisGlobalPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/listener.ts:178](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L178)

___

### redisGlobalSub

• `Private` **redisGlobalSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/listener.ts:177](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L177)

___

### redisLocalPub

• `Private` **redisLocalPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/listener.ts:180](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L180)

___

### redisLocalSub

• `Private` **redisLocalSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/listener.ts:179](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L179)

___

### registry

• `Private` **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Defined in

[server/listener.ts:186](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L186)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

#### Defined in

[server/listener.ts:182](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L182)

___

### sensitiveConfig

• `Private` **sensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Defined in

[server/listener.ts:185](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L185)

___

### server

• `Private` **server**: `Server`

#### Defined in

[server/listener.ts:187](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L187)

## Methods

### addSocket

▸ **addSocket**(`socket`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |

#### Returns

`void`

#### Defined in

[server/listener.ts:335](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L335)

___

### die

▸ **die**(): `void`

#### Returns

`void`

#### Defined in

[server/listener.ts:255](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L255)

___

### emitError

▸ **emitError**(`socket`, `message`, `request`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `message` | `string` |
| `request` | `any` |

#### Returns

`void`

#### Defined in

[server/listener.ts:345](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L345)

___

### feedback

▸ **feedback**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IFeedbackRequest`](../interfaces/base_remote_protocol.IFeedbackRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:2653](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L2653)

___

### globalRedisListener

▸ **globalRedisListener**(`channel`, `message`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `message` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:3411](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L3411)

___

### identify

▸ **identify**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IIdentifyRequest`](../interfaces/base_remote_protocol.IIdentifyRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:400](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L400)

___

### informClusterManagerReset

▸ **informClusterManagerReset**(): `void`

#### Returns

`void`

#### Defined in

[server/listener.ts:3644](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L3644)

___

### init

▸ **init**(): `void`

#### Returns

`void`

#### Defined in

[server/listener.ts:236](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L236)

___

### kick

▸ **kick**(`socket`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |

#### Returns

`void`

#### Defined in

[server/listener.ts:385](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L385)

___

### localRedisListener

▸ **localRedisListener**(`channel`, `message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `channel` | `string` |
| `message` | `string` |

#### Returns

`void`

#### Defined in

[server/listener.ts:3539](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L3539)

___

### onClusterManagerResetInformed

▸ **onClusterManagerResetInformed**(): `void`

#### Returns

`void`

#### Defined in

[server/listener.ts:3616](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L3616)

___

### onReceiveKickEvent

▸ **onReceiveKickEvent**(`userId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`void`

#### Defined in

[server/listener.ts:374](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L374)

___

### ownedParentedSearchFeedback

▸ **ownedParentedSearchFeedback**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IOwnedParentedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IOwnedParentedSearchFeedbackRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:2321](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L2321)

___

### ownedParentedSearchRegister

▸ **ownedParentedSearchRegister**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IOwnedParentedSearchRegisterRequest`](../interfaces/base_remote_protocol.IOwnedParentedSearchRegisterRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:1213](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L1213)

___

### ownedParentedSearchUnregister

▸ **ownedParentedSearchUnregister**(`socket`, `request`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IOwnedParentedSearchUnregisterRequest`](../interfaces/base_remote_protocol.IOwnedParentedSearchUnregisterRequest.md) |

#### Returns

`void`

#### Defined in

[server/listener.ts:3087](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L3087)

___

### ownedSearchFeedback

▸ **ownedSearchFeedback**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IOwnedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IOwnedSearchFeedbackRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:1356](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L1356)

___

### ownedSearchRegister

▸ **ownedSearchRegister**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IOwnedSearchRegisterRequest`](../interfaces/base_remote_protocol.IOwnedSearchRegisterRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:752](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L752)

___

### ownedSearchUnregister

▸ **ownedSearchUnregister**(`socket`, `request`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IOwnedSearchUnregisterRequest`](../interfaces/base_remote_protocol.IOwnedSearchUnregisterRequest.md) |

#### Returns

`void`

#### Defined in

[server/listener.ts:2970](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L2970)

___

### parentedSearchFeedback

▸ **parentedSearchFeedback**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IParentedSearchFeedbackRequest`](../interfaces/base_remote_protocol.IParentedSearchFeedbackRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:1994](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L1994)

___

### parentedSearchRegister

▸ **parentedSearchRegister**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IParentedSearchRegisterRequest`](../interfaces/base_remote_protocol.IParentedSearchRegisterRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:1070](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L1070)

___

### parentedSearchUnregister

▸ **parentedSearchUnregister**(`socket`, `request`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IParentedSearchUnregisterRequest`](../interfaces/base_remote_protocol.IParentedSearchUnregisterRequest.md) |

#### Returns

`void`

#### Defined in

[server/listener.ts:3047](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L3047)

___

### patchAwaitingSearchEvent

▸ `Private` **patchAwaitingSearchEvent**(`src`, `patch`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | [`IOwnedSearchRecordsEvent`](../interfaces/base_remote_protocol.IOwnedSearchRecordsEvent.md) \| [`IParentedSearchRecordsEvent`](../interfaces/base_remote_protocol.IParentedSearchRecordsEvent.md) \| [`IOwnedParentedSearchRecordsEvent`](../interfaces/base_remote_protocol.IOwnedParentedSearchRecordsEvent.md) \| [`IPropertySearchRecordsEvent`](../interfaces/base_remote_protocol.IPropertySearchRecordsEvent.md) |
| `patch` | [`IOwnedSearchRecordsEvent`](../interfaces/base_remote_protocol.IOwnedSearchRecordsEvent.md) \| [`IParentedSearchRecordsEvent`](../interfaces/base_remote_protocol.IParentedSearchRecordsEvent.md) \| [`IOwnedParentedSearchRecordsEvent`](../interfaces/base_remote_protocol.IOwnedParentedSearchRecordsEvent.md) \| [`IPropertySearchRecordsEvent`](../interfaces/base_remote_protocol.IPropertySearchRecordsEvent.md) |

#### Returns

`void`

#### Defined in

[server/listener.ts:3366](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L3366)

___

### propertySearchFeedback

▸ **propertySearchFeedback**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IPropertySearchFeedbackRequest`](../interfaces/base_remote_protocol.IPropertySearchFeedbackRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:1630](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L1630)

___

### propertySearchRegister

▸ **propertySearchRegister**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IPropertySearchRegisterRequest`](../interfaces/base_remote_protocol.IPropertySearchRegisterRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:890](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L890)

___

### propertySearchUnregister

▸ **propertySearchUnregister**(`socket`, `request`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IPropertySearchUnregisterRequest`](../interfaces/base_remote_protocol.IPropertySearchUnregisterRequest.md) |

#### Returns

`void`

#### Defined in

[server/listener.ts:3008](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L3008)

___

### register

▸ **register**(`socket`, `request`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IRegisterRequest`](../interfaces/base_remote_protocol.IRegisterRequest.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:588](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L588)

___

### registerSS

▸ **registerSS**(`request`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`IRegisterRequest`](../interfaces/base_remote_protocol.IRegisterRequest.md) |

#### Returns

`void`

#### Defined in

[server/listener.ts:525](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L525)

___

### removeListener

▸ **removeListener**(`socket`, `mergedIndexIdentifier`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `mergedIndexIdentifier` | `string` |

#### Returns

`void`

#### Defined in

[server/listener.ts:2895](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L2895)

___

### removeListenerFinal

▸ **removeListenerFinal**(`mergedIndexIdentifier`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `mergedIndexIdentifier` | `string` |

#### Returns

`void`

#### Defined in

[server/listener.ts:2878](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L2878)

___

### removeSocket

▸ **removeSocket**(`socket`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |

#### Returns

`void`

#### Defined in

[server/listener.ts:3576](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L3576)

___

### revive

▸ **revive**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[server/listener.ts:258](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L258)

___

### sendKickEvent

▸ **sendKickEvent**(`userId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `string` |

#### Returns

`void`

#### Defined in

[server/listener.ts:359](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L359)

___

### setupSocketIO

▸ **setupSocketIO**(): `void`

#### Returns

`void`

#### Defined in

[server/listener.ts:274](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L274)

___

### triggerChangedListeners

▸ **triggerChangedListeners**(`event`, `data`, `listenerUUID`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IChangedFeedbackEvent`](../interfaces/base_remote_protocol.IChangedFeedbackEvent.md) |
| `data` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `listenerUUID` | `string` |
| `options` | `Object` |
| `options.noInstanceGroupId?` | `boolean` |

#### Returns

`void`

#### Defined in

[server/listener.ts:3128](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L3128)

___

### triggerOwnedParentedSearchListeners

▸ **triggerOwnedParentedSearchListeners**(`event`, `listenerUUID`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IOwnedParentedSearchRecordsEvent`](../interfaces/base_remote_protocol.IOwnedParentedSearchRecordsEvent.md) |
| `listenerUUID` | `string` |
| `options` | `Object` |
| `options.noInstanceGroupId?` | `boolean` |

#### Returns

`void`

#### Defined in

[server/listener.ts:3319](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L3319)

___

### triggerOwnedSearchListeners

▸ **triggerOwnedSearchListeners**(`event`, `listenerUUID`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IOwnedSearchRecordsEvent`](../interfaces/base_remote_protocol.IOwnedSearchRecordsEvent.md) |
| `listenerUUID` | `string` |
| `options` | `Object` |
| `options.noInstanceGroupId?` | `boolean` |

#### Returns

`void`

#### Defined in

[server/listener.ts:3183](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L3183)

___

### triggerParentedSearchListeners

▸ **triggerParentedSearchListeners**(`event`, `listenerUUID`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IParentedSearchRecordsEvent`](../interfaces/base_remote_protocol.IParentedSearchRecordsEvent.md) |
| `listenerUUID` | `string` |
| `options` | `Object` |
| `options.noInstanceGroupId?` | `boolean` |

#### Returns

`void`

#### Defined in

[server/listener.ts:3273](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L3273)

___

### triggerPropertySearchListeners

▸ **triggerPropertySearchListeners**(`event`, `listenerUUID`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`IPropertySearchRecordsEvent`](../interfaces/base_remote_protocol.IPropertySearchRecordsEvent.md) |
| `listenerUUID` | `string` |
| `options` | `Object` |
| `options.noInstanceGroupId?` | `boolean` |

#### Returns

`void`

#### Defined in

[server/listener.ts:3228](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L3228)

___

### unregister

▸ **unregister**(`socket`, `request`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `socket` | `Socket` |
| `request` | [`IUnregisterRequest`](../interfaces/base_remote_protocol.IUnregisterRequest.md) |

#### Returns

`void`

#### Defined in

[server/listener.ts:2931](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L2931)

___

### unregisterSS

▸ **unregisterSS**(`request`): `void`

This method only reasonable gets called by the CLUSTER_MANAGER or in absolute mode

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`IUnregisterRequest`](../interfaces/base_remote_protocol.IUnregisterRequest.md) |

#### Returns

`void`

#### Defined in

[server/listener.ts:2918](https://github.com/onzag/itemize/blob/a24376ed/server/listener.ts#L2918)
