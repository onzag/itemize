/**
 * Contains the serialization, reactification and deserialization functions
 * for the paragraph element
 * 
 * @packageDocumentation
 */

import { deserializeElement, IReactifyArg, ISerializationRegistryType } from "..";
import { deserializeElementBase, IElementBase, reactifyElementBase, serializeElementBase } from "../base";
import { IFile } from "./file";
import { ILink } from "./link";
import { IText, STANDARD_TEXT_NODE } from "./text";

export function STANDARD_PARAGRAPH(): IParagraph {
  return {
    type: "paragraph",
    containment: "block",
    children: [STANDARD_TEXT_NODE()],
  };
};

/**
 * The function that registers and adds the paragraph element in the given
 * registry
 * @param registry the registry to modify
 */
export function registerParagraph(registry: ISerializationRegistryType) {

  /**
   * converts a given paragraph rich element into its
   * HTML form
   * @param p the paragraph rich element
   * @returns an HTML element
   */
  function serializeParagraph(p: IParagraph) {
    // simple
    return serializeElementBase(registry, p, "p", null, null, p.children);
  }
  
  /**
   * Deserializes an HTML node into the given paragraph
   * rich element
   * @param node the node in question
   * @returns a paragraph element structure
   */
  function deserializeParagraph(node: HTMLElement): IParagraph {
    // first let's get trhe base
    const base = deserializeElementBase(node);
    // now let's get the children
    const children = Array.from(node.childNodes).map(deserializeElement).filter((n) => n !== null) as any[];

    // and build the paragraph itself
    const paragraph: IParagraph = {
      ...base,
      type: "paragraph",
      containment: "block",
      children: children.length ? children : [STANDARD_TEXT_NODE()],
    }

    // return it
    return paragraph;
  }

  /**
   * Reactifies a paragraph that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyParagraph(arg: IReactifyArg<IParagraph>) {
    return reactifyElementBase(
      // the registry
      registry,
      // the tag to use
      "p",
      // no base class name
      null,
      // the children to use
      arg.element.children,
      // no wrap children function
      null,
      // the arg itself
      arg,
    );
  }

  // register in the registry
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
   * The paragraph children can be either text or link or file for the inlines
   */
  children: Array<IText | ILink | IFile>;
}