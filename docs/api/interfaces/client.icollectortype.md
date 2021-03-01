[](../README.md) / [Exports](../modules.md) / [client](../modules/client.md) / ICollectorType

# Interface: ICollectorType

[client](../modules/client.md).ICollectorType

Defines a collector, the collector will collect normally styles or other
data as it's feed the application and provide back the node to render (Which should contain the app)
as well as an id

## Table of contents

### Properties

- [collect](client.icollectortype.md#collect)
- [retrieve](client.icollectortype.md#retrieve)

## Properties

### collect

• **collect**: (`app`: *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\>) => { `id`: *string* ; `node`: ReactNode  }

This is the collection function

**`param`** the app itself that is fed to the collector

**`returns`** a node and an id for the collection action in order to retrieve
the collection results

#### Type declaration:

▸ (`app`: *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\>): *object*

#### Parameters:

Name | Type |
:------ | :------ |
`app` | *ReactElement*<any, string \| (`props`: *any*) => *ReactElement*<any, string \| (props: any) =\> ReactElement<any, string \| ... \| (new (props: any) =\> Component<any, any, any\>)\> \| (`props`: *any*) => *Component*<any, any, any\>\> \| (`props`: *any*) => *Component*<any, any, any\>\> |

**Returns:** *object*

Name | Type |
:------ | :------ |
`id` | *string* |
`node` | ReactNode |

Defined in: [client/index.tsx:151](https://github.com/onzag/itemize/blob/28218320/client/index.tsx#L151)

Defined in: [client/index.tsx:151](https://github.com/onzag/itemize/blob/28218320/client/index.tsx#L151)

___

### retrieve

• **retrieve**: (`id`: *string*) => *string*

Retrieves the collection results based on the id previously given

**`returns`** a string, this string is added as the value of the <SSRHEAD> to the index.html template

#### Type declaration:

▸ (`id`: *string*): *string*

#### Parameters:

Name | Type |
:------ | :------ |
`id` | *string* |

**Returns:** *string*

Defined in: [client/index.tsx:159](https://github.com/onzag/itemize/blob/28218320/client/index.tsx#L159)

Defined in: [client/index.tsx:159](https://github.com/onzag/itemize/blob/28218320/client/index.tsx#L159)
