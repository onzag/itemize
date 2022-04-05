[@onzag/itemize](../README.md) / [Modules](../modules.md) / [database/WhereBuilder](../modules/database_WhereBuilder.md) / WhereBuilder

# Class: WhereBuilder

[database/WhereBuilder](../modules/database_WhereBuilder.md).WhereBuilder

The where query builder allows to create WHERE statments
extends the conditional builder since it's basically a nesting condition

## Hierarchy

- [`ConditionalBuilder`](database_base.ConditionalBuilder.md)

  ↳ **`WhereBuilder`**

## Table of contents

### Constructors

- [constructor](database_WhereBuilder.WhereBuilder.md#constructor)

### Properties

- [type](database_WhereBuilder.WhereBuilder.md#type)

### Methods

- [addBindingSource](database_WhereBuilder.WhereBuilder.md#addbindingsource)
- [addBindingSources](database_WhereBuilder.WhereBuilder.md#addbindingsources)
- [andWhere](database_WhereBuilder.WhereBuilder.md#andwhere)
- [andWhereColumn](database_WhereBuilder.WhereBuilder.md#andwherecolumn)
- [andWhereColumnNotNull](database_WhereBuilder.WhereBuilder.md#andwherecolumnnotnull)
- [andWhereColumnNull](database_WhereBuilder.WhereBuilder.md#andwherecolumnnull)
- [andWhereExists](database_WhereBuilder.WhereBuilder.md#andwhereexists)
- [andWhereMany](database_WhereBuilder.WhereBuilder.md#andwheremany)
- [andWhereNotExists](database_WhereBuilder.WhereBuilder.md#andwherenotexists)
- [clear](database_WhereBuilder.WhereBuilder.md#clear)
- [clearBindingSources](database_WhereBuilder.WhereBuilder.md#clearbindingsources)
- [compile](database_WhereBuilder.WhereBuilder.md#compile)
- [condition](database_WhereBuilder.WhereBuilder.md#condition)
- [getBindings](database_WhereBuilder.WhereBuilder.md#getbindings)
- [hasRulesAssigned](database_WhereBuilder.WhereBuilder.md#hasrulesassigned)
- [orWhere](database_WhereBuilder.WhereBuilder.md#orwhere)
- [orWhereColumn](database_WhereBuilder.WhereBuilder.md#orwherecolumn)
- [orWhereColumnNotNull](database_WhereBuilder.WhereBuilder.md#orwherecolumnnotnull)
- [orWhereColumnNull](database_WhereBuilder.WhereBuilder.md#orwherecolumnnull)
- [orWhereExists](database_WhereBuilder.WhereBuilder.md#orwhereexists)
- [orWhereMany](database_WhereBuilder.WhereBuilder.md#orwheremany)
- [orWhereNotExists](database_WhereBuilder.WhereBuilder.md#orwherenotexists)
- [popBindingSource](database_WhereBuilder.WhereBuilder.md#popbindingsource)
- [shiftBindingSource](database_WhereBuilder.WhereBuilder.md#shiftbindingsource)
- [shiftBindingSources](database_WhereBuilder.WhereBuilder.md#shiftbindingsources)
- [subcondition](database_WhereBuilder.WhereBuilder.md#subcondition)
- [toSQL](database_WhereBuilder.WhereBuilder.md#tosql)

## Constructors

### constructor

• **new WhereBuilder**(`parent?`)

Creates a new where builder instance

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `parent` | [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md) | `null` | the parent where builder in question |

#### Overrides

[ConditionalBuilder](database_base.ConditionalBuilder.md).[constructor](database_base.ConditionalBuilder.md#constructor)

#### Defined in

[database/WhereBuilder.ts:19](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L19)

## Properties

### type

• **type**: `string`

The type of the condition, WHERE, ON, etc... whatever
you fancy

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[type](database_base.ConditionalBuilder.md#type)

#### Defined in

[database/base.ts:241](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L241)

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

[database/base.ts:69](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L69)

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

[database/base.ts:77](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L77)

___

### andWhere

▸ **andWhere**(`rule`, `bindings?`): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Specifies a simple expression as an AND rule

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rule` | `string` \| [`ConditionalBuilderFn`](../modules/database_base.md#conditionalbuilderfn)<[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)\> | the expression in question |
| `bindings?` | (`string` \| `number`)[] | the bindings for that rule |

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Defined in

[database/WhereBuilder.ts:197](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L197)

___

### andWhereColumn

▸ **andWhereColumn**(`column`, `valueOrComparator`, `valueToCompare?`): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Specifies an AND rule for a column with a given value or comparator

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `column` | `string` | the column in question |
| `valueOrComparator` | [`ValueType`](../modules/database_base.md#valuetype) | a value to compare against in equality or a comparator |
| `valueToCompare?` | [`ValueType`](../modules/database_base.md#valuetype) | if the previous value was a comparator, then this one should be the value |

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Defined in

[database/WhereBuilder.ts:110](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L110)

___

### andWhereColumnNotNull

▸ **andWhereColumnNotNull**(`column`): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Specifies an AND rule for a column when this one is not null

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `column` | `string` | the column in question |

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Defined in

[database/WhereBuilder.ts:166](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L166)

___

### andWhereColumnNull

▸ **andWhereColumnNull**(`column`): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Specifies an AND rule for a column when this one is null

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `column` | `string` | the column in question |

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Defined in

[database/WhereBuilder.ts:156](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L156)

___

### andWhereExists

▸ **andWhereExists**(`arg`): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Specifies a condition for an EXISTS rule

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ConditionalBuilderFn`](../modules/database_base.md#conditionalbuilderfn)<[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)\> | a function that provides a select builder |

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Defined in

[database/WhereBuilder.ts:36](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L36)

___

### andWhereMany

▸ **andWhereMany**(`obj`): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Specifies an AND rule for column value key pairs

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md) | the values that are relevant |

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Defined in

[database/WhereBuilder.ts:84](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L84)

___

### andWhereNotExists

▸ **andWhereNotExists**(`arg`): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Specifies a condition for an EXISTS rule

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ConditionalBuilderFn`](../modules/database_base.md#conditionalbuilderfn)<[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)\> | a function that provides a select builder |

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Defined in

[database/WhereBuilder.ts:48](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L48)

___

### clear

▸ **clear**(): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Clears the conditional builder

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[clear](database_base.ConditionalBuilder.md#clear)

#### Defined in

[database/base.ts:352](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L352)

___

### clearBindingSources

▸ **clearBindingSources**(): `void`

Removes all binding sources

#### Returns

`void`

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[clearBindingSources](database_base.ConditionalBuilder.md#clearbindingsources)

#### Defined in

[database/base.ts:105](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L105)

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

[database/base.ts:362](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L362)

___

### condition

▸ **condition**(`gate`, `prefix`, `rule`, `bindings?`): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Makes a new condition based on an expression or a subrule function

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gate` | ``"AND"`` \| ``"OR"`` | the gate to use |
| `prefix` | `string` | an optional prefix to the rule, if none, make it null |
| `rule` | `string` \| [`QueryBuilder`](database_base.QueryBuilder.md) \| [`ConditionalBuilderFn`](../modules/database_base.md#conditionalbuilderfn)<`any`\> | either the expression itself or a subcondition |
| `bindings?` | [`BasicBindingType`](../modules/database_base.md#basicbindingtype)[] | the bindings for the expression, will not be used if using a subcondition |

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[condition](database_base.ConditionalBuilder.md#condition)

#### Defined in

[database/base.ts:291](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L291)

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

[database/base.ts:168](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L168)

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

[database/base.ts:259](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L259)

___

### orWhere

▸ **orWhere**(`rule`, `bindings?`): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Specifies a simple expression as a OR rule

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rule` | `string` \| [`ConditionalBuilderFn`](../modules/database_base.md#conditionalbuilderfn)<[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)\> | the expression in question |
| `bindings?` | (`string` \| `number`)[] | the bindings for that rule |

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Defined in

[database/WhereBuilder.ts:207](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L207)

___

### orWhereColumn

▸ **orWhereColumn**(`column`, `valueOrComparator`, `valueToCompare?`): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Specifies an OR rule for a column with a given value or comparator

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `column` | `string` | the column in question |
| `valueOrComparator` | [`ValueType`](../modules/database_base.md#valuetype) | a value to compare against in equality or a comparator |
| `valueToCompare?` | [`ValueType`](../modules/database_base.md#valuetype) | if the previous value was a comparator, then this one should be the value |

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Defined in

[database/WhereBuilder.ts:134](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L134)

___

### orWhereColumnNotNull

▸ **orWhereColumnNotNull**(`column`): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Specifies an OR rule for a column when this one is not null

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `column` | `string` | the column in question |

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Defined in

[database/WhereBuilder.ts:186](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L186)

___

### orWhereColumnNull

▸ **orWhereColumnNull**(`column`): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Specifies an OR rule for a column when this one is null

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `column` | `string` | the column in question |

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Defined in

[database/WhereBuilder.ts:176](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L176)

___

### orWhereExists

▸ **orWhereExists**(`arg`): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Specifies a condition for an EXISTS rule

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ConditionalBuilderFn`](../modules/database_base.md#conditionalbuilderfn)<[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)\> | a function that provides a select builder |

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Defined in

[database/WhereBuilder.ts:60](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L60)

___

### orWhereMany

▸ **orWhereMany**(`obj`): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Specifies an OR rule for column value key pairs

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | [`IManyValueType`](../interfaces/database_base.IManyValueType.md) | the values that are relevant |

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Defined in

[database/WhereBuilder.ts:96](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L96)

___

### orWhereNotExists

▸ **orWhereNotExists**(`arg`): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Specifies a condition for an EXISTS rule

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | [`ConditionalBuilderFn`](../modules/database_base.md#conditionalbuilderfn)<[`SelectBuilder`](database_SelectBuilder.SelectBuilder.md)\> | a function that provides a select builder |

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

itself

#### Defined in

[database/WhereBuilder.ts:72](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L72)

___

### popBindingSource

▸ **popBindingSource**(): [`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

Removes the last added biding source and returns it

#### Returns

[`ExtendedBindingType`](../modules/database_base.md#extendedbindingtype)

#### Inherited from

[ConditionalBuilder](database_base.ConditionalBuilder.md).[popBindingSource](database_base.ConditionalBuilder.md#popbindingsource)

#### Defined in

[database/base.ts:112](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L112)

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

[database/base.ts:89](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L89)

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

[database/base.ts:98](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L98)

___

### subcondition

▸ **subcondition**(): [`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

Specifies how to build a subcondition for the where builder

#### Returns

[`WhereBuilder`](database_WhereBuilder.WhereBuilder.md)

a new subcondition instance parented by this one

#### Overrides

[ConditionalBuilder](database_base.ConditionalBuilder.md).[subcondition](database_base.ConditionalBuilder.md#subcondition)

#### Defined in

[database/WhereBuilder.ts:27](https://github.com/onzag/itemize/blob/5c2808d3/database/WhereBuilder.ts#L27)

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

[database/base.ts:129](https://github.com/onzag/itemize/blob/5c2808d3/database/base.ts#L129)
