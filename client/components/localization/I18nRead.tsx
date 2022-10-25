/**
 * Provides the read functionality to read language content in the
 * item definition, module, or even the root context
 * 
 * @module
 */

import React from "react";
import { LocaleContext, ILocaleContextType } from "../../internal/providers/locale-provider";
import { ItemContext } from "../../providers/item";
import { localeReplacerToArray, localeReplacer } from "../../../util";
import { IncludeContext } from "../../providers/include";
import { ModuleContext } from "../../providers/module";
import { capitalize } from "../../../util";
import Module from "../../../base/Root/Module";
import ItemDefinition from "../../../base/Root/Module/ItemDefinition";
import Include from "../../../base/Root/Module/ItemDefinition/Include";
import RootRetriever from "../root/RootRetriever";

/**
 * For a given object target, it will loop until it gets a match for the given key
 * @param target the object targe
 * @param keySplitted the splitted key to dive in
 */
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

/**
 * The read props which takes the following data
 */
export interface II18nReadProps {
  /**
   * The id to read, very context dependent
   * 
   * if propertyId is specified it will use the "properties" context for that property first
   * if policy type and policy name specified it will use the context for such as well
   * if nothing found (or no propertyId or policy) it will go into the next context
   * 
   * if in an include context it will read from the include context itself for its standard
   * localized properties, if nothing found it will go into the next context
   * 
   * if in an item definition context (normal, extended, or search mode) it will read the item definition
   * from the base context, note that custom, properties do not need to be "custom.myid" they can
   * just be "myid" if nothing found (or no context) it will go to the next context
   * 
   * if in a module context it will rea from the module base context, same rule applies for custom
   * as item definition, if nothing found (or no module context) it will go to the next context
   * 
   * the root context is the last, and reads from the base root properties or the main i18n data properties
   * if nothing found in this last context, an error is thrown
   */
  id: string;
  /**
   * A context to override the current pass a registry key
   */
  context?: string;
  /**
   * A property id to use as context
   */
  propertyId?: string;
  /**
   * A policy type to use as context, must go along policy name
   */
  policyType?: string;
  /**
   * A policy name to use as context, must go along policy type
   */
  policyName?: string;
  /**
   * Arbitrary parameters to replace dynamic i18n strings
   * these can be plain string, for simple replacement or literal react
   * objects, using react objects will produce a react node as output
   * rather than a string
   */
  args?: any[];
  /**
   * Dangerous!... whether the content represents html instead of a plain string
   * does not mix well with args if the output generated is a react node that
   * does not serialize
   */
  html?: boolean;
  /**
   * The wrapping tag for using in the html mode, by default is a div
   */
  htmlWrappingTag?: string;
  /**
   * The actually value is passed in this function, if required
   * otherwise it's just rendered
   */
  children?: (value: React.ReactNode) => React.ReactNode;
  /**
   * Whether to capitalize the output
   */
  capitalize?: boolean;
}

/**
 * This function is a helper that represents what is used internally by
 * the i18n reader, given what it needs
 *
 * @param localeContext it needs the locale context to get the current language and the root locale data
 * @param mod it needs the module in its context or null
 * @param idef it needs the item definition in its context or null
 * @param include the include in its context or null
 * @param props the current props
 */
function i18nReadInternal(
  localeContext: ILocaleContextType,
  mod: Module,
  idef: ItemDefinition,
  include: Include,
  props: II18nReadProps,
) {
  const idSplitted = props.id.split(".");

  // so first we go in order of priority of what we want to read
  let i18nValue: React.ReactNode = null;

  // first by the inlcude context
  if (include) {
    // if we have a name we use the include context using the name i18n function
    // as the name can be inherited from the item definition if not specified
    if (props.propertyId) {
      const property = include.getSinkingPropertyFor(props.propertyId);
      i18nValue = loopForKeyAtTarget(
        property.getI18nDataFor(localeContext.language),
        idSplitted,
      );
    } else if (props.id === "name") {
      i18nValue = include.getI18nNameFor(localeContext.language) || null;
    } else {
      // othewise we just extract the i18n data for the include and call it with the id,
      // normally there are only specific labels here at this level in the include context
      i18nValue = loopForKeyAtTarget(
        include.getI18nDataFor(localeContext.language),
        idSplitted,
      );
    }
  }

  // so if the include thing failed and we have an item definition context
  if (idef && i18nValue === null) {
    if (props.propertyId) {
      const property = idef.getPropertyDefinitionFor(props.propertyId, true);
      i18nValue = loopForKeyAtTarget(
        property.getI18nDataFor(localeContext.language),
        idSplitted,
      );
    } else {
      // so we get the i18n item definition data
      const i18nIdefData =
        idef.getI18nDataFor(localeContext.language);
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
  if (mod && i18nValue === null) {
    if (props.propertyId) {
      const property = mod.getPropExtensionFor(props.propertyId);
      i18nValue = loopForKeyAtTarget(
        property.getI18nDataFor(localeContext.language),
        idSplitted,
      );
    } else {
      // modules act similar to item definitions they also support custom properties
      const i18nModData =
        mod.getI18nDataFor(localeContext.language);
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
    if (idef) {
      // specify the context
      errMessage += "; in item definition context for " +
        idef.getName();

      // add the policies if any
      if (props.policyType && props.policyName) {
        errMessage += "; in policy " + props.policyType + " " + props.policyName;
      }

      // and the include is if so deemed required
      if (include) {
        errMessage += "; in item context for " +
          include.getId();
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
    if (props.args.every((a) => typeof a === "string" || typeof a === "number" || a === null || typeof a === "undefined")) {
      // the standard locale replacer
      i18nValue = localeReplacer(i18nValue as string, ...props.args);
    } else {
      // otherwise we use the locale replacer to array which creates react fragments
      // and returns an array of react nodes, this all depends on the args that the user
      // is passing
      i18nValue = localeReplacerToArray(i18nValue as string, ...props.args).map((output, index) => {
        if (typeof output === "string") {
          return (
            <span key={index} style={{ whiteSpace: "pre-wrap" }}>
              {output}
            </span>
          );
        }
        return (
          <React.Fragment key={index}>
            {output}
          </React.Fragment>
        );
      });
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

/**
 * For a pure component optimized class so that
 * there are no useless re-renders when the state changes
 */
interface I18nReadInternalOptimizedProps extends II18nReadProps {
  localeContext: ILocaleContextType;
  mod: Module;
  idef: ItemDefinition;
  include: Include;
}

/**
 * The optimizer class just pipes to the internal
 */
export class I18nReadInternalOptimized extends React.PureComponent<I18nReadInternalOptimizedProps> {
  public render() {
    if (!this.props.id) {
      return this.props.children ? this.props.children("MISSING ID") : "MISSING ID";
    };

    return i18nReadInternal(
      this.props.localeContext,
      this.props.mod,
      this.props.idef,
      this.props.include,
      this.props,
    );
  };
}

/**
 * Allows to read localized properties from the properties
 * file as they are available in the current context
 *
 * @param props the props
 * @returns a react node
 */
export default function I18nRead(props: II18nReadProps) {
  if (props.context) {
    return (
      <LocaleContext.Consumer>
        {
          (localeContext) => (
            <RootRetriever>
              {
                (root) => {
                  const rootV = root.root;
                  const itemDefOrModule = rootV.registry[props.context];

                  const idef = itemDefOrModule instanceof ItemDefinition ? itemDefOrModule : null;
                  const mod: Module = idef ? idef.getParentModule() : itemDefOrModule as Module;

                  return (
                    <I18nReadInternalOptimized
                      {...props}
                      localeContext={localeContext}
                      mod={mod}
                      idef={idef}
                      include={null}
                    />
                  );
                }
              }
            </RootRetriever>
          )
        }
      </LocaleContext.Consumer>
    )
  }

  return (
    <LocaleContext.Consumer>
      {
        (localeContext) => (
          <ModuleContext.Consumer>
            {
              (moduleContextualValue) => (
                <ItemContext.Consumer>
                  {
                    (itemContextualValue) => (
                      <IncludeContext.Consumer>
                        {
                          (includeContext) => (
                            <I18nReadInternalOptimized
                              {...props}
                              localeContext={localeContext}
                              mod={moduleContextualValue && moduleContextualValue.mod}
                              idef={itemContextualValue && itemContextualValue.idef}
                              include={includeContext && includeContext.include}
                            />
                          )
                        }
                      </IncludeContext.Consumer>
                    )
                  }
                </ItemContext.Consumer>
              )
            }
          </ModuleContext.Consumer>
        )
      }
    </LocaleContext.Consumer>
  );
}