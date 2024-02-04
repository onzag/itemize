[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/text

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/text

Provides the sql functions for use with the text type

## Table of contents

### Functions

- [textElastic](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textelastic)
- [textElasticIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textelasticin)
- [textElasticSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textelasticsearch)
- [textElasticStrSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textelasticstrsearch)
- [textSQL](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsql)
- [textSQLBtreeIndexable](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsqlbtreeindexable)
- [textSQLIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsqlin)
- [textSQLOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsqlorderby)
- [textSQLOut](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsqlout)
- [textSQLSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsqlsearch)
- [textSQLSelect](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsqlselect)
- [textSQLStrSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsqlstrsearch)
- [textSqlRedoDictionaryIndex](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsqlredodictionaryindex)

## Functions

### textElastic

▸ **textElastic**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `properties` | {} |

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:49](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L49)

___

### textElasticIn

▸ **textElasticIn**(`arg`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:347](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L347)

___

### textElasticSearch

▸ **textElasticSearch**(`arg`): `Object`

Provides the text sql search functionality

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`IElasticSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticSearchInfo.md) | the sql search arg info |

#### Returns

`Object`

a boolean on whether it was searched by it, and a complementary column order by in case it needs it

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:295](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L295)

___

### textElasticStrSearch

▸ **textElasticStrSearch**(`arg`): `Object`

Provides the text FTS str sql search functionality

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IElasticStrSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticStrSearchInfo.md) |

#### Returns

`Object`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:398](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L398)

___

### textSQL

▸ **textSQL**(`arg`): `Object`

Provides the sql form for the text type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) | the sql arg info |

#### Returns

`Object`

a partial row definition

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:17](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L17)

___

### textSQLBtreeIndexable

▸ **textSQLBtreeIndexable**(): `string`[]

Provides the btree indexable function for text type

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:455](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L455)

___

### textSQLIn

▸ **textSQLIn**(`arg`): `Object`

Provides the sql in functionality for the text type

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLInInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md) | the sql in arg info |

#### Returns

`Object`

a partial row value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:131](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L131)

___

### textSQLOrderBy

▸ **textSQLOrderBy**(`arg`): [`string`, `string`, `string`]

Provides the order by rule form

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLOrderByInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md) | the sql order by arg info |

#### Returns

[`string`, `string`, `string`]

the order by rule string array (or null) if not possible to order

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:441](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L441)

___

### textSQLOut

▸ **textSQLOut**(`arg`): [`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLOutInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) |

#### Returns

[`IPropertyDefinitionSupportedTextType`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types_text.IPropertyDefinitionSupportedTextType.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:98](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L98)

___

### textSQLSearch

▸ **textSQLSearch**(`arg`): `boolean` \| [`string`, `any`[]]

Provides the text sql search functionality

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSearchInfo.md) | the sql search arg info |

#### Returns

`boolean` \| [`string`, `any`[]]

a boolean on whether it was searched by it, and a complementary column order by in case it needs it

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:251](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L251)

___

### textSQLSelect

▸ **textSQLSelect**(`arg`): `string`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IArgInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md) |

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:42](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L42)

___

### textSQLStrSearch

▸ **textSQLStrSearch**(`arg`): `boolean` \| [`string`, `any`[]]

Provides the text FTS str sql search functionality

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLStrSearchInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLStrSearchInfo.md) | the sql str search arg info |

#### Returns

`boolean` \| [`string`, `any`[]]

a boolean on whether it was searched by it, and a complementary column order by in case it needs it

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:370](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L370)

___

### textSqlRedoDictionaryIndex

▸ **textSqlRedoDictionaryIndex**(`arg`): `Object`

Provides the sql in functionality for redoing sql based indexes

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ISQLRedoDictionaryBasedIndex`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLRedoDictionaryBasedIndex.md) | the sql in arg info |

#### Returns

`Object`

a partial row value

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:232](https://github.com/onzag/itemize/blob/73e0c39e/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L232)
