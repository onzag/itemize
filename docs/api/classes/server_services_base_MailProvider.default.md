[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/base/MailProvider](../modules/server_services_base_MailProvider.md) / default

# Class: default\<T\>

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

- [`ServiceProvider`](server_services.ServiceProvider.md)\<`T`\>

  ↳ **`default`**

  ↳↳ [`FakeMailService`](server_services_fake_mail.FakeMailService.md)

  ↳↳ [`MailgunService`](server_services_mailgun.MailgunService.md)

## Table of contents

### Constructors

- [constructor](server_services_base_MailProvider.default.md#constructor)

### Properties

- [appConfig](server_services_base_MailProvider.default.md#appconfig)
- [appDbConfig](server_services_base_MailProvider.default.md#appdbconfig)
- [appRedisConfig](server_services_base_MailProvider.default.md#appredisconfig)
- [appSensitiveConfig](server_services_base_MailProvider.default.md#appsensitiveconfig)
- [config](server_services_base_MailProvider.default.md#config)
- [extraIncludes](server_services_base_MailProvider.default.md#extraincludes)
- [extraProperties](server_services_base_MailProvider.default.md#extraproperties)
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

- [allowUserToReceiveExternalEmail](server_services_base_MailProvider.default.md#allowusertoreceiveexternalemail)
- [allowUserToSendEmail](server_services_base_MailProvider.default.md#allowusertosendemail)
- [allowUserToSendEmailToItem](server_services_base_MailProvider.default.md#allowusertosendemailtoitem)
- [allowUserToSendEmailToItemType](server_services_base_MailProvider.default.md#allowusertosendemailtoitemtype)
- [createFileFromLocalFile](server_services_base_MailProvider.default.md#createfilefromlocalfile)
- [createFileFromReadStream](server_services_base_MailProvider.default.md#createfilefromreadstream)
- [createFileFromURL](server_services_base_MailProvider.default.md#createfilefromurl)
- [escapeUserName](server_services_base_MailProvider.default.md#escapeusername)
- [execute](server_services_base_MailProvider.default.md#execute)
- [expressRouter](server_services_base_MailProvider.default.md#expressrouter)
- [formatForward](server_services_base_MailProvider.default.md#formatforward)
- [forwardMessages](server_services_base_MailProvider.default.md#forwardmessages)
- [getBreakHeader](server_services_base_MailProvider.default.md#getbreakheader)
- [getExtraArgs](server_services_base_MailProvider.default.md#getextraargs)
- [getForwardDateIndicator](server_services_base_MailProvider.default.md#getforwarddateindicator)
- [getForwardDeletedIndicator](server_services_base_MailProvider.default.md#getforwarddeletedindicator)
- [getForwardFromIndicator](server_services_base_MailProvider.default.md#getforwardfromindicator)
- [getForwardMessageHeader](server_services_base_MailProvider.default.md#getforwardmessageheader)
- [getForwardProxyIndicator](server_services_base_MailProvider.default.md#getforwardproxyindicator)
- [getForwardSubjectIndicator](server_services_base_MailProvider.default.md#getforwardsubjectindicator)
- [getForwardSubjectReplace](server_services_base_MailProvider.default.md#getforwardsubjectreplace)
- [getForwardToIndicator](server_services_base_MailProvider.default.md#getforwardtoindicator)
- [getForwardViewAtIndicator](server_services_base_MailProvider.default.md#getforwardviewatindicator)
- [getForwardViewAtURL](server_services_base_MailProvider.default.md#getforwardviewaturl)
- [getInstanceName](server_services_base_MailProvider.default.md#getinstancename)
- [getLangHeader](server_services_base_MailProvider.default.md#getlangheader)
- [getLangHeaderBase](server_services_base_MailProvider.default.md#getlangheaderbase)
- [getNoReplySubjectPrefix](server_services_base_MailProvider.default.md#getnoreplysubjectprefix)
- [getNotificationsUsername](server_services_base_MailProvider.default.md#getnotificationsusername)
- [getObjectName](server_services_base_MailProvider.default.md#getobjectname)
- [getRouter](server_services_base_MailProvider.default.md#getrouter)
- [getRunCycleTime](server_services_base_MailProvider.default.md#getruncycletime)
- [getSizeLimit](server_services_base_MailProvider.default.md#getsizelimit)
- [getTriggerRegistry](server_services_base_MailProvider.default.md#gettriggerregistry)
- [getUserName](server_services_base_MailProvider.default.md#getusername)
- [initialize](server_services_base_MailProvider.default.md#initialize)
- [isInstanceGlobal](server_services_base_MailProvider.default.md#isinstanceglobal)
- [isInstanceLocal](server_services_base_MailProvider.default.md#isinstancelocal)
- [logDebug](server_services_base_MailProvider.default.md#logdebug)
- [logError](server_services_base_MailProvider.default.md#logerror)
- [logInfo](server_services_base_MailProvider.default.md#loginfo)
- [onEmailReceivedReplyResolver](server_services_base_MailProvider.default.md#onemailreceivedreplyresolver)
- [onExternalEmailBounced](server_services_base_MailProvider.default.md#onexternalemailbounced)
- [onExternalEmailReceived](server_services_base_MailProvider.default.md#onexternalemailreceived)
- [onUsersReceivedExternalEmail](server_services_base_MailProvider.default.md#onusersreceivedexternalemail)
- [onUsersReceivedInternalEmail](server_services_base_MailProvider.default.md#onusersreceivedinternalemail)
- [parseRFC2822](server_services_base_MailProvider.default.md#parserfc2822)
- [renderMessageForMail](server_services_base_MailProvider.default.md#rendermessageformail)
- [renderMessageFormatForward](server_services_base_MailProvider.default.md#rendermessageformatforward)
- [renderMessageFromMail](server_services_base_MailProvider.default.md#rendermessagefrommail)
- [resolveTarget](server_services_base_MailProvider.default.md#resolvetarget)
- [resolveUsersForEmailToItem](server_services_base_MailProvider.default.md#resolveusersforemailtoitem)
- [run](server_services_base_MailProvider.default.md#run)
- [sendEmail](server_services_base_MailProvider.default.md#sendemail)
- [sendTemplateEmail](server_services_base_MailProvider.default.md#sendtemplateemail)
- [sendUnverifiedTemplateEmail](server_services_base_MailProvider.default.md#sendunverifiedtemplateemail)
- [setInstanceName](server_services_base_MailProvider.default.md#setinstancename)
- [setMessageStorageItemDefinition](server_services_base_MailProvider.default.md#setmessagestorageitemdefinition)
- [setupGlobalResources](server_services_base_MailProvider.default.md#setupglobalresources)
- [setupLocalResources](server_services_base_MailProvider.default.md#setuplocalresources)
- [expressRouter](server_services_base_MailProvider.default.md#expressrouter-1)
- [getRouter](server_services_base_MailProvider.default.md#getrouter-1)
- [getTriggerRegistry](server_services_base_MailProvider.default.md#gettriggerregistry-1)
- [getType](server_services_base_MailProvider.default.md#gettype)
- [logDebug](server_services_base_MailProvider.default.md#logdebug-1)
- [logError](server_services_base_MailProvider.default.md#logerror-1)
- [logInfo](server_services_base_MailProvider.default.md#loginfo-1)

## Constructors

### constructor

• **new default**\<`T`\>(`c`, `registry`, `configs`): [`default`](server_services_base_MailProvider.default.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | `T` |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `configs` | `any` |

#### Returns

[`default`](server_services_base_MailProvider.default.md)\<`T`\>

#### Overrides

[ServiceProvider](server_services.ServiceProvider.md).[constructor](server_services.ServiceProvider.md#constructor)

#### Defined in

[server/services/base/MailProvider.ts:262](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L262)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appConfig](server_services.ServiceProvider.md#appconfig)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L35)

___

### appDbConfig

• **appDbConfig**: [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appDbConfig](server_services.ServiceProvider.md#appdbconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L37)

___

### appRedisConfig

• **appRedisConfig**: [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appRedisConfig](server_services.ServiceProvider.md#appredisconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L38)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[appSensitiveConfig](server_services.ServiceProvider.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L36)

___

### config

• **config**: `T`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[config](server_services.ServiceProvider.md#config)

#### Defined in

[server/services/index.ts:33](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L33)

___

### extraIncludes

• `Private` **extraIncludes**: [`default`](base_Root_Module_ItemDefinition_Include.default.md)[]

#### Defined in

[server/services/base/MailProvider.ts:281](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L281)

___

### extraProperties

• `Private` **extraProperties**: [`default`](base_Root_Module_ItemDefinition_PropertyDefinition.default.md)[]

#### Defined in

[server/services/base/MailProvider.ts:280](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L280)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)\<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalCustomServices](server_services.ServiceProvider.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalDatabaseConnection](server_services.ServiceProvider.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean` = `false`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalInstance](server_services.ServiceProvider.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)\<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalMailProvider](server_services.ServiceProvider.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)\<`any`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalPhoneProvider](server_services.ServiceProvider.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRawDB](server_services.ServiceProvider.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedis](server_services.ServiceProvider.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedisPub](server_services.ServiceProvider.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRedisSub](server_services.ServiceProvider.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[globalRoot](server_services.ServiceProvider.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L45)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[instanceName](server_services.ServiceProvider.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[localAppData](server_services.ServiceProvider.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean` = `false`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[localInstance](server_services.ServiceProvider.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L56)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[registry](server_services.ServiceProvider.md#registry)

#### Defined in

[server/services/index.ts:34](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L34)

___

### storageIdef

• `Private` **storageIdef**: [`default`](base_Root_Module_ItemDefinition.default.md)

the storage item definition

#### Defined in

[server/services/base/MailProvider.ts:279](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L279)

## Methods

### allowUserToReceiveExternalEmail

▸ **allowUserToReceiveExternalEmail**(`user`, `internalSender`, `data`): `Promise`\<``"SPAM"`` \| ``"REJECT"`` \| ``"ACCEPT"``\>

use to filter spam and unwanted emails

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the user that is receiving the email |
| `internalSender` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | - |
| `data` | [`IReceiveEmailData`](../interfaces/server_services_base_MailProvider.IReceiveEmailData.md) | the data that is being received |

#### Returns

`Promise`\<``"SPAM"`` \| ``"REJECT"`` \| ``"ACCEPT"``\>

SPAM for when to mark it as spam, REJECT for rejecting the message entirely, ACCEPT for accepting it

#### Defined in

[server/services/base/MailProvider.ts:1557](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L1557)

___

### allowUserToSendEmail

▸ **allowUserToSendEmail**(`user`, `target`, `value`): `Promise`\<``"SPAM"`` \| ``"REJECT"`` \| ``"ACCEPT"``\>

to filter spam and unwanted emails
triggers when an user is trying to send an email to another, when the target is a sql value
it means that its using internal solving, as in two users that are in the same system, if the value
is a plain string, it means it's trying to solve

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the user SQL value |
| `target` | `string` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | if a string it refers to an external email, if a SQL row value it refers to an internal user |
| `value` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | - |

#### Returns

`Promise`\<``"SPAM"`` \| ``"REJECT"`` \| ``"ACCEPT"``\>

SPAM only works for internal usage and the message will be marked as spam for the recepient
REJECT will not send the message on its entirety, and ACCEPT will send the message

#### Defined in

[server/services/base/MailProvider.ts:1572](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L1572)

___

### allowUserToSendEmailToItem

▸ **allowUserToSendEmailToItem**(`user`, `target`, `targetType`, `value`): `Promise`\<``"SPAM"`` \| ``"REJECT"`` \| ``"ACCEPT"``\>

to filter unwatned emails to objects

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `target` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `targetType` | [`default`](base_Root_Module_ItemDefinition.default.md) |
| `value` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

`Promise`\<``"SPAM"`` \| ``"REJECT"`` \| ``"ACCEPT"``\>

#### Defined in

[server/services/base/MailProvider.ts:1609](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L1609)

___

### allowUserToSendEmailToItemType

▸ **allowUserToSendEmailToItemType**(`user`, `id`, `target`): `Promise`\<`boolean`\>

When using the syntax id$QUALIFIED_NAME to send an email it will validate to an object type
to send to a target object rather than an user as id$MOD_users__IDEF_user is the default

This is useful to create mailing lists or groups of many users, create an object and say allow users
to join by adding some sort of reference then resolve them via the resolveUsersForEmailToItem function
so that such users get the emails internally routed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the user trying to send |
| `id` | `string` | the id the user is trying to set as target |
| `target` | [`default`](base_Root_Module_ItemDefinition.default.md) | the target item |

#### Returns

`Promise`\<`boolean`\>

false by default

#### Defined in

[server/services/base/MailProvider.ts:1593](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L1593)

___

### createFileFromLocalFile

▸ **createFileFromLocalFile**(`id`, `filepath`, `name`, `size`, `type`, `extraArgs?`): [`IPropertyDefinitionSupportedSingleFilesType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `filepath` | `string` |
| `name` | `string` |
| `size` | `number` |
| `type` | `string` |
| `extraArgs?` | `Object` |
| `extraArgs.widthXHeight?` | [`number`, `number`] |

#### Returns

[`IPropertyDefinitionSupportedSingleFilesType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)

#### Defined in

[server/services/base/MailProvider.ts:333](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L333)

___

### createFileFromReadStream

▸ **createFileFromReadStream**(`id`, `stream`, `name`, `size`, `type`, `extraArgs?`): `Promise`\<[`IPropertyDefinitionSupportedSingleFilesType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `stream` | `ReadStream` |
| `name` | `string` |
| `size` | `number` |
| `type` | `string` |
| `extraArgs?` | `Object` |
| `extraArgs.storeInFileThenReadAgain` | `boolean` |
| `extraArgs.widthXHeight?` | [`number`, `number`] |

#### Returns

`Promise`\<[`IPropertyDefinitionSupportedSingleFilesType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)\>

#### Defined in

[server/services/base/MailProvider.ts:356](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L356)

___

### createFileFromURL

▸ **createFileFromURL**(`url`, `name`, `size`, `type`, `extraArgs?`): [`IPropertyDefinitionSupportedSingleFilesType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `name` | `string` |
| `size` | `number` |
| `type` | `string` |
| `extraArgs?` | `Object` |
| `extraArgs.httpHeaders?` | `any` |
| `extraArgs.widthXHeight?` | [`number`, `number`] |

#### Returns

[`IPropertyDefinitionSupportedSingleFilesType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)

#### Defined in

[server/services/base/MailProvider.ts:293](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L293)

___

### escapeUserName

▸ **escapeUserName**(`name`): `string`

escape username for usage in the email subject user

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:538](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L538)

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

[ServiceProvider](server_services.ServiceProvider.md).[expressRouter](server_services.ServiceProvider.md#expressrouter)

#### Defined in

[server/services/index.ts:116](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L116)

___

### formatForward

▸ **formatForward**(`html`, `lang`, `message`, `isBreak`): `Promise`\<`string`\>

This formats a forwarded message for when it's sent to an external target

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `html` | `string` | the html of the forwarded message itself |
| `lang` | `string` | - |
| `message` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the message object itself |
| `isBreak` | `boolean` | whether this message actually can't fit due to size limitations (do not try to render much the thread is broken) |

#### Returns

`Promise`\<`string`\>

#### Defined in

[server/services/base/MailProvider.ts:2794](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2794)

___

### forwardMessages

▸ **forwardMessages**(`message`, `user`, `containerID`, `isSpam`, `cache`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `user` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `containerID` | `string` |
| `isSpam` | `boolean` |
| `cache` | [`Cache`](server_cache.Cache.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/services/base/MailProvider.ts:2138](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2138)

___

### getBreakHeader

▸ **getBreakHeader**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:2919](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2919)

___

### getExtraArgs

▸ **getExtraArgs**(): `any`

#### Returns

`any`

#### Defined in

[server/services/base/MailProvider.ts:516](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L516)

___

### getForwardDateIndicator

▸ **getForwardDateIndicator**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:2907](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2907)

___

### getForwardDeletedIndicator

▸ **getForwardDeletedIndicator**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:2891](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2891)

___

### getForwardFromIndicator

▸ **getForwardFromIndicator**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:2895](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2895)

___

### getForwardMessageHeader

▸ **getForwardMessageHeader**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:2915](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2915)

___

### getForwardProxyIndicator

▸ **getForwardProxyIndicator**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:2899](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2899)

___

### getForwardSubjectIndicator

▸ **getForwardSubjectIndicator**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:2911](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2911)

___

### getForwardSubjectReplace

▸ **getForwardSubjectReplace**(`lang`, `username`, `proxyname`, `proxyType`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |
| `username` | `string` |
| `proxyname` | `string` |
| `proxyType` | `string` |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:2874](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2874)

___

### getForwardToIndicator

▸ **getForwardToIndicator**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:2903](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2903)

___

### getForwardViewAtIndicator

▸ **getForwardViewAtIndicator**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:2887](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2887)

___

### getForwardViewAtURL

▸ **getForwardViewAtURL**(`lang`, `message`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |
| `message` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:2882](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2882)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[getInstanceName](server_services.ServiceProvider.md#getinstancename)

#### Defined in

[server/services/index.ts:80](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L80)

___

### getLangHeader

▸ **getLangHeader**(`lang`, `id`, `def`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |
| `id` | `string` |
| `def` | `string` |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:2928](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2928)

___

### getLangHeaderBase

▸ **getLangHeaderBase**(`lang`, `id`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |
| `id` | `string` |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:2923](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2923)

___

### getNoReplySubjectPrefix

▸ **getNoReplySubjectPrefix**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:2870](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2870)

___

### getNotificationsUsername

▸ **getNotificationsUsername**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Defined in

[server/services/base/MailProvider.ts:2878](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2878)

___

### getObjectName

▸ **getObjectName**(`object`): `any`

Provides the name of an object for the user

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

`any`

#### Defined in

[server/services/base/MailProvider.ts:2226](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2226)

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

[ServiceProvider](server_services.ServiceProvider.md).[getRouter](server_services.ServiceProvider.md#getrouter)

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

[ServiceProvider](server_services.ServiceProvider.md).[getRunCycleTime](server_services.ServiceProvider.md#getruncycletime)

#### Defined in

[server/services/index.ts:239](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L239)

___

### getSizeLimit

▸ **getSizeLimit**(): `number`

The maximum message size in bytes that you are capable of sending

#### Returns

`number`

#### Defined in

[server/services/base/MailProvider.ts:2940](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2940)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)

#### Overrides

[ServiceProvider](server_services.ServiceProvider.md).[getTriggerRegistry](server_services.ServiceProvider.md#gettriggerregistry)

#### Defined in

[server/services/base/MailProvider.ts:2293](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2293)

___

### getUserName

▸ **getUserName**(`user`): `any`

provides the user name for a given user

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

`any`

**`Overide`**

#### Defined in

[server/services/base/MailProvider.ts:2217](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2217)

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

[ServiceProvider](server_services.ServiceProvider.md).[initialize](server_services.ServiceProvider.md#initialize)

#### Defined in

[server/services/index.ts:230](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L230)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[isInstanceGlobal](server_services.ServiceProvider.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:84](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L84)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[isInstanceLocal](server_services.ServiceProvider.md#isinstancelocal)

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

[ServiceProvider](server_services.ServiceProvider.md).[logDebug](server_services.ServiceProvider.md#logdebug)

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

[ServiceProvider](server_services.ServiceProvider.md).[logError](server_services.ServiceProvider.md#logerror)

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

[ServiceProvider](server_services.ServiceProvider.md).[logInfo](server_services.ServiceProvider.md#loginfo)

#### Defined in

[server/services/index.ts:92](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L92)

___

### onEmailReceivedReplyResolver

▸ **onEmailReceivedReplyResolver**(`calculatedId`, `data`, `user`, `isSender`): `Promise`\<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `calculatedId` | `string` |
| `data` | [`IReceiveEmailData`](../interfaces/server_services_base_MailProvider.IReceiveEmailData.md) |
| `user` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `isSender` | `boolean` |

#### Returns

`Promise`\<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

#### Defined in

[server/services/base/MailProvider.ts:283](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L283)

___

### onExternalEmailBounced

▸ **onExternalEmailBounced**(`bounces`, `internalSender`, `data`): `Promise`\<`void`\>

An email was externally received but no proper receiver could be found for such users, the bounces
are very specific to the

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bounces` | `string`[] | - |
| `internalSender` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the user that sent the message (or null) if it couldn't find one |
| `data` | [`IReceiveEmailData`](../interfaces/server_services_base_MailProvider.IReceiveEmailData.md) | the external email itself |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/services/base/MailProvider.ts:1645](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L1645)

___

### onExternalEmailReceived

▸ **onExternalEmailReceived**(`data`): `Promise`\<`void`\>

This method should get called once an email has been received
the service provider that extended the raw mail provider should
be able to trigger this function when specified, this function will
handle the mail configuration then and perform unsubscription tasks

NOTE this method can only be called in an extended instance and not
in the global context because it uses the cache, do not receive your emails
in the global context

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`IReceiveEmailData`](../interfaces/server_services_base_MailProvider.IReceiveEmailData.md) | the email data received, make sure to fill this information properly |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/services/base/MailProvider.ts:1099](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L1099)

___

### onUsersReceivedExternalEmail

▸ **onUsersReceivedExternalEmail**(`users`, `internalSender`, `message`, `data`, `spam`): `Promise`\<`void`\>

An user received an email from an external source to their internal email, eg. from dude@gmail.com to girl@mysite.com
by default this function will send an email notification based on the subscribe e_notifications property
unless marked as spam

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `users` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] | - |
| `internalSender` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the user that sent the message (or null) if it couldn't find one |
| `message` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | - |
| `data` | [`IReceiveEmailData`](../interfaces/server_services_base_MailProvider.IReceiveEmailData.md) | the external email itself |
| `spam` | `boolean` | whether it was marked as spam, note that data.spam is whether it was marked by spam by the provider whereas this spam variable is affected by that as well as by allowUserToReceiveExternalEmail |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/services/base/MailProvider.ts:1660](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L1660)

___

### onUsersReceivedInternalEmail

▸ **onUsersReceivedInternalEmail**(`users`, `sender`, `message`, `proxyObject`, `spam`): `Promise`\<`void`\>

An user received an email from one user to another user in the same domain, this is an internal
message, in this case email addresses may not be explicit
by default the message is assumed to have the right shape for the storage idef definition and will
be used to render a message clone and send it to the targets real email

#### Parameters

| Name | Type |
| :------ | :------ |
| `users` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] |
| `sender` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `message` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `proxyObject` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `spam` | `boolean` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/services/base/MailProvider.ts:2070](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2070)

___

### parseRFC2822

▸ **parseRFC2822**(`header`): `IRFC2822Data`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `header` | `string` \| `string`[] |

#### Returns

`IRFC2822Data`[]

#### Defined in

[server/services/base/MailProvider.ts:395](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L395)

___

### renderMessageForMail

▸ **renderMessageForMail**(`message`, `lang?`, `internalForwardOptions?`): `Promise`\<[`IEmailRenderedMessage`](../interfaces/server_services_base_MailProvider.IEmailRenderedMessage.md)\>

Given a message from the database it will provide the resulting
html with all links resolved to be sent by email as well as the attachment
list to be appended

it will also resolve forwarded messages based on a reply unless internal forward options
are specified that will deny such event

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `lang?` | `string` |
| `internalForwardOptions?` | `Object` |
| `internalForwardOptions.from` | `string` |
| `internalForwardOptions.fromProxy?` | `string` |
| `internalForwardOptions.lang?` | `string` |
| `internalForwardOptions.subjectReplace` | `string` |

#### Returns

`Promise`\<[`IEmailRenderedMessage`](../interfaces/server_services_base_MailProvider.IEmailRenderedMessage.md)\>

#### Defined in

[server/services/base/MailProvider.ts:1865](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L1865)

___

### renderMessageFormatForward

▸ **renderMessageFormatForward**(`parentMessage`, `lang`, `size`): `Promise`\<[`IEmailRenderedMessage`](../interfaces/server_services_base_MailProvider.IEmailRenderedMessage.md)\>

when the renderMessageForMail is running this function gets called with the given message
the size that is currently working at, and the replyId aka a parent for this element that is the reply
so that it can produce forward html inside the html of the email, by default it will call the format forward function
which can be modified for a different format

 for a different effect, for example, return nothing {attachments: null, cidMap: null, html: "", predictedSize: 0}
so that forwarding doesn't cause any modification, override formatForward if what you want to do is to change the format

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentMessage` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `lang` | `string` |
| `size` | `number` |

#### Returns

`Promise`\<[`IEmailRenderedMessage`](../interfaces/server_services_base_MailProvider.IEmailRenderedMessage.md)\>

a modified message

#### Defined in

[server/services/base/MailProvider.ts:1803](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L1803)

___

### renderMessageFromMail

▸ **renderMessageFromMail**(`html`, `contentIdMap`, `attachments`): `Object`

Given the external email this will convert it into the expected sql row value to be created

#### Parameters

| Name | Type |
| :------ | :------ |
| `html` | `string` |
| `contentIdMap` | `Object` |
| `attachments` | [`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `attachments` | [`IPropertyDefinitionSupportedSingleFilesType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)[] |
| `cidAttachments` | [`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype) |
| `html` | `string` |

#### Defined in

[server/services/base/MailProvider.ts:1749](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L1749)

___

### resolveTarget

▸ **resolveTarget**(`str`): `Promise`\<\{ `email`: `string` ; `idef`: [`default`](base_Root_Module_ItemDefinition.default.md) ; `isUser`: `boolean` ; `name`: `string` ; `value`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`Promise`\<\{ `email`: `string` ; `idef`: [`default`](base_Root_Module_ItemDefinition.default.md) ; `isUser`: `boolean` ; `name`: `string` ; `value`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)  }\>

#### Defined in

[server/services/base/MailProvider.ts:2230](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2230)

___

### resolveUsersForEmailToItem

▸ **resolveUsersForEmailToItem**(`user`, `target`, `targetType`): `Promise`\<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

to resolve messages aimed to object types

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |  |
| `target` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |  |
| `targetType` | [`default`](base_Root_Module_ItemDefinition.default.md) | The returned users should contain the properties id username real_name or actual_name if available container_id app_country email e_notifications if available e_validated if available |

#### Returns

`Promise`\<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/services/base/MailProvider.ts:1634](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L1634)

___

### run

▸ **run**(): `void` \| `Promise`\<`void`\>

Executes some code

#### Returns

`void` \| `Promise`\<`void`\>

#### Inherited from

[ServiceProvider](server_services.ServiceProvider.md).[run](server_services.ServiceProvider.md#run)

#### Defined in

[server/services/index.ts:247](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L247)

___

### sendEmail

▸ **sendEmail**(`data`): `Promise`\<`void`\>

This function is executed when the service
needs to send an email

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | [`ISendEmailData`](../interfaces/server_services_base_MailProvider.ISendEmailData.md) |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/services/base/MailProvider.ts:2949](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L2949)

___

### sendTemplateEmail

▸ **sendTemplateEmail**(`arg`): `Promise`\<`void`\>

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
| `arg.to` | `string` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) \| [`IRQValue`](../interfaces/rq_querier.IRQValue.md) \| (`string` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) \| [`IRQValue`](../interfaces/rq_querier.IRQValue.md))[] | this is a special list of values to send to the users that we want to send to, they can be specified as the list of ids, aka user identifiers of the given users, but rq values or sql values are allowed as well and they improve speed up, remember to pass whole results with all the properties you are using or otherwise it might misbehave |
| `arg.version?` | `string` | an optional version value to use, this version is expected to be a locale version, as such unversioned values will be used as fallback if the version is not found |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/services/base/MailProvider.ts:825](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L825)

___

### sendUnverifiedTemplateEmail

▸ **sendUnverifiedTemplateEmail**(`arg`): `Promise`\<`void`\>

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

`Promise`\<`void`\>

#### Defined in

[server/services/base/MailProvider.ts:560](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L560)

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

[server/services/index.ts:76](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L76)

___

### setMessageStorageItemDefinition

▸ **setMessageStorageItemDefinition**(`idef`): `void`

Sets the item definition that is in charge of the storage of the
messages
the creator will be the target of the message who holds the current username
for the given email

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idef` | [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition to use for storage |

#### Returns

`void`

#### Defined in

[server/services/base/MailProvider.ts:424](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L424)

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

[ServiceProvider](server_services.ServiceProvider.md).[setupGlobalResources](server_services.ServiceProvider.md#setupglobalresources)

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

[ServiceProvider](server_services.ServiceProvider.md).[setupLocalResources](server_services.ServiceProvider.md#setuplocalresources)

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

[ServiceProvider](server_services.ServiceProvider.md).[expressRouter](server_services.ServiceProvider.md#expressrouter-1)

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

[ServiceProvider](server_services.ServiceProvider.md).[getRouter](server_services.ServiceProvider.md#getrouter-1)

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

[ServiceProvider](server_services.ServiceProvider.md).[getTriggerRegistry](server_services.ServiceProvider.md#gettriggerregistry-1)

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

[ServiceProvider](server_services.ServiceProvider.md).[getType](server_services.ServiceProvider.md#gettype)

#### Defined in

[server/services/base/MailProvider.ts:258](https://github.com/onzag/itemize/blob/73e0c39e/server/services/base/MailProvider.ts#L258)

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

[ServiceProvider](server_services.ServiceProvider.md).[logDebug](server_services.ServiceProvider.md#logdebug-1)

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

[ServiceProvider](server_services.ServiceProvider.md).[logError](server_services.ServiceProvider.md#logerror-1)

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

[ServiceProvider](server_services.ServiceProvider.md).[logInfo](server_services.ServiceProvider.md#loginfo-1)

#### Defined in

[server/services/index.ts:104](https://github.com/onzag/itemize/blob/73e0c39e/server/services/index.ts#L104)
