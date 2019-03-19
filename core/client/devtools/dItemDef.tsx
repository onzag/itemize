import Module from "../../base/Module";
import ItemDefinition from "../../base/ItemDefinition";
import DevToolRawVisualizer from "./dRawVisualizer";
import * as React from "react";

interface IItemDefProps {
  module: Module;
  itemDef: ItemDefinition;
  locale: string;
  imported?: boolean,
}

interface IItemDefState {
  expanded: boolean;
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
  },
};

export default class DevToolItemDefinition extends
  React.Component<IItemDefProps, IItemDefState> {
  constructor(props: IItemDefProps) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.toggleExpand = this.toggleExpand.bind(this);
  }
  public toggleExpand() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  public render() {
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
          <span> - {this.props.itemDef.getI18nNameFor(this.props.locale)}</span>
          <span> (item definition)</span>
        </p>
        {this.state.expanded ? <div style={devtoolsStyle.itemDefChildren}>
          {this.props.itemDef.getImportedChildDefinitions().map((childDefinition) => {
            return <DevToolItemDefinition
              key={childDefinition.getName()}
              module={this.props.module}
              itemDef={childDefinition}
              locale={this.props.locale}
              imported={true}
            />;
          })}
          {this.props.itemDef.getChildDefinitions().map((childDefinition) => {
            return <DevToolItemDefinition
              key={childDefinition.getName()}
              module={this.props.module}
              itemDef={childDefinition}
              locale={this.props.locale}
            />;
          })}
          <DevToolRawVisualizer content={this.props.itemDef.rawData}/>
        </div> : null}
      </div>
    );
  }
}
