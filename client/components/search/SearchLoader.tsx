/**
 * Provides the functionality to load search results that have been obtained via the
 * item definition context and reside in such context but haven't been loaded
 * 
 * @module
 */

import React, { useContext, useEffect } from "react";
import { ItemContext, SearchItemValueContext, IItemProviderProps } from "../../providers/item";
import equals from "deep-equal";
import ItemDefinition, { IItemDefinitionRQValueType } from "../../../base/Root/Module/ItemDefinition";
import { PREFIX_GET_LIST, PREFIX_GET } from "../../../constants";
import CacheWorkerInstance from "../../internal/workers/cache";
import { requestFieldsAreContained, deepMerge } from "../../../rq-util";
import { buildRQQuery, IRQSearchRecord, IRQRequestFields, IRQValue, rqQuery } from "../../../rq-querier";
import { LocaleContext, ILocaleContextType } from "../../internal/providers/locale-provider";
import { TokenContext, ITokenContextType } from "../../internal/providers/token-provider";
import { EndpointErrorType } from "../../../base/errors";
import { RemoteListener } from "../../internal/app/remote-listener";
import type { IElasticHighlightRecordInfo, IElasticHighlightSingleRecordInfo } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

/**
 * The property for the provider but with the key and no children
 */
interface IItemProviderPropsWithKey extends
  Pick<IItemProviderProps, Exclude<keyof IItemProviderProps, 'children'>> {
  key: string;
}

/**
 * Basically a normal rq search record but with information on
 * how to populate it, aka its own item definition and the provider props
 */
interface IRQSearchRecordWithPopulateData extends IRQSearchRecord {
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
  getAppliedValue: () => IItemDefinitionRQValueType;
  /**
   * The search result that you have retrieved
   */
  searchResult?: IRQValue;
  /**
   * The highlight information retrieved
   */
  highlights?: IElasticHighlightSingleRecordInfo;
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
  searchRecords: IRQSearchRecordWithPopulateData[];
  /**
   * The page count given the number of total accessible pages, despite
   * this not being a pagination based mechanism, still
   * the search results are loaded in chunks or pages; note that
   * the page count is only has to do with the accessible count of matches
   */
  pageCount: number;
  /**
   * The page count given the number of total potential pages, despite
   * this not being a pagination based mechanism
   */
  pageCountTotal: number;
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
   * the limit used during the search action
   */
  limit: number;
  /**
   * The offset used during the search action
   */
  offset: number;
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
  /**
   * metadata that was given during the search operation for additional details
   */
  metadata: string;
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
  pageSize: number | "ALL";
  /**
   * The current page we are in
   * if pageSize is ALL the current page should be 0
   * otherwise this will cause an error
   * 
   * The page index starts at 0
   * 
   * Note that this is a very simplistic mechanism, and you should probably
   * use a paginator object from Paginator.tsx and pass the page from there
   */
  currentPage: number;
  /**
   * The children function which specifies how to retrieve these results
   */
  children?: (arg: ISearchLoaderArg) => any;
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
  enableExternalChecks?: boolean;
  /**
   * Prevents the loading of the search results use this
   * if you have no data to load and just want the records
   * off a search
   */
  avoidLoadingSearchResults?: boolean;
  /**
   * Searching will be set to true until at least
   * a first search is retrieved
   * 
   * mainly used for SSR purposes so that searching always
   * starts at true
   */
  startInSearchingState?: boolean;
  /**
   * The static state for the children item definition, TOTAL for
   * basically not even asking for feedback (useful when the search was traditional)
   * or NO_LISTENING for just not getting updates but asking for feedback
   * 
   * by default searches do not listen and use total as they act like static
   * results
   * 
   * Note that if the search was done using a listen policy the item will update anyway
   * this is why total is the better option
   */
  static?: "TOTAL" | "NO_LISTENING";
  /**
   * Triggers when the search data changes, as in a new search id
   */
  onSearchDataChange?: (searchId: string, wasRestored: "NO" | "FROM_LOCATION" | "FROM_STATE") => void;
}

/**
 * The actual search loader props contains all this extra
 * data which allows it to extract the search records (and possible results)
 * from the context itself
 */
interface IActualSearchLoaderProps extends ISearchLoaderProps {
  // all these come from the item definition context with few exceptions
  searchRecords: IRQSearchRecord[];
  searchResults: IRQValue[];
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
  searchWasRestored: "NO" | "FROM_LOCATION" | "FROM_STATE";
  searchOwner: string;
  searchShouldCache: boolean;
  searchFields: IRQRequestFields;
  searchMetadata: string;
  searchRequestedProperties: string[];
  searchRequestedIncludes: { [include: string]: string[] };
  searchEngineEnabled: boolean;
  searchEngineUsedFullHighlights: number;
  searchEngineEnabledLang: string;
  searchEngineHighlightArgs: { [key: string]: string };
  searchHighlights: IElasticHighlightRecordInfo;
  searchError: EndpointErrorType;
  searchErrorDismiss: () => void;
}

/**
 * The search loader state of the things that are currently
 * being loaded as well as the error, note that search loader
 * is stateful and does not share its loaded records with other search loaders
 */
interface IActualSearchLoaderState {
  currentlySearching: IRQSearchRecord[];
  searchFields: IRQRequestFields;
  currentSearchResults: IRQValue[];
  currentSearchRecords: IRQSearchRecord[];
  currentSearchResultsFromTheRecords: IRQValue[];
  error: EndpointErrorType;
  retrievedHighlights: IElasticHighlightRecordInfo;
  currentSearchTime: number;
  currentSearchElementType: string;
  currentHighlightArgs: any;
  searchResultsNeedToBeLoaded: boolean;
  searchWillProduceNewHighlights: boolean;
  searchCanProduceHighlights: boolean;

  showAsSearching: boolean;
}

function canProduceHighlights(props: IActualSearchLoaderProps) {
  return !props.searchShouldCache &&
    props.searchEngineHighlightArgs !== null &&
    Object.keys(props.searchEngineHighlightArgs).length !== 0;
}

function willProduceNewHighlights(props: IActualSearchLoaderProps, currentSearchElementType: string, currentHighlightArgs: any) {
  // if this is a cache policy thing, then producing new highlights will simply
  // destroy the cache policy mechanism, rendering it useless
  // otherwise we check if we have anything to create highlights from
  const canProduceNewHighlights = canProduceHighlights(props);

  // if we do
  let willItProduceNewHighlights = canProduceNewHighlights;

  // we will check wether we should produce these new highlights
  const qName = props.itemDefinitionInstance.getQualifiedPathName();
  if (canProduceNewHighlights) {
    // if it's the same as last time, then it's useless to do so
    const avoidProducingNewBecauseSameHighlightArgs = currentSearchElementType === qName &&
      equals(currentHighlightArgs, props.searchEngineHighlightArgs, { strict: true });
    if (avoidProducingNewBecauseSameHighlightArgs) {
      willItProduceNewHighlights = false;
    }
  }

  return willItProduceNewHighlights;
}

function loadSearchResults(props: IActualSearchLoaderProps) {
  const root = props.itemDefinitionInstance.getParentModule().getParentRoot();
  props.searchResults.forEach((sr) => {
    const itemDefintionInQuestion = root.registry[sr.type as string] as ItemDefinition;
    // we apply the value, whatever we have gotten this will affect all the instances
    // that use the same value
    itemDefintionInQuestion.applyValue(
      sr.id as string,
      sr.version as string,
      sr,
      false,
      props.searchFields,
      true,
    );

    // and then we trigger the change listener for all the instances
    itemDefintionInQuestion.triggerListeners("load", sr.id as string, sr.version as string);
  });
}

function loadValues(
  props: IActualSearchLoaderProps,
  state: IActualSearchLoaderState,
  currentSearchRecords: IRQSearchRecord[],
  isUnmounted?: boolean,
  isConstruct?: boolean,
  context?: ActualSearchLoader,
): Partial<IActualSearchLoaderState> {
  const currentSearchLoadTime = (new Date()).getTime();

  if (isUnmounted) {
    return;
  } else if (props.avoidLoadingSearchResults) {
    const newState: Partial<IActualSearchLoaderState> = {
      error: null,
      currentlySearching: [],
      currentSearchRecords,
      currentSearchResults: props.searchResults,
      currentSearchResultsFromTheRecords: currentSearchRecords.map((r) => null),
      retrievedHighlights: {},
      searchFields: props.searchFields,
      currentSearchTime: currentSearchLoadTime,
      currentSearchElementType: props.itemDefinitionInstance.getQualifiedPathName(),
      currentHighlightArgs: props.searchEngineHighlightArgs,
      searchResultsNeedToBeLoaded: false,
      searchWillProduceNewHighlights: false,
      searchCanProduceHighlights: false,
    };
    !isConstruct && context && context.setState(newState as any);
    return newState;
  }

  // if we have no search id we have nothing to search for
  if (!props.searchId) {
    const newState: Partial<IActualSearchLoaderState> = {
      error: null,
      currentlySearching: [],
      currentSearchRecords,
      currentSearchResults: props.searchResults,
      currentSearchResultsFromTheRecords: currentSearchRecords.map((r) => null),
      searchFields: props.searchFields,
      currentSearchTime: currentSearchLoadTime,
      currentSearchElementType: props.itemDefinitionInstance.getQualifiedPathName(),
      currentHighlightArgs: props.searchEngineHighlightArgs,
      searchResultsNeedToBeLoaded: false,
      searchWillProduceNewHighlights: false,
      searchCanProduceHighlights: false,
    };
    !isConstruct && context && context.setState(newState as any);
    return newState;
  }

  // this happens for traditional search, we dont need to
  // do a second re-request round this would have happened during the
  // search data change
  if (props.searchResults) {
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
      currentSearchResults: props.searchResults,
      currentSearchResultsFromTheRecords: currentSearchRecords.map((r) => {
        return props.searchResults.find((sr) => sr.id === r.id && sr.version === r.version && sr.type === r.type);
      }),
      searchFields: props.searchFields,
      currentSearchTime: currentSearchLoadTime,
      currentSearchElementType: props.itemDefinitionInstance.getQualifiedPathName(),
      currentHighlightArgs: props.searchEngineHighlightArgs,
      searchResultsNeedToBeLoaded: false,
      searchWillProduceNewHighlights: false,
      searchCanProduceHighlights: false,
    };
    loadSearchResults(props);

    !isConstruct && context && context.setState(newState as any);
    return newState;
  }

  // if we do
  const canItProduceHighlights = canProduceHighlights(props);
  const willItProduceNewHighlights = willProduceNewHighlights(props, state.currentSearchElementType, state.currentHighlightArgs);

  const foundIndexes = currentSearchRecords.map(() => {
    return false;
  });
  const currentSearchResultsFromTheRecords = currentSearchRecords.map((searchRecord, index) => {
    // note that our records might be different to the context we are in
    const itemDefintionInQuestion =
      props.itemDefinitionInstance.getParentModule()
        .getParentRoot().registry[searchRecord.type] as ItemDefinition;

    // check if it's in memory cache, in such a case the value will have already loaded(
    // as the item definition would have applied it initially, as in it would have loaded
    // already and it can be pretty much ignored
    const appliedRQValue = itemDefintionInQuestion.getRQAppliedValue(searchRecord.id, searchRecord.version);
    if (
      appliedRQValue &&
      requestFieldsAreContained(props.searchFields, appliedRQValue.requestFields) &&
      appliedRQValue.flattenedValue.last_modified === searchRecord.last_modified
    ) {
      if (!willItProduceNewHighlights) {
        foundIndexes[index] = true;
      }
      return appliedRQValue.rawValue;
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
    currentSearchResults: props.searchResults,
    currentSearchResultsFromTheRecords,
    searchFields: props.searchFields,
    currentSearchTime: currentSearchLoadTime,
    currentSearchElementType: props.itemDefinitionInstance.getQualifiedPathName(),
    currentHighlightArgs: props.searchEngineHighlightArgs,
    searchResultsNeedToBeLoaded: true,
    searchWillProduceNewHighlights: willItProduceNewHighlights,
    searchCanProduceHighlights: canItProduceHighlights,
  };

  if (!isConstruct && context) {
    context.setState(newState as any);
  }

  return newState;
}

/**
 * The actual search loader class which contains the actual logic
 */
class ActualSearchLoader extends React.Component<IActualSearchLoaderProps, IActualSearchLoaderState> {
  private isUnmounted: boolean = false;
  public static getDerivedStateFromProps(props: IActualSearchLoaderProps, state: IActualSearchLoaderState) {
    const sliceStart = typeof props.pageSize === "number" ? (props.pageSize * props.currentPage) : 0;
    const sliceEnd = typeof props.pageSize === "number" ? props.pageSize * (props.currentPage + 1) : 0;
    const currentSearchRecords = typeof props.pageSize === "number" ? (props.searchRecords || []).slice(
      sliceStart,
      sliceEnd,
    ) : (props.searchRecords || []);

    if (
      willProduceNewHighlights(props, state.currentSearchElementType, state.currentHighlightArgs) ||
      // the capability to produce highlights changed
      (state.searchCanProduceHighlights !== canProduceHighlights(props)) ||
      !equals(state.currentSearchRecords, currentSearchRecords, { strict: true }) ||
      !equals(props.searchResults, state.currentSearchResults, { strict: true })
    ) {
      // then we load the values
      // this will set the flag so that on did update
      // it is picked by the async part which will actually do the loading
      return loadValues(props, state, currentSearchRecords, false, false);
    }

    return null;
  }
  constructor(props: IActualSearchLoaderProps) {
    super(props);

    this.dismissError = this.dismissError.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.refreshPageNoCb = this.refreshPageNoCb.bind(this);
    this.getRawSearchResults = this.getRawSearchResults.bind(this);

    if (props.pageSize === "ALL" && props.currentPage !== 0) {
      console.error("Used pageSize of ALL and current page not zero at SearchLoader");
    }

    // now by default it's nothing like this
    // the refresh page will populate the values based on the load
    this.state = {
      currentlySearching: [],
      searchFields: null,
      currentSearchRecords: [],
      currentSearchResults: [],
      currentSearchResultsFromTheRecords: [],
      retrievedHighlights: {},
      error: null,
      currentSearchTime: null,
      currentSearchElementType: null,
      currentHighlightArgs: null,
      searchResultsNeedToBeLoaded: false,
      searchWillProduceNewHighlights: false,
      searchCanProduceHighlights: false,
      showAsSearching: !!props.startInSearchingState && !props.searchId,
    };

    // refresh the state
    this.state = {
      ...this.state,
      ...this.refreshPage(true),
    };
  }
  public componentDidMount() {
    if (this.state.searchResultsNeedToBeLoaded) {
      this.loadValuesAsyncPart(
        this.state.currentSearchTime,
        this.state.currentSearchResultsFromTheRecords,
        this.state.currentSearchRecords,
        this.state.searchWillProduceNewHighlights,
      );
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
  public ensureCleanupOfOldSearchResults(props: IActualSearchLoaderProps, currentRecords: IRQSearchRecord[]) {
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
      const currentValue = itemDefintionInQuestion.getRQAppliedValue(id, version);
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
    if (this.props.pageSize === "ALL" && this.props.currentPage !== 0) {
      console.error("Used pageSize of ALL and current page not zero at SearchLoader");
    }

    // if this is a new search
    if (
      prevProps.searchId !== this.props.searchId
    ) {
      if (prevProps.searchResults && prevProps.cleanOnDismount) {
        this.ensureCleanupOfOldSearchResults(prevProps, this.state.currentSearchRecords);
      }
      if (this.props.searchResults) {
        loadSearchResults(this.props);
      }

      // if we have this function we call it
      if (this.props.onSearchDataChange) {
        // to get the actual page we are meant to load
        this.props.onSearchDataChange(this.props.searchId, this.props.searchWasRestored);
      }

      if (this.state.showAsSearching) {
        this.setState({
          showAsSearching: false,
        });
      }
    }

    // if it doesn't equal what we currently have loaded
    if (this.state.searchResultsNeedToBeLoaded) {
      this.loadValuesAsyncPart(
        this.state.currentSearchTime,
        this.state.currentSearchResultsFromTheRecords,
        this.state.currentSearchRecords,
        this.state.searchWillProduceNewHighlights,
      );
    }
  }
  public refreshPageNoCb() {
    this.refreshPage();
  }
  public refreshPage(isConstruct?: boolean): Partial<IActualSearchLoaderState> {
    // a refresh will reload regardless
    const sliceStart = typeof this.props.pageSize === "number" ? (this.props.pageSize * this.props.currentPage) : 0;
    const sliceEnd = typeof this.props.pageSize === "number" ? (this.props.pageSize * (this.props.currentPage + 1)) : 0;
    const currentSearchRecords = typeof this.props.pageSize === "number" ? (this.props.searchRecords || []).slice(
      sliceStart,
      sliceEnd,
    ) : (this.props.searchRecords || []);
    return loadValues(this.props, this.state, currentSearchRecords, this.isUnmounted, isConstruct, this);
  }
  public dismissError() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      error: null,
    });
  }

  private async loadValuesAsyncPart(
    currentSearchLoadTime: number,
    currentSearchResultsFromTheRecords: IRQValue[],
    currentSearchRecords: IRQSearchRecord[],
    willItProduceNewHighlights: boolean,
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
    const uncachedResults: IRQSearchRecord[] = [];
    const newSearchResultsFromTheRecords = [...currentSearchResultsFromTheRecords];

    // we are already handling it
    this.setState({
      searchResultsNeedToBeLoaded: false,
    });

    const foundIndexes = currentSearchRecords.map((searchRecord, index) => {
      // when highlighting it is always considered not found
      if (willItProduceNewHighlights) {
        return false;
      }

      // note that our records might be different to the context we are in
      const itemDefintionInQuestion =
        this.props.itemDefinitionInstance.getParentModule()
          .getParentRoot().registry[searchRecord.type] as ItemDefinition;

      // check if it's in memory cache, in such a case the value will have already loaded
      // as the item definition would have applied it initially, as in it would have loaded
      // already and it can be pretty much ignored
      const appliedRQValue = itemDefintionInQuestion.getRQAppliedValue(searchRecord.id, searchRecord.version);
      return (
        appliedRQValue &&
        requestFieldsAreContained(this.props.searchFields, appliedRQValue.requestFields) &&
        appliedRQValue.flattenedValue.last_modified === searchRecord.last_modified
      );
    });

    // first we try to request our indexeddb worker cache and memory cache, one by one
    const workerCachedResults = await Promise.all(currentSearchRecords.map(async (searchRecord: IRQSearchRecord, index) => {
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
      // also if we need to produce new results for uncached we can't use cache
      if (willItProduceNewHighlights || !CacheWorkerInstance.isSupportedAsWorker) {
        uncachedResults.push(searchRecord);
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
    if (this.state.currentSearchTime !== currentSearchLoadTime || this.isUnmounted) {
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
      searchResultsNeedToBeLoaded: false,
    });

    // now let's go back to our uncached results
    if (uncachedResults.length) {
      // and we prepare the request
      const args: any = {
        token: this.props.tokenData.token,
        language: this.props.localeData.language.split("-")[0],
        records: uncachedResults,
        ...this.props.searchEngineHighlightArgs,
      };

      // if we have a search owner we add it as it's necessary or otherwise
      // it might get forbidden
      if (this.props.searchOwner) {
        args.created_by = this.props.searchOwner;
      }

      if (this.props.searchEngineEnabled) {
        args.searchengine = true;
        if (this.props.searchEngineEnabledLang) {
          args.searchengine_language = this.props.searchEngineEnabledLang;
        }
        if (this.props.searchEngineUsedFullHighlights) {
          args.searchengine_full_highlights = this.props.searchEngineUsedFullHighlights;
        }
      }

      const rqSchema = this.props.itemDefinitionInstance.getParentModule().getParentRoot().getRQSchema();
      // and now we make a grapqhl query for this
      const listQuery = buildRQQuery(rqSchema, {
        name: getListQueryName,
        args,
        fields: {
          results: this.props.searchFields,
          highlights: {},
        },
      });

      // and then we get the value
      const rqValue = await rqQuery(
        listQuery,
        {
          remoteListener: this.props.remoteListener,
        },
      );

      if (this.state.currentSearchTime !== currentSearchLoadTime || this.isUnmounted) {
        return;
      }

      // now we got to check for errors
      let error: EndpointErrorType = null;
      if (rqValue.errors) {
        // if the server itself returned an error, we use that error
        error = rqValue.errors[0].error;
      }

      // now we set these so that once
      // we apply the values below and load value is triggered
      // in the provider it actually succeeds loading and doesn't abort
      const finalState: Partial<IActualSearchLoaderState> = {
        error,
        currentlySearching: [],
        retrievedHighlights: {},
        searchResultsNeedToBeLoaded: false,
      };

      // now we need to see if we got information
      if (
        !error &&
        rqValue &&
        rqValue.data &&
        rqValue.data[getListQueryName] &&
        rqValue.data[getListQueryName].results
      ) {
        const loadedNewSearchResultsFromTheRecords = [
          ...newSearchResultsFromTheRecords,
        ];

        let highlightsParsed: any;
        try {
          highlightsParsed = JSON.parse(rqValue.data[getListQueryName].highlights as any) || {};
        } catch {
          highlightsParsed = {};
        }
        const newHighlights = highlightsParsed || {};
        // if the new highlights are considered fully new and not recycled, then we can take
        // the new highlights and delete the old ones, because we have updated every single
        // value with new highlights, otherwise if we have recycled, we may still have
        // new stuff around that we needed to add, so we merge with the old
        finalState.retrievedHighlights = willItProduceNewHighlights ? newHighlights : {
          ...this.state.retrievedHighlights,
          ...newHighlights,
        };
        // we remove all highlights if we are not supposed to be capable of producing any
        // this can happen if we remove all highlighting criteria but there's old highlight data
        // around that we try to merge, but it makes no sense because we aren't supposed to have any
        if (!canProduceHighlights) {
          finalState.retrievedHighlights = {};
        }

        // and we loop into them
        (rqValue.data[getListQueryName].results as IRQValue[]).forEach((value) => {
          const indexOfSearchResultInUncached = uncachedResults.findIndex((v) => value.id === v.id);

          // somehow received a record that wasn't asked for
          if (indexOfSearchResultInUncached === -1) {
            return;
          }

          loadedNewSearchResultsFromTheRecords[indexOfSearchResultInUncached] = value;

          finalState.currentSearchResultsFromTheRecords = loadedNewSearchResultsFromTheRecords;

          // and now the item definition that we are referring to from the registry
          const itemDefintionInQuestion = this.props.itemDefinitionInstance.getParentModule()
            .getParentRoot().registry[value.type as string] as ItemDefinition;

          // the value that we are applying (which can be null) we make a copy of it
          let valueToApply = value ? {
            ...value,
          } : value;

          // if there's no value
          if (!valueToApply) {
            // we clean the thing and trigger the listeners
            itemDefintionInQuestion.cleanValueFor(valueToApply.id as string, valueToApply.version as string || null);
            itemDefintionInQuestion.triggerListeners("load", valueToApply.id as string, valueToApply.version as string || null);
          } else {
            // otherwise we will see, first the search fields we used
            let mergedQueryFields = this.props.searchFields;
            // we try to get the current applied value, in case there's any
            const appliedRQValue = itemDefintionInQuestion.getRQAppliedValue(
              value.id as string, value.version as string);

            // and if we have one, which matches our last modified date
            if (
              appliedRQValue &&
              appliedRQValue.rawValue &&
              appliedRQValue.rawValue.last_modified === valueToApply.last_modified
            ) {
              // then we merge our values togethe in the value to apply
              valueToApply = deepMerge(
                valueToApply,
                appliedRQValue.rawValue,
              );
              // and we do that as well for the fields
              mergedQueryFields = deepMerge(
                this.props.searchFields,
                appliedRQValue.requestFields,
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
            itemDefintionInQuestion.triggerListeners("load", valueToApply.id as string, valueToApply.version as string || null);
          }
        });

        this.setState(finalState as any);
      }
    } else {
      if (this.state.currentSearchTime !== currentSearchLoadTime || this.isUnmounted) {
        return;
      }
      // otherwise if there's nothing left from the uncached
      // results and we had everything cached, then no error, and nothing being searched
      if (!canProduceHighlights) {
        this.setState({
          error: null,
          currentlySearching: [],
          retrievedHighlights: {},
          searchResultsNeedToBeLoaded: false,
        });
      } else {
        this.setState({
          error: null,
          currentlySearching: [],
          searchResultsNeedToBeLoaded: false,
        });
      }
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
    if (!this.props.children) {
      return null;
    }

    // the accessible count is just the length of the search records
    const accessibleCount = (this.props.searchRecords || []).length;
    // the page count, is the top from the page size, or 0 if accessible count is 0
    const pageCount = accessibleCount === 0 ? 0 : (typeof this.props.pageSize === "number" ? Math.ceil(accessibleCount / this.props.pageSize) : 1);
    // the total count is the search count or 0, the search count is a count(*) from the database
    const totalCount = this.props.searchCount || 0;
    const pageCountTotal = totalCount === 0 ? 0 : (typeof this.props.pageSize === "number" ? Math.ceil(totalCount / this.props.pageSize) : 1);

    // now we return, for that we must make a new provider context with what
    // we are currently searching and our search fields that we are searching for
    // so the item definition provider knows this and aborts loading values needlessly
    return (
      <SearchItemValueContext.Provider
        value={
          {
            currentlySearching: this.state.currentlySearching,
            searchFields: this.state.searchFields,
            searchRecords: this.state.error ? [] : this.state.currentSearchRecords,
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
              const mergedId = searchRecord.id + "." + (searchRecord.version || "");
              const highlights = ((this.props.searchHighlights && this.props.searchHighlights[mergedId]) ||
                (this.state.retrievedHighlights && this.state.retrievedHighlights[mergedId])) || {};

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
                  // let the function for ensure cleanup to take care of
                  // cleaning the records, cleaning here caused an error
                  // where after these unmounted we couldn't re-render
                  // them even if we were paginating, so the search loader
                  // should be the one in charge of cleaning, not the item
                  // itself
                  // cleanOnDismount: this.props.cleanOnDismount,
                  static: this.props.static || "TOTAL",
                  longTermCaching: this.props.searchShouldCache,
                  enableExternalChecks: this.props.enableExternalChecks,
                  highlights,
                },
                itemDefinition,
                searchResult,
                highlights,
                getAppliedValue: () => {
                  return itemDefinition.getRQAppliedValue(searchRecord.id, searchRecord.version || null);
                },
              } as IRQSearchRecordWithPopulateData;
            }),
            pageCount,
            pageCountTotal,
            accessibleCount,
            totalCount,
            hasNextPage: this.props.currentPage < pageCount - 1,
            hasPrevPage: this.props.currentPage !== 0,
            error: this.props.searchError || this.state.error,
            dismissError: this.props.searchError ? this.props.searchErrorDismiss : this.dismissError,
            refreshPage: this.refreshPageNoCb,
            searchId: this.props.searchId,
            isLoadingSearchResults: this.state.currentlySearching.length !== 0,
            searching: this.props.searching || this.state.showAsSearching,
            limit: this.props.searchLimit,
            offset: this.props.searchOffset,
            metadata: this.props.searchMetadata,
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
  const localeData = useContext(LocaleContext);
  const tokenData = useContext(TokenContext);
  const itemContext = useContext(ItemContext);
  return (
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
      searchEngineEnabled={itemContext.searchEngineEnabled}
      searchEngineUsedFullHighlights={itemContext.searchEngineUsedFullHighlights}
      searchEngineEnabledLang={itemContext.searchEngineEnabledLang}
      searchEngineHighlightArgs={itemContext.searchEngineHighlightArgs}
      searchError={itemContext.searchError}
      searchErrorDismiss={itemContext.dismissSearchError}
      searchHighlights={itemContext.searchHighlights}
      searchFields={itemContext.searchFields}
      searchMetadata={itemContext.searchMetadata}
      searching={itemContext.searching}
      tokenData={tokenData}
      localeData={localeData}
    />
  );
}