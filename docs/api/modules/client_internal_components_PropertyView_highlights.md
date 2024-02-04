[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/components/PropertyView/highlights

# Module: client/internal/components/PropertyView/highlights

## Table of contents

### Functions

- [applyHighlights](client_internal_components_PropertyView_highlights.md#applyhighlights)
- [extractHighlightsFromFull](client_internal_components_PropertyView_highlights.md#extracthighlightsfromfull)

## Functions

### applyHighlights

▸ **applyHighlights**(`strRaw`, `highlightsRaw`): `Object`

Applies the highlights

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `strRaw` | `string` | a plain string value |
| `highlightsRaw` | [`IElasticHighlighPropertyInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlighPropertyInfo.md) | - |

#### Returns

`Object`

an object on whether it was applied, if it was, the result will be HTML encoded as rich text

| Name | Type |
| :------ | :------ |
| `applied` | `boolean` |
| `value` | `string` |

#### Defined in

[client/internal/components/PropertyView/highlights.ts:74](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/highlights.ts#L74)

___

### extractHighlightsFromFull

▸ **extractHighlightsFromFull**(`highlights`): [`IElasticHighlighPropertyInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlighPropertyInfo.md)

Given full highlights it will extract them into standard highlights to be used
for standard matching

#### Parameters

| Name | Type |
| :------ | :------ |
| `highlights` | [`IElasticHighlighPropertyInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlighPropertyInfo.md) |

#### Returns

[`IElasticHighlighPropertyInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlighPropertyInfo.md)

#### Defined in

[client/internal/components/PropertyView/highlights.ts:9](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/highlights.ts#L9)
