/**
 * Contains the serialization, reactification and deserialization functions
 * for the list element
 * 
 * The list represents ol and ul element itself
 * 
 * @module
 */

import { deserializeElement, IReactifyArg, ISerializationRegistryType, RichElement } from "..";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "../base";
import { IListItem } from "./list-item";
import { STANDARD_TEXT_NODE } from "./text";

/**
 * The function that registers and adds the list element in the given
 * registry
 * @param registry the registry to modify
 */
export function registerList(registry: ISerializationRegistryType) {

  /**
   * Serializes the element to its HTML form
   * @param list the list in question
   * @returns an html element
   */
  function serializeList(list: IList) {
    // so we call the base serialization
    return serializeElementBase(
      // the registry
      registry,
      // the list in question component
      list,
      // now the tag to use depends
      list.listType === "numbered" ? "ol" : "ul",
      // no base class
      null,
      // no extra attributes
      null,
      // the children to use
      list.children,
    );
  }
  
  /**
   * Deserializes an HTML node into the given list
   * rich element
   * @param node the node in question
   * @returns a list element structure
   */
  function deserializeList(node: HTMLDivElement): IList {
    // first we get the base
    const base = deserializeElementBase(node);

    // and construct the list
    const list: IList = {
      ...base,
      type: "list",
      containment: "list-superblock",
      listType: node.tagName === "OL" ? "numbered" : "bulleted",
      children: Array.from(node.childNodes).map(deserializeElement).filter((n) => n !== null) as IListItem[],
    }

    if (!list.children.length) {
      list.children = [
        {
          type: "list-item",
          containment: "block",
          children: [
            STANDARD_TEXT_NODE(),
          ],
        },
      ];
    };

    // return such
    return list;
  }

  /**
   * Reactifies the list that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyList(arg: IReactifyArg<IList>) {
    return reactifyElementBase(
      // the registry
      registry,
      // the tag to use
      arg.element.listType === "numbered" ? "ol" : "ul",
      // the base class
      null,
      // the children to use
      arg.element.children,
      // the function to wrap the children
      null,
      // pass the given arg once again
      arg,
    );
  }
  
  // register into the registry
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
  containment: "list-superblock",
  /**
   * A the list type
   */
  listType: "numbered" | "bulleted";

  /**
   * It needs to have list item as children
   */
  children: IListItem[];
}