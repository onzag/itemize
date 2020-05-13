import React from "react";
import { LocaleContext, ILocaleContextType } from "../../internal/app";
import { ItemDefinitionContext, IItemDefinitionContextType } from "../../providers/item-definition";
import { localeReplacerToArray, localeReplacer } from "../../../util";
import { IncludeContext, IIncludeContext } from "../../providers/include";
import { ModuleContext, IModuleContextType } from "../../providers/module";
import { capitalize } from "../../../util";

function loopForKeyAtTarget(target: any, keySplitted: string[]) {
  let result = typeof target === "undefined" ? null : target;
  keySplitted.forEach((key) => {
    if (
      result === null ||
      typeof result === "string"
    ) {
      result = null;
      return;
    }
    result = typeof result[key] === "undefined" ? null : result[key];
  });
  return result;
}

export interface II18nReadProps {
  id: string;
  propertyId?: string;
  policyType?: string;
  policyName?: string;
  args?: any[];
  html?: boolean;
  htmlWrappingTag?: string;
  children?: (value: React.ReactNode) => React.ReactNode;
  capitalize?: boolean;
}

export function i18nReadInternal(
  localeContext: ILocaleContextType,
  moduleContextualValue: IModuleContextType,
  itemDefinitionContextualValue: IItemDefinitionContextType,
  includeContext: IIncludeContext,
  props: II18nReadProps,
) {
  const idSplitted = props.id.split(".");

  // so first we go in order of priority of what we want to read
  let i18nValue: React.ReactNode = null;

  // first by the inlcude context
  if (includeContext) {
    // if we have a name we use the include context using the name i18n function
    // as the name can be inherited from the item definition if not specified
    if (props.propertyId) {
      const property = includeContext.include.getSinkingPropertyFor(props.propertyId);
      i18nValue = loopForKeyAtTarget(
        property.getI18nDataFor(localeContext.language),
        idSplitted,
      );
    } else if (props.id === "name") {
      i18nValue = includeContext.include.getI18nNameFor(localeContext.language) || null;
    } else {
      // othewise we just extract the i18n data for the include and call it with the id,
      // normally there are only specific labels here at this level in the include context
      i18nValue = loopForKeyAtTarget(
        includeContext.include.getI18nDataFor(localeContext.language),
        idSplitted,
      );
    }
  }

  // so if the include thing failed and we have an item definition context
  if (itemDefinitionContextualValue && i18nValue === null) {
    if (props.propertyId) {
      const property = itemDefinitionContextualValue.idef.getPropertyDefinitionFor(props.propertyId, true);
      i18nValue = loopForKeyAtTarget(
        property.getI18nDataFor(localeContext.language),
        idSplitted,
      );
    } else {
      // so we get the i18n item definition data
      const i18nIdefData =
        itemDefinitionContextualValue.idef.getI18nDataFor(localeContext.language);
      // if we are specifying a policy like if we are in a policy context
      if (props.policyType && props.policyName) {
        // we go for the policy value and the policy name value
        i18nValue = loopForKeyAtTarget(
          i18nIdefData,
          ["policies", props.policyType, props.policyName].concat(idSplitted),
        )
      } else {
        const customValue = loopForKeyAtTarget(
          i18nIdefData,
          ["custom"].concat(idSplitted),
        );
        // otherwise without policy we check if we have custom data in the item definition
        // and this custom properties fit the data
        if (customValue) {
          i18nValue = customValue;
        } else {
          // otherwise we give an standard property
          i18nValue = loopForKeyAtTarget(
            i18nIdefData,
            idSplitted,
          );
        }
      }
    }
  }

  // now in modules
  if (moduleContextualValue && i18nValue === null) {
    if (props.propertyId) {
      const property = moduleContextualValue.mod.getPropExtensionFor(props.propertyId);
      i18nValue = loopForKeyAtTarget(
        property.getI18nDataFor(localeContext.language),
        idSplitted,
      );
    } else {
      // modules act similar to item definitions they also support custom properties
      const i18nModData =
        moduleContextualValue.mod.getI18nDataFor(localeContext.language);
      const customValue = loopForKeyAtTarget(
        i18nModData,
        ["custom"].concat(idSplitted),
      );
      if (customValue) {
        i18nValue = customValue;
      } else {
        i18nValue = loopForKeyAtTarget(
          i18nModData,
          idSplitted,
        );
      }
    }
  }

  // now we search in the generic locale file, there are no custom, even though
  // they are all required
  if (i18nValue === null) {
    // for that we extract it
    i18nValue = loopForKeyAtTarget(
      localeContext.i18n,
      [localeContext.language].concat(idSplitted),
    );
  }

  // if we still find nothing in all these contexts
  if (i18nValue === null) {
    // we want to throw an error
    let errMessage: string = "Unknown key in context: " + props.id;

    // let's make the error more specific
    if (itemDefinitionContextualValue) {
      // specify the context
      errMessage += "; in item definition context for " +
        itemDefinitionContextualValue.idef.getName();

      // add the policies if any
      if (props.policyType && props.policyName) {
        errMessage += "; in policy " + props.policyType + " " + props.policyName;
      }

      // and the include is if so deemed required
      if (includeContext) {
        errMessage += "; in item context for " +
          includeContext.include.getId();
      }

      // and the include is if so deemed required
      if (props.propertyId) {
        errMessage += "; for property id " +
          props.propertyId;
      }
    }
    // throw the error
    throw new Error(errMessage);
  }

  if (props.capitalize) {
    i18nValue = capitalize(i18nValue as string);
  }

  // if we are passing arguments to replace the {0} {1} etc... numbers
  if (props.args) {
    // we have two options, these are for basic types, which is faster and returns a string
    if (props.args.every((a) => typeof a === "string" || typeof a === "number")) {
      // the standard locale replacer
      i18nValue = localeReplacer(i18nValue as string, ...props.args);
    } else {
      // otherwise we use the locale replacer to array which creates react fragments
      // and returns an array of react nodes, this all depends on the args that the user
      // is passing
      i18nValue = localeReplacerToArray(i18nValue as string, ...props.args).map((output, index) => (
        <React.Fragment key={index}>
          {output}
        </React.Fragment>
      ));
    }
  }

  // now we want to get the final node that we are returning, the react node
  let finalContent = i18nValue;
  if (props.html) {
    const Element: any = props.htmlWrappingTag || "div";
    finalContent = (
      <Element dangerouslySetInnerHTML={{ __html: i18nValue }} />
    );
  }

  // if we haven't specified a children function
  // we just return the entire content
  if (!props.children) {
    return finalContent;
  }
  // otherwise we return the children wrapped function
  return props.children(finalContent);
}

export default function I18nRead(props: II18nReadProps) {
  return (
    <LocaleContext.Consumer>
      {
        (localeContext) => (
          <ModuleContext.Consumer>
            {
              (moduleContextualValue) => (
                <ItemDefinitionContext.Consumer>
                  {
                    (itemDefinitionContextualValue) => (
                      <IncludeContext.Consumer>
                        {
                          (includeContext) => {
                            return i18nReadInternal(localeContext, moduleContextualValue, itemDefinitionContextualValue, includeContext, props);
                          }
                        }
                      </IncludeContext.Consumer>
                    )
                  }
                </ItemDefinitionContext.Consumer>
              )
            }
          </ModuleContext.Consumer>
        )
      }
    </LocaleContext.Consumer>
  );
}