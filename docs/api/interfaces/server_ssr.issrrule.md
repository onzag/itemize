[](../README.md) / [Exports](../modules.md) / [server/ssr](../modules/server_ssr.md) / ISSRRule

# Interface: ISSRRule

[server/ssr](../modules/server_ssr.md).ISSRRule

This is what a SSR rule is and specifies
how a page is to be rendered

## Table of contents

### Properties

- [forUser](server_ssr.issrrule.md#foruser)
- [language](server_ssr.issrrule.md#language)
- [languages](server_ssr.issrrule.md#languages)
- [noSSR](server_ssr.issrrule.md#nossr)
- [rtl](server_ssr.issrrule.md#rtl)

## Properties

### forUser

• **forUser**: *object*

The user we are rendering for

#### Type declaration:

Name | Type |
:------ | :------ |
`customData` | *any* |
`id` | *string* |
`role` | *string* |
`token` | *string* |

Defined in: [server/ssr/index.ts:29](https://github.com/onzag/itemize/blob/5fcde7cf/server/ssr/index.ts#L29)

___

### language

• **language**: *string*

The language that the rule is rendering at

Defined in: [server/ssr/index.ts:15](https://github.com/onzag/itemize/blob/5fcde7cf/server/ssr/index.ts#L15)

___

### languages

• **languages**: *string*[]

All the other available languages, this is used to build
the href langs

Defined in: [server/ssr/index.ts:20](https://github.com/onzag/itemize/blob/5fcde7cf/server/ssr/index.ts#L20)

___

### noSSR

• **noSSR**: *boolean*

Whether we will simply not use SSR at all

Defined in: [server/ssr/index.ts:38](https://github.com/onzag/itemize/blob/5fcde7cf/server/ssr/index.ts#L38)

___

### rtl

• **rtl**: *boolean*

whether it is a right to left language so it
can be accounted for in the HTML

Defined in: [server/ssr/index.ts:25](https://github.com/onzag/itemize/blob/5fcde7cf/server/ssr/index.ts#L25)
