[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/resolvers/triggers](../modules/server_resolvers_triggers.md) / ISearchTriggerArgType

# Interface: ISearchTriggerArgType

[server/resolvers/triggers](../modules/server_resolvers_triggers.md).ISearchTriggerArgType

## Table of contents

### Properties

- [action](server_resolvers_triggers.ISearchTriggerArgType.md#action)
- [appData](server_resolvers_triggers.ISearchTriggerArgType.md#appdata)
- [args](server_resolvers_triggers.ISearchTriggerArgType.md#args)
- [dictionary](server_resolvers_triggers.ISearchTriggerArgType.md#dictionary)
- [elasticQueryBuilder](server_resolvers_triggers.ISearchTriggerArgType.md#elasticquerybuilder)
- [elasticResponse](server_resolvers_triggers.ISearchTriggerArgType.md#elasticresponse)
- [forbid](server_resolvers_triggers.ISearchTriggerArgType.md#forbid)
- [itemDefinition](server_resolvers_triggers.ISearchTriggerArgType.md#itemdefinition)
- [language](server_resolvers_triggers.ISearchTriggerArgType.md#language)
- [module](server_resolvers_triggers.ISearchTriggerArgType.md#module)
- [records](server_resolvers_triggers.ISearchTriggerArgType.md#records)
- [results](server_resolvers_triggers.ISearchTriggerArgType.md#results)
- [setSearchMetadata](server_resolvers_triggers.ISearchTriggerArgType.md#setsearchmetadata)
- [sqlResponse](server_resolvers_triggers.ISearchTriggerArgType.md#sqlresponse)
- [traditional](server_resolvers_triggers.ISearchTriggerArgType.md#traditional)
- [user](server_resolvers_triggers.ISearchTriggerArgType.md#user)
- [usesElastic](server_resolvers_triggers.ISearchTriggerArgType.md#useselastic)
- [whereBuilder](server_resolvers_triggers.ISearchTriggerArgType.md#wherebuilder)

## Properties

### action

• **action**: [`SearchTriggerActions`](../enums/server_resolvers_triggers.SearchTriggerActions.md)

The action being ran

#### Defined in

[server/resolvers/triggers.ts:164](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L164)

___

### appData

• **appData**: [`IAppDataType`](server.IAppDataType.md)

#### Defined in

[server/resolvers/triggers.ts:170](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L170)

___

### args

• **args**: [`IRQArgs`](rq_querier.IRQArgs.md)

#### Defined in

[server/resolvers/triggers.ts:173](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L173)

___

### dictionary

• **dictionary**: `string`

The dictionary that was obtained from the language

#### Defined in

[server/resolvers/triggers.ts:168](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L168)

___

### elasticQueryBuilder

• **elasticQueryBuilder**: [`ElasticQueryBuilder`](../classes/server_elastic.ElasticQueryBuilder.md)

#### Defined in

[server/resolvers/triggers.ts:181](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L181)

___

### elasticResponse

• **elasticResponse**: `SearchResponse`\<`unknown`, `Record`\<`string`, `AggregationsAggregate`\>\>

#### Defined in

[server/resolvers/triggers.ts:183](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L183)

___

### forbid

• **forbid**: (`message`: `string`, `customCode?`: `string`, `data?`: `any`) => `void`

#### Type declaration

▸ (`message`, `customCode?`, `data?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `string` |
| `customCode?` | `string` |
| `data?` | `any` |

##### Returns

`void`

#### Defined in

[server/resolvers/triggers.ts:187](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L187)

___

### itemDefinition

• **itemDefinition**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

#### Defined in

[server/resolvers/triggers.ts:171](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L171)

___

### language

• **language**: `string`

#### Defined in

[server/resolvers/triggers.ts:169](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L169)

___

### module

• **module**: [`default`](../classes/base_Root_Module.default.md)

#### Defined in

[server/resolvers/triggers.ts:172](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L172)

___

### records

• **records**: [`IRQSearchRecordsContainer`](rq_querier.IRQSearchRecordsContainer.md)

#### Defined in

[server/resolvers/triggers.ts:185](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L185)

___

### results

• **results**: [`IRQSearchResultsContainer`](rq_querier.IRQSearchResultsContainer.md)

#### Defined in

[server/resolvers/triggers.ts:186](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L186)

___

### setSearchMetadata

• **setSearchMetadata**: (`metadata`: `string`) => `void`

#### Type declaration

▸ (`metadata`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `metadata` | `string` |

##### Returns

`void`

#### Defined in

[server/resolvers/triggers.ts:188](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L188)

___

### sqlResponse

• **sqlResponse**: [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)[]

#### Defined in

[server/resolvers/triggers.ts:182](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L182)

___

### traditional

• **traditional**: `boolean`

#### Defined in

[server/resolvers/triggers.ts:184](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L184)

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

[server/resolvers/triggers.ts:174](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L174)

___

### usesElastic

• **usesElastic**: `boolean`

#### Defined in

[server/resolvers/triggers.ts:179](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L179)

___

### whereBuilder

• **whereBuilder**: [`WhereBuilder`](../classes/database_WhereBuilder.WhereBuilder.md)

#### Defined in

[server/resolvers/triggers.ts:180](https://github.com/onzag/itemize/blob/59702dd5/server/resolvers/triggers.ts#L180)
