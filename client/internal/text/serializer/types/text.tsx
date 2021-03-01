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
import { IReactifyArg, ISerializationRegistryType } from "..";

/**
 * Represents a standard text node as it should be given
 * for a void text node
 */
export const STANDARD_TEXT_NODE = () => {
  return {
    bold: false,
    italic: false,
    underline: false,
    text: "",
  }
};

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
      return textValue;
      // we do the same we did before for I
    } else if (nodeAsHTMLElement.tagName === "I") {
      const textValue = Array.from(node.childNodes).map(deserializeText).filter((n) => n !== null)[0] || STANDARD_TEXT_NODE();
      textValue.italic = true;
      return textValue;
      // Underline
    } else if (nodeAsHTMLElement.tagName === "U") {
      const textValue = Array.from(node.childNodes).map(deserializeText).filter((n) => n !== null)[0] || STANDARD_TEXT_NODE();
      textValue.underline = true;
      return textValue;
      // and span
    }

    // now if it's a text node and it's not an HTML element
    // we must check this
    let actualTextContent: string = node.textContent;

    // we want to know if we are going to trim, the text content might be some
    // sort of multiline weirdness, which can cause issues
    const shouldCheckForTrimStart = actualTextContent[0] === " " || actualTextContent[0] === "\n";
    const lastCharIndex = actualTextContent.length - 1;
    const shouldCheckForTrimEnd = actualTextContent[lastCharIndex] === " " || actualTextContent[lastCharIndex] === "\n";

    // by default we do not trim
    let needsTrimStart = false;
    let needsTrimEnd = false;

    // but we check now
    if (shouldCheckForTrimStart) {
      // we consider that we will trim
      needsTrimStart = true;

      // and now we will loop into the nodes
      let previousNode = node;
      // while we have one
      while (previousNode) {
        // we will get into the previous sibling of our current
        // node, this is not in the children itself, it's the previous
        // sibling of our current node
        previousNode = previousNode.previousSibling;
        // if we don't have one, then we will trim
        // because our character is just there, dangling
        if (!previousNode) {
          break;
        }
        // otherwise let's get the text of that previous node, if we have any
        const text = (previousNode instanceof HTMLElement) ? previousNode.innerText : previousNode.textContent.trim();

        // if there's text before, in any of those previous nodes
        if (text) {
          // we do not trim
          needsTrimStart = false;
          break;
        }
      }
    }

    // now we do the same for trim ending
    if (shouldCheckForTrimEnd) {
      needsTrimEnd = true;

      let nextNode = node;
      while (nextNode) {
        nextNode = nextNode.nextSibling;
        if (!nextNode) {
          break;
        }
        const text = (nextNode instanceof HTMLElement) ? nextNode.innerText : nextNode.textContent.trim();
        if (text) {
          needsTrimEnd = false;
          break;
        }
      }
    }

    // now we use the content of these
    // in order to decide our trimming policy
    if (needsTrimStart) {
      actualTextContent = actualTextContent.trimStart();
    }
    if (needsTrimEnd) {
      actualTextContent = actualTextContent.trimEnd();
    }

    // and if we have nothing remaning
    if (actualTextContent.length === 0 || actualTextContent === "\n") {
      // we just drop our text content
      return null;
    }

    // then we return this
    return {
      text: actualTextContent,
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

    // now we add the text if we haven't specified custom children
    if (!newCustomProps.children) {
      newCustomProps.children = arg.element.text;
    }

    // we return directly, no use of base because this is a text node
    // itself, the reactification does it in a single level
    // because text editor would like it so
    return (
      <span {...newCustomProps} />
    );
  }

  // add to the registry itself
  registry.REACTIFY.text = reactifyText;
  registry.SERIALIZE.text = serializeText;
  registry.DESERIALIZE.byTag.B = deserializeText;
  registry.DESERIALIZE.byTag.STRONG = deserializeText;
  registry.DESERIALIZE.byTag.I = deserializeText;
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
}