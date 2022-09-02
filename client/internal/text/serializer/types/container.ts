/**
 * Contains the serialization, reactification and deserialization functions
 * for the container element, which is basically a div with a container
 * class name
 * 
 * @module
 */

import { IReactifyArg, ISerializationRegistryType, RichElement, deserializeChildrenForNode } from "..";
import { CONTAINER_CLASS, CONTAINER_CLASS_PREFIX } from "../..";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "../base";
import { ICustom } from "./custom";
import { IFile } from "./file";
import { IImage } from "./image";
import { IList } from "./list";
import { IParagraph, STANDARD_PARAGRAPH } from "./paragraph";
import { IQuote } from "./quote";
import { ITable } from "./table";
import { IText } from "./text";
import { ITitle } from "./title";
import { IVideo } from "./video";

/**
 * The function that registers and adds the container in the given
 * reigstry
 * @param registry the registry to modify
 */
export function registerContainer(registry: ISerializationRegistryType) {

  /**
   * The function that serializes the container into HTML
   * @param container the container in question
   * @returns an HTML Element
   */
  function serializeContainer(container: IContainer) {
    // calls the serialize element base function
    return serializeElementBase(
      // the registry
      registry,
      // the container in question
      container,
      // the element should be a div element type
      "div",
      // the class will be container class or the prefixed class if a given container type
      // exists
      container.containerType ? CONTAINER_CLASS_PREFIX + container.containerType : CONTAINER_CLASS,
      // no special attributes
      null,
      // the children inside the container, these are rich elements
      container.children,
    );
  }

  /**
   * Converts a HTML element that is already considered a container
   * into the IContainer form
   * @param node the node in question
   * @returns a container element structure
   */
  function deserializeContainer(node: HTMLDivElement): IContainer {
    // first we take the base
    const base = deserializeElementBase(node);

    // now we get to get the container type
    let containerType: string = null;
    node.classList.forEach((c) => {
      if (c.startsWith(CONTAINER_CLASS_PREFIX)) {
        containerType = c.substr(CONTAINER_CLASS_PREFIX.length);
      }
    });

    // now we can build the container itself
    const container: IContainer = {
      ...base,
      type: "container",
      containerType,
      children: deserializeChildrenForNode(node) as any[],
    }

    // return it
    return container;
  }

  /**
   * Reactifies the container that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyContainer(arg: IReactifyArg<IContainer>) {
    // we retrun from the base
    return reactifyElementBase(
      // the registry
      registry,
      // the div element
      "div",
      // we pass either the container type prefixed or the container class itself
      arg.element.containerType ? CONTAINER_CLASS_PREFIX + arg.element.containerType : CONTAINER_CLASS,
      // the children of the container
      arg.element.children,
      // no wrap children function
      null,
      // and the arg of reactification
      arg,
    );
  }

  // register in the registry
  registry.REACTIFY.container = reactifyContainer;
  registry.SERIALIZE.container = serializeContainer;
  registry.ALLOWS_CHILDREN.container = [
    "container",
    "custom",
    "file",
    "image",
    "list",
    "paragraph",
    "quote",
    "table",
    "title",
    "video",
  ];
  registry.ON_EMPTY_FILL_WITH.container = () => {
    return STANDARD_PARAGRAPH();
  }

  registry.ON_INVALID_TEXT_WRAP_WITH.container = (text: IText) => {
    return [STANDARD_PARAGRAPH()];
  }
  registry.ON_INVALID_CHILDREN_WRAP_WITH.container = (child: RichElement) => {
    if (child.type === "inline" || child.type === "file" || child.type === "link") {
      return [STANDARD_PARAGRAPH()];
    } else if (child.type === "thead" || child.type === "tbody") {
      return [
        {
          type: "table",
          children: [],
        }
      ]
    } else if (child.type === "tr") {
      return [
        {
          type: "tbody",
          children: [],
        },
        {
          type: "table",
          children: [],
        }
      ];
    } else if (child.type === "td") {
      return [
        {
          type: "tr",
          children: [],
        },
        {
          type: "tbody",
          children: [],
        },
        {
          type: "table",
          children: [],
        }
      ];
    } else if (child.type === "list-item") {
      return [
        {
          type: "list",
          listType: "bulleted",
          children: [],
        }
      ];
    }

    return null;
  }
  registry.SUPERBLOCKS.container = true;

  registry.DESERIALIZE.byClassName.container = deserializeContainer;
  registry.DESERIALIZE.byTag.DIV = deserializeContainer;
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
  children: Array<IContainer | ICustom | IFile | IParagraph | IList | IQuote | ITable | IVideo | ITitle | IImage>;
}
