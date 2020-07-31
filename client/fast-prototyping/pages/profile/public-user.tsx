/**
 * Contains the public user information section for the fast prototyping
 * public profile
 * 
 * @packageDocumentation
 */

import React from "react";
import { Container, createStyles, WithStyles, withStyles,
  Typography, Paper, Theme, Tooltip, Card, VerifiedUserIcon } from "../../mui-core";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";
import { Avatar } from "../../components/avatar";
import { countries } from "../../../../imported-resources";
import { AdminToolbox } from "./admin-toolbox";
import Reader from "../../../components/property/Reader";
import I18nRead from "../../../components/localization/I18nRead";
import View from "../../../components/property/View";
import UserDataRetriever from "../../../components/user/UserDataRetriever";

/**
 * contains the styles for the public user profile
 * @param theme the mui theme
 * @returns a bunch of styles
 */
const publicUserProfileStyles = (theme: Theme) => createStyles({
  container: {
    paddingTop: "1rem",
  },
  paper: {
    padding: "1rem",
  },
  username: {
    fontWeight: 300,
    width: "100%",
    marginTop: "1rem",
    textAlign: "center",
  },
  country: {
    fontWeight: 300,
    width: "100%",
    marginTop: "0.5rem",
    textAlign: "center",
  },
  role: {
    fontWeight: 300,
    width: "100%",
    marginTop: "0.5rem",
    textAlign: "center",
  },
  verifiedIcon: {
    color: theme.palette.success.main,
  },
  aboutMeCard: {
    marginTop: "1rem",
    padding: "1rem",
  },
  spacer: {
    width: "6px",
    height: "2px",
    display: "inline-block",
  },
});

/**
 * The public user profile contains basic information that can be accessed about the current public user
 * @param props the public user profile props
 * @returns a react element
 */
export const PublicUserProfile = withStyles(publicUserProfileStyles)((props: WithStyles<typeof publicUserProfileStyles>) => {
  return (
    <React.Fragment>
      <Container maxWidth="md" className={props.classes.container}>
        <Paper className={props.classes.paper}>
          <ItemDefinitionLoader>
            <Avatar size="large" hideFlag={true} fullWidth={true}/>
            <Reader id="e_validated">
              {(eValidated: boolean) => (
                <Reader id="username">
                  {(username: string) => (
                    <Typography variant="h4" className={props.classes.username}>
                      {username}
                      {eValidated ? <span>
                        <span className={props.classes.spacer}/>
                        <I18nRead id="label" propertyId="e_validated" capitalize={true}>
                          {(i18nUserValidated: string) => (
                            <Tooltip title={i18nUserValidated}>
                              <VerifiedUserIcon className={props.classes.verifiedIcon}/>
                            </Tooltip>
                          )}
                        </I18nRead>
                      </span> : null}
                    </Typography>
                  )}
                </Reader>
              )}
            </Reader>
          </ItemDefinitionLoader>
          <Reader id="app_country">
            {(country: string) => {
              if (!country) {
                return null;
              }
              const countryobj = countries[country];
              return <Typography variant="h5" className={props.classes.country}>{countryobj.emoji + " " + countryobj.native}</Typography>
            }}
          </Reader>
          <Reader id="role">
            {(role: string) => {
              if (role !== "USER") {
                return <Typography variant="h5" className={props.classes.role}>
                  <View id="role" capitalize={true} />
                </Typography>
              }
              return null;
            }}
          </Reader>
          <UserDataRetriever>
            {(userData) => {
              if (userData.role === "ADMIN") {
                return <AdminToolbox/>
              }

              return null;
            }}
          </UserDataRetriever>
          <Card className={props.classes.aboutMeCard} variant="outlined">
            <View id="about_me"/>
          </Card>
        </Paper>
      </Container>
    </React.Fragment>
  );
});
