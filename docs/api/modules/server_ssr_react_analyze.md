[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/ssr/react-analyze

# Module: server/ssr/react-analyze

## Table of contents

### Variables

- [Dispatcher](server_ssr_react_analyze.md#dispatcher)

### Functions

- [walkReactTree](server_ssr_react_analyze.md#walkreacttree)

## Variables

### Dispatcher

• `Const` **Dispatcher**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `readContext` | (`context`: `any`, `_`: `number` \| `boolean` \| `void`) => `any` |
| `useCallback` | \<T\>(`callback`: `T`, `deps`: `any`[]) => `T` |
| `useContext` | (`context`: `any`, `_`: `number` \| `boolean` \| `void`) => `any` |
| `useDebugValue` | () => `void` |
| `useDeferredValue` | \<T\>(`input`: `T`) => `T` |
| `useEffect` | () => `void` |
| `useId` | () => `string` |
| `useImperativeHandle` | () => `void` |
| `useLayoutEffect` | () => `void` |
| `useMemo` | \<T\>(`memoValue`: () => `T`, `deps`: `any`[]) => `T` |
| `useMutableSource` | \<Source, Snapshot\>(`source`: `any`, `getSnapshot`: `any`, `_subscribe`: `any`) => `Snapshot` |
| `useOpaqueIdentifier` | () => `string` |
| `useReducer` | \<S, I, A\>(`reducer`: `any`, `initialArg`: `any`, `init?`: `any`) => [`S`, `any`] |
| `useRef` | \<T\>(`initialValue`: `T`) => \{ `current`: `T`  } |
| `useState` | \<S\>(`initialState`: `S` \| () => `S`) => [`S`, `any`] |
| `useTransition` | () => [`any`, `boolean`] |

#### Defined in

[server/ssr/react-analyze.ts:79](https://github.com/onzag/itemize/blob/59702dd5/server/ssr/react-analyze.ts#L79)

## Functions

### walkReactTree

▸ **walkReactTree**(`element`, `contextMap?`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `element` | `any` |
| `contextMap` | `Map`\<`any`, `any`\> |

#### Returns

`Promise`\<`void`\>

#### Defined in

[server/ssr/react-analyze.ts:161](https://github.com/onzag/itemize/blob/59702dd5/server/ssr/react-analyze.ts#L161)
