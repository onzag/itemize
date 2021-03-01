[](../README.md) / [Exports](../modules.md) / [server](../modules/server.md) / ISSRConfig

# Interface: ISSRConfig

[server](../modules/server.md).ISSRConfig

Specifies the SSR configuration for the multiple pages

## Table of contents

### Properties

- [appWrapper](server.issrconfig.md#appwrapper)
- [collector](server.issrconfig.md#collector)
- [mainComponent](server.issrconfig.md#maincomponent)
- [mainWrapper](server.issrconfig.md#mainwrapper)
- [rendererContext](server.issrconfig.md#renderercontext)

## Properties

### appWrapper

• `Optional` **appWrapper**: (`app`: *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\>, `config`: [*IConfigRawJSONDataType*](config.iconfigrawjsondatatype.md)) => *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\>

#### Type declaration:

▸ (`app`: *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\>, `config`: [*IConfigRawJSONDataType*](config.iconfigrawjsondatatype.md)): *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`app` | *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\> |
`config` | [*IConfigRawJSONDataType*](config.iconfigrawjsondatatype.md) |

**Returns:** *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\>

Defined in: [server/index.ts:129](https://github.com/onzag/itemize/blob/5fcde7cf/server/index.ts#L129)

Defined in: [server/index.ts:129](https://github.com/onzag/itemize/blob/5fcde7cf/server/index.ts#L129)

___

### collector

• `Optional` **collector**: [*ICollectorType*](client.icollectortype.md)

Defined in: [server/index.ts:131](https://github.com/onzag/itemize/blob/5fcde7cf/server/index.ts#L131)

___

### mainComponent

• **mainComponent**: *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\>

Defined in: [server/index.ts:128](https://github.com/onzag/itemize/blob/5fcde7cf/server/index.ts#L128)

___

### mainWrapper

• `Optional` **mainWrapper**: (`mainComponet`: *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\>, `config`: [*IConfigRawJSONDataType*](config.iconfigrawjsondatatype.md), `localeContext`: [*ILocaleContextType*](client_internal_providers_locale_provider.ilocalecontexttype.md)) => *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\>

#### Type declaration:

▸ (`mainComponet`: *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\>, `config`: [*IConfigRawJSONDataType*](config.iconfigrawjsondatatype.md), `localeContext`: [*ILocaleContextType*](client_internal_providers_locale_provider.ilocalecontexttype.md)): *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\>

#### Parameters:

Name | Type |
:------ | :------ |
`mainComponet` | *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\> |
`config` | [*IConfigRawJSONDataType*](config.iconfigrawjsondatatype.md) |
`localeContext` | [*ILocaleContextType*](client_internal_providers_locale_provider.ilocalecontexttype.md) |

**Returns:** *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\>

Defined in: [server/index.ts:130](https://github.com/onzag/itemize/blob/5fcde7cf/server/index.ts#L130)

Defined in: [server/index.ts:130](https://github.com/onzag/itemize/blob/5fcde7cf/server/index.ts#L130)

___

### rendererContext

• **rendererContext**: [*IRendererContext*](client_providers_renderer.irenderercontext.md)

Defined in: [server/index.ts:127](https://github.com/onzag/itemize/blob/5fcde7cf/server/index.ts#L127)
