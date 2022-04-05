[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyView/PropertyViewLocation](../modules/client_internal_components_PropertyView_PropertyViewLocation.md) / IPropertyViewLocationRendererProps

# Interface: IPropertyViewLocationRendererProps

[client/internal/components/PropertyView/PropertyViewLocation](../modules/client_internal_components_PropertyView_PropertyViewLocation.md).IPropertyViewLocationRendererProps

The property view location renderer props

## Hierarchy

- [`IPropertyViewRendererProps`](client_internal_components_PropertyView.IPropertyViewRendererProps.md)<[`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)\>

  ↳ **`IPropertyViewLocationRendererProps`**

## Table of contents

### Properties

- [args](client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md#args)
- [canResetViewportCenter](client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md#canresetviewportcenter)
- [currentValue](client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md#currentvalue)
- [rtl](client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md#rtl)
- [viewport](client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md#viewport)

### Methods

- [onResetViewportCenter](client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md#onresetviewportcenter)
- [onViewportChange](client_internal_components_PropertyView_PropertyViewLocation.IPropertyViewLocationRendererProps.md#onviewportchange)

## Properties

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[args](client_internal_components_PropertyView.IPropertyViewRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/f2f29986/client/internal/renderer.ts#L19)

___

### canResetViewportCenter

• **canResetViewportCenter**: `boolean`

can the viewport center be reset? this allows
to show a button when the viewport can indeed
be reset

#### Defined in

[client/internal/components/PropertyView/PropertyViewLocation.tsx:34](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/PropertyViewLocation.tsx#L34)

___

### currentValue

• **currentValue**: [`IPropertyDefinitionSupportedLocationType`](base_Root_Module_ItemDefinition_PropertyDefinition_types_location.IPropertyDefinitionSupportedLocationType.md)

The current value to be displayed

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[currentValue](client_internal_components_PropertyView.IPropertyViewRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyView/index.tsx:43](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L43)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[rtl](client_internal_components_PropertyView.IPropertyViewRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/f2f29986/client/internal/renderer.ts#L15)

___

### viewport

• **viewport**: [`IViewport`](client_internal_components_PropertyEntry_PropertyEntryLocation.IViewport.md)

A viewport that is currently in use

#### Defined in

[client/internal/components/PropertyView/PropertyViewLocation.tsx:20](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/PropertyViewLocation.tsx#L20)

## Methods

### onResetViewportCenter

▸ **onResetViewportCenter**(): `void`

Reset viewport center

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyView/PropertyViewLocation.tsx:28](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/PropertyViewLocation.tsx#L28)

___

### onViewportChange

▸ **onViewportChange**(`viewport`): `void`

The viewport change event

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewport` | [`IViewport`](client_internal_components_PropertyEntry_PropertyEntryLocation.IViewport.md) |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyView/PropertyViewLocation.tsx:24](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/PropertyViewLocation.tsx#L24)
