/**
 * This file contains the loader for html resources that lay within
 * the application and are part of its buildnumber (aka static) with caching
 * functionality
 *
 * @module
 */

import React from "react";
import { ISSRContextType, SSRContext } from "../../../client/internal/providers/ssr-provider";

/**
 * The props for the html resource loader
 */
interface IHTMLResourceLoaderProps {
  /**
   * the source as a string, without the /rest/resource/ part
   */
  src: string;
  /**
   * an optional wrapper component string, eg, "div", "span", etc...
   */
  wrapper?: string;
  /**
   * an optional wrapper class name
   */
  wrapperClassName?: string;
  /**
   * An optional component to render during the load
   */
  loadingComponent?: React.ReactNode;
  /**
   * An optional component to render if it fails to load
   */
  failedComponent?: React.ReactNode;
}

/**
 * The actual props need access to the SSR context as resources can indeed be loaded in the server
 * side to they immediately execute
 */
interface IActualHTMLResourceLoaderProps extends IHTMLResourceLoaderProps {
  ssrContext: ISSRContextType,
}

/**
 * Now we get the state, which is the html content
 * whether this one is loading or it has failed
 */
interface IActualHTMLResourceLoaderState {
  htmlContent: string;
  loading: boolean;
  failed: boolean;
}

/**
 * The actual html resource loader with access to the SSR context
 */
class ActualHTMLResourceLoader
  extends React.PureComponent<IActualHTMLResourceLoaderProps, IActualHTMLResourceLoaderState> {

  constructor(props: IActualHTMLResourceLoaderProps) {
    super(props);

    // so first we need to see if it's in our ssr context
    let htmlContent: string = null;
    // if we have a ssr context at all that is
    if (props.ssrContext) {
      // so we figure the other form of the url as it's tricky it can be /myresource or myresource
      // and we might want to check both of them
      const otherFormSrcURL = props.src[0] === "/" ? props.src.substr(1) : "/" + props.src;
      // and try to set that as the value if we find it
      htmlContent = props.ssrContext[props.src] || props.ssrContext[otherFormSrcURL] || null;
    }
    
    // and set the state for this
    this.state = {
      htmlContent,
      loading: false,
      failed: false,
    };
  }

  /**
   * Performs the loading of a html resource
   */
  public async load() {
    // now just like we did in the constructor we calculate this form
    const otherFormSrcURL = this.props.src[0] === "/" ? this.props.src.substr(1) : "/" + this.props.src;

    // and this executes regardless we have an html content or not, so we are going to check
    // our ssr context again here, and who knows, the user might be going back or doing
    // something that we can take advantage of our ssr context once again
    if (
      this.props.ssrContext &&
      (this.props.ssrContext.resources[this.props.src] || this.props.ssrContext.resources[otherFormSrcURL])
    ) {
      // so we found it there so we get the value
      const htmlContentNew = (this.props.ssrContext.resources[this.props.src] || this.props.ssrContext.resources[otherFormSrcURL]);
      // but it's only necessary to change the state if it is really
      // going to differ in a meaningful way
      if (htmlContentNew !== this.state.htmlContent) {
        this.setState({
          htmlContent: htmlContentNew,
          failed: false,
          loading: false,
        });
      }

      // now we are going to call the API anyway
      // the reason for this is that we want to tickle the service
      // worker to cache this file for the given buildnumber
      const loadURL = this.props.src[0] === "/" ?
        "/rest/resource" + this.props.src :
        "/rest/resource/" + this.props.src;

      // we run this request in order to cache, even when it's not really used
      fetch(loadURL, {
        headers: {
          "sw-cacheable": "true",
        },
      });
      // return
      return;
    }

    // otherwise here we are going to clear everything
    // yes we set loading to false, the reason is that
    // we might not have a src at all, and we don't want to show
    // a loading component for 1 microsecond or how fast the
    // interner might be, so for now, we just clear it up
    this.setState({
      htmlContent: null,
      failed: false,
      loading: false,
    });

    // if we have no src, we can return safely
    // the result will be the same
    if (this.props.src === null) {
      return;
    }

    // so now we have this timeout, if the timeout lapses
    // before we have fetched then we can say we are loading, so
    // no need for flickering
    const waitTimeoutForLoading = setTimeout(() => {
      this.setState({
        loading: true,
      });
    }, 600);

    // now the load url we will use
    const loadURL = this.props.src[0] === "/" ?
      "/rest/resource" + this.props.src :
      "/rest/resource/" + this.props.src;

    // and we try to load
    try {
      // and here we run fetch
      const htmlFetchResponse =
        await fetch(loadURL, {
          headers: {
            "sw-cacheable": "true",
          },
        });

      // if we have bad status
      if (
        htmlFetchResponse.status !== 200 &&
        htmlFetchResponse.status !== 0
      ) {
        // throw an error to trigger it into catch clause
        throw new Error("Invalid status code");
      }

      // now we can read our text content
      const htmlContent = await htmlFetchResponse.text();
      // and we can stop the timer for wait for loading
      clearTimeout(waitTimeoutForLoading);
      // and finally set our state with our new shiny html
      // content
      this.setState({
        htmlContent,
        loading: false,
        failed: false,
      });
    } catch (err) {
      // we have failed, clear the timeout, and show it
      clearTimeout(waitTimeoutForLoading);
      this.setState({
        htmlContent: null,
        loading: false,
        failed: true,
      });
    }
  }
  public componentDidMount() {
    // on mount we run the load
    this.load();
  }
  public componentDidUpdate(prevProps: IActualHTMLResourceLoaderProps) {
    // run the load function if the src changes
    if (prevProps.src !== this.props.src) {
      this.load();
    }
  }
  public render() {
    // if we are loading and we have a loading component
    if (this.state.loading && this.props.loadingComponent) {
      return this.props.loadingComponent;
    // same for failed
    } else if (this.state.failed && this.props.failedComponent) {
      return this.props.failedComponent;
    }

    // otherwise we return this, note that even if you have a loading
    // component unless the timer specified in the time of grace has passed
    // the loading state will not display because of this time of grace for the UI
    const WrapperComponent: any = this.props.wrapper || "div";
    return (
      <WrapperComponent
        className={this.props.wrapperClassName}
        dangerouslySetInnerHTML={{__html: this.state.htmlContent}}
      />
    );
  }
}

/**
 * Displays a html resource that is included within the resources that this application
 * is shipped with
 * @param props the resource loader props
 * @returns an react component that wraps this html content
 */
export default function HTMLResourceLoader(props: IHTMLResourceLoaderProps) {
  return (
    <SSRContext.Consumer>
      {(value) => (
        <ActualHTMLResourceLoader {...props} ssrContext={value}/>
      )}
    </SSRContext.Consumer>
  )
}
