import React from "react";
import { ISerializationRegistryType } from ".";
import { deserializeElementBase, IElementBase, reactifyElementBase, serializeElementBase } from "./base";
import { IText } from "./text";

export function registerParagraph(registry: ISerializationRegistryType) {
  function serializeParagraph(p: IParagraph) {
    return serializeElementBase(registry, p, p.subtype, null, null, p.children);
  }
  
  function deserializeParagraph(node: HTMLElement): IParagraph {
    const base = deserializeElementBase(node);
    const paragraph: IParagraph = {
      ...base,
      type: "paragraph",
      subtype: node.tagName.toLowerCase() as any,
      children: [
        registry.DESERIALIZE.text(node.childNodes[0])
      ],
    }
    return paragraph;
  }

  function reactifyParagraph(paragraph: IParagraph, customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,) {
    return reactifyElementBase(
      registry,
      paragraph,
      paragraph.subtype,
      null,
      null,
      customProps,
      paragraph.children,
    );
  }

  registry.REACTIFY.paragraph = reactifyParagraph;
  registry.SERIALIZE.paragraph = serializeParagraph;
  registry.DESERIALIZE.byTag.P = deserializeParagraph;
  registry.DESERIALIZE.byTag.DIV = deserializeParagraph;
  registry.DESERIALIZE.byTag.SPAN = deserializeParagraph;
}

/**
 * Represents the paragraph, p type for the
 * rich text specification
 * but it might also be a div or a span
 */
export interface IParagraph extends IElementBase {
  type: "paragraph",
  subtype: "p" | "div" | "span",

  /**
   * The paragraph only has one children and it's text
   * as it only contains text within it
   */
  children: [
    IText,
  ];
}