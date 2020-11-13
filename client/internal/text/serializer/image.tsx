import React from "react";
import { DOMWindow } from "../../../../util";
import { ISerializationRegistryType } from ".";
import { serializeElementBase, deserializeElementBase, IElementBase, IAttrs, reactifyElementBase } from "./base";
import { IText } from "./text";

export function registerImage(registry: ISerializationRegistryType) {
  function serializeImage(img: IImage) {
    const attrs: IAttrs = {};
    if (img.width) {
      attrs["data-src-width"] = img.width.toString();
    }
    if (img.height) {
      attrs["data-src-height"] = img.height.toString();
    }
    if (img.srcId) {
      attrs["data-src-id"] = img.srcId;
    }
    if (img.alt) {
      attrs.alt = img.alt;
    }
    if (img.src) {
      attrs.src = img.src;
    }
    if (img.srcSet) {
      attrs.srcset = img.srcSet;
    }
    if (img.sizes) {
      attrs.sizes = img.sizes;
    }
  
    if (img.standalone) {
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
      const imageComponent = serializeElementBase(
        registry,
        img,
        "a",
        "image",
        null,
        null,
      ) as HTMLAnchorElement;
  
      const imageContainer = DOMWindow.document.createElement("div");
      imageContainer.className = "image-container";
      imageComponent.appendChild(imageContainer);
  
      const imagePad = DOMWindow.document.createElement("div");
      imagePad.className = "image-pad";
  
      const width = img.width;
      const height = img.height;
      const ratio = height / width;
      const percentage = ratio * 100;
      const padStyle = "padding-bottom:" + percentage + "%";
  
      imagePad.setAttribute("style", padStyle);
      imageContainer.appendChild(imagePad);
  
      const standaloneImage = serializeElementBase(
        registry,
        {},
        "img",
        null,
        attrs,
        null,
      );
      imagePad.appendChild(standaloneImage);
  
      // add the src to the standalone image
      if ((standaloneImage as HTMLImageElement).src) {
        imageComponent.href = (standaloneImage as HTMLImageElement).src;
      }
  
      return imageComponent;
    }
  }
  
  function deserializeImage(node: HTMLDivElement | HTMLImageElement): IImage {
    // first we need to check everything is fine
    const img = node.tagName === "IMG" ? node : node.querySelector("img") as HTMLImageElement;
    if (!img) {
      return null;
    }
  
    const base = deserializeElementBase(node);
  
    // and extract the info according to the specs
    // the spec says srcset sizes and src will be stripped but can be available
    return {
      ...base,
      type: "image",
      alt: img.getAttribute("alt") || null,
      src: img.getAttribute("src"),
      srcId: img.dataset.srcId,
      srcSet: img.getAttribute("srcset") || null,
      sizes: img.getAttribute("sizes") || null,
      width: parseInt(img.dataset.srcWidth) || null,
      height: parseInt(img.dataset.srcHeight) || null,
      standalone: node.tagName === "IMG",
      children: [
        {
          text: "",
          bold: false,
          italic: false,
          underline: false,
          templateText: null,
        }
      ]
    };
  }

  function reactifyImage(image: IImage, customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
    const newCustomProps = {
      ...customProps,
    };
    if (image.standalone) {
      (newCustomProps as any).alt = image.alt;
      (newCustomProps as any).sizes = image.sizes;
      (newCustomProps as any).src = image.src;
      (newCustomProps as any).srcSet = image.srcSet;

      return reactifyElementBase(
        registry,
        image,
        "img",
        null,
        null,
        newCustomProps,
        null,
      );
    }

    (newCustomProps as any).href = image.src;

    const width = image.width;
    const height = image.height;
    const ratio = height / width;
    const percentage = ratio * 100;
    const padPercentage = percentage + "%";

    return reactifyElementBase(
      registry,
      image,
      "a",
      "image",
      (children: React.ReactNode) => {
        return (
          <div className="image-container">
            <div className="image-pad" style={{paddingBottom: padPercentage}}>
              <img alt={image.alt} sizes={image.sizes} src={image.src} srcSet={image.srcSet}/>
              {children}
            </div>
          </div>
        );
      },
      newCustomProps,
      null,
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
