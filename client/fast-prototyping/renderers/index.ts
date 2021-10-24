/**
 * This file represents the renderer context for the fast prototyping mechanism it
 * contains all the components that take form for the renderer context for fast prototyping
 * 
 * @module
 */

import { IRendererContext } from "../../providers/renderer";
import PropertyEntryFieldRenderer from "./PropertyEntry/PropertyEntryField";
import PropertyEntryFileRenderer from "./PropertyEntry/PropertyEntryFile";
import PropertyEntryFilesRenderer from "./PropertyEntry/PropertyEntryFiles";
import PropertyEntryBooleanRenderer from "./PropertyEntry/PropertyEntryBoolean";
import PropertyEntryLocationRenderer from "./PropertyEntry/PropertyEntryLocation";
import PropertyEntrySelectRenderer from "./PropertyEntry/PropertyEntrySelect";
import PropertyEntryTextRenderer from "./PropertyEntry/PropertyEntryText";
import PropertyEntryDateTimeRenderer from "./PropertyEntry/PropertyEntryDateTime";
import PropertyEntryPaymentRenderer from "./PropertyEntry/PropertyEntryPayment";

import PropertyViewBooleanRenderer from "./PropertyView/PropertyViewBoolean";
import PropertyViewSimpleRenderer from "./PropertyView/PropertyViewSimple";
import PropertyViewTextRenderer from "./PropertyView/PropertyViewText";
import PropertyViewFileRenderer from "./PropertyView/PropertyViewFile";
import PropertyViewDateTimeRenderer from "./PropertyView/PropertyViewDateTime";
import PropertyViewLocationRenderer from "./PropertyView/PropertyViewLocation";
import PropertyViewCurrencyRenderer from "./PropertyView/PropertyViewCurrency";
import PropertyEntryReferenceRenderer from "./PropertyEntry/PropertyEntryReference";

export const rendererContext: IRendererContext = {
  PropertyEntryField: PropertyEntryFieldRenderer,
  PropertyEntryReference: PropertyEntryReferenceRenderer,
  PropertyEntryFile: PropertyEntryFileRenderer,
  PropertyEntryFiles: PropertyEntryFilesRenderer,
  PropertyEntryBoolean: PropertyEntryBooleanRenderer,
  PropertyEntryLocation: PropertyEntryLocationRenderer, 
  PropertyEntrySelect: PropertyEntrySelectRenderer,
  PropertyEntryText: PropertyEntryTextRenderer,
  PropertyEntryDateTime: PropertyEntryDateTimeRenderer,
  PropertyEntryPayment: PropertyEntryPaymentRenderer,

  PropertyViewBoolean: PropertyViewBooleanRenderer,
  PropertyViewSimple: PropertyViewSimpleRenderer,
  PropertyViewText: PropertyViewTextRenderer,
  PropertyViewDateTime: PropertyViewDateTimeRenderer,
  PropertyViewFile: PropertyViewFileRenderer,
  PropertyViewLocation: PropertyViewLocationRenderer,
  PropertyViewCurrency: PropertyViewCurrencyRenderer,
}
