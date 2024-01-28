/**
 * Contains the property view text renderer, another large
 * thing used for text/plain or text/html text, but not unsubtyped
 * text
 * 
 * @module
 */

import {
  IPropertyViewTextRendererProps,
} from "../../../internal/components/PropertyView/PropertyViewText";
import React from "react";
import { DOMWindow } from "../../../../util";
import equals from "deep-equal";
import { renderTemplateDynamically } from "../../../internal/text";
import type { TemplateArgs } from "../../../internal/text/serializer/template-args";
import type { IImage } from "../../../internal/text/serializer/types/image";
import { deserialize, deserializePlain, IRootLevelDocument } from "../../../internal/text/serializer";
import { IText } from "../../../internal/text/serializer/types/text";
import type { RichElement, SegmenterType } from "../../../internal/text/serializer";

/**
 * The current intersection observer
 */
let io: IntersectionObserver;
/**
 * old school listenrs that use the scroll of the document, these are listeners that should
 * trigger every scroll, they return false onse they are done, true if they should reset
 */
let oldSchoolListeners: Array<() => void> = [];
/**
 * triggers all the old school listeners
 */
const triggerOldSchoolListeners = () => {
  oldSchoolListeners = oldSchoolListeners.filter((l) => l());
}
/**
 * this is the main old school listener that listens to the scroll event
 * it's unset at first just like the io
 */
let primaryOldSchoolListener: () => void;

/**
 * restores the element info making the item virtually loaded
 * @param target the target to restore
 */
function restoreElementInfo(target: HTMLElement) {
  if (!target.dataset.propertySet) {
    return;
  }
  // we read the property set from the attribute that we will transform
  const recoveredPropertySet: Array<[string, string]> =
    target.dataset.propertySet.split(";").map((s) => s.split(",") as [string, string]);
  // clean it
  target.dataset.propertySet = "";
  // and now pass every property
  recoveredPropertySet.forEach((propertySet) => {
    const propertyInDataSet = propertySet[0];
    const propertyInAttr = propertySet[1];

    // and set the attributes
    target.setAttribute(propertyInAttr, target.dataset[propertyInDataSet]);
    target.dataset[propertyInDataSet] = "";
  });
}

/**
 * checks whether a component is in view, this is for the old school mode
 * @param elem the element to check if it's in view
 */
function componentIsInView(elem: HTMLElement) {
  const bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Preopares an element for lazy loading
 * will restore its former structure, if it knows that it supports the loading=lazy property
 * @param element the element to prepare for lazy load
 * @param propertySet the properties to move, from dataset to the main
 */
function lazyLoaderPrepare(element: HTMLElement, propertySet: Array<[string, string]>) {
  // first we add the property set information that we will use
  element.dataset.propertySet = propertySet.map((s) => s.join(",")).join(";");
  // now we check if this is an image that has a loading property that uses lazyloading
  // this is supported in modern browsers but only works with images and the likes
  if ((element as any).loading) {
    // we restore the info
    restoreElementInfo(element);
    // and mark it as lazy
    (element as any).loading = "lazy";
    // otherwise using the intersection observer if we have it
  }
}

/**
 * marks an html element to be lazy loaded in 3 ways
 * @param element the element
 * @param propertySet a property set to copy from the dataset to the attribute itself
 */
function lazyloaderExecute(element: HTMLElement) {
  // has already been lazy loaded using loading=lazy
  if (!element.dataset.propertySet) {
    return;
  }
  if (window.IntersectionObserver) {
    // if we haven't created a main
    if (!io) {
      // we crate the observer
      io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            restoreElementInfo(target);
            io.unobserve(target);
          }
        });
      });
    }
    // and start observing the dom node
    io.observe(element);
  } else {
    // otherwise the old school mode
    oldSchoolListeners.push(() => {
      if (componentIsInView(element)) {
        restoreElementInfo(element);
        return false;
      }
      return true;
    });
    // and if we don't have the scroll observer we create one right away
    if (!primaryOldSchoolListener) {
      primaryOldSchoolListener = () => {
        triggerOldSchoolListeners();
      };
      document.addEventListener("scroll", primaryOldSchoolListener);
    }
  }
}

/**
 * The rich text viewer props
 */
interface IPropertyViewRichTextViewerProps {
  children?: string;
  className?: string;
  Node?: any;
  NodeProps?: any;
  onCustom?: (
    arg: RichElement | IText,
    props: any,
    info: {
      Tag: string,
      styleActive?: any,
      styleHover?: any,
      defaultReturn: () => void,
      parent: RichElement | IRootLevelDocument,
      tree: IRootLevelDocument,
    }
  ) => React.ReactNode;
  onCustomAttributesFor?: (arg: RichElement | IText) => any;
  onCustomWrap?: (arg: RichElement | IText, elementAsNode: React.ReactNode) => React.ReactNode;
  lang: string;
  isRichText: boolean;
}

/**
 * The rich text viewer state
 */
interface IPropertyViewRichTextViewerState {
  /**
   * The html is viewing, the reason it's different is because
   * we will add all these fancy properties to it that differ from the main
   * as well as event listeners
   */
  html: string;
}

/**
 * The rich text viewer used to view only types of text/html
 */
export class PropertyViewRichTextViewer extends React.Component<IPropertyViewRichTextViewerProps, IPropertyViewRichTextViewerState> {
  /**
   * The reference for our div
   */
  private divref: React.RefObject<HTMLDivElement>;
  /**
   * A cheap div we use for transformations
   */
  private cheapdiv: HTMLDivElement;

  /**
   * The builder for the rich text viewer in text/html
   * @param props the props
   */
  constructor(props: IPropertyViewRichTextViewerProps) {
    super(props);

    this.divref = React.createRef<HTMLDivElement>();
    this.cheapdiv = DOMWindow.document.createElement("div");

    this.state = {
      html: this.getHTML(props.children),
    }
  }

  /**
   * For a given html it will provide the brand new html
   * that is going to be rendered instead for the inner html
   * @param html 
   */
  public getHTML(html: string) {
    // with no html it's null
    if (!html) {
      return null;
    }

    // otherwse let's check we first assign it to the cheap div
    // note that this content has already been sanitized by the sanitizer
    // in the handler and now follows the text specs
    this.cheapdiv.innerHTML = html;

    // so first we get all the images
    this.cheapdiv.querySelectorAll("img").forEach((img: HTMLImageElement) => {
      // yes the src can be a blob, if the image hasn't been uploaded
      // yet, this is a valid protocol, and since it's local, lazyloading
      // preparations make no sense
      if (!img.src.startsWith("blob:")) {
        // we move all these attributes to the dataset
        img.dataset.srcset = img.getAttribute("srcset");
        img.removeAttribute("srcset");
        img.dataset.src = img.getAttribute("src");
        img.removeAttribute("src");
        img.dataset.sizes = img.getAttribute("sizes");
        img.removeAttribute("sizes");
      }
    });

    // we do the same with iframes
    this.cheapdiv.querySelectorAll("iframe").forEach((iframe: HTMLIFrameElement) => {
      if (!iframe.src.startsWith("blob:")) {
        iframe.dataset.src = iframe.getAttribute("src");
        iframe.removeAttribute("src");
      }
    });

    // and return the fresh inner html
    return this.cheapdiv.innerHTML;
  }

  /**
   * Prepares the lazy loader, runs on mounting or changing
   */
  public prepareLazyLoader() {
    // we do it for each image
    this.divref.current.querySelectorAll("img").forEach((img: HTMLImageElement) => {
      if (img.dataset.src) {
        lazyLoaderPrepare(img, [["sizes", "sizes"], ["srcset", "srcset"], ["src", "src"]]);
      }
    });

    // and each iframe
    this.divref.current.querySelectorAll("iframe").forEach((iframe: HTMLIFrameElement) => {
      if (iframe.dataset.src) {
        lazyLoaderPrepare(iframe, [["src", "src"]]);
      }
    });
  }

  /**
   * updates the html
   * @param html the html to update for
   */
  public updateHTML(html: string) {
    this.setState({
      html: this.getHTML(html),
    });
  }

  /**
   * Attach the events that are required for lazyloading
   */
  public attachEvents() {
    // first we get all the images
    this.divref.current.querySelectorAll("img").forEach((img: HTMLImageElement) => {
      // this dataset will only exist if loading!=lazy as otherwise the information
      // would have been restored during preparation
      if (img.dataset.src) {
        // so we would execute our lazyloader on the image if we know it needs such
        lazyloaderExecute(img);
      }

      // if (this.props.onImageSelect) {
      //   let targetEvent: HTMLElement = img;
      //   let standalone = true;
      //   if (
      //     img.parentElement &&
      //     img.parentElement.parentElement &&
      //     img.parentElement.parentElement.parentElement &&
      //     img.parentElement.parentElement.parentElement.classList.contains("image")
      //   ) {
      //     targetEvent = img.parentElement.parentElement.parentElement;
      //     standalone = false;
      //   }

      //   const base = deserializeElementBase(targetEvent);

      //   const imgInfo: IImage = {
      //     ...base,
      //     type: "image",
      //     alt: img.getAttribute("alt") || null,
      //     src: img.getAttribute("src") || img.dataset.src,
      //     srcId: img.dataset.srcId,
      //     srcSet: img.getAttribute("srcset") || img.dataset.srcset || null,
      //     sizes: img.getAttribute("sizes") || img.dataset.sizes || null,
      //     width: parseInt(img.dataset.srcWidth) || null,
      //     height: parseInt(img.dataset.srcHeight) || null,
      //     standalone,
      //     children: [STANDARD_TEXT_NODE()]
      //   };

      //   targetEvent.addEventListener("click", (e: MouseEvent) => {
      //     this.props.onImageSelect(imgInfo, e);
      //   });
      // }
    });

    // the same can be said about iframe
    this.divref.current.querySelectorAll("iframe").forEach((iframe: HTMLIFrameElement) => {
      if (iframe.dataset.src) {
        lazyloaderExecute(iframe);
      }
    });

    // about files, it's a bit different, we just want to add the click event to it
    // this.divref.current.querySelectorAll(".file").forEach((file: HTMLDivElement) => {
    //   const container = file.querySelector(".file-container");
    //   const title = file.querySelector(".file-title");
    //   container.addEventListener("click", () => {
    //     if (file.dataset.src) {
    //       window.open(file.dataset.src, title ? title.textContent : "_blank");
    //     }
    //   });
    // });

    // and now we trigger our old school listeners to it, since the images can be in view already
    // if there are no old school listeners this function will do nothing as none is listening
    triggerOldSchoolListeners();
  }

  public componentDidMount() {
    // we prepare all the lazy loader stuff which might make our things
    // go with loading=lazy
    this.prepareLazyLoader();
    // and attach the events for the stuff
    this.attachEvents();
  }
  public componentDidUpdate() {
    // on any update we do the same as we only really update when the html changes
    // any other updates are denied
    this.prepareLazyLoader();
    this.attachEvents();
  }
  public shouldComponentUpdate(nextProps: IPropertyViewRichTextViewerProps, nextState: IPropertyViewRichTextViewerState) {
    if (
      nextProps.children !== this.props.children ||
      !equals(nextProps.NodeProps, this.props.NodeProps, {strict: true})
    ) {
      this.updateHTML(nextProps.children);
    }
    // see only when the html changes
    return this.state.html !== nextState.html;
  }
  public render() {
    const Node = this.props.Node;
    return (
      <Node
        className={"rich-text" + (this.props.className ? " " + this.props.className : "")}
        lang={this.props.lang}
        ref={this.divref}
        dangerouslySetInnerHTML={{ __html: this.state.html }}
        {...this.props.NodeProps}
      />
    );
  }
}

interface ITemplatedPropertyViewRichTextRendererProps extends IPropertyViewRichTextViewerProps {
  templateArgs: TemplateArgs;
  segmenter: SegmenterType,
}

/**
 * The rich text renderer that is used for templted components, and fed
 * its specific args
 */
export class TemplatedPropertyViewRichTextRenderer extends React.Component<
  ITemplatedPropertyViewRichTextRendererProps
> {
  constructor(props: ITemplatedPropertyViewRichTextRendererProps) {
    super(props);
  }
  public shouldComponentUpdate(nextProps: ITemplatedPropertyViewRichTextRendererProps) {
    return (
      nextProps.children !== this.props.children ||
      nextProps.lang !== this.props.lang ||
      !equals(nextProps.NodeProps, this.props.NodeProps, {strict: true}) ||
      !equals(nextProps.templateArgs, this.props.templateArgs, { strict: true })
    );
  }
  public render() {
    const deserializedValue = this.props.isRichText ?
      deserialize(this.props.children, null, { dontNormalize: true, segmenter: this.props.segmenter }) :
      deserializePlain(this.props.children, null);
    const Node = this.props.Node;
    return <Node className={"rich-text" + (this.props.className ? " " + this.props.className : "")} lang={this.props.lang} {...this.props.NodeProps}>
      {renderTemplateDynamically(
        deserializedValue,
        this.props.templateArgs, {
          onCustom: this.props.onCustom,
          onCustomAttributesFor: this.props.onCustomAttributesFor,
          onCustomWrap: this.props.onCustomWrap,
        })}
    </Node>;
  }
}


/**
 * The property view text renderer
 * 
 * supported args:
 * - NullComponent: a react component to use rather than the default if the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * - nullNode: a react node to render instead of the default when the value is null
 * 
 * @param props the props passed by the handler
 * @returns a react element
 */
export default function PropertyViewTextRenderer(props: IPropertyViewTextRendererProps) {
  if (props.args.nullNode && (props.currentValue === null || props.currentValue.value === null)) {
    return props.args.nullNode;
  } else if (props.args.NullComponent && (props.currentValue === null || props.currentValue.value === null)) {
    const NullComponent = props.args.NullComponent;
    const nullArgs = props.args.nullComponentArgs;
    return <NullComponent {...nullArgs} />;
  }

  const Node: any = props.args.Node ? props.args.Node : ((props.isRichText || props.subtype === "plain") ? "div" : "span");
  const NodeProps: any = props.args.Node && props.args.NodeProps ? props.args.NodeProps : {};

  if (props.isRichText || props.args.treatLikeRichText) {
    if (
      props.args.makeTemplate ||
      props.args.makeAccessible ||
      (props.args.treatLikeRichText && !props.isRichText)
    ) {
      return (
        <TemplatedPropertyViewRichTextRenderer
          className={props.args.className}
          templateArgs={props.args.templateArgs}
          Node={Node}
          NodeProps={NodeProps}
          onCustom={props.args.onCustom}
          onCustomAttributesFor={props.args.onCustomAttributesFor}
          onCustomWrap={props.args.onCustomWrap}
          lang={props.args.overrideLanguage || props.currentValueLang}
          isRichText={props.isRichText}
          segmenter={props.args.segmenter}
        >
          {props.currentValueText}
        </TemplatedPropertyViewRichTextRenderer>
      );
    } else {
      return (
        <PropertyViewRichTextViewer
          className={props.args.className}
          Node={Node}
          NodeProps={NodeProps}
          lang={props.args.overrideLanguage || props.currentValueLang}
          isRichText={props.isRichText}
        >
          {props.currentValueText}
        </PropertyViewRichTextViewer>
      );
    }
  } else if (props.subtype === "plain") {
    return (
      <Node
        className={"plain-text" + (props.args.className ? " " + props.args.className : "")}
        lang={props.args.overrideLanguage || props.currentValueLang}
        {...NodeProps}
      >
        {props.currentValueText}
      </Node>
    );
  }
  return (
    <Node lang={props.args.overrideLanguage || props.currentValueLang} className={props.args.className} {...NodeProps}>
      {props.currentValueText}
    </Node>
  );
}
