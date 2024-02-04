[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/navigation/LocationStateReader

# Module: client/components/navigation/LocationStateReader

This file contains the location state reader which reads a pseudo state
obtained via the browser history api or the query string

## Table of contents

### Interfaces

- [ILocationStateReaderOptions](../interfaces/client_components_navigation_LocationStateReader.ILocationStateReaderOptions.md)
- [ILocationStateReaderProps](../interfaces/client_components_navigation_LocationStateReader.ILocationStateReaderProps.md)

### Functions

- [default](client_components_navigation_LocationStateReader.md#default)
- [useLocationStateReader](client_components_navigation_LocationStateReader.md#uselocationstatereader)

## Functions

### default

▸ **default**\<`S`\>(`props`): `any`

The location state reader component

#### Type parameters

| Name |
| :------ |
| `S` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`ILocationStateReaderProps`](../interfaces/client_components_navigation_LocationStateReader.ILocationStateReaderProps.md)\<`S`\> | the props |

#### Returns

`any`

a react component

#### Defined in

[client/components/navigation/LocationStateReader.tsx:171](https://github.com/onzag/itemize/blob/73e0c39e/client/components/navigation/LocationStateReader.tsx#L171)

___

### useLocationStateReader

▸ **useLocationStateReader**\<`S`\>(`options`): [`S`, (`state`: `Partial`\<`S`\>, `replace?`: `boolean`) => `void`, `boolean`, (`fn`: () => `void`) => `void`]

#### Type parameters

| Name |
| :------ |
| `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ILocationStateReaderOptions`](../interfaces/client_components_navigation_LocationStateReader.ILocationStateReaderOptions.md)\<`S`\> |

#### Returns

[`S`, (`state`: `Partial`\<`S`\>, `replace?`: `boolean`) => `void`, `boolean`, (`fn`: () => `void`) => `void`]

#### Defined in

[client/components/navigation/LocationStateReader.tsx:49](https://github.com/onzag/itemize/blob/73e0c39e/client/components/navigation/LocationStateReader.tsx#L49)
