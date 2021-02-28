# Deployment

We have gone a long way, and we consider that our app is functional so we need to deploy it on a server, before having an app that is deployment worthy we need to do a couple of things first

## SEO Optimization

### SSR

One way to optimize for SEO and usability is to enable SSR, so far we have ran with SSR disabled because SSR is a pain to develop with, specially with service workers enabled.

SSR is what you prepare before doing the deployment the last step of the last, where you are not expected to change any source code regarding the client side unless it is a bug, because you need to rebuild your server and client in every scenario as they need to be in sync.

To enable SSR and do a cheap test you just simply turn it on, by removing the `NO_SSR` flag from the run, remember build everything, run `npm run build` and `npm run install`

You should realize that the website indeed seems to load faster, and that will impact SEO and the way your user sees the app.

### SEO

SEO actually requires some modification in your server side, Itemize likes to do a very aggressive SEO mechanism where everything that you want to SEO is loaded in the sitemaps.

## Dumping the content

## Docker

Itemize by default creates a docker build of the project you are working on by creating a so called "deployable"

## Local Test Run

## Nginx and SSL

## A deployable represents a cluster

## Singlecluster builds and its relation to file management

## Clusters can communicate

## GeoDNS