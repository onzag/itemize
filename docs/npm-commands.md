## npm run install

Runs the typescript transpiler to build the server build

## npm run tsc

Runs the typescript transpiler to build the server build

## npm run webpack

Runs the webpack transpiler to create the web production builds, note that the production builds do not mean that they are only accessible when the web is ran with production configuration, there's a difference between the web app production/development builds and the server development/production environment, while in your application client data using NODE_ENV refers to this mode, in your server data NODE_ENV refers to the three values, and they can be combined.

itemize builds the client in a way that both can be accessed no matter the mode, you can access production builds from development mode and vice-versa, any combination is possible; however when developing you are most often interacting with development builds, by default the client mode is setup to production if the client is not connecting from localhost, a cookie can be set to toggle this development mode and is accessible via the SET_DEV_MODE(mode, key) function that is available from the console of any build, where mode is development or production and the key is the devKey in your sensitive config

## npm run webpack-dev

Runs the webpack transpiler to create the web development builds, the same logic as the production builds applies, these builds are onl available by default when the host you connect from is localhost

The webpack dev mode is useful when developing, but you should disable service workers in order for this command to be usable, otherwise due to an equal build number the caches might refuse to update service worker data leaving you with the same build as if nothing has happened.

## npm run webpack-analyze

Runs the webpack transpiler to create production builds but also uses the bundle analyze plugin as well

## npm run build

Runs both tsc, webpack, webpack-dev and build-data combined giving a new buildnumber and a fresh app, this should be the go to command before spinning a new app version.

## npm run build-data

Builds the data of the app for the many languages and spawns a new version of the app, note that for this new data to be loaded the server needs to be reloaded; as the old data is often kept in memory (but not all!), this means that there might be inconsistencies with new and old data, so once you rebuild the data it is recommended to restart the server, the client will then detect this change and request an update.

## npm run build-database [development|production]

Do not run this command before running build-data as this command requires the data to have been built in order to read the resulting files and decide how to build (or rebuild) the database, this is a very delicate process so ensure to have saved copies of your database before doing this in case of corruption.

the development or production arguments is what is used to decide which databse to connect, yes, you can update the database remotely using this script.

## npm run get-deployable [development|production] [(INSTANCE_GROUP_ID)] [full|standard|slim|(comma separated list of services)]

Provides a deployable in the deployments folder intended to be setup in the cloud via docker compose, the first argument selects which version is what is supposed to be used, development or production, you would most likely be choosing production unless you deploy your development builds in a cloud as well.

The instance group id represents your cluster id, this should be unique per cluster deployed, eg. if deploying in Germany you might want to name your cluster GERMANY, if in USA west coast, you might want to name it WEST_COAST, just to keep the clusters organized, make sure to keep different ids for different clusters or otherwise they might think they are the same cluster and miscommunicate.

This process wil ask your password several times as it relies heavily on docker

The mode needs to be explained in depth

### full

Same as `cluster-manager,servers,redis,nginx,global-manager,pgsql` includes basically all the services needed for a standalone cluster that needs nothing else but itself, more likely than not either this is the primary cluster where the central database is hosted or is an isolated cluster, eg. say a Chinese cluster; or is some form of development cluster.

What makes clusters be communicated is the pubsub, global cache and central database; as that means they share the same data.

### standard

Same as `cluster-manager,servers,redis,nginx` a standard cluster build where it includes all it needs to be a single cluster but has no central database, the standard mode to use as there should be a central managed database in your production servers; the redis represents the local cache of the system that is used to speed itself up, in this form it is expected that the global cache and the pubsub are other servers.

### slim

Same as `cluster-manager,servers,nginx` a slim cluster that doesn't even contain its local redis database, you might want to use this mode if you spawned your local database in some other form.

## npm run start-dev-environment [development|production]

Launches both redis and postgresql in docker containers, it is expected you populate the data by hand using `npm run build-database` it is a development environment as these are not intended for production, they use single docker, note this asks your password several times

## npm run stop-dev-environment [development|production]

Stops the development environment that you have already instantiated, also asks for your password.