[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyEntry](../modules/client_internal_components_propertyentry.md) / IPropertyEntryHandlerProps

# Interface: IPropertyEntryHandlerProps<ValueType, RendererPropsType\>

[client/internal/components/PropertyEntry](../modules/client_internal_components_propertyentry.md).IPropertyEntryHandlerProps

These represent values that are read from the context and every handler down the line gets
these do not need to be passed to the main handler, the main handler passes to the smaller
handlers, they receive all the main handler props and these

## Type parameters

Name |
:------ |
`ValueType` |
`RendererPropsType` |

## Hierarchy

* [*IPropertyEntryMainHandlerProps*](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md)<ValueType, RendererPropsType\>

  ↳ **IPropertyEntryHandlerProps**

## Table of contents

### Properties

- [altDescription](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#altdescription)
- [altLabel](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#altlabel)
- [altPlaceholder](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#altplaceholder)
- [autoFocus](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#autofocus)
- [cacheFiles](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#cachefiles)
- [config](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#config)
- [containerId](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#containerid)
- [country](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#country)
- [currency](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#currency)
- [forId](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#forid)
- [forVersion](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#forversion)
- [forceInvalid](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#forceinvalid)
- [hideDescription](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#hidedescription)
- [i18n](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#i18n)
- [icon](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#icon)
- [ignoreErrors](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#ignoreerrors)
- [include](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#include)
- [injectSubmitBlockPromise](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#injectsubmitblockpromise)
- [itemDefinition](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#itemdefinition)
- [language](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#language)
- [onChange](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#onchange)
- [onRestore](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#onrestore)
- [poked](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#poked)
- [prefillWith](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#prefillwith)
- [property](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#property)
- [referenceFilteringSet](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#referencefilteringset)
- [renderer](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#renderer)
- [rendererArgs](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#rendererargs)
- [rtl](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#rtl)
- [ssr](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#ssr)
- [state](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#state)
- [tokenData](client_internal_components_propertyentry.ipropertyentryhandlerprops.md#tokendata)

## Properties

### altDescription

• `Optional` **altDescription**: *string*

Pass an alternative description to the renderer

Developer Provided check base.tsx

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[altDescription](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#altdescription)

Defined in: [client/internal/components/PropertyEntry/index.tsx:243](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L243)

___

### altLabel

• `Optional` **altLabel**: *string*

Pass an alternative label to the renderer

Developer Provided check base.tsx

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[altLabel](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#altlabel)

Defined in: [client/internal/components/PropertyEntry/index.tsx:249](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L249)

___

### altPlaceholder

• `Optional` **altPlaceholder**: *string*

Pass an alternative placeholder to the renderer

Developer Provided check base.tsx

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[altPlaceholder](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#altplaceholder)

Defined in: [client/internal/components/PropertyEntry/index.tsx:255](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L255)

___

### autoFocus

• `Optional` **autoFocus**: *boolean*

Whether the item should autofocus on mount

Developer Provided check base.tsx

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[autoFocus](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#autofocus)

Defined in: [client/internal/components/PropertyEntry/index.tsx:261](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L261)

___

### cacheFiles

• **cacheFiles**: *boolean*

A value specified to cache url files as they are loaded
via the url

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[cacheFiles](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#cachefiles)

Defined in: [client/internal/components/PropertyEntry/index.tsx:310](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L310)

___

### config

• `Optional` **config**: [*IConfigRawJSONDataType*](config.iconfigrawjsondatatype.md)

Config is a conditional include that will pass the config to the handler

Context Provided, Conditional, Standard Handler Only

Defined in: [client/internal/components/PropertyEntry/index.tsx:324](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L324)

___

### containerId

• **containerId**: *string*

A current container id where the things are currently stored
this value can be null for new items as it only expresses where things
are "currently" stored not where they will be stored once submit is done

Automatically Provided check base.tsx
retrieved from the applied value from the item-definition.tsx context in the given slot

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[containerId](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#containerid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:177](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L177)

___

### country

• **country**: [*ICountryType*](imported_resources.icountrytype.md)

the current country

Context Provided, Standard Handler Only

Defined in: [client/internal/components/PropertyEntry/index.tsx:368](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L368)

___

### currency

• **currency**: [*ICurrencyType*](imported_resources.icurrencytype.md)

The currency being used

Context Provided, Standard Handler Only

Defined in: [client/internal/components/PropertyEntry/index.tsx:356](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L356)

___

### forId

• **forId**: *string*

The slot id in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[forId](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#forid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:209](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L209)

___

### forVersion

• **forVersion**: *string*

The slot version in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[forVersion](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#forversion)

Defined in: [client/internal/components/PropertyEntry/index.tsx:216](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L216)

___

### forceInvalid

• `Optional` **forceInvalid**: *boolean*

Whether the UI has specified this component to be forcefully invalid
even if that's not the case and there's no internal error

Developer Provided check base.tsx

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[forceInvalid](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#forceinvalid)

Defined in: [client/internal/components/PropertyEntry/index.tsx:231](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L231)

___

### hideDescription

• `Optional` **hideDescription**: *boolean*

Avoid passing a description to the renderer

Developer Provided check base.tsx

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[hideDescription](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#hidedescription)

Defined in: [client/internal/components/PropertyEntry/index.tsx:237](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L237)

___

### i18n

• **i18n**: [*Ii18NType*](base_root.ii18ntype.md)

standard i18n data from the root

Context Provided, Standard Handler Only

Defined in: [client/internal/components/PropertyEntry/index.tsx:362](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L362)

___

### icon

• `Optional` **icon**: ReactNode

An optional icon

Developer Provided check base.tsx

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[icon](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#icon)

Defined in: [client/internal/components/PropertyEntry/index.tsx:267](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L267)

___

### ignoreErrors

• `Optional` **ignoreErrors**: *boolean*

Whether to ignore errors, this means that it will
always show as valid, however forceInvalid is more
powerful that this

Developer Provided check base.tsx

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[ignoreErrors](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#ignoreerrors)

Defined in: [client/internal/components/PropertyEntry/index.tsx:275](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L275)

___

### include

• **include**: [*default*](../classes/base_root_module_itemdefinition_include.default.md)

An optional include, or null, where the property is encountered

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[include](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#include)

Defined in: [client/internal/components/PropertyEntry/index.tsx:161](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L161)

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

Defined in: [client/internal/components/PropertyEntry/index.tsx:154](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L154)

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[injectSubmitBlockPromise](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#injectsubmitblockpromise)

Defined in: [client/internal/components/PropertyEntry/index.tsx:154](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L154)

___

### itemDefinition

• **itemDefinition**: [*default*](../classes/base_root_module_itemdefinition.default.md)

The item definition in question, either a standard, search mode, extended, or some
combination, but nonetheless always available

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[itemDefinition](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#itemdefinition)

Defined in: [client/internal/components/PropertyEntry/index.tsx:147](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L147)

___

### language

• **language**: *string*

The language being used

Context Provided, Standard Handler Only

Defined in: [client/internal/components/PropertyEntry/index.tsx:344](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L344)

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

Defined in: [client/internal/components/PropertyEntry/index.tsx:194](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L194)

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[onChange](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#onchange)

Defined in: [client/internal/components/PropertyEntry/index.tsx:194](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L194)

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

Defined in: [client/internal/components/PropertyEntry/index.tsx:202](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L202)

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[onRestore](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#onrestore)

Defined in: [client/internal/components/PropertyEntry/index.tsx:202](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L202)

___

### poked

• `Optional` **poked**: *boolean*

Whether the item is currently poked

Automatically Provided check base.tsx
calculated from the item-definition.tsx context

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[poked](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#poked)

Defined in: [client/internal/components/PropertyEntry/index.tsx:223](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L223)

___

### prefillWith

• `Optional` **prefillWith**: [*PropertyDefinitionSupportedType*](../modules/base_root_module_itemdefinition_propertydefinition_types.md#propertydefinitionsupportedtype)

A value to prefill with during the construction
event of the property

Developer provided check base.tsx

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[prefillWith](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#prefillwith)

Defined in: [client/internal/components/PropertyEntry/index.tsx:295](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L295)

___

### property

• **property**: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md)

The property in question

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[property](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#property)

Defined in: [client/internal/components/PropertyEntry/index.tsx:168](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L168)

___

### referenceFilteringSet

• `Optional` **referenceFilteringSet**: *object*

A value used for the reference type in order
to apply to the filtering set that is used
in the reference

Developer provided check base.tsx

#### Type declaration:

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[referenceFilteringSet](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#referencefilteringset)

Defined in: [client/internal/components/PropertyEntry/index.tsx:303](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L303)

___

### renderer

• **renderer**: *ComponentType*<RendererPropsType\>

There renderer that will be used

While this property also exists on the main renderer, there
it's optional and developer provided, whereas this one is always
there and represents the renderer that you will be using

Calculated, Standard Handler Only

Overrides: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[renderer](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#renderer)

Defined in: [client/internal/components/PropertyEntry/index.tsx:379](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L379)

___

### rendererArgs

• **rendererArgs**: *any*

There renderer args that will be used

While this property also exists on the main renderer, there
it's optional and developer provided, whereas this one is always
there, it's often the same that the developer passed, or an empty
object, since the args is supposed to be an object

Calculated, Standard Handler Only

Overrides: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[rendererArgs](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#rendererargs)

Defined in: [client/internal/components/PropertyEntry/index.tsx:390](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L390)

___

### rtl

• **rtl**: *boolean*

Whether this language is rtl

Context Provided, Standard Handler Only

Defined in: [client/internal/components/PropertyEntry/index.tsx:350](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L350)

___

### ssr

• `Optional` **ssr**: [*ISSRContextType*](client_internal_providers_ssr_provider.issrcontexttype.md)

SSR context is a conditional include that will pass the ssr context to the
handler, used in references mainly

Context Provided, Conditional, Standard Handler Only

Defined in: [client/internal/components/PropertyEntry/index.tsx:337](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L337)

___

### state

• **state**: [*IPropertyDefinitionState*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md)

The state of the property definition, same as property.getState or property.getStateNoExternalChecking
but this value is more efficient to access

Automatically Provided check base.tsx
filtered for this specific property from the item-definition.tsx context state value

Inherited from: [IPropertyEntryMainHandlerProps](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md).[state](client_internal_components_propertyentry.ipropertyentrymainhandlerprops.md#state)

Defined in: [client/internal/components/PropertyEntry/index.tsx:185](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L185)

___

### tokenData

• `Optional` **tokenData**: [*ITokenContextType*](client_internal_providers_token_provider.itokencontexttype.md)

Token is a conditional include that will pass the token to the handler

Context Provided, Conditional, Standard Handler Only

Defined in: [client/internal/components/PropertyEntry/index.tsx:330](https://github.com/onzag/itemize/blob/3efa2a4a/client/internal/components/PropertyEntry/index.tsx#L330)
