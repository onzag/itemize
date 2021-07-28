import React from "react";
import { RichElement } from "../../../internal/text/serializer";

const CurrentElementContext = React.createContext<RichElement>(null);

interface ICurrentelementProviderProps {
  element: RichElement;
}

interface ICurrentElementRetrieverProps {
  passProps: any;
  fn: any;
}

export class CurrentElementProvider extends React.PureComponent<ICurrentelementProviderProps> {
  public render() {
    return (
      <CurrentElementContext.Provider value={this.props.element}>{this.props.children}</CurrentElementContext.Provider>
    )
  }
}

export class CurrentElementRetriever extends React.PureComponent<ICurrentElementRetrieverProps> {
  constructor(props: ICurrentElementRetrieverProps) {
    super(props);

    this.consume = this.consume.bind(this);
  }

  public consume(element: RichElement) {
    return this.props.fn(this.props.passProps, element);
  }

  public render() {
    return (
      <CurrentElementContext.Consumer>{this.consume}</CurrentElementContext.Consumer>
    )
  }
}