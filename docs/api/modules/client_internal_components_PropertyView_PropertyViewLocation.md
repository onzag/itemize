[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/internal/components/PropertyView/PropertyViewLocation

# Module: client/internal/components/PropertyView/PropertyViewLocation

The property view location handler

## Table of contents

### Classes

- [default](../classes/client_internal_components_PropertyView_PropertyViewLocation.default.md)

### Interfaces

- [IPropertyViewLocationRendererProps](../interfaces/client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md)

### Functions

- [isCenterBasicallyEquals](client_internal_components_PropertyView_PropertyViewLocation.md#iscenterbasicallyequals)

## Functions

### isCenterBasicallyEquals

▸ **isCenterBasicallyEquals**(`one`, `two`): `boolean`

cheap function to compare two lng, and lat pairs to see
if they are basically equal

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `one` | [`number`, `number`] | an array of [lat, lng] |
| `two` | [`number`, `number`] | another array of [lat, lng] |

#### Returns

`boolean`

a boolean on whether it is for all intents and purposes an equal location

#### Defined in

[client/internal/components/PropertyView/PropertyViewLocation.tsx:54](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewLocation.tsx#L54)
