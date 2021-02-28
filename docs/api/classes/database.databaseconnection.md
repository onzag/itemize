[](../README.md) / [Exports](../modules.md) / [database](../modules/database.md) / DatabaseConnection

# Class: DatabaseConnection

[database](../modules/database.md).DatabaseConnection

The database connection class that creates
a database conection and executes queries it is designed
to exist as a single instance and execute transactions

## Table of contents

### Constructors

- [constructor](database.databaseconnection.md#constructor)

### Properties

- [client](database.databaseconnection.md#client)
- [forceLogs](database.databaseconnection.md#forcelogs)
- [pool](database.databaseconnection.md#pool)
- [suppressLogs](database.databaseconnection.md#suppresslogs)

### Methods

- [forceLogging](database.databaseconnection.md#forcelogging)
- [getAlterTableBuilder](database.databaseconnection.md#getaltertablebuilder)
- [getClient](database.databaseconnection.md#getclient)
- [getCreateTableBuilder](database.databaseconnection.md#getcreatetablebuilder)
- [getInsertBuilder](database.databaseconnection.md#getinsertbuilder)
- [getPool](database.databaseconnection.md#getpool)
- [getSelectBuilder](database.databaseconnection.md#getselectbuilder)
- [getUpdateBuilder](database.databaseconnection.md#getupdatebuilder)
- [query](database.databaseconnection.md#query)
- [queryFirst](database.databaseconnection.md#queryfirst)
- [queryRows](database.databaseconnection.md#queryrows)
- [startTransaction](database.databaseconnection.md#starttransaction)
- [suppressLogging](database.databaseconnection.md#suppresslogging)

## Constructors

### constructor

\+ **new DatabaseConnection**(`info`: [*IDatbaseConnectionInfo*](../interfaces/database.idatbaseconnectioninfo.md), `client?`: *PoolClient*, `pool?`: *Pool*): [*DatabaseConnection*](database.databaseconnection.md)

Constructs a new database connection

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`info` | [*IDatbaseConnectionInfo*](../interfaces/database.idatbaseconnectioninfo.md) | the connection information   |
`client?` | *PoolClient* | for child database connections used in transactions the client that is in use   |
`pool?` | *Pool* | for child database connections used in transactions the pool that generated this from    |

**Returns:** [*DatabaseConnection*](database.databaseconnection.md)

Defined in: [database/index.ts:54](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L54)

## Properties

### client

• `Private` **client**: *PoolClient*

A client that is taken from the pool, normally
this will be undefined unless specified in the constructor
for child connections used for transactions

Defined in: [database/index.ts:44](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L44)

___

### forceLogs

• `Private` **forceLogs**: *boolean*

Forces the logging even if env is not development

Defined in: [database/index.ts:54](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L54)

___

### pool

• `Private` **pool**: *Pool*

This is the pg pool

Defined in: [database/index.ts:38](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L38)

___

### suppressLogs

• `Private` **suppressLogs**: *boolean*

Suppresses console logging

Defined in: [database/index.ts:49](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L49)

## Methods

### forceLogging

▸ **forceLogging**(): *void*

Forces console logging even if env is not
development

**Returns:** *void*

Defined in: [database/index.ts:84](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L84)

___

### getAlterTableBuilder

▸ **getAlterTableBuilder**(): [*AlterTableBuilder*](database_altertablebuilder.altertablebuilder.md)

Provides a single alter table builder

**Returns:** [*AlterTableBuilder*](database_altertablebuilder.altertablebuilder.md)

a new alter table builder

Defined in: [database/index.ts:207](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L207)

___

### getClient

▸ **getClient**(): *PoolClient*

Provides the current active pg client, only really existant on transactions

**Returns:** *PoolClient*

the client

Defined in: [database/index.ts:223](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L223)

___

### getCreateTableBuilder

▸ **getCreateTableBuilder**(): [*CreateTableBuilder*](database_createtablebuilder.createtablebuilder.md)

Provides a single create table builder

**Returns:** [*CreateTableBuilder*](database_createtablebuilder.createtablebuilder.md)

a new create table builder

Defined in: [database/index.ts:199](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L199)

___

### getInsertBuilder

▸ **getInsertBuilder**(): [*InsertBuilder*](database_insertbuilder.insertbuilder.md)

Provides a single insert builder

**Returns:** [*InsertBuilder*](database_insertbuilder.insertbuilder.md)

a new insert builder

Defined in: [database/index.ts:191](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L191)

___

### getPool

▸ **getPool**(): *Pool*

Provides the current active pg pool

**Returns:** *Pool*

the pool

Defined in: [database/index.ts:215](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L215)

___

### getSelectBuilder

▸ **getSelectBuilder**(): [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

Provides a single select builder

**Returns:** [*SelectBuilder*](database_selectbuilder.selectbuilder.md)

a new select builder

Defined in: [database/index.ts:183](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L183)

___

### getUpdateBuilder

▸ **getUpdateBuilder**(): [*UpdateBuilder*](database_updatebuilder.updatebuilder.md)

Provides a single update builder

**Returns:** [*UpdateBuilder*](database_updatebuilder.updatebuilder.md)

a new update builder

Defined in: [database/index.ts:175](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L175)

___

### query

▸ **query**(`what`: *string* \| [*QueryBuilder*](database_base.querybuilder.md), `bindings?`: [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]): *Promise*<QueryResult<any\>\>

Performs a query against the database and returns a query result

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`what` | *string* \| [*QueryBuilder*](database_base.querybuilder.md) | what to execute, either a raw string or a query from a builder   |
`bindings?` | [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[] | the bindings to use, you should not specify them when using a builder as initial argument as they will not be used   |

**Returns:** *Promise*<QueryResult<any\>\>

a promise of a query result

Defined in: [database/index.ts:95](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L95)

___

### queryFirst

▸ **queryFirst**(`what`: *string* \| [*QueryBuilder*](database_base.querybuilder.md), `bindings?`: [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]): *Promise*<any\>

Performs a query against the database and returns only the first row

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`what` | *string* \| [*QueryBuilder*](database_base.querybuilder.md) | what to execute, either a raw string or a query from a builder   |
`bindings?` | [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[] | the bindings to use, you should not specify them when using a builder as initial argument as they will not be used   |

**Returns:** *Promise*<any\>

a promise of a single row

Defined in: [database/index.ts:167](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L167)

___

### queryRows

▸ **queryRows**(`what`: *string* \| [*QueryBuilder*](database_base.querybuilder.md), `bindings?`: [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[]): *Promise*<any[]\>

Performs a query against the database and returns only the rows

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`what` | *string* \| [*QueryBuilder*](database_base.querybuilder.md) | what to execute, either a raw string or a query from a builder   |
`bindings?` | [*BasicBindingType*](../modules/database_base.md#basicbindingtype)[] | the bindings to use, you should not specify them when using a builder as initial argument as they will not be used   |

**Returns:** *Promise*<any[]\>

a promise of a list of rows

Defined in: [database/index.ts:156](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L156)

___

### startTransaction

▸ **startTransaction**(`arg`: (`transactingClient`: [*DatabaseConnection*](database.databaseconnection.md)) => *Promise*<any\>): *Promise*<any\>

Starts a transaction, while handling rollbacks and everything

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | (`transactingClient`: [*DatabaseConnection*](database.databaseconnection.md)) => *Promise*<any\> | a function that returns anything and handles the transacting client   |

**Returns:** *Promise*<any\>

whatever you returned in your arg function

Defined in: [database/index.ts:232](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L232)

___

### suppressLogging

▸ **suppressLogging**(): *void*

Suppresses console logging

**Returns:** *void*

Defined in: [database/index.ts:76](https://github.com/onzag/itemize/blob/11a98dec/database/index.ts#L76)
