import { nodesThatRepresentLines } from "../client/internal/text";

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

export interface IUSSDChunk {
  /**
   * Represents the label of the given chunk
   */
  label: string;
  /**
   * The content of this chunk that should be split
   * into as many pages as it is necessary in order to be displayed
   * 
   * Once all the content of the chunk is displayed, or if there is no
   * content you should go to its children chunks
   */
  content: string;

  /**
   * Represents children chunks
   */
  children?: IUSSDChunk[];

  /**
   * Represents actions that belong to this chunk
   */
  actions?: IUSSDAction[];
}

export function convertHTMLToUSSDTree(node: Node): IUSSDChunk {
  // first we grab the label for this bit of the tree
  const label = ((node as HTMLElement).dataset && (node as HTMLElement).dataset.label) || "NO_LABEL";

  // if it's text node then we just return that
  if (node.nodeType === 3) {
    return {
      label,
      content: node.textContent,
    };
  }

  // if it has no children despite being html then it has nothing
  if (!node.childNodes || !node.childNodes.length) {
    return {
      label,
      content: "",
    };
  }

  // otherwise let's build the chunk
  const chunkInProgress: IUSSDChunk = {
    label,
    content: null,
  }

  // lets make the content from the child nodes
  const content = Array.from(node.childNodes).map((cnode) => {
    // for that we get the resulting chunk
    const resultingChildChunk = convertHTMLToUSSDTree(cnode);

    // if this was a html element node
    if (cnode.nodeType !== 3) {
      // let's see if it was a hard chunk element, that was sepcified to be a chunk itself
      const isChildHardChunk = (cnode as HTMLElement).dataset && (cnode as HTMLElement).dataset.chunk === "true";

      // if it's just a chunk
      if (isChildHardChunk) {
        // we must add it to the chunk children list
        // and forget whatever else it may have
        if (!chunkInProgress.children) {
          chunkInProgress.children = [];
        }
        chunkInProgress.children.push(resultingChildChunk);
        return "";
      }

      // let's see if it means to add a line after it
      const childRepresentsLine = nodesThatRepresentLines.includes((cnode as HTMLElement).tagName);

      // let's extract its children into our current
      if (!chunkInProgress.children && resultingChildChunk.children) {
        chunkInProgress.children = resultingChildChunk.children;
      } else if (resultingChildChunk.children) {
        chunkInProgress.children = chunkInProgress.children.concat(resultingChildChunk.children);
      }

      if (!chunkInProgress.actions && resultingChildChunk.actions) {
        chunkInProgress.actions = resultingChildChunk.actions;
      } else if (resultingChildChunk.actions) {
        chunkInProgress.actions = chunkInProgress.actions.concat(resultingChildChunk.actions);
      }

      // and return its content
      return (resultingChildChunk.content || "") + (childRepresentsLine ? "\n" : "");
    } else {
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