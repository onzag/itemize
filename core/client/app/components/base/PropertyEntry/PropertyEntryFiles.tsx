import React from "react";
import { IPropertyEntryProps } from ".";
import {DropzoneArea} from "material-ui-dropzone";

export default class PropertyEntryFiles extends React.Component<IPropertyEntryProps, {}> {
  constructor(props: IPropertyEntryProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }
  public onChange(files: File[]) {
    console.log(files);
  }
  public render() {
    return (
      <DropzoneArea
        onChange={this.onChange}
      />
    );
  }
}
