import React from "react";
import { DOMWindow } from "../../../../util";
import { ISerializationRegistryType } from ".";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "./base";
import { IText } from "./text";

export function registerVideo(registry: ISerializationRegistryType) {
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

  function deserializeVideo(node: HTMLDivElement): IVideo {
    const iframe = node.querySelector("iframe") as HTMLIFrameElement;
    if (!iframe) {
      return null;
    }
    const base = deserializeElementBase(node);

    return {
      ...base,
      type: "video",
      src: iframe.dataset.videoSrc,
      origin: iframe.dataset.videoOrigin as any,
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

  function reactifyVideo(video: IVideo, customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
    let iframeSrc: string;
    if (video.origin === "youtube") {
      iframeSrc = `https://youtube.com/embed/${video.src}?rel=0`;
    } else {
      iframeSrc = `https://player.vimeo.com/video/${video.src}?title=0&byline=0&portrait=0&badge=0`;
    }

    return reactifyElementBase(
      registry,
      video,
      "div",
      "video",
      (children: React.ReactNode) => {
        return (
          <div className="video-container">
            <iframe src={iframeSrc} allowFullScreen={true}/>
            {children}
          </div>
        );
      },
      customProps,
      null,
    );
  }

  registry.REACTIFY.video = reactifyVideo;
  registry.SERIALIZE.video = serializeVideo;
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
