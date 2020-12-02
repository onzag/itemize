import React from "react";
import { DOMWindow } from "../../../../util";
import { deserializeElement } from "./base";
import { IContainer, registerContainer } from "./container";
import { ICustom, registerCustom } from "./custom";
import { IFile, registerFile } from "./file";
import { IImage, registerImage } from "./image";
import { ILink, registerLink } from "./link";
import { IParagraph, registerParagraph } from "./paragraph";
import { IQuote, registerQuote } from "./quote";
import { IText, registerText } from "./text";
import { ITitle, registerTitle } from "./title";
import { IVideo, registerVideo } from "./video";
import uuidv5 from "uuid/v5";
import { IList, registerList } from "./list";
import { IListItem, registerListItem } from "./list-item";

type DeserializationFn = (n: Node) => RichElement | IText;

interface IDeserializeRegistryType {
  [attr: string]: DeserializationFn;
}

export interface ISerializationRegistryType {
  SERIALIZE: {
    [type: string]: (element: RichElement | IText) => Node
  };
  DESERIALIZE: {
    byClassNamePrefix: IDeserializeRegistryType;
    byClassName: IDeserializeRegistryType;
    byTag: IDeserializeRegistryType;
    text: (n: Node) => IText;
  };
  REACTIFY: {
    [type: string]: (element: RichElement | IText, active: boolean, customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) => React.ReactNode;
  };
}

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

registerContainer(SERIALIZATION_REGISTRY);
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

export type RichElement = IParagraph | IContainer | ICustom | ILink | IQuote | ITitle | IImage | IFile | IVideo | IList | IListItem;

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

const TEXT_NAMESPACE = "ee6ce529-24f8-455b-8dd0-8b5bd377820d";
const NULL_UUID = "83dd556b-889f-4a9b-aff0-f749a35a9c0f";

/**
 * Serializes a document
 * will return html elements for rich documents
 * or a string for plain documents
 * @param document 
 */
export function serialize(root: IRootLevelDocument): HTMLElement[] | string {
  if (!root) {
    return null;
  }

  if (root.children.length === 0) {
    return null;
  }

  if (!root.rich) {
    let result: string = "";
    root.children.forEach((paragraph: IParagraph) => {
      if (result) {
        result += "\n";
      }
      result += (paragraph.children[0] as IText).text || "";
    });
    return result;
  }

  const lastElement = root.children[root.children.length - 1];
  const lastNeedsDropping = lastElement.type === "paragraph" && (lastElement.children[0] as IText).text === "";
  const childrenToProcess = lastNeedsDropping ? [...root.children] : root.children;
  if (lastNeedsDropping) {
    childrenToProcess.pop();
  }

  if (childrenToProcess.length === 0) {
    return null;
  }

  const results = childrenToProcess.map(serializeElement).filter((n) => n !== null) as HTMLElement[];

  if (results.length === 0) {
    return null;
  }

  return results;
}

/**
 * Serializes a single element as it's given in the rich form
 * @param element 
 */
function serializeElement(element: RichElement) {
  if (SERIALIZATION_REGISTRY.SERIALIZE[element.type]) {
    const fn = SERIALIZATION_REGISTRY.SERIALIZE[element.type];
    const childElement = fn(element);
    return childElement;
  }
  return null;
}

/**
 * Deserializes a document from the HTML form
 * @param html 
 */
export function deserialize(html: string | Node[], comparer?: IRootLevelDocument) {
  let data: string;

  const boundDeserializeElement = deserializeElement.bind(null, SERIALIZATION_REGISTRY);

  let childNodes: Node[] = null;
  if (typeof html === "string") {
    const cheapdiv = DOMWindow.document.createElement("div");
    cheapdiv.innerHTML = html;
    childNodes = Array.from(cheapdiv.childNodes);
    data = html;
  } else {
    childNodes = html || [];
    if (html !== null) {
      const cheapdiv = DOMWindow.document.createElement("div");
      Array.from(html).forEach((n) => {
        cheapdiv.appendChild(n);
      });
      data = cheapdiv.innerHTML;
    } else {
      data = null;
    }
  }

  const expectedId = data === null ? NULL_UUID : uuidv5(data, TEXT_NAMESPACE);
  if (comparer && comparer.id === expectedId) {
    return comparer;
  }

  const finalChildren = childNodes.map(boundDeserializeElement).filter((n) => n !== null) as RichElement[];

  const newDocument: IRootLevelDocument = {
    type: "document",
    id: expectedId,
    rich: true,
    children: finalChildren.length === 0 ?
      [
        {
          type: "paragraph",
          containment: "block",
          children: [
            {
              bold: false,
              italic: false,
              underline: false,
              text: "",
              templateText: null,
            }
          ]
        }
      ] :
      finalChildren,
  };

  return newDocument;
}

export function deserializePlain(data: string, comparer?: IRootLevelDocument) {
  const expectedId = data === null ? NULL_UUID : uuidv5(data, TEXT_NAMESPACE);

  if (comparer && comparer.id === expectedId) {
    return comparer;
  }

  const content = (data || "").split("\n");

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
            templateText: null,
          },
        ],
      }
    }),
  };

  return newDocument;
}