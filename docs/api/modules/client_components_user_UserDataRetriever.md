[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/user/UserDataRetriever

# Module: client/components/user/UserDataRetriever

Does the very simple job of retrieving the current user data

## Table of contents

### Functions

- [default](client_components_user_UserDataRetriever.md#default)
- [useUserDataRetriever](client_components_user_UserDataRetriever.md#useuserdataretriever)

## Functions

### default

▸ **default**(`props`): `Element`

Provides the current user data, aka id and role, of the logged in user,
id might be null, and role can be the GUEST_METAROLE in such case

If you need more information about the user you should use the item definition
provider under this data retriever, aka ModuleProvider for users, ItemProvider for
user, forId the id used here; then you might read things like email and username

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `IUserDataRetrieverProps` | the data retriver props |

#### Returns

`Element`

a react element

#### Defined in

[client/components/user/UserDataRetriever.tsx:33](https://github.com/onzag/itemize/blob/a24376ed/client/components/user/UserDataRetriever.tsx#L33)

___

### useUserDataRetriever

▸ **useUserDataRetriever**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `role` | `string` |

#### Defined in

[client/components/user/UserDataRetriever.tsx:48](https://github.com/onzag/itemize/blob/a24376ed/client/components/user/UserDataRetriever.tsx#L48)
