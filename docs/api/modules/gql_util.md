[@onzag/itemize](../README.md) / [Modules](../modules.md) / gql-util

# Module: gql-util

Contains graphql utlity functions that are used everywhere accross
the itemize app

## Table of contents

### Functions

- [deepMerge](gql_util.md#deepmerge)
- [flattenRawGQLValueOrFields](gql_util.md#flattenrawgqlvalueorfields)
- [requestFieldsAreContained](gql_util.md#requestfieldsarecontained)

## Functions

### deepMerge

▸ **deepMerge**(`gqlValueOrFieldsOverride`, `gqlValueOfFieldsOverriden`): `any`

Merges request fields or values together

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gqlValueOrFieldsOverride` | `any` | the value that overrides |
| `gqlValueOfFieldsOverriden` | `any` | the value that is overriden |

#### Returns

`any`

new merged request fields

#### Defined in

[gql-util.ts:61](https://github.com/onzag/itemize/blob/f2f29986/gql-util.ts#L61)

___

### flattenRawGQLValueOrFields

▸ **flattenRawGQLValueOrFields**(`fieldsOrValue`): `any`

When requesting fields the DATA can be there, so it needs to be flattened
into the flattened form without the DATA but all data free

#### Parameters

| Name | Type |
| :------ | :------ |
| `fieldsOrValue` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) |

#### Returns

`any`

#### Defined in

[gql-util.ts:100](https://github.com/onzag/itemize/blob/f2f29986/gql-util.ts#L100)

___

### requestFieldsAreContained

▸ **requestFieldsAreContained**(`requestFieldsSubset`, `requestFieldsOrValueMain`): `boolean`

Checks whether a subset is contained within other subset of
request fields or a value, preferably use against other request fields

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestFieldsSubset` | [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | the request fields that is supposed to be a subset |
| `requestFieldsOrValueMain` | [`IGQLValue`](../interfaces/gql_querier.IGQLValue.md) \| [`IGQLRequestFields`](../interfaces/gql_querier.IGQLRequestFields.md) | the request fields or the value |

#### Returns

`boolean`

a boolean

#### Defined in

[gql-util.ts:17](https://github.com/onzag/itemize/blob/f2f29986/gql-util.ts#L17)
