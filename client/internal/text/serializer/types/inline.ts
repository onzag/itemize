/**
 * Contains the serialization, reactification and deserialization functions
 * for the inline element, which is basically a span which contains only text
 * it's primarily used for the templated components
 * 
 * @module
 */

import { IReactifyArg, ISerializationRegistryType, RichElement, deserializeElement } from "..";
import { CONTAINER_CLASS, CONTAINER_CLASS_PREFIX } from "../..";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "../base";
import { IText } from "./text";

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
      // no class
      null,
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
  function deserializeInline(node: HTMLDivElement): IInline {
    // first we take the base
    const base = deserializeElementBase(node);

    // now we can build the inline itself
    const inline: IInline = {
      ...base,
      type: "inline",
      containment: "inline",
      children: Array.from(node.childNodes).map(deserializeElement).filter((n) => n !== null) as IText[],
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
      null,
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
  registry.DESERIALIZE.byTag.SPAN = deserializeInline;
}

/**
 * The inline represents a span inline type
 * for the text specs
 */
export interface IInline extends IElementBase {
  type: "inline";
  /**
   * refers to be able to contain blocks or other super blocks, etc...
   */
  containment: "inline";

  /**
   * It can have as many children as it requires
   * but not text directly
   */
  children: IText[];
}
