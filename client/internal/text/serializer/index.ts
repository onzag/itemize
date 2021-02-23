/**
 * This file contains the serializer and deserializer basic functionality that allows
 * to handle the standard itemize text specification
 * 
 * @packageDocumentation
 */

import React from "react";
import { DOMWindow } from "../../../../util";
import { copyElementBase } from "./base";
import { IContainer, registerContainer } from "./types/container";
import { ICustom, registerCustom } from "./types/custom";
import { IFile, registerFile } from "./types/file";
import { IImage, registerImage } from "./types/image";
import { ILink, registerLink } from "./types/link";
import { IParagraph, registerParagraph } from "./types/paragraph";
import { IQuote, registerQuote } from "./types/quote";
import { IText, registerText, STANDARD_TEXT_NODE } from "./types/text";
import { ITitle, registerTitle } from "./types/title";
import { IVideo, registerVideo } from "./types/video";
import { IList, registerList } from "./types/list";
import { IListItem, registerListItem } from "./types/list-item";
import { IInline, registerInline } from "./types/inline";
import { TemplateArgs } from "./template-args";
import uuidv5 from "uuid/v5";

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

/**
 * This is what a rich element can be, it can be all these
 * but it's not a text
 */
export type RichElement = IParagraph | IContainer | ICustom | ILink | IQuote | ITitle | IImage | IFile | IVideo | IList | IListItem | IInline;

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
    lastElement.children.length === 1;
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
  const finalChildren = childNodes.map(deserializeElement).filter((n) => n !== null) as RichElement[];

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
          containment: "block",
          children: [STANDARD_TEXT_NODE()]
        }
      ] :
      finalChildren,
  };

  // return it
  return newDocument;
}

/**
 * Deserializes a single element from its node into a rich element
 * or a text
 * @param node the html node to deserialize
 * @returns a RichElement or a text node 
 */
export function deserializeElement(node: Node): RichElement | IText {
  // first we get the tag name
  const tagName = (node as HTMLElement).tagName;
  // if there's no tag name, then it must be a text node
  if (!tagName) {
    return SERIALIZATION_REGISTRY.DESERIALIZE.text(node);
  }

  // and we prepare the result
  let result: RichElement | IText = null;

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
      result = SERIALIZATION_REGISTRY.DESERIALIZE.byClassNamePrefix[foundPrefix](node) as any;
    } else {
      // otherwise let's find by exact class
      const foundExactClass = Object.keys(SERIALIZATION_REGISTRY.DESERIALIZE.byClassName).find((className) => {
        return classList.contains(className);
      });

      // if we find it we call it
      if (foundExactClass) {
        result = SERIALIZATION_REGISTRY.DESERIALIZE.byClassName[foundExactClass](node) as any;
      }
    }
  }

  // if all our previous attempts for some reason didn't get a result
  // and there's a raw tag catcher, then let's use that one
  if (!result && SERIALIZATION_REGISTRY.DESERIALIZE.byTag[tagName]) {
    result = SERIALIZATION_REGISTRY.DESERIALIZE.byTag[tagName](node) as any;
  }

  // if there are children in the result and they happen
  // to be some inline in them we need to ensure there are
  // empty text nodes between the inlines so they
  // can be selected properly
  if (
    (result as RichElement).children &&
    (result as RichElement).children.length &&
    (result as RichElement).children.some((r: any) => r.containment === "inline")
  ) {
    // so we prepare a modified array
    let modifiedArrayVersion: any[] = [];

    // and now we loop in each one of the children
    (result as RichElement).children.forEach((currentNode: any, index: number) => {
      if (currentNode.containment === "inline") {
        // get our current, prev, and next node from the parsed values
        const prevNode: any = (result as RichElement).children[index - 1];
        const nextNode: any = (result as RichElement).children[index + 1];

        // we need these texts from reference and they are taken from
        // the currentNode, inside the inline element, in order to populate
        // the gaps
        const textNodeStart = currentNode.children[0];
        const textNodeEnd = currentNode.children[currentNode.children.length - 1];

        // and now we get our last node from the modified array version
        // since it can be different from our standard as we keep adding these
        // spacer gaps, we are trying to spot a gap, eg, when two inlines are together
        const lastNodeInModified = modifiedArrayVersion[modifiedArrayVersion.length - 1];

        // if there's no previous node, eg at the start of a paragraph there is an inline
        // or when the previous is not a text, we need a spacer gap
        // but we only need it if it's not already there in our modified
        // array version eg. when two inlines are right next to each other
        // one will add to the end, so this new one is not necessary
        if (
          (!prevNode || typeof prevNode.text === "undefined") &&
          (!lastNodeInModified || typeof lastNodeInModified.text === "undefined")
        ) {
          // we use the start text as a reference for the spacer gap
          const textReference = {
            bold: false,
            italic: false,
            underline: false,
            ...copyElementBase(textNodeStart),
            text: "",
          }

          // and now we push it
          modifiedArrayVersion.push(textReference);
        }

        // now we add our inline
        modifiedArrayVersion.push(currentNode);

        // and now we repeat the same process for the next node
        // that should be between the inline
        if (!nextNode || typeof nextNode.text === "undefined") {
          const textReference = {
            bold: false,
            italic: false,
            underline: false,
            ...copyElementBase(textNodeEnd),
            text: "",
          }

          modifiedArrayVersion.push(textReference);
        }
      } else {
        // for whatever else we just add the node
        modifiedArrayVersion.push(currentNode);
      }
    });

    (result as RichElement).children = modifiedArrayVersion;
  }

  // return the given result
  return result;
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
        containment: "block",
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
