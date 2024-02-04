[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/elastic](../modules/server_elastic.md) / ElasticQueryBuilder

# Class: ElasticQueryBuilder

[server/elastic](../modules/server_elastic.md).ElasticQueryBuilder

## Table of contents

### Constructors

- [constructor](server_elastic.ElasticQueryBuilder.md#constructor)

### Properties

- [children](server_elastic.ElasticQueryBuilder.md#children)
- [highlights](server_elastic.ElasticQueryBuilder.md#highlights)
- [request](server_elastic.ElasticQueryBuilder.md#request)

### Methods

- [\_q](server_elastic.ElasticQueryBuilder.md#_q)
- [addAggregation](server_elastic.ElasticQueryBuilder.md#addaggregation)
- [addAggregations](server_elastic.ElasticQueryBuilder.md#addaggregations)
- [addChildren](server_elastic.ElasticQueryBuilder.md#addchildren)
- [clone](server_elastic.ElasticQueryBuilder.md#clone)
- [getAllChildrenForGroupId](server_elastic.ElasticQueryBuilder.md#getallchildrenforgroupid)
- [getAllChildrenForPropertyId](server_elastic.ElasticQueryBuilder.md#getallchildrenforpropertyid)
- [getAllChildrenWithGroupId](server_elastic.ElasticQueryBuilder.md#getallchildrenwithgroupid)
- [getAllChildrenWithPropertyId](server_elastic.ElasticQueryBuilder.md#getallchildrenwithpropertyid)
- [getAllChildrenWithUniqueId](server_elastic.ElasticQueryBuilder.md#getallchildrenwithuniqueid)
- [getChildForUniqueId](server_elastic.ElasticQueryBuilder.md#getchildforuniqueid)
- [getHighlightInfo](server_elastic.ElasticQueryBuilder.md#gethighlightinfo)
- [getRequest](server_elastic.ElasticQueryBuilder.md#getrequest)
- [must](server_elastic.ElasticQueryBuilder.md#must)
- [mustBeCreatedBy](server_elastic.ElasticQueryBuilder.md#mustbecreatedby)
- [mustMatch](server_elastic.ElasticQueryBuilder.md#mustmatch)
- [mustMatchPhrase](server_elastic.ElasticQueryBuilder.md#mustmatchphrase)
- [mustMatchPhrasePrefix](server_elastic.ElasticQueryBuilder.md#mustmatchphraseprefix)
- [mustNot](server_elastic.ElasticQueryBuilder.md#mustnot)
- [mustNotBeBlocked](server_elastic.ElasticQueryBuilder.md#mustnotbeblocked)
- [mustNotMatch](server_elastic.ElasticQueryBuilder.md#mustnotmatch)
- [mustNotMatchPhrase](server_elastic.ElasticQueryBuilder.md#mustnotmatchphrase)
- [mustNotMatchPhrasePrefix](server_elastic.ElasticQueryBuilder.md#mustnotmatchphraseprefix)
- [mustNotTerm](server_elastic.ElasticQueryBuilder.md#mustnotterm)
- [mustNotTerms](server_elastic.ElasticQueryBuilder.md#mustnotterms)
- [mustTerm](server_elastic.ElasticQueryBuilder.md#mustterm)
- [mustTerms](server_elastic.ElasticQueryBuilder.md#mustterms)
- [removeAggregation](server_elastic.ElasticQueryBuilder.md#removeaggregation)
- [removeAggregations](server_elastic.ElasticQueryBuilder.md#removeaggregations)
- [removeAllChildrenForGroupId](server_elastic.ElasticQueryBuilder.md#removeallchildrenforgroupid)
- [removeAllChildrenForPropertyId](server_elastic.ElasticQueryBuilder.md#removeallchildrenforpropertyid)
- [removeChild](server_elastic.ElasticQueryBuilder.md#removechild)
- [removeChildForUniqueId](server_elastic.ElasticQueryBuilder.md#removechildforuniqueid)
- [removeHighlights](server_elastic.ElasticQueryBuilder.md#removehighlights)
- [setFrom](server_elastic.ElasticQueryBuilder.md#setfrom)
- [setHighlightsOn](server_elastic.ElasticQueryBuilder.md#sethighlightson)
- [setSize](server_elastic.ElasticQueryBuilder.md#setsize)
- [setSourceIncludes](server_elastic.ElasticQueryBuilder.md#setsourceincludes)
- [should](server_elastic.ElasticQueryBuilder.md#should)
- [shouldMatch](server_elastic.ElasticQueryBuilder.md#shouldmatch)
- [shouldMatchPhrase](server_elastic.ElasticQueryBuilder.md#shouldmatchphrase)
- [shouldMatchPhrasePrefix](server_elastic.ElasticQueryBuilder.md#shouldmatchphraseprefix)
- [shouldNot](server_elastic.ElasticQueryBuilder.md#shouldnot)
- [shouldNotMatch](server_elastic.ElasticQueryBuilder.md#shouldnotmatch)
- [shouldNotMatchPhrase](server_elastic.ElasticQueryBuilder.md#shouldnotmatchphrase)
- [shouldNotMatchPhrasePrefix](server_elastic.ElasticQueryBuilder.md#shouldnotmatchphraseprefix)
- [shouldNotTerm](server_elastic.ElasticQueryBuilder.md#shouldnotterm)
- [shouldNotTerms](server_elastic.ElasticQueryBuilder.md#shouldnotterms)
- [shouldTerm](server_elastic.ElasticQueryBuilder.md#shouldterm)
- [shouldTerms](server_elastic.ElasticQueryBuilder.md#shouldterms)
- [sortBy](server_elastic.ElasticQueryBuilder.md#sortby)

## Constructors

### constructor

• **new ElasticQueryBuilder**(`request`): [`ElasticQueryBuilder`](server_elastic.ElasticQueryBuilder.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `SearchRequest` |

#### Returns

[`ElasticQueryBuilder`](server_elastic.ElasticQueryBuilder.md)

#### Defined in

[server/elastic.ts:2982](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L2982)

## Properties

### children

• `Private` **children**: [`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)[] = `[]`

#### Defined in

[server/elastic.ts:2979](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L2979)

___

### highlights

• `Private` **highlights**: [`IElasticHighlightReply`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md) = `{}`

#### Defined in

[server/elastic.ts:2980](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L2980)

___

### request

• **request**: `SearchRequest`

#### Defined in

[server/elastic.ts:2978](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L2978)

## Methods

### \_q

▸ **_q**(`q`, `type`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | `QueryDslQueryContainer` \| `SubBuilderFn` |
| `type` | `string` |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3112](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3112)

___

### addAggregation

▸ **addAggregation**(`id`, `agg`, `filter?`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `agg` | `AggregationsAggregationContainer` |
| `filter?` | `QueryDslQueryContainer` \| `SubBuilderFn` |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3473](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3473)

___

### addAggregations

▸ **addAggregations**(`id`, `agg`, `filter?`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `agg` | `Record`\<`string`, `AggregationsAggregationContainer`\> |
| `filter?` | `QueryDslQueryContainer` \| `SubBuilderFn` |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3436](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3436)

___

### addChildren

▸ **addChildren**(`c`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `c` | [`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md) \| [`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)[] |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3428](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3428)

___

### clone

▸ **clone**(): [`ElasticQueryBuilder`](server_elastic.ElasticQueryBuilder.md)

#### Returns

[`ElasticQueryBuilder`](server_elastic.ElasticQueryBuilder.md)

#### Defined in

[server/elastic.ts:3496](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3496)

___

### getAllChildrenForGroupId

▸ **getAllChildrenForGroupId**(`id`): [`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)[]

#### Defined in

[server/elastic.ts:3371](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3371)

___

### getAllChildrenForPropertyId

▸ **getAllChildrenForPropertyId**(`id`): [`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)[]

#### Defined in

[server/elastic.ts:3375](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3375)

___

### getAllChildrenWithGroupId

▸ **getAllChildrenWithGroupId**(`options?`): [`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.but?` | `string` \| `string`[] |
| `options.includeWithoutGroupId?` | `boolean` |
| `options.noAgg?` | `boolean` |
| `options.noQuery?` | `boolean` |

#### Returns

[`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)[]

#### Defined in

[server/elastic.ts:3412](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3412)

___

### getAllChildrenWithPropertyId

▸ **getAllChildrenWithPropertyId**(`options?`): [`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.but?` | `string` \| `string`[] |
| `options.includeWithoutPropertyId?` | `boolean` |
| `options.noAgg?` | `boolean` |
| `options.noQuery?` | `boolean` |

#### Returns

[`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)[]

#### Defined in

[server/elastic.ts:3399](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3399)

___

### getAllChildrenWithUniqueId

▸ **getAllChildrenWithUniqueId**(): [`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)[]

#### Returns

[`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)[]

#### Defined in

[server/elastic.ts:3424](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3424)

___

### getChildForUniqueId

▸ **getChildForUniqueId**(`id`): [`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)

#### Defined in

[server/elastic.ts:3379](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3379)

___

### getHighlightInfo

▸ **getHighlightInfo**(`options?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ElasticRequestOptions` |

#### Returns

`Object`

#### Defined in

[server/elastic.ts:3342](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3342)

___

### getRequest

▸ **getRequest**(`options?`): `SearchRequest`

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `ElasticRequestOptions` |

#### Returns

`SearchRequest`

#### Defined in

[server/elastic.ts:2989](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L2989)

___

### must

▸ **must**(`q`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | `QueryDslQueryContainer` \| `SubBuilderFn` |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3145](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3145)

___

### mustBeCreatedBy

▸ **mustBeCreatedBy**(`userid`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `userid` | `string` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3309](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3309)

___

### mustMatch

▸ **mustMatch**(`matchRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`\<`Record`\<`string`, `string` \| `number` \| `boolean` \| `QueryDslMatchQuery`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3190](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3190)

___

### mustMatchPhrase

▸ **mustMatchPhrase**(`matchRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`\<`Record`\<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3204](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3204)

___

### mustMatchPhrasePrefix

▸ **mustMatchPhrasePrefix**(`matchRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`\<`Record`\<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3218](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3218)

___

### mustNot

▸ **mustNot**(`q`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | `QueryDslQueryContainer` \| `SubBuilderFn` |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3149](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3149)

___

### mustNotBeBlocked

▸ **mustNotBeBlocked**(): `void`

#### Returns

`void`

#### Defined in

[server/elastic.ts:3303](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3303)

___

### mustNotMatch

▸ **mustNotMatch**(`matchRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`\<`Record`\<`string`, `string` \| `number` \| `boolean` \| `QueryDslMatchQuery`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3197](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3197)

___

### mustNotMatchPhrase

▸ **mustNotMatchPhrase**(`matchRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`\<`Record`\<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3211](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3211)

___

### mustNotMatchPhrasePrefix

▸ **mustNotMatchPhrasePrefix**(`matchRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`\<`Record`\<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3225](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3225)

___

### mustNotTerm

▸ **mustNotTerm**(`termRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termRule` | `Partial`\<`Record`\<`string`, `QueryDslTermQuery` \| `FieldValue`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3169](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3169)

___

### mustNotTerms

▸ **mustNotTerms**(`termsRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termsRule` | `QueryDslTermsQuery` |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3183](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3183)

___

### mustTerm

▸ **mustTerm**(`termRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termRule` | `Partial`\<`Record`\<`string`, `QueryDslTermQuery` \| `FieldValue`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3161](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3161)

___

### mustTerms

▸ **mustTerms**(`termsRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termsRule` | `QueryDslTermsQuery` |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3176](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3176)

___

### removeAggregation

▸ **removeAggregation**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3484](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3484)

___

### removeAggregations

▸ **removeAggregations**(): `void`

#### Returns

`void`

#### Defined in

[server/elastic.ts:3488](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3488)

___

### removeAllChildrenForGroupId

▸ **removeAllChildrenForGroupId**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3383](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3383)

___

### removeAllChildrenForPropertyId

▸ **removeAllChildrenForPropertyId**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3387](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3387)

___

### removeChild

▸ **removeChild**(`q`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | [`ElasticQueryBuilder`](server_elastic.ElasticQueryBuilder.md) \| `QueryDslQueryContainer` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3395](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3395)

___

### removeChildForUniqueId

▸ **removeChildForUniqueId**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3391](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3391)

___

### removeHighlights

▸ **removeHighlights**(): `void`

#### Returns

`void`

#### Defined in

[server/elastic.ts:3492](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3492)

___

### setFrom

▸ **setFrom**(`from`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `from` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3327](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3327)

___

### setHighlightsOn

▸ **setHighlightsOn**(`reply`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `reply` | [`IElasticHighlightReply`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md) |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3333](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3333)

___

### setSize

▸ **setSize**(`size`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `size` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3323](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3323)

___

### setSourceIncludes

▸ **setSourceIncludes**(`list`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `list` | `string`[] |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3315](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3315)

___

### should

▸ **should**(`q`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | `QueryDslQueryContainer` \| `SubBuilderFn` |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3153](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3153)

___

### shouldMatch

▸ **shouldMatch**(`matchRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`\<`Record`\<`string`, `string` \| `number` \| `boolean` \| `QueryDslMatchQuery`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3261](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3261)

___

### shouldMatchPhrase

▸ **shouldMatchPhrase**(`matchRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`\<`Record`\<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3275](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3275)

___

### shouldMatchPhrasePrefix

▸ **shouldMatchPhrasePrefix**(`matchRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`\<`Record`\<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3289](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3289)

___

### shouldNot

▸ **shouldNot**(`q`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | `QueryDslQueryContainer` \| `SubBuilderFn` |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3157](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3157)

___

### shouldNotMatch

▸ **shouldNotMatch**(`matchRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`\<`Record`\<`string`, `string` \| `number` \| `boolean` \| `QueryDslMatchQuery`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3268](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3268)

___

### shouldNotMatchPhrase

▸ **shouldNotMatchPhrase**(`matchRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`\<`Record`\<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3282](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3282)

___

### shouldNotMatchPhrasePrefix

▸ **shouldNotMatchPhrasePrefix**(`matchRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`\<`Record`\<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3296](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3296)

___

### shouldNotTerm

▸ **shouldNotTerm**(`termRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termRule` | `Partial`\<`Record`\<`string`, `QueryDslTermQuery` \| `FieldValue`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3240](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3240)

___

### shouldNotTerms

▸ **shouldNotTerms**(`termsRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termsRule` | `QueryDslTermsQuery` |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3254](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3254)

___

### shouldTerm

▸ **shouldTerm**(`termRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termRule` | `Partial`\<`Record`\<`string`, `QueryDslTermQuery` \| `FieldValue`\>\> |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3232](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3232)

___

### shouldTerms

▸ **shouldTerms**(`termsRule`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termsRule` | `QueryDslTermsQuery` |
| `options` | `IElasticBasicOptions` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3247](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3247)

___

### sortBy

▸ **sortBy**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `any` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:3319](https://github.com/onzag/itemize/blob/73e0c39e/server/elastic.ts#L3319)
