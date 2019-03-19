import Module from "../../base/Module";
import DevToolItemDefinition from "./dItemDef";
import * as React from "react";
import DevToolRawVisualizer from "./dRawVisualizer";

interface IModuleProps {
  module: Module;
  locale: string;
}

interface IModuleState {
  expanded: boolean;
}

const devtoolsStyle: {
  [name: string]: React.CSSProperties,
} = {
  moduleItem: {
    width: "100%",
    backgroundColor: "#7986cb",
    marginTop: "2px",
  },
  moduleItemTitle: {
    width: "100%",
    backgroundColor: "#666ad1",
    padding: "10px",
    cursor: "pointer",
  },
  moduleChildren: {
    width: "100%",
    paddingLeft: "15px",
    paddingBottom: "2px",
  },
};

export default class DevToolModule extends React.Component<IModuleProps, IModuleState> {
  constructor(props: IModuleProps) {
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
      <div style={devtoolsStyle.moduleItem}>
        <p onClick={this.toggleExpand} style={devtoolsStyle.moduleItemTitle}>
          <b>{this.state.expanded ? "-" : "+"} </b>
          <b>{this.props.module.getName()}</b>
          <span> - {this.props.module.getI18nNameFor(this.props.locale)}</span>
          <span> (module)</span>
        </p>
        {this.state.expanded ? <div style={devtoolsStyle.moduleChildren}>
          {this.props.module.getAllModules().map((childModule) => {
            return <DevToolModule
              key={childModule.getName()}
              module={childModule}
              locale={this.props.locale}
            />;
          })}
          {this.props.module.getAllChildItemDefinitions().map((childDefinition) => {
            return <DevToolItemDefinition
              key={childDefinition.getName()}
              module={this.props.module}
              itemDef={childDefinition}
              locale={this.props.locale}
            />;
          })}
          <DevToolRawVisualizer content={this.props.module.rawData}/>
        </div> : null}
      </div>
    );
  }
}
