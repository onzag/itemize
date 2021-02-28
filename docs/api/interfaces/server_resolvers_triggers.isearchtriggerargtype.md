[](../README.md) / [Exports](../modules.md) / [server/resolvers/triggers](../modules/server_resolvers_triggers.md) / ISearchTriggerArgType

# Interface: ISearchTriggerArgType

[server/resolvers/triggers](../modules/server_resolvers_triggers.md).ISearchTriggerArgType

## Table of contents

### Properties

- [appData](server_resolvers_triggers.isearchtriggerargtype.md#appdata)
- [args](server_resolvers_triggers.isearchtriggerargtype.md#args)
- [forbid](server_resolvers_triggers.isearchtriggerargtype.md#forbid)
- [itemDefinition](server_resolvers_triggers.isearchtriggerargtype.md#itemdefinition)
- [module](server_resolvers_triggers.isearchtriggerargtype.md#module)
- [user](server_resolvers_triggers.isearchtriggerargtype.md#user)
- [whereBuilder](server_resolvers_triggers.isearchtriggerargtype.md#wherebuilder)

## Properties

### appData

• **appData**: [*IAppDataType*](server.iappdatatype.md)

Defined in: [server/resolvers/triggers.ts:77](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L77)

___

### args

• **args**: [*IGQLArgs*](gql_querier.igqlargs.md)

Defined in: [server/resolvers/triggers.ts:80](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L80)

___

### forbid

• **forbid**: (`message`: *string*, `customCode?`: *string*) => *void*

#### Type declaration:

▸ (`message`: *string*, `customCode?`: *string*): *void*

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`customCode?` | *string* |

**Returns:** *void*

Defined in: [server/resolvers/triggers.ts:87](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L87)

Defined in: [server/resolvers/triggers.ts:87](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L87)

___

### itemDefinition

• **itemDefinition**: [*default*](../classes/base_root_module_itemdefinition.default.md)

Defined in: [server/resolvers/triggers.ts:78](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L78)

___

### module

• **module**: [*default*](../classes/base_root_module.default.md)

Defined in: [server/resolvers/triggers.ts:79](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L79)

___

### user

• **user**: *object*

#### Type declaration:

Name | Type |
:------ | :------ |
`customData` | *any* |
`id` | *string* |
`role` | *string* |

Defined in: [server/resolvers/triggers.ts:81](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L81)

___

### whereBuilder

• **whereBuilder**: [*WhereBuilder*](../classes/database_wherebuilder.wherebuilder.md)

Defined in: [server/resolvers/triggers.ts:86](https://github.com/onzag/itemize/blob/11a98dec/server/resolvers/triggers.ts#L86)
