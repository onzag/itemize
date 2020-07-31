/**
 * The user profile that is as seen by the public
 * 
 * @packageDocumentation
 */

import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { PublicUserProfile } from "./public-user";
import I18nRead from "../../../components/localization/I18nRead";
import TitleSetter from "../../../components/util/TitleSetter";

/**
 * The profile props
 */
interface ProfileProps {
  match: {
    params: {
      id: string;
    };
  };
}

/**
 * Represents a public user profile component
 * that displays basic information about a public user
 * 
 * @param props the profile props
 * @returns a react element
 */
export function Profile(props: ProfileProps) {
  const currentUserId = parseInt(props.match.params.id) || null;
  const properties = [
    "username",
    "app_language",
    "app_country",
    "app_currency",
    "e_validated",
    "role",
    "profile_picture",
    "about_me",
  ];
  return (
    <ModuleProvider module="users">
      <ItemDefinitionProvider
        itemDefinition="user"
        properties={properties}
        forId={currentUserId}
        assumeOwnership={false}
        includePolicies={false}
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
        <PublicUserProfile />
      </ItemDefinitionProvider>
    </ModuleProvider>
  );
}
