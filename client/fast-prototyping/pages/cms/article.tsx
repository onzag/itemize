import React from "react";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";
import { SlowLoadingElement } from "../../components/util";
import { Paper, createStyles, withStyles, WithStyles, Container, TextField, Box, Typography, Button } from "@material-ui/core";
import Entry from "../../../components/property/Entry";
import View from "../../../components/property/View";
import LocationStateReader from "../../../components/navigation/LocationStateReader";
import { SubmitButton } from "../../components/buttons";
import I18nReadMany from "../../../components/localization/I18nReadMany";
import Snackbar from "../../components/snackbar";
import SubmitActioner from "../../../components/item-definition/SubmitActioner";
import I18nRead from "../../../components/localization/I18nRead";

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
  articleContainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    position: "relative",
    width: "100%",
  },
  articleImageContainer: {
    position: "relative",
    width: "50%",
    paddingRight: "1rem",
  },
  articleImage: {
    width: "100%",
    borderRadius: 10,
  },
  articleText: {
    width: "50%",
    position: "relative",
  },
  articleSummary: {
    padding: "1rem 0",
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
                "summary_image",
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
                  <Entry id="summary_image" />

                  <SubmitButton
                    i18nId="submit"
                    options={{
                      properties: [
                        "title",
                        "content",
                        "attachments",
                        "locale",
                        "summary",
                        "summary_image",
                      ],
                    }}
                  />

                </Paper>

                <Paper className={props.classes.paper2}>
                  <ItemDefinitionLoader>
                    <div className={props.classes.articleContainer}>
                      <div className={props.classes.articleImageContainer}>
                        <View id="summary_image" rendererArgs={{imageClassName: props.classes.articleImage}}/>
                      </div>
                      <div className={props.classes.articleText}>
                        <Typography variant="h4"><View id="title" /></Typography>
                        <div className={props.classes.articleSummary}>
                          <View id="summary" />
                        </div>
                        <Button variant="outlined">
                          <I18nRead id="read_more"/>
                        </Button>
                      </div>
                    </div>
                  </ItemDefinitionLoader>
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