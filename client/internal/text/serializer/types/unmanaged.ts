import { IReactifyArg, ISerializationRegistryType, RichElement, deserializeChildrenForNode } from "..";
import { IElementBase, deserializeElementBase, reactifyElementBase, serializeElementBase } from "../base";

export interface IUnmanaged extends IElementBase {
  /**
   * the type unmanaged
   */
  type: "unmanaged";
  /**
   * The tag name it uses
   */
  tagName: string;

  /**
   * It can have as many children as it requires
   * but not text directly
   */
  children: Array<RichElement>;
}

/**
 * The function that registers and adds the inline in the given
 * reigstry
 * @param registry the registry to modify
 */
export function registerUnmanaged(registry: ISerializationRegistryType) {
  /**
   * Serializes the element to its HTML form
   * @param list the list in question
   * @returns an html element
   */
  function serializeUnmanaged(element: IUnmanaged) {
    // so we call the base serialization
    return serializeElementBase(
      // the registry
      registry,
      // the list in question component
      element,
      // now the tag to use depends
      element.tagName,
      // no base class
      null,
      // no extra attributes
      null,
      // the children to use
      element.children,
    );
  }

  /**
   * Deserializes an HTML node into the given list
   * rich element
   * @param node the node in question
   * @returns a list element structure
   */
  function deserializeUnmanaged(node: HTMLElement): IUnmanaged {
    // first we get the base
    const base = deserializeElementBase(node);

    // and construct the list
    const unmanaged: IUnmanaged = {
      ...base,
      type: "unmanaged",
      tagName: node.tagName.toLowerCase(),
      children: deserializeChildrenForNode(node) as any[],
    }

    // return such
    return unmanaged;
  }

  function reactifyUnmanaged(arg: IReactifyArg<IUnmanaged>) {
    return reactifyElementBase(
      // the registry
      registry,
      // the tag to use
      arg.element.tagName,
      // the base class
      null,
      // the children to use
      arg.element.children,
      // the function to wrap the children
      null,
      // pass the given arg once again
      arg,
    );
  }

  registry.DESERIALIZE.unmanaged = deserializeUnmanaged;
  registry.SERIALIZE.unmanaged = serializeUnmanaged;
  registry.REACTIFY.unmanaged = reactifyUnmanaged;

  registry.BLOCKS.unmanaged = true;
}