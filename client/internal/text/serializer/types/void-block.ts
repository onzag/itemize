/**
 * Contains the serialization, reactification and deserialization functions
 * for the VoidBlock element
 * 
 * @module
 */

import { IReactifyArg, ISerializationRegistryType } from "..";
import { deserializeElementBase, IElementBase, reactifyElementBase, serializeElementBase } from "../base";
import { IText, STANDARD_TEXT_NODE } from "./text";

/**
 * The function that registers and adds the VoidBlock element in the given
 * registry
 * @param registry the registry to modify
 */
export function registerVoidBlock(registry: ISerializationRegistryType) {

  /**
   * converts a given VoidBlock rich element into its
   * HTML form
   * @param p the VoidBlock rich element
   * @returns an HTML element
   */
  function serializeVoidBlock(p: IVoidBlock) {
    // simple
    return serializeElementBase(registry, p, "p", "void-block", null, p.children);
  }

  /**
   * Deserializes an HTML node into the given VoidBlock
   * rich element
   * @param node the node in question
   * @returns a VoidBlock element structure
   */
  function deserializeVoidBlock(node: HTMLElement): IVoidBlock {
    // first let's get trhe base
    const base = deserializeElementBase(node);

    // and build the VoidBlock itself
    const VoidBlock: IVoidBlock = {
      ...base,
      type: "void-block",
      children: [
        STANDARD_TEXT_NODE(),
      ],
    }

    // return it
    return VoidBlock;
  }

  /**
   * Reactifies a VoidBlock that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyVoidBlock(arg: IReactifyArg<IVoidBlock>) {
    return reactifyElementBase(
      // the registry
      registry,
      // the tag to use
      "p",
      // no base class name
      null,
      // the children to use
      arg.element.children,
      // no wrap children function
      null,
      // the arg itself
      arg,
    );
  }

  // register in the registry
  registry.REACTIFY["void-block"] = reactifyVoidBlock;
  registry.SERIALIZE["void-block"] = serializeVoidBlock;
  registry.BLOCKS["void-block"] = true;
  registry.VOIDS["void-block"] = true;
  registry.DESERIALIZE.byClassName["void-block"] = deserializeVoidBlock;
}

/**
 * Represents the VoidBlock, p type for the
 * rich text specification
 * but it might also be a div or a span
 */
export interface IVoidBlock extends IElementBase {
  type: "void-block",

  /**
   * The VoidBlock children can be either text or link or file for the inlines
   */
  children: IText[],
}