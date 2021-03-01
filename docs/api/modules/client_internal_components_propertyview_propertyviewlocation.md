[](../README.md) / [Exports](../modules.md) / client/internal/components/PropertyView/PropertyViewLocation

# Module: client/internal/components/PropertyView/PropertyViewLocation

The property view location handler

## Table of contents

### Classes

- [PropertyViewLocation](../classes/client_internal_components_propertyview_propertyviewlocation.propertyviewlocation.md)

### Interfaces

- [IPropertyViewLocationRendererProps](../interfaces/client_internal_components_propertyview_propertyviewlocation.ipropertyviewlocationrendererprops.md)

### Functions

- [isCenterBasicallyEquals](client_internal_components_propertyview_propertyviewlocation.md#iscenterbasicallyequals)

## Functions

### isCenterBasicallyEquals

▸ **isCenterBasicallyEquals**(`one`: [*number*, *number*], `two`: [*number*, *number*]): *boolean*

cheap function to compare two lng, and lat pairs to see
if they are basically equal

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`one` | [*number*, *number*] | an array of [lat, lng]   |
`two` | [*number*, *number*] | another array of [lat, lng]   |

**Returns:** *boolean*

a boolean on whether it is for all intents and purposes an equal location

Defined in: [client/internal/components/PropertyView/PropertyViewLocation.tsx:53](https://github.com/onzag/itemize/blob/28218320/client/internal/components/PropertyView/PropertyViewLocation.tsx#L53)
