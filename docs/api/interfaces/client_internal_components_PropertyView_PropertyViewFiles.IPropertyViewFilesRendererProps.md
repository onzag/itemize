[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyView/PropertyViewFiles](../modules/client_internal_components_PropertyView_PropertyViewFiles.md) / IPropertyViewFilesRendererProps

# Interface: IPropertyViewFilesRendererProps

[client/internal/components/PropertyView/PropertyViewFiles](../modules/client_internal_components_PropertyView_PropertyViewFiles.md).IPropertyViewFilesRendererProps

The property view renderer props that every property renderer
for file contains

## Hierarchy

- [`IPropertyViewRendererProps`](client_internal_components_PropertyView.IPropertyViewRendererProps.md)\<[`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype)\>

  ↳ **`IPropertyViewFilesRendererProps`**

## Table of contents

### Properties

- [args](client_internal_components_PropertyView_PropertyViewFiles.IPropertyViewFilesRendererProps.md#args)
- [currentValue](client_internal_components_PropertyView_PropertyViewFiles.IPropertyViewFilesRendererProps.md#currentvalue)
- [currentValueWithInfo](client_internal_components_PropertyView_PropertyViewFiles.IPropertyViewFilesRendererProps.md#currentvaluewithinfo)
- [rtl](client_internal_components_PropertyView_PropertyViewFiles.IPropertyViewFilesRendererProps.md#rtl)

## Properties

### args

• **args**: `Object`

The renderer args

#### Index signature

▪ [arg: `string`]: `any`

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[args](client_internal_components_PropertyView.IPropertyViewRendererProps.md#args)

#### Defined in

[client/internal/renderer.ts:19](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/renderer.ts#L19)

___

### currentValue

• **currentValue**: [`PropertyDefinitionSupportedFilesType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types_files.md#propertydefinitionsupportedfilestype)

The current value to be displayed

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[currentValue](client_internal_components_PropertyView.IPropertyViewRendererProps.md#currentvalue)

#### Defined in

[client/internal/components/PropertyView/index.tsx:44](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L44)

___

### currentValueWithInfo

• **currentValueWithInfo**: `IPropertyViewWithInfo`[]

#### Defined in

[client/internal/components/PropertyView/PropertyViewFiles.tsx:50](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/PropertyViewFiles.tsx#L50)

___

### rtl

• **rtl**: `boolean`

Whether it is in rtl mode for a rtl language

#### Inherited from

[IPropertyViewRendererProps](client_internal_components_PropertyView.IPropertyViewRendererProps.md).[rtl](client_internal_components_PropertyView.IPropertyViewRendererProps.md#rtl)

#### Defined in

[client/internal/renderer.ts:15](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/renderer.ts#L15)
