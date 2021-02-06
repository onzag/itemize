/**
 * Contains the serialization, reactification and deserialization functions
 * for the image element
 * 
 * @packageDocumentation
 */

import React from "react";
import { DOMWindow } from "../../../../../util";
import { IReactifyArg, ISerializationRegistryType } from "..";
import { serializeElementBase, deserializeElementBase, IElementBase, IAttrs, reactifyElementBase } from "../base";
import { IText, STANDARD_TEXT_NODE } from "./text";

/**
 * The function that registers and adds the image in the given
 * registry
 * @param registry the registry to modify
 */
export function registerImage(registry: ISerializationRegistryType) {

  /**
   * The function that serializes the image into HTML
   * @param img the image element
   * @returns an HTML node
   */
  function serializeImage(img: IImage) {
    // first we need to build the special
    // attributes it should pass to
    const attrs: IAttrs = {};

    // these pass in the data src information
    if (img.width) {
      attrs["data-src-width"] = img.width.toString();
    }
    if (img.height) {
      attrs["data-src-height"] = img.height.toString();
    }
    if (img.srcId) {
      attrs["data-src-id"] = img.srcId;
    }

    // these is for the alt
    if (img.alt) {
      attrs.alt = img.alt;
    }

    // source, sourceset and sizes
    if (img.src) {
      attrs.src = img.src;
    }
    if (img.srcSet) {
      attrs.srcset = img.srcSet;
    }
    if (img.sizes) {
      attrs.sizes = img.sizes;
    }

    // for a standalone image, we pass it right
    // as an image element
    if (img.standalone) {
      // so we render directly into an image with
      // the given attributes
      const standaloneImage = serializeElementBase(
        registry,
        img,
        "img",
        null,
        attrs,
        null,
      );
      return standaloneImage;
    } else {
      // otherwise we create the a component that will
      // act as a container, note how we don't pass
      // the attributes to this one
      const imageComponent = serializeElementBase(
        registry,
        img,
        "a",
        "image",
        null,
        null,
      ) as HTMLAnchorElement;

      // now we create the container
      const imageContainer = DOMWindow.document.createElement("div");
      imageContainer.className = "image-container";
      imageComponent.appendChild(imageContainer);

      // the pad
      const imagePad = DOMWindow.document.createElement("div");
      imagePad.className = "image-pad";

      // width, height, ratio and percentage and so on
      // in order to calculate the padding for the image pad
      const width = img.width;
      const height = img.height;
      const ratio = height / width;
      const percentage = ratio * 100;
      const padStyle = "padding-bottom:" + percentage + "%";

      // now the styles for the padd
      imagePad.setAttribute("style", padStyle);
      imageContainer.appendChild(imagePad);

      // now we can build the standalone image, we pass
      // nothing as the base in order to cheat and consider
      // that there are no special attributes
      const standaloneImage = serializeElementBase(
        registry,
        {},
        "img",
        null,
        attrs,
        null,
      );

      // and we padd it
      imagePad.appendChild(standaloneImage);

      // add the src to the image so that SEO works
      // well with it
      if ((standaloneImage as HTMLImageElement).src) {
        imageComponent.href = (standaloneImage as HTMLImageElement).src;
      }

      // return it
      return imageComponent;
    }
  }

  /**
   * Converts a HTML element that is already considered an image
   * element into the given rich element form
   * @param node the node in question
   * @returns an image element structure
   */
  function deserializeImage(node: HTMLDivElement | HTMLImageElement): IImage {

    // first we need to check everything is fine
    const img = node.tagName === "IMG" ? node : node.querySelector("img") as HTMLImageElement;
    if (!img) {
      return null;
    }

    // now we get the base of the given node
    const base = deserializeElementBase(node);

    // and extract the info according to the specs
    // the spec says srcset sizes and src will be stripped but can be available
    return {
      ...base,
      type: "image",
      containment: "void-block",
      alt: img.getAttribute("alt") || null,
      src: img.getAttribute("src"),
      srcId: img.dataset.srcId,
      srcSet: img.getAttribute("srcset") || null,
      sizes: img.getAttribute("sizes") || null,
      width: parseInt(img.dataset.srcWidth) || null,
      height: parseInt(img.dataset.srcHeight) || null,
      standalone: node.tagName === "IMG",
      children: [STANDARD_TEXT_NODE()]
    };
  }

  /**
   * Reactifies the image that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyImage(arg: IReactifyArg<IImage>) {
    // prepare the custom props
    const newCustomProps = {
      ...arg.customProps,
    };

    // if we are talking about
    // a standalone image
    if (arg.element.standalone) {
      // now we need to check for the precense
      // of children, because img cannot really
      // have children as it is, this can happen when
      // an editor such as slate wants to add children
      // even to an standalone image in order to make
      // it selectable
      if (newCustomProps.children) {
        // for that we delete such children
        // from the new property
        delete newCustomProps.children;

        // and instead wrap everything into a div
        // that will take these custom properties
        // and put the children at the bottom
        return (
          <div {...(newCustomProps as any)}>
            {
              reactifyElementBase(
                registry,
                "img",
                null,
                null,
                null,
                {
                  ...arg,
                  customProps: ({
                    alt: arg.element.alt,
                    sizes: arg.element.sizes,
                    src: arg.element.src,
                    srcSet: arg.element.srcSet,
                  } as any)
                },
              )
            }
            {arg.customProps.children}
          </div>
        );
      }

      // so being standalone without children
      // we can decide to add these properties
      // into the property list for custom
      (newCustomProps as any).alt = arg.element.alt;
      (newCustomProps as any).sizes = arg.element.sizes;
      (newCustomProps as any).src = arg.element.src;
      (newCustomProps as any).srcSet = arg.element.srcSet;

      return reactifyElementBase(
        registry,
        "img",
        null,
        null,
        null,
        {
          ...arg,
          customProps: newCustomProps,
        }
      );
    }

    // now here back to the non-standalone
    // if we are not active
    if (arg.active) {
      // we add the href to the given image
      (newCustomProps as any).href = arg.element.src;
    }

    // now we can setup the padding in the
    // image-pad
    const width = arg.element.width;
    const height = arg.element.height;
    const ratio = height / width;
    const percentage = ratio * 100;
    const padPercentage = percentage + "%";

    // now here we can use the wrap children
    // in order to wrap the passed children
    // into their own given area where they
    // should be
    return reactifyElementBase(
      registry,
      "a",
      "image",
      null,
      (children: React.ReactNode) => {
        return (
          <div className="image-container">
            <div className="image-pad" style={{ paddingBottom: padPercentage }}>
              <img alt={arg.element.alt} sizes={arg.element.sizes} src={arg.element.src} srcSet={arg.element.srcSet} />
              {children}
            </div>
          </div>
        );
      },
      {
        ...arg,
        customProps: newCustomProps
      }
    );
  }

  registry.REACTIFY.image = reactifyImage;
  registry.SERIALIZE.image = serializeImage;
  registry.DESERIALIZE.byClassName.image = deserializeImage;
  registry.DESERIALIZE.byTag.IMG = deserializeImage;
}

/**
 * Represents the basic image element
 */
export interface IImage extends IElementBase {
  /**
   * Image type
   */
  type: "image";
  /**
   * refers that it can't contain anything
   */
  containment: "void-block",
  /**
   * Width of the image in pixels
   * data-src-width
   */
  width: number;
  /**
   * Height of the image in pixels
   * data-src-height
   */
  height: number;
  /**
   * url of the image
   * src this is a property that is removed
   */
  src: string;
  /**
   * srcset of the image
   * srcset is a property that is removed
   */
  srcSet: string;
  /**
   * sizes of the image
   * sizes is a property that is removed
   */
  sizes: string;
  /**
   * src id of the image
   * data-src-id
   */
  srcId: string;
  /**
   * Alternative text of the image
   */
  alt: string;
  /**
   * whether the image should be a standalone image or be a full
   * text-specs compliant image
   */
  standalone: boolean;
  /**
   * The children of the image is a text node
   * as defined by the specifications of slate
   * even when nothing is writable there
   */
  children: [
    IText,
  ];
}
