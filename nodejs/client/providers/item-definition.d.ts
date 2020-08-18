import React from "react";
import { ILocaleContextType } from "../internal/providers/locale-provider";
import ItemDefinition, { IItemDefinitionStateType } from "../../base/Root/Module/ItemDefinition";
import PropertyDefinition from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import Include, { IncludeExclusionState } from "../../base/Root/Module/ItemDefinition/Include";
import { ITokenContextType } from "../internal/providers/token-provider";
import { IOrderByRuleType } from "../../constants";
import { IGQLSearchRecord, IGQLValue } from "../../gql-querier";
import { EndpointErrorType } from "../../base/errors";
import { RemoteListener } from "../internal/app/remote-listener";
import { IPropertySetterProps } from "../components/property/base";
import { IConfigRawJSONDataType } from "../../config";
import { Location } from "history";
/**
 * A response given by some handlers like
 * loadValue
 */
export interface IBasicActionResponse {
    error: EndpointErrorType;
}
export interface IActionResponseWithValue extends IBasicActionResponse {
    value: any;
}
export interface ILoadCompletedPayload extends IActionResponseWithValue {
    forId: number;
    forVersion: string;
}
/**
 * A response given by submit and delete
 */
export interface IActionResponseWithId extends IBasicActionResponse {
    id: number;
}
/**
 * A response given by search
 */
export interface IActionResponseWithSearchResults extends IBasicActionResponse {
    searchId: string;
    records: IGQLSearchRecord[];
    results: IGQLValue[];
    count: number;
    limit: number;
    offset: number;
}
export declare type PolicyPathType = [string, string, string];
export interface IActionCleanOptions {
    policiesToCleanOnSuccess?: PolicyPathType[];
    policiesToCleanOnAny?: PolicyPathType[];
    policiesToCleanOnFailure?: PolicyPathType[];
    propertiesToCleanOnSuccess?: string[];
    propertiesToCleanOnAny?: string[];
    propertiesToCleanOnFailure?: string[];
    propertiesToRestoreOnSuccess?: string[];
    propertiesToRestoreOnAny?: string[];
    propertiesToRestoreOnFailure?: string[];
    includesToCleanOnSuccess?: string[];
    includesToCleanOnAny?: string[];
    includesToCleanOnFailure?: string[];
    includesToRestoreOnSuccess?: string[];
    includesToRestoreOnAny?: string[];
    includesToRestoreOnFailure?: string[];
    unpokeAfterSuccess?: boolean;
    unpokeAfterAny?: boolean;
    unpokeAfterFailure?: boolean;
    cleanSearchResultsOnSuccess?: boolean;
    cleanSearchResultsOnAny?: boolean;
    cleanSearchResultsOnFailure?: boolean;
}
/**
 * The options for submitting,
 * aka edit, aka add
 */
export interface IActionSubmitOptions extends IActionCleanOptions {
    properties: string[];
    differingOnly?: boolean;
    includes?: string[];
    policies?: PolicyPathType[];
    beforeSubmit?: () => boolean;
    parentedBy?: {
        module: string;
        itemDefinition: string;
        id: number;
        version?: string;
    };
}
export interface IActionDeleteOptions extends IActionCleanOptions {
    policies?: PolicyPathType[];
    beforeDelete?: () => boolean;
}
/**
 * The options for searching
 */
export interface IActionSearchOptions extends IActionCleanOptions {
    requestedProperties: string[];
    requestedIncludes?: string[];
    searchByProperties: string[];
    searchByIncludes?: string[];
    orderBy?: IOrderByRuleType;
    createdBy?: number;
    parentedBy?: {
        module: string;
        itemDefinition: string;
        id: number;
        version?: string;
    };
    cachePolicy?: "by-owner" | "by-parent" | "none";
    traditional?: boolean;
    limit: number;
    offset: number;
    storeResultsInNavigation?: string;
}
export interface IPokeElementsType {
    properties: string[];
    includes: string[];
    policies: PolicyPathType[];
}
/**
 * The whole item definition context
 */
export interface IItemDefinitionContextType {
    idef: ItemDefinition;
    state: IItemDefinitionStateType;
    forId: number;
    forVersion: string;
    notFound: boolean;
    blocked: boolean;
    blockedButDataAccessible: boolean;
    loadError: EndpointErrorType;
    loading: boolean;
    loaded: boolean;
    submitError: EndpointErrorType;
    submitting: boolean;
    submitted: boolean;
    deleteError: EndpointErrorType;
    deleting: boolean;
    deleted: boolean;
    searchError: EndpointErrorType;
    searching: boolean;
    searchRecords: IGQLSearchRecord[];
    searchResults: IGQLValue[];
    searchLimit: number;
    searchOffset: number;
    searchCount: number;
    searchId: string;
    searchWasRestored: boolean;
    searchOwner: number;
    searchShouldCache: boolean;
    searchFields: any;
    searchRequestedProperties: string[];
    searchRequestedIncludes: string[];
    pokedElements: IPokeElementsType;
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    reload: (denyCache?: boolean) => Promise<IActionResponseWithValue>;
    submit: (options: IActionSubmitOptions) => Promise<IActionResponseWithId>;
    delete: () => Promise<IBasicActionResponse>;
    clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
    search: (options: IActionSearchOptions) => Promise<IActionResponseWithSearchResults>;
    onPropertyChange: (property: PropertyDefinition, value: PropertyDefinitionSupportedType, internalValue: any) => void;
    onPropertyRestore: (property: PropertyDefinition) => void;
    onIncludeSetExclusionState: (include: Include, state: IncludeExclusionState) => void;
    onPropertyEnforce: (property: PropertyDefinition, value: PropertyDefinitionSupportedType, givenForId: number, givenForVersion: string) => void;
    onPropertyClearEnforce: (property: PropertyDefinition, givenForId: number, givenForVersion: string) => void;
    dismissLoadError: () => void;
    dismissSubmitError: () => void;
    dismissSubmitted: () => void;
    dismissDeleteError: () => void;
    dismissDeleted: () => void;
    dismissSearchError: () => void;
    dismissSearchResults: () => void;
    poke: (elements: IPokeElementsType) => void;
    unpoke: () => void;
    remoteListener: RemoteListener;
    injectedParentContext: IItemDefinitionContextType;
    injectSubmitBlockPromise: (arg: Promise<any>) => void;
}
export interface ISearchItemDefinitionValueContextType {
    currentlySearching: IGQLSearchRecord[];
    searchFields: any;
}
export declare const ItemDefinitionContext: React.Context<IItemDefinitionContextType>;
export declare const SearchItemDefinitionValueContext: React.Context<ISearchItemDefinitionValueContextType>;
export interface IItemDefinitionProviderProps {
    /**
     * children that will be feed into the context
     */
    children: React.ReactNode;
    /**
     * mounting id, adding a mounting id ensures
     * that the on dismount functions are called
     * if this changes, otherwise they will only be called
     * on the literal componentWillUnmount alone
     */
    mountId?: string;
    /**
     * the item definition slash/separated/path
     * if you don't specify this, the context will be
     * based on the prop extensions emulated item definition
     */
    itemDefinition?: string | ItemDefinition;
    /**
     * the id, specifying an id makes a huge difference
     */
    forId?: number;
    /**
     * the version
     */
    forVersion?: string;
    /**
     * this is an important flag, if ownership is assumed this means
     * that when automatic fetching of properties it will do so assuming
     * the current user is the owner, so OWNER rules pass, put an example,
     * loading the current user, you have the current user id, and you need
     * to load the user data, if you assume ownership, fields like email will
     * be fetched, without it, they will not be fetched, use this field
     * careful as fetching fields without the right credentials
     * might trigger an error
     */
    assumeOwnership?: boolean;
    /**
     * whether this is about the search counterpart for using
     * with searches, this opens a whole can of worms
     */
    searchCounterpart?: boolean;
    /**
     * some fields, eg. autocompleted ones and unique ones have rest
     * endpoints for them that will run checks, you might want to disable
     * these checks in two circumstances, 1. for efficiency if you don't need them
     * 2. for an UX reason, for example during login, if the field is constantly checking
     * that the external check is unique, for an username, then you will have an annoying
     * error popping on, saying that the username is taken, but you are logging in so that
     * external check is unecessary; note that disabling external checks has no effect
     * if the item definition has no externally checked properties
     */
    disableExternalChecks?: boolean;
    /**
     * automatic search triggers an automatic search when the item mounts
     * or it detects a change in the properties, this basically triggers
     * the .search function with these arguments whenever it is detected
     * it should do so
     */
    automaticSearch?: IActionSearchOptions;
    /**
     * Makes automatic search happen only on mount
     */
    automaticSearchIsOnlyInitial?: boolean;
    /**
     * Load searches from the popstate event, use with the option for
     * storeResultsInNavigation and the same identifier
     */
    loadSearchFromNavigation?: string;
    /**
     * Setters for setting values for the properties within the item definition
     * itself, useful not to depend on mounting at time
     */
    setters?: IPropertySetterProps[];
    /**
     * only downloads and includes the properties specified in the list
     * in the state
     */
    properties?: string[];
    /**
     * only includes the items specified in the list in the state
     */
    includes?: string[];
    /**
     * excludes the policies from being part of the state
     */
    includePolicies?: boolean;
    /**
     * cleans or restores the value from the memory once the object dismounts
     * or the mount id changes; always remember to set a mountId property
     * for using this in order to be able to difference item definition
     * loaders between themselves
     */
    cleanOnDismount?: boolean | IActionCleanOptions;
    /**
     * static components do not update
     * A no listening static item definition will not update on
     * remote changes
     * a total static component does not even ask for feedback
     * it displays what it initially gets, wherever it comes from
     */
    static?: "TOTAL" | "NO_LISTENING";
    /**
     * uses long term caching with the worker cache strategy
     */
    longTermCaching?: boolean;
    /**
     * marks the item for destruction as the user logs out
     */
    markForDestructionOnLogout?: boolean;
    /**
     * avoids running loadValue
     */
    avoidLoading?: boolean;
    /**
     * allows insertion of the parent context within the children
     */
    injectParentContext?: boolean;
}
interface IActualItemDefinitionProviderProps extends IItemDefinitionProviderProps {
    tokenData: ITokenContextType;
    localeData: ILocaleContextType;
    itemDefinitionInstance: ItemDefinition;
    itemDefinitionQualifiedName: string;
    containsExternallyCheckedProperty: boolean;
    remoteListener: RemoteListener;
    searchContext: ISearchItemDefinitionValueContextType;
    injectedParentContext: IItemDefinitionContextType;
    config: IConfigRawJSONDataType;
    location?: Location<any>;
}
interface IActualItemDefinitionProviderSearchState {
    searchError: EndpointErrorType;
    searching: boolean;
    searchRecords: IGQLSearchRecord[];
    searchResults: IGQLValue[];
    searchLimit: number;
    searchOffset: number;
    searchCount: number;
    searchId: string;
    searchOwner: number;
    searchParent: [string, number, string];
    searchShouldCache: boolean;
    searchRequestedProperties: string[];
    searchRequestedIncludes: string[];
    searchFields: any;
}
interface IActualItemDefinitionProviderState extends IActualItemDefinitionProviderSearchState {
    searchWasRestored: boolean;
    itemDefinitionState: IItemDefinitionStateType;
    isBlocked: boolean;
    isBlockedButDataIsAccessible: boolean;
    notFound: boolean;
    loadError: EndpointErrorType;
    loading: boolean;
    loaded: boolean;
    submitError: EndpointErrorType;
    submitting: boolean;
    submitted: boolean;
    deleteError: EndpointErrorType;
    deleting: boolean;
    deleted: boolean;
    pokedElements: IPokeElementsType;
    canEdit: boolean;
    canDelete: boolean;
    canCreate: boolean;
}
/**
 * Here it is, the mighty
 */
export declare class ActualItemDefinitionProvider extends React.Component<IActualItemDefinitionProviderProps, IActualItemDefinitionProviderState> {
    private isUnmounted;
    private isMounted;
    /**
     * Because sometimes functions for listeners run while the thing
     * is mounting, but we haven't mounted yet, we use these callbacks
     * to store these callbacks for the listeners; this happens
     * because the willUnmount of another item definition might trigger
     * a change event while this instance is mounting, during cleanup
     */
    private mountCbFns;
    /**
     * Because the listener might be triggered during a mount cb and this
     * will not change the state, automatic search might not trigger on mount
     * as it sees the previous state, so with this, we might now if the
     * search id was changed and for what, and trigger automatic search
     */
    private changedSearchListenerLastCollectedSearchId;
    private initialAutomaticNextSearch;
    /**
     * this is a hack variable, when the server
     * sends a reload event for a search and that causes
     * the cache worker to add such a value to the list
     * that it considered to be added, and then this
     * causes this instance to call for an update
     * and the search needs to be reloaded
     * however the server has already specified how the data
     * is meant to update, but launching this as it is, will
     * cause the client to check because it considers that the
     * data might be stale because it got the data from the
     * cache worker, but we had updated this data a couple of microseconds
     * earlier so we make this hack variable to prevent asking for
     * feedback as we already got feedback
     *
     * Check the on search reload function where it is set and then
     * it's sent to the search querier so that feedback
     * is not requested
     */
    private preventSearchFeedbackOnPossibleStaleData;
    /**
     * During loading both the id and version might be suddenly hot
     * updated before the server had time to reply this ensures
     * that we will only apply the value for the last loading
     * value and not overwrite if we have changed such value hot
     */
    private lastLoadingForId;
    private lastLoadingForVersion;
    /**
     * Some functons such as submit, on property change
     * events where we request new values for the
     * properties need to wait for loading to be done
     * with these promises we can await for the last loading
     * event
     */
    private lastLoadValuePromise;
    private lastLoadValuePromiseIsResolved;
    private lastLoadValuePromiseResolve;
    static getDerivedStateFromProps(props: IActualItemDefinitionProviderProps, state: IActualItemDefinitionProviderState): Partial<IActualItemDefinitionProviderState>;
    private updateTimeout;
    private lastUpdateId;
    private lastOptionsUsedForSearch;
    private submitBlockPromises;
    constructor(props: IActualItemDefinitionProviderProps);
    setupInitialState(): IActualItemDefinitionProviderState;
    injectSubmitBlockPromise(p: Promise<any>): void;
    markForDestruction(): void;
    installSetters(props?: IActualItemDefinitionProviderProps): void;
    removeSetters(props?: IActualItemDefinitionProviderProps): void;
    componentDidMount(): void;
    setupListeners(): void;
    unSetupListeners(): void;
    shouldComponentUpdate(nextProps: IActualItemDefinitionProviderProps, nextState: IActualItemDefinitionProviderState): boolean;
    componentDidUpdate(prevProps: IActualItemDefinitionProviderProps, prevState: IActualItemDefinitionProviderState): Promise<void>;
    reloadListener(): void;
    changeSearchListener(): void;
    changeListener(): void;
    loadValue(denyCache?: boolean): Promise<IActionResponseWithValue>;
    loadValueCompleted(value: ILoadCompletedPayload): IActionResponseWithValue;
    setStateToCurrentValueWithExternalChecking(currentUpdateId: number): Promise<void>;
    onPropertyChangeOrRestoreFinal(): void;
    onPropertyRestore(property: PropertyDefinition): void;
    onPropertyChange(property: PropertyDefinition, value: PropertyDefinitionSupportedType, internalValue: any): Promise<void>;
    onPropertyEnforce(property: PropertyDefinition, value: PropertyDefinitionSupportedType, givenForId: number, givenForVersion: string, internal?: boolean): void;
    onPropertyClearEnforce(property: PropertyDefinition, givenForId: number, givenForVersion: string, internal?: boolean): void;
    runDismountOn(props?: IActualItemDefinitionProviderProps): void;
    componentWillUnmount(): void;
    onIncludeSetExclusionState(include: Include, state: IncludeExclusionState): void;
    checkItemDefinitionStateValidity(options: {
        properties: string[];
        includes?: string[];
        policies?: PolicyPathType[];
        onlyIncludeIfDiffersFromAppliedValue?: boolean;
    }): boolean;
    giveEmulatedInvalidError(stateApplied: string, withId: boolean, withSearchResults: boolean): IActionResponseWithId | IActionResponseWithValue | IActionResponseWithSearchResults;
    delete(options?: IActionDeleteOptions): Promise<IBasicActionResponse>;
    clean(options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean): void;
    cleanWithProps(props: IActualItemDefinitionProviderProps, options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean): void;
    submit(options: IActionSubmitOptions): Promise<IActionResponseWithId>;
    loadSearch(doNotUseState?: boolean, currentSearchId?: string): any;
    search(options: IActionSearchOptions): Promise<IActionResponseWithSearchResults>;
    dismissLoadError(): void;
    dismissDeleteError(): void;
    dismissSubmitError(): void;
    dismissSubmitted(): void;
    dismissDeleted(): void;
    dismissSearchError(): void;
    onSearchReload(): void;
    removePossibleSearchListeners(props?: IActualItemDefinitionProviderProps, state?: IActualItemDefinitionProviderState): void;
    dismissSearchResults(): void;
    canDelete(): boolean;
    canCreate(): boolean;
    canEdit(): boolean;
    poke(elements: IPokeElementsType): void;
    unpoke(): void;
    render(): JSX.Element;
}
export declare function ItemDefinitionProvider(props: IItemDefinitionProviderProps): JSX.Element;
interface INoStateItemDefinitionProviderProps {
    itemDefinition?: string;
    children?: React.ReactNode;
}
export declare function NoStateItemDefinitionProvider(props: INoStateItemDefinitionProviderProps): JSX.Element;
export declare function ParentItemDefinitionContextProvider(props: {
    children: React.ReactNode;
}): JSX.Element;
export {};
