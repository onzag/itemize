# Beyond this tutorial

There are things not covered in this tutorial that might have proven useful for building an app more meant for the real world, as this was supposed to be a crash course on how to use all the features of itemize, even the rarer ones, and I tried not to repeat myself.

Feel free to implement them yourself if you wish to, but they are considered out of scope.

## Reviews

Reviews could have been achieved by writting a rewiew schema and having a trigger that creates a review, 

## Price locking and a payment mechanism

As the time of writting of this tutorial itemize did not have the payment type, however it is absolute possible to use custom rest endpoints to process the payment of a request, that is a lot like going back to the basics of processing the payment all by yourself. Check out the API to figure out how to write custom rest endpoints and having them affect the underlying itemize data, by requesting updates via the cache layer; it should remain being realtime and keep its offline functionality when done properly via a custom rest endpoint.

If itemize already has a payment type, with its own provider and fast prototyping renderer that you must configure yourself, then it should just be a matter of creating a payment type linked to a currency property and having a trigger change the status of the request once it fullfills.

## Testing

Itemize comes with a default testing mechanism, and it doesn't use a default testing library as tests can be automatically generated so it uses its own testing methodology where tests are child of each other and execute in order, they analyze the information you have and work based on that, while it might not be the best way to test rather than manually writting tests for each little feature, this is better than nothing, and it can actually catch errors.

At the time of the writting of this tutorial, tests are a feature in development but the mechanism to start them would be via the script `npm run test-development` while you have a standard development build going on with the dev environment and the start-dev-server with SSR and SEO enabled.

The development server is recommended for tests because it has tools in it that allows to test more stuff than a production server, there's also `npm run test-production` to test against a production build.

This is what a standard testing looks like.

![Itemize Testing](./images/itemize-testing.png)

The file that specifies these tests resides in `tests/index.js`

## Custom Mail

Itemize holds potential to be used as an email client, and comes with support to send and receive emails with an email provider; technically every user gets an email at the location of their user, for example, as an admin your email is `admin@mysite.com` and if setup properly you will be capable of receiving emails, emails can be external or internal, with the possibility to setup spam filters.

## Search Engine

At the time of writting of this tutorial itemize did not have support for search engine, however this is now a very powerful capability, searches can be resolved using a elasticsearch for even more potential of language support and scalability during searches; items will therefore be copied from the SQL database and keep synchronized with an elasticsearch cluster.

For example the `mail/mail.json` component is marked with `"searchEngineEnabled": true` in its json schema definition, that means that every single mail that is availiable in postgreSQL will be available with a search engine.

A search engine provides more optimization in the search properties, and items are stored on a language basis and all properties are expected to be a specific language; when doing a search and wanting it to be resolved with the search engine, `useSearchEngine: true` can be used in the search options, also `useSearchEngine: "hu"` can be used where the string represents the language to do the search with, by default all languages will be used, so this should allow for quicker much more optimized results.

When building a search engine item schema, you should specify the language to use; for that `searchEngineLangUseVersion: true` will make it so that the version is used as the language identifier for elasticsearch, `searchEngineMainLangProperty: true` will expect a text property identifier (as all text properties have a language) and will use that to index the item, or even `searchEngineMainLangBasedOnProperty: true` which expects a string property identifier, and its value itself will be used.

Any changes to the schemas will cause everything to be reindexed, the source of truth is postgreSQL.

## Kibana and Logs

At the time of writting of this tutorial itemize did not have support for proper logs, now since the search engine is availiable, itemize will log directly to elasticsearch; there information about the status of each cluster is available, memory usage, as well as errors and warnings.

## CDN and GeoDNS

Itemize can act as a CDN by itself, but multicluster builds are quite complex and mostly unnecessary until the product is rather large and international; itemize is however not highly available by design, it's simply offline resistant, and downtime is expected.

# Future expectations

Some features of Itemize are in there but are still in development (or haven't been properly tested to be relied upon)

## Includes

This feature came from day 1 but it's untested, itemize can merge items together by including another item from the same module and adding properties from it; itemize was originally designed to create a website for engineering items, so that more complex parts could be designed by inheriting their attributes; hence the name `itemize` it was an inventory system.

But it pivoted later to be what it is now, however includes remain in the system; but they have never been used/tested, they remain in there; eventually they should be tested so that the original conception is executed.

## USSD

Itemize was also designed to take on difficult markets where connections are not good, this was part of the reasons of pivoting; and currently there's development for USSD apps development within the itemize system; the idea is to take on difficult areas of Africa and the Middle East where internet access is limited and provide services even there.

After all it was the reborn purpose of itemize to be available and offline resistant; currently the USSD protocol is in development, however it is already possible to use `FAKE_USSD=true` to get a fake phone service to test the USSD app `FAKE_USSD=true` is a security vulnerability nevertheless, do not enable in production; as it allows users to login as any other with their phone number alone.