# Deployment

We have gone a long way, and we consider that our app is functional so we need to deploy it on a server, before having an app that is deployment worthy we need to do a couple of things first

## SEO Optimization

### SSR

One way to optimize for SEO and usability is to enable SSR, so far we have ran with SSR disabled because SSR is a pain to develop with, specially with service workers enabled.

SSR is what you prepare before doing the deployment the last step of the last, where you are not expected to change any source code regarding the client side unless it is a bug, because you need to rebuild your server and client in every scenario as they need to be in sync.

To enable SSR and do a cheap test you just simply turn it on, by removing the `NO_SSR` flag from the run, remember build everything, run `npm run build` and `npm run install`

You should realize that the website indeed seems to load faster, and that will impact SEO and the way your user sees the app.

What Itemize does under the hood is to use its own react dom renderer in order to understand what items you are loading and create a server side specific representation of what the user is going to recieve, it will also append the resources into a SSR specific global variable in the window that will signal the application to hydrate rather than render from scratch.

This means that even if SSR fails for some reason, say the code is invalid for the server side and cannot be SSRd; or data collection fails due to an outage, the application will still work it will just be sent the plain empty index page and asked to render from that.

If you examine your website now as it is with SSR enabled you will realize that it does in fact look exactly the same even when no javascript has executed at all.

![Catbnb No Javascript](./images/catbnb-no-javascript.png)

That is what the browser is recieving on first paint, and it will enable robots to find and explore this content as well as rank the page high in SEO because of the fact it displays useful content quickly.

Every page with itemize is SSR enabled by default, if you have some special need you can use the `NoSSR` component, eg. if you are doing direct dom manipulation or whatnot, for example the leaflet map cannot be SSRd and as such it has a mechanism in place to avoid being hydrated, you need to keep everything you write SSR capable but that should be rather easy when all the async sources fetching and state management is heavy lifted by itemize itself.

#### SSR and Cache

SSR will also handle things like calculate when a page was last modified based on the items it is loading and the build number of the application itself so when a robot asks for that page and provides an etag, and the cache control headers.

![SSR Headers](./images/ssr-headers.png)

The `x-ssr` flag tells that it was rendered using SSR, and the Etag is actually made in a human readable way and tells you about the resources that were accessed and the times of these resources, it is a signature after all.

The SSR generator will also return a `304 not modified` response if given an etag to compare against, this means that on top of the service worker cache, there's standard HTTP layer caching, but it's only active if the SSR can be executed; so a rule of thumb is that each page can be executed on the server side.

### SEO

The more powerful SEO features actually requires some modification in your server side, Itemize likes to do a very aggressive SEO mechanism where everything that you want to SEO is loaded in the sitemaps, so not only you have the standard SEO (specially after SSR is enabled) that uses a spider mechanism to grab all the links.

#### Automatic SEO

Automatically itemize will take care of language optimization such as `hreflang`, `lang` at the html level, and viewport configuration which will empower SEO in the many different configurations it can take, this is after all, the bare minimum.

This is not affected by the `NO_SEO=true` flag, since it's not considered an optimization by itemize standards but rather the bare minimum.

There's also the manifest, which is generated based on the configuration you have given the configuration in the config json file.

```html
<link rel="manifest" href="/rest/resource/manifest.en.json">
<meta name="msapplication-TileColor" content="#000000">
<meta name="msapplication-config" content="/rest/resource/manifest/browserconfig.xml">
<meta name="theme-color" content="#000000">
```

#### SSR Based SEO (client side)

When SSR is enabled we can use the `OgImageSetter`, `TitleSetter` and the `DescriptionSetter` in order to setup SEO tags for a given page, these can be added anywhere in the code.

This is not affected by the `NO_SEO=true` flag, since it's not considered an optimization by itemize standards.

By default itemize will add the following markup.

```html
<meta name="description" content="Catbnb">
<meta property="og:title" content="Catbnb">
<meta property="og:description" content="Catbnb">
<meta property="og:image" content="/rest/resource/icons/android-chrome-512x512.png">
<meta name="application-name" content="catbnb">
```

These are modifiable when we utilize those tags, so far we have been using the title setter for example which sets up a very important SEO tag for the title, but we can also affect most of these tags and change their content, including the `og:image` by providing a field.

For example let's add an `og:description` and meta `description` based on a custom content we will put in `root.properties`

```properties
app_frontpage_description = catbnb frontpage custom description content
```

And in spanish

```properties
app_frontpage_description = catbnb página de entrada contenido customizado
```

And now we need to redefine our `frontpage/index.tsx` under our title setter functionality.

```tsx
<I18nRead id="app_frontpage_description" capitalize={true}>
    {(i18nAppFrontpageDescription: string) => {
        return (
            <DescriptionSetter>
                {i18nAppFrontpageDescription}
            </DescriptionSetter>
        );
    }}
</I18nRead>
```

And after we run all `npm run install && npm run build` since now we have service workers enabled and all the hardcore caching on and restart the server, we should be able to see our description in our source (note it is invisible for the user, as only robots can read it).

![Catbnb SEO description tags](./images/catbnb-seo-description-tags.png)

We can do the same for the `og:image` which will allow us to even put a file property instead, right now the image is basically just the favicon.

#### Sitemaps and robots.txt (server side)

In order to do this part we need to enable SEO by removing the `NO_SEO=true` from our initialization this is because sitemaps are heavy and require some configuration, if we right now remove it we will see how it is going to setup `robots.txt` and the sitemap object, note that sitemaps are built upon, and they don't delete past information, so you might want to delete all your sitemap information if you need sitemaps to be rebuilt.

Now let's remove the `NO_SEO=true` and start the server as god intented with `npm run start-dev-server` alone and we might not realize it but something called the SEO generator has just kicked in, in order to explore what it has done, let's go to `http://localhost:8000/robots.txt`

And this is what we find:

```robots.txt
user-agent: *
disallow: /rest/util/*
disallow: /rest/index-check/*
disallow: /rest/currency-factors
disallow: /graphql
Sitemap: https://dev.catbnb.com/uploads/sitemaps/dev.catbnb.com/index.xml
```

You might notice that your sitemap url doesn't look right, we are running on localhost, but the url says `dev.catbnb.com` this is because by the specification on sitemaps, we must use absolute urls, and since our server has no clue it is running from localhost, it has no remedy but use the hostname it think it is currently running; anyway, this won't affect production, better try `http://localhost:8000/sitemap.xml`

And we will then find ourselves redirected to `http://localhost:8000/uploads/sitemaps/dev.catbnb.com/index.xml` where you see more of the same problem of absolute urls, as again there's no option due to the nature and specification on sitemaps, if you are concerned about this and you only do development in `localhost:8000`, then you can change the `config/index.json` `developmentHostname` property to be localhost.

Another way is defining a host in your host files, we however do not recommend doing that, because in localhost, service workers can run; but not on a custom host unless you have HTTPS; so we rather, just deal with these wacky urls, at least in development.

Anyway in a real life production scenario, specially a multicluster build, this upload will be provided by your data provider, and the urls could be absolutely different, anyway the XML in it should look like:

```xml
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>https://dev.catbnb.com/uploads/sitemaps/dev.catbnb.com/en/index.xml</loc>
    </sitemap>
    <sitemap>
        <loc>https://dev.catbnb.com/uploads/sitemaps/dev.catbnb.com/es/index.xml</loc>
    </sitemap>
</sitemapindex>
```

This is because we have two language versions of our app, and our app is supposed to be symmetrical, now let's try to go to the english version, at `http://localhost:8000/uploads/sitemaps/dev.catbnb.com/en/index.xml` (remember that the absolute url was created with the dev hostname specifications and we can't access it unless we rewrite into localhost)

Now we find ourselves with this, another index:

```xml
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>https://dev.catbnb.com/uploads/sitemaps/dev.catbnb.com/en/static.xml</loc>
    </sitemap>
    <sitemap>
        <loc>https://dev.catbnb.com/uploads/sitemaps/dev.catbnb.com/en/09_02_18.02_03_2021.xml</loc>
    </sitemap>
</sitemapindex>
```

On the first one there is not much but our frontpage.

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://dev.catbnb.com/en/</loc>
    </url>
</urlset>
```

On the second one you have this strange url.

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://dev.catbnb.com/en/profile/zr8Urth7uGWzdWl6</loc>
    </url>
</urlset>
```

But what is it? and how it came to be?... well if we head to `localhost:8000/en/profile/zr8Urth7uGWzdWl6` we will find our admin user public profile (you might remember other users but during the writting on this section of the tutorial the database was wiped and there was only the admin user).

Now why only these two urls?... well that has to be with our SEO sitemap rules specified in the server side about collection of data.

```typescript
{
    seoRules: {
        "/": {
            crawable: true,
        },
        "profile/:id": {
            crawable: true,
            collect: [
                {
                    module: "users",
                    item: "user",
                },
            ],
        },
    },
}
```

While crawling users and their ids is iffy, but that's fine, this is just a tutorial, now let's say we want to add a new sitemap rule, to crawl our `/reserve/:id` urls that specify what we need.

```typescript
{
    seoRules: {
        "/": {
            crawable: true,
        },
        "profile/:id": {
            crawable: true,
            collect: [
                {
                    module: "users",
                    item: "user",
                },
            ],
        },
        "reserve/:id": {
            crawable: true,
            collect: [
                {
                    module: "hosting",
                    item: "unit",
                },
            ],
        }
    },
}
```

By default the default parametrizer will just take all the arguments id and version and make it be parameters, for `:id` and `:version`, but our SEO collector allows way more functionality, and we can define our custom args and custom ways to make those parameters be with a parametrizer, we can ignore versioned, and we can even permute into different collections (eg. a comparison tool) yes, we could sitemap every different comparison of every single element if we wanted to.

For now this will work for what we want to achieve, let's run `npm run install` and restart the server and explore our new sitemap.

```xml
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>https://dev.catbnb.com/uploads/sitemaps/dev.catbnb.com/en/static.xml</loc>
    </sitemap>
    <sitemap>
        <loc>https://dev.catbnb.com/uploads/sitemaps/dev.catbnb.com/en/09_02_18.02_03_2021.xml</loc>
    </sitemap>
    <sitemap>
        <loc>https://dev.catbnb.com/uploads/sitemaps/dev.catbnb.com/en/10_06_02.02_03_2021.xml</loc>
    </sitemap>
</sitemapindex>
```

There it is our new entry

```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://dev.catbnb.com/en/reserve/zEjYH3RQnOl74JkH</loc>
    </url>
</urlset>
```

And you got it, an incredibly aggressive SEO mechanism that will sitemap every single bit of your page; note that this SEO recalculation (which is additive) will run based on the `SERVER_MAPPING_TIME` which you can configure, however it runs immediately on server start.

## Dumping the content

You might realize that our fragments are right now in the database and once you want to deploy this application they will not come in our environment, they exist in our development environment alone and nowhere else.

## Docker

Itemize by default creates a docker build of the project you are working on by creating a so called "deployable"

## Local Test Run

## Nginx and SSL

## A deployable represents a cluster

## Singlecluster builds and its relation to file management

## Clusters can communicate

## GeoDNS