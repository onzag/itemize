[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/HavingBuilder](../modules/database_HavingBuilder.md) / HavingBuilder

# Class: HavingBuilder

[database/HavingBuilder](../modules/database_HavingBuilder.md).HavingBuilder

The having builder that allows to create HAVING statments

## Hierarchy

- [`ConditionalBuilder`](database_base.ConditionalBuilder.md)

  ↳ **`HavingBuilder`**

## Table of contents

### Constructors

- [constructor](database_HavingBuilder.HavingBuilder.md#constructor)

### Properties

- [type](database_HavingBuilder.HavingBuilder.md#type)

### Methods

- [addBindingSource](database_HavingBuilder.HavingBuilder.md#addbindingsource)
- [addBindingSources](database_HavingBuilder.HavingBuilder.md#addbindingsources)
- [andHaving](database_HavingBuilder.HavingBuilder.md#andhaving)
- [clear](database_HavingBuilder.HavingBuilder.md#clear)
- [clearBindingSources](database_HavingBuilder.HavingBuilder.md#clearbindingsources)
- [compile](database_HavingBuilder.HavingBuilder.md#compile)
- [condition](database_HavingBuilder.HavingBuilder.md#condition)
- [getBindings](database_HavingBuilder.HavingBuilder.md#getbindings)
- [hasRulesAssigned](database_HavingBuilder.HavingBuilder.md#hasrulesassigned)
- [orHaving](database_HavingBuilder.HavingBuilder.md#orhaving)
- [popBindingSource](database_HavingBuilder.HavingBuilder.md#popbindingsource)
- [shiftBindingSource](database_HavingBuilder.HavingBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_HavingBuilder.HavingBuilder.md#shiftbindingsources)
- [subcondition](database_HavingBuilder.HavingBuilder.md#subcondition)
- [toSQL](database_HavingBuilder.HavingBuilder.md#tosql)

## Constructors

### constructor

• **new HavingBuilder**(`parent?`)

Builds a new having builder, because this is the nested
conditional builder it needs to take a parent in order
to compile properly

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `parent` | [`HavingBuilder`](database_HavingBuilder.HavingBuilder.md) | `null` |

#### Overrides

[ConditionalBuilder](database_base.ConditionalBuilder.md).[constructor](database_base.ConditionalBuilder.md#constructor)

#### Defined in

[database/HavingBuilder.ts:19](https://github.com/onzag/itemize/blob/f2db74a5/database/HavingBuilder.ts#L19)

## Properties

### type

• **type**: `string`

The type of the condition, WHERE, ON, etc... whatever
you fancy

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[type](database_base.ConditionalBuilder.md#type)

#### Defined in

[database/base.ts:241](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L241)

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

[database/base.ts:69](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L69)

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

[database/base.ts:77](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L77)

___

### andHaving

▸ **andHaving**(`rule`, `bindings?`): [`HavingBuilder`](database_HavingBuilder.HavingBuilder.md)

Specifies a new AND having condition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rule` | `string` \| [`ConditionalBuilderFn`](../modules/database_base.md#conditionalbuilderfn)<[`HavingBuilder`](database_HavingBuilder.HavingBuilder.md)\> | the rule expression |
| `bindings?` | (`string` \| `number`)[] | the bindings for that expression |

#### Returns

[`HavingBuilder`](database_HavingBuilder.HavingBuilder.md)

itself

#### Defined in

[database/HavingBuilder.ts:37](https://github.com/onzag/itemize/blob/f2db74a5/database/HavingBuilder.ts#L37)

___

### clear

▸ **clear**(): [`HavingBuilder`](database_HavingBuilder.HavingBuilder.md)

Clears the conditional builder

#### Returns

[`HavingBuilder`](database_HavingBuilder.HavingBuilder.md)

itself

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[clear](database_base.ConditionalBuilder.md#clear)

#### Defined in

[database/base.ts:352](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L352)

___

### clearBindingSources

▸ **clearBindingSources**(): `void`

Removes all binding sources

#### Returns

`void`

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[clearBindingSources](database_base.ConditionalBuilder.md#clearbindingsources)

#### Defined in

[database/base.ts:105](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L105)

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

[database/base.ts:362](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L362)

___

### condition

▸ **condition**(`gate`, `prefix`, `rule`, `bindings?`): [`HavingBuilder`](database_HavingBuilder.HavingBuilder.md)

Makes a new condition based on an expression or a subrule function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gate` | ``"AND"`` \| ``"OR"`` | the gate to use |
| `prefix` | `string` | an optional prefix to the rule, if none, make it null |
| `rule` | `string` \| [`QueryBuilder`](database_base.QueryBuilder.md) \| [`ConditionalBuilderFn`](../modules/database_base.md#conditionalbuilderfn)<`any`\> | either the expression itself or a subcondition |
| `bindings?` | [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[] | the bindings for the expression, will not be used if using a subcondition |

#### Returns

[`HavingBuilder`](database_HavingBuilder.HavingBuilder.md)

itself

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[condition](database_base.ConditionalBuilder.md#condition)

#### Defined in

[database/base.ts:291](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L291)

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

[database/base.ts:168](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L168)

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

[database/base.ts:259](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L259)

___

### orHaving

▸ **orHaving**(`rule`, `bindings?`): [`HavingBuilder`](database_HavingBuilder.HavingBuilder.md)

Specifies a new OR having condition

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rule` | `string` \| [`ConditionalBuilderFn`](../modules/database_base.md#conditionalbuilderfn)<[`HavingBuilder`](database_HavingBuilder.HavingBuilder.md)\> | the rule expression |
| `bindings?` | (`string` \| `number`)[] | the bindings for that expression |

#### Returns

[`HavingBuilder`](database_HavingBuilder.HavingBuilder.md)

itself

#### Defined in

[database/HavingBuilder.ts:47](https://github.com/onzag/itemize/blob/f2db74a5/database/HavingBuilder.ts#L47)

___

### popBindingSource

▸ **popBindingSource**(): [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

#### Returns

[`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[popBindingSource](database_base.ConditionalBuilder.md#popbindingsource)

#### Defined in

[database/base.ts:112](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L112)

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

[database/base.ts:89](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L89)

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

[database/base.ts:98](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L98)

___

### subcondition

▸ **subcondition**(): [`HavingBuilder`](database_HavingBuilder.HavingBuilder.md)

The override method that specifies how to create a subcondition

#### Returns

[`HavingBuilder`](database_HavingBuilder.HavingBuilder.md)

#### Overrides

[ConditionalBuilder](database_base.ConditionalBuilder.md).[subcondition](database_base.ConditionalBuilder.md#subcondition)

#### Defined in

[database/HavingBuilder.ts:27](https://github.com/onzag/itemize/blob/f2db74a5/database/HavingBuilder.ts#L27)

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

[database/base.ts:129](https://github.com/onzag/itemize/blob/f2db74a5/database/base.ts#L129)
