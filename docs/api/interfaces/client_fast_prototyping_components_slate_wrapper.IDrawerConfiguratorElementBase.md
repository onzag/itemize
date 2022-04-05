[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md) / IDrawerConfiguratorElementBase

# Interface: IDrawerConfiguratorElementBase

[client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md).IDrawerConfiguratorElementBase

Specifies a configurator to be added to the UI handled element
that is created to be chosen in the drawer

## Table of contents

### Properties

- [arg](client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElementBase.md#arg)
- [basis](client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElementBase.md#basis)
- [basisParent](client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElementBase.md#basisparent)
- [input](client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElementBase.md#input)
- [uiHandler](client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElementBase.md#uihandler)

### Methods

- [condition](client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElementBase.md#condition)

## Properties

### arg

• `Optional` **arg**: `string`

The relevant argument of the ui handler
if not provided value will be null and change functions wont
work

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:364](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L364)

___

### basis

• `Optional` **basis**: ``"block"`` \| ``"superblock"`` \| ``"selected"``

The element it should work against, by default
it is the selected one

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:351](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L351)

___

### basisParent

• `Optional` **basisParent**: `number`

Will match parent of the given element instead useful for nested
superblocks, so if you are in the current super block you may
want to match the parent of it instead, eg. if such superblock
is not selectable

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:358](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L358)

___

### input

• **input**: [`IDrawerUIHandlerElementConfigSelect`](client_fast_prototyping_components_slate_wrapper.IDrawerUIHandlerElementConfigSelect.md) \| [`IDrawerUIHandlerElementConfigInput`](client_fast_prototyping_components_slate_wrapper.IDrawerUIHandlerElementConfigInput.md) \| [`IDrawerUIHandlerElementConfigBoolean`](client_fast_prototyping_components_slate_wrapper.IDrawerUIHandlerElementConfigBoolean.md) \| [`IDrawerUIHandlerElementConfigCustom`](client_fast_prototyping_components_slate_wrapper.IDrawerUIHandlerElementConfigCustom.md)

The way for the input to be specified

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:372](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L372)

___

### uiHandler

• `Optional` **uiHandler**: `string` \| `string`[]

The ui handler in question

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:346](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L346)

## Methods

### condition

▸ `Optional` **condition**(`state`): `boolean`

A condition that uses the args as basis on whether this would appear or not

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | [`ISlateEditorStateType`](client_fast_prototyping_components_slate.ISlateEditorStateType.md) |

#### Returns

`boolean`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:368](https://github.com/onzag/itemize/blob/5c2808d3/client/fast-prototyping/components/slate/wrapper.tsx#L368)
