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
- [cancelled](client_providers_item.IActionResponseWithSearchResults.md#cancelled)
- [count](client_providers_item.IActionResponseWithSearchResults.md#count)
- [error](client_providers_item.IActionResponseWithSearchResults.md#error)
- [limit](client_providers_item.IActionResponseWithSearchResults.md#limit)
- [offset](client_providers_item.IActionResponseWithSearchResults.md#offset)
- [polyfilled](client_providers_item.IActionResponseWithSearchResults.md#polyfilled)
- [records](client_providers_item.IActionResponseWithSearchResults.md#records)
- [results](client_providers_item.IActionResponseWithSearchResults.md#results)
- [searchId](client_providers_item.IActionResponseWithSearchResults.md#searchid)

## Properties

### cached

• **cached**: `boolean`

#### Defined in

[client/providers/item.tsx:204](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L204)

___

### cancelled

• **cancelled**: `boolean`

Only truly relevant when pileSearch is used

#### Defined in

[client/providers/item.tsx:209](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L209)

___

### count

• **count**: `number`

#### Defined in

[client/providers/item.tsx:201](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L201)

___

### error

• **error**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

#### Inherited from

[IBasicActionResponse](client_providers_item.IBasicActionResponse.md).[error](client_providers_item.IBasicActionResponse.md#error)

#### Defined in

[client/providers/item.tsx:169](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L169)

___

### limit

• **limit**: `number`

#### Defined in

[client/providers/item.tsx:202](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L202)

___

### offset

• **offset**: `number`

#### Defined in

[client/providers/item.tsx:203](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L203)

___

### polyfilled

• **polyfilled**: `boolean`

#### Defined in

[client/providers/item.tsx:205](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L205)

___

### records

• **records**: [`IRQSearchRecord`](rq_querier.IRQSearchRecord.md)[]

#### Defined in

[client/providers/item.tsx:199](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L199)

___

### results

• **results**: [`IRQValue`](rq_querier.IRQValue.md)[]

#### Defined in

[client/providers/item.tsx:200](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L200)

___

### searchId

• **searchId**: `string`

#### Defined in

[client/providers/item.tsx:198](https://github.com/onzag/itemize/blob/73e0c39e/client/providers/item.tsx#L198)
