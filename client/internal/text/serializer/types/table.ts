/**
 * Contains the serialization, reactification and deserialization functions
 * for the container element, which is basically a div with a container
 * class name
 * 
 * @module
 */

import { IReactifyArg, ISerializationRegistryType, RichElement, deserializeChildrenForNode } from "..";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "../base";
import { IContainer } from "./container";
import { ICustom } from "./custom";
import { IFile } from "./file";
import { IImage } from "./image";
import { IList } from "./list";
import { IParagraph, STANDARD_PARAGRAPH } from "./paragraph";
import { IQuote } from "./quote";
import { IText } from "./text";
import { ITitle } from "./title";
import { IVideo } from "./video";

/**
 * The function that registers and adds the container in the given
 * reigstry
 * @param registry the registry to modify
 */
export function registerTableElements(registry: ISerializationRegistryType) {

  /**
   * The function that serializes the container into HTML
   * @param container the container in question
   * @returns an HTML Element
   */
  function serializeTableElement(which: string, element: RichElement) {
    // calls the serialize element base function
    return serializeElementBase(
      // the registry
      registry,
      // the container in question
      element as IElementBase,
      // the element should be a div element type
      which,
      // the class will be container class or the prefixed class if a given container type
      // exists
      null,
      // no special attributes
      null,
      // the children inside the container, these are rich elements
      element.children,
    );
  }

  /**
   * Converts a HTML element that is already considered a container
   * into the IContainer form
   * @param node the node in question
   * @returns a container element structure
   */
  function deserializeTableElement(which: string, node: HTMLElement): RichElement {
    // first we take the base
    const base = deserializeElementBase(node);

    // now we can build the container itself
    const element: RichElement = {
      ...base,
      type: which as any,
      children: deserializeChildrenForNode(node) as any,
    }

    // return it
    return element;
  }

  /**
   * Reactifies the container that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyTableElement(which: string, arg: IReactifyArg<RichElement>) {
    // we retrun from the base
    return reactifyElementBase(
      // the registry
      registry,
      // the table element
      which,
      // no class
      null,
      // the children of the container
      arg.element.children,
      // no wrap children function
      null,
      // and the arg of reactification
      arg,
    );
  }

  // register in the registry
  registry.REACTIFY.table = reactifyTableElement.bind("table");
  registry.REACTIFY.thead = reactifyTableElement.bind("thead");
  registry.REACTIFY.tbody = reactifyTableElement.bind("tbody");
  registry.REACTIFY.tr = reactifyTableElement.bind("tr");
  registry.REACTIFY.td = reactifyTableElement.bind("td");

  registry.SERIALIZE.table = serializeTableElement.bind("table");
  registry.SERIALIZE.thead = serializeTableElement.bind("thead");
  registry.SERIALIZE.tbody = serializeTableElement.bind("tbody");
  registry.SERIALIZE.tr = serializeTableElement.bind("tr");
  registry.SERIALIZE.td = serializeTableElement.bind("td");

  registry.SUPERBLOCKS.table = true;
  registry.SUPERBLOCKS.thead = true;
  registry.SUPERBLOCKS.tbody = true;
  registry.SUPERBLOCKS.tr = true;
  registry.SUPERBLOCKS.td = true;

  registry.ALLOWS_CHILDREN.table = [
    "thead",
    "tbody",
  ];
  registry.ON_INVALID_CHILDREN_WRAP_WITH.table = (child: RichElement) => {
    if (child.type === "tr") {
      return [
        {
          type: "tbody",
          children: [],
        }
      ];
    } else if (child.type === "td") {
      return [
        {
          type: "tr",
          children: [],
        },
        {
          type: "tbody",
          children: [],
        }
      ];
    } else if (
      registry.ALLOWS_CHILDREN.td.includes(child.type)
    ) {
      return [
        {
          type: "td",
          children: [],
        },
        {
          type: "tr",
          children: [],
        },
        {
          type: "tbody",
          children: [],
        }
      ];
    } else if (child.type === "inline" || child.type === "file" || child.type === "link") {
      return [
        STANDARD_PARAGRAPH(),
        {
          type: "td",
          children: [],
        },
        {
          type: "tr",
          children: [],
        },
        {
          type: "tbody",
          children: [],
        }
      ];
    }
    return null;
  }
  registry.ALLOWS_CHILDREN.thead = [
    "tr",
  ];
  registry.ON_INVALID_CHILDREN_WRAP_WITH.thead = (child: RichElement) => {
    if (child.type === "td") {
      return [
        {
          type: "tr",
          children: [],
        },
      ];
    } else if (
      registry.ALLOWS_CHILDREN.td.includes(child.type)
    ) {
      return [
        {
          type: "td",
          children: [],
        },
        {
          type: "tr",
          children: [],
        }
      ];
    } else if (child.type === "inline" || child.type === "file" || child.type === "link") {
      return [
        STANDARD_PARAGRAPH(),
        {
          type: "td",
          children: [],
        },
        {
          type: "tr",
          children: [],
        }
      ];
    }
    return null;
  }
  registry.ALLOWS_CHILDREN.tbody = [
    "tr",
  ];
  registry.ON_INVALID_CHILDREN_WRAP_WITH.tbody = registry.ON_INVALID_CHILDREN_WRAP_WITH.thead;

  registry.ALLOWS_CHILDREN.tr = [
    "td",
  ];
  registry.ON_INVALID_CHILDREN_WRAP_WITH.tr = (child: RichElement) => {
    if (
      registry.ALLOWS_CHILDREN.td.includes(child.type)
    ) {
      return [
        {
          type: "td",
          children: []
        },
      ]
    } else if (child.type === "inline" || child.type === "file" || child.type === "link") {
      return [
        STANDARD_PARAGRAPH(),
        {
          type: "td",
          children: []
        },
      ]
    }
    return null;
  }

  registry.ALLOWS_CHILDREN.td = registry.ALLOWS_CHILDREN.container;
  registry.ON_INVALID_CHILDREN_WRAP_WITH.td = registry.ON_INVALID_CHILDREN_WRAP_WITH.container;

  registry.ON_INVALID_TEXT_WRAP_WITH.table = (text: IText) => {
    return [
      STANDARD_PARAGRAPH(),
      {
        type: "td",
        children: []
      },
      {
        type: "tr",
        children: []
      },
      {
        type: "tbody",
        children: []
      },
    ];
  }
  registry.ON_INVALID_TEXT_WRAP_WITH.tbody = (text: IText) => {
    return [
      STANDARD_PARAGRAPH(),
      {
        type: "td",
        children: []
      },
      {
        type: "tr",
        children: []
      },
    ];
  }
  registry.ON_INVALID_TEXT_WRAP_WITH.thead = registry.ON_INVALID_TEXT_WRAP_WITH.tbody;

  registry.ON_INVALID_TEXT_WRAP_WITH.tr = (text: IText) => {
    return [
      STANDARD_PARAGRAPH(),
      {
        type: "td",
        children: []
      },
    ];
  }

  registry.ON_INVALID_TEXT_WRAP_WITH.td = (text: IText) => {
    return [STANDARD_PARAGRAPH()];
  }

  registry.DESERIALIZE.byTag.TABLE = deserializeTableElement.bind("table");
  registry.DESERIALIZE.byTag.TBODY = deserializeTableElement.bind("tbody");
  registry.DESERIALIZE.byTag.THEAD = deserializeTableElement.bind("thead");
  registry.DESERIALIZE.byTag.TR = deserializeTableElement.bind("tr");
  registry.DESERIALIZE.byTag.TD = deserializeTableElement.bind("td");
}

/**
 * The container represents a div contaner type
 * of the class container for the text specs
 */
export interface ITable extends IElementBase {
  type: "table";

  /**
   * It can have as many children as it requires
   * but not text directly
   */
  children: Array<IThead | ITbody>;
}

/**
 * The container represents a div contaner type
 * of the class container for the text specs
 */
export interface IThead extends IElementBase {
  type: "thead";

  /**
   * It can have as many children as it requires
   * but not text directly
   */
  children: Array<ITr>;
}

/**
 * The container represents a div contaner type
 * of the class container for the text specs
 */
export interface ITbody extends IElementBase {
  type: "tbody";

  /**
   * It can have as many children as it requires
   * but not text directly
   */
  children: Array<ITr>;
}

/**
 * The container represents a div contaner type
 * of the class container for the text specs
 */
export interface ITr extends IElementBase {
  type: "tr";

  /**
   * It can have as many children as it requires
   * but not text directly
   */
  children: Array<ITd>;
}

/**
 * The container represents a div contaner type
 * of the class container for the text specs
 */
export interface ITd extends IElementBase {
  type: "td";

  /**
   * It can have as many children as it requires
   * but not text directly
   */
  children: Array<IContainer | ICustom | IFile | IParagraph | IList | IQuote | ITable | IVideo | ITitle | IImage>;
}
