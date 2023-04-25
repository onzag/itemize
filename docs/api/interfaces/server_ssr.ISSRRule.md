[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/ssr](../modules/server_ssr.md) / ISSRRule

# Interface: ISSRRule

[server/ssr](../modules/server_ssr.md).ISSRRule

This is what a SSR rule is and specifies
how a page is to be rendered

## Table of contents

### Properties

- [forUser](server_ssr.ISSRRule.md#foruser)
- [language](server_ssr.ISSRRule.md#language)
- [languages](server_ssr.ISSRRule.md#languages)
- [mode](server_ssr.ISSRRule.md#mode)
- [noSSR](server_ssr.ISSRRule.md#nossr)
- [rtl](server_ssr.ISSRRule.md#rtl)

## Properties

### forUser

• **forUser**: `Object`

The user we are rendering for

#### Type declaration

| Name | Type |
| :------ | :------ |
| `customData` | `any` |
| `id` | `string` |
| `role` | `string` |
| `token` | `string` |

#### Defined in

[server/ssr/index.ts:35](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L35)

___

### language

• **language**: `string`

The language that the rule is rendering at

#### Defined in

[server/ssr/index.ts:21](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L21)

___

### languages

• **languages**: `string`[]

All the other available languages, this is used to build
the href langs

#### Defined in

[server/ssr/index.ts:26](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L26)

___

### mode

• **mode**: ``"production"`` \| ``"development"``

The mode the user is going with

#### Defined in

[server/ssr/index.ts:48](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L48)

___

### noSSR

• **noSSR**: `boolean`

Whether we will simply not use SSR at all

#### Defined in

[server/ssr/index.ts:44](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L44)

___

### rtl

• **rtl**: `boolean`

whether it is a right to left language so it
can be accounted for in the HTML

#### Defined in

[server/ssr/index.ts:31](https://github.com/onzag/itemize/blob/f2db74a5/server/ssr/index.ts#L31)
