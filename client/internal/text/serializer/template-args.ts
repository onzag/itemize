import { IUIHandlerProps } from "./base";

/**
 * Interface to define context wrappers during a dynamic render
 */
export interface ITemplateArgsProperties {
  [name: string]:
    // internal context
    TemplateArgs |
    // mutating context or array
    MutatingTemplateArgs |
    // mutating function value
    MutatingFunctionArg |
    // standard array of context
    Array<TemplateArgs> |
    // a component for data-html
    React.ReactNode |
    // an ui handler
    React.ComponentType<IUIHandlerProps> |
    // a action function
    Function |
    // for text content and whatnot
    string |
    // for ifs
    boolean |
    // eh?
    number;
}

/**
 * Just takes a node and should return a node, allows everything within that context
 * to be wrapped within this
 */
export type TemplateArgStandardWrapperFn = (n: React.ReactNode) => React.ReactNode;

/**
 * Provides a function that returns the node that should be children of it
 * in the case of setting mutating context it should be used as eg.
 * 
 * new TemplateArgs({
 *   myMutatingContext: new DynamicTemplateArgs(
 *     (children) => {
 *       return (
 *         <ContextRetrieverWhatnot>
 *           {(contextData) => (
 *              children(new TemplateArgs(contextData))
 *           )}
 *         </ContextRetrieverWhatnot>
 *       );
 *     }
 *   );
 * });
 * 
 * and for iterable
 * 
 * new TemplateArgs({
 *   myMutatingContext: new DynamicTemplateArgs(
 *     (children) => {
 *       return (
 *         <ContextRetrieverWhatnot>
 *           {(contextData) => (
 *              contextData.map((data, index) => children(new TemplateArgs(data), index))
 *           )}
 *         </ContextRetrieverWhatnot>
 *       );
 *     }
 *   );
 * });
 * 
 * it's possible to double wrap on iterables
 * 
 * new TemplateArgs({
 *   myMutatingContext: new DynamicTemplateArgs(
 *     (children) => {
 *       return (
 *         <ContextRetrieverWhatnot>
 *           {(contextData) => (
 *              contextData.map((data, index) => <OtherContextProvider key={index}>children(new TemplateArgs(data))</OtherContextProvider>)
 *           )}
 *         </ContextRetrieverWhatnot>
 *       );
 *     }
 *   );
 * });
 */
export type TemplateArgMutatingWrapperFn = (children: (newContext: TemplateArgs, key?: string | number) => React.ReactNode) => React.ReactNode;

/**
 * Allows to define a context wrapper argument for the standard context
 * that is given this can only be used during the render dynamic
 * it is not valid for the render static
 */
export class TemplateArgs {
  public properties: ITemplateArgsProperties;
  public wrapper: (n: React.ReactNode) => React.ReactNode;

  constructor(properties: ITemplateArgsProperties) {
    this.properties = properties;
  }

  public wrappedBy(w: (n: React.ReactNode) => React.ReactNode) {
    this.wrapper = w;
    return this;
  }
}

/**
 * Allows to specify not very defined arguments into the serializer during a dynamic render
 */
export class MutatingTemplateArgs {
  public mutatingWrapper: TemplateArgMutatingWrapperFn;
  constructor(mutatingWrapper: TemplateArgMutatingWrapperFn) {
    this.mutatingWrapper = mutatingWrapper;
  }
}

export type TemplateArgFunctionalWrapperFn = (children: (fn: Function) => React.ReactNode, fnKey: string) => React.ReactNode;

/**
 * Allows to specify a context mutating function into the serializer during a dynamic render
 */
export class MutatingFunctionArg {
  public mutatingFunctionWrapper: TemplateArgFunctionalWrapperFn;
  constructor(mutatingFunctionWrapper: TemplateArgFunctionalWrapperFn) {
    this.mutatingFunctionWrapper = mutatingFunctionWrapper;
  }
}