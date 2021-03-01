[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyView](../modules/client_internal_components_propertyview.md) / IPropertyViewMainHandlerProps

# Interface: IPropertyViewMainHandlerProps<RendererPropsType\>

[client/internal/components/PropertyView](../modules/client_internal_components_propertyview.md).IPropertyViewMainHandlerProps

This is what the main handler recieves and every handler that works
under it will receive as well

## Type parameters

Name |
:------ |
`RendererPropsType` |

## Hierarchy

* **IPropertyViewMainHandlerProps**

  ↳ [*IPropertyViewHandlerProps*](client_internal_components_propertyview.ipropertyviewhandlerprops.md)

## Table of contents

### Properties

- [cacheFiles](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#cachefiles)
- [capitalize](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#capitalize)
- [containerId](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#containerid)
- [forId](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#forid)
- [forVersion](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#forversion)
- [include](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#include)
- [itemDefinition](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#itemdefinition)
- [property](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#property)
- [renderer](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#renderer)
- [rendererArgs](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#rendererargs)
- [state](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#state)
- [useAppliedValue](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#useappliedvalue)

## Properties

### cacheFiles

• **cacheFiles**: *boolean*

Whether file urls are to be cached

Defined in: [client/internal/components/PropertyView/index.tsx:133](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/index.tsx#L133)

___

### capitalize

• `Optional` **capitalize**: *boolean*

Whether to capitalize the output value

Provided by the user check base.tsx

Defined in: [client/internal/components/PropertyView/index.tsx:101](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/index.tsx#L101)

___

### containerId

• **containerId**: *string*

A current container id where the things are currently stored
this value can be null for new items as it only expresses where things
are "currently" stored not where they will be stored once submit is done

Automatically Provided check base.tsx
retrieved from the applied value from the item-definition.tsx context in the given slot

Defined in: [client/internal/components/PropertyView/index.tsx:59](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/index.tsx#L59)

___

### forId

• **forId**: *string*

The slot id in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Defined in: [client/internal/components/PropertyView/index.tsx:81](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/index.tsx#L81)

___

### forVersion

• **forVersion**: *string*

The slot version in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Defined in: [client/internal/components/PropertyView/index.tsx:88](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/index.tsx#L88)

___

### include

• **include**: [*default*](../classes/base_root_module_itemdefinition_include.default.md)

An optional include, or null, where the property is encountered

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Defined in: [client/internal/components/PropertyView/index.tsx:66](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/index.tsx#L66)

___

### itemDefinition

• **itemDefinition**: [*default*](../classes/base_root_module_itemdefinition.default.md)

The item definition in question, either a standard, search mode, extended, or some
combination, but nonetheless always available

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Defined in: [client/internal/components/PropertyView/index.tsx:74](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/index.tsx#L74)

___

### property

• **property**: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md)

The property in question

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Defined in: [client/internal/components/PropertyView/index.tsx:95](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/index.tsx#L95)

___

### renderer

• `Optional` **renderer**: *ComponentType*<RendererPropsType\>

An alernative renderer chosen for this

Developer Provided check base.tsx

Defined in: [client/internal/components/PropertyView/index.tsx:122](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/index.tsx#L122)

___

### rendererArgs

• `Optional` **rendererArgs**: *object*

Renderer args to be used, either by the default or
the alternative

Developer Provided check base.tsx

Defined in: [client/internal/components/PropertyView/index.tsx:129](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/index.tsx#L129)

___

### state

• **state**: [*IPropertyDefinitionState*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md)

The state of the property definition, same as property.getState or property.getStateNoExternalChecking
but this value is more efficient to access

Automatically Provided check base.tsx
filtered for this specific property from the item-definition.tsx context state value

Defined in: [client/internal/components/PropertyView/index.tsx:109](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/index.tsx#L109)

___

### useAppliedValue

• `Optional` **useAppliedValue**: *boolean*

Use applied value rather than the actual
value

Provided by the user check base.tsx

Defined in: [client/internal/components/PropertyView/index.tsx:116](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyView/index.tsx#L116)
