[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql

Contains SQL helper functions to be used within the property definition in order
to be able to perform searches of them in the database

## Table of contents

### Functions

- [buildSQLOrderByForInternalRequiredProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#buildsqlorderbyforinternalrequiredproperty)
- [buildSQLOrderByForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#buildsqlorderbyforproperty)
- [buildSQLQueryForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#buildsqlqueryforproperty)
- [buildSQLStrSearchQueryForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#buildsqlstrsearchqueryforproperty)
- [convertGQLValueToSQLValueForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#convertgqlvaluetosqlvalueforproperty)
- [convertSQLValueToGQLValueForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#convertsqlvaluetogqlvalueforproperty)
- [getSQLTableDefinitionForProperty](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#getsqltabledefinitionforproperty)
- [getStandardSQLFnFor](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#getstandardsqlfnfor)
- [standardSQLBtreeIndexable](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqlbtreeindexable)
- [standardSQLEqualFn](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqlequalfn)
- [standardSQLInFn](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqlinfn)
- [standardSQLOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqlorderby)
- [standardSQLOutFn](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqloutfn)
- [standardSQLOutWithJSONParseFn](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqloutwithjsonparsefn)
- [standardSQLSearchFnExactAndRange](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqlsearchfnexactandrange)
- [standardSQLSelect](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#standardsqlselect)
- [stardardSQLInWithJSONStringifyFn](base_Root_Module_ItemDefinition_PropertyDefinition_sql.md#stardardsqlinwithjsonstringifyfn)

## Functions

### buildSQLOrderByForInternalRequiredProperty

▸ **buildSQLOrderByForInternalRequiredProperty**(`itemDefinition`, `which`, `orderByBuilder`, `direction`, `nulls`): `void`

Builds the order by functionality for the internal properties, such as
created_at, edited_at, etc...

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition |
| `which` | `string` | basically the column name |
| `orderByBuilder` | `OrderByBuilder` | the order by builder |
| `direction` | ``"asc"`` \| ``"desc"`` | the direction of the order by rule |
| `nulls` | ``"first"`` \| ``"last"`` | whether nulls are first or last |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:559](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L559)

___

### buildSQLOrderByForProperty

▸ **buildSQLOrderByForProperty**(`serverData`, `itemDefinition`, `include`, `propertyDefinition`, `orderByBuilder`, `direction`, `nulls`, `wasIncludedInSearch`, `wasIncludedInStrSearch`): `void`

Builds an order by query for a given property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data that is being used |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition in question |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include (or null) |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property in question |
| `orderByBuilder` | `OrderByBuilder` | the order by builder that is currently building the query |
| `direction` | ``"asc"`` \| ``"desc"`` | the direction to be accounted for |
| `nulls` | ``"first"`` \| ``"last"`` | the nulls (first or last) |
| `wasIncludedInSearch` | `boolean` | whether this property was included in search |
| `wasIncludedInStrSearch` | `boolean` | whether this property was included in the str FTS search |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:510](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L510)

___

### buildSQLQueryForProperty

▸ **buildSQLQueryForProperty**(`serverData`, `itemDefinition`, `include`, `propertyDefinition`, `args`, `whereBuilder`, `dictionary`, `isOrderedByIt`): `boolean` \| [`string`, `any`[]]

Builds a sql search query from a given property definition, the data
coming from the search module, a sql prefix to use

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that contains the property |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include within the item definition, or null |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property definition in question |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the args coming from the search module in such format |
| `whereBuilder` | `WhereBuilder` | the where building instance |
| `dictionary` | `string` | the dictionary that is being used |
| `isOrderedByIt` | `boolean` | whether there will be a subsequent order by request |

#### Returns

`boolean` \| [`string`, `any`[]]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:419](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L419)

___

### buildSQLStrSearchQueryForProperty

▸ **buildSQLStrSearchQueryForProperty**(`serverData`, `itemDefinition`, `include`, `propertyDefinition`, `args`, `search`, `whereBuilder`, `dictionary`, `isOrderedByIt`): `boolean` \| [`string`, `any`[]]

Builds a sql str FTS search query from a given property definition, the data
coming from the search module, a sql prefix to use, and the builder

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that contains the property |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include within the item definition, or null |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property definition in question |
| `args` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the args coming from the search module in such format |
| `search` | `string` | the search string that is being used |
| `whereBuilder` | `WhereBuilder` | the where building instance |
| `dictionary` | `string` | the dictionary that is being used |
| `isOrderedByIt` | `boolean` | whether there will be a subsequent order by request |

#### Returns

`boolean` \| [`string`, `any`[]]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:456](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L456)

___

### convertGQLValueToSQLValueForProperty

▸ **convertGQLValueToSQLValueForProperty**(`serverData`, `mod`, `itemDefinition`, `include`, `propertyDefinition`, `data`, `oldData`, `uploadsClient`, `domain`, `dictionary`): [`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

Converts a graphql value into a sql value, that is graphql data into row
data to be immediately added to the database as it is

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that contains the property |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include within the item definition, or null |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property definition in question |
| `data` | [`IGQLArgs`](../interfaces/gql_querier.IGQLArgs.md) | the graphql data |
| `oldData` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) | the old graphql data |
| `uploadsClient` | [`default`](../classes/server_services_base_StorageProvider.default.md)<`any`\> | - |
| `domain` | `string` | - |
| `dictionary` | `string` | the dictionary to use in full text search mode |

#### Returns

[`ISQLStreamComposedTableRowValue`](../interfaces/base_Root_sql.ISQLStreamComposedTableRowValue.md)

a composed value with a partial row value and the consume streams functionality
included in it

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:321](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L321)

___

### convertSQLValueToGQLValueForProperty

▸ **convertSQLValueToGQLValueForProperty**(`serverData`, `itemDefinition`, `include`, `propertyDefinition`, `row`): [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

Takes row data information that is in the SQL form and converts
it into a graphql form, only for this specific property

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `serverData` | `any` | the server data |
| `itemDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition.default.md) | the item definition that contains the property |
| `include` | [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md) | the include within the item definition, or null |
| `propertyDefinition` | [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md) | the property definition in question |
| `row` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the row that we want to extract information from |

#### Returns

[`IGQLValue`](../interfaces/gql_querier.IGQLValue.md)

the graphql value for the property

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:246](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L246)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:217](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L217)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:36](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L36)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:205](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L205)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:183](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L183)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:92](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L92)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:69](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L69)

___

### standardSQLOutFn

▸ **standardSQLOutFn**(`arg`): `any`

The standard sql out function that defines
how a value for a property is extracted from a given
row

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) | the out arg info |

#### Returns

`any`

the property value out

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:123](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L123)

___

### standardSQLOutWithJSONParseFn

▸ **standardSQLOutWithJSONParseFn**(`arg`): `any`

The standard sql out function that deserializes values
as they are expected to be stored serialized

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) | the sql out info arg |

#### Returns

`any`

the supported type json parsed

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:133](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L133)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:150](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L150)

___

### standardSQLSelect

▸ **standardSQLSelect**(`arg`): `string`[]

The standard sql select function that is used to select the minimum necessary
for a selection in a traditional search

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) | the in arg |

#### Returns

`string`[]

the rows to select

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:79](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L79)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:105](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L105)
