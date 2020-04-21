import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { UserDataRetriever } from "../../../components/user";
import { TitleSetter } from "../../../components/util";
import { I18nRead } from "../../../components/localization";
import { CurrentUserProfile } from "./current-user";
import { SlowLoadingElement } from "../../components/util";
import { Redirect } from "../../../components/navigaton";

export function MyProfile() {
  return (
    <SlowLoadingElement id="profile">
      <UserDataRetriever>
        {(userData) => {
          if (!userData.id) {
            return (
              <Redirect to="/"/>
            );
          }
          let properties = [
            "username",
            "app_language",
            "app_country",
            "app_currency",
            "e_validated",
            "role",
            "profile_picture",
            "email",
            "password",
            "e_notifications",
            "e_newsletter",
            "address",
          ];
          return (
            <ModuleProvider module="users">
              <ItemDefinitionProvider
                itemDefinition="user"
                properties={properties}
                forId={userData.id}
                assumeOwnership={true}
                includePolicies={true}
                longTermCaching={true}
                markForDestructionOnLogout={true}
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
                <CurrentUserProfile/>
              </ItemDefinitionProvider>
            </ModuleProvider>
          )
        }}
      </UserDataRetriever>
    </SlowLoadingElement>
  );
}