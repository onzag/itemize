[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/internal/components/PropertyView](../modules/client_internal_components_PropertyView.md) / IPropertyViewHandlerProps

# Interface: IPropertyViewHandlerProps<RendererPropsType\>

[client/internal/components/PropertyView](../modules/client_internal_components_PropertyView.md).IPropertyViewHandlerProps

Views handlers that are standard will receive these props that actually
include these attributes added to the main ones

## Type parameters

| Name |
| :------ |
| `RendererPropsType` |

## Hierarchy

- [`IPropertyViewMainHandlerProps`](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md)<`RendererPropsType`\>

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

[client/internal/components/PropertyView/index.tsx:133](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L133)

___

### capitalize

• `Optional` **capitalize**: `boolean`

Whether to capitalize the output value

Provided by the user check base.tsx

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[capitalize](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#capitalize)

#### Defined in

[client/internal/components/PropertyView/index.tsx:101](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L101)

___

### config

• `Optional` **config**: [`IConfigRawJSONDataType`](config.IConfigRawJSONDataType.md)

Config is a conditional include that will pass the config to the handler

Context Provided, Conditional, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:150](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L150)

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

[client/internal/components/PropertyView/index.tsx:59](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L59)

___

### country

• **country**: [`ICountryType`](imported_resources.ICountryType.md)

the current country

Context Provided, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:202](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L202)

___

### currency

• **currency**: [`ICurrencyType`](imported_resources.ICurrencyType.md)

The currency being used

Context Provided, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:182](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L182)

___

### currencyFactors

• **currencyFactors**: `Object`

The currency factors given by the server data

Context provided, standard handler only

#### Index signature

▪ [code: `string`]: `number`

#### Defined in

[client/internal/components/PropertyView/index.tsx:188](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L188)

___

### displayHidden

• `Optional` **displayHidden**: `boolean`

Will display even if it's hidden

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[displayHidden](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#displayhidden)

#### Defined in

[client/internal/components/PropertyView/index.tsx:137](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L137)

___

### forId

• **forId**: `string`

The slot id in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[forId](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#forid)

#### Defined in

[client/internal/components/PropertyView/index.tsx:81](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L81)

___

### forVersion

• **forVersion**: `string`

The slot version in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[forVersion](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#forversion)

#### Defined in

[client/internal/components/PropertyView/index.tsx:88](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L88)

___

### i18n

• **i18n**: [`Ii18NType`](base_Root.Ii18NType.md)

standard i18n data from the root

Context Provided, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:196](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L196)

___

### include

• **include**: [`default`](../classes/base_Root_Module_ItemDefinition_Include.default.md)

An optional include, or null, where the property is encountered

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[include](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#include)

#### Defined in

[client/internal/components/PropertyView/index.tsx:66](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L66)

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

[client/internal/components/PropertyView/index.tsx:74](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L74)

___

### language

• **language**: `string`

The language being used

Context Provided, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:170](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L170)

___

### property

• **property**: [`default`](../classes/base_Root_Module_ItemDefinition_PropertyDefinition.default.md)

The property in question

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[property](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#property)

#### Defined in

[client/internal/components/PropertyView/index.tsx:95](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L95)

___

### renderer

• **renderer**: `ComponentType`<`RendererPropsType`\>

There renderer that will be used

While this property also exists on the main renderer, there
it's optional and developer provided, whereas this one is always
there and represents the renderer that you will be using

Calculated, Standard Handler Only

#### Overrides

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[renderer](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#renderer)

#### Defined in

[client/internal/components/PropertyView/index.tsx:213](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L213)

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

[client/internal/components/PropertyView/index.tsx:224](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L224)

___

### rtl

• **rtl**: `boolean`

Whether this language is rtl

Context Provided, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:176](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L176)

___

### ssr

• `Optional` **ssr**: [`ISSRContextType`](client_internal_providers_ssr_provider.ISSRContextType.md)

SSR context is a conditional include that will pass the ssr context to the
handler, used in references mainly

Context Provided, Conditional, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:163](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L163)

___

### state

• **state**: [`IPropertyDefinitionState`](base_Root_Module_ItemDefinition_PropertyDefinition.IPropertyDefinitionState.md)

The state of the property definition, same as property.getState or property.getStateNoExternalChecking
but this value is more efficient to access

Automatically Provided check base.tsx
filtered for this specific property from the item-definition.tsx context state value

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[state](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#state)

#### Defined in

[client/internal/components/PropertyView/index.tsx:109](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L109)

___

### tokenData

• `Optional` **tokenData**: [`ITokenContextType`](client_internal_providers_token_provider.ITokenContextType.md)

Token is a conditional include that will pass the token to the handler

Context Provided, Conditional, Standard Handler Only

#### Defined in

[client/internal/components/PropertyView/index.tsx:156](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L156)

___

### useAppliedValue

• `Optional` **useAppliedValue**: `boolean`

Use applied value rather than the actual
value

Provided by the user check base.tsx

#### Inherited from

[IPropertyViewMainHandlerProps](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md).[useAppliedValue](client_internal_components_PropertyView.IPropertyViewMainHandlerProps.md#useappliedvalue)

#### Defined in

[client/internal/components/PropertyView/index.tsx:116](https://github.com/onzag/itemize/blob/f2f29986/client/internal/components/PropertyView/index.tsx#L116)
