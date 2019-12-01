import React from "react";
import { DataContext, LocaleContext, ILocaleContextType } from ".";
import ItemDefinition, { IItemDefinitionValue, ItemDefinitionIOActions } from "../../base/Root/Module/ItemDefinition";
import Module from "../../base/Root/Module";
import PropertyDefinition from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import Item, { ItemExclusionState } from "../../base/Root/Module/ItemDefinition/Item";
import { TokenContext, ITokenContextType } from "./internal-providers";
import {
  ROLES_THAT_HAVE_ACCESS_TO_MODERATION_FIELDS,
  MODERATION_FIELDS,
  EXTERNALLY_ACCESSIBLE_RESERVED_BASE_PROPERTIES,
  PREFIX_GET,
  PREFIX_BUILD,
} from "../../constants";
import { buildGqlQuery, gqlQuery } from "./gql-querier";
import { GraphQLEndpointErrorType } from "../../base/errors";

export interface IItemDefinitionContextType {
  idef: ItemDefinition;
  value: IItemDefinitionValue;
  notFound: boolean;
  blocked: boolean;
  blockedButDataAccessible: boolean;
  loadError: GraphQLEndpointErrorType;
  onPropertyChange: (
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    internalValue: any,
  ) => void;
  onItemSetExclusionState: (
    item: Item,
    state: ItemExclusionState,
  ) => void;
}

export interface IModuleContextType {
  mod: Module;
}

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
  value: IItemDefinitionValue;
  isBlocked: boolean;
  isBlockedButDataIsAccessible: boolean;
  notFound: boolean;
  loadError: GraphQLEndpointErrorType;
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
      value: valueFor.getCurrentValueNoExternalChecking(this.props.forId || null),
      isBlocked: false,
      isBlockedButDataIsAccessible: false,
      notFound: false,
      loadError: null,
    };

    this.onPropertyChange = this.onPropertyChange.bind(this);
    this.onItemSetExclusionState = this.onItemSetExclusionState.bind(this);
    this.loadValue = this.loadValue.bind(this);
    this.listener = this.listener.bind(this);

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
        value: this.itemDefinition.getCurrentValueNoExternalChecking(this.props.forId || null),
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
    console.log("WE LISTENED FOR", this.props.forId);
    let valueFor = this.props.mod.getItemDefinitionFor(this.props.itemDefinition.split("/"));
    if (this.props.searchCounterpart) {
      valueFor = valueFor.getSearchModeCounterpart();
    }
    this.setState({
      value: valueFor.getCurrentValueNoExternalChecking(this.props.forId || null),
    });
  }
  public async loadValue() {
    if (!this.props.forId) {
      return;
    }

    console.log("ASKED TO LOAD VALUE", this.props.forId);
    const qualifiedPathNameWithID = PREFIX_BUILD(this.itemDefinition.getQualifiedPathName()) + this.props.forId;
    if (ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID]) {
      console.log("CANCEL IT BECAUSE WE ALREADY LOADIN");
      return;
    }
    ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID] = true;

    const requestFields: any = {
      DATA: {},
    };
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
          this.props.assumeOwnership ? this.props.tokenData.id : -1,
          false,
        )
      ) {
        console.log("PASSED", pd.getId(), "for", this.props.tokenData.id, this.props.assumeOwnership);
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
            this.props.assumeOwnership ? this.props.tokenData.id : -1,
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
    const appliedGQLValue = this.itemDefinition.getGQLAppliedValue(this.props.forId);
    if (appliedGQLValue && appliedGQLValue.query === query) {
      delete ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID];
      console.log("CANCEL IT BECAUSE IT MATCHES OUR CACHE");
      return;
    }
    const gqlValue = await gqlQuery(query);

    if (!gqlValue) {
      this.setState({
        loadError: {
          message: "Failed to connect",
          code: "CANT_CONNECT",
        },
        isBlocked: false,
        isBlockedButDataIsAccessible: false,
        notFound: false,
      });
    } else {
      if (gqlValue.errors) {
        this.setState({
          loadError: gqlValue.errors[0].extensions,
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

          console.log(query);
          const recievedFields = flattenRecievedFields(gqlValue.data[queryName]);
          this.itemDefinition.applyValueFromGQL(
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
  }
  public async setStateToCurrentValueWithExternalChecking(currentUpdateId: number) {
    const newValue = await this.itemDefinition.getCurrentValue(this.props.forId || null);
    if (currentUpdateId === null || this.lastUpdateId === currentUpdateId) {
      this.setState({
        value: newValue,
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
  public render() {
    return (
      <ItemDefinitionContext.Provider
        value={{
          idef: this.itemDefinition,
          value: this.state.value,
          onPropertyChange: this.onPropertyChange,
          onItemSetExclusionState: this.onItemSetExclusionState,
          notFound: this.state.notFound,
          blocked: this.state.isBlocked,
          blockedButDataAccessible: this.state.isBlockedButDataIsAccessible,
          loadError: this.state.loadError,
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
