[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/resolvers/basic

# Module: server/resolvers/basic

## Table of contents

### Interfaces

- [IFilteredAndPreparedValueType](../interfaces/server_resolvers_basic.IFilteredAndPreparedValueType.md)
- [IServerSideTokenDataType](../interfaces/server_resolvers_basic.IServerSideTokenDataType.md)

### Functions

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
- [filterAndPrepareGQLValue](server_resolvers_basic.md#filterandpreparegqlvalue)
- [getDictionary](server_resolvers_basic.md#getdictionary)
- [handleConflictError](server_resolvers_basic.md#handleconflicterror)
- [retrieveSince](server_resolvers_basic.md#retrievesince)
- [retrieveUntil](server_resolvers_basic.md#retrieveuntil)
- [runPolicyCheck](server_resolvers_basic.md#runpolicycheck)
- [serverSideCheckItemDefinitionAgainst](server_resolvers_basic.md#serversidecheckitemdefinitionagainst)
- [splitArgsInGraphqlQuery](server_resolvers_basic.md#splitargsingraphqlquery)
- [validateContainerIdIsReal](server_resolvers_basic.md#validatecontaineridisreal)
- [validateCustomId](server_resolvers_basic.md#validatecustomid)
- [validateCustomVersion](server_resolvers_basic.md#validatecustomversion)
- [validateParentingRules](server_resolvers_basic.md#validateparentingrules)
- [validateTokenAndGetData](server_resolvers_basic.md#validatetokenandgetdata)
- [validateTokenIsntBlocked](server_resolvers_basic.md#validatetokenisntblocked)

## Functions

### checkLanguage

▸ **checkLanguage**(`appData`, `args`): `void`

Checks the language and region given the arguments passed
by the graphql resolver

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | the app data that is currently in context |
| `args` | `any` | the args themselves being passed to the resolver |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:716](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L716)

___

### checkLimit

▸ **checkLimit**(`limit`, `idefOrMod`, `traditional`): `void`

Checks that the limit of search results is within the range that the item
defintion allows

#### Parameters

| Name | Type |
| :------ | :------ |
| `limit` | `number` |
| `idefOrMod` | [`default`](../classes/base_Root_Module.default.md) \| [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `traditional` | `boolean` |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:675](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L675)

___

### checkLimiters

▸ **checkLimiters**(`args`, `idefOrMod`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) |
| `idefOrMod` | [`default`](../classes/base_Root_Module.default.md) \| [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:463](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L463)

___

### checkListTypes

▸ **checkListTypes**(`records`, `mod`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `records` | [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)[] |
| `mod` | [`default`](../classes/base_Root_Module.default.md) |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:686](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L686)

___

### checkUserCanSearch

▸ **checkUserCanSearch**(`args`, `moduleOrIdef`, `tokenData`): `void`

Checks that a given user can perform the given search
as it was requested

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `any` | the args |
| `moduleOrIdef` | [`default`](../classes/base_Root_Module.default.md) \| [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | a module or an item definition the search is held against |
| `tokenData` | [`IServerSideTokenDataType`](../interfaces/server_resolvers_basic.IServerSideTokenDataType.md) | the token data |

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:743](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L743)

___

### checkUserExists

▸ **checkUserExists**(`cache`, `id`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cache` | [`Cache`](../classes/server_cache.Cache.md) |
| `id` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/resolvers/basic.ts:858](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L858)

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

[server/resolvers/basic.ts:46](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L46)

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

[server/resolvers/basic.ts:61](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L61)

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

[server/resolvers/basic.ts:76](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L76)

___

### defaultTriggerWaitForPromiseFunction

▸ **defaultTriggerWaitForPromiseFunction**(): `void`

#### Returns

`void`

#### Defined in

[server/resolvers/basic.ts:57](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L57)

___

### filterAndPrepareGQLValue

▸ **filterAndPrepareGQLValue**(`serverData`, `appData`, `value`, `requestedFields`, `role`, `userId`, `ownerUserId`, `rolesManager`, `parentModuleOrIdef`): `Promise`<[`IFilteredAndPreparedValueType`](../interfaces/server_resolvers_basic.IFilteredAndPreparedValueType.md)\>

Filters and prepares a graphql value for output to the rest endpoint
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
| `requestedFields` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | the requested fields, flattened |
| `role` | `string` | the role of the user requesting the data |
| `userId` | `string` | - |
| `ownerUserId` | `string` | - |
| `rolesManager` | [`CustomRoleManager`](../classes/server_resolvers_roles.CustomRoleManager.md) | - |
| `parentModuleOrIdef` | [`default`](../classes/base_Root_Module.default.md) \| [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the parent module or item definition the value belongs to |

#### Returns

`Promise`<[`IFilteredAndPreparedValueType`](../interfaces/server_resolvers_basic.IFilteredAndPreparedValueType.md)\>

#### Defined in

[server/resolvers/basic.ts:903](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L903)

___

### getDictionary

▸ **getDictionary**(`appData`, `args`): `string`

This just extracts the dictionary given the app data
and the language of choice

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | the app data |
| `args` | `any` | the whole args of the graphql request |

#### Returns

`string`

#### Defined in

[server/resolvers/basic.ts:775](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L775)

___

### handleConflictError

▸ **handleConflictError**(`pathOfThisIdef`, `pathOfThisModule`, `appData`, `error`, `rowValue`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathOfThisIdef` | `string` |
| `pathOfThisModule` | `string` |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `error` | [`EndpointErrorType`](base_errors.md#endpointerrortype) |
| `rowValue` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[server/resolvers/basic.ts:109](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L109)

___

### retrieveSince

▸ **retrieveSince**(`args`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) |

#### Returns

`string`

#### Defined in

[server/resolvers/basic.ts:432](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L432)

___

### retrieveUntil

▸ **retrieveUntil**(`args`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) |

#### Returns

`string`

#### Defined in

[server/resolvers/basic.ts:447](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L447)

___

### runPolicyCheck

▸ **runPolicyCheck**(`arg`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

Runs a policy check on the requested information

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `Object` | - |
| `arg.appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `arg.gqlArgValue` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) | the arg value given in the arguments from graphql, where the info should be in qualified path names for the policies |
| `arg.gqlFlattenedRequestedFiels` | `any` | the flattened request fields that have been requested to read |
| `arg.id` | `string` | the id of that item definition on the database |
| `arg.itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `arg.parentId?` | `string` | the parent id to use in a policy type parent |
| `arg.parentModule?` | `string` | the parent module to use in a policy type parent |
| `arg.parentType?` | `string` | the parent type (qualified name and table) to use in a policy type parent |
| `arg.parentVersion?` | `string` | - |
| `arg.policyTypes` | `string`[] | - |
| `arg.role` | `string` | the role of the current user |
| `arg.rolesManager` | [`CustomRoleManager`](../classes/server_resolvers_roles.CustomRoleManager.md) \| (`content`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)) => [`CustomRoleManager`](../classes/server_resolvers_roles.CustomRoleManager.md) | - |
| `arg.userId` | `string` | - |
| `arg.version` | `string` | the version of the item definition on the database |
| `arg.preParentValidation?` | (`content`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)) => `void` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | - |
| `arg.preValidation?` | (`content`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)) => `void` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) \| `Promise`<`void` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\> | - |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

#### Defined in

[server/resolvers/basic.ts:1178](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L1178)

___

### serverSideCheckItemDefinitionAgainst

▸ **serverSideCheckItemDefinitionAgainst**(`itemDefinition`, `gqlArgValue`, `id`, `version`, `referredInclude?`, `referredParentOfInclude?`): `Promise`<`void`\>

Checks that an item definition current state is
valid and that the gqlArgValue provided is a match
for this item definition current value, remember
that in order to set the state to the gqlArgValue
you should run itemDefinition.applyValue(gqlArgValue);

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `gqlArgValue` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) | the arg value that was set |
| `id` | `string` | the stored item id, if available, or null |
| `version` | `string` | the stored item version if avaliable |
| `referredInclude?` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | this is an optional include used to basically provide better error logging |
| `referredParentOfInclude?` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/resolvers/basic.ts:1002](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L1002)

___

### splitArgsInGraphqlQuery

▸ **splitArgsInGraphqlQuery**(`moduleOrItemDefinition`, `args`): [[`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md), [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md)]

Splits the arguments in a graphql query from what it comes to be part
of the item definition or module in question and what is extra arguments
that are used within the query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `moduleOrItemDefinition` | [`default`](../classes/base_Root_Module.default.md) \| [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the module or item definition |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the arguments to split |

#### Returns

[[`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md), [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md)]

#### Defined in

[server/resolvers/basic.ts:1125](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L1125)

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

[server/resolvers/basic.ts:786](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L786)

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

[server/resolvers/basic.ts:92](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L92)

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

[server/resolvers/basic.ts:100](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L100)

___

### validateParentingRules

▸ **validateParentingRules**(`appData`, `parentId`, `parentVersion`, `parentType`, `itemDefinition`, `userId`, `actualFinalOwnerId`, `role`, `rolesManager`, `isReparenting`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

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

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

#### Defined in

[server/resolvers/basic.ts:195](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L195)

___

### validateTokenAndGetData

▸ **validateTokenAndGetData**(`appData`, `token`): `Promise`<[`IServerSideTokenDataType`](../interfaces/server_resolvers_basic.IServerSideTokenDataType.md)\>

Given a token, it validates and provides the role information
for use in the system

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `token` | `string` | the token passed via the args |

#### Returns

`Promise`<[`IServerSideTokenDataType`](../interfaces/server_resolvers_basic.IServerSideTokenDataType.md)\>

#### Defined in

[server/resolvers/basic.ts:150](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L150)

___

### validateTokenIsntBlocked

▸ **validateTokenIsntBlocked**(`cache`, `tokenData`): `Promise`<`void`\>

Validates the current token isn't blocked whether it is said so
by the rules of the session id, user is removed, or invalid credentials

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cache` | [`Cache`](../classes/server_cache.Cache.md) | the appdata cache instance |
| `tokenData` | [`IServerSideTokenDataType`](../interfaces/server_resolvers_basic.IServerSideTokenDataType.md) | the token data obtained and parsed |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/resolvers/basic.ts:809](https://github.com/onzag/itemize/blob/a24376ed/server/resolvers/basic.ts#L809)
