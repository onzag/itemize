[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/property/HighlightsView](../modules/client_components_property_HighlightsView.md) / IHighlightRetrieverProps

# Interface: IHighlightRetrieverProps

[client/components/property/HighlightsView](../modules/client_components_property_HighlightsView.md).IHighlightRetrieverProps

## Table of contents

### Properties

- [FragmentNode](client_components_property_HighlightsView.IHighlightRetrieverProps.md#fragmentnode)
- [Node](client_components_property_HighlightsView.IHighlightRetrieverProps.md#node)
- [endStr](client_components_property_HighlightsView.IHighlightRetrieverProps.md#endstr)
- [fragmentNodeProps](client_components_property_HighlightsView.IHighlightRetrieverProps.md#fragmentnodeprops)
- [nodeProps](client_components_property_HighlightsView.IHighlightRetrieverProps.md#nodeprops)
- [nullNode](client_components_property_HighlightsView.IHighlightRetrieverProps.md#nullnode)
- [propertyId](client_components_property_HighlightsView.IHighlightRetrieverProps.md#propertyid)
- [startStr](client_components_property_HighlightsView.IHighlightRetrieverProps.md#startstr)

## Properties

### FragmentNode

• `Optional` **FragmentNode**: `ComponentType`\<`any`\>

The fragment node to use, must support dangerouslySetInnerHTML

#### Defined in

[client/components/property/HighlightsView.tsx:19](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/HighlightsView.tsx#L19)

___

### Node

• `Optional` **Node**: `ComponentType`\<`any`\>

The node to use to wrap the entire thing
should support lang attribute

#### Defined in

[client/components/property/HighlightsView.tsx:11](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/HighlightsView.tsx#L11)

___

### endStr

• `Optional` **endStr**: `string`

What to end each fragment which, useful to set "..." here

#### Defined in

[client/components/property/HighlightsView.tsx:35](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/HighlightsView.tsx#L35)

___

### fragmentNodeProps

• `Optional` **fragmentNodeProps**: `any`

the node props to use in the fragment

#### Defined in

[client/components/property/HighlightsView.tsx:27](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/HighlightsView.tsx#L27)

___

### nodeProps

• `Optional` **nodeProps**: `any`

The node props to use to wrap the match

#### Defined in

[client/components/property/HighlightsView.tsx:15](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/HighlightsView.tsx#L15)

___

### nullNode

• `Optional` **nullNode**: `ReactNode`

What to render if no highlights found

#### Defined in

[client/components/property/HighlightsView.tsx:23](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/HighlightsView.tsx#L23)

___

### propertyId

• **propertyId**: `string`

#### Defined in

[client/components/property/HighlightsView.tsx:6](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/HighlightsView.tsx#L6)

___

### startStr

• `Optional` **startStr**: `string`

What to start each fragment which, useful to set "..." here

#### Defined in

[client/components/property/HighlightsView.tsx:31](https://github.com/onzag/itemize/blob/73e0c39e/client/components/property/HighlightsView.tsx#L31)
