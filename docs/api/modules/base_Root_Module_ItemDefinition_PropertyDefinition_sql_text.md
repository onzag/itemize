[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql/text

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql/text

Provides the sql functions for use with the text type

## Table of contents

### Functions

- [textSQL](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsql)
- [textSQLBtreeIndexable](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsqlbtreeindexable)
- [textSQLIn](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsqlin)
- [textSQLOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsqlorderby)
- [textSQLSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsqlsearch)
- [textSQLStrSearch](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsqlstrsearch)
- [textSqlRedoDictionaryIndex](base_Root_Module_ItemDefinition_PropertyDefinition_sql_text.md#textsqlredodictionaryindex)

## Functions

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:16](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L16)

___

### textSQLBtreeIndexable

▸ **textSQLBtreeIndexable**(): `string`[]

Provides the btree indexable function for text type

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:216](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L216)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:55](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L55)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:202](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L202)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:129](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L129)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:172](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L172)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts:111](https://github.com/onzag/itemize/blob/f2f29986/base/Root/Module/ItemDefinition/PropertyDefinition/sql/text.ts#L111)
