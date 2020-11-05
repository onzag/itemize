import { DOMWindow } from "../../../util";

function processTemplateNodeInitialization(
  node: HTMLElement,
  disableInnerHTMLTemplating: boolean,
  templateArgsContext: any,
) {
  // has a text handler
  const textKey = node.dataset.text;
  if (textKey) {
    const text: string = templateArgsContext[textKey];
    if (typeof text !== "string") {
      // we do not log because this will hit the server side
    } else {
      node.textContent = text;
    }
  }

  // set the href key
  const hrefKey = node.dataset.href;
  if (hrefKey) {
    const href: string = templateArgsContext[hrefKey];
    if (typeof href !== "string") {
      // we do not log because this will hit the server side
    } else {
      node.setAttribute("href", href);
    }
  }

  // has a HTML handler
  const htmlKey = node.dataset.html;
  if (!disableInnerHTMLTemplating && htmlKey) {
    const html: string = node[htmlKey];

    if (typeof html !== "string") {
      // we do not log because this will hit the server side
    } else {
      node.innerHTML = html;
    }
  }
}


/**
 * Processes the intialization of a template, by processing
 * the child nodes of a given node
 * @param node the node we are working with
 * @param disableInnerHTMLTemplating whether to disable data-html
 * @param templateArgsContext the template args we are currently working with
 * @param rootTemplateArgs the template args of the root
 * @param templateArgsPath the template args of the path
 */
function processTemplateInitialization(
  node: HTMLElement,
  disableInnerHTMLTemplating: boolean,
  templateArgsContext: any,
) {
  // first we check if we have child nodes to loop
  node.hasChildNodes() && node.childNodes.forEach((childNode) => {
    // we consider it an html element
    const childNodeASHTMLElement = childNode as HTMLElement;

    // so the args we are working with, this is going to be
    // the context we will be working with
    let templateArgsNewContext = templateArgsContext;

    // and whether we should leave the children of this
    // node unhandled
    let leaveNodeChildrenUnhandled: boolean = false;

    // cheap cheesy way to check if we are working with a HTML Element
    // that has a dataset in it, no need for fancy checks since we are only interested
    // in such elements and we can be sure we have an html element
    if (typeof childNodeASHTMLElement.dataset !== "undefined" && childNodeASHTMLElement.dataset) {

      // update the context for children
      const contextKey = childNodeASHTMLElement.dataset.context;
      if (contextKey) {
        templateArgsNewContext = templateArgsContext[contextKey];
      }

      // so now we got to see if we have a for loop
      const forEachKey = childNodeASHTMLElement.dataset.forEach;
      if (forEachKey) {
        // we will unhandle then
        leaveNodeChildrenUnhandled = true;
        // and this is what we are looping for
        const forArgument = templateArgsNewContext[forEachKey];
        // we grab the next sibling so that we can properly repeat
        const nextSibling = childNodeASHTMLElement.nextSibling;

        // so we loop
        forArgument.forEach((forEachContext: any, index: number) => {
          // now we make a clone of what we are looping for
          const clone = childNodeASHTMLElement.cloneNode(true) as HTMLElement;
          // if we have a next sibling
          if (nextSibling) {
            // we insert before it
            childNodeASHTMLElement.parentElement.insertBefore(clone, nextSibling);
          } else {
            childNodeASHTMLElement.parentElement.appendChild(clone);
          }

          // and now we call for the initialization of this node itself
          processTemplateNodeInitialization(
            clone,
            disableInnerHTMLTemplating,
            forEachContext,
          );

          // if we don't expect children to be unhandled
          if (clone.hasChildNodes()) {
            // we handle them per clone result
            processTemplateInitialization(
              clone,
              disableInnerHTMLTemplating,
              forEachContext,
            );
          }
        });

        // now we can remove the original
        childNodeASHTMLElement.parentElement.removeChild(childNodeASHTMLElement);
      } else {
        // otherwise if we have no for loop, we just process the node itself
        processTemplateNodeInitialization(
          childNodeASHTMLElement,
          disableInnerHTMLTemplating,
          templateArgsNewContext,
        );
      }
    }

    // and if we did not decide to leave the children of the node unhandled and
    // we have children
    if (childNodeASHTMLElement.hasChildNodes()) {
      // lets recurse into them for their processing
      processTemplateInitialization(
        childNodeASHTMLElement,
        disableInnerHTMLTemplating,
        templateArgsNewContext,
      );
    }
  });
}

/**
 * Performs a simple template rendering
 * from a string based HTML template based on the text specs
 * 
 * Note that this method does not support UI Handlers
 * it is used for producing a string by doing a simple pass
 * on a template
 * 
 * for proper templates with full blown functionality you should
 * use the reactify method
 * 
 * @param template the template in question
 * @param args the arguments
 */
export function renderTemplate(
  template: string,
  args: any,
): string {
  const cheapdiv = DOMWindow.document.createElement("div");
  cheapdiv.innerHTML = template;

  processTemplateInitialization(
    cheapdiv,
    false,
    args,
  );

  return cheapdiv.innerHTML;
}