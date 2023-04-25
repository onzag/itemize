[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/sql

# Module: base/Root/Module/sql

This file contains the sql functionaly that is used within modules in order to perform
queries within the module itself as well as to define the parent module table that is
to be used in the item definition for properties in common

## Table of contents

### Functions

- [buildElasticQueryForModule](base_Root_Module_sql.md#buildelasticqueryformodule)
- [buildSQLQueryForModule](base_Root_Module_sql.md#buildsqlqueryformodule)
- [convertGQLValueToSQLValueForModule](base_Root_Module_sql.md#convertgqlvaluetosqlvalueformodule)
- [convertSQLValueToElasticSQLValueForModule](base_Root_Module_sql.md#convertsqlvaluetoelasticsqlvalueformodule)
- [convertSQLValueToGQLValueForModule](base_Root_Module_sql.md#convertsqlvaluetogqlvalueformodule)
- [getElasticSchemaForModule](base_Root_Module_sql.md#getelasticschemaformodule)
- [getSQLTableDefinitionForModule](base_Root_Module_sql.md#getsqltabledefinitionformodule)
- [getSQLTablesSchemaForModule](base_Root_Module_sql.md#getsqltablesschemaformodule)

## Functions

### buildElasticQueryForModule

▸ **buildElasticQueryForModule**(`serverData`, `appData`, `mod`, `args`, `elasticQueryBuilder`, `language`, `dictionary`, `search`, `orderBy`): [`IElasticHighlightReply`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

Builds a sql query specific for this module to search
within itself in the database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the args for the query from graphql |
| `elasticQueryBuilder` | [`ElasticQueryBuilder`](../classes/server_elastic.ElasticQueryBuilder.md) | the where builder |
| `language` | `string` | - |
| `dictionary` | `string` | the dictionary used |
| `search` | `string` | the search |
| `orderBy` | [`IOrderByRuleType`](../interfaces/constants.IOrderByRuleType.md) | the order by rule |

#### Returns

[`IElasticHighlightReply`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

#### Defined in

[base/Root/Module/sql.ts:499](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/sql.ts#L499)

___

### buildSQLQueryForModule

▸ **buildSQLQueryForModule**(`serverData`, `appData`, `mod`, `args`, `whereBuilder`, `orderByBuilder`, `language`, `dictionary`, `search`, `orderBy`): [`string`, `any`[]][]

Builds a sql query specific for this module to search
within itself in the database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the args for the query from graphql |
| `whereBuilder` | [`WhereBuilder`](../classes/database_WhereBuilder.WhereBuilder.md) | the where builder |
| `orderByBuilder` | [`OrderByBuilder`](../classes/database_OrderByBuilder.OrderByBuilder.md) | the order by builder |
| `language` | `string` | - |
| `dictionary` | `string` | the dictionary used |
| `search` | `string` | the search |
| `orderBy` | [`IOrderByRuleType`](../interfaces/constants.IOrderByRuleType.md) | the order by rule |

#### Returns

[`string`, `any`[]][]

#### Defined in

[base/Root/Module/sql.ts:389](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/sql.ts#L389)

___

### convertGQLValueToSQLValueForModule

▸ **convertGQLValueToSQLValueForModule**(`serverData`, `appData`, `mod`, `data`, `oldData`, `uploadsClient`, `domain`, `language`, `dictionary`, `partialFields?`): [`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

Converts a graphql value, with all its items and everything it
has into a SQL row data value for this specific module

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | - |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |
| `data` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the graphql data |
| `oldData` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) | the old stored value for this module |
| `uploadsClient` | [`default`](../classes/server_services_base_StorageProvider.default.md)<`any`\> | the uploads client |
| `domain` | `string` | - |
| `language` | `string` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | - |
| `dictionary` | `string` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the postgresql dictionary |
| `partialFields?` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) \| [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | fields to make a partial value rather than a total value, note that we don't recommend using partial fields in order to create because some properties might treat nulls in a fancy way, when creating all the table rows should be set, only when updating you should use partial fields; for example, if you have a field that has a property that is nullable but it's forced into some value it will be ignored in a partial field value, don't use partial fields to create |

#### Returns

[`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

the composed row value with the consume streams function

#### Defined in

[base/Root/Module/sql.ts:247](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/sql.ts#L247)

___

### convertSQLValueToElasticSQLValueForModule

▸ **convertSQLValueToElasticSQLValueForModule**(`serverData`, `appData`, `mod`, `row`): [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serverData` | `any` |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `mod` | [`default`](../classes/base_Root_Module.default.md) |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)

#### Defined in

[base/Root/Module/sql.ts:347](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/sql.ts#L347)

___

### convertSQLValueToGQLValueForModule

▸ **convertSQLValueToGQLValueForModule**(`serverData`, `appData`, `mod`, `row`, `graphqlFields`): [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

Converts a SQL value directly coming from the database as it is
to a graphql value for this specific module, this
only includes prop extensions and standard properties
and excludes everything else

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data information |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the row value, with all the columns it has; the row can be overblown with other field data, this will extract only the data required for this module |
| `graphqlFields` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | contains the only properties that are required in the request provided by grapql fields, eg {id: {}, name: {}} |

#### Returns

[`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

a graphql value

#### Defined in

[base/Root/Module/sql.ts:315](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/sql.ts#L315)

___

### getElasticSchemaForModule

▸ **getElasticSchemaForModule**(`mod`, `serverData`, `appData`): [`IElasticSchemaDefinitionType`](../interfaces/base_Root_sql.IElasticSchemaDefinitionType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mod` | [`default`](../classes/base_Root_Module.default.md) |
| `serverData` | `any` |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`IElasticSchemaDefinitionType`](../interfaces/base_Root_sql.IElasticSchemaDefinitionType.md)

#### Defined in

[base/Root/Module/sql.ts:36](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/sql.ts#L36)

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

[base/Root/Module/sql.ts:84](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/sql.ts#L84)

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

[base/Root/Module/sql.ts:208](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/sql.ts#L208)
