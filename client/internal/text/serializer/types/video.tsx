/**
 * Contains the serialization, reactification and deserialization functions
 * for the video element
 * 
 * @module
 */


import React from "react";
import { DOMWindow } from "../../../../../util";
import { IReactifyArg, ISerializationRegistryType } from "..";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "../base";
import { IText, STANDARD_TEXT_NODE } from "./text";

/**
 * The function that registers and adds the video element in the given
 * registry
 * @param registry the registry to modify
 */
export function registerVideo(registry: ISerializationRegistryType) {

  /**
   * converts a given video rich element into its
   * HTML form
   * @param video the video rich element
   * @returns an HTML element
   */
  function serializeVideo(video: IVideo) {
    // make the main container with the right class
    const mainContainer = serializeElementBase(registry, video, "div", "video", null, null);
    mainContainer.className = "video";

    // add the parent
    const parentContainer = DOMWindow.document.createElement("div");
    parentContainer.className = "video-container";
    mainContainer.appendChild(parentContainer);

    // and set the iframe
    const iframe = DOMWindow.document.createElement("iframe");
    parentContainer.appendChild(iframe);

    // with the props as defined by the spec
    iframe.allowFullscreen = true;
    iframe.dataset.videoOrigin = video.origin;
    iframe.dataset.videoSrc = video.src;

    // and set the source according to the origin
    if (video.origin === "youtube") {
      iframe.src = `https://youtube.com/embed/${video.src}?rel=0`;
    } else {
      iframe.src = `https://player.vimeo.com/video/${video.src}?title=0&byline=0&portrait=0&badge=0`;
    }

    // and return the main container
    return mainContainer;
  }


  /**
   * Deserializes a given HTML element that is already
   * known as a video into the given video form
   * @param node the node in question
   * @returns a video rich element
   */
  function deserializeVideo(node: HTMLDivElement): IVideo {
    // we need to find an iframe
    const iframe = node.querySelector("iframe") as HTMLIFrameElement;
    // no iframe, it won't work
    if (!iframe) {
      return null;
    }

    // now we can get the base
    const base = deserializeElementBase(node);

    // and return based on the base
    return {
      ...base,
      type: "video",
      src: iframe.dataset.videoSrc,
      origin: iframe.dataset.videoOrigin as any,
      children: [
        STANDARD_TEXT_NODE(),
      ]
    };
  }

  /**
   * Reactifies a title that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyVideo(arg: IReactifyArg<IVideo>) {
    // let's build the source for the iframe
    let iframeSrc: string;
    if (arg.element.origin === "youtube") {
      iframeSrc = `https://youtube.com/embed/${arg.element.src}?rel=0`;
    } else {
      iframeSrc = `https://player.vimeo.com/video/${arg.element.src}?title=0&byline=0&portrait=0&badge=0`;
    }

    // now we might call the reactification
    return reactifyElementBase(
      // the registry
      registry,
      // we will be using a div to start with
      "div",
      // the video will be the base class
      "video",
      // no children itself
      null,
      // the wrapping function that sets up the iframe
      (children: React.ReactNode) => {
        return (
          <div className="video-container">
            <iframe src={iframeSrc} allowFullScreen={true} frameBorder="0"/>
            {children}
          </div>
        );
      },
      // the arg itself
      arg,
    );
  }

  // add to the registry
  registry.REACTIFY.video = reactifyVideo;
  registry.SERIALIZE.video = serializeVideo;
  registry.VOIDS.video = true;
  registry.BLOCKS.video = true;

  registry.DESERIALIZE.byClassName.video = deserializeVideo;
}

/**
 * Represents a video type
 */
export interface IVideo extends IElementBase {
  type: "video",
  /**
   * as for the text specs only vimeo and youtube are supported
   */
  origin: "youtube" | "vimeo",
  /**
   * The source of the video represents
   * the data-video-src
   */
  src: string;
  /**
   * The children are a text type even
   * when it's void
   */
  children: [
    IText,
  ];
}
