[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/custom-graphql/graphql-token-object

# Module: server/custom-graphql/graphql-token-object

This is the shape that tokens and custom tokens are expected to be retrieved
while tokens might contain more information than this token might suggest
this is the standard shape for a token endpoint and it's what the app token
service offers

## Table of contents

### Variables

- [default](server_custom_graphql_graphql_token_object.md#default)

## Variables

### default

• **default**: `GraphQLObjectType`<`any`, `any`, { [key: string]: `any`;  }\>

This is the token object that specifies the shape that token information
is expected to be retrieved, however the token itself might contain more
information that here

While the primary token endpoint that is used by default in itemize will always
return a token for a given user id, other endpoints can return something else
these custom endpoints are meant for usage for non-clients, eg. sensors and they
are not meant to interact with the page but rather with the grapqhl API

#### Defined in

[server/custom-graphql/graphql-token-object.ts:21](https://github.com/onzag/itemize/blob/5c2808d3/server/custom-graphql/graphql-token-object.ts#L21)
