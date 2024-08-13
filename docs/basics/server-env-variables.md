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

## FORCE_ELASTIC_REBUILD

If set to `true` forces elastic to delete its indexes and rebuild them from scratch, this is a dangerous option as indexes are synchronized with the database and when using this option everything will be redone from scratch

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

## NO_SSR

Default `false`

Disables server side rendering, useful for development

## LOUD_SSR_ERRORS

Default `false`

If NO_SSR is set to false, and LOUD_SSR_ERRORS is set to true whenever SSR fails instead of having a graceful fallback it will generate a traceback and return to the client, do not let this option enabled in production as it reveals parts of the app and how it works

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

## REFRESH_ADMIN_PASSWORD

Default `false`

If you forget your main admin password with user `admin` you can use this variable to establish a brand new password for it

# Developer Specific Environment Variables

Normally used for development and testing with itemize, they should not be used in projects directly or production builds

## EMULATE_ELASTIC_SYNC_FAILURE_AT

Provide a qualified path name so that every time single documents are attempted to be created or updated it will throw an error and fail

Does not affect sync checks and it's used to check sync checks.

## EMULATE_SILENT_ELASTIC_SYNC_FAILURE_AT

Provide a qualified path name so that every time single documents are attempted to be created or updated it will fail to write silently

Does not affect sync checks and it's used to check sync checks.

## ELASTIC_EXECUTE_CONSISTENCY_CHECKS_FROM_SCRATCH_AT

Provide a qualified path name so that consistency checks are done from scratch at a given pathname in order to fix consistency issues during runtime

## EMULATE_BAD_REDIS_WRITES

All redis instances act dead and throw errors, even when they connect; simulates connection issues

## TRUST_ALL_INBOUND_CONNECTIONS

Default `false`

Use if you see "invalid hostname" or "please visit the real site at" on development builds for testing

When connecting, itemize expects the client to be attempting to connect from localhost or from one of the specified domains and with no port; otherwise it believes it is being SEO hijacked, use this flag for disabling that in order to do computer to computer testing with raw IPs.

## FORCE_ALL_OUTBOUND_MAIL_TO

When sending an email via SMTP service, the receipient or recepients don't matter at all, since all the mail will be received by that one specific target, the data to send will be overwritten; this is useful in debugging and testing scenarios

## FORCE_ALL_OUTBOUND_SMS_TO

When sending an email via the phone service, the target or targets don't matter at all, since all the messages will be received by that one specific target, the data to send will be overwritten; this is useful in debugging and testing scenarios

## DISABLE_CONSISTENCY_CHECKS

Default `false`

Normally you don't want to use this value, consistency checks are used to ensure that elasticsearch indexes are up to date and are consistent, normally this only fixes bugs related to the server itself, like bad writes, network errors, etc... disabling consistency checks is nevertheless good for when you may want to reduce the amount of logs in a development environment, or debug issues with search that use searchengine that fix themselves after a consistency check (shouldn't happen).

You may still see a consistency check happen, but this is ran when the instance is prepared for the first time; this is because elasticsearch may be empty with no data, and the consistency check fixes that; what DISABLE_CONSISTENCY_CHECKS=true does is disabling the timed consistency checks that happen every so often.