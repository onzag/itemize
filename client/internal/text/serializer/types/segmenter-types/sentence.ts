import { IReactifyArg, ISerializationRegistryType } from "../..";
import { IElementBase, reactifyElementBase } from "../../base";
import { IFile } from "../file";
import { IInline } from "../inline";
import { ILink } from "../link";
import { IText } from "../text";
import { IWord } from "./word";

export interface ISentence extends IElementBase {
  /**
   * the type unmanaged
   */
  type: "sentence";

  /**
   * It can have as many children as it requires
   * but not text directly
   */
  children: Array<IText | ILink | IFile | IInline | IWord>;
}

/**
 * The function that registers and adds the inline in the given
 * reigstry
 * @param registry the registry to modify
 */
export function registerSentence(registry: ISerializationRegistryType) {
  function reactifySentence(arg: IReactifyArg<ISentence>) {
    arg.accumulatedSentence.value++;

    return reactifyElementBase(
      // the registry
      registry,
      // the tag to use
      "span",
      // the base class
      "sentence",
      // the children to use
      arg.element.children,
      // the function to wrap the children
      null,
      // pass the given arg once again
      arg,
    );
  }

  registry.UNSERIALIZABLES.sentence = true;
  registry.REACTIFY.sentence = reactifySentence;
}