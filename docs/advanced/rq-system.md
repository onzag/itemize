# RQ System

The rq system was deviced to replace graphql in order to reduce the unnecessary sheer complexity of graphql that wasn't all used in itemize as well as to reduce the size of the request.

The RQ system creates a schema available at a GET request on the /rq endpoint.

Similar to graphql it provides two modes, query and mutation.

Queries have a name and are composed of the following.

## args

The arguments that the query takes.

### type

Type of the argument, it can be "string" | "boolean" | "object" | "binary" | "integer" | "number" | "integer-positive" | "any";

