[](../README.md) / [Exports](../modules.md) / server/version-null-value

# Module: server/version-null-value

PostgreSQL does not support versions as being null, but technically versions are null
so empty string is used in such a case, but we need to clear that up after parsed

## Table of contents

### Functions

- [convertVersionsIntoNullsWhenNecessary](server_version_null_value.md#convertversionsintonullswhennecessary)

## Functions

### convertVersionsIntoNullsWhenNecessary

▸ **convertVersionsIntoNullsWhenNecessary**(`value`: [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)): [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)

Modifies the value in place to remove empty string version values
which are invalid to nulls

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md) | the value in question   |

**Returns:** [*ISQLTableRowValue*](../interfaces/base_root_sql.isqltablerowvalue.md)

the same value, this function modifies the value in place

Defined in: [server/version-null-value.ts:15](https://github.com/onzag/itemize/blob/3efa2a4a/server/version-null-value.ts#L15)
