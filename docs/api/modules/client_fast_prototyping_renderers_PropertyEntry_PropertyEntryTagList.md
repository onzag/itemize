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

• `Const` **style**: `Object`

The styles of the renderer

#### Type declaration

| Name | Type |
| :------ | :------ |
| `autosuggestContainer` | \{ `display`: `string` = "block"; `position`: `string` = "relative"; `width`: `string` = "100%" } |
| `autosuggestContainer.display` | `string` |
| `autosuggestContainer.position` | `string` |
| `autosuggestContainer.width` | `string` |
| `autosuggestContainerOpen` | {} |
| `autosuggestFirstSectionContainer` | {} |
| `autosuggestFirstSuggestion` | {} |
| `autosuggestInput` | {} |
| `autosuggestInputOpen` | {} |
| `autosuggestMenuItem` | \{ `height`: `string` = "auto"; `paddingBottom`: `string` = "8px !important"; `paddingTop`: `string` = "4px !important" } |
| `autosuggestMenuItem.height` | `string` |
| `autosuggestMenuItem.paddingBottom` | `string` |
| `autosuggestMenuItem.paddingTop` | `string` |
| `autosuggestMenuItemMainText` | \{ `fontSize`: `string` = "1rem"; `lineHeight`: `string` = "1rem" } |
| `autosuggestMenuItemMainText.fontSize` | `string` |
| `autosuggestMenuItemMainText.lineHeight` | `string` |
| `autosuggestMenuItemSubText` | \{ `fontSize`: `string` = "0.75rem"; `lineHeight`: `string` = "0.75rem" } |
| `autosuggestMenuItemSubText.fontSize` | `string` |
| `autosuggestMenuItemSubText.lineHeight` | `string` |
| `autosuggestSectionContainer` | {} |
| `autosuggestSectionTitle` | {} |
| `autosuggestSuggestion` | {} |
| `autosuggestSuggestionHighlighted` | {} |
| `autosuggestSuggestionsContainer` | \{ `display`: `string` = "block"; `position`: ``"absolute"`` ; `top`: `string` ; `width`: `string` = "100%"; `zIndex`: `number` = 1000 } |
| `autosuggestSuggestionsContainer.display` | `string` |
| `autosuggestSuggestionsContainer.position` | ``"absolute"`` |
| `autosuggestSuggestionsContainer.top` | `string` |
| `autosuggestSuggestionsContainer.width` | `string` |
| `autosuggestSuggestionsContainer.zIndex` | `number` |
| `autosuggestSuggestionsContainerOpen` | {} |
| `autosuggestSuggestionsList` | {} |
| `chip` | \{ `margin`: `string` = "10px 10px 0 10px" } |
| `chip.margin` | `string` |
| `container` | \{ `paddingBottom`: `string` = "1.3rem"; `width`: `string` = "100%" } |
| `container.paddingBottom` | `string` |
| `container.width` | `string` |
| `description` | \{ `width`: `string` = "100%" } |
| `description.width` | `string` |
| `entry` | \{ `alignItems`: `string` = "center"; `display`: `string` = "flex"; `flexDirection`: `string` = "row"; `justifyContent`: `string` = "space-between"; `width`: `string` = "100%" } |
| `entry.alignItems` | `string` |
| `entry.display` | `string` |
| `entry.flexDirection` | `string` |
| `entry.justifyContent` | `string` |
| `entry.width` | `string` |
| `errorMessage` | \{ `color`: `string` = "#f44336"; `fontSize`: `string` = "0.85rem"; `height`: `string` = "1.3rem" } |
| `errorMessage.color` | `string` |
| `errorMessage.fontSize` | `string` |
| `errorMessage.height` | `string` |
| `fieldInput` | \{ `& > input`: \{ `flex`: `string` = "1 0 auto"; `marginBottom`: `string` = "-10px"; `padding`: `string` = "10px 0"; `width`: `string` = "200px" } ; `alignItems`: `string` = "center"; `display`: `string` = "flex"; `flexWrap`: `string` = "wrap"; `paddingBottom`: `string` = "10px"; `paddingLeft`: `string` = "12px"; `paddingTop`: `string` = "20px" } |
| `fieldInput.& > input` | \{ `flex`: `string` = "1 0 auto"; `marginBottom`: `string` = "-10px"; `padding`: `string` = "10px 0"; `width`: `string` = "200px" } |
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
| `icon` | \{ `color`: `string` = "#424242" } |
| `icon.color` | `string` |
| `label` | (`isInvalid`: `boolean`) => \{ `&.focused`: \{ `color`: `string`  } ; `color`: `string`  } |

#### Defined in

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryTagList.tsx:32](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryTagList.tsx#L32)

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

[client/fast-prototyping/renderers/PropertyEntry/PropertyEntryTagList.tsx:159](https://github.com/onzag/itemize/blob/59702dd5/client/fast-prototyping/renderers/PropertyEntry/PropertyEntryTagList.tsx#L159)
