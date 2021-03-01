[](../README.md) / [Exports](../modules.md) / base/Root/Module/sql

# Module: base/Root/Module/sql

This file contains the sql functionaly that is used within modules in order to perform
queries within the module itself as well as to define the parent module table that is
to be used in the item definition for properties in common

## Table of contents

### Functions

- [buildSQLQueryForModule](base_root_module_sql.md#buildsqlqueryformodule)
- [convertGQLValueToSQLValueForModule](base_root_module_sql.md#convertgqlvaluetosqlvalueformodule)
- [convertSQLValueToGQLValueForModule](base_root_module_sql.md#convertsqlvaluetogqlvalueformodule)
- [getSQLTableDefinitionForModule](base_root_module_sql.md#getsqltabledefinitionformodule)
- [getSQLTablesSchemaForModule](base_root_module_sql.md#getsqltablesschemaformodule)

## Functions

### buildSQLQueryForModule

▸ **buildSQLQueryForModule**(`serverData`: *any*, `mod`: [*default*](../classes/base_root_module.default.md), `args`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), `whereBuilder`: [*WhereBuilder*](../classes/database_wherebuilder.wherebuilder.md), `orderByBuilder`: [*OrderByBuilder*](../classes/database_orderbybuilder.orderbybuilder.md), `dictionary`: *string*, `search`: *string*, `orderBy`: [*IOrderByRuleType*](../interfaces/constants.iorderbyruletype.md)): [*string*, *any*[]][]

Builds a sql query specific for this module to search
within itself in the database

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`serverData` | *any* | the server data   |
`mod` | [*default*](../classes/base_root_module.default.md) | the module in question   |
`args` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the args for the query from graphql   |
`whereBuilder` | [*WhereBuilder*](../classes/database_wherebuilder.wherebuilder.md) | the where builder   |
`orderByBuilder` | [*OrderByBuilder*](../classes/database_orderbybuilder.orderbybuilder.md) | the order by builder   |
`dictionary` | *string* | the dictionary used   |
`search` | *string* | the search   |
`orderBy` | [*IOrderByRuleType*](../interfaces/constants.iorderbyruletype.md) | the order by rule    |

**Returns:** [*string*, *any*[]][]

Defined in: [base/Root/Module/sql.ts:302](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/sql.ts#L302)

___

### convertGQLValueToSQLValueForModule

▸ **convertGQLValueToSQLValueForModule**(`serverData`: *any*, `mod`: [*default*](../classes/base_root_module.default.md), `data`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), `oldData`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md), `uploadsClient`: [*default*](../classes/server_services_base_storageprovider.default.md)<any\>, `domain`: *string*, `dictionary`: *string*, `partialFields?`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) \| [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) \| [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)): [*ISQLStreamComposedTableRowValue*](../interfaces/base_root_sql.isqlstreamcomposedtablerowvalue.md)

Converts a graphql value, with all its items and everything it
has into a SQL row data value for this specific module

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`serverData` | *any* | - |
`mod` | [*default*](../classes/base_root_module.default.md) | the module in question   |
`data` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the graphql data   |
`oldData` | [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) | the old stored value for this module   |
`uploadsClient` | [*default*](../classes/server_services_base_storageprovider.default.md)<any\> | the uploads client   |
`domain` | *string* | - |
`dictionary` | *string* | the postgresql dictionary   |
`partialFields?` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) \| [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) \| [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) | fields to make a partial value rather than a total value, note that we don't recommend using partial fields in order to create because some properties might treat nulls in a fancy way, when creating all the table rows should be set, only when updating you should use partial fields; for example, if you have a field that has a property that is nullable but it's forced into some value it will be ignored in a partial field value, don't use partial fields to create   |

**Returns:** [*ISQLStreamComposedTableRowValue*](../interfaces/base_root_sql.isqlstreamcomposedtablerowvalue.md)

the composed row value with the consume streams function

Defined in: [base/Root/Module/sql.ts:195](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/sql.ts#L195)

___

### convertSQLValueToGQLValueForModule

▸ **convertSQLValueToGQLValueForModule**(`serverData`: *any*, `mod`: [*default*](../classes/base_root_module.default.md), `row`: [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md), `graphqlFields`: [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md)): [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)

Converts a SQL value directly coming from the database as it is
to a graphql value for this specific module, this
only includes prop extensions and standard properties
and excludes everything else

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`serverData` | *any* | the server data information   |
`mod` | [*default*](../classes/base_root_module.default.md) | the module in question   |
`row` | [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md) | the row value, with all the columns it has; the row can be overblown with other field data, this will extract only the data required for this module   |
`graphqlFields` | [*IGQLRequestFields*](../interfaces/gql_querier.igqlrequestfields.md) | contains the only properties that are required in the request provided by grapql fields, eg {id: {}, name: {}}   |

**Returns:** [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)

a graphql value

Defined in: [base/Root/Module/sql.ts:259](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/sql.ts#L259)

___

### getSQLTableDefinitionForModule

▸ **getSQLTableDefinitionForModule**(`mod`: [*default*](../classes/base_root_module.default.md)): [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)

Provides the table that is necesary to include this module and all
its children child definitions into it

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`mod` | [*default*](../classes/base_root_module.default.md) | the module in question   |

**Returns:** [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)

a whole table schema for the module table

Defined in: [base/Root/Module/sql.ts:34](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/sql.ts#L34)

___

### getSQLTablesSchemaForModule

▸ **getSQLTablesSchemaForModule**(`mod`: [*default*](../classes/base_root_module.default.md)): [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md)

Provides the SQL table schemas that are contained
within this module, you expect one schema per item definition
it contains

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`mod` | [*default*](../classes/base_root_module.default.md) | the module in question   |

**Returns:** [*ISQLSchemaDefinitionType*](../interfaces/base_root_sql.isqlschemadefinitiontype.md)

a partial database schema for the module itself, all the child modules, and the item definition

Defined in: [base/Root/Module/sql.ts:156](https://github.com/onzag/itemize/blob/3efa2a4a/base/Root/Module/sql.ts#L156)
