[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry](../modules/client_internal_components_propertyentry.md) / IPropertyEntryMainHandlerProps

# Interface: IPropertyEntryMainHandlerProps<ValueType, RendererPropsType\>

[client/internal/components/PropertyEntry](../modules/client_internal_components_propertyentry.md).IPropertyEntryMainHandlerProps

This is what the whole entry react component expects as its properties
this is what should be fed to the generic PropertyEntry and it doesn't extend
anything, an optional renderer and rendererArgs can be passed to modify where
the values are distributed

## Type parameters

Name |
:------ |
`ValueType` |
`RendererPropsType` |

## Hierarchy

* **IPropertyEntryMainHandlerProps**

  ↳ [*IPropertyEntryHandlerProps*](client_internal_components_propertyentry.ipropertyentryhandlerprops.md)

## Table of contents

### Properties

- [altDescription](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#altdescription)
- [altLabel](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#altlabel)
- [altPlaceholder](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#altplaceholder)
- [autoFocus](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#autofocus)
- [cacheFiles](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#cachefiles)
- [containerId](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#containerid)
- [forId](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#forid)
- [forVersion](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#forversion)
- [forceInvalid](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#forceinvalid)
- [hideDescription](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#hidedescription)
- [icon](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#icon)
- [ignoreErrors](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#ignoreerrors)
- [include](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#include)
- [injectSubmitBlockPromise](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#injectsubmitblockpromise)
- [itemDefinition](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#itemdefinition)
- [onChange](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#onchange)
- [onRestore](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#onrestore)
- [poked](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#poked)
- [prefillWith](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#prefillwith)
- [property](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#property)
- [referenceFilteringSet](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#referencefilteringset)
- [renderer](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#renderer)
- [rendererArgs](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#rendererargs)
- [state](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#state)

## Properties

### altDescription

• `Optional` **altDescription**: *string*

Pass an alternative description to the renderer

Developer Provided check base.tsx

Defined in: [client/internal/components/PropertyEntry/index.tsx:243](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L243)

___

### altLabel

• `Optional` **altLabel**: *string*

Pass an alternative label to the renderer

Developer Provided check base.tsx

Defined in: [client/internal/components/PropertyEntry/index.tsx:249](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L249)

___

### altPlaceholder

• `Optional` **altPlaceholder**: *string*

Pass an alternative placeholder to the renderer

Developer Provided check base.tsx

Defined in: [client/internal/components/PropertyEntry/index.tsx:255](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L255)

___

### autoFocus

• `Optional` **autoFocus**: *boolean*

Whether the item should autofocus on mount

Developer Provided check base.tsx

Defined in: [client/internal/components/PropertyEntry/index.tsx:261](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L261)

___

### cacheFiles

• **cacheFiles**: *boolean*

A value specified to cache url files as they are loaded
via the url

Defined in: [client/internal/components/PropertyEntry/index.tsx:310](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L310)

___

### containerId

• **containerId**: *string*

A current container id where the things are currently stored
this value can be null for new items as it only expresses where things
are "currently" stored not where they will be stored once submit is done

Automatically Provided check base.tsx
retrieved from the applied value from the item-definition.tsx context in the given slot

Defined in: [client/internal/components/PropertyEntry/index.tsx:177](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L177)

___

### forId

• **forId**: *string*

The slot id in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Defined in: [client/internal/components/PropertyEntry/index.tsx:209](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L209)

___

### forVersion

• **forVersion**: *string*

The slot version in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Defined in: [client/internal/components/PropertyEntry/index.tsx:216](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L216)

___

### forceInvalid

• `Optional` **forceInvalid**: *boolean*

Whether the UI has specified this component to be forcefully invalid
even if that's not the case and there's no internal error

Developer Provided check base.tsx

Defined in: [client/internal/components/PropertyEntry/index.tsx:231](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L231)

___

### hideDescription

• `Optional` **hideDescription**: *boolean*

Avoid passing a description to the renderer

Developer Provided check base.tsx

Defined in: [client/internal/components/PropertyEntry/index.tsx:237](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L237)

___

### icon

• `Optional` **icon**: ReactNode

An optional icon

Developer Provided check base.tsx

Defined in: [client/internal/components/PropertyEntry/index.tsx:267](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L267)

___

### ignoreErrors

• `Optional` **ignoreErrors**: *boolean*

Whether to ignore errors, this means that it will
always show as valid, however forceInvalid is more
powerful that this

Developer Provided check base.tsx

Defined in: [client/internal/components/PropertyEntry/index.tsx:275](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L275)

___

### include

• **include**: [*default*](../classes/base_root_module_itemdefinition_include.default.md)

An optional include, or null, where the property is encountered

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Defined in: [client/internal/components/PropertyEntry/index.tsx:161](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L161)

___

### injectSubmitBlockPromise

• **injectSubmitBlockPromise**: (`arg`: *Promise*<any\>) => *void*

Injects a promise that will prevent submitting until the promise is completed

Automatically Provided check base.tsx
same as the item-definition.tsx context function

#### Type declaration:

▸ (`arg`: *Promise*<any\>): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`arg` | *Promise*<any\> |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:154](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L154)

Defined in: [client/internal/components/PropertyEntry/index.tsx:154](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L154)

___

### itemDefinition

• **itemDefinition**: [*default*](../classes/base_root_module_itemdefinition.default.md)

The item definition in question, either a standard, search mode, extended, or some
combination, but nonetheless always available

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Defined in: [client/internal/components/PropertyEntry/index.tsx:147](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L147)

___

### onChange

• **onChange**: (`newValue`: ValueType, `internalValue`: *any*) => *void*

The on change event, this is similar to the property.setCurrentValue but takes cares of things
like slotting and does the necessary calls to the UI in order to keep the UI updated with these
changes, you will receive a new state in this case if the new state differs

Automatically Provided check base.tsx
based on the change function from the item-definition.tsx context

#### Type declaration:

▸ (`newValue`: ValueType, `internalValue`: *any*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`newValue` | ValueType |
`internalValue` | *any* |

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:194](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L194)

Defined in: [client/internal/components/PropertyEntry/index.tsx:194](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L194)

___

### onRestore

• **onRestore**: () => *void*

The restore event, similar to property.restoreValueFor but takes cares of the slot and does
the necessary calls for the UI

Automatically Provided check base.tsx
based on the restore function from the item-definition.tsx context

#### Type declaration:

▸ (): *void*

**Returns:** *void*

Defined in: [client/internal/components/PropertyEntry/index.tsx:202](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L202)

Defined in: [client/internal/components/PropertyEntry/index.tsx:202](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L202)

___

### poked

• `Optional` **poked**: *boolean*

Whether the item is currently poked

Automatically Provided check base.tsx
calculated from the item-definition.tsx context

Defined in: [client/internal/components/PropertyEntry/index.tsx:223](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L223)

___

### prefillWith

• `Optional` **prefillWith**: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

A value to prefill with during the construction
event of the property

Developer provided check base.tsx

Defined in: [client/internal/components/PropertyEntry/index.tsx:295](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L295)

___

### property

• **property**: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md)

The property in question

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Defined in: [client/internal/components/PropertyEntry/index.tsx:168](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L168)

___

### referenceFilteringSet

• `Optional` **referenceFilteringSet**: *object*

A value used for the reference type in order
to apply to the filtering set that is used
in the reference

Developer provided check base.tsx

#### Type declaration:

Defined in: [client/internal/components/PropertyEntry/index.tsx:303](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L303)

___

### renderer

• `Optional` **renderer**: *ComponentType*<RendererPropsType\>

An alernative renderer chosen for this

Developer Provided check base.tsx

Defined in: [client/internal/components/PropertyEntry/index.tsx:281](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L281)

___

### rendererArgs

• `Optional` **rendererArgs**: *object*

Renderer args to be used, either by the default or
the alternative

Developer Provided check base.tsx

Defined in: [client/internal/components/PropertyEntry/index.tsx:288](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L288)

___

### state

• **state**: [*IPropertyDefinitionState*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md)

The state of the property definition, same as property.getState or property.getStateNoExternalChecking
but this value is more efficient to access

Automatically Provided check base.tsx
filtered for this specific property from the item-definition.tsx context state value

Defined in: [client/internal/components/PropertyEntry/index.tsx:185](https://github.com/onzag/itemize/blob/5fcde7cf/client/internal/components/PropertyEntry/index.tsx#L185)
