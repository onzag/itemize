import React from "react";
import { DOMWindow } from "../../../../util";
import { ISerializationRegistryType } from ".";
import { serializeElementBase, deserializeElementBase, IElementBase, reactifyElementBase } from "./base";
import { IText } from "./text";

export function registerFile(registry: ISerializationRegistryType) {
  function serializeFile(file: IFile) {
    const mainContainer = serializeElementBase(registry, file, "span", "file", null, null);
    mainContainer.dataset.src = file.src;
    mainContainer.dataset.srcId = file.srcId;

    const parentContainer = DOMWindow.document.createElement("span");
    parentContainer.className = "file-container";
    mainContainer.appendChild(parentContainer);

    const icon = DOMWindow.document.createElement("span");
    icon.className = "file-icon";
    parentContainer.appendChild(icon);

    const extension = DOMWindow.document.createElement("span");
    extension.className = "file-extension";
    extension.textContent = file.extension;
    icon.appendChild(extension);

    const name = DOMWindow.document.createElement("span");
    name.className = "file-name";
    name.textContent = file.name;
    parentContainer.appendChild(name);

    const size = DOMWindow.document.createElement("span");
    size.className = "file-size";
    size.textContent = file.size;
    parentContainer.appendChild(size);

    return mainContainer;
  }

  function deserializeFile(node: HTMLDivElement): IFile {
    const fileNameNode = node.querySelector(".file-name");
    const fileExtensionNode = node.querySelector(".file-extension");
    const fileSizeNode = node.querySelector(".file-size");
    if (!fileNameNode || !fileExtensionNode || !fileSizeNode) {
      return null;
    }
    const base = deserializeElementBase(node);
    return {
      ...base,
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
        },
      ],
    };
  }

  function reactifyFile(file: IFile, customProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
    const newCustomProps = {
      ...customProps,
    };
    (newCustomProps as any).href = file.src;

    return reactifyElementBase(
      registry,
      file,
      "a",
      "file",
      (children: React.ReactNode) => {
        return (
          <span className="file-container">
            <span className="file-icon">
              <span className="file-extension">{file.extension}</span>
            </span>
            <span className="file-name">{file.name}</span>
            <span className="file-size">{file.size}</span>
            {children}
          </span>
        );
      },
      newCustomProps,
      null,
    );
  }

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
