[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/elastic](../modules/server_elastic.md) / ElasticQueryBuilder

# Class: ElasticQueryBuilder

[server/elastic](../modules/server_elastic.md).ElasticQueryBuilder

## Table of contents

### Constructors

- [constructor](server_elastic.ElasticQueryBuilder.md#constructor)

### Properties

- [children](server_elastic.ElasticQueryBuilder.md#children)
- [request](server_elastic.ElasticQueryBuilder.md#request)

### Methods

- [\_q](server_elastic.ElasticQueryBuilder.md#_q)
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

• **new ElasticQueryBuilder**(`request`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `request` | `SearchRequest` |

#### Defined in

[server/elastic.ts:2202](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2202)

## Properties

### children

• `Private` **children**: { `builder`: [`ElasticQueryBuilder`](server_elastic.ElasticQueryBuilder.md) ; `type`: `string`  }[] = `[]`

#### Defined in

[server/elastic.ts:2195](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2195)

___

### request

• `Private` **request**: `SearchRequest`

#### Defined in

[server/elastic.ts:2194](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2194)

## Methods

### \_q

▸ `Private` **_q**(`q`, `boost`, `r`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | `QueryDslQueryContainer` \| `SubBuilderFn` |
| `boost` | `number` |
| `r` | `string` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2239](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2239)

___

### getRequest

▸ **getRequest**(): `SearchRequest`

#### Returns

`SearchRequest`

#### Defined in

[server/elastic.ts:2209](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2209)

___

### must

▸ **must**(`q`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | `QueryDslQueryContainer` \| `SubBuilderFn` |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2270](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2270)

___

### mustMatch

▸ **mustMatch**(`matchRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`<`Record`<`string`, `string` \| `number` \| `boolean` \| `QueryDslMatchQuery`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2315](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2315)

___

### mustMatchPhrase

▸ **mustMatchPhrase**(`matchRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`<`Record`<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2329](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2329)

___

### mustMatchPhrasePrefix

▸ **mustMatchPhrasePrefix**(`matchRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`<`Record`<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2343](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2343)

___

### mustNot

▸ **mustNot**(`q`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | `QueryDslQueryContainer` \| `SubBuilderFn` |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2274](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2274)

___

### mustNotMatch

▸ **mustNotMatch**(`matchRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`<`Record`<`string`, `string` \| `number` \| `boolean` \| `QueryDslMatchQuery`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2322](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2322)

___

### mustNotMatchPhrase

▸ **mustNotMatchPhrase**(`matchRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`<`Record`<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2336](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2336)

___

### mustNotMatchPhrasePrefix

▸ **mustNotMatchPhrasePrefix**(`matchRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`<`Record`<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2350](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2350)

___

### mustNotTerm

▸ **mustNotTerm**(`termRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termRule` | `Partial`<`Record`<`string`, `QueryDslTermQuery` \| `FieldValue`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2294](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2294)

___

### mustNotTerms

▸ **mustNotTerms**(`termsRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termsRule` | `QueryDslTermsQuery` |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2308](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2308)

___

### mustTerm

▸ **mustTerm**(`termRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termRule` | `Partial`<`Record`<`string`, `QueryDslTermQuery` \| `FieldValue`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2286](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2286)

___

### mustTerms

▸ **mustTerms**(`termsRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termsRule` | `QueryDslTermsQuery` |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2301](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2301)

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

[server/elastic.ts:2440](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2440)

___

### setHighlightsOn

▸ **setHighlightsOn**(`fields`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | `string`[] |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2446](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2446)

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

[server/elastic.ts:2436](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2436)

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

[server/elastic.ts:2428](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2428)

___

### should

▸ **should**(`q`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | `QueryDslQueryContainer` \| `SubBuilderFn` |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2278](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2278)

___

### shouldMatch

▸ **shouldMatch**(`matchRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`<`Record`<`string`, `string` \| `number` \| `boolean` \| `QueryDslMatchQuery`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2386](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2386)

___

### shouldMatchPhrase

▸ **shouldMatchPhrase**(`matchRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`<`Record`<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2400](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2400)

___

### shouldMatchPhrasePrefix

▸ **shouldMatchPhrasePrefix**(`matchRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`<`Record`<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2414](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2414)

___

### shouldNot

▸ **shouldNot**(`q`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | `QueryDslQueryContainer` \| `SubBuilderFn` |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2282](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2282)

___

### shouldNotMatch

▸ **shouldNotMatch**(`matchRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`<`Record`<`string`, `string` \| `number` \| `boolean` \| `QueryDslMatchQuery`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2393](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2393)

___

### shouldNotMatchPhrase

▸ **shouldNotMatchPhrase**(`matchRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`<`Record`<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2407](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2407)

___

### shouldNotMatchPhrasePrefix

▸ **shouldNotMatchPhrasePrefix**(`matchRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchRule` | `Partial`<`Record`<`string`, `string` \| `QueryDslMatchPhraseQuery`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2421](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2421)

___

### shouldNotTerm

▸ **shouldNotTerm**(`termRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termRule` | `Partial`<`Record`<`string`, `QueryDslTermQuery` \| `FieldValue`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2365](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2365)

___

### shouldNotTerms

▸ **shouldNotTerms**(`termsRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termsRule` | `QueryDslTermsQuery` |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2379](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2379)

___

### shouldTerm

▸ **shouldTerm**(`termRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termRule` | `Partial`<`Record`<`string`, `QueryDslTermQuery` \| `FieldValue`\>\> |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2357](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2357)

___

### shouldTerms

▸ **shouldTerms**(`termsRule`, `boost?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `termsRule` | `QueryDslTermsQuery` |
| `boost?` | `number` |

#### Returns

`void`

#### Defined in

[server/elastic.ts:2372](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2372)

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

[server/elastic.ts:2432](https://github.com/onzag/itemize/blob/f2db74a5/server/elastic.ts#L2432)
