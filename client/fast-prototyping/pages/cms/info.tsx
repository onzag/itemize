/**
 * Contains the component that shows info for the cms and what it does
 * 
 * @packageDocumentation
 */

import React from "react";
import { Paper, createStyles, withStyles, WithStyles, Container, Typography, Alert, AlertTitle } from "../../mui-core";
import I18nReadMany from "../../../components/localization/I18nReadMany";

/**
 * The information styles
 */
const infoStyles = createStyles({
  paper: {
    padding: "1rem",
  },
  container: {
    paddingTop: "1rem",
  },
  infoText: {
    padding: "1rem 1rem 0 1rem",
  }
});

/**
 * The information component
 * @param props the information props
 * @returns a react element
 */
export const Info = withStyles(infoStyles)((props: WithStyles<typeof infoStyles>) => {
  return (
    <Container maxWidth="md" className={props.classes.container}>
      <Paper className={props.classes.paper}>
        <I18nReadMany
          data={[
            { id: "generic_warning", capitalize: true },
            { id: "warning" },
            { id: "info_content" },
            { id: "info_content_2" },
          ]}
        >
          {(i18nGenericWarning: string, i18nWarning: string, i18nInfoContent1: string, i18nInfoContent2: string) => (
            <>
              <Alert severity="error">
                <AlertTitle>
                  {i18nGenericWarning}
                </AlertTitle>
                {i18nWarning}
              </Alert>
              <Typography variant="body1" className={props.classes.infoText}>
                {i18nInfoContent1}
              </Typography>
              <Typography variant="body1" className={props.classes.infoText}>
                {i18nInfoContent2}
              </Typography>
            </>
          )}
        </I18nReadMany>
      </Paper>
    </Container>
  );
});
