[@onzag/itemize](../README.md) / [Modules](../modules.md) / [server/seo](../modules/server_seo.md) / ISEORule

# Interface: ISEORule

[server/seo](../modules/server_seo.md).ISEORule

Represents a rule for building the SEO sitemaps

## Table of contents

### Properties

- [collect](server_seo.ISEORule.md#collect)
- [crawable](server_seo.ISEORule.md#crawable)
- [parametrize](server_seo.ISEORule.md#parametrize)

## Properties

### collect

• `Optional` **collect**: [`ISEOCollectionRequest`](server_seo.ISEOCollectionRequest.md)

The collect rule is an optional base rule of what needs to be collected in order to populate these results
the first string represents the module path, eg. "users" you should separate it by / if there's more
into them, the second string represents the item definition path eg. "user" also separated by / if there's
more depth to them

The collect rule is the base point for parametrization, and only new results get collected, for efficiency reasons
a signature is built and only what is newly added gets collected

lets suppose you are about to build urls for /group/:id/subgroup/:sid where a subgroup is parented by a group
in that case your collection rule would be as you only need the subgroups as this is a subgroup url
[{
  itemOrModule: "social/group",
  extraColumns: ["parent_id"]
}]

When you run the parametrize function you will get all the results for these, suppose you got a new group added
since last check results will look like the ISEOCollectedResult interface as an array

[
  {
    id: 3,
    version: null,
    created_at: "???",
    parent_id: 2
  },
  {
    id: 4,
    version: null,
    created_at: "???",
    parent_id: 1
  },
]

So this specifies all the new subgroups added and now you can build the url by using the parametrize function

(arg) => (arg.collectedResults[0].collected.map(r) => ({params: {sid: r.id, id: r.parent_id}}));

this will correctly parametrize and replace every id with every other, notice that you have access to raw db
and the root in these, this should enable you to create complex parametrizers eg. suppose you are using the
/group/:name/subgroup/:name instead in the urls (however this is not recommended unless your names are static)
and this isn't even good for indexing, but whatever, even this is possible to SEO

In this case you will have to change your extraColumns rule to include the name, and you will have to request
the parent in the parent_id using raw db (there's no cache on the global manager) and you should get the container it
is in; you might want to use a memory cache while the parametrizer run, the parametrizer can return a promise so
it can be async

#### Defined in

[server/seo/index.ts:94](https://github.com/onzag/itemize/blob/59702dd5/server/seo/index.ts#L94)

___

### crawable

• **crawable**: `boolean`

Whether this is a crawable url, you might set this value to true or
false, depending on you

#### Defined in

[server/seo/index.ts:44](https://github.com/onzag/itemize/blob/59702dd5/server/seo/index.ts#L44)

___

### parametrize

• `Optional` **parametrize**: (`arg`: \{ `collectedResults`: [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)[] ; `rawDB`: [`ItemizeRawDB`](../classes/server_raw_db.ItemizeRawDB.md) ; `root`: [`default`](../classes/base_Root.default.md)  }) => [`ISEOParametrizer`](server_seo.ISEOParametrizer.md)[] \| `Promise`\<[`ISEOParametrizer`](server_seo.ISEOParametrizer.md)[]\>

#### Type declaration

▸ (`arg`): [`ISEOParametrizer`](server_seo.ISEOParametrizer.md)[] \| `Promise`\<[`ISEOParametrizer`](server_seo.ISEOParametrizer.md)[]\>

This is the parametrize function, only makes sense to use when you specify the collect attribute as this needs
to make use of collected results, however you might specify parametrize without using collect at all, but bear in mind that
you will have somehow to keep track of what you are searching for yourself, parametrize is only really intended to run with
collect

##### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Object` |
| `arg.collectedResults` | [`ISQLTableRowValue`](base_Root_sql.ISQLTableRowValue.md)[] |
| `arg.rawDB` | [`ItemizeRawDB`](../classes/server_raw_db.ItemizeRawDB.md) |
| `arg.root` | [`default`](../classes/base_Root.default.md) |

##### Returns

[`ISEOParametrizer`](server_seo.ISEOParametrizer.md)[] \| `Promise`\<[`ISEOParametrizer`](server_seo.ISEOParametrizer.md)[]\>

#### Defined in

[server/seo/index.ts:101](https://github.com/onzag/itemize/blob/59702dd5/server/seo/index.ts#L101)
