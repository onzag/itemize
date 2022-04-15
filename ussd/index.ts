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

export function convertHTMLToUSSDTree(
  node: Node,
  root: Root,
  lang: string,
): IUSSDChunk {
  // if it's text node then we just return that
  if (node.nodeType === 3) {
    return {
      content: node.textContent,
      actions: [],
    };
  }

  if ((node as HTMLElement).tagName === "IMG" || ((node as HTMLElement).classList && (node as HTMLElement).classList.contains("image"))) {
    const imgName = root.getI18nDataFor(lang).rich_image;
    let childImg: HTMLImageElement = node as HTMLImageElement;
    if (!(childImg.tagName === "IMG") && childImg.querySelector) {
      childImg = childImg.querySelector("img");
    }
    const alt = childImg && childImg.alt;
    return {
      content: "[" + imgName + (alt ? " - " + alt : "" ) + "]",
      actions: [],
    }
  }

  if ((node as HTMLElement).classList && (node as HTMLElement).classList.contains("video")) {
    const videoName = root.getI18nDataFor(lang).rich_video;
    return {
      content: "[" + videoName + "]",
      actions: [],
    }
  }

  if ((node as HTMLElement).classList && (node as HTMLElement).classList.contains("file")) {
    let fileName = root.getI18nDataFor(lang).rich_file;
    if ((node as HTMLElement).querySelector) {
      const fileNameComponent = (node as HTMLElement).querySelector(".file-name");
      const fileExtensionComponent = (node as HTMLElement).querySelector(".file-extension");

      if (fileNameComponent && fileNameComponent.textContent) {
        fileName = fileNameComponent.textContent;

        if (fileExtensionComponent && fileExtensionComponent.textContent) {
          fileName += "." + fileExtensionComponent.textContent;
        }
      }
    }
    return {
      content: "[" + fileName + "]",
      actions: [],
    }
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
          requestInputValue: !!(cnode as HTMLElement).dataset.ussdActionInput,
          inputValueLabel: (cnode as HTMLElement).dataset.ussdActionInput,
        });
        return "";
      }

      const tagName = (cnode as HTMLElement).tagName.toLowerCase();
      if (tagName === "br") {
        // we use tabs as a cheatcode to represent double newlines that
        // we actually have intended
        return "\t";
      };

      // let's see if it means to add a line after it
      const childRepresentsLine =
        tagName === "img" ||
        tagName === "p" ||
        tagName === "li" ||
        (node as HTMLElement).classList.contains("image") ||
        nodesThatRepresentLines.includes(tagName);

      // for that we get the resulting chunk
      const resultingChildChunk = convertHTMLToUSSDTree(cnode, root, lang);

      if (resultingChildChunk.actions) {
        chunkInProgress.actions = chunkInProgress.actions.concat(resultingChildChunk.actions);
      }

      // and return its content
      return (childRepresentsLine ? "\n" : "") + (resultingChildChunk.content || "");
    } else {
      const resultingChildChunk = convertHTMLToUSSDTree(cnode, root, lang);
      return resultingChildChunk.content || "";
    }
  }).join("");

  // Remove double n, start n and end n, if they exist
  chunkInProgress.content = content.trim().replace(/\n+/g, "\n").replace(/^\n/g, "").replace(/\n$/g, "")
  
    // restore the double newlines encoded as tab, remove potential triplets or more now for the double
    // that it should have been
    .replace(/\t/g, "\n\n").replace(/\n\n\n+/g, "\n\n");

  if ((node as HTMLElement).tagName === "LI") {
    chunkInProgress.content = "- " + chunkInProgress.content;
  }

  // now we can return this chunk
  return chunkInProgress;
}
