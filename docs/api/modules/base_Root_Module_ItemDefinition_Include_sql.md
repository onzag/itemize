[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/Include/sql

# Module: base/Root/Module/ItemDefinition/Include/sql

This file contains utility functionality that is necessary in order to
setup includes into and out of the postgresql database as well
as how to build the definition for the tables

## Table of contents

### Functions

- [buildElasticQueryForInclude](base_Root_Module_ItemDefinition_Include_sql.md#buildelasticqueryforinclude)
- [buildSQLQueryForInclude](base_Root_Module_ItemDefinition_Include_sql.md#buildsqlqueryforinclude)
- [convertRQValueToSQLValueForInclude](base_Root_Module_ItemDefinition_Include_sql.md#convertrqvaluetosqlvalueforinclude)
- [convertSQLValueToElasticSQLValueForInclude](base_Root_Module_ItemDefinition_Include_sql.md#convertsqlvaluetoelasticsqlvalueforinclude)
- [convertSQLValueToRQValueForInclude](base_Root_Module_ItemDefinition_Include_sql.md#convertsqlvaluetorqvalueforinclude)
- [getElasticSchemaForInclude](base_Root_Module_ItemDefinition_Include_sql.md#getelasticschemaforinclude)
- [getSQLTableDefinitionForInclude](base_Root_Module_ItemDefinition_Include_sql.md#getsqltabledefinitionforinclude)

## Functions

### buildElasticQueryForInclude

▸ **buildElasticQueryForInclude**(`serverData`, `appData`, `itemDefinition`, `include`, `args`, `elasticQueryBuilder`, `language`, `dictionary`, `fullHighlights`): `void`

Builds a sql query for an include

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data information |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that contains the include |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include in question |
| `args` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) | the args as they come from the search module, specific for this item (not nested) |
| `elasticQueryBuilder` | [`ElasticQueryBuilder`](../classes/server_elastic.ElasticQueryBuilder.md) | - |
| `language` | `string` | - |
| `dictionary` | `string` | the dictionary to use to build the search |
| `fullHighlights` | `number` | - |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/Include/sql.ts:369](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/sql.ts#L369)

___

### buildSQLQueryForInclude

▸ **buildSQLQueryForInclude**(`serverData`, `appData`, `itemDefinition`, `include`, `args`, `whereBuilder`, `language`, `dictionary`): `void`

Builds a sql query for an include

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data information |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that contains the include |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include in question |
| `args` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) | the args as they come from the search module, specific for this item (not nested) |
| `whereBuilder` | [`WhereBuilder`](../classes/database_WhereBuilder.WhereBuilder.md) | - |
| `language` | `string` | - |
| `dictionary` | `string` | the dictionary to use to build the search |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/Include/sql.ts:302](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/sql.ts#L302)

___

### convertRQValueToSQLValueForInclude

▸ **convertRQValueToSQLValueForInclude**(`serverData`, `appData`, `itemDefinition`, `include`, `data`, `oldData`, `uploadsClient`, `domain`, `language`, `dictionary`, `partialFields?`): [`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

Converts a rq value into a SQL row data, it takes apart a complex
rq value and converts it into a serializable sql form

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include in question |
| `data` | [`IRQArgs`](../interfaces/rq_querier.IRQArgs.md) | the rq data value |
| `oldData` | [`IRQValue`](../interfaces/rq_querier.IRQValue.md) | the old rq data value that used to be stored for that include |
| `uploadsClient` | [`default`](../classes/server_services_base_StorageProvider.default.md)\<`any`\> | the uploads client |
| `domain` | `string` | - |
| `language` | `string` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | - |
| `dictionary` | `string` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the dictionary to use in full text search mode |
| `partialFields?` | `any` | fields to make a partial value rather than a total value, note that we don't recommend using partial fields in order to create because some properties might treat nulls in a fancy way, when creating all the table rows should be set, only when updating you should use partial fields; for example, if you have a field that has a property that is nullable but it's forced into some value it will be ignored in a partial field value, don't use partial fields to create |

#### Returns

[`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

the partial sql result to be added into the table

#### Defined in

[base/Root/Module/ItemDefinition/Include/sql.ts:222](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/sql.ts#L222)

___

### convertSQLValueToElasticSQLValueForInclude

▸ **convertSQLValueToElasticSQLValueForInclude**(`serverData`, `appData`, `itemDefinition`, `include`, `row`): [`IRQValue`](../interfaces/rq_querier.IRQValue.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serverData` | `any` |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

[`IRQValue`](../interfaces/rq_querier.IRQValue.md)

#### Defined in

[base/Root/Module/ItemDefinition/Include/sql.ts:172](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/sql.ts#L172)

___

### convertSQLValueToRQValueForInclude

▸ **convertSQLValueToRQValueForInclude**(`serverData`, `appData`, `itemDefinition`, `include`, `row`, `rqFields?`): [`IRQValue`](../interfaces/rq_querier.IRQValue.md)

Given a SQL row it converts the value of the data contained
within that row into the valid rq output

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data that is currently in use |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | - |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include in question |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the row sql data |
| `rqFields?` | `any` | (optional) contains the only properties that are required in the request provided by grapql fields, eg {id: {}, name: {}} |

#### Returns

[`IRQValue`](../interfaces/rq_querier.IRQValue.md)

a partial rq value

#### Defined in

[base/Root/Module/ItemDefinition/Include/sql.ts:127](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/sql.ts#L127)

___

### getElasticSchemaForInclude

▸ **getElasticSchemaForInclude**(`itemDefinition`, `include`, `serverData`, `appData`): [`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) |
| `serverData` | `any` |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md)

#### Defined in

[base/Root/Module/ItemDefinition/Include/sql.ts:28](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/sql.ts#L28)

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

[base/Root/Module/ItemDefinition/Include/sql.ts:82](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/Include/sql.ts#L82)
