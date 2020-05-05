import React from "react";

interface IHTMLResourceLoaderProps {
  src: string;
  wrapper?: string;
  wrapperClassName?: string;
  loadingComponent?: React.ReactNode;
  failedComponent?: React.ReactNode;
}

interface IHTMLResourceLoaderState {
  htmlContent: string;
  loading: boolean;
  failed: boolean;
}

export default class HTMLResourceLoader
  extends React.PureComponent<IHTMLResourceLoaderProps, IHTMLResourceLoaderState> {
  constructor(props: IHTMLResourceLoaderProps) {
    super(props);

    this.state = {
      htmlContent: null,
      loading: false,
      failed: false,
    };
  }
  public async load() {
    this.setState({
      htmlContent: null,
      failed: false,
      loading: false,
    });
    if (this.props.src === null) {
      return;
    }

    const waitTimeoutForLoading = setTimeout(() => {
      this.setState({
        loading: true,
      });
    }, 600);

    try {
      const htmlFetchResponse =
        await fetch("/rest/resource/" + this.props.src, {
          headers: {
            "sw-cacheable": "true",
          },
        });

      if (
        htmlFetchResponse.status !== 200 &&
        htmlFetchResponse.status !== 0
      ) {
        throw new Error("Invalid status code");
      }

      const htmlContent = await htmlFetchResponse.text();
      clearTimeout(waitTimeoutForLoading);
      this.setState({
        htmlContent,
        loading: false,
        failed: false,
      });
    } catch (err) {
      clearTimeout(waitTimeoutForLoading);
      this.setState({
        htmlContent: null,
        loading: false,
        failed: true,
      });
    }
  }
  public componentDidMount() {
    this.load();
  }
  public componentDidUpdate(prevProps: IHTMLResourceLoaderProps) {
    if (prevProps.src !== this.props.src) {
      this.load();
    }
  }
  public render() {
    if (this.state.loading && this.props.loadingComponent) {
      return this.props.loadingComponent;
    } else if (this.state.failed && this.props.failedComponent) {
      return this.props.failedComponent;
    }

    const WrapperComponent: any = this.props.wrapper || "div";
    return (
      <WrapperComponent
        className={this.props.wrapperClassName}
        dangerouslySetInnerHTML={{__html: this.state.htmlContent}}
      />
    );
  }
}
