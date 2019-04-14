import ItemDefinition, { IItemDefinitionValue } from "../../base/ItemDefinition";
import DevToolRawVisualizer from "./dRawVisualizer";
import * as React from "react";
import DevToolPropertyDefinition from "./dPropertyDef";
import { getModulePath } from "./dModule";
import ItemEntry from "../app/components/base/ItemEntry";
import PropertyDefinition, { PropertyDefinitionSupportedType } from "../../base/ItemDefinition/PropertyDefinition";

interface IItemDefProps {
  itemDef: ItemDefinition;
  language: string;
  imported?: boolean;
}

interface IItemDefState {
  expanded: boolean;
  displayBasic: boolean;
  displayHiddenEntries: boolean;
  pokeEntries: boolean;
  value: IItemDefinitionValue;
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
      displayHiddenEntries: false,
      pokeEntries: false,
      value: props.itemDef.getCurrentValue(),
    };

    this.toggleExpand = this.toggleExpand.bind(this);
    this.toggleDisplayBasic = this.toggleDisplayBasic.bind(this);
    this.toggleDisplayHiddenEntries = this.toggleDisplayHiddenEntries.bind(this);
    this.togglePokeEntries = this.togglePokeEntries.bind(this);
    this.onPropertyChange = this.onPropertyChange.bind(this);
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
  public onPropertyChange(property: PropertyDefinition, value: PropertyDefinitionSupportedType, internalValue: any) {
    property.setCurrentValue(value, internalValue);
    this.setState({
      value: this.props.itemDef.getCurrentValue(),
    });
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
              displayHidden={this.state.displayHiddenEntries}
              poked={this.state.pokeEntries}
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
            />;
          })}
          {this.props.itemDef.getChildDefinitions().map((childDefinition) => {
            return <DevToolItemDefinition
              key={childDefinition.getName()}
              itemDef={childDefinition}
              language={this.props.language}
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
