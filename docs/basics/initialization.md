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

#### Container Storage Provider

By default you do not need any container storage provider, as it will be simply stored as a file to the hard drive, this however requires that you only have one cluster as this will not work with clusters over different machines, it is only recommended for development, for production unless you have a very small service, you should not have any local storage provider and instead get containers.

The storage is necessary for SEO and file support,

##### Openstack Object Storage

Object storage is provided by several providers, and it's the default used in itemize when no provider has been specified it will assume that it is object storage, you can get as many as you want to but try to have them acrross different countries.

Some providers of object storage are (you can combine them):

- `https://www.ovhcloud.com/en-gb/public-cloud/object-storage/`
- `https://www.linode.com/content/deploying-object-storage-bucket/`

Once you get credentials for these buckets you may add them as such:

```
{
    "containers": {
        "EUROPE": {
            "username": "YudxasaPrC",
            "password": "secret",
            "region": "DE",
            "domainId": "default",
            "domainName": 
        }
    }
}
```

You might get many of these containers in order to setup a CDN of kinds, different countries can have different containers where data is stored for such.

#### Mapping

`https://developer.here.com/` For usage in geocoding, geolocation, and autocomplete; the service doesn't need to be paid for initial usage; use it if you have the location type in your schema.

You can activate here maps, over OSM in the maps visual as well by setting up your `index.sensitive.json` with the following `shared` configuration, replace API_KEY_HERE with your api key.

Note that this is specific to the fast prototyping location entry and view renderer, if using other renderer this will have no effect.

```
"shared": {
    "leafletAttribution": "&copy; HERE 2019",
    "leafletUrl": "https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/512/png8?ppi=320&apiKey=API_KEY_HERE"
}
```

#### Email

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

`NODE_TLS_REJECT_UNAUTHORIZED=0 NO_SSR=true NO_SEO=true FAKE_EMAILS=true FAKE_SMS=true npm run start-dev-server`

Note that restarts are still required if for example there are changes to the schema files.

The reason you accept unauthorized is because the dev environment (if running elasticsearch) uses a self signed certificate, and it's a different one with each dev environment so accepting unauthorized is the better option for development only.

In production you should rather have your own elasticsearch instance.

#### Start Kibana (if you are using elasticsearch)

If you are using elasticsearch and have configured it you can access the logs as well as the cached search information for used in fast and full text search with the elastic strategy.

In order to start kibana in this development environment you will need to first create an enrollment token, first find the countainer that ends with the `_devedb` suffix and is running elasticsearch.

```sh
sudo docker ps
```

Find the container that ends with `_devedb` it should have your application name before it, you will need that identifier.

```sh
sudo docker exec -it my_application_name_devedb /usr/share/elasticsearch/bin/elasticsearch-create-enrollment-token -s kibana
```

You will be output a token, copy it, you will need it; now you shall get kibana running, you will need to do the same regarding the network name that you will use and connect it to your development environment

```sh
sudo docker network ls
```

Find the one that contains your application name within it, eg. `my_application_name_network` that is the one that the dev environment is using, now you can launch kibana with that

```sh
sudo docker run --net my_application_name_network --name kibana -p 5601:5601 docker.elastic.co/kibana/kibana:8.1.3
```

It will prompt you in your browser and request you for the token, once you paste the token you will then proceed to login, your username should be `elastic` and the password is whatever you put in the `db.sensitive.json` for elastic password.

And that's all you should be within kibana with those steps, remember once you are done to stop this container before running `stop-dev-environment`.

```sh
sudo docker stop kibana
sudo docker rm kibana
```

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
