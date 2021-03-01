[](../README.md) / [Exports](../modules.md) / [base/Root/Module/ItemDefinition/PropertyDefinition/types](../modules/base_root_module_itemdefinition_propertydefinition_types.md) / IPropertyDefinitionSupportedType

# Interface: IPropertyDefinitionSupportedType

[base/Root/Module/ItemDefinition/PropertyDefinition/types](../modules/base_root_module_itemdefinition_propertydefinition_types.md).IPropertyDefinitionSupportedType

How every supported type behaviour should be described

## Table of contents

### Properties

- [allowsMaxDecimalCountDefined](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#allowsmaxdecimalcountdefined)
- [allowsMinMaxDefined](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#allowsminmaxdefined)
- [allowsMinMaxLengthDefined](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#allowsminmaxlengthdefined)
- [gql](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#gql)
- [gqlAddFileToFields](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#gqladdfiletofields)
- [gqlFields](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#gqlfields)
- [gqlList](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#gqllist)
- [i18n](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#i18n)
- [json](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#json)
- [localEqual](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#localequal)
- [localOrderBy](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#localorderby)
- [localSearch](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#localsearch)
- [localStrSearch](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#localstrsearch)
- [nullableDefault](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#nullabledefault)
- [searchInterface](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#searchinterface)
- [searchable](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#searchable)
- [specialProperties](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#specialproperties)
- [sql](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#sql)
- [sqlBtreeIndexable](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#sqlbtreeindexable)
- [sqlEqual](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#sqlequal)
- [sqlIn](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#sqlin)
- [sqlMantenience](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#sqlmantenience)
- [sqlOrderBy](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#sqlorderby)
- [sqlOut](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#sqlout)
- [sqlSSCacheEqual](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#sqlsscacheequal)
- [sqlSearch](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#sqlsearch)
- [sqlSelect](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#sqlselect)
- [sqlStrSearch](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#sqlstrsearch)
- [supportedSubtypes](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#supportedsubtypes)
- [validate](base_root_module_itemdefinition_propertydefinition_types.ipropertydefinitionsupportedtype.md#validate)

## Properties

### allowsMaxDecimalCountDefined

• `Optional` **allowsMaxDecimalCountDefined**: *boolean*

whether a max decimal count can be specified use it if the value is numeric
and contains decimal

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:323](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L323)

___

### allowsMinMaxDefined

• `Optional` **allowsMinMaxDefined**: *boolean*

whether a min and max value can be defined, use it if the value is in
some way numeric

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:318](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L318)

___

### allowsMinMaxLengthDefined

• `Optional` **allowsMinMaxLengthDefined**: *boolean*

whether a max length can be defined, use it if the value is not an scalar of sort
but a combination of things, eg. characters, files,

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:328](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L328)

___

### gql

• **gql**: *string* \| *GraphQLScalarType* \| *GraphQLObjectType*<any, any, { [key: string]: *any*;  }\> \| *GraphQLInterfaceType* \| *GraphQLUnionType* \| *GraphQLEnumType* \| *GraphQLList*<any\> \| *GraphQLNonNull*<GraphQLScalarType \| GraphQLInterfaceType \| GraphQLUnionType \| GraphQLEnumType \| GraphQLList<any\> \| GraphQLObjectType<any, any, { [key: string]: *any*;  }\>\>

graphql type, either a output type or a string, when it's a string
gqlFields should be defined

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:169](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L169)

___

### gqlAddFileToFields

• `Optional` **gqlAddFileToFields**: *boolean*

Whether this complex type (must be a complex type), should be merged
with IGQL file fields for supporting files and streams, you do not need
to worry about the validation of file fields

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:184](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L184)

___

### gqlFields

• `Optional` **gqlFields**: [*IGQLFieldsDefinitionType*](gql.igqlfieldsdefinitiontype.md)

when gql is a string, the fields that it represents, this is for complex
types, only basic types are allowed

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:174](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L174)

___

### gqlList

• `Optional` **gqlList**: *boolean*

Whether this object represents a list, this affects everything

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:178](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L178)

___

### i18n

• **i18n**: *object*

i18n supported and expected attributes
they won't be requested at all for hidden and not searchable items
if the item has a range it should be specified too
these will be used for checking more than anything

#### Type declaration:

Name | Type |
:------ | :------ |
`base` | *string*[] |
`invalidSubtypeErrorInclude`? | *boolean* \| *string*[] |
`optional` | *string*[] |
`searchBase`? | *string*[] |
`searchOptional`? | *string*[] |
`searchRange`? | *string*[] |
`searchRangeOptional`? | *string*[] |
`tooLargeErrorInclude`? | *boolean* \| *string*[] |
`tooManyDecimalsErrorInclude`? | *boolean* \| *string*[] |
`tooSmallErrorInclude`? | *boolean* \| *string*[] |

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:335](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L335)

___

### json

• `Optional` **json**: *string* \| *number* \| *boolean*

json represents how the element is represented in json form
objects are not allowed only boolean numbers and strings are
these are used for types that are allowed to be used by
enforcedProperties and predefinedProperties, it is optional
as types that are not settable do not have a json form

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:158](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L158)

___

### localEqual

• **localEqual**: (`arg`: [*ILocalEqualInfo*](base_root_module_itemdefinition_propertydefinition_types.ilocalequalinfo.md)) => *boolean*

Simply compare two values of the same type, this
is used for differing properties so it might differ
from the sql behaviour

#### Type declaration:

▸ (`arg`: [*ILocalEqualInfo*](base_root_module_itemdefinition_propertydefinition_types.ilocalequalinfo.md)): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ILocalEqualInfo*](base_root_module_itemdefinition_propertydefinition_types.ilocalequalinfo.md) |

**Returns:** *boolean*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:264](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L264)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:264](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L264)

___

### localOrderBy

• **localOrderBy**: (`arg`: [*ILocalOrderByInfo*](base_root_module_itemdefinition_propertydefinition_types.ilocalorderbyinfo.md)) => *number*

The local order by function that tells a client how to order by it
basically this is fed to a sort function the same way sorting would
work locally, except a direction is specified, make it null to specify
the item can't be sorted by

#### Type declaration:

▸ (`arg`: [*ILocalOrderByInfo*](base_root_module_itemdefinition_propertydefinition_types.ilocalorderbyinfo.md)): *number*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ILocalOrderByInfo*](base_root_module_itemdefinition_propertydefinition_types.ilocalorderbyinfo.md) |

**Returns:** *number*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:277](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L277)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:277](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L277)

___

### localSearch

• **localSearch**: (`arg`: [*ILocalSearchInfo*](base_root_module_itemdefinition_propertydefinition_types.ilocalsearchinfo.md)) => *boolean*

represents a local search checkup performed locally with a graphql value
raw (that is with DATA) the property id and the include id, the args are
the same

#### Type declaration:

▸ (`arg`: [*ILocalSearchInfo*](base_root_module_itemdefinition_propertydefinition_types.ilocalsearchinfo.md)): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ILocalSearchInfo*](base_root_module_itemdefinition_propertydefinition_types.ilocalsearchinfo.md) |

**Returns:** *boolean*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:242](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L242)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:242](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L242)

___

### localStrSearch

• **localStrSearch**: (`arg`: [*ILocalStrSearchInfo*](base_root_module_itemdefinition_propertydefinition_types.ilocalstrsearchinfo.md)) => *boolean*

represents a local search but done using the single search value instead rather
than the entire value to match against, make it null to avoid supporting it

#### Type declaration:

▸ (`arg`: [*ILocalStrSearchInfo*](base_root_module_itemdefinition_propertydefinition_types.ilocalstrsearchinfo.md)): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ILocalStrSearchInfo*](base_root_module_itemdefinition_propertydefinition_types.ilocalstrsearchinfo.md) |

**Returns:** *boolean*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:247](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L247)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:247](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L247)

___

### nullableDefault

• `Optional` **nullableDefault**: *any*

represents an item that would mark for null
by default it is null itself

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:290](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L290)

___

### searchInterface

• `Optional` **searchInterface**: [*PropertyDefinitionSearchInterfacesType*](../enums/base_root_module_itemdefinition_propertydefinition_search_interfaces.propertydefinitionsearchinterfacestype.md)

the search interface used, should be specified if searchable
otherwise it would mess up

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:305](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L305)

___

### searchable

• **searchable**: *boolean*

whether it is searchable or not

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:300](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L300)

___

### specialProperties

• `Optional` **specialProperties**: { `name`: *string* ; `required?`: *boolean* \| *string*[] ; `type`: *string* \| *number* \| *boolean* \| *property-set* \| *any* \| *array-string* \| *array-number* \| *array-boolean*  }[]

special attributes that might be added specific to that type

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:309](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L309)

___

### sql

• **sql**: (`arg`: [*ISQLArgInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)) => [*ISQLTableDefinitionType*](sql.isqltabledefinitiontype.md)

sql definition
or a function where the id is the id is a property id
this represents how tables are populated and data is stored
a simple type simply saves the id, say it's a number, so
the row name will be property_id and the type will be number
however if it's a complex value you might need to set the row
names and their types by hand

#### Type declaration:

▸ (`arg`: [*ISQLArgInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)): [*ISQLTableDefinitionType*](sql.isqltabledefinitiontype.md)

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ISQLArgInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md) |

**Returns:** [*ISQLTableDefinitionType*](sql.isqltabledefinitiontype.md)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:194](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L194)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:194](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L194)

___

### sqlBtreeIndexable

• **sqlBtreeIndexable**: (`arg`: [*ISQLBtreeIndexableInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlbtreeindexableinfo.md)) => *string*[]

Provides the rows that are expected to be indexed and in the order that they are expected
when an index is added via a request limiter in the module

#### Type declaration:

▸ (`arg`: [*ISQLBtreeIndexableInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlbtreeindexableinfo.md)): *string*[]

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ISQLBtreeIndexableInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlbtreeindexableinfo.md) |

**Returns:** *string*[]

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:236](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L236)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:236](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L236)

___

### sqlEqual

• **sqlEqual**: (`arg`: [*ISQLEqualInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlequalinfo.md)) => *void*

Represents a check for equality of a property against another
same with the sql prefix as the search

#### Type declaration:

▸ (`arg`: [*ISQLEqualInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlequalinfo.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ISQLEqualInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlequalinfo.md) |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:252](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L252)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:252](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L252)

___

### sqlIn

• **sqlIn**: (`arg`: [*ISQLInInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md)) => [*ISQLTableRowValue*](sql.isqltablerowvalue.md)

specifies how data is stored, by default it just sets the row value
to whatever is given, however if you have a complex value you should
set this, that allows to build raw queries,
by default if not set this function just sets {property_id: value}

#### Type declaration:

▸ (`arg`: [*ISQLInInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md)): [*ISQLTableRowValue*](sql.isqltablerowvalue.md)

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ISQLInInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md) |

**Returns:** [*ISQLTableRowValue*](sql.isqltablerowvalue.md)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:207](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L207)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:207](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L207)

___

### sqlMantenience

• **sqlMantenience**: (`arg`: [*ISQLArgInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)) => [*ISQLMantenienceType*](base_root_module_itemdefinition_propertydefinition_types.isqlmanteniencetype.md)

SQL Row mantenience which runs every so often as defined
by the mantenience protocol where row is the entire row
and it expects a partial value, this value should be null
for fields without mantenience

#### Type declaration:

▸ (`arg`: [*ISQLArgInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)): [*ISQLMantenienceType*](base_root_module_itemdefinition_propertydefinition_types.isqlmanteniencetype.md)

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ISQLArgInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md) |

**Returns:** [*ISQLMantenienceType*](base_root_module_itemdefinition_propertydefinition_types.isqlmanteniencetype.md)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:284](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L284)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:284](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L284)

___

### sqlOrderBy

• **sqlOrderBy**: (`arg`: [*ISQLOrderByInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlorderbyinfo.md)) => [*string*, *string*, *string*]

The SQL order by function that tells the database how to order
by certain criteria, make it null to specify that this item can't
be ordered by, attempts to order by it will give an error

#### Type declaration:

▸ (`arg`: [*ISQLOrderByInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlorderbyinfo.md)): [*string*, *string*, *string*]

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ISQLOrderByInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlorderbyinfo.md) |

**Returns:** [*string*, *string*, *string*]

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:270](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L270)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:270](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L270)

___

### sqlOut

• **sqlOut**: (`arg`: [*ISQLOutInfo*](base_root_module_itemdefinition_propertydefinition_types.isqloutinfo.md)) => [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

sqlOut basically gives the entire table as data, and the property id where it expects
retrieval of that data; by default this function takes the table and does
data[property_id]

#### Type declaration:

▸ (`arg`: [*ISQLOutInfo*](base_root_module_itemdefinition_propertydefinition_types.isqloutinfo.md)): [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ISQLOutInfo*](base_root_module_itemdefinition_propertydefinition_types.isqloutinfo.md) |

**Returns:** [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:213](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L213)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:213](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L213)

___

### sqlSSCacheEqual

• **sqlSSCacheEqual**: (`arg`: [*ISQLSSCacheEqualInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlsscacheequalinfo.md)) => *boolean*

A server side ran cached equal, ran during cache checks very useful for checking
against policies during policy checks and other forms of checks
with raw database data

#### Type declaration:

▸ (`arg`: [*ISQLSSCacheEqualInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlsscacheequalinfo.md)): *boolean*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ISQLSSCacheEqualInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlsscacheequalinfo.md) |

**Returns:** *boolean*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:258](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L258)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:258](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L258)

___

### sqlSearch

• **sqlSearch**: (`arg`: [*ISQLSearchInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md)) => *boolean* \| [*string*, *any*[]]

Represents a search for an item
data is the graphql value obtained from the search query mode item definition
sqlPrefix is a prefix that everything is prefixed in sql, usually for the item
id is the id of the property
whereBuilder is the builder that is being used so it can attach the where queries to it
and dictionary is the postgres dictionary that can be used for sql searches
return a boolean on whether it searched by it or it didn't
you might also return an array instead of true for adding custom rows to be added
to the selection, these represent arguments for a raw select query

#### Type declaration:

▸ (`arg`: [*ISQLSearchInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md)): *boolean* \| [*string*, *any*[]]

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ISQLSearchInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md) |

**Returns:** *boolean* \| [*string*, *any*[]]

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:225](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L225)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:225](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L225)

___

### sqlSelect

• **sqlSelect**: (`arg`: [*ISQLArgInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)) => *string*[]

On a simple search what fields should be selected that are
the minimum necessary to perform a selection, this is used
for traditional search mainly

#### Type declaration:

▸ (`arg`: [*ISQLArgInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)): *string*[]

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ISQLArgInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md) |

**Returns:** *string*[]

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:200](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L200)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:200](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L200)

___

### sqlStrSearch

• **sqlStrSearch**: (`arg`: [*ISQLStrSearchInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlstrsearchinfo.md)) => *boolean* \| [*string*, *any*[]]

Represents a search for an item when the only input has been a string, make it null
to avoid supporting it
return a boolean on whether it searched by it or it didn't

#### Type declaration:

▸ (`arg`: [*ISQLStrSearchInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlstrsearchinfo.md)): *boolean* \| [*string*, *any*[]]

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | [*ISQLStrSearchInfo*](base_root_module_itemdefinition_propertydefinition_types.isqlstrsearchinfo.md) |

**Returns:** *boolean* \| [*string*, *any*[]]

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:231](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L231)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:231](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L231)

___

### supportedSubtypes

• `Optional` **supportedSubtypes**: *string*[]

supported subtypes of the type

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:163](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L163)

___

### validate

• `Optional` **validate**: (`value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `p`: [*IPropertyDefinitionRawJSONDataType*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)) => [*PropertyInvalidReason*](../enums/base_root_module_itemdefinition_propertydefinition.propertyinvalidreason.md)

this is a validation function that checks whether the value
is valid,

#### Type declaration:

▸ (`value`: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype), `p`: [*IPropertyDefinitionRawJSONDataType*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md)): [*PropertyInvalidReason*](../enums/base_root_module_itemdefinition_propertydefinition.propertyinvalidreason.md)

#### Parameters:

Name | Type |
:------ | :------ |
`value` | [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype) |
`p` | [*IPropertyDefinitionRawJSONDataType*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionrawjsondatatype.md) |

**Returns:** [*PropertyInvalidReason*](../enums/base_root_module_itemdefinition_propertydefinition.propertyinvalidreason.md)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:296](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L296)

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts:296](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/PropertyDefinition/types/index.ts#L296)
