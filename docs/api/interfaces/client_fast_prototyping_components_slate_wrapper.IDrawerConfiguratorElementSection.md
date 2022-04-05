[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md) / IDrawerConfiguratorElementSection

# Interface: IDrawerConfiguratorElementSection

[client/fast-prototyping/components/slate/wrapper](../modules/client_fast_prototyping_components_slate_wrapper.md).IDrawerConfiguratorElementSection

## Table of contents

### Properties

- [basis](client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElementSection.md#basis)
- [basisParent](client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElementSection.md#basisparent)
- [elements](client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElementSection.md#elements)
- [title](client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElementSection.md#title)
- [uiHandler](client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElementSection.md#uihandler)
- [unblur](client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElementSection.md#unblur)

## Properties

### basis

• `Optional` **basis**: ``"block"`` \| ``"superblock"`` \| ``"selected"``

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:384](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L384)

___

### basisParent

• `Optional` **basisParent**: `number`

Will match parent of the given element instead useful for nested
superblocks, so if you are in the current super block you may
want to match the parent of it instead, eg. if such superblock
is not selectable

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:391](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L391)

___

### elements

• **elements**: [`IDrawerConfiguratorElementBase`](client_fast_prototyping_components_slate_wrapper.IDrawerConfiguratorElementBase.md)[]

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:394](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L394)

___

### title

• **title**: `ReactNode`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:393](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L393)

___

### uiHandler

• `Optional` **uiHandler**: `string`

The ui handler in question

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:383](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L383)

___

### unblur

• `Optional` **unblur**: `boolean`

#### Defined in

[client/fast-prototyping/components/slate/wrapper.tsx:392](https://github.com/onzag/itemize/blob/f2f29986/client/fast-prototyping/components/slate/wrapper.tsx#L392)
