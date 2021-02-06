/**
 * Contains the serialization, reactification and deserialization functions
 * for the title element
 * 
 * @packageDocumentation
 */

import { title } from "process";
import { deserializeElement, IReactifyArg, ISerializationRegistryType } from "..";
import { deserializeElementBase, IElementBase, reactifyElementBase, serializeElementBase } from "../base";
import { IFile } from "./file";
import { ILink } from "./link";
import { IText, STANDARD_TEXT_NODE } from "./text";

/**
 * The function that registers and adds the title element in the given
 * registry
 * @param registry the registry to modify
 */
export function registerTitle(registry: ISerializationRegistryType) {

  /**
   * converts a given title rich element into its
   * HTML form
   * @param title the title rich element
   * @returns an HTML element
   */
  function serializeTitle(title: ITitle) {
    // we just call the base function
    return serializeElementBase(registry, title, title.subtype, null, null, title.children);
  }
  
  /**
   * Deserializes a given HTML element that is already
   * known as a title into the given title form
   * @param node the node in question
   * @returns a title rich element
   */
  function deserializeTitle(node: HTMLElement): ITitle {
    // first we get the base
    const base = deserializeElementBase(node);
    // process the children
    const children = Array.from(node.childNodes).map(deserializeElement).filter((n) => n !== null) as any[];

    // and then build the title form
    const title: ITitle = {
      ...base,
      type: "title",
      containment: "block",
      subtype: node.tagName.toLowerCase() as any,
      children: children.length ? children : [STANDARD_TEXT_NODE()],
    }

    // return it
    return title;
  }
  
  /**
   * Reactifies a title that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyTitle(arg: IReactifyArg<ITitle>) {
    // return by reactification
    return reactifyElementBase(
      // the registry
      registry,
      // the tag we are using is the same of the subtype, h1, h2, h3
      arg.element.subtype,
      // no base class
      null,
      // the children to use
      arg.element.children,
      // no wrap children function
      null,
      // and the arg itself
      arg,
    );
  }

  // add all to the registry
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
  type: "title";
  subtype: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /**
   * refers that it can only contain inline elements
   */
  containment: "block",

  /**
   * The title only has one children and it's text
   * as it only contains text within it
   */
  children: Array<IText | ILink | IFile>;
}