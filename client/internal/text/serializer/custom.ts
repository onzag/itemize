import React from "react";
import { RichElement, ISerializationRegistryType } from ".";
import { CUSTOM_CLASS_PREFIX } from "..";
import { serializeElementBase, deserializeElementBase, deserializeElement, IElementBase, reactifyElementBase } from "./base";

export function registerCustom(registry: ISerializationRegistryType) {
  const boundDeserializeElement = deserializeElement.bind(null, registry);

  function serializeCustom(custom: ICustom) {
    return serializeElementBase(
      registry,
      custom,
      "div",
      CUSTOM_CLASS_PREFIX + custom.customType,
      null,
      custom.children,
    );
  }
  
  function deserializeCustom(node: HTMLDivElement): ICustom {
    const base = deserializeElementBase(node);
    let customType: string = null;
    node.classList.forEach((c) => {
      if (c.startsWith(CUSTOM_CLASS_PREFIX)) {
        customType = c.substr(CUSTOM_CLASS_PREFIX.length);
      }
    });
    const custom: ICustom = {
      ...base,
      type: "custom",
      customType,
      children: Array.from(node.childNodes).map(boundDeserializeElement).filter((n) => n !== null) as RichElement[],
    }
    return custom;
  }

  function reactifyCustom(custom: ICustom, customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,) {
    return reactifyElementBase(
      registry,
      custom,
      "div",
      CUSTOM_CLASS_PREFIX + custom.customType,
      null,
      customProps,
      custom.children,
    );
  }

  registry.REACTIFY.custom = reactifyCustom;
  registry.SERIALIZE.custom = serializeCustom;
  registry.DESERIALIZE.byClassNamePrefix.custom = deserializeCustom;
}

/**
 * The custom type represents a custom- element
 */
export interface ICustom extends IElementBase {
  /**
   * The type as custom
   */
  type: "custom";
  /**
   * Specifies which custom type it is
   */
  customType: string;
  /**
   * The children
   */
  children: RichElement[];
}