/**
 * Contains the serialization, reactification and deserialization functions
 * for the list element
 * 
 * The list represents ol and ul element itself
 * 
 * @module
 */

import { deserializeChildrenForNode, IReactifyArg, ISerializationRegistryType, RichElement } from "..";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "../base";
import { IListItem } from "./list-item";
import { STANDARD_PARAGRAPH } from "./paragraph";
import { IText } from "./text";

/**
 * The function that registers and adds the list element in the given
 * registry
 * @param registry the registry to modify
 */
export function registerList(registry: ISerializationRegistryType) {

  /**
   * Serializes the element to its HTML form
   * @param list the list in question
   * @returns an html element
   */
  function serializeList(list: IList) {
    // so we call the base serialization
    return serializeElementBase(
      // the registry
      registry,
      // the list in question component
      list,
      // now the tag to use depends
      list.listType === "numbered" ? "ol" : "ul",
      // no base class
      null,
      // no extra attributes
      null,
      // the children to use
      list.children,
    );
  }

  /**
   * Deserializes an HTML node into the given list
   * rich element
   * @param node the node in question
   * @returns a list element structure
   */
  function deserializeList(node: HTMLDivElement): IList {
    // first we get the base
    const base = deserializeElementBase(node);

    // and construct the list
    const list: IList = {
      ...base,
      type: "list",
      listType: node.tagName === "OL" ? "numbered" : "bulleted",
      children: deserializeChildrenForNode(node) as IListItem[],
    }

    // return such
    return list;
  }

  /**
   * Reactifies the list that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyList(arg: IReactifyArg<IList>) {
    return reactifyElementBase(
      // the registry
      registry,
      // the tag to use
      arg.element.listType === "numbered" ? "ol" : "ul",
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

  // register into the registry
  registry.REACTIFY.list = reactifyList;
  registry.SERIALIZE.list = serializeList;
  registry.ALLOWS_CHILDREN.list = [
    "list-item",
  ];
  registry.ON_EMPTY_FILL_WITH.list = () => {
    return (
      {
        type: "list-item",
        children: [
          STANDARD_PARAGRAPH(),
        ]
      }
    );
  }

  registry.ON_INVALID_TEXT_WRAP_WITH.list = (text: IText) => {
    return [
      STANDARD_PARAGRAPH(),
      {
        type: "list-item",
        children: []
      }
    ];
  }

  registry.ON_INVALID_CHILDREN_WRAP_WITH.list = (child: RichElement) => {
    if (child.type === "inline" || child.type === "file" || child.type === "link") {
      return [
        STANDARD_PARAGRAPH(),
        {
          type: "list-item",
          children: []
        }
      ];
    } else if (child.type === "title" || child.type === "paragraph") {
      return [
        {
          type: "list-item",
          children: []
        }
      ];
    }

    return null;
  }

  registry.SUPERBLOCKS.list = true;
  registry.DESERIALIZE.byTag.OL = deserializeList;
  registry.DESERIALIZE.byTag.UL = deserializeList;
  registry.MERGABLES.list = true;
  registry.CUSTOM_NORMALIZER.list = (
    list: IList,
    path,
    executionRoot,
    primaryExecution,
    secondaryExecution,
    specialRules,
  ) => {
    let index = -1;
    while (true) {
      index++;
      const child = list.children[index];
      if (!child) {
        break;
      }

      // so let's find in the list-item that is has as children, which place the second paragraph is
      // but not the first
      const secondParagraphPoint = child.children.findIndex((n, index) => n.type === "paragraph" && index !== 0);

      if (secondParagraphPoint !== -1) {
        // do a shallow copy with no children
        const childPath = [...path, index];
        const newChildPath = [...path, index + 1];
        primaryExecution.cloneElementAt(childPath, newChildPath);
        secondaryExecution && secondaryExecution.cloneElementAt(childPath, newChildPath);

        // now we need to move all the children from the second paragraph forwards into this new target
        // otherwise it will crash

        // we now count all the children inside the list item itself
        const allChildrenCount = child.children.length;

        // and now from ahead the second paragraph point, which may be either in first
        // or second we count to the end
        for (let i = 0; i < (allChildrenCount - secondParagraphPoint); i++) {
          primaryExecution.moveNodeAt([...childPath, secondParagraphPoint], [...newChildPath, i]);
          secondaryExecution && secondaryExecution.moveNodeAt([...childPath, secondParagraphPoint], [...newChildPath, i]);
        }
      }
    }
  }
}

/**
 * The container represents a div contaner type
 * of the class container for the text specs
 */
export interface IList extends IElementBase {
  type: "list";
  /**
   * A the list type
   */
  listType: "numbered" | "bulleted";

  /**
   * It needs to have list item as children
   */
  children: IListItem[];
}