# Itemize configuration

To configure itemize isn't the easiest nor the most straightforward process, it relies on a conjuction of different APIs 

## Create your first project

### Create a folder where you intend your project to be hosted

Make a directory say

`mkdir myprojekt`

And get into it

`cd myprojekt`

### Inialize a npm project and intall itemize

`npm init`

Follow the steps of this step, and then run

`npm install --save @onzag/itemize`

You need to have the right permissions in order to be able to access this npm module given that it is private

### Setup your project initial configuration

Before running this step you might want to get ahead of the game you need to get api keys from the following services

`https://developer.here.com/` For usage in geocoding, geolocation, and autocomplete; the service doesn't need to be paid for initial usage.

You need an openstack object storage provider

`https://www.ovhcloud.com/en-gb/public-cloud/object-storage/` OVH is one such provider, and the service login costs money, you will need such a container or otherwise the server won't launch, you can have many of these containers setup worldwide from different clusters.

`https://ipstack.com/` An ipstack api key, this should not costs any money and you shouldn't need to pay until you have more than 10000 users.

Since nothing is configured yet you need to run

`./node_modules/.bin/itemize setup`

Follow the steps that are requested, there are many of them, more often than not the default configuration works, but this might not be the case, you will need the following; you will be asked for the previous information, you mighst just press enter and accept everything; and then go to your config folder and setup from there

### Build your project

`npm run build`

This will run webpack, typescript compiler and the build data process that is necessary.

### Start a development environment

`npm run start-dev-environment development`

This will spawn both redis and postgreSQL using your development configuration

### Update your database

`npm run build-database development`

This will build the database

### Run a local server

`npm run start-dev-server development`

Starts a local server that is listening at port 8000, go to localhost:8000 and your server must be setup up and running.