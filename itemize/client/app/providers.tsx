import React from "react";
import { DataContext, LocaleContext, ILocaleContextType } from ".";
import ItemDefinition, { IItemDefinitionStateType, ItemDefinitionIOActions } from "../../base/Root/Module/ItemDefinition";
import Module from "../../base/Root/Module";
import PropertyDefinition from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import Item, { ItemExclusionState, IItemState } from "../../base/Root/Module/ItemDefinition/Item";
import { TokenContext, ITokenContextType } from "./internal-providers";
import {
  ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS,
  MODERATION_FIELDS,
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  PREFIX_GET,
  PREFIX_BUILD,
  STANDARD_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  PREFIX_EDIT,
  PREFIX_ADD,
} from "../../constants";
import { buildGqlQuery, buildGqlMutation, gqlQuery } from "./gql-querier";
import { GraphQLEndpointErrorType } from "../../base/errors";

interface IBasicActionResponse {
  error: GraphQLEndpointErrorType;
}

interface IActionResponseWithId extends IBasicActionResponse {
  id: number;
}

export interface IItemDefinitionContextType {
  idef: ItemDefinition;
  state: IItemDefinitionStateType;
  notFound: boolean;
  blocked: boolean;
  blockedButDataAccessible: boolean;
  loadError: GraphQLEndpointErrorType;
  submitError: GraphQLEndpointErrorType;
  submitting: boolean;
  reload: () => Promise<IBasicActionResponse>;
  submit: () => Promise<IActionResponseWithId>;
  forId: number;
  onPropertyChange: (
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    internalValue: any,
  ) => void;
  onItemSetExclusionState: (
    item: Item,
    state: ItemExclusionState,
  ) => void;
  dismissLoadError: () => void;
  dismissSubmitError: () => void;
}

export interface IModuleContextType {
  mod: Module;
}

export interface IItemContext {
  item: Item;
  state: IItemState;
}

export const ItemContext = React.createContext<IItemContext>(null);
export const ItemDefinitionContext = React.createContext<IItemDefinitionContextType>(null);
export const ModuleContext = React.createContext<IModuleContextType>(null);

interface IItemDefinitionProviderProps {
  children: any;
  itemDefinition?: string;
  forId?: number;
  assumeOwnership?: boolean;
  searchCounterpart?: boolean;
  disableExternalChecks?: boolean;
}

interface IActualItemDefinitionProviderProps extends IItemDefinitionProviderProps {
  mod: Module;
  tokenData: ITokenContextType;
  localeData: ILocaleContextType;
}

interface IActualItemDefinitionProviderState {
  itemDefinitionState: IItemDefinitionStateType;
  isBlocked: boolean;
  isBlockedButDataIsAccessible: boolean;
  notFound: boolean;
  loadError: GraphQLEndpointErrorType;
  submitError: GraphQLEndpointErrorType;
  submitting: boolean;
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
  [qualifiedPathNameWithID: string]: boolean;
} = {};

class ActualItemDefinitionProvider extends
  React.Component<IActualItemDefinitionProviderProps, IActualItemDefinitionProviderState> {

  private updateTimeout: NodeJS.Timer;
  private lastUpdateId: number;
  private itemDefinition: ItemDefinition;
  private containsExternallyCheckedProperty: boolean;

  constructor(props: IActualItemDefinitionProviderProps) {
    super(props);

    let valueFor = props.mod.getItemDefinitionFor(this.props.itemDefinition.split("/"));
    if (props.searchCounterpart) {
      valueFor = valueFor.getSearchModeCounterpart();
    }

    this.state = {
      itemDefinitionState: valueFor.getStateNoExternalChecking(
        this.props.forId || null,
        !this.props.disableExternalChecks,
      ),
      isBlocked: false,
      isBlockedButDataIsAccessible: false,
      notFound: false,
      loadError: null,
      submitError:  null,
      submitting: false,
    };

    this.onPropertyChange = this.onPropertyChange.bind(this);
    this.onItemSetExclusionState = this.onItemSetExclusionState.bind(this);
    this.loadValue = this.loadValue.bind(this);
    this.listener = this.listener.bind(this);
    this.submit = this.submit.bind(this);
    this.dismissLoadError = this.dismissLoadError.bind(this);
    this.dismissSubmitError = this.dismissSubmitError.bind(this);

    valueFor.addListener(this.props.forId || null, this.listener);
    this.itemDefinition = valueFor;
    this.containsExternallyCheckedProperty = valueFor.containsAnExternallyCheckedProperty();
  }
  public componentDidUpdate(
    prevProps: IActualItemDefinitionProviderProps,
  ) {
    if (this.props.itemDefinition !== prevProps.itemDefinition) {
      throw new Error(
        "Changing item definitions is not allowed, you went from " +
        this.props.itemDefinition + " to " +
        prevProps.itemDefinition,
      );
    }
    if ((prevProps.forId || null) !== (this.props.forId || null)) {
      this.itemDefinition.removeListener(prevProps.forId || null, this.listener);
      this.itemDefinition.addListener(this.props.forId || null, this.listener);
      // we set the value given we have changed the forId
      this.setState({
        itemDefinitionState: this.itemDefinition.getStateNoExternalChecking(
          this.props.forId || null,
          !this.props.disableExternalChecks,
        ),
      });
      if (this.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
        this.setStateToCurrentValueWithExternalChecking(null);
      }
    }
    if (
      (prevProps.forId || null) !== (this.props.forId || null) ||
      prevProps.tokenData.id !== this.props.tokenData.id ||
      prevProps.tokenData.role !== this.props.tokenData.role
    ) {
      this.loadValue();
    }
  }
  public componentDidMount() {
    if (this.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      this.setStateToCurrentValueWithExternalChecking(null);
    }
    this.loadValue();
  }
  public listener() {
    let valueFor = this.props.mod.getItemDefinitionFor(this.props.itemDefinition.split("/"));
    if (this.props.searchCounterpart) {
      valueFor = valueFor.getSearchModeCounterpart();
    }
    this.setState({
      itemDefinitionState: valueFor.getStateNoExternalChecking(
        this.props.forId || null,
        !this.props.disableExternalChecks,
      ),
    });
  }
  public async loadValue(): Promise<IBasicActionResponse> {
    if (!this.props.forId) {
      return;
    }

    const qualifiedPathNameWithID = PREFIX_BUILD(this.itemDefinition.getQualifiedPathName()) + this.props.forId;
    if (ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID]) {
      return;
    }
    ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID] = true;

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
    this.itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
      if (pd.isRetrievalDisabled()) {
        return;
      }
      if (
        pd.checkRoleAccessFor(
          ItemDefinitionIOActions.READ,
          this.props.tokenData.role,
          this.props.tokenData.id,
          this.props.assumeOwnership ? this.props.tokenData.id : this.itemDefinition.getAppliedValueOwnerIfAny(
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
    this.itemDefinition.getAllItems().forEach((item) => {
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
            this.props.assumeOwnership ? this.props.tokenData.id : this.itemDefinition.getAppliedValueOwnerIfAny(
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

    const queryName = PREFIX_GET + this.itemDefinition.getQualifiedPathName();
    const query = buildGqlQuery({
      name: queryName,
      args: {
        id: this.props.forId,
        token: this.props.tokenData.token,
        language: this.props.localeData.language.split("-")[0],
        country: this.props.localeData.country,
      },
      fields: requestFields,
    });
    const appliedGQLValue = this.itemDefinition.getGQLAppliedValue(this.props.forId || null);
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
          this.itemDefinition.applyValue(
            this.props.forId || null,
            recievedFields,
            false,
            this.props.tokenData.id,
            this.props.tokenData.role,
            query,
          );
          this.itemDefinition.triggerListeners(this.props.forId || null);
          if (this.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
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
    const newItemDefinitionState = await this.itemDefinition.getState(this.props.forId || null);
    if (currentUpdateId === null || this.lastUpdateId === currentUpdateId) {
      this.setState({
        itemDefinitionState: newItemDefinitionState,
      });
      this.itemDefinition.triggerListeners(this.props.forId || null, this.listener);
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
    this.itemDefinition.triggerListeners(this.props.forId || null);

    if (this.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(
        this.setStateToCurrentValueWithExternalChecking.bind(this, currentUpdateId),
        300,
      );
    }
  }
  public componentWillUnmount() {
    this.itemDefinition.removeListener(this.props.forId || null, this.listener);
  }
  public onItemSetExclusionState(item: Item, state: ItemExclusionState) {
    const currentUpdateId = (new Date()).getTime();
    this.lastUpdateId = currentUpdateId;

    item.setExclusionState(this.props.forId || null, state);
    this.itemDefinition.triggerListeners(this.props.forId || null);

    if (this.containsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(
        this.setStateToCurrentValueWithExternalChecking.bind(this, currentUpdateId),
        300,
      );
    }
  }
  // TODO check that all fields are valid before submit
  // poke if otherwise
  // TODO policies
  public async submit(): Promise<IActionResponseWithId> {
    if (this.state.submitting) {
      return;
    }

    this.setState({
      submitting: true,
    });

    const requestFields: any = {
      DATA: {},
    };
    const argumentsForQuery: any = {};
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

    this.itemDefinition.getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
      if (
        !pd.isRetrievalDisabled() &&
        pd.checkRoleAccessFor(
          ItemDefinitionIOActions.READ,
          this.props.tokenData.role,
          this.props.tokenData.id,
          this.props.assumeOwnership ? this.props.tokenData.id : this.itemDefinition.getAppliedValueOwnerIfAny(
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

      if (
        pd.checkRoleAccessFor(
          !this.props.forId ? ItemDefinitionIOActions.CREATE : ItemDefinitionIOActions.EDIT,
          this.props.tokenData.role,
          this.props.tokenData.id,
          this.props.assumeOwnership ? this.props.tokenData.id : this.itemDefinition.getAppliedValueOwnerIfAny(
            this.props.forId || null,
          ),
          false,
        )
      ) {
        argumentsForQuery[pd.getId()] = pd.getCurrentValue(this.props.forId || null);
      }
    });

    this.itemDefinition.getAllItems().forEach((item) => {
      requestFields.DATA[item.getQualifiedExclusionStateIdentifier()] = {};
      argumentsForQuery[item.getQualifiedExclusionStateIdentifier()] = item.getExclusionState(this.props.forId || null);

      const qualifiedId = item.getQualifiedIdentifier();
      requestFields.DATA[qualifiedId] = {};
      argumentsForQuery[qualifiedId] = {};

      item.getSinkingProperties().forEach((sp) => {
        if (
          !sp.isRetrievalDisabled() &&
          sp.checkRoleAccessFor(
            ItemDefinitionIOActions.READ,
            this.props.tokenData.role,
            this.props.tokenData.id,
            this.props.assumeOwnership ? this.props.tokenData.id : this.itemDefinition.getAppliedValueOwnerIfAny(
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

        if (
          sp.checkRoleAccessFor(
            !this.props.forId ? ItemDefinitionIOActions.CREATE : ItemDefinitionIOActions.EDIT,
            this.props.tokenData.role,
            this.props.tokenData.id,
            this.props.assumeOwnership ? this.props.tokenData.id : this.itemDefinition.getAppliedValueOwnerIfAny(
              this.props.forId || null,
            ),
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

    const queryName = (!this.props.forId ? PREFIX_ADD : PREFIX_EDIT) +
      this.itemDefinition.getQualifiedPathName();
    const args = {
      token: this.props.tokenData.token,
      language: this.props.localeData.language.split("-")[0],
      country: this.props.localeData.country,
      ...argumentsForQuery,
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
      });
    } else {
      if (gqlValue.errors) {
        error = gqlValue.errors[0].extensions;
        this.setState({
          submitError: error,
          submitting: false,
        });
      } else {
        this.setState({
          submitError: null,
          submitting: false,
        });
      }

      if (gqlValue.data && gqlValue.data[queryName] && gqlValue.data[queryName].id) {
        const recievedId = gqlValue.data[queryName].id;
        const representativeGetQuery = buildGqlQuery({
          name: PREFIX_GET + this.itemDefinition.getQualifiedPathName(),
          args: {
            id: recievedId,
            token: this.props.tokenData.token,
            language: this.props.localeData.language.split("-")[0],
            country: this.props.localeData.country,
          },
          fields: requestFields,
        });

        const recievedFields = flattenRecievedFields(gqlValue.data[queryName]);
        this.itemDefinition.applyValue(
          recievedId,
          recievedFields,
          false,
          this.props.tokenData.id,
          this.props.tokenData.role,
          representativeGetQuery,
        );
        this.itemDefinition.triggerListeners(recievedId);

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
  public dismissSubmitError() {
    this.setState({
      submitError: null,
    });
  }
  public render() {
    return (
      <ItemDefinitionContext.Provider
        value={{
          idef: this.itemDefinition,
          state: this.state.itemDefinitionState,
          onPropertyChange: this.onPropertyChange,
          onItemSetExclusionState: this.onItemSetExclusionState,
          notFound: this.state.notFound,
          blocked: this.state.isBlocked,
          blockedButDataAccessible: this.state.isBlockedButDataIsAccessible,
          loadError: this.state.loadError,
          submitError: this.state.submitError,
          submitting: this.state.submitting,
          submit: this.submit,
          reload: this.loadValue,
          forId: this.props.forId || null,
          dismissLoadError: this.dismissLoadError,
          dismissSubmitError: this.dismissSubmitError,
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
                      return (
                        <ActualItemDefinitionProvider
                          localeData={localeData}
                          mod={data.mod}
                          tokenData={tokenData}
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

interface IItemProviderProps {
  children: any;
  item: string;
}

export function ItemProvider(props: IItemProviderProps) {
  return (
    <ItemDefinitionContext.Consumer>
      {
        (itemDefinitionContextualValue) => {
          const itemState = itemDefinitionContextualValue.state.items.find((i) => i.itemId === props.item);
          return (
            <ItemContext.Provider
              value={{
                item: itemDefinitionContextualValue.idef.getItemFor(props.item),
                state: itemState,
              }}
            >
              {props.children}
            </ItemContext.Provider>
          );
        }
      }
    </ItemDefinitionContext.Consumer>
  );
}

interface IModuleProviderProps {
  children: any;
  module?: string;
  submodule?: string;
}

// TODO module level searches
export function ModuleProvider(props: IModuleProviderProps) {
  if (props.submodule) {
    return (
      <ModuleContext.Consumer>
        {
          (data) => {
            return (
              <ModuleContext.Provider value={{ mod: data.mod.getChildModule(props.module) }}>
                {props.children}
              </ModuleContext.Provider>
            );
          }
        }
      </ModuleContext.Consumer>
    );
  } else if (props.module) {
    return (
      <DataContext.Consumer>
        {
          (data) => {
            return (
              <ModuleContext.Provider value={{ mod: data.value.getModule(props.module) }}>
                {props.children}
              </ModuleContext.Provider>
            );
          }
        }
      </DataContext.Consumer>
    );
  } else {
    return props.children;
  }
}

// TODO
// tslint:disable-next-line: no-empty
export function ModuleLevelSearchProvider() {
}

// TODO
// tslint:disable-next-line: no-empty
export function ItemDefinitionLevelSearchProvider() {
}
