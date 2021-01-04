/**
 * Contains the serialization, reactification and deserialization functions
 * for the file element
 * 
 * @packageDocumentation
 */

import React from "react";
import { DOMWindow } from "../../../../../util";
import { IReactifyArg, ISerializationRegistryType } from "..";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "../base";
import { IText } from "./text";

/**
 * The function that registers and adds the file in the given
 * reigstry
 * @param registry the registry to modify
 */
export function registerFile(registry: ISerializationRegistryType) {

  /**
   * The function that serializes the file into HTML
   * @param file the file element in question
   * @returns an HTML Element
   */
  function serializeFile(file: IFile) {
    // first we use the serialization function in order to create the span that contains
    // the file
    const mainContainer = serializeElementBase(registry, file, "span", "file", null, null);
    mainContainer.dataset.src = file.src;
    mainContainer.dataset.srcId = file.srcId;

    // but we need to add the container inside that main container
    const parentContainer = DOMWindow.document.createElement("span");
    parentContainer.className = "file-container";
    mainContainer.appendChild(parentContainer);

    // then another for the icon
    const icon = DOMWindow.document.createElement("span");
    icon.className = "file-icon";
    parentContainer.appendChild(icon);

    // then for the extension
    const extension = DOMWindow.document.createElement("span");
    extension.className = "file-extension";
    extension.textContent = file.extension;
    icon.appendChild(extension);

    // filename
    const name = DOMWindow.document.createElement("span");
    name.className = "file-name";
    name.textContent = file.name;
    parentContainer.appendChild(name);

    // and file size
    const size = DOMWindow.document.createElement("span");
    size.className = "file-size";
    size.textContent = file.size;
    parentContainer.appendChild(size);

    // and we are done
    return mainContainer;
  }

  /**
   * Converts a HTML element that is already considered a file element
   * into the IFile form
   * @param node the node in question
   * @returns a file element structure
   */
  function deserializeFile(node: HTMLDivElement): IFile {
    // first we need to grab the information that is inside
    // the file element
    const fileNameNode = node.querySelector(".file-name");
    const fileExtensionNode = node.querySelector(".file-extension");
    const fileSizeNode = node.querySelector(".file-size");

    // it should be appropiate
    if (!fileNameNode || !fileExtensionNode || !fileSizeNode) {
      return null;
    }

    // now we get the base
    const base = deserializeElementBase(node);

    // and return the given file element
    return {
      ...base,
      containment: "void-inline",
      type: "file",
      srcId: node.dataset.srcId,
      name: fileNameNode.textContent,
      extension: fileExtensionNode.textContent,
      size: fileSizeNode.textContent,
      src: node.dataset.src,
      children: [
        {
          text: "",
          bold: false,
          italic: false,
          underline: false,
          templateText: null,
        },
      ],
    };
  }

  /**
   * Reactifies the file that is already
   * into a rich element form
   * @param arg the reactification arg
   */
  function reactifyFile(arg: IReactifyArg<IFile>) {
    // first we prepare the custom props
    const newCustomProps = {
      ...arg.customProps,
    };

    // if it's active then we can do this
    if (arg.active) {
      (newCustomProps as any).href = arg.element.src;
    }

    // now we can do the call for the basic reactification
    return reactifyElementBase(
      registry,
      "a",
      "file",
      null,
      (children: React.ReactNode) => {
        return (
          <span className="file-container">
            <span className="file-icon">
              <span className="file-extension" spellCheck={false}>{arg.element.extension}</span>
            </span>
            <span className="file-name" spellCheck={false}>{arg.element.name}</span>
            <span className="file-size" spellCheck={false}>{arg.element.size}</span>
            {children}
          </span>
        );
      },
      {
        ...arg,
        customProps: newCustomProps,
      },
    );
  }

  // now we can do the registration in the passed registry
  registry.REACTIFY.file = reactifyFile;
  registry.SERIALIZE.file = serializeFile;
  registry.DESERIALIZE.byClassName.file = deserializeFile;
}

/**
 * Represents a file type
 */
export interface IFile extends IElementBase {
  /**
   * The type
   */
  type: "file";
  /**
   * cannot contain anything
   */
  containment: "void-inline",
  /**
   * file name
   */
  name: string;
  /**
   * file size
   */
  size: string;
  /**
   * file extension
   */
  extension: string;
  /**
   * url of the file
   */
  src: string;
  /**
   * src id of the file
   * data-src-id
   */
  srcId: string;
  /**
   * The children of the image is a text node
   * as defined by the specifications of slate
   * even when nothing is writable there
   */
  children: [
    IText,
  ];
}
