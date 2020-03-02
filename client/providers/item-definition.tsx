import React from "react";
import { LocaleContext, ILocaleContextType } from "../internal/app";
import ItemDefinition, { IItemDefinitionStateType, ItemDefinitionIOActions } from "../../base/Root/Module/ItemDefinition";
import PropertyDefinition from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import Include, { IncludeExclusionState } from "../../base/Root/Module/ItemDefinition/Include";
import { TokenContext, ITokenContextType } from "../internal/app/internal-providers";
import {
  PREFIX_GET,
  PREFIX_EDIT,
  PREFIX_ADD,
  PREFIX_DELETE,
  PREFIX_SEARCH,
  UNSPECIFIED_OWNER,
  PREFIX_GET_LIST,
  ANYONE_METAROLE,
  ANYONE_LOGGED_METAROLE,
  GUEST_METAROLE,
  ENDPOINT_ERRORS,
} from "../../constants";
import { buildGqlQuery, buildGqlMutation, gqlQuery,
  IGQLQueryObj, GQLEnum, GQLQuery, IGQLSearchResult, IGQLValue, IGQLEndpointValue } from "../../gql-querier";
import { requestFieldsAreContained, deepMerge } from "../../gql-util";
import { EndpointErrorType } from "../../base/errors";
import equals from "deep-equal";
import { ModuleContext } from "./module";
import { getConversionIds } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/search-mode";
import CacheWorkerInstance from "../internal/workers/cache";
import { RemoteListener } from "../internal/app/remote-listener";
import { getFieldsAndArgs } from "../../util";
import uuid from "uuid";

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

interface IActionResponseWithValueAndQueryFields extends IActionResponseWithValue {
  getQueryFields: any;
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

/**
 * The options for submitting,
 * aka edit, aka add
 */
export interface IActionSubmitOptions {
  onlyIncludeProperties?: string[];
  onlyIncludeIncludes?: string[];
  onlyIncludeIfDiffersFromAppliedValue?: boolean;
  unpokeAfterSuccess?: boolean;
  propertiesToCleanOnSuccess?: string[];
  policiesToCleanOnSuccess?: PolicyPathType[];
  beforeSubmit?: (policiesRequested: PolicyPathType[]) => boolean;
}

export interface IActionDeleteOptions {
  unpokeAfterSuccess?: boolean;
  policiesToCleanOnSuccess?: PolicyPathType[];
  beforeDelete?: (policiesRequested: PolicyPathType[]) => boolean;
}

/**
 * The options for searching
 */
export interface IActionSearchOptions {
  requestedProperties: string[];
  requestedIncludes?: string[];
  onlyIncludeSearchPropertiesForProperties?: string[];
  onlyIncludeIncludes?: string[];
  unpokeAfterSuccess?: boolean;
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

export interface IPokeElementType {
  includeId: string;
  propertyId: string;
  isInvalid: boolean;
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
  pokedElements: IPokeElementType[];
  pokePoliciesType: string;
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
  submit: (options?: IActionSubmitOptions) => Promise<IActionResponseWithId>;
  // straightwforward, deletes
  delete: () => Promise<IBasicActionResponse>;
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
interface IItemDefinitionProviderProps {
  // children that will be feed into the context
  children: any;
  // the item definition slash/separated/path
  // if you don't specify this, the context will be
  // based on the prop extensions emulated item definition
  itemDefinition?: string;
  // the id, specifying an id makes a huge difference
  forId?: number;
  // the version
  forVersion?: string;
  // this is an important flag, if ownership is assumed this means
  // that when automatic fetching of properties it will do so assuming
  // the current user is the owner, so OWNER rules pass, put an example,
  // loading the current user, you have the current user id, and you need
  // to load the user data, if you assume ownership, fields like email will
  // be fetched, without it, they will not be fetched, use this field
  // careful as fetching fields without the right credentials
  // might trigger an error
  assumeOwnership?: boolean;
  // whether this is about the search counterpart for using
  // with searches, this opens a whole can of worms
  searchCounterpart?: boolean;
  // some fields, eg. autocompleted ones and unique ones have rest
  // endpoints for them that will run checks, you might want to disable
  // these checks in two circumstances, 1. for efficiency if you don't need them
  // 2. for an UX reason, for example during login, if the field is constantly checking
  // that the external check is unique, for an username, then you will have an annoying
  // error popping on, saying that the username is taken, but you are logging in so that
  // external check is unecessary; note that disabling external checks has no effect
  // if the item definition has no externally checked properties
  disableExternalChecks?: boolean;
  // automatic search triggers an automatic search when the item mounts
  // or it detects a change in the properties, this basically triggers
  // the .search function with these arguments whenever it is detected
  // it should do so
  automaticSearch?: IActionSearchOptions;
  // optimization, these cause no differences in UX/UI or function
  // but they can speed up your app
  // they affect request payloads as well as the application state itself
  // use them carefully as if you mess up it will cause some values not to load
  optimize?: {
    // only downloads and includes the properties specified in the list
    // in the state
    onlyIncludeProperties?: string[],
    // only includes the items specified in the list in the state
    onlyIncludeIncludes?: string[],
    // excludes the policies from being part of the state
    excludePolicies?: boolean,
    // cleans the value from the memory cache once the object dismounts
    // as the memory cache might only grow and grow
    cleanOnDismount?: boolean,
    // static components do not update remotely
    static?: boolean,
    // avoids caching values in the worker cache
    // the memory cache remains active
    avoidLongTermCaching?: boolean,
  };
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
  pokedElements: IPokeElementType[];
  pokePoliciesType: string;
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
}

/**
 * Here it is, the mighty
 */
export class ActualItemDefinitionProvider extends
  React.Component<IActualItemDefinitionProviderProps, IActualItemDefinitionProviderState> {
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
          props.optimize && props.optimize.onlyIncludeProperties,
          props.optimize && props.optimize.onlyIncludeIncludes,
          props.optimize && props.optimize.excludePolicies,
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
        this.props.optimize && this.props.optimize.onlyIncludeProperties,
        this.props.optimize && this.props.optimize.onlyIncludeIncludes,
        this.props.optimize && this.props.optimize.excludePolicies,
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
      loading: !!this.props.forId,

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

      pokedElements: [],
      pokePoliciesType: null,

      canEdit: this.canEdit(),
      canDelete: this.canDelete(),
      canCreate: this.canCreate(),
    };
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

    // and we attempt to load the current value
    this.loadValue();
  }

  // setup the listeners is simple
  public setupListeners() {
    /// first the change listener that checks for every change event that happens with the state
    this.props.itemDefinitionInstance.addListener(
      "change", this.props.forId || null, this.props.forVersion || null, this.changeListener,
    );

    const isStatic = this.props.optimize && this.props.optimize.static;

    // second are the remote listeners, only when there's an id defined
    if (this.props.forId && !isStatic) {
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
    const isStatic = this.props.optimize && this.props.optimize.static;
    if (this.props.forId && !isStatic) {
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
      !equals(nextProps.automaticSearch, this.props.automaticSearch) ||
      !equals(this.props.optimize, nextProps.optimize);
  }
  public async componentDidUpdate(
    prevProps: IActualItemDefinitionProviderProps,
    prevState: IActualItemDefinitionProviderState,
  ) {
    // whether the item definition was updated
    // and changed
    const itemDefinitionWasUpdated = this.props.itemDefinitionInstance !== prevProps.itemDefinitionInstance;

    // now if the id changed, the optimization flags changed, or the item definition
    // itself changed
    if (
      (prevProps.forId || null) !== (this.props.forId || null) ||
      !equals(this.props.optimize, prevProps.optimize) ||
      itemDefinitionWasUpdated
    ) {
      // now we have to check on whether the current state is static
      // or not
      const isStatic = this.props.optimize && this.props.optimize.static;
      // compared to the previous
      const wasStatic = prevProps.optimize && prevProps.optimize.static;

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
      this.setState({
        itemDefinitionState: this.props.itemDefinitionInstance.getStateNoExternalChecking(
          this.props.forId || null,
          this.props.forVersion || null,
          !this.props.disableExternalChecks,
          this.props.optimize && this.props.optimize.onlyIncludeProperties,
          this.props.optimize && this.props.optimize.onlyIncludeIncludes,
          this.props.optimize && this.props.optimize.excludePolicies,
        ),
      });

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
      await this.loadValue();

      // the rules on whether you can create, edit or delete change
      // depending on these variables, so we recalculate them
      this.setState({
        canEdit: this.canEdit(),
        canDelete: this.canDelete(),
        canCreate: this.canCreate(),
      });
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
    this.loadValue(true);
  }
  public changeListener() {
    // we basically just upgrade the state
    this.setState({
      itemDefinitionState: this.props.itemDefinitionInstance.getStateNoExternalChecking(
        this.props.forId || null,
        this.props.forVersion || null,
        !this.props.disableExternalChecks,
        this.props.optimize && this.props.optimize.onlyIncludeProperties,
        this.props.optimize && this.props.optimize.onlyIncludeIncludes,
        this.props.optimize && this.props.optimize.excludePolicies,
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
      return;
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
      onlyIncludeIncludes: this.props.optimize && this.props.optimize.onlyIncludeIncludes,
      onlyIncludeProperties: this.props.optimize && this.props.optimize.onlyIncludeProperties,
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
          (
            !this.props.optimize ||
            !this.props.optimize.avoidLongTermCaching
          )
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
    if (!this.state.loading) {
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
      return;
    }

    const value = await this.loadValueWaiter(
      requestFields,
      denyCache,
    );

    if (value.value) {
      // we apply the value, whatever we have gotten this will affect all the instances
      // that use the same value
      this.props.itemDefinitionInstance.applyValue(
        this.props.forId || null,
        this.props.forVersion || null,
        value.value,
        false,
        this.props.tokenData.id,
        this.props.tokenData.role,
        value.getQueryFields,
        true,
      );

      // and then we trigger the change listener for all the instances
      this.props.itemDefinitionInstance.triggerListeners(
        "change", this.props.forId || null, this.props.forVersion || null,
      );
      // and if we have an externally checked property we do the external check
      if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
        this.setStateToCurrentValueWithExternalChecking(null);
      }
    }

    this.loadValueCompleted(value);
  }

  public async loadValueWaiter(requestFields: any, denyCache?: boolean):
    Promise<IActionResponseWithValueAndQueryFields> {

    // remember that this waiter only runs on the first instance
    // that managed to get the memo, it waits for all the other instances
    // and then runs this query
    const {
      value,
      error,
      memoryCached,
      cached,
      getQueryFields,
    } = await this.runQueryFor({
      queryPrefix: PREFIX_GET,
      baseArgs: {},
      requestFields,
      returnMemoryCachedValuesForGetRequests: false,
      returnWorkerCachedValuesForGetRequests: !denyCache,
    });

    // this should never happen honestly as we are giving
    // a false flag for return memoryCached value for get requests
    // but we leave it here just in case, memoryCached means the object
    // is already in memory in the state and already populated because react uses
    // that state
    if (memoryCached) {
      return {
        value: this.props.itemDefinitionInstance.getGQLAppliedValue(
          this.props.forId, this.props.forVersion || null).rawValue,
        error: null,
        getQueryFields: this.props.itemDefinitionInstance.getGQLAppliedValue(
          this.props.forId, this.props.forVersion || null).requestFields,
      };
    }

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

    // now from the waiter we return the value, the error and the fields
    // we used to query this, the actual ones
    return {
      value,
      error,
      getQueryFields,
    };
  }
  public loadValueCompleted(value: IActionResponseWithValue): IActionResponseWithValue {
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

    // now we return without the query info
    return {
      value: value.value,
      error: value.error,
    };
  }
  public async setStateToCurrentValueWithExternalChecking(currentUpdateId: number) {
    // so when we want to externally check we first run the external check
    // using the normal get state function which runs async
    const newItemDefinitionState = await this.props.itemDefinitionInstance.getState(
      this.props.forId || null,
      this.props.forVersion || null,
      this.props.optimize && this.props.optimize.onlyIncludeProperties,
      this.props.optimize && this.props.optimize.onlyIncludeIncludes,
      this.props.optimize && this.props.optimize.excludePolicies,
    );

    // if the current update id is null (as in always update) or the last update id
    // that was requested is the same as the current (this is important in order)
    // to avoid situations where two external checks have been requested for some
    // reason only the last should be applied
    if (currentUpdateId === null || this.lastUpdateId === currentUpdateId) {
      // we set the state to the new state
      this.setState({
        itemDefinitionState: newItemDefinitionState,
      });
      // and trigger change listeners, all but our listener
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
    this.unSetupListeners();

    // when unmounting we check our optimization flags to see
    // if we are expecting to clean up the memory cache
    if (this.props.optimize && this.props.optimize.cleanOnDismount) {
      this.props.itemDefinitionInstance.cleanValueFor(this.props.forId || null, this.props.forVersion || null);
      // this will affect other instances that didn't dismount
      this.props.itemDefinitionInstance.triggerListeners(
        "change", this.props.forId || null, this.props.forVersion || null);
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
    options?: {
      onlyIncludeProperties?: string[],
      onlyIncludeIncludes?: string[],
      onlyIncludeIfDiffersFromAppliedValue?: boolean,
    },
  ): {
    isInvalid: boolean,
    propertiesToPoke: IPokeElementType[],
  } {
    // let's make this variable to check on whether things are invalid or not
    // first we check every property, that is included and allowed we use some
    // and return whether it's invalid
    const mainPropertiesIncluded: IPokeElementType[] = this.state.itemDefinitionState.properties.map((p) => {
      // we return false if we have an only included properties and our property is in there
      // because that means that whether it is valid or not is irrelevant for our query
      const isNotIncluded = options && options.onlyIncludeProperties &&
        !options.onlyIncludeProperties.includes(p.propertyId);
      if (isNotIncluded) {
        return null;
      }
      // now we check if we have the option to only include those that differ
      // from the applied value
      if (options && options.onlyIncludeIfDiffersFromAppliedValue) {
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
            return null;
          } else {
            // otherwise it really depends
            return {
              includeId: null,
              propertyId: p.propertyId,
              isInvalid: !p.valid,
            };
          }
        } else {
          // otherwise if there's no applied value we consider
          // the applied value to be null
          const doesNotDifferFromAppliedValue = p.value === null;
          if (doesNotDifferFromAppliedValue) {
            return null;
          } else {
            return {
              includeId: null,
              propertyId: p.propertyId,
              isInvalid: !p.valid,
            };
          }
        }
      }
      return {
        includeId: null,
        propertyId: p.propertyId,
        isInvalid: !p.valid,
      };
    }).filter((v) => !!v);

    const itemPropertiesIncluded: IPokeElementType[] = [];

    this.state.itemDefinitionState.includes.forEach((i) => {
      // same using the variable for only include, same check as before
      if (options && options.onlyIncludeIncludes && !options.onlyIncludeIncludes.includes(i.includeId)) {
        return;
      }

      // and now we get the sinking property ids
      const include = this.props.itemDefinitionInstance.getIncludeFor(i.includeId);
      const sinkingPropertyIds = include.getSinkingPropertiesIds();

      // and we extract the state only if it's a sinking property
      return i.itemDefinitionState.properties.some((p) => {
        if (!sinkingPropertyIds.includes(p.propertyId)) {
          return;
        }
        // now we check if we have the option to only include those that differ
        // from the applied value
        if (options && options.onlyIncludeIfDiffersFromAppliedValue) {
          // we get the current applied value, if any
          const currentAppliedValue = this.props.itemDefinitionInstance.getGQLAppliedValue(
            this.props.forId || null, this.props.forVersion || null);
          let considerItNull: boolean = false;
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
                itemPropertiesIncluded.push({
                  includeId: i.includeId,
                  propertyId: p.propertyId,
                  isInvalid: !p.valid,
                });
              }
            } else {
              considerItNull = true;
            }
          } else {
            considerItNull = true;
          }

          if (considerItNull) {
            // otherwise if there's no applied value we consider
            // the applied value to be null
            const doesNotDifferFromAppliedValue = p.value === null;
            // so if it does differ from applied value
            if (!doesNotDifferFromAppliedValue) {
              itemPropertiesIncluded.push({
                includeId: i.includeId,
                propertyId: p.propertyId,
                isInvalid: !p.valid,
              });
            }
          }
        } else {
          itemPropertiesIncluded.push({
            includeId: i.includeId,
            propertyId: p.propertyId,
            isInvalid: !p.valid,
          });
        }
      });
    });

    const propertiesToPoke = mainPropertiesIncluded.concat(itemPropertiesIncluded);

    return {
      propertiesToPoke,
      isInvalid: propertiesToPoke.some((ptp) => ptp.isInvalid),
    };
  }

  // this is a beast of a function
  // runs the queries and does the partial caching
  // making use of the partial cache
  public async runQueryFor(
    arg: {
      queryPrefix: string,
      baseArgs: any,
      requestFields: any,
      returnMemoryCachedValuesForGetRequests?: boolean,
      returnWorkerCachedValuesForGetRequests?: boolean,
      searchOrderBy?: string,
      searchCreatedBy?: number,
      searchParentedBy?: [string, number, string],
      searchCachePolicy?: "by-owner" | "by-parent" | "none",
      searchRequestedFieldsOnCachePolicy?: any,
    },
  ): Promise<{
    error: EndpointErrorType,
    value: any,
    memoryCached: boolean,
    cached: boolean,
    getQueryFields: any,
  }> {
    // so the first thing we need to get what kind of query we are running, first we get
    // the qualified path name that is used in graphql, when we get the extensions instance
    // this basically means a search requests, so it should be the prefix search but
    // this function is flexible so it allows mistakes
    const qualifiedName = (this.props.itemDefinitionInstance.isExtensionsInstance() ?
      this.props.itemDefinitionInstance.getParentModule().getQualifiedPathName() :
      this.props.itemDefinitionInstance.getQualifiedPathName());

    // this is the query we run
    const queryName = arg.queryPrefix + qualifiedName;

    // basic args, the base args usually are for policies and whatnot
    const args = {
      token: this.props.tokenData.token,
      language: this.props.localeData.language.split("-")[0],
      ...arg.baseArgs,
    };

    // if there's an id, we add it to the query
    if (this.props.forId) {
      args.id = this.props.forId;
    }

    if (arg.queryPrefix === PREFIX_SEARCH) {
      args.order_by = new GQLEnum(arg.searchOrderBy);
    }

    if (arg.queryPrefix === PREFIX_SEARCH && typeof arg.searchCreatedBy !== "undefined") {
      args.created_by = arg.searchCreatedBy;
    }

    if (arg.queryPrefix === PREFIX_SEARCH && typeof arg.searchParentedBy !== "undefined") {
      args.parent_type = arg.searchParentedBy[0];
      args.parent_id = arg.searchParentedBy[1];
      args.parent_version = arg.searchParentedBy[2];
    }

    // now we get the currently applied value in memory
    const appliedGQLValue = arg.queryPrefix !== PREFIX_SEARCH ?
      this.props.itemDefinitionInstance.getGQLAppliedValue(
        this.props.forId || null, this.props.forVersion || null) :
      null;
    // if we have a query to get a value, and we are allowed to return memory cached request
    if (arg.queryPrefix === PREFIX_GET && arg.returnMemoryCachedValuesForGetRequests) {
      // let's check if the memory cached and the requested value match
      if (
        appliedGQLValue &&
        requestFieldsAreContained(arg.requestFields, appliedGQLValue.requestFields)
      ) {
        return {
          error: null,
          value: appliedGQLValue.rawValue,
          memoryCached: true,
          cached: false,
          getQueryFields: appliedGQLValue.requestFields,
        };
      }
    }

    // otherwise now let's check for the worker
    if (
      // if we have an id and a GET request we want cached value
      arg.queryPrefix === PREFIX_GET &&
      this.props.forId &&
      CacheWorkerInstance.isSupported &&
      arg.returnWorkerCachedValuesForGetRequests
    ) {
      // we ask the worker for the value
      const workerCachedValue =
        await CacheWorkerInstance.instance.getCachedValue(
          queryName, this.props.forId, this.props.forVersion || null, arg.requestFields,
        );
      // if we have a GET request and we are allowed to return from the wroker cache and we actually
      // found something in our cache, return that
      if (workerCachedValue) {
        return {
          error: null,
          value: workerCachedValue.value,
          memoryCached: false,
          cached: true,
          getQueryFields: workerCachedValue.fields,
        };
      }
    }

    // if we are running a EDIT or DELETE query, where we are expected to
    // pass a listener uuid in order to avoid a feedback loop where we inform
    // ourselves of changes we have done, we pass it
    if (arg.queryPrefix === PREFIX_EDIT || arg.queryPrefix === PREFIX_DELETE) {
      args.listener_uuid = this.props.remoteListener.getUUID();
    }

    let cached = false;
    let gqlValue: IGQLEndpointValue;
    // if we are in a search with
    // a cache policy then we should be able
    // to run the search within the worker as
    // that is one of the jobs of he cache workers
    // when it needs to run searches on the client side
    // for that we would totally relegate the search functionality
    // and even requesting the server to the cache worker, it will take
    // as much time as it is necessary
    if (
      arg.queryPrefix === PREFIX_SEARCH &&
      arg.searchCachePolicy !== "none" &&
      CacheWorkerInstance.isSupported
    ) {
      const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();
      const standardCounterpartQualifiedName = (standardCounterpart.isExtensionsInstance() ?
        standardCounterpart.getParentModule().getQualifiedPathName() :
        standardCounterpart.getQualifiedPathName());
      const cacheWorkerGivenSearchValue = await CacheWorkerInstance.instance.runCachedSearch(
        queryName,
        args,
        PREFIX_GET_LIST + standardCounterpartQualifiedName,
        this.props.tokenData.token,
        this.props.localeData.language.split("-")[0],
        arg.searchRequestedFieldsOnCachePolicy,
        arg.searchCachePolicy,
      );
      gqlValue = cacheWorkerGivenSearchValue.gqlValue;
      cached = true;
      if (gqlValue && gqlValue.data) {
        if (arg.searchCachePolicy === "by-owner") {
          this.props.remoteListener.addOwnedSearchListenerFor(
            standardCounterpartQualifiedName,
            arg.searchCreatedBy,
            cacheWorkerGivenSearchValue.lastRecord,
            this.onSearchReload,
          );
        } else {
          this.props.remoteListener.addParentedSearchListenerFor(
            standardCounterpartQualifiedName,
            arg.searchParentedBy[0],
            arg.searchParentedBy[1],
            arg.searchParentedBy[2],
            cacheWorkerGivenSearchValue.lastRecord,
            this.onSearchReload,
          );
        }

        if (cacheWorkerGivenSearchValue.dataMightBeStale) {
          if (arg.searchCachePolicy === "by-owner") {
            this.props.remoteListener.requestOwnedSearchFeedbackFor({
              qualifiedPathName: standardCounterpartQualifiedName,
              createdBy: arg.searchCreatedBy,
              knownLastRecord: cacheWorkerGivenSearchValue.lastRecord,
            });
          } else {
            this.props.remoteListener.requestParentedSearchFeedbackFor({
              qualifiedPathName: standardCounterpartQualifiedName,
              parentType: arg.searchParentedBy[0],
              parentId: arg.searchParentedBy[1],
              parentVersion: arg.searchParentedBy[2],
              knownLastRecord: cacheWorkerGivenSearchValue.lastRecord,
            });
          }
        }
      }
    } else {
      // now we build the object query
      const objQuery: IGQLQueryObj = {
        name: queryName,
        args,
        fields: arg.requestFields,
      };

      // it's either a query or a mutation, only GET and SEARCH are queries
      let query: GQLQuery;
      if (arg.queryPrefix === PREFIX_GET || arg.queryPrefix === PREFIX_SEARCH) {
        query = buildGqlQuery(objQuery);
      } else {
        query = buildGqlMutation(objQuery);
      }

      // now we get the gql value using the gql query function
      // and this function will always run using the network
      gqlValue = await gqlQuery(query);
    }

    // now we got to check for errors
    let error: EndpointErrorType = null;

    if (gqlValue.errors) {
      // if the server itself returned an error, we use that error
      error = gqlValue.errors[0].extensions;
    }

    // now let's get the returned value
    let value: any = null;
    // and the merged query fields for this value
    let mergedQueryFields: any = arg.requestFields;
    // for first having a graphql value we need to check if
    // we actually have one, so we check all the way up to the
    // query name
    if (!error && gqlValue && gqlValue.data && gqlValue.data[queryName]) {
      // so this is the value that graphql gave
      value = gqlValue.data[queryName];
      // if we have a GET, EDIT or ADD, then we need to
      // set up the cache
      if (
        arg.queryPrefix === PREFIX_GET ||
        arg.queryPrefix === PREFIX_EDIT
      ) {
        // first we check if we have a value in memory
        // cache and we merge it with what we got
        // note how the first argument takes priority
        // and the second will be the one overriden
        // if there's a collision the last_modified attribute
        // always gets downloaded, and with this we ensure that
        // the data is cacheable of the same modification date we
        // don't want data of different versions to be colliding
        if (
          appliedGQLValue &&
          appliedGQLValue.rawValue &&
          appliedGQLValue.rawValue.last_modified === value.last_modified
        ) {
          value = deepMerge(
            value,
            appliedGQLValue.rawValue,
          );
          mergedQueryFields = deepMerge(
            arg.requestFields,
            appliedGQLValue.requestFields,
          );
        }
      }
    }

    // now that we have done all that we are going to cache our merged
    // results
    if (
      !error &&
      CacheWorkerInstance.isSupported &&
      (
        !this.props.optimize ||
        !this.props.optimize.avoidLongTermCaching
      )
    ) {
      // in the case of delete, we just cache nulls also
      // the same applies in the case of get and a not found
      // was the output
      if (
        arg.queryPrefix === PREFIX_DELETE ||
        (arg.queryPrefix === PREFIX_GET && !value)
      ) {
        // we are here guaranteed that if we have retrieved something from
        // the server in an unique value way it is not a module and it's not
        // a search mode, since we are here, so we can infer the module search
        // and the item definition search in order to be efficient
        CacheWorkerInstance.instance.setCachedValueAsNullAndUpdateSearches(
          this.props.forId,
          this.props.forVersion,
          qualifiedName,
          PREFIX_GET + qualifiedName,
          PREFIX_SEARCH + this.props.itemDefinitionInstance.getParentModule().getSearchModule().getQualifiedPathName(),
          PREFIX_SEARCH + this.props.itemDefinitionInstance.getSearchModeCounterpart().getQualifiedPathName(),
        );
      } else if (
        (
          arg.queryPrefix === PREFIX_GET ||
          arg.queryPrefix === PREFIX_EDIT ||
          arg.queryPrefix === PREFIX_ADD
        ) &&
        value && mergedQueryFields
      ) {
        CacheWorkerInstance.instance.mergeCachedValue(
          PREFIX_GET + qualifiedName, value.id, value.version, value, mergedQueryFields);
      }
    }

    return {
      error,
      value,
      memoryCached: false,
      // this is basically only true during the search cached
      cached,
      getQueryFields: mergedQueryFields,
    };
  }

  // TODO get rid of this function make policies need to be manually set
  public checkPoliciesAndGetArgs(policyType: string, argumentsToCheckPropertiesAgainst?: any): {
    isInvalid: boolean;
    applyingPolicyArgs: any;
    applyingPolicies: PolicyPathType[];
  } {
    const applyingPolicyArgs: any = {};
    const applyingPolicies: PolicyPathType[] = [];
    return {
      isInvalid: Object.keys(this.state.itemDefinitionState.policies[policyType]).map((policyName) => {
        // and for that we check using some again every property that is applied in the policy
        return this.state.itemDefinitionState.policies[policyType][policyName].map((propertyStateInPolicy) => {
          // we check regarding the property ids only if we are asked to do so by the arguments for query
          if (argumentsToCheckPropertiesAgainst) {
            // and now we need to check whether the policy is at all necessary, as in, are we modifying
            // any property that would cause this to be needed, for that we get the applying ids
            const applyingPropertyIds = this.props.itemDefinitionInstance
              .getApplyingPropertyIdsForPolicy(policyType, policyName);

            // this only matters if there are applying property ids, this might not be the
            // case and as so be a generic policy that applies to all
            if (applyingPropertyIds) {
              // and using some yet again we check whether using the argumentsToCheckPropertiesAgainst
              // which is a gql object
              // which funnily will contain the same id in case it is there, it will tell us whether one
              // of the property actually is going to be modified and so our policy applies
              const oneOfApplyingPropertiesApplies = applyingPropertyIds
                .some((pid) => typeof argumentsToCheckPropertiesAgainst[pid] !== "undefined");
              // if it doesn't match anything, we return false, so technically this policy is valid
              // regardless on whether
              // the value itself is valid or not because it will not pass to the graphql query
              if (!oneOfApplyingPropertiesApplies) {
                // the attribute is not included isInvalid is false we ignore
                return false;
              }
            }

            // now we do the same but with the items
            const applyingIncludeIds = this.props.itemDefinitionInstance
              .getApplyingIncludeIdsForPolicy(policyType, policyName);

            if (applyingIncludeIds) {
              const oneOfApplyingIncludesApplies = applyingIncludeIds
                .some((includeId) => {
                  const referredInclude = this.props.itemDefinitionInstance.getIncludeFor(includeId);
                  return (
                    typeof argumentsToCheckPropertiesAgainst[
                      referredInclude.getQualifiedIdentifier()
                    ] !== "undefined" ||
                    typeof argumentsToCheckPropertiesAgainst[
                      referredInclude.getQualifiedExclusionStateIdentifier()
                    ] !== "undefined"
                  );
                });

              if (!oneOfApplyingIncludesApplies) {
                return false;
              }
            }
          }
          // Here we are doing exactly the same as we did with applying property ids but this time
          // now we do it with the roles
          const applyingRoles = this.props.itemDefinitionInstance.getRolesForPolicy(policyType, policyName);
          const oneOfApplyingRolesApplies =
            applyingRoles.includes(this.props.tokenData.role) ||
            applyingRoles.includes(ANYONE_METAROLE) ||
            (applyingRoles.includes(ANYONE_LOGGED_METAROLE) && this.props.tokenData.role !== GUEST_METAROLE);
          if (!oneOfApplyingRolesApplies) {
            // the attribute is not included isInvalid is false
            return false;
          }

          // otherwise we are going to set it in the policy arguments that go with the arguments for the
          // query
          const policyProperty =
            this.props.itemDefinitionInstance
              .getPropertyDefinitionForPolicy(policyType, policyName, propertyStateInPolicy.propertyId);

          // then we are going to set that value using the qualified identifier that is used
          // in the args
          applyingPolicyArgs[policyProperty.getQualifiedPolicyIdentifier(policyType, policyName)] =
            propertyStateInPolicy.value;
          applyingPolicies.push([policyType, policyName, policyProperty.getId()]);

          // otherwise we are going to return whether it is invalid
          return !propertyStateInPolicy.valid;
        }).some((isPolicyNameInvalid) => isPolicyNameInvalid);
      }).some((isPolicyTypeInvalid) => isPolicyTypeInvalid),
      applyingPolicyArgs,
      applyingPolicies,
    };
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
    this.setState({
      [stateApplied]: emulatedError,
    } as any);

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

    const {isInvalid, applyingPolicyArgs, applyingPolicies} = this.checkPoliciesAndGetArgs(
      "delete",
    );

    if (options.beforeDelete && !options.beforeDelete(applyingPolicies)) {
      return null;
    }

    if (isInvalid) {
      // if it's not poked already, let's poke it
      this.setState({
        pokePoliciesType: "delete",
      });
      return this.giveEmulatedInvalidError("deleteError", false, false);
    }

    this.setState({
      deleting: true,
    });

    const {
      error,
    } = await this.runQueryFor({
      queryPrefix: PREFIX_DELETE,
      baseArgs: applyingPolicyArgs,
      requestFields: {
        id: {},
      },
    });

    if (error) {
      this.setState({
        deleteError: error,
        deleting: false,
        deleted: false,
        pokePoliciesType: "delete",
      });
    } else {
      this.props.itemDefinitionInstance.cleanValueFor(this.props.forId, this.props.forVersion || null);
      this.setState({
        deleteError: null,
        deleting: false,
        deleted: true,
        notFound: true,
        pokePoliciesType: options.unpokeAfterSuccess ? null : "delete",
      });
      if (options.policiesToCleanOnSuccess) {
        options.policiesToCleanOnSuccess.forEach((policyArray) => {
          this.props.itemDefinitionInstance
            .getPropertyDefinitionForPolicy(...policyArray)
            .cleanValueFor(this.props.forId, this.props.forVersion || null);
        });
      }
      this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId, this.props.forVersion || null);
    }

    return {
      error,
    };
  }
  public async submit(options: IActionSubmitOptions = {}): Promise<IActionResponseWithId> {
    // if we are already submitting, we reject the action
    if (this.state.submitting) {
      return null;
    }

    const {isInvalid, propertiesToPoke} = this.checkItemDefinitionStateValidity(options);

    // if it's invalid let's return the emulated error
    if (isInvalid) {
      // if it's not poked already, let's poke it
      this.setState({
        pokedElements: propertiesToPoke,
        pokePoliciesType: this.props.forId ? "edit" : null,
      });
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
      onlyIncludeIncludes: this.props.optimize && this.props.optimize.onlyIncludeIncludes,
      onlyIncludeProperties: this.props.optimize && this.props.optimize.onlyIncludeProperties,
      onlyIncludeIncludesForArgs: options.onlyIncludeIncludes,
      onlyIncludePropertiesForArgs: options.onlyIncludeProperties,
      onlyIncludeArgsIfDiffersFromAppliedValue: options.onlyIncludeIfDiffersFromAppliedValue,
      appliedOwner: this.props.assumeOwnership ? this.props.tokenData.id : null,
      userId: this.props.tokenData.id,
      userRole: this.props.tokenData.role,
      itemDefinitionInstance: this.props.itemDefinitionInstance,
      forId: this.props.forId,
      forVersion: this.props.forVersion || null,
    });

    // super hack in order to get the applying policy args
    let applyingPolicyArgs: any = {};
    let applyingPolicies: PolicyPathType[] = [];
    let isInvalidByPolicy = false;
    // first we only need to run this if it's not invalid, otherwise the values
    // are never really used for the policy state, also this is only useful for
    // edits
    if (this.props.forId && this.state.itemDefinitionState.policies.edit) {
      // now we set the variable by checking all the policies in the state using some
      // we check every policyName included in edit
      const checkPoliciesResult = this.checkPoliciesAndGetArgs(
        "edit",
        argumentsForQuery,
      );
      applyingPolicyArgs = checkPoliciesResult.applyingPolicyArgs;
      isInvalidByPolicy = checkPoliciesResult.isInvalid;
      applyingPolicies = checkPoliciesResult.applyingPolicies;
    }

    // now checking the option for the before submit function, if it returns
    // false we cancel the submit request, we don't check policies yet
    if (options && options.beforeSubmit && !options.beforeSubmit(applyingPolicies)) {
      return null;
    }

    // if it's invalid we give the simulated error yet again
    if (isInvalidByPolicy) {
      // if it's not poked already, let's poke it
      this.setState({
        pokePoliciesType: "edit",
      });
      return this.giveEmulatedInvalidError("submitError", true, false) as IActionResponseWithId;
    }

    // now it's when we are actually submitting
    this.setState({
      submitting: true,
    });

    const {
      value,
      error,
      getQueryFields,
    } = await this.runQueryFor({
      queryPrefix: !this.props.forId ? PREFIX_ADD : PREFIX_EDIT,
      baseArgs: {
        ...argumentsForQuery,
        ...applyingPolicyArgs,
      },
      requestFields,
    });

    let recievedId: number = null;
    let receivedVersion: string = null;
    if (error) {
      this.setState({
        submitError: error,
        submitting: false,
        submitted: false,
        pokedElements: propertiesToPoke,
        pokePoliciesType: this.props.forId ? "edit" : null,
      });
    } else if (value) {
      this.setState({
        submitError: null,
        submitting: false,
        submitted: true,
        pokedElements: options.unpokeAfterSuccess ? [] : propertiesToPoke,
        pokePoliciesType: options.unpokeAfterSuccess ? null : (
          this.props.forId ? "edit" : null
        ),
      });

      recievedId = value.id;
      receivedVersion = value.version;
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
      if (options.propertiesToCleanOnSuccess) {
        options.propertiesToCleanOnSuccess.forEach((ptc) => {
          this.props.itemDefinitionInstance
            .getPropertyDefinitionFor(ptc, true).cleanValueFor(this.props.forId,
              this.props.forVersion || null);
        });
      }
      if (options.policiesToCleanOnSuccess) {
        options.policiesToCleanOnSuccess.forEach((policyArray) => {
          this.props.itemDefinitionInstance
            .getPropertyDefinitionForPolicy(...policyArray).cleanValueFor(this.props.forId,
              this.props.forVersion || null);
        });
      }
      this.props.itemDefinitionInstance.triggerListeners("change", recievedId, receivedVersion);
    }

    // happens during an error or whatnot
    return {
      id: recievedId,
      error,
    };
  }
  public async search(options: IActionSearchOptions): Promise<IActionResponseWithSearchResults> {
    if (this.state.searching) {
      return null;
    }
    const {isInvalid, propertiesToPoke} = this.checkItemDefinitionStateValidity();

    this.setState({
      pokedElements: propertiesToPoke,
      pokePoliciesType: null,
    });

    // if it's invalid let's return the emulated error
    if (isInvalid) {
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

    this.setState({
      searching: true,
    });

    const standardCounterpart = this.props.itemDefinitionInstance.getStandardCounterpart();

    let onlyIncludePropertiesForArgs: string[] = null;
    if (options.onlyIncludeSearchPropertiesForProperties) {
      onlyIncludePropertiesForArgs = [];
      options.onlyIncludeSearchPropertiesForProperties.forEach((propertyId) => {
        const standardProperty = standardCounterpart.getPropertyDefinitionFor(propertyId, true);
        onlyIncludePropertiesForArgs = onlyIncludePropertiesForArgs.concat(getConversionIds(standardProperty.rawData));
      });
    }

    const {
      argumentsForQuery,
    } = getFieldsAndArgs({
      includeArgs: true,
      includeFields: false,
      onlyIncludeIncludesForArgs: options.onlyIncludeIncludes,
      onlyIncludePropertiesForArgs,
      appliedOwner: this.props.assumeOwnership ? this.props.tokenData.id : null,
      userId: this.props.tokenData.id,
      userRole: this.props.tokenData.role,
      itemDefinitionInstance: this.props.itemDefinitionInstance,
      forId: this.props.forId,
      forVersion: this.props.forVersion || null,
    });

    const searchFieldsAndArgs = getFieldsAndArgs({
      includeArgs: false,
      includeFields: true,
      onlyIncludeProperties: options.requestedProperties,
      onlyIncludeIncludes: options.requestedIncludes || [],
      appliedOwner: options.createdBy,
      userId: this.props.tokenData.id,
      userRole: this.props.tokenData.role,
      itemDefinitionInstance: standardCounterpart,
      forId: null,
      forVersion: null,
    });
    const requestedSearchFields = searchFieldsAndArgs.requestFields;

    const {
      value,
      error,
    } = await this.runQueryFor({
      queryPrefix: PREFIX_SEARCH,
      baseArgs: argumentsForQuery,
      requestFields: {
        ids: {
          id: {},
          version: {},
          type: {},
          created_at: {},
        },
      },
      searchCachePolicy: options.cachePolicy || "none",
      searchCreatedBy: options.createdBy || null,
      searchOrderBy: options.orderBy || "DEFAULT",
      searchRequestedFieldsOnCachePolicy: requestedSearchFields,
    });

    const searchResults: IGQLSearchResult[] = [];
    if (error) {
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
        pokedElements: propertiesToPoke,
        pokePoliciesType: null,
      });
    } else {
      this.setState({
        searchError: null,
        searching: false,
        searchResults: value ? value.ids : [],
        searchId: uuid.v4(),
        searchOwner: options.createdBy || null,
        searchParent,
        searchShouldCache: !!options.cachePolicy,
        searchFields: requestedSearchFields,
        searchRequestedProperties: options.requestedProperties,
        searchRequestedIncludes: options.requestedIncludes || [],
        pokedElements: options.unpokeAfterSuccess ? [] : propertiesToPoke,
        pokePoliciesType: null,
      });
    }

    return {
      results: searchResults,
      error: null,
    };
  }
  public dismissLoadError() {
    this.setState({
      loadError: null,
    });
  }
  public dismissDeleteError() {
    this.setState({
      deleteError: null,
    });
  }
  public dismissSubmitError() {
    this.setState({
      submitError: null,
    });
  }
  public dismissSubmitted() {
    this.setState({
      submitted: null,
    });
  }
  public dismissDeleted() {
    this.setState({
      deleted: false,
    });
  }
  public dismissSearchError() {
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
    this.setState({
      pokePoliciesType: null,
      pokedElements: [],
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
          pokePoliciesType: this.state.pokePoliciesType,
          submit: this.submit,
          reload: this.loadValue,
          delete: this.delete,
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
