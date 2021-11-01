/**
 * Contains the serialization, reactification and deserialization functions
 * for the custom element, which is basically a div with a custom prefixed
 * class name
 * 
 * @module
 */

import { RichElement, ISerializationRegistryType, deserializeElement, IReactifyArg, deserializeChildrenForNode } from "..";
import { CUSTOM_CLASS_PREFIX } from "../..";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "../base";
import { STANDARD_PARAGRAPH } from "./paragraph";

/**
 * The function that registers and adds the custom in the given
 * reigstry
 * @param registry the registry to modify
 */
export function registerCustom(registry: ISerializationRegistryType) {

  /**
   * The function that serializes the custom into HTML
   * @param custom the custom element in question
   * @returns an HTML Element
   */
  function serializeCustom(custom: ICustom) {
    // calls the serialize element base function
    return serializeElementBase(
      // the registry in question
      registry,
      // the custom element
      custom,
      // the div represents that the custom is a div
      "div",
      // the prefixed custom type
      CUSTOM_CLASS_PREFIX + custom.customType,
      // no special attributes
      null,
      // and the children we are meant to render
      custom.children,
    );
  }
  
  /**
   * Converts a HTML element that is already considered a custom element
   * into the ICustom form
   * @param node the node in question
   * @returns a custom element structure
   */
  function deserializeCustom(node: HTMLDivElement): ICustom {
    // first we take the base
    const base = deserializeElementBase(node);

    // now we get to get the custom type
    let customType: string = null;
    node.classList.forEach((c) => {
      if (c.startsWith(CUSTOM_CLASS_PREFIX)) {
        customType = c.substr(CUSTOM_CLASS_PREFIX.length);
      }
    });

    // now we can build the custom itself
    const custom: ICustom = {
      ...base,
      type: "custom",
      containment: "superblock",
      customType,
      children: deserializeChildrenForNode(node, "superblock") as RichElement[],
    }

    if (!custom.children.length) {
      custom.children = [
        STANDARD_PARAGRAPH(),
      ];
    };

    // and return it
    return custom;
  }

  /**
   * Reactifies the custom that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyCustom(arg: IReactifyArg<ICustom>) {
    // we retrun from the base
    return reactifyElementBase(
      // the registry
      registry,
      // the div element
      "div",
      // we pass the prefixed custom type
      CUSTOM_CLASS_PREFIX + arg.element.customType,
      // the children to be used in reactification
      arg.element.children,
      // nothing to use to wrap
      null,
      // the reactification argument
      arg,
    );
  }

  // add to the registry
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
   * refers to be able to contain blocks or other super blocks, etc...
   */
  containment: "superblock",
  /**
   * Specifies which custom type it is
   */
  customType: string;
  /**
   * The children
   */
  children: RichElement[];
}