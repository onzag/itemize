[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry](../modules/client_internal_components_PropertyEntry.md) / IPropertyEntryMainHandlerProps

# Interface: IPropertyEntryMainHandlerProps<ValueType, RendererPropsType\>

[client/internal/components/PropertyEntry](../modules/client_internal_components_PropertyEntry.md).IPropertyEntryMainHandlerProps

This is what the whole entry react component expects as its properties
this is what should be fed to the generic PropertyEntry and it doesn't extend
anything, an optional renderer and rendererArgs can be passed to modify where
the values are distributed

## Type parameters

| Name |
| :------ |
| `ValueType` |
| `RendererPropsType` |

## Hierarchy

- **`IPropertyEntryMainHandlerProps`**

  ↳ [`IPropertyEntryHandlerProps`](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md)

## Table of contents

### Properties

- [altDescription](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#altdescription)
- [altLabel](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#altlabel)
- [altPlaceholder](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#altplaceholder)
- [autoFocus](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#autofocus)
- [cacheFiles](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#cachefiles)
- [containerId](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#containerid)
- [disabled](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#disabled)
- [displayHidden](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#displayhidden)
- [forId](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#forid)
- [forVersion](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#forversion)
- [forceInvalid](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#forceinvalid)
- [hideDescription](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#hidedescription)
- [hideLabel](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#hidelabel)
- [icon](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#icon)
- [ignoreErrors](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#ignoreerrors)
- [include](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#include)
- [itemDefinition](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#itemdefinition)
- [poked](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#poked)
- [prefillWith](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#prefillwith)
- [property](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#property)
- [referenceFilteringSet](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#referencefilteringset)
- [renderer](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#renderer)
- [rendererArgs](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#rendererargs)
- [state](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#state)

### Methods

- [injectSubmitBlockPromise](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#injectsubmitblockpromise)
- [onChange](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#onchange)
- [onRestore](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#onrestore)

## Properties

### altDescription

• `Optional` **altDescription**: `string`

Pass an alternative description to the renderer

Developer Provided check base.tsx

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:245](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L245)

___

### altLabel

• `Optional` **altLabel**: `string`

Pass an alternative label to the renderer

Developer Provided check base.tsx

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:251](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L251)

___

### altPlaceholder

• `Optional` **altPlaceholder**: `string`

Pass an alternative placeholder to the renderer

Developer Provided check base.tsx

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:263](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L263)

___

### autoFocus

• `Optional` **autoFocus**: `boolean`

Whether the item should autofocus on mount

Developer Provided check base.tsx

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:269](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L269)

___

### cacheFiles

• **cacheFiles**: `boolean`

A value specified to cache url files as they are loaded
via the url

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:318](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L318)

___

### containerId

• **containerId**: `string`

A current container id where the things are currently stored
this value can be null for new items as it only expresses where things
are "currently" stored not where they will be stored once submit is done

Automatically Provided check base.tsx
retrieved from the applied value from the item-definition.tsx context in the given slot

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:179](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L179)

___

### disabled

• **disabled**: `boolean`

Developer provider check base.tsx

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:322](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L322)

___

### displayHidden

• `Optional` **displayHidden**: `boolean`

Will display even if it's hidden

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:326](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L326)

___

### forId

• **forId**: `string`

The slot id in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:211](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L211)

___

### forVersion

• **forVersion**: `string`

The slot version in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:218](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L218)

___

### forceInvalid

• `Optional` **forceInvalid**: `boolean`

Whether the UI has specified this component to be forcefully invalid
even if that's not the case and there's no internal error

Developer Provided check base.tsx

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:233](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L233)

___

### hideDescription

• `Optional` **hideDescription**: `boolean`

Avoid passing a description to the renderer

Developer Provided check base.tsx

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:239](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L239)

___

### hideLabel

• `Optional` **hideLabel**: `boolean`

Hides the label in the renderer

Developer Provided check base.tsx

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:257](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L257)

___

### icon

• `Optional` **icon**: `ReactNode`

An optional icon

Developer Provided check base.tsx

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:275](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L275)

___

### ignoreErrors

• `Optional` **ignoreErrors**: `boolean`

Whether to ignore errors, this means that it will
always show as valid, however forceInvalid is more
powerful that this

Developer Provided check base.tsx

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:283](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L283)

___

### include

• **include**: [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md)

An optional include, or null, where the property is encountered

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:163](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L163)

___

### itemDefinition

• **itemDefinition**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

The item definition in question, either a standard, search mode, extended, or some
combination, but nonetheless always available

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:149](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L149)

___

### poked

• `Optional` **poked**: `boolean`

Whether the item is currently poked

Automatically Provided check base.tsx
calculated from the item-definition.tsx context

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:225](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L225)

___

### prefillWith

• `Optional` **prefillWith**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

A value to prefill with during the construction
event of the property

Developer provided check base.tsx

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:303](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L303)

___

### property

• **property**: [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

The property in question

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:170](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L170)

___

### referenceFilteringSet

• `Optional` **referenceFilteringSet**: `Object`

A value used for the reference type in order
to apply to the filtering set that is used
in the reference

Developer provided check base.tsx

#### Index signature

▪ [key: `string`]: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:311](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L311)

___

### renderer

• `Optional` **renderer**: `ComponentType`<`RendererPropsType`\>

An alernative renderer chosen for this

Developer Provided check base.tsx

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:289](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L289)

___

### rendererArgs

• `Optional` **rendererArgs**: `object`

Renderer args to be used, either by the default or
the alternative

Developer Provided check base.tsx

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:296](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L296)

___

### state

• **state**: [`IPropertyDefinitionState`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)

The state of the property definition, same as property.getState or property.getStateNoExternalChecking
but this value is more efficient to access

Automatically Provided check base.tsx
filtered for this specific property from the item-definition.tsx context state value

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:187](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L187)

## Methods

### injectSubmitBlockPromise

▸ **injectSubmitBlockPromise**(`arg`): `void`

Injects a promise that will prevent submitting until the promise is completed

Automatically Provided check base.tsx
same as the item-definition.tsx context function

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Promise`<`any`\> |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:156](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L156)

___

### onChange

▸ **onChange**(`newValue`, `internalValue`): `void`

The on change event, this is similar to the property.setCurrentValue but takes cares of things
like slotting and does the necessary calls to the UI in order to keep the UI updated with these
changes, you will receive a new state in this case if the new state differs

Automatically Provided check base.tsx
based on the change function from the item-definition.tsx context

#### Parameters

| Name | Type |
| :------ | :------ |
| `newValue` | `ValueType` |
| `internalValue` | `any` |

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:196](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L196)

___

### onRestore

▸ **onRestore**(): `void`

The restore event, similar to property.restoreValueFor but takes cares of the slot and does
the necessary calls for the UI

Automatically Provided check base.tsx
based on the restore function from the item-definition.tsx context

#### Returns

`void`

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:204](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L204)
