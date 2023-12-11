[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/JoinBuilder](../modules/database_JoinBuilder.md) / JoinRuleBuilder

# Class: JoinRuleBuilder

[database/JoinBuilder](../modules/database_JoinBuilder.md).JoinRuleBuilder

Represents the join rule basically the real LEFT JOIN, RIGHT  JOIN, INNER JOIN and whatnot

## Hierarchy

- [`ConditionalBuilder`](database_base.ConditionalBuilder.md)

  ↳ **`JoinRuleBuilder`**

## Table of contents

### Constructors

- [constructor](database_JoinBuilder.JoinRuleBuilder.md#constructor)

### Properties

- [type](database_JoinBuilder.JoinRuleBuilder.md#type)

### Methods

- [addBindingSource](database_JoinBuilder.JoinRuleBuilder.md#addbindingsource)
- [addBindingSources](database_JoinBuilder.JoinRuleBuilder.md#addbindingsources)
- [clear](database_JoinBuilder.JoinRuleBuilder.md#clear)
- [clearBindingSources](database_JoinBuilder.JoinRuleBuilder.md#clearbindingsources)
- [compile](database_JoinBuilder.JoinRuleBuilder.md#compile)
- [condition](database_JoinBuilder.JoinRuleBuilder.md#condition)
- [getBindings](database_JoinBuilder.JoinRuleBuilder.md#getbindings)
- [hasRulesAssigned](database_JoinBuilder.JoinRuleBuilder.md#hasrulesassigned)
- [on](database_JoinBuilder.JoinRuleBuilder.md#on)
- [onColumnEquals](database_JoinBuilder.JoinRuleBuilder.md#oncolumnequals)
- [orOn](database_JoinBuilder.JoinRuleBuilder.md#oron)
- [orOnColumnEquals](database_JoinBuilder.JoinRuleBuilder.md#oroncolumnequals)
- [popBindingSource](database_JoinBuilder.JoinRuleBuilder.md#popbindingsource)
- [shiftBindingSource](database_JoinBuilder.JoinRuleBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_JoinBuilder.JoinRuleBuilder.md#shiftbindingsources)
- [subcondition](database_JoinBuilder.JoinRuleBuilder.md#subcondition)
- [toSQL](database_JoinBuilder.JoinRuleBuilder.md#tosql)

## Constructors

### constructor

• **new JoinRuleBuilder**(`parent?`, `type`): [`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

Build a new conditional builder

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `parent` | [`ConditionalBuilder`](database_base.ConditionalBuilder.md) | `null` | the parent of it |
| `type` | `string` | `undefined` | the type, WHERE, ON, etc... it will be used |

#### Returns

[`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[constructor](database_base.ConditionalBuilder.md#constructor)

#### Defined in

[database/base.ts:248](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L248)

## Properties

### type

• **type**: `string`

The type of the condition, WHERE, ON, etc... whatever
you fancy

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[type](database_base.ConditionalBuilder.md#type)

#### Defined in

[database/base.ts:241](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L241)

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

[ConditionalBuilder](database_base.ConditionalBuilder.md).[addBindingSource](database_base.ConditionalBuilder.md#addbindingsource)

#### Defined in

[database/base.ts:69](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L69)

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

[ConditionalBuilder](database_base.ConditionalBuilder.md).[addBindingSources](database_base.ConditionalBuilder.md#addbindingsources)

#### Defined in

[database/base.ts:77](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L77)

___

### clear

▸ **clear**(): [`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

Clears the conditional builder

#### Returns

[`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

itself

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[clear](database_base.ConditionalBuilder.md#clear)

#### Defined in

[database/base.ts:352](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L352)

___

### clearBindingSources

▸ **clearBindingSources**(): `void`

Removes all binding sources

#### Returns

`void`

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[clearBindingSources](database_base.ConditionalBuilder.md#clearbindingsources)

#### Defined in

[database/base.ts:105](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L105)

___

### compile

▸ **compile**(): `string`

Compiles the condition

#### Returns

`string`

a string that represents the condition

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[compile](database_base.ConditionalBuilder.md#compile)

#### Defined in

[database/base.ts:362](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L362)

___

### condition

▸ **condition**(`gate`, `prefix`, `rule`, `bindings?`): [`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

Makes a new condition based on an expression or a subrule function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gate` | ``"AND"`` \| ``"OR"`` | the gate to use |
| `prefix` | `string` | an optional prefix to the rule, if none, make it null |
| `rule` | `string` \| [`QueryBuilder`](database_base.QueryBuilder.md) \| [`ConditionalBuilderFn`](../modules/database_base.md#conditionalbuilderfn)\<`any`\> | either the expression itself or a subcondition |
| `bindings?` | [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[] | the bindings for the expression, will not be used if using a subcondition |

#### Returns

[`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

itself

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[condition](database_base.ConditionalBuilder.md#condition)

#### Defined in

[database/base.ts:291](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L291)

___

### getBindings

▸ **getBindings**(): [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[]

Provides the bindings for the query in order that
should match the compilation

#### Returns

[`BasicBindingType`](../modules/database_base.md#basicbindingtype)[]

a list of basic bindings

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[getBindings](database_base.ConditionalBuilder.md#getbindings)

#### Defined in

[database/base.ts:168](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L168)

___

### hasRulesAssigned

▸ **hasRulesAssigned**(): `boolean`

Specifies whether the builder has conditions
whatsoever

#### Returns

`boolean`

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[hasRulesAssigned](database_base.ConditionalBuilder.md#hasrulesassigned)

#### Defined in

[database/base.ts:259](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L259)

___

### on

▸ **on**(`rule`, `bindings?`): [`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

Specifies a rule where the conditiuon applies this is an AND rule

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rule` | `string` \| [`ConditionalBuilderFn`](../modules/database_base.md#conditionalbuilderfn)\<[`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)\> | the rule to join with |
| `bindings?` | (`string` \| `number`)[] | the bindings for the expression |

#### Returns

[`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

itself

#### Defined in

[database/JoinBuilder.ts:27](https://github.com/onzag/itemize/blob/59702dd5/database/JoinBuilder.ts#L27)

___

### onColumnEquals

▸ **onColumnEquals**(`columnA`, `columnB`): [`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

Specify a join rule on equality between columns this is an AND rule

#### Parameters

| Name | Type |
| :------ | :------ |
| `columnA` | `string` |
| `columnB` | `string` |

#### Returns

[`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

itself

#### Defined in

[database/JoinBuilder.ts:47](https://github.com/onzag/itemize/blob/59702dd5/database/JoinBuilder.ts#L47)

___

### orOn

▸ **orOn**(`rule`, `bindings?`): [`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

Specifies a rule where the conditiuon applies this is an OR rule

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rule` | `string` \| [`ConditionalBuilderFn`](../modules/database_base.md#conditionalbuilderfn)\<[`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)\> | the rule to join with |
| `bindings?` | (`string` \| `number`)[] | the bindings for the expression |

#### Returns

[`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

itself

#### Defined in

[database/JoinBuilder.ts:37](https://github.com/onzag/itemize/blob/59702dd5/database/JoinBuilder.ts#L37)

___

### orOnColumnEquals

▸ **orOnColumnEquals**(`columnA`, `columnB`): [`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

Specify a join rule on equality between columns this is an OR rule

#### Parameters

| Name | Type |
| :------ | :------ |
| `columnA` | `string` |
| `columnB` | `string` |

#### Returns

[`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

itself

#### Defined in

[database/JoinBuilder.ts:57](https://github.com/onzag/itemize/blob/59702dd5/database/JoinBuilder.ts#L57)

___

### popBindingSource

▸ **popBindingSource**(): [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

#### Returns

[`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[popBindingSource](database_base.ConditionalBuilder.md#popbindingsource)

#### Defined in

[database/base.ts:112](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L112)

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

[ConditionalBuilder](database_base.ConditionalBuilder.md).[shiftBindingSource](database_base.ConditionalBuilder.md#shiftbindingsource)

#### Defined in

[database/base.ts:89](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L89)

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

[ConditionalBuilder](database_base.ConditionalBuilder.md).[shiftBindingSources](database_base.ConditionalBuilder.md#shiftbindingsources)

#### Defined in

[database/base.ts:98](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L98)

___

### subcondition

▸ **subcondition**(): [`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

Specifies how to subcondition this conditional builder

#### Returns

[`JoinRuleBuilder`](database_JoinBuilder.JoinRuleBuilder.md)

#### Overrides

[ConditionalBuilder](database_base.ConditionalBuilder.md).[subcondition](database_base.ConditionalBuilder.md#subcondition)

#### Defined in

[database/JoinBuilder.ts:16](https://github.com/onzag/itemize/blob/59702dd5/database/JoinBuilder.ts#L16)

___

### toSQL

▸ **toSQL**(): `IQueryBuilderSQLResult`

Returns the SQL result for usage in the query builder

#### Returns

`IQueryBuilderSQLResult`

a sql builder result with the bindings and the query itself

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[toSQL](database_base.ConditionalBuilder.md#tosql)

#### Defined in

[database/base.ts:129](https://github.com/onzag/itemize/blob/59702dd5/database/base.ts#L129)
