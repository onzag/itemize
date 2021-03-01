[](../README.md) / [Exports](../modules.md) / [server/raw-db](../modules/server_raw_db.md) / ItemizeRawDB

# Class: ItemizeRawDB

[server/raw-db](../modules/server_raw_db.md).ItemizeRawDB

This is a very advanced feature, if you are here is because you are doing raw database
updates and want to propagate them into your clients to ensure that the realtime attributes
get mantained and the caches get properly invalidated

## Table of contents

### Constructors

- [constructor](server_raw_db.itemizerawdb.md#constructor)

### Properties

- [databaseConnection](server_raw_db.itemizerawdb.md#databaseconnection)
- [redisPub](server_raw_db.itemizerawdb.md#redispub)
- [root](server_raw_db.itemizerawdb.md#root)

### Methods

- [informChangeOnRow](server_raw_db.itemizerawdb.md#informchangeonrow)
- [informChangeOnRows](server_raw_db.itemizerawdb.md#informchangeonrows)
- [informRowsHaveBeenAdded](server_raw_db.itemizerawdb.md#informrowshavebeenadded)
- [informRowsHaveBeenDeleted](server_raw_db.itemizerawdb.md#informrowshavebeendeleted)
- [informRowsHaveBeenModified](server_raw_db.itemizerawdb.md#informrowshavebeenmodified)
- [performBatchRawDBUpdate](server_raw_db.itemizerawdb.md#performbatchrawdbupdate)
- [performRawDBSelect](server_raw_db.itemizerawdb.md#performrawdbselect)
- [performRawDBUpdate](server_raw_db.itemizerawdb.md#performrawdbupdate)
- [storeInDeleteRegistry](server_raw_db.itemizerawdb.md#storeindeleteregistry)

## Constructors

### constructor

\+ **new ItemizeRawDB**(`redisPub`: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md), `databaseConnection`: [*DatabaseConnection*](database.databaseconnection.md), `root`: [*default*](root.default.md)): [*ItemizeRawDB*](server_raw_db.itemizerawdb.md)

Builds a new instance of the change informer

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`redisPub` | [*ItemizeRedisClient*](server_redis.itemizeredisclient.md) | the redis publish instance   |
`databaseConnection` | [*DatabaseConnection*](database.databaseconnection.md) | a connection to the database   |
`root` | [*default*](root.default.md) | the root instance    |

**Returns:** [*ItemizeRawDB*](server_raw_db.itemizerawdb.md)

Defined in: [server/raw-db.ts:42](https://github.com/onzag/itemize/blob/0569bdf2/server/raw-db.ts#L42)

## Properties

### databaseConnection

• **databaseConnection**: [*DatabaseConnection*](database.databaseconnection.md)

Defined in: [server/raw-db.ts:42](https://github.com/onzag/itemize/blob/0569bdf2/server/raw-db.ts#L42)

___

### redisPub

• `Private` **redisPub**: [*ItemizeRedisClient*](server_redis.itemizeredisclient.md)

Defined in: [server/raw-db.ts:39](https://github.com/onzag/itemize/blob/0569bdf2/server/raw-db.ts#L39)

___

### root

• `Private` **root**: [*default*](root.default.md)

Defined in: [server/raw-db.ts:40](https://github.com/onzag/itemize/blob/0569bdf2/server/raw-db.ts#L40)

## Methods

### informChangeOnRow

▸ `Private`**informChangeOnRow**(`row`: [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md), `action`: *created* \| *modified* \| *deleted*, `dataIsComplete`: *boolean*): *Promise*<{ `itemQualifiedPathName`: *any* ; `lastModified`: *any* ; `moduleQualifiedPathName`: *string* ; `row`: [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)  }\>

Informs all the caches all the way to the clients of a change in a given
row

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`row` | [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md) | the row to inform a change on   |
`action` | *created* \| *modified* \| *deleted* | what happened to the row   |
`dataIsComplete` | *boolean* | whether the row contains complete data    |

**Returns:** *Promise*<{ `itemQualifiedPathName`: *any* ; `lastModified`: *any* ; `moduleQualifiedPathName`: *string* ; `row`: [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)  }\>

Defined in: [server/raw-db.ts:92](https://github.com/onzag/itemize/blob/0569bdf2/server/raw-db.ts#L92)

___

### informChangeOnRows

▸ `Private`**informChangeOnRows**(`rows`: [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)[], `action`: *created* \| *modified* \| *deleted*, `rowDataIsComplete`: *boolean*): *Promise*<void\>

Actually does the job on informing changes in the rows
this function calls the changed mechanism and then does
the updates for all the searches that might be occuring inside
the clients that are related to those rows

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rows` | [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)[] | the rows in question   |
`action` | *created* \| *modified* \| *deleted* | what happened to the rows   |
`rowDataIsComplete` | *boolean* | whether the data is complete    |

**Returns:** *Promise*<void\>

Defined in: [server/raw-db.ts:176](https://github.com/onzag/itemize/blob/0569bdf2/server/raw-db.ts#L176)

___

### informRowsHaveBeenAdded

▸ **informRowsHaveBeenAdded**(`rows`: [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)[], `rowDataIsComplete?`: *boolean*): *Promise*<void\>

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

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rows` | [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)[] | the rows to inform a change on   |
`rowDataIsComplete?` | *boolean* | whether the rows contain complete data    |

**Returns:** *Promise*<void\>

Defined in: [server/raw-db.ts:401](https://github.com/onzag/itemize/blob/0569bdf2/server/raw-db.ts#L401)

___

### informRowsHaveBeenDeleted

▸ **informRowsHaveBeenDeleted**(`rows`: [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)[]): *Promise*<void\>

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

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rows` | [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)[] | the rows to inform a change on    |

**Returns:** *Promise*<void\>

Defined in: [server/raw-db.ts:372](https://github.com/onzag/itemize/blob/0569bdf2/server/raw-db.ts#L372)

___

### informRowsHaveBeenModified

▸ **informRowsHaveBeenModified**(`rows`: [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)[], `rowDataIsComplete?`: *boolean*): *Promise*<void\>

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

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`rows` | [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)[] | the rows to inform a change on   |
`rowDataIsComplete?` | *boolean* | whether the rows contain complete data    |

**Returns:** *Promise*<void\>

Defined in: [server/raw-db.ts:348](https://github.com/onzag/itemize/blob/0569bdf2/server/raw-db.ts#L348)

___

### performBatchRawDBUpdate

▸ **performBatchRawDBUpdate**(`item`: *string* \| [*default*](base_root_module_itemdefinition.default.md), `updater`: { `itemTableUpdate?`: [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md) ; `itemTableUpdater?`: (`arg`: [*SetBuilder*](database_setbuilder.setbuilder.md)) => *void* ; `moduleTableUpdate?`: [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md) ; `moduleTableUpdater?`: (`arg`: [*SetBuilder*](database_setbuilder.setbuilder.md)) => *void* ; `whereCriteriaSelector`: (`arg`: [*WhereBuilder*](database_wherebuilder.wherebuilder.md)) => *void*  }): *Promise*<[*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)[]\>

Performs a raw db update for many rows
in the database this is a very powerful and quite
advanced method

#### Parameters:

Name | Type |
:------ | :------ |
`item` | *string* \| [*default*](base_root_module_itemdefinition.default.md) |
`updater` | *object* |
`updater.itemTableUpdate?` | [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md) |
`updater.itemTableUpdater?` | (`arg`: [*SetBuilder*](database_setbuilder.setbuilder.md)) => *void* |
`updater.moduleTableUpdate?` | [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md) |
`updater.moduleTableUpdater?` | (`arg`: [*SetBuilder*](database_setbuilder.setbuilder.md)) => *void* |
`updater.whereCriteriaSelector` | (`arg`: [*WhereBuilder*](database_wherebuilder.wherebuilder.md)) => *void* |

**Returns:** *Promise*<[*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)[]\>

Defined in: [server/raw-db.ts:447](https://github.com/onzag/itemize/blob/0569bdf2/server/raw-db.ts#L447)

___

### performRawDBSelect

▸ **performRawDBSelect**(`itemDefinitionOrModule`: *string* \| [*default*](base_root_module.default.md) \| [*default*](base_root_module_itemdefinition.default.md), `selecter`: (`builder`: [*SelectBuilder*](database_selectbuilder.selectbuilder.md)) => *void*, `preventJoin?`: *boolean*): *Promise*<[*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)[]\>

Provides a db query builder for the given item or a module

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinitionOrModule` | *string* \| [*default*](base_root_module.default.md) \| [*default*](base_root_module_itemdefinition.default.md) | the item or module   |
`selecter` | (`builder`: [*SelectBuilder*](database_selectbuilder.selectbuilder.md)) => *void* | - |
`preventJoin?` | *boolean* | when using an item, if you will not be using properties that are in the module table, like id, parents, creators, and prop extensions then you can prevent the join from happening    |

**Returns:** *Promise*<[*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)[]\>

Defined in: [server/raw-db.ts:412](https://github.com/onzag/itemize/blob/0569bdf2/server/raw-db.ts#L412)

___

### performRawDBUpdate

▸ **performRawDBUpdate**(`item`: *string* \| [*default*](base_root_module_itemdefinition.default.md), `id`: *string*, `version`: *string*, `updater`: { `itemTableUpdate?`: [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md) ; `itemTableUpdater?`: (`arg`: [*SetBuilder*](database_setbuilder.setbuilder.md)) => *void* ; `moduleTableUpdate?`: [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md) ; `moduleTableUpdater?`: (`arg`: [*SetBuilder*](database_setbuilder.setbuilder.md)) => *void*  }): *Promise*<[*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)\>

Performs a raw database update, use this method in order to update critical data that could
lead to race conditions, otherwise stay by updating through the cache

#### Parameters:

Name | Type |
:------ | :------ |
`item` | *string* \| [*default*](base_root_module_itemdefinition.default.md) |
`id` | *string* |
`version` | *string* |
`updater` | *object* |
`updater.itemTableUpdate?` | [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md) |
`updater.itemTableUpdater?` | (`arg`: [*SetBuilder*](database_setbuilder.setbuilder.md)) => *void* |
`updater.moduleTableUpdate?` | [*IManyValueType*](../interfaces/database_base.imanyvaluetype.md) |
`updater.moduleTableUpdater?` | (`arg`: [*SetBuilder*](database_setbuilder.setbuilder.md)) => *void* |

**Returns:** *Promise*<[*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md)\>

Defined in: [server/raw-db.ts:554](https://github.com/onzag/itemize/blob/0569bdf2/server/raw-db.ts#L554)

___

### storeInDeleteRegistry

▸ `Private`**storeInDeleteRegistry**(`row`: [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md), `moduleName`: *string*): *Promise*<string\>

Takes a row and stores it in the deleted registry

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`row` | [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md) | the row to store   |
`moduleName` | *string* | the module that it belongs to (based on the type)   |

**Returns:** *Promise*<string\>

the transaction time

Defined in: [server/raw-db.ts:62](https://github.com/onzag/itemize/blob/0569bdf2/server/raw-db.ts#L62)
