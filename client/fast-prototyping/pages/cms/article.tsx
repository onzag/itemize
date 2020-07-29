import React from "react";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";
import { Paper, createStyles, withStyles, WithStyles, Container, TextField, Box, Typography, Button } from "../../mui-core";
import Entry from "../../../components/property/Entry";
import View from "../../../components/property/View";
import LocationStateReader from "../../../components/navigation/LocationStateReader";
import { SubmitButton } from "../../components/buttons";
import I18nReadMany from "../../../components/localization/I18nReadMany";
import Snackbar from "../../components/snackbar";
import SubmitActioner from "../../../components/item-definition/SubmitActioner";
import I18nRead from "../../../components/localization/I18nRead";
import { articlesStyles } from "../frontpage/articles";

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

const SingleArticle = withStyles(articlesStyles)((props: WithStyles<typeof articlesStyles>) => {
  return <div className={props.classes.articleContainer}>
    <div className={props.classes.articleImageContainer}>
      <View
        id="summary_image"
        rendererArgs={{
          imageClassName: props.classes.articleImage,
          imageSizes: "300px",
          lazyLoad: true,
        }}
      />
    </div>
    <div className={props.classes.articleText}>
      <Typography variant="h4"><View id="title" /></Typography>
      <div className={props.classes.articleSummaryContainer}>
        <div className={props.classes.articleSummary}>
          <View id="summary" />
        </div>
      </div>
    </div>
  </div>
});

export const Article = withStyles(fragmentStyles)((props: WithStyles<typeof fragmentStyles>) => {
  return (
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
            <Container maxWidth="md" className={props.classes.container + " trusted"}>
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
                  supportsRawMode: true,
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
                  redirectOnSuccess={
                    (status) => `/cms/article?id=${status.id}`
                  }
                  redirectReplace={true}
                />

              </Paper>

              <Paper className={props.classes.paper2}>
                <ItemDefinitionLoader>
                  <SingleArticle />
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
                    id="submit-article-error"
                    severity="error"
                    i18nDisplay={actioner.submitError}
                    open={!!actioner.submitError}
                    onClose={actioner.dismissError}
                  />
                  <Snackbar
                    id="submit-article-success"
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