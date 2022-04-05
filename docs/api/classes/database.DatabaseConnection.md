[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database](../modules/database.md) / DatabaseConnection

# Class: DatabaseConnection

[database](../modules/database.md).DatabaseConnection

The database connection class that creates
a database conection and executes queries it is designed
to exist as a single instance and execute transactions

## Table of contents

### Constructors

- [constructor](database.DatabaseConnection.md#constructor)

### Properties

- [client](database.DatabaseConnection.md#client)
- [forceLogs](database.DatabaseConnection.md#forcelogs)
- [pool](database.DatabaseConnection.md#pool)
- [suppressLogs](database.DatabaseConnection.md#suppresslogs)

### Methods

- [forceLogging](database.DatabaseConnection.md#forcelogging)
- [getAlterTableBuilder](database.DatabaseConnection.md#getaltertablebuilder)
- [getClient](database.DatabaseConnection.md#getclient)
- [getCreateTableBuilder](database.DatabaseConnection.md#getcreatetablebuilder)
- [getInsertBuilder](database.DatabaseConnection.md#getinsertbuilder)
- [getPool](database.DatabaseConnection.md#getpool)
- [getSelectBuilder](database.DatabaseConnection.md#getselectbuilder)
- [getUpdateBuilder](database.DatabaseConnection.md#getupdatebuilder)
- [query](database.DatabaseConnection.md#query)
- [queryFirst](database.DatabaseConnection.md#queryfirst)
- [queryRows](database.DatabaseConnection.md#queryrows)
- [startTransaction](database.DatabaseConnection.md#starttransaction)
- [suppressLogging](database.DatabaseConnection.md#suppresslogging)

## Constructors

### constructor

• **new DatabaseConnection**(`info`, `client?`, `pool?`)

Constructs a new database connection

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `info` | [`IDatbaseConnectionInfo`](../interfaces/database.IDatbaseConnectionInfo.md) | the connection information |
| `client?` | `PoolClient` | for child database connections used in transactions the client that is in use |
| `pool?` | `Pool` | for child database connections used in transactions the pool that generated this from |

#### Defined in

[database/index.ts:62](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L62)

## Properties

### client

• `Private` **client**: `PoolClient`

A client that is taken from the pool, normally
this will be undefined unless specified in the constructor
for child connections used for transactions

#### Defined in

[database/index.ts:44](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L44)

___

### forceLogs

• `Private` **forceLogs**: `boolean`

Forces the logging even if env is not development

#### Defined in

[database/index.ts:54](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L54)

___

### pool

• `Private` **pool**: `Pool`

This is the pg pool

#### Defined in

[database/index.ts:38](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L38)

___

### suppressLogs

• `Private` **suppressLogs**: `boolean`

Suppresses console logging

#### Defined in

[database/index.ts:49](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L49)

## Methods

### forceLogging

▸ **forceLogging**(): `void`

Forces console logging even if env is not
development

#### Returns

`void`

#### Defined in

[database/index.ts:84](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L84)

___

### getAlterTableBuilder

▸ **getAlterTableBuilder**(): [`AlterTableBuilder`](database_AlterTableBuilder.AlterTableBuilder.md)

Provides a single alter table builder

#### Returns

[`AlterTableBuilder`](database_AlterTableBuilder.AlterTableBuilder.md)

a new alter table builder

#### Defined in

[database/index.ts:225](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L225)

___

### getClient

▸ **getClient**(): `PoolClient`

Provides the current active pg client, only really existant on transactions

#### Returns

`PoolClient`

the client

#### Defined in

[database/index.ts:241](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L241)

___

### getCreateTableBuilder

▸ **getCreateTableBuilder**(): [`CreateTableBuilder`](database_CreateTableBuilder.CreateTableBuilder.md)

Provides a single create table builder

#### Returns

[`CreateTableBuilder`](database_CreateTableBuilder.CreateTableBuilder.md)

a new create table builder

#### Defined in

[database/index.ts:217](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L217)

___

### getInsertBuilder

▸ **getInsertBuilder**(): [`InsertBuilder`](database_InsertBuilder.InsertBuilder.md)

Provides a single insert builder

#### Returns

[`InsertBuilder`](database_InsertBuilder.InsertBuilder.md)

a new insert builder

#### Defined in

[database/index.ts:209](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L209)

___

### getPool

▸ **getPool**(): `Pool`

Provides the current active pg pool

#### Returns

`Pool`

the pool

#### Defined in

[database/index.ts:233](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L233)

___

### getSelectBuilder

▸ **getSelectBuilder**(): [`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

Provides a single select builder

#### Returns

[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)

a new select builder

#### Defined in

[database/index.ts:201](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L201)

___

### getUpdateBuilder

▸ **getUpdateBuilder**(): [`UpdateBuilder`](database_UpdateBuilder.UpdateBuilder.md)

Provides a single update builder

#### Returns

[`UpdateBuilder`](database_UpdateBuilder.UpdateBuilder.md)

a new update builder

#### Defined in

[database/index.ts:193](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L193)

___

### query

▸ **query**(`what`, `bindings?`, `useHoles?`): `Promise`<`QueryResult`<`any`\>\>

Performs a query against the database and returns a query result

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `what` | `string` \| [`QueryBuilder`](database_base.QueryBuilder.md) | what to execute, either a raw string or a query from a builder |
| `bindings?` | [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[] | the bindings to use, you should not specify them when using a builder as initial argument as they will not be used |
| `useHoles?` | `boolean` | - |

#### Returns

`Promise`<`QueryResult`<`any`\>\>

a promise of a query result

#### Defined in

[database/index.ts:95](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L95)

___

### queryFirst

▸ **queryFirst**(`what`, `bindings?`, `useHoles?`): `Promise`<`any`\>

Performs a query against the database and returns only the first row

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `what` | `string` \| [`QueryBuilder`](database_base.QueryBuilder.md) | what to execute, either a raw string or a query from a builder |
| `bindings?` | [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[] | the bindings to use, you should not specify them when using a builder as initial argument as they will not be used |
| `useHoles?` | `boolean` | - |

#### Returns

`Promise`<`any`\>

a promise of a single row

#### Defined in

[database/index.ts:185](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L185)

___

### queryRows

▸ **queryRows**(`what`, `bindings?`, `useHoles?`): `Promise`<`any`[]\>

Performs a query against the database and returns only the rows

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `what` | `string` \| [`QueryBuilder`](database_base.QueryBuilder.md) | what to execute, either a raw string or a query from a builder |
| `bindings?` | [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[] | the bindings to use, you should not specify them when using a builder as initial argument as they will not be used |
| `useHoles?` | `boolean` | - |

#### Returns

`Promise`<`any`[]\>

a promise of a list of rows

#### Defined in

[database/index.ts:174](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L174)

___

### startTransaction

▸ **startTransaction**(`arg`): `Promise`<`any`\>

Starts a transaction, while handling rollbacks and everything

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | (`transactingClient`: [`DatabaseConnection`](database.DatabaseConnection.md)) => `Promise`<`any`\> | a function that returns anything and handles the transacting client |

#### Returns

`Promise`<`any`\>

whatever you returned in your arg function

#### Defined in

[database/index.ts:250](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L250)

___

### suppressLogging

▸ **suppressLogging**(): `void`

Suppresses console logging

#### Returns

`void`

#### Defined in

[database/index.ts:76](https://github.com/onzag/itemize/blob/5c2808d3/database/index.ts#L76)
