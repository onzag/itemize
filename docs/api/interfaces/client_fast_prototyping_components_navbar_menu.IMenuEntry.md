[@onzag/itemize](../README.md) / [Modules](../modules.md) / [client/fast-prototyping/components/navbar/menu](../modules/client_fast_prototyping_components_navbar_menu.md) / IMenuEntry

# Interface: IMenuEntry

[client/fast-prototyping/components/navbar/menu](../modules/client_fast_prototyping_components_navbar_menu.md).IMenuEntry

The menu entry itself that specifies
how a menu is to be built

## Table of contents

### Properties

- [badgeContent](client_fast_prototyping_components_navbar_menu.IMenuEntry.md#badgecontent)
- [i18nProps](client_fast_prototyping_components_navbar_menu.IMenuEntry.md#i18nprops)
- [icon](client_fast_prototyping_components_navbar_menu.IMenuEntry.md#icon)
- [idef](client_fast_prototyping_components_navbar_menu.IMenuEntry.md#idef)
- [module](client_fast_prototyping_components_navbar_menu.IMenuEntry.md#module)
- [path](client_fast_prototyping_components_navbar_menu.IMenuEntry.md#path)
- [role](client_fast_prototyping_components_navbar_menu.IMenuEntry.md#role)
- [roles](client_fast_prototyping_components_navbar_menu.IMenuEntry.md#roles)
- [wrapperKey](client_fast_prototyping_components_navbar_menu.IMenuEntry.md#wrapperkey)

### Methods

- [wrapper](client_fast_prototyping_components_navbar_menu.IMenuEntry.md#wrapper)

## Properties

### badgeContent

• `Optional` **badgeContent**: `ReactNode`

A badge to display

#### Defined in

[client/fast-prototyping/components/navbar/menu.tsx:57](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/navbar/menu.tsx#L57)

___

### i18nProps

• **i18nProps**: [`II18nReadProps`](client_components_localization_I18nRead.II18nReadProps.md)

The arguments to pass to the i18nRead element in order to display some text

#### Defined in

[client/fast-prototyping/components/navbar/menu.tsx:70](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/navbar/menu.tsx#L70)

___

### icon

• **icon**: `ReactNode`

The icon to use

#### Defined in

[client/fast-prototyping/components/navbar/menu.tsx:53](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/navbar/menu.tsx#L53)

___

### idef

• `Optional` **idef**: `string`

The item definition to load in the item definition provider (optional)
will need the module specified if this one specified

#### Defined in

[client/fast-prototyping/components/navbar/menu.tsx:66](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/navbar/menu.tsx#L66)

___

### module

• `Optional` **module**: `string`

The module to load in the module provider (optional)

#### Defined in

[client/fast-prototyping/components/navbar/menu.tsx:61](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/navbar/menu.tsx#L61)

___

### path

• **path**: `string` \| `PathRetrieverFn`

The path it will take to, aka, the navigation
location

#### Defined in

[client/fast-prototyping/components/navbar/menu.tsx:49](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/navbar/menu.tsx#L49)

___

### role

• `Optional` **role**: `string`

The role that has access to this

#### Defined in

[client/fast-prototyping/components/navbar/menu.tsx:74](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/navbar/menu.tsx#L74)

___

### roles

• `Optional` **roles**: `string`[]

Many roles, a list of roles, role (Single) has priority over this

#### Defined in

[client/fast-prototyping/components/navbar/menu.tsx:78](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/navbar/menu.tsx#L78)

___

### wrapperKey

• `Optional` **wrapperKey**: `string`

A wrapper key to use, normally it'd use the path as the wrapper key
but if path is a function you rather specify this

#### Defined in

[client/fast-prototyping/components/navbar/menu.tsx:87](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/navbar/menu.tsx#L87)

## Methods

### wrapper

▸ `Optional` **wrapper**(`entry`): `ReactNode`

A wrapper to wrap the content

#### Parameters

| Name | Type |
| :------ | :------ |
| `entry` | `ReactNode` |

#### Returns

`ReactNode`

#### Defined in

[client/fast-prototyping/components/navbar/menu.tsx:82](https://github.com/onzag/itemize/blob/a24376ed/client/fast-prototyping/components/navbar/menu.tsx#L82)
