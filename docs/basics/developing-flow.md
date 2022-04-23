# Developing Flow

This document will explain how the development flow goes with itemize, there are way too many interactions and things to consider when running the application; which can cause the app not to update during development, as such, a development flow is devised, but first let's learn some key concepts.

It is assumed that your app is initialized and currently running, if you haven't done so check [Initialization](./initialization.md)

 - Buildnumber: The build number is a number that represents a timestamp on when the application was last built and it's actually generated when the command `npm run build-data` is launched, when the application determines a new buildnumber, caches are wiped; the build number is tied to the server, as such, the server needs to be reloaded in order for this to be of effect, if the buildnumber changes while a client is active; eg. `npm run build-data`, then you kill the dev server ctrl+c in terminal, then restart via `npm run start-dev-server`, the client will take notice of this and mark the app as outdated due to a buildnumber mismatch.
 - Distribution Sources: The files that are generated via the `npm run build-data`, `npm run webpack`, `npm run install` and `npm run webpack-dev` commands and resides in the dist folder, `npm run build` is a shorthand for all these 4 commands.
 - Distribution Resources: These are part of the distribution sources and it represents files that can be accessed and are meant to be accessed by the browser, they should exist within a folder called `dist/data` and can be accessed in the browser via `/rest/resources/[name of the resource]`
 - Source Resources: It represents sources for resources that are to be copied (and sometimes optimized) to place within these `/rest/resources` for access via the browser these resources are defined by you the developer and they are considered as tied to the buildnumber, as such, they might be cached and considered frozen until the build number changes, make sure that there's no overlap, and use folders when possible, you don't want a `index.html` file in such sources.

## SSR Concerns

Note that if you are checking SSR, it will only be avialble in the mode that you are executing, for example, if you have `start-dev-server` SSR will only be available when the client is also in development mode, it is indeed totally possible to load the production version on the client using the devkey even if the server is in dev mode, and vice-versa, this allows to check for special bugs, and in production debugging; nevertheless SSR should work out of the box if enabled and if you haven't messed with modes and the devkey.

## Safe Developing Flow

No matter the situation, this method should completely work regardless in order to see development updates, it consists of the following steps:

 1. Kill the dev server via ctrl+c
 2. `npm run build`
 3. `npm run build-database development` (if there are changes to the schema files)
 4. `npm run start-dev-server` or `NODE_TLS_REJECT_UNAUTHORIZED=0 FAKE_USSD=true FAKE_EMAILS=true FAKE_SMS=true NO_SSR=true NO_SEO=true npm run start-dev-server`
 5. Your browser should complain that the app is outdated, run the refresh.

This method is however not optimal in most scenarios, one thing, it's slow, and it builds more than it should be necessary.

## Disabling Service Workers

One way to aid on developing flow is to disable service workers, this prevent resources to be considered frozen and enables the client side changes flow as it uses the resources heavily that would otherwise be considered frozen.

Remember that if you reenable service workers your application might misbehave (attempt to load old code because it completely missed any updates in the meantime), you might need to do a hard refresh.

### Chrome

Disabling service workers in chrome is fairly easy, all you need to do is go to the developer tools `Application Tab -> Service Workers -> Tick "Bypass for network"`

### Brute force method

If your browser of preference doesn't come with a way to disable the service workers there's an inbuilt way to do so as a brute force method, just open the console and type in:

`localStorage.setItem("DISABLE_SERVICE_WORKER", "true")`

Then do a hard refresh, if you need to reenable them

`localStorage.setItem("DISABLE_SERVICE_WORKER", "false")`

## Client side Changes flow

You need to have service workers disabled in order for this method to work.

If you are developing in the client side and doing changes to it, and only the client side files, (that means no schema files, and no server files); then there's a fast and simple way to trigger the changes.

 1. `npm run webpack-dev` or `npm run webpack` (if using the production version)
 2. Refresh your browser, changes should appear.

## Schema, Internationalization and Database Changes

If you have performed changes to the internationalization `.properties` files, or to the schema files then a simple way to have them reflected into your application is to follow the steps; note that the server loads a specific version of the application and the entire schema and it keeps it in memory, as such these changes demand a server refresh.

 1. Kill the server via ctrl+c
 2. `npm run build-data`
 3. `npm run build-database development`
 4. `npm run start-dev-server` or `NODE_TLS_REJECT_UNAUTHORIZED=0 FAKE_USSD=true FAKE_EMAILS=true FAKE_SMS=true NO_SSR=true NO_SEO=true npm run start-dev-server`

This should provide a new fresh instance that contains all the updates in the server side, your client now should complain of the app being outdated, and receive the updates as well.

## Server side Changes

If you have done changes to the server side, the proces to update the server codebase is rather straightforward just run:

 1. Kill the server via ctrl+c
 2. `npm run install`
 3. `npm run start-dev-server` or `NODE_TLS_REJECT_UNAUTHORIZED=0 FAKE_USSD=true FAKE_EMAILS=true FAKE_SMS=true NO_SSR=true NO_SEO=true npm run start-dev-server`

Note that this will not affect your client side at all.

## The build-data command

As you notice only the `npm run build-data` command and subsequently starting the server is the only mechanisms that informs the app of being outdated, that is why the build-data command generates a new build number on its execution, which then the server instance retains in memory; this command is what is crucial in production as this buildnumber change is what makes it so that updates can actually be visible.

Itemize is extremely efficient and freezes and ties resources to buildnumbers using the service worker, as such nothing will update in production properly unless there's a buildnumber change.

Disruption should be minimal, having offline support the users should not even notice and just get a sudden app outdated message; or otherwise the app will automatically update on next restart.

## Making a dump

If your web app is highly dynamic and can be modified in real time (which is endorsed via the usage of fragments), you might want to make a dump so that when you spin your application in another computer with another database (and/or) another set of openstack containers this information is not lost, for that you might want to setup a dumpfile, the `dump.json` file is encountered in the config folder, by default it dumps all fragments, if you want to understand or modify what is dumped you might want to check the [Dump Configuration](./basics/configuration.md#dump-configuration) be warned that you run the risk of dumping data that you might not want dumped otherwise.

The dump is meant to go alongside the source control, this allows to replicate the application state of the things you want, for example, usually in itemize we endorse that your hero is a fragment of id 1 and version it into as many languages as you support, as a developer you might not have any interest on designing this fragment, however the signature of the element to load in the place where the hero goes has to be specified; if you don't dump this fragment, and you spin a new instance of the server with a clean database, no fragments will be available and as such you will get a "this item can't be found" error, because there's no fragment with id 1.

Going towards the CMS and adding the fragments manually can be a pain, because that means copying the raw HTML in the CMS, and yet the CMS rich text editor of choice (for example itemize comes with quill by default in its fast prototyping module which cannot copy/paste fragments) so you are stuck, and there might be hundreds of fragments, and reinserting these in every instance you spin is not helpful; as such you would use the dump for this.

The dump will replicate and fetch images, and files and then patch a new server instance with that information, this dump is meant to go to source control, so don't dump critical information, as even passwords will be dumped; you should dump what is necessary for your application to look right, and you might get new dumps from the designers once their job on the CMS is done, reload them, and such, this allows to split the job, and modify the website in real time without changing the codebase.

Note that dumps are tied to your database and schema shape, while itemize will do its best to make the new information fit, you might encounter issues, so dumping and loading dumps is a risky process.

To create a dump.

`npm run build-database development dump`

You might create a dump from the production database as well, so you fetch the last state of your app as the designers have made it:

`npm run build-database production dump`

To load a dump that you have fetch, into the development database as well as into the namespace for development of the openstack containers:

`npm run build-database development load-dump`

## Itemize Developing Flow

If you are an itemize itself developer, you might need to make changes to the itemize library itself, this is not an easy feat, but this should provide insight on how to achieve just that.

You should have your own local repository of itemize for this, and do the changes within it.

### Itemize Specific Server Changes

 1. Kill the server of the itemize powered application. (within the project directory)
 2. `npm run install` (within the itemize repository)
 3. `cp -r nodejs/ directory/of/your/project/node_modules/@onzag/itemize` (within the itemize repository)
 4. `npm run start-dev-server` or `NODE_TLS_REJECT_UNAUTHORIZED=0 FAKE_USSD=true FAKE_EMAILS=true FAKE_SMS=true NO_SSR=true NO_SEO=true npm run start-dev-server` (within the project directory)

### Itemize Specific Client Changes

 1. Kill the server of the itemize powered application. (within the project directory)
 2. `npm run install` (within the itemize repository)
 3. `cp -r * directory/of/your/project/node_modules/@onzag/itemize` (within the itemize repository)
 4. `npm run webpack-dev` or `npm run webpack` (within the project directory)
 5. `npm run start-dev-server` or `NODE_TLS_REJECT_UNAUTHORIZED=0 FAKE_USSD=true FAKE_EMAILS=true FAKE_SMS=true NO_SSR=true NO_SEO=true npm run start-dev-server` (within the project directory)

### Testing debugging

Special functions available in the window named `ENABLE_TESTING` and `DISABLE_TESTING` allow to enable the testing mode as it is used during by the tests ran by the puppetter browser, this allows to debug tests.

## More information

For more information about the commands shown in here, you might refer to [NPM Commands](./npm-commands.md)