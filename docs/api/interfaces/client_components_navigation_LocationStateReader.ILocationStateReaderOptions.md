[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/navigation/LocationStateReader](../modules/client_components_navigation_LocationStateReader.md) / ILocationStateReaderOptions

# Interface: ILocationStateReaderOptions\<S\>

[client/components/navigation/LocationStateReader](../modules/client_components_navigation_LocationStateReader.md).ILocationStateReaderOptions

The props for the location state reader

## Type parameters

| Name |
| :------ |
| `S` |

## Hierarchy

- **`ILocationStateReaderOptions`**

  ↳ [`ILocationStateReaderProps`](client_components_navigation_LocationStateReader.ILocationStateReaderProps.md)

## Table of contents

### Properties

- [defaultState](client_components_navigation_LocationStateReader.ILocationStateReaderOptions.md#defaultstate)
- [delayedUpdates](client_components_navigation_LocationStateReader.ILocationStateReaderOptions.md#delayedupdates)
- [stateIsInQueryString](client_components_navigation_LocationStateReader.ILocationStateReaderOptions.md#stateisinquerystring)

## Properties

### defaultState

• **defaultState**: `S`

The default state of the reader

#### Defined in

[client/components/navigation/LocationStateReader.tsx:19](https://github.com/onzag/itemize/blob/73e0c39e/client/components/navigation/LocationStateReader.tsx#L19)

___

### delayedUpdates

• `Optional` **delayedUpdates**: `number` \| `boolean`

updates are delayed, so that they don't quite match and an internal
state is kept for the children

#### Defined in

[client/components/navigation/LocationStateReader.tsx:30](https://github.com/onzag/itemize/blob/73e0c39e/client/components/navigation/LocationStateReader.tsx#L30)

___

### stateIsInQueryString

• `Optional` **stateIsInQueryString**: `boolean`

whether the state is in the query string rather than
in the history API, note that query string states
only support strings as values

#### Defined in

[client/components/navigation/LocationStateReader.tsx:25](https://github.com/onzag/itemize/blob/73e0c39e/client/components/navigation/LocationStateReader.tsx#L25)
