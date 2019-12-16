import { IPropertyViewProps } from "../PropertyView";
import React from "react";

export default class PropertyViewField extends React.Component<IPropertyViewProps, {}> {
  public shouldComponentUpdate(nextProps: IPropertyViewProps) {
    return this.props.value.value !== nextProps.value.value;
  }
  public render() {
    return (
      <div>
        {this.props.value.value}
      </div>
    );
  }
}
