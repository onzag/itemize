[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/navigation

# Module: client/components/navigation

Containst function that are usable for handling navigation
between the application

## Table of contents

### Functions

- [goBack](client_components_navigation.md#goback)
- [localizedRedirectTo](client_components_navigation.md#localizedredirectto)
- [redirectTo](client_components_navigation.md#redirectto)
- [setHistoryQSState](client_components_navigation.md#sethistoryqsstate)
- [setHistoryState](client_components_navigation.md#sethistorystate)

## Functions

### goBack

▸ **goBack**(): `void`

Simply go back

#### Returns

`void`

#### Defined in

[client/components/navigation/index.tsx:226](https://github.com/onzag/itemize/blob/a24376ed/client/components/navigation/index.tsx#L226)

___

### localizedRedirectTo

▸ **localizedRedirectTo**(`newLocation`, `options?`): `void`

A very simple redirect as well, but this time ensures that localization
is respected in the url

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newLocation` | `string` | the new location without localization, use $HERE to specify the current location without query parameters |
| `options` | `IRedirectOptions` | - |

#### Returns

`void`

#### Defined in

[client/components/navigation/index.tsx:197](https://github.com/onzag/itemize/blob/a24376ed/client/components/navigation/index.tsx#L197)

___

### redirectTo

▸ **redirectTo**(`newLocation`, `options?`): `void`

A very simple redirect that runs a history push or replace

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newLocation` | `string` | the new location |
| `options` | `IRedirectOptions` | - |

#### Returns

`void`

#### Defined in

[client/components/navigation/index.tsx:129](https://github.com/onzag/itemize/blob/a24376ed/client/components/navigation/index.tsx#L129)

___

### setHistoryQSState

▸ **setHistoryQSState**<`S`\>(`location`, `state`, `replace?`): `void`

Sets the history state to a new state, but uses the query string
instead rather than the internal history state

#### Type parameters

| Name |
| :------ |
| `S` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `location` | `Location`<`unknown`\> | the location object |
| `state` | `Partial`<`S`\> | the state to use, partial |
| `replace?` | `boolean` | whether to replace rather than push |

#### Returns

`void`

#### Defined in

[client/components/navigation/index.tsx:59](https://github.com/onzag/itemize/blob/a24376ed/client/components/navigation/index.tsx#L59)

___

### setHistoryState

▸ **setHistoryState**<`S`\>(`location`, `state`, `replace?`): `void`

Allows to set the history state to a new state

#### Type parameters

| Name |
| :------ |
| `S` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `location` | `Location`<`unknown`\> | the location object |
| `state` | `Partial`<`S`\> | the new state, partial |
| `replace?` | `boolean` | and whether it's a replace action rather than a push |

#### Returns

`void`

#### Defined in

[client/components/navigation/index.tsx:26](https://github.com/onzag/itemize/blob/a24376ed/client/components/navigation/index.tsx#L26)
