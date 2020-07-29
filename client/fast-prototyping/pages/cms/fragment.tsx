import React from "react";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";
import { Paper, createStyles, withStyles, WithStyles, Container, TextField, Box, Typography } from "../../mui-core";
import Entry from "../../../components/property/Entry";
import View from "../../../components/property/View";
import LocationStateReader from "../../../components/navigation/LocationStateReader";
import { SubmitButton } from "../../components/buttons";
import I18nReadMany from "../../../components/localization/I18nReadMany";
import Snackbar from "../../components/snackbar";
import SubmitActioner from "../../../components/item-definition/SubmitActioner";

const fragmentStyles = createStyles({
  paper: {
    padding: "1rem",
  },
  paper2: {
    padding: "1rem",
    marginTop: "1rem",
  },
  container: {
    paddingTop: "1rem",
  },
  box: {
    paddingBottom: "1rem",
  },
});

export const Fragment = withStyles(fragmentStyles)((props: WithStyles<typeof fragmentStyles>) => {
  return (
    <LocationStateReader defaultState={{ id: "", version: "" }} stateIsInQueryString={true}>
      {(locationState, setState) => {
        const updateLocationState = (which: string, e: React.ChangeEvent<HTMLInputElement>) => {
          setState({
            [which]: e.target.value,
          }, true);
        }
        return (
          <ItemDefinitionProvider
            itemDefinition="fragment"
            properties={[
              "title",
              "content",
              "attachments",
            ]}
            includePolicies={false}
            longTermCaching={false}
            forId={parseInt(locationState.id, 10) || null}
            forVersion={locationState.version || null}
          >
            <Container maxWidth="md" className={props.classes.container + " trusted"}>
              <Paper className={props.classes.paper}>

                <I18nReadMany
                  data={[
                    { id: "id", capitalize: true },
                    { id: "version", capitalize: true },
                  ]}
                >
                  {(i18nId: string, i18nVersion: string) => (
                    <Box className={props.classes.box}>
                      <TextField
                        fullWidth={true}
                        value={locationState.id}
                        type="number"
                        onChange={updateLocationState.bind(null, "id")}
                        placeholder={i18nId}
                      />
                      <TextField
                        fullWidth={true}
                        value={locationState.version}
                        onChange={updateLocationState.bind(null, "version")}
                        placeholder={i18nVersion}
                      />
                    </Box>
                  )}
                </I18nReadMany>

                <Entry id="title" />
                <Entry id="content" rendererArgs={{
                  requestAltOnImages: true,
                  supportsRawMode: true,
                }} />

                <SubmitButton
                  i18nId="submit"
                  options={{
                    properties: [
                      "title",
                      "content",
                      "attachments",
                    ],
                  }}
                  redirectOnSuccess={
                    (status) => `/cms/fragment?id=${status.id}&version=${locationState.version || ""}`
                  }
                  redirectReplace={true}
                />

              </Paper>

              <Paper className={props.classes.paper2}>
                <ItemDefinitionLoader>
                  <Typography variant="h4"><View id="title" /></Typography>
                  <View id="content" />
                </ItemDefinitionLoader>
              </Paper>

            </Container>

            <SubmitActioner>
              {(actioner) => (
                <>
                  <Snackbar
                    id="submit-fragment-error"
                    severity="error"
                    i18nDisplay={actioner.submitError}
                    open={!!actioner.submitError}
                    onClose={actioner.dismissError}
                  />
                  <Snackbar
                    id="submit-fragment-success"
                    severity="success"
                    i18nDisplay="success"
                    open={actioner.submitted}
                    onClose={actioner.dismissSubmitted}
                  />
                </>
              )}
            </SubmitActioner>

          </ItemDefinitionProvider>)
      }}
    </LocationStateReader>
  );
});