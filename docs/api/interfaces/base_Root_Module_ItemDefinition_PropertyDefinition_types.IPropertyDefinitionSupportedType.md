[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition/types](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md) / IPropertyDefinitionSupportedType

# Interface: IPropertyDefinitionSupportedType\<T\>

[base/Root/Module/ItemDefinition/PropertyDefinition/types](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md).IPropertyDefinitionSupportedType

How every supported type behaviour should be described

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Properties

- [allowsMaxDecimalCountDefined](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#allowsmaxdecimalcountdefined)
- [allowsMinMaxDefined](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#allowsminmaxdefined)
- [allowsMinMaxLengthDefined](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#allowsminmaxlengthdefined)
- [configOptions](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#configoptions)
- [elastic](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#elastic)
- [elasticSearch](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#elasticsearch)
- [elasticSort](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#elasticsort)
- [elasticStrSearch](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#elasticstrsearch)
- [getNullValue](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#getnullvalue)
- [i18n](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#i18n)
- [isNull](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#isnull)
- [json](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#json)
- [localEqual](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#localequal)
- [localOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#localorderby)
- [localSearch](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#localsearch)
- [localStrSearch](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#localstrsearch)
- [ownLanguageProperty](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#ownlanguageproperty)
- [requiresValues](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#requiresvalues)
- [rq](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#rq)
- [rqRepresentsFile](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#rqrepresentsfile)
- [searchInterface](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#searchinterface)
- [searchable](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#searchable)
- [sql](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#sql)
- [sqlBtreeIndexable](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#sqlbtreeindexable)
- [sqlElasticIn](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#sqlelasticin)
- [sqlEqual](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#sqlequal)
- [sqlIn](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#sqlin)
- [sqlMantenience](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#sqlmantenience)
- [sqlOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#sqlorderby)
- [sqlOut](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#sqlout)
- [sqlPreSideEffect](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#sqlpresideeffect)
- [sqlRedoDictionaryIndex](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#sqlredodictionaryindex)
- [sqlSSCacheEqual](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#sqlsscacheequal)
- [sqlSearch](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#sqlsearch)
- [sqlSelect](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#sqlselect)
- [sqlSideEffect](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#sqlsideeffect)
- [sqlStrSearch](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#sqlstrsearch)
- [supportedSubtypes](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#supportedsubtypes)
- [validate](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#validate)

## Properties

### allowsMaxDecimalCountDefined

• `Optional` **allowsMaxDecimalCountDefined**: `boolean`

whether a max decimal count can be specified use it if the value is numeric
and contains decimal

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:465](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L465)

___

### allowsMinMaxDefined

• `Optional` **allowsMinMaxDefined**: `boolean`

whether a min and max value can be defined, use it if the value is in
some way numeric

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:460](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L460)

___

### allowsMinMaxLengthDefined

• `Optional` **allowsMinMaxLengthDefined**: `boolean`

whether a max length can be defined, use it if the value is not an scalar of sort
but a combination of things, eg. characters, files,

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:470](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L470)

___

### configOptions

• `Optional` **configOptions**: \{ `name`: `string` ; `required?`: `boolean` \| `string`[] ; `type`: ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"any"`` \| ``"property-set"`` \| ``"array-string"`` \| ``"array-number"`` \| ``"array-boolean"``  }[]

special attributes that might be added specific to that type

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:451](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L451)

___

### elastic

• **elastic**: (`arg`: [`ISQLArgInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md)) => [`IElasticIndexDefinitionType`](base_Root_sql.IElasticIndexDefinitionType.md)

#### Type declaration

▸ (`arg`): [`IElasticIndexDefinitionType`](base_Root_sql.IElasticIndexDefinitionType.md)

elastic index definition for the property
it's used inside the mappings for creating the elastic index

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

##### Returns

[`IElasticIndexDefinitionType`](base_Root_sql.IElasticIndexDefinitionType.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:288](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L288)

___

### elasticSearch

• **elasticSearch**: (`arg`: [`IElasticSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticSearchInfo.md)) => [`IElasticHighlightReply`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

#### Type declaration

▸ (`arg`): [`IElasticHighlightReply`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

Defines how to perform elastic search into the property

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IElasticSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticSearchInfo.md) |

##### Returns

[`IElasticHighlightReply`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:328](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L328)

___

### elasticSort

• **elasticSort**: (`arg`: [`ISQLOrderByInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md)) => `any`

#### Type declaration

▸ (`arg`): `any`

similar to sql order by but done against elasticsearch sort
you must return values that are valid for sort as they will
be appended to the array of sort that elasticsearch expects

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLOrderByInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md) |

##### Returns

`any`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:383](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L383)

___

### elasticStrSearch

• **elasticStrSearch**: (`arg`: [`IElasticStrSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticStrSearchInfo.md)) => [`IElasticHighlightReply`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

#### Type declaration

▸ (`arg`): [`IElasticHighlightReply`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

Represents a str based search using the elastic interface

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IElasticStrSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticStrSearchInfo.md) |

##### Returns

[`IElasticHighlightReply`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:338](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L338)

___

### getNullValue

• `Optional` **getNullValue**: (`value`: `T`) => `T`

#### Type declaration

▸ (`value`): `T`

use to establish the value for null, by default it is null

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`T`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:432](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L432)

___

### i18n

• **i18n**: `Object`

i18n supported and expected attributes
they won't be requested at all for hidden and not searchable items
if the item has a range it should be specified too
these will be used for checking more than anything

#### Type declaration

| Name | Type |
| :------ | :------ |
| `base` | `string`[] |
| `invalidSubtypeErrorInclude?` | `boolean` \| `string`[] |
| `optional` | `string`[] |
| `searchBase?` | `string`[] |
| `searchOptional?` | `string`[] |
| `searchRange?` | `string`[] |
| `searchRangeDisabled?` | `string`[] |
| `searchRangeDisabledOptional?` | `string`[] |
| `searchRangeOptional?` | `string`[] |
| `tooLargeErrorInclude?` | `boolean` \| `string`[] |
| `tooManyDecimalsErrorInclude?` | `boolean` \| `string`[] |
| `tooSmallErrorInclude?` | `boolean` \| `string`[] |

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:481](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L481)

___

### isNull

• `Optional` **isNull**: (`value`: `T`) => `boolean`

#### Type declaration

▸ (`value`): `boolean`

Use this function to
establish when a field will be considered null

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:427](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L427)

___

### json

• `Optional` **json**: ``"string"`` \| ``"number"`` \| ``"boolean"``

json represents how the element is represented in json form
objects are not allowed only boolean numbers and strings are
these are used for types that are allowed to be used by
enforcedProperties and predefinedProperties, it is optional
as types that are not settable do not have a json form

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:243](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L243)

___

### localEqual

• **localEqual**: (`arg`: [`ILocalEqualInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalEqualInfo.md)\<`T`\>) => `boolean`

#### Type declaration

▸ (`arg`): `boolean`

Simply compare two values of the same type, this
is used for differing properties so it might differ
from the sql behaviour

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ILocalEqualInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalEqualInfo.md)\<`T`\> |

##### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:371](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L371)

___

### localOrderBy

• **localOrderBy**: (`arg`: [`ILocalOrderByInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalOrderByInfo.md)\<`T`\>) => `number`

#### Type declaration

▸ (`arg`): `number`

The local order by function that tells a client how to order by it
basically this is fed to a sort function the same way sorting would
work locally, except a direction is specified, make it null to specify
the item can't be sorted by

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ILocalOrderByInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalOrderByInfo.md)\<`T`\> |

##### Returns

`number`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:390](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L390)

___

### localSearch

• **localSearch**: (`arg`: [`ILocalSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalSearchInfo.md)) => `boolean`

#### Type declaration

▸ (`arg`): `boolean`

represents a local search checkup performed locally with a rq value
raw (that is with DATA) the property id and the include id, the args are
the same

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ILocalSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalSearchInfo.md) |

##### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:349](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L349)

___

### localStrSearch

• **localStrSearch**: (`arg`: [`ILocalStrSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalStrSearchInfo.md)) => `boolean`

#### Type declaration

▸ (`arg`): `boolean`

represents a local search but done using the single search value instead rather
than the entire value to match against, make it null to avoid supporting it

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ILocalStrSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalStrSearchInfo.md) |

##### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:354](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L354)

___

### ownLanguageProperty

• `Optional` **ownLanguageProperty**: `string`

whether it has an own language property

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:253](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L253)

___

### requiresValues

• `Optional` **requiresValues**: `boolean` \| `string`[]

This field is required to have specified specific values

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:474](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L474)

___

### rq

• **rq**: [`RQField`](base_Root_rq.RQField.md)

The rq type

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:257](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L257)

___

### rqRepresentsFile

• `Optional` **rqRepresentsFile**: `boolean`

Whether it currently represents a rq file
within the structure that is ought to be processed
by file manageent

such field must therefore contain
id string
name string
metadata string
url string
src binary
size integer-positive

to fit in the IRQFile structure

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:273](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L273)

___

### searchInterface

• `Optional` **searchInterface**: [`PropertyDefinitionSearchInterfacesType`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition_search_interfaces.PropertyDefinitionSearchInterfacesType.md)

the search interface used, should be specified if searchable
otherwise it would mess up

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:447](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L447)

___

### searchable

• **searchable**: `boolean`

whether it is searchable or not

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:442](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L442)

___

### sql

• **sql**: (`arg`: [`ISQLArgInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md)) => [`ISQLTableDefinitionType`](base_Root_sql.ISQLTableDefinitionType.md)

#### Type declaration

▸ (`arg`): [`ISQLTableDefinitionType`](base_Root_sql.ISQLTableDefinitionType.md)

sql definition
or a function where the id is the id is a property id
this represents how tables are populated and data is stored
a simple type simply saves the id, say it's a number, so
the row name will be property_id and the type will be number
however if it's a complex value you might need to set the row
names and their types by hand

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

##### Returns

[`ISQLTableDefinitionType`](base_Root_sql.ISQLTableDefinitionType.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:283](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L283)

___

### sqlBtreeIndexable

• **sqlBtreeIndexable**: (`arg`: [`ISQLBtreeIndexableInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLBtreeIndexableInfo.md)) => `string`[]

#### Type declaration

▸ (`arg`): `string`[]

Provides the rows that are expected to be indexed and in the order that they are expected
when an index is added via a request limiter in the module

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLBtreeIndexableInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLBtreeIndexableInfo.md) |

##### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:343](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L343)

___

### sqlElasticIn

• **sqlElasticIn**: (`arg`: [`ISQLOutInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md)) => [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

#### Type declaration

▸ (`arg`): [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

Defines how data is to be stored in elasticsearch
similar to sql in in how it works

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLOutInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) |

##### Returns

[`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:312](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L312)

___

### sqlEqual

• **sqlEqual**: (`arg`: [`ISQLEqualInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLEqualInfo.md)) => `void`

#### Type declaration

▸ (`arg`): `void`

Represents a check for equality of a property against another
same with the sql prefix as the search

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLEqualInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLEqualInfo.md) |

##### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:359](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L359)

___

### sqlIn

• **sqlIn**: (`arg`: [`ISQLInInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md)) => [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

#### Type declaration

▸ (`arg`): [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

specifies how data is stored, by default it just sets the row value
to whatever is given, however if you have a complex value you should
set this, that allows to build raw queries,
by default if not set this function just sets {property_id: value}

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLInInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md) |

##### Returns

[`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:301](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L301)

___

### sqlMantenience

• **sqlMantenience**: (`arg`: [`ISQLArgInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md)) => [`ISQLMantenienceType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLMantenienceType.md)

#### Type declaration

▸ (`arg`): [`ISQLMantenienceType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLMantenienceType.md)

SQL Row mantenience which runs every so often as defined
by the mantenience protocol where row is the entire row
and it expects a partial value, this value should be null
for fields without mantenience

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

##### Returns

[`ISQLMantenienceType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLMantenienceType.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:397](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L397)

___

### sqlOrderBy

• **sqlOrderBy**: (`arg`: [`ISQLOrderByInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md)) => [`string`, `string`, `string`]

#### Type declaration

▸ (`arg`): [`string`, `string`, `string`]

The SQL order by function that tells the database how to order
by certain criteria, make it null to specify that this item can't
be ordered by, attempts to order by it will give an error

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLOrderByInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md) |

##### Returns

[`string`, `string`, `string`]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:377](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L377)

___

### sqlOut

• **sqlOut**: (`arg`: [`ISQLOutInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md)) => `T`

#### Type declaration

▸ (`arg`): `T`

sqlOut basically gives the entire table as data, and the property id where it expects
retrieval of that data; by default this function takes the table and does
data[property_id]

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLOutInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) |

##### Returns

`T`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:307](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L307)

___

### sqlPreSideEffect

• `Optional` **sqlPreSideEffect**: (`arg`: [`ISQLSideEffectType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md)\<`T`\>) => `string` \| `boolean` \| `Promise`\<`string` \| `boolean`\>

#### Type declaration

▸ (`arg`): `string` \| `boolean` \| `Promise`\<`string` \| `boolean`\>

Allows to specify side effects that occur on the server side
before the type has been modified

The main function is to prevent unwanted modifications or setup
fields that have certain rules to them, for example a XML only field
in a type, or a JSON specific one, etc...

Because of the nature of the pre side effecct it is unable to run
on delete as it's too expensive because of deletition cascading

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLSideEffectType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md)\<`T`\> |

##### Returns

`string` \| `boolean` \| `Promise`\<`string` \| `boolean`\>

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:421](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L421)

___

### sqlRedoDictionaryIndex

• `Optional` **sqlRedoDictionaryIndex**: (`arg`: [`ISQLRedoDictionaryBasedIndex`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLRedoDictionaryBasedIndex.md)) => [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

#### Type declaration

▸ (`arg`): [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

SQL to redo the dictionary based index

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLRedoDictionaryBasedIndex`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLRedoDictionaryBasedIndex.md) |

##### Returns

[`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:402](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L402)

___

### sqlSSCacheEqual

• **sqlSSCacheEqual**: (`arg`: [`ISQLSSCacheEqualInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSSCacheEqualInfo.md)) => `boolean`

#### Type declaration

▸ (`arg`): `boolean`

A server side ran cached equal, ran during cache checks very useful for checking
against policies during policy checks and other forms of checks
with raw database data

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLSSCacheEqualInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSSCacheEqualInfo.md) |

##### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:365](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L365)

___

### sqlSearch

• **sqlSearch**: (`arg`: [`ISQLSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSearchInfo.md)) => `boolean` \| [`string`, `any`[]]

#### Type declaration

▸ (`arg`): `boolean` \| [`string`, `any`[]]

Represents a search for an item
data is the rq value obtained from the search query mode item definition
sqlPrefix is a prefix that everything is prefixed in sql, usually for the item
id is the id of the property
whereBuilder is the builder that is being used so it can attach the where queries to it
and dictionary is the postgres dictionary that can be used for sql searches
return a boolean on whether it searched by it or it didn't
you might also return an array instead of true for adding custom rows to be added
to the selection, these represent arguments for a raw select query

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSearchInfo.md) |

##### Returns

`boolean` \| [`string`, `any`[]]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:324](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L324)

___

### sqlSelect

• **sqlSelect**: (`arg`: [`IArgInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md)) => `string`[]

#### Type declaration

▸ (`arg`): `string`[]

On a simple search what fields should be selected that are
the minimum necessary to perform a selection, this is used
for traditional search mainly

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IArgInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IArgInfo.md) |

##### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:294](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L294)

___

### sqlSideEffect

• `Optional` **sqlSideEffect**: (`arg`: [`ISQLSideEffectType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md)\<`T`\>) => `void`

#### Type declaration

▸ (`arg`): `void`

Allows to specify side effects that occur on the server side
once the type has been modified

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLSideEffectType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md)\<`T`\> |

##### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:408](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L408)

___

### sqlStrSearch

• **sqlStrSearch**: (`arg`: [`ISQLStrSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLStrSearchInfo.md)) => `boolean` \| [`string`, `any`[]]

#### Type declaration

▸ (`arg`): `boolean` \| [`string`, `any`[]]

Represents a search for an item when the only input has been a string, make it null
to avoid supporting it
return a boolean on whether it searched by it or it didn't

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLStrSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLStrSearchInfo.md) |

##### Returns

`boolean` \| [`string`, `any`[]]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:334](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L334)

___

### supportedSubtypes

• `Optional` **supportedSubtypes**: `string`[]

supported subtypes of the type

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:248](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L248)

___

### validate

• `Optional` **validate**: (`value`: `T`, `p`: [`IPropertyDefinitionRawJSONDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md)) => [`PropertyInvalidReason`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition.PropertyInvalidReason.md)

#### Type declaration

▸ (`value`, `p`): [`PropertyInvalidReason`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition.PropertyInvalidReason.md)

this is a validation function that checks whether the value
is valid,

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `p` | [`IPropertyDefinitionRawJSONDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md) |

##### Returns

[`PropertyInvalidReason`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition.PropertyInvalidReason.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:438](https://github.com/onzag/itemize/blob/59702dd5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L438)
