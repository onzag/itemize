import React from "react";
import { ISerializationRegistryType, RichElement } from ".";
import { serializeElementBase, deserializeElementBase, IElementBase, deserializeElement, reactifyElementBase } from "./base";

export function registerContainer(registry: ISerializationRegistryType) {
  const boundDeserializeElement = deserializeElement.bind(null, registry);

  function serializeContainer(container: IContainer) {
    return serializeElementBase(
      registry,
      container,
      "div",
      container.containerType ? "container-" + container.containerType : "container",
      null,
      container.children,
    );
  }
  
  function deserializeContainer(node: HTMLDivElement): IContainer {
    const base = deserializeElementBase(node);
    let containerType: string = null;
    node.classList.forEach((c) => {
      if (c.startsWith("container-")) {
        containerType = c.substr(10);
      }
    });
    const container: IContainer = {
      ...base,
      type: "container",
      containerType,
      children: Array.from(node.childNodes).map(boundDeserializeElement).filter((n) => n !== null) as RichElement[],
    }
    return container;
  }

  function reactifyContainer(container: IContainer, customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,) {
    return reactifyElementBase(
      registry,
      container,
      "div",
      container.containerType ? "container-" + container.containerType : "container",
      null,
      customProps,
      container.children,
    );
  }

  registry.REACTIFY.container = reactifyContainer;
  registry.SERIALIZE.container = serializeContainer;
  registry.DESERIALIZE.byClassName.container = deserializeContainer;
  registry.DESERIALIZE.byClassNamePrefix.container = deserializeContainer;
}

/**
 * The container represents a div contaner type
 * of the class container for the text specs
 */
export interface IContainer extends IElementBase {
  type: "container";
  /**
   * A container type, might be null
   */
  containerType: string;

  /**
   * It can have as many children as it requires
   * but not text directly
   */
  children: RichElement[];
}