[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/services/fake-mail](../modules/server_services_fake_mail.md) / FakeMailService

# Class: FakeMailService

[server/services/fake-mail](../modules/server_services_fake_mail.md).FakeMailService

## Hierarchy

- [`default`](server_services_base_MailProvider.default.md)<``null``\>

  ↳ **`FakeMailService`**

## Table of contents

### Constructors

- [constructor](server_services_fake_mail.FakeMailService.md#constructor)

### Properties

- [appConfig](server_services_fake_mail.FakeMailService.md#appconfig)
- [appDbConfig](server_services_fake_mail.FakeMailService.md#appdbconfig)
- [appRedisConfig](server_services_fake_mail.FakeMailService.md#appredisconfig)
- [appSensitiveConfig](server_services_fake_mail.FakeMailService.md#appsensitiveconfig)
- [config](server_services_fake_mail.FakeMailService.md#config)
- [globalCustomServices](server_services_fake_mail.FakeMailService.md#globalcustomservices)
- [globalDatabaseConnection](server_services_fake_mail.FakeMailService.md#globaldatabaseconnection)
- [globalInstance](server_services_fake_mail.FakeMailService.md#globalinstance)
- [globalMailProvider](server_services_fake_mail.FakeMailService.md#globalmailprovider)
- [globalPhoneProvider](server_services_fake_mail.FakeMailService.md#globalphoneprovider)
- [globalRawDB](server_services_fake_mail.FakeMailService.md#globalrawdb)
- [globalRedis](server_services_fake_mail.FakeMailService.md#globalredis)
- [globalRedisPub](server_services_fake_mail.FakeMailService.md#globalredispub)
- [globalRedisSub](server_services_fake_mail.FakeMailService.md#globalredissub)
- [globalRoot](server_services_fake_mail.FakeMailService.md#globalroot)
- [instanceName](server_services_fake_mail.FakeMailService.md#instancename)
- [localAppData](server_services_fake_mail.FakeMailService.md#localappdata)
- [localInstance](server_services_fake_mail.FakeMailService.md#localinstance)
- [registry](server_services_fake_mail.FakeMailService.md#registry)

### Methods

- [allowUserToReceiveExternalEmail](server_services_fake_mail.FakeMailService.md#allowusertoreceiveexternalemail)
- [allowUserToSendEmail](server_services_fake_mail.FakeMailService.md#allowusertosendemail)
- [allowUserToSendEmailToItem](server_services_fake_mail.FakeMailService.md#allowusertosendemailtoitem)
- [allowUserToSendEmailToItemType](server_services_fake_mail.FakeMailService.md#allowusertosendemailtoitemtype)
- [createFileFromLocalFile](server_services_fake_mail.FakeMailService.md#createfilefromlocalfile)
- [createFileFromReadStream](server_services_fake_mail.FakeMailService.md#createfilefromreadstream)
- [createFileFromURL](server_services_fake_mail.FakeMailService.md#createfilefromurl)
- [escapeUserName](server_services_fake_mail.FakeMailService.md#escapeusername)
- [execute](server_services_fake_mail.FakeMailService.md#execute)
- [expressRouter](server_services_fake_mail.FakeMailService.md#expressrouter)
- [formatForward](server_services_fake_mail.FakeMailService.md#formatforward)
- [getBreakHeader](server_services_fake_mail.FakeMailService.md#getbreakheader)
- [getExtraArgs](server_services_fake_mail.FakeMailService.md#getextraargs)
- [getForwardDateIndicator](server_services_fake_mail.FakeMailService.md#getforwarddateindicator)
- [getForwardDeletedIndicator](server_services_fake_mail.FakeMailService.md#getforwarddeletedindicator)
- [getForwardFromIndicator](server_services_fake_mail.FakeMailService.md#getforwardfromindicator)
- [getForwardMessageHeader](server_services_fake_mail.FakeMailService.md#getforwardmessageheader)
- [getForwardProxyIndicator](server_services_fake_mail.FakeMailService.md#getforwardproxyindicator)
- [getForwardSubjectIndicator](server_services_fake_mail.FakeMailService.md#getforwardsubjectindicator)
- [getForwardSubjectReplace](server_services_fake_mail.FakeMailService.md#getforwardsubjectreplace)
- [getForwardToIndicator](server_services_fake_mail.FakeMailService.md#getforwardtoindicator)
- [getForwardViewAtIndicator](server_services_fake_mail.FakeMailService.md#getforwardviewatindicator)
- [getForwardViewAtURL](server_services_fake_mail.FakeMailService.md#getforwardviewaturl)
- [getInstanceName](server_services_fake_mail.FakeMailService.md#getinstancename)
- [getLangHeader](server_services_fake_mail.FakeMailService.md#getlangheader)
- [getNoReplySubjectPrefix](server_services_fake_mail.FakeMailService.md#getnoreplysubjectprefix)
- [getNotificationsUsername](server_services_fake_mail.FakeMailService.md#getnotificationsusername)
- [getObjectName](server_services_fake_mail.FakeMailService.md#getobjectname)
- [getRouter](server_services_fake_mail.FakeMailService.md#getrouter)
- [getRunCycleTime](server_services_fake_mail.FakeMailService.md#getruncycletime)
- [getSizeLimit](server_services_fake_mail.FakeMailService.md#getsizelimit)
- [getTriggerRegistry](server_services_fake_mail.FakeMailService.md#gettriggerregistry)
- [getUserName](server_services_fake_mail.FakeMailService.md#getusername)
- [initialize](server_services_fake_mail.FakeMailService.md#initialize)
- [isInstanceGlobal](server_services_fake_mail.FakeMailService.md#isinstanceglobal)
- [isInstanceLocal](server_services_fake_mail.FakeMailService.md#isinstancelocal)
- [logDebug](server_services_fake_mail.FakeMailService.md#logdebug)
- [logError](server_services_fake_mail.FakeMailService.md#logerror)
- [logInfo](server_services_fake_mail.FakeMailService.md#loginfo)
- [onEmailReceivedReplyResolver](server_services_fake_mail.FakeMailService.md#onemailreceivedreplyresolver)
- [onExternalEmailBounced](server_services_fake_mail.FakeMailService.md#onexternalemailbounced)
- [onExternalEmailReceived](server_services_fake_mail.FakeMailService.md#onexternalemailreceived)
- [onUsersReceivedExternalEmail](server_services_fake_mail.FakeMailService.md#onusersreceivedexternalemail)
- [onUsersReceivedInternalEmail](server_services_fake_mail.FakeMailService.md#onusersreceivedinternalemail)
- [parseRFC2822](server_services_fake_mail.FakeMailService.md#parserfc2822)
- [renderMessageForMail](server_services_fake_mail.FakeMailService.md#rendermessageformail)
- [renderMessageFormatForward](server_services_fake_mail.FakeMailService.md#rendermessageformatforward)
- [renderMessageFromMail](server_services_fake_mail.FakeMailService.md#rendermessagefrommail)
- [resolveUsersForEmailToItem](server_services_fake_mail.FakeMailService.md#resolveusersforemailtoitem)
- [run](server_services_fake_mail.FakeMailService.md#run)
- [sendEmail](server_services_fake_mail.FakeMailService.md#sendemail)
- [sendTemplateEmail](server_services_fake_mail.FakeMailService.md#sendtemplateemail)
- [sendUnverifiedTemplateEmail](server_services_fake_mail.FakeMailService.md#sendunverifiedtemplateemail)
- [setInstanceName](server_services_fake_mail.FakeMailService.md#setinstancename)
- [setMessageStorageItemDefinition](server_services_fake_mail.FakeMailService.md#setmessagestorageitemdefinition)
- [setupGlobalResources](server_services_fake_mail.FakeMailService.md#setupglobalresources)
- [setupLocalResources](server_services_fake_mail.FakeMailService.md#setuplocalresources)
- [expressRouter](server_services_fake_mail.FakeMailService.md#expressrouter)
- [getRouter](server_services_fake_mail.FakeMailService.md#getrouter)
- [getTriggerRegistry](server_services_fake_mail.FakeMailService.md#gettriggerregistry)
- [getType](server_services_fake_mail.FakeMailService.md#gettype)
- [logDebug](server_services_fake_mail.FakeMailService.md#logdebug)
- [logError](server_services_fake_mail.FakeMailService.md#logerror)
- [logInfo](server_services_fake_mail.FakeMailService.md#loginfo)

## Constructors

### constructor

• **new FakeMailService**(`c`, `registry`, `configs`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | ``null`` |
| `registry` | [`RegistryService`](server_services_registry.RegistryService.md) |
| `configs` | `any` |

#### Inherited from

[default](server_services_base_MailProvider.default.md).[constructor](server_services_base_MailProvider.default.md#constructor)

#### Defined in

[server/services/base/MailProvider.ts:256](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L256)

## Properties

### appConfig

• **appConfig**: [`IConfigRawJSONDataType`](../interfaces/config.IConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[appConfig](server_services_base_MailProvider.default.md#appconfig)

#### Defined in

[server/services/index.ts:35](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L35)

___

### appDbConfig

• **appDbConfig**: [`IDBConfigRawJSONDataType`](../interfaces/config.IDBConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[appDbConfig](server_services_base_MailProvider.default.md#appdbconfig)

#### Defined in

[server/services/index.ts:37](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L37)

___

### appRedisConfig

• **appRedisConfig**: [`IRedisConfigRawJSONDataType`](../interfaces/config.IRedisConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[appRedisConfig](server_services_base_MailProvider.default.md#appredisconfig)

#### Defined in

[server/services/index.ts:38](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L38)

___

### appSensitiveConfig

• **appSensitiveConfig**: [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[appSensitiveConfig](server_services_base_MailProvider.default.md#appsensitiveconfig)

#### Defined in

[server/services/index.ts:36](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L36)

___

### config

• **config**: ``null``

#### Inherited from

[default](server_services_base_MailProvider.default.md).[config](server_services_base_MailProvider.default.md#config)

#### Defined in

[server/services/index.ts:33](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L33)

___

### globalCustomServices

• **globalCustomServices**: `Object`

#### Index signature

▪ [name: `string`]: [`ServiceProvider`](server_services.ServiceProvider.md)<`any`\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalCustomServices](server_services_base_MailProvider.default.md#globalcustomservices)

#### Defined in

[server/services/index.ts:48](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L48)

___

### globalDatabaseConnection

• **globalDatabaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalDatabaseConnection](server_services_base_MailProvider.default.md#globaldatabaseconnection)

#### Defined in

[server/services/index.ts:40](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L40)

___

### globalInstance

• **globalInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalInstance](server_services_base_MailProvider.default.md#globalinstance)

#### Defined in

[server/services/index.ts:55](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L55)

___

### globalMailProvider

• **globalMailProvider**: [`default`](server_services_base_MailProvider.default.md)<`any`\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalMailProvider](server_services_base_MailProvider.default.md#globalmailprovider)

#### Defined in

[server/services/index.ts:46](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L46)

___

### globalPhoneProvider

• **globalPhoneProvider**: [`default`](server_services_base_PhoneProvider.default.md)<`any`\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalPhoneProvider](server_services_base_MailProvider.default.md#globalphoneprovider)

#### Defined in

[server/services/index.ts:47](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L47)

___

### globalRawDB

• **globalRawDB**: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalRawDB](server_services_base_MailProvider.default.md#globalrawdb)

#### Defined in

[server/services/index.ts:44](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L44)

___

### globalRedis

• **globalRedis**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalRedis](server_services_base_MailProvider.default.md#globalredis)

#### Defined in

[server/services/index.ts:43](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L43)

___

### globalRedisPub

• **globalRedisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalRedisPub](server_services_base_MailProvider.default.md#globalredispub)

#### Defined in

[server/services/index.ts:41](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L41)

___

### globalRedisSub

• **globalRedisSub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalRedisSub](server_services_base_MailProvider.default.md#globalredissub)

#### Defined in

[server/services/index.ts:42](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L42)

___

### globalRoot

• **globalRoot**: [`default`](base_Root.default.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[globalRoot](server_services_base_MailProvider.default.md#globalroot)

#### Defined in

[server/services/index.ts:45](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L45)

___

### instanceName

• **instanceName**: `string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[instanceName](server_services_base_MailProvider.default.md#instancename)

#### Defined in

[server/services/index.ts:54](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L54)

___

### localAppData

• **localAppData**: [`IAppDataType`](../interfaces/server.IAppDataType.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[localAppData](server_services_base_MailProvider.default.md#localappdata)

#### Defined in

[server/services/index.ts:52](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L52)

___

### localInstance

• **localInstance**: `boolean` = `false`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[localInstance](server_services_base_MailProvider.default.md#localinstance)

#### Defined in

[server/services/index.ts:56](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L56)

___

### registry

• **registry**: [`RegistryService`](server_services_registry.RegistryService.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[registry](server_services_base_MailProvider.default.md#registry)

#### Defined in

[server/services/index.ts:34](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L34)

## Methods

### allowUserToReceiveExternalEmail

▸ **allowUserToReceiveExternalEmail**(`user`, `internalSender`, `data`): `Promise`<``"SPAM"`` \| ``"REJECT"`` \| ``"ACCEPT"``\>

**`override`** use to filter spam and unwanted emails

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the user that is receiving the email |
| `internalSender` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | - |
| `data` | [`IReceiveEmailData`](../interfaces/server_services_base_MailProvider.IReceiveEmailData.md) | the data that is being received |

#### Returns

`Promise`<``"SPAM"`` \| ``"REJECT"`` \| ``"ACCEPT"``\>

SPAM for when to mark it as spam, REJECT for rejecting the message entirely, ACCEPT for accepting it

#### Inherited from

[default](server_services_base_MailProvider.default.md).[allowUserToReceiveExternalEmail](server_services_base_MailProvider.default.md#allowusertoreceiveexternalemail)

#### Defined in

[server/services/base/MailProvider.ts:1543](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L1543)

___

### allowUserToSendEmail

▸ **allowUserToSendEmail**(`user`, `target`): `Promise`<``"SPAM"`` \| ``"REJECT"`` \| ``"ACCEPT"``\>

**`override`** to filter spam and unwanted emails
triggers when an user is trying to send an email to another, when the target is a sql value
it means that its using internal solving, as in two users that are in the same system, if the value
is a plain string, it means it's trying to solve

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `target` | `string` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

`Promise`<``"SPAM"`` \| ``"REJECT"`` \| ``"ACCEPT"``\>

SPAM only works for internal usage and the message will be marked as spam for the recepient
REJECT will not send the message on its entirety, and ACCEPT will send the message

#### Inherited from

[default](server_services_base_MailProvider.default.md).[allowUserToSendEmail](server_services_base_MailProvider.default.md#allowusertosendemail)

#### Defined in

[server/services/base/MailProvider.ts:1555](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L1555)

___

### allowUserToSendEmailToItem

▸ **allowUserToSendEmailToItem**(`user`, `target`, `targetType`): `Promise`<``"SPAM"`` \| ``"REJECT"`` \| ``"ACCEPT"``\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `target` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `targetType` | [`default`](base_Root_Module_ItemDefinition.default.md) |

#### Returns

`Promise`<``"SPAM"`` \| ``"REJECT"`` \| ``"ACCEPT"``\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[allowUserToSendEmailToItem](server_services_base_MailProvider.default.md#allowusertosendemailtoitem)

#### Defined in

[server/services/base/MailProvider.ts:1563](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L1563)

___

### allowUserToSendEmailToItemType

▸ **allowUserToSendEmailToItemType**(`user`, `target`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `target` | [`default`](base_Root_Module_ItemDefinition.default.md) |

#### Returns

`Promise`<`boolean`\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[allowUserToSendEmailToItemType](server_services_base_MailProvider.default.md#allowusertosendemailtoitemtype)

#### Defined in

[server/services/base/MailProvider.ts:1559](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L1559)

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

#### Inherited from

[default](server_services_base_MailProvider.default.md).[createFileFromLocalFile](server_services_base_MailProvider.default.md#createfilefromlocalfile)

#### Defined in

[server/services/base/MailProvider.ts:327](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L327)

___

### createFileFromReadStream

▸ **createFileFromReadStream**(`id`, `stream`, `name`, `size`, `type`, `extraArgs?`): `Promise`<[`IPropertyDefinitionSupportedSingleFilesType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)\>

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

`Promise`<[`IPropertyDefinitionSupportedSingleFilesType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.IPropertyDefinitionSupportedSingleFilesType.md)\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[createFileFromReadStream](server_services_base_MailProvider.default.md#createfilefromreadstream)

#### Defined in

[server/services/base/MailProvider.ts:350](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L350)

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

#### Inherited from

[default](server_services_base_MailProvider.default.md).[createFileFromURL](server_services_base_MailProvider.default.md#createfilefromurl)

#### Defined in

[server/services/base/MailProvider.ts:287](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L287)

___

### escapeUserName

▸ **escapeUserName**(`name`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[escapeUserName](server_services_base_MailProvider.default.md#escapeusername)

#### Defined in

[server/services/base/MailProvider.ts:527](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L527)

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

[server/services/index.ts:170](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L170)

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

[server/services/index.ts:116](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L116)

___

### formatForward

▸ **formatForward**(`html`, `lang`, `message`, `isBreak`): `Promise`<`string`\>

This formats a forwarded message for when it's sent to an external target

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `html` | `string` | the html of the forwarded message itself |
| `lang` | `string` | - |
| `message` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the message object itself |
| `isBreak` | `boolean` | whether this message actually can't fit due to size limitations (do not try to render much the thread is broken) |

#### Returns

`Promise`<`string`\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[formatForward](server_services_base_MailProvider.default.md#formatforward)

#### Defined in

[server/services/base/MailProvider.ts:2728](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2728)

___

### getBreakHeader

▸ **getBreakHeader**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getBreakHeader](server_services_base_MailProvider.default.md#getbreakheader)

#### Defined in

[server/services/base/MailProvider.ts:2853](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2853)

___

### getExtraArgs

▸ **getExtraArgs**(): `any`

#### Returns

`any`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getExtraArgs](server_services_base_MailProvider.default.md#getextraargs)

#### Defined in

[server/services/base/MailProvider.ts:510](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L510)

___

### getForwardDateIndicator

▸ **getForwardDateIndicator**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getForwardDateIndicator](server_services_base_MailProvider.default.md#getforwarddateindicator)

#### Defined in

[server/services/base/MailProvider.ts:2841](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2841)

___

### getForwardDeletedIndicator

▸ **getForwardDeletedIndicator**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getForwardDeletedIndicator](server_services_base_MailProvider.default.md#getforwarddeletedindicator)

#### Defined in

[server/services/base/MailProvider.ts:2825](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2825)

___

### getForwardFromIndicator

▸ **getForwardFromIndicator**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getForwardFromIndicator](server_services_base_MailProvider.default.md#getforwardfromindicator)

#### Defined in

[server/services/base/MailProvider.ts:2829](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2829)

___

### getForwardMessageHeader

▸ **getForwardMessageHeader**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getForwardMessageHeader](server_services_base_MailProvider.default.md#getforwardmessageheader)

#### Defined in

[server/services/base/MailProvider.ts:2849](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2849)

___

### getForwardProxyIndicator

▸ **getForwardProxyIndicator**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getForwardProxyIndicator](server_services_base_MailProvider.default.md#getforwardproxyindicator)

#### Defined in

[server/services/base/MailProvider.ts:2833](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2833)

___

### getForwardSubjectIndicator

▸ **getForwardSubjectIndicator**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getForwardSubjectIndicator](server_services_base_MailProvider.default.md#getforwardsubjectindicator)

#### Defined in

[server/services/base/MailProvider.ts:2845](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2845)

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

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getForwardSubjectReplace](server_services_base_MailProvider.default.md#getforwardsubjectreplace)

#### Defined in

[server/services/base/MailProvider.ts:2808](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2808)

___

### getForwardToIndicator

▸ **getForwardToIndicator**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getForwardToIndicator](server_services_base_MailProvider.default.md#getforwardtoindicator)

#### Defined in

[server/services/base/MailProvider.ts:2837](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2837)

___

### getForwardViewAtIndicator

▸ **getForwardViewAtIndicator**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getForwardViewAtIndicator](server_services_base_MailProvider.default.md#getforwardviewatindicator)

#### Defined in

[server/services/base/MailProvider.ts:2821](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2821)

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

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getForwardViewAtURL](server_services_base_MailProvider.default.md#getforwardviewaturl)

#### Defined in

[server/services/base/MailProvider.ts:2816](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2816)

___

### getInstanceName

▸ **getInstanceName**(): `string`

#### Returns

`string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getInstanceName](server_services_base_MailProvider.default.md#getinstancename)

#### Defined in

[server/services/index.ts:80](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L80)

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

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getLangHeader](server_services_base_MailProvider.default.md#getlangheader)

#### Defined in

[server/services/base/MailProvider.ts:2862](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2862)

___

### getNoReplySubjectPrefix

▸ **getNoReplySubjectPrefix**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getNoReplySubjectPrefix](server_services_base_MailProvider.default.md#getnoreplysubjectprefix)

#### Defined in

[server/services/base/MailProvider.ts:2804](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2804)

___

### getNotificationsUsername

▸ **getNotificationsUsername**(`lang`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `lang` | `string` |

#### Returns

`string`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getNotificationsUsername](server_services_base_MailProvider.default.md#getnotificationsusername)

#### Defined in

[server/services/base/MailProvider.ts:2812](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2812)

___

### getObjectName

▸ **getObjectName**(`object`): `any`

Provides the name of an object for the user

**`override`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

`any`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getObjectName](server_services_base_MailProvider.default.md#getobjectname)

#### Defined in

[server/services/base/MailProvider.ts:2160](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2160)

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

[server/services/fake-mail.ts:29](https://github.com/onzag/itemize/blob/a24376ed/server/services/fake-mail.ts#L29)

___

### getRunCycleTime

▸ **getRunCycleTime**(): `number`

Determines whether the run function
should run over again

**`override`**

#### Returns

`number`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getRunCycleTime](server_services_base_MailProvider.default.md#getruncycletime)

#### Defined in

[server/services/index.ts:239](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L239)

___

### getSizeLimit

▸ **getSizeLimit**(): `number`

The maximum message size in bytes that you are capable of sending

**`override`**

#### Returns

`number`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getSizeLimit](server_services_base_MailProvider.default.md#getsizelimit)

#### Defined in

[server/services/base/MailProvider.ts:2874](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2874)

___

### getTriggerRegistry

▸ **getTriggerRegistry**(): [`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)

Allows to setup trigger registries via the service
so that they trigger just as normal trigger will do

#### Returns

[`ITriggerRegistry`](../interfaces/server_resolvers_triggers.ITriggerRegistry.md)

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getTriggerRegistry](server_services_base_MailProvider.default.md#gettriggerregistry)

#### Defined in

[server/services/base/MailProvider.ts:2227](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2227)

___

### getUserName

▸ **getUserName**(`user`): `any`

provides the user name for a given user

**`overide`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

`any`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[getUserName](server_services_base_MailProvider.default.md#getusername)

#### Defined in

[server/services/base/MailProvider.ts:2151](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2151)

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

[default](server_services_base_MailProvider.default.md).[initialize](server_services_base_MailProvider.default.md#initialize)

#### Defined in

[server/services/fake-mail.ts:10](https://github.com/onzag/itemize/blob/a24376ed/server/services/fake-mail.ts#L10)

___

### isInstanceGlobal

▸ **isInstanceGlobal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[isInstanceGlobal](server_services_base_MailProvider.default.md#isinstanceglobal)

#### Defined in

[server/services/index.ts:84](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L84)

___

### isInstanceLocal

▸ **isInstanceLocal**(): `boolean`

#### Returns

`boolean`

#### Inherited from

[default](server_services_base_MailProvider.default.md).[isInstanceLocal](server_services_base_MailProvider.default.md#isinstancelocal)

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

[default](server_services_base_MailProvider.default.md).[logDebug](server_services_base_MailProvider.default.md#logdebug)

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

[default](server_services_base_MailProvider.default.md).[logError](server_services_base_MailProvider.default.md#logerror)

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

[default](server_services_base_MailProvider.default.md).[logInfo](server_services_base_MailProvider.default.md#loginfo)

#### Defined in

[server/services/index.ts:92](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L92)

___

### onEmailReceivedReplyResolver

▸ **onEmailReceivedReplyResolver**(`calculatedId`, `data`, `user`, `isSender`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `calculatedId` | `string` |
| `data` | [`IReceiveEmailData`](../interfaces/server_services_base_MailProvider.IReceiveEmailData.md) |
| `user` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `isSender` | `boolean` |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[onEmailReceivedReplyResolver](server_services_base_MailProvider.default.md#onemailreceivedreplyresolver)

#### Defined in

[server/services/base/MailProvider.ts:277](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L277)

___

### onExternalEmailBounced

▸ **onExternalEmailBounced**(`bounces`, `internalSender`, `data`): `Promise`<`void`\>

**`override`**
An email was externally received but no proper receiver could be found for such users, the bounces
are very specific to the

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bounces` | `string`[] | - |
| `internalSender` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the user that sent the message (or null) if it couldn't find one |
| `data` | [`IReceiveEmailData`](../interfaces/server_services_base_MailProvider.IReceiveEmailData.md) | the external email itself |

#### Returns

`Promise`<`void`\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[onExternalEmailBounced](server_services_base_MailProvider.default.md#onexternalemailbounced)

#### Defined in

[server/services/base/MailProvider.ts:1584](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L1584)

___

### onExternalEmailReceived

▸ **onExternalEmailReceived**(`data`): `Promise`<`void`\>

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

`Promise`<`void`\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[onExternalEmailReceived](server_services_base_MailProvider.default.md#onexternalemailreceived)

#### Defined in

[server/services/base/MailProvider.ts:1085](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L1085)

___

### onUsersReceivedExternalEmail

▸ **onUsersReceivedExternalEmail**(`users`, `internalSender`, `message`, `data`, `spam`): `Promise`<`void`\>

**`override`**
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

`Promise`<`void`\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[onUsersReceivedExternalEmail](server_services_base_MailProvider.default.md#onusersreceivedexternalemail)

#### Defined in

[server/services/base/MailProvider.ts:1599](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L1599)

___

### onUsersReceivedInternalEmail

▸ **onUsersReceivedInternalEmail**(`users`, `sender`, `message`, `proxyObject`, `spam`): `Promise`<`void`\>

**`override`**
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

`Promise`<`void`\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[onUsersReceivedInternalEmail](server_services_base_MailProvider.default.md#onusersreceivedinternalemail)

#### Defined in

[server/services/base/MailProvider.ts:2004](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L2004)

___

### parseRFC2822

▸ **parseRFC2822**(`header`): `IRFC2822Data`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `header` | `string` \| `string`[] |

#### Returns

`IRFC2822Data`[]

#### Inherited from

[default](server_services_base_MailProvider.default.md).[parseRFC2822](server_services_base_MailProvider.default.md#parserfc2822)

#### Defined in

[server/services/base/MailProvider.ts:389](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L389)

___

### renderMessageForMail

▸ **renderMessageForMail**(`message`, `lang?`, `internalForwardOptions?`): `Promise`<[`IEmailRenderedMessage`](../interfaces/server_services_base_MailProvider.IEmailRenderedMessage.md)\>

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

`Promise`<[`IEmailRenderedMessage`](../interfaces/server_services_base_MailProvider.IEmailRenderedMessage.md)\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[renderMessageForMail](server_services_base_MailProvider.default.md#rendermessageformail)

#### Defined in

[server/services/base/MailProvider.ts:1805](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L1805)

___

### renderMessageFormatForward

▸ **renderMessageFormatForward**(`parentMessage`, `lang`, `size`): `Promise`<[`IEmailRenderedMessage`](../interfaces/server_services_base_MailProvider.IEmailRenderedMessage.md)\>

when the renderMessageForMail is running this function gets called with the given message
the size that is currently working at, and the replyId aka a parent for this element that is the reply
so that it can produce forward html inside the html of the email, by default it will call the format forward function
which can be modified for a different format

**`override`** for a different effect, for example, return nothing {attachments: null, cidMap: null, html: "", predictedSize: 0}
so that forwarding doesn't cause any modification, override formatForward if what you want to do is to change the format

#### Parameters

| Name | Type |
| :------ | :------ |
| `parentMessage` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `lang` | `string` |
| `size` | `number` |

#### Returns

`Promise`<[`IEmailRenderedMessage`](../interfaces/server_services_base_MailProvider.IEmailRenderedMessage.md)\>

a modified message

#### Inherited from

[default](server_services_base_MailProvider.default.md).[renderMessageFormatForward](server_services_base_MailProvider.default.md#rendermessageformatforward)

#### Defined in

[server/services/base/MailProvider.ts:1743](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L1743)

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

#### Inherited from

[default](server_services_base_MailProvider.default.md).[renderMessageFromMail](server_services_base_MailProvider.default.md#rendermessagefrommail)

#### Defined in

[server/services/base/MailProvider.ts:1688](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L1688)

___

### resolveUsersForEmailToItem

▸ **resolveUsersForEmailToItem**(`user`, `target`, `targetType`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

**`override`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `target` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `targetType` | [`default`](base_Root_Module_ItemDefinition.default.md) |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[resolveUsersForEmailToItem](server_services_base_MailProvider.default.md#resolveusersforemailtoitem)

#### Defined in

[server/services/base/MailProvider.ts:1573](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L1573)

___

### run

▸ **run**(): `void` \| `Promise`<`void`\>

Executes some code

**`override`**

#### Returns

`void` \| `Promise`<`void`\>

#### Inherited from

[default](server_services_base_MailProvider.default.md).[run](server_services_base_MailProvider.default.md#run)

#### Defined in

[server/services/index.ts:247](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L247)

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

[server/services/fake-mail.ts:19](https://github.com/onzag/itemize/blob/a24376ed/server/services/fake-mail.ts#L19)

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

[server/services/base/MailProvider.ts:811](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L811)

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

[server/services/base/MailProvider.ts:549](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L549)

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

[server/services/index.ts:76](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L76)

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

#### Inherited from

[default](server_services_base_MailProvider.default.md).[setMessageStorageItemDefinition](server_services_base_MailProvider.default.md#setmessagestorageitemdefinition)

#### Defined in

[server/services/base/MailProvider.ts:418](https://github.com/onzag/itemize/blob/a24376ed/server/services/base/MailProvider.ts#L418)

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

[default](server_services_base_MailProvider.default.md).[setupGlobalResources](server_services_base_MailProvider.default.md#setupglobalresources)

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

[default](server_services_base_MailProvider.default.md).[setupLocalResources](server_services_base_MailProvider.default.md#setuplocalresources)

#### Defined in

[server/services/index.ts:148](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L148)

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

[default](server_services_base_MailProvider.default.md).[getRouter](server_services_base_MailProvider.default.md#getrouter)

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

[default](server_services_base_MailProvider.default.md).[getTriggerRegistry](server_services_base_MailProvider.default.md#gettriggerregistry)

#### Defined in

[server/services/index.ts:305](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L305)

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

[server/services/fake-mail.ts:7](https://github.com/onzag/itemize/blob/a24376ed/server/services/fake-mail.ts#L7)

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

[default](server_services_base_MailProvider.default.md).[logDebug](server_services_base_MailProvider.default.md#logdebug)

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

[default](server_services_base_MailProvider.default.md).[logError](server_services_base_MailProvider.default.md#logerror)

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

[default](server_services_base_MailProvider.default.md).[logInfo](server_services_base_MailProvider.default.md#loginfo)

#### Defined in

[server/services/index.ts:104](https://github.com/onzag/itemize/blob/a24376ed/server/services/index.ts#L104)
