[](../README.md) / [Exports](../modules.md) / base/Root/Module/ItemDefinition/Include/sql

# Module: base/Root/Module/ItemDefinition/Include/sql

This file contains utility functionality that is necessary in order to
setup includes into and out of the postgresql database as well
as how to build the definition for the tables

## Table of contents

### Functions

- [buildSQLQueryForInclude](base_root_module_itemdefinition_include_sql.md#buildsqlqueryforinclude)
- [convertGQLValueToSQLValueForInclude](base_root_module_itemdefinition_include_sql.md#convertgqlvaluetosqlvalueforinclude)
- [convertSQLValueToGQLValueForInclude](base_root_module_itemdefinition_include_sql.md#convertsqlvaluetogqlvalueforinclude)
- [getSQLTableDefinitionForInclude](base_root_module_itemdefinition_include_sql.md#getsqltabledefinitionforinclude)

## Functions

### buildSQLQueryForInclude

▸ **buildSQLQueryForInclude**(`serverData`: *any*, `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `args`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), `whereBuilder`: [*WhereBuilder*](../classes/database_wherebuilder.wherebuilder.md), `dictionary`: *string*): *void*

Builds a sql query for an include

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`serverData` | *any* | the server data information   |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition that contains the include   |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include in question   |
`args` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the args as they come from the search module, specific for this item (not nested)   |
`whereBuilder` | [*WhereBuilder*](../classes/database_wherebuilder.wherebuilder.md) | - |
`dictionary` | *string* | the dictionary to use to build the search    |

**Returns:** *void*

Defined in: [base/Root/Module/ItemDefinition/Include/sql.ts:213](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/ItemDefinition/Include/sql.ts#L213)

___

### convertGQLValueToSQLValueForInclude

▸ **convertGQLValueToSQLValueForInclude**(`serverData`: *any*, `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `data`: [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md), `oldData`: [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md), `uploadsClient`: [*default*](../classes/server_services_base_storageprovider.default.md)<any\>, `domain`: *string*, `dictionary`: *string*, `partialFields?`: *any*): [*ISQLStreamComposedTableRowValue*](../interfaces/base_root_sql.isqlstreamcomposedtablerowvalue.md)

Converts a GraphQL value into a SQL row data, it takes apart a complex
graphql value and converts it into a serializable sql form

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`serverData` | *any* | the server data   |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition in question   |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include in question   |
`data` | [*IGQLArgs*](../interfaces/gql_querier.igqlargs.md) | the graphql data value   |
`oldData` | [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md) | the old graphql data value that used to be stored for that include   |
`uploadsClient` | [*default*](../classes/server_services_base_storageprovider.default.md)<any\> | the uploads client   |
`domain` | *string* | - |
`dictionary` | *string* | the dictionary to use in full text search mode   |
`partialFields?` | *any* | fields to make a partial value rather than a total value, note that we don't recommend using partial fields in order to create because some properties might treat nulls in a fancy way, when creating all the table rows should be set, only when updating you should use partial fields; for example, if you have a field that has a property that is nullable but it's forced into some value it will be ignored in a partial field value, don't use partial fields to create   |

**Returns:** [*ISQLStreamComposedTableRowValue*](../interfaces/base_root_sql.isqlstreamcomposedtablerowvalue.md)

the partial sql result to be added into the table

Defined in: [base/Root/Module/ItemDefinition/Include/sql.ts:137](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/ItemDefinition/Include/sql.ts#L137)

___

### convertSQLValueToGQLValueForInclude

▸ **convertSQLValueToGQLValueForInclude**(`serverData`: *any*, `itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md), `row`: [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md), `graphqlFields?`: *any*): [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)

Given a SQL row it converts the value of the data contained
within that row into the valid graphql output

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`serverData` | *any* | the server data that is currently in use   |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | - |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include in question   |
`row` | [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md) | the row sql data   |
`graphqlFields?` | *any* | (optional) contains the only properties that are required in the request provided by grapql fields, eg {id: {}, name: {}}   |

**Returns:** [*IGQLValue*](../interfaces/gql_querier.igqlvalue.md)

a partial graphql value

Defined in: [base/Root/Module/ItemDefinition/Include/sql.ts:75](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/ItemDefinition/Include/sql.ts#L75)

___

### getSQLTableDefinitionForInclude

▸ **getSQLTableDefinitionForInclude**(`itemDefinition`: [*default*](../classes/base_root_module_itemdefinition.default.md), `include`: [*default*](../classes/base_root_module_itemdefinition_include.default.md)): [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)

Provides the table bit that is necessary to store include data
for this include when included from the parent definition

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`itemDefinition` | [*default*](../classes/base_root_module_itemdefinition.default.md) | the item definition that contains the include (not the referred)   |
`include` | [*default*](../classes/base_root_module_itemdefinition_include.default.md) | the include in question   |

**Returns:** [*ISQLTableDefinitionType*](../interfaces/base_root_sql.isqltabledefinitiontype.md)

the partial table definition schema for the include, prefixed and with the exclusion state

Defined in: [base/Root/Module/ItemDefinition/Include/sql.ts:30](https://github.com/onzag/itemize/blob/5fcde7cf/base/Root/Module/ItemDefinition/Include/sql.ts#L30)
