[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/sql

# Module: base/Root/Module/sql

This file contains the sql functionaly that is used within modules in order to perform
queries within the module itself as well as to define the parent module table that is
to be used in the item definition for properties in common

## Table of contents

### Functions

- [buildSQLQueryForModule](base_Root_Module_sql.md#buildsqlqueryformodule)
- [convertGQLValueToSQLValueForModule](base_Root_Module_sql.md#convertgqlvaluetosqlvalueformodule)
- [convertSQLValueToGQLValueForModule](base_Root_Module_sql.md#convertsqlvaluetogqlvalueformodule)
- [getSQLTableDefinitionForModule](base_Root_Module_sql.md#getsqltabledefinitionformodule)
- [getSQLTablesSchemaForModule](base_Root_Module_sql.md#getsqltablesschemaformodule)

## Functions

### buildSQLQueryForModule

▸ **buildSQLQueryForModule**(`serverData`, `mod`, `args`, `whereBuilder`, `orderByBuilder`, `dictionary`, `search`, `orderBy`): [`string`, `any`[]][]

Builds a sql query specific for this module to search
within itself in the database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the args for the query from graphql |
| `whereBuilder` | `WhereBuilder` | the where builder |
| `orderByBuilder` | `OrderByBuilder` | the order by builder |
| `dictionary` | `string` | the dictionary used |
| `search` | `string` | the search |
| `orderBy` | [`IOrderByRuleType`](../interfaces/constants.IOrderByRuleType.md) | the order by rule |

#### Returns

[`string`, `any`[]][]

#### Defined in

[base/Root/Module/sql.ts:302](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/sql.ts#L302)

___

### convertGQLValueToSQLValueForModule

▸ **convertGQLValueToSQLValueForModule**(`serverData`, `mod`, `data`, `oldData`, `uploadsClient`, `domain`, `dictionary`, `partialFields?`): [`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

Converts a graphql value, with all its items and everything it
has into a SQL row data value for this specific module

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | - |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |
| `data` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the graphql data |
| `oldData` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) | the old stored value for this module |
| `uploadsClient` | [`default`](../classes/server_services_base_StorageProvider.default.md)<`any`\> | the uploads client |
| `domain` | `string` | - |
| `dictionary` | `string` | the postgresql dictionary |
| `partialFields?` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) \| [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | fields to make a partial value rather than a total value, note that we don't recommend using partial fields in order to create because some properties might treat nulls in a fancy way, when creating all the table rows should be set, only when updating you should use partial fields; for example, if you have a field that has a property that is nullable but it's forced into some value it will be ignored in a partial field value, don't use partial fields to create |

#### Returns

[`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

the composed row value with the consume streams function

#### Defined in

[base/Root/Module/sql.ts:195](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/sql.ts#L195)

___

### convertSQLValueToGQLValueForModule

▸ **convertSQLValueToGQLValueForModule**(`serverData`, `mod`, `row`, `graphqlFields`): [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

Converts a SQL value directly coming from the database as it is
to a graphql value for this specific module, this
only includes prop extensions and standard properties
and excludes everything else

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data information |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the row value, with all the columns it has; the row can be overblown with other field data, this will extract only the data required for this module |
| `graphqlFields` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | contains the only properties that are required in the request provided by grapql fields, eg {id: {}, name: {}} |

#### Returns

[`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

a graphql value

#### Defined in

[base/Root/Module/sql.ts:259](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/sql.ts#L259)

___

### getSQLTableDefinitionForModule

▸ **getSQLTableDefinitionForModule**(`mod`): [`ISQLTableDefinitionType`](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)

Provides the table that is necesary to include this module and all
its children child definitions into it

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |

#### Returns

[`ISQLTableDefinitionType`](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)

a whole table schema for the module table

#### Defined in

[base/Root/Module/sql.ts:34](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/sql.ts#L34)

___

### getSQLTablesSchemaForModule

▸ **getSQLTablesSchemaForModule**(`mod`): [`ISQLSchemaDefinitionType`](../interfaces/base_Root_sql.ISQLSchemaDefinitionType.md)

Provides the SQL table schemas that are contained
within this module, you expect one schema per item definition
it contains

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |

#### Returns

[`ISQLSchemaDefinitionType`](../interfaces/base_Root_sql.ISQLSchemaDefinitionType.md)

a partial database schema for the module itself, all the child modules, and the item definition

#### Defined in

[base/Root/Module/sql.ts:156](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/sql.ts#L156)
