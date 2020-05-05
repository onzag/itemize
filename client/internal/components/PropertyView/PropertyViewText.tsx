import { IPropertyViewProps } from "../PropertyView";
import React from "react";
import { DOMPurify } from "../../../util";

// TODO on view mode we should take this into consideration
// unecessary in edit mode
// https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images

export default class PropertyViewText extends React.Component<IPropertyViewProps, {}> {
  public shouldComponentUpdate(nextProps: IPropertyViewProps) {
    return this.props.state.value !== nextProps.state.value;
  }
  public render() {
    // TODO process data-src-id attributes if present in order to show files
    if (this.props.property.isRichText()) {
      const purifiedText = DOMPurify.sanitize(this.props.state.value.toString());
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
