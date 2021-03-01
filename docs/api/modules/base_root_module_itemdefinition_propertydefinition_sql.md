[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/PropertyDefinition/sql

# Module: base/Root/Module/ItemDefinition/PropertyDefinition/sql

Contains SQL helper functions to be used within the property definition in order
to be able to perform searches of them in the database

## Table of contents

### Functions

- [buildSQLOrderByForInternalRequiredProperty](base_root_module_itemdefinition_propertydefinition_sql.md#buildsqlorderbyforinternalrequiredproperty)
- [buildSQLOrderByForProperty](base_root_module_itemdefinition_propertydefinition_sql.md#buildsqlorderbyforproperty)
- [buildSQLQueryForProperty](base_root_module_itemdefinition_propertydefinition_sql.md#buildsqlqueryforproperty)
- [buildSQLStrSearchQueryForProperty](base_root_module_itemdefinition_propertydefinition_sql.md#buildsqlstrsearchqueryforproperty)
- [convertGQLValueToSQLValueForProperty](base_root_module_itemdefinition_propertydefinition_sql.md#convertgqlvaluetosqlvalueforproperty)
- [convertSQLValueToGQLValueForProperty](base_root_module_itemdefinition_propertydefinition_sql.md#convertsqlvaluetogqlvalueforproperty)
- [getSQLTableDefinitionForProperty](base_root_module_itemdefinition_propertydefinition_sql.md#getsqltabledefinitionforproperty)
- [getStandardSQLFnFor](base_root_module_itemdefinition_propertydefinition_sql.md#getstandardsqlfnfor)
- [standardSQLBtreeIndexable](base_root_module_itemdefinition_propertydefinition_sql.md#standardsqlbtreeindexable)
- [standardSQLEqualFn](base_root_module_itemdefinition_propertydefinition_sql.md#standardsqlequalfn)
- [standardSQLInFn](base_root_module_itemdefinition_propertydefinition_sql.md#standardsqlinfn)
- [standardSQLOrderBy](base_root_module_itemdefinition_propertydefinition_sql.md#standardsqlorderby)
- [standardSQLOutFn](base_root_module_itemdefinition_propertydefinition_sql.md#standardsqloutfn)
- [standardSQLOutWithJSONParseFn](base_root_module_itemdefinition_propertydefinition_sql.md#standardsqloutwithjsonparsefn)
- [standardSQLSearchFnExactAndRange](base_root_module_itemdefinition_propertydefinition_sql.md#standardsqlsearchfnexactandrange)
- [standardSQLSelect](base_root_module_itemdefinition_propertydefinition_sql.md#standardsqlselect)
- [stardardSQLInWithJSONStringifyFn](base_root_module_itemdefinition_propertydefinition_sql.md#stardardsqlinwithjsonstringifyfn)

## Functions

### buildSQLOrderByForInternalRequiredProperty

▸ **buildSQLOrderByForInternalRequiredProperty**(`itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `which`: *string*, `orderByBuilder`: [*OrderByBuilder*](../classes/database_orderbybuilder.orderbybuilder.md), `direction`: *asc* \| *desc*, `nulls`: *first* \| *last*): *void*

Builds the order by functionality for the internal properties, such as
created_at, edited_at, etc...

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition   |
`which` | *string* | basically the column name   |
`orderByBuilder` | [*OrderByBuilder*](../classes/database_orderbybuilder.orderbybuilder.md) | the order by builder   |
`direction` | *asc* \| *desc* | the direction of the order by rule   |
`nulls` | *first* \| *last* | whether nulls are first or last    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:556](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L556)

___

### buildSQLOrderByForProperty

▸ **buildSQLOrderByForProperty**(`serverData`: *any*, `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `propertyDefinition`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `orderByBuilder`: [*OrderByBuilder*](../classes/database_orderbybuilder.orderbybuilder.md), `direction`: *asc* \| *desc*, `nulls`: *first* \| *last*, `wasIncludedInSearch`: *boolean*, `wasIncludedInStrSearch`: *boolean*): *void*

Builds an order by query for a given property

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`serverData` | *any* | the server data that is being used   |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition in question   |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include (or null)   |
`propertyDefinition` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) | the property in question   |
`orderByBuilder` | [*OrderByBuilder*](../classes/database_orderbybuilder.orderbybuilder.md) | the order by builder that is currently building the query   |
`direction` | *asc* \| *desc* | the direction to be accounted for   |
`nulls` | *first* \| *last* | the nulls (first or last)   |
`wasIncludedInSearch` | *boolean* | whether this property was included in search   |
`wasIncludedInStrSearch` | *boolean* | whether this property was included in the str FTS search    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:507](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L507)

___

### buildSQLQueryForProperty

▸ **buildSQLQueryForProperty**(`serverData`: *any*, `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `propertyDefinition`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `args`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), `whereBuilder`: [*WhereBuilder*](../classes/database_wherebuilder.wherebuilder.md), `dictionary`: *string*, `isOrderedByIt`: *boolean*): *boolean* \| [*string*, *any*[]]

Builds a sql search query from a given property definition, the data
coming from the search module, a sql prefix to use

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`serverData` | *any* | the server data   |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition that contains the property   |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include within the item definition, or null   |
`propertyDefinition` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) | the property definition in question   |
`args` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the args coming from the search module in such format   |
`whereBuilder` | [*WhereBuilder*](../classes/database_wherebuilder.wherebuilder.md) | the where building instance   |
`dictionary` | *string* | the dictionary that is being used   |
`isOrderedByIt` | *boolean* | whether there will be a subsequent order by request    |

**Returns:** *boolean* \| [*string*, *any*[]]

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:416](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L416)

___

### buildSQLStrSearchQueryForProperty

▸ **buildSQLStrSearchQueryForProperty**(`serverData`: *any*, `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `propertyDefinition`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `args`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), `search`: *string*, `whereBuilder`: [*WhereBuilder*](../classes/database_wherebuilder.wherebuilder.md), `dictionary`: *string*, `isOrderedByIt`: *boolean*): *boolean* \| [*string*, *any*[]]

Builds a sql str FTS search query from a given property definition, the data
coming from the search module, a sql prefix to use, and the builder

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`serverData` | *any* | the server data   |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition that contains the property   |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include within the item definition, or null   |
`propertyDefinition` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) | the property definition in question   |
`args` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the args coming from the search module in such format   |
`search` | *string* | the search string that is being used   |
`whereBuilder` | [*WhereBuilder*](../classes/database_wherebuilder.wherebuilder.md) | the where building instance   |
`dictionary` | *string* | the dictionary that is being used   |
`isOrderedByIt` | *boolean* | whether there will be a subsequent order by request    |

**Returns:** *boolean* \| [*string*, *any*[]]

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:453](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L453)

___

### convertGQLValueToSQLValueForProperty

▸ **convertGQLValueToSQLValueForProperty**(`serverData`: *any*, `mod`: [*default*](../classes/base_root_module.default.md), `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `propertyDefinition`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `data`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), `oldData`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md), `uploadsClient`: [*default*](../classes/server_services_base_storageprovider.default.md)<any\>, `domain`: *string*, `dictionary`: *string*): [*ISQLStreamComposedTableRowValue*](../interfaces/base_root_sql.isqlstreamcomposedtablerowvalue.md)

Converts a graphql value into a sql value, that is graphql data into row
data to be immediately added to the database as it is

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`serverData` | *any* | the server data   |
`mod` | [*default*](../classes/base_root_module.default.md) | the module   |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition that contains the property   |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include within the item definition, or null   |
`propertyDefinition` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) | the property definition in question   |
`data` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the graphql data   |
`oldData` | [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) | the old graphql data   |
`uploadsClient` | [*default*](../classes/server_services_base_storageprovider.default.md)<any\> | - |
`domain` | *string* | - |
`dictionary` | *string* | the dictionary to use in full text search mode   |

**Returns:** [*ISQLStreamComposedTableRowValue*](../interfaces/base_root_sql.isqlstreamcomposedtablerowvalue.md)

a composed value with a partial row value and the consume streams functionality
included in it

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:318](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L318)

___

### convertSQLValueToGQLValueForProperty

▸ **convertSQLValueToGQLValueForProperty**(`serverData`: *any*, `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `propertyDefinition`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md), `row`: [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)): [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)

Takes row data information that is in the SQL form and converts
it into a graphql form, only for this specific property

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`serverData` | *any* | the server data   |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition that contains the property   |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include within the item definition, or null   |
`propertyDefinition` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) | the property definition in question   |
`row` | [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md) | the row that we want to extract information from   |

**Returns:** [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)

the graphql value for the property

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:243](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L243)

___

### getSQLTableDefinitionForProperty

▸ **getSQLTableDefinitionForProperty**(`itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `propertyDefinition`: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md)): [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)

Provides the table bit that is necessary to include this property and
this property alone, that is a table bit

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition that contains the property   |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include within the item definition, or null   |
`propertyDefinition` | [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md) | the property definition in question   |

**Returns:** [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)

the partial sql table definition for the property

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:214](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L214)

___

### getStandardSQLFnFor

▸ **getStandardSQLFnFor**(`type`: *string*, `ext?`: *string*, `indexCalculator?`: (`subtype`: *string*, `sqlPrefix`: *string*, `id`: *string*) => [*ISQLTableIndexType*](../interfaces/base_root_sql.isqltableindextype.md)): *function*

Provides the sql function that defines the schema that is used to build
the partial table definition

#### Parameters:

Name | Type | Default value | Description |
:------ | :------ | :------ | :------ |
`type` | *string* | - | the postgresql type   |
`ext` | *string* | null | a extension to require for this type   |
`indexCalculator?` | (`subtype`: *string*, `sqlPrefix`: *string*, `id`: *string*) => [*ISQLTableIndexType*](../interfaces/base_root_sql.isqltableindextype.md) | - | an function to decide how to build an index for this type   |

**Returns:** (`arg`: [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)) => [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)

a function that returns the partial table definition object with the given type

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:36](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L36)

___

### standardSQLBtreeIndexable

▸ **standardSQLBtreeIndexable**(`arg`: [*ISQLBtreeIndexableInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlbtreeindexableinfo.md)): *string*[]

The standard btree indexable column builder

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLBtreeIndexableInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlbtreeindexableinfo.md) | the sql btree indexable arg   |

**Returns:** *string*[]

an array of the columns to index

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:202](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L202)

___

### standardSQLEqualFn

▸ **standardSQLEqualFn**(`arg`: [*ISQLEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlequalinfo.md)): *void*

The standard function that perfoms equality checks within the database

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLEqualInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlequalinfo.md) | the equal info arg   |

**Returns:** *void*

a valid args to use in the where expression or an object
for where many

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:180](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L180)

___

### standardSQLInFn

▸ **standardSQLInFn**(`arg`: [*ISQLInInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md)): [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)

The standard sql in function that specifies how a property inputs its value
into a table

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLInInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md) | the in arg   |

**Returns:** [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)

the partial row value

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:92](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L92)

___

### standardSQLOrderBy

▸ **standardSQLOrderBy**(`arg`: [*ISQLOrderByInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlorderbyinfo.md)): [*string*, *string*, *string*]

the standard order by functionality

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLOrderByInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlorderbyinfo.md) | the orer by info arg   |

**Returns:** [*string*, *string*, *string*]

an array of string with the order by

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:69](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L69)

___

### standardSQLOutFn

▸ **standardSQLOutFn**(`arg`: [*ISQLOutInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqloutinfo.md)): [*PropertyDefinitionSupportedType*](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

The standard sql out function that defines
how a value for a property is extracted from a given
row

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLOutInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqloutinfo.md) | the out arg info   |

**Returns:** [*PropertyDefinitionSupportedType*](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

the property value out

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:123](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L123)

___

### standardSQLOutWithJSONParseFn

▸ **standardSQLOutWithJSONParseFn**(`arg`: [*ISQLOutInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqloutinfo.md)): [*PropertyDefinitionSupportedType*](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

The standard sql out function that deserializes values
as they are expected to be stored serialized

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLOutInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqloutinfo.md) | the sql out info arg   |

**Returns:** [*PropertyDefinitionSupportedType*](base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

the supported type json parsed

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:133](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L133)

___

### standardSQLSearchFnExactAndRange

▸ **standardSQLSearchFnExactAndRange**(`arg`: [*ISQLSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md)): *boolean*

The standard function that build queries for the property

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLSearchInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlsearchinfo.md) | the search info arg   |

**Returns:** *boolean*

a boolean on whether it was searched by it

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:150](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L150)

___

### standardSQLSelect

▸ **standardSQLSelect**(`arg`: [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md)): *string*[]

The standard sql select function that is used to select the minimum necessary
for a selection in a traditional search

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLArgInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlarginfo.md) | the in arg   |

**Returns:** *string*[]

the rows to select

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:79](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L79)

___

### stardardSQLInWithJSONStringifyFn

▸ **stardardSQLInWithJSONStringifyFn**(`arg`: [*ISQLInInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md)): [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)

The standard sql in function that inputs its value but
uses JSON stringify as a serialization tool

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`arg` | [*ISQLInInfo*](../interfaces/base_root_module_itemdefinition_propertydefinition_types.isqlininfo.md) | the in arg   |

**Returns:** [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)

the partial row value

Defined in: [base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts:105](https://github.com/onzag/itemize/blob/0e9b128c/base/Root/Module/ItemDefinition/PropertyDefinition/sql/index.ts#L105)
