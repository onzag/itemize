import React from "react";
import { ISSRContextType, SSRContext } from "../../../client/internal/providers/ssr-provider";

interface IHTMLResourceLoaderProps {
  src: string;
  wrapper?: string;
  wrapperClassName?: string;
  loadingComponent?: React.ReactNode;
  failedComponent?: React.ReactNode;
}

interface IActualHTMLResourceLoaderProps extends IHTMLResourceLoaderProps {
  ssrContext: ISSRContextType,
}

interface IActualHTMLResourceLoaderState {
  htmlContent: string;
  loading: boolean;
  failed: boolean;
}

class ActualHTMLResourceLoader
  extends React.PureComponent<IActualHTMLResourceLoaderProps, IActualHTMLResourceLoaderState> {

  constructor(props: IActualHTMLResourceLoaderProps) {
    super(props);

    let htmlContent: string = null;
    if (props.ssrContext) {
      htmlContent = props.ssrContext[props.src] || null;
    }
    this.state = {
      htmlContent,
      loading: false,
      failed: false,
    };
  }
  public async load() {
    if (
      this.props.ssrContext &&
      this.props.ssrContext[this.props.src]
    ) {
      if (this.props.ssrContext[this.props.src] !== this.state.htmlContent) {
        this.setState({
          htmlContent: this.props.ssrContext[this.props.src],
          failed: false,
          loading: false,
        });
      }

      // we run this request in order to cache, even when it's not really used
      fetch("/rest/resource/" + this.props.src, {
        headers: {
          "sw-cacheable": "true",
        },
      });
      return;
    }
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
  public componentDidUpdate(prevProps: IActualHTMLResourceLoaderProps) {
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

export default function HTMLResourceLoader(props: IHTMLResourceLoaderProps) {
  return (
    <SSRContext.Consumer>
      {(value) => (
        <ActualHTMLResourceLoader {...props} ssrContext={value}/>
      )}
    </SSRContext.Consumer>
  )
}