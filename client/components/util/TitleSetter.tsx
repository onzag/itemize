import React from "react";
import TitleReader from "./TitleReader";

interface ITitleSetterProps {
  children: string;
}

let TitleSetterInstanceIsLoaded = false;
export default class TitleSetter extends React.Component<ITitleSetterProps, {}> {
  static changedListeners = new Map<TitleReader, () => void>();
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
      TitleSetter.changedListeners.forEach((listener) => listener());
    }
  }
  public componentDidUpdate(prevProps: ITitleSetterProps) {
    if ((prevProps.children || "") !== (this.props.children || "")) {
      document.title = this.props.children || "";
      TitleSetter.changedListeners.forEach((listener) => listener());
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