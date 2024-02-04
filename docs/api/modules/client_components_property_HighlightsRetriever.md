[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/property/HighlightsRetriever

# Module: client/components/property/HighlightsRetriever

## Table of contents

### Interfaces

- [IHighlightRetrieverProps](../interfaces/client_components_property_HighlightsRetriever.IHighlightRetrieverProps.md)

### Functions

- [default](client_components_property_HighlightsRetriever.md#default)
- [useHighlightsRetriever](client_components_property_HighlightsRetriever.md#usehighlightsretriever)

## Functions

### default

▸ **default**(`props`): `Element`

Retrieves the highlights for a given property
special to be used with full type highlights

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IHighlightRetrieverProps`](../interfaces/client_components_property_HighlightsRetriever.IHighlightRetrieverProps.md) |

#### Returns

`Element`

#### Defined in

[client/components/property/HighlightsRetriever.tsx:43](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/HighlightsRetriever.tsx#L43)

___

### useHighlightsRetriever

▸ **useHighlightsRetriever**(`propertyId`): [`IElasticHighlighPropertyInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlighPropertyInfo.md)

Provides the highlights for a given property id
specially to be used with full properties

#### Parameters

| Name | Type |
| :------ | :------ |
| `propertyId` | `string` |

#### Returns

[`IElasticHighlighPropertyInfo`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlighPropertyInfo.md)

#### Defined in

[client/components/property/HighlightsRetriever.tsx:11](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/HighlightsRetriever.tsx#L11)
