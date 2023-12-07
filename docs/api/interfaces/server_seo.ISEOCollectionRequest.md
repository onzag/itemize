[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/seo](../modules/server_seo.md) / ISEOCollectionRequest

# Interface: ISEOCollectionRequest

[server/seo](../modules/server_seo.md).ISEOCollectionRequest

## Table of contents

### Properties

- [collectAllVersions](server_seo.ISEOCollectionRequest.md#collectallversions)
- [extraColumns](server_seo.ISEOCollectionRequest.md#extracolumns)
- [itemOrModule](server_seo.ISEOCollectionRequest.md#itemormodule)

### Methods

- [customWhere](server_seo.ISEOCollectionRequest.md#customwhere)

## Properties

### collectAllVersions

• `Optional` **collectAllVersions**: `boolean`

By default only the base version is collected, if you wish you can collect all the versions

#### Defined in

[server/seo/index.ts:33](https://github.com/onzag/itemize/blob/a24376ed/server/seo/index.ts#L33)

___

### extraColumns

• `Optional` **extraColumns**: `string`[]

#### Defined in

[server/seo/index.ts:28](https://github.com/onzag/itemize/blob/a24376ed/server/seo/index.ts#L28)

___

### itemOrModule

• **itemOrModule**: `string`

#### Defined in

[server/seo/index.ts:27](https://github.com/onzag/itemize/blob/a24376ed/server/seo/index.ts#L27)

## Methods

### customWhere

▸ `Optional` **customWhere**(`b`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `b` | [`WhereBuilder`](../classes/database_WhereBuilder.WhereBuilder.md) |

#### Returns

`void`

#### Defined in

[server/seo/index.ts:29](https://github.com/onzag/itemize/blob/a24376ed/server/seo/index.ts#L29)
