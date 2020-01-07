import React from "react";
import { ISearchResult, ItemDefinitionContext, SearchItemDefinitionValueContext } from "../providers/item-definition";
import equals from "deep-equal";
import ItemDefinition from "../../base/Root/Module/ItemDefinition";
import { getFieldsAndArgs } from "../../util";
import { UNSPECIFIED_OWNER, PREFIX_GET_LIST, PREFIX_GET } from "../../constants";
import CacheWorkerInstance from "../internal/workers/cache";
import { requestFieldsAreContained, deepMerge } from "../../gql-util";
import { buildGqlQuery, gqlQuery } from "../../gql-querier";
import { LocaleContext, ILocaleContextType } from "../internal/app";
import { TokenContext, ITokenContextType } from "../internal/app/internal-providers";
import { GraphQLEndpointErrorType } from "../../base/errors";
import { RemoteListener } from "../internal/app/remote-listener";
import Root from "../../base/Root";

interface ISearchLoaderProps {
  pageSize: number;
  currentPage: number;
  children: (arg: {
    searchResults: ISearchResult[];
    pageCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    error: GraphQLEndpointErrorType;
    dismissError: () => void;
    refreshPage: () => void;
  }) => any;
  requestedProperties: string[];
  requestedIncludes?: string[];
}

interface IActualSearchLoaderProps extends ISearchLoaderProps {
  searchResults: ISearchResult[];
  itemDefinitionInstance: ItemDefinition;
  // token data to get the current user id, and role, for requests
  tokenData: ITokenContextType;
  // locale data for, well.... localization, nah it's actually to setup the language
  // during requests, so that full text search can function
  localeData: ILocaleContextType;
  remoteListener: RemoteListener;
  searchId: string;
  searchOwner: number;
}

interface IActualSearchLoaderState {
  currentlySearching: ISearchResult[];
  searchFields: any;
  currentSearchResults: ISearchResult[];
  error: GraphQLEndpointErrorType;
}

class ActualSearchLoader extends React.Component<IActualSearchLoaderProps, IActualSearchLoaderState> {
  constructor(props: IActualSearchLoaderProps) {
    super(props);

    this.dismissError = this.dismissError.bind(this);
    this.refreshPage = this.refreshPage.bind(this);

    this.state = {
      currentlySearching: [],
      searchFields: {},
      currentSearchResults: [],
      error: null,
    };
  }
  public componentDidMount() {
    this.refreshPage();
  }
  public componentDidUpdate(prevProps: IActualSearchLoaderProps, prevState: IActualSearchLoaderState) {
    const currentSearchResults = this.props.searchResults.slice(
      this.props.pageSize * this.props.currentPage,
      this.props.pageSize * (this.props.currentPage + 1),
    );
    if (
      prevProps.searchId !== this.props.searchId ||
      !equals(this.state.currentSearchResults, currentSearchResults)
    ) {
      this.loadValues(currentSearchResults);
    }
  }
  public refreshPage() {
    const currentSearchResults = this.props.searchResults.slice(
      this.props.pageSize * this.props.currentPage,
      this.props.pageSize * (this.props.currentPage + 1),
    );
    this.loadValues(currentSearchResults);
  }
  public dismissError() {
    this.setState({
      error: null,
    });
  }
  public async loadValues(currentSearchResults: ISearchResult[]) {
    if (!this.props.searchId) {
      return;
    }

    const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();

    const searchFieldsAndArgs = getFieldsAndArgs({
      includeArgs: false,
      includeFields: true,
      onlyIncludeProperties: this.props.requestedProperties,
      onlyIncludeIncludes: this.props.requestedIncludes || [],
      appliedOwner: this.props.searchOwner || UNSPECIFIED_OWNER,
      userId: this.props.tokenData.id,
      userRole: this.props.tokenData.role,
      itemDefinitionInstance: standardCounterpart,
      forId: null,
    });
    const searchFields: any = searchFieldsAndArgs.requestFields;
    this.setState({
      error: null,
      currentlySearching: currentSearchResults,
      currentSearchResults,
      searchFields,
    });

    const queryBase = (standardCounterpart.isExtensionsInstance() ?
      standardCounterpart.getParentModule().getQualifiedPathName() :
      standardCounterpart.getQualifiedPathName());

    const getListQueryName: string = PREFIX_GET_LIST + queryBase;

    // this is the query we run
    const singleQueryName = PREFIX_GET + queryBase;

    const uncachedResults: ISearchResult[] = [];
    const workerCachedResults = await Promise.all(currentSearchResults.map(async (searchResult: ISearchResult) => {
      const itemDefintionInQuestion = Root.Registry[searchResult.type] as ItemDefinition;
      // check if it's in memory cache, in such a case the value will have already loaded
      // as the item definition would have applied it initially
      const appliedGQLValue = itemDefintionInQuestion.getGQLAppliedValue(searchResult.id);
      if (
        appliedGQLValue &&
        requestFieldsAreContained(searchFields, appliedGQLValue.requestFields)
      ) {
        return null;
      }

      if (!CacheWorkerInstance.isSupported) {
        uncachedResults.push(searchResult);
        return null;
      } else {
        const cachedResult = await CacheWorkerInstance.instance.getCachedValue(
          singleQueryName,
          searchResult.id,
          searchFields,
        );
        if (!cachedResult) {
          uncachedResults.push(searchResult);
          return null;
        }
        return {
          cachedResult,
          forId: searchResult.id,
          forType: searchResult.type,
        };
      }
    }));

    this.setState({
      currentlySearching: uncachedResults,
    });

    workerCachedResults.forEach((cr) => {
      if (cr) {
        const itemDefintionInQuestion = Root.Registry[cr.forType] as ItemDefinition;
        if (cr.cachedResult.value) {
          // we apply the value, whatever we have gotten this will affect all the instances
          // that use the same value
          itemDefintionInQuestion.applyValue(
            cr.forId,
            cr.cachedResult.value,
            false,
            this.props.tokenData.id,
            this.props.tokenData.role,
            cr.cachedResult.fields,
          );

          // and then we trigger the change listener for all the instances
          itemDefintionInQuestion.triggerListeners("change", cr.forId);
        } else {
          itemDefintionInQuestion.cleanValueFor(cr.forId);
          itemDefintionInQuestion.triggerListeners("change", cr.forId);
        }

        this.props.remoteListener.requestFeedbackFor(itemDefintionInQuestion, cr.forId);
      }
    });

    if (uncachedResults.length) {
      const args: any = {
        token: this.props.tokenData.token,
        language: this.props.localeData.language.split("-")[0],
        ids: uncachedResults,
      };

      if (this.props.searchOwner) {
        args.created_by = this.props.searchOwner;
      }
      const listQuery = buildGqlQuery({
        name: getListQueryName,
        args,
        fields: {
          results: searchFields,
        },
      });
      const gqlValue = await gqlQuery(
        listQuery,
      );

      // now we got to check for errors
      let error: GraphQLEndpointErrorType = null;

      // no value, for some reason the server didnt return
      // anything, we cant connect to it, it either timed out
      // or was an invalid response (maybe the server is dead)
      if (!gqlValue) {
        error = {
          message: "Failed to connect",
          code: "CANT_CONNECT",
        };
      } else if (gqlValue.errors) {
        // if the server itself returned an error, we use that error
        error = gqlValue.errors[0].extensions;
      }

      if (
        !error &&
        gqlValue &&
        gqlValue.data &&
        gqlValue.data[getListQueryName] &&
        gqlValue.data[getListQueryName].results
      ) {
        gqlValue.data[getListQueryName].results.forEach((value, index) => {
          const forId = uncachedResults[index].id;
          const forType = uncachedResults[index].type;

          const itemDefintionInQuestion = Root.Registry[forType] as ItemDefinition;
          let valueToApply = value ? {
            ...value,
          } : value;
          if (!valueToApply) {
            if (CacheWorkerInstance.isSupported) {
              CacheWorkerInstance.instance.setCachedValue(
                singleQueryName, forId, null, null,
              );
            }
            itemDefintionInQuestion.cleanValueFor(forId);
            itemDefintionInQuestion.triggerListeners("change", forId);
          } else {
            let mergedQueryFields = searchFields;
            const appliedGQLValue = itemDefintionInQuestion.getGQLAppliedValue(value.id);
            if (
              appliedGQLValue &&
              appliedGQLValue.rawValue &&
              appliedGQLValue.rawValue.last_modified === valueToApply.last_modified
            ) {
              valueToApply = deepMerge(
                valueToApply,
                appliedGQLValue.rawValue,
              );
              mergedQueryFields = deepMerge(
                searchFields,
                appliedGQLValue.requestFields,
              );
            }

            itemDefintionInQuestion.applyValue(
              valueToApply.id,
              valueToApply,
              false,
              this.props.tokenData.id,
              this.props.tokenData.role,
              mergedQueryFields,
            );
            itemDefintionInQuestion.triggerListeners("change", forId);

            if (CacheWorkerInstance.isSupported) {
              CacheWorkerInstance.instance.mergeCachedValue(
                singleQueryName, forId, valueToApply, mergedQueryFields,
              );
            }
          }
        });
      }

      this.setState({
        error,
        currentlySearching: [],
      });
    } else {
      this.setState({
        error: null,
        currentlySearching: [],
      });
    }
  }
  public shouldComponentUpdate(nextProps: IActualSearchLoaderProps, nextState: IActualSearchLoaderState) {
    return nextProps.pageSize !== this.props.pageSize ||
      nextProps.currentPage !== this.props.currentPage ||
      nextProps.children !== this.props.children ||
      nextProps.itemDefinitionInstance !== this.props.itemDefinitionInstance ||
      nextProps.tokenData.id !== this.props.tokenData.id ||
      nextProps.tokenData.role !== this.props.tokenData.role ||
      nextProps.localeData !== this.props.localeData ||
      nextProps.searchId !== this.props.searchId ||
      !equals(this.state, nextState);
  }
  public render() {
    const pageCount = Math.ceil(this.props.searchResults.length / this.props.pageSize);
    return (
      <SearchItemDefinitionValueContext.Provider
        value={
          {
            currentlySearching: this.state.currentlySearching,
            searchFields: this.state.searchFields,
          }
        }
      >
        {
          this.props.children({
            searchResults: this.state.error ? [] : this.state.currentSearchResults,
            pageCount,
            hasNextPage: this.props.currentPage < pageCount - 1,
            hasPrevPage: this.props.currentPage !== 0,
            error: this.state.error,
            dismissError: this.dismissError,
            refreshPage: this.refreshPage,
          })
        }
      </SearchItemDefinitionValueContext.Provider>
    );
  }
}

export function SearchLoader(props: ISearchLoaderProps) {
  return (
    <LocaleContext.Consumer>
      {
        (localeData) => (
          <TokenContext.Consumer>
            {
              (tokenData) => (
                <ItemDefinitionContext.Consumer>{
                  (itemDefinitionContext) => (
                    <ActualSearchLoader
                      {...props}
                      searchResults={itemDefinitionContext.searchResults}
                      itemDefinitionInstance={itemDefinitionContext.idef}
                      remoteListener={itemDefinitionContext.remoteListener}
                      searchId={itemDefinitionContext.searchId}
                      searchOwner={itemDefinitionContext.searchOwner}
                      tokenData={tokenData}
                      localeData={localeData}
                    />
                  )
                }</ItemDefinitionContext.Consumer>
              )
            }
          </TokenContext.Consumer>
        )
      }
    </LocaleContext.Consumer>
  );
}
