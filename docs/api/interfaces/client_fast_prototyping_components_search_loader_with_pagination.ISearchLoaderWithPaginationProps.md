[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/search-loader-with-pagination](../modules/client_fast_prototyping_components_search_loader_with_pagination.md) / ISearchLoaderWithPaginationProps

# Interface: ISearchLoaderWithPaginationProps

[client/fast-prototyping/components/search-loader-with-pagination](../modules/client_fast_prototyping_components_search_loader_with_pagination.md).ISearchLoaderWithPaginationProps

The paginated search loader props

## Table of contents

### Properties

- [accessible](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#accessible)
- [accessibleEndReactionKey](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#accessibleendreactionkey)
- [accessiblePageReactionKey](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#accessiblepagereactionkey)
- [accessiblePriority](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#accessiblepriority)
- [accessibleStartReactionKey](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#accessiblestartreactionkey)
- [accessibleUseInFlow](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#accessibleuseinflow)
- [children](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#children)
- [cleanOnDismount](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#cleanondismount)
- [enableExternalChecks](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#enableexternalchecks)
- [id](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#id)
- [localState](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#localstate)
- [onTotalOutOfBounds](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#ontotaloutofbounds)
- [pageSize](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#pagesize)
- [paginationVariant](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#paginationvariant)
- [queryStringPageLocation](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#querystringpagelocation)
- [startInSearchingState](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#startinsearchingstate)
- [static](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#static)
- [total](client_fast_prototyping_components_search_loader_with_pagination.ISearchLoaderWithPaginationProps.md#total)

## Properties

### accessible

• `Optional` **accessible**: `boolean`

make accessible with the alt badge reactioner

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:76](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L76)

___

### accessibleEndReactionKey

• `Optional` **accessibleEndReactionKey**: `string`

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:90](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L90)

___

### accessiblePageReactionKey

• `Optional` **accessiblePageReactionKey**: `string`

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:89](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L89)

___

### accessiblePriority

• `Optional` **accessiblePriority**: `number`

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:86](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L86)

___

### accessibleStartReactionKey

• `Optional` **accessibleStartReactionKey**: `string`

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:88](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L88)

___

### accessibleUseInFlow

• `Optional` **accessibleUseInFlow**: `boolean`

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:87](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L87)

___

### children

• **children**: (`arg`: [`IPagedSearchLoaderArg`](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md), `pagination`: `ReactNode`, `noResults`: `boolean`) => `ReactNode`

#### Type declaration

▸ (`arg`, `pagination`, `noResults`): `ReactNode`

The children that recieves the arguments

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`IPagedSearchLoaderArg`](client_components_search_PagedSearchLoader.IPagedSearchLoaderArg.md) |
| `pagination` | `ReactNode` |
| `noResults` | `boolean` |

##### Returns

`ReactNode`

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:63](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L63)

___

### cleanOnDismount

• `Optional` **cleanOnDismount**: `boolean`

Whether to clean on dismount for the search results that have been loaded

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:34](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L34)

___

### enableExternalChecks

• `Optional` **enableExternalChecks**: `boolean`

Whether to disable the external checks for the item definition
results provider props

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:43](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L43)

___

### id

• **id**: `string`

An unique id to track this loader

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:26](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L26)

___

### localState

• `Optional` **localState**: `boolean`

Whether to use a local state

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:22](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L22)

___

### onTotalOutOfBounds

• `Optional` **onTotalOutOfBounds**: (`newLimit`: `number`, `newOffset`: `number`) => `void`

#### Type declaration

▸ (`newLimit`, `newOffset`): `void`

When the total has gone out of bounds

##### Parameters

| Name | Type |
| :------ | :------ |
| `newLimit` | `number` |
| `newOffset` | `number` |

##### Returns

`void`

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:59](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L59)

___

### pageSize

• **pageSize**: `number`

The page size utilized in the search loader

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:30](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L30)

___

### paginationVariant

• `Optional` **paginationVariant**: ``"text"`` \| ``"outlined"``

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:65](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L65)

___

### queryStringPageLocation

• `Optional` **queryStringPageLocation**: `string`

Specifies the query string parameter to use in the query string to keep the page number
by default it is p

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:71](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L71)

___

### startInSearchingState

• `Optional` **startInSearchingState**: `boolean`

Searching will be set to true until at least
a first search is retrieved

mainly used for SSR purposes so that searching always
starts at true

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:84](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L84)

___

### static

• `Optional` **static**: ``"TOTAL"`` \| ``"NO_LISTENING"``

The static state for the children item definition, TOTAL for
basically not even asking for feedback (useful when the search was traditional)
or NO_LISTENING for just not getting updates but asking for feedback

by default searches do not listen and use total as they act like static
results

Note that if the search was done using a listen policy the item will update anyway
this is why total is the better option

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:55](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L55)

___

### total

• `Optional` **total**: `boolean`

whether to use the total paged search loader

#### Defined in

[client/fast-prototyping/components/search-loader-with-pagination.tsx:38](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/search-loader-with-pagination.tsx#L38)
