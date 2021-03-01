[](../README.md) / [Exports](../modules.md) / client/providers/item

# Module: client/providers/item

## Table of contents

### Classes

- [ActualItemProvider](../classes/client_providers_item.actualitemprovider.md)

### Interfaces

- [IActionCleanOptions](../interfaces/client_providers_item.iactioncleanoptions.md)
- [IActionDeleteOptions](../interfaces/client_providers_item.iactiondeleteoptions.md)
- [IActionResponseWithId](../interfaces/client_providers_item.iactionresponsewithid.md)
- [IActionResponseWithSearchResults](../interfaces/client_providers_item.iactionresponsewithsearchresults.md)
- [IActionResponseWithValue](../interfaces/client_providers_item.iactionresponsewithvalue.md)
- [IActionSearchOptions](../interfaces/client_providers_item.iactionsearchoptions.md)
- [IActionSubmitOptions](../interfaces/client_providers_item.iactionsubmitoptions.md)
- [IBasicActionResponse](../interfaces/client_providers_item.ibasicactionresponse.md)
- [IItemContextType](../interfaces/client_providers_item.iitemcontexttype.md)
- [IItemProviderProps](../interfaces/client_providers_item.iitemproviderprops.md)
- [ILoadCompletedPayload](../interfaces/client_providers_item.iloadcompletedpayload.md)
- [IPokeElementsType](../interfaces/client_providers_item.ipokeelementstype.md)
- [ISearchItemValueContextType](../interfaces/client_providers_item.isearchitemvaluecontexttype.md)

### Type aliases

- [PolicyPathType](client_providers_item.md#policypathtype)

### Variables

- [ItemContext](client_providers_item.md#itemcontext)
- [SearchItemValueContext](client_providers_item.md#searchitemvaluecontext)

### Functions

- [ItemProvider](client_providers_item.md#itemprovider)
- [NoStateItemProvider](client_providers_item.md#nostateitemprovider)
- [ParentItemContextProvider](client_providers_item.md#parentitemcontextprovider)

## Type aliases

### PolicyPathType

Ƭ **PolicyPathType**: [*string*, *string*, *string*]

Defined in: [client/providers/item.tsx:144](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L144)

## Variables

### ItemContext

• `Const` **ItemContext**: *Context*<[*IItemContextType*](../interfaces/client_providers_item.iitemcontexttype.md)\>

Defined in: [client/providers/item.tsx:498](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L498)

___

### SearchItemValueContext

• `Const` **SearchItemValueContext**: *Context*<[*ISearchItemValueContextType*](../interfaces/client_providers_item.isearchitemvaluecontexttype.md)\>

Defined in: [client/providers/item.tsx:499](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L499)

## Functions

### ItemProvider

▸ **ItemProvider**(`props`: [*IItemProviderProps*](../interfaces/client_providers_item.iitemproviderprops.md)): *Element*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | [*IItemProviderProps*](../interfaces/client_providers_item.iitemproviderprops.md) |

**Returns:** *Element*

Defined in: [client/providers/item.tsx:3648](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3648)

___

### NoStateItemProvider

▸ **NoStateItemProvider**(`props`: INoStateItemProviderProps): *Element*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | INoStateItemProviderProps |

**Returns:** *Element*

Defined in: [client/providers/item.tsx:3789](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3789)

___

### ParentItemContextProvider

▸ **ParentItemContextProvider**(`props`: { `children`: React.ReactNode  }): *Element*

#### Parameters:

Name | Type |
:------ | :------ |
`props` | *object* |
`props.children` | React.ReactNode |

**Returns:** *Element*

Defined in: [client/providers/item.tsx:3819](https://github.com/onzag/itemize/blob/5fcde7cf/client/providers/item.tsx#L3819)
