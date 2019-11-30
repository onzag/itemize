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

export interface IItemDefinitionContextType {
  idef: ItemDefinition;
  value: IItemDefinitionValue;
  deleted: boolean;
  blocked: boolean;
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
  valueFor: ItemDefinition;
  valueForQualifiedName: string;
  valueForContainsExternallyCheckedProperty: boolean;
  valueForId: number;
  isBlocked: boolean;
  isDeleted: boolean;
}

function flattenRecievedFields(recievedFields: any) {
  // so first we extract the data content
  const output = {
    ...(recievedFields.DATA || {}),
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

  public static getDerivedStateFromProps(
    props: IActualItemDefinitionProviderProps,
    state: IActualItemDefinitionProviderState,
  ): Partial<IActualItemDefinitionProviderState> {
    let newValueFor = props.mod.getItemDefinitionFor(props.itemDefinition.split("/"));
    if (props.searchCounterpart) {
      newValueFor = newValueFor.getSearchModeCounterpart();
    }
    if (state.valueFor !== newValueFor) {
      if (state.valueForQualifiedName !== newValueFor.getQualifiedPathName()) {
        throw new Error(
          "Replacing a context of an item definition for another is not allowed",
        );
      }
      if (state.valueForId === (props.forId || null)) {
        newValueFor.applyValue(props.forId || null, state.value);
      }
      return {
        valueFor: newValueFor,
        valueForId: props.forId || null,
        valueForContainsExternallyCheckedProperty: newValueFor.containsAnExternallyCheckedProperty(),
      };
    }
    return null;
  }

  private updateTimeout: NodeJS.Timer;
  private lastUpdateId: number;

  constructor(props: IActualItemDefinitionProviderProps) {
    super(props);

    let valueFor = props.mod.getItemDefinitionFor(this.props.itemDefinition.split("/"));
    if (props.searchCounterpart) {
      valueFor = valueFor.getSearchModeCounterpart();
    }

    this.state = {
      value: valueFor.getCurrentValueNoExternalChecking(this.props.forId || null),
      valueFor,
      valueForQualifiedName: valueFor.getQualifiedPathName(),
      valueForContainsExternallyCheckedProperty: valueFor.containsAnExternallyCheckedProperty(),
      valueForId: props.forId || null,
      isBlocked: false,
      isDeleted: false,
    };

    this.onPropertyChange = this.onPropertyChange.bind(this);
    this.onItemSetExclusionState = this.onItemSetExclusionState.bind(this);
    this.loadValue = this.loadValue.bind(this);
    this.listener = this.listener.bind(this);

    valueFor.addListener(this.props.forId || null, this.listener);
  }
  public listener() {
    this.setState({
      value: this.state.valueFor.getCurrentValueNoExternalChecking(this.props.forId || null),
      valueForId: this.props.forId || null,
    });
  }
  public async loadValue() {
    if (this.props.forId && !this.state.valueFor.hasAppliedValueTo(this.props.forId)) {
      const qualifiedPathNameWithID = PREFIX_BUILD(this.state.valueFor.getQualifiedPathName()) + this.props.forId;
      if (ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID]) {
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
      this.state.valueFor.getAllPropertyDefinitionsAndExtensions().forEach((pd) => {
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
          requestFields.DATA[pd.getId()] = {};

          const propertyDescription = pd.getPropertyDefinitionDescription();
          if (propertyDescription.gqlFields) {
            Object.keys(propertyDescription.gqlFields).forEach((field) => {
              requestFields.DATA[pd.getId()][field] = {};
            });
          }
        }
      });
      this.state.valueFor.getAllItems().forEach((item) => {
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

      const queryName = PREFIX_GET + this.state.valueFor.getQualifiedPathName();
      const gqlValue = await gqlQuery(
        buildGqlQuery({
          name: queryName,
          args: {
            id: this.props.forId,
            token: this.props.tokenData.token,
            language: this.props.localeData.language.split("-")[0],
            country: this.props.localeData.country,
          },
          fields: requestFields,
        }),
      );

      // TODO check for errors
      if (!gqlValue) {
        // TODO connection error
      } else if (!gqlValue.data) {
        // TODO strange error but .error fields available
      } else if (!gqlValue.data[queryName]) {
        // TODO check for other error still here
        // TODO deleted functionality
      } else if (gqlValue.data[queryName].blocked_at) {
        // TODO blocked
      } else {
        const recievedFields = flattenRecievedFields(gqlValue.data[queryName]);
        this.state.valueFor.applyValueFromGQL(this.props.forId || null, recievedFields);
        this.state.valueFor.triggerListeners(this.props.forId || null);
        if (this.state.valueForContainsExternallyCheckedProperty && !this.props.disableExternalChecks) {
          this.setStateToCurrentValueWithExternalChecking(null);
        }
      }

      delete ItemDefinitionProviderRequestsInProgressRegistry[qualifiedPathNameWithID];
    }
  }
  public componentDidUpdate(
    prevProps: IActualItemDefinitionProviderProps,
    prevState: IActualItemDefinitionProviderState,
  ) {
    if (prevProps.forId !== this.props.forId || prevState.valueFor !== this.state.valueFor) {
      prevState.valueFor.removeListener(prevProps.forId || null, this.listener);
      this.state.valueFor.addListener(this.props.forId || null, this.listener);
    }
    this.loadValue();
  }
  public componentDidMount() {
    if (this.state.valueForContainsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      this.setStateToCurrentValueWithExternalChecking(null);
    }
    this.loadValue();
  }
  public async setStateToCurrentValueWithExternalChecking(currentUpdateId: number) {
    const newValue = await this.state.valueFor.getCurrentValue(this.props.forId || null);
    if (currentUpdateId === null || this.lastUpdateId === currentUpdateId) {
      this.setState({
        value: newValue,
        valueForId: this.props.forId || null,
      });
      this.state.valueFor.triggerListeners(this.props.forId || null, this.listener);
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
    this.state.valueFor.triggerListeners(this.props.forId || null);

    if (this.state.valueForContainsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      clearTimeout(this.updateTimeout);
      this.updateTimeout = setTimeout(
        this.setStateToCurrentValueWithExternalChecking.bind(this, currentUpdateId),
        300,
      );
    }
  }
  public onItemSetExclusionState(item: Item, state: ItemExclusionState) {
    const currentUpdateId = (new Date()).getTime();
    this.lastUpdateId = currentUpdateId;

    item.setExclusionState(this.props.forId || null, state);
    this.state.valueFor.triggerListeners(this.props.forId || null);

    if (this.state.valueForContainsExternallyCheckedProperty && !this.props.disableExternalChecks) {
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
          idef: this.state.valueFor,
          value: this.state.value,
          onPropertyChange: this.onPropertyChange,
          onItemSetExclusionState: this.onItemSetExclusionState,
          deleted: this.state.isDeleted,
          blocked: this.state.isBlocked,
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
              <ModuleContext.Provider value={{mod: data.mod.getChildModule(props.module)}}>
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
              <ModuleContext.Provider value={{mod: data.value.getModule(props.module)}}>
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
