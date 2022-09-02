/**
 * Contains the serialization, reactification and deserialization functions
 * for the VoidSuperBlock element
 * 
 * @module
 */

import { IReactifyArg, ISerializationRegistryType } from "..";
import { deserializeElementBase, IElementBase, reactifyElementBase, serializeElementBase } from "../base";
import { IText, STANDARD_TEXT_NODE } from "./text";

/**
 * The function that registers and adds the VoidSuperBlock element in the given
 * registry
 * @param registry the registry to modify
 */
export function registerVoidSuperBlock(registry: ISerializationRegistryType) {

  /**
   * converts a given VoidSuperBlock rich element into its
   * HTML form
   * @param p the VoidSuperBlock rich element
   * @returns an HTML element
   */
  function serializeVoidSuperBlock(p: IVoidSuperBlock) {
    // simple
    return serializeElementBase(registry, p, "div", "void-superblock", null, p.children);
  }

  /**
   * Deserializes an HTML node into the given VoidSuperBlock
   * rich element
   * @param node the node in question
   * @returns a VoidSuperBlock element structure
   */
  function deserializeVoidSuperBlock(node: HTMLElement): IVoidSuperBlock {
    // first let's get trhe base
    const base = deserializeElementBase(node);

    // and build the VoidSuperBlock itself
    const voidSuperBlock: IVoidSuperBlock = {
      ...base,
      type: "void-superblock",
      children: [
        STANDARD_TEXT_NODE(),
      ],
    }

    // return it
    return voidSuperBlock;
  }

  /**
   * Reactifies a VoidSuperBlock that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyVoidSuperBlock(arg: IReactifyArg<IVoidSuperBlock>) {
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
  registry.REACTIFY["void-superblock"] = reactifyVoidSuperBlock;
  registry.SERIALIZE["void-superblock"] = serializeVoidSuperBlock;
  registry.SUPERBLOCKS["void-superblock"] = true;
  registry.VOIDS["void-superblock"] = true;
  registry.DESERIALIZE.byClassName["void-superblock"] = deserializeVoidSuperBlock;
}

/**
 * Represents the VoidSuperBlock, p type for the
 * rich text specification
 * but it might also be a div or a span
 */
export interface IVoidSuperBlock extends IElementBase {
  type: "void-superblock",

  /**
   * The VoidSuperBlock children can be either text or link or file for the inlines
   */
  children: IText[],
}