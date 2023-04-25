[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/resolvers/triggers](../modules/server_resolvers_triggers.md) / ISearchTriggerArgType

# Interface: ISearchTriggerArgType

[server/resolvers/triggers](../modules/server_resolvers_triggers.md).ISearchTriggerArgType

## Table of contents

### Properties

- [appData](server_resolvers_triggers.ISearchTriggerArgType.md#appdata)
- [args](server_resolvers_triggers.ISearchTriggerArgType.md#args)
- [dictionary](server_resolvers_triggers.ISearchTriggerArgType.md#dictionary)
- [elasticQueryBuilder](server_resolvers_triggers.ISearchTriggerArgType.md#elasticquerybuilder)
- [itemDefinition](server_resolvers_triggers.ISearchTriggerArgType.md#itemdefinition)
- [language](server_resolvers_triggers.ISearchTriggerArgType.md#language)
- [module](server_resolvers_triggers.ISearchTriggerArgType.md#module)
- [user](server_resolvers_triggers.ISearchTriggerArgType.md#user)
- [usesElastic](server_resolvers_triggers.ISearchTriggerArgType.md#useselastic)
- [whereBuilder](server_resolvers_triggers.ISearchTriggerArgType.md#wherebuilder)

### Methods

- [forbid](server_resolvers_triggers.ISearchTriggerArgType.md#forbid)

## Properties

### appData

• **appData**: [`IAppDataType`](server.IAppDataType.md)

#### Defined in

[server/resolvers/triggers.ts:150](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L150)

___

### args

• **args**: [`IGQLArgs`](gql_querier.IGQLArgs.md)

#### Defined in

[server/resolvers/triggers.ts:153](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L153)

___

### dictionary

• **dictionary**: `string`

The dictionary that was obtained from the language

#### Defined in

[server/resolvers/triggers.ts:148](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L148)

___

### elasticQueryBuilder

• **elasticQueryBuilder**: [`ElasticQueryBuilder`](../classes/server_elastic.ElasticQueryBuilder.md)

#### Defined in

[server/resolvers/triggers.ts:161](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L161)

___

### itemDefinition

• **itemDefinition**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

#### Defined in

[server/resolvers/triggers.ts:151](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L151)

___

### language

• **language**: `string`

#### Defined in

[server/resolvers/triggers.ts:149](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L149)

___

### module

• **module**: [`default`](../classes/base_Root_Module.default.md)

#### Defined in

[server/resolvers/triggers.ts:152](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L152)

___

### user

• **user**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `customData` | `any` |
| `id` | `string` |
| `role` | `string` |

#### Defined in

[server/resolvers/triggers.ts:154](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L154)

___

### usesElastic

• **usesElastic**: `boolean`

#### Defined in

[server/resolvers/triggers.ts:159](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L159)

___

### whereBuilder

• **whereBuilder**: [`WhereBuilder`](../classes/database_WhereBuilder.WhereBuilder.md)

#### Defined in

[server/resolvers/triggers.ts:160](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L160)

## Methods

### forbid

▸ **forbid**(`message`, `customCode?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `customCode?` | `string` |

#### Returns

`void`

#### Defined in

[server/resolvers/triggers.ts:162](https://github.com/onzag/itemize/blob/f2db74a5/server/resolvers/triggers.ts#L162)
