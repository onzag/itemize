export interface IText {
  text: string;
  bold: boolean;
  italic: boolean;
}

export interface IElementBase {
  style?: string;
  styleHover?: string;
  styleActive?: string;
  classList?: string[];
  uiHandler?: string;
  context?: string;
  forEach?: string;
  click?: string;
  blur?: string;
  focus?: string;
  input?: string;
  keydown?: string;
  keypress?: string;
  keyup?: string;
  mousedown?: string;
  mouseenter?: string;
  mouseleave?: string;
  mousemove?: string;
  mouseover?: string;
  mouseout?: string;
  mouseup?: string;
  mousewheel?: string;
  touchstart?: string;
  touchmove?: string;
  touchend?: string;
  touchcancel?: string;
  wheel?: string;
}

export interface IParagraph extends IElementBase {
  type: "paragraph",
  subtype: "p" | "div" | "span",
  children: [
    IText,
  ];
}

export interface ITitle extends IElementBase {
  type: "title",
  subtype: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "span",
  children: [
    IText,
  ];
}

export interface IContainer extends IElementBase {
  type: "container",
  children: AllTypes[];
}

export interface ILink extends IElementBase {
  type: "link";
  children: [
    IText,
  ];
}

export interface IQuote extends IElementBase {
  type: "quote";
  children: [
    IText,
  ];
}

export interface IImage extends IElementBase {
  type: "image";
  width: number;
  height: number;
  url: string;
  alt: string;
  standalone: boolean;
  children: [
    IText,
  ];
}

export interface IFile extends IElementBase {
  type: "file";
  name: string;
  size: string;
  extension: string;
  url: string;
  children: [
    IText,
  ];
}

export interface IVideo extends IElementBase {
  type: "video",
  origin: "youtube" | "vimeo",
  src: string;
  children: [
    IText,
  ];
}

export interface ICustom extends IElementBase {
  type: "custom";
  customType: string;
  children: AllTypes[];
}

type AllTypes = IParagraph | IContainer | ICustom | ILink | IQuote | ITitle | IImage | IFile | IVideo;

export interface IRootLevelDocument {
  type: "document",
  id: string;
  children: AllTypes[];
}

export function serialize(document: IRootLevelDocument) {

}

export function deserialize(html: string) {

}