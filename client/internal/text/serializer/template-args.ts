import type { RichElement, IRootLevelDocument } from ".";
import { IUIHandlerProps } from "./base";


type TemplateArgProperty =
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
  boolean |
  // eh?
  number;

/**
 * Interface to define context wrappers during a dynamic render
 */
export interface ITemplateArgsProperties {
  [name: string]: TemplateArgProperty | NonRootInheritable;
}

/**
 * Provides a function that returns the node that should be children of it
 * in the case of setting mutating context it should be used as eg.
 * 
 * new TemplateArgs({
 *   name: new NonRootInheritable("jonh"),
 *   person: true,
 *   myMutatingContext: new MutatingTemplateArgs(
 *     (children) => {
 *       return (
 *         <ContextRetrieverWhatnot>
 *           {(contextData) => (
 *              children(new TemplateArgs(contextData))
 *           )}
 *         </ContextRetrieverWhatnot>
 *       );
 *     }
 *   ),
 *   open: () => goTo("/cart"),
 *   openMutating: new MutatingFunctionArg(
 *     (children, fnKey) => {
 *        return (
 *           <ContextRetrieverWhatnot>
 *             {(contextData) => (
 *                // pass the function from a context
 *                children(contextData[fnKey])
 *             )}
 *           </ContextRetrieverWhatnot>
 *        )
 *     }
 *   );
 * });
 * 
 * and for iterable
 * 
 * new TemplateArgs({
 *   name: new NonRootInheritable("jonh"),
 *   person: true,
 *   myMutatingContext: new MutatingTemplateArgs(
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
 *   open: () => goTo("/cart"),
 *   openMutating: new MutatingFunctionArg(
 *     (children, fnKey) => {
 *        return (
 *           <ContextRetrieverWhatnot>
 *             {(contextData) => (
 *                // pass the function from a context
 *                children(contextData[fnKey])
 *             )}
 *           </ContextRetrieverWhatnot>
 *        )
 *     }
 *   );
 * });
 * 
 * it's possible to double wrap on iterables
 * 
 * new TemplateArgs({
 *   name: new NonRootInheritable("jonh"),
 *   person: true,
 *   myMutatingContext: new MutatingTemplateArgs(
 *     (children) => {
 *       return (
 *         <ContextRetrieverWhatnot>
 *           {(contextData) => (
 *              contextData.map((data, index) => <OtherContextProvider key={index}>children(new TemplateArgs(data))</OtherContextProvider>)
 *           )}
 *         </ContextRetrieverWhatnot>
 *       );
 *     }
 *   ),
 *   open: () => goTo("/cart"),
 *   openMutating: new MutatingFunctionArg(
 *     (children, fnKey) => {
 *        return (
 *           <ContextRetrieverWhatnot>
 *             {(contextData) => (
 *                // pass the function from a context
 *                children(contextData[fnKey])
 *             )}
 *           </ContextRetrieverWhatnot>
 *        )
 *     }
 *   );
 * });
 */
export type TemplateArgMutatingWrapperFn = (children: (newContext: TemplateArgs, key?: string | number) => React.ReactNode) => React.ReactNode;

/**
 * Makes a value non root inheritable
 */
export class NonRootInheritable {
  public value: TemplateArgProperty;
  constructor(value: TemplateArgProperty) {
    this.value = value;
  }
}

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

//////////////////////////////////////
// defining potential template arguments, template arguments may come in many shapes and forms
// however making a template requires to know this potential shape, what is what
// this structure is meant to be used with your editor of choice, and you should extend it and adapt it
// because this can be fed to normalization

interface IBaseTemplateArg {
  label: string | stringFn;
  nonRootInheritable?: boolean;

  /**
   * This argument is specific to the editor being used
   * and defines something arbitrary
   */
  editorArgs?: any;
}

type stringFn = () => string;

export interface ITemplateArgTextDefinition extends IBaseTemplateArg {
  type: "text";

  /**
   * This argument is specific to the editor being used and defines
   * what should be displayed in that piece of text content
   */
  editorDisplay?: any;
}

export interface ITemplateArgLinkDefinition extends IBaseTemplateArg {
  type: "link";
}

export interface ITemplateArgHTMLDefinition extends IBaseTemplateArg {
  type: "html";

  /**
   * This argument is specific to the editor being used and defines
   * what should be displayed in that piece of html content
   */
  editorDisplay?: any;
}

export interface ITemplateArgFunctionDefinition extends IBaseTemplateArg {
  type: "function";
}

export interface ITemplateArgBooleanDefinition extends IBaseTemplateArg {
  type: "boolean";
}

type elementTypes = "container" |
  "custom" |
  "file" |
  "image" |
  "inline" |
  "link" |
  "list-item" |
  "list" |
  "table" |
  "thead" |
  "tbody" |
  "tr" |
  "td" |
  "title" |
  "video" |
  "paragraph" |
  "quote" |
  "void-block" |
  "void-inline" |
  "void-superblock";

export interface ITemplateArgUIHandlerDefinition extends IBaseTemplateArg {
  type: "ui-handler";
  /**
   * Will only allow an element of a given ui handler type to be of an specific type
   * for example, containers can be very useful as ui handler elements
   * but are not limited to that
   */
  mustBeOfType?: elementTypes | elementTypes[];
  /**
   * limits the type of children that can be inside such, for example if you want
   * to have a container of only paragraphs, or a container of only containers
   * 
   * during normalization this means that elements will be removed if they are not of the
   * right type, note that the normalization of the "mustBeOfType" applies first, for example
   * if it must be a "paragraph" then all non-linlines will be removed, but you may not have
   * such thing
   */
  allowsChildren?: (child: RichElement, self: RichElement) => boolean;
  /**
   * If a children is not allowed you may be able to patch it to make it work
   * return null if not possible
   */
  patchChildren?: (child: RichElement, self: RichElement) => Partial<RichElement>;
  /**
   * Forces the parent to have an ui handler of this specific type that
   * applies to this element itself, rather than its
   */
  allowsParent?: (parent: RichElement | IRootLevelDocument, self: RichElement) => boolean;
  /**
   * define a handler object that shall be used within the editor
   * this argument is very specific to the editor being used
   */
  editorHandler?: any;
}

export interface ITemplateArgContextDefinition extends IBaseTemplateArg {
  type: "context";
  loopable?: boolean;
  properties: {
    [key: string]: ITemplateArgContextDefinition |
    ITemplateArgUIHandlerDefinition |
    ITemplateArgTextDefinition |
    ITemplateArgLinkDefinition |
    ITemplateArgHTMLDefinition |
    ITemplateArgFunctionDefinition |
    ITemplateArgBooleanDefinition
  };
}