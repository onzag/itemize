import * as React from "react";

import Module from "../../base/Module";
import DevToolItemDefinition from "./dItemDef";
import DevToolRawVisualizer from "./dRawVisualizer";
import DevToolPropertyDefinition from "./dPropertyDef";

interface IModuleProps {
  module: Module;
  language: string;
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

export function getModulePath(mod: Module): string {
  return (mod.hasParentModule() ?
    getModulePath(mod.getParentModule()) :
    "") + "__" + mod.getName();
}

export default class DevToolModule extends React.Component<IModuleProps, IModuleState> {
  constructor(props: IModuleProps) {
    super(props);

    this.state = {
      expanded: JSON.parse(
        localStorage.getItem("__dev__module__expanded" +
        getModulePath(props.module),
      ) || "false"),
    };

    this.toggleExpand = this.toggleExpand.bind(this);
  }
  public toggleExpand() {
    localStorage.setItem(
      "__dev__module__expanded" +
      getModulePath(this.props.module),
      JSON.stringify(!this.state.expanded),
    );
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
          <span> - {this.props.module.getI18nNameFor(this.props.language)}</span>
          <span> (module)</span>
        </p>
        {this.state.expanded ? <div style={devtoolsStyle.moduleChildren}>
          {this.props.module.getAllModules().map((childModule) => {
            return <DevToolModule
              key={childModule.getName()}
              module={childModule}
              language={this.props.language}
            />;
          })}
          {this.props.module.getAllChildItemDefinitions().map((childDefinition) => {
            return <DevToolItemDefinition
              key={childDefinition.getName()}
              itemDef={childDefinition}
              language={this.props.language}
            />;
          })}
          {this.props.module.getAllPropExtensions().map((propExtension) => {
            return <DevToolPropertyDefinition
              key={propExtension.getId()}
              property={propExtension}
              language={this.props.language}
            />;
          })}
          <DevToolRawVisualizer content={this.props.module.rawData}/>
        </div> : null}
      </div>
    );
  }
}
