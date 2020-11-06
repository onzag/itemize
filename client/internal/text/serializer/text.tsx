import React from "react";
import { ISerializationRegistryType } from ".";

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
    return final;
  }

  function deserializeText(node: Node): IText {
    if (!node) {
      return {
        text: "",
        bold: false,
        italic: false,
      }
    }

    const nodeAsHTMLElement = node as HTMLElement;
    if (nodeAsHTMLElement.tagName === "STRONG" || nodeAsHTMLElement.tagName === "B") {
      const textValue = deserializeText(node.childNodes[0]);
      textValue.bold = true;
      return textValue;
    } else if (nodeAsHTMLElement.tagName === "I") {
      const textValue = deserializeText(node.childNodes[0]);
      textValue.italic = true;
      return textValue;
    }

    return {
      text: node.textContent,
      bold: false,
      italic: false,
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
    return (
      <span {...newCustomProps}/>
    );
  }

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
}