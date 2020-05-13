import React from "react";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";
import { SlowLoadingElement } from "../../components/util";
import { Paper, createStyles, withStyles, WithStyles, Container, TextField, Box, Typography } from "@material-ui/core";
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

export const Article = withStyles(fragmentStyles)((props: WithStyles<typeof fragmentStyles>) => {
  return (
    <SlowLoadingElement id="article">
      <LocationStateReader defaultState={{ id: "" }} stateIsInQueryString={true}>
        {(locationState, setState) => {
          const updateLocationId = (e: React.ChangeEvent<HTMLInputElement>) => {
            setState({
              id: e.target.value,
            }, true);
          }
          return (
            <ItemDefinitionProvider
              itemDefinition="article"
              properties={[
                "title",
                "content",
                "attachments",
                "locale",
                "summary",
              ]}
              includePolicies={false}
              longTermCaching={false}
              forId={parseInt(locationState.id, 10) || null}
            >
              <Container maxWidth="md" className={props.classes.container}>
                <Paper className={props.classes.paper}>

                  <I18nReadMany
                    data={[
                      { id: "id", capitalize: true },
                    ]}
                  >
                    {(i18nId: string) => (
                      <Box className={props.classes.box}>
                        <TextField
                          fullWidth={true}
                          value={locationState.id}
                          type="number"
                          onChange={updateLocationId}
                          placeholder={i18nId}
                        />
                      </Box>
                    )}
                  </I18nReadMany>

                  <Entry id="locale" />
                  <Entry id="title" />
                  <Entry id="content" rendererArgs={{
                    requestAltOnImages: true,
                  }} />
                  <Entry id="summary" />

                  <SubmitButton
                    i18nId="submit"
                    options={{
                      properties: [
                        "title",
                        "content",
                        "attachments",
                        "locale",
                        "summary",
                      ],
                    }}
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
                      severity="error"
                      i18nDisplay={actioner.submitError}
                      open={!!actioner.submitError}
                      onClose={actioner.dismissError}
                    />
                    <Snackbar
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
    </SlowLoadingElement>
  );
});