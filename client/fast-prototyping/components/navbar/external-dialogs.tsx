/**
 * Contains an external dialog that are usually referred errors and messages
 * 
 * @module
 */

import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import { DialogResponsive } from "../dialog";
import LocationStateReader from "../../../components/navigation/LocationStateReader";
import I18nReadMany from "../../../components/localization/I18nReadMany";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

/**
 * The external dialog style creator
 * @returns a bunch of styles
 */
const externalDialogsStyle = {
  needsUpdateContent: {
    padding: "1rem 0.5rem",
  },
};

/**
 * The external dialogs component, given a
 * err, msg, and i18nMsgTitle in the query string, all as string will
 * display a dialog as long as they are there
 * @returns a react element
 */
export function ExternalDialogs() {
  return (
    <LocationStateReader
      stateIsInQueryString={true}
      defaultState={
        { err: null, msg: null, msgtitle: null } as
        { err: string, msg: string, msgtitle: string }
      }
    >
      {(state, setLocationState) => {
        const clear = () => {
          setLocationState({ err: null, msg: null, msgtitle: null }, true)
        }

        const title = state.err ? "generic_error" : state.msgtitle;
        if (!title) {
          return null;
        }
        const description = state.err ? `error.${state.err}` : state.msg;

        return <React.Fragment>
          <I18nReadMany data={[
            { i18nId: title, capitalize: true },
            { i18nId: description, capitalize: true },
            { i18nId: "ok", capitalize: true }
          ]}>
            {(i18nTitle, i18nDescription, ok) => {
              return (
                <DialogResponsive
                  title={i18nTitle}
                  open={!!title}
                  onClose={clear}
                  buttons={
                    <Button
                      color="primary"
                      startIcon={<DoneIcon />}
                      onClick={clear}
                    >
                      {ok}
                    </Button>
                  }
                >
                  <Typography variant="body1" sx={externalDialogsStyle.needsUpdateContent}>
                    {i18nDescription}
                  </Typography>
                </DialogResponsive>
              )
            }}
          </I18nReadMany>
        </React.Fragment>
      }}
    </LocationStateReader>
  )
};