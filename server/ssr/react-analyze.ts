import uuid from "uuid";
import React from "react";

const {
  ReactCurrentDispatcher
} = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function noop(): void { }

let currentContextMap: Map<any, any> = null;

function readContextValue(context: any) {
  const value = currentContextMap.get(context);
  if (value !== undefined) {
    return value
  }

  // Return default if context has no value yet
  return context._currentValue;
}

function readContext(context: any, _: void | number | boolean) {
  return readContextValue(context)
}

function useContext(context: any, _: void | number | boolean) {
  return readContextValue(context)
}

function useState<S>(
  initialState: (() => S) | S
): [S, any] {
  return [typeof initialState === "function" ? (initialState as any)() : initialState, noop];
}

function useReducer<S, I, A>(
  reducer: any,
  initialArg: any,
  init?: any
): [S, any] {
  return [initialArg, noop];
}

function useMemo<T>(memoValue: () => T, deps: Array<any>): T {
  return memoValue();
}

function useRef<T>(initialValue: T): { current: T } {
  return {
    current: initialValue,
  }
}

function useOpaqueIdentifier(): string {
  // doesn't matter much since we don't use this anywhere for practical usage
  return "R:" + uuid.v1();
}

function useCallback<T>(callback: T, deps: Array<any>): T {
  return callback;
}

function useMutableSource<Source, Snapshot>(
  source: any,
  getSnapshot: any,
  _subscribe: any
): Snapshot {
  return getSnapshot(source._source)
}

function useTransition(): [any, boolean] {
  return [noop, false]
}

function useDeferredValue<T>(input: T): T {
  return input
}

export const Dispatcher = {
  readContext,
  useContext,
  useMemo,
  useReducer,
  useRef,
  useState,
  useCallback,
  useMutableSource,
  useTransition,
  useDeferredValue,
  useOpaqueIdentifier,
  useId: useOpaqueIdentifier,
  // ignore useLayout effect completely as usage of it will be caught
  // in a subsequent render pass
  useLayoutEffect: noop,
  // useImperativeHandle is not run in the server environment
  useImperativeHandle: noop,
  // Effects are not run in the server environment.
  useEffect: noop,
  // Debugging effect
  useDebugValue: noop
}

const symbolFor = Symbol.for;
const REACT_ELEMENT_TYPE = symbolFor('react.element');
const REACT_PORTAL_TYPE = symbolFor('react.portal');
const REACT_FRAGMENT_TYPE = symbolFor('react.fragment');
const REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
const REACT_PROFILER_TYPE = symbolFor('react.profiler');
const REACT_PROVIDER_TYPE = symbolFor('react.provider');
const REACT_CONTEXT_TYPE = symbolFor('react.context');
const REACT_CONCURRENT_MODE_TYPE = Symbol.for('react.concurrent_mode');
const REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
const REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
const REACT_MEMO_TYPE = symbolFor('react.memo');
const REACT_LAZY_TYPE = symbolFor('react.lazy');

function isConstructed(element: any) {
  return element.type && element.type.prototype && element.type.prototype.isReactComponent;
}

function getType(element: any) {
  switch (element.$$typeof) {
    case REACT_PORTAL_TYPE:
      return REACT_PORTAL_TYPE
    case REACT_ELEMENT_TYPE:
      switch (element.type) {
        case REACT_CONCURRENT_MODE_TYPE:
          return REACT_CONCURRENT_MODE_TYPE
        case REACT_FRAGMENT_TYPE:
          return REACT_FRAGMENT_TYPE
        case REACT_PROFILER_TYPE:
          return REACT_PROFILER_TYPE
        case REACT_STRICT_MODE_TYPE:
          return REACT_STRICT_MODE_TYPE
        case REACT_SUSPENSE_TYPE:
          return REACT_SUSPENSE_TYPE

        default: {
          switch (element.type && element.type.$$typeof) {
            case REACT_LAZY_TYPE:
              return REACT_LAZY_TYPE
            case REACT_MEMO_TYPE:
              return REACT_MEMO_TYPE
            case REACT_CONTEXT_TYPE:
              return REACT_CONTEXT_TYPE
            case REACT_PROVIDER_TYPE:
              return REACT_PROVIDER_TYPE
            case REACT_FORWARD_REF_TYPE:
              return REACT_FORWARD_REF_TYPE
            default:
              return REACT_ELEMENT_TYPE
          }
        }
      }

    default:
      return undefined
  }
}

export async function walkReactTree(
  element: any,
  contextMap: Map<any, any> = new Map(),
): Promise<void> {
  if (element === null || typeof element === "undefined") {
    return;
  }
  if (Array.isArray(element)) {
    await Promise.all(element.map((c) => walkReactTree(c, contextMap)));
  }

  // first let's check what type of react element we have got here
  const type = getType(element);
  // now let's check if we have a base type, like <div> or <span>
  const isBaseType = type === REACT_ELEMENT_TYPE && typeof element.type === "string";

  // if we got an element that is not a base
  if (type === REACT_ELEMENT_TYPE && !isBaseType) {
    // now we check if it's constructed
    const isComponentType = isConstructed(element);

    if (isComponentType) {
      const instance = new element.type(element.props);

      if (instance.state === undefined) {
        instance.state = null
      }

      if (element.type.getDerivedStateFromProps) {
        const newState = element.type.getDerivedStateFromProps(instance.props, instance.state);
        if (newState) {
          instance.state = Object.assign({}, instance.state, newState)
        }
      } else if (typeof instance.componentWillMount === "function") {
        instance.componentWillMount()
      } else if (typeof instance.UNSAFE_componentWillMount === "function") {
        instance.UNSAFE_componentWillMount()
      }

      instance._isMounted = true;

      if (element.type.getDerivedServerSideStateFromProps) {
        const newState = await element.type.getDerivedServerSideStateFromProps(instance.props, instance.state);
        if (newState) {
          instance.state = Object.assign({}, instance.state, newState)
        }
      }

      try {
        const childComponent = instance.render();
        await walkReactTree(childComponent, contextMap);
      } catch (err) {
        if (typeof element.type.getDerivedStateFromError === "function") {
          const newState = element.type.getDerivedStateFromError(err);
          if (newState) {
            instance.state = Object.assign({}, instance.state, newState)
          }

          const childComponent = instance.render();
          await walkReactTree(childComponent, contextMap);
        } else {
          throw err;
        }
      }

      if (
        typeof instance.getDerivedStateFromProps !== "function" &&
        (typeof instance.componentWillMount === "function" ||
          typeof instance.UNSAFE_componentWillMount === "function") &&
        typeof instance.componentWillUnmount === 'function'
      ) {
        try {
          instance.componentWillUnmount()
        } catch (_err) {}
      }

      instance._isMounted = false;

    } else {
      const originalDispatcher = ReactCurrentDispatcher.current;

      currentContextMap = contextMap;
      ReactCurrentDispatcher.current = Dispatcher;
      const childComponent = element.type(element.props);

      currentContextMap = null;
      ReactCurrentDispatcher.current = originalDispatcher;

      await walkReactTree(childComponent, contextMap);
    }
  } else if (type === REACT_PROVIDER_TYPE) {
    const newContextMap = new Map(contextMap);
    const contextToSet = element.type._context ? element.type._context : element.type;
    newContextMap.set(contextToSet, element.props.value);
    await walkReactTree(element.props.children, newContextMap);
  } else if (type === REACT_CONTEXT_TYPE) {
    const contextToRead = element.type._context ? element.type._context : element.type;
    let contextualValue = contextMap.get(contextToRead);
    if (contextualValue === undefined) {
      contextualValue = contextToRead._currentValue;
    }
    const apparentChild = element.props.children(contextualValue);
    await walkReactTree(apparentChild, contextMap);
  } else if (
    isBaseType ||
    type === REACT_FRAGMENT_TYPE ||
    type === REACT_SUSPENSE_TYPE ||
    type === REACT_STRICT_MODE_TYPE ||
    type === REACT_PROFILER_TYPE
  ) {
    await walkReactTree(element.props.children, contextMap);
  } else if (type === REACT_FORWARD_REF_TYPE) {
    const originalDispatcher = ReactCurrentDispatcher.current;

    currentContextMap = contextMap;
    ReactCurrentDispatcher.current = Dispatcher;
    const childComponent = element.type.render(element.props, element.ref);

    currentContextMap = null;
    ReactCurrentDispatcher.current = originalDispatcher;

    await walkReactTree(childComponent, contextMap);
  } else if (type === REACT_MEMO_TYPE) {
    const elementMemoed = element.type;

    // in order to handle memos of something, we will simply create
    // a fake element and pass the props and ref for this element so it's handled
    // accordingly, this will cause the elent to unwrap to what it memos
    // but keeping the props, it's a bit of a hack, but should work
    const fakeElement = {
      ...elementMemoed,
      ["$$typeof"]: REACT_ELEMENT_TYPE,
      key: element.key,
      ref: element.ref,
      props: element.props,
    };

    // and we will walk over that element
    await walkReactTree(fakeElement, contextMap);
  }
}