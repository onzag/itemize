/**
 * Contains the serialization, reactification and deserialization functions
 * for the link element
 * 
 * @module
 */

import { deserializeChildrenForNode, IReactifyArg, ISerializationRegistryType } from "..";
import { IAttrs, serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "../base";
import { IText, STANDARD_TEXT_NODE } from "./text";

/**
 * The function that registers and adds the link element in the given
 * registry
 * @param registry the registry to modify
 */
export function registerLink(registry: ISerializationRegistryType) {

  /**
   * The function that serializes the link element into HTML
   * @param link the link element
   * @returns an HTML node
   */
  function serializeLink(link: ILink) {
    // first we build the attributes
    // we need to set into the html element
    const attrs: IAttrs = {};
    if (link.thref) {
      attrs["data-href"] = link.thref;
    } else if (link.href) {
      attrs.href = link.href;
    }
  
    // and call the serialization function
    return serializeElementBase(
      // the registry
      registry,
      // the link in question
      link,
      // the tag we will use
      "a",
      // no base class name
      null,
      // the attributes we will use
      attrs,
      // and the children the link should have
      link.children,
    );
  }
  
  /**
   * Converts a HTML element that is already considered a link
   * element into the given rich element form
   * @param node the node in question
   * @returns a link element structure
   */
  function deserializeLink(node: HTMLAnchorElement): ILink {

    // first we convert the node to get its base
    // form of all the standard properties
    const base = deserializeElementBase(node);
    let href: string = null;
    let thref: string = null;
  
    // let's get the href and template href
    if (node.dataset.href) {
      thref = node.dataset.href;
    } else {
      href = node.getAttribute("href") || null;
    }

    // and now time to deserialize the children
    // because they should all be text nodes
    const children = deserializeChildrenForNode(node) as IText[];
  
    // and let's build the link
    const link: ILink = {
      ...base,
      type: "link",
      href,
      thref,
      children: children.length ? children : [STANDARD_TEXT_NODE()],
    }

    // and return such
    return link;
  }

  /**
   * Reactifies the link that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyLink(arg: IReactifyArg<ILink>) {
    const newCustomProps = {
      ...arg.customProps,
    };
    // if we are active, we add the href
    if (arg.element.href && arg.active) {
      (newCustomProps as any).href = arg.element.href;
    }

    // if we have a template href and we are not active
    if (arg.element.thref && !arg.active) {
      newCustomProps.className = (newCustomProps.className || "") + " template";
      newCustomProps.title = arg.element.thref;
    }

    if (arg.asTemplate && arg.element.thref && arg.active) {
      const href = arg.templateArgs[arg.element.thref] || arg.templateRootArgs[arg.element.thref];
      (newCustomProps as any).href = href;
    }

    // now we can do a call to the reactify
    return reactifyElementBase(
      registry,
      "a",
      null,
      arg.element.children,
      null,
      {
        ...arg,
        customProps: newCustomProps,
      },
    );
  }

  // we add it to the registry
  registry.REACTIFY.link = reactifyLink;
  registry.SERIALIZE.link = serializeLink;
  registry.ALLOWS_CHILDREN.link = [];
  registry.INLINES.link = true;

  registry.DESERIALIZE.byTag.A = deserializeLink;
}

/**
 * The link represents an a type
 */
export interface ILink extends IElementBase {
  type: "link";
  /**
   * Represents the standard href attribute
   */
  href: string;
  /**
   * The children for the link is a text that specifies the link
   */
  children: IText[];
  /**
   * Represents the data-href templating attribute
   */
  thref: string;
}