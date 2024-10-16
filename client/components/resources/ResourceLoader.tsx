/**
 * This file contains the loader for html resources that lay within
 * the application and are part of its buildnumber (aka static) with caching
 * functionality
 * 
 * TODO this is incomplete as the ssr context is not properly collecting
 *
 * @module
 */

import type Root from "../../../base/Root";
import React, { useContext } from "react";
import { ISSRContextType, SSRContext } from "../../internal/providers/ssr-provider";
import { useRootRetriever } from "../root/RootRetriever";
import type { IAppDataType } from "../../../server";
import type { IResourceCollectionResult } from "../../../server/ssr/collect";
import { TokenContext } from "../../internal/providers/token-provider";

const SSR_GRACE_TIME = 10000;
const LOAD_TIME = (new Date()).getTime();

/**
 * The props for the html resource loader
 */
export interface IResourceLoaderProps {
  /**
   * Includes the token in the header for usage in validation as token
   */
  includeToken?: boolean;
  /**
   * the source path as a string, by default it is /rest/resource/
   */
  path?: string;
  /**
   * The server side resolver
   * to realize how this is resolved we need to support resources
   * in our SSR and request manager
   * 
   * does not support binary types
   */
  serverSideResolver?: (appData: IAppDataType, fullsrc: string) => IResourceCollectionResult | Promise<IResourceCollectionResult>;
  /**
   * A client side resolver to resolve instead of using fetch
   * 
   * does not support binary types
   */
  clientSideResolver?: (fullsrc: string) => string | Promise<string>;
  /**
   * the source as a string, without the /rest/resource/ part, which is
   * defined in the path
   */
  src?: string;
  /**
   * To define how the data is to be used
   */
  children: (data: any, loading: boolean, failed: boolean) => React.ReactNode;
  /**
   * sw cacheable flag, defaults to true
   */
  swCacheable?: boolean;
  /**
   * sw network first flag, defaults to false
   */
  swNetworkFirst?: boolean;
  /**
   * sw recheck flag, rechecks the content after done, defaults to false
   */
  swRecheck?: boolean;
  /**
   * Causes the resource to be requested with pooling
   */
  pollEvery?: number;
  /**
   * The content will not change during loading
   * and it will be mantained as value so that the
   * screen does not blink
   */
  keepContentDuringLoading?: boolean;
  /**
   * Type to load
   */
  type: "text" | "json" | "binary-blob" | "binary-arraybuffer";
}

/**
 * The actual props need access to the SSR context as resources can indeed be loaded in the server
 * side to they immediately execute
 */
interface IActualResourceLoaderProps extends IResourceLoaderProps {
  ssrContext: ISSRContextType;
  root: Root;
  token: string;
}

/**
 * Now we get the state, which is the html content
 * whether this one is loading or it has failed
 */
interface IActualResourceLoaderState {
  content: string;
  loading: boolean;
  failed: boolean;
}

/**
 * The actual html resource loader with access to the SSR context
 */
class ActualResourceLoader
  extends React.PureComponent<IActualResourceLoaderProps, IActualResourceLoaderState> {

  private isUnmounted: boolean = false;

  private pollIntervalSetAt: number = null;
  private pollInterval: any = null;

  public static async getDerivedServerSideStateFromProps(props: IActualResourceLoaderProps) {
    let path = props.path || "/rest/resource/";
    if (!path.endsWith("/")) {
      path += "/";
    }
    const actualSrc = path + (props.src[0] === "/" ? props.src.substr(1) : props.src);

    // cannot resolve in the server side
    if (!actualSrc.startsWith("/rest/resource/") && !props.serverSideResolver) {
      return null;
    }

    const value = await props.root.callRequestManagerResource(actualSrc, props.serverSideResolver);
    return {
      content: props.type === "json" ? JSON.parse(value) : value,
      loading: false,
      failed: false,
    }
  }

  constructor(props: IActualResourceLoaderProps) {
    super(props);

    if (props.serverSideResolver && (props.type === "binary-blob" || props.type === "binary-arraybuffer")) {
      throw new Error("Used a ResourceLoader with a " + props.type + " resource with a server side resolver");
    }

    if (props.clientSideResolver && (props.type === "binary-blob" || props.type === "binary-arraybuffer")) {
      throw new Error("Used a ResourceLoader with a " + props.type + " resource with a client side side resolver");
    }

    // so first we need to see if it's in our ssr context
    let content: string = null;
    // if we have a ssr context at all that is
    if (props.ssrContext) {
      let path = props.path || "/rest/resource/";
      if (!path.endsWith("/")) {
        path += "/";
      }
      const actualSrc = path + (props.src[0] === "/" ? props.src.substr(1) : props.src);
      // and try to set that as the value if we find it
      content = props.ssrContext.resources[actualSrc] || null;

      if (props.type === "json") {
        content = JSON.parse(content);
      }
    }

    // and set the state for this
    this.state = {
      content,
      loading: false,
      failed: false,
    };

    this.load = this.load.bind(this);
  }

  public componentWillUnmount() {
    this.isUnmounted = true;
  }

  /**
   * Performs the loading of a html resource
   */
  public async load() {
    if (this.props.pollEvery) {
      if (this.props.pollEvery !== this.pollIntervalSetAt) {
        clearInterval(this.pollInterval);
        setInterval(this.load, this.props.pollEvery * 1000);
        this.pollIntervalSetAt = this.props.pollEvery;
      }
    } else {
      this.pollIntervalSetAt = null;
      clearInterval(this.pollInterval);
    }

    let path = this.props.path || "/rest/resource/";
    if (!path.endsWith("/")) {
      path += "/";
    }
    // now just like we did in the constructor we calculate this form
    const actualSrc = path + (this.props.src[0] === "/" ? this.props.src.substr(1) : this.props.src);

    const shouldRequestNewAlways = (new Date()).getTime() - LOAD_TIME > SSR_GRACE_TIME;

    // we run this request in order to cache, even when it's not really used
    const headers: any = {
      "sw-cacheable": typeof this.props.swCacheable ? JSON.stringify(this.props.swCacheable) : "true",
      "sw-network-first": typeof this.props.swNetworkFirst ? JSON.stringify(this.props.swNetworkFirst) : "false",
      "sw-recheck": typeof this.props.swRecheck ? JSON.stringify(this.props.swRecheck) : "false",
    };

    if (this.props.includeToken) {
      headers.token = this.props.token;
    }

    // and this executes regardless we have an html content or not, so we are going to check
    // our ssr context again here, and who knows, the user might be going back or doing
    // something that we can take advantage of our ssr context once again
    if (
      this.props.ssrContext &&
      (this.props.ssrContext.resources[actualSrc]) &&
      !shouldRequestNewAlways
    ) {
      // so we found it there so we get the value
      const contentNew = (this.props.ssrContext.resources[actualSrc]);
      // but it's only necessary to change the state if it is really
      // going to differ in a meaningful way
      if (contentNew !== this.state.content) {
        this.setState({
          content: this.props.type === "json" ? JSON.parse(contentNew) : contentNew,
          failed: false,
          loading: false,
        });
      }

      if ((this.props.swCacheable || this.props.swRecheck) && !this.props.clientSideResolver) {
        // now we are going to call the API anyway
        // the reason for this is that we want to tickle the service
        // worker to cache this file for the given buildnumber
        const loadURL = actualSrc;
        fetch(loadURL, {
          headers,
          credentials: "omit",
        });
      }
      // return
      return;
    }

    // otherwise here we are going to clear everything
    // yes we set loading to false, the reason is that
    // we might not have a src at all, and we don't want to show
    // a loading component for 1 microsecond or how fast the
    // interner might be, so for now, we just clear it up
    this.setState({
      failed: false,
      loading: false,
    });

    // so now we have this timeout, if the timeout lapses
    // before we have fetched then we can say we are loading, so
    // no need for flickering
    const waitTimeoutForLoading = setTimeout(() => {
      if (!this.isUnmounted) {
        if (this.props.keepContentDuringLoading) {
          this.setState({
            loading: true,
          });
        } else {
          this.setState({
            content: null,
            loading: true,
          });
        }
      }
    }, 600);

    // now the load url we will use
    const loadURL = actualSrc;

    // and we try to load
    try {
      if (this.props.clientSideResolver) {
        const response = await this.props.clientSideResolver(loadURL);
        clearTimeout(waitTimeoutForLoading);
        !this.isUnmounted && this.setState({
          content: this.props.type === "json" ? JSON.parse(response) : response,
          loading: false,
          failed: false,
        });
        return;
      }

      // and here we run fetch
      const fetchResponse =
        await fetch(loadURL, {
          headers,
          credentials: "omit",
        });

      // if we have bad status
      if (
        fetchResponse.status !== 200 &&
        fetchResponse.status !== 0
      ) {
        // throw an error to trigger it into catch clause
        throw new Error("Invalid status code");
      }

      // now we can read our text content
      const content = this.props.type === "text" ? await fetchResponse.text() : (
        this.props.type === "binary-blob" ? await fetchResponse.blob() : (
          this.props.type === "binary-arraybuffer" ? await fetchResponse.arrayBuffer() : await fetchResponse.json()
        )
      );
      // and we can stop the timer for wait for loading
      clearTimeout(waitTimeoutForLoading);
      // and finally set our state with our new shiny html
      // content
      !this.isUnmounted && this.setState({
        content,
        loading: false,
        failed: false,
      });
    } catch (err) {
      // we have failed, clear the timeout, and show it
      clearTimeout(waitTimeoutForLoading);
      !this.isUnmounted && this.setState({
        content: null,
        loading: false,
        failed: true,
      });
    }
  }
  public componentDidMount() {
    // on mount we run the load
    this.load();
  }
  public componentDidUpdate(prevProps: IActualResourceLoaderProps) {
    // run the load function if the src changes
    if (prevProps.src !== this.props.src || prevProps.path !== this.props.path) {
      this.load();
    }
  }
  public render() {
    return this.props.children(this.state.content, this.state.loading, this.state.failed);
  }
}

/**
 * Displays a html resource that is included within the resources that this application
 * is shipped with
 * @param props the resource loader props
 * @returns an react component that wraps this html content
 */
export default function ResourceLoader(props: IResourceLoaderProps) {
  const root = useRootRetriever();
  const ssrContext = useContext(SSRContext);
  if (props.includeToken) {
    return (
      <TokenContext.Consumer>
        {(tokenInfo) => (
          <ActualResourceLoader {...props} ssrContext={ssrContext} root={root.root} token={tokenInfo.token} />
        )}
      </TokenContext.Consumer>
    )
  }
  return (
    <ActualResourceLoader {...props} ssrContext={ssrContext} root={root.root} token={null} />
  );
}
