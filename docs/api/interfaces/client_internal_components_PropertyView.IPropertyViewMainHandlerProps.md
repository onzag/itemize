[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyView](../modules/client_internal_components_PropertyView.md) / IPropertyViewMainHandlerProps

# Interface: IPropertyViewMainHandlerProps\<ValueType, RendererPropsType\>

[client/internal/components/PropertyView](../modules/client_internal_components_PropertyView.md).IPropertyViewMainHandlerProps

This is what the main handler recieves and every handler that works
under it will receive as well

## Type parameters

| Name | Type |
| :------ | :------ |
| `ValueType` | extends [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |
| `RendererPropsType` | `RendererPropsType` |

## Hierarchy

- **`IPropertyViewMainHandlerProps`**

  ↳ [`IPropertyViewHandlerProps`](client_internal_components_PropertyView.IPropertyViewHandlerProps.md)

## Table of contents

### Properties

- [cacheFiles](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#cachefiles)
- [capitalize](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#capitalize)
- [containerId](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#containerid)
- [displayHidden](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#displayhidden)
- [forId](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#forid)
- [forVersion](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#forversion)
- [handleAs](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#handleas)
- [highlights](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#highlights)
- [include](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#include)
- [itemDefinition](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#itemdefinition)
- [property](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#property)
- [renderer](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#renderer)
- [rendererArgs](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#rendererargs)
- [state](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#state)
- [useAppliedValue](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#useappliedvalue)

## Properties

### cacheFiles

• **cacheFiles**: `boolean`

Whether file urls are to be cached

#### Defined in

[client/internal/components/PropertyView/index.tsx:134](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L134)

___

### capitalize

• `Optional` **capitalize**: `boolean`

Whether to capitalize the output value

Provided by the user check base.tsx

#### Defined in

[client/internal/components/PropertyView/index.tsx:102](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L102)

___

### containerId

• **containerId**: `string`

A current container id where the things are currently stored
this value can be null for new items as it only expresses where things
are "currently" stored not where they will be stored once submit is done

Automatically Provided check base.tsx
retrieved from the applied value from the item-definition.tsx context in the given slot

#### Defined in

[client/internal/components/PropertyView/index.tsx:60](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L60)

___

### displayHidden

• `Optional` **displayHidden**: `boolean`

Will display even if it's hidden

#### Defined in

[client/internal/components/PropertyView/index.tsx:138](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L138)

___

### forId

• **forId**: `string`

The slot id in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Defined in

[client/internal/components/PropertyView/index.tsx:82](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L82)

___

### forVersion

• **forVersion**: `string`

The slot version in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Defined in

[client/internal/components/PropertyView/index.tsx:89](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L89)

___

### handleAs

• `Optional` **handleAs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `subtype?` | `string` |
| `type` | `string` |

#### Defined in

[client/internal/components/PropertyView/index.tsx:149](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L149)

___

### highlights

• **highlights**: [`IElasticHighlighPropertyInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlighPropertyInfo.md)

The highlights

Provided by the item via the record properties
may be developer provided in the item

#### Defined in

[client/internal/components/PropertyView/index.tsx:145](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L145)

___

### include

• **include**: [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md)

An optional include, or null, where the property is encountered

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Defined in

[client/internal/components/PropertyView/index.tsx:67](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L67)

___

### itemDefinition

• **itemDefinition**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

The item definition in question, either a standard, search mode, extended, or some
combination, but nonetheless always available

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Defined in

[client/internal/components/PropertyView/index.tsx:75](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L75)

___

### property

• **property**: [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

The property in question

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Defined in

[client/internal/components/PropertyView/index.tsx:96](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L96)

___

### renderer

• `Optional` **renderer**: `ComponentType`\<`RendererPropsType`\>

An alernative renderer chosen for this

Developer Provided check base.tsx

#### Defined in

[client/internal/components/PropertyView/index.tsx:123](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L123)

___

### rendererArgs

• `Optional` **rendererArgs**: `object`

Renderer args to be used, either by the default or
the alternative

Developer Provided check base.tsx

#### Defined in

[client/internal/components/PropertyView/index.tsx:130](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L130)

___

### state

• **state**: [`IPropertyDefinitionState`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)\<`ValueType`\>

The state of the property definition, same as property.getState or property.getStateNoExternalChecking
but this value is more efficient to access

Automatically Provided check base.tsx
filtered for this specific property from the item-definition.tsx context state value

#### Defined in

[client/internal/components/PropertyView/index.tsx:110](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L110)

___

### useAppliedValue

• `Optional` **useAppliedValue**: `boolean`

Use applied value rather than the actual
value

Provided by the user check base.tsx

#### Defined in

[client/internal/components/PropertyView/index.tsx:117](https://github.com/onzag/itemize/blob/59702dd5/client/internal/components/PropertyView/index.tsx#L117)
