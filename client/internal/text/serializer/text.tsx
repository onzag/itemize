import React from "react";
import { ISerializationRegistryType } from ".";

export const STANDARD_TEXT_NODE = {
  bold: false,
  italic: false,
  underline: false,
  templateText: null as string,
  text: "",
};

export function registerText(registry: ISerializationRegistryType) {
  /**
  * Serializes a text type to html
  * @param text the text
  * @returns an html node
  */
  function serializeText(text: IText): Node {
    const textNode = document.createTextNode(text.text);
    let final: Node = textNode;
    if (text.bold) {
      const strong = document.createElement("strong");
      strong.appendChild(final);
      final = strong;
    }
    if (text.italic) {
      const i = document.createElement("i");
      i.appendChild(final);
      final = i;
    }
    if (text.underline) {
      const u = document.createElement("u");
      u.appendChild(final);
      final = u;
    }
    if (text.templateText) {
      const span = document.createElement("span");
      span.dataset.text = text.templateText;
      span.appendChild(final);
      final = span;
    }
    return final;
  }

  function deserializeText(node: Node): IText {
    if (!node) {
      return {
        text: "",
        bold: false,
        italic: false,
        underline: false,
        templateText: null,
      }
    }

    const nodeAsHTMLElement = node as HTMLElement;
    if (nodeAsHTMLElement.tagName === "STRONG" || nodeAsHTMLElement.tagName === "B") {
      const textValue = Array.from(node.childNodes).map(deserializeText).filter((n) => n !== null)[0] || STANDARD_TEXT_NODE;
      textValue.bold = true;
      textValue.templateText = nodeAsHTMLElement.dataset.text || textValue.templateText;
      return textValue;
    } else if (nodeAsHTMLElement.tagName === "I") {
      const textValue = Array.from(node.childNodes).map(deserializeText).filter((n) => n !== null)[0] || STANDARD_TEXT_NODE;
      textValue.italic = true;
      textValue.templateText = nodeAsHTMLElement.dataset.text || textValue.templateText;
      return textValue;
    } else if (nodeAsHTMLElement.tagName === "U") {
      const textValue = Array.from(node.childNodes).map(deserializeText).filter((n) => n !== null)[0] || STANDARD_TEXT_NODE;
      textValue.underline = true;
      textValue.templateText = nodeAsHTMLElement.dataset.text || textValue.templateText;
      return textValue;
    } else if (nodeAsHTMLElement.tagName === "SPAN") {
      const textValue = Array.from(node.childNodes).map(deserializeText).filter((n) => n !== null)[0] || STANDARD_TEXT_NODE;
      textValue.templateText = nodeAsHTMLElement.dataset.text || textValue.templateText;
      return textValue;
    }

    let actualTextContent: string = node.textContent;

    const shouldCheckForTrimStart = actualTextContent[0] === " " || actualTextContent[0] === "\n";
    const lastCharIndex = actualTextContent.length - 1;
    const shouldCheckForTrimEnd = actualTextContent[lastCharIndex] === " " || actualTextContent[lastCharIndex] === "\n";

    let needsTrimStart = false;
    let needsTrimEnd = false;

    if (shouldCheckForTrimStart) {
      needsTrimStart = true;

      let previousNode = node;
      while (previousNode) {
        previousNode = previousNode.previousSibling;
        if (!previousNode) {
          break;
        }
        const text = (previousNode instanceof HTMLElement) ? previousNode.innerText : previousNode.textContent.trim();
        if (text) {
          needsTrimStart = false;
          break;
        }
      }
    }

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

    if (needsTrimStart) {
      actualTextContent = actualTextContent.trimStart();
    }
    if (needsTrimEnd) {
      actualTextContent = actualTextContent.trimEnd();
    }

    if (actualTextContent.length === 0 || actualTextContent === "\n") {
      return null;
    }

    return {
      text: actualTextContent,
      bold: false,
      italic: false,
      underline: false,
      templateText: null,
    };
  }

  function reactifyText(text: IText, customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,) {
    const newCustomProps = {
      ...customProps
    };
    if (text.bold) {
      newCustomProps.style = {
        ...newCustomProps.style,
        fontWeight: "bold",
      }
    }
    if (text.italic) {
      newCustomProps.style = {
        ...newCustomProps.style,
        fontStyle: "italic",
      }
    }
    if (text.underline) {
      newCustomProps.style = {
        ...newCustomProps.style,
        textDecoration: "underline",
      }
    }
    if (text.templateText) {
      newCustomProps.className = (newCustomProps.className || "") + " template";
      newCustomProps.title = text.templateText;
    }
    return (
      <span {...newCustomProps}/>
    );
  }

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
   * templated content
   */
  templateText: string;
}