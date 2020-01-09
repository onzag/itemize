import React from "react";
import { ItemDefinitionProvider } from "../../../itemize/client/providers/item-definition";
import { I18nRead } from "../../../itemize/client/components/localization";
import { Entry } from "../../../itemize/client/components/property";
import { ModuleProvider } from "../../../itemize/client/providers/module";
import { SubmitActioner, ISubmitActionerInfoArgType } from "../../../itemize/client/components/item-definition";
import { Button } from "@material-ui/core";
import Snackbar from "../general/snackbar";
import { TitleSetter } from "../../../itemize/client/components/util";
import { localizedRedirectTo } from "../../../itemize/client/components/navigaton";

async function submitActionerInContext(actioner: ISubmitActionerInfoArgType) {
  const result = await actioner.submit();
  if (result.id) {
    localizedRedirectTo("/sensors/temperature/" + result.id);
  }
}

export function FrontPage() {
  return (
    <React.Fragment>
      <I18nRead id="app_name">
        {(value: string) => (
          <TitleSetter>{value}</TitleSetter>
        )}
      </I18nRead>
      <ModuleProvider module="test/sensors">
        <ItemDefinitionProvider itemDefinition="temperature">
          <div>
            <I18nRead id="name"/>
          </div>
          <Entry id="name"/>
          <Entry id="description"/>
          <Entry id="security_code"/>

          <SubmitActioner>{(actioner) => (
            <React.Fragment>
              <Button
                color="primary"
                variant="contained"
                onClick={submitActionerInContext.bind(null, actioner)}
              >
                <I18nRead id="create"/>
              </Button>
              <Snackbar
                uniqueId="create-sensor-error"
                i18nDisplay={actioner.submitError}
                open={!!actioner.submitError}
                onClose={actioner.dismissError}
              />
            </React.Fragment>
          )}</SubmitActioner>

          <Button
            color="primary"
            variant="contained"
            onClick={localizedRedirectTo.bind(null, "/sensors/temperature", null)}
          >
            <I18nRead id="search"/>
          </Button>
        </ItemDefinitionProvider>

        <Button
          color="primary"
          variant="contained"
          onClick={localizedRedirectTo.bind(null, "/sensors", null)}
        >
          <I18nRead id="search"/>
        </Button>
      </ModuleProvider>
    </React.Fragment>
  );
}
