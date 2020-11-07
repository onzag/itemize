import React from "react";
import { ISerializationRegistryType } from ".";
import { deserializeElementBase, IElementBase, reactifyElementBase, serializeElementBase } from "./base";
import { IText } from "./text";

export function registerTitle(registry: ISerializationRegistryType) {
  function serializeTitle(title: ITitle) {
    return serializeElementBase(registry, title, title.subtype, null, null, title.children);
  }
  
  function deserializeTitle(node: HTMLElement): ITitle {
    const base = deserializeElementBase(node);
    const title: ITitle = {
      ...base,
      type: "title",
      subtype: node.tagName.toLowerCase() as any,
      children: [registry.DESERIALIZE.text(node.childNodes[0])],
    }
    return title;
  }
  
  function reactifyTitle(title: ITitle, customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,) {
    return reactifyElementBase(
      registry,
      title,
      title.subtype,
      null,
      null,
      customProps,
      title.children,
    );
  }

  registry.REACTIFY.title = reactifyTitle;
  registry.SERIALIZE.title = serializeTitle;
  registry.DESERIALIZE.byTag.H1 = deserializeTitle;
  registry.DESERIALIZE.byTag.H2 = deserializeTitle;
  registry.DESERIALIZE.byTag.H3 = deserializeTitle;
  registry.DESERIALIZE.byTag.H4 = deserializeTitle;
  registry.DESERIALIZE.byTag.H5 = deserializeTitle;
  registry.DESERIALIZE.byTag.H6 = deserializeTitle;
}

/**
 * Represents the title, h1, h2, h3, etc...
 * for the rich text specification
 */
export interface ITitle extends IElementBase {
  type: "title",
  subtype: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",

  /**
   * The title only has one children and it's text
   * as it only contains text within it
   */
  children: [
    IText,
  ];
}