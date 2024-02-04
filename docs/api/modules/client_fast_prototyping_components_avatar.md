[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/fast-prototyping/components/avatar

# Module: client/fast-prototyping/components/avatar

The avatar allows to show an user avatar in a nice way using the mui avatar

## Table of contents

### Classes

- [Avatar](../classes/client_fast_prototyping_components_avatar.Avatar.md)

### Functions

- [AvatarRenderer](client_fast_prototyping_components_avatar.md#avatarrenderer)

## Functions

### AvatarRenderer

▸ **AvatarRenderer**(`props`): `Element`

A fully custom renderer for the avatar component for usage with file types
so it can be passed as a custom renderer via the entry, eg...
<Entry id="profile_picture" renderer={AvatarRenderer}/> rather
than using the default

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `IAvatarRendererProps` |

#### Returns

`Element`

#### Defined in

[client/fast-prototyping/components/avatar.tsx:464](https://github.com/onzag/itemize/blob/73e0c39e/client/fast-prototyping/components/avatar.tsx#L464)
