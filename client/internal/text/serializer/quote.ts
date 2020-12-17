import React from "react";
import { ISerializationRegistryType} from ".";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase, deserializeElement, IReactifyTemplateOptions } from "./base";
import { IFile } from "./file";
import { ILink } from "./link";
import { IText, STANDARD_TEXT_NODE } from "./text";

export function registerQuote(registry: ISerializationRegistryType) {
  const boundDeserializeElement = deserializeElement.bind(null, registry);
  function serializeQuote(quote: IQuote) {
    return serializeElementBase(
      registry,
      quote,
      "blockquote",
      null,
      null,
      quote.children,
    );
  }
  
  function deserializeQuote(node: HTMLQuoteElement): IQuote {
    const base = deserializeElementBase(node);
    const children = Array.from(node.childNodes).map(boundDeserializeElement).filter((n) => n !== null) as any[];
    const quote: IQuote = {
      ...base,
      type: "quote",
      containment: "block",
      children: children.length ? children : [
        STANDARD_TEXT_NODE,
      ],
    }
    return quote;
  }

  function reactifyQuote(
    quote: IQuote,
    active: boolean,
    customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
    templateOptions?: IReactifyTemplateOptions,
  ) {
    return reactifyElementBase(
      registry,
      active,
      quote,
      "blockquote",
      null,
      null,
      customProps,
      quote.children,
      templateOptions,
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
   * refers that it can't contain anything
   */
  containment: "block",
  /**
   * Represents the children
   */
  children: Array<IText | ILink | IFile>;
}