[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/base](../modules/database_base.md) / ConditionalBuilder

# Class: ConditionalBuilder

[database/base](../modules/database_base.md).ConditionalBuilder

The conditional builder class is based on the query builder
and its an utility to create conditional based queries like the
where query, joins queries, etc... whatever is using boolean
conditions

## Hierarchy

- [`QueryBuilder`](database_base.QueryBuilder.md)

  ↳ **`ConditionalBuilder`**

  ↳↳ [`HavingBuilder`](database_HavingBuilder.HavingBuilder.md)

  ↳↳ [`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

  ↳↳ [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

## Table of contents

### Constructors

- [constructor](database_base.ConditionalBuilder.md#constructor)

### Properties

- [conditions](database_base.ConditionalBuilder.md#conditions)
- [parent](database_base.ConditionalBuilder.md#parent)
- [type](database_base.ConditionalBuilder.md#type)

### Methods

- [addBindingSource](database_base.ConditionalBuilder.md#addbindingsource)
- [addBindingSources](database_base.ConditionalBuilder.md#addbindingsources)
- [clear](database_base.ConditionalBuilder.md#clear)
- [clearBindingSources](database_base.ConditionalBuilder.md#clearbindingsources)
- [compile](database_base.ConditionalBuilder.md#compile)
- [condition](database_base.ConditionalBuilder.md#condition)
- [getBindings](database_base.ConditionalBuilder.md#getbindings)
- [hasRulesAssigned](database_base.ConditionalBuilder.md#hasrulesassigned)
- [popBindingSource](database_base.ConditionalBuilder.md#popbindingsource)
- [shiftBindingSource](database_base.ConditionalBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_base.ConditionalBuilder.md#shiftbindingsources)
- [subcondition](database_base.ConditionalBuilder.md#subcondition)
- [toSQL](database_base.ConditionalBuilder.md#tosql)

## Constructors

### constructor

• **new ConditionalBuilder**(`parent?`, `type`)

Build a new conditional builder

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `parent` | [`ConditionalBuilder`](database_base.ConditionalBuilder.md) | `null` | the parent of it |
| `type` | `string` | `undefined` | the type, WHERE, ON, etc... it will be used |

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[constructor](database_base.QueryBuilder.md#constructor)

#### Defined in

[database/base.ts:248](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L248)

## Properties

### conditions

• `Private` **conditions**: [`IConditionalBuilderConditionType`](../interfaces/database_base.IConditionalBuilderConditionType.md)[] = `[]`

This is the list of conditions, it represents either a expression
or a subcondition with a gate included, and or or

#### Defined in

[database/base.ts:231](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L231)

___

### parent

• `Private` **parent**: [`ConditionalBuilder`](database_base.ConditionalBuilder.md)

The parent of the condition, they might compile different
since these conditions nest

#### Defined in

[database/base.ts:236](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L236)

___

### type

• **type**: `string`

The type of the condition, WHERE, ON, etc... whatever
you fancy

#### Defined in

[database/base.ts:241](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L241)

## Methods

### addBindingSource

▸ **addBindingSource**(`value`): `void`

Adds a binding source to the binding source list in order

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype) | the binding source to add |

#### Returns

`void`

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[addBindingSource](database_base.QueryBuilder.md#addbindingsource)

#### Defined in

[database/base.ts:69](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L69)

___

### addBindingSources

▸ **addBindingSources**(`values`): `void`

Adds many binding sources to the bindings sources list

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)[] | the binding sources to add |

#### Returns

`void`

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[addBindingSources](database_base.QueryBuilder.md#addbindingsources)

#### Defined in

[database/base.ts:77](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L77)

___

### clear

▸ **clear**(): [`ConditionalBuilder`](database_base.ConditionalBuilder.md)

Clears the conditional builder

#### Returns

[`ConditionalBuilder`](database_base.ConditionalBuilder.md)

itself

#### Defined in

[database/base.ts:352](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L352)

___

### clearBindingSources

▸ **clearBindingSources**(): `void`

Removes all binding sources

#### Returns

`void`

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[clearBindingSources](database_base.QueryBuilder.md#clearbindingsources)

#### Defined in

[database/base.ts:105](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L105)

___

### compile

▸ **compile**(): `string`

Compiles the condition

#### Returns

`string`

a string that represents the condition

#### Overrides

[QueryBuilder](database_base.QueryBuilder.md).[compile](database_base.QueryBuilder.md#compile)

#### Defined in

[database/base.ts:362](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L362)

___

### condition

▸ **condition**(`gate`, `prefix`, `rule`, `bindings?`): [`ConditionalBuilder`](database_base.ConditionalBuilder.md)

Makes a new condition based on an expression or a subrule function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gate` | ``"AND"`` \| ``"OR"`` | the gate to use |
| `prefix` | `string` | an optional prefix to the rule, if none, make it null |
| `rule` | `string` \| [`QueryBuilder`](database_base.QueryBuilder.md) \| [`ConditionalBuilderFn`](../modules/database_base.md#conditionalbuilderfn)<`any`\> | either the expression itself or a subcondition |
| `bindings?` | [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[] | the bindings for the expression, will not be used if using a subcondition |

#### Returns

[`ConditionalBuilder`](database_base.ConditionalBuilder.md)

itself

#### Defined in

[database/base.ts:291](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L291)

___

### getBindings

▸ **getBindings**(): [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[]

Provides the bindings for the query in order that
should match the compilation

#### Returns

[`BasicBindingType`](../modules/database_base.md#basicbindingtype)[]

a list of basic bindings

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[getBindings](database_base.QueryBuilder.md#getbindings)

#### Defined in

[database/base.ts:168](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L168)

___

### hasRulesAssigned

▸ **hasRulesAssigned**(): `boolean`

Specifies whether the builder has conditions
whatsoever

#### Returns

`boolean`

#### Defined in

[database/base.ts:259](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L259)

___

### popBindingSource

▸ **popBindingSource**(): [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

#### Returns

[`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[popBindingSource](database_base.QueryBuilder.md#popbindingsource)

#### Defined in

[database/base.ts:112](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L112)

___

### shiftBindingSource

▸ **shiftBindingSource**(`value`): `void`

Adds a binding source at the start of the bindings source
list

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype) | the binding source to add |

#### Returns

`void`

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[shiftBindingSource](database_base.QueryBuilder.md#shiftbindingsource)

#### Defined in

[database/base.ts:89](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L89)

___

### shiftBindingSources

▸ **shiftBindingSources**(`values`): `void`

Adds many binding sources at the start of the bindings source
list

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)[] | the binding sources to add |

#### Returns

`void`

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[shiftBindingSources](database_base.QueryBuilder.md#shiftbindingsources)

#### Defined in

[database/base.ts:98](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L98)

___

### subcondition

▸ **subcondition**(): [`ConditionalBuilder`](database_base.ConditionalBuilder.md)

It should provide a new conditional builder that should
be a child of this

**`override`**

#### Returns

[`ConditionalBuilder`](database_base.ConditionalBuilder.md)

a new builder for itself to make a child of

#### Defined in

[database/base.ts:277](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L277)

___

### toSQL

▸ **toSQL**(): `IQueryBuilderSQLResult`

Returns the SQL result for usage in the query builder

#### Returns

`IQueryBuilderSQLResult`

a sql builder result with the bindings and the query itself

#### Inherited from

[QueryBuilder](database_base.QueryBuilder.md).[toSQL](database_base.QueryBuilder.md#tosql)

#### Defined in

[database/base.ts:129](https://github.com/onzag/itemize/blob/a24376ed/database/base.ts#L129)
