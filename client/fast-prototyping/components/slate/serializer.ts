const SERIALIZE_REGISTRY: any = {};
const DESERIALIZE_REGISTRY: any = {
  // in priority
  byClassNamePrefix: {

  },
  byClassName: {

  },
  byTag: {

  },
}

/**
 * Serializes a text type to html
 * @param text the text
 * @returns an html node
 */
function serializeText(text: IText): Node {
  const textNode = document.createTextNode(text.text);
  let final: Node = textNode;
  if (text.bold) {
    const strong = document.createElement("strong");
    strong.appendChild(final);
    final = strong;
  }
  if (text.italic) {
    const i = document.createElement("i");
    i.appendChild(final);
    final = i;
  }
  return final;
}

function deserializeText(node: Node) {

}

DESERIALIZE_REGISTRY.byTag.strong = deserializeText;
DESERIALIZE_REGISTRY.byTag.i = deserializeText;

/**
 * Represents the basic text type for the slate editor support
 */
export interface IText {
  /**
   * Represents the text content
   */
  text: string;
  /**
   * Whether the text is in bold
   */
  bold: boolean;
  /**
   * Whether the text is in italic
   */
  italic: boolean;
}

interface IAttrs {
  [attr: string]: string;
}

const translations = {
  style: "style",
  styleHover: "data-style-hover",
  styleActive: "data-style-active",
  uiHandler: "data-ui-handler",
  context: "data-context",
  forEach: "data-for-each",
  click: "data-on-click",
  blur: "data-on-blur",
  focus: "data-on-focus",
  input: "data-on-input",
  keydown: "data-on-keydown",
  keypress: "data-on-keypress",
  keyup: "data-on-keyup",
  mousedown: "data-on-mousedown",
  mouseenter: "data-on-mouseenter",
  mouseleave: "data-on-mouseleave",
  mousemove: "data-on-mousemove",
  mouseover: "data-on-mouseover",
  mouseout: "data-on-mouseout",
  mouseup: "data-on-mouseup",
  mousewheel: "data-on-mousewheel",
  touchstart: "data-on-touchstart",
  touchmove: "data-on-touchmove",
  touchend: "data-on-touchend",
  touchcancel: "data-on-touchcancel",
  wheel: "data-on-wheel",
}

function serializeElementBase(base: IElementBase, tag: string, baseClass: string, attrs: IAttrs, children: Array<SlateElement | IText>): HTMLElement {
  const elementComponent = document.createElement(tag);
  if (baseClass) {
    elementComponent.classList.add(baseClass);
  }
  if (attrs) {
    Object.keys(attrs).forEach((attr) => {
      elementComponent.setAttribute(attr, attrs[attr]);
    });
  }
  if (base.richClassList) {
    base.richClassList.forEach((c) => {
      elementComponent.classList.add("rich-text--" + c);
    });
  }

  Object.keys(base).forEach((k) => {
    if (translations[k]) {
      elementComponent.setAttribute(translations[k], base[k]);
    }
  });

  if (children) {
    children.forEach((c) => {
      if ((c as IText).text) {
        const textNode: Node = serializeText(c as IText);
        elementComponent.appendChild(textNode);
      } else if (SERIALIZE_REGISTRY[(c as SlateElement).type]) {
        const fn = SERIALIZE_REGISTRY[(c as SlateElement).type];
        const childElement = fn(c);
        elementComponent.appendChild(childElement);
      }
    });
  }

  return elementComponent;
}

/**
 * Represents the base of every single element that is to
 * exist within the slate editor, these are the properties
 * that it might have regardless
 */
export interface IElementBase {
  /**
   * This is the standard style that translates to the style tag
   * following the text specifications only some properties are allowed
   * within it
   */
  style?: string;
  /**
   * This is similar to the style tag but represents the style tag as it
   * is applied during a hover event, represents data-style-hover
   */
  styleHover?: string;
  /**
   * Same as the style tag with the same rules but represents data-style-active
   * and it's the style for when the item is in an active state
   */
  styleActive?: string;
  /**
   * The classes that this element has applied
   * these classes represent the extra classes and not the base
   * classes that are applied for the given type, so it's primarily
   * the rich-text-- classes types
   */
  richClassList?: string[];

  // TEMPLATING PROPERTIES

  /**
   * For templating
   * Represents a chosen ui handler and it applies to the property
   * data-ui-handler
   */
  uiHandler?: string;
  /**
   * for templating
   * Represents a chosen context and it applies to the property
   * data-context
   */
  context?: string;
  /**
   * for templating
   * Represents the chosen each context and it applies to the property
   * data-for-each
   */
  forEach?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-click event
   */
  click?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-blur event
   */
  blur?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-focus event
   */
  focus?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-input event
   */
  input?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-keydown event
   */
  keydown?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-keypress event
   */
  keypress?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-keyup event
   */
  keyup?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-mousedown event
   */
  mousedown?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-mouseenter event
   */
  mouseenter?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-mouseleave event
   */
  mouseleave?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-mousemove event
   */
  mousemove?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-mouseover event
   */
  mouseover?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-mouseup event
   */
  mouseout?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-mouseup event
   */
  mouseup?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-mousewheel event
   */
  mousewheel?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-touchstart event
   */
  touchstart?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-touchmove event
   */
  touchmove?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-touchend event
   */
  touchend?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-touchcancel event
   */
  touchcancel?: string;
  /**
   * For templating
   * Represents a variable for templating for the data-on-wheel event
   */
  wheel?: string;
}

function serializeParagraph(p: IParagraph) {
  return serializeElementBase(p, p.subtype, null, null, p.children);
}
SERIALIZE_REGISTRY["paragraph"] = serializeParagraph;

function deserializeParagraph(node: HTMLElement) {

}

DESERIALIZE_REGISTRY.byTag.p = deserializeParagraph;
DESERIALIZE_REGISTRY.byTag.div = deserializeParagraph;
DESERIALIZE_REGISTRY.byTag.span = deserializeParagraph;

/**
 * Represents the paragraph, p type for the
 * rich text specification
 * but it might also be a div or a span
 */
export interface IParagraph extends IElementBase {
  type: "paragraph",
  subtype: "p" | "div" | "span",

  /**
   * The paragraph only has one children and it's text
   * as it only contains text within it
   */
  children: [
    IText,
  ];
}

function serializeTitle(title: ITitle) {
  return serializeElementBase(title, title.subtype, null, null, title.children);
}
SERIALIZE_REGISTRY["title"] = serializeTitle;

function deserializeTitle(node: HTMLElement) {

}

DESERIALIZE_REGISTRY.byTag.h1 = deserializeTitle;
DESERIALIZE_REGISTRY.byTag.h2 = deserializeTitle;
DESERIALIZE_REGISTRY.byTag.h3 = deserializeTitle;
DESERIALIZE_REGISTRY.byTag.h4 = deserializeTitle;
DESERIALIZE_REGISTRY.byTag.h5 = deserializeTitle;
DESERIALIZE_REGISTRY.byTag.h6 = deserializeTitle;

/**
 * Represents the title, h1, h2, h3, etc...
 * for the rich text specification
 */
export interface ITitle extends IElementBase {
  type: "title",
  subtype: "h1" | "h2" | "h3" | "h4" | "h5" | "h6",

  /**
   * The title only has one children and it's text
   * as it only contains text within it
   */
  children: [
    IText,
  ];
}

function serializeContainer(container: IContainer) {
  return serializeElementBase(
    container,
    "div",
    container.containerType ? "container-" + container.containerType : "container",
    null,
    container.children,
  );
}
SERIALIZE_REGISTRY["container"] = serializeContainer;

function deserializeContainer(node: HTMLDivElement) {

}

DESERIALIZE_REGISTRY.byClassName.container = deserializeContainer;
DESERIALIZE_REGISTRY.byClassNamePrefix.container = deserializeContainer;

/**
 * The container represents a div contaner type
 * of the class container for the text specs
 */
export interface IContainer extends IElementBase {
  type: "container";
  /**
   * A container type, might be null
   */
  containerType: string;

  /**
   * It can have as many children as it requires
   * but not text directly
   */
  children: SlateElement[];
}

function serializeLink(link: ILink) {
  const attrs: IAttrs = {};
  if (link.thref) {
    attrs["data-href"] = link.thref;
  } else if (link.href) {
    attrs["href"] = link.href;
  }

  return serializeElementBase(
    link,
    "a",
    null,
    attrs,
    link.children,
  );
}
SERIALIZE_REGISTRY["link"] = serializeLink;

function deserializeLink(node: HTMLAnchorElement) {

}

DESERIALIZE_REGISTRY.byTag.a = deserializeLink;

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
  children: [
    IText,
  ];
  /**
   * Represents the data-href templating attribute
   */
  thref: string;
}

function serializeQuote(quote: IQuote) {
  return serializeElementBase(
    quote,
    "quote",
    null,
    null,
    quote.children,
  );
}
SERIALIZE_REGISTRY["quote"] = serializeQuote;

function deserializeQuote(node: HTMLQuoteElement) {

}

DESERIALIZE_REGISTRY.byTag.quote = deserializeQuote;

/**
 * Represents a quote tag
 */
export interface IQuote extends IElementBase {
  /**
   * Represents the type
   */
  type: "quote";
  /**
   * Represents the children
   */
  children: [
    IText,
  ];
}

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
      img,
      "img",
      null,
      attrs,
      null,
    );
    return standaloneImage;
  } else {
    const imageComponent = serializeElementBase(
      img,
      "div",
      "image",
      null,
      null,
    );

    const imageContainer = document.createElement("div");
    imageContainer.className = "image-container";
    imageComponent.appendChild(imageContainer);

    const imagePad = document.createElement("div");
    imagePad.className = "image-pad";

    const width = img.width;
    const height = img.height;
    const ratio = height / width;
    const percentage = ratio * 100;
    const padStyle = "padding-bottom:" + percentage + "%";

    imagePad.setAttribute("style", padStyle);
    imageContainer.appendChild(imagePad);

    const standaloneImage = serializeElementBase(
      {},
      "img",
      null,
      attrs,
      null,
    );
    imagePad.appendChild(standaloneImage);

    return imageComponent;
  }
}
SERIALIZE_REGISTRY["image"] = serializeImage;

function deserializeImage(node: HTMLDivElement | HTMLImageElement) {

}

DESERIALIZE_REGISTRY.byClassName.image = deserializeImage;
DESERIALIZE_REGISTRY.byTag.img = deserializeImage;

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

function serializeFile(file: IFile) {
  const mainContainer = serializeElementBase(file, "span", "file", null, null);
  mainContainer.dataset.src = file.src;
  mainContainer.dataset.srcId = file.srcId;

  const parentContainer = document.createElement("span");
  parentContainer.className = "file-container";
  mainContainer.appendChild(parentContainer);

  const icon = document.createElement("span");
  icon.className = "file-icon";
  parentContainer.appendChild(icon);

  const extension = document.createElement("span");
  extension.className = "file-extension";
  extension.textContent = file.extension;
  icon.appendChild(extension);

  const name = document.createElement("span");
  name.className = "file-name";
  name.textContent = file.name;
  parentContainer.appendChild(name);

  const size = document.createElement("span");
  size.className = "file-size";
  size.textContent = file.size;
  parentContainer.appendChild(size);

  return mainContainer;
}
SERIALIZE_REGISTRY["file"] = serializeFile;

function deserializeFile(node: HTMLDivElement) {

}

DESERIALIZE_REGISTRY.byClassName.file = deserializeFile;

/**
 * Represents a file type
 */
export interface IFile extends IElementBase {
  /**
   * The type
   */
  type: "file";
  /**
   * file name
   */
  name: string;
  /**
   * file size
   */
  size: string;
  /**
   * file extension
   */
  extension: string;
  /**
   * url of the file
   */
  src: string;
  /**
   * src id of the file
   * data-src-id
   */
  srcId: string;
  /**
   * The children of the image is a text node
   * as defined by the specifications of slate
   * even when nothing is writable there
   */
  children: [
    IText,
  ];
}

function serializeVideo(video: IVideo) {
  // make the main container with the right class
  const mainContainer = serializeElementBase(video, "div", "video", null, null);
  mainContainer.className = "video";

  // add the parent
  const parentContainer = document.createElement("div");
  parentContainer.className = "video-container";
  mainContainer.appendChild(parentContainer);

  // and set the iframe
  const iframe = document.createElement("iframe");
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
SERIALIZE_REGISTRY["video"] = serializeVideo;

function deserializeVideo(node: HTMLDivElement) {

}

DESERIALIZE_REGISTRY.byClassName.video = deserializeVideo;

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

function serializeCustom(custom: ICustom) {
  return serializeElementBase(
    custom,
    "div",
    "custom-" + custom.customType,
    null,
    custom.children,
  );
}
SERIALIZE_REGISTRY["custom"] = serializeCustom;

/**
 * The custom type represents a custom- element
 */
export interface ICustom extends IElementBase {
  /**
   * The type as custom
   */
  type: "custom";
  /**
   * Specifies which custom type it is
   */
  customType: string;
  /**
   * The children
   */
  children: SlateElement[];
}

function deserializeCustom(node: HTMLDivElement) {

}

DESERIALIZE_REGISTRY.byClassNamePrefix.custom = deserializeCustom;

type SlateElement = IParagraph | IContainer | ICustom | ILink | IQuote | ITitle | IImage | IFile | IVideo;

/**
 * Represents the root level document and a id
 * to keep track of it, every document should have
 * an unique uuid
 */
export interface IRootLevelDocument {
  type: "document",
  id: string;
  children: SlateElement[];
}

/**
 * Serializes a document
 * @param document 
 */
export function serialize(document: IRootLevelDocument): HTMLElement[] {
  return document.children.map(serializeElement).filter((n) => n !== null);
}

function serializeElement(element: SlateElement) {
  if (SERIALIZE_REGISTRY[element.type]) {
    const fn = SERIALIZE_REGISTRY[element.type];
    const childElement = fn(element);
    return childElement;
  }
  return null;
}

function deserializeElement(node: Node): SlateElement {
  const tagName = (node as HTMLElement).tagName;
  if (!tagName) {
    return null;
  }
  const classList = (node as HTMLElement).classList;

  if (classList) {
    const foundPrefix = Object.keys(DESERIALIZE_REGISTRY.byClassNamePrefix).find((prefix) => {
      return classList.forEach((v) => v.startsWith(prefix));
    });

    if (foundPrefix) {
      return DESERIALIZE_REGISTRY.byClassNamePrefix[foundPrefix](node);
    }

    const foundExactClass = Object.keys(DESERIALIZE_REGISTRY.byClassName).find((className) => {
      return classList.contains(className);
    });

    if (foundExactClass) {
      return DESERIALIZE_REGISTRY.byClassName[foundExactClass](node);
    }
  }

  if (DESERIALIZE_REGISTRY.byTag[tagName]) {
    return DESERIALIZE_REGISTRY.byTag[tagName](node);
  }

  return null;
}

export function deserialize(html: string) {
  const cheapdiv = document.createElement("div");
  cheapdiv.innerHTML = html;

  const newDocument: IRootLevelDocument = {
    type: "document",
    id: null,
    children: Array.from(cheapdiv.childNodes).map(deserializeElement).filter((n) => n !== null),
  };

  return newDocument;
}