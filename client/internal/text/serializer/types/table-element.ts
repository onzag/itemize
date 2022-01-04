/**
 * Contains the serialization, reactification and deserialization functions
 * for the container element, which is basically a div with a container
 * class name
 * 
 * @module
 */

import { IReactifyArg, ISerializationRegistryType, RichElement, deserializeChildrenForNode } from "..";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "../base";
import { STANDARD_PARAGRAPH } from "./paragraph";
import { IText } from "./text";

/**
 * The function that registers and adds the container in the given
 * reigstry
 * @param registry the registry to modify
 */
export function registerTableElement(registry: ISerializationRegistryType) {

  /**
   * The function that serializes the container into HTML
   * @param container the container in question
   * @returns an HTML Element
   */
  function serializeTableElement(element: ITableElement) {
    // calls the serialize element base function
    return serializeElementBase(
      // the registry
      registry,
      // the container in question
      element,
      // the element should be a div element type
      element.tableElementType,
      // the class will be container class or the prefixed class if a given container type
      // exists
      null,
      // no special attributes
      null,
      // the children inside the container, these are rich elements
      element.children,
    );
  }

  /**
   * Converts a HTML element that is already considered a container
   * into the IContainer form
   * @param node the node in question
   * @returns a container element structure
   */
  function deserializeTableElement(node: HTMLElement): ITableElement {
    // first we take the base
    const base = deserializeElementBase(node);

    // now we can build the container itself
    const element: ITableElement = {
      ...base,
      type: "table-element",
      containment: "superblock",
      tableElementType: node.tagName.toLowerCase() as any,
      children: deserializeChildrenForNode(node, "superblock"),
    }

    if (!element.children.length) {
      if (element.tableElementType === "table") {
        element.children = [
          {
            type: "table-element",
            containment: "superblock",
            tableElementType: "tbody",
            children: [
              {
                type: "table-element",
                containment: "superblock",
                tableElementType: "tr",
                children: [
                  {
                    type: "table-element",
                    containment: "superblock",
                    tableElementType: "td",
                    children: [
                      STANDARD_PARAGRAPH(),
                    ]
                  }
                ]
              }
            ]
          }
        ];
      } else if (element.tableElementType === "tbody" || element.tableElementType === "thead") {
        element.children = [
          {
            type: "table-element",
            containment: "superblock",
            tableElementType: "tr",
            children: [
              {
                type: "table-element",
                containment: "superblock",
                tableElementType: "td",
                children: [
                  STANDARD_PARAGRAPH(),
                ]
              }
            ]
          }
        ];
      } else if (element.tableElementType === "tr") {
        element.children = [
          {
            type: "table-element",
            containment: "superblock",
            tableElementType: "td",
            children: [
              STANDARD_PARAGRAPH(),
            ]
          }
        ];
      } else {
        element.children = [
          STANDARD_PARAGRAPH(),
        ];
      }
    }

    // return it
    return element;
  }

  /**
   * Reactifies the container that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyTableElement(arg: IReactifyArg<ITableElement>) {
    // we retrun from the base
    return reactifyElementBase(
      // the registry
      registry,
      // the div element
      arg.element.tableElementType,
      // no class
      null,
      // the children of the container
      arg.element.children,
      // no wrap children function
      null,
      // and the arg of reactification
      arg,
    );
  }

  // register in the registry
  registry.REACTIFY["table-element"] = reactifyTableElement;
  registry.SERIALIZE["table-element"] = serializeTableElement;
  registry.DESERIALIZE.byTag.TABLE = deserializeTableElement;
  registry.DESERIALIZE.byTag.TBODY = deserializeTableElement;
  registry.DESERIALIZE.byTag.THEAD = deserializeTableElement;
  registry.DESERIALIZE.byTag.TR = deserializeTableElement;
  registry.DESERIALIZE.byTag.TD = deserializeTableElement;
}

/**
 * The container represents a div contaner type
 * of the class container for the text specs
 */
export interface ITableElement extends IElementBase {
  type: "table-element";
  /**
   * refers to be able to contain blocks or other super blocks, etc...
   */
  containment: "superblock";
  /**
   * A container type, might be null
   */
  tableElementType: "table" | "thead" | "tbody" | "tr" | "td";

  /**
   * It can have as many children as it requires
   * but not text directly
   */
  children: Array<RichElement | IText>;
}
