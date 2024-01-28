import { IReactifyArg, ISerializationRegistryType } from "../..";
import { IElementBase, reactifyElementBase } from "../../base";
import { IText } from "../text";

export interface IWord extends IElementBase {
  /**
   * the type unmanaged
   */
  type: "word";

  /**
   * It can have as many children as it requires
   * but not text directly
   */
  children: Array<IText>;
}

/**
 * The function that registers and adds the inline in the given
 * reigstry
 * @param registry the registry to modify
 */
export function registerWord(registry: ISerializationRegistryType) {
  function reactifyWord(arg: IReactifyArg<IWord>) {
    arg.accumulatedWord.value++;

    return reactifyElementBase(
      // the registry
      registry,
      // the tag to use
      "span",
      // the base class
      "word",
      // the children to use
      arg.element.children,
      // the function to wrap the children
      null,
      // pass the given arg once again
      arg,
    );
  }

  registry.UNSERIALIZABLES.word = true;
  registry.REACTIFY.word = reactifyWord;
}