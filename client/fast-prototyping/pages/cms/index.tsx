import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";
import { SlowLoadingElement } from "../../components/util";
import { Paper, createStyles, withStyles, WithStyles, Container, TextField, Box, Typography } from "@material-ui/core";
import I18nRead from "../../../components/localization/I18nRead";
import TitleSetter from "../../../components/util/TitleSetter";
import Entry from "../../../components/property/Entry";
import View from "../../../components/property/View";
import LocationStateReader from "../../../components/navigation/LocationStateReader";
import { SubmitButton } from "../../components/buttons";
import I18nReadMany from "../../../components/localization/I18nReadMany";
import { Alert, AlertTitle } from "@material-ui/lab";
import Snackbar from "../../components/snackbar";
import SubmitActioner from "../../../components/item-definition/SubmitActioner";

const cmsStyles = createStyles({
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

export const CMS = withStyles(cmsStyles)((props: WithStyles<typeof cmsStyles>) => {
  return (
    <SlowLoadingElement id="cms">
      <ModuleProvider module="cms">
        <I18nRead id="name" capitalize={true}>
          {(i18nCMS: string) => {
            return (
              <TitleSetter>
                {i18nCMS}
              </TitleSetter>
            );
          }}
        </I18nRead>
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
                <Container maxWidth="md" className={props.classes.container}>
                  <Paper className={props.classes.paper}>

                    <I18nReadMany
                      data={[
                        {id: "id", capitalize: true},
                        {id: "version", capitalize: true},
                        {id: "generic_warning", capitalize: true},
                        {id: "warning"}
                      ]}
                    >
                      {(i18nId: string, i18nVersion: string, i18nGenericWarning: string, i18nWarning: string) => (
                        <>
                          <Alert severity="error">
                            <AlertTitle>
                              {i18nGenericWarning}
                            </AlertTitle>
                            {i18nWarning}
                          </Alert>
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
                        </>
                      )}
                    </I18nReadMany>

                    <Entry id="title" />
                    <Entry id="content" />

                    <SubmitButton
                      i18nId="submit"
                      options={{
                        properties: [
                          "title",
                          "content",
                          "attachments",
                        ],
                      }}
                    />

                  </Paper>
                  
                  <Paper className={props.classes.paper2}>
                    <ItemDefinitionLoader>
                      <Typography variant="h4"><View id="title"/></Typography>
                    </ItemDefinitionLoader>
                  </Paper>

                </Container>

                <SubmitActioner>
                  {(actioner) => (
                    <>
                      <Snackbar
                        severity="error"
                        i18nDisplay={actioner.submitError}
                        open={!!actioner.submitError}
                        onClose={actioner.dismissError}
                      />
                      <Snackbar
                        severity="success"
                        i18nDisplay="fragment_success"
                        open={actioner.submitted}
                        onClose={actioner.dismissSubmitted}
                      />
                    </>
                  )}
                </SubmitActioner>
                
              </ItemDefinitionProvider>)
          }}
        </LocationStateReader>
      </ModuleProvider>
    </SlowLoadingElement>
  );
});