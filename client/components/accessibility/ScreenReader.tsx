import React from "react";

export interface IScreenReaderProps {
  priority: number;
  disabled: boolean;
  language: string;
  content: string;
  groupPosition: number;
}

export class ScreenReader extends React.PureComponent<IScreenReaderProps> {
  constructor(props: IScreenReaderProps) {
    super(props);
  }

  public getPriority() {
    return this.props.priority || 0;
  }

  public isDisabled() {
    return this.props.disabled || false;
  }

  public getLanguage() {
    return this.props.language || "en";
  }

  public getContent() {
    return this.props.content || "";
  }

  public speak() {
    //TODO
  }

  public render() {
    return null as any;
  }
}