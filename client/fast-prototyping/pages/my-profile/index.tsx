/**
 * Provides a fast prototyping page for the current user profile, with modification and all
 * @packageDocumentation
 */

import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { CurrentUserProfile } from "./current-user";
import Redirect from "../../../components/navigation/Redirect";
import { NeedsSubmitPrompt } from "../../components/needs-submit-prompt";
import UserDataRetriever from "../../../components/user/UserDataRetriever";
import I18nRead from "../../../components/localization/I18nRead";
import TitleSetter from "../../../components/util/TitleSetter";

/**
 * This is the main component that provides access to the current user profile
 * it reads a lot of data and contains a lot of entries
 * @returns a react component
 */
export function MyProfile() {
  return (
    <UserDataRetriever>
      {(userData) => {
        if (!userData.id) {
          // redirect if not logged in
          return (
            <Redirect to="/" />
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
          "about_me",
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
              cleanOnDismount={{
                propertiesToRestoreOnAny: [
                  "username",
                  "email",
                  "about_me",
                ]
              }}
            >
              <NeedsSubmitPrompt
                properties={[
                  "email",
                  "username",
                  "about_me",
                ]}
                i18nConfirm="update_profile"
                confirmationSubmitOptions={{
                  properties: ["email", "username", "about_me"],
                  differingOnly: true,
                }}
              />
              <I18nRead id="profile" capitalize={true}>
                {(i18nProfile: string) => {
                  return (
                    <TitleSetter>
                      {i18nProfile}
                    </TitleSetter>
                  );
                }}
              </I18nRead>
              <CurrentUserProfile />
            </ItemDefinitionProvider>
          </ModuleProvider>
        )
      }}
    </UserDataRetriever>
  );
}
