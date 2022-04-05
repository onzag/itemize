[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/raw-db](../modules/server_raw_db.md) / ItemizeRawDB

# Class: ItemizeRawDB

[server/raw-db](../modules/server_raw_db.md).ItemizeRawDB

This is a very advanced feature, if you are here is because you are doing raw database
updates and want to propagate them into your clients to ensure that the realtime attributes
get mantained and the caches get properly invalidated

## Table of contents

### Constructors

- [constructor](server_raw_db.ItemizeRawDB.md#constructor)

### Properties

- [databaseConnection](server_raw_db.ItemizeRawDB.md#databaseconnection)
- [redisPub](server_raw_db.ItemizeRawDB.md#redispub)
- [root](server_raw_db.ItemizeRawDB.md#root)
- [transacting](server_raw_db.ItemizeRawDB.md#transacting)
- [transactingQueue](server_raw_db.ItemizeRawDB.md#transactingqueue)

### Methods

- [\_retrieveRawDBSelect](server_raw_db.ItemizeRawDB.md#_retrieverawdbselect)
- [informChangeOnRow](server_raw_db.ItemizeRawDB.md#informchangeonrow)
- [informChangeOnRows](server_raw_db.ItemizeRawDB.md#informchangeonrows)
- [informRowsHaveBeenAdded](server_raw_db.ItemizeRawDB.md#informrowshavebeenadded)
- [informRowsHaveBeenDeleted](server_raw_db.ItemizeRawDB.md#informrowshavebeendeleted)
- [informRowsHaveBeenModified](server_raw_db.ItemizeRawDB.md#informrowshavebeenmodified)
- [performBatchRawDBDelete](server_raw_db.ItemizeRawDB.md#performbatchrawdbdelete)
- [performBatchRawDBUpdate](server_raw_db.ItemizeRawDB.md#performbatchrawdbupdate)
- [performModuleBatchRawDBUpdate](server_raw_db.ItemizeRawDB.md#performmodulebatchrawdbupdate)
- [performRawDBDelete](server_raw_db.ItemizeRawDB.md#performrawdbdelete)
- [performRawDBInsert](server_raw_db.ItemizeRawDB.md#performrawdbinsert)
- [performRawDBSelect](server_raw_db.ItemizeRawDB.md#performrawdbselect)
- [performRawDBUpdate](server_raw_db.ItemizeRawDB.md#performrawdbupdate)
- [processGQLValue](server_raw_db.ItemizeRawDB.md#processgqlvalue)
- [provideHashableV5Id](server_raw_db.ItemizeRawDB.md#providehashablev5id)
- [provideRandomV4Id](server_raw_db.ItemizeRawDB.md#providerandomv4id)
- [redoDictionariesFn](server_raw_db.ItemizeRawDB.md#redodictionariesfn)
- [retrieveRawDBSelect](server_raw_db.ItemizeRawDB.md#retrieverawdbselect)
- [startTransaction](server_raw_db.ItemizeRawDB.md#starttransaction)
- [storeInDeleteRegistry](server_raw_db.ItemizeRawDB.md#storeindeleteregistry)

## Constructors

### constructor

• **new ItemizeRawDB**(`redisPub`, `databaseConnection`, `root`)

Builds a new instance of the change informer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `redisPub` | [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md) | the redis publish instance |
| `databaseConnection` | [`DatabaseConnection`](database.DatabaseConnection.md) | a connection to the database |
| `root` | [`default`](base_Root.default.md) | the root instance |

#### Defined in

[server/raw-db.ts:69](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L69)

## Properties

### databaseConnection

• **databaseConnection**: [`DatabaseConnection`](database.DatabaseConnection.md)

#### Defined in

[server/raw-db.ts:61](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L61)

___

### redisPub

• `Private` **redisPub**: [`ItemizeRedisClient`](server_redis.ItemizeRedisClient.md)

#### Defined in

[server/raw-db.ts:55](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L55)

___

### root

• `Private` **root**: [`default`](base_Root.default.md)

#### Defined in

[server/raw-db.ts:56](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L56)

___

### transacting

• `Private` **transacting**: `boolean`

#### Defined in

[server/raw-db.ts:58](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L58)

___

### transactingQueue

• `Private` **transactingQueue**: `Function`[] = `[]`

#### Defined in

[server/raw-db.ts:59](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L59)

## Methods

### \_retrieveRawDBSelect

▸ `Private` **_retrieveRawDBSelect**(`itemDefinitionOrModule`, `selecter`, `preventJoin?`): [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `selecter` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` |
| `preventJoin?` | `boolean` |

#### Returns

[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

#### Defined in

[server/raw-db.ts:804](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L804)

___

### informChangeOnRow

▸ `Private` **informChangeOnRow**(`row`, `action`, `dataIsComplete`): `Promise`<{ `itemQualifiedPathName`: `any` = row.type; `lastModified`: `any` ; `moduleQualifiedPathName`: `string` = moduleName; `row`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)  }\>

Informs all the caches all the way to the clients of a change in a given
row

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the row to inform a change on |
| `action` | ``"created"`` \| ``"modified"`` \| ``"deleted"`` | what happened to the row |
| `dataIsComplete` | `boolean` | whether the row contains complete data |

#### Returns

`Promise`<{ `itemQualifiedPathName`: `any` = row.type; `lastModified`: `any` ; `moduleQualifiedPathName`: `string` = moduleName; `row`: [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)  }\>

#### Defined in

[server/raw-db.ts:205](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L205)

___

### informChangeOnRows

▸ `Private` **informChangeOnRows**(`rows`, `action`, `rowDataIsComplete`): `Promise`<`void`\>

Actually does the job on informing changes in the rows
this function calls the changed mechanism and then does
the updates for all the searches that might be occuring inside
the clients that are related to those rows

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rows` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] | the rows in question |
| `action` | ``"created"`` \| ``"modified"`` \| ``"deleted"`` | what happened to the rows |
| `rowDataIsComplete` | `boolean` | whether the data is complete |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:289](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L289)

___

### informRowsHaveBeenAdded

▸ **informRowsHaveBeenAdded**(`rows`, `rowDataIsComplete?`): `Promise`<`void`\>

Informs rows have been added in the database and as such all clients and instances
need to update its cache, this will affect all the way to each one of the singular clients
as it propagates database changes

Ensure each row that you pass provides at least the following data (otherwise it will fail)

id
version
type
created_by
parent_id
parent_type
parent_version
last_modified

If your data is complete (recommended) that is, both the module and the item table have been
joined, then the changes can be propagated more efficiently as the caches won't have to reach
for the database for the value

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rows` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] | the rows to inform a change on |
| `rowDataIsComplete?` | `boolean` | whether the rows contain complete data |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:608](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L608)

___

### informRowsHaveBeenDeleted

▸ **informRowsHaveBeenDeleted**(`rows`): `Promise`<`void`\>

Informs rows have been deleted in the database and as such all clients and instances
need to update its cache, this will affect all the way to each one of the singular clients
as it propagates database changes

This function will also add the deleted rows into the deleted registry

Ensure each row that you pass provides at least the following data (otherwise it will fail)

id
version
type
created_by
parent_id
parent_type
parent_version
last_modified

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rows` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] | the rows to inform a change on |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:579](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L579)

___

### informRowsHaveBeenModified

▸ **informRowsHaveBeenModified**(`rows`, `rowDataIsComplete?`): `Promise`<`void`\>

Informs rows have changed in the database and as such all clients and instances
need to update its cache, this will affect all the way to each one of the singular clients
as it propagates database changes

Please make sure that you have updated the last_modified change in each one of the rows
you have modified before feeding them here otherwise while active clients will properly
update, inactive clients will fail to realize there has been a change once they ask
for the last modified signature

Ensure each row that you pass provides at least the following data (otherwise it will fail)

id
version
type
created_by
parent_id
parent_type
parent_version
last_modified

If your data is complete (recommended) that is, both the module and the item table have been
joined, then the changes can be propagated more efficiently as the caches won't have to reach
for the database for an updated value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rows` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[] | the rows to inform a change on |
| `rowDataIsComplete?` | `boolean` | whether the rows contain complete data |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:555](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L555)

___

### performBatchRawDBDelete

▸ **performBatchRawDBDelete**(`itemDefinitionOrModule`, `deleter`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `deleter` | `Object` |
| `deleter.dangerousUseSilentMode?` | `boolean` |
| `deleter.preventJoin?` | `boolean` |
| `deleter.select` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:683](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L683)

___

### performBatchRawDBUpdate

▸ **performBatchRawDBUpdate**(`item`, `updater`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

Performs a raw db update for many rows
in the database this is a very powerful and quite
advanced method

TODO returning builder somehow
TODO allow for optimizations

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `updater` | `Object` |
| `updater.dangerousUseSilentMode?` | `boolean` |
| `updater.itemTableUpdate?` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md) |
| `updater.moduleTableUpdate?` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md) |
| `updater.itemTableUpdater?` | (`arg`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `redoDictionaries`: `RedoDictionariesFn`) => `void` |
| `updater.moduleTableUpdater?` | (`arg`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `redoDictionaries`: `RedoDictionariesFn`) => `void` |
| `updater.whereCriteriaSelector` | (`arg`: [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)) => `void` |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:879](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L879)

___

### performModuleBatchRawDBUpdate

▸ **performModuleBatchRawDBUpdate**(`moduleToUpdate`, `updater`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

Performs a raw db update for many rows
in the database this is a very powerful and quite
advanced method

TODO returning builder somehow
TODO allow for optimizations

#### Parameters

| Name | Type |
| :------ | :------ |
| `moduleToUpdate` | `string` \| [`default`](base_Root_Module.default.md) |
| `updater` | `Object` |
| `updater.dangerousUseSilentMode?` | `boolean` |
| `updater.moduleTableUpdate?` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md) |
| `updater.moduleTableUpdater?` | (`arg`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `redoDictionaries`: `RedoDictionariesFnPropertyBased`) => `void` |
| `updater.whereCriteriaSelector` | (`arg`: [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)) => `void` |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:1023](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L1023)

___

### performRawDBDelete

▸ **performRawDBDelete**(`itemDefinitionOrModule`, `id`, `version`, `deleter`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `id` | `string` |
| `version` | `string` |
| `deleter` | `Object` |
| `deleter.dangerousUseSilentMode?` | `boolean` |

#### Returns

`Promise`<`void`\>

#### Defined in

[server/raw-db.ts:669](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L669)

___

### performRawDBInsert

▸ **performRawDBInsert**(`item`, `inserter`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

Performs a raw db insert where the values of the database rows
are manually inserted value by value in a raw insert event

It is a rather advanced method to use as every row value to be inserted
has to be specified and it is easy to mess up

refer to processGQLValue in order to aid yourself a little when doing a raw db
insert

TODO returning builder access in order to modify what to return

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `inserter` | `Object` |
| `inserter.dangerousUseSilentMode?` | `boolean` |
| `inserter.values` | { `itemTableInsert`: [`IManyValueType`](../interfaces/database_base.IManyValueType.md) ; `moduleTableInsert`: [`IManyValueType`](../interfaces/database_base.IManyValueType.md)  }[] |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:713](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L713)

___

### performRawDBSelect

▸ **performRawDBSelect**(`itemDefinitionOrModule`, `selecter`, `preventJoin?`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

Provides a db query builder for the given item or a module

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) | the item or module |
| `selecter` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` | - |
| `preventJoin?` | `boolean` | when using an item, if you will not be using properties that are in the module table, like id, parents, creators, and prop extensions then you can prevent the join from happening |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)[]\>

#### Defined in

[server/raw-db.ts:838](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L838)

___

### performRawDBUpdate

▸ **performRawDBUpdate**(`item`, `id`, `version`, `updater`): `Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

Performs a raw database update, use this method in order to update critical data that could
lead to race conditions, otherwise stay by updating through the cache

TODO returning builder access

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `id` | `string` |
| `version` | `string` |
| `updater` | `Object` |
| `updater.dangerousUseSilentMode?` | `boolean` |
| `updater.itemTableUpdate?` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md) |
| `updater.moduleTableUpdate?` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md) |
| `updater.itemTableUpdater?` | (`arg`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `redoDictionaries`: `RedoDictionariesFn`) => `void` |
| `updater.moduleTableUpdater?` | (`arg`: [`SetBuilder`](database_SetBuilder.SetBuilder.md), `redoDictionaries`: `RedoDictionariesFn`) => `void` |

#### Returns

`Promise`<[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)\>

#### Defined in

[server/raw-db.ts:1100](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L1100)

___

### processGQLValue

▸ **processGQLValue**(`item`, `value`, `serverData`, `dictionary`, `partialFields?`): `Object`

Will convert a graphql style value into a full row SQL value in order to execute many value
types functionality and directly insert values in a safer way

Note that this method is incapable of passing the required data for consuming stream which means
that if you set a value for a file and are working with files this will inevitably fail because
its incapable to access the storage provider and unable to consume streams

Raw writes on the database are after all dangerous

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | `string` \| [`default`](base_Root_Module_ItemDefinition.default.md) | the item definition that you want to convert a value for |
| `value` | `any` | the vale you want to convert |
| `serverData` | `any` | server data, required for doing things like currency conversion, you might use null otherwise but it should be readily available in the global environment as well as local, you should never use raw db in local nevertheless |
| `dictionary` | `string` | the dictionary to use |
| `partialFields?` | `any` | by default it will populate the entire row information that is necessary to fill each one of the required properties (not including the base) so with partial fields you can get partial values which are useful for updates, these are the same as graphql fields |

#### Returns

`Object`

an object which contains the total or partial values of the row to be inserted or updated

| Name | Type |
| :------ | :------ |
| `itemSQL` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |
| `modSQL` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Defined in

[server/raw-db.ts:134](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L134)

___

### provideHashableV5Id

▸ **provideHashableV5Id**(`input`): `string`

Provides a hashable v5 uuid that will ensure the same id
provided the same input

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

a url safe v5 uuid

#### Defined in

[server/raw-db.ts:109](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L109)

___

### provideRandomV4Id

▸ **provideRandomV4Id**(): `string`

When using raw db you might be able to specify your own ids
by using these so you know them ahead of time

It's a simple v4 uuid

#### Returns

`string`

a url safe v4 uuid

#### Defined in

[server/raw-db.ts:99](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L99)

___

### redoDictionariesFn

▸ `Private` **redoDictionariesFn**(`itemDefinitionOrModule`, `setBuilder`, `dictionary`, `propertyOrInclude`, `property`): `void`

A private helper function to use a item definition
and a set builder in order to update the dictionaries
of given properties

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `setBuilder` | [`SetBuilder`](database_SetBuilder.SetBuilder.md) |
| `dictionary` | `string` |
| `propertyOrInclude` | `string` |
| `property` | `string` |

#### Returns

`void`

#### Defined in

[server/raw-db.ts:624](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L624)

___

### retrieveRawDBSelect

▸ **retrieveRawDBSelect**(`itemDefinitionOrModule`, `selecter`, `preventJoin?`): [`string`, [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[]]

Retrieves a raw db select query in order to be used to assign values in updates

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinitionOrModule` | `string` \| [`default`](base_Root_Module.default.md) \| [`default`](base_Root_Module_ItemDefinition.default.md) |
| `selecter` | (`builder`: [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)) => `void` |
| `preventJoin?` | `boolean` |

#### Returns

[`string`, [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[]]

#### Defined in

[server/raw-db.ts:855](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L855)

___

### startTransaction

▸ **startTransaction**<`T`\>(`fn`): `Promise`<`T`\>

Starts a new instance of raw db but in transaction mode

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | (`transactingRawDB`: [`ItemizeRawDB`](server_raw_db.ItemizeRawDB.md)) => `Promise`<`T`\> | the transactional function |

#### Returns

`Promise`<`T`\>

whatever is returned in the transactional function

#### Defined in

[server/raw-db.ts:80](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L80)

___

### storeInDeleteRegistry

▸ `Private` **storeInDeleteRegistry**(`row`, `moduleName`): `Promise`<`string`\>

Takes a row and stores it in the deleted registry

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the row to store |
| `moduleName` | `string` | the module that it belongs to (based on the type) |

#### Returns

`Promise`<`string`\>

the transaction time

#### Defined in

[server/raw-db.ts:175](https://github.com/onzag/itemize/blob/5c2808d3/server/raw-db.ts#L175)
