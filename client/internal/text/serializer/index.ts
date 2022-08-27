/**
 * This file contains the serializer and deserializer basic functionality that allows
 * to handle the standard itemize text specification
 * 
 * @module
 */

import React from "react";
import { DOMWindow } from "../../../../util";
import { copyElementBase } from "./base";
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
import { ITable, ITbody, ITd, IThead, ITr, registerTableElements } from "./types/table";
import { TemplateArgs } from "./template-args";
import uuidv5 from "uuid/v5";
import equals from "deep-equal";

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
  onImageSelect?: (arg: IImage, e: MouseEvent) => void;
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
  SUPERBLOCKS: {},
  REACTIFY: {}
}

// NOW we register all the elements that are part of this
// by passing them to the function
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
export type RichElement = IRootLevelDocument | IParagraph | IContainer | ICustom | ILink | IQuote | ITitle | IImage |
  IFile | IVideo | IList | IListItem | IInline | ITable | ITr | ITbody | IThead | ITd;

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
export function deserialize(html: string | Node[], comparer?: IRootLevelDocument) {

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
  normalize(newDocument);

  // return it
  return newDocument;
}

export function normalize(
  document: IRootLevelDocument,
): IRootLevelDocument {
  if (!document.rich) {
    return document;
  }
  return normalizeElement(document as any, [], []) as any;
}

interface ICustomExecution {
  deleteTextNode: (node: IText, path: number[], parent: RichElement) => void,
  deleteElement: (element: RichElement, path: number[], parent: RichElement) => void,
  wrapTextNode: (node: IText, wrappers: RichElement[], path: number[], parent: RichElement) => void,
  wrapElement: (element: RichElement, wrappers: RichElement[], path: number[], parent: RichElement) => void,
  insertTextNode: (element: RichElement, path: number[], targetIndex: number, textToInsert: IText) => void,
  insertElement: (element: RichElement, path: number[], targetIndex: number, elementToInsert: RichElement) => void,
  mergeElements: (element: RichElement, path: number[], parent: RichElement, secondChild: RichElement, secondChildPath: number[]) => void,
  mergeText: (text: IText, path: number[], parent: RichElement, secondChild: IText, secondChildPath: number[]) => void,
  splitElementAndEscapeChildIntoParent: (element: RichElement, path: number[], parent: RichElement, escapingChildIndex: number) => void;
};

interface ISpecialRules {
  ignorePaths: number[][];

}

const standardExec: ICustomExecution = {
  deleteTextNode(node: IText, path: number[], parent: RichElement) {
    parent.children.splice(path[path.length - 1], 1);
  },
  deleteElement(node: RichElement, path: number[], parent: RichElement) {
    parent.children.splice(path[path.length - 1], 1);
  },
  wrapTextNode(node: IText, wrappers: RichElement[], path: number[], parent: RichElement) {
    const indexAtChild = path[path.length - 1];
    wrappers.forEach((w) => {
      const wrappedChild = w;
      wrappedChild.children = [parent.children[indexAtChild]] as any;
      parent.children[indexAtChild] = wrappedChild;
    });
  },
  wrapElement(element: RichElement, wrappers: RichElement[], path: number[], parent: RichElement) {
    const indexAtChild = path[path.length - 1];
    wrappers.forEach((w) => {
      const wrappedChild = w;
      wrappedChild.children = [parent.children[indexAtChild]] as any;
      parent.children[indexAtChild] = wrappedChild;
    });
  },
  insertTextNode(element: RichElement, path: number[], targetIndex: number, textToInsert: IText) {
    element.children.splice(targetIndex, 0, textToInsert);
  },
  insertElement(element: RichElement, path: number[], targetIndex: number, elementToInsert: RichElement) {
    element.children.splice(targetIndex, 0, elementToInsert);
  },
  mergeElements(base: RichElement, path: number[], parent: RichElement, reference: RichElement, referencePath: number[]) {
    base.children = (base.children as any).concat(reference.children);
    parent.children.splice(referencePath[referencePath.length - 1], 1);
  },
  mergeText(base: IText, path: number[], parent: RichElement, reference: IText, referencePath: number[]) {
    base.text += reference.text;
    parent.children.splice(referencePath[referencePath.length - 1], 1);
  },
  splitElementAndEscapeChildIntoParent(element: RichElement, path: number[], parent: RichElement, escapingChildIndex: number) {
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
  }
}

function normalizeSpacing(element: RichElement, path: number[], customExecution: ICustomExecution) {
  // if there are children in the result and they happen
  // to be some inline in them we need to ensure there are
  // empty text nodes between the inlines so they
  // can be selected properly
  if (
    element.children.length &&
    element.children.some((r) => (r as RichElement).type && SERIALIZATION_REGISTRY.INLINES[(r as RichElement).type])
  ) {
    // and now we loop in each one of the children
    let offset = 0;
    for (let i = 0; i < element.children.length; i++) {
      let actualIndex = i + offset;
      const currentNode = element.children[actualIndex];
      if ((currentNode as RichElement).type && SERIALIZATION_REGISTRY.INLINES[(currentNode as RichElement).type]) {
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

          customExecution.insertTextNode(
            element,
            path,
            // insert where we are now and push us forwards
            actualIndex,
            textReference,
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

          customExecution.insertTextNode(
            element,
            path,
            // insert ahead of where we are now and push everything else
            // forwards
            actualIndex + 1,
            textReference,
          );

          actualIndex += 1;
          offset += 1;
        }
      }
    };
  }

  // DELETE EMPTY TEXT NODES
  if (element.children.length >= 2) {
    let offset = 0;
    for (let i = 1; i < element.children.length; i++) {
      const actualIndex = i + offset;
      const v = element.children[actualIndex];
  
      if (typeof (v as IText).text !== "undefined" && !(v as IText).text) {
        customExecution.deleteTextNode(
          v as IText,
          [...path, actualIndex],
          element,
        );
        offset -= 1;
      }
    }
  }

  if (
    element.children.length === 0 &&
    (
      SERIALIZATION_REGISTRY.INLINES[element.type] ||
      SERIALIZATION_REGISTRY.BLOCKS[element.type]
    )
  ) {
    if (!SERIALIZATION_REGISTRY.PROHIBIT_TEXT[element.type]) {
      customExecution.insertTextNode(
        element,
        path,
        0,
        STANDARD_TEXT_NODE(),
      );
    } else {
      customExecution.insertElement(
        element,
        path,
        0,
        SERIALIZATION_REGISTRY.ON_EMPTY_FILL_WITH[element.type](),
      );
    }
  } else if (element.children.length >= 2) {
    let offset = 0;
    for (let i = 0; i < element.children.length; i++) {
      const actualIndex = i + offset;
      if (i === 0) {
        continue;
      }

      const n1 = element.children[actualIndex - 1];
      const n2 = element.children[actualIndex];

      const shouldMerge = checkShouldMerge(n1, n2);

      if (shouldMerge) {
        if (typeof (n1 as IText) !== "undefined") {
          customExecution.mergeText(
            n1 as IText,
            [...path, actualIndex - 1],
            element,
            n2 as IText,
            [...path, actualIndex],
          );
        } else {
          customExecution.mergeElements(
            n1 as RichElement,
            [...path, actualIndex - 1],
            element,
            n2 as RichElement,
            [...path, actualIndex],
          );
        }
        offset -= 1;
      }
    }
  }

  element.children.forEach((c, index) => {
    if ((c as RichElement).type) {
      normalizeSpacing(c as RichElement, [...path, index], customExecution);
    }
  })
}

export function normalizeElement(
  element: RichElement,
  path: number[],
  parentList: [RichElement, number[]][],
  customExecution: ICustomExecution = standardExec
) {
  const type = element.type;

  if (SERIALIZATION_REGISTRY.VOIDS[type]) {
    element.children = [STANDARD_TEXT_NODE()];
    return;
  }

  const parentListReversed = parentList.reverse();
  const parentInline = parentListReversed.find((p) => SERIALIZATION_REGISTRY.INLINES[p[0].type]);
  const parentBlock = parentListReversed.find((p) => SERIALIZATION_REGISTRY.BLOCKS[p[0].type]);
  const parentSuperBlock = parentListReversed.find((p) => SERIALIZATION_REGISTRY.SUPERBLOCKS[p[0].type]);

  const nextParentList: [RichElement, number[]][] = [...parentList, [element, path]];
  // let's find invalid text inside superblock
  let offset = 0;
  let index = 0;
  while (true) {
    const actualChildIndex = index + offset;
    const childrenPath = [...path, actualChildIndex];
    const v = element.children[actualChildIndex];

    if (!v) {
      break;
    }

    const cannotHaveTextAsChildren = (
      SERIALIZATION_REGISTRY.SUPERBLOCKS[type] ||
      SERIALIZATION_REGISTRY.PROHIBIT_TEXT[type]
    );

    if (typeof (v as IText).text === "string" && cannotHaveTextAsChildren) {
      const wrapper = (
        SERIALIZATION_REGISTRY.ON_INVALID_TEXT_WRAP_WITH[type] ?
          SERIALIZATION_REGISTRY.ON_INVALID_TEXT_WRAP_WITH[type](v as IText) :
          null
      );
      if (!wrapper) {
        customExecution.deleteTextNode(v as IText, childrenPath, element);
        offset -= 1;
      } else {
        customExecution.wrapTextNode(v as IText, wrapper, childrenPath, element);
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

      const hasProblems = (
        !isAllowedType ||
        isInlineDeniedInSuperBlock ||
        isInlineDeniedInInline ||
        isBlockDeniedInBlock ||
        isBlockDeniedInInline ||
        isSuperblockDeniedInBlock ||
        isSuperblockDeniedInInline
      );

      if (!hasProblems) {
        if ((v as RichElement).type) {
          normalizeElement(
            v as RichElement,
            childrenPath,
            nextParentList,
            customExecution,
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
            if (isTextDeniedInSuperBlock) {
              customExecution.deleteTextNode(v as IText, childrenPath, element);
            } else {
              customExecution.deleteElement(v as RichElement, childrenPath, element);
            }
            offset -= 1;
          } else {
            if (isTextDeniedInSuperBlock) {
              customExecution.wrapTextNode(v as IText, wrapper, childrenPath, element);
            } else {
              customExecution.wrapElement(v as RichElement, wrapper, childrenPath, element);
              normalizeElement(
                element.children[actualChildIndex] as RichElement,
                childrenPath,
                nextParentList,
                customExecution,
              );
            }
          }
        } else if (canSolveBySplitting) {
          const targetToStore = isBlockDeniedInBlock || isSuperblockDeniedInBlock ? (
            parentSuperBlock || parentList[0]
          ) : parentBlock;

          // the target superblock is not its parent or no parent block was found
          if (!targetToStore || targetToStore[1].length !== path.length - 1) {
            console.warn("Cannot resolve, you have requested child normalization but the tree is invalid on the upper side");
          } else {
            // first let's create a new node after this that is a copy of this element
            customExecution.splitElementAndEscapeChildIntoParent(
              element,
              path,
              targetToStore[0],
              actualChildIndex,
            );
            offset -= 1;

            const newChildIndex = path[path.length - 1] + 1;

            normalizeElement(
              targetToStore[0].children[newChildIndex] as RichElement,
              targetToStore[1].concat([newChildIndex]),
              parentList,
              customExecution,
            );
          }
        } else if (canSolveByDoubleSplitting) {
          // pretty much only happens when a superblock is inside an inline
          const targetToStore = parentSuperBlock || parentList[0];

          // this time we go two layers down to check, we are an inline and the child
          // is a superblock, we need to find the other superblock which should be two layers above
          if (!targetToStore || targetToStore[1].length !== path.length - 2) {
            console.warn("Cannot resolve, you have requested child normalization but the tree is invalid on the upper side");
          } else {
            // first let's split the superblock and escape it into the block
            customExecution.splitElementAndEscapeChildIntoParent(
              element,
              path,
              parentBlock[0],
              actualChildIndex,
            );
            offset -= 1;

            const newChildIndexLvl1 = path[path.length - 1] + 1;

            customExecution.splitElementAndEscapeChildIntoParent(
              parentBlock[0],
              parentBlock[1],
              targetToStore[0],
              // we expect the child to be now in the position
              // where we are right now but one ahead
              newChildIndexLvl1,
            );

            const newChildIndexLvl2 = path[path.length - 2] + 1;

            normalizeElement(
              targetToStore[0].children[newChildIndexLvl2] as RichElement,
              targetToStore[1].concat([newChildIndexLvl2]),
              parentList,
              customExecution,
            );
          }
        } else {
          customExecution.deleteElement(v as RichElement, childrenPath, element);
          offset -= 1;
        }
      }
    }

    index++;
  }

  normalizeSpacing(
    element,
    path,
    customExecution,
  );
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
  const isN1Inline = typeof (n1 as IText).text === "string" || SERIALIZATION_REGISTRY.INLINES[(n1 as RichElement).type];
  const isN2Inline = typeof (n2 as IText).text === "string" || SERIALIZATION_REGISTRY.INLINES[(n2 as RichElement).type];

  if (!isN1Inline || !isN2Inline) {
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

  // invalid or unknown tag that can't deserialize
  // if (!raw) {
  //   return null;
  // }

  // const isText = typeof (raw as IText).text !== "undefined";
  // if (isText && !SERIALIZATION_REGISTRY.PROHIBIT_TEXT[parent]) {
  //   // text placed right in
  //   return SERIALIZATION_REGISTRY.ON_INVALID_TEXT[parent] ?
  //     SERIALIZATION_REGISTRY.ON_INVALID_TEXT[parent](raw as IText) :
  //     null;
  // } else if (
  //   (SERIALIZATION_REGISTRY.SUPERBLOCKS[parent] && isText) ||
  //   (SERIALIZATION_REGISTRY.BLOCKS[parent] && (
  //     SERIALIZATION_REGISTRY.SUPERBLOCKS[(raw as RichElement).type] ||
  //     SERIALIZATION_REGISTRY.BLOCKS[(raw as RichElement).type]
  //   )) ||
  //   (SERIALIZATION_REGISTRY.INLINES[parent] && !isText) ||
  //   (SERIALIZATION_REGISTRY.ALLOWS_CHILDREN[parent] && !SERIALIZATION_REGISTRY.ALLOWS_CHILDREN[parent].includes((raw as RichElement).type))
  // ) {
  //   return SERIALIZATION_REGISTRY.ON_INVALID_CHILDREN[parent] ?
  //     SERIALIZATION_REGISTRY.ON_INVALID_CHILDREN[parent](raw as RichElement) :
  //     null;
  // }

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
