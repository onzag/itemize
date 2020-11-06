import React from "react";
import { ISerializationRegistryType} from ".";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "./base";
import { IText } from "./text";

export function registerQuote(registry: ISerializationRegistryType) {
  function serializeQuote(quote: IQuote) {
    return serializeElementBase(
      registry,
      quote,
      "quote",
      null,
      null,
      quote.children,
    );
  }
  
  function deserializeQuote(node: HTMLQuoteElement): IQuote {
    const base = deserializeElementBase(node);
    const quote: IQuote = {
      ...base,
      type: "quote",
      children: [registry.DESERIALIZE.text(node.childNodes[0])],
    }
    return quote;
  }

  function reactifyQuote(quote: IQuote, customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,) {
    return reactifyElementBase(
      registry,
      quote,
      "quote",
      null,
      null,
      customProps,
      quote.children,
    );
  }

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
   * Represents the children
   */
  children: [
    IText,
  ];
}