import React from "react";
import { ModuleProvider } from "../../providers/module";
import { ItemDefinitionProvider } from "../../providers/item-definition";
import { UserDataRetriever } from "../../components/user";
import { ItemDefinitionLoader } from "../components/item-definition-loader";
import { TitleSetter } from "../../components/util";
import { I18nRead } from "../../components/localization";
import { Entry } from "../../components/property";

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
      <Entry id="username"/>
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