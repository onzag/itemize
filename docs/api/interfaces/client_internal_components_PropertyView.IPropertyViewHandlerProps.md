[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyView](../modules/client_internal_components_PropertyView.md) / IPropertyViewHandlerProps

# Interface: IPropertyViewHandlerProps\<ValueType, RendererPropsType\>

[client/internal/components/PropertyView](../modules/client_internal_components_PropertyView.md).IPropertyViewHandlerProps

Views handlers that are standard will receive these props that actually
include these attributes added to the main ones

## Type parameters

| Name | Type |
| :------ | :------ |
| `ValueType` | extends [`PropertyDefinitionSupportedType`](../modules/base_Root_Module_ItemDefinition_PropertyDefinition_types.md#propertydefinitionsupportedtype) |
| `RendererPropsType` | `RendererPropsType` |

## Hierarchy

- [`IPropertyViewMainHandlerProps`](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md)\<`ValueType`, `RendererPropsType`\>

  ↳ **`IPropertyViewHandlerProps`**

## Table of contents

### Properties

- [cacheFiles](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#cachefiles)
- [capitalize](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#capitalize)
- [config](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#config)
- [containerId](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#containerid)
- [country](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#country)
- [currency](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#currency)
- [currencyFactors](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#currencyfactors)
- [displayHidden](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#displayhidden)
- [forId](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#forid)
- [forVersion](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#forversion)
- [handleAs](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#handleas)
- [highlights](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#highlights)
- [i18n](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#i18n)
- [include](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#include)
- [itemDefinition](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#itemdefinition)
- [language](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#language)
- [property](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#property)
- [renderer](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#renderer)
- [rendererArgs](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#rendererargs)
- [rtl](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#rtl)
- [ssr](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#ssr)
- [state](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#state)
- [tokenData](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#tokendata)
- [useAppliedValue](client_internal_components_PropertyView.IPropertyViewHandlerProps.md#useappliedvalue)

## Properties

### cacheFiles

• **cacheFiles**: `boolean`

Whether file urls are to be cached

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[cacheFiles](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#cachefiles)

#### Defined in

[client/internal/components/PropertyView/index.tsx:134](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L134)

___

### capitalize

• `Optional` **capitalize**: `boolean`

Whether to capitalize the output value

Provided by the user check base.tsx

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[capitalize](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#capitalize)

#### Defined in

[client/internal/components/PropertyView/index.tsx:102](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L102)

___

### config

• `Optional` **config**: [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md)

Config is a conditional include that will pass the config to the handler

Context Provided, Conditional, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:166](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L166)

___

### containerId

• **containerId**: `string`

A current container id where the things are currently stored
this value can be null for new items as it only expresses where things
are "currently" stored not where they will be stored once submit is done

Automatically Provided check base.tsx
retrieved from the applied value from the item-definition.tsx context in the given slot

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[containerId](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#containerid)

#### Defined in

[client/internal/components/PropertyView/index.tsx:60](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L60)

___

### country

• **country**: [`ICountryType`](imported_resources.ICountryType.md)

the current country

Context Provided, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:218](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L218)

___

### currency

• **currency**: [`ICurrencyType`](imported_resources.ICurrencyType.md)

The currency being used

Context Provided, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:198](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L198)

___

### currencyFactors

• **currencyFactors**: `Object`

The currency factors given by the server data

Context provided, standard handler only

#### Index signature

▪ [code: `string`]: `number`

#### Defined in

[client/internal/components/PropertyView/index.tsx:204](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L204)

___

### displayHidden

• `Optional` **displayHidden**: `boolean`

Will display even if it's hidden

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[displayHidden](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#displayhidden)

#### Defined in

[client/internal/components/PropertyView/index.tsx:138](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L138)

___

### forId

• **forId**: `string`

The slot id in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[forId](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#forid)

#### Defined in

[client/internal/components/PropertyView/index.tsx:82](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L82)

___

### forVersion

• **forVersion**: `string`

The slot version in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[forVersion](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#forversion)

#### Defined in

[client/internal/components/PropertyView/index.tsx:89](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L89)

___

### handleAs

• `Optional` **handleAs**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `subtype?` | `string` |
| `type` | `string` |

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[handleAs](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#handleas)

#### Defined in

[client/internal/components/PropertyView/index.tsx:149](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L149)

___

### highlights

• **highlights**: [`IElasticHighlighPropertyInfo`](base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlighPropertyInfo.md)

The highlights

Provided by the item via the record properties
may be developer provided in the item

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[highlights](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#highlights)

#### Defined in

[client/internal/components/PropertyView/index.tsx:145](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L145)

___

### i18n

• **i18n**: [`Ii18NType`](base_Root.Ii18NType.md)

standard i18n data from the root

Context Provided, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:212](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L212)

___

### include

• **include**: [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md)

An optional include, or null, where the property is encountered

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[include](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#include)

#### Defined in

[client/internal/components/PropertyView/index.tsx:67](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L67)

___

### itemDefinition

• **itemDefinition**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

The item definition in question, either a standard, search mode, extended, or some
combination, but nonetheless always available

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[itemDefinition](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#itemdefinition)

#### Defined in

[client/internal/components/PropertyView/index.tsx:75](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L75)

___

### language

• **language**: `string`

The language being used

Context Provided, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:186](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L186)

___

### property

• **property**: [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

The property in question

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[property](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#property)

#### Defined in

[client/internal/components/PropertyView/index.tsx:96](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L96)

___

### renderer

• **renderer**: `ComponentType`\<`RendererPropsType`\>

There renderer that will be used

While this property also exists on the main renderer, there
it's optional and developer provided, whereas this one is always
there and represents the renderer that you will be using

Calculated, Standard Handler Only

#### Overrides

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[renderer](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#renderer)

#### Defined in

[client/internal/components/PropertyView/index.tsx:229](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L229)

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

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[rendererArgs](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#rendererargs)

#### Defined in

[client/internal/components/PropertyView/index.tsx:240](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L240)

___

### rtl

• **rtl**: `boolean`

Whether this language is rtl

Context Provided, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:192](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L192)

___

### ssr

• `Optional` **ssr**: [`ISSRContextType`](client_internal_providers_ssr_provider.ISSRContextType.md)

SSR context is a conditional include that will pass the ssr context to the
handler, used in references mainly

Context Provided, Conditional, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:179](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L179)

___

### state

• **state**: [`IPropertyDefinitionState`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)\<`ValueType`\>

The state of the property definition, same as property.getState or property.getStateNoExternalChecking
but this value is more efficient to access

Automatically Provided check base.tsx
filtered for this specific property from the item-definition.tsx context state value

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[state](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#state)

#### Defined in

[client/internal/components/PropertyView/index.tsx:110](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L110)

___

### tokenData

• `Optional` **tokenData**: [`ITokenContextType`](client_internal_providers_token_provider.ITokenContextType.md)

Token is a conditional include that will pass the token to the handler

Context Provided, Conditional, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:172](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L172)

___

### useAppliedValue

• `Optional` **useAppliedValue**: `boolean`

Use applied value rather than the actual
value

Provided by the user check base.tsx

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[useAppliedValue](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#useappliedvalue)

#### Defined in

[client/internal/components/PropertyView/index.tsx:117](https://github.com/onzag/itemize/blob/73e0c39e/client/internal/components/PropertyView/index.tsx#L117)
