[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IActionResponseWithSearchResults

# Interface: IActionResponseWithSearchResults

[client/providers/item](../modules/client_providers_item.md).IActionResponseWithSearchResults

A response given by search

## Hierarchy

- [`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)

  ↳ **`IActionResponseWithSearchResults`**

## Table of contents

### Properties

- [cached](client_providers_item.IActionResponseWithSearchResults.md#cached)
- [count](client_providers_item.IActionResponseWithSearchResults.md#count)
- [error](client_providers_item.IActionResponseWithSearchResults.md#error)
- [limit](client_providers_item.IActionResponseWithSearchResults.md#limit)
- [offset](client_providers_item.IActionResponseWithSearchResults.md#offset)
- [records](client_providers_item.IActionResponseWithSearchResults.md#records)
- [results](client_providers_item.IActionResponseWithSearchResults.md#results)
- [searchId](client_providers_item.IActionResponseWithSearchResults.md#searchid)

## Properties

### cached

• **cached**: `boolean`

#### Defined in

[client/providers/item.tsx:176](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L176)

___

### count

• **count**: `number`

#### Defined in

[client/providers/item.tsx:173](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L173)

___

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

#### Inherited from

[IBasicActionResponse](client_providers_item.IBasicActionResponse.md).[error](client_providers_item.IBasicActionResponse.md#error)

#### Defined in

[client/providers/item.tsx:141](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L141)

___

### limit

• **limit**: `number`

#### Defined in

[client/providers/item.tsx:174](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L174)

___

### offset

• **offset**: `number`

#### Defined in

[client/providers/item.tsx:175](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L175)

___

### records

• **records**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

#### Defined in

[client/providers/item.tsx:171](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L171)

___

### results

• **results**: [`IGQLValue`](gql_querier.IGQLValue.md)[]

#### Defined in

[client/providers/item.tsx:172](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L172)

___

### searchId

• **searchId**: `string`

#### Defined in

[client/providers/item.tsx:170](https://github.com/onzag/itemize/blob/f2db74a5/client/providers/item.tsx#L170)
