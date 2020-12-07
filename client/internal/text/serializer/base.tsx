import React from "react";
import { ISerializationRegistryType, RichElement } from ".";
import { IText } from "./text";

function convertStylePropertyToCamelCase(str: string) {
  const splitted = str.split("-");
  if (splitted.length === 1) {
    return splitted[0];
  }
  return (
    splitted[0] +
    splitted
      .slice(1)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("")
  );
};

export function convertStyleStringToReactObject(str: string) {
  if (!str) {
    return null;
  }

  const style = {};
  str.split(";").forEach((el) => {
    const elTrimmed = el.trim();
    if (!elTrimmed) {
      return;
    }
    const [property, value] = el.split(":");
    if (!property || !value) {
      return;
    }

    const formattedProperty = convertStylePropertyToCamelCase(property.trim());
    const formattedValue = value.trim();

    if (formattedProperty === "position" && formattedValue === "fixed") {
      // the sanitizer prevents the usage of position fixed
      // as such this will be prevented
      return;
    }
    style[formattedProperty] = formattedValue;
  });

  if (Object.keys(style).length === 0) {
    return null;
  }

  return style;
};

export interface IAttrs {
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

export function serializeElementBase(
  registry: ISerializationRegistryType,
  base: IElementBase,
  tag: string,
  baseClass: string,
  attrs: IAttrs,
  children: Array<RichElement | IText>,
): HTMLElement {
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

  if (base.uiHandlerArgs) {
    Object.keys(base.uiHandlerArgs).forEach((arg) => {
      elementComponent.dataset[arg] = base.uiHandlerArgs[arg];
    });
  }

  if (children) {
    children.forEach((c) => {
      if ((c as IText).text) {
        const textNode: Node = registry.SERIALIZE.text(c as IText);
        elementComponent.appendChild(textNode);
      } else if (registry.SERIALIZE[(c as RichElement).type]) {
        const fn = registry.SERIALIZE[(c as RichElement).type];
        const childElement = fn(c as RichElement);
        elementComponent.appendChild(childElement);
      }
    });
  }

  return elementComponent;
}

interface IReactifiedElementWithHoverAndActiveProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  Tag: string;
  styleHover: React.CSSProperties;
  styleActive: React.CSSProperties;
}

interface IReactifiedElementWithHoverAndActiveState {
  hover: boolean;
  active: boolean;
}

class ReactifiedElementWithHoverAndActive extends React.PureComponent<IReactifiedElementWithHoverAndActiveProps, IReactifiedElementWithHoverAndActiveState> {
  constructor(props: IReactifiedElementWithHoverAndActiveProps) {
    super(props);

    this.state = {
      hover: false,
      active: false,
    }

    this.onHoverStart = this.onHoverStart.bind(this);
    this.onHoverEnd = this.onHoverEnd.bind(this);
    this.onActiveEnd = this.onActiveEnd.bind(this);
    this.onActiveStart = this.onActiveStart.bind(this);
  }

  public onHoverStart(originalFn: (arg: React.MouseEvent<HTMLElement, MouseEvent>) => void, e: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.setState({
      hover: true,
    });

    originalFn && originalFn(e);
  }

  public onHoverEnd(originalFn: (arg: React.MouseEvent<HTMLElement, MouseEvent>) => void, e: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.setState({
      hover: false,
    });

    originalFn && originalFn(e);
  }

  public onActiveStart(originalFn: (arg: React.MouseEvent<HTMLElement, MouseEvent>) => void, e: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.setState({
      active: true,
    });

    originalFn && originalFn(e);
  }

  public onActiveEnd(originalFn: (arg: React.MouseEvent<HTMLElement, MouseEvent>) => void, e: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.setState({
      active: false,
    });

    originalFn && originalFn(e);
  }

  public render() {
    const Tag = this.props.Tag;

    const standardProps = {
      ...this.props,
    };
    delete standardProps.Tag;
    delete standardProps.styleHover;
    delete standardProps.styleActive;

    const styleUsed = {
      ...this.props.style,
      ...(this.state.hover ? this.props.styleHover : null),
      ...(this.state.active ? this.props.styleActive : null),
    };

    standardProps.style = styleUsed;

    if (this.props.styleHover) {
      standardProps.onMouseEnter = this.onHoverStart.bind(null, this.props.onMouseEnter);
      standardProps.onMouseLeave = this.onHoverEnd.bind(null, this.props.onMouseLeave);
    }

    if (this.props.styleActive) {
      standardProps.onTouchStart = this.onActiveStart.bind(null, this.props.onTouchStart);
      standardProps.onTouchEnd = this.onActiveEnd.bind(null, this.props.onTouchEnd);
      standardProps.onMouseDown = this.onActiveStart.bind(null, this.props.onMouseDown);
      standardProps.onMouseUp = this.onActiveEnd.bind(null, this.props.onMouseUp);
    }

    return <Tag {...standardProps} />;
  }
}

export function reactifyElementBase(
  registry: ISerializationRegistryType,
  active: boolean,
  base: IElementBase,
  Tag: string,
  baseClass: string,
  wrapChildren: (node: React.ReactNode) => React.ReactNode,
  props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
  children: Array<RichElement | IText>,
) {
  const finalProps = {
    ...props,
  };
  if (!active) {
    finalProps.className = (finalProps.className || "") + " inactive";
  } else {
    finalProps.className = (finalProps.className || "") + " active";
  }

  if (baseClass) {
    finalProps.className = (finalProps.className || "") + " " + baseClass;
  }
  if (base.richClassList) {
    base.richClassList.forEach((c) => {
      finalProps.className = (finalProps.className || "") + " rich-text--" + c;
    });
  }

  if (base.style) {
    finalProps.style = {
      ...convertStyleStringToReactObject(base.style),
      ...finalProps.style,
    };
  }

  if (!props.children && children) {
    finalProps.children = children.map((c) => {
      if ((c as IText).text) {
        return registry.REACTIFY.text(c, active);
      } else if (registry.SERIALIZE[(c as RichElement).type]) {
        return registry.REACTIFY[(c as RichElement).type](c, active);
      }
    });
  }

  if (wrapChildren) {
    const children = finalProps.children;
    finalProps.children = wrapChildren(children);
  }

  if (base.styleActive || base.styleHover) {
    const styleActive = convertStyleStringToReactObject(base.styleActive);
    const styleHover = convertStyleStringToReactObject(base.styleHover);

    // due to a bug in typescript I have to do it this way
    const propsForThis: any = {
      ...finalProps,
      Tag,
      styleActive,
      styleHover,
    };

    return (
      <ReactifiedElementWithHoverAndActive {...propsForThis} />
    )
  }

  return (
    <Tag {...finalProps} />
  );
}

export function deserializeElementBase(node: HTMLElement): IElementBase {
  if (!node) {
    return {};
  }

  const result: IElementBase = {};
  if (node.classList) {
    node.classList.forEach((c) => {
      if (c.startsWith("rich-text--")) {
        result.richClassList = result.richClassList || [];
        result.richClassList.push(c.substr(11));
      }
    });
  }

  Object.keys(translations).forEach((tKey) => {
    const attr = translations[tKey] as string;
    const value = node.getAttribute(attr);
    if (value) {
      result[tKey] = value;
    }
  });

  if (result.uiHandler && node.dataset) {
    Object.keys(node.dataset).forEach((datasetKey) => {
      result.uiHandlerArgs[datasetKey] = node.dataset[datasetKey];
    });
  }

  return result;
}

export function deserializeElement(registry: ISerializationRegistryType, node: Node): RichElement | IText {
  const tagName = (node as HTMLElement).tagName;
  if (!tagName) {
    return registry.DESERIALIZE.text(node);
  }
  const classList = (node as HTMLElement).classList;

  let result: RichElement | IText = null;
  if (classList) {
    const foundPrefix = Object.keys(registry.DESERIALIZE.byClassNamePrefix).find((prefix) => {
      return classList.forEach((v) => v.startsWith(prefix));
    });

    if (foundPrefix) {
      result = registry.DESERIALIZE.byClassNamePrefix[foundPrefix](node) as any;
    }

    const foundExactClass = Object.keys(registry.DESERIALIZE.byClassName).find((className) => {
      return classList.contains(className);
    });

    if (foundExactClass) {
      result = registry.DESERIALIZE.byClassName[foundExactClass](node) as any;
    }
  }

  if (registry.DESERIALIZE.byTag[tagName]) {
    result = registry.DESERIALIZE.byTag[tagName](node) as any;
  }

  if ((result as RichElement).children) {
    const lastChild: any = (result as RichElement).children[(result as RichElement).children.length - 1];
    if (lastChild.containment === "inline") {
      const lastTextNode = lastChild.children[lastChild.children.length - 1];
      const lastNode = {
        bold: false,
        italic: false,
        underline: false,
        ...copyElementBase(lastTextNode),
        templateText: null,
        text: "",
      } as IText;
      (result as RichElement).children.push(lastNode as any);
    }
  }

  return result;
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
   * Arguments for the ui handler
   */
  uiHandlerArgs?: {
    [key: string]: string,
  };
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

const ELEMENT_BASE_KEYS = [
  ...Object.keys(translations),
  "richClassList",
  "uiHandlerArgs",
];

export function copyElementBase(src: IElementBase): IElementBase {
  if (!src) {
    return {};
  }
  const newObj: IElementBase = {};
  Object.keys(src).forEach((key) => {
    if (ELEMENT_BASE_KEYS.includes(key)) {
      newObj[key] = src[key];
    }
  });
  return newObj;
}