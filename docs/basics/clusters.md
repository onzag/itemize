# Clusters and Infraestructure

Itemize works by generating a cluster of servers that runs in a common network, where these servers work independently and are interconnected in a centralized database that acts as the single source of truth.

## The Database

The database acts as the single primary source of truth and among the file storage solutions is the only place that information is stored permanently.

The database is accessible by each one of the clusters, so if one of the clusters is breached and they get hold of the credentials this can be a huge security issue, which is why your clusters must be properly secured.

As of the time of writting the documentation the database should be a postgis enabled postgreSQL 13+ database, at least in order to ensure full compatibility, specially given its geographical search functionality and full text search.

In itemize there's the concept of dictionaries, these are direct representations of the dictionaries inside of postgreSQL, by default postgreSQL ships with the following dictionaries:

- simple
- danish
- dutch
- english
- finnish
- french
- german
- hungarian
- italian
- norwegian
- portuguese
- romanian
- russian
- spanish
- swedish
- turkish

In order to add more dictionaries a whole process has to be defined which usually requires access to the underlying hardware to install dictionary files that allow postgreSQL to understand how to match words for the given language.

### Database Scale 0

A scale zero database is a temporary database that is not meant to scale, it's what it is used in the development build and it basically runs locally inside a docker container.

### Standard Scale Database

A standard scale database runs at a central location alone, (eg. the EU) and each cluster must access into that location, such a database should have backup mechanisms in place and should only be accessed by clusters or otherwise authorized people. A standard scale database can scale further.

### Replicated database

A replicated database is the highest form of the scale factor of the centralized database, where a master database exists, and replicas are made around the world, clusters may decide which endpoint to use based on their physical location.

## Clusters

An itemize production build contains 1 or more clusters.

A singlecluster build that runs on the same machine has advantages being able to serve its own files using the hard drive as file storage, given that the endpoint will always answer to the same cluster which should run in the same machine and network. However keep in mind that moving from a singlecluster build that stores files locally to one that stores files in a specialized solution can be rather challenging because the new added cluster will not have the data unless you copy with it in each build, and unaware clusters will not delete the data when the user requests to causing privacy concerns.

Multicluster builds act like a CDN, only for dynamic data, each cluster has its own unique IP and they are load balanced to each one of the extended instances that actually do the processing.

With a replicated database the endpoint for the production database of each cluster can be different, for example a cluster which exists in a machine in Bolivia could make use of a database replica in Chile, rather than using the master in Germany.

Because each cluster has a different IP address, you may want to use a GeoDNS service in order to handle the requests, 

### Composition of a cluster

A cluster contains a single codebase that acts in different ways depending on the initialization mode, it is a single, static docker image with the prebuilt source code of your application into a container; the resource will however attempt to load information on the real machine's hard drive regarding:

- Basic configuration
  * Where is postgreSQL (either main or replica)
  * Where is redis? (it may exist within the cluster itself)
  * Where is global redis?
  * What languages does it suppport?
  * What are the available dictionaries?
  * What should be in the manifest file?
- SSL Certificates (if the load balancer, proxy exists within the cluster)
- Orchestation File(s)

Currently the orchestation file comes in docker compose and a couple of shell scripts for scale, efforts should be made into making these orchestation files work into kubernetes too.

#### Global Manager

Inside the cluster docker image an instance exists which is setup to be the global manager, the global manager shall only exist once overall; even among clusters, inside the master cluster, and such a cluster may be decided not to expose in order to protect the global manager. The global manager sends simple periodic commands to the database and other user defined action that should be one of a kind:

 - Update currency table. (load is in database)
 - Update currency prices in the database. (load is in database)
 - Inform all clusters of new currency data.
 - Perform SEO tasks.
 - Run global services (keep them simple and do not overload the global).

The global manager does not answer to HTTP requests.

##### SEO Tasks of the global manager

The global manager will use a set of instructions that exist within your server configuration about collectables when you initialize the itemize app, and collect information directly for the database in order to build a sitemap.

This procedure can be quite aggressive, so you may wish to leave less important stuff out of the sitemap, and let the robot which crawls your website to find these resources by itself, given that itemize does SSR this should be straightforward.

Note that as the time of writting of this document, automatic searches are not SSRed.

#### Global redis

Global redis is a redis database that is used to send events between clusters:

 - Contain the server global data (currently only currency info is there)
 - Inform of update global data.
 - Clusters register themselves for the data they hold and wait for events.
 - When one of the clusters modifies the database, all listening clusters for that data get informed to refresh.

#### Local Manager

The local manager that also exists inside the cluster source and is a simple instance that exists 1 per cluster, within that cluster; its job is to:

 - Inform global redis of changes in the database any of the extended instances have performed.
 - When a extended instance downloads info for an item, it informs the local manager to keep it up to date, unless it is released.

This means that in each cluster, all commonly used information is copied in memory and remains in memory for a while; the more a cluster is used, the faster it gets as it optimizes itself with the data it mostly uses.

This however does not apply to search because running searches in memory is not possible, only direct retrieval.

#### Extended Instance

Extended instances do most of the heavy lifting of the app they:

 - Download resources from the database that are not in memory cache (redis) and tell the local manager to keep them up to date.
 - Listen for changes on resources that the connected user over its websocket is listening to (via global)
 - Answer to HTTP requests.
 - Execute triggers.

Each cluster can have as many extended instances as it needs, when an extended instance dies, the user can safely use the next one, they are clones, that act the same way, they can be killed, spawned and restarted.

Each extended instance has however its own internal memory cache for its own processes; users that are moved from one instance to another should be requested to reconnect, as if they had lost connection; because the new extended instance has no clue what the user is listening to for realtime updates as that is stored in memory.

There is also a small amount of data that is stored during checking of security rules, usually milliseconds worth of; so it's not a long term cache.

#### Local Redis

The local redis cache acts as a hot memory based database that contains rows from the database that are most commonly used, and considerably speeds up the functionality of the cluster.

 - Serve as a pipeline between extended instance and local.
 - Serve as hot storage for these rows.

### Absolute Instance

The absolute instance is basically a simple instance of the application that is initialized in absolute mode, and acts on its own like an entire cluster; it acts both like a global manager, local manager and extended instance at once; while being a single instance, it communicates with itself via redis both local and global and answers to itself.

This mode is not meant for production but for development, it cannot handle much of a load by itself, it uses a single thread and is doomed to use only 1GB of memory peak.

### Master Cluster

The master cluster contains the global manager and maybe global redis (unless global redis is independent) within itself; the master cluster should be close to where global redis and postgreSQL exist, and indeed physically close in order to minimize latency.

### Extended Clusters

Extended clusters are all those clusters that don't have a global manager within themselves, they are just meant to server a portion of a group; these should exist in different physical locations and act like a CDN of dynamic data.

## File Management

Itemize requires a storage provider to function properly, storage providers such as openstack and S3 are designed to store files, the infrastructure on how storage is defined makes it so that files are stored in servers that are physically close to where they are most expected to use.

This is done in configuration by defining containers, there's a master container aka as if fail to find a suitable container use this one, and that should be the default, by default the master container is just a save to disc storage solution.

This is why each item in itemize has an assigned container id where all the files are to be stored, the "*" or master container tends to be the default, but you can assign containers per country.

These files are static and stored with an unique id and are not secure by anything other than how ridiculous this entire id may be that you won't find such file unless you got the row with the id in it and the given container that it is.

They are immutable too, which means that once a file is created, it is never modified, but it may be deleted; this is done by design, not only this information can be merged safely, but also allows for offline caching given this assumption.

## Offline Functionality (PWA and client side solutions)

Each client has their own database, that much like the one in a local cluster, holds information that it deems necessary; this database can perform a huge range of operations and keep itself updated by communicating with an extended instance for feedback.

The app itself is cached in the standard cache solution

An Itemize client side app does not make that many HTTP requests unless it is not sure if what it has in its own memory is up to date, for that it performs feedback requests; where it sends the last modified signature of each resource in order to get information about wether such has changed, standard role access rules apply.

While the basic structure of the app is always cached, such as all the logic, source code, and the standard images; the fetched resources are not cached by default, however caching these resources, enables the app to work fully offline; both searches and single resources are cacheable, however cached searches have very limited search functionality since indexed db does not have the same capabilities as postgreSQL.

## Etags

Itemize makes heavy use of etags in order to further optimize the flow of data, by not having to send any unnecessary data when the client already has this data in the cache.

For this it performs SSR rendering against a signature (the etag), if the signature matches, then the response is considered the same; and a 302 Not Modified is given.

## Pluggables and 3rd party services

Itemize allows for a lot of control on how it works internally, every provider, bit of interface, etc... can be changed, with the following exceptions:

 - The database should be postgreSQL.
 - The cache(s) should be redis.
 - The server side runs express and rq.
 - The programming language is typescript.
 - The client side works with react only.

Apart of that, you may integrate other things as you see fit; you may willingly use any service provider or integrate new rest endpoints; you may replace here maps with mapbox or another provider, even use a different one by country; you may use mailgun, mailchimp, protonmail, or your own custom mail server using pigeons.

Users can get their own token and perform actions directly to rq with POST requests, which means that each user has its own API key with limited functionality where everything they can do in app, they can do programatically, while the API isn't that human readable, because it is auto generated, it tries to be as much as it can.

Regarding payments this one is a big deal, because a Payment provider is probably one of the most complex pieces of code you may need to build, by default it is `manual-payment` which basically means every payment processed remains in an ongoing state until manually verified, basically a cash payment.

Payments can be integrated into whatever solution required and even a different solution per country in consideration, it can be as complex or as simple as needed be.