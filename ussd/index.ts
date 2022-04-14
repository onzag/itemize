import type { IAppDataType } from "../server";
import { nodesThatRepresentLines } from "../client/internal/text";
import type Root from "../base/Root";

/**
 * An action that can be taken while a chunk of a specific page
 * is displayed
 * 
 * Actions should only display by the end of the chunk
 */
export interface IUSSDAction {
  /**
   * Represents the label of the given action
   */
  label: string;

  /**
   * Whether to request input value
   */
  requestInputValue: boolean;

  /**
   * The label for such value
   */
  inputValueLabel: string;

  /**
   * When an input is received this function is executed
   * if a string is returned it will redirect
   */
  onInputReceived: (appData: IAppDataType, value: string) => string | void | Promise<string | void>;
}

export interface IUSSDChunk {
  /**
   * The content of this chunk that should be split
   * into as many pages as it is necessary in order to be displayed
   * 
   * Once all the content of the chunk is displayed, or if there is no
   * content you should go to its children chunks
   */
  content: string;

  /**
   * Represents actions that belong to this chunk
   */
  actions: IUSSDAction[];
}

export function convertHTMLToUSSDTree(node: Node, root: Root): IUSSDChunk {
  // if it's text node then we just return that
  if (node.nodeType === 3) {
    return {
      content: node.textContent,
      actions: [],
    };
  }

  // if it has no children despite being html then it has nothing
  if (!node.childNodes || !node.childNodes.length) {
    return {
      content: "",
      actions: [],
    };
  }

  // otherwise let's build the chunk
  const chunkInProgress: IUSSDChunk = {
    content: null,
    actions: [],
  }

  // lets make the content from the child nodes
  const content = Array.from(node.childNodes).map((cnode) => {
    // if this was a html element node
    if (cnode.nodeType !== 3) {
      // let's see if it was a hard chunk element, that was sepcified to be a chunk itself
      const actionId = (cnode as HTMLElement).dataset && (cnode as HTMLElement).dataset.ussdAction;

      if (actionId) {
        chunkInProgress.actions.push({
          label: (cnode as HTMLElement).dataset.ussdLabel,
          onInputReceived: root.getStateKey(actionId),
          requestInputValue: (cnode as HTMLElement).dataset.ussdActionInput === "true",
          inputValueLabel: (cnode as HTMLElement).dataset.ussdActionInputLabel,
        });
        return "";
      }

      // let's see if it means to add a line after it
      const childRepresentsLine = nodesThatRepresentLines.includes((cnode as HTMLElement).tagName);

      // for that we get the resulting chunk
      const resultingChildChunk = convertHTMLToUSSDTree(cnode, root);

      if (resultingChildChunk.actions) {
        chunkInProgress.actions = chunkInProgress.actions.concat(resultingChildChunk.actions);
      }

      // and return its content
      return (resultingChildChunk.content || "") + (childRepresentsLine ? "\n" : "");
    } else {
      const resultingChildChunk = convertHTMLToUSSDTree(cnode, root);
      return resultingChildChunk.content || "";
    }
  }).join("");

  chunkInProgress.content = content.trim();

  // why would you end a chunk content with an endline
  // it's a waste of characters specially for USSD
  // I mean it can happen due to an ending being div
  if (chunkInProgress.content.endsWith("\n")) {
    chunkInProgress.content.substr(0, chunkInProgress.content.length - 1);
  }

  // now we can return this chunk
  return chunkInProgress;
}