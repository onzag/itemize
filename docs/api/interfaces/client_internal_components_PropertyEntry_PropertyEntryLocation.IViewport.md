[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryLocation](../modules/client_internal_components_PropertyEntry_PropertyEntryLocation.md) / IViewport

# Interface: IViewport

[client/internal/components/PropertyEntry/PropertyEntryLocation](../modules/client_internal_components_PropertyEntry_PropertyEntryLocation.md).IViewport

This is your viewport object, it contains a center
and a zoom; this viewport object is meant to work
nicely with leaflet but it's not limited to it, however
it won't work out of the box as you still need the conversions
for the zooms

## Table of contents

### Properties

- [center](client_internal_components_PropertyEntry_PropertyEntryLocation.IViewport.md#center)
- [zoom](client_internal_components_PropertyEntry_PropertyEntryLocation.IViewport.md#zoom)

## Properties

### center

• **center**: [`number`, `number`]

The center in the lat, lng form

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:44](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L44)

___

### zoom

• **zoom**: `number` \| [`IViewportZoomEnumType`](../enums/client_internal_components_PropertyEntry_PropertyEntryLocation.IViewportZoomEnumType.md)

The zoom, either one of our default types or as you manually
change an user defined custom number

#### Defined in

[client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:49](https://github.com/onzag/itemize/blob/a24376ed/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L49)
