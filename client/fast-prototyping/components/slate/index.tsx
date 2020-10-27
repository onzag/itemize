import React from "react";
import uuid from "uuid";
import { IRootLevelDocument } from "./serializer";

interface ITemplateArg {
  type: "text" | "link" | "html" | "ui-handler" | "function";
  description: string;
}

/**
 * Represents the vailable args in the context
 */
interface ITemplateArgsContext {
  type: "context";
  loopable?: boolean;
  properties: {
    [name: string]: ITemplateArg | ITemplateArgsContext;
  };
}

interface ISlateEditorProps {
  /**
   * Trusted editors will enable access to
   * rich text prefixes and containers
   */
  isTrusted?: boolean;
  /**
   * The class name where all trusted components
   * for CSS usage are, defaults to "trusted"
   */
  trustedClassName?: string;
  /**
   * The class name prefix used for standard
   * elements, defaults to "rich-text--"
   */
  richTextPrefix?: string;
  /**
   * The classes that we have available for
   * this specific editor to use the rich-text type
   * they are all prefixed with the rich text prefix
   * if not specified it will read the current stylesheets
   * in order to find what is available
   */
  availiableRichTextSubclasses?: string[];
  /**
   * The class name prefix used for containers
   * elements, defaults to "container-"
   */
  containersPrefix?: string;
  /**
   * The classes that we have available for
   * this specific editor to use the container type
   * they are all prefixed with the container prefix
   * if not specified it will read the current stylesheets
   * in order to find what is available
   */
  containersRichTextSubclasses?: string[];
  /**
   * Whether it represents a template
   */
  isTemplate?: boolean;
  /**
   * The structure of the available template arguments
   */
  templateArgsContext?: ITemplateArgsContext;
  /**
   * The value as html
   */
  value: string;
  /**
   * An internal value provided
   * that represents a slate document
   * it might be null if this value
   * is unknown
   */
  internalValue: IRootLevelDocument;
}

interface ISlateEditorState {
  /**
   * The actual internal value that slate is
   * using
   */
  internalValue: IRootLevelDocument;
}

export class SlateEditor extends React.PureComponent<ISlateEditorProps, ISlateEditorState> {

}