import React from "react";
import { Divider, withStyles, WithStyles, createStyles, DoneOutlineIcon } from "../../mui-core";
import { SubmitButton } from "../../components/buttons";
import Snackbar from "../../components/snackbar";
import Entry from "../../../components/property/Entry";
import SubmitActioner from "../../../components/item-definition/SubmitActioner";

const adminToolboxStyles = () => createStyles({
  divider: {
    marginTop: "1rem",
    marginBottom: "1rem",
  }
});

export const AdminToolbox = withStyles(adminToolboxStyles)((props: WithStyles<typeof adminToolboxStyles>) => {
  return (
    <React.Fragment>
      <Divider className={props.classes.divider}/>
      <Entry id="role"/>
      <SubmitButton
        i18nId="update_profile"
        options={{
          properties: ["role"],
          differingOnly: true,
        }}
        buttonColor="primary"
        buttonStartIcon={<DoneOutlineIcon />}
        buttonVariant="contained"
      />
      <SubmitActioner>
        {(actioner) => (
          <React.Fragment>
            <Snackbar
              id="submit-admin-toolbox-error"
              severity="error"
              i18nDisplay={actioner.submitError}
              open={!!actioner.submitError}
              onClose={actioner.dismissError}
            />
            <Snackbar
              id="submit-admin-toolbox-success"
              severity="success"
              i18nDisplay="profile_updated_successfully"
              open={actioner.submitted}
              onClose={actioner.dismissSubmitted}
            />
          </React.Fragment>
        )}
      </SubmitActioner>
    </React.Fragment>
  );
});