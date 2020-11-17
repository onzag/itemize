import React from "react";
import { ISerializationRegistryType, RichElement } from ".";
import { serializeElementBase, deserializeElementBase, IElementBase, deserializeElement, reactifyElementBase } from "./base";
import { IListItem } from "./list-item";

export function registerList(registry: ISerializationRegistryType) {
  const boundDeserializeElement = deserializeElement.bind(null, registry);

  function serializeList(list: IList) {
    return serializeElementBase(
      registry,
      list,
      list.listType === "numbered" ? "ol" : "ul",
      null,
      null,
      list.children,
    );
  }
  
  function deserializeList(node: HTMLDivElement): IList {
    const base = deserializeElementBase(node);
    const list: IList = {
      ...base,
      type: "list",
      containment: "list-item",
      listType: node.tagName === "OL" ? "numbered" : "bulleted",
      children: Array.from(node.childNodes).map(boundDeserializeElement).filter((n) => n !== null) as IListItem[],
    }
    return list;
  }

  function reactifyList(list: IList, customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,) {
    return reactifyElementBase(
      registry,
      list,
      list.listType === "numbered" ? "ol" : "ul",
      null,
      null,
      customProps,
      list.children,
    );
  }

  registry.REACTIFY.list = reactifyList;
  registry.SERIALIZE.list = serializeList;
  registry.DESERIALIZE.byTag.OL = deserializeList;
  registry.DESERIALIZE.byTag.UL = deserializeList;
}

/**
 * The container represents a div contaner type
 * of the class container for the text specs
 */
export interface IList extends IElementBase {
  type: "list";
  /**
   * it can only contain list items
   */
  containment: "list-item",
  /**
   * A the list type
   */
  listType: "numbered" | "bulleted";

  /**
   * It needs to have list item as children
   */
  children: IListItem[];
}