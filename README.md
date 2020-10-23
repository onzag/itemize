> :warning: **WARNING**: Project in Alpha
> :warning: **WARNING**: Project is Experimental

# ItemizeJS

Itemize is a fully featured end to end library powered by react, postgresql, graphql, docker and redis to create fully featured internationalized scalable realtime offline first websites; Fast, very fast.

The aim of itemize is to be a library that can produce and deliver results fast, reliably and cheaply; and that these results can also be the final product and not just a prototype; scale is key.

# **WARNING** Alpha

This library is in alpha, it's incomplete, documentation isn't done and might be misleading, and while everything that is described in this document is currently functional as described there might be bugs and issues, undocumented, untested features, the library will be considered mature once it hits version 1.0 which might take until 2021

# **WARNING** Experimental

Itemize is an experimental library that defies some of the most common development patterns, meta analysis and self optimization is common, it aims to take the burden away from the developer and put the focus on what the final user will see; however this means currently things are fast changing, and features might be removed.

## When to use Itemize

Itemize was made to create web software in a large range of needs, for the most part almost any new web software can be created using itemize, as such it is an excellent tool for startups that need a fully featured complex app.

However Itemize is a fully featured end to end library, which includes its own server, protocol (on top of graphql) and client mechanism, and while it can indeed communicate with other clients and add services on top of it, attempting to merge two server technologies can be cumbersome.

## Features

### Ease of Development

Itemize was made for fast and efficient development, the code that is generated is meant to work and do it well and simply; as such very little knowledge of databases, graphql endpoints, rest endpoints, etc... is necessary, you just write json schema files, build the app and write react code, itemize figures what to do based on that information.

As such, even the most junior programmer should be able to write feature rich complex apps with itemize; itemize is also technical debt tolerant, and spagetthi code tolerant, it was designed that way.

### Testing

Testing and test cases are automatically generated based on the application design and structure, rather than manually written tests; this allows for the application to test itself as it's written based on assumptions, these assumptions can be set by the developer, but the analyzer does most of the heavy lifting so you might not even need to write any custom tests.

### Internationalized

Itemize was made so that it doesn't assume any primary language, internationalization is enforced, as it has a global approach.

Itemize is also able to track the user IP in order to be able to predict a first's user language and region.

### Currency and Currency Exchanges

Itemize currency type, provides values for currencies and these currencies can be displayed in any other currency that itemize supports; the factors are automatically updated using a currency layer API key, this means that currency values are displayed and converted to the current market value of what the user wants to see

### Secure

Security is automatically generated based on schemas and user roles, this security can be fairly strict; for specific security rules, triggers can be made for fine tuning.

### Fast

Itemize provides several layers of caching, global level, cluster level, HTTP level, service worker, cache worker, and memory.

This ensures that the application is extremely efficient on data requests, and that it can even work offline using the client side caches.

Most of this is handled automatically by itemize, such as cache invalidation, so there's no need to worry; only the memory cache is handled by the developer, but it comes in a rather intuitive way.

### Scalable

Itemize uses docker in order to generate clusters, where the main source of truth, postgresql, remains centralized and managed by a global manager, clusters will copy information locally on the cluster level caching using redis, and will keep this information up to date as the global redis informs updates.

Clusters are deployed in different regions and can have their own unique IP which you might route via GeoDNS, this means that you have a CDN out of the box, not only that but uploads are also localized to regions using OpenStack containers.

By default itemize works with one single cluster and bundles the global manager and cluster manager within itself, which is enough for simple services, but you might scale later on without any friction.

### PWA Enabled

Offline first websites, with service workers and locally copying graphql responses into an IndexedDB database (if avaliable) allows the application to work as if it was a native application.

PWA logic comes out of the box with every itemize installation.

### SSR Enabled

Server Side Rendering is generated by self analysis of the UI tree, resources are prefetched asynchronously, no configuration is needed, no resources need to be manually prefetched, no suspense API, it just works.

### SEO Enabled

Ability to automatically generate sitemaps and update these, this with SSR should make it so that the website ranks high in search engines.

### Realtime

Every item in itemize is realtime, and as such changes populate over all the network when it detects so.

### Mail Integration

Using a Mailgun API key, itemize will be able to validate and send emails to users.

### Fast Prototyping

Itemize comes with a fast prototyping out of the box, which uses Material UI; this allows to create itemize applications fast; note that the Itemize core doesn't have any UI features, hence the fast prototyping module exists for that.

### Geographical Support

Itemize supports geography and geographical search out of the box, using openstreetmap for display on its fast prototyping mode, and an Here Maps API key allows for address autocompletition.

### Rich Text

Itemize supports rich text and rich text based search out of the box with file support

## How Itemize differs from

### WordPress

Wordpress is a tool to create simple websites to give a web precense, while it is possible to modify and add a lot of functionality on top of it, such as ecommerce, itemize offers much more functionality and it's much more complex; for a simple web presence, wordpress will be the tool to use, itemize is to make much more complex apps with more needs.

### Plain ReactJS + Graphql + PostgreSQL + NodeJS stack

A plain stack is very powerful and can morph into anything and make anything, after all, Itemize is this same stack with a lot of features on top of it, the issue is that you would have to create a custom infraestructure and spend a lot of time developing it, when itemize comes with these out of the box and hides all this configuration so that the developer can focus on making what is important for the user

### MeteorJS

Meteor is what comes closest to what itemize is, but while Meteor works best with MongoDB but can be integrated with SQL database but losing the realtime support, Itemize works only with PostgreSQL (which is more performant than mongo) and keeps its realtime functionality, meteor is much more flexible than itemize as a framework, but itemize offers a streamlined strict process; both have their place; advantages of itemize over meteor include.

 - PostgreSQL with realtime support.
 - Offline First out of the box without configuration.
 - SSR is enabled with no configuration.
 - SEO is enabled with very little configuration.
 - Internationalization is Enforced
 - Automatic currency support and exchange rates
 - Automatic geographical support
 - Automatic mail support
 - Several layers of caching.

Meteor and Itemize are different as a concept of what they want to achieve, Meteor is a framework to build apps as flexibly as possibly to integrate with the favorite developer technology, with itemize there are no options, it provides a single stack, but as such, it can be more streamlined and effective; Itemize wants to reduce costs, reduce technical debt, accept that in startups spagetthi code is a fact of life, Itemize wants to soak common problems, so code doesn't need to be perfect, amazingly tested, or perfectly documented, it just needs to work, Itemize philosophy is about the end product, to provide a process, it includes a business mindset in it.
