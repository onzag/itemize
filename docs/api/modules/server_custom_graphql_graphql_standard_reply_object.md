[@onzag/itemize](../README.md) / [Modules](../modules.md) / server/custom-graphql/graphql-standard-reply-object

# Module: server/custom-graphql/graphql-standard-reply-object

This file contains the standard reply that would be given by a custom graphql endpoint
when this graphql endpoint does not return an error

## Table of contents

### Variables

- [default](server_custom_graphql_graphql_standard_reply_object.md#default)

## Variables

### default

• **default**: `GraphQLObjectType`<`any`, `any`, { [key: string]: `any`;  }\>

This standard reply is pretty meaningless for the user it is basically
just a messsage that should aid the developer on how it succeeded
in order to give errors you should use

throw new EndpointError({
  message: "whatever",
  code: ENDPOINT_ERRORS.UNSPECIFIED,
});

The standard reply exists because graphql needs something for success

#### Defined in

[server/custom-graphql/graphql-standard-reply-object.ts:21](https://github.com/onzag/itemize/blob/f2db74a5/server/custom-graphql/graphql-standard-reply-object.ts#L21)
