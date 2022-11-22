/**
 * This file contains the serializer and deserializer basic functionality that allows
 * to handle the standard itemize text specification
 * 
 * @module
 */

import React from "react";
import { DOMWindow, localeReplacer } from "../../../../util";
import { copyElementBase, IElementBase } from "./base";
import { IContainer, registerContainer } from "./types/container";
import { ICustom, registerCustom } from "./types/custom";
import { IFile, registerFile } from "./types/file";
import { IImage, registerImage } from "./types/image";
import { ILink, registerLink } from "./types/link";
import { IParagraph, registerParagraph, STANDARD_PARAGRAPH } from "./types/paragraph";
import { IQuote, registerQuote } from "./types/quote";
import { IText, registerText, STANDARD_TEXT_NODE } from "./types/text";
import { ITitle, registerTitle } from "./types/title";
import { IVideo, registerVideo } from "./types/video";
import { IList, registerList } from "./types/list";
import { IListItem, registerListItem } from "./types/list-item";
import { IInline, registerInline } from "./types/inline";
import { ITable, ITbody, ITd, ITfoot, ITh, IThead, ITr, registerTableElements } from "./types/table";
import { ITemplateArgContextDefinition, ITemplateArgUIHandlerDefinition, TemplateArgs } from "./template-args";
import uuidv5 from "uuid/v5";
import equals from "deep-equal";
import { IVoidBlock, registerVoidBlock } from "./types/void-block";
import { IVoidSuperBlock, registerVoidSuperBlock } from "./types/void-superblock";
import { IVoidInline, registerVoidInline } from "./types/void-inline";
import type { IPropertyEntryI18nRichTextInfo } from "../../../internal/components/PropertyEntry/PropertyEntryText";

/**
 * Represents a basic deserialization function that takes a
 * basic HTML node and returns a rich element (or a text node)
 */
type DeserializationFn = (n: Node) => RichElement | IText;

/**
 * Represents a registry from the deserialize registry
 */
interface IDeserializeRegistryType {
  [attr: string]: DeserializationFn;
}

export interface IReactifyExtraOptions {
  /**
   * use this to return any extra attributes that should
   * be applied towards an element
   * 
   * Does not have an effect to UI Handled elements that are
   * handled
   * 
   * return an object or null
   */
  onCustomAttributesFor?: (element: RichElement | IText) => any;

  /**
   * use this to modify how the element renders
   * 
   * Does not have an effect to UI Handled elements that are
   * handled
   * 
   * return null for not handling anything an using the default
   */
  onCustom?: (
    element: RichElement | IText,
    props: any,
    info: {styleActive?: any, styleHover?: any, Tag: string, defaultReturn: () => React.ReactNode},
  ) => React.ReactNode;

  /**
   * Allows to wrap an element with features of the choosing
   * return the elementAsNode itself or a new node to replace it
   */
  onCustomWrap?: (element: RichElement | IText, elementAsNode: React.ReactNode) => React.ReactNode;
}

/**
 * The argument that is passed to the reactify function that allows to convert
 * a given deserialized rich element and document into a react element
 */
export interface IReactifyArg<T> {
  /**
   * This is the element that must be converted
   */
  element: T;
  /**
   * Whether the element is considered active, it's usually false when the element
   * is being edited, so it is inactive, being edited, and active when it's visible for
   * usage
   */
  active: boolean;
  /**
   * Whether the element is considered selected, it should only really be true if active
   * is false, as it's in edit mode and can be selected, it adds the selected class
   * to the reactification
   */
  selected: boolean;
  /**
   * Give the element custom properties, these properties will override the way the element
   * is bound, you can pass children via these props
   */
  customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  /**
   * Render the element as a template, rather than as a simple single level component
   */
  asTemplate?: boolean;
  /**
   * The template arguments to be used that represent the current context
   */
  templateArgs?: TemplateArgs;
  /**
   * These represent the root args, you can leave it unpassed if you passed template args
   * as they are equivalent, however the root level can be used to extract ui handler logic
   * as such they are overwritten when matching  the tree
   */
  templateRootArgs?: TemplateArgs;
  /**
   * Ignore contextual changes that change the template arg, these are forEach and context
   * attributes of a base context
   */
  templateIgnoreContextualChanges?: boolean;
  /**
   * A key to use in the react component
   */
  key?: number | string;
  /**
   * Some extra options for utilities
   */
  extraOptions?: IReactifyExtraOptions;
}

/**
 * Represents the registry where all the infromation to serialize
 * and deserialize text elements, it provides 3 way methods
 */
export interface ISerializationRegistryType {
  /**
   * SERIALIZE provides the functionality to contain a rich element
   * or text node to a HTML node
   */
  SERIALIZE: {
    /**
     * The type represents the type of the element
     * eg. paragraph, file, image etc...
     */
    [type: string]: (node: RichElement | IText) => Node
  };

  /**
   * DESERIALIZE provides the functionality to convert a HTML
   * node into the rich element counterpart as required
   */
  DESERIALIZE: {
    /**
     * by class name prefix searchs of a class name prefix and matches that
     * to a given function, it receives the highest priority
     */
    byClassNamePrefix: IDeserializeRegistryType;
    /**
     * by class name matches a given class exactly and if it matches then
     * it will pass it to the given deserialization function
     */
    byClassName: IDeserializeRegistryType;
    /**
     * by tag simply uses the tag name of the given component
     */
    byTag: IDeserializeRegistryType;
    /**
     * This is for the text element
     */
    text: (n: Node) => IText;
  };

  /**
   * REACTIFY allows to convert a given element that has been deserialized
   * into a react component
   */
  REACTIFY: {
    [type: string]: (arg: IReactifyArg<RichElement | IText>) => React.ReactNode;
  };

  /**
   * Specify which children are allowed for a given object type
   */
  ALLOWS_CHILDREN: {
    [type: string]: string[];
  }

  /**
   * Specifies wether the given type allows plaintext
   * inside of it
   */
  PROHIBIT_TEXT: {
    [type: string]: boolean;
  };

  /**
   * When received an invalid children that are not in ALLOWS_CHILDREN
   */
  ON_INVALID_CHILDREN_WRAP_WITH: {
    [type: string]: (children: RichElement) => RichElement[];
  };

  /**
   * When received text as children and PROHIBIT_TEXT is not
   * true
   */
  ON_INVALID_TEXT_WRAP_WITH: {
    [type: string]: (text: IText) => RichElement[];
  };

  /**
   * An inline should be
   * PROHIBIT_TEXT true
   * ALLOWS_CHILDREN empty array
   * 
   * For example <a> <span class="inline"/> are known inlines
   * 
   * However the usage of this is for internal identification as in html
   * a space is necessary between inline nodes for them to be selected
   */
  INLINES: {
    [type: string]: boolean;
  };

  /**
   * Whether it is a void element and has no children and no content
   * within it
   */
  VOIDS: {
    [type: string]: boolean;
  };

  /**
   * Whether it is a void element and has no children and no content
   * within it
   */
  BLOCKS: {
    [type: string]: boolean;
  };

  /**
   * Whether it is a void element and has no children and no content
   * within it
   */
  SUPERBLOCKS: {
    [type: string]: boolean;
  };

  /**
   * Specifies what shall be done regarding empty
   * elements without children
   * 
   * unnecessary if allows children text is true
   */
  ON_EMPTY_FILL_WITH: {
    [type: string]: () => RichElement;
  };

  /**
   * Specifies which elements are allowed to be merged with the next element
   */
  MERGABLES: {
    [type: string]: boolean;
  };

  CUSTOM_NORMALIZER_PRE: {
    [type: string]: (
      element: any,
      path: number[],
      executionRoot: IRootLevelDocument,
      primaryExecution: ICustomExecution,
      secondaryExecution: ICustomExecution,
      specialRules?: ISpecialRules,
    ) => void;
  }
  CUSTOM_NORMALIZER_POST: {
    [type: string]: (
      element: any,
      path: number[],
      executionRoot: IRootLevelDocument,
      primaryExecution: ICustomExecution,
      secondaryExecution: ICustomExecution,
      specialRules?: ISpecialRules,
    ) => void;
  }
}

/**
 * This is the actual serialization registry that the serializer is used
 * by default is started up empty
 */
export const SERIALIZATION_REGISTRY: ISerializationRegistryType = {
  SERIALIZE: {},
  DESERIALIZE: {
    byClassName: {},
    byClassNamePrefix: {},
    byTag: {},
    text: null,
  },
  ALLOWS_CHILDREN: {},
  PROHIBIT_TEXT: {},
  ON_EMPTY_FILL_WITH: {},
  ON_INVALID_CHILDREN_WRAP_WITH: {},
  ON_INVALID_TEXT_WRAP_WITH: {},
  VOIDS: {},
  INLINES: {},
  BLOCKS: {},
  SUPERBLOCKS: {
    document: true,
  },
  REACTIFY: {},
  MERGABLES: {},
  CUSTOM_NORMALIZER_POST: {},
  CUSTOM_NORMALIZER_PRE: {}
}

// NOW we register all the elements that are part of this
// by passing them to the function
registerVoidSuperBlock(SERIALIZATION_REGISTRY);
registerContainer(SERIALIZATION_REGISTRY);
registerInline(SERIALIZATION_REGISTRY);
registerCustom(SERIALIZATION_REGISTRY);
registerFile(SERIALIZATION_REGISTRY);
registerImage(SERIALIZATION_REGISTRY);
registerLink(SERIALIZATION_REGISTRY);
registerParagraph(SERIALIZATION_REGISTRY);
registerQuote(SERIALIZATION_REGISTRY);
registerText(SERIALIZATION_REGISTRY);
registerTitle(SERIALIZATION_REGISTRY);
registerVideo(SERIALIZATION_REGISTRY);
registerList(SERIALIZATION_REGISTRY);
registerListItem(SERIALIZATION_REGISTRY);
registerTableElements(SERIALIZATION_REGISTRY);
registerVoidBlock(SERIALIZATION_REGISTRY);
registerVoidInline(SERIALIZATION_REGISTRY);

SERIALIZATION_REGISTRY.ALLOWS_CHILDREN.document = SERIALIZATION_REGISTRY.ALLOWS_CHILDREN.container;
SERIALIZATION_REGISTRY.ON_INVALID_CHILDREN_WRAP_WITH.document = SERIALIZATION_REGISTRY.ON_INVALID_CHILDREN_WRAP_WITH.container;
SERIALIZATION_REGISTRY.ON_INVALID_TEXT_WRAP_WITH.document = SERIALIZATION_REGISTRY.ON_INVALID_TEXT_WRAP_WITH.container;

export function isText(node: RichElement | IRootLevelDocument | IText) {
  return typeof (node as IText).text === "string";
}

export function isMergable(node: RichElement | IRootLevelDocument | IText) {
  if (isText(node)) {
    return true;
  }

  return !!SERIALIZATION_REGISTRY.MERGABLES[(node as any).type];
}

export function isElement(node: RichElement | IRootLevelDocument | IText) {
  return typeof (node as RichElement).type === "string";
}

export function isInline(node: RichElement | IRootLevelDocument | IText) {
  if (isText(node)) {
    return false;
  }
  return !!SERIALIZATION_REGISTRY.INLINES[(node as RichElement).type];
}

export function isBlock(node: RichElement | IRootLevelDocument | IText) {
  if (isText(node)) {
    return false;
  }
  return !!SERIALIZATION_REGISTRY.BLOCKS[(node as RichElement).type];
}

export function isSuperBlock(node: RichElement | IRootLevelDocument | IText) {
  if (isText(node)) {
    return false;
  }
  return !!SERIALIZATION_REGISTRY.SUPERBLOCKS[(node as RichElement).type];
}

export function getAllowedChildrenTypes(node: RichElement | IRootLevelDocument) {
  if (isVoid(node)) {
    return [];
  }

  const allowedInternals = SERIALIZATION_REGISTRY.ALLOWS_CHILDREN[node.type];
  if (allowedInternals) {
    return allowedInternals;
  }
  if (isSuperBlock(node)) {
    return Object.keys(SERIALIZATION_REGISTRY.BLOCKS).concat(Object.keys(SERIALIZATION_REGISTRY.SUPERBLOCKS));
  } else if (isBlock(node)) {
    return Object.keys(SERIALIZATION_REGISTRY.INLINES);
  }

  return [];
}

export function allowsText(node: RichElement | IRootLevelDocument) {
  const prohibitTexts = SERIALIZATION_REGISTRY.PROHIBIT_TEXT[node.type];
  if (prohibitTexts || isSuperBlock(node)) {
    return false;
  }

  return true;
}

export function isVoid(node: RichElement | IRootLevelDocument | IText): boolean {
  if (isText(node)) {
    return false;
  }
  return typeof (node as IElementBase).html === "string" ||
    typeof (node as IElementBase).textContent === "string" ||
    !!SERIALIZATION_REGISTRY.VOIDS[(node as RichElement).type];
}

export function getUIHandlerValueWithKnownContextFor(
  element: RichElement,
  elementContext: ITemplateArgContextDefinition,
  rootContext: ITemplateArgContextDefinition,
) {
  if (!elementContext || elementContext.type !== "context" || !element || !element.uiHandler || !rootContext) {
    return null;
  }

  let uiHandlerValue: ITemplateArgUIHandlerDefinition = elementContext.properties[element.uiHandler] as ITemplateArgUIHandlerDefinition;
  if (!uiHandlerValue || uiHandlerValue.type !== "ui-handler") {
    uiHandlerValue = rootContext.properties[element.uiHandler] as ITemplateArgUIHandlerDefinition;
    if (!uiHandlerValue || uiHandlerValue.type !== "ui-handler" || uiHandlerValue.nonRootInheritable) {
      uiHandlerValue = null;
    }
  }

  return uiHandlerValue;
}

export function getUIHandlerValueFor(
  element: RichElement,
  path: number[],
  rootElement: IRootLevelDocument,
  rootContext: ITemplateArgContextDefinition,
) {
  if (!element.uiHandler) {
    return null;
  }

  const contextForThisElement = getContextFor(
    path,
    "final",
    rootElement,
    rootContext,
  ) || rootContext;

  return getUIHandlerValueWithKnownContextFor(
    element,
    contextForThisElement,
    rootContext,
  );
}

export function getNodeFor(
  path: number[],
  rootElement: IRootLevelDocument,
): IRootLevelDocument | RichElement | IText {
  if (path.length === 0) {
    return rootElement;
  }

  let currentElement: IRootLevelDocument | RichElement = rootElement;
  for (let i = 0; i < path.length; i++) {
    currentElement = currentElement.children[path[i]] as any;
  }

  return currentElement;
}

export function getParentNodeFor(
  path: number[],
  rootElement: IRootLevelDocument,
): IRootLevelDocument | RichElement {
  if (path.length === 0) {
    return null;
  } else if (path.length === 1) {
    return rootElement;
  }

  const newPath = [...path];
  newPath.pop();

  let currentElement: IRootLevelDocument | RichElement = rootElement;
  for (let i = 0; i < newPath.length; i++) {
    currentElement = currentElement.children[newPath[i]] as any;
  }

  return currentElement;
}

export function getContextFor(
  path: number[],
  level: "final" | "select-context" | "select-loop",
  rootElement: IRootLevelDocument,
  rootContext: ITemplateArgContextDefinition,
): ITemplateArgContextDefinition {
  if (!path || path.length === 0 || !rootContext) {
    return null;
  }

  const nextPath = [...path];
  const nextPathNumber = nextPath.shift();
  const isFinal = nextPath.length === 0;

  const nextElement = rootElement.children && rootElement.children[nextPathNumber];
  if (!nextElement) {
    return rootContext;
  }

  let nextContext = rootContext;

  if (isFinal && level === "select-context") {
    return nextContext;
  }

  const contextChange = (nextElement as IElementBase).context;
  if (contextChange) {
    const nextPotentialContext = nextContext.properties[contextChange];
    if (nextPotentialContext.type !== "context" || nextPotentialContext.loopable) {
      return null;
    }
    nextContext = nextPotentialContext;
  }

  if (isFinal && level === "select-loop") {
    return nextContext;
  }

  const eachConextChange = (nextElement as IElementBase).forEach;
  if (eachConextChange) {
    const nextPotentialContext = nextContext.properties[contextChange];
    if (nextPotentialContext.type !== "context" || !nextPotentialContext.loopable) {
      return null;
    }
    nextContext = nextPotentialContext;
  }

  return isFinal ? nextContext : getContextFor(nextPath, level, nextElement as any, nextContext);
}

/**
 * The interactive actions that exist that mark
 * something as a templated element that is interactive
 * @ignore
 */
const templatedInteractiveActions = [
  "click",
  "blur",
  "focus",
  "input",
  "keydown",
  "keypress",
  "keyup",
  "mousedown",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseover",
  "mouseout",
  "mouseup",
  "mousewheel",
  "touchstart",
  "touchmove",
  "touchend",
  "touchcancel",
  "wheel",
];

/**
 * The attributes that exist in a given element that mark such
 * as a templated element
 * @ignore
 */
const templatedAttributes = [
  "thref",
  "textContent",
  "html",
  "forEach",
  "context",
  "uiHandler",
];

/**
 * The attributes that exist in a given element that mark such
 * as a templated styled elements
 * @ignore
 */
const templatedStyledAttributes = [
  "styleHover",
  "styleActive",
];

/**
 * The node information that is extracted of a given node used
 * to be displayed to the user
 */
interface INodeInfo {
  /**
   * The name that is given, human readable in the given language
   */
  name: string;
  /**
   * Whether it represents a templated node
   */
  isTemplate: boolean;
  /**
   * Whether it represents a text node
   */
  isText: boolean;
}

/**
 * Provides the node info of a given node
 * @param node the node, either text or rich element
 * @param i18nData the i18n information to be used to create the name
 * @returns the node information
 */
export function getInfoFor(
  node: RichElement | IText | IRootLevelDocument,
  i18nData: IPropertyEntryI18nRichTextInfo,
): INodeInfo {
  if ((node as any).type === "document") {
    return null;
  }

  // check for whether is interactive and other options
  const isInteractive = templatedInteractiveActions.some((attr) => !!node[attr]);
  const isTemplateStyled = templatedStyledAttributes.some((attr) => !!node[attr]);
  const isBasicStyled = !!(node as RichElement).style || ((node as RichElement).richClassList && (node as RichElement).richClassList.length);
  const isBasicTemplated = templatedAttributes.some((attr) => !!node[attr]);
  const isTemplate = isInteractive || isTemplateStyled || isBasicTemplated;

  // now let's build the name label for the given language
  const foundCustomName = (!(node as RichElement).givenName && (node as RichElement).uiHandler) ?
    i18nData.richUIHandlerElement[(node as RichElement).uiHandler.replace(/-/g, "_")] : null;
  let nameLabel: string = (node as RichElement).givenName ? (node as RichElement).givenName : (
    foundCustomName || ((node as RichElement).type ? (i18nData[(node as RichElement).type] || (node as RichElement).type) : i18nData.text)
  );
  if (!(node as RichElement).givenName && !foundCustomName) {
    if (isBasicStyled || isTemplateStyled) {
      nameLabel = localeReplacer(i18nData.styled, nameLabel);
    }
    if (isInteractive) {
      nameLabel = localeReplacer(i18nData.interactive, nameLabel);
    }
    if (isTemplate) {
      nameLabel = localeReplacer(i18nData.template, nameLabel);
    }
  }

  // and we can return the information now
  return {
    isTemplate,
    name: nameLabel,
    isText: typeof (node as IText).text === "string",
  }
}

/**
 * Represents the root level document and a id
 * to keep track of it, every document should have
 * an unique uuid
 */
export interface IRootLevelDocument {
  type: "document",
  rich: boolean;
  id: string;
  children: RichElement[];
}

/**
 * This is what a rich element can be, it can be all these
 * but it's not a text
 */
export type RichElement = IParagraph | IContainer | ICustom | ILink | IQuote | ITitle | IImage |
  IFile | IVideo | IList | IListItem | IInline | ITable | ITr | ITbody | IThead | ITfoot | ITd | ITh | IVoidBlock | IVoidInline | IVoidSuperBlock;

/**
 * This is the text namespace, and it's used in uuid for creating
 * an unique identifier for the given text input
 */
const TEXT_NAMESPACE = "ee6ce529-24f8-455b-8dd0-8b5bd377820d";
/**
 * This is the UUID that will be used for null documents
 * directly
 */
const NULL_UUID = "83dd556b-889f-4a9b-aff0-f749a35a9c0f";

/**
 * Serializes a document
 * will return html elements for rich documents
 * or a string for plain documents
 * @param document 
 */
export function serialize(root: IRootLevelDocument): HTMLElement[] | string {
  // if we didn't pass anything
  if (!root) {
    // it's basically null
    return null;
  }

  // if we have no children, it's null
  if (root.children.length === 0) {
    return null;
  }

  // for non rich text
  if (!root.rich) {
    // we are just going to check every paragraph
    let result: string = "";
    root.children.forEach((paragraph: IParagraph) => {
      // and concatenate such, there are only paragraph
      // in this mode
      if (result) {
        result += "\n";
      }
      result += (paragraph.children[0] as IText).text || "";
    });

    // return the resulting concatenation
    return result;
  }

  // when it's not rich, we go for our last element
  const lastElement = root.children[root.children.length - 1];
  // if our last element is literally an empty paragraph then we consider such a thing needs dropping
  const lastNeedsDropping =
    lastElement.type === "paragraph" &&
    (lastElement.children[0] as IText).text === "" &&
    lastElement.children.length === 1 &&
    !lastElement.uiHandler &&
    !lastElement.style &&
    !lastElement.richClassList &&
    !lastElement.styleActive &&
    !lastElement.styleHover;

  // and as such we define what children we are going to process
  const childrenToProcess = lastNeedsDropping ? [...root.children] : root.children;

  // if we are not going to process the last we remove it
  if (lastNeedsDropping) {
    childrenToProcess.pop();
  }

  // if we got nothing left
  if (childrenToProcess.length === 0) {
    // it's null
    return null;
  }

  // now we can call the function to serialize the element which is down there
  const results = childrenToProcess.map(serializeElement).filter((n) => n !== null) as HTMLElement[];

  // if we got no results for some reason, usually corruption
  if (results.length === 0) {
    // we give null
    return null;
  }

  // otherwise return the array of html element we have received
  return results;
}

/**
 * Serializes a single element as it's given in the rich form
 * @param element 
 */
function serializeElement(element: RichElement) {
  // we are going to check the serialization registry for the
  // given rich element
  if (SERIALIZATION_REGISTRY.SERIALIZE[element.type]) {
    const fn = SERIALIZATION_REGISTRY.SERIALIZE[element.type];

    // and call it
    const childElement = fn(element);

    // then return that
    return childElement;
  }

  // otherwise we give null
  return null;
}

/**
 * Deserializes a document from the HTML form into a root level document
 * @param html the html in string form or as an array of nodes
 * @param comparer an optional comparer root level document, if it matches the signature
 * it will be efficient and return such comparer instead
 * @returns a root level document
 */
export function deserialize(html: string | Node[], comparer?: IRootLevelDocument, specialRules?: ISpecialRules) {

  // first we need to build this data into a string
  // this is the html data of the child nodes
  let data: string;

  // now we need all the child nodes
  let childNodes: Node[] = null;

  // if we got the data as a string
  if (typeof html === "string") {
    // we need to parse and then do it like this
    const cheapdiv = DOMWindow.document.createElement("div");
    cheapdiv.innerHTML = html;
    childNodes = Array.from(cheapdiv.childNodes);

    // the data is the same as the html
    data = html;
  } else {
    // otherwise our child nodes are the html itself
    childNodes = html || [];
    // if the html is not null
    if (html !== null) {
      // then we can extract the HTML info from the nodes
      const cheapdiv = DOMWindow.document.createElement("div");
      Array.from(html).forEach((n) => {
        cheapdiv.appendChild(n);
      });
      data = cheapdiv.innerHTML;
    } else {
      // otherwise the data is also null
      data = null;
    }
  }

  // now we can get the expected id, if our data is simply null, then
  // we use the null uuid, otherwise we build an uuid from the data
  const expectedId = data === null ? NULL_UUID : uuidv5(data, TEXT_NAMESPACE);

  // if we have a comparer and the comparer matches
  if (comparer && comparer.id === expectedId) {
    // return the comparer
    return comparer;
  }

  // now we can use the final children as we call then via the deserializeElement
  // function, and remember to remove nulls
  const finalChildren = deserializeChildrenForNode({ childNodes: childNodes } as any) as RichElement[];

  // and now we can build the document
  const newDocument: IRootLevelDocument = {
    type: "document",
    id: expectedId,
    rich: true,
    // note that we must have at least one paragraph in the final
    // result
    children: finalChildren.length === 0 ?
      [
        {
          type: "paragraph",
          children: [STANDARD_TEXT_NODE()]
        }
      ] :
      finalChildren,
  };

  // normalize it
  if (!specialRules || !specialRules.dontNormalize) {
    normalize(newDocument, specialRules || null);
  }

  // return it
  return newDocument;
}

export function normalize(
  doc: IRootLevelDocument,
  specialRules?: ISpecialRules,
): IRootLevelDocument {
  if (!doc.rich || (specialRules && specialRules.dontNormalize)) {
    return doc;
  }
  return normalizeElement(doc as any, [], doc, null, specialRules || null) as any;
}

interface ICustomExecution {
  workOnOriginal: boolean;
  updateNodeAt: (path: number[], v: Partial<RichElement | IText>) => void,
  deleteNodeAt: (path: number[]) => void,
  wrapNodeAt: (path: number[], wrappers: RichElement[]) => void,
  insertNodeAt: (path: number[], node: RichElement | IText, targetIndex: number) => void,
  mergeNodesAt: (basePath: number[], referencePath: number[]) => void,
  splitElementAndEscapeChildIntoParentAt: (path: number[], escapingChildIndex: number) => void;
  getNodeAt: (path: number[]) => RichElement | IText;
  cloneElementAt: (fromPath: number[], toPath: number[]) => void;
  moveNodeAt: (fromPath: number[], toPath: number[]) => void;
};

interface ISpecialRules {
  ignoreNodesAt?: Array<number[]>;
  /**
   * This should be the root context
   */
  useContextRulesOf?: ITemplateArgContextDefinition;
  /**
   * avoid normalization altogether
   */
  dontNormalize?: boolean;
}

const standardExecFn: (root: IRootLevelDocument) => ICustomExecution = (root) => ({
  workOnOriginal: true,
  updateNodeAt(path: number[], data: Partial<RichElement | IText>) {
    const node = getNodeFor(path, root);
    // console.log("updating", JSON.stringify(node), "with", JSON.stringify(data));
    Object.keys(data).forEach((k) => {
      node[k] = data[k];
    });
  },
  deleteNodeAt(path: number[]) {
    const node = getNodeFor(path, root);
    const parent = getParentNodeFor(path, root);
    // console.log("deleting", JSON.stringify(node), "at", JSON.stringify(parent));
    parent.children.splice(path[path.length - 1], 1);
  },
  wrapNodeAt(path: number[], wrappers: RichElement[]) {
    const parentOfNodeToWrap = getParentNodeFor(path, root);
    const indexAtChild = path[path.length - 1];

    // console.log("wrapping", JSON.stringify(parentOfNodeToWrap.children[indexAtChild]), "with", JSON.stringify(wrappers));
    wrappers.forEach((w) => {
      const childToWrap = parentOfNodeToWrap.children[indexAtChild];
      w.children = [childToWrap] as any;
      parentOfNodeToWrap.children[indexAtChild] = w;
    });
  },
  insertNodeAt(path: number[], node: RichElement | IText, targetIndex: number) {
    const element = getNodeFor(path, root) as RichElement;
    // console.log("inserting", JSON.stringify(node), "at", JSON.stringify(element));
    element.children.splice(targetIndex, 0, node as any);
  },
  mergeNodesAt(basePath: number[], referencePath: number[]) {
    const base = getNodeFor(basePath, root);
    const reference = getNodeFor(referencePath, root);
    const parent = getParentNodeFor(basePath, root);
    // console.log("merging", JSON.stringify(base), "with", JSON.stringify(reference));
    if (typeof (base as RichElement).type !== "undefined") {
      (base as RichElement).children = ((base as RichElement).children as any).concat((reference as RichElement).children);
    } else {
      (base as IText).text += (reference as IText).text;
    }
    parent.children.splice(referencePath[referencePath.length - 1], 1);
  },
  splitElementAndEscapeChildIntoParentAt(path: number[], escapingChildIndex: number) {
    const element = getNodeFor(path, root) as RichElement;
    const parent = getParentNodeFor(path, root) as RichElement;

    // console.log("splitting", JSON.stringify(element), "at child index", JSON.stringify(escapingChildIndex));

    const allNodesBeforeThis = element.children.slice(0, escapingChildIndex);
    const escapingChild = element.children[escapingChildIndex];
    const allNodesAfterThis = element.children.slice(escapingChildIndex + 1);
    element.children = allNodesBeforeThis;

    const newElement = {
      ...element,
      children: allNodesAfterThis,
    }

    const indexAtParent = path[path.length - 1] + 1;

    parent.children.splice(indexAtParent, 0, newElement as any);
    parent.children.splice(indexAtParent, 0, escapingChild as any);
  },
  getNodeAt(path: number[]) {
    return getNodeFor(path, root) as any;
  },
  cloneElementAt(fromPath: number[], toPath: number[]) {
    const elementToCopy = getNodeFor(fromPath, root) as RichElement;
    const copy = { ...elementToCopy };
    copy.children = [];

    const parentTarget = getParentNodeFor(toPath, root) as RichElement;
    const indexTarget = toPath[toPath.length - 1];

    parentTarget.children.splice(indexTarget, 0, copy as any);
  },
  moveNodeAt(fromPath: number[], toPath: number[]) {
    const elementToMove = getNodeFor(fromPath, root);
    const parentSource = getParentNodeFor(fromPath, root);
    const parentTarget = getParentNodeFor(toPath, root);
    const indexTarget = toPath[toPath.length - 1];

    // remove from source
    parentSource.children.splice(fromPath[fromPath.length - 1], 1);
    // add to target
    parentTarget.children.splice(indexTarget, 0, elementToMove as any);
  }
});

function normalizeSpacing(
  element: RichElement | IRootLevelDocument,
  path: number[],
  primaryExecution: ICustomExecution,
  secondaryExecution: ICustomExecution,
  specialRules?: ISpecialRules,
) {
  const isIgnored = isIgnoredNode(path, specialRules);
  if (isIgnored) {
    return;
  }

  // if there are children in the result and they happen
  // to be some inline in them we need to ensure there are
  // empty text nodes between the inlines so they
  // can be selected properly
  if (
    element.children.length &&
    element.children.some((r) => isInline(r))
  ) {
    // and now we loop in each one of the children
    let offset = 0;
    const childrenAmount = element.children.length;
    for (let i = 0; i < childrenAmount; i++) {
      let actualIndex = i + offset;
      const currentNode = element.children[actualIndex];
      const currentNodePath = [...path, actualIndex];
      const isIgnored = isIgnoredNode(currentNodePath, specialRules);

      if (isIgnored) {
        continue;
      }

      if (isInline(currentNode)) {
        // get our current, prev, and next node from the parsed values
        const prevNode: any = element.children[actualIndex - 1];
        const nextNode: any = element.children[actualIndex + 1];

        // we need these texts from reference and they are taken from
        // the currentNode, inside the inline element, in order to populate
        // the gaps
        const textNodeStart = (currentNode as RichElement).children[0] as IText;
        const textNodeEnd = (currentNode as RichElement).children[(currentNode as RichElement).children.length - 1] as IText;

        if (!prevNode || typeof prevNode.text === "undefined") {
          // we use the start text as a reference for the spacer gap
          const textReference = {
            bold: false,
            italic: false,
            underline: false,
            ...copyElementBase(textNodeStart),
            text: "",
          }

          primaryExecution.insertNodeAt(
            path,
            textReference,
            // insert where we are now and push us forwards
            actualIndex,
          );
          secondaryExecution && secondaryExecution.insertNodeAt(
            path,
            textReference,
            // insert where we are now and push us forwards
            actualIndex,
          );

          actualIndex += 1;
          offset += 1;
        }

        if (!nextNode || typeof nextNode.text === "undefined") {
          // we use the start text as a reference for the spacer gap
          const textReference = {
            bold: false,
            italic: false,
            underline: false,
            ...copyElementBase(textNodeEnd),
            text: "",
          }

          primaryExecution.insertNodeAt(
            path,
            textReference,
            // insert ahead of where we are now and push everything else
            // forwards
            actualIndex + 1,
          );
          secondaryExecution && secondaryExecution.insertNodeAt(
            path,
            textReference,
            // insert ahead of where we are now and push everything else
            // forwards
            actualIndex + 1,
          );

          actualIndex += 1;
          offset += 1;
        }
      }
    };
  }

  // DELETE EMPTY TEXT NODES
  if (element.children.length >= 2) {
    const childrenAmount = element.children.length;
    if (childrenAmount >= 2) {
      let offset = 0;
      for (let i = 0; i < childrenAmount; i++) {
        const actualIndex = i + offset;
        const v = element.children[actualIndex];
        const prevNode = element.children[actualIndex - 1];
        const nextNode = element.children[actualIndex + 1];
        const isInlineSeparator = (!prevNode || isInline(prevNode)) && (!nextNode || isInline(nextNode));

        // we will stop right away even if we are not sure if this is a text node because, well
        // it will be removed anyway
        if (isInlineSeparator) {
          continue;
        }

        const nodePath = [...path, actualIndex];
        const isIgnored = isIgnoredNode(nodePath, specialRules);

        if (isIgnored) {
          continue;
        }

        if (typeof (v as IText).text !== "undefined" && !(v as IText).text) {
          primaryExecution.deleteNodeAt(
            nodePath,
          );
          secondaryExecution && secondaryExecution.deleteNodeAt(
            nodePath,
          );
          offset -= 1;
        }
      }
    }
  }

  // add to empty elements
  if (
    element.children.length === 0 &&
    (
      isInline(element) ||
      isBlock(element) ||
      isSuperBlock(element)
    )
  ) {
    const nodeToInsert = allowsText(element) ? STANDARD_TEXT_NODE() : SERIALIZATION_REGISTRY.ON_EMPTY_FILL_WITH[element.type]();
    primaryExecution.insertNodeAt(
      path,
      nodeToInsert,
      0,
    );
    secondaryExecution && secondaryExecution.insertNodeAt(
      path,
      nodeToInsert,
      0,
    );
  } else if (element.children.length >= 2) {
    let offset = 0;
    const childrenAmount = element.children.length;
    for (let i = 0; i < childrenAmount; i++) {
      const actualIndex = i + offset;
      if (i === 0) {
        continue;
      }

      const n1 = element.children[actualIndex - 1];
      const n2 = element.children[actualIndex];

      const shouldMerge = checkShouldMerge(n1, n2);

      if (shouldMerge) {
        const basePath = [...path, actualIndex - 1];
        const referencePath = [...path, actualIndex];
        primaryExecution.mergeNodesAt(
          basePath,
          referencePath,
        );
        secondaryExecution && secondaryExecution.mergeNodesAt(
          basePath,
          referencePath,
        );
        offset -= 1;
      }
    }
  }

  element.children.forEach((c, index) => {
    const childrenPath = [...path, index];

    const isIgnored = isIgnoredNode(childrenPath, specialRules);
    if (!isIgnored && (c as RichElement).type) {
      normalizeSpacing(c as RichElement, childrenPath, primaryExecution, secondaryExecution, specialRules);
    }
  });
}

function isIgnoredNode(path: number[], specialRules: ISpecialRules) {
  if (!specialRules || !specialRules.ignoreNodesAt) {
    return false;
  }

  if (specialRules && specialRules.dontNormalize) {
    return true;
  }

  return specialRules.ignoreNodesAt.some((ignorePath) => {
    // the same exact node with the same memory address
    return ignorePath.every((v, index) => path[index] === v);
  });
}

function shallowRootCopy<T>(
  element: T,
): T {
  const newElement: any = {}
  const mergable = isText(element as any) || isMergable(element as any);
  Object.keys(element).forEach((key) => {
    if (key === "children") {
      newElement.children = (element as any as RichElement).children.map(shallowRootCopy);
    } else if (
      key === "text"
    ) {
      // if there's text
      if (element[key]) {
        newElement[key] = "?";
      } else {
        // if there's no text
        newElement[key] = "";
      }
    } else if (
      // required for voids
      key === "html" ||
      key === "textContent"
    ) {
      newElement[key] = "?";
    } else if (
      // important
      key === "type" ||
      // inlines info are required all attributes for check for merging
      // to see if it can be merged with the next one
      mergable ||
      // ui handler are required to get the context
      // for other normalization attributes
      key === "uiHandler" ||
      key === "context" ||
      key === "forEach"
    ) {
      newElement[key] = element[key];
    }
  })

  return newElement;
}

export function normalizeElement(
  element: RichElement | IRootLevelDocument,
  path: number[],
  root: IRootLevelDocument,
  customExecution?: ICustomExecution,
  specialRules?: ISpecialRules,
) {
  if (specialRules && specialRules.dontNormalize) {
    return;
  }

  const primaryExecution = customExecution || standardExecFn(root);

  let executionRoot = root;
  let executionElement = element;
  let secondaryExecution: ICustomExecution = null;
  if (!primaryExecution.workOnOriginal) {
    executionRoot = shallowRootCopy(root);
    secondaryExecution = standardExecFn(executionRoot);
    executionElement = getNodeFor(path, executionRoot) as RichElement;
  }

  internalNormalizeElement(executionElement, path, executionRoot, primaryExecution, secondaryExecution, specialRules);
}

function internalNormalizeElement(
  element: RichElement | IRootLevelDocument,
  path: number[],
  executionRoot: IRootLevelDocument,
  primaryExecution: ICustomExecution,
  secondaryExecution: ICustomExecution,
  specialRules?: ISpecialRules,
) {
  const type = element.type;

  const isIgnored = isIgnoredNode(path, specialRules);
  if (isIgnored) {
    return;
  }

  if (!specialRules || !(specialRules as any)._parentHandling) {
    runCustomNorm(
      "pre",
      element,
      path,
      executionRoot,
      primaryExecution,
      secondaryExecution,
      specialRules,
    );
  }

  // let's find invalid text inside superblock
  let offset = 0;
  let index = 0;
  while (true) {
    const actualChildIndex = index + offset;
    const childrenPath = [...path, actualChildIndex];
    const v = element.children[actualChildIndex];
    const isIgnored = isIgnoredNode(childrenPath, specialRules);

    if (isIgnored) {
      index++;
      continue;
    } else if (!v) {
      break;
    }

    const cannotHaveTextAsChildren = (
      (
        SERIALIZATION_REGISTRY.SUPERBLOCKS[type] &&
        // prevent deleting text in void superblocks
        !SERIALIZATION_REGISTRY.VOIDS[type]
      ) ||
      SERIALIZATION_REGISTRY.PROHIBIT_TEXT[type]
    );

    if (typeof (v as IText).text === "string") {
      if (cannotHaveTextAsChildren) {
        const wrapper = (
          SERIALIZATION_REGISTRY.ON_INVALID_TEXT_WRAP_WITH[type] ?
            SERIALIZATION_REGISTRY.ON_INVALID_TEXT_WRAP_WITH[type](v as IText) :
            null
        );
        if (!wrapper) {
          primaryExecution.deleteNodeAt(childrenPath);
          secondaryExecution && secondaryExecution.deleteNodeAt(childrenPath);
          offset -= 1;
        } else {
          primaryExecution.wrapNodeAt(childrenPath, wrapper);
          secondaryExecution && secondaryExecution.wrapNodeAt(childrenPath, wrapper);
        }
      }
    } else {
      const isAllowedType = SERIALIZATION_REGISTRY.ALLOWS_CHILDREN[type] ?
        SERIALIZATION_REGISTRY.ALLOWS_CHILDREN[type].includes((v as RichElement).type) : true;

      const isTextDeniedInSuperBlock = typeof (v as IText).text !== "undefined" &&
        SERIALIZATION_REGISTRY.SUPERBLOCKS[element.type];
      const isInlineDeniedInSuperBlock = SERIALIZATION_REGISTRY.INLINES[(v as RichElement).type] &&
        SERIALIZATION_REGISTRY.SUPERBLOCKS[element.type];
      const isInlineDeniedInInline = SERIALIZATION_REGISTRY.INLINES[(v as RichElement).type] &&
        SERIALIZATION_REGISTRY.INLINES[element.type];
      const isBlockDeniedInBlock = SERIALIZATION_REGISTRY.BLOCKS[(v as RichElement).type] &&
        SERIALIZATION_REGISTRY.BLOCKS[element.type];
      const isBlockDeniedInInline = SERIALIZATION_REGISTRY.BLOCKS[(v as RichElement).type] &&
        SERIALIZATION_REGISTRY.INLINES[element.type];
      const isSuperblockDeniedInBlock = SERIALIZATION_REGISTRY.SUPERBLOCKS[(v as RichElement).type] &&
        SERIALIZATION_REGISTRY.BLOCKS[element.type];
      const isSuperblockDeniedInInline = SERIALIZATION_REGISTRY.SUPERBLOCKS[(v as RichElement).type] &&
        SERIALIZATION_REGISTRY.INLINES[element.type];
      const isNonTextDeniedInVoid = typeof (v as IText).text === "undefined" &&
        SERIALIZATION_REGISTRY.VOIDS[element.type];

      const hasProblems = (
        !isAllowedType ||
        isInlineDeniedInSuperBlock ||
        isInlineDeniedInInline ||
        isBlockDeniedInBlock ||
        isBlockDeniedInInline ||
        isSuperblockDeniedInBlock ||
        isSuperblockDeniedInInline ||
        isNonTextDeniedInVoid
      );

      if (!hasProblems) {
        if ((v as RichElement).type) {
          internalNormalizeElement(
            v as RichElement,
            childrenPath,
            executionRoot,
            primaryExecution,
            secondaryExecution,
            { ...specialRules, _parentHandling: true } as any,
          );
        }
      } else {
        const canSolveByWrapping = (
          isInlineDeniedInSuperBlock ||
          isTextDeniedInSuperBlock ||
          (SERIALIZATION_REGISTRY.SUPERBLOCKS[element.type] && !isAllowedType)
        );

        const canSolveBySplitting = (
          isInlineDeniedInInline ||
          isBlockDeniedInBlock ||
          isSuperblockDeniedInBlock
        );

        const canSolveByDoubleSplitting = (
          isSuperblockDeniedInInline
        )

        if (canSolveByWrapping) {
          const wrapper = (
            SERIALIZATION_REGISTRY.ON_INVALID_CHILDREN_WRAP_WITH[type] ?
              SERIALIZATION_REGISTRY.ON_INVALID_CHILDREN_WRAP_WITH[type](v as RichElement) :
              null
          );
          if (!wrapper) {
            primaryExecution.deleteNodeAt(childrenPath);
            secondaryExecution && secondaryExecution.deleteNodeAt(childrenPath);
            offset -= 1;
          } else {
            primaryExecution.wrapNodeAt(childrenPath, wrapper);
            secondaryExecution && secondaryExecution.wrapNodeAt(childrenPath, wrapper);
            if (!isTextDeniedInSuperBlock) {
              internalNormalizeElement(
                element.children[actualChildIndex] as RichElement,
                childrenPath,
                executionRoot,
                primaryExecution,
                secondaryExecution,
                { ...specialRules, _parentHandling: true } as any,
              );
            }
          }
        } else if (canSolveBySplitting) {
          const expectedParentOfElementPath = [...path];
          expectedParentOfElementPath.pop();

          const targetToStorePath = isBlockDeniedInBlock || isSuperblockDeniedInBlock ? (
            expectedParentOfElementPath || []
          ) : expectedParentOfElementPath;

          const targetToStore = getNodeFor(targetToStorePath, executionRoot);

          const expectedType = isBlockDeniedInBlock || isSuperblockDeniedInBlock ? "superblock" : "block";

          // the target superblock is not its parent or no parent block was found
          if (!targetToStore || (expectedType === "superblock" ? isSuperBlock(targetToStore) : isBlock(targetToStore))) {
            console.warn("Cannot resolve, you have requested child normalization but the tree is invalid on the upper side");
          } else {
            // first let's create a new node after this that is a copy of this element
            primaryExecution.splitElementAndEscapeChildIntoParentAt(
              path,
              actualChildIndex,
            );
            secondaryExecution && secondaryExecution.splitElementAndEscapeChildIntoParentAt(
              path,
              actualChildIndex,
            );
            offset -= 1;

            // now our child exists next to the node we are normalizing
            // or it should be there
            const newChildIndex = path[path.length - 1] + 1;

            internalNormalizeElement(
              (targetToStore as RichElement).children[newChildIndex] as RichElement,
              targetToStorePath.concat([newChildIndex]),
              executionRoot,
              primaryExecution,
              secondaryExecution,
              { ...specialRules, _parentHandling: true } as any,
            );
          }
        } else if (canSolveByDoubleSplitting) {
          // pretty much only happens when a superblock is inside an inline
          // we move down two levels to get to the superblock
          const targetBlockPath = [...path];
          targetBlockPath.pop();

          const targetSuperBlock = getParentNodeFor(targetBlockPath, executionRoot);
          const targetBlock = getNodeFor(targetBlockPath, executionRoot);

          // this time we go two layers down to check, we are an inline and the child
          // is a superblock, we need to find the other superblock which should be two layers above
          if (!targetSuperBlock || !isSuperBlock(targetSuperBlock) || !targetBlock || !isBlock(targetBlock)) {
            console.warn("Cannot resolve, you have requested child normalization but the tree is invalid on the upper side");
          } else {
            // first let's split the superblock and escape it into the block
            // our element is the inline, and we are escaping the target superblock
            primaryExecution.splitElementAndEscapeChildIntoParentAt(
              path,
              actualChildIndex,
            );
            secondaryExecution && secondaryExecution.splitElementAndEscapeChildIntoParentAt(
              path,
              actualChildIndex,
            );
            offset -= 1;

            // now we need to find the child index that shoud be
            // right next to us (the inline) in the block
            // but that's still invalid
            const newChildIndexAtBlock = path[path.length - 1] + 1;

            // now we are escaping this same element, now from the parent block
            // into the superblock
            primaryExecution.splitElementAndEscapeChildIntoParentAt(
              targetBlockPath,
              newChildIndexAtBlock,
            );
            secondaryExecution && secondaryExecution.splitElementAndEscapeChildIntoParentAt(
              targetBlockPath,
              newChildIndexAtBlock,
            );

            // now we expect the child to be ahead of the target block
            const newChildPath = [...targetBlockPath];
            newChildPath[newChildPath.length - 1]++;

            const newChildIndexAtSuperBlock = newChildPath[newChildPath.length - 1];
            const ourElement = targetSuperBlock.children[newChildIndexAtSuperBlock] as RichElement;

            // and we request it to be normalized
            internalNormalizeElement(
              ourElement,
              newChildPath,
              executionRoot,
              primaryExecution,
              secondaryExecution,
              { ...specialRules, _parentHandling: true } as any,
            );
          }
        } else {
          // here goes isNonTextDeniedInVoid
          primaryExecution.deleteNodeAt(childrenPath);
          secondaryExecution && secondaryExecution.deleteNodeAt(childrenPath)
          offset -= 1;
        }
      }
    }

    index++;
  }

  // we only want to call these functions at the root level
  // so we normalize from there
  if (!specialRules || !(specialRules as any)._parentHandling) {
    if (specialRules && specialRules.useContextRulesOf) {
      normalizeAccordingToUIHAndlerRules(
        element,
        path,
        executionRoot,
        primaryExecution,
        secondaryExecution,
        specialRules,
      );
    }

    normalizeSpacing(
      element,
      path,
      primaryExecution,
      secondaryExecution,
      specialRules,
    );

    runCustomNorm(
      "post",
      element,
      path,
      executionRoot,
      primaryExecution,
      secondaryExecution,
      specialRules,
    );
  }
}

function runCustomNorm(
  time: "pre" | "post",
  element: RichElement | IRootLevelDocument,
  path: number[],
  executionRoot: IRootLevelDocument,
  primaryExecution: ICustomExecution,
  secondaryExecution: ICustomExecution,
  specialRules: ISpecialRules,
) {
  const customNorm = time === "pre" ?
    SERIALIZATION_REGISTRY.CUSTOM_NORMALIZER_PRE[element.type] :
    SERIALIZATION_REGISTRY.CUSTOM_NORMALIZER_POST[element.type];

  if (customNorm) {
    customNorm(element, path, executionRoot, primaryExecution, secondaryExecution, specialRules);
  }

  element.children.forEach((c, index) => {
    if (isElement(c)) {
      const childPath = [...path, index];
      runCustomNorm(
        time,
        c as any,
        childPath,
        executionRoot,
        primaryExecution,
        secondaryExecution,
        specialRules,
      )
    }
  });
}

const patchList = {
  inline: "void-inline",
  "void-inline": "inline",
  paragraph: "void-block",
  "void-block": "paragraph",
  container: "void-superblock",
  "void-superblock": "container",
}

function normalizeAccordingToUIHAndlerRules(
  element: RichElement | IRootLevelDocument,
  path: number[],
  executionRoot: IRootLevelDocument,
  primaryExecution: ICustomExecution,
  secondaryExecution: ICustomExecution,
  specialRules?: ISpecialRules,
) {
  const isIgnored = isIgnoredNode(path, specialRules);
  if (isIgnored) {
    return;
  }

  const uiHandler = (element as IElementBase).uiHandler;
  const contextForThisElement = getContextFor(
    path,
    "final",
    executionRoot,
    specialRules.useContextRulesOf,
  ) || specialRules.useContextRulesOf;

  let uiHandlerValue: ITemplateArgUIHandlerDefinition = contextForThisElement.properties[uiHandler] as ITemplateArgUIHandlerDefinition;
  if (!uiHandlerValue || uiHandlerValue.type !== "ui-handler") {
    uiHandlerValue = null;
  }

  const parentPath = [...path];
  parentPath.pop();

  let deleteAllChildren = false;
  const isSelfInvalidTypeForUIHandler = uiHandlerValue &&
    (
      (
        uiHandlerValue.mustBeOfType &&
        (
          Array.isArray(uiHandlerValue.mustBeOfType) ?
            !uiHandlerValue.mustBeOfType.includes(element.type as any) :
            uiHandlerValue.mustBeOfType !== element.type
        )
      )
    );
  const isUnallowedBecaseItsParentIsNotWhatSelfWants = uiHandlerValue &&
    (
      (
        uiHandlerValue.allowsParent &&
        !uiHandlerValue.allowsParent(
          primaryExecution.getNodeAt(parentPath) as RichElement,
          primaryExecution.getNodeAt(path) as RichElement,
        )
      )
    );
  if (isSelfInvalidTypeForUIHandler) {
    const isPatchable = !isUnallowedBecaseItsParentIsNotWhatSelfWants && patchList[element.type] &&
      (
        Array.isArray(uiHandlerValue.mustBeOfType) ?
          uiHandlerValue.mustBeOfType.includes(patchList[element.type]) :
          uiHandlerValue.mustBeOfType === patchList[element.type]
      );

    if (!isPatchable) {
      primaryExecution.deleteNodeAt(
        path,
      );
      secondaryExecution && secondaryExecution.deleteNodeAt(
        path,
      );
      return;
    } else {
      const patching: any = {
        type: patchList[element.type],
      };

      if (patchList[element.type] === "container") {
        patching.containerType = null;
      }

      primaryExecution.updateNodeAt(
        path,
        patching,
      );
      secondaryExecution && secondaryExecution.updateNodeAt(
        path,
        patching,
      );

      if (isVoid(element)) {
        deleteAllChildren = true;
      }
      return;
    }
  } else if (isUnallowedBecaseItsParentIsNotWhatSelfWants) {
    primaryExecution.deleteNodeAt(
      path,
    );
    secondaryExecution && secondaryExecution.deleteNodeAt(
      path,
    );
    return;
  }

  let offset = 0;
  const childrenAmount = element.children.length;
  for (let i = 0; i < childrenAmount; i++) {
    let actualIndex = i + offset;
    const currentNode = element.children[actualIndex];
    const currentNodePath = [...path, actualIndex];
    const isIgnored = isIgnoredNode(currentNodePath, specialRules);

    if (isIgnored || !currentNode) {
      // I don't know why sometimes it randomly offsets offs
      // the chrome debugger keeps crashing when I try to debug why
      continue;
    }

    if (isElement(currentNode) || deleteAllChildren) {
      const nodeActual = primaryExecution.getNodeAt(currentNodePath) as RichElement;
      const selfActual = primaryExecution.getNodeAt(path) as RichElement;

      const shouldDelete = deleteAllChildren ||
        (
          uiHandlerValue &&
          (
            uiHandlerValue.allowsChildren &&
            !uiHandlerValue.allowsChildren(
              nodeActual,
              selfActual,
            )
          )
        );

      if (shouldDelete) {
        const patch = deleteAllChildren ? null : (uiHandlerValue.patchChildren && uiHandlerValue.patchChildren(
          nodeActual,
          selfActual,
        ));

        if (patch) {
          primaryExecution.updateNodeAt(
            currentNodePath,
            patch,
          );
          secondaryExecution && secondaryExecution.updateNodeAt(
            currentNodePath,
            patch,
          );
          // now update that node with the rules
          normalizeAccordingToUIHAndlerRules(
            primaryExecution.getNodeAt(
              currentNodePath,
            ) as RichElement,
            currentNodePath,
            executionRoot,
            primaryExecution,
            secondaryExecution,
            specialRules,
          );
        } else {
          primaryExecution.deleteNodeAt(
            currentNodePath,
          );
          secondaryExecution && secondaryExecution.deleteNodeAt(
            currentNodePath,
          );
          offset--;
        }
      } else {
        normalizeAccordingToUIHAndlerRules(
          currentNode as RichElement,
          currentNodePath,
          executionRoot,
          primaryExecution,
          secondaryExecution,
          specialRules,
        );
      }
    }
  }
}

export function deserializeChildrenForNode(
  node: Node,
): Array<RichElement | IText> {
  const nodes = node.childNodes;

  const resultRaw: Array<RichElement | IText | Array<RichElement | IText>> = [];
  for (let cnode of nodes) {
    const currentNodeInfo = deserializeElement(cnode);
    resultRaw.push(currentNodeInfo);
  }

  let finalResult = resultRaw.flat().filter((n) => n !== null);
  return finalResult;
}

/**
  * Checks whether two nodes are mergable
  * @param n1 the first node
  * @param n2 the second node
  * @returns a boolean on whether they should merge
  */
export function checkShouldMerge(n1: RichElement | IText, n2: RichElement | IText) {
  const isN1Mergable = typeof (n1 as IText).text === "string" || SERIALIZATION_REGISTRY.MERGABLES[(n1 as RichElement).type];
  const isN2Mergable = typeof (n2 as IText).text === "string" || SERIALIZATION_REGISTRY.MERGABLES[(n2 as RichElement).type];

  if (!isN1Mergable || !isN2Mergable) {
    return false;
  }

  // first we take all the properties of these nodes and check that
  // every one of them passes
  return Object.keys(n1).concat(Object.keys(n2)).every((key) => {
    // we don't compare children nor the text content
    // of these
    if (key === "children" || key === "text") {
      // assume they pass
      return true;
    }

    // so we check for equality
    return equals(n1[key], n2[key], { strict: true });
  });
}

/**
 * Deserializes a single element from its node into a rich element
 * or a text
 * @returns a RichElement or a text node 
 */
function deserializeElement(
  node: Node,
): RichElement | IText | Array<RichElement | IText> {
  // first we get the tag name
  const tagName = (node as HTMLElement).tagName;
  // and we prepare the result
  let raw: RichElement | IText | Array<RichElement | IText> = null;
  // if there's no tag name, then it must be a text node
  if (!tagName) {
    raw = SERIALIZATION_REGISTRY.DESERIALIZE.text(node);
  } else {
    // now we get the class list first
    const classList = (node as HTMLElement).classList;

    // if we have it
    if (classList) {
      // we first search by prefix if there's a function
      const foundPrefix = Object.keys(SERIALIZATION_REGISTRY.DESERIALIZE.byClassNamePrefix).find((prefix) => {
        return classList.forEach((v) => v.startsWith(prefix));
      });

      // if we find it, we call it
      if (foundPrefix) {
        raw = SERIALIZATION_REGISTRY.DESERIALIZE.byClassNamePrefix[foundPrefix](node) as any;
      } else {
        // otherwise let's find by exact class
        const foundExactClass = Object.keys(SERIALIZATION_REGISTRY.DESERIALIZE.byClassName).find((className) => {
          return classList.contains(className);
        });

        // if we find it we call it
        if (foundExactClass) {
          raw = SERIALIZATION_REGISTRY.DESERIALIZE.byClassName[foundExactClass](node) as any;
        }
      }
    }

    // if all our previous attempts for some reason didn't get a result
    // and there's a raw tag catcher, then let's use that one
    if (!raw && SERIALIZATION_REGISTRY.DESERIALIZE.byTag[tagName]) {
      raw = SERIALIZATION_REGISTRY.DESERIALIZE.byTag[tagName](node) as any;
    }
  }

  return raw || null;
}

/**
 * Deserializes simple plain text into a cheated document
 * that is like a rich text, but split in paragraphs
 * @param data the data to deserialize, always a string
 * @param comparer a comparer to use against
 */
export function deserializePlain(data: string, comparer?: IRootLevelDocument) {
  // if the data is null use the null uuid otherwise construct an uuid from the data
  const expectedId = data === null ? NULL_UUID : uuidv5(data, TEXT_NAMESPACE);

  // if there's a comparer and the comparer matches the new uuid, then
  if (comparer && comparer.id === expectedId) {
    // return the comparer
    return comparer;
  }

  // now we can build the content
  const content = (data || "").split("\n");

  // and now we can build the root level document
  // for this given plain text
  const newDocument: IRootLevelDocument = {
    type: "document",
    id: expectedId,
    rich: false,
    children: content.map((c) => {
      return {
        type: "paragraph",
        subtype: "p",
        children: [
          {
            bold: false,
            italic: false,
            underline: false,
            text: c,
          },
        ],
      }
    }),
  };

  // and return it
  return newDocument;
}
