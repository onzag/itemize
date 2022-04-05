[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/sql

# Module: base/Root/Module/ItemDefinition/sql

This file specifies all the sql executions functions that are used in order
to query item definitions from the postgresql database, refer to this file
once you need to figure out how resources are requested

## Table of contents

### Functions

- [buildSQLQueryForItemDefinition](base_Root_Module_ItemDefinition_sql.md#buildsqlqueryforitemdefinition)
- [convertGQLValueToSQLValueForItemDefinition](base_Root_Module_ItemDefinition_sql.md#convertgqlvaluetosqlvalueforitemdefinition)
- [convertSQLValueToGQLValueForItemDefinition](base_Root_Module_ItemDefinition_sql.md#convertsqlvaluetogqlvalueforitemdefinition)
- [getSQLTableDefinitionForItemDefinition](base_Root_Module_ItemDefinition_sql.md#getsqltabledefinitionforitemdefinition)
- [getSQLTablesSchemaForItemDefinition](base_Root_Module_ItemDefinition_sql.md#getsqltablesschemaforitemdefinition)

## Functions

### buildSQLQueryForItemDefinition

▸ **buildSQLQueryForItemDefinition**(`serverData`, `itemDefinition`, `args`, `whereBuilder`, `orderByBuilder`, `dictionary`, `search`, `orderBy`): [`string`, `any`[]][]

Builds a sql query for an item definition so that it can be
queried for searches

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that is being requested (normal form) |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the args from the search mode |
| `whereBuilder` | `WhereBuilder` | the where builder instance |
| `orderByBuilder` | `OrderByBuilder` | the order by builder instance |
| `dictionary` | `string` | the dictionary being used |
| `search` | `string` | the search arg value |
| `orderBy` | [`IOrderByRuleType`](../interfaces/constants.IOrderByRuleType.md) | the order by rules |

#### Returns

[`string`, `any`[]][]

a list of raw added selected fields

#### Defined in

[base/Root/Module/ItemDefinition/sql.ts:361](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/sql.ts#L361)

___

### convertGQLValueToSQLValueForItemDefinition

▸ **convertGQLValueToSQLValueForItemDefinition**(`serverData`, `itemDefinition`, `data`, `oldData`, `uploadsClient`, `domain`, `dictionary`, `partialFields?`): [`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

Converts a graphql value, with all its items and everything it
has into a SQL row data value for this specific item definition
it doesn't include its prop extensions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `data` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the graphql data |
| `oldData` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) | - |
| `uploadsClient` | [`default`](../classes/server_services_base_StorageProvider.default.md)<`any`\> | - |
| `domain` | `string` | - |
| `dictionary` | `string` | the dictionary to use in full text search mode |
| `partialFields?` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) \| [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | fields to make a partial value rather than a total value, note that we don't recommend using partial fields in order to create because some properties might treat nulls in a fancy way, when creating all the table rows should be set, only when updating you should use partial fields; for example, if you have a field that has a property that is nullable but it's forced into some value it will be ignored in a partial field value, don't use partial fields to create |

#### Returns

[`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

a sql value

#### Defined in

[base/Root/Module/ItemDefinition/sql.ts:270](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/sql.ts#L270)

___

### convertSQLValueToGQLValueForItemDefinition

▸ **convertSQLValueToGQLValueForItemDefinition**(`serverData`, `itemDefinition`, `row`, `graphqlFields?`): [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

Converts a SQL value directly coming from the database as it is
to a graphql value for this specific item definition,
this includes the prop extensions and the reserved base properties
This value is FLATTENED

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data we are working with |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the row value, with all the columns it has; the row can be overblown with other field data, this will extract only the data required for this item definition |
| `graphqlFields?` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | contains the only properties that are required in the request provided by grapql fields, eg {id: {}, name: {}, ITEM_kitten: {purrs: {}}} |

#### Returns

[`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

a graphql value

#### Defined in

[base/Root/Module/ItemDefinition/sql.ts:198](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/sql.ts#L198)

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

[base/Root/Module/ItemDefinition/sql.ts:47](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/sql.ts#L47)

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

[base/Root/Module/ItemDefinition/sql.ts:167](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/sql.ts#L167)
