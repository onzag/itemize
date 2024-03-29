/**
 * Specifies how renderers are to be provided down the app in order
 * to render the app
 * @module
 */

import React from "react";
import { IIncludeCalloutWarningRendererProps } from "../internal/components/IncludeCalloutWarning";
import { IPropertyEntryFieldRendererProps } from "../internal/components/PropertyEntry/PropertyEntryField";
import { IPropertyEntryFileRendererProps } from "../internal/components/PropertyEntry/PropertyEntryFile";
import { IPropertyEntryBooleanRendererProps } from "../internal/components/PropertyEntry/PropertyEntryBoolean";
import { IPropertyEntryLocationRendererProps } from "../internal/components/PropertyEntry/PropertyEntryLocation";
import { IPropertyViewSimpleRendererProps } from "../internal/components/PropertyView/PropertyViewSimple";
import { IPropertyEntrySelectRendererProps } from "../internal/components/PropertyEntry/PropertyEntrySelect";
import { IPropertyEntryTextRendererProps } from "../internal/components/PropertyEntry/PropertyEntryText";
import { IPropertyViewTextRendererProps } from "../internal/components/PropertyView/PropertyViewText";
import { IPropertyViewFileRendererProps } from "../internal/components/PropertyView/PropertyViewFile";
import { IPropertyEntryDateTimeRendererProps } from "../internal/components/PropertyEntry/PropertyEntryDateTime";
import { IPropertyViewBooleanRendererProps } from "../internal/components/PropertyView/PropertyViewBoolean";
import { IPropertyViewDateTimeRendererProps } from "../internal/components/PropertyView/PropertyViewDateTime";
import { IPropertyViewLocationRendererProps } from "../internal/components/PropertyView/PropertyViewLocation";
import { IPropertyViewCurrencyRendererProps } from "../internal/components/PropertyView/PropertyViewCurrency";
import { IPropertyEntryPaymentRendererProps } from "../internal/components/PropertyEntry/PropertyEntryPayment";
import { IPropertyEntryTagListRendererProps } from "../internal/components/PropertyEntry/PropertyEntryTagList";
import { IPropertyEntryFilesRendererProps } from "../internal/components/PropertyEntry/PropertyEntryFiles";
import { IPropertyViewFilesRendererProps } from "../internal/components/PropertyView/PropertyViewFiles";
import { IPropertyViewPaymentRendererProps } from "../internal/components/PropertyView/PropertyViewPayment";

/**
 * The renderer context we do expect for defining how are things to be renderered,
 * in order to build your own custom renderers you should define these, itemize ships with
 * its own fast prototyping renderers
 */
export interface IRendererContext {
  /**
   * The include callout warning represents the renderer that is used
   * when an include is missing, and the item is marked as callout, aka
   * marked as incomplete
   */
  IncludeCalloutWarning?: React.ComponentType<IIncludeCalloutWarningRendererProps>;

  /**
   * The property entry field, one of the most dynamic renderers, renders
   * unsubtyped integers, year, unsubtyped text (aka no text/plain and no text/html), string as
   * well as password; it also renders unit and currency; basically anything that
   * represents a field in one single like and represents a simple
   * numeric or textual value
   * 
   * When creating a entry field renderer use onChangeByTextualValue and currentTextualValue
   * instead of currentValue and onChange, these will handle internals for you using
   * its own handler logic
   */
  PropertyEntryField?: React.ComponentType<IPropertyEntryFieldRendererProps>;

  /**
   * The file renderer is used only for files, as simple as that
   * 
   * Do not use the onChange function to update, use onSetFile instead
   */
  PropertyEntryFile?: React.ComponentType<IPropertyEntryFileRendererProps>;
  /**
   * The file renderer is used only for files, as simple as that
   * 
   * Do not use the onChange function to update, use onSetFile instead
   */
  PropertyEntryFiles?: React.ComponentType<IPropertyEntryFilesRendererProps>;
  /**
   * The property entry boolean renderer, non-special
   */
  PropertyEntryBoolean?: React.ComponentType<IPropertyEntryBooleanRendererProps>;
  /**
   * The property entry location renderer, one of the most complex types
   * as well, avoid using onChange on this one as well, it provides its own
   * onChangeBySuggestion and onChangeBySearchResult functionality that you should
   * use, otherwise you might render as normal; suggestions come from the server
   * using the default service as it is programmed in the server side
   */
  PropertyEntryLocation?: React.ComponentType<IPropertyEntryLocationRendererProps>;
  /**
   * The select renderer is used when the type has valid values, regardless of the type
   * it is, supports both texual and numerical types, otherwise works as standard
   */
  PropertyEntrySelect?: React.ComponentType<IPropertyEntrySelectRendererProps>;
  /**
   * The property entry text renderer for text/plain and text/html, this
   * is a very complex renderer, if you need to implement your own it's recommended
   * you read text-specs.md in the source, and use the fast prototyping renderer
   * as a template and reference, it's simply very complex
   * 
   * The LAST_RICH_TEXT_CHANGE_LENGTH global in the window allows you to set the size
   * of the text in characters for next validation caching in order to avoid constant
   * parsing of the raw text, use it for optimization, it's important
   * 
   * Note that the lenght of the html text while is used in validation MAX_RAW_TEXT_LENGTH
   * will be used and most likely is a larger value, otherwise MAX_FIELD_SIZE will
   * cause an error if the fields total is more than 1MB as that's the maximum, this
   * is some tight security
   * 
   * Avoid using the internalValue if possible, however if you rich text editor
   * of choice does not support HTML you might want to pass whatever it's using, note
   * that the internal value is NOT GUARANTEED, so you must be able to recreate from just
   * HTML in the render function of your renderer
   */
  PropertyEntryText?: React.ComponentType<IPropertyEntryTextRendererProps>;
  /**
   * The datetime renderer, a mainly standard renderer that expects a date in
   * the given format
   */
  PropertyEntryDateTime?: React.ComponentType<IPropertyEntryDateTimeRendererProps>;
  /**
   * The payment renderer which is used for rendering the payment entry, do not confuse
   * this with the payment processor related object, this is for manually editing payments
   * and what they are all about; basically to process cash payments by yourself, this allows
   * to set invoices to change status to paid, change the amount that has to be billed and
   * so forth
   */
  PropertyEntryPayment?: React.ComponentType<IPropertyEntryPaymentRendererProps>;
  /**
   * The taglist renderer which is used to render arbitrary tags, unlike
   * the property entry select which is used for standard tags which specific values
   * this one is arbitrary
   */
  PropertyEntryTagList?: React.ComponentType<IPropertyEntryTagListRendererProps>;

  /**
   * The boolean renderer used to render, well, booleans; since booleans are either
   * true or false, we expect a diverging rendering
   */
  PropertyViewBoolean?: React.ComponentType<IPropertyViewBooleanRendererProps>;
  /**
   * The simple renderer is one of the most dynamic types, similar to field, it only only
   * renders properties that are not part of a property definition, which means
   * these values can be null
   */
  PropertyViewSimple?: React.ComponentType<IPropertyViewSimpleRendererProps>;
  /**
   * One of the most complex view renderers for viewing the text type which
   * on html rich text mode can be complex
   */
  PropertyViewText?: React.ComponentType<IPropertyViewTextRendererProps>;
  /**
   * The date time renderer
   */
  PropertyViewDateTime?: React.ComponentType<IPropertyViewDateTimeRendererProps>;
  /**
   * Allows to view files, it shouldn't be hard to implement a viewer for this
   * you might want to use the file standard for it, this one is also
   * used for files
   */
  PropertyViewFile?: React.ComponentType<IPropertyViewFileRendererProps>;
  /**
   * The file renderer is used only for files, as simple as that
   * 
   * Do not use the onChange function to update, use onSetFile instead
   */
   PropertyViewFiles?: React.ComponentType<IPropertyViewFilesRendererProps>;
  /**
   * Allows to view location, very useful and similar to the entry but simpler,
   * this renderer can be used as a realtime location renderer
   */
  PropertyViewLocation?: React.ComponentType<IPropertyViewLocationRendererProps>;
  /**
   * Renders currency, it uses a separated renderer because rendering view currencies
   * can be different from standard, say for showing the price of goods
   * you might want to show the value in another currency, so having support
   * for conversions is relevant
   */
  PropertyViewCurrency?: React.ComponentType<IPropertyViewCurrencyRendererProps>;
  /**
   * Renders a payment element, a payment element is a complex element so the renderer
   * may offer variation via its args
   */
  PropertyViewPayment?: React.ComponentType<IPropertyViewPaymentRendererProps>;
}

/**
 * This is the renderer context that contains the renderer context
 * value, by default is null, it must be provided or itemize
 * will crash any time when rendering
 */
export const RendererContext = React.createContext<IRendererContext>(null);

/**
 * The renderer provider props
 */
interface IRendererProviderProps extends IRendererContext {
  children: React.ReactNode,
}

/**
 * Allows to create a rendering context for usage with the view, there's a renderer
 * provider at the root of the itemize app and that's the preferred way to pass a renderer
 * however it is totally possible to define a different renderer context under the app
 * even when it's recommended to rather use the renderer property from the Entry, and View
 *
 * @param props the provider props
 * @returns a react element
 */
export default function RendererProvider(props: IRendererProviderProps) {
  return <RendererContext.Consumer>
    {
      (value) => {
        const newProviderValue: IRendererContext = { ...value };
        Object.keys(props).forEach((key) => {
          if (key === "children") {
            return;
          }
          newProviderValue[key] = props[key];
        });
        return <RendererContext.Provider value={newProviderValue}>{props.children}</RendererContext.Provider>
      }
    }
  </RendererContext.Consumer>
}
