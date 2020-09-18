/**
 * Contains the property view text renderer, another large
 * thing used for text/plain or text/html text, but not unsubtyped
 * text
 * 
 * @packageDocumentation
 */

import { IPropertyViewTextRendererProps } from "../../../internal/components/PropertyView/PropertyViewText";
import React from "react";
import { DOMWindow } from "../../../../util";

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
  disableLinks: boolean;
  children?: string;
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
export class PropertyViewRichTextViewer extends React.PureComponent<IPropertyViewRichTextViewerProps, IPropertyViewRichTextViewerState> {
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
      let a: HTMLAnchorElement = null;
      if (!this.props.disableLinks) {
        // this will wrap our image, for SEO purposes as well as to
        // have a click to it
        a = DOMWindow.document.createElement("a");
        a.href = img.src;
        a.title = img.alt || "";
      }

      // yes the src can be a blob, if the image hasn't been uploaded
      // yet, this is a valid protocol, and since it's local, lazyloading
      // preparations make no sense
      if (!img.src.startsWith("blob:")) {
        // we move all these attributes to the dataset
        img.dataset.srcset = img.srcset;
        img.removeAttribute("srcset");
        img.dataset.src = img.src;
        img.removeAttribute("src");
        img.dataset.sizes = img.sizes;
        img.removeAttribute("sizes");
      }

      if (!this.props.disableLinks) {
        // now we replace the img with the a link
        img.parentNode.replaceChild(a, img);
        // and add the image inside the a link
        a.appendChild(img);
      }
    });

    // we do the same with iframes
    this.cheapdiv.querySelectorAll("iframe").forEach((iframe: HTMLIFrameElement) => {
      if (!iframe.src.startsWith("blob:")) {
        iframe.dataset.src = iframe.src;
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
    });

    // the same can be said about iframe
    this.divref.current.querySelectorAll("iframe").forEach((iframe: HTMLIFrameElement) => {
      if (iframe.dataset.src) {
        lazyloaderExecute(iframe);
      }
    });

    // about files, it's a bit different, we just want to add the click event to it
    this.divref.current.querySelectorAll(".file").forEach((file: HTMLDivElement) => {
      const container = file.querySelector(".file-container");
      const title = file.querySelector(".file-title");
      container.addEventListener("click", () => {
        if (file.dataset.src) {
          window.open(file.dataset.src, title ? title.textContent : "_blank");
        }
      });
    });

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
    if (nextProps.children !== this.props.children) {
      this.updateHTML(nextProps.children);
    }
    // see only when the html changes
    return this.state.html !== nextState.html;
  }
  public render() {
    return (
      <div className="rich-text" ref={this.divref} dangerouslySetInnerHTML={{ __html: this.state.html }} />
    )
  }
}

/**
 * The property view text renderer
 * 
 * supported args:
 * - NullComponent: a react component to use rather than the default if the value is null
 * - nullComponentArgs: an object to pass as props to the null component
 * 
 * @param props the props passed by the handler
 * @returns a react element
 */
export default function PropertyViewTextRenderer(props: IPropertyViewTextRendererProps) {
  if (props.args.NullComponent && props.currentValue === null) {
    const NullComponent = props.args.NullComponent;
    const nullArgs = props.args.nullComponentArgs;
    return <NullComponent {...nullArgs} />;
  }

  if (props.isRichText) {
    return (
      <PropertyViewRichTextViewer disableLinks={!!props.args.disableLinks}>{props.currentValue}</PropertyViewRichTextViewer>
    );
  } else if (props.subtype === "plain") {
    return (
      <div className="plain-text">
        {props.currentValue}
      </div>
    );
  }
  return (
    <span>
      {props.currentValue}
    </span>
  )
}
