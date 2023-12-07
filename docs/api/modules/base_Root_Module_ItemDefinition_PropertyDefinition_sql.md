[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql

Contains SQL helper functions to be used within the property definition in order
to be able to perform searches of them in the database

## Table of contents

### Functions

- [buildElasticOrderByForInternalRequiredProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#buildelasticorderbyforinternalrequiredproperty)
- [buildElasticOrderByForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#buildelasticorderbyforproperty)
- [buildElasticQueryForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#buildelasticqueryforproperty)
- [buildElasticStrSearchQueryForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#buildelasticstrsearchqueryforproperty)
- [buildSQLOrderByForInternalRequiredProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#buildsqlorderbyforinternalrequiredproperty)
- [buildSQLOrderByForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#buildsqlorderbyforproperty)
- [buildSQLQueryForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#buildsqlqueryforproperty)
- [buildSQLStrSearchQueryForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#buildsqlstrsearchqueryforproperty)
- [convertGQLValueToSQLValueForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#convertgqlvaluetosqlvalueforproperty)
- [convertSQLValueToElasticSQLValueForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#convertsqlvaluetoelasticsqlvalueforproperty)
- [convertSQLValueToGQLValueForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#convertsqlvaluetogqlvalueforproperty)
- [getElasticSchemaForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#getelasticschemaforproperty)
- [getSQLTableDefinitionForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#getsqltabledefinitionforproperty)
- [getStandardElasticFor](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#getstandardelasticfor)
- [getStandardElasticForWithNullField](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#getstandardelasticforwithnullfield)
- [getStandardSQLFnFor](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#getstandardsqlfnfor)
- [standardElasticOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardelasticorderby)
- [standardElasticSearchFnExactAndRange](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardelasticsearchfnexactandrange)
- [standardElasticSearchFnWithNullFieldExactAndRange](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardelasticsearchfnwithnullfieldexactandrange)
- [standardSQLBtreeIndexable](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqlbtreeindexable)
- [standardSQLElasticInFn](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqlelasticinfn)
- [standardSQLEqualFn](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqlequalfn)
- [standardSQLInFn](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqlinfn)
- [standardSQLOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqlorderby)
- [standardSQLOutFn](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqloutfn)
- [standardSQLOutWithJSONParseFn](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqloutwithjsonparsefn)
- [standardSQLSearchFnExactAndRange](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqlsearchfnexactandrange)
- [standardSQLSelect](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqlselect)
- [stardardSQLInWithJSONStringifyFn](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#stardardsqlinwithjsonstringifyfn)

## Functions

### buildElasticOrderByForInternalRequiredProperty

▸ **buildElasticOrderByForInternalRequiredProperty**(`itemDefinition`, `which`, `args`, `direction`, `nulls`): `Object`

Builds the order by functionality for the internal properties, such as
created_at, edited_at, etc...

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition |
| `which` | `string` | basically the column name |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | - |
| `direction` | ``"asc"`` \| ``"desc"`` | the direction of the order by rule |
| `nulls` | ``"first"`` \| ``"last"`` | whether nulls are first or last |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:1088](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L1088)

___

### buildElasticOrderByForProperty

▸ **buildElasticOrderByForProperty**(`serverData`, `appData`, `itemDefinition`, `include`, `propertyDefinition`, `args`, `direction`, `nulls`, `wasIncludedInSearch`, `wasIncludedInStrSearch`): `any`

Builds an order by query for a given property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data that is being used |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include (or null) |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property in question |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | - |
| `direction` | ``"asc"`` \| ``"desc"`` | the direction to be accounted for |
| `nulls` | ``"first"`` \| ``"last"`` | the nulls (first or last) |
| `wasIncludedInSearch` | `boolean` | whether this property was included in search |
| `wasIncludedInStrSearch` | `boolean` | whether this property was included in the str FTS search |

#### Returns

`any`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:999](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L999)

___

### buildElasticQueryForProperty

▸ **buildElasticQueryForProperty**(`serverData`, `appData`, `itemDefinition`, `include`, `propertyDefinition`, `args`, `elasticQueryBuilder`, `language`, `dictionary`, `isOrderedByIt`): [`IElasticHighlightReply`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

Builds a sql search query from a given property definition, the data
coming from the search module, a sql prefix to use

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that contains the property |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include within the item definition, or null |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property definition in question |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the args coming from the search module in such format |
| `elasticQueryBuilder` | [`ElasticQueryBuilder`](../classes/server_elastic.ElasticQueryBuilder.md) | the elastic building instance |
| `language` | `string` | - |
| `dictionary` | `string` | the dictionary that is being used |
| `isOrderedByIt` | `boolean` | whether there will be a subsequent order by request |

#### Returns

[`IElasticHighlightReply`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:792](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L792)

___

### buildElasticStrSearchQueryForProperty

▸ **buildElasticStrSearchQueryForProperty**(`serverData`, `appData`, `itemDefinition`, `include`, `propertyDefinition`, `args`, `search`, `elasticQueryBuilder`, `language`, `dictionary`, `isOrderedByIt`): [`IElasticHighlightReply`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

Builds a sql str FTS search query from a given property definition, the data
coming from the search module, a sql prefix to use, and the builder

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that contains the property |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include within the item definition, or null |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property definition in question |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the args coming from the search module in such format |
| `search` | `string` | the search string that is being used |
| `elasticQueryBuilder` | [`ElasticQueryBuilder`](../classes/server_elastic.ElasticQueryBuilder.md) | the building instance |
| `language` | `string` | - |
| `dictionary` | `string` | the dictionary that is being used |
| `isOrderedByIt` | `boolean` | whether there will be a subsequent order by request |

#### Returns

[`IElasticHighlightReply`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:884](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L884)

___

### buildSQLOrderByForInternalRequiredProperty

▸ **buildSQLOrderByForInternalRequiredProperty**(`itemDefinition`, `which`, `args`, `orderByBuilder`, `direction`, `nulls`): `void`

Builds the order by functionality for the internal properties, such as
created_at, edited_at, etc...

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition |
| `which` | `string` | basically the column name |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | - |
| `orderByBuilder` | [`OrderByBuilder`](../classes/database_OrderByBuilder.OrderByBuilder.md) | the order by builder |
| `direction` | ``"asc"`` \| ``"desc"`` | the direction of the order by rule |
| `nulls` | ``"first"`` \| ``"last"`` | whether nulls are first or last |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:1046](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L1046)

___

### buildSQLOrderByForProperty

▸ **buildSQLOrderByForProperty**(`serverData`, `appData`, `itemDefinition`, `include`, `propertyDefinition`, `args`, `orderByBuilder`, `direction`, `nulls`, `wasIncludedInSearch`, `wasIncludedInStrSearch`): `void`

Builds an order by query for a given property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data that is being used |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include (or null) |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property in question |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | - |
| `orderByBuilder` | [`OrderByBuilder`](../classes/database_OrderByBuilder.OrderByBuilder.md) | the order by builder that is currently building the query |
| `direction` | ``"asc"`` \| ``"desc"`` | the direction to be accounted for |
| `nulls` | ``"first"`` \| ``"last"`` | the nulls (first or last) |
| `wasIncludedInSearch` | `boolean` | whether this property was included in search |
| `wasIncludedInStrSearch` | `boolean` | whether this property was included in the str FTS search |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:944](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L944)

___

### buildSQLQueryForProperty

▸ **buildSQLQueryForProperty**(`serverData`, `appData`, `itemDefinition`, `include`, `propertyDefinition`, `args`, `whereBuilder`, `language`, `dictionary`, `isOrderedByIt`): `boolean` \| [`string`, `any`[]]

Builds a sql search query from a given property definition, the data
coming from the search module, a sql prefix to use

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that contains the property |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include within the item definition, or null |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property definition in question |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the args coming from the search module in such format |
| `whereBuilder` | [`WhereBuilder`](../classes/database_WhereBuilder.WhereBuilder.md) | the where building instance |
| `language` | `string` | - |
| `dictionary` | `string` | the dictionary that is being used |
| `isOrderedByIt` | `boolean` | whether there will be a subsequent order by request |

#### Returns

`boolean` \| [`string`, `any`[]]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:752](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L752)

___

### buildSQLStrSearchQueryForProperty

▸ **buildSQLStrSearchQueryForProperty**(`serverData`, `appData`, `itemDefinition`, `include`, `propertyDefinition`, `args`, `search`, `whereBuilder`, `language`, `dictionary`, `isOrderedByIt`): `boolean` \| [`string`, `any`[]]

Builds a sql str FTS search query from a given property definition, the data
coming from the search module, a sql prefix to use, and the builder

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that contains the property |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include within the item definition, or null |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property definition in question |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the args coming from the search module in such format |
| `search` | `string` | the search string that is being used |
| `whereBuilder` | [`WhereBuilder`](../classes/database_WhereBuilder.WhereBuilder.md) | the where building instance |
| `language` | `string` | - |
| `dictionary` | `string` | the dictionary that is being used |
| `isOrderedByIt` | `boolean` | whether there will be a subsequent order by request |

#### Returns

`boolean` \| [`string`, `any`[]]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:838](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L838)

___

### convertGQLValueToSQLValueForProperty

▸ **convertGQLValueToSQLValueForProperty**(`serverData`, `appData`, `mod`, `itemDefinition`, `include`, `propertyDefinition`, `data`, `oldData`, `uploadsClient`, `domain`, `language`, `dictionary`): [`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

Converts a graphql value into a sql value, that is graphql data into row
data to be immediately added to the database as it is

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that contains the property |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include within the item definition, or null |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property definition in question |
| `data` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the graphql data |
| `oldData` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) | the old graphql data |
| `uploadsClient` | [`default`](../classes/server_services_base_StorageProvider.default.md)<`any`\> | - |
| `domain` | `string` | - |
| `language` | `string` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | - |
| `dictionary` | `string` \| [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the dictionary to use in full text search mode |

#### Returns

[`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

a composed value with a partial row value and the consume streams functionality
included in it

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:650](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L650)

___

### convertSQLValueToElasticSQLValueForProperty

▸ **convertSQLValueToElasticSQLValueForProperty**(`serverData`, `appData`, `itemDefinition`, `include`, `propertyDefinition`, `row`): [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `serverData` | `any` |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) |

#### Returns

[`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:612](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L612)

___

### convertSQLValueToGQLValueForProperty

▸ **convertSQLValueToGQLValueForProperty**(`serverData`, `appData`, `itemDefinition`, `include`, `propertyDefinition`, `row`): [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

Takes row data information that is in the SQL form and converts
it into a graphql form, only for this specific property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) | - |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that contains the property |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include within the item definition, or null |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property definition in question |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the row that we want to extract information from |

#### Returns

[`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

the graphql value for the property

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:551](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L551)

___

### getElasticSchemaForProperty

▸ **getElasticSchemaForProperty**(`itemDefinition`, `include`, `propertyDefinition`, `serverData`, `appData`): [`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) |
| `serverData` | `any` |
| `appData` | [`IAppDataType`](../interfaces/server.IAppDataType.md) |

#### Returns

[`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:516](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L516)

___

### getSQLTableDefinitionForProperty

▸ **getSQLTableDefinitionForProperty**(`itemDefinition`, `include`, `propertyDefinition`): [`ISQLTableDefinitionType`](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)

Provides the table bit that is necessary to include this property and
this property alone, that is a table bit

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that contains the property |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include within the item definition, or null |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property definition in question |

#### Returns

[`ISQLTableDefinitionType`](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)

the partial sql table definition for the property

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:496](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L496)

___

### getStandardElasticFor

▸ **getStandardElasticFor**(`type`, `nullValue`, `format?`, `disabled?`): (`arg`: [`IArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md)) => [`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `nullValue` | `any` |
| `format?` | `string` |
| `disabled?` | `boolean` |

#### Returns

`fn`

▸ (`arg`): [`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md) |

##### Returns

[`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:66](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L66)

___

### getStandardElasticForWithNullField

▸ **getStandardElasticForWithNullField**(`type`, `format?`, `disabled?`): (`arg`: [`IArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md)) => [`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `format?` | `string` |
| `disabled?` | `boolean` |

#### Returns

`fn`

▸ (`arg`): [`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md) |

##### Returns

[`IElasticIndexDefinitionType`](../interfaces/base_Root_sql.IElasticIndexDefinitionType.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:97](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L97)

___

### getStandardSQLFnFor

▸ **getStandardSQLFnFor**(`type`, `ext?`, `indexCalculator?`): (`arg`: [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md)) => [`ISQLTableDefinitionType`](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)

Provides the sql function that defines the schema that is used to build
the partial table definition

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `type` | `string` | `undefined` | the postgresql type |
| `ext` | `string` | `null` | a extension to require for this type |
| `indexCalculator?` | (`subtype`: `string`, `sqlPrefix`: `string`, `id`: `string`) => [`ISQLTableIndexType`](../interfaces/base_Root_sql.ISQLTableIndexType.md) | `undefined` | an function to decide how to build an index for this type |

#### Returns

`fn`

a function that returns the partial table definition object with the given type

▸ (`arg`): [`ISQLTableDefinitionType`](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)

Provides the sql function that defines the schema that is used to build
the partial table definition

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

##### Returns

[`ISQLTableDefinitionType`](../interfaces/base_Root_sql.ISQLTableDefinitionType.md)

a function that returns the partial table definition object with the given type

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:38](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L38)

___

### standardElasticOrderBy

▸ **standardElasticOrderBy**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLOrderByInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md) |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:133](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L133)

___

### standardElasticSearchFnExactAndRange

▸ **standardElasticSearchFnExactAndRange**(`nullFieldValue`, `arg`): `Object`

You must ensure no overlap in ranged search, if they are availbe in order
for this function to be useful, it will not pluck them out

#### Parameters

| Name | Type |
| :------ | :------ |
| `nullFieldValue` | `string` |
| `arg` | [`IElasticSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticSearchInfo.md) |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:448](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L448)

___

### standardElasticSearchFnWithNullFieldExactAndRange

▸ **standardElasticSearchFnWithNullFieldExactAndRange**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IElasticSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticSearchInfo.md) |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:452](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L452)

___

### standardSQLBtreeIndexable

▸ **standardSQLBtreeIndexable**(`arg`): `string`[]

The standard btree indexable column builder

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLBtreeIndexableInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLBtreeIndexableInfo.md) | the sql btree indexable arg |

#### Returns

`string`[]

an array of the columns to index

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:484](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L484)

___

### standardSQLElasticInFn

▸ **standardSQLElasticInFn**(`arg`): `any`

The standard sql elastic out that converts to the elastic
stored form

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) | the out arg info |

#### Returns

`any`

the property value out

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:265](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L265)

___

### standardSQLEqualFn

▸ **standardSQLEqualFn**(`arg`): `void`

The standard function that perfoms equality checks within the database

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLEqualInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLEqualInfo.md) | the equal info arg |

#### Returns

`void`

a valid args to use in the where expression or an object
for where many

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:462](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L462)

___

### standardSQLInFn

▸ **standardSQLInFn**(`arg`): [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)

The standard sql in function that specifies how a property inputs its value
into a table

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLInInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md) | the in arg |

#### Returns

[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)

the partial row value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:163](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L163)

___

### standardSQLOrderBy

▸ **standardSQLOrderBy**(`arg`): [`string`, `string`, `string`]

the standard order by functionality

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOrderByInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md) | the orer by info arg |

#### Returns

[`string`, `string`, `string`]

an array of string with the order by

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:129](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L129)

___

### standardSQLOutFn

▸ **standardSQLOutFn**(`fallbackNull`, `arg`): `any`

The standard sql out function that defines
how a value for a property is extracted from a given
row

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fallbackNull` | `any` | - |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) | the out arg info |

#### Returns

`any`

the property value out

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:224](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L224)

___

### standardSQLOutWithJSONParseFn

▸ **standardSQLOutWithJSONParseFn**(`fallbackNull`, `arg`): `any`

The standard sql out function that deserializes values
as they are expected to be stored serialized

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fallbackNull` | `any` | - |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) | the sql out info arg |

#### Returns

`any`

the supported type json parsed

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:277](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L277)

___

### standardSQLSearchFnExactAndRange

▸ **standardSQLSearchFnExactAndRange**(`arg`): `boolean`

The standard function that build queries for the property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSearchInfo.md) | the search info arg |

#### Returns

`boolean`

a boolean on whether it was searched by it

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:308](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L308)

___

### standardSQLSelect

▸ **standardSQLSelect**(`arg`): `string`[]

The standard sql select function that is used to select the minimum necessary
for a selection in a traditional search

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`IArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md) | the in arg |

#### Returns

`string`[]

the rows to select

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:145](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L145)

___

### stardardSQLInWithJSONStringifyFn

▸ **stardardSQLInWithJSONStringifyFn**(`arg`): [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)

The standard sql in function that inputs its value but
uses JSON stringify as a serialization tool

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLInInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md) | the in arg |

#### Returns

[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)

the partial row value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:203](https://github.com/onzag/itemize/blob/a24376ed/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L203)
