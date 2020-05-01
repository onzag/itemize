import React from "react";
import { LocaleContext, ILocaleContextType } from "../internal/app";
import ItemDefinition, { IItemDefinitionStateType, ItemDefinitionIOActions } from "../../base/Root/Module/ItemDefinition";
import PropertyDefinition from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import Include, { IncludeExclusionState } from "../../base/Root/Module/ItemDefinition/Include";
import { TokenContext, ITokenContextType } from "../internal/app/internal-providers";
import {
  PREFIX_GET,
  UNSPECIFIED_OWNER,
  ENDPOINT_ERRORS,
  MEMCACHED_DESTRUCTION_MARKERS_LOCATION,
  DESTRUCTION_MARKERS_LOCATION,
} from "../../constants";
import {IGQLSearchResult, IGQLValue, IGQLRequestFields } from "../../gql-querier";
import { requestFieldsAreContained } from "../../gql-util";
import { EndpointErrorType } from "../../base/errors";
import equals from "deep-equal";
import { ModuleContext } from "./module";
import { getConversionIds } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/search-mode";
import CacheWorkerInstance from "../internal/workers/cache";
import { RemoteListener } from "../internal/app/remote-listener";
import uuid from "uuid";
import { getFieldsAndArgs, runGetQueryFor, runDeleteQueryFor, runEditQueryFor, runAddQueryFor, runSearchQueryFor } from "../internal/gql-client-util";

// THIS IS THE MOST IMPORTANT FILE OF WHOLE ITEMIZE
// HERE IS WHERE THE MAGIC HAPPENS

// TODO this file is too complex, we need to simplify, specially policies they are killing this file

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
  results: IGQLSearchResult[];
}

export type PolicyPathType = [string, string, string];

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
  orderBy?: "DEFAULT";
  createdBy?: number;
  parentedBy?: {
    module: string,
    itemDefinition: string,
    id: number,
    version?: string,
  };
  cachePolicy?: "by-owner" | "by-parent" | "none";
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
  // the item definition in question
  idef: ItemDefinition;
  // the state of this item definition that has
  // been pulled and calculated from this item definition
  state: IItemDefinitionStateType;
  // the id of which it was pulled from, this might be
  // null
  forId: number;
  // the version of which it was pulled from
  forVersion: string;
  // with ids a not found flag might be set if the item
  // is not found 404
  notFound: boolean;
  // with ids the item might be blocked as well so this
  // flag is raised
  blocked: boolean;
  // if you are a moderator, or have a role that permits it
  // data might still be available, this comes together with
  // blocked
  blockedButDataAccessible: boolean;
  // an error that came during loading
  loadError: EndpointErrorType;
  // whether it is currently loading
  loading: boolean;
  // an error that came during submitting
  submitError: EndpointErrorType;
  // whether it is currently submitting
  submitting: boolean;
  // whether it has submitted sucesfully, this is a transitory
  // flag, and should be removed, basically it means the item
  // is in a success state of submitted
  submitted: boolean;
  // an error that came during deleting
  deleteError: EndpointErrorType;
  // whether it is currently deleting
  deleting: boolean;
  // same as submitted, a success flag that says whether the element
  // was deleted
  deleted: boolean;
  // an error that occured during search
  searchError: EndpointErrorType;
  // whether it is currently searching
  searching: boolean;
  // the obtained search results from the graphql endpoint
  // just as they come
  searchResults: IGQLSearchResult[];
  // a search id for the obtained results whether error
  // or success
  searchId: string;
  // a search owner, or null, for the createdBy argument
  searchOwner: number;
  // passed onto the search to tell it if results that are retrieved
  // and then updated should be cached into the cache using the
  // long term strategy, this is usually true when cachePolicy is something
  searchShouldCache: boolean;
  // the search fields that should be requested according
  // to the search function
  searchFields: any;
  searchRequestedProperties: string[];
  searchRequestedIncludes: string[];
  // poked is a flag that is raised to mean to ignore
  // anything regarding user set statuses and just mark
  // things as they are, for example, by default many fields
  // are empty (null) and they are invalid, but in UX wise
  // it makes no sense to show as invalid immediately
  // poked makes it so that every field shows its true state
  // they are poked
  pokedElements: IPokeElementsType;
  // specifies whether the current user can create
  canCreate: boolean;
  // specifies whether the current user can delete
  canEdit: boolean;
  // do I really have to explain this one too?
  canDelete: boolean;
  // makes it so that it reloads the value, the loadValue function
  // usually is executed on componentDidMount, pass deny cache in order to
  // do a hard refresh and bypass the cache
  reload: (denyCache?: boolean) => Promise<IActionResponseWithValue>;
  // submits the current information, when there's no id, this triggers an
  // add action, with an id however this trigger edition
  submit: (options: IActionSubmitOptions) => Promise<IActionResponseWithId>;
  // straightwforward, deletes
  delete: () => Promise<IBasicActionResponse>;
  // cleans performs the cleanup of properties and policies
  clean: (options: IActionCleanOptions, state: "success" | "fail", avoidTriggeringUpdate?: boolean) => void;
  // performs a search, note that you should be in the searchMode however
  // since all items are the same it's totally possible to launch a search
  // in which case you'll just get a searchError you should be in search
  // mode because there are no endpoints otherwise
  search: (options: IActionSearchOptions) => Promise<IActionResponseWithSearchResults>;
  // this is a listener that basically takes a property, and a new value
  // and internal value, whatever is down the line is not expected to do
  // changes directly, but rather call this function, this function will
  // then update everything under the hood
  onPropertyChange: (
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    internalValue: any,
  ) => void;
  // this is yet another passed function that does the same as properties
  // but with exclusion states
  onIncludeSetExclusionState: (
    include: Include,
    state: IncludeExclusionState,
  ) => void;
  // now this would be used on enforcement, this is used for the setter
  // the reason it also needs to specify the id is because it might
  // go out of sync with the item definition
  onPropertyEnforce: (
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    givenForId: number,
    givenForVersion: string,
  ) => void;
  onPropertyClearEnforce: (
    property: PropertyDefinition,
    givenForId: number,
    givenForVersion: string,
  ) => void;

  // dismisses of he many errors and flags
  dismissLoadError: () => void;
  dismissSubmitError: () => void;
  dismissSubmitted: () => void;
  dismissDeleteError: () => void;
  dismissDeleted: () => void;
  dismissSearchError: () => void;
  dismissSearchResults: () => void;

  // to remove the poked status
  unpoke: () => void;

  // the remote listener
  remoteListener: RemoteListener;
}

export interface ISearchItemDefinitionValueContextType {
  currentlySearching: IGQLSearchResult[];
  searchFields: any;
}

// This is the context that will serve it
export const ItemDefinitionContext = React.createContext<IItemDefinitionContextType>(null);
export const SearchItemDefinitionValueContext = React.createContext<ISearchItemDefinitionValueContextType>(null);

// Now we pass on the provider, this is what the developer
// is actually expected to fill
export interface IItemDefinitionProviderProps {
  /**
   * children that will be feed into the context
   */
  children: React.ReactNode;
  /**
   * the item definition slash/separated/path
   * if you don't specify this, the context will be
   * based on the prop extensions emulated item definition
   */
  itemDefinition?: string;
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
   * only downloads and includes the properties specified in the list
   * in the state
   */
  properties: string[];
  /**
   * only includes the items specified in the list in the state
   */
  includes?: string[];
  /**
   * excludes the policies from being part of the state
   */
  includePolicies?: boolean;
  /**
   * cleans the value from the memory cache once the object dismounts
   * as the memory cache might only grow and grow
   */
  cleanOnDismount?: boolean | IActionCleanOptions;
  /**
   * static components do not update remotely
   */
  static?: boolean;
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
}

// This represents the actual provider that does the job, it takes on some extra properties
// taken from the contexts that this is expected to run under
interface IActualItemDefinitionProviderProps extends IItemDefinitionProviderProps {
  // token data to get the current user id, and role, for requests
  tokenData: ITokenContextType;
  // locale data for, well.... localization, nah it's actually to setup the language
  // during requests, so that full text search can function
  localeData: ILocaleContextType;
  // the item definition istance that was fetched from the itemDefinition
  itemDefinitionInstance: ItemDefinition;
  // the qualified name of such item definition
  itemDefinitionQualifiedName: string;
  // and whether it contains externally checked properties
  containsExternallyCheckedProperty: boolean;
  // the remote listener for listening to changes that occur
  // server side
  remoteListener: RemoteListener;
  // the searching context to pull values from
  searchContext: ISearchItemDefinitionValueContextType;
}

// This is the state of such, it's basically a copy of the
// context, so refer to that, the context is avobe
interface IActualItemDefinitionProviderState {
  itemDefinitionState: IItemDefinitionStateType;
  isBlocked: boolean;
  isBlockedButDataIsAccessible: boolean;
  notFound: boolean;
  loadError: EndpointErrorType;
  loading: boolean;
  submitError: EndpointErrorType;
  submitting: boolean;
  submitted: boolean;
  deleteError: EndpointErrorType;
  deleting: boolean;
  deleted: boolean;
  searchError: EndpointErrorType;
  searching: boolean;
  searchResults: IGQLSearchResult[];
  searchId: string;
  searchOwner: number;
  searchParent: [string, number, string];
  searchShouldCache: boolean;
  searchRequestedProperties: string[];
  searchRequestedIncludes: string[];
  searchFields: any;
  pokedElements: IPokeElementsType;
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
}

/**
 * Here it is, the mighty
 */
export class ActualItemDefinitionProvider extends
  React.Component<IActualItemDefinitionProviderProps, IActualItemDefinitionProviderState> {
  // this variable is useful is async tasks like loadValue are still executing after
  // this component has unmounted, which is a memory leak
  private isUnmounted: boolean = false;

  // sometimes when doing some updates when you change the item
  // definition to another item definition (strange but ok)
  // the state between the item and the expected state will
  // not match, so we need to make it be the state of the
  // item definition itself, so we make a check using the qualified name
  public static getDerivedStateFromProps(
    props: IActualItemDefinitionProviderProps,
    state: IActualItemDefinitionProviderState,
  ) {
    // it is effective to do it here, so we use the state qualified name and the
    // idef qualified name to check, also the id in question matters to
    // normally we don't want to recalculate states in every render because
    // that is hugely inefficient, it would make the code simpler, but no
    // this needs to run fast, as it's already pretty resource intensive
    if (
      props.itemDefinitionQualifiedName !== state.itemDefinitionState.itemDefQualifiedName ||
      (props.forId || null) !== (state.itemDefinitionState.forId || null)
    ) {
      // note how we pass the optimization flags
      return {
        state: props.itemDefinitionInstance.getStateNoExternalChecking(
          props.forId || null,
          props.forVersion || null,
          !props.disableExternalChecks,
          props.properties,
          props.includes || [],
          !props.includePolicies,
        ),
      };
    }
    return null;
  }

  // These are used for external checking, when available
  // we dont want to external check based off every character
  // so we have a timeout and update id
  private updateTimeout: NodeJS.Timer;
  // the update id is to prevent value stacking if for some
  // weird reason an external check returns before another, say
  // kitt returns after kitten, which might give an error if they
  // come out of order, so only the last state is relevant
  private lastUpdateId: number;
  // here we store the last options we used during a search
  // event this is just to that when the reload is executed these
  // options are used
  private lastOptionsUsedForSearch: IActionSearchOptions;

  constructor(props: IActualItemDefinitionProviderProps) {
    super(props);

    // Just binding all the functions to ensure their context is defined
    this.onPropertyChange = this.onPropertyChange.bind(this);
    this.onIncludeSetExclusionState = this.onIncludeSetExclusionState.bind(this);
    this.loadValue = this.loadValue.bind(this);
    this.delete = this.delete.bind(this);
    this.changeListener = this.changeListener.bind(this);
    this.reloadListener = this.reloadListener.bind(this);
    this.submit = this.submit.bind(this);
    this.dismissLoadError = this.dismissLoadError.bind(this);
    this.dismissSubmitError = this.dismissSubmitError.bind(this);
    this.dismissDeleteError = this.dismissSubmitError.bind(this);
    this.onPropertyEnforce = this.onPropertyEnforce.bind(this);
    this.onPropertyClearEnforce = this.onPropertyClearEnforce.bind(this);
    this.dismissSubmitted = this.dismissSubmitted.bind(this);
    this.dismissDeleted = this.dismissDeleted.bind(this);
    this.canEdit = this.canEdit.bind(this);
    this.canCreate = this.canCreate.bind(this);
    this.canDelete = this.canDelete.bind(this);
    this.unpoke = this.unpoke.bind(this);
    this.search = this.search.bind(this);
    this.dismissSearchError = this.dismissSearchError.bind(this);
    this.dismissSearchResults = this.dismissSearchResults.bind(this);
    this.onSearchReload = this.onSearchReload.bind(this);

    // we get the initial state
    this.state = this.setupInitialState();

    // and if we have a cache, which runs behind a worker
    if (CacheWorkerInstance.isSupported) {
      // let's set it up
      // as you can see this function might run several times per instance
      // but that's okay, all next runs get ignored
      CacheWorkerInstance.instance.setupVersion((window as any).BUILD_NUMBER);
    }
  }
  public setupInitialState(): IActualItemDefinitionProviderState {
    // so the initial setup
    return {
      // same we get the initial state, without checking it externally and passing
      // all the optimization flags
      itemDefinitionState: this.props.itemDefinitionInstance.getStateNoExternalChecking(
        this.props.forId || null,
        this.props.forVersion || null,
        !this.props.disableExternalChecks,
        this.props.properties,
        this.props.includes || [],
        !this.props.includePolicies,
      ),
      // and we pass all this state
      isBlocked: false,
      isBlockedButDataIsAccessible: false,
      notFound: false,
      loadError: null,
      // loading will be true if we are setting up with an id
      // as after mount it will attempt to load such id, in order
      // to avoid pointless refresh we set it up as true from
      // the beggining
      loading: this.props.avoidLoading ? false : !!this.props.forId,

      submitError: null,
      submitting: false,
      submitted: false,

      deleteError: null,
      deleting: false,
      deleted: false,

      searchError: null,
      searching: false,
      searchResults: [],
      searchId: null,
      searchOwner: null,
      searchParent: null,
      searchShouldCache: false,
      searchFields: null,
      searchRequestedIncludes: [],
      searchRequestedProperties: [],

      pokedElements: {
        properties: [],
        includes: [],
        policies: [],
      },

      canEdit: this.canEdit(),
      canDelete: this.canDelete(),
      canCreate: this.canCreate(),
    };
  }
  public markForDestruction() {
    if (this.props.forId) {
      const qualifiedName = this.props.itemDefinitionInstance.getQualifiedPathName();
      const forId = this.props.forId;
      const forVersion = this.props.forVersion || null;

      (window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION] =
        (window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION] ||
        JSON.parse(localStorage.getItem(DESTRUCTION_MARKERS_LOCATION) || "{}");
      let changed = false;
      if (!(window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION][qualifiedName]) {
        (window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION][qualifiedName] = [[forId, forVersion]];
        changed = true;
      } else {
        if (!(window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION][qualifiedName].find((m) => m[0] === forId && m[1] === forVersion)) {
          changed = true;
          (window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION][qualifiedName].push([forId, forVersion]);
        }
      }

      if (changed) {
        localStorage.setItem(DESTRUCTION_MARKERS_LOCATION, JSON.stringify((window as any)[MEMCACHED_DESTRUCTION_MARKERS_LOCATION]));
      }
    }
  }
  // so now we have mounted, what do we do at the start
  public componentDidMount() {
    // first we setup the listeners, this includes the on change listener that would make
    // the entire app respond to actions, otherwise the fields might as well be disabled
    this.setupListeners();
    // now we retrieve the externally checked value
    if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      this.setStateToCurrentValueWithExternalChecking(null);
    }

    if (this.props.automaticSearch) {
      this.search(this.props.automaticSearch);
    }

    if (this.props.markForDestructionOnLogout) {
      this.markForDestruction();
    }

    // and we attempt to load the current value
    if (!this.props.avoidLoading) {
      this.loadValue();
    }
  }

  // setup the listeners is simple
  public setupListeners() {
    /// first the change listener that checks for every change event that happens with the state
    this.props.itemDefinitionInstance.addListener(
      "change", this.props.forId || null, this.props.forVersion || null, this.changeListener,
    );

    // second are the remote listeners, only when there's an id defined
    if (this.props.forId && !this.props.static) {
      // one is the reload, this gets called when the value of the field has differed from the one that
      // we have gotten (or have cached) this listener is very important for that reason, otherwise our app
      // will get frozen in the past
      this.props.itemDefinitionInstance.addListener(
        "reload", this.props.forId, this.props.forVersion || null, this.reloadListener,
      );

      // note how we used the item definition instance and that's because those events are piped from
      // within this remote listener, the remote listener pipes the events from the websocket
      // and triggers them in within the item definition instance; that's because the server just says what it does
      // it says "this has been deleted" or "this element has changed" or "the last time this element was changed was"
      // so the remote listener job is to check how does it compare to what we have in our application state
      // do the dates match?... do we even have a value for it?... etc... adding remote listeners is heavy
      // as it will send data either via HTTP or websockets
      this.props.remoteListener.addItemDefinitionListenerFor(
        this,
        this.props.itemDefinitionInstance.getQualifiedPathName(),
        this.props.forId,
        this.props.forVersion || null,
      );
    }
  }
  public unSetupListeners() {
    this.removePossibleSearchListeners();

    // here we just remove the listeners that we have setup
    this.props.itemDefinitionInstance.removeListener(
      "change", this.props.forId || null, this.props.forVersion || null, this.changeListener,
    );
    if (this.props.forId && !this.props.static) {
      // remove all the remote listeners
      this.props.itemDefinitionInstance.removeListener(
        "reload", this.props.forId, this.props.forVersion || null, this.reloadListener,
      );
      this.props.remoteListener.removeItemDefinitionListenerFor(
        this,
        this.props.itemDefinitionInstance.getQualifiedPathName(),
        this.props.forId,
        this.props.forVersion || null,
      );
    }
  }
  public shouldComponentUpdate(
    nextProps: IActualItemDefinitionProviderProps,
    nextState: IActualItemDefinitionProviderState,
  ) {
    // so first things first, we want to keep it efficient
    // so let's check if first we updated into something
    // that invalidates the state, refer to the static
    // getDerivedStateFromProps to see how the new state
    // is retrieved
    const updatedIntoSomethingThatInvalidatesTheState =
      this.props.itemDefinitionInstance !== nextProps.itemDefinitionInstance;

    // we only care about things that affect render, the state
    // all of it if it differs does, the optimization flags
    // children, locale data, and ownership assumption
    return updatedIntoSomethingThatInvalidatesTheState ||
      !equals(this.state, nextState) ||
      (nextProps.forId || null) !== (this.props.forId || null) ||
      !!nextProps.assumeOwnership !== !!this.props.assumeOwnership ||
      nextProps.children !== this.props.children ||
      nextProps.localeData !== this.props.localeData ||
      nextProps.tokenData.id !== this.props.tokenData.id ||
      nextProps.tokenData.role !== this.props.tokenData.role ||
      nextProps.remoteListener !== this.props.remoteListener ||
      !equals(nextProps.properties, this.props.properties) ||
      !equals(nextProps.includes || [], this.props.includes || []) ||
      !!nextProps.static !== !!this.props.static ||
      !!nextProps.includePolicies !== !!this.props.includePolicies ||
      !equals(nextProps.automaticSearch, this.props.automaticSearch);
  }
  public async componentDidUpdate(
    prevProps: IActualItemDefinitionProviderProps,
    prevState: IActualItemDefinitionProviderState,
  ) {
    // whether the item definition was updated
    // and changed
    const itemDefinitionWasUpdated = this.props.itemDefinitionInstance !== prevProps.itemDefinitionInstance;

    // if the mark for destruction has changed in a meaningful way
    // we recheck it
    if (
      this.props.markForDestructionOnLogout &&
      (
        itemDefinitionWasUpdated ||
        (prevProps.forId || null) !== (this.props.forId || null) ||
        (prevProps.forVersion || null) !== (this.props.forVersion || null)
      )
    ) {
      this.markForDestruction();
    }

    // now if the id changed, the optimization flags changed, or the item definition
    // itself changed
    if (
      itemDefinitionWasUpdated ||
      (prevProps.forId || null) !== (this.props.forId || null) ||
      (prevProps.forVersion || null) !== (this.props.forVersion || null) ||
      !equals(prevProps.properties, this.props.properties) ||
      !equals(prevProps.includes || [], this.props.includes || []) ||
      !!prevProps.static !== !!this.props.static ||
      !!prevProps.includePolicies !== !!this.props.includePolicies
    ) {
      // now we have to check on whether the current state is static
      // or not
      const isStatic = this.props.static;
      // compared to the previous
      const wasStatic = prevProps.static;

      // if it's now static and it was not static before, we got to remove
      // the remote listeners, note that listeners are only added with an id
      // so we check for that as well
      let alreadyRemovedRemoteListeners: boolean = false;
      let alreadyAddedRemoteListeners: boolean = false;
      if (isStatic && !wasStatic && prevProps.forId) {
        // we mark the flag as true
        alreadyRemovedRemoteListeners = true;
        // and remove the listeners
        prevProps.itemDefinitionInstance.removeListener(
          "reload", prevProps.forId, prevProps.forVersion, this.reloadListener,
        );
        prevProps.remoteListener.removeItemDefinitionListenerFor(
          this, prevProps.itemDefinitionInstance.getQualifiedPathName(),
          prevProps.forId, prevProps.forVersion || null,
        );
      } else if (!isStatic && wasStatic && this.props.forId) {
        alreadyAddedRemoteListeners = true;
        this.props.itemDefinitionInstance.addListener(
          "reload", this.props.forId, this.props.forVersion, this.reloadListener,
        );
        this.props.remoteListener.addItemDefinitionListenerFor(
          this, this.props.itemDefinitionInstance.getQualifiedPathName(),
          this.props.forId, this.props.forVersion || null,
        );
      }

      // if this was an item definition or id update
      if (
        itemDefinitionWasUpdated ||
        (prevProps.forId || null) !== (this.props.forId || null) ||
        (prevProps.forVersion || null) !== (this.props.forVersion || null)
      ) {
        // we need to remove the old listeners
        prevProps.itemDefinitionInstance.removeListener(
          "change", prevProps.forId || null, prevProps.forVersion || null, this.changeListener,
        );
        // we only remove this listeners if we haven't done it before for other reasons
        if (prevProps.forId && !wasStatic && !alreadyRemovedRemoteListeners) {
          prevProps.itemDefinitionInstance.removeListener(
            "reload", prevProps.forId, prevProps.forVersion || null, this.reloadListener,
          );
          prevProps.remoteListener.removeItemDefinitionListenerFor(
            this, prevProps.itemDefinitionInstance.getQualifiedPathName(),
            prevProps.forId, prevProps.forVersion || null,
          );
        }

        // add the new listeners
        this.props.itemDefinitionInstance.addListener(
          "change", this.props.forId || null, this.props.forVersion || null, this.changeListener,
        );
        if (this.props.forId && !isStatic && !alreadyAddedRemoteListeners) {
          this.props.itemDefinitionInstance.addListener(
            "reload", this.props.forId, this.props.forVersion || null, this.reloadListener,
          );
          this.props.remoteListener.addItemDefinitionListenerFor(
            this, this.props.itemDefinitionInstance.getQualifiedPathName(),
            this.props.forId, this.props.forVersion || null,
          );
        }
      }

      // we set the value given we have changed the forId with the new optimization flags
      if (!this.isUnmounted) {
        this.setState({
          itemDefinitionState: this.props.itemDefinitionInstance.getStateNoExternalChecking(
            this.props.forId || null,
            this.props.forVersion || null,
            !this.props.disableExternalChecks,
            this.props.properties,
            this.props.includes || [],
            !this.props.includePolicies,
          ),
        });
      }

      // and run the external check
      if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
        this.setStateToCurrentValueWithExternalChecking(null);
      }
    }

    // if the id has changed or the item defintion was changed
    // or the role, which affects how things are fetch or the ownership
    // assumption, we need to reload the values if it's so necessary
    if (
      (prevProps.forId || null) !== (this.props.forId || null) ||
      (prevProps.forVersion || null) !== (this.props.forVersion || null) ||
      prevProps.tokenData.id !== this.props.tokenData.id ||
      prevProps.tokenData.role !== this.props.tokenData.role ||
      prevProps.assumeOwnership !== this.props.assumeOwnership ||
      itemDefinitionWasUpdated
    ) {
      if (!this.props.avoidLoading) {
        await this.loadValue();
      }

      // the rules on whether you can create, edit or delete change
      // depending on these variables, so we recalculate them
      if (!this.isUnmounted) {
        this.setState({
          canEdit: this.canEdit(),
          canDelete: this.canDelete(),
          canCreate: this.canCreate(),
        });
      }
    }

    if (
      !equals(this.props.automaticSearch, prevProps.automaticSearch) ||
      // these two would cause search results to be dismissed because
      // the fact the token is a key part of the search itself so we would
      // dismiss the search in such a case as the token is different
      // that or the automatic search would be reexecuted
      itemDefinitionWasUpdated ||
      prevProps.tokenData.token !== this.props.tokenData.token
    ) {
      // we might have a listener in an old item definition
      // so we need to get rid of it
      if (itemDefinitionWasUpdated) {
        this.removePossibleSearchListeners(prevProps, prevState);
      }
      if (this.props.automaticSearch) {
        this.search(this.props.automaticSearch);
      } else {
        this.dismissSearchResults();
      }
    }
  }

  public reloadListener() {
    console.log("reload requested for", this.props.itemDefinitionInstance.getQualifiedPathName(), this.props.forId);
    // well this is very simple the app requested a reload
    // because it says that whatever we have in memory is not valid
    // whether it is in the cache or not, so we call it as so, and deny the cache
    // passing true
    if (!this.props.avoidLoading) {
      this.loadValue(true);
    }
  }
  public changeListener() {
    if (this.isUnmounted) {
      return;
    }
    // we basically just upgrade the state
    this.setState({
      itemDefinitionState: this.props.itemDefinitionInstance.getStateNoExternalChecking(
        this.props.forId || null,
        this.props.forVersion || null,
        !this.props.disableExternalChecks,
        this.props.properties,
        this.props.includes || [],
        !this.props.includePolicies,
      ),
      // we do this because eg. the search relies on triggering the change listener
      // no notify that things aren't loading anymore
      loading: false,
      // also search might do this, and it's true anyway
      notFound:
        // an id is required for this to be true
        this.props.forId ? !this.props.itemDefinitionInstance.hasAppliedValueTo(
          this.props.forId || null,
          this.props.forVersion || null,
        ) : false,
    });
  }
  public async loadValue(denyCache?: boolean): Promise<IActionResponseWithValue> {
    // we don't use loading here because there's one big issue
    // elements are assumed into the loading state by the constructor
    // if they have an id
    if (!this.props.forId) {
      return null;
    }

    // We get the request fields that we are going to use
    // in order to load the value, we use the optimizers
    // so as to request only what is necessary for it to be populated
    // there is however one thing, different optimizers might have been
    // used accross the application, and two components with different
    // optimizations might have been used at the same time for the
    // same id
    const { requestFields } = getFieldsAndArgs({
      includeArgs: false,
      includeFields: true,
      uniteFieldsWithAppliedValue: true,
      includes: this.props.includes || [],
      properties: this.props.properties,
      appliedOwner: this.props.assumeOwnership ? this.props.tokenData.id : null,
      userId: this.props.tokenData.id,
      userRole: this.props.tokenData.role,
      itemDefinitionInstance: this.props.itemDefinitionInstance,
      forId: this.props.forId,
      forVersion: this.props.forVersion || null,
    });

    if (!denyCache) {
      // Prevent loading at all if value currently available and memoryCached
      const appliedGQLValue = this.props.itemDefinitionInstance.getGQLAppliedValue(
        this.props.forId, this.props.forVersion || null,
      );
      if (
        appliedGQLValue &&
        requestFieldsAreContained(requestFields, appliedGQLValue.requestFields)
      ) {
        const completedValue = this.loadValueCompleted({
          value: appliedGQLValue.rawValue,
          error: null,
        });
        this.props.remoteListener.requestFeedbackFor({
          itemDefinition: this.props.itemDefinitionInstance.getQualifiedPathName(),
          id: this.props.forId,
          version: this.props.forVersion || null,
        });
        // in some situations the value can be in memory but not yet permanently cached
        // (eg. when there is a search context)
        // and another item without a search context attempts to load the value this will
        // make it so that when we are exiting the search context it caches
        if (
          CacheWorkerInstance.isSupported &&
          this.props.longTermCaching
        ) {
          CacheWorkerInstance.instance.mergeCachedValue(
            PREFIX_GET + this.props.itemDefinitionInstance.getQualifiedPathName(),
            this.props.forId,
            this.props.forVersion || null,
            appliedGQLValue.rawValue,
            appliedGQLValue.requestFields,
          );
        }
        return completedValue;
      }
    }

    // the loading state is launched here, however
    // the loading is removed by the listener not by
    // this same function, to be efficient, we could remove
    // it via this function but doing it in the listener
    // who listens for change is better, items are clearly
    // not loading if the listener has detected a change in them
    // you might wonder why in the loader and not in the waiter
    // well it's because the waiter might only executes for the active
    // instance
    if (!this.state.loading && !this.isUnmounted) {
      this.setState({
        loading: true,
      });
    }

    // the reason why we use deny cache here is simple
    // the search context is a form of a memory cache, it might be loading
    // still when for some reason it was asked to reload, I can think of a extreme case
    // when the client loads from memory, a reload is requested, but the search conxtext hasn't
    // released yet the value
    if (
      !denyCache &&
      this.props.searchContext &&
      this.props.searchContext.currentlySearching.find(
        (s) =>
          s.id === this.props.forId &&
          s.version === this.props.forVersion &&
          s.type === this.props.itemDefinitionInstance.getQualifiedPathName(),
      ) &&
      requestFieldsAreContained(requestFields, this.props.searchContext.searchFields)
    ) {
      return null;
    }

    // remember that this waiter only runs on the first instance
    // that managed to get the memo, it waits for all the other instances
    // and then runs this query
    const {
      error,
      value,
      cached,
      getQueryFields,
    } = await runGetQueryFor({
      args: {},
      fields: requestFields,
      returnMemoryCachedValues: false,
      returnWorkerCachedValues: !denyCache,
      itemDefinition: this.props.itemDefinitionInstance,
      id: this.props.forId,
      version: this.props.forVersion || null,
      token: this.props.tokenData.token,
      language: this.props.localeData.language,
      cacheStore: this.props.longTermCaching,
    });

    // if the item has been cached, as in returned from the indexed db database
    // rather than the server, we don't know if it's actually the current value
    // so we request feedback from the listener, the listener will kick a reload
    // event if it finds a mismatch which will cause this function to run again (see above)
    // but the denyCache flag will be active, ensuring the value will be requested
    // from the server
    if (cached) {
      this.props.remoteListener.requestFeedbackFor({
        itemDefinition: this.props.itemDefinitionInstance.getQualifiedPathName(),
        id: this.props.forId,
        version: this.props.forVersion || null,
      });
    }

    if (value) {
      // we apply the value, whatever we have gotten this will affect all the instances
      // that use the same value
      this.props.itemDefinitionInstance.applyValue(
        this.props.forId,
        this.props.forVersion || null,
        value,
        false,
        this.props.tokenData.id,
        this.props.tokenData.role,
        getQueryFields,
        true,
      );

      // and then we trigger the change listener for all the instances
      this.props.itemDefinitionInstance.triggerListeners(
        "change", this.props.forId, this.props.forVersion || null,
      );
      // and if we have an externally checked property we do the external check
      if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
        this.setStateToCurrentValueWithExternalChecking(null);
      }
    }

    return this.loadValueCompleted({
      value,
      error,
    });
  }
  public loadValueCompleted(value: IActionResponseWithValue): IActionResponseWithValue {
    // return immediately
    if (this.isUnmounted) {
      return value;
    }

    // so once everything has been completed this function actually runs per instance
    if (value.error) {
      // if we got an error we basically have no value
      this.setState({
        // set the load error and all the logical states, we are not loading
        // anymore
        loadError: value.error,
        isBlocked: false,
        isBlockedButDataIsAccessible: false,
        notFound: false,
        loading: false,
      });
    // otherwise if there's no value, it means the item is not found
    } else if (!value.value) {
      // we mark it as so, it is not found
      this.setState({
        loadError: null,
        notFound: true,
        isBlocked: false,
        isBlockedButDataIsAccessible: false,
        loading: false,
      });
    } else if (value.value) {
      // otherwise if we have a value, we check all these options
      this.setState({
        loadError: null,
        notFound: false,
        isBlocked: !!value.value.blocked_at,
        isBlockedButDataIsAccessible: value.value.blocked_at ? !!value.value.DATA : false,
        loading: false,
      });
    }

    // now we return
    return value;
  }
  public async setStateToCurrentValueWithExternalChecking(currentUpdateId: number) {
    // so when we want to externally check we first run the external check
    // using the normal get state function which runs async
    const newItemDefinitionState = await this.props.itemDefinitionInstance.getState(
      this.props.forId || null,
      this.props.forVersion || null,
      this.props.properties,
      this.props.includes || [],
      !this.props.includePolicies,
    );

    // if the current update id is null (as in always update) or the last update id
    // that was requested is the same as the current (this is important in order)
    // to avoid situations where two external checks have been requested for some
    // reason only the last should be applied
    if (currentUpdateId === null || this.lastUpdateId === currentUpdateId) {
      // we set the state to the new state
      if (!this.isUnmounted) {
        this.setState({
          itemDefinitionState: newItemDefinitionState,
        });
      }
      // and trigger change listeners, all but our listener
      // we still need to trigger all other listeners
      this.props.itemDefinitionInstance.triggerListeners(
        "change", this.props.forId || null, this.props.forVersion || null, this.changeListener);
    }
  }
  public onPropertyChange(
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    internalValue: any,
  ) {
    if (this.state.loading) {
      // we will deny any change that happens
      // if the item is loading, as everything
      // will be removed anyway
      return;
    }

    // we simply set the current value in the property
    property.setCurrentValue(
      this.props.forId || null,
      this.props.forVersion || null,
      value,
      internalValue,
    );
    // trigger the listeners for change so everything updates nicely
    this.props.itemDefinitionInstance.triggerListeners(
      "change",
      this.props.forId || null,
      this.props.forVersion || null,
    );

    if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      // so we build an id for this change, for that we simply use
      // the date
      const currentUpdateId = (new Date()).getTime();
      // this change was identified by this id
      this.lastUpdateId = currentUpdateId;

      // we clear any previous timeout to check external properties
      clearTimeout(this.updateTimeout);
      // and now we build a new timeout to check external properties, which such id
      // if in 600ms the user stops doing anything, the externally checked property
      // will triger and an external check will launch
      this.updateTimeout = setTimeout(
        this.setStateToCurrentValueWithExternalChecking.bind(this, currentUpdateId),
        600,
      );
    }

    if (this.props.automaticSearch) {
      this.search(this.props.automaticSearch);
    }
  }
  public onPropertyEnforce(
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    givenForId: number,
    givenForVersion: string,
  ) {
    // this function is basically run by the setter
    // since they might be out of sync that's why the id is passed
    // the setter enforces values
    property.setSuperEnforced(givenForId || null, givenForVersion || null, value);
    this.props.itemDefinitionInstance.triggerListeners("change", givenForId || null, givenForVersion || null);

    if (this.props.automaticSearch) {
      this.search(this.props.automaticSearch);
    }
  }
  public onPropertyClearEnforce(
    property: PropertyDefinition,
    givenForId: number,
    givenForVersion: string,
  ) {
    // same but removes the enforcement
    property.clearSuperEnforced(givenForId || null, givenForVersion || null);
    this.props.itemDefinitionInstance.triggerListeners("change", givenForId || null, givenForVersion || null);
  }
  public componentWillUnmount() {
    this.isUnmounted = true;

    this.unSetupListeners();

    // when unmounting we check our optimization flags to see
    // if we are expecting to clean up the memory cache
    if (this.props.cleanOnDismount) {
      if (typeof this.props.cleanOnDismount === "boolean") {
        this.props.itemDefinitionInstance.cleanValueFor(this.props.forId || null, this.props.forVersion || null);
        // this will affect other instances that didn't dismount
        this.props.itemDefinitionInstance.triggerListeners(
          "change", this.props.forId || null, this.props.forVersion || null);
      } else {
        this.clean(this.props.cleanOnDismount, "success", false);
      }
    }
  }
  public onIncludeSetExclusionState(include: Include, state: IncludeExclusionState) {
    // just sets the exclusion state
    include.setExclusionState(this.props.forId || null, this.props.forVersion || null, state);
    this.props.itemDefinitionInstance.triggerListeners(
      "change", this.props.forId || null, this.props.forVersion || null);

    // note how externally checked properties might be affected for this
    if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      const currentUpdateId = (new Date()).getTime();
      this.lastUpdateId = currentUpdateId;

      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(
        this.setStateToCurrentValueWithExternalChecking.bind(this, currentUpdateId),
        600,
      );
    }
  }
  public checkItemDefinitionStateValidity(
    options: {
      properties: string[],
      includes?: string[],
      policies?: PolicyPathType[],
      onlyIncludeIfDiffersFromAppliedValue?: boolean,
    },
  ): boolean {
    // let's make this variable to check on whether things are invalid or not
    // first we check every property, that is included and allowed we use some
    // and return whether it's invalid
    const allIncludedPropertiesValid = options.properties.every((pId) => {
      // first lets try to get the state for the current state if any
      let p = this.state.itemDefinitionState.properties.find((p) => p.propertyId === pId);
      // in some situations, say when we try to manually submit a property this property might not be avaliable
      // in the state but yet still exist within the item definition itself
      if (!p) {
        p = this.props.itemDefinitionInstance.getPropertyDefinitionFor(pId, true)
          .getStateNoExternalChecking(this.props.forId || null, this.props.forVersion || null, true);
      }
      // now we check if we have the option to only include those that differ
      // from the applied value
      if (options.onlyIncludeIfDiffersFromAppliedValue) {
        // we get the current applied value, if any
        const currentAppliedValue = this.props.itemDefinitionInstance.getGQLAppliedValue(
          this.props.forId || null, this.props.forVersion || null);
        // if there is an applied value for that property
        if (currentAppliedValue && typeof currentAppliedValue.flattenedValue[p.propertyId] !== "undefined") {
          // let's check if it's differ from what we have in the state
          const doesNotDifferFromAppliedValue = equals(
            currentAppliedValue.flattenedValue[p.propertyId],
            p.value,
          );
          // if it does not differ, then it's false as it won't be included
          if (doesNotDifferFromAppliedValue) {
            return true;
          } else {
            // otherwise it really depends
            return p.valid;
          }
        } else {
          // otherwise if there's no applied value we consider
          // the applied value to be null
          const doesNotDifferFromAppliedValue = p.value === null;
          if (doesNotDifferFromAppliedValue) {
            return true;
          } else {
            return p.valid;
          }
        }
      }
      return p.valid;
    });

    if (!allIncludedPropertiesValid) {
      return false;
    }

    const allIncludedIncludesAreValid = !options.includes ? true : options.includes.every((iId) => {
      const i = this.state.itemDefinitionState.includes.find((i) => i.includeId === iId);
      // and now we get the sinking property ids
      const include = this.props.itemDefinitionInstance.getIncludeFor(i.includeId);
      const sinkingPropertyIds = include.getSinkingPropertiesIds();

      // and we extract the state only if it's a sinking property
      return i.itemDefinitionState.properties.every((p) => {
        if (!sinkingPropertyIds.includes(p.propertyId)) {
          return true;
        }
        // now we check if we have the option to only include those that differ
        // from the applied value
        if (options.onlyIncludeIfDiffersFromAppliedValue) {
          // we get the current applied value, if any
          const currentAppliedValue = this.props.itemDefinitionInstance.getGQLAppliedValue(
            this.props.forId || null, this.props.forVersion || null);
          // if there is an applied value for that property
          if (currentAppliedValue && currentAppliedValue.flattenedValue[include.getQualifiedIdentifier()]) {
            const includeAppliedValue = currentAppliedValue.flattenedValue[include.getQualifiedIdentifier()];
            if (typeof includeAppliedValue[p.propertyId] !== "undefined") {
              // let's check if it's differ from what we have in the state
              const doesNotDifferFromAppliedValue = equals(
                includeAppliedValue[p.propertyId],
                p.value,
              );
              // so if it does differ from applied value
              if (!doesNotDifferFromAppliedValue) {
                return true;
              }
            }
          }
        }

        return p.valid;
      });
    });

    if (!allIncludedIncludesAreValid) {
      return false;
    }

    if (!options.policies) {
      return true;
    }

    return options.policies.every((pKeys) => {
      const [policyType, policyName, propertyId] = pKeys;
      const propertyInPolicy = this.state.itemDefinitionState.policies[policyType][policyName]
        .find((p) => p.propertyId === propertyId);
      return propertyInPolicy.valid;
    });
  }

  public giveEmulatedInvalidError(
    stateApplied: string,
    withId: boolean,
    withIds: boolean,
  ): IActionResponseWithId | IActionResponseWithValue | IActionResponseWithSearchResults {
    const emulatedError: EndpointErrorType = {
      message: "Submit refused due to invalid information in form fields",
      code: ENDPOINT_ERRORS.INVALID_DATA_SUBMIT_REFUSED,
    };
    if (!this.isUnmounted) {
      this.setState({
        [stateApplied]: emulatedError,
      } as any);
    }

    if (withId) {
      return {
        id: null,
        error: emulatedError,
      };
    } else if (withIds) {
      return {
        results: [],
        error: emulatedError,
      };
    } else {
      return {
        value: null,
        error: emulatedError,
      };
    }
  }
  public async delete(options: IActionDeleteOptions = {}): Promise<IBasicActionResponse> {
    if (this.state.deleting || this.props.forId === null) {
      return null;
    }

    const isValid = this.checkItemDefinitionStateValidity({
      properties: [],
      ...options,
    });

    if (!isValid) {
      // if it's not poked already, let's poke it
      if (!this.isUnmounted) {
        this.setState({
          pokedElements: {
            properties: [],
            includes: [],
            policies: options.policies || [],
          },
        });
      }
      this.clean(options, "fail");
      return this.giveEmulatedInvalidError("deleteError", false, false);
    }

    if (options.beforeDelete && !options.beforeDelete()) {
      return null;
    }

    const {
      argumentsForQuery,
    } = getFieldsAndArgs({
      includeArgs: false,
      includeFields: true,
      uniteFieldsWithAppliedValue: true,
      includesForArgs: [],
      propertiesForArgs: [],
      policiesForArgs: options.policies || [],
      appliedOwner: this.props.assumeOwnership ? this.props.tokenData.id : null,
      userId: this.props.tokenData.id,
      userRole: this.props.tokenData.role,
      itemDefinitionInstance: this.props.itemDefinitionInstance,
      forId: this.props.forId,
      forVersion: this.props.forVersion || null,
    });

    if (!this.isUnmounted) {
      this.setState({
        deleting: true,
      });
    }

    const {
      error,
    } = await runDeleteQueryFor({
      args: argumentsForQuery,
      itemDefinition: this.props.itemDefinitionInstance,
      id: this.props.forId,
      version: this.props.forVersion || null,
      token: this.props.tokenData.token,
      language: this.props.localeData.language,
      listenerUUID: this.props.remoteListener.getUUID(),
      cacheStore: this.props.longTermCaching,
    });

    if (error) {
      if (!this.isUnmounted) {
        this.setState({
          deleteError: error,
          deleting: false,
          deleted: false,
          pokedElements: {
            properties: [],
            includes: [],
            policies: options.policies || [],
          },
        });
      }
      this.clean(options, "success");
    } else {
      this.props.itemDefinitionInstance.cleanValueFor(this.props.forId, this.props.forVersion || null);
      if (!this.isUnmounted) {
        this.setState({
          deleteError: null,
          deleting: false,
          deleted: true,
          notFound: true,
          pokedElements: {
            properties: [],
            includes: [],
            policies: (options.policies || []),
          },
        });
      }
      this.clean(options, "fail");
      this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId, this.props.forVersion || null);
    }

    return {
      error,
    };
  }
  public clean(
    options: IActionCleanOptions,
    state: "success" | "fail",
    avoidTriggeringUpdate?: boolean,
  ): void {
    if (!this.isUnmounted) {
      if (
        options.unpokeAfterAny ||
        options.unpokeAfterFailure && state === "fail" ||
        options.unpokeAfterSuccess && state === "success"
      ) {
        this.setState({
          pokedElements: {
            properties: [],
            includes: [],
            policies: [],
          }
        });
      }
    }

    let needsUpdate: boolean = false;

    // CLEANING PROPERTIES
    const cleanupPropertyFn = (ptc: string) => {
      this.props.itemDefinitionInstance
        .getPropertyDefinitionFor(ptc, true).cleanValueFor(this.props.forId,
          this.props.forVersion || null);
    };
    if (
      options.propertiesToCleanOnSuccess && state === "success"
    ) {
      options.propertiesToCleanOnSuccess.forEach(cleanupPropertyFn);
      needsUpdate = true;
    }
    if (
      options.propertiesToCleanOnAny
    ) {
      options.propertiesToCleanOnAny.forEach(cleanupPropertyFn);
      needsUpdate = true;
    }
    if (
      options.propertiesToCleanOnFailure && state === "fail"
    ) {
      options.propertiesToCleanOnFailure.forEach(cleanupPropertyFn);
      needsUpdate = true;
    }

    // RESTORING PROPERTIES
    const restorePropertyFn = (ptr: string) => {
      this.props.itemDefinitionInstance
        .getPropertyDefinitionFor(ptr, true).restoreValueFor(this.props.forId,
          this.props.forVersion || null);
    };
    if (
      options.propertiesToRestoreOnSuccess && state === "success"
    ) {
      options.propertiesToRestoreOnSuccess.forEach(restorePropertyFn);
      needsUpdate = true;
    }
    if (
      options.propertiesToRestoreOnAny
    ) {
      options.propertiesToRestoreOnAny.forEach(restorePropertyFn);
      needsUpdate = true;
    }
    if (
      options.propertiesToRestoreOnFailure && state === "fail"
    ) {
      options.propertiesToRestoreOnFailure.forEach(restorePropertyFn);
      needsUpdate = true;
    }

    // CLEANING INCLUDES
    const cleanupIncludeFn = (itc: string) => {
      this.props.itemDefinitionInstance.getIncludeFor(itc).cleanValueFor(this.props.forId,
        this.props.forVersion || null);
    };
    if (
      options.includesToCleanOnSuccess && state === "success"
    ) {
      options.includesToCleanOnSuccess.forEach(cleanupIncludeFn);
      needsUpdate = true;
    }
    if (
      options.includesToCleanOnAny
    ) {
      options.includesToCleanOnAny.forEach(cleanupIncludeFn);
      needsUpdate = true;
    }
    if (
      options.includesToCleanOnFailure && state === "fail"
    ) {
      options.includesToCleanOnFailure.forEach(cleanupPropertyFn);
      needsUpdate = true;
    }

    // RESTORING INCLUDES
    const restoreIncludeFn = (itr: string) => {
      this.props.itemDefinitionInstance
        .getIncludeFor(itr).restoreValueFor(this.props.forId,
          this.props.forVersion || null);
    };
    if (
      options.includesToRestoreOnSuccess && state === "success"
    ) {
      options.includesToRestoreOnSuccess.forEach(restoreIncludeFn);
      needsUpdate = true;
    }
    if (
      options.includesToRestoreOnAny
    ) {
      options.includesToRestoreOnAny.forEach(restoreIncludeFn);
      needsUpdate = true;
    }
    if (
      options.includesToRestoreOnFailure && state === "fail"
    ) {
      options.includesToRestoreOnFailure.forEach(restoreIncludeFn);
      needsUpdate = true;
    }
    
    // CLEANING POLICIES, POLICIES CAN'T BE RESTORED
    const cleanupPolicyFn = (policyArray: PolicyPathType) => {
      this.props.itemDefinitionInstance
        .getPropertyDefinitionForPolicy(...policyArray).cleanValueFor(this.props.forId,
          this.props.forVersion || null);
    }
    if (
      options.policiesToCleanOnSuccess && state === "success"
    ) {
      options.policiesToCleanOnSuccess.forEach(cleanupPolicyFn);
      needsUpdate = true;
    }
    if (
      options.policiesToCleanOnAny
    ) {
      options.policiesToCleanOnAny.forEach(cleanupPolicyFn);
      needsUpdate = true;
    }
    if (
      options.policiesToCleanOnFailure && state === "fail"
    ) {
      options.policiesToCleanOnFailure.forEach(cleanupPolicyFn);
      needsUpdate = true;
    }

    // NOw we check if we need an update in the listeners and if we are allowed to trigger it
    if (needsUpdate && !avoidTriggeringUpdate) {
      this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId, this.props.forVersion || null);
    }
  }
  public async submit(options: IActionSubmitOptions): Promise<IActionResponseWithId> {
    // if we are already submitting, we reject the action
    if (this.state.submitting) {
      return null;
    }

    const isValid = this.checkItemDefinitionStateValidity(options);
    const pokedElements = {
      properties: options.properties,
      includes: options.includes || [],
      policies: options.policies || [],
    }

    // if it's invalid let's return the emulated error
    if (!isValid) {
      if (!this.isUnmounted) {
        this.setState({
          pokedElements,
        });
      }
      this.clean(options, "fail");
      // if it's not poked already, let's poke it
      return this.giveEmulatedInvalidError("submitError", true, false) as IActionResponseWithId;
    }

    // now we are going to build our query
    // also we make a check later on for the policies
    // if necessary

    const {
      requestFields,
      argumentsForQuery,
    } = getFieldsAndArgs({
      includeArgs: true,
      includeFields: true,
      uniteFieldsWithAppliedValue: true,
      differingPropertiesOnlyForArgs: options.differingOnly,
      differingIncludesOnlyForArgs: options.differingOnly,
      includes: this.props.includes || [],
      properties: this.props.properties,
      includesForArgs: options.includes || [],
      propertiesForArgs: options.properties,
      policiesForArgs: options.policies || [],
      appliedOwner: this.props.assumeOwnership ? this.props.tokenData.id : null,
      userId: this.props.tokenData.id,
      userRole: this.props.tokenData.role,
      itemDefinitionInstance: this.props.itemDefinitionInstance,
      forId: this.props.forId,
      forVersion: this.props.forVersion || null,
    });

    // now checking the option for the before submit function, if it returns
    // false we cancel the submit request, we don't check policies yet
    if (options.beforeSubmit && !options.beforeSubmit()) {
      return null;
    }

    // now it's when we are actually submitting
    if (!this.isUnmounted) {
      this.setState({
        submitting: true,
      });
    }

    let value: IGQLValue;
    let error: EndpointErrorType;
    let getQueryFields: IGQLRequestFields;
    if (this.props.forId) {
      const totalValues = await runEditQueryFor({
        args: argumentsForQuery,
        fields: requestFields,
        itemDefinition: this.props.itemDefinitionInstance,
        token: this.props.tokenData.token,
        language: this.props.localeData.language,
        id: this.props.forId,
        version: this.props.forVersion,
        listenerUUID: this.props.remoteListener.getUUID(),
        cacheStore: this.props.longTermCaching,
      });
      value = totalValues.value;
      error = totalValues.error;
      getQueryFields = totalValues.getQueryFields;
    } else {
      const totalValues = await runAddQueryFor({
        args: argumentsForQuery,
        fields: requestFields,
        itemDefinition: this.props.itemDefinitionInstance,
        token: this.props.tokenData.token,
        language: this.props.localeData.language,
        listenerUUID: this.props.remoteListener.getUUID(),
        cacheStore: this.props.longTermCaching,
      });
      value = totalValues.value;
      error = totalValues.error;
      getQueryFields = totalValues.getQueryFields;
    }

    let recievedId: number = null;
    let receivedVersion: string = null;
    if (error) {
      if (!this.isUnmounted) {
        this.setState({
          submitError: error,
          submitting: false,
          submitted: false,
          pokedElements,
        });
      }
      this.clean(options, "fail");
    } else if (value) {
      if (!this.isUnmounted) {
        this.setState({
          submitError: null,
          submitting: false,
          submitted: true,
          pokedElements,
        });
      }

      recievedId = value.id as number;
      receivedVersion = value.version as string || null;
      this.props.itemDefinitionInstance.applyValue(
        recievedId,
        receivedVersion,
        value,
        false,
        this.props.tokenData.id,
        this.props.tokenData.role,
        getQueryFields,
        true,
      );
      this.clean(options, "success", true);
      this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId, this.props.forVersion || null);
    }

    // happens during an error or whatnot
    return {
      id: recievedId,
      error,
    };
  }
  public async search(options: IActionSearchOptions): Promise<IActionResponseWithSearchResults> {
    let propertiesForArgs = [];
    options.searchByProperties.forEach((propertyId) => {
      const standardProperty = standardCounterpart.getPropertyDefinitionFor(propertyId, true);
      propertiesForArgs = propertiesForArgs.concat(getConversionIds(standardProperty.rawData));
    });

    if (this.state.searching) {
      return null;
    }
    const isValid = this.checkItemDefinitionStateValidity({
      properties: propertiesForArgs,
      includes: options.searchByIncludes || [],
    });

    // if it's invalid let's return the emulated error
    const pokedElements = {
      properties: propertiesForArgs,
      includes: options.searchByIncludes || [],
      policies: [],
    };
    if (!isValid) {
      if (!this.isUnmounted) {
        this.setState({
          pokedElements,
        });
      }
      this.clean(options, "fail");
      return this.giveEmulatedInvalidError("searchError", false, true) as IActionResponseWithSearchResults;
    }

    if (options.cachePolicy === "by-owner" && !options.createdBy) {
      throw new Error("A by owner cache policy requires createdBy option to be set");
    }

    let searchParent: [string, number, string] = null;
    if (options.cachePolicy === "by-parent" && !options.parentedBy) {
      throw new Error("A by owner cache policy requires parentedBy option to be set");
    } else if (options.parentedBy) {
      const moduleInQuestion = this.props.itemDefinitionInstance.getParentModule()
        .getParentRoot().getModuleFor(options.parentedBy.module.split("/"));
      const itemDefinitionInQuestion = moduleInQuestion.getItemDefinitionFor(
        options.parentedBy.itemDefinition.split("/"));
      searchParent = [
        itemDefinitionInQuestion.getQualifiedPathName(),
        options.parentedBy.id,
        options.parentedBy.version || null,
      ];
    }

    if (options.cachePolicy === "by-owner") {
      if (options.createdBy !== this.state.searchOwner) {
        // this search listener is bad because the search
        // owner has changed, and the previously registered listener
        // if any does not match the owner
        this.removePossibleSearchListeners();
      }
    } else if (options.cachePolicy === "by-parent") {
      if (!equals(searchParent, this.state.searchParent)) {
        // this search listener is bad because the search
        // owner has changed, and the previously registered listener
        // if any does not match the owner
        this.removePossibleSearchListeners();
      }
    } else {
      this.removePossibleSearchListeners();
    }

    this.lastOptionsUsedForSearch = options;

    if (!this.isUnmounted) {
      this.setState({
        searching: true,
      });
    }

    const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();

    const {
      argumentsForQuery,
    } = getFieldsAndArgs({
      includeArgs: true,
      includeFields: false,
      propertiesForArgs,
      includesForArgs: options.searchByIncludes || [],
      appliedOwner: options.createdBy,
      userId: this.props.tokenData.id,
      userRole: this.props.tokenData.role,
      itemDefinitionInstance: this.props.itemDefinitionInstance,
      forId: this.props.forId,
      forVersion: this.props.forVersion || null,
    });

    const searchFieldsAndArgs = getFieldsAndArgs({
      includeArgs: false,
      includeFields: true,
      properties: options.requestedProperties,
      includes: options.requestedIncludes || [],
      appliedOwner: options.createdBy,
      userId: this.props.tokenData.id,
      userRole: this.props.tokenData.role,
      itemDefinitionInstance: standardCounterpart,
      forId: null,
      forVersion: null,
    });
    const requestedSearchFields = searchFieldsAndArgs.requestFields;
  
    let parentedBy = null;
    if (options.parentedBy) {
      const root = this.props.itemDefinitionInstance.getParentModule().getParentRoot();
      const parentIdef = 
        root.getModuleFor(options.parentedBy.module.split("/"))
        .getItemDefinitionFor(options.parentedBy.itemDefinition.split("/"));
      parentedBy = {
        itemDefinition: parentIdef,
        id: options.parentedBy.id,
        version: options.parentedBy.version || null,
      };
    }

    const {
      searchResults,
      error,
    } = await runSearchQueryFor({
      args: argumentsForQuery,
      fields: requestedSearchFields,
      itemDefinition: this.props.itemDefinitionInstance,
      cachePolicy: options.cachePolicy || "none",
      createdBy: options.createdBy || null,
      orderBy: options.orderBy || "DEFAULT",
      token: this.props.tokenData.token,
      language: this.props.localeData.language,
      parentedBy,
    }, this.props.remoteListener, this.onSearchReload);

    if (error) {
      if (!this.isUnmounted) {
        this.setState({
          searchError: error,
          searching: false,
          searchResults,
          searchId: uuid.v4(),
          searchOwner: options.createdBy || null,
          searchParent,
          searchShouldCache: !!options.cachePolicy,
          searchFields: requestedSearchFields,
          searchRequestedProperties: options.requestedProperties,
          searchRequestedIncludes: options.requestedIncludes || [],
          pokedElements,
        });
      }
      this.clean(options, "fail");
    } else {
      if (!this.isUnmounted) {
        this.setState({
          searchError: null,
          searching: false,
          searchResults: searchResults || [],
          searchId: uuid.v4(),
          searchOwner: options.createdBy || null,
          searchParent,
          searchShouldCache: !!options.cachePolicy,
          searchFields: requestedSearchFields,
          searchRequestedProperties: options.requestedProperties,
          searchRequestedIncludes: options.requestedIncludes || [],
          pokedElements,
        });
      }
      this.clean(options, "success");
    }

    return {
      results: searchResults,
      error: null,
    };
  }
  public dismissLoadError() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      loadError: null,
    });
  }
  public dismissDeleteError() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      deleteError: null,
    });
  }
  public dismissSubmitError() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      submitError: null,
    });
  }
  public dismissSubmitted() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      submitted: null,
    });
  }
  public dismissDeleted() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      deleted: false,
    });
  }
  public dismissSearchError() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      searchError: null,
    });
  }
  public onSearchReload() {
    this.search(this.lastOptionsUsedForSearch);
  }
  public removePossibleSearchListeners(
    props: IActualItemDefinitionProviderProps = this.props,
    state: IActualItemDefinitionProviderState = this.state,
  ) {
    if (props.itemDefinitionInstance.isInSearchMode()) {
      const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();
      const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
        standardCounterpart.getParentModule().getQualifiedPathName() :
        standardCounterpart.getQualifiedPathName());

      if (state.searchOwner) {
        props.remoteListener.removeOwnedSearchListenerFor(
          this.onSearchReload,
          standardCounterpartQualifiedName,
          state.searchOwner,
        );
      }
      if (state.searchParent) {
        props.remoteListener.removeParentedSearchListenerFor(
          this.onSearchReload,
          standardCounterpartQualifiedName,
          state.searchParent[0],
          state.searchParent[1],
          state.searchParent[2],
        );
      }
    }
  }
  public dismissSearchResults() {
    this.removePossibleSearchListeners();
    if (!this.isUnmounted) {
      this.setState({
        searchId: null,
        searchFields: null,
        searchOwner: null,
        searchShouldCache: false,
        searchRequestedIncludes: [],
        searchRequestedProperties: [],
        searchResults: [],
      });
    }
  }
  public canDelete() {
    if (this.props.forId === null) {
      return false;
    }
    return this.props.itemDefinitionInstance.checkRoleAccessFor(
      ItemDefinitionIOActions.DELETE,
      this.props.tokenData.role,
      this.props.tokenData.id,
      this.props.assumeOwnership ?
        (this.props.tokenData.id || UNSPECIFIED_OWNER) :
        this.props.itemDefinitionInstance.getAppliedValueOwnerIfAny(this.props.forId, this.props.forVersion || null),
      {},
      false,
    );
  }
  public canCreate() {
    if (this.props.forId !== null) {
      return false;
    }
    return this.props.itemDefinitionInstance.checkRoleAccessFor(
      ItemDefinitionIOActions.CREATE,
      this.props.tokenData.role,
      this.props.tokenData.id,
      this.props.tokenData.id || UNSPECIFIED_OWNER,
      {},
      false,
    );
  }
  public canEdit() {
    if (this.props.forId === null) {
      return false;
    }
    return this.props.itemDefinitionInstance.checkRoleAccessFor(
      ItemDefinitionIOActions.EDIT,
      this.props.tokenData.role,
      this.props.tokenData.id,
      this.props.assumeOwnership ?
        (this.props.tokenData.id || UNSPECIFIED_OWNER) :
        this.props.itemDefinitionInstance.getAppliedValueOwnerIfAny(this.props.forId, this.props.forVersion || null),
      {},
      false,
    );
  }
  public unpoke() {
    if (this.isUnmounted) {
      return;
    }
    this.setState({
      pokedElements: {
        properties: [],
        includes: [],
        policies: [],
      },
    });
  }
  public render() {
    return (
      <ItemDefinitionContext.Provider
        value={{
          idef: this.props.itemDefinitionInstance,
          state: this.state.itemDefinitionState,
          onPropertyChange: this.onPropertyChange,
          onIncludeSetExclusionState: this.onIncludeSetExclusionState,
          onPropertyEnforce: this.onPropertyEnforce,
          onPropertyClearEnforce: this.onPropertyClearEnforce,
          notFound: this.state.notFound,
          blocked: this.state.isBlocked,
          blockedButDataAccessible: this.state.isBlockedButDataIsAccessible,
          loadError: this.state.loadError,
          loading: this.state.loading,
          submitError: this.state.submitError,
          submitting: this.state.submitting,
          submitted: this.state.submitted,
          deleteError: this.state.deleteError,
          deleting: this.state.deleting,
          deleted: this.state.deleted,
          searchError: this.state.searchError,
          searching: this.state.searching,
          searchResults: this.state.searchResults,
          searchId: this.state.searchId,
          searchOwner: this.state.searchOwner,
          searchShouldCache: this.state.searchShouldCache,
          searchFields: this.state.searchFields,
          searchRequestedProperties: this.state.searchRequestedProperties,
          searchRequestedIncludes: this.state.searchRequestedIncludes,
          pokedElements: this.state.pokedElements,
          submit: this.submit,
          reload: this.loadValue,
          delete: this.delete,
          clean: this.clean,
          search: this.search,
          forId: this.props.forId || null,
          forVersion: this.props.forVersion || null,
          dismissLoadError: this.dismissLoadError,
          dismissSubmitError: this.dismissSubmitError,
          dismissSubmitted: this.dismissSubmitted,
          dismissDeleteError: this.dismissDeleteError,
          dismissDeleted: this.dismissDeleted,
          dismissSearchError: this.dismissSearchError,
          dismissSearchResults: this.dismissSearchResults,
          unpoke: this.unpoke,
          canCreate: this.state.canCreate,
          canDelete: this.state.canDelete,
          canEdit: this.state.canEdit,
          remoteListener: this.props.remoteListener,
        }}
      >
        {this.props.children}
      </ItemDefinitionContext.Provider>
    );
  }
}

export function ItemDefinitionProvider(props: IItemDefinitionProviderProps) {
  return (
    <LocaleContext.Consumer>
      {
        (localeData) => (
          <TokenContext.Consumer>
            {
              (tokenData) => (
                <ModuleContext.Consumer>
                  {
                    (data) => (
                      <SearchItemDefinitionValueContext.Consumer>
                        {(searchContext) => {
                          if (!data) {
                            throw new Error("The ItemDefinitionProvider must be inside a ModuleProvider context");
                          }
                          let valueFor: ItemDefinition;
                          if (props.itemDefinition) {
                            valueFor =
                              data.mod.getParentRoot().registry[props.itemDefinition] as ItemDefinition ||
                              data.mod.getItemDefinitionFor(props.itemDefinition.split("/"));
                          } else {
                            valueFor = data.mod.getPropExtensionItemDefinition();
                          }
                          if (props.searchCounterpart) {
                            valueFor = valueFor.getSearchModeCounterpart();
                          }

                          return (
                            <ActualItemDefinitionProvider
                              localeData={localeData}
                              tokenData={tokenData}
                              itemDefinitionInstance={valueFor}
                              itemDefinitionQualifiedName={valueFor.getQualifiedPathName()}
                              containsExternallyCheckedProperty={valueFor.containsAnExternallyCheckedProperty()}
                              remoteListener={data.remoteListener}
                              searchContext={searchContext}
                              {...props}
                            />
                          );
                        }}
                      </SearchItemDefinitionValueContext.Consumer>
                    )
                  }
                </ModuleContext.Consumer>
              )
            }
          </TokenContext.Consumer>
        )
      }
    </LocaleContext.Consumer>
  );
}
