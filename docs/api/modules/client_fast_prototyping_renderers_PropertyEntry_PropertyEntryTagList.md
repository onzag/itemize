[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/renderers/PropertyEntry/PropertyEntryTagList

# Module: client/fast-prototyping/renderers/PropertyEntry/PropertyEntryTagList

The property entry TagList fast prototyping renderer uses material ui to render
an entry for a TagList value

## Table of contents

### Interfaces

- [ITagListSuggestion](../interfaces/client_fast_prototyping_renderers_PropertyEntry_PropertyEntryTagList.ITagListSuggestion.md)

### Variables

- [style](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryTagList.md#style)

### Functions

- [default](client_fast_prototyping_renderers_PropertyEntry_PropertyEntryTagList.md#default)

## Variables

### style

• **style**: `Object`

The styles of the renderer

#### Type declaration

| Name | Type |
| :------ | :------ |
| `autosuggestContainer` | `Object` |
| `autosuggestContainer.display` | `string` |
| `autosuggestContainer.position` | `string` |
| `autosuggestContainer.width` | `string` |
| `autosuggestContainerOpen` | `Object` |
| `autosuggestFirstSectionContainer` | `Object` |
| `autosuggestFirstSuggestion` | `Object` |
| `autosuggestInput` | `Object` |
| `autosuggestInputOpen` | `Object` |
| `autosuggestMenuItem` | `Object` |
| `autosuggestMenuItem.height` | `string` |
| `autosuggestMenuItem.paddingBottom` | `string` |
| `autosuggestMenuItem.paddingTop` | `string` |
| `autosuggestMenuItemMainText` | `Object` |
| `autosuggestMenuItemMainText.fontSize` | `string` |
| `autosuggestMenuItemMainText.lineHeight` | `string` |
| `autosuggestMenuItemSubText` | `Object` |
| `autosuggestMenuItemSubText.fontSize` | `string` |
| `autosuggestMenuItemSubText.lineHeight` | `string` |
| `autosuggestSectionContainer` | `Object` |
| `autosuggestSectionTitle` | `Object` |
| `autosuggestSuggestion` | `Object` |
| `autosuggestSuggestionHighlighted` | `Object` |
| `autosuggestSuggestionsContainer` | `Object` |
| `autosuggestSuggestionsContainer.display` | `string` |
| `autosuggestSuggestionsContainer.position` | ``"absolute"`` |
| `autosuggestSuggestionsContainer.top` | `string` |
| `autosuggestSuggestionsContainer.width` | `string` |
| `autosuggestSuggestionsContainer.zIndex` | `number` |
| `autosuggestSuggestionsContainerOpen` | `Object` |
| `autosuggestSuggestionsList` | `Object` |
| `chip` | `Object` |
| `chip.margin` | `string` |
| `container` | `Object` |
| `container.paddingBottom` | `string` |
| `container.width` | `string` |
| `description` | `Object` |
| `description.width` | `string` |
| `entry` | `Object` |
| `entry.alignItems` | `string` |
| `entry.display` | `string` |
| `entry.flexDirection` | `string` |
| `entry.justifyContent` | `string` |
| `entry.width` | `string` |
| `errorMessage` | `Object` |
| `errorMessage.color` | `string` |
| `errorMessage.fontSize` | `string` |
| `errorMessage.height` | `string` |
| `fieldInput` | `Object` |
| `fieldInput.& > input` | `Object` |
| `fieldInput.& > input.flex` | `string` |
| `fieldInput.& > input.marginBottom` | `string` |
| `fieldInput.& > input.padding` | `string` |
| `fieldInput.& > input.width` | `string` |
| `fieldInput.alignItems` | `string` |
| `fieldInput.display` | `string` |
| `fieldInput.flexWrap` | `string` |
| `fieldInput.paddingBottom` | `string` |
| `fieldInput.paddingLeft` | `string` |
| `fieldInput.paddingTop` | `string` |
| `icon` | `Object` |
| `icon.color` | `string` |
| `label` | (`isInvalid`: `boolean`) => { `&.focused`: { `color`: `string`  } ; `color`: `string`  } |

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryTagList.tsx:32](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryTagList.tsx#L32)

## Functions

### default

▸ **default**(`props`): `Element`

This is the fast prototyping TagList renderer and uses material ui in order to render a slick
TagList entry for it, supports the following args

- descriptionAsAlert: displays the description as an alert rather than its normal form

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`IPropertyEntryTagListRendererProps`](../interfaces/client_internal_components_PropertyEntry_PropertyEntryTagList.IPropertyEntryTagListRendererProps.md) | the entry TagList props |

#### Returns

`Element`

a react element

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryTagList.tsx:159](https://github.com/onzag/itemize/blob/f2db74a5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryTagList.tsx#L159)
