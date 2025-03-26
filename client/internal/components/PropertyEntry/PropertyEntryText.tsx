/**
 * The gargantuan entry text handler
 * @module
 */

import React from "react";
import { IPropertyEntryHandlerProps, IPropertyEntryRendererProps } from ".";
import equals from "deep-equal";
import uuid from "uuid";
import { checkFileInAccepts, processAccepts, localeReplacer, fileURLAbsoluter } from "../../../../util";
import { IPropertyDefinitionSupportedSingleFilesType, PropertyDefinitionSupportedFilesType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/files";
import PropertyDefinition from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition";
import { FILE_SUPPORTED_IMAGE_TYPES, MAX_FILE_SIZE } from "../../../../constants";
import prettyBytes from "@onzag/itemize-text-engine/util/pretty-bytes";
import { IFeatureSupportOptions, sanitize } from "@onzag/itemize-text-engine/sanitizer";
import { IWrapperI18nRichTextInfo } from "@onzag/itemize-text-engine/editor/slate/wrapper";
import { deepRendererArgsComparer } from "../general-fn";
import type { IPropertyDefinitionSupportedTextType } from "../../../../base/Root/Module/ItemDefinition/PropertyDefinition/types/text";
import { imageSrcSetRetriever } from "../../../components/util";
import type { IConfigRawJSONDataType } from "../../../../config";
import type ItemDefinition from "../../../../base/Root/Module/ItemDefinition";
import type Include from "../../../../base/Root/Module/ItemDefinition/Include";

function canRestoreCalculator(v: IPropertyDefinitionSupportedTextType, v2: IPropertyDefinitionSupportedTextType) {
  if (v === v2) {
    return false;
  }
  if (
    typeof v === "string" || typeof v === "number" || !v || typeof v === "boolean" ||
    typeof v2 === "string" || typeof v2 === "number" || !v2 || typeof v2 === "boolean"
  ) {
    return v !== v2;
  }

  const language1 = v.language;
  const language2 = v2.language;
  const value1 = v.value;
  const value2 = v2.value;

  return language1 !== language2 || value1 !== value2;
}

export function fileResolver(
  config: IConfigRawJSONDataType,
  currentFiles: PropertyDefinitionSupportedFilesType,
  itemDefinition: ItemDefinition,
  forId: string,
  forVersion: string,
  include: Include,
  mediaProperty: PropertyDefinition,
  cacheFiles: boolean,
  forceFullURLS: boolean,
  fileId: string,
  isImage: boolean,
  node: HTMLElement,
) {
  const currentFileIndex = currentFiles ? currentFiles.findIndex((f) => f.id === fileId) : -1;
  const currentFile = currentFileIndex !== -1 ? currentFiles[currentFileIndex] : null;

  if (!currentFile) {
    return null;
  }

  const domain = process.env.NODE_ENV === "production" ? config.productionHostname : config.developmentHostname;
  const absolutedFile = fileURLAbsoluter(
    domain,
    config.defaultCluster,
    config.allClusters,
    currentFile,
    itemDefinition,
    forId,
    forVersion || null,
    include,
    mediaProperty,
    cacheFiles,
    forceFullURLS,
  );

  if (!absolutedFile) {
    return null;
  }

  const srcset = isImage ? imageSrcSetRetriever(absolutedFile, mediaProperty) : null;

  return {
    src: absolutedFile.url,
    srcset,
  };
}

/**
 * Information about the file that has just been inserted
 */
export interface IInsertedFileInformationType {
  /**
   * The file itself
   */
  result: IPropertyDefinitionSupportedSingleFilesType;
  /**
   * width of the file, only available if it's an image
   */
  width: number;
  /**
   * height of the file, only available if it's an image
   */
  height: number;
  /**
   * whether it is an image
   */
  isImage: boolean;
}

/**
 * The entry text renderer props that every renderer is going to get
 * in order to render text
 */
export interface IPropertyEntryTextRendererProps extends IPropertyEntryRendererProps<IPropertyDefinitionSupportedTextType> {
  /**
   * A safe sanitized and processed value to use
   * with the text type
   */
  currentValueText: string;

  /**
   * The language used, or null, if no language found
   */
  currentValueLang: string;

  /**
   * For rich text contains the information about
   * building the standard toolbar that is expected
   */
  i18nRichInfo: IWrapperI18nRichTextInfo;

  /**
   * Rich text features
   */
  features: IFeatureSupportOptions;

  /**
   * Whether it is rich text
   */
  isRichText: boolean;
  /**
   * A localized version of an error for the last loaded file
   * that failed to load, try to dismiss it before attempting
   * to reset
   */
  lastLoadedFileError: string;
  /**
   * Dismiss the lastLoadedFileError
   */
  dismissLastLoadedFileError: () => void;

  /**
   * Insert a file, will insert a file into the media property
   * and will ensure that the file is valid as well
   * @param file the file we are passing
   * @param isExpectingImage whether the file should be an image
   * of the types we are expecting
   * @returns a promise with information about the file, note
   * that even if you are not expecting just an image but
   * you pass an image you will get image information
   */
  onInsertFile: (file: File, isExpectingImage?: boolean) =>
    Promise<IInsertedFileInformationType>;

  /**
   * Insert a file, based on an url, this is very useful when doing
   * pastes where we need to retrieve the information based on an url
   * @param url the url we need to fetch data from
   * @param name the name of the file to give it
   * @param isExpectingImage whether the file should be an image
   * of the types we are expecting
   * @returns a promise with information about the file, note
   * that even if you are not expecting just an image but
   * you pass an image you will get image information
   */
  onInsertFileFromURL: (url: string, name: string, isExpectingImage?: boolean) =>
    Promise<IInsertedFileInformationType>;

  /**
   * Specifies whether the file id exists within the current context
   * @param fileId the file id
   * @returns a boolean
   */
  onCheckFileExists: (fileId: string) => boolean;

  /**
   * Given an id returns the given file
   * @param fileId the file id
   * @returns the single file
   */
  onRetrieveFile: (fileId: string) => IPropertyDefinitionSupportedSingleFilesType;

  /**
   * Given an id returns the given file as an image with its given source set
   * @param fileId the file id
   * @returns the single file
   */
  onRetrieveImage: (fileId: String) => { file: IPropertyDefinitionSupportedSingleFilesType, srcset: string };

  /**
   * Given a blob URL that doesn't have a remote server located storage
   * provides a data URI for the file, this is used for copying; as you will
   * need DATA URIs for blob urls
   * @param fileId the file id
   * @returns a data uri or null
   */
  //onRetrieveDataURI: (fileId: string) => string;
}

/**
 * The state for the entry text
 */
interface IPropertyEntryTextState {
  /**
   * An error for the last loaded file
   */
  lastLoadedFileError: string;
  showUserSetErrors: boolean;
}

/**
 * The property entry text handler class
 */
export default class PropertyEntryText
  extends React.Component<IPropertyEntryHandlerProps<IPropertyDefinitionSupportedTextType, IPropertyEntryTextRendererProps>, IPropertyEntryTextState> {

  /**
   * We hold and cache our media property
   */
  private cachedMediaProperty: PropertyDefinition;
  /**
   * We hold and cache our accepts for the media property
   */
  private cachedMediaPropertyAcceptsFiles: string;
  /**
   * We hold and cache our accpets for the images in the media property
   */
  private cachedMediaPropertyAcceptsImages: string;

  /**
   * As long as the property entry text is mounted it will keep track of all the files
   * that have ever been in it, in order to be able to restore
   * them during undo processes, note however, that this means that having
   * two equal property entry for text at the same time will revoke
   * all the blob urls during dismount and they will not share the same
   * history, this might cause issues due to this cache
   * so avoid having two entry at the same time
   */
  private internalFileCache: {
    [id: string]: IPropertyDefinitionSupportedSingleFilesType;
  }

  /**
   * Contains a list of active data uris for the blob elements
   */
  // private activeDataURIs: {
  //   [id: string]: string;
  // }

  constructor(props: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedTextType, IPropertyEntryTextRendererProps>) {
    super(props);

    this.state = {
      lastLoadedFileError: null,
      showUserSetErrors: false,
    }

    this.internalFileCache = {};
    // this.activeDataURIs = {};

    this.onInsertFile = this.onInsertFile.bind(this);
    this.onInsertFileFromURL = this.onInsertFileFromURL.bind(this);
    this.onCheckFileExists = this.onCheckFileExists.bind(this);
    this.onRetrieveFile = this.onRetrieveFile.bind(this);
    this.onRetrieveImage = this.onRetrieveImage.bind(this);
    //this.onRetrieveDataURI = this.onRetrieveDataURI.bind(this);
    this.onRestoreHijacked = this.onRestoreHijacked.bind(this);
    this.onChangeHijacked = this.onChangeHijacked.bind(this);
    this.dismissLastLoadedFileError = this.dismissLastLoadedFileError.bind(this);
    this.enableUserSetErrors = this.enableUserSetErrors.bind(this);

    this.cacheMediaPropertyInProps(props);
  }

  public enableUserSetErrors() {
    this.setState({
      showUserSetErrors: true,
    });
  }

  public dismissLastLoadedFileError() {
    this.setState({
      lastLoadedFileError: null,
    });
  }

  public componentWillUnmount() {
    // Now revoking happens when the items are released from the central memory handle
    // Object.keys(this.internalFileCache).forEach((k) => {
    //   if (this.internalFileCache[k].url.startsWith("blob:")) {
    //     URL.revokeObjectURL(this.internalFileCache[k].url);
    //   }
    // });

    // this.activeDataURIs = {};
  }

  /**
   * Called during initial setup
   * @param props the props we are using
   */
  public cacheMediaPropertyInProps(props: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedTextType, IPropertyEntryTextRendererProps>) {
    // we get the media property name
    const mediaPropertyName = props.property.getConfigValue("mediaProperty") as string;
    // so if we have such as a media property
    if (mediaPropertyName) {
      // we are going to find and get it
      this.cachedMediaProperty = props.itemDefinition.getPropertyDefinitionFor(mediaPropertyName, true);

      // process the accepts
      this.cachedMediaPropertyAcceptsFiles = processAccepts(
        this.cachedMediaProperty.getConfigValue("accept") as string,
        !!this.cachedMediaProperty.getConfigValue("imageUploader"),
      );

      // and then see what images we support from these accepts
      this.cachedMediaPropertyAcceptsImages = this.cachedMediaPropertyAcceptsFiles === "*" ?
        FILE_SUPPORTED_IMAGE_TYPES.join(",") :
        this.cachedMediaPropertyAcceptsFiles.split(",").filter((accepting) => {
          return accepting.startsWith("image");
        }).join(",");
    }
  }

  /**
   * Ran during mount of updates, caches the files that are in the media property
   */
  public cacheCurrentFiles() {
    // so we get the media property
    const relatedPropertyName = this.props.property.getConfigValue("mediaProperty") as string;
    // if we have one
    if (relatedPropertyName) {
      // we will get such media property
      const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
      // and the current value for it
      const currentValue =
        relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

      // if we have one, we will loop and store such files
      if (currentValue) {
        const processedDataURIS: string[] = [];
        currentValue.forEach((v) => {
          this.internalFileCache[v.id] = v;

          // if (v.url.startsWith("blob:")) {
          //   processedDataURIS.push(v.id);

          // if (!this.activeDataURIs[v.id]) {
          //   (async () => {
          //     if (v.src) {
          //       this.activeDataURIs[v.id] = await this.readBlobAsDataUrl(v.src as any);
          //     } else {
          //       this.activeDataURIs[v.id] = await this.readUrlAsDataUrl(v.url);
          //     }
          //   })();
          // }
          //}
        });

        // Object.keys(this.activeDataURIs).forEach((fileId) => {
        //   if (!processedDataURIS.includes(fileId)) {
        //     delete this.activeDataURIs[fileId];
        //   }
        // });
      }
    }
  }

  public componentDidMount() {
    // so if we are in rich text
    if (this.props.property.isRichText()) {
      // we cache the current files, if there are any and if
      // we even support media property
      this.cacheCurrentFiles();
    }
  }

  public componentDidUpdate(prevProps: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedTextType, IPropertyEntryTextRendererProps>) {
    const relatedPropertyName = this.props.property.getConfigValue("mediaProperty") as string;
    if (
      relatedPropertyName &&
      prevProps.state.value !== this.props.state.value &&
      this.props.property.isRichText()
    ) {
      this.cacheCurrentFiles();
    }
  }

  /**
   * the change event but hijacked so we can see
   * if we need to remove things from the media property
   * 
   * This hijack only applies itself if there's a media property
   * so it makes sense
   * 
   * @param value the value
   * @param internalValue the internal value
   */
  public onChangeHijacked(value: IPropertyDefinitionSupportedTextType, internalValue: any) {
    // so first we try to read the html content in this fast and dirty way
    const dataSrcIdRegex = /data\-src\-id\=\"([A-Za-z0-9_-]+)\"/g;
    // this array for the ids we find
    const idsGathered: string[] = [];
    // and now we build a match loop
    let match: RegExpExecArray;
    do {
      match = dataSrcIdRegex.exec(value.value);
      if (match) {
        const id = match[1];
        idsGathered.push(id);
        // we call the sync function to restore the file
        // into the current value of the property if necessary
        this.onRestoreLostFile(id);
      }
    } while (match);

    // now we need to find the ones that have been deleted and are currently not loaded
    const relatedPropertyName = this.props.property.getConfigValue("mediaProperty") as string;
    const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
    const currentValue =
      relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

    // if we got a value
    if (currentValue) {
      // we loop within it and see
      currentValue.forEach((v) => {
        // if it's not in the gathered list
        if (!idsGathered.includes(v.id)) {
          this.onRemoveFile(v.id);
        }
      });
    }

    this.props.onChange(value, internalValue);
  }

  /**
   * The restore but hijacked, also only if there's
   * a media property; basically will do the standard
   * restoration, but also restore its related media property
   */
  public onRestoreHijacked() {
    const relatedPropertyName = this.props.property.getConfigValue("mediaProperty") as string;
    const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);

    relatedProperty.restoreValueFor(this.props.forId || null, this.props.forVersion || null);
    // don't need to trigger listeners as this will do it by itself
    this.props.onRestore();
  }

  /**
   * Function that triggers when a file that had been removed, needs to be restored
   * such as done by an undo ctrl+z event
   * @param fileId the file to be restored
   */
  public onRestoreLostFile(fileId: string) {
    const relatedPropertyName = this.props.property.getConfigValue("mediaProperty") as string;
    const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
    const currentValue =
      relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

    // it's almost certain that the file must be in this internal cache to restore files
    if ((!currentValue || !currentValue.find(v => v.id === fileId)) && this.internalFileCache[fileId]) {
      const newValue: PropertyDefinitionSupportedFilesType = currentValue !== null ?
        [...currentValue] : [];

      const fileCacheValue = this.internalFileCache[fileId];
      // we need to recover the blob url because it has been cleaned up
      // when it was deemed unnecessary
      if (fileCacheValue.src) {
        newValue.push(PropertyDefinition.createFileForProperty(
          fileCacheValue.id,
          fileCacheValue.name,
          fileCacheValue.metadata,
          fileCacheValue.src as any,
        ));
      } else {
        newValue.push(fileCacheValue);
      }

      // if (!this.activeDataURIs[fileId]) {
      //   (async () => {
      //     if (fileCacheValue.url.startsWith("blob:")) {
      //       this.activeDataURIs[fileId] = fileCacheValue.src ?
      //         await this.readBlobAsDataUrl(fileCacheValue.src as any) :
      //         await this.readUrlAsDataUrl(fileCacheValue.url);
      //     }
      //   })();
      // }

      relatedProperty.setCurrentValue(this.props.forId || null, this.props.forVersion || null, newValue, null);
      this.props.itemDefinition.triggerListeners("change", this.props.forId || null, this.props.forVersion || null);
    }
  }

  /**
   * Function that triggers once a file has been requested to be removed
   * it remains however in the cache itself
   * @param fileId the file id
   */
  public onRemoveFile(fileId: string) {
    const relatedPropertyName = this.props.property.getConfigValue("mediaProperty") as string;
    const relatedProperty = this.props.itemDefinition.getPropertyDefinitionFor(relatedPropertyName, true);
    const currentValue =
      relatedProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

    // dlete this.activeDataURIs[fileId];

    // delete files but we don't get rid off them from the cache
    if (currentValue && currentValue.find(v => v.id === fileId)) {
      const newValue: PropertyDefinitionSupportedFilesType = currentValue.filter((f) => f.id !== fileId);

      relatedProperty.setCurrentValue(this.props.forId || null, this.props.forVersion || null, newValue.length === 0 ? null : newValue, null);
      this.props.itemDefinition.triggerListeners("change", this.props.forId || null, this.props.forVersion || null);
    }
  }

  public onCheckFileExists(fileId: string) {
    return this.onRetrieveFile(fileId) !== null;
  }

  public onRetrieveFile(fileId: string) {
    const currentValue =
      this.cachedMediaProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

    const value = currentValue && currentValue.find((v) => v.id === fileId);

    if (value) {
      const domain = process.env.NODE_ENV === "production" ? this.props.config.productionHostname : this.props.config.developmentHostname;
      return fileURLAbsoluter(
        domain,
        this.props.config.defaultCluster,
        this.props.config.allClusters,
        value,
        this.props.itemDefinition,
        this.props.forId,
        this.props.forVersion,
        this.props.include,
        this.cachedMediaProperty,
        this.props.cacheFiles,
      );
    }

    return value;
  }

  public onRetrieveImage(fileId: string): { file: IPropertyDefinitionSupportedSingleFilesType, srcset: string } {
    const value = this.onRetrieveFile(fileId);

    if (!value) {
      return null;
    }

    const srcset = imageSrcSetRetriever(
      value,
      this.cachedMediaProperty,
    );

    return ({ file: value, srcset });
  }

  // public onRetrieveDataURI(fileId: string) {
  //   return this.activeDataURIs[fileId] || null;
  // }

  /**
   * Inserts an image but instead of using a file as a source it uses
   * an url, note that this will read and append the file from there
   * @param url 
   * @param name
   * @param isExpectingImage 
   */
  public async onInsertFileFromURL(
    url: string,
    name: string,
    isExpectingImage?: boolean,
  ): Promise<IInsertedFileInformationType> {
    let blob: any;
    try {
      const fileData = await fetch(url);
      blob = await fileData.blob();

      // we are going to use a trick, we could use the File constructor
      // but there were a lot of complains regarding the constructor on stackoverflow
      // while as a matter of fact the src allows for blobs so
      blob.name = name;
    } catch (err) {
      // failed to fetch
      return null;
    }

    // there, it will work
    // now this is a funny thing since the data uri might
    // be a remote URL as well, depends on what we used to load
    // from
    return this.onInsertFile(blob, isExpectingImage);
  }

  public async readBlobAsDataUrl(blob: Blob): Promise<string> {
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    return new Promise<string>((resolve) => {
      reader.onabort = () => {
        resolve(null);
      }
      reader.onerror = () => {
        resolve(null);
      }
      reader.onloadend = () => {
        resolve(reader.result as string);
      }
    });
  }

  public async readUrlAsDataUrl(url: string): Promise<string> {
    try {
      const blob = await (await fetch(url)).blob();
      return this.readBlobAsDataUrl(blob);
    } catch {
      return null;
    }
  }

  /**
   * Inserts a file in the media property
   * @param file the file to insert
   * @param isExpectingImage whether the errors and check given will be for image types
   */
  public async onInsertFile(
    file: File,
    isExpectingImage?: boolean,
  ): Promise<IInsertedFileInformationType> {
    // So now if we are expecting image we check against images
    if (isExpectingImage && !checkFileInAccepts(file.type, this.cachedMediaPropertyAcceptsImages)) {
      this.setState({
        lastLoadedFileError: "image_uploader_invalid_type",
      });
      return null;

      // otherwise in the generic files
    } else if (!isExpectingImage && !checkFileInAccepts(file.type, this.cachedMediaPropertyAcceptsFiles)) {
      this.setState({
        lastLoadedFileError: "file_uploader_invalid_type",
      });
      return null;
    }

    // and for the file size
    if (file.size > MAX_FILE_SIZE) {
      this.setState({
        lastLoadedFileError: isExpectingImage ? "image_uploader_file_too_big" : "file_uploader_file_too_big",
      });
      return null;
    }
    // our random id for the file
    const id = "FILE" + uuid.v4().replace(/-/g, "");

    // and this is our file, no metadata yet
    const addedFile: IPropertyDefinitionSupportedSingleFilesType = PropertyDefinition.createFileForProperty(
      id,
      file.name,
      null,
      file,
    );

    // this is the default final value
    let finalValue: IInsertedFileInformationType = {
      result: addedFile,
      width: null,
      height: null,
      isImage: false,
    };

    // however if we are expecting images or the file to add is an image,
    // we need the image metadata
    if (isExpectingImage || addedFile.type.startsWith("image")) {
      // the final value is now a new final value that comes from this logic
      finalValue = await new Promise<IInsertedFileInformationType>(async (resolve) => {
        // so we create an image
        const img = new Image();
        // on load
        img.onload = () => {
          // we build the metadata
          const dimensions: string = this.props.property.getConfigValue("dimensions") || "";
          const dimensionNames = dimensions.split(";").map((d) => d.trim().split(" ")[0]);
          addedFile.metadata = img.width + "x" + img.height + ";" + dimensionNames.join(",");

          // and resolve
          resolve({
            result: addedFile,
            width: img.width,
            height: img.height,
            isImage: true,
          });
        }
        img.onerror = () => {
          // on error we set the last loaded error
          this.setState({
            lastLoadedFileError: "image_uploader_invalid_type",
          });
          // revoke the url
          PropertyDefinition.revokeFileForProperty(addedFile);
          // and resolve to null
          resolve(null);
        }
        // and this is assigned the url of the image
        img.src = addedFile.url;
      });

      // if our final value is null
      if (finalValue === null) {
        // it's doomed
        return null;
      }
    }

    // now we get the current value of the media property
    const currentValue =
      this.cachedMediaProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType;

    // and add the new file
    const newValue: PropertyDefinitionSupportedFilesType = currentValue !== null ?
      [...currentValue] : [];
    newValue.push(addedFile);

    // add this to the cache
    this.internalFileCache[id] = addedFile;
    // we don't await for this, if it fails, it fails
    // (async () => {
    //   this.activeDataURIs[id] = overrideDataURI || (await this.readBlobAsDataUrl(file));
    // })();

    // and now we can set the value for the cached media property
    this.cachedMediaProperty.setCurrentValue(this.props.forId || null, this.props.forVersion || null, newValue, null);
    this.props.itemDefinition.triggerListeners("change", this.props.forId || null, this.props.forVersion || null);

    // the chicken is done
    return finalValue;
  }

  public shouldComponentUpdate(
    nextProps: IPropertyEntryHandlerProps<IPropertyDefinitionSupportedTextType, IPropertyEntryTextRendererProps>,
    nextState: IPropertyEntryTextState,
  ) {
    if (nextProps.property !== this.props.property) {
      this.cacheMediaPropertyInProps(nextProps);
    }
    // This is optimized to only update for the thing it uses
    return nextProps.property !== this.props.property ||
      !equals(this.state, nextState, { strict: true }) ||
      !equals(this.props.state, nextProps.state, { strict: true }) ||
      !!this.props.poked !== !!nextProps.poked ||
      !!this.props.rtl !== !!nextProps.rtl ||
      this.props.forId !== nextProps.forId ||
      this.props.forVersion !== nextProps.forVersion ||
      this.props.forceInvalid !== nextProps.forceInvalid ||
      this.props.altDescription !== nextProps.altDescription ||
      this.props.altPlaceholder !== nextProps.altPlaceholder ||
      this.props.altLabel !== nextProps.altLabel ||
      this.props.hideLabel !== nextProps.hideLabel ||
      this.props.hidePlaceholder !== nextProps.hidePlaceholder ||
      !!this.props.ignoreErrors !== !!nextProps.ignoreErrors ||
      this.props.useAppliedValue !== nextProps.useAppliedValue ||
      nextProps.language !== this.props.language ||
      nextProps.languageOverride !== this.props.languageOverride ||
      nextProps.i18n !== this.props.i18n ||
      nextProps.renderer !== this.props.renderer ||
      !deepRendererArgsComparer(this.props.rendererArgs, nextProps.rendererArgs);
  }

  public render() {
    const i18nData = this.props.property.getI18nDataFor(this.props.language);
    const i18nLabel = this.props.hideLabel ? null : (typeof this.props.altLabel !== "undefined" ? this.props.altLabel : (i18nData && i18nData.label));
    const i18nDescription = this.props.hideDescription ? null : (typeof this.props.altDescription !== "undefined" ? this.props.altDescription : (i18nData && i18nData.description));
    const i18nPlaceholder = this.props.hidePlaceholder ? null : (this.props.altPlaceholder || (i18nData && i18nData.placeholder));

    // get the invalid reason if any
    const isRichText = this.props.property.isRichText();

    const mediaPropertyId = this.props.property.getConfigValue("mediaProperty") as string;
    const supportsMedia = !!mediaPropertyId && isRichText;
    const i18nInLanguage = this.props.i18n[this.props.language];

    let features: IFeatureSupportOptions = null;
    if (isRichText) {
      const supportsVideos = isRichText && !!this.props.property.getConfigValue("supportsVideos");
      const supportsImages = supportsMedia && !!this.props.property.getConfigValue("supportsImages");
      const supportsFiles = supportsMedia && !!this.props.property.getConfigValue("supportsFiles");
      const supportsContainers = this.props.property.getConfigValue("supportsContainers");
      const supportedContainers = this.props.property.getConfigValue("supportedContainers");
      const supportsTables = this.props.property.getConfigValue("supportsTables");
      const supportedTables = this.props.property.getConfigValue("supportedTables");
      const supportsLists = this.props.property.getConfigValue("supportsLists");
      const supportsCustom = this.props.property.getConfigValue("supportsCustom");
      const supportedCustoms = this.props.property.getConfigValue("supportedCustoms");
      const supportsExternalLinks = this.props.property.getConfigValue("supportsExternalLinks");
      const supportsLinks = this.props.property.getConfigValue("supportsLinks");
      const supportsQuote = this.props.property.getConfigValue("supportsQuote");
      const supportsRichClasses = this.props.property.getConfigValue("supportsRichClasses");
      const supportedRichClasses = this.props.property.getConfigValue("supportedRichClasses");
      const supportsTitle = this.props.property.getConfigValue("supportsTitle");
      const supportsCustomStyles = this.props.property.getConfigValue("supportsCustomStyles");
      const supportsTemplating = this.props.property.getConfigValue("supportsTemplating");

      features = {
        supportsFiles,
        supportsImages,
        supportsFilesAccept: this.cachedMediaPropertyAcceptsFiles,
        supportsImagesAccept: this.cachedMediaPropertyAcceptsImages,
        supportsVideos,
        supportsLists,
        supportsContainers,
        supportsCustom,
        supportsExternalLinks,
        supportsLinks,
        supportsQuote,
        supportsRichClasses,
        supportsTitle,
        supportsCustomStyles,
        supportsTemplating,
        supportedRichClasses,
        supportedCustoms,
        supportedContainers,
        supportsTables,
        supportedTables,
      }
    }

    const currentValue = this.props.useAppliedValue ?
      this.props.state.stateAppliedValue as IPropertyDefinitionSupportedTextType :
      this.props.state.value as IPropertyDefinitionSupportedTextType;
    let currentValueText = (currentValue && currentValue.value) || null;
    const currentValueLang = (currentValue && currentValue.language) || null;
    // we only want to purify values that haven't been manually set by the user, other
    // than that we can trust the value, it'd be a waste
    if (isRichText && currentValue && !this.props.state.stateValueHasBeenManuallySet) {
      const currentFiles: PropertyDefinitionSupportedFilesType = this.cachedMediaProperty &&
        (
          this.props.useAppliedValue ?
            this.cachedMediaProperty.getAppliedValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType :
            this.cachedMediaProperty.getCurrentValue(this.props.forId || null, this.props.forVersion || null) as PropertyDefinitionSupportedFilesType
        );

      currentValueText = sanitize(
        {
          fileResolver: fileResolver.bind(
            null,
            this.props.config,
            currentFiles,
            this.props.itemDefinition,
            this.props.forId,
            this.props.forVersion || null,
            this.props.include,
            this.cachedMediaProperty,
            this.props.cacheFiles,
            false,
          ),
          imageFail: "/rest/resource/image-fail.svg",
        },
        features,
        currentValueText,
      );
    }

    let invalidReason = this.props.state.invalidReason;
    let invalidReasonIsMediaProperty = false;
    if (!invalidReason && supportsMedia) {
      const mediaPropertyState = this.cachedMediaProperty.getStateNoExternalChecking(
        this.props.forId || null, this.props.forVersion || null,
      );
      if (mediaPropertyState.invalidReason) {
        invalidReasonIsMediaProperty = true;
        invalidReason = mediaPropertyState.invalidReason;
      }
    }
    const isCurrentlyShownAsInvalid = !this.props.ignoreErrors &&
      (this.props.poked || (this.state.showUserSetErrors && this.props.state.userSet)) && invalidReason;
    let i18nInvalidReason = null;
    if (
      !invalidReasonIsMediaProperty && (isCurrentlyShownAsInvalid || this.props.forceInvalid) && i18nData &&
      i18nData.error && i18nData.error[invalidReason]
    ) {
      i18nInvalidReason = i18nData.error[invalidReason];
    } else if (
      invalidReasonIsMediaProperty && (isCurrentlyShownAsInvalid || this.props.forceInvalid) && i18nData &&
      i18nData.error && i18nData.error["MEDIA_PROPERTY_" + invalidReason]
    ) {
      i18nInvalidReason = i18nData.error["MEDIA_PROPERTY_" + invalidReason];
    }

    let lastLoadedFileError = this.state.lastLoadedFileError;
    if (lastLoadedFileError === "image_uploader_file_too_big" || lastLoadedFileError === "file_uploader_file_too_big") {
      lastLoadedFileError = localeReplacer(
        i18nInLanguage[lastLoadedFileError],
        prettyBytes(MAX_FILE_SIZE),
      );
    } else if (lastLoadedFileError) {
      lastLoadedFileError = i18nInLanguage[lastLoadedFileError];
    }

    const i18nRoot = this.props.i18n[this.props.language];

    const RendererElement = this.props.renderer;
    const rendererArgs: IPropertyEntryTextRendererProps = {
      propertyId: this.props.property.getId(),
      uniqueId: this.props.property.getUniqueIdentifier(this.props.forId, this.props.forVersion),

      args: this.props.rendererArgs || {},
      rtl: this.props.rtl,
      label: i18nLabel,
      placeholder: i18nPlaceholder,
      description: i18nDescription,
      language: this.props.language,
      languageOverride: this.props.languageOverride,

      currentAppliedValue: this.props.state.stateAppliedValue as IPropertyDefinitionSupportedTextType,
      currentValue,
      currentValid: this.props.useAppliedValue && !this.props.forceInvalid ? false : !isCurrentlyShownAsInvalid && !this.props.forceInvalid,
      currentInvalidReason: this.props.useAppliedValue ? null : i18nInvalidReason,
      currentInternalValue: this.props.useAppliedValue ? null : this.props.state.internalValue,
      canRestore: this.props.useAppliedValue ? false : canRestoreCalculator(this.props.state.value, this.props.state.stateAppliedValue),

      currentValueText,
      currentValueLang,

      disabled:
        typeof this.props.disabled !== "undefined" && this.props.disabled !== null ?
          this.props.disabled :
          (this.props.useAppliedValue || this.props.state.enforced),

      autoFocus: this.props.autoFocus || false,

      i18nRichInfo: isRichText ? {
        formatBoldLabel: i18nInLanguage.format_bold,
        formatItalicLabel: i18nInLanguage.format_italic,
        formatUnderlineLabel: i18nInLanguage.format_underline,
        formatTitleLabel: i18nInLanguage.format_title,
        formatLinkLabel: i18nInLanguage.format_link,
        formatQuoteLabel: i18nInLanguage.format_quote,
        formatListNumberedLabel: i18nInLanguage.format_list_numbered,
        formatListBulletedLabel: i18nInLanguage.format_list_bulleted,
        formatAddImageLabel: i18nInLanguage.format_add_image,
        formatAddVideoLabel: i18nInLanguage.format_add_video,
        formatAddFileLabel: i18nInLanguage.format_add_file,
        formatAddContainerLabel: i18nInLanguage.format_add_container,
        formatAddCustomLabel: i18nInLanguage.format_add_custom,
        formatMakeLoop: i18nInLanguage.format_make_loop,
        formatSetActiveStyleLabel: i18nInLanguage.format_set_active_style,
        formatSetClassLabel: i18nInLanguage.format_set_class,
        formatSetEventHandlers: i18nInLanguage.format_set_event_handlers,
        formatSetContext: i18nInLanguage.format_set_context,
        formatSetRenderCondition: i18nInLanguage.format_set_render_condition,
        formatSetHoverStyleLabel: i18nInLanguage.format_set_hover_style,
        formatSetStyleLabel: i18nInLanguage.format_set_style,
        formatSetUIHandlerArgLabel: i18nInLanguage.format_set_ui_handler_arg,
        formatSetUIHandlerArgName: i18nInLanguage.format_set_ui_handler_arg_name,
        formatSetUIHandlerArgValue: i18nInLanguage.format_set_ui_handler_arg_value,
        formatSetUIHandlerLabel: i18nInLanguage.format_set_ui_handler,
        formatAddTemplateHTML: i18nInLanguage.format_add_template_html,
        formatAddTemplateText: i18nInLanguage.format_add_template_text,
        formatDeleteElement: i18nInLanguage.format_delete_element,
        formatMore: i18nInLanguage.format_more,
        formatAddTableLabel: i18nInLanguage.format_add_table,
        formatAddTbodyLabel: i18nInLanguage.format_add_tbody,
        formatAddTfootLabel: i18nInLanguage.format_add_tfoot,
        formatAddTdLabel: i18nInLanguage.format_add_td,
        formatAddTrLabel: i18nInLanguage.format_add_tr,
        formatAddThLabel: i18nInLanguage.format_add_th,
        formatAddTheadLabel: i18nInLanguage.format_add_thead,
        formatDelTrLabel: i18nInLanguage.format_del_tr,
        formatDelThLabel: i18nInLanguage.format_del_th,
        formatDelTdLabel: i18nInLanguage.format_del_td,

        name: i18nInLanguage.rich_name,
        alt: i18nInLanguage.rich_alt,
        sizes: i18nInLanguage.rich_sizes,
        container: i18nInLanguage.rich_container,
        inline: i18nInLanguage.rich_inline,
        text: i18nInLanguage.rich_text,
        custom: i18nInLanguage.rich_custom,
        file: i18nInLanguage.rich_file,
        image: i18nInLanguage.rich_image,
        link: i18nInLanguage.rich_link,
        list: i18nInLanguage.rich_list,
        listItem: i18nInLanguage.rich_list_item,
        paragraph: i18nInLanguage.rich_paragraph,
        quote: i18nInLanguage.rich_quote,
        title: i18nInLanguage.rich_title,
        video: i18nInLanguage.rich_video,
        styled: i18nInLanguage.rich_styled_component,
        template: i18nInLanguage.rich_template_component,
        interactive: i18nInLanguage.rich_interactive_component,
        style: i18nInLanguage.rich_style,
        styleActive: i18nInLanguage.rich_style_active,
        styleHover: i18nInLanguage.rich_style_hover,
        classes: i18nInLanguage.rich_classes,
        settings: i18nInLanguage.rich_settings,
        styles: i18nInLanguage.rich_styles,
        templating: i18nInLanguage.rich_templating,
        actions: i18nInLanguage.rich_actions,
        each: i18nInLanguage.rich_each,
        context: i18nInLanguage.rich_context,
        renderCondition: i18nInLanguage.rich_render_condition,
        uiHandler: i18nInLanguage.rich_ui_handler,
        type: i18nInLanguage.rich_type,
        standalone: i18nInLanguage.rich_standalone,
        table: i18nInLanguage.rich_table,
        thead: i18nInLanguage.rich_thead,
        tbody: i18nInLanguage.rich_tbody,
        tfoot: i18nInLanguage.rich_tfoot,
        tr: i18nInLanguage.rich_tr,
        td: i18nInLanguage.rich_td,
        th: i18nInLanguage.rich_th,

        loadVideo: {
          title: i18nInLanguage.video_loader_title,
          label: i18nInLanguage.video_loader_label,
          placeholder: i18nInLanguage.video_loader_placeholder,
          invalid: i18nInLanguage.video_loader_invalid,
          submit: i18nInLanguage.video_loader_submit,
        },

        setLink: {
          title: i18nInLanguage.link_setter_title,
          label: i18nInLanguage.link_setter_label,
          placeholder: i18nInLanguage.link_setter_placeholder,
          placeholderLocalOnly: i18nInLanguage.link_setter_placeholder_local_only,
          templated: i18nInLanguage.link_setter_templated,
          templatedLabel: i18nInLanguage.link_setter_templated_label,
          templatedPlaceholder: i18nInLanguage.link_setter_templated_placeholder,
          templatedUnspecified: i18nInLanguage.link_setter_templated_unspecified,
          invalid: i18nInLanguage.link_setter_invalid,
          submit: i18nInLanguage.link_setter_submit,
        },

        addTemplateText: {
          title: i18nInLanguage.add_template_text_title,
          label: i18nInLanguage.add_template_text_label,
          placeholder: i18nInLanguage.add_template_text_placeholder,
          submit: i18nInLanguage.add_template_text_submit,
        },

        addTemplateHTML: {
          title: i18nInLanguage.add_template_html_title,
          label: i18nInLanguage.add_template_html_label,
          placeholder: i18nInLanguage.add_template_html_placeholder,
          submit: i18nInLanguage.add_template_html_submit,
        },

        richUIHandlerElement: i18nRoot.rich_ui_handler_element || {},
        richClasses: i18nRoot.rich_classes || {},
        richContainers: i18nRoot.rich_containers || {},
        richCustoms: i18nRoot.rich_customs || {},
        richTables: i18nRoot.rich_tables || {},

        genericError: i18nInLanguage.generic_error,
        ok: i18nInLanguage.ok,
      } : null,

      features,
      isRichText,

      lastLoadedFileError: this.props.useAppliedValue ? null : lastLoadedFileError,
      dismissLastLoadedFileError: this.dismissLastLoadedFileError,

      onChange: supportsMedia ? this.onChangeHijacked : this.props.onChange,
      onRestore: supportsMedia ? this.onRestoreHijacked : this.props.onRestore,

      onInsertFile: this.onInsertFile,
      onInsertFileFromURL: this.onInsertFileFromURL,
      onCheckFileExists: this.onCheckFileExists,
      onRetrieveFile: this.onRetrieveFile,
      onRetrieveImage: this.onRetrieveImage,
      // onRetrieveDataURI: this.onRetrieveDataURI,

      enableUserSetErrors: this.enableUserSetErrors,
    };

    return <RendererElement {...rendererArgs} />
  }
}
