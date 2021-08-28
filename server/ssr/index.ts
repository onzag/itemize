/**
 * This file contains all the interfaces that are used to define SSR rules
 * it used to be big, but now it has become simple
 * @module
 */

/**
 * This is what a SSR rule is and specifies
 * how a page is to be rendered
 */
export interface ISSRRule {
  /**
   * The language that the rule is rendering at
   */
  language: string;
  /**
   * All the other available languages, this is used to build
   * the href langs
   */
  languages: string[];
  /**
   * whether it is a right to left language so it
   * can be accounted for in the HTML
   */
  rtl: boolean;
  /**
   * The user we are rendering for
   */
  forUser: {
    token: string;
    id: string;
    role: string;
    customData: any;
  };
  /**
   * Whether we will simply not use SSR at all
   */
  noSSR: boolean;
}

/**
 * An action that can be taken while a chunk of a specific page
 * is displayed
 * 
 * Actions should only display by the end of the chunk
 */
export interface ISSRUSSDAction {
  /**
   * Represents the label of the given action
   */
  label: string;

  /**
   * Represents the value that triggers this action, usually a number; given an input
   * and the fact an user is in a given chunk this enables filtering, if no value is
   * specified then it probably expects the value as input, text inputs basically do that
   */
  value?: string;

  /**
   * It's arrays in order to be able to build
   * these dinamically, this represents a graphql request body
   * 
   * "%value" represents the value and should be stringified as JSON
   */
  onInputReceivedExecute: string[];

  /**
   * It's arrays in order to be able to build
   * these dinamically
   * "%value" represents the given by USSD and should be URL encoded
   * "%id" represents the received id from the graphql request and should be URL encoded
   * "%version" represents the received version from the graphql request and should be URL encoded
   */
  onSuccessGoToURL: string[];

  /**
   * It's arrays in order to be able to build
   * these dinamically
   * "%value" represents the value given by USSD and should be URL encoded
   * "%error" represents the received error from the graphql request and should be stringified as JSON and URL encoded
   */
  onFailGoToURL: string[];
}

export interface ISSRUSSDChunk {
  /**
   * The content of this chunk that should be split
   * into as many pages as it is necessary in order to be displayed
   * 
   * Once all the content of the chunk is displayed, or if there is no
   * content you should go to its children chunks
   */
  content?: string;

  /**
   * Represents children chunks
   */
  children?: ISSRUSSDChunk[];

  /**
   * Represents actions that belong to this chunk
   */
  actions?: ISSRUSSDAction[];
}