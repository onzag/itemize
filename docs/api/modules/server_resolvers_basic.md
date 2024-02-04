[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/basic

# Module: server/resolvers/basic

## Table of contents

### Interfaces

- [IFilteredAndPreparedValueType](../interfaces/server_resolvers_basic.IFilteredAndPreparedValueType.md)
- [IServerSideTokenDataType](../interfaces/server_resolvers_basic.IServerSideTokenDataType.md)

### Functions

- [checkFullHighlights](server_resolvers_basic.md#checkfullhighlights)
- [checkLanguage](server_resolvers_basic.md#checklanguage)
- [checkLimit](server_resolvers_basic.md#checklimit)
- [checkLimiters](server_resolvers_basic.md#checklimiters)
- [checkListTypes](server_resolvers_basic.md#checklisttypes)
- [checkUserCanSearch](server_resolvers_basic.md#checkusercansearch)
- [checkUserExists](server_resolvers_basic.md#checkuserexists)
- [defaultTriggerForbiddenFunction](server_resolvers_basic.md#defaulttriggerforbiddenfunction)
- [defaultTriggerInvalidForbiddenFunction](server_resolvers_basic.md#defaulttriggerinvalidforbiddenfunction)
- [defaultTriggerSearchInvalidForbiddenFunction](server_resolvers_basic.md#defaulttriggersearchinvalidforbiddenfunction)
- [defaultTriggerWaitForPromiseFunction](server_resolvers_basic.md#defaulttriggerwaitforpromisefunction)
- [filterAndPrepareRQRecords](server_resolvers_basic.md#filterandpreparerqrecords)
- [filterAndPrepareRQValue](server_resolvers_basic.md#filterandpreparerqvalue)
- [filterAndPrepareRQValueSimple](server_resolvers_basic.md#filterandpreparerqvaluesimple)
- [getDictionary](server_resolvers_basic.md#getdictionary)
- [handleConflictError](server_resolvers_basic.md#handleconflicterror)
- [retrieveSince](server_resolvers_basic.md#retrievesince)
- [retrieveUntil](server_resolvers_basic.md#retrieveuntil)
- [runPolicyCheck](server_resolvers_basic.md#runpolicycheck)
- [serverSideCheckItemDefinitionAgainst](server_resolvers_basic.md#serversidecheckitemdefinitionagainst)
- [splitArgsInRQQuery](server_resolvers_basic.md#splitargsinrqquery)
- [validateContainerIdIsReal](server_resolvers_basic.md#validatecontaineridisreal)
- [validateCustomId](server_resolvers_basic.md#validatecustomid)
- [validateCustomVersion](server_resolvers_basic.md#validatecustomversion)
- [validateParentingRules](server_resolvers_basic.md#validateparentingrules)
- [validateTokenAndGetData](server_resolvers_basic.md#validatetokenandgetdata)
- [validateTokenIsntBlocked](server_resolvers_basic.md#validatetokenisntblocked)

## Functions

### checkFullHighlights

▸ **checkFullHighlights**(`value`): `void`

Checks that the value for full highlights is valid

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:829](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L829)

___

### checkLanguage

▸ **checkLanguage**(`appData`, `args`): `void`

Checks the language and region given the arguments passed
by the rq resolver

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | the app data that is currently in context |
| `args` | `any` | the args themselves being passed to the resolver |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:771](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L771)

___

### checkLimit

▸ **checkLimit**(`limit`, `idefOrMod`, `traditional`): `void`

Checks that the limit of search results is within the range that the item
defintion allows

#### Parameters

| Name | Type |
| :------ | :------ |
| `limit` | `number` |
| `idefOrMod` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) \| [`default`](../classes/base_Root_Module.default.md) |
| `traditional` | `boolean` |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:730](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L730)

___

### checkLimiters

▸ **checkLimiters**(`args`, `idefOrMod`, `rolesManager`, `tokenData`, `ownerToCheckAgainst`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) |
| `idefOrMod` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) \| [`default`](../classes/base_Root_Module.default.md) |
| `rolesManager` | [`ICustomRoleManager`](../interfaces/base_Root.ICustomRoleManager.md) |
| `tokenData` | [`IServerSideTokenDataType`](../interfaces/server_resolvers_basic.IServerSideTokenDataType.md) |
| `ownerToCheckAgainst` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/resolvers/basic.ts:472](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L472)

___

### checkListTypes

▸ **checkListTypes**(`records`, `mod`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `records` | [`IRQSearchRecord`](../interfaces/rq_querier.IRQSearchRecord.md)[] |
| `mod` | [`default`](../classes/base_Root_Module.default.md) |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:741](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L741)

___

### checkUserCanSearch

▸ **checkUserCanSearch**(`args`, `moduleOrIdef`, `tokenData`): `void`

Checks that a given user can perform the given search
as it was requested

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `any` | the args |
| `moduleOrIdef` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) \| [`default`](../classes/base_Root_Module.default.md) | a module or an item definition the search is held against |
| `tokenData` | [`IServerSideTokenDataType`](../interfaces/server_resolvers_basic.IServerSideTokenDataType.md) | the token data |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:798](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L798)

___

### checkUserExists

▸ **checkUserExists**(`cache`, `id`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cache` | [`Cache`](../classes/server_cache.Cache.md) |
| `id` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/resolvers/basic.ts:942](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L942)

___

### defaultTriggerForbiddenFunction

▸ **defaultTriggerForbiddenFunction**(`message`, `customCode?`, `data?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `customCode?` | `string` |
| `data?` | `any` |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:47](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L47)

___

### defaultTriggerInvalidForbiddenFunction

▸ **defaultTriggerInvalidForbiddenFunction**(`message`, `customCode?`, `data?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `customCode?` | `string` |
| `data?` | `any` |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:62](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L62)

___

### defaultTriggerSearchInvalidForbiddenFunction

▸ **defaultTriggerSearchInvalidForbiddenFunction**(`message`, `customCode?`, `data?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `customCode?` | `string` |
| `data?` | `any` |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:77](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L77)

___

### defaultTriggerWaitForPromiseFunction

▸ **defaultTriggerWaitForPromiseFunction**(): `void`

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:58](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L58)

___

### filterAndPrepareRQRecords

▸ **filterAndPrepareRQRecords**(`records`): `void`

Modifies the records in place
in order to ensure they match the shape

#### Parameters

| Name | Type |
| :------ | :------ |
| `records` | [`IRQSearchRecord`](../interfaces/rq_querier.IRQSearchRecord.md)[] |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:986](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L986)

___

### filterAndPrepareRQValue

▸ **filterAndPrepareRQValue**(`serverData`, `appData`, `value`, `requestedFields`, `role`, `userId`, `ownerUserId`, `rolesManager`, `parentModuleOrIdef`): `Promise`\<[`IFilteredAndPreparedValueType`](../interfaces/server_resolvers_basic.IFilteredAndPreparedValueType.md)\>

Filters and prepares a rq value for output to the rest endpoint
given the value that has given by the server, the requested fields
that are supposed to be outputted, the role of the current user
and the parent module or item definition this value belongs to,
the form comes with the DATA and the externalized fields

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | - |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `value` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the value gotten from the sql database |
| `requestedFields` | [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) | the requested fields, flattened |
| `role` | `string` | the role of the user requesting the data |
| `userId` | `string` | - |
| `ownerUserId` | `string` | - |
| `rolesManager` | [`CustomRoleManager`](../classes/server_resolvers_roles.CustomRoleManager.md) | - |
| `parentModuleOrIdef` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) \| [`default`](../classes/base_Root_Module.default.md) | the parent module or item definition the value belongs to |

#### Returns

`Promise`\<[`IFilteredAndPreparedValueType`](../interfaces/server_resolvers_basic.IFilteredAndPreparedValueType.md)\>

#### Defined in

[server/resolvers/basic.ts:1034](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L1034)

___

### filterAndPrepareRQValueSimple

▸ **filterAndPrepareRQValueSimple**(`value`): `Object`

Modifies the records in place
in order to ensure they match the shape

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`IRQValue`](../interfaces/rq_querier.IRQValue.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `DATA` | [`IRQValue`](../interfaces/rq_querier.IRQValue.md) |

#### Defined in

[server/resolvers/basic.ts:1006](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L1006)

___

### getDictionary

▸ **getDictionary**(`appData`, `args`): `string`

This just extracts the dictionary given the app data
and the language of choice

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | the app data |
| `args` | `any` | the whole args of the rq request |

#### Returns

`string`

#### Defined in

[server/resolvers/basic.ts:859](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L859)

___

### handleConflictError

▸ **handleConflictError**(`pathOfThisIdef`, `pathOfThisModule`, `appData`, `error`, `rowValue`): `Promise`\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathOfThisIdef` | `string` |
| `pathOfThisModule` | `string` |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `error` | [`EndpointErrorType`](base_errors.md#endpointerrortype) |
| `rowValue` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

`Promise`\<`boolean`\>

#### Defined in

[server/resolvers/basic.ts:110](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L110)

___

### retrieveSince

▸ **retrieveSince**(`args`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) |

#### Returns

`string`

#### Defined in

[server/resolvers/basic.ts:433](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L433)

___

### retrieveUntil

▸ **retrieveUntil**(`args`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) |

#### Returns

`string`

#### Defined in

[server/resolvers/basic.ts:448](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L448)

___

### runPolicyCheck

▸ **runPolicyCheck**(`arg`): `Promise`\<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

Runs a policy check on the requested information

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | - |
| `arg.appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `arg.id` | `string` | the id of that item definition on the database |
| `arg.itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `arg.parentId?` | `string` | the parent id to use in a policy type parent |
| `arg.parentModule?` | `string` | the parent module to use in a policy type parent |
| `arg.parentType?` | `string` | the parent type (qualified name and table) to use in a policy type parent |
| `arg.parentVersion?` | `string` | - |
| `arg.policyTypes` | `string`[] | - |
| `arg.preParentValidation?` | (`content`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)) => `void` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | - |
| `arg.preValidation?` | (`content`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)) => `void` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) \| `Promise`\<`void` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\> | a validation to do, validate if the row doesn't exist here, and anything else necessary the function will crash by Internal server error if no validation is done if the row is null; return a value if you want to force it to return instead without an error |
| `arg.role` | `string` | the role of the current user |
| `arg.rolesManager` | [`CustomRoleManager`](../classes/server_resolvers_roles.CustomRoleManager.md) \| (`content`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)) => [`CustomRoleManager`](../classes/server_resolvers_roles.CustomRoleManager.md) | - |
| `arg.rqArgValue` | [`IRQValue`](../interfaces/rq_querier.IRQValue.md) | the arg value given in the arguments from rq, where the info should be in qualified path names for the policies |
| `arg.rqFlattenedRequestedFields` | `any` | the flattened request fields that have been requested to read |
| `arg.userId` | `string` | - |
| `arg.version` | `string` | the version of the item definition on the database |

#### Returns

`Promise`\<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

#### Defined in

[server/resolvers/basic.ts:1309](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L1309)

___

### serverSideCheckItemDefinitionAgainst

▸ **serverSideCheckItemDefinitionAgainst**(`itemDefinition`, `rqArgValue`, `id`, `version`, `referredInclude?`, `referredParentOfInclude?`): `Promise`\<`void`\>

Checks that an item definition current state is
valid and that the rqArgValue provided is a match
for this item definition current value, remember
that in order to set the state to the rqArgValue
you should run itemDefinition.applyValue(rqArgValue);

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `rqArgValue` | [`IRQValue`](../interfaces/rq_querier.IRQValue.md) | the arg value that was set |
| `id` | `string` | the stored item id, if available, or null |
| `version` | `string` | the stored item version if avaliable |
| `referredInclude?` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | this is an optional include used to basically provide better error logging |
| `referredParentOfInclude?` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | - |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/resolvers/basic.ts:1133](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L1133)

___

### splitArgsInRQQuery

▸ **splitArgsInRQQuery**(`moduleOrItemDefinition`, `args`): [[`IRQArgs`](../interfaces/rq_querier.IRQArgs.md), [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md)]

Splits the arguments in a rq query from what it comes to be part
of the item definition or module in question and what is extra arguments
that are used within the query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `moduleOrItemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) \| [`default`](../classes/base_Root_Module.default.md) | the module or item definition |
| `args` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) | the arguments to split |

#### Returns

[[`IRQArgs`](../interfaces/rq_querier.IRQArgs.md), [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md)]

#### Defined in

[server/resolvers/basic.ts:1256](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L1256)

___

### validateContainerIdIsReal

▸ **validateContainerIdIsReal**(`containerId`, `sensitiveConfig`): `void`

Validates and checks that a given container id is valid
to store data in

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `containerId` | `string` | the container id |
| `sensitiveConfig` | [`ISensitiveConfigRawJSONDataType`](../interfaces/config.ISensitiveConfigRawJSONDataType.md) | the sensitive config |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:870](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L870)

___

### validateCustomId

▸ **validateCustomId**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:93](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L93)

___

### validateCustomVersion

▸ **validateCustomVersion**(`version`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `version` | `string` |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:101](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L101)

___

### validateParentingRules

▸ **validateParentingRules**(`appData`, `parentId`, `parentVersion`, `parentType`, `itemDefinition`, `userId`, `actualFinalOwnerId`, `role`, `rolesManager`, `isReparenting`): `Promise`\<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

Validates that the parenting rules are respected for the item definition
in question that wants to be created

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | the app data |
| `parentId` | `string` | the id of the parent item definition |
| `parentVersion` | `string` | the version of the parent item definition |
| `parentType` | `string` | the type of the parent item definition |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that is attempting to child |
| `userId` | `string` | the user id |
| `actualFinalOwnerId` | `string` | - |
| `role` | `string` | the role |
| `rolesManager` | [`CustomRoleManager`](../classes/server_resolvers_roles.CustomRoleManager.md) | - |
| `isReparenting` | `boolean` | - |

#### Returns

`Promise`\<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

#### Defined in

[server/resolvers/basic.ts:196](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L196)

___

### validateTokenAndGetData

▸ **validateTokenAndGetData**(`appData`, `token`): `Promise`\<[`IServerSideTokenDataType`](../interfaces/server_resolvers_basic.IServerSideTokenDataType.md)\>

Given a token, it validates and provides the role information
for use in the system

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `token` | `string` | the token passed via the args |

#### Returns

`Promise`\<[`IServerSideTokenDataType`](../interfaces/server_resolvers_basic.IServerSideTokenDataType.md)\>

#### Defined in

[server/resolvers/basic.ts:151](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L151)

___

### validateTokenIsntBlocked

▸ **validateTokenIsntBlocked**(`cache`, `tokenData`): `Promise`\<`void`\>

Validates the current token isn't blocked whether it is said so
by the rules of the session id, user is removed, or invalid credentials

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cache` | [`Cache`](../classes/server_cache.Cache.md) | the appdata cache instance |
| `tokenData` | [`IServerSideTokenDataType`](../interfaces/server_resolvers_basic.IServerSideTokenDataType.md) | the token data obtained and parsed |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/resolvers/basic.ts:893](https://github.com/onzag/itemize/blob/73e0c39e/server/resolvers/basic.ts#L893)
