import React from "react";

interface ITitleSetterProps {
  children: string;
}

let TitleSetterInstanceIsLoaded = false;
const TitleSetterChangedTitleListeners = new Map<TitleReader, () => void>();
export class TitleSetter extends React.Component<ITitleSetterProps, {}> {
  private originalTitle: string;
  constructor(props: ITitleSetterProps) {
    super(props);
  }
  public componentDidMount() {
    if (TitleSetterInstanceIsLoaded) {
      throw new Error("Two instances of TitleSetter have been loaded at once, this is not allowed");
    }

    TitleSetterInstanceIsLoaded = true;
    this.originalTitle = document.title;
    document.title = this.props.children || "";
    if (this.originalTitle !== document.title) {
      TitleSetterChangedTitleListeners.forEach((listener) => listener());
    }
  }
  public componentDidUpdate(prevProps: ITitleSetterProps) {
    if ((prevProps.children || "") !== (this.props.children || "")) {
      document.title = this.props.children || "";
      TitleSetterChangedTitleListeners.forEach((listener) => listener());
    }
  }
  public componentWillUnmount() {
    document.title = this.originalTitle;
    TitleSetterInstanceIsLoaded = false;
  }
  public render() {
    return null;
  }
}

export class TitleReader extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }
  public componentDidMount() {
    TitleSetterChangedTitleListeners.set(this, this.forceUpdate.bind(this));
  }
  public componentWillUnmount() {
    TitleSetterChangedTitleListeners.delete(this);
  }
  public render() {
    return document.title;
  }
}
