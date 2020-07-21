"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const item_definition_1 = require("../../providers/item-definition");
const deep_equal_1 = __importDefault(require("deep-equal"));
const constants_1 = require("../../../constants");
const cache_1 = __importDefault(require("../../internal/workers/cache"));
const gql_util_1 = require("../../../gql-util");
const gql_querier_1 = require("../../../gql-querier");
const app_1 = require("../../internal/app");
const token_provider_1 = require("../../internal/providers/token-provider");
class ActualSearchLoader extends react_1.default.Component {
    constructor(props) {
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
    componentDidMount() {
        this.refreshPage();
    }
    componentDidUpdate(prevProps) {
        let currentPage = this.props.currentPage;
        if (prevProps.searchId !== this.props.searchId) {
            if (this.props.onSearchDataChange) {
                const newPage = this.props.onSearchDataChange();
                if (typeof newPage === "number") {
                    currentPage = newPage;
                }
            }
        }
        const currentSearchRecords = (this.props.searchRecords || []).slice(this.props.pageSize * currentPage, this.props.pageSize * (currentPage + 1));
        // it might seem odd but we only really update
        // the values if we recieve a different search id
        // for efficiency reasons any change in any parameter of the search
        // results in a different search id
        if (!deep_equal_1.default(this.state.currentSearchRecords, currentSearchRecords) ||
            prevProps.searchId !== this.props.searchId) {
            this.loadValues(currentSearchRecords);
        }
    }
    refreshPage() {
        const currentSearchRecords = (this.props.searchRecords || []).slice(this.props.pageSize * this.props.currentPage, this.props.pageSize * (this.props.currentPage + 1));
        this.loadValues(currentSearchRecords);
    }
    dismissError() {
        this.setState({
            error: null,
        });
    }
    async loadValues(currentSearchRecords) {
        if (!this.props.searchId) {
            return;
        }
        // this happens for traditional search, we dont need to
        // do a second re-request round
        if (this.props.searchResults) {
            const root = this.props.itemDefinitionInstance.getParentModule().getParentRoot();
            this.props.searchResults.forEach((sr) => {
                const itemDefintionInQuestion = root.registry[sr.type];
                // we apply the value, whatever we have gotten this will affect all the instances
                // that use the same value
                itemDefintionInQuestion.applyValue(sr.id, sr.version, sr, false, this.props.tokenData.id, this.props.tokenData.role, this.props.searchFields, true);
                // and then we trigger the change listener for all the instances
                itemDefintionInQuestion.triggerListeners("change", sr.id, sr.version);
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
        const getListQueryName = constants_1.PREFIX_GET_LIST + queryBase;
        const uncachedResults = [];
        const workerCachedResults = await Promise.all(currentSearchRecords.map(async (searchResult) => {
            const itemDefintionInQuestion = this.props.itemDefinitionInstance.getParentModule()
                .getParentRoot().registry[searchResult.type];
            // check if it's in memory cache, in such a case the value will have already loaded
            // as the item definition would have applied it initially
            const appliedGQLValue = itemDefintionInQuestion.getGQLAppliedValue(searchResult.id, searchResult.version);
            if (appliedGQLValue &&
                gql_util_1.requestFieldsAreContained(this.props.searchFields, appliedGQLValue.requestFields)) {
                return null;
            }
            if (!cache_1.default.isSupported) {
                uncachedResults.push(searchResult);
                return null;
            }
            else {
                const cachedResult = await cache_1.default.instance.getCachedValue(constants_1.PREFIX_GET + itemDefintionInQuestion.getQualifiedPathName(), searchResult.id, searchResult.version, this.props.searchFields);
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
                    .getParentRoot().registry[cr.forType];
                if (cr.cachedResult.value) {
                    // we apply the value, whatever we have gotten this will affect all the instances
                    // that use the same value
                    itemDefintionInQuestion.applyValue(cr.forId, cr.forVersion, cr.cachedResult.value, false, this.props.tokenData.id, this.props.tokenData.role, cr.cachedResult.fields, true);
                    // and then we trigger the change listener for all the instances
                    itemDefintionInQuestion.triggerListeners("change", cr.forId, cr.forVersion);
                }
                else {
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
            const args = {
                token: this.props.tokenData.token,
                language: this.props.localeData.language.split("-")[0],
                records: uncachedResults,
            };
            if (this.props.searchOwner) {
                args.created_by = this.props.searchOwner;
            }
            const listQuery = gql_querier_1.buildGqlQuery({
                name: getListQueryName,
                args,
                fields: {
                    results: this.props.searchFields,
                },
            });
            const gqlValue = await gql_querier_1.gqlQuery(listQuery);
            // now we got to check for errors
            let error = null;
            if (gqlValue.errors) {
                // if the server itself returned an error, we use that error
                error = gqlValue.errors[0].extensions;
            }
            if (!error &&
                gqlValue &&
                gqlValue.data &&
                gqlValue.data[getListQueryName] &&
                gqlValue.data[getListQueryName].results) {
                gqlValue.data[getListQueryName].results.forEach((value, index) => {
                    const forId = uncachedResults[index].id;
                    const forVersion = uncachedResults[index].version;
                    const forType = uncachedResults[index].type;
                    const itemDefintionInQuestion = this.props.itemDefinitionInstance.getParentModule()
                        .getParentRoot().registry[forType];
                    let valueToApply = value ? {
                        ...value,
                    } : value;
                    if (!valueToApply) {
                        itemDefintionInQuestion.cleanValueFor(forId, forVersion);
                        itemDefintionInQuestion.triggerListeners("change", forId, forVersion);
                    }
                    else {
                        let mergedQueryFields = this.props.searchFields;
                        const appliedGQLValue = itemDefintionInQuestion.getGQLAppliedValue(value.id, value.version);
                        if (appliedGQLValue &&
                            appliedGQLValue.rawValue &&
                            appliedGQLValue.rawValue.last_modified === valueToApply.last_modified) {
                            valueToApply = gql_util_1.deepMerge(valueToApply, appliedGQLValue.rawValue);
                            mergedQueryFields = gql_util_1.deepMerge(this.props.searchFields, appliedGQLValue.requestFields);
                        }
                        itemDefintionInQuestion.applyValue(valueToApply.id, valueToApply.version, valueToApply, false, this.props.tokenData.id, this.props.tokenData.role, mergedQueryFields, true);
                        itemDefintionInQuestion.triggerListeners("change", forId, forVersion);
                    }
                });
            }
            this.setState({
                error,
                currentlySearching: [],
            });
        }
        else {
            this.setState({
                error: null,
                currentlySearching: [],
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
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
            !deep_equal_1.default(this.state, nextState);
    }
    render() {
        const accessibleCount = (this.props.searchRecords || []).length;
        const pageCount = accessibleCount === 0 ? 0 : Math.ceil(accessibleCount / this.props.pageSize);
        const totalCount = this.props.searchCount || 0;
        return (react_1.default.createElement(item_definition_1.SearchItemDefinitionValueContext.Provider, { value: {
                currentlySearching: this.state.currentlySearching,
                searchFields: this.state.searchFields,
            } }, this.props.children({
            searchRecords: this.state.error ? [] : this.state.currentSearchRecords.map((searchRecord) => {
                const itemDefinition = this.props.itemDefinitionInstance
                    .getParentModule().getParentRoot().registry[searchRecord.type];
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
        })));
    }
}
function SearchLoader(props) {
    return (react_1.default.createElement(app_1.LocaleContext.Consumer, null, (localeData) => (react_1.default.createElement(token_provider_1.TokenContext.Consumer, null, (tokenData) => (react_1.default.createElement(item_definition_1.ItemDefinitionContext.Consumer, null, (itemDefinitionContext) => (react_1.default.createElement(ActualSearchLoader, Object.assign({}, props, { itemDefinitionInstance: itemDefinitionContext.idef, remoteListener: itemDefinitionContext.remoteListener, searchId: itemDefinitionContext.searchId, searchRecords: itemDefinitionContext.searchRecords, searchResults: itemDefinitionContext.searchResults, searchCount: itemDefinitionContext.searchCount, searchOffset: itemDefinitionContext.searchOffset, searchLimit: itemDefinitionContext.searchLimit, searchOwner: itemDefinitionContext.searchOwner, searchShouldCache: itemDefinitionContext.searchShouldCache, searchRequestedIncludes: itemDefinitionContext.searchRequestedIncludes, searchRequestedProperties: itemDefinitionContext.searchRequestedProperties, searchFields: itemDefinitionContext.searchFields, tokenData: tokenData, localeData: localeData })))))))));
}
exports.default = SearchLoader;
