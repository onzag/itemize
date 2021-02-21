/**
 * This file contains the base functionality to prepare serialization
 * and deserialization of every and each component, the base properties
 * are the properties that every node has
 * 
 * @packageDocumentation
 */

import React from "react";
import { DOMWindow } from "../../../../util";
import { IReactifyArg, ISerializationRegistryType, RichElement } from ".";
import { IText } from "./types/text";
import { ReactifiedElementWithHoverAndActive } from "./dynamic-component";

export interface IUIHandlerEvents {
  onClick?: any;
  onBlur?: any;
  onFocus?: any;
  onInput?: any;
  onKeyDown?: any;
  onKeyPress?: any;
  onKeyUp?: any;
  onMouseDown?: any;
  onMouseEnter?: any;
  onMouseLeave?: any;
  onMouseMove?: any;
  onMouseOver?: any;
  onMouseWheel?: any;
  onTouchStart?: any;
  onTouchMove?: any;
  onTouchEnd?: any;
  onTouchCancel?: any;
  onWheel?: any;
}

/**
 * Basic properties included in the basic view ui handler
 */
export interface IUIHandlerProps {
  /**
   * Represents the arguments that are retrieved
   * by the handler itself, the args are provided in slate
   * mode or not
   */
  args: {
    [key: string]: any;
  };
  /**
   * The element that the ui handler belongs to
   */
  element: RichElement;
  /**
   * The children inside the ui handler
   * please ensure to use them specially if in slate mode
   */
  children: React.ReactNode;
  /**
   * An optional class name
   */
  className?: string;
  /**
   * The style object
   */
  style?: React.CSSProperties;
  /**
   * contains events that should be added to the element
   */
  events: IUIHandlerEvents;
}

/**
 * Converts a style property string into a camel case based one
 * this is basically to convert things like text-align into textAlign
 * for use within react
 * @param str the string to convert
 */
function convertStylePropertyToCamelCase(str: string) {
  // first we split the dashes
  const splitted = str.split("-");

  // if it's just one then we return that just one
  if (splitted.length === 1) {
    return splitted[0];
  }

  // otherwise we do this process of capitalization
  return (
    splitted[0] +
    splitted
      .slice(1)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("")
  );
};

/**
 * Converts a style string such a text-align:center;padding:0; into a
 * react style object
 * @param str the style string
 */
export function convertStyleStringToReactObject(str: string) {
  // no string, then null
  if (!str) {
    return null;
  }

  // now we build the style
  const style = {};
  // so we split each ;
  str.split(";").forEach((el) => {

    // and now we can trim each
    const elTrimmed = el.trim();

    // if we have nothing, then return and
    // go for the next one
    if (!elTrimmed) {
      return;
    }

    // now we can get both the property and the value
    const [property, value] = el.split(":");

    // if we don't have any
    if (!property || !value) {
      return;
    }

    // and now we can try to format the property name
    const formattedProperty = convertStylePropertyToCamelCase(property.trim());
    const formattedValue = value.trim();

    if (formattedProperty === "position" && formattedValue === "fixed") {
      // the sanitizer prevents the usage of position fixed
      // as such this will be prevented
      return;
    }

    // now we set the style in the object
    style[formattedProperty] = formattedValue;
  });

  // if we got nothing
  if (Object.keys(style).length === 0) {
    return null;
  }

  // return the style
  return style;
};

/**
 * Retrieves all the element actions for a react target
 * @param base the base
 */
export function retrieveElementActionsForReact(base: IElementBase, context: any): IUIHandlerEvents {
  if (!context) {
    return {};
  }

  const actions: IUIHandlerEvents = {};
  Object.keys(eventReactifyTranslations).forEach((key) => {
    const value = base[key];
    if (value) {
      const contextValue = context[value];
      if (contextValue) {
        const translation = eventReactifyTranslations[key];
        actions[translation] = contextValue;
      }
    }
  });
  return actions;
}

/**
 * An interface to refer to attributes
 * of a given element that is used during serialization
 */
export interface IAttrs {
  [attr: string]: string;
}

/**
 * A list of translation of basic properties
 * @ignore
 */
const translations = {
  givenName: "data-name",
  ifCondition: "data-if",
  html: "data-html",
  textContent: "data-text",
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

/**
 * @ignore
 */
const eventReactifyTranslations = {
  click: "onClick",
  blur: "onBlur",
  focus: "onFocus",
  input: "onInput",
  keydown: "onKeyDown",
  keypress: "onKeyPress",
  keyup: "onKeyUp",
  mousedown: "onMouseDown",
  mouseenter: "onMouseEnter",
  mouseleave: "onMouseLeave",
  mousemove: "onMouseMove",
  mouseover: "onMouseOver",
  mouseout: "onMouseOut",
  mouseup: "onMouseUp",
  mousewheel: "onMouseWheel",
  touchstart: "onTouchStart",
  touchmove: "onTouchMove",
  touchend: "onTouchEnd",
  touchcancel: "onTouchCancel",
  wheel: "onWheel",
}

/**
 * Serializes an element from its form
 * as a RichElement to a HTML element
 * @param registry the registry to use
 * @param base the base element
 * @param tag the tag to use to build this element
 * @param baseClass the base class to use, eg. image, container, etc...
 * @param attrs the attributes to use
 * @param children the children that also need to be serialized under it
 * note that they need to be explictly set even if they are in the base
 * @returns a html element
 */
export function serializeElementBase(
  registry: ISerializationRegistryType,
  base: IElementBase,
  tag: string,
  baseClass: string,
  attrs: IAttrs,
  children: Array<RichElement | IText>,
): HTMLElement {
  // first we need to create the element itself as a DOM element
  const elementComponent = DOMWindow.document.createElement(tag);

  // if we have a base class we add it to the list
  if (baseClass) {
    elementComponent.classList.add(baseClass);
  }

  // if we have attributes, we add each of those
  if (attrs) {
    Object.keys(attrs).forEach((attr) => {
      elementComponent.setAttribute(attr, attrs[attr]);
    });
  }

  // if we have a rich class list in the base
  if (base.richClassList) {
    base.richClassList.forEach((c) => {
      elementComponent.classList.add("rich-text--" + c);
    });
  }

  // now we go over each one of the properties of the base
  Object.keys(base).forEach((k) => {
    // and check for a translation
    if (translations[k] && typeof base[k] !== "undefined" && base[k] !== null) {
      // set it if there's such
      elementComponent.setAttribute(translations[k], base[k]);
    }
  });

  // if we have ui handles to set
  if (base.uiHandlerArgs) {
    // we set them
    Object.keys(base.uiHandlerArgs).forEach((arg) => {
      elementComponent.dataset[arg] = base.uiHandlerArgs[arg];
    });
  }

  // fi we have specified children
  if (children) {
    // then we loop into them
    children.forEach((c) => {
      // if it's a text node
      if ((c as IText).text) {
        // then we use the text conversion function
        const textNode: Node = registry.SERIALIZE.text(c as IText);
        elementComponent.appendChild(textNode);
      } else if (registry.SERIALIZE[(c as RichElement).type]) {
        // if it's another type then we pick the function
        const fn = registry.SERIALIZE[(c as RichElement).type];
        // get the child element
        const childElement = fn(c as RichElement);
        // and push that
        elementComponent.appendChild(childElement);
      }
    });
  }

  // return it
  return elementComponent;
}

/**
 * Reactifies an element so that it can be given its react
 * form, basically converts the element into a react one
 *
 * @param registry the registry that is currently in use
 * @param Tag the tag we are using for the component to render
 * @param baseClass the base class that should have
 * @param children represents the children in the serialized form, as in RichElement or text nodes
 * that it has as children and should be used, that is of course unless these children are overriden
 * by other nodes
 * @param wrapChildren a function that is given so that you can return new children to wrap the current
 * children, basically define your own children wrappage, for example, images and videos provide their
 * own custom children nested structure
 * @param arg the reactification argument that is passed originally to the reactification function
 * and provides the fine customization details as well as custom children in case and whether it should
 * be a template or not
 */
export function reactifyElementBase(
  registry: ISerializationRegistryType,
  Tag: string,
  baseClass: string,
  children: Array<RichElement | IText>,
  wrapChildren: (node: React.ReactNode) => React.ReactNode,
  arg: IReactifyArg<RichElement | IText>,
) {
  // so first we take the element that we are supposed to reactify
  const base: IElementBase = arg.element as IElementBase;

  // let's create these in the meantime
  let currentTemplateArgs = arg.templateArgs;
  let currentTemplateRootArgs = arg.templateRootArgs || arg.templateArgs;

  // if we have a template and we are rendering as template
  if (arg.asTemplate && !arg.templateIgnoreContextualChanges) {
    // first we need to find the context
    if (currentTemplateArgs && base.context) {
      // and change it accordingly
      currentTemplateArgs = currentTemplateArgs[base.context] || null;
    }

    // then we got to use the foreach context if we have one
    if (base.forEach) {

      // and such we find what we are supposed to loop for
      const loopElement = currentTemplateArgs && currentTemplateArgs[base.forEach];

      // hopefully it'll be an array
      if (Array.isArray(loopElement)) {

        if (base.ifCondition) {
          const value = currentTemplateArgs[base.ifCondition];
          if (!value) {
            return null;
          }
        }

        // so now we loop and return a fragment
        return (
          <React.Fragment key={arg.key}>
            {loopElement.map((loopContext, index) => {
              // note how we re-reactify the current element
              // but telling it to ignore contextual changes
              // because we have already done them here
              return reactifyElementBase(
                registry,
                Tag,
                baseClass,
                children,
                wrapChildren,
                {
                  active: arg.active,
                  selected: arg.selected,
                  element: base as RichElement,
                  asTemplate: true,
                  customProps: arg.customProps,
                  key: index,
                  templateArgs: loopContext,
                  templateRootArgs: currentTemplateRootArgs,
                  templateIgnoreContextualChanges: true,
                }
              );
            })}
          </React.Fragment>
        );
      } else {
        // it's not an iterable, we can't render a thing
        return null;
      }
    }
  }

  if (arg.asTemplate && base.ifCondition) {
    const value = currentTemplateArgs && currentTemplateArgs[base.ifCondition];
    if (!value) {
      return null;
    }
  }

  // now we do this if we have UI handlers
  // for the given element and we are working out
  // as a template
  if (arg.asTemplate && base.uiHandler) {

    // and we find the given handler, either from the current context
    // or the root context
    const Handler: any = (
      currentTemplateArgs && currentTemplateArgs[base.uiHandler]
    ) || (
        currentTemplateRootArgs && currentTemplateRootArgs[base.uiHandler]
      );

    const handlerChildren = children.map((c, index: number) => {
      // we use these options and we add the key
      // in there
      const specificChildTemplateOptions: IReactifyArg<RichElement | IText> = {
        asTemplate: arg.asTemplate,
        active: arg.active,
        selected: arg.selected,
        element: c,
        templateArgs: currentTemplateArgs,
        templateRootArgs: currentTemplateRootArgs,
        key: index,
      };

      // and then we call the reactify
      if ((c as IText).text) {
        return registry.REACTIFY.text(specificChildTemplateOptions);
      } else if (registry.SERIALIZE[(c as RichElement).type]) {
        return registry.REACTIFY[(c as RichElement).type](specificChildTemplateOptions);
      }

      // ohteriwse null
      return null;
    });

    // if we have it, we use it
    if (Handler) {
      let className: string = null;
      base.richClassList && base.richClassList.forEach((c) => {
        className = (className || "") + " rich-text--" + c;
      });
      const style = convertStyleStringToReactObject(base.style);
      return (<Handler
        args={base.uiHandlerArgs}
        key={arg.key}
        children={handlerChildren}
        element={arg.element}
        className={className}
        style={style}
        events={retrieveElementActionsForReact(base, currentTemplateArgs)}
      />);
    }
  }

  // now we can define the props
  // given all of the before failed
  const finalProps = {
    ...arg.customProps,
    ...retrieveElementActionsForReact(base, currentTemplateArgs),
  };

  // if we have a key, we use it
  if (typeof arg.key !== "undefined") {
    finalProps.key = arg.key;
  }

  // define the class for active and inactive
  if (!arg.active) {
    finalProps.className = (finalProps.className || "") + " inactive";
  } else {
    finalProps.className = (finalProps.className || "") + " active";
  }

  // define the class for selection
  if (arg.selected) {
    finalProps.className = (finalProps.className || "") + " selected";
  }

  // add the base class
  if (baseClass) {
    finalProps.className = (finalProps.className || "") + " " + baseClass;
  }

  // the rich classes
  if (base.richClassList) {
    base.richClassList.forEach((c) => {
      finalProps.className = (finalProps.className || "") + " rich-text--" + c;
    });
  }

  // and set it up as template in the class if
  // html has been defined from the context as data-html
  // which is a templating attribute
  if ((base.html || base.textContent) && !arg.active) {
    finalProps.className = (finalProps.className || "") + " template";
  }

  // now we can define the style
  if (base.style) {
    finalProps.style = {
      ...convertStyleStringToReactObject(base.style),
      ...finalProps.style,
    };
  }

  // if we are working as a template and we have a html data attribute
  if (arg.asTemplate && base.html) {
    // we remove the children if we have them
    delete finalProps.children;

    const value = (
      currentTemplateArgs && currentTemplateArgs[base.html]
    ) || (
        currentTemplateRootArgs && currentTemplateRootArgs[base.html]
      );
    if (value) {
      if (typeof value === "string") {
        // and define the dangerously set inner html
        finalProps.dangerouslySetInnerHTML = { __html: value };
      } else {
        // define it as a react component
        finalProps.children = value;
      }
    } else {
      finalProps.children = null;
    }
  } else if (arg.asTemplate && base.textContent) {
    // we remove the children if we have them
    delete finalProps.children;
    // and define the text content
    const value = (
      currentTemplateArgs && currentTemplateArgs[base.textContent]
    ) || (
        currentTemplateRootArgs && currentTemplateRootArgs[base.textContent]
      );

    if (typeof value === "string") {
      finalProps.children = value;
    } else {
      finalProps.children = null;
    }

  } else if (!finalProps.children && children) {
    // otherwise if no children have been defined in the given
    // custom properties, then we are going to instantiate
    // based on the children we are requested to render
    // by the base element
    finalProps.children = children.map((c, index: number) => {
      // we use these options and we add the key
      // in there
      const specificChildTemplateOptions: IReactifyArg<RichElement | IText> = {
        asTemplate: arg.asTemplate,
        active: arg.active,
        selected: arg.selected,
        element: c,
        templateArgs: currentTemplateArgs,
        templateRootArgs: currentTemplateRootArgs,
        key: index,
      };

      // and then we call the reactify
      if ((c as IText).text) {
        return registry.REACTIFY.text(specificChildTemplateOptions);
      } else if (registry.SERIALIZE[(c as RichElement).type]) {
        return registry.REACTIFY[(c as RichElement).type](specificChildTemplateOptions);
      }

      // ohteriwse null
      return null;
    });
  }

  // if we have a function to wrap children
  if (wrapChildren) {
    // that's what we use as children
    finalProps.children = wrapChildren(finalProps.children);
  }

  // if we have these templating options
  if (base.styleActive || base.styleHover) {
    // then we fetch them
    const styleActive = convertStyleStringToReactObject(base.styleActive);
    const styleHover = convertStyleStringToReactObject(base.styleHover);

    // due to a bug in typescript I have to do it this way
    const propsForThis: any = {
      ...finalProps,
      Tag,
      styleActive,
      styleHover,
    };

    // and now we return with the dynamic component
    return (
      <ReactifiedElementWithHoverAndActive {...propsForThis} />
    )
  }

  // otherwise we return based on the simple tag
  return (
    <Tag {...finalProps} />
  );
}

/**
 * Deseriazes a element that is an HTML element into its RichElement
 * base form, so it extracts all the generic data-x properties and styles
 * and whatnot that are shared in between all the rich elements
 * 
 * @param node the node in question
 */
export function deserializeElementBase(node: HTMLElement): IElementBase {
  // no node, no properties
  if (!node) {
    return {};
  }

  // now we can get up an element base
  const result: IElementBase = {};

  // if we have a class list
  if (node.classList) {
    node.classList.forEach((c) => {
      if (c.startsWith("rich-text--")) {
        result.richClassList = result.richClassList || [];
        result.richClassList.push(c.substr(11));
      }
    });
  }

  // now we check our translations lists that we had
  // defined before in our translations list which translates
  // several properties into the given base element property
  // when there's a 1-1 relationship
  Object.keys(translations).forEach((tKey) => {
    const attr = translations[tKey] as string;
    const value = node.getAttribute(attr);
    if (value) {
      result[tKey] = value;
    }
  });

  // now for the ui handler if we got one
  // from our translation that added into the result
  if (result.uiHandler && node.dataset) {
    result.uiHandlerArgs = {};
    // we got to extract every dataset property
    // as an attribute for the ui handler
    Object.keys(node.dataset).forEach((datasetKey) => {
      result.uiHandlerArgs[datasetKey] = node.dataset[datasetKey];
    });
  }

  // and we then return that
  return result;
}

/**
 * Represents the base of every single element that is to
 * exist within the slate editor, these are the properties
 * that it might have regardless
 */
export interface IElementBase {
  /**
   * An optional name, just used to be displayed in the tree
   */
  givenName?: string;
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
   * and if condition for conditional rendering
   */
  ifCondition?: string;
  /**
   * For templating
   * Represents replacement html content for the inner HTML
   * of the given element
   */
  html?: string;
  /**
   * For templating
   * Represents replacement for textual content
   * of the given element
   */
  textContent?: string;
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

/**
 * @ignore
 * We are adding all the properties that exists in
 * a rich element that are in common of all
 * the rich elements these include all the properties
 * that have a one-to-one translation and the ones
 * that do not
 */
const ELEMENT_BASE_KEYS = [
  ...Object.keys(translations),
  "richClassList",
  "uiHandlerArgs",
];

/**
 * Clones the base of an element of all the properties in common
 * and leaves all the ones that are not in common
 * @param src 
 */
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
