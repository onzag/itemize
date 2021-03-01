/**
 * Contains an external dialog that are usually referred errors and messages
 * 
 * @module
 */

import React from "react";
import { Button, Typography, WithStyles, createStyles, withStyles, DoneIcon } from "../../mui-core";
import { DialogResponsive } from "../dialog";
import LocationStateReader from "../../../components/navigation/LocationStateReader";
import I18nReadMany from "../../../components/localization/I18nReadMany";

/**
 * The external dialog style creator
 * @returns a bunch of styles
 */
const externalDialogsStyle = () => createStyles({
  needsUpdateContent: {
    padding: "1rem 0.5rem",
  },
});

/**
 * The external dialogs component, given a
 * err, msg, and msgTitle in the query string, all as string will
 * display a dialog as long as they are there
 * @returns a react element
 */
export const ExternalDialogs = withStyles(externalDialogsStyle)((props: WithStyles<typeof externalDialogsStyle>) => {
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
            { id: title, capitalize: true },
            { id: description, capitalize: true },
            { id: "ok", capitalize: true }
          ]}>
            {(i18nTitle: string, i18nDescription: string, ok: string) => {
              return (
                <DialogResponsive
                  title={i18nTitle}
                  open={!!title}
                  onClose={clear}
                  buttons={
                    <Button
                      color="primary"
                      aria-label={ok}
                      startIcon={<DoneIcon />}
                      onClick={clear}
                    >
                      {ok}
                    </Button>
                  }
                >
                  <Typography variant="body1" className={props.classes.needsUpdateContent}>
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
});