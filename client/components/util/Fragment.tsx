/**
* Utilities for editing page elements
* 
* @module
*/

import View from "../../components/property/View";
import Entry from "../../components/property/Entry";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useUserDataRetriever } from "../../components/user/UserDataRetriever";
import { useSubmitActioner } from "../../components/item/SubmitActioner";
import { useIdVersionRetriever } from "../../components/item/IdVersionRetriever";
import { IActionSubmitOptions, IActionSubmitResponse } from "../../providers/item";
import { useItemLoader } from "../../components/item/ItemLoader";
import { IPropertyEntryProps, IPropertyViewProps } from "../property/base";
import { IPropertyViewRendererProps } from "../../internal/components/PropertyView";
import { PropertyDefinitionSupportedType } from "../../../base/Root/Module/ItemDefinition/PropertyDefinition/types";
import { IPropertyEntryRendererProps } from "../../internal/components/PropertyEntry";
import type { EndpointErrorType } from "../../../base/errors";
import { SearchVariants } from "../../../constants";

/**
 * Argument that the fragment provides
 */
export interface IFragmentArg {
  /**
   * Whether it is currently editing
   */
  editing: boolean;
  /**
   * Whether it is allowed to edit based on its role
   */
  canEdit: boolean;
  /**
   * download the current fragment state
   */
  download: () => void;
  /**
   * the nodes for the properties of the fragment
   */
  properties: {
    [id: string]: React.ReactNode,
  },
  /**
   * upload the file
   */
  upload: () => void;
  /**
   * save the current state
   */
  save: () => void;
  saveError: EndpointErrorType;
  saved: boolean;
  dismissSaved: () => void;
  dismissSaveError: () => void;
}

/**
* the props for the item definition loader
*/
export interface IFragmentProps {
  /**
   * Whether it is editing or not
   */
  editing: boolean;

  /**
   * The roles that are allowed to edit
   */
  roles: string[];

  /**
   * The version that we are attempting to set with our edit action
   */
  version: string;

  /**
   * The fragment properties we are currently
   * dealing with
   */
  properties: string[];

  /**
   * The function that triggers when no unversioned value is found for the fragment
   * and it's attempting to submit for that
   */
  onBeforeSubmitUnversioned?: (options: IActionSubmitOptions) => IActionSubmitOptions;

  /**
   * For the submit of the specific fragment to be added or edited
   */
  onBeforeSubmit?: (action: "add" | "edit", options: IActionSubmitOptions) => IActionSubmitOptions;

  /**
   * Whenever edit is triggered
   */
  onEdit: () => void;

  /**
   * Whenever stopping editing
   */
  onCloseEdit: () => void;

  /**
   * Whenever submit is done
   */
  onSubmitUnversioned?: (d: IActionSubmitResponse) => void;

  /**
   * Whenever submit is done
   */
  onSubmit?: (d: IActionSubmitResponse) => void;

  /**
   * hide description
   */
  viewProps?: {
    [id: string]: Partial<IPropertyViewProps<IPropertyViewRendererProps<PropertyDefinitionSupportedType>, string, SearchVariants>>,
  };

  /**
   * hide label
   */
  entryProps?: {
    [id: string]: Partial<IPropertyEntryProps<IPropertyEntryRendererProps<PropertyDefinitionSupportedType>, string, SearchVariants>>,
  };

  /**
   * the properties that are extra downloaded when the download
   * button is pressed
   */
  downloadExtraProperties?: string[];

  /**
   * the properties that are extra uploaded when the upload button
   * is used against a file
   */
  uploadExtraProperties?: string[];

  /**
   * the name of the file to be downloaded, without the .itmz extension
   */
  downloadName?: string;

  /**
   * the children for the framgent
   * @param arg The fragment argument
   * @returns what to render
   */
  children?: (arg: IFragmentArg) => React.ReactNode;

  /**
   * Whether it is disabled and editing is disabled
   */
  disabled?: boolean;
}

/**
* The fragment element allows to create editable bits and pieces from the page
* these are called content fragments and are used to make the page itself editable
* and contain properties that are used to define the content
*/
export default function Fragment(props: IFragmentProps) {
  const fileRef = React.useRef<HTMLInputElement>();
  const itemLoader = useItemLoader();
  const submitActioner = useSubmitActioner();

  const userData = useUserDataRetriever();

  const upload = useCallback(() => {
    fileRef.current.click();
  }, [fileRef]);

  const onFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    e.target.value = "";

    await itemLoader.loadStateFromFile(
      file,
      props.uploadExtraProperties ? props.properties.concat(props.uploadExtraProperties) : props.properties,
    );

    props.onEdit();
  }, [props.onEdit, props.uploadExtraProperties, props.properties, itemLoader.loadStateFromFile]);

  const download = useCallback(async () => {
    const blob = await itemLoader.downloadState(
      props.downloadExtraProperties ? props.properties.concat(props.downloadExtraProperties) : props.properties
    );
    const a = document.createElement("a");
    a.style.display = "none";
    a.setAttribute("download", props.downloadName ? (props.downloadName + ".itmz") : "fragment.itmz");

    const url = URL.createObjectURL(blob);

    a.href = url;
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    // enough time for it to download
    // the blob should be cleaned out from memory afterwards this
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }, [props.downloadExtraProperties, props.properties, itemLoader.downloadState]);

  const inputElement = useMemo(() => {
    return (<input type="file" ref={fileRef} onChange={onFileChange} style={{ display: "none" }} accept=".itmz" />);
  }, [onFileChange]);

  const idVersion = useIdVersionRetriever();

  const save = useCallback(async () => {
    // this means that it loaded an unversioned fallback so we need to add
    // also we would add if the original itself is not found
    const action = idVersion.version !== props.version || itemLoader.notFound ? "add" : "edit";

    if (itemLoader.notFound) {
      let unversionedOptions: IActionSubmitOptions = {
        action: "add",
        properties: props.properties,
        submitForId: idVersion.id,
        submitForVersion: null,
      };

      if (props.onBeforeSubmitUnversioned) {
        const newUnversionedOptions = props.onBeforeSubmitUnversioned(unversionedOptions);
        if (newUnversionedOptions) {
          unversionedOptions = newUnversionedOptions;
        }
      }

      const effect = await submitActioner.submit(unversionedOptions);
      props.onSubmitUnversioned && props.onSubmitUnversioned(effect);

      if (effect.error) {
        return;
      }
    }

    let options: IActionSubmitOptions = {
      action,
      properties: props.properties,
      submitForId: idVersion.id,
      submitForVersion: props.version,
      languageOverride: idVersion.version,
    };

    if (props.onBeforeSubmit) {
      const newOptions = props.onBeforeSubmit(action, options);
      if (newOptions) {
        options = newOptions;
      }
    }

    const effect = await submitActioner.submit(options);
    props.onSubmit && props.onSubmit(effect);
    props.onCloseEdit();
  }, [
    idVersion,
    props.version,
    props.properties,
    props.onBeforeSubmit,
    props.onBeforeSubmitUnversioned,
    submitActioner,
    itemLoader.notFound,
  ]);

  const properties: { [id: string]: React.ReactNode } = {};

  props.properties.forEach((p) => {
    properties[p] = props.editing ? (
      <Entry
        id={p}
        {...(props.entryProps && props.entryProps[p] ? props.entryProps[p] : {})}
      />
    ) : (
      <View
        id={p}
        useAppliedValue={true}
        {...(props.viewProps && props.viewProps[p] ? props.viewProps[p] : {})}
      />
    )
  });

  return (
    <>
      {
        props.children({
          canEdit: !props.disabled && props.roles.includes(userData.role),
          dismissSaved: submitActioner.dismissSubmitted,
          dismissSaveError: submitActioner.dismissError,
          download,
          editing: props.editing,
          properties: properties,
          save,
          saved: submitActioner.submitted,
          saveError: submitActioner.submitError,
          upload,
        })
      }
      {inputElement}
    </>
  );
};
