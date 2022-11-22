/**
 * Contains the serialization, reactification and deserialization functions
 * for the container element, which is basically a div with a container
 * class name
 * 
 * @module
 */

import { IReactifyArg, ISerializationRegistryType, RichElement, deserializeChildrenForNode } from "..";
import { TABLE_CLASS_PREFIX } from "../..";
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
      which === "table" ? ((element as ITable).tableType ? TABLE_CLASS_PREFIX + (element as ITable).tableType : null) : null,
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

    if (which === "table") {
      let tableType: string = null;
      node.classList.forEach((c) => {
        if (c.startsWith(TABLE_CLASS_PREFIX)) {
          tableType = c.substr(TABLE_CLASS_PREFIX.length);
        }
      });

      (element as any).tableType = tableType;
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
      which === "table" ? ((arg.element as ITable).tableType ? TABLE_CLASS_PREFIX + (arg.element as ITable).tableType : null) : null,
      // the children of the container
      arg.element.children,
      // no wrap children function
      null,
      // and the arg of reactification
      arg,
    );
  }

  // register in the registry
  registry.REACTIFY.table = reactifyTableElement.bind(null, "table");
  registry.REACTIFY.thead = reactifyTableElement.bind(null, "thead");
  registry.REACTIFY.tbody = reactifyTableElement.bind(null, "tbody");
  registry.REACTIFY.tfoot = reactifyTableElement.bind(null, "tfoot");
  registry.REACTIFY.tr = reactifyTableElement.bind(null, "tr");
  registry.REACTIFY.td = reactifyTableElement.bind(null, "td");
  registry.REACTIFY.th = reactifyTableElement.bind(null, "th");

  registry.SERIALIZE.table = serializeTableElement.bind(null, "table");
  registry.SERIALIZE.thead = serializeTableElement.bind(null, "thead");
  registry.SERIALIZE.tbody = serializeTableElement.bind(null, "tbody");
  registry.SERIALIZE.tfoot = serializeTableElement.bind(null, "tfoot");
  registry.SERIALIZE.tr = serializeTableElement.bind(null, "tr");
  registry.SERIALIZE.td = serializeTableElement.bind(null, "td");
  registry.SERIALIZE.th = serializeTableElement.bind(null, "th");

  registry.SUPERBLOCKS.table = true;
  registry.SUPERBLOCKS.thead = true;
  registry.SUPERBLOCKS.tbody = true;
  registry.SUPERBLOCKS.tfoot = true;
  registry.SUPERBLOCKS.tr = true;
  registry.SUPERBLOCKS.td = true;
  registry.SUPERBLOCKS.th = true;

  registry.ALLOWS_CHILDREN.table = [
    "thead",
    "tbody",
    "tfoot",
  ];
  registry.ON_INVALID_CHILDREN_WRAP_WITH.table = (child: RichElement) => {
    if (child.type === "tr") {
      return [
        {
          type: "tbody",
          children: [],
        }
      ];
    } else if (child.type === "td" || child.type === "th") {
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
  registry.ALLOWS_CHILDREN.tfoot = [
    "tr",
  ];
  registry.ON_INVALID_CHILDREN_WRAP_WITH.thead = (child: RichElement) => {
    if (child.type === "td" || child.type === "th") {
      return [
        {
          type: "tr",
          children: [],
        },
      ];
    } else if (
      registry.ALLOWS_CHILDREN.th.includes(child.type)
    ) {
      return [
        {
          type: "th",
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
          type: "th",
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
  registry.ON_INVALID_CHILDREN_WRAP_WITH.tfoot = registry.ON_INVALID_CHILDREN_WRAP_WITH.thead;

  registry.ALLOWS_CHILDREN.tr = [
    "td",
    "th",
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
  registry.ALLOWS_CHILDREN.th = registry.ALLOWS_CHILDREN.container;
  registry.ON_INVALID_CHILDREN_WRAP_WITH.td = registry.ON_INVALID_CHILDREN_WRAP_WITH.container;
  registry.ON_INVALID_CHILDREN_WRAP_WITH.th = registry.ON_INVALID_CHILDREN_WRAP_WITH.container;

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
  registry.ON_INVALID_TEXT_WRAP_WITH.tfoot = registry.ON_INVALID_TEXT_WRAP_WITH.tbody;

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

  registry.ON_INVALID_TEXT_WRAP_WITH.th = (text: IText) => {
    return [STANDARD_PARAGRAPH()];
  }

  registry.DESERIALIZE.byTag.TABLE = deserializeTableElement.bind(null, "table");
  registry.DESERIALIZE.byTag.TBODY = deserializeTableElement.bind(null, "tbody");
  registry.DESERIALIZE.byTag.THEAD = deserializeTableElement.bind(null, "thead");
  registry.DESERIALIZE.byTag.TFOOT = deserializeTableElement.bind(null, "tfoot");
  registry.DESERIALIZE.byTag.TR = deserializeTableElement.bind(null, "tr");
  registry.DESERIALIZE.byTag.TD = deserializeTableElement.bind(null, "td");
  registry.DESERIALIZE.byTag.TH = deserializeTableElement.bind(null, "th");

  registry.ON_EMPTY_FILL_WITH.table = () => {
    return {
      type: "tbody",
      children: [
        {
          type: "tr",
          children: [
            {
              type: "td",
              children: [STANDARD_PARAGRAPH()],
            }
          ]
        }
      ]
    }
  }

  registry.ON_EMPTY_FILL_WITH.thead = () => {
    return {
      type: "tr",
      children: [
        {
          type: "th",
          children: [STANDARD_PARAGRAPH()],
        }
      ]
    }
  }
  registry.ON_EMPTY_FILL_WITH.tbody = () => {
    return {
      type: "tr",
      children: [
        {
          type: "td",
          children: [STANDARD_PARAGRAPH()],
        }
      ]
    }
  }
  registry.ON_EMPTY_FILL_WITH.tfoot = registry.ON_EMPTY_FILL_WITH.tbody;

  registry.ON_EMPTY_FILL_WITH.tr = () => {
    return {
      type: "td",
      children: [STANDARD_PARAGRAPH()],
    }
  }

  registry.ON_EMPTY_FILL_WITH.td = () => {
    return STANDARD_PARAGRAPH();
  }

  registry.ON_EMPTY_FILL_WITH.th = () => {
    return STANDARD_PARAGRAPH();
  }

  registry.MERGABLES.thead = true;
  registry.MERGABLES.tbody = true;
  registry.MERGABLES.tfoot = true;

  registry.CUSTOM_NORMALIZER_POST.table = (
    table: ITable,
    path,
    executionRoot,
    primaryExecution,
    secondaryExecution,
    specialRules,
  ) => {
    const childrenCount = table.children.length;
    let maxColumnCount: number = 0;
    for (let i = 0; i < childrenCount; i++) {
      const tbodyElement = table.children[i];
      tbodyElement.children.forEach((row, i2) => {
        maxColumnCount = row.children.length > maxColumnCount ? row.children.length : maxColumnCount;
        row.children.forEach((column, i3) => {
          const shouldBeColumnTag = tbodyElement.type === "thead" ? "th" : "td";

          if (column.type !== shouldBeColumnTag) {
            primaryExecution.updateNodeAt([...path, i, i2, i3], { type: shouldBeColumnTag });
            secondaryExecution && secondaryExecution.updateNodeAt([...path, i, i2, i3], { type: shouldBeColumnTag });
          }
        });
      });
    }

    // inconsistent count of rows and columns
    for (let i = 0; i < childrenCount; i++) {
      const tbodyElement = table.children[i];
      tbodyElement.children.forEach((row, i2) => {
        const shouldBeColumnTag = tbodyElement.type === "thead" ? "th" : "td";
        if (row.children.length !== maxColumnCount) {
          const newNode: ITd | ITh = { type: shouldBeColumnTag, children: [STANDARD_PARAGRAPH()] };
          primaryExecution.insertNodeAt([...path, i, i2], newNode , row.children.length);
          secondaryExecution && secondaryExecution.insertNodeAt([...path, i, i2], newNode, row.children.length);
        }
      });
    }
  }
}

/**
 * The container represents a div contaner type
 * of the class container for the text specs
 */
export interface ITable extends IElementBase {
  type: "table";
  /**
   * The type for the table
   */
  tableType: string;

  /**
   * It can have as many children as it requires
   * but not text directly
   */
  children: Array<IThead | ITbody | ITfoot>;
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
export interface ITfoot extends IElementBase {
  type: "tfoot";

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
  children: Array<ITd | ITh>;
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

/**
 * The container represents a div contaner type
 * of the class container for the text specs
 */
export interface ITh extends IElementBase {
  type: "th";

  /**
   * It can have as many children as it requires
   * but not text directly
   */
  children: Array<IContainer | ICustom | IFile | IParagraph | IList | IQuote | ITable | IVideo | ITitle | IImage>;
}