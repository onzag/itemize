/**
 * Contains the serialization, reactification and deserialization functions
 * for the list item element
 * 
 * The list item represents both li components inside ol and ul lists
 * 
 * @packageDocumentation
 */

import { deserializeElement, IReactifyArg, ISerializationRegistryType } from "..";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "../base";
import { ILink } from "./link";
import { IText, STANDARD_TEXT_NODE } from "./text";

/**
 * The function that registers and adds the list-item element in the given
 * registry
 * @param registry the registry to modify
 */
export function registerListItem(registry: ISerializationRegistryType) {

  /**
   * The function that serializes the list-item element into HTML
   * @param li the list item element
   * @returns an HTML node
   */
  function serializeListItem(li: IListItem) {
    // very simple straightforward conversion
    // li is nothing but a container for the primary list
    return serializeElementBase(registry, li, "li", null, null, li.children);
  }

  /**
   * Converts a HTML element that is already considered a list item
   * element into the given rich element form
   * @param node the node in question
   * @returns a list-item element structure
   */
  function deserializeListItem(node: HTMLElement): IListItem {
    // first we prepare the base
    const base = deserializeElementBase(node);
    // then we deserialize all the child nodes with the generic function
    const children = Array.from(node.childNodes).map(deserializeElement).filter((n) => n !== null) as any[];

    // and now we can do this
    const li: IListItem = {
      ...base,
      type: "list-item",
      containment: "block",
      children: children.length ? children : [STANDARD_TEXT_NODE()],
    }

    // and return it
    return li;
  }

  /**
   * Reactifies the list item that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyListItem(arg: IReactifyArg<IListItem>) {
    // we pass it to the base function
    return reactifyElementBase(
      // the registry in question
      registry,
      // we will use a li for the element tag
      "li",
      // no base class
      null,
      // the children we are using
      arg.element.children,
      // no wrap children function
      null,
      // the arg again
      arg,
    );
  }

  // register the list item
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