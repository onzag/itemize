import React from "react";
import { LocaleContext, ILocaleContextType } from "../app";
import ItemDefinition, { IItemDefinitionStateType, ItemDefinitionIOActions } from "../../base/Root/Module/ItemDefinition";
import Module from "../../base/Root/Module";
import PropertyDefinition from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import Item, { ItemExclusionState } from "../../base/Root/Module/ItemDefinition/Item";
import { TokenContext, ITokenContextType } from "../app/internal-providers";
import {
  ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS,
  MODERATION_FIELDS,
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  PREFIX_GET,
  PREFIX_BUILD,
  STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  PREFIX_EDIT,
  PREFIX_ADD,
  PREFIX_DELETE,
  UNSPECIFIED_OWNER,
  PREFIX_SEARCH,
} from "../../constants";
import { buildGqlQuery, buildGqlMutation, gqlQuery, IGQLQueryObj,
  requestFieldsAreContained, deepMerge, GQLEnum, convertValueToFields } from "../app/gql-querier";
import { GraphQLEndpointErrorType } from "../../base/errors";
import equals from "deep-equal";
import { ModuleContext } from "./module";
import { getConversionIds } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/search-mode";
import CacheWorkerInstance from "../workers/cache";
import { RemoteListener } from "../app/remote-listener";

export interface IBasicActionResponse {
  error: GraphQLEndpointErrorType;
}

export interface IActionResponseWithId extends IBasicActionResponse {
  id: number;
}

export interface IActionResponseWithManyIds extends IBasicActionResponse {
  ids: number[];
}

type policyPathType = [string, string, string];

export interface IActionSubmitOptions {
  onlyIncludeProperties?: string[];
  onlyIncludeItems?: string[];
  unpokeAfterSuccess?: boolean;
  propertiesToCleanOnSuccess?: string[];
  policiesToCleanOnSuccess?: policyPathType[];
}

export interface IActionSearchOptions {
  onlyIncludeSearchPropertiesForProperties?: string[];
  onlyIncludeItems?: string[];
  unpokeAfterSuccess?: boolean;
}

export interface IItemDefinitionContextType {
  idef: ItemDefinition;
  state: IItemDefinitionStateType;
  forId: number;
  notFound: boolean;
  blocked: boolean;
  blockedButDataAccessible: boolean;
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
  searchResuls: number[];
  poked: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  reload: (denyCache?: boolean) => Promise<IBasicActionResponse>;
  submit: (options?: IActionSubmitOptions) => Promise<IActionResponseWithId>;
  delete: () => Promise<IBasicActionResponse>;
  search: () => Promise<IActionResponseWithManyIds>;
  onPropertyChange: (
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    internalValue: any,
  ) => void;
  onItemSetExclusionState: (
    item: Item,
    state: ItemExclusionState,
  ) => void;
  onPropertyEnforce: (
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    givenForId: number,
  ) => void;
  onPropertyClearEnforce: (
    property: PropertyDefinition,
    givenForId: number,
  ) => void;
  dismissLoadError: () => void;
  dismissSubmitError: () => void;
  dismissSubmitted: () => void;
  dismissDeleteError: () => void;
  dismissDeleted: () => void;
  dismissSearchError: () => void;
  dismissSearchResults: () => void;
  unpoke: () => void;
}

export interface IModuleContextType {
  mod: Module;
}

export const ItemDefinitionContext = React.createContext<IItemDefinitionContextType>(null);

interface IItemDefinitionProviderProps {
  children: any;
  itemDefinition?: string;
  forId?: number;
  assumeOwnership?: boolean;
  searchCounterpart?: boolean;
  disableExternalChecks?: boolean;
  optimize?: {
    // only downloads and includes the properties specified in the list
    // in the state
    onlyIncludeProperties?: string[],
    // only includes the items specified in the list in the state
    onlyIncludeItems?: string[],
    // excludes the policies from being part of the state
    excludePolicies?: boolean,
    // disables the listener that will trigger an update if other
    // elements that share its same id are triggered, this means that
    // two item definition providers of the same type and id don't communicate
    // anymore
    disableListener?: boolean,
    // prevents waiting for data to be gathered before loading the value
    // this can be detrimental in some cases, doesn't affect memory memoryCached values
    dontWaitForLoad?: boolean,
    // cleans the value from the memory cache once the object dismounts
    // as the memory cache might only grow and grow
    cleanOnDismount?: boolean,
  };
}

interface IActualItemDefinitionProviderProps extends IItemDefinitionProviderProps {
  tokenData: ITokenContextType;
  localeData: ILocaleContextType;
  itemDefinitionInstance: ItemDefinition;
  itemDefinitionQualifiedName: string;
  containsExternallyCheckedProperty: boolean;
  remoteListener: RemoteListener;
}

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
  searchResults: number[];
  poked: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
}

const ItemDefinitionProviderRequestsInProgressRegistry: {
  [qualifiedPathNameWithID: string]: {
    currentRequestedFields: any,
    registeredCallbacks: any[],
  };
} = {};
const ItemDefinitionProviderCleanUpsInProgressRegistry: {
  [qualifiedPathNameWithID: string]: boolean;
} = {};
function itemDefinitionProviderRequestsInProgressTimeout(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

class ActualItemDefinitionProvider extends
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
    if (
      props.itemDefinitionQualifiedName !== state.itemDefinitionState.itemDefQualifiedName ||
      (props.forId || null) !== (state.itemDefinitionState.forId || null)
    ) {
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

  private updateTimeout: NodeJS.Timer;
  private lastUpdateId: number;

  constructor(props: IActualItemDefinitionProviderProps) {
    super(props);

    this.onPropertyChange = this.onPropertyChange.bind(this);
    this.onItemSetExclusionState = this.onItemSetExclusionState.bind(this);
    this.loadValue = this.loadValue.bind(this);
    this.delete = this.delete.bind(this);
    this.changeListener = this.changeListener.bind(this);
    this.deleteListener = this.deleteListener.bind(this);
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

    this.state = this.setupInitialState();

    if (CacheWorkerInstance.isSupported) {
      CacheWorkerInstance.instance.setupVersion((window as any).BUILD_NUMBER);
    }
  }
  public setupInitialState(): IActualItemDefinitionProviderState {
    return {
      itemDefinitionState: this.props.itemDefinitionInstance.getStateNoExternalChecking(
        this.props.forId || null,
        !this.props.disableExternalChecks,
        this.props.optimize && this.props.optimize.onlyIncludeProperties,
        this.props.optimize && this.props.optimize.onlyIncludeItems,
        this.props.optimize && this.props.optimize.excludePolicies,
      ),
      isBlocked: false,
      isBlockedButDataIsAccessible: false,
      notFound: false,
      loadError: null,
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
  public setupListeners() {
    this.props.itemDefinitionInstance.addListener("change", this.props.forId || null, this.changeListener);
    if (this.props.forId) {
      this.props.itemDefinitionInstance.addListener("reload", this.props.forId, this.reloadListener);
      this.props.itemDefinitionInstance.addListener("delete", this.props.forId, this.deleteListener);
      this.props.remoteListener.addListenerFor(this.props.itemDefinitionInstance, this.props.forId);
    }
  }
  public unSetupListeners() {
    this.props.itemDefinitionInstance.removeListener("change", this.props.forId || null, this.changeListener);
    if (this.props.forId) {
      this.props.itemDefinitionInstance.removeListener("reload", this.props.forId, this.reloadListener);
      this.props.itemDefinitionInstance.removeListener("delete", this.props.forId, this.deleteListener);
      this.props.remoteListener.removeListenerFor(this.props.itemDefinitionInstance, this.props.forId);
    }
  }
  public shouldComponentUpdate(
    nextProps: IActualItemDefinitionProviderProps,
    nextState: IActualItemDefinitionProviderState,
  ) {
    const updatedIntoSomethingThatInvalidatesTheState =
      this.props.itemDefinitionInstance !== nextProps.itemDefinitionInstance;
    return updatedIntoSomethingThatInvalidatesTheState ||
      (nextProps.forId || null) !== (this.props.forId || null) ||
      !!nextProps.assumeOwnership !== !!this.props.assumeOwnership ||
      nextProps.children !== this.props.children ||
      nextProps.localeData !== this.props.localeData ||
      nextProps.tokenData !== this.props.tokenData ||
      nextProps.remoteListener !== this.props.remoteListener ||
      !equals(this.props.optimize, nextProps.optimize) ||
      !equals(this.state, nextState);
  }
  public async componentDidUpdate(
    prevProps: IActualItemDefinitionProviderProps,
  ) {
    const itemDefinitionWasUpdated = this.props.itemDefinitionInstance !== prevProps.itemDefinitionInstance;
    if (itemDefinitionWasUpdated) {
      prevProps.itemDefinitionInstance.removeListener("change", prevProps.forId || null, this.changeListener);
      if (prevProps.forId) {
        prevProps.itemDefinitionInstance.removeListener("reload", prevProps.forId, this.reloadListener);
        prevProps.itemDefinitionInstance.removeListener("delete", prevProps.forId, this.deleteListener);
        prevProps.remoteListener.removeListenerFor(prevProps.itemDefinitionInstance, prevProps.forId);
      }
    }

    if (
      (prevProps.forId || null) !== (this.props.forId || null) ||
      !equals(this.props.optimize, prevProps.optimize) ||
      itemDefinitionWasUpdated
    ) {
      prevProps.itemDefinitionInstance.removeListener("change", prevProps.forId || null, this.changeListener);
      if (prevProps.forId) {
        prevProps.itemDefinitionInstance.addListener("reload", prevProps.forId, this.reloadListener);
        prevProps.itemDefinitionInstance.addListener("delete", prevProps.forId, this.deleteListener);
        prevProps.remoteListener.removeListenerFor(prevProps.itemDefinitionInstance, prevProps.forId);
      }
      this.props.itemDefinitionInstance.addListener("change", this.props.forId || null, this.changeListener);
      if (this.props.forId) {
        this.props.itemDefinitionInstance.addListener("reload", this.props.forId, this.reloadListener);
        this.props.itemDefinitionInstance.addListener("delete", this.props.forId, this.deleteListener);
        this.props.remoteListener.addListenerFor(this.props.itemDefinitionInstance, this.props.forId);
      }
      // we set the value given we have changed the forId
      this.setState({
        itemDefinitionState: this.props.itemDefinitionInstance.getStateNoExternalChecking(
          this.props.forId || null,
          !this.props.disableExternalChecks,
          this.props.optimize && this.props.optimize.onlyIncludeProperties,
          this.props.optimize && this.props.optimize.onlyIncludeItems,
          this.props.optimize && this.props.optimize.excludePolicies,
        ),
      });
      if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
        this.setStateToCurrentValueWithExternalChecking(null);
      }
    }
    if (
      (prevProps.forId || null) !== (this.props.forId || null) ||
      prevProps.tokenData.id !== this.props.tokenData.id ||
      prevProps.tokenData.role !== this.props.tokenData.role ||
      prevProps.assumeOwnership !== this.props.assumeOwnership ||
      itemDefinitionWasUpdated
    ) {
      await this.loadValue();

      this.setState({
        canEdit: this.canEdit(),
        canDelete: this.canDelete(),
        canCreate: this.canCreate(),
      });
    }
  }
  public componentDidMount() {
    this.setupListeners();
    if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      this.setStateToCurrentValueWithExternalChecking(null);
    }
    this.loadValue();
  }
  public deleteListener() {
    const qualifiedPathNameWithID = this.props.itemDefinitionInstance.getQualifiedPathName() + "." + this.props.forId;
    if (!ItemDefinitionProviderCleanUpsInProgressRegistry[qualifiedPathNameWithID]) {
      ItemDefinitionProviderCleanUpsInProgressRegistry[qualifiedPathNameWithID] = true;
      if (CacheWorkerInstance.isSupported) {
        CacheWorkerInstance.instance.setCache(
          PREFIX_GET + this.props.itemDefinitionInstance.getQualifiedPathName(), this.props.forId, null);
      }
      this.props.itemDefinitionInstance.cleanValueFor(this.props.forId);
    }

    if (!this.state.notFound) {
      this.setState({
        notFound: true,
        itemDefinitionState: this.props.itemDefinitionInstance.getStateNoExternalChecking(
          this.props.forId || null,
          !this.props.disableExternalChecks,
          this.props.optimize && this.props.optimize.onlyIncludeProperties,
          this.props.optimize && this.props.optimize.onlyIncludeItems,
          this.props.optimize && this.props.optimize.excludePolicies,
        ),
      });
    }
  }
  public reloadListener() {
    console.log("RELOAD LISTENED");
    this.loadValue(true);
  }
  public changeListener() {
    if (this.props.optimize && this.props.optimize.disableListener) {
      return;
    }
    this.setState({
      itemDefinitionState: this.props.itemDefinitionInstance.getStateNoExternalChecking(
        this.props.forId || null,
        !this.props.disableExternalChecks,
        this.props.optimize && this.props.optimize.onlyIncludeProperties,
        this.props.optimize && this.props.optimize.onlyIncludeItems,
        this.props.optimize && this.props.optimize.excludePolicies,
      ),
      // yes items are clearly not loading if the listener finds itself
      // here, while yes
      loading: false,
    });
  }
  public getFieldsAndArgs(
    options: {
      includeArgs: boolean,
      includeFields: boolean,
      onlyIncludeProperties?: string[],
      onlyIncludeItems?: string[],
      onlyIncludePropertiesForArgs?: string[],
      onlyIncludeItemsForArgs?: string[],
      forThisItemDefinitionInstanceInstead?: ItemDefinition,
      forAnUnspecifiedOwner?: boolean,
    },
  ) {
    // so the requested fields, at base, it's just nothing
    const requestFields: any = {
      DATA: {},
    };
    // and these would be the arguments for the graphql query
    const argumentsForQuery: any = {};

    // now we go for the standard fields, and we add all of them
    STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((p) => {
      requestFields.DATA[p] = {};
    });
    // we add the external ones as well
    EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((p) => {
      requestFields[p] = {};
    });
    // and if our role allows it, we add the moderation fields
    if (ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.includes(this.props.tokenData.role)) {
      MODERATION_FIELDS.forEach((mf) => {
        requestFields.DATA[mf] = {};
      });
    }

    // we get the applied owner of this item, basically what we have loaded
    // for this user created_by or id if the item is marked as if its id
    // is the owner, in the case of null, the applied owner is -1
    const appliedOwner = options.forAnUnspecifiedOwner ?
      UNSPECIFIED_OWNER :
      (this.props.assumeOwnership ?
        this.props.tokenData.id :
        (options.forThisItemDefinitionInstanceInstead || this.props.itemDefinitionInstance)
          .getAppliedValueOwnerIfAny(
            this.props.forId || null,
          )
      );

    // Now we get all the property definitions and extensions for the item
    // you might wonder why we check role access one by one and not the total
    // well, we literally don't care, the developer is reponsible to deny this
    // to get here, we are just building a query, not preventing a submit
    (options.forThisItemDefinitionInstanceInstead || this.props.itemDefinitionInstance)
    .getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
      const shouldBeIncludedInFields = options.includeFields ? (
        options.onlyIncludeProperties ?
          options.onlyIncludeProperties.includes(pd.getId()) :
          (
            !pd.isRetrievalDisabled() && pd.checkRoleAccessFor(
              ItemDefinitionIOActions.READ,
              this.props.tokenData.role,
              this.props.tokenData.id,
              appliedOwner,
              false,
            )
          )
      ) : false;
      if (shouldBeIncludedInFields) {
        requestFields.DATA[pd.getId()] = {};

        const propertyDescription = pd.getPropertyDefinitionDescription();
        if (propertyDescription.gqlFields) {
          Object.keys(propertyDescription.gqlFields).forEach((field) => {
            requestFields.DATA[pd.getId()][field] = {};
          });
        }
      }

      const shouldBeIncludedInArgs = options.includeArgs ? (
        options.onlyIncludePropertiesForArgs ?
          options.onlyIncludePropertiesForArgs.includes(pd.getId()) :
          pd.checkRoleAccessFor(
            !this.props.forId ? ItemDefinitionIOActions.CREATE : ItemDefinitionIOActions.EDIT,
            this.props.tokenData.role,
            this.props.tokenData.id,
            appliedOwner,
            false,
          )
      ) : false;
      if (shouldBeIncludedInArgs) {
        argumentsForQuery[pd.getId()] = pd.getCurrentValue(this.props.forId || null);
      }
    });

    (options.forThisItemDefinitionInstanceInstead || this.props.itemDefinitionInstance)
    .getAllItems().forEach((item) => {
      requestFields.DATA[item.getQualifiedExclusionStateIdentifier()] = {};
      argumentsForQuery[item.getQualifiedExclusionStateIdentifier()] = item.getExclusionState(this.props.forId || null);

      const qualifiedId = item.getQualifiedIdentifier();
      requestFields.DATA[qualifiedId] = {};
      argumentsForQuery[qualifiedId] = {};

      const itemShouldBeIncludedInArgs = options.includeArgs ? (
        options.onlyIncludeItemsForArgs ?
          options.onlyIncludeItemsForArgs.includes(item.getId()) :
          true
      ) : false;

      const itemShouldBeIncludedInFields = options.includeFields ? (
        options.onlyIncludeItems ?
          options.onlyIncludeItems.includes(item.getId()) :
          true
      ) : false;

      if (!itemShouldBeIncludedInArgs && !itemShouldBeIncludedInFields) {
        return;
      }

      item.getSinkingProperties().forEach((sp) => {
        if (
          itemShouldBeIncludedInFields &&
          !sp.isRetrievalDisabled() &&
          sp.checkRoleAccessFor(
            ItemDefinitionIOActions.READ,
            this.props.tokenData.role,
            this.props.tokenData.id,
            appliedOwner,
            false,
          )
        ) {
          requestFields.DATA[qualifiedId][item.getPrefixedQualifiedIdentifier() + sp.getId()] = {};

          const propertyDescription = sp.getPropertyDefinitionDescription();
          if (propertyDescription.gqlFields) {
            Object.keys(propertyDescription.gqlFields).forEach((field) => {
              requestFields.DATA[qualifiedId][item.getPrefixedQualifiedIdentifier() + sp.getId()][field] = {};
            });
          }
        }

        if (
          itemShouldBeIncludedInArgs &&
          sp.checkRoleAccessFor(
            !this.props.forId ? ItemDefinitionIOActions.CREATE : ItemDefinitionIOActions.EDIT,
            this.props.tokenData.role,
            this.props.tokenData.id,
            appliedOwner,
            false,
          )
        ) {
          argumentsForQuery[qualifiedId][sp.getId()] = sp.getCurrentValue(this.props.forId || null);
        }
      });

      if (Object.keys(requestFields.DATA[qualifiedId]).length === 0) {
        delete requestFields.DATA[qualifiedId];
      }
      if (Object.keys(argumentsForQuery[qualifiedId]).length === 0) {
        delete argumentsForQuery[qualifiedId];
      }
    });

    return {requestFields, argumentsForQuery};
  }
  public async loadValue(denyCache?: boolean): Promise<IBasicActionResponse> {
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
    const { requestFields } = this.getFieldsAndArgs({
      includeArgs: false,
      includeFields: true,
      onlyIncludeItems: this.props.optimize && this.props.optimize.onlyIncludeItems,
      onlyIncludeProperties: this.props.optimize && this.props.optimize.onlyIncludeProperties,
    });

    if (!denyCache) {
      // Prevent loading at all if value currently available and memoryCached
      const appliedGQLValue = this.props.itemDefinitionInstance.getGQLAppliedValue(this.props.forId);
      if (
        appliedGQLValue &&
        requestFieldsAreContained(requestFields, appliedGQLValue.requestFields)
      ) {
        return {
          error: null,
        };
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

    if (this.props.optimize && this.props.optimize.dontWaitForLoad) {
      return await this.loadValueWaiter(
        requestFields,
        denyCache,
      );
    }

    // this is why we have a registry
    // we build the qualified path name with the id so as to be
    // an unique identifier for this id
    const qualifiedPathNameWithID = PREFIX_BUILD(
      this.props.itemDefinitionInstance.getQualifiedPathName(),
    ) + "." + this.props.forId;

    // if we have gotten already it there, it means some other instance is already
    // executing to load the value for this same object and same id which means
    // it's waiting and we have a time of grace for this to add what we want to
    // that request as well
    if (ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID]) {
      // we add our fields to what we expect to this waiter
      ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID].currentRequestedFields =
        deepMerge(
          ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID].currentRequestedFields,
          requestFields,
        );
      // and return this promise that will inform us by adding the resolve to the registry
      return new Promise((resolve) => {
        ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID].registeredCallbacks.push(resolve);
      });
    }

    // if that's not the case, horray, we are the first ones to request this value
    // we make our object, these are the fields we will be requesting, and these
    // are the callbacks, empty to start
    ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID] = {
      currentRequestedFields: requestFields,
      registeredCallbacks: [],
    };

    // now we wait a little bit
    await itemDefinitionProviderRequestsInProgressTimeout(70);

    // now we get what we are expected to get, some other instances might
    // have added to this request
    const requestFieldsToGet =
      ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID].currentRequestedFields;
    // we extract the resolvers as well
    const resolversToTrigger =
      ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID].registeredCallbacks;
    // and now delete it, we aren't waiting anymore, it's time to execute
    delete ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID];

    // so we load the value
    const value = await this.loadValueWaiter(
      requestFieldsToGet,
      denyCache,
    );

    // run all the resolvers that were expecting callback with the value
    resolversToTrigger.forEach((r) => r(value));

    // and return such value ourselves
    return value;
  }

  public async loadValueWaiter(requestFields: any, denyCache?: boolean): Promise<IBasicActionResponse> {
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
    );

    // this should never happen honestly as we are giving
    // a false flag for return memoryCached value for get requests
    // but we leave it here just in case, memoryCached means the object
    // is already in memory in the state and already populated because react uses
    // that state
    if (memoryCached) {
      return {
        error: null,
      };
    }

    if (cached) {
      this.props.remoteListener.requestFeedbackFor(this.props.itemDefinitionInstance, this.props.forId);
    }

    // so if we get an error we give it
    if (error) {
      this.setState({
        loadError: error,
        isBlocked: false,
        isBlockedButDataIsAccessible: false,
        notFound: false,
      });
    } else if (!value) {
      this.setState({
        loadError: null,
        notFound: true,
        isBlocked: false,
        isBlockedButDataIsAccessible: false,
      });
    } else if (value) {
      this.setState({
        loadError: null,
        notFound: false,
        isBlocked: !!value.blocked_at,
        isBlockedButDataIsAccessible: value.blocked_at ? !!value.DATA : false,
      });

      this.props.itemDefinitionInstance.applyValue(
        this.props.forId || null,
        value,
        false,
        this.props.tokenData.id,
        this.props.tokenData.role,
        getQueryFields,
      );
      this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId || null);
      if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
        this.setStateToCurrentValueWithExternalChecking(null);
      }
    }

    return {
      error,
    };
  }
  public async setStateToCurrentValueWithExternalChecking(currentUpdateId: number) {
    const newItemDefinitionState = await this.props.itemDefinitionInstance.getState(
      this.props.forId || null,
      this.props.optimize && this.props.optimize.onlyIncludeProperties,
      this.props.optimize && this.props.optimize.onlyIncludeItems,
      this.props.optimize && this.props.optimize.excludePolicies,
    );
    if (currentUpdateId === null || this.lastUpdateId === currentUpdateId) {
      this.setState({
        itemDefinitionState: newItemDefinitionState,
      });
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

    const currentUpdateId = (new Date()).getTime();
    this.lastUpdateId = currentUpdateId;

    property.setCurrentValue(this.props.forId || null, value, internalValue);
    this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId || null);

    if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(
        this.setStateToCurrentValueWithExternalChecking.bind(this, currentUpdateId),
        300,
      );
    }
  }
  public onPropertyEnforce(
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    givenForId: number,
  ) {
    property.setSuperEnforced(givenForId || null, value);
    this.props.itemDefinitionInstance.triggerListeners("change", givenForId || null);
  }
  public onPropertyClearEnforce(
    property: PropertyDefinition,
    givenForId: number,
  ) {
    property.clearSuperEnforced(givenForId || null);
    this.props.itemDefinitionInstance.triggerListeners("change", givenForId || null);
  }
  public componentWillUnmount() {
    if (this.props.optimize && this.props.optimize.cleanOnDismount) {
      this.props.itemDefinitionInstance.cleanValueFor(this.props.forId || null);
      this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId || null);
    }
    this.unSetupListeners();
  }
  public onItemSetExclusionState(item: Item, state: ItemExclusionState) {
    const currentUpdateId = (new Date()).getTime();
    this.lastUpdateId = currentUpdateId;

    item.setExclusionState(this.props.forId || null, state);
    this.props.itemDefinitionInstance.triggerListeners("change", this.props.forId || null);

    if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(
        this.setStateToCurrentValueWithExternalChecking.bind(this, currentUpdateId),
        300,
      );
    }
  }
  public checkItemDefinitionStateValidity(
    options?: {
      onlyIncludeProperties?: string[],
      onlyIncludeItems?: string[],
    },
  ): boolean {
    // let's make this variable to check on whether things are invalid or not
    // first we check every property, that is included and allowed we use some
    // and return whether it's invalid
    let isInvalid = this.state.itemDefinitionState.properties.some((p) => {
      // we return false if we have an only included properties and our property is in there
      // because that means that whether it is valid or not is irrelevant for our query
      if (options && options.onlyIncludeProperties && !options.onlyIncludeProperties.includes(p.propertyId)) {
        return false;
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
          return !p.valid;
        });
      });
    }

    return isInvalid;
  }
  public async runQueryFor(
    queryPrefix: string,
    baseArgs: any,
    requestFields: any,
    returnMemoryCachedValuesForGetRequests: boolean,
    returnWorkerCachedValuesForGetRequests: boolean,
  ): Promise<{
    error: GraphQLEndpointErrorType,
    value: any,
    memoryCached: boolean,
    cached: boolean,
    getQueryFields: any,
  }> {
    const queryBase = (this.props.itemDefinitionInstance.isExtensionsInstance() ?
      this.props.itemDefinitionInstance.getParentModule().getQualifiedPathName() :
      this.props.itemDefinitionInstance.getQualifiedPathName());
    const queryName = queryPrefix + queryBase;
    const args = {
      token: this.props.tokenData.token,
      language: this.props.localeData.language.split("-")[0],
      ...baseArgs,
    };
    if (this.props.forId) {
      args.id = this.props.forId;
    }
    if (queryPrefix === PREFIX_SEARCH) {
      args.order_by = new GQLEnum("DEFAULT");
    }

    const appliedGQLValue = this.props.itemDefinitionInstance.getGQLAppliedValue(this.props.forId || null);
    if (queryPrefix === PREFIX_GET && returnMemoryCachedValuesForGetRequests) {
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

    let workerCachedValue: any = null;
    if (
      (
        queryPrefix === PREFIX_GET ||
        queryPrefix === PREFIX_EDIT
      ) &&
      this.props.forId
    ) {
      workerCachedValue =
        await CacheWorkerInstance.instance.getCachedValue(queryName, this.props.forId, requestFields);
      if (queryPrefix === PREFIX_GET && returnWorkerCachedValuesForGetRequests && workerCachedValue) {
        return {
          error: null,
          value: workerCachedValue.value,
          memoryCached: false,
          cached: true,
          getQueryFields: workerCachedValue.value ? convertValueToFields(workerCachedValue.value) : null,
        };
      }
    }
    if (queryPrefix === PREFIX_EDIT || queryPrefix === PREFIX_DELETE) {
      args.listener_uuid = this.props.remoteListener.getUUID();
    }

    const objQuery: IGQLQueryObj = {
      name: queryName,
      args,
      fields: requestFields,
    };

    let query: string;
    if (queryPrefix === PREFIX_GET || queryPrefix === PREFIX_SEARCH) {
      query = buildGqlQuery(objQuery);
    } else {
      query = buildGqlMutation(objQuery);
    }

    const gqlValue = await gqlQuery(query);

    let error: GraphQLEndpointErrorType = null;
    if (!gqlValue) {
      error = {
        message: "Failed to connect",
        code: "CANT_CONNECT",
      };
    } else if (gqlValue.errors) {
      error = gqlValue.errors[0].extensions;
    }

    let value: any = null;
    let mergedQueryFields: any = null;
    if (gqlValue && gqlValue.data && gqlValue.data[queryName]) {
      value = gqlValue.data[queryName];
      if (
        queryPrefix === PREFIX_GET ||
        queryPrefix === PREFIX_EDIT ||
        queryPrefix === PREFIX_ADD
      ) {
        if (appliedGQLValue && appliedGQLValue.rawValue) {
          if (workerCachedValue && workerCachedValue.value) {
            value = deepMerge(
              value,
              deepMerge(
                appliedGQLValue.rawValue,
                workerCachedValue.value,
              ),
            );
            mergedQueryFields = deepMerge(
              requestFields,
              deepMerge(
                appliedGQLValue.requestFields,
                convertValueToFields(workerCachedValue.value),
              ),
            );
          } else {
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
    }

    if (!error && CacheWorkerInstance.isSupported) {
      if (queryPrefix === PREFIX_DELETE) {
        CacheWorkerInstance.instance.setCache(PREFIX_GET + queryBase, this.props.forId, null);
      } else if (
        queryPrefix === PREFIX_GET ||
        queryPrefix === PREFIX_EDIT ||
        queryPrefix === PREFIX_ADD
      ) {
        CacheWorkerInstance.instance.setCache(PREFIX_GET + queryBase, this.props.forId, value);
      }
    }

    return {
      error,
      value,
      memoryCached: false,
      cached: false,
      getQueryFields: mergedQueryFields || requestFields,
    };
  }
  public checkPoliciesAndGetArgs(policyType: string, argumentsToCheckPropertiesAgainst?: any): [boolean, any] {
    const applyingPolicyArgs: any = {};
    return [
      Object.keys(this.state.itemDefinitionState.policies[policyType]).some((policyName) => {
        // and for that we check using some again every property that is applied in the policy
        return this.state.itemDefinitionState.policies[policyType][policyName].some((propertyStateInPolicy) => {
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
              return false;
            }
          }
          // Here we are doing exactly the same as we did with applying property ids but this time
          // now we do it with the roles
          const applyingRoles = this.props.itemDefinitionInstance.getRolesForPolicy(policyType, policyName);
          const oneOfApplyingRolesApplies = applyingRoles.includes(this.props.tokenData.role);
          if (!oneOfApplyingRolesApplies) {
            return false;
          }
          // otherwise if we find that it is not valid
          if (!propertyStateInPolicy.valid) {
            // then we return true, indicating the algorithm to terminate all its execution in this policy
            // madness and just make isInvalid true and give the emulated invalid error
            return true;
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
          // and we return false to indicate success of a valid property value
          return false;
        });
      }),
      applyingPolicyArgs,
    ];
  }
  public giveEmulatedInvalidError(
    stateApplied: string,
    withId: boolean,
    withIds: boolean,
  ): IActionResponseWithId | IBasicActionResponse | IActionResponseWithManyIds {
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
        ids: [],
        error: emulatedError,
      };
    } else {
      return {
        error: emulatedError,
      };
    }
  }
  public async delete(): Promise<IBasicActionResponse> {
    if (this.state.deleting || this.props.forId === null) {
      return null;
    }

    const [isInvalid, applyingPolicyArgs] = this.checkPoliciesAndGetArgs(
      "delete",
    );

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
    } = this.getFieldsAndArgs({
      includeArgs: true,
      includeFields: true,
      onlyIncludeItems: this.props.optimize && this.props.optimize.onlyIncludeItems,
      onlyIncludeProperties: this.props.optimize && this.props.optimize.onlyIncludeProperties,
      onlyIncludeItemsForArgs: options.onlyIncludeItems,
      onlyIncludePropertiesForArgs: options.onlyIncludeProperties,
    });

    // super hack in order to get the applying policy args
    let applyingPolicyArgs: any = {};
    // first we only need to run this if it's not invalid, otherwise the values
    // are never really used for the policy state, also this is only useful for
    // edits
    if (this.props.forId && this.state.itemDefinitionState.policies.edit) {
      // now we set the variable by checking all the policies in the state using some
      // we check every policyName included in edit
      [isInvalid, applyingPolicyArgs] = this.checkPoliciesAndGetArgs(
        "edit",
        argumentsForQuery,
      );
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
  public async search(options?: IActionSearchOptions): Promise<IActionResponseWithManyIds> {
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
      return this.giveEmulatedInvalidError("searchError", false, true) as IActionResponseWithManyIds;
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
    } = this.getFieldsAndArgs({
      includeArgs: true,
      includeFields: false,
      onlyIncludeItemsForArgs: options.onlyIncludeItems,
      onlyIncludePropertiesForArgs,
    });

    const {
      value,
      error,
    } = await this.runQueryFor(
      PREFIX_SEARCH,
      argumentsForQuery,
      {
        ids: {},
      },
      false,
      false,
    );

    const searchResults: number[] = [];
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
      ids: [],
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
          searchResuls: this.state.searchResults,
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
                    (data) => {
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
                          {...props}
                        />
                      );
                    }
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
