import React from "react";
import { ModuleProvider } from "../../providers/module";
import { ItemDefinitionProvider } from "../../providers/item-definition";
import { UserDataRetriever } from "../../components/user";
import { ItemDefinitionLoader } from "../components/item-definition-loader";
import { TitleSetter } from "../../components/util";
import { I18nRead } from "../../components/localization";
import { Entry } from "../../components/property";
import { Button } from "@material-ui/core";
import { LogActioner } from "../../components/login";
import { SubmitButton } from "../components/buttons";
import { SubmitActioner } from "../../components/item-definition";
import Snackbar from "../components/snackbar";

interface ProfileProps {
  match: {
    params: {
      id: string;
    };
  };
}

function CurrentUserProfile() {
  return (
    <React.Fragment>
      <Entry id="profile_picture"/>
      <Entry id="username"/>
      <SubmitButton i18nId="update_profile" options={{properties: ["profile_picture", "username"]}}/>
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
          return (<Button onClick={actioner.logout}>
            <I18nRead capitalize={true} id="logout"/>
          </Button>);
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