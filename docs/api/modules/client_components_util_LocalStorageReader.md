[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/util/LocalStorageReader

# Module: client/components/util/LocalStorageReader

## Table of contents

### Interfaces

- [ILocalStorageEventType](../interfaces/client_components_util_LocalStorageReader.ILocalStorageEventType.md)

### Functions

- [default](client_components_util_LocalStorageReader.md#default)
- [getLocalStorageItem](client_components_util_LocalStorageReader.md#getlocalstorageitem)
- [setLocalStorageItem](client_components_util_LocalStorageReader.md#setlocalstorageitem)
- [useLocalStorageReader](client_components_util_LocalStorageReader.md#uselocalstoragereader)

## Functions

### default

▸ **default**\<`T`\>(`props`): `ReactNode`

The local storage reader

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ILocalStorageReaderProps`\<`T`\> |

#### Returns

`ReactNode`

#### Defined in

[client/components/util/LocalStorageReader.tsx:108](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/LocalStorageReader.tsx#L108)

___

### getLocalStorageItem

▸ **getLocalStorageItem**(`slot`): `any`

Retrieves a local storage item from a specific slot
and JSON parses it

#### Parameters

| Name | Type |
| :------ | :------ |
| `slot` | `string` |

#### Returns

`any`

#### Defined in

[client/components/util/LocalStorageReader.tsx:45](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/LocalStorageReader.tsx#L45)

___

### setLocalStorageItem

▸ **setLocalStorageItem**(`slot`, `value`): `void`

Sets a local storage item (and keeps it updated accross all instances)
it uses JSON stringify to store the value

#### Parameters

| Name | Type |
| :------ | :------ |
| `slot` | `string` |
| `value` | `any` |

#### Returns

`void`

#### Defined in

[client/components/util/LocalStorageReader.tsx:26](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/LocalStorageReader.tsx#L26)

___

### useLocalStorageReader

▸ **useLocalStorageReader**\<`T`\>(`slot`): [`T`, (`v`: `T`) => `void`]

Hooks version for the local storage reader

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `slot` | `string` |

#### Returns

[`T`, (`v`: `T`) => `void`]

#### Defined in

[client/components/util/LocalStorageReader.tsx:68](https://github.com/onzag/itemize/blob/73e0c39e/client/components/util/LocalStorageReader.tsx#L68)
