[@onzag/itemize](../README.md) / [Modules](../modules.md) / base/Root/Module/gql

# Module: base/Root/Module/gql

Contains all the graphql functions that are used and generated for and within
the module, refer to this file for the graphql generation side of things

## Table of contents

### Functions

- [getGQLFieldsDefinitionForModule](base_Root_Module_gql.md#getgqlfieldsdefinitionformodule)
- [getGQLMutationFieldsForModule](base_Root_Module_gql.md#getgqlmutationfieldsformodule)
- [getGQLQueryFieldsForModule](base_Root_Module_gql.md#getgqlqueryfieldsformodule)
- [getGQLQueryOutputForModule](base_Root_Module_gql.md#getgqlqueryoutputformodule)
- [getGQLTypeForModule](base_Root_Module_gql.md#getgqltypeformodule)

## Functions

### getGQLFieldsDefinitionForModule

▸ **getGQLFieldsDefinitionForModule**(`mod`, `options`): [`IGQLFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLFieldsDefinitionType.md)

Provides the fields definition for the module itself, and for all
items inside the module which extend these fields, modules by default
contain called base properties, which every element has

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |
| `options` | `Object` | - |
| `options.excludeBase` | `boolean` | whether to exclude the base properties, like created_at, etc.. |
| `options.onlyTextFilters` | `boolean` | - |
| `options.optionalForm` | `boolean` | makes all the parameters optional, that is nullable |
| `options.propertiesAsInput` | `boolean` | if the properties should be in input form |
| `options.retrievalMode` | `boolean` | whether it is in retrieval mode |

#### Returns

[`IGQLFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLFieldsDefinitionType.md)

all the fields definition for the module

#### Defined in

[base/Root/Module/gql.ts:40](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/gql.ts#L40)

___

### getGQLMutationFieldsForModule

▸ **getGQLMutationFieldsForModule**(`mod`, `resolvers?`): [`IGQLQueryFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLQueryFieldsDefinitionType.md)

Because modules have no mutations, it provides all the mutation
fields of the item definitions the module contains

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |
| `resolvers?` | [`IGraphQLResolversType`](../interfaces/base_Root_gql.IGraphQLResolversType.md) | the resolvers that will be used to resolve the query, these are the generic resolvers that are consumed |

#### Returns

[`IGQLQueryFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLQueryFieldsDefinitionType.md)

a query fields definition type for all the sub definitions

#### Defined in

[base/Root/Module/gql.ts:335](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/gql.ts#L335)

___

### getGQLQueryFieldsForModule

▸ **getGQLQueryFieldsForModule**(`mod`, `resolvers?`): [`IGQLQueryFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLQueryFieldsDefinitionType.md)

Provides the query fields in order to create the query
for a given module, the only query fields you have access to
for modules are search, modules do not support id searches
because they only represent items, but would allow you to perform
a whole level search into all the items it contains

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |
| `resolvers?` | [`IGraphQLResolversType`](../interfaces/base_Root_gql.IGraphQLResolversType.md) | the resolvers that will be used to resolve the query, these are the generic resolvers that are consumed |

#### Returns

[`IGQLQueryFieldsDefinitionType`](../interfaces/base_Root_gql.IGQLQueryFieldsDefinitionType.md)

the fields for the main query object to do GET_LIST and SEARCH

#### Defined in

[base/Root/Module/gql.ts:199](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/gql.ts#L199)

___

### getGQLQueryOutputForModule

▸ **getGQLQueryOutputForModule**(`mod`): `GraphQLObjectType`

Provides the object that represents this module data in
its not flattened form with external properties available

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |

#### Returns

`GraphQLObjectType`

the output type for the module object

#### Defined in

[base/Root/Module/gql.ts:118](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/gql.ts#L118)

___

### getGQLTypeForModule

▸ **getGQLTypeForModule**(`mod`): `GraphQLObjectType`

Provides the type for the module
that represents this module data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mod` | [`default`](../classes/base_Root_Module.default.md) | the module in question |

#### Returns

`GraphQLObjectType`

the module type this module refers to (it is cached)

#### Defined in

[base/Root/Module/gql.ts:85](https://github.com/onzag/itemize/blob/f2db74a5/base/Root/Module/gql.ts#L85)
