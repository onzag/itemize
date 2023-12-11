[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/components/util/Fragment](../modules/client_components_util_Fragment.md) / IFragmentArg

# Interface: IFragmentArg

[client/components/util/Fragment](../modules/client_components_util_Fragment.md).IFragmentArg

Argument that the fragment provides

## Table of contents

### Properties

- [canEdit](client_components_util_Fragment.IFragmentArg.md#canedit)
- [dismissSaveError](client_components_util_Fragment.IFragmentArg.md#dismisssaveerror)
- [dismissSaved](client_components_util_Fragment.IFragmentArg.md#dismisssaved)
- [download](client_components_util_Fragment.IFragmentArg.md#download)
- [editing](client_components_util_Fragment.IFragmentArg.md#editing)
- [properties](client_components_util_Fragment.IFragmentArg.md#properties)
- [save](client_components_util_Fragment.IFragmentArg.md#save)
- [saveError](client_components_util_Fragment.IFragmentArg.md#saveerror)
- [saved](client_components_util_Fragment.IFragmentArg.md#saved)
- [upload](client_components_util_Fragment.IFragmentArg.md#upload)

## Properties

### canEdit

• **canEdit**: `boolean`

Whether it is allowed to edit based on its role

#### Defined in

[client/components/util/Fragment.tsx:32](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/Fragment.tsx#L32)

___

### dismissSaveError

• **dismissSaveError**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[client/components/util/Fragment.tsx:54](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/Fragment.tsx#L54)

___

### dismissSaved

• **dismissSaved**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[client/components/util/Fragment.tsx:53](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/Fragment.tsx#L53)

___

### download

• **download**: () => `void`

#### Type declaration

▸ (): `void`

download the current fragment state

##### Returns

`void`

#### Defined in

[client/components/util/Fragment.tsx:36](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/Fragment.tsx#L36)

___

### editing

• **editing**: `boolean`

Whether it is currently editing

#### Defined in

[client/components/util/Fragment.tsx:28](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/Fragment.tsx#L28)

___

### properties

• **properties**: `Object`

the nodes for the properties of the fragment

#### Index signature

▪ [id: `string`]: `React.ReactNode`

#### Defined in

[client/components/util/Fragment.tsx:40](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/Fragment.tsx#L40)

___

### save

• **save**: () => `void`

#### Type declaration

▸ (): `void`

save the current state

##### Returns

`void`

#### Defined in

[client/components/util/Fragment.tsx:50](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/Fragment.tsx#L50)

___

### saveError

• **saveError**: [`EndpointErrorType`](../modules/base_errors.md#endpointerrortype)

#### Defined in

[client/components/util/Fragment.tsx:51](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/Fragment.tsx#L51)

___

### saved

• **saved**: `boolean`

#### Defined in

[client/components/util/Fragment.tsx:52](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/Fragment.tsx#L52)

___

### upload

• **upload**: () => `void`

#### Type declaration

▸ (): `void`

upload the file

##### Returns

`void`

#### Defined in

[client/components/util/Fragment.tsx:46](https://github.com/onzag/itemize/blob/59702dd5/client/components/util/Fragment.tsx#L46)
