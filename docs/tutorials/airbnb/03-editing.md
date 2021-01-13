[Prev](./02-adding.md)

# Editing Units

We already have a page for adding units, and one that lists it; but we need one to modify them; remembering this page:

![Hosting page functional](./images/hosting-page-functional.png)

We want to turn it into something that is more usable first, as this is rather messy but it was something we had done rather quickly before, so lets restyle the page.

## Improving the list

We will need more imports:

```tsx
import { List, ListItemText, withStyles, WithStyles, createStyles, ListItem } from "@onzag/itemize/client/fast-prototyping/mui-core";
```

And now we add this to our code

```tsx
/**
 * Some styles for the list of units
 */
const unitListStyles = createStyles({
    image: {
        width: "30%",
        display: "inline-block",
    },
    listingText: {
        padding: "0 1rem",
    },
    listing: {
        transition: "background-color 0.3s",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#eee",
        },
    },
    paginator: {
        paddingTop: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }
});
```

And then we have to modify the display where the `SearchLoaderWithPagination` is encountered and change to something like this:

```tsx
<List>
    {/* Now we need to load the search results, this is a fast prototyping component
    that loads the search results and adds a pagination element, you should be able
    to use a standard search loader otherwise, all of them are paged, but you can put
    a rather large search size, keep in mind that the search loader when the search
    was made in a non traditional way needs to fetch from the server again per page
    you load, in offline mode, if caching is enabled it will use indexed db */}
    <SearchLoaderWithPagination id="unit-search-loader" pageSize={12}>
        {(arg, pagination, noResults) => (
            <>
                {
                    arg.searchRecords.map((r) => (
                        <ItemProvider {...r.providerProps}>
                            <Link to={`/hosting/edit/${r.id}`}>
                                <ListItem className={props.classes.listing}>
                                    <View id="image" rendererArgs={
                                        {
                                            // we do not want to link images with with <a> tags like
                                            // the active renderer does by default
                                            disableImageLinking: true,
                                            // we want the image size to load by 30 viewport width
                                            // this is used to choose what image resolution to load
                                            // so they load faster, we want tiny images
                                            imageSizes: "30vw",
                                            imageClassName: props.classes.image
                                        }
                                    } />
                                    <ListItemText
                                        className={props.classes.listingText}
                                        primary={<View id="title" />}
                                        secondary={<View id="address" rendererArgs={{ hideMap: true }} />}
                                    />
                                </ListItem>
                            </Link>
                        </ItemProvider>
                    ))
                }
                <div className={props.classes.paginator}>
                    {pagination}
                </div>
            </>
        )}
    </SearchLoaderWithPagination>
</List>
```

So the look would have changed and now clicking our listing will take us to the edit page

![Hosting Page Pretty](./images/hosting-page-pretty.png)

## Adding the edit page