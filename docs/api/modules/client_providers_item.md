[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/providers/item

# Module: client/providers/item

## Table of contents

### Namespaces

- [ItemProvider](client_providers_item.ItemProvider.md)

### Classes

- [ActualItemProvider](../classes/client_providers_item.ActualItemProvider.md)

### Interfaces

- [IActionCleanOptions](../interfaces/client_providers_item.IActionCleanOptions.md)
- [IActionDeleteOptions](../interfaces/client_providers_item.IActionDeleteOptions.md)
- [IActionResponseWithSearchResults](../interfaces/client_providers_item.IActionResponseWithSearchResults.md)
- [IActionResponseWithValue](../interfaces/client_providers_item.IActionResponseWithValue.md)
- [IActionSearchOptions](../interfaces/client_providers_item.IActionSearchOptions.md)
- [IActionSubmitOptions](../interfaces/client_providers_item.IActionSubmitOptions.md)
- [IActionSubmitResponse](../interfaces/client_providers_item.IActionSubmitResponse.md)
- [IBasicActionResponse](../interfaces/client_providers_item.IBasicActionResponse.md)
- [IBasicFns](../interfaces/client_providers_item.IBasicFns.md)
- [IItemContextType](../interfaces/client_providers_item.IItemContextType.md)
- [IItemProviderProps](../interfaces/client_providers_item.IItemProviderProps.md)
- [ILoadCompletedPayload](../interfaces/client_providers_item.ILoadCompletedPayload.md)
- [IPokeElementsType](../interfaces/client_providers_item.IPokeElementsType.md)
- [ISearchItemValueContextType](../interfaces/client_providers_item.ISearchItemValueContextType.md)

### Type Aliases

- [ItemProviderRefObject](client_providers_item.md#itemproviderrefobject)
- [ItemProviderType](client_providers_item.md#itemprovidertype)
- [PolicyPathType](client_providers_item.md#policypathtype)

### Variables

- [ItemContext](client_providers_item.md#itemcontext)
- [ItemContextPhaserContext](client_providers_item.md#itemcontextphasercontext)
- [SearchItemValueContext](client_providers_item.md#searchitemvaluecontext)

### Functions

- [ItemContextPhase](client_providers_item.md#itemcontextphase)
- [ItemContextRetrieve](client_providers_item.md#itemcontextretrieve)
- [ItemProvider](client_providers_item.md#itemprovider)
- [NoStateItemProvider](client_providers_item.md#nostateitemprovider)
- [ParentItemContextProvider](client_providers_item.md#parentitemcontextprovider)

## Type Aliases

### ItemProviderRefObject

Ƭ **ItemProviderRefObject**: `React.RefObject`\<[`ActualItemProvider`](../classes/client_providers_item.ActualItemProvider.md)\>

#### Defined in

[client/providers/item.tsx:6322](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L6322)

___

### ItemProviderType

Ƭ **ItemProviderType**: [`ActualItemProvider`](../classes/client_providers_item.ActualItemProvider.md)

#### Defined in

[client/providers/item.tsx:6321](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L6321)

___

### PolicyPathType

Ƭ **PolicyPathType**: [`string`, `string`, `string`]

#### Defined in

[client/providers/item.tsx:212](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L212)

## Variables

### ItemContext

• `Const` **ItemContext**: `Context`\<[`IItemContextType`](../interfaces/client_providers_item.IItemContextType.md)\>

The item context represents the context that holds information about
an item, with its value and respective state, all item contexts
are synchronized as the state is held centrally in the item definition

#### Defined in

[client/providers/item.tsx:1502](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L1502)

___

### ItemContextPhaserContext

• `Const` **ItemContextPhaserContext**: `Context`\<\{ `[slotId: string]`: [`IItemContextType`](../interfaces/client_providers_item.IItemContextType.md);  }\>

The phaser context is used by the item context phase in order to phase item contexts
through other item contexts, this is the new way that deprecates the injectParentContext mechanism

#### Defined in

[client/providers/item.tsx:1508](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L1508)

___

### SearchItemValueContext

• `Const` **SearchItemValueContext**: `Context`\<[`ISearchItemValueContextType`](../interfaces/client_providers_item.ISearchItemValueContextType.md)\>

The search item value context is what is used to inject the currently being searched context

#### Defined in

[client/providers/item.tsx:1513](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L1513)

## Functions

### ItemContextPhase

▸ **ItemContextPhase**(`props`): `Element`

Phases the currrent item context until it is later retrieved so it can be used later at another level
for example the following

<ItemContextPhase>
  <ItemProvider
    {...}
  >
    <ItemContextRetrieve>
       
    </ItemContextRetrieve>
  </ItemProvider>
</ItemContextPhase>

will use the outer context inside the item context retrieve

you may use a lot in order to be able to phase multiple contexts

<ItemContextPhase slot="slot1">
  <ItemProvider
    {...}
  >
    <ItemContextPhase slot="slot2">
      <ItemContextRetrieve slot="slot1">
       
      </ItemContextRetrieve>
    </ItemContextPhase>
  </ItemProvider>
</ItemContextPhase>

In this case both contexts are phased in

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IItemContextPhaseProps` |

#### Returns

`Element`

#### Defined in

[client/providers/item.tsx:6579](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L6579)

___

### ItemContextRetrieve

▸ **ItemContextRetrieve**(`props`): `Element`

This is the item context retrieve and allows to retrieve the context
that was previously phased with ItemContextPhase

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IItemContextPhaseProps` |

#### Returns

`Element`

#### Defined in

[client/providers/item.tsx:6607](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L6607)

___

### ItemProvider

▸ **ItemProvider**(`props`): `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

The item provider component provides the core functionality for the item provider

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`IItemProviderProps`](../interfaces/client_providers_item.IItemProviderProps.md) & `RefAttributes`\<[`ActualItemProvider`](../classes/client_providers_item.ActualItemProvider.md)\> |

#### Returns

`ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Defined in

node_modules/@types/react/index.d.ts:354

___

### NoStateItemProvider

▸ **NoStateItemProvider**(`props`): `Element`

The no state item provider allows to set an item provider that holds no state
and therefore it is cheaper

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `INoStateItemProviderProps` |

#### Returns

`Element`

**`Deprecated`**

#### Defined in

[client/providers/item.tsx:6480](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L6480)

___

### ParentItemContextProvider

▸ **ParentItemContextProvider**(`props`): `Element`

Provides a previously injected parent context

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `props.children` | `ReactNode` |

#### Returns

`Element`

**`Deprecated`**

please use ItemContextPhase and ItemContextRetrieve instead

#### Defined in

[client/providers/item.tsx:6518](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L6518)
