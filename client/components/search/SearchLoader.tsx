/**
 * Provides the functionality to load search results that have been obtained via the
 * item definition context and reside in such context but haven't been loaded
 * 
 * @module
 */

import React from "react";
import { ItemContext, SearchItemValueContext, IItemProviderProps, CacheMetadataGeneratorFn } from "../../providers/item";
import equals from "deep-equal";
import ItemDefinition, { IItemDefinitionGQLValueType } from "../../../base/Root/Module/ItemDefinition";
import { PREFIX_GET_LIST, PREFIX_GET } from "../../../constants";
import CacheWorkerInstance from "../../internal/workers/cache";
import { requestFieldsAreContained, deepMerge } from "../../../gql-util";
import { buildGqlQuery, gqlQuery, IGQLSearchRecord, IGQLRequestFields, IGQLValue } from "../../../gql-querier";
import { LocaleContext, ILocaleContextType } from "../../internal/providers/locale-provider";
import { TokenContext, ITokenContextType } from "../../internal/providers/token-provider";
import { EndpointErrorType } from "../../../base/errors";
import { RemoteListener } from "../../internal/app/remote-listener";

/**
 * The property for the provider but with the key and no children
 */
interface IItemProviderPropsWithKey extends
  Pick<IItemProviderProps, Exclude<keyof IItemProviderProps, 'children'>> {
  key: string;
}

/**
 * Basically a normal graphql search record but with information on
 * how to populate it, aka its own item definition and the provider props
 */
interface IGQLSearchRecordWithPopulateData extends IGQLSearchRecord {
  /**
   * The provider properties used to instantiate your own item definition
   * data
   */
  providerProps: IItemProviderPropsWithKey;
  /**
   * The item definition that was found
   */
  itemDefinition: ItemDefinition;
  /**
   * Be careful when calling this function in a non traditional mode
   * this is because it might still be loading and the value
   * might not be applied yet, check the isSearching propery
   * and ensure to cal this getAppliedValue only when
   * isSearching is false, because otherwise you might get
   * nulls or other data you might not wish
   * 
   * you might prefer to use the searchResult if you are sure
   * you are using traditional search, howevever the applied
   * value is certain to work in any mode
   * 
   * The applied value might be null if no value applied
   */
  getAppliedValue: () => IItemDefinitionGQLValueType;
  /**
   * The search result that you have retrieved
   */
  searchResult?: IGQLValue;
}

/**
 * This is what the search loader recieves as argument
 * in its children prop
 */
export interface ISearchLoaderArg {
  /**
   * The search id is an unique identifier for this
   * search and this search only
   */
  searchId: string;
  /**
   * Whether it is currently searching according to the search
   * parameters in order to retrieve records
   */
  searching: boolean;
  /**
   * Whether it's currently searching for that given search id
   * this variable can be very useful to check for applied values
   * if you are doing your own custom logic and not using traditional search
   * once the isSearching variable is set to false, all the applied values
   * for the given page are ensured to be there, this is also true for
   * traditional search
   */
  isLoadingSearchResults: boolean;
  /**
   * the search records are records that allow to be requested
   * as well as organized, partial information of a search result
   */
  searchRecords: IGQLSearchRecordWithPopulateData[];
  /**
   * The page count given the number of total pages, despite
   * this not being a pagination based mechanism, still
   * the search results are loaded in chunks or pages; note that
   * the page count is only has to do with the accessible count of matches
   */
  pageCount: number;
  /**
   * The total count, the number of items that matched this search
   * in the server side
   */
  totalCount: number;
  /**
   * The accessible count, the number of records we can actually access
   * and retrieve as search results; this is due to technical limitations
   * and security policies, anyway no person really goes further than page 4
   * better them to refine the search
   */
  accessibleCount: number;
  /**
   * whether there's a next page from the current selected
   */
  hasNextPage: boolean;
  /**
   * Whether there's a previous page from the current selected
   */
  hasPrevPage: boolean;
  /**
   * An error that occured during the get list execution to fetch
   * the search results of a given page
   */
  error: EndpointErrorType;
  /**
   * dismiss the errors
   */
  dismissError: () => void;
  /**
   * refresh the page, while itemize content is fully dynamic, it's still possible, eg.
   * say you got an error, you can ask for a refresh
   */
  refreshPage: () => void;
}

/**
 * The loader props themselves
 */
export interface ISearchLoaderProps {
  /**
   * The page size, be careful on not making the page size too
   * large as this can be forbidden, depends on max search results
   * at once
   */
  pageSize: number;
  /**
   * The current page we are in
   */
  currentPage: number;
  /**
   * The children function which specifies how to retrieve these results
   */
  children: (arg: ISearchLoaderArg) => any;
  /**
   * whether to include the policies in the resulting
   * item definition loader props
   */
  includePolicies?: boolean;
  /**
   * Whether the resulting search results should clean on dismount
   */
  cleanOnDismount?: boolean;
  /**
   * Whether to disable the external checks for the item definition
   * results provider props
   */
  disableExternalChecks?: boolean;
  /**
   * The static state for the children item definition, TOTAL for
   * basically not even asking for feedback (useful when the search was traditional)
   * or NO_LISTENING for just not getting updates but asking for feedback
   */
  static?: "TOTAL" | "NO_LISTENING";
  /**
   * Triggers when the search data changes, as in a new search id
   * 
   * Your page might be in page 6 and then the user requests new data
   * which means you should go back to page 0, this allows to do just that
   * by returning a number you can ask for a different page than the one
   * specified by currentPage, remember to update the prop currentPage
   * after this fact, so avoid weirdness
   */
  onSearchDataChange?: (searchId: string, wasRestored: boolean) => number | void;
}

/**
 * The actual search loader props contains all this extra
 * data which allows it to extract the search records (and possible results)
 * from the context itself
 */
interface IActualSearchLoaderProps extends ISearchLoaderProps {
  // all these come from the item definition context with few exceptions
  searchRecords: IGQLSearchRecord[];
  searchResults: IGQLValue[];
  searchCount: number;
  searchLimit: number;
  searchOffset: number;
  itemDefinitionInstance: ItemDefinition;
  // token data to get the current user id, and role, for requests
  tokenData: ITokenContextType;
  // locale data for, well.... localization, nah it's actually to setup the language
  // during requests, so that full text search can function
  localeData: ILocaleContextType;
  remoteListener: RemoteListener;
  searchId: string;
  searching: boolean;
  searchWasRestored: boolean;
  searchOwner: string;
  searchShouldCache: boolean;
  searchFields: IGQLRequestFields;
  searchRequestedProperties: string[];
  searchRequestedIncludes: { [include: string]: string[] };
}

/**
 * The search loader state of the things that are currently
 * being loaded as well as the error, note that search loader
 * is stateful and does not share its loaded records with other search loaders
 */
interface IActualSearchLoaderState {
  currentlySearching: IGQLSearchRecord[];
  searchFields: IGQLRequestFields;
  currentSearchRecords: IGQLSearchRecord[];
  currentSearchResultsFromTheRecords: IGQLValue[];
  error: EndpointErrorType;
}

/**
 * The actual search loader class which contains the actual logic
 */
class ActualSearchLoader extends React.Component<IActualSearchLoaderProps, IActualSearchLoaderState> {
  private lastSearchLoadValuesTime: number;
  private isUnmounted: boolean = false;
  constructor(props: IActualSearchLoaderProps) {
    super(props);

    this.dismissError = this.dismissError.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.getRawSearchResults = this.getRawSearchResults.bind(this);

    // now by default it's nothing like this
    this.state = {
      currentlySearching: [],
      searchFields: null,
      currentSearchRecords: [],
      currentSearchResultsFromTheRecords: [],
      error: null,
      ...this.refreshPage(true),
    };
  }
  public componentDidMount() {
    if (this.state.currentlySearching && this.state.currentlySearching.length) {
      this.refreshPage();
    }
  }
  public getRawSearchResults() {
    return this.props.searchResults;
  }
  /**
   * In case we did never loaded using the item definition loader
   * we need to cleanup the search results still
   * @param props 
   */
  public ensureCleanupOfOldSearchResults(props: IActualSearchLoaderProps, currentRecords: IGQLSearchRecord[]) {
    const root = this.props.itemDefinitionInstance.getParentModule().getParentRoot();
    const oldRecords = (props.searchRecords || []);
    const newRecords = (currentRecords || []);
    const lostRecords = oldRecords.filter((r) => {
      return !!newRecords.find((r2) => r.id === r2.id && r.version === r2.version && r.type === r2.type);
    });
    lostRecords.forEach((r) => {
      const id = r.id;
      const version = r.version || null;
      const itemDefintionInQuestion = root.registry[r.type as string] as ItemDefinition;
      const currentValue = itemDefintionInQuestion.getGQLAppliedValue(id, version);
      if (currentValue) {
        itemDefintionInQuestion.cleanValueFor(id, version);
        itemDefintionInQuestion.triggerListeners("change", id, version);
      }
    });
  }
  public componentWillUnmount() {
    this.isUnmounted = true;
    this.ensureCleanupOfOldSearchResults(this.props, null);
  }
  public componentDidUpdate(prevProps: IActualSearchLoaderProps) {
    // on update we must seek what the current page is to
    // see if something changes
    let currentPage = this.props.currentPage;

    // and then we slice our records to see what we need to load
    const currentSearchRecords = (this.props.searchRecords || []).slice(
      this.props.pageSize * currentPage,
      this.props.pageSize * (currentPage + 1),
    );

    // if this is a new search
    if (
      prevProps.searchId !== this.props.searchId
    ) {
      if (prevProps.searchResults && prevProps.cleanOnDismount) {
        this.ensureCleanupOfOldSearchResults(prevProps, currentSearchRecords);
      }
      if (this.props.searchResults) {
        this.loadSearchResults();
      }

      // if we have this function we call it
      if (this.props.onSearchDataChange) {
        // to get the actual page we are meant to load
        const newPage = this.props.onSearchDataChange(this.props.searchId, this.props.searchWasRestored);
        if (typeof newPage === "number") {
          currentPage = newPage;
        }
      }
    }

    // if it doesn't equal what we currently have loaded
    if (
      !equals(this.state.currentSearchRecords, currentSearchRecords, { strict: true }) ||
      !equals(this.props.searchResults, prevProps.searchResults, { strict: true })
    ) {
      // then we load the values
      this.loadValues(currentSearchRecords);
    }
  }
  public refreshPage(isConstruct?: boolean): Partial<IActualSearchLoaderState> {
    // a refresh will reload regardless
    const currentSearchRecords = (this.props.searchRecords || []).slice(
      this.props.pageSize * this.props.currentPage,
      this.props.pageSize * (this.props.currentPage + 1),
    );
    return this.loadValues(currentSearchRecords, isConstruct);
  }
  public dismissError() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      error: null,
    });
  }
  public loadSearchResults() {
    const root = this.props.itemDefinitionInstance.getParentModule().getParentRoot();
    this.props.searchResults.forEach((sr) => {
      const itemDefintionInQuestion = root.registry[sr.type as string] as ItemDefinition;
      // we apply the value, whatever we have gotten this will affect all the instances
      // that use the same value
      itemDefintionInQuestion.applyValue(
        sr.id as string,
        sr.version as string,
        sr,
        false,
        this.props.searchFields,
        true,
      );

      // and then we trigger the change listener for all the instances
      itemDefintionInQuestion.triggerListeners("load", sr.id as string, sr.version as string);
    });
  }
  public loadValues(currentSearchRecords: IGQLSearchRecord[], isConstruct?: boolean): Partial<IActualSearchLoaderState> {
    if (this.isUnmounted) {
      return;
    }

    const currentSearchLoadTime = (new Date()).getTime();
    this.lastSearchLoadValuesTime = currentSearchLoadTime;

    // if we have no search id we have nothing to search for
    if (!this.props.searchId) {
      const newState: Partial<IActualSearchLoaderState> = {
        error: null,
        currentlySearching: [],
        currentSearchRecords,
        currentSearchResultsFromTheRecords: currentSearchRecords.map((r) => null),
        searchFields: this.props.searchFields,
      };
      !isConstruct && this.setState(newState as any);
      return newState;
    }

    // this happens for traditional search, we dont need to
    // do a second re-request round this would have happened during the
    // search data change
    if (this.props.searchResults) {
      // now we set the state, notice that it started with something else
      // and as such currentSearchRecord will use the value that we have applied
      // from memory as it is its new state for its given slot

      // due to the cache worker functionality in fact these results will be cached
      // according to the props that are passed to them during the loadValue
      // as they realize they are already loaded in memory

      // this serves a double purpose both for SSR and this, which works the same way
      const newState: Partial<IActualSearchLoaderState> = {
        error: null,
        currentlySearching: [],
        currentSearchRecords,
        currentSearchResultsFromTheRecords: currentSearchRecords.map((r) => {
          return this.props.searchResults.find((sr) => sr.id === r.id && sr.version === r.version && sr.type === r.type);
        }),
        searchFields: this.props.searchFields,
      };
      !isConstruct && this.setState(newState as any);
      return newState;
    }

    const foundIndexes = currentSearchRecords.map((r, index) => {
      return false;
    });
    const currentSearchResultsFromTheRecords = currentSearchRecords.map((searchRecord, index) => {
      // note that our records might be different to the context we are in
      const itemDefintionInQuestion =
        this.props.itemDefinitionInstance.getParentModule()
          .getParentRoot().registry[searchRecord.type] as ItemDefinition;

      // check if it's in memory cache, in such a case the value will have already loaded
      // as the item definition would have applied it initially, as in it would have loaded
      // already and it can be pretty much ignored
      const appliedGQLValue = itemDefintionInQuestion.getGQLAppliedValue(searchRecord.id, searchRecord.version);
      if (
        appliedGQLValue &&
        requestFieldsAreContained(this.props.searchFields, appliedGQLValue.requestFields) &&
        appliedGQLValue.flattenedValue.last_modified === searchRecord.last_modified
      ) {
        foundIndexes[index] = true;
        return appliedGQLValue.rawValue;
      }

      return null;
    });

    // and then we set the state, and what we are currently searching, as those records
    // we are searching everything and the item loader will pick on these searching attributes
    // and prevent them from loading from network or cache and will only be able to pick
    // on applied values
    const newState: Partial<IActualSearchLoaderState> = {
      error: null,
      currentlySearching: currentSearchRecords.filter((r, index) => {
        return !foundIndexes[index];
      }),
      currentSearchRecords,
      currentSearchResultsFromTheRecords,
      searchFields: this.props.searchFields,
    };

    if (!isConstruct) {
      this.setState(newState as any);
      this.loadValuesAsyncPart(currentSearchLoadTime, currentSearchResultsFromTheRecords, currentSearchRecords, foundIndexes);
    }

    return newState;
  }

  private async loadValuesAsyncPart(
    currentSearchLoadTime: number,
    currentSearchResultsFromTheRecords: IGQLValue[],
    currentSearchRecords: IGQLSearchRecord[],
    foundIndexes: boolean[],
  ) {
    // We are done with this since all that follows is async and cannot be executed
    // during construction

    // but now we are back to the standard mode
    // for that we need to get the standard counterpart, as we are supposed
    // to be in a search mode item definition context
    const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();

    // now we need to build the query for getting this information
    const queryBase = (standardCounterpart.isExtensionsInstance() ?
      standardCounterpart.getParentModule().getQualifiedPathName() :
      standardCounterpart.getQualifiedPathName());

    // and use the GET_LIST to build that query
    const getListQueryName: string = PREFIX_GET_LIST + queryBase;

    // and now we need to request
    const uncachedResults: IGQLSearchRecord[] = [];
    const uncachedResultsToIndex: number[] = [];

    const newSearchResultsFromTheRecords = [...currentSearchResultsFromTheRecords];

    // first we try to request our indexeddb worker cache and memory cache, one by one
    const workerCachedResults = await Promise.all(currentSearchRecords.map(async (searchRecord: IGQLSearchRecord, index) => {
      // we already found it in our applied value check
      if (foundIndexes[index]) {
        return null;
      }

      // note that our records might be different to the context we are in
      const itemDefintionInQuestion =
        this.props.itemDefinitionInstance.getParentModule()
          .getParentRoot().registry[searchRecord.type] as ItemDefinition;

      const itemDefinitionInQuestionQualifiedName = itemDefintionInQuestion.getQualifiedPathName();

      // otherwise let's see our cache
      // if it's not supported then we push already to our uncached results
      if (!CacheWorkerInstance.isSupported) {
        uncachedResults.push(searchRecord);
        uncachedResultsToIndex.push(index);
        return null;
      } else {
        // otherwise let's try to get it
        const cachedResult = await CacheWorkerInstance.instance.getCachedValue(
          PREFIX_GET + itemDefinitionInQuestionQualifiedName,
          searchRecord.id,
          searchRecord.version,
          this.props.searchFields,
        );

        // if we get nothing or for some reason our search record doesn't match our signature
        // this happens easily when the search is done and is listening and when the records
        // change and new records are provided by the automatic search or otherwise but then
        // these occurred because something changed and yet our cache was not updated to reflect that
        // ironically this wouldn't really happen with the cache worker as it needs to update
        // all its values before that even occurred, but anyway if this is the case
        if (!cachedResult || cachedResult.value.last_modified !== searchRecord.last_modified) {
          // then it's uncached
          uncachedResults.push(searchRecord);
          uncachedResultsToIndex.push(index);
          return null;
        }

        // otherwise let's return the full match
        return {
          cachedResult,
          forId: searchRecord.id,
          forType: searchRecord.type,
          forVersion: searchRecord.version,
        };
      }
    }));

    // time has changed, a new search is incoming
    if (this.lastSearchLoadValuesTime !== currentSearchLoadTime || this.isUnmounted) {
      return;
    }

    // we need to check our worker cache results
    workerCachedResults.forEach((cr, index) => {
      // if we have one
      if (cr) {
        // we can set it up in our new search results that have been collected
        newSearchResultsFromTheRecords[index] = cr.cachedResult.value;

        // then we try to get such item definition
        const itemDefintionInQuestion = this.props.itemDefinitionInstance.getParentModule()
          .getParentRoot().registry[cr.forType] as ItemDefinition;

        // and if we have a value at all, because it might as well just be null
        if (cr.cachedResult.value) {
          // we apply the value, whatever we have gotten this will affect all the instances
          // that use the same value
          itemDefintionInQuestion.applyValue(
            cr.forId,
            cr.forVersion,
            cr.cachedResult.value,
            false,
            cr.cachedResult.fields,
            true,
          );

          // and then we trigger the change listener for all the instances
          itemDefintionInQuestion.triggerListeners("load", cr.forId, cr.forVersion);
        } else {
          // otherwise if it was indeed null, we clean the value
          itemDefintionInQuestion.cleanValueFor(cr.forId, cr.forVersion);
          // and also trigger change
          itemDefintionInQuestion.triggerListeners("load", cr.forId, cr.forVersion);
        }

        // and then we ask for feedback for this using our
        // remote listener, as the item definition provider not having loaded
        // and having aborted won't do that for us
        this.props.remoteListener.requestFeedbackFor({
          itemDefinition: itemDefintionInQuestion.getQualifiedPathName(),
          id: cr.forId,
          version: cr.forVersion,
        });
      }
    });

    // now what we are left are these uncached results, these are what we are searching right now
    // is the rest and this will take some time as well
    if (this.isUnmounted) {
      return;
    }

    this.setState({
      currentlySearching: uncachedResults,
      currentSearchResultsFromTheRecords: newSearchResultsFromTheRecords,
    });

    // now let's go back to our uncached results
    if (uncachedResults.length) {
      // and we prepare the request
      const args: any = {
        token: this.props.tokenData.token,
        language: this.props.localeData.language.split("-")[0],
        records: uncachedResults,
      };

      // if we have a search owner we add it as it's necessary or otherwise
      // it might get forbidden
      if (this.props.searchOwner) {
        args.created_by = this.props.searchOwner;
      }

      // and now we make a grapqhl query for this
      const listQuery = buildGqlQuery({
        name: getListQueryName,
        args,
        fields: {
          results: this.props.searchFields,
        },
      });

      // and then we get the value
      const gqlValue = await gqlQuery(
        listQuery,
      );

      if (this.lastSearchLoadValuesTime !== currentSearchLoadTime || this.isUnmounted) {
        return;
      }

      // now we got to check for errors
      let error: EndpointErrorType = null;
      if (gqlValue.errors) {
        // if the server itself returned an error, we use that error
        error = gqlValue.errors[0].extensions;
      }

      // now we set these so that once
      // we apply the values below and load value is triggered
      // in the provider it actually succeeds loading and doesn't abort
      const finalState: Partial<IActualSearchLoaderState> = {
        error,
        currentlySearching: [],
      };

      // now we need to see if we got information
      if (
        !error &&
        gqlValue &&
        gqlValue.data &&
        gqlValue.data[getListQueryName] &&
        gqlValue.data[getListQueryName].results
      ) {
        const loadedNewSearchResultsFromTheRecords = [
          ...newSearchResultsFromTheRecords,
        ];

        // and we loop into them
        (gqlValue.data[getListQueryName].results as IGQLValue[]).forEach((value, index) => {
          // get these basic details for each one of these results
          const forId = uncachedResults[index].id;
          const forVersion = uncachedResults[index].version;
          const forType = uncachedResults[index].type;

          loadedNewSearchResultsFromTheRecords[uncachedResultsToIndex[index]] = value;

          finalState.currentSearchResultsFromTheRecords = loadedNewSearchResultsFromTheRecords;

          // and now the item definition that we are referring to from the registry
          const itemDefintionInQuestion = this.props.itemDefinitionInstance.getParentModule()
            .getParentRoot().registry[forType] as ItemDefinition;

          // the value that we are applying (which can be null) we make a copy of it
          let valueToApply = value ? {
            ...value,
          } : value;

          // if there's no value
          if (!valueToApply) {
            // we clean the thing and trigger the listeners
            itemDefintionInQuestion.cleanValueFor(forId, forVersion);
            itemDefintionInQuestion.triggerListeners("load", forId, forVersion);
          } else {
            // otherwise we will see, first the search fields we used
            let mergedQueryFields = this.props.searchFields;
            // we try to get the current applied value, in case there's any
            const appliedGQLValue = itemDefintionInQuestion.getGQLAppliedValue(
              value.id as string, value.version as string);

            // and if we have one, which matches our last modified date
            if (
              appliedGQLValue &&
              appliedGQLValue.rawValue &&
              appliedGQLValue.rawValue.last_modified === valueToApply.last_modified
            ) {
              // then we merge our values togethe in the value to apply
              valueToApply = deepMerge(
                valueToApply,
                appliedGQLValue.rawValue,
              );
              // and we do that as well for the fields
              mergedQueryFields = deepMerge(
                this.props.searchFields,
                appliedGQLValue.requestFields,
              );
            }

            // we apply such thing here
            itemDefintionInQuestion.applyValue(
              valueToApply.id as string,
              valueToApply.version as string,
              valueToApply,
              false,
              mergedQueryFields,
              true,
            );

            // and trigger the listeners for change
            itemDefintionInQuestion.triggerListeners("load", forId, forVersion);
          }
        });

        this.setState(finalState as any);
      }
    } else {
      if (this.lastSearchLoadValuesTime !== currentSearchLoadTime || this.isUnmounted) {
        return;
      }
      // otherwise if there's nothing left from the uncached
      // results and we had everything cached, then no error, and nothing being searched
      this.setState({
        error: null,
        currentlySearching: [],
      });
    }
  }
  public shouldComponentUpdate(nextProps: IActualSearchLoaderProps, nextState: IActualSearchLoaderState) {
    // it might seem odd but we only really update
    // the values if we recieve a different search id
    // for efficiency reasons any change in any parameter of the search
    // results in a different search id
    return nextProps.pageSize !== this.props.pageSize ||
      nextProps.currentPage !== this.props.currentPage ||
      nextProps.children !== this.props.children ||
      nextProps.itemDefinitionInstance !== this.props.itemDefinitionInstance ||
      nextProps.tokenData.id !== this.props.tokenData.id ||
      nextProps.tokenData.role !== this.props.tokenData.role ||
      nextProps.localeData !== this.props.localeData ||
      // note here as well, we only really do reprocess the search and the
      // arguments of the search if we receive a different search id
      nextProps.searchId !== this.props.searchId ||
      !equals(this.state, nextState, { strict: true });
  }
  public render() {
    // the accessible count is just the length of the search records
    const accessibleCount = (this.props.searchRecords || []).length;
    // the page count, is the top from the page size, or 0 if accessible count is 0
    const pageCount = accessibleCount === 0 ? 0 : Math.ceil(accessibleCount / this.props.pageSize);
    // the total count is the search count or 0, the search count is a count(*) from the database
    const totalCount = this.props.searchCount || 0;

    // now we return, for that we must make a new provider context with what
    // we are currently searching and our search fields that we are searching for
    // so the item definition provider knows this and aborts loading values needlessly
    return (
      <SearchItemValueContext.Provider
        value={
          {
            currentlySearching: this.state.currentlySearching,
            searchFields: this.state.searchFields,
          }
        }
      >
        {
          this.props.children({
            searchRecords: this.state.error ? [] : this.state.currentSearchRecords.map((searchRecord, index) => {
              // note how our search records here are special first we nee the matching item definition
              // of the record
              const itemDefinition = this.props.itemDefinitionInstance
                .getParentModule().getParentRoot().registry[searchRecord.type] as ItemDefinition;

              // fird the search result information, if any, for the given record
              const searchResult = this.state.currentSearchResultsFromTheRecords[index];

              // and we add something called the provider props, which explains how to instantiate
              // a item definition provider so that it's in sync with this seach and loads what this search
              // says, while it's possible to come with it manually, this makes it easier
              return {
                ...searchRecord,
                providerProps: {
                  key: itemDefinition.getQualifiedPathName() + "." + searchRecord.id + "." + (searchRecord.version || ""),
                  forId: searchRecord.id,
                  forVersion: searchRecord.version,
                  itemDefinition: searchRecord.type,
                  properties: this.props.searchRequestedProperties,
                  includes: this.props.searchRequestedIncludes,
                  includePolicies: this.props.includePolicies,
                  cleanOnDismount: this.props.cleanOnDismount,
                  static: this.props.static,
                  longTermCaching: this.props.searchShouldCache,
                  disableExternalChecks: this.props.disableExternalChecks,
                },
                itemDefinition,
                searchResult,
                getAppliedValue: () => {
                  return itemDefinition.getGQLAppliedValue(searchRecord.id, searchRecord.version || null);
                },
              };
            }),
            pageCount,
            accessibleCount,
            totalCount,
            hasNextPage: this.props.currentPage < pageCount - 1,
            hasPrevPage: this.props.currentPage !== 0,
            error: this.state.error,
            dismissError: this.dismissError,
            refreshPage: this.refreshPage,
            searchId: this.props.searchId,
            isLoadingSearchResults: this.state.currentlySearching.length !== 0,
            searching: this.props.searching,
          })
        }
      </SearchItemValueContext.Provider>
    );
  }
}

/**
 * The search loader allows to load search results
 * @param props the loader props
 * @returns a react component
 */
export default function SearchLoader(props: ISearchLoaderProps) {
  return (
    <LocaleContext.Consumer>
      {
        (localeData) => (
          <TokenContext.Consumer>
            {
              (tokenData) => (
                <ItemContext.Consumer>{
                  (itemContext) => (
                    <ActualSearchLoader
                      {...props}
                      itemDefinitionInstance={itemContext.idef}
                      remoteListener={itemContext.remoteListener}
                      searchId={itemContext.searchId}
                      searchWasRestored={itemContext.searchWasRestored}
                      searchRecords={itemContext.searchRecords}
                      searchResults={itemContext.searchResults}
                      searchCount={itemContext.searchCount}
                      searchOffset={itemContext.searchOffset}
                      searchLimit={itemContext.searchLimit}
                      searchOwner={itemContext.searchOwner}
                      searchShouldCache={itemContext.searchShouldCache}
                      searchRequestedIncludes={itemContext.searchRequestedIncludes}
                      searchRequestedProperties={itemContext.searchRequestedProperties}
                      searchFields={itemContext.searchFields}
                      searching={itemContext.searching}
                      tokenData={tokenData}
                      localeData={localeData}
                    />
                  )
                }</ItemContext.Consumer>
              )
            }
          </TokenContext.Consumer>
        )
      }
    </LocaleContext.Consumer>
  );
}