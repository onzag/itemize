[@onzag/itemize](../README.md) / [Modules](../modules.md) / [base/Root/rq](../modules/base_Root_rq.md) / RQQuery

# Interface: RQQuery

[base/Root/rq](../modules/base_Root_rq.md).RQQuery

## Table of contents

### Properties

- [args](base_Root_rq.RQQuery.md#args)
- [extFields](base_Root_rq.RQQuery.md#extfields)
- [ownFields](base_Root_rq.RQQuery.md#ownfields)
- [resolve](base_Root_rq.RQQuery.md#resolve)
- [stdFields](base_Root_rq.RQQuery.md#stdfields)

## Properties

### args

• **args**: `Object`

#### Index signature

▪ [id: `string`]: [`RQArg`](base_Root_rq.RQArg.md)

#### Defined in

[base/Root/rq.ts:62](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L62)

___

### extFields

• `Optional` **extFields**: `Object`

Signals the precense of a DATA layer that contains both
std fields and own fields

if not present then it's null

#### Index signature

▪ [id: `string`]: [`RQField`](base_Root_rq.RQField.md)

#### Defined in

[base/Root/rq.ts:74](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L74)

___

### ownFields

• **ownFields**: `Object`

#### Index signature

▪ [id: `string`]: [`RQField`](base_Root_rq.RQField.md)

#### Defined in

[base/Root/rq.ts:77](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L77)

___

### resolve

• `Optional` **resolve**: [`FRQIdefResolverType`](../modules/base_Root_rq.md#frqidefresolvertype) \| [`FRQModResolverType`](../modules/base_Root_rq.md#frqmodresolvertype)

#### Defined in

[base/Root/rq.ts:80](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L80)

___

### stdFields

• **stdFields**: `Object`

#### Index signature

▪ [id: `string`]: [`RQField`](base_Root_rq.RQField.md)

#### Defined in

[base/Root/rq.ts:65](https://github.com/onzag/itemize/blob/a24376ed/base/Root/rq.ts#L65)
