[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/providers/item](../modules/client_providers_item.md) / IActionResponseWithSearchResults

# Interface: IActionResponseWithSearchResults

[client/providers/item](../modules/client_providers_item.md).IActionResponseWithSearchResults

A response given by search

## Hierarchy

- [`IBasicActionResponse`](client_providers_item.IBasicActionResponse.md)

  ↳ **`IActionResponseWithSearchResults`**

## Table of contents

### Properties

- [count](client_providers_item.IActionResponseWithSearchResults.md#count)
- [error](client_providers_item.IActionResponseWithSearchResults.md#error)
- [limit](client_providers_item.IActionResponseWithSearchResults.md#limit)
- [offset](client_providers_item.IActionResponseWithSearchResults.md#offset)
- [records](client_providers_item.IActionResponseWithSearchResults.md#records)
- [results](client_providers_item.IActionResponseWithSearchResults.md#results)
- [searchId](client_providers_item.IActionResponseWithSearchResults.md#searchid)

## Properties

### count

• **count**: `number`

#### Defined in

[client/providers/item.tsx:182](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L182)

___

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

#### Inherited from

[IBasicActionResponse](client_providers_item.IBasicActionResponse.md).[error](client_providers_item.IBasicActionResponse.md#error)

#### Defined in

[client/providers/item.tsx:152](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L152)

___

### limit

• **limit**: `number`

#### Defined in

[client/providers/item.tsx:183](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L183)

___

### offset

• **offset**: `number`

#### Defined in

[client/providers/item.tsx:184](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L184)

___

### records

• **records**: [`IGQLSearchRecord`](gql_querier.IGQLSearchRecord.md)[]

#### Defined in

[client/providers/item.tsx:180](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L180)

___

### results

• **results**: [`IGQLValue`](gql_querier.IGQLValue.md)[]

#### Defined in

[client/providers/item.tsx:181](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L181)

___

### searchId

• **searchId**: `string`

#### Defined in

[client/providers/item.tsx:179](https://github.com/onzag/itemize/blob/5c2808d3/client/providers/item.tsx#L179)
