[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/sql

# Module: base/Root/Module/ItemDefinition/sql

This file specifies all the sql executions functions that are used in order
to query item definitions from the postgresql database, refer to this file
once you need to figure out how resources are requested

## Table of contents

### Functions

- [buildSQLQueryForItemDefinition](base_root_module_itemdefinition_sql.md#buildsqlqueryforitemdefinition)
- [convertGQLValueToSQLValueForItemDefinition](base_root_module_itemdefinition_sql.md#convertgqlvaluetosqlvalueforitemdefinition)
- [convertSQLValueToGQLValueForItemDefinition](base_root_module_itemdefinition_sql.md#convertsqlvaluetogqlvalueforitemdefinition)
- [getSQLTableDefinitionForItemDefinition](base_root_module_itemdefinition_sql.md#getsqltabledefinitionforitemdefinition)
- [getSQLTablesSchemaForItemDefinition](base_root_module_itemdefinition_sql.md#getsqltablesschemaforitemdefinition)

## Functions

### buildSQLQueryForItemDefinition

▸ **buildSQLQueryForItemDefinition**(`serverData`: *any*, `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `args`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), `whereBuilder`: [*WhereBuilder*](../classes/database_wherebuilder.wherebuilder.md), `orderByBuilder`: [*OrderByBuilder*](../classes/database_orderbybuilder.orderbybuilder.md), `dictionary`: *string*, `search`: *string*, `orderBy`: [*IOrderByRuleType*](../interfaces/constants.iorderbyruletype.md)): [*string*, *any*[]][]

Builds a sql query for an item definition so that it can be
queried for searches

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`serverData` | *any* | the server data   |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition that is being requested (normal form)   |
`args` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the args from the search mode   |
`whereBuilder` | [*WhereBuilder*](../classes/database_wherebuilder.wherebuilder.md) | the where builder instance   |
`orderByBuilder` | [*OrderByBuilder*](../classes/database_orderbybuilder.orderbybuilder.md) | the order by builder instance   |
`dictionary` | *string* | the dictionary being used   |
`search` | *string* | the search arg value   |
`orderBy` | [*IOrderByRuleType*](../interfaces/constants.iorderbyruletype.md) | the order by rules   |

**Returns:** [*string*, *any*[]][]

a list of raw added selected fields

Defined in: [base/Root/Module/ItemDefinition/sql.ts:361](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/sql.ts#L361)

___

### convertGQLValueToSQLValueForItemDefinition

▸ **convertGQLValueToSQLValueForItemDefinition**(`serverData`: *any*, `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `data`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), `oldData`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md), `uploadsClient`: [*default*](../classes/server_services_base_storageprovider.default.md)<any\>, `domain`: *string*, `dictionary`: *string*, `partialFields?`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) \| [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) \| [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)): [*ISQLStreamComposedTableRowValue*](../interfaces/sql.isqlstreamcomposedtablerowvalue.md)

Converts a graphql value, with all its items and everything it
has into a SQL row data value for this specific item definition
it doesn't include its prop extensions

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`serverData` | *any* | the server data   |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition in question   |
`data` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the graphql data   |
`oldData` | [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) | - |
`uploadsClient` | [*default*](../classes/server_services_base_storageprovider.default.md)<any\> | - |
`domain` | *string* | - |
`dictionary` | *string* | the dictionary to use in full text search mode   |
`partialFields?` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) \| [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) \| [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) | fields to make a partial value rather than a total value, note that we don't recommend using partial fields in order to create because some properties might treat nulls in a fancy way, when creating all the table rows should be set, only when updating you should use partial fields; for example, if you have a field that has a property that is nullable but it's forced into some value it will be ignored in a partial field value, don't use partial fields to create   |

**Returns:** [*ISQLStreamComposedTableRowValue*](../interfaces/sql.isqlstreamcomposedtablerowvalue.md)

a sql value

Defined in: [base/Root/Module/ItemDefinition/sql.ts:270](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/sql.ts#L270)

___

### convertSQLValueToGQLValueForItemDefinition

▸ **convertSQLValueToGQLValueForItemDefinition**(`serverData`: *any*, `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `row`: [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md), `graphqlFields?`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md)): [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)

Converts a SQL value directly coming from the database as it is
to a graphql value for this specific item definition,
this includes the prop extensions and the reserved base properties
This value is FLATTENED

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`serverData` | *any* | the server data we are working with   |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition in question   |
`row` | [*ISQLTableRowValue*](../interfaces/sql.isqltablerowvalue.md) | the row value, with all the columns it has; the row can be overblown with other field data, this will extract only the data required for this item definition   |
`graphqlFields?` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) | contains the only properties that are required in the request provided by grapql fields, eg {id: {}, name: {}, ITEM_kitten: {purrs: {}}}   |

**Returns:** [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)

a graphql value

Defined in: [base/Root/Module/ItemDefinition/sql.ts:198](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/sql.ts#L198)

___

### getSQLTableDefinitionForItemDefinition

▸ **getSQLTableDefinitionForItemDefinition**(`itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md)): [*ISQLTableDefinitionType*](../interfaces/sql.isqltabledefinitiontype.md)

Provides the table that is necesary to include this item definition as a whole
that is, this represents a whole table, that is necessary for this item to
be saved when populated, it basically adds up all the table bits
from all the properties and all the items, this does not include
prop extensions nor module level properties, nor base

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition in question   |

**Returns:** [*ISQLTableDefinitionType*](../interfaces/sql.isqltabledefinitiontype.md)

a complete table definition type

Defined in: [base/Root/Module/ItemDefinition/sql.ts:47](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/sql.ts#L47)

___

### getSQLTablesSchemaForItemDefinition

▸ **getSQLTablesSchemaForItemDefinition**(`itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md)): [*ISQLSchemaDefinitionType*](../interfaces/sql.isqlschemadefinitiontype.md)

Provides all the schema of all the items, self and its children
that are included within this item definition and all the table names
that should be used using the qualified name

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition in question   |

**Returns:** [*ISQLSchemaDefinitionType*](../interfaces/sql.isqlschemadefinitiontype.md)

a partial sql schema definition for the whole database (adds tables)

Defined in: [base/Root/Module/ItemDefinition/sql.ts:167](https://github.com/onzag/itemize/blob/0569bdf2/base/Root/Module/ItemDefinition/sql.ts#L167)
