import React from "react";

interface IHTMLResourceLoaderProps {
  location: string;
  wrapper?: string;
  wrapperClassName?: string;
}

interface IHTMLResourceLoaderState {
  htmlContent: string;
}

export default class HTMLResourceLoader
  extends React.PureComponent<IHTMLResourceLoaderProps, IHTMLResourceLoaderState> {
  constructor(props: IHTMLResourceLoaderProps) {
    super(props);

    this.state = {
      htmlContent: null,
    };
  }
  public async load() {
    if (this.props.location === null || this.state.htmlContent !== null) {
      this.setState({
        htmlContent: null,
      });
      if (this.props.location === null) {
        return;
      }
    }

    try {
      const htmlContent =
        await fetch("/rest/resource/" + this.props.location).then((v) => v.text());
      this.setState({
        htmlContent,
      });
    } catch (err) {
      // DO NOTHING
    }
  }
  public componentDidMount() {
    this.load();
  }
  public componentDidUpdate(prevProps: IHTMLResourceLoaderProps) {
    if (prevProps.location !== this.props.location) {
      this.load();
    }
  }
  public render() {
    const WrapperComponent: any = this.props.wrapper || "div";

    return (
      <WrapperComponent
        className={this.props.wrapperClassName}
        dangerouslySetInnerHTML={{__html: this.state.htmlContent}}
      />
    );
  }
}
