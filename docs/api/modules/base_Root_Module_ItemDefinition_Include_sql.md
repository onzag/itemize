[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/Include/sql

# Module: base/Root/Module/ItemDefinition/Include/sql

This file contains utility functionality that is necessary in order to
setup includes into and out of the postgresql database as well
as how to build the definition for the tables

## Table of contents

### Functions

- [buildSQLQueryForInclude](base_Root_Module_ItemDefinition_Include_sql.md#buildsqlqueryforinclude)
- [convertGQLValueToSQLValueForInclude](base_Root_Module_ItemDefinition_Include_sql.md#convertgqlvaluetosqlvalueforinclude)
- [convertSQLValueToGQLValueForInclude](base_Root_Module_ItemDefinition_Include_sql.md#convertsqlvaluetogqlvalueforinclude)
- [getSQLTableDefinitionForInclude](base_Root_Module_ItemDefinition_Include_sql.md#getsqltabledefinitionforinclude)

## Functions

### buildSQLQueryForInclude

▸ **buildSQLQueryForInclude**(`serverData`, `itemDefinition`, `include`, `args`, `whereBuilder`, `dictionary`): `void`

Builds a sql query for an include

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data information |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that contains the include |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include in question |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the args as they come from the search module, specific for this item (not nested) |
| `whereBuilder` | [`WhereBuilder`](../classes/database_WhereBuilder.WhereBuilder.md) | - |
| `dictionary` | `string` | the dictionary to use to build the search |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/Include/sql.ts:213](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/Include/sql.ts#L213)

___

### convertGQLValueToSQLValueForInclude

▸ **convertGQLValueToSQLValueForInclude**(`serverData`, `itemDefinition`, `include`, `data`, `oldData`, `uploadsClient`, `domain`, `dictionary`, `partialFields?`): [`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

Converts a GraphQL value into a SQL row data, it takes apart a complex
graphql value and converts it into a serializable sql form

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include in question |
| `data` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the graphql data value |
| `oldData` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) | the old graphql data value that used to be stored for that include |
| `uploadsClient` | [`default`](../classes/server_services_base_StorageProvider.default.md)<`any`\> | the uploads client |
| `domain` | `string` | - |
| `dictionary` | `string` | the dictionary to use in full text search mode |
| `partialFields?` | `any` | fields to make a partial value rather than a total value, note that we don't recommend using partial fields in order to create because some properties might treat nulls in a fancy way, when creating all the table rows should be set, only when updating you should use partial fields; for example, if you have a field that has a property that is nullable but it's forced into some value it will be ignored in a partial field value, don't use partial fields to create |

#### Returns

[`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

the partial sql result to be added into the table

#### Defined in

[base/Root/Module/ItemDefinition/Include/sql.ts:137](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/Include/sql.ts#L137)

___

### convertSQLValueToGQLValueForInclude

▸ **convertSQLValueToGQLValueForInclude**(`serverData`, `itemDefinition`, `include`, `row`, `graphqlFields?`): [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

Given a SQL row it converts the value of the data contained
within that row into the valid graphql output

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data that is currently in use |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | - |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include in question |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the row sql data |
| `graphqlFields?` | `any` | (optional) contains the only properties that are required in the request provided by grapql fields, eg {id: {}, name: {}} |

#### Returns

[`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

a partial graphql value

#### Defined in

[base/Root/Module/ItemDefinition/Include/sql.ts:75](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/Include/sql.ts#L75)

___

### getSQLTableDefinitionForInclude

▸ **getSQLTableDefinitionForInclude**(`itemDefinition`, `include`): [`ISQLTableDefinitionType`](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)

Provides the table bit that is necessary to store include data
for this include when included from the parent definition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that contains the include (not the referred) |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include in question |

#### Returns

[`ISQLTableDefinitionType`](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)

the partial table definition schema for the include, prefixed and with the exclusion state

#### Defined in

[base/Root/Module/ItemDefinition/Include/sql.ts:30](https://github.com/onzag/itemize/blob/5c2808d3/base/Root/Module/ItemDefinition/Include/sql.ts#L30)
