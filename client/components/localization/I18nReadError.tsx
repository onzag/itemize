import React from "react";
import { EndpointErrorType } from "../../../base/errors";
import { LocaleContext, DataContext } from "../../internal/app";
import { capitalize } from "../../../util";
import Module from "../../../base/Root/Module";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import PropertyDefinition from "../../../base/Root/Module/ItemDefinition/PropertyDefinition";

const isDevelopment = process.env.NODE_ENV === "development";
export interface II18nReadErrorProps {
  error: EndpointErrorType;
  capitalize?: boolean;
  children?: (value: string) => React.ReactNode;
}
export default function I18nReadError(props: II18nReadErrorProps) {
  if (props.error === null) {
    return null;
  }
  return (
    <LocaleContext.Consumer>
      {
        (localeData) => {
          const freeError = props.error as any;
          if (isDevelopment && freeError.message) {
            console.warn(freeError.message);
          }
          // cheap way to know if this is a basic error code
          // without having to check for all types of error code
          if (!freeError.modulePath) {
            let errorMessage: string = localeData.i18n[localeData.language].error[props.error.code];
            if (props.capitalize) {
              errorMessage = capitalize(errorMessage);
            }
            return props.children ? props.children(errorMessage) : errorMessage;
          }
          return (
            <DataContext.Consumer>
              {
                (data) => {
                  let mod: Module;
                  try {
                    mod = data.value.getModuleFor(freeError.modulePath);
                  } catch {
                    console.warn("Invalid error module in", freeError);
                    return null;
                  }

                  let itemDef: ItemDefinition;
                  if (freeError.includeIdItemDefPath) {
                    try {
                      itemDef = mod.getItemDefinitionFor(freeError.includeIdItemDefPath);
                    } catch {
                      console.warn("failed to display error due to includeIdItemDefPath", freeError);
                      return null;
                    }
                  } else if (freeError.itemDefPath) {
                    try {
                      itemDef = mod.getItemDefinitionFor(freeError.itemDefPath);
                    } catch {
                      console.warn("failed to display error due to includeIdItemDefPath", freeError);
                      return null;
                    }
                  }

                  if (freeError.propertyId) {
                    let propertyDef: PropertyDefinition;
                    if (itemDef) {
                      try {
                        propertyDef = itemDef.getPropertyDefinitionFor(
                          freeError.propertyId,
                          true,
                        );
                      } catch {
                        console.warn("failed to display error due to propertyId", freeError);
                        return null;
                      }
                    } else {
                      try {
                        propertyDef = mod.getPropExtensionFor(freeError.propertyId);
                      } catch {
                        console.warn("failed to display error due to propertyId not extension", freeError);
                        return null;
                      }
                    }

                    const i18nData = propertyDef.getI18nDataFor(localeData.language);
                    let i18nErrorValue = i18nData && i18nData.error && i18nData.error[freeError.pcode];
                    if (!i18nErrorValue) {
                      // pcode might be null, this can happen by a programming error
                      console.warn("failed to display error due to pcode or language", freeError);
                      return null;
                    }
                    if (props.capitalize) {
                      i18nErrorValue = capitalize(i18nErrorValue);
                    }
                    return props.children ? props.children(i18nErrorValue) : i18nErrorValue;
                  } else if (freeError.policyType) {
                    const i18nData = itemDef.getI18nDataFor(localeData.language);
                    let i18nErrorValue = i18nData &&
                      i18nData.policies &&
                      i18nData.policies[freeError.policyType] &&
                      i18nData.policies[freeError.policyType][freeError.policyName] &&
                      i18nData.policies[freeError.policyType][freeError.policyName].fail;
                    if (!i18nErrorValue) {
                      console.warn("failed to display error due to code or language", freeError);
                      return null;
                    }
                    if (props.capitalize) {
                      i18nErrorValue = capitalize(i18nErrorValue);
                    }
                    return props.children ? props.children(i18nErrorValue) : i18nErrorValue;
                  }
                }
              }
            </DataContext.Consumer>
          );
        }
      }
    </LocaleContext.Consumer>
  );
}