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
- [mustMatch](server_elastic.ElasticQueryBuilder.md#mustmatch)
- [mustMatchPhrase](server_elastic.ElasticQueryBuilder.md#mustmatchphrase)
- [mustMatchPhrasePrefix](server_elastic.ElasticQueryBuilder.md#mustmatchphraseprefix)
- [mustNot](server_elastic.ElasticQueryBuilder.md#mustnot)
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

[server/elastic.ts:2923](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L2923)

## Properties

### children

• `Private` **children**: [`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)[] = `[]`

#### Defined in

[server/elastic.ts:2920](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L2920)

___

### highlights

• `Private` **highlights**: [`IElasticHighlightReply`](../interfaces/base_Root_Module_ItemDefinition_PropertyDefinition_types.IElasticHighlightReply.md) = `{}`

#### Defined in

[server/elastic.ts:2921](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L2921)

___

### request

• **request**: `SearchRequest`

#### Defined in

[server/elastic.ts:2919](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L2919)

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

[server/elastic.ts:3045](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3045)

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

[server/elastic.ts:3406](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3406)

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

[server/elastic.ts:3369](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3369)

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

[server/elastic.ts:3361](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3361)

___

### clone

▸ **clone**(): [`ElasticQueryBuilder`](server_elastic.ElasticQueryBuilder.md)

#### Returns

[`ElasticQueryBuilder`](server_elastic.ElasticQueryBuilder.md)

#### Defined in

[server/elastic.ts:3429](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3429)

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

[server/elastic.ts:3308](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3308)

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

[server/elastic.ts:3312](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3312)

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

[server/elastic.ts:3345](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3345)

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

[server/elastic.ts:3332](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3332)

___

### getAllChildrenWithUniqueId

▸ **getAllChildrenWithUniqueId**(): [`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)[]

#### Returns

[`IElasticChildrenRule`](../interfaces/server_elastic.IElasticChildrenRule.md)[]

#### Defined in

[server/elastic.ts:3357](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3357)

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

[server/elastic.ts:3316](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3316)

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

[server/elastic.ts:3279](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3279)

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

[server/elastic.ts:2930](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L2930)

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

[server/elastic.ts:3094](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3094)

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

[server/elastic.ts:3139](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3139)

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

[server/elastic.ts:3153](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3153)

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

[server/elastic.ts:3167](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3167)

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

[server/elastic.ts:3098](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3098)

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

[server/elastic.ts:3146](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3146)

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

[server/elastic.ts:3160](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3160)

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

[server/elastic.ts:3174](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3174)

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

[server/elastic.ts:3118](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3118)

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

[server/elastic.ts:3132](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3132)

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

[server/elastic.ts:3110](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3110)

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

[server/elastic.ts:3125](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3125)

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

[server/elastic.ts:3417](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3417)

___

### removeAggregations

▸ **removeAggregations**(): `void`

#### Returns

`void`

#### Defined in

[server/elastic.ts:3421](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3421)

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

[server/elastic.ts:3320](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3320)

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

[server/elastic.ts:3324](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3324)

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

[server/elastic.ts:3328](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3328)

___

### removeHighlights

▸ **removeHighlights**(): `void`

#### Returns

`void`

#### Defined in

[server/elastic.ts:3425](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3425)

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

[server/elastic.ts:3264](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3264)

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

[server/elastic.ts:3270](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3270)

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

[server/elastic.ts:3260](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3260)

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

[server/elastic.ts:3252](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3252)

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

[server/elastic.ts:3102](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3102)

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

[server/elastic.ts:3210](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3210)

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

[server/elastic.ts:3224](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3224)

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

[server/elastic.ts:3238](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3238)

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

[server/elastic.ts:3106](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3106)

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

[server/elastic.ts:3217](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3217)

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

[server/elastic.ts:3231](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3231)

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

[server/elastic.ts:3245](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3245)

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

[server/elastic.ts:3189](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3189)

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

[server/elastic.ts:3203](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3203)

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

[server/elastic.ts:3181](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3181)

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

[server/elastic.ts:3196](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3196)

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

[server/elastic.ts:3256](https://github.com/onzag/itemize/blob/59702dd5/server/elastic.ts#L3256)
