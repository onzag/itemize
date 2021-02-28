[](../README.md) / [Exports](../modules.md) / [client/internal/components/PropertyView](../modules/client_internal_components_propertyview.md) / IPropertyViewHandlerProps

# Interface: IPropertyViewHandlerProps<RendererPropsType\>

[client/internal/components/PropertyView](../modules/client_internal_components_propertyview.md).IPropertyViewHandlerProps

Views handlers that are standard will receive these props that actually
include these attributes added to the main ones

## Type parameters

Name |
:------ |
`RendererPropsType` |

## Hierarchy

* [*IPropertyViewMainHandlerProps*](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md)<RendererPropsType\>

  ↳ **IPropertyViewHandlerProps**

## Table of contents

### Properties

- [cacheFiles](client_internal_components_propertyview.ipropertyviewhandlerprops.md#cachefiles)
- [capitalize](client_internal_components_propertyview.ipropertyviewhandlerprops.md#capitalize)
- [config](client_internal_components_propertyview.ipropertyviewhandlerprops.md#config)
- [containerId](client_internal_components_propertyview.ipropertyviewhandlerprops.md#containerid)
- [country](client_internal_components_propertyview.ipropertyviewhandlerprops.md#country)
- [currency](client_internal_components_propertyview.ipropertyviewhandlerprops.md#currency)
- [currencyFactors](client_internal_components_propertyview.ipropertyviewhandlerprops.md#currencyfactors)
- [forId](client_internal_components_propertyview.ipropertyviewhandlerprops.md#forid)
- [forVersion](client_internal_components_propertyview.ipropertyviewhandlerprops.md#forversion)
- [i18n](client_internal_components_propertyview.ipropertyviewhandlerprops.md#i18n)
- [include](client_internal_components_propertyview.ipropertyviewhandlerprops.md#include)
- [itemDefinition](client_internal_components_propertyview.ipropertyviewhandlerprops.md#itemdefinition)
- [language](client_internal_components_propertyview.ipropertyviewhandlerprops.md#language)
- [property](client_internal_components_propertyview.ipropertyviewhandlerprops.md#property)
- [renderer](client_internal_components_propertyview.ipropertyviewhandlerprops.md#renderer)
- [rendererArgs](client_internal_components_propertyview.ipropertyviewhandlerprops.md#rendererargs)
- [rtl](client_internal_components_propertyview.ipropertyviewhandlerprops.md#rtl)
- [ssr](client_internal_components_propertyview.ipropertyviewhandlerprops.md#ssr)
- [state](client_internal_components_propertyview.ipropertyviewhandlerprops.md#state)
- [tokenData](client_internal_components_propertyview.ipropertyviewhandlerprops.md#tokendata)
- [useAppliedValue](client_internal_components_propertyview.ipropertyviewhandlerprops.md#useappliedvalue)

## Properties

### cacheFiles

• **cacheFiles**: *boolean*

Whether file urls are to be cached

Inherited from: [IPropertyViewMainHandlerProps](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md).[cacheFiles](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#cachefiles)

Defined in: [client/internal/components/PropertyView/index.tsx:133](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L133)

___

### capitalize

• `Optional` **capitalize**: *boolean*

Whether to capitalize the output value

Provided by the user check base.tsx

Inherited from: [IPropertyViewMainHandlerProps](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md).[capitalize](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#capitalize)

Defined in: [client/internal/components/PropertyView/index.tsx:101](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L101)

___

### config

• `Optional` **config**: [*IConfigRawJSONDataType*](config.iconfigrawjsondatatype.md)

Config is a conditional include that will pass the config to the handler

Context Provided, Conditional, Standard Handler Only

Defined in: [client/internal/components/PropertyView/index.tsx:146](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L146)

___

### containerId

• **containerId**: *string*

A current container id where the things are currently stored
this value can be null for new items as it only expresses where things
are "currently" stored not where they will be stored once submit is done

Automatically Provided check base.tsx
retrieved from the applied value from the item-definition.tsx context in the given slot

Inherited from: [IPropertyViewMainHandlerProps](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md).[containerId](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#containerid)

Defined in: [client/internal/components/PropertyView/index.tsx:59](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L59)

___

### country

• **country**: [*ICountryType*](imported_resources.icountrytype.md)

the current country

Context Provided, Standard Handler Only

Defined in: [client/internal/components/PropertyView/index.tsx:198](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L198)

___

### currency

• **currency**: [*ICurrencyType*](imported_resources.icurrencytype.md)

The currency being used

Context Provided, Standard Handler Only

Defined in: [client/internal/components/PropertyView/index.tsx:178](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L178)

___

### currencyFactors

• **currencyFactors**: *object*

The currency factors given by the server data

Context provided, standard handler only

#### Type declaration:

Defined in: [client/internal/components/PropertyView/index.tsx:184](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L184)

___

### forId

• **forId**: *string*

The slot id in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Inherited from: [IPropertyViewMainHandlerProps](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md).[forId](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#forid)

Defined in: [client/internal/components/PropertyView/index.tsx:81](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L81)

___

### forVersion

• **forVersion**: *string*

The slot version in question, or null

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Inherited from: [IPropertyViewMainHandlerProps](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md).[forVersion](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#forversion)

Defined in: [client/internal/components/PropertyView/index.tsx:88](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L88)

___

### i18n

• **i18n**: [*Ii18NType*](base_root.ii18ntype.md)

standard i18n data from the root

Context Provided, Standard Handler Only

Defined in: [client/internal/components/PropertyView/index.tsx:192](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L192)

___

### include

• **include**: [*default*](../classes/base_root_module_itemdefinition_include.default.md)

An optional include, or null, where the property is encountered

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Inherited from: [IPropertyViewMainHandlerProps](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md).[include](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#include)

Defined in: [client/internal/components/PropertyView/index.tsx:66](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L66)

___

### itemDefinition

• **itemDefinition**: [*default*](../classes/base_root_module_itemdefinition.default.md)

The item definition in question, either a standard, search mode, extended, or some
combination, but nonetheless always available

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Inherited from: [IPropertyViewMainHandlerProps](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md).[itemDefinition](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#itemdefinition)

Defined in: [client/internal/components/PropertyView/index.tsx:74](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L74)

___

### language

• **language**: *string*

The language being used

Context Provided, Standard Handler Only

Defined in: [client/internal/components/PropertyView/index.tsx:166](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L166)

___

### property

• **property**: [*default*](../classes/base_root_module_itemdefinition_propertydefinition.default.md)

The property in question

Automatically Provided check base.tsx
retrieved from the item-definition.tsx context

Inherited from: [IPropertyViewMainHandlerProps](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md).[property](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#property)

Defined in: [client/internal/components/PropertyView/index.tsx:95](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L95)

___

### renderer

• **renderer**: *ComponentType*<RendererPropsType\>

There renderer that will be used

While this property also exists on the main renderer, there
it's optional and developer provided, whereas this one is always
there and represents the renderer that you will be using

Calculated, Standard Handler Only

Overrides: [IPropertyViewMainHandlerProps](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md).[renderer](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#renderer)

Defined in: [client/internal/components/PropertyView/index.tsx:209](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L209)

___

### rendererArgs

• **rendererArgs**: *any*

There renderer args that will be used

While this property also exists on the main renderer, there
it's optional and developer provided, whereas this one is always
there, it's often the same that the developer passed, or an empty
object, since the args is supposed to be an object

Calculated, Standard Handler Only

Overrides: [IPropertyViewMainHandlerProps](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md).[rendererArgs](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#rendererargs)

Defined in: [client/internal/components/PropertyView/index.tsx:220](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L220)

___

### rtl

• **rtl**: *boolean*

Whether this language is rtl

Context Provided, Standard Handler Only

Defined in: [client/internal/components/PropertyView/index.tsx:172](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L172)

___

### ssr

• `Optional` **ssr**: [*ISSRContextType*](client_internal_providers_ssr_provider.issrcontexttype.md)

SSR context is a conditional include that will pass the ssr context to the
handler, used in references mainly

Context Provided, Conditional, Standard Handler Only

Defined in: [client/internal/components/PropertyView/index.tsx:159](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L159)

___

### state

• **state**: [*IPropertyDefinitionState*](base_root_module_itemdefinition_propertydefinition.ipropertydefinitionstate.md)

The state of the property definition, same as property.getState or property.getStateNoExternalChecking
but this value is more efficient to access

Automatically Provided check base.tsx
filtered for this specific property from the item-definition.tsx context state value

Inherited from: [IPropertyViewMainHandlerProps](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md).[state](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#state)

Defined in: [client/internal/components/PropertyView/index.tsx:109](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L109)

___

### tokenData

• `Optional` **tokenData**: [*ITokenContextType*](client_internal_providers_token_provider.itokencontexttype.md)

Token is a conditional include that will pass the token to the handler

Context Provided, Conditional, Standard Handler Only

Defined in: [client/internal/components/PropertyView/index.tsx:152](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L152)

___

### useAppliedValue

• `Optional` **useAppliedValue**: *boolean*

Use applied value rather than the actual
value

Provided by the user check base.tsx

Inherited from: [IPropertyViewMainHandlerProps](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md).[useAppliedValue](client_internal_components_propertyview.ipropertyviewmainhandlerprops.md#useappliedvalue)

Defined in: [client/internal/components/PropertyView/index.tsx:116](https://github.com/onzag/itemize/blob/11a98dec/client/internal/components/PropertyView/index.tsx#L116)
