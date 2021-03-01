[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyView/PropertyViewLocation](../modules/client_internal_components_propertyview_propertyviewlocation.md) / IPropertyViewLocationRendererProps

# Interface: IPropertyViewLocationRendererProps

[client/internal/components/PropertyView/PropertyViewLocation](../modules/client_internal_components_propertyview_propertyviewlocation.md).IPropertyViewLocationRendererProps

The property view location renderer props

## Hierarchy

* [*IPropertyViewRendererProps*](client_internal_components_propertyview.ipropertyviewrendererprops.md)<[*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)\>

  ↳ **IPropertyViewLocationRendererProps**

## Table of contents

### Properties

- [args](client_internal_components_propertyview_propertyviewlocation.ipropertyviewlocationrendererprops.md#args)
- [canResetViewportCenter](client_internal_components_propertyview_propertyviewlocation.ipropertyviewlocationrendererprops.md#canresetviewportcenter)
- [currentValue](client_internal_components_propertyview_propertyviewlocation.ipropertyviewlocationrendererprops.md#currentvalue)
- [onResetViewportCenter](client_internal_components_propertyview_propertyviewlocation.ipropertyviewlocationrendererprops.md#onresetviewportcenter)
- [onViewportChange](client_internal_components_propertyview_propertyviewlocation.ipropertyviewlocationrendererprops.md#onviewportchange)
- [rtl](client_internal_components_propertyview_propertyviewlocation.ipropertyviewlocationrendererprops.md#rtl)
- [viewport](client_internal_components_propertyview_propertyviewlocation.ipropertyviewlocationrendererprops.md#viewport)

## Properties

### args

• **args**: *object*

The renderer args

#### Type declaration:

Inherited from: [IPropertyViewRendererProps](client_internal_components_propertyview.ipropertyviewrendererprops.md).[args](client_internal_components_propertyview.ipropertyviewrendererprops.md#args)

Defined in: [client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/renderer.ts#L19)

___

### canResetViewportCenter

• **canResetViewportCenter**: *boolean*

can the viewport center be reset? this allows
to show a button when the viewport can indeed
be reset

Defined in: [client/internal/components/PropertyView/PropertyViewLocation.tsx:33](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyView/PropertyViewLocation.tsx#L33)

___

### currentValue

• **currentValue**: [*IPropertyDefinitionSupportedLocationType*](base_root_module_itemdefinition_propertydefinition_types_location.ipropertydefinitionsupportedlocationtype.md)

The current value to be displayed

Inherited from: [IPropertyViewRendererProps](client_internal_components_propertyview.ipropertyviewrendererprops.md).[currentValue](client_internal_components_propertyview.ipropertyviewrendererprops.md#currentvalue)

Defined in: [client/internal/components/PropertyView/index.tsx:43](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyView/index.tsx#L43)

___

### onResetViewportCenter

• **onResetViewportCenter**: () => *void*

Reset viewport center

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyView/PropertyViewLocation.tsx:27](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyView/PropertyViewLocation.tsx#L27)

Defined in: [client/internal/components/PropertyView/PropertyViewLocation.tsx:27](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyView/PropertyViewLocation.tsx#L27)

___

### onViewportChange

• **onViewportChange**: (`viewport`: [*IViewport*](client_internal_components_propertyentry_propertyentrylocation.iviewport.md)) => *void*

The viewport change event

#### Type declaration:

▸ (`viewport`: [*IViewport*](client_internal_components_propertyentry_propertyentrylocation.iviewport.md)): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`viewport` | [*IViewport*](client_internal_components_propertyentry_propertyentrylocation.iviewport.md) |

**Returns:** *void*

Defined in: [client/internal/components/PropertyView/PropertyViewLocation.tsx:23](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyView/PropertyViewLocation.tsx#L23)

Defined in: [client/internal/components/PropertyView/PropertyViewLocation.tsx:23](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyView/PropertyViewLocation.tsx#L23)

___

### rtl

• **rtl**: *boolean*

Whether it is in rtl mode for a rtl language

Inherited from: [IPropertyViewRendererProps](client_internal_components_propertyview.ipropertyviewrendererprops.md).[rtl](client_internal_components_propertyview.ipropertyviewrendererprops.md#rtl)

Defined in: [client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/renderer.ts#L15)

___

### viewport

• **viewport**: [*IViewport*](client_internal_components_propertyentry_propertyentrylocation.iviewport.md)

A viewport that is currently in use

Defined in: [client/internal/components/PropertyView/PropertyViewLocation.tsx:19](https://github.com/onzag/itemize/blob/55e63f2c/client/internal/components/PropertyView/PropertyViewLocation.tsx#L19)
