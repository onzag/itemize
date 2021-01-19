[Prev](./04-search.md)

# Request

Now we need to have a way to make booking requests on the properties that we have added, and these requests will need to be approved, denied or ignored.

We want to send an email notification to the host when this occurs and to the requested as well when they have received a positive or negative answer.

## Creating the request schema

First we want to create the request schema, that will be used to define the item that specifies how a request to a property is to be generated, we will define such as:

```json
{
    "type": "item",
    "properties": [
        {
            "id": "message",
            "type": "text",
            "subtype": "plain",
            "nullable": true,
            "searchable": false,
            "maxLength": 255,
            "minLength": 25,
            "readRoleAccess": ["&OWNER", "OWNER_OF_UNIT"],
            "editRoleAccess": []
        },
        {
            "id": "check_in",
            "type": "date",
            "invalidIf": [
                {
                    "if": {
                        "property": "&this",
                        "comparator": "less-than",
                        "value": {
                            "exactValue": "today"
                        },
                        "method": "date"
                    },
                    "error": "DATE_IS_IN_THE_PAST"
                }
            ],
            "searchInvalidIf": [],
            "editRoleAccess": []
        },
        {
            "id": "check_out",
            "type": "date",
            "invalidIf": [
                {
                    "if": {
                        "property": "&this",
                        "comparator": "less-or-equal-than",
                        "value": {
                            "property": "check_in"
                        },
                        "method": "date"
                    },
                    "error": "CHECK_OUT_IN_THE_PAST_OR_SAME_DAY"
                }
            ],
            "editRoleAccess": []
        },
        {
            "id": "status",
            "type": "string",
            "subtype": "exact-value",
            "values": ["WAIT", "APPROVED", "DENIED"],
            "default": "WAIT",
            "coerceNullsIntoDefault": true,
            "nullable": true,
            "createRoleAccess": [],
            "editRoleAccess": ["OWNER_OF_UNIT"]
        }
    ],
    "requestLimiters": {
        "condition": "AND",
        "parenting": true
    },
    "mustBeParented": true,
    "canBeParentedBy": [
        {
            "module": "hosting",
            "item": "unit"
        }
    ],
    "parentingRoleAccess": ["&ANYONE_LOGGED"],
    "ownerReadRoleAccess": ["&OWNER", "OWNER_OF_UNIT"],
    "editRoleAccess": ["OWNER_OF_UNIT"]
}
```

You will notice a couple of things, both the date of check in and check out hold custom errors as they should be kept into a reasonable range and not a date in the past, they are using the conditional rule sets, which allows for schemas to hold some cross referenced shape; the "date" method allows for comparing dates, and "today" is an special value that refers to this same day.

The request limiter means that no search can be requested without the attributes specified in there, in this case, we are demanding for a parenting rule to be defined, this means no global searches without attributes can be taken.

We are defining that requests must be parented by something, and we define that something to be module hosting, item unit; which means every request will have to be a children of a hosting unit.

Anyone who is logged can make a request, and we are surprisingly allowing anyone to search these requests, this will allow us to get all the requests for a given listing and make them disabled so that they cannot be selected; however this could also let some data leak, the message that we are defining and the owner of who made that request, this is information we don't want anyone to access, except the creator or whoever owns the unit.

For this scenario we are using the `["&OWNER", "OWNER_OF_UNIT"]` role access rule, and defining them both in the `ownerReadRoleAcces` and `readRoleAccess` of the message, but you might realize that there's no such thing as an `OWNER_OF_UNIT` in our roles, not to add that role is highly specific to the request itself.

In that sense we need to define a custom role, custom roles are a server side mechanism, we go to our `src/server/index.ts` file and add for the custom properties on the initialization.

Right after our `seoRules` on a new object we must add:

```ts
{
    customRoles: [
        {
            role: "OWNER_OF_UNIT",
            item: ["unit"],
            module: ["hosting"],
            grant: async (arg) => {
                // if there's no parent
                // we give false
                if (!arg.parent) {
                    return false;
                }

                const parentItem = await arg.cache.requestValue(
                    arg.parent.type,
                    arg.parent.id,
                    arg.parent.version,
                    {
                        // the memory cache is a volatile and extremely fast but not realtime
                        // cache that sits directly into the ram, usually values are requested
                        // from redis, and redis is kept in realtime, but the memory cache is static
                        // however it lives only for a couple of milliseconds, in practique, specially
                        // when you expect to reuse the same value several times on a row on
                        // different operations, using memory cache is endorsed, honestly small
                        // millisecond windows of non-realtimeness is barely an inconvenience for
                        // all the extra speed this adds; on critical operations, you might not
                        // want to use it
                        useMemoryCache: true,
                    }
                );

                // if we get no parent, weird, because there should be one
                // always but who knows about that one edge case, we return false
                if (!parentItem) {
                    return false;
                }

                // now we are the owner if the parent is our requester
                return parentItem.created_by === arg.tokenData.id;
            }
        }
    ],
}
```

What we are doing is that we are creating a role that only exists withgin the hosting/unit item, and we grant that role by checking the parent of the item, custom roles can be extensive and have a degree of relationship with triggers.

Now we do need to define the properties file for the schema we have just created:

```properties
[en]

name = booking request
search_field_label = search for a booking request
search_field_placeholder = type information about the booking request
search_keywords = booking, request
search_value_too_large = search is too long

custom.request = make request

properties.message.label = provide a message
properties.message.placeholder = write a message to your potential host
properties.message.description = A message to the host is very important to improve your chances of getting a booking request accepted
properties.message.error.TOO_LARGE = the message is too long
properties.message.error.TOO_SMALL = the message is too short

properties.check_in.label = check in date
properties.check_in.placeholder = check in date
properties.check_in.search.range.from.label = from check in date
properties.check_in.search.range.from.placeholder = from check in date
properties.check_in.search.range.to.label = to check in date
properties.check_in.search.range.to.placeholder = to check in date
properties.check_in.error.DATE_IS_IN_THE_PAST = the date cannot be in the past
properties.check_in.error.NOT_NULLABLE = you must specify a check in date
properties.check_in.error.INVALID_VALUE = invalid date
properties.check_in.error.FROM_LARGER_THAN_TO = date range is invalid
properties.check_in.error.TO_SMALLER_THAN_FROM = date range is invalid

properties.check_out.label = check out date
properties.check_out.placeholder = check out date
properties.check_out.search.range.from.label = from check out date
properties.check_out.search.range.from.placeholder = from check out date
properties.check_out.search.range.to.label = to check out date
properties.check_out.search.range.to.placeholder = to check out date
properties.check_out.error.CHECK_OUT_IN_THE_PAST_OR_SAME_DAY = the check out cannot be the same day or in the past to the check in
properties.check_out.error.NOT_NULLABLE = you must specify a check out date
properties.check_out.error.INVALID_VALUE = invalid date
properties.check_out.error.FROM_LARGER_THAN_TO = date range is invalid
properties.check_out.error.TO_SMALLER_THAN_FROM = date range is invalid

properties.status.label = status of this request
properties.status.placeholder = status of this request
properties.status.values.WAIT = waiting for answer
properties.status.values.APPROVED = approved stay
properties.status.values.DENIED = denied stay
properties.status.null_value = unspecified
properties.status.search.label = search by status of request
properties.status.search.placeholder = search by status of request
properties.status.search.null_value = any
properties.status.error.NOT_NULLABLE = you must specify a status

[es]

name = pedido de reservación
search_field_label = búsque un pedido de reservación
search_field_placeholder = inserte información referente al pedido
search_keywords = reservación, pedido
search_value_too_large = los parámetros de búsqueda son demasiado largos

custom.request = hacer pedido

properties.message.label = escriba un mensaje
properties.message.placeholder = escriba un mensaje a su anfitrión potencial
properties.message.description = El mensaje es algo importante ya que ayuda a incrementar tus probabilidad de que acepten tu pedido de reserva
properties.message.error.TOO_LARGE = el mensaje es muy corto
properties.message.error.TOO_SMALL = el mensaje es muy largo

properties.check_in.label = día de check in
properties.check_in.placeholder = día de check in
properties.check_in.search.range.from.label = desde día de check in
properties.check_in.search.range.from.placeholder = desde día de check in
properties.check_in.search.range.to.label = hasta día de check in
properties.check_in.search.range.to.placeholder = hasta día de check in
properties.check_in.error.DATE_IS_IN_THE_PAST = el día no puede ser en el pasado
properties.check_in.error.NOT_NULLABLE = debe especificar una fecha
properties.check_in.error.INVALID_VALUE = la fecha es inválida
properties.check_in.error.FROM_LARGER_THAN_TO = el rango es inválido
properties.check_in.error.TO_SMALLER_THAN_FROM = el rango es inválido

properties.check_out.label = día de check out
properties.check_out.placeholder = día de check out
properties.check_out.search.range.from.label = desde día de check out
properties.check_out.search.range.from.placeholder = desde día de check out
properties.check_out.search.range.to.label = hasta día de check out
properties.check_out.search.range.to.placeholder = hasta día de check out
properties.check_out.error.CHECK_OUT_IN_THE_PAST_OR_SAME_DAY = el día de check out no puede ser el mísmo o en el pasado del check in
properties.check_out.error.NOT_NULLABLE = debe especificar una fecha
properties.check_out.error.INVALID_VALUE = la fecha es inválida
properties.check_out.error.FROM_LARGER_THAN_TO = el rango es inválido
properties.check_out.error.TO_SMALLER_THAN_FROM = el rango es inválido

properties.status.label = estado del pedido
properties.status.placeholder = estado del pedido
properties.status.values.WAIT = en espera
properties.status.values.APPROVED = aprovado
properties.status.values.DENIED = denegado
properties.status.null_value = sin especificar
properties.status.search.label = busque por estado de pedido
properties.status.search.placeholder = busque por estado de pedido
properties.status.search.null_value = cualquiera
properties.status.error.NOT_NULLABLE = debe especificar un estado
```

And now we have just made the schema and endpoints we are required in order to create these reservations and requests.

## Building the reservation request page

We need now to build the page that will allow us to view the property we want to book and then create a reservation mechanism on it, 

## Securing the status of the request

## Sending email notifications

## Ensuring non-overlapping requests and responses

## Displaying overlaps in the client side