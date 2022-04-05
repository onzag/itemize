[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/resolvers/triggers](../modules/server_resolvers_triggers.md) / ISearchTriggerArgType

# Interface: ISearchTriggerArgType

[server/resolvers/triggers](../modules/server_resolvers_triggers.md).ISearchTriggerArgType

## Table of contents

### Properties

- [appData](server_resolvers_triggers.ISearchTriggerArgType.md#appdata)
- [args](server_resolvers_triggers.ISearchTriggerArgType.md#args)
- [dictionary](server_resolvers_triggers.ISearchTriggerArgType.md#dictionary)
- [itemDefinition](server_resolvers_triggers.ISearchTriggerArgType.md#itemdefinition)
- [module](server_resolvers_triggers.ISearchTriggerArgType.md#module)
- [user](server_resolvers_triggers.ISearchTriggerArgType.md#user)
- [whereBuilder](server_resolvers_triggers.ISearchTriggerArgType.md#wherebuilder)

### Methods

- [forbid](server_resolvers_triggers.ISearchTriggerArgType.md#forbid)

## Properties

### appData

• **appData**: [`IAppDataType`](server.IAppDataType.md)

#### Defined in

[server/resolvers/triggers.ts:136](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/triggers.ts#L136)

___

### args

• **args**: [`IGQLArgs`](gql_querier.IGQLArgs.md)

#### Defined in

[server/resolvers/triggers.ts:139](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/triggers.ts#L139)

___

### dictionary

• **dictionary**: `string`

The dictionary that was obtained from the language

#### Defined in

[server/resolvers/triggers.ts:135](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/triggers.ts#L135)

___

### itemDefinition

• **itemDefinition**: [`default`](../classes/base_Root_Module_ItemDefinition.default.md)

#### Defined in

[server/resolvers/triggers.ts:137](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/triggers.ts#L137)

___

### module

• **module**: [`default`](../classes/base_Root_Module.default.md)

#### Defined in

[server/resolvers/triggers.ts:138](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/triggers.ts#L138)

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

[server/resolvers/triggers.ts:140](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/triggers.ts#L140)

___

### whereBuilder

• **whereBuilder**: `WhereBuilder`

#### Defined in

[server/resolvers/triggers.ts:145](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/triggers.ts#L145)

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

[server/resolvers/triggers.ts:146](https://github.com/onzag/itemize/blob/f2f29986/server/resolvers/triggers.ts#L146)
