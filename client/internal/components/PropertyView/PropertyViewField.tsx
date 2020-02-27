import { IPropertyViewProps } from ".";
import React from "react";

export default class PropertyViewField extends React.Component<IPropertyViewProps, {}> {
  public shouldComponentUpdate(nextProps: IPropertyViewProps) {
    return this.props.state.value !== nextProps.state.value;
  }
  public render() {
    return (
      <div className={this.props.classes.container}>
        {this.props.state.value}
      </div>
    );
  }
}
