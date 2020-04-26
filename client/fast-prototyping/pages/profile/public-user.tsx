import React from "react";
import { I18nRead, I18nReadMany } from "../../../components/localization";
import { Container, createStyles, WithStyles, withStyles, Typography, Paper, Theme, Tooltip } from "@material-ui/core";
import { ItemDefinitionLoader } from "../../components/item-definition-loader";
import { Reader, View } from "../../../components/property";
import { Avatar } from "../../components/avatar";
import { countries } from "../../../../imported-resources";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { UserDataRetriever } from "../../../components/user";

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
});

export const PublicUserProfile = withStyles(publicUserProfileStyles)((props: WithStyles<typeof publicUserProfileStyles>) => {
  return (
    <React.Fragment>
      <Container maxWidth="md" className={props.classes.container}>
        <Paper className={props.classes.paper}>
          <ItemDefinitionLoader>
            <Avatar size="large" hideFlag={true}/>
            <Reader id="e_validated">
              {(eValidated: boolean) => (
                <Reader id="username">
                  {(username: string) => (
                    <Typography variant="h4" className={props.classes.username}>
                      {username}
                      {eValidated ? <span>
                        &nbsp;
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
              return <Typography variant="h5" className={props.classes.country}>{countryobj.emoji} {countryobj.native}</Typography>
            }}
          </Reader>
          <Reader id="role">
            {(role: string) => {
              if (role !== "USER") {
                return <Typography variant="h5" className={props.classes.role}>
                  <View id="role" capitalize={true}/>
                </Typography>
              }
              return null;
            }}
          </Reader>
        </Paper>
      </Container>
    </React.Fragment>
  );
});