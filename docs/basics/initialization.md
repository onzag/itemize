# Initialization

To configure itemize isn't the easiest nor the most straightforward process, it relies on a conjuction of different APIs

## Install the main dependencies

- NodeJS `https://nodejs.org/en/download/`
- Docker `https://docs.docker.com/get-docker/`

## Create your first project

### Create a folder where you intend your project to be hosted

Make a directory say

`mkdir myprojekt`

And get into it

`cd myprojekt`

### Inialize a npm project and intall itemize

`npm init`

Install the peer dependencies, note that material ui is only used for fast prototyping, and you can get rid of it afterwards by deciding not to use it in your project but it's necessary for proper initialization due to it being a dependency for fast prototyping client components (you'd get an error otherwise)

`npm install --save react react-dom @types/react @types/react-dom @mui/icons-material @mui/lab @mui/material @mui/styles`

Install itemize

`npm install --save @onzag/itemize`

### Things to Consider

Please ensure docker is installed and running

Before running this step you might want to consider getting api keys from the following services, without these Itemize will not work at its full potential, if you are coming from the tutorial you might skip all these.

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

You might see the warning of

```
Missing resource file: privacy-policy/en.html
Missing resource file: terms-and-conditions/en.html
Missing resource file: contact/en.html
```

This is okay, it is just a warning, it is endorsed that you have these resources as part of your bundle, but they are not necessary for the application to work, after all you might decide that you want to handle these as fragments or versioned localized items of their own.

### Start a development environment (optional but necessary if you don't have an external database/redis)

`npm run start-dev-environment development`

This will spawn both redis and postgreSQL using your development configuration

Remember to stop the dev environment once you are done

`npm run stop-dev-environment development`

### Update your database

`npm run build-database development`

This will build the database

### Start the development server

`npm run start-dev-server`

This will start the development server locally and listening at localhost:8000

### Access your application

Open your favorite browser and go to `localhost:8000` it should be up and running there

## Initialize an already existing project

After you have gotten the files for the project you will need the config files, the config files are not included in source control, as such you need to get them in a different way since they contain sensitive information.

After that you should run `npm run build` and then you might start a dev environment via `npm run start-dev-environment development` and if required you should run `npm run build-database development`, if your project has a `dump` folder which includes the databse dump that might be necessary to make the database function you will have to import those dumps using `npm run build-database development load-dump`

Then start a dev server via `npm run start-dev-server`

## Additional Steps

### See the automatically generated graphql endpoints

If running a development server, you should have a graphqliq client setup in your host, it should be running at `localhost:8000/graphql` it will provide some insight on how your application is structured, however it should be unecessary to understand these endpoints as you are not supposed to deal with them directly and rather let itemize components handle them.

Despite its rather complex generated names documentation is automatically generated where possible, these endpoints can be rather complex but understanding them can help understanding how itemize works internally.

Note that itemize supports and heavily uses the [Multipart Spec](https://github.com/jaydenseric/graphql-multipart-request-spec) for graphql, however the standard JSON form is also supported, but if you debug the network you will realize that the content type is `multipart/form-data` rather than `application/json`

### Get the admin user

The admin user is automatically generated if not found and this is done by the global manager, when starting in developing mode you should have gotten your admin user log information with the temporary password displayed in the terminal, example:

`info: GlobalManager.addAdminUserIfMissing: Sucessfully added admin user {"username":"admin","password":"c2bf50ba9bd142f29ea40fab653a7689","timestamp":"2020-09-16T16:42:46.249Z"`

These are your login credentials within the application for the administrator with the role ADMIN, if you have no terminal logs eg. ran it in production mode instead of development, it can be found in the info logs via:

`cat logs/info.ABSOLUTE.log.2020-09-16 | grep "GlobalManager.addAdminUserIfMissing"`

And that should show the relevant lines, note that the date 2020-09-16 should be replaced to the log day, the format is YYYY-MM-DD

### Setup the npm token

Itemize requires you to use the npm token in order to build and ship your application, this is partly because it's a more robust method that replicates how you currently build in your environment, since itemize uses npm and the npm registry, in order to specify your token you need to do

`echo "YOUR_TOKEN_HERE" > .npm-token`

Even if you have access to the repository you need this file as docker and the docker npm user does not have such direct access, the setup will take care of the rest

### Install docker-compose

Install docker compose in order to be able to run deployments

## Other initialization options

### Start the development server (NO_SSR, NO_SEO, FAKE_SMS and FAKE_EMAILS mode)

Having SSR enabled can disrupt development, because this means that there will be a mismatch whenever you do changes and rebuild and package your application, this is seen in depth in [Developing Flow](./developing-flow.md) this usually goes in combination with disabling service workers as otherwise changes will not reflect, so a common way to start your development server is:

`NO_SSR=true NO_SEO=true FAKE_EMAILS=true FAKE_SMS=true npm run start-dev-server`

Note that restarts are still required if for example there are changes to the schema files.

### Start the silly server

`npm run start-silly-server`

The silly server is the same as the development server but logs much more information, normally used when changes to itemize are required or bugs are found within it, everything that is verbose and marked as silly is logged, which can mean a lot of information to work with.

### Start the production server

`npm run start-silly-server`

Not really recommended to use, will connect and use production configuration files and nothing is logged to the console, minified files take priority when being served, and you will need to use the devkey in your cookie to switch to development files, regarding that.

### Switch to development mode on production builds

Debugging in production can be a pain, this is why itemize provides with a devkey option, in order to use the devkey it is recommended that you clear up everything in your browser, cookies, storage, cache; your devkey should be in your sensitive config information, looking like eg. `NwKFS1rODXqf4D8D` or a custom value that you have set it as.

Please ensure to have service workers disabled, otherwise you might be served the default mode version.

In order to switch the mode, open the console in your browser and run `SET_DEV_MODE("development", "YOUR_KEY");` or `SET_DEV_MODE("production", "YOUR_KEY");` this should make it so that the mode is switched, and do a hard refresh, now you should have a development version of the client up and running which should help debugging even on your live production builds.

Note that this will cause SSR to die off, as SSR can only run in the default mode as the server can only run on one mode at a time, so this is not good for debugging SSR issues; but you should now have available, custom logs, react tools, and other tools that use development builds right on live.

The development build is protected by default, so it can't be easily accessed unless it's the development server, it's considered a protected resource this should help by adding obscurity on top of it (don't confuse it with security, as minified files can also be analyzed); this is only to make copycats and replication by harmful parties harder, but not impossible.

## Start hacking

Now you know all the basic initialization steps, you should now follow one of the [Tutorials](../tutorials/README.md) which will explain how to create a airbnb like website using itemize.
