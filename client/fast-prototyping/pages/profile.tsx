import React from "react";
import { ModuleProvider } from "../../providers/module";
import { ItemDefinitionProvider, IActionSubmitOptions } from "../../providers/item-definition";
import { UserDataRetriever } from "../../components/user";
import { ItemDefinitionLoader } from "../components/item-definition-loader";
import { TitleSetter } from "../../components/util";
import { I18nRead, I18nReadMany } from "../../components/localization";
import { Entry } from "../../components/property";
import { Button } from "@material-ui/core";
import { LogActioner } from "../../components/login";
import { SubmitButton } from "../components/buttons";
import { SubmitActioner, DifferingPropertiesRetriever } from "../../components/item-definition";
import Snackbar from "../components/snackbar";
import { DialogResponsive } from "../components/dialog";
import DoneIcon from "@material-ui/icons/Done";

interface ProfileProps {
  match: {
    params: {
      id: string;
    };
  };
}

interface CustomConfirmationDialogProps {
  isActive: boolean;
  onClose: (continueWithProcess: boolean) => void;
}

function CustomConfirmationDialog(props: CustomConfirmationDialogProps) {
  return (
    <I18nReadMany data={
      [
        {
          id: "title",
          policyType: "edit",
          policyName: "REQUIRES_PASSWORD_CONFIRMATION",
        },
        {
          id: "ok",
        },
      ]
    }>
      {(i18nTitle: string, i18nOk: string) => (
        <DialogResponsive
          open={props.isActive}
          onClose={props.onClose.bind(null, false)}
          title={i18nTitle}
          buttons={
            <Button
              color="primary"
              aria-label={i18nOk}
              startIcon={<DoneIcon/>}
              onClick={props.onClose.bind(null, true)}
            >
              {i18nOk}
            </Button>
          }
        >
          <Entry id="password" policyName="REQUIRES_PASSWORD_CONFIRMATION" policyType="edit"/>
        </DialogResponsive>
      )}
    </I18nReadMany>
  )
}

function CurrentUserProfile() {
  return (
    <React.Fragment>
      <Entry id="profile_picture"/>
      <Entry id="username"/>
      <DifferingPropertiesRetriever mainProperties={["profile_picture", "username"]}>
        {(differingProperties) => {
          const options: IActionSubmitOptions = {
            properties: differingProperties,
            unpokeAfterAny: true,
          }
          if (
            differingProperties.includes("username")
          ) {
            options.policies = [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]];
            options.policiesToCleanOnAny = [["edit", "REQUIRES_PASSWORD_CONFIRMATION", "password"]];
          }

          let CustomConfirmationComponent = null;
          if (options.policies) {
            CustomConfirmationComponent = CustomConfirmationDialog;
          }
          return (
            <SubmitButton i18nId="update_profile" options={options} CustomConfirmationComponent={CustomConfirmationComponent}/>
          );
        }}
      </DifferingPropertiesRetriever>
      <SubmitActioner>
        {(actioner) => (
          <React.Fragment>
            <Snackbar i18nDisplay={actioner.submitError} open={!!actioner.submitError} onClose={actioner.dismissError}/>
            <Snackbar i18nDisplay="profile_updated_succesfully" open={actioner.submitted} onClose={actioner.dismissSubmitted}/>
          </React.Fragment>
        )}
      </SubmitActioner>
      <LogActioner>
        {(actioner) => {
          return (
            <React.Fragment>
              <Button onClick={actioner.logout}>
                <I18nRead capitalize={true} id="logout"/>
              </Button>
              <Button onClick={actioner.logoutAll}>
                <I18nRead capitalize={true} id="logout_all"/>
              </Button>
            </React.Fragment>
          );
        }}
      </LogActioner>
    </React.Fragment>
  );
}

export function Profile(props: ProfileProps) {
  const currentUserId = parseInt(props.match.params.id);
  return (
    <UserDataRetriever>
      {(userData) => {
        const isCurrentUser = userData.id === currentUserId;
        let properties = [
          "username",
          "app_language",
          "app_country",
          "app_currency",
          "e_validated",
          "role",
          "profile_picture",
        ];
        if (isCurrentUser) {
          properties = properties.concat([
            "email",
            "password",
            "e_notifications",
            "e_newsletter",
            "address",
          ])
        }
        return (
          <ModuleProvider module="users">
            <ItemDefinitionProvider
              itemDefinition="user"
              properties={properties}
              forId={currentUserId}
              assumeOwnership={isCurrentUser}
              includePolicies={isCurrentUser}
            >
              <I18nRead id="profile" capitalize={true}>
                {(i18nProfile: string) => {
                  return (
                    <TitleSetter>
                      {i18nProfile}
                    </TitleSetter>
                  );
                }}
              </I18nRead>
              <ItemDefinitionLoader>
                {
                  isCurrentUser ? <CurrentUserProfile/> : null
                }
              </ItemDefinitionLoader>
            </ItemDefinitionProvider>
          </ModuleProvider>
        )
      }}
    </UserDataRetriever>
  );
}