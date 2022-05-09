## NODE_ENV

The standard node environment variable that decides how the server is ran, there are effects on using
this variable on the three different values it takes

### development

The default mode, makes the application run into development mode, this has a couple of considerations.

- SQL queries are logged to console
- A logger transport get added to console
- Config files for development mode are used

### production

The production mode runs the server in the production mode

- Config files for production are used
- There's no logging transport in console
- SQL queries are not logged

## LOG_LEVEL

The log level for using the logging, this is very useful in combination with `NODE_ENV=development` where it would affect the data displayed, log level would mainly only affect the console transport and not affect file transports

### error

Only log errors, this affects the file transport

### info

This is the standard log level when `NODE_ENV=production` as this is what used by the file transports

### debug

This is the standard log level when `NODE_ENV=development`

### silly

Use this log level when attempting to find hard bugs, this logs basically everything and can crowd your logs very fast

## FORCE_CONSOLE_LOGS

By default console logging only happens in development mode, with this variable set to `true` you can force them to be piped to console, useful for debugging stubborn clusters without having to rely on elastic or file logging

## PORT

The port to be used, default is `8000`

## INSTANCE_GROUP_ID

An instance group id, this is required for use with clustering, you should really set one as the default value is `UNIDENTIFIED` when two clusters of individual servers send data to each other they need to know from which cluster they belong, otherwise they might end up overriding data unecessarily, make sure to keep an instance group id that is different per cluster, this is not necessary for development where there's only one cluster

When dockerizing the application cluster a INSTANCE_GROUP_ID is assigned based on the get deployable value

## INSTANCE_MODE

The mode where this server instance is running, this is because not all server instances are a copy of each other but they might run in slightly different modes and act different due to that reason

### EXTENDED

The extended mode runs the server and the server only, the extended mode servers are not allowed to listen for registered changes in the local redis cache; rather they will ask their cluster manager to do that for them by sending a local redis pub event informing the cluster manager that they have saved information to the redis database they intend to keep updated.

### CLUSTER_MANAGER

The cluster manager runs the cluster manager and the cluster manager alone, it doesn't even launch connections to postgreSQL, or would initialize any rest endpoints or API, the cluster manager recieves pubsub events from the pubsub redis database in order to update its own local redis database, when a cluster manager instance runs, it wipes its own local redis instance, as it tries to keep track of its cached data in memory.

Note that only one manager instace should run at a time, otherwise this will result in useless redis calls and possible data corruption as both instances fight for control of the local redis database.

### GLOBAL_MANAGER

The global manager that connects to postgresql and performs type mantenience tasks, this global manager then sends messages to the cluster managers and extended instances about any updates it has performed to the values in the database, these will in turn keep the users updated, mantaining the realtime of things.

The global manager can be split into multiple global managers, by default a global manager is started in absolute mode, however you can change it by using the environment variable `GLOBAL_MANAGER_MODE` which can take the following values

 - ABSOLUTE - will do everything and run every single service, useful for development however can also be ran like that in production
 - ELASTIC - will perform the elasticsearch consistency check if elasticsearch is available as given for the configuration
 - SITEMAPS - will use the seo generator in order to build the sitemaps for the website
 - SERVER_DATA - will be in use to update the server data, aka its currency factors
 - SERVICES - 

And when the variable is set as `GLOBAL_MANAGER_MODE=SERVICES` you can further specify which services you are tasked to run

### ABSOLUTE

The absolute is a combination of an extended instance, global manager and cluster manager instance, not only it manages its local instance, but also performs standard API server logic, this mode is useful when running a dev environment as you want to have as little complexity as possible, even when it doesn't show the reality of a real life cluster where there will be one CLUSTER_MANAGER and as many EXTENDED servers as necessary

### BUILD_DATABASE

A cheat mode to run build database from the built app, the reason this mode exist is because it provides easy access to a docker tty to connect and update the database without having to use a different docker build, remember to use `USING_DOCKER=true` when using it in this configuration, even when this instance mode would be rare to use.

### LOAD_DATABASE_DUMP

A cheat mode to run load dump from the built app, the reason this mode exists is the same of the previous

### CLEAN_STORAGE

A cheat mode to clean all the stored files for a given domain, it will wipe all the files there, use mainly for development, as you are likely to create orphaned files and clutter, it will use the current active domain, be careful when using this instance mode

### CLEAN_SITEMAPS

A cheat mode to clean all the stored sitemaps for a given domain

## USING_DOCKER

Default `false` because the same setup is meant to run inside or outside docker, but docker DNS is different from your host DNS, as docker networking has to be setup differently, when USING_DOCKER is true these things happen.

1. Redis self hosted databases resolve to `redis` rather than localhost
2. PostgreSQL self hosted databases resolve to `pgsql` rather than localhost

This allows to use the same config inside and outside docker, other than local name resolving everything else works the same way.

## NO_SSR

Default `false`

Disables server side rendering, useful for development

## NO_SEO

Default `false`

Disables seo indexing, useful for development

## FAKE_EMAILS

Default `false`

Emails do not get delivered instead get logged to console, useful for development

## FAKE_SMS

Default `false`

Sms do not get delivered instead get logged to console, useful for development

## FAKE_USSD

Default `false`

When creating an app that supports USSD, use the fake ussd mode to create an endpoint at `rest/service/ussd` that will allow to debug an USSD based application with a fake USSD interface, note that this service is dangerous because it allows anyone to identify as anyone else and is meant for development purposes

## NODE_TLS_REJECT_UNAUTHORIZED

Use this in development when running a dev environment in order to enable elasticseach to property connect when using certificates, it is used as `NODE_TLS_REJECT_UNAUTHORIZED=0`

If you don't wish to do this you should save your http certificate so that it can connect, however, every dev environment has a different certificate making it painful in practique.