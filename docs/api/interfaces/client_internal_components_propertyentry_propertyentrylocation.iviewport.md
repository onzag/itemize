[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry/PropertyEntryLocation](../modules/client_internal_components_propertyentry_propertyentrylocation.md) / IViewport

# Interface: IViewport

[client/internal/components/PropertyEntry/PropertyEntryLocation](../modules/client_internal_components_propertyentry_propertyentrylocation.md).IViewport

This is your viewport object, it contains a center
and a zoom; this viewport object is meant to work
nicely with leaflet but it's not limited to it, however
it won't work out of the box as you still need the conversions
for the zooms

## Table of contents

### Properties

- [center](client_internal_components_propertyentry_propertyentrylocation.iviewport.md#center)
- [zoom](client_internal_components_propertyentry_propertyentrylocation.iviewport.md#zoom)

## Properties

### center

• **center**: [*number*, *number*]

The center in the lat, lng form

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:43](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L43)

___

### zoom

• **zoom**: *number* \| [*SMALL*](../enums/client_internal_components_propertyentry_propertyentrylocation.iviewportzoomenumtype.md#small) \| [*MEDIUM*](../enums/client_internal_components_propertyentry_propertyentrylocation.iviewportzoomenumtype.md#medium) \| [*LARGE*](../enums/client_internal_components_propertyentry_propertyentrylocation.iviewportzoomenumtype.md#large)

The zoom, either one of our default types or as you manually
change an user defined custom number

Defined in: [client/internal/components/PropertyEntry/PropertyEntryLocation.tsx:48](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyEntry/PropertyEntryLocation.tsx#L48)
