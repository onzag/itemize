import React from "react";
import { ISerializationRegistryType } from ".";
import { deserializeElement, deserializeElementBase, IElementBase, reactifyElementBase, serializeElementBase } from "./base";
import { ILink } from "./link";
import { IText, STANDARD_TEXT_NODE } from "./text";

export function registerParagraph(registry: ISerializationRegistryType) {
  function serializeParagraph(p: IParagraph) {
    return serializeElementBase(registry, p, "p", null, null, p.children);
  }
  
  function deserializeParagraph(node: HTMLElement): IParagraph {
    const base = deserializeElementBase(node);
    const children = Array.from(node.childNodes).map(registry.DESERIALIZE.text).filter((n) => n !== null);
    const paragraph: IParagraph = {
      ...base,
      type: "paragraph",
      containment: "block",
      children: children.length ? children : [STANDARD_TEXT_NODE],
    }
    return paragraph;
  }

  function reactifyParagraph(paragraph: IParagraph, customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,) {
    return reactifyElementBase(
      registry,
      paragraph,
      "p",
      null,
      null,
      customProps,
      paragraph.children,
    );
  }

  registry.REACTIFY.paragraph = reactifyParagraph;
  registry.SERIALIZE.paragraph = serializeParagraph;
  registry.DESERIALIZE.byTag.P = deserializeParagraph;
}

/**
 * Represents the paragraph, p type for the
 * rich text specification
 * but it might also be a div or a span
 */
export interface IParagraph extends IElementBase {
  type: "paragraph",
  /**
   * refers that it can't contain anything
   */
  containment: "block",

  /**
   * The paragraph children can be either text or link
   */
  children: Array<IText | ILink>;
}