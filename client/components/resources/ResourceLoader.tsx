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
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { ISSRContextType, SSRContext } from "../../internal/providers/ssr-provider";
import { useRootRetriever } from "../root/RootRetriever";
import type { IAppDataType } from "../../../server";
import type { IResourceCollectionResult } from "../../../server/ssr/collect";
import { TokenContext } from "../../internal/providers/token-provider";
import { SSRError } from "../../../client/providers/item/hook";

const SSR_GRACE_TIME = 10000;
const LOAD_TIME = (new Date()).getTime();

export interface IResourceLoaderOptions {
  /**
   * An arbitrary id for the resource to load
   * a change of id will cause the resource to reload
   * normally it only triggers on path or src changes
   * as that is its assumed id, use this to do otherwise
   */
  id?: string;
  /**
   * Includes the token in the header for usage in validation as token
   * 
   * NOTE changing this property will not re-resolve please use id instead
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
   * 
   * NOTE changing this property will not re-resolve please use id instead
   */
  serverSideResolver?: (appData: IAppDataType, fullsrc: string) => IResourceCollectionResult | Promise<IResourceCollectionResult>;
  /**
   * A client side resolver to resolve instead of using fetch
   * 
   * does not support binary types
   * 
   * NOTE changing this property will not re-resolve please use id instead
   */
  clientSideResolver?: (fullsrc: string) => string | Promise<string>;
  /**
   * the source as a string, without the /rest/resource/ part, which is
   * defined in the path
   */
  src?: string;
  /**
   * sw cacheable flag, defaults to true
   * 
   * NOTE changing this property will not re-resolve please use id instead
   */
  swCacheable?: boolean;
  /**
   * sw network first flag, defaults to false
   * 
   * NOTE changing this property will not re-resolve please use id instead
   */
  swNetworkFirst?: boolean;
  /**
   * sw recheck flag, rechecks the content after done, defaults to false
   * 
   * NOTE changing this property will not re-resolve please use id instead
   */
  swRecheck?: boolean;
  /**
   * Causes the resource to be requested with pooling
   * 
   * NOTE changing this property will not re-resolve please use id instead
   */
  pollEvery?: number;
  /**
   * The content will not change during loading
   * and it will be mantained as value so that the
   * screen does not blink
   * 
   * NOTE changing this property will not re-resolve please use id instead
   */
  keepContentDuringLoading?: boolean;
  /**
   * Type to load
   * 
   * NOTE changing this property will not re-resolve please use id instead
   */
  type: "text" | "json" | "binary-blob" | "binary-arraybuffer";
}

export interface IResourceLoaderHookValue {
  data: any;
  loading: boolean;
  failed: boolean;
}

/**
 * The props for the html resource loader
 */
export interface IResourceLoaderProps extends IResourceLoaderOptions {
  /**
   * To define how the data is to be used
   */
  children: (data: any, loading: boolean, failed: boolean) => React.ReactNode;
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
  content: any;
  loading: boolean;
  failed: boolean;
}

function construct(props: IResourceLoaderOptions, ssrContext: ISSRContextType, root: Root) {
  if (props.serverSideResolver && (props.type === "binary-blob" || props.type === "binary-arraybuffer")) {
    throw new Error("Used a ResourceLoader with a " + props.type + " resource with a server side resolver");
  }

  if (props.clientSideResolver && (props.type === "binary-blob" || props.type === "binary-arraybuffer")) {
    throw new Error("Used a ResourceLoader with a " + props.type + " resource with a client side side resolver");
  }

  // so first we need to see if it's in our ssr context
  let content: string = null;
  // if we have a ssr context at all that is
  if (root.hasRequestManager() || ssrContext) {
    let path = props.path || "/rest/resource/";
    if (!path.endsWith("/")) {
      path += "/";
    }
    const actualSrc = path + (props.src[0] === "/" ? props.src.substr(1) : props.src);
    // and try to set that as the value if we find it
    content = (root.hasRequestManager() ? root.getRequestManagerResource(actualSrc) : ssrContext.resources[actualSrc]) || null;

    if (props.type === "json") {
      content = JSON.parse(content);
    }
  }

  return content;
}

async function doLoad(
  options: IResourceLoaderOptions,
  ssrContext: ISSRContextType,
  token: string,
  setState: (v: Partial<IActualResourceLoaderState>) => void,
  isUnmounted: {
    readonly current: boolean;
  },
  pollIntervalSetAt: {
    current: number;
  },
  pollInterval: {
    current: NodeJS.Timer;
  },
  currentActualState: {
    readonly current: IActualResourceLoaderState,
  },
) {
  // this will set polling even if it was
  // already resolved
  if (options.pollEvery) {
    if (options.pollEvery !== pollIntervalSetAt.current) {
      clearInterval(pollInterval.current);
      pollInterval.current = setInterval(
        doLoad.bind(null, options, ssrContext, token, setState, isUnmounted, pollIntervalSetAt, pollInterval, currentActualState),
        options.pollEvery * 1000,
      );
      pollIntervalSetAt.current = options.pollEvery;
    }
  } else {
    clearInterval(pollInterval.current);
    pollIntervalSetAt.current = null;
  }

  let path = options.path || "/rest/resource/";
  if (!path.endsWith("/")) {
    path += "/";
  }
  // now just like we did in the constructor we calculate this form
  const actualSrc = path + (options.src[0] === "/" ? options.src.substr(1) : options.src);

  const shouldRequestNewAlways = (new Date()).getTime() - LOAD_TIME > SSR_GRACE_TIME;

  // we run this request in order to cache, even when it's not really used
  const headers: any = {
    "sw-cacheable": typeof options.swCacheable ? JSON.stringify(options.swCacheable) : "true",
    "sw-network-first": typeof options.swNetworkFirst ? JSON.stringify(options.swNetworkFirst) : "false",
    "sw-recheck": typeof options.swRecheck ? JSON.stringify(options.swRecheck) : "false",
  };

  if (options.includeToken && token) {
    headers.token = token;
  }

  // and this executes regardless we have an html content or not, so we are going to check
  // our ssr context again here, and who knows, the user might be going back or doing
  // something that we can take advantage of our ssr context once again
  if (
    ssrContext &&
    (ssrContext.resources[actualSrc]) &&
    !shouldRequestNewAlways
  ) {
    // so we found it there so we get the value
    const contentNew = (ssrContext.resources[actualSrc]);
    // but it's only necessary to change the state if it is really
    // going to differ in a meaningful way
    if (contentNew !== currentActualState.current.content) {
      setState({
        content: options.type === "json" ? JSON.parse(contentNew) : contentNew,
        failed: false,
        loading: false,
      });
    }

    if ((options.swCacheable || options.swRecheck) && !options.clientSideResolver) {
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
  setState({
    failed: false,
    loading: false,
  });

  // so now we have this timeout, if the timeout lapses
  // before we have fetched then we can say we are loading, so
  // no need for flickering
  const waitTimeoutForLoading = setTimeout(() => {
    if (!isUnmounted.current) {
      if (options.keepContentDuringLoading) {
        setState({
          loading: true,
        });
      } else {
        setState({
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
    if (options.clientSideResolver) {
      const response = await options.clientSideResolver(loadURL);
      clearTimeout(waitTimeoutForLoading);
      !isUnmounted.current && setState({
        content: options.type === "json" ? JSON.parse(response) : response,
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
    const content = options.type === "text" ? await fetchResponse.text() : (
      options.type === "binary-blob" ? await fetchResponse.blob() : (
        options.type === "binary-arraybuffer" ? await fetchResponse.arrayBuffer() : await fetchResponse.json()
      )
    );
    // and we can stop the timer for wait for loading
    clearTimeout(waitTimeoutForLoading);
    // and finally set our state with our new shiny html
    // content
    !isUnmounted.current && setState({
      content,
      loading: false,
      failed: false,
    });
  } catch (err) {
    // we have failed, clear the timeout, and show it
    clearTimeout(waitTimeoutForLoading);
    !isUnmounted.current && setState({
      content: null,
      loading: false,
      failed: true,
    });
  }
}

/**
 * The actual html resource loader with access to the SSR context
 */
class ActualResourceLoader
  extends React.PureComponent<IActualResourceLoaderProps, IActualResourceLoaderState> {

  private isUnmounted: boolean = false;

  private pollIntervalSetAt: number = null;
  private pollInterval: NodeJS.Timer = null;

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

    // and set the state for this
    this.state = {
      content: construct(props, props.ssrContext, props.root),
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
  public load() {
    // clear any potential previous polled
    clearInterval(this.pollInterval);

    const $this = this;
    doLoad(this.props, this.props.ssrContext, this.props.token, this.setState.bind(this), {
      get current() {
        return $this.isUnmounted;
      },
    }, {
      get current() {
        return $this.pollIntervalSetAt;
      },
      set current(v) {
        $this.pollIntervalSetAt = v;
      }
    }, {
      get current() {
        return $this.pollInterval;
      },
      set current(v) {
        $this.pollInterval = v;
      }
    }, {
      get current() {
        return $this.state;
      }
    });
  }
  public componentDidMount() {
    // on mount we run the load
    this.load();
  }
  public componentDidUpdate(prevProps: IActualResourceLoaderProps) {
    // run the load function if the src changes
    if (
      prevProps.src !== this.props.src ||
      prevProps.path !== this.props.path ||
      prevProps.id !== this.props.id
    ) {
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
  const tokenInfo = useContext(TokenContext);
  return (
    <ActualResourceLoader {...props} ssrContext={ssrContext} root={root.root} token={tokenInfo.token} />
  );
}

export function useResourceLoader(options: IResourceLoaderOptions) {
  // we will do this a bit differently from the item which is more precise
  const tokenInfo = useContext(TokenContext);
  const root = useRootRetriever();
  const ssrContext = useContext(SSRContext);

  if (root.root.hasRequestManager()) {
    let path = options.path || "/rest/resource/";
    if (!path.endsWith("/")) {
      path += "/";
    }
    const actualSrc = path + (options.src[0] === "/" ? options.src.substr(1) : options.src);

    // cannot resolve in the server side
    if (!actualSrc.startsWith("/rest/resource/") && !options.serverSideResolver) {
      
    } else if (root.root.needsRequestManagerResource(actualSrc)) {
      throw new SSRError(async () => {
        await root.root.callRequestManagerResource(actualSrc, options.serverSideResolver);
      });
    }
  }

  // make our base state and the set state emulation
  const [stateBase, setStateBase] = useState<IActualResourceLoaderState>(() => ({
    content: construct(options, ssrContext, root.root),
    loading: false,
    failed: false,
  }));

  const alwaysUpToDateStateRef = useRef(stateBase);
  alwaysUpToDateStateRef.current = stateBase;

  const setState = useCallback((newState: Partial<IActualResourceLoaderState>) => {
    const newValue = {
      ...alwaysUpToDateStateRef.current,
      ...newState,
    };
    alwaysUpToDateStateRef.current = newValue;
    setStateBase(newValue);
  }, []);


  // set our private internal variables
  const pollIntervalSetAtRef = useRef<number>(null);
  const pollIntervalRef = useRef<NodeJS.Timer>(null);

  // we use this to cheap emulate component did update
  // but without it, just check that what we last loaded
  // is different, by default we have last loaded
  // our current, however the load function gets called on
  // mount regardless of state because load always gets called
  const loadedPath = useRef(options.path);
  const loadedSrc = useRef(options.src);
  const loadedId = useRef(options.id);

  // this is our load function
  const load = useCallback(() => {
    loadedPath.current = options.path;
    loadedSrc.current = options.src;

    // clear any potential previous polled
    clearInterval(pollIntervalRef.current);

    // load from new
    doLoad(options, ssrContext, tokenInfo.token, setState, isUnmountedRef, pollIntervalSetAtRef, pollIntervalRef, alwaysUpToDateStateRef);
  }, [options, ssrContext, tokenInfo.token]);


  // now here we set the unmounted ref and call load regardless
  // because we will always try to load, eg. to set poll every
  // and whatnot even if the content was loaded by SSR
  const isUnmountedRef = useRef(false);
  useEffect(() => {
    load();
    return () => {
      isUnmountedRef.current = true;
    }
  }, []);

  // load from new
  useEffect(() => {
    // only load if the path or the src have changed
    // other options will have no effect
    if (
      loadedPath.current !== options.path ||
      loadedSrc.current !== options.src ||
      loadedId.current !== options.id
    ) {
      load();
    }
  }, [options.src, options.path, options.id, load]);

  const memoValue = useMemo(() => {
    return (
      {
        value: stateBase.content,
        loading: stateBase.loading,
        failed: stateBase.failed,
      }
    );
  }, [
    stateBase.content,
    stateBase.loading,
    stateBase.failed,
  ])

  return memoValue;
}