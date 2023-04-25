[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/util/NoSSR

# Module: client/components/util/NoSSR

Allows to disable SSR to a given section of code, only takes into effect
if the server detects SSR is being used otherwise will render normally

## Table of contents

### Functions

- [default](client_components_util_NoSSR.md#default)

## Functions

### default

▸ **default**(`props`): `Element`

This SSR disabler is clever, if you are in a non-ssr context it will render
immediately, however if you are in a SSR enabled context then it will use a double
pass, this will ensure things are in sync

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `INoSSRProps` | the props |

#### Returns

`Element`

#### Defined in

[client/components/util/NoSSR.tsx:58](https://github.com/onzag/itemize/blob/f2db74a5/client/components/util/NoSSR.tsx#L58)
