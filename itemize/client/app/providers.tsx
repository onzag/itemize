import React from "react";
import { DataContext } from ".";
import ItemDefinition, { IItemDefinitionValue } from "../../base/Root/Module/ItemDefinition";
import Module from "../../base/Root/Module";
import PropertyDefinition from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import Item, { ItemExclusionState } from "../../base/Root/Module/ItemDefinition/Item";

export interface IItemDefinitionContextType {
  idef: ItemDefinition;
  value: IItemDefinitionValue;
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
  itemDefinition: string;
  forId?: number;
  searchCounterpart?: boolean;
  disableExternalChecks?: boolean;
}

interface IActualItemDefinitionProviderProps extends IItemDefinitionProviderProps {
  mod: Module;
}

interface IActualItemDefinitionProviderState {
  value: IItemDefinitionValue;
  valueFor: ItemDefinition;
  valueForQualifiedName: string;
  valueForContainsExternallyCheckedProperty: boolean;
}

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
      newValueFor.applyValue(state.value);
      return {
        valueFor: newValueFor,
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
    };

    this.onPropertyChange = this.onPropertyChange.bind(this);
    this.onItemSetExclusionState = this.onItemSetExclusionState.bind(this);
  }
  public componentDidMount() {
    if (this.state.valueForContainsExternallyCheckedProperty && !this.props.disableExternalChecks) {
      this.setStateToCurrentValueWithExternalChecking(null);
    }
  }
  public async setStateToCurrentValueWithExternalChecking(currentUpdateId: number) {
    const newValue = await this.state.valueFor.getCurrentValue(this.props.forId || null);
    if (currentUpdateId === null || this.lastUpdateId === currentUpdateId) {
      this.setState({
        value: newValue,
      });
    }
  }
  public onPropertyChange(
    property: PropertyDefinition,
    value: PropertyDefinitionSupportedType,
    internalValue: any,
  ) {
    const currentUpdateId = (new Date()).getTime();
    this.lastUpdateId = currentUpdateId;

    property.setCurrentValue(value, internalValue);
    this.setState({
      value: this.state.valueFor.getCurrentValueNoExternalChecking(this.props.forId || null),
    });

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

    item.setExclusionState(state);
    this.setState({
      value: this.state.valueFor.getCurrentValueNoExternalChecking(this.props.forId || null),
    });

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
        }}
      >
        {this.props.children}
      </ItemDefinitionContext.Provider>
    );
  }
}

export function ItemDefinitionProvider(props: IItemDefinitionProviderProps) {
  return (
    <ModuleContext.Consumer>
      {(data) => <ActualItemDefinitionProvider mod={data.mod} {...props}/>}
    </ModuleContext.Consumer>
  );
}

interface IModuleProviderProps {
  children: any;
  module: string;
}

// TODO module level searches
export function ModuleProvider(props: IModuleProviderProps) {
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
}
