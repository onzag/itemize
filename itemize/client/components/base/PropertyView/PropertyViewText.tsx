import { IPropertyViewProps } from "../PropertyView";
import React from "react";
import { DOMWindow, DOMPurify } from "../../../../util";

export default class PropertyViewText extends React.Component<IPropertyViewProps, {}> {
  public shouldComponentUpdate(nextProps: IPropertyViewProps) {
    return this.props.state.value !== nextProps.state.value;
  }
  public render() {
    if (this.props.property.isRichText()) {
      const dummyElement = DOMWindow.document.createElement("template");
      dummyElement.innerHTML = this.props.state.value.toString();
      const purifiedText = DOMPurify.sanitize(dummyElement);
      return (
        <div className="rich-text" dangerouslySetInnerHTML={{__html: purifiedText}}/>
      );
    }
    return (
      <div className={this.props.classes.container}>
        {this.props.state.value}
      </div>
    );
  }
}
