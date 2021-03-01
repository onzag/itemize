/**
 * Contains the serialization, reactification and deserialization functions
 * for the quote element
 * 
 * @module
 */

import { deserializeElement, IReactifyArg, ISerializationRegistryType} from "..";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "../base";
import { IFile } from "./file";
import { ILink } from "./link";
import { IText, STANDARD_TEXT_NODE } from "./text";

/**
 * The function that registers and adds the quote element in the given
 * registry
 * @param registry the registry to modify
 */
export function registerQuote(registry: ISerializationRegistryType) {

  /**
   * converts a given quote rich element into its
   * HTML form
   * @param quote the quote rich element
   * @returns an HTML element
   */
  function serializeQuote(quote: IQuote) {
    // so we call the element base serialization function
    return serializeElementBase(
      // the registry
      registry,
      // the quote to use
      quote,
      // the tag we are using
      "blockquote",
      // no base class
      null,
      // no special attributes
      null,
      // the children
      quote.children,
    );
  }
  
  /**
   * Deserializes a given HTML element that is already
   * known as a quote into the given quote form
   * @param node the node in question
   * @returns a quote rich element
   */
  function deserializeQuote(node: HTMLQuoteElement): IQuote {
    // first we get the base
    const base = deserializeElementBase(node);

    // process the children
    const children = Array.from(node.childNodes).map(deserializeElement).filter((n) => n !== null) as any[];

    // and build the quote with the base
    const quote: IQuote = {
      ...base,
      type: "quote",
      containment: "block",
      children: children.length ? children : [
        STANDARD_TEXT_NODE(),
      ],
    }

    // return the quote
    return quote;
  }

  /**
   * Reactifies a paragraph that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyQuote(arg: IReactifyArg<IQuote>) {
    // so we call the reactify element base function
    return reactifyElementBase(
      // with the registry
      registry,
      // the tag to use
      "blockquote",
      // no base class
      null,
      // the children to use
      arg.element.children,
      // nothing to use as a wrap function
      null,
      // the argument itself
      arg,
    );
  }

  // add in the registry
  registry.REACTIFY.quote = reactifyQuote;
  registry.SERIALIZE.quote = serializeQuote;
  registry.DESERIALIZE.byTag.QUOTE = deserializeQuote;
}

/**
 * Represents a quote tag
 */
export interface IQuote extends IElementBase {
  /**
   * Represents the type
   */
  type: "quote";
  /**
   * refers that it can't contain anything
   */
  containment: "block",
  /**
   * Represents the children
   */
  children: Array<IText | ILink | IFile>;
}