/**
 * Contains the serialization, reactification and deserialization functions
 * for the inline element, which is basically a span which contains only text
 * it's primarily used for the templated components
 * 
 * @module
 */

import { IReactifyArg, ISerializationRegistryType, deserializeChildrenForNode, RichElement } from "..";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "../base";
import { IText, STANDARD_TEXT_NODE } from "./text";

/**
 * The function that registers and adds the inline in the given
 * reigstry
 * @param registry the registry to modify
 */
export function registerInline(registry: ISerializationRegistryType) {

  /**
   * The function that serializes the inline into HTML
   * @param inline the inline in question
   * @returns an HTML Element
   */
  function serializeInline(inline: IInline) {
    // calls the serialize element base function
    return serializeElementBase(
      // the registry
      registry,
      // the inline in question
      inline,
      // the element should be a span element type
      "span",
      // inline class
      "inline",
      // no special attributes
      null,
      // the children inside the inline, these are rich elements
      inline.children,
    );
  }

  /**
   * Converts a HTML element that is already considered a inline
   * into the IInline form
   * @param node the node in question
   * @returns a inline element structure
   */
  function deserializeInline(node: HTMLSpanElement): IInline {
    // first we take the base
    const base = deserializeElementBase(node);

    const children = deserializeChildrenForNode(node) as IText[];

    // now we can build the inline itself
    const inline: IInline = {
      ...base,
      type: "inline",
      children: children.length ? children : [STANDARD_TEXT_NODE()],
    }

    // return it
    return inline;
  }

  /**
   * Reactifies the inline that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyInline(arg: IReactifyArg<IInline>) {
    // we retrun from the base
    return reactifyElementBase(
      // the registry
      registry,
      // the span element
      "span",
      // we pass either the inline type prefixed or the inline class itself
      "inline",
      // the children of the inline
      arg.element.children,
      // no wrap children function
      null,
      // and the arg of reactification
      arg,
    );
  }

  // register in the registry
  registry.REACTIFY.inline = reactifyInline;
  registry.SERIALIZE.inline = serializeInline;
  registry.INLINES.inline = true;

  registry.DESERIALIZE.byClassName.inline = deserializeInline;
  registry.MERGABLES.inline = true;
}

/**
 * The inline represents a span inline type
 * for the text specs
 */
export interface IInline extends IElementBase {
  type: "inline";

  /**
   * It can have as many children as it requires
   * but not text directly
   */
  children: IText[];
}
