import React from "react";
import { LocaleContext, ILocaleContextType } from "../internal/app";
import ItemDefinition, { IItemDefinitionStateType, ItemDefinitionIOActions } from "../../base/Root/Module/ItemDefinition";
import PropertyDefinition from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import Item, { ItemExclusionState } from "../../base/Root/Module/ItemDefinition/Item";
import { TokenContext, ITokenContextType } from "../internal/app/internal-providers";
import {
  PREFIX_GET,
  PREFIX_EDIT,
  PREFIX_ADD,
  PREFIX_DELETE,
  PREFIX_SEARCH,
} from "../../constants";
import { buildGqlQuery, buildGqlMutation, gqlQuery,
  IGQLQueryObj, GQLEnum, GQLQuery } from "../internal/app/gql-querier";
import { requestFieldsAreContained, deepMerge } from "../../gql-util";
import { GraphQLEndpointErrorType } from "../../base/errors";
import equals from "deep-equal";
import { ModuleContext } from "./module";
import { getConversionIds } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/search-mode";
import CacheWorkerInstance from "../internal/workers/cache";
import { RemoteListener } from "../internal/app/remote-listener";
import { getFieldsAndArgs } from "../../util";

// THIS IS THE MOST IMPORTANT FILE OF WHOLE ITEMIZE
// HERE IS WHERE THE MAGIC HAPPENS

/**
 * A response given by some handlers like
 * loadValue
 */
export interface IBasicActionResponse {
  error: GraphQLEndpointErrorType;
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
  results: ISearchResult[];
}

export type PolicyPathType = [string, string, string];

/**
 * The options for submitting,
 * aka edit, aka add
 */
export interface IActionSubmitOptions {
  onlyIncludeProperties?: string[];
  onlyIncludeItems?: string[];
  onlyIncludeIfDiffersFromAppliedValue?: boolean;
  unpokeAfterSuccess?: boolean;
  propertiesToCleanOnSuccess?: string[];
  policiesToCleanOnSuccess?: PolicyPathType[];
  beforeSubmit?: (policiesRequested: PolicyPathType[]) => boolean;
}

export interface IActionDeleteOptions {
  beforeDelete?: (policiesRequested: PolicyPathType[]) => boolean;
}

/**
 * The options for searching
 */
export interface IActionSearchOptions {
  onlyIncludeSearchPropertiesForProperties?: string[];
  onlyIncludeItems?: string[];
  unpokeAfterSuccess?: boolean;
  orderBy?: "DEFAULT";
}

/**
 * Search results as they are provided
 * by the search function, they are based
 * on the ID_CONTAINER in the graphql types
 * that graphql returns
 */
export interface ISearchResult {
  type: string;
  module_path: string;
  idef_path: string;
  id: number;
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
  loadError: GraphQLEndpointErrorType;
  // whether it is currently loading
  loading: boolean;
  // an error that came during submitting
  submitError: GraphQLEndpointErrorType;
  // whether it is currently submitting
  submitting: boolean;
  // whether it has submitted sucesfully, this is a transitory
  // flag, and should be removed, basically it means the item
  // is in a success state of submitted
  submitted: boolean;
  // an error that came during deleting
  deleteError: GraphQLEndpointErrorType;
  // whether it is currently deleting
  deleting: boolean;
  // same as submitted, a success flag that says whether the element
  // was deleted
  deleted: boolean;
  // an error that occured during search
  searchError: GraphQLEndpointErrorType;
  // whether it is currently searching
  searching: boolean;
  // the obtained search results from the graphql endpoint
  // just as they come
  searchResults: ISearchResult[];
  // poked is a flag that is raised to mean to ignore
  // anything regarding user set statuses and just mark
  // things as they are, for example, by default many fields
  // are empty (null) and they are invalid, but in UX wise
  // it makes no sense to show as invalid immediately
  // poked makes it so that every field shows its true state
  // they are poked
  poked: boolean;
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
  search: () => Promise<IActionResponseWithSearchResults>;
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
  onItemSetExclusionState: (
    item: Item,
    state: ItemExclusionState,
  ) => void;
  // now this would be used on enforcement, this is used for the setter
  // the reason it also needs to specify the id is because it might
  // go out of sync with the item definition
  onPropertyEnforce: (
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    givenForId: number,
  ) => void;
  onPropertyClearEnforce: (
    property: PropertyDefinition,
    givenForId: number,
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
  currentlySearching: ISearchResult[];
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
  // this is an important flag, if ownership is assumed this means
  // that when automatic fetching of properties it will do so assuming
  // the current user is the owner, so SELF rules pass, put an example,
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
  // optimization, these cause no differences in UX/UI or function
  // but they can speed up your app
  // they affect request payloads as well as the application state itself
  // use them carefully as if you mess up it will cause some values not to load
  optimize?: {
    // only downloads and includes the properties specified in the list
    // in the state
    onlyIncludeProperties?: string[],
    // only includes the items specified in the list in the state
    onlyIncludeItems?: string[],
    // excludes the policies from being part of the state
    excludePolicies?: boolean,
    // cleans the value from the memory cache once the object dismounts
    // as the memory cache might only grow and grow
    cleanOnDismount?: boolean,
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
  loadError: GraphQLEndpointErrorType;
  loading: boolean;
  submitError: GraphQLEndpointErrorType;
  submitting: boolean;
  submitted: boolean;
  deleteError: GraphQLEndpointErrorType;
  deleting: boolean;
  deleted: boolean;
  searchError: GraphQLEndpointErrorType;
  searching: boolean;
  searchResults: ISearchResult[];
  poked: boolean;
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
          !props.disableExternalChecks,
          props.optimize && props.optimize.onlyIncludeProperties,
          props.optimize && props.optimize.onlyIncludeItems,
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

  constructor(props: IActualItemDefinitionProviderProps) {
    super(props);

    // Just binding all the functions to ensure their context is defined
    this.onPropertyChange = this.onPropertyChange.bind(this);
    this.onItemSetExclusionState = this.onItemSetExclusionState.bind(this);
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
        !this.props.disableExternalChecks,
        this.props.optimize && this.props.optimize.onlyIncludeProperties,
        this.props.optimize && this.props.optimize.onlyIncludeItems,
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

      poked: false,

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

    // and we attempt to load the current value
    this.loadValue();
  }

  // setup the listeners is simple
  public setupListeners() {
    /// first the change listener that checks for every change event that happens with the state
    this.props.itemDefinitionInstance.addListener("change", this.props.forId || null, this.changeListener);

    // second are the remote listeners, only when there's an id defined
    if (this.props.forId) {
      // one is the reload, this gets called when the value of the field has differed from the one that
      // we have gotten (or have cached) this listener is very important for that reason, otherwise our app
      // will get frozen in the past
      this.props.itemDefinitionInstance.addListener("reload", this.props.forId, this.reloadListener);

      // note how we used the item definition instance and that's because those events are piped from
      // within this remote listener, the remote listener pipes the events from the websocket
      // and triggers them in within the item definition instance; that's because the server just says what it does
      // it says "this has been deleted" or "this element has changed" or "the last time this element was changed was"
      // so the remote listener job is to check how does it compare to what we have in our application state
      // do the dates match?... do we even have a value for it?... etc... adding remote listeners is heavy
      // as it will send data either via HTTP or websockets
      this.props.remoteListener.addItemDefinitionListenerFor(
        this,
        this.props.itemDefinitionInstance,
        this.props.forId,
      );
    }
  }
  public unSetupListeners() {
    // here we just remove the listeners that we have setup
    this.props.itemDefinitionInstance.removeListener("change", this.props.forId || null, this.changeListener);
    if (this.props.forId) {
      // remove all the remote listeners
      this.props.itemDefinitionInstance.removeListener("reload", this.props.forId, this.reloadListener);
      this.props.remoteListener.removeItemDefinitionListenerFor(
        this,
        this.props.itemDefinitionInstance,
        this.props.forId,
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
      (nextProps.forId || null) !== (this.props.forId || null) ||
      !!nextProps.assumeOwnership !== !!this.props.assumeOwnership ||
      nextProps.children !== this.props.children ||
      nextProps.localeData !== this.props.localeData ||
      nextProps.tokenData.id !== this.props.tokenData.id ||
      nextProps.tokenData.role !== this.props.tokenData.role ||
      nextProps.remoteListener !== this.props.remoteListener ||
      !equals(this.props.optimize, nextProps.optimize) ||
      !equals(this.state, nextState);
  }
  public async componentDidUpdate(
    prevProps: IActualItemDefinitionProviderProps,
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

      // if this was an item definition or id update
      if (itemDefinitionWasUpdated || (prevProps.forId || null) !== (this.props.forId || null)) {
        // we need to remove the old listeners
        prevProps.itemDefinitionInstance.removeListener("change", prevProps.forId || null, this.changeListener);
        if (prevProps.forId) {
          prevProps.itemDefinitionInstance.addListener("reload", prevProps.forId, this.reloadListener);
          prevProps.remoteListener.removeItemDefinitionListenerFor(
            this, prevProps.itemDefinitionInstance, prevProps.forId,
          );
        }

        // add the new listeners
        this.props.itemDefinitionInstance.addListener("change", this.props.forId || null, this.changeListener);
        if (this.props.forId) {
          this.props.itemDefinitionInstance.addListener("reload", this.props.forId, this.reloadListener);
          this.props.remoteListener.addItemDefinitionListenerFor(
            this, this.props.itemDefinitionInstance, this.props.forId,
          );
        }
      }

      // we set the value given we have changed the forId with the new optimization flags
      this.setState({
        itemDefinitionState: this.props.itemDefinitionInstance.getStateNoExternalChecking(
          this.props.forId || null,
          !this.props.disableExternalChecks,
          this.props.optimize && this.props.optimize.onlyIncludeProperties,
          this.props.optimize && this.props.optimize.onlyIncludeItems,
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
  }

  public reloadListener() {
    console.log("RELOAD LISTENED");
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
        !this.props.disableExternalChecks,
        this.props.optimize && this.props.optimize.onlyIncludeProperties,
        this.props.optimize && this.props.optimize.onlyIncludeItems,
        this.props.optimize && this.props.optimize.excludePolicies,
      ),
      // we do this because eg. the search relies on triggering the change listener
      // no notify that things aren't loading anymore
      loading: false,
      // also search might do this, and it's true anyway
      notFound:
        this.props.forId ? !this.props.itemDefinitionInstance.hasAppliedValueTo(this.props.forId || null) : false,
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
      onlyIncludeItems: this.props.optimize && this.props.optimize.onlyIncludeItems,
      onlyIncludeProperties: this.props.optimize && this.props.optimize.onlyIncludeProperties,
      appliedOwner: this.props.assumeOwnership ? this.props.tokenData.id : null,
      userId: this.props.tokenData.id,
      userRole: this.props.tokenData.role,
      itemDefinitionInstance: this.props.itemDefinitionInstance,
      forId: this.props.forId,
    });

    if (!denyCache) {
      // Prevent loading at all if value currently available and memoryCached
      const appliedGQLValue = this.props.itemDefinitionInstance.getGQLAppliedValue(this.props.forId);
      if (
        appliedGQLValue &&
        requestFieldsAreContained(requestFields, appliedGQLValue.requestFields)
      ) {
        const completedValue = this.loadValueCompleted({
          value: appliedGQLValue.rawValue,
          error: null,
        });
        this.props.remoteListener.requestFeedbackFor(this.props.itemDefinitionInstance, this.props.forId);
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
        (s) => s.id === this.props.forId && s.type === this.props.itemDefinitionInstance.getQualifiedPathName(),
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
        value.value,
        false,
        this.props.tokenData.id,
        this.props.tokenData.role,
        value.getQueryFields,
      );

      // and then we trigger the change listener for all the instances
      this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId || null);
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
    } = await this.runQueryFor(
      PREFIX_GET,
      {},
      requestFields,
      false,
      !denyCache,
      null,
    );

    // this should never happen honestly as we are giving
    // a false flag for return memoryCached value for get requests
    // but we leave it here just in case, memoryCached means the object
    // is already in memory in the state and already populated because react uses
    // that state
    if (memoryCached) {
      return {
        value: this.props.itemDefinitionInstance.getGQLAppliedValue(this.props.forId).rawValue,
        error: null,
        getQueryFields: this.props.itemDefinitionInstance.getGQLAppliedValue(this.props.forId).requestFields,
      };
    }

    // if the item has been cached, as in returned from the indexed db database
    // rather than the server, we don't know if it's actually the current value
    // so we request feedback from the listener, the listener will kick a reload
    // event if it finds a mismatch which will cause this function to run again (see above)
    // but the denyCache flag will be active, ensuring the value will be requested
    // from the server
    if (cached) {
      this.props.remoteListener.requestFeedbackFor(this.props.itemDefinitionInstance, this.props.forId);
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
      this.props.optimize && this.props.optimize.onlyIncludeProperties,
      this.props.optimize && this.props.optimize.onlyIncludeItems,
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
      this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId || null, this.changeListener);
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
    property.setCurrentValue(this.props.forId || null, value, internalValue);
    // trigger the listeners for change so everything updates nicely
    this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId || null);

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
  }
  public onPropertyEnforce(
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    givenForId: number,
  ) {
    // this function is basically run by the setter
    // since they might be out of sync that's why the id is passed
    // the setter enforces values
    property.setSuperEnforced(givenForId || null, value);
    this.props.itemDefinitionInstance.triggerListeners("change", givenForId || null);
  }
  public onPropertyClearEnforce(
    property: PropertyDefinition,
    givenForId: number,
  ) {
    // same but removes the enforcement
    property.clearSuperEnforced(givenForId || null);
    this.props.itemDefinitionInstance.triggerListeners("change", givenForId || null);
  }
  public componentWillUnmount() {
    this.unSetupListeners();

    // when unmounting we check our optimization flags to see
    // if we are expecting to clean up the memory cache
    if (this.props.optimize && this.props.optimize.cleanOnDismount) {
      this.props.itemDefinitionInstance.cleanValueFor(this.props.forId || null);
      // this will affect other instances that didn't dismount
      this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId || null);
    }
  }
  public onItemSetExclusionState(item: Item, state: ItemExclusionState) {
    // just sets the exclusion state
    item.setExclusionState(this.props.forId || null, state);
    this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId || null);

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
      onlyIncludeItems?: string[],
      onlyIncludeIfDiffersFromAppliedValue?: boolean,
    },
  ): boolean {
    // let's make this variable to check on whether things are invalid or not
    // first we check every property, that is included and allowed we use some
    // and return whether it's invalid
    let isInvalid = this.state.itemDefinitionState.properties.some((p) => {
      // we return false if we have an only included properties and our property is in there
      // because that means that whether it is valid or not is irrelevant for our query
      const isNotIncluded = options && options.onlyIncludeProperties &&
        !options.onlyIncludeProperties.includes(p.propertyId);
      if (isNotIncluded) {
        return false;
      }
      // now we check if we have the option to only include those that differ
      // from the applied value
      if (options && options.onlyIncludeIfDiffersFromAppliedValue) {
        // we get the current applied value, if any
        const currentAppliedValue = this.props.itemDefinitionInstance.getGQLAppliedValue(this.props.forId || null);
        // if there is an applied value for that property
        if (currentAppliedValue && typeof currentAppliedValue.flattenedValue[p.propertyId] !== "undefined") {
          // let's check if it's differ from what we have in the state
          const doesNotDifferFromAppliedValue = equals(
            currentAppliedValue.flattenedValue[p.propertyId],
            p.value,
          );
          // if it does not differ, then it's false as it won't be included
          if (doesNotDifferFromAppliedValue) {
            return false;
          } else {
            // otherwise it really depends
            return !p.valid;
          }
        } else {
          // we return false here to basically not check
          // we cannot compare against the applied value
          // so this will anyway not be included
          return false;
        }
      }
      return !p.valid;
    });

    // now we check the next only is it's not already invalid
    if (!isInvalid) {
      // and we do this time the same but with the items
      isInvalid = this.state.itemDefinitionState.items.some((i) => {
        // same using the variable for only include items, same check as before
        if (options && options.onlyIncludeItems && !options.onlyIncludeItems.includes(i.itemId)) {
          return false;
        }

        // and now we get the sinking property ids
        const item = this.props.itemDefinitionInstance.getItemFor(i.itemId);
        const sinkingPropertyIds = item.getSinkingPropertiesIds();

        // and we extract the state only if it's a sinking property
        return i.itemDefinitionState.properties.some((p) => {
          if (!sinkingPropertyIds.includes(p.propertyId)) {
            return false;
          }
          // now we check if we have the option to only include those that differ
          // from the applied value
          if (options && options.onlyIncludeIfDiffersFromAppliedValue) {
            // we get the current applied value, if any
            const currentAppliedValue = this.props.itemDefinitionInstance.getGQLAppliedValue(this.props.forId || null);
            // if there is an applied value for that property
            if (currentAppliedValue && currentAppliedValue.flattenedValue[item.getQualifiedIdentifier()]) {
              const itemAppliedValue = currentAppliedValue.flattenedValue[item.getQualifiedIdentifier()];
              if (typeof itemAppliedValue[p.propertyId] !== "undefined") {
                // let's check if it's differ from what we have in the state
                const doesNotDifferFromAppliedValue = equals(
                  itemAppliedValue[p.propertyId],
                  p.value,
                );
                // if it does not differ, then it's false, as it won't be included
                if (doesNotDifferFromAppliedValue) {
                  return false;
                } else {
                  // otherwise it will be included so check
                  return !p.valid;
                }
              } else {
                // we do not check if not specific item value
                return false;
              }
            } else {
              // we do not check if no whole applied value
              return false;
            }
          }
          return !p.valid;
        });
      });
    }

    return isInvalid;
  }

  // this is a beast of a function
  // runs the queries and does the partial caching
  // making use of the partial cache
  public async runQueryFor(
    queryPrefix: string,
    baseArgs: any,
    requestFields: any,
    returnMemoryCachedValuesForGetRequests: boolean,
    returnWorkerCachedValuesForGetRequests: boolean,
    searchOrderBy: string,
  ): Promise<{
    error: GraphQLEndpointErrorType,
    value: any,
    memoryCached: boolean,
    cached: boolean,
    getQueryFields: any,
  }> {
    // so the first thing we need to get what kind of query we are running, first we get
    // the qualified path name that is used in graphql, when we get the extensions instance
    // this basically means a search requests, so it should be the prefix search but
    // this function is flexible so it allows mistakes
    const queryBase = (this.props.itemDefinitionInstance.isExtensionsInstance() ?
      this.props.itemDefinitionInstance.getParentModule().getQualifiedPathName() :
      this.props.itemDefinitionInstance.getQualifiedPathName());

    // this is the query we run
    const queryName = queryPrefix + queryBase;

    // basic args, the base args usually are for policies and whatnot
    const args = {
      token: this.props.tokenData.token,
      language: this.props.localeData.language.split("-")[0],
      ...baseArgs,
    };

    // if there's an id, we add it to the query
    if (this.props.forId) {
      args.id = this.props.forId;
    }

    if (queryPrefix === PREFIX_SEARCH) {
      args.order_by = new GQLEnum(searchOrderBy);
    }

    // now we get the currently applied value in memory
    const appliedGQLValue = this.props.itemDefinitionInstance.getGQLAppliedValue(this.props.forId || null);
    // if we have a query to get a value, and we are allowed to return memory cached request
    if (queryPrefix === PREFIX_GET && returnMemoryCachedValuesForGetRequests) {
      // let's check if the memory cached and the requested value match
      if (
        appliedGQLValue &&
        requestFieldsAreContained(requestFields, appliedGQLValue.requestFields)
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
      // if we have an id and a GET or EDIT request we want
      // to get the cached value, always, for update reasons as well
      (
        queryPrefix === PREFIX_GET ||
        queryPrefix === PREFIX_EDIT
      ) &&
      this.props.forId &&
      CacheWorkerInstance.isSupported
    ) {
      // we ask the worker for the value
      const workerCachedValue =
        await CacheWorkerInstance.instance.getCachedValue(queryName, this.props.forId, requestFields);
      // if we have a GET request and we are allowed to return from the wroker cache and we actually
      // found something in our cache, return that
      if (
        queryPrefix === PREFIX_GET &&
        returnWorkerCachedValuesForGetRequests &&
        workerCachedValue
      ) {
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
    if (queryPrefix === PREFIX_EDIT || queryPrefix === PREFIX_DELETE) {
      args.listener_uuid = this.props.remoteListener.getUUID();
    }

    // now we build the object query
    const objQuery: IGQLQueryObj = {
      name: queryName,
      args,
      fields: requestFields,
    };

    // it's either a query or a mutation, only GET and SEARCH are queries
    let query: GQLQuery;
    if (queryPrefix === PREFIX_GET || queryPrefix === PREFIX_SEARCH) {
      query = buildGqlQuery(objQuery);
    } else {
      query = buildGqlMutation(objQuery);
    }

    // now we get the gql value using the gql query function
    // and this function will always run using the network
    const gqlValue = await gqlQuery(query);

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

    // now let's get the returned value
    let value: any = null;
    // and the merged query fields for this value
    let mergedQueryFields: any = requestFields;
    // for first having a graphql value we need to check if
    // we actually have one, so we check all the way up to the
    // query name
    if (!error && gqlValue && gqlValue.data && gqlValue.data[queryName]) {
      // so this is the value that graphql gave
      value = gqlValue.data[queryName];
      // if we have a GET, EDIT or ADD, then we need to
      // set up the cache
      if (
        queryPrefix === PREFIX_GET ||
        queryPrefix === PREFIX_EDIT
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
            requestFields,
            appliedGQLValue.requestFields,
          );
        }
      }
    }

    // now that we have done all that we are going to cache our merged
    // results
    if (!error && CacheWorkerInstance.isSupported) {
      // in the case of delete, we just cache nulls also
      // the same applies in the case of get and a not found
      // was the output
      if (
        queryPrefix === PREFIX_DELETE ||
        (queryPrefix === PREFIX_GET && !value)
      ) {
        CacheWorkerInstance.instance.setCachedValue(PREFIX_GET + queryBase, this.props.forId, null, null);
      } else if (
        (
          queryPrefix === PREFIX_GET ||
          queryPrefix === PREFIX_EDIT ||
          queryPrefix === PREFIX_ADD
        ) &&
        value && mergedQueryFields
      ) {
        CacheWorkerInstance.instance.mergeCachedValue(PREFIX_GET + queryBase, value.id, value, mergedQueryFields);
      }
    }

    return {
      error,
      value,
      memoryCached: false,
      cached: false,
      getQueryFields: mergedQueryFields,
    };
  }
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
            // and using some yet again we check whether using the argumentsToCheckPropertiesAgainst
            // which is a gql object
            // which funnily will contain the same id in case it is there, it will tell us whether one
            // of the property actually is going to be modified and so our policy applies
            const oneOfApplyingPropertiesApplies = applyingPropertyIds
              .some((pid) => typeof argumentsToCheckPropertiesAgainst[pid] !== "undefined");
            // if it doesn't match anything, we return false, so technically this policy is valid, regardless on whether
            // the value itself is valid or not because it will not pass to the graphql query
            if (!oneOfApplyingPropertiesApplies) {
              // the attribute is not included isInvalid is false we ignore
              return false;
            }
          }
          // Here we are doing exactly the same as we did with applying property ids but this time
          // now we do it with the roles
          const applyingRoles = this.props.itemDefinitionInstance.getRolesForPolicy(policyType, policyName);
          const oneOfApplyingRolesApplies = applyingRoles.includes(this.props.tokenData.role);
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
    const emulatedError: GraphQLEndpointErrorType = {
      message: "Submit refused due to invalid information in form fields",
      code: "INVALID_DATA_SUBMIT_REFUSED",
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
      if (!this.state.poked) {
        this.setState({
          poked: true,
        });
      }
      return this.giveEmulatedInvalidError("deleteError", false, false);
    }

    this.setState({
      deleting: true,
    });

    const {
      error,
    } = await this.runQueryFor(
      PREFIX_DELETE,
      applyingPolicyArgs,
      {
        id: {},
      },
      false,
      false,
      null,
    );

    if (error) {
      this.setState({
        deleteError: error,
        deleting: false,
        deleted: false,
        poked: true,
      });
    } else {
      this.props.itemDefinitionInstance.cleanValueFor(this.props.forId);
      this.setState({
        deleteError: null,
        deleting: false,
        deleted: true,
        notFound: true,
        poked: true,
      });
      this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId);
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

    let isInvalid = this.checkItemDefinitionStateValidity(options);

    // if it's invalid let's return the emulated error
    if (isInvalid) {
      // if it's not poked already, let's poke it
      if (!this.state.poked) {
        this.setState({
          poked: true,
        });
      }
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
      onlyIncludeItems: this.props.optimize && this.props.optimize.onlyIncludeItems,
      onlyIncludeProperties: this.props.optimize && this.props.optimize.onlyIncludeProperties,
      onlyIncludeItemsForArgs: options.onlyIncludeItems,
      onlyIncludePropertiesForArgs: options.onlyIncludeProperties,
      onlyIncludeArgsIfDiffersFromAppliedValue: options.onlyIncludeIfDiffersFromAppliedValue,
      appliedOwner: this.props.assumeOwnership ? this.props.tokenData.id : null,
      userId: this.props.tokenData.id,
      userRole: this.props.tokenData.role,
      itemDefinitionInstance: this.props.itemDefinitionInstance,
      forId: this.props.forId,
    });

    // super hack in order to get the applying policy args
    let applyingPolicyArgs: any = {};
    let applyingPolicies: PolicyPathType[] = [];
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
      isInvalid = checkPoliciesResult.isInvalid;
      applyingPolicies = checkPoliciesResult.applyingPolicies;
    }

    // now checking the option for the before submit function, if it returns
    // false we cancel the submit request, we don't check policies yet
    if (options && options.beforeSubmit && !options.beforeSubmit(applyingPolicies)) {
      return null;
    }

    // if it's invalid we give the simulated error yet again
    if (isInvalid) {
      // if it's not poked already, let's poke it
      if (!this.state.poked) {
        this.setState({
          poked: true,
        });
      }
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
    } = await this.runQueryFor(
      !this.props.forId ? PREFIX_ADD : PREFIX_EDIT,
      {
        ...argumentsForQuery,
        ...applyingPolicyArgs,
      },
      requestFields,
      false,
      false,
      null,
    );

    let recievedId: number = null;
    if (error) {
      this.setState({
        submitError: error,
        submitting: false,
        submitted: false,
        poked: true,
      });
    } else if (value) {
      this.setState({
        submitError: null,
        submitting: false,
        submitted: true,
        poked: !options.unpokeAfterSuccess,
      });

      recievedId = value.id;
      this.props.itemDefinitionInstance.applyValue(
        recievedId,
        value,
        false,
        this.props.tokenData.id,
        this.props.tokenData.role,
        getQueryFields,
      );
      if (options.propertiesToCleanOnSuccess) {
        options.propertiesToCleanOnSuccess.forEach((ptc) => {
          this.props.itemDefinitionInstance
            .getPropertyDefinitionFor(ptc, true).cleanValueFor(this.props.forId);
        });
      }
      if (options.policiesToCleanOnSuccess) {
        options.policiesToCleanOnSuccess.forEach((policyArray) => {
          this.props.itemDefinitionInstance
            .getPropertyDefinitionForPolicy(...policyArray).cleanValueFor(this.props.forId);
        });
      }
      this.props.itemDefinitionInstance.triggerListeners("change", recievedId);
    }

    // happens during an error or whatnot
    return {
      id: recievedId,
      error,
    };
  }
  public async search(options?: IActionSearchOptions): Promise<IActionResponseWithSearchResults> {
    if (this.state.searching) {
      return null;
    }
    const isInvalid = this.checkItemDefinitionStateValidity();

    if (!this.state.poked) {
      this.setState({
        poked: true,
      });
    }

    // if it's invalid let's return the emulated error
    if (isInvalid) {
      return this.giveEmulatedInvalidError("searchError", false, true) as IActionResponseWithSearchResults;
    }

    this.setState({
      searching: true,
    });

    let onlyIncludePropertiesForArgs: string[] = null;
    if (options.onlyIncludeSearchPropertiesForProperties) {
      onlyIncludePropertiesForArgs = [];
      const standardIdef = this.props.itemDefinitionInstance.getStandardCounterpart();
      options.onlyIncludeSearchPropertiesForProperties.forEach((propertyId) => {
        const standardProperty = standardIdef.getPropertyDefinitionFor(propertyId, true);
        onlyIncludePropertiesForArgs = onlyIncludePropertiesForArgs.concat(getConversionIds(standardProperty.rawData));
      });
    }

    const {
      argumentsForQuery,
    } = getFieldsAndArgs({
      includeArgs: true,
      includeFields: false,
      onlyIncludeItemsForArgs: options.onlyIncludeItems,
      onlyIncludePropertiesForArgs,
      appliedOwner: this.props.assumeOwnership ? this.props.tokenData.id : null,
      userId: this.props.tokenData.id,
      userRole: this.props.tokenData.role,
      itemDefinitionInstance: this.props.itemDefinitionInstance,
      forId: this.props.forId,
    });

    const {
      value,
      error,
    } = await this.runQueryFor(
      PREFIX_SEARCH,
      argumentsForQuery,
      {
        ids: {
          id: {},
          idef_path: {},
          module_path: {},
          type: {},
        },
      },
      false,
      false,
      options.orderBy || "DEFAULT",
    );

    const searchResults: ISearchResult[] = [];
    if (error) {
      this.setState({
        searchError: error,
        searching: false,
        searchResults,
        poked: true,
      });
    } else {
      this.setState({
        searchError: null,
        searching: false,
        searchResults: value ? value.ids : [],
        poked: true,
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
  public dismissSearchResults() {
    this.setState({
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
        this.props.tokenData.id : this.props.itemDefinitionInstance.getAppliedValueOwnerIfAny(this.props.forId),
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
      this.props.tokenData.id,
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
        this.props.tokenData.id : this.props.itemDefinitionInstance.getAppliedValueOwnerIfAny(this.props.forId),
      {},
      false,
    );
  }
  public unpoke() {
    this.setState({
      poked: false,
    });
  }
  public render() {
    return (
      <ItemDefinitionContext.Provider
        value={{
          idef: this.props.itemDefinitionInstance,
          state: this.state.itemDefinitionState,
          onPropertyChange: this.onPropertyChange,
          onItemSetExclusionState: this.onItemSetExclusionState,
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
          poked: this.state.poked,
          submit: this.submit,
          reload: this.loadValue,
          delete: this.delete,
          search: this.search,
          forId: this.props.forId || null,
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
                            valueFor = data.mod.getItemDefinitionFor(props.itemDefinition.split("/"));
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
