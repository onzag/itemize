[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition/types](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md) / IPropertyDefinitionSupportedType

# Interface: IPropertyDefinitionSupportedType<T\>

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
- [gql](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#gql)
- [gqlAddFileToFields](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#gqladdfiletofields)
- [gqlFields](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#gqlfields)
- [gqlList](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#gqllist)
- [i18n](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#i18n)
- [json](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#json)
- [ownLanguageProperty](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#ownlanguageproperty)
- [requiresValues](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#requiresvalues)
- [searchInterface](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#searchinterface)
- [searchable](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#searchable)
- [specialProperties](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#specialproperties)
- [supportedSubtypes](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#supportedsubtypes)

### Methods

- [elastic](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#elastic)
- [elasticSearch](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#elasticsearch)
- [elasticSort](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#elasticsort)
- [elasticStrSearch](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#elasticstrsearch)
- [getNullValue](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#getnullvalue)
- [isNull](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#isnull)
- [localEqual](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#localequal)
- [localOrderBy](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#localorderby)
- [localSearch](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#localsearch)
- [localStrSearch](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#localstrsearch)
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
- [validate](base_Root_Module_ItemDefinition_PropertyDefinition_types.IPropertyDefinitionSupportedType.md#validate)

## Properties

### allowsMaxDecimalCountDefined

• `Optional` **allowsMaxDecimalCountDefined**: `boolean`

whether a max decimal count can be specified use it if the value is numeric
and contains decimal

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:457](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L457)

___

### allowsMinMaxDefined

• `Optional` **allowsMinMaxDefined**: `boolean`

whether a min and max value can be defined, use it if the value is in
some way numeric

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:452](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L452)

___

### allowsMinMaxLengthDefined

• `Optional` **allowsMinMaxLengthDefined**: `boolean`

whether a max length can be defined, use it if the value is not an scalar of sort
but a combination of things, eg. characters, files,

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:462](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L462)

___

### gql

• **gql**: `string` \| `GraphQLOutputType`

graphql type, either a output type or a string, when it's a string
gqlFields should be defined

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:250](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L250)

___

### gqlAddFileToFields

• `Optional` **gqlAddFileToFields**: `boolean`

Whether this complex type (must be a complex type), should be merged
with IGQL file fields for supporting files and streams, you do not need
to worry about the validation of file fields

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:265](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L265)

___

### gqlFields

• `Optional` **gqlFields**: [`IGQLFieldsDefinitionType`](base_Root_gql.IGQLFieldsDefinitionType.md)

when gql is a string, the fields that it represents, this is for complex
types, only basic types are allowed

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:255](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L255)

___

### gqlList

• `Optional` **gqlList**: `boolean`

Whether this object represents a list, this affects everything

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:259](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L259)

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

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:473](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L473)

___

### json

• `Optional` **json**: ``"string"`` \| ``"number"`` \| ``"boolean"``

json represents how the element is represented in json form
objects are not allowed only boolean numbers and strings are
these are used for types that are allowed to be used by
enforcedProperties and predefinedProperties, it is optional
as types that are not settable do not have a json form

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:234](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L234)

___

### ownLanguageProperty

• `Optional` **ownLanguageProperty**: `string`

whether it has an own language property

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:244](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L244)

___

### requiresValues

• `Optional` **requiresValues**: `boolean` \| `string`[]

This field is required to have specified specific values

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:466](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L466)

___

### searchInterface

• `Optional` **searchInterface**: [`PropertyDefinitionSearchInterfacesType`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition_search_interfaces.PropertyDefinitionSearchInterfacesType.md)

the search interface used, should be specified if searchable
otherwise it would mess up

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:439](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L439)

___

### searchable

• **searchable**: `boolean`

whether it is searchable or not

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:434](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L434)

___

### specialProperties

• `Optional` **specialProperties**: { `name`: `string` ; `required?`: `boolean` \| `string`[] ; `type`: ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"property-set"`` \| ``"any"`` \| ``"array-string"`` \| ``"array-number"`` \| ``"array-boolean"``  }[]

special attributes that might be added specific to that type

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:443](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L443)

___

### supportedSubtypes

• `Optional` **supportedSubtypes**: `string`[]

supported subtypes of the type

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:239](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L239)

## Methods

### elastic

▸ **elastic**(`arg`): [`IElasticIndexDefinitionType`](base_Root_sql.IElasticIndexDefinitionType.md)

elastic index definition for the property
it's used inside the mappings for creating the elastic index

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

#### Returns

[`IElasticIndexDefinitionType`](base_Root_sql.IElasticIndexDefinitionType.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:280](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L280)

___

### elasticSearch

▸ **elasticSearch**(`arg`): [`IElasticHighlightReply`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

Defines how to perform elastic search into the property

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IElasticSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticSearchInfo.md) |

#### Returns

[`IElasticHighlightReply`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:320](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L320)

___

### elasticSort

▸ **elasticSort**(`arg`): `any`

similar to sql order by but done against elasticsearch sort
you must return values that are valid for sort as they will
be appended to the array of sort that elasticsearch expects

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLOrderByInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md) |

#### Returns

`any`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:375](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L375)

___

### elasticStrSearch

▸ **elasticStrSearch**(`arg`): [`IElasticHighlightReply`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

Represents a str based search using the elastic interface

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IElasticStrSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticStrSearchInfo.md) |

#### Returns

[`IElasticHighlightReply`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:330](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L330)

___

### getNullValue

▸ `Optional` **getNullValue**(`value`): `T`

use to establish the value for null, by default it is null

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`T`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:424](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L424)

___

### isNull

▸ `Optional` **isNull**(`value`): `boolean`

Use this function to
establish when a field will be considered null

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:419](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L419)

___

### localEqual

▸ **localEqual**(`arg`): `boolean`

Simply compare two values of the same type, this
is used for differing properties so it might differ
from the sql behaviour

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ILocalEqualInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalEqualInfo.md)<`T`\> |

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:363](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L363)

___

### localOrderBy

▸ **localOrderBy**(`arg`): `number`

The local order by function that tells a client how to order by it
basically this is fed to a sort function the same way sorting would
work locally, except a direction is specified, make it null to specify
the item can't be sorted by

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ILocalOrderByInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalOrderByInfo.md)<`T`\> |

#### Returns

`number`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:382](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L382)

___

### localSearch

▸ **localSearch**(`arg`): `boolean`

represents a local search checkup performed locally with a graphql value
raw (that is with DATA) the property id and the include id, the args are
the same

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ILocalSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalSearchInfo.md) |

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:341](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L341)

___

### localStrSearch

▸ **localStrSearch**(`arg`): `boolean`

represents a local search but done using the single search value instead rather
than the entire value to match against, make it null to avoid supporting it

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ILocalStrSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ILocalStrSearchInfo.md) |

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:346](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L346)

___

### sql

▸ **sql**(`arg`): [`ISQLTableDefinitionType`](base_Root_sql.ISQLTableDefinitionType.md)

sql definition
or a function where the id is the id is a property id
this represents how tables are populated and data is stored
a simple type simply saves the id, say it's a number, so
the row name will be property_id and the type will be number
however if it's a complex value you might need to set the row
names and their types by hand

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

#### Returns

[`ISQLTableDefinitionType`](base_Root_sql.ISQLTableDefinitionType.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:275](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L275)

___

### sqlBtreeIndexable

▸ **sqlBtreeIndexable**(`arg`): `string`[]

Provides the rows that are expected to be indexed and in the order that they are expected
when an index is added via a request limiter in the module

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLBtreeIndexableInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLBtreeIndexableInfo.md) |

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:335](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L335)

___

### sqlElasticIn

▸ **sqlElasticIn**(`arg`): [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

Defines how data is to be stored in elasticsearch
similar to sql in in how it works

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLOutInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) |

#### Returns

[`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:304](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L304)

___

### sqlEqual

▸ **sqlEqual**(`arg`): `void`

Represents a check for equality of a property against another
same with the sql prefix as the search

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLEqualInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLEqualInfo.md) |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:351](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L351)

___

### sqlIn

▸ **sqlIn**(`arg`): [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

specifies how data is stored, by default it just sets the row value
to whatever is given, however if you have a complex value you should
set this, that allows to build raw queries,
by default if not set this function just sets {property_id: value}

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLInInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLInInfo.md) |

#### Returns

[`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:293](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L293)

___

### sqlMantenience

▸ **sqlMantenience**(`arg`): [`ISQLMantenienceType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLMantenienceType.md)

SQL Row mantenience which runs every so often as defined
by the mantenience protocol where row is the entire row
and it expects a partial value, this value should be null
for fields without mantenience

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

#### Returns

[`ISQLMantenienceType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLMantenienceType.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:389](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L389)

___

### sqlOrderBy

▸ **sqlOrderBy**(`arg`): [`string`, `string`, `string`]

The SQL order by function that tells the database how to order
by certain criteria, make it null to specify that this item can't
be ordered by, attempts to order by it will give an error

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLOrderByInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOrderByInfo.md) |

#### Returns

[`string`, `string`, `string`]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:369](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L369)

___

### sqlOut

▸ **sqlOut**(`arg`): `T`

sqlOut basically gives the entire table as data, and the property id where it expects
retrieval of that data; by default this function takes the table and does
data[property_id]

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLOutInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLOutInfo.md) |

#### Returns

`T`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:299](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L299)

___

### sqlPreSideEffect

▸ `Optional` **sqlPreSideEffect**(`arg`): `string` \| `boolean` \| `Promise`<`string` \| `boolean`\>

Allows to specify side effects that occur on the server side
before the type has been modified

The main function is to prevent unwanted modifications or setup
fields that have certain rules to them, for example a XML only field
in a type, or a JSON specific one, etc...

Because of the nature of the pre side effecct it is unable to run
on delete as it's too expensive because of deletition cascading

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLSideEffectType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md)<`T`\> |

#### Returns

`string` \| `boolean` \| `Promise`<`string` \| `boolean`\>

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:413](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L413)

___

### sqlRedoDictionaryIndex

▸ `Optional` **sqlRedoDictionaryIndex**(`arg`): [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

SQL to redo the dictionary based index

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLRedoDictionaryBasedIndex`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLRedoDictionaryBasedIndex.md) |

#### Returns

[`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:394](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L394)

___

### sqlSSCacheEqual

▸ **sqlSSCacheEqual**(`arg`): `boolean`

A server side ran cached equal, ran during cache checks very useful for checking
against policies during policy checks and other forms of checks
with raw database data

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLSSCacheEqualInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSSCacheEqualInfo.md) |

#### Returns

`boolean`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:357](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L357)

___

### sqlSearch

▸ **sqlSearch**(`arg`): `boolean` \| [`string`, `any`[]]

Represents a search for an item
data is the graphql value obtained from the search query mode item definition
sqlPrefix is a prefix that everything is prefixed in sql, usually for the item
id is the id of the property
whereBuilder is the builder that is being used so it can attach the where queries to it
and dictionary is the postgres dictionary that can be used for sql searches
return a boolean on whether it searched by it or it didn't
you might also return an array instead of true for adding custom rows to be added
to the selection, these represent arguments for a raw select query

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSearchInfo.md) |

#### Returns

`boolean` \| [`string`, `any`[]]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:316](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L316)

___

### sqlSelect

▸ **sqlSelect**(`arg`): `string`[]

On a simple search what fields should be selected that are
the minimum necessary to perform a selection, this is used
for traditional search mainly

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLArgInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLArgInfo.md) |

#### Returns

`string`[]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:286](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L286)

___

### sqlSideEffect

▸ `Optional` **sqlSideEffect**(`arg`): `void`

Allows to specify side effects that occur on the server side
once the type has been modified

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLSideEffectType`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLSideEffectType.md)<`T`\> |

#### Returns

`void`

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:400](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L400)

___

### sqlStrSearch

▸ **sqlStrSearch**(`arg`): `boolean` \| [`string`, `any`[]]

Represents a search for an item when the only input has been a string, make it null
to avoid supporting it
return a boolean on whether it searched by it or it didn't

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ISQLStrSearchInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.ISQLStrSearchInfo.md) |

#### Returns

`boolean` \| [`string`, `any`[]]

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:326](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L326)

___

### validate

▸ `Optional` **validate**(`value`, `p`): [`PropertyInvalidReason`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition.PropertyInvalidReason.md)

this is a validation function that checks whether the value
is valid,

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |
| `p` | [`IPropertyDefinitionRawJSONDataType`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionRawJSONDataType.md) |

#### Returns

[`PropertyInvalidReason`](../enums/base_Root_Module_ItemDefinition_PropertyDefinition.PropertyInvalidReason.md)

#### Defined in

[base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:430](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L430)
