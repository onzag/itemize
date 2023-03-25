/**
 * Utilities for loading fragments
 * TODO
 * 
 * @module
 */

import View from "../../components/property/View";
import Entry from "../../components/property/Entry";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import UserDataRetriever from "../../components/user/UserDataRetriever";
import SubmitActioner from "../../components/item/SubmitActioner";
import Snackbar from "../components/snackbar";
import ReactDOM from "react-dom";
import IdVersionRetriever from "../../components/item/IdVersionRetriever";
import { IActionSubmitOptions, IActionSubmitResponse } from "../../providers/item";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import UploadIcon from "@mui/icons-material/Upload";
import { styled, SxProps, Theme } from '@mui/material/styles';
import ItemLoader from "../../components/item/ItemLoader";
import { ItemLoader as FItemLoader } from "../components/item-loader";
import Box from "@mui/material/Box";
import Fragment, { IFragmentProps } from "../../components/util/Fragment";

/**
 * The item definition loader styles
 */
const fragmentLoaderStyles = {
  buttonEditGroup: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    border: "solid 1px #ccc",
    padding: "1rem",
  },
  buttonApproveRejectGroup: {
    position: "fixed",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
    border: "solid 1px #ccc",
    padding: "1rem",
  },
};

/**
 * the props for the item definition loader
 */
interface IFragmentLoaderProps extends Omit<IFragmentProps, 'children'>  {
  /**
   * Removes both container and button from the fragment loader
   * in this case whether the fragment loader is editing should be controlled
   */
  noButtons?: boolean;
  /**
   * Disables the item loader from being used in the view mode
   */
  noItemLoader?: boolean;
  /**
   * sx props for the container
   */
  sx?: SxProps<Theme>;
  /**
   * whether to use full width in our fragment
   */
  fullWidth?: boolean;

  /**
   * An alternative for the edit button
   * that is used to place the loader in edit mode
   */
  EditButton?: React.ComponentType<{ onClick: () => void }>;
  /**
   * An alternative for the download button
   */
  DownloadButton?: React.ComponentType<{ onClick: () => void }>;
  /**
   * An alternative for the edit button container when on edit mode
   */
  EditButtonContainer?: React.ComponentType<{ isEditing: boolean, children: React.ReactNode }>;
  /**
   * An alternative for the save icon button
   */
  SaveButton?: React.ComponentType<{ onClick: () => void }>;
  /**
   * An alternative for the close icon button
   */
  CloseButton?: React.ComponentType<{ onClick: () => void }>;
  /**
   * An alternative for the upload icon button
   */
  UploadButton?: React.ComponentType<{ onClick: () => void }>;
  /**
   * The children that should be rendered
   * */
  children: (properties: {[id: string]: React.ReactNode}) => React.ReactNode;
}

function EditButtonContainerDefault(props: { isEditing: boolean, children: React.ReactNode }) {
  const element = (
    <Box sx={props.isEditing ? fragmentLoaderStyles.buttonApproveRejectGroup : fragmentLoaderStyles.buttonEditGroup}>
      {props.children}
    </Box>
  );

  if (props.isEditing) {
    return ReactDOM.createPortal(element, document.body);
  }

  return element;
}

interface IContainer {
  fullWidth?: boolean,
}

const Container = styled("div", {
  shouldForwardProp: (prop) => prop !== "fullWidth" && prop !== "sx"
})<IContainer>(({ fullWidth }) => ({
  position: "relative",
  width: fullWidth ? "100%" : "auto",
}));

/**
 * The item definition loader allows to handle cases of not found, blocked or errors in a nice way
 * @param props the loader props
 * @returns a react component
 */
export function FragmentLoader(props: IFragmentLoaderProps) {
  const ButtonContainerToUse = props.EditButtonContainer || EditButtonContainerDefault;

  return (
    <Fragment
      {...props}
    >
      {(arg) => {
        let buttonsToUse: React.ReactNode = null;

        if (!arg.editing && !props.noButtons) {
          buttonsToUse = (
            arg.canEdit ? <ButtonContainerToUse isEditing={arg.editing}>
              {props.EditButton ? <props.EditButton onClick={props.onEdit} /> : <IconButton
                onClick={props.onEdit}
                size="large">
                <EditIcon />
              </IconButton>}
              {props.DownloadButton ? <props.DownloadButton onClick={arg.download} /> : <IconButton size="large" onClick={arg.download}>
                <DownloadIcon />
              </IconButton>}
              {props.UploadButton ? <props.UploadButton onClick={arg.upload} /> : <IconButton onClick={arg.upload} size="large">
                <UploadIcon />
              </IconButton>}
            </ButtonContainerToUse> : null
          );
        } else if (!props.noButtons) {
          buttonsToUse = (
            <ButtonContainerToUse isEditing={arg.editing}>
              {props.SaveButton ? <props.SaveButton onClick={arg.save} /> : <IconButton onClick={arg.save} color="primary" size="large">
                <SaveIcon />
              </IconButton>}
              <Snackbar
                id="fragment-edit-error"
                severity="error"
                i18nDisplay={arg.saveError}
                open={!!arg.saveError}
                onClose={arg.dismissSaveError}
              />
              {props.CloseButton ? <props.CloseButton onClick={props.onCloseEdit} /> :
                <IconButton onClick={props.onCloseEdit} color="secondary" size="large">
                  <CloseIcon />
                </IconButton>}
            </ButtonContainerToUse>
          );
        }

        const internalNode = props.children(arg.properties);

        const internals = (
          !props.editing ?
            (props.noItemLoader ? internalNode : <FItemLoader>
              {internalNode}
            </FItemLoader>) : internalNode
        );

        if (props.noButtons) {
          return internals;
        }

        return (
          <Container fullWidth={props.fullWidth} sx={props.sx}>
            {internals}
            {buttonsToUse}
          </Container>
        );
      }}
    </Fragment>
  )
};
