[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/navigation/LocationStateReader](../modules/client_components_navigation_LocationStateReader.md) / ILocationStateReaderProps

# Interface: ILocationStateReaderProps\<S\>

[client/components/navigation/LocationStateReader](../modules/client_components_navigation_LocationStateReader.md).ILocationStateReaderProps

The props for the location state reader

## Type parameters

| Name |
| :------ |
| `S` |

## Hierarchy

- [`ILocationStateReaderOptions`](client_components_navigation_LocationStateReader.ILocationStateReaderOptions.md)\<`S`\>

  ↳ **`ILocationStateReaderProps`**

## Table of contents

### Properties

- [children](client_components_navigation_LocationStateReader.ILocationStateReaderProps.md#children)
- [defaultState](client_components_navigation_LocationStateReader.ILocationStateReaderProps.md#defaultstate)
- [delayedUpdates](client_components_navigation_LocationStateReader.ILocationStateReaderProps.md#delayedupdates)
- [stateIsInQueryString](client_components_navigation_LocationStateReader.ILocationStateReaderProps.md#stateisinquerystring)

## Properties

### children

• **children**: (`state`: `S`, `setState`: (`state`: `Partial`\<`S`\>, `replace?`: `boolean`) => `void`, `isSynced`: `boolean`, `runWhenSynced`: (`fn`: () => `void`) => `void`) => `ReactNode`

#### Type declaration

▸ (`state`, `setState`, `isSynced`, `runWhenSynced`): `ReactNode`

The consumer children, which passes
a state and a setState function

##### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `S` |
| `setState` | (`state`: `Partial`\<`S`\>, `replace?`: `boolean`) => `void` |
| `isSynced` | `boolean` |
| `runWhenSynced` | (`fn`: () => `void`) => `void` |

##### Returns

`ReactNode`

#### Defined in

[client/components/navigation/LocationStateReader.tsx:41](https://github.com/onzag/itemize/blob/73e0c39e/client/components/navigation/LocationStateReader.tsx#L41)

___

### defaultState

• **defaultState**: `S`

The default state of the reader

#### Inherited from

[ILocationStateReaderOptions](client_components_navigation_LocationStateReader.ILocationStateReaderOptions.md).[defaultState](client_components_navigation_LocationStateReader.ILocationStateReaderOptions.md#defaultstate)

#### Defined in

[client/components/navigation/LocationStateReader.tsx:19](https://github.com/onzag/itemize/blob/73e0c39e/client/components/navigation/LocationStateReader.tsx#L19)

___

### delayedUpdates

• `Optional` **delayedUpdates**: `number` \| `boolean`

updates are delayed, so that they don't quite match and an internal
state is kept for the children

#### Inherited from

[ILocationStateReaderOptions](client_components_navigation_LocationStateReader.ILocationStateReaderOptions.md).[delayedUpdates](client_components_navigation_LocationStateReader.ILocationStateReaderOptions.md#delayedupdates)

#### Defined in

[client/components/navigation/LocationStateReader.tsx:30](https://github.com/onzag/itemize/blob/73e0c39e/client/components/navigation/LocationStateReader.tsx#L30)

___

### stateIsInQueryString

• `Optional` **stateIsInQueryString**: `boolean`

whether the state is in the query string rather than
in the history API, note that query string states
only support strings as values

#### Inherited from

[ILocationStateReaderOptions](client_components_navigation_LocationStateReader.ILocationStateReaderOptions.md).[stateIsInQueryString](client_components_navigation_LocationStateReader.ILocationStateReaderOptions.md#stateisinquerystring)

#### Defined in

[client/components/navigation/LocationStateReader.tsx:25](https://github.com/onzag/itemize/blob/73e0c39e/client/components/navigation/LocationStateReader.tsx#L25)
