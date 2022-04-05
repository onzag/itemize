[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyEntry](../modules/client_internal_components_PropertyEntry.md) / IPropertyEntryHandlerProps

# Interface: IPropertyEntryHandlerProps<ValueType, RendererPropsType\>

[client/internal/components/PropertyEntry](../modules/client_internal_components_PropertyEntry.md).IPropertyEntryHandlerProps

These represent values that are read from the context and every handler down the line gets
these do not need to be passed to the main handler, the main handler passes to the smaller
handlers, they receive all the main handler props and these

## Type parameters

| Name |
| :------ |
| `ValueType` |
| `RendererPropsType` |

## Hierarchy

- [`IPropertyEntryMainHandlerProps`](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md)<`ValueType`, `RendererPropsType`\>

  ↳ **`IPropertyEntryHandlerProps`**

## Table of contents

### Properties

- [altDescription](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#altdescription)
- [altLabel](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#altlabel)
- [altPlaceholder](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#altplaceholder)
- [autoFocus](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#autofocus)
- [cacheFiles](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#cachefiles)
- [config](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#config)
- [containerId](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#containerid)
- [country](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#country)
- [currency](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#currency)
- [disabled](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#disabled)
- [displayHidden](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#displayhidden)
- [forId](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#forid)
- [forVersion](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#forversion)
- [forceInvalid](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#forceinvalid)
- [hideDescription](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#hidedescription)
- [hideLabel](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#hidelabel)
- [i18n](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#i18n)
- [icon](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#icon)
- [ignoreErrors](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#ignoreerrors)
- [include](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#include)
- [itemDefinition](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#itemdefinition)
- [language](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#language)
- [poked](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#poked)
- [prefillWith](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#prefillwith)
- [property](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#property)
- [referenceFilteringSet](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#referencefilteringset)
- [renderer](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#renderer)
- [rendererArgs](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#rendererargs)
- [rtl](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#rtl)
- [ssr](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#ssr)
- [state](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#state)
- [tokenData](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#tokendata)

### Methods

- [injectSubmitBlockPromise](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#injectsubmitblockpromise)
- [onChange](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#onchange)
- [onRestore](client_internal_components_PropertyEntry.IPropertyEntryHandlerProps.md#onrestore)

## Properties

### altDescription

• `Optional` **altDescription**: `string`

Pass an alternative description to the renderer

Developer Provided check base.tsx

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[altDescription](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#altdescription)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:245](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L245)

___

### altLabel

• `Optional` **altLabel**: `string`

Pass an alternative label to the renderer

Developer Provided check base.tsx

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[altLabel](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#altlabel)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:251](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L251)

___

### altPlaceholder

• `Optional` **altPlaceholder**: `string`

Pass an alternative placeholder to the renderer

Developer Provided check base.tsx

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[altPlaceholder](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#altplaceholder)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:263](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L263)

___

### autoFocus

• `Optional` **autoFocus**: `boolean`

Whether the item should autofocus on mount

Developer Provided check base.tsx

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[autoFocus](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#autofocus)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:269](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L269)

___

### cacheFiles

• **cacheFiles**: `boolean`

A value specified to cache url files as they are loaded
via the url

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[cacheFiles](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#cachefiles)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:318](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L318)

___

### config

• `Optional` **config**: [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md)

Config is a conditional include that will pass the config to the handler

Context Provided, Conditional, Standard Handler Only

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:340](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L340)

___

### containerId

• **containerId**: `string`

A current container id where the things are currently stored
this value can be null for new items as it only expresses where things
are "currently" stored not where they will be stored once submit is done

Automatically Provided check base.tsx
retrieved from the applied value from the item-definition.tsx context in the given slot

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[containerId](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#containerid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:179](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L179)

___

### country

• **country**: [`ICountryType`](imported_resources.ICountryType.md)

the current country

Context Provided, Standard Handler Only

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:384](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L384)

___

### currency

• **currency**: [`ICurrencyType`](imported_resources.ICurrencyType.md)

The currency being used

Context Provided, Standard Handler Only

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:372](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L372)

___

### disabled

• **disabled**: `boolean`

Developer provider check base.tsx

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[disabled](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#disabled)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:322](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L322)

___

### displayHidden

• `Optional` **displayHidden**: `boolean`

Will display even if it's hidden

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[displayHidden](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#displayhidden)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:326](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L326)

___

### forId

• **forId**: `string`

The slot id in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[forId](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#forid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:211](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L211)

___

### forVersion

• **forVersion**: `string`

The slot version in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[forVersion](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#forversion)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:218](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L218)

___

### forceInvalid

• `Optional` **forceInvalid**: `boolean`

Whether the UI has specified this component to be forcefully invalid
even if that's not the case and there's no internal error

Developer Provided check base.tsx

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[forceInvalid](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#forceinvalid)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:233](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L233)

___

### hideDescription

• `Optional` **hideDescription**: `boolean`

Avoid passing a description to the renderer

Developer Provided check base.tsx

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[hideDescription](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#hidedescription)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:239](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L239)

___

### hideLabel

• `Optional` **hideLabel**: `boolean`

Hides the label in the renderer

Developer Provided check base.tsx

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[hideLabel](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#hidelabel)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:257](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L257)

___

### i18n

• **i18n**: [`Ii18NType`](base_Root.Ii18NType.md)

standard i18n data from the root

Context Provided, Standard Handler Only

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:378](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L378)

___

### icon

• `Optional` **icon**: `ReactNode`

An optional icon

Developer Provided check base.tsx

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[icon](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#icon)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:275](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L275)

___

### ignoreErrors

• `Optional` **ignoreErrors**: `boolean`

Whether to ignore errors, this means that it will
always show as valid, however forceInvalid is more
powerful that this

Developer Provided check base.tsx

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[ignoreErrors](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#ignoreerrors)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:283](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L283)

___

### include

• **include**: [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md)

An optional include, or null, where the property is encountered

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[include](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#include)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:163](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L163)

___

### itemDefinition

• **itemDefinition**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

The item definition in question, either a standard, search mode, extended, or some
combination, but nonetheless always available

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[itemDefinition](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#itemdefinition)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:149](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L149)

___

### language

• **language**: `string`

The language being used

Context Provided, Standard Handler Only

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:360](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L360)

___

### poked

• `Optional` **poked**: `boolean`

Whether the item is currently poked

Automatically Provided check base.tsx
calculated from the item-definition.tsx context

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[poked](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#poked)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:225](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L225)

___

### prefillWith

• `Optional` **prefillWith**: [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype)

A value to prefill with during the construction
event of the property

Developer provided check base.tsx

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[prefillWith](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#prefillwith)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:303](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L303)

___

### property

• **property**: [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

The property in question

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[property](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#property)

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

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[referenceFilteringSet](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#referencefilteringset)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:311](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L311)

___

### renderer

• **renderer**: `ComponentType`<`RendererPropsType`\>

There renderer that will be used

While this property also exists on the main renderer, there
it's optional and developer provided, whereas this one is always
there and represents the renderer that you will be using

Calculated, Standard Handler Only

#### Overrides

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[renderer](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#renderer)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:395](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L395)

___

### rendererArgs

• **rendererArgs**: `any`

There renderer args that will be used

While this property also exists on the main renderer, there
it's optional and developer provided, whereas this one is always
there, it's often the same that the developer passed, or an empty
object, since the args is supposed to be an object

Calculated, Standard Handler Only

#### Overrides

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[rendererArgs](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#rendererargs)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:406](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L406)

___

### rtl

• **rtl**: `boolean`

Whether this language is rtl

Context Provided, Standard Handler Only

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:366](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L366)

___

### ssr

• `Optional` **ssr**: [`ISSRContextType`](client_internal_providers_ssr_provider.ISSRContextType.md)

SSR context is a conditional include that will pass the ssr context to the
handler, used in references mainly

Context Provided, Conditional, Standard Handler Only

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:353](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L353)

___

### state

• **state**: [`IPropertyDefinitionState`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)

The state of the property definition, same as property.getState or property.getStateNoExternalChecking
but this value is more efficient to access

Automatically Provided check base.tsx
filtered for this specific property from the item-definition.tsx context state value

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[state](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#state)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:187](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L187)

___

### tokenData

• `Optional` **tokenData**: [`ITokenContextType`](client_internal_providers_token_provider.ITokenContextType.md)

Token is a conditional include that will pass the token to the handler

Context Provided, Conditional, Standard Handler Only

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:346](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L346)

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

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[injectSubmitBlockPromise](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#injectsubmitblockpromise)

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

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[onChange](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#onchange)

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

#### Inherited from

[IPropertyEntryMainHandlerProps](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md).[onRestore](client_internal_components_PropertyEntry.IPropertyEntryMainHandlerProps.md#onrestore)

#### Defined in

[client/internal/components/PropertyEntry/index.tsx:204](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyEntry/index.tsx#L204)
