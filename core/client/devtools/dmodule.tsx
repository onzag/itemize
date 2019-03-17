import Root from "../../base/Root";
import * as React from "react";
import { IModuleRawJSONDataType } from "../../base/Module";

interface IModuleProps {
  root: Root;
  moduleName: string;
  locale: string;
  raw: IModuleRawJSONDataType;
}

interface IModuleState {
  expanded: boolean;
}

const devtoolsStyle: {
  [name: string]: React.CSSProperties,
} = {
  moduleItem: {
    width: "100%",
    backgroundColor: "#E1E2E1",
    marginTop: "2px",
  },
  moduleItemTitle: {
    width: "100%",
    backgroundColor: "#666ad1",
    padding: "10px",
    cursor: "pointer",
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
          <b>{this.props.raw.name}</b> - {this.props.raw.i18nName[this.props.locale]}
        </p>
      </div>
    );
  }
}
