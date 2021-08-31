import React from "react";

interface IUSSDChunkProps {
  label: string;
}

export class USSDChunk extends React.Component<IUSSDChunkProps> {
  render() {
    return (
      <div data-chunk="true" data-label={this.props.label}>
        {this.props.children}
      </div>
    )
  }
}