[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/providers/item

# Module: client/providers/item

## Table of contents

### Classes

- [ActualItemProvider](../classes/client_providers_item.ActualItemProvider.md)

### Interfaces

- [IActionCleanOptions](../interfaces/client_providers_item.IActionCleanOptions.md)
- [IActionDeleteOptions](../interfaces/client_providers_item.IActionDeleteOptions.md)
- [IActionResponseWithId](../interfaces/client_providers_item.IActionResponseWithId.md)
- [IActionResponseWithSearchResults](../interfaces/client_providers_item.IActionResponseWithSearchResults.md)
- [IActionResponseWithValue](../interfaces/client_providers_item.IActionResponseWithValue.md)
- [IActionSearchOptions](../interfaces/client_providers_item.IActionSearchOptions.md)
- [IActionSubmitOptions](../interfaces/client_providers_item.IActionSubmitOptions.md)
- [IActualItemProviderSearchState](../interfaces/client_providers_item.IActualItemProviderSearchState.md)
- [IBasicActionResponse](../interfaces/client_providers_item.IBasicActionResponse.md)
- [IBasicFns](../interfaces/client_providers_item.IBasicFns.md)
- [IItemContextType](../interfaces/client_providers_item.IItemContextType.md)
- [IItemProviderProps](../interfaces/client_providers_item.IItemProviderProps.md)
- [ILoadCompletedPayload](../interfaces/client_providers_item.ILoadCompletedPayload.md)
- [IPokeElementsType](../interfaces/client_providers_item.IPokeElementsType.md)
- [ISearchItemValueContextType](../interfaces/client_providers_item.ISearchItemValueContextType.md)

### Type aliases

- [CacheMetadataGeneratorFn](client_providers_item.md#cachemetadatageneratorfn)
- [ItemProviderRefObject](client_providers_item.md#itemproviderrefobject)
- [ItemProviderType](client_providers_item.md#itemprovidertype)
- [PolicyPathType](client_providers_item.md#policypathtype)

### Variables

- [ItemContext](client_providers_item.md#itemcontext)
- [ItemContextPhaserContext](client_providers_item.md#itemcontextphasercontext)
- [ItemProvider](client_providers_item.md#itemprovider)
- [SearchItemValueContext](client_providers_item.md#searchitemvaluecontext)

### Functions

- [ItemContextPhase](client_providers_item.md#itemcontextphase)
- [ItemContextRetrieve](client_providers_item.md#itemcontextretrieve)
- [NoStateItemProvider](client_providers_item.md#nostateitemprovider)
- [ParentItemContextProvider](client_providers_item.md#parentitemcontextprovider)

## Type aliases

### CacheMetadataGeneratorFn

Ƭ **CacheMetadataGeneratorFn**: (`record`: [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md)) => `any`

#### Type declaration

▸ (`record`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `record` | [`IGQLSearchRecord`](../interfaces/gql_querier.IGQLSearchRecord.md) |

##### Returns

`any`

#### Defined in

[client/providers/item.tsx:360](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L360)

___

### ItemProviderRefObject

Ƭ **ItemProviderRefObject**: `React.RefObject`<[`ActualItemProvider`](../classes/client_providers_item.ActualItemProvider.md)\>

#### Defined in

[client/providers/item.tsx:4311](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L4311)

___

### ItemProviderType

Ƭ **ItemProviderType**: [`ActualItemProvider`](../classes/client_providers_item.ActualItemProvider.md)

#### Defined in

[client/providers/item.tsx:4310](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L4310)

___

### PolicyPathType

Ƭ **PolicyPathType**: [`string`, `string`, `string`]

#### Defined in

[client/providers/item.tsx:187](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L187)

## Variables

### ItemContext

• **ItemContext**: `Context`<[`IItemContextType`](../interfaces/client_providers_item.IItemContextType.md)\>

#### Defined in

[client/providers/item.tsx:601](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L601)

___

### ItemContextPhaserContext

• **ItemContextPhaserContext**: `Context`<{ [slotId: string]: [`IItemContextType`](../interfaces/client_providers_item.IItemContextType.md);  }\>

#### Defined in

[client/providers/item.tsx:602](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L602)

___

### ItemProvider

• **ItemProvider**: `ForwardRefExoticComponent`<[`IItemProviderProps`](../interfaces/client_providers_item.IItemProviderProps.md) & `RefAttributes`<[`ActualItemProvider`](../classes/client_providers_item.ActualItemProvider.md)\>\>

#### Defined in

[client/providers/item.tsx:4312](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L4312)

___

### SearchItemValueContext

• **SearchItemValueContext**: `Context`<[`ISearchItemValueContextType`](../interfaces/client_providers_item.ISearchItemValueContextType.md)\>

#### Defined in

[client/providers/item.tsx:603](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L603)

## Functions

### ItemContextPhase

▸ **ItemContextPhase**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `props.children` | `ReactNode` |
| `props.slot?` | `string` |

#### Returns

`Element`

#### Defined in

[client/providers/item.tsx:4508](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L4508)

___

### ItemContextRetrieve

▸ **ItemContextRetrieve**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `props.children` | `ReactNode` |
| `props.slot?` | `string` |

#### Returns

`Element`

#### Defined in

[client/providers/item.tsx:4529](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L4529)

___

### NoStateItemProvider

▸ **NoStateItemProvider**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `INoStateItemProviderProps` |

#### Returns

`Element`

#### Defined in

[client/providers/item.tsx:4457](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L4457)

___

### ParentItemContextProvider

▸ **ParentItemContextProvider**(`props`): `Element`

Provides a previously injected parent context

**`deprecated`** please use ItemContextPhase and ItemContextRetrieve instead

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `Object` |
| `props.children` | `ReactNode` |

#### Returns

`Element`

#### Defined in

[client/providers/item.tsx:4493](https://github.com/onzag/itemize/blob/f2f29986/client/providers/item.tsx#L4493)
