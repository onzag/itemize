import React from "react";
import { ItemDefinitionContext, SearchItemDefinitionValueContext, IItemDefinitionProviderProps } from "../../providers/item-definition";
import equals from "deep-equal";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import { PREFIX_GET_LIST, PREFIX_GET } from "../../../constants";
import CacheWorkerInstance from "../../internal/workers/cache";
import { requestFieldsAreContained, deepMerge } from "../../../gql-util";
import { buildGqlQuery, gqlQuery, IGQLSearchRecord, IGQLRequestFields, IGQLValue } from "../../../gql-querier";
import { LocaleContext, ILocaleContextType } from "../../internal/app";
import { TokenContext, ITokenContextType } from "../../internal/providers/token-provider";
import { EndpointErrorType } from "../../../base/errors";
import { RemoteListener } from "../../internal/app/remote-listener";

interface IItemDefinitionProviderPropsWithKey extends
  Pick<IItemDefinitionProviderProps, Exclude<keyof IItemDefinitionProviderProps, 'children'>> {
  key: string;
}

interface IGQLSearchRecordWithPopulateData extends IGQLSearchRecord {
  providerProps: IItemDefinitionProviderPropsWithKey;
  itemDefinition: ItemDefinition;
}

export interface ISearchLoaderArg {
  searchId: string;
  searchRecords: IGQLSearchRecordWithPopulateData[];
  pageCount: number;
  totalCount: number;
  accessibleCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  error: EndpointErrorType;
  dismissError: () => void;
  refreshPage: () => void;
}

export interface ISearchLoaderProps {
  pageSize: number;
  currentPage: number;
  children: (arg: ISearchLoaderArg) => any;
  includePolicies?: boolean;
  cleanOnDismount?: boolean;
  static?: "TOTAL" | "NO_LISTENING";
  useSearchHistory?: boolean;
  onSearchDataChange?: () => number | void;
}

interface IActualSearchLoaderProps extends ISearchLoaderProps {
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
  searchOwner: number;
  searchShouldCache: boolean;
  searchFields: IGQLRequestFields;
  searchRequestedProperties: string[];
  searchRequestedIncludes: string[];
}

interface IActualSearchLoaderState {
  currentlySearching: IGQLSearchRecord[];
  searchFields: IGQLRequestFields;
  currentSearchRecords: IGQLSearchRecord[];
  error: EndpointErrorType;
}

class ActualSearchLoader extends React.Component<IActualSearchLoaderProps, IActualSearchLoaderState> {
  constructor(props: IActualSearchLoaderProps) {
    super(props);

    this.dismissError = this.dismissError.bind(this);
    this.refreshPage = this.refreshPage.bind(this);

    this.state = {
      currentlySearching: [],
      searchFields: {},
      currentSearchRecords: [],
      error: null,
    };
  }
  public componentDidMount() {
    this.refreshPage();
    if (this.props.useSearchHistory) {
      this.loadFromQS();
    }
  }
  public refreshSearchQS() {
    // TODO update the search querystring to match if necessary
  }
  public loadFromQS() {
    // TODO load and execute a search based on the querystring value, we need to
    // ensure to execute search from the parent based on the QS data
  }
  public componentDidUpdate(prevProps: IActualSearchLoaderProps) {
    let currentPage = this.props.currentPage;
    if (
      prevProps.searchId !== this.props.searchId
    ) {
      if (this.props.onSearchDataChange) {
        const newPage = this.props.onSearchDataChange();
        if (typeof newPage === "number") {
          currentPage = newPage;
        }
      }

      if (this.props.useSearchHistory) {
        this.refreshSearchQS();
      }
    }

    const currentSearchRecords = (this.props.searchRecords || []).slice(
      this.props.pageSize * currentPage,
      this.props.pageSize * (currentPage + 1),
    );
    // it might seem odd but we only really update
    // the values if we recieve a different search id
    // for efficiency reasons any change in any parameter of the search
    // results in a different search id

    if (
      !equals(this.state.currentSearchRecords, currentSearchRecords) ||
      prevProps.searchId !== this.props.searchId
    ) {
      this.loadValues(currentSearchRecords);
    }
  }
  public refreshPage() {
    const currentSearchRecords = (this.props.searchRecords || []).slice(
      this.props.pageSize * this.props.currentPage,
      this.props.pageSize * (this.props.currentPage + 1),
    );
    this.loadValues(currentSearchRecords);
  }
  public dismissError() {
    this.setState({
      error: null,
    });
  }
  public async loadValues(currentSearchRecords: IGQLSearchRecord[]) {
    if (!this.props.searchId) {
      return;
    }

    // this happens for traditional search, we dont need to
    // do a second re-request round
    if (this.props.searchResults) {
      const root = this.props.itemDefinitionInstance.getParentModule().getParentRoot();
      this.props.searchResults.forEach((sr) => {
        const itemDefintionInQuestion = root.registry[sr.type as string] as ItemDefinition;
        // we apply the value, whatever we have gotten this will affect all the instances
          // that use the same value
          itemDefintionInQuestion.applyValue(
            sr.id as number,
            sr.version as string,
            sr,
            false,
            this.props.tokenData.id,
            this.props.tokenData.role,
            this.props.searchFields,
            true,
          );

          // and then we trigger the change listener for all the instances
          itemDefintionInQuestion.triggerListeners("change", sr.id as number, sr.version as string);
      });
      this.setState({
        error: null,
        currentlySearching: [],
        currentSearchRecords,
        searchFields: this.props.searchFields,
      });
      return;
    }

    const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();

    this.setState({
      error: null,
      currentlySearching: currentSearchRecords,
      currentSearchRecords,
      searchFields: this.props.searchFields,
    });

    const queryBase = (standardCounterpart.isExtensionsInstance() ?
      standardCounterpart.getParentModule().getQualifiedPathName() :
      standardCounterpart.getQualifiedPathName());

    const getListQueryName: string = PREFIX_GET_LIST + queryBase;

    const uncachedResults: IGQLSearchRecord[] = [];
    const workerCachedResults = await Promise.all(currentSearchRecords.map(async (searchResult: IGQLSearchRecord) => {
      const itemDefintionInQuestion =
        this.props.itemDefinitionInstance.getParentModule()
          .getParentRoot().registry[searchResult.type] as ItemDefinition;
      // check if it's in memory cache, in such a case the value will have already loaded
      // as the item definition would have applied it initially
      const appliedGQLValue = itemDefintionInQuestion.getGQLAppliedValue(searchResult.id, searchResult.version);
      if (
        appliedGQLValue &&
        requestFieldsAreContained(this.props.searchFields, appliedGQLValue.requestFields)
      ) {
        return null;
      }

      if (!CacheWorkerInstance.isSupported) {
        uncachedResults.push(searchResult);
        return null;
      } else {
        const cachedResult = await CacheWorkerInstance.instance.getCachedValue(
          PREFIX_GET + itemDefintionInQuestion.getQualifiedPathName(),
          searchResult.id,
          searchResult.version,
          this.props.searchFields,
        );
        if (!cachedResult) {
          uncachedResults.push(searchResult);
          return null;
        }
        return {
          cachedResult,
          forId: searchResult.id,
          forType: searchResult.type,
          forVersion: searchResult.version,
        };
      }
    }));

    this.setState({
      currentlySearching: uncachedResults,
    });

    workerCachedResults.forEach((cr) => {
      if (cr) {
        const itemDefintionInQuestion = this.props.itemDefinitionInstance.getParentModule()
          .getParentRoot().registry[cr.forType] as ItemDefinition;
        if (cr.cachedResult.value) {
          // we apply the value, whatever we have gotten this will affect all the instances
          // that use the same value
          itemDefintionInQuestion.applyValue(
            cr.forId,
            cr.forVersion,
            cr.cachedResult.value,
            false,
            this.props.tokenData.id,
            this.props.tokenData.role,
            cr.cachedResult.fields,
            true,
          );

          // and then we trigger the change listener for all the instances
          itemDefintionInQuestion.triggerListeners("change", cr.forId, cr.forVersion);
        } else {
          itemDefintionInQuestion.cleanValueFor(cr.forId, cr.forVersion);
          itemDefintionInQuestion.triggerListeners("change", cr.forId, cr.forVersion);
        }

        this.props.remoteListener.requestFeedbackFor({
          itemDefinition: itemDefintionInQuestion.getQualifiedPathName(),
          id: cr.forId,
          version: cr.forVersion,
        });
      }
    });

    if (uncachedResults.length) {
      const args: any = {
        token: this.props.tokenData.token,
        language: this.props.localeData.language.split("-")[0],
        records: uncachedResults,
      };

      if (this.props.searchOwner) {
        args.created_by = this.props.searchOwner;
      }
      const listQuery = buildGqlQuery({
        name: getListQueryName,
        args,
        fields: {
          results: this.props.searchFields,
        },
      });
      const gqlValue = await gqlQuery(
        listQuery,
      );

      // now we got to check for errors
      let error: EndpointErrorType = null;
      if (gqlValue.errors) {
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
        (gqlValue.data[getListQueryName].results as IGQLValue[]).forEach((value, index) => {
          const forId = uncachedResults[index].id;
          const forVersion = uncachedResults[index].version;
          const forType = uncachedResults[index].type;

          const itemDefintionInQuestion = this.props.itemDefinitionInstance.getParentModule()
            .getParentRoot().registry[forType] as ItemDefinition;
          let valueToApply = value ? {
            ...value,
          } : value;
          if (!valueToApply) {
            itemDefintionInQuestion.cleanValueFor(forId, forVersion);
            itemDefintionInQuestion.triggerListeners("change", forId, forVersion);
          } else {
            let mergedQueryFields = this.props.searchFields;
            const appliedGQLValue = itemDefintionInQuestion.getGQLAppliedValue(
              value.id as number, value.version as string);
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
                this.props.searchFields,
                appliedGQLValue.requestFields,
              );
            }

            itemDefintionInQuestion.applyValue(
              valueToApply.id as number,
              valueToApply.version as string,
              valueToApply,
              false,
              this.props.tokenData.id,
              this.props.tokenData.role,
              mergedQueryFields,
              true,
            );
            itemDefintionInQuestion.triggerListeners("change", forId, forVersion);
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
      // note here as well, we only really do reprocess the search and the
      // arguments of the search if we receive a different search id
      nextProps.searchId !== this.props.searchId ||
      !equals(this.state, nextState);
  }
  public render() {
    const accessibleCount = (this.props.searchRecords || []).length;
    const pageCount = accessibleCount === 0 ? 0 : Math.ceil(accessibleCount / this.props.pageSize);
    const totalCount = this.props.searchCount || 0;
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
            searchRecords: this.state.error ? [] : this.state.currentSearchRecords.map((searchRecord) => {
              const itemDefinition = this.props.itemDefinitionInstance
                .getParentModule().getParentRoot().registry[searchRecord.type] as ItemDefinition;
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
                },
                itemDefinition,
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
          })
        }
      </SearchItemDefinitionValueContext.Provider>
    );
  }
}

export default function SearchLoader(props: ISearchLoaderProps) {
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
                      itemDefinitionInstance={itemDefinitionContext.idef}
                      remoteListener={itemDefinitionContext.remoteListener}
                      searchId={itemDefinitionContext.searchId}
                      searchRecords={itemDefinitionContext.searchRecords}
                      searchResults={itemDefinitionContext.searchResults}
                      searchCount={itemDefinitionContext.searchCount}
                      searchOffset={itemDefinitionContext.searchOffset}
                      searchLimit={itemDefinitionContext.searchLimit}
                      searchOwner={itemDefinitionContext.searchOwner}
                      searchShouldCache={itemDefinitionContext.searchShouldCache}
                      searchRequestedIncludes={itemDefinitionContext.searchRequestedIncludes}
                      searchRequestedProperties={itemDefinitionContext.searchRequestedProperties}
                      searchFields={itemDefinitionContext.searchFields}
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