[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/version-null-value

# Module: server/version-null-value

PostgreSQL does not support versions as being null, but technically versions are null
so empty string is used in such a case, but we need to clear that up after parsed

## Table of contents

### Functions

- [convertVersionsIntoNullsWhenNecessary](server_version_null_value.md#convertversionsintonullswhennecessary)

## Functions

### convertVersionsIntoNullsWhenNecessary

▸ **convertVersionsIntoNullsWhenNecessary**(`value`): [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)

Modifies the value in place to remove empty string version values
which are invalid to nulls

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md) | the value in question |

#### Returns

[`ISQLTableRowValue`](../interfaces/base_Root_sql.ISQLTableRowValue.md)

the same value, this function modifies the value in place

#### Defined in

[server/version-null-value.ts:15](https://github.com/onzag/itemize/blob/73e0c39e/server/version-null-value.ts#L15)
