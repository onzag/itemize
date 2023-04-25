[@onzag/itemize](../README.md) / [Modules](../modules.md) / client/components/search/TotalPagedSearchLoader

# Module: client/components/search/TotalPagedSearchLoader

The total paged search loader is capable of loading every single
record in a search by respecting limit and offset from the search, the search
will pull results in batches and these results will be loaded

this is mainly designed to be used with a traditional search with listeners
enabled, it's more akin an average search in a common framework

You are still recommended to pull more records than you can handle in one page
for example with a limit of 50 yet paginating 10, that way 50 records are always ready
in the search

## Table of contents

### Classes

- [TotalPagedSearchLoader](../classes/client_components_search_TotalPagedSearchLoader.TotalPagedSearchLoader.md)
