import ItemDefinition, { IItemDefinitionValue } from "../../base/Root/Module/ItemDefinition";
import DevToolRawVisualizer from "./dRawVisualizer";
import React from "react";
import DevToolPropertyDefinition from "./dPropertyDef";
import { getModulePath } from "./dModule";
import ItemEntry, { WizardItemEntry } from "../app/components/base/ItemEntry";
import PropertyDefinition from "../../base/Root/Module/ItemDefinition/PropertyDefinition";
import Item, { ItemExclusionState } from "../../base/Root/Module/ItemDefinition/Item";
import Module from "../../base/Root/Module";
import { PropertyDefinitionSupportedType } from "../../base/Root/Module/ItemDefinition/PropertyDefinition/types";

interface IItemDefProps {
  itemDef: ItemDefinition;
  language: string;
  imported?: boolean;
  module: Module;
}

interface IItemDefState {
  expanded: boolean;
  displayBasic: boolean;
  displayWizard: boolean;
  displayHiddenEntries: boolean;
  pokeEntries: boolean;
  value: IItemDefinitionValue;
  valueFor: ItemDefinition;
}

const devtoolsStyle: {
  [name: string]: React.CSSProperties,
} = {
  itemDefItem: {
    width: "100%",
    backgroundColor: "#f48fb1",
    marginTop: "2px",
  },
  itemDefItemTitle: {
    width: "100%",
    backgroundColor: "#ec407a",
    padding: "10px",
    cursor: "pointer",
  },
  itemDefItemTitleImported : {
    width: "100%",
    backgroundColor: "#7b1fa2",
    padding: "10px",
    cursor: "pointer",
  },
  itemDefChildren: {
    width: "100%",
    paddingLeft: "15px",
    paddingBottom: "2px",
    color: "#000",
  },
  itemDefDisplay: {
    backgroundColor: "#fff",
  },
};

export function getItemDefPath(itemDef: ItemDefinition): string {
  return (itemDef.hasParentItemDefinition() ?
    getItemDefPath(itemDef.getParentItemDefinition()) :
    getModulePath(itemDef.getParentModule())) + "__" + itemDef.getName();
}

export default class DevToolItemDefinition extends
  React.Component<IItemDefProps, IItemDefState> {

  public static getDerivedStateFromProps(
    props: IItemDefProps,
    state: IItemDefState,
  ): Partial<IItemDefState> {
    if (
      !state.value ||
      state.valueFor !== props.itemDef
    ) {
      if (state.value) {
        props.itemDef.applyValue(state.value);
      }
      return {
        value: state.value ? state.value : props.itemDef.getCurrentValueNoExternalChecking(),
        valueFor: props.itemDef,
      };
    }
    return null;
  }

  private updateTimeout: NodeJS.Timer;
  private lastUpdateId: number;

  constructor(props: IItemDefProps) {
    super(props);

    this.state = {
      expanded: JSON.parse(
        localStorage.getItem("__dev__itemdef__expanded" +
        getItemDefPath(props.itemDef),
      ) || "false"),
      displayBasic: JSON.parse(
        localStorage.getItem("__dev__itemdef__displayBasic" +
        getItemDefPath(props.itemDef),
      ) || "false"),
      displayWizard: JSON.parse(
        localStorage.getItem("__dev__itemdef__displayWizard" +
        getItemDefPath(props.itemDef),
      ) || "false"),
      displayHiddenEntries: false,
      pokeEntries: false,
      value: null,
      valueFor: null,
    };

    this.toggleExpand = this.toggleExpand.bind(this);
    this.toggleDisplayBasic = this.toggleDisplayBasic.bind(this);
    this.toggleDisplayWizard = this.toggleDisplayWizard.bind(this);
    this.toggleDisplayHiddenEntries = this.toggleDisplayHiddenEntries.bind(this);
    this.togglePokeEntries = this.togglePokeEntries.bind(this);
    this.onPropertyChange = this.onPropertyChange.bind(this);
    this.onItemSetExclusionState = this.onItemSetExclusionState.bind(this);
  }
  public toggleExpand() {
    localStorage.setItem(
      "__dev__itemdef__expanded" +
      getItemDefPath(this.props.itemDef),
      JSON.stringify(!this.state.expanded),
    );
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  public toggleDisplayBasic() {
    localStorage.setItem(
      "__dev__itemdef__displayBasic" +
      getItemDefPath(this.props.itemDef),
      JSON.stringify(!this.state.displayBasic),
    );
    this.setState({
      displayBasic: !this.state.displayBasic,
    });
  }
  public toggleDisplayWizard() {
    localStorage.setItem(
      "__dev__itemdef__displayWizard" +
      getItemDefPath(this.props.itemDef),
      JSON.stringify(!this.state.displayWizard),
    );
    this.setState({
      displayWizard: !this.state.displayWizard,
    });
  }
  public toggleDisplayHiddenEntries() {
    this.setState({
      displayHiddenEntries: !this.state.displayHiddenEntries,
    });
  }
  public togglePokeEntries() {
    this.setState({
      pokeEntries: !this.state.pokeEntries,
    });
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
      value: this.props.itemDef.getCurrentValueNoExternalChecking(),
    });

    clearTimeout(this.updateTimeout);
    this.updateTimeout = setTimeout(async () => {
      const newValue = await this.props.itemDef.getCurrentValue();
      if (this.lastUpdateId === currentUpdateId) {
        this.setState({
          value: newValue,
        });
      }
    }, 300);
  }
  public onItemSetExclusionState(item: Item, state: ItemExclusionState) {
    // TODO this functionality should be passed to the item entry object itself
    // the developer shouldn't have to deal with this, just give them an onchange
    // event and they are not able to set the value, we will also need a
    // isExternalCheckingNecessary function for optimization
    const currentUpdateId = (new Date()).getTime();
    this.lastUpdateId = currentUpdateId;

    item.setExclusionState(state);
    this.setState({
      value: this.props.itemDef.getCurrentValueNoExternalChecking(),
    });

    clearTimeout(this.updateTimeout);
    this.updateTimeout = setTimeout(async () => {
      const newValue = await this.props.itemDef.getCurrentValue();
      if (this.lastUpdateId === currentUpdateId) {
        this.setState({
          value: newValue,
        });
      }
    }, 300);
  }
  public render() {
    let valueToStringify: IItemDefinitionValue = null;
    if (this.state.value) {
      valueToStringify = {
        ...this.state.value,
        properties: this.state.value.properties.map((propertyValue) => {
          let propertyValueToStringify = {...propertyValue};
          // a small hack due to internal values being too long
          if (
            propertyValueToStringify.internalValue !== null &&
            typeof propertyValueToStringify.internalValue !== "string"
          ) {
            propertyValueToStringify = {...propertyValueToStringify, internalValue: "[TOO BIG TO DISPLAY]"};
          }

          return propertyValueToStringify;
        }),
      };
    }
    return (
      <div style={devtoolsStyle.itemDefItem}>
        <p
          onClick={this.toggleExpand}
          style={this.props.imported ?
            devtoolsStyle.itemDefItemTitleImported :
            devtoolsStyle.itemDefItemTitle}
        >
          <b>{this.state.expanded ? "-" : "+"} </b>
          <b>{this.props.itemDef.getName()}</b>
          <span> - {this.props.itemDef.getI18nDataFor(this.props.language).name}</span>
          <span> (item definition)</span>
        </p>
        {this.state.expanded ? <div style={devtoolsStyle.itemDefChildren}>
          <button onClick={this.toggleDisplayBasic}>{
            this.state.displayBasic ? "Hide Basic Form" : "Display Basic Form"
          }</button>
          <button onClick={this.toggleDisplayWizard}>{
            this.state.displayWizard ? "Hide Wizard Form" : "Display Wizard Form"
          }</button>
          <button onClick={this.toggleDisplayHiddenEntries}>{
            this.state.displayHiddenEntries ? "Hide Hidden Entries" : "Display Hidden Entries"
          }</button>
          <button onClick={this.togglePokeEntries}>{
            this.state.pokeEntries ? "Unpoke Entries" : "Poke Entries"
          }</button>
          {this.state.displayBasic ? <div style={devtoolsStyle.itemDefDisplay}>
            <ItemEntry
              value={this.state.value}
              onPropertyChange={this.onPropertyChange}
              onItemSetExclusionState={this.onItemSetExclusionState}
              displayHidden={this.state.displayHiddenEntries}
              poked={this.state.pokeEntries}
              itemDefinition={this.props.itemDef}
              asDialog={true}
              dialogOpen={true}
              onDialogClose={this.toggleDisplayBasic}
              autoFocusFirst={true}
              onDialogSubmit={this.toggleDisplayBasic}
            />
            <code>
              {JSON.stringify(valueToStringify, null, 2)}
            </code>
          </div> : null}
          {this.state.displayWizard ? <div style={devtoolsStyle.itemDefDisplay}>
            <WizardItemEntry
              value={this.state.value}
              onPropertyChange={this.onPropertyChange}
              onItemSetExclusionState={this.onItemSetExclusionState}
              displayHidden={this.state.displayHiddenEntries}
              itemDefinition={this.props.itemDef}
              asDialog={true}
              dialogOpen={true}
              onDialogClose={this.toggleDisplayWizard}
              onSubmit={this.toggleDisplayWizard}
            />
            <code>
              {JSON.stringify(valueToStringify, null, 2)}
            </code>
          </div> : null}
          {this.props.itemDef.getImportedChildDefinitions().map((childDefinition) => {
            return <DevToolItemDefinition
              key={childDefinition.getName()}
              itemDef={childDefinition}
              language={this.props.language}
              imported={true}
              module={this.props.module}
            />;
          })}
          {this.props.itemDef.getChildDefinitions().map((childDefinition) => {
            return <DevToolItemDefinition
              key={childDefinition.getName()}
              itemDef={childDefinition}
              language={this.props.language}
              module={this.props.module}
            />;
          })}
          {this.props.itemDef.getAllPropertyDefinitions().map((propExtension) => {
            return <DevToolPropertyDefinition
              key={propExtension.getId()}
              property={propExtension}
              language={this.props.language}
            />;
          })}
          <DevToolRawVisualizer content={this.props.itemDef.rawData}/>
        </div> : null}
      </div>
    );
  }
}
