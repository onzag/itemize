[](../README.md) / [Exports](../modules.md) / client/components/navigation

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

▸ **goBack**(): *void*

Simply go back

**Returns:** *void*

Defined in: [client/components/navigation/index.tsx:148](https://github.com/onzag/itemize/blob/0569bdf2/client/components/navigation/index.tsx#L148)

___

### localizedRedirectTo

▸ **localizedRedirectTo**(`newLocation`: *string*, `state?`: *any*, `replace?`: *boolean*): *void*

A very simple redirect as well, but this time ensures that localization
is respected in the url

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`newLocation` | *string* | the new location without localization   |
`state?` | *any* | the new state   |
`replace?` | *boolean* | whether to replace    |

**Returns:** *void*

Defined in: [client/components/navigation/index.tsx:124](https://github.com/onzag/itemize/blob/0569bdf2/client/components/navigation/index.tsx#L124)

___

### redirectTo

▸ **redirectTo**(`newLocation`: *string*, `state?`: *any*, `replace?`: *boolean*): *void*

A very simple redirect that runs a history push or replace

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`newLocation` | *string* | the new location   |
`state?` | *any* | the new state   |
`replace?` | *boolean* | whether to replace rather than push    |

**Returns:** *void*

Defined in: [client/components/navigation/index.tsx:109](https://github.com/onzag/itemize/blob/0569bdf2/client/components/navigation/index.tsx#L109)

___

### setHistoryQSState

▸ **setHistoryQSState**<S\>(`location`: Location, `state`: *Partial*<S\>, `replace?`: *boolean*): *void*

Sets the history state to a new state, but uses the query string
instead rather than the internal history state

#### Type parameters:

Name |
:------ |
`S` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`location` | Location | the location object   |
`state` | *Partial*<S\> | the state to use, partial   |
`replace?` | *boolean* | whether to replace rather than push    |

**Returns:** *void*

Defined in: [client/components/navigation/index.tsx:50](https://github.com/onzag/itemize/blob/0569bdf2/client/components/navigation/index.tsx#L50)

___

### setHistoryState

▸ **setHistoryState**<S\>(`location`: Location, `state`: *Partial*<S\>, `replace?`: *boolean*): *void*

Allows to set the history state to a new state

#### Type parameters:

Name |
:------ |
`S` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`location` | Location | the location object   |
`state` | *Partial*<S\> | the new state, partial   |
`replace?` | *boolean* | and whether it's a replace action rather than a push    |

**Returns:** *void*

Defined in: [client/components/navigation/index.tsx:17](https://github.com/onzag/itemize/blob/0569bdf2/client/components/navigation/index.tsx#L17)
