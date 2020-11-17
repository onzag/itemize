import React from "react";
import { ISerializationRegistryType } from ".";
import { serializeElementBase, deserializeElementBase, IElementBase, deserializeElement, reactifyElementBase } from "./base";
import { ILink } from "./link";
import { IText, STANDARD_TEXT_NODE } from "./text";

export function registerListItem(registry: ISerializationRegistryType) {
  function serializeListItem(li: IListItem) {
    return serializeElementBase(registry, li, "li", null, null, li.children);
  }

  function deserializeListItem(node: HTMLElement): IListItem {
    const base = deserializeElementBase(node);
    const children = Array.from(node.childNodes).map(registry.DESERIALIZE.text).filter((n) => n !== null);
    const li: IListItem = {
      ...base,
      type: "list-item",
      containment: "block",
      children: children.length ? children : [STANDARD_TEXT_NODE],
    }
    return li;
  }

  function reactifyListItem(li: IListItem, customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,) {
    return reactifyElementBase(
      registry,
      li,
      "li",
      null,
      null,
      customProps,
      li.children,
    );
  }

  registry.REACTIFY["list-item"] = reactifyListItem;
  registry.SERIALIZE["list-item"] = serializeListItem;
  registry.DESERIALIZE.byTag.LI = deserializeListItem;
}

/**
 * The container represents a div contaner type
 * of the class container for the text specs
 */
export interface IListItem extends IElementBase {
  type: "list-item";
  /**
   * can only contain text
   */
  containment: "block",

  /**
   * It needs to have list item as children
   */
  children: Array<IText | ILink>;
}