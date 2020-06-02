import { IPropertyViewTextRendererProps } from "../../../internal/components/PropertyView/PropertyViewText";
import React from "react";
import { DOMWindow } from "../../../../util";

// The current intersection observer
let io: IntersectionObserver;
// old school listenrs that use the scroll of the document, these are listeners that should
// trigger every scroll, they return false onse they are done, true if they should reset
let oldSchoolListeners: Array<() => void> = [];
// triggers all the old school listeners
const triggerOldSchoolListeners = () => {
  oldSchoolListeners = oldSchoolListeners.filter((l) => l());
}
// this is the main old school listener that listens to the scroll event
// it's unset at first just like the io
let primaryOldSchoolListener: () => void;

// restores the element info making the item virtually loaded
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

// checks whether a component is in view, this is for the old school mode
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
 * marks an html element to be lazy loaded in 3 ways
 * @param element the element
 * @param propertySet a property set to copy from the dataset to the attribute itself
 */
function lazyloader(element: HTMLElement, propertySet: Array<[string, string]>) {
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
  } else if (window.IntersectionObserver) {
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

interface IPropertyViewRichTextViewerProps {
  children?: string;
}

interface IPropertyViewRichTextViewerState {
  html: string;
}

export class PropertyViewRichTextViewer extends React.Component<IPropertyViewRichTextViewerProps, IPropertyViewRichTextViewerState> {
  private divref: React.RefObject<HTMLDivElement>;
  private cheapdiv: HTMLDivElement;
  constructor(props: IPropertyViewRichTextViewerProps) {
    super(props);

    this.divref = React.createRef<HTMLDivElement>();
    this.cheapdiv = DOMWindow.document.createElement("div");

    this.state = {
      html: this.getHTML(props.children),
    }
  }
  public getHTML(html: string) {
    if (!html) {
      return null;
    }

    this.cheapdiv.innerHTML = html;

    this.cheapdiv.querySelectorAll("img").forEach((img: HTMLImageElement) => {
      if (!img.src.startsWith("blob:")) {
        img.dataset.srcset = img.srcset;
        img.removeAttribute("srcset");
        img.dataset.src = img.src;
        img.removeAttribute("src");
        img.dataset.sizes = img.sizes;
        img.removeAttribute("sizes");
        lazyloader(img, [["sizes", "sizes"], ["srcset", "srcset"], ["src", "src"]]);
      }
    });

    this.cheapdiv.querySelectorAll("iframe").forEach((iframe: HTMLIFrameElement) => {
      if (!iframe.src.startsWith("blob:")) {
        iframe.dataset.src = iframe.src;
        lazyloader(iframe, [["src", "src"]]);
      }
    });

    return this.cheapdiv.innerHTML;
  }
  public updateHTML(html: string) {
    this.setState({
      html: this.getHTML(html),
    });
  }
  public attachEvents() {
    this.divref.current.querySelectorAll("img").forEach((img: HTMLImageElement) => {
      if (!img.src.startsWith("blob:")) {
        lazyloader(img, [["sizes", "sizes"], ["srcset", "srcset"], ["src", "src"]]);
      }
    });

    this.divref.current.querySelectorAll("iframe").forEach((iframe: HTMLIFrameElement) => {
      if (!iframe.src.startsWith("blob:")) {
        lazyloader(iframe, [["src", "src"]]);
      }
    });

    this.divref.current.querySelectorAll(".file").forEach((file: HTMLDivElement) => {
      const container = file.querySelector(".file-container");
      const title = file.querySelector(".file-title");
      container.addEventListener("click", () => {
        if (file.dataset.src) {
          window.open(file.dataset.src, title ? title.textContent : "_blank");
        }
      });
    });

    triggerOldSchoolListeners();
  }
  public componentDidUpdate() {
    this.attachEvents();
  }
  public shouldComponentUpdate(nextProps: IPropertyViewRichTextViewerProps, nextState: IPropertyViewRichTextViewerState) {
    if (nextProps.children !== this.props.children) {
      this.updateHTML(nextProps.children);
    }
    return this.state.html !== nextState.html;
  }
  public render() {
    return (
      <div className="rich-text" ref={this.divref} dangerouslySetInnerHTML={{__html: this.state.html}}/>
    )
  }
}

export default function PropertyViewTextRenderer(props: IPropertyViewTextRendererProps) {
  if (props.isRichText) {
    return (
      <PropertyViewRichTextViewer>{props.currentValue}</PropertyViewRichTextViewer>
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