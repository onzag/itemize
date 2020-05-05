import React from "react";
import { ModuleProvider } from "../../../providers/module";
import { ItemDefinitionProvider } from "../../../providers/item-definition";
import { SlowLoadingElement } from "../../components/util";
import { PublicUserProfile } from "./public-user";
import I18nRead from "../../../components/localization/I18nRead";
import TitleSetter from "../../../components/util/TitleSetter";

interface ProfileProps {
  match: {
    params: {
      id: string;
    };
  };
}

export function Profile(props: ProfileProps) {
  const currentUserId = parseInt(props.match.params.id);
  const properties = [
    "username",
    "app_language",
    "app_country",
    "app_currency",
    "e_validated",
    "role",
    "profile_picture",
  ];
  return (
    <SlowLoadingElement id="profile">
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
    </SlowLoadingElement>
  );
}