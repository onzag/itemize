[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/navigation/Link

# Module: client/components/navigation/Link

Provides the Link class which allows for linking in the
application and doing redirects

## Table of contents

### Namespaces

- [default](client_components_navigation_Link.default.md)

### Functions

- [default](client_components_navigation_Link.md#default)

## Functions

### default

▸ **default**(`props`): `ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

Same as the router link but actually takes
care of the current language set and uses such
language if the location is absolute

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `ICustomLinkProps` & `RefAttributes`\<`HTMLAnchorElement`\> | the LinkProps |

#### Returns

`ReactElement`\<`any`, `string` \| `JSXElementConstructor`\<`any`\>\>

#### Defined in

node_modules/@types/react/index.d.ts:354
