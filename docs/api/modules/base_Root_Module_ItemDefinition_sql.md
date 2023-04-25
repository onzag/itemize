[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/sql

# Module: base/Root/Module/ItemDefinition/sql

This file specifies all the sql executions functions that are used in order
to query item definitions from the postgresql database, refer to this file
once you need to figure out how resources are requested

## Table of contents

### Functions

- [buildElasticQueryForItemDefinition](base_Root_Module_ItemDefinition_sql.md#buildelasticqueryforitemdefinition)
- [buildSQLQueryForItemDefinition](base_Root_Module_ItemDefinition_sql.md#buildsqlqueryforitemdefinition)
- [convertGQLValueToSQLValueForItemDefinition](base_Root_Module_ItemDefinition_sql.md#convertgqlvaluetosqlvalueforitemdefinition)
- [convertSQLValueToElasticSQLValueForItemDefinition](base_Root_Module_ItemDefinition_sql.md#convertsqlvaluetoelasticsqlvalueforitemdefinition)
- [convertSQLValueToGQLValueForItemDefinition](base_Root_Module_ItemDefinition_sql.md#convertsqlvaluetogqlvalueforitemdefinition)
- [getElasticSchemaForItemDefinition](base_Root_Module_ItemDefinition_sql.md#getelasticschemaforitemdefinition)
- [getSQLTableDefinitionForItemDefinition](base_Root_Module_ItemDefinition_sql.md#getsqltabledefinitionforitemdefinition)
- [getSQLTablesSchemaForItemDefinition](base_Root_Module_ItemDefinition_sql.md#getsqltablesschemaforitemdefinition)

## Functions

### buildElasticQueryForItemDefinition

▸ **buildElasticQueryForItemDefinition**(`serverData`, `appData`, `itemDefinition`, `args`, `elasticQueryBuilder`, `language`, `dictionary`, `search`, `orderBy`): [`IElasticHighlightReply`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

Builds a elastic query for an item definition so that it can be
queried for searches

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that is being requested (normal form) |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the args from the search mode |
| `elasticQueryBuilder` | [`ElasticQueryBuilder`](../classes/server_elastic.ElasticQueryBuilder.md) | the where builder instance |
| `language` | `string` | - |
| `dictionary` | `string` | the dictionary being used |
| `search` | `string` | the search arg value |
| `orderBy` | [`IOrderByRuleType`](../interfaces/constants.IOrderByRuleType.md) | the order by rules |

#### Returns

[`IElasticHighlightReply`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

a list of raw added selected fields

#### Defined in

[base/Root/Module/ItemDefinition/sql.ts:627](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/sql.ts#L627)

___

### buildSQLQueryForItemDefinition

▸ **buildSQLQueryForItemDefinition**(`serverData`, `appData`, `itemDefinition`, `args`, `whereBuilder`, `orderByBuilder`, `language`, `dictionary`, `search`, `orderBy`): [`string`, `any`[]][]

Builds a sql query for an item definition so that it can be
queried for searches

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that is being requested (normal form) |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the args from the search mode |
| `whereBuilder` | [`WhereBuilder`](../classes/database_WhereBuilder.WhereBuilder.md) | the where builder instance |
| `orderByBuilder` | [`OrderByBuilder`](../classes/database_OrderByBuilder.OrderByBuilder.md) | the order by builder instance |
| `language` | `string` | - |
| `dictionary` | `string` | the dictionary being used |
| `search` | `string` | the search arg value |
| `orderBy` | [`IOrderByRuleType`](../interfaces/constants.IOrderByRuleType.md) | the order by rules |

#### Returns

[`string`, `any`[]][]

a list of raw added selected fields

#### Defined in

[base/Root/Module/ItemDefinition/sql.ts:475](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/sql.ts#L475)

___

### convertGQLValueToSQLValueForItemDefinition

▸ **convertGQLValueToSQLValueForItemDefinition**(`serverData`, `appData`, `itemDefinition`, `data`, `oldData`, `uploadsClient`, `domain`, `language`, `dictionary`, `partialFields?`): [`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

Converts a graphql value, with all its items and everything it
has into a SQL row data value for this specific item definition
it doesn't include its prop extensions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `data` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the graphql data |
| `oldData` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) | - |
| `uploadsClient` | [`default`](../classes/server_services_base_StorageProvider.default.md)<`any`\> | - |
| `domain` | `string` | - |
| `language` | `string` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | - |
| `dictionary` | `string` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the dictionary to use in full text search mode |
| `partialFields?` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) \| [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | fields to make a partial value rather than a total value, note that we don't recommend using partial fields in order to create because some properties might treat nulls in a fancy way, when creating all the table rows should be set, only when updating you should use partial fields; for example, if you have a field that has a property that is nullable but it's forced into some value it will be ignored in a partial field value, don't use partial fields to create |

#### Returns

[`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

a sql value

#### Defined in

[base/Root/Module/ItemDefinition/sql.ts:378](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/sql.ts#L378)

___

### convertSQLValueToElasticSQLValueForItemDefinition

▸ **convertSQLValueToElasticSQLValueForItemDefinition**(`serverData`, `appData`, `itemDefinition`, `row`): [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serverData` | `any` |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

[`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

#### Defined in

[base/Root/Module/ItemDefinition/sql.ts:315](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/sql.ts#L315)

___

### convertSQLValueToGQLValueForItemDefinition

▸ **convertSQLValueToGQLValueForItemDefinition**(`serverData`, `appData`, `itemDefinition`, `row`, `graphqlFields?`): [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

Converts a SQL value directly coming from the database as it is
to a graphql value for this specific item definition,
this includes the prop extensions and the reserved base properties
This value is FLATTENED

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data we are working with |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the row value, with all the columns it has; the row can be overblown with other field data, this will extract only the data required for this item definition |
| `graphqlFields?` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | contains the only properties that are required in the request provided by grapql fields, eg {id: {}, name: {}, ITEM_kitten: {purrs: {}}} |

#### Returns

[`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

a graphql value

#### Defined in

[base/Root/Module/ItemDefinition/sql.ts:260](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/sql.ts#L260)

___

### getElasticSchemaForItemDefinition

▸ **getElasticSchemaForItemDefinition**(`itemDefinition`, `moduleIndexSchema`, `serverData`, `appData`): [`IElasticSchemaDefinitionType`](../interfaces/base_Root_sql.IElasticSchemaDefinitionType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `moduleIndexSchema` | [`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md) |
| `serverData` | `any` |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`IElasticSchemaDefinitionType`](../interfaces/base_Root_sql.IElasticSchemaDefinitionType.md)

#### Defined in

[base/Root/Module/ItemDefinition/sql.ts:50](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/sql.ts#L50)

___

### getSQLTableDefinitionForItemDefinition

▸ **getSQLTableDefinitionForItemDefinition**(`itemDefinition`): [`ISQLTableDefinitionType`](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)

Provides the table that is necesary to include this item definition as a whole
that is, this represents a whole table, that is necessary for this item to
be saved when populated, it basically adds up all the table bits
from all the properties and all the items, this does not include
prop extensions nor module level properties, nor base

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |

#### Returns

[`ISQLTableDefinitionType`](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)

a complete table definition type

#### Defined in

[base/Root/Module/ItemDefinition/sql.ts:107](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/sql.ts#L107)

___

### getSQLTablesSchemaForItemDefinition

▸ **getSQLTablesSchemaForItemDefinition**(`itemDefinition`): [`ISQLSchemaDefinitionType`](../interfaces/base_Root_sql.ISQLSchemaDefinitionType.md)

Provides all the schema of all the items, self and its children
that are included within this item definition and all the table names
that should be used using the qualified name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |

#### Returns

[`ISQLSchemaDefinitionType`](../interfaces/base_Root_sql.ISQLSchemaDefinitionType.md)

a partial sql schema definition for the whole database (adds tables)

#### Defined in

[base/Root/Module/ItemDefinition/sql.ts:229](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/sql.ts#L229)
