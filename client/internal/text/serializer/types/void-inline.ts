/**
 * Contains the serialization, reactification and deserialization functions
 * for the VoidInline element
 * 
 * @module
 */

 import { IReactifyArg, ISerializationRegistryType } from "..";
 import { deserializeElementBase, IElementBase, reactifyElementBase, serializeElementBase } from "../base";
 import { IText, STANDARD_TEXT_NODE } from "./text";
 
 /**
  * The function that registers and adds the VoidInline element in the given
  * registry
  * @param registry the registry to modify
  */
 export function registerVoidInline(registry: ISerializationRegistryType) {
 
   /**
    * converts a given VoidInline rich element into its
    * HTML form
    * @param p the VoidInline rich element
    * @returns an HTML element
    */
   function serializeVoidInline(p: IVoidInline) {
     // simple
     return serializeElementBase(registry, p, "span", "void-inline", null, p.children);
   }
 
   /**
    * Deserializes an HTML node into the given VoidInline
    * rich element
    * @param node the node in question
    * @returns a VoidInline element structure
    */
   function deserializeVoidInline(node: HTMLElement): IVoidInline {
     // first let's get trhe base
     const base = deserializeElementBase(node);
 
     // and build the VoidInline itself
     const VoidInline: IVoidInline = {
       ...base,
       type: "void-inline",
       children: [
         STANDARD_TEXT_NODE(),
       ],
     }
 
     // return it
     return VoidInline;
   }
 
   /**
    * Reactifies a VoidInline that is already
    * into a rich element form
    * @param arg the reactification arg
    */
   function reactifyVoidInline(arg: IReactifyArg<IVoidInline>) {
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
   registry.REACTIFY["void-inline"] = reactifyVoidInline;
   registry.SERIALIZE["void-inline"] = serializeVoidInline;
   registry.INLINES["void-inline"] = true;
   registry.VOIDS["void-inline"] = true;
   registry.DESERIALIZE.byClassName["void-inline"] = deserializeVoidInline;
 }
 
 /**
  * Represents the VoidInline, p type for the
  * rich text specification
  * but it might also be a div or a span
  */
 export interface IVoidInline extends IElementBase {
   type: "void-inline",
 
   /**
    * The VoidInline children can be either text or link or file for the inlines
    */
   children: IText[],
 }