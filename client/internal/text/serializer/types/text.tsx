/**
 * Contains the serialization, reactification and deserialization functions
 * for the text node
 * 
 * the text node is special as it's not a rich element itself and supports
 * quite different things from the rich element itself
 * 
 * @module
 */

import React from "react";
import { allowsText, IReactifyArg, ISerializationRegistryType } from "..";
import { convertStyleStringToReactObject } from "../base";

/**
 * Represents a standard text node as it should be given
 * for a void text node
 */
export const STANDARD_TEXT_NODE = (text?: string): IText => {
  return {
    bold: false,
    italic: false,
    underline: false,
    text: text || "",
  }
};

const spaceRegex = /^\s+$/;

/**
 * The function that registers and adds the text node in the given
 * registry
 * @param registry the registry to modify
 */
export function registerText(registry: ISerializationRegistryType) {

  /**
  * Serializes a text type to html
  * @param text the text
  * @returns an html node
  */
  function serializeText(text: IText): Node {
    // now we create a text node with the text content
    const textNode = document.createTextNode(text.text);

    // but this will be the final, by itself is the node
    // we just created
    let final: Node = textNode;

    // if it's bold, we wrap it in strong tag
    if (text.bold) {
      const strong = document.createElement("strong");
      strong.appendChild(final);
      final = strong;
    }

    // if it's italic we wrap it in i tag
    if (text.italic) {
      const i = document.createElement("i");
      i.appendChild(final);
      final = i;
    }

    // if it's underline, well, same thing
    if (text.underline) {
      const u = document.createElement("u");
      u.appendChild(final);
      final = u;
    }

    if (text.style) {
      if ((final as HTMLElement).tagName) {
        (final as HTMLElement).setAttribute("style", text.style);
      } else {
        const span = document.createElement("span");
        span.setAttribute("style", text.style);
        span.appendChild(final);
        final = span;
      }
    }

    // and return that
    return final;
  }

  /**
   * Deserializes a given node into a text
   * structure that represents its content
   * 
   * note how it takes a node itself as sometimes
   * things like i, span, etc... tags, count as text
   * 
   * @param node the node in question
   */
  function deserializeText(node: Node): IText {
    // no node
    if (!node) {
      // then simply standard text node
      // this can happen with a node that has no children
      // but we are always expected to have one
      return STANDARD_TEXT_NODE();
    }

    // now we can start picking this appart
    // first we consider if the node might be a HTML element
    const nodeAsHTMLElement = node as HTMLElement;
    // if it's strong or B
    if (nodeAsHTMLElement.tagName === "STRONG" || nodeAsHTMLElement.tagName === "B") {
      // we need to get its text value, if any
      const textValue = Array.from(node.childNodes).map(deserializeText).filter((n) => n !== null)[0] || STANDARD_TEXT_NODE();
      // it's bold
      textValue.bold = true;
      const style = nodeAsHTMLElement.getAttribute("style");
      if (style) {
        textValue.style = style;
      }
      return textValue;
      // we do the same we did before for I
    } else if (nodeAsHTMLElement.tagName === "I") {
      const textValue = Array.from(node.childNodes).map(deserializeText).filter((n) => n !== null)[0] || STANDARD_TEXT_NODE();
      textValue.italic = true;
      const style = nodeAsHTMLElement.getAttribute("style");
      if (style) {
        textValue.style = style;
      }
      return textValue;
      // Underline
    } else if (nodeAsHTMLElement.tagName === "U") {
      const textValue = Array.from(node.childNodes).map(deserializeText).filter((n) => n !== null)[0] || STANDARD_TEXT_NODE();
      textValue.underline = true;
      const style = nodeAsHTMLElement.getAttribute("style");
      if (style) {
        textValue.style = style;
      }
      return textValue;
      // and span
    } else if (nodeAsHTMLElement.tagName === "SPAN") {
      const textValue = Array.from(node.childNodes).map(deserializeText).filter((n) => n !== null)[0] || STANDARD_TEXT_NODE();
      const style = nodeAsHTMLElement.getAttribute("style");
      if (style) {
        textValue.style = style;
      }
      return textValue;
    }

    // then we return this
    return {
      text: node.textContent,
      bold: false,
      italic: false,
      underline: false,
    };
  }

  /**
   * Reactifies a given text node that has already
   * been deserialized into a reactified form
   * for usage in rich text editors and whatnot
   * @param arg the text in question
   */
  function reactifyText(arg: IReactifyArg<IText>) {
    // the new custom props
    const newCustomProps = {
      ...arg.customProps,
      key: arg.key,
    };

    // delete unwanted spaces from bad normalization
    if (
      arg.parent &&
      !allowsText(arg.parent) &&
      spaceRegex.test(arg.element.text)
    ) {
      return null;
    }

    // we change the style as required
    if (arg.element.bold) {
      newCustomProps.style = {
        ...newCustomProps.style,
        fontWeight: "bold",
      }
    }
    if (arg.element.italic) {
      newCustomProps.style = {
        ...newCustomProps.style,
        fontStyle: "italic",
      }
    }
    if (arg.element.underline) {
      newCustomProps.style = {
        ...newCustomProps.style,
        textDecoration: "underline",
      }
    }
    if (arg.element.style) {
      newCustomProps.style = {
        ...newCustomProps.style,
        ...convertStyleStringToReactObject(arg.element.style),
      }
    }

    // now we add the text if we haven't specified custom children
    if (!newCustomProps.children) {
      newCustomProps.children = arg.element.text;
    }

    if (arg.extraOptions && arg.extraOptions.onCustomAttributesFor) {
      const extraProps = arg.extraOptions.onCustomAttributesFor(arg.element, {
        path: arg.path,
        sentenceNumber: arg.accumulatedSentence.value,
        wordNumber: arg.accumulatedWord.value,
      });
      if (extraProps) {
        Object.keys(extraProps).forEach((attr) => {
          newCustomProps[attr] = extraProps[attr];
        });
      }
    }

    // we return directly, no use of base because this is a text node
    // itself, the reactification does it in a single level
    // because text editor would like it so
    let toRender: React.ReactNode;

    if (arg.extraOptions && arg.extraOptions.onCustom) {
      toRender = arg.extraOptions.onCustom(arg.element, newCustomProps, {
        Tag: "span",
        defaultReturn: () => (<span {...newCustomProps} />),
        parent: arg.parent,
        tree: arg.tree,
        path: arg.path,
        sentenceNumber: arg.accumulatedSentence.value,
        wordNumber: arg.accumulatedWord.value,
        trueParent: arg.trueParent,
      });
    } else {
      toRender = (
        <span {...newCustomProps} />
      );
    }

    if (arg.extraOptions && arg.extraOptions.onCustomWrap) {
      return arg.extraOptions.onCustomWrap(
        arg.element,
        toRender,
        {
          path: arg.path,
          sentenceNumber: arg.accumulatedSentence.value,
          wordNumber: arg.accumulatedWord.value,
        },
      );
    }

    return (
      <React.Fragment key={arg.key}>
        {toRender}
      </React.Fragment>
    );
  }

  // add to the registry itself
  registry.REACTIFY.text = reactifyText;
  registry.SERIALIZE.text = serializeText;
  registry.DESERIALIZE.byTag.B = deserializeText;
  registry.DESERIALIZE.byTag.STRONG = deserializeText;
  registry.DESERIALIZE.byTag.I = deserializeText;
  registry.DESERIALIZE.byTag.SPAN = deserializeText;
  registry.DESERIALIZE.text = deserializeText;
}

/**
 * Represents the basic text type for the slate editor support
 */
export interface IText {
  /**
   * Represents the text content
   */
  text: string;
  /**
   * Whether the text is in bold
   */
  bold: boolean;
  /**
   * Whether the text is in italic
   */
  italic: boolean;
  /**
   * Whether the text is underline
   */
  underline: boolean;
  /**
   * customized style
   */
  style?: string;
}