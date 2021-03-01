[](../README.md) / [Exports](../modules.md) / [client/fast-prototyping/components/navbar/menu](../modules/client_fast_prototyping_components_navbar_menu.md) / IMenuEntry

# Interface: IMenuEntry

[client/fast-prototyping/components/navbar/menu](../modules/client_fast_prototyping_components_navbar_menu.md).IMenuEntry

The menu entry itself that specifies
how a menu is to be built

## Table of contents

### Properties

- [badgeContent](client_fast_prototyping_components_navbar_menu.imenuentry.md#badgecontent)
- [i18nProps](client_fast_prototyping_components_navbar_menu.imenuentry.md#i18nprops)
- [icon](client_fast_prototyping_components_navbar_menu.imenuentry.md#icon)
- [idef](client_fast_prototyping_components_navbar_menu.imenuentry.md#idef)
- [module](client_fast_prototyping_components_navbar_menu.imenuentry.md#module)
- [path](client_fast_prototyping_components_navbar_menu.imenuentry.md#path)
- [role](client_fast_prototyping_components_navbar_menu.imenuentry.md#role)
- [roles](client_fast_prototyping_components_navbar_menu.imenuentry.md#roles)

## Properties

### badgeContent

• `Optional` **badgeContent**: ReactNode

A badge to display

Defined in: [client/fast-prototyping/components/navbar/menu.tsx:50](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/navbar/menu.tsx#L50)

___

### i18nProps

• **i18nProps**: [*II18nReadProps*](client_components_localization_i18nread.ii18nreadprops.md)

The arguments to pass to the i18nRead element in order to display some text

Defined in: [client/fast-prototyping/components/navbar/menu.tsx:63](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/navbar/menu.tsx#L63)

___

### icon

• **icon**: ReactNode

The icon to use

Defined in: [client/fast-prototyping/components/navbar/menu.tsx:46](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/navbar/menu.tsx#L46)

___

### idef

• `Optional` **idef**: *string*

The item definition to load in the item definition provider (optional)
will need the module specified if this one specified

Defined in: [client/fast-prototyping/components/navbar/menu.tsx:59](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/navbar/menu.tsx#L59)

___

### module

• `Optional` **module**: *string*

The module to load in the module provider (optional)

Defined in: [client/fast-prototyping/components/navbar/menu.tsx:54](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/navbar/menu.tsx#L54)

___

### path

• **path**: *string*

The path it will take to, aka, the navigation
location

Defined in: [client/fast-prototyping/components/navbar/menu.tsx:42](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/navbar/menu.tsx#L42)

___

### role

• `Optional` **role**: *string*

The role that has access to this

Defined in: [client/fast-prototyping/components/navbar/menu.tsx:67](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/navbar/menu.tsx#L67)

___

### roles

• `Optional` **roles**: *string*[]

Many roles, a list of roles, role (Single) has priority over this

Defined in: [client/fast-prototyping/components/navbar/menu.tsx:71](https://github.com/onzag/itemize/blob/28218320/client/fast-prototyping/components/navbar/menu.tsx#L71)
