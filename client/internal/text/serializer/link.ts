import React from "react";
import { ISerializationRegistryType } from ".";
import { IAttrs, serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "./base";
import { IText, STANDARD_TEXT_NODE } from "./text";

export function registerLink(registry: ISerializationRegistryType) {
  function serializeLink(link: ILink) {
    const attrs: IAttrs = {};
    if (link.thref) {
      attrs["data-thref"] = link.thref;
    } else if (link.href) {
      attrs.href = link.href;
    }
  
    return serializeElementBase(
      registry,
      link,
      "a",
      null,
      attrs,
      link.children,
    );
  }
  
  function deserializeLink(node: HTMLAnchorElement): ILink {
    const base = deserializeElementBase(node);
    let href: string = null;
    let thref: string = null;
  
    if (node.dataset.href) {
      thref = node.dataset.href;
    } else {
      href = node.href || null;
    }

    const children = Array.from(node.childNodes).map(registry.DESERIALIZE.text).filter((n) => n !== null);
  
    const link: ILink = {
      ...base,
      type: "link",
      containment: "inline",
      href,
      thref,
      children: children.length ? children : [STANDARD_TEXT_NODE],
    }
    return link;
  }

  function reactifyLink(link: ILink, active: boolean, customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,) {
    const newCustomProps = {
      ...customProps,
    };
    if (link.href && active) {
      (newCustomProps as any).href = link.href;
    }
    if (link.thref) {
      newCustomProps.className = (newCustomProps.className || "") + " template";
      newCustomProps.title = link.thref;
    }
    return reactifyElementBase(
      registry,
      active,
      link,
      "a",
      null,
      null,
      newCustomProps,
      link.children,
    );
  }

  registry.REACTIFY.link = reactifyLink;
  registry.SERIALIZE.link = serializeLink;
  registry.DESERIALIZE.byTag.A = deserializeLink;
}

/**
 * The link represents an a type
 */
export interface ILink extends IElementBase {
  type: "link";
  /**
   * can only contain text
   */
  containment: "inline",
  /**
   * Represents the standard href attribute
   */
  href: string;
  /**
   * The children for the link is a text that specifies the link
   */
  children: IText[];
  /**
   * Represents the data-href templating attribute
   */
  thref: string;
}