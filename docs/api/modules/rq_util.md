[@onzag/itemize](../README.md) / [Modules](../modules.md) / rq-util

# Module: rq-util

Contains rq utlity functions that are used everywhere accross
the itemize app

## Table of contents

### Functions

- [deepMerge](rq_util.md#deepmerge)
- [flattenRawRQValueOrFields](rq_util.md#flattenrawrqvalueorfields)
- [requestFieldsAreContained](rq_util.md#requestfieldsarecontained)

## Functions

### deepMerge

▸ **deepMerge**(`rqValueOrFieldsOverride`, `rqValueOfFieldsOverriden`): `any`

Merges request fields or values together

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rqValueOrFieldsOverride` | `any` | the value that overrides |
| `rqValueOfFieldsOverriden` | `any` | the value that is overriden |

#### Returns

`any`

new merged request fields

#### Defined in

[rq-util.ts:61](https://github.com/onzag/itemize/blob/73e0c39e/rq-util.ts#L61)

___

### flattenRawRQValueOrFields

▸ **flattenRawRQValueOrFields**(`fieldsOrValue`): `any`

When requesting fields the DATA can be there, so it needs to be flattened
into the flattened form without the DATA but all data free

#### Parameters

| Name | Type |
| :------ | :------ |
| `fieldsOrValue` | [`IRQValue`](../interfaces/rq_querier.IRQValue.md) \| [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) |

#### Returns

`any`

#### Defined in

[rq-util.ts:100](https://github.com/onzag/itemize/blob/73e0c39e/rq-util.ts#L100)

___

### requestFieldsAreContained

▸ **requestFieldsAreContained**(`requestFieldsSubset`, `requestFieldsOrValueMain`): `boolean`

Checks whether a subset is contained within other subset of
request fields or a value, preferably use against other request fields

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `requestFieldsSubset` | [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) | the request fields that is supposed to be a subset |
| `requestFieldsOrValueMain` | [`IRQValue`](../interfaces/rq_querier.IRQValue.md) \| [`IRQRequestFields`](../interfaces/rq_querier.IRQRequestFields.md) | the request fields or the value |

#### Returns

`boolean`

a boolean

#### Defined in

[rq-util.ts:17](https://github.com/onzag/itemize/blob/73e0c39e/rq-util.ts#L17)
