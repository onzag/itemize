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
} from "../../constants";
import { buildGqlQuery, buildGqlMutation, gqlQuery } from "../app/gql-querier";
import { GraphQLEndpointErrorType } from "../../base/errors";
import equals from "deep-equal";
import { ModuleContext } from "./module";

export interface IBasicActionResponse {
  error: GraphQLEndpointErrorType;
}

export interface IActionResponseWithId extends IBasicActionResponse {
  id: number;
}

type policyPathType = [string, string, string];

export interface IActionSubmitOptions {
  onlyIncludeProperties?: string[];
  onlyIncludeItems?: string[];
  unpokeAfterSuccess?: boolean;
  propertiesToCleanOnSuccess?: string[];
  policiesToCleanOnSuccess?: policyPathType[];
}

export interface IItemDefinitionContextType {
  idef: ItemDefinition;
  state: IItemDefinitionStateType;
  forId: number;
  notFound: boolean;
  blocked: boolean;
  blockedButDataAccessible: boolean;
  loadError: GraphQLEndpointErrorType;
  submitError: GraphQLEndpointErrorType;
  submitting: boolean;
  submitted: boolean;
  deleteError: GraphQLEndpointErrorType;
  deleting: boolean;
  deleted: boolean;
  poked: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  reload: () => Promise<IBasicActionResponse>;
  submit: (options?: IActionSubmitOptions) => Promise<IActionResponseWithId>;
  delete: () => Promise<IBasicActionResponse>;
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
    onlyIncludeProperties?: string[],
    onlyIncludeItems?: string[],
    excludePolicies?: boolean,
    disableListener?: boolean,
  };
}

interface IActualItemDefinitionProviderProps extends IItemDefinitionProviderProps {
  tokenData: ITokenContextType;
  localeData: ILocaleContextType;
  itemDefinitionInstance: ItemDefinition;
  itemDefinitionQualifiedName: string;
  containsExternallyCheckedProperty: boolean;
}

interface IActualItemDefinitionProviderState {
  itemDefinitionState: IItemDefinitionStateType;
  isBlocked: boolean;
  isBlockedButDataIsAccessible: boolean;
  notFound: boolean;
  loadError: GraphQLEndpointErrorType;
  submitError: GraphQLEndpointErrorType;
  submitting: boolean;
  submitted: boolean;
  deleteError: GraphQLEndpointErrorType;
  deleting: boolean;
  deleted: boolean;
  poked: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
}

function flattenRecievedFields(recievedFields: any) {
  // so first we extract the data content
  const output = {
    ...(recievedFields.DATA || {}),
  };
  // and then we loop for everything else, but data
  Object.keys(recievedFields).forEach((key) => {
    if (key !== "DATA") {
      output[key] = recievedFields[key];
    }
  });
  // return that
  return output;
}

const ItemDefinitionProviderRequestsInProgressRegistry: {
  [qualifiedPathNameWithID: string]: {
    wasOwnershipAssumed: boolean,
  };
} = {};

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
    this.listener = this.listener.bind(this);
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

    this.state = this.setupInitialState();
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
      submitError:  null,
      submitting: false,
      submitted: false,
      deleteError:  null,
      deleting: false,
      deleted: false,
      poked: false,

      canEdit: this.canEdit(),
      canDelete: this.canDelete(),
      canCreate: this.canCreate(),
    };
  }
  public setupListeners() {
    this.props.itemDefinitionInstance.addListener(this.props.forId || null, this.listener);
  }
  public unSetupListeners() {
    this.props.itemDefinitionInstance.removeListener(this.props.forId || null, this.listener);
  }
  public shouldComponentUpdate(
    nextProps: IActualItemDefinitionProviderProps,
    nextState: IActualItemDefinitionProviderState,
  ) {
    const updatedIntoSomethingThatInvalidatesTheState =
      this.props.itemDefinitionInstance !== nextProps.itemDefinitionInstance;
    return updatedIntoSomethingThatInvalidatesTheState ||
      (nextProps.forId || null) !== (this.props.forId || null) ||
      !!nextProps.assumeOwnership !== !!this.props.assumeOwnership ||
      nextProps.children !== this.props.children ||
      nextProps.localeData !== this.props.localeData ||
      nextProps.tokenData !== this.props.tokenData ||
      !equals(this.props.optimize, nextProps.optimize) ||
      !equals(this.state, nextState);
  }
  public async componentDidUpdate(
    prevProps: IActualItemDefinitionProviderProps,
  ) {
    const itemDefinitionWasUpdated = this.props.itemDefinitionInstance !== prevProps.itemDefinitionInstance;
    if (itemDefinitionWasUpdated) {
      prevProps.itemDefinitionInstance.removeListener(prevProps.forId || null, this.listener);
    }

    if (
      (prevProps.forId || null) !== (this.props.forId || null) ||
      !equals(this.props.optimize, prevProps.optimize) ||
      itemDefinitionWasUpdated
    ) {
      prevProps.itemDefinitionInstance.removeListener(prevProps.forId || null, this.listener);
      this.props.itemDefinitionInstance.addListener(this.props.forId || null, this.listener);
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
  public listener() {
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
    });
  }
  public async loadValue(): Promise<IBasicActionResponse> {
    if (!this.props.forId) {
      return;
    }

    const qualifiedPathNameWithID = PREFIX_BUILD(
      this.props.itemDefinitionInstance.getQualifiedPathName(),
    ) + this.props.forId;
    if (ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID]) {
      if (
        !!ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID].wasOwnershipAssumed !==
        !!this.props.assumeOwnership
      ) {
        // TODO maybe do something about this in order to allow this behaviour as it will for istance matter
        // where a query request is contained in another query request eg kitten {pawNumber, hairCount} and
        // another query where kitten {pawNumber, hairCount, friends} the first is contained within the second
        // so we could totally reuse the gqlAppliedValue rather than re-requesting due to differences?... maybe
        // on the other hand this deletes data that might have been leaked when you log out and things reload
        // with new credentials, as that old data, remains in the cache
        console.warn(
          "Two simultaneous requests in item definition " + this.props.itemDefinition + " for id " + this.props.forId +
          " have been launched and the ownership assumption does not match, this is a no-op, and would cause a race" +
          " where only the first request can be fullfilled and cached, fix the issue ASAP",
        );
      }
      return;
    }
    ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID] = {
      wasOwnershipAssumed: this.props.assumeOwnership,
    };

    const requestFields: any = {
      DATA: {},
    };
    STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((p) => {
      requestFields.DATA[p] = {};
    });
    EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES.forEach((p) => {
      requestFields[p] = {};
    });
    if (ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS.includes(this.props.tokenData.role)) {
      MODERATION_FIELDS.forEach((mf) => {
        requestFields.DATA[mf] = {};
      });
    }
    this.props.itemDefinitionInstance.getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
      if (pd.isRetrievalDisabled()) {
        return;
      }
      if (
        pd.checkRoleAccessFor(
          ItemDefinitionIOActions.READ,
          this.props.tokenData.role,
          this.props.tokenData.id,
          this.props.assumeOwnership ? this.props.tokenData.id :
            this.props.itemDefinitionInstance.getAppliedValueOwnerIfAny(
              this.props.forId || null,
            ),
          false,
        )
      ) {
        requestFields.DATA[pd.getId()] = {};

        const propertyDescription = pd.getPropertyDefinitionDescription();
        if (propertyDescription.gqlFields) {
          Object.keys(propertyDescription.gqlFields).forEach((field) => {
            requestFields.DATA[pd.getId()][field] = {};
          });
        }
      }
    });
    this.props.itemDefinitionInstance.getAllItems().forEach((item) => {
      requestFields.DATA[item.getQualifiedExclusionStateIdentifier()] = {};

      const qualifiedId = item.getQualifiedIdentifier();
      requestFields.DATA[qualifiedId] = {};

      item.getSinkingProperties().forEach((sp) => {
        if (sp.isRetrievalDisabled()) {
          return;
        }
        if (
          sp.checkRoleAccessFor(
            ItemDefinitionIOActions.READ,
            this.props.tokenData.role,
            this.props.tokenData.id,
            this.props.assumeOwnership ? this.props.tokenData.id :
              this.props.itemDefinitionInstance.getAppliedValueOwnerIfAny(
                this.props.forId || null,
              ),
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
      });

      if (Object.keys(requestFields.DATA[qualifiedId]).length === 0) {
        delete requestFields.DATA[qualifiedId];
      }
    });

    if (Object.keys(requestFields.DATA).length === 0) {
      delete requestFields.DATA;
    }

    const queryName = PREFIX_GET + this.props.itemDefinitionInstance.getQualifiedPathName();
    const query = buildGqlQuery({
      name: queryName,
      args: {
        id: this.props.forId,
        token: this.props.tokenData.token,
        language: this.props.localeData.language.split("-")[0],
      },
      fields: requestFields,
    });
    const appliedGQLValue = this.props.itemDefinitionInstance.getGQLAppliedValue(this.props.forId || null);
    if (appliedGQLValue && appliedGQLValue.query === query) {
      delete ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID];
      return;
    }
    const gqlValue = await gqlQuery(query);

    let error: GraphQLEndpointErrorType = null;
    if (!gqlValue) {
      error = {
        message: "Failed to connect",
        code: "CANT_CONNECT",
      };
      this.setState({
        loadError: error,
        isBlocked: false,
        isBlockedButDataIsAccessible: false,
        notFound: false,
      });
    } else {
      if (gqlValue.errors) {
        error = gqlValue.errors[0].extensions;
        this.setState({
          loadError: error,
        });
      } else {
        this.setState({
          loadError: null,
        });
      }

      if (gqlValue.data) {
        if (!gqlValue.data[queryName]) {
          this.setState({
            notFound: true,
            isBlocked: false,
            isBlockedButDataIsAccessible: false,
          });
        } else {
          if (gqlValue.data[queryName].blocked_at) {
            this.setState({
              notFound: false,
              isBlocked: true,
              isBlockedButDataIsAccessible: !!gqlValue.data[queryName].DATA,
            });
          } else {
            this.setState({
              isBlocked: false,
              notFound: false,
              isBlockedButDataIsAccessible: false,
            });
          }

          const recievedFields = flattenRecievedFields(gqlValue.data[queryName]);
          this.props.itemDefinitionInstance.applyValue(
            this.props.forId || null,
            recievedFields,
            false,
            this.props.tokenData.id,
            this.props.tokenData.role,
            query,
          );
          this.props.itemDefinitionInstance.triggerListeners(this.props.forId || null);
          if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
            this.setStateToCurrentValueWithExternalChecking(null);
          }
        }
      } else {
        this.setState({
          isBlocked: false,
          notFound: false,
          isBlockedButDataIsAccessible: false,
        });
      }
    }

    delete ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID];

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
      this.props.itemDefinitionInstance.triggerListeners(this.props.forId || null, this.listener);
    }
  }
  public onPropertyChange(
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    internalValue: any,
  ) {
    const currentUpdateId = (new Date()).getTime();
    this.lastUpdateId = currentUpdateId;

    property.setCurrentValue(this.props.forId || null, value, internalValue);
    this.props.itemDefinitionInstance.triggerListeners(this.props.forId || null);

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
    this.props.itemDefinitionInstance.triggerListeners(givenForId || null);
  }
  public onPropertyClearEnforce(
    property: PropertyDefinition,
    givenForId: number,
  ) {
    property.clearSuperEnforced(givenForId || null);
    this.props.itemDefinitionInstance.triggerListeners(givenForId || null);
  }
  public componentWillUnmount() {
    this.unSetupListeners();
  }
  public onItemSetExclusionState(item: Item, state: ItemExclusionState) {
    const currentUpdateId = (new Date()).getTime();
    this.lastUpdateId = currentUpdateId;

    item.setExclusionState(this.props.forId || null, state);
    this.props.itemDefinitionInstance.triggerListeners(this.props.forId || null);

    if (this.props.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(
        this.setStateToCurrentValueWithExternalChecking.bind(this, currentUpdateId),
        300,
      );
    }
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
  public giveEmulatedInvalidError(stateApplied: string, withId: boolean): IActionResponseWithId | IBasicActionResponse {
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
    } else {
      return {
        error: emulatedError,
      };
    }
  }
  public async delete(): Promise<IBasicActionResponse> {
    if (this.state.deleting || this.props.forId === null) {
      return;
    }

    // if it's not poked already, let's poke it
    if (!this.state.poked) {
      this.setState({
        poked: true,
      });
    }

    const requestFields: any = {
      id: {},
    };

    const [isInvalid, applyingPolicyArgs] = this.checkPoliciesAndGetArgs(
      "delete",
    );

    if (isInvalid) {
      return this.giveEmulatedInvalidError("deleteError", false);
    }

    this.setState({
      deleting: true,
    });

    const queryName = PREFIX_DELETE +
      this.props.itemDefinitionInstance.getQualifiedPathName();
    const args = {
      id: this.props.forId,
      token: this.props.tokenData.token,
      language: this.props.localeData.language.split("-")[0],
      ...applyingPolicyArgs,
    };
    const query = buildGqlMutation({
      name: queryName,
      args,
      fields: requestFields,
    });
    const gqlValue = await gqlQuery(query);

    let error: GraphQLEndpointErrorType = null;
    if (!gqlValue) {
      error = {
        message: "Failed to connect",
        code: "CANT_CONNECT",
      };
      this.setState({
        deleteError: error,
        deleting: false,
        deleted: false,
      });
    } else if (gqlValue.errors) {
      error = gqlValue.errors[0].extensions;
      this.setState({
        deleteError: error,
        deleting: false,
        deleted: false,
      });
    } else {
      this.props.itemDefinitionInstance.cleanValueFor(this.props.forId);
      this.setState({
        deleteError: null,
        deleting: false,
        deleted: true,
        notFound: true,
      });
      this.props.itemDefinitionInstance.triggerListeners(this.props.forId);
    }

    return {
      error,
    };
  }
  public async submit(options: IActionSubmitOptions = {}): Promise<IActionResponseWithId> {
    // if we are already submitting, we reject the action
    if (this.state.submitting) {
      return;
    }

    // let's make this variable to check on whether things are invalid or not
    // first we check every property, that is included and allowed we use some
    // and return whether it's invalid
    let isInvalid = this.state.itemDefinitionState.properties.some((p) => {
      // we return false if we have an only included properties and our property is in there
      // because that means that whether it is valid or not is irrelevant for our query
      if (options.onlyIncludeProperties && !options.onlyIncludeProperties.includes(p.propertyId)) {
        return false;
      }
      return !p.valid;
    });

    // now we check the next only is it's not already invalid
    if (!isInvalid) {
      // and we do this time the same but with the items
      isInvalid = this.state.itemDefinitionState.items.some((i) => {
        // same using the variable for only include items, same check as before
        if (options.onlyIncludeItems && !options.onlyIncludeItems.includes(i.itemId)) {
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

    // if it's invalid let's return the emulated error
    if (isInvalid) {
      // if it's not poked already, let's poke it
      if (!this.state.poked) {
        this.setState({
          poked: true,
        });
      }
      return this.giveEmulatedInvalidError("submitError", true) as IActionResponseWithId;
    }

    // now we are going to build our query
    // also we make a check later on for the policies
    // if necessary

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
    const appliedOwner = this.props.itemDefinitionInstance.getAppliedValueOwnerIfAny(
      this.props.forId || null,
    );

    // Now we get all the property definitions and extensions for the item
    // you might wonder why we check role access one by one and not the total
    // well, we literally don't care, the developer is reponsible to deny this
    // to get here, we are just building a query, not preventing a submit
    this.props.itemDefinitionInstance.getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
      if (
        !pd.isRetrievalDisabled() &&
        pd.checkRoleAccessFor(
          ItemDefinitionIOActions.READ,
          this.props.tokenData.role,
          this.props.tokenData.id,
          this.props.assumeOwnership ? this.props.tokenData.id :
            this.props.itemDefinitionInstance.getAppliedValueOwnerIfAny(
              this.props.forId || null,
            ),
          false,
        )
      ) {
        requestFields.DATA[pd.getId()] = {};

        const propertyDescription = pd.getPropertyDefinitionDescription();
        if (propertyDescription.gqlFields) {
          Object.keys(propertyDescription.gqlFields).forEach((field) => {
            requestFields.DATA[pd.getId()][field] = {};
          });
        }
      }

      const shouldBeIncludedInQuery = options.onlyIncludeProperties ?
        options.onlyIncludeProperties.includes(pd.getId()) :
        pd.checkRoleAccessFor(
          !this.props.forId ? ItemDefinitionIOActions.CREATE : ItemDefinitionIOActions.EDIT,
          this.props.tokenData.role,
          this.props.tokenData.id,
          this.props.assumeOwnership ? this.props.tokenData.id : appliedOwner,
          false,
        );
      if (shouldBeIncludedInQuery) {
        argumentsForQuery[pd.getId()] = pd.getCurrentValue(this.props.forId || null);
      }
    });

    this.props.itemDefinitionInstance.getAllItems().forEach((item) => {
      requestFields.DATA[item.getQualifiedExclusionStateIdentifier()] = {};
      argumentsForQuery[item.getQualifiedExclusionStateIdentifier()] = item.getExclusionState(this.props.forId || null);

      const qualifiedId = item.getQualifiedIdentifier();
      requestFields.DATA[qualifiedId] = {};
      argumentsForQuery[qualifiedId] = {};

      const itemShouldBeIncludedInQuery = options.onlyIncludeItems ?
        options.onlyIncludeItems.includes(item.getId()) :
        true;

      item.getSinkingProperties().forEach((sp) => {
        if (
          !sp.isRetrievalDisabled() &&
          sp.checkRoleAccessFor(
            ItemDefinitionIOActions.READ,
            this.props.tokenData.role,
            this.props.tokenData.id,
            this.props.assumeOwnership ? this.props.tokenData.id : appliedOwner,
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
          itemShouldBeIncludedInQuery &&
          sp.checkRoleAccessFor(
            !this.props.forId ? ItemDefinitionIOActions.CREATE : ItemDefinitionIOActions.EDIT,
            this.props.tokenData.role,
            this.props.tokenData.id,
            this.props.assumeOwnership ? this.props.tokenData.id : appliedOwner,
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
      return this.giveEmulatedInvalidError("submitError", true)  as IActionResponseWithId;
    }

    // now it's when we are actually submitting
    this.setState({
      submitting: true,
    });

    const queryName = (!this.props.forId ? PREFIX_ADD : PREFIX_EDIT) +
      this.props.itemDefinitionInstance.getQualifiedPathName();
    const args = {
      token: this.props.tokenData.token,
      language: this.props.localeData.language.split("-")[0],
      ...argumentsForQuery,
      ...applyingPolicyArgs,
    };
    if (this.props.forId) {
      args.id = this.props.forId;
    }
    const query = buildGqlMutation({
      name: queryName,
      args,
      fields: requestFields,
    });
    const gqlValue = await gqlQuery(query);

    let error: GraphQLEndpointErrorType = null;
    if (!gqlValue) {
      error = {
        message: "Failed to connect",
        code: "CANT_CONNECT",
      };
      this.setState({
        submitError: error,
        submitting: false,
        submitted: false,
        poked: true,
      });
    } else {
      if (gqlValue.errors) {
        error = gqlValue.errors[0].extensions;
        this.setState({
          submitError: error,
          submitting: false,
          submitted: false,
          poked: true,
        });
      } else {
        this.setState({
          submitError: null,
          submitting: false,
          submitted: true,
          poked: options.unpokeAfterSuccess ? false : true,
        });
      }

      if (gqlValue.data && gqlValue.data[queryName] && gqlValue.data[queryName].id) {
        const recievedId = gqlValue.data[queryName].id;
        const representativeGetQuery = buildGqlQuery({
          name: PREFIX_GET + this.props.itemDefinitionInstance.getQualifiedPathName(),
          args: {
            id: recievedId,
            token: this.props.tokenData.token,
            language: this.props.localeData.language.split("-")[0],
          },
          fields: requestFields,
        });

        const recievedFields = flattenRecievedFields(gqlValue.data[queryName]);
        this.props.itemDefinitionInstance.applyValue(
          recievedId,
          recievedFields,
          false,
          this.props.tokenData.id,
          this.props.tokenData.role,
          representativeGetQuery,
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
        this.props.itemDefinitionInstance.triggerListeners(recievedId);

        return {
          id: recievedId,
          error,
        };
      }
    }

    // happens during an error or whatnot
    return {
      id: null,
      error,
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
          submitError: this.state.submitError,
          submitting: this.state.submitting,
          submitted: this.state.submitted,
          deleteError: this.state.deleteError,
          deleting: this.state.deleting,
          deleted: this.state.deleted,
          poked: this.state.poked,
          submit: this.submit,
          reload: this.loadValue,
          delete: this.delete,
          forId: this.props.forId || null,
          dismissLoadError: this.dismissLoadError,
          dismissSubmitError: this.dismissSubmitError,
          dismissSubmitted: this.dismissSubmitted,
          dismissDeleteError: this.dismissDeleteError,
          dismissDeleted: this.dismissDeleted,
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
                        if (props.searchCounterpart) {
                          valueFor = valueFor.getSearchModeCounterpart();
                        }
                      } else {
                        valueFor = data.mod.getPropExtensionItemDefinition();
                      }

                      return (
                        <ActualItemDefinitionProvider
                          localeData={localeData}
                          tokenData={tokenData}
                          itemDefinitionInstance={valueFor}
                          itemDefinitionQualifiedName={valueFor.getQualifiedPathName()}
                          containsExternallyCheckedProperty={valueFor.containsAnExternallyCheckedProperty()}
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
