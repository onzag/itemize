# Initialization

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

### Things to Consider

Please ensure docker is installed and running

Before running this step you might want to consider getting api keys from the following services, without these Itemize will not work at its full potential, if you are coming from the tutorial you might skip all these

`https://www.ovhcloud.com/en-gb/public-cloud/object-storage/` You need an openstack object storage container, for usage for files and sitemaps, it's necessary for SEO and file support, OVH is one such provider, without adding an object storage provider, the file types and file uploading won't work whatsoever.

You might get many of these containers in order to setup a CDN of kinds, different countries can have different containers where data is stored for such.

`https://developer.here.com/` For usage in geocoding, geolocation, and autocomplete; the service doesn't need to be paid for initial usage; use it if you have the location type in your schema

`https://www.mailgun.com/email-api/` Mailgun email API, for usage to send emails to user as well as validation and recovery, if not available, you might want to consider removing the email and e_validated property and restructuring the app, without mailgun sending validation emails and recovering accounts as well as login with email is not truly possible.

`https://ipstack.com/` An ipstack api key, this should not cost any money and you shouldn't need to pay until you have more than 10000 users; without an ip stack key user tracking to set up initial language and country is not possible and will use the fallbacks.

`https://currencylayer.com/` A currency layer api key, this should not cost any money until due to the fact that itemize updates the currency factors only every so often, use only if you need/use currency types in your system.

### Initial Configuration

Since nothing is configured yet you need to run

`./node_modules/.bin/itemize setup`

Follow the steps that are requested, there are many of them, more often than not the default configuration works, but this might not be the case, you will need the following; you will be asked for the previous information, you mighst just press enter and accept everything; and then go to your config folder and setup from there

### Build your project

`npm run build`

This will run webpack, typescript compiler and the build data process that is necessary.

### Start a development environment (optional)

`npm run start-dev-environment development`

This will spawn both redis and postgreSQL using your development configuration

### Update your database

`npm run build-database development`

This will build the database

### Run a local server

`npm run start-dev-server development`

Starts a local server that is listening at port 8000, go to localhost:8000 and your server must be setup up and running.

## Initialize an already existing project

After you have copied the files for the project you will need the config files, the config files are not included in source control, as such you need to get them in a different way since they contain sensitive information.

After that

### Build the project

`npm run build`

### Start a development environment (optional)

`npm run start-dev-environment development`

This will spawn both redis and postgreSQL using your development configuration

### Update the database

`npm run build-database development`

This will build the database