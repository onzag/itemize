[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/outdated/AppIsOutdatedChecker

# Module: client/components/outdated/AppIsOutdatedChecker

Allows the application to know when it's outdated as a new version
with a different buildnumber has been launched, this usually means
the client loses connection and then reconnects realizing
the backend and the frontend don't match anymore and an updated
needs to be installed

many things happen during an update, cleaning of the service workers cache,
and refreshing the app

## Table of contents

### Functions

- [default](client_components_outdated_AppIsOutdatedChecker.md#default)

## Functions

### default

▸ **default**(`props`): `Element`

The app is outated checker provides information on an outdated application that requires
a reload (refresh) for it to be updated

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `IAppIsOutdatedCheckerProps` | the props for outated checking |

#### Returns

`Element`

a react component

#### Defined in

[client/components/outdated/AppIsOutdatedChecker.tsx:90](https://github.com/onzag/itemize/blob/f2db74a5/client/components/outdated/AppIsOutdatedChecker.tsx#L90)
