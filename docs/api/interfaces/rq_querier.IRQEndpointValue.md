[@onzag/itemize](../README.md) / [Modules](../modules.md) / [rq-querier](../modules/rq_querier.md) / IRQEndpointValue

# Interface: IRQEndpointValue

[rq-querier](../modules/rq_querier.md).IRQEndpointValue

A rq endpoint output

## Table of contents

### Properties

- [data](rq_querier.IRQEndpointValue.md#data)
- [errors](rq_querier.IRQEndpointValue.md#errors)
- [warnings](rq_querier.IRQEndpointValue.md#warnings)

## Properties

### data

• **data**: `Object`

#### Index signature

▪ [key: `string`]: [`IRQValue`](rq_querier.IRQValue.md)

#### Defined in

[rq-querier.ts:153](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L153)

___

### errors

• `Optional` **errors**: \{ `error`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype) ; `source?`: `string`  }[]

#### Defined in

[rq-querier.ts:156](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L156)

___

### warnings

• `Optional` **warnings**: \{ `source?`: `string` ; `warning`: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)  }[]

#### Defined in

[rq-querier.ts:161](https://github.com/onzag/itemize/blob/73e0c39e/rq-querier.ts#L161)
